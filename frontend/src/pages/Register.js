import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = 'First name is required';
        if (!form.lastName.trim()) e.lastName = 'Last name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
        if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
        return e;
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
        setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length) {
            setErrors(validation);
            return;
        }

        setLoading(true);
        setServerError('');
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    email: form.email.trim().toLowerCase(),
                    password: form.password
                })
            });

            const data = await res.json();
            if (!res.ok) {
                // Expect API to return { errors: { field: msg } } or { message: '...' }
                if (data && data.errors) {
                    setErrors(data.errors);
                } else if (data && data.message) {
                    setServerError(data.message);
                } else {
                    setServerError('Registration failed');
                }
                setLoading(false);
                return;
            }

            setSuccess(true);
            setLoading(false);
            // navigate to login or dashboard after a short delay
            setTimeout(() => navigate('/login'), 1200);
        } catch (err) {
            setServerError('Network error. Try again.');
            setLoading(false);
        }
    };

    return (
        <div className="register-page" style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem' }}>
            <h2>Create account</h2>

            {success ? (
                <div style={{ padding: '1rem', background: '#e6ffed', border: '1px solid #b7f0c9' }}>
                    Registration successful — redirecting to login...
                </div>
            ) : null}

            {serverError && <div style={{ color: 'red', marginBottom: 8 }}>{serverError}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="firstName">First name</label><br />
                    <input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                    />
                    {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="lastName">Last name</label><br />
                    <input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                    />
                    {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
                </div>

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
                        autoComplete="new-password"
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="confirmPassword">Confirm password</label><br />
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                    {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
                </div>

                <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
                    {loading ? 'Creating account...' : 'Register'}
                </button>
            </form>
        </div>
    );
}