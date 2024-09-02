async function fetchBitcoinNews() {
    const newsListElement = document.getElementById('news-list');
    try {
        // Replace 'YOUR_NEWS_API_KEY' with your actual NewsAPI key
        const response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=YOUR_NEWS_API_KEY');
        const data = await response.json();

        // Clear the loading text
        newsListElement.innerHTML = '';

        // Check if news articles are returned
        if (data.articles && data.articles.length > 0) {
            // Loop through the articles and create list items
            data.articles.forEach(article => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                newsListElement.appendChild(listItem);
            });
        } else {
            newsListElement.innerHTML = '<li>No news available at the moment.</li>';
        }
    } catch (error) {
        newsListElement.innerHTML = '<li>Error fetching news.</li>';
        console.error('Error fetching Bitcoin news:', error);
    }
}

// Function to refresh the Bitcoin price

// Fetch current price, historical data, and news when the page loads
fetchBitcoinNews();

// Add event listener to refresh button
document.getElementById('refresh-button').addEventListener('click', refreshPrice);