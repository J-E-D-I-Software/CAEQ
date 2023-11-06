import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhiteCard from './WhiteCard';

afterEach(() => {
    cleanup();
});

test('renders the WhiteCard component', () => {
    // We first need to load the component
    render(<WhiteCard />);
    const card = screen.getByTestId('white-card');

    // Now we can do the assertions
    expect(card).toBeInTheDocument();
});
