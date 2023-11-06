import { useEffect, useState } from 'react';
import TextInput from '../../components/inputs/TextInput/TextInput';
import FileInput from '../../components/inputs/FileInput/FileInput';
import NumberInput from '../../components/inputs/NumberInput/NumberInput';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import { useParams } from 'react-router-dom';
import BaseButton from '../../components/buttons/BaseButton';
import createRoom from '../../client/Services/Services.POST';
import './createRoom.scss';

import { Link, useNavigate } from 'react-router-dom';
import { getRoom } from '../../client/Services/Services.GET';

const CreateRoomOffer = () => {
    const searchParams = useParams();
    const [data, setData] = useState({
        name: '',
        cost: '',
        capacity: '',
        specifications: '',
        imageUrl: null,
    })
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (searchParams.id) {
            getRoom(searchParams.id)
                .then((response) => {
                    
                    setData(response);
                })
        }
    }, []);

    const updateData = (key, value) => {
        setData({ ...data, [key]: value });
    };

    const onSubmit = async (event) => {
        if (!data.name) {
            FireError('El salón debe tener un nombre');
            return;
        }
        if (!data.cost) {
            FireError('El salón debe tener un costo');
            return;
        }
        if (!data.capacity) {
            FireError('El salón debe tener una capacidad de personas');
            return;
        }
        if (!/^\d+$/.test(data.capacity)) {
            FireError('La capacidad debe ser un número entero válido.');
            return;
        }
        event.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach((entry) => formData.append(entry[0], entry[1]));

        if (imageUrl) formData.set('imageUrl', imageUrl);

        let response = null;
        const swal = FireLoading('Guardando...');
        try {
            response = await createRoom(formData);

            swal.close();
            FireSucess('Oferta de salón guardada');
        }
        catch (error) {
            console.error(error);
            swal.close();
            FireError(error.response.data.message);
        }       
        
    };

    return (
        <div className='room-container'>
            <div className='room-title'>
                <h1>{searchParams.id ? 'Modificar' : 'Crear'} Oferta de salón</h1>

            </div>

            <div className='room-content'>
                <div className='room-input'>
                    <TextInput
                        require
                        label='Nombre del salón'
                        getVal={data.name}
                        setVal={(value) => updateData('name', value)}
                    />
                    <NumberInput
                        require
                        label='Costo'
                        getVal={data.cost}
                        setVal={(value) => updateData('cost', value)}
                        maxDigits={10}
                    />
                    <NumberInput
                        require
                        label='Capacidad'
                        getVal={data.capacity}
                        setVal={(value) => updateData('capacity', value)}
                        maxDigits={10}
                    />
                    <TextInput
                        label='Especificaciones'
                        getVal={data.specifications}
                        setVal={(value) => updateData('specifications', value)}
                    />
                    <FileInput
                        label='Foto del salón'
                        getVal={imageUrl}
                        setVal={setImageUrl}
                        accept= '.jpg, .jpeg'
                    />
                
                </div>
                <div className='room-buttons'>
                    <BaseButton type= "primary" onClick={(e) => onSubmit(e)}>
                            {searchParams.id ? 'Guardar salón' : 'Crear salón'}
                        </BaseButton>
                        <Link to='/Servicios'>
                                <BaseButton type='cancel'>Cancelar</BaseButton>
                        </Link>
                </div>
            </div>
        </div>
    );

};

export default CreateRoomOffer;