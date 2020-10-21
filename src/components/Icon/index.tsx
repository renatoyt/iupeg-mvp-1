import React from 'react';
import { Feather } from '@expo/vector-icons';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type IconPropsElement = WithChildren<{
  iconName: string;
  isSelected?: boolean;
}>;

const Icon = ({
  iconName,
  children,
  ...props
}: IconPropsElement): JSX.Element => {
  return (
    <Feather name={iconName} size={26} color="#a6aab0" {...props}>
      {children}
    </Feather>
  );
};

export default Icon;
