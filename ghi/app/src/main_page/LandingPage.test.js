import { render } from '@testing-library/react';
import App from '../App';

// written by Deion
test('properly renders logo', () => {
  const { container } = render(<App />);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const logo = container.querySelector('.lp_logo');
  expect(logo).toBeInTheDocument();
});
