import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";

import TextInput from "../../components/inputs/TextInput/TextInput";
import "./DirectoryArchitectDetail.scss";
import FileInput from "../../components/inputs/FileInput/FileInput";
import BaseButton from "../../components/buttons/BaseButton";
import { updateArchitectUserByID } from "../../client/ArchitectUser/ArchitecUser.PATCH";

const ArchitectDetail = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [editedData, setEditedData] = useState({});

    const dateOfAdmission = new Date(data.dateOfAdmission);

    useEffect(() => {
        if (searchParams.id)
            getArchitectUserById(searchParams.id)
                .then((response) => setData(response))
                .catch((error) => navigate("/404"));
        console.log(data);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSaveChanges = () => {

        updateArchitectUserByID(searchParams.id, editedData)
            .then((response) => {
                console.log(response);
                setData(response);
            })
            .catch((error) => {
                console.log("Failed to update user:", error);
            });

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
                        getVal={dateOfAdmission.toLocaleDateString()}
                        setVal={dateOfAdmission.toLocaleDateString()}
                    />
                    <TextInput
                        label="Número de Colegiado"
                        placeholder="Número de Colegiado"
                        getVal={data.collegiateNumber}
                        setVal={data.collegiateNumber}
                    />
                    <TextInput
                        label="Número de DRO"
                        placeholder="Número de DRO"
                        getVal={data.DRONumber}
                        setVal={data.DRONumber}
                    />
                    <TextInput
                        label="Tipo de Miembro"
                        placeholder="Tipo de Miembro"
                        getVal={data.memberType}
                        setVal={data.memberType}
                    />
                    <TextInput
                        label="Especialidad"
                        placeholder="Especialidad"
                        getVal={data.specialty}
                        setVal={data.specialty}
                    />
                </div>

                <div className="architect-col">
                    <TextInput
                        label="Horas Acreditadas"
                        placeholder="Horas Acreditadas"
                        getVal={data.capacitationHours}
                        setVal={data.capacitationHours}
                    />
                    <TextInput
                        label="Número de Asistencias a Asambleas"
                        placeholder="Número de Asistencias a Asambleas"
                        getVal={data.hoursAttended}
                        setVal={data.hoursAttended}
                    />

                    <TextInput
                        label="Pago de Anualidad"
                        placeholder="Pago de Anualidad"
                        getVal={data.uthorizationToShareInfo ? "Si" : "No"}
                        setVal={data.authorizationToShareInfo}
                    />

                    <FileInput label="CV" placeholder="CV" getVal={""} setVal={""} />
                    <p>
                        Archivo Actual: <a href="{data.linkCV}">{data.linkCV}</a>
                    </p>
                </div>
            </div>

            <div className="architect-row">
                <BaseButton type="primary">Guardar Cambios</BaseButton>
            </div>
        </div>
    );
};

export default ArchitectDetail;
