import { Variable } from 'components/layouts/Variable';
import { Home } from 'components/templates/home';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Variable pageName="AiSwap">
      <Home />
    </Variable>
  );
};

export default HomePage;
