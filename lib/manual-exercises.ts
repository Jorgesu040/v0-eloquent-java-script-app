import { Exercise } from "./course-data";

export const MANUAL_EXERCISES: Record<string, Exercise> = {
    // --- Chapter 0: Introducción ---
    "ch00-l0-s0": {
        id: "ex-ch00-intro",
        type: "quiz",
        prompt: "¿Qué es un programa?",
        options: [
            "Un virus informático",
            "Un conjunto de instrucciones precisas",
            "Una pieza de hardware",
            "Un error en el sistema"
        ],
        correctOptionIndex: 1,
        explanation: "Un programa es una secuencia de instrucciones que le dice a la computadora qué hacer.",
        xpReward: 10
    },

    // --- Chapter 1: Valores, Tipos y Operadores ---

    // Section: Números
    "ch01-l1-s0": {
        id: "ex-ch01-arithmetic",
        type: "code",
        prompt: "Calcula el resto de dividir 100 entre 13 usando JavaScript.",
        initialCode: "// Usa el operador %\nconsole.log(100 ...);",
        expectedOutput: "9",
        solution: "console.log(100 % 13);",
        explanation: "El operador % (módulo) devuelve el resto de la división. 100 / 13 = 7 con resto 9.",
        xpReward: 15
    },

    // Section: Cadenas (Strings)
    "ch01-l2-s1": {
        id: "ex-ch01-strings",
        type: "quiz",
        prompt: "¿Qué resultado produce \"con\" + \"cat\" + \"e\" + \"nate\"?",
        options: [
            "concatenación",
            "concatenate",
            "con cat e nate",
            "Error de sintaxis"
        ],
        correctOptionIndex: 1,
        explanation: "El operador + concatena cadenas sin añadir espacios.",
        xpReward: 10
    },

    // Section: Operadores Unarios (typeof)
    "ch01-l3-s0": {
        id: "ex-ch01-typeof",
        type: "code",
        prompt: "¿Cuál es el tipo de dato de 4.5?",
        initialCode: "console.log(typeof 4.5);",
        expectedOutput: "number",
        solution: "console.log(typeof 4.5);",
        explanation: "En JavaScript, tanto los enteros como los decimales son del tipo 'number'.",
        xpReward: 10
    },

    // Section: Valores Booleanos
    "ch01-l4-s0": {
        id: "ex-ch01-bool",
        type: "quiz",
        prompt: "¿Cuál de las siguientes comparaciones es verdadera?",
        options: [
            "\"Itchy\" != \"Scratchy\"",
            "5 > 10",
            "NaN == NaN",
            "\"Z\" < \"A\""
        ],
        correctOptionIndex: 0,
        explanation: "\"Itchy\" es diferente de \"Scratchy\", por lo que != devuelve true. NaN no es igual a NaN.",
        xpReward: 10
    },
    // --- Chapter 2: Program Structure ---
    "ch02-l9-s1": {
        id: "ex-ch02-if",
        type: "quiz",
        prompt: "¿Qué imprimirá este código?\n\nlet num = 15;\nif (num < 10) {\n  console.log('Pequeño');\n} else if (num < 20) {\n  console.log('Mediano');\n} else {\n  console.log('Grande');\n}",
        options: ["Pequeño", "Mediano", "Grande", "Nada"],
        correctOptionIndex: 1,
        explanation: "Como 15 no es menor que 10, pasa a la siguiente condición. 15 es menor que 20, por lo que imprime 'Mediano'.",
        xpReward: 15
    },
    "ch02-l10-s1": {
        id: "ex-ch02-while",
        type: "code",
        prompt: "Completa el bucle while para imprimir números del 0 al 4.",
        initialCode: "let number = 0;\nwhile (number <= 4) {\n  console.log(number);\n  // Tu código aquí para incrementar number\n}",
        solution: "number = number + 1;",
        expectedOutput: "number = number + 1",
        explanation: "Necesitas incrementar la variable 'number' en cada iteración para evitar un bucle infinito.",
        xpReward: 20
    },
    "ch02-l12-s1": {
        id: "ex-ch02-for",
        type: "quiz",
        prompt: "¿Cuál es la estructura correcta de un bucle for?",
        options: [
            "for (inicialización; comprobación; actualización)",
            "for (comprobación; inicialización; actualización)",
            "for (actualización; comprobación; inicialización)",
            "for (inicialización; actualización; comprobación)"
        ],
        correctOptionIndex: 0,
        explanation: "El bucle for sigue el orden: inicializar variable, comprobar condición de permanencia, y actualizar estado tras cada iteración.",
        xpReward: 15
    },
    "ch02-l19-s0": {
        id: "ex-ch02-triangle",
        type: "code",
        prompt: "Ejercicio: Ciclo de un triángulo. Escribe un bucle que haga 7 llamadas a console.log para mostrar un triángulo de '#'.",
        initialCode: "for (let line = \"#\"; line.length < 8; line += \"#\") {\n  console.log(line);\n}",
        solution: "console.log(line)",
        expectedOutput: "console.log",
        explanation: "El bucle incrementa la longitud de la cadena 'line' en cada iteración y la imprime.",
        xpReward: 30
    },
    "ch02-l19-s2": {
        id: "ex-ch02-fizzbuzz",
        type: "code",
        prompt: "Ejercicio: FizzBuzz. Escribe la condición para imprimir 'Fizz' si 'n' es divisible por 3.",
        initialCode: "for (let n = 1; n <= 15; n++) {\n  // Escribe la condición para Fizz aquí\n  if (n % 3 == 0) {\n    console.log(\"Fizz\");\n  }\n}",
        solution: "n % 3 == 0",
        expectedOutput: "n % 3 == 0",
        explanation: "El operador % (módulo) devuelve el resto. Si n % 3 es 0, significa que n es divisible por 3.",
        xpReward: 30
    },
    // --- Chapter 3: Functions ---
    "ch03-l2-s0": {
        id: "ex-ch03-scope",
        type: "quiz",
        prompt: "¿Cuál es el ámbito de una variable definida con `let` dentro de un bloque `if`?",
        options: [
            "Global",
            "Local a la función que contiene el bloque",
            "Local al bloque `if`",
            "No tiene ámbito"
        ],
        correctOptionIndex: 2,
        explanation: "Las variables definidas con `let` y `const` tienen ámbito de bloque, lo que significa que solo son visibles dentro del bloque `{}` donde fueron declaradas.",
        xpReward: 15
    },
    "ch03-l14-s0": {
        id: "ex-ch03-min",
        type: "code",
        prompt: "Ejercicio: Mínimo. Escribe una función 'min' que tome dos argumentos y devuelva el menor.",
        initialCode: "function min(a, b) {\n  // Tu código aquí\n  if (a < b) return a;\n  else return b;\n}",
        solution: "return a",
        expectedOutput: "return",
        explanation: "La función debe comparar a y b, y devolver el que sea menor.",
        xpReward: 30
    },
    "ch03-l14-s1": {
        id: "ex-ch03-iseven",
        type: "code",
        prompt: "Ejercicio: Recursión. Define una función recursiva 'isEven' que devuelva true si el número es par.",
        initialCode: "function isEven(n) {\n  if (n == 0) return true;\n  else if (n == 1) return false;\n  else if (n < 0) return isEven(-n);\n  else return isEven(n - 2);\n}",
        solution: "return isEven(n - 2)",
        expectedOutput: "isEven",
        explanation: "Restamos 2 repetidamente hasta llegar a 0 (par) o 1 (impar).",
        xpReward: 30
    },
    "ch03-l14-s3": {
        id: "ex-ch03-countbs",
        type: "code",
        prompt: "Ejercicio: Conteo de Frijoles. Escribe una función 'countBs' que cuente cuántas \"B\" mayúsculas hay en un string.",
        initialCode: "function countBs(string) {\n  // Tu código aquí\n  let count = 0;\n  for (let i = 0; i < string.length; i++) {\n    if (string[i] == 'B') {\n        count += 1;\n    }\n  }\n  return count;\n}",
        solution: "string[i] == 'B'",
        expectedOutput: "count",
        explanation: "Iteramos sobre el string y comparamos cada carácter con 'B'.",
        xpReward: 30
    },

    // --- Chapter 4: Data Structures: Objects and Arrays ---
    "ch04-l2-s1": {
        id: "ex-ch04-array-access",
        type: "quiz",
        prompt: "Si tienes `let lista = [10, 20, 30]`, ¿qué valor devuelve `lista[1]`?",
        options: ["10", "20", "30", "undefined"],
        correctOptionIndex: 1,
        explanation: "Los índices de array comienzan en 0. `lista[0]` es 10, y `lista[1]` es 20.",
        xpReward: 10
    },
    "ch04-l6-s0": {
        id: "ex-ch04-mutability",
        type: "quiz",
        prompt: "Si modificas una propiedad de un objeto declarado con `const`, ¿qué sucede?",
        options: [
            "Lanza un error porque es constante",
            "El objeto se copia y se modifica la copia",
            "La propiedad cambia, ya que `const` solo protege la referencia al objeto, no su contenido",
            "El navegador se bloquea"
        ],
        correctOptionIndex: 2,
        explanation: "`const` en objetos asegura que la variable siempre apunte al mismo objeto en memoria, pero no impide cambiar las propiedades internas de ese objeto.",
        xpReward: 15
    },
    "ch04-l11-s0": {
        id: "ex-ch04-range",
        type: "code",
        prompt: "Ejercicio: La suma de un rango. Escribe una función 'range(start, end)' que devuelva un array con los números desde start hasta end.",
        initialCode: "function range(start, end) {\n  let array = [];\n  // Tu código aquí para llenar el array\n  for (let i = start; i <= end; i++) array.push(i);\n  return array;\n}",
        solution: "array.push(i)",
        expectedOutput: "push",
        explanation: "Usamos un bucle for desde 'start' hasta 'end' y agregamos cada número al array usando 'push'.",
        xpReward: 30
    },
    "ch04-l11-s1": {
        id: "ex-ch04-sum",
        type: "code",
        prompt: "Ejercicio: Suma. Escribe una función 'sum(array)' que sume todos los números de un array.",
        initialCode: "function sum(array) {\n  let total = 0;\n  for (let value of array) {\n    total += value;\n  }\n  return total;\n}",
        solution: "total += value",
        expectedOutput: "total",
        explanation: "Iteramos sobre el array y acumulamos la suma en la variable 'total'.",
        xpReward: 30
    },
    "ch04-l11-s2": {
        id: "ex-ch04-reverse",
        type: "code",
        prompt: "Ejercicio: Revertir un array. Escribe una función 'reverseArray' que tome un array y devuelva uno nuevo con el orden invertido.",
        initialCode: "function reverseArray(array) {\n  let output = [];\n  for (let i = array.length - 1; i >= 0; i--) {\n    output.push(array[i]);\n  }\n  return output;\n}",
        solution: "output.push(array[i])",
        expectedOutput: "output",
        explanation: "Recorremos el array original desde el final hasta el principio y añadimos los elementos a un nuevo array.",
        xpReward: 30
    },
    // --- Chapter 5: Higher-Order Functions ---
    // Section: Abstraction
    "ch05-l1-s0": {
        id: "ex-ch05-hof-quiz",
        type: "quiz",
        prompt: "¿Qué es una función de orden superior?",
        options: [
            "Una función que se llama a sí misma",
            "Una función que opera sobre otras funciones, tomándolas como argumentos o devolviéndolas",
            "Una función escrita en mayúsculas",
            "Una función que se ejecuta antes que las demás"
        ],
        correctOptionIndex: 1,
        explanation: "Las funciones de orden superior son aquellas que tratan a otras funciones como valores, permitiendo abstracciones poderosas.",
        xpReward: 15
    },
    // --- Chapter 6: The Secret Life of Objects ---
    // Section: Classes
    "ch06-l4-s0": {
        id: "ex-ch06-classes",
        type: "quiz",
        prompt: "¿Qué hace la palabra clave `new` en JavaScript?",
        options: [
            "Crea una nueva función",
            "Crea un nuevo objeto, vincula `this` a él y ejecuta el constructor",
            "Resetea la memoria del navegador",
            "Importa una librería externa"
        ],
        correctOptionIndex: 1,
        explanation: "Al usar `new`, se crea una instancia del objeto y se ejecuta la función constructora con el contexto `this` apropiado.",
        xpReward: 15
    }
};

export const MANUAL_LESSON_EXERCISES: Record<string, Exercise[]> = {
    "ch05-l10": [
        {
            id: "ex-ch05-flattening",
            type: "code",
            prompt: "Ejercicio: Aplanamiento. Usa el método reduce y concat para aplanar un array de arrays en un único array.",
            initialCode: "let arrays = [[1, 2, 3], [4, 5], [6]];\n// Tu código aquí.\n// console.log(arrays.reduce( ... ));",
            solution: "flat.concat(current)",
            expectedOutput: "concat",
            explanation: "Usamos reduce con un array vacío como valor inicial y concatenamos cada sub-array al acumulador.",
            xpReward: 30
        },
        {
            id: "ex-ch05-loop",
            type: "code",
            prompt: "Ejercicio: Tu propio bucle. Escribe una función de orden superior 'loop' que imite un bucle for.",
            initialCode: "function loop(start, test, update, body) {\n  for (let value = start; test(value); value = update(value)) {\n    body(value);\n  }\n}\n\nloop(3, n => n > 0, n => n - 1, console.log);",
            solution: "body(value)",
            expectedOutput: "body(value)",
            explanation: "La función debe iterar comenzando en 'start', continuar mientras 'test' sea true, actualizar con 'update' y ejecutar 'body'.",
            xpReward: 30
        },
        {
            id: "ex-ch05-every",
            type: "code",
            prompt: "Ejercicio: Cada (Every). Implementa `every` como una función que toma un array y una función de predicado.",
            initialCode: "function every(array, test) {\n  // Tu código aquí\n  for (let element of array) {\n    if (!test(element)) return false;\n  }\n  return true;\n}\n\nconsole.log(every([1, 3, 5], n => n < 10));",
            solution: "return false",
            expectedOutput: "return false",
            explanation: "Si encontramos un elemento que NO cumple el test, devolvemos false inmediatamente. Si el bucle termina, devolvemos true.",
            xpReward: 30
        }
    ],
    "ch06-l15": [
        {
            id: "ex-ch06-vector",
            type: "code",
            prompt: "Ejercicio: Un Tipo Vectorial. Escribe una clase Vec que represente un vector en 2D. Dale métodos `plus` y `minus`, y una propiedad getter `length`.",
            initialCode: "class Vec {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  plus(other) {\n    // Tu código aquí\n  }\n\n  minus(other) {\n    // Tu código aquí\n  }\n\n  get length() {\n    // Tu código aquí\n  }\n}\n\nconsole.log(new Vec(1, 2).plus(new Vec(2, 3)));\n// → Vec{x: 3, y: 5}\nconsole.log(new Vec(3, 4).length);\n// → 5",
            solution: "return new Vec(this.x + other.x, this.y + other.y);",
            expectedOutput: "Vec",
            explanation: "El método plus debe devolver un nuevo vector con la suma de las coordenadas. Length usa el teorema de Pitágoras.",
            xpReward: 30
        },
        {
            id: "ex-ch06-groups",
            type: "code",
            prompt: "Ejercicio: Grupos. Escribe una clase 'Group' con métodos 'add', 'delete' y 'has'.",
            initialCode: "class Group {\n  constructor() {\n    this.members = [];\n  }\n\n  add(value) {\n    // Tu código aquí\n  }\n\n  delete(value) {\n    // Tu código aquí\n  }\n\n  has(value) {\n    // Tu código aquí\n  }\n\n  static from(collection) {\n    let group = new Group;\n    for (let value of collection) group.add(value);\n    return group;\n  }\n}",
            solution: "if (!this.has(value))",
            expectedOutput: "Group",
            explanation: "Group debe mantener los valores únicos. 'add' solo añade si no existe, 'delete' elimina si existe.",
            xpReward: 30
        },
        {
            id: "ex-ch06-iterable-groups",
            type: "code",
            prompt: "Ejercicio: Grupos Iterables. Haz que la clase Group sea iterable implementando Symbol.iterator.",
            initialCode: "class Group {\n  // ... (código anterior) ...\n  constructor() {\n    this.members = [];\n  }\n  add(value) { if (!this.has(value)) this.members.push(value); }\n  delete(value) { this.members = this.members.filter(v => v !== value); }\n  has(value) { return this.members.includes(value); }\n  static from(collection) {\n    let group = new Group;\n    for (let value of collection) group.add(value);\n    return group;\n  }\n\n  [Symbol.iterator]() {\n    // Tu código aquí\n  }\n}\n\nfor (let value of Group.from([\"a\", \"b\", \"c\"])) {\n  console.log(value);\n}",
            solution: "return new GroupIterator(this);",
            expectedOutput: "a\nb\nc",
            explanation: "El método [Symbol.iterator] debe devolver un objeto iterador con un método next().",
            xpReward: 30
        }
    ],
    "ch07-l7": [
        {
            id: "ex-ch07-compare",
            type: "code",
            prompt: "Ejercicio: Midiendo un Robot. Escribe una función 'compareRobots' que tome dos robots y genere 100 tareas para comparar sus pasos promedio.",
            initialCode: "function compareRobots(robot1, memory1, robot2, memory2) {\n  // Tu código aquí\n}\n\ncompareRobots(routeRobot, [], goalOrientedRobot, []);",
            solution: "console.log(`Robot 1: ${total1 / 100} steps per task`)",
            expectedOutput: "steps per task",
            explanation: "Debes ejecutar runRobot (o una variante) 100 veces para cada robot y calcular el promedio de pasos.",
            xpReward: 30
        },
        {
            id: "ex-ch07-efficiency",
            type: "code",
            prompt: "Ejercicio: Eficiencia del Robot. Escribe un robot que termine la tarea de entrega más rápido que 'goalOrientedRobot'.",
            initialCode: "function yourRobot({place, parcels}, route) {\n  if (route.length == 0) {\n    // Calcula una ruta optimizada aquí\n  }\n  return {direction: route[0], memory: route.slice(1)};\n}",
            solution: "return {direction: route[0], memory: route.slice(1)};",
            expectedOutput: "direction",
            explanation: "Intenta priorizar la ruta más corta que recoge paquetes o los entrega, evitando movimientos innecesarios.",
            xpReward: 40
        },
        {
            id: "ex-ch07-pgroup",
            type: "code",
            prompt: "Ejercicio: Grupo Persistente. Escribe una clase 'PGroup' con métodos 'add', 'delete' y 'has', que sea inmutable.",
            initialCode: "class PGroup {\n  // Tu código aquí\n}\n\nPGroup.empty = new PGroup([]);\n\nlet a = PGroup.empty.add(\"a\");\nlet ab = a.add(\"b\");\nlet b = ab.delete(\"a\");\n\nconsole.log(b.has(\"b\"));\n// → true\nconsole.log(a.has(\"b\"));\n// → false\nconsole.log(b.has(\"a\"));\n// → false",
            solution: "return new PGroup(this.members.concat([value]));",
            expectedOutput: "true\nfalse\nfalse",
            explanation: "Cada operación de modificación debe devolver una *nueva* instancia de PGroup sin modificar la original.",
            xpReward: 30
        }
    ],
    "ch08-l12": [
        {
            id: "ex-ch08-retry",
            type: "code",
            prompt: "Ejercicio: Reintento. Escribe una función `reliableMultiply` que envuelva `primitiveMultiply` y siga intentando hasta que tenga éxito.",
            initialCode: "class MultiplicatorUnitFailure extends Error {}\n\nfunction primitiveMultiply(a, b) {\n  if (Math.random() < 0.2) {\n    return a * b;\n  } else {\n    throw new MultiplicatorUnitFailure(\"Klunk\");\n  }\n}\n\nfunction reliableMultiply(a, b) {\n  // Tu código aquí\n}\n\nconsole.log(reliableMultiply(8, 8));\n// → 64",
            solution: "for (;;) {\n  try {\n    return primitiveMultiply(a, b);\n  } catch (e) {\n    if (!(e instanceof MultiplicatorUnitFailure))\n      throw e;\n  }\n}",
            expectedOutput: "64",
            explanation: "Usa un bucle infinito con try/catch. Si el error es MultiplicatorUnitFailure, el bucle continúa. Si es otro error, se relanza.",
            xpReward: 30
        },
        {
            id: "ex-ch08-locked-box",
            type: "code",
            prompt: "Ejercicio: La Caja Bloqueada. Escribe `withBoxUnlocked` que desbloquee la caja, ejecute la función, y la bloquee de nuevo (usando finally).",
            initialCode: "const box = {\n  locked: true,\n  unlock() { this.locked = false; },\n  lock() { this.locked = true;  },\n  _content: [],\n  get content() {\n    if (this.locked) throw new Error(\"¡Bloqueada!\");\n    return this._content;\n  }\n};\n\nfunction withBoxUnlocked(body) {\n  // Tu código aquí\n}\n\nwithBoxUnlocked(function() {\n  box.content.push(\"moneda de oro\");\n});\n\ntry {\n  withBoxUnlocked(function() {\n    throw new Error(\"¡Piratas en el horizonte! Abortar!\");\n  });\n} catch (e) {\n  console.log(\"Error levantado: \" + e);\n}\nconsole.log(box.locked);\n// → true",
            solution: "let locked = box.locked;\nif (!locked) box.unlock();\ntry {\n  return body();\n} finally {\n  if (!locked) box.lock();\n}",
            expectedOutput: "Error levantado: Error: ¡Piratas en el horizonte! Abortar!\ntrue",
            explanation: "Usa try/finally para asegurar que box.lock() se llame siempre, incluso si body() lanza un error.",
            xpReward: 30
        }
    ],
    "ch09-l21": [
        {
            id: "ex-ch09-golf",
            type: "code",
            prompt: "Ejercicio: Regexp Golf. Escribe expresiones regulares para: 1) car/cat, 2) pop/prop, 3) ferret/ferry/ferrari, 4) palabras terminadas en 'ious', 5) un espacio seguido de .,:;",
            initialCode: "verify(/.../, \n       [\"my car\", \"bad cats\"], \n       [\"camper\", \"high art\"]);\n\nverify(/.../, \n       [\"pop culture\", \"mad props\"], \n       [\"plop\", \"prrrop\"]);\n\nverify(/.../, \n       [\"ferret\", \"ferry\", \"ferrari\"], \n       [\"ferrum\", \"transfer A\"]);\n\nverify(/.../, \n       [\"how delicious\", \"spacious room\"], \n       [\"ruinous\", \"consciousness\"]);\n\nverify(/.../, \n       [\"bad punctuation .\", \"escape the period\"], \n       [\"bad punctuation.\", \"escape the period.\"]); // Cuidado con el espacio\n\nfunction verify(regexp, yes, no) {\n  // (Función de ayuda para verificar)\n  if (regexp.source == \"...\") return;\n  yes.forEach(s => {\n    if (!regexp.test(s)) console.log(`Fallo al coincidir '${s}'`);\n  });\n  no.forEach((s) => {\n    if (regexp.test(s)) console.log(`Coincidencia inesperada para '${s}'`);\n  });\n}",
            solution: "// car/cat\nverify(/ca[rt]/, ...);\n// pop/prop\nverify(/pr?op/, ...);\n// ferret/ferry/ferrari\nverify(/ferr(et|y|ari)/, ...);\n// ending in ious\nverify(/ious\\b/, ...);\n// space followed by .,:;\nverify(/\\s[.,:;]/, ...);\n// six letters or longer\nverify(/\\w{7}/, ...);\n// no e\nverify(/\\b[^\\We]+\\b/i, ...);",
            expectedOutput: "", // No output means success in verify function usually, but we can't easily check console.log side effects in this runner perfectly. Let's assume standard behavior.
            explanation: "Usa clases de caracteres [], cuantificadores + * ? {}, y anclajes como \\b para word boundaries.",
            xpReward: 35
        },
        {
            id: "ex-ch09-quoting",
            type: "code",
            prompt: "Ejercicio: Estilo de Comillas. Reemplaza las comillas simples con dobles, pero ¡mantén las contracciones como 'aren't'!",
            initialCode: "let text = \"'I'm the cook,' he said, 'it's my job.'\";\n\nconsole.log(text.replace(/A/g, \"B\"));\n// → \"I'm the cook,\" he said, \"it's my job.\"",
            solution: "console.log(text.replace(/(^|\\P{L})'|'(\\P{L}|$)/gu, '$1\"$2'));",
            expectedOutput: "\"I'm the cook,\" he said, \"it's my job.\"",
            explanation: "Usa grupos y referencias ($1, $2). Busca comillas que estén al inicio/final O que NO estén rodeadas de letras (\\P{L} es 'no letra' con flag u).",
            xpReward: 35
        },
        {
            id: "ex-ch09-numbers",
            type: "code",
            prompt: "Ejercicio: Números otra vez. Escribe una expresión para validar números JS (enteros, decimales, notación científica con e/E, signos +/-).",
            initialCode: "let number = /^...$/;\n\nfor (let str of [\"1\", \"-1\", \"+15\", \"1.55\", \".5\", \"5.\", \n                 \"1.3e2\", \"1E-4\", \"1e+12\"]) {\n  if (!number.test(str)) {\n    console.log(`Falló al coincidir '${str}'`);\n  }\n}\nfor (let str of [\"1a\", \"+1-\", \"1.2.3\", \"1+1\", \"1e4.5\", \n                 \".5.\", \"1f5\", \".\"]) {\n  if (number.test(str)) {\n    console.log(`Coincidencia incorrecta para '${str}'`);\n  }\n}",
            solution: "let number = /^[+\\-]?(\\d+(\\.\\d*)?|\\.\\d+)([eE][+\\-]?\\d+)?$/;",
            expectedOutput: "",
            explanation: "Descompón el problema: signo opcional, parte entera/decimal (cuidado con .5 o 5.), y exponente opcional.",
            xpReward: 40
        }
    ],
    "ch10-l8": [
        {
            id: "ex-ch10-quiz-modules",
            type: "quiz",
            prompt: "¿Cuál es la principal diferencia entre los módulos CommonJS (CJS) y los módulos ES (ESM)?",
            options: [
                "CJS usa import/export y es asíncrono; ESM usa require/module.exports y es síncrono.",
                "CJS usa require/module.exports y es síncrono; ESM usa import/export y puede ser asíncrono.",
                "No hay diferencia, son solo sintaxis diferentes para lo mismo.",
                "CJS solo funciona en navegadores y ESM solo en Node.js."
            ],
            correctOptionIndex: 1,
            explanation: "CommonJS (usado tradicionalmente en Node.js) es síncrono y usa require. ESM es el estándar oficial, usa import/export y su resolución es estática (permitiendo optimizaciones) y puede soportar carga asíncrona.",
            xpReward: 20
        },
        {
            id: "ex-ch10-build-graph",
            type: "code",
            prompt: "Ejercicio: Robot Modular - Parte 1. Escribe la función `buildGraph` que convierte un array de aristas (arrays de 2 elementos) en un objeto grafo (lista de adyacencia). Las carreteras son bidireccionales.",
            initialCode: "function buildGraph(edges) {\n  let graph = Object.create(null);\n  function addEdge(from, to) {\n    // Tu código aquí\n  }\n  for (let [from, to] of edges) {\n    addEdge(from, to);\n    addEdge(to, from);\n  }\n  return graph;\n}\n\nconst roads = [\n  [\"A\", \"B\"],\n  [\"B\", \"C\"]\n];\nconsole.log(buildGraph(roads));\n// → {A: [\"B\"], B: [\"A\", \"C\"], C: [\"B\"]}",
            solution: "function buildGraph(edges) {\n  let graph = Object.create(null);\n  function addEdge(from, to) {\n    if (graph[from] == null) {\n      graph[from] = [to];\n    } else {\n      graph[from].push(to);\n    }\n  }\n  for (let [from, to] of edges) {\n    addEdge(from, to);\n    addEdge(to, from);\n  }\n  return graph;\n}",
            expectedOutput: "{A: [\"B\"], B: [\"A\", \"C\"], C: [\"B\"]}",
            explanation: "Crea un objeto sin prototipo. Para cada arista, añade el destino a la lista de vecinos del origen, y viceversa.",
            xpReward: 35
        },
        {
            id: "ex-ch10-roads-module",
            type: "code",
            prompt: "Ejercicio: Robot Modular - Parte 2. Usa `buildGraph` para crear `roadGraph` desde el array de carreteras `roads` (formato 'Start-End'). Simula la exportación.",
            initialCode: "const roads = [\n  \"Alice's House-Bob's House\",   \"Alice's House-Cabin\",\n  \"Alice's House-Post Office\",   \"Bob's House-Town Hall\",\n  \"Daria's House-Ernie's House\", \"Daria's House-Town Hall\",\n  \"Ernie's House-Grete's House\", \"Grete's House-Farm\",\n  \"Grete's House-Shop\",          \"Marketplace-Farm\",\n  \"Marketplace-Post Office\",     \"Marketplace-Shop\",\n  \"Marketplace-Town Hall\",       \"Shop-Town Hall\"\n];\n\nfunction buildGraph(edges) {\n  let graph = Object.create(null);\n  function addEdge(from, to) {\n    if (graph[from] == null) graph[from] = [to];\n    else graph[from].push(to);\n  }\n  for (let [from, to] of edges) {\n    addEdge(from, to);\n    addEdge(to, from);\n  }\n  return graph;\n}\n\n// 1. Convierte las cadenas \"A-B\" en arrays [\"A\", \"B\"]\n// 2. Llama a buildGraph con las aristas\nconst roadGraph = ...;\n\nconsole.log(roadGraph[\"Alice's House\"]);",
            solution: "const edges = roads.map(r => r.split(\"-\"));\nconst roadGraph = buildGraph(edges);\nconsole.log(roadGraph[\"Alice's House\"]);",
            expectedOutput: "[\"Bob's House\", \"Cabin\", \"Post Office\"]",
            explanation: "Mapea las cadenas 'A-B' a arrays ['A', 'B'] usando split, luego pasa eso a buildGraph.",
            xpReward: 35
        }
    ],
    "ch11-l1": [
        {
            id: "ex-ch11-quiz-async",
            type: "quiz",
            prompt: "¿Qué pasará si ejecutas un bucle infinito síncrono en JavaScript?",
            options: [
                "Se ejecutará en segundo plano y el resto de la página seguirá funcionando.",
                "Bloqueará el hilo principal, congelando la interfaz y evitando que otros eventos se procesen.",
                "El navegador lo detendrá automáticamente después de 5 segundos.",
                "Creará un nuevo hilo para manejarlo."
            ],
            correctOptionIndex: 1,
            explanation: "JavaScript es 'single-threaded'. Un bucle síncrono bloquea el 'Call Stack', impidiendo que el 'Event Loop' procese clics, renderizado o cualquier otra tarea.",
            xpReward: 20
        }
    ],
    "ch11-l7": [
        {
            id: "ex-ch11-async-loop",
            type: "code",
            prompt: "Ejercicio Práctico: Async Loop. El código intenta imprimir los elementos con una pausa de 1s entre ellos, pero `forEach` no espera a `await`. ¡Arrglalo usando un bucle `for...of`!",
            initialCode: "async function printSlowly(items) {\n  items.forEach(async item => {\n    await new Promise(r => setTimeout(r, 500));\n    console.log(item);\n  });\n  console.log(\"Done!\");\n}\n\nprintSlowly([1, 2, 3]);\n// Salida actual: \"Done!\" inmediato, luego 1, 2, 3 todos a la vez.\n// Objetivo: 1, (espera), 2, (espera), 3, (espera), \"Done!\"",
            solution: "async function printSlowly(items) {\n  for (const item of items) {\n    await new Promise(r => setTimeout(r, 500));\n    console.log(item);\n  }\n  console.log(\"Done!\");\n}",
            expectedOutput: "1\n2\n3\nDone!",
            explanation: "`forEach` lanza las callbacks y no espera a que terminen. Un bucle `for...of` dentro de una función `async` pausará correctamente en cada `await`.",
            xpReward: 35
        },
        {
            id: "ex-ch11-concurrent-fetch",
            type: "code",
            prompt: "Ejercicio Práctico: Fetch Concurrente. Simula pedir datos de 3 usuarios A, B y C. Úsalos con `Promise.all` para obtenerlos todos a la vez.",
            initialCode: "function fakeFetch(user) {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      resolve(`Datos de ${user}`);\n    }, Math.random() * 1000);\n  });\n}\n\nasync function getAllUsers() {\n  // Llama a fakeFetch para 'A', 'B' y 'C' en paralelo.\n  // Espera a todos y devuelve el array de resultados.\n  const results = ...\n  return results;\n}\n\ngetAllUsers().then(console.log);",
            solution: "async function getAllUsers() {\n  const results = await Promise.all([\n    fakeFetch('A'),\n    fakeFetch('B'),\n    fakeFetch('C')\n  ]);\n  return results;\n}",
            expectedOutput: "[\"Datos de A\", \"Datos de B\", \"Datos de C\"]",
            explanation: "Crear el array de promesas [p1, p2, p3] y pasarlo a Promise.all inicia todas en paralelo y espera a que la última termine.",
            xpReward: 35
        }
    ],
    "ch11-l13": [
        {
            id: "ex-ch11-promise-all",
            type: "code",
            prompt: "Ejercicio: Construye Promise.all. Escribe una función `Promise_all` que tenga el mismo comportamiento que `Promise.all`.",
            initialCode: "function Promise_all(promises) {\n  return new Promise((resolve, reject) => {\n    // Tu código aquí\n  });\n}\n\n// Test:\nPromise_all([]).then(array => {\n  console.log(\"Esto debería ser []:\", array);\n});\nfunction soon(val) {\n  return new Promise(resolve => {\n    setTimeout(() => resolve(val), Math.random() * 500);\n  });\n}\nPromise_all([soon(1), soon(2), soon(3)]).then(array => {\n  console.log(\"Esto debería ser [1, 2, 3]:\", array);\n});\nPromise_all([soon(1), Promise.reject(\"X\"), soon(3)])\n  .then(array => {\n    console.log(\"No deberíamos llegar aquí\");\n  })\n  .catch(error => {\n    if (error != \"X\") {\n      console.log(\"Fallo inesperado:\", error);\n    }\n  });",
            solution: "function Promise_all(promises) {\n  return new Promise((resolve, reject) => {\n    let results = [];\n    let pending = promises.length;\n    if (pending == 0) return resolve(results);\n    for (let i = 0; i < promises.length; i++) {\n      Promise.resolve(promises[i]).then(res => {\n        results[i] = res;\n        pending--;\n        if (pending == 0) resolve(results);\n      }).catch(reject);\n    }\n  });\n}",
            expectedOutput: "Esto debería ser []: []\nEsto debería ser [1, 2, 3]: [1, 2, 3]",
            explanation: "Necesitas llevar la cuenta de cuántas promesas faltan. Si una falla, `reject` inmediatamente. Si tiene éxito, guárdalo en el índice correcto y decrementa el contador.",
            xpReward: 50
        },
        {
            id: "ex-ch11-scalpel",
            type: "code",
            prompt: "Ejercicio: Tracking the Scalpel. El bisturí del pueblo ha sido robado. Encuéntralo buscando en el almacenamiento de los nidos. `anyStorage(nest, source, name)` devuelve un valor del almacenamiento. Si el valor es una ubicación (string), el bisturí está allí. Si es el bisturí mismo, ¡lo encontraste!",
            initialCode: "// Mocks para el ejercicio\nconst nests = {\n  \"Big Oak\": { scalpel: \"Gilles' Garden\" },\n  \"Gilles' Garden\": { scalpel: \"Woods\" },\n  \"Woods\": { scalpel: \"Chateau\" },\n  \"Chateau\": { scalpel: \"Big Oak\" } // Cycle for testing risk, but target is actually reachable if logic is right\n};\n// Corrección: definamos una ubicación final\nnests[\"Woods\"] = { scalpel: \"Scalpel\" };\n\nfunction anyStorage(nest, source, name) {\n  return new Promise(resolve => {\n    setTimeout(() => {\n       if (nests[nest] && nests[nest][name]) resolve(nests[nest][name]);\n       else resolve(null);\n    }, 20);\n  });\n}\n\nasync function locateScalpel(nest) {\n  // Tu código aquí. \n  // Bucle while o recursión: si el valor == \"Scalpel\", devuélvelo.\n  // Si es otro nido, busca allí.\n  let current = nest;\n  for (;;) {\n    // ...\n  }\n}\n\nlocateScalpel(\"Big Oak\").then(console.log);",
            solution: "async function locateScalpel(nest) {\n  let current = nest;\n  for (;;) {\n    let next = await anyStorage(current, current, \"scalpel\");\n    if (next == \"Scalpel\") return current;\n    current = next;\n  }\n}",
            expectedOutput: "Woods",
            explanation: "Sigue las pistas. Como es async, necesitas `await` en cada paso del bucle para obtener la siguiente ubicación antes de continuar.",
            xpReward: 45
        }
    ],
    "ch12-l8": [
        {
            id: "ex-ch12-arrays",
            type: "code",
            prompt: "Ejercicio: Arrays en Egg. Agrega soporte para arrays a `topScope`. Define `array(...)` para crear uno, `length(arr)` para su longitud, y `element(arr, n)` para acceder al índice n.",
            initialCode: "const topScope = Object.create(null);\n\n// 1. array(...values) -> crea un array con los argumentos\ntopScope.array = (...values) => {\n  // ...\n};\n\n// 2. length(array) -> devuelve la longitud\ntopScope.length = (array) => {\n  // ...\n};\n\n// 3. element(array, n) -> devuelve array[n]\ntopScope.element = (array, n) => {\n  // ...\n};\n\n// Simulación de uso:\nconst myArray = topScope.array(1, 2, 3);\nconsole.log(topScope.length(myArray)); // Debería ser 3\nconsole.log(topScope.element(myArray, 1)); // Debería ser 2",
            solution: "topScope.array = (...values) => values;\ntopScope.length = array => array.length;\ntopScope.element = (array, n) => array[n];",
            expectedOutput: "3\n2",
            explanation: "En Egg, las funciones del 'topScope' son solo funciones de JavaScript. Podemos usar arrays de JS y sus métodos directamente.",
            xpReward: 35
        },
        {
            id: "ex-ch12-closure-quiz",
            type: "quiz",
            prompt: "¿Cómo maneja Egg (y JavaScript) el 'closure' o clausura?",
            options: [
                "Copiando todas las variables locales al nuevo ámbito de la función.",
                "Manteniendo una referencia al ámbito donde se creó la función, permitiendo acceso a sus variables.",
                "No lo maneja; las variables locales se pierden cuando la función retorna.",
                "Guardando el estado en un archivo global temporal."
            ],
            correctOptionIndex: 1,
            explanation: "Las funciones recuerdan el ámbito en el que fueron creadas (su 'entorno léxico'). Cuando se ejecutan, pueden acceder a variables de ese ámbito original.",
            xpReward: 20
        },
        {
            id: "ex-ch12-comments",
            type: "code",
            prompt: "Ejercicio: Comentarios. Modifica `skipSpace` para ignorar comentarios que empiezan con `#` hasta el final de la línea. Usa regex.",
            initialCode: "function skipSpace(string) {\n  // Actual: solo salta espacios en blanco\n  let first = string.search(/\\S/);\n  if (first == -1) return \"\";\n  return string.slice(first);\n}\n\nconsole.log(skipSpace(\"   # comentario\\n  x\"));\n// Actual: \"# comentario\\n  x\"\n// Objetivo: \"x\"",
            solution: "function skipSpace(string) {\n  let skippable = string.match(/^(\\s|#.*)*/);\n  return string.slice(skippable[0].length);\n}",
            expectedOutput: "x",
            explanation: "La regex `^(\\s|#.*)*` coincide con cualquier secuencia de espacios O comentarios (desde # hasta el final de la línea/string) al inicio.",
            xpReward: 40
        },
        {
            id: "ex-ch12-scope-set",
            type: "code",
            prompt: "Ejercicio: Fixing Scope. Implementa `set` para actualizar una variable en un ámbito superior. Si la variable no existe en ningún ámbito, lanza un ReferenceError.",
            initialCode: "const specialForms = Object.create(null);\n\nspecialForms.set = (args, scope) => {\n  if (args.length != 2 || args[0].type != \"word\") {\n    throw new SyntaxError(\"Uso incorrecto de set\");\n  }\n  const varName = args[0].name;\n  const value = evaluate(args[1], scope); // Asumimos que evaluate existe\n\n  // Tu tarea: buscar el scope que tiene la variable y actualizarla.\n  // Itera hacia arriba usando Object.getPrototypeOf(scope)\n  for (let s = scope; s; s = Object.getPrototypeOf(s)) {\n    // ...\n  }\n  throw new ReferenceError(`Binding no definido: ${varName}`);\n};",
            solution: "specialForms.set = (args, scope) => {\n  /* Checks omitidos por brevedad */\n  const varName = args[0].name;\n  const value = evaluate(args[1], scope);\n\n  for (let s = scope; s; s = Object.getPrototypeOf(s)) {\n    if (Object.prototype.hasOwnProperty.call(s, varName)) {\n      s[varName] = value;\n      return value;\n    }\n  }\n  throw new ReferenceError(`Binding no definido: ${varName}`);\n};",
            expectedOutput: "",
            explanation: "Debes recorrer la cadena de prototipos (scopes) hasta encontrar dónde está definida la variable. Si llegas al final (null) sin encontrarla, error.",
            xpReward: 50
        }
    ],
    "ch13-l1": [
        {
            id: "ex-ch13-quiz-internet",
            type: "quiz",
            prompt: "¿Cuál es la función principal del protocolo TCP en la comunicación por Internet?",
            options: [
                "Asignar nombres de dominio a direcciones IP.",
                "Garantizar que los datos lleguen de manera fiable y en el orden correcto.",
                "Formatear el texto y las imágenes para que se vean bien en el navegador.",
                "Encriptar los datos para que nadie pueda leerlos."
            ],
            correctOptionIndex: 1,
            explanation: "TCP (Transmission Control Protocol) se encarga de dividir los datos en paquetes, enviarlos y asegurar que lleguen todos y se reensamblen en el orden original, retransmitiendo los que se pierdan.",
            xpReward: 20
        }
    ],
    "ch13-l2": [
        {
            id: "ex-ch13-url-parser",
            type: "code",
            prompt: "Ejercicio: URL Parser. Escribe una función `parseURL` que tome una string URL y devuelva un objeto con `protocol`, `domain` y `path`. No uses la clase `URL` nativa, usa regex o string manipulation.",
            initialCode: "function parseURL(url) {\n  // Tu código aquí\n  // Ejemplo: \"https://www.example.com/foo/bar\"\n  // -> { protocol: \"https\", domain: \"www.example.com\", path: \"/foo/bar\" }\n  return { protocol: \"\", domain: \"\", path: \"\" };\n}\n\nconsole.log(parseURL(\"http://eloquentjavascript.net/13_browser.html\"));",
            solution: "function parseURL(url) {\n  const match = url.match(/^([a-z]+):\\/\\/([^/]+)(.*)$/);\n  if (!match) return null;\n  return { protocol: match[1], domain: match[2], path: match[3] };\n}",
            expectedOutput: "{ protocol: \"http\", domain: \"eloquentjavascript.net\", path: \"/13_browser.html\" }",
            explanation: "Una regex como `^([a-z]+):\\/\\/([^/]+)(.*)$` captura el protocolo (antes de ://), el dominio (hasta el siguiente /) y el resto como path.",
            xpReward: 35
        }
    ],
    "ch13-l3": [
        {
            id: "ex-ch13-quiz-html",
            type: "quiz",
            prompt: "¿Qué significa que un elemento HTML sea 'de bloque' (block) vs 'en línea' (inline)?",
            options: [
                "Los elementos de bloque siempre son más grandes que los de línea.",
                "Los elementos de bloque comienzan en una nueva línea y ocupan todo el ancho disponible; los de línea fluyen con el texto.",
                "Los elementos en línea no pueden tener atributos.",
                "No hay diferencia, es solo una cuestión de preferencia del programador."
            ],
            correctOptionIndex: 1,
            explanation: "Elementos como `div`, `p`, `h1` son de bloque y estructuran el layout verticalmente. Elementos como `span`, `a`, `strong` son en línea y se usan dentro de bloques de texto.",
            xpReward: 20
        },
        {
            id: "ex-ch13-html-builder",
            type: "code",
            prompt: "Ejercicio: HTML Builder. Escribe una función `renderHTML` que tome un objeto `{tag, attrs, children}` y devuelva una string HTML válida. `children` puede ser un array de objetos o strings.",
            initialCode: "function renderHTML(node) {\n  if (typeof node === 'string') {\n    // Escapar caracteres especiales si fuera necesario, por ahora devuelve el string\n    return node;\n  }\n  // 1. Construir atributos (ej: name=\"val\")\n  // 2. Renderizar hijos recursivamente\n  // 3. Devolver <tag attrs>hijos</tag>\n  return \"\";\n}\n\nconst data = {\n  tag: \"div\",\n  attrs: { class: \"box\" },\n  children: [\n    { tag: \"h1\", attrs: {}, children: [\"Hello\"] },\n    \"World\"\n  ]\n};\nconsole.log(renderHTML(data));",
            solution: "function renderHTML(node) {\n  if (typeof node === 'string') return node;\n  const attrs = Object.entries(node.attrs || {})\n    .map(([k, v]) => ` ${k}=\"${v}\"`).join(\"\");\n  const children = (node.children || []).map(renderHTML).join(\"\");\n  return `<${node.tag}${attrs}>${children}</${node.tag}>`;\n}",
            expectedOutput: "<div class=\"box\"><h1>Hello</h1>World</div>",
            explanation: "Es una función recursiva clásica. Si es string, devuélvelo. Si es objeto, abre etiqueta, procesa atributos, procesa hijos (llamándose a sí misma) y cierra etiqueta.",
            xpReward: 45
        }
    ],
    "ch14-l15": [
        {
            id: "ex-ch14-quiz-dom",
            type: "quiz",
            prompt: "¿Cuál es la diferencia entre `nodeType` 1 (Element) y `nodeType` 3 (Text)?",
            options: [
                "Los elementos son etiquetas HTML (como <div>) que pueden tener hijos; los nodos de texto contienen el contenido string real y son hojas del árbol.",
                "Los elementos son invisibles; los nodos de texto son los únicos que se ven.",
                "Son lo mismo, solo diferente nombre por razones históricas.",
                "Los nodos de texto pueden tener atributos, los elementos no."
            ],
            correctOptionIndex: 0,
            explanation: "El árbol DOM se compone principalmente de Elementos (estructura) y Texto (contenido). Los elementos pueden contener otros elementos o texto.",
            xpReward: 20
        },
        {
            id: "ex-ch14-build-table",
            type: "code",
            prompt: "Ejercicio: Build a Table. Escribe `buildTable(data)` que genere una tabla HTML (string) a partir de un array de objetos. Usa las llaves del primer objeto como cabeceras (<th>).",
            initialCode: "const MOUNTAINS = [\n  {name: \"Kilimanjaro\", height: 5895, place: \"Tanzania\"},\n  {name: \"Everest\", height: 8848, place: \"Nepal\"}\n];\n\nfunction buildTable(data) {\n  // 1. Obtén las keys del primer objeto para el <thead>\n  // 2. Itera sobre data para crear las filas <tbody>\n  // 3. Retorna el string HTML completo <table>...</table>\n  return \"<table></table>\";\n}\n\nconsole.log(buildTable(MOUNTAINS));",
            solution: "function buildTable(data) {\n  let html = \"<table><thead><tr>\";\n  let fields = Object.keys(data[0]);\n  for (let field of fields) html += `<th>${field}</th>`;\n  html += \"</tr></thead><tbody>\";\n  for (let object of data) {\n    html += \"<tr>\";\n    for (let field of fields) {\n      html += `<td>${object[field]}</td>`;\n    }\n    html += \"</tr>\";\n  }\n  return html + \"</tbody></table>\";\n}",
            expectedOutput: "<table><thead><tr><th>name</th><th>height</th><th>place</th></tr></thead><tbody><tr><td>Kilimanjaro</td><td>5895</td><td>Tanzania</td></tr><tr><td>Everest</td><td>8848</td><td>Nepal</td></tr></tbody></table>",
            explanation: "Itera sobre las claves para crear los encabezados, luego sobre cada objeto para crear las filas. Concatenar strings es una forma válida de generar HTML simple.",
            xpReward: 45
        },
        {
            id: "ex-ch14-by-tag-name",
            type: "code",
            prompt: "Ejercicio: Elements by Tag Name. Implementa `byTagName(node, tagName)` que busque recursivamente todos los elementos con ese tagName. No uses `getElementsByTagName` ni `querySelectorAll`.",
            initialCode: "function byTagName(node, tagName) {\n  let found = [];\n  tagName = tagName.toUpperCase();\n\n  function explore(n) {\n    // Si n es un elemento y su nodeName coincide, agrégalo a found\n    // Luego recorre sus hijos (n.childNodes) y llama a explore recursivamente\n  }\n\n  explore(node);\n  return found;\n}\n\n// Mock del DOM para pruebas locales\nconst mockDom = { \n  nodeName: \"DIV\", nodeType: 1, \n  childNodes: [\n    { nodeName: \"H1\", nodeType: 1, childNodes: [] },\n    { nodeName: \"P\", nodeType: 1, childNodes: [\n       { nodeName: \"SPAN\", nodeType: 1, childNodes: [] }\n    ]}\n  ]\n};\nconsole.log(byTagName(mockDom, \"span\").length);",
            solution: "function byTagName(node, tagName) {\n  let found = [];\n  tagName = tagName.toUpperCase();\n  function explore(n) {\n    for (let i = 0; i < n.childNodes.length; i++) {\n      let child = n.childNodes[i];\n      if (child.nodeType == 1 && child.nodeName == tagName) found.push(child);\n      if (child.nodeType == 1) explore(child);\n    }\n  }\n  explore(node);\n  return found;\n}",
            expectedOutput: "1",
            explanation: "Recorre recursivamente los hijos. Si un hijo es un elemento (nodeType 1) y coincide con el tag, guárdalo. Siempre explora sus hijos.",
            xpReward: 50
        },
        {
            id: "ex-ch14-cat-animation",
            type: "code",
            prompt: "Ejercicio: Cat's Hat. Calcula la posición (top, left) para un objeto que orbita en una elipse. Usa `angle` (radianes), `Math.sin`, `Math.cos`. Radio X = 200, Radio Y = 50.",
            initialCode: "function getPosition(angle) {\n  // angle está en radianes\n  // top = sen(angle) * radioY\n  // left = cos(angle) * radioX\n  return { top: 0, left: 0 };\n}\n\n// Prueba con angle = Math.PI (media vuelta)\n// sin(PI) = 0, cos(PI) = -1\nconsole.log(getPosition(Math.PI));",
            solution: "function getPosition(angle) {\n  return {\n    top: Math.sin(angle) * 50,\n    left: Math.cos(angle) * 200\n  };\n}",
            expectedOutput: "{ top: 0, left: -200 }", // Math.sin(PI) is effectively 0 (approx)
            explanation: "Math.sin da la oscilación vertical y Math.cos la horizontal. Multiplicando por diferentes radios se crea una elipse.",
            xpReward: 35
        }
    ],
    "ch15-l15": [
        {
            id: "ex-ch15-quiz-events",
            type: "quiz",
            prompt: "¿Qué método se usa para evitar que un evento se propague a los elementos padres?",
            options: [
                "event.preventDefault()",
                "event.stopPropagation()",
                "event.halt()",
                "return false"
            ],
            correctOptionIndex: 1,
            explanation: "`stopPropagation` evita que el evento burbujee hacia arriba. `preventDefault` evita la acción por defecto del navegador (como seguir un enlace).",
            xpReward: 20
        },
        {
            id: "ex-ch15-balloon",
            type: "code",
            prompt: "Ejercicio: Balloon. Escribe un handler para 'keydown'. Si es 'ArrowUp', incrementa el tamaño de la fuente. Si es 'ArrowDown', redúcelo. El tamaño base es 20px. Retorna el nuevo tamaño (número).",
            initialCode: "let currentSize = 20;\n\nfunction handleArrow(key) {\n  // key será \"ArrowUp\" o \"ArrowDown\"\n  // Actualiza currentSize (aumenta/disminuye en 10%)\n  // Retorna currentSize\n  return currentSize;\n}",
            solution: "let currentSize = 20;\nfunction handleArrow(key) {\n  if (key == \"ArrowUp\") {\n    currentSize *= 1.1;\n  } else if (key == \"ArrowDown\") {\n    currentSize *= 0.9;\n  }\n  return currentSize;\n}",
            expectedOutput: "22", // Aprox check simulation
            explanation: "Multiplicar por 1.1 aumenta un 10%, por 0.9 reduce un 10%.",
            xpReward: 35
        },
        {
            id: "ex-ch15-tabs",
            type: "code",
            prompt: "Ejercicio: Tabs. Escribe una función `selectTab(tabs, selectedIndex)` que reciba un array de objetos tab `{ header, panel }` (elementos DOM simulados) y muestre solo el panel seleccionado (style.display = 'block') y oculte los otros ('none').",
            initialCode: "function selectTab(tabs, selectedIndex) {\n  // tabs es array de { panel: { style: { display: '' } } }\n  // Recorre tabs. Si índice coincide, display block, sino none.\n}",
            solution: "function selectTab(tabs, selectedIndex) {\n  tabs.forEach((tab, i) => {\n    if (i == selectedIndex) {\n      tab.panel.style.display = \"block\";\n    } else {\n      tab.panel.style.display = \"none\";\n    }\n  });\n}",
            expectedOutput: "",
            explanation: "Iteramos todos los tabs y actualizamos su display basándonos en si su índice coincide con el seleccionado.",
            xpReward: 45
        }
    ],
    "ch16-l11": [
        {
            id: "ex-ch16-quiz-game",
            type: "quiz",
            prompt: "¿Cuál es el propósito principal de dividir el tiempo en pequeños pasos (dt) en el bucle del juego?",
            options: [
                "Para que el juego se ejecute más lento y sea más fácil.",
                "Para asegurar que el movimiento y la física sean consistentes independientemente de la velocidad de fotogramas (FPS) del ordenador.",
                "Para ahorrar batería en dispositivos móviles.",
                "Para permitir que el navegador renderice gráficos en 3D."
            ],
            correctOptionIndex: 1,
            explanation: "Usar un `dt` (delta time) permite calcular el movimiento en 'unidades por segundo' en lugar de 'unidades por frame', haciendo que la velocidad del juego sea independiente del hardware.",
            xpReward: 20
        },
        {
            id: "ex-ch16-level-parser",
            type: "code",
            prompt: "Ejercicio: Level Parser. Convierte un plan de nivel (string) en un array de arrays de caracteres. Usa .trim().split(\"\\n\") y mapea cada línea a [...line].",
            initialCode: "const plan = `\n.x.\n.o.\n...`;\n\nfunction parseLevel(plan) {\n  // 1. Trim el plan para quitar espacios iniciales/finales\n  // 2. Split por nueva línea\n  // 3. Map cada línea para convertirla en array de caracteres (spread syntax)\n  return [];\n}\n\nconsole.log(parseLevel(plan));",
            solution: "function parseLevel(plan) {\n  return plan.trim().split(\"\\n\").map(l => [...l]);\n}",
            expectedOutput: "[[\".\", \"x\", \".\"], [\".\", \"o\", \".\"], [\".\", \".\", \".\"]]",
            explanation: "trim() limpia el string, split separa las filas, y [...str] convierte cada fila en caracteres individuales.",
            xpReward: 35
        },
        {
            id: "ex-ch16-collision",
            type: "code",
            prompt: "Ejercicio: AABB Collision. Escribe una función `overlap(a, b)` que tome dos actores (con `pos` {x,y} y `size` {x,y}) y devuelva true si se superponen.",
            initialCode: "function overlap(actor1, actor2) {\n  // Devuelve true si los rectángulos se tocan o superponen\n  // Un rectángulo se define por pos (top-left) y size (width-height)\n  return false;\n}\n\nconst a1 = { pos: {x:0, y:0}, size: {x:1, y:1} };\nconst a2 = { pos: {x:0.5, y:0.5}, size: {x:1, y:1} };\nconsole.log(overlap(a1, a2));",
            solution: "function overlap(actor1, actor2) {\n  return actor1.pos.x + actor1.size.x > actor2.pos.x &&\n         actor1.pos.x < actor2.pos.x + actor2.size.x &&\n         actor1.pos.y + actor1.size.y > actor2.pos.y &&\n         actor1.pos.y < actor2.pos.y + actor2.size.y;\n}",
            expectedOutput: "true",
            explanation: "Es la lógica estándar AABB: comprueba si los rangos X se superponen Y los rangos Y se superponen.",
            xpReward: 45
        },
        {
            id: "ex-ch16-monster",
            type: "code",
            prompt: "Ejercicio: Monster Update. Implementa `update(time, state)` para un monstruo que se mueve horizontalmente a `speed`. Si toca una pared (state.level.touches), invierte su velocidad (multiplica por -1).",
            initialCode: "class Monster {\n  constructor(pos, speed) {\n    this.pos = pos;\n    this.speed = speed;\n    this.size = {x: 1, y: 1};\n  }\n\n  update(time, state) {\n    // 1. Calcula nueva posición: this.pos.x + this.speed * time\n    // 2. Crea un nuevo Monster con esa posición (no mutes this!)\n    // 3. Verifica colisión con state.level.touches(newPos, this.size, \"wall\")\n    // 4. Si choca, devuelve nuevo Monster con velocidad invertida (y misma posición antigua)\n    // 5. Si no, devuelve el nuevo Monster movido\n    return new Monster(this.pos, this.speed);\n  }\n}",
            solution: "class Monster {\n  constructor(pos, speed) {\n    this.pos = pos; this.speed = speed; this.size = {x:1, y:1};\n  }\n  update(time, state) {\n    let newPos = {x: this.pos.x + this.speed * time, y: this.pos.y};\n    if (!state.level.touches(newPos, this.size, \"wall\")) {\n      return new Monster(newPos, this.speed);\n    } else {\n      return new Monster(this.pos, -this.speed);\n    }\n  }\n}",
            expectedOutput: "", // Hard to verify without mocking context, but structure is key
            explanation: "El método update debe ser puro: devuelve una nueva instancia. Si choca, invierte velocidad; si no, se mueve.",
            xpReward: 50
        }
    ],
    "ch17-l14": [
        {
            id: "ex-ch17-quiz-canvas",
            type: "quiz",
            prompt: "¿Qué método debe llamarse antes de comenzar a dibujar un nuevo camino (path) para asegurar que no se conecte con el anterior?",
            options: [
                "ctx.newPath()",
                "ctx.beginPath()",
                "ctx.clearPath()",
                "ctx.reset()"
            ],
            correctOptionIndex: 1,
            explanation: "`beginPath()` vacía la lista de sub-caminos para que las nuevas operaciones de dibujo no se agreguen al camino anterior.",
            xpReward: 20
        },
        {
            id: "ex-ch17-star-points",
            type: "code",
            prompt: "Ejercicio: Star Points. Calcula las coordenadas (x, y) de las puntas de una estrella. Completa la función `getStarPoints(center, radius, count)` para devolver un array de objetos `{x, y}`.",
            initialCode: "function getStarPoints(center, radius, count) {\n  let points = [];\n  for (let i = 0; i < count; i++) {\n    // Ángulo: i * (2 * Math.PI) / count\n    // x = center.x + radius * Math.cos(angle)\n    // y = center.y + radius * Math.sin(angle)\n    // Añade {x, y} a points\n  }\n  return points;\n}",
            solution: "function getStarPoints(center, radius, count) {\n  let points = [];\n  for (let i = 0; i < count; i++) {\n    let angle = i * (2 * Math.PI) / count;\n    points.push({\n      x: center.x + radius * Math.cos(angle),\n      y: center.y + radius * Math.sin(angle)\n    });\n  }\n  return points;\n}",
            expectedOutput: "", // Difficult to verify exact floats without tolerance, validation logic will handle it
            explanation: "Usamos trigonometría (cos, sin) para convertir coordenadas polares (ángulo, radio) a cartesianas (x, y).",
            xpReward: 35
        },
        {
            id: "ex-ch17-label-position",
            type: "code",
            prompt: "Ejercicio: Label Physics. Para un gráfico de pastel, o 'Pie Chart', necesitamos posicionar etiquetas. Dado un `angle` y un `radius`, calcula la posición del texto. Si el ángulo está en el lado izquierdo del círculo (cos < 0), ajusta el `textAlign` a \"right\", si no a \"left\".",
            initialCode: "function getLabelConfig(center, angle, radius) {\n  // 1. Calcula x, y usando cos/sin\n  // 2. Determina align: si Math.cos(angle) < 0 entonces \"right\", else \"left\"\n  // Retorna { x, y, align }\n  return { x: 0, y: 0, align: \"left\" };\n}",
            solution: "function getLabelConfig(center, angle, radius) {\n  let x = center.x + radius * Math.cos(angle);\n  let y = center.y + radius * Math.sin(angle);\n  let align = Math.cos(angle) < 0 ? \"right\" : \"left\";\n  return { x, y, align };\n}",
            expectedOutput: "", // Logic check
            explanation: "El coseno nos dice la posición horizontal relativa al centro. Si es negativo, estamos a la izquierda.",
            xpReward: 45
        },
        {
            id: "ex-ch17-bouncing-ball",
            type: "code",
            prompt: "Ejercicio: Bouncing Ball. Modifica la función `updateBall(ball, box)` para actualizar la posición de la bola (`pos` += `speed`). Si choca con una pared de la caja (`box.w`, `box.h`), invierte la velocidad correspondiente.",
            initialCode: "function updateBall(ball, box) {\n  // ball tiene { pos: {x,y}, speed: {x,y}, radius }\n  // box tiene { w, h }\n  // 1. Actualiza pos.x y pos.y con speed\n  // 2. Si pos.x < radius o pos.x > box.w - radius, invierte speed.x\n  // 3. Lo mismo para y\n  return ball;\n}",
            solution: "function updateBall(ball, box) {\n  ball.pos.x += ball.speed.x;\n  ball.pos.y += ball.speed.y;\n  if (ball.pos.x < ball.radius || ball.pos.x > box.w - ball.radius) ball.speed.x *= -1;\n  if (ball.pos.y < ball.radius || ball.pos.y > box.h - ball.radius) ball.speed.y *= -1;\n  return ball;\n}",
            expectedOutput: "",
            explanation: "Actualizamos la posición y luego comprobamos si los límites de la bola han cruzado los límites de la caja.",
            xpReward: 55
        }
    ],
    "ch18-l17": [
        {
            id: "ex-ch18-quiz-http",
            type: "quiz",
            prompt: "¿Qué código de estado HTTP indica que el recurso solicitado no fue encontrado?",
            options: [
                "200 OK",
                "301 Moved Permanently",
                "404 Not Found",
                "500 Internal Server Error"
            ],
            correctOptionIndex: 2,
            explanation: "El código 404 es el estándar para indicar que el servidor no puede encontrar lo que se le pidió.",
            xpReward: 20
        },
        {
            id: "ex-ch18-content-negotiation",
            type: "code",
            prompt: "Ejercicio: Content Negotiation. Completa la función `getRequestOptions(mediaType)` para devolver un objeto de opciones para `fetch` que incluya el header `Accept` con el `mediaType` dado.",
            initialCode: "function getRequestOptions(mediaType) {\n  // Retorna un objeto con la propiedad headers\n  // headers debe tener \"Accept\": mediaType\n  return {};\n}",
            solution: "function getRequestOptions(mediaType) {\n  return {\n    headers: { \"Accept\": mediaType }\n  };\n}",
            expectedOutput: "{\"headers\":{\"Accept\":\"text/plain\"}}", // Mock check
            explanation: "El header 'Accept' se usa para decirle al servidor qué tipo de contenido preferimos recibir.",
            xpReward: 35
        },
        {
            id: "ex-ch18-workbench",
            type: "code",
            prompt: "Ejercicio: JS Workbench. Crea una función `runCode(code)` que use `new Function(code)` para ejecutar el string dado y devuelva su resultado. Si falla, captura el error y devuelve \"Error: \" + error.message.",
            initialCode: "function runCode(code) {\n  // 1. Usa try/catch\n  // 2. new Function(code)()\n  // 3. Retorna el resultado o el mensaje de error\n}",
            solution: "function runCode(code) {\n  try {\n    return new Function(code)();\n  } catch (e) {\n    return \"Error: \" + e.message;\n  }\n}",
            expectedOutput: "10", // Test with "return 5+5;"
            explanation: "`new Function(code)` crea una función desde un string. Ejecutarla puede lanzar errores, así que usamos try/catch.",
            xpReward: 45
        },
        {
            id: "ex-ch18-game-of-life",
            type: "code",
            prompt: "Ejercicio: Game of Life. Implementa `nextGen(grid, width, height)` que toma un array plano de booleanos y devuelve un nuevo array con el siguiente estado. Reglas: <2 vecinos muere, 2-3 vive, >3 muere. Muerta con 3 vive.",
            initialCode: "function nextGen(grid, width, height) {\n  // Helper para obtener (x,y) -> grid[y * width + x]\n  // Cuenta vecinos vivos (cuidado con bordes)\n  // Aplica reglas\n  // Retorna nuevo grid\n  return [];\n}",
            solution: "function nextGen(grid, width, height) {\n  const newGrid = new Array(width * height).fill(false);\n  for (let y = 0; y < height; y++) {\n    for (let x = 0; x < width; x++) {\n      let neighbors = 0;\n      for (let dy = -1; dy <= 1; dy++) {\n        for (let dx = -1; dx <= 1; dx++) {\n          if (dx === 0 && dy === 0) continue;\n          const nx = x + dx, ny = y + dy;\n          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {\n             if (grid[ny * width + nx]) neighbors++;\n          }\n        }\n      }\n      const alive = grid[y * width + x];\n      if (alive) newGrid[y * width + x] = (neighbors === 2 || neighbors === 3);\n      else newGrid[y * width + x] = (neighbors === 3);\n    }\n  }\n  return newGrid;\n}",
            expectedOutput: "", // Complex state check
            explanation: "Recorremos cada celda, contamos sus 8 vecinos, y aplicamos las reglas de Conway para decidir su estado en la nueva generación.",
            xpReward: 55
        }
    ],
    "ch19-l10": [
        {
            id: "ex-ch19-quiz-components",
            type: "quiz",
            prompt: "En la arquitectura de la aplicación de Pixel Art, ¿cómo fluyen los datos?",
            options: [
                "Los componentes modifican el DOM directamente y leen el estado del DOM.",
                "El estado es la única fuente de verdad; las acciones actualizan el estado, y el nuevo estado se pasa a los componentes para que actualicen su vista.",
                "Cada componente mantiene su propio estado y notifica a otros componentes cuando cambia.",
                "El servidor mantiene el estado y el cliente solo muestra lo que recibe."
            ],
            correctOptionIndex: 1,
            explanation: "La aplicación sigue un flujo unidireccional: Estado -> Componentes -> DOM. Las acciones del usuario generan nuevas acciones que reducen a un nuevo estado.",
            xpReward: 20
        },
        {
            id: "ex-ch19-shortcuts",
            type: "code",
            prompt: "Ejercicio: Keyboard Shortcuts. Implementa `handleKey(key, dispatch)` que despache acciones según la tecla. 'z' (con ctrl) -> {undo: true}, 'd' -> {tool: 'draw'}, 'f' -> {tool: 'fill'}.",
            initialCode: "function handleKey(event, dispatch) {\n  // event tiene key, ctrlKey, metaKey\n  // Si ctrl+z (o meta+z), dispatch({undo: true})\n  // Si key es 'd', dispatch({tool: 'draw'})\n  // Si key es 'f', dispatch({tool: 'fill'})\n}",
            solution: "function handleKey(event, dispatch) {\n  if ((event.ctrlKey || event.metaKey) && event.key === 'z') {\n    dispatch({undo: true});\n  } else if (!event.ctrlKey && !event.metaKey) {\n    if (event.key === 'd') dispatch({tool: 'draw'});\n    if (event.key === 'f') dispatch({tool: 'fill'});\n  }\n}",
            expectedOutput: "", // Mock event dispatch check
            explanation: "Verificamos las teclas modificadoras (Ctrl/Meta) para atajos como Deshacer, y teclas simples para herramientas.",
            xpReward: 35
        },
        {
            id: "ex-ch19-circle",
            type: "code",
            prompt: "Ejercicio: Circle Tool. Implementa `getCirclePixels(center, radius)` que devuelva un array de puntos {x, y} que estén dentro del círculo (distancia <= radius).",
            initialCode: "function getCirclePixels(center, radius) {\n  let pixels = [];\n  // Itera x desde center.x - radius hasta center.x + radius\n  // Itera y desde center.y - radius hasta center.y + radius\n  // Si distancia (pitágoras) <= radius, añade {x,y} a pixels\n  return pixels;\n}",
            solution: "function getCirclePixels(center, radius) {\n  let pixels = [];\n  for (let y = center.y - radius; y <= center.y + radius; y++) {\n    for (let x = center.x - radius; x <= center.x + radius; x++) {\n      let dx = x - center.x, dy = y - center.y;\n      if (dx*dx + dy*dy <= radius*radius) {\n        pixels.push({x, y});\n      }\n    }\n  }\n  return pixels;\n}",
            expectedOutput: "", // Geometric check
            explanation: "Escaneamos el cuadro delimitador del círculo y seleccionamos los píxeles cuya distancia al centro es menor o igual al radio.",
            xpReward: 45
        },
        {
            id: "ex-ch19-lines",
            type: "code",
            prompt: "Ejercicio: Proper Lines. Implementa una función simplificada de Bresenham `getLinePixels(p1, p2)` que devuelva los píxeles de una línea recta entre p1 y p2 (ambos {x,y}).",
            initialCode: "function getLinePixels(p1, p2) {\n  // Implementa un algoritmo de línea (como Bresenham o pasos simples)\n  // Retorna array de {x, y}\n  return [p1, p2];\n}",
            solution: "function getLinePixels(p1, p2) {\n  let pixels = [];\n  let dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y);\n  let sx = (p1.x < p2.x) ? 1 : -1, sy = (p1.y < p2.y) ? 1 : -1;\n  let err = dx - dy;\n  let x = p1.x, y = p1.y;\n  while (true) {\n    pixels.push({x, y});\n    if (x === p2.x && y === p2.y) break;\n    let e2 = 2 * err;\n    if (e2 > -dy) { err -= dy; x += sx; }\n    if (e2 < dx) { err += dx; y += sy; }\n  }\n  return pixels;\n}",
            expectedOutput: "", // Point sequence check
            explanation: "El algoritmo de Bresenham selecciona eficientemente los píxeles que mejor aproximan una línea recta entre dos puntos.",
            xpReward: 55
        }
    ],
    "ch20-l10": [
        {
            id: "ex-ch20-quiz-node",
            type: "quiz",
            prompt: "¿Cuál de las siguientes afirmaciones es CORRECTA sobre Node.js?",
            options: [
                "Node.js utiliza múltiples hilos (threads) para procesar cada solicitud HTTP, lo que lo hace rápido.",
                "Node.js está diseñado principalmente para tareas sincrónicas y bloqueo de I/O.",
                "Node.js utiliza un único hilo principal y E/S asíncrona no bloqueante para manejar la concurrencia.",
                "Node.js solo puede ejecutar código JavaScript que también funcione en el navegador (sin acceso al sistema de archivos)."
            ],
            correctOptionIndex: 2,
            explanation: "Node.js se basa en un modelo de un solo hilo con un bucle de eventos (event loop) y operaciones asíncronas para manejar muchas conexiones eficientemente.",
            xpReward: 20
        },
        {
            id: "ex-ch20-grep",
            type: "code",
            prompt: "Ejercicio: Search Tool. Implementa `grep(files, regex)` que reciba un array de archivos simulados `{name, content}` y una expresión regular `regex`. Devuelve un array con los *nombres* de los archivos cuyo contenido coincida con la regex.",
            initialCode: "function grep(files, regex) {\n  // files es [{name: \"a.txt\", content: \"...\"}]\n  // regex es una RegExp (ej: /hello/)\n  // Devuelve array de strings [\"a.txt\"]\n  return [];\n}",
            solution: "function grep(files, regex) {\n  return files.filter(f => regex.test(f.content)).map(f => f.name);\n}",
            expectedOutput: "[\"match.txt\"]", // Mock check
            explanation: "Usamos filter para encontrar archivos que pasan el test de la regex, y map para extraer sus nombres.",
            xpReward: 35
        },
        {
            id: "ex-ch20-mkcol",
            type: "code",
            prompt: "Ejercicio: Directory Creation. Implementa `handleMKCOL(path, existingResources)` para un servidor WebDAV simulado. `existingResources` es un Set de paths. Si `path` ya existe, devuelve 204. Si no, añádelo y devuelve 204. Si hay un error (simulado), devuelve 500.",
            initialCode: "function handleMKCOL(path, existingResources) {\n  // existingResources es un Set<string>\n  // 1. Si path ya está, return 204\n  // 2. Si no, existingResources.add(path), return 204\n  // (Ignoramos validación de padres por simplicidad)\n  return 204;\n}",
            solution: "function handleMKCOL(path, existingResources) {\n  if (existingResources.has(path)) return 204;\n  existingResources.add(path);\n  return 204;\n}",
            expectedOutput: "204",
            explanation: "MKCOL debe ser idempotente: si el directorio ya existe, es un éxito. Si no, lo creamos.",
            xpReward: 45
        }
    ],
    "ch21-l6": [
        {
            id: "ex-ch21-quiz-http",
            type: "quiz",
            prompt: "¿Cuál es el propósito de una solicitud HTTP 'Long Polling'?",
            options: [
                "Descargar archivos muy grandes sin que se corte la conexión.",
                "Mantener una conexión abierta hasta que el servidor tenga nuevos datos que enviar, permitiendo actualizaciones casi en tiempo real.",
                "Sondear al servidor cada milisegundo para ver si hay cambios.",
                "Hacer que el servidor procese una solicitud lentamente para evitar sobrecargas."
            ],
            correctOptionIndex: 1,
            explanation: "Long polling permite al servidor retrasar la respuesta hasta que haya datos, simulando una conexión push sin usar WebSockets.",
            xpReward: 20
        },
        {
            id: "ex-ch21-persistence",
            type: "code",
            prompt: "Ejercicio: Disk Persistence. Implementa `updated(talks)` para guardar los datos. Usa `JSON.stringify` y una función simulada `writeFile(fileName, data)`. Si `writeFile` falla (lanza error), captúralo y regístralo con `console.error`.",
            initialCode: "function updated(talks) {\n  // 1. Serializa talks a JSON\n  // 2. Llama a writeFile(\"./talks.json\", json)\n  // 3. Envuelve en try/catch para errores\n}",
            solution: "function updated(talks) {\n  try {\n    writeFile(\"./talks.json\", JSON.stringify(talks));\n  } catch (e) {\n    console.error(\"Error saving talks:\", e);\n  }\n}",
            expectedOutput: "", // Mock effect check
            explanation: "Guardamos el estado en disco cada vez que cambia para que persista tras reinicios.",
            xpReward: 35
        },
        {
            id: "ex-ch21-comment-reset",
            type: "code",
            prompt: "Ejercicio: Comment Field Resets. Tienes un componente `Talk` que recibe `{talk}` y lo sincroniza. Si el usuario está escribiendo un comentario, NO queremos sobrescribir su input cuando llega una actualización del servidor. Implementa `syncState(talk)` para actualizar `this.talk`, pero SOLO borrar `this.commentInput.value` si la nueva charla tiene MÁS comentarios que la anterior (indicando que el usuario envió uno).",
            initialCode: "class TalkComponent {\n  constructor(talk) { this.talk = talk; this.commentInput = { value: \"\" }; }\n  syncState(newTalk) {\n    // Actualiza this.talk\n    // Si newTalk.comments.length > oldTalk.comments.length, limpia el input\n  }\n}",
            solution: "class TalkComponent {\n  constructor(talk) { this.talk = talk; this.commentInput = { value: \"\" }; }\n  syncState(newTalk) {\n    if (newTalk.comments.length > this.talk.comments.length) {\n      this.commentInput.value = \"\";\n    }\n    this.talk = newTalk;\n  }\n}",
            expectedOutput: "", // Mock state logic check
            explanation: "Solo limpiamos el campo si detectamos que se ha añadido un comentario nuevo, asumiendo que fue el del usuario.",
            xpReward: 45
        }
    ]
};
