const REASONS = [
  'В ней 228% мяса (мы посчитали на калькуляторе)',
  'После неё ты станешь сильным как Халк',
  'Её ел сам Илон Маск (реально)',
  'В комплекте идет наклейка "супер сус"',
  'Если не купишь мы придем к тебе домой',
];

export function ReasonsSection() {
  return (
    <>
      <h2 style={{ textAlign: 'center', color: 'red', textDecoration: 'underline' }}>ТОП-5 ПРИЧИН КУПИТЬ</h2>
      <section className="reasons-box">
        <h3 className="visually-hidden">Причины купить</h3>
        {REASONS.map((text, index) => (
          <div key={text} className="reason-item">
            <div className="number-circle">{index + 1}</div>
            <div>{text}</div>
          </div>
        ))}
      </section>
    </>
  );
}
