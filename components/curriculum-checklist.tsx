"use client"

import { CheckCircle, Circle, ChevronDown, ChevronRight, Play } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { CHAPTERS, type UserProgress } from "@/lib/course-data"

interface CurriculumChecklistProps {
    progress: UserProgress
    onStartLesson: (chapterId: string, lessonId: string) => void
}

export function CurriculumChecklist({ progress, onStartLesson }: CurriculumChecklistProps) {
    const [expandedChapters, setExpandedChapters] = useState<string[]>(
        CHAPTERS.map(c => c.id) // Default all expanded
    )

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(id => id !== chapterId)
                : [...prev, chapterId]
        )
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-6">
            <h1 className="mb-6 text-2xl font-bold text-foreground">Plan de Estudios</h1>

            <div className="space-y-4">
                {CHAPTERS.map((chapter) => {
                    const isExpanded = expandedChapters.includes(chapter.id)
                    const completedLessons = chapter.lessons.filter(l =>
                        progress.completedLessons.includes(l.id)
                    ).length
                    const totalLessons = chapter.lessons.length
                    const isChapterComplete = completedLessons === totalLessons && totalLessons > 0

                    return (
                        <div key={chapter.id} className="overflow-hidden rounded-xl border border-border bg-card">
                            <div
                                className="flex cursor-pointer items-center justify-between bg-card p-4 transition-colors hover:bg-accent/50"
                                onClick={() => toggleChapter(chapter.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-lg border",
                                        isChapterComplete
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-muted bg-muted/50 text-muted-foreground"
                                    )}>
                                        {isChapterComplete ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-bold">{chapter.number}</span>}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{chapter.titleEs}</h3>
                                        <p className="text-xs text-muted-foreground">{completedLessons}/{totalLessons} lecciones</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {chapter.isProject && (
                                        <span className="rounded-full bg-[hsl(var(--accent))]/10 px-2 py-0.5 text-xs font-medium text-[hsl(var(--accent-foreground))]">
                                            Proyecto
                                        </span>
                                    )}
                                    {isExpanded ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="border-t border-border bg-muted/30 p-2">
                                    <div className="space-y-1">
                                        {chapter.lessons.map((lesson) => {
                                            const isCompleted = progress.completedLessons.includes(lesson.id)
                                            const isLocked = !isCompleted && !progress.completedLessons.includes(
                                                chapter.lessons[chapter.lessons.indexOf(lesson) - 1]?.id
                                            ) && chapter.lessons.indexOf(lesson) > 0 && !progress.completedChapters.includes(CHAPTERS[CHAPTERS.indexOf(chapter) - 1]?.id)

                                            // Simplified lock logic: just check if it's completed or not for now, 
                                            // or if user wants to jump around (Eloquent is flexible). 
                                            // Let's allow jumping for now or visual indication only.

                                            return (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => onStartLesson(chapter.id, lesson.id)}
                                                    className={cn(
                                                        "group flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-accent",
                                                        isCompleted ? "text-muted-foreground" : "text-foreground"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {isCompleted ? (
                                                            <CheckCircle className="h-4 w-4 text-primary" />
                                                        ) : (
                                                            <Circle className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                        <span className={cn("text-sm", isCompleted && "line-through opacity-70")}>
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                    {!isCompleted && (
                                                        <Play className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
