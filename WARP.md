# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React Native library that implements a custom button component using React Native's **Fabric architecture** (the new architecture). It provides native iOS and Android implementations with TypeScript support.

**Key Constraint**: Requires React Native 0.82+ with the new architecture enabled.

## Common Commands

### Building
```bash
npm run build              # Build TypeScript to lib/
npm run build:tsc          # Build TypeScript only
npm run build:android      # Build Android native module
npm run build:ios          # Build iOS native module
```

### Development
```bash
# Test the component in the example app
cd example
npm install
npm run ios                # Run on iOS simulator
npm run android            # Run on Android emulator
npm start                  # Start Metro bundler
```

### Testing Example App
The example app demonstrates all component features. Always test changes here before publishing.

## Architecture

### Component Layer Structure

This library follows React Native Fabric's three-layer architecture:

1. **JavaScript Layer** (`src/`)
   - `CustomButton.tsx` - React component wrapper that handles callbacks
   - `CustomButtonNativeComponent.ts` - Codegen specification for native bridge
   - `types.ts` - Public TypeScript API

2. **Codegen Layer** (auto-generated)
   - Configuration in `package.json` under `codegenConfig`
   - Generates native interfaces from `CustomButtonNativeComponent.ts`
   - Uses `codegenNativeComponent()` to create the bridge

3. **Native Layer**
   - **Android**: `android/src/main/java/com/zuosh/fabric/`
     - `CustomButtonManager.java` - ViewManager that bridges to RN
     - `CustomButtonView.java` - The actual native button implementation
     - `CustomButtonPackage.java` - Package registration
     - `CustomButtonEvent.java` - Event handling
   
   - **iOS**: `ios/`
     - `RNZuoShFabricButton.mm` - ViewManager (Objective-C++)
     - `RNZuoShFabricButtonView.h/m` - UIButton implementation
     - Uses `#ifdef RCT_NEW_ARCH_ENABLED` flag

### Event Flow

Events flow from native → JS through the Fabric bridge:
- Native button press → `BubblingEventHandler` → `onPress` callback in JS
- Event payload structure: `{ value: string }` containing the button title

### Build Output

- `lib/` - Compiled TypeScript (gitignored)
- Built files are created by `scripts/build.js` which:
  1. Cleans `lib/` directory
  2. Runs TypeScript compiler
  3. Copies source files

## Important Patterns

### Adding New Props

When adding props to the button:

1. Update `NativeProps` interface in `CustomButtonNativeComponent.ts`
2. Update `CustomButtonProps` in `types.ts`
3. Add prop handling in `CustomButton.tsx`
4. Implement in native ViewManagers:
   - Android: Add `@ReactProp` method in `CustomButtonManager.java`
   - iOS: Add setter method in `RNZuoShFabricButton.mm`
5. Implement in native views:
   - Android: Add method to `CustomButtonView.java`
   - iOS: Add method to `RNZuoShFabricButtonView.m`

### Adding New Events

1. Define event interface in `CustomButtonNativeComponent.ts`
2. Use `BubblingEventHandler<YourEventType>` for event props
3. Implement event dispatching in native views
4. Wrap event handler in `React.useCallback()` in `CustomButton.tsx`

### Codegen Specification

The native component name **must match** across:
- `codegenNativeComponent<NativeProps>('RNZuoShFabricButton')` in TypeScript
- `CustomButtonManager.NAME = "RNZuoShFabricButton"` in Android
- `RCT_EXPORT_MODULE()` name in iOS

## Package Structure

- `src/` - TypeScript source (what developers write)
- `lib/` - Build output (what gets published to npm)
- `android/` - Android native implementation
- `ios/` - iOS native implementation  
- `example/` - Demo app for testing
- `scripts/` - Build utilities

The `main` field in `package.json` points to `lib/index.js` (build output), not `src/`.

## Platform Setup Requirements

### iOS
- Requires CocoaPods
- Podspec enables Fabric with `-DRCT_NEW_ARCH_ENABLED=1`
- Min iOS version: 11.0

### Android
- Uses Gradle 7.3.1+
- Min SDK: 21
- Target SDK: 33
- Namespace: `com.zuosh.fabric`
- Must enable `newArchEnabled=true` in consuming apps

## Publishing Workflow

```bash
npm run build              # Build the library
npm run publish            # Run publish script
```

The library is published to npm with compiled `lib/` output. Consumers don't need to compile TypeScript.
