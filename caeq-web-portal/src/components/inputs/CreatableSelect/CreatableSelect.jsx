import React from 'react';
import CreatableSelect from 'react-select/creatable';
import './CreatableSelect.scss'; // Importa el archivo de estilo

function CreatableSelectComponent(props) {
  const isRequired = props.require || false;
  return (
    <div>
      <label className="label-input">
        {props.label}
        {isRequired && (
          <span className='obligatorio'>*obligatorio</span>
        )}
      </label>
      <CreatableSelect
        isMulti={props.isMulti || true}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className='creatable-select'
        required={isRequired}
        {...props}
      />
      
    </div>
  );
}

export default CreatableSelectComponent;
