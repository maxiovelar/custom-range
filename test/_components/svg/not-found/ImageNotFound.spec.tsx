import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageNotFound } from '@/_components/svg/not-found/ImageNotFound';

describe('ImageNotFound', () => {
    it('renders without error', () => {
        render(<ImageNotFound />);

        const svgElement = screen.getByTestId('image-not-found-svg');

        expect(svgElement).toBeInTheDocument();
    });

    it('should render the SVG element with the correct width and height', () => {
        render(<ImageNotFound />);

        const svgElement = screen.getByTestId('image-not-found-svg');

        expect(svgElement).toHaveAttribute('width', '800');
        expect(svgElement).toHaveAttribute('height', '500');
    });
});
