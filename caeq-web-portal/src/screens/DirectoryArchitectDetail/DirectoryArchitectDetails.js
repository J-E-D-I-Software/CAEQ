import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";

import TextInput from "../../components/inputs/TextInput/TextInput";
import './DirectoryArchitectDetail.scss';
import FileInput from "../../components/inputs/FileInput/FileInput";
import BaseButton from "../../components/buttons/BaseButton";

/**
 * "fullName": "Luis Garc\u00EDa",
      "collegiateNumber": 98765,
      "hoursAttended": 10,
      "memberType": "Miembro de n\u00FAmero",
      "classification": "Docente",
      "DRONumber": "DRO98765",
      "authorizationToShareInfo": true,
      "lifeInsurance": false,
      "lifeInsureID": "",
      "age": 40,
      "gender": "Masculino",
      "cellphone": 5551112222,
      "homePhone": 5553334444,
      "officePhone": 5555556666,
      "emergencyContact": 5557778888,
      "emergencyContactName": "Ana Garc\u00EDa",
      "mainProfessionalActivity": "Ingeniero Civil",
      "dateOfAdmission": "2010-02-15T00:00:00.000Z",
      "dateOfBirth": "1983-07-20T00:00:00.000Z",
      "municipalityOfLabor": "Quer\u00E9taro",
      "linkCV": "https://example.com/luisgarcia-cv",
      "university": "Universidad Aut\u00F3noma de Quer\u00E9taro",
      "professionalLicense": "P98765",
      "workAddress": "123 Avenida Principal, Quer\u00E9taro",
      "homeAddress": "456 Calle Secundaria, Quer\u00E9taro",
      "specialty": "Corresponsable en seguridad estructural",
      "positionsInCouncil": "Vocal",
      "capacitationHours": 90,
      "email": "luis@example.com",
 *  
 * 
 */

const ArchitectDetail = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const dateOfAdmission = new Date(data.dateOfAdmission);

    useEffect(() => {
        if (searchParams.id)
            getArchitectUserById(searchParams.id)
            .then(response => setData(response))
            .catch(error => navigate('/404'));
            console.log(data);
    }, []);

    return (
        <div className="architect-detail">
            <div className="architect-detail-row">
                <h1>{data.fullName}</h1>
            </div>

            
            <div className="architect-detail-row">
                <div className="architect-detail-col">
                    <TextInput label="Fecha de Ingreso" placeholder="FechaDeIngreso" getVal={dateOfAdmission.toLocaleDateString()} setVal={dateOfAdmission.toLocaleDateString()} />
                    <TextInput label="Número de Colegiado" placeholder="Número de Colegiado" getVal={data.collegiateNumber} setVal={data.collegiateNumber} />
                    <TextInput label="Número de DRO" placeholder="Número de DRO" getVal={data.DRONumber} setVal={data.DRONumber} />
                    <TextInput label="Tipo de Miembro" placeholder="Tipo de Miembro" getVal={data.memberType} setVal={data.memberType} />
                    <TextInput label="Especialidad" placeholder="Especialidad" getVal={data.specialty} setVal={data.specialty} />
                </div>
                
                <div className="architect-detail-col">
                <TextInput label="Horas Acreditadas" placeholder="Horas Acreditadas" getVal={data.capacitationHours} setVal={data.capacitationHours} />
                <TextInput label="Número de Asistencias a Asambleas" placeholder="Número de Asistencias a Asambleas" getVal={data.hoursAttended} setVal={data.hoursAttended} />
                <TextInput label="Pago de Anualidad" placeholder="Pago de Anualidad" getVal={data.authorizationToShareInfo} setVal={data.authorizationToShareInfo} />
                <FileInput label="CV" placeholder="CV" getVal={""} setVal={""} />
                </div>
            </div>

            <div className="architect-detail-row save-button">
                <BaseButton type="primary">Guardar Cambios</BaseButton>
            </div>
        </div>
       

    );
}

export default ArchitectDetail;