/* eslint-disable jest/valid-title */
import * as React from "react";
import globby from "globby";
import path from "path";
import type { Meta } from "@storybook/react";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import { GlobalConfig } from "@storybook/testing-react/dist/types";

interface StoryCallbackDetails {
  /** A pretty version of the story name, with spaces instead of camelCasing */
  storyName: string;
  /** The file path for the stories */
  pathName: string;
  /**All the metadata for the storybook. This is what is exported on the `default` export in a story */
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
  const renderFn = options.customRender || render;

  /**
   * Map all our stories and perform a test render.
   * This ensures all our stories can render, and aren't dependent on external data.
   * */
  stories.forEach((pathName) => {
    const requirePath = path.join(process.cwd(), pathName);
    const data = require(requirePath);

    // Make sure this file is a valid CSF story
    if (data.default) {
      // We use describe here, so we know which file the tests are related to.
      describe(pathName, () => {
        const testCases = Object.values(
          composeStories(data, options.storybookConfig)
        ).map((Story) => [
          // @ts-ignore
          Story.storyName!,
          Story,
        ]);
        test.each(testCases)(
          `${pathName} can render "%s"`,
          async (storyName, Story) => {
            // console.log(options)
            const output = renderFn(React.createElement(Story));
            // const output = render(options);

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
