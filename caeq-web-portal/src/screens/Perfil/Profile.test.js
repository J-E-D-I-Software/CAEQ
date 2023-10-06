import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';

afterEach(() => {
    cleanup();
});

test('should render Profile component', () => {
    render(<Profile />);
    const props = {prop1: ''}
    expect(profileElement).toBeInTheDocument();
});