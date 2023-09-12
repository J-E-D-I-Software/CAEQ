import './styles/styles.scss'
import WhiteContainer from './components/containers/WhiteCard/WhiteCard';
import TextInput from './components/inputs/TextInput/TextInput';
import LargeTextInput from './components/inputs/TextInput/LargeTextInput';
import DateInput from './components/inputs/DateInput/DateInput';
import HiddenTextInput from './components/inputs/TextInput/HiddenTextInput';
import { useState } from 'react';

function App() {
    const [inputVal, setVal] = useState('');
    const [inputVal1, setVal2] = useState('');

    return (
        <div className='App'>
            <p>Bienvenido al CAEQ:</p>
            <WhiteContainer>
                <h1>Componentes</h1>
                <p>{inputVal}</p>
                <p>{inputVal1}</p>
            </WhiteContainer>
            <TextInput
                label='Text'
                getVal={inputVal}
                setVal={setVal}
                placeholder='Escibe aqui tu nombre'
            />
            <LargeTextInput
                label='Large Text'
                getVal={inputVal}
                setVal={setVal}
                placeholder='Escibe aqui tu nombre'
            /> 
            <DateInput
                label='Date'
                getVal={inputVal1}
                setVal={setVal2}
            />
            <HiddenTextInput
                label='Password'
                placeholder='Contraseña de 8 a 16 caracteres'
            />

        </div>
    );
}

export default App;
