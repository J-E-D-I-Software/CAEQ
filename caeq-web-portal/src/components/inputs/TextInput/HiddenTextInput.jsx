import React, {useState} from 'react';
import './TextInput.scss';

const HiddenTextInput = ({ label, placeholder, ...props }) => {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <label>
            <div className='label-input'>{label}</div>
            <input
                className='box-input'
                type={isToggled ? 'text' : 'password'}
                placeholder={placeholder}
                {...props}
            />
            <button className="button" onClick={() => setIsToggled(!isToggled)}>
                <img width="10" height="10" src=
                "https://cdn-icons-png.flaticon.com/512/829/829117.png" alt="mostrar" />
            </button>
        </label>
    );
};

export default HiddenTextInput;