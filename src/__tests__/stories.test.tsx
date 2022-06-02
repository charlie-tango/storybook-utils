import React from "react";
import { testStories } from "../index";
import { render, RenderOptions } from "@testing-library/react";

describe("globs", () => {
  testStories("./src/**/*.{story,stories}.tsx");
  testStories(["./src/**/*.{story,stories}.tsx"]);
});

describe("callback", () => {
  testStories("./src/**/*.{story,stories}.tsx", {
    callback: async (result, details) => {
      if (details.storyName === "Example 1") {
        result.getByText("Example 1");
      }
      if (details.storyName === "Lazy Mount") {
        result.getByText("mounted");
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
        (fn: any) => (
          <div>
            <h1>Decorator</h1>
            {fn()}
          </div>
        ),
      ],
    },
    callback: (result) => {
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
    callback: (result) => {
      result.getByText("Render");
    },
  });
});
