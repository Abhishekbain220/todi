import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { UserContext } from '../utils/UserContext'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  let {logout}=useContext(UserContext)

  return (
    <nav className="bg-white  shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-blue-600">
            <Link to="/">MyApp</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">Profile</Link>
            <Link onClick={logout} className="text-gray-700 hover:text-blue-600 transition">Logout</Link>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t">
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/profile" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Profile</Link>
          <Link className="block py-2 text-gray-700 hover:text-blue-600" onClick={logout}>Logout</Link>
        </div>
      )}
    </nav>
  )
}

export default Nav
