# Custom Range App

This is a Front-End application to create a range component from scratch.

## Running the App

To run the app, use the following commands:

1. Clone the .envExample file to .env.local
2. Set the environment variables

```
NEXT_PUBLIC_API_BASE_URL=https://run.mocky.io/v3/

```

3. To run the app, execute the following commands:

```
npm install
npm run dev
```

## External mocked APIs

`https://run.mocky.io/v3/ca276e65-744d-4dc8-82a1-ee073aaf987b`

Returns:

```
{
    "data": {
        "min": 1,
        "max": 100
    }
}
```

`https://run.mocky.io/v3/15e130c5-a7bb-40ec-906a-c7f1d1962e39`

Returns:

```
{
    "data": {
        "fixedValues": [
            1.99,
            5.99,
            10.99,
            30.99,
            50.99,
            70.99
        ]
    }
}
```

## Project Overview

This project is a NextJS + TypeScript app. It uses ESLint for linting and Jest for testing. The app includes server and client components.
It also contains SCSS modules for styling.

### User Interface

The app features a clean and intuitive user interface, developed to be used with dark and light themes. The range component is designed to be user-friendly and accessible, with a responsive layout that adapts from medium size and up screens.

### Modern Technologies

Built with modern technologies such as NextJS v14.2.3, and TypeScript, the app leverages the latest web development tools.

### Potential for Improvement

-   **Testing Coverage**: Extend the testing coverage to ensure robustness and reliability, potentially including tests to validate all the events and user interactions.

-   **Fixed Values Range**: Implement a feature to allow the user to select a range of fixed values in the Exercise2 page.

For more details, refer to the individual files in the codebase.
