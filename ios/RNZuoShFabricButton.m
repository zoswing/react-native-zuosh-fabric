#import "RNZuoShFabricButton.h"

#import <React/RCTBridge.h>
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNZuoShFabricButtonSpec.h"
#endif

@implementation RNZuoShFabricButtonManager

RCT_EXPORT_MODULE(RNZuoShFabricButton)

- (UIView *)view
{
  return [[RNZuoShFabricButtonView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(textColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(disabled, BOOL)

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCustomButtonSpecJSI>(params);
}
#endif

@end
