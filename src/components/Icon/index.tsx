import React from 'react';
import { Feather } from '@expo/vector-icons';

interface IconPropsElement {
  iconName: string;
  isSelected?: boolean;
}

const Icon: React.FC<IconPropsElement> = ({
  iconName,
  isSelected,
  ...props
}) => {
  return (
    <Feather
      name={iconName}
      size={26}
      color={isSelected ? '#54d3ad' : '#a6aab0'}
      {...props}
    />
  );
};

export default Icon;
