import React, { useState, ChangeEvent, createContext, FC, useRef, memo } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Input from "../Input/input";
import Transition from "../Transition/transition";
import { SelectOptionProps } from "./selectOption";


export interface SelectProps {
  /**  */
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  defaultValue?: string;
  placeholder?: string;
}

type itemType = { key: string, val: string }

interface ISelectedContext {
  index?: string;
  onSelect?: (selectItem: itemType) => void;
  onShowOption?: (value: boolean) => void;
  value?: string;
}
export const SelectContext = createContext<ISelectedContext>({index: "0"});

export const Select: FC<SelectProps> = memo((props: SelectProps) => {
  const {
    disabled,
    children,
    onChange,
    style,
    defaultValue,
    placeholder,
  } = props;

  const [ showOption, setShowOption ] = useState(false);
  const [ inputValue, setInputValue ] = useState(defaultValue || "");

  const selectRef = useRef<HTMLDivElement>(null);

  const handleClick = (item: itemType) => {
    setInputValue(item.val as string);
    onChange && onChange(item.key as unknown as ChangeEvent<HTMLInputElement>);
  }

  const handleShowOption = (value: boolean) => {
    setShowOption(value);
  }
  const passedContext: ISelectedContext = {
    onSelect: handleClick,
    onShowOption: handleShowOption,
    value: inputValue,
  }

  useClickOutside(selectRef, () => setShowOption(false));

  const renderChildren = () => {
    return (
      <Transition in={showOption} animation="zoom-in-top" timeout={300}>
        <ul className="yuan-select-list">
          {
            React.Children.map(children, (child, index) => {
              const childElement = child as React.FunctionComponentElement<SelectOptionProps>;
              return React.cloneElement(childElement, {
                key: index
              });
            })
          }
        </ul>
      </Transition>
    )
  }

  return (
    <div
      style={style}
      className="yuan-select"
      ref={selectRef}
      >
        <SelectContext.Provider value={passedContext}>
          <Input
            style={{ caretColor: "transparent" }}
            onChange={onChange}
            icon="angle-down"
            disabled={disabled}
            placeholder={placeholder}
            onClick={() => setShowOption(true)}
            value={inputValue}
          />
          {renderChildren()}
        </SelectContext.Provider>
      </div>
  )
})

Select.displayName = 'Select';

Select.defaultProps = {
  disabled: false,
};

export default Select;