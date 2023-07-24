import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import FormInput from '../components/Form/FormInput';

interface MyComponentProps {}

const Register: React.FC<MyComponentProps> = () => {
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Register
        </h1>
        <p>Register your account</p>
      </section>

      <section className='form'>
        <form>
          <FormInput type="text" id="name" name="name" placeholder="Enter your name" />
          <FormInput type="email" id="email" name="email" placeholder="Enter your email" />
          <FormInput type="password" id="password" name="password" placeholder="Enter password" />
          <FormInput type="password" id="password2" name="password2" placeholder="Confirm password" />
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
