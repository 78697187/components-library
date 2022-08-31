import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";

export type triggerType = 'click' | 'hover';
export type indicatorPositionType = 'none' | 'outside';
export type displayArrowTime = 'always' | 'hover' | 'never';
export type CarouselType = 'card' | 'flatcard';
interface Item {
  /** 图片地址 */
  url: string;
  /** 图片的alt属性 */
  alt?: string;
}
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
  list?: Item[];
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
  } = props;
  const list = props.list || [];
  if(list.length === 0){
    console.warn("The length of list shouldn't be less than 1");
  }
  const containerRef = useRef<HTMLDivElement>(null);
  const [ containerWidth, setContrainerWidth ] = useState<number>(0);
  const [ currentIndex, setCurrentIndex ] = useState(initialIndex || 0);
  const arrowclass = classNames('arrow', `arrow-${arrow}`);

  useEffect(() => {
    if(containerRef.current) {
      setContrainerWidth(containerRef.current.offsetWidth)
      console.log(containerWidth)
    }
  }, [list.length])

  const carouselItem = list.map((item, index) => {
    const url = item.url;
    const item_img_class = classNames('carousel-item', {
      'is-actived': index === currentIndex,
    })
    return (
      <li
        key={index}
        className={item_img_class}
      ><img src={url}/></li>
    )
  })


  const wrapperStyle = {
    width: `${list.length}00%`,
    transform: `translateX(-${containerWidth * currentIndex}px)`,
    transition: `transform 1s ease-in`,
  }

  // 切换页面的函数
  const handleChange = (isNext: boolean) => {
    if(isNext) {
      if(currentIndex < list.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    } else {
      if(currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentIndex(list.length - 1);
      }
    }
  }

  return (
    <div className="yuan-carousel-container" ref={containerRef}>
      <ul className="img" style={wrapperStyle}>
        { carouselItem }
      </ul>

      <ul className="pointer">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="arrow-l" onClick={() => handleChange(false)}>&lt;</div>
      <div className="arrow-r" onClick={() => handleChange(true)}>&gt;</div>
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