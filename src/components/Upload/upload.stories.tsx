import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from '@storybook/addon-actions';

import Upload, { UploadFile } from "./upload";


const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const checkFileSize = (file: File) => {
  const size = Math.round(file.size / 1000);
  if(size > 50) {
    alert(`${size} KB's file is too big`);
    return false;
  }
  return true;
}

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
  // onProgress: action('progress'),
  // onSuccess: action('success'),
  // onError: action('error'),
  // beforeUpload: checkFileSize,
  defaultFileList: defaultFileList,
}