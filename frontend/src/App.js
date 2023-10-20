import { Outlet } from 'react-router-dom'
import Navbar from './components/homepage/Navbar'
import Footer from './components/homepage/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <ToastContainer />
      <Navbar />
      <main className='flex-grow-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default App
