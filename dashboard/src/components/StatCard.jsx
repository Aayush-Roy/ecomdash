// src/components/StatCard.jsx
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatCard = ({ title, value, icon, change, changeType = 'up' }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-2 dark:text-white">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="flex items-center mt-4">
          {changeType === 'up' ? (
            <TrendingUp size={16} className="text-green-500" />
          ) : (
            <TrendingDown size={16} className="text-red-500" />
          )}
          <span className={`ml-1 text-sm font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">from last month</span>
        </div>
      )}
    </div>
  )
}

export default StatCard