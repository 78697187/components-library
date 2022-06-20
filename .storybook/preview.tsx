import "../src/styles/index.scss";
import React from 'react';
import { addDecorator } from "@storybook/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const styles: React.CSSProperties = {
  // textAlign: 'center',
  // marginTop: '100px',
  // marginRight: '200px',
  display: "flex",
  justifyContent: 'center',
  alignContent: 'center',
}
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
addDecorator(CenterDecorator);