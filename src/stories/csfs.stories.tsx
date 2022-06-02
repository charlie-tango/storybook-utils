import * as React from "react";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "Examples",
  render: (props) => <div {...props}>{props.children || "Template"}</div>,
} as ComponentMeta<any>;

export const ArgsExample = {
  args: {
    children: "ArgsExample",
    className: "args-class",
  },
};

export const AltExample = {
  args: {
    children: "AltExample",
  },
};
