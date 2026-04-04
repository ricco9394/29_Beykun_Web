export function RightSidebar() {
  return (
    <aside className="sidebar-right">
      <section className="ad-block">
        <h2 className="visually-hidden">Шок-новость</h2>
        <p className="ad-text">ШОК!</p>
        <p>Ученые нашли мясо в колбасе!</p>
        <img src="/img/kolbasenko.jpeg" alt="картинка шока" />
      </section>

      <section className="ad-block">
        <h2 className="visually-hidden">Токсис</h2>
        <p style={{ color: 'red', fontWeight: 'bold' }}>ТОКСИС НАЕЛСЯ КОЛБАСЫ</p>
        <div className="gif-container">
          <img src="/img/toxis.gif" alt="Токсис" />
        </div>
      </section>

      <section className="ad-block">
        <h2 className="visually-hidden">Казино</h2>
        <p>ВУЛКАН КАЗИНО</p>
        <p>Выиграй миллион прямо сейчас!</p>
      </section>

      <section className="ad-block">
        <h2 className="visually-hidden">СМС розыгрыш</h2>
        <p>СМС РОЗЫГРЫШ</p>
        <p>Отправь КОЛБАСА на 666</p>
      </section>
    </aside>
  );
}
