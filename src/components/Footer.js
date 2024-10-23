import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Thank you for using our tool!</p>
      <a
        href="https://buymeacoffee.com/primph"
        className="btn btn-patreon"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Me a Coffee
      </a>
    </footer>
  );
};

export default Footer;
