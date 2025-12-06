#ifdef RCT_NEW_ARCH_ENABLED
#import "RNZuoShFabricButton.h"
#import "RNZuoShFabricButtonView.h"

using namespace facebook::react;

@interface RNZuoShFabricButtonManager () <NativeCustomButtonSpec>
@end

@implementation RNZuoShFabricButtonManager
RCT_EXPORT_MODULE()

- (std::shared_ptr<TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCustomButtonSpecJSI>(params);
}

- (UIView *)view
{
    return [[RNZuoShFabricButtonView alloc] init];
}

- (void)setTitle:(NSString *)title forView:(RNZuoShFabricButtonView *)view
{
    [view setTitle:title];
}

- (void)setBackgroundColor:(UIColor *)color forView:(RNZuoShFabricButtonView *)view
{
    [view setBackgroundColor:color];
}

- (void)setTextColor:(UIColor *)color forView:(RNZuoShFabricButtonView *)view
{
    [view setTextColor:color];
}

- (void)setDisabled:(BOOL)disabled forView:(RNZuoShFabricButtonView *)view
{
    [view setDisabled:disabled];
}

@end

Class<RCTComponentViewProtocol> RNZuoShFabricButtonCls(void)
{
  return [RNZuoShFabricButtonView class];
}

#endif
