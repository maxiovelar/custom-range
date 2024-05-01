'use client';

import React, { useEffect, useState } from 'react';
import styles from './RangeNormal.module.scss';
import {
    hasText,
    onChangeMaxValueHandler,
    onChangeMinValueHandler,
    selectorMoveHandler,
} from '@/_infra/services/mouseEventService';

const LITERALS = {
    minValue: 'min-value',
    maxValue: 'max-value',
    minSelector: 'min-selector',
    maxSelector: 'max-selector',
    range: 'range',
    progress: 'progress',
};

export interface RangeNormalProps {
    min: number;
    max: number;
}

export const RangeNormal = ({ min, max }: RangeNormalProps) => {
    const [inputMinValue, setInputMinValue] = useState<number>(min);
    const [inputMaxValue, setInputMaxValue] = useState<number>(max);
    const [rangeStartPosition, setRangeStartPosition] = useState<number>(0);
    const [rangeEndPosition, setRangeEndPosition] = useState<number>(0);
    const [error, setError] = useState('');

    const handleChangeMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setInputMinValue(newValue);
        onChangeMinValueHandler(min, max, rangeStartPosition, rangeEndPosition, newValue, setError);
    };

    const handleChangeMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setInputMaxValue(newValue);
        onChangeMaxValueHandler(min, max, rangeStartPosition, rangeEndPosition, newValue, setError);
    };

    useEffect(() => {
        const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
        const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
        const range = document.getElementById(LITERALS.range) as HTMLElement;

        const rangeStartPosition = range.getBoundingClientRect().left;
        const rangeWidth = range.offsetWidth - maxSelector.offsetWidth;
        const rangeEndPosition = rangeStartPosition + rangeWidth;
        setRangeStartPosition(rangeStartPosition);
        setRangeEndPosition(rangeEndPosition);

        selectorMoveHandler(minSelector, rangeStartPosition, rangeEndPosition);
        selectorMoveHandler(maxSelector, rangeStartPosition, rangeEndPosition);
    }, []);

    const isError = hasText(error);

    return (
        <div className={styles.wrapper}>
            <input
                type="number"
                id={LITERALS.minValue}
                className={styles.value}
                defaultValue={inputMinValue}
                onChange={handleChangeMinValue}
                min={min}
                max={max}
            />
            <div className={styles.container}>
                <div id={LITERALS.range} className={styles.range}>
                    <div id={LITERALS.progress} className={styles.progress}></div>
                </div>
                <button
                    type="button"
                    id={LITERALS.minSelector}
                    draggable={!isError}
                    className={styles.min}
                    disabled={isError}
                ></button>
                <button
                    type="button"
                    id={LITERALS.maxSelector}
                    draggable={!isError}
                    className={styles.max}
                    disabled={isError}
                ></button>
            </div>
            <input
                type="number"
                id={LITERALS.maxValue}
                className={styles.value}
                defaultValue={inputMaxValue}
                onChange={handleChangeMaxValue}
                min={min}
                max={max}
            />
            {isError && <span className={styles.error}>{error}</span>}
        </div>
    );
};
