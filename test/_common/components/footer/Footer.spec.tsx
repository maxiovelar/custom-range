import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/_common/components/footer/Footer';

describe('Footer', () => {
    it("should render a footer element with class 'footer'", () => {
        render(<Footer />);

        const footerElement = screen.getByTestId('footer');

        expect(footerElement).toHaveClass('footer');
    });

    it("should render a div element with class 'description'", () => {
        render(<Footer />);

        const descriptionElement = screen.getByTestId('footer-text');

        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveClass('description');
    });

    it('should render the correct text', () => {
        render(<Footer />);

        const footerText = screen.getByText(/Range exercise developed with/i);
        const nextjsLink = screen.getByText('Next.js');
        const githubLink = screen.getByText('Maximiliano Ovelar');

        expect(footerText).toBeInTheDocument();
        expect(nextjsLink).toBeInTheDocument();
        expect(githubLink).toBeInTheDocument();
    });

    it('should have the correct links', () => {
        render(<Footer />);

        const nextjsLink = screen.getByTestId('link-nextjs');
        const githubLink = screen.getByTestId('link-github');

        expect(nextjsLink).toHaveAttribute('href', 'https://nextjs.org/');
        expect(githubLink).toHaveAttribute('href', 'https://github.com/maxiovelar');
    });
});
