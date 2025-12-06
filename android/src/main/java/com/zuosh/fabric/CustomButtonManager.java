package com.zuosh.fabric;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.View;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.EventDispatcher;

@ReactModule(name = CustomButtonManager.NAME)
public class CustomButtonManager extends SimpleViewManager<CustomButtonView> {
    public static final String NAME = "RNZuoShFabricButton";

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @Override
    protected CustomButtonView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new CustomButtonView(reactContext);
    }

    @ReactProp(name = "title")
    public void setTitle(CustomButtonView view, String title) {
        view.setTitle(title);
    }

    @ReactProp(name = "backgroundColor", customType = "Color")
    public void setBackgroundColor(CustomButtonView view, Integer backgroundColor) {
        view.setBackgroundColor(backgroundColor != null ? backgroundColor : Color.BLUE);
    }

    @ReactProp(name = "textColor", customType = "Color")
    public void setTextColor(CustomButtonView view, Integer textColor) {
        view.setTextColor(textColor != null ? textColor : Color.WHITE);
    }

    @ReactProp(name = "disabled")
    public void setDisabled(CustomButtonView view, boolean disabled) {
        view.setEnabled(!disabled);
    }

    @Override
    protected void addEventEmitters(@NonNull ThemedReactContext reactContext, @NonNull CustomButtonView view) {
        super.addEventEmitters(reactContext, view);
        
        ReactApplicationContext context = (ReactApplicationContext) reactContext.getApplicationContext();
        EventDispatcher eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(
            reactContext,
            view.getId()
        );
        
        view.setEventDispatcher(eventDispatcher);
    }
}
