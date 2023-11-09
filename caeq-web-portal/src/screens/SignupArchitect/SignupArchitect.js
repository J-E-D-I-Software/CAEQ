import React, { useEffect, useState } from 'react';
import './signup.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import LargeTextInput from '../../components/inputs/TextInput/LargeTextInput';
import DateInput from '../../components/inputs/DateInput/DateInput';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import FileInput from '../../components/inputs/FileInput/FileInput';
import NumberInput from '../../components/inputs/NumberInput/NumberInput';
import Logo from '../../components/images/caeqLogo.png';
import BaseButton from '../../components/buttons/BaseButton';
import SelectInputComponent from '../../components/inputs/SelectInput/SelectInput';

import { Link, useNavigate } from 'react-router-dom';
import { postSignupArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.POST';
import { updateArchitectUserByID } from '../../client/ArchitectUser/ArchitecUser.PATCH';
import { getArchitectUserByColegiateNumber } from '../../client/ArchitectUser/ArchitectUser.GET';
import {
    FireError,
    FireSucess,
    FireLoading,
    FireQuestion,
} from '../../utils/alertHandler';
import { setToken, setUserType, setArchitectUserSaved } from '../../utils/auth';
import { getAllSpecialties } from '../../client/Specialties/Specialties.GET';

/**
 * Signup component for user registration.
 * @component
 *
 * @returns {JSX.Element} JSX element representing the Signup page.
 *
 * @example
 * // Example usage of Signup:
 * <Signup />
 */
const Signup = () => {
    const [fullName, setfullName] = useState('Edgar R');
    const [email, setEmail] = useState('test@example.com');
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [availableSpecialties, setAvailableSpecialties] = useState([]);

    const [DRONumber, setDRONumber] = useState('');
    const [collegiateNumber, setCollegiateNumber] = useState('1000');
    const [memberType, setMemberType] = useState('Miembro de número');
    const [classification, setClassification] = useState('Expresidente');
    const [gender, setGender] = useState('Hombre');
    const [cellphone, setCellphone] = useState('4272293948');
    const [homePhone, setHomePhone] = useState('4272293948');
    const [officePhone, setOfficePhone] = useState('4272293948');
    const [homeAddress, setHomeAdress] = useState('4272293948');
    const [workAddress, setWorkAddress] = useState('4272293948');
    const [emergencyContact, setEmergencyContact] = useState('4272293948');
    const [mainProfessionalActivity, setMainProfessionalActivity] = useState('4272293948');
    const [dateOfAdmission, setDateOfAdmission] = useState('2000');
    const [dateOfBirth, setDateOfBirth] = useState('2023-10-10');
    const [university, setUniversity] = useState('2023-10-10er');
    const [professionalLicense, setProfessionalLicense] = useState('2023-10-10');
    const [municipalityOfLabor, setMunicipalityOfLabor] = useState('2023-10-10');
    const [positionsInCouncil, setPositionsInCouncil] = useState('2023-10-10');
    const [linkCV, setLinkCV] = useState('');
    const [linkINE, setLinkINE] = useState('');
    const [linkCAEQCard, setLinkCAEQCard] = useState('');
    const [linkCURP, setLinkCURP] = useState('');
    const [linkProfesisonalLicense, setLinkProfesisonalLicense] = useState('');
    const [linkBachelorsDegree, setLinkBachelorsDegree] = useState('');
    const [linkAddressCertificate, setLinkAddressCertificate] = useState('');
    const [linkBirthCertificate, setLinkBirthCertificate] = useState('');
    const [authorizationToShareInfo, setAuthorizationToShareInfo] = useState('true');
    const [password, setPassword] = useState('password123');
    const [passwordConfirm, setConfirmPassword] = useState('password123'); // Nuevo estado para la confirmación de contraseña

    const options = ['Hombre', 'Mujer', 'Prefiero no decirlo'];
    const member = [
        'Miembro de número',
        'Miembro Adherente',
        'Miembro Pasante',
        'Miembro Vitalicio',
        'Miembro Honorario',
    ];
    const classif = ['Expresidente', 'Docente', 'Convenio', 'Ninguno'];
    const decide = ['SÍ', 'NO'];
    const navigate = useNavigate();

    /**
     * Handles user registration when the form is submitted.
     * @param {Object} e - The form submit event object.
     */

    useEffect(() => {
        (async () => {
            try {
                const specialties = await getAllSpecialties();

                const specialtiesOptions = specialties.map((specialty) => ({
                    label: specialty.name,
                    value: specialty._id,
                }));

                setAvailableSpecialties(specialtiesOptions);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            FireError('Por favor ingresa un correo electrónico válido.');
            return;
        }

        const form = new FormData();
        selectedSpecialties.forEach((specialty, i) => {
            form.append(`specialties[${i}]`, specialty.value);
        });
        form.append('fullName', fullName);
        form.append('email', email);
        form.append('DRONumber', DRONumber);
        form.append('collegiateNumber', collegiateNumber);
        form.append('memberType', memberType);
        form.append('classification', classification);
        form.append('gender', gender);
        form.append('cellphone', cellphone);
        form.append('homePhone', homePhone);
        form.append('officePhone', officePhone);
        form.append('workAddress', workAddress);
        form.append('homeAddress', homeAddress);
        form.append('emergencyContact', emergencyContact);
        form.append('mainProfessionalActivity', mainProfessionalActivity);
        form.append('dateOfAdmission', dateOfAdmission);
        form.append('dateOfBirth', dateOfBirth);
        form.append('university', university);
        form.append('professionalLicense', professionalLicense);
        form.append('municipalityOfLabor', municipalityOfLabor);
        form.append('positionsInCouncil', positionsInCouncil);
        form.append('linkINE', linkINE);
        form.append('passwordConfirm', passwordConfirm);
        form.append('password', password);
        const isAuthorized = authorizationToShareInfo === 'SÍ' ? true : false;
        form.append('authorizationToShareInfo', isAuthorized);

        if (linkCAEQCard) form.append('linkCAEQCard', linkCAEQCard);
        if (linkCV) form.append('linkCV', linkCV);
        if (linkCURP) form.append('linkCURP', linkCURP);
        if (linkProfesisonalLicense) form.append('linkProfesisonalLicense', linkProfesisonalLicense);
        if (linkBachelorsDegree) form.append('linkBachelorsDegree', linkBachelorsDegree);
        if (linkAddressCertificate) form.append('linkAddressCertificate', linkAddressCertificate);
        if (linkBirthCertificate) form.append('linkBirthCertificate', linkBirthCertificate);

        const swal = FireLoading('Registrando arquitecto...');

        // Check if user exists
        let user = null;
        try {
            user = await getArchitectUserByColegiateNumber(collegiateNumber);
        } catch (error) {
            FireError('Sucedió un error, por favor intente de nuevo');
        }
        if (user) {
            const continueSignUp = await FireQuestion(
                'Arquitecto ya existente',
                `El arquitecto con número de colegiado ${collegiateNumber} ya existe.
                ¿Es usted ${user.fullName}?
                ¿Desea continuar y actualizar con la información proporcionada?`
            );
            if (!continueSignUp.isConfirmed) return;
        }

        // Post user
        try {
            const response = await postSignupArchitectUsers(form);
            if (response.status === 'success') {
                const token = response.token;
                user = response.data.user;
                setUserType(token);
                setToken(token);
                setArchitectUserSaved(response.data.user);
            }
        } catch (error) {
            const message = error.response.data.message || 
                            error.response.data.error || 
                            'Error al crear usuario';
            FireError(message);
            return;
        }

        swal.close();
        FireSucess('Te has registrado con éxito');
        navigate('/Principal');
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <img src={Logo} alt='Logo' className='Logo' />
                <h1 className='h1-A'>Regístrate para acceder</h1>
                <form onSubmit={handleSignup}>
                    <div className='grid-container'>
                        <div className='column'>
                            <TextInput
                                label='Número de colegiado'
                                placeholder='Número de colegiado'
                                getVal={collegiateNumber}
                                setVal={setCollegiateNumber}
                                require={true}
                            />
                            <TextInput
                                label='Nombre completo'
                                placeholder='Nombre / Apellido paterno / Apellido materno'
                                getVal={fullName}
                                setVal={setfullName}
                                require={true}
                            />
                            <TextInput
                                label='Correo Electrónico'
                                placeholder='Su correo electrónico'
                                getVal={email}
                                setVal={setEmail}
                                require={true}
                            />
                            <HiddenTextInput
                                label='Contraseña'
                                placeholder='Su contraseña debe contar con al menos 8 caracteres'
                                getVal={password}
                                setVal={setPassword}
                                require={true}
                            />
                            <HiddenTextInput
                                label='Confirmar contraseña'
                                placeholder='Su contraseña debe contar con al menos 8 caracteres'
                                getVal={passwordConfirm}
                                setVal={setConfirmPassword}
                                require={true}
                            />
                            <TextInput
                                label='Número de DRO'
                                placeholder='Número de DRO (No obligatorio)'
                                getVal={DRONumber}
                                setVal={setDRONumber}
                                require={false}
                            />
                            <DropdownInput
                                label='Seleccione tipo de miembro'
                                options={member}
                                getVal={memberType}
                                setVal={setMemberType}
                                require={true}
                            />
                            <DropdownInput
                                label='Clasificación'
                                options={classif}
                                getVal={classification}
                                setVal={setClassification}
                                require={true}
                            />
                            <DropdownInput
                                label='Género'
                                options={options}
                                getVal={gender}
                                setVal={setGender}
                                require={true}
                            />
                            <TextInput
                                label='Número de teléfono celular'
                                placeholder='Número de teléfono celular'
                                getVal={cellphone}
                                setVal={setCellphone}
                                require={true}
                            />
                            <TextInput
                                label='Número de teléfono de casa'
                                placeholder='Número de teléfono de casa'
                                getVal={homePhone}
                                setVal={setHomePhone}
                                require={true}
                            />
                            <TextInput
                                label='Número de teléfono de oficina'
                                placeholder='Número de teléfono de oficina'
                                getVal={officePhone}
                                setVal={setOfficePhone}
                                require={true}
                            />
                            <LargeTextInput
                                label='Domicilio particular'
                                placeholder='Calle, Número, Colonia, Código postal'
                                getVal={homeAddress}
                                setVal={setHomeAdress}
                                require={true}
                            />
                            <LargeTextInput
                                label='Domicilio de trabajo'
                                placeholder='Calle, Número, Colonia, Código postal'
                                getVal={workAddress}
                                setVal={setWorkAddress}
                                require={true}
                            />
                        </div>
                        <div className='column-2'>
                            <TextInput
                                label='Contacto de emergencia (nombre completo y teléfono)'
                                placeholder='Contacto de emergencia (nombre completo y teléfono)'
                                getVal={emergencyContact}
                                setVal={setEmergencyContact}
                                require={true}
                            />
                            <TextInput
                                label='Actividad Principal Preponderante'
                                placeholder='Actividad Principal Preponderante'
                                getVal={mainProfessionalActivity}
                                setVal={setMainProfessionalActivity}
                                require={true}
                            />
                            <SelectInputComponent
                                label='Especialidades'
                                isMulti
                                options={availableSpecialties}
                                value={selectedSpecialties}
                                onChange={(selectedOptions) => {
                                    setSelectedSpecialties(selectedOptions);
                                }}
                                placeholder='Seleccione especialidades'
                            />
                            <NumberInput
                                label='Fecha de ingreso al colegio'
                                placeholder='Año (aaaa)'
                                getVal={dateOfAdmission}
                                setVal={setDateOfAdmission}
                                maxDigits={4}
                                require={true}
                            />
                            <DateInput
                                label='Fecha de nacimiento'
                                getVal={dateOfBirth}
                                setVal={setDateOfBirth}
                                require={true}
                            />
                            <TextInput
                                label='Universidad'
                                placeholder='Nombre de la universidad donde se graduó'
                                getVal={university}
                                setVal={setUniversity}
                                require={true}
                            />
                            <TextInput
                                label='Cédula profesional'
                                placeholder='Cédula profesional'
                                getVal={professionalLicense}
                                setVal={setProfessionalLicense}
                                require={true}
                            />
                            <TextInput
                                label='Municipio'
                                placeholder='Municipio de residencia'
                                getVal={municipalityOfLabor}
                                setVal={setMunicipalityOfLabor}
                                require={true}
                            />
                            <TextInput
                                label='Cargos en consejo directivo (fecha y nombre del cargo) / Ninguno'
                                placeholder='Cargos en consejo directivo (año y nombre del cargo) / Ninguno'
                                getVal={positionsInCouncil}
                                setVal={setPositionsInCouncil}
                            />
                            <FileInput
                                require
                                label='Adjuntar foto del INE (frente y reverso)'
                                getVal={linkINE}
                                setVal={setLinkINE}
                                accept='image/*,application/pdf'
                            />
                            <FileInput
                                label='Adjuntar Credencial CAEQ'
                                getVal={linkCAEQCard}
                                setVal={setLinkCAEQCard}
                                accept='image/*,application/pdf'
                            />
                            <FileInput
                                label='Adjuntar Currículum Vitae'
                                getVal={linkCV}
                                setVal={setLinkCV}
                                accept='image/*,application/pdf'
                            />
                            <FileInput
                                label='Adjuntar CURP'
                                getVal={linkCURP}
                                setVal={setLinkCURP}
                                accept='image/*,application/pdf'
                            />
                            <FileInput
                                label='Adjuntar Cédula Profesional'
                                getVal={linkProfesisonalLicense}
                                setVal={setLinkProfesisonalLicense}
                                accept='image/*,application/pdf'
                            />
                            <FileInput
                                label='Adjuntar Título Profesional'
                                getVal={linkBachelorsDegree}
                                setVal={setLinkBachelorsDegree}
                                accept='image/*,application/pdf'
                            />
                            <FileInput
                                label='Adjuntar comprobante de domicilio (no mayor a 3 meses)'
                                getVal={linkAddressCertificate}
                                setVal={setLinkAddressCertificate}
                                accept='image/*,application/pdf'
                            />
                            <FileInput
                                label='Adjuntar Acta de Nacimiento'
                                getVal={linkBirthCertificate}
                                setVal={setLinkBirthCertificate}
                                accept='image/*,application/pdf'
                            />
                            <DropdownInput
                                label='¿Autoriza compartir su información?'
                                options={decide}
                                getVal={authorizationToShareInfo}
                                setVal={setAuthorizationToShareInfo}
                                require={true}
                            />
                        </div>
                    </div>
                    <div className='button-container'>
                        <BaseButton type='primary' onClick={handleSignup}>
                            Registrarse
                        </BaseButton>
                        <Link to='/LoginUser'>
                            <BaseButton type='cancel'>Cancelar</BaseButton>
                        </Link>
                    </div>
                </form>
            </div>
            <div className='signup-image'></div>
        </div>
    );
};

export default Signup;
