import React from "react";
import classNames from "classnames";

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';

export interface ProgressProps {
  /** 百分比 */
  percent: number;
  /** 进度条的高度 */
  strokeHeight?: number;
  /** 是否显示百分比, 默认显示 */
  showText?: boolean;
  /** 自定义样式 */
  styles?: React.CSSProperties;
  /** 主题 */
  theme?: ThemeProps;
  /**
   * 圆形进度条
   */
  circle?: boolean;
  /**
   * 最大值
   */
  max?: number;
  className?: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * 环形进度条的宽度
   */
  width?: number;
}

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight = 10,
    showText,
    styles,
    theme,
    circle,
    max = 100,
    className,
    unit = '%',
    width = 0,
  } = props

  let offset = 0
  const cx = width / 2;
  const cy = width / 2;
  const radius = (width - strokeHeight) / 2;
  const perimeter = 2 * +radius * Math.PI;

  offset = ( max - percent ) / max;
  const op = offset * perimeter;
  const text = percent <= max ? (percent <= 0 ? 0 : percent) : max;


  if(circle) {
    return (
      <div className='yuan-circle-wrapper'
           style={{...styles, width: width, height: width}}>
        <svg className={classNames('circle-svg', className)}
             viewBox={`0 0 ${width} ${width}`}
             width={width}
             height={width}>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeHeight}
            className='circle-bg'
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeHeight}
            className={`circle-inner-bg color-${theme}`}
            strokeDashoffset={op >= 0 ? op : 0}
            strokeDasharray={perimeter}
          />
        </svg>
        {showText && (
          <div
            className='circle-text'
          >{`${text}${unit}`}</div>
        )}
      </div>
    )
  } else {
    return (
      <div className="yuan-progress-bar" style={styles}>
        <div className="yuan-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
          <div
            className={`yuan-progress-bar-inner color-${theme}`}
            style={{width: `${percent}%`}}
          >
            {showText && <span className="inner-text">{`${text}`}</span>}
          </div>
        </div>
      </div>
    )
  }

}

Progress.defaultProps = {
  percent: 0,
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
  circle: false,
  max: 100,
  unit: '%',
}

export default Progress;