"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Heart, Zap, Trophy, Flame, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { getLevel, getXPForCurrentLevel, getLevelTitle } from "@/lib/course-data"

interface MobileNavProps {
    totalXP: number
    currentStreak: number
    hearts: number
    dailyXP: number
    dailyGoal: number
    onNavigate: (view: string) => void
    currentView: string
}

export function MobileNav({
    totalXP,
    currentStreak,
    hearts,
    dailyXP,
    dailyGoal,
    onNavigate,
    currentView,
}: MobileNavProps) {
    const [open, setOpen] = useState(false)

    const level = getLevel(totalXP)
    const currentLevelXP = getXPForCurrentLevel(totalXP)
    const levelTitle = getLevelTitle(level)
    const dailyProgress = Math.min((dailyXP / dailyGoal) * 100, 100)

    const handleNavigate = (view: string) => {
        onNavigate(view)
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col gap-6">
                <SheetHeader>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <BookOpen className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <SheetTitle className="text-left">EloquentJS</SheetTitle>
                    </div>
                </SheetHeader>

                {/* Stats Dashboard */}
                <div className="space-y-4 rounded-xl border bg-muted/50 p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Tu Progreso</h4>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-rose-500">
                                <Heart className="h-4 w-4" fill="currentColor" />
                                <span className="font-bold">{hearts}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Vidas</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-orange-500">
                                <Flame className="h-4 w-4" fill="currentColor" />
                                <span className="font-bold">{currentStreak}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Racha días</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-yellow-500">
                                <Zap className="h-4 w-4" fill="currentColor" />
                                <span className="font-bold">{totalXP}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">XP Total</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-green-500">
                                <Trophy className="h-4 w-4" />
                                <span className="font-bold">Nivel {level}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{levelTitle}</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span>Meta Diaria</span>
                            <span>{dailyXP}/{dailyGoal} XP</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-500"
                                style={{ width: `${dailyProgress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {[
                        { id: "dashboard", label: "Inicio" },
                        { id: "chapters", label: "Capitulos" },
                        { id: "checklist", label: "Plan de Estudio" },
                        { id: "achievements", label: "Logros" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id)}
                            className={cn(
                                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                currentView === item.id
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
