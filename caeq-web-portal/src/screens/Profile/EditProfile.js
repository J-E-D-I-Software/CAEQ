import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArchitectUserById } from '../../client/ArchitectUser/ArchitectUser.GET';
import { FireError, FireLoading, FireSucess } from '../../utils/alertHandler';
import { resizeImage } from '../../utils/files';
import TextInput from '../../components/inputs/TextInput/TextInput';
import '../DirectoryArchitectDetail/DirectoryArchitectDetail.scss';
import BaseButton from '../../components/buttons/BaseButton';
import FileInput from '../../components/inputs/FileInput/FileInput';
import {
    updateArchitectUserByID,
    updateArchitectUserFileByID,
} from '../../client/ArchitectUser/ArchitecUser.PATCH';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import DateInput from '../../components/inputs/DateInput/DateInput';

const ArchitectPersonalData = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        if (searchParams.id)
            getArchitectUserById(searchParams.id)
                .then((response) => {
                    setEditedData(response);
                })
                .catch((error) => FireError(error.response.data.message));
    }, []);

    /**
     * Handles the save changes functionality for the DirectoryArchitectDetails screen.
     * @async
     * @function handleCancel
     * @param {Event} e - The event object.
     * @returns {Promise<void>}
     */
    const handleCancel = () => {
        navigate(`/Perfil`);
    };

    /**
     * Handles the save changes functionality for the DirectoryArchitectDetails screen.
     * @async
     * @function handleSaveChanges
     * @param {Event} e - The event object.
     * @returns {Promise<void>}
     */
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const swal = FireLoading('Guardando cambios... por favor espere');

        const filesToUpload = [
            'linkINE',
            'linkCV',
            'linkCAEQCard',
            'linkCURP',
            'linkProfessionalLicense',
            'linkBachelorsDegree',
            'linkAddressCertificate',
            'linkBirthCertificate',
        ];
        const fieldsToUpdate = [
            'fullName',
            'dateOfBirth',
            'gender',
            'homeAddress',
            'cellphone',
            'homePhone',
            'email',
            'emergencyContact',
        ];

        // We don't want to update all fields, just the ones available in the form
        const filteredData = {};
        for (const field of Object.keys(editedData)) {
            if ([...fieldsToUpdate, ...filesToUpload].includes(field)) {
                filteredData[field] = editedData[field];
            }
        }

        // Prevent blank values
        const mapDisplayName = {
            fullName: 'nombre',
            dateOfBirth: 'fecha de nacimiento',
            gender: 'género',
            homeAddress: 'dirección',
            cellphone: 'número celular',
            homePhone: 'número de casa',
            email: 'correo electrónico',
            emergencyContact: 'contacto de emergencia',
        };
        for (let i = 0; i < Object.keys(filteredData).length; i++) {
            const key = Object.keys(filteredData)[i];
            const value = filteredData[key];
            if ((value == null || value === '') && !filesToUpload.includes(key)) {
                console.log(key);
                FireError(`El campo ${mapDisplayName[key]} no puede estar vacío.`);
                return;
            }
        }

        // Prevent invalid values
        const currentDate = new Date();
        const dateBirth = new Date(filteredData.dateOfBirth);
        if (dateBirth > currentDate) {
            FireError('La fecha de nacimiento no puede ser mayor a la fecha actual.');
            return;
        }

        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const isValidEmail = emailRegex.test(filteredData.email);
        if (!isValidEmail) {
            FireError('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Update the architect user
        const form = new FormData();
        for (const field of fieldsToUpdate) {
            form.append(field, filteredData[field]);
        }

        try {
            await updateArchitectUserByID(searchParams.id, form);
        } catch (error) {
            swal.close();
            FireError(error.response.data.message);
            return;
        }

        // Update the files
        for (const field of filesToUpload) {
            let file = filteredData[field];
            if (file && file !== '-' && typeof file !== 'string') {
                // If file size is over 5mb we have to compress it for the backend
                if (file.type?.includes('image') && file.size > 3000000) {
                    file = await resizeImage(file);
                }

                const form = new FormData();
                form.append(field, file);
                try {
                    const response = await updateArchitectUserFileByID(
                        searchParams.id,
                        form
                    );
                    if (response.status !== 'success')
                        throw new Error('Error al subir archivo');
                } catch (error) {
                    swal.close();
                    FireError(`Error al subir el archivo ${field}`);
                    return;
                }
            }
        }

        swal.close();
        FireSucess('Los cambios se han guardado correctamente');
        navigate('/Perfil');
    };

    /**
     * Returns an array of member options excluding the currently edited member type.
     *
     * @function
     * @returns {Array} An array of member options.
     */
    const getGender = () => {
        const gender = ['Hombre', 'Mujer', 'Prefiero no decirlo'];
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
                </div>
                <div className='architect-col'>
                    <FileInput
                        label='Adjuntar foto del INE (frente y reverso)'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkINE: value })
                        }
                    />
                    <FileInput
                        label='Adjuntar Credencial CAEQ'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCAEQCard: value })
                        }
                    />
                    <FileInput
                        label='Adjuntar Currículum Vitae'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCV: value })
                        }
                    />
                    <FileInput
                        label='Adjuntar CURP'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkCURP: value })
                        }
                    />
                    <FileInput
                        label='Adjuntar Cédula Profesional'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                linkProfessionalLicense: value,
                            })
                        }
                    />
                    <FileInput
                        label='Adjuntar Título Profesional'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkBachelorsDegree: value })
                        }
                    />
                    <FileInput
                        label='Adjuntar comprobante de Domicilio'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({
                                ...editedData,
                                linkAddressCertificate: value,
                            })
                        }
                    />
                    <FileInput
                        label='Adjuntar Acta de Nacimiento'
                        accept='image/*,application/pdf'
                        setVal={(value) =>
                            setEditedData({ ...editedData, linkBirthCertificate: value })
                        }
                    />
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
