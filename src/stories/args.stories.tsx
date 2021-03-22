import * as React from "react";
import { Story } from "@storybook/react";

export default {
  title: "Examples",
};

const Template: Story = (props) => {
  return <div {...props}>{props.children || "Template"}</div>;
};

export const ArgsExample = Template.bind({});
ArgsExample.args = {
  children: "ArgsExample",
  className: "args-class",
};

export const AltExample = Template.bind({});
AltExample.args = {
  children: "AltExample",
};
