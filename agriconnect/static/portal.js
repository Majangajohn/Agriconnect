        function initDarkMode() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
            
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            });
            
            document.getElementById('toggleDarkMode').addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
            });
        }
        
        // Mock data for the application
        const mockData = {
            // Current user (can be 'farmer' or 'supplier')
            currentUserType: 'farmer',
            currentUser: {
                farmer: {
                    id: 'farmer-1',
                    name: 'John Smith',
                    farm: 'Smith Family Farm',
                    address: '123 Farm Lane, Rural County, State 12345',
                    contact: '+1 (555) 123-4567',
                    initials: 'JS'
                },
                supplier: {
                    id: 'supplier-1',
                    name: 'Sarah Johnson',
                    company: 'AgriSupply Inc.',
                    address: '456 Supply Road, Business District, State 54321',
                    contact: '+1 (555) 987-6543',
                    initials: 'SJ'
                }
            },
            
            // Orders data
            orders: [
                {
                    id: 'ORD-12345',
                    farmerId: 'farmer-1',
                    farmer: 'John Smith Farm',
                    supplierId: 'supplier-1',
                    supplier: 'AgriSupply Inc.',
                    date: '2023-05-15',
                    deliveryDate: '2023-05-20',
                    status: 'in-transit',
                    address: '123 Farm Lane, Rural County, State 12345',
                    items: [
                        { product: 'Premium Wheat Seeds', quantity: 3, price: 45.00, total: 135.00 },
                        { product: 'Organic NPK Fertilizer', quantity: 2, price: 32.50, total: 65.00 }
                    ],
                    subtotal: 200.00,
                    deliveryFee: 25.00,
                    total: 225.00,
                    notes: 'Please deliver during morning hours if possible. Gate access code: 1234',
                    tracking: [
                        { date: '2023-05-15T10:30:00', status: 'Order Placed', description: 'Your order has been received' },
                        { date: '2023-05-16T09:15:00', status: 'Order Confirmed', description: 'Your order has been approved by the supplier' },
                        { date: '2023-05-17T14:45:00', status: 'Preparing for Shipment', description: 'Your order is being prepared for shipment' },
                        { date: '2023-05-18T08:20:00', status: 'Shipped', description: 'Your order has been shipped and is on the way' }
                    ]
                },
                {
                    id: 'ORD-12346',
                    farmerId: 'farmer-1',
                    farmer: 'John Smith Farm',
                    supplierId: 'supplier-2',
                    supplier: 'Farm Fresh Solutions',
                    date: '2023-05-10',
                    deliveryDate: '2023-05-14',
                    status: 'delivered',
                    address: '123 Farm Lane, Rural County, State 12345',
                    items: [
                        { product: 'Hybrid Corn Seeds', quantity: 2, price: 38.75, total: 77.50 },
                        { product: 'Bio Pest Control', quantity: 1, price: 29.99, total: 29.99 }
                    ],
                    subtotal: 107.49,
                    deliveryFee: 15.00,
                    total: 122.49,
                    notes: '',
                    tracking: [
                        { date: '2023-05-10T11:20:00', status: 'Order Placed', description: 'Your order has been received' },
                        { date: '2023-05-10T15:45:00', status: 'Order Confirmed', description: 'Your order has been approved by the supplier' },
                        { date: '2023-05-11T09:30:00', status: 'Preparing for Shipment', description: 'Your order is being prepared for shipment' },
                        { date: '2023-05-12T08:15:00', status: 'Shipped', description: 'Your order has been shipped and is on the way' },
                        { date: '2023-05-14T13:40:00', status: 'Delivered', description: 'Your order has been delivered' }
                    ]
                },
                {
                    id: 'ORD-12347',
                    farmerId: 'farmer-1',
                    farmer: 'John Smith Farm',
                    supplierId: 'supplier-1',
                    supplier: 'AgriSupply Inc.',
                    date: '2023-05-18',
                    deliveryDate: '2023-05-23',
                    status: 'pending',
                    address: '123 Farm Lane, Rural County, State 12345',
                    items: [
                        { product: 'Drip Irrigation Kit', quantity: 1, price: 120.00, total: 120.00 }
                    ],
                    subtotal: 120.00,
                    deliveryFee: 30.00,
                    total: 150.00,
                    notes: 'Please call before delivery',
                    tracking: [
                        { date: '2023-05-18T16:10:00', status: 'Order Placed', description: 'Your order has been received' }
                    ]
                }
            ],
            
            // Products data (for supplier inventory)
            products: [
                {
                    id: 1,
                    name: 'Premium Wheat Seeds',
                    category: 'seeds',
                    price: 45.00,
                    unit: 'kg',
                    stock: 250,
                    description: 'High-yield wheat seeds perfect for most climate conditions. Disease resistant variety that produces excellent quality grain.'
                },
                {
                    id: 2,
                    name: 'Organic NPK Fertilizer',
                    category: 'fertilizers',
                    price: 32.50,
                    unit: 'bag',
                    stock: 120,
                    description: 'Balanced NPK formula (10-10-10) for general purpose fertilization. OMRI certified for organic farming.'
                },
                {
                    id: 3,
                    name: 'Hybrid Corn Seeds',
                    category: 'seeds',
                    price: 38.75,
                    unit: 'kg',
                    stock: 175,
                    description: 'Drought-resistant hybrid corn seeds with excellent yield potential. Fast maturity and strong stalks.'
                },
                {
                    id: 4,
                    name: 'Bio Pest Control',
                    category: 'pesticides',
                    price: 29.99,
                    unit: 'bottle',
                    stock: 80,
                    description: 'Natural pest control solution safe for organic farming. Controls a wide variety of common agricultural pests.'
                },
                {
                    id: 5,
                    name: 'Drip Irrigation Kit',
                    category: 'equipment',
                    price: 120.00,
                    unit: 'set',
                    stock: 35,
                    description: 'Complete drip irrigation system for up to 1/4 acre. Water-efficient design with durable components and easy installation.'
                }
            ],
            
            // Notifications
            notifications: [
                {
                    id: 'notif-1',
                    userType: 'farmer',
                    title: 'Order Shipped',
                    message: 'Your order #ORD-12345 has been shipped and is on the way.',
                    timestamp: '2023-05-18T08:20:00',
                    read: false,
                    orderId: 'ORD-12345'
                },
                {
                    id: 'notif-2',
                    userType: 'farmer',
                    title: 'Order Delivered',
                    message: 'Your order #ORD-12346 has been delivered. Please confirm receipt when convenient.',
                    timestamp: '2023-05-14T13:40:00',
                    read: false,
                    orderId: 'ORD-12346'
                },
                {
                    id: 'notif-3',
                    userType: 'supplier',
                    title: 'New Order Received',
                    message: 'You have received a new order #ORD-12347 from John Smith Farm.',
                    timestamp: '2023-05-18T16:10:00',
                    read: false,
                    orderId: 'ORD-12347'
                }
            ],
            
            // Activity feed
            activities: [
                {
                    id: 'activity-1',
                    userType: 'both',
                    date: '2023-05-18T08:20:00',
                    activity: 'Order #ORD-12345 has been shipped',
                    status: 'success'
                },
                {
                    id: 'activity-2',
                    userType: 'both',
                    date: '2023-05-18T16:10:00',
                    activity: 'New order #ORD-12347 placed',
                    status: 'info'
                },
                {
                    id: 'activity-3',
                    userType: 'both',
                    date: '2023-05-14T13:40:00',
                    activity: 'Order #ORD-12346 has been delivered',
                    status: 'success'
                },
                {
                    id: 'activity-4',
                    userType: 'supplier',
                    date: '2023-05-17T10:25:00',
                    activity: 'Inventory updated: Added 100kg Premium Wheat Seeds',
                    status: 'info'
                },
                {
                    id: 'activity-5',
                    userType: 'farmer',
                    date: '2023-05-16T09:15:00',
                    activity: 'Order #ORD-12345 has been confirmed',
                    status: 'info'
                }
            ]
        };
        
        // Helper functions
        function formatDate(dateStr) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateStr).toLocaleDateString(undefined, options);
        }
        
        function formatDateTime(dateStr) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateStr).toLocaleDateString(undefined, options);
        }
        
        function formatCurrency(amount) {
            return '$' + parseFloat(amount).toFixed(2);
        }
        
        function getStatusClass(status) {
            switch(status) {
                case 'pending':
                    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300';
                case 'approved':
                    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300';
                case 'in-transit':
                    return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300';
                case 'delivered':
                    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300';
                case 'cancelled':
                    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300';
                default:
                    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:bg-opacity-30 dark:text-gray-300';
            }
        }
        
        function getStatusLabel(status) {
            switch(status) {
                case 'pending':
                    return 'Pending';
                case 'approved':
                    return 'Approved';
                case 'in-transit':
                    return 'In Transit';
                case 'delivered':
                    return 'Delivered';
                case 'cancelled':
                    return 'Cancelled';
                default:
                    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
            }
        }
        
        function showToast(message, type = 'success', duration = 3000) {
            const toastContainer = document.getElementById('toastContainer');
            
            const toast = document.createElement('div');
            toast.className = `max-w-sm p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 transform translate-x-full`;
            
            // Set background color based on type
            if (type === 'success') {
                toast.classList.add('bg-green-100', 'dark:bg-green-900', 'dark:bg-opacity-70', 'text-green-800', 'dark:text-green-200');
            } else if (type === 'error') {
                toast.classList.add('bg-red-100', 'dark:bg-red-900', 'dark:bg-opacity-70', 'text-red-800', 'dark:text-red-200');
            } else if (type === 'info') {
                toast.classList.add('bg-blue-100', 'dark:bg-blue-900', 'dark:bg-opacity-70', 'text-blue-800', 'dark:text-blue-200');
            } else if (type === 'warning') {
                toast.classList.add('bg-yellow-100', 'dark:bg-yellow-900', 'dark:bg-opacity-70', 'text-yellow-800', 'dark:text-yellow-200');
            }
            
            // Icon based on type
            let iconSvg = '';
            if (type === 'success') {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>`;
            } else if (type === 'error') {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>`;
            } else if (type === 'info') {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`;
            } else if (type === 'warning') {
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`;
            }
            
            toast.innerHTML = `
                <div>${iconSvg}</div>
                <div class="flex-1">${message}</div>
                <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            `;
            
            toastContainer.appendChild(toast);
            
            // Slide in animation
            setTimeout(() => {
                toast.classList.remove('translate-x-full');
            }, 10);
            
            // Set up close button
            toast.querySelector('button').addEventListener('click', () => {
                toast.classList.add('translate-x-full', 'opacity-0');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            });
            
            // Auto-remove after duration
            setTimeout(() => {
                toast.classList.add('translate-x-full', 'opacity-0');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }
        
        // Application initialization
        function initApp() {
            initDarkMode();
            updateUserInterface();
            loadDashboard();
            setupEventListeners();
        }
        
        // Update UI based on user type
        function updateUserInterface() {
            const userType = mockData.currentUserType;
            const user = mockData.currentUser[userType];
            
            // Update user info
            document.getElementById('userName').textContent = userType === 'farmer' ? user.name : user.name;
            document.getElementById('userRole').textContent = `You are logged in as a ${userType.charAt(0).toUpperCase() + userType.slice(1)}.`;
            document.getElementById('userInitials').textContent = user.initials;
            
            // Show/hide elements based on user type
            document.querySelectorAll('.farmer-only').forEach(el => {
                el.style.display = userType === 'farmer' ? '' : 'none';
            });
            
            document.querySelectorAll('.supplier-only').forEach(el => {
                el.style.display = userType === 'supplier' ? '' : 'none';
            });
            
            // Update notification badge
            updateNotificationBadge();
        }
        
        // Load dashboard data
        function loadDashboard() {
            const userType = mockData.currentUserType;
            
            // Update order counts
            const pendingOrders = mockData.orders.filter(order => order.status === 'pending').length;
            const inTransitOrders = mockData.orders.filter(order => order.status === 'in-transit').length;
            const completedOrders = mockData.orders.filter(order => order.status === 'delivered').length;
            
            document.getElementById('pendingOrdersCount').textContent = pendingOrders;
            document.getElementById('inTransitOrdersCount').textContent = inTransitOrders;
            document.getElementById('completedOrdersCount').textContent = completedOrders;
            
            // Load recent activities
            const recentActivityTable = document.getElementById('recentActivityTable');
            recentActivityTable.innerHTML = '';
            
            mockData.activities
                .filter(activity => activity.userType === 'both' || activity.userType === userType)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .forEach(activity => {
                    const row = document.createElement('tr');
                    
                    let statusClass = '';
                    if (activity.status === 'success') {
                        statusClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300';
                    } else if (activity.status === 'info') {
                        statusClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300';
                    } else if (activity.status === 'warning') {
                        statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300';
                    } else if (activity.status === 'error') {
                        statusClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300';
                    }
                    
                    row.innerHTML = `
                        <td class="px-4 py-3 whitespace-nowrap">${formatDateTime(activity.date)}</td>
                        <td class="px-4 py-3">${activity.activity}</td>
                        <td class="px-4 py-3">
                            <span class="inline-block px-2 py-1 text-xs rounded-full ${statusClass}">
                                ${activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                        </td>
                    `;
                    
                    recentActivityTable.appendChild(row);
                });
        }
        
        // Load orders data
        function loadOrders() {
            const userType = mockData.currentUserType;
            const ordersTableBody = document.getElementById('ordersTableBody');
            const ordersTableEmpty = document.getElementById('ordersTableEmpty');
            
            // Get filtered orders based on selection
            const statusFilter = document.getElementById('orderStatusFilter').value;
            const dateFilter = document.getElementById('orderDateFilter').value;
            const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
            
            let filteredOrders = [...mockData.orders];
            
            // Apply status filter
            if (statusFilter !== 'all') {
                filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
            }
            
            // Apply date filter
            if (dateFilter !== 'all') {
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const startOfQuarter = new Date(now.getFullYear(), now.getMonth() - 3, 1);
                
                if (dateFilter === 'today') {
                    filteredOrders = filteredOrders.filter(order => new Date(order.date) >= today);
                } else if (dateFilter === 'week') {
                    filteredOrders = filteredOrders.filter(order => new Date(order.date) >= startOfWeek);
                } else if (dateFilter === 'month') {
                    filteredOrders = filteredOrders.filter(order => new Date(order.date) >= startOfMonth);
                } else if (dateFilter === 'quarter') {
                    filteredOrders = filteredOrders.filter(order => new Date(order.date) >= startOfQuarter);
                }
            }
            
            // Apply search filter
            if (searchTerm) {
                filteredOrders = filteredOrders.filter(order => 
                    order.id.toLowerCase().includes(searchTerm) ||
                    order.farmer.toLowerCase().includes(searchTerm) ||
                    order.supplier.toLowerCase().includes(searchTerm) ||
                    order.items.some(item => item.product.toLowerCase().includes(searchTerm))
                );
            }
            
            // Clear table
            ordersTableBody.innerHTML = '';
            
            // Show empty state if no orders
            if (filteredOrders.length === 0) {
                ordersTableEmpty.classList.remove('hidden');
                return;
            }
            
            ordersTableEmpty.classList.add('hidden');
            
            // Sort orders by date (newest first)
            filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Populate table
            filteredOrders.forEach(order => {
                const row = document.createElement('tr');
                
                const itemsText = order.items.map(item => `${item.quantity} x ${item.product}`).join(', ');
                
                row.innerHTML = `
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="font-medium">${order.id}</span>
                    </td>
                    <td class="px-4 py-3 supplier-only">${order.farmer}</td>
                    <td class="px-4 py-3 farmer-only">${order.supplier}</td>
                    <td class="px-4 py-3 whitespace-nowrap">${formatDate(order.date)}</td>
                    <td class="px-4 py-3">
                        <span class="line-clamp-1">${itemsText}</span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">${formatCurrency(order.total)}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="inline-block px-3 py-1 text-xs rounded-full ${getStatusClass(order.status)}">
                            ${getStatusLabel(order.status)}
                        </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <button class="view-order-btn text-primary hover:text-secondary" data-order-id="${order.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </td>
                `;
                
                ordersTableBody.appendChild(row);
            });
            
            // Add event listeners to view order buttons
            document.querySelectorAll('.view-order-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const orderId = btn.getAttribute('data-order-id');
                    showOrderDetails(orderId);
                });
            });
        }
        
        // Load inventory data
        function loadInventory() {
            const productsGrid = document.getElementById('productsGrid');
            const productsGridEmpty = document.getElementById('productsGridEmpty');
            
            // Get filtered products based on selection
            const categoryFilter = document.getElementById('categoryFilter').value;
            const stockFilter = document.getElementById('stockFilter').value;
            const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
            
            let filteredProducts = [...mockData.products];
            
            // Apply category filter
            if (categoryFilter !== 'all') {
                filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
            }
            
            // Apply stock filter
            if (stockFilter !== 'all') {
                if (stockFilter === 'in-stock') {
                    filteredProducts = filteredProducts.filter(product => product.stock > 20);
                } else if (stockFilter === 'low-stock') {
                    filteredProducts = filteredProducts.filter(product => product.stock > 0 && product.stock <= 20);
                } else if (stockFilter === 'out-of-stock') {
                    filteredProducts = filteredProducts.filter(product => product.stock <= 0);
                }
            }
            
            // Apply search filter
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            }
            
            // Clear grid
            productsGrid.innerHTML = '';
            
            // Show empty state if no products
            if (filteredProducts.length === 0) {
                productsGridEmpty.classList.remove('hidden');
                return;
            }
            
            productsGridEmpty.classList.add('hidden');
            
            // Populate grid
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white dark:bg-dark-card rounded-lg shadow-sm overflow-hidden';
                
                // Determine stock status and badge
                let stockBadge = '';
                if (product.stock <= 0) {
                    stockBadge = '<span class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300">Out of Stock</span>';
                } else if (product.stock <= 20) {
                    stockBadge = '<span class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300">Low Stock</span>';
                }
                
                // Category badge
                let categoryBadge = '';
                if (product.category === 'seeds') {
                    categoryBadge = '<span class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300">Seeds</span>';
                } else if (product.category === 'fertilizers') {
                    categoryBadge = '<span class="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300">Fertilizers</span>';
                } else if (product.category === 'pesticides') {
                    categoryBadge = '<span class="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300">Pesticides</span>';
                } else if (product.category === 'equipment') {
                    categoryBadge = '<span class="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300">Equipment</span>';
                }
                
                productCard.innerHTML = `
                    <div class="relative">
                        <div class="bg-gray-100 dark:bg-gray-800 h-32 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        ${stockBadge}
                    </div>
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-semibold">${product.name}</h3>
                            <span class="font-bold">${formatCurrency(product.price)}/${product.unit}</span>
                        </div>
                        <div class="mb-2">
                            ${categoryBadge}
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${product.description}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm">Stock: <span class="font-medium">${product.stock} ${product.unit}s</span></span>
                            <button class="edit-product-btn text-primary hover:text-secondary" data-product-id="${product.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
                
                productsGrid.appendChild(productCard);
            });
        }
        
        // Load tracking data
        function loadOrderTracking(orderId) {
            const trackingResult = document.getElementById('trackingResult');
            const trackingNoResult = document.getElementById('trackingNoResult');
            const trackingEmptyState = document.getElementById('trackingEmptyState');
            
            // Hide all states initially
            trackingResult.classList.add('hidden');
            trackingNoResult.classList.add('hidden');
            trackingEmptyState.classList.add('hidden');
            
            if (!orderId) {
                trackingEmptyState.classList.remove('hidden');
                return;
            }
            
            // Find order
            const order = mockData.orders.find(o => o.id === orderId);
            
            if (!order) {
                trackingNoResult.classList.remove('hidden');
                return;
            }
            
            // Show tracking result
            trackingResult.classList.remove('hidden');
            
            // Update order info
            document.getElementById('trackingOrderId').textContent = `Order #${order.id}`;
            document.getElementById('trackingOrderDate').textContent = `Ordered on: ${formatDate(order.date)}`;
            document.getElementById('trackingOrderStatus').textContent = getStatusLabel(order.status);
            document.getElementById('trackingOrderStatus').className = `inline-block px-3 py-1 text-sm rounded-full ${getStatusClass(order.status)}`;
            document.getElementById('trackingSupplier').textContent = order.supplier;
            document.getElementById('trackingFarmer').textContent = order.farmer;
            document.getElementById('trackingETA').textContent = formatDate(order.deliveryDate);
            
            // Update tracking timeline
            const trackingTimeline = document.getElementById('trackingTimeline');
            trackingTimeline.innerHTML = '';
            
            order.tracking.forEach((event, index) => {
                const isLast = index === order.tracking.length - 1;
                
                const timelineEvent = document.createElement('div');
                timelineEvent.className = `relative ${isLast ? '' : 'pb-6'}`;
                
                timelineEvent.innerHTML = `
                    <div class="flex items-center">
                        <div class="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                            ${getStatusIcon(event.status)}
                        </div>
                        <div class="flex-1 ml-4">
                            <div class="font-medium">${event.status}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">${formatDateTime(event.date)}</div>
                            <div class="text-sm mt-1">${event.description}</div>
                        </div>
                    </div>
                `;
                
                trackingTimeline.appendChild(timelineEvent);
            });
            
            // Update order items
            const trackingItemsTable = document.getElementById('trackingItemsTable');
            trackingItemsTable.innerHTML = '';
            
            order.items.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td class="px-4 py-3">${item.product}</td>
                    <td class="px-4 py-3">${item.quantity}</td>
                    <td class="px-4 py-3">${formatCurrency(item.price)}</td>
                    <td class="px-4 py-3 font-medium">${formatCurrency(item.total)}</td>
                `;
                
                trackingItemsTable.appendChild(row);
            });
        }
        
        // Load recent deliveries for tracking view
        function loadRecentDeliveries() {
            const userType = mockData.currentUserType;
            const recentDeliveriesTable = document.getElementById('recentDeliveriesTable');
            
            // Get recent deliveries (in-transit or delivered)
            const recentDeliveries = mockData.orders
                .filter(order => order.status === 'in-transit' || order.status === 'delivered')
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Clear table
            recentDeliveriesTable.innerHTML = '';
            
            if (recentDeliveries.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = `
                    <td colspan="6" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                        No recent deliveries found
                    </td>
                `;
                recentDeliveriesTable.appendChild(emptyRow);
                return;
            }
            
            // Populate table
            recentDeliveries.forEach(delivery => {
                const row = document.createElement('tr');
                
                // Get last tracking event
                const lastEvent = delivery.tracking[delivery.tracking.length - 1];
                
                row.innerHTML = `
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="font-medium">${delivery.id}</span>
                    </td>
                    <td class="px-4 py-3 supplier-only">${delivery.farmer}</td>
                    <td class="px-4 py-3 farmer-only">${delivery.supplier}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="inline-block px-3 py-1 text-xs rounded-full ${getStatusClass(delivery.status)}">
                            ${getStatusLabel(delivery.status)}
                        </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">${formatDateTime(lastEvent.date)}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <button class="track-delivery-btn text-primary hover:text-secondary" data-order-id="${delivery.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </button>
                    </td>
                `;
                
                recentDeliveriesTable.appendChild(row);
            });
            
            // Add event listeners to track delivery buttons
            document.querySelectorAll('.track-delivery-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const orderId = btn.getAttribute('data-order-id');
                    document.getElementById('trackingOrderSearch').value = orderId;
                    loadOrderTracking(orderId);
                });
            });
        }
        
        // Update notification badge
        function updateNotificationBadge() {
            const userType = mockData.currentUserType;
            const unreadNotifications = mockData.notifications.filter(
                notif => notif.userType === userType && !notif.read
            ).length;
            
            const badge = document.getElementById('notificationBadge');
            
            if (unreadNotifications > 0) {
                badge.textContent = unreadNotifications;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
        
        // Load notifications
        function loadNotifications() {
            const userType = mockData.currentUserType;
            const notificationsList = document.getElementById('notificationsList');
            
            // Get user's notifications
            const userNotifications = mockData.notifications
                .filter(notif => notif.userType === userType)
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // Clear list
            notificationsList.innerHTML = '';
            
            if (userNotifications.length === 0) {
                const emptyNotification = document.createElement('div');
                emptyNotification.className = 'p-4 text-center text-gray-500 dark:text-gray-400';
                emptyNotification.textContent = 'No notifications';
                notificationsList.appendChild(emptyNotification);
                return;
            }
            
            // Populate list
            userNotifications.forEach(notification => {
                const notificationItem = document.createElement('div');
                notificationItem.className = `border-b border-gray-200 dark:border-gray-700 last:border-b-0 p-4 ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'}`;
                
                notificationItem.innerHTML = `
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="font-medium">${notification.title}</h4>
                        <span class="text-xs text-gray-500 dark:text-gray-400">${formatDateTime(notification.timestamp)}</span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300">${notification.message}</p>
                    ${notification.orderId ? `
                        <button class="view-order-notification mt-2 text-sm text-primary hover:text-secondary" data-order-id="${notification.orderId}">
                            View Order
                        </button>
                    ` : ''}
                `;
                
                notificationsList.appendChild(notificationItem);
            });
            
            // Add event listeners to view order buttons
            document.querySelectorAll('.view-order-notification').forEach(btn => {
                btn.addEventListener('click', () => {
                    const orderId = btn.getAttribute('data-order-id');
                    showOrderDetails(orderId);
                    
                    // Close notifications panel
                    document.getElementById('notificationsPanel').classList.add('hidden');
                });
            });
        }
        
        // Show order details modal
        function showOrderDetails(orderId) {
            const order = mockData.orders.find(o => o.id === orderId);
            
            if (!order) {
                showToast('Order not found', 'error');
                return;
            }
            
            const userType = mockData.currentUserType;
            const modal = document.getElementById('orderDetailsModal');
            
            // Update order details
            document.getElementById('orderDetailsTitle').textContent = `Order #${order.id}`;
            document.getElementById('orderDetailsStatus').textContent = getStatusLabel(order.status);
            document.getElementById('orderDetailsStatus').className = `inline-block px-3 py-1 text-sm rounded-full ${getStatusClass(order.status)}`;
            document.getElementById('orderDetailsDate').textContent = `Ordered on: ${formatDate(order.date)}`;
            document.getElementById('orderDetailsId').textContent = order.id;
            document.getElementById('orderDetailsDeliveryDate').textContent = `Estimated Delivery: ${formatDate(order.deliveryDate)}`;
            document.getElementById('orderDetailsSupplier').textContent = order.supplier;
            document.getElementById('orderDetailsSupplierContact').textContent = 'Phone: +1 (555) 987-6543';
            document.getElementById('orderDetailsFarmer').textContent = order.farmer;
            document.getElementById('orderDetailsFarmerContact').textContent = 'Phone: +1 (555) 123-4567';
            document.getElementById('orderDetailsAddress').textContent = order.address;
            
            // Update order items
            const orderDetailsItems = document.getElementById('orderDetailsItems');
            orderDetailsItems.innerHTML = '';
            
            order.items.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td class="px-4 py-3">${item.product}</td>
                    <td class="px-4 py-3">${item.quantity}</td>
                    <td class="px-4 py-3">${formatCurrency(item.price)}</td>
                    <td class="px-4 py-3 font-medium">${formatCurrency(item.total)}</td>
                `;
                
                orderDetailsItems.appendChild(row);
            });
            
            // Update order totals
            document.getElementById('orderDetailsSubtotal').textContent = formatCurrency(order.subtotal);
            document.getElementById('orderDetailsDeliveryFee').textContent = formatCurrency(order.deliveryFee);
            document.getElementById('orderDetailsTotal').textContent = formatCurrency(order.total);
            
            // Update order notes
            document.getElementById('orderDetailsNotes').textContent = order.notes || 'No additional notes';
            
            // Show/hide action buttons based on order status and user type
            document.getElementById('approveOrderBtn').classList.add('hidden');
            document.getElementById('markShippedBtn').classList.add('hidden');
            document.getElementById('markDeliveredBtn').classList.add('hidden');
            document.getElementById('confirmReceiptBtn').classList.add('hidden');
            document.getElementById('cancelOrderBtn').classList.add('hidden');
            
            if (userType === 'supplier') {
                if (order.status === 'pending') {
                    document.getElementById('approveOrderBtn').classList.remove('hidden');
                    document.getElementById('cancelOrderBtn').classList.remove('hidden');
                } else if (order.status === 'approved') {
                    document.getElementById('markShippedBtn').classList.remove('hidden');
                    document.getElementById('cancelOrderBtn').classList.remove('hidden');
                } else if (order.status === 'in-transit') {
                    document.getElementById('markDeliveredBtn').classList.remove('hidden');
                }
            } else if (userType === 'farmer') {
                if (order.status === 'pending') {
                    document.getElementById('cancelOrderBtn').classList.remove('hidden');
                } else if (order.status === 'in-transit') {
                    document.getElementById('confirmReceiptBtn').classList.remove('hidden');
                }
            }
            
            // Show modal
            modal.classList.remove('hidden');
        }
        
        // Show new order modal
        function showNewOrderModal() {
            // Calculate a reasonable delivery fee if price is over a threshold
            function calculateDeliveryFee(subtotal) {
                if (subtotal >= 200) {
                    return 0; // Free delivery for orders over $200
                } else if (subtotal >= 100) {
                    return 15.00; // $15 delivery fee for orders between $100-$200
                } else {
                    return 25.00; // $25 delivery fee for orders under $100
                }
            }
            
            // Reset form
            document.getElementById('newOrderForm').reset();
            document.getElementById('selectedProductsList').innerHTML = '';
            document.getElementById('selectedProductsContainer').classList.add('hidden');
            document.getElementById('orderSubtotal').textContent = formatCurrency(0);
            document.getElementById('orderDeliveryFee').textContent = formatCurrency(0);
            document.getElementById('orderTotal').textContent = formatCurrency(0);
            
            // Set minimum delivery date (tomorrow)
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const minDate = tomorrow.toISOString().split('T')[0];
            document.getElementById('deliveryDate').min = minDate;
            document.getElementById('deliveryDate').value = minDate;
            
            // Show modal
            document.getElementById('newOrderModal').classList.remove('hidden');
            
            // Update product selection when a checkbox is clicked
            document.querySelectorAll('.product-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', updateSelectedProducts);
            });
            
            // Function to update selected products
            function updateSelectedProducts() {
                const selectedProducts = document.getElementById('selectedProductsList');
                selectedProducts.innerHTML = '';
                
                let subtotal = 0;
                let hasSelectedProducts = false;
                
                document.querySelectorAll('.product-checkbox:checked').forEach(checkbox => {
                    hasSelectedProducts = true;
                    
                    const productId = checkbox.value;
                    const product = mockData.products.find(p => p.id == productId);
                    
                    if (!product) return;
                    
                    const productItem = document.createElement('div');
                    productItem.className = 'flex flex-col sm:flex-row sm:items-center border border-gray-200 dark:border-gray-700 rounded-md p-3';
                    
                    productItem.innerHTML = `
                        <div class="flex-1">
                            <div class="font-medium">${product.name}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">${formatCurrency(product.price)}/${product.unit}</div>
                        </div>
                        <div class="mt-2 sm:mt-0 flex items-center">
                            <button type="button" class="quantity-btn minus bg-gray-200 dark:bg-gray-700 rounded-l-md px-3 py-1">-</button>
                            <input type="number" min="1" value="1" data-product-id="${product.id}" data-price="${product.price}" class="product-quantity w-16 text-center border-t border-b border-gray-300 dark:border-gray-600 py-1 bg-white dark:bg-dark-bg text-gray-900 dark:text-white">
                            <button type="button" class="quantity-btn plus bg-gray-200 dark:bg-gray-700 rounded-r-md px-3 py-1">+</button>
                            <div class="ml-4 font-medium product-total">${formatCurrency(product.price)}</div>
                        </div>
                    `;
                    
                    subtotal += product.price;
                    selectedProducts.appendChild(productItem);
                    
                    // Add event listeners to quantity buttons
                    const quantityInput = productItem.querySelector('.product-quantity');
                    const totalElement = productItem.querySelector('.product-total');
                    
                    productItem.querySelector('.quantity-btn.minus').addEventListener('click', () => {
                        if (quantityInput.value > 1) {
                            quantityInput.value = parseInt(quantityInput.value) - 1;
                            updateProductTotal(quantityInput, totalElement);
                            updateOrderTotals();
                        }
                    });
                    
                    productItem.querySelector('.quantity-btn.plus').addEventListener('click', () => {
                        quantityInput.value = parseInt(quantityInput.value) + 1;
                        updateProductTotal(quantityInput, totalElement);
                        updateOrderTotals();
                    });
                    
                    quantityInput.addEventListener('change', () => {
                        if (quantityInput.value < 1) quantityInput.value = 1;
                        updateProductTotal(quantityInput, totalElement);
                        updateOrderTotals();
                    });
                });
                
                if (hasSelectedProducts) {
                    document.getElementById('selectedProductsContainer').classList.remove('hidden');
                } else {
                    document.getElementById('selectedProductsContainer').classList.add('hidden');
                }
                
                updateOrderTotals();
                
                // Functions to update product and order totals
                function updateProductTotal(quantityInput, totalElement) {
                    const quantity = parseInt(quantityInput.value);
                    const price = parseFloat(quantityInput.getAttribute('data-price'));
                    const total = quantity * price;
                    totalElement.textContent = formatCurrency(total);
                }
                
                function updateOrderTotals() {
                    let subtotal = 0;
                    
                    document.querySelectorAll('.product-quantity').forEach(input => {
                        const quantity = parseInt(input.value);
                        const price = parseFloat(input.getAttribute('data-price'));
                        subtotal += quantity * price;
                    });
                    
                    const deliveryFee = calculateDeliveryFee(subtotal);
                    const total = subtotal + deliveryFee;
                    
                    document.getElementById('orderSubtotal').textContent = formatCurrency(subtotal);
                    document.getElementById('orderDeliveryFee').textContent = formatCurrency(deliveryFee);
                    document.getElementById('orderTotal').textContent = formatCurrency(total);
                }
            }
        }
        
        // Get status icon for tracking
        function getStatusIcon(status) {
            const statusLower = status.toLowerCase();
            
            if (statusLower.includes('placed') || statusLower.includes('received')) {
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`;
            } else if (statusLower.includes('confirmed') || statusLower.includes('approved')) {
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`;
            } else if (statusLower.includes('preparing') || statusLower.includes('processing')) {
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>`;
            } else if (statusLower.includes('shipped') || statusLower.includes('transit')) {
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>`;
            } else if (statusLower.includes('delivered')) {
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>`;
            } else {
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`;
            }
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Navigation
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const viewName = btn.getAttribute('data-view');
                    switchView(viewName);
                    
                    // Update active state
                    document.querySelectorAll('.nav-btn').forEach(navBtn => {
                        navBtn.classList.remove('bg-primary', 'bg-opacity-10', 'text-primary');
                        navBtn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                    });
                    
                    btn.classList.add('bg-primary', 'bg-opacity-10', 'text-primary');
                    btn.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                });
            });
            
            // Switch view
            function switchView(viewName) {
                // Hide all views
                document.querySelectorAll('.view-content').forEach(view => {
                    view.classList.add('hidden');
                });
                
                // Show selected view
                const selectedView = document.getElementById(`${viewName}-view`);
                selectedView.classList.remove('hidden');
                
                // Load data for the view
                if (viewName === 'dashboard') {
                    loadDashboard();
                } else if (viewName === 'orders') {
                    loadOrders();
                } else if (viewName === 'inventory') {
                    loadInventory();
                } else if (viewName === 'tracking') {
                    loadRecentDeliveries();
                    loadOrderTracking();
                }
            }
            
            // Quick action buttons
            document.getElementById('placeOrderBtn').addEventListener('click', () => {
                showNewOrderModal();
            });
            
            document.getElementById('newOrderBtn').addEventListener('click', () => {
                showNewOrderModal();
            });
            
            document.getElementById('trackOrderBtn').addEventListener('click', () => {
                switchView('tracking');
            });
            
            document.getElementById('manageInventoryBtn').addEventListener('click', () => {
                switchView('inventory');
            });
            
            // Add product button (Supplier)
            document.getElementById('addProductBtn').addEventListener('click', () => {
                document.getElementById('addProductModal').classList.remove('hidden');
            });
            
            // Track order search
            document.getElementById('trackOrderSearchBtn').addEventListener('click', () => {
                const orderId = document.getElementById('trackingOrderSearch').value.trim();
                loadOrderTracking(orderId);
            });
            
            // Order view details from tracking
            document.getElementById('viewDeliveryDetailsBtn').addEventListener('click', () => {
                const orderId = document.getElementById('trackingOrderId').textContent.replace('Order #', '');
                document.getElementById('orderDetailsModal').classList.add('hidden');
                switchView('tracking');
                document.getElementById('trackingOrderSearch').value = orderId;
                loadOrderTracking(orderId);
            });
            
            // Orders filter change
            document.getElementById('orderStatusFilter').addEventListener('change', loadOrders);
            document.getElementById('orderDateFilter').addEventListener('change', loadOrders);
            document.getElementById('orderSearch').addEventListener('input', loadOrders);
            
            // Inventory filter change
            document.getElementById('categoryFilter').addEventListener('change', loadInventory);
            document.getElementById('stockFilter').addEventListener('change', loadInventory);
            document.getElementById('inventorySearch').addEventListener('input', loadInventory);
            
            // User menu toggle
            document.getElementById('userMenuBtn').addEventListener('click', () => {
                document.getElementById('userMenu').classList.toggle('hidden');
            });
            
            // Switch user type
            document.getElementById('switchUserBtn').addEventListener('click', () => {
                mockData.currentUserType = mockData.currentUserType === 'farmer' ? 'supplier' : 'farmer';
                updateUserInterface();
                loadDashboard();
                document.getElementById('userMenu').classList.add('hidden');
                showToast(`Switched to ${mockData.currentUserType} view`, 'info');
            });
            
            // Close modals
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('[id$="Modal"]').forEach(modal => {
                        modal.classList.add('hidden');
                    });
                });
            });
            
            // Close modals when clicking outside
            document.querySelectorAll('[id$="Modal"]').forEach(modal => {
                modal.addEventListener('click', event => {
                    if (event.target === modal) {
                        modal.classList.add('hidden');
                    }
                });
            });
            
            // Notifications panel toggle
            document.getElementById('notificationBtn').addEventListener('click', () => {
                const panel = document.getElementById('notificationsPanel');
                panel.classList.toggle('hidden');
                
                if (!panel.classList.contains('hidden')) {
                    loadNotifications();
                    
                    // Mark notifications as read when opening panel
                    mockData.notifications.forEach(notif => {
                        if (notif.userType === mockData.currentUserType) {
                            notif.read = true;
                        }
                    });
                    
                    updateNotificationBadge();
                    
                    // Close user menu if open
                    document.getElementById('userMenu').classList.add('hidden');
                }
            });
            
            // Mark all notifications as read
            document.getElementById('markAllReadBtn').addEventListener('click', () => {
                mockData.notifications.forEach(notif => {
                    if (notif.userType === mockData.currentUserType) {
                        notif.read = true;
                    }
                });
                
                updateNotificationBadge();
                loadNotifications();
            });
            
            // Close panels when clicking outside
            document.addEventListener('click', event => {
                const userMenu = document.getElementById('userMenu');
                const userMenuBtn = document.getElementById('userMenuBtn');
                const notificationsPanel = document.getElementById('notificationsPanel');
                const notificationBtn = document.getElementById('notificationBtn');
                
                if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
                    userMenu.classList.add('hidden');
                }
                
                if (!notificationBtn.contains(event.target) && !notificationsPanel.contains(event.target)) {
                    notificationsPanel.classList.add('hidden');
                }
            });
            
            // Order form submit
            document.getElementById('newOrderForm').addEventListener('submit', event => {
                event.preventDefault();
                
                const selectedProducts = [];
                document.querySelectorAll('.product-quantity').forEach(input => {
                    const productId = input.getAttribute('data-product-id');
                    const quantity = parseInt(input.value);
                    const price = parseFloat(input.getAttribute('data-price'));
                    
                    selectedProducts.push({
                        productId,
                        quantity,
                        price,
                        total: quantity * price
                    });
                });
                
                if (selectedProducts.length === 0) {
                    showToast('Please select at least one product', 'warning');
                    return;
                }
                
                // Process the order
                document.getElementById('newOrderModal').classList.add('hidden');
                showToast('Order placed successfully', 'success');
                
                // Simulate adding the order to the system
                const newOrder = {
                    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
                    farmerId: 'farmer-1',
                    farmer: 'John Smith Farm',
                    supplierId: 'supplier-1',
                    supplier: document.getElementById('orderSupplier').value,
                    date: new Date().toISOString().split('T')[0],
                    deliveryDate: document.getElementById('deliveryDate').value,
                    status: 'pending',
                    address: document.getElementById('deliveryAddress').value,
                    items: selectedProducts.map(p => {
                        const product = mockData.products.find(prod => prod.id == p.productId);
                        return {
                            product: product.name,
                            quantity: p.quantity,
                            price: p.price,
                            total: p.total
                        };
                    }),
                    subtotal: selectedProducts.reduce((sum, p) => sum + p.total, 0),
                    deliveryFee: parseFloat(document.getElementById('orderDeliveryFee').textContent.replace('$', '')),
                    total: parseFloat(document.getElementById('orderTotal').textContent.replace('$', '')),
                    notes: document.getElementById('orderNotes').value,
                    tracking: [
                        { date: new Date().toISOString(), status: 'Order Placed', description: 'Your order has been received' }
                    ]
                };
                
                // Add to mock data
                mockData.orders.unshift(newOrder);
                
                // Add notification for supplier
                mockData.notifications.unshift({
                    id: `notif-${Math.floor(10000 + Math.random() * 90000)}`,
                    userType: 'supplier',
                    title: 'New Order Received',
                    message: `You have received a new order #${newOrder.id} from ${newOrder.farmer}.`,
                    timestamp: new Date().toISOString(),
                    read: false,
                    orderId: newOrder.id
                });
                
                // Add to activity feed
                mockData.activities.unshift({
                    id: `activity-${Math.floor(10000 + Math.random() * 90000)}`,
                    userType: 'both',
                    date: new Date().toISOString(),
                    activity: `New order #${newOrder.id} placed`,
                    status: 'info'
                });
                
                // Reload relevant views
                if (document.getElementById('dashboard-view').classList.contains('hidden')) {
                    switchView('orders');
                } else {
                    loadDashboard();
                }
            });
            
            // Add product form submit
            document.getElementById('addProductForm').addEventListener('submit', event => {
                event.preventDefault();
                
                // Process the product
                document.getElementById('addProductModal').classList.add('hidden');
                showToast('Product added successfully', 'success');
                
                // Simulate adding the product to the system
                const newProduct = {
                    id: mockData.products.length + 1,
                    name: document.getElementById('productName').value,
                    category: document.getElementById('productCategory').value,
                    price: parseFloat(document.getElementById('productPrice').value),
                    unit: document.getElementById('productUnit').value,
                    stock: parseInt(document.getElementById('productStock').value),
                    description: document.getElementById('productDescription').value
                };
                
                // Add to mock data
                mockData.products.push(newProduct);
                
                // Add to activity feed
                mockData.activities.unshift({
                    id: `activity-${Math.floor(10000 + Math.random() * 90000)}`,
                    userType: 'supplier',
                    date: new Date().toISOString(),
                    activity: `Inventory updated: Added ${newProduct.stock} ${newProduct.unit}s of ${newProduct.name}`,
                    status: 'info'
                });
                
                // Reload inventory view
                loadInventory();
            });
            
            // Order action buttons
            document.getElementById('approveOrderBtn').addEventListener('click', () => {
                const orderId = document.getElementById('orderDetailsId').textContent;
                processOrderAction(orderId, 'approved', 'Order Confirmed', 'Your order has been approved by the supplier');
            });
            
            document.getElementById('markShippedBtn').addEventListener('click', () => {
                const orderId = document.getElementById('orderDetailsId').textContent;
                processOrderAction(orderId, 'in-transit', 'Shipped', 'Your order has been shipped and is on the way');
            });
            
            document.getElementById('markDeliveredBtn').addEventListener('click', () => {
                const orderId = document.getElementById('orderDetailsId').textContent;
                processOrderAction(orderId, 'delivered', 'Delivered', 'Your order has been delivered');
            });
            
            document.getElementById('confirmReceiptBtn').addEventListener('click', () => {
                const orderId = document.getElementById('orderDetailsId').textContent;
                processOrderAction(orderId, 'delivered', 'Delivered', 'Receipt confirmed by customer');
            });
            
            document.getElementById('cancelOrderBtn').addEventListener('click', () => {
                const orderId = document.getElementById('orderDetailsId').textContent;
                processOrderAction(orderId, 'cancelled', 'Cancelled', 'Order has been cancelled');
            });
            
            // Process order action
            function processOrderAction(orderId, newStatus, statusLabel, description) {
                const order = mockData.orders.find(o => o.id === orderId);
                
                if (!order) {
                    showToast('Order not found', 'error');
                    return;
                }
                
                // Update order status
                order.status = newStatus;
                
                // Add tracking event
                order.tracking.push({
                    date: new Date().toISOString(),
                    status: statusLabel,
                    description: description
                });
                
                // Add notification for the other party
                const notifUserType = mockData.currentUserType === 'farmer' ? 'supplier' : 'farmer';
                mockData.notifications.unshift({
                    id: `notif-${Math.floor(10000 + Math.random() * 90000)}`,
                    userType: notifUserType,
                    title: `Order ${statusLabel}`,
                    message: `Order #${orderId} has been ${newStatus.replace('-', ' ')}.`,
                    timestamp: new Date().toISOString(),
                    read: false,
                    orderId: orderId
                });
                
                // Add to activity feed
                mockData.activities.unshift({
                    id: `activity-${Math.floor(10000 + Math.random() * 90000)}`,
                    userType: 'both',
                    date: new Date().toISOString(),
                    activity: `Order #${orderId} has been ${newStatus.replace('-', ' ')}`,
                    status: newStatus === 'cancelled' ? 'error' : 'success'
                });
                
                // Close modal
                document.getElementById('orderDetailsModal').classList.add('hidden');
                
                // Show toast
                showToast(`Order status updated to ${getStatusLabel(newStatus)}`, 'success');
                
                // Reload relevant views
                if (document.getElementById('dashboard-view').classList.contains('hidden')) {
                    if (document.getElementById('orders-view').classList.contains('hidden')) {
                        loadRecentDeliveries();
                        loadOrderTracking(orderId);
                    } else {
                        loadOrders();
                    }
                } else {
                    loadDashboard();
                }
            }
        }
        
        // Initialize the application
        window.addEventListener('DOMContentLoaded', initApp);