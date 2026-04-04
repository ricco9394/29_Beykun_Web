function Paragraph({ text, variant = 'normal' }) {
  const classes = ['api-paragraph'];
  if (variant === 'large') classes.push('api-paragraph--large');
  if (variant === 'red') classes.push('api-paragraph--red');
  if (variant === 'small') classes.push('api-paragraph--small');
  if (variant === 'italic') classes.push('api-paragraph--italic');
  if (variant === 'strike') classes.push('api-paragraph--strike');
  return <p className={classes.join(' ')}>{text}</p>;
}

export function ApiContentBlocks({ blocks }) {
  return (
    <div className="api-data-content">
      {blocks.map((block, i) => {
        const key = `${block.type}-${String(i)}`;
        switch (block.type) {
          case 'paragraph':
            return <Paragraph key={key} text={block.text} variant={block.variant} />;
          case 'blockquote':
            return (
              <blockquote key={key} className="api-blockquote">
                {block.text}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={key} className="api-block-list">
                {block.items.map((item, j) => (
                  <li key={`${key}-${String(j)}`}>{item}</li>
                ))}
              </ul>
            );
          case 'hint':
            return (
              <div key={key} className="api-hint">
                {block.text}
              </div>
            );
          case 'divider':
            return <hr key={key} className="api-divider" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
