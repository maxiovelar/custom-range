const LITERALS = {
    minValue: "min-value",
    maxValue: "max-value",
    minSelector: "min-selector",
    maxSelector: "max-selector",
    dragging: "dragging",
};

interface DropHandlerProps {
    event: DragEvent;
    min: number;
    max: number;
    minXPosition: number;
    maxXPosition: number;
    onMinValueChange: (newValue: number) => void;
    onMaxValueChange: (newValue: number) => void;
}

export function dragstartHandler(event: DragEvent) {
    (event?.currentTarget as HTMLElement).classList.add(LITERALS.dragging);
    (event.dataTransfer as DataTransfer).clearData();
    (event.dataTransfer as DataTransfer).dropEffect = "copy";
    (event.dataTransfer as DataTransfer).setData("text", (event.target as HTMLElement).id);
}

export const dragendHandler = (event: DragEvent) => {
    (event?.currentTarget as HTMLElement)?.classList.remove(LITERALS.dragging);
}

export const dragoverHandler = (event: DragEvent) => {
    event.preventDefault();
}

export const dropHandler = ({ event, min, max, minXPosition, maxXPosition, onMinValueChange, onMaxValueChange }: DropHandlerProps) => {
    const dragItemId = (event.dataTransfer as DataTransfer).getData("text");
    const draggedItem = document.getElementById(dragItemId);

    const rangePosition = (event.target as HTMLElement)?.getBoundingClientRect().x;
    const dropPosition = event.pageX;
    const draggedItemPosition = dropPosition - rangePosition;

    if (isValidMovement(dragItemId, dropPosition, minXPosition, maxXPosition)) {
        (draggedItem as HTMLElement).style.left = `${draggedItemPosition}px`;

        const newValue = calculateNewValue(min, max, dropPosition, minXPosition, maxXPosition);
        if (dragItemId === LITERALS.minSelector) onMinValueChange(newValue);
        if (dragItemId === LITERALS.maxSelector) onMaxValueChange(newValue);
    }

}

// functions
const isValidMovement = (dragItemId: string, dropPosition: number, minXPosition: number, maxXPosition: number) => {
    if (hasText(dragItemId) && dragItemId === LITERALS.minSelector && dropPosition > maxXPosition) return false;
    if (hasText(dragItemId) && dragItemId === LITERALS.maxSelector && dropPosition < minXPosition) return false;

    return true;
}

const calculateNewValue = (min: number, max: number, dropPosition: number, minXPosition: number, maxXPosition: number) => {
    const xVariationPercentage = ((dropPosition - minXPosition) * 100) / (maxXPosition - minXPosition);
    const newValue = ((max - min) * xVariationPercentage) / 100;

    return Math.round(newValue);
}

const calculateNewPositionFromValue = (min: number, max: number, minXPosition: number, maxXPosition: number, newInsertedValue: number) => {
    const valueVariationPercentage = (newInsertedValue * 100) / (max - min);
    const newPosition = ((maxXPosition - minXPosition) * valueVariationPercentage) / 100;

    return newPosition;
}

export const onChangeMinValueHandler = (min: number, max: number, minXPosition: number, maxXPosition: number, newValue: number) => {
    if (!isValidValue(min, max, newValue)) return;
    const newPosition = calculateNewPositionFromValue(min, max, minXPosition, maxXPosition, newValue)
    const minSelector = document.getElementById(LITERALS.minSelector);
    (minSelector as HTMLElement).style.left = `${newPosition}px`;
}

export const onChangeMaxValueHandler = (min: number, max: number, minXPosition: number, maxXPosition: number, newValue: number) => {
    if (!isValidValue(min, max, newValue)) return;
    const newPosition = calculateNewPositionFromValue(min, max, minXPosition, maxXPosition, newValue)
    const maxSelector = document.getElementById(LITERALS.maxSelector);
    (maxSelector as HTMLElement).style.left = `${newPosition}px`;
}

const isValidValue = (min: number, max: number, value: number) => {
    return !isNaN(value) && value >= 0 && value >= min && value <= max;
}

const hasText = (str: string) => {
    return typeof str === 'string' && str !== undefined && str !== '';
}