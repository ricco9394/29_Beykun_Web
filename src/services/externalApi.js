export async function getSafeJson(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Сервер вернул не JSON');
  }
}

export async function fetchRandomJoke() {
  const response = await fetch('https://official-joke-api.appspot.com/random_joke');
  if (!response.ok) throw new Error('Повара молчат как рыбы');
  return getSafeJson(response);
}

export async function fetchCatFactText() {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) throw new Error('Коты убежали за колбасой');
  const data = await getSafeJson(response);
  return data.fact ?? 'Коты молчат. Видимо, съели все факты.';
}

export async function fetchProductById(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error('Склад не отвечает');
  return getSafeJson(response);
}

export async function postProduct(payload) {
  const response = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Завод отказался варить колбасу');
  return getSafeJson(response);
}

export async function putProduct(id, payload) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Технолог забастовал');
  return getSafeJson(response);
}

export async function deleteProduct(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Товар с ID ${id} не найден! Возможно, он уже был удален или исчез со склада.`,
      );
    }
    throw new Error(`Ошибка сервера (Статус ${String(response.status)}): Не удалось удалить товар.`);
  }
  return getSafeJson(response);
}
