# TypeScript Node Template

This is a template project for creating a TypeScript Node.js application with Prettier, ESLint, and Husky.

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

- Node.js (version X.X.X or higher)
- npm (version X.X.X or higher)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/kyleyasumiishi/typescript-node-template.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Reset to be your own repo
      to learn more about how to reset the git repo to be your own repo [click here](./github/reset) or run this command
      ```bash
         ./github/retry --help
      ```
      for most users just run this command
      ```bash
         ./github/retry -r <your-repo-url>
      ```



## Enforcment

This project enforces the following rules:

- [Prettier](#prettier)
- [ESLint](#eslint)
- [Husky](#husky)
- [vitest](#testing)

### Prettier

[Prettier](https://prettier.io/) is a code formatter that helps maintain consistent code style across your project. It automatically formats your code based on a set of predefined rules.

To use Prettier in your project, follow these steps:

1. open the `.prettierrc` file in the root of your project. This file will contain the configuration for Prettier. Here's an example of a `.prettierrc` file:

   ```json
   {
     "printWidth": 80,
     "tabWidth": 2,
     "singleQuote": true,
     "trailingComma": "es5",
     "semi": true
   }
   ```

   You can customize the formatting rules according to your preferences. Refer to the [Prettier documentation](https://prettier.io/docs/en/configuration.html) for a full list of available options.

2. Configure your code editor to format files using Prettier. Most popular code editors have extensions or built-in support for Prettier. Install the appropriate extension for your editor and enable it.

3. Run Prettier to format your code. You can run Prettier manually on specific files or use it as part of your build process. Here's an example of running Prettier using the command line:

   ```bash
   npm run pretty
   ```

   This command formats all files in the current directory and its subdirectories.

By following these steps, you can ensure consistent code formatting across your project using Prettier.

### ESLint

[ESLint](https://eslint.org/) is a popular JavaScript linter that helps identify and fix common coding errors and enforce consistent code style. It analyzes your code based on a set of predefined rules and provides feedback on potential issues.
To use ESLint in your project, follow these steps:

1.  Configure ESLint by creating an `.eslintrc.cjs` file in the root of your project. This file will contain the ESLint configuration. checkout our explample [`.eslintrc.cjs`](.eslintrc.cjs) file:
    You can customize the ESLint rules according to your project's requirements. Refer to the [ESLint documentation](https://eslint.org/docs/user-guide/configuring) for a full list of available options.
2.  Integrate ESLint with your code editor. Most popular code editors have extensions or built-in support for ESLint. Install the appropriate extension for your editor and enable it.
3.  Run ESLint to analyze your code. You can run ESLint manually on specific files or use it as part of your build process. Here's an example of running ESLint using the command line:
    ```bash
    npm run lint
    ```
    This command analyzes all JavaScript files in the current directory and its subdirectories.

    By following these steps, you can leverage ESLint to catch potential errors and enforce consistent code style in your project.

### Husky

[Husky](https://typicode.github.io/husky/#/) is a Git hook manager that allows you to run scripts at specific points in your Git workflow. It helps automate tasks such as running tests, linting code, and formatting files before committing or pushing changes.
To use Husky in your project, follow these steps:

1. Configure Husky by editing the [`.husky/pre-commit`](.husky/pre-commit) file. Here's an example:

   ```bash
   . "$(dirname "$0")/_/husky.sh"

   npm run lint
   npm run pretty
   npm run test
   ```

   This configuration sets up Husky to run the `lint` script before committing changes and the `test` script before pushing changes. You can customize the hooks and scripts according to your project's requirements.

2. Run Git commands as usual. Husky will automatically trigger the specified scripts at the appropriate Git hooks.
   By using Husky, you can ensure that important tasks are automatically executed at the right moments in your Git workflow.

### Testing

To run tests for this project, you can use the `vitest` library. `vitest` is a powerful testing framework for TypeScript projects. It provides a simple and intuitive API for writing tests and comes with built-in support for assertions, test runners, and code coverage.

To get started with `vitest`, follow these steps:

2. Write your tests using the `vitest` API. Here's an example:

   ```typescript
   import { describe, expect, test } from 'vitest';

   describe('main', () => {
     test('should __TEST__', () => {
       const a = 5;
       const b = 5;
       expect(a).toBe(b);
     });
   });
   ```

   You can write as many tests as you need, covering different scenarios and edge cases.
   create all tests inside `/tests` folder and use the extension `.test.ts`

For more information on how to use `vitest`, you can refer to the [official documentation](https://vitest.dev/docs).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
