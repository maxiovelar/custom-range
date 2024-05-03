import React from 'react';
import { render, screen } from '@testing-library/react';
import { Wrong } from '@/_common/components/svg/wrong/Wrong';

describe('InDevelopment', () => {
    it('renders without error', () => {
        render(<Wrong />);

        const svgElement = screen.getByTestId('wrong-svg');

        expect(svgElement).toBeInTheDocument();
    });

    it('should render the SVG element with the correct width and height', () => {
        render(<Wrong />);

        const svgElement = screen.getByTestId('wrong-svg');

        expect(svgElement).toHaveAttribute('width', '500');
        expect(svgElement).toHaveAttribute('height', '620');
    });
});
