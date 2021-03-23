import { createStoryPath } from "../story-paths";

test("create usable storybook paths", () => {
  expect(createStoryPath("./src/components/Header")).toBe("components/Header");
  expect(createStoryPath("/components/Header")).toBe("components/Header");
  expect(createStoryPath("components/Header")).toBe("components/Header");
});
