import React, { FC, ReactNode } from "react";
import scopedClass from "../utils/scopedClass";

const sc = scopedClass('yuan-picker-view-layout');


interface HeaderWrap {
  leftElement: ReactNode;
  middleElement: ReactNode;
  rightElement: ReactNode;
}
export interface ViewLayoutProps {
  bodyElement: ReactNode;
  header: HeaderWrap;
  footerElement: ReactNode;
}
export const ViewLayout: FC<ViewLayoutProps> = (props) => {
  const {
    header: {leftElement, middleElement, rightElement},
    bodyElement,
    footerElement,
  } = props;

  return (
    <div className={sc('container')}>
      <div className={sc('header')}>
        <div>{leftElement}</div>
        <div>{middleElement}</div>
        <div>{rightElement}</div>
      </div>
      <div className={sc('body')}>{bodyElement}</div>
      <div className={sc('footer')}>{footerElement}</div>
    </div>
  )
}

ViewLayout.defaultProps = {};
export default ViewLayout;