// script.js

// Function to fetch current Bitcoin price from CoinGecko API
async function fetchBitcoinPrice() {
    const priceElement = document.getElementById('price');
    try {
        // Fetch data from CoinGecko API
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();

        // Display the price in the HTML element
        priceElement.textContent = `$${data.bitcoin.usd}`;
    } catch (error) {
        // Handle errors by displaying an error message
        priceElement.textContent = 'Error fetching price.';
        console.error('Error fetching Bitcoin price:', error);
    }
}

// Function to fetch historical Bitcoin price trend from CoinGecko API
async function fetchBitcoinHistoricalData() {
    try {
        // Fetch historical price data from CoinGecko API
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365');
        const data = await response.json();
        
        // Prepare data for the chart
        const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
        const prices = data.prices.map(price => price[1]);

        // Create chart
        const ctx = document.getElementById('historical-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: prices,
                    borderColor: '#ff7300',
                    backgroundColor: 'rgba(255, 115, 0, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `$${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'month'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price (USD)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching Bitcoin historical data:', error);
    }
}

// Function to refresh the Bitcoin price
function refreshPrice() {
    fetchBitcoinPrice();
}

// Fetch current price and historical data when the page loads
fetchBitcoinPrice();
fetchBitcoinHistoricalData();

// Add event listener to refresh button
document.getElementById('refresh-button').addEventListener('click', refreshPrice);
