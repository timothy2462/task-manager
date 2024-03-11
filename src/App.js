import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from "./pages/Landing"
import { EditPage } from "./pages/EditPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { Recover } from './pages/Recover'


const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/edit", element: <EditPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/recover", element: <Recover /> },
])

function App() {
  return (
    <div className="App" >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
