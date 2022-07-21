import { string } from "prop-types";
import React, { useEffect, useRef, useState, useCallback, ReactElement } from "react";
import { throttle } from "../utils/throttle";

interface topBlankFillProps {
  paddingTop?: string;
  paddingBottom?: string;
}
interface DataSourceObject {
  key: number;
  value: string;
}
export type DataSourceType<T = {}> = Partial<T & DataSourceObject>
interface VirtualLsitProps {
  /** 虚拟列表展示的列表项的数目 */
  itemNumber: number;
  /** 每个列表项的高度 */
  itemHeight: number;
  /** 数据列表 */
  dataList?: DataSourceType[];
  /** 自定义子元素的渲染样式 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * VirtualList 的核心思想就是在处理用户滚动时，只渲染列表在可视区域的部分
 */
export const VirtualList: React.FC<VirtualLsitProps> = (props) => {
  const { itemNumber, itemHeight, dataList = [], renderOption } = props;

  const [ showList, setShowList ] = useState<DataSourceType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const curContainerHeight = useRef<number>();
  const curViewNum = useRef<number>();
  const topBlankFill = useRef<topBlankFillProps>();
  const then = useRef<number>(0);

  const changeHeight = useCallback(throttle(() => {
    // 容器高度，通过操作dom元素获取高度是因为它不一定是个定值
    // curContainerHeight.current = containerRef.current.offsetHeight; // 包含了内外边框
    curContainerHeight.current = containerRef.current ? containerRef.current.clientHeight : 0;
    // 列表最大数量，考虑到列表中顶部和底部可能都会出现没有展现完的item
    curViewNum.current = Math.ceil(curContainerHeight.current / itemHeight);
    if(showList.length === 0) {
      setShowList(dataList.slice(0, curViewNum.current * 2 - 1));
      topBlankFill.current = {
        // 起始索引就是可视区第一个元素的索引，索引为多少就代表前面有多少个元素
        paddingTop: `${0 * itemHeight}px`,
        // endIndex是我们渲染出来的最后一个元素，可能不在可视区内；用dataListRef最后一个元素的索引与endIndex相减就可以得到还没有渲染元素的数目
        paddingBottom: `${(dataList.length - 1 - curViewNum.current) * itemHeight}px`,
      }
    }
  }, 500), [containerRef.current]);

  useEffect(() => {
    // 组件第一次挂载需要初始化容器的高度以及最大容纳值
    // 因为我们的可视窗口和浏览器大小有关系，所以我们需要监听浏览器大小的变化
    // 当浏览器大小改变之后需要重新执行changeHeight函数计算当前可视窗口对应的最大容纳量是多少
    changeHeight();
    window.addEventListener('resize', changeHeight)
    return () => {
      window.removeEventListener('resize', changeHeight)
    }
  }, [changeHeight]);

  const scrollHandle = () => {
    let startIndex = containerRef.current ? Math.floor(containerRef.current.scrollTop / itemHeight) : 0;
    const containerMaxSize = curViewNum.current ? curViewNum.current : 0;
    /**
     * 解决滑动过快出现的白屏问题：注意endIndex要在startIndex人为改变之前就计算好
     * 因为我们实际上需要三板的数据用于兼容低性能的设备，用做上下滚动的缓冲区域，避免滑动的时候出现白屏
     * 现在的startIndex是可视区的第一个元素索引，再加上2倍可视区元素量，刚好在下方就会多出一板来当做缓冲区
     */
    // 此处的endIndex是为了在可视区域的下方多出一板数据
    let endIndex = startIndex + 2 * containerMaxSize - 1;
    const currLen = dataList.length;
    if(endIndex > currLen - 1) {
      endIndex = currLen - 1;
    }

    // 此处的endIndex是为了在可视区域的上方多出一板数据
    // 这里人为的调整startIndex的值，目的就是为了能够在可视区域上方多出一板来当做缓冲区，这样就不会出现滑动到底部，然后请求太慢导致卡在最下面的情况
    if (startIndex <= containerMaxSize) { // containerMaxSize是我们之前计算出来的容器容纳量
      startIndex = 0
    } else {
      startIndex = startIndex - containerMaxSize
    }
    // 使用slice方法截取数据，但是要记住第二个参数对应的索引元素不会被删除，最多只能删除到它的前一个，所以我们这里的endIndex需要加一
    setShowList(dataList.slice(startIndex, endIndex + 1));

    topBlankFill.current = {
      // 起始索引就是可视区第一个元素的索引，索引为多少就代表前面有多少个元素
      paddingTop: `${startIndex * itemHeight}px`,
      // endIndex是我们渲染出来的最后一个元素，可能不在可视区内；用dataListRef最后一个元素的索引与endIndex相减就可以得到还没有渲染元素的数目
      paddingBottom: `${(dataList.length - 1 - endIndex) * itemHeight}px`,
    }
  }

  // 利用请求动画帧做了一个节流优化
  const boxScroll = () => {
    const now = Date.now();
    /**
     * 这里的等待时间不宜设置过长，不然会出现滑动到空白占位区域的情况
     * 因为间隔时间过长的话，太久没有触发滚动更新事件，下滑就会到padding-bottom的空白区域
     * 电脑屏幕的刷新频率一般是60HZ，渲染的间隔时间为16.6ms，我们的时间间隔最好小于两次渲染间隔16.6*2=33.2ms，一般情况下30ms左右，
     */
    if(now - then.current > 30) {
      then.current = now;
      // 重复调用scrollHandle函数，让浏览器在下一次重绘之前执行函数，可以确保不会出现丢帧现象
      window.requestAnimationFrame(scrollHandle);
    }
  }

    // 自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }

  return (
    <div className='container' style={{height: `${itemNumber * itemHeight}px`}}>
      {/* // 监听滚动事件的盒子，该高度继承了父元素的高度 */}
      <div className='scroll-box' ref={containerRef} onScroll={boxScroll}>
        {/* // 该盒子的高度一定会超过父元素，要实现不了滚动的效果，而且还要动态的改变它的padding值用于控制滚动条的状态 */}
        <div style={topBlankFill.current} className="box">
          {
            showList.map(item => {
              return (
                  <div className='item' key={`${item}`} style={{height: `${itemHeight}`}}>
                    { renderTemplate(item) }
                  </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default VirtualList;