import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";
import { FireError, FireLoading, FireSucess } from "../../utils/alertHandler";

import TextInput from "../../components/inputs/TextInput/TextInput";
import "../DirectoryArchitectDetail/DirectoryArchitectDetail.scss";
import BaseButton from "../../components/buttons/BaseButton";
import { updateArchitectUserByID } from "../../client/ArchitectUser/ArchitecUser.PATCH";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";
import DateInput from "../../components/inputs/DateInput/DateInput";

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
                .catch((error) => navigate("/404"));
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
    }

    const handleSaveChanges = async (e) => {
        const form = new FormData();
        form.append("fullName", editedData.fullName); //Ya esta
        form.append("dateOfBirth", editedData.dateOfBirth); //Ya esta
        form.append("age", editedData.age); //Ya esta
        form.append("gender", editedData.gender); //Ya esta
        form.append("homeAddress", editedData.homeAddress); //Ya esta
        form.append("cellphone", editedData.cellphone); //Ya esta
        form.append("homePhone", editedData.homePhone); //Ya esta
        form.append("email", editedData.email); //Ya esta
        form.append("emergencyContact", editedData.emergencyContact); //Ya esta

        e.preventDefault();

        try {
            const swal = FireLoading("Guardando cambios... por favor espere");
            const response = await updateArchitectUserByID(searchParams.id, form);
            console.log("his isddd", response);
            if (response.status === "success") {
                setData(response.data);
                swal.close();
                FireSucess("Los Cambios se han guardado correctamente");
                navigate("/Perfil");
            } else {
                swal.close();
                FireError(response.message);
            }
        } catch (error) {
            FireError(error.message);
            navigate("/.");
            console.log(error);
        }
    };

    const gender = [
        "Hombre",
        "Mujer",
        "Otro",
        "Prefiero no decirlo",
    ];

    

    /**
     * Returns an array of member options excluding the currently edited member type.
     *
     * @function
     * @returns {Array} An array of member options.
     */
    const getGender = () => {
        const filteredOptions = gender.filter(
            (option) => option !== editedData.gender
        );
        return filteredOptions;
    };

    return (
        <div className="architect-detail">
            <div className="architect-row">
                <h2>
                    {" "}
                    (i) Modifica la información que sea necesaria. Al terminar, haz clic
                    en guardar cambios.
                </h2>
            </div>
            <div className="architect-row">
                <div className="architect-col">

                    <TextInput
                        label="Nombre completo"
                        placeholder="Nombre completo"
                        getVal={editedData.fullName}
                        setVal={(value) => 
                            setEditedData({ ...editedData, fullName: value })
                        }
                    />

                    <DateInput
                        label="Fecha de nacimiento"
                        getVal={date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}
                        setVal={(value) => 
                            setEditedData({ ...editedData, dateOfBirth: value })
                        }
                    />

                    <TextInput
                        label="Edad"
                        placeholder="Edad"
                        getVal={editedData.age}
                        setVal={(value) => 
                            setEditedData({ ...editedData, age: value })
                        }
                    />

                    <DropdownInput
                        label="Género"
                        placeholder={editedData.gender}
                        options={getGender()}
                        getVal={editedData.gender}
                        setVal={(value) =>
                            setEditedData({ ...editedData, gender: value })
                        }
                    />

                    <TextInput
                        label="Dirección"
                        placeholder="Dirección"
                        getVal={editedData.homeAddress}
                        setVal={(value) => 
                            setEditedData({ ...editedData, homeAddress: value })
                        }
                    />
                </div>
                <div className="architect-col">
                    <TextInput
                        label="Número celular"
                        placeholder="Número celular"
                        getVal={editedData.cellphone}
                        setVal={(value) => 
                            setEditedData({ ...editedData, cellphone: value })
                        }
                    />

                    <TextInput
                        label="Número de casa"
                        placeholder="Número de casa"
                        getVal={editedData.homePhone}
                        setVal={(value) => 
                            setEditedData({ ...editedData, homePhone: value })
                        }
                    />

                    <TextInput
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        getVal={editedData.email}
                        setVal={(value) => 
                            setEditedData({ ...editedData, email: value })
                        }
                    />

                    <TextInput
                        label="Contacto de emergencia"
                        placeholder="Contacto de emergencia"
                        getVal={editedData.emergencyContact}
                        setVal={(value) =>
                            setEditedData({ ...editedData, emergencyContact: value })
                        }
                    />
                </div>
            </div>
            <div className="architect-row">
                <BaseButton type="primary" className="button" onClick={handleSaveChanges}>
                    Guardar Cambios
                </BaseButton>
                <BaseButton type="cancel" className="button" onClick={handleCancel}>
                    Cancelar
                </BaseButton>
            </div>
        </div>
    )
}

export default ArchitectPersonalData;