import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivateRoute from './PrivateRoute';

afterEach(() => {
    cleanup();
});

/* Test user is authenticated and component is rendered
 */
test('Authenticated render', () => {
	render(<Routes>
				<Route 
					exact
					path="/Login"
					element={<h1 data-testid="login"></h1>}
				/>
				<Route 
					exact
					path="/prueba" 
					element={
						<PrivateRoute
							component={<h1 data-testid="test-page"></h1>}
						/>} 
				/>
			</Routes>
	);

	const element = screen.getByTestId('test');
	expect(element).toBeInTheDocument();
});

/* Test user is not authenticated and component is not rendered
 */
test('Authenticated render', () => {
	render(<Routes>
				<Route 
					exact
					path="/Login"
					element={<h1 data-testid="login"></h1>}
				/>
				<Route 
					exact
					path="/prueba" 
					element={
						isPrivate
						?	<PrivateRoute
								component={<h1 data-testid="test-page"></h1>}
							/>
						: 	<Component />
					} 
				/>
			</Routes>
	);	

	const element = screen.getByTestId('not-authenticated');
	expect(element).not.toBeInTheDocument();
});
