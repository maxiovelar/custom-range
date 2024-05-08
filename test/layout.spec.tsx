import RootLayout from '@/layout';
import { render, screen } from '@testing-library/react';

describe('RootLayout', () => {
    it('should render the children prop when it is provided', () => {
        const children = <div>Test Children</div>;
        render(<RootLayout>{children}</RootLayout>);

        const childrenElement = screen.getByText('Test Children');

        expect(childrenElement).toBeInTheDocument();
    });
});
