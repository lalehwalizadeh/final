import React, { useState, useEffect } from 'react';
import './Styles/Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import LoginValidation from './LoginValidation';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [visible, setVisible] = useState(false);

	const handleInput = (event) => {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	useEffect(() => {
		axios
			.get('http://localhost:5000/dashboard')
			.then((res) => {
				if (res.data.valid) {
					navigate('/dashboard');
				}
			})
			.catch((err) => console.log(err));
	}, [navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const validationError = LoginValidation(formData);
		setErrors(validationError);
		if (!validationError.email && !validationError.password) {
			try {
				const res = await axios.post('http://localhost:5000/login', formData);
				if (res.data.Login) {
					console.log(res.data.Login);
					navigate('/dashboard');
				} else {
					alert(
						res.data.errMessage
							? 'Incorrect Password or Email'
							: 'Login failed , this account is not exist please create account!'
					);
				}
			} catch (err) {
				console.log(err);
				alert('Server error, please try again.');
			}
		}
	};

	return (
		<>
			<Link to='/signup' className='back'>
				<IoMdArrowRoundBack
					style={{ color: '#141c30', margin: '1rem', fontSize: '20px' }}
				/>
			</Link>

			<div className='d-flex justify-content-center align-items-center vh-100 formContainer'>
				<div className='p-3 rounded w-100'>
					<form action='/login' onSubmit={handleSubmit}>
						<h2>Log In</h2>
						<div className='mb-3'>
							<label htmlFor='email'>
								<strong>Email</strong>
							</label>
							<input
								type='email'
								placeholder='Enter Email'
								name='email'
								id='email'
								className='form-control '
								onChange={handleInput}
							/>
							{errors.email && (
								<span className='text-danger'>{errors.email}</span>
							)}
						</div>
						<div className='mb-3'>
							<label htmlFor='password'>
								<strong>Password</strong>
							</label>
							<div className='password-input-container'>
								<input
									type={visible ? 'text' : 'password'}
									onChange={handleInput}
									placeholder='Enter Password'
									name='password'
									id='password'
								/>

								<div onClick={() => setVisible(!visible)}>
									{visible ? <IoEyeSharp /> : <IoEyeOffSharp />}
								</div>
							</div>
							{errors.password && (
								<span className='text-danger'>{errors.password}</span>
							)}
						</div>
						<button type='submit' className='btn w-100 bton'>
							{' '}
							Log in
						</button>
						<p className='mrg-tp'>
							Don't have any Account? <Link to='/signup'>Create Account</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}
