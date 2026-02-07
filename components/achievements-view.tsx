"use client"

import React from "react"

import {
  Star,
  Flame,
  Trophy,
  BookOpen,
  Medal,
  Gem,
  Crown,
  Code,
  Rocket,
  Zap,
  Lock,
} from "lucide-react"
import { ACHIEVEMENTS, type UserProgress } from "@/lib/course-data"
import { cn } from "@/lib/utils"

const achievementIcons: Record<string, React.ElementType> = {
  star: Star,
  flame: Flame,
  fire: Flame,
  book: BookOpen,
  trophy: Trophy,
  medal: Medal,
  gem: Gem,
  crown: Crown,
  code: Code,
  rocket: Rocket,
}

interface AchievementsViewProps {
  progress: UserProgress
}

export function AchievementsView({ progress }: AchievementsViewProps) {
  const unlockedCount = progress.achievements.length
  const totalCount = ACHIEVEMENTS.length

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground text-balance">Logros</h1>
        <p className="text-muted-foreground">
          Desbloquea logros completando lecciones y retos
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-foreground">
              {unlockedCount}
              <span className="text-lg text-muted-foreground"> / {totalCount}</span>
            </p>
            <p className="text-sm text-muted-foreground">logros desbloqueados</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--xp-gold))]/10">
            <Trophy className="h-8 w-8 text-[hsl(var(--xp-gold))]" />
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[hsl(var(--xp-gold))] transition-all duration-700"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = progress.achievements.includes(achievement.id)
          const Icon = achievementIcons[achievement.icon] || Star

          return (
            <div
              key={achievement.id}
              className={cn(
                "flex items-center gap-4 rounded-xl border border-border p-4 transition-all",
                isUnlocked
                  ? "bg-card border-[hsl(var(--xp-gold))]/20"
                  : "bg-card opacity-60"
              )}
            >
              <div
                className={cn(
                  "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl",
                  isUnlocked
                    ? "bg-[hsl(var(--xp-gold))]/10"
                    : "bg-muted"
                )}
              >
                {isUnlocked ? (
                  <Icon className="h-7 w-7 text-[hsl(var(--xp-gold))]" />
                ) : (
                  <Lock className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={cn(
                      "text-sm font-bold",
                      isUnlocked ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {achievement.title}
                  </h3>
                  {isUnlocked && (
                    <span className="flex items-center gap-0.5 text-xs font-medium text-[hsl(var(--xp-gold))]">
                      <Zap className="h-3 w-3" />+{achievement.xpBonus}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
