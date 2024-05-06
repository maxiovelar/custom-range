'use client';

import React, { useEffect, useState } from 'react';
import styles from './RangeFixedValues.module.scss';
import { LITERALS } from '@/_common/constants/constants';
import { setState } from '@/store';
import { selectorMoveHandler } from '@/_services/rangeFixedService';

export interface RangeFixedValuesProps {
    rangeValues: number[];
}

export const RangeFixedValues = ({ rangeValues }: RangeFixedValuesProps) => {
    const [labelMinValue, setLabelMinValue] = useState<number>(rangeValues.at(0) ?? 0);
    const [labelMaxValue, setLabelMaxValue] = useState<number>(rangeValues.at(-1) ?? 0);

    useEffect(() => {
        const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
        const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
        const range = document.getElementById(LITERALS.range) as HTMLElement;
        const rangeWidth = range.offsetWidth - maxSelector.offsetWidth;
        const rangeStartPosition = range.getBoundingClientRect().left;

        setState({ type: 'SET_RANGE_VALUES', payload: rangeValues });
        setState({ type: 'SET_RANGE_START_POSITION', payload: rangeStartPosition });
        setState({ type: 'SET_RANGE_END_POSITION', payload: rangeStartPosition + rangeWidth });

        selectorMoveHandler(minSelector, setLabelMinValue);
        selectorMoveHandler(maxSelector, setLabelMaxValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles['value-container']}>
                <span className={styles.value}>{labelMinValue}</span>
                <label className={styles.label}>{LITERALS.currency}</label>
            </div>
            <div className={styles.container}>
                <div id={LITERALS.range} data-testid={LITERALS.range} className={styles.range}>
                    <div id={LITERALS.progress} className={styles.progress}></div>
                </div>
                <button
                    type="button"
                    id={LITERALS.minSelector}
                    aria-label={LITERALS.minSelector}
                    draggable={true}
                    className={styles.min}
                ></button>
                <button
                    type="button"
                    id={LITERALS.maxSelector}
                    aria-label={LITERALS.maxSelector}
                    draggable={true}
                    className={styles.max}
                ></button>
            </div>
            <div className={styles['value-container']}>
                <span className={styles.value}>{labelMaxValue}</span>
                <label className={styles.label}>{LITERALS.currency}</label>
            </div>
        </div>
    );
};
