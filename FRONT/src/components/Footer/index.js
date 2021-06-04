import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Footer = () => (
  <div className="footer">
    <p className="footer__text">
      <span>Nous remercions FireFly Studios Games
        de nous autoriser à utiliser les photos à des fins non commerciales.
      </span>
      <span>
        <Link to="/rgpd" className="item">RGPD</Link> copyright © 2021
      </span>
    </p>

  </div>

);
export default Footer;
