import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './assets/styles/spacers.css'
import './assets/styles/bootstrap.css'
import './assets/styles/styles.css'
import App from './App'
import Home from './screens/Home'
import About from './screens/About'
import Login from './screens/Login'
import Register from './screens/Register'
import Help from './screens/Help'
import Patrons from './screens/Patrons'
import Profile from './screens/Profile'
import Dashboard from './screens/Dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/help' element={<Help />} />
      <Route path='/patrons' element={<Patrons />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/Dashboard' element={<Dashboard />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
