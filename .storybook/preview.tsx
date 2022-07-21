import "../src/styles/index.scss";
import React from 'react';
import { configure, addDecorator } from "@storybook/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expended: true
  },
}

const styles: React.CSSProperties = {
  textAlign: 'center',
  // marginTop: '100px',
  // marginRight: '200px',
  // display: "flex",
  // justifyContent: 'center',
  // alignContent: 'center',
  // width: '100%',
  // height: '100%',
}
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
addDecorator(CenterDecorator);

// 将 welcome 文档说明置于顶部
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};

configure(loaderFn, module);