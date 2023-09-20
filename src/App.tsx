import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom';
import HomePage from './pages/Home';
import CreateUserPage from './pages/CreateUser';
import AddHobbiePage from './pages/AddHobbie';
import AppMenuBar from './components/AppMenuBar/AppMenuBar';
import {
  Alert,
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  Snackbar,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AlertContext,
  AlertProvider,
} from './components/AlertContext/AlertContext';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/users/create', element: <CreateUserPage /> },
  { path: '/hobbies/add', element: <AddHobbiePage /> },
]);

const menuItems = [
  { id: 1, name: 'Home Page', link: '/' },
  { id: 2, name: 'Create new user', link: '/users/create' },
  { id: 3, name: 'Add new Hobbie', link: '/hobbies/add' },
];

function App() {
  const { isOpen, message, closeAlert, alertMessage,severity } = useContext(AlertContext);


  return (
      <div className="App">
        <header className="App-header"></header>
        <nav>
          <div className="navbar">
            <AppMenuBar menu={menuItems}></AppMenuBar>
          </div>
        </nav>
        <main>
          <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isOpen}
            autoHideDuration={6000}
            onClose={closeAlert}
          >
            <Alert
              onClose={closeAlert}
              severity={severity}
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
          </Snackbar>
          <Container
            style={{ border: '#000000 1px solid' }}
            className="router-container"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users/create" element={<CreateUserPage />} />
              <Route path="/hobbies/add" element={<AddHobbiePage />} />
            </Routes>
          </Container>
        </main>
      </div>
  );
}

export default App;
