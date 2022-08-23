import VirtualList, { DataSourceType } from "./virtuallist";
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';


const datalist = function(number:number):LakerProps[] {
  const datalist = [];
  for(let i = 0; i < number; i++) {
    const res = { key: i, value: `${i}` }
    datalist.push(res);
  }

  return datalist;
}

interface LakerProps {
  key: number;
  value: string;
}

export default {
  title: 'VirtualList',
  component: VirtualList,
  argTypes: {
  }
} as ComponentMeta<typeof VirtualList>;

const renderOption = (item: DataSourceType<LakerProps>) => {
  return (
    <div style={{width: '500px'}}>
      列表元素 - {item.value}
    </div>

  )
}

const Template: ComponentStory<typeof VirtualList> = (args) => (
  <div style={{ height:'200px' }}>
    <VirtualList {...args}></VirtualList>
  </div>
);
export const DemoautoComplete = Template.bind({});
DemoautoComplete.args = {
  itemNumber: 10,
  itemHeight: 20,
  dataList: datalist(100),
  renderOption: renderOption,
}