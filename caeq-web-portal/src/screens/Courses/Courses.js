import BaseButton from '../../components/buttons/BaseButton';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import CourseCard from '../../components/cards/CourseCard';
import DateRangeInput from '../../components/inputs/DateInput/DateRangeInput';
import PaginationNav from '../../components/pagination/PaginationNav';
import './courses.scss';
import { FireError } from '../../utils/alertHandler';
import { getCurrentDate } from '../../utils/format';
import { useState, useEffect } from 'react';
import { getAllCourses } from '../../client/Course/Course.GET';
import { useNavigate } from 'react-router-dom';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';
import { getUserType } from '../../utils/auth';

/**
 * Page that displays the courses.
 */
const Courses = (props) => {
    let startingDate = getCurrentDate();
    if (getUserType() === 'architect') startingDate = getCurrentDate(-1);
    console.log(startingDate);
    startingDate = getCurrentDate(-1);
    const [courses, setCourses] = useState([]);
    const [filterModality, setFilterModality] = useState('');
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [orderBy, setOrderBy] = useState('Fecha de inicio');
    const [filterDate, setFilterDate] = useState([startingDate, '']);
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationEnabled, setPaginationEnabled] = useState([true, true]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let filters = '';
            if (filterSearchByName) filters = `courseName[regex]=${filterSearchByName}`;
            if (filterModality) filters += `&modality=${filterModality}`;
            if (orderBy) {
                if (orderBy === 'Nombre (A-Z)') filters += `&sort=courseName`;
                else if (orderBy === 'Nombre (Z-A)') filters += `&sort=-courseName`;
                else if (orderBy === 'Fecha de inicio') filters += `&sort=startDate`;
            }
            if (filterDate[0]) filters += `&startDate[gte]=${filterDate[0]}`;
            if (filterDate[1]) filters += `&startDate[lte]=${filterDate[1]}`;

            const data = await getAllCourses(paginationPage, filters);
            setCourses(data);
            if (paginationPage === 1 && data.length)
                setPaginationEnabled([false, true]);
            else if (paginationPage === 1 && !data.length)
                setPaginationEnabled([false, false]);
            else if (paginationPage > 1 && !data.length)
                setPaginationEnabled([true, false]);
            else if (paginationPage > 1 && data.length)
                setPaginationEnabled([true, true]);
            else setPaginationEnabled([true, true]);
        };
        try {
            fetchData();
        } catch (error) {
            FireError(error.response.data.message);
        }
    }, [filterSearchByName, filterModality, orderBy, filterDate, paginationPage]);

    return (
        <div className="courses">
            <div className="courses--row courses__header">
                <h1>Oferta de cursos</h1>
                <div className="courses--row">
                    <RestrictByRole allowedRoles={['caeq']}>
                        <BaseButton
                            type="primary"
                            className="accept-payment"
                            onClick={() => navigate('/AcceptPayment')}
                        >
                            Ver solicitudes de pago
                        </BaseButton>
                        <BaseButton type="primary" onClick={() => navigate('/Cursos/Curso')}>
                            Crear curso
                        </BaseButton>
                    </RestrictByRole>
                </div>
            </div>

            <div className="courses--row courses__filters">
                <RestrictByRole allowedRoles={['architect']}>
                    <BaseButton type="secondary" onClick={() => navigate('/MisCursos')}>
                        Mis Inscripciones
                    </BaseButton>
                </RestrictByRole>
                <TextInput
                    label="Buscar"
                    placeholder="Por nombre"
                    getVal={filterSearchByName}
                    setVal={setFilterSearchByName}
                />

                <div className="courses--row">
                    <RestrictByRole allowedRoles={['caeq']}>
                        <DateRangeInput 
                            label='Rango de fechas'
                            startVal={filterDate[0]}
                            endVal={filterDate[1]}
                            setStartVal={(val) => setFilterDate([val, filterDate[1]])}
                            setEndVal={(val) => setFilterDate([filterDate[0], val])}
                        />
                    </RestrictByRole>

                    <DropdownInput
                        label="Filtrar"
                        getVal={filterModality}
                        setVal={setFilterModality}
                        options={['Presencial', 'Remoto']}
                        placeholder="Filtrar modalidad"
                    />

                    <DropdownInput
                        label="Ordenar"
                        getVal={orderBy}
                        setVal={setOrderBy}
                        options={['Nombre (A-Z)', 'Nombre (Z-A)', 'Fecha de inicio']}
                        placeholder="Ordenar"
                    />
                </div>
            </div>

            <div className="courses--row courses__courses-section">
                {courses.map((course, i) => (
                    <CourseCard key={i} {...course} />
                ))}
            </div>

            <div className="courses--row courses__courses-pagination">
                <PaginationNav 
                    page={paginationPage}
                    onClickBefore={() => setPaginationPage(paginationPage - 1)}
                    onClickAfter={() => setPaginationPage(paginationPage + 1)}
                    beforeBtnEnabled={paginationEnabled[0]}
                    afterBtnEnabled={paginationEnabled[1]}
                />
            </div>
        </div>
    );
};

export default Courses;
