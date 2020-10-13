import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../../Icon/index';

interface TouchableIconPropsElement {
  iconName: string;
}

const TouchableIcon: React.FC<TouchableIconPropsElement> = ({
  iconName,
  ...props
}) => {
  const [isSelected, setSelected] = useState(false);

  const handleSelectedTouchable = useCallback(() => {
    if (!isSelected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [isSelected]);

  return (
    <TouchableOpacity onPress={handleSelectedTouchable} {...props}>
      <Icon iconName={iconName} isSelected={isSelected} {...props} />
    </TouchableOpacity>
  );
};

export default TouchableIcon;
