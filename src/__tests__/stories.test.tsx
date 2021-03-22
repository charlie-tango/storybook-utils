import React from "react";
import { testStories } from "../index";

describe("basic glob", () => {
  testStories("./src/**/*.{story,stories}.tsx");
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
