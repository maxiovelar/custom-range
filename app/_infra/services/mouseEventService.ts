const onMouseMove = (event: MouseEvent, range: HTMLElement, mousePosition: number, selector: HTMLElement) => {
    const rangePosition = range.getBoundingClientRect().left;

    let newSelectorPosition = event.clientX - mousePosition - rangePosition;
    if (newSelectorPosition < 0) newSelectorPosition = 0;

    const rightEdge = range.offsetWidth - selector.offsetWidth;
    if (newSelectorPosition > rightEdge) newSelectorPosition = rightEdge;

    selector.style.left = `${newSelectorPosition}px`;
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
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    selector.ondragstart = () => {
        return false;
    };
};
