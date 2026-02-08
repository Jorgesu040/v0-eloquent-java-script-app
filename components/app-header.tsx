"use client"

import { Flame, Heart, Zap, Trophy, BookOpen } from "lucide-react"
import { getLevel, getXPForCurrentLevel, getLevelTitle, XP_PER_LEVEL } from "@/lib/course-data"
import { cn } from "@/lib/utils"

interface AppHeaderProps {
  totalXP: number
  currentStreak: number
  hearts: number
  dailyXP: number
  dailyGoal: number
  xpAnimation: boolean
  onNavigate: (view: string) => void
  currentView: string
}

export function AppHeader({
  totalXP,
  currentStreak,
  hearts,
  dailyXP,
  dailyGoal,
  xpAnimation,
  onNavigate,
  currentView,
}: AppHeaderProps) {
  const level = getLevel(totalXP)
  const levelXP = getXPForCurrentLevel(totalXP)
  const levelTitle = getLevelTitle(level)
  const dailyProgress = Math.min((dailyXP / dailyGoal) * 100, 100)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none text-foreground">
              EloquentJS
            </p>
            <p className="text-xs text-muted-foreground">Aprende JavaScript</p>
          </div>
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {[
            { id: "dashboard", label: "Inicio" },
            { id: "chapters", label: "Capitulos" },
            { id: "checklist", label: "Plan" },
            { id: "achievements", label: "Logros" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                currentView === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Stats bar */}
        <div className="flex items-center gap-3">
          {/* Daily progress */}
          <div className="hidden items-center gap-1.5 md:flex">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {dailyXP}/{dailyGoal}
            </span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1">
            <Flame
              className={cn(
                "h-5 w-5",
                currentStreak > 0
                  ? "text-[hsl(var(--streak-orange))]"
                  : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-sm font-bold",
                currentStreak > 0
                  ? "text-[hsl(var(--streak-orange))]"
                  : "text-muted-foreground"
              )}
            >
              {currentStreak}
            </span>
          </div>

          {/* XP */}
          <div className={cn("flex items-center gap-1", xpAnimation && "animate-xp-pop")}>
            <Zap className="h-5 w-5 text-[hsl(var(--xp-gold))]" />
            <span className="text-sm font-bold text-[hsl(var(--xp-gold))]">
              {totalXP}
            </span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1">
            <Heart
              className={cn(
                "h-5 w-5",
                hearts > 0 ? "fill-destructive text-destructive" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-sm font-bold",
                hearts > 0 ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {hearts}
            </span>
          </div>

          {/* Level badge */}
          <div className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 lg:flex">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary">Nv.{level}</span>
            <span className="text-xs text-primary/70">{levelTitle}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
