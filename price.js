// script.js

// Function to fetch Bitcoin price from CoinGecko API
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

// Function to refresh the Bitcoin price
function refreshPrice() {
    fetchBitcoinPrice();
}

// Fetch the price when the page loads
fetchBitcoinPrice();

// Add event listener to refresh button
document.getElementById('refresh-button').addEventListener('click', refreshPrice);
