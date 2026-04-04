import { useState } from 'react';

function stars(rating) {
  return `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;
}

export function ReviewCard({ review }) {
  const hex = (review.id % 0xffffff).toString(16).padStart(6, '0');
  const fallback = `https://via.placeholder.com/50/${hex}/ffffff?text=${encodeURIComponent(review.name.charAt(0) || '?')}`;
  const initial = review.image.trim() !== '' ? review.image : fallback;
  const [src, setSrc] = useState(initial);

  return (
    <div className="review-card">
      <div className="review-header">
        <img
          src={src}
          alt={review.name}
          className="review-avatar"
          onError={() => {
            setSrc(fallback);
          }}
        />
        <span className="review-author">{review.name}</span>
      </div>
      <div className="review-stars">{stars(review.rating)}</div>
      <p className="review-text">{review.text}</p>
    </div>
  );
}
