import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addReview } from '../../store/slices/reviewsSlice';
import { isValidUrl } from '../../utils/validation';

const RATING_OPTIONS = [
  { value: 5, label: '★★★★★ (5)' },
  { value: 4, label: '★★★★☆ (4)' },
  { value: 3, label: '★★★☆☆ (3)' },
  { value: 2, label: '★★☆☆☆ (2)' },
  { value: 1, label: '★☆☆☆☆ (1)' },
];

export function ReviewForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [thanks, setThanks] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setThanks(false);

    const nameTrim = name.trim();
    const commentTrim = comment.trim();
    const imageTrim = image.trim();

    if (nameTrim.length < 2) {
      setError('Имя должно содержать минимум 2 символа');
      return;
    }
    if (nameTrim.length > 50) {
      setError('Имя не должно превышать 50 символов');
      return;
    }
    if (commentTrim.length < 5) {
      setError('Отзыв должен содержать минимум 5 символов');
      return;
    }
    if (commentTrim.length > 500) {
      setError('Отзыв не должен превышать 500 символов');
      return;
    }
    if (imageTrim !== '' && !isValidUrl(imageTrim)) {
      setError('Пожалуйста, введите корректный URL изображения');
      return;
    }

    const hex = (Date.now() % 0xffffff).toString(16).padStart(6, '0');
    const placeholderImage = `https://via.placeholder.com/50/${hex}/ffffff?text=${encodeURIComponent(nameTrim.charAt(0) || '?')}`;

    dispatch(
      addReview({
        id: Date.now(),
        name: nameTrim,
        rating,
        text: commentTrim,
        image: imageTrim !== '' ? imageTrim : placeholderImage,
      }),
    );

    setName('');
    setComment('');
    setImage('');
    setRating(5);
    setThanks(true);
  };

  return (
    <div className="review-form-container">
      <h4>Оставить отзыв</h4>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reviewer-name">Ваше имя:</label>
          <input
            id="reviewer-name"
            name="name"
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            required
            minLength={2}
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reviewer-comment">Ваш отзыв:</label>
          <textarea
            id="reviewer-comment"
            name="comment"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
            required
            minLength={5}
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reviewer-image">Ссылка на изображение (необязательно):</label>
          <input
            id="reviewer-image"
            name="image"
            type="url"
            value={image}
            onChange={(ev) => setImage(ev.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <small className="form-hint">Вставьте ссылку на картинку для аватарки</small>
        </div>

        <div className="form-group">
          <label htmlFor="reviewer-rating">Оценка:</label>
          <select
            id="reviewer-rating"
            name="rating"
            value={rating}
            onChange={(ev) => setRating(Number(ev.target.value))}
            required
          >
            {RATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-review-btn">
          Отправить отзыв
        </button>
      </form>
      {error !== null ? (
        <div className="form-error" role="alert">
          {error}
        </div>
      ) : null}
      {thanks ? (
        <p className="form-hint" style={{ marginTop: 10, fontWeight: 'bold' }}>
          Спасибо за ваш отзыв!
        </p>
      ) : null}
    </div>
  );
}
