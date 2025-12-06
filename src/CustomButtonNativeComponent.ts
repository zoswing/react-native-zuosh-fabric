import type { ViewProps, ColorValue } from 'react-native';
import type { BubblingEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface OnPressEvent {
  value: string;
}

export interface NativeProps extends ViewProps {
  /**
   * 按钮显示的文本
   */
  title: string;
  
  /**
   * 按钮背景颜色
   */
  backgroundColor?: ColorValue;
  
  /**
   * 按钮文本颜色
   */
  textColor?: ColorValue;
  
  /**
   * 按钮是否禁用
   */
  disabled?: boolean;
  
  /**
   * 按钮点击事件
   */
  onPress?: BubblingEventHandler<OnPressEvent>;
  
  /**
   * 按钮长按事件
   */
  onLongPress?: BubblingEventHandler<OnPressEvent>;
}

export default codegenNativeComponent<NativeProps>('RNZuoShFabricButton');
