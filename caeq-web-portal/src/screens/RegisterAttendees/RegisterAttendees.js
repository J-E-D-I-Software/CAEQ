import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextInput from '../../components/inputs/TextInput/TextInput';
import { getGathering } from '../../client/Gathering/Gathering.GET';
import createAttendee from '../../client/Attendee/Attendee.POST';
import updateAttendee from '../../client/Attendee/Attendee.PATCH';
import { deleteAttendee } from '../../client/Attendee/Attendee.DELETE';
import { getAllAttendees } from '../../client/Attendee/Attendee.GET';
import { FireError, FireNotification } from '../../utils/alertHandler';
import { getAllArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.GET';
import PaginationNav from '../../components/pagination/PaginationNav';
import AttendeesRegistrationTable from '../../components/table/AttendeesRegistrationTable';
import './registerAttendees.scss';
import BaseButton from '../../components/buttons/BaseButton';

/**
 * CreateGathering component for creating or modifying attendees.
 *
 * @function
 */
const RegisterAttendees = () => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [architectUsers, setArchitectUsers] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [getArchitect, setArchitect] = useState('');
    const [getArchitectNumber, setArchitectNumber] = useState('');
    const [getArchitectAttendees, setArchitectAttendees] = useState('');
    const [getArchitectNumberAttendees, setArchitectNumberAttendees] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);
    const [attendeesPage, setAttendeesPage] = useState(1);
    const [data, setData] = useState({
        date: '',
        title: '',
        meetingLink: '',
        meetingTime: '',
        moreInfo: null,
    });

    const updateAttendeeData = async () => {
        try {
            const attendees = await getAllAttendees(
                `idGathering=${searchParams.id}&limit=100000`
            );

            setAttendees(attendees);

            let filters = '';
            filters += `&fullName[regex]=${getArchitect}&fields=fullName,collegiateNumber`;
            if (getArchitectNumber) filters += `&collegiateNumber=${getArchitectNumber}`;

            let architects = await getAllArchitectUsers(paginationPage, filters, 10);

            setArchitectUsers(architects);
        } catch (error) {}
    };

    /**
     * useEffect for loading attendees and architects based on search parameters and pagination.
     * @async
     * @returns {void}
     */
    useEffect(() => {
        updateAttendeeData();
    }, [paginationPage, getArchitect, getArchitectNumber]);

    /**
     * useEffect to reset pagination page when search parameters change.
     * @returns {void}
     */
    useEffect(() => {
        setPaginationPage(1);
    }, [getArchitect, getArchitectNumber]);

    /**
     * useEffect to reset attendees page when search parameters change.
     * @returns {void}
     */
    useEffect(() => {
        setAttendeesPage(1);
    }, [getArchitectAttendees, getArchitectNumberAttendees]);

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
                    navigate('/404');
                });
    }, []);

    /**
     * Handle the addition of a new attendee.
     *
     * @async
     * @param {Object} architect - The architect object representing the attendee.
     * @throws {Error} If an error occurs during the creation of the attendee.
     */
    const handleAddAttendee = async (architect) => {
        try {
            const attendee = await createAttendee({
                idGathering: searchParams.id,
                idArchitect: architect._id,
                attended: true,
                modality: architect.modality,
            });
            setAttendees((prev) => {
                return [
                    ...prev,
                    {
                        ...attendee,
                        idArchitect: architect,
                        modality: architect.modality,
                    },
                ];
            });
            FireNotification('Asistencia guardada');
        } catch (error) {
            FireError(error.response.data.message);
        }
    };

    /**
     * Handle the patch operation for an attendee.
     *
     * @async
     * @param {Object} architect - The architect object for whom the attendee needs to be updated.
     * @throws {Error} If an error occurs during the update operation.
     */
    const handlePatchAttendee = async (architect) => {
        const idAttendee = attendees.filter(
            (attendee) => attendee.idArchitect._id === architect._id
        )[0]._id;
        try {
            await updateAttendee(idAttendee, { modality: architect.modality });
            setAttendees((prev) => {
                return prev.map((val) => {
                    if (val._id === idAttendee) {
                        return { ...val, modality: architect.modality };
                    }
                    return val;
                });
            });
            FireNotification('Asistencia modificada.');
        } catch (error) {
            console.log(error);
            FireError(error.response.data.message);
        }
    };

    /**
     * Handle the deletion of an attendee.
     *
     * @async
     * @param {Object} architect - The architect object for whom the attendee needs to be deleted.
     * @throws {Error} If an error occurs during the delete operation.
     */
    const handleDeleteAttendee = async (architect) => {
        const idAttendee = attendees.filter(
            (attendee) => attendee.idArchitect._id === architect._id
        )[0]._id;
        try {
            await deleteAttendee(idAttendee);
            setAttendees((prev) => prev.filter((attn) => attn._id !== idAttendee));
            FireNotification('Asistencia eliminada');
        } catch (error) {
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

    /**
     * Handles the action of returning to the previous page in pagination.
     */
    const handleAttendeesPreviousPage = () => {
        if (attendeesPage > 1) {
            setAttendeesPage(attendeesPage - 1);
        }
    };

    /**
     * Handles the action of advancing to the next page in pagination.
     */
    const handleAttendeesNextPage = () => {
        setAttendeesPage(attendeesPage + 1);
    };

    return (
        <div className='create-course'>
            <div className='create-course--row'>
                <h1>Registrar asistencias a {data.title}</h1>
            </div>
            <BaseButton
                onClick={() =>
                    navigate(`/Asambleas/Asistencias/${useParams.id}#asistencias`)
                }>
                Asistencias
            </BaseButton>
            <div className='search-inputs'>
                <label>
                    <TextInput
                        getVal={getArchitect}
                        setVal={setArchitect}
                        placeholder='Buscar por nombre'
                    />
                </label>
                <label>
                    <TextInput
                        getVal={getArchitectNumber}
                        setVal={setArchitectNumber}
                        placeholder='Buscar por número'
                    />
                </label>
            </div>
            <div className='directory-row directory-pagination'>
                <PaginationNav
                    onClickBefore={handlePreviousPage}
                    onClickAfter={handleNextPage}
                    page={paginationPage}
                />
            </div>
            <div className='directory-row'>
                {architectUsers.length > 0 ? (
                    <div className='box-container'>
                        <AttendeesRegistrationTable
                            data={architectUsers.map((architect) => {
                                const attended = attendees.filter(
                                    (attendee) =>
                                        attendee.idArchitect._id == architect._id
                                );
                                architect.modality =
                                    attended.length > 0
                                        ? attended[0].modality
                                        : 'Presencial';
                                return architect;
                            })}
                            action={handleAddAttendee}
                            actionMessage='Agregar asistencia'
                            actionType='primary'
                            attendees={attendees.map(
                                (attendee) => attendee.idArchitect._id
                            )}
                        />
                    </div>
                ) : (
                    <p className='no-data-message'>No hay colegiados disponibles</p>
                )}
            </div>

            <div className='create-course--row' id='asistencias'>
                <h1>Asistencias de {data.title}</h1>
            </div>
            <div className='search-inputs'>
                <label>
                    <TextInput
                        getVal={getArchitectAttendees}
                        setVal={setArchitectAttendees}
                        placeholder='Buscar por nombre'
                    />
                </label>
                <label>
                    <TextInput
                        getVal={getArchitectNumberAttendees}
                        setVal={setArchitectNumberAttendees}
                        placeholder='Buscar por número'
                    />
                </label>
            </div>
            <div className='directory-row directory-pagination'>
                <PaginationNav
                    onClickBefore={handleAttendeesPreviousPage}
                    onClickAfter={handleAttendeesNextPage}
                    page={attendeesPage}
                />
            </div>
            <div className='directory-row'>
                {attendees.length > 0 ? (
                    <div className='box-container'>
                        <AttendeesRegistrationTable
                            data={attendees
                                .filter((attendee) => {
                                    const regexName = new RegExp(
                                        getArchitectAttendees,
                                        'i'
                                    );
                                    const isMatchName =
                                        attendee.idArchitect.fullName.match(regexName);

                                    const regexNumber = new RegExp(
                                        getArchitectNumberAttendees,
                                        'i'
                                    );
                                    const isMatchNumber =
                                        attendee.idArchitect.collegiateNumber
                                            .toString()
                                            .match(regexNumber);
                                    return isMatchName && isMatchNumber;
                                })
                                .slice(
                                    attendeesPage === 1 ? 0 : attendeesPage * 10,
                                    attendeesPage * 10 + 10
                                )
                                .map((attendee) => {
                                    attendee.idArchitect.modality = attendee.modality;
                                    return attendee.idArchitect;
                                })}
                            action={handleDeleteAttendee}
                            actionMessage='Eliminar'
                            actionType='fail'
                            handlePatchAttendee={handlePatchAttendee}
                            attendees={attendees.map(
                                (attendee) => attendee.idArchitect._id
                            )}
                        />
                    </div>
                ) : (
                    <p className='no-data-message'>No hay colegiados disponibles</p>
                )}
            </div>
        </div>
    );
};

export default RegisterAttendees;
