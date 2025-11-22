import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
        if (!form.password) e.password = 'Password is required';
        return e;
    };

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
        setServerError('');
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length) {
            setErrors(validation);
            return;
        }

        setLoading(true);
        setServerError('');
        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email.trim().toLowerCase(),
                    password: form.password
                })
            });

            const data = await res.json();
            if (!res.ok) {
                if (data && data.message) setServerError(data.message);
                else setServerError('Login failed');
                setLoading(false);
                return;
            }

            // store user info (token/user) if backend returns it
            try { localStorage.setItem('userInfo', JSON.stringify(data)); } catch (_) {}

            setLoading(false);
            navigate('/'); // or navigate to dashboard/profile
        } catch (err) {
            setServerError('Network error. Try again.');
            setLoading(false);
        }
    };

    return (
        <div className="login-page" style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem' }}>
            <h2>Sign in</h2>

            {serverError && <div style={{ color: 'red', marginBottom: 8 }}>{serverError}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="email">Email</label><br />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="password">Password</label><br />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>

                <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                <div style={{ marginTop: 16 }}>
                    <a href="/register" style={{ color: '#007bff', textDecoration: 'underline' }}>
                        Don't have an account? Create one!
                    </a>
                </div>
            </form>
        </div>
    );
}