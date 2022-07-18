import React, { useRef, useState, useEffect, Children, useCallback } from "react";
import classNames from "classnames";
import { nextTick } from "process";

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
  // initialIndex?: number;
  /** 指示器触发方式 */
  // trigger?: triggerType;
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动切换的事件间隔， 单位是毫秒, 默认3000 */
  interval?: number;
  /** 指示器位置， 可选值 'outside' | 'none' */
  // indicatorPosition?: indicatorPositionType;
  /** 切换箭头显示的时机， 可选值 'always' | 'hover' | 'never' */
  arrow?: displayArrowTime;
  /** 轮播图的类型，可选值'always' | 'hover' | 'never'*/
  // type?: CarouselType;
  list?: Item[];
  // children?: React.ReactNode;
  /** 是否开启动画 */
  // animation: boolean;
}

export const Carousel: React.FC<CarouselProps> = (props) => {
  const {
    height,
    // initialIndex,
    // trigger,
    autoplay,
    interval,
    // indicatorPosition,
    arrow,
    // type,
    // children,
    // animation,
  } = props;

  const list = [
    { url: 'http://p1.music.126.net/IXb-PeUMyeFDA1KHQraF4Q==/109951167605258627.jpg'},
    { url: 'http://p1.music.126.net/Lju50bXS-hKojXULndnzew==/109951167605266134.jpg'},
    { url: 'http://p1.music.126.net/oDweleFdUs69qYbV1vFvOA==/109951167604823899.jpg'},
    { url: 'http://p1.music.126.net/tSI5IA4Q4oB0nN2voDObfA==/109951167605477857.jpg'},
  ];

  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const [ carouselWidth, setCarouselWidth ] = useState<number>(0);
  // const [ transX, setTransX ] = useState<number>(0);
  const [ timerState, setTimer ] = useState<NodeJS.Timer>();


  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // const timerRef = useRef<NodeJS.Timer || null>();

  useEffect(() => {
    if(carouselRef.current) {
      setCarouselWidth(carouselRef.current.offsetWidth);
    }
  }, [])

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      if(prevIndex === 0) {
        return list.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  }

  const next = () => {
    setCurrentIndex((prevIndex) => {
      if(prevIndex === list.length) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  }

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  }

  const handleMouseEnter = () => {
    clearInterval(timerState);
    setTimer(undefined);
  }
  const handleMouseLeave = () => {
    let timer: NodeJS.Timer;
    if(autoplay) {
      timer = setInterval(() => {
        next();
      }, interval);
      setTimer(timer);
    }
  }

  // 是否自动播放
  useEffect(() => {
    let timer: NodeJS.Timer;
    if(autoplay) {
      timer = setInterval(() => {
        next();
      }, interval);
      setTimer(timer);
    }
    return function() {
      // 清除的是State中保存的定时器，因为中途如果鼠标放到了轮播图上，新开的定时器就变了。导致组件卸载的时候没有清除掉开着的定时器
      // clearInterval(timer);
      clearInterval(timerState);
      setTimer(undefined)
    }
  },[autoplay, interval, next])

  const wrapperStyle = {
    width: `${list.length}00%`,
    transform: `translateX(-${carouselWidth * currentIndex}px)`,
    // transition: `transform 1s ease-in`,
  };

  return (
    <div className="yuan-carousel" ref={carouselRef}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         >
      {/* 通过移动这个容器，来切换轮播图  */}
      <div className={classNames({"trans": currentIndex !== 0 }, "container")} ref={containerRef} style={wrapperStyle}>
        {
          list.map((item, index) => {
            return (
              <img key={index} src={item.url}/>
            )
          })
        }
        <img key={list.length} src={list[0].url}/>
      </div>
      {/* 用两个div来做左右按钮，做成圆形 */}
      <div className="arrow-left" onClick={() => prev()}>&lt;</div>
      <div className="arrow-right" onClick={() => next()}>&gt;</div>
      {/* 下方的小圆点 */}
      <ul className="carousel-dots">
        {
          list.map((item, index) => {
            if(index === 0) {
              const classnames = classNames('carousel-dot', {
                'is-actived': index === currentIndex || currentIndex === list.length,
              })
              return (
                <li key={index} className={classnames} onClick={() => handleClick(index)}></li>
              )
            } else {
              const classnames = classNames('carousel-dot', {
                'is-actived': index === currentIndex,
              })
              return (
                <li key={index} className={classnames} onClick={() => handleClick(index)}></li>
              )
            }
          })
        }
      </ul>
    </div>
  )
};

Carousel.defaultProps = {
  autoplay: true,
  interval: 3000,
}

export default Carousel;