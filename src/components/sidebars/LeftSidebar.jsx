export function LeftSidebar() {
  return (
    <aside className="sidebar-left">
      <section className="ad-block">
        <h2 className="visually-hidden">Реклама</h2>
        <img src="/img/kolbasenko2.png" alt="Колбасенко" />
      </section>

      <section className="ad-block">
        <h2 className="visually-hidden">Спецпредложение</h2>
        <p className="ad-text">ВНИМАНИЕ!</p>
        <p>Осталось всего 2 штуки!</p>
        <button type="button" className="buy-small-btn">
          КУПИТЬ
        </button>
      </section>

      <section className="ad-block">
        <h2 className="visually-hidden">Заработок</h2>
        <div className="earnings-block">
          ЗАРАБОТОК
          <br />
          1000$ В ДЕНЬ
          <br />
          БЕЗ ВЛОЖЕНИЙ
        </div>
      </section>
    </aside>
  );
}
