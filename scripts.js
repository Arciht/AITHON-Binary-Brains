// script.js

// Fetch and display the current Bitcoin price
async function fetchBitcoinPrice() {
    const priceElement = document.querySelector('#bitcoin-price p');
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        priceElement.textContent = `$${data.bitcoin.usd}`;
    } catch (error) {
        priceElement.textContent = 'Error fetching price.';
        console.error('Error fetching Bitcoin price:', error);
    }
}

// Fetch and display the latest Bitcoin news
async function fetchBitcoinNews() {
    const newsElement = document.querySelector('#bitcoin-news ul');
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=YOUR_NEWS_API_KEY');
        const data = await response.json();
        newsElement.innerHTML = data.articles.map(article => `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`).join('');
    } catch (error) {
        newsElement.innerHTML = '<li>Error fetching news.</li>';
        console.error('Error fetching Bitcoin news:', error);
    }
}

// Call functions to fetch data
fetchBitcoinPrice();
fetchBitcoinNews();

// script.js

// Quiz data
const quizQuestions = [
    {
        question: "What is Bitcoin?",
        options: ["A cryptocurrency", "A stock", "A type of metal", "A brand of computers"],
        answer: "A cryptocurrency"
    },
    {
        question: "Who created Bitcoin?",
        options: ["Elon Musk", "Satoshi Nakamoto", "Vitalik Buterin", "Jeff Bezos"],
        answer: "Satoshi Nakamoto"
    }
    // Add more questions as needed
];

// Display the quiz
function displayQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    let quizContent = '';

    quizQuestions.forEach((q, index) => {
        quizContent += `<div class="quiz-question">
            <p>${q.question}</p>
            ${q.options.map(option => `<button onclick="checkAnswer(${index}, '${option}')">${option}</button>`).join('')}
        </div>`;
    });

    quizContainer.innerHTML = quizContent;
}

// Check the quiz answer
function checkAnswer(questionIndex, selectedOption) {
    const question = quizQuestions[questionIndex];
    if (selectedOption === question.answer) {
        alert('Correct!');
    } else {
        alert('Wrong!');
    }
}

// Display the quiz
displayQuiz();
