import { useState, useEffect } from 'react';
import { getCaeqUsers } from './client/CaeqUser/CaeqUser.GET';
import WhiteContainer from './components/containers/WhiteCard/WhiteCard';

function App() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const caeqUsers = await getCaeqUsers();

                setAdmins(caeqUsers);
            } catch (error) {
                console.log(error);
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
