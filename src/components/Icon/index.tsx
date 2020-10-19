import React from 'react';
import { Feather } from '@expo/vector-icons';

interface IconPropsElement {
  iconName: string;
  isSelected?: boolean;
  onPress?(): void;
}

const Icon: React.FC<IconPropsElement> = ({
  iconName,
  isSelected,
  onPress,
  ...props
}) => {
  return (
    <Feather
      name={iconName}
      size={26}
      color={isSelected ? '#54d3ad' : '#a6aab0'}
      onPress={onPress}
      {...props}
    />
  );
};

export default Icon;
