// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/dashboard/categories', icon: <Tag size={20} />, label: 'Categories' },
    { path: '/dashboard/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/dashboard/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
    { path: '/dashboard/users', icon: <Users size={20} />, label: 'Users' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen pt-16 transition-all duration-300 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700
        ${sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group
                    ${location.pathname === item.path ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-900 dark:text-white'}
                  `}
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className={`ml-3 ${!sidebarOpen && 'lg:hidden'}`}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="absolute bottom-4 left-3 right-3">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <LogOut size={20} />
              <span className={`ml-3 ${!sidebarOpen && 'lg:hidden'}`}>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute hidden lg:flex items-center justify-center -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </aside>
    </>
  )
}

export default Sidebar