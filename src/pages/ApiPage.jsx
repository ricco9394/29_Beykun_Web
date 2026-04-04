import { ApiActionButtons } from '../components/api/ApiActionButtons';
import { ApiConsoleOutput } from '../components/api/ApiConsoleOutput';
import { PreloadedDataPanel } from '../components/api/PreloadedDataPanel';

export function ApiPage() {
  return (
    <article className="main-content">
      <section className="api-zone">
        <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>📡 ПУЛЬТ УПРАВЛЕНИЯ ИНТЕРНЕТОМ 📡</h3>
        <p style={{ textAlign: 'center', fontSize: 12 }}>(Осторожно, возможна утечка мозгов)</p>
        <ApiActionButtons />
        <div className="api-output" style={{ marginTop: 10 }}>
          <ApiConsoleOutput />
        </div>
      </section>
      <PreloadedDataPanel />
    </article>
  );
}
