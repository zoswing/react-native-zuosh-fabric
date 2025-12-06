package com.zuosh.fabric;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.common.ViewUtil;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class CustomButtonEvent extends Event<CustomButtonEvent> {
    private final String mEventName;
    private final WritableMap mEventData;

    public CustomButtonEvent(int viewTag, String eventName, @Nullable WritableMap eventData) {
        super(viewTag);
        mEventName = eventName;
        mEventData = eventData != null ? eventData : new WritableNativeMap();
    }

    @Override
    public String getEventName() {
        return mEventName;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mEventData);
    }

    @Override
    public boolean canCoalesce() {
        return false;
    }
}
