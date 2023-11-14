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

/**
 * CreateGathering component for creating or modifying gatherings.
 *
 * @function
 */
const CreateGathering = () => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [moreInfo, setMoreInfo] = useState(null);
    const [data, setData] = useState({
        date: '',
        title: '',
        meetingLink: 'https://zoom.com/',
        meetingTime: '',
        moreInfo: null,
    });

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

        const [year, month, day] = data.date.split('-');
        data.year = year;
        data.month = month;
        data.day = day;

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

    return (
        <div className='create-course'>
            <div className='create-course--row'>
                <h1>{searchParams.id ? 'Modificar' : 'Crear'} asamblea</h1>
            </div>

            <div className='create-course--row'>
                <div className='create-course--col--gathering'>
                    <GatheringCard data={data} />
                </div>
                <div className='create-course--col--gathering-form'>
                    <TextInput
                        label='Título de asamblea'
                        getVal={data.title}
                        setVal={(value) => updateData('title', value)}
                    />
                    <DateInput
                        label='Día de la semana'
                        getVal={data.date}
                        setVal={(value) => updateData('date', value)}
                        require
                    />
                    <TextInput
                        label='Liga de la asamblea'
                        getVal={data.meetingLink}
                        setVal={(value) => updateData('meetingLink', value)}
                        placeholder='https://zoom.com/'
                    />
                    <TextInput
                        label='Hora de asamblea'
                        getVal={data.meetingTime}
                        setVal={(value) => updateData('meetingTime', value)}
                        placeholder='5:00PM a 6:00pm'
                    />
                    <FileInput
                        label='Convocatoria'
                        accept='.pdf'
                        getVal={moreInfo}
                        setVal={setMoreInfo}
                    />

                    <BaseButton type='primary' onClick={(e) => onSubmit(e)}>
                        {searchParams.id ? 'Guardar asamblea' : 'Crear asamblea'}
                    </BaseButton>
                </div>
            </div>
        </div>
    );
};

export default CreateGathering;
