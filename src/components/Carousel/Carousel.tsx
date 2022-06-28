import React, { Children, useState } from "react";
import classNames from "classnames";

export type triggerType = 'click' | 'hover';
export type indicatorPositionType = 'none' | 'outside';
export type displayArrowTime = 'always' | 'hover' | 'never';
export type CarouselType = 'card' | 'flatcard';
interface CarouselProps {
  /** 轮播图高度 */
  height?: number;
  /** 初始状态激活的幻灯片索引，从0开始 */
  initialIndex?: number;
  /** 指示器触发方式 */
  trigger?: triggerType;
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动切换的事件间隔， 单位是毫秒, 默认3000 */
  interval?: number;
  /** 指示器位置， 可选值 'outside' | 'none' */
  indicatorPosition?: indicatorPositionType;
  /** 切换箭头显示的时机， 可选值 'always' | 'hover' | 'never' */
  arrow?: displayArrowTime;
  /** 轮播图的类型，可选值'always' | 'hover' | 'never'*/
  type?: CarouselType;
  children?: React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = (props) => {
  const {
    height,
    initialIndex,
    trigger,
    autoplay,
    interval,
    indicatorPosition,
    arrow,
    type,
    children
  } = props;
  const [ index, setIndex ] = useState(initialIndex);


  return (
    <div>
      {children}
    </div>
  )
};

Carousel.defaultProps = {
  height: 200,
  initialIndex: 0,
  trigger: "hover",
  autoplay: true,
  interval: 3000,
  indicatorPosition: 'none',
  arrow: 'always',
}

export default Carousel;