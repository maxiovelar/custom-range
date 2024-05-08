import { fireEvent, render, screen } from '@testing-library/react';
import * as store from '@/store';
import { RangeNormal, RangeNormalProps } from '@/_components/range-normal/RangeNormal';
import { selectorMoveHandler } from '@/_business/rangeNormal';
import { ERRORS } from '@/_constants/constants';

jest.mock('../../app/store');

describe('RangeNormal component', () => {
    describe('Test mouse events', () => {
        let props: RangeNormalProps;
        let minSelector: HTMLElement;
        let maxSelector: HTMLElement;
        let range: HTMLElement;
        const onMinInputChange = jest.fn();
        const onMaxInputChange = jest.fn();

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
            jest.spyOn(store, 'getState').mockImplementation(() => {
                return { min: 1, max: 100, rangeValues: [], rangeStartPosition: 0, rangeEndPosition: 484 };
            });

            minSelector = screen.getByRole('button', { name: 'min-selector' });

            maxSelector = screen.getByRole('button', { name: 'max-selector' });

            range = screen.getByTestId('range');

            jest.spyOn(minSelector, 'getBoundingClientRect').mockImplementationOnce(() => {
                return { ...mockedValueGetBoundingClientRect, x: 0, left: 0 };
            });

            jest.spyOn(maxSelector, 'getBoundingClientRect').mockImplementation(() => {
                return { ...mockedValueGetBoundingClientRect, x: 484, left: 484 };
            });

            jest.spyOn(range, 'getBoundingClientRect').mockImplementation(() => {
                return { ...mockedValueGetBoundingClientRect, x: 0, left: 0 };
            });
        });

        it('should call "onMinInputChange" with the expected value when the min selector is moved', () => {
            jest.spyOn(minSelector, 'getBoundingClientRect').mockImplementation(() => {
                return { ...mockedValueGetBoundingClientRect, x: 400 };
            });
            const expectedValue = '83';

            selectorMoveHandler(minSelector, onMinInputChange);
            fireEvent.mouseDown(minSelector);
            fireEvent.mouseMove(minSelector, { clientX: 400 });
            fireEvent.mouseUp(minSelector);

            expect(onMinInputChange).toHaveBeenCalledWith(expectedValue);
        });

        it('should place the selector at min position when newPosition < minPosition', () => {
            jest.spyOn(minSelector, 'getBoundingClientRect').mockImplementation(() => {
                return { ...mockedValueGetBoundingClientRect, x: -20 };
            });
            const expectedValue = `${props.min}`;

            selectorMoveHandler(minSelector, onMinInputChange);
            fireEvent.mouseDown(minSelector);
            fireEvent.mouseMove(minSelector, { clientX: -20 });
            fireEvent.mouseUp(minSelector);

            expect(onMinInputChange).toHaveBeenCalledWith(expectedValue);
        });

        it('should call "onMaxInputChange" with the expected value when the max selector is moved', () => {
            jest.spyOn(maxSelector, 'getBoundingClientRect').mockImplementation(() => {
                return { ...mockedValueGetBoundingClientRect, x: 350 };
            });
            const expectedValue = '73';

            selectorMoveHandler(maxSelector, onMaxInputChange);
            fireEvent.mouseDown(maxSelector);
            fireEvent.mouseMove(maxSelector, { clientX: 350 });
            fireEvent.mouseUp(maxSelector);

            expect(onMaxInputChange).toHaveBeenCalledWith(expectedValue);
        });

        it('should place the selector at max position when newPosition > maxPosition', () => {
            jest.spyOn(maxSelector, 'getBoundingClientRect').mockImplementation(() => {
                return { ...mockedValueGetBoundingClientRect, x: 600 };
            });
            const expectedValue = `${props.max}`;

            selectorMoveHandler(maxSelector, onMaxInputChange);
            fireEvent.mouseDown(maxSelector);
            fireEvent.mouseMove(maxSelector, { clientX: 600 });
            fireEvent.mouseUp(maxSelector);

            expect(onMaxInputChange).toHaveBeenCalledWith(expectedValue);
        });
    });

    describe('Test input events', () => {
        let props: RangeNormalProps;
        beforeEach(() => {
            props = {
                min: 1,
                max: 100,
            };

            render(<RangeNormal {...props} />);

            jest.spyOn(store, 'getState').mockImplementation(() => {
                return { min: 1, max: 100, rangeValues: [], rangeStartPosition: 0, rangeEndPosition: 484 };
            });
        });
        it('should change the minInputValue when a valid value is typed in the input', () => {
            const input = screen.getByLabelText('min-value');
            fireEvent.change(input, { target: { value: '50' } });

            expect(input).toHaveValue(50);
        });

        it('should show an error message when a minInputValue > max is typed in the input', () => {
            const input = screen.getByLabelText('min-value');
            fireEvent.change(input, { target: { value: '200' } });

            expect(screen.getByText(ERRORS.rangeValue(props.min, props.max))).toBeInTheDocument();
        });

        it('should change the maxInputValue when a valid value is typed in the input', () => {
            const input = screen.getByLabelText('max-value');
            fireEvent.change(input, { target: { value: '90' } });

            expect(input).toHaveValue(90);
        });

        it('should show an error message when a maxInputValue < min is typed in the input', () => {
            const input = screen.getByLabelText('max-value');
            fireEvent.change(input, { target: { value: '-30' } });

            expect(screen.getByText(ERRORS.rangeValue(props.min, props.max))).toBeInTheDocument();
        });

        it('should show an error message when crossed values are typed in the inputs', () => {
            const inputMin = screen.getByLabelText('min-value');
            fireEvent.change(inputMin, { target: { value: '50' } });

            const inputMax = screen.getByLabelText('max-value');
            fireEvent.change(inputMax, { target: { value: '40' } });

            expect(screen.getByText(ERRORS.crossedValue)).toBeInTheDocument();
        });
    });
});
