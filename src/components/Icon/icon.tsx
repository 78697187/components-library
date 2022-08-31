import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = React.memo((props: IconProps) => {
   const { className, theme, ...restProps } = props;
   const classes = classNames('yuangb-icon', className, {
    [`icon-${theme}`]: theme
   });

   return (
    <FontAwesomeIcon className={classes} {...restProps}/>
   )
});

Icon.displayName = 'Icon'

export default Icon;