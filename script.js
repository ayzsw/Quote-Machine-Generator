const quoteText = document.getElementById('quoteText');
const authorName = document.getElementById('authorName');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const twitterBtn = document.getElementById('twitterBtn');

// Функция получения цитаты
async function getQuote() {
    // Используем API для случайных цитат
    const url = "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const text = data[0].q;
        const author = data[0].a;

        // Добавляем текст на страницу с анимацией
        quoteText.classList.remove('fade-in');
        void quoteText.offsetWidth; // Магия для перезапуска анимации
        
        quoteText.innerText = text;
        authorName.innerText = author;
        
        quoteText.classList.add('fade-in');

        // Ссылка для Twitter
        twitterBtn.href = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
        
    } catch (error) {
        quoteText.innerText = "Упс! Не удалось загрузить цитату. Попробуйте еще раз.";
        console.error("Error fetching quote:", error);
    }
}

// Слушатель событий для кнопки
newQuoteBtn.addEventListener('click', getQuote);

// Загрузка первой цитаты при старте
getQuote();