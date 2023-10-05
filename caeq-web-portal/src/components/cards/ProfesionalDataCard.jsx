import './LongDataCard.scss';

const ProfesionalDataCard = (props) => {

    return (
        <div className='flex-container'>
            <div className='longprofile-card'>
                <div className='card-col'>
                    <div className='card-row'>
                        {/* <i>I</i> */}
                        <h4>Oficina:</h4>
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
                        <p><a href={props.linkCV}>{props.linkCV}</a></p>
                        </div>
                </div>
            </div> 
        </div>
    )
}

export default ProfesionalDataCard;