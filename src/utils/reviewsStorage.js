import { DEFAULT_REVIEWS } from '../data/defaultReviews';
import { getCookie, setCookie } from './cookies';

const REVIEWS_COOKIE = 'reviews';
const REVIEWS_DAYS = 30;

function parseReviews(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readReviewsFromCookie() {
  const saved = getCookie(REVIEWS_COOKIE);
  if (saved) {
    const list = parseReviews(saved);
    if (list && list.length > 0) return list;
  }
  const initial = [...DEFAULT_REVIEWS];
  setCookie(REVIEWS_COOKIE, JSON.stringify(initial), REVIEWS_DAYS);
  return initial;
}

export function persistReviews(reviews) {
  setCookie(REVIEWS_COOKIE, JSON.stringify(reviews), REVIEWS_DAYS);
}
