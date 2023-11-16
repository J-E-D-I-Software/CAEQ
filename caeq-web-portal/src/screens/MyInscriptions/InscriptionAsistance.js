import BaseButton from '../../components/buttons/BaseButton';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import InscriptionCard from '../../components/cards/InscriptionCard';
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
    const [inscriptions, setInscriptions] = useState([]);
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
            setSession(data.sessions);
            setInscriptions(data.document);
        };
        try {
            fetchData();
        } catch (error) {
            FireError(error.response.data.message);
        }
    }, [filterSearchByName, filterModality]);

return (
        <div className="course"> {/* Cambié "classname" a "className" */}
            {inscriptions.map(inscription => (<div className='box-container'>
                <div className="course-row">
                    <CourseAttendee userId={inscription.user} data={session.filter(session => session.course == inscription.course._id)} />
                </div>
            </div>))}
        </div>
    );
};

export default InscriptionAsistance;