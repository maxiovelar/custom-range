import { Banner } from '@/_common/components/svg/banner/Banner';
import { render, screen } from '@testing-library/react';

describe('Banner', () => {
    it('should render the SVG element', () => {
        render(<Banner />);

        const svgElement = screen.getByTestId('banner-svg');

        expect(svgElement).toBeInTheDocument();
    });

    it('should render the SVG element with the correct width and height', () => {
        render(<Banner />);

        const svgElement = screen.getByTestId('banner-svg');

        expect(svgElement).toHaveAttribute('width', '774.04004');
        expect(svgElement).toHaveAttribute('height', '475.1369');
    });
});
