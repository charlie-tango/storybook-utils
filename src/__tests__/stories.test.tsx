import React from "react";
import { testStories } from "../index";
import { render, RenderOptions } from "@testing-library/react";

describe("basic glob", () => {
  testStories("./src/**/*.{story,stories}.tsx");
});
describe("array glob", () => {
  testStories(["./src/**/*.{story,stories}.tsx"]);
});

describe("callback", () => {
  testStories("./src/**/*.{story,stories}.tsx", {
    callback: async (result, details) => {
      if (details.storyName === "Example 1") {
        result.getByText("Example 1");
      }
      if (details.storyName === "Args Example") {
        result.getByText("ArgsExample");
      }
      if (details.storyName === "Alt Example") {
        result.getByText("AltExample");
      }
    },
  });
});

describe("decorators", () => {
  testStories("./src/**/*.{story,stories}.tsx", {
    storybookConfig: {
      decorators: [
        (fn) => (
          <div>
            <h1>Decorator</h1>
            {fn()}
          </div>
        ),
      ],
    },
    callback: (result, details) => {
      result.getByText("Decorator");
    },
  });
});

describe("custom-render", () => {
  const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, "queries">
  ) =>
    render(ui, {
      wrapper: ({ children }) => (
        <div>
          <h1>Render</h1>
          {children}
        </div>
      ),
      ...options,
    });

  testStories("./src/**/*.{story,stories}.tsx", {
    customRender,
    callback: (result, details) => {
      result.getByText("Render");
    },
  });
});
