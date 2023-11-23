import BaseButton from '../../components/buttons/BaseButton';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import InscriptionCard from '../../components/cards/InscriptionCard';
import PaginationNav from '../../components/pagination/PaginationNav';
import { FireError } from '../../utils/alertHandler';
import { useState, useEffect } from 'react';
import { getMyInscriptions } from '../../client/Inscription/Inscription.GET';
import { useNavigate } from 'react-router-dom';
import "./MyInscriptions.scss";

const MyInscription = (props) => {
    const [courses, setCourses] = useState([]);
    const [filterModality, setFilterModality] = useState('');
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationEnabled, setPaginationEnabled] = useState([true, true]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let filters = '';
            if (filterSearchByName) filters = `courseName[regex]=${filterSearchByName}`;
            if (filterModality) filters += `&modality=${filterModality}`;

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
    }, [filterSearchByName, filterModality, paginationPage]);

    return (
        <div className='inscription'>
            <div className='inscription--row'>
                <h1>Mis Cursos Inscritos</h1>
            </div>
            <div className='inscription--row inscription__filters'>
                <BaseButton type='primary' onClick={() => navigate('/AsistenciasCursos')}>
                    Mis Asistencias a cursos
                </BaseButton>

                <TextInput
                    label='Buscar'
                    placeholder='Por nombre'
                    getVal={filterSearchByName}
                    setVal={setFilterSearchByName}
                />

                <div className='inscription--row'>
                    <DropdownInput
                        label='Filtrar'
                        getVal={filterModality}
                        setVal={setFilterModality}
                        options={['Presencial', 'Remoto']}
                        placeholder='Filtrar modalidad'
                    />
                </div>
            </div>

            <div className='inscription--row inscription__inscription-section'>
                {courses.map((mycourse, i) => (
                    <InscriptionCard key={i} {...mycourse} />
                ))}
            </div>

            <div className='inscription--row inscription__inscription-pagination'>
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
