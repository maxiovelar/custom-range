import NotFound from '@/not-found';
import { render, screen } from '@testing-library/react';

describe('NotFound', () => {
    it('should render ImageNotFound component', () => {
        render(<NotFound />);
        expect(screen.getByTestId('image-not-found-svg')).toBeInTheDocument();
    });

    it('should render heading with text "Not Found"', () => {
        render(<NotFound />);
        expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument();
    });
});
