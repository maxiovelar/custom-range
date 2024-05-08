import { pageTitles } from '@/_constants/constants';
import Home from '@/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
    it('should render a correct title', () => {
        render(<Home />);
        const titleElement = screen.getByText(pageTitles.home);
        expect(titleElement).toBeInTheDocument();
    });

    it('should render a banner', () => {
        render(<Home />);
        const bannerElement = screen.getByTestId('banner-svg');
        expect(bannerElement).toBeInTheDocument();
    });
});
