import { useState, useEffect } from 'react';
import WhiteContainer from './components/containers/WhiteCard/WhiteCard';
import { getUsers } from './client/Arquitecto/Arquitecto.GET';

function App() {
    const [getDepartamento, setDepartamento] = useState([]);
    const [getMiembro, setMiembro] = useState('');

    useEffect(() => {
        (async () => {
            const departamento = await getUsers();

            setDepartamento(departamento);
        })();
    }, []);

    useEffect(() => {
        const nuevoDepartamento = getDepartamento.filter((miembro) =>
            miembro.startsWith(getMiembro)
        );

        setDepartamento(nuevoDepartamento);
    }, [getMiembro]);

    return (
        <div className='App'>
            <p>Miembro del equipo a buscar:</p>
            <p>{getMiembro}</p>
            <label>
                <input
                    value={getMiembro}
                    onChange={(el) => setMiembro(el.target.value)}
                />
            </label>
            <WhiteContainer>
                <h1>Departamento J.E.D.I.</h1>
            </WhiteContainer>
            {getDepartamento.map((miembro) => (
                <WhiteContainer>
                    <h1>{miembro}</h1>
                </WhiteContainer>
            ))}
        </div>
    );
}

export default App;
