
import React, { ChangeEvent, KeyboardEvent, useState, ReactElement, useEffect, useRef, useCallback, memo } from "react";
import classNames from "classnames";
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import Transition from "../Transition/transition";
// 自定义hooks
// 防抖
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

// 自定义模板中传入的数据类型不确定
interface DataSourceObject {
  value: string;
}

// 这里如果不用partial会报错。 因为&表示两种类型的联合类型。 而DataSourceObject只有value
export type DataSourceType<T = {}> = Partial<T & DataSourceObject>
// export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 通过输入的字符串，获取、处理数据的函数 */
  AjaxSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 定义选中项的处理函数 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义数据展示模板，需要返回JSX,
   *  传入的数据应该为键值对类型，默认展示item.value
   */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。
 */
export const AutoComplete: React.FC<AutoCompleteProps> = memo((props: AutoCompleteProps) => {
  const {
    AjaxSuggestions,
    onSelect,
    renderOption,
    value,
    ...resProps
  } = props;

  const [ inputValue, setInputValue ] = useState(value as string);
  // 存储下拉框的数据
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [ loading, setLoading ] = useState(false);
  const [ showDropdown, setShowDropdown] = useState(false)
  // 防抖
  const debounceValue = useDebounce(inputValue, 1000);
  // 记录当前高亮的元素index
  const [ highlightIndex, setHighLightIndex ] = useState(-1);
  // 用来标记是否需要重新发送数据请求
  const flagSearch = useRef(false);
  // 用来记录当前的包裹元素，判断点击操作是否发生在当前组件上
  const containerRef = useRef<HTMLDivElement>(null);

  // 自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }

  const dom =(
    <Transition
      in={showDropdown || loading}
      animation="zoom-in-top"
      timeout={300}
      onExited={() => {setSuggestions([])}}
    >
      <ul className="yuan-suggestion-list">
        {
          loading &&
          <div className="suggestions-loading-icon">
            <Icon icon='spinner' spin/>
          </div>
        }
        {
          suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li className={cnames} key={index} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })
        }
      </ul>
    </Transition>
  )

  // 点击当前组件以外的元素，关闭下拉菜单
  useClickOutside(containerRef, () => {
    setSuggestions([]);
  });

  // 数据的请求可以看作是inputvalue改变的副作用
  useEffect(() => {
    if(debounceValue && flagSearch.current) {
      // 先把数据列表清空
      setSuggestions([]);
      // 如果有输入，就请求数据
      console.log('发送请求');
      const results = AjaxSuggestions(debounceValue);
      // 请求数据时，将loading设为true
      // 对数据的请求分为同步和异步，若是异步返回Promise
      if(results instanceof Promise) {
        // 异步请求数据
        // 数据请求完成
        setLoading(true);
        results.then(data=> {
          setLoading(false);
          setSuggestions(data);
          if(data.length > 0) {
            setShowDropdown(true);
          }
        })
      } else {
        // 同步数据
        // 这句话放在else外面会报类型错误，放在这里面ts自动修改了类型
        setSuggestions(results);
        // setShowDropdown(true);
        if(results.length > 0) {
          setShowDropdown(true);
        }
      }


    } else {
      // 如果输入框为空 ，就将suggestions置空
      // setSuggestions([]);
      setShowDropdown(false);
    }
    // 解决上一次搜索结果的高亮显示在新数据中
    setHighLightIndex(-1);
  }, [debounceValue, AjaxSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    //输入框发生输入操作 需要发送请求
    flagSearch.current = true;
  }

  const handleSelect = useCallback((item: DataSourceType) => {
    setInputValue(item.value || '');
    setShowDropdown(false);
    if(onSelect) {
      onSelect(item);
    }
    // 选择操作不需要重新发送请求
    flagSearch.current = false;
  }, [ onSelect ]);

  const highlight = useCallback((index: number) => {
    if(index < 0) index = suggestions.length-1;
    if(index >= suggestions.length) index = 0;
    setHighLightIndex(index);
  }, [ suggestions ])
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    // keyCode属性已弃用
    console.log(e.code);
    switch(e.code) {
      case 'Enter':
        // 存在才执行逻辑， 不然会报错
        if(suggestions[highlightIndex]){
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 'ArrowUp':
        highlight(highlightIndex - 1);
        break;
      case 'ArrowDown':
        highlight(highlightIndex + 1);
        break;
      case 'Escape':
        setInputValue('');
        setShowDropdown(false)
        break;
      default:
        break;
    }
  }, [ highlightIndex, suggestions, handleSelect, highlight ])

  // value 和 defaultValue同时存在于props中会报错
  if('value' in props) {
    delete resProps.defaultValue;
  }

  return (
    <div className="yuan-auto-complete" ref={containerRef}>
      <Input
        value={inputValue ? inputValue : ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...resProps}
      />
      { dom }
    </div>
  )
});

AutoComplete.displayName = 'AutoComplete';

AutoComplete.defaultProps = {
  icon: 'search',
}

export default AutoComplete;