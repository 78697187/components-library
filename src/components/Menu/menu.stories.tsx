import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addDecorator } from "@storybook/react";

import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";


export default {
  title: 'Menu',
  component: Menu,
  argTypes: {
    mode: {
      options: ['horizontal', 'vertical'],
      control: { type: 'inline-radio' },
    }
  }
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
   <Menu {...args}>
          <MenuItem>
            运行
          </MenuItem>
          <MenuItem disabled>
            编译
          </MenuItem>
          <SubMenu title="文件">
            <MenuItem>
              文件1
            </MenuItem>
            <MenuItem>
              文件 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            终端
          </MenuItem>
        </Menu>
)

export const horizontalMenu = Template.bind({});
horizontalMenu.args = {
  mode: 'horizontal',
  defaultOpenSubMenus: ['2'],
  defaultIndex: '0',
  onSelect: (index) => {alert(index)}
}

export const verticalMenu = Template.bind({});
verticalMenu.args = {
  mode: 'vertical',
  defaultOpenSubMenus: ['2'],
  defaultIndex: '0',
  onSelect: (index) => {alert(index)}
}

const styles: React.CSSProperties = {
  // textAlign: 'center',
  // marginTop: '100px',
  // marginRight: '200px',
  display: "flex",
  justifyContent: 'center',
  alignContent: 'center',
  marginBottom: '50px',
}
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
addDecorator(CenterDecorator);