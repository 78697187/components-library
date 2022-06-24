import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from '@storybook/addon-actions';

import Upload from "./upload";

export default {
  title: 'Upload',
  component: Upload,
  argTypes: {

  }
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args}></Upload>

export const DefaultUpload = Template.bind({});
DefaultUpload.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  onProgress: action('progress'),
  onSuccess: action('success'),
  onError: action('error'),
}