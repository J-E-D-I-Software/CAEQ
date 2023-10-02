import './LongDataCard.scss';

const PersonalDataCard = (props) => {

    const date = new Date(props.dateOfBirth);

    return(
        //<h1>hola</h1>

        <div className='profile-card'>
    
            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.fullName}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{date.toLocaleDateString()}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.age}</p>
                    </div>

            </div>

            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.gender}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.cellphone}</p>
                    </div>

            </div>
            
        </div>
    )

}

export default PersonalDataCard;