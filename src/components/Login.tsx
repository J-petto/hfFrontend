import React, { useState } from 'react';

interface LoginRequest {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginRequest: LoginRequest = {
            email,
            password,
        };

        console.log(import.meta.env.VITE_CORE_API_BASE_URL + '/api/v1/auth/login');

        try {
            const response = await fetch(import.meta.env.VITE_CORE_API_BASE_URL + '/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginRequest),
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Login successful');
                // Perform any necessary actions after successful login
            } else {
                console.error('Login failed:', await response.json());
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;