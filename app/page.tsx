"use client"

import { useState, useCallback } from "react"
import { useProgress } from "@/hooks/use-progress"
import { CHAPTERS } from "@/lib/course-data"
import { AppHeader } from "@/components/app-header"
import { DashboardView } from "@/components/dashboard-view"
import { ChaptersView } from "@/components/chapters-view"
import { LessonView } from "@/components/lesson-view"
import { AchievementsView } from "@/components/achievements-view"
import { CurriculumChecklist } from "@/components/curriculum-checklist"
import { AchievementPopup } from "@/components/achievement-popup"
import { CreditsFooter } from "@/components/credits-footer"

type AppView = "dashboard" | "chapters" | "lesson" | "achievements" | "checklist"

interface LessonState {
  chapterId: string
  lessonId: string
}

export default function Page() {
  const [currentView, setCurrentView] = useState<AppView>("dashboard")
  const [activeLessonState, setActiveLessonState] = useState<LessonState | null>(null)
  const {
    progress,
    loaded,
    xpAnimation,
    newAchievement,
    addXP,
    completeLesson,
    completeExercise,
    completeChapter,
    loseHeart,
    dismissAchievement,
    sync,
  } = useProgress()

  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view as AppView)
    setActiveLessonState(null)
  }, [])

  const handleStartLesson = useCallback(
    (chapterId: string, lessonId: string) => {
      setActiveLessonState({ chapterId, lessonId })
      setCurrentView("lesson")
    },
    []
  )

  const handleLessonComplete = useCallback(() => {
    if (!activeLessonState) return
    const chapter = CHAPTERS.find((c) => c.id === activeLessonState.chapterId)
    const lesson = chapter?.lessons.find((l) => l.id === activeLessonState.lessonId)
    if (!lesson || !chapter) return

    completeLesson(lesson.id)
    addXP(lesson.xpReward)

    // Check if chapter is fully complete
    const allLessonsDone = chapter.lessons.every(
      (l) =>
        l.id === lesson.id || progress.completedLessons.includes(l.id)
    )
    if (allLessonsDone) {
      completeChapter(chapter.id)
    }
  }, [activeLessonState, progress, completeLesson, completeChapter, addXP])

  const handleExerciseComplete = useCallback(
    (exerciseId: string, correct: boolean) => {
      if (correct) {
        completeExercise(exerciseId)
        const chapter = CHAPTERS.find((c) => c.id === activeLessonState?.chapterId)
        const lesson = chapter?.lessons.find((l) => l.id === activeLessonState?.lessonId)
        const exercise = lesson?.exercises.find((e) => e.id === exerciseId)
        if (exercise) {
          addXP(exercise.xpReward || 0)
        }
      } else {
        loseHeart()
      }
    },
    [activeLessonState, completeExercise, addXP, loseHeart]
  )

  const handleLessonBack = useCallback(() => {
    setCurrentView("chapters")
    setActiveLessonState(null)
  }, [])

  // Loading state
  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Cargando tu progreso...</p>
        </div>
      </div>
    )
  }

  // Find active chapter and lesson
  const activeChapter = activeLessonState
    ? CHAPTERS.find((c) => c.id === activeLessonState.chapterId)
    : null
  const activeLesson = activeChapter
    ? activeChapter.lessons.find((l) => l.id === activeLessonState?.lessonId)
    : null

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        totalXP={progress.totalXP}
        currentStreak={progress.currentStreak}
        hearts={progress.hearts}
        dailyXP={progress.dailyXP}
        dailyGoal={progress.dailyGoal}
        xpAnimation={xpAnimation}
        onNavigate={handleNavigate}
        currentView={currentView}
        sync={sync}
      />

      <main>
        {currentView === "dashboard" && (
          <DashboardView
            progress={progress}
            onStartLesson={handleStartLesson}
            onNavigate={handleNavigate}
          />
        )}
        {currentView === "checklist" && (
          <CurriculumChecklist progress={progress} onStartLesson={handleStartLesson} />
        )}
        {currentView === "chapters" && (
          <ChaptersView progress={progress} onStartLesson={handleStartLesson} />
        )}
        {currentView === "achievements" && (
          <AchievementsView progress={progress} />
        )}
        {currentView === "lesson" && activeChapter && activeLesson && (
          <LessonView
            chapter={activeChapter}
            lesson={activeLesson}
            progress={progress}
            onComplete={handleLessonComplete}
            onBack={handleLessonBack}
            onExerciseComplete={handleExerciseComplete}
          />
        )}
      </main>

      {/* Achievement popup */}
      {newAchievement && (
        <AchievementPopup title={newAchievement} onDismiss={dismissAchievement} />
      )}

      {/* Credits Footer */}
      <CreditsFooter />
    </div>
  )
}
