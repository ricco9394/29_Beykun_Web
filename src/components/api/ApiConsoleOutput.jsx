import { useAppSelector } from '../../store/hooks';
import { ApiResultCardView } from './ApiResultCardView';

export function ApiConsoleOutput() {
  const { status, loadingMessage, errorMessage, card } = useAppSelector((s) => s.apiConsole);

  if (status === 'loading') {
    return (
      <div className="loading-spinner">
        🥩 {loadingMessage}…
        <br />
        <small>(Даня Колбасенко стучится в API)</small>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="error-message">
        ⚠️ ТРАГЕДИЯ! {errorMessage}
        <br />
        <small>Наверное, коты перегрызли кабель.</small>
      </div>
    );
  }

  if (status === 'success' && card) {
    return <ApiResultCardView data={card} />;
  }

  return (
    <div className="placeholder-msg">
      Здесь появятся данные из космоса… Или открой предзагрузку ниже.
    </div>
  );
}
