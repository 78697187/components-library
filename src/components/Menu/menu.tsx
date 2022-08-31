import React, { useState, createContext, useCallback } from "react";
import classNames from "classnames";

import { MenuItemProps } from './menuItem';

export type MenuMode = 'horizontal' | 'vertical';  // 字符串字面量
type SelectCallback = (selectedIndex: string) => void
// interface SelectCallback {
//   (selectedIndex: string) :void
// }
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
  defaultOpenSubMenus?: string[];
}
// Context的形状
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: "0"});
const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus
  } = props;
  const [ currentActive, setCurrentActive ] = useState(defaultIndex);
  const classes = classNames('yuangb-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  // 避免context.provider的value值改变，导致所有消费value值的子组件产生不必要的渲染
  const handleClick = useCallback((index: string) => {
    setCurrentActive(index);
    if(onSelect) {
      onSelect(index);
    }
  }, [onSelect]);

  // 传递给子组件的context
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // child为React.ReactNode类型，没有type属性
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type;
      if(displayName === 'MenuItem'  || childElement.type.displayName === 'SubMenu') {
        // 给子组件自动添加index属性
        return React.cloneElement(childElement, {
          index: index.toString()
        });
      } else {
        console.error("wraning: Menu has a child which is not a MenuItem or SubMenu");
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: "0",
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu;