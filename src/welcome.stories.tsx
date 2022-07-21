import React from 'react';
import { storiesOf } from '@storybook/react';
import ReactMarkDown from "react-markdown";
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import Introduction from './introduction.md';

storiesOf('Welcome page', module)
  .add('介绍', () => {
    return (
      <>
        <h1>欢迎来到 component-library 组件库</h1>
        <p>一个 Web 端的 React 组件库</p>
        {/* <h3>安装试试</h3> */}
        {/* <code>
          npm install vikingship --save
        </code> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
          <ReactMarkDown
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
            children={Introduction}
          />
        </div>
      </>
    )
  }, { info : { disable: true }})