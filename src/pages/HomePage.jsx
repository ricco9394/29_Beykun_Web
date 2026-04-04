import { BuyCallToAction } from '../components/home/BuyCallToAction';
import { ReasonsSection } from '../components/home/ReasonsSection';
import { SlogansSection } from '../components/home/SlogansSection';

export function HomePage() {
  return (
    <article className="main-content">
      <ReasonsSection />
      <SlogansSection />
      <BuyCallToAction />
    </article>
  );
}
