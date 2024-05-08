import React from 'react';
import { render, screen } from '@testing-library/react';
import { RangeNormal } from '@/_components/range-normal/RangeNormal';
import { LITERALS } from '@/_constants/constants';

describe('RangeNormal', () => {
    const min = 1;
    const max = 100;

    beforeEach(() => {
        render(<RangeNormal min={min} max={max} />);
    });

    it('renders the component with correct min and max values', () => {
        const minInputValue = screen.getByLabelText('min-value');
        const maxInputValue = screen.getByLabelText('max-value');

        expect(minInputValue).toHaveValue(min);
        expect(maxInputValue).toHaveValue(max);
    });

    it('renders the component with range and progress elements', () => {
        expect(screen.getByTestId(LITERALS.range)).toBeInTheDocument();
        expect(screen.getByTestId(LITERALS.progress)).toBeInTheDocument();
    });
});
