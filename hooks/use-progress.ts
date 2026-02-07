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

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS)
  const [loaded, setLoaded] = useState(false)
  const [xpAnimation, setXpAnimation] = useState(false)
  const [newAchievement, setNewAchievement] = useState<string | null>(null)

  useEffect(() => {
    setProgress(loadProgress())
    setLoaded(true)
  }, [])

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
  }
}
