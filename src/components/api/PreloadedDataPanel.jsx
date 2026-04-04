import { useAppSelector } from '../../store/hooks';
import { escapeHtml } from '../../utils/escapeHtml';

export function PreloadedDataPanel() {
  const preload = useAppSelector((s) => s.preload);

  if (preload.status === 'idle' || preload.status === 'loading') {
    return (
      <section className="api-zone" style={{ marginTop: 16 }}>
        <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>📦 Предзагрузка из API</h3>
        <p className="loading-spinner">Тянем данные на склад…</p>
      </section>
    );
  }

  if (preload.status === 'failed') {
    return (
      <section className="api-zone" style={{ marginTop: 16 }}>
        <h3 style={{ textAlign: 'center' }}>Предзагрузка</h3>
        <p className="error-message">Не удалось выполнить предзагрузку.</p>
      </section>
    );
  }

  return (
    <section className="api-zone" style={{ marginTop: 16 }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>📦 Предзагрузка из API (хранилище)</h3>
      <p style={{ textAlign: 'center', fontSize: 12 }}>Данные уже в Redux — можно показывать без новых запросов</p>

      <div className="api-output" style={{ marginTop: 10 }}>
        {preload.joke ? (
          <div className="api-card">
            <span className="api-status status-get">КЭШ GET</span>
            <h4>Шутка (предзагружена)</h4>
            <div className="api-data">
              <p>{escapeHtml(preload.joke.setup ?? '')}</p>
              <p className="api-paragraph--red">{escapeHtml(preload.joke.punchline ?? '')}</p>
            </div>
          </div>
        ) : (
          <p className="placeholder-msg">Шутка: {preload.jokeError ?? 'нет данных'}</p>
        )}

        {preload.catFact ? (
          <div className="api-card">
            <span className="api-status status-get">КЭШ GET</span>
            <h4>Факт о котах</h4>
            <blockquote className="api-blockquote">{escapeHtml(preload.catFact)}</blockquote>
          </div>
        ) : (
          <p className="placeholder-msg">Кот: {preload.catError ?? 'нет данных'}</p>
        )}

        {preload.sampleProduct ? (
          <div className="api-card">
            <span className="api-status status-get">КЭШ GET</span>
            <h4>Товар №1 (образец)</h4>
            <div className="api-data">
              <p>{escapeHtml(preload.sampleProduct.title)}</p>
              <p>Цена: {preload.sampleProduct.price.toFixed(2)} $</p>
            </div>
          </div>
        ) : (
          <p className="placeholder-msg">Товар: {preload.productError ?? 'нет данных'}</p>
        )}
      </div>
    </section>
  );
}
