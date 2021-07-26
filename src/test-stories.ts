/* eslint-disable jest/valid-title */
import * as React from "react";
import chalk from "chalk";
import globby from "globby";
import path from "path";
import type { Meta } from "@storybook/react";
import {
  IncludeExcludeOptions,
  isExportStory,
  storyNameFromExport,
} from "@storybook/csf";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { composeStory } from "@storybook/testing-react";
import { GlobalConfig } from "@storybook/testing-react/src/types";

interface StoryCallbackDetails {
  /** A pretty version of the story name, with spaces instead of camelCasing */
  storyName: string;
  /** The file path for the stories */
  pathName: string;
  /**All the meta data for the storybook. This is what is exported on the `default` export in a story */
  meta: Meta;
}

export interface TestStoriesOptions {
  /**
   * Provide a custom render method, instead of the default from @testing-library/react.
   * This is used to apply a fixed set of decorators around all your stories.
   * [https://testing-library.com/docs/react-testing-library/setup#custom-render]()
   * */
  customRender?: (ui: React.ReactElement) => RenderResult;
  /**
   * Callback after each `render()`. Use this if you need to perform custom validation.
   * If not defined, a default `await waitFor` call will be made, to ensure stories are fully loaded.
   * */
  callback?: (
    result: RenderResult,
    details: StoryCallbackDetails
  ) => Promise<void> | void;
  storybookConfig?: GlobalConfig;
}

export function testStories(
  storiesGlob: string | string[],
  options: TestStoriesOptions = {}
) {
  // Find all our relevant CSF stories.
  const stories = globby.sync(storiesGlob);

  /**
   * Map all our stories and perform a test render.
   * This ensures all our stories can render, and aren't dependent on external data.
   * */
  stories.forEach((pathName) => {
    const requirePath = path.join(process.cwd(), pathName);
    const data = require(requirePath);

    // Make sure this file is a valid CSF story
    if (data.default?.title) {
      // We use describe here so we know which file the tests are related to.
      describe(pathName, () => {
        test.each(prepareStories(data, options))(
          chalk`{grey ${data.default.title}} can render {cyan "%s"}`,
          async (storyName, render) => {
            const output = render();

            if (options.callback) {
              await options.callback(output, {
                storyName,
                pathName,
                meta: data.default as Meta,
              });
            } else {
              // eslint-disable-next-line testing-library/no-wait-for-empty-callback
              await waitFor(() => {
                // Wait for the render to be complete, so we handle data being loaded etc.
              });
            }
          }
        );
      });
    }
  });
}

/**
 * Find the stories in a CSF storybook file, removing the `default` and respecting
 * the include/exclude options defined on `default`.
 * */
function filterStories(stories: { default: IncludeExcludeOptions | Object }) {
  return Object.keys(stories).filter(
    (name) =>
      typeof stories[name] === "function" &&
      isExportStory(name, stories.default as IncludeExcludeOptions)
  );
}

/**
 * Prepare the stories from a CSF storybook file to be rendered using `test.each`.
 * It returns an Array containing a name and render method for each story.
 **/
function prepareStories(
  stories: {
    default: Meta;
  },
  options: TestStoriesOptions
) {
  const meta = stories.default;

  return filterStories(stories).map((key) => {
    // Get a pretty name from the story, that we can output instead of the key.
    const name = storyNameFromExport(key);

    return [
      name,
      // Create a render method we can call later, when we want to do the actual rendering.
      () => {
        const story = composeStory(stories[key], meta, options.storybookConfig);

        // Render using our custom @testing-library/react render method
        return (options.customRender ?? render)(React.createElement(story));
      },
    ] as [string, () => RenderResult];
  });
}
