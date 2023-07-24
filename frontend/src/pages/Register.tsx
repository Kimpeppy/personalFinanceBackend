import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

import FormInput from '../components/Form/FormInput';
import axios from 'axios';

interface MyComponentProps {}

const Register: React.FC<MyComponentProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password || !password2) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Check if passwords match
    if (password !== password2) {
      toast.error('Passwords do not match.');
      return;
    }

    // Add the logic to send the form data to your backend using axios
    try {
      const response = await axios.post('/api/users', {
        name,
        email,
        password,
      });

      // Registration successful, handle the response here
      // For example, you can redirect the user to the login page or show a success message
      toast.success('Registration successful! Redirecting to login page.');
      // You can add a redirect logic here if needed
    } catch (error) {
      // Registration failed, handle the error here
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer /> {/* This component is required to use react-toastify */}
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Register
        </h1>
        <p>Register your account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <FormInput type='text' id='name' name='name' placeholder='Enter your name' />
          <FormInput type='email' id='email' name='email' placeholder='Enter your email' />
          <FormInput type='password' id='password' name='password' placeholder='Enter password' />
          <FormInput
            type='password'
            id='password2'
            name='password2'
            placeholder='Confirm password'
          />
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
