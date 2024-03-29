import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AutoComplete, { DataSourceType } from './autoComplete';

interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export default {
  title: 'AutoComplete',
  component: AutoComplete,
  argTypes: {
  }
} as ComponentMeta<typeof AutoComplete>;

// const SimpleComplete = () => {
//   // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
//   //     'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
//   // const lakersWithNumber = [
//   //   {value: 'bradley', number: 11},
//   //   {value: 'pope', number: 1},
//   //   {value: 'caruso', number: 4},
//   //   {value: 'cook', number: 2},
//   //   {value: 'cousins', number: 15},
//   //   {value: 'james', number: 23},
//   //   {value: 'AD', number: 3},
//   //   {value: 'green', number: 14},
//   //   {value: 'howard', number: 39},
//   //   {value: 'kuzma', number: 0},
//   // ]
//   // const handleFetch = (query: string) => {
//   //   return lakers.filter(item => item.includes(query)).map(name => ({value: name}));
//   // };
//   // const handleFetch = (query: string) => {
//   //   return lakersWithNumber.filter(player => player.value.includes(query))
//   // }
//   // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
//   //   return (
//   //     <>
//   //       <h4>Name: {item.value}</h4>
//   //     </>
//   //   )
//   // }
//   // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
//   //   return (
//   //     <>
//   //       <h4>Name: {item.value}</h4>
//   //       <p>Number: {item.number}</p>
//   //     </>
//   //   )
//   // }
//   const handleFetch = (query: string) => {
//     return fetch(`https://api.github.com/search/users?q=${query}`)
//       .then(res => res.json())
//       .then(({ items }) => {
//         // console.log(items)
//         return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
//       })
//   }
//   const renderOption = (item: DataSourceType<GithubUserProps>) => {
//     return (
//       <>
//         <h6>Name: {item.login}</h6>
//         <p>url: {item.url}</p>
//       </>
//     )
//   }

//   return (
//     <AutoComplete
//       AjaxSuggestions={handleFetch}
//       placeholder={'请输入查询内容'}
//       onSelect={action('selected')}
//       renderOption={renderOption}
//     />
//   )
// }

// const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args}></AutoComplete>;
/** 当前实例默认从github上请求数据 */
// export const autoComplete: ComponentStory<typeof AutoComplete> = SimpleComplete.bind({});

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({ items }) => {
      // console.log(items)
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    })
}

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}
const hStyle = {
  width: '80px',
  TextAlign: 'start',
  WhiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}
const pStyle = {
  WhiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}
const renderOption = (item: DataSourceType<GithubUserProps>) => {
  return (
    <div style={itemStyle}>
      <h6 style={hStyle}>{item.login}</h6>
      <a style={pStyle}>url: {item.url}</a>
    </div>
  )
}

const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete style={{width: '500px'}} {...args}></AutoComplete>;

export const DemoautoComplete = Template.bind({});
DemoautoComplete.args = {
  AjaxSuggestions: handleFetch,
  placeholder: '请输入查询内容',
  onSelect: action('selected'),
  renderOption: renderOption,
}
