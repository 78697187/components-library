import React from "react";
import { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
  /** 百分比 */
  percent: number;
  /** 进度条的高度 */
  strokeHeight?: number;
  /** 是否显示百分比, 默认显示 */
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props

  return (
    <div className="yuan-progress-bar" style={styles}>
      <div className="yuan-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div
          className={`yuan-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  percent: 0,
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}

export default Progress;