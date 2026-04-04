import { ReviewForm } from '../components/reviews/ReviewForm';
import { ReviewsList } from '../components/reviews/ReviewsList';

export function ReviewsPage() {
  return (
    <article className="main-content">
      <section className="reviews-section">
        <h3>ОТЗЫВЫ ЛЮДЕЙ</h3>
        <ReviewsList />
        <ReviewForm />
      </section>
    </article>
  );
}
