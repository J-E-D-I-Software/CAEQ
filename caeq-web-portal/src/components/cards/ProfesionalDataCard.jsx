import './LongDataCard.scss';

const ProfesionalDataCard = (props) => {

    return (
        //<h1>hola</h1>
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

            </div>

            <div className='card-col'>

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
    )

}

export default ProfesionalDataCard;