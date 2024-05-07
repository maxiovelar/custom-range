import { type PageUrl, type Link, type RangeType } from "@/_types/types"

export const links: Record<string, Link> = {
    home: {
        href: "/",
        text: "Home",
    },
    menu1: {
        href: "/exercise1",
        text: "Exercise 1",
    },
    menu2: {
        href: "/exercise2",
        text: "Exercise 2",
    },
    github: {
        href: "https://github.com/maxiovelar",
        text: "Maximiliano Ovelar",
    },
    nextjs: {
        href: "https://nextjs.org/",
        text: "Next.js",
    },
};

export const LITERALS = {
    minValue: 'min-value',
    maxValue: 'max-value',
    minSelector: 'min-selector',
    maxSelector: 'max-selector',
    range: 'range',
    progress: 'progress',
    currency: '€',
};

export const pageTitles: Record<PageUrl, string> = {
    home: "Custom Ranges Exercise",
    exercise1: "Normal Range",
    exercise2: "Fixed Values Range",
};

export const paths: Record<RangeType, string> = {
    rangeNormal: "ca276e65-744d-4dc8-82a1-ee073aaf987b",
    fixedValues: "15e130c5-a7bb-40ec-906a-c7f1d1962e39",
}

export const rangeFixedConstants = {
    selectorWidth: 28,
    rangeWidth: 512,
}
