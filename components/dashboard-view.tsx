"use client"

import {
  Flame,
  Zap,
  Trophy,
  Target,
  BookOpen,
  Star,
  ArrowRight,
  TrendingUp,
  Calendar,
} from "lucide-react"
import {
  type UserProgress,
  CHAPTERS,
  getLevel,
  getXPForCurrentLevel,
  getLevelTitle,
  XP_PER_LEVEL,
} from "@/lib/course-data"
import { cn } from "@/lib/utils"

interface DashboardViewProps {
  progress: UserProgress
  onStartLesson: (chapterId: string, lessonId: string) => void
  onNavigate: (view: string) => void
}

export function DashboardView({ progress, onStartLesson, onNavigate }: DashboardViewProps) {
  const level = getLevel(progress.totalXP)
  const levelXP = getXPForCurrentLevel(progress.totalXP)
  const levelTitle = getLevelTitle(level)
  const dailyProgress = Math.min((progress.dailyXP / progress.dailyGoal) * 100, 100)

  // Find next uncompleted lesson
  const nextLesson = (() => {
    for (const chapter of CHAPTERS) {
      for (const lesson of chapter.lessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return { chapter, lesson }
        }
      }
    }
    return null
  })()

  // Recent chapters with progress
  const chapterProgress = CHAPTERS.slice(0, 6).map((ch) => {
    const totalLessons = ch.lessons.length
    const completedLessons = ch.lessons.filter((l) =>
      progress.completedLessons.includes(l.id)
    ).length
    return { ...ch, totalLessons, completedLessons, percent: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0 }
  })

  // Stats
  const totalLessonsCompleted = progress.completedLessons.length
  const totalExercisesCompleted = progress.completedExercises.length
  const totalChaptersCompleted = progress.completedChapters.length

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Welcome & Continue Section */}
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-foreground text-balance">
          Bienvenido de vuelta
        </h1>
        <p className="text-muted-foreground">
          Sigue aprendiendo JavaScript con Eloquent JavaScript
        </p>
      </div>

      {/* Main CTA - Continue Learning */}
      {nextLesson && (
        <button
          onClick={() => onStartLesson(nextLesson.chapter.id, nextLesson.lesson.id)}
          className="group mb-8 w-full rounded-2xl border border-primary/20 bg-primary/5 p-6 text-left transition-all hover:border-primary/40 hover:bg-primary/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  Continuar
                </span>
                <span className="text-xs text-muted-foreground">
                  Cap. {nextLesson.chapter.number}
                </span>
              </div>
              <h2 className="mb-1 text-lg font-bold text-foreground">
                {nextLesson.lesson.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {nextLesson.chapter.titleEs}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-[hsl(var(--xp-gold))]">
                  <Zap className="h-3.5 w-3.5" />+{nextLesson.lesson.xpReward} XP
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  {nextLesson.lesson.sections.length} secciones
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Target className="h-3.5 w-3.5" />
                  {nextLesson.lesson.exercises.length} ejercicios
                </span>
              </div>
            </div>
            <div className="ml-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <ArrowRight className="h-6 w-6" />
            </div>
          </div>
        </button>
      )}

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Level & XP */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-primary">Nv. {level}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{levelTitle}</p>
          <div className="mt-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Siguiente nivel</span>
              <span className="text-xs font-medium text-foreground">
                {levelXP}/{XP_PER_LEVEL}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${(levelXP / XP_PER_LEVEL) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <Flame className="h-5 w-5 text-[hsl(var(--streak-orange))]" />
            <span className="text-xs text-muted-foreground">Mejor: {progress.longestStreak}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.currentStreak}</p>
          <p className="text-xs text-muted-foreground">
            {progress.currentStreak === 1 ? "dia de racha" : "dias de racha"}
          </p>
        </div>

        {/* Daily Goal */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <Target className="h-5 w-5 text-[hsl(var(--info))]" />
            {dailyProgress >= 100 && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
                Completado
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.dailyXP}</p>
          <p className="text-xs text-muted-foreground">de {progress.dailyGoal} XP hoy</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[hsl(var(--info))] transition-all duration-700"
              style={{ width: `${dailyProgress}%` }}
            />
          </div>
        </div>

        {/* Total XP */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <Zap className="h-5 w-5 text-[hsl(var(--xp-gold))]" />
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{progress.totalXP}</p>
          <p className="text-xs text-muted-foreground">XP totales</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <div className="flex-1 text-center">
          <p className="text-xl font-bold text-foreground">{totalLessonsCompleted}</p>
          <p className="text-xs text-muted-foreground">Lecciones</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="flex-1 text-center">
          <p className="text-xl font-bold text-foreground">{totalExercisesCompleted}</p>
          <p className="text-xs text-muted-foreground">Ejercicios</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="flex-1 text-center">
          <p className="text-xl font-bold text-foreground">{totalChaptersCompleted}</p>
          <p className="text-xs text-muted-foreground">Capitulos</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="flex-1 text-center">
          <p className="text-xl font-bold text-foreground">{progress.achievements.length}</p>
          <p className="text-xs text-muted-foreground">Logros</p>
        </div>
      </div>

      {/* Chapter Progress Cards */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Tu Progreso</h2>
        <button
          onClick={() => onNavigate("chapters")}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Ver todos <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {chapterProgress.map((ch) => (
          <button
            key={ch.id}
            onClick={() => {
              if (ch.lessons.length > 0) {
                onStartLesson(ch.id, ch.lessons[0].id)
              }
            }}
            className={cn(
              "group rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm",
              ch.percent === 100 && "border-primary/30 bg-primary/5"
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {ch.partLabel}
              </span>
              {ch.isProject && (
                <span className="rounded-full bg-[hsl(var(--accent))]/10 px-2 py-0.5 text-xs font-medium text-[hsl(var(--accent-foreground))]">
                  Proyecto
                </span>
              )}
              {ch.percent === 100 && (
                <Star className="h-4 w-4 fill-[hsl(var(--xp-gold))] text-[hsl(var(--xp-gold))]" />
              )}
            </div>
            <h3 className="mb-1 text-sm font-bold text-foreground">
              {ch.number}. {ch.titleEs}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${ch.percent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {ch.completedLessons}/{ch.totalLessons}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
