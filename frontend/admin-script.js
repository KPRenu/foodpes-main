// FoodPES Admin - Order Management JavaScript

// Application State
let state = {
   orders: []
  };
  
  // DOM Elements
  const elements = {
   totalOrders: document.getElementById('totalOrders'),
   pendingOrders: document.getElementById('pendingOrders'),
   ordersContainer: document.getElementById('ordersContainer'),
   noOrders: document.getElementById('noOrders'),
   toastContainer: document.getElementById('toastContainer')
  };
  
  // Initialize application
  function init() {
   // Load orders from the backend API
   loadOrders();
   // No need for a storage listener anymore since we're using a backend
  }
  
  // Load orders from the backend API
  async function loadOrders() {
   try {
     const response = await fetch('http://localhost:5000/api/orders');
     if (!response.ok) {
       throw new Error('Failed to fetch orders from server.');
     }
     const orders = await response.json();
     state.orders = orders;
     renderOrders();
   } catch (error) {
     console.error('Error loading orders:', error);
     showToast('Error', 'Could not load orders from server.', 'error');
   }
  }
  
  // Render orders
  function renderOrders() {
   updateStats();
   
   if (state.orders.length === 0) {
     elements.ordersContainer.style.display = 'none';
     elements.noOrders.style.display = 'flex';
     return;
   }
   
   elements.ordersContainer.style.display = 'grid';
   elements.noOrders.style.display = 'none';
   
   elements.ordersContainer.innerHTML = state.orders.map(order => createOrderCard(order)).join('');
  }
  
  // Create order card HTML
  function createOrderCard(order) {
   const statusColor = getStatusColor(order.status);
   const statusIcon = getStatusIcon(order.status);
   const nextStatus = getNextStatus(order.status);
   
   return `
     <div class="order-card">
       <div class="order-header">
         <div class="order-title">
           <div>
             <span class="order-badge ${order.status.toLowerCase()}">
               ${statusIcon}
               ${order.status}
             </span>
             <span class="order-id">Order #${order._id.substring(0, 8)}</span>
           </div>
           <div class="order-date">${formatDate(order.createdAt)}</div>
         </div>
       </div>
       
       <div class="order-content">
         <!-- Customer Info -->
         <div class="customer-info-grid">
           <div class="customer-info-item">
             <svg class="customer-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
               <circle cx="12" cy="7" r="4"></circle>
             </svg>
             <div class="customer-info-text">
               <p>${order.name}</p>
               <p>${order.email}</p>
             </div>
           </div>
           <div class="customer-info-item">
             <svg class="customer-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
               <circle cx="12" cy="10" r="3"></circle>
             </svg>
             <div class="customer-info-text">
               <p>Table ${order.table}</p>
               <p>Dining area</p>
             </div>
           </div>
           <div class="customer-info-item">
             <svg class="customer-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <line x1="12" y1="1" x2="12" y2="23"></line>
               <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
             </svg>
             <div class="customer-info-text">
               <p>$${order.total.toFixed(2)}</p>
               <p>Total amount</p>
             </div>
           </div>
         </div>
  
         <!-- Order Items -->
         <div class="order-items-list">
           <h4>Order Items:</h4>
           ${order.items.map(item => `
             <div class="order-item">
               <span class="order-item-name">${item.name}</span>
               <div class="order-item-details">
                 <div class="order-item-quantity">${item.quantity} × $${item.price}</div>
                 <div class="order-item-price">$${(item.quantity * item.price).toFixed(2)}</div>
               </div>
             </div>
           `).join('')}
         </div>
  
         <div class="separator"></div>
  
         <!-- Actions -->
         <div class="order-actions">
           <div class="order-total-amount">Total: $${order.total.toFixed(2)}</div>
           ${nextStatus ? `
             <button class="update-status-btn" onclick="updateOrderStatus('${order._id}', '${nextStatus}')">
               Mark as ${nextStatus}
             </button>
           ` : ''}
         </div>
       </div>
     </div>
   `;
  }
  
  // Get status color class
  function getStatusColor(status) {
   switch (status) {
     case "Received": return "received";
     case "Preparing": return "preparing";
     case "Served": return "served";
     default: return "received";
   }
  }
  
  // Get status icon
  function getStatusIcon(status) {
   switch (status) {
     case "Received": 
       return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>';
     case "Preparing": 
       return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5,3 19,12 5,21"></polygon></svg>';
     case "Served": 
       return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>';
     default: 
       return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>';
   }
  }
  
  // Get next status
  function getNextStatus(currentStatus) {
   switch (currentStatus) {
     case "Received": return "Preparing";
     case "Preparing": return "Served";
     case "Served": return null;
     default: return null;
   }
  }
  
  // Update order status
  async function updateOrderStatus(orderId, newStatus) {
   try {
     const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ status: newStatus }),
     });
  
     if (!response.ok) {
       // Try to get a more specific error message from the server
       const errorData = await response.json();
       throw new Error(errorData.message || 'Failed to update order status.');
     }
     
     showToast('Order Updated', `Order status changed to ${newStatus}`);
     // Fetch and re-render all orders to reflect the change
     loadOrders();
  
   } catch (error) {
     console.error('Error updating status:', error);
     showToast('Error', `Error: ${error.message}`, 'error');
   }
  }
  
  // Update statistics
  function updateStats() {
   const total = state.orders.length;
   const pending = state.orders.filter(order => order.status !== "Served").length;
   
   elements.totalOrders.textContent = total;
   elements.pendingOrders.textContent = pending;
  }
  
  // Format date
  function formatDate(dateString) {
   return new Date(dateString).toLocaleString();
  }
  
  // Show toast notification
  function showToast(title, description, type = 'success') {
   const toast = document.createElement('div');
   toast.className = `toast ${type}`;
   
   const icon = type === 'success' ? 
     '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>' :
     (type === 'error' ?
     '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>' :
     '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>');
   
   toast.innerHTML = `
     ${icon}
     <div class="toast-content">
       <div class="toast-title">${title}</div>
       <div class="toast-description">${description}</div>
     </div>
   `;
   
   elements.toastContainer.appendChild(toast);
   
   // Auto remove after 5 seconds
   setTimeout(() => {
     toast.remove();
   }, 5000);
  }
  
  // Initialize application
  document.addEventListener('DOMContentLoaded', init);
  