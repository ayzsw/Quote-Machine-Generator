const quoteText = document.getElementById('quoteText');
const authorName = document.getElementById('authorName');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const twitterBtn = document.getElementById('twitterBtn');

// Блокируем переход по кнопке твиттера (чтобы не переходила)
twitterBtn.addEventListener('click', (e) => {
    e.preventDefault();
});

async function getQuote() {
    // Используем другой API (Quotable), он выдает случайные цитаты без повторов
    // Добавляем случайное число в конец для 100% обхода кэша
    const url = `https://api.quotable.io/random?nocache=${Math.random()}`;
    
    try {
        // Визуальный эффект нажатия
        newQuoteBtn.style.transform = 'scale(0.8)';
        
        const response = await fetch(url);
        
        if (!response.ok) {
            // Если первый API не ответил, используем запасной (Advice Slip)
            throw new Error('API Error');
        }

        const data = await response.json();
        
        // Плавная смена текста
        quoteText.style.opacity = '0';
        authorName.style.opacity = '0';

        setTimeout(() => {
            quoteText.innerText = data.content; // Сама цитата
            authorName.innerText = data.author;  // Автор
            
            quoteText.style.opacity = '1';
            authorName.style.opacity = '1';
            newQuoteBtn.style.transform = 'scale(1)';
        }, 300);

    } catch (error) {
        // Если основной API упал (такое бывает из-за санкций или перегрузки), 
        // используем второй вариант:
        fetch('https://api.adviceslip.com/advice')
            .then(res => res.json())
            .then(data => {
                quoteText.innerText = data.slip.advice;
                authorName.innerText = "Unknown Advisor";
                quoteText.style.opacity = '1';
                authorName.style.opacity = '1';
            });
        console.log("Запасной вариант загружен");
    }
}

// Слушатель событий
newQuoteBtn.addEventListener('click', getQuote);

// Загрузка при старте
getQuote();

// Загрузка первой цитаты при старте
getQuote();
