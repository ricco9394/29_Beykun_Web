import { useAppSelector } from '../../store/hooks';
import { ReviewCard } from './ReviewCard';

export function ReviewsList() {
  const items = useAppSelector((s) => s.reviews.items);

  return (
    <div className="reviews-grid">
      {items.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
