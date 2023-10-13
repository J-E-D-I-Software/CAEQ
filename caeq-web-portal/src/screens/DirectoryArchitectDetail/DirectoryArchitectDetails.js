import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";
import { FireSucess } from "../../utils/alertHandler";

import TextInput from "../../components/inputs/TextInput/TextInput";
import "./DirectoryArchitectDetail.scss";
import FileInput from "../../components/inputs/FileInput/FileInput";
import BaseButton from "../../components/buttons/BaseButton";
import { updateArchitectUserByID } from "../../client/ArchitectUser/ArchitecUser.PATCH";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";

const ArchitectDetail = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [editedData, setEditedData] = useState({});

    
    useEffect(() => {
        if (searchParams.id)
        getArchitectUserById(searchParams.id)
    .then((response) => {
        setData(response)
        setEditedData(response)
    })
    .catch((error) => navigate("/404"));
    console.log(data);
}, []);

    const handleSaveChanges = () => {

        try{
            updateArchitectUserByID(searchParams.id, editedData)
                .then((response) => {
                    console.log(response);
                    setData(response);
                })
                .catch((error) => {
                    console.log("Failed to update user:", error);
                });
            FireSucess('Los Cambios se han guardado correctamente')
            navigate("/Directorio");
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="architect-detail">
            <div className="architect-row">
                <h1>{data.fullName}</h1>
            </div>

            <div className="architect-row">
                <div className="architect-col">
                    <TextInput
                        label="Fecha de Ingreso"
                        placeholder="FechaDeIngreso"
                        getVal={editedData.dateOfAdmission}
                        setVal={(value) => setEditedData({ ...editedData, dateOfAdmission: value })}
                    />
                    <TextInput
                        label="Número de Colegiado"
                        placeholder="Número de Colegiado"
                        getVal={editedData.collegiateNumber}
                        setVal={(value) => setEditedData({ ...editedData, collegiateNumber: value })}
                    />
                    <TextInput
                        label="Número de DRO"
                        placeholder="Número de DRO"
                        getVal={editedData.DRONumber}
                        setVal={(value) => setEditedData({ ...editedData, DRONumber: value })}
                    />
                    <TextInput
                        label="Tipo de Miembro"
                        placeholder="Tipo de Miembro"
                        getVal={editedData.memberType}
                        setVal={(value) => setEditedData({ ...editedData, memberType:value})}
                    />

                    <TextInput
                        label="Especialidad"
                        placeholder="Especialidad"
                        getVal={editedData.specialty}
                        setVal={(value) => setEditedData({ ...editedData, specialty: value })}
                    />
                </div>

                <div className="architect-col">
                    <TextInput
                        label="Horas Acreditadas"
                        placeholder="Horas Acreditadas"
                        getVal={editedData.capacitationHours}
                        setVal={(value) => setEditedData({ ...editedData, capacitationHours: value })}
                    />
                    <TextInput
                        label="Número de Asistencias a Asambleas"
                        placeholder="Número de Asistencias a Asambleas"
                        getVal={editedData.hoursAttended}
                        setVal={(value) => setEditedData({ ...editedData, hoursAttended: value })}
                    />

                    <DropdownInput
                        label="Pago de Anualidad"
                        getVal={editedData.authorizationToShareInfo}
                        setVal={(value) => setEditedData({...editedData, authorizationToShareInfo: value === "Si" ? true : false})}
                        options={["Si", "No"]}
                        placeholder="Pago de Anualidad"
                    />
                    

                    <FileInput label="CV" placeholder="CV" getVal={data.linkCV} setVal={(value) => setEditedData({ ...editedData, linkCV: value})} />
                    <p>
                        Archivo Actual: <a href="{data.linkCV}">{data.linkCV}</a>
                    </p>
                </div>
            </div>

            <div className="architect-row">
                <BaseButton type="primary" onClick={handleSaveChanges}>
                    Guardar Cambios
                </BaseButton>
            </div>
        </div>
    );
};

export default ArchitectDetail;
