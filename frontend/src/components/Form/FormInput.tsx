import React, { useState, ChangeEvent } from 'react';

interface FormInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  
  
}

const FormInput: React.FC<FormInputProps> = ({ type, id, name, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
