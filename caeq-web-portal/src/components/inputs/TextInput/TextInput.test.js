import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput from './TextInput';

afterEach(() => {
    cleanup();
});

/*
   Test for Text Input component
*/
test('Prueba TextInput', () => {

    //Props added
    const inputVal = 'José Eduardo Díaz Maldonado'
    const setVal = jest.fn();
    
    const props = {
        label: "Text", 
        getVal: inputVal, 
        setVal: setVal, 
        placeholder: "Escribe aqui tu nombre", 
        require:true
    };

    // Component rendered
    render(<TextInput {...props} />);
    
    const element = screen.getByTestId('txtInput');
    expect(element).toBeInTheDocument();
});


