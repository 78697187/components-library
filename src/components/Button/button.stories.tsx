// import React from "react";
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import Button from "./button";


// const defaultButton = () => (
//   <Button onClick={action('clicked')}>default button</Button>
// );

// storiesOf('Button Component', module)
//   .add('默认 Button', defaultButton);
import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from "./button";

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    btnType: {
      options: ['primary', 'default', 'danger', 'link'],
      control: { type: 'inline-radio' },
    },
    size: {
      options: ['lg', 'sm'],
      control: { type: 'inline-radio'},
    }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}></Button>;

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  btnType: 'primary',
  children: 'primary Button',
}

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  btnType: 'default',
  children: 'default Button',
}

export const Danger = Template.bind({});
Danger.args = {
  disabled: false,
  btnType: 'danger',
  children: 'default Button',
}

export const Link = Template.bind({});
Link.args = {
  disabled: false,
  btnType: 'link',
  children: 'link',
}
