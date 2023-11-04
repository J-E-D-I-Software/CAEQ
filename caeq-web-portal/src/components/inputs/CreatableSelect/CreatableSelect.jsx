import React from 'react';
import CreatableSelect from 'react-select/creatable';
import './CreatableSelect.scss'; // Importa el archivo de estilo

function CreatableSelectComponent(props) {
  return (
    <div>
      <label className="label-input">{props.label}</label>
      <CreatableSelect
        isMulti
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className='Creatable-Select'
      />
      
    </div>
  );
}

export default CreatableSelectComponent;
