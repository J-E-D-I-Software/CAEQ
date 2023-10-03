import './LongDataCard.scss';

const ContactDataCard = (props) => {

    return (
        //<h1>hola</h1>
        <div className='profile-card'>

            <div className='card-col'>

                <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Correo:</h4>
                        &nbsp;
                        &nbsp;
                        <p>{props.email}</p>
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

            </div>

            <div className='card-col'>

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
    )

}

export default ContactDataCard;