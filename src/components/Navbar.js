import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, login }) => {
  return (
    <nav className='nav'>
      <Link
        to='/'
        className='logo'>
        NEAR Dapp Poll
      </Link>
      <div>
        <span className='greeting'>
          {window.walletConnection.isSignedIn() && `Hi ${window.accountId}`}
        </span>
        <button
          className="link"
          onClick={window.walletConnection.isSignedIn() ? logout : login}>
          {window.walletConnection.isSignedIn() ? `Sign out` : `Sign in`}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
