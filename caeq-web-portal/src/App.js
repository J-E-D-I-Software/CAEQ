import { useState, useEffect } from 'react';
import { getCaeqUsers } from './client/CaeqUser/CaeqUser.GET';
import WhiteContainer from './components/containers/WhiteCard/WhiteCard';
import { FireError, FireQuestion, FireSucess } from './utils/alertHandler';

function App() {
    const [admins, setAdmins] = useState([]);
    const [response, setResponse] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const confirmation = await FireQuestion(
                    '¿Está seguro de que desea obtener a los administradores?',
                    'Podrás ver todos los datos.'
                );
                setResponse(confirmation.isConfirmed);

                if (confirmation.isConfirmed) {
                    const caeqUsers = await getCaeqUsers();
                    setAdmins(caeqUsers);

                    FireSucess('Los administradores fueorn obtenidos con éxito.');
                }
            } catch (error) {
                FireError(error.response.data.message);
            }
        })();
    }, []);

    return (
        <div className='App'>
            {admins.length === 0 ? (
                <WhiteContainer>
                    <h1>Sin admins</h1>
                </WhiteContainer>
            ) : (
                admins.map((admin) => (
                    <WhiteContainer>
                        <h1>{admin.fullName}</h1>
                        <h1>{admin.email}</h1>
                    </WhiteContainer>
                ))
            )}
        </div>
    );
}

export default App;
