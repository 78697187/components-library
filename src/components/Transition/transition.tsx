import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  /**
   * 当子元素有动画效果时，赋值为ture
   * 会在子元素外面包裹一层元素，避免动画效果的覆盖
   */
  wrapper?: boolean,
  children?: React.ReactNode,
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    wrapper,
    children,
    classNames,
    animation,
    ...restProps
  } = props;
  return (
    <CSSTransition
      classNames={ classNames ? classNames : animation }
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
      {/* {children} */}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
  wrapper: false,
}

export default Transition;