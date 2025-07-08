        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Market Chart Initialization
            const marketCtx = document.getElementById('marketChart').getContext('2d');
            const cropSelect = document.getElementById('cropSelect');
            const timeframeSelect = document.getElementById('timeframeSelect');

            // Sample data for the chart
            const marketData = {
                'maize': {
                    '1month': {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        actual: [220, 230, 235, 240],
                        projected: [null, null, null, 240, 245, 250, 258]
                    },
                    '3months': {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        actual: [200, 210, 220, 230, 235, 240],
                        projected: [null, null, null, null, null, 240, 245, 250, 258]
                    },
                    '6months': {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        actual: [190, 200, 210, 220, 230, 235, 240],
                        projected: [null, null, null, null, null, null, 240, 245, 250, 258, 265, 270]
                    },
                    '1year': {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                        actual: [180, 185, 190, 200, 210, 220, 230, 235, 240],
                        projected: [null, null, null, null, null, null, null, null, 240, 245, 250, 258, 265, 270, 275]
                    }
                },
                'rice': {
                    '6months': {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        actual: [390, 395, 400, 405, 410, 415, 420],
                        projected: [null, null, null, null, null, null, 420, 425, 430, 435, 440, 445]
                    }
                },
                'wheat': {
                    '6months': {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        actual: [290, 295, 300, 305, 310, 315, 320],
                        projected: [null, null, null, null, null, null, 320, 325, 330, 335, 340, 345]
                    }
                },
                'soybean': {
                    '6months': {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        actual: [450, 460, 470, 480, 490, 500, 510],
                        projected: [null, null, null, null, null, null, 510, 515, 520, 525, 530, 535]
                    }
                },
                'coffee': {
                    '6months': {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        actual: [4300, 4350, 4400, 4430, 4460, 4480, 4500],
                        projected: [null, null, null, null, null, null, 4500, 4550, 4600, 4650, 4700, 4750]
                    }
                }
            };

            let marketChart;

            function updateMarketChart() {
                const crop = cropSelect.value;
                const timeframe = timeframeSelect.value;
                
                // Default to 6months if the selected timeframe isn't available
                const selectedTimeframe = marketData[crop][timeframe] || marketData[crop]['6months'];
                
                if (marketChart) {
                    marketChart.destroy();
                }

                marketChart = new Chart(marketCtx, {
                    type: 'line',
                    data: {
                        labels: selectedTimeframe.labels,
                        datasets: [
                            {
                                label: 'Actual Price ($/ton)',
                                data: selectedTimeframe.actual,
                                borderColor: '#16a34a',
                                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                borderWidth: 2,
                                tension: 0.3,
                                fill: true
                            },
                            {
                                label: 'Projected Price ($/ton)',
                                data: selectedTimeframe.projected,
                                borderColor: '#f59e0b',
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                tension: 0.3,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    usePointStyle: true,
                                    boxWidth: 8
                                }
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false
                            }
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'Price ($/ton)'
                                },
                                beginAtZero: false
                            }
                        }
                    }
                });
            }

            cropSelect.addEventListener('change', updateMarketChart);
            timeframeSelect.addEventListener('change', updateMarketChart);

            // Initialize with default values
            updateMarketChart();

            // Farming Advice Tab Toggling
            const cropTabs = document.querySelectorAll('#cropTabs a');
            const cropTabContents = document.querySelectorAll('#cropTabContent > div');

            cropTabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove 'active' class from all tabs and tab contents
                    cropTabs.forEach(t => {
                        t.classList.remove('active');
                        t.setAttribute('aria-selected', 'false');
                        t.classList.remove('border-primary-600', 'text-primary-600', 'dark:border-primary-500', 'dark:text-primary-500');
                    });
                    
                    cropTabContents.forEach(content => {
                        content.classList.add('hidden');
                        content.classList.remove('active');
                    });
                    
                    // Add 'active' class to current tab and tab content
                    this.classList.add('active');
                    this.setAttribute('aria-selected', 'true');
                    this.classList.add('border-primary-600', 'text-primary-600', 'dark:border-primary-500', 'dark:text-primary-500');
                    
                    const targetId = this.getAttribute('href');
                    document.querySelector(targetId).classList.remove('hidden');
                    document.querySelector(targetId).classList.add('active');
                });
            });

            // Initialize the first tab as active
            cropTabs[0].classList.add('border-primary-600', 'text-primary-600', 'dark:border-primary-500', 'dark:text-primary-500');

            // Get Farming Advice Button Functionality
            const getAdviceBtn = document.getElementById('getAdviceBtn');
            const adviceResults = document.getElementById('adviceResults');
            const locationInput = document.getElementById('location');

            getAdviceBtn.addEventListener('click', function() {
                if (locationInput.value.trim() === '') {
                    alert('Please enter a location');
                    return;
                }

                // Show loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Loading...';
                this.disabled = true;

                // Simulate API request
                setTimeout(() => {
                    // Hide loading state
                    this.innerHTML = 'Get Farming Advice';
                    this.disabled = false;

                    // Show results
                    adviceResults.classList.remove('hidden');

                    // Populate weather data
                    document.getElementById('weatherDetails').innerHTML = `
                        <div class="mb-4">
                            <h4 class="font-medium text-gray-700 dark:text-gray-300">Current Season: Rainy Season</h4>
                            <p class="text-gray-600 dark:text-gray-400">April to October</p>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400">Avg. Rainfall</p>
                                <p class="font-medium text-gray-700 dark:text-gray-300">800-1200mm/year</p>
                            </div>
                            <div>
                                <p class="text-gray-600 dark:text-gray-400">Avg. Temperature</p>
                                <p class="font-medium text-gray-700 dark:text-gray-300">22-28°C</p>
                            </div>
                            <div>
                                <p class="text-gray-600 dark:text-gray-400">Humidity</p>
                                <p class="font-medium text-gray-700 dark:text-gray-300">65-85%</p>
                            </div>
                            <div>
                                <p class="text-gray-600 dark:text-gray-400">Sunshine Hours</p>
                                <p class="font-medium text-gray-700 dark:text-gray-300">5-7 hours/day</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <p class="text-sm text-gray-600 dark:text-gray-400">* Based on historical data for ${locationInput.value}</p>
                        </div>
                    `;

                    // Populate soil data
                    document.getElementById('soilDetails').innerHTML = `
                        <div class="mb-4">
                            <h4 class="font-medium text-gray-700 dark:text-gray-300">Soil Type: Clay Loam</h4>
                            <p class="text-gray-600 dark:text-gray-400">Good water retention, medium drainage</p>
                        </div>
                        <div class="space-y-3">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Nitrogen (N)</span>
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div class="bg-primary-600 h-2 rounded-full" style="width: 60%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Phosphorus (P)</span>
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">High</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div class="bg-primary-600 h-2 rounded-full" style="width: 80%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Potassium (K)</span>
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div class="bg-primary-600 h-2 rounded-full" style="width: 55%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">pH Level</span>
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">6.2 (Slightly Acidic)</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div class="bg-primary-600 h-2 rounded-full" style="width: 62%"></div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Populate crop recommendations
                    document.getElementById('cropRecommendations').innerHTML = `
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-700 dark:text-gray-300">Top Food Crops</span>
                            <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">High Compatibility</span>
                        </div>
                        <div class="pl-4 border-l-2 border-primary-500">
                            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400">
                                <li>Maize</li>
                                <li>Beans</li>
                                <li>Sweet Potatoes</li>
                                <li>Cassava</li>
                            </ul>
                        </div>
                        <div class="flex items-center justify-between mt-4">
                            <span class="font-medium text-gray-700 dark:text-gray-300">Top Cash Crops</span>
                            <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">High Compatibility</span>
                        </div>
                        <div class="pl-4 border-l-2 border-primary-500">
                            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400">
                                <li>Coffee</li>
                                <li>Soybeans</li>
                                <li>Groundnuts</li>
                                <li>Sunflower</li>
                            </ul>
                        </div>
                    `;

                    // Populate food crops details
                    document.getElementById('foodCropsDetails').innerHTML = `
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Maize</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">High Yield Potential</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Season:</span> April - August</li>
                                    <li><span class="font-medium">Maturity Time:</span> 90-120 days</li>
                                    <li><span class="font-medium">Expected Yield:</span> 4-6 tons/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $240/ton</li>
                                    <li><span class="font-medium">Local Demand:</span> High</li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Ideal for the current soil conditions. Consider supplementing with nitrogen fertilizer for optimal yields.</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Beans</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">Quick Maturity</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Season:</span> March - June</li>
                                    <li><span class="font-medium">Maturity Time:</span> 60-90 days</li>
                                    <li><span class="font-medium">Expected Yield:</span> 1.5-2 tons/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $700/ton</li>
                                    <li><span class="font-medium">Local Demand:</span> Very High</li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Excellent as an intercrop with maize. Improves soil nitrogen content for subsequent plantings.</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Sweet Potatoes</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">Drought Resistant</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Season:</span> Year-round</li>
                                    <li><span class="font-medium">Maturity Time:</span> 3-5 months</li>
                                    <li><span class="font-medium">Expected Yield:</span> 10-15 tons/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $200/ton</li>
                                    <li><span class="font-medium">Local Demand:</span> Medium</li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Adaptable to various soil conditions, resistant to dry spells that may occur in your region.</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Cassava</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">Long Shelf Life</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Season:</span> Year-round</li>
                                    <li><span class="font-medium">Maturity Time:</span> 9-12 months</li>
                                    <li><span class="font-medium">Expected Yield:</span> 20-25 tons/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $180/ton</li>
                                    <li><span class="font-medium">Local Demand:</span> Medium-High</li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Highly tolerant to poor soil conditions and drought. Can remain in the ground as storage until needed.</p>
                            </div>
                        </div>
                    `;

                    // Populate cash crops details
                    document.getElementById('cashCropsDetails').innerHTML = `
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Coffee</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">High Market Value</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Type:</span> Perennial</li>
                                    <li><span class="font-medium">First Harvest:</span> 3-4 years</li>
                                    <li><span class="font-medium">Expected Yield:</span> 0.5-1 ton/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $4,500/ton</li>
                                    <li><span class="font-medium">Market Projection:</span> <span class="text-green-600 dark:text-green-400">↑ Rising (5-7%)</span></li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Long-term investment with high returns. Shade-grown coffee can be intercropped with banana.</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Soybeans</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">Growing Demand</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Season:</span> April - August</li>
                                    <li><span class="font-medium">Maturity Time:</span> 100-120 days</li>
                                    <li><span class="font-medium">Expected Yield:</span> 2-3 tons/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $510/ton</li>
                                    <li><span class="font-medium">Market Projection:</span> <span class="text-green-600 dark:text-green-400">↑ Rising (3-5%)</span></li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">High protein content makes it valuable for food processing and animal feed industries.</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Groundnuts</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">Soil Enriching</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Season:</span> March - July</li>
                                    <li><span class="font-medium">Maturity Time:</span> 90-110 days</li>
                                    <li><span class="font-medium">Expected Yield:</span> 1-1.5 tons/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $850/ton</li>
                                    <li><span class="font-medium">Market Projection:</span> <span class="text-yellow-600 dark:text-yellow-400">→ Stable</span></li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Excellent for crop rotation as it fixes nitrogen in the soil. Multiple market opportunities.</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h5 class="text-lg font-medium text-gray-800 dark:text-gray-200">Sunflower</h5>
                                    <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">Drought Tolerant</span>
                                </div>
                                <ul class="space-y-2 text-gray-600 dark:text-gray-400 mb-3">
                                    <li><span class="font-medium">Growing Season:</span> February - May</li>
                                    <li><span class="font-medium">Maturity Time:</span> 80-100 days</li>
                                    <li><span class="font-medium">Expected Yield:</span> 1.5-2 tons/hectare</li>
                                    <li><span class="font-medium">Market Value:</span> $600/ton</li>
                                    <li><span class="font-medium">Market Projection:</span> <span class="text-green-600 dark:text-green-400">↑ Rising (2-4%)</span></li>
                                </ul>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Oil extraction creates value-added opportunity. Bird protection measures recommended during flowering.</p>
                            </div>
                        </div>
                    `;

                    // Scroll to results
                    window.scrollTo({
                        top: adviceResults.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 2000);
            });
        });