import BaseButton from '../../components/buttons/BaseButton';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import InscriptionCard from '../../components/cards/InscriptionCard';
import PaginationNav from '../../components/pagination/PaginationNav';
import './MyInscriptions.scss';
import { FireError } from '../../utils/alertHandler';
import { useState, useEffect } from 'react';
import { getMyInscriptions } from '../../client/Inscription/Inscription.GET';
import { useNavigate } from 'react-router-dom';

import RestrictByRole from '../../components/restrictAccess/RestrictByRole';

/**
 * Page that displays MyInscriptions.
 */
const MyInscription = (props) => {
    const [courses, setCourses] = useState([]);
    const [filterModality, setFilterModality] = useState('');
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [orderBy, setOrderBy] = useState('Fecha de inicio');
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationEnabled, setPaginationEnabled] = useState([true, true]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let filters = '';
            if (filterSearchByName)
                filters = `course.courseName[regex]=${filterSearchByName}`;
            if (filterModality) filters += `&modality=${filterModality}`;
            if (orderBy) {
                if (orderBy === 'Nombre (A-Z)') filters += `&sort=course.courseName`;
                else if (orderBy === 'Nombre (Z-A)')
                    filters += `&sort=-course.courseName`;
                else if (orderBy === 'Fecha de inicio')
                    filters += `&sort=course.startDate`;
            }

            const data = await getMyInscriptions(paginationPage, filters);

            setCourses(data);
            if (paginationPage === 1 && data.length) setPaginationEnabled([false, true]);
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
    }, [filterSearchByName, filterModality, orderBy, paginationPage]);

    return (
        <div className="courses">
            <div className="courses--row">
                <h1>Mis Cursos Inscritos</h1>
            </div>
            <div className="courses--row courses__filters">
                <RestrictByRole allowedRoles={['architect']}>
                    <BaseButton type="primary" onClick={() => navigate('/MisCursos')}>
                        Mis Asistencias a cursos
                    </BaseButton>
                </RestrictByRole>

                <TextInput
                    label="Buscar"
                    placeholder="Por nombre"
                    getVal={filterSearchByName}
                    setVal={setFilterSearchByName}
                />

                <div className="courses--row">
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
                {courses.map((mycourse, i) => (
                    <InscriptionCard key={i} {...mycourse} />
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

export default MyInscription;
