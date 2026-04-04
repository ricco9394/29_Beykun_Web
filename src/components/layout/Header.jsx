import { NavLink } from 'react-router-dom';
import { MarqueeBanner } from './MarqueeBanner';

const navClass = ({ isActive }) => `nav-btn nav-router${isActive ? ' nav-link-active' : ''}`;

export function Header() {
  return (
    <header>
      <nav className="fun-nav">
        <div className="nav-marquee">
          <MarqueeBanner scrollAmount={10}>
            📡 ЦЕХ СВЯЗИ ОТКРЫТ 📡 ЖМИ КНОПКИ, ПОКА КОЛБАСА НЕ ОСТЫЛА 📡
          </MarqueeBanner>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink to="/" className={navClass} end>
              🏠 Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/ceh" className={navClass}>
              📡 Пульт API (SPA)
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" className={navClass}>
              ⭐ Отзывы
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="marquee">
        <MarqueeBanner scrollAmount={15}>
          🔥 АКЦИЯ!!! КУПИ 3 КОЛБАСЫ ПОЛУЧИ 4 БЕСПЛАТНО!!! ТОЛЬКО СЕГОДНЯ 🔥
        </MarqueeBanner>
      </div>

      <div className="header-box">
        <h1>!!! КОЛБАСКА by Даня Колбасенко !!!</h1>
        <p>САМАЯ ВКУСНАЯ КОЛБАСА В МИРЕ (ГАРАНТИЯ)</p>
      </div>
    </header>
  );
}
