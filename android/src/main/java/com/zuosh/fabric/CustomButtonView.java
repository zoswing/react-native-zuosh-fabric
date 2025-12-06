package com.zuosh.fabric;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.StateListDrawable;
import android.view.MotionEvent;
import android.widget.Button;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.views.view.ReactViewGroup;

@SuppressLint("AppCompatCustomView")
public class CustomButtonView extends Button {
    private static final String EVENT_NAME_ON_PRESS = "onPress";
    private static final String EVENT_NAME_ON_LONG_PRESS = "onLongPress";
    
    private @Nullable EventDispatcher mEventDispatcher;
    private String mTitle = "";
    private int mBackgroundColor = Color.BLUE;
    private int mTextColor = Color.WHITE;
    private boolean mIsDisabled = false;

    public CustomButtonView(Context context) {
        super(context);
        setupDefaultStyle();
    }

    public void setEventDispatcher(@Nullable EventDispatcher eventDispatcher) {
        mEventDispatcher = eventDispatcher;
    }

    public void setTitle(String title) {
        mTitle = title != null ? title : "";
        setText(mTitle);
    }

    public void setCustomBackgroundColor(int color) {
        mBackgroundColor = color;
        updateStyle();
    }

    public void setCustomTextColor(int color) {
        mTextColor = color;
        setTextColor(color);
    }

    public void setCustomDisabled(boolean disabled) {
        mIsDisabled = disabled;
        setEnabled(!disabled);
        updateStyle();
    }

    private void setupDefaultStyle() {
        setText(mTitle);
        setTextColor(mTextColor);
        setPadding(32, 24, 32, 24);
        setGravity(android.view.Gravity.CENTER);
        updateStyle();
    }

    private void updateStyle() {
        GradientDrawable normalDrawable = new GradientDrawable();
        normalDrawable.setShape(GradientDrawable.RECTANGLE);
        normalDrawable.setColor(mBackgroundColor);
        normalDrawable.setCornerRadius(8f);

        GradientDrawable pressedDrawable = new GradientDrawable();
        pressedDrawable.setShape(GradientDrawable.RECTANGLE);
        pressedDrawable.setColor(manipulateColor(mBackgroundColor, 0.8f));
        pressedDrawable.setCornerRadius(8f);

        GradientDrawable disabledDrawable = new GradientDrawable();
        disabledDrawable.setShape(GradientDrawable.RECTANGLE);
        disabledDrawable.setColor(manipulateColor(mBackgroundColor, 0.5f));
        disabledDrawable.setCornerRadius(8f);

        StateListDrawable states = new StateListDrawable();
        states.addState(new int[]{-android.R.attr.state_enabled}, disabledDrawable);
        states.addState(new int[]{android.R.attr.state_pressed}, pressedDrawable);
        states.addState(new int[]{}, normalDrawable);

        setBackground(states);
    }

    private int manipulateColor(int color, float factor) {
        int a = Color.alpha(color);
        int r = Math.round(Color.red(color) * factor);
        int g = Math.round(Color.green(color) * factor);
        int b = Math.round(Color.blue(color) * factor);
        return Color.argb(a, Math.min(255, r), Math.min(255, g), Math.min(255, b));
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        super.onTouchEvent(event);
        
        if (mIsDisabled) {
            return true;
        }

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                // 触摸开始
                return true;
            case MotionEvent.ACTION_UP:
                // 手指抬起 - 触发点击事件
                if (mEventDispatcher != null) {
                    WritableMap eventPayload = Arguments.createMap();
                    eventPayload.putString("value", mTitle);
                    mEventDispatcher.dispatchEvent(
                        new CustomButtonEvent(getId(), EVENT_NAME_ON_PRESS, eventPayload)
                    );
                }
                return true;
            case MotionEvent.ACTION_CANCEL:
                // 触摸取消
                return true;
        }

        return true;
    }

    @Override
    public boolean performLongClick() {
        if (mIsDisabled || mEventDispatcher == null) {
            return false;
        }

        WritableMap eventPayload = Arguments.createMap();
        eventPayload.putString("value", mTitle);
        mEventDispatcher.dispatchEvent(
            new CustomButtonEvent(getId(), EVENT_NAME_ON_LONG_PRESS, eventPayload)
        );

        return true;
    }
}
