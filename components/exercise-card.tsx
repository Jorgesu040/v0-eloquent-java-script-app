"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, Zap } from "lucide-react"
import type { Exercise } from "@/lib/course-data"
import { cn } from "@/lib/utils"

interface ExerciseCardProps {
  exercise: Exercise
  onAnswer: (correct: boolean) => void
  onNext: () => void
  isLast: boolean
}

export function ExerciseCard({ exercise, onAnswer, onNext, isLast }: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [codeAnswer, setCodeAnswer] = useState(exercise.initialCode || "")

  const handleSelect = (option: string) => {
    if (hasAnswered) return
    setSelectedAnswer(option)
  }

  const handleSubmit = () => {
    if (hasAnswered) return

    if (exercise.type === 'code') {
      // Simplistic check: normalize whitespace and check if it contains expected output or solution
      // For now, let's just check if it matches solution or expected output exactly-ish
      // Real code execution is hard, so we might just check if they typed the right thing
      const normalizedInput = codeAnswer.replace(/\s+/g, ' ').trim()
      const normalizedSolution = (exercise.solution || "").replace(/\s+/g, ' ').trim()
      const normalizedExpected = (exercise.expectedOutput || "").replace(/\s+/g, ' ').trim()

      const isCorrect = normalizedInput.includes(normalizedSolution) || normalizedInput.includes(normalizedExpected)

      setIsCorrect(isCorrect)
      setHasAnswered(true)
      onAnswer(isCorrect)
      return
    }

    if (!selectedAnswer) return
    const correct = selectedAnswer === exercise.correctOptionIndex?.toString() || selectedAnswer === exercise.options?.[exercise.correctOptionIndex || 0]
    // The previous logic used 'correctAnswer' string. The new Exercise interface has 'correctOptionIndex'.
    // We need to support both or migrate. 
    // Let's assume we migrated to correctOptionIndex in data, but ExerciseCard logic was using string match.
    // Let's fix selectedAnswer to store the option TEXT.

    // START FIX: 
    // The Exercise interface in course-data.ts uses `correctOptionIndex`.
    // The ExerciseCard logic uses `selectedAnswer === exercise.correctAnswer`.

    // We need to resolve this.
    // Let's use `correctOptionIndex` if available.

    let isRight = false;
    if (exercise.correctOptionIndex !== undefined && exercise.options) {
      isRight = selectedAnswer === exercise.options[exercise.correctOptionIndex]
    } else {
      // Fallback for old interface if any
      isRight = false // validation fail if data is bad
    }

    setIsCorrect(isRight)
    setHasAnswered(true)
    onAnswer(isRight)
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setCodeAnswer(exercise.initialCode || "")
    setHasAnswered(false)
    setIsCorrect(false)
    onNext()
  }

  const typeLabel = (() => {
    switch (exercise.type) {
      case "quiz":
        return "Opción Múltiple"
      case "code":
        return "Código"
      default:
        return "Ejercicio"
    }
  })()

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {/* Type badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {typeLabel}
        </span>
      </div>

      {/* Question */}
      <h3 className="mb-6 text-lg font-bold text-foreground leading-relaxed">{exercise.prompt}</h3>

      {/* Content based on type */}
      {exercise.type === 'code' ? (
        <div className="mb-6">
          <div className="relative overflow-hidden rounded-lg border border-border bg-muted/50">
            <textarea
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              disabled={hasAnswered}
              className="w-full min-h-[150px] bg-transparent p-4 font-mono text-sm focus:outline-none resize-y"
              placeholder="// Escribe tu código aquí..."
              spellCheck={false}
            />
          </div>
          {hasAnswered && !isCorrect && exercise.solution && (
            <div className="mt-4 rounded-lg bg-muted p-4">
              <p className="mb-2 text-xs font-bold text-muted-foreground">Solución:</p>
              <pre className="text-sm font-mono text-foreground overflow-x-auto">
                {exercise.solution}
              </pre>
            </div>
          )}
        </div>
      ) : (
        /* Options for Quiz */
        <div className="mb-6 space-y-2">
          {exercise.options?.map((option, idx) => {
            const isSelected = selectedAnswer === option
            const isCorrectOption = idx === exercise.correctOptionIndex
            const showCorrect = hasAnswered && isCorrectOption
            const showWrong = hasAnswered && isSelected && !isCorrectOption

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={hasAnswered}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
                  !hasAnswered && isSelected
                    ? "border-primary bg-primary/5 text-foreground"
                    : !hasAnswered && !isSelected
                      ? "border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted/50"
                      : showCorrect
                        ? "border-primary bg-primary/10 text-foreground"
                        : showWrong
                          ? "border-destructive bg-destructive/10 text-foreground"
                          : "border-border bg-card text-muted-foreground"
                )}
              >
                {/* Indicator */}
                <div
                  className={cn(
                    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    !hasAnswered && isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : !hasAnswered
                        ? "border-muted-foreground/30"
                        : showCorrect
                          ? "border-primary bg-primary text-primary-foreground"
                          : showWrong
                            ? "border-destructive bg-destructive text-destructive-foreground"
                            : "border-muted-foreground/20"
                  )}
                >
                  {showCorrect && <CheckCircle2 className="h-4 w-4" />}
                  {showWrong && <XCircle className="h-4 w-4" />}
                  {!hasAnswered && isSelected && (
                    <div className="h-3 w-3 rounded-full bg-primary-foreground" />
                  )}
                </div>

                <span className="text-sm font-medium">{option}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Feedback */}
      {hasAnswered && (
        <div
          className={cn(
            "mb-6 animate-slide-up rounded-lg p-4",
            isCorrect ? "bg-primary/10" : "bg-destructive/10"
          )}
        >
          <div className="mb-2 flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold text-primary">Correcto!</span>
                <span className="flex items-center gap-1 text-xs text-[hsl(var(--xp-gold))]">
                  <Zap className="h-3 w-3" />+{exercise.xpReward || 10} XP
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="font-bold text-destructive">Incorrecto</span>
              </>
            )}
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <p className="text-sm text-foreground/80 leading-relaxed">{exercise.explanation}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!hasAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={exercise.type === 'quiz' ? !selectedAnswer : !codeAnswer}
            className={cn(
              "rounded-xl px-6 py-2.5 text-sm font-bold transition-all",
              (exercise.type === 'quiz' ? selectedAnswer : codeAnswer)
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
          >
            Comprobar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isLast ? "Continuar" : "Siguiente"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
