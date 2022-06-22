
import React, { ChangeEvent, useState, ReactElement, useEffect } from "react";
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import { faL } from "@fortawesome/free-solid-svg-icons";

// 自定义模板中传入的数据类型不确定
interface DataSourceObject {
  value: string;
}

// 这里如果不用partial会报错。 因为&表示两种类型中共有的属性。 而DataSourceObject只有value
export type DataSourceType<T = {}> = Partial<T & DataSourceObject>
// export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 传入数据的筛选函数 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  /** 自定义数据展示模板，需要返回JSX,
   *  传入的数据应该为键值对类型，默认展示item.value
   */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    value,
    ...resProps
  } = props;

  const [ inputValue, setInputValue ] = useState(value as string);
  // 存储下拉框的数据
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [ loading, setLoading ] = useState(false);

  // 自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }

  console.log(suggestions);
  const dom =(
    <ul>
      {
        suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })
      }
    </ul>
  )

  useEffect(() => {
    if(inputValue) {
      // 如果有输入，就请求数据
      const results = fetchSuggestions(inputValue);
      // 请求数据时，将loading设为true
      // 对数据的请求分为同步和异步，若是异步返回Promise
      if(results instanceof Promise) {
        // 数据请求完成
        setLoading(true);
        results.then(data=> {
          setLoading(false);
          setSuggestions(data);
        })
      } else {
        // 这句话放在else外面会报类型错误，放在这里面ts自动修改了类型
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [inputValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value || '');
    setSuggestions([]);
    if(onSelect) {
      onSelect(item);
    }
  }

  if('value' in props) {
    delete resProps.defaultValue;
  }


  return (
    <div className="yuan-auto-complete">
      <Input
        value={inputValue ? inputValue : ''}
        onChange={handleChange}
        {...resProps}
      />
      {loading && <ul><Icon icon='spinner' spin></Icon></ul> }
      { dom }
    </div>
  )
}
AutoComplete.defaultProps = {
  icon: 'search',
}

export default AutoComplete;