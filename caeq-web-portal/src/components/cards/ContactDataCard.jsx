import './LongDataCard.scss';

const ContactDataCard = (props) => {

    return (
        //<h1>hola</h1>
        <div className='profile-card'>

            <div className='card-col'>

                <div className='card-row'>
                        {/* <i>I</i> */}
                        <p>{props.email}</p>
                        </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.homePhone}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.officePhone}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.homeAddress}</p>
                    </div>

            </div>

            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.emergencyContactName}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.emergencyContact}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <p>{props.workAddress}</p>
                    </div>

            </div>

        </div>
    )

}

export default ContactDataCard;