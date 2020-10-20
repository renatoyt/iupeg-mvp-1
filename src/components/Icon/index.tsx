import React from 'react';
import { Feather } from '@expo/vector-icons';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type IconPropsElement = WithChildren<{
  iconName: string;
  isSelected?: boolean;
  onPress?(): void;
}>;

const Icon = ({
  iconName,
  isSelected,
  onPress,
  children,
  ...props
}: IconPropsElement): JSX.Element => {
  return (
    <Feather
      name={iconName}
      size={26}
      color={isSelected ? '#54d3ad' : '#a6aab0'}
      onPress={onPress}
      {...props}
    >
      {children}
    </Feather>
  );
};

export default Icon;
