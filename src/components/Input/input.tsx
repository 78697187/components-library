import React, { ReactElement, InputHTMLAttributes } from "react";
import classNames from "classnames";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';
/*
  InputHTMLAttributes内置的有size属性，和这里的size属性冲突
  两种解决方案：
     1. 这里的size换一个名称
     2. 使用Typescript内置的Omit方法，移除/忽略接口中的一个值
*/
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'component-library'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: React.FC<InputProps> = (props) => {
  // 取出各种属性
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    style,
    ...restProps
  } = props

  // 根据属性计算不同的 calssName
  const classes = classNames('yuangb-input-wrapper', className, {
    'is-disabled': disabled,
    [`input-size-${size}`]: size,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })

  return (
    // 根据属性判断是否要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="yuan-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper">{<Icon icon={icon} title={`title-${icon}`}/>}</div>}
      <input
        className="input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="yuan-input-group-append">{append}</div>}
    </div>
  )
}
Input.defaultProps = {
  size: "sm",
  style: {
    width: '300px'
  }
}

export default Input;