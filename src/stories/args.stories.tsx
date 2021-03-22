import * as React from "react"

export default {
  title: 'Examples'
}

const Template = (props)=> {
  return <div {...props}>{props.children || 'Template'}</div>
}

export const ArgsExample = Template.bind({});
ArgsExample.args = {
  children: 'ArgsExample',
  className: 'args-class'
};