import React from 'react';
import { render, screen } from '@testing-library/react';
import { InDevelopment } from '@/_common/components/svg/in-development/InDevelopment';

describe('InDevelopment', () => {
    it('renders without error', () => {
        render(<InDevelopment />);

        const svgElement = screen.getByTestId('in-development-svg');

        expect(svgElement).toBeInTheDocument();
    });

    it('should render the SVG element with the correct width and height', () => {
        render(<InDevelopment />);

        const svgElement = screen.getByTestId('in-development-svg');

        expect(svgElement).toHaveAttribute('width', '552.94084');
        expect(svgElement).toHaveAttribute('height', '367.92049');
    });
});
