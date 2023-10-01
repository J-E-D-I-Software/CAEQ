import React, { useState } from 'react';
import './signup.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import HiddenTextInput from '../../components/inputs/TextInput/HiddenTextInput';
import LargeTextInput from '../../components/inputs/TextInput/LargeTextInput';
import DateInput from '../../components/inputs/DateInput/DateInput';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import FileInput from '../../components/inputs/FileInput/FileInput';
import Logo from '../../components/images/caeqLogo.png';
import BaseButton from '../../components/buttons/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { postSignupArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.POST';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';
import { setToken, setUserType, setArchitectUserSaved } from '../../utils/auth';

const Signup = () => {
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [DRONumber, setDRONumber] = useState('');
    const [collegiateNumber, setCollegiateNumber] = useState('');
    const [memberType, setMemberType] = useState('');
    const [classification, setClassification] = useState('');
    const [gender, setGender] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [officePhone, setOfficePhone] = useState('');
    const [homeAddress, setHomeAdress] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [mainProfessionalActivity, setMainProfessionalActivity] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [university, setUniversity] = useState('');
    const [professionalLicense, setProfessionalLicense] = useState('');
    const [municipalityOfLabor, setMunicipalityOfLabor] = useState('');
    const [positionsInCouncil, setPositionsInCouncil] = useState('');
    const [linkCV, setLinkCV] = useState('');
    const [authorizationToShareInfo, setAuthorizationToShareInfo] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setConfirmPassword] = useState(''); // Nuevo estado para la confirmación de contraseña
    
    const options = ["Hombre", "Mujer", "Prefiero no decirlo"];
    const member = ["Miembro de número", "Miembro Adherente", "Miembro Pasante", "Miembro vitalicio", "Miembro Honorario"];
    const classif = ["Expresidente", "Docente", "Convenio"];
    const decide = ["SÍ", "NO"];
    const navigate = useNavigate();

    /**
     * 
     * @param {Event} e - The form submission event that triggers the function 
     */

    const handleSignup = async (e) => {
        const form = new FormData();
        form.append('fullName', fullName); 
        form.append('email',email); 
        form.append('DRONumber',DRONumber);
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
        form.append('specialty', specialty);
        form.append('dateOfAdmission', dateOfAdmission);
        form.append('dateOfBirth', dateOfBirth);
        form.append('university', university);
        form.append('professionalLicense', professionalLicense);
        form.append('municipalityOfLabor', municipalityOfLabor);
        form.append('positionsInCouncil',positionsInCouncil);
        form.append('file', linkCV);
        const isAuthorized = authorizationToShareInfo === "SÍ" ? true : false;
        form.append('authorizationToShareInfo', isAuthorized);
        form.append('password', password);
        form.append('passwordConfirm',passwordConfirm);     
        e.preventDefault();
        try {
            const swal = FireLoading('Registrando arquitecto...');
            const response = await postSignupArchitectUsers(form);
            if (response.status === 'success') {
                const token = response.token;

                setUserType(token);
                setToken(token);
                setArchitectUserSaved(response.data.user);
            }
            swal.close();
            FireSucess('Te has registrado con éxito');
            navigate('/Principal');
        } catch (error) {
            FireError(error.message);
        }
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <img src={Logo} alt='Logo' className='Logo' />
                <h2 class="h2-A">Regístrate</h2>
                <form onSubmit={handleSignup}>
                    <div class="grid-container">
                        <div class="column">
                            <TextInput 
                                label="Nombre completo"
                                placeholder='Nombre Completo' 
                                getVal={fullName} 
                                setVal={setfullName} 
                                require={true} />
                            <TextInput
                                label="Correo Electronico"
                                placeholder='Correo Electrónico'
                                getVal={email}
                                setVal={setEmail}
                                require={true}
                            />
                            <HiddenTextInput
                                label="Contraseña"
                                placeholder='Tu contraseña debe contar con al menos 8 caracteres'
                                getVal={password}
                                setVal={setPassword}
                                require={true}
                            />
                            <HiddenTextInput
                                label="Confirmar contraseña"
                                placeholder='Tu contraseña debe contar con al menos 8 caracteres'
                                getVal={passwordConfirm}
                                setVal={setConfirmPassword}
                                require={true}
                            />
                            <TextInput
                                label="Número de DRO"
                                placeholder='Número de DRO'
                                getVal={DRONumber}
                                setVal={setDRONumber}
                                require={true}
                            />
                            <TextInput
                                label="Número de colegiado"
                                placeholder='Número de colegiado'
                                getVal={collegiateNumber}
                                setVal={setCollegiateNumber}
                                require={true}
                            />
                            <DropdownInput
                                label="Tipo de miembro"
                                options={member}
                                getVal={memberType}
                                setVal={setMemberType}
                                require={true}
                            />
                            <DropdownInput
                                label="Clasificación"
                                options={classif}
                                getVal={classification}
                                setVal={setClassification}
                                require={true}
                            />
                            <DropdownInput
                                label="Género"
                                options={options}
                                getVal={gender}
                                setVal={setGender}
                                require={true}
                            />
                            <TextInput
                                label="Número de teléfono celular"
                                placeholder='Número de teléfono celular'
                                getVal={cellphone}
                                setVal={setCellphone}
                                require={true}
                            />
                            <TextInput
                                label="Número de teléfono de casa"
                                placeholder='Número de teléfono de casa'
                                getVal={homePhone}
                                setVal={setHomePhone}
                                require={true}
                            />
                            <TextInput
                                label="Número de teléfono de oficina"
                                placeholder='Número de teléfono de oficina'
                                getVal={officePhone}
                                setVal={setOfficePhone}
                                require={true}
                            />
                            <LargeTextInput
                                label="Domicilio particular"
                                placeholder='Domicilio particular'
                                getVal={homeAddress}
                                setVal={setHomeAdress}
                                require={true}
                            />
                            <LargeTextInput
                                label="Domicilio de trabajo"
                                placeholder='Domicilio de trabajo'
                                getVal={workAddress}
                                setVal={setWorkAddress}
                                require={true}
                            />
                        </div>
                        <div class="column-2">
                            <TextInput
                                label="Contacto de emergencia (nombre completo y teléfono)"
                                placeholder='Contacto de emergencia (nombre completo y teléfono)'
                                getVal={emergencyContact}
                                setVal={setEmergencyContact}
                                require={true}
                            />
                            <TextInput
                                label="Actividad Principal Preponderante"
                                placeholder='Actividad Principal Preponderante'
                                getVal={mainProfessionalActivity}
                                setVal={setMainProfessionalActivity}
                                require={true}
                            />
                            <TextInput
                                label="Especialidad"
                                placeholder='Especialidad'
                                getVal={specialty}
                                setVal={setSpecialty}
                                require={true}
                            />
                            <DateInput
                                label="Fecha de ingreso al colegio"
                                getVal={dateOfAdmission}
                                setVal={setDateOfAdmission}
                                require={true}
                            />
                            <DateInput
                                label="Fecha de nacimiento"
                                getVal={dateOfBirth}
                                setVal={setDateOfBirth}
                                require={true}
                            />
                            <TextInput
                                label="Universidad"
                                placeholder='¿En que universidad te graduaste?'
                                getVal={university}
                                setVal={setUniversity}
                                require={true}
                            />
                            <TextInput
                                label="Cedula profesional"
                                placeholder='Cedula profesional'
                                getVal={professionalLicense}
                                setVal={setProfessionalLicense}
                                require={true}
                            />
                            <TextInput
                                label="Municipio"
                                placeholder='Municipio de trabajo'
                                getVal={municipalityOfLabor}
                                setVal={setMunicipalityOfLabor}
                                require={true}
                            />
                            <TextInput
                                label="Cargos en consejo directivo (fecha y nombre del cargo)"
                                placeholder='Cargos en consejo directivo (fecha y nombre del cargo)'
                                getVal={positionsInCouncil}
                                setVal={setPositionsInCouncil}
                                require={true}
                            />
                            <FileInput
                                label="Suba su curriculum"
                                getVal={linkCV}
                                setVal={setLinkCV}
                            />
                            <DropdownInput
                                label="¿Autoriza compartir su información?"
                                options={decide}
                                getVal={authorizationToShareInfo}
                                setVal={setAuthorizationToShareInfo}
                                require={true}
                            />
                        </div>
                    </div>
                    <div className='button-container'>
                        <BaseButton
                            type='primary'
                            label='Registrarse'
                            onClick={handleSignup}
                        />
                        <Link to='/LoginUser'>
                            <BaseButton type='fail' label='Cancelar' />
                        </Link>
                    </div>
                </form>
            </div>
            <div className='signup-image'></div>
        </div>
    );
};

export default Signup;
