import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './components/context/UserContext';

import * as authFns from './services/auth';

jest.mock('./services/auth');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@temp.com'
};




  

test('auth screen is displayed', () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const emailInput = screen.getByLabelText(/email/i);
  const passInput = screen.getByLabelText(/password/i);
  const buttonElem = screen.getByLabelText(/sign-in/i || /sign-up/i);
  expect(emailInput).toBeInTheDocument();
  expect(passInput).toBeInTheDocument();
  expect(buttonElem).toBeInTheDocument();
});

test('can user sign in', async () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);

  // const headerElem = screen.getByText(/postmodern!/i);
  // expect(headerElem).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'random@temp.com' } }); 

  const passInput = screen.getByLabelText(/password/i);
  fireEvent.change(passInput, { target: { value: 'temporary' } });
  
  const button = screen.getByRole('button');
  fireEvent.click(button);

  const headerText = await screen.findByLabelText('header');
  expect(headerText).toBeInTheDocument();

});