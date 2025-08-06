# Change Log

## 2.1.0-beta.0

### Minor Changes

- [#5433](https://github.com/scaleway/ultraviolet/pull/5433) [`6f5f565`](https://github.com/scaleway/ultraviolet/commit/6f5f5650031f99808c710bfe069bdf7094ce336b) Thanks [@matthprost](https://github.com/matthprost)! - New `theme` provided that is a contract interface for vanilla extract

## 2.1.0

### Minor Changes

- [#5513](https://github.com/scaleway/ultraviolet/pull/5513) [`4439df6`](https://github.com/scaleway/ultraviolet/commit/4439df607ffa1f7e6bb2a45bdbbedff6ae3c27b2) Thanks [@iManu](https://github.com/iManu)! - add simple root selector for generated css

## 2.0.0

### Major Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Beta release

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Removal of `theme.screen` into CSS variables and fixed breakpoints

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ **Breaking Changes**

  The following tokens are now removed. Please update your code to use the new tokens system.

  #### Screens

  Screen changed from `number` to `string` type to include `px` unit. The new values are now in `px` instead of `number`. The new values are:

  - New `xxsmall`
  - `theme.screens.xsmall` -> `theme.breakpoints.xsmall`
  - `theme.screens.small` -> `breakpoints.small`
  - `theme.screens.medium` -> `theme.breakpoints.medium`
  - `theme.screens.large` -> `theme.breakpoints.large`
  - `theme.screens.xlarge` -> `theme.breakpoints.xlarge`

  #### Colors

  Some colors tokens have been removed. Here are the following tokens that are now removed:

  **Danger**

  - `theme.colors.danger.backgroundWeak`
  - `theme.colors.danger.backgroundWeakDisabled`
  - `theme.colors.danger.backgroundWeakHover`
  - `theme.colors.danger.borderWeak`
  - `theme.colors.danger.borderWeakDisabled`
  - `theme.colors.danger.borderWeakHover`
  - `theme.colors.danger.iconWeak`
  - `theme.colors.danger.iconWeakDisabled`
  - `theme.colors.danger.iconWeakHover`
  - `theme.colors.danger.textWeak`
  - `theme.colors.danger.textWeakDisabled`
  - `theme.colors.danger.textWeakHover`

  **Info**

  - `theme.colors.info.backgroundWeak`
  - `theme.colors.info.backgroundWeakDisabled`
  - `theme.colors.info.backgroundWeakHover`
  - `theme.colors.info.borderWeak`
  - `theme.colors.info.borderWeakDisabled`
  - `theme.colors.info.borderWeakHover`
  - `theme.colors.info.iconWeak`
  - `theme.colors.info.iconWeakDisabled`
  - `theme.colors.info.iconWeakHover`
  - `theme.colors.info.textWeak`
  - `theme.colors.info.textWeakDisabled`
  - `theme.colors.info.textWeakHover`

  **Primary**

  - `theme.colors.primary.backgroundWeak`
  - `theme.colors.primary.backgroundWeakDisabled`
  - `theme.colors.primary.backgroundWeakHover`
  - `theme.colors.primary.borderWeak`
  - `theme.colors.primary.borderWeakDisabled`
  - `theme.colors.primary.borderWeakHover`
  - `theme.colors.primary.iconWeak`
  - `theme.colors.primary.iconWeakDisabled`
  - `theme.colors.primary.iconWeakHover`
  - `theme.colors.primary.textWeak`
  - `theme.colors.primary.textWeakDisabled`
  - `theme.colors.primary.textWeakHover`

  **Secondary**

  - `theme.colors.secondary.backgroundWeak`
  - `theme.colors.secondary.backgroundWeakDisabled`
  - `theme.colors.secondary.backgroundWeakHover`
  - `theme.colors.secondary.borderWeak`
  - `theme.colors.secondary.borderWeakDisabled`
  - `theme.colors.secondary.borderWeakHover`
  - `theme.colors.secondary.iconWeak`
  - `theme.colors.secondary.iconWeakDisabled`
  - `theme.colors.secondary.iconWeakHover`
  - `theme.colors.secondary.textWeak`
  - `theme.colors.secondary.textWeakDisabled`
  - `theme.colors.secondary.textWeakHover`

  **Success**

  - `theme.colors.success.backgroundWeak`
  - `theme.colors.success.backgroundWeakDisabled`
  - `theme.colors.success.backgroundWeakHover`
  - `theme.colors.success.borderWeak`
  - `theme.colors.success.borderWeakDisabled`
  - `theme.colors.success.borderWeakHover`
  - `theme.colors.success.iconWeak`
  - `theme.colors.success.iconWeakDisabled`
  - `theme.colors.success.iconWeakHover`
  - `theme.colors.success.textWeak`
  - `theme.colors.success.textWeakDisabled`
  - `theme.colors.success.textWeakHover`

  **Warning**

  - `theme.colors.warning.backgroundWeak`
  - `theme.colors.warning.backgroundWeakDisabled`
  - `theme.colors.warning.backgroundWeakHover`
  - `theme.colors.warning.borderWeak`
  - `theme.colors.warning.borderWeakDisabled`
  - `theme.colors.warning.borderWeakHover`
  - `theme.colors.warning.iconWeak`
  - `theme.colors.warning.iconWeakDisabled`
  - `theme.colors.warning.iconWeakHover`
  - `theme.colors.warning.textWeak`
  - `theme.colors.warning.textWeakDisabled`
  - `theme.colors.warning.textWeakHover`

  **Other Gradients**

  - `theme.colors.other.gradients.background.gold`
  - `theme.colors.other.gradients.background.purple`
  - `theme.colors.other.gradients.background.strong`
  - `theme.colors.other.gradients.background.accent`
  - `theme.colors.other.gradients.background.aqua`
  - `theme.colors.other.gradients.background.blue`
  - `theme.colors.other.gradients.background.emerald`
  - `theme.colors.other.gradients.background.fuschia`
  - `theme.colors.other.gradients.background.magenta`
  - `theme.colors.other.gradients.background.primary`

  #### Typography

  There is a change in the typography font family. We now use `Inter`, `JetBrains` and `Space Grotesk` as the default font.
  In order to be always up to date we recommend you installing `@ultraviolet/fonts` package and import it in your App entry point.

  ```tsx
  import "@ultraviolet/fonts/fonts.css";
  ```

### Patch Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Remove deepmerge dependency as it is no longer used

## 2.0.0-beta.3

### Major Changes

- [#5335](https://github.com/scaleway/ultraviolet/pull/5335) [`f95c6d2`](https://github.com/scaleway/ultraviolet/commit/f95c6d2b5e1e4402822dc6c1362ca280d513e1dd) Thanks [@lisalupi](https://github.com/lisalupi)! - Removal of `theme.screen` into CSS variables and fixed breakpoints

## 2.0.0-beta.2

### Patch Changes

- [`6b0565d`](https://github.com/scaleway/ultraviolet/commit/6b0565d2991db0510067d91b2140274dcde2ea21) Thanks [@matthprost](https://github.com/matthprost)! - Remove deepmerge dependency as it is no longer used

## 2.0.0-beta.1

### Major Changes

- [`421d104`](https://github.com/scaleway/ultraviolet/commit/421d104ae17d8c805d981ed214417916f73d561c) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ **Breaking Changes**

  The following tokens are now removed. Please update your code to use the new tokens system.

  #### Screens

  Screen changed from `number` to `string` type to include `px` unit. The new values are now in `px` instead of `number`. The new values are:

  - New `xxsmall`
  - `theme.screens.xsmall` -> `theme.breakpoints.xsmall`
  - `theme.screens.small` -> `breakpoints.small`
  - `theme.screens.medium` -> `theme.breakpoints.medium`
  - `theme.screens.large` -> `theme.breakpoints.large`
  - `theme.screens.xlarge` -> `theme.breakpoints.xlarge`

  #### Colors

  Some colors tokens have been removed. Here are the following tokens that are now removed:

  **Danger**

  - `theme.colors.danger.backgroundWeak`
  - `theme.colors.danger.backgroundWeakDisabled`
  - `theme.colors.danger.backgroundWeakHover`
  - `theme.colors.danger.borderWeak`
  - `theme.colors.danger.borderWeakDisabled`
  - `theme.colors.danger.borderWeakHover`
  - `theme.colors.danger.iconWeak`
  - `theme.colors.danger.iconWeakDisabled`
  - `theme.colors.danger.iconWeakHover`
  - `theme.colors.danger.textWeak`
  - `theme.colors.danger.textWeakDisabled`
  - `theme.colors.danger.textWeakHover`

  **Info**

  - `theme.colors.info.backgroundWeak`
  - `theme.colors.info.backgroundWeakDisabled`
  - `theme.colors.info.backgroundWeakHover`
  - `theme.colors.info.borderWeak`
  - `theme.colors.info.borderWeakDisabled`
  - `theme.colors.info.borderWeakHover`
  - `theme.colors.info.iconWeak`
  - `theme.colors.info.iconWeakDisabled`
  - `theme.colors.info.iconWeakHover`
  - `theme.colors.info.textWeak`
  - `theme.colors.info.textWeakDisabled`
  - `theme.colors.info.textWeakHover`

  **Primary**

  - `theme.colors.primary.backgroundWeak`
  - `theme.colors.primary.backgroundWeakDisabled`
  - `theme.colors.primary.backgroundWeakHover`
  - `theme.colors.primary.borderWeak`
  - `theme.colors.primary.borderWeakDisabled`
  - `theme.colors.primary.borderWeakHover`
  - `theme.colors.primary.iconWeak`
  - `theme.colors.primary.iconWeakDisabled`
  - `theme.colors.primary.iconWeakHover`
  - `theme.colors.primary.textWeak`
  - `theme.colors.primary.textWeakDisabled`
  - `theme.colors.primary.textWeakHover`

  **Secondary**

  - `theme.colors.secondary.backgroundWeak`
  - `theme.colors.secondary.backgroundWeakDisabled`
  - `theme.colors.secondary.backgroundWeakHover`
  - `theme.colors.secondary.borderWeak`
  - `theme.colors.secondary.borderWeakDisabled`
  - `theme.colors.secondary.borderWeakHover`
  - `theme.colors.secondary.iconWeak`
  - `theme.colors.secondary.iconWeakDisabled`
  - `theme.colors.secondary.iconWeakHover`
  - `theme.colors.secondary.textWeak`
  - `theme.colors.secondary.textWeakDisabled`
  - `theme.colors.secondary.textWeakHover`

  **Success**

  - `theme.colors.success.backgroundWeak`
  - `theme.colors.success.backgroundWeakDisabled`
  - `theme.colors.success.backgroundWeakHover`
  - `theme.colors.success.borderWeak`
  - `theme.colors.success.borderWeakDisabled`
  - `theme.colors.success.borderWeakHover`
  - `theme.colors.success.iconWeak`
  - `theme.colors.success.iconWeakDisabled`
  - `theme.colors.success.iconWeakHover`
  - `theme.colors.success.textWeak`
  - `theme.colors.success.textWeakDisabled`
  - `theme.colors.success.textWeakHover`

  **Warning**

  - `theme.colors.warning.backgroundWeak`
  - `theme.colors.warning.backgroundWeakDisabled`
  - `theme.colors.warning.backgroundWeakHover`
  - `theme.colors.warning.borderWeak`
  - `theme.colors.warning.borderWeakDisabled`
  - `theme.colors.warning.borderWeakHover`
  - `theme.colors.warning.iconWeak`
  - `theme.colors.warning.iconWeakDisabled`
  - `theme.colors.warning.iconWeakHover`
  - `theme.colors.warning.textWeak`
  - `theme.colors.warning.textWeakDisabled`
  - `theme.colors.warning.textWeakHover`

  **Other Gradients**

  - `theme.colors.other.gradients.background.gold`
  - `theme.colors.other.gradients.background.purple`
  - `theme.colors.other.gradients.background.strong`
  - `theme.colors.other.gradients.background.accent`
  - `theme.colors.other.gradients.background.aqua`
  - `theme.colors.other.gradients.background.blue`
  - `theme.colors.other.gradients.background.emerald`
  - `theme.colors.other.gradients.background.fuschia`
  - `theme.colors.other.gradients.background.magenta`
  - `theme.colors.other.gradients.background.primary`

  #### Typography

  There is a change in the typography font family. We now use `Inter`, `JetBrains` and `Space Grotesk` as the default font.
  In order to be always up to date we recommend you installing `@ultraviolet/fonts` package and import it in your App entry point.

  ```tsx
  import "@ultraviolet/fonts/fonts.css";
  ```

## 2.0.0-beta.0

### Major Changes

- [#5112](https://github.com/scaleway/ultraviolet/pull/5112) [`37a7d63`](https://github.com/scaleway/ultraviolet/commit/37a7d632cd1e61d7615e5356fc179ec08f3bec09) Thanks [@matthprost](https://github.com/matthprost)! - Beta release

## 1.17.0

### Minor Changes

- [#4976](https://github.com/scaleway/ultraviolet/pull/4976) [`58657d8`](https://github.com/scaleway/ultraviolet/commit/58657d800433f7ae36dbd9cd44f19f63cd93cb75) Thanks [@iManu](https://github.com/iManu)! - use the filename to set a class on :root declaration

## 1.16.0

### Minor Changes

- [#4698](https://github.com/scaleway/ultraviolet/pull/4698) [`f8e9911`](https://github.com/scaleway/ultraviolet/commit/f8e99113b95758ce6c40aa4f3c7d4cebc3db91ca) Thanks [@matthprost](https://github.com/matthprost)! - Themes are now available with CDN links. You can directly import the CSS theme in your HTML file:

  ```html
  <link rel="stylesheet" href="https://assets.scaleway.com/themes/light.css" />
  // OR
  <link rel="stylesheet" href="https://assets.scaleway.com/themes/dark.css" />
  // OR
  <link rel="stylesheet" href="https://assets.scaleway.com/themes/darker.css" />
  ```

## 1.15.0

### Minor Changes

- [#4397](https://github.com/scaleway/ultraviolet/pull/4397) [`5326acf`](https://github.com/scaleway/ultraviolet/commit/5326acf8fafba39bca49ad8faf56c6d75869d557) Thanks [@matthprost](https://github.com/matthprost)! - - Moving from `px` to `rem`
  - Introduction of `sizing` tokens for height and width

## 1.14.2

### Patch Changes

- [#4280](https://github.com/scaleway/ultraviolet/pull/4280) [`2ba5a34`](https://github.com/scaleway/ultraviolet/commit/2ba5a34a6c4eaf6237544d83d534dd1d8f629a85) Thanks [@matthprost](https://github.com/matthprost)! - Fix `package.json` of theme

## 1.14.1

### Patch Changes

- [#4230](https://github.com/scaleway/ultraviolet/pull/4230) [`b55a6e6`](https://github.com/scaleway/ultraviolet/commit/b55a6e68626dc2891fbd9cfaca918e423a09978c) Thanks [@matthprost](https://github.com/matthprost)! - Improve bundle size by removing barrel file for exporting themes

## 1.14.0

### Minor Changes

- [#4196](https://github.com/scaleway/ultraviolet/pull/4196) [`ee3c0b5`](https://github.com/scaleway/ultraviolet/commit/ee3c0b5a35758d3920506cdfaca2bc06409a96c6) Thanks [@matthprost](https://github.com/matthprost)! - New monochrome tokens

## 1.13.0

### Minor Changes

- [#4161](https://github.com/scaleway/ultraviolet/pull/4161) [`49a5b17`](https://github.com/scaleway/ultraviolet/commit/49a5b179c1f934c6123689fa365c3f13fc30dcb8) Thanks [@matthprost](https://github.com/matthprost)! - Update of gradient colors

## 1.12.4

### Patch Changes

- [#4075](https://github.com/scaleway/ultraviolet/pull/4075) [`f2fd9ed`](https://github.com/scaleway/ultraviolet/commit/f2fd9ed168062e709ca68b6c456149a33eea3e22) Thanks [@matthprost](https://github.com/matthprost)! - Fix update

## 1.12.2

### Patch Changes

- [#4006](https://github.com/scaleway/ultraviolet/pull/4006) [`e011345`](https://github.com/scaleway/ultraviolet/commit/e0113459832a0c026164344fc7efd6a3ab490df7) Thanks [@philibea](https://github.com/philibea)! - Add turborepo

## 1.12.1

### Patch Changes

- [#3937](https://github.com/scaleway/ultraviolet/pull/3937) [`bc58d97`](https://github.com/scaleway/ultraviolet/commit/bc58d97033e2028b69ca5d284bef88fff16e50ba) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - Update font name to include first letter uppercase

## 1.12.0

### Minor Changes

- [#3827](https://github.com/scaleway/ultraviolet/pull/3827) [`39a5ee7`](https://github.com/scaleway/ultraviolet/commit/39a5ee76fcdc4e083b16fc8620bd666458bdda94) Thanks [@lisalupi](https://github.com/lisalupi)! - Ultraviolet theme as CSS variables

## 1.11.0

### Minor Changes

- [#3802](https://github.com/scaleway/ultraviolet/pull/3802) [`c458956`](https://github.com/scaleway/ultraviolet/commit/c4589564872bc9fd3ddf95e327ae768226934274) Thanks [@matthprost](https://github.com/matthprost)! - New tokens `breakpoints` and added a fallback for each font family

## 1.10.2

### Patch Changes

- [#3744](https://github.com/scaleway/ultraviolet/pull/3744) [`3c1d30d`](https://github.com/scaleway/ultraviolet/commit/3c1d30d0b7926e1843b257c56b6c972449dbf0cd) Thanks [@philibea](https://github.com/philibea)! - add cjs export

## 1.10.1

### Patch Changes

- [#3731](https://github.com/scaleway/ultraviolet/pull/3731) [`362a534`](https://github.com/scaleway/ultraviolet/commit/362a5348a67b986907b65eec2606fd36fd21f621) Thanks [@philibea](https://github.com/philibea)! - migrate from vite config to rollup

## 1.10.0

### Minor Changes

- [#3627](https://github.com/scaleway/ultraviolet/pull/3627) [`a71f616`](https://github.com/scaleway/ultraviolet/commit/a71f6169c53727a1bc0945c2c1d78f96949d4307) Thanks [@matthprost](https://github.com/matthprost)! - New `neutral` and `disabled` states on `<CategoryIcon />` component

## 1.9.0

### Minor Changes

- [#3480](https://github.com/scaleway/ultraviolet/pull/3480) [`5615de4`](https://github.com/scaleway/ultraviolet/commit/5615de48ef162b32c3a43836bbad11c942afe55a) Thanks [@matthprost](https://github.com/matthprost)! - New token `theme.colors.other.icon.product.original`, it contains all colors for the new product icon variant `original`.

## 1.8.0

### Minor Changes

- [#3383](https://github.com/scaleway/ultraviolet/pull/3383) [`b492e36`](https://github.com/scaleway/ultraviolet/commit/b492e36ae2f540bed61458993b6baa8db2444a24) Thanks [@matthprost](https://github.com/matthprost)! - Gradients have been updated, the structure and access to it had been improved. Here is what changed:
  - Previously you were accessing to this token: `color.other.gradient.background.fuschia` and now you can access it like this: `color.other.gradient.background.linear.fuschia`. The same applies to all other gradients.
    Keep in mind that for now the old way still works as this update is NOT breaking change but it will be removed in the future.
  - New gradient have been added and are accessible via `color.other.gradient.background.radial`.

## 1.7.0

### Minor Changes

- [#3295](https://github.com/scaleway/ultraviolet/pull/3295) [`f65dccd`](https://github.com/scaleway/ultraviolet/commit/f65dccdce849c7a07d5cc1baced0fdbc51495fad) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - New typography headings in tokens

## 1.6.0

### Minor Changes

- [#3259](https://github.com/scaleway/ultraviolet/pull/3259) [`35e84a0`](https://github.com/scaleway/ultraviolet/commit/35e84a0467d44acdef0c951c502ed2c2ef9c413a) Thanks [@matthprost](https://github.com/matthprost)! - New tokens `colors.other.gradients.text.dark` and `colors.other.gradients.text.light` available.
  Those tokens can be used for text above gradient background.

## 1.5.0

### Minor Changes

- [#3120](https://github.com/scaleway/ultraviolet/pull/3120) [`753555d5`](https://github.com/scaleway/ultraviolet/commit/753555d543976046b324d63e53b6567f4e8c0d5a) Thanks [@matthprost](https://github.com/matthprost)! - New gradient and rebranding of Banner

## 1.4.0

### Minor Changes

- [#3118](https://github.com/scaleway/ultraviolet/pull/3118) [`499d65f6`](https://github.com/scaleway/ultraviolet/commit/499d65f6c0510bd37c34f8cc24476a601cfaa6f3) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - Tokens update on primary dark

## 1.3.0

### Minor Changes

- [#2995](https://github.com/scaleway/ultraviolet/pull/2995) [`064d44f3`](https://github.com/scaleway/ultraviolet/commit/064d44f39f73d825a3300001b12afe26188c3fa8) Thanks [@matthprost](https://github.com/matthprost)! - New theme tokens weak have been deprecated on all sentiments except neutral

- [#3071](https://github.com/scaleway/ultraviolet/pull/3071) [`5d7da681`](https://github.com/scaleway/ultraviolet/commit/5d7da681ea352a80b821fcf1be9d029e8c23869c) Thanks [@matthprost](https://github.com/matthprost)! - New font `Inter` added into the theme. The font will fall back on `Asap` until next major. In the meaning time you can start importing and using `Inter`.

## 1.2.1

### Patch Changes

- [#2752](https://github.com/scaleway/ultraviolet/pull/2752) [`f4f9dfc1`](https://github.com/scaleway/ultraviolet/commit/f4f9dfc1473ce60b9a397708a2be737ff737fc4d) Thanks [@matthprost](https://github.com/matthprost)! - Update ProductIcon tokens color for warning sentiment

## 1.2.0

### Minor Changes

- [#2741](https://github.com/scaleway/ultraviolet/pull/2741) [`445726b6`](https://github.com/scaleway/ultraviolet/commit/445726b6839bed8b2144f3cd613fe58817a53a83) Thanks [@matthprost](https://github.com/matthprost)! - Theme colors update

## 1.1.5

### Patch Changes

- [#2721](https://github.com/scaleway/ultraviolet/pull/2721) [`b3b116a2`](https://github.com/scaleway/ultraviolet/commit/b3b116a205f111180310c6077b072c6d102fec0f) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Use `exports` field with `type: module`

## 1.1.4

### Patch Changes

- [#2700](https://github.com/scaleway/ultraviolet/pull/2700) [`8b00f035`](https://github.com/scaleway/ultraviolet/commit/8b00f035dec5a553760d3fd64631ef32b3c20c0b) Thanks [@matthprost](https://github.com/matthprost)! - Update tokens values

## 1.1.3

### Patch Changes

- [#2696](https://github.com/scaleway/ultraviolet/pull/2696) [`fdb80379`](https://github.com/scaleway/ultraviolet/commit/fdb80379780275ad52480402341646fb49012331) Thanks [@matthprost](https://github.com/matthprost)! - Updated tokens colors for dark, light and darker

## 1.1.2

### Patch Changes

- [#2694](https://github.com/scaleway/ultraviolet/pull/2694) [`8b916b8b`](https://github.com/scaleway/ultraviolet/commit/8b916b8b89b3c885661aae0a53573d9f8c0dd23d) Thanks [@matthprost](https://github.com/matthprost)! - Fix Tabs and Carousel colors and updated data charts colors in dark and darker

## 1.1.1

### Patch Changes

- [#2691](https://github.com/scaleway/ultraviolet/pull/2691) [`48dfbc6d`](https://github.com/scaleway/ultraviolet/commit/48dfbc6dbe4f0155fcac1c119c0c607d2736947c) Thanks [@matthprost](https://github.com/matthprost)! - Fix export of darker theme

## 1.1.0

### Minor Changes

- [#2668](https://github.com/scaleway/ultraviolet/pull/2668) [`8b88b5c3`](https://github.com/scaleway/ultraviolet/commit/8b88b5c3576f6c300594ed914f73207473cc4b6b) Thanks [@matthprost](https://github.com/matthprost)! - New themes darker and colors for all components to be more accessibles and pass WCAG AA

## 1.0.0

### Major Changes

- [#2628](https://github.com/scaleway/ultraviolet/pull/2628) [`a084d91e`](https://github.com/scaleway/ultraviolet/commit/a084d91e69c9eb0575a6a9d73b0dafff4fa5129e) Thanks [@matthprost](https://github.com/matthprost)! - - Renaming `@scaleway/themes` => `@ultraviolet/themes`
  - Renaming `@scaleway/form` => `@ultraviolet/form`

## 1.5.0

### Minor Changes

- [#2629](https://github.com/scaleway/ultraviolet/pull/2629) [`01ab2175`](https://github.com/scaleway/ultraviolet/commit/01ab21759aa109765a625a5bc1ad1865dde107f0) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️⚠️⚠️ **THOSE PACKAGES ARE DEPRECATED** ⚠️⚠️⚠️

  We renamed the scope of our packages from `@scaleway` to `@ultraviolet` and made a major update to all of them.

  Please use `@ultraviolet/ui@1.0.0`, `@ultraviolet/form@1.0.0`, and `@ultraviolet/themes@1.0.0` instead.

## 1.4.0

### Minor Changes

- [#2554](https://github.com/scaleway/scaleway-ui/pull/2554) [`46fc6182`](https://github.com/scaleway/scaleway-ui/commit/46fc618216dea025af3dd6f4c3914889a9d0d5bf) Thanks [@matthprost](https://github.com/matthprost)! - Sync spaces and radii from theme

## 1.3.0

### Minor Changes

- [#2412](https://github.com/scaleway/scaleway-ui/pull/2412) [`3661ff1a`](https://github.com/scaleway/scaleway-ui/commit/3661ff1a8a04ea8972ed52e4f545f26f891d9408) Thanks [@matthprost](https://github.com/matthprost)! - New charts data colors

- [#2412](https://github.com/scaleway/scaleway-ui/pull/2412) [`3661ff1a`](https://github.com/scaleway/scaleway-ui/commit/3661ff1a8a04ea8972ed52e4f545f26f891d9408) Thanks [@matthprost](https://github.com/matthprost)! - New gradient colors

## 1.2.4

### Patch Changes

- [#2390](https://github.com/scaleway/scaleway-ui/pull/2390) [`109317e9`](https://github.com/scaleway/scaleway-ui/commit/109317e9c216b3c1b85d60b06dd2f7db4f9a1559) Thanks [@matthprost](https://github.com/matthprost)! - Add ButtonV2 component

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.2.3 (2023-03-29)

### :package: Chore

- **release:** publish ([47ce858](https://github.com/scaleway/scaleway-ui/commit/47ce858b8af35805d9b45f3286a8669475732acc))

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#2369](https://github.com/scaleway/scaleway-ui/issues/2369)) ([7eb0766](https://github.com/scaleway/scaleway-ui/commit/7eb076695f045d7ba71d8ada86bf94d143185c10))

## [1.2.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/themes@1.2.1...@scaleway/themes@1.2.2) (2023-03-06)

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#2289](https://github.com/scaleway/scaleway-ui/issues/2289)) ([8a29cb2](https://github.com/scaleway/scaleway-ui/commit/8a29cb2f131c985c56a8d0bab7dac385ada57a64))

## 1.2.1 (2023-03-04)

### :package: Chore

- **release:** publish ([c03796d](https://github.com/scaleway/scaleway-ui/commit/c03796d76d5bbe80c9e3212b173c8022f01419bb))

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#2287](https://github.com/scaleway/scaleway-ui/issues/2287)) ([b29b366](https://github.com/scaleway/scaleway-ui/commit/b29b366818d195afc00285c2595f8342d342d10d))

## 1.2.0 (2023-02-28)

### :package: Chore

- **release:** publish ([9d54797](https://github.com/scaleway/scaleway-ui/commit/9d547970efc874284ca6c15a0c54cfb465244232))

### :gear: Features

- new product and category colors ([#2278](https://github.com/scaleway/scaleway-ui/issues/2278)) ([7c1febd](https://github.com/scaleway/scaleway-ui/commit/7c1febdf802d49d83f34d9b0462cd78bc2c9d9fb))

## [1.1.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/themes@1.1.2...@scaleway/themes@1.1.3) (2023-02-24)

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#2275](https://github.com/scaleway/scaleway-ui/issues/2275)) ([e802e69](https://github.com/scaleway/scaleway-ui/commit/e802e69898d5e688926caeb0ef3a5c6d5fe26da9))

## 1.1.2 (2023-02-23)

### :package: Chore

- **release:** publish ([60c6ba4](https://github.com/scaleway/scaleway-ui/commit/60c6ba4623fb8bb7387ee7d6bdfa1e02c7be5ffe))

### :bug: Bug Fixes

- use radii from theme ([#2271](https://github.com/scaleway/scaleway-ui/issues/2271)) ([8075443](https://github.com/scaleway/scaleway-ui/commit/8075443d1dba73e8bab3bccf15ddb50856883592))

## 1.1.1 (2023-02-17)

### :package: Chore

- **release:** publish ([4cf136e](https://github.com/scaleway/scaleway-ui/commit/4cf136e1eb5c796a109a49731a4bb1f6b4977e7c))

### :bug: Bug Fixes

- **Checkbox:** to use radii from theme ([#2263](https://github.com/scaleway/scaleway-ui/issues/2263)) ([653b6ea](https://github.com/scaleway/scaleway-ui/commit/653b6ea136de0c26b650d50e51e3f8666486b3fb))

## 1.1.0 (2023-02-13)

### :gear: Features

- split theme into another package ([#2247](https://github.com/scaleway/scaleway-ui/issues/2247)) ([1ac89e5](https://github.com/scaleway/scaleway-ui/commit/1ac89e58d19bac1cd40531bb4693ea9e927b32ef))
