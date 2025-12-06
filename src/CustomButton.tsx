import React from 'react';
import type { CustomButtonProps } from './types';
import NativeCustomButton from './CustomButtonNativeComponent';

/**
 * CustomButton - 使用Fabric架构的自定义按钮组件
 * 
 * @param props 组件属性
 * @returns React元素
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
  disabled = false,
  onPress,
  onLongPress,
  style,
  ...restProps
}) => {
  
  // 处理按钮点击事件
  const handlePress = React.useCallback((event: any) => {
    if (onPress) {
      onPress(event.nativeEvent);
    }
  }, [onPress]);
  
  // 处理长按事件
  const handleLongPress = React.useCallback((event: any) => {
    if (onLongPress) {
      onLongPress(event.nativeEvent);
    }
  }, [onLongPress]);
  
  return (
    <NativeCustomButton
      title={title}
      backgroundColor={backgroundColor}
      textColor={textColor}
      disabled={disabled}
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={style}
      {...restProps}
    />
  );
};

CustomButton.displayName = 'CustomButton';

export default CustomButton;
