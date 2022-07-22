import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Progress, { ProgressProps } from "./progress";

export default {
  title: 'Progress',
  component: Progress,
  argTypes: {
  },
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <div style={{width: '400px'}}>
    <Progress {...args}></Progress>
  </div>
);

export const primaryProgress = Template.bind({});
primaryProgress.args = {
  percent: 35,
  strokeHeight: 20,
  showText: true,
  theme: 'primary',
}

export const circleProgress = Template.bind({});
circleProgress.args = {
  percent: 35,
  strokeHeight: 20,
  showText: true,
  theme: 'primary',
  width: 200,
  circle: true,
}
