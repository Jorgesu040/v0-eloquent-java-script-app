
import ELOQUENT_CONTENT from './eloquent-content.json'

export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'code'; content: string; language?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; content: string[] }
  | { type: 'blockquote'; content: string }
  | { type: 'table'; content: string[][] }
  | { type: 'heading'; level: number; content: string }
  | { type: 'definition-list'; content: { term: string; definition: string }[] }
  | { type: 'details'; summary: string; content: string }
  | { type: 'divider'; content: string };

export type ExerciseType = 'quiz' | 'code';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  // For quiz
  options?: string[];
  correctOptionIndex?: number;
  // For code
  initialCode?: string;
  expectedOutput?: string;
  solution?: string;
  explanation?: string;
  xpReward?: number;
}

export interface Lesson {
  id: string
  title: string
  sections: Section[]
  exercises: Exercise[] // This refers to the new Exercise interface now
  xpReward: number
}

export interface Section {
  id: string
  title: string
  content: ContentBlock[]
  exercise?: Exercise
}

export interface Chapter {
  id: string
  number: number
  title: string
  titleEs: string
  part: string
  partLabel: string
  icon: string
  description: string
  lessons: Lesson[]
  totalXP: number
  isProject: boolean
}

export interface UserProgress {
  currentStreak: number
  longestStreak: number
  totalXP: number
  level: number
  completedLessons: string[]
  completedExercises: string[]
  completedChapters: string[]
  lastActiveDate: string
  achievements: string[]
  dailyGoal: number
  dailyXP: number
  hearts: number
}

export const INITIAL_PROGRESS: UserProgress = {
  currentStreak: 0,
  longestStreak: 0,
  totalXP: 0,
  level: 1,
  completedLessons: [],
  completedExercises: [],
  completedChapters: [],
  lastActiveDate: "",
  achievements: [],
  dailyGoal: 50,
  dailyXP: 0,
  hearts: 5,
}

export const XP_PER_LEVEL = 200

export function getLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function getXPForCurrentLevel(xp: number): number {
  return xp % XP_PER_LEVEL
}

export function getLevelTitle(level: number): string {
  if (level <= 3) return "Aprendiz"
  if (level <= 6) return "Explorador"
  if (level <= 10) return "Desarrollador"
  if (level <= 15) return "Ingeniero"
  if (level <= 20) return "Arquitecto"
  return "Maestro"
}

export const ACHIEVEMENTS = [
  { id: "first-lesson", title: "Primer Paso", description: "Completa tu primera lección", icon: "star", xpBonus: 10 },
  { id: "streak-3", title: "En Racha", description: "Mantiene una racha de 3 días", icon: "flame", xpBonus: 25 },
  { id: "streak-7", title: "Semana Completa", description: "Racha de 7 días seguidos", icon: "fire", xpBonus: 50 },
  { id: "first-chapter", title: "Capítulo Completo", description: "Termina un capítulo entero", icon: "book", xpBonus: 30 },
  { id: "perfect-quiz", title: "Perfección", description: "Quiz perfecto sin errores", icon: "trophy", xpBonus: 40 },
  { id: "level-5", title: "Nivel 5", description: "Alcanza el nivel 5", icon: "medal", xpBonus: 50 },
  { id: "xp-500", title: "500 XP", description: "Acumula 500 XP totales", icon: "gem", xpBonus: 25 },
  { id: "xp-1000", title: "Mil Puntos", description: "Acumula 1000 XP totales", icon: "crown", xpBonus: 50 },
  { id: "all-part1", title: "Lenguaje Dominado", description: "Completa la Parte 1", icon: "code", xpBonus: 100 },
  { id: "half-book", title: "A Medio Camino", description: "Completa la mitad del libro", icon: "rocket", xpBonus: 75 },
]

// Determine parts based on chapter number
// 0-12: Language (Part 1)
// 13-19: Browser (Part 2)
// 20-21: Node (Part 3)

const PART_LABELS: Record<string, string> = {
  "part1": "Parte 1: Lenguaje",
  "part2": "Parte 2: Navegador",
  "part3": "Parte 3: Node.js"
};

import { MANUAL_EXERCISES, MANUAL_LESSON_EXERCISES } from './manual-exercises';

// Cast the imported JSON to the correctly typed interface, adding any missing properties if needed
// The JSON has most fields, but might be missing exercises
export const CHAPTERS: Chapter[] = (ELOQUENT_CONTENT as any[]).map(c => ({
  ...c,
  partLabel: PART_LABELS[c.part] || "Parte 1",
  lessons: c.lessons.map((l: any) => ({
    ...l,
    sections: l.sections.map((s: Section) => ({
      ...s,
      exercise: MANUAL_EXERCISES[s.id]
    })),
    exercises: (l.exercises || []).concat(MANUAL_LESSON_EXERCISES[l.id] || []) // Ensure exercises array exists and merge manual ones
  }))
}));

export function getPartColor(partId: string): string {
  switch (partId) {
    case "part1": return "hsl(var(--chart-1))";
    case "part2": return "hsl(var(--chart-2))";
    case "part3": return "hsl(var(--chart-3))";
    case "intro": return "hsl(var(--chart-4))";
    default: return "hsl(var(--primary))";
  }
}
