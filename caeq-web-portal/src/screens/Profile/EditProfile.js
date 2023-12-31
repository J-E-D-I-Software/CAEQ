import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import TextInput from '../../components/inputs/TextInput/TextInput';
import '../DirectoryArchitectDetail/DirectoryArchitectDetail.scss';
import BaseButton from '../../components/buttons/BaseButton';
import FileInput from '../../components/inputs/FileInput/FileInput';
import { updateArchitectUserByID } from '../../client/ArchitectUser/ArchitecUser.PATCH';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import DateInput from '../../components/inputs/DateInput/DateInput';

const ArchitectPersonalData = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [editedData, setEditedData] = useState({});
    const date = new Date(editedData.dateOfBirth);

    useEffect(() => {
        if (searchParams.id)
            getArchitectUserById(searchParams.id)
                .then((response) => {
                    setData(response);
                    setEditedData(response);
                })
                .catch((error) => FireError(error.response.data.message));
    }, []);

    /**
     * Handles the save changes functionality for the DirectoryArchitectDetails screen.
     * @async
     * @function handleSaveChanges
     * @param {Event} e - The event object.
     * @returns {Promise<void>}
     */

    const handleCancel = () => {
        navigate(`/Perfil`);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const dateBirth = new Date(editedData.dateOfBirth);
        if (dateBirth > currentDate) {
            FireError('Tu fecha de nacimiento no puede estar en el futuro.');
            return;
        }

        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const isValidEmail = emailRegex.test(editedData.email);
        if (!isValidEmail) {
            FireError('Por favor ingresa un correo electrónico válido.');
            return;
        }
        const form = new FormData();
        form.append('fullName', editedData.fullName); //Ya esta
        form.append('dateOfBirth', editedData.dateOfBirth); //Ya esta
        form.append('gender', editedData.gender); //Ya esta
        form.append('homeAddress', editedData.homeAddress); //Ya esta
        form.append('cellphone', editedData.cellphone); //Ya esta
        form.append('homePhone', editedData.homePhone); //Ya esta
        form.append('email', editedData.email); //Ya esta
        form.append('emergencyContact', editedData.emergencyContact); //Ya esta
        form.append('file', editedData.linkCV);

        e.preventDefault();

        const swal = FireLoading('Guardando cambios... por favor espere');
        try {
            const response = await updateArchitectUserByID(searchParams.id, form);
            setData(response.data);
            swal.close();
            FireSucess('Los cambios se han guardado correctamente');
            navigate('/Perfil');
        } catch (error) {
            swal.close();
            FireError(error.response.data.message);
            navigate('/Perfil');
        }
    };

    const gender = ['Hombre', 'Mujer', 'Prefiero no decirlo'];

    /**
     * Returns an array of member options excluding the currently edited member type.
     *
     * @function
     * @returns {Array} An array of member options.
     */
    const getGender = () => {
        const filteredOptions = gender.filter((option) => option !== editedData.gender);
        return filteredOptions;
    };

    return (
        <div className='architect-detail'>
            <div className='architect-row'>
                <h2>
                    {' '}
                    (i) Modifica la información que sea necesaria. Al terminar, haz clic
                    en guardar cambios.
                </h2>
            </div>
            <div className='architect-row'>
                <div className='architect-col'>
                    <TextInput
                        label='Nombre completo'
                        placeholder='Nombre completo'
                        getVal={editedData.fullName}
                        setVal={(value) =>
                            setEditedData({ ...editedData, fullName: value })
                        }
                    />

                    <DateInput
                        label='Fecha de nacimiento'
                        getVal={
                            editedData.dateOfBirth
                                ? editedData.dateOfBirth.split('T')[0]
                                : ''
                        }
                        setVal={(value) =>
                            setEditedData({ ...editedData, dateOfBirth: value })
                        }
                    />

                    <DropdownInput
                        label='Género'
                        placeholder={editedData.gender}
                        options={getGender()}
                        getVal={editedData.gender}
                        setVal={(value) =>
                            setEditedData({ ...editedData, gender: value })
                        }
                    />

                    <TextInput
                        label='Dirección'
                        placeholder='Dirección'
                        getVal={editedData.homeAddress}
                        setVal={(value) =>
                            setEditedData({ ...editedData, homeAddress: value })
                        }
                    />

                    <TextInput
                        label='Número celular'
                        placeholder='Número celular'
                        getVal={editedData.cellphone}
                        setVal={(value) =>
                            setEditedData({ ...editedData, cellphone: value })
                        }
                    />
                </div>
                <div className='architect-col'>
                    <TextInput
                        label='Número de casa'
                        placeholder='Número de casa'
                        getVal={editedData.homePhone}
                        setVal={(value) =>
                            setEditedData({ ...editedData, homePhone: value })
                        }
                    />

                    <TextInput
                        label='Correo electrónico'
                        placeholder='Correo electrónico'
                        getVal={editedData.email}
                        setVal={(value) => setEditedData({ ...editedData, email: value })}
                    />

                    <TextInput
                        label='Contacto de emergencia'
                        placeholder='Contacto de emergencia'
                        getVal={editedData.emergencyContact}
                        setVal={(value) =>
                            setEditedData({ ...editedData, emergencyContact: value })
                        }
                    />
                    <FileInput
                        label='Curriculum Vitae'
                        placeholder='CV'
                        getVal={editedData.linkCV}
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCV: value })
                        }
                    />
                    <p>
                        Archivo Actual:{' '}
                        <a href={editedData.linkCV}>
                            <span>Descargar CV</span>
                        </a>
                    </p>
                </div>
            </div>
            <div className='architect-row'>
                <BaseButton type='primary' className='button' onClick={handleSaveChanges}>
                    Guardar Cambios
                </BaseButton>
                <BaseButton type='cancel' className='button' onClick={handleCancel}>
                    Cancelar
                </BaseButton>
            </div>
        </div>
    );
};

export default ArchitectPersonalData;
