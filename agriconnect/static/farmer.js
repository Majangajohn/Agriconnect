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
        
        // Navigation functionality
        function setupNavigation() {
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
                if (selectedView) {
                    selectedView.classList.remove('hidden');
                }
            }
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // User menu toggle
            document.getElementById('userMenuBtn').addEventListener('click', () => {
                document.getElementById('userMenu').classList.toggle('hidden');
            });
            
            // Notification button
            document.getElementById('notificationBtn').addEventListener('click', () => {
                document.getElementById('notificationsPanel').classList.toggle('hidden');
            });
            
            // New order modal
            document.getElementById('newOrderBtn').addEventListener('click', openNewOrderModal);
            document.getElementById('quickNewOrder').addEventListener('click', openNewOrderModal);
            
            document.getElementById('closeNewOrderModal').addEventListener('click', closeNewOrderModal);
            document.getElementById('cancelOrderBtn').addEventListener('click', closeNewOrderModal);
            
            // View order buttons
            document.querySelectorAll('.view-order-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    showToast('Opening order details...', 'info');
                });
            });
            
            // Print order buttons
            document.querySelectorAll('.print-order-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    showToast('Printing order details...', 'info');
                });
            });
            
            // Order status filter
            document.getElementById('orderStatusFilter').addEventListener('change', function() {
                filterOrders(this.value);
            });
            
            // Order search
            document.getElementById('orderSearch').addEventListener('input', function() {
                searchOrders(this.value);
            });
            
            // Inventory category filter
            document.getElementById('inventoryCategoryFilter').addEventListener('change', function() {
                filterInventory(this.value);
            });
            
            // Inventory search
            document.getElementById('inventorySearch').addEventListener('input', function() {
                searchInventory(this.value);
            });
            
            // Close panels when clicking outside
            document.addEventListener('click', (event) => {
                const userMenu = document.getElementById('userMenu');
                const userMenuBtn = document.getElementById('userMenuBtn');
                
                if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
                    userMenu.classList.add('hidden');
                }
                
                const notificationsPanel = document.getElementById('notificationsPanel');
                const notificationBtn = document.getElementById('notificationBtn');
                
                if (!notificationBtn.contains(event.target) && !notificationsPanel.contains(event.target)) {
                    notificationsPanel.classList.add('hidden');
                }
                
                const newOrderModal = document.getElementById('newOrderModal');
                const closeNewOrderModal = document.getElementById('closeNewOrderModal');
                
                if (newOrderModal && !newOrderModal.contains(event.target)) {
                    newOrderModal.classList.add('hidden');
                }
            });
        }
        
        // Filter orders by status
        function filterOrders(status) {
            const rows = document.querySelectorAll('#ordersTableBody tr');
            rows.forEach(row => {
                if (status === 'all' || row.getAttribute('data-status') === status) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        }
        
        // Search orders
        function searchOrders(query) {
            const rows = document.querySelectorAll('#ordersTableBody tr');
            const lowerQuery = query.toLowerCase();
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(lowerQuery)) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        }
        
        // Filter inventory by category
        function filterInventory(category) {
            const rows = document.querySelectorAll('#inventoryTableBody tr');
            rows.forEach(row => {
                if (category === 'all' || row.getAttribute('data-category') === category) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        }
        
        // Search inventory
        function searchInventory(query) {
            const rows = document.querySelectorAll('#inventoryTableBody tr');
            const lowerQuery = query.toLowerCase();
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(lowerQuery)) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        }

        // Show toast notification
        function showToast(message, type = 'success', duration = 3000) {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            
            let bgColor = 'bg-green-500';
            if (type === 'error') bgColor = 'bg-red-500';
            if (type === 'warning') bgColor = 'bg-yellow-500';
            if (type === 'info') bgColor = 'bg-blue-500';
            
            toast.className = `${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-between max-w-sm`;
            toast.innerHTML = `
                <span>${message}</span>
                <button class="text-white ml-4">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            toastContainer.appendChild(toast);
            
            // Auto-remove toast
            setTimeout(() => {
                toast.remove();
            }, duration);
            
            // Manual close
            toast.querySelector('button').addEventListener('click', () => {
                toast.remove();
            });
        }
        
        // Initialize product selection and pricing
        function initProductSelection() {
            const productSelect = document.getElementById('product');
            const unitPriceInput = document.getElementById('unitPrice');
            const totalPriceInput = document.getElementById('totalPrice');
            const quantityInput = document.getElementById('quantity');
            
            // Update price when product changes
            productSelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                const price = selectedOption.getAttribute('data-price') || '0.00';
                unitPriceInput.value = `$${price}`;
                updateTotalPrice();
            });
            
            // Update price when quantity changes
            quantityInput.addEventListener('input', updateTotalPrice);
            
            function updateTotalPrice() {
                const price = parseFloat(unitPriceInput.value.replace('$', '')) || 0;
                const quantity = parseInt(quantityInput.value) || 0;
                const total = price * quantity;
                totalPriceInput.value = `$${total.toFixed(2)}`;
            }
            
            // Set initial price
            updateTotalPrice();
            
            // Set min date for delivery date
            const today = new Date();
            const minDate = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
            document.getElementById('deliveryDate').min = minDate;
        }
        
        // Form validation and submission
        function setupOrderForm() {
            const form = document.getElementById('newOrderForm');
            const submitBtn = document.getElementById('submitOrderBtn');
            
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Validate form
                const isValid = validateForm();
                if (!isValid) return;
                
                // Show loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Hide modal
                closeNewOrderModal();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showToast('Order placed successfully!', 'success');
                
                // Switch to orders view
                setTimeout(() => {
                    switchView('orders');
                    addNewOrderToTable();
                }, 1000);
            });
            
            function validateForm() {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });
                
                // Validate delivery date
                const deliveryDate = document.getElementById('deliveryDate');
                if (deliveryDate.value) {
                    const selectedDate = new Date(deliveryDate.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selectedDate <= today) {
                        deliveryDate.classList.add('is-invalid');
                        deliveryDate.nextElementSibling.textContent = 'Date must be in the future';
                        isValid = false;
                    } else {
                        deliveryDate.classList.remove('is-invalid');
                    }
                }
                
                return isValid;
            }
        }
        
        // Add new order to the orders table
        function addNewOrderToTable() {
            const tableBody = document.getElementById('ordersTableBody');
            const form = document.getElementById('newOrderForm');
            
            // Get form values
            const product = document.getElementById('product').selectedOptions[0].text;
            const quantity = document.getElementById('quantity').value;
            const total = document.getElementById('totalPrice').value;
            const status = 'pending';
            
            // Generate random order ID
            const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            
            // Create new row
            const newRow = document.createElement('tr');
            newRow.className = 'hover:bg-gray-50 dark:hover:bg-gray-800';
            newRow.setAttribute('data-status', status);
            newRow.innerHTML = `
                <td class="px-4 py-3 whitespace-nowrap">
                    <div class="font-medium">${orderId}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                    <div>${new Date().toLocaleDateString()}</div>
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mr-3">
                            <i class="fas fa-seedling text-green-500"></i>
                        </div>
                        <div>
                            <div class="font-medium">${product}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">Qty: ${quantity}</div>
                        </div>
                    </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                    <div class="font-medium">${total}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                    <span class="status-badge bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                        Pending
                    </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">
                    <button class="view-order-btn text-primary hover:text-secondary mr-2">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="print-order-btn text-blue-500 hover:text-blue-700">
                        <i class="fas fa-print"></i>
                    </button>
                </td>
            `;
            
            // Add to the top of the table
            tableBody.insertBefore(newRow, tableBody.firstChild);
            
            // Reset form
            form.reset();
        }
        
        function openNewOrderModal() {
            document.getElementById('newOrderModal').classList.remove('hidden');
            
            // Set default date (tomorrow)
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedDate = tomorrow.toISOString().split('T')[0];
            document.getElementById('deliveryDate').value = formattedDate;
            
            // Reset validation
            const invalidFields = document.querySelectorAll('.is-invalid');
            invalidFields.forEach(field => field.classList.remove('is-invalid'));
        }
        
        function closeNewOrderModal() {
            document.getElementById('newOrderModal').classList.add('hidden');
        }

        // Initialize the application
        window.addEventListener('DOMContentLoaded', () => {
            initDarkMode();
            setupNavigation();
            setupEventListeners();
            initProductSelection();
            setupOrderForm();
        });