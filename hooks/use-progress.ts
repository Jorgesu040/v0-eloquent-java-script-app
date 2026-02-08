"use client"

import { useState, useCallback, useEffect } from "react"
import {
  type UserProgress,
  INITIAL_PROGRESS,
  getLevel,
  ACHIEVEMENTS,
  XP_PER_LEVEL,
} from "@/lib/course-data"

const STORAGE_KEY = "eloquent-js-progress"

function loadProgress(): UserProgress {
  if (typeof window === "undefined") return INITIAL_PROGRESS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as UserProgress
    }
  } catch {
    // ignore
  }
  return INITIAL_PROGRESS
}

function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // ignore
  }
}

// Sync helpers
const SYNC_API_URL = "/api/sync"
const DEBOUNCE_MS = 2000

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS)
  const [loaded, setLoaded] = useState(false)
  const [xpAnimation, setXpAnimation] = useState(false)
  const [newAchievement, setNewAchievement] = useState<string | null>(null)

  // Sync state
  const [syncPassphrase, setSyncPassphrase] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle")
  const [lastSynced, setLastSynced] = useState<number | null>(null)

  useEffect(() => {
    // Load local progress
    const local = loadProgress()
    setProgress(local)
    setLoaded(true)

    // Load saved passphrase
    if (typeof window !== "undefined") {
      const savedPass = localStorage.getItem("sync-passphrase")
      if (savedPass) {
        setSyncPassphrase(savedPass)
      }
    }
  }, [])

  // Sync effect: when progress changes, debounce save to cloud
  useEffect(() => {
    if (!loaded || !syncPassphrase) return

    const timer = setTimeout(async () => {
      setSyncStatus("syncing")
      try {
        const res = await fetch(SYNC_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passphrase: syncPassphrase,
            data: progress,
            timestamp: Date.now(),
          }),
        })

        const json = await res.json()

        if (json.action === "merged") {
          // Server had newer data, update local
          console.log("Sync: Merging server data")
          setProgress(json.data)
          saveProgress(json.data)
        }

        setSyncStatus("synced")
        setLastSynced(Date.now())
      } catch (error) {
        console.error("Sync failed:", error)
        setSyncStatus("error")
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [progress, syncPassphrase, loaded])

  // Initial load from cloud when passphrase is set
  const activateSync = useCallback(async (passphrase: string) => {
    setSyncPassphrase(passphrase)
    localStorage.setItem("sync-passphrase", passphrase)
    setSyncStatus("syncing")

    try {
      // 1. Try to load existing data
      const res = await fetch(`${SYNC_API_URL}?passphrase=${encodeURIComponent(passphrase)}`)
      const json = await res.json()

      if (json.data) {
        // We found data!
        // Simple strategy: if server data exists, ask user? Or just merge?
        // For simplicity: if local is default/empty, take server. 
        // If local has progress, we might overwrite server if we are not careful.
        // Let's assume on "Activate", we download.
        console.log("Sync: Downloaded initial data", json.data)
        setProgress(json.data)
        saveProgress(json.data)
        setLastSynced(json.timestamp)
      } else {
        // No data on server yet, upload current
        console.log("Sync: No server data, uploading current")
        // The useEffect will trigger and upload
      }
      setSyncStatus("synced")
    } catch (e) {
      console.error("Activate sync failed", e)
      setSyncStatus("error")
    }
  }, [])

  const deactivateSync = useCallback(() => {
    setSyncPassphrase(null)
    localStorage.removeItem("sync-passphrase")
    setSyncStatus("idle")
  }, [])

  // Manual sync: Force upload current progress to cloud
  const forceUpload = useCallback(async () => {
    if (!syncPassphrase) return
    setSyncStatus("syncing")
    try {
      await fetch(SYNC_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passphrase: syncPassphrase,
          data: progress,
          timestamp: Date.now(),
        }),
      })
      setSyncStatus("synced")
      setLastSynced(Date.now())
    } catch (error) {
      console.error("Force upload failed:", error)
      setSyncStatus("error")
    }
  }, [syncPassphrase, progress])

  // Manual sync: Force download from cloud and overwrite local
  const forceDownload = useCallback(async () => {
    if (!syncPassphrase) return
    setSyncStatus("syncing")
    try {
      const res = await fetch(`${SYNC_API_URL}?passphrase=${encodeURIComponent(syncPassphrase)}`)
      const json = await res.json()
      if (json.data) {
        setProgress(json.data)
        saveProgress(json.data)
        setLastSynced(json.timestamp)
      }
      setSyncStatus("synced")
    } catch (error) {
      console.error("Force download failed:", error)
      setSyncStatus("error")
    }
  }, [syncPassphrase])

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  const checkStreak = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10)
    updateProgress((prev) => {
      if (prev.lastActiveDate === today) return prev
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      const newStreak = prev.lastActiveDate === yesterday ? prev.currentStreak + 1 : 1
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
      }
    })
  }, [updateProgress])

  const addXP = useCallback(
    (amount: number) => {
      setXpAnimation(true)
      setTimeout(() => setXpAnimation(false), 500)
      checkStreak()
      updateProgress((prev) => {
        const newTotalXP = prev.totalXP + amount
        const newDailyXP = prev.dailyXP + amount
        const newLevel = getLevel(newTotalXP)
        const newAchievements = [...prev.achievements]

        // Check achievements
        if (newTotalXP >= 500 && !newAchievements.includes("xp-500")) {
          newAchievements.push("xp-500")
          setNewAchievement("500 XP")
        }
        if (newTotalXP >= 1000 && !newAchievements.includes("xp-1000")) {
          newAchievements.push("xp-1000")
          setNewAchievement("Mil Puntos")
        }
        if (newLevel >= 5 && !newAchievements.includes("level-5")) {
          newAchievements.push("level-5")
          setNewAchievement("Nivel 5")
        }

        const currentStreak = prev.currentStreak
        if (currentStreak >= 3 && !newAchievements.includes("streak-3")) {
          newAchievements.push("streak-3")
          setNewAchievement("En Racha")
        }
        if (currentStreak >= 7 && !newAchievements.includes("streak-7")) {
          newAchievements.push("streak-7")
          setNewAchievement("Semana Completa")
        }

        return {
          ...prev,
          totalXP: newTotalXP,
          dailyXP: newDailyXP,
          level: newLevel,
          achievements: newAchievements,
        }
      })
    },
    [updateProgress, checkStreak]
  )

  const completeLesson = useCallback(
    (lessonId: string) => {
      updateProgress((prev) => {
        if (prev.completedLessons.includes(lessonId)) return prev
        const newCompleted = [...prev.completedLessons, lessonId]
        const newAchievements = [...prev.achievements]
        if (newCompleted.length === 1 && !newAchievements.includes("first-lesson")) {
          newAchievements.push("first-lesson")
          setNewAchievement("Primer Paso")
        }
        return { ...prev, completedLessons: newCompleted, achievements: newAchievements }
      })
    },
    [updateProgress]
  )

  const completeExercise = useCallback(
    (exerciseId: string) => {
      updateProgress((prev) => {
        if (prev.completedExercises.includes(exerciseId)) return prev
        return { ...prev, completedExercises: [...prev.completedExercises, exerciseId] }
      })
    },
    [updateProgress]
  )

  const completeChapter = useCallback(
    (chapterId: string) => {
      updateProgress((prev) => {
        if (prev.completedChapters.includes(chapterId)) return prev
        const newCompleted = [...prev.completedChapters, chapterId]
        const newAchievements = [...prev.achievements]
        if (!newAchievements.includes("first-chapter")) {
          newAchievements.push("first-chapter")
          setNewAchievement("Capitulo Completo")
        }
        return { ...prev, completedChapters: newCompleted, achievements: newAchievements }
      })
    },
    [updateProgress]
  )

  const loseHeart = useCallback(() => {
    updateProgress((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }))
  }, [updateProgress])

  const resetDailyXP = useCallback(() => {
    updateProgress((prev) => ({ ...prev, dailyXP: 0 }))
  }, [updateProgress])

  const dismissAchievement = useCallback(() => {
    setNewAchievement(null)
    updateProgress(prev => {
      // Remove from pending queue if we had one (simplified here)
      return prev
    })
  }, []) // Removed dependency on updateProgress to avoid loop

  const resetProgress = useCallback(() => {
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem("sync-passphrase")
    }
    // Reset state to initial
    setProgress(INITIAL_PROGRESS)
    setSyncPassphrase(null)
    setSyncStatus("idle")
    setLastSynced(null)
  }, [])

  return {
    progress,
    loaded,
    xpAnimation,
    newAchievement,
    addXP,
    completeLesson,
    completeExercise,
    completeChapter,
    loseHeart,
    checkStreak,
    resetDailyXP,
    dismissAchievement,
    allAchievements: ACHIEVEMENTS,
    xpPerLevel: XP_PER_LEVEL,
    sync: {
      status: syncStatus,
      lastSynced,
      isactive: !!syncPassphrase,
      activate: activateSync,
      deactivate: deactivateSync,
      forceUpload,
      forceDownload,
      resetProgress,
    }
  }
}

