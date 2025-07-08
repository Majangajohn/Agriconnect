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
        
        // Setup navigation
        function setupNavigation() {
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const viewName = btn.getAttribute('data-view');
                    switchView(viewName);
                    document.querySelectorAll('.nav-btn').forEach(navBtn => {
                        navBtn.classList.remove('bg-primary', 'bg-opacity-10', 'text-primary');
                        navBtn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                    });
                    btn.classList.add('bg-primary', 'bg-opacity-10', 'text-primary');
                    btn.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                });
            });
            function switchView(viewName) {
                document.querySelectorAll('.view-content').forEach(view => {
                    view.classList.add('hidden');
                });
                const selectedView = document.getElementById(`${viewName}-view`);
                if (selectedView) {
                    selectedView.classList.remove('hidden');
                    if (viewName === 'tracking') {
                        populateTrackingView();
                    } else if (viewName === 'analytics') {
                        initCharts();
                    } else if (viewName === 'orders') {
                        populateOrdersView();
                    } else if (viewName === 'suppliers') {
                        populateSuppliersView();
                    }
                }
            }
        }
        
        // Setup cart functionality
        function setupCart() {
            const cartButton = document.getElementById('cartButton');
            const cartSidebar = document.getElementById('cartSidebar');
            const closeCartBtn = document.getElementById('closeCartBtn');
            cartButton.addEventListener('click', () => {
                cartSidebar.classList.remove('translate-x-full');
            });
            closeCartBtn.addEventListener('click', () => {
                cartSidebar.classList.add('translate-x-full');
            });
            document.addEventListener('click', (event) => {
                if (!cartButton.contains(event.target) && !cartSidebar.contains(event.target)) {
                    cartSidebar.classList.add('translate-x-full');
                }
            });
        }
        
        // Setup event listeners
        function setupEventListeners() {
            document.getElementById('userMenuBtn').addEventListener('click', () => {
                document.getElementById('userMenu').classList.toggle('hidden');
            });
            document.getElementById('notificationBtn').addEventListener('click', () => {
                alert("Notifications panel would open here");
            });
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.category-btn').forEach(b => {
                        b.classList.remove('active', 'bg-primary', 'text-white');
                        b.classList.add('bg-gray-100', 'dark:bg-gray-700');
                    });
                    btn.classList.add('active', 'bg-primary', 'text-white');
                    btn.classList.remove('bg-gray-100', 'dark:bg-gray-700');
                    filterProducts(btn.textContent.trim());
                });
            });
            document.addEventListener('click', (event) => {
                const userMenu = document.getElementById('userMenu');
                const userMenuBtn = document.getElementById('userMenuBtn');
                if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
                    userMenu.classList.add('hidden');
                }
            });
            document.getElementById('orderSearch').addEventListener('input', filterOrders);
            document.getElementById('orderStatusFilter').addEventListener('change', filterOrders);
            document.getElementById('orderDateFilter').addEventListener('change', filterOrders);
            document.getElementById('supplierSearch').addEventListener('input', filterSuppliers);
            document.getElementById('supplierLocationFilter').addEventListener('change', filterSuppliers);
            document.getElementById('supplierRatingFilter').addEventListener('change', filterSuppliers);
            document.getElementById('analyticsPeriod').addEventListener('change', updateAnalytics);
            document.getElementById('analyticsCategory').addEventListener('change', updateAnalytics);
            document.getElementById('comparePrevious').addEventListener('change', updateAnalytics);
        }
        
        // Populate Orders View
        function populateOrdersView() {
            const orders = [
                {id: "ORD-78901", supplier: "AgriSupply Inc.", date: "May 22, 2023", items: "Organic Wheat (500kg)", total: "$625.00", status: "Delivered", statusClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300"},
                {id: "ORD-78900", supplier: "Green Valley Farms", date: "May 20, 2023", items: "Fresh Corn (200 ears), Tomatoes (50kg)", total: "$320.50", status: "In Transit", statusClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300"},
                {id: "ORD-78899", supplier: "Organic Harvest Co.", date: "May 15, 2023", items: "Farm Fresh Eggs (100 dozen)", total: "$499.00", status: "Processing", statusClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300"},
                {id: "ORD-78895", supplier: "Dairy Direct", date: "May 12, 2023", items: "Organic Milk (200L), Cheese (50kg)", total: "$420.75", status: "Delivered", statusClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300"},
                {id: "ORD-78890", supplier: "Berry Farms", date: "May 10, 2023", items: "Strawberries (100kg), Blueberries (50kg)", total: "$315.25", status: "Cancelled", statusClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300"}
            ];
            const tbody = document.getElementById('ordersTableBody');
            tbody.innerHTML = '';
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-4 py-3 whitespace-nowrap"><span class="font-medium">${order.id}</span></td>
                    <td class="px-4 py-3">${order.supplier}</td>
                    <td class="px-4 py-3 whitespace-nowrap">${order.date}</td>
                    <td class="px-4 py-3">${order.items}</td>
                    <td class="px-4 py-3 whitespace-nowrap">${order.total}</td>
                    <td class="px-4 py-3 whitespace-nowrap"><span class="order-status-badge ${order.statusClass}">${order.status}</span></td>
                    <td class="px-4 py-3 whitespace-nowrap"><button class="text-primary hover:underline">View Details</button></td>
                `;
                tbody.appendChild(row);
            });
            document.getElementById('ordersStart').textContent = '1';
            document.getElementById('ordersEnd').textContent = orders.length;
            document.getElementById('ordersTotal').textContent = orders.length;
        }
        
        // Filter orders
        function filterOrders() {
            const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
            const statusFilter = document.getElementById('orderStatusFilter').value;
            const rows = document.querySelectorAll('#ordersTableBody tr');
            rows.forEach(row => {
                const id = row.cells[0].textContent.toLowerCase();
                const status = row.cells[5].textContent.toLowerCase();
                const matchesSearch = id.includes(searchTerm);
                const matchesStatus = statusFilter === 'all' || status.includes(statusFilter);
                row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
            });
        }
        
        // Populate Delivery Tracking View
        function populateTrackingView() {
            const activeDeliveriesContainer = document.getElementById('activeDeliveries');
            const deliveryHistoryBody = document.getElementById('deliveryHistoryBody');
            const activeDeliveries = [
                {id: "ORD-78900", supplier: "Green Valley Farms", items: "Fresh Corn (200 ears), Tomatoes (50kg)", progress: 65, status: "In Transit", statusClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300", steps: [{name: "Ordered", completed: true}, {name: "Processing", completed: true}, {name: "Shipped", completed: true}, {name: "In Transit", completed: false, active: true}, {name: "Delivered", completed: false}]},
                {id: "ORD-78899", supplier: "Organic Harvest Co.", items: "Farm Fresh Eggs (100 dozen)", progress: 30, status: "Processing", statusClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300", steps: [{name: "Ordered", completed: true}, {name: "Processing", completed: false, active: true}, {name: "Shipped", completed: false}, {name: "In Transit", completed: false}, {name: "Delivered", completed: false}]}
            ];
            activeDeliveriesContainer.innerHTML = '';
            activeDeliveries.forEach(delivery => {
                const card = document.createElement('div');
                card.className = 'bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg p-5';
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h4 class="font-bold">${delivery.id}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">${delivery.supplier}</p>
                        </div>
                        <span class="order-status-badge ${delivery.statusClass}">${delivery.status}</span>
                    </div>
                    <p class="text-sm mb-4">${delivery.items}</p>
                    <div class="mb-4"><div class="tracking-progress"><div class="tracking-progress-fill bg-primary" style="width: ${delivery.progress}%"></div></div></div>
                    <div class="flex justify-between mb-2 text-xs text-gray-500 dark:text-gray-400"><span>Ordered</span><span>Estimated: Today</span></div>
                    <div class="flex justify-between mt-4">${delivery.steps.map(step => `<div class="tracking-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}"><div class="tracking-step-text">${step.name}</div></div>`).join('')}</div>
                    <div class="mt-6"><button class="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 py-2 rounded-md text-sm">View Details</button></div>
                `;
                activeDeliveriesContainer.appendChild(card);
            });
            const deliveryHistory = [
                {id: "ORD-78901", supplier: "AgriSupply Inc.", items: "Organic Wheat (500kg)", date: "May 22, 2023", status: "Delivered", statusClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300"},
                {id: "ORD-78895", supplier: "Dairy Direct", items: "Organic Milk (200L), Cheese (50kg)", date: "May 12, 2023", status: "Delivered", statusClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300"},
                {id: "ORD-78890", supplier: "Berry Farms", items: "Strawberries (100kg), Blueberries (50kg)", date: "May 10, 2023", status: "Cancelled", statusClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300"}
            ];
            deliveryHistoryBody.innerHTML = '';
            deliveryHistory.forEach(delivery => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-4 py-3 whitespace-nowrap"><span class="font-medium">${delivery.id}</span></td>
                    <td class="px-4 py-3">${delivery.supplier}</td>
                    <td class="px-4 py-3">${delivery.items}</td>
                    <td class="px-4 py-3 whitespace-nowrap">${delivery.date}</td>
                    <td class="px-4 py-3 whitespace-nowrap"><span class="order-status-badge ${delivery.statusClass}">${delivery.status}</span></td>
                `;
                deliveryHistoryBody.appendChild(row);
            });
        }
        
        // Initialize charts
        function initCharts() {
            const spendingCtx = document.getElementById('spendingChart').getContext('2d');
            new Chart(spendingCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{label: 'Monthly Spending ($)', data: [3200, 4100, 3800, 5200, 4800, 6200], backgroundColor: '#5D5CDE', borderColor: '#4F4FC7', borderWidth: 1}]
                },
                options: {responsive: true, maintainAspectRatio: false, scales: {y: {beginAtZero: true}}}
            });
            const categoryCtx = document.getElementById('categoryChart').getContext('2d');
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Grains', 'Vegetables', 'Fruits', 'Dairy', 'Meat'],
                    datasets: [{data: [42, 25, 15, 12, 6], backgroundColor: ['#5D5CDE', '#4F4FC7', '#3A3AA9', '#2C2C8C', '#1E1E6F'], borderWidth: 0}]
                },
                options: {responsive: true, maintainAspectRatio: false, plugins: {legend: {position: 'right'}}}
            });
        }
        
        // Update analytics
        function updateAnalytics() {
            alert("Analytics would update based on selected filters");
        }
        
        // Populate Suppliers View
        function populateSuppliersView() {
            const suppliersGrid = document.getElementById('suppliersGrid');
            const suppliers = [
                {name: "Green Valley Farms", location: "Local", rating: 4.8, products: "Grains, Vegetables", delivery: "1-2 days", contact: "contact@greenvalley.com"},
                {name: "AgriSupply Inc.", location: "Regional", rating: 4.5, products: "Dairy, Meat, Grains", delivery: "2-4 days", contact: "sales@agrisupply.com"},
                {name: "Organic Harvest Co.", location: "Local", rating: 4.9, products: "Fruits, Vegetables", delivery: "Same day", contact: "info@organicharvest.com"},
                {name: "Dairy Direct", location: "Regional", rating: 4.3, products: "Dairy products", delivery: "1-3 days", contact: "orders@dairydirect.com"},
                {name: "Berry Farms", location: "National", rating: 4.6, products: "Berries, Fruits", delivery: "3-5 days", contact: "hello@berryfarms.com"},
                {name: "Pure Grains Co.", location: "National", rating: 4.4, products: "Wheat, Rice, Oats", delivery: "4-7 days", contact: "support@puregrains.com"}
            ];
            suppliersGrid.innerHTML = '';
            suppliers.forEach(supplier => {
                const card = document.createElement('div');
                card.className = 'crop-card bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden';
                card.innerHTML = `
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-bold text-lg">${supplier.name}</h3>
                                <div class="flex items-center mt-1"><span class="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"><i class="fas fa-map-marker-alt mr-1"></i> ${supplier.location}</span></div>
                            </div>
                            <div class="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm"><i class="fas fa-star mr-1"></i> ${supplier.rating}</div>
                        </div>
                        <div class="mt-4 text-sm">
                            <div class="flex items-center mb-2"><i class="fas fa-seedling text-green-500 mr-2"></i><span>Products: ${supplier.products}</span></div>
                            <div class="flex items-center mb-2"><i class="fas fa-truck text-purple-500 mr-2"></i><span>Delivery: ${supplier.delivery}</span></div>
                            <div class="flex items-center"><i class="fas fa-envelope text-blue-500 mr-2"></i><span>${supplier.contact}</span></div>
                        </div>
                        <div class="mt-6 flex space-x-3">
                            <button class="flex-1 bg-primary text-white py-2 rounded-md hover:bg-secondary">Contact</button>
                            <button class="flex-1 border border-gray-300 dark:border-gray-600 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">View Products</button>
                        </div>
                    </div>
                `;
                suppliersGrid.appendChild(card);
            });
        }
        
        // Filter suppliers
        function filterSuppliers() {
            const searchTerm = document.getElementById('supplierSearch').value.toLowerCase();
            const locationFilter = document.getElementById('supplierLocationFilter').value;
            const ratingFilter = document.getElementById('supplierRatingFilter').value;
            const cards = document.querySelectorAll('#suppliersGrid > div');
            cards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const location = card.querySelector('.bg-blue-100').textContent.toLowerCase();
                const rating = parseFloat(card.querySelector('.bg-yellow-100').textContent.replace('★', '').trim());
                const matchesSearch = name.includes(searchTerm);
                const matchesLocation = locationFilter === 'all' || location.includes(locationFilter);
                const matchesRating = ratingFilter === 'all' || rating >= parseFloat(ratingFilter);
                card.style.display = (matchesSearch && matchesLocation && matchesRating) ? '' : 'none';
            });
        }
        
        // Filter products
        function filterProducts(category) {
            alert(`Products would be filtered by: ${category}`);
        }
        
        // Initialize the application
        window.addEventListener('DOMContentLoaded', () => {
            initDarkMode();
            setupNavigation();
            setupCart();
            setupEventListeners();
            populateOrdersView();
            populateSuppliersView();
        });