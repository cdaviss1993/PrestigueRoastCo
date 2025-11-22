import React from 'react';

const Footer = () => (
    <footer style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: 'var(--navbar-height)',
        background: 'linear-gradient(90deg, #4b2e19 0%, #a67c52 100%)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        zIndex: 1090
    }}>
        <div>
            <p style={{ margin: 0, fontWeight: 600 }}>&copy; {new Date().getFullYear()} Prestige Roast Co. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;