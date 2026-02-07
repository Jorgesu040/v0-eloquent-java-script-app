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
    totalXP: 250,
    lessons: [
      {
        id: "ch03-l1",
        title: "Definiendo funciones",
        xpReward: 35,
        sections: [
          {
            id: "ch03-l1-s1",
            title: "Funciones con function",
            content: "Una funcion es un trozo de programa envuelto en un valor. Se crea con una expresion que comienza con la palabra clave function. Las funciones tienen parametros y un cuerpo que contiene las instrucciones a ejecutar. Una instruccion return determina el valor que devuelve la funcion.",
            codeExample: "const cuadrado = function(x) {\n  return x * x;\n};\nconsole.log(cuadrado(12));\n// -> 144\n\nconst makeNoise = function() {\n  console.log('Pling!');\n};\nmakeNoise();\n// -> Pling!",
          },
          {
            id: "ch03-l1-s2",
            title: "Notacion de declaracion y arrow functions",
            content: "Hay tres formas de crear funciones: expresion function, declaracion function (se mueve al inicio del scope, hoisting), y funciones flecha (=>). Las arrow functions son mas concisas: si el cuerpo es una sola expresion, se devuelve automaticamente sin necesidad de llaves ni return.",
            codeExample: "// Declaracion (hoisting)\nfunction future() {\n  return 'Nunca tendras autos voladores';\n}\n\n// Arrow function\nconst exponente = x => x * x;\nconst roundTo = (n, step) => {\n  let resto = n % step;\n  return n - resto + (resto < step / 2 ? 0 : step);\n};",
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
            type: "true-false",
            question: "Las funciones declarativas (function nombre()) tienen hoisting y pueden usarse antes de ser definidas.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "Las declaraciones de funcion se mueven conceptualmente al inicio de su scope, permitiendo llamarlas antes de su definicion en el codigo.",
            xpReward: 10,
          },
          {
            id: "ch03-l1-e3",
            type: "multiple-choice",
            question: "Cual es la forma correcta de una arrow function sin parametros?",
            options: ["() => { ... }", "=> { ... }", "-> { ... }", "function => { ... }"],
            correctAnswer: "() => { ... }",
            explanation: "Cuando una arrow function no tiene parametros, se usa un par de parentesis vacios: () => { ... }",
            xpReward: 10,
          },
        ],
      },
      {
        id: "ch03-l2",
        title: "Scope, closures y recursion",
        xpReward: 40,
        sections: [
          {
            id: "ch03-l2-s1",
            title: "Ambito lexico (scope)",
            content: "Cada variable tiene un ambito: la parte del programa donde es visible. Las variables con let/const son locales al bloque donde se declaran. Las funciones pueden ver las variables de los bloques que las contienen (ambito lexico). Los bloques internos pueden 'mirar hacia afuera' pero no al reves.",
            codeExample: "let x = 10; // global\nif (true) {\n  let y = 20; // local al bloque\n  var z = 30; // tambien global (var)\n}\n// y no es visible aqui\n// z si es visible aqui",
          },
          {
            id: "ch03-l2-s2",
            title: "Closures",
            content: "Un closure es cuando una funcion interna 'recuerda' y accede a variables de su funcion externa, incluso despues de que la externa haya terminado. Esto permite crear funciones con estado privado encapsulado.",
            codeExample: "function crearContador() {\n  let cuenta = 0;\n  return () => {\n    cuenta++;\n    return cuenta;\n  };\n}\nconst contar = crearContador();\nconsole.log(contar()); // 1\nconsole.log(contar()); // 2\nconsole.log(contar()); // 3",
          },
          {
            id: "ch03-l2-s3",
            title: "La pila de llamadas y recursion",
            content: "Cada vez que se llama a una funcion, el contexto actual se guarda en la pila de llamadas. La recursion es cuando una funcion se llama a si misma. Debe tener un caso base para no entrar en un bucle infinito y desbordar la pila.",
            codeExample: "function potencia(base, exponente) {\n  if (exponente === 0) {\n    return 1;\n  } else {\n    return base * potencia(base, exponente - 1);\n  }\n}\nconsole.log(potencia(2, 10)); // 1024",
          },
        ],
        exercises: [
          {
            id: "ch03-l2-e1",
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
          {
            id: "ch03-l2-e2",
            type: "code-output",
            question: "Que produce potencia(2, 3) si potencia(b,e) = e===0 ? 1 : b * potencia(b, e-1)?",
            options: ["6", "8", "9", "16"],
            correctAnswer: "8",
            explanation: "potencia(2,3) = 2 * potencia(2,2) = 2 * 2 * potencia(2,1) = 2 * 2 * 2 * potencia(2,0) = 2*2*2*1 = 8.",
            xpReward: 15,
          },
          {
            id: "ch03-l2-e3",
            type: "true-false",
            question: "Una funcion recursiva sin caso base causara un desbordamiento de pila.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "Sin un caso base, la funcion se llamara infinitamente hasta que la pila de llamadas se desborde, produciendo un error.",
            xpReward: 10,
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
    totalXP: 250,
    lessons: [
      {
        id: "ch04-l1",
        title: "Arreglos y propiedades",
        xpReward: 35,
        sections: [
          {
            id: "ch04-l1-s1",
            title: "Conjuntos de datos (Arrays)",
            content: "Un arreglo es una lista ordenada de valores escritos entre corchetes y separados por comas. Se accede a cada elemento mediante un indice (empezando en 0). Los arreglos tienen una propiedad length que indica cuantos elementos contienen.",
            codeExample: "let listaDeNumeros = [2, 3, 5, 7, 11];\nconsole.log(listaDeNumeros[2]); // 5\nconsole.log(listaDeNumeros[0]); // 2\nconsole.log(listaDeNumeros.length); // 5",
          },
          {
            id: "ch04-l1-s2",
            title: "Propiedades y metodos",
            content: "Casi todos los valores en JavaScript tienen propiedades (excepto null y undefined). Las propiedades que contienen funciones se llaman metodos. Los arreglos tienen metodos utiles como push (agregar al final), pop (eliminar del final), shift (eliminar del inicio) e includes (verificar si contiene un valor).",
            codeExample: "let secuencia = [1, 2, 3];\nsecuencia.push(4);\nsecuencia.push(5);\nconsole.log(secuencia); // [1, 2, 3, 4, 5]\nconsole.log(secuencia.pop()); // 5\nconsole.log(secuencia); // [1, 2, 3, 4]",
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
          {
            id: "ch04-l1-e3",
            type: "multiple-choice",
            question: "Que metodo agrega un elemento al final de un arreglo?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            correctAnswer: "push()",
            explanation: "push() agrega uno o mas elementos al final del arreglo. pop() elimina el ultimo, shift() elimina el primero y unshift() agrega al inicio.",
            xpReward: 10,
          },
        ],
      },
      {
        id: "ch04-l2",
        title: "Objetos y mutabilidad",
        xpReward: 40,
        sections: [
          {
            id: "ch04-l2-s1",
            title: "Objetos",
            content: "Un objeto es una coleccion de propiedades, donde cada propiedad tiene un nombre y un valor. Se crean con llaves {}. Se accede a propiedades con punto (objeto.propiedad) o corchetes (objeto['propiedad']). Los objetos pueden tener metodos (funciones como propiedades).",
            codeExample: "let persona = {\n  nombre: 'Juan',\n  edad: 30,\n  saludo() {\n    return `Hola, soy ${this.nombre}`;\n  }\n};\nconsole.log(persona.nombre); // 'Juan'\nconsole.log(persona['edad']); // 30",
          },
          {
            id: "ch04-l2-s2",
            title: "Mutabilidad",
            content: "Los numeros, cadenas y booleanos son inmutables. Los objetos y arreglos son mutables: puedes cambiar sus propiedades. Dos variables pueden apuntar al mismo objeto (referencia compartida). El operador === compara identidad, no contenido.",
            codeExample: "let obj1 = {valor: 10};\nlet obj2 = obj1;\nlet obj3 = {valor: 10};\n\nconsole.log(obj1 === obj2); // true (misma referencia)\nconsole.log(obj1 === obj3); // false (diferente objeto)\n\nobj1.valor = 15;\nconsole.log(obj2.valor); // 15 (misma referencia!)",
          },
          {
            id: "ch04-l2-s3",
            title: "Desestructuracion y rest",
            content: "La desestructuracion permite extraer valores de arreglos u objetos de forma concisa. El operador rest (...) recoge los elementos restantes en un nuevo arreglo. El spread (...) expande un arreglo en sus elementos individuales.",
            codeExample: "// Desestructurar objeto\nlet {nombre, edad} = {nombre: 'Ana', edad: 25};\n\n// Desestructurar arreglo\nlet [primero, ...resto] = [1, 2, 3, 4];\nconsole.log(primero); // 1\nconsole.log(resto); // [2, 3, 4]\n\n// Spread\nlet nums = [1, 2, 3];\nlet todos = [0, ...nums, 4]; // [0, 1, 2, 3, 4]",
          },
        ],
        exercises: [
          {
            id: "ch04-l2-e1",
            type: "code-output",
            question: "Si let a={v:10}; let b=a; a.v=20; que es b.v?",
            options: ["10", "20", "undefined", "Error"],
            correctAnswer: "20",
            explanation: "a y b apuntan al mismo objeto. Cambiar a.v tambien cambia b.v porque comparten la referencia.",
            xpReward: 15,
          },
          {
            id: "ch04-l2-e2",
            type: "code-output",
            question: "Que produce let [a, ...b] = [1,2,3]; console.log(b)?",
            options: ["[2, 3]", "[1, 2, 3]", "2", "3"],
            correctAnswer: "[2, 3]",
            explanation: "El operador rest (...b) recoge todos los elementos restantes despues del primero en un nuevo arreglo.",
            xpReward: 15,
          },
          {
            id: "ch04-l2-e3",
            type: "true-false",
            question: "{valor:10} === {valor:10} produce true.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "Son dos objetos diferentes en memoria. === compara identidad (referencia), no contenido. Solo seria true si ambas variables apuntan al mismo objeto.",
            xpReward: 10,
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
    totalXP: 250,
    lessons: [
      {
        id: "ch05-l1",
        title: "Abstraccion y funciones de orden superior",
        xpReward: 35,
        sections: [
          {
            id: "ch05-l1-s1",
            title: "Abstraccion",
            content: "Las abstracciones ocultan detalles y nos permiten hablar sobre problemas a un nivel superior. En programacion, las funciones son nuestra principal herramienta de abstraccion. En lugar de repetir logica, la envolvemos en una funcion con un nombre descriptivo.",
            codeExample: "// Sin abstraccion\nfor (let i = 0; i < 10; i++) {\n  console.log(i);\n}\n\n// Con abstraccion\nfunction repetir(n, accion) {\n  for (let i = 0; i < n; i++) {\n    accion(i);\n  }\n}\nrepetir(10, console.log);",
          },
          {
            id: "ch05-l1-s2",
            title: "Funciones de orden superior",
            content: "Las funciones que reciben otras funciones como argumentos o las devuelven se llaman funciones de orden superior. Nos permiten abstraer acciones, no solo valores. Son fundamentales para escribir codigo conciso y expresivo en JavaScript.",
            codeExample: "function mayorQue(n) {\n  return m => m > n;\n}\nlet mayorQue10 = mayorQue(10);\nconsole.log(mayorQue10(11)); // true\nconsole.log(mayorQue10(9)); // false",
          },
        ],
        exercises: [
          {
            id: "ch05-l1-e1",
            type: "multiple-choice",
            question: "Que es una funcion de orden superior?",
            options: [
              "Una funcion que recibe o devuelve otras funciones",
              "Una funcion que se ejecuta mas rapido",
              "Una funcion con mas de 3 parametros",
              "Una funcion definida con const",
            ],
            correctAnswer: "Una funcion que recibe o devuelve otras funciones",
            explanation: "Las funciones de orden superior operan sobre otras funciones, recibiendolas como argumentos o devolviendolas como resultado.",
            xpReward: 15,
          },
          {
            id: "ch05-l1-e2",
            type: "code-output",
            question: "Si mayorQue(n) devuelve m => m > n, que produce mayorQue(5)(3)?",
            options: ["true", "false", "5", "3"],
            correctAnswer: "false",
            explanation: "mayorQue(5) devuelve una funcion que verifica si m > 5. Como 3 > 5 es false, el resultado es false.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch05-l2",
        title: "Map, Filter y Reduce",
        xpReward: 40,
        sections: [
          {
            id: "ch05-l2-s1",
            title: "Filtrar y transformar con filter y map",
            content: "filter crea un nuevo arreglo con los elementos que pasan una prueba (la funcion retorna true). map crea un nuevo arreglo transformando cada elemento mediante una funcion. Ambos no modifican el arreglo original.",
            codeExample: "let nums = [1, 2, 3, 4, 5];\n\nlet pares = nums.filter(n => n % 2 === 0);\nconsole.log(pares); // [2, 4]\n\nlet dobles = nums.map(n => n * 2);\nconsole.log(dobles); // [2, 4, 6, 8, 10]",
          },
          {
            id: "ch05-l2-s2",
            title: "Resumir con reduce",
            content: "reduce combina todos los elementos de un arreglo en un solo valor, usando una funcion acumuladora. Recibe dos argumentos: la funcion combinadora y un valor inicial. La funcion recibe el acumulador y el elemento actual.",
            codeExample: "let nums = [1, 2, 3, 4, 5];\n\nlet suma = nums.reduce((total, n) => total + n, 0);\nconsole.log(suma); // 15\n\nlet maximo = nums.reduce((max, n) => n > max ? n : max, -Infinity);\nconsole.log(maximo); // 5",
          },
          {
            id: "ch05-l2-s3",
            title: "Encadenar metodos",
            content: "Como filter, map y reduce devuelven nuevos valores, puedes encadenarlos para crear pipelines de transformacion poderosos y legibles. Cada operacion toma el resultado de la anterior.",
            codeExample: "let personas = [\n  {nombre: 'Ana', edad: 25},\n  {nombre: 'Bob', edad: 17},\n  {nombre: 'Carlos', edad: 30}\n];\n\nlet nombresAdultos = personas\n  .filter(p => p.edad >= 18)\n  .map(p => p.nombre);\nconsole.log(nombresAdultos);\n// ['Ana', 'Carlos']",
          },
        ],
        exercises: [
          {
            id: "ch05-l2-e1",
            type: "code-output",
            question: "Que produce [1,2,3].map(n => n * 3)?",
            options: ["[1,2,3]", "[3,6,9]", "[2,4,6]", "9"],
            correctAnswer: "[3,6,9]",
            explanation: "map aplica la funcion a cada elemento: 1*3=3, 2*3=6, 3*3=9.",
            xpReward: 15,
          },
          {
            id: "ch05-l2-e2",
            type: "code-output",
            question: "Que produce [1,2,3,4].filter(n => n > 2)?",
            options: ["[1,2]", "[3,4]", "[2,3,4]", "[1,2,3]"],
            correctAnswer: "[3,4]",
            explanation: "filter devuelve solo los elementos que cumplen la condicion: 3>2 y 4>2 son true.",
            xpReward: 15,
          },
          {
            id: "ch05-l2-e3",
            type: "code-output",
            question: "Que produce [1,2,3].reduce((a,b) => a + b, 0)?",
            options: ["6", "[1,2,3]", "0", "3"],
            correctAnswer: "6",
            explanation: "reduce suma todos: 0+1=1, 1+2=3, 3+3=6. El resultado final es 6.",
            xpReward: 15,
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
    totalXP: 250,
    lessons: [
      {
        id: "ch06-l1",
        title: "Metodos y prototipos",
        xpReward: 35,
        sections: [
          {
            id: "ch06-l1-s1",
            title: "Metodos y this",
            content: "Los metodos son propiedades que contienen funciones. Cuando se llama un metodo, this se refiere al objeto sobre el que se llamo. Esto permite que los metodos accedan a otras propiedades del mismo objeto.",
            codeExample: "let conejo = {\n  tipo: 'blanco',\n  hablar(linea) {\n    console.log(`El conejo ${this.tipo} dice '${linea}'`);\n  }\n};\nconejo.hablar('Hola');\n// El conejo blanco dice 'Hola'",
          },
          {
            id: "ch06-l1-s2",
            title: "Prototipos",
            content: "Cada objeto en JavaScript tiene un prototipo, otro objeto que se usa como respaldo de propiedades. Cuando buscas una propiedad que no existe en el objeto, JavaScript la busca en su prototipo. Object.prototype es la raiz de casi todos los objetos.",
            codeExample: "let vacio = {};\nconsole.log(vacio.toString);\n// function toString() {...}\n// -> viene de Object.prototype\n\nconsole.log(Object.getPrototypeOf([]) === Array.prototype);\n// true",
          },
        ],
        exercises: [
          {
            id: "ch06-l1-e1",
            type: "multiple-choice",
            question: "A que se refiere this dentro de un metodo?",
            options: [
              "Al objeto sobre el que se llamo el metodo",
              "A la funcion misma",
              "Al objeto global",
              "Al prototipo del objeto",
            ],
            correctAnswer: "Al objeto sobre el que se llamo el metodo",
            explanation: "Dentro de un metodo, this apunta al objeto que esta antes del punto en la llamada.",
            xpReward: 15,
          },
          {
            id: "ch06-l1-e2",
            type: "true-false",
            question: "Si un objeto no tiene una propiedad, JavaScript la busca en su prototipo.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "Asi funciona la cadena de prototipos: si no encuentra la propiedad en el objeto, sube al prototipo, y asi sucesivamente.",
            xpReward: 10,
          },
        ],
      },
      {
        id: "ch06-l2",
        title: "Clases y herencia",
        xpReward: 40,
        sections: [
          {
            id: "ch06-l2-s1",
            title: "Notacion de clase",
            content: "La notacion class (ES2015) es la forma moderna de definir constructores y prototipos. Tiene un constructor para inicializar propiedades y metodos que se agregan al prototipo. Todas las instancias creadas con new comparten los mismos metodos.",
            codeExample: "class Animal {\n  constructor(nombre) {\n    this.nombre = nombre;\n  }\n  hablar() {\n    return `${this.nombre} hace un sonido`;\n  }\n}\nlet a = new Animal('Rex');\nconsole.log(a.hablar()); // 'Rex hace un sonido'",
          },
          {
            id: "ch06-l2-s2",
            title: "Herencia con extends",
            content: "extends crea una clase hija que hereda metodos de la clase padre. super() llama al constructor padre. Los metodos pueden ser sobrescritos (override) en la clase hija. Esto es polimorfismo: objetos de diferentes clases responden al mismo metodo de formas distintas.",
            codeExample: "class Perro extends Animal {\n  constructor(nombre, raza) {\n    super(nombre);\n    this.raza = raza;\n  }\n  hablar() {\n    return `${this.nombre} ladra`;\n  }\n}\nlet p = new Perro('Rex', 'Pastor');\nconsole.log(p.hablar()); // 'Rex ladra'\nconsole.log(p instanceof Animal); // true",
          },
          {
            id: "ch06-l2-s3",
            title: "Getters, setters y static",
            content: "Los getters y setters permiten ejecutar codigo cuando se lee o asigna una propiedad. Se definen con get y set dentro de la clase. Los metodos static pertenecen a la clase misma, no a las instancias.",
            codeExample: "class Temperatura {\n  constructor(celsius) {\n    this.celsius = celsius;\n  }\n  get fahrenheit() {\n    return this.celsius * 1.8 + 32;\n  }\n  static fromFahrenheit(valor) {\n    return new Temperatura((valor - 32) / 1.8);\n  }\n}\nlet t = new Temperatura(22);\nconsole.log(t.fahrenheit); // 71.6",
          },
        ],
        exercises: [
          {
            id: "ch06-l2-e1",
            type: "multiple-choice",
            question: "Que palabra clave se usa para herencia en JavaScript?",
            options: ["extends", "inherits", "super", "prototype"],
            correctAnswer: "extends",
            explanation: "La palabra clave extends permite que una clase herede de otra.",
            xpReward: 15,
          },
          {
            id: "ch06-l2-e2",
            type: "fill-blank",
            question: "Para llamar al constructor de la clase padre desde una clase hija, usamos ___().",
            options: ["super", "parent", "this", "base"],
            correctAnswer: "super",
            explanation: "super() llama al constructor de la clase padre. Es obligatorio llamarlo antes de usar this en el constructor de la clase hija.",
            xpReward: 15,
          },
          {
            id: "ch06-l2-e3",
            type: "true-false",
            question: "new Perro('Rex') instanceof Animal es true si Perro extends Animal.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "instanceof verifica la cadena de prototipos. Un Perro es tambien un Animal porque Perro extiende de Animal.",
            xpReward: 10,
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
    totalXP: 250,
    lessons: [
      {
        id: "ch07-l1",
        title: "El pueblo y el estado",
        xpReward: 40,
        sections: [
          {
            id: "ch07-l1-s1",
            title: "Meadowfield",
            content: "El pueblo de Meadowfield tiene 11 lugares conectados por 14 caminos. Lo representamos como un grafo: un objeto donde cada propiedad (lugar) tiene un arreglo de lugares a los que se puede ir. El robot debe recoger y entregar paquetes moviendose por estos caminos.",
            codeExample: "const roads = [\n  \"Casa de Alice-Casa de Bob\",\n  \"Casa de Alice-Oficina de Correos\",\n  \"Casa de Bob-Ayuntamiento\",\n  // ... mas caminos\n];\n\nfunction buildGraph(edges) {\n  let graph = Object.create(null);\n  // construir grafo de adyacencia\n  return graph;\n}",
          },
          {
            id: "ch07-l1-s2",
            title: "Estado inmutable",
            content: "El estado del robot (ubicacion actual, paquetes pendientes) se modela como un objeto inmutable. Cada movimiento crea un nuevo estado en lugar de modificar el anterior. Esto hace el programa mas facil de entender y depurar.",
            codeExample: "class VillageState {\n  constructor(place, parcels) {\n    this.place = place;\n    this.parcels = parcels;\n  }\n  move(destination) {\n    // Devuelve un NUEVO estado\n    let parcels = this.parcels.map(p => {\n      if (p.place !== this.place) return p;\n      return {place: destination, address: p.address};\n    }).filter(p => p.place !== p.address);\n    return new VillageState(destination, parcels);\n  }\n}",
          },
        ],
        exercises: [
          {
            id: "ch07-l1-e1",
            type: "multiple-choice",
            question: "Que tipo de estructura de datos es ideal para representar las calles de un pueblo?",
            options: ["Un grafo", "Un arreglo lineal", "Un numero", "Una cadena"],
            correctAnswer: "Un grafo",
            explanation: "Un grafo representa conexiones entre nodos, perfecto para modelar calles que conectan lugares.",
            xpReward: 15,
          },
          {
            id: "ch07-l1-e2",
            type: "multiple-choice",
            question: "Por que el estado del pueblo es inmutable?",
            options: [
              "Cada movimiento crea un nuevo estado en lugar de modificar el anterior",
              "Los objetos en JavaScript no se pueden modificar",
              "El robot no puede moverse",
              "Los grafos son siempre inmutables",
            ],
            correctAnswer: "Cada movimiento crea un nuevo estado en lugar de modificar el anterior",
            explanation: "La inmutabilidad facilita razonar sobre el programa porque cada estado es independiente y no hay efectos secundarios inesperados.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch07-l2",
        title: "Estrategias del robot",
        xpReward: 45,
        sections: [
          {
            id: "ch07-l2-s1",
            title: "Robot aleatorio y robot con ruta",
            content: "El robot mas simple elige direcciones al azar. Un robot mejor sigue una ruta fija que pasa por todos los lugares. El mas inteligente calcula la ruta mas corta al siguiente paquete usando busqueda en anchura (BFS).",
          },
          {
            id: "ch07-l2-s2",
            title: "Busqueda de ruta (pathfinding)",
            content: "Para encontrar la ruta mas corta entre dos nodos de un grafo, usamos BFS (Breadth-First Search). Exploramos los vecinos nivel por nivel hasta encontrar el destino. Esto garantiza encontrar el camino mas corto.",
            codeExample: "function findRoute(graph, from, to) {\n  let work = [{at: from, route: []}];\n  for (let i = 0; i < work.length; i++) {\n    let {at, route} = work[i];\n    for (let place of graph[at]) {\n      if (place === to) return route.concat(place);\n      if (!work.some(w => w.at === place)) {\n        work.push({at: place, route: route.concat(place)});\n      }\n    }\n  }\n}",
          },
        ],
        exercises: [
          {
            id: "ch07-l2-e1",
            type: "multiple-choice",
            question: "Que algoritmo se usa para encontrar la ruta mas corta en un grafo no ponderado?",
            options: ["BFS (busqueda en anchura)", "DFS (busqueda en profundidad)", "Ordenamiento burbuja", "Busqueda binaria"],
            correctAnswer: "BFS (busqueda en anchura)",
            explanation: "BFS explora todos los nodos a distancia 1, luego a distancia 2, etc. Esto garantiza encontrar la ruta mas corta en grafos no ponderados.",
            xpReward: 20,
          },
          {
            id: "ch07-l2-e2",
            type: "true-false",
            question: "Un robot que elige caminos al azar es mas eficiente que uno con una ruta calculada.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "Un robot aleatorio tarda en promedio muchos mas pasos que uno que calcula rutas optimas.",
            xpReward: 15,
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
    totalXP: 220,
    lessons: [
      {
        id: "ch08-l1",
        title: "Modo estricto y tipos",
        xpReward: 35,
        sections: [
          {
            id: "ch08-l1-s1",
            title: "Bugs en JavaScript",
            content: "Los errores en los programas se llaman bugs. JavaScript es un lenguaje permisivo que rara vez senala errores antes de ejecutar. Puede hacer cosas absurdas como true * 'monkey' sin quejarse, produciendo NaN silenciosamente.",
          },
          {
            id: "ch08-l1-s2",
            title: "Modo estricto",
            content: "El modo estricto ('use strict') hace que JavaScript sea mas estricto. Convierte errores silenciosos en errores visibles: variables no declaradas causan error, this es undefined en funciones normales, y parametros duplicados no se permiten.",
            codeExample: "\"use strict\";\nfunction test() {\n  // Sin let -> Error!\n  counter = 0; // ReferenceError\n}\n\n// Tambien atrapa esto:\nfunction Person(name) {\n  this.name = name;\n}\nlet p = Person('Ana'); // TypeError: Cannot set property of undefined",
          },
        ],
        exercises: [
          {
            id: "ch08-l1-e1",
            type: "multiple-choice",
            question: "Que hace 'use strict' en JavaScript?",
            options: [
              "Convierte errores silenciosos en errores visibles",
              "Hace el programa mas lento",
              "Deshabilita funciones",
              "Solo funciona en Node.js",
            ],
            correctAnswer: "Convierte errores silenciosos en errores visibles",
            explanation: "El modo estricto ayuda a encontrar bugs convirtiendo errores que normalmente se ignoran en errores explicitos.",
            xpReward: 15,
          },
          {
            id: "ch08-l1-e2",
            type: "true-false",
            question: "En modo estricto, olvidar let al declarar una variable causa un error.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "En modo estricto, asignar a una variable no declarada produce un ReferenceError en lugar de crear una global silenciosamente.",
            xpReward: 10,
          },
        ],
      },
      {
        id: "ch08-l2",
        title: "Excepciones y depuracion",
        xpReward: 40,
        sections: [
          {
            id: "ch08-l2-s1",
            title: "Try, Catch y Finally",
            content: "try/catch permite capturar errores en tiempo de ejecucion. El bloque try contiene el codigo que puede fallar, catch recibe el error y lo maneja, y finally siempre se ejecuta (con o sin error). Puedes lanzar tus propios errores con throw.",
            codeExample: "try {\n  let x = undefinedVar;\n} catch (error) {\n  console.log('Error:', error.message);\n} finally {\n  console.log('Siempre se ejecuta');\n}\n\n// Lanzar errores propios\nfunction dividir(a, b) {\n  if (b === 0) throw new Error('No se puede dividir por cero');\n  return a / b;\n}",
          },
          {
            id: "ch08-l2-s2",
            title: "Depuracion y pruebas",
            content: "La depuracion es el proceso de encontrar y corregir bugs. Estrategias: usar console.log para inspeccionar valores, usar el debugger del navegador con breakpoints, y escribir pruebas automatizadas que verifiquen que el codigo funciona correctamente.",
            codeExample: "// Prueba simple\nfunction test(label, body) {\n  if (!body()) {\n    console.log(`Fallo: ${label}`);\n  }\n}\n\ntest('sumar numeros', () => {\n  return suma(1, 2) === 3;\n});\ntest('sumar cadena y numero', () => {\n  return suma('1', 2) === 3;\n});",
          },
        ],
        exercises: [
          {
            id: "ch08-l2-e1",
            type: "fill-blank",
            question: "Para capturar errores en JavaScript, usamos ___ / catch.",
            options: ["try", "do", "test", "handle"],
            correctAnswer: "try",
            explanation: "La sentencia try/catch permite manejar excepciones: try intenta ejecutar codigo, catch captura cualquier error.",
            xpReward: 15,
          },
          {
            id: "ch08-l2-e2",
            type: "multiple-choice",
            question: "Que palabra clave se usa para lanzar un error manualmente?",
            options: ["throw", "error", "catch", "reject"],
            correctAnswer: "throw",
            explanation: "throw lanza una excepcion que puede ser capturada por un bloque try/catch mas arriba en la pila de llamadas.",
            xpReward: 15,
          },
          {
            id: "ch08-l2-e3",
            type: "true-false",
            question: "El bloque finally se ejecuta solo cuando hay un error.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "finally siempre se ejecuta, tanto si hubo un error como si no. Es ideal para limpieza de recursos.",
            xpReward: 10,
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
    totalXP: 240,
    lessons: [
      {
        id: "ch09-l1",
        title: "Creando y probando patrones",
        xpReward: 35,
        sections: [
          {
            id: "ch09-l1-s1",
            title: "Crear expresiones regulares",
            content: "Una expresion regular es un patron que describe un conjunto de cadenas. Se crean con barras /patron/ o con new RegExp('patron'). El metodo test() verifica si el patron existe en una cadena y devuelve true/false.",
            codeExample: "let patron1 = /abc/;\nlet patron2 = new RegExp('abc');\n\nconsole.log(patron1.test('abcde')); // true\nconsole.log(patron1.test('abxde')); // false",
          },
          {
            id: "ch09-l1-s2",
            title: "Conjuntos de caracteres",
            content: "Los corchetes [...] definen conjuntos de caracteres. \\d = digito, \\w = alfanumerico, \\s = espacio, . = cualquier caracter excepto salto de linea. + significa uno o mas, * cero o mas, ? cero o uno.",
            codeExample: "console.log(/[0-9]/.test('en 1992')); // true\nconsole.log(/\\d+/.test('abc')); // false\nconsole.log(/\\d+/.test('abc123')); // true\n\n// Negacion con ^\nconsole.log(/[^01]/.test('0101')); // false\nconsole.log(/[^01]/.test('0123')); // true",
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
            xpReward: 15,
          },
          {
            id: "ch09-l1-e2",
            type: "multiple-choice",
            question: "Que representa \\d en una expresion regular?",
            options: ["Cualquier digito (0-9)", "La letra d", "Un punto", "Un espacio"],
            correctAnswer: "Cualquier digito (0-9)",
            explanation: "\\d es un atajo para [0-9] y coincide con cualquier caracter de digito.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch09-l2",
        title: "Patrones avanzados",
        xpReward: 40,
        sections: [
          {
            id: "ch09-l2-s1",
            title: "Grupos y alternancia",
            content: "Los parentesis () crean grupos que permiten aplicar operadores a subexpresiones. El pipe | indica alternancia (uno u otro). ^ coincide con el inicio y $ con el final de la cadena.",
            codeExample: "// Alternancia\nconsole.log(/gato|perro/.test('tengo un gato')); // true\n\n// Grupos\nlet hora = /\\d{1,2}:\\d{2}/;\nconsole.log(hora.test('son las 12:30')); // true\n\n// Inicio y final\nconsole.log(/^\\d+$/.test('123')); // true\nconsole.log(/^\\d+$/.test('123a')); // false",
          },
          {
            id: "ch09-l2-s2",
            title: "Metodos de cadena con regex",
            content: "Las cadenas tienen metodos que trabajan con regex: match() encuentra coincidencias, replace() reemplaza texto, y search() encuentra la posicion. Con el flag g (global) se encuentran todas las coincidencias.",
            codeExample: "let texto = 'Ana tiene 25 anos y Bob 30';\nconsole.log(texto.match(/\\d+/g)); // ['25', '30']\n\nlet resultado = 'papa papa'.replace(/papa/, 'mama');\nconsole.log(resultado); // 'mama papa'\n\nlet global = 'papa papa'.replace(/papa/g, 'mama');\nconsole.log(global); // 'mama mama'",
          },
        ],
        exercises: [
          {
            id: "ch09-l2-e1",
            type: "code-output",
            question: "Que produce 'hola mundo'.replace(/mundo/, 'JS')?",
            options: ["'hola JS'", "'hola mundo'", "'JS mundo'", "Error"],
            correctAnswer: "'hola JS'",
            explanation: "replace busca la primera coincidencia de 'mundo' y la reemplaza con 'JS'.",
            xpReward: 15,
          },
          {
            id: "ch09-l2-e2",
            type: "code-output",
            question: "Que produce /^\\d+$/.test('12a3')?",
            options: ["false", "true", "'123'", "null"],
            correctAnswer: "false",
            explanation: "^\\d+$ exige que TODA la cadena sean digitos. '12a3' contiene una 'a', asi que es false.",
            xpReward: 15,
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
    totalXP: 220,
    lessons: [
      {
        id: "ch10-l1",
        title: "Modulos ES y CommonJS",
        xpReward: 35,
        sections: [
          {
            id: "ch10-l1-s1",
            title: "Por que modulos?",
            content: "Los modulos dividen el programa en piezas con interfaces claras. Cada modulo tiene su propio scope, evitando que los nombres choquen. Un buen modulo oculta sus detalles internos y expone solo lo necesario.",
          },
          {
            id: "ch10-l1-s2",
            title: "Modulos ES (import/export)",
            content: "Los modulos ES son el estandar moderno. export hace disponible un valor a otros modulos. import lo trae. Existen exports con nombre (import { x }) y export default (import x). Las dependencias se resuelven antes de ejecutar el codigo.",
            codeExample: "// math.js\nexport function suma(a, b) { return a + b; }\nexport const PI = 3.14159;\nexport default function resta(a, b) { return a - b; }\n\n// app.js\nimport resta, { suma, PI } from './math.js';\nconsole.log(suma(2, 3)); // 5\nconsole.log(resta(5, 2)); // 3",
          },
          {
            id: "ch10-l1-s3",
            title: "CommonJS y paquetes",
            content: "CommonJS usa require() y module.exports, comun en Node.js. NPM es el registro de paquetes donde puedes instalar modulos de terceros. Un paquete puede contener multiples modulos y tiene un package.json que describe sus dependencias.",
            codeExample: "// CommonJS (Node.js)\nconst {suma} = require('./math');\nmodule.exports = {resta};\n\n// Instalar paquetes\n// npm install lodash\nconst _ = require('lodash');",
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
          {
            id: "ch10-l1-e2",
            type: "multiple-choice",
            question: "Cual es la diferencia entre export y export default?",
            options: [
              "export necesita llaves al importar, export default no",
              "No hay diferencia",
              "export default es mas rapido",
              "Solo se puede usar export en Node.js",
            ],
            correctAnswer: "export necesita llaves al importar, export default no",
            explanation: "Con export: import { nombre } from '...'. Con export default: import nombre from '...'. Solo puede haber un default por modulo.",
            xpReward: 15,
          },
          {
            id: "ch10-l1-e3",
            type: "fill-blank",
            question: "En Node.js (CommonJS), para importar un modulo usamos la funcion ___().",
            options: ["require", "import", "load", "include"],
            correctAnswer: "require",
            explanation: "require() es la funcion de CommonJS para cargar modulos en Node.js. Es la alternativa pre-ES6 a import.",
            xpReward: 10,
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
    totalXP: 260,
    lessons: [
      {
        id: "ch11-l1",
        title: "Asincronia y callbacks",
        xpReward: 35,
        sections: [
          {
            id: "ch11-l1-s1",
            title: "Programacion sincrona vs asincrona",
            content: "En el modelo sincrono, las cosas suceden una a la vez y el programa espera. En el modelo asincrono, puedes iniciar una operacion larga (red, disco) y el programa continua ejecutandose. Cuando la operacion termina, tu programa es notificado.",
          },
          {
            id: "ch11-l1-s2",
            title: "Callbacks (retrollamadas)",
            content: "Un callback es una funcion que se pasa como argumento y se ejecuta cuando una operacion asincrona termina. setTimeout es un ejemplo basico. El problema de los callbacks anidados se conoce como 'callback hell'.",
            codeExample: "setTimeout(() => console.log('Tick'), 500);\n\n// Callback hell\nreadFile('a.txt', contenidoA => {\n  readFile('b.txt', contenidoB => {\n    console.log(contenidoA === contenidoB);\n  });\n});",
          },
        ],
        exercises: [
          {
            id: "ch11-l1-e1",
            type: "multiple-choice",
            question: "Que es la programacion asincrona?",
            options: [
              "El programa continua mientras espera operaciones lentas",
              "El programa se ejecuta mas rapido",
              "El programa se detiene hasta que todo termine",
              "Solo funciona en el navegador",
            ],
            correctAnswer: "El programa continua mientras espera operaciones lentas",
            explanation: "La asincronia permite que el programa no se bloquee esperando operaciones como peticiones de red o lectura de archivos.",
            xpReward: 15,
          },
          {
            id: "ch11-l1-e2",
            type: "fill-blank",
            question: "Los callbacks anidados excesivamente se conocen como callback ___.",
            options: ["hell", "loop", "stack", "chain"],
            correctAnswer: "hell",
            explanation: "Callback hell se refiere a codigo con muchos callbacks anidados, difícil de leer y mantener. Las promesas y async/await resuelven este problema.",
            xpReward: 10,
          },
        ],
      },
      {
        id: "ch11-l2",
        title: "Promesas y async/await",
        xpReward: 45,
        sections: [
          {
            id: "ch11-l2-s1",
            title: "Promesas",
            content: "Una Promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca. Se crea con new Promise(resolve, reject). Se consume con .then() para exito y .catch() para error. Promise.all() espera multiples promesas en paralelo.",
            codeExample: "let promesa = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Listo!'), 1000);\n});\npromesa\n  .then(resultado => console.log(resultado))\n  .catch(error => console.log('Error:', error));\n\n// Paralelo\nPromise.all([fetch('/a'), fetch('/b')])\n  .then(([a, b]) => console.log('Ambos listos!'));",
          },
          {
            id: "ch11-l2-s2",
            title: "Async / Await",
            content: "async/await es azucar sintactico sobre promesas. Una funcion async siempre devuelve una promesa. await pausa la ejecucion hasta que la promesa se resuelve. Se usa try/catch para manejar errores en funciones async.",
            codeExample: "async function obtenerDatos() {\n  try {\n    let respuesta = await fetch('/api/datos');\n    let datos = await respuesta.json();\n    return datos;\n  } catch (error) {\n    console.log('Error:', error);\n  }\n}\n\n// Llamar\nobtenerDatos().then(d => console.log(d));",
          },
          {
            id: "ch11-l2-s3",
            title: "El bucle de eventos",
            content: "JavaScript es mono-hilo pero usa un bucle de eventos para manejar la asincronia. Las operaciones asincronas (setTimeout, fetch) se envian a APIs del navegador/Node. Cuando terminan, sus callbacks se agregan a una cola. El bucle de eventos toma callbacks de la cola cuando la pila de llamadas esta vacia.",
          },
        ],
        exercises: [
          {
            id: "ch11-l2-e1",
            type: "multiple-choice",
            question: "Que devuelve siempre una funcion async?",
            options: ["Una Promesa", "Un numero", "undefined", "Un objeto"],
            correctAnswer: "Una Promesa",
            explanation: "Las funciones async siempre devuelven una Promesa, incluso si el return es un valor simple.",
            xpReward: 15,
          },
          {
            id: "ch11-l2-e2",
            type: "multiple-choice",
            question: "Que hace Promise.all([p1, p2])?",
            options: [
              "Espera a que todas las promesas se resuelvan",
              "Cancela todas las promesas",
              "Ejecuta las promesas una por una",
              "Solo espera la primera promesa",
            ],
            correctAnswer: "Espera a que todas las promesas se resuelvan",
            explanation: "Promise.all recibe un arreglo de promesas y devuelve una nueva promesa que se resuelve cuando TODAS se resuelven.",
            xpReward: 15,
          },
          {
            id: "ch11-l2-e3",
            type: "true-false",
            question: "await solo se puede usar dentro de una funcion async.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "await solo es valido dentro de funciones marcadas con async (o en el nivel superior de un modulo ES).",
            xpReward: 10,
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
    totalXP: 250,
    lessons: [
      {
        id: "ch12-l1",
        title: "El parser de Egg",
        xpReward: 45,
        sections: [
          {
            id: "ch12-l1-s1",
            title: "Que es un lenguaje?",
            content: "Todo lenguaje de programacion tiene un parser (convierte texto en estructura de datos) y un evaluador (ejecuta esa estructura). Construiremos Egg, un lenguaje minimalista pero completo con variables, funciones y condicionales.",
          },
          {
            id: "ch12-l1-s2",
            title: "Parseo: de texto a arbol",
            content: "El parser lee la cadena de codigo y produce un AST (Abstract Syntax Tree). Cada nodo del arbol tiene un tipo: 'value' (numeros/cadenas), 'word' (nombres) o 'apply' (llamadas a funcion). El parser usa recursion para manejar expresiones anidadas.",
            codeExample: "// Codigo Egg:\n// do(define(x, 10), print(+(x, 1)))\n\n// Se parsea a un AST como:\n{\n  type: 'apply',\n  operator: {type: 'word', name: 'do'},\n  args: [\n    {type: 'apply', operator: {type: 'word', name: 'define'}, args: [...]},\n    {type: 'apply', operator: {type: 'word', name: 'print'}, args: [...]}\n  ]\n}",
          },
        ],
        exercises: [
          {
            id: "ch12-l1-e1",
            type: "multiple-choice",
            question: "Que hace un parser?",
            options: [
              "Convierte texto en una estructura de datos (AST)",
              "Ejecuta codigo directamente",
              "Dibuja en pantalla",
              "Conecta a internet",
            ],
            correctAnswer: "Convierte texto en una estructura de datos (AST)",
            explanation: "Un parser analiza texto segun reglas gramaticales y lo convierte en un arbol de sintaxis abstracta (AST).",
            xpReward: 20,
          },
          {
            id: "ch12-l1-e2",
            type: "fill-blank",
            question: "AST significa Abstract Syntax ___.",
            options: ["Tree", "Type", "Table", "Token"],
            correctAnswer: "Tree",
            explanation: "AST = Abstract Syntax Tree (Arbol de Sintaxis Abstracta). Representa la estructura del codigo como un arbol de nodos.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch12-l2",
        title: "El evaluador y entorno",
        xpReward: 50,
        sections: [
          {
            id: "ch12-l2-s1",
            title: "Evaluar el AST",
            content: "El evaluador recorre el AST y ejecuta cada nodo. Los valores se devuelven directamente. Los nombres (word) se buscan en el entorno. Las aplicaciones (apply) llaman funciones con argumentos evaluados. Las formas especiales (if, while, define) tienen logica propia.",
          },
          {
            id: "ch12-l2-s2",
            title: "El entorno",
            content: "El entorno es un objeto que mapea nombres a valores. Contiene las funciones basicas (+, -, *, /, ==, <, >, print) y las formas especiales (if, while, do, define, fun). Nuevas variables se agregan al entorno con define.",
            codeExample: "// Programa Egg completo:\n// do(\n//   define(pow, fun(base, exp,\n//     if(==(exp, 0), 1,\n//       *(base, pow(base, -(exp, 1)))))),\n//   print(pow(2, 10))\n// )\n// => 1024",
          },
        ],
        exercises: [
          {
            id: "ch12-l2-e1",
            type: "multiple-choice",
            question: "En Egg, que hace la forma especial 'define'?",
            options: [
              "Crea una nueva variable en el entorno",
              "Define una clase",
              "Importa un modulo",
              "Imprime un valor",
            ],
            correctAnswer: "Crea una nueva variable en el entorno",
            explanation: "define asigna un valor a un nombre en el entorno actual, similar a let en JavaScript.",
            xpReward: 20,
          },
          {
            id: "ch12-l2-e2",
            type: "true-false",
            question: "Egg puede definir funciones recursivas.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "Si, Egg soporta recursion. Una funcion puede llamarse a si misma a traves de su nombre en el entorno.",
            xpReward: 15,
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
    totalXP: 200,
    lessons: [
      {
        id: "ch13-l1",
        title: "Redes y la Web",
        xpReward: 35,
        sections: [
          {
            id: "ch13-l1-s1",
            title: "Como funciona la Web",
            content: "La web funciona sobre HTTP (Hypertext Transfer Protocol). Un navegador envia peticiones (requests) a servidores usando URLs, y los servidores responden con documentos HTML, CSS, JavaScript, imagenes, etc. Cada recurso tiene una URL unica.",
          },
          {
            id: "ch13-l1-s2",
            title: "HTML y la estructura de una pagina",
            content: "HTML (HyperText Markup Language) es el formato de las paginas web. Usa etiquetas como <p>, <h1>, <a>, <img>. El navegador parsea el HTML y construye un arbol de nodos llamado DOM. JavaScript puede leer y modificar este arbol para hacer la pagina interactiva.",
            codeExample: "<!DOCTYPE html>\n<html>\n  <head><title>Mi pagina</title></head>\n  <body>\n    <h1>Hola Mundo</h1>\n    <p>Esto es un parrafo.</p>\n    <script>alert('Hola desde JS!');</script>\n  </body>\n</html>",
          },
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
          {
            id: "ch13-l1-e2",
            type: "multiple-choice",
            question: "Que construye el navegador al parsear HTML?",
            options: ["El DOM (Document Object Model)", "Una base de datos", "Un servidor", "Un compilador"],
            correctAnswer: "El DOM (Document Object Model)",
            explanation: "El navegador parsea HTML y crea un arbol de nodos llamado DOM que JavaScript puede manipular.",
            xpReward: 15,
          },
          {
            id: "ch13-l1-e3",
            type: "true-false",
            question: "JavaScript solo puede ejecutarse en navegadores web.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Falso",
            explanation: "JavaScript tambien puede ejecutarse fuera del navegador con Node.js, Deno, Bun y otros entornos.",
            xpReward: 10,
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
    totalXP: 240,
    lessons: [
      {
        id: "ch14-l1",
        title: "Navegando el DOM",
        xpReward: 35,
        sections: [
          {
            id: "ch14-l1-s1",
            title: "El arbol DOM",
            content: "El DOM representa la pagina como un arbol de nodos. Cada etiqueta HTML se convierte en un nodo elemento, y el texto dentro se convierte en nodos de texto. document.body es la raiz del contenido visible. Puedes navegar con childNodes, parentNode, firstChild, etc.",
            codeExample: "// Navegar el arbol\nconsole.log(document.body.childNodes.length);\nconsole.log(document.body.firstChild);\nconsole.log(document.body.lastChild.parentNode);",
          },
          {
            id: "ch14-l1-s2",
            title: "Buscar elementos",
            content: "Hay varias formas de encontrar elementos: getElementById (por id), getElementsByTagName (por etiqueta), getElementsByClassName (por clase), y querySelector/querySelectorAll (por selector CSS). querySelector devuelve el primero que coincide.",
            codeExample: "let titulo = document.getElementById('titulo');\nlet parrafos = document.querySelectorAll('p');\nlet primero = document.querySelector('.clase');\n\n// Cambiar contenido\ntitulo.textContent = 'Nuevo titulo';",
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
            xpReward: 15,
          },
          {
            id: "ch14-l1-e2",
            type: "multiple-choice",
            question: "Que metodo usa selectores CSS para encontrar elementos?",
            options: ["querySelector", "getElementById", "findByCSS", "selectElement"],
            correctAnswer: "querySelector",
            explanation: "querySelector acepta un selector CSS y devuelve el primer elemento que coincide. querySelectorAll devuelve todos.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch14-l2",
        title: "Modificando el DOM",
        xpReward: 40,
        sections: [
          {
            id: "ch14-l2-s1",
            title: "Crear y modificar nodos",
            content: "Puedes crear nuevos nodos con document.createElement y document.createTextNode. appendChild agrega un hijo al final, insertBefore lo inserta antes de otro nodo, y remove() elimina un nodo del arbol.",
            codeExample: "let parrafo = document.createElement('p');\nparrafo.textContent = 'Hola mundo';\ndocument.body.appendChild(parrafo);\n\n// Eliminar un nodo\nlet viejo = document.getElementById('viejo');\nviejo.remove();",
          },
          {
            id: "ch14-l2-s2",
            title: "Atributos y estilos",
            content: "Los atributos HTML se leen con getAttribute y se establecen con setAttribute. Los estilos CSS se modifican directamente con element.style. Las clases se manejan con classList (add, remove, toggle, contains).",
            codeExample: "let link = document.querySelector('a');\nconsole.log(link.getAttribute('href'));\nlink.setAttribute('target', '_blank');\n\n// Estilos\nlet div = document.querySelector('div');\ndiv.style.color = 'red';\ndiv.style.backgroundColor = 'blue';\n\n// Clases\ndiv.classList.add('activo');\ndiv.classList.toggle('visible');",
          },
        ],
        exercises: [
          {
            id: "ch14-l2-e1",
            type: "fill-blank",
            question: "Para crear un nuevo elemento HTML usamos document.___('p').",
            options: ["createElement", "createNode", "addElement", "newElement"],
            correctAnswer: "createElement",
            explanation: "document.createElement('p') crea un nuevo elemento <p> en memoria que luego puedes agregar al DOM.",
            xpReward: 15,
          },
          {
            id: "ch14-l2-e2",
            type: "multiple-choice",
            question: "Como se agrega un nodo hijo al final de un elemento?",
            options: ["appendChild()", "addChild()", "insertEnd()", "pushChild()"],
            correctAnswer: "appendChild()",
            explanation: "appendChild agrega un nodo como el ultimo hijo del elemento padre.",
            xpReward: 15,
          },
          {
            id: "ch14-l2-e3",
            type: "true-false",
            question: "classList.toggle('clase') agrega la clase si no existe y la quita si ya existe.",
            options: ["Verdadero", "Falso"],
            correctAnswer: "Verdadero",
            explanation: "toggle alterna: si la clase esta presente la quita, si no esta la agrega. Muy util para estados activo/inactivo.",
            xpReward: 10,
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
    totalXP: 240,
    lessons: [
      {
        id: "ch15-l1",
        title: "Manejadores de eventos",
        xpReward: 35,
        sections: [
          {
            id: "ch15-l1-s1",
            title: "addEventListener y removeEventListener",
            content: "Los eventos permiten que tu codigo reaccione a acciones del usuario. addEventListener registra una funcion (handler) para un tipo de evento. removeEventListener la desregistra. Los tipos comunes son: click, keydown, keyup, mousemove, scroll, etc.",
            codeExample: "let boton = document.querySelector('button');\nfunction handler() {\n  console.log('Click!');\n}\nboton.addEventListener('click', handler);\n// Para dejar de escuchar:\nboton.removeEventListener('click', handler);",
          },
          {
            id: "ch15-l1-s2",
            title: "El objeto evento y propagacion",
            content: "El handler recibe un objeto evento con informacion (tipo, posicion del mouse, tecla presionada, etc.). Los eventos se propagan del hijo al padre (bubbling). Puedes detener la propagacion con event.stopPropagation() y prevenir comportamiento por defecto con event.preventDefault().",
            codeExample: "document.addEventListener('click', event => {\n  console.log('Tipo:', event.type);\n  console.log('X:', event.clientX, 'Y:', event.clientY);\n});\n\ndocument.querySelector('a').addEventListener('click', event => {\n  event.preventDefault(); // No navegar\n  console.log('Link clickeado pero no navegado');\n});",
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
            xpReward: 15,
          },
          {
            id: "ch15-l1-e2",
            type: "multiple-choice",
            question: "Que hace event.preventDefault()?",
            options: [
              "Evita el comportamiento por defecto del navegador",
              "Detiene todos los eventos",
              "Elimina el elemento",
              "Desregistra el handler",
            ],
            correctAnswer: "Evita el comportamiento por defecto del navegador",
            explanation: "preventDefault() evita la accion por defecto: por ejemplo, que un link navegue o que un formulario se envie.",
            xpReward: 15,
          },
        ],
      },
      {
        id: "ch15-l2",
        title: "Eventos de teclado y temporizadores",
        xpReward: 40,
        sections: [
          {
            id: "ch15-l2-s1",
            title: "Eventos de teclado y mouse",
            content: "keydown se dispara al presionar una tecla, keyup al soltarla. event.key contiene el nombre de la tecla. Los eventos de mouse incluyen mousedown, mouseup, mousemove, y click. Se pueden combinar para crear interacciones complejas como arrastrar y soltar.",
            codeExample: "window.addEventListener('keydown', event => {\n  if (event.key === 'ArrowUp') {\n    console.log('Arriba!');\n  }\n});\n\nwindow.addEventListener('mousemove', event => {\n  console.log(`Mouse en ${event.clientX}, ${event.clientY}`);\n});",
          },
          {
            id: "ch15-l2-s2",
            title: "Temporizadores y debouncing",
            content: "setTimeout ejecuta codigo despues de un retraso. setInterval lo ejecuta repetidamente. Para eventos frecuentes (scroll, mousemove), usar debouncing: esperar un tiempo sin nuevos eventos antes de actuar. requestAnimationFrame es ideal para animaciones (60fps).",
            codeExample: "// Despues de 2 segundos\nsetTimeout(() => console.log('Tick'), 2000);\n\n// Cada segundo\nlet id = setInterval(() => console.log('Tick'), 1000);\nclearInterval(id); // detener\n\n// Debounce\nlet timeout;\nwindow.addEventListener('scroll', () => {\n  clearTimeout(timeout);\n  timeout = setTimeout(() => console.log('Scroll detenido'), 200);\n});",
          },
        ],
        exercises: [
          {
            id: "ch15-l2-e1",
            type: "multiple-choice",
            question: "Que propiedad del evento indica que tecla se presiono?",
            options: ["event.key", "event.char", "event.letter", "event.button"],
            correctAnswer: "event.key",
            explanation: "event.key contiene el nombre de la tecla presionada, como 'Enter', 'ArrowUp', 'a', etc.",
            xpReward: 15,
          },
          {
            id: "ch15-l2-e2",
            type: "fill-blank",
            question: "Para ejecutar codigo cada 1000ms usamos ___(() => {...}, 1000).",
            options: ["setInterval", "setTimeout", "requestAnimationFrame", "setTimer"],
            correctAnswer: "setInterval",
            explanation: "setInterval ejecuta la funcion repetidamente con el intervalo especificado en milisegundos.",
            xpReward: 15,
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
