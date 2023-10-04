import BaseButton from '../../components/buttons/BaseButton';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import CourseCard from '../../components/cards/CourseCard';
import PaginationNav from '../../components/pagination/PaginationNav';
import '../../styles/courses.scss';
import { FireError } from '../../utils/alertHandler';
import { useState, useEffect } from 'react';
import { getAllCourses } from '../../client/Course/Course.GET';
import { useNavigate } from 'react-router-dom';

const Courses = (props) => {
    const [courses, setCourses] = useState([]);
    const [filterModality, setFilterModality] = useState('');
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let filters = '';
            if (filterSearchByName) filters = `courseName[regex]=${filterSearchByName}`;
            if (filterModality) filters += `&modality=${filterModality}`;
            if (orderBy) {
                if (orderBy === 'Nombre (A-Z)') filters += `&sort=courseName`;
                if (orderBy === 'Nombre (Z-A)') filters += `&sort=-courseName`;
                else if (orderBy === 'Fecha de creación') filters += `&sort=_id`;
            }

            const data = await getAllCourses(paginationPage, filters);
            setCourses(data);
        };
        try {
            fetchData();
        } catch (error) {
            FireError(error.response.data.message);
        }
    }, [filterSearchByName, filterModality, orderBy]);

    return (
        <div className='courses'>
            <div className='courses-row'>
                <h1>Oferta de cursos</h1>
            </div>

            <div className='courses-row courses-filters'>
                <BaseButton type='primary' onClick={() => navigate('/Cursos/Curso')}>
                    Crear curso
                </BaseButton>
                <TextInput
                    placeholder='Buscar'
                    getVal={filterSearchByName}
                    setVal={setFilterSearchByName}
                />

                <div className='courses-row'>
                    <DropdownInput
                        getVal={filterModality}
                        setVal={setFilterModality}
                        options={['Presencial', 'Remoto']}
                        placeholder='Filtrar modalidad'
                    />

                    <DropdownInput
                        getVal={orderBy}
                        setVal={setOrderBy}
                        options={['Nombre (A-Z)', 'Nombre (Z-A)', 'Fecha de creación']}
                        placeholder='Ordenar'
                    />
                </div>
            </div>

            <div className='courses-row courses-section'>
                {courses.map((course, i) => (
                    <CourseCard key={i} {...course} />
                ))}
            </div>

            <div className='courses-row courses-pagination'>
                <PaginationNav page={paginationPage} />
            </div>
        </div>
    );
};

export default Courses;
