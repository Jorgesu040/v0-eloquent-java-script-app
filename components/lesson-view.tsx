"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code,
  CheckCircle2,
  Zap,
  Lightbulb,
} from "lucide-react"
import type { Chapter, Lesson, UserProgress } from "@/lib/course-data"
import { ExerciseCard } from "./exercise-card"
import { cn } from "@/lib/utils"

interface LessonViewProps {
  chapter: Chapter
  lesson: Lesson
  progress: UserProgress
  onComplete: () => void
  onBack: () => void
  onExerciseComplete: (exerciseId: string, correct: boolean) => void
}

type LessonStage = "content" | "exercises" | "complete"

export function LessonView({
  chapter,
  lesson,
  progress,
  onComplete,
  onBack,
  onExerciseComplete,
}: LessonViewProps) {
  const [stage, setStage] = useState<LessonStage>("content")
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0)
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([])

  const totalSteps = lesson.sections.length + lesson.exercises.length + 1 // +1 for complete
  const currentStep =
    stage === "content"
      ? currentSectionIdx + 1
      : stage === "exercises"
        ? lesson.sections.length + currentExerciseIdx + 1
        : totalSteps

  const progressPercent = (currentStep / totalSteps) * 100
  const currentSection = lesson.sections[currentSectionIdx]
  const currentExercise = lesson.exercises[currentExerciseIdx]

  const handleNextSection = () => {
    if (currentSectionIdx < lesson.sections.length - 1) {
      setCurrentSectionIdx((prev) => prev + 1)
    } else {
      if (lesson.exercises.length > 0) {
        setStage("exercises")
      } else {
        setStage("complete")
        onComplete()
      }
    }
  }

  const handlePrevSection = () => {
    if (currentSectionIdx > 0) {
      setCurrentSectionIdx((prev) => prev - 1)
    }
  }

  const handleExerciseAnswer = (correct: boolean) => {
    setExerciseResults((prev) => [...prev, correct])
    onExerciseComplete(currentExercise.id, correct)
  }

  const handleNextExercise = () => {
    if (currentExerciseIdx < lesson.exercises.length - 1) {
      setCurrentExerciseIdx((prev) => prev + 1)
    } else {
      setStage("complete")
      onComplete()
    }
  }

  const correctCount = exerciseResults.filter(Boolean).length
  const totalExercises = lesson.exercises.length
  const isPerfect = correctCount === totalExercises && totalExercises > 0

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Top bar */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="mb-1 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {currentStep}/{totalSteps}
        </span>
      </div>

      {/* Lesson header */}
      <div className="mb-6">
        <span className="mb-1 text-xs text-muted-foreground">
          Cap. {chapter.number} - {chapter.titleEs}
        </span>
        <h1 className="text-xl font-bold text-foreground">{lesson.title}</h1>
      </div>

      {/* Content Stage */}
      {stage === "content" && currentSection && (
        <div className="animate-slide-up">
          <div className="mb-6 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">{currentSection.title}</h2>
            </div>
            <p className="text-foreground leading-relaxed">{currentSection.content}</p>

            {currentSection.codeExample && (
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-[hsl(222,25%,8%)]">
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-[hsl(210,20%,70%)]">
                    Ejemplo
                  </span>
                </div>
                <pre className="overflow-x-auto p-4">
                  <code className="text-sm text-[hsl(145,63%,60%)] leading-relaxed">
                    {currentSection.codeExample}
                  </code>
                </pre>
              </div>
            )}

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-[hsl(var(--info))]/10 p-3">
              <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--info))]" />
              <p className="text-sm text-foreground/80">
                Toma tu tiempo para entender cada concepto antes de avanzar. Puedes volver a
                secciones anteriores si lo necesitas.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevSection}
              disabled={currentSectionIdx === 0}
              className={cn(
                "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                currentSectionIdx === 0
                  ? "text-muted-foreground/50"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <ArrowLeft className="h-4 w-4" /> Anterior
            </button>
            <div className="flex items-center gap-1">
              {lesson.sections.map((_, i) => (
                <div
                  key={`section-dot-${i}`}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    i === currentSectionIdx
                      ? "bg-primary"
                      : i < currentSectionIdx
                        ? "bg-primary/40"
                        : "bg-muted-foreground/20"
                  )}
                />
              ))}
            </div>
            <button
              onClick={handleNextSection}
              className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {currentSectionIdx < lesson.sections.length - 1 ? (
                <>
                  Siguiente <ArrowRight className="h-4 w-4" />
                </>
              ) : lesson.exercises.length > 0 ? (
                <>
                  Ejercicios <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Completar <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Exercises Stage */}
      {stage === "exercises" && currentExercise && (
        <div className="animate-slide-up">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-[hsl(var(--accent))]/10 px-2.5 py-0.5 text-xs font-bold text-[hsl(var(--accent-foreground))]">
              Ejercicio {currentExerciseIdx + 1} de {lesson.exercises.length}
            </span>
            <span className="flex items-center gap-1 text-xs text-[hsl(var(--xp-gold))]">
              <Zap className="h-3 w-3" />+{currentExercise.xpReward} XP
            </span>
          </div>

          <ExerciseCard
            exercise={currentExercise}
            onAnswer={handleExerciseAnswer}
            onNext={handleNextExercise}
            isLast={currentExerciseIdx === lesson.exercises.length - 1}
          />
        </div>
      )}

      {/* Complete Stage */}
      {stage === "complete" && (
        <div className="animate-bounce-in text-center">
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-8">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {isPerfect ? "Perfecto!" : "Leccion Completada!"}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {isPerfect
                ? "Respondiste todas las preguntas correctamente!"
                : `Completaste "${lesson.title}"`}
            </p>

            {/* Results */}
            <div className="mb-6 flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[hsl(var(--xp-gold))]">
                  +{lesson.xpReward}
                </p>
                <p className="text-xs text-muted-foreground">XP ganados</p>
              </div>
              {totalExercises > 0 && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {correctCount}/{totalExercises}
                  </p>
                  <p className="text-xs text-muted-foreground">Respuestas correctas</p>
                </div>
              )}
              {isPerfect && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-[hsl(var(--accent))]">+40</p>
                  <p className="text-xs text-muted-foreground">Bonus perfecto</p>
                </div>
              )}
            </div>

            <button
              onClick={onBack}
              className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
