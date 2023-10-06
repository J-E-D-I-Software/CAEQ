import './LongDataCard.scss';

const ProfileCard = (props) => {
    const date = new Date(props.dateOfBirth);

    return(
        <div className='all-data'>
            <div className='longprofile-card'>
                <div className='card-col'>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Nombre:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.fullName}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Fecha de Nacimiento:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{date.toLocaleDateString()}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Edad:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.age}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Género:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.gender}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Dirección:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.homeAddress}</p>
                        </div>
                </div>
                <div className='card-col'></div>
                <div className='card-col'>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Número Celular:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.cellphone}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Teléfono de casa:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.homePhone}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Correo:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.email}</p>
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
                </div>
            </div>

            <div className='longprofile-card'>
                <div className='card-col'>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Tipo de Miembro:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.memberType}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Número de Colegiado:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.collegiateNumber}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Clasificación:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.classification}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Puesto en Consejo:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.positionsInCouncil}</p>
                        </div>
                </div>
                <div className='card-col'></div>
                <div className='card-col'>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Número DRO:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.DRONumber}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Horas Acreditadas (2023):</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.capacitationHours}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Fecha de ingreso:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{date.toLocaleDateString()}</p>
                        </div>
                </div>
            </div>

            <div className='flex-container'>
            <div className='longprofile-card'>
                <div className='card-col'>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Dirección de oficina:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.workAddress}</p>
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
                </div>
                <div className='card-col'></div>
                <div className='card-col'>
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
                        <h4>Municipio:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.municipalityOfLabor}</p>
                        </div>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Link CV:</h4>
                        &nbsp;
                        &nbsp;
                        <p><a href={props.linkCV}>{props.linkCV}</a></p>
                        </div>
                </div>
            </div> 
        </div>

    </div>
        
    )
}

export default ProfileCard;