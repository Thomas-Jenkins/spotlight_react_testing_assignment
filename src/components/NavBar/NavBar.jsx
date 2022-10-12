import React, { useContext } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { signOut } from '../../services/auth';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

export default function Navbar() {

  const { user, setUser } = useContext(UserContext);

  const handleSignout = async () => {
    await signOut();
    setUser(null);
  };

  if (!user) return <Redirect to="/auth/sign-in" />;

  return (
    <section className="nav-wrapper">
      <header>
        { user && (
          <>
            <div className="title-link"><a className="title-link" href="/">postmodern!</a></div>
            <NavLink className="create-post-link" to="/post/create">Create Post</NavLink>
            
            <p aria-label="header" className="header-text">Signed in as: <span className="header-text">{ user.email }</span></p>
            <div className="signout-button">
              <button onClick={ handleSignout }>sign out</button>
            </div>
          </>
        ) }

      </header>
    </section>
  );
}
