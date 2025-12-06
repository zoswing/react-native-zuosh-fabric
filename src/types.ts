export type CustomButtonProps = {
  /**
   * 按钮显示的文本
   */
  title: string;
  
  /**
   * 按钮背景颜色
   */
  backgroundColor?: string;
  
  /**
   * 按钮文本颜色
   */
  textColor?: string;
  
  /**
   * 按钮是否禁用
   */
  disabled?: boolean;
  
  /**
   * 按钮点击事件回调
   */
  onPress?: (event: { value: string }) => void;
  
  /**
   * 按钮长按事件回调
   */
  onLongPress?: (event: { value: string }) => void;
  
  /**
   * 自定义样式
   */
  style?: any;
};
