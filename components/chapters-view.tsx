"use client"

import React from "react"

import {
  BookOpen,
  Hash,
  GitBranch,
  Zap,
  Layers,
  ArrowUpRight,
  Box,
  Bot,
  Bug,
  Search,
  Package,
  Clock,
  Terminal,
  Globe,
  FileCode,
  MousePointer,
  Gamepad2,
  Paintbrush,
  Send,
  Grid3x3,
  Server,
  Users,
  Check,
  Lock,
  Star,
  ChevronRight,
} from "lucide-react"
import { type UserProgress, CHAPTERS, getPartColor } from "@/lib/course-data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Hash,
  GitBranch,
  Zap,
  Layers,
  ArrowUpRight,
  Box,
  Bot,
  Bug,
  Search,
  Package,
  Clock,
  Terminal,
  Globe,
  FileCode,
  MousePointer,
  Gamepad2,
  Paintbrush,
  Send,
  Grid3x3,
  Server,
  Users,
}

interface ChaptersViewProps {
  progress: UserProgress
  onStartLesson: (chapterId: string, lessonId: string) => void
}

export function ChaptersView({ progress, onStartLesson }: ChaptersViewProps) {
  const parts = [
    { id: "intro", label: "Inicio", chapters: CHAPTERS.filter((c) => c.part === "intro") },
    {
      id: "part1",
      label: "Parte 1: Lenguaje",
      chapters: CHAPTERS.filter((c) => c.part === "part1"),
    },
    {
      id: "part2",
      label: "Parte 2: Navegador",
      chapters: CHAPTERS.filter((c) => c.part === "part2"),
    },
    { id: "part3", label: "Parte 3: Node", chapters: CHAPTERS.filter((c) => c.part === "part3") },
  ]

  // Determine which chapters are unlocked
  const isChapterUnlocked = (chapterIndex: number) => {
    if (chapterIndex === 0) return true
    const prevChapter = CHAPTERS[chapterIndex - 1]
    const prevAllDone = prevChapter.lessons.every((l) =>
      progress.completedLessons.includes(l.id)
    )
    // Unlock if previous chapter is done OR if any lesson in this chapter is started
    const thisChapter = CHAPTERS[chapterIndex]
    const thisStarted = thisChapter.lessons.some((l) =>
      progress.completedLessons.includes(l.id)
    )
    return prevAllDone || thisStarted || chapterIndex <= 2
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground text-balance">Mapa de Capitulos</h1>
        <p className="text-muted-foreground">
          Navega por todo el contenido de Eloquent JavaScript
        </p>
      </div>

      {parts.map((part) => (
        <div key={part.id} className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: getPartColor(part.id) }}
            />
            <h2 className="text-lg font-bold text-foreground">{part.label}</h2>
          </div>

          <div className="space-y-3">
            {part.chapters.map((chapter) => {
              const globalIdx = CHAPTERS.findIndex((c) => c.id === chapter.id)
              const unlocked = isChapterUnlocked(globalIdx)
              const totalLessons = chapter.lessons.length
              const completedLessons = chapter.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length
              const isComplete = completedLessons === totalLessons && totalLessons > 0
              const percent =
                totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
              const Icon = iconMap[chapter.icon] || BookOpen

              return (
                <div
                  key={chapter.id}
                  className={cn(
                    "rounded-xl border border-border bg-card transition-all",
                    !unlocked && "opacity-50",
                    isComplete && "border-primary/30"
                  )}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon circle */}
                      <div
                        className={cn(
                          "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
                          isComplete
                            ? "bg-primary text-primary-foreground"
                            : unlocked
                              ? "bg-muted text-foreground"
                              : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isComplete ? (
                          <Check className="h-6 w-6" />
                        ) : !unlocked ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            Capitulo {chapter.number}
                          </span>
                          {chapter.isProject && (
                            <span className="rounded-full bg-[hsl(var(--accent))]/10 px-2 py-0.5 text-xs font-medium text-[hsl(var(--accent-foreground))]">
                              Proyecto
                            </span>
                          )}
                          {isComplete && (
                            <Star className="h-3.5 w-3.5 fill-[hsl(var(--xp-gold))] text-[hsl(var(--xp-gold))]" />
                          )}
                        </div>
                        <h3 className="mb-1 text-base font-bold text-foreground">
                          {chapter.titleEs}
                        </h3>
                        <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                          {chapter.description}
                        </p>

                        {/* Progress bar */}
                        <div className="mb-3 flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">
                            {completedLessons}/{totalLessons}
                          </span>
                        </div>

                        {/* Lessons list */}
                        {unlocked && (
                          <div className="space-y-1">
                            {chapter.lessons.map((lesson) => {
                              const lessonComplete =
                                progress.completedLessons.includes(lesson.id)
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => onStartLesson(chapter.id, lesson.id)}
                                  className={cn(
                                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors",
                                    lessonComplete
                                      ? "bg-primary/5 text-primary"
                                      : "bg-muted/50 text-foreground hover:bg-muted"
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    {lessonComplete ? (
                                      <Check className="h-4 w-4 text-primary" />
                                    ) : (
                                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                                    )}
                                    <span className="text-sm font-medium">
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                      +{lesson.xpReward} XP
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
