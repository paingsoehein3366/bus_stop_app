import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InputApp from './componant/inputApp';
import BackOfficeApp from './componant/backoffice';
import LoginApp from './componant/loginApp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/inputApp",
    element: <InputApp />
  },
  {
    path: "/backOffice",
    element: <BackOfficeApp />
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
