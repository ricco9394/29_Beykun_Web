let lastCreatedProductId = null;

const outputContainer = document.getElementById('api-output');

function showLoading(message) {
    outputContainer.innerHTML = `
        <div class="loading-spinner">
            🥩 ${message}...<br>
            <small>(Даня Колбасенко стучится в API)</small>
        </div>`;
}

function showError(message) {
    let cleanMessage = message;
    if (message.includes("pattern") || message.includes("JSON")) {
        cleanMessage = "Сервер прислал что-то странное. Попробуй еще раз!";
    }
    
    outputContainer.innerHTML = `
        <div class="error-message">
            ⚠️ ТРАГЕДИЯ! ${cleanMessage}<br>
            <small>Наверное, коты перегрызли кабель.</small>
        </div>`;
}

function createResultCard(method, title, contentHtml, apiName) {
    const statusClass = `status-${method.toLowerCase()}`;
    const methodNames = {
        'GET': 'ПОЛУЧЕНО',
        'POST': 'СОЗДАНО',
        'PUT': 'ОБНОВЛЕНО',
        'DELETE': 'УДАЛЕНО'
    };
    
    return `
        <div class="api-card">
            <span class="api-status ${statusClass}">${methodNames[method] || method}</span>
            <h4>🌭 ${title}</h4>
            <p style="font-size: 10px; color: gray;">Источник: ${apiName}</p>
            <div class="api-data-content">${contentHtml}</div>
        </div>
    `;
}

async function getSafeJson(response) {
    const text = await response.text();
    try {
        return text ? JSON.parse(text) : {};
    } catch (e) {
        console.error("Ошибка парсинга JSON:", text);
        throw new Error("Сервер вернул не JSON");
    }
}

async function apiGetJoke() {
    showLoading('Ищем ржачку среди поваров');
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) throw new Error('Повара молчат как рыбы');
        
        const data = await getSafeJson(response);
        
        const setup = data.setup || "Технолог забыл вопрос...";
        const punchline = data.punchline || "Но ответ: просто ешьте колбасу!";
        const type = data.type || "Секретный";

        const jokeHtml = `
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Вопрос от технолога:</strong><br> "${setup}"</p>
            <p style="font-size: 18px; color: red; font-weight: bold;">
                🔥 ОТВЕТ (СЕКРЕТНЫЙ ИНГРЕДИЕНТ):<br> 
                "${punchline}"
            </p>
            <p style="text-align: right; font-style: italic;">(Тип: ${type})</p>
        `;
        
        outputContainer.innerHTML = createResultCard('GET', 'Свежая байка из цеха', jokeHtml, 'Official Joke API');
        
    } catch (error) {
        showError(error.message);
    }
}

async function apiGetCatFact() {
    showLoading('Спрашиваем у котов про колбасу');
    try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) throw new Error('Коты убежали за колбасой');
        
        const data = await getSafeJson(response);
        const fact = data.fact || "Коты молчат. Видимо, съели все факты.";

        const factHtml = `
            <p><strong>🐱 Научный факт от кота Барсика:</strong></p>
            <blockquote style="border-left: 4px solid red; padding-left: 10px; font-style: italic;">
                "${fact}"
            </blockquote>
            <p style="color: green; font-weight: bold;">
                👨‍🍳 Комментарий Дани:<br>
                "Это явно значит, что коту не хватает нашей колбасы! Срочно отправить ему батон!"
            </p>
        `;
        
        outputContainer.innerHTML = createResultCard('GET', 'Кошачья правда жизни', factHtml, 'Cat Fact API');
        
    } catch (error) {
        showError(error.message);
    }
}

async function apiPostOrder() {
    showLoading('Отправляем заказ на завод (FakeStore)');
    try {
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
        
        const newProduct = {
            title: `Колбаса 'Даня Супер' (Партия #${randomNum})`,
            price: 999.99,
            description: `Свежая партия, создана только что! Уникальный номер: ${randomNum}`,
            category: "meat-products",
            image: "https://via.placeholder.com/150/ff0000/ffffff?text=NEW"
        };

        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) throw new Error('Завод отказался варить колбасу');
        
        const data = await getSafeJson(response);
        
        lastCreatedProductId = data.id;

        let ratingHtml = "⭐ Рейтинг: <b>Нет данных</b>";
        if (data.rating && typeof data.rating === 'object') {
            const rate = data.rating.rate !== undefined ? data.rating.rate : "N/A";
            const count = data.rating.count !== undefined ? data.rating.count : "0";
            ratingHtml = `⭐ Рейтинг: <b>${rate}</b> (${count} отзывов)`;
        }

        const successHtml = `
            <p>✅ <strong>НОВАЯ ПАРТИЯ СОЗДАНА!</strong></p>
            <ul style="text-align: left;">
                <li>🆔 Ваш ID партии: <b style="color:red; font-size:18px;">${data.id}</b></li>
                <li>🏷️ Название: ${data.title || 'Без названия'}</li>
                <li>💰 Цена за кг: ${data.price ? data.price.toFixed(2) : '0'}$</li>
                <li>${ratingHtml}</li>
            </ul>
            <div style="margin-top: 10px; padding: 10px; border: 2px dashed blue; background: #e3f2fd; color: #0d47a1; border-radius: 5px;">
                💡 <b>Подсказка:</b> Теперь нажми <u>"Списать брак"</u>, чтобы удалить эту партию!
            </div>
        `;
        
        outputContainer.innerHTML = createResultCard('POST', 'Успешный запуск производства', successHtml, 'Fake Store API');
        
    } catch (error) {
        showError(error.message);
    }
}

async function apiPutRecipe() {
    showLoading('Обновляем рецепт товара №1');
    try {
        const updatedProduct = {
            id: 1,
            title: "Колбаса 'Императорская' (ГОСТ 2026)",
            price: 1500.00,
            description: "ОБНОВЛЕННЫЙ РЕЦЕПТ! Теперь содержит настоящую любовь и немного магии.",
            category: "premium-meat",
            image: "https://via.placeholder.com/150/gold/000000?text=GOLD"
        };

        const response = await fetch('https://fakestoreapi.com/products/1', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) throw new Error('Технолог забастовал');
        
        const data = await getSafeJson(response);
        
        const safeTitle = data.title || "Неизвестный продукт";
        const safePrice = data.price ? data.price.toFixed(2) : "0.00";
        const safeDesc = data.description || "Описание утеряно";
        const safeCat = data.category || "unknown";

        const recipeHtml = `
            <p>🧪 <strong>РЕЦЕПТ УСПЕШНО ОБНОВЛЕН!</strong></p>
            <p>Новое название: <b>${safeTitle}</b></p>
            <p>Новая цена: <b>${safePrice}$</b></p>
            <p>Новое описание:<br> <i>"${safeDesc}"</i></p>
            <p>Категория: <b>${safeCat}</b></p>
            <hr>
            <p style="color: green;">✅ Сервер вернул обновленные данные. ГОСТ принят!</p>
        `;
        
        outputContainer.innerHTML = createResultCard('PUT', 'Рецепт будущего', recipeHtml, 'Fake Store API');
        
    } catch (error) {
        showError(error.message);
    }
}

async function apiDeleteBatch() {
    if (!lastCreatedProductId) {
        showError("❌ Нет товара для удаления! Сначала нажмите <b>'Заказать фуру'</b>, чтобы создать партию.");
        return;
    }

    const targetId = lastCreatedProductId;
    showLoading(`Уничтожаем ВАШУ партию ID: ${targetId}...`);
    
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${targetId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            if (response.status === 404) {
                lastCreatedProductId = null; 
                throw new Error(`Товар с ID ${targetId} не найден! Возможно, он уже был удален или исчез со склада.`);
            } else {
                throw new Error(`Ошибка сервера (Статус ${response.status}): Не удалось удалить товар.`);
            }
        }
        
        const data = await getSafeJson(response);
        
        lastCreatedProductId = null;

        const delId = data.id || targetId;
        const delTitle = data.title ? `<s>${data.title}</s>` : "<s>Ваша колбаса</s>";
        const delPrice = data.price ? `<s>${data.price}$</s>` : "<s>Цена</s>";

        const deleteHtml = `
            <p style="font-size: 20px; text-align: center;">💥 <b>БА-БАХ!</b> 💥</p>
            <p>Ваша партия (ID: <b>${delId}</b>) <b>УСПЕШНО УНИЧТОЖЕНА!</b></p>
            <ul style="text-align: left;">
                <li>Название: ${delTitle}</li>
                <li>Цена: ${delPrice}</li>
            </ul>
            <p style="color: green; font-weight: bold; border: 2px solid green; padding: 5px;">
                ✅ Вы удалили именно тот товар, который создали!
            </p>
            <hr>
            <p>🕊️ Помянем вашу колбаску...</p>
            <p style="font-size: 12px; color: gray;">Теперь создайте новую партию, чтобы попробовать снова.</p>
        `;
        
        outputContainer.innerHTML = createResultCard('DELETE', 'Ликвидация последствий', deleteHtml, 'Fake Store API');
        
    } catch (error) {
        showError(error.message);
    }
}