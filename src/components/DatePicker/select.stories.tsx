import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputDatePicker from "./inputDatePicker";
import { actions } from "@storybook/addon-actions";

export default {
  title: 'DatePicker',
  component: InputDatePicker,
} as ComponentMeta<typeof InputDatePicker>;

const Template: ComponentStory<typeof InputDatePicker> = (args) => <InputDatePicker {...args}/>;

export const defaultDatePicker = Template.bind({});
defaultDatePicker.args = {
  onChange: () => actions("onChange"),
}
