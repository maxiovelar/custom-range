"use client";

import React, { useEffect, useState } from "react";
import styles from "./RangeNormal.module.scss";
import {
  dragendHandler,
  dragoverHandler,
  dragstartHandler,
  dropHandler,
  isValidValue,
  onChangeMaxValueHandler,
  onChangeMinValueHandler,
} from "@/_infra/services/dragAndDropService";

const LITERALS = {
  minValue: "min-value",
  maxValue: "max-value",
  minSelector: "min-selector",
  maxSelector: "max-selector",
  range: "range",
};

export interface RangeNormalProps {
  min: number;
  max: number;
}

export const RangeNormal = ({ min, max }: RangeNormalProps) => {
  const [inputMinValue, setInputMinValue] = useState<number>(min);
  const [inputMaxValue, setInputMaxValue] = useState<number>(max);
  const [minXPosition, setMinXPosition] = useState<number>(0);
  const [maxXPosition, setMaxXPosition] = useState<number>(0);

  const handleChangeMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setInputMinValue(newValue);

    if (!isValidValue(min, max, newValue)) setInputMinValue(min);

    onChangeMinValueHandler(min, max, minXPosition, maxXPosition, newValue);
  };

  const handleChangeMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setInputMaxValue(newValue);

    if (!isValidValue(min, max, newValue)) setInputMaxValue(max);

    onChangeMaxValueHandler(min, max, minXPosition, maxXPosition, newValue);
  };

  useEffect(() => {
    const minXPosition =
      document.getElementById(LITERALS.minSelector)?.getBoundingClientRect()
        .x ?? 0;
    const maxXPosition =
      document.getElementById(LITERALS.maxSelector)?.getBoundingClientRect()
        .x ?? 0;

    setMinXPosition(minXPosition);
    setMaxXPosition(maxXPosition);

    const minSelector = document.getElementById(LITERALS.minSelector);
    const maxSelector = document.getElementById(LITERALS.maxSelector);
    const range = document.getElementById(LITERALS.range);

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      dropHandler({
        event,
        min,
        max,
        minXPosition,
        maxXPosition,
        onMinValueChange: setInputMinValue,
        onMaxValueChange: setInputMaxValue,
      });
    };

    minSelector?.addEventListener("dragstart", dragstartHandler);
    minSelector?.addEventListener("dragend", dragendHandler);

    maxSelector?.addEventListener("dragstart", dragstartHandler);
    maxSelector?.addEventListener("dragend", dragendHandler);

    range?.addEventListener("dragover", dragoverHandler);
    range?.addEventListener("drop", handleDrop);

    return () => {
      minSelector?.removeEventListener("dragstart", dragstartHandler);
      minSelector?.removeEventListener("dragend", dragendHandler);
      maxSelector?.removeEventListener("dragstart", dragstartHandler);
      maxSelector?.removeEventListener("dragend", dragendHandler);
      range?.removeEventListener("dragover", dragoverHandler);
      range?.removeEventListener("drop", handleDrop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <input
        type="number"
        id={LITERALS.minValue}
        className="value"
        // defaultValue={inputMinValue}
        value={inputMinValue}
        onChange={handleChangeMinValue}
        min={min}
        max={max}
      />
      <div className={styles.container}>
        <div id={LITERALS.range} className={styles.range}></div>
        <div
          id={LITERALS.minSelector}
          draggable="true"
          className={styles.min}
        ></div>
        <div
          id={LITERALS.maxSelector}
          draggable="true"
          className={styles.max}
        ></div>
      </div>
      <input
        type="number"
        id={LITERALS.maxValue}
        className="value"
        // defaultValue={inputMaxValue}
        value={inputMaxValue}
        onChange={handleChangeMaxValue}
        min={min}
        max={max}
      />
    </div>
  );
};
