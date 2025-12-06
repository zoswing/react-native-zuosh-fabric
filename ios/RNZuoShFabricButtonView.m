#import "RNZuoShFabricButtonView.h"
#import <React/RCTUtils.h>

@implementation RNZuoShFabricButtonView {
    NSString *_title;
    UIColor *_backgroundColor;
    UIColor *_textColor;
    BOOL _disabled;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setupDefaultStyle];
        [self addTarget:self action:@selector(buttonPressed:) forControlEvents:UIControlEventTouchUpInside];
        [self addTarget:self action:@selector(buttonLongPressed:) forControlEvents:UIControlEventTouchDownRepeat];
    }
    return self;
}

- (void)setupDefaultStyle
{
    _backgroundColor = [UIColor colorWithRed:0.0 green:0.48 blue:1.0 alpha:1.0]; // #007AFF
    _textColor = [UIColor whiteColor];
    _disabled = NO;
    
    self.layer.cornerRadius = 8.0f;
    self.titleLabel.font = [UIFont systemFontOfSize:16 weight:UIFontWeightMedium];
    self.contentEdgeInsets = UIEdgeInsetsMake(12, 24, 12, 24);
    
    [self updateStyle];
}

- (void)setTitle:(NSString *)title
{
    _title = [title copy];
    [self setTitle:_title forState:UIControlStateNormal];
    [self setTitle:_title forState:UIControlStateHighlighted];
    [self setTitle:_title forState:UIControlStateDisabled];
}

- (void)setBackgroundColor:(UIColor *)backgroundColor
{
    _backgroundColor = backgroundColor;
    [self updateStyle];
}

- (void)setTextColor:(UIColor *)textColor
{
    _textColor = textColor;
    [self setTitleColor:_textColor forState:UIControlStateNormal];
    [self setTitleColor:_textColor forState:UIControlStateHighlighted];
    [self setTitleColor:[_textColor colorWithAlphaComponent:0.5] forState:UIControlStateDisabled];
}

- (void)setDisabled:(BOOL)disabled
{
    _disabled = disabled;
    self.enabled = !disabled;
    [self updateStyle];
}

- (void)updateStyle
{
    UIColor *normalColor = _backgroundColor;
    UIColor *highlightedColor = [self adjustColor:normalColor factor:0.8];
    UIColor *disabledColor = [self adjustColor:normalColor factor:0.5];
    
    [self setBackgroundImage:[self imageWithColor:normalColor] forState:UIControlStateNormal];
    [self setBackgroundImage:[self imageWithColor:highlightedColor] forState:UIControlStateHighlighted];
    [self setBackgroundImage:[self imageWithColor:disabledColor] forState:UIControlStateDisabled];
}

- (UIImage *)imageWithColor:(UIColor *)color
{
    CGRect rect = CGRectMake(0, 0, 1, 1);
    UIGraphicsBeginImageContextWithOptions(rect.size, NO, 0);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image;
}

- (UIColor *)adjustColor:(UIColor *)color factor:(CGFloat)factor
{
    CGFloat hue, saturation, brightness, alpha;
    [color getHue:&hue saturation:&saturation brightness:&brightness alpha:&alpha];
    brightness *= factor;
    return [UIColor colorWithHue:hue saturation:saturation brightness:brightness alpha:alpha];
}

- (void)buttonPressed:(UIButton *)sender
{
    if (_disabled) return;
    
    if (self.onPress) {
        self.onPress(@{
            @"value": _title ?: @""
        });
    }
}

- (void)buttonLongPressed:(UIButton *)sender
{
    if (_disabled) return;
    
    if (self.onLongPress) {
        self.onLongPress(@{
            @"value": _title ?: @""
        });
    }
}

@end
