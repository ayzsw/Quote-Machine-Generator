const quoteText = document.getElementById('quoteText');
const authorName = document.getElementById('authorName');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const twitterBtn = document.getElementById('twitterBtn');

// Функция получения цитаты
async function getQuote() {
    // Добавляем параметр ?t=TIMESTAMP, чтобы обойти кэш браузера
    const url = `https://api.allorigins.win/raw?url=https://zenquotes.io/api/random?t=${new Date().getTime()}`;
    
    try {
        // Показываем, что идет загрузка
        newQuoteBtn.disabled = true;
        newQuoteBtn.style.opacity = '0.5';

        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        
        const text = data[0].q;
        const author = data[0].a;

        // Анимация: убираем старый текст
        quoteText.style.opacity = '0';
        
        setTimeout(() => {
            quoteText.innerText = text;
            authorName.innerText = author;
            
            // Ссылка для Twitter
            twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " - " + author)}`;
            
            // Возвращаем видимость
            quoteText.style.opacity = '1';
            newQuoteBtn.disabled = false;
            newQuoteBtn.style.opacity = '1';
        }, 300);

    } catch (error) {
        quoteText.innerText = "Упс! Ошибка соединения. Нажми еще раз.";
        console.error("Error fetching quote:", error);
        newQuoteBtn.disabled = false;
        newQuoteBtn.style.opacity = '1';
    }
}

// Слушатель событий для кнопки
newQuoteBtn.addEventListener('click', getQuote);

// Загрузка первой цитаты при старте
getQuote();
