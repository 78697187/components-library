import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from './input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args}></Input>;

export const defaultInput = Template.bind({});
defaultInput.args = {
  disabled: false,
  size: 'lg',
  placeholder: '请输入账号',
}

export const SearchInput = Template.bind({});
SearchInput.args = {
  disabled: false,
  size: 'lg',
  icon: 'search',
  placeholder: '请输入要搜索的内容',
}