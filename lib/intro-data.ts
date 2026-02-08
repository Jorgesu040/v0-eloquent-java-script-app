
import { Chapter } from "./course-data";

export const INTRO_CHAPTER: Chapter = {
    id: "intro-project",
    number: 0,
    title: "Sobre este Proyecto",
    titleEs: "Sobre este Proyecto",
    part: "intro",
    partLabel: "Inicio",
    icon: "Zap",
    description: "Una extensión práctica e interactiva del libro original, diseñada para aprender haciendo.",
    totalXP: 20,
    isProject: false,
    lessons: [
        {
            id: "intro-l1",
            title: "Aprender haciendo",
            xpReward: 10,
            exercises: [],
            sections: [
                {
                    id: "intro-l1-s1",
                    title: "Mi objetivo",
                    content: [
                        {
                            type: "paragraph",
                            content: "He creado este pequeño proyecto con una idea simple: la mejor forma de aprender a programar es escribiendo código. Aunque leer es fundamental, la verdadera comprensión llega cuando tus manos resuelven problemas reales. En realidad, este proyecto nace desde experiencia muy cercana a la frustración de no encontrar una herramienta práctica para aprender a programar que me convenciera."
                        },
                        {
                            type: "paragraph",
                            content: "Por eso he tomado el excelente contenido de 'Eloquent JavaScript' y le he añadido un entorno de práctica. Aquí no tienes que cambiar de ventana para probar lo que aprendes; ejercicios y teoría conviven en el mismo lugar. Pones en práctica lo que aprendes en el mismo lugar que lo lees, una filosofía de aprender que siempre me ha acompañado, en vez de leer pasivamente."
                        },
                        {
                            type: "paragraph",
                            content: "Es una herramienta sencilla, sin pretensiones, pensada para ser tu cuaderno de trabajo digital. "
                        }
                    ]
                }
            ]
        },
        {
            id: "intro-l2",
            title: "Constancia y Créditos",
            xpReward: 10,
            exercises: [],
            sections: [
                {
                    id: "intro-l2-s1",
                    title: "Manteniendo el ritmo",
                    content: [
                        {
                            type: "paragraph",
                            content: "Para ayudarte a mantener la motivación, he añadido elementos como puntos de experiencia (XP), niveles y rachas diarias. No son para competir, sino para que visualices tu propio avance día a día. A veces es difícil continuar con un proyecto, especialmente cuando no ves resultados inmediatos."
                        }
                    ]
                },
                {
                    id: "intro-l2-s2",
                    title: "Hombros de gigantes",
                    content: [
                        {
                            type: "paragraph",
                            content: "Este proyecto no sería posible sin el trabajo de otros. Todo el contenido base pertenece a Marijn Haverbeke, autor de Eloquent JavaScript. La traducción al español es obra de la comunidad liderada por @midudev."
                        },
                        {
                            type: "paragraph",
                            content: "Puedes ver la lista completa de atribuciones, incluidas las ilustraciones y licencias, en el pie de página (footer) de la aplicación. "
                        },
                        {
                            type: "paragraph",
                            content: "Finalmente, completa transparencia, para el desarrollo de esta herramienta, me he apoyado en inteligencia artificial generativa, por lo que puede haber errores o malentendidos no intencionados."
                        }
                    ]
                }
            ]
        }
    ]
};
