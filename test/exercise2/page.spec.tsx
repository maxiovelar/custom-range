import PageExercise2 from '@/exercise2/page';
import { render, screen } from '@testing-library/react';

describe('PageExercise2', () => {
    beforeEach(() => {
        render(<PageExercise2 />);
    });
    it('renders the page title', () => {
        const pageTitle = screen.getByText('Fixed Values Range');
        expect(pageTitle).toBeInTheDocument();
    });

    it('renders the "InDevelopment" component', () => {
        const inDevelopmentComponent = screen.getByTestId('in-development-svg');
        expect(inDevelopmentComponent).toBeInTheDocument();
    });

    it('renders the "COMING SOON..." section', () => {
        const comingSoonSection = screen.getByText('COMING SOON...');
        expect(comingSoonSection).toBeInTheDocument();
    });

    it('renders the "This feature is in development yet, stay tuned!" section', () => {
        const developmentSection = screen.getByText('This feature is in development yet, stay tuned!');
        expect(developmentSection).toBeInTheDocument();
    });
});
