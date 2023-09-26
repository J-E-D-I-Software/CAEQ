import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LargeTextInput from './LargeTextInput';

afterEach(() => {
    cleanup();
});

/*
    Se prueba el input de texto largo
*/
test('Prueba LargeTextInput', () => {

    const inputVal = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const setVal = jest.fn();
    
    const props = {
        label: "Large Text", 
        getVal: inputVal, 
        setVal: setVal, 
        placeholder: "Escribe aqui tu nombre", 
        require:true
    };

    render(<LargeTextInput {...props} />);
    
    const element = screen.getByTestId('largeTxtInput');
    expect(element).toBeInTheDocument();
});


