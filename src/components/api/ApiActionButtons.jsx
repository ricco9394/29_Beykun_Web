import { useAppDispatch } from '../../store/hooks';
import {
  consoleDeleteBatch,
  consoleFetchCatFact,
  consoleFetchJoke,
  consolePostOrder,
  consolePutRecipe,
} from '../../store/slices/apiConsoleSlice';

export function ApiActionButtons() {
  const dispatch = useAppDispatch();

  return (
    <ul className="nav-list" style={{ marginTop: 10 }}>
      <li>
        <button type="button" className="nav-btn" onClick={() => void dispatch(consoleFetchJoke())}>
          🤣 Ржака из цеха (GET)
        </button>
      </li>
      <li>
        <button type="button" className="nav-btn" onClick={() => void dispatch(consoleFetchCatFact())}>
          🐱 Кот хочет колбасы (GET)
        </button>
      </li>
      <li>
        <button type="button" className="nav-btn" onClick={() => void dispatch(consolePostOrder())}>
          🚚 Заказать фуру (POST)
        </button>
      </li>
      <li>
        <button type="button" className="nav-btn" onClick={() => void dispatch(consolePutRecipe())}>
          🧪 Улучшить ГОСТ (PUT)
        </button>
      </li>
      <li>
        <button type="button" className="nav-btn" onClick={() => void dispatch(consoleDeleteBatch())}>
          🗑️ Списать брак (DELETE)
        </button>
      </li>
    </ul>
  );
}
