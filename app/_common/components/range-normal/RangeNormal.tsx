'use client';

import React, { useEffect, useState } from 'react';
import styles from './RangeNormal.module.scss';
import {
    onChangeMaxValueHandler,
    onChangeMinValueHandler,
    hasText,
    selectorMoveHandler,
} from '@/_infra/services/mouseEventService';
import { LITERALS } from '@/_common/constants/constants';
import { setState } from '@/store';

export interface RangeNormalProps {
    min: number;
    max: number;
}

export const RangeNormal = ({ min, max }: RangeNormalProps) => {
    const [inputMinValue, setInputMinValue] = useState(min);
    const [inputMaxValue, setInputMaxValue] = useState(max);

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

    const [error, setError] = useState('');

    const handleChangeMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setInputMinValue(newValue);
        onChangeMinValueHandler(newValue, setError);
    };

    const handleChangeMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setInputMaxValue(newValue);
        onChangeMaxValueHandler(newValue, setError);
    };

    const isError = hasText(error);

    return (
        <div className={styles.wrapper}>
            <div>
                <input
                    type="number"
                    id={LITERALS.minValue}
                    className={styles.value}
                    defaultValue={inputMinValue}
                    onChange={handleChangeMinValue}
                    min={min}
                    max={max}
                />
                <label htmlFor={LITERALS.minValue} className={styles.label}>
                    {LITERALS.currency}
                </label>
            </div>
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
            <div>
                <input
                    type="number"
                    id={LITERALS.maxValue}
                    className={styles.value}
                    defaultValue={inputMaxValue}
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
