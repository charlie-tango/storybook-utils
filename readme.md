# @charlietango/storybook-utils

A set of utilities and helpers to power our Storybooks.

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add @charlietango/storybook-utils --dev
```

or NPM:

```sh
npm install @charlietango/storybook-utils --save-dev
```

### Requirements

You will need to have the following peer dependencies installed:

- `react`
- `@testing-library/react`

## Usage

### `testStories`

Automatically test all Storybook stories in your project. Provide `testStories` with a glob (or globs) pointing to all your [CSF](https://storybook.js.org/docs/react/api/csf) storybook files.

**src/**tests**/stories.test.ts**

```ts
import { testStories } from "@charlietango/storybook-utils";

testStories("./src/**/*.{story,stories}.{js,tsx}");
```

#### Options

In addition to the glob, `testStories` also accepts an options object.

| Command           | Description                                                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `customRender`    | Provide a custom render method, instead of the default from @testing-library/react. This is used to apply a fixed set of decorators around all your stories. [https://testing-library.com/docs/react-testing-library/setup#custom-render]() |
| `callback`        | Callback after each `render()`. Use this if you need to perform custom validation. If not defined, a default `await waitFor` call will be made, to ensure stories are fully loaded.                                                         |
| `storybookConfig` | Global configuration from the Storybook - Use this to add decorators around all stories.                                                                                                                                                    |

### `createStoryPath`

This method takes the base from [paths.macro](https://github.com/storybookjs/paths.macro) and, converts it to usable Storybook path.
This is useful to create a `title` for your stories, that reflect their current location.

```tsx
import { createStoryPath } from "../../utils/storybook-utils";
import base from "paths.macro";

export default {
  title: createStoryPath(base),
} as Meta;
```
