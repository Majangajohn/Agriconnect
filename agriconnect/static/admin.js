        // Mock data in JSON format
        const mockUserData = {
            users: [
                { id: 1, name: "John Smith", email: "john.smith@email.com", type: "farmer", status: "active", joined: "Jan 15, 2023", lastActive: "2 hours ago" },
                { id: 2, name: "Emma Johnson", email: "emma.j@agripro.com", type: "supplier", status: "active", joined: "Feb 3, 2023", lastActive: "1 day ago" },
                { id: 3, name: "Michael Brown", email: "michael@farmfresh.com", type: "buyer", status: "pending", joined: "Mar 22, 2023", lastActive: "5 days ago" },
                { id: 4, name: "Sarah Davis", email: "sarahd@cropmasters.com", type: "farmer", status: "inactive", joined: "Apr 10, 2023", lastActive: "3 weeks ago" },
                { id: 5, name: "Robert Wilson", email: "rob@agrisupply.com", type: "supplier", status: "active", joined: "May 5, 2023", lastActive: "1 hour ago" },
                { id: 6, name: "Jennifer Lee", email: "jlee@harvestdirect.com", type: "buyer", status: "active", joined: "Jun 12, 2023", lastActive: "30 minutes ago" },
                { id: 7, name: "David Miller", email: "david@organicfarms.com", type: "farmer", status: "pending", joined: "Jun 18, 2023", lastActive: "2 days ago" },
                { id: 8, name: "Amanda Taylor", email: "amanda@greenvalley.com", type: "supplier", status: "inactive", joined: "Jun 20, 2023", lastActive: "1 month ago" },
                { id: 9, name: "James Anderson", email: "james@cropcircle.com", type: "buyer", status: "active", joined: "Jun 22, 2023", lastActive: "5 hours ago" },
                { id: 10, name: "Linda Martinez", email: "linda@farmersmarket.com", type: "farmer", status: "active", joined: "Jun 25, 2023", lastActive: "10 minutes ago" }
            ],
            total: 245
        };
        
        const mockOrderData = {
            orders: [
                { id: "ORD-78901", customer: "Green Farms Inc", date: "Jun 15, 2023", amount: 245000, status: "processing" },
                { id: "ORD-78902", customer: "Harvest Direct", date: "Jun 14, 2023", amount: 178050, status: "shipped" },
                { id: "ORD-78903", customer: "Organic Valley Coop", date: "Jun 12, 2023", amount: 321075, status: "delivered" },
                { id: "ORD-78904", customer: "Crop Masters LLC", date: "Jun 10, 2023", amount: 89025, status: "cancelled" },
                { id: "ORD-78905", customer: "Farm Fresh Ltd", date: "Jun 8, 2023", amount: 153000, status: "pending" },
                { id: "ORD-78906", customer: "Agri Solutions", date: "Jun 5, 2023", amount: 210500, status: "processing" },
                { id: "ORD-78907", customer: "Green Valley Farms", date: "Jun 3, 2023", amount: 98000, status: "delivered" },
                { id: "ORD-78908", customer: "Nature's Best", date: "Jun 1, 2023", amount: 126750, status: "shipped" },
                { id: "ORD-78909", customer: "Eco Farmers Coop", date: "May 29, 2023", amount: 185000, status: "processing" },
                { id: "ORD-78910", customer: "Sustainable Harvest", date: "May 27, 2023", amount: 215300, status: "pending" }
            ],
            total: 89
        };
        
        // Initialize dark mode
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
                // Save preference to localStorage
                const isDarkMode = document.documentElement.classList.contains('dark');
                localStorage.setItem('darkMode', isDarkMode);
            });
            
            // Load saved preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.documentElement.classList.add('dark');
            }
        }

        // Setup navigation
        function setupNavigation() {
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
                    
                    // Initialize charts when switching to analytics or finance views
                    if (viewName === 'analytics') {
                        setTimeout(initAnalyticsCharts, 100);
                    }
                    if (viewName === 'finance') {
                        setTimeout(initFinanceCharts, 100);
                    }
                    if (viewName === 'orders') {
                        setTimeout(initOrderCharts, 100);
                    }
                });
            });
        }

        function switchView(viewName) {
            // Hide all views
            document.querySelectorAll('.view-content').forEach(view => {
                view.classList.add('hidden');
            });
            
            // Show selected view
            const selectedView = document.getElementById(`${viewName}-view`);
            selectedView.classList.remove('hidden');
        }

        // Setup user menu
        function setupUserMenu() {
            document.getElementById('userMenuBtn').addEventListener('click', () => {
                document.getElementById('userMenu').classList.toggle('hidden');
            });

            // Close menu when clicking outside
            document.addEventListener('click', event => {
                const userMenu = document.getElementById('userMenu');
                const userMenuBtn = document.getElementById('userMenuBtn');
                
                if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
                    userMenu.classList.add('hidden');
                }
            });
        }
        
        // Initialize analytics charts
        function initAnalyticsCharts() {
            // Traffic Chart
            const trafficCtx = document.getElementById('trafficChart').getContext('2d');
            new Chart(trafficCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Website Visits',
                        data: [12000, 19000, 15000, 18000, 22000, 25000],
                        borderColor: '#5D5CDE',
                        backgroundColor: 'rgba(93, 92, 222, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
            // Performance Chart
            const perfCtx = document.getElementById('performanceChart').getContext('2d');
            new Chart(perfCtx, {
                type: 'bar',
                data: {
                    labels: ['API Response', 'Page Load', 'DB Queries', 'Image Processing'],
                    datasets: [{
                        label: 'Time (ms)',
                        data: [320, 420, 210, 380],
                        backgroundColor: [
                            'rgba(93, 92, 222, 0.7)',
                            'rgba(79, 79, 199, 0.7)',
                            'rgba(65, 66, 176, 0.7)',
                            'rgba(51, 53, 153, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
            // Regional Activity Chart
            const regionCtx = document.getElementById('regionalActivityChart').getContext('2d');
            new Chart(regionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
                    datasets: [{
                        label: 'Users by Region',
                        data: [35, 28, 20, 10, 5, 2],
                        backgroundColor: [
                            'rgba(93, 92, 222, 0.7)',
                            'rgba(79, 79, 199, 0.7)',
                            'rgba(65, 66, 176, 0.7)',
                            'rgba(51, 53, 153, 0.7)',
                            'rgba(37, 40, 130, 0.7)',
                            'rgba(23, 27, 107, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        
        // Initialize finance charts
        function initFinanceCharts() {
            // Revenue Chart
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            new Chart(revenueCtx, {
                type: 'pie',
                data: {
                    labels: ['Farm Supplies', 'Produce', 'Equipment', 'Services'],
                    datasets: [{
                        label: 'Revenue by Category',
                        data: [45, 30, 15, 10],
                        backgroundColor: [
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(59, 130, 246, 0.7)',
                            'rgba(139, 92, 246, 0.7)',
                            'rgba(245, 158, 11, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            
            // Growth Chart
            const growthCtx = document.getElementById('growthChart').getContext('2d');
            new Chart(growthCtx, {
                type: 'line',
                data: {
                    labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023'],
                    datasets: [{
                        label: 'Quarterly Revenue',
                        data: [1850000, 2100000, 1980000, 2250000, 2400000, 2650000],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
        
        // Initialize order charts
        function initOrderCharts() {
            const orderCtx = document.getElementById('orderStatusChart').getContext('2d');
            new Chart(orderCtx, {
                type: 'polarArea',
                data: {
                    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
                    datasets: [{
                        label: 'Orders by Status',
                        data: [24, 32, 18, 22, 4],
                        backgroundColor: [
                            'rgba(245, 158, 11, 0.7)',
                            'rgba(59, 130, 246, 0.7)',
                            'rgba(139, 92, 246, 0.7)',
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(239, 68, 68, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        
        // Populate user management table
        function populateUserTable() {
            const userTableBody = document.getElementById('userTableBody');
            const userTypeFilter = document.getElementById('userTypeFilter').value;
            const userStatusFilter = document.getElementById('userStatusFilter').value;
            const userSearch = document.getElementById('userSearch').value.toLowerCase();
            
            // Filter users
            const filteredUsers = mockUserData.users.filter(user => {
                const matchesType = userTypeFilter === 'all' || user.type === userTypeFilter;
                const matchesStatus = userStatusFilter === 'all' || user.status === userStatusFilter;
                const matchesSearch = userSearch === '' || 
                    user.name.toLowerCase().includes(userSearch) || 
                    user.email.toLowerCase().includes(userSearch);
                
                return matchesType && matchesStatus && matchesSearch;
            });
            
            userTableBody.innerHTML = '';
            
            filteredUsers.forEach(user => {
                const row = document.createElement('tr');
                
                // Status badge colors
                const statusColors = {
                    active: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-300' },
                    inactive: { bg: 'bg-gray-100', text: 'text-gray-800', darkBg: 'dark:bg-gray-700', darkText: 'dark:text-gray-300' },
                    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', darkBg: 'dark:bg-yellow-900', darkText: 'dark:text-yellow-300' }
                };
                
                // Type badge colors
                const typeColors = {
                    farmer: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-300' },
                    supplier: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-300' },
                    buyer: { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-300' }
                };
                
                const status = statusColors[user.status];
                const type = typeColors[user.type];
                
                // Get initials for avatar
                const initials = user.name.split(' ').map(n => n[0]).join('');
                // Random avatar color
                const avatarColors = ['bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100'];
                const textColors = ['text-green-600', 'text-blue-600', 'text-purple-600', 'text-yellow-600', 'text-pink-600'];
                const darkBg = ['dark:bg-green-900', 'dark:bg-blue-900', 'dark:bg-purple-900', 'dark:bg-yellow-900', 'dark:bg-pink-900'];
                const darkText = ['dark:text-green-400', 'dark:text-blue-400', 'dark:text-purple-400', 'dark:text-yellow-400', 'dark:text-pink-400'];
                
                const randomIndex = Math.floor(Math.random() * avatarColors.length);
                
                row.innerHTML = `
                    <td class="px-4 py-3">
                        <div class="flex items-center">
                            <div class="w-10 h-10 ${avatarColors[randomIndex]} ${darkBg[randomIndex]} dark:bg-opacity-30 rounded-full flex items-center justify-center">
                                <span class="${textColors[randomIndex]} ${darkText[randomIndex]} font-medium">${initials}</span>
                            </div>
                            <div class="ml-3">
                                <div class="font-medium">${user.name}</div>
                                <div class="text-sm text-gray-500">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-4 py-3">
                        <span class="inline-block px-2 py-1 text-xs rounded-full ${type.bg} ${type.text} ${type.darkBg} ${type.darkText}">${user.type.charAt(0).toUpperCase() + user.type.slice(1)}</span>
                    </td>
                    <td class="px-4 py-3">
                        <span class="inline-block px-2 py-1 text-xs rounded-full ${status.bg} ${status.text} ${status.darkBg} ${status.darkText}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                    </td>
                    <td class="px-4 py-3 text-sm">${user.joined}</td>
                    <td class="px-4 py-3 text-sm">${user.lastActive}</td>
                    <td class="px-4 py-3">
                        <div class="flex space-x-2">
                            <button class="edit-user text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" data-id="${user.id}">Edit</button>
                            <button class="suspend-user text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" data-id="${user.id}">Suspend</button>
                        </div>
                    </td>
                `;
                
                userTableBody.appendChild(row);
            });
            
            // Update pagination info
            document.getElementById('userPaginationInfo').textContent = `Showing 1-${filteredUsers.length} of ${filteredUsers.length} users`;
        }
        
        // Populate order management table
        function populateOrderTable() {
            const orderTableBody = document.getElementById('orderTableBody');
            const orderTypeFilter = document.getElementById('orderTypeFilter').value;
            const orderStatusFilter = document.getElementById('orderStatusFilter').value;
            const orderDateFilter = document.getElementById('orderDateFilter').value;
            const orderSearch = document.getElementById('orderSearch').value.toLowerCase();
            
            // Filter orders
            const filteredOrders = mockOrderData.orders.filter(order => {
                // In a real app, we would have actual order types and dates to filter by
                const matchesType = orderTypeFilter === 'all'; 
                const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
                const matchesDate = !orderDateFilter; // Simplified for demo
                const matchesSearch = orderSearch === '' || 
                    order.id.toLowerCase().includes(orderSearch) || 
                    order.customer.toLowerCase().includes(orderSearch);
                
                return matchesType && matchesStatus && matchesDate && matchesSearch;
            });
            
            orderTableBody.innerHTML = '';
            
            filteredOrders.forEach(order => {
                const row = document.createElement('tr');
                
                // Status badge colors
                const statusColors = {
                    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', darkBg: 'dark:bg-yellow-900', darkText: 'dark:text-yellow-300' },
                    processing: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-300' },
                    shipped: { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-300' },
                    delivered: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-300' },
                    cancelled: { bg: 'bg-red-100', text: 'text-red-800', darkBg: 'dark:bg-red-900', darkText: 'dark:text-red-300' }
                };
                
                const status = statusColors[order.status];
                const amountFormatted = new Intl.NumberFormat('en-KE', { 
                    style: 'currency', 
                    currency: 'KES',
                    minimumFractionDigits: 0
                }).format(order.amount);
                
                row.innerHTML = `
                    <td class="px-4 py-3 text-sm font-medium">${order.id}</td>
                    <td class="px-4 py-3">
                        <div class="font-medium">${order.customer}</div>
                    </td>
                    <td class="px-4 py-3 text-sm">${order.date}</td>
                    <td class="px-4 py-3 text-sm">${amountFormatted}</td>
                    <td class="px-4 py-3">
                        <span class="status-badge ${status.bg} ${status.text} ${status.darkBg} ${status.darkText}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </td>
                    <td class="px-4 py-3">
                        <div class="flex space-x-2">
                            <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">View</button>
                            <button class="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">Update</button>
                        </div>
                    </td>
                `;
                
                orderTableBody.appendChild(row);
            });
            
            // Update pagination info
            document.getElementById('orderPaginationInfo').textContent = `Showing 1-${filteredOrders.length} of ${filteredOrders.length} orders`;
        }
        
        // Setup user management filtering
        function setupUserFilters() {
            const userTypeFilter = document.getElementById('userTypeFilter');
            const userStatusFilter = document.getElementById('userStatusFilter');
            const userSearch = document.getElementById('userSearch');
            
            [userTypeFilter, userStatusFilter].forEach(filter => {
                filter.addEventListener('change', populateUserTable);
            });
            
            userSearch.addEventListener('keyup', populateUserTable);
        }
        
        // Setup order management filtering
        function setupOrderFilters() {
            const orderTypeFilter = document.getElementById('orderTypeFilter');
            const orderStatusFilter = document.getElementById('orderStatusFilter');
            const orderDateFilter = document.getElementById('orderDateFilter');
            const orderSearch = document.getElementById('orderSearch');
            
            [orderTypeFilter, orderStatusFilter, orderDateFilter].forEach(filter => {
                filter.addEventListener('change', populateOrderTable);
            });
            
            orderSearch.addEventListener('keyup', populateOrderTable);
        }
        
        // Setup modals
        function setupModals() {
            // Add User Modal
            const addUserModal = document.getElementById('addUserModal');
            const addUserBtn = document.getElementById('addUserBtn');
            const closeUserModal = document.getElementById('closeUserModal');
            const cancelUserBtn = document.getElementById('cancelUserBtn');
            const addUserForm = document.getElementById('addUserForm');
            
            addUserBtn.addEventListener('click', () => {
                addUserModal.style.display = 'flex';
            });
            
            closeUserModal.addEventListener('click', () => {
                addUserModal.style.display = 'none';
            });
            
            cancelUserBtn.addEventListener('click', () => {
                addUserModal.style.display = 'none';
            });
            
            addUserForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('User added successfully!');
                addUserModal.style.display = 'none';
                // In a real app, you would add the user to the data and re-render the table
            });
            
            // Create Order Modal
            const createOrderModal = document.getElementById('createOrderModal');
            const createOrderBtn = document.getElementById('createOrderBtn');
            const closeOrderModal = document.getElementById('closeOrderModal');
            const cancelOrderBtn = document.getElementById('cancelOrderBtn');
            const createOrderForm = document.getElementById('createOrderForm');
            
            createOrderBtn.addEventListener('click', () => {
                createOrderModal.style.display = 'flex';
            });
            
            closeOrderModal.addEventListener('click', () => {
                createOrderModal.style.display = 'none';
            });
            
            cancelOrderBtn.addEventListener('click', () => {
                createOrderModal.style.display = 'none';
            });
            
            createOrderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Order created successfully!');
                createOrderModal.style.display = 'none';
                // In a real app, you would add the order to the data and re-render the table
            });
            
            // Export Data Button
            document.getElementById('exportDataBtn').addEventListener('click', () => {
                alert('Exporting data to PDF...');
                // In a real app, this would generate and download a PDF
            });
            
            // Settings buttons
            document.getElementById('saveSettingsBtn').addEventListener('click', () => {
                alert('Settings saved successfully!');
            });
            
            document.getElementById('cancelSettingsBtn').addEventListener('click', () => {
                alert('Changes discarded');
            });
        }
        
        // Setup user actions
        function setupUserActions() {
            // Event delegation for edit and suspend buttons
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('edit-user')) {
                    const userId = e.target.getAttribute('data-id');
                    alert(`Editing user with ID: ${userId}`);
                }
                
                if (e.target.classList.contains('suspend-user')) {
                    const userId = e.target.getAttribute('data-id');
                    if (confirm(`Are you sure you want to suspend user with ID: ${userId}?`)) {
                        alert(`User ${userId} suspended successfully`);
                    }
                }
            });
        }
        
        // Initialize app
        function initApp() {
            initDarkMode();
            setupNavigation();
            setupUserMenu();
            populateUserTable();
            populateOrderTable();
            setupUserFilters();
            setupOrderFilters();
            setupModals();
            setupUserActions();
            
            // Initialize charts for the initial dashboard view
            setTimeout(() => {
                initAnalyticsCharts();
                initFinanceCharts();
                initOrderCharts();
            }, 100);
        }

        window.addEventListener('DOMContentLoaded', initApp);