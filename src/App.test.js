import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './components/context/UserContext';

import * as authFns from './services/auth';
import * as postsFns from './services/fetchUtils';

jest.mock('./services/auth');
jest.mock('./services/fetchUtils');

const mockUser = {
  User_UID: '91569563-e646-4385-98e7-f16b685c921f',
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

const fakePosts = [
  {
    id: 1,
    email: 'random@temp.com',
    title: 'A random Title #1',
    description: 'A random Description #1',
    uuid: '91569563-e646-4385-98e7-f16b685c921f'
  },
  {
    id: 2,
    email: 'random2@temp.com',
    title: 'A random Title #2',
    description: 'A random Description #2',
    uuid: '7'
  }
];  
it('user can edit their own posts', async () => {
  authFns.authUser.mockReturnValue(mockUser);
  postsFns.getPosts.mockReturnValue(fakePosts);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/Posts']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

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

  const postOne = await screen.findByText(/A random Title #1/i);
  expect(postOne).toBeInTheDocument();
  fireEvent.click(postOne);

  const editButton = await screen.findByText(/Edit/i);
  expect(editButton).toBeInTheDocument();

  // const backButton = await screen.findByText(/postmodern!/i);
  // expect(backButton).toBeInTheDocument();
  // fireEvent.click(backButton);

  // const postTwo = await screen.findByText(/A random Title #2/i);
  // expect(postTwo).toBeInTheDocument();
});

// it('user cannot edit their own posts', async () => {
//   authFns.authUser.mockReturnValue(mockUser);
//   postsFns.getPosts.mockReturnValue(fakePosts);
//   render(
//     <UserProvider>
//       <MemoryRouter initialEntries={['/Posts']}>
//         <App />
//       </MemoryRouter>
//     </UserProvider>



//   );

//   // const headerElem = screen.getByText(/postmodern!/i);
//   // expect(headerElem).toBeInTheDocument();

//   const emailInput = screen.getByLabelText(/email/i);
//   fireEvent.change(emailInput, { target: { value: 'random@temp.com' } }); 

//   const passInput = screen.getByLabelText(/password/i);
//   fireEvent.change(passInput, { target: { value: 'temporary' } });
  
//   const button = screen.getByRole('button');
//   fireEvent.click(button);

//   const headerText = await screen.findByLabelText('header');
//   expect(headerText).toBeInTheDocument();

//   const postTwo = await screen.findByText(/A random Title #2/i);
//   expect(postTwo).toBeInTheDocument();
//   fireEvent.click(postTwo);

//   const editButton = await screen.findByLabelText(/edit/i);
//   expect(editButton).toBeNull();
// });