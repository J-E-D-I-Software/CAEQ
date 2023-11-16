import BaseButton from '../../components/buttons/BaseButton';
import PaginationNav from '../../components/pagination/PaginationNav';
import './MyInscriptions.scss';
import { FireError } from '../../utils/alertHandler';
import { useState, useEffect } from 'react';
import { getMyInscriptionswithSessions } from '../../client/Inscription/Inscription.GET';
import { getAttendee } from '../../client/Attendee/Attendee.GET';
import { getAllSessions, getSession } from '../../client/Course/Session.GET';
import { useNavigate } from 'react-router-dom';
import CourseAttendee from '../../components/table/courseAttendee';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';


const InscriptionAsistance = (props) => {
    const [architectUsers, setArchitectUsers] = useState([]);
    const [session, setSession] = useState([]);
    const [inscription, setInscription] = useState([]);
    const [filterModality, setFilterModality] = useState('');
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);
    //const [orderBy, setOrderBy] = useState('modality');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let filters = '';
            if (filterSearchByName) filters = `courseName[regex]=${filterSearchByName}`;
            if (filterModality) filters += `&modality=${filterModality}`;

            const data = await getMyInscriptionswithSessions(paginationPage, filters);
            console.log(data);
            setSession(data);
        };
        try {
            fetchData();
        } catch (error) {
            FireError(error.response.data.message);
        }
    }, [filterSearchByName, filterModality]);

    return (
        <div className="course"> {/* Cambié "classname" a "className" */}
            <div className="course-row">
                {
                    console.log(session)}{
                session.length > 0 ? (
                    <div className='box-container'>
                        <CourseAttendee data={session} />
                    </div>
                ) : (
                    <p className='no-data-message'>No hay sesiones actuales</p>
                )}
            </div>
        </div>
    );
};

export default InscriptionAsistance;