import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';

export function ThemeToggle() {
  const mode = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();
  const label = mode === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';

  return (
    <div className="theme-toggle-container">
      <button type="button" className="theme-toggle-btn" onClick={() => dispatch(toggleTheme())}>
        {label}
      </button>
    </div>
  );
}
