import React, { useState, ChangeEvent } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import FormInput from '../components/Form/FormInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface MyComponentProps {}

const Login: React.FC<MyComponentProps> = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password
      })
      localStorage.setItem('user', JSON.stringify(response.data))
      toast.success('Logging in')
      navigate('/');
    } catch (error) {
      toast.error('Login failed')
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <ToastContainer /> 
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
        <FormInput type='email' id='email' name='email' placeholder='Enter your email' value = {email} onChange = {onChange} />
        <FormInput type='password' id='password' name='password' placeholder='Enter your password' value = {password} onChange = {onChange}/>
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

export default Login;
