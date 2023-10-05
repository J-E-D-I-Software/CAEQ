import './LongDataCard.scss';

const CAEQDataCard = (props) => {
    const date = new Date(props.dateOfAdmission);

    return (
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
    )
}

export default CAEQDataCard;   