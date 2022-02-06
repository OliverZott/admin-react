import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password
            }, { withCredentials: true });

            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <main>
            <form onSubmit={submit} className="form-signin">
                <h1 className='h3 mb-3 fw-normal'>Sign in</h1>
                <input type="email" className='form-control' placeholder='Email' required
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" className='form-control' required placeholder='Password'
                    onChange={e => setPassword(e.target.value)} />

                <button className='w-100 btn bnt-lg btn-primary' type='submit' >Submit</button>
            </form>
        </main>
    )
}

export default Login;