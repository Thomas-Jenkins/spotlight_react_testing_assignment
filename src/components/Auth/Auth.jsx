import { useContext, useState } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { authUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserContext);
  
  const authenticateUser = async () => {
    const userResponse = await authUser(email, password, type);
    setUser(userResponse);
    setEmail('');
    setPassword('');
    <Redirect to="/" />;
  };

  if (user) {
    return <Redirect to="/" />;
  }
  
  return (
    <section>
      <div className="auth-header">
        <div>
          <label htmlFor='email'>Email</label>
          <input id="email" className="form email-input" type="text" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' className="form password-input" type="password" value={ password } onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        <label htmlFor="go">{ type }</label>
        <button id="go" className="form auth-button" onClick={ authenticateUser }>{ type }</button>

        {
          type === 'sign-in' ?
            <Link className='auth-link' to='/auth/sign-up'>sign-up</Link> :
            <Link className='auth-link' to='/auth/sign-in'>sign-in</Link>
        }

      </div>

      <div className="auth-body">
        <h1>postmodern!</h1>
        <br />
        <hr />
        <h4>login.</h4>
      </div>

    </section>
  );
}