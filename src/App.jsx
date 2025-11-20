import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx'; 
import Home from './Pages/Home.jsx';
import Menu from './Pages/Menu.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';


const Layout = () => (
  <>
    <Header /> 
    <div className="main-content-container">
        <Outlet /> 
    </div>
  </>
);


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />, 
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/about',
        element: <About />, 
      },
      {
        path: '/contact',
        element: <Contact />, 
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;