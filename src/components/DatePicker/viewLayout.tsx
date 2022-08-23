import React, { FC, ReactNode } from "react";

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
    <div className="yuan-picker-view-layout">
      <div className="yuan-picker-view-header">
        <div>{leftElement}</div>
        <div>{middleElement}</div>
        <div>{rightElement}</div>
      </div>
      <div className="yuan-picker-view-body">{bodyElement}</div>
      <div className="yuan-picker-view-footer">{footerElement}</div>
    </div>
  )
}

ViewLayout.defaultProps = {};
export default ViewLayout;