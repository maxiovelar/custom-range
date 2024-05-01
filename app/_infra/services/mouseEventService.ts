const LITERALS = {
    minValue: "min-value",
    maxValue: "max-value",
    minSelector: "min-selector",
    maxSelector: "max-selector",
    range: "range",
};

const onMouseMove = (event: MouseEvent, range: HTMLElement, mousePosition: number, selector: HTMLElement) => {
    const rangePosition = range.getBoundingClientRect().left;

    let newSelectorPosition = event.clientX - mousePosition - rangePosition;
    if (newSelectorPosition < 0) newSelectorPosition = 0;

    const rightEdge = range.offsetWidth - selector.offsetWidth;
    if (newSelectorPosition > rightEdge) newSelectorPosition = rightEdge;

    if (isValidMovement(selector, newSelectorPosition, rangePosition)) {
        selector.style.left = `${newSelectorPosition}px`;
        selector.style.cursor = 'grabbing';
    }
};


export const selectorMoveHandler = (selector: HTMLElement, range: HTMLElement) => {
    selector.onmousedown = (event: MouseEvent) => {
        event.preventDefault();

        const selectorPosition = selector.getBoundingClientRect().left;
        const mousePosition = event.clientX - selectorPosition;

        const handleMove = (event: MouseEvent) => {
            onMouseMove(event, range, mousePosition, selector);
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


// functions
const isValidMovement = (selector: HTMLElement, newSelectorPosition: number, rangePosition: number) => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;

    const currentMinXPosition = (minSelector.getBoundingClientRect().left - rangePosition);
    const currentMaxXPosition = (maxSelector.getBoundingClientRect().left - rangePosition);

    if (selector.id === LITERALS.minSelector && newSelectorPosition >= currentMaxXPosition) return false;
    if (selector.id === LITERALS.maxSelector && newSelectorPosition <= currentMinXPosition) return false;

    return true;
}

