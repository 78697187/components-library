import React, { useState, useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, children, className} = props;
  const context = useContext(MenuContext);
  const openSubMenus = context.defaultOpenSubMenus as Array<string>;
  /* 以下逻辑是在menu在vertical状态下默认展开子菜单 */
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
  const [ menuOpen, setOpen ] = useState(isOpend);


  const classes = classNames('menu-item', 'submenu-item', className, {
    'is-actived': context.index === index,
    'is-opend': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })
  /* 这里处理子菜单栏的显示和隐藏 */
  // 点击
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }
  //悬浮
  let timer: NodeJS.Timeout
  const handleMouse = (e: React.MouseEvent, toggle: boolean, time: number) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle)
    }, time);
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true, 200) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false, 300)},
  } : {}

  const renderchildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error('Wraning SubMenu has a child which is not a MenuItem');
      }
    })
    return (
      <CSSTransition
        in={menuOpen}
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </CSSTransition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon={faAngleDown} className="arrow-icon"/>
      </div>
      {renderchildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;