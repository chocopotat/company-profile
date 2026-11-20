import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BottomNavbar from '../components/BottomNavbar'
import Footer from '../components/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNavbar />
    </div>
  )
}
