import './LongDataCard.scss';

const PersonalDataCard = (props) => {
    const date = new Date(props.dateOfBirth);

    return(
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
    )
}

export default PersonalDataCard;