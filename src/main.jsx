import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddPant from './components/AddPant.jsx';
import UpdatePant from './components/UpdatePant.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetch('http://localhost:5000/pants')
  },
  {
    path: "/addPant",
    element: <AddPant />,
  },
  {
    path: "/updatePant/:id",
    element: <UpdatePant />,
    loader: ({ params }) => fetch(`http://localhost:5000/pants/${params.id}`)
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
