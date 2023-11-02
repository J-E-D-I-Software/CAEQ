import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextInput from '../../components/inputs/TextInput/TextInput';
import FileInput from '../../components/inputs/FileInput/FileInput';
import { getGathering } from '../../client/Gathering/Gathering.GET';
import createGathering from '../../client/Gathering/Gathering.POST';
import updateGathering from '../../client/Gathering/Gathering.PATCH';
import BaseButton from '../../components/buttons/BaseButton';
import GatheringCard from '../../components/cards/GatheringCard';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';
import DateInput from '../../components/inputs/DateInput/DateInput';
import { getAllArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.GET';
import PaginationNav from '../../components/pagination/PaginationNav';
import AttendeesRegistrationTable from '../../components/table/AttendeesRegistrationTable';

/**
 * CreateGathering component for creating or modifying gatherings.
 *
 * @function
 */
const RegisterAttendees = () => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [architectUsers, setArchitectUsers] = useState([]);
    const [getArchitect, setArchitect] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);
    const [moreInfo, setMoreInfo] = useState(null);
    const [data, setData] = useState({
        date: '',
        title: '',
        meetingLink: '',
        meetingTime: '',
        moreInfo: null,
    });

    useEffect(() => {
        (async () => {
            try {
                let filters = '';
                filters += `fullName[regex]=${getArchitect}&fields=fullName,collegiateNumber`;
                let architects = await getAllArchitectUsers(paginationPage, filters, 10);
                console.log(architects);
                setArchitectUsers(architects);
                console.log(architects);
            } catch (error) {}
        })();
    }, [paginationPage, getArchitect]);

    /**
     * Fetches gathering data when the component mounts.
     *
     * @function
     */
    useEffect(() => {
        if (searchParams.id)
            getGathering(searchParams.id)
                .then((response) => {
                    if (response.date) response.date = response.date.slice(0, 10);

                    setData(response);
                })
                .catch((err) => {
                    console.log(err.message);
                    navigate('/404');
                });
    }, []);

    /**
     * Updates the state with the given value for the given key
     *
     * @param {string} key - the name of the field to be updated
     * @param {string} value - the new value of the field
     */
    const updateData = (key, value) => {
        setData({ ...data, [key]: value });
    };

    /**
     * Creates or updates whatever is in the data state to the Course model in the backend
     *
     * @param {Event} event - event sent by the triggered element
     */
    const onSubmit = async (event) => {
        if (!data.date) {
            FireError('Una asamblea debe tener al menos una fecha');
            return;
        }

        event.preventDefault();

        // Build FormData
        const formData = new FormData();
        Object.entries(data).forEach((entry) => formData.append(entry[0], entry[1]));

        if (moreInfo) formData.set('moreInfo', moreInfo);

        let response = null;
        const swal = FireLoading('Guardando...');
        try {
            if (searchParams.id)
                response = await updateGathering(searchParams.id, formData);
            else response = await createGathering(formData);

            if (!response._id) throw 'Error: ' + response;

            swal.close();
            FireSucess('Asamblea guardada');
        } catch (error) {
            swal.close();
            FireError(error.response.data.message);
        }
    };

    /**
     * Handles the action of returning to the previous page in pagination.
     */
    const handlePreviousPage = () => {
        if (paginationPage > 1) {
            setPaginationPage(paginationPage - 1);
        }
    };

    /**
     * Handles the action of advancing to the next page in pagination.
     */
    const handleNextPage = () => {
        setPaginationPage(paginationPage + 1);
    };

    return (
        <div className='create-course'>
            <div className='create-course--row'>
                <h1>Registrar asistencias a asambleas</h1>
            </div>
            <label>
                <TextInput
                    getVal={getArchitect}
                    setVal={setArchitect}
                    placeholder='Buscar por nombre'
                />
            </label>
            <label>
                <TextInput
                    getVal={getArchitect}
                    setVal={setArchitect}
                    placeholder='Buscar por número'
                />
            </label>
            <div className='directory-row'>
                {architectUsers.length > 0 ? (
                    <div className='box-container'>
                        <AttendeesRegistrationTable data={architectUsers} />
                    </div>
                ) : (
                    <p className='no-data-message'>No hay colegiados disponibles</p>
                )}
            </div>
            <div className='directory-row directory-pagination'>
                <PaginationNav
                    onClickBefore={handlePreviousPage}
                    onClickAfter={handleNextPage}
                    page={paginationPage}
                />
            </div>
        </div>
    );
};

export default RegisterAttendees;
