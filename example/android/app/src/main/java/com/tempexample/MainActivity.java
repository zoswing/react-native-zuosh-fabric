package com.tempexample;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultActivity;

public class MainActivity extends DefaultActivity {
  @Override
  protected String getMainComponentName() {
    return "TempExample";
  }

  @Override
  protected String getReactNativeHost() {
    return DefaultNewArchitectureEntryPoint.getFabricEnabled();
  }
}
