import './DataCard.scss';

const ContactDataCard = (props) => {

    return (
        //<h1>hola</h1>

        <div className='flex-container'>

            <div className='profile-card'>

                <div className='card-col'>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Teléfono de casa:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.homePhone}</p>
                        </div>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Teléfono de oficina:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.officePhone}</p>
                        </div>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Dirección:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.homeAddress}</p>
                        </div>

                        <div className='card-row'>
                    {/* <i>I</i> */}
                    <h4>Contacto de emergencia:</h4>
                    &nbsp;
                    &nbsp;
                    <p>{props.emergencyContactName}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <h4>Número de emergencia:</h4>
                    &nbsp;
                    &nbsp;
                    <p>{props.emergencyContact}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <h4>Dirección (oficina):</h4>
                    &nbsp;
                    &nbsp;
                    <p>{props.workAddress}</p>
                    </div>

                </div>

            </div>

            <div className='profile-card'>

                <div className='card-col'>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Universidad:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.university}</p>
                        </div>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Cédula Profesional:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.professionalLicense}</p>
                        </div>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Profesión:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.mainProfessionalActivity}</p>
                        </div>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Especialidad:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.specialty}</p>
                        </div>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Municipalidad:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.municipalityOfLabor}</p>
                        </div>

                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Link CV:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.linkCV}</p>
                        </div>

                </div>

            </div> 

        </div>

    )

}

export default ContactDataCard;