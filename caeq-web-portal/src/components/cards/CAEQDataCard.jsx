import './LongDataCard.scss';

const CAEQDataCard = (props) => {

    const date = new Date(props.dateOfAdmission);

    return (
        //<h1>hola</h1>
        <div className='profile-card'>

            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.memberType}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.collegiateNumber}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.classification}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.positionsInCouncil}</p>
                    </div>

            </div>

            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.DRONumber}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.capacitationHours}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{date.toLocaleDateString()}</p>
                    </div>

            </div>

        </div>
    )

}

export default CAEQDataCard;   