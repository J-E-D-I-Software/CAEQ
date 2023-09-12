import WhiteContainer from './components/containers/WhiteCard/WhiteCard';
import TextInput from './components/inputs/TextInput/TextInput';
import { useState } from 'react';

function App() {
    const [inputVal, setVal] = useState('');

    return (
        <div className='App'>
            <p>Bienvenido al CAEQ:</p>
            <WhiteContainer>
                <h1>Componentes</h1>
                <p>{inputVal}</p>
            </WhiteContainer>
            <TextInput
                label='Nombre'
                getVal={inputVal}
                setVal={setVal}
                placeholder='Escibe aqui tu nombre'
            />
        </div>
    );
}

export default App;
