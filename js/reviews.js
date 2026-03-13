const DEFAULT_REVIEWS = [
    {
        id: 1,
        name: 'Вася Пупкин',
        rating: 5,
        text: 'Колбаса огонь! Пацаны респектуют.',
        image: './img/vasya_pupkin.jpeg'
    },
    {
        id: 2,
        name: 'ТоСис',
        rating: 5,
        text: 'Наелся колбасы и жестко флексю. Всем советую.',
        image: './img/tosis.jpg'
    },
    {
        id: 3,
        name: 'Аноним',
        rating: 4,
        text: 'Нормально, но мало мяса.',
        image: './img/anonim.jpeg'
    },
    {
        id: 4,
        name: 'Данил К.',
        rating: 5,
        text: 'Лучшая колбаса в моей жизни. Одобрено.',
        image: './img/kolbasenko3.jpeg'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    let reviews = [];
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewForm = document.getElementById('review-form');
    const formError = document.getElementById('form-error');
    
    loadReviews();
    renderReviews();
    
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewer-name').value.trim();
        const comment = document.getElementById('reviewer-comment').value.trim();
        const image = document.getElementById('reviewer-image').value.trim();
        const rating = parseInt(document.getElementById('reviewer-rating').value);
        
        formError.style.display = 'none';
        formError.textContent = '';
        
        if (name.length < 2) {
            showError('Имя должно содержать минимум 2 символа');
            return;
        }
        
        if (name.length > 50) {
            showError('Имя не должно превышать 50 символов');
            return;
        }
        
        if (comment.length < 5) {
            showError('Отзыв должен содержать минимум 5 символов');
            return;
        }
        
        if (comment.length > 500) {
            showError('Отзыв не должен превышать 500 символов');
            return;
        }
        
        if (image && !isValidUrl(image)) {
            showError('Пожалуйста, введите корректный URL изображения');
            return;
        }
        
        const newReview = {
            id: Date.now(),
            name: name,
            rating: rating,
            text: comment,
            image: image || `https://via.placeholder.com/50/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${name.charAt(0)}`
        };
        
        reviews.unshift(newReview);
        saveReviews();
        renderReviews();
        reviewForm.reset();
        
        alert('Спасибо за ваш отзыв!');
    });
    
    function loadReviews() {
        try {
            const savedReviews = window.cookieModule.get('reviews');
            if (savedReviews) {
                reviews = JSON.parse(savedReviews);
            } else {
                reviews = [...DEFAULT_REVIEWS];
                saveReviews();
            }
        } catch (error) {
            console.error('Ошибка загрузки отзывов:', error);
            reviews = [...DEFAULT_REVIEWS];
        }
    }
    
    function saveReviews() {
        try {
            window.cookieModule.set('reviews', JSON.stringify(reviews), 30);
        } catch (error) {
            console.error('Ошибка сохранения отзывов:', error);
        }
    }
    
    function renderReviews() {
        if (!reviewsContainer) return;
        
        reviewsContainer.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <img src="${review.image}" alt="${escapeHtml(review.name)}" class="review-avatar" onerror="this.src='https://via.placeholder.com/50/cccccc/000000?text=?'">
                    <span class="review-author">${escapeHtml(review.name)}</span>
                </div>
                <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p class="review-text">${escapeHtml(review.text)}</p>
            </div>
        `).join('');
    }
    
    function showError(message) {
        formError.textContent = message;
        formError.style.display = 'block';
    }
    
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});