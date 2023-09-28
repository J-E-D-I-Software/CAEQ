import BaseButton from "../components/buttons/BaseButton";
import TextInput from "../components/inputs/TextInput/TextInput";
import CourseCard from "../components/cards/CourseCard";
import '../styles/courses.scss';

const Courses = (props) => {
    const courses = [
        {
            _id: 'randomID',
            courseName: "Matematicas discretas",
            modality: "Presencial",
            numberHours: 7,
            startDate: "2023-10-03T13:00:00Z",
            objective: "Fundamentos de las matemáticas discretas",
            schedule: "5:00pm - 6:00pm",
            daysOfSession: "LU-MA-MI",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia. Proin eu eros...",
            temario: "... more maths",
            price: 120.30,
            teacherName: "Juan Ernesto Cevilla",
            teacherReview: "",
            paymentInfo: "",
            imageUrl: "https://artbreeder.b-cdn.net/imgs/6da98c5919c0315321cb540fd521.jpeg?width=256",
        },
        {
            _id: 'randomID',
            courseName: "Matematicas discretas",
            modality: "Presencial",
            numberHours: 7,
            startDate: "2023-10-03T13:00:00Z",
            objective: "Fundamentos de las matemáticas discretas",
            schedule: "5:00pm - 6:00pm",
            daysOfSession: "LU-MA-MI",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia. Proin eu eros...",
            temario: "... more maths",
            price: 120.30,
            teacherName: "Juan Ernesto Cevilla",
            teacherReview: "",
            paymentInfo: "",
            imageUrl: "https://artbreeder.b-cdn.net/imgs/6da98c5919c0315321cb540fd521.jpeg?width=256",
        },
        {
            _id: 'randomID',
            courseName: "Matematicas discretas",
            modality: "Presencial",
            numberHours: 7,
            startDate: "2023-10-03T13:00:00Z",
            objective: "Fundamentos de las matemáticas discretas",
            schedule: "5:00pm - 6:00pm",
            daysOfSession: "LU-MA-MI",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus at mi id lacinia.  Phasellus luctus at mi id lacinia. Proin eu eros...",
            temario: "... more maths",
            price: 120.30,
            teacherName: "Juan Ernesto Cevilla",
            teacherReview: "",
            paymentInfo: "",
            imageUrl: "https://artbreeder.b-cdn.net/imgs/6da98c5919c0315321cb540fd521.jpeg?width=256",
        },
    ];
    return (
    <div className="courses">
        <div className="courses-row">
            <h1>Oferta de cursos</h1>
        </div>

        <div className="courses-row filters">
            <BaseButton type="primary">Crear curso</BaseButton>
            <TextInput />
            <div className="courses-row">
                <BaseButton type="primary">Filtrar</BaseButton>
                <BaseButton type="primary">Ordenar Por</BaseButton>
            </div>
        </div>

        <div className="courses-row courses-section">
            {courses.map((course, i) => (
                <CourseCard key={i} {...course} />
            ))}
        </div>

        <div className="courses-row">

        </div>
    </div>
    );
};

export default Courses;