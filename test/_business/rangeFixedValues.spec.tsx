import { RangeFixedValues, RangeFixedValuesProps } from '@/_components/range-fixed-values/RangeFixeValues';
import { fireEvent, render, screen } from '@testing-library/react';
import * as store from '@/store';
import { selectorMoveHandler } from '@/_business/rangeFixedValues';

jest.mock('../../app/store');

describe('Test mouse events', () => {
    let props: RangeFixedValuesProps;
    let minSelector: HTMLElement;
    let maxSelector: HTMLElement;
    let range: HTMLElement;

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

    const onMinInputChange = jest.fn();
    const onMaxInputChange = jest.fn();
    const stepCount = 5;
    const stepWidth = 484 / stepCount;

    beforeEach(() => {
        props = {
            rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
        };

        render(<RangeFixedValues {...props} />);

        jest.spyOn(store, 'getState').mockImplementation(() => {
            return { min: 1, max: 100, rangeValues: props.rangeValues, rangeStartPosition: 0, rangeEndPosition: 484 };
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
        const mouseXmove = stepWidth * 2;

        jest.spyOn(minSelector, 'getBoundingClientRect').mockImplementation(() => {
            return { ...mockedValueGetBoundingClientRect, x: mouseXmove };
        });

        const expectedValue = props.rangeValues[2];

        selectorMoveHandler(minSelector, onMinInputChange);
        fireEvent.mouseDown(minSelector);
        fireEvent.mouseMove(minSelector, { clientX: mouseXmove });
        fireEvent.mouseUp(minSelector);

        expect(onMinInputChange).toHaveBeenCalledWith(expectedValue);
    });

    it('should call "onMaxInputChange" with the expected value when the min selector is moved', () => {
        const mouseXmove = stepWidth * 4;

        jest.spyOn(maxSelector, 'getBoundingClientRect').mockImplementation(() => {
            return { ...mockedValueGetBoundingClientRect, x: mouseXmove };
        });

        const expectedValue = props.rangeValues[4];

        selectorMoveHandler(maxSelector, onMaxInputChange);
        fireEvent.mouseDown(maxSelector);
        fireEvent.mouseMove(maxSelector, { clientX: mouseXmove });
        fireEvent.mouseUp(maxSelector);

        expect(onMaxInputChange).toHaveBeenCalledWith(expectedValue);
    });
});
