import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PageShell } from './components/layout/PageShell';
import { ApiPage } from './pages/ApiPage';
import { HomePage } from './pages/HomePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { useAppDispatch } from './store/hooks';
import { preloadPublicApiData } from './store/slices/preloadSlice';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(preloadPublicApiData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PageShell />}>
          <Route index element={<HomePage />} />
          <Route path="ceh" element={<ApiPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
