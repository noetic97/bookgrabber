import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <section className='header'>
    <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
      <div className='container'>
        <Link className='navbar-brand' to='/'><h1>BookGrabber</h1></Link>
      </div>
    </nav>
  </section>
);

export default Header;