import React, { useState, useEffect } from "react";
import LargeTextInput from "../../components/inputs/TextInput/LargeTextInput";
import TextInput from "../../components/inputs/TextInput/TextInput";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";
import FileInput from "../../components/inputs/FileInput/FileInput";
import BaseButton from "../../components/buttons/BaseButton";
import "./Anouncements.scss"
import WhiteContainer from "../../components/containers/WhiteCard/WhiteCard";
import placeholder from "../../components/images/Caeq_foto.jpg";

function Anouncements() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [sendMode, setSendMode] = useState("Enviar correo a todos los usuarios");
    const [preview, setPreview] = useState({placeholder});

    useEffect(() => {
        if (!image) {
            setPreview(placeholder);
            return;
        }
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
    }, [image]);

    const handleSubmit = () => {
        console.log("subject", subject);
        console.log("message", message);
        console.log("image", image);
        console.log("sendMode", sendMode);
    }

    return (
        <div className='anouncement-container'>
            <h2>Enviar Anuncio a todos los usuarios de CAEQ</h2>
            <div className='anouncement-form'>
                <TextInput
                    label='Asunto | Encabezado del Correo'
                    placeholder='Nuevo Plataforma CAEQ'
                    getVal={subject}
                    setVal={setSubject}
                />
                <LargeTextInput
                    label='Mensaje del Correo'
                    placeholder='Hola, te invitamos a conocer la nueva plataforma CAEQ.'
                    getVal={message}
                    setVal={setMessage}
                />
                <FileInput
                    label='Imagen'
                    getVal={image}
                    setVal={setImage}
                    accept='image/*'
                />
                <DropdownInput
                    label='Enviar a'
                    getVal={sendMode}
                    setVal={setSendMode}
                    options={["Enviar correo a todos los usuarios"]}
                />
               
            </div>

            <h2>Vista Previa</h2>
            <WhiteContainer>
                <div className='anouncement-preview'>
                    <h3>{subject ? subject : 'Asunto del correo'}</h3>
                    <p>{message ? message : 'Cuerpo del correo'}</p>
                    <img className='preview-image' src={preview} alt='imagen de correo'/>
                </div>
            </WhiteContainer>
            <BaseButton type='primary' onClick={handleSubmit}>
                    Enviar Anuncio
            </BaseButton>
        </div>
    );
}

export default Anouncements;
