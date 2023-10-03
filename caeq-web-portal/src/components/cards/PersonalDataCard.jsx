import './LongDataCard.scss';

const PersonalDataCard = (props) => {

    const date = new Date(props.dateOfBirth);

    return(
        //<h1>hola</h1>

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

            </div>

            <div className='card-col'>

            </div>

            <div className='card-col'>
                
            </div>

            <div className='card-col'>
                
            </div>

            <div className='card-col'>
                
            </div>

            <div className='card-col'>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <h4>Género:</h4>
                    &nbsp;
                    &nbsp;
                    <p>{props.gender}</p>
                    </div>

                <div className='card-row'>
                    {/* <i>I</i> */}
                    <h4>Número Celular:</h4>
                    &nbsp;
                    &nbsp;
                    <p>{props.cellphone}</p>
                    </div>

            </div>
            
        </div>
    )

}

export default PersonalDataCard;