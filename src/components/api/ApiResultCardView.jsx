import { ApiContentBlocks } from './ApiContentBlocks';

const METHOD_LABELS = {
  GET: 'ПОЛУЧЕНО',
  POST: 'СОЗДАНО',
  PUT: 'ОБНОВЛЕНО',
  DELETE: 'УДАЛЕНО',
};

export function ApiResultCardView({ data }) {
  const statusClass = `status-${data.method.toLowerCase()}`;
  const label = METHOD_LABELS[data.method] ?? data.method;

  return (
    <div className="api-card">
      <span className={`api-status ${statusClass}`}>{label}</span>
      <h4>🌭 {data.title}</h4>
      <p style={{ fontSize: 10, color: 'gray' }}>Источник: {data.apiName}</p>
      <div className="api-data">
        <ApiContentBlocks blocks={data.blocks} />
      </div>
    </div>
  );
}
