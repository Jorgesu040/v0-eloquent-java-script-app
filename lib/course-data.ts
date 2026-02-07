export interface Lesson {
  id: string
  title: string
  sections: Section[]
  exercises: Exercise[]
  xpReward: number
}

export interface Section {
  id: string
  title: string
  content: string
  codeExample?: string
}

export interface Exercise {
  id: string
  type: "multiple-choice" | "fill-blank" | "code-output" | "true-false"
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  xpReward: number
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
  { id: "first-lesson", title: "Primer Paso", description: "Completa tu primera leccion", icon: "star", xpBonus: 10 },
  { id: "streak-3", title: "En Racha", description: "Mantiene una racha de 3 dias", icon: "flame", xpBonus: 25 },
  { id: "streak-7", title: "Semana Completa", description: "Racha de 7 dias seguidos", icon: "fire", xpBonus: 50 },
  { id: "first-chapter", title: "Capitulo Completo", description: "Termina un capitulo entero", icon: "book", xpBonus: 30 },
  { id: "perfect-quiz", title: "Perfeccion", description: "Quiz perfecto sin errores", icon: "trophy", xpBonus: 40 },
  { id: "level-5", title: "Nivel 5", description: "Alcanza el nivel 5", icon: "medal", xpBonus: 50 },
  { id: "xp-500", title: "500 XP", description: "Acumula 500 XP totales", icon: "gem", xpBonus: 25 },
  { id: "xp-1000", title: "Mil Puntos", description: "Acumula 1000 XP totales", icon: "crown", xpBonus: 50 },
  { id: "all-part1", title: "Lenguaje Dominado", description: "Completa la Parte 1", icon: "code", xpBonus: 100 },
  { id: "half-book", title: "A Medio Camino", description: "Completa la mitad del libro", icon: "rocket", xpBonus: 75 },
]

export const CHAPTERS: Chapter[] = [
  {
    id: "ch00",
    number: 0,
    title: "Introduction",
    titleEs: "Introduccion",
    part: "intro",
    partLabel: "Inicio",
    icon: "BookOpen",
    description: "Descubre que es la programacion y por que JavaScript es el lenguaje perfecto para empezar.",
    isProject: false,
    totalXP: 100,
    lessons: [
      {
        id: "ch00-l1",
        title: "Sobre la programacion",
        xpReward: 25,
        sections: [
          {
            id: "ch00-l1-s1",
            title: "Que es programar?",
            content: "Programar es el acto de construir un programa, un conjunto de instrucciones precisas que le dicen a una computadora que hacer. Las computadoras son rapidas pero necesitan instrucciones muy claras.",
          },
          {
            id: "ch00-l1-s2",
            title: "Lenguajes de programacion",
            content: "Un lenguaje de programacion es un lenguaje artificialmente construido para instruir computadoras. JavaScript es uno de los mas populares y esta disponible en cada navegador web.",
          },
        ],
        exercises: [
          {
            id: "ch00-l1-e1",
            type: "multiple-choice",
            question: "Que es un programa?",
            options: [
              "Un conjunto de instrucciones para la computadora",
              "Un tipo de hardware",
              "Un sistema operativo",
              "Una pagina web",
            ],
            correctAnswer: "Un conjunto de instrucciones para la computadora",
            explanation: "Un programa es exactamente eso: un conjunto de instrucciones precisas que le dicen a una computadora que hacer.",
            xpReward: 10,
          },
          {
            id: "ch00-l1-e2",
            type: "true-false",
            question: "JavaScript solo funciona en navegadores web.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "JavaScript tambien funciona fuera del navegador, por ejemplo con Node.js, y en bases de datos como MongoDB.",
            xpReward: 10,
          },
        ],
      },
      {
        id: "ch00-l2",
        title: "Codigo y que hacer con el",
        xpReward: 25,
        sections: [
          {
            id: "ch00-l2-s1",
            title: "Leer y escribir codigo",
            content: "Leer codigo y escribir codigo son partes indispensables de aprender a programar. No basta con leer los ejemplos: hay que entenderlos y luego practicar escribiendo tus propias soluciones.",
          },
          {
            id: "ch00-l2-s2",
            title: "La estructura del libro",
            content: "Este libro se divide en tres partes: el lenguaje JavaScript (cap. 1-12), el navegador (cap. 13-19), y Node.js (cap. 20-21). Hay capitulos de proyecto que construyen programas completos.",
          },
        ],
        exercises: [
          {
            id: "ch00-l2-e1",
            type: "multiple-choice",
            question: "Cuantas partes principales tiene el libro Eloquent JavaScript?",
            options: ["2 partes", "3 partes", "4 partes", "5 partes"],
            correctAnswer: "3 partes",
            explanation: "El libro tiene 3 partes: Lenguaje, Navegador y Node.js.",
            xpReward: 10,
          },
          {
            id: "ch00-l2-e2",
            type: "true-false",
            question: "Solo leyendo los ejemplos es suficiente para aprender a programar.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "Es necesario tambien escribir codigo y practicar, no solo leer ejemplos.",
            xpReward: 10,
          },
        ],
      },
    ],
  },
  {
    id: "ch01",
    number: 1,
    title: "Values, Types, and Operators",
    titleEs: "Valores, Tipos y Operadores",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Hash",
    description: "Aprende sobre numeros, cadenas, booleanos y como JavaScript transforma los datos.",
    isProject: false,
    totalXP: 150,
    lessons: [
      {
        id: "ch01-l1",
        title: "Numeros y aritmetica",
        xpReward: 30,
        sections: [
          {
            id: "ch01-l1-s1",
            title: "El tipo Number",
            content: "JavaScript usa 64 bits para almacenar un valor numerico. Puedes escribir numeros enteros como 13, decimales como 9.81, y notacion cientifica como 2.998e8.",
            codeExample: "13\n9.81\n2.998e8 // = 299,800,000",
          },
          {
            id: "ch01-l1-s2",
            title: "Operadores aritmeticos",
            content: "Los operadores aritmeticos basicos son + (suma), - (resta), * (multiplicacion), / (division) y % (residuo/modulo). La multiplicacion y division tienen mayor precedencia que suma y resta.",
            codeExample: "100 + 4 * 11 // = 144\n(100 + 4) * 11 // = 1144\n144 % 12 // = 0",
          },
          {
            id: "ch01-l1-s3",
            title: "Numeros especiales",
            content: "Existen tres valores especiales numericos: Infinity, -Infinity y NaN (Not a Number). NaN se obtiene con operaciones sin sentido como 0/0.",
            codeExample: "Infinity - 1 // = Infinity\n0 / 0 // = NaN\nNaN == NaN // = false",
          },
        ],
        exercises: [
          {
            id: "ch01-l1-e1",
            type: "code-output",
            question: "Cual es el resultado de: 100 + 4 * 11?",
            options: ["1144", "144", "111", "104"],
            correctAnswer: "144",
            explanation: "La multiplicacion tiene mayor precedencia, asi que 4*11=44, luego 100+44=144.",
            xpReward: 15,
          },
          {
            id: "ch01-l1-e2",
            type: "multiple-choice",
            question: "Que produce NaN == NaN?",
            options: ["true", "false", "NaN", "undefined"],
            correctAnswer: "false",
            explanation: "NaN es el unico valor en JavaScript que no es igual a si mismo. NaN == NaN produce false.",
            xpReward: 15,
          },
          {
            id: "ch01-l1-e3",
            type: "code-output",
            question: "Cual es el resultado de 314 % 100?",
            options: ["3", "14", "3.14", "314"],
            correctAnswer: "14",
            explanation: "El operador % (modulo) devuelve el residuo de la division. 314 / 100 = 3 con residuo 14.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch01-l2",
        title: "Cadenas y booleanos",
        xpReward: 30,
        sections: [
          {
            id: "ch01-l2-s1",
            title: "Cadenas (Strings)",
            content: "Las cadenas representan texto y se escriben entre comillas simples, dobles o backticks. El operador + concatena cadenas. Los template literals (backticks) permiten interpolar valores con ${}.",
            codeExample: "'Hola' + ' ' + 'mundo' // = 'Hola mundo'\n`la mitad de 100 es ${100/2}` // = 'la mitad de 100 es 50'",
          },
          {
            id: "ch01-l2-s2",
            title: "Valores Booleanos",
            content: "Los booleanos tienen solo dos valores: true y false. Se crean con operadores de comparacion (>, <, ==, !=, ===, !==) y operadores logicos (&&, ||, !).",
            codeExample: "3 > 2 // = true\n3 < 2 // = false\ntrue && false // = false\ntrue || false // = true",
          },
          {
            id: "ch01-l2-s3",
            title: "Conversion automatica de tipos",
            content: "JavaScript convierte tipos automaticamente (coercion). Por ejemplo, '5' - 1 da 4, pero '5' + 1 da '51'. Usa === para comparaciones sin coercion.",
            codeExample: "'5' - 1 // = 4\n'5' + 1 // = '51'\nfalse == 0 // = true\nfalse === 0 // = false",
          },
        ],
        exercises: [
          {
            id: "ch01-l2-e1",
            type: "code-output",
            question: "Que produce '5' + 1 en JavaScript?",
            options: ["6", "'51'", "NaN", "Error"],
            correctAnswer: "'51'",
            explanation: "El operador + con una cadena concatena en lugar de sumar. '5' + 1 produce la cadena '51'.",
            xpReward: 15,
          },
          {
            id: "ch01-l2-e2",
            type: "code-output",
            question: "Que produce '5' - 1?",
            options: ["4", "'51'", "NaN", "'4'"],
            correctAnswer: "4",
            explanation: "El operador - convierte la cadena a numero, asi que '5' - 1 = 4.",
            xpReward: 15,
          },
          {
            id: "ch01-l2-e3",
            type: "true-false",
            question: "null == undefined produce true.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "En JavaScript, null == undefined es true. Son considerados iguales con ==, pero null === undefined es false.",
            xpReward: 15,
          },
        ],
      },
    ],
  },
  {
    id: "ch02",
    number: 2,
    title: "Program Structure",
    titleEs: "Estructura del Programa",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "GitBranch",
    description: "Expresiones, variables, control de flujo y bucles: las bases de cualquier programa.",
    isProject: false,
    totalXP: 150,
    lessons: [
      {
        id: "ch02-l1",
        title: "Variables y control de flujo",
        xpReward: 35,
        sections: [
          {
            id: "ch02-l1-s1",
            title: "Variables con let y const",
            content: "Las variables son como tentaculos que atrapan valores. Se declaran con let (mutable) o const (constante). Los nombres de variables no pueden empezar con numeros y no pueden contener espacios.",
            codeExample: "let edad = 25;\nconst PI = 3.14159;\nedad = 26; // OK\n// PI = 3; // Error!",
          },
          {
            id: "ch02-l1-s2",
            title: "Condicionales: if / else",
            content: "La sentencia if ejecuta codigo solo cuando una condicion es verdadera. Se puede encadenar con else y else if para manejar multiples caminos.",
            codeExample: "let num = 42;\nif (num < 10) {\n  console.log('Pequeno');\n} else if (num < 100) {\n  console.log('Mediano');\n} else {\n  console.log('Grande');\n}\n// => 'Mediano'",
          },
        ],
        exercises: [
          {
            id: "ch02-l1-e1",
            type: "multiple-choice",
            question: "Cual es la diferencia entre let y const?",
            options: [
              "let puede reasignarse, const no",
              "const puede reasignarse, let no",
              "No hay diferencia",
              "let es para numeros, const para cadenas",
            ],
            correctAnswer: "let puede reasignarse, const no",
            explanation: "let crea una variable que puede cambiar su valor. const crea una constante que no puede ser reasignada.",
            xpReward: 15,
          },
          {
            id: "ch02-l1-e2",
            type: "code-output",
            question: "Si num = 42, que imprime el codigo: if (num < 10) 'Pequeno' else if (num < 100) 'Mediano' else 'Grande'?",
            options: ["Pequeno", "Mediano", "Grande", "Error"],
            correctAnswer: "Mediano",
            explanation: "42 no es menor que 10, pero si es menor que 100, asi que se ejecuta el bloque else if.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch02-l2",
        title: "Bucles",
        xpReward: 35,
        sections: [
          {
            id: "ch02-l2-s1",
            title: "Bucle while",
            content: "El bucle while repite un bloque de codigo mientras una condicion sea verdadera. Es importante actualizar la condicion para evitar bucles infinitos.",
            codeExample: "let resultado = 1;\nlet contador = 0;\nwhile (contador < 10) {\n  resultado = resultado * 2;\n  contador++;\n}\nconsole.log(resultado); // 1024",
          },
          {
            id: "ch02-l2-s2",
            title: "Bucle for",
            content: "El bucle for combina inicializacion, condicion y actualizacion en una linea. Es ideal cuando sabes cuantas iteraciones necesitas.",
            codeExample: "let total = 0;\nfor (let i = 1; i <= 10; i++) {\n  total += i;\n}\nconsole.log(total); // 55",
          },
        ],
        exercises: [
          {
            id: "ch02-l2-e1",
            type: "code-output",
            question: "Cual es el resultado de: let r=1; for(let i=0;i<10;i++) r*=2; r?",
            options: ["1024", "100", "20", "512"],
            correctAnswer: "1024",
            explanation: "Multiplicar 1 por 2 diez veces da 2^10 = 1024.",
            xpReward: 15,
          },
          {
            id: "ch02-l2-e2",
            type: "fill-blank",
            question: "El bucle ___ combina inicializacion, condicion y actualizacion en una sola linea.",
            options: ["for", "while", "do", "switch"],
            correctAnswer: "for",
            explanation: "El bucle for tiene la sintaxis: for (inicializacion; condicion; actualizacion) { ... }",
            xpReward: 15,
          },
        ],
      },
    ],
  },
  {
    id: "ch03",
    number: 3,
    title: "Functions",
    titleEs: "Funciones",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Zap",
    description: "Crea bloques de codigo reutilizables con funciones, scope y closures.",
    isProject: false,
    totalXP: 150,
    lessons: [
      {
        id: "ch03-l1",
        title: "Definiendo funciones",
        xpReward: 35,
        sections: [
          {
            id: "ch03-l1-s1",
            title: "Funciones con function y arrow",
            content: "Una funcion es un trozo de programa envuelto en un valor. Se puede definir con la palabra function o como arrow function (=>). Las funciones pueden tener parametros y devolver valores con return.",
            codeExample: "function cuadrado(x) {\n  return x * x;\n}\nconst cubo = (x) => x * x * x;\n\nconsole.log(cuadrado(4)); // 16\nconsole.log(cubo(3)); // 27",
          },
          {
            id: "ch03-l1-s2",
            title: "Scope y closures",
            content: "Las variables declaradas dentro de una funcion son locales a esa funcion. Un closure es cuando una funcion interna accede a variables de su funcion externa, incluso despues de que la externa haya terminado.",
            codeExample: "function crearContador() {\n  let cuenta = 0;\n  return () => {\n    cuenta++;\n    return cuenta;\n  };\n}\nconst contar = crearContador();\nconsole.log(contar()); // 1\nconsole.log(contar()); // 2",
          },
        ],
        exercises: [
          {
            id: "ch03-l1-e1",
            type: "code-output",
            question: "Que imprime console.log(cuadrado(5)) si cuadrado = x => x * x?",
            options: ["10", "25", "5", "55"],
            correctAnswer: "25",
            explanation: "La funcion cuadrado multiplica el argumento por si mismo: 5 * 5 = 25.",
            xpReward: 15,
          },
          {
            id: "ch03-l1-e2",
            type: "multiple-choice",
            question: "Que es un closure?",
            options: [
              "Una funcion que accede a variables de su scope externo",
              "Un tipo de bucle",
              "Un operador logico",
              "Una forma de cerrar el programa",
            ],
            correctAnswer: "Una funcion que accede a variables de su scope externo",
            explanation: "Un closure es una funcion que 'recuerda' y accede a las variables del scope donde fue creada, incluso cuando se ejecuta fuera de ese scope.",
            xpReward: 15,
          },
        ],
      },
    ],
  },
  {
    id: "ch04",
    number: 4,
    title: "Data Structures: Objects and Arrays",
    titleEs: "Estructuras de Datos: Objetos y Arreglos",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Layers",
    description: "Organiza datos con arreglos, objetos y sus poderosos metodos.",
    isProject: false,
    totalXP: 150,
    lessons: [
      {
        id: "ch04-l1",
        title: "Arreglos y objetos",
        xpReward: 35,
        sections: [
          {
            id: "ch04-l1-s1",
            title: "Arreglos",
            content: "Un arreglo es una lista ordenada de valores. Se accede a sus elementos por indice (empezando en 0). Tiene metodos como push, pop, includes y length.",
            codeExample: "let frutas = ['manzana', 'banana', 'cereza'];\nconsole.log(frutas[0]); // 'manzana'\nconsole.log(frutas.length); // 3\nfrutas.push('durazno'); // agrega al final",
          },
          {
            id: "ch04-l1-s2",
            title: "Objetos",
            content: "Un objeto es una coleccion de propiedades. Cada propiedad tiene un nombre y un valor. Se accede con punto o corchetes.",
            codeExample: "let persona = {\n  nombre: 'Juan',\n  edad: 30,\n  saludo() {\n    return `Hola, soy ${this.nombre}`;\n  }\n};\nconsole.log(persona.nombre); // 'Juan'\nconsole.log(persona.saludo()); // 'Hola, soy Juan'",
          },
        ],
        exercises: [
          {
            id: "ch04-l1-e1",
            type: "code-output",
            question: "Si arr = ['a','b','c'], que es arr[1]?",
            options: ["'a'", "'b'", "'c'", "undefined"],
            correctAnswer: "'b'",
            explanation: "Los arreglos empiezan en indice 0, asi que arr[0]='a', arr[1]='b', arr[2]='c'.",
            xpReward: 15,
          },
          {
            id: "ch04-l1-e2",
            type: "true-false",
            question: "En un arreglo, el primer elemento tiene indice 1.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "Los arreglos en JavaScript empiezan con indice 0, no 1.",
            xpReward: 15,
          },
        ],
      },
    ],
  },
  {
    id: "ch05",
    number: 5,
    title: "Higher-Order Functions",
    titleEs: "Funciones de Orden Superior",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "ArrowUpRight",
    description: "Funciones que operan sobre otras funciones: map, filter, reduce y mas.",
    isProject: false,
    totalXP: 150,
    lessons: [
      {
        id: "ch05-l1",
        title: "Map, Filter y Reduce",
        xpReward: 40,
        sections: [
          {
            id: "ch05-l1-s1",
            title: "Funciones de orden superior",
            content: "Las funciones que reciben o devuelven otras funciones se llaman funciones de orden superior. map transforma cada elemento, filter selecciona elementos, y reduce los combina en uno.",
            codeExample: "let nums = [1, 2, 3, 4, 5];\nlet dobles = nums.map(n => n * 2);\n// [2, 4, 6, 8, 10]\nlet pares = nums.filter(n => n % 2 === 0);\n// [2, 4]\nlet suma = nums.reduce((a, b) => a + b, 0);\n// 15",
          },
        ],
        exercises: [
          {
            id: "ch05-l1-e1",
            type: "code-output",
            question: "Que produce [1,2,3].map(n => n * 3)?",
            options: ["[1,2,3]", "[3,6,9]", "[2,4,6]", "9"],
            correctAnswer: "[3,6,9]",
            explanation: "map aplica la funcion a cada elemento: 1*3=3, 2*3=6, 3*3=9.",
            xpReward: 20,
          },
          {
            id: "ch05-l1-e2",
            type: "code-output",
            question: "Que produce [1,2,3,4].filter(n => n > 2)?",
            options: ["[1,2]", "[3,4]", "[2,3,4]", "[1,2,3]"],
            correctAnswer: "[3,4]",
            explanation: "filter devuelve solo los elementos que cumplen la condicion: 3>2 y 4>2 son true.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch06",
    number: 6,
    title: "The Secret Life of Objects",
    titleEs: "La Vida Secreta de los Objetos",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Box",
    description: "Programacion orientada a objetos, clases, herencia y polimorfismo en JavaScript.",
    isProject: false,
    totalXP: 150,
    lessons: [
      {
        id: "ch06-l1",
        title: "Clases y prototipos",
        xpReward: 40,
        sections: [
          {
            id: "ch06-l1-s1",
            title: "La palabra class",
            content: "JavaScript usa clases para definir tipos de objetos. Una clase tiene un constructor y metodos. La herencia se logra con extends.",
            codeExample: "class Animal {\n  constructor(nombre) {\n    this.nombre = nombre;\n  }\n  hablar() {\n    return `${this.nombre} hace un sonido`;\n  }\n}\nclass Perro extends Animal {\n  hablar() {\n    return `${this.nombre} ladra`;\n  }\n}\nlet p = new Perro('Rex');\nconsole.log(p.hablar()); // 'Rex ladra'",
          },
        ],
        exercises: [
          {
            id: "ch06-l1-e1",
            type: "multiple-choice",
            question: "Que palabra clave se usa para herencia en JavaScript?",
            options: ["extends", "inherits", "super", "prototype"],
            correctAnswer: "extends",
            explanation: "La palabra clave extends permite que una clase herede de otra.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch07",
    number: 7,
    title: "Project: A Robot",
    titleEs: "Proyecto: Un Robot",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Bot",
    description: "Construye un robot virtual que entrega paquetes en un pueblo simulado.",
    isProject: true,
    totalXP: 200,
    lessons: [
      {
        id: "ch07-l1",
        title: "El pueblo de Meadowfield",
        xpReward: 50,
        sections: [
          { id: "ch07-l1-s1", title: "Disenar un robot", content: "En este proyecto construiremos un automata que recoge y entrega paquetes en un pueblo virtual. Esto demuestra objetos, grafos y algoritmos en accion." },
        ],
        exercises: [
          {
            id: "ch07-l1-e1",
            type: "multiple-choice",
            question: "Que tipo de estructura de datos es ideal para representar las calles de un pueblo?",
            options: ["Un grafo", "Un arreglo lineal", "Un numero", "Una cadena"],
            correctAnswer: "Un grafo",
            explanation: "Un grafo representa conexiones entre nodos, perfecto para modelar calles que conectan lugares.",
            xpReward: 25,
          },
        ],
      },
    ],
  },
  {
    id: "ch08",
    number: 8,
    title: "Bugs and Errors",
    titleEs: "Errores y Bugs",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Bug",
    description: "Aprende a encontrar, manejar y prevenir errores en tus programas.",
    isProject: false,
    totalXP: 120,
    lessons: [
      {
        id: "ch08-l1",
        title: "Try, Catch y tipos de errores",
        xpReward: 40,
        sections: [
          {
            id: "ch08-l1-s1",
            title: "Manejo de excepciones",
            content: "try/catch permite capturar errores en tiempo de ejecucion. El bloque try contiene el codigo que puede fallar, y catch maneja el error.",
            codeExample: "try {\n  let x = undefinedVar;\n} catch (error) {\n  console.log('Error:', error.message);\n}\n// => 'Error: undefinedVar is not defined'",
          },
        ],
        exercises: [
          {
            id: "ch08-l1-e1",
            type: "fill-blank",
            question: "Para capturar errores en JavaScript, usamos ___ / catch.",
            options: ["try", "do", "test", "handle"],
            correctAnswer: "try",
            explanation: "La sentencia try/catch permite manejar excepciones: try intenta, catch captura el error.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch09",
    number: 9,
    title: "Regular Expressions",
    titleEs: "Expresiones Regulares",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Search",
    description: "Patrones poderosos para buscar y manipular texto.",
    isProject: false,
    totalXP: 140,
    lessons: [
      {
        id: "ch09-l1",
        title: "Creando patrones",
        xpReward: 40,
        sections: [
          {
            id: "ch09-l1-s1",
            title: "Expresiones regulares",
            content: "Una expresion regular es un patron que describe un conjunto de cadenas. Se escriben entre barras /patron/ y tienen metodos como test y match.",
            codeExample: "let patron = /abc/;\nconsole.log(patron.test('abcde')); // true\nconsole.log(patron.test('abxde')); // false\n\nlet digitos = /\\d+/;\nconsole.log('tiene 42 cosas'.match(digitos));\n// ['42']",
          },
        ],
        exercises: [
          {
            id: "ch09-l1-e1",
            type: "code-output",
            question: "Que produce /abc/.test('abcde')?",
            options: ["true", "false", "'abc'", "undefined"],
            correctAnswer: "true",
            explanation: "test() verifica si el patron existe en la cadena. 'abcde' contiene 'abc', asi que es true.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch10",
    number: 10,
    title: "Modules",
    titleEs: "Modulos",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Package",
    description: "Organiza tu codigo en modulos reutilizables con import y export.",
    isProject: false,
    totalXP: 120,
    lessons: [
      {
        id: "ch10-l1",
        title: "Import y Export",
        xpReward: 35,
        sections: [
          {
            id: "ch10-l1-s1",
            title: "Modulos ES",
            content: "Los modulos permiten dividir el codigo en archivos separados. export hace disponible un valor, e import lo trae a otro archivo.",
            codeExample: "// math.js\nexport function suma(a, b) { return a + b; }\n\n// app.js\nimport { suma } from './math.js';\nconsole.log(suma(2, 3)); // 5",
          },
        ],
        exercises: [
          {
            id: "ch10-l1-e1",
            type: "fill-blank",
            question: "Para traer un valor de otro modulo usamos la palabra clave ___.",
            options: ["import", "require", "include", "load"],
            correctAnswer: "import",
            explanation: "import es la forma moderna (ES modules) de traer valores exportados de otros archivos.",
            xpReward: 15,
          },
        ],
      },
    ],
  },
  {
    id: "ch11",
    number: 11,
    title: "Asynchronous Programming",
    titleEs: "Programacion Asincronica",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Clock",
    description: "Promesas, async/await y el manejo de operaciones que toman tiempo.",
    isProject: false,
    totalXP: 160,
    lessons: [
      {
        id: "ch11-l1",
        title: "Promesas y async/await",
        xpReward: 45,
        sections: [
          {
            id: "ch11-l1-s1",
            title: "Promesas",
            content: "Una Promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca. Se crea con new Promise y se consume con .then() y .catch().",
            codeExample: "let promesa = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Listo!'), 1000);\n});\npromesa.then(resultado => {\n  console.log(resultado); // 'Listo!' (despues de 1s)\n});",
          },
          {
            id: "ch11-l1-s2",
            title: "Async / Await",
            content: "async/await es azucar sintactico sobre promesas. Una funcion async siempre devuelve una promesa. await pausa la ejecucion hasta que la promesa se resuelve.",
            codeExample: "async function obtenerDatos() {\n  let respuesta = await fetch('/api/datos');\n  let datos = await respuesta.json();\n  return datos;\n}",
          },
        ],
        exercises: [
          {
            id: "ch11-l1-e1",
            type: "multiple-choice",
            question: "Que devuelve siempre una funcion async?",
            options: ["Una Promesa", "Un numero", "undefined", "Un objeto"],
            correctAnswer: "Una Promesa",
            explanation: "Las funciones async siempre devuelven una Promesa, incluso si el return es un valor simple.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch12",
    number: 12,
    title: "Project: A Programming Language",
    titleEs: "Proyecto: Un Lenguaje de Programacion",
    part: "part1",
    partLabel: "Parte 1: Lenguaje",
    icon: "Terminal",
    description: "Construye tu propio lenguaje de programacion simple llamado Egg.",
    isProject: true,
    totalXP: 200,
    lessons: [
      {
        id: "ch12-l1",
        title: "Parseo y evaluacion",
        xpReward: 50,
        sections: [
          { id: "ch12-l1-s1", title: "Construyendo un lenguaje", content: "Construiremos un lenguaje de programacion simple llamado Egg. Aprenderemos sobre parseo (analizar texto y convertirlo en estructura de datos) y evaluacion (ejecutar esa estructura)." },
        ],
        exercises: [
          {
            id: "ch12-l1-e1",
            type: "multiple-choice",
            question: "Que hace un parser?",
            options: [
              "Convierte texto en una estructura de datos",
              "Ejecuta codigo",
              "Dibuja en pantalla",
              "Conecta a internet",
            ],
            correctAnswer: "Convierte texto en una estructura de datos",
            explanation: "Un parser analiza texto segun reglas gramaticales y lo convierte en un arbol de sintaxis abstracta (AST).",
            xpReward: 25,
          },
        ],
      },
    ],
  },
  {
    id: "ch13",
    number: 13,
    title: "JavaScript and the Browser",
    titleEs: "JavaScript y el Navegador",
    part: "part2",
    partLabel: "Parte 2: Navegador",
    icon: "Globe",
    description: "Como funciona la web, HTTP, y el papel de JavaScript en el navegador.",
    isProject: false,
    totalXP: 120,
    lessons: [
      {
        id: "ch13-l1",
        title: "La Web y HTTP",
        xpReward: 35,
        sections: [
          { id: "ch13-l1-s1", title: "Como funciona la Web", content: "La web funciona con HTTP (Hypertext Transfer Protocol). Un navegador solicita paginas a servidores usando URLs. JavaScript puede ejecutarse en estas paginas para hacerlas interactivas." },
        ],
        exercises: [
          {
            id: "ch13-l1-e1",
            type: "fill-blank",
            question: "HTTP significa Hypertext Transfer ___.",
            options: ["Protocol", "Program", "Platform", "Process"],
            correctAnswer: "Protocol",
            explanation: "HTTP = Hypertext Transfer Protocol, el protocolo fundamental de la web.",
            xpReward: 15,
          },
        ],
      },
    ],
  },
  {
    id: "ch14",
    number: 14,
    title: "The Document Object Model",
    titleEs: "El Modelo de Objetos del Documento",
    part: "part2",
    partLabel: "Parte 2: Navegador",
    icon: "FileCode",
    description: "El DOM: como JavaScript ve y manipula la pagina web.",
    isProject: false,
    totalXP: 140,
    lessons: [
      {
        id: "ch14-l1",
        title: "Navegando el DOM",
        xpReward: 40,
        sections: [
          {
            id: "ch14-l1-s1",
            title: "El arbol DOM",
            content: "El DOM representa la pagina como un arbol de nodos. Cada elemento HTML es un nodo. Puedes buscar nodos con getElementById, querySelector, etc.",
            codeExample: "let titulo = document.getElementById('titulo');\nlet parrafos = document.querySelectorAll('p');\ntitulo.textContent = 'Nuevo titulo';",
          },
        ],
        exercises: [
          {
            id: "ch14-l1-e1",
            type: "multiple-choice",
            question: "Que metodo selecciona un elemento por su id?",
            options: ["getElementById", "querySelector", "getElementsByClass", "findElement"],
            correctAnswer: "getElementById",
            explanation: "getElementById busca un unico elemento con el id especificado en el documento.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch15",
    number: 15,
    title: "Handling Events",
    titleEs: "Manejo de Eventos",
    part: "part2",
    partLabel: "Parte 2: Navegador",
    icon: "MousePointer",
    description: "Responde a acciones del usuario: clicks, teclado, scroll y mas.",
    isProject: false,
    totalXP: 140,
    lessons: [
      {
        id: "ch15-l1",
        title: "Eventos del navegador",
        xpReward: 40,
        sections: [
          {
            id: "ch15-l1-s1",
            title: "addEventListener",
            content: "Los eventos permiten que tu codigo reaccione a acciones del usuario. addEventListener registra una funcion que se ejecuta cuando ocurre un evento.",
            codeExample: "let boton = document.querySelector('button');\nboton.addEventListener('click', () => {\n  console.log('Boton presionado!');\n});",
          },
        ],
        exercises: [
          {
            id: "ch15-l1-e1",
            type: "fill-blank",
            question: "Para registrar un manejador de eventos usamos element.___('click', funcion).",
            options: ["addEventListener", "onClick", "addEvent", "setEvent"],
            correctAnswer: "addEventListener",
            explanation: "addEventListener es el metodo estandar para registrar manejadores de eventos en el DOM.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch16",
    number: 16,
    title: "Project: A Platform Game",
    titleEs: "Proyecto: Un Juego de Plataformas",
    part: "part2",
    partLabel: "Parte 2: Navegador",
    icon: "Gamepad2",
    description: "Crea un juego de plataformas completo con HTML y JavaScript.",
    isProject: true,
    totalXP: 200,
    lessons: [
      {
        id: "ch16-l1",
        title: "Disenar un juego",
        xpReward: 50,
        sections: [
          { id: "ch16-l1-s1", title: "El juego de plataformas", content: "En este proyecto construiremos un juego estilo plataformas donde un personaje salta y recoge monedas, evitando la lava. Usaremos el DOM y manejo de eventos." },
        ],
        exercises: [
          {
            id: "ch16-l1-e1",
            type: "true-false",
            question: "Un juego de plataformas solo puede hacerse con un motor de juegos especial.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "Se puede construir un juego de plataformas usando solo HTML, CSS y JavaScript puro.",
            xpReward: 25,
          },
        ],
      },
    ],
  },
  {
    id: "ch17",
    number: 17,
    title: "Drawing on Canvas",
    titleEs: "Dibujando en el Canvas",
    part: "part2",
    partLabel: "Parte 2: Navegador",
    icon: "Paintbrush",
    description: "Dibuja graficos y animaciones usando el elemento canvas de HTML5.",
    isProject: false,
    totalXP: 140,
    lessons: [
      {
        id: "ch17-l1",
        title: "El elemento Canvas",
        xpReward: 40,
        sections: [
          {
            id: "ch17-l1-s1",
            title: "Dibujar en canvas",
            content: "El elemento <canvas> permite dibujar graficos con JavaScript. Se obtiene un contexto 2D y se usan metodos como fillRect, arc, lineTo, etc.",
            codeExample: "let canvas = document.querySelector('canvas');\nlet ctx = canvas.getContext('2d');\nctx.fillStyle = 'red';\nctx.fillRect(10, 10, 100, 50);",
          },
        ],
        exercises: [
          {
            id: "ch17-l1-e1",
            type: "multiple-choice",
            question: "Que metodo se usa para obtener el contexto de dibujo de un canvas?",
            options: ["getContext('2d')", "drawContext()", "createCanvas()", "getGraphics()"],
            correctAnswer: "getContext('2d')",
            explanation: "canvas.getContext('2d') devuelve el contexto de renderizado 2D para dibujar.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch18",
    number: 18,
    title: "HTTP and Forms",
    titleEs: "HTTP y Formularios",
    part: "part2",
    partLabel: "Parte 2: Navegador",
    icon: "Send",
    description: "Fetch API, formularios HTML, y comunicacion cliente-servidor.",
    isProject: false,
    totalXP: 140,
    lessons: [
      {
        id: "ch18-l1",
        title: "Fetch y formularios",
        xpReward: 40,
        sections: [
          {
            id: "ch18-l1-s1",
            title: "La Fetch API",
            content: "fetch() permite hacer peticiones HTTP desde JavaScript. Devuelve una promesa que se resuelve con la respuesta del servidor.",
            codeExample: "fetch('https://api.example.com/data')\n  .then(r => r.json())\n  .then(data => console.log(data));",
          },
        ],
        exercises: [
          {
            id: "ch18-l1-e1",
            type: "true-false",
            question: "fetch() devuelve una Promesa.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "Correcto. fetch() siempre devuelve una Promesa que se resuelve con un objeto Response.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch19",
    number: 19,
    title: "Project: A Pixel Art Editor",
    titleEs: "Proyecto: Un Editor de Arte Pixel",
    part: "part2",
    partLabel: "Parte 2: Navegador",
    icon: "Grid3x3",
    description: "Construye un editor de arte pixel completo en el navegador.",
    isProject: true,
    totalXP: 200,
    lessons: [
      {
        id: "ch19-l1",
        title: "El editor de pixeles",
        xpReward: 50,
        sections: [
          { id: "ch19-l1-s1", title: "Dibujar con pixeles", content: "Construiremos un editor de arte pixel que permite dibujar imagenes pixel a pixel. Usaremos el canvas, eventos del mouse y manejo de estado de la aplicacion." },
        ],
        exercises: [
          {
            id: "ch19-l1-e1",
            type: "multiple-choice",
            question: "Que elemento HTML es ideal para un editor de dibujo pixel?",
            options: ["<canvas>", "<div>", "<img>", "<svg>"],
            correctAnswer: "<canvas>",
            explanation: "El elemento canvas permite manipular pixeles individuales, ideal para un editor pixel art.",
            xpReward: 25,
          },
        ],
      },
    ],
  },
  {
    id: "ch20",
    number: 20,
    title: "Node.js",
    titleEs: "Node.js",
    part: "part3",
    partLabel: "Parte 3: Node",
    icon: "Server",
    description: "JavaScript fuera del navegador: servidores, archivos y modulos con Node.",
    isProject: false,
    totalXP: 150,
    lessons: [
      {
        id: "ch20-l1",
        title: "Introduccion a Node.js",
        xpReward: 40,
        sections: [
          {
            id: "ch20-l1-s1",
            title: "Node.js",
            content: "Node.js permite ejecutar JavaScript fuera del navegador. Es ideal para servidores web, herramientas de linea de comando, y aplicaciones de red.",
            codeExample: "const http = require('http');\nconst server = http.createServer((req, res) => {\n  res.end('Hola desde Node!');\n});\nserver.listen(8000);",
          },
        ],
        exercises: [
          {
            id: "ch20-l1-e1",
            type: "true-false",
            question: "Node.js permite ejecutar JavaScript en el servidor.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "Correcto. Node.js es un entorno de ejecucion de JavaScript para el lado del servidor.",
            xpReward: 20,
          },
        ],
      },
    ],
  },
  {
    id: "ch21",
    number: 21,
    title: "Project: Skill-Sharing Website",
    titleEs: "Proyecto: Sitio Web de Compartir Habilidades",
    part: "part3",
    partLabel: "Parte 3: Node",
    icon: "Users",
    description: "Construye una aplicacion web full-stack con Node.js.",
    isProject: true,
    totalXP: 200,
    lessons: [
      {
        id: "ch21-l1",
        title: "Aplicacion full-stack",
        xpReward: 50,
        sections: [
          { id: "ch21-l1-s1", title: "Full-stack con Node", content: "En el proyecto final, construiremos un sitio web donde la gente puede proponer charlas sobre temas que conocen. Tiene un servidor Node.js y un cliente que se actualiza en tiempo real." },
        ],
        exercises: [
          {
            id: "ch21-l1-e1",
            type: "multiple-choice",
            question: "Que significa full-stack?",
            options: [
              "Desarrollo de frontend y backend",
              "Solo frontend",
              "Solo backend",
              "Solo base de datos",
            ],
            correctAnswer: "Desarrollo de frontend y backend",
            explanation: "Full-stack se refiere al desarrollo tanto del lado del cliente (frontend) como del servidor (backend).",
            xpReward: 25,
          },
        ],
      },
    ],
  },
]

export function getPartColor(part: string): string {
  switch (part) {
    case "intro": return "hsl(var(--info))"
    case "part1": return "hsl(var(--primary))"
    case "part2": return "hsl(var(--accent))"
    case "part3": return "hsl(var(--chart-5))"
    default: return "hsl(var(--muted-foreground))"
  }
}
