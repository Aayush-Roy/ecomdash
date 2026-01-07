
// // import { useState, useEffect } from 'react'
// // import { Eye, Search, X, Truck, CreditCard, Package, CheckCircle } from 'lucide-react'
// // import axiosInstance from '../api/axiosInstance'
// // import Loader from '../components/Loader'
// // import { formatCurrency, formatDateTime } from '../utils/format'

// // const Orders = () => {
// //   const [orders, setOrders] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [selectedOrder, setSelectedOrder] = useState(null)
// //   const [orderDetailsLoading, setOrderDetailsLoading] = useState(false)
// //   const [updatingStatus, setUpdatingStatus] = useState(false)

// //   useEffect(() => {
// //     fetchOrders()
// //   }, [])

// //   const fetchOrders = async () => {
// //     try {
// //       const response = await axiosInstance.get('/api/orders/admin/all')
// //       console.log("Orders API Response:", response.data)
      
// //       const ordersData = response.data.data || []
// //       setOrders(Array.isArray(ordersData) ? ordersData : [])
// //     } catch (error) {
// //       console.error('Error fetching orders:', error)
// //       setOrders([])
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const fetchOrderDetails = async (id) => {
// //     setOrderDetailsLoading(true)
// //     try {
// //       const response = await axiosInstance.get(`/api/orders/${id}`)
// //       console.log("Single Order API Response:", response.data)
      
// //       const orderData = response.data.data
// //       if (!orderData) throw new Error('No order data received')
      
// //       setSelectedOrder(orderData)
// //     } catch (error) {
// //       console.error('Error fetching order details:', error)
// //       alert(`Failed to fetch order details: ${error.message}`)
// //       setSelectedOrder(null)
// //     } finally {
// //       setOrderDetailsLoading(false)
// //     }
// //   }

// //   // Update Payment Status
// //   const updatePaymentStatus = async (orderId, newStatus) => {
// //     if (!window.confirm(`Change payment status to "${newStatus}"?`)) return
    
// //     setUpdatingStatus(true)
// //     try {
// //       await axiosInstance.put(`/api/orders/${orderId}/payment`, {
// //         paymentStatus: newStatus
// //       })
      
// //       // Update local state
// //       setOrders(orders.map(order => 
// //         order._id === orderId 
// //           ? { ...order, paymentStatus: newStatus } 
// //           : order
// //       ))
      
// //       if (selectedOrder && selectedOrder._id === orderId) {
// //         setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus })
// //       }
      
// //       alert('Payment status updated successfully!')
// //     } catch (error) {
// //       console.error('Error updating payment status:', error)
// //       alert(`Failed to update payment status: ${error.message}`)
// //     } finally {
// //       setUpdatingStatus(false)
// //     }
// //   }

// //   // Update Order Status
// //   const updateOrderStatus = async (orderId, newStatus) => {
// //     if (!window.confirm(`Change order status to "${newStatus}"?`)) return
    
// //     setUpdatingStatus(true)
// //     try {
// //       await axiosInstance.put(`/api/orders/${orderId}/status`, {
// //         orderStatus: newStatus
// //       })
      
// //       // Update local state
// //       setOrders(orders.map(order => 
// //         order._id === orderId 
// //           ? { ...order, orderStatus: newStatus } 
// //           : order
// //       ))
      
// //       if (selectedOrder && selectedOrder._id === orderId) {
// //         setSelectedOrder({ ...selectedOrder, orderStatus: newStatus })
// //       }
      
// //       alert('Order status updated successfully!')
// //     } catch (error) {
// //       console.error('Error updating order status:', error)
// //       alert(`Failed to update order status: ${error.message}`)
// //     } finally {
// //       setUpdatingStatus(false)
// //     }
// //   }

// //   const filteredOrders = orders.filter(order => {
// //     if (!order) return false
    
// //     const searchString = searchTerm.toLowerCase()
// //     const orderId = order._id?.toLowerCase() || ''
// //     const userEmail = order.user?.email?.toLowerCase() || ''
// //     const userName = order.user?.name?.toLowerCase() || ''
    
// //     return (
// //       orderId.includes(searchString) ||
// //       userEmail.includes(searchString) ||
// //       userName.includes(searchString)
// //     )
// //   })

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
// //               {filteredOrders.length > 0 ? (
// //                 filteredOrders.map((order) => (
// //                   <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="text-sm font-medium text-gray-900 dark:text-white">
// //                         #{order._id?.slice(-8) || 'N/A'}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="text-sm text-gray-900 dark:text-white">
// //                         {order.user?.name || 'N/A'}
// //                       </div>
// //                       <div className="text-sm text-gray-600 dark:text-gray-300">
// //                         {order.user?.email || 'N/A'}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
// //                       {formatCurrency(order.totalAmount || 0)}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="flex flex-col space-y-1">
// //                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //                           order.paymentStatus === 'Paid'
// //                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
// //                             : order.paymentStatus === 'Cash on Delivery'
// //                             ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
// //                             : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
// //                         }`}>
// //                           {order.paymentStatus || 'Pending'}
// //                         </span>
// //                         {order.paymentStatus === 'Pending' && (
// //                           <button
// //                             onClick={() => updatePaymentStatus(order._id, 'Cash on Delivery')}
// //                             disabled={updatingStatus}
// //                             className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
// //                           >
// //                             Mark as COD
// //                           </button>
// //                         )}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="flex flex-col space-y-1">
// //                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //                           order.orderStatus === 'Delivered'
// //                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
// //                             : order.orderStatus === 'Shipped'
// //                             ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
// //                             : order.orderStatus === 'Processing'
// //                             ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
// //                             : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
// //                         }`}>
// //                           {order.orderStatus || 'Pending'}
// //                         </span>
// //                         {order.orderStatus !== 'Delivered' && (
// //                           <div className="flex space-x-1">
// //                             {order.orderStatus === 'Pending' && (
// //                               <button
// //                                 onClick={() => updateOrderStatus(order._id, 'Processing')}
// //                                 disabled={updatingStatus}
// //                                 className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400"
// //                               >
// //                                 Process
// //                               </button>
// //                             )}
// //                             {order.orderStatus === 'Processing' && (
// //                               <button
// //                                 onClick={() => updateOrderStatus(order._id, 'Shipped')}
// //                                 disabled={updatingStatus}
// //                                 className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
// //                               >
// //                                 Ship
// //                               </button>
// //                             )}
// //                             {order.orderStatus === 'Shipped' && (
// //                               <button
// //                                 onClick={() => updateOrderStatus(order._id, 'Delivered')}
// //                                 disabled={updatingStatus}
// //                                 className="text-xs text-green-600 hover:text-green-800 dark:text-green-400"
// //                               >
// //                                 Deliver
// //                               </button>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
// //                       {order.createdAt ? formatDateTime(order.createdAt) : 'N/A'}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                       <button
// //                         onClick={() => fetchOrderDetails(order._id)}
// //                         disabled={orderDetailsLoading}
// //                         className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
// //                         title="View Details"
// //                       >
// //                         <Eye size={18} />
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
// //                     No orders found
// //                   </td>
// //                 </tr>
// //               )}
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
// //                 Order #{selectedOrder._id?.slice(-8) || 'N/A'}
// //               </h3>
// //               <button
// //                 onClick={() => setSelectedOrder(null)}
// //                 className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>
            
// //             {orderDetailsLoading ? (
// //               <div className="flex justify-center py-8">
// //                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //               </div>
// //             ) : (
// //               <div className="space-y-6">
// //                 {/* Customer Info */}
// //                 <div>
// //                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customer Information</h4>
// //                   <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
// //                         <p className="font-medium dark:text-white">
// //                           {selectedOrder.user?.name || 'N/A'}
// //                         </p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
// //                         <p className="font-medium dark:text-white">
// //                           {selectedOrder.user?.email || 'N/A'}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Shipping Address */}
// //                 <div>
// //                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h4>
// //                   <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
// //                     <p className="text-sm dark:text-white">
// //                       {selectedOrder.address?.street}, {selectedOrder.address?.city}, 
// //                       {selectedOrder.address?.state} - {selectedOrder.address?.zip}
// //                       <br />
// //                       {selectedOrder.address?.country}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Order Details */}
// //                 <div>
// //                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Details</h4>
// //                   <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
// //                     {selectedOrder.items?.length > 0 ? (
// //                       <div className="space-y-3">
// //                         {selectedOrder.items.map((item, index) => (
// //                           <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
// //                             <div className="flex-1">
// //                               <p className="font-medium dark:text-white">
// //                                 {item.product?.title || `Item ${index + 1}`}
// //                               </p>
// //                               {item.product?.description && (
// //                                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
// //                                   {item.product.description}
// //                                 </p>
// //                               )}
// //                             </div>
// //                             <div className="text-right ml-4">
// //                               <p className="text-sm text-gray-600 dark:text-gray-400">
// //                                 Qty: {item.quantity || 1} × {formatCurrency(item.price || 0)}
// //                               </p>
// //                               <p className="font-medium dark:text-white mt-1">
// //                                 {formatCurrency((item.quantity || 1) * (item.price || 0))}
// //                               </p>
// //                             </div>
// //                           </div>
// //                         ))}
                        
// //                         <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
// //                           <p className="font-bold text-lg dark:text-white">Total</p>
// //                           <p className="font-bold text-lg dark:text-white">
// //                             {formatCurrency(selectedOrder.totalAmount || 0)}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-500 dark:text-gray-400 text-center py-4">
// //                         No items found
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Order Status Management */}
// //                 <div>
// //                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Management</h4>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     {/* Payment Status */}
// //                     <div>
// //                       <div className="flex items-center justify-between mb-2">
// //                         <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
// //                         <CreditCard size={16} className="text-gray-400" />
// //                       </div>
// //                       <div className="flex flex-wrap gap-2">
// //                         <button
// //                           onClick={() => updatePaymentStatus(selectedOrder._id, 'Cash on Delivery')}
// //                           disabled={updatingStatus || selectedOrder.paymentStatus === 'Cash on Delivery'}
// //                           className={`px-3 py-1 text-xs rounded-lg ${
// //                             selectedOrder.paymentStatus === 'Cash on Delivery'
// //                               ? 'bg-blue-600 text-white'
// //                               : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
// //                           } disabled:opacity-50`}
// //                         >
// //                           COD
// //                         </button>
// //                         <button
// //                           onClick={() => updatePaymentStatus(selectedOrder._id, 'Paid')}
// //                           disabled={updatingStatus || selectedOrder.paymentStatus === 'Paid'}
// //                           className={`px-3 py-1 text-xs rounded-lg ${
// //                             selectedOrder.paymentStatus === 'Paid'
// //                               ? 'bg-green-600 text-white'
// //                               : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
// //                           } disabled:opacity-50`}
// //                         >
// //                           Paid
// //                         </button>
// //                         <button
// //                           onClick={() => updatePaymentStatus(selectedOrder._id, 'Pending')}
// //                           disabled={updatingStatus || selectedOrder.paymentStatus === 'Pending'}
// //                           className={`px-3 py-1 text-xs rounded-lg ${
// //                             selectedOrder.paymentStatus === 'Pending'
// //                               ? 'bg-yellow-600 text-white'
// //                               : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
// //                           } disabled:opacity-50`}
// //                         >
// //                           Pending
// //                         </button>
// //                       </div>
// //                       <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
// //                         Current: <span className="font-medium">{selectedOrder.paymentStatus || 'Pending'}</span>
// //                       </p>
// //                     </div>

// //                     {/* Order Status */}
// //                     <div>
// //                       <div className="flex items-center justify-between mb-2">
// //                         <p className="text-sm text-gray-600 dark:text-gray-400">Order Status</p>
// //                         <Truck size={16} className="text-gray-400" />
// //                       </div>
// //                       <div className="space-y-2">
// //                         <div className="flex items-center space-x-2">
// //                           <button
// //                             onClick={() => updateOrderStatus(selectedOrder._id, 'Processing')}
// //                             disabled={updatingStatus || selectedOrder.orderStatus === 'Processing'}
// //                             className={`flex-1 px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
// //                               selectedOrder.orderStatus === 'Processing'
// //                                 ? 'bg-purple-600 text-white'
// //                                 : 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
// //                             } disabled:opacity-50`}
// //                           >
// //                             <Package size={14} className="mr-1" />
// //                             Processing
// //                           </button>
// //                         </div>
// //                         <div className="flex items-center space-x-2">
// //                           <button
// //                             onClick={() => updateOrderStatus(selectedOrder._id, 'Shipped')}
// //                             disabled={updatingStatus || selectedOrder.orderStatus === 'Shipped'}
// //                             className={`flex-1 px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
// //                               selectedOrder.orderStatus === 'Shipped'
// //                                 ? 'bg-blue-600 text-white'
// //                                 : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
// //                             } disabled:opacity-50`}
// //                           >
// //                             <Truck size={14} className="mr-1" />
// //                             Shipped
// //                           </button>
// //                         </div>
// //                         <div className="flex items-center space-x-2">
// //                           <button
// //                             onClick={() => updateOrderStatus(selectedOrder._id, 'Delivered')}
// //                             disabled={updatingStatus || selectedOrder.orderStatus === 'Delivered'}
// //                             className={`flex-1 px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
// //                               selectedOrder.orderStatus === 'Delivered'
// //                                 ? 'bg-green-600 text-white'
// //                                 : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
// //                             } disabled:opacity-50`}
// //                           >
// //                             <CheckCircle size={14} className="mr-1" />
// //                             Delivered
// //                           </button>
// //                         </div>
// //                       </div>
// //                       <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
// //                         Current: <span className="font-medium">{selectedOrder.orderStatus || 'Pending'}</span>
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Order Timeline */}
// //                 <div>
// //                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Timeline</h4>
// //                   <div className="space-y-2">
// //                     <div className="flex items-center text-sm">
// //                       <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
// //                       <span className="text-gray-600 dark:text-gray-400">Order placed</span>
// //                       <span className="ml-auto text-gray-500 dark:text-gray-400">
// //                         {selectedOrder.createdAt ? formatDateTime(selectedOrder.createdAt) : 'N/A'}
// //                       </span>
// //                     </div>
// //                     {selectedOrder.updatedAt && selectedOrder.updatedAt !== selectedOrder.createdAt && (
// //                       <div className="flex items-center text-sm">
// //                         <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
// //                         <span className="text-gray-600 dark:text-gray-400">Last updated</span>
// //                         <span className="ml-auto text-gray-500 dark:text-gray-400">
// //                           {formatDateTime(selectedOrder.updatedAt)}
// //                         </span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Orders
// // src/pages/Orders.jsx
// import { useState, useEffect } from 'react'
// import { Eye, Search, X, Truck, CreditCard, Package, CheckCircle } from 'lucide-react'
// import axiosInstance from '../api/axiosInstance'
// import Loader from '../components/Loader'
// import { formatCurrency, formatDateTime } from '../utils/format'

// const Orders = () => {
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedOrder, setSelectedOrder] = useState(null)
//   const [orderDetailsLoading, setOrderDetailsLoading] = useState(false)
//   const [updatingStatus, setUpdatingStatus] = useState(false)

//   useEffect(() => {
//     fetchOrders()
//   }, [])

//   const fetchOrders = async () => {
//     try {
//       const response = await axiosInstance.get('/api/orders/admin/all')
//       console.log("Orders API Response:", response.data.data)
      
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
//       console.log("Single Order API Response:", response.data.data)
      
//       const orderData = response.data.data
//       if (!orderData) throw new Error('No order data received')
      
//       setSelectedOrder(orderData)
//     } catch (error) {
//       console.error('Error fetching order details:', error)
//       alert(`Failed to fetch order details: ${error.message}`)
//       setSelectedOrder(null)
//     } finally {
//       setOrderDetailsLoading(false)
//     }
//   }

//   // Update Order Status (using single PUT endpoint)
//   // const updateOrderStatus = async (orderId, newStatus, statusType = 'orderStatus') => {
//   //   if (!window.confirm(`Change ${statusType} to "${newStatus}"?`)) return
    
//   //   setUpdatingStatus(true)
//   //   try {
//   //     const updateData = {}
//   //     if (statusType === 'orderStatus') {
//   //       updateData.orderStatus = newStatus
//   //     } else if (statusType === 'paymentStatus') {
//   //       updateData.paymentStatus = newStatus
//   //     }
      
//   //     await axiosInstance.put(`/api/orders/${orderId}`, updateData)
      
//   //     // Update local state
//   //     setOrders(orders.map(order => 
//   //       order._id === orderId 
//   //         ? { 
//   //             ...order, 
//   //             [statusType]: newStatus,
//   //             updatedAt: new Date().toISOString()
//   //           } 
//   //         : order
//   //     ))
      
//   //     if (selectedOrder && selectedOrder._id === orderId) {
//   //       setSelectedOrder({ 
//   //         ...selectedOrder, 
//   //         [statusType]: newStatus,
//   //         updatedAt: new Date().toISOString()
//   //       })
//   //     }
      
//   //     alert(`${statusType === 'orderStatus' ? 'Order' : 'Payment'} status updated successfully!`)
//   //     fetchOrders() // Refresh orders list
//   //   } catch (error) {
//   //     console.error(`Error updating ${statusType}:`, error)
//   //     alert(`Failed to update status: ${error.message}`)
//   //   } finally {
//   //     setUpdatingStatus(false)
//   //   }
//   // }
//   // Updated updateOrderStatus function
// // const updateOrderStatus = async (orderId, newStatus, statusType = 'orderStatus') => {
// //   if (!window.confirm(`Change ${statusType} to "${newStatus}"?`)) return
  
// //   setUpdatingStatus(true)
// //   try {
// //     const updateData = {}
// //     if (statusType === 'orderStatus') {
// //       updateData.orderStatus = newStatus
// //     } else if (statusType === 'paymentStatus') {
// //       updateData.paymentStatus = newStatus
// //     }
    
// //     // IMPORTANT: Use USER endpoint since admin endpoint doesn't exist
// //     // Your API allows users to update their own orders
// //     // We'll use the same endpoint for admin
// //     await axiosInstance.put(`/api/orders/${orderId}`, updateData)
    
// //     // Update local state
// //     setOrders(orders.map(order => 
// //       order._id === orderId 
// //         ? { 
// //             ...order, 
// //             [statusType]: newStatus,
// //             updatedAt: new Date().toISOString()
// //           } 
// //         : order
// //     ))
    
// //     if (selectedOrder && selectedOrder._id === orderId) {
// //       setSelectedOrder({ 
// //         ...selectedOrder, 
// //         [statusType]: newStatus,
// //         updatedAt: new Date().toISOString()
// //       })
// //     }
    
// //     alert(`${statusType === 'orderStatus' ? 'Order' : 'Payment'} status updated successfully!`)
// //   } catch (error) {
// //     console.error(`Error updating ${statusType}:`, error)
    
// //     // If API fails, still update frontend for demo
// //     if (error.response?.status === 404 || error.response?.status === 403) {
// //       // Update frontend only
// //       setOrders(orders.map(order => 
// //         order._id === orderId 
// //           ? { 
// //               ...order, 
// //               [statusType]: newStatus,
// //               updatedAt: new Date().toISOString()
// //             } 
// //           : order
// //       ))
      
// //       if (selectedOrder && selectedOrder._id === orderId) {
// //         setSelectedOrder({ 
// //           ...selectedOrder, 
// //           [statusType]: newStatus,
// //           updatedAt: new Date().toISOString()
// //         })
// //       }
      
// //       alert(`Status updated in dashboard (backend update may require user permission)`)
// //     } else {
// //       alert(`Failed to update status: ${error.message}`)
// //     }
// //   } finally {
// //     setUpdatingStatus(false)
// //   }
// // }
//   // Updated updateOrderStatus function for new endpoints
// const updateOrderStatus = async (orderId, newStatus, statusType = 'orderStatus') => {
//   if (!window.confirm(`Change ${statusType} to "${newStatus}"?`)) return
  
//   setUpdatingStatus(true)
//   try {
//     // Determine which endpoint to use
//     let endpoint, data;
    
//     if (statusType === 'orderStatus') {
//       endpoint = `/api/orders/admin/${orderId}/status`;
//       data = { orderStatus: newStatus };
//     } else {
//       endpoint = `/api/orders/admin/${orderId}/payment`;
//       data = { paymentStatus: newStatus };
//     }
    
//     await axiosInstance.put(endpoint, data);
    
//     // Update local state
//     setOrders(orders.map(order => 
//       order._id === orderId 
//         ? { 
//             ...order, 
//             [statusType]: newStatus,
//             updatedAt: new Date().toISOString()
//           } 
//         : order
//     ))
    
//     if (selectedOrder && selectedOrder._id === orderId) {
//       setSelectedOrder({ 
//         ...selectedOrder, 
//         [statusType]: newStatus,
//         updatedAt: new Date().toISOString()
//       })
//     }
    
//     alert(`${statusType === 'orderStatus' ? 'Order' : 'Payment'} status updated successfully!`)
//   } catch (error) {
//     console.error(`Error updating ${statusType}:`, error)
    
//     // Try fallback to combined endpoint
//     if (error.response?.status === 404) {
//       try {
//         console.log("Trying combined endpoint...")
//         await axiosInstance.put(`/api/orders/admin/${orderId}`, {
//           [statusType]: newStatus
//         })
        
//         // Update local state
//         setOrders(orders.map(order => 
//           order._id === orderId 
//             ? { 
//                 ...order, 
//                 [statusType]: newStatus,
//                 updatedAt: new Date().toISOString()
//               } 
//             : order
//         ))
        
//         if (selectedOrder && selectedOrder._id === orderId) {
//           setSelectedOrder({ 
//             ...selectedOrder, 
//             [statusType]: newStatus,
//             updatedAt: new Date().toISOString()
//           })
//         }
        
//         alert(`Status updated successfully!`)
//       } catch (secondError) {
//         console.error("All admin endpoints failed:", secondError)
        
//         // Final fallback: Try user endpoint
//         try {
//           console.log("Trying user endpoint as last resort...")
//           await axiosInstance.put(`/api/orders/${orderId}`, {
//             [statusType]: newStatus
//           })
          
//           // Update local state
//           setOrders(orders.map(order => 
//             order._id === orderId 
//               ? { 
//                   ...order, 
//                   [statusType]: newStatus,
//                   updatedAt: new Date().toISOString()
//                 } 
//               : order
//           ))
          
//           alert(`Status updated (using user permission)`)
//         } catch (finalError) {
//           console.error("All endpoints failed, updating frontend only")
          
//           // Frontend only update
//           setOrders(orders.map(order => 
//             order._id === orderId 
//               ? { 
//                   ...order, 
//                   [statusType]: newStatus,
//                   updatedAt: new Date().toISOString()
//                 } 
//               : order
//           ))
          
//           if (selectedOrder && selectedOrder._id === orderId) {
//             setSelectedOrder({ 
//               ...selectedOrder, 
//               [statusType]: newStatus,
//               updatedAt: new Date().toISOString()
//             })
//           }
          
//           alert(`Status updated in dashboard only (backend update failed)`)
//         }
//       }
//     } else {
//       alert(`Failed to update status: ${error.message}`)
//     }
//   } finally {
//     setUpdatingStatus(false)
//   }
// }

//   // Update Payment Status
//   const updatePaymentStatus = async (orderId, newStatus) => {
//     await updateOrderStatus(orderId, newStatus, 'paymentStatus')
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
                    
//                     {/* Payment Status Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-col space-y-1">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           order.paymentStatus === 'Paid'
//                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                             : order.paymentStatus === 'Cash on Delivery'
//                             ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                             : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                         }`}>
//                           {order.paymentStatus || 'Pending'}
//                         </span>
                        
//                         {/* Payment Status Update Buttons */}
//                         <div className="flex flex-wrap gap-1">
//                           {order.paymentStatus !== 'Cash on Delivery' && (
//                             <button
//                               onClick={() => updatePaymentStatus(order._id, 'Cash on Delivery')}
//                               disabled={updatingStatus}
//                               className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 disabled:opacity-50"
//                             >
//                               COD
//                             </button>
//                           )}
//                           {order.paymentStatus !== 'Paid' && (
//                             <button
//                               onClick={() => updatePaymentStatus(order._id, 'Paid')}
//                               disabled={updatingStatus}
//                               className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded hover:bg-green-200 dark:bg-green-900 dark:text-green-300 disabled:opacity-50"
//                             >
//                               Paid
//                             </button>
//                           )}
//                           {order.paymentStatus !== 'Pending' && (
//                             <button
//                               onClick={() => updatePaymentStatus(order._id, 'Pending')}
//                               disabled={updatingStatus}
//                               className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 disabled:opacity-50"
//                             >
//                               Pending
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </td>
                    
//                     {/* Order Status Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-col space-y-1">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           order.orderStatus === 'Delivered'
//                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                             : order.orderStatus === 'Shipped'
//                             ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                             : order.orderStatus === 'Processing'
//                             ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
//                             : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
//                         }`}>
//                           {order.orderStatus || 'Pending'}
//                         </span>
                        
//                         {/* Order Status Update Buttons */}
//                         <div className="flex flex-wrap gap-1">
//                           {order.orderStatus !== 'Processing' && order.orderStatus !== 'Delivered' && (
//                             <button
//                               onClick={() => updateOrderStatus(order._id, 'Processing')}
//                               disabled={updatingStatus}
//                               className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 disabled:opacity-50"
//                             >
//                               Process
//                             </button>
//                           )}
//                           {order.orderStatus === 'Processing' && (
//                             <button
//                               onClick={() => updateOrderStatus(order._id, 'Shipped')}
//                               disabled={updatingStatus}
//                               className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 disabled:opacity-50"
//                             >
//                               Ship
//                             </button>
//                           )}
//                           {order.orderStatus === 'Shipped' && (
//                             <button
//                               onClick={() => updateOrderStatus(order._id, 'Delivered')}
//                               disabled={updatingStatus}
//                               className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded hover:bg-green-200 dark:bg-green-900 dark:text-green-300 disabled:opacity-50"
//                             >
//                               Deliver
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </td>
                    
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
//                       {order.createdAt ? formatDateTime(order.createdAt) : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => fetchOrderDetails(order._id)}
//                         disabled={orderDetailsLoading}
//                         className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
//                         title="View Details"
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
//                 <X size={20} />
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

//                 {/* Order Status Management */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Update Status</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Payment Status */}
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
//                         <CreditCard size={16} className="text-gray-400" />
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {['Pending', 'Cash on Delivery', 'Paid'].map((status) => (
//                           <button
//                             key={status}
//                             onClick={() => updatePaymentStatus(selectedOrder._id, status)}
//                             disabled={updatingStatus || selectedOrder.paymentStatus === status}
//                             className={`px-3 py-1 text-xs rounded-lg ${
//                               selectedOrder.paymentStatus === status
//                                 ? status === 'Pending'
//                                   ? 'bg-yellow-600 text-white'
//                                   : status === 'Cash on Delivery'
//                                   ? 'bg-blue-600 text-white'
//                                   : 'bg-green-600 text-white'
//                                 : status === 'Pending'
//                                 ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
//                                 : status === 'Cash on Delivery'
//                                 ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
//                                 : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
//                             } disabled:opacity-50`}
//                           >
//                             {status}
//                           </button>
//                         ))}
//                       </div>
//                       <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                         Current: <span className="font-medium">{selectedOrder.paymentStatus || 'Pending'}</span>
//                       </p>
//                     </div>

//                     {/* Order Status */}
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm text-gray-600 dark:text-gray-400">Order Status</p>
//                         <Truck size={16} className="text-gray-400" />
//                       </div>
//                       <div className="space-y-2">
//                         {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
//                           <button
//                             key={status}
//                             onClick={() => updateOrderStatus(selectedOrder._id, status)}
//                             disabled={updatingStatus || selectedOrder.orderStatus === status}
//                             className={`w-full px-3 py-2 text-xs rounded-lg flex items-center justify-center ${
//                               selectedOrder.orderStatus === status
//                                 ? status === 'Pending'
//                                   ? 'bg-yellow-600 text-white'
//                                   : status === 'Processing'
//                                   ? 'bg-purple-600 text-white'
//                                   : status === 'Shipped'
//                                   ? 'bg-blue-600 text-white'
//                                   : 'bg-green-600 text-white'
//                                 : status === 'Pending'
//                                 ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
//                                 : status === 'Processing'
//                                 ? 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
//                                 : status === 'Shipped'
//                                 ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
//                                 : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
//                             } disabled:opacity-50`}
//                           >
//                             {status === 'Processing' && <Package size={14} className="mr-1" />}
//                             {status === 'Shipped' && <Truck size={14} className="mr-1" />}
//                             {status === 'Delivered' && <CheckCircle size={14} className="mr-1" />}
//                             {status}
//                           </button>
//                         ))}
//                       </div>
//                       <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                         Current: <span className="font-medium">{selectedOrder.orderStatus || 'Pending'}</span>
//                       </p>
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
import { Eye, Search, X, Truck, CreditCard, Package, CheckCircle, AlertCircle } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'
import Loader from '../components/Loader'
import { formatCurrency, formatDateTime } from '../utils/format'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  // Valid statuses based on your Order model
  const validStatuses = {
    paymentStatus: ['Pending', 'Paid', 'Failed'],
    orderStatus: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled']
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/api/orders/admin/all')
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
    try {
      const response = await axiosInstance.get(`/api/orders/${id}`)
      setSelectedOrder(response.data.data)
    } catch (error) {
      console.error('Error fetching order details:', error)
      alert('Failed to fetch order details')
    }
  }

  // Update status function
  const updateOrderStatus = async (orderId, newStatus, statusType = 'orderStatus') => {
    // Validate status
    if (!validStatuses[statusType].includes(newStatus)) {
      alert(`Invalid ${statusType}: ${newStatus}. Valid values: ${validStatuses[statusType].join(', ')}`)
      return
    }
    
    if (!window.confirm(`Change ${statusType} to "${newStatus}"?`)) return
    
    setUpdatingStatus(true)
    try {
      const data = {}
      if (statusType === 'orderStatus') {
        data.orderStatus = newStatus
      } else {
        data.paymentStatus = newStatus
      }
      
      // Try admin endpoint first
      try {
        await axiosInstance.put(`/api/orders/admin/${orderId}`, data)
      } catch (adminError) {
        console.log("Admin endpoint failed, trying user endpoint...")
        // Fallback to user endpoint
        await axiosInstance.put(`/api/orders/${orderId}`, data)
      }
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { 
              ...order, 
              [statusType]: newStatus,
              updatedAt: new Date().toISOString()
            } 
          : order
      ))
      
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ 
          ...selectedOrder, 
          [statusType]: newStatus,
          updatedAt: new Date().toISOString()
        })
      }
      
      alert(`Status updated to "${newStatus}" successfully!`)
    } catch (error) {
      console.error(`Error updating ${statusType}:`, error)
      
      // Still update frontend for better UX
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { 
              ...order, 
              [statusType]: newStatus,
              updatedAt: new Date().toISOString()
            } 
          : order
      ))
      
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ 
          ...selectedOrder, 
          [statusType]: newStatus,
          updatedAt: new Date().toISOString()
        })
      }
      
      alert(`Status updated in dashboard (Backend: ${error.message})`)
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
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      #{order._id?.slice(-8)}
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
                  
                  {/* Payment Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : order.paymentStatus === 'Failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {order.paymentStatus || 'Pending'}
                      </span>
                      
                      <div className="flex flex-wrap gap-1">
                        {order.paymentStatus !== 'Paid' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'Paid', 'paymentStatus')}
                            disabled={updatingStatus}
                            className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded hover:bg-green-200 dark:bg-green-900 dark:text-green-300 disabled:opacity-50"
                          >
                            Mark Paid
                          </button>
                        )}
                        {order.paymentStatus !== 'Failed' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'Failed', 'paymentStatus')}
                            disabled={updatingStatus}
                            className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-300 disabled:opacity-50"
                          >
                            Mark Failed
                          </button>
                        )}
                        {order.paymentStatus !== 'Pending' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'Pending', 'paymentStatus')}
                            disabled={updatingStatus}
                            className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 disabled:opacity-50"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  {/* Order Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : order.orderStatus === 'Paid'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          : order.orderStatus === 'Cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {order.orderStatus || 'Pending'}
                      </span>
                      
                      <div className="flex flex-wrap gap-1">
                        {order.orderStatus === 'Pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'Paid')}
                              disabled={updatingStatus}
                              className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 disabled:opacity-50"
                            >
                              Mark Paid
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                              disabled={updatingStatus}
                              className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-300 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        
                        {order.orderStatus === 'Paid' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'Shipped')}
                              disabled={updatingStatus}
                              className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 disabled:opacity-50"
                            >
                              Ship
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                              disabled={updatingStatus}
                              className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-300 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        
                        {order.orderStatus === 'Shipped' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'Delivered')}
                              disabled={updatingStatus}
                              className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded hover:bg-green-200 dark:bg-green-900 dark:text-green-300 disabled:opacity-50"
                            >
                              Deliver
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                              disabled={updatingStatus}
                              className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-300 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        
                        {order.orderStatus !== 'Pending' && order.orderStatus !== 'Delivered' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'Pending')}
                            disabled={updatingStatus}
                            className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 disabled:opacity-50"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {order.createdAt ? formatDateTime(order.createdAt) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => fetchOrderDetails(order._id)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
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
          <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Order #{selectedOrder._id?.slice(-8)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Placed on {selectedOrder.createdAt ? formatDateTime(selectedOrder.createdAt) : 'N/A'}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Order Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3 dark:bg-blue-900 dark:text-blue-300">
                      <CreditCard size={20} />
                    </span>
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</p>
                      <p className="font-medium dark:text-white">{selectedOrder.user?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                      <p className="font-medium dark:text-white">{selectedOrder.user?.email || 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Customer ID</p>
                      <p className="font-mono text-sm dark:text-white">{selectedOrder.user?._id || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="bg-green-100 text-green-800 p-2 rounded-lg mr-3 dark:bg-green-900 dark:text-green-300">
                      <Truck size={20} />
                    </span>
                    Shipping Address
                  </h4>
                  <div className="space-y-2">
                    <p className="dark:text-white">{selectedOrder.address?.street || 'N/A'}</p>
                    <p className="dark:text-white">{selectedOrder.address?.city || 'N/A'}, {selectedOrder.address?.state || 'N/A'} - {selectedOrder.address?.zip || 'N/A'}</p>
                    <p className="dark:text-white">{selectedOrder.address?.country || 'N/A'}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Package size={24} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">{item.title || `Item ${index + 1}`}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {item.product?._id?.slice(-6) || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium dark:text-white">{formatCurrency(item.priceAtOrder || item.price || 0)}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity || 1}</p>
                          <p className="font-medium dark:text-white mt-1">
                            {formatCurrency((item.quantity || 1) * (item.priceAtOrder || item.price || 0))}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Order Summary */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="dark:text-white">{formatCurrency(selectedOrder.totalAmount || 0)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                        <span className="dark:text-white">FREE</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-600">
                        <span className="dark:text-white">Total</span>
                        <span className="dark:text-white">{formatCurrency(selectedOrder.totalAmount || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Status Management */}
              <div className="space-y-6">
                {/* Order Status Management */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Current Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : selectedOrder.orderStatus === 'Shipped'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : selectedOrder.orderStatus === 'Paid'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          : selectedOrder.orderStatus === 'Cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {selectedOrder.orderStatus || 'Pending'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Status:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {validStatuses.orderStatus.map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(selectedOrder._id, status)}
                            disabled={updatingStatus || selectedOrder.orderStatus === status}
                            className={`px-3 py-2 text-xs rounded-lg transition-all ${
                              selectedOrder.orderStatus === status
                                ? status === 'Delivered'
                                  ? 'bg-green-600 text-white'
                                  : status === 'Shipped'
                                  ? 'bg-blue-600 text-white'
                                  : status === 'Paid'
                                  ? 'bg-purple-600 text-white'
                                  : status === 'Cancelled'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-yellow-600 text-white'
                                : status === 'Delivered'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                                : status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
                                : status === 'Paid'
                                ? 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300'
                                : status === 'Cancelled'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {status === 'Shipped' && <Truck size={12} className="inline mr-1" />}
                            {status === 'Delivered' && <CheckCircle size={12} className="inline mr-1" />}
                            {status === 'Cancelled' && <AlertCircle size={12} className="inline mr-1" />}
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Status Management */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Current Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.paymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : selectedOrder.paymentStatus === 'Failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {selectedOrder.paymentStatus || 'Pending'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Payment:</h5>
                      <div className="grid grid-cols-3 gap-2">
                        {validStatuses.paymentStatus.map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(selectedOrder._id, status, 'paymentStatus')}
                            disabled={updatingStatus || selectedOrder.paymentStatus === status}
                            className={`px-3 py-2 text-xs rounded-lg transition-all ${
                              selectedOrder.paymentStatus === status
                                ? status === 'Paid'
                                  ? 'bg-green-600 text-white'
                                  : status === 'Failed'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-yellow-600 text-white'
                                : status === 'Paid'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                                : status === 'Failed'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Timeline</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex flex-col items-center mr-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-0.5 h-8 bg-green-500 mt-1"></div>
                      </div>
                      <div>
                        <p className="font-medium text-sm dark:text-white">Order Placed</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedOrder.createdAt ? formatDateTime(selectedOrder.createdAt) : 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    {selectedOrder.orderStatus !== 'Pending' && (
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div className="w-0.5 h-8 bg-blue-500 mt-1"></div>
                        </div>
                        <div>
                          <p className="font-medium text-sm dark:text-white">Status Updated</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedOrder.updatedAt && selectedOrder.updatedAt !== selectedOrder.createdAt
                              ? formatDateTime(selectedOrder.updatedAt)
                              : 'Recently'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.payment && selectedOrder.paymentStatus === 'Paid' && (
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium text-sm dark:text-white">Payment Completed</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Payment ID: {selectedOrder.payment?.slice(-8) || 'N/A'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => window.print()}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Print Invoice
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedOrder._id);
                        alert('Order ID copied to clipboard!');
                      }}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition-colors"
                    >
                      Copy Order ID
                    </button>
                    <button
                      onClick={() => {
                        const email = selectedOrder.user?.email;
                        if (email) {
                          window.location.href = `mailto:${email}?subject=Order Update #${selectedOrder._id?.slice(-8)}`;
                        } else {
                          alert('No email available for this customer');
                        }
                      }}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Email Customer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders