import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import Select, { SelectProps } from "./select";
import Option from "./selectOption";

export default {
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const BaseSelect = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Select style={{ width: 300 }} placeholder="请选择" defaultValue="苹果 🍎">
        <Option value="苹果 🍎">苹果 🍎</Option>
        <Option value="橘子 🍊">橘子 🍊</Option>
        <Option value=" 葡萄 🍇">葡萄 🍇</Option>
        <Option value="西瓜 🍉">西瓜 🍉</Option>
        <Option value="香蕉 🍌"> 香蕉 🍌</Option>
        <Option value="草莓 🍓">草莓 🍓</Option>
        <Option value="猕猴桃 🥝">猕猴桃 🥝</Option>
      </Select>
    </div>
  );
};

const _default: Story<SelectProps> = () => <BaseSelect />;

export const Primary = _default.bind({});

Primary.args = {
  defaultValue: "橘子 🍊",
  disabled: false,
};
