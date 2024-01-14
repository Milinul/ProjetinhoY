/* área principal do código */
// import do css
import './App.css'

// import da area de login e dashboard
import Dashboard_dynamic from './components/Dashboard_dynamic/Dashboard_dynamic'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'

//import da biblioteca de rotas
import{
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

//criação das rotas de troca de tela
const router = createBrowserRouter([
{
  path: '/',
  element: <div><Login/></div>
},
{
  path: '/dashboard',
  element: <div><Dashboard/></div>
},
{
  path: '/dashboard_dynamic/:id_ala',
  element: <div><Dashboard_dynamic/></div>
}
])

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
