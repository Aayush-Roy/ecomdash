// // // src/pages/Orders.jsx
// // import { useState, useEffect } from 'react'
// // import { Eye, Search } from 'lucide-react'
// // import axiosInstance from '../api/axiosInstance'
// // import Loader from '../components/Loader'
// // import { formatCurrency, formatDateTime } from '../utils/format'

// // const Orders = () => {
// //   const [orders, setOrders] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [selectedOrder, setSelectedOrder] = useState(null)

// //   useEffect(() => {
// //     fetchOrders()
// //   }, [])

// //   const fetchOrders = async () => {
// //     try {
// //       const response = await axiosInstance.get('/api/orders/admin/all');
// //       console.log("oders", response.data.data)
// //       setOrders(response.data.data)
// //     } catch (error) {
// //       console.error('Error fetching orders:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const fetchOrderDetails = async (id) => {
// //     try {
// //       const response = await axiosInstance.get(`/api/orders/${id}`);
// //       console.log("details", response.data.data)
// //       setSelectedOrder(response.data.data)
// //     } catch (error) {
// //       console.error('Error fetching order details:', error)
// //     }
// //   }

// //   const filteredOrders = orders.filter(order =>
// //     order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
// //   )

// //   if (loading) return <Loader />

// //   return (
// //     <div>
// //       <div className="mb-8">
// //         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
// //         <p className="text-gray-600 dark:text-gray-400">View and manage customer orders</p>
// //       </div>

// //       {/* Search */}
// //       <div className="mb-6">
// //         <div className="relative max-w-md">
// //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //             <Search size={20} className="text-gray-400" />
// //           </div>
// //           <input
// //             type="text"
// //             placeholder="Search orders by ID, email, or name..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //           />
// //         </div>
// //       </div>

// //       {/* Orders Table */}
// //       <div className="bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50 dark:bg-gray-700">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
// //                   Order ID
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
// //                   Customer
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
// //                   Amount
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
// //                   Payment
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
// //                   Status
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
// //                   Date
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
// //               {filteredOrders.map((order) => (
// //                 <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="text-sm font-medium text-gray-900 dark:text-white">
// //                       #{order._id.slice(-8)}
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="text-sm text-gray-900 dark:text-white">
// //                       {order.user?.name || 'N/A'}
// //                     </div>
// //                     <div className="text-sm text-gray-600 dark:text-gray-300">
// //                       {order.user?.email || 'N/A'}
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
// //                     {formatCurrency(order.totalAmount || 0)}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //                       order.paymentStatus === 'paid'
// //                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
// //                         : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
// //                     }`}>
// //                       {order.paymentStatus || 'pending'}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //                       order.status === 'delivered'
// //                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
// //                         : order.status === 'shipped'
// //                         ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
// //                         : order.status === 'pending'
// //                         ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
// //                         : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
// //                     }`}>
// //                       {order.status || 'processing'}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
// //                     {formatDateTime(order.createdAt)}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                     <button
// //                       onClick={() => fetchOrderDetails(order._id)}
// //                       className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
// //                     >
// //                       <Eye size={18} />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Order Details Modal */}
// //       {selectedOrder && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-800">
// //             <div className="flex justify-between items-center mb-6">
// //               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
// //                 Order #{selectedOrder._id.slice(-8)}
// //               </h3>
// //               <button
// //                 onClick={() => setSelectedOrder(null)}
// //                 className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>
            
// //             <div className="space-y-6">
// //               {/* Customer Info */}
// //               <div>
// //                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customer Information</h4>
// //                 <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
// //                       <p className="font-medium dark:text-white">{selectedOrder.user?.name || 'N/A'}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
// //                       <p className="font-medium dark:text-white">{selectedOrder.user?.email || 'N/A'}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Order Details */}
// //               <div>
// //                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Details</h4>
// //                 <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
// //                   <div className="space-y-3">
// //                     {selectedOrder.items?.map((item, index) => (
// //                       <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
// //                         <div>
// //                           <p className="font-medium dark:text-white">{item.product?.title}</p>
// //                           <p className="text-sm text-gray-600 dark:text-gray-400">
// //                             Qty: {item.quantity} × {formatCurrency(item.price)}
// //                           </p>
// //                         </div>
// //                         <p className="font-medium dark:text-white">
// //                           {formatCurrency(item.quantity * item.price)}
// //                         </p>
// //                       </div>
// //                     ))}
                    
// //                     <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
// //                       <p className="font-bold dark:text-white">Total</p>
// //                       <p className="font-bold dark:text-white">{formatCurrency(selectedOrder.totalAmount)}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Order Status */}
// //               <div>
// //                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Status</h4>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
// //                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
// //                       selectedOrder.paymentStatus === 'paid'
// //                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
// //                         : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
// //                     }`}>
// //                       {selectedOrder.paymentStatus || 'pending'}
// //                     </span>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Order Status</p>
// //                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
// //                       selectedOrder.status === 'delivered'
// //                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
// //                         : selectedOrder.status === 'shipped'
// //                         ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
// //                         : selectedOrder.status === 'pending'
// //                         ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
// //                         : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
// //                     }`}>
// //                       {selectedOrder.status || 'processing'}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Order Timeline */}
// //               <div>
// //                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Timeline</h4>
// //                 <div className="space-y-2">
// //                   <div className="flex items-center text-sm">
// //                     <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
// //                     <span className="text-gray-600 dark:text-gray-400">Order placed</span>
// //                     <span className="ml-auto text-gray-500 dark:text-gray-400">
// //                       {formatDateTime(selectedOrder.createdAt)}
// //                     </span>
// //                   </div>
// //                   {selectedOrder.updatedAt !== selectedOrder.createdAt && (
// //                     <div className="flex items-center text-sm">
// //                       <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
// //                       <span className="text-gray-600 dark:text-gray-400">Last updated</span>
// //                       <span className="ml-auto text-gray-500 dark:text-gray-400">
// //                         {formatDateTime(selectedOrder.updatedAt)}
// //                       </span>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Orders
// // src/pages/Orders.jsx
// import { useState, useEffect } from 'react'
// import { Eye, Search, X } from 'lucide-react' // X IMPORT KARO!
// import axiosInstance from '../api/axiosInstance'
// import Loader from '../components/Loader'
// import { formatCurrency, formatDateTime } from '../utils/format'

// const Orders = () => {
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedOrder, setSelectedOrder] = useState(null)
//   const [orderDetailsLoading, setOrderDetailsLoading] = useState(false)

//   useEffect(() => {
//     fetchOrders()
//   }, [])

//   const fetchOrders = async () => {
//     try {
//       const response = await axiosInstance.get('/api/orders/admin/all')
//       console.log("Orders API Response:", response.data)
      
//       // YOUR API RESPONSE STRUCTURE: response.data.data
//       const ordersData = response.data.data || []
//       setOrders(Array.isArray(ordersData) ? ordersData : [])
//     } catch (error) {
//       console.error('Error fetching orders:', error)
//       setOrders([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchOrderDetails = async (id) => {
//     setOrderDetailsLoading(true)
//     try {
//       const response = await axiosInstance.get(`/api/orders/${id}`)
//       console.log("Single Order API Response:", response.data)
      
//       // YOUR ORDER DETAILS STRUCTURE: response.data (not response.data.data)
//       const orderData = response.data.data
      
//       if (!orderData) {
//         throw new Error('No order data received')
//       }
      
//       setSelectedOrder(orderData)
//     } catch (error) {
//       console.error('Error fetching order details:', error)
//       alert(`Failed to fetch order details: ${error.message}`)
//       setSelectedOrder(null)
//     } finally {
//       setOrderDetailsLoading(false)
//     }
//   }

//   const filteredOrders = orders.filter(order => {
//     if (!order) return false
    
//     const searchString = searchTerm.toLowerCase()
//     const orderId = order._id?.toLowerCase() || ''
//     const userEmail = order.user?.email?.toLowerCase() || ''
//     const userName = order.user?.name?.toLowerCase() || ''
    
//     return (
//       orderId.includes(searchString) ||
//       userEmail.includes(searchString) ||
//       userName.includes(searchString)
//     )
//   })

//   if (loading) return <Loader />

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
//         <p className="text-gray-600 dark:text-gray-400">View and manage customer orders</p>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative max-w-md">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={20} className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search orders by ID, email, or name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//           />
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
//                   Payment
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900 dark:text-white">
//                         #{order._id?.slice(-8) || 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 dark:text-white">
//                         {order.user?.name || 'N/A'}
//                       </div>
//                       <div className="text-sm text-gray-600 dark:text-gray-300">
//                         {order.user?.email || 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       {formatCurrency(order.totalAmount || 0)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         order.paymentStatus === 'paid'
//                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                           : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                       }`}>
//                         {order.paymentStatus || 'Pending'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         order.orderStatus === 'Delivered' || order.status === 'delivered'
//                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                           : order.orderStatus === 'Shipped' || order.status === 'shipped'
//                           ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                           : order.orderStatus === 'Pending' || order.status === 'pending'
//                           ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                           : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//                       }`}>
//                         {order.orderStatus || order.status || 'Processing'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
//                       {order.createdAt ? formatDateTime(order.createdAt) : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => fetchOrderDetails(order._id)}
//                         disabled={orderDetailsLoading}
//                         className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
//                       >
//                         <Eye size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
//                     No orders found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-800">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Order #{selectedOrder._id?.slice(-8) || 'N/A'}
//               </h3>
//               <button
//                 onClick={() => setSelectedOrder(null)}
//                 className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//               >
//                 <X size={20} /> {/* YAHAN X USE HAI */}
//               </button>
//             </div>
            
//             {orderDetailsLoading ? (
//               <div className="flex justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {/* Customer Info */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customer Information</h4>
//                   <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
//                         <p className="font-medium dark:text-white">
//                           {selectedOrder.user?.name || 'N/A'}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
//                         <p className="font-medium dark:text-white">
//                           {selectedOrder.user?.email || 'N/A'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Shipping Address */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h4>
//                   <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
//                     <p className="text-sm dark:text-white">
//                       {selectedOrder.address?.street}, {selectedOrder.address?.city}, 
//                       {selectedOrder.address?.state} - {selectedOrder.address?.zip}
//                       <br />
//                       {selectedOrder.address?.country}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Order Details */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Details</h4>
//                   <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
//                     {selectedOrder.items?.length > 0 ? (
//                       <div className="space-y-3">
//                         {selectedOrder.items.map((item, index) => (
//                           <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
//                             <div className="flex-1">
//                               <p className="font-medium dark:text-white">
//                                 {item.product?.title || `Item ${index + 1}`}
//                               </p>
//                               {item.product?.description && (
//                                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                                   {item.product.description}
//                                 </p>
//                               )}
//                             </div>
//                             <div className="text-right ml-4">
//                               <p className="text-sm text-gray-600 dark:text-gray-400">
//                                 Qty: {item.quantity || 1} × {formatCurrency(item.price || 0)}
//                               </p>
//                               <p className="font-medium dark:text-white mt-1">
//                                 {formatCurrency((item.quantity || 1) * (item.price || 0))}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
                        
//                         <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
//                           <p className="font-bold text-lg dark:text-white">Total</p>
//                           <p className="font-bold text-lg dark:text-white">
//                             {formatCurrency(selectedOrder.totalAmount || 0)}
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 dark:text-gray-400 text-center py-4">
//                         No items found
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Order Status */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Status</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
//                         selectedOrder.paymentStatus === 'paid' || selectedOrder.paymentStatus === 'Paid'
//                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                           : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                       }`}>
//                         {selectedOrder.paymentStatus || 'Pending'}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Order Status</p>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
//                         selectedOrder.orderStatus === 'Delivered' || selectedOrder.status === 'delivered'
//                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                           : selectedOrder.orderStatus === 'Shipped' || selectedOrder.status === 'shipped'
//                           ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                           : selectedOrder.orderStatus === 'Pending' || selectedOrder.status === 'pending'
//                           ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                           : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//                       }`}>
//                         {selectedOrder.orderStatus || selectedOrder.status || 'Processing'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Timeline */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Timeline</h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-sm">
//                       <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                       <span className="text-gray-600 dark:text-gray-400">Order placed</span>
//                       <span className="ml-auto text-gray-500 dark:text-gray-400">
//                         {selectedOrder.createdAt ? formatDateTime(selectedOrder.createdAt) : 'N/A'}
//                       </span>
//                     </div>
//                     {selectedOrder.updatedAt && selectedOrder.updatedAt !== selectedOrder.createdAt && (
//                       <div className="flex items-center text-sm">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                         <span className="text-gray-600 dark:text-gray-400">Last updated</span>
//                         <span className="ml-auto text-gray-500 dark:text-gray-400">
//                           {formatDateTime(selectedOrder.updatedAt)}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Orders
// src/pages/Orders.jsx
import { useState, useEffect } from 'react'
import { Eye, Search, X, Truck, CreditCard, Package, CheckCircle } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'
import Loader from '../components/Loader'
import { formatCurrency, formatDateTime } from '../utils/format'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/api/orders/admin/all')
      console.log("Orders API Response:", response.data)
      
      const ordersData = response.data.data || []
      setOrders(Array.isArray(ordersData) ? ordersData : [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const fetchOrderDetails = async (id) => {
    setOrderDetailsLoading(true)
    try {
      const response = await axiosInstance.get(`/api/orders/${id}`)
      console.log("Single Order API Response:", response.data)
      
      const orderData = response.data.data
      if (!orderData) throw new Error('No order data received')
      
      setSelectedOrder(orderData)
    } catch (error) {
      console.error('Error fetching order details:', error)
      alert(`Failed to fetch order details: ${error.message}`)
      setSelectedOrder(null)
    } finally {
      setOrderDetailsLoading(false)
    }
  }

  // Update Payment Status
  const updatePaymentStatus = async (orderId, newStatus) => {
    if (!window.confirm(`Change payment status to "${newStatus}"?`)) return
    
    setUpdatingStatus(true)
    try {
      await axiosInstance.put(`/api/orders/${orderId}/payment`, {
        paymentStatus: newStatus
      })
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, paymentStatus: newStatus } 
          : order
      ))
      
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus })
      }
      
      alert('Payment status updated successfully!')
    } catch (error) {
      console.error('Error updating payment status:', error)
      alert(`Failed to update payment status: ${error.message}`)
    } finally {
      setUpdatingStatus(false)
    }
  }

  // Update Order Status
  const updateOrderStatus = async (orderId, newStatus) => {
    if (!window.confirm(`Change order status to "${newStatus}"?`)) return
    
    setUpdatingStatus(true)
    try {
      await axiosInstance.put(`/api/orders/${orderId}/status`, {
        orderStatus: newStatus
      })
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, orderStatus: newStatus } 
          : order
      ))
      
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus })
      }
      
      alert('Order status updated successfully!')
    } catch (error) {
      console.error('Error updating order status:', error)
      alert(`Failed to update order status: ${error.message}`)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    if (!order) return false
    
    const searchString = searchTerm.toLowerCase()
    const orderId = order._id?.toLowerCase() || ''
    const userEmail = order.user?.email?.toLowerCase() || ''
    const userName = order.user?.name?.toLowerCase() || ''
    
    return (
      orderId.includes(searchString) ||
      userEmail.includes(searchString) ||
      userName.includes(searchString)
    )
  })

  if (loading) return <Loader />

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage customer orders</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders by ID, email, or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        #{order._id?.slice(-8) || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {order.user?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {order.user?.email || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatCurrency(order.totalAmount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : order.paymentStatus === 'Cash on Delivery'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {order.paymentStatus || 'Pending'}
                        </span>
                        {order.paymentStatus === 'Pending' && (
                          <button
                            onClick={() => updatePaymentStatus(order._id, 'Cash on Delivery')}
                            disabled={updatingStatus}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
                          >
                            Mark as COD
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : order.orderStatus === 'Shipped'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : order.orderStatus === 'Processing'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {order.orderStatus || 'Pending'}
                        </span>
                        {order.orderStatus !== 'Delivered' && (
                          <div className="flex space-x-1">
                            {order.orderStatus === 'Pending' && (
                              <button
                                onClick={() => updateOrderStatus(order._id, 'Processing')}
                                disabled={updatingStatus}
                                className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400"
                              >
                                Process
                              </button>
                            )}
                            {order.orderStatus === 'Processing' && (
                              <button
                                onClick={() => updateOrderStatus(order._id, 'Shipped')}
                                disabled={updatingStatus}
                                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
                              >
                                Ship
                              </button>
                            )}
                            {order.orderStatus === 'Shipped' && (
                              <button
                                onClick={() => updateOrderStatus(order._id, 'Delivered')}
                                disabled={updatingStatus}
                                className="text-xs text-green-600 hover:text-green-800 dark:text-green-400"
                              >
                                Deliver
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.createdAt ? formatDateTime(order.createdAt) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => fetchOrderDetails(order._id)}
                        disabled={orderDetailsLoading}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Order #{selectedOrder._id?.slice(-8) || 'N/A'}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            
            {orderDetailsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customer Information</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                        <p className="font-medium dark:text-white">
                          {selectedOrder.user?.name || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium dark:text-white">
                          {selectedOrder.user?.email || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm dark:text-white">
                      {selectedOrder.address?.street}, {selectedOrder.address?.city}, 
                      {selectedOrder.address?.state} - {selectedOrder.address?.zip}
                      <br />
                      {selectedOrder.address?.country}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Details</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    {selectedOrder.items?.length > 0 ? (
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                            <div className="flex-1">
                              <p className="font-medium dark:text-white">
                                {item.product?.title || `Item ${index + 1}`}
                              </p>
                              {item.product?.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {item.product.description}
                                </p>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Qty: {item.quantity || 1} × {formatCurrency(item.price || 0)}
                              </p>
                              <p className="font-medium dark:text-white mt-1">
                                {formatCurrency((item.quantity || 1) * (item.price || 0))}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                          <p className="font-bold text-lg dark:text-white">Total</p>
                          <p className="font-bold text-lg dark:text-white">
                            {formatCurrency(selectedOrder.totalAmount || 0)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No items found
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Status Management */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Payment Status */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
                        <CreditCard size={16} className="text-gray-400" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updatePaymentStatus(selectedOrder._id, 'Cash on Delivery')}
                          disabled={updatingStatus || selectedOrder.paymentStatus === 'Cash on Delivery'}
                          className={`px-3 py-1 text-xs rounded-lg ${
                            selectedOrder.paymentStatus === 'Cash on Delivery'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
                          } disabled:opacity-50`}
                        >
                          COD
                        </button>
                        <button
                          onClick={() => updatePaymentStatus(selectedOrder._id, 'Paid')}
                          disabled={updatingStatus || selectedOrder.paymentStatus === 'Paid'}
                          className={`px-3 py-1 text-xs rounded-lg ${
                            selectedOrder.paymentStatus === 'Paid'
                              ? 'bg-green-600 text-white'
                              : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                          } disabled:opacity-50`}
                        >
                          Paid
                        </button>
                        <button
                          onClick={() => updatePaymentStatus(selectedOrder._id, 'Pending')}
                          disabled={updatingStatus || selectedOrder.paymentStatus === 'Pending'}
                          className={`px-3 py-1 text-xs rounded-lg ${
                            selectedOrder.paymentStatus === 'Pending'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
                          } disabled:opacity-50`}
                        >
                          Pending
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Current: <span className="font-medium">{selectedOrder.paymentStatus || 'Pending'}</span>
                      </p>
                    </div>

                    {/* Order Status */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Order Status</p>
                        <Truck size={16} className="text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateOrderStatus(selectedOrder._id, 'Processing')}
                            disabled={updatingStatus || selectedOrder.orderStatus === 'Processing'}
                            className={`flex-1 px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
                              selectedOrder.orderStatus === 'Processing'
                                ? 'bg-purple-600 text-white'
                                : 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
                            } disabled:opacity-50`}
                          >
                            <Package size={14} className="mr-1" />
                            Processing
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateOrderStatus(selectedOrder._id, 'Shipped')}
                            disabled={updatingStatus || selectedOrder.orderStatus === 'Shipped'}
                            className={`flex-1 px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
                              selectedOrder.orderStatus === 'Shipped'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
                            } disabled:opacity-50`}
                          >
                            <Truck size={14} className="mr-1" />
                            Shipped
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateOrderStatus(selectedOrder._id, 'Delivered')}
                            disabled={updatingStatus || selectedOrder.orderStatus === 'Delivered'}
                            className={`flex-1 px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
                              selectedOrder.orderStatus === 'Delivered'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                            } disabled:opacity-50`}
                          >
                            <CheckCircle size={14} className="mr-1" />
                            Delivered
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Current: <span className="font-medium">{selectedOrder.orderStatus || 'Pending'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600 dark:text-gray-400">Order placed</span>
                      <span className="ml-auto text-gray-500 dark:text-gray-400">
                        {selectedOrder.createdAt ? formatDateTime(selectedOrder.createdAt) : 'N/A'}
                      </span>
                    </div>
                    {selectedOrder.updatedAt && selectedOrder.updatedAt !== selectedOrder.createdAt && (
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-gray-600 dark:text-gray-400">Last updated</span>
                        <span className="ml-auto text-gray-500 dark:text-gray-400">
                          {formatDateTime(selectedOrder.updatedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders