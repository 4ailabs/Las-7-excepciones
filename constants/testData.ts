
import type { Section } from '../types';

export const screeningData: { series: Section['series']} = {
    series: [
        {
            id: '1.0',
            title: 'FASE PRELIMINAR: DETECCIÓN DE EXCEPCIONES',
            maxScore: 0,
            description: `Este screening determina si el caso presenta excepciones que requieren abordaje especial versus síntoma que puede trabajarse directamente.<br/><br/><strong>PREGUNTA MAESTRA DE ENTRADA:</strong> "Si este síntoma desapareciera mañana completamente, ¿qué sería diferente en tu vida?"`,
            questions: [
                {
                    id: '1.0.Q1',
                    title: 'Evaluar la respuesta según este algoritmo:',
                    type: 'radio',
                    options: [
                        { label: 'RESPUESTA TIPO A: "Sería completamente mejor. Podría hacer todo lo que no puedo hacer ahora. No veo ningún lado negativo." → RUTA: Proceder a confirmación de ausencia de excepciones.', value: 1 },
                        { label: 'RESPUESTA TIPO B: Pausa larga, expresión de confusión, o respuesta compleja que incluye PERO: "Sería mejor, pero... no sé... algo se siente raro al imaginarlo." → RUTA: Alta probabilidad de excepciones presentes. Proceder a Parte 2.', value: 2 },
                        { label: 'RESPUESTA TIPO C: Respuesta emocional intensa (lágrimas, ansiedad, ira) ante la pregunta misma. → RUTA: Muy alta probabilidad de excepciones. Proceder directamente a Parte 2.', value: 3 },
                        { label: 'RESPUESTA TIPO D: "No puedo imaginarlo" o "No sé cómo sería" → RUTA: Probable Excepción 3 (Identidad Congelada). Proceder a evaluación específica.', value: 4 },
                    ]
                }
            ]
        },
        {
            id: '1.1',
            title: 'SECCIÓN 1.1: CONFIRMACIÓN DE AUSENCIA DE EXCEPCIONES',
            maxScore: 4,
            description: 'Hacer estas cuatro preguntas. Si las cuatro respuestas son afirmativas, probablemente NO hay excepciones significativas:',
            questions: [
                {
                    id: '1.1.Q1',
                    title: '¿Has intentado eliminar este síntoma anteriormente con compromiso genuino durante al menos 3 meses?',
                    type: 'radio',
                    options: [
                        { label: 'SÍ, y hubo progreso consistente sin sabotaje → +1 punto ausencia', value: 1 },
                        { label: 'SÍ, pero hubo sabotaje o estancamiento inexplicable → -1 punto (indica excepción)', value: -1 },
                        { label: 'NO he intentado seriamente eliminarlo → Neutral', value: 0 },
                    ]
                },
                {
                    id: '1.1.Q2',
                    title: '¿Las personas más cercanas a ti querrían genuinamente que este síntoma desapareciera?',
                    type: 'radio',
                    options: [
                        { label: 'SÍ, todos lo desearían sin ambivalencia → +1 punto ausencia', value: 1 },
                        { label: 'Hay ambivalencia o alguien tiene inversión en que permanezca → -1 punto (indica excepción)', value: -1 },
                        { label: 'No estoy seguro → Neutral', value: 0 },
                    ]
                },
                {
                    id: '1.1.Q3',
                    title: '¿Puedes identificarte a ti mismo sin mencionar este síntoma?',
                    type: 'radio',
                    options: [
                        { label: 'SÍ, fácilmente. El síntoma no define quién soy → +1 punto ausencia', value: 1 },
                        { label: 'No, el síntoma es parte central de mi identidad → -1 punto (indica excepción)', value: -1 },
                        { label: 'Me cuesta separarlos → Neutral', value: 0 },
                    ]
                },
                {
                    id: '1.1.Q4',
                    title: '¿Hay eventos traumáticos sin procesar que coincidan temporalmente con el inicio del síntoma?',
                    type: 'radio',
                    options: [
                        { label: 'NO, no hay trauma significativo relacionado → +1 punto ausencia', value: 1 },
                        { label: 'SÍ, hay trauma claro entrelazado → -1 punto (indica excepción)', value: -1 },
                        { label: 'Posiblemente, pero no estoy seguro → Neutral', value: 0 },
                    ]
                }
            ]
        }
    ]
};

export const sections: Section[] = [
    {
        id: 'E1',
        title: 'MÓDULO 2.1: EVALUACIÓN DE EXCEPCIÓN #1 (GANANCIA SECUNDARIA PROFUNDA)',
        maxScore: 50,
        series: [
            {
                id: '2.1.A',
                title: 'SERIE A: PREGUNTAS DIRECTAS',
                maxScore: 25,
                questions: [
                    { id: '2.1.A1', title: '¿De qué manera este síntoma te sirve, aunque sea de forma que no te gusta admitir?', type: 'radio', options: [{label: 'Negación inmediata sin reflexión', value: 0}, {label: 'Pausa larga seguida de reconocimiento parcial', value: 2}, {label: 'Articulación clara de múltiples ganancias', value: 4}, {label: 'Articulación profunda con emoción', value: 5}] },
                    { id: '2.1.A2', title: 'Si el síntoma desapareciera, ¿qué responsabilidades o demandas tendrías que enfrentar que actualmente puedes evitar?', type: 'radio', options: [{label: 'Ninguna, no evito nada', value: 0}, {label: 'Identifica 1-2 responsabilidades', value: 2}, {label: 'Identifica 3-5 responsabilidades', value: 4}, {label: 'Reconoce que el síntoma es su única forma de poner límites', value: 5}] },
                    { id: '2.1.A3', title: '¿Cómo reaccionarían las personas importantes en tu vida si mejoraras completamente?', type: 'radio', options: [{label: 'Todos estarían felices sin ambivalencia', value: 0}, {label: 'Algunos se alegrarían pero otros... no estoy seguro', value: 2}, {label: 'Alguien importante perdería su rol de cuidador', value: 4}, {label: 'Perdería atención/conexión que solo recibo cuando estoy enfermo', value: 5}] },
                    { id: '2.1.A4', title: '¿Hay una parte de ti que secretamente no quiere que el síntoma desaparezca?', type: 'radio', options: [{label: 'No, quiero que desaparezca completamente', value: 0}, {label: 'Quizás... me confunde esta pregunta', value: 2}, {label: 'Sí, hay una parte que se resiste aunque no entiendo por qué', value: 4}, {label: 'Sí, esa parte tiene razones específicas que puedo articular', value: 5}] },
                    { id: '2.1.A5', title: 'Si tuvieras que elegir entre: (A) curar el síntoma pero perder algo importante, o (B) mantener el síntoma y mantener eso importante, ¿qué elegirías?', type: 'radio', options: [{label: 'Obviamente A, curaría el síntoma sin dudarlo', value: 0}, {label: 'Pausa larga, dificultad para responder', value: 3}, {label: 'Dependería de qué tan importante sea eso que pierdo', value: 4}, {label: 'Honestamente, podría elegir B', value: 5}] }
                ]
            },
            {
                id: '2.1.B',
                title: 'SERIE B: SEÑALES COMPORTAMENTALES',
                maxScore: 15,
                questions: [
                    { id: '2.1.B1', title: 'Patrón de mejoría seguida de recaída inexplicable', description: 'Mejoría del 60-70% seguida de retroceso sin causa médica clara', type: 'radio', options: [{label: 'Ausente', value: 0}, {label: 'Ocurrió una vez', value: 2}, {label: 'Patrón repetido 2-3 veces', value: 4}, {label: 'Patrón cíclico constante', value: 5}] },
                    { id: '2.1.B2', title: 'Sabotaje justo antes de breakthrough', description: 'Cancela sesión crucial, "olvida" medicamento cuando funciona, crisis que interrumpe tratamiento', type: 'radio', options: [{label: 'Ausente', value: 0}, {label: 'Posiblemente una vez', value: 2}, {label: 'Patrón claro 2-3 veces', value: 4}, {label: 'Patrón predecible cada vez que hay progreso significativo', value: 5}] },
                    { id: '2.1.B3', title: 'El síntoma intensifica cuando hay amenaza de perder beneficio secundario', description: 'Ejemplo: empeora cuando está a punto de recibir alta médica, o cuando figura de apego menciona que ya no necesita tanto cuidado', type: 'radio', options: [{label: 'Ausente', value: 0}, {label: 'Posible correlación una vez', value: 2}, {label: 'Correlación clara múltiples veces', value: 4}, {label: 'Correlación predecible y consistente', value: 5}] }
                ]
            },
            {
                id: '2.1.C',
                title: 'SERIE C: ANÁLISIS FUNCIONAL',
                maxScore: 10,
                description: 'Completar esta matriz. Cada necesidad identificada que SOLO puede satisfacerse mediante el síntoma suma 2 puntos.',
                questions: [
                    { id: '2.1.C1', title: 'Análisis funcional', type: 'table', rows: [ {id: 'descanso', label: 'Descanso sin culpa'}, {id: 'atencion', label: 'Atención/cuidado'}, {id: 'limites', label: 'Límites/poder decir no'}, {id: 'conexion', label: 'Conexión con figura importante'}, {id: 'validacion', label: 'Validación de sufrimiento'} ] }
                ]
            }
        ]
    },
    {
        id: 'E2',
        title: 'MÓDULO 2.2: EVALUACIÓN DE EXCEPCIÓN #2 (TRAUMA NO PROCESADO ENTRELAZADO)',
        maxScore: 50,
        series: [
            {
                id: '2.2.A',
                title: 'SERIE A: IDENTIFICACIÓN TEMPORAL',
                maxScore: 15,
                questions: [
                    { id: '2.2.A1', title: '¿Puedes identificar cuándo comenzó exactamente este síntoma?', type: 'radio', options: [{label: 'No, siempre ha estado ahí o fue gradual', value: 0}, {label: 'Aproximadamente en cierto período', value: 2}, {label: 'Sí, mes/año específico', value: 4}, {label: 'Comenzó el día exacto de un evento traumático', value: 5}] },
                    { id: '2.2.A2', title: '¿Qué estaba sucediendo en tu vida cuando el síntoma comenzó?', type: 'radio', options: [{label: 'Nada significativo', value: 0}, {label: 'Estrés general', value: 1}, {label: 'Evento estresante importante', value: 3}, {label: 'Evento claramente traumático', value: 5}] },
                    { id: '2.2.A3', title: '¿Ese evento fue procesado completamente en su momento?', type: 'radio', options: [{label: 'Sí, lo procesé y superé', value: 0}, {label: 'No estoy seguro qué significa procesarlo', value: 2}, {label: 'No, nunca hablé de ello', value: 4}, {label: 'No, fue demasiado abrumador para procesarlo', value: 5}] }
                ]
            },
            {
                id: '2.2.B',
                title: 'SERIE B: LOCALIZACIÓN SOMÁTICA',
                maxScore: 10,
                questions: [
                    { id: '2.2.B1', title: 'El síntoma está localizado en parte del cuerpo que estuvo directamente involucrada en evento traumático', description: 'Ejemplo: dolor de garganta crónico después de estrangulamiento, dolor pélvico después de abuso sexual, dolor de espalda después de accidente automovilístico', type: 'radio', options: [{label: 'No hay correlación', value: 0}, {label: 'Posible correlación', value: 2}, {label: 'Correlación clara', value: 5}] },
                    { id: '2.2.B2', title: 'El síntoma reproduce sensación que ocurrió durante el trauma', description: 'Ejemplo: sensación de no poder respirar que ocurrió durante ataque de pánico ahora es síntoma crónico', type: 'radio', options: [{label: 'No hay similitud', value: 0}, {label: 'Alguna similitud vaga', value: 2}, {label: 'Similitud clara', value: 5}] }
                ]
            },
            {
                id: '2.2.C',
                title: 'SERIE C: TRIGGERS Y ACTIVACIÓN',
                maxScore: 15,
                questions: [
                    { id: '2.2.C1', title: '¿El síntoma se intensifica con ciertos estímulos, lugares, personas, fechas, o situaciones específicas?', type: 'radio', options: [{label: 'No, es constante', value: 0}, {label: 'Varía sin patrón claro', value: 1}, {label: 'Empeora con triggers pero no sé por qué', value: 3}, {label: 'Empeora con cosas que recuerdan el trauma', value: 5}] },
                    { id: '2.2.C2', title: '¿Tienes flashbacks, pesadillas, o pensamientos intrusivos sobre algún evento del pasado?', type: 'radio', options: [{label: 'No, nada de eso', value: 0}, {label: 'A veces pienso en eventos pasados', value: 1}, {label: 'Sí, recuerdos que aparecen sin quererlo', value: 3}, {label: 'Sí, frecuentes y perturbadores', value: 5}] },
                    { id: '2.2.C3', title: 'Cuando piensas en el evento que coincide con el inicio del síntoma, ¿qué sientes en tu cuerpo AHORA?', type: 'radio', options: [{label: 'Nada particular', value: 0}, {label: 'Alguna incomodidad leve', value: 2}, {label: 'Cambios visibles (respiración, postura)', value: 4}, {label: 'Activación intensa (llanto, disociación)', value: 5}] }
                ]
            },
            {
                id: '2.2.D',
                title: 'SERIE D: SÍNTOMAS DE TRAUMA CONCURRENTES',
                maxScore: 10,
                questions: [
                    { id: '2.2.D1', title: 'Marcar todos los presentes. Cada uno suma 1 punto.', type: 'checkbox-group', maxScore:10, options: [
                        {label: 'Hipervigilancia', value: 1},
                        {label: 'Respuestas de sobresalto exageradas', value: 1},
                        {label: 'Evitación de recordatorios del trauma', value: 1},
                        {label: 'Dificultad de concentración persistente', value: 1},
                        {label: 'Irritabilidad o ira desproporcionada', value: 1},
                        {label: 'Problemas de sueño', value: 1},
                        {label: 'Sensación de estar separado de uno mismo (disociación)', value: 1},
                        {label: 'Creencias negativas sobre uno mismo surgidas del trauma', value: 1},
                        {label: 'Culpa o vergüenza relacionada con el evento', value: 1},
                        {label: 'Pérdida de interés en actividades', value: 1}
                    ]}
                ]
            }
        ]
    },
    {
        id: 'E3',
        title: 'MÓDULO 2.3: EVALUACIÓN DE EXCEPCIÓN #3 (IDENTIDAD CONGELADA)',
        maxScore: 50,
        series: [
            { id: '2.3.A', title: 'SERIE A: ANÁLISIS LINGÜÍSTICO', maxScore: 10, questions: [
                { id: '2.3.A1', title: 'Uso de verbo SER para describir síntoma ("Soy ansioso")', description: 'Ejemplos: "Soy ansioso", "Soy depresivo", "Soy enfermo", "Soy [diagnóstico]"', type: 'radio', options: [{label: '0 veces', value: 0}, {label: '1-2 veces', value: 2}, {label: '3-5 veces', value: 4}, {label: '6+ veces', value: 5}] },
                { id: '2.3.A2', title: 'Uso de verbo TENER o EXPERIMENTAR ("Tengo ansiedad")', description: 'Ejemplos: "Tengo ansiedad", "Experimento depresión", "Vivo con [condición]"', type: 'radio', options: [{label: '6+ veces', value: 0}, {label: '3-5 veces', value: 1}, {label: '1-2 veces', value: 3}, {label: '0 veces (solo usa SER)', value: 5}] }
            ]},
            { id: '2.3.B', title: 'SERIE B: CAPACIDAD DE SEPARACIÓN', maxScore: 15, questions: [
                { id: '2.3.B1', title: 'Completa esta frase: Yo soy _____ (sin mencionar el síntoma)', type: 'radio', options: [{label: 'Lista 5+ características', value: 0}, {label: 'Lista 2-4 características', value: 2}, {label: 'Lista 1-2 características', value: 4}, {label: 'No puede completar sin mencionar síntoma', value: 5}] },
                { id: '2.3.B2', title: 'Si el síntoma desapareciera completamente, ¿quién serías?', type: 'radio', options: [{label: 'Describe versión de sí mismo fácilmente', value: 0}, {label: 'Describe con dificultad', value: 2}, {label: '"No sé" o "No puedo imaginarlo"', value: 4}, {label: '"No sería yo" o "Sería una persona diferente"', value: 5}] },
                { id: '2.3.B3', title: '¿Cuándo piensas en ti mismo, el síntoma aparece en ese pensamiento?', type: 'radio', options: [{label: 'Raramente', value: 0}, {label: 'A veces', value: 2}, {label: 'Frecuentemente', value: 4}, {label: 'Siempre', value: 5}] }
            ]},
            { id: '2.3.C', title: 'SERIE C: UBICUIDAD NARRATIVA', maxScore: 10, questions: [
                 { id: '2.3.C1', title: 'En una narrativa de vida de 5 min, ¿cuántas veces menciona el síntoma?', type: 'radio', options: [{label: '0-1 veces', value: 0}, {label: '2-3 veces', value: 2}, {label: '4-6 veces', value: 4}, {label: '7+ veces', value: 5}] },
                 { id: '2.3.C2', title: '¿Hay períodos de vida recordados como libres del síntoma?', type: 'radio', options: [{label: 'Sí, claramente', value: 0}, {label: 'Recuerda pero reinterpreta', value: 3}, {label: 'No, está presente en toda la narrativa', value: 5}] }
            ]},
            { id: '2.3.D', title: 'SERIE D: IDENTIFICACIÓN SOCIAL', maxScore: 10, questions: [
                 { id: '2.3.D1', title: '¿Perteneces a comunidades o grupos organizados alrededor de tu diagnóstico/síntoma?', type: 'radio', options: [{label: 'No', value: 0}, {label: 'Ocasionalmente participo', value: 2}, {label: 'Miembro activo', value: 4}, {label: 'Es mi comunidad principal', value: 5}] },
                 { id: '2.3.D2', title: '¿Cómo te presentarías a alguien nuevo? (¿menciona el síntoma?)', type: 'radio', options: [{label: 'No aparece en presentación inicial', value: 0}, {label: 'Aparece si la conversación se extiende', value: 2}, {label: 'Aparece en primeros 30s', value: 4}, {label: 'Es lo primero que menciona', value: 5}] }
            ]},
            { id: '2.3.E', title: 'SERIE E: POSTURA CORPORAL DE IDENTIDAD', maxScore: 5, questions: [
                 { id: '2.3.E1', title: 'Ejercicio: "Párate y muestra con tu cuerpo cómo es ser [síntoma]"', type: 'radio', options: [{label: 'Se resiste o superficial', value: 0}, {label: 'Adopta postura actuada', value: 2}, {label: 'Adopta postura que reconoce como "suya"', value: 4}, {label: 'Reporta: "Esta es mi postura normal"', value: 5}] }
            ]}
        ]
    },
    // Add other sections following the same pattern...
    {
        id: 'E4',
        title: 'MÓDULO 2.4: EVALUACIÓN DE EXCEPCIÓN #4 (PROTECTORES INTERNOS DEFENSIVOS)',
        maxScore: 50,
        series: [
            { id: '2.4.A', title: 'SERIE A: LENGUAJE DE MULTIPLICIDAD', maxScore: 10, questions: [
                { id: '2.4.A1', title: 'Uso espontáneo de lenguaje de partes ("una parte de mi...")', description: 'Ejemplos: "Una parte de mí quiere... pero otra parte...", "Hay una voz que dice...", "Algo dentro de mí se resiste...", "Me siento dividido entre..."', type: 'radio', options: [{label: '0 veces', value: 0}, {label: '1-2 veces', value: 2}, {label: '3-4 veces', value: 4}, {label: '5+ veces', value: 5}] },
                { id: '2.4.A2', title: '¿Sientes que hay diferentes partes de ti que quieren cosas diferentes respecto al síntoma?', type: 'radio', options: [{label: 'No, estoy unificado', value: 0}, {label: 'Supongo que sí', value: 2}, {label: 'Sí, definitivamente hay conflicto', value: 4}, {label: 'Sí, puedo identificar las partes', value: 5}] }
            ]},
            { id: '2.4.B', title: 'SERIE B: POLARIZACIÓN IDENTIFICABLE', maxScore: 10, questions: [
                 { id: '2.4.B1', title: 'Ejercicio: "Completa: Una parte de mí quiere ___ pero otra parte quiere ___"', type: 'radio', options: [{label: 'No puede o vago', value: 0}, {label: 'Completa con dificultad', value: 2}, {label: 'Completa claramente', value: 4}, {label: 'Completa y nombra las partes', value: 5}] },
                 { id: '2.4.B2', title: '¿Puedes darle nombre o describir a la parte que se resiste al cambio?', type: 'radio', options: [{label: 'No hay tal parte', value: 0}, {label: 'Supongo... no sé', value: 2}, {label: 'Da nombre o descripción clara', value: 4}, {label: 'Describe con detalle y lógica', value: 5}] }
            ]},
            { id: '2.4.C', title: 'SERIE C: SABOTAJE EN MOMENTO CRÍTICO', maxScore: 10, questions: [
                { id: '2.4.C1', title: '¿Ha pasado que justo cuando estás a punto de lograr progreso, algo dentro de ti sabotea?', type: 'radio', options: [{label: 'No', value: 0}, {label: 'Quizás una vez', value: 2}, {label: 'Sí, es un patrón', value: 4}, {label: 'Sí, es predecible', value: 5}] },
                { id: '2.4.C2', title: 'Si hay una parte que sabotea, ¿puedes adivinar por qué lo hace?', type: 'radio', options: [{label: 'No aplicable / No sé', value: 0}, {label: 'Respuesta superficial (miedo al cambio)', value: 2}, {label: 'Articula lógica protectora específica', value: 4}, {label: 'Articula lógica con empatía', value: 5}] }
            ]},
             { id: '2.4.D', title: 'SERIE D: OSCILACIÓN ENTRE EXTREMOS', maxScore: 10, questions: [
                { id: '2.4.D1', title: '¿Oscila tu comportamiento o estado entre extremos opuestos?', description: 'Ejemplos: hiperproductividad y colapso total, restricción extrema y descontrol, aislamiento total y fusión con otros', type: 'radio', options: [{label: 'No, soy consistente', value: 0}, {label: 'Alguna variación', value: 2}, {label: 'Sí, sin punto medio', value: 4}, {label: 'Sí, y puedo identificar la parte en control', value: 5}] },
                { id: '2.4.D2', title: '¿Cuándo estás en un extremo, el otro extremo parece imposible?', description: 'Ejemplo: Cuando estás restringido, la idea de comer normalmente parece aterradora. Cuando estás en descontrol, la idea de restricción parece imposible.', type: 'radio', options: [{label: 'No, puedo ver ambos lados', value: 0}, {label: 'Sí, es difícil recordar', value: 3}, {label: 'Sí, es mi única realidad', value: 5}] }
            ]},
             { id: '2.4.E', title: 'SERIE E: DIÁLOGO INTERNO', maxScore: 5, questions: [
                { id: '2.4.E1', title: 'Ejercicio: Pregunta a la parte que se resiste "¿Por qué haces esto?"', type: 'radio', options: [{label: 'No escuchó nada', value: 0}, {label: 'Algo vago surgió', value: 2}, {label: 'Respuesta clara y válida', value: 4}, {label: 'Respuesta clara y reacción emocional', value: 5}] }
            ]},
             { id: '2.4.F', title: 'SERIE F: EDAD DE LA PARTE PROTECTORA', maxScore: 5, questions: [
                { id: '2.4.F1', title: 'Si la parte que se resiste tuviera una edad, ¿qué edad tendría?', type: 'radio', options: [{label: 'No aplicable o "No sé"', value: 0}, {label: 'Adulto', value: 1}, {label: 'Adolescente (13-17)', value: 3}, {label: 'Niño/Muy joven (<12 años)', value: 5}] }
            ]}
        ]
    },
    {
        id: 'E5',
        title: 'MÓDULO 2.5: EVALUACIÓN DE EXCEPCIÓN #5 (DESORDEN EN VENTANA DE TOLERANCA)',
        maxScore: 50,
        series: [
             { id: '2.5.A', title: 'SERIE A: MAPEO DE ZONAS', maxScore: 10, questions: [
                { id: '2.5.A1', title: 'Porcentaje de tiempo en Zona Verde (calmo, presente)', type: 'radio', options: [{label: '60-100%', value: 0}, {label: '40-59%', value: 2}, {label: '20-39%', value: 4}, {label: '0-19%', value: 5}] },
                { id: '2.5.A2', title: 'Oscilación entre zonas (roja/hiper, azul/hipo)', type: 'radio', options: [{label: 'Transiciones graduales', value: 0}, {label: 'Algunas transiciones abruptas', value: 2}, {label: 'Frecuentes transiciones abruptas de rojo a azul', value: 5}] }
            ]},
             { id: '2.5.B', title: 'SERIE B: UMBRAL DE DESREGULACIÓN', maxScore: 10, questions: [
                { id: '2.5.B1', title: '¿Qué tan pequeño puede ser un estímulo estresante para sacarte de tu zona de funcionamiento?', type: 'radio', options: [{label: 'Tolero mucho estrés', value: 0}, {label: 'Eventos moderados me desregulan', value: 2}, {label: 'Eventos menores me desregulan', value: 4}, {label: 'Cosas triviales me sacan completamente', value: 5}] },
                { id: '2.5.B2', title: 'Cuando te desregulas, ¿cuánto tiempo te toma regresar a tu estado balanceado?', type: 'radio', options: [{label: 'Minutos a una hora', value: 0}, {label: 'Varias horas', value: 2}, {label: 'Un día completo o más', value: 4}, {label: 'Días o semanas', value: 5}] }
            ]},
             { id: '2.5.C', title: 'SERIE C: SÍNTOMAS DE DESREGULACIÓN', maxScore: 5, scoreCalculation: 'max', description: 'El score de esta serie es el MÁS ALTO entre los síntomas de Zona Roja y Zona Azul.', questions: [
                { id: '2.5.C1', title: 'Síntomas en ZONA ROJA (hiperactivación)', type: 'radio', options: [{label: '0-2 síntomas', value: 0}, {label: '3-5 síntomas', value: 2}, {label: '6-8 síntomas', value: 4}, {label: '9-10 síntomas', value: 5}] },
                { id: '2.5.C2', title: 'Síntomas en ZONA AZUL (hipoactivación)', type: 'radio', options: [{label: '0-2 síntomas', value: 0}, {label: '3-5 síntomas', value: 2}, {label: '6-8 síntomas', value: 4}, {label: '9-10 síntomas', value: 5}] }
            ]},
            { id: '2.5.D', title: 'SERIE D: CAPACIDAD DE AUTO-REGULACIÓN', maxScore: 10, questions: [
                { id: '2.5.D1', title: 'Cuando estás acelerado (zona roja), ¿tienes herramientas que funcionan para calmarte?', type: 'radio', options: [{label: 'Sí, múltiples y efectivas', value: 0}, {label: 'Algunas a veces ayudan', value: 2}, {label: 'Pocas funcionan', value: 4}, {label: 'Nada funciona', value: 5}] },
                { id: '2.5.D2', title: 'Cuando estás apagado (zona azul), ¿tienes herramientas que funcionan para energizarte?', type: 'radio', options: [{label: 'Sí, puedo activarme', value: 0}, {label: 'A veces, es difícil', value: 2}, {label: 'Raramente', value: 4}, {label: 'No puedo', value: 5}] }
            ]},
            { id: '2.5.E', title: 'SERIE E: HISTORIA DE DESARROLLO', maxScore: 10, questions: [
                { id: '2.5.E1', title: 'En tu niñez, ¿había un adulto que te ayudaba a calmarte?', type: 'radio', options: [{label: 'Sí, consistentemente', value: 0}, {label: 'A veces', value: 3}, {label: 'Raramente o nunca', value: 5}] },
                { id: '2.5.E2', title: '¿Hubo experiencias tempranas de estrés crónico o trauma?', type: 'radio', options: [{label: 'No, infancia estable', value: 0}, {label: 'Algún estrés', value: 2}, {label: 'Sí, estrés significativo o trauma', value: 5}] }
            ]}
        ]
    },
    {
        id: 'E6',
        title: 'MÓDULO 2.6: EVALUACIÓN DE EXCEPCIÓN #6 (DINÁMICAS DE APEGO DAÑADAS)',
        maxScore: 50,
        series: [
             { id: '2.6.A', title: 'SERIE A: HISTORIA DE APEGO TEMPRANO', maxScore: 15, questions: [
                { id: '2.6.A1', title: 'Cuando eras niño y estabas asustado o dolido, ¿podías acudir a tus cuidadores para consuelo?', type: 'radio', options: [{label: 'Sí, siempre podía y me consolaban efectivamente', value: 0}, {label: 'A veces sí, a veces no', value: 3}, {label: 'Raramente o nunca, no eran confiables para consuelo', value: 5}] },
                { id: '2.6.A2', title: '¿Cómo respondían tus cuidadores cuando estabas enfermo o lastimado físicamente?', type: 'radio', options: [{label: 'Respondían con cuidado apropiado sin exageración ni negligencia', value: 0}, {label: 'Variaba, a veces atención excesiva, a veces negligencia', value: 3}, {label: 'Era el ÚNICO momento donde recibía atención genuina', value: 5}, {label: 'Me ignoraban incluso cuando estaba genuinamente enfermo', value: 5}] },
                { id: '2.6.A3', title: 'En tu familia, ¿era aceptable tener necesidades emocionales o solo necesidades físicas (enfermedad, dolor)?', type: 'radio', options: [{label: 'Ambas eran aceptables y atendidas', value: 0}, {label: 'Necesidades emocionales eran minimizadas o ignoradas', value: 4}, {label: 'Solo era aceptable tener necesidades si estabas literalmente incapacitado físicamente', value: 5}] }
            ]},
             { id: '2.6.B', title: 'SERIE B: PATRÓN DE APEGO ACTUAL', maxScore: 5, questions: [
                { id: '2.6.B1', title: '¿Cuál de estas descripciones se ajusta mejor a cómo eres en relaciones cercanas?', type: 'radio', options: [
                    {label: 'OPCIÓN A (Apego Seguro)', value: 0, description: 'Me resulta relativamente fácil acercarme emocionalmente a otros. Me siento cómodo dependiendo de otros y que otros dependan de mí. No me preocupa estar solo ni que otros no me acepten.'}, 
                    {label: 'OPCIÓN B (Apego Ansioso)', value: 4, description: 'Me gustaría fusionarme completamente con otras personas, y este deseo a veces asusta a la gente. Me preocupa que otros no me valoren tanto como yo los valoro. Temo ser abandonado.'}, 
                    {label: 'OPCIÓN C (Apego Evitativo)', value: 4, description: 'Me siento algo incómodo estando cerca de otros. Me resulta difícil confiar en otros completamente. Me pone nervioso cuando alguien se acerca demasiado emocionalmente. Mis parejas frecuentemente quieren más intimidad de la que yo me siento cómodo dando.'},
                    {label: 'OPCIÓN D (Apego Desorganizado)', value: 5, description: 'Mis relaciones son confusas. Quiero cercanía pero también la temo. Oscilo entre buscar intensamente conexión y rechazarla. Las personas cercanas son a veces fuente de confort y a veces fuente de miedo.'}
                ]}
            ]},
            { id: '2.6.C', title: 'SERIE C: SÍNTOMA COMO LENGUAJE DE APEGO', maxScore: 15, questions: [
                { id: '2.6.C1', title: '¿Cómo reacciona [figura de apego específica más importante] cuando tu síntoma empeora?', type: 'radio', options: [{label: 'No cambia su comportamiento significativamente', value: 0}, {label: 'Muestra más preocupación pero de forma apropiada', value: 1}, {label: 'Se vuelve significativamente más atento, preocupado, presente', value: 4}, {label: 'Es el ÚNICO momento donde recibo atención genuina de esta persona', value: 5}] },
                { id: '2.6.C2', title: '¿Cómo reacciona esa misma persona cuando estás bien, sin síntomas?', type: 'radio', options: [{label: 'Permanece igualmente conectado y presente', value: 0}, {label: 'Está algo menos presente pero la relación se mantiene', value: 2}, {label: 'Se vuelve distante, la comunicación disminuye', value: 4}, {label: 'Prácticamente no hay contacto, como si no existiera', value: 5}] },
                { id: '2.6.C3', title: '¿Alguna vez has mejorado significativamente y luego esa persona importante pareció alejarse o mostrarse incómoda con tu mejoría?', type: 'radio', options: [{label: 'No, celebraron mi mejoría genuinamente', value: 0}, {label: 'No estoy seguro', value: 2}, {label: 'Sí, parecieron incómodos o distantes', value: 4}, {label: 'Sí, y eso correlacionó con recaída del síntoma', value: 5}] }
            ]},
             { id: '2.6.D', title: 'SERIE D: MIEDO AL ABANDONO POR MEJORÍA', maxScore: 10, questions: [
                { id: '2.6.D1', title: 'Si mejoraras completamente, ¿qué temes que pasaría con tus relaciones importantes?', type: 'radio', options: [{label: 'Nada negativo, solo mejorarían', value: 0}, {label: 'Quizás algo cambiaría pero no me preocupa', value: 2}, {label: 'Temo que ya no me necesitarían', value: 4}, {label: 'Temo perder las relaciones, es el único vínculo que tengo', value: 5}] },
                { id: '2.6.D2', title: '¿Hay alguien en tu vida cuyo rol o identidad está definido por cuidarte?', type: 'radio', options: [{label: 'No, nadie tiene ese rol', value: 0}, {label: 'Alguien me ayuda pero no es su identidad central', value: 2}, {label: 'Sí, hay alguien que se define como mi cuidador', value: 4}, {label: 'Sí, y temo que si mejoro, perderán su propósito y la relación', value: 5}] }
            ]},
            { id: '2.6.E', title: 'SERIE E: NECESIDADES NO SATISFECHAS', maxScore: 5, questions: [
                { id: '2.6.E1', title: 'Ejercicio: "Completa: Cuando era niño, necesitaba escuchar ___ pero nunca lo escuché"', type: 'radio', options: [{label: 'No puede identificar necesidades no satisfechas', value: 0}, {label: 'Identifica 1-2 necesidades', value: 2}, {label: 'Identifica 3-5 necesidades con emoción', value: 4}, {label: 'Identifica múltiples necesidades Y conecta cómo el síntoma le permite recibir versión de lo que necesitó', value: 5}] }
            ]}
        ]
    },
     {
        id: 'E7',
        title: 'MÓDULO 2.7: EVALUACIÓN DE EXCEPCIÓN #7 (SENSIBILIZACIÓN CENTRAL CRÓNICA)',
        maxScore: 50,
        series: [
             { id: '2.7.A', title: 'SERIE A: CARACTERÍSTICAS TEMPORALES', maxScore: 10, questions: [
                { id: '2.7.A1', title: '¿Cuánto tiempo ha persistido este síntoma más allá del tiempo esperado de curación tisular (3-6 meses)?', type: 'radio', options: [{label: '< 6 meses', value: 0}, {label: '6-12 meses', value: 2}, {label: '1-3 años', value: 4}, {label: '> 3 años', value: 5}] },
                { id: '2.7.A2', title: '¿El dolor/síntoma ha ido intensificándose con el tiempo en lugar de mejorar?', type: 'radio', options: [{label: 'No, ha permanecido estable o ha mejorado', value: 0}, {label: 'Ha variado sin patrón claro', value: 2}, {label: 'Sí, gradualmente ha empeorado', value: 4}, {label: 'Sí, ha empeorado dramáticamente y también se ha expandido a nuevas áreas', value: 5}] }
            ]},
             { id: '2.7.B', title: 'SERIE B: DISTRIBUCIÓN Y EXPANSIÓN', maxScore: 10, questions: [
                { id: '2.7.B1', title: '¿El dolor/síntoma se ha expandido desde su ubicación original a otras partes del cuerpo?', type: 'radio', options: [{label: 'No, permanece en el sitio original', value: 0}, {label: 'Se ha expandido a 1 área adyacente', value: 2}, {label: 'Se ha expandido a 2-3 áreas', value: 4}, {label: 'Se ha vuelto generalizado en múltiples áreas sin relación anatómica clara', value: 5}] },
                { id: '2.7.B2', title: '¿Tienes múltiples diagnósticos médicos funcionales sin hallazgos estructurales claros?', description: 'Ejemplos: fibromialgia, síndrome de fatiga crónica, intestino irritable, cistitis intersticial, migrañas, síndrome de dolor regional complejo', type: 'radio', options: [{label: 'Ningún diagnóstico adicional', value: 0}, {label: '1 diagnóstico funcional adicional', value: 2}, {label: '2-3 diagnósticos funcionales', value: 4}, {label: '4+ diagnósticos funcionales coexistentes', value: 5}] }
            ]},
            { id: '2.7.C', title: 'SERIE C: ALODINIA E HIPERALGESIA', maxScore: 10, questions: [
                { id: '2.7.C1', title: '¿Sientes dolor con estímulos que normalmente no deberían doler (alodinia)?', description: 'Ejemplos: roce ligero de ropa, abrazo suave, agua de ducha, cepillarse el cabello.', type: 'radio', options: [{label: 'No, solo duele lo que objetivamente debería doler', value: 0}, {label: 'Ocasionalmente algunas cosas causan más molestia de lo esperado', value: 2}, {label: 'Frecuentemente estímulos leves causan dolor', value: 4}, {label: 'Casi cualquier contacto o estímulo causa dolor', value: 5}] },
                { id: '2.7.C2', title: 'Cuando algo duele, ¿la intensidad del dolor es desproporcional al estímulo (hiperalgesia)?', type: 'radio', options: [{label: 'Sí, estímulos pequeños causan dolor pequeño, estímulos grandes causan dolor grande', value: 0}, {label: 'A veces respondo más fuerte de lo esperado', value: 2}, {label: 'Frecuentemente estímulos menores causan dolor severo', value: 4}, {label: 'Hasta el más mínimo estímulo puede causar dolor insoportable', value: 5}] }
            ]},
             { id: '2.7.D', title: 'SERIE D: CATASTROFIZACIÓN', maxScore: 10, scoreMultiplier: 0.5, description: 'Items adaptados de Pain Catastrophizing Scale. Responda en escala 0-4. El score final es la suma total x 0.5.', questions: [
                { id: '2.7.D1', title: '"Cuando tengo dolor, pienso que nunca va a mejorar"', type: 'select', options: [{label: 'Nunca (0)', value: 0}, {label: 'Raramente (1)', value: 1}, {label: 'A veces (2)', value: 2}, {label: 'Frecuentemente (3)', value: 3}, {label: 'Siempre (4)', value: 4}] },
                { id: '2.7.D2', title: '"Cuando tengo dolor, siento que no puedo seguir adelante"', type: 'select', options: [{label: 'Nunca (0)', value: 0}, {label: 'Raramente (1)', value: 1}, {label: 'A veces (2)', value: 2}, {label: 'Frecuentemente (3)', value: 3}, {label: 'Siempre (4)', value: 4}] },
                { id: '2.7.D3', title: '"Cuando tengo dolor, pienso constantemente en cuánto duele"', type: 'select', options: [{label: 'Nunca (0)', value: 0}, {label: 'Raramente (1)', value: 1}, {label: 'A veces (2)', value: 2}, {label: 'Frecuentemente (3)', value: 3}, {label: 'Siempre (4)', value: 4}] },
                { id: '2.7.D4', title: '"Cuando tengo dolor, pienso que algo terrible va a pasar"', type: 'select', options: [{label: 'Nunca (0)', value: 0}, {label: 'Raramente (1)', value: 1}, {label: 'A veces (2)', value: 2}, {label: 'Frecuentemente (3)', value: 3}, {label: 'Siempre (4)', value: 4}] },
                { id: '2.7.D5', title: '"Cuando tengo dolor, siento que es terrible y que nunca mejorará"', type: 'select', options: [{label: 'Nunca (0)', value: 0}, {label: 'Raramente (1)', value: 1}, {label: 'A veces (2)', value: 2}, {label: 'Frecuentemente (3)', value: 3}, {label: 'Siempre (4)', value: 4}] },
            ]},
             { id: '2.7.E', title: 'SERIE E: EVITACIÓN POR MIEDO', maxScore: 10, questions: [
                { id: '2.7.E1', title: '¿Evitas ciertos movimientos o actividades por miedo a que causen dolor o empeoren tu condición?', type: 'radio', options: [{label: 'No, mantengo mis actividades normales', value: 0}, {label: 'Evito algunas actividades muy específicas', value: 1}, {label: 'Evito muchas actividades por precaución', value: 3}, {label: 'Mi vida está severamente limitada por evitación', value: 5}] },
                { id: '2.7.E2', title: '¿Crees que el dolor significa que te estás dañando?', type: 'radio', options: [{label: 'No, entiendo que dolor no siempre significa daño', value: 0}, {label: 'A veces pienso que sí', value: 2}, {label: 'Generalmente sí, el dolor me indica que algo malo está pasando', value: 4}, {label: 'Absolutamente, cada episodio de dolor significa más daño', value: 5}] }
            ]}
        ]
    }
];

export const getSectionTitle = (index: number): string => {
    return sections[index]?.title || 'Sección Desconocida';
}
