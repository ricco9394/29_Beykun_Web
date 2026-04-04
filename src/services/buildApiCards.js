import { escapeHtml } from '../utils/escapeHtml';

export function buildJokeResultCard(data) {
  const setup = data.setup ?? 'Технолог забыл вопрос...';
  const punchline = data.punchline ?? 'Но ответ: просто ешьте колбасу!';
  const type = data.type ?? 'Секретный';
  return {
    method: 'GET',
    title: 'Свежая байка из цеха',
    apiName: 'Official Joke API',
    blocks: [
      {
        type: 'paragraph',
        text: `Вопрос от технолога: «${escapeHtml(setup)}»`,
        variant: 'normal',
      },
      {
        type: 'paragraph',
        text: `ОТВЕТ (СЕКРЕТНЫЙ ИНГРЕДИЕНТ): «${escapeHtml(punchline)}»`,
        variant: 'red',
      },
      { type: 'paragraph', text: `(Тип: ${escapeHtml(type)})`, variant: 'italic' },
    ],
  };
}

export function buildCatFactResultCard(fact) {
  return {
    method: 'GET',
    title: 'Кошачья правда жизни',
    apiName: 'Cat Fact API',
    blocks: [
      { type: 'paragraph', text: 'Научный факт от кота Барсика:', variant: 'normal' },
      { type: 'blockquote', text: escapeHtml(fact) },
      {
        type: 'paragraph',
        text: 'Комментарий Дани: «Это явно значит, что коту не хватает нашей колбасы! Срочно отправить ему батон!»',
        variant: 'normal',
      },
    ],
  };
}

export function buildPostProductCard(data) {
  let ratingLine = 'Рейтинг: нет данных';
  if (data.rating && typeof data.rating === 'object') {
    const rate = data.rating.rate !== undefined ? String(data.rating.rate) : 'N/A';
    const count = data.rating.count !== undefined ? String(data.rating.count) : '0';
    ratingLine = `Рейтинг: ${rate} (${count} отзывов)`;
  }
  const priceStr = data.price !== undefined ? data.price.toFixed(2) : '0';
  return {
    method: 'POST',
    title: 'Успешный запуск производства',
    apiName: 'Fake Store API',
    blocks: [
      { type: 'paragraph', text: 'НОВАЯ ПАРТИЯ СОЗДАНА!', variant: 'large' },
      {
        type: 'list',
        items: [
          `Ваш ID партии: ${String(data.id)}`,
          `Название: ${escapeHtml(data.title ?? 'Без названия')}`,
          `Цена за кг: ${priceStr}$`,
          ratingLine,
        ],
      },
      {
        type: 'hint',
        text: 'Подсказка: теперь нажми «Списать брак», чтобы удалить эту партию!',
      },
    ],
  };
}

export function buildPutProductCard(data) {
  const safeTitle = data.title ?? 'Неизвестный продукт';
  const safePrice = data.price !== undefined ? data.price.toFixed(2) : '0.00';
  const safeDesc = data.description ?? 'Описание утеряно';
  const safeCat = data.category ?? 'unknown';
  return {
    method: 'PUT',
    title: 'Рецепт будущего',
    apiName: 'Fake Store API',
    blocks: [
      { type: 'paragraph', text: 'РЕЦЕПТ УСПЕШНО ОБНОВЛЕН!', variant: 'large' },
      { type: 'paragraph', text: `Новое название: ${escapeHtml(safeTitle)}` },
      { type: 'paragraph', text: `Новая цена: ${safePrice}$` },
      { type: 'paragraph', text: `Новое описание: «${escapeHtml(safeDesc)}»`, variant: 'italic' },
      { type: 'paragraph', text: `Категория: ${escapeHtml(safeCat)}` },
      { type: 'divider' },
      { type: 'paragraph', text: 'Сервер вернул обновленные данные. ГОСТ принят!', variant: 'normal' },
    ],
  };
}

export function buildDeleteProductCard(data, targetId) {
  const delId = data.id ?? targetId;
  const titleLine = `Название: ${data.title ? escapeHtml(data.title) : 'Ваша колбаса'}`;
  const priceLine = data.price !== undefined ? `Цена: ${String(data.price)}$` : 'Цена: —';
  return {
    method: 'DELETE',
    title: 'Ликвидация последствий',
    apiName: 'Fake Store API',
    blocks: [
      { type: 'paragraph', text: 'БА-БАХ!', variant: 'large' },
      { type: 'paragraph', text: `Ваша партия (ID: ${String(delId)}) успешно уничтожена!` },
      { type: 'paragraph', text: titleLine, variant: 'strike' },
      { type: 'paragraph', text: priceLine, variant: 'strike' },
      { type: 'paragraph', text: 'Вы удалили именно тот товар, который создали!', variant: 'normal' },
      { type: 'divider' },
      { type: 'paragraph', text: 'Помянем вашу колбаску…', variant: 'italic' },
      {
        type: 'paragraph',
        text: 'Теперь создайте новую партию, чтобы попробовать снова.',
        variant: 'small',
      },
    ],
  };
}

export function normalizeApiErrorMessage(message) {
  if (message.includes('pattern') || message.includes('JSON')) {
    return 'Сервер прислал что-то странное. Попробуй еще раз!';
  }
  return message;
}
