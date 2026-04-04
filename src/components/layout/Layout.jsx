import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setCookie } from '../../utils/cookies';
import { useAppSelector } from '../../store/hooks';
import { Footer } from './Footer';
import { Header } from './Header';
import { ThemeToggle } from './ThemeToggle';

export function Layout() {
  const mode = useAppSelector((s) => s.theme.mode);

  useEffect(() => {
    setCookie('theme', mode, 365);
  }, [mode]);

  return (
    <div className="app-root" data-theme={mode}>
      <ThemeToggle />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
