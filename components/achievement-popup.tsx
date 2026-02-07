"use client"

import { useEffect } from "react"
import { Trophy, X } from "lucide-react"

interface AchievementPopupProps {
  title: string
  onDismiss: () => void
}

export function AchievementPopup({ title, onDismiss }: AchievementPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce-in">
      <div className="flex items-center gap-3 rounded-xl border border-[hsl(var(--xp-gold))]/30 bg-card px-5 py-3 shadow-lg">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--xp-gold))]/10">
          <Trophy className="h-5 w-5 text-[hsl(var(--xp-gold))]" />
        </div>
        <div>
          <p className="text-xs font-medium text-[hsl(var(--xp-gold))]">Nuevo Logro!</p>
          <p className="text-sm font-bold text-foreground">{title}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
