import React from 'react';
import { render, screen } from '@testing-library/react';
import { RangeFixedValues } from '@/_components/range-fixed-values/RangeFixeValues';
import { LITERALS } from '@/_constants/constants';

describe('RangeFixedValues', () => {
    const rangeValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

    it('renders the component with correct label values', () => {
        render(<RangeFixedValues rangeValues={rangeValues} />);

        expect(screen.getByText(`${rangeValues.at(0)}`)).toBeInTheDocument();
        expect(screen.getByText(`${rangeValues.at(-1)}`)).toBeInTheDocument();
    });

    it('renders the component with range and progress elements', () => {
        render(<RangeFixedValues rangeValues={rangeValues} />);

        expect(screen.getByTestId(LITERALS.range)).toBeInTheDocument();
        expect(screen.getByTestId(LITERALS.progress)).toBeInTheDocument();
    });
});
