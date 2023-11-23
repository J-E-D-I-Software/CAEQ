import ProfileIcon from '../components/icons/ProfileIcon.svg'
import CursosIcon from '../components/icons/CourseIcon.svg'
import AsambleasIcon from '../components/icons/AsambleasIcon.svg'
import ServiciosIcon from '../components/icons/ServicesIcon.svg'
import BenefitsIcon from '../components/icons/BenefitsIcon.png'

const info = [
    {
        path: "/Perfil",
        title: "Perfil",
        icon: ProfileIcon,
        description: "En esta sección podrá visualizar sus datos personales, información del colegio y su información profesional. Así como sus asistencias a asambleas desde el año 2010 hasta el mes vigente. Adicional podrá consultar sus horas de capacitación y editar su información personal.",
        cardType: "profile"
    },
    {
        path: "/Asambleas",
        title: "Asambleas",
        icon: AsambleasIcon,
        description: "En esta sección podrá visualizar las convocatorias a las próximas asambleas del colegio.",
        cardType: "asambleas"
    },
    {
        path: "/Cursos",
        title: "Cursos",
        icon: CursosIcon,
        description: "En este sección podrá visualizar los próximos cursos impartidos por el colegio, inscribirse a ellos y visualizar sus asistencias a cada uno.",
        cardType: "cursos"
    },
    {
        path: "/ServiciosA",
        title: "Servicios",
        icon: ServiciosIcon,
        description: "En esta sección podrá cotizar sus bitácoras de obra y visualizar la oferta de salones en renta.",
        cardType: "servicios"
    },
    // {
    //     path: "/Beneficios",
    //     title: "Beneficios",
    //     icon: BenefitsIcon,
    //     description: "En esta sección podrá visualizar la oferta de salones en renta.",
    //     cardType: "beneficios"
    // },
]

export default info;