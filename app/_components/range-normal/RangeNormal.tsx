'use client';

import React, { useEffect, useState } from 'react';
import styles from './RangeNormal.module.scss';
import {
    onChangeMaxValueHandler,
    onChangeMinValueHandler,
    hasText,
    selectorMoveHandler,
} from '@/_business/rangeNormal';
import { LITERALS } from '@/_constants/constants';
import { setState } from '@/store';

export interface RangeNormalProps {
    min: number;
    max: number;
}

export const RangeNormal = ({ min, max }: RangeNormalProps) => {
    const [inputMinValue, setInputMinValue] = useState<string>(`${min}`);
    const [inputMaxValue, setInputMaxValue] = useState<string>(`${max}`);
    const [error, setError] = useState('');
    const isError = hasText(error);

    useEffect(() => {
        const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
        const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
        const range = document.getElementById(LITERALS.range) as HTMLElement;
        const rangeWidth = range.offsetWidth - maxSelector.offsetWidth;
        const rangeStartPosition = range.getBoundingClientRect().left;

        setState({ type: 'SET_MIN', payload: min });
        setState({ type: 'SET_MAX', payload: max });
        setState({ type: 'SET_RANGE_START_POSITION', payload: rangeStartPosition });
        setState({ type: 'SET_RANGE_END_POSITION', payload: rangeStartPosition + rangeWidth });

        selectorMoveHandler(minSelector, setInputMinValue);
        selectorMoveHandler(maxSelector, setInputMaxValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputMinValue(newValue);
        onChangeMinValueHandler(Number(newValue), setError);
    };

    const handleChangeMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputMaxValue(newValue);
        onChangeMaxValueHandler(Number(newValue), setError);
    };

    return (
        <div className={styles.wrapper}>
            <div>
                <input
                    type="number"
                    id={LITERALS.minValue}
                    aria-label={LITERALS.minValue}
                    className={styles.value}
                    value={inputMinValue}
                    onChange={handleChangeMinValue}
                    min={min}
                    max={max}
                />
                <label htmlFor={LITERALS.minValue} className={styles.label}>
                    {LITERALS.currency}
                </label>
            </div>
            <div className={styles.container}>
                <div id={LITERALS.range} data-testid={LITERALS.range} className={styles.range}>
                    <div id={LITERALS.progress} data-testid={LITERALS.progress} className={styles.progress}></div>
                </div>
                <button
                    type="button"
                    id={LITERALS.minSelector}
                    aria-label={LITERALS.minSelector}
                    draggable={!isError}
                    className={styles.min}
                    disabled={isError}
                ></button>
                <button
                    type="button"
                    id={LITERALS.maxSelector}
                    aria-label={LITERALS.maxSelector}
                    draggable={!isError}
                    className={styles.max}
                    disabled={isError}
                ></button>
            </div>
            <div>
                <input
                    type="number"
                    id={LITERALS.maxValue}
                    aria-label={LITERALS.maxValue}
                    className={styles.value}
                    value={inputMaxValue}
                    onChange={handleChangeMaxValue}
                    min={min}
                    max={max}
                />
                <label htmlFor={LITERALS.maxValue} className={styles.label}>
                    {LITERALS.currency}
                </label>
            </div>
            {isError && <span className={styles.error}>{error}</span>}
        </div>
    );
};
