import React  from 'react';

export default function Footer() {
    return (
        <footer className="py-8 text-center text-sm text-black dark:text-white/70 bg-transparent">
            {new Date().getFullYear()} © SUURORG SPACE SHUTTLE
        </footer>
    )
};