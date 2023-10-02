import './LongDataCard.scss';

const ProfesionalDataCard = (props) => {

    return (
        //<h1>hola</h1>
        <div className='profile-card'>

            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.university}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.professionalLicense}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.mainProfessionalActivity}</p>
                    </div>

            </div>

            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.specialty}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.municipalityOfLabor}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.linkCV}</p>
                    </div>

            </div>

        </div>
    )

}

export default ProfesionalDataCard;