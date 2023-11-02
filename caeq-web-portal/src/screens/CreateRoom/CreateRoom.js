import { useEffect, useState } from 'react';
import TextInput from '../../components/inputs/TextInput/TextInput';
import FileInput from '../../components/inputs/FileInput/FileInput';
import NumberInput from '../../components/inputs/NumberInput/NumberInput';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import { useParams } from 'react-router-dom';
import BaseButton from '../../components/buttons/BaseButton';


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

        event.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach((entry) => formData.append(entry[0], entry[1]));

        if (imageUrl) formData.set('imageUrl', imageUrl);

        let response = null;
        const swal = FireLoading('Guardando...');
        try {
            if (searchParams.id)
                response = await updateRoom(searchParams.id, formData);
            else response = await createRoom(formData);

            swal.close();
            FireSucess('Oferta de salón guardada');
        }
        catch (error) {
            swal.close();
            FireError(error.response.data.message);
        }       
        
    };

    return (
        <div>
            <div>
                <h1>{searchParams.id ? 'Modificar' : 'Crear'} oferta de salón</h1>

            </div>

            <div>
                <div>
                    <TextInput
                        label='Nombre del salón'
                        getVal={data.name}
                        setVal={(value) => updateData('name', value)}
                    />
                    <NumberInput
                        label='Costo'
                        getVal={data.cost}
                        setVal={(value) => updateData('cost', value)}
                    />
                    <NumberInput
                        label='Capacidad'
                        getVal={data.capacity}
                        setVal={(value) => updateData('capacity', value)}
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
                    />

                    <BaseButton type= "primary" onClick={(e) => onSubmit(e)}>
                        {searchParams.id ? 'Guardar asamblea' : 'Crear asamblea'}
                    </BaseButton>

                </div>
            </div>
        </div>
    );

};

export default CreateRoomOffer;