# React Native ZuoSh Fabric Button

[![npm version](https://badge.fury.io/js/react-native-zuosh-fabric.svg)](https://badge.fury.io/js/react-native-zuosh-fabric)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A high-performance custom button component built with React Native's new Fabric architecture. This component provides native performance with a flexible API for customizing appearance and behavior.

## Features

- 🚀 Built with React Native Fabric for optimal performance
- 🎨 Customizable colors (background and text)
- ♿ Accessibility support
- 🔄 Long press handling
- 💪 TypeScript support
- 📱 Android & iOS native implementations
- 🎯 Easy to use API

## Installation

```bash
npm install react-native-zuosh-fabric
# or
yarn add react-native-zuosh-fabric
```

### React Native 0.82+ Required

This component requires React Native 0.82 or higher with the new architecture enabled.

## iOS Setup

1. Install pods:
```bash
cd ios && pod install && cd ..
```

2. Enable new architecture in your iOS project:
- Open your `ios/YourProject.xcodeproj`
- Go to `Product -> Scheme -> Edit Scheme`
- Under `Run`, add `-D RCT_NEW_ARCH_ENABLED=1` to `Arguments Passed On Launch`

## Android Setup

1. Enable new architecture in `android/gradle.properties`:
```properties
newArchEnabled=true
```

2. Add the package to your `MainApplication.java`:
```java
import com.zuosh.fabric.CustomButtonPackage;

@Override
protected List<ReactPackage> getPackages() {
  @SuppressWarnings("UnnecessaryLocalVariable")
  List<ReactPackage> packages = new PackageList(this).getPackages();
  // Add the custom button package
  packages.add(new CustomButtonPackage());
  return packages;
}
```

## Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { CustomButton } from 'react-native-zuosh-fabric';

const App = () => {
  const handlePress = (event) => {
    console.log('Button pressed:', event.value);
  };

  const handleLongPress = (event) => {
    console.log('Button long pressed:', event.value);
  };

  return (
    <View style={{ padding: 20 }}>
      <CustomButton
        title="Press Me"
        onPress={handlePress}
        onLongPress={handleLongPress}
        backgroundColor="#007AFF"
        textColor="#FFFFFF"
        disabled={false}
      />
    </View>
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Text displayed on the button |
| `backgroundColor` | `string` | `'#007AFF'` | Background color of the button |
| `textColor` | `string` | `'#FFFFFF'` | Color of the button text |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `onPress` | `(event: {value: string}) => void` | undefined | Callback when button is pressed |
| `onLongPress` | `(event: {value: string}) => void` | undefined | Callback when button is long pressed |
| `style` | `any` | undefined | Additional styles for the button |

## Event Data

Both `onPress` and `onLongPress` callbacks receive an event object with:
```typescript
{
  value: string // The button title
}
```

## Example

See the [`example`](./example) directory for a complete working example app demonstrating all features.

## Development

### Building

```bash
npm run build
```

### Running Example

```bash
cd example
npm install
npm run ios  # or npm run android
```

## Architecture

This component is built using React Native's Fabric architecture:

- **TypeScript**: Type-safe API
- **Codegen**: Automatic generation of native interfaces
- **Native Implementation**: Platform-specific code for Android and iOS
- **New Architecture**: Leverages the new React Native rendering system for better performance

### Android Implementation

- `CustomButtonManager.java`: ViewManager for component
- `CustomButtonView.java`: Custom Button implementation
- `CustomButtonPackage.java`: ReactPackage registration
- `CustomButtonEvent.java`: Event handling

### iOS Implementation

- `RNZuoShFabricButtonManager.mm`: ViewManager with new architecture
- `RNZuoShFabricButtonView.h/.m`: Custom UIButton implementation
- `RNZuoShFabricButton.podspec`: CocoaPods specification

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- Custom button component with Fabric architecture
- Android and iOS native implementations
- TypeScript support
- Example app

---

Made with ❤️ by [ZuoSh](https://github.com/zuosh)
