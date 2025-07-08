        const mockData = {
            orders: [
                { id: 'ORD-12348', farmer: 'Green Acres Farm', date: 'May 20, 2023', items: '2x Corn Seeds, 3x Fertilizer', total: '$185.50', status: 'pending', statusClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300' },
                { id: 'ORD-12347', farmer: 'John Smith Farm', date: 'May 18, 2023', items: '1x Drip Irrigation Kit', total: '$150.00', status: 'delivered', statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300' },
                { id: 'ORD-12346', farmer: 'River Valley Farm', date: 'May 15, 2023', items: '5x Organic Fertilizer, 2x Pest Control', total: '$245.75', status: 'in-transit', statusClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300' },
                { id: 'ORD-12345', farmer: 'Sunshine Fields', date: 'May 10, 2023', items: '3x Hybrid Corn Seeds', total: '$116.25', status: 'delivered', statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300' },
                { id: 'ORD-12344', farmer: 'Mountain View Ranch', date: 'May 5, 2023', items: '10x Organic NPK Fertilizer', total: '$325.00', status: 'approved', statusClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300' },
                { id: 'ORD-12343', farmer: 'Golden Harvest', date: 'May 1, 2023', items: '1x Tractor Attachment', total: '$450.00', status: 'cancelled', statusClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300' }
            ],
            products: [
                { id: 1, name: 'Premium Wheat Seeds', category: 'seeds', price: '$45.00/kg', stock: '15 kg', status: 'Low Stock', statusClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300', description: 'High-yield wheat seeds perfect for most climate conditions. Disease resistant variety that produces excellent quality grain.' },
                { id: 2, name: 'Organic NPK Fertilizer', category: 'fertilizers', price: '$32.50/bag', stock: '42 bags', status: 'In Stock', statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300', description: 'Balanced NPK formula (10-10-10) for general purpose fertilization. OMRI certified for organic farming.' },
                { id: 3, name: 'Drip Irrigation Kit', category: 'equipment', price: '$120.00/set', stock: '18 sets', status: 'In Stock', statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300', description: 'Complete drip irrigation system for up to 1/4 acre. Water-efficient design with durable components and easy installation.' },
                { id: 4, name: 'Hybrid Corn Seeds', category: 'seeds', price: '$38.75/kg', stock: '25 kg', status: 'In Stock', statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300', description: 'Drought-resistant hybrid corn seeds with excellent yield potential. Fast maturity and strong stalks.' },
                { id: 5, name: 'Bio Pest Control', category: 'pesticides', price: '$29.99/bottle', stock: '8 bottles', status: 'Low Stock', statusClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300', description: 'Natural pest control solution safe for organic farming. Controls a wide variety of common agricultural pests.' },
                { id: 6, name: 'Soil Testing Kit', category: 'equipment', price: '$85.00/kit', stock: '5 kits', status: 'Low Stock', statusClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300', description: 'Professional soil testing kit to measure pH, nitrogen, phosphorus, and potassium levels for optimal crop growth.' },
                { id: 7, name: 'Tomato Seeds', category: 'seeds', price: '$12.50/pack', stock: '0 packs', status: 'Out of Stock', statusClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300', description: 'Heirloom tomato seeds with excellent flavor and high yield. Suitable for both greenhouse and outdoor cultivation.' }
            ],
            tracking: {
                ORD12346: {
                    id: 'ORD-12346',
                    date: 'May 15, 2023',
                    status: 'In Transit',
                    statusClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300',
                    supplier: 'AgriSupply Inc.',
                    farmer: 'River Valley Farm',
                    eta: 'May 20, 2023',
                    timeline: [
                        { date: 'May 15, 2023', time: '10:30 AM', description: 'Order placed', location: 'River Valley Farm' },
                        { date: 'May 15, 2023', time: '2:15 PM', description: 'Order processed', location: 'AgriSupply Warehouse' },
                        { date: 'May 16, 2023', time: '9:00 AM', description: 'Shipped', location: 'Springfield, IL' },
                        { date: 'May 18, 2023', time: '3:45 PM', description: 'Out for delivery', location: 'River Valley Area' },
                        { date: 'May 20, 2023', time: '9:30 AM', description: 'Estimated delivery', location: 'River Valley Farm' }
                    ],
                    items: [
                        { name: 'Organic Fertilizer', quantity: '5 bags', price: '$32.50', total: '$162.50' },
                        { name: 'Bio Pest Control', quantity: '2 bottles', price: '$29.99', total: '$59.98' },
                        { name: 'Shipping', quantity: '', price: '', total: '$23.27' }
                    ],
                    orderTotal: '$245.75'
                }
            }
        };

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize dark mode toggle
            const toggleDarkMode = document.getElementById('toggleDarkMode');
            toggleDarkMode.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                showToast('Dark mode ' + (document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled'));
            });

            // User menu toggle
            const userMenuBtn = document.getElementById('userMenuBtn');
            const userMenu = document.getElementById('userMenu');
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenu.classList.toggle('hidden');
            });

            // Close user menu when clicking elsewhere
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target) && !userMenuBtn.contains(e.target)) {
                    userMenu.classList.add('hidden');
                }
            });

            // Navigation functionality
            const navButtons = document.querySelectorAll('.nav-btn');
            const views = document.querySelectorAll('.view-content');
            
            navButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const viewName = button.getAttribute('data-view');
                    
                    // Remove active class from all buttons
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Hide all views
                    views.forEach(view => view.classList.add('hidden'));
                    
                    // Show selected view
                    document.getElementById(`${viewName}-view`).classList.remove('hidden');
                    
                    // Load data for the view
                    if (viewName === 'orders') loadOrders();
                    if (viewName === 'inventory') loadInventory();
                    if (viewName === 'tracking') resetTrackingView();
                });
            });

            // Load initial views
            loadOrders();
            loadInventory();

            // Dashboard quick actions
            document.getElementById('manageInventoryBtn').addEventListener('click', () => {
                document.querySelector('[data-view="inventory"]').click();
            });

            document.getElementById('trackOrderBtn').addEventListener('click', () => {
                document.querySelector('[data-view="tracking"]').click();
            });

            document.getElementById('addProductDashboardBtn').addEventListener('click', () => {
                showAddProductModal();
            });

            // Add product modal
            const addProductModal = document.getElementById('addProductModal');
            const closeModalButtons = document.querySelectorAll('.close-modal');
            
            closeModalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    addProductModal.classList.add('hidden');
                });
            });

            document.getElementById('addProductBtn').addEventListener('click', showAddProductModal);

            // Product form submission
            document.getElementById('addProductForm').addEventListener('submit', (e) => {
                e.preventDefault();
                addProductModal.classList.add('hidden');
                showToast('Product added successfully!');
                
                // Reset form
                e.target.reset();
            });

            // Orders filtering
            document.getElementById('orderStatusFilter').addEventListener('change', filterOrders);
            document.getElementById('orderDateFilter').addEventListener('change', filterOrders);
            document.getElementById('orderSearch').addEventListener('input', filterOrders);
            
            // Inventory filtering
            document.getElementById('categoryFilter').addEventListener('change', filterProducts);
            document.getElementById('stockFilter').addEventListener('change', filterProducts);
            document.getElementById('inventorySearch').addEventListener('input', filterProducts);
            
            // Tracking functionality
            document.getElementById('trackOrderSearchBtn').addEventListener('click', showTrackingResult);
            
            // Notifications panel
            const notificationBtn = document.getElementById('notificationBtn');
            const notificationsPanel = document.getElementById('notificationsPanel');
            
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsPanel.classList.toggle('hidden');
            });
            
            // Close notifications when clicking elsewhere
            document.addEventListener('click', (e) => {
                if (!notificationsPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
                    notificationsPanel.classList.add('hidden');
                }
            });
            
            // Mark all notifications as read
            document.getElementById('markAllReadBtn').addEventListener('click', () => {
                document.getElementById('notificationBadge').classList.add('hidden');
                showToast('All notifications marked as read');
            });
            
            // Export orders button
            document.getElementById('exportOrdersBtn').addEventListener('click', () => {
                showToast('Orders exported successfully');
            });
            
            // Refresh orders button
            document.getElementById('refreshOrdersBtn').addEventListener('click', () => {
                loadOrders();
                showToast('Orders refreshed');
            });
        });

        // Load orders into the table
        function loadOrders() {
            const ordersTableBody = document.getElementById('ordersTableBody');
            ordersTableBody.innerHTML = '';
            
            mockData.orders.forEach(order => {
                const row = document.createElement('tr');
                row.classList.add('fade-in');
                row.innerHTML = `
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="font-medium">${order.id}</span>
                    </td>
                    <td class="px-4 py-3">${order.farmer}</td>
                    <td class="px-4 py-3 whitespace-nowrap">${order.date}</td>
                    <td class="px-4 py-3">
                        <span class="line-clamp-1">${order.items}</span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">${order.total}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="inline-block px-3 py-1 text-xs rounded-full ${order.statusClass}">
                            ${order.status}
                        </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <button class="text-primary hover:text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </td>
                `;
                ordersTableBody.appendChild(row);
            });
            
            document.getElementById('ordersCount').textContent = `Showing ${mockData.orders.length} orders`;
        }

        // Filter orders based on selections
        function filterOrders() {
            const statusFilter = document.getElementById('orderStatusFilter').value;
            const dateFilter = document.getElementById('orderDateFilter').value;
            const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
            
            const ordersTableBody = document.getElementById('ordersTableBody');
            ordersTableBody.innerHTML = '';
            
            let filteredOrders = mockData.orders;
            
            // Apply status filter
            if (statusFilter !== 'all') {
                filteredOrders = filteredOrders.filter(order => 
                    order.status.toLowerCase() === statusFilter.toLowerCase()
                );
            }
            
            // Apply search filter
            if (searchTerm) {
                filteredOrders = filteredOrders.filter(order => 
                    order.id.toLowerCase().includes(searchTerm) ||
                    order.farmer.toLowerCase().includes(searchTerm) ||
                    order.items.toLowerCase().includes(searchTerm) ||
                    order.total.toLowerCase().includes(searchTerm)
                );
            }
            
            // Apply date filter (simplified for demo)
            if (dateFilter !== 'all') {
                // In a real app, this would use actual dates
                // For demo, we'll just show a subset
                filteredOrders = filteredOrders.slice(0, 3);
            }
            
            // Render filtered orders
            filteredOrders.forEach(order => {
                const row = document.createElement('tr');
                row.classList.add('fade-in');
                row.innerHTML = `
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="font-medium">${order.id}</span>
                    </td>
                    <td class="px-4 py-3">${order.farmer}</td>
                    <td class="px-4 py-3 whitespace-nowrap">${order.date}</td>
                    <td class="px-4 py-3">
                        <span class="line-clamp-1">${order.items}</span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">${order.total}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="inline-block px-3 py-1 text-xs rounded-full ${order.statusClass}">
                            ${order.status}
                        </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <button class="text-primary hover:text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </td>
                `;
                ordersTableBody.appendChild(row);
            });
            
            document.getElementById('ordersCount').textContent = `Showing ${filteredOrders.length} of ${mockData.orders.length} orders`;
        }

        // Load products into the grid
        function loadInventory() {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';
            
            mockData.products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card', 'bg-white', 'dark:bg-dark-card', 'rounded-lg', 'shadow-sm', 'overflow-hidden', 'transition-all', 'fade-in');
                card.innerHTML = `
                    <div class="relative">
                        <div class="bg-gray-100 dark:bg-gray-800 h-32 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <span class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${product.statusClass}">${product.status}</span>
                    </div>
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-semibold">${product.name}</h3>
                            <span class="font-bold">${product.price}</span>
                        </div>
                        <div class="mb-2">
                            <span class="inline-block px-2 py-1 text-xs rounded-full ${
                                product.category === 'seeds' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300' :
                                product.category === 'fertilizers' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300' :
                                product.category === 'pesticides' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300' :
                                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300'
                            }">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${product.description}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm">Stock: <span class="font-medium">${product.stock}</span></span>
                            <button class="edit-product-btn text-primary hover:text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(card);
            });
            
            document.getElementById('productsCount').textContent = `Showing ${mockData.products.length} of 12 products`;
        }

        // Filter products based on selections
        function filterProducts() {
            const categoryFilter = document.getElementById('categoryFilter').value;
            const stockFilter = document.getElementById('stockFilter').value;
            const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
            
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';
            
            let filteredProducts = mockData.products;
            
            // Apply category filter
            if (categoryFilter !== 'all') {
                filteredProducts = filteredProducts.filter(product => 
                    product.category.toLowerCase() === categoryFilter.toLowerCase()
                );
            }
            
            // Apply stock filter
            if (stockFilter !== 'all') {
                filteredProducts = filteredProducts.filter(product => {
                    if (stockFilter === 'in-stock') return product.status === 'In Stock';
                    if (stockFilter === 'low-stock') return product.status === 'Low Stock';
                    if (stockFilter === 'out-of-stock') return product.status === 'Out of Stock';
                    return true;
                });
            }
            
            // Apply search filter
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
            }
            
            // Render filtered products
            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card', 'bg-white', 'dark:bg-dark-card', 'rounded-lg', 'shadow-sm', 'overflow-hidden', 'transition-all', 'fade-in');
                card.innerHTML = `
                    <div class="relative">
                        <div class="bg-gray-100 dark:bg-gray-800 h-32 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <span class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${product.statusClass}">${product.status}</span>
                    </div>
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-semibold">${product.name}</h3>
                            <span class="font-bold">${product.price}</span>
                        </div>
                        <div class="mb-2">
                            <span class="inline-block px-2 py-1 text-xs rounded-full ${
                                product.category === 'seeds' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300' :
                                product.category === 'fertilizers' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300' :
                                product.category === 'pesticides' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300' :
                                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300'
                            }">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${product.description}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm">Stock: <span class="font-medium">${product.stock}</span></span>
                            <button class="edit-product-btn text-primary hover:text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(card);
            });
            
            document.getElementById('productsCount').textContent = `Showing ${filteredProducts.length} of ${mockData.products.length} products`;
        }

        // Show add product modal
        function showAddProductModal() {
            document.getElementById('addProductModal').classList.remove('hidden');
        }

        // Reset tracking view
        function resetTrackingView() {
            document.getElementById('trackingResult').classList.add('hidden');
            document.getElementById('trackingNoResult').classList.add('hidden');
            document.getElementById('trackingEmptyState').classList.remove('hidden');
            document.getElementById('trackingOrderSearch').value = '';
        }

        // Show tracking result
        function showTrackingResult() {
            const orderId = document.getElementById('trackingOrderSearch').value.trim();
            
            if (!orderId) {
                showToast('Please enter an order ID', 'error');
                return;
            }
            
            // For demo purposes - only ORD-12346 has tracking data
            if (orderId === 'ORD-12346') {
                const trackingData = mockData.tracking.ORD12346;
                
                document.getElementById('trackingEmptyState').classList.add('hidden');
                document.getElementById('trackingNoResult').classList.add('hidden');
                document.getElementById('trackingResult').classList.remove('hidden');
                
                // Set order details
                document.getElementById('trackingOrderId').textContent = `Order ${trackingData.id}`;
                document.getElementById('trackingOrderDate').textContent = `Ordered on: ${trackingData.date}`;
                document.getElementById('trackingOrderStatus').textContent = trackingData.status;
                document.getElementById('trackingOrderStatus').className = `inline-block px-3 py-1 text-sm rounded-full ${trackingData.statusClass}`;
                document.getElementById('trackingSupplier').textContent = trackingData.supplier;
                document.getElementById('trackingFarmer').textContent = trackingData.farmer;
                document.getElementById('trackingETA').textContent = trackingData.eta;
                
                // Render timeline
                const timelineContainer = document.getElementById('trackingTimeline');
                timelineContainer.innerHTML = '';
                
                trackingData.timeline.forEach(event => {
                    const timelineItem = document.createElement('div');
                    timelineItem.classList.add('timeline-item');
                    timelineItem.innerHTML = `
                        <div class="bg-white dark:bg-dark-card p-3 rounded-lg shadow-sm">
                            <div class="flex justify-between">
                                <span class="font-medium">${event.description}</span>
                                <span class="text-sm text-gray-500 dark:text-gray-400">${event.date} • ${event.time}</span>
                            </div>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${event.location}</p>
                        </div>
                    `;
                    timelineContainer.appendChild(timelineItem);
                });
                
                // Render items
                const itemsTable = document.getElementById('trackingItemsTable');
                itemsTable.innerHTML = '';
                
                trackingData.items.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="px-4 py-3">${item.name}</td>
                        <td class="px-4 py-3">${item.quantity}</td>
                        <td class="px-4 py-3">${item.price}</td>
                        <td class="px-4 py-3 font-medium">${item.total}</td>
                    `;
                    itemsTable.appendChild(row);
                });
                
                // Add total row
                const totalRow = document.createElement('tr');
                totalRow.classList.add('border-t', 'border-gray-200', 'dark:border-gray-700');
                totalRow.innerHTML = `
                    <td class="px-4 py-3 font-medium" colspan="3">Total</td>
                    <td class="px-4 py-3 font-bold">${trackingData.orderTotal}</td>
                `;
                itemsTable.appendChild(totalRow);
                
                showToast(`Tracking information for ${trackingData.id} loaded`);
            } else {
                document.getElementById('trackingEmptyState').classList.add('hidden');
                document.getElementById('trackingResult').classList.add('hidden');
                document.getElementById('trackingNoResult').classList.remove('hidden');
            }
        }

        // Show toast notification
        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            
            toast.className = `toast px-4 py-3 rounded-md shadow-lg flex items-center ${
                type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
            }`;
            
            toast.innerHTML = `
                <span>${message}</span>
                <button class="ml-4 text-lg" onclick="this.parentElement.remove()">&times;</button>
            `;
            
            toastContainer.appendChild(toast);
            
            // Auto-remove after 3 seconds
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 3000);
        }