import { type PageUrl, type Link, type RangeType } from "@/types/types"

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

export const pageTitles: Record<PageUrl, string> = {
    home: "Custom Ranges Exercise",
    exercise1: "Normal Range",
    exercise2: "Fixed Values Range",
};

export const endpoints: Record<RangeType, string> = {
    normalRange: "ca276e65-744d-4dc8-82a1-ee073aaf987b",
    fixedValues: "948df8dc-397c-4e6c-a7f6-f24f8b54fb7e",
}