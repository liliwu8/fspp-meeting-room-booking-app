import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import logo from './logo.png'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__addr'>
        <img src={logo} className='footer__logo' alt='footerlogo' />
        <h2>Contact</h2>
        <address>
          1234 Midtown Manhattan NYC 10001-10001
          <br />
          <a className='footer__btn' href='mailto:example@gmail.com'>
            Email Us
          </a>
        </address>
      </div>

      <ul className='footer__nav'>
        <li className='nav__item'>
          <h2 className='nav__title'>Bookr</h2>

          <ul className='nav__ul'>
            <Link to='/'>
              <li>About Me</li>
            </Link>
            <li>
              <a href='/'>
                Project Source Code
              </a>
            </li>
            <Link to='/'>
              <li>How It Works</li>
            </Link>
          </ul>
        </li>

        <li className='nav__item nav__item--extra'>
          <h2 className='nav__title'>Technology</h2>
          <ul className='nav__ul nav__ul--extra'>
            <li>
              <a href='/'>React</a>
            </li>
            <li>
              <a href='/'>Postgres</a>
            </li>
            <li>
              <a href='/'>CSS</a>
            </li>
          </ul>
        </li>

        <li className='nav__item'>
          <h2 className='nav__title'>Legal</h2>
          <ul className='nav__ul'>
            <li>
              <a href='/'>Privacy Policy</a>
            </li>
            <li>
              <a href='/'>Terms of Use</a>
            </li>
            <li>
              <a href='/'>Sitemap</a>
            </li>
          </ul>
        </li>
      </ul>
      <div className='legal'>
        <p>&copy; 2022 Bookr. All rights reserved.</p>
      </div>
    </footer>
  )
}