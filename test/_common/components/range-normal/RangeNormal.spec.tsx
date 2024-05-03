import { RangeNormal, RangeNormalProps } from '@/_common/components/range-normal/RangeNormal';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';

describe('RangeNormal', () => {
    let props: RangeNormalProps;
    let minSelector: HTMLElement;
    let maxSelector: HTMLElement;
    let range;

    const mockedValueGetBoundingClientRect = {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        toJSON() {},
    };

    beforeEach(() => {
        props = {
            min: 1,
            max: 100,
        };

        render(<RangeNormal {...props} />);

        minSelector = screen.getByRole('button', { name: 'min-selector' });

        jest.spyOn(minSelector, 'getBoundingClientRect').mockImplementation(() => {
            return { ...mockedValueGetBoundingClientRect, left: 0 };
        });

        maxSelector = screen.getByRole('button', { name: 'max-selector' });

        jest.spyOn(maxSelector, 'getBoundingClientRect').mockImplementation(() => {
            return { ...mockedValueGetBoundingClientRect, left: 484 };
        });

        range = screen.getByTestId('range');

        jest.spyOn(range, 'getBoundingClientRect').mockImplementation(() => {
            return { ...mockedValueGetBoundingClientRect, left: 500 };
        });
    });

    it('should render correctly', () => {
        const { container } = render(<RangeNormal {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('should render an error when a minValue greater than max is inserted', () => {
        const inputMinValue = screen.getByLabelText('min-value');
        fireEvent.change(inputMinValue, { target: { value: props.max + 1 } });

        const error = `The values must be between ${props.min} and ${props.max}`;
        expect(screen.getByText(error)).toBeInTheDocument();
    });

    it('should render an error when a minValue less than min is inserted', () => {
        const inputMinValue = screen.getByLabelText('min-value');
        fireEvent.change(inputMinValue, { target: { value: props.min - 1 } });

        const error = `The values must be between ${props.min} and ${props.max}`;
        expect(screen.getByText(error)).toBeInTheDocument();
    });

    it('should render an error when a maxValue greater than max is inserted', () => {
        const inputMaxValue = screen.getByLabelText('max-value');
        fireEvent.change(inputMaxValue, { target: { value: props.max + 1 } });

        const error = `The values must be between ${props.min} and ${props.max}`;
        expect(screen.getByText(error)).toBeInTheDocument();
    });

    it('should render an error when a maxValue less than min is inserted', () => {
        const inputMaxValue = screen.getByLabelText('max-value');
        fireEvent.change(inputMaxValue, { target: { value: props.min - 1 } });

        const error = `The values must be between ${props.min} and ${props.max}`;
        expect(screen.getByText(error)).toBeInTheDocument();
    });
});
