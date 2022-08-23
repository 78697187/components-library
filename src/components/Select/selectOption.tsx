import React, { FC, useContext, useState, MouseEvent } from "react";
import classNames from "classnames";
import { SelectContext } from "./select";


export interface SelectOptionProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

export const SelectOption: FC<SelectOptionProps> = (props) => {
  const { value, children, disabled, ...restProps } = props;
  const context = useContext(SelectContext);
  const [ hover, setHover ] = useState(false);

  const handleOptionItem = (e: MouseEvent<HTMLLIElement>) => {
    const _value = (e.target as any).innerHTML as string;
    if(!disabled) {
      context.onSelect && context.onSelect({ key: value, val: _value });
      context.onShowOption && context.onShowOption(false);
    }
  };

  const claNames = classNames('yuan-select-list-item', {
    'is-disabled': disabled,
    'is-active': value === context.value,
    'is-hover': hover,
  });

  return (
    <li
      className={claNames}
      onMouseOver={
        () => {
          if(!disabled) {
            setHover(true);
          }
        }
      }
      onMouseLeave={
        () => {
          setHover(false);
        }
      }
      onClick={handleOptionItem}
      {...restProps}
      >
        {children}
      </li>
  )
}

export default SelectOption;