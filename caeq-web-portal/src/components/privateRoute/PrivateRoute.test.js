import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivateRoute from './PrivateRoute';

afterEach(() => {
    cleanup();
});

/* Test user is authenticated and component is rendered
 */
test('Authenticated render', () => {
	render(<PrivateRoute 
        component={<h1 data-testid="authenticated"></h1>}
    />);

	const element = screen.getByTestId('authenticated');
	expect(element).toBeInTheDocument();
});

/* Test user is not authenticated and component is not rendered
 */
test('Authenticated render', () => {
	render(<PrivateRoute 
        component={<h1 data-testid="not-authenticated">Hello World</h1>}
    />);

	const element = screen.getByTestId('not-authenticated');
	expect(element).not.toBeInTheDocument();
});
