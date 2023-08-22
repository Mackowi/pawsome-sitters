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
import Home from './screens/homepage/Home'
import About from './screens/homepage/About'
import Login from './screens/homepage/Login'
import Register from './screens/homepage/Register'
import Help from './screens/homepage/Help'
import Profile from './screens/Profile'
import Dashboard from './screens/Dashboard'
import AccountSettings from './screens/dashboard/AccountSettings'
import ProfileSettings from './screens/dashboard/ProfileSettings'
import Pets from './screens/dashboard/Pets'
import PrivateRoute from './components/PrivateRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/help' element={<Help />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/account' element={<AccountSettings />} />
        <Route path='/dashboard/profile' element={<ProfileSettings />} />
        <Route path='/dashboard/pets' element={<Pets />} />
      </Route>
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
