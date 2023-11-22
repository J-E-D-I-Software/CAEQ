const today = new Date();

const courseData = [
    {
        courseName: 'Mampostería industrial',
        modality: 'Presencial',
        numberHours: 7,
        pricing: 'Pagado',
        startDate: new Date(today.getFullYear() + 1, today.getMonth(), today.getDay()),
        endDate: new Date(today.getFullYear() + 2, today.getMonth(), today.getDay()),
        schedule: '5:00pm - 6:00pm',
        daysOfSession: 'LU-MA-MI',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia.'.repeat(
                3
            ),
        temario:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        objective:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        place: 'Aula 3 CAEQ',
        includes:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        price: 120.3,
        capacity: 10,
        teacherName: 'Juan Ernesto Cevilla',
        teacherReview:
            'Excelente profesor. Siempre atento a los alumnos y responde las preguntas de forma comleta y asertiva.',
        paymentInfo: '',
        imageUrl:
            'https://caeq.org/wp-content/uploads/2023/08/MAMPOSTERIA-ESTRUCTURAL_Mesa-de-trabajo-1.png',
    },
    {
        courseName: 'Modelado y análisis de estructuras con SAP2000',
        modality: 'Remoto',
        numberHours: 7,
        pricing: 'Gratuito',
        startDate: new Date(today.getFullYear() + 1, today.getMonth(), today.getDay()),
        endDate: new Date(today.getFullYear() + 2, today.getMonth(), today.getDay()),
        schedule: '5:00pm - 6:00pm',
        daysOfSession: 'LU-MA-MI',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia.'.repeat(
                3
            ),
        temario:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        objective:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        place: 'Aula 3 CAEQ',
        includes:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        price: null,
        capacity: 10,
        teacherName: 'Juan Ernesto Cevilla',
        teacherReview:
            'Excelente profesor. Siempre atento a los alumnos y responde las preguntas de forma comleta y asertiva.',
        paymentInfo: '',
        imageUrl:
            'https://caeq.org/wp-content/uploads/2023/08/SAP2000-MODIFICACION_Mesa-de-trabajo-1-1325x2048.png',
    },
    {
        courseName: 'Excel intermedio',
        modality: 'Presencial',
        numberHours: 7,
        pricing: 'Pagado',
        startDate: new Date(
            today.getFullYear() + 1,
            today.getMonth(),
            today.getDay() + 5
        ),
        endDate: new Date(today.getFullYear() + 2, today.getMonth(), today.getDay() + 8),
        schedule: '5:00pm - 6:00pm',
        daysOfSession: 'LU-MA-MI',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia.'.repeat(
                3
            ),
        temario:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        objective:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        place: 'Aula 3 CAEQ',
        includes:
            '- Generar modelos de análisis de diferentes sistemas estructurales...\n'.repeat(
                5
            ),
        price: 120.3,
        capacity: 10,
        teacherName: 'Juan Ernesto Cevilla',
        teacherReview:
            'Excelente profesor. Siempre atento a los alumnos y responde las preguntas de forma comleta y asertiva.',
        paymentInfo: '',
        imageUrl:
            'https://caeq.org/wp-content/uploads/2023/09/EXCEL-INTERMEDIO-AVANZADO_Mesa-de-trabajo-1.png',
    },
];

module.exports = courseData;
