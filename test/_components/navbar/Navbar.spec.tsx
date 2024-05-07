import { Navbar } from '@/_components/navbar/Navbar';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Navbar', () => {
    it('should render without errors', () => {
        render(<Navbar />);
    });

    it('should display correct links', () => {
        render(<Navbar />);
        const homeLink = screen.getByText('Home');
        const menu1Link = screen.getByText('Exercise 1');
        const menu2Link = screen.getByText('Exercise 2');

        expect(homeLink).toBeInTheDocument();
        expect(menu1Link).toBeInTheDocument();
        expect(menu2Link).toBeInTheDocument();
    });

    it('should have clickable links', () => {
        render(<Navbar />);
        const homeLink = screen.getByText('Home');
        const menu1Link = screen.getByText('Exercise 1');
        const menu2Link = screen.getByText('Exercise 2');

        expect(homeLink).toHaveAttribute('href', '/');
        expect(menu1Link).toHaveAttribute('href', '/exercise1');
        expect(menu2Link).toHaveAttribute('href', '/exercise2');
    });
});
