import { LITERALS } from "../constants/constants";

export const setProgressWidth = () => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
    const selectorRadius = minSelector.offsetWidth / 2;
    const progress = document.getElementById(LITERALS.progress) as HTMLElement;
    const range = document.getElementById(LITERALS.range) as HTMLElement;
    const rangePosition = range.getBoundingClientRect().left;
    const minSelectorPosition = minSelector.getBoundingClientRect().left;
    const maxSelectorPosition = maxSelector.getBoundingClientRect().left;

    const progressWidth = maxSelectorPosition - minSelectorPosition;

    if (progressWidth < 0) {
        progress.style.width = '0px';
        progress.style.marginLeft = '0px';
        return
    }

    progress.style.width = `${progressWidth}px`;
    progress.style.marginLeft = `${minSelectorPosition - rangePosition + selectorRadius}px`;
}

// functions
export const isValidMovement = (selector: HTMLElement, newSelectorPosition: number, rangeStartPosition: number) => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;

    const currentMinXPosition = (minSelector.getBoundingClientRect().left - rangeStartPosition);
    const currentMaxXPosition = (maxSelector.getBoundingClientRect().left - rangeStartPosition);

    if (selector.id === LITERALS.minSelector && newSelectorPosition >= currentMaxXPosition) return false;
    if (selector.id === LITERALS.maxSelector && newSelectorPosition <= currentMinXPosition) return false;

    return true;
}