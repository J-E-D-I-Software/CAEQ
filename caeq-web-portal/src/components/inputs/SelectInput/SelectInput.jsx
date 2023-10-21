import React from 'react';
import Select from 'react-select';
import './SelectInput.scss'; // Importa el archivo de estilo

function SelectInputComponent(props) {
  return (
    <div>
      <label className="label-input">{props.label}</label>
      <Select
        isMulti
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      
    </div>
  );
}

export default SelectInputComponent;
