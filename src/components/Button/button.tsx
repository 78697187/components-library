import React, { forwardRef } from "react";
import classNames from "classnames";

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
  className?: string;
  /** 设置button是否可用 */
  disabled?: boolean;
  size?: ButtonSize;
  /**
   * 设置button的类型
   * type是原生属性
   */
  btnType?: ButtonType;
  // children?: React.ReactNode;
  href?: string;
}
/*
  问题是上面的Baseprops属性有限， 很多button的原生属性都没有，如:onclick
  使用react提供的接口和 typescript的联合属性 & 将props合并
*/
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
/* 问题：将两个属性合并之后，有些button属性又是必须填写的。但是如果是链接，没有这些属性，
  所以使用typescript的Partial，将这些属性都设置成可选的 */
export type ButtonPorps = Partial<NativeButtonProps & AnchorButtonProps>;
export const Button: React.FC<ButtonPorps> = forwardRef<HTMLButtonElement, ButtonPorps>((props: ButtonPorps, ref) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props

  const classes = classNames('yuangb-btn', className,{
    // key是变化的，采用中括号写法
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })

  if (btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
        ref={ref}
      >
        {children}
      </button>
    )
  }
})

Button.displayName = 'Button';

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
};

export default Button;