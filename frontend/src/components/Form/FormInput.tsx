import React from 'react';

interface FormInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({ type, id, name, placeholder }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
