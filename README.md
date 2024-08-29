# Web Crawler - FRONT

## Why Next?

React's own documentation nowadays directly recommends using a framework from the start. [See React doc](https://react.dev/learn/start-a-new-react-project).
Among the available frameworks, Next.js is one of the most widely used, which implies a strong community contributing to it and makes onboarding new team members easier. Compared to base React, it offers important features such as server-side rendering, image optimization, and out-of-the-box routing.

## Use of Conventional Commits

[See Conventional Commits doc](https://www.conventionalcommits.org/en/v1.0.0/)
As the documentation says:

- It helps making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.
- Communicating the nature of changes.

## Atomic design - "Designing by components"

[See Brad Frost creator blog](https://bradfrost.com/blog/post/atomic-web-design/)
Its a methodology for creating design systems.
Although Atomic Design traditionally has five levels, I have decided to group some of these levels to streamline the process. Here is the simplified structure I am using:

1. Atoms: These are the smallest building blocks of the UI, such as buttons, input fields, and icons. They should be atomic and dont be coupled to global state or APIs, etc.
2. Molecules: This level encompasses both molecules and organisms, representing slightly more complex components formed by combining atoms, such as form groups, cards, and navigation bars. Given that this inlcudes organisms as well these buildings blocks can start having interaction with state, APIs, etc. and be more feature specific.
3. Views: This combines templates and pages into a single level, focusing on larger, complete sections of the application, such as full-page layouts and complex views. Most of global state, hooks, APIs interaction should happen here.

This simplification helps in managing and organizing components more effectively while still adhering to the principles of Atomic Design.

## Dependencies

### classnames

A simple JavaScript utility for conditionally joining classNames together. [See classname Doc](https://www.npmjs.com/package/classnames)
Makes writing classnames simple and cleaner.

### axios

Use of axios instance: Axios instance, helps you set default configuration options such as base URLs, timeouts, and headers, making it easier to reuse and maintain consistent settings across multiple requests.

### tanstack-query

Data-fetching library. Usefull features used here:

- Provides handling for error, fetching, loading status.
- Handle query catching

In this case given the simplicity of the data management it can be use as a global data store avoiding duplication of data like what would happen if you would use react-query + state management library
