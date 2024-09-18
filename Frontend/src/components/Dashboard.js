import React, { useEffect, useState } from 'react';
import './Styles/Tasks.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
	const [name, setName] = useState('');
	const navigate = useNavigate();

	axios.defaults.withCredentials = true;

	useEffect(() => {
		axios
			.get('http://localhost:5000/dashboard')
			.then((res) => {
				if (res.data.valid) {
					setName(res.data.username);
				} 
			
			})
			.catch((err) => console.log(err));
	},[navigate]);

	const style = {
		border: '1px solid ',
		borderRadius: '5px',
		margin: '20px',
		padding: '10px',
	};

	return (
		<div style={{ maxHeight: '100vh' }}>
			<header>
				<h1> Manage your Tasks and Projects!</h1>
			</header>
			<div className='content'>
				<aside style={style}> your account </aside>
				<section style={style}> Welcome {name}</section>
			</div>
		</div>
	);
}
