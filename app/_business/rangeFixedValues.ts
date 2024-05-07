import { isValidMovement, setProgressWidth } from "@/_business/common";
import { rangeFixedConstants } from "@/_constants/constants";
import { type SelectorId } from "@/_types/types";
import { getState } from "@/store";

interface MouseMoveProps {
    event: MouseEvent, mousePosition: number, selector: HTMLElement, onChangeLabelValue: (newValue: number) => void
}

const onMouseMove = ({ event, mousePosition, selector, onChangeLabelValue }: MouseMoveProps) => {
    const { rangeValues, rangeStartPosition, rangeEndPosition } = getState();

    const selectorPosition = event.clientX - mousePosition - rangeStartPosition;
    let newSelectorPosition = Math.round(selectorPosition);

    if (newSelectorPosition < 0) newSelectorPosition = 0;
    if (newSelectorPosition > (rangeEndPosition - rangeStartPosition)) newSelectorPosition = (rangeEndPosition - rangeStartPosition);

    if (isValidMovement(selector, newSelectorPosition, rangeStartPosition)) {
        const { selectedValue, finalPosition } = calculateNewValueAndPosition(newSelectorPosition, rangeValues, selector.id as SelectorId);

        selector.style.left = `${finalPosition}px`;
        selector.style.cursor = 'grabbing';
        setProgressWidth();

        onChangeLabelValue(selectedValue);
    }
};


export const selectorMoveHandler = (selector: HTMLElement, onChangeLabelValue: (newValue: number) => void) => {
    selector.onmousedown = (event: MouseEvent) => {
        event.preventDefault();

        const selectorPosition = selector.getBoundingClientRect().left;
        const mousePosition = event.clientX - selectorPosition;

        const handleMove = (event: MouseEvent) => {
            onMouseMove({ event, mousePosition, selector, onChangeLabelValue });
        }

        const onMouseUp = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', handleMove);
            selector.style.cursor = 'grab';
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    selector.ondragstart = () => {
        return false;
    };
};

const calculateNewValueAndPosition = (newPosition: number, rangeValues: number[], selectorId: SelectorId) => {
    const { selectorWidth, rangeWidth } = rangeFixedConstants;
    const stepWidth = (rangeWidth - selectorWidth) / (rangeValues.length - 1);

    const finalStep = Math.round(newPosition / stepWidth);
    const finalPosition = finalStep * stepWidth;
    const selectedValue = rangeValues[finalStep];

    return { selectedValue, finalPosition };
}

