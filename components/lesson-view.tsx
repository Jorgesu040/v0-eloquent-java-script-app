"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code,
  CheckCircle2,
  Zap,
  Lightbulb,
} from "lucide-react"
import type { Chapter, Lesson, UserProgress, ContentBlock, Section } from "@/lib/course-data"
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

function ContentRenderer({ content }: { content: ContentBlock[] }) {
  if (!content) return null

  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            )
          case "code":
            // Normalize language string if needed
            const language = block.language || "javascript"
            return (
              <div
                key={index}
                className="my-4 overflow-hidden rounded-lg border border-border bg-[hsl(222,25%,8%)]"
              >
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-[hsl(210,20%,70%)]">
                    {language.toUpperCase()}
                  </span>
                </div>
                <pre className="overflow-x-auto p-4">
                  <code className="text-sm text-[hsl(145,63%,60%)] leading-relaxed whitespace-pre-wrap">
                    {block.content}
                  </code>
                </pre>
              </div>
            )
          case "blockquote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary/50 bg-muted/30 p-4 italic text-muted-foreground my-4"
              >
                {block.content}
              </blockquote>
            )
          case "list":
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                {block.content.map((item, i) => (
                  <li key={i} className="text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            )
          case "image":
            return (
              <figure key={index} className="my-6">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="mx-auto rounded-lg border border-border bg-muted max-h-[400px] object-contain"
                />
                {block.caption && (
                  <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          case "table":
            return (
              <div key={index} className="my-4 overflow-x-auto">
                <table className="w-full border-collapse border border-border rounded-lg">
                  <tbody>
                    {block.content.map((row: string[], rowIdx: number) => (
                      <tr key={rowIdx} className={rowIdx === 0 ? "bg-muted/50" : ""}>
                        {row.map((cell: string, cellIdx: number) => (
                          <td
                            key={cellIdx}
                            className="border border-border px-3 py-2 text-sm"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case "heading":
            return (
              <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
                {block.content}
              </h3>
            )
          case "definition-list":
            return (
              <dl key={index} className="my-4 space-y-3">
                {block.content.map((item: { term: string; definition: string }, i: number) => (
                  <div key={i} className="border-l-2 border-primary/30 pl-4">
                    <dt className="font-medium text-foreground">{item.term}</dt>
                    <dd className="text-muted-foreground text-sm mt-1">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            )
          case "details":
            return (
              <details key={index} className="my-4 rounded-lg border border-border bg-muted/20 p-4">
                <summary className="cursor-pointer font-medium text-foreground">
                  {block.summary}
                </summary>
                <div className="mt-3 text-muted-foreground">
                  {block.content}
                </div>
              </details>
            )
          case "divider":
            return (
              <hr key={index} className="my-6 border-t border-border" />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

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
  const [isInterleavedExercise, setIsInterleavedExercise] = useState(false)
  const [completedInterleavedExercises, setCompletedInterleavedExercises] = useState<Set<string>>(new Set())

  const topRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    // Scroll to top when section changes
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSectionIdx, stage]);

  const handleNextSection = () => {
    // Check for interleaved exercise
    if (currentSection.exercise && !completedInterleavedExercises.has(currentSection.exercise.id) && !isInterleavedExercise) {
      setIsInterleavedExercise(true)
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      return
    }

    if (currentSectionIdx < lesson.sections.length - 1) {
      setCurrentSectionIdx((prev) => prev + 1)
      setIsInterleavedExercise(false)
    } else {
      if (lesson.exercises.length > 0) {
        setStage("exercises")
      } else {
        setStage("complete")
        onComplete()
      }
    }
  }

  const handleInterleavedExerciseNext = () => {
    if (currentSection.exercise) {
      const newSet = new Set(completedInterleavedExercises)
      newSet.add(currentSection.exercise.id)
      setCompletedInterleavedExercises(newSet)
    }
    setIsInterleavedExercise(false)

    // Auto-advance to next section
    if (currentSectionIdx < lesson.sections.length - 1) {
      setCurrentSectionIdx((prev) => prev + 1)
    } else {
      // Same logic as handleNextSection for end of content
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
    <div className="mx-auto max-w-2xl px-4 py-6" ref={topRef}>
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
          {isInterleavedExercise && currentSection.exercise ? (
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-[hsl(var(--accent))]/10 px-2.5 py-0.5 text-xs font-bold text-[hsl(var(--accent-foreground))]">
                  Ejercicio Rápido
                </span>
                <span className="flex items-center gap-1 text-xs text-[hsl(var(--xp-gold))]">
                  <Zap className="h-3 w-3" />+{currentSection.exercise.xpReward || 10} XP
                </span>
              </div>
              <ExerciseCard
                exercise={currentSection.exercise}
                onAnswer={(correct) => onExerciseComplete(currentSection.exercise!.id, correct)}
                onNext={handleInterleavedExerciseNext}
                isLast={false}
              />
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">{currentSection.title}</h2>
                </div>

                <ContentRenderer content={currentSection.content} />

              </div>

              <div className="mt-6 flex items-start gap-2 rounded-lg bg-[hsl(var(--info))]/10 p-3 mb-6">
                <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--info))]" />
                <p className="text-sm text-foreground/80">
                  Tómate tu tiempo. Cuando estés listo, continúa a la siguiente sección.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pb-10">
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
                <div className="flex items-center gap-1 hidden sm:flex">
                  {lesson.sections.length <= 15 && lesson.sections.map((_, i) => (
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
                  {currentSection.exercise && !completedInterleavedExercises.has(currentSection.exercise.id) ? (
                    <>
                      Ejercicio <Zap className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    currentSectionIdx < lesson.sections.length - 1 ? (
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
                    )
                  )}
                </button>
              </div>
            </>
          )}
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
              {isPerfect ? "Perfecto!" : "Lección Completada!"}
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
