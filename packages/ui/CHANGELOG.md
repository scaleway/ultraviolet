# Change Log

## 3.9.0

### Minor Changes

- [#6077](https://github.com/scaleway/ultraviolet/pull/6077) [`884a3c5`](https://github.com/scaleway/ultraviolet/commit/884a3c5b913a618e2fffc82b98753f7c493bd5a1) Thanks [@lisalupi](https://github.com/lisalupi)! - `FileInput`:

  - cannot drop files which do not respect the accept prop
  - when `multiple = false`, if multiple files are dropped at once, only the first one should be added

- [#6081](https://github.com/scaleway/ultraviolet/pull/6081) [`fcb3341`](https://github.com/scaleway/ultraviolet/commit/fcb33414be9c1994e367a2b288472f1ad6bfeeb1) Thanks [@lisalupi](https://github.com/lisalupi)! - `ThemeProvider`: Inject a default font color (`theme.colors.neutral.text`) so that all text in the app inherits this color. This allows the text color to adapt dynamically with the theme, rather than defaulting to black regardless of the active theme (e.g., dark mode). A default background color is added too (`theme.colors.neutral.background`).

- [#6056](https://github.com/scaleway/ultraviolet/pull/6056) [`5517d73`](https://github.com/scaleway/ultraviolet/commit/5517d731dcbb46da670c9695043d83c61677fe1a) Thanks [@lisalupi](https://github.com/lisalupi)! - - `Drawer`: new prop `push`, fix style (override modal style) and fix slide in animation
  - `Modal`: new prop `ref`

### Patch Changes

- [#6065](https://github.com/scaleway/ultraviolet/pull/6065) [`a96c4d8`](https://github.com/scaleway/ultraviolet/commit/a96c4d82a5bdf30822d4aaadaceaaafe616e6883) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: sizes fixes:

  - adapt font size on dropdown and placeholder depending on SelectInput size
  - small textInput when small
  - smaller icons when small
  - fix item padding when small

- [#5982](https://github.com/scaleway/ultraviolet/pull/5982) [`9092995`](https://github.com/scaleway/ultraviolet/commit/90929953481b4c7cd24bc57a74fe3143135ee231) Thanks [@fabienhebert](https://github.com/fabienhebert)! - DateInput: fix reset value

- [#6093](https://github.com/scaleway/ultraviolet/pull/6093) [`0eb656f`](https://github.com/scaleway/ultraviolet/commit/0eb656f02dd4b10ac99757ff71de97b0c0b0acc4) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: fix count of options so that is does not display an empty state when all options are disabled

- [#6105](https://github.com/scaleway/ultraviolet/pull/6105) [`a623c0f`](https://github.com/scaleway/ultraviolet/commit/a623c0ff315e8e77a4b030e52d76cacc272b3d70) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/use-media` to `3.0.7`.

- [#6103](https://github.com/scaleway/ultraviolet/pull/6103) [`7c5e8aa`](https://github.com/scaleway/ultraviolet/commit/7c5e8aacbc4c34c42d828b1f3633bfce9e1c649e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/random-name` to `5.1.4`.

- [#6112](https://github.com/scaleway/ultraviolet/pull/6112) [`76d82e1`](https://github.com/scaleway/ultraviolet/commit/76d82e13d008ffdfbdab115e53f6da3e359ffa9b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.14`.

- [#6085](https://github.com/scaleway/ultraviolet/pull/6085) [`3b0c551`](https://github.com/scaleway/ultraviolet/commit/3b0c551b1092de318878a3c17f795a244e949569) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.13`.

- [#6087](https://github.com/scaleway/ultraviolet/pull/6087) [`81af8ef`](https://github.com/scaleway/ultraviolet/commit/81af8ef520ca38208a5b5f118957f2ff56b1db7f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.29.0`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.29.0`.
  Updated dependency `@babel/preset-env` to `7.29.0`.

- [#6102](https://github.com/scaleway/ultraviolet/pull/6102) [`0ae6194`](https://github.com/scaleway/ultraviolet/commit/0ae61943b9891e4abf9ad3294a7c7689dc6a7ae3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/fuzzy-search` to `1.0.2`.

- [#6083](https://github.com/scaleway/ultraviolet/pull/6083) [`9ec1f47`](https://github.com/scaleway/ultraviolet/commit/9ec1f473d91909a79eb8ef4156e10d76304bfc24) Thanks [@lisalupi](https://github.com/lisalupi)! - `OptionSelector`: can add a footer, search bar, empty state, load more and tooltip to the selectors

- [#6097](https://github.com/scaleway/ultraviolet/pull/6097) [`eb2ca15`](https://github.com/scaleway/ultraviolet/commit/eb2ca15481ac0be4a41430789dc904aaa653cb46) Thanks [@lisalupi](https://github.com/lisalupi)! - `Drawer`: remove box shadow and add border when push and refactor of some style to avoid "!important"

- [#6091](https://github.com/scaleway/ultraviolet/pull/6091) [`246960e`](https://github.com/scaleway/ultraviolet/commit/246960e87d80fd02c01fbd905e515d1e01e7bc6a) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: fix empty div when searching

- [#6115](https://github.com/scaleway/ultraviolet/pull/6115) [`2f268dd`](https://github.com/scaleway/ultraviolet/commit/2f268dd0c904c56128db3a50ace7f5f87286d72d) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: tooltips on options should be visible when `multiselect = true`

- Updated dependencies [[`fcb3341`](https://github.com/scaleway/ultraviolet/commit/fcb33414be9c1994e367a2b288472f1ad6bfeeb1), [`da1a564`](https://github.com/scaleway/ultraviolet/commit/da1a5646dbc078e6ee12527cf2ce07f374dea1ff), [`76d82e1`](https://github.com/scaleway/ultraviolet/commit/76d82e13d008ffdfbdab115e53f6da3e359ffa9b), [`3b0c551`](https://github.com/scaleway/ultraviolet/commit/3b0c551b1092de318878a3c17f795a244e949569), [`81af8ef`](https://github.com/scaleway/ultraviolet/commit/81af8ef520ca38208a5b5f118957f2ff56b1db7f)]:
  - @ultraviolet/themes@3.1.0
  - @ultraviolet/icons@5.1.3
  - @ultraviolet/utils@1.0.4

## 3.8.2

### Patch Changes

- [#6064](https://github.com/scaleway/ultraviolet/pull/6064) [`6de2594`](https://github.com/scaleway/ultraviolet/commit/6de2594c6254bb98f51a05e22b3c4b70504fe2e3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.2.4`.
  Updated dependency `@types/react` to `19.2.10`.
  Updated dependency `react-dom` to `19.2.4`.
- Updated dependencies [[`6de2594`](https://github.com/scaleway/ultraviolet/commit/6de2594c6254bb98f51a05e22b3c4b70504fe2e3)]:
  - @ultraviolet/icons@5.1.2
  - @ultraviolet/themes@3.0.6
  - @ultraviolet/utils@1.0.3

## 3.8.1

### Patch Changes

- [#6066](https://github.com/scaleway/ultraviolet/pull/6066) [`f4d92c5`](https://github.com/scaleway/ultraviolet/commit/f4d92c5db0098b1e19fce048088d6185fa8191fc) Thanks [@lisalupi](https://github.com/lisalupi)! - `EmptyState`: add full width

- Updated dependencies [[`9413c49`](https://github.com/scaleway/ultraviolet/commit/9413c495b7e614f4d6e73e421b0be7319ad35e22), [`75c6cce`](https://github.com/scaleway/ultraviolet/commit/75c6ccec42acedc701defe36f82f48e0b8ecb679)]:
  - @ultraviolet/utils@1.0.2
  - @ultraviolet/icons@5.1.1

## 3.8.0

### Minor Changes

- [#6014](https://github.com/scaleway/ultraviolet/pull/6014) [`56658d2`](https://github.com/scaleway/ultraviolet/commit/56658d2a16785d4dd2d8f2f4c2c7490a5cc9c0df) Thanks [@atissedrescaleway](https://github.com/atissedrescaleway)! - - Added `render` prop to Link and Button components for composition with custom elements
  - Enables integration with routing libraries like Next.js Link without losing Ultraviolet styling
  - Element form: `<Link render={<NextLink href="/about" />}>About</Link>`
  - Function form: `<Link render={(props) => <NextLink {...props} href="/about" />}>About</Link>`
  - Replaces the need for deprecated `legacyBehavior` prop in Next.js Link components
  - Added `polymorphic` utility for render prop handling and props merging

### Patch Changes

- [#6018](https://github.com/scaleway/ultraviolet/pull/6018) [`e4238e6`](https://github.com/scaleway/ultraviolet/commit/e4238e6ecfa439ba078b629ce7d44127ccae48f9) Thanks [@lisalupi](https://github.com/lisalupi)! - `List`: `<><List.Cell /><List.Cell /></>` should be seen as 2 columns instead of 1. This was problematic when column width were defined.

- [#6049](https://github.com/scaleway/ultraviolet/pull/6049) [`3e8b0fe`](https://github.com/scaleway/ultraviolet/commit/3e8b0feeee6904619b03fbe44c61b79bfadcf13d) Thanks [@lisalupi](https://github.com/lisalupi)! - Replace remaining `end` and `start` by `flex-end/start`

- [#6034](https://github.com/scaleway/ultraviolet/pull/6034) [`4d53257`](https://github.com/scaleway/ultraviolet/commit/4d53257eeee42b8dadae0c17898608b6f30b1e9d) Thanks [@lisalupi](https://github.com/lisalupi)! - `TextInput`: fix css causing broken suffix separator on DateInput

- [#6021](https://github.com/scaleway/ultraviolet/pull/6021) [`9461d8c`](https://github.com/scaleway/ultraviolet/commit/9461d8c764fe59a13450e8880b76a731718e1ca2) Thanks [@lisalupi](https://github.com/lisalupi)! - Add title to svg for accessibility

- [#6020](https://github.com/scaleway/ultraviolet/pull/6020) [`5ea2afe`](https://github.com/scaleway/ultraviolet/commit/5ea2afe47e6f6f2bbebca207e25498055d3588ee) Thanks [@lisalupi](https://github.com/lisalupi)! - `List`: expandable button should not shrink when `colMode="strict"`

- [#6051](https://github.com/scaleway/ultraviolet/pull/6051) [`3a7eb2a`](https://github.com/scaleway/ultraviolet/commit/3a7eb2ad19a47b65c2fcac84dcb3be94271dcc4c) Thanks [@philibea](https://github.com/philibea)! - Support for toggle type in addition to radio and checkbox inside SelectableCard, Proper label-input associations using `for` attributes for Toggle

- Updated dependencies [[`ba37cc2`](https://github.com/scaleway/ultraviolet/commit/ba37cc2143d766db0d86c31dc3bae7c35d889e16), [`00b7be6`](https://github.com/scaleway/ultraviolet/commit/00b7be62fcb42d1639e90c6f7c81fbe588806c56), [`9461d8c`](https://github.com/scaleway/ultraviolet/commit/9461d8c764fe59a13450e8880b76a731718e1ca2)]:
  - @ultraviolet/icons@5.1.0

## 3.7.1

### Patch Changes

- [#6037](https://github.com/scaleway/ultraviolet/pull/6037) [`31ddb5d`](https://github.com/scaleway/ultraviolet/commit/31ddb5d664b7a5a6193f1f290b85fdfd714aec95) Thanks [@lisalupi](https://github.com/lisalupi)! - `Link`: no prominence on visited links

- [#5849](https://github.com/scaleway/ultraviolet/pull/5849) [`405191b`](https://github.com/scaleway/ultraviolet/commit/405191b6d45bca78b5f519d8f3a0b834673d3f7b) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - add per page dropdown target portal

- [#6038](https://github.com/scaleway/ultraviolet/pull/6038) [`4e17bc7`](https://github.com/scaleway/ultraviolet/commit/4e17bc7c713ce7e751f28f4b71e2413d055808e8) Thanks [@PierreBertinet](https://github.com/PierreBertinet)! - Make splash description handle complex React node

- [#6032](https://github.com/scaleway/ultraviolet/pull/6032) [`f35febd`](https://github.com/scaleway/ultraviolet/commit/f35febdb8fdd6960b365fc6b8e42462069e77048) Thanks [@philibea](https://github.com/philibea)! - Fix Text component variant style, apply default color of the sentiment instead of of nothing

- Updated dependencies [[`9999889`](https://github.com/scaleway/ultraviolet/commit/9999889888c8cec1fa304ff3b903523232401957), [`428a597`](https://github.com/scaleway/ultraviolet/commit/428a59713015f9b04bc2b324baef7fe28f57d49e)]:
  - @ultraviolet/icons@5.0.7
  - @ultraviolet/themes@3.0.5

## 3.7.0

### Minor Changes

- [#6016](https://github.com/scaleway/ultraviolet/pull/6016) [`c8fd687`](https://github.com/scaleway/ultraviolet/commit/c8fd68734ec9b8fa38420414ff6ebd7741f89846) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - `LineChart`: new tooltipfunction prop

- [#6009](https://github.com/scaleway/ultraviolet/pull/6009) [`1c76a24`](https://github.com/scaleway/ultraviolet/commit/1c76a246cc1113ec8238dedf0312706f5ed32807) Thanks [@lisalupi](https://github.com/lisalupi)! - Reduce usage of `globalStyle`

### Patch Changes

- [#6033](https://github.com/scaleway/ultraviolet/pull/6033) [`fb32c13`](https://github.com/scaleway/ultraviolet/commit/fb32c131a4b4b4643285dd0371342fed4c3dceaa) Thanks [@philibea](https://github.com/philibea)! - Fix require export based on .cjs files instead of .js

- [#6015](https://github.com/scaleway/ultraviolet/pull/6015) [`e93190f`](https://github.com/scaleway/ultraviolet/commit/e93190fc9a6ae8c18a3dd558f62dabe499cba14c) Thanks [@lisalupi](https://github.com/lisalupi)! - `Menu`: clicking on a menu item to open a nested menu should not close the parent menu

- [#5990](https://github.com/scaleway/ultraviolet/pull/5990) [`7c676d2`](https://github.com/scaleway/ultraviolet/commit/7c676d2023946b7315844d25d7617ac3120fb74a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.9`.

- [#6013](https://github.com/scaleway/ultraviolet/pull/6013) [`8f4eb5c`](https://github.com/scaleway/ultraviolet/commit/8f4eb5c6dd994d597bc48abd503906841178156d) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix various broken styles caused by css selector re-ordering

- Updated dependencies [[`fb32c13`](https://github.com/scaleway/ultraviolet/commit/fb32c131a4b4b4643285dd0371342fed4c3dceaa), [`7c676d2`](https://github.com/scaleway/ultraviolet/commit/7c676d2023946b7315844d25d7617ac3120fb74a)]:
  - @ultraviolet/themes@3.0.4
  - @ultraviolet/icons@5.0.6
  - @ultraviolet/utils@1.0.1

## 3.6.0

### Minor Changes

- [#6000](https://github.com/scaleway/ultraviolet/pull/6000) [`e32a1c6`](https://github.com/scaleway/ultraviolet/commit/e32a1c607ce28322ffe0c31d8f722f9040ddffd8) Thanks [@lisalupi](https://github.com/lisalupi)! - `Popup`: fix arrow position when (computed) position is "left" or "right"

### Patch Changes

- [#6012](https://github.com/scaleway/ultraviolet/pull/6012) [`f8c97f3`](https://github.com/scaleway/ultraviolet/commit/f8c97f3746a2e3e0ffc8580935f28bb00212fd2d) Thanks [@lisalupi](https://github.com/lisalupi)! - `Button`: fix disabled style

- [#5988](https://github.com/scaleway/ultraviolet/pull/5988) [`bace03b`](https://github.com/scaleway/ultraviolet/commit/bace03b4aa3dba12f50d214b73d6033e2fc051dd) Thanks [@lisalupi](https://github.com/lisalupi)! - `List.Row`: new prop `onClick` & primary border when focus-within

- [#6004](https://github.com/scaleway/ultraviolet/pull/6004) [`7a70c84`](https://github.com/scaleway/ultraviolet/commit/7a70c843313863916f6520c4a69418dd1c421856) Thanks [@lisalupi](https://github.com/lisalupi)! - `Checkbox`: input aligned with the first line of the label instead of centered

- Updated dependencies [[`ce69316`](https://github.com/scaleway/ultraviolet/commit/ce693160ffa3d471fd58235304b6826f33bf6640)]:
  - @ultraviolet/icons@5.0.5

## 3.5.1

### Patch Changes

- [#5987](https://github.com/scaleway/ultraviolet/pull/5987) [`94bf725`](https://github.com/scaleway/ultraviolet/commit/94bf7250328c6ac91cfd3aac3f8bff6df75e1bd4) Thanks [@lisalupi](https://github.com/lisalupi)! - `List`: fix deprecated message. Note that in future major version, prop `colMode` will be removed and default behavior will `colMode="strict"`.

- [#5975](https://github.com/scaleway/ultraviolet/pull/5975) [`98abf07`](https://github.com/scaleway/ultraviolet/commit/98abf07b11fd74bb458cb7907f18167f5613aae5) Thanks [@lisalupi](https://github.com/lisalupi)! - `Link`:

  - new dotted underline for accessibility
  - switch `:visited` color from primary to secondary to avoid confusion with `sentiment="primary"`

- [#5981](https://github.com/scaleway/ultraviolet/pull/5981) [`6e4bbf2`](https://github.com/scaleway/ultraviolet/commit/6e4bbf23dc97370604609c11fed75f079f78f48b) Thanks [@philibea](https://github.com/philibea)! - Add a missing forwardRef for Stack component which was remove during vanilla-extract migration

- [#5984](https://github.com/scaleway/ultraviolet/pull/5984) [`648e6ca`](https://github.com/scaleway/ultraviolet/commit/648e6cafb7a2e2d090e1b234f5b86d9986b852e9) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: fix overflow inside dropdown
  `TextInput`: fix prefix border-color

- [#5949](https://github.com/scaleway/ultraviolet/pull/5949) [`2fa66cb`](https://github.com/scaleway/ultraviolet/commit/2fa66cba74f8809b3c93708519003f8cd563dcd0) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`:

  - new prop `combobox` to dynamically add options when searchable
  - fix navigation in the dropdown using keys when searchable

- [#5971](https://github.com/scaleway/ultraviolet/pull/5971) [`fe79b43`](https://github.com/scaleway/ultraviolet/commit/fe79b43d8bda3660fff2e00ad566befb1bbbc90b) Thanks [@lisalupi](https://github.com/lisalupi)! - `Slider`: new prop `customValueDisplay`

- [#5918](https://github.com/scaleway/ultraviolet/pull/5918) [`5961951`](https://github.com/scaleway/ultraviolet/commit/5961951efb3c41c1407d48885fb315b6f1272ee7) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: new props "groupEmptyState" and "groupError"

- Updated dependencies [[`3c88802`](https://github.com/scaleway/ultraviolet/commit/3c8880208839eae1a25cac5b341dd2882713dbbd)]:
  - @ultraviolet/themes@3.0.3
  - @ultraviolet/icons@5.0.4

## 3.5.0

### Minor Changes

- [#5978](https://github.com/scaleway/ultraviolet/pull/5978) [`bc5944a`](https://github.com/scaleway/ultraviolet/commit/bc5944a8a06b9dcec1e2465a99705580cc1cfc5f) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - chore(TreeMapChart): change styling method so it does break cards size computations

### Patch Changes

- [#5968](https://github.com/scaleway/ultraviolet/pull/5968) [`8941121`](https://github.com/scaleway/ultraviolet/commit/8941121b00778cd24a26ef37e914dae6d10ea173) Thanks [@lisalupi](https://github.com/lisalupi)! - `TextArea`: adapt height & resize when rows and maxRows props are updated

- [#5969](https://github.com/scaleway/ultraviolet/pull/5969) [`b91a316`](https://github.com/scaleway/ultraviolet/commit/b91a316c7b24041fdf2878a0ea1ac2825f260bbc) Thanks [@lisalupi](https://github.com/lisalupi)! - `Label`: properly use classname prop
  `OptionSelector`: add \* on label when required and fix alignment issue when error

- [#5979](https://github.com/scaleway/ultraviolet/pull/5979) [`9ca5894`](https://github.com/scaleway/ultraviolet/commit/9ca5894a892da3331b602541200d2958852ac2d4) Thanks [@lisalupi](https://github.com/lisalupi)! - `Slider`: fix invalid `calc` and double-slider style

- [#5967](https://github.com/scaleway/ultraviolet/pull/5967) [`c82c60c`](https://github.com/scaleway/ultraviolet/commit/c82c60c7b443dd78dc9baf88190ed05de8fe40bb) Thanks [@lisalupi](https://github.com/lisalupi)! - `FileInput`: replace `p` with `div` to avoid hydration error

- [#5967](https://github.com/scaleway/ultraviolet/pull/5967) [`c82c60c`](https://github.com/scaleway/ultraviolet/commit/c82c60c7b443dd78dc9baf88190ed05de8fe40bb) Thanks [@lisalupi](https://github.com/lisalupi)! - Use `flex-start` and `flex-end` instead of `start` and `end` (css)

## 3.4.0

### Minor Changes

- [#5898](https://github.com/scaleway/ultraviolet/pull/5898) [`fb6d20f`](https://github.com/scaleway/ultraviolet/commit/fb6d20fc543d51458091546e9e4120299449a397) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `OptionSelector`

  This component is part of a new type of components, meant to replace `@ultraviolet/plus`. Import it from `@ultraviolet/ui/compositions/OptionSelector`.

### Patch Changes

- [#5963](https://github.com/scaleway/ultraviolet/pull/5963) [`91d356e`](https://github.com/scaleway/ultraviolet/commit/91d356ecaf117813d9e84cebb9f31bf2f41e93b7) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: use `useContext` instead of `use` for compatibility

- [#5898](https://github.com/scaleway/ultraviolet/pull/5898) [`fb6d20f`](https://github.com/scaleway/ultraviolet/commit/fb6d20fc543d51458091546e9e4120299449a397) Thanks [@lisalupi](https://github.com/lisalupi)! - `Label`: add prop `classname`

## 3.3.1

### Patch Changes

- [#5958](https://github.com/scaleway/ultraviolet/pull/5958) [`b844a9d`](https://github.com/scaleway/ultraviolet/commit/b844a9d5915b1bd4a7d901e96d841eeaecf827f3) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: fix overflow in dropdown

## 3.3.0

### Minor Changes

- [#5937](https://github.com/scaleway/ultraviolet/pull/5937) [`22994af`](https://github.com/scaleway/ultraviolet/commit/22994af651f7eb409ed6568dd7e11cbe1445e126) Thanks [@lisalupi](https://github.com/lisalupi)! - `Tag`:

  - add copy icon when `copiable` with prop `copyButton`
  - new variant "code"
  - fix hover style when copiable

- [#5874](https://github.com/scaleway/ultraviolet/pull/5874) [`64a051e`](https://github.com/scaleway/ultraviolet/commit/64a051eb9d1de401edfda77d931ce72382fed7e1) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `FileInput`

### Patch Changes

- [#5892](https://github.com/scaleway/ultraviolet/pull/5892) [`9d45b88`](https://github.com/scaleway/ultraviolet/commit/9d45b88cc22118f8bcd498aec748d1ceff09e845) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: fix padding and fix clear button size

- [#5941](https://github.com/scaleway/ultraviolet/pull/5941) [`f1b9119`](https://github.com/scaleway/ultraviolet/commit/f1b9119d59378e56c44caa307a3040e0ef3b613d) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: fix dropdown width

- [#5942](https://github.com/scaleway/ultraviolet/pull/5942) [`ad3fddd`](https://github.com/scaleway/ultraviolet/commit/ad3fddd2ce77f59a7f5e04157f4c363180eec55c) Thanks [@lisalupi](https://github.com/lisalupi)! - `Stepper`: remove useless margin

- [#5943](https://github.com/scaleway/ultraviolet/pull/5943) [`d8f8952`](https://github.com/scaleway/ultraviolet/commit/d8f8952f530eea717f7bc3756b8401b39795661d) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: fix alignment in the select bar

- [#5905](https://github.com/scaleway/ultraviolet/pull/5905) [`9583dc7`](https://github.com/scaleway/ultraviolet/commit/9583dc703bdd0b65f5c86c268137a45b5d59aa05) Thanks [@lisalupi](https://github.com/lisalupi)! - `PieChart`: legend text should wrap and not overflow

- [#5896](https://github.com/scaleway/ultraviolet/pull/5896) [`f72efaf`](https://github.com/scaleway/ultraviolet/commit/f72efafcac5143935efe7d62df823131e6e023f7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.2.3`.
  Updated dependency `react-dom` to `19.2.3`.

- [#5928](https://github.com/scaleway/ultraviolet/pull/5928) [`c532a07`](https://github.com/scaleway/ultraviolet/commit/c532a071ae72689ca6c68233eff49988e1208299) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/random-name` to `5.1.3`.

- [#5940](https://github.com/scaleway/ultraviolet/pull/5940) [`9bc47cf`](https://github.com/scaleway/ultraviolet/commit/9bc47cfa03ca1e380e01f147cabfaeacb3c7471d) Thanks [@philibea](https://github.com/philibea)! - SearchInput reset correctly when undefined is set by the user

- Updated dependencies [[`f72efaf`](https://github.com/scaleway/ultraviolet/commit/f72efafcac5143935efe7d62df823131e6e023f7), [`5adc0e6`](https://github.com/scaleway/ultraviolet/commit/5adc0e6b1bc3e610fd21f03b320639dcc43b2df1), [`d509f5c`](https://github.com/scaleway/ultraviolet/commit/d509f5cc1b5469fdb368973544d8d0d6a38dfbc6)]:
  - @ultraviolet/icons@5.0.3
  - @ultraviolet/themes@3.0.2

## 3.2.1

### Patch Changes

- [#5891](https://github.com/scaleway/ultraviolet/pull/5891) [`1b34a68`](https://github.com/scaleway/ultraviolet/commit/1b34a68987c49c100e2fe01dbc9b6814bb3e7749) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectableCard`: new prop `indented` (true by default) to add or remove an indent in order to align the children with the label

- [#5901](https://github.com/scaleway/ultraviolet/pull/5901) [`c4708a8`](https://github.com/scaleway/ultraviolet/commit/c4708a82dae51724af2fe3a0f13d777138b63a78) Thanks [@lisalupi](https://github.com/lisalupi)! - `List` width variable should not also be minWidth and maxWidth

## 3.2.0

### Minor Changes

- [#5875](https://github.com/scaleway/ultraviolet/pull/5875) [`5374a2a`](https://github.com/scaleway/ultraviolet/commit/5374a2afe9c58a445b2a0dc3ff3a5733ece0a4ea) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `List.Cell` width when it is in %

- [#5878](https://github.com/scaleway/ultraviolet/pull/5878) [`22e27d6`](https://github.com/scaleway/ultraviolet/commit/22e27d621a269ddfd8f952e76e20b11c6914ad2b) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix(List.Row): Do not map over invalid children, if a `null` child exist it will break the columns widths because we use child index to retrieve column style

### Patch Changes

- [#5863](https://github.com/scaleway/ultraviolet/pull/5863) [`ec99ee5`](https://github.com/scaleway/ultraviolet/commit/ec99ee591e1de6b9c9428146fa7f8cb1bda1b81e) Thanks [@lisalupi](https://github.com/lisalupi)! - `PasswordCheck`: update style

- [#5884](https://github.com/scaleway/ultraviolet/pull/5884) [`d1b9517`](https://github.com/scaleway/ultraviolet/commit/d1b9517b55a3f84ea94d52e09bbbb4b872e7219c) Thanks [@lisalupi](https://github.com/lisalupi)! - `Stepper`:

  - Change the prominence of the "Done" bullet
  - Reduce height of the bar between steps (2px -> 1px)

- [#5882](https://github.com/scaleway/ultraviolet/pull/5882) [`774fb31`](https://github.com/scaleway/ultraviolet/commit/774fb31d7929ae8bf20f180f54d38fec8fdb968b) Thanks [@lisalupi](https://github.com/lisalupi)! - `Slider`: Add prop `labelDescription`

- [#5857](https://github.com/scaleway/ultraviolet/pull/5857) [`e173e1d`](https://github.com/scaleway/ultraviolet/commit/e173e1dcc89be8ff5ce30b5ac1e00ce5e8e84287) Thanks [@lisalupi](https://github.com/lisalupi)! - Use `cn` function to generate clean classnames

- [#5869](https://github.com/scaleway/ultraviolet/pull/5869) [`3a1daaa`](https://github.com/scaleway/ultraviolet/commit/3a1daaad38cbebec5509e1162c4351c0a251afd4) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Dependency upgrade: Upgrade vitest to v4

- [#5861](https://github.com/scaleway/ultraviolet/pull/5861) [`ec3805a`](https://github.com/scaleway/ultraviolet/commit/ec3805aff08299614dce412db7ab9fbaa6141f56) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.2.1`.
  Updated dependency `react-dom` to `19.2.1`.

- [#5890](https://github.com/scaleway/ultraviolet/pull/5890) [`44aa0e5`](https://github.com/scaleway/ultraviolet/commit/44aa0e5fc7f789c2c286c238dc2f528a69677581) Thanks [@philibea](https://github.com/philibea)! - tsconfig add isolated module

- Updated dependencies [[`e173e1d`](https://github.com/scaleway/ultraviolet/commit/e173e1dcc89be8ff5ce30b5ac1e00ce5e8e84287), [`e173e1d`](https://github.com/scaleway/ultraviolet/commit/e173e1dcc89be8ff5ce30b5ac1e00ce5e8e84287), [`ec3805a`](https://github.com/scaleway/ultraviolet/commit/ec3805aff08299614dce412db7ab9fbaa6141f56), [`44aa0e5`](https://github.com/scaleway/ultraviolet/commit/44aa0e5fc7f789c2c286c238dc2f528a69677581)]:
  - @ultraviolet/themes@3.0.1
  - @ultraviolet/icons@5.0.2

## 3.1.1

### Patch Changes

- [#5870](https://github.com/scaleway/ultraviolet/pull/5870) [`10ced0d`](https://github.com/scaleway/ultraviolet/commit/10ced0d1c7e22af4ccaf4b8f4e60b655e56579da) Thanks [@lisalupi](https://github.com/lisalupi)! - `List.Cell`: fix width of child to take into account padding

## 3.1.0

### Minor Changes

- [#5843](https://github.com/scaleway/ultraviolet/pull/5843) [`634c88f`](https://github.com/scaleway/ultraviolet/commit/634c88f9597b432c21afc9903c0d96e3d54b578d) Thanks [@lisalupi](https://github.com/lisalupi)! - `BarStack`:
  - change style
  - add props `label` and `labelDescription` to add a Label on top of the chart
  - add prop `legend` to show the legend beneath the chart instead of inside of it
  - add prop `size`
  - text should have an ellipsis when overflowing

### Patch Changes

- [#5835](https://github.com/scaleway/ultraviolet/pull/5835) [`c650f4f`](https://github.com/scaleway/ultraviolet/commit/c650f4fd70be4b6a09477514b5719becec6a278b) Thanks [@PierreBertinet](https://github.com/PierreBertinet)! - Fix color of disabled option description text

- [#5828](https://github.com/scaleway/ultraviolet/pull/5828) [`7bde3d9`](https://github.com/scaleway/ultraviolet/commit/7bde3d9d0c905f610b903d1af7802742e3cfcc4e) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`:

  - click outside should work in every context
  - fix placeholder alignment when small

- [#5846](https://github.com/scaleway/ultraviolet/pull/5846) [`019e4b3`](https://github.com/scaleway/ultraviolet/commit/019e4b3322d76f29986f275f5e852cc9d2089a43) Thanks [@lisalupi](https://github.com/lisalupi)! - `Snippet`: add label and helper

- [#5845](https://github.com/scaleway/ultraviolet/pull/5845) [`cc568fc`](https://github.com/scaleway/ultraviolet/commit/cc568fc91c73e4ae185f304176a8690132eadff8) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - fix make tag input multiline by default

- [#5824](https://github.com/scaleway/ultraviolet/pull/5824) [`a0d8757`](https://github.com/scaleway/ultraviolet/commit/a0d87578627cab57138181861559e6db7ab97d13) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.7`.

- [#5844](https://github.com/scaleway/ultraviolet/pull/5844) [`173e194`](https://github.com/scaleway/ultraviolet/commit/173e194b9524e7396cf98fc8725eba068d4d65cb) Thanks [@lisalupi](https://github.com/lisalupi)! - `Badge`: fix gap

- [#5822](https://github.com/scaleway/ultraviolet/pull/5822) [`cb75383`](https://github.com/scaleway/ultraviolet/commit/cb7538341653c9dc485bd59ef107cea863449fa1) Thanks [@lisalupi](https://github.com/lisalupi)! - `Badge`: new size "xsmall"

- [#5854](https://github.com/scaleway/ultraviolet/pull/5854) [`6bc5d37`](https://github.com/scaleway/ultraviolet/commit/6bc5d376cd48c8dedf04f62e34b5b3c78f872a5e) Thanks [@lisalupi](https://github.com/lisalupi)! - `List.Cell`: force width/maxWidth/minWidth on children

- [#5833](https://github.com/scaleway/ultraviolet/pull/5833) [`0e4dd48`](https://github.com/scaleway/ultraviolet/commit/0e4dd487741e0030d9f652e468b2dc035e2722d4) Thanks [@lisalupi](https://github.com/lisalupi)! - `Text`: fix prop strikeThrough by removing useless `textDecoration` in variant definition

- Updated dependencies [[`9bcbc09`](https://github.com/scaleway/ultraviolet/commit/9bcbc092a10a604f4f5fe3bea29c2a0bb85e5f23), [`a0d8757`](https://github.com/scaleway/ultraviolet/commit/a0d87578627cab57138181861559e6db7ab97d13), [`7625641`](https://github.com/scaleway/ultraviolet/commit/76256412346cff9d655d153d1b48741bc099db6d)]:
  - @ultraviolet/icons@5.0.1

## 3.0.0

### Major Changes

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - ! BREAKING CHANGES !
  In order to start using the new style, you will need to import new `<ThemeProvider />` and import new CSS generated at build time:

  ```tsx
  import { ThemeProvider } from "@emotion/react";
  import {
    consoleLightTheme,
    ThemeProvider as ThemeProviderUV,
  } from "@ultraviolet/themes";

  import "@ultraviolet/ui/styles"; // Generated CSS used by components

  export const App = (children) => {
    <ThemeProvider theme={consoleLightTheme}>
      <ThemeProviderUV>{children}</ThemeProviderUV>
    </ThemeProvider>;
  };
  ```

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - ! POTENTIAL BREAKING CHANGES !
  Fixed the `maxLength` prop on TagList. This prop was previously implemented incorrectly and would only reduce the threshold by one when the total length exceeded `maxLength`.
  This change might affect the number of visible tags, particularly if you have many long tags (the default `maxLength` is set to `600` characters) or if you have specified a custom `maxLength`.

- [#5819](https://github.com/scaleway/ultraviolet/pull/5819) [`48cc201`](https://github.com/scaleway/ultraviolet/commit/48cc201bd9278802a16d57e13c556364c88274bd) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor all components to use `vanilla-extract` instead of `Emotion`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGE** Remove all emotion animation, replace with vanilla-extract animation by default.

  ```js
  import { fadeIn } from "@ultraviolet/ui"; // vanilla-extract animation
  ```

  To use animation in another context, add `Default` at the end of the animation name:

  ```js
  import { fadeInDefault } from "@ultraviolet/ui";
  ```

  This returns a string that can be used in many different places.

  1. **Emotion**: create the keyframe then use it:

  ```js
  import { fadeInDefault } from "@ultraviolet/ui";
  import { keyframes } from "@emotion/react";

  const fadeInEmotion = keyframes`${fadeInDefault}`;
  const StyledDiv = styled.div`
    animation: ${fadeInEmotion} 1s ease infinite;
  `;
  ```

  2. Vanilla CSS: simply add the name of the animation you want to use as a className.

  ```js
  const MyComponent = () => <div className="fadeIn">Hello World!</div>;
  ```

  To customize the animation, you must overrule the default settings:

  ```js
  const MyComponent = () => (
    <div className="fadeIn" style={{ animationDuration: "300ms" }}>
      Hello World!
    </div>
  );
  ```

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - - Remove `Emotion`

  - Removed `Breakpoint`: use directly `up` and `down`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - - `Bullet`: **BREAKING CHANGE** "disabled" is now a prop instead of a value of prop "sentiment"

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Theme provider has been moved to `@ultraviolet/themes` package. `@ultraviolet/ui` imports it internally and export `ThemeProvider` and `useTheme` hook for convenience.

### Minor Changes

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `List` HeaderCell: Rename prop `minWith`-> `minWidth`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `UnitInput`: remove `&&` in style, since it is not needed anymore and replace id use with vanilla-extract class

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `TagList` : popover should be openable using keyboard keys (space or enter)

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectableCard`: add "stopPropagation" in the children for keyboard events

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - feat(ui): add TreeMap chart

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Remove vanilla-extract variables in `BarStack` and create them directly in CSS

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor search input to use fuzzy search from scaleway lib

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `TextInput`: remove default outline when the input is focused (Firefox)

### Patch Changes

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix className useless spacing on Banner and Button

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `TagInput`: "paste" shoud not automatically create a new tag

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add htmlFor on label for `VerificationCode`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `EmptyState`: content text should be neutral

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Alert`: add "size" prop

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `List` and `UnitInput`: Fix vanilla-extract typos

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<NumberInput />` disabled button not working on re-render

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Table.Row />` prop `selectDisabled` to be disabled when set to false

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Checkbox />` input size being wrong

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Drawer`: fix animation on small

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `List`: update column width

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Snippet />` improve selection by removing after element on most of the lines

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Popup`: position is recomputed when children changes

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `ActionBar` & `Text`: Use css variable instead of style with vanilla extract

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `style` to every component

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Stack />` to provide `as` prop for polymorphic composition used in `<Navigation />` for example

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectableCardOptionGroup`: fix issue with radio style

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `Dialog` width

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<TextArea />` when tooltip is set

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add e2e test of `SelectableCard` with `TextArea`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - remove cjs build

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Menu` & `Popup`: when `placement='bottom'` or `placement='top'`, avoid negative values for "translate3d" to prevent negative positioning/x-overflow

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: should display values correctly on first render

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `maxWidth` on `<UnitInput />` component

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Stack />` useless style applied

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `EmptyState`: fix sentiment on title

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<ThemeProvider />` to inject theme variable in the `<head>` of the page

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: placeholder shoul be a `span` instead of a `p`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Button`: remove background color when hovering a disabled outlined/ghost button

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Carousel`: fix container width

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `TagInput` and `TextArea`: fix size

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `ExpandableCard`: new prop "open" (uncontrolled version of prop "expanded)

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Updated dependency `@types/react` to `19.2.6`.
  Updated dependency `@types/react-dom` to `19.2.3`.

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Popup`: Make sure to clear all timers when unmount

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Tag`: container should be a "span", not a "div"

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Stack />` and `<Row />` variables to provide default values

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Snippet />` to preserve indentation

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Checkbox`: fix classname

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - All `Popup` components (`Popover`, `Tooltip`, `Menu`): 4 new positions `auto-` to have auto-placement but give priority to a direction. For instance, `auto-bottom` will try to place the popup beneath the disclosure first, if there is not enough place it will try top, then left, then right.
  The priorities are :

  - `auto-bottom` : bottom > top > left > right
  - `auto-left` : left > right > top > bottom
  - `auto-right` : right > left > top > bottom
  - `auto` and `auto-top` : top > bottom > left > right

  **BREAKING CHANGE**
  `Menu`: prop `noShrink` renamed `shrink` with opposite behavior

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Breadcrumbs`: add padding on item without prop "to"

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Button />` class having a space in the beggining

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Button`: add box-shadow when button is active (accidentaly removed while migrating to vanilla extract)

- Updated dependencies [[`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`48cc201`](https://github.com/scaleway/ultraviolet/commit/48cc201bd9278802a16d57e13c556364c88274bd), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3)]:
  - @ultraviolet/themes@3.0.0
  - @ultraviolet/icons@5.0.0

## 3.0.0-beta.29

### Patch Changes

- [#5795](https://github.com/scaleway/ultraviolet/pull/5795) [`7b8d1bd`](https://github.com/scaleway/ultraviolet/commit/7b8d1bd477f0cdd23e7d3a4ce57cf30bbc3fec9a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.6`.
  Updated dependency `@types/react-dom` to `19.2.3`.
- Updated dependencies [[`7b8d1bd`](https://github.com/scaleway/ultraviolet/commit/7b8d1bd477f0cdd23e7d3a4ce57cf30bbc3fec9a)]:
  - @ultraviolet/icons@5.0.0-beta.13

## 3.0.0-beta.28

### Major Changes

- [#5775](https://github.com/scaleway/ultraviolet/pull/5775) [`b062bbe`](https://github.com/scaleway/ultraviolet/commit/b062bbe30e73ca43e5684aaf98b03aea57fea4c9) Thanks [@lisalupi](https://github.com/lisalupi)! - - Remove `Emotion`
  - Removed `Breakpoint`: use directly `up` and `down`

### Patch Changes

- [#5791](https://github.com/scaleway/ultraviolet/pull/5791) [`b7ab0e3`](https://github.com/scaleway/ultraviolet/commit/b7ab0e3e71e5d570b57d33907e1b51ae00d32c9a) Thanks [@lisalupi](https://github.com/lisalupi)! - `Alert`: add "size" prop

- [#5789](https://github.com/scaleway/ultraviolet/pull/5789) [`63a8f2a`](https://github.com/scaleway/ultraviolet/commit/63a8f2a32a804c0c6767a9a030cb95de2cee563d) Thanks [@lisalupi](https://github.com/lisalupi)! - `Popup`: position is recomputed when children changes

- [#5798](https://github.com/scaleway/ultraviolet/pull/5798) [`83455a7`](https://github.com/scaleway/ultraviolet/commit/83455a73d5c258ffd4d33e5f2050d696270bc96c) Thanks [@lisalupi](https://github.com/lisalupi)! - `TagInput` and `TextArea`: fix size

- [#5782](https://github.com/scaleway/ultraviolet/pull/5782) [`b9f0d1e`](https://github.com/scaleway/ultraviolet/commit/b9f0d1e7ad0aae0a4e7756d7d7e107a8228e9419) Thanks [@lisalupi](https://github.com/lisalupi)! - All `Popup` components (`Popover`, `Tooltip`, `Menu`): 4 new positions `auto-` to have auto-placement but give priority to a direction. For instance, `auto-bottom` will try to place the popup beneath the disclosure first, if there is not enough place it will try top, then left, then right.
  The priorities are :

  - `auto-bottom` : bottom > top > left > right
  - `auto-left` : left > right > top > bottom
  - `auto-right` : right > left > top > bottom
  - `auto` and `auto-top` : top > bottom > left > right

  **BREAKING CHANGE**
  `Menu`: prop `noShrink` renamed `shrink` with opposite behavior

- Updated dependencies [[`85d3468`](https://github.com/scaleway/ultraviolet/commit/85d3468dfce3a7532866cf63a017274e65661c80)]:
  - @ultraviolet/icons@5.0.0-beta.12

## 3.0.0-beta.27

### Major Changes

- [#5766](https://github.com/scaleway/ultraviolet/pull/5766) [`2974892`](https://github.com/scaleway/ultraviolet/commit/2974892ab614235acdf141f1a83c9a867237cb9b) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGE** Remove all emotion animation, replace with vanilla-extract animation by default.

  ```js
  import { fadeIn } from "@ultraviolet/ui"; // vanilla-extract animation
  ```

  To use animation in another context, add `Default` at the end of the animation name:

  ```js
  import { fadeInDefault } from "@ultraviolet/ui";
  ```

  This returns a string that can be used in many different places.

  1. **Emotion**: create the keyframe then use it:

  ```js
  import { fadeInDefault } from "@ultraviolet/ui";
  import { keyframes } from "@emotion/react";

  const fadeInEmotion = keyframes`${fadeInDefault}`;
  const StyledDiv = styled.div`
    animation: ${fadeInEmotion} 1s ease infinite;
  `;
  ```

  2. Vanilla CSS: simply add the name of the animation you want to use as a className.

  ```js
  const MyComponent = () => <div className="fadeIn">Hello World!</div>;
  ```

  To customize the animation, you must overrule the default settings:

  ```js
  const MyComponent = () => (
    <div className="fadeIn" style={{ animationDuration: "300ms" }}>
      Hello World!
    </div>
  );
  ```

### Minor Changes

- [#5781](https://github.com/scaleway/ultraviolet/pull/5781) [`5747647`](https://github.com/scaleway/ultraviolet/commit/57476477b2e7888e644ac44fe31ba6f270913248) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - feat(ui): add TreeMap chart

### Patch Changes

- [#5779](https://github.com/scaleway/ultraviolet/pull/5779) [`ad4a930`](https://github.com/scaleway/ultraviolet/commit/ad4a930595722ef9e7764f1f2e2ba67948efaa06) Thanks [@lisalupi](https://github.com/lisalupi)! - `List`: update column width

- [#5757](https://github.com/scaleway/ultraviolet/pull/5757) [`50851d4`](https://github.com/scaleway/ultraviolet/commit/50851d4cbf7123744e59d88c939f23d0fc575acd) Thanks [@philibea](https://github.com/philibea)! - remove cjs build

- Updated dependencies [[`c6eb5c7`](https://github.com/scaleway/ultraviolet/commit/c6eb5c7acd5b32f647306c35f9755c51e60ab33a), [`3f0c64c`](https://github.com/scaleway/ultraviolet/commit/3f0c64c1fcc5c80af9275671795c6eb3886ceda5), [`50851d4`](https://github.com/scaleway/ultraviolet/commit/50851d4cbf7123744e59d88c939f23d0fc575acd)]:
  - @ultraviolet/icons@5.0.0-beta.11
  - @ultraviolet/themes@3.0.0-beta.4

## 3.0.0-beta.26

### Patch Changes

- [#5771](https://github.com/scaleway/ultraviolet/pull/5771) [`abfbe9e`](https://github.com/scaleway/ultraviolet/commit/abfbe9e150f8e7880b03ea3ce69ede86f6c46420) Thanks [@etienne-scaleway](https://github.com/etienne-scaleway)! - `Popup`: Make sure to clear all timers when unmount

## 3.0.0-beta.25

### Major Changes

- [#5758](https://github.com/scaleway/ultraviolet/pull/5758) [`bc629aa`](https://github.com/scaleway/ultraviolet/commit/bc629aa7771057a7ca7a9e59bff983a0df73d2fa) Thanks [@etienne-scaleway](https://github.com/etienne-scaleway)! - ! POTENTIAL BREAKING CHANGES !
  Fixed the `maxLength` prop on TagList. This prop was previously implemented incorrectly and would only reduce the threshold by one when the total length exceeded `maxLength`.
  This change might affect the number of visible tags, particularly if you have many long tags (the default `maxLength` is set to `600` characters) or if you have specified a custom `maxLength`.

### Minor Changes

- [#5762](https://github.com/scaleway/ultraviolet/pull/5762) [`440d5bb`](https://github.com/scaleway/ultraviolet/commit/440d5bb536d3b10b9079e5cea83450d1b88001fa) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectableCardOptionGroup` and `Toaster` migrate missing sub-components to vanilla extract

### Patch Changes

- [#5759](https://github.com/scaleway/ultraviolet/pull/5759) [`ee2f3eb`](https://github.com/scaleway/ultraviolet/commit/ee2f3eb9bf0f16e95b57817e0c8a5e5eba1f6aa3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `style` to every component

- [#5772](https://github.com/scaleway/ultraviolet/pull/5772) [`deba7e9`](https://github.com/scaleway/ultraviolet/commit/deba7e941ade8a796666c18f64bf7c2959709e19) Thanks [@lisalupi](https://github.com/lisalupi)! - `EmptyState`: fix sentiment on title

- Updated dependencies [[`ee2f3eb`](https://github.com/scaleway/ultraviolet/commit/ee2f3eb9bf0f16e95b57817e0c8a5e5eba1f6aa3), [`29df8eb`](https://github.com/scaleway/ultraviolet/commit/29df8ebd47e8d0cdbf8a3ca73f74bfe9afdd3983)]:
  - @ultraviolet/icons@5.0.0-beta.10

## 3.0.0-beta.24

### Minor Changes

- [#5756](https://github.com/scaleway/ultraviolet/pull/5756) [`4386617`](https://github.com/scaleway/ultraviolet/commit/4386617bee7563bb9f8fee177c936038f11dd47d) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Key`, `SelectableCardGroup` and `SelectableCardOptionGroup` to use vanilla-extract instead of Emotion and finish `LineChart` migration

### Patch Changes

- [#5747](https://github.com/scaleway/ultraviolet/pull/5747) [`2eea0ad`](https://github.com/scaleway/ultraviolet/commit/2eea0add9d9b3988e3edcbdd54c2b1367e6923d6) Thanks [@lisalupi](https://github.com/lisalupi)! - Add e2e test of `SelectableCard` with `TextArea`

- [#5753](https://github.com/scaleway/ultraviolet/pull/5753) [`5ac319e`](https://github.com/scaleway/ultraviolet/commit/5ac319e45abb27c624f2f33dd897be4cf1638312) Thanks [@lisalupi](https://github.com/lisalupi)! - `Button`: add box-shadow when button is active (accidentaly removed while migrating to vanilla extract)

- Updated dependencies [[`2eea0ad`](https://github.com/scaleway/ultraviolet/commit/2eea0add9d9b3988e3edcbdd54c2b1367e6923d6)]:
  - @ultraviolet/themes@3.0.0-beta.3
  - @ultraviolet/icons@5.0.0-beta.9

## 3.0.0-beta.23

### Minor Changes

- [#5713](https://github.com/scaleway/ultraviolet/pull/5713) [`0523069`](https://github.com/scaleway/ultraviolet/commit/0523069fd9a4455c375315ea7a47b4292ebc978e) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `Slider` to use vanilla extract instead of Emotion

  - Add prop "style" to `Popup` and `Tooltip`

- [#5723](https://github.com/scaleway/ultraviolet/pull/5723) [`eb6127e`](https://github.com/scaleway/ultraviolet/commit/eb6127e80e64644b0e2a4237a3cea291172acade) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Tabs` to use vanilla extract instead of Emotion

- [#5745](https://github.com/scaleway/ultraviolet/pull/5745) [`0dcf373`](https://github.com/scaleway/ultraviolet/commit/0dcf37393506dc01609e803e11743b013296dfa0) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectableCard`: add "stopPropagation" in the children for keyboard events

- [#5726](https://github.com/scaleway/ultraviolet/pull/5726) [`e23a69c`](https://github.com/scaleway/ultraviolet/commit/e23a69c30e95bec45b0a79e315682b330c0fbcef) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Table` to use vanilla extract instead of Emotion

### Patch Changes

- [#5746](https://github.com/scaleway/ultraviolet/pull/5746) [`317dbf6`](https://github.com/scaleway/ultraviolet/commit/317dbf6ee868f1e35dc1eeda47c3f169f3d1f391) Thanks [@lisalupi](https://github.com/lisalupi)! - `TagInput`: "paste" shoud not automatically create a new tag

- [#5750](https://github.com/scaleway/ultraviolet/pull/5750) [`3e9b92b`](https://github.com/scaleway/ultraviolet/commit/3e9b92bc1fe287d10f7806536fbb9256048d97af) Thanks [@lisalupi](https://github.com/lisalupi)! - `EmptyState`: content text should be neutral

- [#5749](https://github.com/scaleway/ultraviolet/pull/5749) [`56915f1`](https://github.com/scaleway/ultraviolet/commit/56915f180a3da3289ebc5f6527e5a4427e441e1d) Thanks [@lisalupi](https://github.com/lisalupi)! - `List` and `UnitInput`: Fix vanilla-extract typos

- [#5744](https://github.com/scaleway/ultraviolet/pull/5744) [`065f4e2`](https://github.com/scaleway/ultraviolet/commit/065f4e279b76b6953c6d9b4778cb6ed1b78f5e9b) Thanks [@lisalupi](https://github.com/lisalupi)! - `Carousel`: fix container width

- Updated dependencies [[`e2088f2`](https://github.com/scaleway/ultraviolet/commit/e2088f2f29499ba4c6737f638be657bb2b038d6b)]:
  - @ultraviolet/icons@5.0.0-beta.8

## 3.0.0-beta.22

### Minor Changes

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`68006e1`](https://github.com/scaleway/ultraviolet/commit/68006e14d373276ce7d77638ec6261229cce60b5) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `InfoTable` to use vanilla extract instead of Emotion

  - Add prop "style" to `Row`

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`7091562`](https://github.com/scaleway/ultraviolet/commit/709156284a91877ccbe72feba79b4ae44797319f) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor components `List` and `OfferList` to use vanilla-extract instead of Emotion

  - HeaderCell: Rename prop `minWith`-> `minWidth`

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`203174a`](https://github.com/scaleway/ultraviolet/commit/203174a4d8a5e74bdff04b9d961b478423a8da1e) Thanks [@lisalupi](https://github.com/lisalupi)! - `UnitInput`: remove `&&` in style, since it is not needed anymore and replace id use with vanilla-extract class

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`0e47e5c`](https://github.com/scaleway/ultraviolet/commit/0e47e5c2288171ce4a3b3b613dbb4da4165428c7) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Menu` to usa vanilla extract instead of Emotion

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`a67faa2`](https://github.com/scaleway/ultraviolet/commit/a67faa2467ff6624b7a8c552c8e0b9d26c5b3063) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Dialog` to use vanilla extract instead of Emotion

### Patch Changes

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`97f362c`](https://github.com/scaleway/ultraviolet/commit/97f362ca8f84a654bd0174b719c5e660991fd866) Thanks [@lisalupi](https://github.com/lisalupi)! - `Breadcrumbs`: add padding on item without prop "to"

- Updated dependencies [[`bf7256b`](https://github.com/scaleway/ultraviolet/commit/bf7256b5d2ef4b3b1346037bff5d86c2f47e4785)]:
  - @ultraviolet/icons@5.0.0-beta.7

## 3.0.0-beta.21

### Minor Changes

- [#5651](https://github.com/scaleway/ultraviolet/pull/5651) [`f6948b0`](https://github.com/scaleway/ultraviolet/commit/f6948b0aefe91750203bdbcd1b5173b872819004) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Snippet` to use vanilla extract instead of Emotion

- [#5666](https://github.com/scaleway/ultraviolet/pull/5666) [`b348f99`](https://github.com/scaleway/ultraviolet/commit/b348f99ea11415508b618d52df29d1b7dcc4b302) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Stepper` to use vanilla extract instead of Emotion

- [#5665](https://github.com/scaleway/ultraviolet/pull/5665) [`c186192`](https://github.com/scaleway/ultraviolet/commit/c186192ad5e8e8e7e03f5e547602e34c04d8bac3) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Pagination />` to use vanilla extract

- [#5675](https://github.com/scaleway/ultraviolet/pull/5675) [`fb3f4ca`](https://github.com/scaleway/ultraviolet/commit/fb3f4ca7a883c5f733afd01904eb4900769f1548) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Modal` and `Drawer` to use vanilla-extract instead of Emotion

- [#5664](https://github.com/scaleway/ultraviolet/pull/5664) [`1893b2b`](https://github.com/scaleway/ultraviolet/commit/1893b2b6f104eb5843145c8cb69c46ac0ead6bbe) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Carousel />` to use vanilla extract

- [#5662](https://github.com/scaleway/ultraviolet/pull/5662) [`fdb5be1`](https://github.com/scaleway/ultraviolet/commit/fdb5be1171509eaa17278264eae53e23be234925) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Toaster` and `Notification` to use vanilla extract instead of Emotion

- [#5653](https://github.com/scaleway/ultraviolet/pull/5653) [`13350bc`](https://github.com/scaleway/ultraviolet/commit/13350bca640b8db2152219a7efbae1c922128558) Thanks [@matthprost](https://github.com/matthprost)! - Refactor search input to use fuzzy search from scaleway lib

### Patch Changes

- [#5699](https://github.com/scaleway/ultraviolet/pull/5699) [`634ced8`](https://github.com/scaleway/ultraviolet/commit/634ced8b45f33a7f192f2e8e3f862e83ad5c72b4) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Table.Row />` prop `selectDisabled` to be disabled when set to false

- [#5661](https://github.com/scaleway/ultraviolet/pull/5661) [`3e9f9ad`](https://github.com/scaleway/ultraviolet/commit/3e9f9ad699a2415264a7b8f9c78d439b32ecef45) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `maxWidth` on `<UnitInput />` component

## 3.0.0-beta.20

### Major Changes

- [#5632](https://github.com/scaleway/ultraviolet/pull/5632) [`4d56ac4`](https://github.com/scaleway/ultraviolet/commit/4d56ac4f9b25449393fa3739a31097bcdfa40089) Thanks [@matthprost](https://github.com/matthprost)! - Theme provider has been moved to `@ultraviolet/themes` package. `@ultraviolet/ui` imports it internally and export `ThemeProvider` and `useTheme` hook for convenience.

### Patch Changes

- Updated dependencies [[`4d56ac4`](https://github.com/scaleway/ultraviolet/commit/4d56ac4f9b25449393fa3739a31097bcdfa40089)]:
  - @ultraviolet/themes@3.0.0-beta.2
  - @ultraviolet/icons@5.0.0-beta.6

## 3.0.0-beta.19

### Minor Changes

- [#5644](https://github.com/scaleway/ultraviolet/pull/5644) [`5c10948`](https://github.com/scaleway/ultraviolet/commit/5c10948eceb6a4e257bd6f752273dc7fee85d08e) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `SelectInput` to use vanilla extract instead of Emotion

  - `Tag`: add prop `style`

- [#5645](https://github.com/scaleway/ultraviolet/pull/5645) [`8ec50bb`](https://github.com/scaleway/ultraviolet/commit/8ec50bbb6b49f71ca574adeeaa1905d27511d0a8) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `EmptyState` to use vanilla extract instead of Emotion

- [#5646](https://github.com/scaleway/ultraviolet/pull/5646) [`29bfec5`](https://github.com/scaleway/ultraviolet/commit/29bfec55c9519756f62f61aabcb775b0db1bc968) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `SearchInput` to use vanilla extract instead of Emotion
  - `TextInput`: remove default outline when the input is focused (Firefox)

### Patch Changes

- [#5656](https://github.com/scaleway/ultraviolet/pull/5656) [`4d97647`](https://github.com/scaleway/ultraviolet/commit/4d97647adcc1fb2282ca1a7294c46310fc9ea695) Thanks [@lisalupi](https://github.com/lisalupi)! - `Menu` & `Popup`: when `placement='bottom'` or `placement='top'`, avoid negative values for "translate3d" to prevent negative positioning/x-overflow

- [#5660](https://github.com/scaleway/ultraviolet/pull/5660) [`aa20c75`](https://github.com/scaleway/ultraviolet/commit/aa20c755e8f1bfa0f0ed927edfe53f8bda642102) Thanks [@lisalupi](https://github.com/lisalupi)! - `Checkbox`: fix classname

- Updated dependencies [[`4fb8e97`](https://github.com/scaleway/ultraviolet/commit/4fb8e97474b1d8a33fa98f22cdddfdeed753e3f1)]:
  - @ultraviolet/icons@5.0.0-beta.5

## 3.0.0-beta.18

### Minor Changes

- [#5640](https://github.com/scaleway/ultraviolet/pull/5640) [`945ce38`](https://github.com/scaleway/ultraviolet/commit/945ce3842e11407e4bdda076c27f41465ec73284) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `UnitInput` to use vanilla extract instead of Emotion

  - Add prop `style` to `SelectInput`

- [#5622](https://github.com/scaleway/ultraviolet/pull/5622) [`12fc99d`](https://github.com/scaleway/ultraviolet/commit/12fc99dde57e3e97543bc26402a99ad0ea359cd8) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `TimeInput` to use vanilla-extract instead of Emotion

- [#5614](https://github.com/scaleway/ultraviolet/pull/5614) [`a8b9b62`](https://github.com/scaleway/ultraviolet/commit/a8b9b6237173d72b9c74af2ac4d57b4b81949982) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor components `TagInput` and `TagList` to use vanilla-extract instead of emotion

  - `TagList` : popover should be openable using keyboard keys (space or enter)

- [#5608](https://github.com/scaleway/ultraviolet/pull/5608) [`d1b44ff`](https://github.com/scaleway/ultraviolet/commit/d1b44ffd1bf0a8ded5b13d3b51a3e8ed0077a46d) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<TextInput />` using vanilla extract

- [#5634](https://github.com/scaleway/ultraviolet/pull/5634) [`4e03810`](https://github.com/scaleway/ultraviolet/commit/4e038106bf90dc1a44db45b19417d3ad04955c5c) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `SwitchButton` to use vanilla extract instead of Emotion

- [#5615](https://github.com/scaleway/ultraviolet/pull/5615) [`e4d6b23`](https://github.com/scaleway/ultraviolet/commit/e4d6b23e719e64e48ec6fc4e8b18b863bd5dc471) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Toggle />` component to use vanilla extract

- [#5624](https://github.com/scaleway/ultraviolet/pull/5624) [`6fb2304`](https://github.com/scaleway/ultraviolet/commit/6fb230499200457163122799f7bdfdc633407492) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `DateInput` to use vanilla-extract instead of Emotion

### Patch Changes

- [#5628](https://github.com/scaleway/ultraviolet/pull/5628) [`4520138`](https://github.com/scaleway/ultraviolet/commit/452013864b764f77ab3f8024fc830a9a1170b618) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `style` on `<Skeleton />` component

## 3.0.0-beta.17

### Minor Changes

- [#5631](https://github.com/scaleway/ultraviolet/pull/5631) [`6fdf91d`](https://github.com/scaleway/ultraviolet/commit/6fdf91da1cca7c74f843dbb338960ef9d1b686bb) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `TextArea` to use vanilla extract instead of Emotion

- [#5627](https://github.com/scaleway/ultraviolet/pull/5627) [`3bca6bb`](https://github.com/scaleway/ultraviolet/commit/3bca6bb32cbab6b9359542b112568d84a11dcab9) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `NumberInput` to use vanilla extract instead of Emotion

### Patch Changes

- [#5639](https://github.com/scaleway/ultraviolet/pull/5639) [`c80b7c3`](https://github.com/scaleway/ultraviolet/commit/c80b7c30d1692a6f07e5a90fa73d03cba3627fa3) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Checkbox />` input size being wrong

- Updated dependencies [[`776c6df`](https://github.com/scaleway/ultraviolet/commit/776c6df268e796d6ee741fce25d70e0991085f5e)]:
  - @ultraviolet/icons@5.0.0-beta.4

## 3.0.0-beta.16

### Minor Changes

- [#5582](https://github.com/scaleway/ultraviolet/pull/5582) [`1e8e44b`](https://github.com/scaleway/ultraviolet/commit/1e8e44b1175d645ffc7659f8d1ac338b0ef9af7f) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor chart components (`PieChart`, `BarChart` and `LineChart`) to use vanilla-extract instead of Emotion

- [#5598](https://github.com/scaleway/ultraviolet/pull/5598) [`5c46f8a`](https://github.com/scaleway/ultraviolet/commit/5c46f8acf6c75499e40d9c9e78f380ea55f3eeb3) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `Skeleton` to use vanilla extract instead of emotion
  - Remove vanilla-extract variables in `BarStack` and create them directly in CSS

### Patch Changes

- [#5616](https://github.com/scaleway/ultraviolet/pull/5616) [`c3adef6`](https://github.com/scaleway/ultraviolet/commit/c3adef6960af5d6c1355244a0ab3a18ab42b4204) Thanks [@lisalupi](https://github.com/lisalupi)! - `Tag`: container should be a "span", not a "div"

- Updated dependencies [[`b19c4e5`](https://github.com/scaleway/ultraviolet/commit/b19c4e5c142fcbfd21b822c07baea90d34d8eee2), [`1f78aa4`](https://github.com/scaleway/ultraviolet/commit/1f78aa437fe0d449f5a68f94291a4a1bb6387290)]:
  - @ultraviolet/icons@5.0.0-beta.3

## 3.0.0-beta.15

### Minor Changes

- [#5596](https://github.com/scaleway/ultraviolet/pull/5596) [`d85d9f5`](https://github.com/scaleway/ultraviolet/commit/d85d9f5c782a16eacaf5f7f95956e121bb1daa32) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor `SelectableCard` to use vanilla-extract instead of Emotion

### Patch Changes

- [#5609](https://github.com/scaleway/ultraviolet/pull/5609) [`4ade022`](https://github.com/scaleway/ultraviolet/commit/4ade022e8d80eaa44de37559c04f53e87f7f3d6a) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectableCardOptionGroup`: fix issue with radio style

## 3.0.0-beta.14

### Minor Changes

- [#5580](https://github.com/scaleway/ultraviolet/pull/5580) [`d73ead7`](https://github.com/scaleway/ultraviolet/commit/d73ead73008c7798c3085724e1966d9e55503a24) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<RadioGroup />`, `<CheckboxGroup />` and `<ToggleGroup />` to use vanilla extract

- [#5583](https://github.com/scaleway/ultraviolet/pull/5583) [`93d75dd`](https://github.com/scaleway/ultraviolet/commit/93d75dd371c3c7740e669b1567a2580d0e17afd8) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<ExpandableCard />` to use vanilla extract

- [#5577](https://github.com/scaleway/ultraviolet/pull/5577) [`660d30e`](https://github.com/scaleway/ultraviolet/commit/660d30e5d85dac2be4f10f28f486c31ad922b60a) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Checkbox />` to use vanilla extract

- [#5576](https://github.com/scaleway/ultraviolet/pull/5576) [`9ad2c9a`](https://github.com/scaleway/ultraviolet/commit/9ad2c9af20cc15669fdcd959f4e5c1b0971e99c6) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Tag` and `Card` to use vanilla-extract instead of Emotion

- [#5578](https://github.com/scaleway/ultraviolet/pull/5578) [`aaa2c52`](https://github.com/scaleway/ultraviolet/commit/aaa2c521f9c2a924c50ecaf5aa49f92791e734c9) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `Breadcrumbs` to use vanilla-extract instead of emotion
  - `Button`: Add prop "style"

### Patch Changes

- [#5593](https://github.com/scaleway/ultraviolet/pull/5593) [`245d454`](https://github.com/scaleway/ultraviolet/commit/245d4542c11d636973aaaef86ae53a57ab16f236) Thanks [@lisalupi](https://github.com/lisalupi)! - `Drawer`: fix animation on small

- [#5586](https://github.com/scaleway/ultraviolet/pull/5586) [`943b05a`](https://github.com/scaleway/ultraviolet/commit/943b05adef22d7e03976cd67a5d97f56c18c2482) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: placeholder shoul be a `span` instead of a `p`

- Updated dependencies [[`568797d`](https://github.com/scaleway/ultraviolet/commit/568797dde5a4ca3cee9e56014d1e45dfff171b2c)]:
  - @ultraviolet/icons@5.0.0-beta.2

## 3.0.0-beta.13

### Major Changes

- [#5504](https://github.com/scaleway/ultraviolet/pull/5504) [`4a20bf5`](https://github.com/scaleway/ultraviolet/commit/4a20bf5ebc5b298cc5ed7e0842214701a2c1efc7) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor components `Link` and `Bullet` to use vanilla-extract instead of Emotion
  - `Bullet`: **BREAKING CHANGE** "disabled" is now a prop instead of a value of prop "sentiment"

### Minor Changes

- [#5533](https://github.com/scaleway/ultraviolet/pull/5533) [`47257af`](https://github.com/scaleway/ultraviolet/commit/47257afab643364777bf0f98a292bb87808242c7) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Radio />` component to use vanilla extract

- [#5530](https://github.com/scaleway/ultraviolet/pull/5530) [`02ca583`](https://github.com/scaleway/ultraviolet/commit/02ca5830154c172c8d4e3cb92b8cff67ff14a976) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<GlobalAlert />` and `<Expandable />` to use vanilla extract

- [#5520](https://github.com/scaleway/ultraviolet/pull/5520) [`1b41251`](https://github.com/scaleway/ultraviolet/commit/1b412515e05d1de803e65d7d57ef6dee02c55c8b) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<VerificationCode /> to use vanilla extract`

- [#5518](https://github.com/scaleway/ultraviolet/pull/5518) [`647bf54`](https://github.com/scaleway/ultraviolet/commit/647bf545eb3496fee1503c8e18e68f1b4812fc25) Thanks [@matthprost](https://github.com/matthprost)! - Refactor component `<ProgressBar />` and fix component `<Badge />` useless variable in css generation

### Patch Changes

- [#5573](https://github.com/scaleway/ultraviolet/pull/5573) [`c79b4fb`](https://github.com/scaleway/ultraviolet/commit/c79b4fb72779a31b1b9b5f9ee3228fbc56630022) Thanks [@philibea](https://github.com/philibea)! - Add htmlFor on label for VerificationCode

- [#5570](https://github.com/scaleway/ultraviolet/pull/5570) [`dce2961`](https://github.com/scaleway/ultraviolet/commit/dce2961df8780b3f11ac6527de93911c0ac6d560) Thanks [@lisalupi](https://github.com/lisalupi)! - `Button`: remove background color when hovering a disabled outlined/ghost button

## 3.0.0-beta.12

### Patch Changes

- Updated dependencies [[`f7a0e49`](https://github.com/scaleway/ultraviolet/commit/f7a0e49c94677e5d9603263a5f183f57a1a19238)]:
  - @ultraviolet/icons@5.0.0-beta.1
  - @ultraviolet/themes@3.0.0-beta.1

## 3.0.0-beta.11

### Patch Changes

- [#5557](https://github.com/scaleway/ultraviolet/pull/5557) [`3f54ff6`](https://github.com/scaleway/ultraviolet/commit/3f54ff6109b2d123ccb0f56f4dccab81d6c3d82a) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - Fix `<Stack />` and `<Row />` variables to provide default values

## 3.0.0-beta.9

### Minor Changes

- [#5517](https://github.com/scaleway/ultraviolet/pull/5517) [`29d2395`](https://github.com/scaleway/ultraviolet/commit/29d2395c652b3035c286e3e13da934a268153940) Thanks [@matthprost](https://github.com/matthprost)! - Migrate components `<Label />` and `<PasswordCheck />` to vanilla extract

### Patch Changes

- [#5546](https://github.com/scaleway/ultraviolet/pull/5546) [`72382ac`](https://github.com/scaleway/ultraviolet/commit/72382ac8b93c7c0b5b1451fe625e0971117e4a30) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Stack />` to provide `as` prop for polymorphic composition used in `<Navigation />` for example

## 3.0.0-beta.8

### Minor Changes

- [#5503](https://github.com/scaleway/ultraviolet/pull/5503) [`81cb7b1`](https://github.com/scaleway/ultraviolet/commit/81cb7b1fcae70e255351ede447a3cb2977a4f168) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Row />` component to use vanilla extract

- [#5492](https://github.com/scaleway/ultraviolet/pull/5492) [`be21b81`](https://github.com/scaleway/ultraviolet/commit/be21b81f1a776a7b7edcb0ef96eed3e58264c33d) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Stack />` using vanilla extract

- [#5500](https://github.com/scaleway/ultraviolet/pull/5500) [`0c071df`](https://github.com/scaleway/ultraviolet/commit/0c071df7fb6c5a5d96319baa7660ce801439eb97) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Notice`, `StepList` and `Status` to use vanilla-extract instead of Emotion

- [#5532](https://github.com/scaleway/ultraviolet/pull/5532) [`80bdfbd`](https://github.com/scaleway/ultraviolet/commit/80bdfbd9b00cc58f87779779bc3eba4fdbc48e77) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Chip />` to use vanilla extract

### Patch Changes

- [#5527](https://github.com/scaleway/ultraviolet/pull/5527) [`f2d6c57`](https://github.com/scaleway/ultraviolet/commit/f2d6c57addd55d577329d9931c11866b955fcc92) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<NumberInput />` disabled button not working on re-render

- [#5531](https://github.com/scaleway/ultraviolet/pull/5531) [`694b0d5`](https://github.com/scaleway/ultraviolet/commit/694b0d5fca9b4ffec2f81e2570466569eab08565) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Stack />` useless style applied

- [#5534](https://github.com/scaleway/ultraviolet/pull/5534) [`43f5891`](https://github.com/scaleway/ultraviolet/commit/43f589191ef2e51fcf7533826ded0be28698fbe7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Snippet />` to preserve indentation

- Updated dependencies [[`272422f`](https://github.com/scaleway/ultraviolet/commit/272422f803f5bcdeb6d05f84455f6904e2b901c5)]:
  - @ultraviolet/icons@4.1.0-beta.4

## 3.0.0-beta.7

### Minor Changes

- [#5505](https://github.com/scaleway/ultraviolet/pull/5505) [`7de4324`](https://github.com/scaleway/ultraviolet/commit/7de43248e0591d95b510adcdb79d559862de9eb6) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - - Refactor components `Meter` and `BarStack` to use vanilla-extract instead of Emotion
  - Add prop `style` to `Text` to be able to use vanilla-extract variables with it

### Patch Changes

- Updated dependencies [[`a6ca909`](https://github.com/scaleway/ultraviolet/commit/a6ca90992bc60e052e53fbe9317ca6ede96ebe4d), [`4439df6`](https://github.com/scaleway/ultraviolet/commit/4439df607ffa1f7e6bb2a45bdbbedff6ae3c27b2)]:
  - @ultraviolet/icons@4.1.0-beta.3
  - @ultraviolet/themes@2.1.0-beta.1

## 3.0.0-beta.6

### Major Changes

- [`65da279`](https://github.com/scaleway/ultraviolet/commit/65da27924e47c48bfe97e485881d2a3aeb147bb6) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Popup`, `Popover` and `Tooltip` to use vanilla-extract instead of Emotion

- [`6815e33`](https://github.com/scaleway/ultraviolet/commit/6815e33cae41e61b0285fca98fb6894837f1b6ef) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Loader` and `Separator` to use vanilla-extract instead of Emotion

- [`cb3aaed`](https://github.com/scaleway/ultraviolet/commit/cb3aaeddda933b0ccb0db8a484e18dcbb631d6ff) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `Avatar` to use vanilla-extract instead of Emotion

### Patch Changes

- [`7a6a41e`](https://github.com/scaleway/ultraviolet/commit/7a6a41e26303a8c273700e2a32784ca515067f15) Thanks [@matthprost](https://github.com/matthprost)! - Fix className useless spacing on Banner and Button

- [`475669b`](https://github.com/scaleway/ultraviolet/commit/475669bd710411ec99a5370ede1523535161fbdc) Thanks [@lisalupi](https://github.com/lisalupi)! - `ActionBar` & `Text`: Use css variable instead of style with vanilla extract

- [`a65dcc1`](https://github.com/scaleway/ultraviolet/commit/a65dcc1e898321d13480c88036d5196c1fa28814) Thanks [@lisalupi](https://github.com/lisalupi)! - `SelectInput`: should display values correctly on first render

- [#5490](https://github.com/scaleway/ultraviolet/pull/5490) [`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.12`.
  Updated dependency `@types/react-dom` to `19.1.9`.

- [#5499](https://github.com/scaleway/ultraviolet/pull/5499) [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.3`.
  Updated dependency `@babel/runtime` to `7.28.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.28.3`.
  Updated dependency `@babel/preset-env` to `7.28.3`.
- Updated dependencies [[`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7), [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542)]:
  - @ultraviolet/icons@4.0.4-beta.2

## 3.0.0-beta.5

### Major Changes

- [#5471](https://github.com/scaleway/ultraviolet/pull/5471) [`8d11143`](https://github.com/scaleway/ultraviolet/commit/8d111439baf02a951bab616dfea637e269f0f7ec) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - Refactor components `Text` and `Alert` to use vanilla-extract instead of Emotion

- [#5471](https://github.com/scaleway/ultraviolet/pull/5471) [`52f4748`](https://github.com/scaleway/ultraviolet/commit/52f47488f0b50e5d8dbdd1a78eb27d60786e6532) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - - Refactor component `Banner` to use vanilla-extract instead of Emotion
  - Fix dark/darker theme on stories with vanilla extract

### Patch Changes

- [#5471](https://github.com/scaleway/ultraviolet/pull/5471) [`671427e`](https://github.com/scaleway/ultraviolet/commit/671427eab0dd3e7c72f7085c75a8e0dd77b26761) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - Fix `Dialog` width

## 3.0.0-beta.4

### Major Changes

- [`0ce72ef`](https://github.com/scaleway/ultraviolet/commit/0ce72ef33b9b21dfa4404f54d1b0aaa1f156e41c) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor components `ActionBar` and `Badge` to use vanilla-extract instead of Emotion

### Patch Changes

- [`963df3d`](https://github.com/scaleway/ultraviolet/commit/963df3db19a71edf8118d8ddfc87dbd9d3270ccd) Thanks [@lisalupi](https://github.com/lisalupi)! - `ExpandableCard`: new prop "open" (uncontrolled version of prop "expanded)

- Updated dependencies [[`15512aa`](https://github.com/scaleway/ultraviolet/commit/15512aaad1da3218ea3765261451d15fb05d6660)]:
  - @ultraviolet/icons@4.0.4-beta.1

## 3.0.0-beta.3

### Patch Changes

- [#5437](https://github.com/scaleway/ultraviolet/pull/5437) [`9187560`](https://github.com/scaleway/ultraviolet/commit/9187560d39c6f7b1145bbc2df76898d7a797b78a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Snippet />` improve selection by removing after element on most of the lines

- [#5445](https://github.com/scaleway/ultraviolet/pull/5445) [`db1aedc`](https://github.com/scaleway/ultraviolet/commit/db1aedce578a5d1caedc299d666d8584250421b1) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<TextArea />` when tooltip is set

- [#5438](https://github.com/scaleway/ultraviolet/pull/5438) [`cd7bed7`](https://github.com/scaleway/ultraviolet/commit/cd7bed7983dcae8c072b1140d1cbd92d8d026624) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Button />` class having a space in the beggining

## 2.1.4

### Patch Changes

- [#5539](https://github.com/scaleway/ultraviolet/pull/5539) [`63aa37e`](https://github.com/scaleway/ultraviolet/commit/63aa37ea0e76e027138c113e95570f0d196843c1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.4`.
  Updated dependency `@babel/runtime` to `7.28.4`.
  Updated dependency `@babel/eslint-parser` to `7.28.4`.
- Updated dependencies [[`63aa37e`](https://github.com/scaleway/ultraviolet/commit/63aa37ea0e76e027138c113e95570f0d196843c1)]:
  - @ultraviolet/icons@4.1.1

## 2.1.3

### Patch Changes

- [#5543](https://github.com/scaleway/ultraviolet/pull/5543) [`8267b84`](https://github.com/scaleway/ultraviolet/commit/8267b849315ca4affd86b671c5e4cf4042389e95) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.13`.

- Updated dependencies [[`8267b84`](https://github.com/scaleway/ultraviolet/commit/8267b849315ca4affd86b671c5e4cf4042389e95), [`b1057f8`](https://github.com/scaleway/ultraviolet/commit/b1057f8ad18cf62e105f990d2ebad59842b6ec67)]:
  - @ultraviolet/icons@4.1.0

## 2.1.2

### Patch Changes

- Updated dependencies [[`4439df6`](https://github.com/scaleway/ultraviolet/commit/4439df607ffa1f7e6bb2a45bdbbedff6ae3c27b2)]:
  - @ultraviolet/themes@2.1.0
  - @ultraviolet/icons@4.0.5

## 2.1.1

### Patch Changes

- [#5490](https://github.com/scaleway/ultraviolet/pull/5490) [`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.12`.
  Updated dependency `@types/react-dom` to `19.1.9`.

- [#5499](https://github.com/scaleway/ultraviolet/pull/5499) [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.3`.
  Updated dependency `@babel/runtime` to `7.28.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.28.3`.
  Updated dependency `@babel/preset-env` to `7.28.3`.
- Updated dependencies [[`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7), [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542)]:
  - @ultraviolet/icons@4.0.4

## 2.1.0

### Minor Changes

- [#5424](https://github.com/scaleway/ultraviolet/pull/5424) [`2be6ab9`](https://github.com/scaleway/ultraviolet/commit/2be6ab95b33591fb937f0c78e362a69702944bc4) Thanks [@lisalupi](https://github.com/lisalupi)! - - New component `Key`
  - Use component `Key` in `SearchInput` instead of custom

## 3.0.0-beta.2

### Patch Changes

- [#5435](https://github.com/scaleway/ultraviolet/pull/5435) [`c4b76f1`](https://github.com/scaleway/ultraviolet/commit/c4b76f1293eaf9b621af3f5a3584fc72d1eda80a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ThemeProvider />` to inject theme variable in the `<head>` of the page

## 3.0.0-beta.1

### Patch Changes

- Updated dependencies [[`6f5f565`](https://github.com/scaleway/ultraviolet/commit/6f5f5650031f99808c710bfe069bdf7094ce336b)]:
  - @ultraviolet/themes@2.1.0-beta.0
  - @ultraviolet/icons@4.0.4-beta.0

## 3.0.0-beta.0

### Major Changes

- [#5428](https://github.com/scaleway/ultraviolet/pull/5428) [`177fd92`](https://github.com/scaleway/ultraviolet/commit/177fd92f018b692084815705bf10537832368330) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ BREAKING CHANGES ⚠️
  In order to start using the new style, you will need to import new `<ThemeProvider />` and import new CSS generated at build time:

  ```tsx
  import { ThemeProvider } from "@emotion/react";
  import { consoleLightTheme } from "@ultraviolet/themes";

  import { ThemeProvider as ThemeProviderUV } from "@ultraviolet/ui"; // ThemeProvider that generate the theme applied to components
  import "@ultraviolet/ui/styles"; // Generated CSS used by components

  export const App = (children) => {
    <ThemeProvider theme={consoleLightTheme}>
      <ThemeProviderUV>{children}</ThemeProviderUV>
    </ThemeProvider>;
  };
  ```

## 3.0.0-beta.1

### Patch Changes

- Updated dependencies [[`6f5f565`](https://github.com/scaleway/ultraviolet/commit/6f5f5650031f99808c710bfe069bdf7094ce336b)]:
  - @ultraviolet/themes@2.1.0-beta.0
  - @ultraviolet/icons@4.0.4-beta.0

## 3.0.0-beta.0

### Major Changes

- [#5428](https://github.com/scaleway/ultraviolet/pull/5428) [`177fd92`](https://github.com/scaleway/ultraviolet/commit/177fd92f018b692084815705bf10537832368330) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ BREAKING CHANGES ⚠️
  In order to start using the new style, you will need to import new `<ThemeProvider />` and import new CSS generated at build time:

  ```tsx
  import { ThemeProvider } from "@emotion/react";
  import { consoleLightTheme } from "@ultraviolet/themes";

  import { ThemeProvider as ThemeProviderUV } from "@ultraviolet/ui"; // ThemeProvider that generate the theme applied to components
  import "@ultraviolet/ui/styles"; // Generated CSS used by components

  export const App = (children) => {
    <ThemeProvider theme={consoleLightTheme}>
      <ThemeProviderUV>{children}</ThemeProviderUV>
    </ThemeProvider>;
  };
  ```

## 2.0.5

### Patch Changes

- [#5413](https://github.com/scaleway/ultraviolet/pull/5413) [`4285555`](https://github.com/scaleway/ultraviolet/commit/4285555acb58cd7648e58881daec180d76621e23) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInput />` to handle better tag display

## 2.0.4

### Patch Changes

- [#5385](https://github.com/scaleway/ultraviolet/pull/5385) [`22733ab`](https://github.com/scaleway/ultraviolet/commit/22733ab678cb58a71cc8e6f93f98544b3f3d2cdf) Thanks [@lisalupi](https://github.com/lisalupi)! - `Menu`: the popup should shrink when there is not enough size to avoid creating more scroll

- [#5410](https://github.com/scaleway/ultraviolet/pull/5410) [`6d6ea09`](https://github.com/scaleway/ultraviolet/commit/6d6ea09eabd68bebc0300b1002a8308b1f336e3b) Thanks [@lisalupi](https://github.com/lisalupi)! - - `OfferList`: fix spacing between rows

  - `List`: new props "onMouseLeave" and "onMouseEnter"

- [#5415](https://github.com/scaleway/ultraviolet/pull/5415) [`0bb13d0`](https://github.com/scaleway/ultraviolet/commit/0bb13d0055c5e930d7eb12df0941012afba9a71b) Thanks [@lisalupi](https://github.com/lisalupi)! - `Table`: remove unnecessary padding on first column header

- [#5411](https://github.com/scaleway/ultraviolet/pull/5411) [`81fea2a`](https://github.com/scaleway/ultraviolet/commit/81fea2a34ed7420af0a4cf108fe84f6943778b47) Thanks [@lisalupi](https://github.com/lisalupi)! - `Menu`: fix hover behavior

- Updated dependencies [[`c38483f`](https://github.com/scaleway/ultraviolet/commit/c38483f88c2ddc09c85e825553adb25be33c8e2f)]:
  - @ultraviolet/icons@4.0.3

## 2.0.3

### Patch Changes

- [#5402](https://github.com/scaleway/ultraviolet/pull/5402) [`b144d15`](https://github.com/scaleway/ultraviolet/commit/b144d152b50d1f6c7a1eda04c680b9e687db6e11) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Toggle />` to use native behavior for uncontrolled version

- [#5384](https://github.com/scaleway/ultraviolet/pull/5384) [`cd3ba5b`](https://github.com/scaleway/ultraviolet/commit/cd3ba5b70ac1678b3a781a3213357acad0fae277) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Banner />` wrong sentiment on dark color

- [#5404](https://github.com/scaleway/ultraviolet/pull/5404) [`35a6123`](https://github.com/scaleway/ultraviolet/commit/35a6123aff795d1dc829cd9ffde83d4a61cafe4d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.1.1`.
  Updated dependency `react-dom` to `19.1.1`.

- [#5406](https://github.com/scaleway/ultraviolet/pull/5406) [`330fd6d`](https://github.com/scaleway/ultraviolet/commit/330fd6dbfd053c50e830152358565173b6d63ad0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.9`.
  Updated dependency `@types/react-dom` to `19.1.7`.
- Updated dependencies [[`35a6123`](https://github.com/scaleway/ultraviolet/commit/35a6123aff795d1dc829cd9ffde83d4a61cafe4d), [`330fd6d`](https://github.com/scaleway/ultraviolet/commit/330fd6dbfd053c50e830152358565173b6d63ad0)]:
  - @ultraviolet/icons@4.0.2

## 2.0.2

### Patch Changes

- [#5391](https://github.com/scaleway/ultraviolet/pull/5391) [`35e725f`](https://github.com/scaleway/ultraviolet/commit/35e725fd1f72da4ea67ade2230bafbb4845b356b) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Modal />` and `<SelectInput />` together scroll down not using id but context

## 2.0.1

### Patch Changes

- [#5359](https://github.com/scaleway/ultraviolet/pull/5359) [`b28f612`](https://github.com/scaleway/ultraviolet/commit/b28f612a171e1e6d0beb63cc0e83211fe8369984) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.0`.
  Updated dependency `@babel/eslint-parser` to `7.28.0`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.28.0`.
  Updated dependency `@babel/preset-env` to `7.28.0`.

- [#5394](https://github.com/scaleway/ultraviolet/pull/5394) [`e18cc72`](https://github.com/scaleway/ultraviolet/commit/e18cc72310f4ae681da95e4d94bfa39e35c4626b) Thanks [@lisalupi](https://github.com/lisalupi)! - `Menu`: fix hover behavior

- Updated dependencies [[`b28f612`](https://github.com/scaleway/ultraviolet/commit/b28f612a171e1e6d0beb63cc0e83211fe8369984)]:
  - @ultraviolet/icons@4.0.1

## 2.0.0

### Major Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `Link`: prop "sentiment" can only by "primary" or "info" (default value) now
  - `List.Cell`: prop "preventClick" removed (it is now default behavior)
  - `Menu`: prop "size" and "maxWidth" removed, the size is now automatic

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - All group input have a breaking changes in their props:

  - `label` is now longer needed, use `legend` instead.
  - `legend` type moved from `ReactNode` to `string`. Use `legendDescription` to add more information.
  - new prop `legendDescription` to add more information to the legend.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `TagInput`:

    - props "manualInput" and "onChangeError" removed: the props used to have no effect
    - prop "variant" removed: only one variant possible now
    - prop "tags" removed -> use "value" instead

  - `Toaster`: variant "info" removed

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `Card`: prop "isActive" removed -> use "active" instead
  - `Checkbox`: props "progress" and "size" removed
  - `CopyButton`: prop "noBorder" removed -> use "bordered" instead

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ Breaking changes:

  `ThemeRegistry` is no longer available in this package. You can import it by adding `@ultraviolet/nextjs` package to your project. The component is the same only the import changes.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Following the icon major update some components have recieved a small update to improve the usage of icons.

  ## Detailed migration per components

  ### Button

  `icon`, `iconPosition`, `iconVariant` props are deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Button } from "@ultraviolet/ui";

  <Button icon="pencil" iconPosition="right" iconVariant="outline">
    Edit
  </Button>;
  ```

  ```tsx
  // After
  import { Button } from "@ultraviolet/ui";
  import { PencilOutlineIcon } from "@ultraviolet/icons";

  <Button>
    Edit <PencilOutlineIcon />
  </Button>;
  ```

  ### Badge

  `icon` props is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Badge } from '@ultraviolet/ui'

  <Badge icon="pencil">
    Edit
  </Button>
  ```

  ```tsx
  // After
  import { Badge } from "@ultraviolet/ui";
  import { PencilOutlineIcon } from "@ultraviolet/icons";

  <Badge>
    Edit <PencilOutlineIcon />
  </Badge>;
  ```

  ### Bullet

  `icon` and `iconVariant` props are deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Bullet } from '@ultraviolet/ui'

  <Bullet icon="check" />
  <Bullet icon="check" iconVariant="outlined" />
  ```

  ```tsx
  // After
  import { Bullet } from '@ultraviolet/ui'
  import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
  import { CheckCircleOutlineIcon } from '@ultraviolet/icons/CheckCircleOutlineIcon'

  <Bullet>
    <CheckIcon />
  </Bullet>

  <Bullet>
    <CheckCircleOutlineIcon />
  </Bullet>
  ```

  ### AvatarV2

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { AvatarV2 } from "@ultraviolet/ui";

  <AvatarV2 variant="icon" shape="circle" sentiment="primary" icon="mosaic" />;
  ```

  ```tsx
  // After
  import { AvatarV2 } from "@ultraviolet/ui";
  import { MosaicIcon } from "@ultraviolet/icons/MosaicIcon";

  <AvatarV2 variant="icon" shape="circle" sentiment="primary">
    <MosaicIcon size="xlarge" />
  </AvatarV2>;
  ```

  ### Separator

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Separator } from "@ultraviolet/ui";

  <Separator direction="vertical" icon="ray-top-arrow" />;
  ```

  ```tsx
  // After
  import { Separator } from "@ultraviolet/ui";
  import { RayTopArrowIcon } from "@ultraviolet/icons/RayTopArrowIcon";

  <Separator direction="vertical">
    <RayTopArrowIcon size="medium" />
  </Separator>;
  ```

  ### Tag

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Tag } from "@ultraviolet/ui";

  <Tag icon="check">Valid</Tag>;
  ```

  ```tsx
  // After
  import { Tag } from "@ultraviolet/ui";
  import { CheckIcon } from "@ultraviolet/icons/CheckIcon";

  <Tag>
    <CheckIcon size="small" />
    Valid
  </Tag>;
  ```

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ Breaking changes:

  - Removal of `<PasswordStrengthMeter />` component => replaced by `<Meter />`
  - Dialog no long experimental

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ BREAKING CHANGES

  We removed all old components and renamed the V2 components to remove that suffix. Thus, the followng components have changed:

  TextInputV2 -> TextInput [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-textinput-to-textinputv2--docs)
  SelectInputV2 -> SelectInput [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-selectinput-to-selectinputv2--docs)
  AvatarV2 -> Avatar [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-avatar-to-avatarv2--docs)
  MenuV2 -> Menu [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-menu-to-menuv2--docs)
  DateInputV2 -> DateInput
  TimeInputV2 -> TimeInput
  NumberInputV2 -> NumberInput

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ Breaking changes:

  `SCWUITheme` no longer exists, use `UltravioletUITheme`. The type is the same.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Beta release

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `Modal`:
    - prop "customDialogBackdropStyles" removed -> use "backdropClassName" instead to style the backdrop
    - prop "customDialogStyles" removed -> use "customDialogStyles" instead to style the dialog
    - prop "width" removed -> use "size" instead (same possible values)
    - prop "opened" removed -> use "open" instead
    - prop "onOpen" removed -> use "show" instead (ModalState)
    - prop "onClose" removed -> use "close" instead (ModalState)
    - prop "hide" removed -> use "close" instead (ModalState)
  - `RadioGroup.Radio`: prop "name" removed, it is automatically passed from the parent `RadioGroup`
  - `Separator`: prop "color" removed -> use "sentiment" instead
  - `Text`: prop "color" removed -> use "sentiment" instead

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `CodeEditor`: prop "title" removed -> use "label" instead
  - `Icon`: prop "color" removed -> use "sentiment" instead
  - `Icon`: prop "size" can only be "xsmall", "small", "medium", "large", "xlarge" or "xxlarge"
  - `Bullet`: prop "text" removed -> use "children" instead

### Minor Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `Drawer`: new prop `noPadding` which allow to have a non padded content

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `SelectInput`: add a `onOpen` prop

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - **Breaking changes**
  `SwitchButton`: New version of the component:

  - props `leftButton` and `rightButton` removed
  - Use `SwitchButton.Option` to add buttons/options
  - More than 2 options possible now !
  - New sizes
  - New prop `sentiment`

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Implement responsive capacities on component `<Row />` and `<Stack />`

### Patch Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<TagList />`: copiable now works

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `StepList`: fix width

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `SwitchButton`: update size when children changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `List` and `Table`: fix info icon style

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Improve search system on `<MenuV2 />`

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Notification />` position to avoid error in index

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `UnitInput`: fix id of input

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix border on `<List />` component in Safari

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ActionBar />` within `<Table />` and `<List />`

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInput />` to display footer when there are values and hide on empty state

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<MenuV2 />: nested menus
`<Popup />`: new position "nested-menu", that is right by default and left when there is no available space on the right of the element

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `Modal`: returns focus to disclosure element when closing the modal

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `Modal`: disclosure onClick should work even when it changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Slider />` with `input` prop to only apply the value `onBlur` instead of `onChange`. Works also with double slider.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Add `aria-current` to `<Link />` component

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<SelectInputV2 />: hide footer when empty state

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `TextArea`: height should adapt even without prop value

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `UnitInput`: new prop "templateColumns" to chose sizes of the input and the select input more precisely

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `DateInput`: value changes onBlur instead of onChange to avoid wrong dates while the user is typing

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix all group field to have correct `legend` and `legendDescription`

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix stepper small size with label on right

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix visited state of link to match promience

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<TimeInputV2 />`: size "large" by default instead of "medium" and fix width of AM/PM input when large.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<Loader />`: **breaking changes**

  - align size on system icons : now size can only be "xsmall" (0.75rem/12px), "small" (1rem/16px), "medium" (1.25rem/20px), "large" (1.5rem/24px), "xlarge" (2rem/32px), or "_xxlarge_" (3.5rem/56px). By default, `size = "xlarge"` to match the old size.
  - remove prop `color`, use `sentiment` instead. By default, `sentiment = primary`.
  - remove props `trailColor`, `text`and `strokeWidth`.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Allow DND kit to work with `List` and `Button` :

  - `List.Row` now supports "style" and "data-dragging" props ;
  - For Security group we don't display header but the List component add to much spaces ;
  - List.Row do not allow data-dragging prop
  - `Button` can have props "aria-describedby", "aria-disabled", "aria-pressed", "aria-roledescription", "onPointerDown" and "onKeyDown" to work with DND kit

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `Expandable`: no animation on first render

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<MenuV2 />`: focus on disclosure when closing menu and can use arrow keys to navigate in menu :

  - Arrow Up/Down: browse the items
  - Arrow Right: open nested menu and focus on the first item
  - Arrow Left : close nested menu

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<SelectInputV2 />`: improve overflow

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<Link />`: reduce space between link and icon

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Add theme get function for nivo chart components (harmonization of theme)

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<SelectInput />`: improve search

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `<ExpandableCard />`: drag & drop

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix add missing `tooltip` prop on `CheckboxGroup.Checkbox`

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Add `disabled` on `<SwitchButton.Option />`

- Updated dependencies [[`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7)]:
  - @ultraviolet/icons@4.0.0
  - @ultraviolet/themes@2.0.0

## 2.0.0-beta.19

### Major Changes

- [#5366](https://github.com/scaleway/ultraviolet/pull/5366) [`f791286`](https://github.com/scaleway/ultraviolet/commit/f791286dc4e5dad0f4cbf14c53801d7890e0ee63) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ Breaking changes:

  `SCWUITheme` no longer exists, use `UltravioletUITheme`. The type is the same.

### Patch Changes

- [#5324](https://github.com/scaleway/ultraviolet/pull/5324) [`2169048`](https://github.com/scaleway/ultraviolet/commit/2169048055c37b870c57f2a56ee8a628b36af6c6) Thanks [@lisalupi](https://github.com/lisalupi)! - `DateInput`: value changes onBlur instead of onChange to avoid wrong dates while the user is typing

## 2.0.0-beta.18

### Patch Changes

- [#5335](https://github.com/scaleway/ultraviolet/pull/5335) [`ec7c55a`](https://github.com/scaleway/ultraviolet/commit/ec7c55a7bdad9e5f49a2b8aaf2aca2e228bb725e) Thanks [@lisalupi](https://github.com/lisalupi)! - `SwitchButton`: update size when children changes

- [#5353](https://github.com/scaleway/ultraviolet/pull/5353) [`706bfaa`](https://github.com/scaleway/ultraviolet/commit/706bfaabf558ab751c7dbcd1c3bf5e84dde8f529) Thanks [@lisalupi](https://github.com/lisalupi)! - `TextArea`: height should adapt even without prop value

- [#5351](https://github.com/scaleway/ultraviolet/pull/5351) [`ea55dea`](https://github.com/scaleway/ultraviolet/commit/ea55dea228d3e634f13e1de358d2738de210e7b2) Thanks [@lisalupi](https://github.com/lisalupi)! - `UnitInput`: new prop "templateColumns" to chose sizes of the input and the select input more precisely

- [#5255](https://github.com/scaleway/ultraviolet/pull/5255) [`2ddbbf9`](https://github.com/scaleway/ultraviolet/commit/2ddbbf9a785f40cb79a06b6ba1bfb89e5a22cf6b) Thanks [@lisalupi](https://github.com/lisalupi)! - `<MenuV2 />`: focus on disclosure when closing menu and can use arrow keys to navigate in menu :

  - Arrow Up/Down: browse the items
  - Arrow Right: open nested menu and focus on the first item
  - Arrow Left : close nested menu

- [#5365](https://github.com/scaleway/ultraviolet/pull/5365) [`996f5b9`](https://github.com/scaleway/ultraviolet/commit/996f5b98db88ca0ca7c7eac08535697ff36f7365) Thanks [@matthprost](https://github.com/matthprost)! - Fix add missing `tooltip` prop on `CheckboxGroup.Checkbox`

- Updated dependencies [[`f921df0`](https://github.com/scaleway/ultraviolet/commit/f921df0aea3ea46e014311f6008b3d44f95e16cf)]:
  - @ultraviolet/icons@4.0.0-beta.9

## 2.0.0-beta.17

### Major Changes

- [`d25d9d8`](https://github.com/scaleway/ultraviolet/commit/d25d9d8c71ffdc922f033daaf4ec6252f8382992) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `TagInput`:

    - props "manualInput" and "onChangeError" removed: the props used to have no effect
    - prop "variant" removed: only one variant possible now
    - prop "tags" removed -> use "value" instead

  - `Toaster`: variant "info" removed

- [#5335](https://github.com/scaleway/ultraviolet/pull/5335) [`40e189c`](https://github.com/scaleway/ultraviolet/commit/40e189cb6af270ea830b9d7faeee20d15817425a) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `CodeEditor`: prop "title" removed -> use "label" instead
  - `Icon`: prop "color" removed -> use "sentiment" instead
  - `Icon`: prop "size" can only be "xsmall", "small", "medium", "large", "xlarge" or "xxlarge"
  - `Bullet`: prop "text" removed -> use "children" instead

### Minor Changes

- [#5335](https://github.com/scaleway/ultraviolet/pull/5335) [`f95c6d2`](https://github.com/scaleway/ultraviolet/commit/f95c6d2b5e1e4402822dc6c1362ca280d513e1dd) Thanks [@lisalupi](https://github.com/lisalupi)! - Implement responsive capacities on component `<Row />` and `<Stack />`

### Patch Changes

- [#5325](https://github.com/scaleway/ultraviolet/pull/5325) [`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.7`.

- [#5315](https://github.com/scaleway/ultraviolet/pull/5315) [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/styled` to `11.14.1`.

- [#5317](https://github.com/scaleway/ultraviolet/pull/5317) [`c453a01`](https://github.com/scaleway/ultraviolet/commit/c453a01967a64eeec644a2193b145572b6ed1569) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/use-media` to `3.0.4`.

- Updated dependencies [[`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a), [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb), [`f95c6d2`](https://github.com/scaleway/ultraviolet/commit/f95c6d2b5e1e4402822dc6c1362ca280d513e1dd), [`40e189c`](https://github.com/scaleway/ultraviolet/commit/40e189cb6af270ea830b9d7faeee20d15817425a)]:
  - @ultraviolet/icons@4.0.0-beta.8
  - @ultraviolet/themes@2.0.0-beta.3

## 2.0.0-beta.16

### Major Changes

- [#5311](https://github.com/scaleway/ultraviolet/pull/5311) [`b8fa3f6`](https://github.com/scaleway/ultraviolet/commit/b8fa3f6542b0b99bd2887b07ac4db0487e9371a1) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ Breaking changes:

  `ThemeRegistry` is no longer available in this package. You can import it by adding `@ultraviolet/nextjs` package to your project. The component is the same only the import changes.

## 2.0.0-beta.15

### Major Changes

- [#5308](https://github.com/scaleway/ultraviolet/pull/5308) [`288eec8`](https://github.com/scaleway/ultraviolet/commit/288eec8554bec97892574f598cf6193331e1fb7a) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `Link`: prop "sentiment" can only by "primary" or "info" (default value) now
  - `List.Cell`: prop "preventClick" removed (it is now default behavior)
  - `Menu`: prop "size" and "maxWidth" removed, the size is now automatic

- [#5310](https://github.com/scaleway/ultraviolet/pull/5310) [`7ce2d34`](https://github.com/scaleway/ultraviolet/commit/7ce2d34977de7731e873106d5ccdc3dcbca7b92b) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `Modal`:
    - prop "customDialogBackdropStyles" removed -> use "backdropClassName" instead to style the backdrop
    - prop "customDialogStyles" removed -> use "customDialogStyles" instead to style the dialog
    - prop "width" removed -> use "size" instead (same possible values)
    - prop "opened" removed -> use "open" instead
    - prop "onOpen" removed -> use "show" instead (ModalState)
    - prop "onClose" removed -> use "close" instead (ModalState)
    - prop "hide" removed -> use "close" instead (ModalState)
  - `RadioGroup.Radio`: prop "name" removed, it is automatically passed from the parent `RadioGroup`
  - `Separator`: prop "color" removed -> use "sentiment" instead
  - `Text`: prop "color" removed -> use "sentiment" instead

### Patch Changes

- Updated dependencies [[`35780ff`](https://github.com/scaleway/ultraviolet/commit/35780fffd11eb7218dfd7d7134f1376758c871ed)]:
  - @ultraviolet/icons@4.0.0-beta.7

## 2.0.0-beta.14

### Major Changes

- [#5306](https://github.com/scaleway/ultraviolet/pull/5306) [`80e0af3`](https://github.com/scaleway/ultraviolet/commit/80e0af3b006b51bf83e49581d84eab9eb94bc4c7) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `Card`: prop "isActive" removed -> use "active" instead
  - `Checkbox`: props "progress" and "size" removed
  - `CopyButton`: prop "noBorder" removed -> use "bordered" instead

### Minor Changes

- [#5271](https://github.com/scaleway/ultraviolet/pull/5271) [`a3f9b52`](https://github.com/scaleway/ultraviolet/commit/a3f9b520dce181d481e8230b271cda7e0b730e86) Thanks [@fabienhebert](https://github.com/fabienhebert)! - `SelectInput`: add a `onOpen` prop

### Patch Changes

- [#5323](https://github.com/scaleway/ultraviolet/pull/5323) [`fe3e1c1`](https://github.com/scaleway/ultraviolet/commit/fe3e1c1aae01dd0af0f6b9f10a5d9dbcb591cc29) Thanks [@matthprost](https://github.com/matthprost)! - Add `aria-current` to `<Link />` component

- [#5313](https://github.com/scaleway/ultraviolet/pull/5313) [`a8108ff`](https://github.com/scaleway/ultraviolet/commit/a8108ff2c2fad133172d30db5aa3dcb0e9e42e17) Thanks [@matthprost](https://github.com/matthprost)! - Add `disabled` on `<SwitchButton.Option />`

## 2.0.0-beta.13

### Major Changes

- [#5285](https://github.com/scaleway/ultraviolet/pull/5285) [`b3873c7`](https://github.com/scaleway/ultraviolet/commit/b3873c7a0f9e77ed9b075735e0e444c1d33d21b3) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ Breaking changes:

  - Removal of `<PasswordStrengthMeter />` component => replaced by `<Meter />`
  - Dialog no long experimental

### Minor Changes

- [#5284](https://github.com/scaleway/ultraviolet/pull/5284) [`dac6d07`](https://github.com/scaleway/ultraviolet/commit/dac6d07a5823b6ae12b98ee9c656fab7105ccfe7) Thanks [@fabienhebert](https://github.com/fabienhebert)! - `Drawer`: new prop `noPadding` which allow to have a non padded content

### Patch Changes

- [#5288](https://github.com/scaleway/ultraviolet/pull/5288) [`bcb7243`](https://github.com/scaleway/ultraviolet/commit/bcb7243c8d2c6112bcc1353d052ba230323c3f34) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInput />` to display footer when there are values and hide on empty state

- [#5312](https://github.com/scaleway/ultraviolet/pull/5312) [`99eb24a`](https://github.com/scaleway/ultraviolet/commit/99eb24a498e1ac2c270272fa771f0eaa1b2d4fea) Thanks [@lisalupi](https://github.com/lisalupi)! - `Modal`: disclosure onClick should work even when it changes

- [#5289](https://github.com/scaleway/ultraviolet/pull/5289) [`e3570d8`](https://github.com/scaleway/ultraviolet/commit/e3570d88c8f66e89c532f545c727eccd06d5664c) Thanks [@lisalupi](https://github.com/lisalupi)! - Allow DND kit to work with `List` and `Button` :

  - `List.Row` now supports "style" and "data-dragging" props ;
  - For Security group we don't display header but the List component add to much spaces ;
  - List.Row do not allow data-dragging prop
  - `Button` can have props "aria-describedby", "aria-disabled", "aria-pressed", "aria-roledescription", "onPointerDown" and "onKeyDown" to work with DND kit

- [#5294](https://github.com/scaleway/ultraviolet/pull/5294) [`fac72c0`](https://github.com/scaleway/ultraviolet/commit/fac72c03508fe71cb020837975b14e5dabccbfe2) Thanks [@lisalupi](https://github.com/lisalupi)! - `Expandable`: no animation on first render

## 2.0.0-beta.12

### Patch Changes

- [#5290](https://github.com/scaleway/ultraviolet/pull/5290) [`52e9bf4`](https://github.com/scaleway/ultraviolet/commit/52e9bf49d5c17e0e64bf88eaf12e5815eb304e94) Thanks [@lisalupi](https://github.com/lisalupi)! - `List` and `Table`: fix info icon style

- [#5304](https://github.com/scaleway/ultraviolet/pull/5304) [`a0398de`](https://github.com/scaleway/ultraviolet/commit/a0398debe9d06372fb8888755673fec10ee93f34) Thanks [@lisalupi](https://github.com/lisalupi)! - `UnitInput`: fix id of input

- Updated dependencies [[`a2ac9c4`](https://github.com/scaleway/ultraviolet/commit/a2ac9c492f673c5395dabfd6d97fd3051e58d6ec)]:
  - @ultraviolet/icons@4.0.0-beta.6

## 2.0.0-beta.11

### Patch Changes

- [#5281](https://github.com/scaleway/ultraviolet/pull/5281) [`5870ea6`](https://github.com/scaleway/ultraviolet/commit/5870ea62864ba881ffc888a924bcf731387636ba) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - `StepList`: fix width

- [#5281](https://github.com/scaleway/ultraviolet/pull/5281) [`b03ed1b`](https://github.com/scaleway/ultraviolet/commit/b03ed1b50e7807eb72f8ae392bcd34f42772ca02) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - Fix border on `<List />` component in Safari

- [#5281](https://github.com/scaleway/ultraviolet/pull/5281) [`1275792`](https://github.com/scaleway/ultraviolet/commit/12757925af5c4fd08b857f165027b1cd6dee8b08) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - `<MenuV2 />: nested menus
`<Popup />`: new position "nested-menu", that is right by default and left when there is no available space on the right of the element

- [#5281](https://github.com/scaleway/ultraviolet/pull/5281) [`f41150e`](https://github.com/scaleway/ultraviolet/commit/f41150ebb2d97a95c074080f3db8fcd91c2b5d93) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - `Modal`: returns focus to disclosure element when closing the modal

- [#5277](https://github.com/scaleway/ultraviolet/pull/5277) [`40d4066`](https://github.com/scaleway/ultraviolet/commit/40d40662d7305712b0ca23d08759b37590a677a0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `next` to `15.3.4`.
  Updated dependency `eslint-config-next` to `15.3.4`.

- [#5287](https://github.com/scaleway/ultraviolet/pull/5287) [`80d5c50`](https://github.com/scaleway/ultraviolet/commit/80d5c50e294efdc5fe714a55ef985ff142c07b6e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/random-name` to `5.1.2`.

## 2.0.0-beta.10

### Major Changes

- [#5228](https://github.com/scaleway/ultraviolet/pull/5228) [`0040779`](https://github.com/scaleway/ultraviolet/commit/00407792bf0cd64eee0c02db107f3c43d42fa1a4) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ BREAKING CHANGES

  We removed all old components and renamed the V2 components to remove that suffix. Thus, the followng components have changed:

  TextInputV2 -> TextInput [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-textinput-to-textinputv2--docs)
  SelectInputV2 -> SelectInput [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-selectinput-to-selectinputv2--docs)
  AvatarV2 -> Avatar [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-avatar-to-avatarv2--docs)
  MenuV2 -> Menu [Migration Documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-menu-to-menuv2--docs)
  DateInputV2 -> DateInput
  TimeInputV2 -> TimeInput
  NumberInputV2 -> NumberInput

## 2.0.0-beta.9

### Minor Changes

- [`0608206`](https://github.com/scaleway/ultraviolet/commit/0608206affcae3630ef6d373ca260c43f30fd036) Thanks [@lisalupi](https://github.com/lisalupi)! - **Breaking changes**
  `SwitchButton`: New version of the component:
  - props `leftButton` and `rightButton` removed
  - Use `SwitchButton.Option` to add buttons/options
  - More than 2 options possible now !
  - New sizes
  - New prop `sentiment`

### Patch Changes

- [`b4279e4`](https://github.com/scaleway/ultraviolet/commit/b4279e441718dfc00ecfe271c9744d51f2dcacf9) Thanks [@matthprost](https://github.com/matthprost)! - Improve search system on `<MenuV2 />`

- [`0cf10d4`](https://github.com/scaleway/ultraviolet/commit/0cf10d4b48b8a09992b0e8b92552b2d26357b173) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />: hide footer when empty state

- [`edc91f5`](https://github.com/scaleway/ultraviolet/commit/edc91f508667d221d616616f782a79579a516156) Thanks [@matthprost](https://github.com/matthprost)! - Fix stepper small size with label on right

## 2.0.0-beta.8

### Patch Changes

- Updated dependencies [[`f8df4dd`](https://github.com/scaleway/ultraviolet/commit/f8df4ddce45073537a4ae9a334030d472b9f0d96)]:
  - @ultraviolet/icons@4.0.0-beta.5

## 2.0.0-beta.7

### Patch Changes

- [`cfe5bbe`](https://github.com/scaleway/ultraviolet/commit/cfe5bbed94318b75a6643cd8fb11b761f7aa3e48) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />`: improve overflow

- [`08e0353`](https://github.com/scaleway/ultraviolet/commit/08e03530fcd28a1c478fda9ddca41a63d5124581) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInput />`: improve search

- Updated dependencies [[`15fd34a`](https://github.com/scaleway/ultraviolet/commit/15fd34ad677dfaf551a4e6884ca9ecee18280654)]:
  - @ultraviolet/icons@4.0.0-beta.4

## 2.0.0-beta.6

### Patch Changes

- [`5d0a970`](https://github.com/scaleway/ultraviolet/commit/5d0a9702142eb4de78f4511e38004b60e2264634) Thanks [@lisalupi](https://github.com/lisalupi)! - `<TimeInputV2 />`: size "large" by default instead of "medium" and fix width of AM/PM input when large.

## 2.0.0-beta.5

### Patch Changes

- [`bb47261`](https://github.com/scaleway/ultraviolet/commit/bb472611b711cb3988c186d6d384c29f3c9037e2) Thanks [@lisalupi](https://github.com/lisalupi)! - `<TagList />`: copiable now works

- [#5206](https://github.com/scaleway/ultraviolet/pull/5206) [`be22eef`](https://github.com/scaleway/ultraviolet/commit/be22eef5335a4a6b96378547b70053a086476107) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - <Popover />: sentiment white for text in background primary

- [`cc10503`](https://github.com/scaleway/ultraviolet/commit/cc1050379db613d13c921a3af172128aa4cf225b) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix visited state of link to match promience

- [`53fcf41`](https://github.com/scaleway/ultraviolet/commit/53fcf415f169f61b4593f72fdacd7de3ebbd9387) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Loader />`: **breaking changes**

  - align size on system icons : now size can only be "xsmall" (0.75rem/12px), "small" (1rem/16px), "medium" (1.25rem/20px), "large" (1.5rem/24px), "xlarge" (2rem/32px), or "_xxlarge_" (3.5rem/56px). By default, `size = "xlarge"` to match the old size.
  - remove prop `color`, use `sentiment` instead. By default, `sentiment = primary`.
  - remove props `trailColor`, `text`and `strokeWidth`.

- [`6752ec1`](https://github.com/scaleway/ultraviolet/commit/6752ec1b60483e1f882bb6448a82dce62a03a0a7) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Link />`: reduce space between link and icon

- [`c5b82c2`](https://github.com/scaleway/ultraviolet/commit/c5b82c2674ba8189ee4432178b358f1a4ee05b02) Thanks [@lisalupi](https://github.com/lisalupi)! - `<ExpandableCard />`: drag & drop

- Updated dependencies [[`6b0565d`](https://github.com/scaleway/ultraviolet/commit/6b0565d2991db0510067d91b2140274dcde2ea21)]:
  - @ultraviolet/themes@2.0.0-beta.2
  - @ultraviolet/icons@4.0.0-beta.3

## 2.0.0-beta.4

### Patch Changes

- [#5190](https://github.com/scaleway/ultraviolet/pull/5190) [`b1c9952`](https://github.com/scaleway/ultraviolet/commit/b1c99521313cf8c2a2b3f58090a577084060ed56) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ActionBar />` within `<Table />` and `<List />`

## 2.0.0-beta.3

### Major Changes

- [`855a68c`](https://github.com/scaleway/ultraviolet/commit/855a68cc2740225d56f7f326338d6b6b482f804b) Thanks [@matthprost](https://github.com/matthprost)! - All group input have a breaking changes in their props:

  - `label` is now longer needed, use `legend` instead.
  - `legend` type moved from `ReactNode` to `string`. Use `legendDescription` to add more information.
  - new prop `legendDescription` to add more information to the legend.

### Patch Changes

- [`fd88786`](https://github.com/scaleway/ultraviolet/commit/fd887868e66208f5d3ab6de2e25df9ed7518eec7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Slider />` with `input` prop to only apply the value `onBlur` instead of `onChange`. Works also with double slider.

- [`855a68c`](https://github.com/scaleway/ultraviolet/commit/855a68cc2740225d56f7f326338d6b6b482f804b) Thanks [@matthprost](https://github.com/matthprost)! - Fix all group field to have correct `legend` and `legendDescription`

- [`ae4ca59`](https://github.com/scaleway/ultraviolet/commit/ae4ca592099b440cdedfafdb1c5a2ea0540d97f8) Thanks [@alexandre-combemorel](https://github.com/alexandre-combemorel)! - Add theme get function for nivo chart components (harmonization of theme)

- Updated dependencies [[`da3e7f7`](https://github.com/scaleway/ultraviolet/commit/da3e7f7c41ce6bad2c0dcd9a05693cee587f2ef3), [`421d104`](https://github.com/scaleway/ultraviolet/commit/421d104ae17d8c805d981ed214417916f73d561c)]:
  - @ultraviolet/icons@4.0.0-beta.2
  - @ultraviolet/themes@2.0.0-beta.1

## 2.0.0-beta.2

### Patch Changes

- [`f9dc10c`](https://github.com/scaleway/ultraviolet/commit/f9dc10cbe3ea826e4d6f682fbd5567ff0463f75b) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Notification />` position to avoid error in index

## 2.0.0-beta.1

### Major Changes

- [#5139](https://github.com/scaleway/ultraviolet/pull/5139) [`4308966`](https://github.com/scaleway/ultraviolet/commit/4308966450c594969417d3740d984099463e7da8) Thanks [@matthprost](https://github.com/matthprost)! - Following the icon major update some components have recieved a small update to improve the usage of icons.

  ## Detailed migration per components

  ### Button

  `icon`, `iconPosition`, `iconVariant` props are deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Button } from "@ultraviolet/ui";

  <Button icon="pencil" iconPosition="right" iconVariant="outline">
    Edit
  </Button>;
  ```

  ```tsx
  // After
  import { Button } from "@ultraviolet/ui";
  import { PencilOutlineIcon } from "@ultraviolet/icons";

  <Button>
    Edit <PencilOutlineIcon />
  </Button>;
  ```

  ### Badge

  `icon` props is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Badge } from '@ultraviolet/ui'

  <Badge icon="pencil">
    Edit
  </Button>
  ```

  ```tsx
  // After
  import { Badge } from "@ultraviolet/ui";
  import { PencilOutlineIcon } from "@ultraviolet/icons";

  <Badge>
    Edit <PencilOutlineIcon />
  </Badge>;
  ```

  ### Bullet

  `icon` and `iconVariant` props are deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Bullet } from '@ultraviolet/ui'

  <Bullet icon="check" />
  <Bullet icon="check" iconVariant="outlined" />
  ```

  ```tsx
  // After
  import { Bullet } from '@ultraviolet/ui'
  import { CheckIcon, CheckCircleOutlineIcon } from '@ultraviolet/icons'

  <Bullet>
    <CheckIcon />
  </Bullet>

  <Bullet>
    <CheckCircleOutlineIcon />
  </Bullet>
  ```

  ### AvatarV2

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { AvatarV2 } from "@ultraviolet/ui";

  <AvatarV2 variant="icon" shape="circle" sentiment="primary" icon="mosaic" />;
  ```

  ```tsx
  // After
  import { AvatarV2 } from "@ultraviolet/ui";
  import { MosaicIcon } from "@ultraviolet/icons";

  <AvatarV2 variant="icon" shape="circle" sentiment="primary">
    <MosaicIcon size="xlarge" />
  </AvatarV2>;
  ```

  ### Separator

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Separator } from "@ultraviolet/ui";

  <Separator direction="vertical" icon="ray-top-arrow" />;
  ```

  ```tsx
  // After
  import { Separator } from "@ultraviolet/ui";
  import { RayTopArrowIcon } from "@ultraviolet/icons";

  <Separator direction="vertical">
    <RayTopArrowIcon size="medium" />
  </Separator>;
  ```

  ### Tag

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Tag } from "@ultraviolet/ui";

  <Tag icon="check">Valid</Tag>;
  ```

  ```tsx
  // After
  import { Tag } from "@ultraviolet/ui";
  import { CheckIcon } from "@ultraviolet/icons";

  <Tag>
    <CheckIcon size="small" />
    Valid
  </Tag>;
  ```

## 2.0.0-beta.0

### Major Changes

- [#5112](https://github.com/scaleway/ultraviolet/pull/5112) [`37a7d63`](https://github.com/scaleway/ultraviolet/commit/37a7d632cd1e61d7615e5356fc179ec08f3bec09) Thanks [@matthprost](https://github.com/matthprost)! - Beta release

### Patch Changes

- Updated dependencies [[`37a7d63`](https://github.com/scaleway/ultraviolet/commit/37a7d632cd1e61d7615e5356fc179ec08f3bec09), [`a928589`](https://github.com/scaleway/ultraviolet/commit/a9285896d638e34eba9bb25c55c38de2aef4e210), [`865c160`](https://github.com/scaleway/ultraviolet/commit/865c160aee2db5bd5e7b357e9693a45a17ef4284)]:
  - @ultraviolet/themes@2.0.0-beta.0
  - @ultraviolet/icons@4.0.0-beta.0

## 1.95.14

### Patch Changes

- [#5331](https://github.com/scaleway/ultraviolet/pull/5331) [`4a91262`](https://github.com/scaleway/ultraviolet/commit/4a912623fed44b3a20ed9d1dd8f057a9eb371894) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `next` to `15.3.5`.
  Updated dependency `eslint-config-next` to `15.3.5`.

- [#5369](https://github.com/scaleway/ultraviolet/pull/5369) [`ad1d4f5`](https://github.com/scaleway/ultraviolet/commit/ad1d4f5dce14977841e4dd617da45e18d2fe39ae) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `next` to `15.4.1`.
  Updated dependency `eslint-config-next` to `15.4.1`.

## 1.95.13

### Patch Changes

- [#5325](https://github.com/scaleway/ultraviolet/pull/5325) [`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.7`.

- [#5315](https://github.com/scaleway/ultraviolet/pull/5315) [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/styled` to `11.14.1`.

- [#5317](https://github.com/scaleway/ultraviolet/pull/5317) [`c453a01`](https://github.com/scaleway/ultraviolet/commit/c453a01967a64eeec644a2193b145572b6ed1569) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/use-media` to `3.0.4`.

- Updated dependencies [[`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a), [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb)]:
  - @ultraviolet/icons@3.15.8

## 1.95.12

### Patch Changes

- Updated dependencies [[`1464f54`](https://github.com/scaleway/ultraviolet/commit/1464f54cb9099b6daa51b254cc935f36147004d0)]:
  - @ultraviolet/icons@4.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [#5112](https://github.com/scaleway/ultraviolet/pull/5112) [`37a7d63`](https://github.com/scaleway/ultraviolet/commit/37a7d632cd1e61d7615e5356fc179ec08f3bec09) Thanks [@matthprost](https://github.com/matthprost)! - Beta release

### Patch Changes

- Updated dependencies [[`37a7d63`](https://github.com/scaleway/ultraviolet/commit/37a7d632cd1e61d7615e5356fc179ec08f3bec09), [`a928589`](https://github.com/scaleway/ultraviolet/commit/a9285896d638e34eba9bb25c55c38de2aef4e210), [`865c160`](https://github.com/scaleway/ultraviolet/commit/865c160aee2db5bd5e7b357e9693a45a17ef4284)]:
  - @ultraviolet/themes@2.0.0-beta.0
  - @ultraviolet/icons@4.0.0-beta.0
    > > > > > > > 96a6d7431 (chore: release (beta) (#5111))

## 1.95.11

### Patch Changes

- [#5202](https://github.com/scaleway/ultraviolet/pull/5202) [`b3ca3ca`](https://github.com/scaleway/ultraviolet/commit/b3ca3ca957c2cec8c51f5717e597326fd17f9cb0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.4`.
  Updated dependency `@babel/runtime` to `7.27.6`.
  Updated dependency `@babel/eslint-parser` to `7.27.5`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.27.4`.

- [#5258](https://github.com/scaleway/ultraviolet/pull/5258) [`eec2dfa`](https://github.com/scaleway/ultraviolet/commit/eec2dfa2ea6b98c83ab154ae6b06ff3acc6bbc76) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.8`.

- Updated dependencies [[`b3ca3ca`](https://github.com/scaleway/ultraviolet/commit/b3ca3ca957c2cec8c51f5717e597326fd17f9cb0), [`eec2dfa`](https://github.com/scaleway/ultraviolet/commit/eec2dfa2ea6b98c83ab154ae6b06ff3acc6bbc76)]:
  - @ultraviolet/icons@3.15.7

## 1.95.10

### Patch Changes

- [#5224](https://github.com/scaleway/ultraviolet/pull/5224) [`7015837`](https://github.com/scaleway/ultraviolet/commit/7015837cedb57acd891485521cf4406261d3fd14) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(TextInputv2): allow clearable for uncontrolled

- [#5195](https://github.com/scaleway/ultraviolet/pull/5195) [`e9822bf`](https://github.com/scaleway/ultraviolet/commit/e9822bfad330bb6dc368e756bbc03265fc00f330) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.6`.
  Updated dependency `@types/react-dom` to `19.1.6`.
- Updated dependencies [[`e9822bf`](https://github.com/scaleway/ultraviolet/commit/e9822bfad330bb6dc368e756bbc03265fc00f330)]:
  - @ultraviolet/icons@3.15.6

## 1.95.9

### Patch Changes

- [#5216](https://github.com/scaleway/ultraviolet/pull/5216) [`90d89a2`](https://github.com/scaleway/ultraviolet/commit/90d89a29e8f2115d875e2f1497aaca6a33bde792) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(Table): add missing onSelectChange to provider

- [#5221](https://github.com/scaleway/ultraviolet/pull/5221) [`67fd741`](https://github.com/scaleway/ultraviolet/commit/67fd741ae39739275ffa3ff314c38a205857175b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `next` to `15.3.3`.
  Updated dependency `eslint-config-next` to `15.3.3`.

## 1.95.8

### Patch Changes

- [#5206](https://github.com/scaleway/ultraviolet/pull/5206) [`be22eef`](https://github.com/scaleway/ultraviolet/commit/be22eef5335a4a6b96378547b70053a086476107) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - <Popover />: sentiment white for text in background primary

## 1.95.7

### Patch Changes

- [#5172](https://github.com/scaleway/ultraviolet/pull/5172) [`11d7478`](https://github.com/scaleway/ultraviolet/commit/11d7478f0ebff3944e0b69ccca4878c6aadb1235) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `next` to `15.3.2`.
  Updated dependency `eslint-config-next` to `15.3.2`.

- [#5173](https://github.com/scaleway/ultraviolet/pull/5173) [`bfaed8d`](https://github.com/scaleway/ultraviolet/commit/bfaed8dfeb9358780a96520f1ecbb82b4397e2c0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.5`.

- [#5070](https://github.com/scaleway/ultraviolet/pull/5070) [`b411a4a`](https://github.com/scaleway/ultraviolet/commit/b411a4a337848d964f10eab8a597fa73a05f4526) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@nivo/bar` to `0.89.1`.
  Updated dependency `@nivo/core` to `0.89.1`.
  Updated dependency `@nivo/line` to `0.89.1`.
  Updated dependency `@nivo/pie` to `0.89.1`.
  Updated dependency `@nivo/scales` to `0.89.0`.
- Updated dependencies [[`bfaed8d`](https://github.com/scaleway/ultraviolet/commit/bfaed8dfeb9358780a96520f1ecbb82b4397e2c0)]:
  - @ultraviolet/icons@3.15.5

## 1.95.6

### Patch Changes

- [#5091](https://github.com/scaleway/ultraviolet/pull/5091) [`6c8f8af`](https://github.com/scaleway/ultraviolet/commit/6c8f8af8d22cca8162121c95bd350bbb98d4d2c6) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Modal />` fix scroll in nested modals when the content is too long

- [#5104](https://github.com/scaleway/ultraviolet/pull/5104) [`7562afb`](https://github.com/scaleway/ultraviolet/commit/7562afbc31dda6282cb1735892fec2205218cc3a) Thanks [@lisalupi](https://github.com/lisalupi)! - `<MenuV2 />`: new prop footer

- [#5159](https://github.com/scaleway/ultraviolet/pull/5159) [`530f7b4`](https://github.com/scaleway/ultraviolet/commit/530f7b47b46ffb2d3d472dda535972b8507a142e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.4`.
  Updated dependency `@types/react-dom` to `19.1.5`.

- [#5072](https://github.com/scaleway/ultraviolet/pull/5072) [`69d26f1`](https://github.com/scaleway/ultraviolet/commit/69d26f10f3614c594690ef2f78aa2e2ef3925227) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ActionBar />` simplify usage without using styled

- Updated dependencies [[`530f7b4`](https://github.com/scaleway/ultraviolet/commit/530f7b47b46ffb2d3d472dda535972b8507a142e)]:
  - @ultraviolet/icons@3.15.4

## 1.95.5

### Patch Changes

- [#5118](https://github.com/scaleway/ultraviolet/pull/5118) [`ae591aa`](https://github.com/scaleway/ultraviolet/commit/ae591aae37100cc944443a7eb0949f8762a1e82a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.1`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.27.1`.
  Updated dependency `@babel/preset-env` to `7.27.1`.
  Updated dependency `@babel/preset-react` to `7.27.1`.

- [#4971](https://github.com/scaleway/ultraviolet/pull/4971) [`89cbdcc`](https://github.com/scaleway/ultraviolet/commit/89cbdccf524e4248b74993389bc99f0b24df058c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.2`.
  Updated dependency `@types/react-dom` to `19.1.3`.
  Updated dependency `react` to `19.1.0`.
  Updated dependency `react-dom` to `19.1.0`.

- [#5130](https://github.com/scaleway/ultraviolet/pull/5130) [`bf9d70b`](https://github.com/scaleway/ultraviolet/commit/bf9d70b72ee22724fd8abafb81264c6ecb87d587) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(PieChart): data props type

- Updated dependencies [[`ae591aa`](https://github.com/scaleway/ultraviolet/commit/ae591aae37100cc944443a7eb0949f8762a1e82a), [`89cbdcc`](https://github.com/scaleway/ultraviolet/commit/89cbdccf524e4248b74993389bc99f0b24df058c)]:
  - @ultraviolet/icons@3.15.3

## 1.95.4

### Patch Changes

- Updated dependencies [[`d8b7d1d`](https://github.com/scaleway/ultraviolet/commit/d8b7d1dcb14cf6601d9ab5dbbe9604c03e676358)]:
  - @ultraviolet/icons@3.15.2

## 1.95.3

### Patch Changes

- Updated dependencies [[`06a1acd`](https://github.com/scaleway/ultraviolet/commit/06a1acd30dcacd10d84dd07d48c8f41b9098f098)]:
  - @ultraviolet/icons@3.15.1

## 1.95.2

### Patch Changes

- [#5119](https://github.com/scaleway/ultraviolet/pull/5119) [`e12eb18`](https://github.com/scaleway/ultraviolet/commit/e12eb18c1c130fc1a3da39bd7acbbba8d3fe0872) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Notice />` icon size

## 1.95.1

### Patch Changes

- [#5099](https://github.com/scaleway/ultraviolet/pull/5099) [`302eadc`](https://github.com/scaleway/ultraviolet/commit/302eadca152c594170a843070d48a6482afcb9e0) Thanks [@lisalupi](https://github.com/lisalupi)! - Add arrow icon to `<Popover />`

## 1.95.0

### Minor Changes

- [#5073](https://github.com/scaleway/ultraviolet/pull/5073) [`31829f4`](https://github.com/scaleway/ultraviolet/commit/31829f4b7e83f52a1df700059799d150c6739c3e) Thanks [@matthprost](https://github.com/matthprost)! - New prop `notification` on `<Status />` component

### Patch Changes

- [#4945](https://github.com/scaleway/ultraviolet/pull/4945) [`5705e3c`](https://github.com/scaleway/ultraviolet/commit/5705e3c02e7915b1c4c812426e2676ce34e38696) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Link />`:

  - add a "visited" state
  - deprecate all sentiments but primary (usable in a new prop)

- [#4946](https://github.com/scaleway/ultraviolet/pull/4946) [`fa7dee1`](https://github.com/scaleway/ultraviolet/commit/fa7dee12f32431c277559741d13275d51c79e151) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `containerFullHeight` to Popup and Tooltip, and use it to fix height issue for SelectableCard

## 1.94.2

### Patch Changes

- [#5051](https://github.com/scaleway/ultraviolet/pull/5051) [`c7d0d85`](https://github.com/scaleway/ultraviolet/commit/c7d0d8578bfa92ac563c7dd39e2c9cedae095aab) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` children no more activate the selectable card to avoid propagration when having checkbox tick

## 1.94.1

### Patch Changes

- [#5053](https://github.com/scaleway/ultraviolet/pull/5053) [`2a9c1b4`](https://github.com/scaleway/ultraviolet/commit/2a9c1b4c76d54da411f69126e86fa7ee2fe8c8a2) Thanks [@matthprost](https://github.com/matthprost)! - Sanitize input of `SearchBarDropdown`

- [#5053](https://github.com/scaleway/ultraviolet/pull/5053) [`2a9c1b4`](https://github.com/scaleway/ultraviolet/commit/2a9c1b4c76d54da411f69126e86fa7ee2fe8c8a2) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<VerificationCode />` to have `autocomplete="off"`

- Updated dependencies [[`2eee369`](https://github.com/scaleway/ultraviolet/commit/2eee369ed7191ab5f82dac27b28e0e339b816464), [`2a9c1b4`](https://github.com/scaleway/ultraviolet/commit/2a9c1b4c76d54da411f69126e86fa7ee2fe8c8a2)]:
  - @ultraviolet/icons@3.15.0

## 1.94.0

### Minor Changes

- [#5032](https://github.com/scaleway/ultraviolet/pull/5032) [`1f21803`](https://github.com/scaleway/ultraviolet/commit/1f2180317917e6cab7603361da9956ffc42b000d) Thanks [@matthprost](https://github.com/matthprost)! - Add new prop `maxWidth` and `minWidth` on `<Stack />`

- [#5000](https://github.com/scaleway/ultraviolet/pull/5000) [`9cf64a6`](https://github.com/scaleway/ultraviolet/commit/9cf64a6af130ff1a9e93d058e230542191ee9303) Thanks [@alexandre-combemorel](https://github.com/alexandre-combemorel)! - Add clearable to DateInput and DateInputField (and tooltip)

### Patch Changes

- [#5050](https://github.com/scaleway/ultraviolet/pull/5050) [`f1bb63d`](https://github.com/scaleway/ultraviolet/commit/f1bb63d9c4966f5cbeabbe1b0457beaabded62e1) Thanks [@BABAK0T0](https://github.com/BABAK0T0)! - Sanitize input of `SearchBarDropdown`

- [#5036](https://github.com/scaleway/ultraviolet/pull/5036) [`0ca192f`](https://github.com/scaleway/ultraviolet/commit/0ca192f994641abf9c19f6b3b81cdb60e15b952e) Thanks [@matthprost](https://github.com/matthprost)! - Add new sizes `xmsall` and `xxsmall` on `<Bullet />`

- [#5043](https://github.com/scaleway/ultraviolet/pull/5043) [`c1a0104`](https://github.com/scaleway/ultraviolet/commit/c1a0104c37fcf0b8be8cd9020e611dd71a18a449) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `next` to `15.3.1`.
  Updated dependency `eslint-config-next` to `15.3.1`.

- [#4988](https://github.com/scaleway/ultraviolet/pull/4988) [`ef6e926`](https://github.com/scaleway/ultraviolet/commit/ef6e9267be8eb6ef8a16e52b7b224b83a248595f) Thanks [@matthprost](https://github.com/matthprost)! - Improve `<Expandable />` component to not render content when animation is disabled

- Updated dependencies [[`f989f99`](https://github.com/scaleway/ultraviolet/commit/f989f995442f9746892bb356ec7aa12166a2c6bf)]:
  - @ultraviolet/icons@3.14.0

## 1.93.0

### Minor Changes

- [#5011](https://github.com/scaleway/ultraviolet/pull/5011) [`93c306f`](https://github.com/scaleway/ultraviolet/commit/93c306f0c29b24fcd8ce27556af1d606bd14dbcd) Thanks [@matthprost](https://github.com/matthprost)! - Integration of `"use client"` on all components

### Patch Changes

- [#4968](https://github.com/scaleway/ultraviolet/pull/4968) [`cf94d68`](https://github.com/scaleway/ultraviolet/commit/cf94d68e806a352c5cba80e5c5ca53f6b9525c11) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `image` to modals

- Updated dependencies [[`93c306f`](https://github.com/scaleway/ultraviolet/commit/93c306f0c29b24fcd8ce27556af1d606bd14dbcd)]:
  - @ultraviolet/icons@3.13.0

## 1.92.6

### Patch Changes

- [#5023](https://github.com/scaleway/ultraviolet/pull/5023) [`96685a2`](https://github.com/scaleway/ultraviolet/commit/96685a24c9406f331c83d3611ea1ec240537b337) Thanks [@matthprost](https://github.com/matthprost)! - Add new prop `portalTarget` on `<SelectInputV2 />` to add more ganularity for dropdown display

- [#5022](https://github.com/scaleway/ultraviolet/pull/5022) [`d78387c`](https://github.com/scaleway/ultraviolet/commit/d78387cc7470a2099ca4783cc365cde6f9a65906) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<UnitInput />` value not updating when changing in controlled

## 1.92.5

### Patch Changes

- [#5012](https://github.com/scaleway/ultraviolet/pull/5012) [`16c02b9`](https://github.com/scaleway/ultraviolet/commit/16c02b9c52660b3ad6841af5f9ef7b41c7374bcd) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCardOptionGroup />` image `height` to take same size as `width`

- [#4991](https://github.com/scaleway/ultraviolet/pull/4991) [`8a7e507`](https://github.com/scaleway/ultraviolet/commit/8a7e507a2ee57c648318149b4273caf2c60cdd3e) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `dropdownAlign` to `<SelectInputV2 />` and `<UnitInput />`

- [#4965](https://github.com/scaleway/ultraviolet/pull/4965) [`b388aff`](https://github.com/scaleway/ultraviolet/commit/b388affcc6519920be33776f0e6d98fa304c7e8a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<UnitInput />` to remove disabled state when only one option is available

## 1.92.4

### Patch Changes

- [#5005](https://github.com/scaleway/ultraviolet/pull/5005) [`b9ebc2a`](https://github.com/scaleway/ultraviolet/commit/b9ebc2ac2595618d9524001efb4d8e0493f86a69) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SwitchButton />` relative selectable card is breaking the display

- [#4992](https://github.com/scaleway/ultraviolet/pull/4992) [`3b9a151`](https://github.com/scaleway/ultraviolet/commit/3b9a151d514928c2b52ed91ee4dcfc6d2c2ade01) Thanks [@lisalupi](https://github.com/lisalupi)! - List : Fix error `In HTML, <tr> cannot be a child of <tr>` when loading

- Updated dependencies [[`58657d8`](https://github.com/scaleway/ultraviolet/commit/58657d800433f7ae36dbd9cd44f19f63cd93cb75)]:
  - @ultraviolet/themes@1.17.0
  - @ultraviolet/icons@3.12.5

## 1.92.3

### Patch Changes

- [#4989](https://github.com/scaleway/ultraviolet/pull/4989) [`453efd8`](https://github.com/scaleway/ultraviolet/commit/453efd8095fae0c2a91baf5cd2ce4c6bc8596360) Thanks [@matthprost](https://github.com/matthprost)! - Improve `<Breadcrumbs.Items />` to implement `minWidth` and `maxWidth`. It will truncate the text if there is no space or if `maxWidth` has been reached.

## 1.92.2

### Patch Changes

- [#4978](https://github.com/scaleway/ultraviolet/pull/4978) [`865dd71`](https://github.com/scaleway/ultraviolet/commit/865dd710d3cf1243455f6d55cc8a8f54aaa54b95) Thanks [@alexandre-combemorel](https://github.com/alexandre-combemorel)! - Change Date Input props and remove accepting string

- [#4986](https://github.com/scaleway/ultraviolet/pull/4986) [`1252790`](https://github.com/scaleway/ultraviolet/commit/125279049c1bcbf5e6de9ee00f742b9a845d5e6a) Thanks [@matthprost](https://github.com/matthprost)! - Fix Toaster component to have more options disabled blocking it from auto closing

- [#4975](https://github.com/scaleway/ultraviolet/pull/4975) [`ec95d1d`](https://github.com/scaleway/ultraviolet/commit/ec95d1d0c46a871fbf5d2dd066492e02bc91cc05) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` make the parent container relative so the ticks can display correctly under any conditions

- Updated dependencies [[`f81674d`](https://github.com/scaleway/ultraviolet/commit/f81674ddb14403dadd208023cced359191519bdf)]:
  - @ultraviolet/icons@3.12.4

## 1.92.1

### Patch Changes

- Updated dependencies [[`917948a`](https://github.com/scaleway/ultraviolet/commit/917948ab383fd3dd894be500eed3310c354252cc)]:
  - @ultraviolet/icons@3.12.3

## 1.92.0

### Minor Changes

- [#4895](https://github.com/scaleway/ultraviolet/pull/4895) [`dcdf00f`](https://github.com/scaleway/ultraviolet/commit/dcdf00f20cda1aa2bda9907dbeaf9009b48c47ab) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `emptyState` on `<MenuV2.Group />` that can be usefull when searching

### Patch Changes

- [#4909](https://github.com/scaleway/ultraviolet/pull/4909) [`2cdbba8`](https://github.com/scaleway/ultraviolet/commit/2cdbba8a821856c3a16f9170b35d6d400b527c91) Thanks [@matthprost](https://github.com/matthprost)! - Improve `<InfiniteScroll />` accessibility

- [#4905](https://github.com/scaleway/ultraviolet/pull/4905) [`5448fec`](https://github.com/scaleway/ultraviolet/commit/5448fec85cbb289cf0d8227556dbf572727652b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCardOptionGroup.Option />` disabled image to have better visual

## 1.91.0

### Minor Changes

- [#4918](https://github.com/scaleway/ultraviolet/pull/4918) [`747a788`](https://github.com/scaleway/ultraviolet/commit/747a788f6767814b0fde4e2f51becece9a11bb86) Thanks [@lisalupi](https://github.com/lisalupi)! - Prop `name` required in form, but not in UI

### Patch Changes

- [#4930](https://github.com/scaleway/ultraviolet/pull/4930) [`d0a2c76`](https://github.com/scaleway/ultraviolet/commit/d0a2c767f9600328b1113730f0ab12f2e4f17c1d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.12`.

- [#4896](https://github.com/scaleway/ultraviolet/pull/4896) [`e3702b4`](https://github.com/scaleway/ultraviolet/commit/e3702b4186517a94f1900f516105fe9837b1ff34) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.10`.
  Updated dependency `@babel/eslint-parser` to `7.26.10`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.26.10`.

- [#4913](https://github.com/scaleway/ultraviolet/pull/4913) [`ba74625`](https://github.com/scaleway/ultraviolet/commit/ba74625349f2bf2196784a3e9b2a71ab9663ce2c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<TagList />` to handle better the popover

- [#4943](https://github.com/scaleway/ultraviolet/pull/4943) [`4840a0d`](https://github.com/scaleway/ultraviolet/commit/4840a0dc8ec320560fddd4a1e117bb124e2365d1) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix non-selectable checkbox on `<Table />` and `<List />`

- Updated dependencies [[`d0a2c76`](https://github.com/scaleway/ultraviolet/commit/d0a2c767f9600328b1113730f0ab12f2e4f17c1d), [`e3702b4`](https://github.com/scaleway/ultraviolet/commit/e3702b4186517a94f1900f516105fe9837b1ff34)]:
  - @ultraviolet/icons@3.12.2

## 1.90.4

### Patch Changes

- [#4914](https://github.com/scaleway/ultraviolet/pull/4914) [`d841d65`](https://github.com/scaleway/ultraviolet/commit/d841d65cb3096b6afda5abf72b344094bb8d966f) Thanks [@matthprost](https://github.com/matthprost)! - fix `<SelectableCard />` type checkbox

## 1.90.3

### Patch Changes

- Updated dependencies [[`64ae35b`](https://github.com/scaleway/ultraviolet/commit/64ae35b678e3b2ddc67f9bd467d6f71c53e441c2)]:
  - @ultraviolet/icons@3.12.1

## 1.90.2

### Patch Changes

- [#4886](https://github.com/scaleway/ultraviolet/pull/4886) [`c4cf56d`](https://github.com/scaleway/ultraviolet/commit/c4cf56d39c2cac7de0eb2cb05df2f7cc7bee668b) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` vertical scroll to `auto`

- [#4890](https://github.com/scaleway/ultraviolet/pull/4890) [`713518d`](https://github.com/scaleway/ultraviolet/commit/713518d8b46bc38191428fafa9e8a25dc50dfd86) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCardOptionGroup.Option />` to have `tooltip` prop

## 1.90.1

### Patch Changes

- [#4876](https://github.com/scaleway/ultraviolet/pull/4876) [`ea9dce1`](https://github.com/scaleway/ultraviolet/commit/ea9dce18d980a958799bd95555be6a0cbd9d1dd5) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Tag />` not being troncated

- [#4888](https://github.com/scaleway/ultraviolet/pull/4888) [`1cd3b16`](https://github.com/scaleway/ultraviolet/commit/1cd3b16c80fad09a2eafe71a0373716efb71f03d) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` layout issue

## 1.90.0

### Minor Changes

- [#4846](https://github.com/scaleway/ultraviolet/pull/4846) [`52d584a`](https://github.com/scaleway/ultraviolet/commit/52d584aacd99a2948456b363032c06e766a3291d) Thanks [@matthprost](https://github.com/matthprost)! - New component `<InfiniteScroll />`

### Patch Changes

- [#4868](https://github.com/scaleway/ultraviolet/pull/4868) [`655ee66`](https://github.com/scaleway/ultraviolet/commit/655ee6604201e5e4cac4f7214a106080cb03daf1) Thanks [@matthprost](https://github.com/matthprost)! - `<SearchInput />` is now fully interactive

- [#4885](https://github.com/scaleway/ultraviolet/pull/4885) [`284ec89`](https://github.com/scaleway/ultraviolet/commit/284ec896df9712f53cf6565db571568e5a935e05) Thanks [@matthprost](https://github.com/matthprost)! - Minor fixes on missing props and features on `<SelectableCardOptionGroup />`

## 1.89.2

### Patch Changes

- [#4872](https://github.com/scaleway/ultraviolet/pull/4872) [`22e118b`](https://github.com/scaleway/ultraviolet/commit/22e118ba34cd044ed2933548cb8af64b68048ec8) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Radio />` component to have correct id on label

- [#4855](https://github.com/scaleway/ultraviolet/pull/4855) [`a96f772`](https://github.com/scaleway/ultraviolet/commit/a96f77290ded98cbc11581ecb893d8c0e387ac3c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ProgressBar />` to allow values above the maximum value

## 1.89.1

### Patch Changes

- [#4870](https://github.com/scaleway/ultraviolet/pull/4870) [`c8f5887`](https://github.com/scaleway/ultraviolet/commit/c8f58872d928a6fb804e27bc42bbadafe72e325c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` to be able to click on the label and remove all `pointer-events: none`

## 1.89.0

### Minor Changes

- [#4798](https://github.com/scaleway/ultraviolet/pull/4798) [`63f9b91`](https://github.com/scaleway/ultraviolet/commit/63f9b911ed8ca47e51fbfd52ab873f7b3badf95d) Thanks [@matthprost](https://github.com/matthprost)! - - `<Popup />`: fix when there is no animation to not add a `setTimeout` to close the popup. This will improve the behavior of `<SelectInputV2 />` and make the testing less random.
  - `<SelectableCard />`: remove pointer events on the radio. We were already doing it with the checkbox version. Also improved tabulation to be more accessible.
  - `<Label />`: improve component to accept `as` prop that can take either `label` or `legend`. It also accept `sentiment` and `disabled` props now. The mouse pointer will be a pointer as well when `htmlFor` is passed.
  - `<SelectInputV2 />`: improve the focusable elements and fix a visual bug to double click to open the dropdown. Also when there is no space in the input the text will be ellipsis.
  - New component `<SelectableCardOptionGroup />`

### Patch Changes

- [#4842](https://github.com/scaleway/ultraviolet/pull/4842) [`0450562`](https://github.com/scaleway/ultraviolet/commit/0450562f96b7e44f4abd2c7869be75aadcb9bf37) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Banner />` image component

- [#4828](https://github.com/scaleway/ultraviolet/pull/4828) [`e2b112c`](https://github.com/scaleway/ultraviolet/commit/e2b112c46745e025af3995afbb3256263cf3d199) Thanks [@matthprost](https://github.com/matthprost)! - Add `disabled` prop on `<Dialog.CancelButton />`

- [#4636](https://github.com/scaleway/ultraviolet/pull/4636) [`5f72c9d`](https://github.com/scaleway/ultraviolet/commit/5f72c9d93757181173329b096bcb2fdbd0fbfc8b) Thanks [@lisalupi](https://github.com/lisalupi)! - `<List />` and `<Table />`: more intuitive behavior for shift+click

- [#4841](https://github.com/scaleway/ultraviolet/pull/4841) [`5e2164c`](https://github.com/scaleway/ultraviolet/commit/5e2164c9fe2457b084a7bacff6855c1258bab07f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Slider />` to have better label and min width when having input mode

- Updated dependencies [[`b160d8f`](https://github.com/scaleway/ultraviolet/commit/b160d8ffb3ada5411c59d696eb63e736e1b47ed9)]:
  - @ultraviolet/icons@3.12.0

## 1.88.1

### Patch Changes

- [#4810](https://github.com/scaleway/ultraviolet/pull/4810) [`0ff30c2`](https://github.com/scaleway/ultraviolet/commit/0ff30c27283f16e02c2405869fb6c89ef0965e47) Thanks [@matthprost](https://github.com/matthprost)! - Refactor system icons to use a better default size that is not deprecated

- [#4613](https://github.com/scaleway/ultraviolet/pull/4613) [`21ca832`](https://github.com/scaleway/ultraviolet/commit/21ca8327995f699842f0ee8dd44edbc9a7a3a188) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-toastify` to `11.0.1`.

- [#4817](https://github.com/scaleway/ultraviolet/pull/4817) [`037ec90`](https://github.com/scaleway/ultraviolet/commit/037ec902c96717cc3072a53410dcc51705e5dca4) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.10.0`.

- [#4839](https://github.com/scaleway/ultraviolet/pull/4839) [`d07fe3a`](https://github.com/scaleway/ultraviolet/commit/d07fe3a970e4b1d079a36466523b05c8b14b3569) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInput />` wrong arrow size

- Updated dependencies [[`0ff30c2`](https://github.com/scaleway/ultraviolet/commit/0ff30c27283f16e02c2405869fb6c89ef0965e47)]:
  - @ultraviolet/icons@3.11.4

## 1.88.0

### Minor Changes

- [#4793](https://github.com/scaleway/ultraviolet/pull/4793) [`c231fb2`](https://github.com/scaleway/ultraviolet/commit/c231fb29a64c2d0caaa749b8c56c846420d8fc9f) Thanks [@matthprost](https://github.com/matthprost)! - More component have `icon` prop deprecated. You can directly use the imported icon you need in the children.

  Here is the list of components with `icon` prop deprecated and how to migrate them:

  ### Bullet

  `icon` and `iconVariant` props are deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Bullet } from '@ultraviolet/ui'

  <Bullet icon="check" />
  <Bullet icon="check" iconVariant="outlined" />
  ```

  ```tsx
  // After
  import { Bullet } from '@ultraviolet/ui'
  import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
  import { CheckCircleOutlineIcon } from '@ultraviolet/icons/CheckCircleOutlineIcon'

  <Bullet>
    <CheckIcon />
  </Bullet>

  <Bullet>
    <CheckCircleOutlineIcon />
  </Bullet>
  ```

  ### AvatarV2

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { AvatarV2 } from "@ultraviolet/ui";

  <AvatarV2 variant="icon" shape="circle" sentiment="primary" icon="mosaic" />;
  ```

  ```tsx
  // After
  import { AvatarV2 } from "@ultraviolet/ui";
  import { MosaicIcon } from "@ultraviolet/icons";

  <AvatarV2 variant="icon" shape="circle" sentiment="primary">
    <MosaicIcon size="xlarge" />
  </AvatarV2>;
  ```

  ### Separator

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Separator } from "@ultraviolet/ui";

  <Separator direction="vertical" icon="ray-top-arrow" />;
  ```

  ```tsx
  // After
  import { Separator } from "@ultraviolet/ui";
  import { RayTopArrowIcon } from "@ultraviolet/icons";

  <Separator direction="vertical">
    <RayTopArrowIcon size="medium" />
  </Separator>;
  ```

  ### Tag

  `icon` prop is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Tag } from "@ultraviolet/ui";

  <Tag icon="check">Valid</Tag>;
  ```

  ```tsx
  // After
  import { Tag } from "@ultraviolet/ui";
  import { CheckIcon } from "@ultraviolet/icons";

  <Tag>
    <CheckIcon size="small" />
    Valid
  </Tag>;
  ```

  You can find this migration documented in the [Ultraviolet UI Storybook](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-migrate-icon-usages--docs).

### Patch Changes

- [#4809](https://github.com/scaleway/ultraviolet/pull/4809) [`4a0a1fb`](https://github.com/scaleway/ultraviolet/commit/4a0a1fb9bb43864e85cc53ee94690ac02044737f) Thanks [@lisalupi](https://github.com/lisalupi)! - `<UnitInput />`: fix component width, font-size and background-color

- [#4792](https://github.com/scaleway/ultraviolet/pull/4792) [`e650ee6`](https://github.com/scaleway/ultraviolet/commit/e650ee613de68f28a6ba37d00cfb7c1c614699a6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.10`.
  Updated dependency `@types/react-dom` to `19.0.4`.
  Updated dependency `eslint-plugin-react-hooks` to `5.1.0`.

- [#4775](https://github.com/scaleway/ultraviolet/pull/4775) [`f1902a6`](https://github.com/scaleway/ultraviolet/commit/f1902a694b02c22a9a6dba89fde98ca2771c5833) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.9`.
  Updated dependency `@babel/runtime` to `7.26.9`.
  Updated dependency `@babel/eslint-parser` to `7.26.8`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.26.9`.
  Updated dependency `@babel/preset-env` to `7.26.9`.

- [#4797](https://github.com/scaleway/ultraviolet/pull/4797) [`8273a0f`](https://github.com/scaleway/ultraviolet/commit/8273a0fc3932b7bdd1b99f441a52a5c4ff53d1b4) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<RadioGroup />`, `<CheckboxGroup />` and `<ToggleGroup />` not to show empty div when legend is empty

- Updated dependencies [[`e650ee6`](https://github.com/scaleway/ultraviolet/commit/e650ee613de68f28a6ba37d00cfb7c1c614699a6), [`f1902a6`](https://github.com/scaleway/ultraviolet/commit/f1902a694b02c22a9a6dba89fde98ca2771c5833)]:
  - @ultraviolet/icons@3.11.3

## 1.87.3

### Patch Changes

- [#4763](https://github.com/scaleway/ultraviolet/pull/4763) [`8413cad`](https://github.com/scaleway/ultraviolet/commit/8413cad6007aabe702e0c9695784b3e948292c2c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` within `<Modal />` to correctly close when you click outside

- [#4786](https://github.com/scaleway/ultraviolet/pull/4786) [`d764e76`](https://github.com/scaleway/ultraviolet/commit/d764e76ccfc444dddd8c4a777babd3acdae25435) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(SwitchButton): incorrect onchange type

- [#4796](https://github.com/scaleway/ultraviolet/pull/4796) [`da1c46e`](https://github.com/scaleway/ultraviolet/commit/da1c46ea061a7357a5656438d2b4aa8f28ba6196) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ProgressBar />` bug with the label

- [#4766](https://github.com/scaleway/ultraviolet/pull/4766) [`183b377`](https://github.com/scaleway/ultraviolet/commit/183b377a4e09f4fa0fc8b8dd55c853baee495397) Thanks [@lisalupi](https://github.com/lisalupi)! - `<MenuV2 />`: now have a min and max width instead of a fixed width

## 1.87.2

### Patch Changes

- [#4788](https://github.com/scaleway/ultraviolet/pull/4788) [`d6df8b9`](https://github.com/scaleway/ultraviolet/commit/d6df8b9cff3bd0273c202074d5d4c722a0f6817b) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Label />` component useless re-render

## 1.87.1

### Patch Changes

- [#4780](https://github.com/scaleway/ultraviolet/pull/4780) [`35a1958`](https://github.com/scaleway/ultraviolet/commit/35a1958cb64e8fbd8d90e356df70c191eceac620) Thanks [@lisalupi](https://github.com/lisalupi)! - `Label`: required \* not part of a label

- [#4779](https://github.com/scaleway/ultraviolet/pull/4779) [`de2895a`](https://github.com/scaleway/ultraviolet/commit/de2895ac39d4348c56d65497808e373bab02c5c3) Thanks [@matthprost](https://github.com/matthprost)! - Fix icons to work with legacy one

- Updated dependencies [[`de2895a`](https://github.com/scaleway/ultraviolet/commit/de2895ac39d4348c56d65497808e373bab02c5c3)]:
  - @ultraviolet/icons@3.11.2

## 1.87.0

### Minor Changes

- [#4768](https://github.com/scaleway/ultraviolet/pull/4768) [`3b8a89a`](https://github.com/scaleway/ultraviolet/commit/3b8a89a770748a40939f553e9456edc0cc1492a4) Thanks [@matthprost](https://github.com/matthprost)! - New props `rel` and `target` on `<MenuV2.Item />`

- [#4738](https://github.com/scaleway/ultraviolet/pull/4738) [`62981ad`](https://github.com/scaleway/ultraviolet/commit/62981ad6b122a3670c0687d2854aa9134cca85f3) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `<Label />` and use it in input components

### Patch Changes

- [#4765](https://github.com/scaleway/ultraviolet/pull/4765) [`d36d815`](https://github.com/scaleway/ultraviolet/commit/d36d815ddb0db8ff2514200d00bbe0e01e731ef4) Thanks [@matthprost](https://github.com/matthprost)! - Fix `Popup` internal component to position better when it is attached to `document.body`

- Updated dependencies [[`9133763`](https://github.com/scaleway/ultraviolet/commit/9133763cd6c1dfeb24ca656ac68a5dfa7b5c20cd), [`1c7ef50`](https://github.com/scaleway/ultraviolet/commit/1c7ef50ca4ac37b8d9a171e2a7ab14be0b4d953d)]:
  - @ultraviolet/icons@3.11.1

## 1.86.0

### Minor Changes

- [#4752](https://github.com/scaleway/ultraviolet/pull/4752) [`ec29328`](https://github.com/scaleway/ultraviolet/commit/ec29328fa0a0b85d8721b9cd920a7946b5a470fd) Thanks [@matthprost](https://github.com/matthprost)! - New prop `highlightAnimation` on `<List.Row />` component

### Patch Changes

- [#4741](https://github.com/scaleway/ultraviolet/pull/4741) [`a1cc1af`](https://github.com/scaleway/ultraviolet/commit/a1cc1afbc8b97b61736caf441f48555e543a9f66) Thanks [@lisalupi](https://github.com/lisalupi)! - `<DateInput />`: rework range logic and fix styling issue on hover for days in range

- [#4758](https://github.com/scaleway/ultraviolet/pull/4758) [`a81daa4`](https://github.com/scaleway/ultraviolet/commit/a81daa4ea5b41b3eba10c80501d96845f2222098) Thanks [@matthprost](https://github.com/matthprost)! - In `<Badge />` component, `icon` props is deprecated. You can directly use the imported icon you need in the children.

  ```tsx
  // Before
  import { Badge } from "@ultraviolet/ui";

  <Badge icon="pencil">Edit</Badge>;
  ```

  ```tsx
  // After
  import { Badge } from "@ultraviolet/ui";
  import { PencilOutlineIcon } from "@ultraviolet/icons";

  <Badge>
    Edit <PencilOutlineIcon />
  </Badge>;
  ```

- [#4759](https://github.com/scaleway/ultraviolet/pull/4759) [`5b840a8`](https://github.com/scaleway/ultraviolet/commit/5b840a8d081da1ffff44e94fc6b3fcf7e142d6f1) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Table.Cell />` to have correct sentiments prop

## 1.85.3

### Patch Changes

- [#4737](https://github.com/scaleway/ultraviolet/pull/4737) [`3d28302`](https://github.com/scaleway/ultraviolet/commit/3d28302a867df3b16cbbe64b375d15c9742797a7) Thanks [@lisalupi](https://github.com/lisalupi)! - `<DateInput />`: new prop `input` to show calendar as a card, with no input

- Updated dependencies [[`c959773`](https://github.com/scaleway/ultraviolet/commit/c959773c06154ca253b2cc6ed68d01021a3de7f4), [`6108aff`](https://github.com/scaleway/ultraviolet/commit/6108affee43423302ee20c7e98410029a279c3a9)]:
  - @ultraviolet/icons@3.11.0

## 1.85.2

### Patch Changes

- [#4742](https://github.com/scaleway/ultraviolet/pull/4742) [`2a8b327`](https://github.com/scaleway/ultraviolet/commit/2a8b327cb41a72475d4dd91f55b55491ce2d78f6) Thanks [@matthprost](https://github.com/matthprost)! - - System Icons from `@ultraviolet/icons` have a change in their sizing. `large` became `medium` and a new `large` sizing has been created (around 24px)

  - `<Button />` the prop `icon`, `iconPosition` and `iconSentiment` has been marked as deprecated and will be removed in future major release. You should use the icon component directly in the children of the button:

  ```tsx
  // Before
  import { Button } from "@ultraviolet/ui";

  <Button icon="pencil" iconPosition="right" iconVariant="outline">
    Edit
  </Button>;
  ```

  ```tsx
  // After
  import { Button } from "@ultraviolet/ui";
  import { PencilOutlineIcon } from "@ultraviolet/icons";

  <Button>
    Edit <PencilOutlineIcon />
  </Button>;
  ```

  - Fix of other legacy usages of icons into the library

- Updated dependencies [[`2a8b327`](https://github.com/scaleway/ultraviolet/commit/2a8b327cb41a72475d4dd91f55b55491ce2d78f6)]:
  - @ultraviolet/icons@3.10.2

## 1.85.1

### Patch Changes

- [#4719](https://github.com/scaleway/ultraviolet/pull/4719) [`cb9e923`](https://github.com/scaleway/ultraviolet/commit/cb9e923a2364aa82ab3f33cbd1cb068a71035b4d) Thanks [@matthprost](https://github.com/matthprost)! - Fix multiple icons that were not displayed properly

- [#4740](https://github.com/scaleway/ultraviolet/pull/4740) [`fa3766c`](https://github.com/scaleway/ultraviolet/commit/fa3766cf94a1cd83973be43eff92bc100390f05d) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - fix condition with explicit undefined for value update

- Updated dependencies [[`cb9e923`](https://github.com/scaleway/ultraviolet/commit/cb9e923a2364aa82ab3f33cbd1cb068a71035b4d)]:
  - @ultraviolet/icons@3.10.1

## 1.85.0

### Minor Changes

- [#4734](https://github.com/scaleway/ultraviolet/pull/4734) [`1b5dd12`](https://github.com/scaleway/ultraviolet/commit/1b5dd123043ebddec4ee4013df551d8667796209) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - add `defaultValue` prop for initial value and `value` for change value locally of searchinput

### Patch Changes

- [#4729](https://github.com/scaleway/ultraviolet/pull/4729) [`fc68c84`](https://github.com/scaleway/ultraviolet/commit/fc68c84440eff61479ec507c513dd274a4b2e32a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Dialog />` component to have correct icon when having warning and danger sentiment

- [#4731](https://github.com/scaleway/ultraviolet/pull/4731) [`112031d`](https://github.com/scaleway/ultraviolet/commit/112031d911fa0609e3b4945ad99f1d95624f7e9e) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<BarChart />` and `<LineChart />` colors for legends and some other bugs

## 1.84.5

### Patch Changes

- [#4725](https://github.com/scaleway/ultraviolet/pull/4725) [`4a4ed79`](https://github.com/scaleway/ultraviolet/commit/4a4ed79d68bb1d15ce11dde755d92e9de05cc844) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.7`.
  Updated dependency `@babel/runtime` to `7.26.7`.
  Updated dependency `@babel/preset-env` to `7.26.7`.
- Updated dependencies [[`19b2bed`](https://github.com/scaleway/ultraviolet/commit/19b2bed2284098aa227a22a3f1b71a8af29e19e5), [`4a4ed79`](https://github.com/scaleway/ultraviolet/commit/4a4ed79d68bb1d15ce11dde755d92e9de05cc844)]:
  - @ultraviolet/icons@3.10.0

## 1.84.4

### Patch Changes

- [#4674](https://github.com/scaleway/ultraviolet/pull/4674) [`d3acc50`](https://github.com/scaleway/ultraviolet/commit/d3acc506910ecaadea92dcccaafeb600200fb274) Thanks [@lisalupi](https://github.com/lisalupi)! - `<DateInput />: fix issue with min-max date

- [#4711](https://github.com/scaleway/ultraviolet/pull/4711) [`ef98866`](https://github.com/scaleway/ultraviolet/commit/ef98866a1a36b3d89b032b776becd4056db98a62) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Checkbox />` alignement of the children used as a label

- [#4713](https://github.com/scaleway/ultraviolet/pull/4713) [`9de3560`](https://github.com/scaleway/ultraviolet/commit/9de3560479d871bf31bc68b050ccba1e62665816) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.8`.

- Updated dependencies [[`310e32e`](https://github.com/scaleway/ultraviolet/commit/310e32e35e51bc3c53d27cf374bc5bfeaac33768), [`9de3560`](https://github.com/scaleway/ultraviolet/commit/9de3560479d871bf31bc68b050ccba1e62665816)]:
  - @ultraviolet/icons@3.9.1

## 1.84.3

### Patch Changes

- Updated dependencies [[`9a58499`](https://github.com/scaleway/ultraviolet/commit/9a58499f3ef519f7f29cab1441d56638d75bf827)]:
  - @ultraviolet/icons@3.9.0

## 1.84.2

### Patch Changes

- [#4695](https://github.com/scaleway/ultraviolet/pull/4695) [`c4767ba`](https://github.com/scaleway/ultraviolet/commit/c4767ba4a1f2bad56ba66f6c2ace874838bc8c82) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Button />` to remove illegal div in children when text as children

- [#4690](https://github.com/scaleway/ultraviolet/pull/4690) [`3d37913`](https://github.com/scaleway/ultraviolet/commit/3d3791392c86ca6e6e7c9f8518507762865132c0) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Tooltip />` alignement with the arrow due to `Popup` internal component

- [#4652](https://github.com/scaleway/ultraviolet/pull/4652) [`fddc860`](https://github.com/scaleway/ultraviolet/commit/fddc860ffcf4c0bf7458818a0152becd91f96b54) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />`:
  - onChange handle on checkboxes fix
  - visual indication of focused item for keyboard users
  - no scroll when opening the dropdown with "Enter"
- Updated dependencies [[`f8e9911`](https://github.com/scaleway/ultraviolet/commit/f8e99113b95758ce6c40aa4f3c7d4cebc3db91ca), [`d41d0ff`](https://github.com/scaleway/ultraviolet/commit/d41d0ff7756acd0d69a3a63e62cdb49e09341729)]:
  - @ultraviolet/themes@1.16.0
  - @ultraviolet/icons@3.8.4

## 1.84.1

### Patch Changes

- [#4673](https://github.com/scaleway/ultraviolet/pull/4673) [`aff907c`](https://github.com/scaleway/ultraviolet/commit/aff907c0e3df8318f3494bf935e9ca137628ce7b) Thanks [@matthprost](https://github.com/matthprost)! - `<VerificationCode />` new props `label`, `labelDescription`, `success` and `error`

- [#4646](https://github.com/scaleway/ultraviolet/pull/4646) [`80fe6dc`](https://github.com/scaleway/ultraviolet/commit/80fe6dcce854a37c46861a43ab7f00a08cfe1bea) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Popover />` portal target to be `document.body` if not inside a modal.

- Updated dependencies [[`4fe32b4`](https://github.com/scaleway/ultraviolet/commit/4fe32b4d4b30fb4cdeb1bdf85f9a6d72e12bb7f3)]:
  - @ultraviolet/icons@3.8.3

## 1.84.0

### Minor Changes

- [#4537](https://github.com/scaleway/ultraviolet/pull/4537) [`9db9273`](https://github.com/scaleway/ultraviolet/commit/9db927334bfc4eeb583d1753c775b6b91abe97d2) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor and enhancement of `<Pagination />` :

  - Number of results on the bottom left
  - Number of items to display
  - Styling

- [#4635](https://github.com/scaleway/ultraviolet/pull/4635) [`b4b5366`](https://github.com/scaleway/ultraviolet/commit/b4b536696ca576f4c3f489879192e80777acf615) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `<TimeInputV2 />`

- [#4661](https://github.com/scaleway/ultraviolet/pull/4661) [`3b593c7`](https://github.com/scaleway/ultraviolet/commit/3b593c76c3ef86cbf3465e1055ad0d32e63f6b95) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - feat: Add `popoverMaxHeight` to `<TagList />`

### Patch Changes

- [#4663](https://github.com/scaleway/ultraviolet/pull/4663) [`d11059c`](https://github.com/scaleway/ultraviolet/commit/d11059c4b1e51f582d525245eb873fa1fd96dcee) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.6`.

- [#4679](https://github.com/scaleway/ultraviolet/pull/4679) [`acd9e4e`](https://github.com/scaleway/ultraviolet/commit/acd9e4e7cb782c13120b7e7613286f106f7b3692) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.7`.

- [#4668](https://github.com/scaleway/ultraviolet/pull/4668) [`5509994`](https://github.com/scaleway/ultraviolet/commit/5509994312fd8474517b123b2eb9c8b3101b47cb) Thanks [@lisalupi](https://github.com/lisalupi)! - `<NumberInputV2 />`: border color when disabled

- [#4669](https://github.com/scaleway/ultraviolet/pull/4669) [`8219a68`](https://github.com/scaleway/ultraviolet/commit/8219a68715c8017a1a71d33af97b52d0ff8f1c67) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Slider />: when the component is disabled, the input is disabled too

- Updated dependencies [[`d11059c`](https://github.com/scaleway/ultraviolet/commit/d11059c4b1e51f582d525245eb873fa1fd96dcee), [`acd9e4e`](https://github.com/scaleway/ultraviolet/commit/acd9e4e7cb782c13120b7e7613286f106f7b3692)]:
  - @ultraviolet/icons@3.8.2

## 1.83.2

### Patch Changes

- [#4664](https://github.com/scaleway/ultraviolet/pull/4664) [`3271b0a`](https://github.com/scaleway/ultraviolet/commit/3271b0a2cfcf46de3e0ffeb9442d4fad5f2d844c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` to use `hideOnClickOutside` instead of custom event listener

## 1.83.1

### Patch Changes

- [#4644](https://github.com/scaleway/ultraviolet/pull/4644) [`8b7e989`](https://github.com/scaleway/ultraviolet/commit/8b7e98975598d5f24b006d29f83b59c807eeca58) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.3`.

- [#4659](https://github.com/scaleway/ultraviolet/pull/4659) [`86641c4`](https://github.com/scaleway/ultraviolet/commit/86641c44e754bab39932bd4efe489a3d567abf81) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Modal />` not allowing to focus nested inputs

- Updated dependencies [[`8b7e989`](https://github.com/scaleway/ultraviolet/commit/8b7e98975598d5f24b006d29f83b59c807eeca58)]:
  - @ultraviolet/icons@3.8.1

## 1.83.0

### Minor Changes

- [#4604](https://github.com/scaleway/ultraviolet/pull/4604) [`76a8557`](https://github.com/scaleway/ultraviolet/commit/76a8557ca97592e3383465c6f273249cf76d9081) Thanks [@matthprost](https://github.com/matthprost)! - New prop `searchable` and `hideOnClickItem` in `<MenuV2 />` component

### Patch Changes

- [#4653](https://github.com/scaleway/ultraviolet/pull/4653) [`61d26ae`](https://github.com/scaleway/ultraviolet/commit/61d26aec4a97f56ce6d3ab570c3c230a52c48aaa) Thanks [@matthprost](https://github.com/matthprost)! - Improve search engine on `<MenuV2 />` component and new prop `labelDescription` on `<MenuV2.Group />` component

## 1.82.3

### Patch Changes

- [#4637](https://github.com/scaleway/ultraviolet/pull/4637) [`9972cc5`](https://github.com/scaleway/ultraviolet/commit/9972cc56f910fbd2ed6a81fd172337604e0585e0) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Slider />`: fix thumb position (firefox)

- [#4595](https://github.com/scaleway/ultraviolet/pull/4595) [`a492cbe`](https://github.com/scaleway/ultraviolet/commit/a492cbe263f5b43f36fa84e7c36ba9dfdece1f33) Thanks [@matthprost](https://github.com/matthprost)! - Add `strikethrough` prop on `<Text />` component

- [#4572](https://github.com/scaleway/ultraviolet/pull/4572) [`d8c3416`](https://github.com/scaleway/ultraviolet/commit/d8c3416895fedd524d2a3eefc76dbf7074b9dd3b) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Text />`: new prop `whiteSpace`

- [#4614](https://github.com/scaleway/ultraviolet/pull/4614) [`bab3b75`](https://github.com/scaleway/ultraviolet/commit/bab3b756dd168954be6be86f0cef078a822df934) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Modal />` stop propagation so you can close `<SelectInputV2 />` within it

- [#4630](https://github.com/scaleway/ultraviolet/pull/4630) [`2205ef6`](https://github.com/scaleway/ultraviolet/commit/2205ef68e0841ce0ab985cc3896fe5b68ef35b89) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/use-media` to `3.0.3`.

- [#4570](https://github.com/scaleway/ultraviolet/pull/4570) [`c0f8849`](https://github.com/scaleway/ultraviolet/commit/c0f8849a0e14d337e6feca67dff8169e23ceaecf) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@nivo/bar` to `0.88.0`.
  Updated dependency `@nivo/core` to `0.88.0`.
  Updated dependency `@nivo/line` to `0.88.0`.
  Updated dependency `@nivo/pie` to `0.88.0`.
  Updated dependency `@nivo/scales` to `0.88.0`.
- Updated dependencies [[`9fd969e`](https://github.com/scaleway/ultraviolet/commit/9fd969e4ed3580d52d16d853c4b11dbb39312477)]:
  - @ultraviolet/icons@3.8.0

## 1.82.2

### Patch Changes

- [#4623](https://github.com/scaleway/ultraviolet/pull/4623) [`64fdd0c`](https://github.com/scaleway/ultraviolet/commit/64fdd0c62b20bb07a4d8c1baf65b434e87c4dbef) Thanks [@philibea](https://github.com/philibea)! - Table component was not React 18 compatible during react 19 upgrade

## 1.82.1

### Patch Changes

- [#4615](https://github.com/scaleway/ultraviolet/pull/4615) [`39e17a6`](https://github.com/scaleway/ultraviolet/commit/39e17a6842f8bdf58f2500b5867937c96e0c4b68) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<List />` when disabled state the row doens't change color on hover

- [#4603](https://github.com/scaleway/ultraviolet/pull/4603) [`e94eaad`](https://github.com/scaleway/ultraviolet/commit/e94eaad0be3138679cee9743b13335c32f71d3a2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.1`.
  Updated dependency `@types/react-dom` to `19.0.2`.

- [#4609](https://github.com/scaleway/ultraviolet/pull/4609) [`e14c76d`](https://github.com/scaleway/ultraviolet/commit/e14c76d530ba5be85602c07e8351ecddbc07ac39) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.2`.

- [#4619](https://github.com/scaleway/ultraviolet/pull/4619) [`79a5b3a`](https://github.com/scaleway/ultraviolet/commit/79a5b3ad7a302a43c816081001f2f96c7556c33c) Thanks [@philibea](https://github.com/philibea)! - fix checkbox event on List & Table component

- Updated dependencies [[`e94eaad`](https://github.com/scaleway/ultraviolet/commit/e94eaad0be3138679cee9743b13335c32f71d3a2), [`e14c76d`](https://github.com/scaleway/ultraviolet/commit/e14c76d530ba5be85602c07e8351ecddbc07ac39)]:
  - @ultraviolet/icons@3.7.1

## 1.82.0

### Minor Changes

- [#4558](https://github.com/scaleway/ultraviolet/pull/4558) [`293aa2c`](https://github.com/scaleway/ultraviolet/commit/293aa2c041a5753394f2b4ae9e6e2f74b9bd10f5) Thanks [@matthprost](https://github.com/matthprost)! - Upgrade from react 18 to react 19

### Patch Changes

- [#4596](https://github.com/scaleway/ultraviolet/pull/4596) [`5b14b1a`](https://github.com/scaleway/ultraviolet/commit/5b14b1ab7ce9907f6fd1710233d7b2d38ced3101) Thanks [@matthprost](https://github.com/matthprost)! - Add export of `<Drawer />` component

- [#4588](https://github.com/scaleway/ultraviolet/pull/4588) [`3b3aaaa`](https://github.com/scaleway/ultraviolet/commit/3b3aaaa7c42af3c8df46ba4db57160007870484d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.17`.

- [#4584](https://github.com/scaleway/ultraviolet/pull/4584) [`4d8a5b5`](https://github.com/scaleway/ultraviolet/commit/4d8a5b51b80d669ae6d3753bf339d54e4444ec70) Thanks [@matthprost](https://github.com/matthprost)! - `<RadioGroup />`, `<SelectableCardGroup />`, `<CheckboxGroup />` and `<ToggleGroup />` to accept `ReactNode` as `legend` type

- Updated dependencies [[`293aa2c`](https://github.com/scaleway/ultraviolet/commit/293aa2c041a5753394f2b4ae9e6e2f74b9bd10f5), [`535010a`](https://github.com/scaleway/ultraviolet/commit/535010a74c527cf69a08b0e4267290a61aae97f5), [`3b3aaaa`](https://github.com/scaleway/ultraviolet/commit/3b3aaaa7c42af3c8df46ba4db57160007870484d)]:
  - @ultraviolet/icons@3.7.0

## 1.81.3

### Patch Changes

- [#4587](https://github.com/scaleway/ultraviolet/pull/4587) [`907b477`](https://github.com/scaleway/ultraviolet/commit/907b477b96459a1f59cf0bed929aefa3ce4d04d4) Thanks [@matthprost](https://github.com/matthprost)! - Hide scroll bar on `Table` and `List` if there is no overflow on x

- [#4594](https://github.com/scaleway/ultraviolet/pull/4594) [`bd99975`](https://github.com/scaleway/ultraviolet/commit/bd9997595a47919f7bbbaa52d7ac64f3072ddb19) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<List />` and `<Table />` to never take more than 100% of the container

## 1.81.2

### Patch Changes

- [#4585](https://github.com/scaleway/ultraviolet/pull/4585) [`2f660df`](https://github.com/scaleway/ultraviolet/commit/2f660df8cc7313fc13a6bcef3a66dfbb7d56a650) Thanks [@matthprost](https://github.com/matthprost)! - Make `<MenuV2 />` default portalTarget set to `document.body` to avoid scrolling in a list when menu is added

- [#4574](https://github.com/scaleway/ultraviolet/pull/4574) [`de622a2`](https://github.com/scaleway/ultraviolet/commit/de622a277da244ce265841f819d476cad9565ca9) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.15`.

- [#4583](https://github.com/scaleway/ultraviolet/pull/4583) [`54b5d89`](https://github.com/scaleway/ultraviolet/commit/54b5d897596dce5eaa2ad5357b3fda9879c53b80) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.16`.
  Updated dependency `@types/react-dom` to `18.3.5`.
- Updated dependencies [[`de622a2`](https://github.com/scaleway/ultraviolet/commit/de622a277da244ce265841f819d476cad9565ca9), [`54b5d89`](https://github.com/scaleway/ultraviolet/commit/54b5d897596dce5eaa2ad5357b3fda9879c53b80)]:
  - @ultraviolet/icons@3.6.3

## 1.81.1

### Patch Changes

- [#4577](https://github.com/scaleway/ultraviolet/pull/4577) [`456d104`](https://github.com/scaleway/ultraviolet/commit/456d104c77e5a261f191ee797b2e38e0a4bcad7a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Slider />` having issue when options are changing

## 1.81.0

### Minor Changes

- [#4509](https://github.com/scaleway/ultraviolet/pull/4509) [`ffb2c06`](https://github.com/scaleway/ultraviolet/commit/ffb2c06779d938abc7dde959adcd610ed5af65d7) Thanks [@lisalupi](https://github.com/lisalupi)! - `<ProgressBar />`: new props `max`, `prefix` and `suffix`

### Patch Changes

- [#4562](https://github.com/scaleway/ultraviolet/pull/4562) [`e08da2d`](https://github.com/scaleway/ultraviolet/commit/e08da2d06812061f8fff3e6b51cc95fa86383668) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-dom` to `18.3.3`.

- [#4568](https://github.com/scaleway/ultraviolet/pull/4568) [`3e42097`](https://github.com/scaleway/ultraviolet/commit/3e4209795e1915cc2069401115009128365a320b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.14.0`.
  Updated dependency `@emotion/styled` to `11.14.0`.
  Updated dependency `@emotion/cache` to `11.14.0`.

- [#4571](https://github.com/scaleway/ultraviolet/pull/4571) [`7633f1f`](https://github.com/scaleway/ultraviolet/commit/7633f1f9c8302b01b7be66116bdea62afe09fa07) Thanks [@matthprost](https://github.com/matthprost)! - Add a container around `<Table />` and `<List />` to manage the overflow

- Updated dependencies [[`e08da2d`](https://github.com/scaleway/ultraviolet/commit/e08da2d06812061f8fff3e6b51cc95fa86383668), [`3e42097`](https://github.com/scaleway/ultraviolet/commit/3e4209795e1915cc2069401115009128365a320b)]:
  - @ultraviolet/icons@3.6.2

## 1.80.0

### Minor Changes

- [#4535](https://github.com/scaleway/ultraviolet/pull/4535) [`612316c`](https://github.com/scaleway/ultraviolet/commit/612316c778cd82f852dacfa67a664d463611f23b) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring of `<List />` and `<Table />` components:

  ### List

  List used to be a bunch of `div` with different `role` to work like a table but it suffered from columns issues if not correctly set.
  It now uses a real `table` element and `thead` and `tbody` to correctly handle columns and rows.
  Each elements uses `display: table-*` to correctly handle columns and rows.
  The expandable is tricked, by adding a new `tr` on click and a `transform` to move it up under the clicked row.

  ### Table

  Table was correctly using `table` element but the columns were not correctly handled.
  It now uses `display: table-*` for each elements of the table.
  The expandable is an added `tr` under the clicked row.

### Patch Changes

- [#4553](https://github.com/scaleway/ultraviolet/pull/4553) [`2241ec1`](https://github.com/scaleway/ultraviolet/commit/2241ec1fb89d3e2f6c679b9b4a9af6733344e643) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.14`.
  Updated dependency `@types/react-dom` to `18.3.2`.
- Updated dependencies [[`2241ec1`](https://github.com/scaleway/ultraviolet/commit/2241ec1fb89d3e2f6c679b9b4a9af6733344e643)]:
  - @ultraviolet/icons@3.6.1

## 1.79.0

### Minor Changes

- [#4492](https://github.com/scaleway/ultraviolet/pull/4492) [`007019c`](https://github.com/scaleway/ultraviolet/commit/007019c37d6207953b12a0d10fcc1b4e61fc9710) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `<Drawer />`

### Patch Changes

- [#4504](https://github.com/scaleway/ultraviolet/pull/4504) [`5e39094`](https://github.com/scaleway/ultraviolet/commit/5e39094932462147c4302c12a8414333c73879e9) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `image` prop in `<Banner />` component. If the prop is a string, it will be displayed inside img tag so you can set a url to simply set the image.

- [#4544](https://github.com/scaleway/ultraviolet/pull/4544) [`ab0d6ea`](https://github.com/scaleway/ultraviolet/commit/ab0d6ea3de0566b9b5aaba130c92830d122c2e0f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.13`.

- Updated dependencies [[`19c1d19`](https://github.com/scaleway/ultraviolet/commit/19c1d194141c8f4b0714de17d8daf3e050533322), [`ab0d6ea`](https://github.com/scaleway/ultraviolet/commit/ab0d6ea3de0566b9b5aaba130c92830d122c2e0f)]:
  - @ultraviolet/icons@3.6.0

## 1.78.1

### Patch Changes

- [#4502](https://github.com/scaleway/ultraviolet/pull/4502) [`36f3b03`](https://github.com/scaleway/ultraviolet/commit/36f3b0359da76156cb69179b7b892aaace159b9c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<RadioGroup />`, `<ToggleGroup />`, `<CheckboxGroup />` and `<SelectableCardGroup />` to have children in error state when parent is in error

## 1.78.0

### Minor Changes

- [#4434](https://github.com/scaleway/ultraviolet/pull/4434) [`6ab8373`](https://github.com/scaleway/ultraviolet/commit/6ab837360da3fe85cac22b7780b3e771dd28ca34) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactoring of `<DateInput />` to remove dependency react-datepicker
  - `<Button />` : New props `onMouseEnter` and `onMouseLeave`

### Patch Changes

- [#4467](https://github.com/scaleway/ultraviolet/pull/4467) [`bbdad4a`](https://github.com/scaleway/ultraviolet/commit/bbdad4aeda1a790fdfeee4657c177e270335200e) Thanks [@lisalupi](https://github.com/lisalupi)! - `<List />` and `<Table />` : hold shift to multiselect

## 1.77.4

### Patch Changes

- [#4488](https://github.com/scaleway/ultraviolet/pull/4488) [`d876181`](https://github.com/scaleway/ultraviolet/commit/d8761814f5d54a6fe85c92d7089fa37aec14106f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` children color

- [#4499](https://github.com/scaleway/ultraviolet/pull/4499) [`72d5285`](https://github.com/scaleway/ultraviolet/commit/72d5285303755d0861a6b3dd8b2ed6c15ca8c102) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Snippet />` height

## 1.77.3

### Patch Changes

- Updated dependencies [[`84d8445`](https://github.com/scaleway/ultraviolet/commit/84d8445f79b109030ffeed92338e975ad51cbdd5)]:
  - @ultraviolet/icons@3.5.0

## 1.77.2

### Patch Changes

- [#4483](https://github.com/scaleway/ultraviolet/pull/4483) [`2c4f9af`](https://github.com/scaleway/ultraviolet/commit/2c4f9afc66e6cd9df2a1bceab51212eac62692ef) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.13.5`.
  Updated dependency `@emotion/styled` to `11.13.5`.
  Updated dependency `@emotion/serialize` to `1.3.3`.
  Updated dependency `@emotion/cache` to `11.13.5`.
- Updated dependencies [[`2c4f9af`](https://github.com/scaleway/ultraviolet/commit/2c4f9afc66e6cd9df2a1bceab51212eac62692ef)]:
  - @ultraviolet/icons@3.4.3

## 1.77.1

### Patch Changes

- [#4465](https://github.com/scaleway/ultraviolet/pull/4465) [`d4ccb3b`](https://github.com/scaleway/ultraviolet/commit/d4ccb3b802b4b93a412b65990c462e3ca92f364d) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Badge />` : change padding to 12px for medium badges

- [#4472](https://github.com/scaleway/ultraviolet/pull/4472) [`f4d106a`](https://github.com/scaleway/ultraviolet/commit/f4d106a4dd46e779a2570e70fdd77d8e04a12039) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Skeleton />` having wrong width and heigh due to px to rem migration

## 1.77.0

### Minor Changes

- [#4461](https://github.com/scaleway/ultraviolet/pull/4461) [`66a6680`](https://github.com/scaleway/ultraviolet/commit/66a6680101f5fad1b2fb67b40b9ed4e0f6c86b66) Thanks [@matthprost](https://github.com/matthprost)! - Add new prop `description` to group components: `<RadioGroup />`, `<CheckboxGroup />` and `<ToggleGroup />`.

- [#4459](https://github.com/scaleway/ultraviolet/pull/4459) [`4495f5c`](https://github.com/scaleway/ultraviolet/commit/4495f5c967ca277f2b7b05455ec083625e577a69) Thanks [@lisalupi](https://github.com/lisalupi)! - `<TextArea />` and `<TextAreaField />` : new prop `autoExpandMax`.

### Patch Changes

- [#4470](https://github.com/scaleway/ultraviolet/pull/4470) [`20ee243`](https://github.com/scaleway/ultraviolet/commit/20ee2435d3897000717338dcfbb4e38c922bcf0d) Thanks [@matthprost](https://github.com/matthprost)! - Hotfix: bullet not applying proper classNames

## 1.76.0

### Minor Changes

- [#4436](https://github.com/scaleway/ultraviolet/pull/4436) [`990a7de`](https://github.com/scaleway/ultraviolet/commit/990a7deebf4fc56c2bd1c04e89854ddccce1896f) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring of `Breadcrumbs`

### Patch Changes

- [#4444](https://github.com/scaleway/ultraviolet/pull/4444) [`9e8f93d`](https://github.com/scaleway/ultraviolet/commit/9e8f93dbcc117923a3cb4d48f5fb6c5aa6d9f8b6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.0`.
  Updated dependency `@babel/runtime` to `7.26.0`.
  Updated dependency `@babel/preset-env` to `7.26.0`.
  Updated dependency `@babel/preset-typescript` to `7.26.0`.

- [#4447](https://github.com/scaleway/ultraviolet/pull/4447) [`898728d`](https://github.com/scaleway/ultraviolet/commit/898728d2b99a1ad5e895c2bac2cd1dfac487181f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.8.3`.

- Updated dependencies [[`5326acf`](https://github.com/scaleway/ultraviolet/commit/5326acf8fafba39bca49ad8faf56c6d75869d557), [`9e8f93d`](https://github.com/scaleway/ultraviolet/commit/9e8f93dbcc117923a3cb4d48f5fb6c5aa6d9f8b6)]:
  - @ultraviolet/themes@1.15.0
  - @ultraviolet/icons@3.4.2

## 1.75.4

### Patch Changes

- [#4420](https://github.com/scaleway/ultraviolet/pull/4420) [`3c545cc`](https://github.com/scaleway/ultraviolet/commit/3c545cce96071ab905fca83b5cd8862aafe8c56f) Thanks [@fabienhebert](https://github.com/fabienhebert)! - `<SelectInputV2 />` fix selectValues calculation when multiselecting values

- [#4429](https://github.com/scaleway/ultraviolet/pull/4429) [`0bcfa7e`](https://github.com/scaleway/ultraviolet/commit/0bcfa7edf242717d9f2eee24b96c260bef334e91) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Meter />` to remove extra margin bottom

- [#4388](https://github.com/scaleway/ultraviolet/pull/4388) [`db86e50`](https://github.com/scaleway/ultraviolet/commit/db86e504e5e63fa5a498a6d8eff7c855bedee9f9) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.12`.

- [#4400](https://github.com/scaleway/ultraviolet/pull/4400) [`0aff4e5`](https://github.com/scaleway/ultraviolet/commit/0aff4e5ee074caa39cb799eeb8b5ccd9a970f962) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.8.2`.

- [#4398](https://github.com/scaleway/ultraviolet/pull/4398) [`6fc92ce`](https://github.com/scaleway/ultraviolet/commit/6fc92cebfe1720df0e5e9e6c6205aba9cbfdc107) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.9`.
  Updated dependency `@babel/runtime` to `7.25.9`.
  Updated dependency `@babel/eslint-parser` to `7.25.9`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.25.9`.
  Updated dependency `@babel/preset-env` to `7.25.9`.
  Updated dependency `@babel/preset-react` to `7.25.9`.
  Updated dependency `@babel/preset-typescript` to `7.25.9`.

- [#4394](https://github.com/scaleway/ultraviolet/pull/4394) [`9248ce4`](https://github.com/scaleway/ultraviolet/commit/9248ce40410df52711b8f1721faeb234d1daa760) Thanks [@matthprost](https://github.com/matthprost)! - Optimise svg files

- [#4423](https://github.com/scaleway/ultraviolet/pull/4423) [`02450b5`](https://github.com/scaleway/ultraviolet/commit/02450b59897e5c99ea4db08ba21fd08ec4f4f03f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` to align on the left when dropdown is bigger than the actual input

- [#4339](https://github.com/scaleway/ultraviolet/pull/4339) [`8b92813`](https://github.com/scaleway/ultraviolet/commit/8b928139ec5c99ae9e65ea1129705dbb1413268c) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />`:

  - Hide search when less than 6 items (even when `searchable = true`)
  - Clickable `footer` to close the dropdown
  - `clearable = false` by default now

- [#4392](https://github.com/scaleway/ultraviolet/pull/4392) [`04c120e`](https://github.com/scaleway/ultraviolet/commit/04c120ed8cce111e7085642eb327fa87d7d1dc6d) Thanks [@matthprost](https://github.com/matthprost)! - Auto increase the height of `<Card />` in a row context

- Updated dependencies [[`db86e50`](https://github.com/scaleway/ultraviolet/commit/db86e504e5e63fa5a498a6d8eff7c855bedee9f9), [`6fc92ce`](https://github.com/scaleway/ultraviolet/commit/6fc92cebfe1720df0e5e9e6c6205aba9cbfdc107), [`9248ce4`](https://github.com/scaleway/ultraviolet/commit/9248ce40410df52711b8f1721faeb234d1daa760)]:
  - @ultraviolet/icons@3.4.1

## 1.75.3

### Patch Changes

- [#4377](https://github.com/scaleway/ultraviolet/pull/4377) [`14756fb`](https://github.com/scaleway/ultraviolet/commit/14756fbe69fce22e1ddf8f181e9eef5348c4ca8a) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `<Slider />` not to have min or max width and take full width when it can

  - Fix `<Popup />` to have better arrow positioning

- [#4411](https://github.com/scaleway/ultraviolet/pull/4411) [`5e5d521`](https://github.com/scaleway/ultraviolet/commit/5e5d521255b6b99806f4aa0071ac3df6d1704c95) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - Fix `<SwitchButton />` not updating local value when value prop change

## 1.75.2

### Patch Changes

- [#4409](https://github.com/scaleway/ultraviolet/pull/4409) [`1d3d064`](https://github.com/scaleway/ultraviolet/commit/1d3d0640c097788e63915f567d2a54df586a34e9) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - Fix <TagList/> not adding ellipsis to single long tag

## 1.75.1

### Patch Changes

- [#4385](https://github.com/scaleway/ultraviolet/pull/4385) [`d203ee4`](https://github.com/scaleway/ultraviolet/commit/d203ee4840e6c588b476b7d2c3eb71d65669c673) Thanks [@vincentaudebert](https://github.com/vincentaudebert)! - Fix <TextInputV2 /> onKeyUp/Down not forwarded

## 1.75.0

### Minor Changes

- [#4307](https://github.com/scaleway/ultraviolet/pull/4307) [`82f8ecc`](https://github.com/scaleway/ultraviolet/commit/82f8eccb176a9377a7af07c1a6057366698a7d28) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `<Chip />`

## 1.74.0

### Minor Changes

- [#4372](https://github.com/scaleway/ultraviolet/pull/4372) [`8e77c03`](https://github.com/scaleway/ultraviolet/commit/8e77c03fdabffedae38fd6a135af914140f3027e) Thanks [@matthprost](https://github.com/matthprost)! - New prop `onCopy` on components `<CopyButton />` and `<Snippet />`

### Patch Changes

- [#4373](https://github.com/scaleway/ultraviolet/pull/4373) [`291882b`](https://github.com/scaleway/ultraviolet/commit/291882ba824d89f57168e8924d9e063f985de1c5) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` dropdown to be at least 320px of width

- [#4361](https://github.com/scaleway/ultraviolet/pull/4361) [`c289c5d`](https://github.com/scaleway/ultraviolet/commit/c289c5d4cfaa8eb587115b73ad119a079793826e) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `<TextArea />` and `<TextAreaField />`:
  - To have correct focus / active styles
  - Update prop `rows` to accept `auto` which will automatically adjust the height of the textarea based on its content
- Updated dependencies [[`7376580`](https://github.com/scaleway/ultraviolet/commit/73765805d94a08b881fe8fc33edff8f54bec9101)]:
  - @ultraviolet/icons@3.4.0

## 1.73.2

### Patch Changes

- [#4348](https://github.com/scaleway/ultraviolet/pull/4348) [`705a52d`](https://github.com/scaleway/ultraviolet/commit/705a52db708a91a66af83f5e1684bd9e00d09a72) Thanks [@matthprost](https://github.com/matthprost)! - - Fix inputs to use `ariaLabel` when no `label` is provided for errors: CheckboxField, RadioField, NumberInputFieldV2, SelectInputFieldV2, SliderField, TagInputField, TextAreaField, TextInputFieldV2, ToggleField
  - Fix `<Checkbox />`, `<Radio />` and `<SelectableCard />` to required either `label` or `aria-label`
  - Add `aria-label` on `<TagInput />` and `<Toggle />`

## 1.73.1

### Patch Changes

- [#4351](https://github.com/scaleway/ultraviolet/pull/4351) [`123daed`](https://github.com/scaleway/ultraviolet/commit/123daed9b671db0a1a12afe88e589bbe526c2009) Thanks [@matthprost](https://github.com/matthprost)! - Fix modal scroll bug

## 1.73.0

### Minor Changes

- [#4347](https://github.com/scaleway/ultraviolet/pull/4347) [`543f8e1`](https://github.com/scaleway/ultraviolet/commit/543f8e1d7bbae941434652ca5c8141d15cc77825) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - SelectInputV2 : Fix accessibility by changing disabled and data-selected for aria-disabled and aria-selected on div with option role.

- [#4338](https://github.com/scaleway/ultraviolet/pull/4338) [`a150eaa`](https://github.com/scaleway/ultraviolet/commit/a150eaa31523355521468fe412409d24630f9285) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - SelectInput : The component display the placeholder if no selected values are found in the options

### Patch Changes

- [#4346](https://github.com/scaleway/ultraviolet/pull/4346) [`7f996a2`](https://github.com/scaleway/ultraviolet/commit/7f996a20050cc044b6b64599b802949c700cbbae) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-toastify` to `10.0.6`.

- [#4345](https://github.com/scaleway/ultraviolet/pull/4345) [`ac4ea15`](https://github.com/scaleway/ultraviolet/commit/ac4ea155936387e3a75b68c44f3cd6934ceaa8d0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-dom` to `18.3.1`.

- [#4344](https://github.com/scaleway/ultraviolet/pull/4344) [`d8ed9af`](https://github.com/scaleway/ultraviolet/commit/d8ed9afe748371891745e619f1d91eb10cd23c8f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.8`.
  Updated dependency `@babel/eslint-parser` to `7.25.8`.
  Updated dependency `@babel/preset-env` to `7.25.8`.

- [#4330](https://github.com/scaleway/ultraviolet/pull/4330) [`7a47067`](https://github.com/scaleway/ultraviolet/commit/7a47067b94292fa23be258a85a3b48cca7c9cdba) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` regression: the gorup is being shown when empty, it shouldn't

- Updated dependencies [[`ac4ea15`](https://github.com/scaleway/ultraviolet/commit/ac4ea155936387e3a75b68c44f3cd6934ceaa8d0), [`d8ed9af`](https://github.com/scaleway/ultraviolet/commit/d8ed9afe748371891745e619f1d91eb10cd23c8f), [`9df8735`](https://github.com/scaleway/ultraviolet/commit/9df87355da947078dc607e411aafdd47c1fc82dc)]:
  - @ultraviolet/icons@3.3.0

## 1.72.3

### Patch Changes

- [#4334](https://github.com/scaleway/ultraviolet/pull/4334) [`501e353`](https://github.com/scaleway/ultraviolet/commit/501e3532f3dc8e0ddecd58e3d30d63c9776a524d) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Checkbox />`, `<Radio />` and `<Toggle />`, cannot click on label to check

## 1.72.2

### Patch Changes

- [#4252](https://github.com/scaleway/ultraviolet/pull/4252) [`e637068`](https://github.com/scaleway/ultraviolet/commit/e637068fe15b7c6d0792a1d05e1791d3e3b958ab) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Modal />` component to always display the one behind and fix flacky animation

- [#4282](https://github.com/scaleway/ultraviolet/pull/4282) [`a26d439`](https://github.com/scaleway/ultraviolet/commit/a26d439c494ad24dbb857196f4430e657838bd8e) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />`: auto scroll when the component is at the bottom of the page

- [#4262](https://github.com/scaleway/ultraviolet/pull/4262) [`3c0ac55`](https://github.com/scaleway/ultraviolet/commit/3c0ac55291796453035a1c1c3aa0e0f07e0afd8d) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Row />` and `<List.Row />`: new props, respectively `padding` and `paddingExpandable`, to define a custom padding

- [#4328](https://github.com/scaleway/ultraviolet/pull/4328) [`ed8f35a`](https://github.com/scaleway/ultraviolet/commit/ed8f35aae233ee795311030aab81936ce99d2585) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` when using illustration

- Updated dependencies [[`b1739f1`](https://github.com/scaleway/ultraviolet/commit/b1739f1238d347060f5da85f71971009ba6478f0)]:
  - @ultraviolet/icons@3.2.0

## 1.72.1

### Patch Changes

- [#4310](https://github.com/scaleway/ultraviolet/pull/4310) [`b69aa0e`](https://github.com/scaleway/ultraviolet/commit/b69aa0e1031f6f813427ef690f6fffdf015ae5c3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.11`.

- [#4308](https://github.com/scaleway/ultraviolet/pull/4308) [`b40d079`](https://github.com/scaleway/ultraviolet/commit/b40d0798711639d9cad2510aa32d34d6feb3a72f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.7`.
  Updated dependency `@babel/runtime` to `7.25.7`.
  Updated dependency `@babel/eslint-parser` to `7.25.7`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.25.7`.
  Updated dependency `@babel/preset-env` to `7.25.7`.
- Updated dependencies [[`b69aa0e`](https://github.com/scaleway/ultraviolet/commit/b69aa0e1031f6f813427ef690f6fffdf015ae5c3), [`b40d079`](https://github.com/scaleway/ultraviolet/commit/b40d0798711639d9cad2510aa32d34d6feb3a72f)]:
  - @ultraviolet/icons@3.1.4

## 1.72.0

### Minor Changes

- [#4273](https://github.com/scaleway/ultraviolet/pull/4273) [`04e9273`](https://github.com/scaleway/ultraviolet/commit/04e9273a02fd00f8334e03bee97e5408d61f163b) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring on `<Table />`:

  - Update of sort icons
  - Added `expandable` on `<Table />` and `<Table.Row />`
  - Refactoring of grid system
  - Added `align` and `sentiment` prop on `<Table.Cell />`

  Refactoring on `<List />`:

  - Update of sort icons

### Patch Changes

- [#4312](https://github.com/scaleway/ultraviolet/pull/4312) [`8300d7b`](https://github.com/scaleway/ultraviolet/commit/8300d7be46c0bb6ae4b7ea437f4c407a856307c3) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<TextArea />` to have either label or aria-label as required prop

- [#4292](https://github.com/scaleway/ultraviolet/pull/4292) [`f093375`](https://github.com/scaleway/ultraviolet/commit/f093375341d13bbfda03272b6f1554eb133ed2fc) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.10`.

- [#4238](https://github.com/scaleway/ultraviolet/pull/4238) [`875bbed`](https://github.com/scaleway/ultraviolet/commit/875bbed19ace07fc96178c861b8891a5f2700bfa) Thanks [@lisalupi](https://github.com/lisalupi)! - Form components: homogenize styling for all form components

- Updated dependencies [[`f093375`](https://github.com/scaleway/ultraviolet/commit/f093375341d13bbfda03272b6f1554eb133ed2fc), [`04e9273`](https://github.com/scaleway/ultraviolet/commit/04e9273a02fd00f8334e03bee97e5408d61f163b)]:
  - @ultraviolet/icons@3.1.3

## 1.71.1

### Patch Changes

- Updated dependencies [[`2ba5a34`](https://github.com/scaleway/ultraviolet/commit/2ba5a34a6c4eaf6237544d83d534dd1d8f629a85)]:
  - @ultraviolet/themes@1.14.2
  - @ultraviolet/icons@3.1.2

## 1.71.0

### Minor Changes

- [#4285](https://github.com/scaleway/ultraviolet/pull/4285) [`820c5d4`](https://github.com/scaleway/ultraviolet/commit/820c5d4876310c695709ae484086bae29216ed7c) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `onKeyDown` on component `<TextArea />`

### Patch Changes

- [#4291](https://github.com/scaleway/ultraviolet/pull/4291) [`9c722d7`](https://github.com/scaleway/ultraviolet/commit/9c722d7c003f49c05909e8166627e824f08e4fb2) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` resize issue in a modal

- [#4274](https://github.com/scaleway/ultraviolet/pull/4274) [`59df043`](https://github.com/scaleway/ultraviolet/commit/59df04313458c8e38ff434deacaf9131828fe998) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Link />` component not to be flexbox allowing the text to break

- [#4249](https://github.com/scaleway/ultraviolet/pull/4249) [`4e2e5b5`](https://github.com/scaleway/ultraviolet/commit/4e2e5b5218f098bac558651c0fbc004ceb33b4b9) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Snippet />`: new props `rows` (number) to define the number of rows to show and `noExpandable` (boolean) to control show/hide option

- [#4264](https://github.com/scaleway/ultraviolet/pull/4264) [`9a859d9`](https://github.com/scaleway/ultraviolet/commit/9a859d989cd8ef3a0c0befa8c326ab62707b749a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.8.1`.

- [#4250](https://github.com/scaleway/ultraviolet/pull/4250) [`84f639e`](https://github.com/scaleway/ultraviolet/commit/84f639e5de8822995b0f228943e21d981028265f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.8`.

- [#4268](https://github.com/scaleway/ultraviolet/pull/4268) [`37fbbca`](https://github.com/scaleway/ultraviolet/commit/37fbbca9d45ab6ed184cb7257f99c78f7ad4b225) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/serialize` to `1.3.2`.

- [#4277](https://github.com/scaleway/ultraviolet/pull/4277) [`012095b`](https://github.com/scaleway/ultraviolet/commit/012095b790f99c9f98022370fb2468c4c74bface) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.9`.

- Updated dependencies [[`b55a6e6`](https://github.com/scaleway/ultraviolet/commit/b55a6e68626dc2891fbd9cfaca918e423a09978c), [`84f639e`](https://github.com/scaleway/ultraviolet/commit/84f639e5de8822995b0f228943e21d981028265f), [`012095b`](https://github.com/scaleway/ultraviolet/commit/012095b790f99c9f98022370fb2468c4c74bface)]:
  - @ultraviolet/themes@1.14.1
  - @ultraviolet/icons@3.1.1

## 1.70.2

### Patch Changes

- [#4214](https://github.com/scaleway/ultraviolet/pull/4214) [`801e1d8`](https://github.com/scaleway/ultraviolet/commit/801e1d87d292235837045c2157d423f49cd7db5c) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectableCard />`: New props `productIcon` & `illustration` to add an icon/illustration on the right of the card

- [#4248](https://github.com/scaleway/ultraviolet/pull/4248) [`3c11e91`](https://github.com/scaleway/ultraviolet/commit/3c11e9184afd8ac1e2478c5d6a9056c4a85591b0) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />` bug fixes:
  - No empty group name
  - Dropdown positioning
  - LoadMore appear at the end of the dropdown - not at the end of every group
  - Truncation in dropdown and select bar
- Updated dependencies [[`7ff9bfb`](https://github.com/scaleway/ultraviolet/commit/7ff9bfbb4eed93daab03c36bdd927994e3bab5b1)]:
  - @ultraviolet/icons@3.1.0

## 1.70.1

### Patch Changes

- [#4205](https://github.com/scaleway/ultraviolet/pull/4205) [`408dade`](https://github.com/scaleway/ultraviolet/commit/408dade64b06994f2de8fdd3b999b6d966b57e2f) Thanks [@lisalupi](https://github.com/lisalupi)! - `<ProgressBar />`:

  - new prop `label`
  - new prop `showProgress`: show/hide percentage of progress
  - new prop `direction`: defines the position of the label & percentage

- [#4221](https://github.com/scaleway/ultraviolet/pull/4221) [`1152b39`](https://github.com/scaleway/ultraviolet/commit/1152b3945df7420d300d2c6f2976e57af520082a) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Card />`: new prop `subHeader`, deprecated prop `isActive` (use instead prop `active`) and various enhancements

- [#4239](https://github.com/scaleway/ultraviolet/pull/4239) [`92fc208`](https://github.com/scaleway/ultraviolet/commit/92fc208384c24126f4a5ea37d4c6f0248267205d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/random-name` to `5.1.1`.

- Updated dependencies [[`6fae267`](https://github.com/scaleway/ultraviolet/commit/6fae2676176e2a7479e3a07b2e80d9ae126bc019)]:
  - @ultraviolet/icons@3.0.2

## 1.70.0

### Minor Changes

- [#4201](https://github.com/scaleway/ultraviolet/pull/4201) [`84cab43`](https://github.com/scaleway/ultraviolet/commit/84cab43c806f1753ab052b0b622d075eb02dd1bd) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />`:

  - prop `searchText` is now mandatory if the label of an option is not a string
  - search will look for matches in the description if it is of type string
  - fixed stories

- [#4196](https://github.com/scaleway/ultraviolet/pull/4196) [`ee3c0b5`](https://github.com/scaleway/ultraviolet/commit/ee3c0b5a35758d3920506cdfaca2bc06409a96c6) Thanks [@matthprost](https://github.com/matthprost)! - New monochrome color into components:
  - New sentiment `black` and `white` in `<Button />` component
  - New sentiment `black` and `white` in `<Link />` component
  - New sentiment `black` and `white` in `<Text />` component
  - Update of `<Banner />` and `<GlobalAlert />` to use new monochrome colors

### Patch Changes

- [#4223](https://github.com/scaleway/ultraviolet/pull/4223) [`75a5de6`](https://github.com/scaleway/ultraviolet/commit/75a5de629394e862c69165aaf0fcae6c2191cdce) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Snippet />` component to respect carriage return

- [#4218](https://github.com/scaleway/ultraviolet/pull/4218) [`ac11dc5`](https://github.com/scaleway/ultraviolet/commit/ac11dc5f4a2934b8ae70051c9f09408c4bb9657c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Alert />` to take full width when available allowing usage of link

- Updated dependencies [[`ee3c0b5`](https://github.com/scaleway/ultraviolet/commit/ee3c0b5a35758d3920506cdfaca2bc06409a96c6)]:
  - @ultraviolet/themes@1.14.0
  - @ultraviolet/icons@3.0.1

## 1.69.0

### Minor Changes

- [#4172](https://github.com/scaleway/ultraviolet/pull/4172) [`919cbd0`](https://github.com/scaleway/ultraviolet/commit/919cbd0e1e3c7d5050b09fd63347d7c2f621152c) Thanks [@matthprost](https://github.com/matthprost)! - Improve accessibility focus for `<SelectableCard />` and `<SwitchButton />`

### Patch Changes

- Updated dependencies [[`5dcee9d`](https://github.com/scaleway/ultraviolet/commit/5dcee9def0850a6395bd2bcc69fe92143c8b53c4)]:
  - @ultraviolet/icons@3.0.0

## 1.68.1

### Patch Changes

- [#4142](https://github.com/scaleway/ultraviolet/pull/4142) [`6642dec`](https://github.com/scaleway/ultraviolet/commit/6642dec9fb12bf1812ab4c0c3acfaa6efdc3fd65) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.13.3`.
  Updated dependency `@emotion/serialize` to `1.3.1`.

- [#4176](https://github.com/scaleway/ultraviolet/pull/4176) [`eab247e`](https://github.com/scaleway/ultraviolet/commit/eab247efca5e2412de7b5343e9f72f70fba27bf9) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.5`.

- Updated dependencies [[`a0a3ec9`](https://github.com/scaleway/ultraviolet/commit/a0a3ec9c5ead1b0ce2d5b70444e36bcca5a3d0b8), [`49a5b17`](https://github.com/scaleway/ultraviolet/commit/49a5b179c1f934c6123689fa365c3f13fc30dcb8), [`0faa36e`](https://github.com/scaleway/ultraviolet/commit/0faa36e357a6c60fb1875114ef5a7ca5714e5297), [`6642dec`](https://github.com/scaleway/ultraviolet/commit/6642dec9fb12bf1812ab4c0c3acfaa6efdc3fd65), [`eab247e`](https://github.com/scaleway/ultraviolet/commit/eab247efca5e2412de7b5343e9f72f70fba27bf9)]:
  - @ultraviolet/icons@2.17.0
  - @ultraviolet/themes@1.13.0

## 1.68.0

### Minor Changes

- [#4124](https://github.com/scaleway/ultraviolet/pull/4124) [`bd3700e`](https://github.com/scaleway/ultraviolet/commit/bd3700e52ffc8c12962635185ad016681956d434) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - TabMenu: Fix the type of the button for the Menu disclosure

- [#4109](https://github.com/scaleway/ultraviolet/pull/4109) [`5da5215`](https://github.com/scaleway/ultraviolet/commit/5da52153666ec49345010ede3de476489c3bee36) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Slider: Component can be controllable or not

## 1.67.3

### Patch Changes

- [#4112](https://github.com/scaleway/ultraviolet/pull/4112) [`3de4a9c`](https://github.com/scaleway/ultraviolet/commit/3de4a9c635422e603843db2305d4358e9f4ff7d7) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(Modal): stop propagation on mousedown

- [#4113](https://github.com/scaleway/ultraviolet/pull/4113) [`f6a7aae`](https://github.com/scaleway/ultraviolet/commit/f6a7aaea5e56e1d377239a27875d7f83b855ab3d) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(RadioGroup): tooltip placement and disabled text color

## 1.67.2

### Patch Changes

- [#4098](https://github.com/scaleway/ultraviolet/pull/4098) [`b3b8fe5`](https://github.com/scaleway/ultraviolet/commit/b3b8fe544f097368e3477272697259d938ab85d5) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(SearchInput): only handle keyboard event

- [#4067](https://github.com/scaleway/ultraviolet/pull/4067) [`3bcfb9a`](https://github.com/scaleway/ultraviolet/commit/3bcfb9a57c82e0b733fc8eb635544a204ba21aa7) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Table: add documentation (story) to have checkbox inside column

- [#4106](https://github.com/scaleway/ultraviolet/pull/4106) [`18372bf`](https://github.com/scaleway/ultraviolet/commit/18372bfdd03691a14674507e1b6b83bf5970cc82) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.2`.
  Updated dependency `@babel/eslint-parser` to `7.25.1`.
  Updated dependency `@babel/preset-env` to `7.25.3`.
- Updated dependencies [[`18372bf`](https://github.com/scaleway/ultraviolet/commit/18372bfdd03691a14674507e1b6b83bf5970cc82)]:
  - @ultraviolet/icons@2.16.2

## 1.67.1

### Patch Changes

- Updated dependencies [[`f19fe83`](https://github.com/scaleway/ultraviolet/commit/f19fe83f78235813532ec199808d0e52567dcfc5)]:
  - @ultraviolet/icons@2.16.1

## 1.67.0

### Minor Changes

- [#4084](https://github.com/scaleway/ultraviolet/pull/4084) [`1d751f1`](https://github.com/scaleway/ultraviolet/commit/1d751f1a81482561541df983f51b651bd2623e38) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - feat: add `aria-label` to `SVG` for accessibility purpose

- [#4062](https://github.com/scaleway/ultraviolet/pull/4062) [`6012d08`](https://github.com/scaleway/ultraviolet/commit/6012d083018aefd7e9d8c44c0a2920dd4c6f2d7a) Thanks [@matthprost](https://github.com/matthprost)! - Update `<Alert />` title to have gap of `12px` instead of `4px`

- [#4074](https://github.com/scaleway/ultraviolet/pull/4074) [`c9e19a6`](https://github.com/scaleway/ultraviolet/commit/c9e19a62d20f33c5ba9321723e55357888d30994) Thanks [@matthprost](https://github.com/matthprost)! - Refactor all inputs to have `8px` padding in `small` size instead of `16px`

### Patch Changes

- [#4080](https://github.com/scaleway/ultraviolet/pull/4080) [`89583b1`](https://github.com/scaleway/ultraviolet/commit/89583b1a056acf5ad01fc122c38506ffe0a1adb3) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `<SelectInput />` helper color

  - Fix `<Slider />` helper color and options not to wrap

- [#4081](https://github.com/scaleway/ultraviolet/pull/4081) [`c3ec2dd`](https://github.com/scaleway/ultraviolet/commit/c3ec2dde045ed93bbc68b36d888364e243913ec0) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<DateInput />` colors when having both props `selectsRange` and `showMonthYearPicker`

- Updated dependencies [[`1d751f1`](https://github.com/scaleway/ultraviolet/commit/1d751f1a81482561541df983f51b651bd2623e38)]:
  - @ultraviolet/icons@2.16.0

## 1.66.0

### Minor Changes

- [#4063](https://github.com/scaleway/ultraviolet/pull/4063) [`cf076da`](https://github.com/scaleway/ultraviolet/commit/cf076da9abeea8bd91450a5f94ceb2921be30e2c) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `children` to `<CopyButton />` component to set a text into the button

### Patch Changes

- Updated dependencies [[`f2fd9ed`](https://github.com/scaleway/ultraviolet/commit/f2fd9ed168062e709ca68b6c456149a33eea3e22)]:
  - @ultraviolet/themes@1.12.4
  - @ultraviolet/icons@2.15.1

## 1.65.2

### Patch Changes

- [#4071](https://github.com/scaleway/ultraviolet/pull/4071) [`e506708`](https://github.com/scaleway/ultraviolet/commit/e5067086fea4385c430f2905034ee39d35d30300) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<DateInput />` type

## 1.65.1

### Patch Changes

- [#4064](https://github.com/scaleway/ultraviolet/pull/4064) [`2f7fa0d`](https://github.com/scaleway/ultraviolet/commit/2f7fa0d2c4066210754b3be8a05c0ccf59018776) Thanks [@matthprost](https://github.com/matthprost)! - Missing export of `<AvatarV2 />`

## 1.65.0

### Minor Changes

- [#4052](https://github.com/scaleway/ultraviolet/pull/4052) [`2f211e3`](https://github.com/scaleway/ultraviolet/commit/2f211e31a4f455df94425f190c807b75eee33a29) Thanks [@matthprost](https://github.com/matthprost)! - New component `<AvatarV2 />`. See [migration guide](https://storybook.ultraviolet.scaleway.com/?path=/docs/migrations-avatar-to-avatarv2--docs) to start migrating Avatar to AvatarV2 it before release of next major.

- [#4039](https://github.com/scaleway/ultraviolet/pull/4039) [`8588cde`](https://github.com/scaleway/ultraviolet/commit/8588cde71dd3a18b9593f3f367b7f5f5722ba0b0) Thanks [@matthprost](https://github.com/matthprost)! - New sub component `<Toast.Button />` and `<Toast.Link />` available to including them directly in a toaster

- [#4043](https://github.com/scaleway/ultraviolet/pull/4043) [`2f1b211`](https://github.com/scaleway/ultraviolet/commit/2f1b211af846a3f973b20166e041a1ce193d28dd) Thanks [@matthprost](https://github.com/matthprost)! - New sentiment `neutral` on `<Alert />`

- [#4040](https://github.com/scaleway/ultraviolet/pull/4040) [`e8ed01e`](https://github.com/scaleway/ultraviolet/commit/e8ed01e38dce351ef105e05180c7dead4cc97f96) Thanks [@matthprost](https://github.com/matthprost)! - New prop `showMonthYearPicker` in `<DateInput />` component

### Patch Changes

- [#4059](https://github.com/scaleway/ultraviolet/pull/4059) [`2f08079`](https://github.com/scaleway/ultraviolet/commit/2f08079fd4207eeffbafd1924ff1cd92af45cad5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.13.0`.
  Updated dependency `@emotion/styled` to `11.13.0`.
  Updated dependency `@emotion/babel-plugin` to `11.12.0`.
  Updated dependency `@emotion/cache` to `11.13.0`.
  Updated dependency `@emotion/eslint-plugin` to `11.12.0`.
  Updated dependency `@emotion/jest` to `11.13.0`.
  Updated dependency `@emotion/serialize` to `1.3.0`.
- Updated dependencies [[`2f08079`](https://github.com/scaleway/ultraviolet/commit/2f08079fd4207eeffbafd1924ff1cd92af45cad5), [`2f211e3`](https://github.com/scaleway/ultraviolet/commit/2f211e31a4f455df94425f190c807b75eee33a29), [`7e201dd`](https://github.com/scaleway/ultraviolet/commit/7e201dd8eb2969839c2d4227a4795d4bc1afd994)]:
  - @ultraviolet/icons@2.15.0

## 1.64.0

### Minor Changes

- [#4019](https://github.com/scaleway/ultraviolet/pull/4019) [`45e975e`](https://github.com/scaleway/ultraviolet/commit/45e975e3276c7f3164f2fd28d7563d3a170e0879) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - Refactoring of `<TagsList />` component to improve display of long text elements

## 1.63.0

### Minor Changes

- [#3985](https://github.com/scaleway/ultraviolet/pull/3985) [`6e576df`](https://github.com/scaleway/ultraviolet/commit/6e576df73521ede5b4ee1d714aeb8ed0bfe619ba) Thanks [@fabienhebert](https://github.com/fabienhebert)! - new component `ExpandableCard`

### Patch Changes

- [#4038](https://github.com/scaleway/ultraviolet/pull/4038) [`122b8b9`](https://github.com/scaleway/ultraviolet/commit/122b8b9aa2ea085e3e78b4888c1827a5d9e12de5) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Badge />` font weight on each sizes

- [#4032](https://github.com/scaleway/ultraviolet/pull/4032) [`e797379`](https://github.com/scaleway/ultraviolet/commit/e797379928682b812130a4092ed29d951faa3909) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring on `<Slider />`:
  - Prop `possibleValues` no longer exists and has been regroupped under `options` prop.
- Updated dependencies [[`02c7d1e`](https://github.com/scaleway/ultraviolet/commit/02c7d1e6d106e2748d0acefdc72bab61adcd1396)]:
  - @ultraviolet/icons@2.14.0

## 1.62.0

### Minor Changes

- [#4007](https://github.com/scaleway/ultraviolet/pull/4007) [`0d0833c`](https://github.com/scaleway/ultraviolet/commit/0d0833c0b370f2c5dab6c633b2e8ce83f89437c4) Thanks [@matthprost](https://github.com/matthprost)! - Introducing nested `<Modal />` to allow modals within modals with an animation

### Patch Changes

- [#4024](https://github.com/scaleway/ultraviolet/pull/4024) [`5d66ca7`](https://github.com/scaleway/ultraviolet/commit/5d66ca70bede877a080ba770fa532e4b6be9eb7a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.9`.
  Updated dependency `@babel/runtime` to `7.24.8`.
  Updated dependency `@babel/eslint-parser` to `7.24.8`.
  Updated dependency `@babel/preset-env` to `7.24.8`.

- [#4016](https://github.com/scaleway/ultraviolet/pull/4016) [`a0e0a95`](https://github.com/scaleway/ultraviolet/commit/a0e0a95a56f4882e6099e5d9a88264a27ff0c0c1) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Slider />` options positioning

- [#4026](https://github.com/scaleway/ultraviolet/pull/4026) [`f17223e`](https://github.com/scaleway/ultraviolet/commit/f17223e5d2f3033932ce37eb6bbfbc32ebd931db) Thanks [@fabienhebert](https://github.com/fabienhebert)! - `KeyValueField` : `readonly` props becomes `readOnly`

- Updated dependencies [[`5d66ca7`](https://github.com/scaleway/ultraviolet/commit/5d66ca70bede877a080ba770fa532e4b6be9eb7a)]:
  - @ultraviolet/icons@2.13.2

## 1.61.1

### Patch Changes

- [#3997](https://github.com/scaleway/ultraviolet/pull/3997) [`7ab5e04`](https://github.com/scaleway/ultraviolet/commit/7ab5e04105e8cc77104395d410f0ab9b1bd80950) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Slider />` component to avoid loop rendering while using `useEffect` so synchronise states

- [#3944](https://github.com/scaleway/ultraviolet/pull/3944) [`d571c5e`](https://github.com/scaleway/ultraviolet/commit/d571c5e07d3f90ac3a80d85e95b2e33b8479927f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<TextInputV2 />` prop `onChange` will now take function with event.

  ```tsx
  // Before
  onChange={value => value}

  // After
  onChangeValue={value => value}
  onChange={event => event.target.value}
  ```

  This will also fix `<DateInput />` issues such as editing the input value.

- [#4006](https://github.com/scaleway/ultraviolet/pull/4006) [`e011345`](https://github.com/scaleway/ultraviolet/commit/e0113459832a0c026164344fc7efd6a3ab490df7) Thanks [@philibea](https://github.com/philibea)! - Add turborepo

- Updated dependencies [[`e011345`](https://github.com/scaleway/ultraviolet/commit/e0113459832a0c026164344fc7efd6a3ab490df7)]:
  - @ultraviolet/icons@2.13.1
  - @ultraviolet/themes@1.12.2

## 1.61.0

### Minor Changes

- [#3983](https://github.com/scaleway/ultraviolet/pull/3983) [`200a99b`](https://github.com/scaleway/ultraviolet/commit/200a99b1a0731d09332d7496dcf8f8590e212f0a) Thanks [@matthprost](https://github.com/matthprost)! - On `<Expandable />` component, when prop `animationDuration` is set to 0 it will remove the animation of the component

### Patch Changes

- [#3995](https://github.com/scaleway/ultraviolet/pull/3995) [`14f8d15`](https://github.com/scaleway/ultraviolet/commit/14f8d15ce7a6e0fe4ae55aa4982d5357226bbf30) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(SearchInput): only handle keyboard event

- Updated dependencies [[`52a83f4`](https://github.com/scaleway/ultraviolet/commit/52a83f4da9c7025c3b04056e3209ee705aa92f53)]:
  - @ultraviolet/icons@2.13.0

## 1.60.0

### Minor Changes

- [#3920](https://github.com/scaleway/ultraviolet/pull/3920) [`f2fd03e`](https://github.com/scaleway/ultraviolet/commit/f2fd03e4b97bd36bb86d2242efbd9c3558f91bd8) Thanks [@matthprost](https://github.com/matthprost)! - Update elevation tokens on many components to have a better render in dark and darker themes

### Patch Changes

- [#3990](https://github.com/scaleway/ultraviolet/pull/3990) [`43324e7`](https://github.com/scaleway/ultraviolet/commit/43324e7abdf8d8877ad2f86ee90cd4ac0fc12b21) Thanks [@matthprost](https://github.com/matthprost)! - Add missing props on `<SearchInput />`

## 1.59.1

### Patch Changes

- [#3987](https://github.com/scaleway/ultraviolet/pull/3987) [`1cc1b37`](https://github.com/scaleway/ultraviolet/commit/1cc1b37cca324b3261053184a8ba86b5eb348156) Thanks [@matthprost](https://github.com/matthprost)! - Hotfix of `<Modal />` component not working properly with disclosure

## 1.59.0

### Minor Changes

- [#3968](https://github.com/scaleway/ultraviolet/pull/3968) [`fe71811`](https://github.com/scaleway/ultraviolet/commit/fe71811b58f7b4e28d861073d6a6a7dcb8807251) Thanks [@matthprost](https://github.com/matthprost)! - Improve `<SearchInput />`:
  - prop `shortcut` now takes an array of string in addition to boolean. This way you can define multiple shortcuts for the same input: `shortcut={['/', 's']` for example.
  - prop `children` is now optional. If not provided the popup will not be displayed and the input will behave like a regular input.
  - new prop `className`

### Patch Changes

- [#3984](https://github.com/scaleway/ultraviolet/pull/3984) [`e0eced0`](https://github.com/scaleway/ultraviolet/commit/e0eced00f577edb115e4175f297b7f1cff771113) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<List />` prop `expanded` not working properly

- [#3958](https://github.com/scaleway/ultraviolet/pull/3958) [`61f8b22`](https://github.com/scaleway/ultraviolet/commit/61f8b228f4e7c9ede64cd0f3326ad68dd7ce0f1a) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - feat(TextInputV2): add accessibility props

- [#3972](https://github.com/scaleway/ultraviolet/pull/3972) [`e0a9f60`](https://github.com/scaleway/ultraviolet/commit/e0a9f602cfa77843ed9789c1809ac3a06c8d5ecc) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Dialog />` component width to be 440px instead of 400px

## 1.58.0

### Minor Changes

- [#3963](https://github.com/scaleway/ultraviolet/pull/3963) [`16f59dd`](https://github.com/scaleway/ultraviolet/commit/16f59dde7261f341301f0da0bfe1ff37a167d94a) Thanks [@matthprost](https://github.com/matthprost)! - Add `expanded` prop on `<List.Row />` allowing the user to add an external button to expand or collapse rows

- [#3970](https://github.com/scaleway/ultraviolet/pull/3970) [`2b5efd1`](https://github.com/scaleway/ultraviolet/commit/2b5efd127c776174e7a092b9cac57fa49e8d9096) Thanks [@matthprost](https://github.com/matthprost)! - `<SelectableCard />` component to have label taking 100% width while using radio and checkbox

### Patch Changes

- [#3969](https://github.com/scaleway/ultraviolet/pull/3969) [`3630184`](https://github.com/scaleway/ultraviolet/commit/363018420c9bb43831ca4dda4f78d200908a5914) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Radio />`: fix selected disabled color

- [#3966](https://github.com/scaleway/ultraviolet/pull/3966) [`745c278`](https://github.com/scaleway/ultraviolet/commit/745c2781442663469f8d02caecdb6e496d408998) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(RadioGroup): add tooltip prop

- [#3967](https://github.com/scaleway/ultraviolet/pull/3967) [`3a97e74`](https://github.com/scaleway/ultraviolet/commit/3a97e744a0a955eae9dc0e9c831a98647e0be068) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Modal />`: when a modal is closed, focus should be on disclosure

- [#3918](https://github.com/scaleway/ultraviolet/pull/3918) [`8b1cc9e`](https://github.com/scaleway/ultraviolet/commit/8b1cc9e24ddb5b40ec0688254f2bd8526292f083) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `<Slider />`

- Updated dependencies [[`1ab8aca`](https://github.com/scaleway/ultraviolet/commit/1ab8acafb7edf5cd73373e22ad37359fb4da0ff4)]:
  - @ultraviolet/icons@2.12.18

## 1.57.1

### Patch Changes

- [#3928](https://github.com/scaleway/ultraviolet/pull/3928) [`7dee114`](https://github.com/scaleway/ultraviolet/commit/7dee114d97f7e7e0758eabc5e301ddc716ceea40) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Dialog />` title to have the correct neutral color

- [#3943](https://github.com/scaleway/ultraviolet/pull/3943) [`b1e5948`](https://github.com/scaleway/ultraviolet/commit/b1e59486cc336527871fc211faa8ea73c6b59fa6) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SelectInputV2 />`: New prop `tooltip`

## 1.57.0

### Minor Changes

- [#3927](https://github.com/scaleway/ultraviolet/pull/3927) [`561e001`](https://github.com/scaleway/ultraviolet/commit/561e00184740f825927d3bb6191cbd07c7d96c15) Thanks [@matthprost](https://github.com/matthprost)! - Design update and new features on `<SearchInput />`:
  - New design for the input with a simpler and cleaner look.
  - New prop `shortcut`, when set to true the input will be focusable with `Ctrl + K` on Windows and Linux and `Cmd + K` on macOS. It also add the shortcut into the input placeholder.

### Patch Changes

- [#3916](https://github.com/scaleway/ultraviolet/pull/3916) [`9d6a957`](https://github.com/scaleway/ultraviolet/commit/9d6a9571440c2af81ffd8f0feafae51a845df17f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<TextArea />` component to have correct error icon variant

- Updated dependencies [[`bc58d97`](https://github.com/scaleway/ultraviolet/commit/bc58d97033e2028b69ca5d284bef88fff16e50ba), [`10da1f6`](https://github.com/scaleway/ultraviolet/commit/10da1f6cebdc09d2f902e606f27f9797903660a4)]:
  - @ultraviolet/themes@1.12.1
  - @ultraviolet/icons@2.12.17

## 1.56.1

### Patch Changes

- [#3913](https://github.com/scaleway/ultraviolet/pull/3913) [`c41ded2`](https://github.com/scaleway/ultraviolet/commit/c41ded21c99e830cfcc55c65c6907897bd665493) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Stepper />`: fix animated style

- [#3892](https://github.com/scaleway/ultraviolet/pull/3892) [`02cc330`](https://github.com/scaleway/ultraviolet/commit/02cc330cd530b116d4dcde26df95be7559dfd95d) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` label color

- [#3908](https://github.com/scaleway/ultraviolet/pull/3908) [`e618b6e`](https://github.com/scaleway/ultraviolet/commit/e618b6e90801749be57cde6d40d27d6f9f12e790) Thanks [@lisalupi](https://github.com/lisalupi)! - `<TextInputV2 />` and `<TextInputFieldV2 />`: input width won't change with error

- [#3897](https://github.com/scaleway/ultraviolet/pull/3897) [`5ffacdc`](https://github.com/scaleway/ultraviolet/commit/5ffacdc76e3d6f331c59197c360d52714808d43e) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(SelectInputV2): add label to combobox

- [#3900](https://github.com/scaleway/ultraviolet/pull/3900) [`ed837ad`](https://github.com/scaleway/ultraviolet/commit/ed837ad86f6b0c9af9f5a8424e6bd9aa29d55450) Thanks [@lisalupi](https://github.com/lisalupi)! - `NumberInputV2`: if the value is out of the min / max range, the input will automatically be the min / max value on blur when controlled (fixed)
  `NumberInputV2`: now supports float

- [#3919](https://github.com/scaleway/ultraviolet/pull/3919) [`e1fda7e`](https://github.com/scaleway/ultraviolet/commit/e1fda7e8f64185ffe12c2aff94171c94842e056c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<List />` expand button to have correct sizing

- Updated dependencies [[`35292ba`](https://github.com/scaleway/ultraviolet/commit/35292baeffd460f35b03f23117dd7b741cd5f851)]:
  - @ultraviolet/icons@2.12.16

## 1.56.0

### Minor Changes

- [#3876](https://github.com/scaleway/ultraviolet/pull/3876) [`31c2ac6`](https://github.com/scaleway/ultraviolet/commit/31c2ac6d51490ef1627b51bf75c74e363dba2a8c) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Change where the data-testid is placed on the `SelectInputV2` to target it more easily in unit tests

- [#3885](https://github.com/scaleway/ultraviolet/pull/3885) [`885c605`](https://github.com/scaleway/ultraviolet/commit/885c605f91da60683916d9d1fd840b00248373b4) Thanks [@matthprost](https://github.com/matthprost)! - New component `<SearchInput />`

### Patch Changes

- [#3872](https://github.com/scaleway/ultraviolet/pull/3872) [`10e7a83`](https://github.com/scaleway/ultraviolet/commit/10e7a8352a229f49fe6f6782b09d031dc5dab399) Thanks [@lisalupi](https://github.com/lisalupi)! - `<NumberInputV2 />`: possibility to hide controls

- [#3803](https://github.com/scaleway/ultraviolet/pull/3803) [`74973df`](https://github.com/scaleway/ultraviolet/commit/74973df8d260be3ac4bf0e5d29a2614336c4a233) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.3`.

- [#3874](https://github.com/scaleway/ultraviolet/pull/3874) [`ce4dfdd`](https://github.com/scaleway/ultraviolet/commit/ce4dfdd88c7359e14a55499c5b7f7b67628cc8c4) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring: better typing on Avatar, TagInput and VerificationCode

- Updated dependencies [[`74973df`](https://github.com/scaleway/ultraviolet/commit/74973df8d260be3ac4bf0e5d29a2614336c4a233)]:
  - @ultraviolet/icons@2.12.15

## 1.55.3

### Patch Changes

- [#3463](https://github.com/scaleway/ultraviolet/pull/3463) [`a7c9266`](https://github.com/scaleway/ultraviolet/commit/a7c9266a832d75e8df515e0c7c561877acb763b0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `6.2.0`.
  Updated dependency `react-datepicker` to `6.9.0`.

- [#3869](https://github.com/scaleway/ultraviolet/pull/3869) [`7dd5063`](https://github.com/scaleway/ultraviolet/commit/7dd506377c10604d48f7f5144f3aa66ab676d16c) Thanks [@lisalupi](https://github.com/lisalupi)! - `MenuV2`: fix menu text alignment

## 1.55.2

### Patch Changes

- [#3858](https://github.com/scaleway/ultraviolet/pull/3858) [`36f2ef2`](https://github.com/scaleway/ultraviolet/commit/36f2ef2ee3fa9932536d1daea46ec691ec24e2b7) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Fix `<SelectInputV2 />` when description is in row mode it should be aligned on baseline instead of normal

- [#3850](https://github.com/scaleway/ultraviolet/pull/3850) [`8c4e45a`](https://github.com/scaleway/ultraviolet/commit/8c4e45aef4b181f344eaacdd2634e2ad9100e1b7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.7`.
  Updated dependency `@babel/runtime` to `7.24.7`.
  Updated dependency `@babel/eslint-parser` to `7.24.7`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.7`.
  Updated dependency `@babel/preset-env` to `7.24.7`.
  Updated dependency `@babel/preset-react` to `7.24.7`.
  Updated dependency `@babel/preset-typescript` to `7.24.7`.
- Updated dependencies [[`8c4e45a`](https://github.com/scaleway/ultraviolet/commit/8c4e45aef4b181f344eaacdd2634e2ad9100e1b7)]:
  - @ultraviolet/icons@2.12.14

## 1.55.1

### Patch Changes

- [#3846](https://github.com/scaleway/ultraviolet/pull/3846) [`61fd691`](https://github.com/scaleway/ultraviolet/commit/61fd691d458acb42e925e4916d1c7aceda6321a0) Thanks [@lisalupi](https://github.com/lisalupi)! - Stepper: Fix index to start at 0

- [#3827](https://github.com/scaleway/ultraviolet/pull/3827) [`39a5ee7`](https://github.com/scaleway/ultraviolet/commit/39a5ee76fcdc4e083b16fc8620bd666458bdda94) Thanks [@lisalupi](https://github.com/lisalupi)! - Updated migration information of `SelectInput`

- Updated dependencies [[`39a5ee7`](https://github.com/scaleway/ultraviolet/commit/39a5ee76fcdc4e083b16fc8620bd666458bdda94)]:
  - @ultraviolet/themes@1.12.0
  - @ultraviolet/icons@2.12.13

## 1.55.0

### Minor Changes

- [#3831](https://github.com/scaleway/ultraviolet/pull/3831) [`150f6ae`](https://github.com/scaleway/ultraviolet/commit/150f6aed639170f5b617ad7d11bcaf3571fa68c1) Thanks [@lisalupi](https://github.com/lisalupi)! - `<SwitchButton />`: new prop `size`

### Patch Changes

- [#3821](https://github.com/scaleway/ultraviolet/pull/3821) [`3500e6c`](https://github.com/scaleway/ultraviolet/commit/3500e6cd9d3724cd8cc50a9b8402aedcc92cbfdf) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.6`.
  Updated dependency `@babel/runtime` to `7.24.6`.
  Updated dependency `@babel/eslint-parser` to `7.24.6`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.6`.
  Updated dependency `@babel/preset-env` to `7.24.6`.
  Updated dependency `@babel/preset-react` to `7.24.6`.
  Updated dependency `@babel/preset-typescript` to `7.24.6`.
- Updated dependencies [[`3500e6c`](https://github.com/scaleway/ultraviolet/commit/3500e6cd9d3724cd8cc50a9b8402aedcc92cbfdf)]:
  - @ultraviolet/icons@2.12.12

## 1.54.0

### Minor Changes

- [#3781](https://github.com/scaleway/ultraviolet/pull/3781) [`90dbb2b`](https://github.com/scaleway/ultraviolet/commit/90dbb2b9bf925c5b158ac8f221cc51bd0104ca6d) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Stepper />` enhancement:

  - Added a new disabled state
  - Added possibility to navigate throughout the steps for the user by clicking on the bullets
  - Refactor code : use `<Stepper.Step />` for the steps instead of a list of children
  - New style overall

- [#3810](https://github.com/scaleway/ultraviolet/pull/3810) [`2c7da50`](https://github.com/scaleway/ultraviolet/commit/2c7da50c778527dd78a30c3cb33344175a21c8ef) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Allow description of an option to be a ReactNode instead of a string in `<SelectInputV2 />`

- [#3810](https://github.com/scaleway/ultraviolet/pull/3810) [`2c7da50`](https://github.com/scaleway/ultraviolet/commit/2c7da50c778527dd78a30c3cb33344175a21c8ef) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Add possibility to put a tooltip on an option in `<SelectInputV2 />`

### Patch Changes

- [#3819](https://github.com/scaleway/ultraviolet/pull/3819) [`0c77ec7`](https://github.com/scaleway/ultraviolet/commit/0c77ec72bcce69989392f91f952042ab575e13f7) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Links />`: added a new size 'xsmall'

- [#3817](https://github.com/scaleway/ultraviolet/pull/3817) [`a915531`](https://github.com/scaleway/ultraviolet/commit/a915531712a6c819ffcf3b98dc190e338c9317f8) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - Fix Card component style by removing flex

- Updated dependencies [[`2be2c09`](https://github.com/scaleway/ultraviolet/commit/2be2c0947ce477b092f6494659f8d88c4e3873ac)]:
  - @ultraviolet/icons@2.12.11

## 1.53.4

### Patch Changes

- Updated dependencies [[`c458956`](https://github.com/scaleway/ultraviolet/commit/c4589564872bc9fd3ddf95e327ae768226934274)]:
  - @ultraviolet/themes@1.11.0
  - @ultraviolet/icons@2.12.10

## 1.53.3

### Patch Changes

- [#3798](https://github.com/scaleway/ultraviolet/pull/3798) [`8a9bd89`](https://github.com/scaleway/ultraviolet/commit/8a9bd89a3331a14ff7540975a5212230c6dafa5a) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(SelectInputV2): handle change value

- [#3784](https://github.com/scaleway/ultraviolet/pull/3784) [`097ed2f`](https://github.com/scaleway/ultraviolet/commit/097ed2f7e087354fb892b101d438d1d8e546b1c6) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Card />`: add flex to have full height card aligned into a Row.

- [#3804](https://github.com/scaleway/ultraviolet/pull/3804) [`cf6de9a`](https://github.com/scaleway/ultraviolet/commit/cf6de9ac066449127d7a63412a00c24f52c6188d) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInput />` description and inline description spacings

- [#3805](https://github.com/scaleway/ultraviolet/pull/3805) [`e4c4cd9`](https://github.com/scaleway/ultraviolet/commit/e4c4cd99ff822909d0ac5d737aeca9de349c3a77) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` autoFocus issue on search bar

## 1.53.2

### Patch Changes

- [#3782](https://github.com/scaleway/ultraviolet/pull/3782) [`0ed8930`](https://github.com/scaleway/ultraviolet/commit/0ed8930aac665a8283de27bf327f579d0db7d6ca) Thanks [@matthprost](https://github.com/matthprost)! - Slight performance improvement on `<Expandable />` component to remove class generation when open and close

## 1.53.1

### Patch Changes

- [#3724](https://github.com/scaleway/ultraviolet/pull/3724) [`1ebb688`](https://github.com/scaleway/ultraviolet/commit/1ebb688d45b7c5085b2fe67cbdff74d9da7fa9ff) Thanks [@lisalupi](https://github.com/lisalupi)! - - New component `<UnitInput />`
  - Prop `disabled` optional for the options in the component `<SelectInputV2 />`

## 1.53.0

### Minor Changes

- [#3773](https://github.com/scaleway/ultraviolet/pull/3773) [`503aad3`](https://github.com/scaleway/ultraviolet/commit/503aad3931fcd2eb1b1e438c6d75e4934ba070cd) Thanks [@lisalupi](https://github.com/lisalupi)! - Font-size is now 14px instead of 16px for all small and medium inputs

### Patch Changes

- [#3775](https://github.com/scaleway/ultraviolet/pull/3775) [`8ecd1b0`](https://github.com/scaleway/ultraviolet/commit/8ecd1b0c8b0a8a112fbfe23397ae78830b978539) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Toggle />`: new prop "error"

## 1.52.0

### Minor Changes

- [#3745](https://github.com/scaleway/ultraviolet/pull/3745) [`b70242f`](https://github.com/scaleway/ultraviolet/commit/b70242f5b0d23a23698b7d270cfe839b694896fc) Thanks [@matthprost](https://github.com/matthprost)! - Update `<EmptyState />` component to have smaller text on small size

- [#3736](https://github.com/scaleway/ultraviolet/pull/3736) [`f275108`](https://github.com/scaleway/ultraviolet/commit/f275108351e5e53c3022fdd38d94fb36966f6d97) Thanks [@matthprost](https://github.com/matthprost)! - Update `<Popup />` margin between popup and button

### Patch Changes

- [#3763](https://github.com/scaleway/ultraviolet/pull/3763) [`46bcdda`](https://github.com/scaleway/ultraviolet/commit/46bcddab272a4c87a690ca7286f07d15789d1e63) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix `<Popup>` when mounting for the first time it can cause bad rerender and a scroll to the base position instead of the actual position of the popup

## 1.51.5

### Patch Changes

- [#3759](https://github.com/scaleway/ultraviolet/pull/3759) [`fd81844`](https://github.com/scaleway/ultraviolet/commit/fd81844fed1d73b58b11f831015690e022e1c511) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInputV2 />` component to avoid submiting when selecting an intem in the list

- Updated dependencies [[`948b2eb`](https://github.com/scaleway/ultraviolet/commit/948b2ebbacfac4bad12dec6814876730ed7ee477)]:
  - @ultraviolet/icons@2.12.9

## 1.51.4

### Patch Changes

- [#3744](https://github.com/scaleway/ultraviolet/pull/3744) [`3c1d30d`](https://github.com/scaleway/ultraviolet/commit/3c1d30d0b7926e1843b257c56b6c972449dbf0cd) Thanks [@philibea](https://github.com/philibea)! - add cjs export

- Updated dependencies [[`3c1d30d`](https://github.com/scaleway/ultraviolet/commit/3c1d30d0b7926e1843b257c56b6c972449dbf0cd)]:
  - @ultraviolet/themes@1.10.2
  - @ultraviolet/icons@2.12.8

## 1.51.3

### Patch Changes

- [#3742](https://github.com/scaleway/ultraviolet/pull/3742) [`0b2e92f`](https://github.com/scaleway/ultraviolet/commit/0b2e92f655b966e7d780593a27d7a291eb526f70) Thanks [@philibea](https://github.com/philibea)! - udpate build with @emotion/babel

- Updated dependencies [[`0b2e92f`](https://github.com/scaleway/ultraviolet/commit/0b2e92f655b966e7d780593a27d7a291eb526f70)]:
  - @ultraviolet/icons@2.12.7

## 1.51.2

### Patch Changes

- [#3731](https://github.com/scaleway/ultraviolet/pull/3731) [`362a534`](https://github.com/scaleway/ultraviolet/commit/362a5348a67b986907b65eec2606fd36fd21f621) Thanks [@philibea](https://github.com/philibea)! - migrate from vite config to rollup

- Updated dependencies [[`362a534`](https://github.com/scaleway/ultraviolet/commit/362a5348a67b986907b65eec2606fd36fd21f621)]:
  - @ultraviolet/themes@1.10.1
  - @ultraviolet/icons@2.12.6

## 1.51.1

### Patch Changes

- [#3730](https://github.com/scaleway/ultraviolet/pull/3730) [`0f133ea`](https://github.com/scaleway/ultraviolet/commit/0f133ea7032a555bdb9624e005db92d21b6a04b7) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `<Popup />` component to set initial position to 0 avoiding scroll on top when appearing and if an input has `autoFocus` inside
  - New prop `dynamicDomRendering` to define if the popup will be rendered dynamically in the DOM or if it should be rendered at first render. Default is `true` to keep the current retro compatibility.
  - Fix `<SelectInputV2 />` to remove timeout on search bar focus

## 1.51.0

### Minor Changes

- [#3727](https://github.com/scaleway/ultraviolet/pull/3727) [`9801140`](https://github.com/scaleway/ultraviolet/commit/980114070bef7258feaf4ab81627e14d7ac01e30) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Fix `<SelectInputV2/>` : Search bar autoFocus make the content scroll to top

## 1.50.0

### Minor Changes

- [#3725](https://github.com/scaleway/ultraviolet/pull/3725) [`4dd0d6e`](https://github.com/scaleway/ultraviolet/commit/4dd0d6e58e4a7666a3e729997c15246c297db02f) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - `<SelectInputV2 />` now support `onChange` and `value` types based on `multiselect` value

## 1.49.0

### Minor Changes

- [#3722](https://github.com/scaleway/ultraviolet/pull/3722) [`8ee1377`](https://github.com/scaleway/ultraviolet/commit/8ee13771ba89eddd1920248415e2aa276f9dbe17) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Fix <SelectInputV2 /> component to pass string or string[] for values instead of an option (more compliant to native select tag). component is now controllable

- [#3684](https://github.com/scaleway/ultraviolet/pull/3684) [`83d3902`](https://github.com/scaleway/ultraviolet/commit/83d39026cbdd66a3c8726b3c724059145f39aac3) Thanks [@fabienhebert](https://github.com/fabienhebert)! - New component: `Dialog`

### Patch Changes

- [#3705](https://github.com/scaleway/ultraviolet/pull/3705) [`a481e45`](https://github.com/scaleway/ultraviolet/commit/a481e45e8dfa343c7069490bf13bbf3f29bf8308) Thanks [@fabienhebert](https://github.com/fabienhebert)! - SelectableCardGroup: force item to follow grid

## 1.48.1

### Patch Changes

- [#3704](https://github.com/scaleway/ultraviolet/pull/3704) [`9a03d6d`](https://github.com/scaleway/ultraviolet/commit/9a03d6dcc43d8d20ea585e8d0976ed06931bd42f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<MenuV2 />` to have a debounce delay of 250ms instead of 350ms - it will make the menu appear faster on hover

## 1.48.0

### Minor Changes

- [#3651](https://github.com/scaleway/ultraviolet/pull/3651) [`dfa7a06`](https://github.com/scaleway/ultraviolet/commit/dfa7a06984f876da0574dcc7fbc1f4085c1f9f1c) Thanks [@lisalupi](https://github.com/lisalupi)! - - New component `<SelectInputV2 />` and deprecate `SelectInput`
  - New prop `onKeyDown` for `<TextInputV2/>`
  - New prop `tabIndex` from `<Checkbox />`

### Patch Changes

- [#3690](https://github.com/scaleway/ultraviolet/pull/3690) [`d3740c1`](https://github.com/scaleway/ultraviolet/commit/d3740c1d6d0b4fc965c7ba158779f99e597e4774) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.79`.

- Updated dependencies [[`d3740c1`](https://github.com/scaleway/ultraviolet/commit/d3740c1d6d0b4fc965c7ba158779f99e597e4774), [`2fd8d55`](https://github.com/scaleway/ultraviolet/commit/2fd8d551453d427f12bca8f4acbce0bfb5c65f81)]:
  - @ultraviolet/icons@2.12.5

## 1.47.1

### Patch Changes

- [#3673](https://github.com/scaleway/ultraviolet/pull/3673) [`59fb7f7`](https://github.com/scaleway/ultraviolet/commit/59fb7f7537d54066dda4249e89898a2921f642bd) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<MenuV2 />` max height to be 480px

## 1.47.0

### Minor Changes

- [#3631](https://github.com/scaleway/ultraviolet/pull/3631) [`30153dc`](https://github.com/scaleway/ultraviolet/commit/30153dc6ccf54e32281325386888263afd32bed9) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring of `<MenuV2 />` component with a new style and implement following props:

  - New prop `size`: `small`, `medium`, `large`
  - New prop `triggerMethod`: `click`, `hover` (default is `click`) it will trigger the menu to open on click or hover
  - On `Menu.Item`:
    - New variant `primary` on `sentiment` prop
    - New prop `active` to set the item as active visually
  - New sub component `<MenuV2.Group />` to group items together under a label

  Refactoring of `<Popup />` component:

  - Change of prop `hasDebounce` to `debounceDelay` => the prop will also add delay on the apparition of the popup

### Patch Changes

- [#3656](https://github.com/scaleway/ultraviolet/pull/3656) [`4e95be5`](https://github.com/scaleway/ultraviolet/commit/4e95be52f3bdb99c18d00d3db75756e608e7f72d) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Popup />` component to correctly set `portalTarget` prop

- [#3658](https://github.com/scaleway/ultraviolet/pull/3658) [`53fb87d`](https://github.com/scaleway/ultraviolet/commit/53fb87d6899c892fb9b7ee5482fc2165cff76a0b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.78`.
  Updated dependency `@types/react-dom` to `18.2.25`.
- Updated dependencies [[`53fb87d`](https://github.com/scaleway/ultraviolet/commit/53fb87d6899c892fb9b7ee5482fc2165cff76a0b), [`9c47acf`](https://github.com/scaleway/ultraviolet/commit/9c47acfcea1606811a65772090c70587e1852fcb)]:
  - @ultraviolet/icons@2.12.4

## 1.46.0

### Minor Changes

- [#3648](https://github.com/scaleway/ultraviolet/pull/3648) [`cd2d0f3`](https://github.com/scaleway/ultraviolet/commit/cd2d0f320a8bb17bc6026382fb607bd841fc7442) Thanks [@matthprost](https://github.com/matthprost)! - Add new sentiment `danger` to `<ProgressBar />` component

### Patch Changes

- [#3556](https://github.com/scaleway/ultraviolet/pull/3556) [`93055fa`](https://github.com/scaleway/ultraviolet/commit/93055faf1d36847b1aff4cfbbd030684790a9f75) Thanks [@lisalupi](https://github.com/lisalupi)! - New prop `onSelectedRows` for `List` to easily get the list of selected rows

- [#3628](https://github.com/scaleway/ultraviolet/pull/3628) [`ae54a12`](https://github.com/scaleway/ultraviolet/commit/ae54a12483b943ec8552500e23cd74786172320b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.4`.
  Updated dependency `@babel/runtime` to `7.24.4`.
  Updated dependency `@babel/preset-env` to `7.24.4`.
- Updated dependencies [[`ae54a12`](https://github.com/scaleway/ultraviolet/commit/ae54a12483b943ec8552500e23cd74786172320b)]:
  - @ultraviolet/icons@2.12.3

## 1.45.6

### Patch Changes

- Updated dependencies [[`f2f9002`](https://github.com/scaleway/ultraviolet/commit/f2f900288bfffd982869460d31647827bc383cd7)]:
  - @ultraviolet/icons@2.12.2

## 1.45.5

### Patch Changes

- [#3643](https://github.com/scaleway/ultraviolet/pull/3643) [`0db5ccf`](https://github.com/scaleway/ultraviolet/commit/0db5ccf6234e37e5d662115e6ba5189a9273f14b) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Stepper />` component to clean null or undefined children before rendering

## 1.45.4

### Patch Changes

- [#3636](https://github.com/scaleway/ultraviolet/pull/3636) [`3b850d3`](https://github.com/scaleway/ultraviolet/commit/3b850d3691acd1454d2986ea1ac9bd026dc42855) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-dom` to `18.2.24`.

- Updated dependencies [[`3b850d3`](https://github.com/scaleway/ultraviolet/commit/3b850d3691acd1454d2986ea1ac9bd026dc42855)]:
  - @ultraviolet/icons@2.12.1

## 1.45.3

### Patch Changes

- [#3629](https://github.com/scaleway/ultraviolet/pull/3629) [`9d909c0`](https://github.com/scaleway/ultraviolet/commit/9d909c06b8df81a7c48c0d059934d45123bbacb9) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(SelectInput): null child type error

## 1.45.2

### Patch Changes

- [#3626](https://github.com/scaleway/ultraviolet/pull/3626) [`823fcb0`](https://github.com/scaleway/ultraviolet/commit/823fcb0866c41a8e60a4bf3aca839e03e94707fe) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Expandable />` component to have correct `visibility` set in css

- [#3615](https://github.com/scaleway/ultraviolet/pull/3615) [`6c1edef`](https://github.com/scaleway/ultraviolet/commit/6c1edef32591c78469be0da9e6b212898a5ff4c5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.74`.
  Updated dependency `@types/react-dom` to `18.2.23`.

- [#3611](https://github.com/scaleway/ultraviolet/pull/3611) [`d05acf2`](https://github.com/scaleway/ultraviolet/commit/d05acf2f68f8b7d67b0b1cef8142d35a20af49f3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/use-media` to `3.0.0`.

- Updated dependencies [[`a71f616`](https://github.com/scaleway/ultraviolet/commit/a71f6169c53727a1bc0945c2c1d78f96949d4307), [`6c1edef`](https://github.com/scaleway/ultraviolet/commit/6c1edef32591c78469be0da9e6b212898a5ff4c5)]:
  - @ultraviolet/themes@1.10.0
  - @ultraviolet/icons@2.12.0

## 1.45.1

### Patch Changes

- [#3620](https://github.com/scaleway/ultraviolet/pull/3620) [`d63adc3`](https://github.com/scaleway/ultraviolet/commit/d63adc3bdd03f66c18980830774866c0aec7dc44) Thanks [@matthprost](https://github.com/matthprost)! - - Add `tabIndex` on `<Tooltip />` component to be able to disable tab when the children is already tabbable

  - Fix `<Expandable />` to add `visibility: hidden` when the component is collapsed to avoid tabulation on hidden elements

- [#3616](https://github.com/scaleway/ultraviolet/pull/3616) [`8f285a6`](https://github.com/scaleway/ultraviolet/commit/8f285a6460db5c442abf10f074dda8f3f543a271) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/styled` to `11.11.5`.
  Updated dependency `@emotion/serialize` to `1.1.4`.
- Updated dependencies [[`8f285a6`](https://github.com/scaleway/ultraviolet/commit/8f285a6460db5c442abf10f074dda8f3f543a271), [`2278fb1`](https://github.com/scaleway/ultraviolet/commit/2278fb1f3b59ef5989e4fbbbf098948cefa222b5)]:
  - @ultraviolet/icons@2.11.2

## 1.45.0

### Minor Changes

- [#3598](https://github.com/scaleway/ultraviolet/pull/3598) [`b8865ec`](https://github.com/scaleway/ultraviolet/commit/b8865ec1322f651128e45dd06fe8e2ec13d9038f) Thanks [@matthprost](https://github.com/matthprost)! - Change `<Separator />` color from `border` to `borderWeak`

- [#3610](https://github.com/scaleway/ultraviolet/pull/3610) [`9e08841`](https://github.com/scaleway/ultraviolet/commit/9e08841e134cc16b01ba7039c320c1422c993f37) Thanks [@matthprost](https://github.com/matthprost)! - Add `data-testid` and `aria-label` into `<Skeleton />` component

- [#3585](https://github.com/scaleway/ultraviolet/pull/3585) [`e8dca84`](https://github.com/scaleway/ultraviolet/commit/e8dca8467a1b458bbba0914c9697894367aa95da) Thanks [@matthprost](https://github.com/matthprost)! - Remove `react-flatten-children` and `@nivo/toolip`

### Patch Changes

- [#3599](https://github.com/scaleway/ultraviolet/pull/3599) [`713a4df`](https://github.com/scaleway/ultraviolet/commit/713a4df7a14d17dfa2602284c6e036e00cd37e3f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<CheckboxGroup.Checkbox />` to have prop `required`

- [#3588](https://github.com/scaleway/ultraviolet/pull/3588) [`8878dc5`](https://github.com/scaleway/ultraviolet/commit/8878dc5095786dca15735a9974696911d37a2c1c) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - fix(avatar): fix multiple space and trim for initials

- [#3608](https://github.com/scaleway/ultraviolet/pull/3608) [`0260206`](https://github.com/scaleway/ultraviolet/commit/0260206c4be4b11c059f0827cd758f4a3428c879) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/random-name` to `5.0.0`.

- [#3540](https://github.com/scaleway/ultraviolet/pull/3540) [`ad00080`](https://github.com/scaleway/ultraviolet/commit/ad0008075e57d73fda7e25d288d27420fe395ccf) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.64`.
  Updated dependency `@types/react-dom` to `18.2.21`.

- [#3600](https://github.com/scaleway/ultraviolet/pull/3600) [`6a7ec72`](https://github.com/scaleway/ultraviolet/commit/6a7ec7286ae10880695d2a9a7fc2a0fbaaf7cf68) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.3`.
  Updated dependency `@babel/preset-env` to `7.24.3`.

- [#3607](https://github.com/scaleway/ultraviolet/pull/3607) [`9e2215d`](https://github.com/scaleway/ultraviolet/commit/9e2215df8a6a31c11ec02e896a1fab6131917290) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCardGroup />` to hide required icon when there is no legend set

- Updated dependencies [[`ad00080`](https://github.com/scaleway/ultraviolet/commit/ad0008075e57d73fda7e25d288d27420fe395ccf), [`6a7ec72`](https://github.com/scaleway/ultraviolet/commit/6a7ec7286ae10880695d2a9a7fc2a0fbaaf7cf68)]:
  - @ultraviolet/icons@2.11.1

## 1.44.0

### Minor Changes

- [#3581](https://github.com/scaleway/ultraviolet/pull/3581) [`12415b1`](https://github.com/scaleway/ultraviolet/commit/12415b1f0d2c1511b5d50ac582bf9a96e5adcdd9) Thanks [@matthprost](https://github.com/matthprost)! - Add `animationDuration` on `<Expandable />` component

- [#3584](https://github.com/scaleway/ultraviolet/pull/3584) [`167f96d`](https://github.com/scaleway/ultraviolet/commit/167f96d5158b80a211160a98af4d74169e7b56be) Thanks [@matthprost](https://github.com/matthprost)! - Change `<Separator />` color to `borderWeak`

### Patch Changes

- [#3583](https://github.com/scaleway/ultraviolet/pull/3583) [`51b9ec5`](https://github.com/scaleway/ultraviolet/commit/51b9ec53f873d462d4a57f0819a014ab544f364f) Thanks [@fabienhebert](https://github.com/fabienhebert)! - NumberInput: no more blur autofix

- [#3576](https://github.com/scaleway/ultraviolet/pull/3576) [`e695eee`](https://github.com/scaleway/ultraviolet/commit/e695eee730766105ee238e4a85c1cc6f51b6f116) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.1`.
  Updated dependency `@babel/runtime` to `7.24.1`.
  Updated dependency `@babel/eslint-parser` to `7.24.1`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.1`.
  Updated dependency `@babel/preset-env` to `7.24.1`.
  Updated dependency `@babel/preset-react` to `7.24.1`.
  Updated dependency `@babel/preset-typescript` to `7.24.1`.
- Updated dependencies [[`e695eee`](https://github.com/scaleway/ultraviolet/commit/e695eee730766105ee238e4a85c1cc6f51b6f116), [`183850a`](https://github.com/scaleway/ultraviolet/commit/183850a36412b0017c17b6a18abd20c8f2b00d3f), [`7fcdff0`](https://github.com/scaleway/ultraviolet/commit/7fcdff0b010643aa0c1b432cc032e9410898d959)]:
  - @ultraviolet/icons@2.11.0

## 1.43.2

### Patch Changes

- [#3573](https://github.com/scaleway/ultraviolet/pull/3573) [`117fefa`](https://github.com/scaleway/ultraviolet/commit/117fefa3867c5ecfee6956a777abb44d2b8886b6) Thanks [@fabienhebert](https://github.com/fabienhebert)! - NumberInputV2: fix empty value behavior

- [#3565](https://github.com/scaleway/ultraviolet/pull/3565) [`751c706`](https://github.com/scaleway/ultraviolet/commit/751c7065c32da5dba62a0a6e0fb5fb1a5e79588b) Thanks [@johnrazeur](https://github.com/johnrazeur)! - fix(TextInputV2): lowercase read only data attribute

- [#3566](https://github.com/scaleway/ultraviolet/pull/3566) [`b1b6ea4`](https://github.com/scaleway/ultraviolet/commit/b1b6ea4793b978ccb76c93a9a3cdf23146c1f960) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-toastify` to `10.0.5`.

## 1.43.1

### Patch Changes

- [#3555](https://github.com/scaleway/ultraviolet/pull/3555) [`1d836df`](https://github.com/scaleway/ultraviolet/commit/1d836dfe2e1ae570ce9a7e43cab44c5da4d1a388) Thanks [@fabienhebert](https://github.com/fabienhebert)! - NumberInputV2: only supports `number` type

## 1.43.0

### Minor Changes

- [#3559](https://github.com/scaleway/ultraviolet/pull/3559) [`3fd16ed`](https://github.com/scaleway/ultraviolet/commit/3fd16edd65e34ac3e131b6bd88b01461900a90a8) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `iconVariant` to `<Button />` and `<Bullet />` component

## 1.42.0

### Minor Changes

- [#3558](https://github.com/scaleway/ultraviolet/pull/3558) [`e20299c`](https://github.com/scaleway/ultraviolet/commit/e20299c35aa7f9ef0c083b1c1769ee38ff82c9c9) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `popoverPlacement` on `<TagList />` component

- [#3553](https://github.com/scaleway/ultraviolet/pull/3553) [`3dce91d`](https://github.com/scaleway/ultraviolet/commit/3dce91d56f3707e0a93c07ca4ba7762ab7dbaf09) Thanks [@fabienhebert](https://github.com/fabienhebert)! - List: update expandable behavior

### Patch Changes

- Updated dependencies [[`d17262c`](https://github.com/scaleway/ultraviolet/commit/d17262c919f16420cbdb439de0e23b72a3c0877b)]:
  - @ultraviolet/icons@2.10.1

## 1.41.1

### Patch Changes

- [#3532](https://github.com/scaleway/ultraviolet/pull/3532) [`c3ed184`](https://github.com/scaleway/ultraviolet/commit/c3ed184233eee36d4f5717f8a14bd14eb5955d3d) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor of `Icon` with new icons and variant and update of every component accordingly

- Updated dependencies [[`c3ed184`](https://github.com/scaleway/ultraviolet/commit/c3ed184233eee36d4f5717f8a14bd14eb5955d3d)]:
  - @ultraviolet/icons@2.10.0

## 1.41.0

### Minor Changes

- [#3526](https://github.com/scaleway/ultraviolet/pull/3526) [`14e2121`](https://github.com/scaleway/ultraviolet/commit/14e212107630fc72ffee819a898554ea16cc6aaf) Thanks [@fabienhebert](https://github.com/fabienhebert)! - add `expandButton` prop `List` to enable dedicated column/cta to expand a row in addition of supporting click

### Patch Changes

- [#3524](https://github.com/scaleway/ultraviolet/pull/3524) [`3e9da5c`](https://github.com/scaleway/ultraviolet/commit/3e9da5c844e15cffbdd1f5958b732b15a88f1c41) Thanks [@lisalupi](https://github.com/lisalupi)! - New components `SelectableCardGroup`

- [#3533](https://github.com/scaleway/ultraviolet/pull/3533) [`71fa38d`](https://github.com/scaleway/ultraviolet/commit/71fa38d83bc230d18384ef5a14f8c5edba956a55) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `MenuV2.Item` border to be fullwidth

- [#3542](https://github.com/scaleway/ultraviolet/pull/3542) [`a8f1e7b`](https://github.com/scaleway/ultraviolet/commit/a8f1e7b84299dd9929e7c6529eef07db1ea47957) Thanks [@lisalupi](https://github.com/lisalupi)! - `Toaster` and `Notification` : new prop `containerId`

## 1.40.1

### Patch Changes

- [#3520](https://github.com/scaleway/ultraviolet/pull/3520) [`2ea29a7`](https://github.com/scaleway/ultraviolet/commit/2ea29a7e5903402655ab05cc5279701e5760e9cb) Thanks [@philibea](https://github.com/philibea)! - update text wrap on SwitchButton component

- [#3517](https://github.com/scaleway/ultraviolet/pull/3517) [`0012b7d`](https://github.com/scaleway/ultraviolet/commit/0012b7d2c46d2a3fdad0afd308ea4e5e96e71875) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.61`.

- [#3522](https://github.com/scaleway/ultraviolet/pull/3522) [`2914ba9`](https://github.com/scaleway/ultraviolet/commit/2914ba9db8eb3058b17a3105dae31a0312dbfde5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.0`.
  Updated dependency `@babel/runtime` to `7.24.0`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.0`.
  Updated dependency `@babel/preset-env` to `7.24.0`.

- [#3514](https://github.com/scaleway/ultraviolet/pull/3514) [`ebe4f91`](https://github.com/scaleway/ultraviolet/commit/ebe4f918405236317ac765fb886ca36fe1553b95) Thanks [@matthprost](https://github.com/matthprost)! - - Add prop `autoComplete` on `<TextInputV2 />` component
  - Fix spread prop `required` on input in `<TextInputV2 />` component
- Updated dependencies [[`0012b7d`](https://github.com/scaleway/ultraviolet/commit/0012b7d2c46d2a3fdad0afd308ea4e5e96e71875), [`2914ba9`](https://github.com/scaleway/ultraviolet/commit/2914ba9db8eb3058b17a3105dae31a0312dbfde5)]:
  - @ultraviolet/icons@2.9.3

## 1.40.0

### Minor Changes

- [#3508](https://github.com/scaleway/ultraviolet/pull/3508) [`116ec01`](https://github.com/scaleway/ultraviolet/commit/116ec01d909cb0851ed5aad571723aae1e83f0df) Thanks [@matthprost](https://github.com/matthprost)! - `Popup` becomes more reponsive the the screen size. It is now capable to re-adapt it's position in case of overflow.

### Patch Changes

- [#3507](https://github.com/scaleway/ultraviolet/pull/3507) [`085ed55`](https://github.com/scaleway/ultraviolet/commit/085ed550df75506b658fa52240e9e3fa4f951a91) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.11.4`.

- Updated dependencies [[`085ed55`](https://github.com/scaleway/ultraviolet/commit/085ed550df75506b658fa52240e9e3fa4f951a91)]:
  - @ultraviolet/icons@2.9.2

## 1.39.0

### Minor Changes

- [#3503](https://github.com/scaleway/ultraviolet/pull/3503) [`71e24c7`](https://github.com/scaleway/ultraviolet/commit/71e24c7cc505bd1bcc2ed91478890aef5f8d6be8) Thanks [@matthprost](https://github.com/matthprost)! - `<SelectableCard />` component now implement natively indentation for childrens and spacing between label and childrens

## 1.38.0

### Minor Changes

- [#3486](https://github.com/scaleway/ultraviolet/pull/3486) [`3303a8a`](https://github.com/scaleway/ultraviolet/commit/3303a8a8999ab0f022d7df4ede4e964e9bc36f7a) Thanks [@lisalupi](https://github.com/lisalupi)! - feat: new component `Notification`

### Patch Changes

- [#3434](https://github.com/scaleway/ultraviolet/pull/3434) [`3400941`](https://github.com/scaleway/ultraviolet/commit/3400941dceaf45bdf477a4010da0c2c3cc70a06a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.55`.
  Updated dependency `@types/react-dom` to `18.2.19`.
- Updated dependencies [[`3400941`](https://github.com/scaleway/ultraviolet/commit/3400941dceaf45bdf477a4010da0c2c3cc70a06a), [`7c2b62e`](https://github.com/scaleway/ultraviolet/commit/7c2b62e51000893792db78602d0e72c7d500f413)]:
  - @ultraviolet/icons@2.9.1

## 1.37.1

### Patch Changes

- [#3493](https://github.com/scaleway/ultraviolet/pull/3493) [`2fbc604`](https://github.com/scaleway/ultraviolet/commit/2fbc604581b72377210daae29c1c9985a548dcad) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Skeleton />` component to have `aria-busy`

- [#3490](https://github.com/scaleway/ultraviolet/pull/3490) [`4a3f3f4`](https://github.com/scaleway/ultraviolet/commit/4a3f3f4dd698a8b00baff37288b297907f568bdd) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` to remove gap when no label is set

- [#3487](https://github.com/scaleway/ultraviolet/pull/3487) [`1afcd50`](https://github.com/scaleway/ultraviolet/commit/1afcd50d7c39001572998fac1d36f86afcf1d1f9) Thanks [@matthprost](https://github.com/matthprost)! - Fix multiple inputs that has bug when required and not label set the required icon was staying:
  - `<NumberInputV2 />`
  - `<TagInput />`
  - `<TextArea />`
  - `<TextInputV2 />`
  - `<DateInput />`

## 1.37.0

### Minor Changes

- [#3470](https://github.com/scaleway/ultraviolet/pull/3470) [`656e0bb`](https://github.com/scaleway/ultraviolet/commit/656e0bb9a6eaeafae844a3fa2c13e242219161e9) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix: correct font size in `Toaster`

- [#3482](https://github.com/scaleway/ultraviolet/pull/3482) [`6042654`](https://github.com/scaleway/ultraviolet/commit/60426545837829008f5b0550fc1f22fa14e8e678) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<RadioGroup.Radio />` by setting name optional as the parent will git it

- [#3483](https://github.com/scaleway/ultraviolet/pull/3483) [`8d64a1a`](https://github.com/scaleway/ultraviolet/commit/8d64a1a66ecbc131a191ddf883884b86d368f42c) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<SelectableCard />` to take full width and have better spacings

### Patch Changes

- [#3479](https://github.com/scaleway/ultraviolet/pull/3479) [`398822d`](https://github.com/scaleway/ultraviolet/commit/398822d39f20a502d59e17f8ca375f3ad13a5e07) Thanks [@matthprost](https://github.com/matthprost)! - Fix default size to `large` for `TageInput` and `NumberInput`

- Updated dependencies [[`5615de4`](https://github.com/scaleway/ultraviolet/commit/5615de48ef162b32c3a43836bbad11c942afe55a), [`5615de4`](https://github.com/scaleway/ultraviolet/commit/5615de48ef162b32c3a43836bbad11c942afe55a)]:
  - @ultraviolet/themes@1.9.0
  - @ultraviolet/icons@2.9.0

## 1.36.0

### Minor Changes

- [#3455](https://github.com/scaleway/ultraviolet/pull/3455) [`0e2ad05`](https://github.com/scaleway/ultraviolet/commit/0e2ad053edcb8c9eed094543f2415e292525590d) Thanks [@matthprost](https://github.com/matthprost)! - Add new prop `highlightAnimation` on `<Table.Row />` for `<Table />` component

### Patch Changes

- [#3451](https://github.com/scaleway/ultraviolet/pull/3451) [`8be31ae`](https://github.com/scaleway/ultraviolet/commit/8be31ae84810bd2f8dd95ffc441c123c95a44b51) Thanks [@rachidBensaid](https://github.com/rachidBensaid)! - Add `flex-wrap` on component `<Breadcrumbs />`

## 1.35.0

### Minor Changes

- [#3467](https://github.com/scaleway/ultraviolet/pull/3467) [`c483fff`](https://github.com/scaleway/ultraviolet/commit/c483fffbbfefc55eb7c59ad4f863b7132674d006) Thanks [@matthprost](https://github.com/matthprost)! - Some fixes and new props on `<ToastContainer />` component:
  - added `className` and `autoClose` props
  - remove custom css in ToastContainer
  - fix ToastContainer width

## 1.34.0

### Minor Changes

- [#3441](https://github.com/scaleway/ultraviolet/pull/3441) [`e78475a`](https://github.com/scaleway/ultraviolet/commit/e78475a6f944c46701f4ffcbaceead1e54eff8e0) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor `<Toaster>` component to change sentiments colors

## 1.33.0

### Minor Changes

- [#3425](https://github.com/scaleway/ultraviolet/pull/3425) [`5c9df3e`](https://github.com/scaleway/ultraviolet/commit/5c9df3e3687395909b2183619a2e3314b2dcb13b) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Update `TagInput` and `TagInputField`

## 1.32.2

### Patch Changes

- [#3428](https://github.com/scaleway/ultraviolet/pull/3428) [`fbd0141`](https://github.com/scaleway/ultraviolet/commit/fbd014187a47bd2bfe8e22ad58af34bc70a0deb5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.19.6`.

## 1.32.1

### Patch Changes

- [#3415](https://github.com/scaleway/ultraviolet/pull/3415) [`14f6440`](https://github.com/scaleway/ultraviolet/commit/14f6440cb5c633dc36977faa131b74490f584f49) Thanks [@matthprost](https://github.com/matthprost)! - Fix `TextInputV2` to implement more props and remove `iconName`

## 1.32.0

### Minor Changes

- [#3391](https://github.com/scaleway/ultraviolet/pull/3391) [`ee2f4a5`](https://github.com/scaleway/ultraviolet/commit/ee2f4a593b4cb97de3a00170b8d129c0721f3fc7) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring of `DateInput`

### Patch Changes

- [#3417](https://github.com/scaleway/ultraviolet/pull/3417) [`80f6ed6`](https://github.com/scaleway/ultraviolet/commit/80f6ed6890504faa28885552b677bb13e0295da8) Thanks [@matthprost](https://github.com/matthprost)! - Fix `Breadcrumbs` to be vertically centered

- [#3413](https://github.com/scaleway/ultraviolet/pull/3413) [`75cfcfa`](https://github.com/scaleway/ultraviolet/commit/75cfcfa42c3d1ce662fa67552e59f01f6f944969) Thanks [@matthprost](https://github.com/matthprost)! - Fix `Radio` and `Checkbox` helper to have correct sentiment and variant

- [#3402](https://github.com/scaleway/ultraviolet/pull/3402) [`6d6e5e4`](https://github.com/scaleway/ultraviolet/commit/6d6e5e4629b15a2e1a0d547541ba3ef17aa5b0d3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.52`.

- [#3398](https://github.com/scaleway/ultraviolet/pull/3398) [`70fda53`](https://github.com/scaleway/ultraviolet/commit/70fda5326c64340ff6db11670bac8f10358ef3a6) Thanks [@matthprost](https://github.com/matthprost)! - Fix alignement on `MenuV2.Item` when using prop `tooltip`

- [#3419](https://github.com/scaleway/ultraviolet/pull/3419) [`6c134b4`](https://github.com/scaleway/ultraviolet/commit/6c134b4e213edcd53cf40f043096a04419f09212) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<TextInput />` component to spread required in the DOM

- Updated dependencies [[`6d6e5e4`](https://github.com/scaleway/ultraviolet/commit/6d6e5e4629b15a2e1a0d547541ba3ef17aa5b0d3)]:
  - @ultraviolet/icons@2.8.4

## 1.31.7

### Patch Changes

- [#3410](https://github.com/scaleway/ultraviolet/pull/3410) [`4662905`](https://github.com/scaleway/ultraviolet/commit/4662905fc479a97a1dacbede8fceeef917b4180f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `Toaster` to be closing on close button and when time elapsed

- [#3396](https://github.com/scaleway/ultraviolet/pull/3396) [`958ca76`](https://github.com/scaleway/ultraviolet/commit/958ca769620795b3232dfcfac2727ad9faefe240) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `SelectInput` required icon to stay with danger sentiment
  - Fix `TimeField` to pass `noTopLabel` prop

## 1.31.6

### Patch Changes

- [#3393](https://github.com/scaleway/ultraviolet/pull/3393) [`90785f5`](https://github.com/scaleway/ultraviolet/commit/90785f50f81f73f415bda96364a1294baf4a1dfb) Thanks [@matthprost](https://github.com/matthprost)! - Remove fully `Menu` from `Tabs` component

- [#3395](https://github.com/scaleway/ultraviolet/pull/3395) [`2c56a48`](https://github.com/scaleway/ultraviolet/commit/2c56a489cf94738a09bb4ae743f2b1952c6f98b2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-toastify` to `10.0.4`.

## 1.31.5

### Patch Changes

- [#3380](https://github.com/scaleway/ultraviolet/pull/3380) [`c1dfb10`](https://github.com/scaleway/ultraviolet/commit/c1dfb103f5b149e6b7483d0c271536fed59a7a09) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-toastify` to `10.0.0`.

- [#3378](https://github.com/scaleway/ultraviolet/pull/3378) [`a5eff2a`](https://github.com/scaleway/ultraviolet/commit/a5eff2ad4264dcf56c3b44b28d3f84acd0f849b6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.9`.
  Updated dependency `@babel/runtime` to `7.23.9`.
  Updated dependency `@babel/eslint-parser` to `7.23.9`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.9`.
  Updated dependency `@babel/preset-env` to `7.23.9`.

- [#3388](https://github.com/scaleway/ultraviolet/pull/3388) [`75a8424`](https://github.com/scaleway/ultraviolet/commit/75a8424b2da80cc9eb2083b9b7e6b0db7b496b1b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/random-name` to `4.0.3`.

- Updated dependencies [[`b492e36`](https://github.com/scaleway/ultraviolet/commit/b492e36ae2f540bed61458993b6baa8db2444a24), [`a5eff2a`](https://github.com/scaleway/ultraviolet/commit/a5eff2ad4264dcf56c3b44b28d3f84acd0f849b6)]:
  - @ultraviolet/themes@1.8.0
  - @ultraviolet/icons@2.8.3

## 1.31.4

### Patch Changes

- [#3382](https://github.com/scaleway/ultraviolet/pull/3382) [`c2e824e`](https://github.com/scaleway/ultraviolet/commit/c2e824efe7f875b9f917b946c2b4575f82132240) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<MenuV2 />` component to spread `onClick` of the disclosure

- [#3372](https://github.com/scaleway/ultraviolet/pull/3372) [`2ab58ef`](https://github.com/scaleway/ultraviolet/commit/2ab58efd55530673da91d50042c5eb014ebad446) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.48`.

- Updated dependencies [[`2ab58ef`](https://github.com/scaleway/ultraviolet/commit/2ab58efd55530673da91d50042c5eb014ebad446)]:
  - @ultraviolet/icons@2.8.2

## 1.31.3

### Patch Changes

- [#3367](https://github.com/scaleway/ultraviolet/pull/3367) [`740915c`](https://github.com/scaleway/ultraviolet/commit/740915c2111c49c77e10679bc48dc006f0c589b0) Thanks [@matthprost](https://github.com/matthprost)! - Fix `RadioGroup` and `CheckboxGroup` helpers to have the correct style

- [#3350](https://github.com/scaleway/ultraviolet/pull/3350) [`08fa9b5`](https://github.com/scaleway/ultraviolet/commit/08fa9b5a68ff52b68cd5ff68e8965be1ae29359f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `NumberInputV2`, `TextInputV2` and `TextArea` label to have `bodyStrong` instead of `bodySmallStrong` label

- [#3301](https://github.com/scaleway/ultraviolet/pull/3301) [`a13c6a7`](https://github.com/scaleway/ultraviolet/commit/a13c6a7ce3e712ef7788ac7219434b723a7983e0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.47`.

- [#3302](https://github.com/scaleway/ultraviolet/pull/3302) [`f59a7b2`](https://github.com/scaleway/ultraviolet/commit/f59a7b270dd90fd5ed5893abf0e8ae5afcd1a8d2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.19.5`.

- Updated dependencies [[`a13c6a7`](https://github.com/scaleway/ultraviolet/commit/a13c6a7ce3e712ef7788ac7219434b723a7983e0)]:
  - @ultraviolet/icons@2.8.1

## 1.31.2

### Patch Changes

- [#3354](https://github.com/scaleway/ultraviolet/pull/3354) [`4be9628`](https://github.com/scaleway/ultraviolet/commit/4be96287e93eb0990c8cd6e0f92a8ef364a3e66e) Thanks [@matthprost](https://github.com/matthprost)! - Revert `Modal` component, disclosure to use `createRef` instead of `useRef`

## 1.31.1

### Patch Changes

- [#3329](https://github.com/scaleway/ultraviolet/pull/3329) [`9db896c`](https://github.com/scaleway/ultraviolet/commit/9db896cda9486fab624c35c00b25e529aa5a0c6d) Thanks [@johnrazeur](https://github.com/johnrazeur)! - Fix input value for controlled fields

- [#3333](https://github.com/scaleway/ultraviolet/pull/3333) [`56ffe3b`](https://github.com/scaleway/ultraviolet/commit/56ffe3b110c384c3cda3daa7ceaeeb8fd4db799b) Thanks [@matthprost](https://github.com/matthprost)! - Remove usages of `createRef` to use only `useRef`

- Updated dependencies [[`55a302c`](https://github.com/scaleway/ultraviolet/commit/55a302c5690f656b36763a22659ea8da1f6c7b93)]:
  - @ultraviolet/icons@2.8.0

## 1.31.0

### Minor Changes

- [#3244](https://github.com/scaleway/ultraviolet/pull/3244) [`0c04608`](https://github.com/scaleway/ultraviolet/commit/0c04608dcc1dcc4b05e78ff184e24309d2964e72) Thanks [@matthprost](https://github.com/matthprost)! - New component `<NumberInputV2 />`

- [#3265](https://github.com/scaleway/ultraviolet/pull/3265) [`95b71bf`](https://github.com/scaleway/ultraviolet/commit/95b71bfe96218975c9dc986e2f2af8ff299746c6) Thanks [@fabienhebert](https://github.com/fabienhebert)! - new components: `TextInputV2` and `TextInputFieldV2`

### Patch Changes

- [#3315](https://github.com/scaleway/ultraviolet/pull/3315) [`718fc59`](https://github.com/scaleway/ultraviolet/commit/718fc5990087e262912af121c46c39a6b11fa6a2) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ProductIcon />` and `<CategoryIcon />` to have better svg import

- [#3317](https://github.com/scaleway/ultraviolet/pull/3317) [`5e4ee53`](https://github.com/scaleway/ultraviolet/commit/5e4ee53f33aaa4098e0cc55f00f182bdf6f68902) Thanks [@matthprost](https://github.com/matthprost)! - Remove useless props spread to dom for `<Stack />`

- Updated dependencies [[`718fc59`](https://github.com/scaleway/ultraviolet/commit/718fc5990087e262912af121c46c39a6b11fa6a2)]:
  - @ultraviolet/icons@2.7.7

## 1.30.0

### Minor Changes

- [#3295](https://github.com/scaleway/ultraviolet/pull/3295) [`f65dccd`](https://github.com/scaleway/ultraviolet/commit/f65dccdce849c7a07d5cc1baced0fdbc51495fad) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - New typography headings in tokens

### Patch Changes

- Updated dependencies [[`f65dccd`](https://github.com/scaleway/ultraviolet/commit/f65dccdce849c7a07d5cc1baced0fdbc51495fad)]:
  - @ultraviolet/themes@1.7.0
  - @ultraviolet/icons@2.7.6

## 1.29.4

### Patch Changes

- [#3310](https://github.com/scaleway/ultraviolet/pull/3310) [`db889ce`](https://github.com/scaleway/ultraviolet/commit/db889ce0dd85d8eac323b25c8ad6d4b01c070f2e) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Banner />` default illustration to be correctly imported

- Updated dependencies [[`ebcf407`](https://github.com/scaleway/ultraviolet/commit/ebcf4072752e27ea57fcabed9ec592c5a061aeba)]:
  - @ultraviolet/icons@2.7.5

## 1.29.3

### Patch Changes

- [#3290](https://github.com/scaleway/ultraviolet/pull/3290) [`9b57f52`](https://github.com/scaleway/ultraviolet/commit/9b57f523a5153448ea2dd0a6c227e1aead9a3365) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.7`.
  Updated dependency `@babel/runtime` to `7.23.7`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.7`.
  Updated dependency `@babel/preset-env` to `7.23.7`.

- [#3279](https://github.com/scaleway/ultraviolet/pull/3279) [`97f4a2c`](https://github.com/scaleway/ultraviolet/commit/97f4a2cb57bc1a9d27815c75214d05eb264afffc) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.25.0`.

- [#3267](https://github.com/scaleway/ultraviolet/pull/3267) [`149e900`](https://github.com/scaleway/ultraviolet/commit/149e9004ad0473e5f1aebcea7124bfec97313261) Thanks [@matthprost](https://github.com/matthprost)! - Fix Radio and Checkbox in SelectableCard not to take full witdh

- Updated dependencies [[`9b57f52`](https://github.com/scaleway/ultraviolet/commit/9b57f523a5153448ea2dd0a6c227e1aead9a3365)]:
  - @ultraviolet/icons@2.7.4

## 1.29.2

### Patch Changes

- [#3262](https://github.com/scaleway/ultraviolet/pull/3262) [`5214374`](https://github.com/scaleway/ultraviolet/commit/521437477757bcab2acbc0d0f92b855690763412) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<TextInput />` to change input padding according to unit size avoiding overflow

- [#3258](https://github.com/scaleway/ultraviolet/pull/3258) [`27ed74a`](https://github.com/scaleway/ultraviolet/commit/27ed74a32c1a3639f09161beb49c5ed3d2726bfa) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.19.4`.
  Updated dependency `react-datepicker` to `4.24.0`.
- Updated dependencies [[`35e84a0`](https://github.com/scaleway/ultraviolet/commit/35e84a0467d44acdef0c951c502ed2c2ef9c413a)]:
  - @ultraviolet/themes@1.6.0
  - @ultraviolet/icons@2.7.3

## 1.29.1

### Patch Changes

- [#3260](https://github.com/scaleway/ultraviolet/pull/3260) [`5029e35`](https://github.com/scaleway/ultraviolet/commit/5029e35e9f73f356d874feea160dc2c0b119e0fa) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` with type `radio`

- [#3196](https://github.com/scaleway/ultraviolet/pull/3196) [`ccbdcb9`](https://github.com/scaleway/ultraviolet/commit/ccbdcb90da3a245802431d6fc7f0ca851a63835f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.23.0`.

- [#3250](https://github.com/scaleway/ultraviolet/pull/3250) [`df48b95`](https://github.com/scaleway/ultraviolet/commit/df48b95184de08f799eb8c9bad76ee0ab11e7de4) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.45`.
  Updated dependency `@types/react-dom` to `18.2.18`.
- Updated dependencies [[`df48b95`](https://github.com/scaleway/ultraviolet/commit/df48b95184de08f799eb8c9bad76ee0ab11e7de4)]:
  - @ultraviolet/icons@2.7.2

## 1.29.0

### Minor Changes

- [#3199](https://github.com/scaleway/ultraviolet/pull/3199) [`10c677f`](https://github.com/scaleway/ultraviolet/commit/10c677fd6eb97ed250cf739c322b6a758c3bd3d1) Thanks [@fabienhebert](https://github.com/fabienhebert)! - new components: `TextArea` and `TextAreaField`

### Patch Changes

- [#3249](https://github.com/scaleway/ultraviolet/pull/3249) [`29e8c56`](https://github.com/scaleway/ultraviolet/commit/29e8c566927f7c4eef1ccab67431e3d1d1c97f25) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` with type `checkbox` to workproperly when clicking on both the checkbox and the container

- [#3242](https://github.com/scaleway/ultraviolet/pull/3242) [`c9c9881`](https://github.com/scaleway/ultraviolet/commit/c9c98818f4bf94b0bf7019f8cbfd0f541c580f47) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.6`.
  Updated dependency `@babel/runtime` to `7.23.6`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.6`.
  Updated dependency `@babel/preset-env` to `7.23.6`.
- Updated dependencies [[`c9c9881`](https://github.com/scaleway/ultraviolet/commit/c9c98818f4bf94b0bf7019f8cbfd0f541c580f47)]:
  - @ultraviolet/icons@2.7.1

## 1.28.0

### Minor Changes

- [#3220](https://github.com/scaleway/ultraviolet/pull/3220) [`d20f2da`](https://github.com/scaleway/ultraviolet/commit/d20f2da0d1d137218d8ebd32ea3828e595fd77d2) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectableCard />` label to take full width

- [#3218](https://github.com/scaleway/ultraviolet/pull/3218) [`4903820`](https://github.com/scaleway/ultraviolet/commit/49038205d25db2efc9dca152179407d6554b42ee) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Tabs />` component to use new `<MenuV2 />`

- [#3233](https://github.com/scaleway/ultraviolet/pull/3233) [`4900764`](https://github.com/scaleway/ultraviolet/commit/4900764288eaa13c16b5637e58cd0b2f5de4cce5) Thanks [@matthprost](https://github.com/matthprost)! - Add sizes `xsmall` and `medium` to `<CopyButton />` component

### Patch Changes

- [#3210](https://github.com/scaleway/ultraviolet/pull/3210) [`f077a9c`](https://github.com/scaleway/ultraviolet/commit/f077a9cdf14baf623e868e938185862472ad21b3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.43`.
  Updated dependency `@types/react-dom` to `18.2.17`.

- [#3227](https://github.com/scaleway/ultraviolet/pull/3227) [`d497ba6`](https://github.com/scaleway/ultraviolet/commit/d497ba6088496c64eaccd3e55644390f1e4b921d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.5`.
  Updated dependency `@babel/runtime` to `7.23.5`.
  Updated dependency `@babel/preset-env` to `7.23.5`.

- [#3228](https://github.com/scaleway/ultraviolet/pull/3228) [`eea834d`](https://github.com/scaleway/ultraviolet/commit/eea834d585874b915d06798358ae8cef784c99e5) Thanks [@matthprost](https://github.com/matthprost)! - Fix right position on popup

- Updated dependencies [[`de30e18`](https://github.com/scaleway/ultraviolet/commit/de30e18584897ff02f43473d1dd41ee1a9d40d44), [`f077a9c`](https://github.com/scaleway/ultraviolet/commit/f077a9cdf14baf623e868e938185862472ad21b3), [`d497ba6`](https://github.com/scaleway/ultraviolet/commit/d497ba6088496c64eaccd3e55644390f1e4b921d)]:
  - @ultraviolet/icons@2.7.0

## 1.27.3

### Patch Changes

- [#3221](https://github.com/scaleway/ultraviolet/pull/3221) [`997398d0`](https://github.com/scaleway/ultraviolet/commit/997398d0161da31e676973f4cb4519c7b35b2abd) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Checkbox />` to trigger on change when state changes

- Updated dependencies [[`99eda1d1`](https://github.com/scaleway/ultraviolet/commit/99eda1d14c3feababd1c7898e3dc55f17446ed6e)]:
  - @ultraviolet/icons@2.6.0

## 1.27.2

### Patch Changes

- [#3200](https://github.com/scaleway/ultraviolet/pull/3200) [`7f397e1c`](https://github.com/scaleway/ultraviolet/commit/7f397e1ca87a895f8b575d9748e632e5dd523e3b) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Text />` component with prop `oneLine` when on modals

## 1.27.1

### Patch Changes

- [#3198](https://github.com/scaleway/ultraviolet/pull/3198) [`2dd78d39`](https://github.com/scaleway/ultraviolet/commit/2dd78d394a2dea12011c3cf13b463308f0fc7e0b) Thanks [@johnrazeur](https://github.com/johnrazeur)! - Handle null value in NumberInput

## 1.27.0

### Minor Changes

- [#3189](https://github.com/scaleway/ultraviolet/pull/3189) [`a23bf3f8`](https://github.com/scaleway/ultraviolet/commit/a23bf3f842b2a4774e7fdd251df24352df296cf2) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - add size prop and update state for disable for verificationcode component

- [#3180](https://github.com/scaleway/ultraviolet/pull/3180) [`69134027`](https://github.com/scaleway/ultraviolet/commit/691340270327e319841da361ad4521b71e72555c) Thanks [@matthprost](https://github.com/matthprost)! - - New `<GlobalAlert />` component
  - New prop `variant` for `<Link />` component:
    - `variant="standalone"` (default): renders a standalone link without underline
    - `variant="inline"`: renders an inline link with underline
  - Added hover color from tokens for `<Link />` component

### Patch Changes

- [#3183](https://github.com/scaleway/ultraviolet/pull/3183) [`5b88fc85`](https://github.com/scaleway/ultraviolet/commit/5b88fc856e94740ff024b527f375f25ab5c340ca) Thanks [@matthprost](https://github.com/matthprost)! - Add a tooltip on `<Tag />` component when text is too long

- [#3187](https://github.com/scaleway/ultraviolet/pull/3187) [`65ce94d5`](https://github.com/scaleway/ultraviolet/commit/65ce94d54fc63792b5c40a7ea558b4779cee96d8) Thanks [@matthprost](https://github.com/matthprost)! - Component `<DateInput />` to use font tokens from theme

## 1.26.2

### Patch Changes

- [#3185](https://github.com/scaleway/ultraviolet/pull/3185) [`623fa42f`](https://github.com/scaleway/ultraviolet/commit/623fa42f7100f5a23cd65c1dc2b7dd127a22ae6c) Thanks [@matthprost](https://github.com/matthprost)! - Fix popup to add parent scroll on positioning

- [#3170](https://github.com/scaleway/ultraviolet/pull/3170) [`5fbf7727`](https://github.com/scaleway/ultraviolet/commit/5fbf772799c09fe34f0acbd7d7247fdde71a4f73) Thanks [@matthprost](https://github.com/matthprost)! - Remove carrousel top and bottom padding

## 1.26.1

### Patch Changes

- [#3172](https://github.com/scaleway/ultraviolet/pull/3172) [`931d1c7c`](https://github.com/scaleway/ultraviolet/commit/931d1c7c360ff84350e8d6fb7ffba5d2b9ce9963) Thanks [@matthprost](https://github.com/matthprost)! - Fix popup to attach correctly when parent is a table or sub component of the table

- [#3153](https://github.com/scaleway/ultraviolet/pull/3153) [`b14a53d9`](https://github.com/scaleway/ultraviolet/commit/b14a53d98c6ec5a777e282b7cc9b8b82afca4d1f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.8.0`.

## 1.26.0

### Minor Changes

- [#3142](https://github.com/scaleway/ultraviolet/pull/3142) [`b6e59335`](https://github.com/scaleway/ultraviolet/commit/b6e5933584b59d2f73d3880a7b02e89f0c94b116) Thanks [@matthprost](https://github.com/matthprost)! - New prop `initiallyExpanded` on `<Snippet />` component.

- [#3141](https://github.com/scaleway/ultraviolet/pull/3141) [`58b643bc`](https://github.com/scaleway/ultraviolet/commit/58b643bcbba996e7817c01703c0cf332a0d91d01) Thanks [@matthprost](https://github.com/matthprost)! - - Improved Popup (and so Popover, MenuV2 and Tooltip) to be attached to children instead of `document.body`

  - Added new prop `portalTarget` on Popup component to allow attaching to a specific element

- [#3131](https://github.com/scaleway/ultraviolet/pull/3131) [`4e76930d`](https://github.com/scaleway/ultraviolet/commit/4e76930d54833e033ef21357f0b444e82b3d08bb) Thanks [@matthprost](https://github.com/matthprost)! - Refactor global `JSX.Element` by importing it from `React`

### Patch Changes

- [#3147](https://github.com/scaleway/ultraviolet/pull/3147) [`73fd455d`](https://github.com/scaleway/ultraviolet/commit/73fd455d685f8104f6e48943bd2edc412c8f4774) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.3`.
  Updated dependency `@babel/eslint-parser` to `7.23.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.3`.
  Updated dependency `@babel/preset-env` to `7.23.3`.
  Updated dependency `@babel/preset-react` to `7.23.3`.
  Updated dependency `@babel/preset-typescript` to `7.23.3`.

- [#3143](https://github.com/scaleway/ultraviolet/pull/3143) [`e2e06f2f`](https://github.com/scaleway/ultraviolet/commit/e2e06f2f885cc24ce6bd4221596fd81c50176a84) Thanks [@philibea](https://github.com/philibea)! - update Tabs component to add subtitle props

- Updated dependencies [[`73fd455d`](https://github.com/scaleway/ultraviolet/commit/73fd455d685f8104f6e48943bd2edc412c8f4774)]:
  - @ultraviolet/icons@2.5.5

## 1.25.0

### Minor Changes

- [#3120](https://github.com/scaleway/ultraviolet/pull/3120) [`753555d5`](https://github.com/scaleway/ultraviolet/commit/753555d543976046b324d63e53b6567f4e8c0d5a) Thanks [@matthprost](https://github.com/matthprost)! - New gradient and rebranding of Banner

### Patch Changes

- [#3140](https://github.com/scaleway/ultraviolet/pull/3140) [`ce626d2f`](https://github.com/scaleway/ultraviolet/commit/ce626d2f0fc4c486068ce6998cb565bddc806fa4) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.19.3`.

- Updated dependencies [[`753555d5`](https://github.com/scaleway/ultraviolet/commit/753555d543976046b324d63e53b6567f4e8c0d5a)]:
  - @ultraviolet/themes@1.5.0
  - @ultraviolet/icons@2.5.4

## 1.24.2

### Patch Changes

- [#3125](https://github.com/scaleway/ultraviolet/pull/3125) [`3e7de2b2`](https://github.com/scaleway/ultraviolet/commit/3e7de2b2dd33577afd087af89379a3e214242721) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.37`.
  Updated dependency `@types/react-dom` to `18.2.15`.
- Updated dependencies [[`3e7de2b2`](https://github.com/scaleway/ultraviolet/commit/3e7de2b2dd33577afd087af89379a3e214242721)]:
  - @ultraviolet/icons@2.5.3

## 1.24.1

### Patch Changes

- [#3108](https://github.com/scaleway/ultraviolet/pull/3108) [`a6a3eb0f`](https://github.com/scaleway/ultraviolet/commit/a6a3eb0fe587dea72def3ad465de0929c3d1ab70) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.34`.

- Updated dependencies [[`499d65f6`](https://github.com/scaleway/ultraviolet/commit/499d65f6c0510bd37c34f8cc24476a601cfaa6f3), [`a6a3eb0f`](https://github.com/scaleway/ultraviolet/commit/a6a3eb0fe587dea72def3ad465de0929c3d1ab70)]:
  - @ultraviolet/themes@1.4.0
  - @ultraviolet/icons@2.5.2

## 1.24.0

### Minor Changes

- [#3085](https://github.com/scaleway/ultraviolet/pull/3085) [`eaf89db1`](https://github.com/scaleway/ultraviolet/commit/eaf89db14a8446af6409ed9a02d14ef26f93ca4b) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - update component stepper with prop size and labelposition

## 1.23.0

### Minor Changes

- [#3097](https://github.com/scaleway/ultraviolet/pull/3097) [`6349e4e3`](https://github.com/scaleway/ultraviolet/commit/6349e4e303153558d1a0535557013e25356341c1) Thanks [@matthprost](https://github.com/matthprost)! - Changes in component `<Popup />`:

  - Add new prop `maxHeight` and disable animation when set
  - Add new prop `disableAnimation` to disable animation on popup

  Changes in component `<MenuV2 />`:

  - Add new prop `maxHeight` and disable animation when set
  - Add new prop `maxWidth`

  Changes in component `<Popover />`:

  - Add new prop `maxHeight` and disable animation when set
  - Add new prop `maxWidth`

### Patch Changes

- [#3073](https://github.com/scaleway/ultraviolet/pull/3073) [`e46396a2`](https://github.com/scaleway/ultraviolet/commit/e46396a23c0f502fd9a84cd9a8d7515072f44000) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.19.1`.
  Updated dependency `react-datepicker` to `4.21.0`.

- [#3095](https://github.com/scaleway/ultraviolet/pull/3095) [`747fb898`](https://github.com/scaleway/ultraviolet/commit/747fb8981cffbd3eea341c4220d45b6b44a35f92) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.33`.

- Updated dependencies [[`747fb898`](https://github.com/scaleway/ultraviolet/commit/747fb8981cffbd3eea341c4220d45b6b44a35f92)]:
  - @ultraviolet/icons@2.5.1

## 1.22.0

### Minor Changes

- [#3049](https://github.com/scaleway/ultraviolet/pull/3049) [`625692c3`](https://github.com/scaleway/ultraviolet/commit/625692c3327b84df4cf378cad5501105eef676ce) Thanks [@matthprost](https://github.com/matthprost)! - Add new prop `closable` to `<Banner />` component that will hide close button when set to false

### Patch Changes

- [#3046](https://github.com/scaleway/ultraviolet/pull/3046) [`88ec8f4c`](https://github.com/scaleway/ultraviolet/commit/88ec8f4ca3692245e49278d66e26fe9b6dcd1030) Thanks [@matthprost](https://github.com/matthprost)! - Fix TagInput placeholder to take full width

- [#3080](https://github.com/scaleway/ultraviolet/pull/3080) [`fdc513b5`](https://github.com/scaleway/ultraviolet/commit/fdc513b557b1807cedf5f8554b81cc39d23f44d3) Thanks [@philibea](https://github.com/philibea)! - Add children function on MenuV2 with toggle props

- [#3081](https://github.com/scaleway/ultraviolet/pull/3081) [`70e36110`](https://github.com/scaleway/ultraviolet/commit/70e361106a80a4f4a1b59052306168893bd36d1b) Thanks [@matthprost](https://github.com/matthprost)! - Fix popover color inherited from parent

- Updated dependencies [[`e04315b0`](https://github.com/scaleway/ultraviolet/commit/e04315b000d414ca16c615805a059e3eb9487969)]:
  - @ultraviolet/icons@2.5.0

## 1.21.1

### Patch Changes

- [#3075](https://github.com/scaleway/ultraviolet/pull/3075) [`9d985b8f`](https://github.com/scaleway/ultraviolet/commit/9d985b8fd02dd283d6e1d5d6d4a5333a25212cf5) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Fix MenuV2 focus when opening it by replace `requestIdleCallback` by `setTimeout`

- [#3076](https://github.com/scaleway/ultraviolet/pull/3076) [`2e60a083`](https://github.com/scaleway/ultraviolet/commit/2e60a08383351c63789bb6692dc202d36abc8af9) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ HOTFIX: MenuV2 not correctly working when having a modal with inputs inside of it due to on click event handler

## 1.21.0

### Minor Changes

- [#3052](https://github.com/scaleway/ultraviolet/pull/3052) [`4e73b96d`](https://github.com/scaleway/ultraviolet/commit/4e73b96d747604b9631ba5d7a53e80e1627c75be) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix(ui): text input should pass min and max prop to input tag

- [#3071](https://github.com/scaleway/ultraviolet/pull/3071) [`5d7da681`](https://github.com/scaleway/ultraviolet/commit/5d7da681ea352a80b821fcf1be9d029e8c23869c) Thanks [@matthprost](https://github.com/matthprost)! - New font `Inter` added into the theme. The font will fall back on `Asap` until next major. In the meaning time you can start importing and using `Inter`.

### Patch Changes

- [#3057](https://github.com/scaleway/ultraviolet/pull/3057) [`74c4bc83`](https://github.com/scaleway/ultraviolet/commit/74c4bc8357ec4eaed1894305ce10e170b9df9f56) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.19.0`.

- [#3062](https://github.com/scaleway/ultraviolet/pull/3062) [`7d00e109`](https://github.com/scaleway/ultraviolet/commit/7d00e1095709ce2f4374a355b58a6edfea0fbac6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.31`.
  Updated dependency `@types/react-dom` to `18.2.14`.
- Updated dependencies [[`064d44f3`](https://github.com/scaleway/ultraviolet/commit/064d44f39f73d825a3300001b12afe26188c3fa8), [`7d00e109`](https://github.com/scaleway/ultraviolet/commit/7d00e1095709ce2f4374a355b58a6edfea0fbac6), [`5d7da681`](https://github.com/scaleway/ultraviolet/commit/5d7da681ea352a80b821fcf1be9d029e8c23869c)]:
  - @ultraviolet/themes@1.3.0
  - @ultraviolet/icons@2.4.2

## 1.20.2

### Patch Changes

- [#3050](https://github.com/scaleway/ultraviolet/pull/3050) [`cc8bce1d`](https://github.com/scaleway/ultraviolet/commit/cc8bce1d0fc7f326d19d6f55173f2cf386079d23) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ **Hotfix**: fixing the type error on `<DateField />` component not to required props `startDate`, `endDate`, `excludeDate` and `selectsRange`

## 1.20.1

### Patch Changes

- [#3047](https://github.com/scaleway/ultraviolet/pull/3047) [`3927d9ad`](https://github.com/scaleway/ultraviolet/commit/3927d9ada21b57c6e9ec78ef356f528d82275996) Thanks [@matthprost](https://github.com/matthprost)! - Fix Popup to re-compute position when screen resize or when `maxWidth` changes

## 1.20.0

### Minor Changes

- [#3011](https://github.com/scaleway/ultraviolet/pull/3011) [`dcb99f39`](https://github.com/scaleway/ultraviolet/commit/dcb99f39b00cbf50f9763d37b71d4b3b0fdbf248) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - Component `<DateInput />` updates:

  - Design update
  - New prop available `selectRange` allowing the user to select a range of dates

- [#2990](https://github.com/scaleway/ultraviolet/pull/2990) [`3b01b130`](https://github.com/scaleway/ultraviolet/commit/3b01b1308db15430074fe47a9f1b694a25ed171b) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Text />` component to remove default color neutral and make it unset allowing text to inherit it's color from parent

### Patch Changes

- [#3044](https://github.com/scaleway/ultraviolet/pull/3044) [`7364c97f`](https://github.com/scaleway/ultraviolet/commit/7364c97fb31435817ccf7e9bc78cd3ec9b2e6703) Thanks [@matthprost](https://github.com/matthprost)! - Fix Popup component to change event on mousedown and add ref into Popover component

- [#3043](https://github.com/scaleway/ultraviolet/pull/3043) [`b232bff4`](https://github.com/scaleway/ultraviolet/commit/b232bff46ba7248283a8ab8f38429269c058ca09) Thanks [@matthprost](https://github.com/matthprost)! - Fix Popover component text to be correct color

- [#3040](https://github.com/scaleway/ultraviolet/pull/3040) [`1c89ebde`](https://github.com/scaleway/ultraviolet/commit/1c89ebde6e57de5dfa574df098c0f7fc45f6cd0a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Banner />` to have content centered aligned

- [#3031](https://github.com/scaleway/ultraviolet/pull/3031) [`25617eca`](https://github.com/scaleway/ultraviolet/commit/25617ecaabd2eee8c93a2b18e5091b05ff1df669) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.28`.
  Updated dependency `@types/react-dom` to `18.2.13`.

- [#3025](https://github.com/scaleway/ultraviolet/pull/3025) [`1e4705d5`](https://github.com/scaleway/ultraviolet/commit/1e4705d5f36bae7474c941beee8fd60c06842671) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.15.2`.
  Updated dependency `react-datepicker` to `4.20.0`.

- [#3026](https://github.com/scaleway/ultraviolet/pull/3026) [`49a72ac9`](https://github.com/scaleway/ultraviolet/commit/49a72ac9c0ea61ee552e5b74251c8eeb8239126d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.2`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.2`.
  Updated dependency `@babel/preset-env` to `7.23.2`.
- Updated dependencies [[`25617eca`](https://github.com/scaleway/ultraviolet/commit/25617ecaabd2eee8c93a2b18e5091b05ff1df669), [`49a72ac9`](https://github.com/scaleway/ultraviolet/commit/49a72ac9c0ea61ee552e5b74251c8eeb8239126d)]:
  - @ultraviolet/icons@2.4.1

## 1.19.0

### Minor Changes

- [#3008](https://github.com/scaleway/ultraviolet/pull/3008) [`e9b4ade5`](https://github.com/scaleway/ultraviolet/commit/e9b4ade5cbcba41248b273daf87fc63b6a3e1d4a) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - feat(modal): replace function names by good ones

- [#3018](https://github.com/scaleway/ultraviolet/pull/3018) [`37998cf7`](https://github.com/scaleway/ultraviolet/commit/37998cf74de0ce658ee107443b4ecd327434700a) Thanks [@BABAK0T0](https://github.com/BABAK0T0)! - Moving Popup as an experimental component

- [#3019](https://github.com/scaleway/ultraviolet/pull/3019) [`a789422d`](https://github.com/scaleway/ultraviolet/commit/a789422dcc5103d9b3e3ea3865c9430d0f690e17) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<Carousel />`:
  - Remove border and other styles applied on `<Carousel.Item />` when hovering it.
  - Add new prop `width` to `<Carousel.Item />` to set the width of the item. Default is `240px`.
  - Use flexbox for structure instead of block elements.

### Patch Changes

- Updated dependencies [[`3814970a`](https://github.com/scaleway/ultraviolet/commit/3814970abeab4fcf3b4b5176733a93f3f7ed39fd), [`baef7307`](https://github.com/scaleway/ultraviolet/commit/baef73076888d2ddcc7092e0adffbc1642b42a83)]:
  - @ultraviolet/icons@2.4.0

## 1.18.1

### Patch Changes

- Updated dependencies [[`9010643b`](https://github.com/scaleway/ultraviolet/commit/9010643bd4f2c6b99df03717192829f5108c33fb)]:
  - @ultraviolet/icons@2.3.0

## 1.18.0

### Minor Changes

- [#2982](https://github.com/scaleway/ultraviolet/pull/2982) [`d21064ed`](https://github.com/scaleway/ultraviolet/commit/d21064ed415f85b8f3c2f1b452b386359279d2f5) Thanks [@matthprost](https://github.com/matthprost)! - Added new variant `square` to `<Skeleton />` component. This variant can be used to create specific shaped for your components.

- [#2988](https://github.com/scaleway/ultraviolet/pull/2988) [`86e7cf78`](https://github.com/scaleway/ultraviolet/commit/86e7cf78edf39e6e73e6c58f1ade7d53d05096d7) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix: event workflow with popup and modals

### Patch Changes

- [#2977](https://github.com/scaleway/ultraviolet/pull/2977) [`5e857dc7`](https://github.com/scaleway/ultraviolet/commit/5e857dc70a89b7317df183e44c89dbae38dd7637) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.23`.
  Updated dependency `@types/react-dom` to `18.2.8`.

- [#2981](https://github.com/scaleway/ultraviolet/pull/2981) [`8afda3ae`](https://github.com/scaleway/ultraviolet/commit/8afda3ae9c4cf52862703592d6bda7516c2e5e4d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.7.6`.

- [#3000](https://github.com/scaleway/ultraviolet/pull/3000) [`a79bf17a`](https://github.com/scaleway/ultraviolet/commit/a79bf17a09da901e7735e354a6d386721103098c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.25`.
  Updated dependency `@types/react-dom` to `18.2.10`.

- [#2976](https://github.com/scaleway/ultraviolet/pull/2976) [`1463f3e1`](https://github.com/scaleway/ultraviolet/commit/1463f3e18b3971cfbdac1bcda762952fc5b31bc1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.15.1`.

- [#2991](https://github.com/scaleway/ultraviolet/pull/2991) [`cede2a7e`](https://github.com/scaleway/ultraviolet/commit/cede2a7eea4b61a342efccff63a6b3bdc84b8148) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.7.7`.

- [#2980](https://github.com/scaleway/ultraviolet/pull/2980) [`0ea3aadf`](https://github.com/scaleway/ultraviolet/commit/0ea3aadf0e9f3176026f6e0c649b076a58eb66d2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.0`.
  Updated dependency `@babel/runtime` to `7.23.1`.
  Updated dependency `@babel/preset-typescript` to `7.23.0`.

- [#2989](https://github.com/scaleway/ultraviolet/pull/2989) [`90504ba8`](https://github.com/scaleway/ultraviolet/commit/90504ba8232e979dd57fb8c06df2464f32600f10) Thanks [@matthprost](https://github.com/matthprost)! - Fix checkbox size

- Updated dependencies [[`d21064ed`](https://github.com/scaleway/ultraviolet/commit/d21064ed415f85b8f3c2f1b452b386359279d2f5), [`5e857dc7`](https://github.com/scaleway/ultraviolet/commit/5e857dc70a89b7317df183e44c89dbae38dd7637), [`a79bf17a`](https://github.com/scaleway/ultraviolet/commit/a79bf17a09da901e7735e354a6d386721103098c), [`0ea3aadf`](https://github.com/scaleway/ultraviolet/commit/0ea3aadf0e9f3176026f6e0c649b076a58eb66d2)]:
  - @ultraviolet/icons@2.2.0

## 1.17.0

### Minor Changes

- [#2947](https://github.com/scaleway/ultraviolet/pull/2947) [`2ddc6d67`](https://github.com/scaleway/ultraviolet/commit/2ddc6d677ea74236bf09beb9e5aa8199f4bc1c8a) Thanks [@matthprost](https://github.com/matthprost)! - Added more props on Button component: `onMouseDown`, `onMouseUp` and `onMouseOut`

- [#2967](https://github.com/scaleway/ultraviolet/pull/2967) [`6cc71378`](https://github.com/scaleway/ultraviolet/commit/6cc713786357754e5a3b75ffcc8af13141dad4ab) Thanks [@matthprost](https://github.com/matthprost)! - Type `SCWUITheme` is now deprecated and should be replaced by `UltravioletUITheme`

### Patch Changes

- [#2951](https://github.com/scaleway/ultraviolet/pull/2951) [`80ff1ef9`](https://github.com/scaleway/ultraviolet/commit/80ff1ef9bc3179c0ddc68458bb235194a93eb511) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.22`.

- [#2948](https://github.com/scaleway/ultraviolet/pull/2948) [`24415945`](https://github.com/scaleway/ultraviolet/commit/24415945a1c15c33912a5d9c12b394b9b00ef21a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.20`.
  Updated dependency `@babel/preset-env` to `7.22.20`.

- [#2958](https://github.com/scaleway/ultraviolet/pull/2958) [`d4ca8063`](https://github.com/scaleway/ultraviolet/commit/d4ca8063a33df796756fc928ea6132050a1c2746) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.7.5`.

- Updated dependencies [[`80ff1ef9`](https://github.com/scaleway/ultraviolet/commit/80ff1ef9bc3179c0ddc68458bb235194a93eb511), [`24415945`](https://github.com/scaleway/ultraviolet/commit/24415945a1c15c33912a5d9c12b394b9b00ef21a), [`6cc71378`](https://github.com/scaleway/ultraviolet/commit/6cc713786357754e5a3b75ffcc8af13141dad4ab)]:
  - @ultraviolet/icons@2.1.0

## 1.16.0

### Minor Changes

- [#2918](https://github.com/scaleway/ultraviolet/pull/2918) [`372d9034`](https://github.com/scaleway/ultraviolet/commit/372d9034eeb08b85be52718ed35d95180e162067) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Add `MenuV2` and deprecate `Menu`

- [#2938](https://github.com/scaleway/ultraviolet/pull/2938) [`920388a8`](https://github.com/scaleway/ultraviolet/commit/920388a8bf97732067209e44017ff3e6c2ed0fb9) Thanks [@matthprost](https://github.com/matthprost)! - Refactoring of Notice component to be a span with smaller icon so it fits better in TextInput

### Patch Changes

- [#2939](https://github.com/scaleway/ultraviolet/pull/2939) [`881c505b`](https://github.com/scaleway/ultraviolet/commit/881c505bc364b84f262411c418245d41add3b41b) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Remove prop-types dependency

- [#2927](https://github.com/scaleway/ultraviolet/pull/2927) [`d393f2a8`](https://github.com/scaleway/ultraviolet/commit/d393f2a834a45123ee306e4ca76abcf19ae417c4) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.19`.

- [#2942](https://github.com/scaleway/ultraviolet/pull/2942) [`563f4941`](https://github.com/scaleway/ultraviolet/commit/563f49412bede7f0afcef7dca6c3f04fdf1fa830) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.18.0`.

- [#2935](https://github.com/scaleway/ultraviolet/pull/2935) [`4ffd63a7`](https://github.com/scaleway/ultraviolet/commit/4ffd63a7bc5312b7aa17ec716095e2afe8eab113) Thanks [@matthprost](https://github.com/matthprost)! - Correct and simplify bagde tags in the DOM

- Updated dependencies [[`d393f2a8`](https://github.com/scaleway/ultraviolet/commit/d393f2a834a45123ee306e4ca76abcf19ae417c4)]:
  - @ultraviolet/icons@2.0.3

## 1.15.1

### Patch Changes

- [#2936](https://github.com/scaleway/ultraviolet/pull/2936) [`455bd804`](https://github.com/scaleway/ultraviolet/commit/455bd8040a666eb4a31d0b58e0b3a3a6288e584f) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Fix modal with disclosure function

## 1.15.0

### Minor Changes

- [#2930](https://github.com/scaleway/ultraviolet/pull/2930) [`94e6f54e`](https://github.com/scaleway/ultraviolet/commit/94e6f54e30ef8bbaab64afc99fd6c412a696ef15) Thanks [@matthprost](https://github.com/matthprost)! - Improve accessibility of Popover component

### Patch Changes

- [#2933](https://github.com/scaleway/ultraviolet/pull/2933) [`7ff34db5`](https://github.com/scaleway/ultraviolet/commit/7ff34db5df7ff2c2703bd65cb459c5b9fb549d7e) Thanks [@matthprost](https://github.com/matthprost)! - Fix Tooltip to remove pointer events on tooltip itself

## 1.14.0

### Minor Changes

- [#2920](https://github.com/scaleway/ultraviolet/pull/2920) [`51f5b001`](https://github.com/scaleway/ultraviolet/commit/51f5b001ac438659a528e0f297aad4b7f89a8a6a) Thanks [@matthprost](https://github.com/matthprost)! - Tooltip and Popover will now close when ESC keys is pressed

### Patch Changes

- [#2915](https://github.com/scaleway/ultraviolet/pull/2915) [`3c382cc2`](https://github.com/scaleway/ultraviolet/commit/3c382cc29278ab59e9cc03708c19ff8824a99e2f) Thanks [@matthprost](https://github.com/matthprost)! - Fixed tooltip to break word automatically and correctly when content is too long

- [#2919](https://github.com/scaleway/ultraviolet/pull/2919) [`2fe8656f`](https://github.com/scaleway/ultraviolet/commit/2fe8656ff7f33c95a4db38fc9d97dc470e4e20f8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.17.0`.

- [#2922](https://github.com/scaleway/ultraviolet/pull/2922) [`5d275d9a`](https://github.com/scaleway/ultraviolet/commit/5d275d9afcafcc824a21405036aa86bc85dc16c8) Thanks [@matthprost](https://github.com/matthprost)! - Fixed `<Badge />` to be a span instead of a div

## 1.13.1

### Patch Changes

- [#2901](https://github.com/scaleway/ultraviolet/pull/2901) [`e2a8e447`](https://github.com/scaleway/ultraviolet/commit/e2a8e447566716fdeaf4b45dcc527e4d19cf4841) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.17`.

- Updated dependencies [[`e2a8e447`](https://github.com/scaleway/ultraviolet/commit/e2a8e447566716fdeaf4b45dcc527e4d19cf4841)]:
  - @ultraviolet/icons@2.0.2

## 1.13.0

### Minor Changes

- [#2906](https://github.com/scaleway/ultraviolet/pull/2906) [`1bcf066a`](https://github.com/scaleway/ultraviolet/commit/1bcf066aec194bd338c7d616f3398d18c0a23539) Thanks [@matthprost](https://github.com/matthprost)! - Added new props into `Stack` component: `width` and `flex`

## 1.12.0

### Minor Changes

- [#2890](https://github.com/scaleway/ultraviolet/pull/2890) [`cc6440d5`](https://github.com/scaleway/ultraviolet/commit/cc6440d5b87d0ab9368ac313b9093a785f11a724) Thanks [@matthprost](https://github.com/matthprost)! - Added `tooltip` prop on Checkbox, Toggle and Radio components

### Patch Changes

- [#2910](https://github.com/scaleway/ultraviolet/pull/2910) [`d79efd14`](https://github.com/scaleway/ultraviolet/commit/d79efd1424a478e284482cb6883ed46eb378b804) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Dialog should only prevent overflow y, not overflow x

- [#2887](https://github.com/scaleway/ultraviolet/pull/2887) [`09fae97b`](https://github.com/scaleway/ultraviolet/commit/09fae97b2899c6111f6577829297953e06600f08) Thanks [@matthprost](https://github.com/matthprost)! - Fix tokens usages on checkbox since last update

## 1.11.2

### Patch Changes

- [#2877](https://github.com/scaleway/ultraviolet/pull/2877) [`6e017a8c`](https://github.com/scaleway/ultraviolet/commit/6e017a8c10fc4081ed9d71086033b1f263001ee2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.21`.
  Updated dependency `@types/react-dom` to `18.2.7`.

- [#2894](https://github.com/scaleway/ultraviolet/pull/2894) [`4531dd6c`](https://github.com/scaleway/ultraviolet/commit/4531dd6c40a09667567842abd2fe397a84173cc7) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix(modal): focus cant be restored on shire and cause errors

- Updated dependencies [[`6e017a8c`](https://github.com/scaleway/ultraviolet/commit/6e017a8c10fc4081ed9d71086033b1f263001ee2)]:
  - @ultraviolet/icons@2.0.1

## 1.11.1

### Patch Changes

- [#2889](https://github.com/scaleway/ultraviolet/pull/2889) [`d6bb06a2`](https://github.com/scaleway/ultraviolet/commit/d6bb06a275b8ca753b8d0c2c20ed0cc1a075100f) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix(modal): handle events and focus

- [#2885](https://github.com/scaleway/ultraviolet/pull/2885) [`ed31d075`](https://github.com/scaleway/ultraviolet/commit/ed31d075759ea99a53193cf21cadab60b03b634d) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - feat: add more accessibility to our modal

- [#2881](https://github.com/scaleway/ultraviolet/pull/2881) [`84c45a68`](https://github.com/scaleway/ultraviolet/commit/84c45a6827863c5144233d92b3d9a4f83d26a5ac) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.15`.
  Updated dependency `@babel/runtime` to `7.22.15`.
  Updated dependency `@babel/eslint-parser` to `7.22.15`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.22.15`.
  Updated dependency `@babel/preset-env` to `7.22.15`.
  Updated dependency `@babel/preset-react` to `7.22.15`.
  Updated dependency `@babel/preset-typescript` to `7.22.15`.
- Updated dependencies [[`ac9aa7a7`](https://github.com/scaleway/ultraviolet/commit/ac9aa7a7b96d51bce1e3f721d43ce3df3cdfab17), [`84c45a68`](https://github.com/scaleway/ultraviolet/commit/84c45a6827863c5144233d92b3d9a4f83d26a5ac)]:
  - @ultraviolet/icons@2.0.0

## 1.11.0

### Minor Changes

- [#2836](https://github.com/scaleway/ultraviolet/pull/2836) [`0cd0ed2d`](https://github.com/scaleway/ultraviolet/commit/0cd0ed2d299c9153792747e1c76e062c3e968d0a) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - Add `CheckboxGroup` component

- [#2850](https://github.com/scaleway/ultraviolet/pull/2850) [`f4b56dfa`](https://github.com/scaleway/ultraviolet/commit/f4b56dfa5ed79c17e217a97acdbddede77e358ae) Thanks [@matthprost](https://github.com/matthprost)! - Add `ToggleGroup` component

### Patch Changes

- [#2873](https://github.com/scaleway/ultraviolet/pull/2873) [`e74d99fb`](https://github.com/scaleway/ultraviolet/commit/e74d99fbf715fc89c5aef8f7c2269355ebd5c15d) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix: controlled modal

## 1.10.1

### Patch Changes

- [#2624](https://github.com/scaleway/ultraviolet/pull/2624) [`42821443`](https://github.com/scaleway/ultraviolet/commit/428214438c44a966eb21fbe819e75dd48624e390) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.14`.
  Updated dependency `@types/react-dom` to `18.2.6`.

- [#2869](https://github.com/scaleway/ultraviolet/pull/2869) [`74eee8fe`](https://github.com/scaleway/ultraviolet/commit/74eee8fed20baf1361cff2c0b0a4f2d8992ea451) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix: reintroduce hide function on modal children

- [#2852](https://github.com/scaleway/ultraviolet/pull/2852) [`c6a0cdfd`](https://github.com/scaleway/ultraviolet/commit/c6a0cdfd82d3f0a88cda4f66700ef841162352f5) Thanks [@matthprost](https://github.com/matthprost)! - - Fixed tooltip with too long text inside, the text now break if longer than the width of the tooltip.
  - Fixed Button component with `fullWidth` and `tooltip` props not working together and not applying the correct width.

## 1.10.0

### Minor Changes

- [#2847](https://github.com/scaleway/ultraviolet/pull/2847) [`e2a73d27`](https://github.com/scaleway/ultraviolet/commit/e2a73d27215236ff0eab2f8b5d54e26aea675aca) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - feat: drop reakit usage in our modals

### Patch Changes

- [#2845](https://github.com/scaleway/ultraviolet/pull/2845) [`f3081bf6`](https://github.com/scaleway/ultraviolet/commit/f3081bf63131c294206a8f6c9ef56ccf2bae6c1e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.11`.
  Updated dependency `@babel/runtime` to `7.22.11`.
  Updated dependency `@babel/eslint-parser` to `7.22.11`.
  Updated dependency `@babel/preset-typescript` to `7.22.11`.
- Updated dependencies [[`f3081bf6`](https://github.com/scaleway/ultraviolet/commit/f3081bf63131c294206a8f6c9ef56ccf2bae6c1e)]:
  - @ultraviolet/icons@1.3.1

## 1.9.0

### Minor Changes

- [#2781](https://github.com/scaleway/ultraviolet/pull/2781) [`83ee8745`](https://github.com/scaleway/ultraviolet/commit/83ee87456efaef76d805129f12f5fbeefd14b633) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Add `RadioGroup` component

- [#2807](https://github.com/scaleway/ultraviolet/pull/2807) [`d604182e`](https://github.com/scaleway/ultraviolet/commit/d604182e740a8752c739210f57a4c183f1138320) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - update styling of Toggle component

- [#2782](https://github.com/scaleway/ultraviolet/pull/2782) [`2cd42db8`](https://github.com/scaleway/ultraviolet/commit/2cd42db80b93c4ed2cbb504991a2926d6c19d358) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - update the checkbox style

### Patch Changes

- [#2808](https://github.com/scaleway/ultraviolet/pull/2808) [`0719ade2`](https://github.com/scaleway/ultraviolet/commit/0719ade2d91b09851eb3a6f94807b3732c878e96) Thanks [@ModuloM](https://github.com/ModuloM)! - Add z-index to the Modal backdrop to be above other components DS-526

- Updated dependencies [[`c2f452f7`](https://github.com/scaleway/ultraviolet/commit/c2f452f71223f537d4266f4af1ac2b5d35e5cd5b)]:
  - @ultraviolet/icons@1.3.0

## 1.8.4

### Patch Changes

- [#2777](https://github.com/scaleway/ultraviolet/pull/2777) [`7f0134ea`](https://github.com/scaleway/ultraviolet/commit/7f0134eaef23fb8e9545ce164263ed306941a09a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.15.0`.

- Updated dependencies [[`85c7e461`](https://github.com/scaleway/ultraviolet/commit/85c7e461d2888197607e577e1089a64f49178725)]:
  - @ultraviolet/icons@1.2.3

## 1.8.3

### Patch Changes

- [#2804](https://github.com/scaleway/ultraviolet/pull/2804) [`0c2713d2`](https://github.com/scaleway/ultraviolet/commit/0c2713d25e801b170af17822ed06a257637a88bb) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Enable `secondary` sentiment/color on some components which missed it

## 1.8.2

### Patch Changes

- [#2809](https://github.com/scaleway/ultraviolet/pull/2809) [`0e61c78b`](https://github.com/scaleway/ultraviolet/commit/0e61c78b5da5829e1cc09b012319672d456accf1) Thanks [@philibea](https://github.com/philibea)! - Refactoring usage of Icon inside ui with the new ultraviolet/icons. Also remove depencies of ui inside ultraviolet/icons and use only ultraviolet/themes

- [#2801](https://github.com/scaleway/ultraviolet/pull/2801) [`1ecd9502`](https://github.com/scaleway/ultraviolet/commit/1ecd95020595d14207d63a2671ea204575097c88) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.10`.
  Updated dependency `@babel/runtime` to `7.22.10`.
  Updated dependency `@babel/eslint-parser` to `7.22.10`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.22.10`.
  Updated dependency `@babel/preset-env` to `7.22.10`.
- Updated dependencies [[`0e61c78b`](https://github.com/scaleway/ultraviolet/commit/0e61c78b5da5829e1cc09b012319672d456accf1), [`1ecd9502`](https://github.com/scaleway/ultraviolet/commit/1ecd95020595d14207d63a2671ea204575097c88)]:
  - @ultraviolet/icons@1.2.2

## 1.8.1

### Patch Changes

- [#2796](https://github.com/scaleway/ultraviolet/pull/2796) [`32e92118`](https://github.com/scaleway/ultraviolet/commit/32e9211805a87278f002d56fecfc150907b23a3a) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Support icons in TagList

## 1.8.0

### Minor Changes

- [#2783](https://github.com/scaleway/ultraviolet/pull/2783) [`6e258a6e`](https://github.com/scaleway/ultraviolet/commit/6e258a6e7e9f5c9b74192f89b32646fe823a1b1b) Thanks [@BABAK0T0](https://github.com/BABAK0T0)! - add placement property on Text component

- [#2761](https://github.com/scaleway/ultraviolet/pull/2761) [`b0d21ffc`](https://github.com/scaleway/ultraviolet/commit/b0d21ffcabd050b423f4d13b3273f9cb0c64e9c7) Thanks [@matthprost](https://github.com/matthprost)! - Design update on Banner to include pattern and gradient colors

- [#2768](https://github.com/scaleway/ultraviolet/pull/2768) [`0e8a90e7`](https://github.com/scaleway/ultraviolet/commit/0e8a90e7c12e0442508f4e73cc34202d6d7ec1c9) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Update styling of Radio component

### Patch Changes

- [#2755](https://github.com/scaleway/ultraviolet/pull/2755) [`809a7ea3`](https://github.com/scaleway/ultraviolet/commit/809a7ea3bdc0122a11b8e2779b389ed03583361e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.9`.
  Updated dependency `@babel/eslint-parser` to `7.22.9`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.22.9`.
  Updated dependency `@babel/preset-env` to `7.22.9`.

## 1.7.0

### Minor Changes

- [#2714](https://github.com/scaleway/ultraviolet/pull/2714) [`cd6522ff`](https://github.com/scaleway/ultraviolet/commit/cd6522ff50c1669308a95574d87dc4fc282830ce) Thanks [@matthprost](https://github.com/matthprost)! - Create internal component popup for Tooltip and Popover

### Patch Changes

- Updated dependencies [[`f4f9dfc1`](https://github.com/scaleway/ultraviolet/commit/f4f9dfc1473ce60b9a397708a2be737ff737fc4d)]:
  - @ultraviolet/themes@1.2.1

## 1.6.1

### Patch Changes

- [#2745](https://github.com/scaleway/ultraviolet/pull/2745) [`3e8e8db0`](https://github.com/scaleway/ultraviolet/commit/3e8e8db080220ccd005a2c92026404fa49f37eda) Thanks [@matthprost](https://github.com/matthprost)! - Fix DateInput component

## 1.6.0

### Minor Changes

- [#2741](https://github.com/scaleway/ultraviolet/pull/2741) [`445726b6`](https://github.com/scaleway/ultraviolet/commit/445726b6839bed8b2144f3cd613fe58817a53a83) Thanks [@matthprost](https://github.com/matthprost)! - Theme colors update

### Patch Changes

- Updated dependencies [[`445726b6`](https://github.com/scaleway/ultraviolet/commit/445726b6839bed8b2144f3cd613fe58817a53a83)]:
  - @ultraviolet/themes@1.2.0

## 1.5.0

### Minor Changes

- [#2722](https://github.com/scaleway/ultraviolet/pull/2722) [`e9ab303c`](https://github.com/scaleway/ultraviolet/commit/e9ab303cb4dc8b9dd34757895258471e253daec1) Thanks [@matthprost](https://github.com/matthprost)! - Make `Icon` deprecated it should now be imported from `@ultraviolet/icons`

### Patch Changes

- [#2730](https://github.com/scaleway/ultraviolet/pull/2730) [`c4288c1d`](https://github.com/scaleway/ultraviolet/commit/c4288c1d9c0f49e5475e142f8231aa738dbb77f4) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/random-name` to `4.0.2`.

- [#2734](https://github.com/scaleway/ultraviolet/pull/2734) [`028ca2ba`](https://github.com/scaleway/ultraviolet/commit/028ca2ba8c58301e6f03454dc665b83302db5b55) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.16.0`.

- [#2732](https://github.com/scaleway/ultraviolet/pull/2732) [`93945bbe`](https://github.com/scaleway/ultraviolet/commit/93945bbe366aba0a1cb6ee831d424138dc61c833) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.7.4`.

## 1.4.7

### Patch Changes

- [#2731](https://github.com/scaleway/ultraviolet/pull/2731) [`c43a55e1`](https://github.com/scaleway/ultraviolet/commit/c43a55e17ad5e94193521532e1edca8e13564996) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@scaleway/use-media` to `2.0.1`.

## 1.4.6

### Patch Changes

- [#2693](https://github.com/scaleway/ultraviolet/pull/2693) [`1dc9fc2f`](https://github.com/scaleway/ultraviolet/commit/1dc9fc2f7c849b9bd9589b46d4a7baada5f915de) Thanks [@fabienhebert](https://github.com/fabienhebert)! - List: preventClick on Cell also prevent keyDown event to be propagated

- [#2721](https://github.com/scaleway/ultraviolet/pull/2721) [`b3b116a2`](https://github.com/scaleway/ultraviolet/commit/b3b116a205f111180310c6077b072c6d102fec0f) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Use `exports` field with `type: module`

- [#2710](https://github.com/scaleway/ultraviolet/pull/2710) [`1dcb4428`](https://github.com/scaleway/ultraviolet/commit/1dcb4428592eb5a0cd9cfc6ece99a00b8a53235e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.8`.
  Updated dependency `@babel/runtime` to `7.22.6`.
  Updated dependency `@babel/eslint-parser` to `7.22.7`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.22.7`.
  Updated dependency `@babel/preset-env` to `7.22.7`.
- Updated dependencies [[`b3b116a2`](https://github.com/scaleway/ultraviolet/commit/b3b116a205f111180310c6077b072c6d102fec0f)]:
  - @ultraviolet/themes@1.1.5

## 1.4.5

### Patch Changes

- Updated dependencies [[`8b00f035`](https://github.com/scaleway/ultraviolet/commit/8b00f035dec5a553760d3fd64631ef32b3c20c0b)]:
  - @ultraviolet/themes@1.1.4

## 1.4.4

### Patch Changes

- [#2698](https://github.com/scaleway/ultraviolet/pull/2698) [`37826e9e`](https://github.com/scaleway/ultraviolet/commit/37826e9e8496001b59496ad446699ff72e4a4434) Thanks [@matthprost](https://github.com/matthprost)! - Fix carousel shade color

## 1.4.3

### Patch Changes

- [#2696](https://github.com/scaleway/ultraviolet/pull/2696) [`fdb80379`](https://github.com/scaleway/ultraviolet/commit/fdb80379780275ad52480402341646fb49012331) Thanks [@matthprost](https://github.com/matthprost)! - - Fixed border color on all inputs
  - Fixed carrousel
- Updated dependencies [[`fdb80379`](https://github.com/scaleway/ultraviolet/commit/fdb80379780275ad52480402341646fb49012331)]:
  - @ultraviolet/themes@1.1.3

## 1.4.2

### Patch Changes

- [#2694](https://github.com/scaleway/ultraviolet/pull/2694) [`8b916b8b`](https://github.com/scaleway/ultraviolet/commit/8b916b8b89b3c885661aae0a53573d9f8c0dd23d) Thanks [@matthprost](https://github.com/matthprost)! - Fix Tabs and Carousel colors and updated data charts colors in dark and darker

- Updated dependencies [[`8b916b8b`](https://github.com/scaleway/ultraviolet/commit/8b916b8b89b3c885661aae0a53573d9f8c0dd23d)]:
  - @ultraviolet/themes@1.1.2

## 1.4.1

### Patch Changes

- Updated dependencies [[`48dfbc6d`](https://github.com/scaleway/ultraviolet/commit/48dfbc6dbe4f0155fcac1c119c0c607d2736947c)]:
  - @ultraviolet/themes@1.1.1

## 1.4.0

### Minor Changes

- [#2668](https://github.com/scaleway/ultraviolet/pull/2668) [`8b88b5c3`](https://github.com/scaleway/ultraviolet/commit/8b88b5c3576f6c300594ed914f73207473cc4b6b) Thanks [@matthprost](https://github.com/matthprost)! - New themes darker and colors for all components to be more accessibles and pass WCAG AA

### Patch Changes

- Updated dependencies [[`8b88b5c3`](https://github.com/scaleway/ultraviolet/commit/8b88b5c3576f6c300594ed914f73207473cc4b6b)]:
  - @ultraviolet/themes@1.1.0

## 1.3.2

### Patch Changes

- [#2686](https://github.com/scaleway/ultraviolet/pull/2686) [`6b0450aa`](https://github.com/scaleway/ultraviolet/commit/6b0450aaf8beea60c1a5ea020c2a1946170dc7cf) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.15.0`.

- [#2688](https://github.com/scaleway/ultraviolet/pull/2688) [`55442270`](https://github.com/scaleway/ultraviolet/commit/554422709d1b18dadb5b6988bc9d8015f9dea345) Thanks [@fabienhebert](https://github.com/fabienhebert)! - List: avoid event propagation outside List.Expandable

## 1.3.1

### Patch Changes

- [#2671](https://github.com/scaleway/ultraviolet/pull/2671) [`b43f7b1c`](https://github.com/scaleway/ultraviolet/commit/b43f7b1c4b80c0c9aaceded279710b8366d7827d) Thanks [@philibea](https://github.com/philibea)! - refactor PasswordStrengthMeter into more simple Meter component

- [#2685](https://github.com/scaleway/ultraviolet/pull/2685) [`f97b7d18`](https://github.com/scaleway/ultraviolet/commit/f97b7d188ae98100d1c1f9502385fc93e81759f8) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Pagination: check page prop (currentPage) min and max values

## 1.3.0

### Minor Changes

- [#2683](https://github.com/scaleway/ultraviolet/pull/2683) [`d6550d3b`](https://github.com/scaleway/ultraviolet/commit/d6550d3bfe2584dcdde413cdf60b20e8f2b99461) Thanks [@matthprost](https://github.com/matthprost)! - Add props `aria-controls`, `aria-expanded` and `aria-haspopup` to Button component

## 1.2.0

### Minor Changes

- [#2682](https://github.com/scaleway/ultraviolet/pull/2682) [`d5d4c003`](https://github.com/scaleway/ultraviolet/commit/d5d4c00372ed0b69b608073a0ed52276ce5fdfc8) Thanks [@matthprost](https://github.com/matthprost)! - Add props `aria-controls`, `aria-expanded` and `aria-haspopup` to Button component

### Patch Changes

- [#2667](https://github.com/scaleway/ultraviolet/pull/2667) [`6de7c1d5`](https://github.com/scaleway/ultraviolet/commit/6de7c1d563643a72782d3de3b3e2e57626540f2a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.14.1`.

## 1.1.1

### Patch Changes

- [#2665](https://github.com/scaleway/ultraviolet/pull/2665) [`aff9a3e9`](https://github.com/scaleway/ultraviolet/commit/aff9a3e9a11a73c3cf5973114de248461c263ca7) Thanks [@johnrazeur](https://github.com/johnrazeur)! - Add validation to SelectInputField

- [#2670](https://github.com/scaleway/ultraviolet/pull/2670) [`90b3d792`](https://github.com/scaleway/ultraviolet/commit/90b3d79217e7975885c045376cb6b7af9ded2eed) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Add `tabIndex` prop to `Button`

- [#2662](https://github.com/scaleway/ultraviolet/pull/2662) [`0e75f4e6`](https://github.com/scaleway/ultraviolet/commit/0e75f4e6db0075c3a236e71a969f0832e257840e) Thanks [@matthprost](https://github.com/matthprost)! - Fixed `TagInput` not to block focus while pressing key Tab

## 1.1.0

### Minor Changes

- [#2666](https://github.com/scaleway/ultraviolet/pull/2666) [`0f0f9f96`](https://github.com/scaleway/ultraviolet/commit/0f0f9f96dfc26000ae51efdc9c003b89c752fe86) Thanks [@JulienSaguez](https://github.com/JulienSaguez)! - Add the possibility to forward onClick event used inside disclosure for Menu component

- [#2644](https://github.com/scaleway/ultraviolet/pull/2644) [`573e2b1a`](https://github.com/scaleway/ultraviolet/commit/573e2b1a28b33e4efe8bdb2da451ade220556d3c) Thanks [@matthprost](https://github.com/matthprost)! - Remove strikethrough on `PieChart` component

### Patch Changes

- [#2664](https://github.com/scaleway/ultraviolet/pull/2664) [`a1c00639`](https://github.com/scaleway/ultraviolet/commit/a1c00639e2ca1789fe47eb6f2a9ca35936d47605) Thanks [@philibea](https://github.com/philibea)! - Add the possibility to forward onClick event of the component/function used inside disclosure

- [#2663](https://github.com/scaleway/ultraviolet/pull/2663) [`d1e76bd9`](https://github.com/scaleway/ultraviolet/commit/d1e76bd9c9e1930ad5294350e9d21b48ce5d1f44) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Loader: fix active animation

- [#2620](https://github.com/scaleway/ultraviolet/pull/2620) [`31466607`](https://github.com/scaleway/ultraviolet/commit/314666077ae0591992e37b9d230ae36f9b4c8d86) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.13.0`.

- [#2652](https://github.com/scaleway/ultraviolet/pull/2652) [`5ab474ce`](https://github.com/scaleway/ultraviolet/commit/5ab474cec4bc7b94356b163ea253c1e5a1e3cc3a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.14.0`.

## 1.0.0

### Major Changes

- [#2628](https://github.com/scaleway/ultraviolet/pull/2628) [`a084d91e`](https://github.com/scaleway/ultraviolet/commit/a084d91e69c9eb0575a6a9d73b0dafff4fa5129e) Thanks [@matthprost](https://github.com/matthprost)! - Ultraviolet UI v1.0.0 is the inaugural release of our React component UI library. It provides a comprehensive set of beautiful and customizable UI components that can be seamlessly integrated into your React applications. This version introduces a range of versatile and responsive components, including buttons, inputs, checkboxes, radio buttons, dropdowns, modals, tooltips, and progress bars. Each component is designed with a keen focus on aesthetics and user experience, enabling you to create stunning and intuitive user interfaces. Ultraviolet UI v1.0.0 empowers developers to effortlessly enhance the visual appeal and interactivity of their React projects.

### Patch Changes

- Updated dependencies [[`a084d91e`](https://github.com/scaleway/ultraviolet/commit/a084d91e69c9eb0575a6a9d73b0dafff4fa5129e)]:
  - @ultraviolet/themes@1.0.0

## 0.254.0

### Minor Changes

- [#2629](https://github.com/scaleway/ultraviolet/pull/2629) [`01ab2175`](https://github.com/scaleway/ultraviolet/commit/01ab21759aa109765a625a5bc1ad1865dde107f0) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️⚠️⚠️ **THOSE PACKAGES ARE DEPRECATED** ⚠️⚠️⚠️

  We renamed the scope of our packages from `@scaleway` to `@ultraviolet` and made a major update to all of them.

  Please use `@ultraviolet/ui@1.0.0`, `@ultraviolet/form@1.0.0`, and `@ultraviolet/themes@1.0.0` instead.

### Patch Changes

- Updated dependencies [[`01ab2175`](https://github.com/scaleway/ultraviolet/commit/01ab21759aa109765a625a5bc1ad1865dde107f0)]:
  - @scaleway/themes@1.5.0

## 0.253.1

### Patch Changes

- [#2626](https://github.com/scaleway/scaleway-ui/pull/2626) [`1c866d27`](https://github.com/scaleway/scaleway-ui/commit/1c866d2710b1c598c6da717b37c5c686f33feaa4) Thanks [@matthprost](https://github.com/matthprost)! - Fix Tooltip to remove `width: fit-content`

## 0.253.0

### Minor Changes

- [#2607](https://github.com/scaleway/scaleway-ui/pull/2607) [`ea89985d`](https://github.com/scaleway/scaleway-ui/commit/ea89985d3748ea7de7a0396ce080b2bc34cc1dba) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Rename some `variant` prop to `sentiment`

## 0.252.0

### Minor Changes

- [#2608](https://github.com/scaleway/scaleway-ui/pull/2608) [`42ef178d`](https://github.com/scaleway/scaleway-ui/commit/42ef178dfc364011d161b06070fa1ef8eb1437f0) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Add new required `popoverTitle` prop to TagList

- [#2616](https://github.com/scaleway/scaleway-ui/pull/2616) [`c8957252`](https://github.com/scaleway/scaleway-ui/commit/c8957252b33abeb5515061e6a9a6642629d22ce9) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Table & List: support a new info prop on headerCell

- [#2608](https://github.com/scaleway/scaleway-ui/pull/2608) [`42ef178d`](https://github.com/scaleway/scaleway-ui/commit/42ef178dfc364011d161b06070fa1ef8eb1437f0) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Use Popover instead of Tooltip for TagList threshold

### Patch Changes

- [#2619](https://github.com/scaleway/scaleway-ui/pull/2619) [`da0392ae`](https://github.com/scaleway/scaleway-ui/commit/da0392aeb572a955e035abb81985644c3c3c2885) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Button: prevent text-decoration

- [#2622](https://github.com/scaleway/scaleway-ui/pull/2622) [`f2d211b5`](https://github.com/scaleway/scaleway-ui/commit/f2d211b57750866cce6e5679ed9bf47953ec9294) Thanks [@matthprost](https://github.com/matthprost)! - Removed `iconOnly` prop from DOM in `<Button />` component

## 0.251.2

### Patch Changes

- [#2618](https://github.com/scaleway/scaleway-ui/pull/2618) [`7bdaa019`](https://github.com/scaleway/scaleway-ui/commit/7bdaa01908e3e69407f5b07b4a65e6eec14609e1) Thanks [@philibea](https://github.com/philibea)! - add possibility to make an async estimate on PasswordStrengthMeter

- [#2600](https://github.com/scaleway/scaleway-ui/pull/2600) [`49776b61`](https://github.com/scaleway/scaleway-ui/commit/49776b61a23c71abaa37aafd60ae43d24d886277) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Tooltip: fix alignment

- [#2613](https://github.com/scaleway/scaleway-ui/pull/2613) [`cf4da571`](https://github.com/scaleway/scaleway-ui/commit/cf4da571080ecc42bc2cff711cae18081e4eca2d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.5`.
  Updated dependency `@babel/runtime` to `7.22.5`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.22.5`.
  Updated dependency `@babel/preset-env` to `7.22.5`.
  Updated dependency `@babel/preset-react` to `7.22.5`.

- [#2574](https://github.com/scaleway/scaleway-ui/pull/2574) [`0f99c0ac`](https://github.com/scaleway/scaleway-ui/commit/0f99c0acaf159e69f8ec2288527ffd0ab61c430f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-datepicker` to `4.12.0`.

## 0.251.1

### Patch Changes

- [#2597](https://github.com/scaleway/scaleway-ui/pull/2597) [`0d65713f`](https://github.com/scaleway/scaleway-ui/commit/0d65713f363f15bb1aae020212a1ef782044471e) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Button: fix xsmall specs (gap)

- [#2601](https://github.com/scaleway/scaleway-ui/pull/2601) [`4125401f`](https://github.com/scaleway/scaleway-ui/commit/4125401fc1ec5174e53ff2e86cad98c0a7ba7867) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.11.1`.

- [#2584](https://github.com/scaleway/scaleway-ui/pull/2584) [`8f24c560`](https://github.com/scaleway/scaleway-ui/commit/8f24c560e6382981268de77ef85002d22525171e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.22.0`.
  Updated dependency `@babel/runtime` to `7.22.0`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.22.0`.
  Updated dependency `@babel/preset-env` to `7.22.0`.
  Updated dependency `@babel/preset-react` to `7.22.0`.

- [#2596](https://github.com/scaleway/scaleway-ui/pull/2596) [`85059961`](https://github.com/scaleway/scaleway-ui/commit/85059961fe38be85875ebec0220aa7ab5619b072) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Fix right padding on TextInput when having multiple right components (unit, valid, required...)

## 0.251.0

### Minor Changes

- [#2590](https://github.com/scaleway/scaleway-ui/pull/2590) [`8cc6c1e8`](https://github.com/scaleway/scaleway-ui/commit/8cc6c1e80b15b0bb69a4b49600860eb219fbfc84) Thanks [@matthprost](https://github.com/matthprost)! - ListV2, PaginationV2 and TableV2 have been renamed into List, Pagination and Table

## 0.250.0

### Minor Changes

- [#2549](https://github.com/scaleway/scaleway-ui/pull/2549) [`cedd5678`](https://github.com/scaleway/scaleway-ui/commit/cedd56787a243f7d7cce81abedc94ed4e20addb4) Thanks [@johnrazeur](https://github.com/johnrazeur)! - Add justify-content property to Row

### Patch Changes

- [#2585](https://github.com/scaleway/scaleway-ui/pull/2585) [`21670b9b`](https://github.com/scaleway/scaleway-ui/commit/21670b9b38ddd90a2acc9964e2f112431e2fb6a6) Thanks [@johnrazeur](https://github.com/johnrazeur)! - Change overflow to visible when Expandable is open

## 0.249.2

### Patch Changes

- [#2583](https://github.com/scaleway/scaleway-ui/pull/2583) [`d94c70b4`](https://github.com/scaleway/scaleway-ui/commit/d94c70b4e05e46269ad4deeef131142611b69191) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Button: add a xsmall size

- [#2586](https://github.com/scaleway/scaleway-ui/pull/2586) [`ec661b35`](https://github.com/scaleway/scaleway-ui/commit/ec661b35e70502b097a467785f6202fcf34ef11e) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Menu: fix Item styles

## 0.249.1

### Patch Changes

- [#2572](https://github.com/scaleway/scaleway-ui/pull/2572) [`766a0c4c`](https://github.com/scaleway/scaleway-ui/commit/766a0c4cbe1f61d0cb2617ba67033a785bef33ec) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - fix the number type input arrow position

- [#2578](https://github.com/scaleway/scaleway-ui/pull/2578) [`2c4e807b`](https://github.com/scaleway/scaleway-ui/commit/2c4e807bc2c0727e1275acfcb731d6256bfc6679) Thanks [@vincentaudebert](https://github.com/vincentaudebert)! - Verification code correct focus on paste

- [#2579](https://github.com/scaleway/scaleway-ui/pull/2579) [`612cde1d`](https://github.com/scaleway/scaleway-ui/commit/612cde1d8e7b81729ba40b14b74b7703de99ef96) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - export Banner

## 0.249.0

### Minor Changes

- [#2566](https://github.com/scaleway/scaleway-ui/pull/2566) [`b879729d`](https://github.com/scaleway/scaleway-ui/commit/b879729dd4f5d2a67760d2baa38c992182f4cee5) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Add copiable options to Tag & TagList

## 0.248.1

### Patch Changes

- [#2551](https://github.com/scaleway/scaleway-ui/pull/2551) [`63cabedb`](https://github.com/scaleway/scaleway-ui/commit/63cabedb8890a3e3eaf562ba0a655aa1c29e7da9) Thanks [@johnrazeur](https://github.com/johnrazeur)! - Refactor radio label

- [#2575](https://github.com/scaleway/scaleway-ui/pull/2575) [`952775a4`](https://github.com/scaleway/scaleway-ui/commit/952775a4252da617f0dc2b570524f1efa00b2073) Thanks [@fabienhebert](https://github.com/fabienhebert)! - `Menu.Item`: restore onClick if the element is an anchor

- [#2556](https://github.com/scaleway/scaleway-ui/pull/2556) [`0b94cb44`](https://github.com/scaleway/scaleway-ui/commit/0b94cb443934b4da647998ad006f72f88b18a845) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.7`.

## 0.248.0

### Minor Changes

- [#2554](https://github.com/scaleway/scaleway-ui/pull/2554) [`46fc6182`](https://github.com/scaleway/scaleway-ui/commit/46fc618216dea025af3dd6f4c3914889a9d0d5bf) Thanks [@matthprost](https://github.com/matthprost)! - Sync spaces and radii from theme

### Patch Changes

- Updated dependencies [[`46fc6182`](https://github.com/scaleway/scaleway-ui/commit/46fc618216dea025af3dd6f4c3914889a9d0d5bf)]:
  - @scaleway/themes@1.4.0

## 0.247.0

### Minor Changes

- [#2536](https://github.com/scaleway/scaleway-ui/pull/2536) [`d0747c1c`](https://github.com/scaleway/scaleway-ui/commit/d0747c1c8c2af5a7ac8c64f70631377a0559a4fa) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `NumberInput` to implement new properties and change behavior

## 0.246.1

### Patch Changes

- [#2552](https://github.com/scaleway/scaleway-ui/pull/2552) [`5760aa6b`](https://github.com/scaleway/scaleway-ui/commit/5760aa6bdfc7a90fb3e5832208d1609a158c4443) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Pagination: restore aria-current and make sure button icon only are square

## 0.246.0

### Minor Changes

- [#2547](https://github.com/scaleway/scaleway-ui/pull/2547) [`544b1628`](https://github.com/scaleway/scaleway-ui/commit/544b1628988eff6a6f594f6a4131014b7f46f2b9) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Button: Use new version of button and rename component

## 0.245.1

### Patch Changes

- [#2524](https://github.com/scaleway/scaleway-ui/pull/2524) [`02ec378c`](https://github.com/scaleway/scaleway-ui/commit/02ec378c3a3d79821e48fbc9dae584d71a8208e1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.11.0`.
  Updated dependency `@emotion/styled` to `11.11.0`.
  Updated dependency `@emotion/babel-plugin` to `11.11.0`.
  Updated dependency `@emotion/cache` to `11.11.0`.
  Updated dependency `@emotion/eslint-plugin` to `11.11.0`.
  Updated dependency `@emotion/jest` to `11.11.0`.

- [#2526](https://github.com/scaleway/scaleway-ui/pull/2526) [`1071b65d`](https://github.com/scaleway/scaleway-ui/commit/1071b65d300a997dd82564eba702981e61ec308c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-toastify` to `9.1.3`.

## 0.245.0

### Minor Changes

- [#2517](https://github.com/scaleway/scaleway-ui/pull/2517) [`44f0cc83`](https://github.com/scaleway/scaleway-ui/commit/44f0cc8323cedf6ae3abb0880ade68dfc4b17369) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Remove ProgressionButton

- [#2485](https://github.com/scaleway/scaleway-ui/pull/2485) [`75f46ff6`](https://github.com/scaleway/scaleway-ui/commit/75f46ff6df51a47ec0d60e2300eed7d8e00764c3) Thanks [@matthprost](https://github.com/matthprost)! - - Add unique `id` into `<Toggle />` component
  - Add `aria-label` into `<Snippet />` component on copy button
  - Add unique `id` into `<VerificationCode />` component
  - Add `label`, `aria-label` and `aria-labelledby` into `<NumberInput />` component

### Patch Changes

- [#2532](https://github.com/scaleway/scaleway-ui/pull/2532) [`f6fda915`](https://github.com/scaleway/scaleway-ui/commit/f6fda9159db9119089dd596a21e79c0b00191a41) Thanks [@philibea](https://github.com/philibea)! - fix buttonV2 style

- [#2507](https://github.com/scaleway/scaleway-ui/pull/2507) [`a72f1538`](https://github.com/scaleway/scaleway-ui/commit/a72f153878344bbd44d7eb0e3d7587760e992562) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-select` to `5.7.3`.

## 0.244.1

### Patch Changes

- [#2511](https://github.com/scaleway/scaleway-ui/pull/2511) [`f602f7e8`](https://github.com/scaleway/scaleway-ui/commit/f602f7e828204608b0383e79ee4b56d0efbc53a7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.6`.
  Updated dependency `@types/react-dom` to `18.2.4`.

- [#2504](https://github.com/scaleway/scaleway-ui/pull/2504) [`cbbbb8f7`](https://github.com/scaleway/scaleway-ui/commit/cbbbb8f7aafd95e403839527ae1e8d0ed0418a2a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-datepicker` to `4.11.2`.

- [#2506](https://github.com/scaleway/scaleway-ui/pull/2506) [`b1e522fb`](https://github.com/scaleway/scaleway-ui/commit/b1e522fb3884f19dc871d002e7c60adbfc2f42c1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/serialize` to `1.1.2`.

- [#2516](https://github.com/scaleway/scaleway-ui/pull/2516) [`b982a610`](https://github.com/scaleway/scaleway-ui/commit/b982a6102a750f2583e45c1c418f934558a218b6) Thanks [@ModuloM](https://github.com/ModuloM)! - fix(Modal): set tabIndex to focus dialog element first

## 0.244.0

### Minor Changes

- [#2487](https://github.com/scaleway/scaleway-ui/pull/2487) [`d1379cb4`](https://github.com/scaleway/scaleway-ui/commit/d1379cb4daf749a30af3a43bde2dcc60e3441273) Thanks [@matthprost](https://github.com/matthprost)! - Update BarChart and LineChart to have new data colors

- [#2468](https://github.com/scaleway/scaleway-ui/pull/2468) [`722c22c7`](https://github.com/scaleway/scaleway-ui/commit/722c22c7e6e94f6c888c83bdcaf564b89dad7c18) Thanks [@fabienhebert](https://github.com/fabienhebert)! - New component TableV2

### Patch Changes

- [#2497](https://github.com/scaleway/scaleway-ui/pull/2497) [`352df2f0`](https://github.com/scaleway/scaleway-ui/commit/352df2f01570011bc384736239e97b8e20c94c1c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.21.8`.
  Updated dependency `@babel/runtime` to `7.21.5`.
  Updated dependency `@babel/eslint-parser` to `7.21.8`.
  Updated dependency `@babel/preset-env` to `7.21.5`.
  Updated dependency `@babel/preset-typescript` to `7.21.5`.

- [#2503](https://github.com/scaleway/scaleway-ui/pull/2503) [`0940738d`](https://github.com/scaleway/scaleway-ui/commit/0940738d0f17738786838075e710ec8d19a426a8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.0`.
  Updated dependency `@types/react-dom` to `18.2.1`.

- [#2496](https://github.com/scaleway/scaleway-ui/pull/2496) [`4fae7fd7`](https://github.com/scaleway/scaleway-ui/commit/4fae7fd72c41fdc0ac778dfef28ddfd1312c0788) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Avoid row expandableRow to unregister if parent component is re-render

## 0.243.0

### Minor Changes

- [#2486](https://github.com/scaleway/scaleway-ui/pull/2486) [`8d66447c`](https://github.com/scaleway/scaleway-ui/commit/8d66447c3e0112083268841c762cfb822e59d112) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Alert />` to show close button when `onClose` is given

### Patch Changes

- [#2489](https://github.com/scaleway/scaleway-ui/pull/2489) [`e416b11e`](https://github.com/scaleway/scaleway-ui/commit/e416b11e92de4feabcff1e2a0dfab597b562bc8e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.10.8`.
  Updated dependency `@emotion/styled` to `11.10.8`.
  Updated dependency `@emotion/babel-plugin` to `11.10.8`.
  Updated dependency `@emotion/cache` to `11.10.8`.
  Updated dependency `@emotion/jest` to `11.10.8`.

## 0.242.0

### Minor Changes

- [#2477](https://github.com/scaleway/scaleway-ui/pull/2477) [`53debe1f`](https://github.com/scaleway/scaleway-ui/commit/53debe1ff476df3a8e97c54a97e892534fde33b6) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `disabled` to `Alert` so it can disable the button

### Patch Changes

- [#2484](https://github.com/scaleway/scaleway-ui/pull/2484) [`210035a1`](https://github.com/scaleway/scaleway-ui/commit/210035a198f283ffc4b3ed7ebaf584a3034cbcf6) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Forward `data-testid` prop of ListV2's `Row` & `Cell`

## 0.241.0

### Minor Changes

- [#2464](https://github.com/scaleway/scaleway-ui/pull/2464) [`96f1ad3b`](https://github.com/scaleway/scaleway-ui/commit/96f1ad3ba182947fb3815dab18f141560d2c12d8) Thanks [@matthprost](https://github.com/matthprost)! - New data colors used into piechart and compatible with theme

- [#2469](https://github.com/scaleway/scaleway-ui/pull/2469) [`b3738e44`](https://github.com/scaleway/scaleway-ui/commit/b3738e44d0191e34b1c58baac971d94232c44409) Thanks [@matthprost](https://github.com/matthprost)! - Tooltip is now focusable for the voice over to be able to read it

- [#2473](https://github.com/scaleway/scaleway-ui/pull/2473) [`277bf359`](https://github.com/scaleway/scaleway-ui/commit/277bf3592f52791dea4f6e47470d02d063e659ae) Thanks [@matthprost](https://github.com/matthprost)! - - In `Alert` rename `onButtonClick` into `onClickButton`

  - In `Banner` rename prop `type` into `variant`

- [#2472](https://github.com/scaleway/scaleway-ui/pull/2472) [`69ed20af`](https://github.com/scaleway/scaleway-ui/commit/69ed20af0d484005eef92bccc6d8d534f4fd161d) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Remove `UnitInput` component

### Patch Changes

- [#2452](https://github.com/scaleway/scaleway-ui/pull/2452) [`997b8905`](https://github.com/scaleway/scaleway-ui/commit/997b8905cfeb36b276ae18a9cc6bd859f16b5726) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.0.38`.

## 0.240.0

### Minor Changes

- [#2405](https://github.com/scaleway/scaleway-ui/pull/2405) [`bf994fb0`](https://github.com/scaleway/scaleway-ui/commit/bf994fb0c2325809a77ad090727c25ace3c9e4bf) Thanks [@QuiiBz](https://github.com/QuiiBz)! - Add new `Banner` component

- [#2447](https://github.com/scaleway/scaleway-ui/pull/2447) [`ce1a9006`](https://github.com/scaleway/scaleway-ui/commit/ce1a900609037b7f4b9704d37cbd89cf176aea58) Thanks [@matthprost](https://github.com/matthprost)! - Removed `BorderedBox` and `Container` they were deprecated and have been replaced by new component `Card`

### Patch Changes

- [#2462](https://github.com/scaleway/scaleway-ui/pull/2462) [`49a7086e`](https://github.com/scaleway/scaleway-ui/commit/49a7086ee2023f153a2d42669d558d77149f1a95) Thanks [@fabienhebert](https://github.com/fabienhebert)! - Fix ButtonV2 font style

## 0.239.2

### Patch Changes

- [#2450](https://github.com/scaleway/scaleway-ui/pull/2450) [`ec0d20c1`](https://github.com/scaleway/scaleway-ui/commit/ec0d20c1dabe2ce0f1e81cffa8c4ce00e63aa2be) Thanks [@matthprost](https://github.com/matthprost)! - Remove `Toaster` dependency from `Toaster`

## 0.239.1

### Patch Changes

- [`1b58f5be`](https://github.com/scaleway/scaleway-ui/commit/1b58f5bebc8342f157b4cd4e2e6decc9557a51a1) Thanks [@matthprost](https://github.com/matthprost)! - Fix Alert useless `<Stack />` and fixed typing of `buttonText`

## 0.239.0

### Minor Changes

- [#2404](https://github.com/scaleway/scaleway-ui/pull/2404) [`8e140ed1`](https://github.com/scaleway/scaleway-ui/commit/8e140ed1c23702df2f2cbf48f40f92a7172b3bfd) Thanks [@matthprost](https://github.com/matthprost)! - Refactor of `Alert` component and new design

### Patch Changes

- [#2444](https://github.com/scaleway/scaleway-ui/pull/2444) [`3336ce12`](https://github.com/scaleway/scaleway-ui/commit/3336ce12eb33d40a52f0a6d1e640b7b18f207035) Thanks [@matthprost](https://github.com/matthprost)! - Added hover state on `TagsInput` and cursor `text` in css

## 0.238.0

### Minor Changes

- [#2424](https://github.com/scaleway/scaleway-ui/pull/2424) [`e40e9dfb`](https://github.com/scaleway/scaleway-ui/commit/e40e9dfb4aed5dadb28885ebb5e81b63240876a5) Thanks [@matthprost](https://github.com/matthprost)! - change state handle of `VerificationCode`

- [#2427](https://github.com/scaleway/scaleway-ui/pull/2427) [`82cda3ed`](https://github.com/scaleway/scaleway-ui/commit/82cda3ed475de268a0af25bd1c79b28966063774) Thanks [@matthprost](https://github.com/matthprost)! - `PasswordStrengthMeter` rename prop `userInputs` to `forbiddenInputs`

### Patch Changes

- [#2428](https://github.com/scaleway/scaleway-ui/pull/2428) [`12872cfe`](https://github.com/scaleway/scaleway-ui/commit/12872cfe782c7760a44efeddbfe70e0bd68b459d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.0.35`.

## 0.237.3

### Patch Changes

- [#2439](https://github.com/scaleway/scaleway-ui/pull/2439) [`a054026f`](https://github.com/scaleway/scaleway-ui/commit/a054026fac55f6dd68e69bb4db004578475361f8) Thanks [@ModuloM](https://github.com/ModuloM)! - fix(Card): rename data-is-active attribute to match React rules

## 0.237.2

### Patch Changes

- [#2425](https://github.com/scaleway/scaleway-ui/pull/2425) [`ad877a91`](https://github.com/scaleway/scaleway-ui/commit/ad877a918ded13325b0ae2613663e12ed1a4f67e) Thanks [@matthprost](https://github.com/matthprost)! - fix `Card` by changing the number of element in the dom depending on `header` prop

## 0.237.1

### Patch Changes

- [#2422](https://github.com/scaleway/scaleway-ui/pull/2422) [`05514454`](https://github.com/scaleway/scaleway-ui/commit/0551445475108d28ed8a6f758a25d6ca64d3e8c0) Thanks [@matthprost](https://github.com/matthprost)! - update pnpm version

## 0.237.0

### Minor Changes

- [#2378](https://github.com/scaleway/scaleway-ui/pull/2378) [`19195338`](https://github.com/scaleway/scaleway-ui/commit/19195338415a3a276975c11195fed5204304504a) Thanks [@matthprost](https://github.com/matthprost)! - New component Popover

### Patch Changes

- [#2418](https://github.com/scaleway/scaleway-ui/pull/2418) [`4ddd711c`](https://github.com/scaleway/scaleway-ui/commit/4ddd711cf809476252746ca18fbc1e8e7f5c8239) Thanks [@fabienhebert](https://github.com/fabienhebert)! - ListV2: click of expanded content do not collapse the row anymore

- [#2421](https://github.com/scaleway/scaleway-ui/pull/2421) [`480cf021`](https://github.com/scaleway/scaleway-ui/commit/480cf021124f51e742e77f2d77e91dbcdc96ff95) Thanks [@matthprost](https://github.com/matthprost)! - Fix `Card` component to accept `ref` property

## 0.236.0

### Minor Changes

- [#2416](https://github.com/scaleway/scaleway-ui/pull/2416) [`1fdd05ac`](https://github.com/scaleway/scaleway-ui/commit/1fdd05aca71e4fbc14ebdad56a8aaa241d670a2d) Thanks [@matthprost](https://github.com/matthprost)! - missing `Card` export

## 0.235.0

### Minor Changes

- [#2402](https://github.com/scaleway/scaleway-ui/pull/2402) [`e12eb27c`](https://github.com/scaleway/scaleway-ui/commit/e12eb27c121c23fe122aacc0793c35d959acd72a) Thanks [@fabienhebert](https://github.com/fabienhebert)! - ButtonV2 now supports href

## 0.234.0

### Minor Changes

- [#2412](https://github.com/scaleway/scaleway-ui/pull/2412) [`3661ff1a`](https://github.com/scaleway/scaleway-ui/commit/3661ff1a8a04ea8972ed52e4f545f26f891d9408) Thanks [@matthprost](https://github.com/matthprost)! - New component Card. It will replace Container and BorderedBox

- [#2412](https://github.com/scaleway/scaleway-ui/pull/2412) [`3661ff1a`](https://github.com/scaleway/scaleway-ui/commit/3661ff1a8a04ea8972ed52e4f545f26f891d9408) Thanks [@matthprost](https://github.com/matthprost)! - Add `aria-label` and `name` properties to button

- [#2412](https://github.com/scaleway/scaleway-ui/pull/2412) [`3661ff1a`](https://github.com/scaleway/scaleway-ui/commit/3661ff1a8a04ea8972ed52e4f545f26f891d9408) Thanks [@matthprost](https://github.com/matthprost)! - Add new `prominence` props to `Link` component

### Patch Changes

- Updated dependencies [[`3661ff1a`](https://github.com/scaleway/scaleway-ui/commit/3661ff1a8a04ea8972ed52e4f545f26f891d9408), [`3661ff1a`](https://github.com/scaleway/scaleway-ui/commit/3661ff1a8a04ea8972ed52e4f545f26f891d9408)]:
  - @scaleway/themes@1.3.0

## 0.233.0

### Minor Changes

- [#2390](https://github.com/scaleway/scaleway-ui/pull/2390) [`109317e9`](https://github.com/scaleway/scaleway-ui/commit/109317e9c216b3c1b85d60b06dd2f7db4f9a1559) Thanks [@matthprost](https://github.com/matthprost)! - Add ButtonV2 component

### Patch Changes

- [#2390](https://github.com/scaleway/scaleway-ui/pull/2390) [`109317e9`](https://github.com/scaleway/scaleway-ui/commit/109317e9c216b3c1b85d60b06dd2f7db4f9a1559) Thanks [@matthprost](https://github.com/matthprost)! - Fix flickering effect on tooltip when un-hovering

- [#2390](https://github.com/scaleway/scaleway-ui/pull/2390) [`109317e9`](https://github.com/scaleway/scaleway-ui/commit/109317e9c216b3c1b85d60b06dd2f7db4f9a1559) Thanks [@matthprost](https://github.com/matthprost)! - Updated dependency `react-datepicker` to `4.11.0`.

- [#2390](https://github.com/scaleway/scaleway-ui/pull/2390) [`109317e9`](https://github.com/scaleway/scaleway-ui/commit/109317e9c216b3c1b85d60b06dd2f7db4f9a1559) Thanks [@matthprost](https://github.com/matthprost)! - Updated dependency `@types/react` to `18.0.32`.

- [#2390](https://github.com/scaleway/scaleway-ui/pull/2390) [`109317e9`](https://github.com/scaleway/scaleway-ui/commit/109317e9c216b3c1b85d60b06dd2f7db4f9a1559) Thanks [@matthprost](https://github.com/matthprost)! - Updated dependency `@babel/core` to `7.21.4`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.21.4`.
  Updated dependency `@babel/preset-typescript` to `7.21.4`.
- Updated dependencies [[`109317e9`](https://github.com/scaleway/scaleway-ui/commit/109317e9c216b3c1b85d60b06dd2f7db4f9a1559)]:
  - @scaleway/themes@1.2.4

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.232.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.232.0...@scaleway/ui@0.232.1) (2023-03-31)

### :bug: Bug Fixes

- **VerificationCode:** correct data-id ([#2379](https://github.com/scaleway/scaleway-ui/issues/2379)) ([24ea7eb](https://github.com/scaleway/scaleway-ui/commit/24ea7eb2974865eed20bcdd556e2502017867338))

## [0.232.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.231.4...@scaleway/ui@0.232.0) (2023-03-31)

### :gear: Features

- **components:** add className and data-testid - Part 1 ([#2363](https://github.com/scaleway/scaleway-ui/issues/2363)) ([f350ffb](https://github.com/scaleway/scaleway-ui/commit/f350ffb6a8a39e9a866b39a0c401273322ef64a2)), closes [#2370](https://github.com/scaleway/scaleway-ui/issues/2370)

## [0.231.4](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.231.3...@scaleway/ui@0.231.4) (2023-03-30)

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.7.2 ([#2372](https://github.com/scaleway/scaleway-ui/issues/2372)) ([82c2113](https://github.com/scaleway/scaleway-ui/commit/82c21131270cf670ea41e437d7aa34b6e756e02b))

## 0.231.3 (2023-03-30)

### :package: Chore

- **release:** publish ([5be166d](https://github.com/scaleway/scaleway-ui/commit/5be166d10e4521f9427231a6bf8663d841a0a563))

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.1.2 ([#2373](https://github.com/scaleway/scaleway-ui/issues/2373)) ([7ed3699](https://github.com/scaleway/scaleway-ui/commit/7ed3699117ba091e12d86c1aaec7e91c62acb439))

## [0.231.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.231.1...@scaleway/ui@0.231.2) (2023-03-29)

### :zap: Refactor

- **Expandable:** smart expandable ([#2349](https://github.com/scaleway/scaleway-ui/issues/2349)) ([de2853a](https://github.com/scaleway/scaleway-ui/commit/de2853a91d50ca80639bbe09567ed2dfeb2d8766))

## [0.231.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.231.0...@scaleway/ui@0.231.1) (2023-03-29)

**Note:** Version bump only for package @scaleway/ui

## [0.231.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.230.0...@scaleway/ui@0.231.0) (2023-03-29)

### :gear: Features

- rename RowV2 to Row ([#2361](https://github.com/scaleway/scaleway-ui/issues/2361)) ([34881ed](https://github.com/scaleway/scaleway-ui/commit/34881ed9a918a43d7f3aa86901478b39387d614b))

## [0.230.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.10...@scaleway/ui@0.230.0) (2023-03-29)

### :gear: Features

- nuke unused Col/Row ([#2360](https://github.com/scaleway/scaleway-ui/issues/2360)) ([4e793a0](https://github.com/scaleway/scaleway-ui/commit/4e793a010af75bb5b832e64b382440a9675cf195))

## [0.229.10](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.9...@scaleway/ui@0.229.10) (2023-03-28)

### :white_check_mark: Test

- **lint:** add testing-library/react eslint plugin ([#2339](https://github.com/scaleway/scaleway-ui/issues/2339)) ([b9a6cff](https://github.com/scaleway/scaleway-ui/commit/b9a6cff7cb11c806f4595ba0d876b05883623e52))

## [0.229.9](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.8...@scaleway/ui@0.229.9) (2023-03-28)

### :bug: Bug Fixes

- **tooltip:** improve tooltip by hidding when generating positions ([#2359](https://github.com/scaleway/scaleway-ui/issues/2359)) ([df6fd6f](https://github.com/scaleway/scaleway-ui/commit/df6fd6f20dced947cebb6f4c5c22946960cb60ea))

## [0.229.8](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.7...@scaleway/ui@0.229.8) (2023-03-27)

### :bug: Bug Fixes

- remove unused deprecated Grid component ([#2348](https://github.com/scaleway/scaleway-ui/issues/2348)) ([fe4afe4](https://github.com/scaleway/scaleway-ui/commit/fe4afe4cd240b6e3f9b8cb9788113a00886115cd))

## [0.229.7](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.6...@scaleway/ui@0.229.7) (2023-03-27)

### :bug: Bug Fixes

- **NumberInput:** enable controlled NumberInput ([#2337](https://github.com/scaleway/scaleway-ui/issues/2337)) ([04f4859](https://github.com/scaleway/scaleway-ui/commit/04f4859aaf73ac76861370d9cdf02c5a2abb1c18))

### :memo: Documentation

- update documentation storybook ([#2324](https://github.com/scaleway/scaleway-ui/issues/2324)) ([39e7af5](https://github.com/scaleway/scaleway-ui/commit/39e7af5af8c2f258d1ef52cc329247a073d2ae26))

## [0.229.6](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.5...@scaleway/ui@0.229.6) (2023-03-27)

### :package: Chore

- **devdeps:** update dependency @types/react-datepicker to v4.10.0 ([#2352](https://github.com/scaleway/scaleway-ui/issues/2352)) ([b8a8fb0](https://github.com/scaleway/scaleway-ui/commit/b8a8fb0f00381ac4e7715c675cd9601a65ef12b3))

## 0.229.5 (2023-03-24)

### :package: Chore

- **release:** publish ([6e1f995](https://github.com/scaleway/scaleway-ui/commit/6e1f995e5605b4edd587b5ee06b91d3f5aff4616))

### :zap: Refactor

- **Breadcrumbs:** remove variants ([#2345](https://github.com/scaleway/scaleway-ui/issues/2345)) ([a96751a](https://github.com/scaleway/scaleway-ui/commit/a96751afa124bba4cf885c606646359239ee6c3e))

## 0.229.4 (2023-03-22)

### :package: Chore

- **release:** publish ([876048e](https://github.com/scaleway/scaleway-ui/commit/876048e3259e83190521d97ba17b0c768f8dc224))

### :bug: Bug Fixes

- expose rowV2 component ([#2338](https://github.com/scaleway/scaleway-ui/issues/2338)) ([223a17a](https://github.com/scaleway/scaleway-ui/commit/223a17aa2077dae24e2f09c776618d182af36332))
- **ListV2:** simplify row selection disabled usage ([#2336](https://github.com/scaleway/scaleway-ui/issues/2336)) ([7fae998](https://github.com/scaleway/scaleway-ui/commit/7fae998514513468cc9dd0f5e450e87dee22d324))

## [0.229.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.2...@scaleway/ui@0.229.3) (2023-03-21)

### :bug: Bug Fixes

- radio and checkbox error combined with disabled state ([#2333](https://github.com/scaleway/scaleway-ui/issues/2333)) ([3dfcec6](https://github.com/scaleway/scaleway-ui/commit/3dfcec62ebfbed55315cbea1132ed866b09de807))

## [0.229.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.229.1...@scaleway/ui@0.229.2) (2023-03-21)

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.7.1 ([#2320](https://github.com/scaleway/scaleway-ui/issues/2320)) ([cefaac9](https://github.com/scaleway/scaleway-ui/commit/cefaac9cf1a30e16299c24b1331ab5035996ba91))

## 0.229.1 (2023-03-21)

### :package: Chore

- **release:** publish ([5b0fd3f](https://github.com/scaleway/scaleway-ui/commit/5b0fd3f4828e1176ed8ed14d9167d98427a2d9d7))

### :bug: Bug Fixes

- **EmptyState:** export EmptyState component ([#2335](https://github.com/scaleway/scaleway-ui/issues/2335)) ([f727491](https://github.com/scaleway/scaleway-ui/commit/f727491a1b35f2a546a9e68df345252ff87ebaa6))

## [0.229.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.228.3...@scaleway/ui@0.229.0) (2023-03-20)

### :gear: Features

- **EmptyState:** add EmptyState component ([#2316](https://github.com/scaleway/scaleway-ui/issues/2316)) ([e4ebfb1](https://github.com/scaleway/scaleway-ui/commit/e4ebfb1794570b8cc62ad4d4ee689c0f8feb70ae))

## [0.228.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.228.2...@scaleway/ui@0.228.3) (2023-03-20)

### :bug: Bug Fixes

- **listV2:** add role to action bar ([#2332](https://github.com/scaleway/scaleway-ui/issues/2332)) ([fe339c5](https://github.com/scaleway/scaleway-ui/commit/fe339c56692e75db5de1c2e8696337bd06f6243b))

### :package: Chore

- **devdeps:** update babel monorepo ([#2323](https://github.com/scaleway/scaleway-ui/issues/2323)) ([98009be](https://github.com/scaleway/scaleway-ui/commit/98009be29c7e1c9d143e251f455f924b16c76ac5))

## [0.228.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.228.1...@scaleway/ui@0.228.2) (2023-03-20)

### :bug: Bug Fixes

- **deps:** update dependency deepmerge to v4.3.1 ([#2318](https://github.com/scaleway/scaleway-ui/issues/2318)) ([8ac45f3](https://github.com/scaleway/scaleway-ui/commit/8ac45f3e9e44673d577d10249b3c96ce5bfde406))

## [0.228.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.228.0...@scaleway/ui@0.228.1) (2023-03-20)

### :package: Chore

- **devdeps:** update react monorepo ([#2310](https://github.com/scaleway/scaleway-ui/issues/2310)) ([f9e013b](https://github.com/scaleway/scaleway-ui/commit/f9e013b646531bb8c0f8c49ba61b556eb98e2eff))

## [0.228.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.227.0...@scaleway/ui@0.228.0) (2023-03-20)

### :gear: Features

- **RowV2:** new component ([#2300](https://github.com/scaleway/scaleway-ui/issues/2300)) ([8eff127](https://github.com/scaleway/scaleway-ui/commit/8eff12736171b20f45f14ba94d0199d8c26ce83d))

## [0.227.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.226.0...@scaleway/ui@0.227.0) (2023-03-20)

### :gear: Features

- **StateBar:** remove StateBar component ([#2306](https://github.com/scaleway/scaleway-ui/issues/2306)) ([11000d8](https://github.com/scaleway/scaleway-ui/commit/11000d8edf3273d74055cbdee3df45bfa67b3da7))

## [0.226.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.225.1...@scaleway/ui@0.226.0) (2023-03-17)

### :gear: Features

- **description:** remove Description component from scw/ui ([#2305](https://github.com/scaleway/scaleway-ui/issues/2305)) ([42ddb6d](https://github.com/scaleway/scaleway-ui/commit/42ddb6d86e2bad37ad55df87caeb58db0c72a86d))

## [0.225.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.225.0...@scaleway/ui@0.225.1) (2023-03-17)

### :bug: Bug Fixes

- **verification_code:** set the right color ([#2304](https://github.com/scaleway/scaleway-ui/issues/2304)) ([018cbaa](https://github.com/scaleway/scaleway-ui/commit/018cbaa306b61b60ad5919cb43b1bcd471e3e306))

## [0.225.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.224.4...@scaleway/ui@0.225.0) (2023-03-17)

### :gear: Features

- **Icon:** new icon email-remove-outline ([#2302](https://github.com/scaleway/scaleway-ui/issues/2302)) ([ba16bc0](https://github.com/scaleway/scaleway-ui/commit/ba16bc096414dbda9021a16dba41e7a9d89b0901))

## [0.224.4](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.224.3...@scaleway/ui@0.224.4) (2023-03-16)

### :bug: Bug Fixes

- **stories:** fix and improve TextInput, Tabs and Bullet stories - DS-412 ([#2301](https://github.com/scaleway/scaleway-ui/issues/2301)) ([6fbd413](https://github.com/scaleway/scaleway-ui/commit/6fbd413f8e75a5db388d5c6dc661a4a1b7c277f8))

## [0.224.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.224.2...@scaleway/ui@0.224.3) (2023-03-16)

### :zap: Refactor

- **Label:** remove component ([#2298](https://github.com/scaleway/scaleway-ui/issues/2298)) ([a423959](https://github.com/scaleway/scaleway-ui/commit/a42395914e5d6d3b301e215f7e1a035955ed3908))

### :bug: Bug Fixes

- update snapshots with last node version ([#2303](https://github.com/scaleway/scaleway-ui/issues/2303)) ([a40ca9a](https://github.com/scaleway/scaleway-ui/commit/a40ca9aa966552c940b03e0c107fb41db14b57e3))

## [0.224.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.224.1...@scaleway/ui@0.224.2) (2023-03-15)

### :bug: Bug Fixes

- remove dead/stale exports ([#2299](https://github.com/scaleway/scaleway-ui/issues/2299)) ([aecb927](https://github.com/scaleway/scaleway-ui/commit/aecb927c2e6b446f5e2d295c52b0622c269450ad))

## [0.224.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.224.0...@scaleway/ui@0.224.1) (2023-03-09)

### :zap: Refactor

- **Sphere:** remove component ([#2297](https://github.com/scaleway/scaleway-ui/issues/2297)) ([457edb6](https://github.com/scaleway/scaleway-ui/commit/457edb6f51f3400f5dd5dcc85d7b38188ecdfb68))

## [0.224.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.223.4...@scaleway/ui@0.224.0) (2023-03-09)

### :gear: Features

- **Markdown:** remove component ([#2290](https://github.com/scaleway/scaleway-ui/issues/2290)) ([1b8d8cb](https://github.com/scaleway/scaleway-ui/commit/1b8d8cbde7a72781d2e9d34d0dd325bd357a1405))

### :zap: Refactor

- **DotSteps:** remove component ([#2293](https://github.com/scaleway/scaleway-ui/issues/2293)) ([e69707e](https://github.com/scaleway/scaleway-ui/commit/e69707eb543dfaedeee7cbdb21fef62c4fb4f773))
- **ScrollView:** remove component ([#2292](https://github.com/scaleway/scaleway-ui/issues/2292)) ([ca3be40](https://github.com/scaleway/scaleway-ui/commit/ca3be40b5bbde82ec815941b637f236a51bf8278))

### :bug: Bug Fixes

- scaleway ui to accept hmtlFor ([#2296](https://github.com/scaleway/scaleway-ui/issues/2296)) ([b638ca9](https://github.com/scaleway/scaleway-ui/commit/b638ca9740635c32201b3c5ac0966cd08634a009))
- **toaster:** improve placement and fix stories snippet ([#2291](https://github.com/scaleway/scaleway-ui/issues/2291)) ([6f1c966](https://github.com/scaleway/scaleway-ui/commit/6f1c966baba28e50dbd80457ff896581d61230e2))

## [0.223.4](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.223.3...@scaleway/ui@0.223.4) (2023-03-09)

### :bug: Bug Fixes

- menu and modal small issues ([#2294](https://github.com/scaleway/scaleway-ui/issues/2294)) ([179ed67](https://github.com/scaleway/scaleway-ui/commit/179ed678958b56c89fa3fc9c821fcccd0f6d8fc8))

## [0.223.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.223.2...@scaleway/ui@0.223.3) (2023-03-09)

### :bug: Bug Fixes

- correct non scalar default arguments as props ([#2255](https://github.com/scaleway/scaleway-ui/issues/2255)) ([28f2ce6](https://github.com/scaleway/scaleway-ui/commit/28f2ce6076327f296c22af5c811c0db12d2ab45e))

## [0.223.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.223.1...@scaleway/ui@0.223.2) (2023-03-09)

### :bug: Bug Fixes

- **Notice:** allow complex children ([#2295](https://github.com/scaleway/scaleway-ui/issues/2295)) ([97f58d1](https://github.com/scaleway/scaleway-ui/commit/97f58d199604cd6cdff82e0eb4a1f1c8321ad26e))

## [0.223.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.223.0...@scaleway/ui@0.223.1) (2023-03-06)

### :memo: Documentation

- new experimentals components in storybook ([#2284](https://github.com/scaleway/scaleway-ui/issues/2284)) ([0e8c2bc](https://github.com/scaleway/scaleway-ui/commit/0e8c2bc1dbf22f2291a153b4cb3786417cb9ee7f))

## [0.223.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.222.2...@scaleway/ui@0.223.0) (2023-03-06)

### :gear: Features

- **Notice:** rework component to remove markdown handling ([#2288](https://github.com/scaleway/scaleway-ui/issues/2288)) ([6aa9082](https://github.com/scaleway/scaleway-ui/commit/6aa908291771d044ebcd9387d4e8c0b604c0dff5))

## [0.222.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.222.1...@scaleway/ui@0.222.2) (2023-03-06)

**Note:** Version bump only for package @scaleway/ui

## [0.222.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.222.0...@scaleway/ui@0.222.1) (2023-03-04)

**Note:** Version bump only for package @scaleway/ui

## [0.222.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.221.2...@scaleway/ui@0.222.0) (2023-03-03)

### :gear: Features

- remove Image component ([#2285](https://github.com/scaleway/scaleway-ui/issues/2285)) ([9ba0a82](https://github.com/scaleway/scaleway-ui/commit/9ba0a820bbf3cfb55078816af1a5de5962f712e9))

## [0.221.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.221.1...@scaleway/ui@0.221.2) (2023-03-01)

### :bug: Bug Fixes

- **ListV2:** add list-select-checkbox name attr on checkboxes ([#2283](https://github.com/scaleway/scaleway-ui/issues/2283)) ([7aadedb](https://github.com/scaleway/scaleway-ui/commit/7aadedb2af2d9bf82614c6a743652b3e1ab2c43f))

## [0.221.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.221.0...@scaleway/ui@0.221.1) (2023-03-01)

### :bug: Bug Fixes

- **ListV2:** restore sorted column color ([#2282](https://github.com/scaleway/scaleway-ui/issues/2282)) ([580bd0a](https://github.com/scaleway/scaleway-ui/commit/580bd0a35245cb0fd1e017ed248745d4e81a5218))

## [0.221.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.220.4...@scaleway/ui@0.221.0) (2023-03-01)

### :gear: Features

- update listV2 usages ([#2270](https://github.com/scaleway/scaleway-ui/issues/2270)) ([8d56b2f](https://github.com/scaleway/scaleway-ui/commit/8d56b2f147b7685f7a0359a87d2fc08f2a35e06d))

## [0.220.4](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.220.3...@scaleway/ui@0.220.4) (2023-03-01)

### :bug: Bug Fixes

- **checkbox:** set the right color ([#2281](https://github.com/scaleway/scaleway-ui/issues/2281)) ([45db03e](https://github.com/scaleway/scaleway-ui/commit/45db03e07d89eda43f22f049b37e899943dd16dc))

## [0.220.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.220.2...@scaleway/ui@0.220.3) (2023-02-28)

**Note:** Version bump only for package @scaleway/ui

## [0.220.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.220.1...@scaleway/ui@0.220.2) (2023-02-27)

### :bug: Bug Fixes

- **NumberInput:** colors of icons and hover were wrong ([#2279](https://github.com/scaleway/scaleway-ui/issues/2279)) ([51529b5](https://github.com/scaleway/scaleway-ui/commit/51529b5884f5c8fcde73ecf51c74b85c77ea225b))

## [0.220.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.220.0...@scaleway/ui@0.220.1) (2023-02-27)

### :bug: Bug Fixes

- **Icon:** default value to currentColor ([#2280](https://github.com/scaleway/scaleway-ui/issues/2280)) ([ea3f8d4](https://github.com/scaleway/scaleway-ui/commit/ea3f8d43bece3f3f06a59787de65924de637ee63))

## [0.220.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.9...@scaleway/ui@0.220.0) (2023-02-27)

### :gear: Features

- **Icon:** new icon colors from theme ([#2274](https://github.com/scaleway/scaleway-ui/issues/2274)) ([cb2ec4f](https://github.com/scaleway/scaleway-ui/commit/cb2ec4ff9a4a5a32477eb1fae1f50d1e1f5c3313))

## [0.219.9](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.8...@scaleway/ui@0.219.9) (2023-02-24)

**Note:** Version bump only for package @scaleway/ui

## [0.219.8](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.7...@scaleway/ui@0.219.8) (2023-02-23)

### :bug: Bug Fixes

- use radii from theme ([#2271](https://github.com/scaleway/scaleway-ui/issues/2271)) ([8075443](https://github.com/scaleway/scaleway-ui/commit/8075443d1dba73e8bab3bccf15ddb50856883592))

## [0.219.7](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.6...@scaleway/ui@0.219.7) (2023-02-23)

### :bug: Bug Fixes

- **NumberInput:** primary color on hover on disabled state ([#2269](https://github.com/scaleway/scaleway-ui/issues/2269)) ([a7203f4](https://github.com/scaleway/scaleway-ui/commit/a7203f45eb94312e6c47b05d5c88a33bcf0eba16))
- **unitInput:** add border to disabled state and disable when there is only one option ([#2262](https://github.com/scaleway/scaleway-ui/issues/2262)) ([d6a1b11](https://github.com/scaleway/scaleway-ui/commit/d6a1b11621a0385ad1b943a7efc6674fd0083fa1))

## [0.219.6](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.5...@scaleway/ui@0.219.6) (2023-02-20)

### :package: Chore

- **devdeps:** update emotion monorepo to v11.10.6 ([#2268](https://github.com/scaleway/scaleway-ui/issues/2268)) ([8cb2fc8](https://github.com/scaleway/scaleway-ui/commit/8cb2fc8bb83e80fd2585b4f135235e3e985f922c))

## [0.219.5](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.4...@scaleway/ui@0.219.5) (2023-02-17)

### :bug: Bug Fixes

- **Checkbox:** to use radii from theme ([#2263](https://github.com/scaleway/scaleway-ui/issues/2263)) ([653b6ea](https://github.com/scaleway/scaleway-ui/commit/653b6ea136de0c26b650d50e51e3f8666486b3fb))

## [0.219.4](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.3...@scaleway/ui@0.219.4) (2023-02-16)

### :bug: Bug Fixes

- **textinput:** update margin separator value ([#2261](https://github.com/scaleway/scaleway-ui/issues/2261)) ([6f34e33](https://github.com/scaleway/scaleway-ui/commit/6f34e33b1ddd3a860a7fc71aec7fbe6068173450))

## [0.219.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.2...@scaleway/ui@0.219.3) (2023-02-15)

### :memo: Documentation

- fix documentation ([#2258](https://github.com/scaleway/scaleway-ui/issues/2258)) ([6c852f7](https://github.com/scaleway/scaleway-ui/commit/6c852f77cfd0f2987b6f3ae2ad2237636ffe8a3a))

## [0.219.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.1...@scaleway/ui@0.219.2) (2023-02-15)

### :memo: Documentation

- **ComponentState:** add link to each component main story ([#2259](https://github.com/scaleway/scaleway-ui/issues/2259)) ([69b6a0a](https://github.com/scaleway/scaleway-ui/commit/69b6a0a6d831cc244d4d81ef1f445a38b7b126ce))

## [0.219.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.219.0...@scaleway/ui@0.219.1) (2023-02-15)

### :bug: Bug Fixes

- **toggle:** add forward ref ([#2257](https://github.com/scaleway/scaleway-ui/issues/2257)) ([618a869](https://github.com/scaleway/scaleway-ui/commit/618a8698d06521e1df3f046af222dd946bb31799))

## [0.219.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.218.8...@scaleway/ui@0.219.0) (2023-02-13)

### :gear: Features

- split theme into another package ([#2247](https://github.com/scaleway/scaleway-ui/issues/2247)) ([1ac89e5](https://github.com/scaleway/scaleway-ui/commit/1ac89e58d19bac1cd40531bb4693ea9e927b32ef))

## [0.218.8](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.218.7...@scaleway/ui@0.218.8) (2023-02-13)

### :bug: Bug Fixes

- **Link:** default color to be info and new prop one line ([#2254](https://github.com/scaleway/scaleway-ui/issues/2254)) ([263927c](https://github.com/scaleway/scaleway-ui/commit/263927c1d380edf2df4ccfb6b399cc1b1767abdd))

## [0.218.7](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.218.6...@scaleway/ui@0.218.7) (2023-02-10)

### :bug: Bug Fixes

- **devdeps:** update all devdeps ([#2252](https://github.com/scaleway/scaleway-ui/issues/2252)) ([ce6cb78](https://github.com/scaleway/scaleway-ui/commit/ce6cb78bad37332d27f574e5f031c21f6e18bbb4))

## 0.218.6 (2023-02-10)

### :package: Chore

- **release:** publish ([ac835f3](https://github.com/scaleway/scaleway-ui/commit/ac835f34a113818bd16a94c2e1e877fec8743d56))

### :bug: Bug Fixes

- **SelectInput:** required icon to be 10px ([#2253](https://github.com/scaleway/scaleway-ui/issues/2253)) ([b6f3b1b](https://github.com/scaleway/scaleway-ui/commit/b6f3b1b64e90cb9f2ec2d06ad1c1961a7dd4979e))

## [0.218.5](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.218.4...@scaleway/ui@0.218.5) (2023-02-02)

### :bug: Bug Fixes

- **deps:** update dependency react-datepicker to v4.10.0 ([#2235](https://github.com/scaleway/scaleway-ui/issues/2235)) ([83a0ed6](https://github.com/scaleway/scaleway-ui/commit/83a0ed619e61c8ac47c99e281b59abaa168667c0))

## 0.218.4 (2023-02-02)

### :package: Chore

- **release:** publish ([d2108ca](https://github.com/scaleway/scaleway-ui/commit/d2108cad82284b34ac6e33967350239ef938e9ee))

### :zap: Refactor

- rename SelectNumber into NumberInput ([#2211](https://github.com/scaleway/scaleway-ui/issues/2211)) ([ec694b4](https://github.com/scaleway/scaleway-ui/commit/ec694b4bc65cf30d4b6d49217da47ddf43b3fd98))

### :bug: Bug Fixes

- **deps:** update dependency deepmerge to v4.3.0 ([#2239](https://github.com/scaleway/scaleway-ui/issues/2239)) ([8953c53](https://github.com/scaleway/scaleway-ui/commit/8953c53afab39c83ff53c145d2ff310b5b311eb4))

## [0.218.3](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.218.2...@scaleway/ui@0.218.3) (2023-02-02)

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/random-name to v4 ([#2231](https://github.com/scaleway/scaleway-ui/issues/2231)) ([187d62d](https://github.com/scaleway/scaleway-ui/commit/187d62dfb54037d36ba2f57b170a0c67ae498527))

## [0.218.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.218.1...@scaleway/ui@0.218.2) (2023-02-01)

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/use-media to v2 ([#2232](https://github.com/scaleway/scaleway-ui/issues/2232)) ([3f4fe00](https://github.com/scaleway/scaleway-ui/commit/3f4fe005f577b40fb37dedfaeea32c50bb018894))

## [0.218.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.218.0...@scaleway/ui@0.218.1) (2023-01-31)

### :memo: Documentation

- **Markdown:** fix deprecated parmeters in storybook ([#2227](https://github.com/scaleway/scaleway-ui/issues/2227)) ([7e7aa3d](https://github.com/scaleway/scaleway-ui/commit/7e7aa3dd8750c1cd9ba4ba1be91990c02e40efb5))

### :bug: Bug Fixes

- **description:** line height and margins ([#2226](https://github.com/scaleway/scaleway-ui/issues/2226)) ([1dfd316](https://github.com/scaleway/scaleway-ui/commit/1dfd31677fd528316056d82665c0f62e3887552c))
- toggle and checkbox to have required icon ([#2223](https://github.com/scaleway/scaleway-ui/issues/2223)) ([a0c3a56](https://github.com/scaleway/scaleway-ui/commit/a0c3a56e3ba51e77551a88b90c14791017d8bbec))

## [0.218.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.217.2...@scaleway/ui@0.218.0) (2023-01-27)

### :gear: Features

- **table:** add `striped` property update loading state and remove hover style ([#2222](https://github.com/scaleway/scaleway-ui/issues/2222)) ([2768808](https://github.com/scaleway/scaleway-ui/commit/2768808a8d978234784123ad6456c89c0706aa0d))

## [0.217.2](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.217.1...@scaleway/ui@0.217.2) (2023-01-27)

### :zap: Refactor

- **components:** rename TagsPopList to TagList ([#2224](https://github.com/scaleway/scaleway-ui/issues/2224)) ([4af642d](https://github.com/scaleway/scaleway-ui/commit/4af642dc0966a513dbe437ff0dd0feba51ba9ee7))

## [0.217.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.217.0...@scaleway/ui@0.217.1) (2023-01-26)

### :bug: Bug Fixes

- **Button:** stack has direction column by default ([#2225](https://github.com/scaleway/scaleway-ui/issues/2225)) ([27bf78e](https://github.com/scaleway/scaleway-ui/commit/27bf78ec1a00dc8f5ed6d54a68de659662b85566))

## 0.217.0 (2023-01-26)

### :package: Chore

- **release:** publish ([6329ac3](https://github.com/scaleway/scaleway-ui/commit/6329ac3f95d2ca375126f124db0ea8cc5b5691f1))

### :gear: Features

- **tooltip:** improve tooltip behavior and fix some issues ([#2209](https://github.com/scaleway/scaleway-ui/issues/2209)) ([7c6ea37](https://github.com/scaleway/scaleway-ui/commit/7c6ea376aac22e959f2701e08f963abe4748ff0c))

## [0.216.1](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.216.0...@scaleway/ui@0.216.1) (2023-01-25)

### :zap: Refactor

- rename placeholder to skeleton ([#2217](https://github.com/scaleway/scaleway-ui/issues/2217)) ([d639eb5](https://github.com/scaleway/scaleway-ui/commit/d639eb58f0bf32dbffdd70416a2fda2f3cc7e308))

## [0.216.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.27...@scaleway/ui@0.216.0) (2023-01-25)

### :gear: Features

- **Text:** add `dir` prop ([#2219](https://github.com/scaleway/scaleway-ui/issues/2219)) ([772d429](https://github.com/scaleway/scaleway-ui/commit/772d4290335df1801ff5564b352509943e80efa6))

## [0.215.27](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.26...@scaleway/ui@0.215.27) (2023-01-24)

### :zap: Refactor

- **Tags+TagsField:** rename Tags and TagsField to TagInput and TagInputField ([#2218](https://github.com/scaleway/scaleway-ui/issues/2218)) ([eb4c22f](https://github.com/scaleway/scaleway-ui/commit/eb4c22f36ba15789c45c0955ba2afc0ded718f80))

## [0.215.26](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.25...@scaleway/ui@0.215.26) (2023-01-24)

### :bug: Bug Fixes

- **Button:** proper layout on extend buttons ([#2154](https://github.com/scaleway/scaleway-ui/issues/2154)) ([21456c0](https://github.com/scaleway/scaleway-ui/commit/21456c0eb876e49ceca3f87be4657b620ef313a3))
- **Separator:** background color in dark theme ([#2214](https://github.com/scaleway/scaleway-ui/issues/2214)) ([c9647fc](https://github.com/scaleway/scaleway-ui/commit/c9647fcf83fccdd95157c52a2bbffb7cf959ea00))
- **TooltipIcon:** remove component ([#2215](https://github.com/scaleway/scaleway-ui/issues/2215)) ([62c4cd4](https://github.com/scaleway/scaleway-ui/commit/62c4cd428876de1d4ea7452f01372c784b64a68a))

## [0.215.25](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.24...@scaleway/ui@0.215.25) (2023-01-23)

### :zap: Refactor

- **RichSelect:** renamed RichSelect and RichSelectField to Selec… ([#2216](https://github.com/scaleway/scaleway-ui/issues/2216)) ([5b6d970](https://github.com/scaleway/scaleway-ui/commit/5b6d970d8825867cc5e74b618aae3bf1865b567c))

## [0.215.24](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.23...@scaleway/ui@0.215.24) (2023-01-23)

### :bug: Bug Fixes

- **Slider:** rename Slider component to Carousel ([#2213](https://github.com/scaleway/scaleway-ui/issues/2213)) ([bd44e78](https://github.com/scaleway/scaleway-ui/commit/bd44e780151b16192032c9311d25dca486699e43))

## [0.215.23](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.22...@scaleway/ui@0.215.23) (2023-01-23)

### :bug: Bug Fixes

- code clean up ([#2210](https://github.com/scaleway/scaleway-ui/issues/2210)) ([f8bfb95](https://github.com/scaleway/scaleway-ui/commit/f8bfb9556e3b9d1449d9fc77c978e21d38aae1d6))

## [0.215.22](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.21...@scaleway/ui@0.215.22) (2023-01-19)

### :bug: Bug Fixes

- **TextBoxField:** forward `size` prop to TextBox ([#2206](https://github.com/scaleway/scaleway-ui/issues/2206)) ([429c391](https://github.com/scaleway/scaleway-ui/commit/429c391b4c60bbea0d39a4cd1d53b5fcf764d379))
- **Text:** show tooltip on ellipsis only when needed ([#2192](https://github.com/scaleway/scaleway-ui/issues/2192)) ([aaa48d0](https://github.com/scaleway/scaleway-ui/commit/aaa48d03e0480b51aadcca0774abb2bb3fc77363))

### :package: Chore

- fix ci ([#2208](https://github.com/scaleway/scaleway-ui/issues/2208)) ([94f957a](https://github.com/scaleway/scaleway-ui/commit/94f957a926893ce064d3a504115f11f5917d3451))

## 0.215.21 (2023-01-19)

### :package: Chore

- **release:** publish ([ae9541b](https://github.com/scaleway/scaleway-ui/commit/ae9541b7c25ddfb0c4933f0c43a5aebec510e920))

### :zap: Refactor

- **components:** rename TextBox and TextBoxField to TextInput an… ([#2207](https://github.com/scaleway/scaleway-ui/issues/2207)) ([e185c34](https://github.com/scaleway/scaleway-ui/commit/e185c34b19bcd25439910d9b884c1c41701d6dff))

## [0.215.20](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.19...@scaleway/ui@0.215.20) (2023-01-17)

### :zap: Refactor

- **export:** use named export ([#2203](https://github.com/scaleway/scaleway-ui/issues/2203)) ([7e0a8d8](https://github.com/scaleway/scaleway-ui/commit/7e0a8d84c8283041638dd457c042108ab838b6ad))

## [0.215.19](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.18...@scaleway/ui@0.215.19) (2023-01-16)

### :bug: Bug Fixes

- **Toggle:** use gap instead of margin for `label` content ([#2199](https://github.com/scaleway/scaleway-ui/issues/2199)) ([93908d5](https://github.com/scaleway/scaleway-ui/commit/93908d5ba34fa1c62db111638d98743f3d1b4759))

## [0.215.18](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.17...@scaleway/ui@0.215.18) (2023-01-16)

### :white_check_mark: Test

- improve code coverage on verification code and slider ([#2196](https://github.com/scaleway/scaleway-ui/issues/2196)) ([1cea33e](https://github.com/scaleway/scaleway-ui/commit/1cea33e0f05088f7908300494a9af7e13704ad1f))

## [0.215.17](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.16...@scaleway/ui@0.215.17) (2023-01-16)

### :memo: Documentation

- improve dark theme documentation ([#2193](https://github.com/scaleway/scaleway-ui/issues/2193)) ([4fedae0](https://github.com/scaleway/scaleway-ui/commit/4fedae07ad4eb52e1c86c4f7981cf60e5bfe714f))

### :bug: Bug Fixes

- **Markdown:** deprecated ([#2202](https://github.com/scaleway/scaleway-ui/issues/2202)) ([3f9b8d1](https://github.com/scaleway/scaleway-ui/commit/3f9b8d1ee346eef0c923b8bd837036e3feefaa2b))

## [0.215.16](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.15...@scaleway/ui@0.215.16) (2023-01-16)

### :bug: Bug Fixes

- **deps:** update dependency final-form to v4.20.8 ([#2198](https://github.com/scaleway/scaleway-ui/issues/2198)) ([13a5dd0](https://github.com/scaleway/scaleway-ui/commit/13a5dd007bb176a5386eca7e6e5bd12a12df1279))
- **RichSelect:** storybook play selector is wrong ([#2200](https://github.com/scaleway/scaleway-ui/issues/2200)) ([da53b0a](https://github.com/scaleway/scaleway-ui/commit/da53b0a6e4c32627b4dda7aae40d544b9bb6ddce))

## [0.215.15](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.14...@scaleway/ui@0.215.15) (2023-01-10)

### :memo: Documentation

- **form:** update git repository ([#2187](https://github.com/scaleway/scaleway-ui/issues/2187)) ([1840a08](https://github.com/scaleway/scaleway-ui/commit/1840a08adc85fe127c982595361d3e2136b4923a))

## [0.215.14](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.13...@scaleway/ui@0.215.14) (2023-01-10)

### :bug: Bug Fixes

- **Button:** wrong overflow on extend ([#2191](https://github.com/scaleway/scaleway-ui/issues/2191)) ([d5677f0](https://github.com/scaleway/scaleway-ui/commit/d5677f0ac6b8c042c72f2c19101b4ec4df93ae78))

### :zap: Refactor

- **ActionBar:** remove z-index by using portal and add animation on display ([#2179](https://github.com/scaleway/scaleway-ui/issues/2179)) ([9ca6fbb](https://github.com/scaleway/scaleway-ui/commit/9ca6fbb8a808afe8e242b18678c49e5cc67b7a07))

## [0.215.13](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.12...@scaleway/ui@0.215.13) (2023-01-10)

### :bug: Bug Fixes

- **TextBox:** required icon wrongly positioned ([#2188](https://github.com/scaleway/scaleway-ui/issues/2188)) ([282943c](https://github.com/scaleway/scaleway-ui/commit/282943c4932da65067bd86f11d1c915c9bbfc3ad))

## 0.215.12 (2023-01-09)

### :package: Chore

- **release:** publish ([920ac02](https://github.com/scaleway/scaleway-ui/commit/920ac0292722ad268eaac27d804eccf668a526ec))

### :memo: Documentation

- update toaster doc and add all component into categories ([#2167](https://github.com/scaleway/scaleway-ui/issues/2167)) ([70fe3fd](https://github.com/scaleway/scaleway-ui/commit/70fe3fd8b56ad74bd4e2a33433fd2dcdb9bf03e9))

## [0.215.11](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.10...@scaleway/ui@0.215.11) (2023-01-06)

### :bug: Bug Fixes

- remove Pentagon and NavigationStepper ([#2170](https://github.com/scaleway/scaleway-ui/issues/2170)) ([4bd8c8b](https://github.com/scaleway/scaleway-ui/commit/4bd8c8bedf965f4bf7f9f0bff597bf33269ff232))

## [0.215.10](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.9...@scaleway/ui@0.215.10) (2023-01-06)

### :package: Chore

- **devDeps:** upgrade deps ([#2180](https://github.com/scaleway/scaleway-ui/issues/2180)) ([54daa9e](https://github.com/scaleway/scaleway-ui/commit/54daa9e2f8c6213d3d4a34d4135b3c7d635a788b))

## 0.215.9 (2023-01-05)

### :package: Chore

- **release:** publish ([f25f5d8](https://github.com/scaleway/scaleway-ui/commit/f25f5d88597931b3d4823c173ce428e94ec91116))

### :bug: Bug Fixes

- **TimeInput:** required icon correct position ([#2174](https://github.com/scaleway/scaleway-ui/issues/2174)) ([cfab3b8](https://github.com/scaleway/scaleway-ui/commit/cfab3b810b4074a4ca0d56c2a5370d5383b7809c))

## [0.215.8](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.7...@scaleway/ui@0.215.8) (2023-01-05)

### :bug: Bug Fixes

- **actionBar:** remove padding and center content from list action bar ([#2165](https://github.com/scaleway/scaleway-ui/issues/2165)) ([f80a863](https://github.com/scaleway/scaleway-ui/commit/f80a863bef26ee0b4987e620cc278b6b2cd073b4))
- **TextBox:** show required icon with right components ([#2166](https://github.com/scaleway/scaleway-ui/issues/2166)) ([b21dac6](https://github.com/scaleway/scaleway-ui/commit/b21dac629418980af872bcb0d3120d8588859b6c))

## [0.215.7](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.6...@scaleway/ui@0.215.7) (2023-01-05)

### :memo: Documentation

- add main README and updated documentation usages ([#2169](https://github.com/scaleway/scaleway-ui/issues/2169)) ([3ce44be](https://github.com/scaleway/scaleway-ui/commit/3ce44be107c4fc2454830910d69730f244ade603))

## [0.215.6](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.5...@scaleway/ui@0.215.6) (2023-01-04)

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/use-media to v1.2.2 ([#2159](https://github.com/scaleway/scaleway-ui/issues/2159)) ([8948b7f](https://github.com/scaleway/scaleway-ui/commit/8948b7fd681d6d70ea256949597a60529f987029))

## [0.215.5](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.215.4...@scaleway/ui@0.215.5) (2023-01-03)

### Bug Fixes

- **Button:** manage flex display on tooltip ([#2155](https://github.com/scaleway/scaleway-ui/issues/2155)) ([387cf39](https://github.com/scaleway/scaleway-ui/commit/387cf397d3ac1d07f70e17b483628de0e0b8e591))

## 0.215.4 (2023-01-03)

**Note:** Version bump only for package @scaleway/ui

## 0.215.3 (2023-01-02)

### Bug Fixes

- **List:** fix sort type to allow numbers ([#2160](https://github.com/scaleway/scaleway-ui/issues/2160)) ([ef44857](https://github.com/scaleway/scaleway-ui/commit/ef4485746c31adcb8f9c2df1e31cd71d5c641fcc))

## 0.215.2 (2023-01-01)

### Bug Fixes

- **deps:** update dependency @scaleway/random-name to v3.0.3 ([#2158](https://github.com/scaleway/scaleway-ui/issues/2158)) ([c154448](https://github.com/scaleway/scaleway-ui/commit/c15444869f1e554c163f3cd4609fd8c82d92b18c))

## 0.215.1 (2022-12-28)

### Bug Fixes

- **tagsFields:** defaultValues was not working ([#2147](https://github.com/scaleway/scaleway-ui/issues/2147)) ([219f584](https://github.com/scaleway/scaleway-ui/commit/219f58436377d7f604882cee6f9dbcbf3e655702))

## [0.215.0](https://github.com/scaleway/scaleway-ui/compare/@scaleway/ui@0.214.4...@scaleway/ui@0.215.0) (2022-12-27)

### Features

- **form:** port scaleway-form ([#2143](https://github.com/scaleway/scaleway-ui/issues/2143)) ([bd5eb6b](https://github.com/scaleway/scaleway-ui/commit/bd5eb6b0247443ca15e90d1653a08f7bfe8993e1))

## 0.214.4 (2022-12-27)

**Note:** Version bump only for package @scaleway/ui

## [0.214.3](https://github.com/scaleway/scaleway-ui/compare/v0.214.2...v0.214.3) (2022-12-21)

### :bug: Bug Fixes

- **Button:** remove Link animation when using href ([#2136](https://github.com/scaleway/scaleway-ui/issues/2136)) ([850f00a](https://github.com/scaleway/scaleway-ui/commit/850f00ac631e9c6ce624c6c0765306b0d3bf6d52))

## [0.214.2](https://github.com/scaleway/scaleway-ui/compare/v0.214.1...v0.214.2) (2022-12-21)

### :bug: Bug Fixes

- **Tags:** revert focusing input onChange ([#2125](https://github.com/scaleway/scaleway-ui/issues/2125)) ([dd2b4e6](https://github.com/scaleway/scaleway-ui/commit/dd2b4e64664235e7b5456fb3c57f585a9a331cb0))

## [0.214.1](https://github.com/scaleway/scaleway-ui/compare/v0.214.0...v0.214.1) (2022-12-21)

### :repeat: CI

- update eslint config with latest guidelines ([#2135](https://github.com/scaleway/scaleway-ui/issues/2135)) ([8498c7e](https://github.com/scaleway/scaleway-ui/commit/8498c7e24f9f469129ba61c039756d5a82ad956a))

### :bug: Bug Fixes

- **Icon:** merge add and remove icons ([#2137](https://github.com/scaleway/scaleway-ui/issues/2137)) ([204b1e2](https://github.com/scaleway/scaleway-ui/commit/204b1e20c87e8a296d78664923124ebb9379098f))
- **label:** update label properties ([#2129](https://github.com/scaleway/scaleway-ui/issues/2129)) ([9a8d52b](https://github.com/scaleway/scaleway-ui/commit/9a8d52b060e1de0733a9342e3705a3b25bdde230))

## [0.214.0](https://github.com/scaleway/scaleway-ui/compare/v0.213.10...v0.214.0) (2022-12-20)

### :package: Chore

- **devdeps:** update actions/checkout action to v3.2.0 ([#2134](https://github.com/scaleway/scaleway-ui/issues/2134)) ([83f4eba](https://github.com/scaleway/scaleway-ui/commit/83f4eba908d2ece825fa484320b459721a7c8c8e))
- **devdeps:** update dependency @types/node to v18.11.17 ([#2133](https://github.com/scaleway/scaleway-ui/issues/2133)) ([b75863d](https://github.com/scaleway/scaleway-ui/commit/b75863d29d85be943fb5b69766ead770f7416922))

### :gear: Features

- remove Box and xstyled ([#2139](https://github.com/scaleway/scaleway-ui/issues/2139)) ([b1f5182](https://github.com/scaleway/scaleway-ui/commit/b1f51823ee760ae591029732d2bf51b510878fdc))

## [0.213.10](https://github.com/scaleway/scaleway-ui/compare/v0.213.9...v0.213.10) (2022-12-20)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.11.2 ([#2127](https://github.com/scaleway/scaleway-ui/issues/2127)) ([4769f11](https://github.com/scaleway/scaleway-ui/commit/4769f11c07954e9853904e121e048a3210dee641))
- **devdeps:** update dependency @scaleway/use-i18n to v4.1.5 ([#2128](https://github.com/scaleway/scaleway-ui/issues/2128)) ([ad6ba2d](https://github.com/scaleway/scaleway-ui/commit/ad6ba2dae6fd930c4cf1d04f444c1177e800e82a))
- **devdeps:** update dependency @types/node to v18.11.15 ([#2121](https://github.com/scaleway/scaleway-ui/issues/2121)) ([8a380a0](https://github.com/scaleway/scaleway-ui/commit/8a380a0364bd9b4629425be0ac985bd01daace56))
- **devdeps:** update nextjs monorepo to v13.0.7 ([#2130](https://github.com/scaleway/scaleway-ui/issues/2130)) ([9d2814e](https://github.com/scaleway/scaleway-ui/commit/9d2814e612243c1772dfb050fc99a3ca964668fd))

### :bug: Bug Fixes

- remove box list ([#2117](https://github.com/scaleway/scaleway-ui/issues/2117)) ([4b9c084](https://github.com/scaleway/scaleway-ui/commit/4b9c08442c24230d92fba979bad2c7cedf6feb87))

## [0.213.9](https://github.com/scaleway/scaleway-ui/compare/v0.213.8...v0.213.9) (2022-12-15)

### :bug: Bug Fixes

- unselect all when no selectable rows ([#2124](https://github.com/scaleway/scaleway-ui/issues/2124)) ([bafc77d](https://github.com/scaleway/scaleway-ui/commit/bafc77d31cc1eb6ffcbf0f8ec4aa7ab906468c15))

## [0.213.8](https://github.com/scaleway/scaleway-ui/compare/v0.213.7...v0.213.8) (2022-12-15)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.11.0 ([#2122](https://github.com/scaleway/scaleway-ui/issues/2122)) ([c1238ac](https://github.com/scaleway/scaleway-ui/commit/c1238acf1d5d7c63ae0711af61a6bf8f9a91102b))

### :bug: Bug Fixes

- **actionBar:** display flex is missing for alignement ([#2123](https://github.com/scaleway/scaleway-ui/issues/2123)) ([e33b7c1](https://github.com/scaleway/scaleway-ui/commit/e33b7c15b0bbb88b083ce92dee09d215b14a0906))

## [0.213.7](https://github.com/scaleway/scaleway-ui/compare/v0.213.6...v0.213.7) (2022-12-14)

### :bug: Bug Fixes

- **menu:** border radius and color on dark mode ([#2120](https://github.com/scaleway/scaleway-ui/issues/2120)) ([70395de](https://github.com/scaleway/scaleway-ui/commit/70395deec19420ea3cc0e7a146c23f3a424be3ab))

## [0.213.6](https://github.com/scaleway/scaleway-ui/compare/v0.213.5...v0.213.6) (2022-12-12)

### :package: Chore

- **devdeps:** update dependency @types/node to v18.11.13 ([#2113](https://github.com/scaleway/scaleway-ui/issues/2113)) ([ac02174](https://github.com/scaleway/scaleway-ui/commit/ac02174ddd7a359881bb0a6bd45e288c5f83b3ee))

### :bug: Bug Fixes

- rerender loop ([#2119](https://github.com/scaleway/scaleway-ui/issues/2119)) ([102146d](https://github.com/scaleway/scaleway-ui/commit/102146d3ec3a9572acf4075fe5cbc4e8e98b81a4))

## [0.213.5](https://github.com/scaleway/scaleway-ui/compare/v0.213.4...v0.213.5) (2022-12-12)

### :memo: Documentation

- properties usages ([#2103](https://github.com/scaleway/scaleway-ui/issues/2103)) ([4cfb8d9](https://github.com/scaleway/scaleway-ui/commit/4cfb8d9c4d1211ceaebb504b80c829291bd8b8f6))

### :zap: Refactor

- remove polished dependency ([#2112](https://github.com/scaleway/scaleway-ui/issues/2112)) ([bd32670](https://github.com/scaleway/scaleway-ui/commit/bd32670f831e293d4f55dcb79aa58a47fd566752))

### :bug: Bug Fixes

- **toaster:** wrong variant for error ([#2118](https://github.com/scaleway/scaleway-ui/issues/2118)) ([3e11c67](https://github.com/scaleway/scaleway-ui/commit/3e11c67a23ea5732953ef33aa66d3a52479c5645))

## [0.213.4](https://github.com/scaleway/scaleway-ui/compare/v0.213.3...v0.213.4) (2022-12-12)

### :package: Chore

- **devdeps:** update dependency @scaleway/jest-helpers to v2.0.24 ([#2114](https://github.com/scaleway/scaleway-ui/issues/2114)) ([5abf3e6](https://github.com/scaleway/scaleway-ui/commit/5abf3e62b86b9047faa106e8c8c0d266682c47ab))
- **devdeps:** update dependency @scaleway/use-i18n to v4.1.4 ([#2115](https://github.com/scaleway/scaleway-ui/issues/2115)) ([0d4569a](https://github.com/scaleway/scaleway-ui/commit/0d4569acd682b25f4b3ff9ae8f2f2f1332abea42))

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/use-media to v1.2.1 ([#2116](https://github.com/scaleway/scaleway-ui/issues/2116)) ([03d813f](https://github.com/scaleway/scaleway-ui/commit/03d813f524e0abc8cd6f445f2fa635ebb41938c0))

## [0.213.3](https://github.com/scaleway/scaleway-ui/compare/v0.213.2...v0.213.3) (2022-12-09)

### :package: Chore

- **devdeps:** update dependency typescript to v4.9.4 ([#2110](https://github.com/scaleway/scaleway-ui/issues/2110)) ([fa72445](https://github.com/scaleway/scaleway-ui/commit/fa72445b2d7cd21a3f29489cff6b327e8e4966f0))

### :bug: Bug Fixes

- typing of new list ([#2111](https://github.com/scaleway/scaleway-ui/issues/2111)) ([1862931](https://github.com/scaleway/scaleway-ui/commit/1862931222e911a96cdb751f073de26d94d2560e))

## [0.213.2](https://github.com/scaleway/scaleway-ui/compare/v0.213.1...v0.213.2) (2022-12-09)

### :bug: Bug Fixes

- action bar display ([#2109](https://github.com/scaleway/scaleway-ui/issues/2109)) ([d714a3a](https://github.com/scaleway/scaleway-ui/commit/d714a3a7dc21f0c14da32c91ea6129b425eed0f9))

## [0.213.1](https://github.com/scaleway/scaleway-ui/compare/v0.213.0...v0.213.1) (2022-12-08)

### :zap: Refactor

- **alert:** type to variant prop ([#2095](https://github.com/scaleway/scaleway-ui/issues/2095)) ([64950a0](https://github.com/scaleway/scaleway-ui/commit/64950a0e8582c3cfc3782de4fe96b9ca47039084))

### :bug: Bug Fixes

- **Checkbox:** remove margin when empty ([#2101](https://github.com/scaleway/scaleway-ui/issues/2101)) ([0e8d835](https://github.com/scaleway/scaleway-ui/commit/0e8d8354d6c3a1878f6878f1c86c38c175971094))

## [0.213.0](https://github.com/scaleway/scaleway-ui/compare/v0.212.11...v0.213.0) (2022-12-08)

### :gear: Features

- new list component ([#2102](https://github.com/scaleway/scaleway-ui/issues/2102)) ([4d59d16](https://github.com/scaleway/scaleway-ui/commit/4d59d16d247ce8f59fb8e8f3a93ba59f2a6a0cf7))

## [0.212.11](https://github.com/scaleway/scaleway-ui/compare/v0.212.10...v0.212.11) (2022-12-08)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.10.5 ([#2105](https://github.com/scaleway/scaleway-ui/issues/2105)) ([ad6c01e](https://github.com/scaleway/scaleway-ui/commit/ad6c01e1666ef4ff18196b2a69a367c118f8f33a))
- **devdeps:** update dependency @scaleway/jest-helpers to v2.0.23 ([#2106](https://github.com/scaleway/scaleway-ui/issues/2106)) ([b5386af](https://github.com/scaleway/scaleway-ui/commit/b5386af30717fcee3ab9f2222a38e19e121dbe2d))
- **devdeps:** update dependency eslint to v8.29.0 ([#2104](https://github.com/scaleway/scaleway-ui/issues/2104)) ([96fcce7](https://github.com/scaleway/scaleway-ui/commit/96fcce734a3a585f781a707c72045b43a4e42fd9))

### :bug: Bug Fixes

- **RichSelect, ScrollView:** clean stories ([#2098](https://github.com/scaleway/scaleway-ui/issues/2098)) ([2ecc95a](https://github.com/scaleway/scaleway-ui/commit/2ecc95a3854af9b18dbdc4a2516056d2a264527d))

## [0.212.10](https://github.com/scaleway/scaleway-ui/compare/v0.212.9...v0.212.10) (2022-12-08)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v4.1.3 ([#2107](https://github.com/scaleway/scaleway-ui/issues/2107)) ([6f37323](https://github.com/scaleway/scaleway-ui/commit/6f37323652be8d8d58b9f71462afdbac2a1acc31))

### :bug: Bug Fixes

- **list:** tooltip never disapear after hover on disabled checkbox ([#2092](https://github.com/scaleway/scaleway-ui/issues/2092)) ([d8d36eb](https://github.com/scaleway/scaleway-ui/commit/d8d36ebb108fd5387c29dd9e5ee87d85317e7271))
- **tabs:** vertical scroll triggred on page load ([#2100](https://github.com/scaleway/scaleway-ui/issues/2100)) ([fd6da30](https://github.com/scaleway/scaleway-ui/commit/fd6da30666ff44601b249e406fb4145f961befe5))

## [0.212.9](https://github.com/scaleway/scaleway-ui/compare/v0.212.8...v0.212.9) (2022-12-07)

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.7.0 ([#2090](https://github.com/scaleway/scaleway-ui/issues/2090)) ([8aaee88](https://github.com/scaleway/scaleway-ui/commit/8aaee88dcc3b81acfe5a4fcd22adba503c05838c))

## [0.212.8](https://github.com/scaleway/scaleway-ui/compare/v0.212.7...v0.212.8) (2022-12-07)

### :zap: Refactor

- rewrite stories toggle tooltipicon unitinput ([#2086](https://github.com/scaleway/scaleway-ui/issues/2086)) ([549eb77](https://github.com/scaleway/scaleway-ui/commit/549eb779badf8638c43ee7d2ea25b74e24f82f96))
- **RichSelect, ScrollView:** migrate stories ([#2080](https://github.com/scaleway/scaleway-ui/issues/2080)) ([d03de08](https://github.com/scaleway/scaleway-ui/commit/d03de082e48133a26ce54eebeccc370b85ba49df))

### :package: Chore

- **devdeps:** update dependency @types/node to v18.11.11 ([#2096](https://github.com/scaleway/scaleway-ui/issues/2096)) ([4e6c9f9](https://github.com/scaleway/scaleway-ui/commit/4e6c9f9acc0eda57bd88f344a3d5971910d06ef1))

### :bug: Bug Fixes

- remove box from textbox ([#2097](https://github.com/scaleway/scaleway-ui/issues/2097)) ([9468dc6](https://github.com/scaleway/scaleway-ui/commit/9468dc683ef14423ba3005e7e613290a5d179d6c))

## [0.212.7](https://github.com/scaleway/scaleway-ui/compare/v0.212.6...v0.212.7) (2022-12-06)

### :bug: Bug Fixes

- **Menu.Item:** add missing className prop ([#2094](https://github.com/scaleway/scaleway-ui/issues/2094)) ([ec2bf1d](https://github.com/scaleway/scaleway-ui/commit/ec2bf1d984ac776c151404a58f35238b745ce9d8))

## [0.212.6](https://github.com/scaleway/scaleway-ui/compare/v0.212.5...v0.212.6) (2022-12-06)

### :zap: Refactor

- rewrite stories textbox and timeinput ([#2075](https://github.com/scaleway/scaleway-ui/issues/2075)) ([8dbd91c](https://github.com/scaleway/scaleway-ui/commit/8dbd91c1680e442451efa4cc7f41b245722a1f26))

### :bug: Bug Fixes

- **Menu.Item:** add missing tooltip prop ([#2093](https://github.com/scaleway/scaleway-ui/issues/2093)) ([afcebe1](https://github.com/scaleway/scaleway-ui/commit/afcebe10508f9dfe4cab5c7f19877ca124ff4a16))
- **website:** update component usages ([#2069](https://github.com/scaleway/scaleway-ui/issues/2069)) ([c9bb5d2](https://github.com/scaleway/scaleway-ui/commit/c9bb5d2b891937d5a4297c3a5d5123e2394d931c))

## [0.212.5](https://github.com/scaleway/scaleway-ui/compare/v0.212.4...v0.212.5) (2022-12-06)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.10.3 ([#2089](https://github.com/scaleway/scaleway-ui/issues/2089)) ([a7a6346](https://github.com/scaleway/scaleway-ui/commit/a7a6346dc42e7ec0de656f7c7ab0593a07fcc5bc))

### :zap: Refactor

- **menu:** replaced css by styled ([#2074](https://github.com/scaleway/scaleway-ui/issues/2074)) ([5c799c6](https://github.com/scaleway/scaleway-ui/commit/5c799c647dd43152e13a504cd67a4a371b94c346))
- **VerificationCode:** rewrite stories ([#2087](https://github.com/scaleway/scaleway-ui/issues/2087)) ([d9b3cb0](https://github.com/scaleway/scaleway-ui/commit/d9b3cb0f79f4d417fe394e7e455d7aa800168e46))

### :bug: Bug Fixes

- **Button:** use Template in stories when possible ([#2091](https://github.com/scaleway/scaleway-ui/issues/2091)) ([2f7097e](https://github.com/scaleway/scaleway-ui/commit/2f7097e05ad41d4e94cd90500b7dd67686864a99))

## [0.212.4](https://github.com/scaleway/scaleway-ui/compare/v0.212.3...v0.212.4) (2022-12-05)

### :package: Chore

- **devdeps:** update dependency @types/react to v18.0.26 ([#2083](https://github.com/scaleway/scaleway-ui/issues/2083)) ([142a097](https://github.com/scaleway/scaleway-ui/commit/142a097eb78a4974359f2da8d212d388c2c6a9f1))
- **devdeps:** update nextjs monorepo to v13.0.6 ([#2082](https://github.com/scaleway/scaleway-ui/issues/2082)) ([09ced4b](https://github.com/scaleway/scaleway-ui/commit/09ced4b9a5d79fe80c7b6e7ecac015238ad630ee))

### :zap: Refactor

- **alert:** change alert default icon size to 24px ([#2079](https://github.com/scaleway/scaleway-ui/issues/2079)) ([5908d64](https://github.com/scaleway/scaleway-ui/commit/5908d64c824b762e523be625549281919f7c73f5))
- **Slider,Sphere,StateBar:** migrate stories ([#2072](https://github.com/scaleway/scaleway-ui/issues/2072)) ([b59871a](https://github.com/scaleway/scaleway-ui/commit/b59871a1d7aaef8dafc1fe651d9a0e0267a77277))

### :repeat: CI

- harden ts config ([#2084](https://github.com/scaleway/scaleway-ui/issues/2084)) ([7ea89e8](https://github.com/scaleway/scaleway-ui/commit/7ea89e841046836ef3b7b0a1df1af0acb60561f8))

### :bug: Bug Fixes

- **types:** embed XOR ([#2088](https://github.com/scaleway/scaleway-ui/issues/2088)) ([ca2f507](https://github.com/scaleway/scaleway-ui/commit/ca2f5071ced853adde2628e307915ae3d30dd966))

## [0.212.3](https://github.com/scaleway/scaleway-ui/compare/v0.212.2...v0.212.3) (2022-12-05)

### :bug: Bug Fixes

- **icon:** use proper arrow icons ([#2077](https://github.com/scaleway/scaleway-ui/issues/2077)) ([2086c0b](https://github.com/scaleway/scaleway-ui/commit/2086c0b9c2b221452ad8736cd528040bca4d36bc))

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v4.1.1 ([#2081](https://github.com/scaleway/scaleway-ui/issues/2081)) ([ff49c6f](https://github.com/scaleway/scaleway-ui/commit/ff49c6f1b3495e366256351b645f6088c9dca77b))

### :white_check_mark: Test

- update snapshots after arrow icons redesign ([#2085](https://github.com/scaleway/scaleway-ui/issues/2085)) ([745a3cf](https://github.com/scaleway/scaleway-ui/commit/745a3cffc70b28e513e017c2470680e03b1c32ff))

## [0.212.2](https://github.com/scaleway/scaleway-ui/compare/v0.212.1...v0.212.2) (2022-12-02)

### :white_check_mark: Test

- **Pagination:** add tests to Pagination v1 and v2 to document v1 bug ([#2073](https://github.com/scaleway/scaleway-ui/issues/2073)) ([08886cc](https://github.com/scaleway/scaleway-ui/commit/08886cc3a341b80d5e4a255ba368ce2c39f818b9))

### :package: Chore

- **devDeps:** upgrade deps ([#2076](https://github.com/scaleway/scaleway-ui/issues/2076)) ([299e746](https://github.com/scaleway/scaleway-ui/commit/299e746d5915a107eab3f7d36db3b7bd7de51a3a))

### :bug: Bug Fixes

- **design:** replace chevron icons with arrow ones ([#2078](https://github.com/scaleway/scaleway-ui/issues/2078)) ([96c78eb](https://github.com/scaleway/scaleway-ui/commit/96c78eb368608385767c54e883fd00a646fd0319))

## [0.212.1](https://github.com/scaleway/scaleway-ui/compare/v0.212.0...v0.212.1) (2022-11-30)

### :memo: Documentation

- add readme changelog and component state ([#2053](https://github.com/scaleway/scaleway-ui/issues/2053)) ([9c5ed07](https://github.com/scaleway/scaleway-ui/commit/9c5ed079b52fd435a8c9c7c2b2d1729d8ff7e500))

### :package: Chore

- **deps:** pin dependency emoji-toolkit to 7.0.0 ([#2070](https://github.com/scaleway/scaleway-ui/issues/2070)) ([ceb0be1](https://github.com/scaleway/scaleway-ui/commit/ceb0be103c4d0a1402eaf55b58982eb88d92ac3d))
- **devdeps:** update babel monorepo ([#2066](https://github.com/scaleway/scaleway-ui/issues/2066)) ([4af98cc](https://github.com/scaleway/scaleway-ui/commit/4af98cc896c48fd1fd72ab9a4c19f1d4cefd45d9))

## [0.212.0](https://github.com/scaleway/scaleway-ui/compare/v0.211.4...v0.212.0) (2022-11-30)

### :zap: Refactor

- **Button, ProgressionButton:** migrate stories ([#2065](https://github.com/scaleway/scaleway-ui/issues/2065)) ([c0a6ee7](https://github.com/scaleway/scaleway-ui/commit/c0a6ee7a21992865ea391a633acca802ef172a2b))

### :bug: Bug Fixes

- a11y parameters for text and link ([#2067](https://github.com/scaleway/scaleway-ui/issues/2067)) ([6423d69](https://github.com/scaleway/scaleway-ui/commit/6423d69837b3a4bc92a07c0ec63cc80543963c0c))

### :gear: Features

- **toaster:** add more options and update stories ([#2061](https://github.com/scaleway/scaleway-ui/issues/2061)) ([f293fb6](https://github.com/scaleway/scaleway-ui/commit/f293fb6d7bf68bc14331770f5d7f9a0e309baa6d))

## [0.211.4](https://github.com/scaleway/scaleway-ui/compare/v0.211.3...v0.211.4) (2022-11-29)

### :memo: Documentation

- remove fonts load at each story to make it global ([#2063](https://github.com/scaleway/scaleway-ui/issues/2063)) ([dd26593](https://github.com/scaleway/scaleway-ui/commit/dd26593d60925fa4c9d691d7310afa7e61c1b5eb))

### :zap: Refactor

- remove stealth copiable replace by copy button ([#2062](https://github.com/scaleway/scaleway-ui/issues/2062)) ([d62905a](https://github.com/scaleway/scaleway-ui/commit/d62905a816233bf0f86fdaa749b4c6be3718634d))
- remove volume size ([#2064](https://github.com/scaleway/scaleway-ui/issues/2064)) ([58760ca](https://github.com/scaleway/scaleway-ui/commit/58760ca622c2b43759fa3eb58bee1b30a3650915))

### :bug: Bug Fixes

- bug missing braces ([#2068](https://github.com/scaleway/scaleway-ui/issues/2068)) ([cefbc9f](https://github.com/scaleway/scaleway-ui/commit/cefbc9fc8516190fbc68af3b3f8b0f47b57567ad))

## [0.211.3](https://github.com/scaleway/scaleway-ui/compare/v0.211.2...v0.211.3) (2022-11-29)

### :zap: Refactor

- stories of notice, paginationV2 and passwordCheck ([#2050](https://github.com/scaleway/scaleway-ui/issues/2050)) ([236c36b](https://github.com/scaleway/scaleway-ui/commit/236c36be57976aed7cbcb888a2c23ac30d9bfc37))

### :bug: Bug Fixes

- **Button:** as link ([#2057](https://github.com/scaleway/scaleway-ui/issues/2057)) ([ce6b7de](https://github.com/scaleway/scaleway-ui/commit/ce6b7de39609e22fdf474db2df980709d016c803))

## [0.211.2](https://github.com/scaleway/scaleway-ui/compare/v0.211.1...v0.211.2) (2022-11-28)

### :zap: Refactor

- passwordStrengthMeter pentagon and progressBar stories ([#2047](https://github.com/scaleway/scaleway-ui/issues/2047)) ([9613fc9](https://github.com/scaleway/scaleway-ui/commit/9613fc9372726364215f62fa4cf9894d66ae460c))

### :package: Chore

- **devdeps:** update nextjs monorepo to v13.0.5 ([#2060](https://github.com/scaleway/scaleway-ui/issues/2060)) ([2f015b7](https://github.com/scaleway/scaleway-ui/commit/2f015b7ef1d8ed2acfcff3feb71896cdad0dcc73))

### :bug: Bug Fixes

- **menu:** add forward ref to menu item ([#2049](https://github.com/scaleway/scaleway-ui/issues/2049)) ([3d907bb](https://github.com/scaleway/scaleway-ui/commit/3d907bbe8b6cdd5d42e04b63bc35164dabc4f667))

## [0.211.1](https://github.com/scaleway/scaleway-ui/compare/v0.211.0...v0.211.1) (2022-11-24)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.10.2 ([#2056](https://github.com/scaleway/scaleway-ui/issues/2056)) ([1221cd4](https://github.com/scaleway/scaleway-ui/commit/1221cd4e947091bf3046f715b8596e66248f7ac5))
- **devdeps:** update dependency eslint to v8.28.0 ([#2054](https://github.com/scaleway/scaleway-ui/issues/2054)) ([5388db9](https://github.com/scaleway/scaleway-ui/commit/5388db984b7e31e1ed15067ce7d323d973ce9fa9))
- **devdeps:** update nextjs monorepo to v13.0.4 ([#2040](https://github.com/scaleway/scaleway-ui/issues/2040)) ([62c808b](https://github.com/scaleway/scaleway-ui/commit/62c808b9d54b537f6bbac15187822727727e4c2d))

### :bug: Bug Fixes

- **StepList:** set ul padding-left to 0 ([#2059](https://github.com/scaleway/scaleway-ui/issues/2059)) ([f47f6a3](https://github.com/scaleway/scaleway-ui/commit/f47f6a3763e6690cfd762bed0e5008cfdd7ab4ad))

## [0.211.0](https://github.com/scaleway/scaleway-ui/compare/v0.210.0...v0.211.0) (2022-11-24)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v4.1.0 ([#2051](https://github.com/scaleway/scaleway-ui/issues/2051)) ([b60e702](https://github.com/scaleway/scaleway-ui/commit/b60e70278d2a5689b974a89f41345c616471a036))

### :gear: Features

- **Icon:** add book-open-outline and play-circle-outline ([#2055](https://github.com/scaleway/scaleway-ui/issues/2055)) ([9884566](https://github.com/scaleway/scaleway-ui/commit/98845668aa9a70539d2f6dd5eddf7276eedc6c87))

## [0.210.0](https://github.com/scaleway/scaleway-ui/compare/v0.209.0...v0.210.0) (2022-11-23)

### :gear: Features

- **StepList:** allow complex children ([#2052](https://github.com/scaleway/scaleway-ui/issues/2052)) ([4195ec2](https://github.com/scaleway/scaleway-ui/commit/4195ec2cbdcc0fea5b2930d1df51af4b90d968b3))

## [0.209.0](https://github.com/scaleway/scaleway-ui/compare/v0.208.2...v0.209.0) (2022-11-23)

### :gear: Features

- **Container:** replace Container by ContainerV2 ([#2048](https://github.com/scaleway/scaleway-ui/issues/2048)) ([46f0bb3](https://github.com/scaleway/scaleway-ui/commit/46f0bb3d9cec7edac569fb7845e75c42500bbffc))

## [0.208.2](https://github.com/scaleway/scaleway-ui/compare/v0.208.1...v0.208.2) (2022-11-22)

### :zap: Refactor

- stories of Markdown, Modal, NavigationStepper ([#2038](https://github.com/scaleway/scaleway-ui/issues/2038)) ([6914d1e](https://github.com/scaleway/scaleway-ui/commit/6914d1e80c89102ef890ca9b58d1c3d33cb17ac9))

### :bug: Bug Fixes

- **Snippet:** no prefix as default value ([#2046](https://github.com/scaleway/scaleway-ui/issues/2046)) ([3bfab7e](https://github.com/scaleway/scaleway-ui/commit/3bfab7ef7d476f878721fe2bb54642e95b83268c))

## [0.208.1](https://github.com/scaleway/scaleway-ui/compare/v0.208.0...v0.208.1) (2022-11-22)

### :bug: Bug Fixes

- add export of snippet ([#2045](https://github.com/scaleway/scaleway-ui/issues/2045)) ([5adffc6](https://github.com/scaleway/scaleway-ui/commit/5adffc6b4358640cd17de7acab1cf4639ec910b3))
- **Tags:** focus input after onChange ([#2034](https://github.com/scaleway/scaleway-ui/issues/2034)) ([98527d6](https://github.com/scaleway/scaleway-ui/commit/98527d680899422a5987ae10f5d43f474772bd44))

## [0.208.0](https://github.com/scaleway/scaleway-ui/compare/v0.207.0...v0.208.0) (2022-11-21)

### :gear: Features

- **Icon:** add view icon ([#2044](https://github.com/scaleway/scaleway-ui/issues/2044)) ([01c706d](https://github.com/scaleway/scaleway-ui/commit/01c706d0759a7fe3bc707b070494ad11f068f698))

## [0.207.0](https://github.com/scaleway/scaleway-ui/compare/v0.206.0...v0.207.0) (2022-11-21)

### :package: Chore

- **devdeps:** update dependency typescript to v4.9.3 ([#2041](https://github.com/scaleway/scaleway-ui/issues/2041)) ([ae68f43](https://github.com/scaleway/scaleway-ui/commit/ae68f4332b775e9bd4b1dac5235b448fe48de95a))

### :gear: Features

- **RichSelect:** allow customization of empty state ([#2035](https://github.com/scaleway/scaleway-ui/issues/2035)) ([5f6554a](https://github.com/scaleway/scaleway-ui/commit/5f6554aba2db9316028618b87980852a495f026f))

## [0.206.0](https://github.com/scaleway/scaleway-ui/compare/v0.205.4...v0.206.0) (2022-11-21)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.8.3 ([#2030](https://github.com/scaleway/scaleway-ui/issues/2030)) ([88c25f2](https://github.com/scaleway/scaleway-ui/commit/88c25f23d6b0cfa2ead66c0b97a491917987d812))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.8.4 ([#2039](https://github.com/scaleway/scaleway-ui/issues/2039)) ([5a98152](https://github.com/scaleway/scaleway-ui/commit/5a981525e2b8228da4142a8f24411d935fdeb7e2))
- **devdeps:** update dependency jest-axe to v7 ([#2036](https://github.com/scaleway/scaleway-ui/issues/2036)) ([60fcabc](https://github.com/scaleway/scaleway-ui/commit/60fcabcd442bf306c402b66071007850fa3a5952))

### :zap: Refactor

- **Button:** remove box ([#2032](https://github.com/scaleway/scaleway-ui/issues/2032)) ([0d60aa9](https://github.com/scaleway/scaleway-ui/commit/0d60aa90c4e802f19b639d9a7d265047def6ca45))

### :gear: Features

- **Stack:** add wrap props ([#2042](https://github.com/scaleway/scaleway-ui/issues/2042)) ([dedde65](https://github.com/scaleway/scaleway-ui/commit/dedde650c8ee82cbce21ba49c892f270abe403d7))

## [0.205.4](https://github.com/scaleway/scaleway-ui/compare/v0.205.3...v0.205.4) (2022-11-17)

### :bug: Bug Fixes

- **CopyButton:** add noBorder to not forwarded props list ([#2037](https://github.com/scaleway/scaleway-ui/issues/2037)) ([d50d58f](https://github.com/scaleway/scaleway-ui/commit/d50d58f8e504e1c08afb016a2b2eb73037fd2628))

## [0.205.3](https://github.com/scaleway/scaleway-ui/compare/v0.205.2...v0.205.3) (2022-11-16)

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.6.1 ([#2033](https://github.com/scaleway/scaleway-ui/issues/2033)) ([9256a81](https://github.com/scaleway/scaleway-ui/commit/9256a8146a2487d693a209e0ad8f44c4f7b80ff1))

## [0.205.2](https://github.com/scaleway/scaleway-ui/compare/v0.205.1...v0.205.2) (2022-11-15)

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.1.1 ([#2029](https://github.com/scaleway/scaleway-ui/issues/2029)) ([a579e8e](https://github.com/scaleway/scaleway-ui/commit/a579e8e72d1ccb4916e528b2c2054d70b2238636))

## [0.205.1](https://github.com/scaleway/scaleway-ui/compare/v0.205.0...v0.205.1) (2022-11-14)

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.6.0 ([#2028](https://github.com/scaleway/scaleway-ui/issues/2028)) ([a6896d3](https://github.com/scaleway/scaleway-ui/commit/a6896d316a84ee0793f54dbf11a2c18f080f10aa))

## [0.205.0](https://github.com/scaleway/scaleway-ui/compare/v0.204.3...v0.205.0) (2022-11-14)

### :package: Chore

- **devdeps:** pin dependency @jest/types to 29.3.1 ([#2026](https://github.com/scaleway/scaleway-ui/issues/2026)) ([45c1df1](https://github.com/scaleway/scaleway-ui/commit/45c1df1564f998060d91b69fefb54b7f77447656))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.8.1 ([#1977](https://github.com/scaleway/scaleway-ui/issues/1977)) ([f463a04](https://github.com/scaleway/scaleway-ui/commit/f463a049e5871dec187b121a242f9dbceea9135c))
- **devdeps:** update dependency @scaleway/jest-helpers to v2.0.22 ([#2031](https://github.com/scaleway/scaleway-ui/issues/2031)) ([2277d07](https://github.com/scaleway/scaleway-ui/commit/2277d0798659b4e0c39e93cd6c0d8b990b79f4fe))
- **devdeps:** update node.js to v18.12 ([#2027](https://github.com/scaleway/scaleway-ui/issues/2027)) ([86dfa5f](https://github.com/scaleway/scaleway-ui/commit/86dfa5f880b1e83de23b7006e2c77054dd8a9fbe))
- **devDeps:** upgrade deps ([#2025](https://github.com/scaleway/scaleway-ui/issues/2025)) ([2743a8e](https://github.com/scaleway/scaleway-ui/commit/2743a8ee98954b086467fd8f9eee84560cbdce1c))

### :gear: Features

- **tooltip:** nested scrolls, replaced transition by animation and cleaned code ([#2022](https://github.com/scaleway/scaleway-ui/issues/2022)) ([cab3e01](https://github.com/scaleway/scaleway-ui/commit/cab3e0143dbd85e3271a6340e502655e7269f5a8))

## [0.204.3](https://github.com/scaleway/scaleway-ui/compare/v0.204.2...v0.204.3) (2022-11-10)

### :package: Chore

- **devdeps:** update dependency @types/react to v18.0.25 ([#1988](https://github.com/scaleway/scaleway-ui/issues/1988)) ([b12d5bd](https://github.com/scaleway/scaleway-ui/commit/b12d5bd3b88c4eb7294ca89be954f9b527901507))

### :zap: Refactor

- reorganize and improve PieChart, Placeholder and SelectNumber stories ([#2019](https://github.com/scaleway/scaleway-ui/issues/2019)) ([b0337e4](https://github.com/scaleway/scaleway-ui/commit/b0337e42aa4c125f69520422cc51e8388fdd858e))

### :repeat: CI

- fix script with new storiesfile format ([#2023](https://github.com/scaleway/scaleway-ui/issues/2023)) ([d0f59fa](https://github.com/scaleway/scaleway-ui/commit/d0f59faaa7b2a6ef7214be12f3e717d45df84a91))

### :bug: Bug Fixes

- radio and checkbox properties and removed reakit usages ([#2018](https://github.com/scaleway/scaleway-ui/issues/2018)) ([96feda3](https://github.com/scaleway/scaleway-ui/commit/96feda33536cee12e013da0479124c6920f92958))

## [0.204.2](https://github.com/scaleway/scaleway-ui/compare/v0.204.1...v0.204.2) (2022-11-09)

### :zap: Refactor

- **list:** reorganize List stories ([#2015](https://github.com/scaleway/scaleway-ui/issues/2015)) ([38c7849](https://github.com/scaleway/scaleway-ui/commit/38c7849408f2a39ad651343b7238ffdad6c6a382))
- remove Box props from Table ([#1996](https://github.com/scaleway/scaleway-ui/issues/1996)) ([d4701f4](https://github.com/scaleway/scaleway-ui/commit/d4701f4b17d284aec610c90a797a39d9f4f96a2d))
- reorganize and improve `Image`, `Label`, `LineChart` stories ([#2020](https://github.com/scaleway/scaleway-ui/issues/2020)) ([d9c78c2](https://github.com/scaleway/scaleway-ui/commit/d9c78c26cd7feed699eb2f81b42783cb70f5ab7a))
- reorganize and improve DotSteps Expandable and Icon stories ([#2017](https://github.com/scaleway/scaleway-ui/issues/2017)) ([dfb7e84](https://github.com/scaleway/scaleway-ui/commit/dfb7e84aa16f20c074beee373f3eae17c9026bdf))
- reorganize and improve Link and Separator stories ([#2016](https://github.com/scaleway/scaleway-ui/issues/2016)) ([3a0c629](https://github.com/scaleway/scaleway-ui/commit/3a0c629f37ec05b621600185037e09216f386c91))

### :bug: Bug Fixes

- **list:** fix list header gap ([#2021](https://github.com/scaleway/scaleway-ui/issues/2021)) ([025de46](https://github.com/scaleway/scaleway-ui/commit/025de468855a6504ef0ec7356b0a7793a7b96bed))

## [0.204.1](https://github.com/scaleway/scaleway-ui/compare/v0.204.0...v0.204.1) (2022-11-07)

### :bug: Bug Fixes

- **list:** fix visual regression where gap is too large when list is loading ([#2014](https://github.com/scaleway/scaleway-ui/issues/2014)) ([c6ce979](https://github.com/scaleway/scaleway-ui/commit/c6ce9799616c4a228a82661f40ccf3a02e49f09b))

## [0.204.0](https://github.com/scaleway/scaleway-ui/compare/v0.203.0...v0.204.0) (2022-11-07)

### :gear: Features

- modernize PasswordCheck with Text + remove Grid ([#2008](https://github.com/scaleway/scaleway-ui/issues/2008)) ([8f7c996](https://github.com/scaleway/scaleway-ui/commit/8f7c99661d0a2240966b83905a3359f2561ad60b))

## [0.203.0](https://github.com/scaleway/scaleway-ui/compare/v0.202.5...v0.203.0) (2022-11-07)

### :gear: Features

- **Snippet:** new component ([#1997](https://github.com/scaleway/scaleway-ui/issues/1997)) ([fd2c459](https://github.com/scaleway/scaleway-ui/commit/fd2c459b3ff3ac5cd1a803354e029680e4b66583))

## [0.202.5](https://github.com/scaleway/scaleway-ui/compare/v0.202.4...v0.202.5) (2022-11-07)

### :package: Chore

- **devdeps:** update dependency @types/node to v18.11.6 ([#1989](https://github.com/scaleway/scaleway-ui/issues/1989)) ([591a64a](https://github.com/scaleway/scaleway-ui/commit/591a64a223d56a8304efa1eb0989fd8717b87f51))

### :bug: Bug Fixes

- **list:** fix missing gap between list and pagination with table variant ([#2013](https://github.com/scaleway/scaleway-ui/issues/2013)) ([507fdc8](https://github.com/scaleway/scaleway-ui/commit/507fdc86c23232c53557bf1591bef71a7f8c89df))

## [0.202.4](https://github.com/scaleway/scaleway-ui/compare/v0.202.3...v0.202.4) (2022-11-04)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.10.1 ([#2004](https://github.com/scaleway/scaleway-ui/issues/2004)) ([52aa1eb](https://github.com/scaleway/scaleway-ui/commit/52aa1eb65b7242023280c0c074c67f66be20d54f))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.5.9 ([#2003](https://github.com/scaleway/scaleway-ui/issues/2003)) ([f75e389](https://github.com/scaleway/scaleway-ui/commit/f75e38927b5ba7c12862356e1aab4bc83411d066))

## [0.202.3](https://github.com/scaleway/scaleway-ui/compare/v0.202.2...v0.202.3) (2022-11-04)

### :memo: Documentation

- rewrite story and remove unused storybook helper ([#2006](https://github.com/scaleway/scaleway-ui/issues/2006)) ([ba877b3](https://github.com/scaleway/scaleway-ui/commit/ba877b3a35259c58fe51a80b707abb6f9552d73f))

### :bug: Bug Fixes

- **pagination:** initial change page should never return 0 ([#2012](https://github.com/scaleway/scaleway-ui/issues/2012)) ([a267747](https://github.com/scaleway/scaleway-ui/commit/a2677478f18c2ca3b2cde9371b2a4f059191e6dc))

## [0.202.2](https://github.com/scaleway/scaleway-ui/compare/v0.202.1...v0.202.2) (2022-11-03)

### :memo: Documentation

- rewrite `Stack`, `Stepper` and `Tooltip` stories ([#2002](https://github.com/scaleway/scaleway-ui/issues/2002)) ([a9ada24](https://github.com/scaleway/scaleway-ui/commit/a9ada24e881bda0de1288172730b06149e78ab8d))
- rewrite `Tag`, `Tags` and `TagsPoplist` stories ([#2001](https://github.com/scaleway/scaleway-ui/issues/2001)) ([e3edee1](https://github.com/scaleway/scaleway-ui/commit/e3edee183c7a7eb747767c6e218c7659bf52bd83))

### :repeat: CI

- fix teardown workflow ([#2011](https://github.com/scaleway/scaleway-ui/issues/2011)) ([da1802f](https://github.com/scaleway/scaleway-ui/commit/da1802faf339f0b93439aa03d0443b72db84512d))

### :zap: Refactor

- **grid:** remove box props ([#2010](https://github.com/scaleway/scaleway-ui/issues/2010)) ([f927c27](https://github.com/scaleway/scaleway-ui/commit/f927c276df8a61540b5354bb567afdf9a35a6e4c))
- **RichSelect:** remove Box ([#2007](https://github.com/scaleway/scaleway-ui/issues/2007)) ([c92b4d2](https://github.com/scaleway/scaleway-ui/commit/c92b4d2fab79f6ffe1a4b021420b743ffbad78ad))

### :bug: Bug Fixes

- **Badge:** consistent element sizing across variants ([#2009](https://github.com/scaleway/scaleway-ui/issues/2009)) ([f3b562d](https://github.com/scaleway/scaleway-ui/commit/f3b562d15022d26fb81c2bb0d6c652c1e3e84498))

## [0.202.1](https://github.com/scaleway/scaleway-ui/compare/v0.202.0...v0.202.1) (2022-11-02)

### :bug: Bug Fixes

- **SelectNumber:** max value undefined makes it unlimited value ([#2005](https://github.com/scaleway/scaleway-ui/issues/2005)) ([6d4378f](https://github.com/scaleway/scaleway-ui/commit/6d4378f50564ad9f5355b5c98b08c9ea3ee91dba))

## [0.202.0](https://github.com/scaleway/scaleway-ui/compare/v0.201.4...v0.202.0) (2022-10-31)

### :gear: Features

- new ContainerV2 component ([#1968](https://github.com/scaleway/scaleway-ui/issues/1968)) ([5f1df56](https://github.com/scaleway/scaleway-ui/commit/5f1df5611a79dfbf53551a7988755dd88f18e772))

## [0.201.4](https://github.com/scaleway/scaleway-ui/compare/v0.201.3...v0.201.4) (2022-10-28)

### :zap: Refactor

- **Breadcrumbs:** rewrite stories ([#1991](https://github.com/scaleway/scaleway-ui/issues/1991)) ([46760d1](https://github.com/scaleway/scaleway-ui/commit/46760d114e5d2be7c863688feb85a77aec98ee4f))
- **DateInput,Description:** migrate stories ([#1995](https://github.com/scaleway/scaleway-ui/issues/1995)) ([1c68de9](https://github.com/scaleway/scaleway-ui/commit/1c68de9611e130447f7aba819d25aa23e5a1e601))
- stories of checkbox, radio and selectable card ([#1938](https://github.com/scaleway/scaleway-ui/issues/1938)) ([1ce43ef](https://github.com/scaleway/scaleway-ui/commit/1ce43ef4da0c5c7af5e75b11567f82019e3b0b25))

### :package: Chore

- **devdeps:** update emotion monorepo ([#2000](https://github.com/scaleway/scaleway-ui/issues/2000)) ([cc8058e](https://github.com/scaleway/scaleway-ui/commit/cc8058ed5feefb7d73cdeec24338f4fe144af87c))
- **devdeps:** update nextjs monorepo to v13 (major) ([#1994](https://github.com/scaleway/scaleway-ui/issues/1994)) ([ae51602](https://github.com/scaleway/scaleway-ui/commit/ae5160200685501de3ef9bde82356baed4d8eb8a))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.5.7 ([#1999](https://github.com/scaleway/scaleway-ui/issues/1999)) ([252c18d](https://github.com/scaleway/scaleway-ui/commit/252c18d903a9b34798c6db94af44fcb45c3f5765))

## [0.201.3](https://github.com/scaleway/scaleway-ui/compare/v0.201.2...v0.201.3) (2022-10-26)

### :package: Chore

- **devdeps:** update devdeps ([#1993](https://github.com/scaleway/scaleway-ui/issues/1993)) ([81e469c](https://github.com/scaleway/scaleway-ui/commit/81e469cea5e941995ee21b648a2d0d4e81947cd1))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.5.6 ([#1990](https://github.com/scaleway/scaleway-ui/issues/1990)) ([7e9a04d](https://github.com/scaleway/scaleway-ui/commit/7e9a04d88026cde776a3fd2b3125b12cbdc52030))

## [0.201.2](https://github.com/scaleway/scaleway-ui/compare/v0.201.1...v0.201.2) (2022-10-25)

### :memo: Documentation

- **Table:** fixed table crashing story and updated to new way of writing ([#1973](https://github.com/scaleway/scaleway-ui/issues/1973)) ([8d8ef3a](https://github.com/scaleway/scaleway-ui/commit/8d8ef3aaede9c6062c17b7357561fab07d040f68))

### :zap: Refactor

- **BarChart,BarStack:** rewrite stories ([#1987](https://github.com/scaleway/scaleway-ui/issues/1987)) ([f7c86e0](https://github.com/scaleway/scaleway-ui/commit/f7c86e0c8f75a37b521c22fa5bbeda4e12e68ef0))
- **markdown:** remove box from Markdown ([#1975](https://github.com/scaleway/scaleway-ui/issues/1975)) ([b6ecfa9](https://github.com/scaleway/scaleway-ui/commit/b6ecfa9d2fae3eb42a7c738e47b3bedbc5017d16))

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#1992](https://github.com/scaleway/scaleway-ui/issues/1992)) ([d6a8544](https://github.com/scaleway/scaleway-ui/commit/d6a85447615f6074508e173761f000fdb81b3f81))

## [0.201.1](https://github.com/scaleway/scaleway-ui/compare/v0.201.0...v0.201.1) (2022-10-24)

### :bug: Bug Fixes

- **progression-button:** add classname props ([#1986](https://github.com/scaleway/scaleway-ui/issues/1986)) ([c5b243b](https://github.com/scaleway/scaleway-ui/commit/c5b243b675c62d96cabc61c7e696a5576fb7fe6a))

## [0.201.0](https://github.com/scaleway/scaleway-ui/compare/v0.200.8...v0.201.0) (2022-10-24)

### :gear: Features

- **CopyButton:** new component ([#1969](https://github.com/scaleway/scaleway-ui/issues/1969)) ([6fb6369](https://github.com/scaleway/scaleway-ui/commit/6fb6369c79f88dbbf9f2809d08801f25c8e7eb97))

## [0.200.8](https://github.com/scaleway/scaleway-ui/compare/v0.200.7...v0.200.8) (2022-10-24)

### :repeat: CI

- improve chromatic usage ([#1978](https://github.com/scaleway/scaleway-ui/issues/1978)) ([048b4a8](https://github.com/scaleway/scaleway-ui/commit/048b4a87bf24b215fdaa13bc518177e5be9b5741))

### :package: Chore

- **deps:** pin dependencies ([#1985](https://github.com/scaleway/scaleway-ui/issues/1985)) ([b80d6e1](https://github.com/scaleway/scaleway-ui/commit/b80d6e1b33292eced4507a1c7e944eb7d906ff2c))

## [0.200.7](https://github.com/scaleway/scaleway-ui/compare/v0.200.6...v0.200.7) (2022-10-24)

### :package: Chore

- **devdeps:** update babel monorepo ([#1971](https://github.com/scaleway/scaleway-ui/issues/1971)) ([355d39f](https://github.com/scaleway/scaleway-ui/commit/355d39f0b130d49dc90e6937a34c48a48ac4307c))
- **devdeps:** update devdeps ([#1979](https://github.com/scaleway/scaleway-ui/issues/1979)) ([fd955a0](https://github.com/scaleway/scaleway-ui/commit/fd955a08689302562ca1b7b8b7948c541374a7c3))
- **devdeps:** update docker/setup-buildx-action action to v2.2.1 ([#1981](https://github.com/scaleway/scaleway-ui/issues/1981)) ([e9358c5](https://github.com/scaleway/scaleway-ui/commit/e9358c5fea3c03ce5fa2f116952b4e663c141320))
- **devdeps:** update node.js to v18.11 ([#1982](https://github.com/scaleway/scaleway-ui/issues/1982)) ([238e059](https://github.com/scaleway/scaleway-ui/commit/238e0594e408ebf767d226d971c6ca1f8fc425c2))
- **devdeps:** update pnpm/action-setup action to v2.2.4 ([#1980](https://github.com/scaleway/scaleway-ui/issues/1980)) ([1788337](https://github.com/scaleway/scaleway-ui/commit/17883370c55abbb7fae1ada14927cd3d7bfb2e8d))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.5.4 ([#1983](https://github.com/scaleway/scaleway-ui/issues/1983)) ([c7eed36](https://github.com/scaleway/scaleway-ui/commit/c7eed36b4cef0b65f2e4e22c9431c8427fbe3afd))

## [0.200.6](https://github.com/scaleway/scaleway-ui/compare/v0.200.5...v0.200.6) (2022-10-23)

### :package: Chore

- **deps:** pin dependency chromatic to 6.10.5 ([#1976](https://github.com/scaleway/scaleway-ui/issues/1976)) ([b67afbd](https://github.com/scaleway/scaleway-ui/commit/b67afbd04c659fdbe9ba077942444d01a06f2f3f))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.7.7 ([#1961](https://github.com/scaleway/scaleway-ui/issues/1961)) ([c5fa25c](https://github.com/scaleway/scaleway-ui/commit/c5fa25cbb1d275747a16455affe1c487598bda05))

## [0.200.5](https://github.com/scaleway/scaleway-ui/compare/v0.200.4...v0.200.5) (2022-10-21)

### :repeat: CI

- add chromatic support ([#1951](https://github.com/scaleway/scaleway-ui/issues/1951)) ([11cabca](https://github.com/scaleway/scaleway-ui/commit/11cabcabf515340bd0bbc85707ad479105e645b5))

### :bug: Bug Fixes

- add button type to styled buttons ([#1974](https://github.com/scaleway/scaleway-ui/issues/1974)) ([463c7e3](https://github.com/scaleway/scaleway-ui/commit/463c7e3dad3e5c4948dca8d90809a5a58de3dbf3))

## [0.200.4](https://github.com/scaleway/scaleway-ui/compare/v0.200.3...v0.200.4) (2022-10-20)

### :bug: Bug Fixes

- **toggle:** fix not toggling on storybook ([#1967](https://github.com/scaleway/scaleway-ui/issues/1967)) ([4e7f896](https://github.com/scaleway/scaleway-ui/commit/4e7f89640b335ed2ed8dfc84977bacc24dc198ba))

## [0.200.3](https://github.com/scaleway/scaleway-ui/compare/v0.200.2...v0.200.3) (2022-10-20)

### :zap: Refactor

- update storybook action bar / alert / avatar ([#1966](https://github.com/scaleway/scaleway-ui/issues/1966)) ([b4d90df](https://github.com/scaleway/scaleway-ui/commit/b4d90df0847085dee2d3de4086ca5b53e41a5ccf))

### :bug: Bug Fixes

- **modal:** make sure close button is in front of content ([#1972](https://github.com/scaleway/scaleway-ui/issues/1972)) ([eebe7fa](https://github.com/scaleway/scaleway-ui/commit/eebe7facc43fae854f372c9661f055fb28620960))

## [0.200.2](https://github.com/scaleway/scaleway-ui/compare/v0.200.1...v0.200.2) (2022-10-20)

### :bug: Bug Fixes

- **tabs:** incorrect tab type ([#1970](https://github.com/scaleway/scaleway-ui/issues/1970)) ([ffecffa](https://github.com/scaleway/scaleway-ui/commit/ffecffa8952b2bc0a7c4f43b8b473f30f8c9ab90))

## [0.200.1](https://github.com/scaleway/scaleway-ui/compare/v0.200.0...v0.200.1) (2022-10-19)

### :zap: Refactor

- **icon:** remove box ([#1946](https://github.com/scaleway/scaleway-ui/issues/1946)) ([bb9b5a4](https://github.com/scaleway/scaleway-ui/commit/bb9b5a4983db4c60e359a41ecdd4c87baf4fdd29))

### :memo: Documentation

- update storybook doc status, switchbutton and text ([#1959](https://github.com/scaleway/scaleway-ui/issues/1959)) ([8f11ce6](https://github.com/scaleway/scaleway-ui/commit/8f11ce667dd91b55113d0e1bb9447b39ddc184a6))

### :bug: Bug Fixes

- more display in navtab ([#1965](https://github.com/scaleway/scaleway-ui/issues/1965)) ([4f6aee2](https://github.com/scaleway/scaleway-ui/commit/4f6aee2ba17669b1895d222a9d73f90a86b76e4f))

## [0.200.0](https://github.com/scaleway/scaleway-ui/compare/v0.199.3...v0.200.0) (2022-10-18)

### :zap: Refactor

- **selectnumber:** remove box ([#1944](https://github.com/scaleway/scaleway-ui/issues/1944)) ([d2876af](https://github.com/scaleway/scaleway-ui/commit/d2876af2f56b2e2037a856162a0f382d6b208dfc))
- stories for Badge, Bullet, Borderedbox ([#1949](https://github.com/scaleway/scaleway-ui/issues/1949)) ([1031a89](https://github.com/scaleway/scaleway-ui/commit/1031a89c34ef253fc7fc4884e65fbf4320e15dfb))

### :gear: Features

- remove Touchable ([#1962](https://github.com/scaleway/scaleway-ui/issues/1962)) ([8373a51](https://github.com/scaleway/scaleway-ui/commit/8373a51d91c289bd42c9c8092c6a23f588eebfb3))

## [0.199.3](https://github.com/scaleway/scaleway-ui/compare/v0.199.2...v0.199.3) (2022-10-17)

### :zap: Refactor

- **expandable:** remove box ([#1945](https://github.com/scaleway/scaleway-ui/issues/1945)) ([2011cec](https://github.com/scaleway/scaleway-ui/commit/2011cec830e294fc69df6195293fd968a8500c4b))
- **menu:** improve stories snippet parsing ([#1942](https://github.com/scaleway/scaleway-ui/issues/1942)) ([3605862](https://github.com/scaleway/scaleway-ui/commit/3605862f71e0de428209bac51a30ff4d20e8928f))

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.11 ([#1957](https://github.com/scaleway/scaleway-ui/issues/1957)) ([7902165](https://github.com/scaleway/scaleway-ui/commit/7902165cb3d382337b5b522313b169999e08ee4a))
- **devdeps:** update actions/setup-node action to v3.5.1 ([#1958](https://github.com/scaleway/scaleway-ui/issues/1958)) ([8361139](https://github.com/scaleway/scaleway-ui/commit/8361139b6a4959c0915a4f7a36eb85a25972325c))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.7.6 ([#1955](https://github.com/scaleway/scaleway-ui/issues/1955)) ([3b5c2b0](https://github.com/scaleway/scaleway-ui/commit/3b5c2b00de66614ea32b56b0402abe0f4928ad12))
- **devdeps:** update dependency next-transpile-modules to v9.1.0 ([#1952](https://github.com/scaleway/scaleway-ui/issues/1952)) ([823b613](https://github.com/scaleway/scaleway-ui/commit/823b61339f3b520fb6e3d96396f9097a110826ce))
- **devdeps:** update docker/build-push-action action to v3.2.0 ([#1953](https://github.com/scaleway/scaleway-ui/issues/1953)) ([f5aa0db](https://github.com/scaleway/scaleway-ui/commit/f5aa0dbeb568e6b4643c49caccf1c714e65767d4))
- **devdeps:** update docker/login-action action to v2.1.0 ([#1954](https://github.com/scaleway/scaleway-ui/issues/1954)) ([5eef0e2](https://github.com/scaleway/scaleway-ui/commit/5eef0e28396ff8dc09d090aa29cc376adb7f9fc2))

### :memo: Documentation

- fix description not display in storybook ([#1960](https://github.com/scaleway/scaleway-ui/issues/1960)) ([5ba8a87](https://github.com/scaleway/scaleway-ui/commit/5ba8a872c194ec9adf06bf99bc0a0081dba7051b))

### :bug: Bug Fixes

- **verification-code:** add classname ([#1963](https://github.com/scaleway/scaleway-ui/issues/1963)) ([4495ba6](https://github.com/scaleway/scaleway-ui/commit/4495ba635c15189448c87051a8b7004f2b6664a1))

## [0.199.2](https://github.com/scaleway/scaleway-ui/compare/v0.199.1...v0.199.2) (2022-10-12)

### :package: Chore

- **devdeps:** update dependency @rollup/plugin-babel to v6 ([#1940](https://github.com/scaleway/scaleway-ui/issues/1940)) ([f9c5572](https://github.com/scaleway/scaleway-ui/commit/f9c557214f433386bf06121b19ca0c9f86327765))

### :bug: Bug Fixes

- **deps:** update dependency react-use-clipboard to v1.0.9 ([#1948](https://github.com/scaleway/scaleway-ui/issues/1948)) ([cb07b7d](https://github.com/scaleway/scaleway-ui/commit/cb07b7dbc841ea3b87eb13027bcfc012d2097325))

## [0.199.1](https://github.com/scaleway/scaleway-ui/compare/v0.199.0...v0.199.1) (2022-10-12)

### :lipstick: Style

- add inline nested component eslint rule ([#1943](https://github.com/scaleway/scaleway-ui/issues/1943)) ([46388b1](https://github.com/scaleway/scaleway-ui/commit/46388b1857fca760c860a9c60eb916fdf0689ed3))

### :package: Chore

- **devdeps:** update dependency eslint to v8.25.0 ([#1939](https://github.com/scaleway/scaleway-ui/issues/1939)) ([7849ee0](https://github.com/scaleway/scaleway-ui/commit/7849ee05249034cc3ec387bd481347209de3dcf4))
- **devdeps:** update pnpm/action-setup action to v2.2.3 ([#1947](https://github.com/scaleway/scaleway-ui/issues/1947)) ([e792daf](https://github.com/scaleway/scaleway-ui/commit/e792dafd3d1381fbce6002e206b86de15da8fd3b))

### :bug: Bug Fixes

- **Tabs:** counter will be displayed if value is zero ([#1950](https://github.com/scaleway/scaleway-ui/issues/1950)) ([e2816f3](https://github.com/scaleway/scaleway-ui/commit/e2816f37e3ae87f3be989610fee5f32da92d11de))

## [0.199.0](https://github.com/scaleway/scaleway-ui/compare/v0.198.10...v0.199.0) (2022-10-10)

### :gear: Features

- improve story writing ([#1941](https://github.com/scaleway/scaleway-ui/issues/1941)) ([4b35ff2](https://github.com/scaleway/scaleway-ui/commit/4b35ff2370ade69c0a75d8fc6b1cc585e00c2275))

## [0.198.10](https://github.com/scaleway/scaleway-ui/compare/v0.198.9...v0.198.10) (2022-10-07)

### :bug: Bug Fixes

- **ActionBar:** allow className ([#1937](https://github.com/scaleway/scaleway-ui/issues/1937)) ([6f99c3a](https://github.com/scaleway/scaleway-ui/commit/6f99c3ac7ee03ca719e78d64e13be892fd46410f))

## [0.198.9](https://github.com/scaleway/scaleway-ui/compare/v0.198.8...v0.198.9) (2022-10-07)

### :memo: Documentation

- remove decorators from code snippets - global configuration ([#1935](https://github.com/scaleway/scaleway-ui/issues/1935)) ([d3d9d30](https://github.com/scaleway/scaleway-ui/commit/d3d9d303557ef0323dcc5be5d2b62906af809c81))

### :repeat: CI

- fix flacky ci and remove unsed code ([#1929](https://github.com/scaleway/scaleway-ui/issues/1929)) ([0482d50](https://github.com/scaleway/scaleway-ui/commit/0482d50f1948a073f8e3cc99fa746d32e7fedaee))
- use static web server ([#1934](https://github.com/scaleway/scaleway-ui/issues/1934)) ([8fe1676](https://github.com/scaleway/scaleway-ui/commit/8fe167627b4e254445d684b6ba2d0f9e18a8fa08))

### :bug: Bug Fixes

- **list:** show placeholder when data length is unknown ([#1930](https://github.com/scaleway/scaleway-ui/issues/1930)) ([ec537b8](https://github.com/scaleway/scaleway-ui/commit/ec537b8310f89b24fe6a168cc7ca1d6f3b02e085))
- **TextBox:** required icon color ([#1931](https://github.com/scaleway/scaleway-ui/issues/1931)) ([8f3806d](https://github.com/scaleway/scaleway-ui/commit/8f3806d2144ece6cca67e02a20a41d31e0e86ef5))

## [0.198.8](https://github.com/scaleway/scaleway-ui/compare/v0.198.7...v0.198.8) (2022-10-06)

### :bug: Bug Fixes

- container props ([#1933](https://github.com/scaleway/scaleway-ui/issues/1933)) ([ebcf370](https://github.com/scaleway/scaleway-ui/commit/ebcf37002f907c41da8c172274f7821a6ed45c5d))

## [0.198.7](https://github.com/scaleway/scaleway-ui/compare/v0.198.6...v0.198.7) (2022-10-06)

### :bug: Bug Fixes

- **tooltip:** apply className on tooltip instead of children ([#1932](https://github.com/scaleway/scaleway-ui/issues/1932)) ([1e1f1af](https://github.com/scaleway/scaleway-ui/commit/1e1f1aff728af596c2fd450c2bdee88c20719335))

## [0.198.6](https://github.com/scaleway/scaleway-ui/compare/v0.198.5...v0.198.6) (2022-10-05)

### :bug: Bug Fixes

- updated theme documentation and extendTheme function ([#1925](https://github.com/scaleway/scaleway-ui/issues/1925)) ([16fe265](https://github.com/scaleway/scaleway-ui/commit/16fe265b96ed0e95ffd248863a996a9291e4a037))

## [0.198.5](https://github.com/scaleway/scaleway-ui/compare/v0.198.4...v0.198.5) (2022-10-05)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.7.4 ([#1926](https://github.com/scaleway/scaleway-ui/issues/1926)) ([a4c933c](https://github.com/scaleway/scaleway-ui/commit/a4c933ca29bba67828fcffef4cd8462de0ffb280))
- **devdeps:** update dependency @scaleway/use-i18n to v3.7.4 ([#1927](https://github.com/scaleway/scaleway-ui/issues/1927)) ([e7178c4](https://github.com/scaleway/scaleway-ui/commit/e7178c48f3df0ec3254ffd2013fbe8bace4e6c78))

### :bug: Bug Fixes

- force text align in counter ([#1928](https://github.com/scaleway/scaleway-ui/issues/1928)) ([8fb0e53](https://github.com/scaleway/scaleway-ui/commit/8fb0e538e7c46303c01c371c63a76656be12fb96))

## [0.198.4](https://github.com/scaleway/scaleway-ui/compare/v0.198.3...v0.198.4) (2022-10-05)

### :package: Chore

- **devdeps:** update actions/checkout action to v3.1.0 ([#1924](https://github.com/scaleway/scaleway-ui/issues/1924)) ([bb7c4f4](https://github.com/scaleway/scaleway-ui/commit/bb7c4f45e19c4fe6c98183f1948f393843d5742a))

### :bug: Bug Fixes

- **tooltip:** new tooltip positioning system ([#1918](https://github.com/scaleway/scaleway-ui/issues/1918)) ([927bc6f](https://github.com/scaleway/scaleway-ui/commit/927bc6f3abe105e2e347dab0a6e22a23d1522dfe))

## [0.198.3](https://github.com/scaleway/scaleway-ui/compare/v0.198.2...v0.198.3) (2022-10-04)

### :bug: Bug Fixes

- **PieChart:** vertical scroll auto ([#1920](https://github.com/scaleway/scaleway-ui/issues/1920)) ([0ca5081](https://github.com/scaleway/scaleway-ui/commit/0ca5081dd9eeb7ef627eaa2d096b3b57c8ea1693))

## [0.198.2](https://github.com/scaleway/scaleway-ui/compare/v0.198.1...v0.198.2) (2022-10-04)

### :memo: Documentation

- make pagination deprecated ([#1910](https://github.com/scaleway/scaleway-ui/issues/1910)) ([294f3e8](https://github.com/scaleway/scaleway-ui/commit/294f3e8c7931eee246decfd4fc497cceae618108))

### :repeat: CI

- make sync tokens triggerable ([#1919](https://github.com/scaleway/scaleway-ui/issues/1919)) ([8241960](https://github.com/scaleway/scaleway-ui/commit/82419607305e2389a1cfa51f82af57be98b97edc))
- use new registry ([#1923](https://github.com/scaleway/scaleway-ui/issues/1923)) ([de32de3](https://github.com/scaleway/scaleway-ui/commit/de32de37074a480090826419099099060c29c424))

### :zap: Refactor

- **statebar:** use stack ([#1921](https://github.com/scaleway/scaleway-ui/issues/1921)) ([af503fa](https://github.com/scaleway/scaleway-ui/commit/af503fadeed6a46e6028b382223db98cc56f5c32))

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.10 ([#1922](https://github.com/scaleway/scaleway-ui/issues/1922)) ([36bbd4a](https://github.com/scaleway/scaleway-ui/commit/36bbd4a99214923e77e802e03896bf78db7268b5))
- **devdeps:** update dependency @testing-library/user-event to v14 ([#1313](https://github.com/scaleway/scaleway-ui/issues/1313)) ([7afa8a5](https://github.com/scaleway/scaleway-ui/commit/7afa8a53c3e45261c5c2dd95e087c48a9263f8ae))

### :bug: Bug Fixes

- **list:** do not allow 0 page count ([#1917](https://github.com/scaleway/scaleway-ui/issues/1917)) ([8ce037b](https://github.com/scaleway/scaleway-ui/commit/8ce037b3ce684d81a1d6beff8329813139a6f6c5))

## [0.198.1](https://github.com/scaleway/scaleway-ui/compare/v0.198.0...v0.198.1) (2022-09-30)

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.9 ([#1915](https://github.com/scaleway/scaleway-ui/issues/1915)) ([4812fd3](https://github.com/scaleway/scaleway-ui/commit/4812fd3a7225cb4b8516009f8ce27049cfa89937))
- **devdeps:** update actions/setup-node action to v3.5.0 ([#1913](https://github.com/scaleway/scaleway-ui/issues/1913)) ([23bad76](https://github.com/scaleway/scaleway-ui/commit/23bad767d0a81a06f74c8278b44646c042c23ba3))
- **devdeps:** update all devdeps to unlock renovate ([#1912](https://github.com/scaleway/scaleway-ui/issues/1912)) ([9cca699](https://github.com/scaleway/scaleway-ui/commit/9cca699e6d705a6aa82cee8b3e33625865fb6574))
- **devdeps:** update node.js to v18.10 ([#1914](https://github.com/scaleway/scaleway-ui/issues/1914)) ([e6ac8cf](https://github.com/scaleway/scaleway-ui/commit/e6ac8cffa835a81a0f91d7284c3d82afddacb3ea))
- **devdeps:** update pnpm to 7.12.2 ([#1911](https://github.com/scaleway/scaleway-ui/issues/1911)) ([7ce47cf](https://github.com/scaleway/scaleway-ui/commit/7ce47cf1bdf7de4f63082c0d318c427e9aafe53d))

### :bug: Bug Fixes

- **deps:** update jest monorepo to v29.1.2 ([#1916](https://github.com/scaleway/scaleway-ui/issues/1916)) ([87e0ace](https://github.com/scaleway/scaleway-ui/commit/87e0ace6283fb5068ec23284d0f3e864f339b29e))

## [0.198.0](https://github.com/scaleway/scaleway-ui/compare/v0.197.0...v0.198.0) (2022-09-29)

### :gear: Features

- new component Stack ([#1908](https://github.com/scaleway/scaleway-ui/issues/1908)) ([2fd5892](https://github.com/scaleway/scaleway-ui/commit/2fd589225a28ffa83807bb55b182476b320879b9))

## [0.197.0](https://github.com/scaleway/scaleway-ui/compare/v0.196.1...v0.197.0) (2022-09-29)

### :package: Chore

- **devdeps:** pin dependency @babel/core to 7.19.3 ([#1907](https://github.com/scaleway/scaleway-ui/issues/1907)) ([c540256](https://github.com/scaleway/scaleway-ui/commit/c540256e38404568a06758206487052d6aca4496))
- **devdeps:** update dependency @types/react to v18.0.21 ([#1897](https://github.com/scaleway/scaleway-ui/issues/1897)) ([8da5a2c](https://github.com/scaleway/scaleway-ui/commit/8da5a2c05ba557e61ab6c41553ffb5c8d66f34d0))

### :gear: Features

- remove propTypes ([#1909](https://github.com/scaleway/scaleway-ui/issues/1909)) ([2f449dc](https://github.com/scaleway/scaleway-ui/commit/2f449dc2cbaceeb28316400c3f0cc0f8e69c32a2))

## [0.196.1](https://github.com/scaleway/scaleway-ui/compare/v0.196.0...v0.196.1) (2022-09-28)

### :bug: Bug Fixes

- **PieChart:** allow scroll overflow on Legend ([#1906](https://github.com/scaleway/scaleway-ui/issues/1906)) ([e71d133](https://github.com/scaleway/scaleway-ui/commit/e71d1337a01ba2b0866c6c6134d057a8aec68894))

## [0.196.0](https://github.com/scaleway/scaleway-ui/compare/v0.195.0...v0.196.0) (2022-09-28)

### :gear: Features

- **Alert:** remove Box ([#1905](https://github.com/scaleway/scaleway-ui/issues/1905)) ([cacff50](https://github.com/scaleway/scaleway-ui/commit/cacff50ee831e57c027d3b9efc8870e999ed3f07))

## [0.195.0](https://github.com/scaleway/scaleway-ui/compare/v0.194.2...v0.195.0) (2022-09-28)

### :gear: Features

- **list:** better loading placeholder ([#1895](https://github.com/scaleway/scaleway-ui/issues/1895)) ([aef4827](https://github.com/scaleway/scaleway-ui/commit/aef48276f3e2379675cc0d9f094f686dd77607ec))

## [0.194.2](https://github.com/scaleway/scaleway-ui/compare/v0.194.1...v0.194.2) (2022-09-28)

### :zap: Refactor

- **typography:** remove typography ([#1903](https://github.com/scaleway/scaleway-ui/issues/1903)) ([411e5a0](https://github.com/scaleway/scaleway-ui/commit/411e5a0257f9ffb26a2fe1fd8ca7dc83021959c9))

### :package: Chore

- **devdeps:** update dependency @next/bundle-analyzer to v12.3.1 ([#1884](https://github.com/scaleway/scaleway-ui/issues/1884)) ([3cc458e](https://github.com/scaleway/scaleway-ui/commit/3cc458e8a26cefbef34da76b0bd93cdd631598f0))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.15 ([#1890](https://github.com/scaleway/scaleway-ui/issues/1890)) ([5f6883d](https://github.com/scaleway/scaleway-ui/commit/5f6883d0978329d1cdae05d293fc7074bb042ac9)), closes [#1893](https://github.com/scaleway/scaleway-ui/issues/1893) [#1886](https://github.com/scaleway/scaleway-ui/issues/1886) [#1893](https://github.com/scaleway/scaleway-ui/issues/1893) [#1898](https://github.com/scaleway/scaleway-ui/issues/1898) [#1898](https://github.com/scaleway/scaleway-ui/issues/1898) [#1892](https://github.com/scaleway/scaleway-ui/issues/1892) [#1892](https://github.com/scaleway/scaleway-ui/issues/1892) [#1891](https://github.com/scaleway/scaleway-ui/issues/1891) [#1891](https://github.com/scaleway/scaleway-ui/issues/1891) [#1901](https://github.com/scaleway/scaleway-ui/issues/1901) [#1901](https://github.com/scaleway/scaleway-ui/issues/1901) [#1896](https://github.com/scaleway/scaleway-ui/issues/1896) [#1900](https://github.com/scaleway/scaleway-ui/issues/1900) [#1896](https://github.com/scaleway/scaleway-ui/issues/1896) [#1900](https://github.com/scaleway/scaleway-ui/issues/1900) [#1894](https://github.com/scaleway/scaleway-ui/issues/1894) [#1894](https://github.com/scaleway/scaleway-ui/issues/1894) [#1902](https://github.com/scaleway/scaleway-ui/issues/1902) [#1902](https://github.com/scaleway/scaleway-ui/issues/1902) [#1903](https://github.com/scaleway/scaleway-ui/issues/1903)

### :bug: Bug Fixes

- **menu:** show args and valid code snippets in menu doc ([#1883](https://github.com/scaleway/scaleway-ui/issues/1883)) ([b439126](https://github.com/scaleway/scaleway-ui/commit/b43912689571b1f3e3db09375b06f2b4704178c5))
- radio checkbox and selectable card visible input ([#1904](https://github.com/scaleway/scaleway-ui/issues/1904)) ([b2c469b](https://github.com/scaleway/scaleway-ui/commit/b2c469b328029d352584c1a0398d589ff21df1b7))

## [0.194.1](https://github.com/scaleway/scaleway-ui/compare/v0.194.0...v0.194.1) (2022-09-27)

### :bug: Bug Fixes

- **pagination:** do not update max page when list is loading ([#1902](https://github.com/scaleway/scaleway-ui/issues/1902)) ([46ca18a](https://github.com/scaleway/scaleway-ui/commit/46ca18a8678f83ce83b830655e6081113ff7c3c7))

## [0.194.0](https://github.com/scaleway/scaleway-ui/compare/v0.193.0...v0.194.0) (2022-09-26)

### :gear: Features

- make pagination easy to use ([#1894](https://github.com/scaleway/scaleway-ui/issues/1894)) ([2c14da5](https://github.com/scaleway/scaleway-ui/commit/2c14da5d4b6484c71c36f7d073c5b082117accbf))

## [0.193.0](https://github.com/scaleway/scaleway-ui/compare/v0.192.0...v0.193.0) (2022-09-23)

### :gear: Features

- **Placeholder:** drop Box ([#1896](https://github.com/scaleway/scaleway-ui/issues/1896)) ([bf54c16](https://github.com/scaleway/scaleway-ui/commit/bf54c168f837af7794daba24a4c1b0b62e083db4))
- remove Range component ([#1900](https://github.com/scaleway/scaleway-ui/issues/1900)) ([c7bb130](https://github.com/scaleway/scaleway-ui/commit/c7bb13039944c89ef7788c9bdf8f13f8fa204886))

## [0.192.0](https://github.com/scaleway/scaleway-ui/compare/v0.191.1...v0.192.0) (2022-09-23)

### :gear: Features

- **list:** add correct type in SelectBar props ([#1901](https://github.com/scaleway/scaleway-ui/issues/1901)) ([2e6de9d](https://github.com/scaleway/scaleway-ui/commit/2e6de9d10314d3e39cdff14a58fa1b9e6ee5b336))

## [0.191.1](https://github.com/scaleway/scaleway-ui/compare/v0.191.0...v0.191.1) (2022-09-23)

### :bug: Bug Fixes

- **Placeholder:** set max-width on Line to avoid overflow ([#1891](https://github.com/scaleway/scaleway-ui/issues/1891)) ([5a4dcfa](https://github.com/scaleway/scaleway-ui/commit/5a4dcfad192cd0beb0cb8bd0067a3a9e7d55b802))

## [0.191.0](https://github.com/scaleway/scaleway-ui/compare/v0.190.7...v0.191.0) (2022-09-23)

### :gear: Features

- **font:** new code font and new line height ([#1892](https://github.com/scaleway/scaleway-ui/issues/1892)) ([3cbb51b](https://github.com/scaleway/scaleway-ui/commit/3cbb51bab743280a2fa15739f688801a83a1423d))

## [0.190.7](https://github.com/scaleway/scaleway-ui/compare/v0.190.6...v0.190.7) (2022-09-23)

### :bug: Bug Fixes

- radio and checkbox input ([#1898](https://github.com/scaleway/scaleway-ui/issues/1898)) ([4d5e9f5](https://github.com/scaleway/scaleway-ui/commit/4d5e9f568e91b2ff007b3ddda2e7cda441206fd2))

## [0.190.6](https://github.com/scaleway/scaleway-ui/compare/v0.190.5...v0.190.6) (2022-09-22)

### :package: Chore

- **devdeps:** update dependency @rollup/plugin-node-resolve to v14 ([#1886](https://github.com/scaleway/scaleway-ui/issues/1886)) ([ce203b2](https://github.com/scaleway/scaleway-ui/commit/ce203b298c35eec73a88cc8d86669173adff3ad9))

### :bug: Bug Fixes

- **radio:** correct primary color when activated ([#1893](https://github.com/scaleway/scaleway-ui/issues/1893)) ([8ade11a](https://github.com/scaleway/scaleway-ui/commit/8ade11aec1602361ff858cfd0875d2adb4301819))

## [0.190.5](https://github.com/scaleway/scaleway-ui/compare/v0.190.4...v0.190.5) (2022-09-21)

### :bug: Bug Fixes

- **status:** classname on container ([#1888](https://github.com/scaleway/scaleway-ui/issues/1888)) ([110ff7c](https://github.com/scaleway/scaleway-ui/commit/110ff7c7d4dd78f6825ecc2c405eea8795fc3142))

## [0.190.4](https://github.com/scaleway/scaleway-ui/compare/v0.190.3...v0.190.4) (2022-09-21)

### :bug: Bug Fixes

- **ci:** persist deployments in pull requests ([#1887](https://github.com/scaleway/scaleway-ui/issues/1887)) ([70b8e19](https://github.com/scaleway/scaleway-ui/commit/70b8e192346ee35e027e8802ff166af781144fb5))

## [0.190.3](https://github.com/scaleway/scaleway-ui/compare/v0.190.2...v0.190.3) (2022-09-21)

### :memo: Documentation

- revamp website with current guidelines ([#1878](https://github.com/scaleway/scaleway-ui/issues/1878)) ([d353866](https://github.com/scaleway/scaleway-ui/commit/d35386613253cf72b77bbaa36f43416df10d89ad))

### :bug: Bug Fixes

- **SelectableCard:** encapsulate children into div and add label ([#1835](https://github.com/scaleway/scaleway-ui/issues/1835)) ([f9ca801](https://github.com/scaleway/scaleway-ui/commit/f9ca80144590b7515a3e7aa15620e1dc5f3dd822))

## [0.190.2](https://github.com/scaleway/scaleway-ui/compare/v0.190.1...v0.190.2) (2022-09-21)

### :package: Chore

- **devdeps:** update codecov/codecov-action action to v3.1.1 ([#1879](https://github.com/scaleway/scaleway-ui/issues/1879)) ([44ba305](https://github.com/scaleway/scaleway-ui/commit/44ba30572866f0052ad31156ea89c83c6de09a70))
- **devdeps:** update dependency @scaleway/jest-helpers to v2.0.18 ([#1882](https://github.com/scaleway/scaleway-ui/issues/1882)) ([a0026a8](https://github.com/scaleway/scaleway-ui/commit/a0026a863117c4ecd1979ad52264228ee878a4f0))
- **devdeps:** update dependency typescript to v4.8.3 ([#1855](https://github.com/scaleway/scaleway-ui/issues/1855)) ([52b43ad](https://github.com/scaleway/scaleway-ui/commit/52b43ad8c23a5d9e5dd67433cf25e12b1b8764ac))

### :bug: Bug Fixes

- **deps:** update nivo monorepo to v0.80.0 ([#1885](https://github.com/scaleway/scaleway-ui/issues/1885)) ([f5224c8](https://github.com/scaleway/scaleway-ui/commit/f5224c86f1eda6d26f0aecdab76a497f00209d32))

## [0.190.1](https://github.com/scaleway/scaleway-ui/compare/v0.190.0...v0.190.1) (2022-09-20)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.14 ([#1856](https://github.com/scaleway/scaleway-ui/issues/1856)) ([f7c2d22](https://github.com/scaleway/scaleway-ui/commit/f7c2d225d89dfa8bf31e7e55e03ecc299f5537e8))

### :repeat: CI

- make sure image names don't start with a dash ([#1880](https://github.com/scaleway/scaleway-ui/issues/1880)) ([c1f2e41](https://github.com/scaleway/scaleway-ui/commit/c1f2e41ebca47df32caa64c3fdc4f927a65f72e7))

### :bug: Bug Fixes

- **status:** animation container ([#1881](https://github.com/scaleway/scaleway-ui/issues/1881)) ([e593ba7](https://github.com/scaleway/scaleway-ui/commit/e593ba7c23391824e736e19ce1bb2db5802c38bf))

## [0.190.0](https://github.com/scaleway/scaleway-ui/compare/v0.189.3...v0.190.0) (2022-09-19)

### :gear: Features

- **tooltip:** dymanic position ([#1857](https://github.com/scaleway/scaleway-ui/issues/1857)) ([5eca0e5](https://github.com/scaleway/scaleway-ui/commit/5eca0e5e82247c1f9a9fd1597ba3d93530ed2f52))

## [0.189.3](https://github.com/scaleway/scaleway-ui/compare/v0.189.2...v0.189.3) (2022-09-19)

### :package: Chore

- **devdeps:** update dependency @size-limit/file to v8.1.0 ([#1869](https://github.com/scaleway/scaleway-ui/issues/1869)) ([5891891](https://github.com/scaleway/scaleway-ui/commit/5891891c94fa7158f02681d511b869e139363823))
- **devdeps:** update node.js to v18.9 ([#1876](https://github.com/scaleway/scaleway-ui/issues/1876)) ([406b2ab](https://github.com/scaleway/scaleway-ui/commit/406b2ab6a9e77e6636efb8f5c4b64c0be84ea6cf))

### :bug: Bug Fixes

- **website:** documentation url ([#1877](https://github.com/scaleway/scaleway-ui/issues/1877)) ([9959dbf](https://github.com/scaleway/scaleway-ui/commit/9959dbf3c539ede3d7ec3a83dbb94644a3ba7400))

## [0.189.2](https://github.com/scaleway/scaleway-ui/compare/v0.189.1...v0.189.2) (2022-09-16)

### :bug: Bug Fixes

- **deploy:** change namespace id ([#1875](https://github.com/scaleway/scaleway-ui/issues/1875)) ([92dbbb6](https://github.com/scaleway/scaleway-ui/commit/92dbbb62c2ab38a53152b1f92ed340559399b076))

## [0.189.1](https://github.com/scaleway/scaleway-ui/compare/v0.189.0...v0.189.1) (2022-09-16)

### :zap: Refactor

- integrate scaleway ui website ([#1866](https://github.com/scaleway/scaleway-ui/issues/1866)) ([924ec21](https://github.com/scaleway/scaleway-ui/commit/924ec214c4ffcacd2f989dc72489d975c11bbeac))

### :bug: Bug Fixes

- fix ci for production deployment ([#1874](https://github.com/scaleway/scaleway-ui/issues/1874)) ([91cb4ba](https://github.com/scaleway/scaleway-ui/commit/91cb4bae5c00ccea178a214076f85d31a62830bd))

## [0.189.0](https://github.com/scaleway/scaleway-ui/compare/v0.188.2...v0.189.0) (2022-09-16)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.6.2 ([#1868](https://github.com/scaleway/scaleway-ui/issues/1868)) ([c6e5d31](https://github.com/scaleway/scaleway-ui/commit/c6e5d31e703a703947321d0fc6c8cfeb5858703e))
- **devdeps:** update dependency eslint to v8.23.1 ([#1852](https://github.com/scaleway/scaleway-ui/issues/1852)) ([4f04b24](https://github.com/scaleway/scaleway-ui/commit/4f04b243bda0a61a5e5c6af62016bf7295c1ab86))

### :gear: Features

- **status:** add better animation for status ([#1872](https://github.com/scaleway/scaleway-ui/issues/1872)) ([e63c5b1](https://github.com/scaleway/scaleway-ui/commit/e63c5b1b1ffeaca1f031cde619dac2efc670d963))

## [0.188.2](https://github.com/scaleway/scaleway-ui/compare/v0.188.1...v0.188.2) (2022-09-15)

### :package: Chore

- **devdeps:** update dependency date-fns to v2.29.3 ([#1864](https://github.com/scaleway/scaleway-ui/issues/1864)) ([5cb3c91](https://github.com/scaleway/scaleway-ui/commit/5cb3c9177a83bbb78764011c8f4a790cc0c9fd81))

### :bug: Bug Fixes

- visual testing on menu is back ([#1861](https://github.com/scaleway/scaleway-ui/issues/1861)) ([0315e86](https://github.com/scaleway/scaleway-ui/commit/0315e863484641e90259ac91ec984251ddfce846))

## [0.188.1](https://github.com/scaleway/scaleway-ui/compare/v0.188.0...v0.188.1) (2022-09-15)

### :package: Chore

- **devdeps:** update babel monorepo ([#1849](https://github.com/scaleway/scaleway-ui/issues/1849)) ([0308472](https://github.com/scaleway/scaleway-ui/commit/03084722417e6fb57d64e33572e9eb1f655d2b43))
- **devdeps:** update dependency @scaleway/jest-helpers to v2.0.17 ([#1858](https://github.com/scaleway/scaleway-ui/issues/1858)) ([62b96b0](https://github.com/scaleway/scaleway-ui/commit/62b96b07f13978848b76898d411dc02a81b1e950))

### :bug: Bug Fixes

- **deps:** update jest monorepo to v29.0.3 ([#1867](https://github.com/scaleway/scaleway-ui/issues/1867)) ([17f2d81](https://github.com/scaleway/scaleway-ui/commit/17f2d819a5dbc69164c2b431a12184b0d818bc87))

## [0.188.0](https://github.com/scaleway/scaleway-ui/compare/v0.187.6...v0.188.0) (2022-09-14)

### :package: Chore

- **devdeps:** update dependency rollup to v2.79.0 ([#1853](https://github.com/scaleway/scaleway-ui/issues/1853)) ([f5c8c9a](https://github.com/scaleway/scaleway-ui/commit/f5c8c9a5c4e73d9a853681bcd6d503792d6ee18f))

### :gear: Features

- **switchbutton:** add animation ([#1844](https://github.com/scaleway/scaleway-ui/issues/1844)) ([74e3114](https://github.com/scaleway/scaleway-ui/commit/74e31144141eb651899ea381e1d6d2123c82831a))

## [0.187.6](https://github.com/scaleway/scaleway-ui/compare/v0.187.5...v0.187.6) (2022-09-14)

## [0.187.5](https://github.com/scaleway/scaleway-ui/compare/v0.187.4...v0.187.5) (2022-09-14)

### :repeat: CI

- update pnpm version ([#1859](https://github.com/scaleway/scaleway-ui/issues/1859)) ([d75035e](https://github.com/scaleway/scaleway-ui/commit/d75035ed1f15429345775b6670f59ad69cba1fca))

### :package: Chore

- **devdeps:** update commitlint monorepo ([#1850](https://github.com/scaleway/scaleway-ui/issues/1850)) ([a4fbd51](https://github.com/scaleway/scaleway-ui/commit/a4fbd51da1dea959d3edb275cb26f4180435d2c8))
- **devdeps:** update dependency @types/react to v18.0.20 ([#1860](https://github.com/scaleway/scaleway-ui/issues/1860)) ([36f8f14](https://github.com/scaleway/scaleway-ui/commit/36f8f14a35377dc467145c30f9c6a055a72bc08c))
- **devdeps:** update dependency jest-junit to v14.0.1 ([#1847](https://github.com/scaleway/scaleway-ui/issues/1847)) ([ed08c8a](https://github.com/scaleway/scaleway-ui/commit/ed08c8a4febdf8d8a69e15c08fb1738676a7e2ba))
- **devdeps:** update dependency rollup-plugin-visualizer to v5.8.1 ([#1854](https://github.com/scaleway/scaleway-ui/issues/1854)) ([e0c3273](https://github.com/scaleway/scaleway-ui/commit/e0c3273dba2a77eaeec0c78cd2713905002ba579))
- **devdeps:** update semantic-release monorepo ([#1848](https://github.com/scaleway/scaleway-ui/issues/1848)) ([90a741d](https://github.com/scaleway/scaleway-ui/commit/90a741d96aee0e378bcf24b46dd3726685c2df40))

### :bug: Bug Fixes

- **linechart:** select chart even when provided asynchronously ([#1863](https://github.com/scaleway/scaleway-ui/issues/1863)) ([963a7c3](https://github.com/scaleway/scaleway-ui/commit/963a7c389ab091b72142363fa8df766d5703ebc3))

## [0.187.4](https://github.com/scaleway/scaleway-ui/compare/v0.187.3...v0.187.4) (2022-09-12)

### :bug: Bug Fixes

- **react:** remove unused import thanks to new transformer ([#1846](https://github.com/scaleway/scaleway-ui/issues/1846)) ([0385e85](https://github.com/scaleway/scaleway-ui/commit/0385e857846e0717fe24cf8f3ab67716ace99dac))

### :memo: Documentation

- **storybook:** remove useless require-for-string peer-deps ([#1845](https://github.com/scaleway/scaleway-ui/issues/1845)) ([a51a7b6](https://github.com/scaleway/scaleway-ui/commit/a51a7b697cdb58d0d9a36499287d104abcb38f43))

## [0.187.3](https://github.com/scaleway/scaleway-ui/compare/v0.187.2...v0.187.3) (2022-09-09)

### :bug: Bug Fixes

- **richselect:** multi value padding without top label ([#1837](https://github.com/scaleway/scaleway-ui/issues/1837)) ([fde6a1f](https://github.com/scaleway/scaleway-ui/commit/fde6a1f2bb3d8470047eff3b4e159da11d02ba87))

## [0.187.2](https://github.com/scaleway/scaleway-ui/compare/v0.187.1...v0.187.2) (2022-09-09)

### :zap: Refactor

- remove flexbox for good ([#1838](https://github.com/scaleway/scaleway-ui/issues/1838)) ([c2c0c21](https://github.com/scaleway/scaleway-ui/commit/c2c0c21a21c7bc98eacaeef9487cb73ade481773)), closes [#1780](https://github.com/scaleway/scaleway-ui/issues/1780)

### :bug: Bug Fixes

- **PlaceHolder:** make it compatible dark theme ([#1839](https://github.com/scaleway/scaleway-ui/issues/1839)) ([800d66a](https://github.com/scaleway/scaleway-ui/commit/800d66adc56bdf69701f5f73603c9d91fb4d34fe))
- **RadioBorderedBox:** remove from library ([#1832](https://github.com/scaleway/scaleway-ui/issues/1832)) ([b38b066](https://github.com/scaleway/scaleway-ui/commit/b38b06634c06e3a5c900f9a9c190aba7a2f16ae5))

## [0.187.1](https://github.com/scaleway/scaleway-ui/compare/v0.187.0...v0.187.1) (2022-09-08)

### :repeat: CI

- add tolerence to fix M1 test update ([#1840](https://github.com/scaleway/scaleway-ui/issues/1840)) ([efa1f6a](https://github.com/scaleway/scaleway-ui/commit/efa1f6a5820b55ab8f0b7822029e3d728f16d945))

### :bug: Bug Fixes

- **Text:** italic & underline missing semicolon ([#1841](https://github.com/scaleway/scaleway-ui/issues/1841)) ([a7fce53](https://github.com/scaleway/scaleway-ui/commit/a7fce535fe40abee2a59e6b24f65187638490628))

## [0.187.0](https://github.com/scaleway/scaleway-ui/compare/v0.186.0...v0.187.0) (2022-09-07)

### :gear: Features

- **TextBox:** add OnKeyUp & onKeyDown ([#1836](https://github.com/scaleway/scaleway-ui/issues/1836)) ([40bbd4f](https://github.com/scaleway/scaleway-ui/commit/40bbd4fa2f7fde11553b49bc39b58aacbfbf1689))

## [0.186.0](https://github.com/scaleway/scaleway-ui/compare/v0.185.1...v0.186.0) (2022-09-06)

### :gear: Features

- new tabs components ([#1807](https://github.com/scaleway/scaleway-ui/issues/1807)) ([af6e486](https://github.com/scaleway/scaleway-ui/commit/af6e48620f032652a7cdb94f27ff0aaf8bdee193))

## [0.185.1](https://github.com/scaleway/scaleway-ui/compare/v0.185.0...v0.185.1) (2022-09-05)

### :bug: Bug Fixes

- **deps:** update jest monorepo ([#1833](https://github.com/scaleway/scaleway-ui/issues/1833)) ([ff1369d](https://github.com/scaleway/scaleway-ui/commit/ff1369d0f51138c72958037157c4ad04f40c2b34))

## [0.185.0](https://github.com/scaleway/scaleway-ui/compare/v0.184.1...v0.185.0) (2022-09-02)

### :package: Chore

- **devdeps:** update emotion monorepo ([#1820](https://github.com/scaleway/scaleway-ui/issues/1820)) ([7cd79e0](https://github.com/scaleway/scaleway-ui/commit/7cd79e030957228d65c46e157c9873904ba0bae2))

### :gear: Features

- change loader by placeholder in List ([#1828](https://github.com/scaleway/scaleway-ui/issues/1828)) ([f1ea827](https://github.com/scaleway/scaleway-ui/commit/f1ea82752cf26e13aec985c8b99b16df171e81d8))

## [0.184.1](https://github.com/scaleway/scaleway-ui/compare/v0.184.0...v0.184.1) (2022-08-31)

### :bug: Bug Fixes

- export utils ([#1831](https://github.com/scaleway/scaleway-ui/issues/1831)) ([7569297](https://github.com/scaleway/scaleway-ui/commit/7569297f1f87cb36e94f6dc7638bd8e2293159d6))

## [0.184.0](https://github.com/scaleway/scaleway-ui/compare/v0.183.3...v0.184.0) (2022-08-31)

### :gear: Features

- **icons:** add reboot icon ([#1824](https://github.com/scaleway/scaleway-ui/issues/1824)) ([bd696fe](https://github.com/scaleway/scaleway-ui/commit/bd696fedf3f01c513a734af001a9420839b7c6a2))

## [0.183.3](https://github.com/scaleway/scaleway-ui/compare/v0.183.2...v0.183.3) (2022-08-31)

### :bug: Bug Fixes

- **Checkbox:** types ([#1829](https://github.com/scaleway/scaleway-ui/issues/1829)) ([252b189](https://github.com/scaleway/scaleway-ui/commit/252b1898b15d121a9d31d677b219025a9df542a8))
- update ci ([#1830](https://github.com/scaleway/scaleway-ui/issues/1830)) ([2eec5fa](https://github.com/scaleway/scaleway-ui/commit/2eec5fac804ef61b1c8623cfdd83c75f33c671a5))
- use `useId` instead of `useUUID` ([#1826](https://github.com/scaleway/scaleway-ui/issues/1826)) ([320f34e](https://github.com/scaleway/scaleway-ui/commit/320f34eedcb2d1e1c4357a951a56d5c565dab938))

## [0.183.2](https://github.com/scaleway/scaleway-ui/compare/v0.183.1...v0.183.2) (2022-08-30)

### :bug: Bug Fixes

- **radio:** nested radio container hover ([#1823](https://github.com/scaleway/scaleway-ui/issues/1823)) ([05dcf8c](https://github.com/scaleway/scaleway-ui/commit/05dcf8c416c7d40643cc9a0be698cd0499f08f41))
- **Toggle:** add classname ([#1827](https://github.com/scaleway/scaleway-ui/issues/1827)) ([07015e6](https://github.com/scaleway/scaleway-ui/commit/07015e6383603223e5f5f007e653e807d8f47e8a))

## [0.183.1](https://github.com/scaleway/scaleway-ui/compare/v0.183.0...v0.183.1) (2022-08-30)

### :bug: Bug Fixes

- **toggle:** uncontrolled and controlled behavior are wrong ([#1825](https://github.com/scaleway/scaleway-ui/issues/1825)) ([f07ba96](https://github.com/scaleway/scaleway-ui/commit/f07ba96d642ad35a29a74b0219f4c7d95ba95117))

## [0.183.0](https://github.com/scaleway/scaleway-ui/compare/v0.182.5...v0.183.0) (2022-08-30)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.7 ([#1821](https://github.com/scaleway/scaleway-ui/issues/1821)) ([5145081](https://github.com/scaleway/scaleway-ui/commit/5145081ec200c383bf69a2e4c10ecd15f85505dd))
- **devdeps:** update dependency @scaleway/jest-helpers to v2.0.14 ([#1816](https://github.com/scaleway/scaleway-ui/issues/1816)) ([b096830](https://github.com/scaleway/scaleway-ui/commit/b0968303c3538b2fbea8833562ad854eb17405bf))
- **devdeps:** update node.js to v18.8 ([#1805](https://github.com/scaleway/scaleway-ui/issues/1805)) ([74ffdcb](https://github.com/scaleway/scaleway-ui/commit/74ffdcba061ab502b5550c33ecbd7dd6dd65d0ed))
- **react-count:** remove unused dependency ([#1818](https://github.com/scaleway/scaleway-ui/issues/1818)) ([6d5656d](https://github.com/scaleway/scaleway-ui/commit/6d5656d04d47604aa87abce231dc77b99c575ea2))

### :gear: Features

- **Toggle:** refactor of component ([#1792](https://github.com/scaleway/scaleway-ui/issues/1792)) ([73df0f6](https://github.com/scaleway/scaleway-ui/commit/73df0f61d668462ab89587f24cf770bf5e3a6a0a))

## [0.182.5](https://github.com/scaleway/scaleway-ui/compare/v0.182.4...v0.182.5) (2022-08-29)

### :bug: Bug Fixes

- button icon color when disabled ([#1814](https://github.com/scaleway/scaleway-ui/issues/1814)) ([2d28831](https://github.com/scaleway/scaleway-ui/commit/2d2883180c19778527764a9d9da8799d8f055db9))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.6 ([#1813](https://github.com/scaleway/scaleway-ui/issues/1813)) ([6c8209a](https://github.com/scaleway/scaleway-ui/commit/6c8209a0e10a4852969b6399b60c669f4ddfabac))
- **devdeps:** update dependency @scaleway/use-i18n to v3.5.3 ([#1812](https://github.com/scaleway/scaleway-ui/issues/1812)) ([081bd32](https://github.com/scaleway/scaleway-ui/commit/081bd32c8f1b4c8c7c4c549c247599ef0bca4af2))

## [0.182.4](https://github.com/scaleway/scaleway-ui/compare/v0.182.3...v0.182.4) (2022-08-29)

### :bug: Bug Fixes

- **SwitchButton:** disabled prop ([#1815](https://github.com/scaleway/scaleway-ui/issues/1815)) ([2243093](https://github.com/scaleway/scaleway-ui/commit/22430933baae2b8a49177cce249dc5cddfa73950))

## [0.182.3](https://github.com/scaleway/scaleway-ui/compare/v0.182.2...v0.182.3) (2022-08-29)

### :bug: Bug Fixes

- **deps:** update jest monorepo to v29 (major) ([#1806](https://github.com/scaleway/scaleway-ui/issues/1806)) ([df775b9](https://github.com/scaleway/scaleway-ui/commit/df775b9652e1cff815e8b12ea47610e58aa2d7cd))

## [0.182.2](https://github.com/scaleway/scaleway-ui/compare/v0.182.1...v0.182.2) (2022-08-26)

### :bug: Bug Fixes

- **SwitchButton:** drop animation ([#1810](https://github.com/scaleway/scaleway-ui/issues/1810)) ([53cbc72](https://github.com/scaleway/scaleway-ui/commit/53cbc72ce5ffa1a72e69bb6dff82c8bca4816786))

## [0.182.1](https://github.com/scaleway/scaleway-ui/compare/v0.182.0...v0.182.1) (2022-08-26)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.4.3 ([#1794](https://github.com/scaleway/scaleway-ui/issues/1794)) ([ba64294](https://github.com/scaleway/scaleway-ui/commit/ba64294c01abf6fac65d68a60e17214b0ddae437))

### :repeat: CI

- **codecov:** correct fix ([#1809](https://github.com/scaleway/scaleway-ui/issues/1809)) ([4c50608](https://github.com/scaleway/scaleway-ui/commit/4c5060853921a005fe5e69d38575f03a64c3b5b7))

### :bug: Bug Fixes

- **SwitchButton:** make background size dynamic using refs ([#1808](https://github.com/scaleway/scaleway-ui/issues/1808)) ([66d0ee9](https://github.com/scaleway/scaleway-ui/commit/66d0ee9717ce0c52d248aa02f69f6257f3283d5e))

## [0.182.0](https://github.com/scaleway/scaleway-ui/compare/v0.181.1...v0.182.0) (2022-08-25)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.3 ([#1804](https://github.com/scaleway/scaleway-ui/issues/1804)) ([b255dac](https://github.com/scaleway/scaleway-ui/commit/b255dacb519ff3337623f2a3174f45411b9031ea))

### :repeat: CI

- **codecov:** fix very low coverage changes on PR ([#1803](https://github.com/scaleway/scaleway-ui/issues/1803)) ([34e9e1e](https://github.com/scaleway/scaleway-ui/commit/34e9e1e71d579209f0e3244ccf29e6c0095035a9))

### :gear: Features

- **SwitchButton:** full refacto ([#1802](https://github.com/scaleway/scaleway-ui/issues/1802)) ([5536747](https://github.com/scaleway/scaleway-ui/commit/55367476207d09e1ef8980a7091141695f434e62))

## [0.181.1](https://github.com/scaleway/scaleway-ui/compare/v0.181.0...v0.181.1) (2022-08-23)

### :repeat: CI

- **visual:** fix tests ([#1801](https://github.com/scaleway/scaleway-ui/issues/1801)) ([b8280ee](https://github.com/scaleway/scaleway-ui/commit/b8280ee3a0120baee7b66f572beaff4561494649))

### :zap: Refactor

- remove typography usage ([#1762](https://github.com/scaleway/scaleway-ui/issues/1762)) ([7801d68](https://github.com/scaleway/scaleway-ui/commit/7801d68ac27764ffb57b6e3596db231557513091))

### :package: Chore

- **deps:** update react monorepo to v18 ([#1800](https://github.com/scaleway/scaleway-ui/issues/1800)) ([66cfccf](https://github.com/scaleway/scaleway-ui/commit/66cfccf040763ad62101b600c6be319c48bb07b3))
- **devdeps:** update actions/cache action to v3.0.8 ([#1799](https://github.com/scaleway/scaleway-ui/issues/1799)) ([d3769b0](https://github.com/scaleway/scaleway-ui/commit/d3769b001a4e84b06a49146196873932e2958e8a))

## [0.181.0](https://github.com/scaleway/scaleway-ui/compare/v0.180.0...v0.181.0) (2022-08-19)

### :gear: Features

- port Description from console ([#1751](https://github.com/scaleway/scaleway-ui/issues/1751)) ([4c82a8e](https://github.com/scaleway/scaleway-ui/commit/4c82a8ec2031ac0c1a9a1ab3190b78d3dd4ca0f8))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.2 ([#1796](https://github.com/scaleway/scaleway-ui/issues/1796)) ([52df13a](https://github.com/scaleway/scaleway-ui/commit/52df13a6b3ade5ac8c4903fa17fccebbcf81923d))
- **devdeps:** update dependency date-fns to v2.29.2 ([#1798](https://github.com/scaleway/scaleway-ui/issues/1798)) ([6b6a584](https://github.com/scaleway/scaleway-ui/commit/6b6a584a7250b1784c974695875fac33edb68dbf))

## [0.180.0](https://github.com/scaleway/scaleway-ui/compare/v0.179.1...v0.180.0) (2022-08-19)

### :package: Chore

- **devdeps:** update dependency eslint to v8.22.0 ([#1793](https://github.com/scaleway/scaleway-ui/issues/1793)) ([e419d46](https://github.com/scaleway/scaleway-ui/commit/e419d465ea6ddca84dee5c4c2c972d8a855f55c0))
- **devdeps:** update pnpm to v7.9.3 ([#1789](https://github.com/scaleway/scaleway-ui/issues/1789)) ([bf1f2f1](https://github.com/scaleway/scaleway-ui/commit/bf1f2f194c2001076eadf448924ff1c2e06f26ad))

### :gear: Features

- **ProgressionButton:** remove BoxProps ([#1776](https://github.com/scaleway/scaleway-ui/issues/1776)) ([c8f7221](https://github.com/scaleway/scaleway-ui/commit/c8f72216464b5d7f8e8ef497bbdc59787214459f))

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/use-media to v1.2.0 ([#1795](https://github.com/scaleway/scaleway-ui/issues/1795)) ([0a451ba](https://github.com/scaleway/scaleway-ui/commit/0a451ba77a636a4ec752b1fe6d71da198f1c66f2))

## [0.179.1](https://github.com/scaleway/scaleway-ui/compare/v0.179.0...v0.179.1) (2022-08-18)

### :bug: Bug Fixes

- remove phone input component ([#1787](https://github.com/scaleway/scaleway-ui/issues/1787)) ([67e1f94](https://github.com/scaleway/scaleway-ui/commit/67e1f94345cca2ea11bcf15d446867c4fb4fd0c6))

### :package: Chore

- correct lockfile ([5c1c2a5](https://github.com/scaleway/scaleway-ui/commit/5c1c2a567327933410c635074457d8706d5f0446))
- **devdeps:** update dependency @types/react to v18.0.17 ([#1785](https://github.com/scaleway/scaleway-ui/issues/1785)) ([490ba9d](https://github.com/scaleway/scaleway-ui/commit/490ba9dd4ac2206735d21b6da29f4949d88f5a18))
- **devdeps:** update dependency @types/react-dom to v18.0.6 ([#1786](https://github.com/scaleway/scaleway-ui/issues/1786)) ([48a991b](https://github.com/scaleway/scaleway-ui/commit/48a991b1fe8eec52d34b12e537984c2961bd2057))

## [0.179.0](https://github.com/scaleway/scaleway-ui/compare/v0.178.3...v0.179.0) (2022-08-17)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.1 ([#1774](https://github.com/scaleway/scaleway-ui/issues/1774)) ([9cab428](https://github.com/scaleway/scaleway-ui/commit/9cab428c6f06bda0597f4ed4184577212330e91a))

### :gear: Features

- react 18 ([#1775](https://github.com/scaleway/scaleway-ui/issues/1775)) ([8cb0007](https://github.com/scaleway/scaleway-ui/commit/8cb000712810ca9a0b96fa384f0ee31cb71aae9b)), closes [#1642](https://github.com/scaleway/scaleway-ui/issues/1642) [#1645](https://github.com/scaleway/scaleway-ui/issues/1645)

## [0.178.3](https://github.com/scaleway/scaleway-ui/compare/v0.178.2...v0.178.3) (2022-08-16)

### :package: Chore

- **devdeps:** update dependency size-limit to v8.0.1 ([#1769](https://github.com/scaleway/scaleway-ui/issues/1769)) ([954f15f](https://github.com/scaleway/scaleway-ui/commit/954f15fd23c748eca1d4e8e52d2165094691ee94))

### :bug: Bug Fixes

- **SelectableCard:** avoid hidding all children svg ([#1773](https://github.com/scaleway/scaleway-ui/issues/1773)) ([8e14af6](https://github.com/scaleway/scaleway-ui/commit/8e14af617cefb355599f491f571ebbe0f3183514))

## [0.178.2](https://github.com/scaleway/scaleway-ui/compare/v0.178.1...v0.178.2) (2022-08-16)

### :package: Chore

- **devdeps:** update dependency @size-limit/file to v8.0.1 ([#1767](https://github.com/scaleway/scaleway-ui/issues/1767)) ([fd3f783](https://github.com/scaleway/scaleway-ui/commit/fd3f7831905b9e712d9944f44de32539a0f47dae))
- **devdeps:** update dependency @types/jest to v28 ([#1538](https://github.com/scaleway/scaleway-ui/issues/1538)) ([01be0f3](https://github.com/scaleway/scaleway-ui/commit/01be0f30c0998c9dfdac20ec6be1fe247e3c1b5a))

### :bug: Bug Fixes

- **SelectableCard:** support tooltip ([#1771](https://github.com/scaleway/scaleway-ui/issues/1771)) ([aca579e](https://github.com/scaleway/scaleway-ui/commit/aca579ea7c0784d405e0367cbff8c4a7827e7e0d))

## [0.178.1](https://github.com/scaleway/scaleway-ui/compare/v0.178.0...v0.178.1) (2022-08-16)

### :package: Chore

- **devdeps:** update dependency @testing-library/dom to v8.17.1 ([#1772](https://github.com/scaleway/scaleway-ui/issues/1772)) ([5b481f4](https://github.com/scaleway/scaleway-ui/commit/5b481f471b0927352137659f019de63ff7005c27))
- **devdeps:** update dependency rollup to v2.77.3 ([#1770](https://github.com/scaleway/scaleway-ui/issues/1770)) ([7070ec9](https://github.com/scaleway/scaleway-ui/commit/7070ec9f1aa0e6afa5b191f40839c8a039abe085))

### :repeat: CI

- mock random globally ([#1763](https://github.com/scaleway/scaleway-ui/issues/1763)) ([a176f31](https://github.com/scaleway/scaleway-ui/commit/a176f3156054992ffea59249a6792efe588fdcef))

### :bug: Bug Fixes

- **pagination:** double arrow icon too small ([#1764](https://github.com/scaleway/scaleway-ui/issues/1764)) ([7a10b2a](https://github.com/scaleway/scaleway-ui/commit/7a10b2ac89a9efe54292c69c91986d218ae98fff))

## [0.178.0](https://github.com/scaleway/scaleway-ui/compare/v0.177.1...v0.178.0) (2022-08-11)

### :zap: Refactor

- remove flexbox usage ([#1752](https://github.com/scaleway/scaleway-ui/issues/1752)) ([cabe0b4](https://github.com/scaleway/scaleway-ui/commit/cabe0b4ca4f88045bded79cf333784099858adf2))

### :gear: Features

- **Notice:** migrate from Box to div ([#1753](https://github.com/scaleway/scaleway-ui/issues/1753)) ([c9488b0](https://github.com/scaleway/scaleway-ui/commit/c9488b0d151ed91da76f2e681d06c02b00bade4b))

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.7 ([#1759](https://github.com/scaleway/scaleway-ui/issues/1759)) ([958924d](https://github.com/scaleway/scaleway-ui/commit/958924d3d779e9b65c09affb2d1794305827c687))
- **devdeps:** update pnpm to v7.9.0 ([#1766](https://github.com/scaleway/scaleway-ui/issues/1766)) ([912c521](https://github.com/scaleway/scaleway-ui/commit/912c5211c90c0038a04d0220637cbc201e1f3d79))

## [0.177.1](https://github.com/scaleway/scaleway-ui/compare/v0.177.0...v0.177.1) (2022-08-11)

### :bug: Bug Fixes

- radio and selectablecard ([#1758](https://github.com/scaleway/scaleway-ui/issues/1758)) ([7619416](https://github.com/scaleway/scaleway-ui/commit/7619416c4fe33b7a05144bd2ae89b1d56664fae0))

## [0.177.0](https://github.com/scaleway/scaleway-ui/compare/v0.176.0...v0.177.0) (2022-08-11)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.5.0 ([#1745](https://github.com/scaleway/scaleway-ui/issues/1745)) ([f55c2c3](https://github.com/scaleway/scaleway-ui/commit/f55c2c3cb7a4dba7c262c66b9bd7b2bbd46fd357))

### :gear: Features

- make text support italic and underline ([#1750](https://github.com/scaleway/scaleway-ui/issues/1750)) ([6b9b84e](https://github.com/scaleway/scaleway-ui/commit/6b9b84ec55897bd0ebaddad1e17be9227a82e1df))

## [0.176.0](https://github.com/scaleway/scaleway-ui/compare/v0.175.3...v0.176.0) (2022-08-10)

### :gear: Features

- **RadioBorderedBox:** use SelectableCard ([#1748](https://github.com/scaleway/scaleway-ui/issues/1748)) ([b54b819](https://github.com/scaleway/scaleway-ui/commit/b54b819543ef5fa5ad3c82eb2c4b9f611460969f))

## [0.175.3](https://github.com/scaleway/scaleway-ui/compare/v0.175.2...v0.175.3) (2022-08-10)

### :bug: Bug Fixes

- labelDescription parm ([#1746](https://github.com/scaleway/scaleway-ui/issues/1746)) ([de95174](https://github.com/scaleway/scaleway-ui/commit/de95174518154782e8e466e83cfb16009a049590))

## [0.175.2](https://github.com/scaleway/scaleway-ui/compare/v0.175.1...v0.175.2) (2022-08-10)

### :bug: Bug Fixes

- export selectable card ([#1749](https://github.com/scaleway/scaleway-ui/issues/1749)) ([5cc738e](https://github.com/scaleway/scaleway-ui/commit/5cc738ee0b83d5fbc0e7b459c8ee700805a7c76a))

## [0.175.1](https://github.com/scaleway/scaleway-ui/compare/v0.175.0...v0.175.1) (2022-08-10)

### :bug: Bug Fixes

- **BarChart:** tickvalue prop typing ([#1747](https://github.com/scaleway/scaleway-ui/issues/1747)) ([ffa7067](https://github.com/scaleway/scaleway-ui/commit/ffa7067f0125ddb93d0e6058ce2d1973dc796a8f))

## [0.175.0](https://github.com/scaleway/scaleway-ui/compare/v0.174.1...v0.175.0) (2022-08-09)

### :gear: Features

- new selectablecard component ([#1727](https://github.com/scaleway/scaleway-ui/issues/1727)) ([6896697](https://github.com/scaleway/scaleway-ui/commit/6896697faaf94f976a1f71a0ea3f4be8d48fa10a))

## [0.174.1](https://github.com/scaleway/scaleway-ui/compare/v0.174.0...v0.174.1) (2022-08-09)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.49 ([#1741](https://github.com/scaleway/scaleway-ui/issues/1741)) ([4261eb7](https://github.com/scaleway/scaleway-ui/commit/4261eb7b401337dd713942cee71aaa473fe080a1))

### :zap: Refactor

- 💡 list.ExpandableContent type ([#1742](https://github.com/scaleway/scaleway-ui/issues/1742)) ([8598f94](https://github.com/scaleway/scaleway-ui/commit/8598f94b7caf62901cadd90d50b380ef4f32bfc2))

### :repeat: CI

- max coverage on RadioBorderedBox, Tag and Text ([#1728](https://github.com/scaleway/scaleway-ui/issues/1728)) ([6aa0aca](https://github.com/scaleway/scaleway-ui/commit/6aa0acac0d589267b5902c3aca376df1a9d410ba))

### :bug: Bug Fixes

- **PieChart:** tooltip alignement ([#1744](https://github.com/scaleway/scaleway-ui/issues/1744)) ([946c456](https://github.com/scaleway/scaleway-ui/commit/946c45671735d3bc63f8622bbc6f2a119e962e02))

## [0.174.0](https://github.com/scaleway/scaleway-ui/compare/v0.173.5...v0.174.0) (2022-08-08)

### :gear: Features

- **menu:** portal menu list ([#1740](https://github.com/scaleway/scaleway-ui/issues/1740)) ([4043263](https://github.com/scaleway/scaleway-ui/commit/4043263008b0cf76474ee5bda529c5690cf45480))

## [0.173.5](https://github.com/scaleway/scaleway-ui/compare/v0.173.4...v0.173.5) (2022-08-08)

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.0.8 ([#1737](https://github.com/scaleway/scaleway-ui/issues/1737)) ([d10ff1a](https://github.com/scaleway/scaleway-ui/commit/d10ff1a42e9186a8d4f65fe2de25b745bd87276a))

### :package: Chore

- **devdeps:** update dependency @testing-library/dom to v8.16.1 ([#1734](https://github.com/scaleway/scaleway-ui/issues/1734)) ([e4e95b3](https://github.com/scaleway/scaleway-ui/commit/e4e95b30462a8673849dd6d9e1b7dbeedd355f81))
- **devdeps:** update dependency @testing-library/jest-dom to v5.16.5 ([#1735](https://github.com/scaleway/scaleway-ui/issues/1735)) ([996fce6](https://github.com/scaleway/scaleway-ui/commit/996fce6fd6ce05cab20866b896c5936af08e108e))
- **devdeps:** update dependency eslint to v8.21.0 ([#1736](https://github.com/scaleway/scaleway-ui/issues/1736)) ([aa9ee22](https://github.com/scaleway/scaleway-ui/commit/aa9ee22b6621193bdc0b4144f2b0307802484bf3))
- **devdeps:** update dependency postcss to v8.4.16 ([#1738](https://github.com/scaleway/scaleway-ui/issues/1738)) ([cf6119a](https://github.com/scaleway/scaleway-ui/commit/cf6119a034e267c0e0f8bee78debdb27ec06e97f))
- **devdeps:** update docker/build-push-action action to v3.1.1 ([#1733](https://github.com/scaleway/scaleway-ui/issues/1733)) ([f5f61b0](https://github.com/scaleway/scaleway-ui/commit/f5f61b0f6f1443cf1d06eeb3b84be4b418ff99d4))

## [0.173.4](https://github.com/scaleway/scaleway-ui/compare/v0.173.3...v0.173.4) (2022-08-05)

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.6 ([#1731](https://github.com/scaleway/scaleway-ui/issues/1731)) ([544040e](https://github.com/scaleway/scaleway-ui/commit/544040e2f0b1a46468a7b8ee0454a79bcf5670fb))

### :bug: Bug Fixes

- **link:** animation is broken when text follow ([#1730](https://github.com/scaleway/scaleway-ui/issues/1730)) ([a8ed797](https://github.com/scaleway/scaleway-ui/commit/a8ed79732b2c088a68efb828e41c3eb9531b862e))

## [0.173.3](https://github.com/scaleway/scaleway-ui/compare/v0.173.2...v0.173.3) (2022-08-05)

### :package: Chore

- **devdeps:** update pnpm to v7.8.0 ([#1732](https://github.com/scaleway/scaleway-ui/issues/1732)) ([09553a5](https://github.com/scaleway/scaleway-ui/commit/09553a53d86a9df483a9af2d23232b68d538c400))
- **devdeps:** update storybook monorepo to v6.5.10 ([#1729](https://github.com/scaleway/scaleway-ui/issues/1729)) ([9c6bae2](https://github.com/scaleway/scaleway-ui/commit/9c6bae22012af332f50eb01b7542854a36437425))

### :bug: Bug Fixes

- **deps:** update dependency @types/intl-tel-input to v17.0.5 ([#1726](https://github.com/scaleway/scaleway-ui/issues/1726)) ([0fda303](https://github.com/scaleway/scaleway-ui/commit/0fda3038f31d290ba2c781956c39c671916afe22))

## [0.173.2](https://github.com/scaleway/scaleway-ui/compare/v0.173.1...v0.173.2) (2022-08-04)

### :package: Chore

- **devdeps:** update babel monorepo to v7.18.10 ([#1724](https://github.com/scaleway/scaleway-ui/issues/1724)) ([5cd463f](https://github.com/scaleway/scaleway-ui/commit/5cd463fcf4b8fd713790f18351a2f7078a8ae3e8))
- **devdeps:** update dependency @emotion/cache to v11.10.1 ([#1725](https://github.com/scaleway/scaleway-ui/issues/1725)) ([e14f5b0](https://github.com/scaleway/scaleway-ui/commit/e14f5b07a30cd5afdcd74f4edf49d360d451f6dc))

### :bug: Bug Fixes

- **colors:** remove colors deprecated ([#1706](https://github.com/scaleway/scaleway-ui/issues/1706)) ([5c97839](https://github.com/scaleway/scaleway-ui/commit/5c97839d0e239d0981b7574b40c57c0d5314b817))

## [0.173.1](https://github.com/scaleway/scaleway-ui/compare/v0.173.0...v0.173.1) (2022-08-03)

### :bug: Bug Fixes

- **link:** correct wrong behavior ([#1723](https://github.com/scaleway/scaleway-ui/issues/1723)) ([31b6b47](https://github.com/scaleway/scaleway-ui/commit/31b6b47a67c2ad17e70ee6fa41548965e5893185))

## [0.173.0](https://github.com/scaleway/scaleway-ui/compare/v0.172.1...v0.173.0) (2022-08-02)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.48 ([#1722](https://github.com/scaleway/scaleway-ui/issues/1722)) ([31f4439](https://github.com/scaleway/scaleway-ui/commit/31f4439588b5997ef1d0a394dd76ea6114a264f3))

### :gear: Features

- drop node 16 support ([#1718](https://github.com/scaleway/scaleway-ui/issues/1718)) ([d6e3419](https://github.com/scaleway/scaleway-ui/commit/d6e341962f408b98b1e3ed9905aa534fdf635f4f))

## [0.172.1](https://github.com/scaleway/scaleway-ui/compare/v0.172.0...v0.172.1) (2022-08-02)

### :memo: Documentation

- fixed description to bodyStrong migration ([#1721](https://github.com/scaleway/scaleway-ui/issues/1721)) ([b21d9a9](https://github.com/scaleway/scaleway-ui/commit/b21d9a9512a87bdc4fb0955d7c947a930e106ef8))

### :bug: Bug Fixes

- **icons:** removed product icons ([#1704](https://github.com/scaleway/scaleway-ui/issues/1704)) ([63bdcd1](https://github.com/scaleway/scaleway-ui/commit/63bdcd1bb467be74f68e276ce283605dc58ba77b))

## [0.172.0](https://github.com/scaleway/scaleway-ui/compare/v0.171.2...v0.172.0) (2022-08-02)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.3.16 ([#1720](https://github.com/scaleway/scaleway-ui/issues/1720)) ([1dfe198](https://github.com/scaleway/scaleway-ui/commit/1dfe198e62e19ac387a07c068f1dbf460e95885e))

### :gear: Features

- remove Box export ([#1705](https://github.com/scaleway/scaleway-ui/issues/1705)) ([5c12636](https://github.com/scaleway/scaleway-ui/commit/5c126362c62c9f234f0008fc1bc45c0de69331b4))

## [0.171.2](https://github.com/scaleway/scaleway-ui/compare/v0.171.1...v0.171.2) (2022-08-01)

### :package: Chore

- **devdeps:** update dependency rollup to v2.77.2 ([#1703](https://github.com/scaleway/scaleway-ui/issues/1703)) ([184369c](https://github.com/scaleway/scaleway-ui/commit/184369c6bdd6b0437b0f64f4b0c0d3ce97d2b39d))
- **devdeps:** update dependency size-limit to v8 ([#1715](https://github.com/scaleway/scaleway-ui/issues/1715)) ([20b2d12](https://github.com/scaleway/scaleway-ui/commit/20b2d121486318e5dc8309ad7ee73a671ee2aed2))
- **devdeps:** update dependency webpack to v5.74.0 ([#1712](https://github.com/scaleway/scaleway-ui/issues/1712)) ([b98c4f4](https://github.com/scaleway/scaleway-ui/commit/b98c4f4b24f18fe717165c85b4ce259973a33d98))
- **devdeps:** update emotion monorepo ([#1716](https://github.com/scaleway/scaleway-ui/issues/1716)) ([5023141](https://github.com/scaleway/scaleway-ui/commit/50231416c19e906f162feed03567beca5987a0c8))

### :bug: Bug Fixes

- **link:** add on click for react router ([#1719](https://github.com/scaleway/scaleway-ui/issues/1719)) ([927331e](https://github.com/scaleway/scaleway-ui/commit/927331e2863db2da476e84d33f3501c270821245))

## [0.171.1](https://github.com/scaleway/scaleway-ui/compare/v0.171.0...v0.171.1) (2022-07-29)

### :bug: Bug Fixes

- weird gaps in link ([#1711](https://github.com/scaleway/scaleway-ui/issues/1711)) ([8653bb1](https://github.com/scaleway/scaleway-ui/commit/8653bb1b5933991725f75ba09322e8e7e9200914))

## [0.171.0](https://github.com/scaleway/scaleway-ui/compare/v0.170.3...v0.171.0) (2022-07-29)

### :package: Chore

- **devdeps:** update dependency @emotion/babel-plugin to v11.9.5 ([#1707](https://github.com/scaleway/scaleway-ui/issues/1707)) ([10c4f42](https://github.com/scaleway/scaleway-ui/commit/10c4f420ec765a009496424af8c322d9f4822c63))
- **devdeps:** update dependency @types/react to v17.0.48 ([#1710](https://github.com/scaleway/scaleway-ui/issues/1710)) ([0578147](https://github.com/scaleway/scaleway-ui/commit/0578147275fae3abb454f655284282e887a535b1))

### :gear: Features

- use text-decoration in link ([#1709](https://github.com/scaleway/scaleway-ui/issues/1709)) ([5cdc800](https://github.com/scaleway/scaleway-ui/commit/5cdc8009b875cee838582668c0ed6e05d42e45e0))

## [0.170.3](https://github.com/scaleway/scaleway-ui/compare/v0.170.2...v0.170.3) (2022-07-28)

### :bug: Bug Fixes

- button link alignement ([#1708](https://github.com/scaleway/scaleway-ui/issues/1708)) ([41cd4d2](https://github.com/scaleway/scaleway-ui/commit/41cd4d28a6e3041e6af6d3d6116eedd5d0e2ef35))

## [0.170.2](https://github.com/scaleway/scaleway-ui/compare/v0.170.1...v0.170.2) (2022-07-28)

### :bug: Bug Fixes

- remove all errors and enable typecheck ([#1697](https://github.com/scaleway/scaleway-ui/issues/1697)) ([325968a](https://github.com/scaleway/scaleway-ui/commit/325968a3ef7e029fc8f12af426c8baebc6bfc13f))

### :package: Chore

- **devdeps:** update dependency @svgr/rollup to v6.3.1 ([#1701](https://github.com/scaleway/scaleway-ui/issues/1701)) ([b557ab3](https://github.com/scaleway/scaleway-ui/commit/b557ab38821e6ac2ae00b888337e20bc7db1be0f))
- **devdeps:** update dependency date-fns to v2.29.1 ([#1699](https://github.com/scaleway/scaleway-ui/issues/1699)) ([4fb4042](https://github.com/scaleway/scaleway-ui/commit/4fb40420cb042d6874a745d489d46494a4316265))
- **devdeps:** update node.js to v18.7 ([#1702](https://github.com/scaleway/scaleway-ui/issues/1702)) ([58fe95a](https://github.com/scaleway/scaleway-ui/commit/58fe95a4da8bffbcd68a1aca8564d432b9ecbea4))
- **devdeps:** update pnpm to v7.6.0 ([#1696](https://github.com/scaleway/scaleway-ui/issues/1696)) ([e873d37](https://github.com/scaleway/scaleway-ui/commit/e873d3708f95686402a2085859edb28677c27cc4))

## [0.170.1](https://github.com/scaleway/scaleway-ui/compare/v0.170.0...v0.170.1) (2022-07-27)

### :bug: Bug Fixes

- display link with inline flex ([#1698](https://github.com/scaleway/scaleway-ui/issues/1698)) ([0aea0a0](https://github.com/scaleway/scaleway-ui/commit/0aea0a0cb9933e36c050667f9eb9f4b5177bdd86))

## [0.170.0](https://github.com/scaleway/scaleway-ui/compare/v0.169.3...v0.170.0) (2022-07-26)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.47 ([#1692](https://github.com/scaleway/scaleway-ui/issues/1692)) ([9dec465](https://github.com/scaleway/scaleway-ui/commit/9dec4653a692fd2d61d39d59b6eb0f42b9255d6f))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.15 ([#1693](https://github.com/scaleway/scaleway-ui/issues/1693)) ([f1abdf7](https://github.com/scaleway/scaleway-ui/commit/f1abdf76c07a899485d054269cbe91d45f67928c))

### :gear: Features

- remove StatusIndicator ([#1691](https://github.com/scaleway/scaleway-ui/issues/1691)) ([37ed351](https://github.com/scaleway/scaleway-ui/commit/37ed35116ab68a4e373b68fef6a62b42b8357eb3))

## [0.169.3](https://github.com/scaleway/scaleway-ui/compare/v0.169.2...v0.169.3) (2022-07-26)

### :bug: Bug Fixes

- errors and menu link not working ([#1694](https://github.com/scaleway/scaleway-ui/issues/1694)) ([6fb536e](https://github.com/scaleway/scaleway-ui/commit/6fb536ea83be300dd78682a667b83f8982fbeff5))

## [0.169.2](https://github.com/scaleway/scaleway-ui/compare/v0.169.1...v0.169.2) (2022-07-26)

### :bug: Bug Fixes

- force link styles on hover ([#1695](https://github.com/scaleway/scaleway-ui/issues/1695)) ([c36479c](https://github.com/scaleway/scaleway-ui/commit/c36479c962e79f9d85d88b5e2f040f1ed2d37e03))

## [0.169.1](https://github.com/scaleway/scaleway-ui/compare/v0.169.0...v0.169.1) (2022-07-26)

### :bug: Bug Fixes

- **text:** remove margin set by headers and paragraphs ([#1653](https://github.com/scaleway/scaleway-ui/issues/1653)) ([212aa62](https://github.com/scaleway/scaleway-ui/commit/212aa62624afebb43ab8d51153f8e32104bab047))

## [0.169.0](https://github.com/scaleway/scaleway-ui/compare/v0.168.0...v0.169.0) (2022-07-25)

### :bug: Bug Fixes

- **button:** progress with icon ([#1686](https://github.com/scaleway/scaleway-ui/issues/1686)) ([95aa851](https://github.com/scaleway/scaleway-ui/commit/95aa85138e1e0d41a9ee6b52ce0ea263f88b0fb5))

### :package: Chore

- **devdeps:** update philibea/scaleway-containers-deploy action to v1.0.8 ([#1657](https://github.com/scaleway/scaleway-ui/issues/1657)) ([910a898](https://github.com/scaleway/scaleway-ui/commit/910a898dca576eae8abdbc1adc07d43f8eb23b0d))

### :gear: Features

- drop to prop on link component ([#1690](https://github.com/scaleway/scaleway-ui/issues/1690)) ([a791a90](https://github.com/scaleway/scaleway-ui/commit/a791a90496067d53d3b9d581767b90726f979dbd))
- **Icon:** add prominence support ([#1687](https://github.com/scaleway/scaleway-ui/issues/1687)) ([7246844](https://github.com/scaleway/scaleway-ui/commit/72468445b48a2b174e29e692b5730381f0803531))

## [0.168.0](https://github.com/scaleway/scaleway-ui/compare/v0.167.5...v0.168.0) (2022-07-22)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.45 ([#1683](https://github.com/scaleway/scaleway-ui/issues/1683)) ([ee006e0](https://github.com/scaleway/scaleway-ui/commit/ee006e0e4081bf10c02092b7fe9068d2c6af8b77))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.46 ([#1689](https://github.com/scaleway/scaleway-ui/issues/1689)) ([30f15a6](https://github.com/scaleway/scaleway-ui/commit/30f15a6c7be4488792b268ca1e3d3843e30161fc))
- **devdeps:** update dependency eslint to v8.20.0 ([#1688](https://github.com/scaleway/scaleway-ui/issues/1688)) ([821e3bc](https://github.com/scaleway/scaleway-ui/commit/821e3bc5173f3131cf263f9428522a1f52a4af11))
- **devdeps:** update dependency rollup to v2.77.0 ([#1684](https://github.com/scaleway/scaleway-ui/issues/1684)) ([a962c22](https://github.com/scaleway/scaleway-ui/commit/a962c2295a9a21ba96b47e351467d4e8b89be59e))
- **devdeps:** update dependency rollup-plugin-visualizer to v5.7.1 ([#1685](https://github.com/scaleway/scaleway-ui/issues/1685)) ([3c92f5c](https://github.com/scaleway/scaleway-ui/commit/3c92f5c5e4e29047a61cfdaedfc293a4e3ea7e43))

### :gear: Features

- new link component ([#1622](https://github.com/scaleway/scaleway-ui/issues/1622)) ([ef1c51b](https://github.com/scaleway/scaleway-ui/commit/ef1c51ba4f48d74f4de24eae1e66c844d2a61412))

## [0.167.5](https://github.com/scaleway/scaleway-ui/compare/v0.167.4...v0.167.5) (2022-07-20)

### :package: Chore

- **devdeps:** update babel monorepo to v7.18.9 ([#1681](https://github.com/scaleway/scaleway-ui/issues/1681)) ([c91c862](https://github.com/scaleway/scaleway-ui/commit/c91c8626d86cda99313b26c79b6b94faaba7fff6))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.44 ([#1679](https://github.com/scaleway/scaleway-ui/issues/1679)) ([403e2cd](https://github.com/scaleway/scaleway-ui/commit/403e2cd6946ace5a94bd2a576f4d25a22ede4ff1))
- **devdeps:** update docker/build-push-action action to v3.1.0 ([#1682](https://github.com/scaleway/scaleway-ui/issues/1682)) ([cc71fd9](https://github.com/scaleway/scaleway-ui/commit/cc71fd9562a41b8db673a295f9cc17355af7398f))
- **devdeps:** update pnpm to v7.5.2 ([#1678](https://github.com/scaleway/scaleway-ui/issues/1678)) ([2615e65](https://github.com/scaleway/scaleway-ui/commit/2615e6582313154f396832661621eb052138bf31))

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.0.7 ([#1677](https://github.com/scaleway/scaleway-ui/issues/1677)) ([8e35a8e](https://github.com/scaleway/scaleway-ui/commit/8e35a8e7edafb6c32d4bca158d8cfadc7de300df))

## [0.167.4](https://github.com/scaleway/scaleway-ui/compare/v0.167.3...v0.167.4) (2022-07-18)

### :package: Chore

- **devdeps:** update actions/setup-node action to v3.4.1 ([#1672](https://github.com/scaleway/scaleway-ui/issues/1672)) ([3353b7c](https://github.com/scaleway/scaleway-ui/commit/3353b7cc169c5b149f1614d02b7d4fda8322ae1e))
- **devdeps:** update dependency @emotion/jest to v11.9.4 ([#1674](https://github.com/scaleway/scaleway-ui/issues/1674)) ([be32a86](https://github.com/scaleway/scaleway-ui/commit/be32a86bad43f49062c1107f58793fcf72819d4d))
- **devdeps:** update dependency @testing-library/dom to v8.16.0 ([#1676](https://github.com/scaleway/scaleway-ui/issues/1676)) ([1916993](https://github.com/scaleway/scaleway-ui/commit/1916993e356d4f796bb33aa70d97669c058d398f))
- **devdeps:** update node.js to v18.6 ([#1673](https://github.com/scaleway/scaleway-ui/issues/1673)) ([4f9edb7](https://github.com/scaleway/scaleway-ui/commit/4f9edb7971e9fb03e5f027e2030ae1b8117d6e0e))

### :bug: Bug Fixes

- **deps:** update dependency intl-tel-input to v17.0.18 ([#1675](https://github.com/scaleway/scaleway-ui/issues/1675)) ([a24b9ba](https://github.com/scaleway/scaleway-ui/commit/a24b9ba271e43f182bf2769116c4871a3782e9b9))
- **deps:** update dependency react-select to v5.4.0 ([#1663](https://github.com/scaleway/scaleway-ui/issues/1663)) ([6bc5e77](https://github.com/scaleway/scaleway-ui/commit/6bc5e775ac545c7ea00d4ac3c9e821e63af78dd0))

## [0.167.3](https://github.com/scaleway/scaleway-ui/compare/v0.167.2...v0.167.3) (2022-07-14)

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.5 ([#1669](https://github.com/scaleway/scaleway-ui/issues/1669)) ([ea35a7e](https://github.com/scaleway/scaleway-ui/commit/ea35a7e1c45cc8f0aa9087d7032ea4e3d2c77548))
- **devdeps:** update actions/setup-node action to v3.4.0 ([#1666](https://github.com/scaleway/scaleway-ui/issues/1666)) ([d73ab90](https://github.com/scaleway/scaleway-ui/commit/d73ab9099c3aa99d00d18e8f1e4961bbf0392914))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.42 ([#1664](https://github.com/scaleway/scaleway-ui/issues/1664)) ([f214cb9](https://github.com/scaleway/scaleway-ui/commit/f214cb9961589018be3338cdb25e8808d6fff77a))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.43 ([#1667](https://github.com/scaleway/scaleway-ui/issues/1667)) ([f56ee50](https://github.com/scaleway/scaleway-ui/commit/f56ee50573635145ba8013a2a873bbf86068b929))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.14 ([#1665](https://github.com/scaleway/scaleway-ui/issues/1665)) ([8d51bd2](https://github.com/scaleway/scaleway-ui/commit/8d51bd228f07e2d250e278989ef51cfc5a43f980))
- **devdeps:** update dependency rollup to v2.76.0 ([#1670](https://github.com/scaleway/scaleway-ui/issues/1670)) ([6a5b806](https://github.com/scaleway/scaleway-ui/commit/6a5b806091b788e168fd903e5e4ba6821b23ccc2))
- **devdeps:** update pnpm to v7.5.1 ([#1668](https://github.com/scaleway/scaleway-ui/issues/1668)) ([4e39524](https://github.com/scaleway/scaleway-ui/commit/4e39524aa318d3db4144cd4d6cc1387fa44e89d0))

### :bug: Bug Fixes

- **deps:** update jest monorepo to v28.1.3 ([#1671](https://github.com/scaleway/scaleway-ui/issues/1671)) ([0b13a1f](https://github.com/scaleway/scaleway-ui/commit/0b13a1fd6ce3f366f7293574f9f9b6b97cd2e284))

## [0.167.2](https://github.com/scaleway/scaleway-ui/compare/v0.167.1...v0.167.2) (2022-07-11)

### :package: Chore

- **devdeps:** update dependency eslint to v8.19.0 ([#1661](https://github.com/scaleway/scaleway-ui/issues/1661)) ([a5ff858](https://github.com/scaleway/scaleway-ui/commit/a5ff858ec30569cf2603bf76c76a6c29d8c330a0))
- **devdeps:** update jest monorepo to v28.1.2 ([#1660](https://github.com/scaleway/scaleway-ui/issues/1660)) ([fd6452c](https://github.com/scaleway/scaleway-ui/commit/fd6452c3487675801c2f83d29ac8434a2fb4eeb0))
- **devdeps:** update node.js to v18.5 ([#1662](https://github.com/scaleway/scaleway-ui/issues/1662)) ([312591d](https://github.com/scaleway/scaleway-ui/commit/312591dc165cd11bca218f1a9d2957f25434a6ec))
- **devdeps:** update pnpm to v7.5.0 ([#1658](https://github.com/scaleway/scaleway-ui/issues/1658)) ([8c4e304](https://github.com/scaleway/scaleway-ui/commit/8c4e304e6392d12f1eee142b9170f66238e64e02))

### :bug: Bug Fixes

- remove gray usage ([#1654](https://github.com/scaleway/scaleway-ui/issues/1654)) ([eafee08](https://github.com/scaleway/scaleway-ui/commit/eafee0896517d8bb4aa2708ba5a2acdedeafe34f))

## [0.167.1](https://github.com/scaleway/scaleway-ui/compare/v0.167.0...v0.167.1) (2022-07-11)

### :package: Chore

- **deps:** pin dependency @types/react-datepicker to 4.4.2 ([#1655](https://github.com/scaleway/scaleway-ui/issues/1655)) ([0be279f](https://github.com/scaleway/scaleway-ui/commit/0be279f236e2b59d69e762762209a30aa0ff9fc1))
- **devdeps:** update babel monorepo to v7.18.6 ([#1656](https://github.com/scaleway/scaleway-ui/issues/1656)) ([7ca8327](https://github.com/scaleway/scaleway-ui/commit/7ca832757abf17dca68fcf6b8f8bcdc81c47f57c))
- **devdeps:** update dependency @semantic-release/github to v8.0.5 ([#1659](https://github.com/scaleway/scaleway-ui/issues/1659)) ([002703b](https://github.com/scaleway/scaleway-ui/commit/002703bd7e40666bcb4ad75c7fd643333194402d))

## [0.167.0](https://github.com/scaleway/scaleway-ui/compare/v0.166.0...v0.167.0) (2022-07-08)

### :gear: Features

- remove Box on Progress/StateBar + correct dark mode ([#1652](https://github.com/scaleway/scaleway-ui/issues/1652)) ([35aba5c](https://github.com/scaleway/scaleway-ui/commit/35aba5ced29481c956d9597fc8152b23ec7ceb44))

## [0.166.0](https://github.com/scaleway/scaleway-ui/compare/v0.165.2...v0.166.0) (2022-07-08)

### :gear: Features

- radioborderedbox complementary text and disabled ([#1647](https://github.com/scaleway/scaleway-ui/issues/1647)) ([2a929fc](https://github.com/scaleway/scaleway-ui/commit/2a929fce0387ea74aa7a5bf55a49e20658c3dcc3))

## [0.165.2](https://github.com/scaleway/scaleway-ui/compare/v0.165.1...v0.165.2) (2022-07-07)

### :bug: Bug Fixes

- make row and col deprecated ([#1650](https://github.com/scaleway/scaleway-ui/issues/1650)) ([6317cfc](https://github.com/scaleway/scaleway-ui/commit/6317cfcb9efc58f943b862126602516a47cae6f0))

## [0.165.1](https://github.com/scaleway/scaleway-ui/compare/v0.165.0...v0.165.1) (2022-07-07)

### :memo: Documentation

- **migration:** documentation for component migration ([#1643](https://github.com/scaleway/scaleway-ui/issues/1643)) ([3bcd539](https://github.com/scaleway/scaleway-ui/commit/3bcd5399f047191335b2250b959de13be2b5c4b7))

### :package: Chore

- **TabGroup:** remove now useless prop ([#1648](https://github.com/scaleway/scaleway-ui/issues/1648)) ([0b16dfb](https://github.com/scaleway/scaleway-ui/commit/0b16dfb454c5fb6f2e2e1025876eacf1343edfc1))

### :bug: Bug Fixes

- remove dep colors separator ([#1649](https://github.com/scaleway/scaleway-ui/issues/1649)) ([f5457cb](https://github.com/scaleway/scaleway-ui/commit/f5457cb86be8e25cb20b282bc845066344576577))

## [0.165.0](https://github.com/scaleway/scaleway-ui/compare/v0.164.3...v0.165.0) (2022-07-01)

### :gear: Features

- remove Counter component ([#1646](https://github.com/scaleway/scaleway-ui/issues/1646)) ([198d201](https://github.com/scaleway/scaleway-ui/commit/198d201377077de93dd6c34724e411ae4942560d))

## [0.164.3](https://github.com/scaleway/scaleway-ui/compare/v0.164.2...v0.164.3) (2022-07-01)

### :bug: Bug Fixes

- **Charts:** correct color generation ([#1644](https://github.com/scaleway/scaleway-ui/issues/1644)) ([3235712](https://github.com/scaleway/scaleway-ui/commit/3235712ad9765bcaf85d40777d56498c6675814f))

## [0.164.2](https://github.com/scaleway/scaleway-ui/compare/v0.164.1...v0.164.2) (2022-06-30)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.40 ([#1638](https://github.com/scaleway/scaleway-ui/issues/1638)) ([677fba2](https://github.com/scaleway/scaleway-ui/commit/677fba24a4e765661296cc7ff21ec6413ce769ec))
- revert @types/react to 17 ([4ee1698](https://github.com/scaleway/scaleway-ui/commit/4ee1698b6a339caf8e34f2d888fb9ec3319869fc))

## [0.164.1](https://github.com/scaleway/scaleway-ui/compare/v0.164.0...v0.164.1) (2022-06-28)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.3.13 ([#1639](https://github.com/scaleway/scaleway-ui/issues/1639)) ([9497fb6](https://github.com/scaleway/scaleway-ui/commit/9497fb69d19dfaef689cd1987a2cd282596c2827))

### :bug: Bug Fixes

- **modal:** type of onBeforeClose ([#1636](https://github.com/scaleway/scaleway-ui/issues/1636)) ([0dfb8bb](https://github.com/scaleway/scaleway-ui/commit/0dfb8bbff34a9d98ac90b49c1c0aa5c8c7c65081))

## [0.164.0](https://github.com/scaleway/scaleway-ui/compare/v0.163.6...v0.164.0) (2022-06-28)

### :gear: Features

- **deps:** update react monorepo to v18 (major) ([#1642](https://github.com/scaleway/scaleway-ui/issues/1642)) ([c4527c2](https://github.com/scaleway/scaleway-ui/commit/c4527c2e47188f467bdc5c4c7dac8e20954662f9))

## [0.163.6](https://github.com/scaleway/scaleway-ui/compare/v0.163.5...v0.163.6) (2022-06-28)

### :bug: Bug Fixes

- **tooltip:** pointer event on tooltip arrow ([#1641](https://github.com/scaleway/scaleway-ui/issues/1641)) ([1c4a8da](https://github.com/scaleway/scaleway-ui/commit/1c4a8da50514fdd008f1fa6206e73190c4441e2a))

## [0.163.5](https://github.com/scaleway/scaleway-ui/compare/v0.163.4...v0.163.5) (2022-06-28)

## [0.163.4](https://github.com/scaleway/scaleway-ui/compare/v0.163.3...v0.163.4) (2022-06-28)

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#1637](https://github.com/scaleway/scaleway-ui/issues/1637)) ([9aa5b7b](https://github.com/scaleway/scaleway-ui/commit/9aa5b7bc643f2e9a8f3981051f01322031d9e25a))

## [0.163.3](https://github.com/scaleway/scaleway-ui/compare/v0.163.2...v0.163.3) (2022-06-27)

### :bug: Bug Fixes

- status indicator deprecated ([#1635](https://github.com/scaleway/scaleway-ui/issues/1635)) ([05b8b48](https://github.com/scaleway/scaleway-ui/commit/05b8b48b2e127bc8beb1e3e3e63ba5ba58af2ea5))

### :package: Chore

- **deps:** update react monorepo to v18 (major) ([#1314](https://github.com/scaleway/scaleway-ui/issues/1314)) ([0baca9c](https://github.com/scaleway/scaleway-ui/commit/0baca9c37729a7274fc2b3eb104c42a239c947cb))

## [0.163.2](https://github.com/scaleway/scaleway-ui/compare/v0.163.1...v0.163.2) (2022-06-27)

### :bug: Bug Fixes

- fixed tooltip and button ([#1623](https://github.com/scaleway/scaleway-ui/issues/1623)) ([4f36df7](https://github.com/scaleway/scaleway-ui/commit/4f36df714c9362baf3ec059a0767cc8f1e29010d))

## [0.163.1](https://github.com/scaleway/scaleway-ui/compare/v0.163.0...v0.163.1) (2022-06-27)

### :package: Chore

- **devdeps:** update commitlint monorepo to v17.0.3 ([#1630](https://github.com/scaleway/scaleway-ui/issues/1630)) ([4729a06](https://github.com/scaleway/scaleway-ui/commit/4729a066b974e00e0047d920055f6e46f203933f))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.38 ([#1624](https://github.com/scaleway/scaleway-ui/issues/1624)) ([8707b77](https://github.com/scaleway/scaleway-ui/commit/8707b778eb3ee7edad34729ba4825670b81c1e7b))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.39 ([#1628](https://github.com/scaleway/scaleway-ui/issues/1628)) ([2cd05fa](https://github.com/scaleway/scaleway-ui/commit/2cd05fa5d7ef0c2b2df294ee78718cfe48a8d5db))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.12 ([#1625](https://github.com/scaleway/scaleway-ui/issues/1625)) ([87c08be](https://github.com/scaleway/scaleway-ui/commit/87c08bea1b5558668f7ea67149f59323e46d82dd))
- **devdeps:** update dependency @testing-library/dom to v8.14.0 ([#1627](https://github.com/scaleway/scaleway-ui/issues/1627)) ([04a7969](https://github.com/scaleway/scaleway-ui/commit/04a7969cb14375ce3032f976002b6cc4a9be6e5a))
- **devdeps:** update dependency jest-junit to v14 ([#1626](https://github.com/scaleway/scaleway-ui/issues/1626)) ([e9b6c29](https://github.com/scaleway/scaleway-ui/commit/e9b6c2957ed079064615402eb2aea1e2dd7b287b))
- **devdeps:** update dependency lint-staged to v13.0.3 ([#1629](https://github.com/scaleway/scaleway-ui/issues/1629)) ([d9fcf56](https://github.com/scaleway/scaleway-ui/commit/d9fcf56ed41b445527835bea6c48ed7120e856bc))

### :zap: Refactor

- remove some colorsDeprecated ([#1618](https://github.com/scaleway/scaleway-ui/issues/1618)) ([e4a6120](https://github.com/scaleway/scaleway-ui/commit/e4a6120060dc49e50cab44b46b5f02fd5bd67d4e))

### :bug: Bug Fixes

- **deps:** update dependency react-countup to v6.3.0 ([#1610](https://github.com/scaleway/scaleway-ui/issues/1610)) ([d312c44](https://github.com/scaleway/scaleway-ui/commit/d312c44ef8a6d69a2d3e4a3da8d32fefed4254cc))
- **theme:** synchronise design tokens ([#1619](https://github.com/scaleway/scaleway-ui/issues/1619)) ([f24885a](https://github.com/scaleway/scaleway-ui/commit/f24885a5d1d25860a7863851a32222d017dc83da))

## [0.163.0](https://github.com/scaleway/scaleway-ui/compare/v0.162.0...v0.163.0) (2022-06-24)

### :package: Chore

- **devdeps:** update pnpm to v7.3.0 ([#1621](https://github.com/scaleway/scaleway-ui/issues/1621)) ([6bd1db1](https://github.com/scaleway/scaleway-ui/commit/6bd1db11e750f6eb37f879735b9e6226e1eb57bd))

### :gear: Features

- remove unused Box on Slider ([#1620](https://github.com/scaleway/scaleway-ui/issues/1620)) ([07b40da](https://github.com/scaleway/scaleway-ui/commit/07b40daae19dc65302e850b3db4c61233d054f3a))

## [0.162.0](https://github.com/scaleway/scaleway-ui/compare/v0.161.5...v0.162.0) (2022-06-23)

### :gear: Features

- remove Reminder and ExtendedReminder ([#1609](https://github.com/scaleway/scaleway-ui/issues/1609)) ([e46e8df](https://github.com/scaleway/scaleway-ui/commit/e46e8dffa92a41118a19d53d0b16c11ef9d170c0))

## [0.161.5](https://github.com/scaleway/scaleway-ui/compare/v0.161.4...v0.161.5) (2022-06-23)

### :package: Chore

- **devdeps:** update dependency @types/testing-library\_\_jest-dom to v5.14.5 ([#1616](https://github.com/scaleway/scaleway-ui/issues/1616)) ([5e99a95](https://github.com/scaleway/scaleway-ui/commit/5e99a95e18e9406af88548b1408a38af0ee06683))
- **devdeps:** update dependency eslint to v8.18.0 ([#1617](https://github.com/scaleway/scaleway-ui/issues/1617)) ([03257d8](https://github.com/scaleway/scaleway-ui/commit/03257d837ee0c72738845553d16d75ef5a5292ab))

### :bug: Bug Fixes

- **component:** add Text export and sort export name ([#1579](https://github.com/scaleway/scaleway-ui/issues/1579)) ([9ef238a](https://github.com/scaleway/scaleway-ui/commit/9ef238a494140d316877d40929f239f0d97d3172))

## [0.161.4](https://github.com/scaleway/scaleway-ui/compare/v0.161.3...v0.161.4) (2022-06-22)

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#1599](https://github.com/scaleway/scaleway-ui/issues/1599)) ([d1868dc](https://github.com/scaleway/scaleway-ui/commit/d1868dca578bd5b5c522ad386d57c543de34db1b))

## [0.161.3](https://github.com/scaleway/scaleway-ui/compare/v0.161.2...v0.161.3) (2022-06-22)

### :package: Chore

- **devdeps:** update bobheadxi/deployments action to v1.3.0 ([#1615](https://github.com/scaleway/scaleway-ui/issues/1615)) ([5516926](https://github.com/scaleway/scaleway-ui/commit/55169264170a2a7129ffd779dd24fc6f8c6bf84a))

### :rocket: Performance

- avoid useless string conversion on shouldForwardProp ([#1597](https://github.com/scaleway/scaleway-ui/issues/1597)) ([72857fd](https://github.com/scaleway/scaleway-ui/commit/72857fd153bccc99ead9e3beb5dd9c55c325e82f))

## [0.161.2](https://github.com/scaleway/scaleway-ui/compare/v0.161.1...v0.161.2) (2022-06-22)

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.0.5 ([#1608](https://github.com/scaleway/scaleway-ui/issues/1608)) ([75a94e6](https://github.com/scaleway/scaleway-ui/commit/75a94e62db1cd65d90e3a6cfa5d8d8bce7ad80c2))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.37 ([#1613](https://github.com/scaleway/scaleway-ui/issues/1613)) ([5a324bf](https://github.com/scaleway/scaleway-ui/commit/5a324bf2e1b18c3a547e7ce200e6d0e7960abbe2))

## [0.161.1](https://github.com/scaleway/scaleway-ui/compare/v0.161.0...v0.161.1) (2022-06-22)

### :bug: Bug Fixes

- **tokens:** use hover and disabled from figma ([#1587](https://github.com/scaleway/scaleway-ui/issues/1587)) ([b425abb](https://github.com/scaleway/scaleway-ui/commit/b425abbf77ea70c9a5d1f9317a60a62f21d0e9b9))

## [0.161.0](https://github.com/scaleway/scaleway-ui/compare/v0.160.1...v0.161.0) (2022-06-22)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.36 ([#1607](https://github.com/scaleway/scaleway-ui/issues/1607)) ([19cebe9](https://github.com/scaleway/scaleway-ui/commit/19cebe9bfc1d3dfb125b693476022f054b911e70))
- **devdeps:** update dependency lint-staged to v13.0.2 ([#1601](https://github.com/scaleway/scaleway-ui/issues/1601)) ([423a294](https://github.com/scaleway/scaleway-ui/commit/423a294fe793d2e0d8f06a09e121ee64f43ee070))
- **devdeps:** update dependency prettier to v2.7.1 ([#1612](https://github.com/scaleway/scaleway-ui/issues/1612)) ([a174a06](https://github.com/scaleway/scaleway-ui/commit/a174a0670784fb102aba743e854aaf981a2a4933))
- **devdeps:** update dependency rollup to v2.75.7 ([#1611](https://github.com/scaleway/scaleway-ui/issues/1611)) ([978c520](https://github.com/scaleway/scaleway-ui/commit/978c520d0fc053e00e55f254af92545bd84900eb))
- **devdeps:** update dependency typescript to v4.7.4 ([#1605](https://github.com/scaleway/scaleway-ui/issues/1605)) ([c686f86](https://github.com/scaleway/scaleway-ui/commit/c686f8622b5e3a0ad32a224637ccabd38fec1de3))

### :gear: Features

- new db icon ([#1614](https://github.com/scaleway/scaleway-ui/issues/1614)) ([45fc0b8](https://github.com/scaleway/scaleway-ui/commit/45fc0b8b3b1ffee11f33059f73bb964f1c44cec4))

## [0.160.1](https://github.com/scaleway/scaleway-ui/compare/v0.160.0...v0.160.1) (2022-06-20)

### :repeat: CI

- update menu visual testing ([#1606](https://github.com/scaleway/scaleway-ui/issues/1606)) ([e77fe9d](https://github.com/scaleway/scaleway-ui/commit/e77fe9d81ced4c6f89ccb92b9e3b15c2f5ff1f3c))

### :package: Chore

- **devdeps:** update dependency @types/jest-axe to v3.5.4 ([#1603](https://github.com/scaleway/scaleway-ui/issues/1603)) ([4eeee1a](https://github.com/scaleway/scaleway-ui/commit/4eeee1a76eb2e246e54472cf01a9f5b94eb6efce))
- **devdeps:** update dependency @types/react to v17.0.47 ([#1602](https://github.com/scaleway/scaleway-ui/issues/1602)) ([881d2d5](https://github.com/scaleway/scaleway-ui/commit/881d2d5debdf076e3c7aea38ed6bd2ee8258e1a0))
- **devdeps:** update dependency @types/testing-library\_\_jest-dom to v5.14.4 ([#1604](https://github.com/scaleway/scaleway-ui/issues/1604)) ([9763967](https://github.com/scaleway/scaleway-ui/commit/97639675edd4b603f91ecd2b8f2e70f85fe979df))

### :bug: Bug Fixes

- **tooltip:** generatedId into aria-describedby ([#1600](https://github.com/scaleway/scaleway-ui/issues/1600)) ([4ff7a82](https://github.com/scaleway/scaleway-ui/commit/4ff7a8230b1e4c2b5fbeecc0bf2aa1932502d92d))

## [0.160.0](https://github.com/scaleway/scaleway-ui/compare/v0.159.1...v0.160.0) (2022-06-17)

### :gear: Features

- **tooltip:** new tooltip homemade ([#1566](https://github.com/scaleway/scaleway-ui/issues/1566)) ([6c748a0](https://github.com/scaleway/scaleway-ui/commit/6c748a0cf211a0ad30f59ff4e830c12b8d30f44a))

## [0.159.1](https://github.com/scaleway/scaleway-ui/compare/v0.159.0...v0.159.1) (2022-06-17)

### :bug: Bug Fixes

- popper component working with a function disclosure ([#1596](https://github.com/scaleway/scaleway-ui/issues/1596)) ([bf2dbb3](https://github.com/scaleway/scaleway-ui/commit/bf2dbb36ba565184838c4f068cf477cffd31096c))

### :memo: Documentation

- **theme:** updated theme documentation ([#1586](https://github.com/scaleway/scaleway-ui/issues/1586)) ([d0623f7](https://github.com/scaleway/scaleway-ui/commit/d0623f77889e3d6f22d21864cfa16cb7c15032c3))

## [0.159.0](https://github.com/scaleway/scaleway-ui/compare/v0.158.2...v0.159.0) (2022-06-17)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.34 ([#1593](https://github.com/scaleway/scaleway-ui/issues/1593)) ([d60f780](https://github.com/scaleway/scaleway-ui/commit/d60f7808d0f75aaa3e0d12086d145d89464fd94a))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.11 ([#1594](https://github.com/scaleway/scaleway-ui/issues/1594)) ([9c70509](https://github.com/scaleway/scaleway-ui/commit/9c705093831a41a89435f228a1fa6d6fe148d643))
- **devdeps:** update node.js to v18.4 ([#1598](https://github.com/scaleway/scaleway-ui/issues/1598)) ([97e8be4](https://github.com/scaleway/scaleway-ui/commit/97e8be48bcb55e3d64ffe77a5d3d3d7375981731))

### :white_check_mark: Test

- radio and TextBox accessibility ([#1589](https://github.com/scaleway/scaleway-ui/issues/1589)) ([d471540](https://github.com/scaleway/scaleway-ui/commit/d4715405c66014856a40ad65f21be9440c78ee1f))

### :gear: Features

- add some icons ([#1595](https://github.com/scaleway/scaleway-ui/issues/1595)) ([720edcd](https://github.com/scaleway/scaleway-ui/commit/720edcdfb5dbe4141cb1b2bff2cb263465e964ad))

## [0.158.2](https://github.com/scaleway/scaleway-ui/compare/v0.158.1...v0.158.2) (2022-06-16)

### :bug: Bug Fixes

- **pagination:** real pagination index by page number ([#1590](https://github.com/scaleway/scaleway-ui/issues/1590)) ([75d6225](https://github.com/scaleway/scaleway-ui/commit/75d6225b4714e891fb25c4c63102d8593a47a293))

## [0.158.1](https://github.com/scaleway/scaleway-ui/compare/v0.158.0...v0.158.1) (2022-06-16)

### :package: Chore

- **devdeps:** update pnpm to v7.2.1 ([#1588](https://github.com/scaleway/scaleway-ui/issues/1588)) ([35bef91](https://github.com/scaleway/scaleway-ui/commit/35bef918e6236e270aa1aef800fcdd49601f8306))

### :bug: Bug Fixes

- **phone-input:** rollback on png ([#1592](https://github.com/scaleway/scaleway-ui/issues/1592)) ([4a0387c](https://github.com/scaleway/scaleway-ui/commit/4a0387cc6ac7f4362898bd7ee83b37bf99abea2d))

## [0.158.0](https://github.com/scaleway/scaleway-ui/compare/v0.157.0...v0.158.0) (2022-06-16)

### :gear: Features

- reduce bundle size ([#1570](https://github.com/scaleway/scaleway-ui/issues/1570)) ([cc18eea](https://github.com/scaleway/scaleway-ui/commit/cc18eeab4bbcca07090bdc1fc2e1ef78abbc410d))

## [0.157.0](https://github.com/scaleway/scaleway-ui/compare/v0.156.3...v0.157.0) (2022-06-16)

### :zap: Refactor

- popper component moved to Menu ([#1564](https://github.com/scaleway/scaleway-ui/issues/1564)) ([69ffcdc](https://github.com/scaleway/scaleway-ui/commit/69ffcdc05f9ea456fd04941dee7c230d00496dfb))

### :gear: Features

- **Switch, SwitchButton:** fix a11y issues ([#1580](https://github.com/scaleway/scaleway-ui/issues/1580)) ([6585086](https://github.com/scaleway/scaleway-ui/commit/6585086460180d31c3326559664501b942155af3))

## [0.156.3](https://github.com/scaleway/scaleway-ui/compare/v0.156.2...v0.156.3) (2022-06-15)

### :zap: Refactor

- drop dot component ([#1575](https://github.com/scaleway/scaleway-ui/issues/1575)) ([e967524](https://github.com/scaleway/scaleway-ui/commit/e9675244cdb87ea43a9d42bb3abff08846307c53))

### :package: Chore

- **devdeps:** update babel monorepo to v7.18.5 ([#1582](https://github.com/scaleway/scaleway-ui/issues/1582)) ([a378ad6](https://github.com/scaleway/scaleway-ui/commit/a378ad647882001ca3d366e290d5f4c034f1b4d0))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.10 ([#1581](https://github.com/scaleway/scaleway-ui/issues/1581)) ([4874857](https://github.com/scaleway/scaleway-ui/commit/4874857e495c863779b9ef9e37d5aa1208f34f9e))
- **devdeps:** update dependency @storybook/testing-library to v0.0.13 ([#1583](https://github.com/scaleway/scaleway-ui/issues/1583)) ([41963ac](https://github.com/scaleway/scaleway-ui/commit/41963ac58ae5d72870833bc97a344eeeb0953844))
- **devdeps:** update emotion monorepo ([#1578](https://github.com/scaleway/scaleway-ui/issues/1578)) ([3b63563](https://github.com/scaleway/scaleway-ui/commit/3b635634c996ebb452ae67999d5216e0e8a43e48))
- **devdeps:** update storybook monorepo to v6.5.9 ([#1585](https://github.com/scaleway/scaleway-ui/issues/1585)) ([e53b453](https://github.com/scaleway/scaleway-ui/commit/e53b453ced4c301f3b141b0fb358b329205d0dc7))

### :bug: Bug Fixes

- creationProgress and StepLine become Stepper ([#1569](https://github.com/scaleway/scaleway-ui/issues/1569)) ([f120299](https://github.com/scaleway/scaleway-ui/commit/f120299a5bdcf00bf42cc514f70d7a195bb0b17e))

## [0.156.2](https://github.com/scaleway/scaleway-ui/compare/v0.156.1...v0.156.2) (2022-06-13)

### :package: Chore

- **devdeps:** update dependency @storybook/testing-library to v0.0.12 ([#1577](https://github.com/scaleway/scaleway-ui/issues/1577)) ([3a3948f](https://github.com/scaleway/scaleway-ui/commit/3a3948f2d7fa6b9df873226cef3bac9d6fbf3be9))
- **devdeps:** update dependency lint-staged to v13.0.1 ([#1572](https://github.com/scaleway/scaleway-ui/issues/1572)) ([51e0e1d](https://github.com/scaleway/scaleway-ui/commit/51e0e1d27ac778105b6ba30345e772f796463348))
- **devdeps:** update dependency loki to v0.30.3 ([#1576](https://github.com/scaleway/scaleway-ui/issues/1576)) ([342206a](https://github.com/scaleway/scaleway-ui/commit/342206a4d8c85b7dac688b5a5de6f9866a8474c3))

### :bug: Bug Fixes

- move @nivo/tooltip to dependency ([#1561](https://github.com/scaleway/scaleway-ui/issues/1561)) ([1269fd5](https://github.com/scaleway/scaleway-ui/commit/1269fd5aac640347c799fb3c4a10f4ba46b36e71))

## [0.156.1](https://github.com/scaleway/scaleway-ui/compare/v0.156.0...v0.156.1) (2022-06-10)

### :zap: Refactor

- **Pagination:** new design ([#1500](https://github.com/scaleway/scaleway-ui/issues/1500)) ([598d2e9](https://github.com/scaleway/scaleway-ui/commit/598d2e9aa89eb140fadd6b9a0323bad490868040))

### :repeat: CI

- correct serve redirect ([42aed5f](https://github.com/scaleway/scaleway-ui/commit/42aed5f213e337c879ff10532bb0f8d9340299e5))
- use serve instead of http-server ([#1571](https://github.com/scaleway/scaleway-ui/issues/1571)) ([61ca025](https://github.com/scaleway/scaleway-ui/commit/61ca0251f8d02d06a16dee0fe53012ab75e2469e))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.33 ([#1565](https://github.com/scaleway/scaleway-ui/issues/1565)) ([f86bce9](https://github.com/scaleway/scaleway-ui/commit/f86bce96c6f05856839d4c682c43d15de8f29b3c))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.9 ([#1567](https://github.com/scaleway/scaleway-ui/issues/1567)) ([5614eb5](https://github.com/scaleway/scaleway-ui/commit/5614eb51d1bd57c47bed3734fe3b0ddd07a11543))
- **devdeps:** update dependency semantic-release to v19.0.3 [security] ([#1574](https://github.com/scaleway/scaleway-ui/issues/1574)) ([9066811](https://github.com/scaleway/scaleway-ui/commit/906681107c157bbcec6405255896b61650c5c0e7))
- **devdeps:** update storybook monorepo to v6.5.8 ([#1573](https://github.com/scaleway/scaleway-ui/issues/1573)) ([03f864f](https://github.com/scaleway/scaleway-ui/commit/03f864f25289b1d05b82857dcca66ebd4ca04258))

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/use-media to v1.1.1 ([#1568](https://github.com/scaleway/scaleway-ui/issues/1568)) ([8bae115](https://github.com/scaleway/scaleway-ui/commit/8bae115ffd213232d35fc208034b28074976a81d))

## [0.156.0](https://github.com/scaleway/scaleway-ui/compare/v0.155.1...v0.156.0) (2022-06-09)

### :gear: Features

- add SelectNumber component to replace Stepper ([#1511](https://github.com/scaleway/scaleway-ui/issues/1511)) ([a110ba4](https://github.com/scaleway/scaleway-ui/commit/a110ba42fb5527379968077b373795fce9c0a38c))

## [0.155.1](https://github.com/scaleway/scaleway-ui/compare/v0.155.0...v0.155.1) (2022-06-09)

### :package: Chore

- **devdeps:** update dependency eslint to v8.17.0 ([#1563](https://github.com/scaleway/scaleway-ui/issues/1563)) ([c4fdfba](https://github.com/scaleway/scaleway-ui/commit/c4fdfba3281aafb103ba53b0a2779f177d7e72fb))
- **devdeps:** update dependency rollup to v2.75.6 ([#1562](https://github.com/scaleway/scaleway-ui/issues/1562)) ([447222a](https://github.com/scaleway/scaleway-ui/commit/447222a0010d60962ae90ef4e17a71a31aa67eca))

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.0.4 ([#1560](https://github.com/scaleway/scaleway-ui/issues/1560)) ([671d8ca](https://github.com/scaleway/scaleway-ui/commit/671d8ca0aac8dfca57a8fb83fed85a98983e85d6))

## [0.155.0](https://github.com/scaleway/scaleway-ui/compare/v0.154.1...v0.155.0) (2022-06-08)

### :white_check_mark: Test

- accessibility compatibility button & checkbox ([#1550](https://github.com/scaleway/scaleway-ui/issues/1550)) ([da23a25](https://github.com/scaleway/scaleway-ui/commit/da23a25775df263b3acabc6a6af1c5c5a3da7b96))

### :gear: Features

- text component ([#1541](https://github.com/scaleway/scaleway-ui/issues/1541)) ([7a1b095](https://github.com/scaleway/scaleway-ui/commit/7a1b0955b159fb7540bb69b10561dd8a86ba6959))

## [0.154.1](https://github.com/scaleway/scaleway-ui/compare/v0.154.0...v0.154.1) (2022-06-07)

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#1531](https://github.com/scaleway/scaleway-ui/issues/1531)) ([87a5655](https://github.com/scaleway/scaleway-ui/commit/87a565541de4cf53a64a41656ccdd7114cfba389))

## [0.154.0](https://github.com/scaleway/scaleway-ui/compare/v0.153.10...v0.154.0) (2022-06-07)

### :package: Chore

- **devdeps:** update dependency webpack to v5.73.0 ([#1559](https://github.com/scaleway/scaleway-ui/issues/1559)) ([1d82ac9](https://github.com/scaleway/scaleway-ui/commit/1d82ac903391ba44a3695c673fa19bd06614d97c))
- **devdeps:** update node.js to v18.3 ([#1554](https://github.com/scaleway/scaleway-ui/issues/1554)) ([1a797e8](https://github.com/scaleway/scaleway-ui/commit/1a797e8c3e4581d5f0b396b7d6691a3e5f0075bb))

### :gear: Features

- **checkbox:** refactor checkbox and some animations ([#1544](https://github.com/scaleway/scaleway-ui/issues/1544)) ([1e3084f](https://github.com/scaleway/scaleway-ui/commit/1e3084f331166595a1bcfdcb904244e0df7ffd7d))

## [0.153.10](https://github.com/scaleway/scaleway-ui/compare/v0.153.9...v0.153.10) (2022-06-07)

### :package: Chore

- **deps:** replace use-media by @scaleway/use-media ([#1558](https://github.com/scaleway/scaleway-ui/issues/1558)) ([316617f](https://github.com/scaleway/scaleway-ui/commit/316617f87dd79cb60162063ca621a3b43dae68d1))

## [0.153.9](https://github.com/scaleway/scaleway-ui/compare/v0.153.8...v0.153.9) (2022-06-07)

### :bug: Bug Fixes

- **deps:** update jest monorepo to v28.1.1 ([#1557](https://github.com/scaleway/scaleway-ui/issues/1557)) ([3fd8460](https://github.com/scaleway/scaleway-ui/commit/3fd84601f73f5e11a0f39e8c62687e0246cc52e5))

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.4 ([#1556](https://github.com/scaleway/scaleway-ui/issues/1556)) ([10d10bd](https://github.com/scaleway/scaleway-ui/commit/10d10bdae4fea7abc82aebaf0532020fc02b7486))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.32 ([#1553](https://github.com/scaleway/scaleway-ui/issues/1553)) ([5955d5d](https://github.com/scaleway/scaleway-ui/commit/5955d5db1826a6dd356c22f678dad41960c7d706))

## [0.153.8](https://github.com/scaleway/scaleway-ui/compare/v0.153.7...v0.153.8) (2022-06-07)

### :package: Chore

- **devdeps:** update actions/setup-node action to v3.3.0 ([#1552](https://github.com/scaleway/scaleway-ui/issues/1552)) ([163d1fe](https://github.com/scaleway/scaleway-ui/commit/163d1fe06b0735ce960c087489842e1df1726d05))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.8 ([#1551](https://github.com/scaleway/scaleway-ui/issues/1551)) ([6b032fd](https://github.com/scaleway/scaleway-ui/commit/6b032fd343b79218a9093cb95d4aa81f71e1fee9))
- **devdeps:** update storybook monorepo to v6.5.7 ([#1555](https://github.com/scaleway/scaleway-ui/issues/1555)) ([cd0c8e8](https://github.com/scaleway/scaleway-ui/commit/cd0c8e8e504882e8226e110f28ba02144df2ae1c))

### :bug: Bug Fixes

- radioborderedbox spacing ([#1545](https://github.com/scaleway/scaleway-ui/issues/1545)) ([736f610](https://github.com/scaleway/scaleway-ui/commit/736f6102eb7744ace2ab4e8ae5eeaf6f2ca9d339))

## [0.153.7](https://github.com/scaleway/scaleway-ui/compare/v0.153.6...v0.153.7) (2022-06-06)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.31 ([#1549](https://github.com/scaleway/scaleway-ui/issues/1549)) ([94526a6](https://github.com/scaleway/scaleway-ui/commit/94526a61c0bb39986f57e43457c4d466e13b7ee6))
- **devdeps:** update dependency typescript to v4.7.3 ([#1547](https://github.com/scaleway/scaleway-ui/issues/1547)) ([614d871](https://github.com/scaleway/scaleway-ui/commit/614d871cc808d09341d3a9416debc3b7a2916a50))
- **devdeps:** update pnpm to v7.1.9 ([#1548](https://github.com/scaleway/scaleway-ui/issues/1548)) ([385b0ac](https://github.com/scaleway/scaleway-ui/commit/385b0acb1f9ee73faec3f053b55a6e11c0331f4f))

### :bug: Bug Fixes

- **deps:** update dependency @types/react-datepicker to v4.4.2 ([#1546](https://github.com/scaleway/scaleway-ui/issues/1546)) ([8946cea](https://github.com/scaleway/scaleway-ui/commit/8946cea5978391fb50671a9e8aa49c4f6a86bf3b))

## [0.153.6](https://github.com/scaleway/scaleway-ui/compare/v0.153.5...v0.153.6) (2022-06-04)

### :bug: Bug Fixes

- svg size bug on radio ([#1543](https://github.com/scaleway/scaleway-ui/issues/1543)) ([922a427](https://github.com/scaleway/scaleway-ui/commit/922a42747e98e41da7efb884715c8a3b4dedd207))

## [0.153.5](https://github.com/scaleway/scaleway-ui/compare/v0.153.4...v0.153.5) (2022-06-03)

### :bug: Bug Fixes

- update Tag component ([#1504](https://github.com/scaleway/scaleway-ui/issues/1504)) ([5b89421](https://github.com/scaleway/scaleway-ui/commit/5b894219fcb473470195375b44f8be71b189a7b2))

## [0.153.4](https://github.com/scaleway/scaleway-ui/compare/v0.153.3...v0.153.4) (2022-06-02)

### :package: Chore

- **devdeps:** update commitlint monorepo to v17.0.2 ([#1535](https://github.com/scaleway/scaleway-ui/issues/1535)) ([b1a9ae0](https://github.com/scaleway/scaleway-ui/commit/b1a9ae0d4a0a58c00f3fc27fb87104bc0ae78c7b))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.7 ([#1540](https://github.com/scaleway/scaleway-ui/issues/1540)) ([104e4a6](https://github.com/scaleway/scaleway-ui/commit/104e4a67465e137fa8ae2afded7249b80d13c0ab))
- **devdeps:** update dependency @types/jest to v27.5.2 ([#1537](https://github.com/scaleway/scaleway-ui/issues/1537)) ([c77c02d](https://github.com/scaleway/scaleway-ui/commit/c77c02d9224dba55fe1ee9d5c3ead0685a64d894))
- **devdeps:** update dependency loki to v0.30.2 ([#1495](https://github.com/scaleway/scaleway-ui/issues/1495)) ([a5ba432](https://github.com/scaleway/scaleway-ui/commit/a5ba4326f8bdae2809abd579949939d15d9a2e9d))
- **devdeps:** update dependency rollup to v2.75.5 ([#1536](https://github.com/scaleway/scaleway-ui/issues/1536)) ([f4246a6](https://github.com/scaleway/scaleway-ui/commit/f4246a678a4342871db8a7622eb2e2037abdbac0))
- fix renovate by upgrading @storybook/addon-docs ([#1539](https://github.com/scaleway/scaleway-ui/issues/1539)) ([16763f2](https://github.com/scaleway/scaleway-ui/commit/16763f29e8dee349c8fb721351c6cad6a77bfdbf))

### :zap: Refactor

- refactor Radio component ([#1493](https://github.com/scaleway/scaleway-ui/issues/1493)) ([166d811](https://github.com/scaleway/scaleway-ui/commit/166d811121e39e321c1c3f73991d58cff7ba1c85))

### :bug: Bug Fixes

- **deps:** pin dependencies ([#1542](https://github.com/scaleway/scaleway-ui/issues/1542)) ([aefae04](https://github.com/scaleway/scaleway-ui/commit/aefae04555fcfbd6c7dbeb76650d8a4d64886b91))

### [0.153.3](https://github.com/scaleway/scaleway-ui/compare/v0.153.2...v0.153.3) (2022-06-01)

### :memo: Documentation

- deprecated parameter and migration documentation ([#1482](https://github.com/scaleway/scaleway-ui/issues/1482)) ([ae76ddb](https://github.com/scaleway/scaleway-ui/commit/ae76ddb192ec89f672b6131c05324d85317bcc15))

### :bug: Bug Fixes

- **list:** controlled pagination will not changed internal pagination ([#1534](https://github.com/scaleway/scaleway-ui/issues/1534)) ([4fa73ce](https://github.com/scaleway/scaleway-ui/commit/4fa73ce2d4c9da31144c4f2e305a0861cbf128a8))

### [0.153.2](https://github.com/scaleway/scaleway-ui/compare/v0.153.1...v0.153.2) (2022-06-01)

### :package: Chore

- **devdeps:** update dependency lint-staged to v13 ([#1533](https://github.com/scaleway/scaleway-ui/issues/1533)) ([f828b7a](https://github.com/scaleway/scaleway-ui/commit/f828b7af788f005d7d98ff89fb73b61356995443))

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.0.3 ([#1530](https://github.com/scaleway/scaleway-ui/issues/1530)) ([88bef00](https://github.com/scaleway/scaleway-ui/commit/88bef005f18f06f98f9f2f492f739ae00a71e221))

### [0.153.1](https://github.com/scaleway/scaleway-ui/compare/v0.153.0...v0.153.1) (2022-06-01)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.30 ([#1529](https://github.com/scaleway/scaleway-ui/issues/1529)) ([c6ee39a](https://github.com/scaleway/scaleway-ui/commit/c6ee39a25e168be6dd05e0f718e062be7e187ce2))

### :bug: Bug Fixes

- **list:** checkbox appear only on hover ([#1532](https://github.com/scaleway/scaleway-ui/issues/1532)) ([23644d3](https://github.com/scaleway/scaleway-ui/commit/23644d3396adfbce395aae952cb4b2d6cb0b1761))

## [0.153.0](https://github.com/scaleway/scaleway-ui/compare/v0.152.3...v0.153.0) (2022-05-31)

### :package: Chore

- **devdeps:** update dependency lint-staged to v12.4.3 ([#1528](https://github.com/scaleway/scaleway-ui/issues/1528)) ([88e3885](https://github.com/scaleway/scaleway-ui/commit/88e388542a673c98ce5fd1325e1aba5c4ab162ee))

### :gear: Features

- explore loki interactions ([#1472](https://github.com/scaleway/scaleway-ui/issues/1472)) ([363ae52](https://github.com/scaleway/scaleway-ui/commit/363ae52a7263273730c1cd80a37cac66ac5d6c85))

### [0.152.3](https://github.com/scaleway/scaleway-ui/compare/v0.152.2...v0.152.3) (2022-05-31)

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.3 ([#1527](https://github.com/scaleway/scaleway-ui/issues/1527)) ([f2e8f7c](https://github.com/scaleway/scaleway-ui/commit/f2e8f7c762f7b13d441add0bf6956bf7dec66114))
- **devdeps:** update andresz1/size-limit-action action to v1.7.0 ([#1525](https://github.com/scaleway/scaleway-ui/issues/1525)) ([9448148](https://github.com/scaleway/scaleway-ui/commit/94481481e535c483d24ae9cabcb54312e35529ab))
- **devdeps:** update babel monorepo ([#1508](https://github.com/scaleway/scaleway-ui/issues/1508)) ([7048fd0](https://github.com/scaleway/scaleway-ui/commit/7048fd0561962c6dbf79eae34c50f0cc28671e4f))
- **devdeps:** update dependency @commitlint/cli to v17.0.1 ([#1515](https://github.com/scaleway/scaleway-ui/issues/1515)) ([4f15bcc](https://github.com/scaleway/scaleway-ui/commit/4f15bcc1f3db1f872f7293d4ae02f9b72b0453da))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.27 ([#1505](https://github.com/scaleway/scaleway-ui/issues/1505)) ([6e57827](https://github.com/scaleway/scaleway-ui/commit/6e578277987a1ba4dc5781bfff9c2f1eb73b89da))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.28 ([#1517](https://github.com/scaleway/scaleway-ui/issues/1517)) ([af141a7](https://github.com/scaleway/scaleway-ui/commit/af141a714d5e5a5379edea0c8e2d230b4fcb6ac7))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.29 ([#1518](https://github.com/scaleway/scaleway-ui/issues/1518)) ([917a805](https://github.com/scaleway/scaleway-ui/commit/917a80549ee84dbf661409d336f5204ef7816f00))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.4 ([#1506](https://github.com/scaleway/scaleway-ui/issues/1506)) ([09e0b24](https://github.com/scaleway/scaleway-ui/commit/09e0b24ddeebe6a7241162e5ec62f3d1eebfbf9a))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.5 ([#1519](https://github.com/scaleway/scaleway-ui/issues/1519)) ([937a37c](https://github.com/scaleway/scaleway-ui/commit/937a37c8736af4268d7d6e81236f8b377cf3f39b))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.6 ([#1520](https://github.com/scaleway/scaleway-ui/issues/1520)) ([f8ed7b4](https://github.com/scaleway/scaleway-ui/commit/f8ed7b49c520f6ff5350bb6c8383b45e6e5eaa22))
- **devdeps:** update dependency @storybook/testing-react to v1.3.0 ([#1499](https://github.com/scaleway/scaleway-ui/issues/1499)) ([71a3efd](https://github.com/scaleway/scaleway-ui/commit/71a3efd161346e56bba5c7d4bcdbf5e3d18cb4c2))
- **devdeps:** update dependency @types/jest to v27.5.1 ([#1476](https://github.com/scaleway/scaleway-ui/issues/1476)) ([acc89cb](https://github.com/scaleway/scaleway-ui/commit/acc89cbdb845f677f397f96d16a4eba3b0d5f208))
- **devdeps:** update dependency @types/react-dom to v18.0.5 ([#1507](https://github.com/scaleway/scaleway-ui/issues/1507)) ([5b9a146](https://github.com/scaleway/scaleway-ui/commit/5b9a146386ece5b33590ff710974f02ab05a8058))
- **devdeps:** update dependency eslint to v8.16.0 ([#1514](https://github.com/scaleway/scaleway-ui/issues/1514)) ([86d178e](https://github.com/scaleway/scaleway-ui/commit/86d178e5457360380f9a0f3b2e0e97ad711f747c))
- **devdeps:** update dependency lint-staged to v12.4.2 ([#1512](https://github.com/scaleway/scaleway-ui/issues/1512)) ([281150d](https://github.com/scaleway/scaleway-ui/commit/281150d4d30a8f4d9ee47403f2817a81c173fb79))
- **devdeps:** update dependency rollup to v2.74.1 ([#1509](https://github.com/scaleway/scaleway-ui/issues/1509)) ([0ec67e5](https://github.com/scaleway/scaleway-ui/commit/0ec67e56c3e8851b643575bad4172297a31c78ab))
- **devdeps:** update dependency rollup-plugin-dts to v4.2.2 ([#1516](https://github.com/scaleway/scaleway-ui/issues/1516)) ([654b2cd](https://github.com/scaleway/scaleway-ui/commit/654b2cdc16ff54da74a2e5568e20b77bdd61e9d5))
- **devdeps:** update dependency typescript to v4.7.2 ([#1524](https://github.com/scaleway/scaleway-ui/issues/1524)) ([8523d66](https://github.com/scaleway/scaleway-ui/commit/8523d664e7a5a2164089ef3e5ae6a1fc1f890d20))
- **devdeps:** update pnpm to v7.1.5 ([#1510](https://github.com/scaleway/scaleway-ui/issues/1510)) ([fe656d5](https://github.com/scaleway/scaleway-ui/commit/fe656d54fc8308ed94845dfc230b6ccb49645db2))
- **devdeps:** update pnpm to v7.1.7 ([#1521](https://github.com/scaleway/scaleway-ui/issues/1521)) ([346cd31](https://github.com/scaleway/scaleway-ui/commit/346cd31cb39fd7a55f668574d3a59ad9eb68fe0e))
- **devdeps:** update pnpm/action-setup action to v2.2.2 ([#1522](https://github.com/scaleway/scaleway-ui/issues/1522)) ([abcc24d](https://github.com/scaleway/scaleway-ui/commit/abcc24d45c6ff3e30f468886c260c01a3a851bcb))
- **devdeps:** update storybook monorepo to v6.5.5 ([#1513](https://github.com/scaleway/scaleway-ui/issues/1513)) ([c99d3c1](https://github.com/scaleway/scaleway-ui/commit/c99d3c17474aaf47245ad0a6bf7418ed7c44b9b6))
- **devdeps:** update storybook monorepo to v6.5.6 ([#1526](https://github.com/scaleway/scaleway-ui/issues/1526)) ([00bd88c](https://github.com/scaleway/scaleway-ui/commit/00bd88cae899b40cd339fc7a805c5c9f83ac094c))

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9.0.2 ([#1523](https://github.com/scaleway/scaleway-ui/issues/1523)) ([3fde124](https://github.com/scaleway/scaleway-ui/commit/3fde1248fb363ff7733fe60eca8ddf7312159aa9))

### [0.152.2](https://github.com/scaleway/scaleway-ui/compare/v0.152.1...v0.152.2) (2022-05-24)

### :bug: Bug Fixes

- checkbox div ([#1503](https://github.com/scaleway/scaleway-ui/issues/1503)) ([89be0a9](https://github.com/scaleway/scaleway-ui/commit/89be0a9fb4978053316e24d80dec9db43c74ffd2))

### [0.152.1](https://github.com/scaleway/scaleway-ui/compare/v0.152.0...v0.152.1) (2022-05-24)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.25 ([#1492](https://github.com/scaleway/scaleway-ui/issues/1492)) ([7489c7d](https://github.com/scaleway/scaleway-ui/commit/7489c7d6eb427ab7534fd8468d88eb66ddc34861))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.26 ([#1496](https://github.com/scaleway/scaleway-ui/issues/1496)) ([4b0dfa8](https://github.com/scaleway/scaleway-ui/commit/4b0dfa86df7085e8725e8dd36eeeab7ca92effe0))
- **devdeps:** update dependency postcss to v8.4.14 ([#1491](https://github.com/scaleway/scaleway-ui/issues/1491)) ([026f001](https://github.com/scaleway/scaleway-ui/commit/026f0014c163896448920fd7de3af68fbab77925))
- **devdeps:** update node.js to v18.2 ([#1489](https://github.com/scaleway/scaleway-ui/issues/1489)) ([c856cb3](https://github.com/scaleway/scaleway-ui/commit/c856cb32ea1c420e9604b05d76e090146a860224))
- **devdeps:** update pnpm to v7.1.2 ([#1486](https://github.com/scaleway/scaleway-ui/issues/1486)) ([9815d46](https://github.com/scaleway/scaleway-ui/commit/9815d464d814d8f1b38381ae2900b3d0c1e4ceb0))
- **devdeps:** update pnpm to v7.1.3 ([#1497](https://github.com/scaleway/scaleway-ui/issues/1497)) ([7f5238c](https://github.com/scaleway/scaleway-ui/commit/7f5238c57a9253f2f5d63d299e7b7f6af8589719))
- **devdeps:** update storybook monorepo to v6.5.3 ([#1494](https://github.com/scaleway/scaleway-ui/issues/1494)) ([82da21f](https://github.com/scaleway/scaleway-ui/commit/82da21fdc832d762a3257dd49b8e522d6657c73d))
- **devdeps:** update storybook monorepo to v6.5.4 ([#1498](https://github.com/scaleway/scaleway-ui/issues/1498)) ([50824c5](https://github.com/scaleway/scaleway-ui/commit/50824c5df3a7f9b99d75d4ad3aaa11ce7fdf70af))

### :bug: Bug Fixes

- **list:** bug with checkbox ([#1501](https://github.com/scaleway/scaleway-ui/issues/1501)) ([394a7cf](https://github.com/scaleway/scaleway-ui/commit/394a7cffe73c3c4dd59434da5a61578f4fe923c8))

## [0.152.0](https://github.com/scaleway/scaleway-ui/compare/v0.151.2...v0.152.0) (2022-05-19)

### :package: Chore

- **devdeps:** update dependency rollup to v2.73.0 ([#1487](https://github.com/scaleway/scaleway-ui/issues/1487)) ([06025d8](https://github.com/scaleway/scaleway-ui/commit/06025d8d5d0e6a363661d331aa933544d52c8392))
- **devdeps:** update storybook monorepo to v6.5.0 ([#1488](https://github.com/scaleway/scaleway-ui/issues/1488)) ([6469760](https://github.com/scaleway/scaleway-ui/commit/646976073961feba84063853437ad4ec7ad3ed12))

### :gear: Features

- **react:** new automatic runtime ([#1490](https://github.com/scaleway/scaleway-ui/issues/1490)) ([0aa0b73](https://github.com/scaleway/scaleway-ui/commit/0aa0b7335154918b002a76f24953b2266dadfa5c))

### [0.151.2](https://github.com/scaleway/scaleway-ui/compare/v0.151.1...v0.151.2) (2022-05-18)

### :bug: Bug Fixes

- **button:** link variant ([#1480](https://github.com/scaleway/scaleway-ui/issues/1480)) ([55951e0](https://github.com/scaleway/scaleway-ui/commit/55951e065e3f9e3139681ffc469fa21399f579de))

### [0.151.1](https://github.com/scaleway/scaleway-ui/compare/v0.151.0...v0.151.1) (2022-05-18)

### :bug: Bug Fixes

- **deps:** update dependency react-datepicker to v4.8.0 ([#1484](https://github.com/scaleway/scaleway-ui/issues/1484)) ([bcf6a50](https://github.com/scaleway/scaleway-ui/commit/bcf6a50faf65b22d7f2b7352dc42377a9ea1d127))

## [0.151.0](https://github.com/scaleway/scaleway-ui/compare/v0.150.3...v0.151.0) (2022-05-18)

### :package: Chore

- **devdeps:** update pnpm to v7.1.0 ([#1481](https://github.com/scaleway/scaleway-ui/issues/1481)) ([f530cb7](https://github.com/scaleway/scaleway-ui/commit/f530cb7e9ffdc20df17239820708cd4b8bf07d69))

### :gear: Features

- **checkbox:** refactoring ([#1446](https://github.com/scaleway/scaleway-ui/issues/1446)) ([ebfbbd8](https://github.com/scaleway/scaleway-ui/commit/ebfbbd814ad224486c2323d94755d3334f25de34))

### [0.150.3](https://github.com/scaleway/scaleway-ui/compare/v0.150.2...v0.150.3) (2022-05-17)

### :package: Chore

- **devdeps:** update commitlint monorepo to v17 ([#1479](https://github.com/scaleway/scaleway-ui/issues/1479)) ([356dbc1](https://github.com/scaleway/scaleway-ui/commit/356dbc1066d5db11beac6c136d6cd392380e990b))

### :bug: Bug Fixes

- allow classname on steplist ([#1483](https://github.com/scaleway/scaleway-ui/issues/1483)) ([5c9e644](https://github.com/scaleway/scaleway-ui/commit/5c9e6440b9d0d1e6c69c5566d5f2c2997c502be8))

### [0.150.2](https://github.com/scaleway/scaleway-ui/compare/v0.150.1...v0.150.2) (2022-05-16)

### :bug: Bug Fixes

- remove some unused colorsDeprecated ([#1453](https://github.com/scaleway/scaleway-ui/issues/1453)) ([dab1852](https://github.com/scaleway/scaleway-ui/commit/dab18525037e3dac75288920c18ef9711f255fb6))

### [0.150.1](https://github.com/scaleway/scaleway-ui/compare/v0.150.0...v0.150.1) (2022-05-16)

### :package: Chore

- **devdeps:** update actions/setup-node action to v3.2.0 ([#1478](https://github.com/scaleway/scaleway-ui/issues/1478)) ([0b9b652](https://github.com/scaleway/scaleway-ui/commit/0b9b652aef987148237e47b8d2b35c2557beb225))

### :bug: Bug Fixes

- remove unused deprecated colors ([#1456](https://github.com/scaleway/scaleway-ui/issues/1456)) ([fc9528a](https://github.com/scaleway/scaleway-ui/commit/fc9528a63ce0a8c2144368da48548f637d3932c3))

## [0.150.0](https://github.com/scaleway/scaleway-ui/compare/v0.149.1...v0.150.0) (2022-05-16)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.24 ([#1473](https://github.com/scaleway/scaleway-ui/issues/1473)) ([0285baf](https://github.com/scaleway/scaleway-ui/commit/0285baf1b9fbbd04da367ad3937e550d32905dac))
- **devdeps:** update dependency @types/react-dom to v18.0.4 ([#1477](https://github.com/scaleway/scaleway-ui/issues/1477)) ([8014794](https://github.com/scaleway/scaleway-ui/commit/801479456da5d1c0c4061eec3d2500995e429da9))
- **devdeps:** update dependency eslint to v8.15.0 ([#1474](https://github.com/scaleway/scaleway-ui/issues/1474)) ([5297904](https://github.com/scaleway/scaleway-ui/commit/5297904de52efdb486a9b4b700664a959bf728d3))
- **devdeps:** update dependency rollup to v2.72.1 ([#1475](https://github.com/scaleway/scaleway-ui/issues/1475)) ([ad41d8c](https://github.com/scaleway/scaleway-ui/commit/ad41d8c7abc5eccf10fc1cd48c3170a28b216d5f))

### :gear: Features

- bullet list becomes step title ([#1399](https://github.com/scaleway/scaleway-ui/issues/1399)) ([78aaa86](https://github.com/scaleway/scaleway-ui/commit/78aaa86acdaaed664ed16cfc5ea66aa7f3d3e733))

### [0.149.1](https://github.com/scaleway/scaleway-ui/compare/v0.149.0...v0.149.1) (2022-05-13)

### :package: Chore

- **devdeps:** pin dependency babel-plugin-named-exports-order to 0.0.2 ([#1471](https://github.com/scaleway/scaleway-ui/issues/1471)) ([da0cd9a](https://github.com/scaleway/scaleway-ui/commit/da0cd9a7bed41519e55b6c4656d324cec99b98a7))

### :bug: Bug Fixes

- stepper behaviour with rounding ([#1452](https://github.com/scaleway/scaleway-ui/issues/1452)) ([4aa1cf0](https://github.com/scaleway/scaleway-ui/commit/4aa1cf06b1fd1cb6dd2003ee74cf817f4b39ce76))

## [0.149.0](https://github.com/scaleway/scaleway-ui/compare/v0.148.0...v0.149.0) (2022-05-11)

### :repeat: CI

- **node:** upgrade to node 18 ([#1467](https://github.com/scaleway/scaleway-ui/issues/1467)) ([de63767](https://github.com/scaleway/scaleway-ui/commit/de63767dc0c05b5e34eeb5e2bfe352422aff1ac3))

### :package: Chore

- **devdeps:** pin dependency jest-environment-jsdom to 28.1.0 ([#1469](https://github.com/scaleway/scaleway-ui/issues/1469)) ([d17103b](https://github.com/scaleway/scaleway-ui/commit/d17103bbcb970ffdd06ea62c0e3d9e63ab1668ff))
- **devdeps:** update bobheadxi/deployments action to v1.2.0 ([#1466](https://github.com/scaleway/scaleway-ui/issues/1466)) ([8cfb1f9](https://github.com/scaleway/scaleway-ui/commit/8cfb1f9bcc0aa99ebd528d9ac8c01003eb26d7ca))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.2 ([#1468](https://github.com/scaleway/scaleway-ui/issues/1468)) ([bf7ac7d](https://github.com/scaleway/scaleway-ui/commit/bf7ac7dbf7fc73438c224d7cb6b7b2a9e348ab97))
- **devdeps:** update dependency jest to v28 ([#1411](https://github.com/scaleway/scaleway-ui/issues/1411)) ([93fbd93](https://github.com/scaleway/scaleway-ui/commit/93fbd93e2beb747555f3b54ce854736fc13da543))
- **devdeps:** update dependency webpack to v5.72.1 ([#1470](https://github.com/scaleway/scaleway-ui/issues/1470)) ([cdbb948](https://github.com/scaleway/scaleway-ui/commit/cdbb948cdad00eca6cbf78b281f65c0833224064))

### :gear: Features

- 🎸 status component ([#1431](https://github.com/scaleway/scaleway-ui/issues/1431)) ([a645a72](https://github.com/scaleway/scaleway-ui/commit/a645a72fb57c005e368eb3008ccfca9554616f50))

## [0.148.0](https://github.com/scaleway/scaleway-ui/compare/v0.147.5...v0.148.0) (2022-05-11)

### :gear: Features

- **list:** selected and disabled row ([#1464](https://github.com/scaleway/scaleway-ui/issues/1464)) ([2bfacb4](https://github.com/scaleway/scaleway-ui/commit/2bfacb4c66eba7bf4605f254266ae315056d0af7))

### [0.147.5](https://github.com/scaleway/scaleway-ui/compare/v0.147.4...v0.147.5) (2022-05-10)

### :bug: Bug Fixes

- **Switch:** avoid event bubbling on label click ([#1465](https://github.com/scaleway/scaleway-ui/issues/1465)) ([635ca73](https://github.com/scaleway/scaleway-ui/commit/635ca7341f44ce39f0412fa3d10d3da8c97d4d4e))

### [0.147.4](https://github.com/scaleway/scaleway-ui/compare/v0.147.3...v0.147.4) (2022-05-10)

### :package: Chore

- **devdeps:** update dependency @types/jest to v27.5.0 ([#1461](https://github.com/scaleway/scaleway-ui/issues/1461)) ([3f4c876](https://github.com/scaleway/scaleway-ui/commit/3f4c876571e2282ee2941cd59e20ab04db96008e))
- **devdeps:** update dependency @types/react to v17.0.45 ([#1458](https://github.com/scaleway/scaleway-ui/issues/1458)) ([9295511](https://github.com/scaleway/scaleway-ui/commit/9295511ba3f6da5f0f84036586bd8832062bb832))
- **devdeps:** update dependency husky to v8 ([#1451](https://github.com/scaleway/scaleway-ui/issues/1451)) ([954cd4c](https://github.com/scaleway/scaleway-ui/commit/954cd4c1a82581c20912809c0f09dba7067740c9))

### :bug: Bug Fixes

- **Badge:** correct component type ([#1462](https://github.com/scaleway/scaleway-ui/issues/1462)) ([0ce51d0](https://github.com/scaleway/scaleway-ui/commit/0ce51d0a17b80781a8e2d099c452d3d765d42f99))

### [0.147.3](https://github.com/scaleway/scaleway-ui/compare/v0.147.2...v0.147.3) (2022-05-10)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.23 ([#1457](https://github.com/scaleway/scaleway-ui/issues/1457)) ([1063dd6](https://github.com/scaleway/scaleway-ui/commit/1063dd6e38250e6cd8c16ff95426e50305d0b3ca))
- **devdeps:** update pnpm to v7.0.1 ([#1459](https://github.com/scaleway/scaleway-ui/issues/1459)) ([172d839](https://github.com/scaleway/scaleway-ui/commit/172d839f790dacb790a5d5dc66c3f89c91a74e5f))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.3.2 ([#1450](https://github.com/scaleway/scaleway-ui/issues/1450)) ([6616034](https://github.com/scaleway/scaleway-ui/commit/6616034383ca107d31e49ba6ddd97f6d9a6c5a38))

### [0.147.2](https://github.com/scaleway/scaleway-ui/compare/v0.147.1...v0.147.2) (2022-05-09)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.22 ([#1455](https://github.com/scaleway/scaleway-ui/issues/1455)) ([ae016b9](https://github.com/scaleway/scaleway-ui/commit/ae016b98c56ca6b3a4e734ccc3fbd58dce567927))

### :bug: Bug Fixes

- **devdeps:** pin dependencies ([#1454](https://github.com/scaleway/scaleway-ui/issues/1454)) ([83b4754](https://github.com/scaleway/scaleway-ui/commit/83b47540f290f0528929bd7bf17cdfe05128ca2d))

### [0.147.1](https://github.com/scaleway/scaleway-ui/compare/v0.147.0...v0.147.1) (2022-05-09)

### :package: Chore

- **devdeps:** update pnpm to v7 ([#1428](https://github.com/scaleway/scaleway-ui/issues/1428)) ([ae8d223](https://github.com/scaleway/scaleway-ui/commit/ae8d2236c30cd02dff8bba3e8984f64451c5762e))

### :bug: Bug Fixes

- **deps:** update dependency react-toastify to v9 ([#1434](https://github.com/scaleway/scaleway-ui/issues/1434)) ([41a8993](https://github.com/scaleway/scaleway-ui/commit/41a8993a3b6cf468b57855f2ba91184edcb5743b))

## [0.147.0](https://github.com/scaleway/scaleway-ui/compare/v0.146.3...v0.147.0) (2022-05-09)

### :package: Chore

- **devdeps:** update dependency @rollup/plugin-node-resolve to v13.3.0 ([#1448](https://github.com/scaleway/scaleway-ui/issues/1448)) ([11eba14](https://github.com/scaleway/scaleway-ui/commit/11eba14edfb7bb860920e72c0bf223c533e99cd4))

### :gear: Features

- add account-multiple icon ([#1440](https://github.com/scaleway/scaleway-ui/issues/1440)) ([050b15a](https://github.com/scaleway/scaleway-ui/commit/050b15abc415b454b9dcb11f98a622ac8687d42f))

### [0.146.3](https://github.com/scaleway/scaleway-ui/compare/v0.146.2...v0.146.3) (2022-05-09)

### :package: Chore

- **devdeps:** update docker/build-push-action action to v3 ([#1443](https://github.com/scaleway/scaleway-ui/issues/1443)) ([02b0774](https://github.com/scaleway/scaleway-ui/commit/02b077471475f0e33a51600f5523b2918affbbb4))
- **devdeps:** update docker/login-action action to v2 ([#1444](https://github.com/scaleway/scaleway-ui/issues/1444)) ([1f0f89d](https://github.com/scaleway/scaleway-ui/commit/1f0f89d8b8400efd4868cc50fc23b486418e326f))
- **devdeps:** update docker/setup-buildx-action action to v2 ([#1445](https://github.com/scaleway/scaleway-ui/issues/1445)) ([e61ba5e](https://github.com/scaleway/scaleway-ui/commit/e61ba5e1f7cfeb63563e8cf9d81547675ead6ce2))

### :bug: Bug Fixes

- update even color on table variant on the list ([#1447](https://github.com/scaleway/scaleway-ui/issues/1447)) ([04578ae](https://github.com/scaleway/scaleway-ui/commit/04578aecd8050c112e118d0639981a91651675a7))

### [0.146.2](https://github.com/scaleway/scaleway-ui/compare/v0.146.1...v0.146.2) (2022-05-05)

### :package: Chore

- **devdeps:** update babel monorepo to v7.17.10 ([#1441](https://github.com/scaleway/scaleway-ui/issues/1441)) ([fc1a6f9](https://github.com/scaleway/scaleway-ui/commit/fc1a6f91fe0118c9ced87db6add2a2e9229370b6))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.21 ([#1437](https://github.com/scaleway/scaleway-ui/issues/1437)) ([238b3c2](https://github.com/scaleway/scaleway-ui/commit/238b3c2ddfb0beb5b03df62c036438b27cc0cd60))
- **devdeps:** update dependency @scaleway/jest-helpers to v1.2.5 ([#1438](https://github.com/scaleway/scaleway-ui/issues/1438)) ([974a826](https://github.com/scaleway/scaleway-ui/commit/974a826cd21aa9fe69e0e8d353d0b1297825ecbf))
- **devdeps:** update dependency @scaleway/jest-helpers to v1.2.6 ([#1439](https://github.com/scaleway/scaleway-ui/issues/1439)) ([03820ef](https://github.com/scaleway/scaleway-ui/commit/03820efababf062c7674ebb6ebd821a15c3613ec))

### :bug: Bug Fixes

- modal types ([#1442](https://github.com/scaleway/scaleway-ui/issues/1442)) ([4adf6c5](https://github.com/scaleway/scaleway-ui/commit/4adf6c5137062df5a88c24d1e19b0d7fdec79385))

### [0.146.1](https://github.com/scaleway/scaleway-ui/compare/v0.146.0...v0.146.1) (2022-05-04)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.20 ([#1432](https://github.com/scaleway/scaleway-ui/issues/1432)) ([9df5e98](https://github.com/scaleway/scaleway-ui/commit/9df5e98c2848d12b8f7af6dc5bf62d526d38308f))
- **devdeps:** update dependency storybook-dark-mode to v1.1.0 ([#1430](https://github.com/scaleway/scaleway-ui/issues/1430)) ([cef4fae](https://github.com/scaleway/scaleway-ui/commit/cef4fae560010bb43a148441d8c631278dfecafd))
- **devdeps:** update node.js to v18.1 ([#1435](https://github.com/scaleway/scaleway-ui/issues/1435)) ([a1a67a6](https://github.com/scaleway/scaleway-ui/commit/a1a67a6f1ea0ea8cb03821981f7b445852658b42))

### :zap: Refactor

- rename ActivityIndicator to Loader ([#1433](https://github.com/scaleway/scaleway-ui/issues/1433)) ([06e4640](https://github.com/scaleway/scaleway-ui/commit/06e4640e85c20355f97bd25094715c4312e4e672))

### :bug: Bug Fixes

- **tags:** remove inheritance background ([#1436](https://github.com/scaleway/scaleway-ui/issues/1436)) ([438553b](https://github.com/scaleway/scaleway-ui/commit/438553bda8d678bbe80f07f90fbe642a798d19aa))

## [0.146.0](https://github.com/scaleway/scaleway-ui/compare/v0.145.4...v0.146.0) (2022-05-02)

### :package: Chore

- **devdeps:** update dependency @rollup/plugin-url to v7 ([#1424](https://github.com/scaleway/scaleway-ui/issues/1424)) ([890c7d9](https://github.com/scaleway/scaleway-ui/commit/890c7d9d3065716247af49fb8ad1adfcbbff82b0))
- **devdeps:** update dependency @types/react-dom to v18.0.3 ([#1426](https://github.com/scaleway/scaleway-ui/issues/1426)) ([0bbfe75](https://github.com/scaleway/scaleway-ui/commit/0bbfe75b8a1530ec97da0b8995b8308c8fb01b83))
- **devdeps:** update dependency postcss to v8.4.13 ([#1427](https://github.com/scaleway/scaleway-ui/issues/1427)) ([6638d18](https://github.com/scaleway/scaleway-ui/commit/6638d18bc8a78da0f43048b5fab2cc2359552ad6))
- **devdeps:** update dependency typescript to v4.6.4 ([#1425](https://github.com/scaleway/scaleway-ui/issues/1425)) ([b8f8505](https://github.com/scaleway/scaleway-ui/commit/b8f8505a9d940d1b88f7d0fcaa262ca8f4b5105d))

### :gear: Features

- **badge:** refactor component ([#1381](https://github.com/scaleway/scaleway-ui/issues/1381)) ([99b694b](https://github.com/scaleway/scaleway-ui/commit/99b694b7ad404c74564360f0c8b7871fc485248c))

### [0.145.4](https://github.com/scaleway/scaleway-ui/compare/v0.145.3...v0.145.4) (2022-04-29)

### :package: Chore

- **devdeps:** update commitlint monorepo to v16.2.4 ([#1423](https://github.com/scaleway/scaleway-ui/issues/1423)) ([4ed0d74](https://github.com/scaleway/scaleway-ui/commit/4ed0d74c7097f6e6ca8512ede192ccac190536d0))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.19 ([#1416](https://github.com/scaleway/scaleway-ui/issues/1416)) ([7c618e1](https://github.com/scaleway/scaleway-ui/commit/7c618e1b2e5a557df715870aa156c05c6cb7bdb6))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.1 ([#1421](https://github.com/scaleway/scaleway-ui/issues/1421)) ([cf4cd21](https://github.com/scaleway/scaleway-ui/commit/cf4cd2133474e37bab61759938484889309105bb))
- **devdeps:** update dependency eslint to v8.14.0 ([#1419](https://github.com/scaleway/scaleway-ui/issues/1419)) ([72253fe](https://github.com/scaleway/scaleway-ui/commit/72253fea213e9a93e9757bedd06082630a5057cb))
- **devdeps:** update dependency lint-staged to v12.4.1 ([#1417](https://github.com/scaleway/scaleway-ui/issues/1417)) ([59ea7cb](https://github.com/scaleway/scaleway-ui/commit/59ea7cb49b75a79c5bc6b479c5ca32375e6d922b))
- **devdeps:** update docker/setup-buildx-action action to v1.7.0 ([#1420](https://github.com/scaleway/scaleway-ui/issues/1420)) ([2259e65](https://github.com/scaleway/scaleway-ui/commit/2259e65dec00f7801e4c0e6352298db5675476e8))
- **devdeps:** update pnpm to v6.32.11 ([#1422](https://github.com/scaleway/scaleway-ui/issues/1422)) ([8ec9c10](https://github.com/scaleway/scaleway-ui/commit/8ec9c106cd590f4750e8056fe8ce049f404438c2))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.3.1 ([#1418](https://github.com/scaleway/scaleway-ui/issues/1418)) ([3c9d521](https://github.com/scaleway/scaleway-ui/commit/3c9d5214dcb76b6fc5b3ca17168e71c9d56093d9))

### [0.145.3](https://github.com/scaleway/scaleway-ui/compare/v0.145.2...v0.145.3) (2022-04-27)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.18 ([#1415](https://github.com/scaleway/scaleway-ui/issues/1415)) ([ff0018d](https://github.com/scaleway/scaleway-ui/commit/ff0018df1cf775bd6d94aee30563b3df0ce3e424))
- **devdeps:** update dependency jest-junit to v13.2.0 ([#1413](https://github.com/scaleway/scaleway-ui/issues/1413)) ([019055d](https://github.com/scaleway/scaleway-ui/commit/019055d6d321c6bd9d11093d8e605c3182fa31c6))
- **devdeps:** update dependency lint-staged to v12.4.0 ([#1412](https://github.com/scaleway/scaleway-ui/issues/1412)) ([6699fef](https://github.com/scaleway/scaleway-ui/commit/6699fefb528af463163b44e2fac0c9090566d337))
- **devdeps:** update pnpm to v6.32.10 ([#1414](https://github.com/scaleway/scaleway-ui/issues/1414)) ([12612b2](https://github.com/scaleway/scaleway-ui/commit/12612b29889c710e6e6499982b4fb755dee69409))

### :bug: Bug Fixes

- **deps:** update dependency @types/react-datepicker to v4.4.1 ([#1407](https://github.com/scaleway/scaleway-ui/issues/1407)) ([be9e58f](https://github.com/scaleway/scaleway-ui/commit/be9e58fe9662f8fa69bc39cfb31259aa4a2d3cda))

### [0.145.2](https://github.com/scaleway/scaleway-ui/compare/v0.145.1...v0.145.2) (2022-04-25)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.3.0 ([#1410](https://github.com/scaleway/scaleway-ui/issues/1410)) ([e20d434](https://github.com/scaleway/scaleway-ui/commit/e20d43410a4ebe78bbc56f9e4bd3f49a8e0dd681))
- **devdeps:** update dependency @types/react-dom to v18.0.2 ([#1406](https://github.com/scaleway/scaleway-ui/issues/1406)) ([d3b1880](https://github.com/scaleway/scaleway-ui/commit/d3b188034c40fa3d1b02cbca31479902a4fed8be))

### :bug: Bug Fixes

- dark theme support for phone input component ([#1396](https://github.com/scaleway/scaleway-ui/issues/1396)) ([b87d92d](https://github.com/scaleway/scaleway-ui/commit/b87d92dd8d1c5288e651183fbdefa8697d13f606))
- removed and fixed notice proptypes ([#1397](https://github.com/scaleway/scaleway-ui/issues/1397)) ([9391192](https://github.com/scaleway/scaleway-ui/commit/93911925a4ac5af1d7fef1ecfa845ec8531123cb))

### [0.145.1](https://github.com/scaleway/scaleway-ui/compare/v0.145.0...v0.145.1) (2022-04-25)

### :package: Chore

- **devdeps:** update actions/checkout action to v3.0.2 ([#1404](https://github.com/scaleway/scaleway-ui/issues/1404)) ([54e3c47](https://github.com/scaleway/scaleway-ui/commit/54e3c4736b4aa6f0151af1f761e8a8f94101b6cf))
- **devdeps:** update codecov/codecov-action action to v3.1.0 ([#1405](https://github.com/scaleway/scaleway-ui/issues/1405)) ([49b8d59](https://github.com/scaleway/scaleway-ui/commit/49b8d59bff6d16088311c73b9ca072007bb26c55))
- **devdeps:** update dependency @rollup/plugin-node-resolve to v13.2.1 ([#1400](https://github.com/scaleway/scaleway-ui/issues/1400)) ([3cbd269](https://github.com/scaleway/scaleway-ui/commit/3cbd269ee071f36cb4c91da34b614abeae8a9dda))
- **devdeps:** update dependency babel-loader to v8.2.5 ([#1401](https://github.com/scaleway/scaleway-ui/issues/1401)) ([b848e71](https://github.com/scaleway/scaleway-ui/commit/b848e719e8fd32bda89c8aab01013a4a2f0645c8))
- **devdeps:** update node.js to v18 ([#1402](https://github.com/scaleway/scaleway-ui/issues/1402)) ([81a334b](https://github.com/scaleway/scaleway-ui/commit/81a334b5b5f0c3a034446ab4c2221d1950e6723f))
- **devdeps:** update pnpm to v6.32.9 ([#1398](https://github.com/scaleway/scaleway-ui/issues/1398)) ([1251554](https://github.com/scaleway/scaleway-ui/commit/12515546165e1d90a0c30ba832faf0dfc65bb499))

### :bug: Bug Fixes

- stepper changes ([#1386](https://github.com/scaleway/scaleway-ui/issues/1386)) ([df7deaf](https://github.com/scaleway/scaleway-ui/commit/df7deaf1dfa8b4f04c9a9f0c84896fdad23e333f))

## [0.145.0](https://github.com/scaleway/scaleway-ui/compare/v0.144.5...v0.145.0) (2022-04-20)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.17 ([#1395](https://github.com/scaleway/scaleway-ui/issues/1395)) ([8917f3b](https://github.com/scaleway/scaleway-ui/commit/8917f3bfd5f72207c2e227fb5221c4ee7ee678df))

### :gear: Features

- new bullet component ([#1374](https://github.com/scaleway/scaleway-ui/issues/1374)) ([21cb54c](https://github.com/scaleway/scaleway-ui/commit/21cb54cb894e93c9a89538fdf271cb45e4c076cd))

### [0.144.5](https://github.com/scaleway/scaleway-ui/compare/v0.144.4...v0.144.5) (2022-04-19)

### :package: Chore

- **devdeps:** update dependency @types/react-dom to v18.0.1 ([#1390](https://github.com/scaleway/scaleway-ui/issues/1390)) ([279e3c8](https://github.com/scaleway/scaleway-ui/commit/279e3c8d7e1e2e8799f5743baf76cc6c953cd058))
- **devdeps:** update dependency lint-staged to v12.3.8 ([#1391](https://github.com/scaleway/scaleway-ui/issues/1391)) ([4de5851](https://github.com/scaleway/scaleway-ui/commit/4de5851501ffe247c6f0b6b37275ac5f6fdfd9e7))
- **devdeps:** update dependency rollup to v2.70.2 ([#1392](https://github.com/scaleway/scaleway-ui/issues/1392)) ([7877ff5](https://github.com/scaleway/scaleway-ui/commit/7877ff540c236111d7f77ab58182fcc3aff79062))
- **devdeps:** update pnpm to v6.32.8 ([#1393](https://github.com/scaleway/scaleway-ui/issues/1393)) ([03d92c9](https://github.com/scaleway/scaleway-ui/commit/03d92c94b7875d92fe370deadb8b9bf52118d240))

### :zap: Refactor

- dotsteps component ([#1385](https://github.com/scaleway/scaleway-ui/issues/1385)) ([249eb7a](https://github.com/scaleway/scaleway-ui/commit/249eb7a93a447aa9a1cbba85014a1f4eaa288154))

### :bug: Bug Fixes

- **theme:** synchronise design tokens ([#1394](https://github.com/scaleway/scaleway-ui/issues/1394)) ([4efb37d](https://github.com/scaleway/scaleway-ui/commit/4efb37daabf9296b15f68cd3b2a521ff6c355174))

### [0.144.4](https://github.com/scaleway/scaleway-ui/compare/v0.144.3...v0.144.4) (2022-04-15)

### :package: Chore

- **devdeps:** update actions/checkout action to v3.0.1 ([#1387](https://github.com/scaleway/scaleway-ui/issues/1387)) ([28e2ee1](https://github.com/scaleway/scaleway-ui/commit/28e2ee16a3fc5d682d4d139839afd66197175cf2))
- **devdeps:** update pnpm to v6.32.7 ([#1388](https://github.com/scaleway/scaleway-ui/issues/1388)) ([03f6436](https://github.com/scaleway/scaleway-ui/commit/03f6436d434ec286a5d905b5d4a1c6078d08917d))
- **devdeps:** update storybook monorepo to v6.4.22 ([#1389](https://github.com/scaleway/scaleway-ui/issues/1389)) ([753fb26](https://github.com/scaleway/scaleway-ui/commit/753fb262fa579a30d9e4dd51ac3600cc22d0e3e6))

### :bug: Bug Fixes

- **deps:** update dependency @types/react-datepicker to v4.4.0 ([#1365](https://github.com/scaleway/scaleway-ui/issues/1365)) ([1c5ab97](https://github.com/scaleway/scaleway-ui/commit/1c5ab97c0ac7c8de23344907a3ba8e9efd8f0a70))

### [0.144.3](https://github.com/scaleway/scaleway-ui/compare/v0.144.2...v0.144.3) (2022-04-14)

### :bug: Bug Fixes

- **alert:** complex children ([#1309](https://github.com/scaleway/scaleway-ui/issues/1309)) ([e1cf008](https://github.com/scaleway/scaleway-ui/commit/e1cf0084a571cf2465e9f636db5294d1dfedac10))

### [0.144.2](https://github.com/scaleway/scaleway-ui/compare/v0.144.1...v0.144.2) (2022-04-14)

### :package: Chore

- **devdeps:** update dependency @scaleway/jest-helpers to v1.2.4 ([#1377](https://github.com/scaleway/scaleway-ui/issues/1377)) ([96ab94b](https://github.com/scaleway/scaleway-ui/commit/96ab94b0c5a58a1c99c943da21dfa71024e05ae1))
- **devdeps:** update dependency @testing-library/react to v12.1.5 ([#1375](https://github.com/scaleway/scaleway-ui/issues/1375)) ([066c720](https://github.com/scaleway/scaleway-ui/commit/066c7209e0b89133095ca2b81a1234036ab90c10))
- **devdeps:** update dependency eslint to v8.13.0 ([#1383](https://github.com/scaleway/scaleway-ui/issues/1383)) ([c3dbbf5](https://github.com/scaleway/scaleway-ui/commit/c3dbbf544583f394a757c3872ac2f719eba8321b))
- **devdeps:** update node.js to v17.9 ([#1376](https://github.com/scaleway/scaleway-ui/issues/1376)) ([c75c35d](https://github.com/scaleway/scaleway-ui/commit/c75c35d527a1bde1e702618620fb6598e4313a2e))

### :zap: Refactor

- migrate VoidFunctionComponent to arguments types ([#1379](https://github.com/scaleway/scaleway-ui/issues/1379)) ([cc11944](https://github.com/scaleway/scaleway-ui/commit/cc11944f658bf152fd7baaa7947525da94ce1294))

### :bug: Bug Fixes

- **deps:** pin dependency @nivo/scales to 0.79.0 ([#1384](https://github.com/scaleway/scaleway-ui/issues/1384)) ([5023328](https://github.com/scaleway/scaleway-ui/commit/5023328e243c74396b18903c1d5fa7f7b4af39e4))
- migrate FunctionComponent to arguments types ([#1382](https://github.com/scaleway/scaleway-ui/issues/1382)) ([67d45d8](https://github.com/scaleway/scaleway-ui/commit/67d45d87650f11ceba29e0b1f7e0aa294fd7f35c))

### [0.144.1](https://github.com/scaleway/scaleway-ui/compare/v0.144.0...v0.144.1) (2022-04-12)

### :package: Chore

- 🤖 update visual testings cmds and related ci process ([#1372](https://github.com/scaleway/scaleway-ui/issues/1372)) ([8003a16](https://github.com/scaleway/scaleway-ui/commit/8003a16491976e50aef42e587d3d38995e2702d6))
- **devdeps:** update dependency @scaleway/jest-helpers to v1.2.3 ([#1371](https://github.com/scaleway/scaleway-ui/issues/1371)) ([4ec9fbf](https://github.com/scaleway/scaleway-ui/commit/4ec9fbf004ebdadf526aadf29c67842697c6be7b))
- **devdeps:** update dependency webpack to v5.72.0 ([#1373](https://github.com/scaleway/scaleway-ui/issues/1373)) ([cfb9fa4](https://github.com/scaleway/scaleway-ui/commit/cfb9fa45ecd5899aa738c3e0d15cbabbd5f57319))

### :bug: Bug Fixes

- shadows colors ([#1353](https://github.com/scaleway/scaleway-ui/issues/1353)) ([a2c426c](https://github.com/scaleway/scaleway-ui/commit/a2c426ce6e33b22bb4346b9aa67eb054a96ee9f9))

## [0.144.0](https://github.com/scaleway/scaleway-ui/compare/v0.143.1...v0.144.0) (2022-04-12)

### :gear: Features

- **theme:** typography synchronized with figma ([#1369](https://github.com/scaleway/scaleway-ui/issues/1369)) ([18f25c6](https://github.com/scaleway/scaleway-ui/commit/18f25c6b91cdccb785790cc8f71692adc7db608b))

### [0.143.1](https://github.com/scaleway/scaleway-ui/compare/v0.143.0...v0.143.1) (2022-04-12)

### :package: Chore

- **devdeps:** update actions/setup-node action to v3.1.1 ([#1368](https://github.com/scaleway/scaleway-ui/issues/1368)) ([966ef73](https://github.com/scaleway/scaleway-ui/commit/966ef7391945b8fa51fa331af1fbbefddbc84546))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.16 ([#1370](https://github.com/scaleway/scaleway-ui/issues/1370)) ([b115d23](https://github.com/scaleway/scaleway-ui/commit/b115d23b9bbf14dbf24ecf8155c0a8682ad391e8))
- **devdeps:** update dependency @types/react-dom to v18 ([#1354](https://github.com/scaleway/scaleway-ui/issues/1354)) ([abedeea](https://github.com/scaleway/scaleway-ui/commit/abedeeac68c91e26ca710b1e81d2cbaa5c41b28d))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.3.0 ([#1366](https://github.com/scaleway/scaleway-ui/issues/1366)) ([047fb7b](https://github.com/scaleway/scaleway-ui/commit/047fb7b6a74eb66cad88379fb5381a9298239dee))

## [0.143.0](https://github.com/scaleway/scaleway-ui/compare/v0.142.0...v0.143.0) (2022-04-11)

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.2 ([#1364](https://github.com/scaleway/scaleway-ui/issues/1364)) ([74486fc](https://github.com/scaleway/scaleway-ui/commit/74486fc462cbe730c7f9ea0a5b5bc7587edc0e60))
- **devdeps:** update pnpm to v6.32.6 ([#1367](https://github.com/scaleway/scaleway-ui/issues/1367)) ([71bad55](https://github.com/scaleway/scaleway-ui/commit/71bad55ca54494234f3b64d5d4c01439fa66e4a0))

### :gear: Features

- colors updated for dark theme ([#1355](https://github.com/scaleway/scaleway-ui/issues/1355)) ([8929e85](https://github.com/scaleway/scaleway-ui/commit/8929e852282ac3c515d218f63aaf32dbbd0e7909))

## [0.142.0](https://github.com/scaleway/scaleway-ui/compare/v0.141.13...v0.142.0) (2022-04-11)

### :repeat: CI

- correct deployment failing because of too much inactive requests ([#1362](https://github.com/scaleway/scaleway-ui/issues/1362)) ([3033a25](https://github.com/scaleway/scaleway-ui/commit/3033a2596f957f23d79746c37c68218fa74b2b73))

### :gear: Features

- **colors:** dark colors list containers and separator ([#1352](https://github.com/scaleway/scaleway-ui/issues/1352)) ([817d92a](https://github.com/scaleway/scaleway-ui/commit/817d92ac6b6930f84d647f56e0b7de65ba879898))

### :package: Chore

- **devdeps:** update dependency @scaleway/jest-helpers to v1.2.2 ([#1344](https://github.com/scaleway/scaleway-ui/issues/1344)) ([d37b2cb](https://github.com/scaleway/scaleway-ui/commit/d37b2cb3d8ae44e984c0477bcaeb58a87ba579ef))
- **devdeps:** update dependency jest-junit to v13.1.0 ([#1361](https://github.com/scaleway/scaleway-ui/issues/1361)) ([9096838](https://github.com/scaleway/scaleway-ui/commit/9096838da3a5b4a651d623c5357af252a0c0fb66))
- **devdeps:** update dependency rollup-plugin-dts to v4.2.1 ([#1359](https://github.com/scaleway/scaleway-ui/issues/1359)) ([b089a41](https://github.com/scaleway/scaleway-ui/commit/b089a41da1ec7aa4e326005a444aca2e3bca8886))
- **devdeps:** update storybook monorepo to v6.4.21 ([#1360](https://github.com/scaleway/scaleway-ui/issues/1360)) ([8574b70](https://github.com/scaleway/scaleway-ui/commit/8574b70a2772b80dc577c55c84dffaee5cb73bb9))

### [0.141.13](https://github.com/scaleway/scaleway-ui/compare/v0.141.12...v0.141.13) (2022-04-10)

### :white_check_mark: Test

- improve coverage ([#1346](https://github.com/scaleway/scaleway-ui/issues/1346)) ([8371e8c](https://github.com/scaleway/scaleway-ui/commit/8371e8c4bd49e9bf6944cc816db1b804da2d05e8))

### :package: Chore

- **devdeps:** update dependency @emotion/jest to v11.9.1 ([#1358](https://github.com/scaleway/scaleway-ui/issues/1358)) ([3ad507e](https://github.com/scaleway/scaleway-ui/commit/3ad507efeb43123cee04ac8812770459359e5187))
- **devdeps:** update dependency @types/react-dom to v17.0.15 ([#1356](https://github.com/scaleway/scaleway-ui/issues/1356)) ([f734e63](https://github.com/scaleway/scaleway-ui/commit/f734e6327e609c354b653ceb9ff470562e3c3a82))

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/random-name to v3.0.2 ([#1357](https://github.com/scaleway/scaleway-ui/issues/1357)) ([81d73c6](https://github.com/scaleway/scaleway-ui/commit/81d73c66a037134025b083a5d8281c52c0c6dfc7))
- **pnpm:** lockfile broken ([#1363](https://github.com/scaleway/scaleway-ui/issues/1363)) ([1218425](https://github.com/scaleway/scaleway-ui/commit/1218425d485e386d0afd5c3bd24dc37de6e73d83))

### [0.141.12](https://github.com/scaleway/scaleway-ui/compare/v0.141.11...v0.141.12) (2022-04-07)

### :bug: Bug Fixes

- **deps:** update dependency react-use-clipboard to v1.0.8 ([#1343](https://github.com/scaleway/scaleway-ui/issues/1343)) ([ccfa7e9](https://github.com/scaleway/scaleway-ui/commit/ccfa7e93d4d49b422b9b9c86eda4e2608c29dd29))

### [0.141.11](https://github.com/scaleway/scaleway-ui/compare/v0.141.10...v0.141.11) (2022-04-07)

### :bug: Bug Fixes

- missing px into shadows script ([#1351](https://github.com/scaleway/scaleway-ui/issues/1351)) ([a9bc4ad](https://github.com/scaleway/scaleway-ui/commit/a9bc4adecf7573e74a0409ffaf5c6511209e884e))

### [0.141.10](https://github.com/scaleway/scaleway-ui/compare/v0.141.9...v0.141.10) (2022-04-07)

### :bug: Bug Fixes

- **colors:** fixed neutral text strong and disabled colors ([#1345](https://github.com/scaleway/scaleway-ui/issues/1345)) ([d92aa2a](https://github.com/scaleway/scaleway-ui/commit/d92aa2af04daad04f6824f4cc6f14d0cdc0b9828))

### [0.141.9](https://github.com/scaleway/scaleway-ui/compare/v0.141.8...v0.141.9) (2022-04-07)

### :package: Chore

- **devdeps:** update babel monorepo to v7.17.9 ([#1349](https://github.com/scaleway/scaleway-ui/issues/1349)) ([214524f](https://github.com/scaleway/scaleway-ui/commit/214524f1fee01e463924e2edcfa9bbea8f29b581))
- **devdeps:** update dependency @testing-library/jest-dom to v5.16.4 ([#1347](https://github.com/scaleway/scaleway-ui/issues/1347)) ([1d8d918](https://github.com/scaleway/scaleway-ui/commit/1d8d9184e58850a10f19fa506468f79167b201e5))
- **devdeps:** update emotion monorepo ([#1340](https://github.com/scaleway/scaleway-ui/issues/1340)) ([7199b81](https://github.com/scaleway/scaleway-ui/commit/7199b8103e09619a5d80609186bf53af84e03f3e))

### :bug: Bug Fixes

- background overlay and elevated colors ([#1338](https://github.com/scaleway/scaleway-ui/issues/1338)) ([f4f6ed9](https://github.com/scaleway/scaleway-ui/commit/f4f6ed95c2813ce3df10c9bccb43c98ab1409c55))

### [0.141.8](https://github.com/scaleway/scaleway-ui/compare/v0.141.7...v0.141.8) (2022-04-06)

### :package: Chore

- **devdeps:** update codecov/codecov-action action to v3 ([#1337](https://github.com/scaleway/scaleway-ui/issues/1337)) ([3ee93af](https://github.com/scaleway/scaleway-ui/commit/3ee93af10bc8daa9aa4b14d3af4e08120a528f23))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.13 ([#1331](https://github.com/scaleway/scaleway-ui/issues/1331)) ([59d2f19](https://github.com/scaleway/scaleway-ui/commit/59d2f19aa90d9d75c68c05b4c16773cb4873acbe))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.14 ([#1334](https://github.com/scaleway/scaleway-ui/issues/1334)) ([5181137](https://github.com/scaleway/scaleway-ui/commit/5181137c9609eb4f8054738f8b174976e6817e79))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.15 ([#1342](https://github.com/scaleway/scaleway-ui/issues/1342)) ([febcb20](https://github.com/scaleway/scaleway-ui/commit/febcb20d2c8614371aaa5b2eafeee61e203e9b5e))
- **devdeps:** update dependency @scaleway/jest-helpers to v1.1.13 ([#1332](https://github.com/scaleway/scaleway-ui/issues/1332)) ([fb654dd](https://github.com/scaleway/scaleway-ui/commit/fb654dd3771be56af3e0f75f0cc059c8a2843755))
- **devdeps:** update dependency @scaleway/jest-helpers to v1.2.0 ([#1335](https://github.com/scaleway/scaleway-ui/issues/1335)) ([c24f9c2](https://github.com/scaleway/scaleway-ui/commit/c24f9c29d4319fdf33989b35bc0b0d4aa587e700))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.14 ([#1333](https://github.com/scaleway/scaleway-ui/issues/1333)) ([c8dc5a2](https://github.com/scaleway/scaleway-ui/commit/c8dc5a234cafcd2cc77bc5fafc37b03280486bc9))
- **devdeps:** update dependency @scaleway/use-i18n to v3.3.0 ([#1336](https://github.com/scaleway/scaleway-ui/issues/1336)) ([64323e3](https://github.com/scaleway/scaleway-ui/commit/64323e3ab1f7fe07a39b3f0135aeb3a01896590f))
- **devdeps:** update dependency react-router-dom to v6.3.0 ([#1339](https://github.com/scaleway/scaleway-ui/issues/1339)) ([11a2970](https://github.com/scaleway/scaleway-ui/commit/11a29702c5c87cdae3608c7da75e283dce4e04bb))
- **devdeps:** update dependency webpack to v5.71.0 ([#1348](https://github.com/scaleway/scaleway-ui/issues/1348)) ([1725a02](https://github.com/scaleway/scaleway-ui/commit/1725a029135fdad68755498e93d0abbb02d97331))

### :bug: Bug Fixes

- **deps:** update dependency polished to v4.2.2 ([#1341](https://github.com/scaleway/scaleway-ui/issues/1341)) ([2b2450d](https://github.com/scaleway/scaleway-ui/commit/2b2450dee30730554e753fdcc087e5d45ac70f72))

### [0.141.7](https://github.com/scaleway/scaleway-ui/compare/v0.141.6...v0.141.7) (2022-04-04)

### :bug: Bug Fixes

- **deps:** update dependency polished to v4.2.1 ([#1330](https://github.com/scaleway/scaleway-ui/issues/1330)) ([e365af7](https://github.com/scaleway/scaleway-ui/commit/e365af75c7e84cb73cdc75ccde3b75eaae224b6b))

### [0.141.6](https://github.com/scaleway/scaleway-ui/compare/v0.141.5...v0.141.6) (2022-04-03)

### :bug: Bug Fixes

- **deps:** update dependency react-countup to v6.2.0 ([#1327](https://github.com/scaleway/scaleway-ui/issues/1327)) ([0521a76](https://github.com/scaleway/scaleway-ui/commit/0521a76fcb80111508b28650dfd22eb56809902f))

### :package: Chore

- **devdeps:** update dependency prettier to v2.6.2 ([#1329](https://github.com/scaleway/scaleway-ui/issues/1329)) ([c90fea4](https://github.com/scaleway/scaleway-ui/commit/c90fea4067f44c101607e5b053dc11ecd32b36e7))

### [0.141.5](https://github.com/scaleway/scaleway-ui/compare/v0.141.4...v0.141.5) (2022-04-03)

### :bug: Bug Fixes

- **deps:** update dependency polished to v4.2.0 ([#1328](https://github.com/scaleway/scaleway-ui/issues/1328)) ([dd1989d](https://github.com/scaleway/scaleway-ui/commit/dd1989dc8de453cf7ce648527d8bb5da12314cd0))

### :package: Chore

- **devdeps:** update actions/cache action to v3.0.1 ([#1316](https://github.com/scaleway/scaleway-ui/issues/1316)) ([fee7233](https://github.com/scaleway/scaleway-ui/commit/fee72337a99faf2a31c2e8e664ae026529d3eaaf))
- **devdeps:** update actions/setup-node action to v3.1.0 ([#1323](https://github.com/scaleway/scaleway-ui/issues/1323)) ([362f51d](https://github.com/scaleway/scaleway-ui/commit/362f51d509d46471f74269adae1c260043d477b1))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.11 ([#1315](https://github.com/scaleway/scaleway-ui/issues/1315)) ([ba74b23](https://github.com/scaleway/scaleway-ui/commit/ba74b23d180757cd360b4af85d694dbafb5d0f13))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.12 ([#1324](https://github.com/scaleway/scaleway-ui/issues/1324)) ([d70b02b](https://github.com/scaleway/scaleway-ui/commit/d70b02b4512047712ca7ea8bdd907b01a584b212))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.13 ([#1319](https://github.com/scaleway/scaleway-ui/issues/1319)) ([2ff8a0d](https://github.com/scaleway/scaleway-ui/commit/2ff8a0da11fddfaf14770d97f07b8a7d50e874fa))
- **devdeps:** update dependency @semantic-release/github to v8.0.4 ([#1317](https://github.com/scaleway/scaleway-ui/issues/1317)) ([c410b04](https://github.com/scaleway/scaleway-ui/commit/c410b0423c5f4225178d94f423108574b03e96f7))
- **devdeps:** update dependency @testing-library/jest-dom to v5.16.3 ([#1310](https://github.com/scaleway/scaleway-ui/issues/1310)) ([6b121c7](https://github.com/scaleway/scaleway-ui/commit/6b121c7b97b145920b528675f7b687e5d2845deb))
- **devdeps:** update dependency eslint to v8.12.0 ([#1318](https://github.com/scaleway/scaleway-ui/issues/1318)) ([2297b82](https://github.com/scaleway/scaleway-ui/commit/2297b82991a6b1f1c2199710837cab24a27bf2ae))
- **devdeps:** update dependency loki to v0.29.0 ([#1321](https://github.com/scaleway/scaleway-ui/issues/1321)) ([4589858](https://github.com/scaleway/scaleway-ui/commit/45898580aafc70d188867113dd71eb08c1e879aa))
- **devdeps:** update dependency prettier to v2.6.1 ([#1312](https://github.com/scaleway/scaleway-ui/issues/1312)) ([9433b0b](https://github.com/scaleway/scaleway-ui/commit/9433b0b08b906e620091f525e53a67baf42b9f53))
- **devdeps:** update dependency typescript to v4.6.3 ([#1311](https://github.com/scaleway/scaleway-ui/issues/1311)) ([a6e33f7](https://github.com/scaleway/scaleway-ui/commit/a6e33f7f304d9e86362c20134fa58cafc4c319a7))
- **devdeps:** update pnpm to v6.32.4 ([#1325](https://github.com/scaleway/scaleway-ui/issues/1325)) ([0df86f0](https://github.com/scaleway/scaleway-ui/commit/0df86f0c2f3182fe651413447a2518548959181f))
- **devdeps:** update storybook monorepo to v6.4.20 ([#1326](https://github.com/scaleway/scaleway-ui/issues/1326)) ([3ecf400](https://github.com/scaleway/scaleway-ui/commit/3ecf4003e8a19d0282143ea90d18daf4c07ea67e))

### [0.141.4](https://github.com/scaleway/scaleway-ui/compare/v0.141.3...v0.141.4) (2022-03-24)

### :bug: Bug Fixes

- menu display ([#1302](https://github.com/scaleway/scaleway-ui/issues/1302)) ([8d93eab](https://github.com/scaleway/scaleway-ui/commit/8d93eabdf00d9e037a1a21e3f9c4f87f33bcec82))

### [0.141.3](https://github.com/scaleway/scaleway-ui/compare/v0.141.2...v0.141.3) (2022-03-24)

### :bug: Bug Fixes

- update design tokens ([#1304](https://github.com/scaleway/scaleway-ui/issues/1304)) ([1617ccc](https://github.com/scaleway/scaleway-ui/commit/1617ccc452408a2ccae0192cbbe66d430d075782))

### :package: Chore

- **devdeps:** update dependency babel-loader to v8.2.4 ([#1306](https://github.com/scaleway/scaleway-ui/issues/1306)) ([0bf162b](https://github.com/scaleway/scaleway-ui/commit/0bf162baf3bd56fca58d6696a02bfaeb99d111cf))
- **devdeps:** update node.js to v17.8 ([#1305](https://github.com/scaleway/scaleway-ui/issues/1305)) ([6f5d643](https://github.com/scaleway/scaleway-ui/commit/6f5d643e36a389b08446049771a6e821b2c116ad))
- **devdeps:** update peter-evans/create-pull-request action to v4 ([#1301](https://github.com/scaleway/scaleway-ui/issues/1301)) ([a4e4f2f](https://github.com/scaleway/scaleway-ui/commit/a4e4f2f9ece78b1beeaad8af5b80c3ccd6b9dff5))

### [0.141.2](https://github.com/scaleway/scaleway-ui/compare/v0.141.1...v0.141.2) (2022-03-23)

### :bug: Bug Fixes

- correct theme type ([#1300](https://github.com/scaleway/scaleway-ui/issues/1300)) ([05a47f4](https://github.com/scaleway/scaleway-ui/commit/05a47f4d33675d8072657a80d1cc99a9a990db5f))

### [0.141.1](https://github.com/scaleway/scaleway-ui/compare/v0.141.0...v0.141.1) (2022-03-23)

### :bug: Bug Fixes

- **colors:** badge neutral to be more dark ([#1303](https://github.com/scaleway/scaleway-ui/issues/1303)) ([8ca7e52](https://github.com/scaleway/scaleway-ui/commit/8ca7e528185a1f2bb3bd9fed9872d1c372095124))

### :package: Chore

- update package json tokens sync ([#1299](https://github.com/scaleway/scaleway-ui/issues/1299)) ([fdee9a0](https://github.com/scaleway/scaleway-ui/commit/fdee9a023ed171030b35d053ff537ac4a4dac7d8))

## [0.141.0](https://github.com/scaleway/scaleway-ui/compare/v0.140.6...v0.141.0) (2022-03-23)

### :gear: Features

- **list:** added some animation on list ([#1264](https://github.com/scaleway/scaleway-ui/issues/1264)) ([aaeb7aa](https://github.com/scaleway/scaleway-ui/commit/aaeb7aa3ee732ef4e431977101eff0668f5b992f))

### [0.140.6](https://github.com/scaleway/scaleway-ui/compare/v0.140.5...v0.140.6) (2022-03-22)

### :package: Chore

- **deps:** upgrade react-toastify to 8.2.0 ([#1297](https://github.com/scaleway/scaleway-ui/issues/1297)) ([b0cdfe2](https://github.com/scaleway/scaleway-ui/commit/b0cdfe255b05026c1a4332d287fb592cf72776df))

### [0.140.5](https://github.com/scaleway/scaleway-ui/compare/v0.140.4...v0.140.5) (2022-03-21)

### :bug: Bug Fixes

- **menu:** add className to menu component ([#1277](https://github.com/scaleway/scaleway-ui/issues/1277)) ([e1748a5](https://github.com/scaleway/scaleway-ui/commit/e1748a5b4edd70ed5f44a47a0d83df484005a7d0))

### [0.140.4](https://github.com/scaleway/scaleway-ui/compare/v0.140.3...v0.140.4) (2022-03-21)

### :repeat: CI

- correct deploy step ([829ab92](https://github.com/scaleway/scaleway-ui/commit/829ab927c6d37093316bcfe4b6877c2d5b6ea3e1))
- update renovate config ([9065512](https://github.com/scaleway/scaleway-ui/commit/9065512ab6a6d31b81a9e06c62e0f0aee5e3d3ca))

### :package: Chore

- **devdeps:** update actions/cache action ([#1295](https://github.com/scaleway/scaleway-ui/issues/1295)) ([d47e9ff](https://github.com/scaleway/scaleway-ui/commit/d47e9ff40268935d9d622d9c0e56a302bbbd4a43))
- **devdeps:** update andresz1/size-limit-action action to v1.6.1 ([#1288](https://github.com/scaleway/scaleway-ui/issues/1288)) ([759c617](https://github.com/scaleway/scaleway-ui/commit/759c6172931289abaa1f2c81b7b61fe893459707))
- **devdeps:** update babel monorepo to v7.17.8 ([#1291](https://github.com/scaleway/scaleway-ui/issues/1291)) ([08d6ee2](https://github.com/scaleway/scaleway-ui/commit/08d6ee2acf69bf1f961f430d72fe95486fef53f6))
- **devdeps:** update dependency @commitlint/cli to v16.2.3 ([#1284](https://github.com/scaleway/scaleway-ui/issues/1284)) ([2107be7](https://github.com/scaleway/scaleway-ui/commit/2107be73bc12e244d47c659c0f416519e811c3e8))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.10 ([#1294](https://github.com/scaleway/scaleway-ui/issues/1294)) ([d077765](https://github.com/scaleway/scaleway-ui/commit/d0777650c4496d66e2ff3f7c594d7b09673e2557))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.9 ([#1287](https://github.com/scaleway/scaleway-ui/issues/1287)) ([f20939e](https://github.com/scaleway/scaleway-ui/commit/f20939e11a59c8770e1cc99bcf1149a9289d5acb))
- **devdeps:** update dependency @storybook/testing-react to v1.2.4 ([#1296](https://github.com/scaleway/scaleway-ui/issues/1296)) ([226e7c1](https://github.com/scaleway/scaleway-ui/commit/226e7c12b89769a749aa9e144f5d8924a29150e7))
- **devdeps:** update dependency @types/react-dom to v17.0.14 ([#1292](https://github.com/scaleway/scaleway-ui/issues/1292)) ([f7ed2d3](https://github.com/scaleway/scaleway-ui/commit/f7ed2d3dedc8cd40ac4e3abe20da36586e0dbe2f))
- **devdeps:** update dependency eslint to v8.11.0 ([#1283](https://github.com/scaleway/scaleway-ui/issues/1283)) ([02dccd5](https://github.com/scaleway/scaleway-ui/commit/02dccd51aeb3153d0024bfc317d389ee4c3562ca))
- **devdeps:** update dependency lint-staged to v12.3.6 ([#1285](https://github.com/scaleway/scaleway-ui/issues/1285)) ([32d4a43](https://github.com/scaleway/scaleway-ui/commit/32d4a439bc7ea9280c6a13c7728850db35753aeb))
- **devdeps:** update dependency lint-staged to v12.3.7 ([#1289](https://github.com/scaleway/scaleway-ui/issues/1289)) ([4c46b8c](https://github.com/scaleway/scaleway-ui/commit/4c46b8c70ea921d7faa3eed4eebf7fe54e5f516a))
- **devdeps:** update dependency postcss to v8.4.12 ([#1286](https://github.com/scaleway/scaleway-ui/issues/1286)) ([348a7a0](https://github.com/scaleway/scaleway-ui/commit/348a7a0b47d266a2f33d808aa80f2ca3c9b4a268))
- **devdeps:** update dependency prettier to v2.6.0 ([#1293](https://github.com/scaleway/scaleway-ui/issues/1293)) ([e404b28](https://github.com/scaleway/scaleway-ui/commit/e404b2876989892536c07e0740172957e58a7ff2))
- **devdeps:** update pnpm to v6.32.3 ([#1290](https://github.com/scaleway/scaleway-ui/issues/1290)) ([87c7e78](https://github.com/scaleway/scaleway-ui/commit/87c7e783f13093d703b1c33d7e01883190232889))
- **devdeps:** update semantic-release monorepo ([#1130](https://github.com/scaleway/scaleway-ui/issues/1130)) ([725e56b](https://github.com/scaleway/scaleway-ui/commit/725e56bb0454a1fca3ceda572acf6a1b14cad7b8))
- migrate to pnpm ([#1245](https://github.com/scaleway/scaleway-ui/issues/1245)) ([65ba5b7](https://github.com/scaleway/scaleway-ui/commit/65ba5b7db9447395d5108995b54bd9fb6f696c73))

### :bug: Bug Fixes

- typescript errors and ci ([#1280](https://github.com/scaleway/scaleway-ui/issues/1280)) ([f7928cf](https://github.com/scaleway/scaleway-ui/commit/f7928cff7eb35aeb9fad623ffcd1eefcc09a78e0))

### [0.140.3](https://github.com/scaleway/scaleway-ui/compare/v0.140.2...v0.140.3) (2022-03-16)

### :bug: Bug Fixes

- adjust disabled colors for button and switchbutton ([#1282](https://github.com/scaleway/scaleway-ui/issues/1282)) ([b63eb70](https://github.com/scaleway/scaleway-ui/commit/b63eb700a33bd6147194253136da1ce486980110))

### [0.140.2](https://github.com/scaleway/scaleway-ui/compare/v0.140.1...v0.140.2) (2022-03-16)

### :bug: Bug Fixes

- sync tokens ([#1278](https://github.com/scaleway/scaleway-ui/issues/1278)) ([194631d](https://github.com/scaleway/scaleway-ui/commit/194631d4488b101d6761ea4fc03b5c4e995ae78a))

### [0.140.1](https://github.com/scaleway/scaleway-ui/compare/v0.140.0...v0.140.1) (2022-03-16)

### :bug: Bug Fixes

- missing yarn install ([#1276](https://github.com/scaleway/scaleway-ui/issues/1276)) ([5efe2ca](https://github.com/scaleway/scaleway-ui/commit/5efe2ca42fedfa0b49666554b7ab4c50ae1fcb76))

## [0.140.0](https://github.com/scaleway/scaleway-ui/compare/v0.139.7...v0.140.0) (2022-03-15)

### :gear: Features

- **design:** use new sync colors and audit all components ([#1253](https://github.com/scaleway/scaleway-ui/issues/1253)) ([2345d08](https://github.com/scaleway/scaleway-ui/commit/2345d08bd6c37428e4f9dc2c8033a96166bea81f))

### [0.139.7](https://github.com/scaleway/scaleway-ui/compare/v0.139.6...v0.139.7) (2022-03-15)

### :package: Chore

- **devdeps:** update babel monorepo to v7.17.7 ([#1272](https://github.com/scaleway/scaleway-ui/issues/1272)) ([40eb9ea](https://github.com/scaleway/scaleway-ui/commit/40eb9ea7f349923509b3cf398c90df65a2b98cfd))
- **devdeps:** update dependency rollup to v2.70.1 ([#1275](https://github.com/scaleway/scaleway-ui/issues/1275)) ([9858542](https://github.com/scaleway/scaleway-ui/commit/9858542e60264c467388232b0e8c74f456fa2429))
- **devdeps:** update docker/build-push-action action to v2.10.0 ([#1273](https://github.com/scaleway/scaleway-ui/issues/1273)) ([1882556](https://github.com/scaleway/scaleway-ui/commit/1882556d07f53235ded51462fcbbed1ebf43b76e))

### :bug: Bug Fixes

- **deps:** update dependency intl-tel-input to v17.0.16 ([#1274](https://github.com/scaleway/scaleway-ui/issues/1274)) ([bdec261](https://github.com/scaleway/scaleway-ui/commit/bdec261bb439265364912d5f54e985df9cac5dcb))

### [0.139.6](https://github.com/scaleway/scaleway-ui/compare/v0.139.5...v0.139.6) (2022-03-14)

### :bug: Bug Fixes

- **typescript:** change interface with type to allow used inside scaleway-form ([#1271](https://github.com/scaleway/scaleway-ui/issues/1271)) ([692ee8f](https://github.com/scaleway/scaleway-ui/commit/692ee8f4c63d9d5d2999d0d8147015747931579a))

### [0.139.5](https://github.com/scaleway/scaleway-ui/compare/v0.139.4...v0.139.5) (2022-03-14)

### :package: Chore

- **deps:** update dependency @emotion/react to v11.8.2 ([#1260](https://github.com/scaleway/scaleway-ui/issues/1260)) ([87e1a7e](https://github.com/scaleway/scaleway-ui/commit/87e1a7e9bf8ae3e213d3050b8df070a8837b9e2b))
- **devdeps:** update actions/checkout action to v3 ([#1268](https://github.com/scaleway/scaleway-ui/issues/1268)) ([e8bf76a](https://github.com/scaleway/scaleway-ui/commit/e8bf76a00fd5e9aab0be3472c9e50c65e951a98b))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.8 ([#1269](https://github.com/scaleway/scaleway-ui/issues/1269)) ([f052ad0](https://github.com/scaleway/scaleway-ui/commit/f052ad0e07ec51fc06858908cce66241f2e8760d))
- **devdeps:** update docker/login-action action to v1.14.1 ([#1266](https://github.com/scaleway/scaleway-ui/issues/1266)) ([947092b](https://github.com/scaleway/scaleway-ui/commit/947092b1d497dbd6af84bd61cc41a3868be22aed))

### [0.139.4](https://github.com/scaleway/scaleway-ui/compare/v0.139.3...v0.139.4) (2022-03-14)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.4 ([#1239](https://github.com/scaleway/scaleway-ui/issues/1239)) ([a88e997](https://github.com/scaleway/scaleway-ui/commit/a88e99743c5ed3b9e1d9a2f06a33f5780ffe05d1))
- **devdeps:** update dependency @testing-library/react to v12.1.4 ([#1261](https://github.com/scaleway/scaleway-ui/issues/1261)) ([cd99e0a](https://github.com/scaleway/scaleway-ui/commit/cd99e0a13c482bfa2d66a45b5c398fea41c34bba))
- **devdeps:** update dependency rollup to v2.70.0 ([#1265](https://github.com/scaleway/scaleway-ui/issues/1265)) ([d423153](https://github.com/scaleway/scaleway-ui/commit/d4231536dcb403926774e765dba635ec35da4bb0))
- **devdeps:** update node.js to v17.7 ([#1263](https://github.com/scaleway/scaleway-ui/issues/1263)) ([5ee97b8](https://github.com/scaleway/scaleway-ui/commit/5ee97b88e1f78fea6b6be97ead0ae7941868d2c3))
- **devdeps:** update philibea/scaleway-containers-deploy action to v1.0.6 ([#1257](https://github.com/scaleway/scaleway-ui/issues/1257)) ([e515823](https://github.com/scaleway/scaleway-ui/commit/e5158235344a388b584544c65c9b1d901940005f))
- **devdeps:** update philibea/scaleway-containers-deploy action to v1.0.7 ([#1262](https://github.com/scaleway/scaleway-ui/issues/1262)) ([114ef56](https://github.com/scaleway/scaleway-ui/commit/114ef56a62f573aa2eff9801ad1c60f0a284a4a7))
- **typescript:** fix somes errors typescript ([#1249](https://github.com/scaleway/scaleway-ui/issues/1249)) ([7d3bab9](https://github.com/scaleway/scaleway-ui/commit/7d3bab948ccc93412d0dcba6c9df3a1b15de1380))

### :bug: Bug Fixes

- script and tokens ([#1259](https://github.com/scaleway/scaleway-ui/issues/1259)) ([2a71dee](https://github.com/scaleway/scaleway-ui/commit/2a71deee9b7c0037ac507edeceace96861dcf668))

### [0.139.3](https://github.com/scaleway/scaleway-ui/compare/v0.139.2...v0.139.3) (2022-03-09)

### :package: Chore

- **devdeps:** update dependency jest-axe to v6 ([#1251](https://github.com/scaleway/scaleway-ui/issues/1251)) ([1b8adc7](https://github.com/scaleway/scaleway-ui/commit/1b8adc78c05e35e1be788c4d75d762884bc49b27))
- **devdeps:** update dependency postcss to v8.4.8 ([#1252](https://github.com/scaleway/scaleway-ui/issues/1252)) ([85d3cbd](https://github.com/scaleway/scaleway-ui/commit/85d3cbd0ff03e32337f7055c0e89b75aa9cee58f))
- **devdeps:** update dependency rollup-plugin-dts to v4.2.0 ([#1255](https://github.com/scaleway/scaleway-ui/issues/1255)) ([92d40a4](https://github.com/scaleway/scaleway-ui/commit/92d40a45d1039e03f486670549c6575024e275c3))
- **devdeps:** update dependency storybook-dark-mode to v1.0.9 ([#1247](https://github.com/scaleway/scaleway-ui/issues/1247)) ([f54412f](https://github.com/scaleway/scaleway-ui/commit/f54412f28b0cdc6d511a530618c1e00559a1298b))
- **devdeps:** update dependency webpack to v5.70.0 ([#1256](https://github.com/scaleway/scaleway-ui/issues/1256)) ([aa30640](https://github.com/scaleway/scaleway-ui/commit/aa306407bff7680e1aa8f225920152b2a2b6f42d))

### :bug: Bug Fixes

- **statebar:** add new case on stateBar ([#1242](https://github.com/scaleway/scaleway-ui/issues/1242)) ([6c73786](https://github.com/scaleway/scaleway-ui/commit/6c7378636d9a77e9744caed4c2fef325c0d3907a))

### [0.139.2](https://github.com/scaleway/scaleway-ui/compare/v0.139.1...v0.139.2) (2022-03-08)

### :bug: Bug Fixes

- visual testing update ([#1254](https://github.com/scaleway/scaleway-ui/issues/1254)) ([0e8708d](https://github.com/scaleway/scaleway-ui/commit/0e8708d4a7a49d3c95bf8620bb8ed4249361c394))

### [0.139.1](https://github.com/scaleway/scaleway-ui/compare/v0.139.0...v0.139.1) (2022-03-08)

### :bug: Bug Fixes

- **teardown:** dns env was not the same, use secret to keep one variable updated ([#1250](https://github.com/scaleway/scaleway-ui/issues/1250)) ([530da23](https://github.com/scaleway/scaleway-ui/commit/530da230f5b172f4488a97337d38a5098657312b))

## [0.139.0](https://github.com/scaleway/scaleway-ui/compare/v0.138.2...v0.139.0) (2022-03-07)

### :package: Chore

- **devdeps:** update actions/upload-artifact action to v3 ([#1241](https://github.com/scaleway/scaleway-ui/issues/1241)) ([c553140](https://github.com/scaleway/scaleway-ui/commit/c5531407c7a1152faea9ec687c0399b3576e97b0))
- **devdeps:** update dependency @types/react-dom to v17.0.13 ([#1240](https://github.com/scaleway/scaleway-ui/issues/1240)) ([f8a0600](https://github.com/scaleway/scaleway-ui/commit/f8a06005b64f421322d4232530419b739ecab64f))
- **devdeps:** update dependency lint-staged to v12.3.5 ([#1244](https://github.com/scaleway/scaleway-ui/issues/1244)) ([9457234](https://github.com/scaleway/scaleway-ui/commit/945723400345c2b0c63cdc3500b32b1bd949d591))
- **devdeps:** update dependency typescript to v4.6.2 ([#1243](https://github.com/scaleway/scaleway-ui/issues/1243)) ([6995ac3](https://github.com/scaleway/scaleway-ui/commit/6995ac39cd5c251a44b9ce61fc8340e18338009f))

### :gear: Features

- **colors:** synchronise with figma ([#1198](https://github.com/scaleway/scaleway-ui/issues/1198)) ([d7dd211](https://github.com/scaleway/scaleway-ui/commit/d7dd211c49a2bfee7a1d4aaa33df87d0ff8582e7))

### :bug: Bug Fixes

- **deps:** pin dependency deepmerge to 4.2.2 ([#1246](https://github.com/scaleway/scaleway-ui/issues/1246)) ([92a9d6c](https://github.com/scaleway/scaleway-ui/commit/92a9d6c1fa8861a4be2b3c9088b570dc4b542dec))

### [0.138.2](https://github.com/scaleway/scaleway-ui/compare/v0.138.1...v0.138.2) (2022-03-03)

### :bug: Bug Fixes

- **deps:** update dependency react-datepicker to v4.7.0 ([#1226](https://github.com/scaleway/scaleway-ui/issues/1226)) ([9aa2d99](https://github.com/scaleway/scaleway-ui/commit/9aa2d99b4d1038bb7f87fc566515fde9c16facab))

### [0.138.1](https://github.com/scaleway/scaleway-ui/compare/v0.138.0...v0.138.1) (2022-03-03)

### :package: Chore

- **devdeps:** update dependency eslint to v8.10.0 ([#1236](https://github.com/scaleway/scaleway-ui/issues/1236)) ([ff77d51](https://github.com/scaleway/scaleway-ui/commit/ff77d51c35ab814b04f2f2417ba9c63f1d21f230))
- **devdeps:** update dependency rollup-plugin-visualizer to v5.6.0 ([#1235](https://github.com/scaleway/scaleway-ui/issues/1235)) ([2f9e6d5](https://github.com/scaleway/scaleway-ui/commit/2f9e6d5bfcc8433378df455df8a76d36759098a3))

### :repeat: CI

- **deploy:** add serverless deploy ([#1229](https://github.com/scaleway/scaleway-ui/issues/1229)) ([bf19ed6](https://github.com/scaleway/scaleway-ui/commit/bf19ed659adfdd6bfc8449a1b70eb14535cad2cc))
- **deploy:** fix build image versiong ([#1238](https://github.com/scaleway/scaleway-ui/issues/1238)) ([72b059e](https://github.com/scaleway/scaleway-ui/commit/72b059e95d16854ec4666a087d961831c697232b))

### :bug: Bug Fixes

- adds custom css for list expandable ([#1237](https://github.com/scaleway/scaleway-ui/issues/1237)) ([3f68ebf](https://github.com/scaleway/scaleway-ui/commit/3f68ebfec681bd34dbda3b57da2eadf667d14325))

## [0.138.0](https://github.com/scaleway/scaleway-ui/compare/v0.137.1...v0.138.0) (2022-03-02)

### :package: Chore

- **devdeps:** update actions/checkout action to v3 ([#1231](https://github.com/scaleway/scaleway-ui/issues/1231)) ([02df66a](https://github.com/scaleway/scaleway-ui/commit/02df66a6633fe6683eeaf486510ab1b2f7016308))
- **devdeps:** update actions/setup-node action to v3 ([#1224](https://github.com/scaleway/scaleway-ui/issues/1224)) ([d34c35f](https://github.com/scaleway/scaleway-ui/commit/d34c35fcc0df530a781767748a40cf42aa228ac1))
- **devdeps:** update bobheadxi/deployments action to v1.1.0 ([#1230](https://github.com/scaleway/scaleway-ui/issues/1230)) ([1df7943](https://github.com/scaleway/scaleway-ui/commit/1df7943b57ad257d299826cd3f88ddb79b30e1ef))
- **devdeps:** update dependency @rollup/plugin-babel to v5.3.1 ([#1223](https://github.com/scaleway/scaleway-ui/issues/1223)) ([8f3f9c0](https://github.com/scaleway/scaleway-ui/commit/8f3f9c0dedc01534fafe9d07f7fc306300e350a1))
- **devdeps:** update dependency postcss to v8.4.7 ([#1225](https://github.com/scaleway/scaleway-ui/issues/1225)) ([c038f23](https://github.com/scaleway/scaleway-ui/commit/c038f23e4c10e8e394bed99ba5cb7f40027947c8))
- **devdeps:** update dependency react-router-dom to v6.2.2 ([#1233](https://github.com/scaleway/scaleway-ui/issues/1233)) ([2eaa05b](https://github.com/scaleway/scaleway-ui/commit/2eaa05bb710bf3d5aef1e8f890e1e0de87799eda))
- **devdeps:** update dependency rollup to v2.68.0 ([#1227](https://github.com/scaleway/scaleway-ui/issues/1227)) ([ee5d6b4](https://github.com/scaleway/scaleway-ui/commit/ee5d6b49a097e176dbaacd9b2e15bd815cb34d85))
- **devdeps:** update docker/login-action action to v1.14.0 ([#1228](https://github.com/scaleway/scaleway-ui/issues/1228)) ([b37bac3](https://github.com/scaleway/scaleway-ui/commit/b37bac3ed247ef25cdc5a90480ffdc4d72d41539))
- **devdeps:** update docker/login-action action to v1.14.1 ([#1232](https://github.com/scaleway/scaleway-ui/issues/1232)) ([7a95427](https://github.com/scaleway/scaleway-ui/commit/7a954271bb816fddd2582cc0d6df64e1ed306eb7))
- **devdeps:** update node.js to v17.6 ([#1222](https://github.com/scaleway/scaleway-ui/issues/1222)) ([b6472ce](https://github.com/scaleway/scaleway-ui/commit/b6472cec4c37bf40fc28e5ebe64fd999df364c19))

### :gear: Features

- add new arrow right bottom icon ([#1234](https://github.com/scaleway/scaleway-ui/issues/1234)) ([32fac67](https://github.com/scaleway/scaleway-ui/commit/32fac671b3b2e41df2e57dcca7434e31df0b8126))

### [0.137.1](https://github.com/scaleway/scaleway-ui/compare/v0.137.0...v0.137.1) (2022-02-23)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.2 ([#1220](https://github.com/scaleway/scaleway-ui/issues/1220)) ([0337346](https://github.com/scaleway/scaleway-ui/commit/03373462dc5325eb43a3e889ec18d91f67283151))

### :bug: Bug Fixes

- missing min-with for auto with in flex context ([#1221](https://github.com/scaleway/scaleway-ui/issues/1221)) ([8b1cbee](https://github.com/scaleway/scaleway-ui/commit/8b1cbee90cfa06b424e47b847c294c3039d83b2e))

## [0.137.0](https://github.com/scaleway/scaleway-ui/compare/v0.136.3...v0.137.0) (2022-02-22)

### :package: Chore

- **devdeps:** update bobheadxi/deployments action to v1 ([#1216](https://github.com/scaleway/scaleway-ui/issues/1216)) ([db1aea2](https://github.com/scaleway/scaleway-ui/commit/db1aea281941505ab5ceb95a4a27eefb9b571bcb))
- **devdeps:** update dependency @babel/core to v7.17.5 ([#1210](https://github.com/scaleway/scaleway-ui/issues/1210)) ([1877005](https://github.com/scaleway/scaleway-ui/commit/1877005f245c3b0504fea9a95ea8b1b43358a768))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.1 ([#1213](https://github.com/scaleway/scaleway-ui/issues/1213)) ([6c16f6d](https://github.com/scaleway/scaleway-ui/commit/6c16f6d5d590c0acfa586d217fd0156d42aa703b))
- **devdeps:** update dependency rollup to v2.67.3 ([#1211](https://github.com/scaleway/scaleway-ui/issues/1211)) ([3101756](https://github.com/scaleway/scaleway-ui/commit/3101756df63c4cacb7abd40a164ef8e5e2909188))
- **devdeps:** update dependency webpack to v5.69.1 ([#1218](https://github.com/scaleway/scaleway-ui/issues/1218)) ([e5cd211](https://github.com/scaleway/scaleway-ui/commit/e5cd21111599e20161cf1ae4908074605fa0cab9))
- **devdeps:** update emotion monorepo ([#1212](https://github.com/scaleway/scaleway-ui/issues/1212)) ([8afa82e](https://github.com/scaleway/scaleway-ui/commit/8afa82eb50644b1dfbbec1b2abcd635a947b4a84))
- **devdeps:** update yarn to v3.2.0 ([#1215](https://github.com/scaleway/scaleway-ui/issues/1215)) ([5041656](https://github.com/scaleway/scaleway-ui/commit/50416565151085c3d1649e86318753d18bb9b578))

### :repeat: CI

- correctly remove image ([#1219](https://github.com/scaleway/scaleway-ui/issues/1219)) ([c176c11](https://github.com/scaleway/scaleway-ui/commit/c176c11834bf8ad62183c16dc1ab1c1ab6a9a28f))

### :gear: Features

- add email outline icon ([#1217](https://github.com/scaleway/scaleway-ui/issues/1217)) ([f9d5898](https://github.com/scaleway/scaleway-ui/commit/f9d58983079767f0874112788550ff7298c59da3))

### [0.136.3](https://github.com/scaleway/scaleway-ui/compare/v0.136.2...v0.136.3) (2022-02-18)

### :repeat: CI

- init visual testing with loki ([#1162](https://github.com/scaleway/scaleway-ui/issues/1162)) ([7cd359b](https://github.com/scaleway/scaleway-ui/commit/7cd359ba3dc65bad77b28dcf712b7295230635f3))

### :package: Chore

- **devdeps:** update commitlint monorepo to v16.2.1 ([#1204](https://github.com/scaleway/scaleway-ui/issues/1204)) ([94644a9](https://github.com/scaleway/scaleway-ui/commit/94644a97d7d10110e49cc567692147e13be828f1))

### :bug: Bug Fixes

- **type:** allow extends of XstyledProps into scaleway form package ([#1209](https://github.com/scaleway/scaleway-ui/issues/1209)) ([e129c1d](https://github.com/scaleway/scaleway-ui/commit/e129c1d4abc954937df661bcb9c3091511521b3d))

### [0.136.2](https://github.com/scaleway/scaleway-ui/compare/v0.136.1...v0.136.2) (2022-02-17)

### :package: Chore

- **devdeps:** update actions/cache action to v2.1.7 ([#1189](https://github.com/scaleway/scaleway-ui/issues/1189)) ([71a44b7](https://github.com/scaleway/scaleway-ui/commit/71a44b72a15f7457bc41c1931bb2430d4c8946e0))
- **devdeps:** update actions/checkout action to v2.4.0 ([#1191](https://github.com/scaleway/scaleway-ui/issues/1191)) ([8d4f92c](https://github.com/scaleway/scaleway-ui/commit/8d4f92c958b48404ff03bd4b4d2d7533f4990d8c))
- **devdeps:** update actions/setup-node action to v2.5.1 ([#1192](https://github.com/scaleway/scaleway-ui/issues/1192)) ([22777e2](https://github.com/scaleway/scaleway-ui/commit/22777e29e010814b8f24d2444121203adb02e114))
- **devdeps:** update arwynfr/actions-docker-context commit hash to bf078c0 ([#1188](https://github.com/scaleway/scaleway-ui/issues/1188)) ([45794b8](https://github.com/scaleway/scaleway-ui/commit/45794b8d4e8d6bc205547e8d6a8242ac0d5f2c50))
- **devdeps:** update bobheadxi/deployments action to v0.6.2 ([#1190](https://github.com/scaleway/scaleway-ui/issues/1190)) ([67e4eb5](https://github.com/scaleway/scaleway-ui/commit/67e4eb596455f7400be6cf268a52ba5ce379fbdc))
- **devdeps:** update dependency @babel/core to v7.17.4 ([#1182](https://github.com/scaleway/scaleway-ui/issues/1182)) ([32b8d5d](https://github.com/scaleway/scaleway-ui/commit/32b8d5d395b9a0b94cb8268615c8192b5326a028))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.4.0 ([#1186](https://github.com/scaleway/scaleway-ui/issues/1186)) ([737de5b](https://github.com/scaleway/scaleway-ui/commit/737de5b2dca77482c044312c797dc59c3f00c76f))
- **devdeps:** update dependency @testing-library/react to v12.1.3 ([#1183](https://github.com/scaleway/scaleway-ui/issues/1183)) ([942aeaf](https://github.com/scaleway/scaleway-ui/commit/942aeaf8bdeaddc0a2d08b6d047935ece1d91611))
- **devdeps:** update dependency eslint to v8.9.0 ([#1184](https://github.com/scaleway/scaleway-ui/issues/1184)) ([0ee1a98](https://github.com/scaleway/scaleway-ui/commit/0ee1a986240c39813b76525120b7f3b3eff1b2eb))
- **devdeps:** update docker/build-push-action action to v2.9.0 ([#1194](https://github.com/scaleway/scaleway-ui/issues/1194)) ([2230868](https://github.com/scaleway/scaleway-ui/commit/2230868bd55017abe2a6a0392785afb1a73787bc))
- **devdeps:** update docker/login-action action to v1.13.0 ([#1195](https://github.com/scaleway/scaleway-ui/issues/1195)) ([498fb38](https://github.com/scaleway/scaleway-ui/commit/498fb384a548f69692e5a3506726f64d0c450882))
- **devdeps:** update node.js to v17 ([#1196](https://github.com/scaleway/scaleway-ui/issues/1196)) ([20d9666](https://github.com/scaleway/scaleway-ui/commit/20d96668a585453df4d57dd00e0ecfa3c486a78e))
- **devdeps:** update rlespinasse/github-slug-action action to v4 ([#1197](https://github.com/scaleway/scaleway-ui/issues/1197)) ([b322f78](https://github.com/scaleway/scaleway-ui/commit/b322f783bb254c5ccac5cddea18874d8e2d32ef3))
- **renovate:** consider dockerfile and github actions as devDeps ([#1193](https://github.com/scaleway/scaleway-ui/issues/1193)) ([109bf03](https://github.com/scaleway/scaleway-ui/commit/109bf03a1d23d6ce655a72b36beb63c00ce582a7))
- **renovate:** upgrade renovate config managers ([#1187](https://github.com/scaleway/scaleway-ui/issues/1187)) ([d628f1c](https://github.com/scaleway/scaleway-ui/commit/d628f1cc26de0d938dfbe2e1e7d7381396e390d7))

### :bug: Bug Fixes

- **types:** add mising fontStyle prop in BoxProps ([#1185](https://github.com/scaleway/scaleway-ui/issues/1185)) ([f0b2740](https://github.com/scaleway/scaleway-ui/commit/f0b27407ee9ec5b756bc655b9d53ec7a9566cc91))

### [0.136.1](https://github.com/scaleway/scaleway-ui/compare/v0.136.0...v0.136.1) (2022-02-16)

### :package: Chore

- **devdeps:** update dependency @scaleway/jest-helpers to v1.1.7 ([#1181](https://github.com/scaleway/scaleway-ui/issues/1181)) ([ec865ce](https://github.com/scaleway/scaleway-ui/commit/ec865ce54a7c10eb93f975c3e7702597ab752deb))

### :bug: Bug Fixes

- **RadioBorderedBox:** enforce label as string and allow labelDescription to be a node ([#1174](https://github.com/scaleway/scaleway-ui/issues/1174)) ([d3e718d](https://github.com/scaleway/scaleway-ui/commit/d3e718df5c41e6615ae3e26a1062958e769f6c91))

## [0.136.0](https://github.com/scaleway/scaleway-ui/compare/v0.135.10...v0.136.0) (2022-02-16)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.8 ([#1178](https://github.com/scaleway/scaleway-ui/issues/1178)) ([0c6fa45](https://github.com/scaleway/scaleway-ui/commit/0c6fa457e00a7c36e1fce5ad77326ce9884547f3))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.10 ([#1176](https://github.com/scaleway/scaleway-ui/issues/1176)) ([c14f5c3](https://github.com/scaleway/scaleway-ui/commit/c14f5c3f66b2a4ed0449e2bfeb707af30265eef0))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.11 ([#1180](https://github.com/scaleway/scaleway-ui/issues/1180)) ([01a4ca6](https://github.com/scaleway/scaleway-ui/commit/01a4ca6c1dc27b4296232d7cd2d35e54e778eaba))
- **devdeps:** update dependency lint-staged to v12.3.4 ([#1175](https://github.com/scaleway/scaleway-ui/issues/1175)) ([6f8879c](https://github.com/scaleway/scaleway-ui/commit/6f8879cb3e22130d6ac7e617bff0674a18fe4270))
- **devdeps:** update dependency rollup to v2.67.2 ([#1177](https://github.com/scaleway/scaleway-ui/issues/1177)) ([b794694](https://github.com/scaleway/scaleway-ui/commit/b79469444f43190d263fb69d356633da5c9efe50))

### :gear: Features

- box-less Avatar ([#1179](https://github.com/scaleway/scaleway-ui/issues/1179)) ([012dead](https://github.com/scaleway/scaleway-ui/commit/012dead9a9ee3a64894e7abbd29dd498d584906d))

### [0.135.10](https://github.com/scaleway/scaleway-ui/compare/v0.135.9...v0.135.10) (2022-02-14)

### :bug: Bug Fixes

- replace unsafe (first|last)-child by (first|last)-of-type ([#1169](https://github.com/scaleway/scaleway-ui/issues/1169)) ([1b03236](https://github.com/scaleway/scaleway-ui/commit/1b0323618fabcbc385f5e49ff8ff855de8057263))

### [0.135.9](https://github.com/scaleway/scaleway-ui/compare/v0.135.8...v0.135.9) (2022-02-14)

### :package: Chore

- **devdeps:** update dependency jest to v27.5.1 ([#1172](https://github.com/scaleway/scaleway-ui/issues/1172)) ([4585c27](https://github.com/scaleway/scaleway-ui/commit/4585c2795275869b7ca1b9657e175146fc8ae521))
- **devdeps:** update dependency read-pkg to v7.1.0 ([#1170](https://github.com/scaleway/scaleway-ui/issues/1170)) ([24b4da3](https://github.com/scaleway/scaleway-ui/commit/24b4da388a1b03f473a6da308da9e7832c4a2982))
- **devdeps:** update storybook monorepo to v6.4.19 ([#1171](https://github.com/scaleway/scaleway-ui/issues/1171)) ([fa4b487](https://github.com/scaleway/scaleway-ui/commit/fa4b487ac47d13097d9f269b9ad788730737b4f0))

### :bug: Bug Fixes

- **stealth-copiable:** fix text overflow ([#1173](https://github.com/scaleway/scaleway-ui/issues/1173)) ([75a3e4a](https://github.com/scaleway/scaleway-ui/commit/75a3e4a747c1d8b462260eed7dff1853459e0c52))

### [0.135.8](https://github.com/scaleway/scaleway-ui/compare/v0.135.7...v0.135.8) (2022-02-11)

### :bug: Bug Fixes

- **switch:** added margin on label when typeof is text ([#1154](https://github.com/scaleway/scaleway-ui/issues/1154)) ([a290dd3](https://github.com/scaleway/scaleway-ui/commit/a290dd3dc5981058fa851d19c609a1b2b843dcfe))

### [0.135.7](https://github.com/scaleway/scaleway-ui/compare/v0.135.6...v0.135.7) (2022-02-10)

### :package: Chore

- **devdeps:** update node.js to v16.14 ([#1167](https://github.com/scaleway/scaleway-ui/issues/1167)) ([843b675](https://github.com/scaleway/scaleway-ui/commit/843b675d1c942028d1f91ee7d1d1bbb3b98f2569))

### :bug: Bug Fixes

- **tags:** add className ([#1168](https://github.com/scaleway/scaleway-ui/issues/1168)) ([9a56636](https://github.com/scaleway/scaleway-ui/commit/9a56636d6642608b2b84d72e1d25e8ce7b336003))

### [0.135.6](https://github.com/scaleway/scaleway-ui/compare/v0.135.5...v0.135.6) (2022-02-09)

### :bug: Bug Fixes

- correct a11y on Alert + correct some errors on unit tests ([#1166](https://github.com/scaleway/scaleway-ui/issues/1166)) ([d574aa3](https://github.com/scaleway/scaleway-ui/commit/d574aa3593a577fe6a76adf9039c9c2a0805aba6))

### [0.135.5](https://github.com/scaleway/scaleway-ui/compare/v0.135.4...v0.135.5) (2022-02-09)

### :memo: Documentation

- correct Sphere stories ([#1161](https://github.com/scaleway/scaleway-ui/issues/1161)) ([006cf3b](https://github.com/scaleway/scaleway-ui/commit/006cf3bc33a368fdb63e16724051a378cc03547b))

### :package: Chore

- **devdeps:** update babel monorepo to v7.17.2 ([#1165](https://github.com/scaleway/scaleway-ui/issues/1165)) ([2263f08](https://github.com/scaleway/scaleway-ui/commit/2263f08efcddaeb8d92c56613c4ba5c3161134e3))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.7 ([#1164](https://github.com/scaleway/scaleway-ui/issues/1164)) ([eb5c4ef](https://github.com/scaleway/scaleway-ui/commit/eb5c4efe4f1f58db052691b685b44cd4df792571))

### :bug: Bug Fixes

- some optimisation on Radio and RadioBorderedBox ([#1163](https://github.com/scaleway/scaleway-ui/issues/1163)) ([0654999](https://github.com/scaleway/scaleway-ui/commit/0654999280f4b181ac067dacabc01b434e3f4e6f))

### [0.135.4](https://github.com/scaleway/scaleway-ui/compare/v0.135.3...v0.135.4) (2022-02-07)

### :bug: Bug Fixes

- **stealth-copiable:** added new prop and fixed line-height ([#1140](https://github.com/scaleway/scaleway-ui/issues/1140)) ([98d470a](https://github.com/scaleway/scaleway-ui/commit/98d470a0be6e2f22f12cd3cdc1c6ab4af6170899))

### [0.135.3](https://github.com/scaleway/scaleway-ui/compare/v0.135.2...v0.135.3) (2022-02-07)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.2.9 ([#1160](https://github.com/scaleway/scaleway-ui/issues/1160)) ([dcabd91](https://github.com/scaleway/scaleway-ui/commit/dcabd91ddc094222a3cd33713f76c8c7fcc4091a))
- **devdeps:** update dependency @size-limit/file to v7.0.8 ([#1156](https://github.com/scaleway/scaleway-ui/issues/1156)) ([b3af4b9](https://github.com/scaleway/scaleway-ui/commit/b3af4b930243870c498a2948061bd8327cbfa728))
- **devdeps:** update dependency @size-limit/preset-big-lib to v7.0.8 ([#1150](https://github.com/scaleway/scaleway-ui/issues/1150)) ([be2fb30](https://github.com/scaleway/scaleway-ui/commit/be2fb304f95c5a9ffd43676a29a0cfb5dcd632ca))
- **devdeps:** update dependency @testing-library/jest-dom to v5.16.2 ([#1155](https://github.com/scaleway/scaleway-ui/issues/1155)) ([eabe90c](https://github.com/scaleway/scaleway-ui/commit/eabe90c9946ff7116c6ce5f4df04020286242dfe))
- **devdeps:** update dependency size-limit to v7.0.8 ([#1157](https://github.com/scaleway/scaleway-ui/issues/1157)) ([153eb19](https://github.com/scaleway/scaleway-ui/commit/153eb1988ba706de4e4ca2ec49a914e43d61734f))
- **devdeps:** update dependency webpack to v5.68.0 ([#1159](https://github.com/scaleway/scaleway-ui/issues/1159)) ([b19c496](https://github.com/scaleway/scaleway-ui/commit/b19c4967a84df9f26f433b472e30c80b50c2d0fd))
- **devdeps:** update storybook monorepo to v6.4.18 ([#1153](https://github.com/scaleway/scaleway-ui/issues/1153)) ([bd9c75f](https://github.com/scaleway/scaleway-ui/commit/bd9c75f2f2a91d2aea59b01a158b579d6a7a293d))

### :bug: Bug Fixes

- **Sphere:** refactor props + remove spread ([#1158](https://github.com/scaleway/scaleway-ui/issues/1158)) ([6a58e30](https://github.com/scaleway/scaleway-ui/commit/6a58e3012ed0391bac61fa2a60cc9e4dde7594fc))

### [0.135.2](https://github.com/scaleway/scaleway-ui/compare/v0.135.1...v0.135.2) (2022-02-03)

### :package: Chore

- **devdeps:** update babel monorepo to v7.17.0 ([#1151](https://github.com/scaleway/scaleway-ui/issues/1151)) ([0ad6201](https://github.com/scaleway/scaleway-ui/commit/0ad6201516e06a21d69f7ed43b5942be0f79b827))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.6 ([#1147](https://github.com/scaleway/scaleway-ui/issues/1147)) ([e429b21](https://github.com/scaleway/scaleway-ui/commit/e429b217042e308046b8b434b0042e79413cf2ea))
- **devdeps:** update dependency eslint to v8.8.0 ([#1152](https://github.com/scaleway/scaleway-ui/issues/1152)) ([f054d91](https://github.com/scaleway/scaleway-ui/commit/f054d91042915a95b25daa143d5cecbe9296ee58))
- **devdeps:** update dependency lint-staged to v12.3.3 ([#1149](https://github.com/scaleway/scaleway-ui/issues/1149)) ([934ed81](https://github.com/scaleway/scaleway-ui/commit/934ed812255603586032de8efd201c3c3bf82248))
- **devdeps:** update dependency postcss to v8.4.6 ([#1148](https://github.com/scaleway/scaleway-ui/issues/1148)) ([6a99177](https://github.com/scaleway/scaleway-ui/commit/6a99177fccd382c6136ca6acac2bd7e91f575d54))

### :bug: Bug Fixes

- **typescript:** correct loads of type errors ([#1146](https://github.com/scaleway/scaleway-ui/issues/1146)) ([4fa2b2b](https://github.com/scaleway/scaleway-ui/commit/4fa2b2ba830c0b3675828551bff49899c9a28558))

### [0.135.1](https://github.com/scaleway/scaleway-ui/compare/v0.135.0...v0.135.1) (2022-02-02)

### :bug: Bug Fixes

- aligns radio component with checkbox one ([#1144](https://github.com/scaleway/scaleway-ui/issues/1144)) ([b7f7d5c](https://github.com/scaleway/scaleway-ui/commit/b7f7d5c848ec1007b5860a7c7a80499e698220ea))

## [0.135.0](https://github.com/scaleway/scaleway-ui/compare/v0.134.10...v0.135.0) (2022-02-01)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.2.8 ([#1138](https://github.com/scaleway/scaleway-ui/issues/1138)) ([8d17eec](https://github.com/scaleway/scaleway-ui/commit/8d17eec55f189f26f0daf782dbd39c67ce630a92))
- **devdeps:** update dependency @svgr/rollup to v6.2.1 ([#1143](https://github.com/scaleway/scaleway-ui/issues/1143)) ([551167f](https://github.com/scaleway/scaleway-ui/commit/551167f021324284845c220288a87fdfbecc2dc4))
- **devdeps:** update dependency lint-staged to v12.3.2 ([#1145](https://github.com/scaleway/scaleway-ui/issues/1145)) ([4b36553](https://github.com/scaleway/scaleway-ui/commit/4b365531fb5364d75638dda9f2b4a023b0f15aef))
- **devdeps:** update dependency rollup to v2.66.1 ([#1142](https://github.com/scaleway/scaleway-ui/issues/1142)) ([0c355f7](https://github.com/scaleway/scaleway-ui/commit/0c355f794b126d80802fbb8b038f4cd00f1af8a6))
- **devdeps:** update dependency webpack to v5.67.0 ([#1139](https://github.com/scaleway/scaleway-ui/issues/1139)) ([9799580](https://github.com/scaleway/scaleway-ui/commit/979958051555f3a7c58dd4cb5d1d082e362efbee))
- **devdeps:** update storybook monorepo to v6.4.17 ([#1141](https://github.com/scaleway/scaleway-ui/issues/1141)) ([dd2c39a](https://github.com/scaleway/scaleway-ui/commit/dd2c39a438221c4c2eb643b43bf2ae6e629467c0))

### :gear: Features

- rework Placeholder to remove most Box ([#1117](https://github.com/scaleway/scaleway-ui/issues/1117)) ([f9b4e2c](https://github.com/scaleway/scaleway-ui/commit/f9b4e2c1759fedc5b4f86cf481c708c01b4b000e))

### [0.134.10](https://github.com/scaleway/scaleway-ui/compare/v0.134.9...v0.134.10) (2022-01-25)

### :bug: Bug Fixes

- **deps:** update nivo monorepo ([#1109](https://github.com/scaleway/scaleway-ui/issues/1109)) ([a2fdb69](https://github.com/scaleway/scaleway-ui/commit/a2fdb69eab0c4ede6fba0c87ac32e9cddac37f2e))

### :package: Chore

- **devdeps:** update dependency @commitlint/cli to v16.1.0 ([#1137](https://github.com/scaleway/scaleway-ui/issues/1137)) ([1faf649](https://github.com/scaleway/scaleway-ui/commit/1faf64970f4cf7064846221d75df574ffb1bbd4f))

### [0.134.9](https://github.com/scaleway/scaleway-ui/compare/v0.134.8...v0.134.9) (2022-01-24)

### :zap: Refactor

- remove some extraneous Box ([#1118](https://github.com/scaleway/scaleway-ui/issues/1118)) ([1997326](https://github.com/scaleway/scaleway-ui/commit/19973262c5d4e816f128ef2261932d0436704e0f))

### :package: Chore

- **devdeps:** update babel monorepo ([#1132](https://github.com/scaleway/scaleway-ui/issues/1132)) ([4f51c80](https://github.com/scaleway/scaleway-ui/commit/4f51c8049384ea4f11d09b3ecb18794b1ea50546))
- **devdeps:** update dependency @babel/core to v7.16.12 ([#1136](https://github.com/scaleway/scaleway-ui/issues/1136)) ([5e8e436](https://github.com/scaleway/scaleway-ui/commit/5e8e4361c1d03a6ff36e907001b9610a0c30e383))
- **devdeps:** update dependency eslint to v8.7.0 ([#1131](https://github.com/scaleway/scaleway-ui/issues/1131)) ([128331e](https://github.com/scaleway/scaleway-ui/commit/128331e9dfbc17f3c963f3e727a9d87dfd794c72))
- **devdeps:** update dependency typescript to v4.5.5 ([#1133](https://github.com/scaleway/scaleway-ui/issues/1133)) ([701a8d5](https://github.com/scaleway/scaleway-ui/commit/701a8d5e35f42a566f307bc52c76807827375397))
- **devdeps:** update storybook monorepo to v6.4.14 ([#1134](https://github.com/scaleway/scaleway-ui/issues/1134)) ([9dfff1a](https://github.com/scaleway/scaleway-ui/commit/9dfff1a7be75af0139979d09eab2c8fa2af5ff8c))

### :bug: Bug Fixes

- **deps:** update dependency polished to v4.1.4 ([#1135](https://github.com/scaleway/scaleway-ui/issues/1135)) ([29f5e0f](https://github.com/scaleway/scaleway-ui/commit/29f5e0f12ad45614b0ade0caa911d0b9e0f9e143))

### [0.134.8](https://github.com/scaleway/scaleway-ui/compare/v0.134.7...v0.134.8) (2022-01-20)

### :memo: Documentation

- contribution.md and updated readme ([#1120](https://github.com/scaleway/scaleway-ui/issues/1120)) ([d306296](https://github.com/scaleway/scaleway-ui/commit/d3062965f874ffdb7d2c5ad981d43334133e956e))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.4 ([#1124](https://github.com/scaleway/scaleway-ui/issues/1124)) ([2e77d78](https://github.com/scaleway/scaleway-ui/commit/2e77d78a0a096ce478986b0f9ee62b631b97c044))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.6 ([#1125](https://github.com/scaleway/scaleway-ui/issues/1125)) ([eec8b16](https://github.com/scaleway/scaleway-ui/commit/eec8b161874cf8e8d53c4f4fa79d2b9a56afb509))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.7 ([#1128](https://github.com/scaleway/scaleway-ui/issues/1128)) ([f38c596](https://github.com/scaleway/scaleway-ui/commit/f38c596676911e8f4a2934bb6064ceeee93c115c))
- **devdeps:** update dependency rollup to v2.64.0 ([#1127](https://github.com/scaleway/scaleway-ui/issues/1127)) ([ff187b9](https://github.com/scaleway/scaleway-ui/commit/ff187b9b16ad3a7c046d0a6842ce417730a62e71))
- **devdeps:** update semantic-release monorepo ([#1123](https://github.com/scaleway/scaleway-ui/issues/1123)) ([232440c](https://github.com/scaleway/scaleway-ui/commit/232440c3c0b6c256ec19afabd0963ed271fbe24e))
- migrate storybook config to ts ([#1111](https://github.com/scaleway/scaleway-ui/issues/1111)) ([abfcfe6](https://github.com/scaleway/scaleway-ui/commit/abfcfe63bc16996277a905301398bb133d1aad69))

### [0.134.7](https://github.com/scaleway/scaleway-ui/compare/v0.134.6...v0.134.7) (2022-01-19)

### :package: Chore

- **devdeps:** update dependency @svgr/rollup to v6.2.0 ([#1114](https://github.com/scaleway/scaleway-ui/issues/1114)) ([af42e7b](https://github.com/scaleway/scaleway-ui/commit/af42e7bef84beca0f764e022e0ef9adae42619f3))
- **devdeps:** update dependency rollup-plugin-visualizer to v5.5.4 ([#1116](https://github.com/scaleway/scaleway-ui/issues/1116)) ([9b50fb9](https://github.com/scaleway/scaleway-ui/commit/9b50fb99a8d3c88e041afb011aff201aee7e1ac7))
- **devdeps:** update dependency webpack to v5.66.0 ([#1119](https://github.com/scaleway/scaleway-ui/issues/1119)) ([f74e951](https://github.com/scaleway/scaleway-ui/commit/f74e9517f39fa940800e607a18edb30250cfdaca))
- **devdeps:** update storybook monorepo to v6.4.13 ([#1115](https://github.com/scaleway/scaleway-ui/issues/1115)) ([62dd60a](https://github.com/scaleway/scaleway-ui/commit/62dd60a6cce47fddb34c0eaa38b915272ca8501b))

### :bug: Bug Fixes

- **deps:** update dependency react-countup to v6.1.1 ([#1121](https://github.com/scaleway/scaleway-ui/issues/1121)) ([3776ca9](https://github.com/scaleway/scaleway-ui/commit/3776ca9ff0d2403e61eb680843558fbe4851c767))

### [0.134.6](https://github.com/scaleway/scaleway-ui/compare/v0.134.5...v0.134.6) (2022-01-14)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.3 ([#1106](https://github.com/scaleway/scaleway-ui/issues/1106)) ([d6fe220](https://github.com/scaleway/scaleway-ui/commit/d6fe220c9b3efb3cb40bf84267426ecbd93ba123))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.5 ([#1107](https://github.com/scaleway/scaleway-ui/issues/1107)) ([2ac9a4a](https://github.com/scaleway/scaleway-ui/commit/2ac9a4ac217a19287da2a6b9da4d5172af43484b))
- **devdeps:** update dependency @storybook/testing-react to v1.2.3 ([#1110](https://github.com/scaleway/scaleway-ui/issues/1110)) ([65c1079](https://github.com/scaleway/scaleway-ui/commit/65c107985aa888d8a8c0f86c1fe03bd6e75c65a7))
- **devdeps:** update storybook monorepo to v6.4.12 ([#1108](https://github.com/scaleway/scaleway-ui/issues/1108)) ([a19ecce](https://github.com/scaleway/scaleway-ui/commit/a19ecceab12948767d14b682a09364a7d9c6c8b4))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.2.2 ([#1112](https://github.com/scaleway/scaleway-ui/issues/1112)) ([6705b64](https://github.com/scaleway/scaleway-ui/commit/6705b64fd126b72480a3301550881c2d8b9fa6b4))

### [0.134.5](https://github.com/scaleway/scaleway-ui/compare/v0.134.4...v0.134.5) (2022-01-12)

### :package: Chore

- **devdeps:** update babel monorepo to v7.16.8 ([#1105](https://github.com/scaleway/scaleway-ui/issues/1105)) ([6e48d4b](https://github.com/scaleway/scaleway-ui/commit/6e48d4b08394766c65250eb56e9a9a008766a800))

### :bug: Bug Fixes

- **theme:** ensure createTheme return a Theme type ([#1104](https://github.com/scaleway/scaleway-ui/issues/1104)) ([8269b90](https://github.com/scaleway/scaleway-ui/commit/8269b909ed35e97ac8a1d207e4446aa10517e04f))

### [0.134.4](https://github.com/scaleway/scaleway-ui/compare/v0.134.3...v0.134.4) (2022-01-11)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.2.4 ([#1102](https://github.com/scaleway/scaleway-ui/issues/1102)) ([f4d2972](https://github.com/scaleway/scaleway-ui/commit/f4d297251219ed84ade8b2593127f54d2a0070bf))
- **devdeps:** update dependency shx to v0.3.4 ([#1103](https://github.com/scaleway/scaleway-ui/issues/1103)) ([1269404](https://github.com/scaleway/scaleway-ui/commit/1269404da651f65bb35a6646513af640590dfcab))

### :bug: Bug Fixes

- correct some typescript types ([#1091](https://github.com/scaleway/scaleway-ui/issues/1091)) ([4d26601](https://github.com/scaleway/scaleway-ui/commit/4d266013c59ca88899535e64eb9214372670fbcf))

### [0.134.3](https://github.com/scaleway/scaleway-ui/compare/v0.134.2...v0.134.3) (2022-01-10)

### :package: Chore

- **devdeps:** update dependency @commitlint/cli to v16.0.2 ([#1096](https://github.com/scaleway/scaleway-ui/issues/1096)) ([5b57f39](https://github.com/scaleway/scaleway-ui/commit/5b57f39596f8c0132df1dc0121fe2fe7a9f02f99))
- **devdeps:** update dependency @rollup/plugin-node-resolve to v13.1.3 ([#1088](https://github.com/scaleway/scaleway-ui/issues/1088)) ([e73fe8d](https://github.com/scaleway/scaleway-ui/commit/e73fe8db4849b6546ca03915496396088892b72a))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.2 ([#1089](https://github.com/scaleway/scaleway-ui/issues/1089)) ([62d93c7](https://github.com/scaleway/scaleway-ui/commit/62d93c7092093bbaca511d5400e11ffb78283078))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.2 ([#1090](https://github.com/scaleway/scaleway-ui/issues/1090)) ([944620d](https://github.com/scaleway/scaleway-ui/commit/944620d06a0f0fd77a0438a06f2d7d08814464bd))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.3 ([#1092](https://github.com/scaleway/scaleway-ui/issues/1092)) ([d8d7820](https://github.com/scaleway/scaleway-ui/commit/d8d78209431595077c6d542e7ccb8245f1413cf4))
- **devdeps:** update dependency eslint to v8.6.0 ([#1086](https://github.com/scaleway/scaleway-ui/issues/1086)) ([7e95f37](https://github.com/scaleway/scaleway-ui/commit/7e95f37e3f90ca7c856904bdbfe0731313b8ca9c))
- **devdeps:** update dependency jest to v27.4.7 ([#1087](https://github.com/scaleway/scaleway-ui/issues/1087)) ([6375571](https://github.com/scaleway/scaleway-ui/commit/63755714763bdd70ae0198aeafa07a0f21c95481))
- **devdeps:** update dependency lint-staged to v12.1.7 ([#1094](https://github.com/scaleway/scaleway-ui/issues/1094)) ([0cdc938](https://github.com/scaleway/scaleway-ui/commit/0cdc9386f6059cff96942c4812b67bed562ec136))
- **devdeps:** update dependency rollup to v2.63.0 ([#1095](https://github.com/scaleway/scaleway-ui/issues/1095)) ([fb3af4b](https://github.com/scaleway/scaleway-ui/commit/fb3af4b3bf0cd47e3e84e81c45e7b9a0ca497fb3))
- **devdeps:** upgrade storybook ([#1097](https://github.com/scaleway/scaleway-ui/issues/1097)) ([d85c5a6](https://github.com/scaleway/scaleway-ui/commit/d85c5a6fb82f5f18f9cf6917dd55fca1f6198ca2))

### :bug: Bug Fixes

- correct generic List types ([#1084](https://github.com/scaleway/scaleway-ui/issues/1084)) ([75d7e76](https://github.com/scaleway/scaleway-ui/commit/75d7e76bb2e109e36e7428a2750ecb1b30270c27))
- correct loads of ts errors ([#1085](https://github.com/scaleway/scaleway-ui/issues/1085)) ([1d3d731](https://github.com/scaleway/scaleway-ui/commit/1d3d731fc7c7f72e667fa4d449fafea08448761f))
- **deps:** update dependency react-datepicker to v4.6.0 ([#1093](https://github.com/scaleway/scaleway-ui/issues/1093)) ([a6717d8](https://github.com/scaleway/scaleway-ui/commit/a6717d8c6ecd0089f761b4beb22a6894cc228a7d))

### [0.134.2](https://github.com/scaleway/scaleway-ui/compare/v0.134.1...v0.134.2) (2022-01-05)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.2.1 ([#1082](https://github.com/scaleway/scaleway-ui/issues/1082)) ([f1b784b](https://github.com/scaleway/scaleway-ui/commit/f1b784b32128450be9f020d7be86502d58181376))

### :bug: Bug Fixes

- **deps:** update dependency prop-types to v15.8.1 ([#1083](https://github.com/scaleway/scaleway-ui/issues/1083)) ([e1f1bf6](https://github.com/scaleway/scaleway-ui/commit/e1f1bf6cabeb36e289e83e87e5215bb5feffce59))

### [0.134.1](https://github.com/scaleway/scaleway-ui/compare/v0.134.0...v0.134.1) (2022-01-04)

### :package: Chore

- **devdeps:** update dependency @rollup/plugin-node-resolve to v13.1.2 ([#1077](https://github.com/scaleway/scaleway-ui/issues/1077)) ([a01534b](https://github.com/scaleway/scaleway-ui/commit/a01534b5f3249d4e360ceb52ee39147fa8283e4c))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.1 ([#1079](https://github.com/scaleway/scaleway-ui/issues/1079)) ([b85632b](https://github.com/scaleway/scaleway-ui/commit/b85632bc08003445aa980eb9beee9560baccd212))
- **devdeps:** update dependency @scaleway/use-i18n to v3.2.0 ([#1080](https://github.com/scaleway/scaleway-ui/issues/1080)) ([d66507c](https://github.com/scaleway/scaleway-ui/commit/d66507c17ef853ead4cfc6731cf58440a8c2cbcf))
- **devdeps:** update dependency date-fns to v2.28.0 ([#1078](https://github.com/scaleway/scaleway-ui/issues/1078)) ([2b4cbea](https://github.com/scaleway/scaleway-ui/commit/2b4cbea48595eff94f357f5a13338826e6de7c96))
- **devdeps:** update dependency lint-staged to v12.1.5 ([#1081](https://github.com/scaleway/scaleway-ui/issues/1081)) ([64c97c0](https://github.com/scaleway/scaleway-ui/commit/64c97c0869c8d0292830d0a850179d9e6bb0e1ce))

### :zap: Refactor

- update theme colors of Reminder, RichSelect & Slider ([#1073](https://github.com/scaleway/scaleway-ui/issues/1073)) ([e021136](https://github.com/scaleway/scaleway-ui/commit/e0211367effd68d25e92460a9a4c20caef3abeb6))

### :bug: Bug Fixes

- **deps:** update nivo monorepo to v0.78.0 ([#1076](https://github.com/scaleway/scaleway-ui/issues/1076)) ([36afb8b](https://github.com/scaleway/scaleway-ui/commit/36afb8b4783bd53b4efaf27571adbac63288a866))

## [0.134.0](https://github.com/scaleway/scaleway-ui/compare/v0.133.4...v0.134.0) (2021-12-31)

### :package: Chore

- **devdeps:** update babel monorepo to v7.16.7 ([#1075](https://github.com/scaleway/scaleway-ui/issues/1075)) ([c3f0e4e](https://github.com/scaleway/scaleway-ui/commit/c3f0e4efd09debc36a28908778a241b06f655941))

### :gear: Features

- new colors in switch button ([#1038](https://github.com/scaleway/scaleway-ui/issues/1038)) ([46626c7](https://github.com/scaleway/scaleway-ui/commit/46626c7a2e99d93098b31619c23ca55efd08cb47))

### [0.133.4](https://github.com/scaleway/scaleway-ui/compare/v0.133.3...v0.133.4) (2021-12-30)

### :bug: Bug Fixes

- fixes issue with tooltip border ([#1065](https://github.com/scaleway/scaleway-ui/issues/1065)) ([1229e98](https://github.com/scaleway/scaleway-ui/commit/1229e98131c05f6fdba3b1eab01c4954054d19cd))

### [0.133.3](https://github.com/scaleway/scaleway-ui/compare/v0.133.2...v0.133.3) (2021-12-30)

### :bug: Bug Fixes

- **deps:** update dependency @types/react-datepicker to v4.3.4 ([#1074](https://github.com/scaleway/scaleway-ui/issues/1074)) ([177f6db](https://github.com/scaleway/scaleway-ui/commit/177f6db4e0a5942fc25f2c7ff5a9883d68ee02cb))
- **deps:** update nivo monorepo to v0.76.0 ([#1072](https://github.com/scaleway/scaleway-ui/issues/1072)) ([9157aba](https://github.com/scaleway/scaleway-ui/commit/9157aba5af28adcff2f9fdefe6e3460fe438d9f7))

### [0.133.2](https://github.com/scaleway/scaleway-ui/compare/v0.133.1...v0.133.2) (2021-12-29)

### :zap: Refactor

- **a11y:** volumeSize ([#1036](https://github.com/scaleway/scaleway-ui/issues/1036)) ([815e67f](https://github.com/scaleway/scaleway-ui/commit/815e67ff5f36e78e83b62466843b8166986214ab))

### :package: Chore

- **devdeps:** update dependency @commitlint/cli to v16.0.1 ([#1068](https://github.com/scaleway/scaleway-ui/issues/1068)) ([20a327e](https://github.com/scaleway/scaleway-ui/commit/20a327eff0cf695a3461b046d6c405ea33cf1563))
- **devdeps:** update dependency rollup to v2.62.0 ([#1069](https://github.com/scaleway/scaleway-ui/issues/1069)) ([d40b345](https://github.com/scaleway/scaleway-ui/commit/d40b345c975de8fa2c04e540ac940eca3ef9ea89))
- **devdeps:** update dependency rollup-plugin-dts to v4.1.0 ([#1070](https://github.com/scaleway/scaleway-ui/issues/1070)) ([fa7e985](https://github.com/scaleway/scaleway-ui/commit/fa7e9856de4c6dbc0d2cf91517548bc8ed9290bd))

### :bug: Bug Fixes

- alert width to allow dismiss button ([#1071](https://github.com/scaleway/scaleway-ui/issues/1071)) ([fd8d65a](https://github.com/scaleway/scaleway-ui/commit/fd8d65a96b577f08acccb4c59e3c7e55e2e652a0))
- remove Boxer ([#1067](https://github.com/scaleway/scaleway-ui/issues/1067)) ([2940c5a](https://github.com/scaleway/scaleway-ui/commit/2940c5ac5b392d22167bd8d55275315bfc240012))

### [0.133.1](https://github.com/scaleway/scaleway-ui/compare/v0.133.0...v0.133.1) (2021-12-28)

### :zap: Refactor

- remove xstyled shorthand props in stories ([#1064](https://github.com/scaleway/scaleway-ui/issues/1064)) ([d0a4213](https://github.com/scaleway/scaleway-ui/commit/d0a42131939fa1f91dbc3a69d4d13550425ab7ac))

### :bug: Bug Fixes

- **deps:** update dependency prop-types to v15.8.0 ([#1048](https://github.com/scaleway/scaleway-ui/issues/1048)) ([7b0ed29](https://github.com/scaleway/scaleway-ui/commit/7b0ed29da99eb88f22049f16e8dfec997c1d5bf0))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.3.0 ([#1066](https://github.com/scaleway/scaleway-ui/issues/1066)) ([b15ec5f](https://github.com/scaleway/scaleway-ui/commit/b15ec5f0ab25ee82c53c59136e7d5766184e0767))

## [0.133.0](https://github.com/scaleway/scaleway-ui/compare/v0.132.0...v0.133.0) (2021-12-28)

### :package: Chore

- **devdeps:** update commitlint monorepo to v16 ([#1057](https://github.com/scaleway/scaleway-ui/issues/1057)) ([1228ef5](https://github.com/scaleway/scaleway-ui/commit/1228ef546fbf1f588b69884ff1f59274e580faf5))
- **renovate:** change reviewers config ([#1063](https://github.com/scaleway/scaleway-ui/issues/1063)) ([65946bc](https://github.com/scaleway/scaleway-ui/commit/65946bc06e10c873ca1c8b013453c91ae0a8e7fd))

### :memo: Documentation

- **theme:** updated theme and colors documentation ([#1043](https://github.com/scaleway/scaleway-ui/issues/1043)) ([ddf97c6](https://github.com/scaleway/scaleway-ui/commit/ddf97c659d9abce49be91bf95d2fdf355226079d))

### :zap: Refactor

- **a11y:** stepper and a11y tests fix ([#1032](https://github.com/scaleway/scaleway-ui/issues/1032)) ([31016cf](https://github.com/scaleway/scaleway-ui/commit/31016cffe52be5a7b4f0d3785a344610d1e95fe4))

### :gear: Features

- migrate tabgroup and table to new ds ([#1052](https://github.com/scaleway/scaleway-ui/issues/1052)) ([eb20274](https://github.com/scaleway/scaleway-ui/commit/eb20274e585f2b58aa1a4279875e82c8eabfd5bf))

## [0.132.0](https://github.com/scaleway/scaleway-ui/compare/v0.131.6...v0.132.0) (2021-12-27)

### :zap: Refactor

- remove Box(er)? usage in stories ([#1046](https://github.com/scaleway/scaleway-ui/issues/1046)) ([7c6c112](https://github.com/scaleway/scaleway-ui/commit/7c6c11294da9d16058b9c963d50ade8a8e43767e))

### :gear: Features

- reintroduce BorderedBox ([#1044](https://github.com/scaleway/scaleway-ui/issues/1044)) ([a39a901](https://github.com/scaleway/scaleway-ui/commit/a39a9013167bb6f000f4afb41b7ebbacd7ef7f37))

### [0.131.6](https://github.com/scaleway/scaleway-ui/compare/v0.131.5...v0.131.6) (2021-12-27)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.2.1 ([#1053](https://github.com/scaleway/scaleway-ui/issues/1053)) ([d0e4d0e](https://github.com/scaleway/scaleway-ui/commit/d0e4d0e686badeb5c3310bf85714b4e244411833))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.27 ([#1054](https://github.com/scaleway/scaleway-ui/issues/1054)) ([70eab6c](https://github.com/scaleway/scaleway-ui/commit/70eab6c3e847fa7ca1df442e36e68432573f2de0))
- **devdeps:** update dependency @size-limit/file to v7.0.5 ([#1058](https://github.com/scaleway/scaleway-ui/issues/1058)) ([90a5db7](https://github.com/scaleway/scaleway-ui/commit/90a5db71b60b243edce7a6b9385dee742dac12d5))
- **devdeps:** update dependency @size-limit/preset-big-lib to v7.0.5 ([#1059](https://github.com/scaleway/scaleway-ui/issues/1059)) ([b394d0a](https://github.com/scaleway/scaleway-ui/commit/b394d0ac7ab3e3df1128326c5af2f49e6df39b6c))
- **devdeps:** update dependency lint-staged to v12.1.4 ([#1056](https://github.com/scaleway/scaleway-ui/issues/1056)) ([2b8b16d](https://github.com/scaleway/scaleway-ui/commit/2b8b16d6c58412316e23de9163b66560d2109ae4))
- **devdeps:** update dependency size-limit to v7.0.5 ([#1060](https://github.com/scaleway/scaleway-ui/issues/1060)) ([ff7dbfb](https://github.com/scaleway/scaleway-ui/commit/ff7dbfbac6e74858fa65c127b3e4eca01a876275))

### :bug: Bug Fixes

- switch input ([#1055](https://github.com/scaleway/scaleway-ui/issues/1055)) ([830d343](https://github.com/scaleway/scaleway-ui/commit/830d343a483fae2efe021039944da25bf5260ca2))

### [0.131.5](https://github.com/scaleway/scaleway-ui/compare/v0.131.4...v0.131.5) (2021-12-24)

### :bug: Bug Fixes

- **deps:** update dependency @types/react-datepicker to v4.3.3 ([#1051](https://github.com/scaleway/scaleway-ui/issues/1051)) ([30642ab](https://github.com/scaleway/scaleway-ui/commit/30642ab4f50082214eb14b48cabe3af55ac4b921))

### [0.131.4](https://github.com/scaleway/scaleway-ui/compare/v0.131.3...v0.131.4) (2021-12-23)

### :bug: Bug Fixes

- **Switch:** increase hidden input surface to allow click contact ([#1050](https://github.com/scaleway/scaleway-ui/issues/1050)) ([8606728](https://github.com/scaleway/scaleway-ui/commit/8606728e5be7b09a5ee5c66ecf54d5c9dabef739))

### [0.131.3](https://github.com/scaleway/scaleway-ui/compare/v0.131.2...v0.131.3) (2021-12-23)

### :bug: Bug Fixes

- a11y for markdown but mostly due to reminder ([#1037](https://github.com/scaleway/scaleway-ui/issues/1037)) ([42df038](https://github.com/scaleway/scaleway-ui/commit/42df0389198f883214abe62e5c7dad83cf4c6c26))

### [0.131.2](https://github.com/scaleway/scaleway-ui/compare/v0.131.1...v0.131.2) (2021-12-23)

### :package: Chore

- **devdeps:** update dependency eslint to v8.5.0 ([#1047](https://github.com/scaleway/scaleway-ui/issues/1047)) ([a16f8e2](https://github.com/scaleway/scaleway-ui/commit/a16f8e261515c5a913026d4b08019e65d4abe1ba))
- **devdeps:** update dependency react-router-dom to v6.2.1 ([#1045](https://github.com/scaleway/scaleway-ui/issues/1045)) ([40678a2](https://github.com/scaleway/scaleway-ui/commit/40678a2c52044c4537e6e44bb2a90f93f51fa2e4))

### :bug: Bug Fixes

- **tags:** onChange prop type definition ([#1049](https://github.com/scaleway/scaleway-ui/issues/1049)) ([43fe7ed](https://github.com/scaleway/scaleway-ui/commit/43fe7edefcfa97f9955f7d21b1e18ada200e805a))

### :zap: Refactor

- **ActivityIndicator:** port circular-progressbar ([#1022](https://github.com/scaleway/scaleway-ui/issues/1022)) ([e599606](https://github.com/scaleway/scaleway-ui/commit/e599606e891e03a247eb6d3ad43aeb13cb1fadcc))
- **avatar:** add a11y ([#948](https://github.com/scaleway/scaleway-ui/issues/948)) ([8f8d034](https://github.com/scaleway/scaleway-ui/commit/8f8d034e86cbe4c22bcba4393a53045d825b35c1))
- **extended-reminder:** add a11y ([#1040](https://github.com/scaleway/scaleway-ui/issues/1040)) ([0e04820](https://github.com/scaleway/scaleway-ui/commit/0e048202d58439f0675fd11afe3d4e6c44d2a16a))

### [0.131.1](https://github.com/scaleway/scaleway-ui/compare/v0.131.0...v0.131.1) (2021-12-22)

### :zap: Refactor

- **theme:** migrate colors for Toaster, Tooltip, TooltipIcon, UnitInput ([#1027](https://github.com/scaleway/scaleway-ui/issues/1027)) ([7d6b719](https://github.com/scaleway/scaleway-ui/commit/7d6b719f1603f1035104caa12621c58af48d6fc9))

### :bug: Bug Fixes

- update failing snapshots ([#1042](https://github.com/scaleway/scaleway-ui/issues/1042)) ([412d91d](https://github.com/scaleway/scaleway-ui/commit/412d91dd3853d449c490feb656ecde4d5a2c4f1a))

## [0.131.0](https://github.com/scaleway/scaleway-ui/compare/v0.130.4...v0.131.0) (2021-12-22)

### :zap: Refactor

- **tags:** add a11y ([#1033](https://github.com/scaleway/scaleway-ui/issues/1033)) ([be98715](https://github.com/scaleway/scaleway-ui/commit/be98715f03793e52bf754952e77a599e5c8c5376))

### :gear: Features

- provide modern normalize function ([#1041](https://github.com/scaleway/scaleway-ui/issues/1041)) ([e6c7c95](https://github.com/scaleway/scaleway-ui/commit/e6c7c9530784f9b0fc7c010ec86b892de607b793))

### [0.130.4](https://github.com/scaleway/scaleway-ui/compare/v0.130.3...v0.130.4) (2021-12-21)

### :bug: Bug Fixes

- **typescript:** add missing flexDirection to XStyledProps ([#1016](https://github.com/scaleway/scaleway-ui/issues/1016)) ([6703a93](https://github.com/scaleway/scaleway-ui/commit/6703a930f8d7d18ce9b5b1ad47986bb1cfe5fb3e))

### [0.130.3](https://github.com/scaleway/scaleway-ui/compare/v0.130.2...v0.130.3) (2021-12-21)

### :bug: Bug Fixes

- box sizing property ([#1039](https://github.com/scaleway/scaleway-ui/issues/1039)) ([78f6652](https://github.com/scaleway/scaleway-ui/commit/78f66523ec88bf1e0a9920db7e87e5819872cb31))

### [0.130.2](https://github.com/scaleway/scaleway-ui/compare/v0.130.1...v0.130.2) (2021-12-21)

### :bug: Bug Fixes

- a11y for tooltipicon ([#1030](https://github.com/scaleway/scaleway-ui/issues/1030)) ([20bc2a1](https://github.com/scaleway/scaleway-ui/commit/20bc2a10f6ba163313b5c709f0c0ae96d7387be9))

### [0.130.1](https://github.com/scaleway/scaleway-ui/compare/v0.130.0...v0.130.1) (2021-12-21)

### :zap: Refactor

- **theme:** new colors for Tag, Tags, TagsPoplist and TextBox ([#1023](https://github.com/scaleway/scaleway-ui/issues/1023)) ([ced40fc](https://github.com/scaleway/scaleway-ui/commit/ced40fc6fa2818a888ab96a690f6c0dad675e931))

### :bug: Bug Fixes

- a11y for placeholder ([#1031](https://github.com/scaleway/scaleway-ui/issues/1031)) ([a5b46a7](https://github.com/scaleway/scaleway-ui/commit/a5b46a79e950618793a82d3f7665e2d74cbb3763))

## [0.130.0](https://github.com/scaleway/scaleway-ui/compare/v0.129.0...v0.130.0) (2021-12-21)

### :gear: Features

- **toaster:** add a11y ([#1028](https://github.com/scaleway/scaleway-ui/issues/1028)) ([703e226](https://github.com/scaleway/scaleway-ui/commit/703e2267a4af748bd047cbfe48636ad3d43e10e4))

## [0.129.0](https://github.com/scaleway/scaleway-ui/compare/v0.128.6...v0.129.0) (2021-12-21)

### :zap: Refactor

- **theme:** migration colors of Typography, VerificationCode, VolumeSize ([#1008](https://github.com/scaleway/scaleway-ui/issues/1008)) ([8d8d562](https://github.com/scaleway/scaleway-ui/commit/8d8d562e2b87d9f20506ffd1f6e49378bb454203))

### :gear: Features

- migrate switch to new colors ([#1017](https://github.com/scaleway/scaleway-ui/issues/1017)) ([9ce9164](https://github.com/scaleway/scaleway-ui/commit/9ce9164e41d4e5c63ece869ad4292726839b5c26))

### [0.128.6](https://github.com/scaleway/scaleway-ui/compare/v0.128.5...v0.128.6) (2021-12-20)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.2.0 ([#1026](https://github.com/scaleway/scaleway-ui/issues/1026)) ([1ae12b5](https://github.com/scaleway/scaleway-ui/commit/1ae12b51d8bc67b2f31cfb287d8e345ea3757447))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.26 ([#1025](https://github.com/scaleway/scaleway-ui/issues/1025)) ([5271593](https://github.com/scaleway/scaleway-ui/commit/527159346bb54e65c26674b833f20a70da786c29))

### :bug: Bug Fixes

- a11y for stealthcopiable ([#1029](https://github.com/scaleway/scaleway-ui/issues/1029)) ([b320000](https://github.com/scaleway/scaleway-ui/commit/b320000eb83ca4ebf03da2ab123e44b2728b2cbc))

### [0.128.5](https://github.com/scaleway/scaleway-ui/compare/v0.128.4...v0.128.5) (2021-12-20)

### :zap: Refactor

- colors for sphere statusindicator stealthcopiable stepper ([#1012](https://github.com/scaleway/scaleway-ui/issues/1012)) ([a117e0c](https://github.com/scaleway/scaleway-ui/commit/a117e0ce2f804010a99979813ddefb049fffc764))

### :bug: Bug Fixes

- list expandable color ([#1024](https://github.com/scaleway/scaleway-ui/issues/1024)) ([880f1f1](https://github.com/scaleway/scaleway-ui/commit/880f1f11ae869627fdd269313a193af79854cd57))

### [0.128.4](https://github.com/scaleway/scaleway-ui/compare/v0.128.3...v0.128.4) (2021-12-20)

### :package: Chore

- **devdeps:** update dependency @rollup/plugin-node-resolve to v13.1.1 ([#1020](https://github.com/scaleway/scaleway-ui/issues/1020)) ([400fe12](https://github.com/scaleway/scaleway-ui/commit/400fe12b2079b9593a284b9dfb845957bf84d831))
- **devdeps:** update dependency lint-staged to v12.1.3 ([#1021](https://github.com/scaleway/scaleway-ui/issues/1021)) ([b395b3a](https://github.com/scaleway/scaleway-ui/commit/b395b3a3af53573bd4b44e1bc18a2b30fa3de643))
- **devdeps:** update dependency react-router-dom to v6.1.1 ([#1018](https://github.com/scaleway/scaleway-ui/issues/1018)) ([3ab6dbd](https://github.com/scaleway/scaleway-ui/commit/3ab6dbd09c5f4418d04b7d391b09dfc48344ba39))
- **devdeps:** update emotion monorepo to v11.7.1 ([#994](https://github.com/scaleway/scaleway-ui/issues/994)) ([a738e27](https://github.com/scaleway/scaleway-ui/commit/a738e27e303fae9de6fddfe062607ea5dcdb3a4a))

### :bug: Bug Fixes

- **deps:** update nivo monorepo to v0.75.0 ([#1019](https://github.com/scaleway/scaleway-ui/issues/1019)) ([c8b1094](https://github.com/scaleway/scaleway-ui/commit/c8b1094e725db18463bc84709b1086122e8806f3))

### [0.128.3](https://github.com/scaleway/scaleway-ui/compare/v0.128.2...v0.128.3) (2021-12-16)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.1.2 ([#1014](https://github.com/scaleway/scaleway-ui/issues/1014)) ([011844a](https://github.com/scaleway/scaleway-ui/commit/011844a306c7a176e442cd89c773c3ee9ad0d6ca))
- **devdeps:** update dependency rollup to v2.61.1 ([#1013](https://github.com/scaleway/scaleway-ui/issues/1013)) ([fa1bbaf](https://github.com/scaleway/scaleway-ui/commit/fa1bbaf7090520adab699609f35114606e43818f))

### :zap: Refactor

- colors on list menu modal navigationstepper components ([#1005](https://github.com/scaleway/scaleway-ui/issues/1005)) ([6db8403](https://github.com/scaleway/scaleway-ui/commit/6db84031fc83ce7ac1df6824b6f99b84a32c98ef))

### :bug: Bug Fixes

- button color ([#1011](https://github.com/scaleway/scaleway-ui/issues/1011)) ([e3dee3d](https://github.com/scaleway/scaleway-ui/commit/e3dee3da65663ef109050d8e35dc2dd96d3b5510))

### [0.128.2](https://github.com/scaleway/scaleway-ui/compare/v0.128.1...v0.128.2) (2021-12-15)

### :bug: Bug Fixes

- **deps:** update nivo monorepo to v0.74.1 ([#995](https://github.com/scaleway/scaleway-ui/issues/995)) ([64096ed](https://github.com/scaleway/scaleway-ui/commit/64096ed1255481533151b10a30ea90b3dbf121ac))

### [0.128.1](https://github.com/scaleway/scaleway-ui/compare/v0.128.0...v0.128.1) (2021-12-15)

### :package: Chore

- **devdeps:** update dependency jest to v27.4.5 ([#1009](https://github.com/scaleway/scaleway-ui/issues/1009)) ([6224516](https://github.com/scaleway/scaleway-ui/commit/6224516291ba48fb9e77f41124f55e7ecc6fa216))
- **devdeps:** update dependency typescript to v4.5.4 ([#1010](https://github.com/scaleway/scaleway-ui/issues/1010)) ([60b496a](https://github.com/scaleway/scaleway-ui/commit/60b496ab2fa8244dd5f1592bd5a4fe44ff07a93e))

### :bug: Bug Fixes

- **theme:** colors ([#1007](https://github.com/scaleway/scaleway-ui/issues/1007)) ([1d9c71c](https://github.com/scaleway/scaleway-ui/commit/1d9c71cb35a0885c018e72e222af12147ef37dc4))

## [0.128.0](https://github.com/scaleway/scaleway-ui/compare/v0.127.5...v0.128.0) (2021-12-14)

### :zap: Refactor

- less stories boilerplate ([#976](https://github.com/scaleway/scaleway-ui/issues/976)) ([fd46a57](https://github.com/scaleway/scaleway-ui/commit/fd46a571fca2745c0196d7c01d17b1d0c1a49349))
- **theme:** colors migration Button, Breadcrumbs, BulletList… ([#982](https://github.com/scaleway/scaleway-ui/issues/982)) ([35684ed](https://github.com/scaleway/scaleway-ui/commit/35684ed025bfb3d4df6322c02b83a968aa287240))
- **theme:** revert border colors ([#1006](https://github.com/scaleway/scaleway-ui/issues/1006)) ([2875121](https://github.com/scaleway/scaleway-ui/commit/2875121e33f2c1360844c34114977782b29ebab8))
- use new colors in Notice, PasswordStrengthMeter, Pentagon, PhoneInput, PieChart ([#1003](https://github.com/scaleway/scaleway-ui/issues/1003)) ([c9d2ee8](https://github.com/scaleway/scaleway-ui/commit/c9d2ee88a3f4b4b411d9c5fadc92caba5e48700b))

### :gear: Features

- migrate badge, barchart, barstack to new colors ([#979](https://github.com/scaleway/scaleway-ui/issues/979)) ([a6956a3](https://github.com/scaleway/scaleway-ui/commit/a6956a3107d9337b3e7a7f36b81f8291ac6af480))

### [0.127.5](https://github.com/scaleway/scaleway-ui/compare/v0.127.4...v0.127.5) (2021-12-14)

### :package: Chore

- **devdeps:** update babel monorepo to v7.16.5 ([#1001](https://github.com/scaleway/scaleway-ui/issues/1001)) ([4870d5c](https://github.com/scaleway/scaleway-ui/commit/4870d5c0e5a0c886236748cff9fb33ae68d01f47))
- **devdeps:** update dependency postcss to v8.4.5 ([#1002](https://github.com/scaleway/scaleway-ui/issues/1002)) ([d2f78ff](https://github.com/scaleway/scaleway-ui/commit/d2f78ff49ad0a9d3f61f604ee886d75a33159326))

### :bug: Bug Fixes

- **theme:** border colors ([#1004](https://github.com/scaleway/scaleway-ui/issues/1004)) ([9367fe5](https://github.com/scaleway/scaleway-ui/commit/9367fe5becbe8b6942277fba027be273427e90ec))

### :zap: Refactor

- migrate ActionBar, ActivityIndicator, Alert, Avatar deprecated color with new system ([#977](https://github.com/scaleway/scaleway-ui/issues/977)) ([068655c](https://github.com/scaleway/scaleway-ui/commit/068655c50103cef6ae179f04dd3981d46027933c))
- migrate Container, CreationProgress, DateInput, Description to new color system ([#996](https://github.com/scaleway/scaleway-ui/issues/996)) ([820afea](https://github.com/scaleway/scaleway-ui/commit/820afeacd9bd9e67d9d9236bd0fff6c24d7308ae))
- **theme:** migrate colors of Placeholder, Radio, RadioBorderedBox, Range ([#1000](https://github.com/scaleway/scaleway-ui/issues/1000)) ([5c82464](https://github.com/scaleway/scaleway-ui/commit/5c8246472e342249683af6e590a82687a3264d64))
- **theme:** migrated colors of DotSteps ExtReminder Label… ([#987](https://github.com/scaleway/scaleway-ui/issues/987)) ([22b166f](https://github.com/scaleway/scaleway-ui/commit/22b166f9b1941612688ebb26bdf5be1c09cd734f))

### [0.127.4](https://github.com/scaleway/scaleway-ui/compare/v0.127.3...v0.127.4) (2021-12-13)

### :bug: Bug Fixes

- **theme:** colors update ([#998](https://github.com/scaleway/scaleway-ui/issues/998)) ([6554b70](https://github.com/scaleway/scaleway-ui/commit/6554b7014bc55e102d7d85a6abf0311da5dbe3a1))

### :package: Chore

- **devdeps:** update dependency @storybook/testing-react to v1.2.2 ([#993](https://github.com/scaleway/scaleway-ui/issues/993)) ([548273c](https://github.com/scaleway/scaleway-ui/commit/548273cbb0b82ad659bd2706b066fb336e4d6659))
- **devdeps:** update dependency @svgr/rollup to v6.1.2 ([#999](https://github.com/scaleway/scaleway-ui/issues/999)) ([6740082](https://github.com/scaleway/scaleway-ui/commit/6740082cc8852977b68c5d336ed473b656366525))

### [0.127.3](https://github.com/scaleway/scaleway-ui/compare/v0.127.2...v0.127.3) (2021-12-13)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.1.1 ([#986](https://github.com/scaleway/scaleway-ui/issues/986)) ([18b36d2](https://github.com/scaleway/scaleway-ui/commit/18b36d29fc108679d30b99d7ceda60c4f960c4f5))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.25 ([#985](https://github.com/scaleway/scaleway-ui/issues/985)) ([416fc48](https://github.com/scaleway/scaleway-ui/commit/416fc48707a6d1e4f821b543ad2984f74069ebca))
- **devdeps:** update dependency @testing-library/jest-dom to v5.16.1 ([#990](https://github.com/scaleway/scaleway-ui/issues/990)) ([f593519](https://github.com/scaleway/scaleway-ui/commit/f593519dcd232395769af3f51c0c0da1eae77585))
- **devdeps:** update dependency eslint to v8.4.1 ([#992](https://github.com/scaleway/scaleway-ui/issues/992)) ([b3bbac9](https://github.com/scaleway/scaleway-ui/commit/b3bbac92c40d8e5065212049f5b2c5bef3ec4f1a))
- **devdeps:** update dependency jest to v27.4.4 ([#989](https://github.com/scaleway/scaleway-ui/issues/989)) ([6badbc9](https://github.com/scaleway/scaleway-ui/commit/6badbc96c64d7d14711a45b9ccf21eae1c4cb297))
- **devdeps:** update dependency typescript to v4.5.3 ([#988](https://github.com/scaleway/scaleway-ui/issues/988)) ([918ce7f](https://github.com/scaleway/scaleway-ui/commit/918ce7f9331946adddad3b98e008dc0302cb2ca3))
- **devdeps:** update dependency webpack to v5.65.0 ([#991](https://github.com/scaleway/scaleway-ui/issues/991)) ([7bce421](https://github.com/scaleway/scaleway-ui/commit/7bce4214ab0d4df9241cb235748fd87de4a71ad7))
- **devdeps:** update storybook monorepo to v6.4.9 ([#983](https://github.com/scaleway/scaleway-ui/issues/983)) ([b5aff75](https://github.com/scaleway/scaleway-ui/commit/b5aff750d47df4b71454e2933620e5688ae299b9))

### :bug: Bug Fixes

- **theme:** updated neutral background color ([#997](https://github.com/scaleway/scaleway-ui/issues/997)) ([4551a45](https://github.com/scaleway/scaleway-ui/commit/4551a45beaa3e6f7940e9ab640c1764e6f485770))

### [0.127.2](https://github.com/scaleway/scaleway-ui/compare/v0.127.1...v0.127.2) (2021-12-09)

### :bug: Bug Fixes

- update neutral colors once again ([#981](https://github.com/scaleway/scaleway-ui/issues/981)) ([9eb4caa](https://github.com/scaleway/scaleway-ui/commit/9eb4caa9578d588231864592dc682472ae60b799))

### [0.127.1](https://github.com/scaleway/scaleway-ui/compare/v0.127.0...v0.127.1) (2021-12-09)

### :bug: Bug Fixes

- **theme:** fix neutral weak border color ([#978](https://github.com/scaleway/scaleway-ui/issues/978)) ([0c59fb7](https://github.com/scaleway/scaleway-ui/commit/0c59fb7e0fcbb6fe9f860597d08ad6baceba9324))

## [0.127.0](https://github.com/scaleway/scaleway-ui/compare/v0.126.4...v0.127.0) (2021-12-08)

### :gear: Features

- **theme:** creating new theme colors ([#959](https://github.com/scaleway/scaleway-ui/issues/959)) ([8ef3c72](https://github.com/scaleway/scaleway-ui/commit/8ef3c72b9cdf3c309f4ad7d5ed76dd22c9cb2f95))

### [0.126.4](https://github.com/scaleway/scaleway-ui/compare/v0.126.3...v0.126.4) (2021-12-08)

### :zap: Refactor

- favor ComponentProps instead of exporting types ([#961](https://github.com/scaleway/scaleway-ui/issues/961)) ([59f10f8](https://github.com/scaleway/scaleway-ui/commit/59f10f85949af61e82dcc7c304bb425fe3a87568))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v3.0.1 ([#970](https://github.com/scaleway/scaleway-ui/issues/970)) ([160850b](https://github.com/scaleway/scaleway-ui/commit/160850bd08d2d352c71728be0cfde16fa2dc6b33))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.24 ([#975](https://github.com/scaleway/scaleway-ui/issues/975)) ([e4bed5b](https://github.com/scaleway/scaleway-ui/commit/e4bed5be7b367eecf98f76fae383b1299775191d))
- **devdeps:** update dependency size-limit to v7.0.4 ([#973](https://github.com/scaleway/scaleway-ui/issues/973)) ([0769bab](https://github.com/scaleway/scaleway-ui/commit/0769bab4af6d4bb9eac87a678c2fbff062711431))
- **devdeps:** update storybook monorepo to v6.4.8 ([#974](https://github.com/scaleway/scaleway-ui/issues/974)) ([ce89539](https://github.com/scaleway/scaleway-ui/commit/ce8953937c616e4c7f01aa8eaf10037424a8ee9e))

### :bug: Bug Fixes

- **deps:** update dependency react-datepicker to v4.5.0 ([#943](https://github.com/scaleway/scaleway-ui/issues/943)) ([08a34f4](https://github.com/scaleway/scaleway-ui/commit/08a34f41d30d24ba27b4eb52e559b4ebc1ec7f14))

### [0.126.3](https://github.com/scaleway/scaleway-ui/compare/v0.126.2...v0.126.3) (2021-12-06)

### :zap: Refactor

- **theme:** renamed colors into deprecatedColors ([#960](https://github.com/scaleway/scaleway-ui/issues/960)) ([b881213](https://github.com/scaleway/scaleway-ui/commit/b8812137944c4741def8d68d5b124d2b5aea7897))

### :package: Chore

- **devdeps:** update dependency @storybook/testing-react to v1 ([#931](https://github.com/scaleway/scaleway-ui/issues/931)) ([2f50f28](https://github.com/scaleway/scaleway-ui/commit/2f50f282d8eb21feec45f8fdcc92a9e7720b16ee))
- **devdeps:** update dependency @svgr/rollup to v6 ([#944](https://github.com/scaleway/scaleway-ui/issues/944)) ([495c6f0](https://github.com/scaleway/scaleway-ui/commit/495c6f0ceecc0676193c70ce4fdd21395cafc5b9))
- **devdeps:** update dependency date-fns to v2.27.0 ([#967](https://github.com/scaleway/scaleway-ui/issues/967)) ([fd32df3](https://github.com/scaleway/scaleway-ui/commit/fd32df3c91823abeb2009722a46fe86020eaad95))
- **devdeps:** update dependency jest to v27.4.3 ([#969](https://github.com/scaleway/scaleway-ui/issues/969)) ([7dc5dc7](https://github.com/scaleway/scaleway-ui/commit/7dc5dc7669b5c226f688e91fb32cafe1c081ffce))
- **devdeps:** update dependency postcss to v8.4.4 ([#964](https://github.com/scaleway/scaleway-ui/issues/964)) ([0a9ebb4](https://github.com/scaleway/scaleway-ui/commit/0a9ebb4ef79d1c5d26e210edf868b48121a08f9e))
- **devdeps:** update dependency prettier to v2.5.1 ([#968](https://github.com/scaleway/scaleway-ui/issues/968)) ([fc30b77](https://github.com/scaleway/scaleway-ui/commit/fc30b7704ebaf6f73c0df842f43a9a171f33cc9b))
- **devdeps:** update storybook monorepo to v6.4.5 ([#965](https://github.com/scaleway/scaleway-ui/issues/965)) ([8692741](https://github.com/scaleway/scaleway-ui/commit/8692741e33f4e79f3dfeec0b73a27290f1e332f7))
- **devdeps:** update storybook monorepo to v6.4.7 ([#966](https://github.com/scaleway/scaleway-ui/issues/966)) ([bc0f17f](https://github.com/scaleway/scaleway-ui/commit/bc0f17fbfa0530ed9ffb6bb7f50b3aa0fc0bdb84))

### :bug: Bug Fixes

- **Touchable:** correct invalid css class ([#963](https://github.com/scaleway/scaleway-ui/issues/963)) ([faac4c4](https://github.com/scaleway/scaleway-ui/commit/faac4c427020e66b49d2e9082e2e2c587ca57736))

### [0.126.2](https://github.com/scaleway/scaleway-ui/compare/v0.126.1...v0.126.2) (2021-12-02)

### :bug: Bug Fixes

- **Typography:** avoid passing down color to xstyled ([#962](https://github.com/scaleway/scaleway-ui/issues/962)) ([641c7a1](https://github.com/scaleway/scaleway-ui/commit/641c7a1555fd3ae808b28e5ba73e274ad1568255))

### [0.126.1](https://github.com/scaleway/scaleway-ui/compare/v0.126.0...v0.126.1) (2021-12-02)

### :bug: Bug Fixes

- a11y for counter ([#957](https://github.com/scaleway/scaleway-ui/issues/957)) ([68cfaf2](https://github.com/scaleway/scaleway-ui/commit/68cfaf2bdd71fe827e94c470c3f4977b6623090c))

## [0.126.0](https://github.com/scaleway/scaleway-ui/compare/v0.125.3...v0.126.0) (2021-12-02)

### :gear: Features

- remove some of unnecessary boxes ([#919](https://github.com/scaleway/scaleway-ui/issues/919)) ([eb03f4d](https://github.com/scaleway/scaleway-ui/commit/eb03f4d5706693bd4e0da2d58de64e68fe897da6))

### [0.125.3](https://github.com/scaleway/scaleway-ui/compare/v0.125.2...v0.125.3) (2021-12-02)

### :bug: Bug Fixes

- a11y badge tests ([#951](https://github.com/scaleway/scaleway-ui/issues/951)) ([4bdabac](https://github.com/scaleway/scaleway-ui/commit/4bdabacd01187ca87981d08aaf841a10d21da02f))

### [0.125.2](https://github.com/scaleway/scaleway-ui/compare/v0.125.1...v0.125.2) (2021-12-01)

### :bug: Bug Fixes

- **icon:** serverles, ai icon ([#955](https://github.com/scaleway/scaleway-ui/issues/955)) ([ead19f8](https://github.com/scaleway/scaleway-ui/commit/ead19f88e72a3f18ada98f62d9c95c7dee30a549))

### [0.125.1](https://github.com/scaleway/scaleway-ui/compare/v0.125.0...v0.125.1) (2021-12-01)

### :bug: Bug Fixes

- **switch-button:** add missing BoxProps ([#956](https://github.com/scaleway/scaleway-ui/issues/956)) ([7c0dea9](https://github.com/scaleway/scaleway-ui/commit/7c0dea9dedf1cbe2b4cba8d0224ab674b7a80de9))

## [0.125.0](https://github.com/scaleway/scaleway-ui/compare/v0.124.2...v0.125.0) (2021-12-01)

### :package: Chore

- **devdeps:** update dependency rollup to v2.60.2 ([#953](https://github.com/scaleway/scaleway-ui/issues/953)) ([220b764](https://github.com/scaleway/scaleway-ui/commit/220b7644dc5685d6e44255bf9b76b0f9fb4b8d5f))
- **devdeps:** update storybook monorepo to v6.4.1 ([#942](https://github.com/scaleway/scaleway-ui/issues/942)) ([0a21e8c](https://github.com/scaleway/scaleway-ui/commit/0a21e8cdbce5d80eff867fe823a73822312dee59))

### :gear: Features

- **icon:** add serverless icon ([#954](https://github.com/scaleway/scaleway-ui/issues/954)) ([98c730e](https://github.com/scaleway/scaleway-ui/commit/98c730eef3969c391d8862e2b018959e3983c5c7))

### [0.124.2](https://github.com/scaleway/scaleway-ui/compare/v0.124.1...v0.124.2) (2021-12-01)

### :package: Chore

- **devdeps:** update dependency webpack to v5.64.4 ([#952](https://github.com/scaleway/scaleway-ui/issues/952)) ([c99a855](https://github.com/scaleway/scaleway-ui/commit/c99a855c77536bcb5dde4bb456618ed4bf5fe9ce))

### :bug: Bug Fixes

- move storybook to devdeps + correct test scripts ([#947](https://github.com/scaleway/scaleway-ui/issues/947)) ([3901488](https://github.com/scaleway/scaleway-ui/commit/390148823292425d88e0897df1353ae53c08885c))

### [0.124.1](https://github.com/scaleway/scaleway-ui/compare/v0.124.0...v0.124.1) (2021-11-30)

### :bug: Bug Fixes

- **deps:** update dependency intl-tel-input to v17.0.15 ([#946](https://github.com/scaleway/scaleway-ui/issues/946)) ([e0fe5ef](https://github.com/scaleway/scaleway-ui/commit/e0fe5ef577cfe84597ac8440b4a061c4a08ce815))

## [0.124.0](https://github.com/scaleway/scaleway-ui/compare/v0.123.2...v0.124.0) (2021-11-30)

### :package: Chore

- **devdeps:** update dependency prettier to v2.5.0 ([#950](https://github.com/scaleway/scaleway-ui/issues/950)) ([020b776](https://github.com/scaleway/scaleway-ui/commit/020b7768bd8e1fb221c8d91ec30fead0720fd7be))
- **devdeps:** update emotion monorepo to v11.7.0 ([#939](https://github.com/scaleway/scaleway-ui/issues/939)) ([2e020dc](https://github.com/scaleway/scaleway-ui/commit/2e020dc87b118db340c97eb961f1a7c62f3139b8))

### :gear: Features

- add tooltip and background ([#949](https://github.com/scaleway/scaleway-ui/issues/949)) ([5c9abea](https://github.com/scaleway/scaleway-ui/commit/5c9abea250d71e0f17edc411727e262367d79c8a))

### [0.123.2](https://github.com/scaleway/scaleway-ui/compare/v0.123.1...v0.123.2) (2021-11-29)

### :zap: Refactor

- **a11y:** activity-indicator ([#924](https://github.com/scaleway/scaleway-ui/issues/924)) ([ea4b6b6](https://github.com/scaleway/scaleway-ui/commit/ea4b6b6688eacdbe06ca08c548b18b64198a20aa))
- **a11y:** alert ([#923](https://github.com/scaleway/scaleway-ui/issues/923)) ([5588ca5](https://github.com/scaleway/scaleway-ui/commit/5588ca53a350c72fecd5a41b27d6fbbb68db47e1))

### :bug: Bug Fixes

- **deps:** update dependency intl-tel-input to v17.0.14 ([#945](https://github.com/scaleway/scaleway-ui/issues/945)) ([edcb8fe](https://github.com/scaleway/scaleway-ui/commit/edcb8fe5b501f8cfc1c15cd1fb7d4e8ed82da903))

### [0.123.1](https://github.com/scaleway/scaleway-ui/compare/v0.123.0...v0.123.1) (2021-11-26)

### :repeat: CI

- use main branch instead of master ([#934](https://github.com/scaleway/scaleway-ui/issues/934)) ([3e4b75e](https://github.com/scaleway/scaleway-ui/commit/3e4b75e87a4136bfcb68015a143c99cb60c17828))

### :package: Chore

- **deps:** update yarn to v3.1.1 ([#941](https://github.com/scaleway/scaleway-ui/issues/941)) ([7b9f8c7](https://github.com/scaleway/scaleway-ui/commit/7b9f8c72e3c42fc312f8dd67cab5135c9dc3c8c4))
- **devdeps:** update dependency @scaleway/eslint-config-react to v3 ([#933](https://github.com/scaleway/scaleway-ui/issues/933)) ([409dd9b](https://github.com/scaleway/scaleway-ui/commit/409dd9b935780a2951878b6f6afc0bbeef3a6642))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.23 ([#929](https://github.com/scaleway/scaleway-ui/issues/929)) ([5d76aea](https://github.com/scaleway/scaleway-ui/commit/5d76aea0d47c48df17e0b20aea9c771091420f0d))
- **devdeps:** update dependency @testing-library/jest-dom to v5.15.1 ([#937](https://github.com/scaleway/scaleway-ui/issues/937)) ([8f41be6](https://github.com/scaleway/scaleway-ui/commit/8f41be6e0dd9d39c33a528780a372c70ec50425b))
- **devdeps:** update dependency date-fns to v2.26.0 ([#936](https://github.com/scaleway/scaleway-ui/issues/936)) ([6845a55](https://github.com/scaleway/scaleway-ui/commit/6845a55a451ee0d2bb0e626f59ab9a31792f54b2))
- **devdeps:** update dependency rollup to v2.60.1 ([#932](https://github.com/scaleway/scaleway-ui/issues/932)) ([f66f1d1](https://github.com/scaleway/scaleway-ui/commit/f66f1d16bcc31c110de76d5cd97708315f2aa2b2))
- **devdeps:** update dependency rollup-plugin-postcss to v4.0.2 ([#935](https://github.com/scaleway/scaleway-ui/issues/935)) ([f75a5de](https://github.com/scaleway/scaleway-ui/commit/f75a5de81916dbd4a00b9c29606767e0a569537e))
- **devdeps:** update dependency typescript to v4.5.2 ([#930](https://github.com/scaleway/scaleway-ui/issues/930)) ([59e174f](https://github.com/scaleway/scaleway-ui/commit/59e174f7c9fb6af7afa4eeeade79d11219a008ce))
- **devdeps:** update semantic-release monorepo ([#938](https://github.com/scaleway/scaleway-ui/issues/938)) ([597491a](https://github.com/scaleway/scaleway-ui/commit/597491a6af83818a8d79704178ddf7c68809b274))

## [0.123.0](https://github.com/scaleway/scaleway-ui/compare/v0.122.1...v0.123.0) (2021-11-22)

### :package: Chore

- **devdeps:** update dependency lint-staged to v12.1.2 ([#925](https://github.com/scaleway/scaleway-ui/issues/925)) ([bc6c8b7](https://github.com/scaleway/scaleway-ui/commit/bc6c8b747749b8a524ab3eaeecc71496b2f9a8d9))
- **devdeps:** update dependency size-limit to v7.0.3 ([#928](https://github.com/scaleway/scaleway-ui/issues/928)) ([224edb4](https://github.com/scaleway/scaleway-ui/commit/224edb4338d059d8d73c437e1256fccd68478062))

### :gear: Features

- migrate to tsx stories some components ([#899](https://github.com/scaleway/scaleway-ui/issues/899)) ([94073f5](https://github.com/scaleway/scaleway-ui/commit/94073f536a717d47d38133c8a34df6d55ede7342))

### [0.122.1](https://github.com/scaleway/scaleway-ui/compare/v0.122.0...v0.122.1) (2021-11-19)

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/random-name to v3 ([#921](https://github.com/scaleway/scaleway-ui/issues/921)) ([a3ddb02](https://github.com/scaleway/scaleway-ui/commit/a3ddb0268bdfcd72a319864bb7c49f716b81e9f5))

## [0.122.0](https://github.com/scaleway/scaleway-ui/compare/v0.121.1...v0.122.0) (2021-11-19)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.1.22 ([#920](https://github.com/scaleway/scaleway-ui/issues/920)) ([e910152](https://github.com/scaleway/scaleway-ui/commit/e910152e917f188958b7a614920d6d7f842d1128))

### :gear: Features

- **rich-select:** description and inline description ([#908](https://github.com/scaleway/scaleway-ui/issues/908)) ([302fc51](https://github.com/scaleway/scaleway-ui/commit/302fc51684e744d8cceed78ebbc63c6defef2fe5))

### [0.121.1](https://github.com/scaleway/scaleway-ui/compare/v0.121.0...v0.121.1) (2021-11-19)

### :package: Chore

- **devdeps:** update commitlint monorepo to v15 ([#912](https://github.com/scaleway/scaleway-ui/issues/912)) ([f433dc0](https://github.com/scaleway/scaleway-ui/commit/f433dc005065c1aafd3dc8bc4f799fb349b47641))
- **devdeps:** update dependency size-limit to v7 ([#917](https://github.com/scaleway/scaleway-ui/issues/917)) ([33e5947](https://github.com/scaleway/scaleway-ui/commit/33e5947063234bd105a007b7a7f4be8a3fd33712))
- **devdeps:** update emotion monorepo to v11.6.0 ([#903](https://github.com/scaleway/scaleway-ui/issues/903)) ([ad24473](https://github.com/scaleway/scaleway-ui/commit/ad244737044a372252091cb6beb7ab79746fa54c))
- **storybook:** migration mdx to tsx ([#895](https://github.com/scaleway/scaleway-ui/issues/895)) ([#900](https://github.com/scaleway/scaleway-ui/issues/900)) ([1ffae1f](https://github.com/scaleway/scaleway-ui/commit/1ffae1fad739e3378aede8b6053bb6121a1a2fdc))

### :bug: Bug Fixes

- **deps:** update dependency reakit to v1.3.11 ([#922](https://github.com/scaleway/scaleway-ui/issues/922)) ([4d4fdc7](https://github.com/scaleway/scaleway-ui/commit/4d4fdc7dcccc1cafdd5c520d542ecfe782dabf42))

### :zap: Refactor

- migrate TagsPoplist, TextBox, TimeInput, Toaster stories to tsx ([#896](https://github.com/scaleway/scaleway-ui/issues/896)) ([84c23fc](https://github.com/scaleway/scaleway-ui/commit/84c23fc395c796e3bf59b83bfa45a83027ce5de9))
- migrate unitinput universallink verificationcode and volumesize and delete unselectable ([#897](https://github.com/scaleway/scaleway-ui/issues/897)) ([35885ae](https://github.com/scaleway/scaleway-ui/commit/35885ae58d3eb233f266d979d853081a27ebefb5))

## [0.121.0](https://github.com/scaleway/scaleway-ui/compare/v0.120.2...v0.121.0) (2021-11-18)

### :gear: Features

- migrate stories of Tooltip, TooltipIcon, Touchable, Typography ([#904](https://github.com/scaleway/scaleway-ui/issues/904)) ([b1e641b](https://github.com/scaleway/scaleway-ui/commit/b1e641b15a3d4b979ec7b22f470f59854d6c7f35))

### :package: Chore

- **devdeps:** update babel monorepo to v7.16.4 ([#914](https://github.com/scaleway/scaleway-ui/issues/914)) ([a5fc830](https://github.com/scaleway/scaleway-ui/commit/a5fc830bce8fd56f2c1c08edc28d6948f4d79732))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.21 ([#909](https://github.com/scaleway/scaleway-ui/issues/909)) ([e09d51b](https://github.com/scaleway/scaleway-ui/commit/e09d51b1814c6cc11193d3f2f8139a389fa1316a))

### :bug: Bug Fixes

- add some missing props on XStyled type ([#913](https://github.com/scaleway/scaleway-ui/issues/913)) ([0d0eff6](https://github.com/scaleway/scaleway-ui/commit/0d0eff6571c5bcc9ce925011174d6461eeabcdfe))

### [0.120.2](https://github.com/scaleway/scaleway-ui/compare/v0.120.1...v0.120.2) (2021-11-17)

### :package: Chore

- **devdeps:** update dependency lint-staged to v12 ([#902](https://github.com/scaleway/scaleway-ui/issues/902)) ([b3b353d](https://github.com/scaleway/scaleway-ui/commit/b3b353d2dc4141874e3e3256d46a0f8f8243694e))
- **devdeps:** update dependency rollup to v2.60.0 ([#911](https://github.com/scaleway/scaleway-ui/issues/911)) ([8f35c6e](https://github.com/scaleway/scaleway-ui/commit/8f35c6e69f2375af0b91936e5df7ce7fb6b7e4a8))

### :bug: Bug Fixes

- **tooltip-icon:** fixed vertical align ([#894](https://github.com/scaleway/scaleway-ui/issues/894)) ([f0cdabb](https://github.com/scaleway/scaleway-ui/commit/f0cdabb2e7d919b03694e930d4df78ca8b60f978))

### [0.120.1](https://github.com/scaleway/scaleway-ui/compare/v0.120.0...v0.120.1) (2021-11-16)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.1.20 ([#906](https://github.com/scaleway/scaleway-ui/issues/906)) ([85ab1eb](https://github.com/scaleway/scaleway-ui/commit/85ab1eb43eccef0a05acc842691f598ebd19fe69))

### :bug: Bug Fixes

- **deps:** update dependency @types/react-datepicker to v4.3.1 ([#907](https://github.com/scaleway/scaleway-ui/issues/907)) ([dc19d52](https://github.com/scaleway/scaleway-ui/commit/dc19d528f666bdb42fae3a0c974950763ea2e9af))

## [0.120.0](https://github.com/scaleway/scaleway-ui/compare/v0.119.2...v0.120.0) (2021-11-15)

### :gear: Features

- add expand icon ([#905](https://github.com/scaleway/scaleway-ui/issues/905)) ([777a2ae](https://github.com/scaleway/scaleway-ui/commit/777a2ae0f27b59bf4a6736c602ade4f009fbd50e))

### [0.119.2](https://github.com/scaleway/scaleway-ui/compare/v0.119.1...v0.119.2) (2021-11-15)

### :package: Chore

- **ci:** upgrade node version ci ([#895](https://github.com/scaleway/scaleway-ui/issues/895)) ([e57fb2d](https://github.com/scaleway/scaleway-ui/commit/e57fb2db8a87fa2237b696a8655a85c98b80b5cd))
- **devdeps:** update dependency react-router-dom to v6.0.2 ([#898](https://github.com/scaleway/scaleway-ui/issues/898)) ([496107e](https://github.com/scaleway/scaleway-ui/commit/496107e4bd98a076002567f94af81ceb220180c1))

### :bug: Bug Fixes

- **deps:** update dependency @types/react-datepicker to v4.3.0 ([#901](https://github.com/scaleway/scaleway-ui/issues/901)) ([8e5d1d2](https://github.com/scaleway/scaleway-ui/commit/8e5d1d27c308d90a56c867c65f121af4b4af2b8c))

### [0.119.1](https://github.com/scaleway/scaleway-ui/compare/v0.119.0...v0.119.1) (2021-11-10)

### :memo: Documentation

- add @emotion/styled to required deps ([#891](https://github.com/scaleway/scaleway-ui/issues/891)) ([c654a18](https://github.com/scaleway/scaleway-ui/commit/c654a18a7aac6146987866a21a2f94b819aed9b1))

### :package: Chore

- **devdeps:** update babel monorepo to v7.16.3 ([#893](https://github.com/scaleway/scaleway-ui/issues/893)) ([199af7f](https://github.com/scaleway/scaleway-ui/commit/199af7fb0a633b47ea284114f5ce615879bf20a1))
- **devdeps:** update dependency @scaleway/eslint-config-react to v2.3.2 ([#892](https://github.com/scaleway/scaleway-ui/issues/892)) ([ced3bd8](https://github.com/scaleway/scaleway-ui/commit/ced3bd8ae7bcf6a24cc85cd8d539fb780ba2cd6d))
- **devdeps:** update dependency eslint to v8 ([#819](https://github.com/scaleway/scaleway-ui/issues/819)) ([20487f9](https://github.com/scaleway/scaleway-ui/commit/20487f901008bef4ff044c3f99e6415405c3bcb3))

### :bug: Bug Fixes

- **deps:** update dependency react-select to v5.2.1 ([#868](https://github.com/scaleway/scaleway-ui/issues/868)) ([919621c](https://github.com/scaleway/scaleway-ui/commit/919621c3c833ed9f0b6eff189c567a0ea5579e55))

## [0.119.0](https://github.com/scaleway/scaleway-ui/compare/v0.118.4...v0.119.0) (2021-11-09)

### :zap: Refactor

- migrate Reminder, RichSelect, ScrollView stories to tsx ([#877](https://github.com/scaleway/scaleway-ui/issues/877)) ([69c879b](https://github.com/scaleway/scaleway-ui/commit/69c879b7a8899473e7893353da92946ce1633bf5))
- migrate StealthCopiable, Stepper, Switch stories to tsx ([#886](https://github.com/scaleway/scaleway-ui/issues/886)) ([6ed9cd9](https://github.com/scaleway/scaleway-ui/commit/6ed9cd9659f1291fae7901ac766d299fa21ab235))

### :gear: Features

- **global-style:** remove GlobalStyle component ([#887](https://github.com/scaleway/scaleway-ui/issues/887)) ([92f2ee7](https://github.com/scaleway/scaleway-ui/commit/92f2ee741e1ad301ecbaedce1af309c5e7feb725))

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v2.3.1 ([#889](https://github.com/scaleway/scaleway-ui/issues/889)) ([fdf17df](https://github.com/scaleway/scaleway-ui/commit/fdf17dfef29eed21203aa9a05a2e47cfd6eb316e))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.18 ([#888](https://github.com/scaleway/scaleway-ui/issues/888)) ([438c379](https://github.com/scaleway/scaleway-ui/commit/438c3792e2b621ca0ccdbda788d672b7a9b6b25e))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.19 ([#890](https://github.com/scaleway/scaleway-ui/issues/890)) ([c5709f2](https://github.com/scaleway/scaleway-ui/commit/c5709f224aa445804f3a74f50329b9d29042f6cb))
- **devdeps:** update dependency react-router-dom to v6 ([#880](https://github.com/scaleway/scaleway-ui/issues/880)) ([2c1107b](https://github.com/scaleway/scaleway-ui/commit/2c1107b09ccecd7574fcd666a55058918d785dff))

### [0.118.4](https://github.com/scaleway/scaleway-ui/compare/v0.118.3...v0.118.4) (2021-11-08)

### :zap: Refactor

- migrate ProgressionButton, Radio, RadioBorderedBox, Range stories to tsx ([#874](https://github.com/scaleway/scaleway-ui/issues/874)) ([4600c64](https://github.com/scaleway/scaleway-ui/commit/4600c64fe130f1f5c84f070fd28e76b339685180))

### :package: Chore

- **devdeps:** update commitlint monorepo to v14 ([#867](https://github.com/scaleway/scaleway-ui/issues/867)) ([b69813d](https://github.com/scaleway/scaleway-ui/commit/b69813d1b1f804aa43e403852bac4d909beb10ef))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.14 ([#885](https://github.com/scaleway/scaleway-ui/issues/885)) ([faa2d6d](https://github.com/scaleway/scaleway-ui/commit/faa2d6d9f9053165170d5b1ed1e7beed6f65ddaf))
- **devdeps:** update dependency @testing-library/jest-dom to v5.15.0 ([#883](https://github.com/scaleway/scaleway-ui/issues/883)) ([cb68d05](https://github.com/scaleway/scaleway-ui/commit/cb68d059e94c4268c9165621d3be68055d817094))
- **devdeps:** update dependency rollup to v2.59.0 ([#882](https://github.com/scaleway/scaleway-ui/issues/882)) ([8737f53](https://github.com/scaleway/scaleway-ui/commit/8737f538a5d6d40b7f87d5dc6e0d679f7def55bd))
- **devdeps:** update dependency rollup-plugin-dts to v4.0.1 ([#881](https://github.com/scaleway/scaleway-ui/issues/881)) ([60d91bc](https://github.com/scaleway/scaleway-ui/commit/60d91bcf7f736a25feaf2e130f2ac0f6e94b6e1e))
- **devdeps:** update yarn to v3.1.0 ([#870](https://github.com/scaleway/scaleway-ui/issues/870)) ([e0c774c](https://github.com/scaleway/scaleway-ui/commit/e0c774c1791757674aeae97f7d7fb57940c5583b))

### :bug: Bug Fixes

- **deps:** update dependency react-countup to v6.1.0 ([#884](https://github.com/scaleway/scaleway-ui/issues/884)) ([fa0a8a4](https://github.com/scaleway/scaleway-ui/commit/fa0a8a4bd604de4eb66ebf1fb0b5f0d05e0abfb5))

### [0.118.3](https://github.com/scaleway/scaleway-ui/compare/v0.118.2...v0.118.3) (2021-11-05)

### :package: Chore

- **devdeps:** update dependency @scaleway/use-i18n to v3.1.13 ([#872](https://github.com/scaleway/scaleway-ui/issues/872)) ([f6e1dbc](https://github.com/scaleway/scaleway-ui/commit/f6e1dbcc0cc296cc4ff67b5e49fc2e7c6019dc21))
- **devdeps:** update dependency @types/react-dom to v17.0.11 ([#875](https://github.com/scaleway/scaleway-ui/issues/875)) ([fa26676](https://github.com/scaleway/scaleway-ui/commit/fa266761632e8d7e80f40dbcf101f3075b896851))
- **devdeps:** update dependency webpack to v5.61.0 ([#873](https://github.com/scaleway/scaleway-ui/issues/873)) ([23f8fe4](https://github.com/scaleway/scaleway-ui/commit/23f8fe4ecd32403bb398ba1ec34ec1d0bc4ff5e9))
- **devdeps:** update semantic-release monorepo ([#879](https://github.com/scaleway/scaleway-ui/issues/879)) ([33bb8c0](https://github.com/scaleway/scaleway-ui/commit/33bb8c08ec685299eb39f8b27ff0718473dd9e51))

### :bug: Bug Fixes

- correct some components types ([#878](https://github.com/scaleway/scaleway-ui/issues/878)) ([4ee78ec](https://github.com/scaleway/scaleway-ui/commit/4ee78ec174e4212a186be3b7c187e3690cd80072))

### [0.118.2](https://github.com/scaleway/scaleway-ui/compare/v0.118.1...v0.118.2) (2021-11-03)

### :bug: Bug Fixes

- **deps:** update nivo monorepo to v0.74.0 ([#816](https://github.com/scaleway/scaleway-ui/issues/816)) ([aef0a32](https://github.com/scaleway/scaleway-ui/commit/aef0a32a4f601dd644c608c4a51f20f8215c9861))

### [0.118.1](https://github.com/scaleway/scaleway-ui/compare/v0.118.0...v0.118.1) (2021-11-02)

### :zap: Refactor

- migrate menu modal navigationstepper and notice stories to tsx ([#859](https://github.com/scaleway/scaleway-ui/issues/859)) ([dcb38c4](https://github.com/scaleway/scaleway-ui/commit/dcb38c442d543a1b12dc045695bffc897a40d488))
- migrate Pagination, PasswordCheck, PasswordStrengthMeter, Pentagon stories to tsx ([#858](https://github.com/scaleway/scaleway-ui/issues/858)) ([55b2b57](https://github.com/scaleway/scaleway-ui/commit/55b2b571ee4034e56d54ffcdb9a6877477b6deb5))
- migrate stories to tsx for DateInput, Description, Dot, DotSteps, Expandable ([#846](https://github.com/scaleway/scaleway-ui/issues/846)) ([5f781c1](https://github.com/scaleway/scaleway-ui/commit/5f781c1db5a32588216acd1cf9eefcd2ce6641e3))
- migrate stories to tsx for ExtendedReminder, FlexBox, Grid, Icon, Image ([#847](https://github.com/scaleway/scaleway-ui/issues/847)) ([f700fb1](https://github.com/scaleway/scaleway-ui/commit/f700fb1099b2d4c5a4da6350e5b63aab0918123d))
- migrate stories to tsx for Label, Link, List, Markdown ([#853](https://github.com/scaleway/scaleway-ui/issues/853)) ([413b74a](https://github.com/scaleway/scaleway-ui/commit/413b74a1b3e7cb92352b761c5749d72f112020b4))
- migrate stories to tsx for PhoneInput, Placeholder, Popper, ProgressBar ([#854](https://github.com/scaleway/scaleway-ui/issues/854)) ([a738b90](https://github.com/scaleway/scaleway-ui/commit/a738b90a8827c414b832b72d9db9a9e1dfbdb4c2))

### :package: Chore

- **devdeps:** pin dependency @types/zxcvbn to 4.4.1 ([#869](https://github.com/scaleway/scaleway-ui/issues/869)) ([472c1af](https://github.com/scaleway/scaleway-ui/commit/472c1af09c35058c46c3baa6d6e93de20aea3caf))
- **devdeps:** update babel monorepo to v7.16.0 ([#862](https://github.com/scaleway/scaleway-ui/issues/862)) ([92a4e9e](https://github.com/scaleway/scaleway-ui/commit/92a4e9eb0e907b4cb08cc185d1373f07bcdacfe0))
- **devdeps:** update dependency @size-limit/file to v6.0.4 ([#863](https://github.com/scaleway/scaleway-ui/issues/863)) ([931b539](https://github.com/scaleway/scaleway-ui/commit/931b539a5fe3f701c817d47a7bc1dd5672eb09a5))
- **devdeps:** update dependency @size-limit/preset-big-lib to v6.0.4 ([#864](https://github.com/scaleway/scaleway-ui/issues/864)) ([0fce3c3](https://github.com/scaleway/scaleway-ui/commit/0fce3c36bb124d274a83323b10d07972e5cbd4cb))
- **devdeps:** update dependency size-limit to v6.0.4 ([#865](https://github.com/scaleway/scaleway-ui/issues/865)) ([bb04b69](https://github.com/scaleway/scaleway-ui/commit/bb04b69ae8da9fbfc44d98f7db3f74bd88181b94))
- **devdeps:** update semantic-release monorepo ([#866](https://github.com/scaleway/scaleway-ui/issues/866)) ([13463ba](https://github.com/scaleway/scaleway-ui/commit/13463bae6a12001fe393a63f188fba0e8ddf5424))

### :bug: Bug Fixes

- **list:** default template ([#871](https://github.com/scaleway/scaleway-ui/issues/871)) ([6e012c4](https://github.com/scaleway/scaleway-ui/commit/6e012c491cb6f90bf28d5d47a1c3a41a763bcd2a))

## [0.118.0](https://github.com/scaleway/scaleway-ui/compare/v0.117.7...v0.118.0) (2021-10-28)

### :white_check_mark: Test

- use jest-helpers ([#791](https://github.com/scaleway/scaleway-ui/issues/791)) ([7182b79](https://github.com/scaleway/scaleway-ui/commit/7182b797e3159f1bf72ccd7da5099319e151d428))

### :zap: Refactor

- **typescript:** migrate remaining files ([#849](https://github.com/scaleway/scaleway-ui/issues/849)) ([603cca5](https://github.com/scaleway/scaleway-ui/commit/603cca51f0e305613039b3c728f0392481cecfda)), closes [#848](https://github.com/scaleway/scaleway-ui/issues/848)

### :package: Chore

- **devdeps:** update dependency @scaleway/eslint-config-react to v2.3.0 ([#831](https://github.com/scaleway/scaleway-ui/issues/831)) ([eedc283](https://github.com/scaleway/scaleway-ui/commit/eedc283fa52b23b9336018e89ac9bed574d28b9a))
- **devdeps:** update dependency @types/react-router-dom to v5.3.2 ([#856](https://github.com/scaleway/scaleway-ui/issues/856)) ([bbbb63c](https://github.com/scaleway/scaleway-ui/commit/bbbb63c9e163ecfa3cb199baf47e78cda3e024ad))
- **devdeps:** update dependency eslint-mdx to v1.16.0 ([#844](https://github.com/scaleway/scaleway-ui/issues/844)) ([ed62601](https://github.com/scaleway/scaleway-ui/commit/ed6260132775357a003f66ecfff1ad39299a4418))
- **devdeps:** update dependency eslint-plugin-mdx to v1.16.0 ([#845](https://github.com/scaleway/scaleway-ui/issues/845)) ([4833621](https://github.com/scaleway/scaleway-ui/commit/48336214d19cec5700a1a5c3282baa6281eebc40))
- **devdeps:** update dependency lint-staged to v11.2.6 ([#860](https://github.com/scaleway/scaleway-ui/issues/860)) ([5e34972](https://github.com/scaleway/scaleway-ui/commit/5e34972ff0ef1afe297c93e3cab6637319e8139b))
- **devdeps:** update dependency rollup to v2.58.3 ([#855](https://github.com/scaleway/scaleway-ui/issues/855)) ([125c39f](https://github.com/scaleway/scaleway-ui/commit/125c39fb49cccc38510f67b404deb18209a41b02))
- **devdeps:** update node.js to v16.13 ([#861](https://github.com/scaleway/scaleway-ui/issues/861)) ([83a4eec](https://github.com/scaleway/scaleway-ui/commit/83a4eec71ac99020bf27d4bb181a628b085d3d21))
- **devdeps:** widen node engines ([#852](https://github.com/scaleway/scaleway-ui/issues/852)) ([1f07ca9](https://github.com/scaleway/scaleway-ui/commit/1f07ca9461df070a663e166a212d5360202dfbe1))
- **devdeps:** widen yarn engine version ([#848](https://github.com/scaleway/scaleway-ui/issues/848)) ([51d9d94](https://github.com/scaleway/scaleway-ui/commit/51d9d94a98ca4fae4016e7e42fdb2177f3a7ce55))

### :repeat: CI

- **renovate:** always widen engines and peerDeps ([#851](https://github.com/scaleway/scaleway-ui/issues/851)) ([92383f3](https://github.com/scaleway/scaleway-ui/commit/92383f3d385218b2ce21354a7fa4d52eeb6f291c))
- **renovate:** correct reviewers team syntax ([#857](https://github.com/scaleway/scaleway-ui/issues/857)) ([e0cf58f](https://github.com/scaleway/scaleway-ui/commit/e0cf58f9e4f2e02e9b261ad71f82ad085df9edd4))

### :gear: Features

- improve barstack ([#834](https://github.com/scaleway/scaleway-ui/issues/834)) ([41f9a3f](https://github.com/scaleway/scaleway-ui/commit/41f9a3fc4bdf7d727ad83e9e9b6aa742f2bf474b))

### [0.117.7](https://github.com/scaleway/scaleway-ui/compare/v0.117.6...v0.117.7) (2021-10-25)

### :repeat: CI

- **a11y:** make test always successfull ([#826](https://github.com/scaleway/scaleway-ui/issues/826)) ([2f876ac](https://github.com/scaleway/scaleway-ui/commit/2f876ac2611e66b8b8206f084644941c41c3f76a))

### :zap: Refactor

- migrate stories for charts, checkbox, counter, creationprogress, container ([#824](https://github.com/scaleway/scaleway-ui/issues/824)) ([0a8526d](https://github.com/scaleway/scaleway-ui/commit/0a8526d72d6312517e84f4fafcf001a0ada13112))

### :package: Chore

- **devdeps:** update babel monorepo to v7.15.8 ([#805](https://github.com/scaleway/scaleway-ui/issues/805)) ([6d53439](https://github.com/scaleway/scaleway-ui/commit/6d53439d442520237f424afb54509cac4d41da56))
- **devdeps:** update dependency @commitlint/cli to v13.2.1 ([#806](https://github.com/scaleway/scaleway-ui/issues/806)) ([5082cda](https://github.com/scaleway/scaleway-ui/commit/5082cda402b77f36a509e932deb93e98b66732c6))
- **devdeps:** update dependency @rollup/plugin-node-resolve to v13.0.6 ([#825](https://github.com/scaleway/scaleway-ui/issues/825)) ([48a8ab8](https://github.com/scaleway/scaleway-ui/commit/48a8ab866b9e5acb4cfde3f43cda5c161cecc4ed))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.10 ([#832](https://github.com/scaleway/scaleway-ui/issues/832)) ([433a5a0](https://github.com/scaleway/scaleway-ui/commit/433a5a0a9534990eb8427570f36a0eafc30efaf9))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.11 ([#833](https://github.com/scaleway/scaleway-ui/issues/833)) ([658eca1](https://github.com/scaleway/scaleway-ui/commit/658eca18ccdc84b3c3aefaedcb0bb7a58625699b))
- **devdeps:** update dependency @scaleway/use-i18n to v3.1.12 ([#841](https://github.com/scaleway/scaleway-ui/issues/841)) ([6dc8ba3](https://github.com/scaleway/scaleway-ui/commit/6dc8ba3e6c77b716b2a68bc223b06c7ec4555e26))
- **devdeps:** update dependency @semantic-release/npm to v8.0.1 ([#807](https://github.com/scaleway/scaleway-ui/issues/807)) ([137af0f](https://github.com/scaleway/scaleway-ui/commit/137af0f4aafdffd56816a6fc38615630183a4c3f))
- **devdeps:** update dependency @semantic-release/npm to v8.0.2 ([#827](https://github.com/scaleway/scaleway-ui/issues/827)) ([812f17a](https://github.com/scaleway/scaleway-ui/commit/812f17a33d24dcdcdfab81c0323c64b2c345e5e7))
- **devdeps:** update dependency @size-limit/file to v6 ([#817](https://github.com/scaleway/scaleway-ui/issues/817)) ([0223934](https://github.com/scaleway/scaleway-ui/commit/02239342acd06892b20b020d1edeb55d32226bbf))
- **devdeps:** update dependency @size-limit/preset-big-lib to v6 ([#818](https://github.com/scaleway/scaleway-ui/issues/818)) ([529df32](https://github.com/scaleway/scaleway-ui/commit/529df32e9a544c9945be6804b67424218f15ea97))
- **devdeps:** update dependency @testing-library/user-event to v13.5.0 ([#836](https://github.com/scaleway/scaleway-ui/issues/836)) ([cab6bd8](https://github.com/scaleway/scaleway-ui/commit/cab6bd884a4ca9face44c24adc6f897e408fb7e6))
- **devdeps:** update dependency @types/react-dom to v17.0.10 ([#828](https://github.com/scaleway/scaleway-ui/issues/828)) ([648a305](https://github.com/scaleway/scaleway-ui/commit/648a3057c2802014845e536aa296fba552fc924e))
- **devdeps:** update dependency @types/react-router-dom to v5.3.1 ([#808](https://github.com/scaleway/scaleway-ui/issues/808)) ([1f9686f](https://github.com/scaleway/scaleway-ui/commit/1f9686f77098bb0795e80f398926a975d53073e6))
- **devdeps:** update dependency babel-loader to v8.2.3 ([#829](https://github.com/scaleway/scaleway-ui/issues/829)) ([071728b](https://github.com/scaleway/scaleway-ui/commit/071728b86853b238f13a723e7f8ae973fc951575))
- **devdeps:** update dependency date-fns to v2.25.0 ([#813](https://github.com/scaleway/scaleway-ui/issues/813)) ([b3e5bd9](https://github.com/scaleway/scaleway-ui/commit/b3e5bd920b28754313dc3aeae7fb52ba67989b78))
- **devdeps:** update dependency husky to v7.0.4 ([#830](https://github.com/scaleway/scaleway-ui/issues/830)) ([29fb99f](https://github.com/scaleway/scaleway-ui/commit/29fb99f0c62fbe803aa2824395e6b3e8b802f365))
- **devdeps:** update dependency jest to v27.3.1 ([#837](https://github.com/scaleway/scaleway-ui/issues/837)) ([00e1653](https://github.com/scaleway/scaleway-ui/commit/00e16538e3bff28aa4e080507616ffce9b301585))
- **devdeps:** update dependency lint-staged to v11.2.3 ([#810](https://github.com/scaleway/scaleway-ui/issues/810)) ([b749a9d](https://github.com/scaleway/scaleway-ui/commit/b749a9d6655d6af19b335629655e15a07e2e7b3c))
- **devdeps:** update dependency lint-staged to v11.2.4 ([#838](https://github.com/scaleway/scaleway-ui/issues/838)) ([f177e4a](https://github.com/scaleway/scaleway-ui/commit/f177e4a99f6cf275b24054f19fbd706fce6ebae7))
- **devdeps:** update dependency postcss to v8.3.11 ([#835](https://github.com/scaleway/scaleway-ui/issues/835)) ([af62c8a](https://github.com/scaleway/scaleway-ui/commit/af62c8a15f190590f5e8e78553083da6bfd37ed7))
- **devdeps:** update dependency size-limit to v6 ([#820](https://github.com/scaleway/scaleway-ui/issues/820)) ([ebe2c4b](https://github.com/scaleway/scaleway-ui/commit/ebe2c4b973bd143975784e36ae883d710492c6c8))
- **devdeps:** update dependency typescript to v4.4.4 ([#811](https://github.com/scaleway/scaleway-ui/issues/811)) ([db8c482](https://github.com/scaleway/scaleway-ui/commit/db8c48212d5ea69a4ac827b99029b56482307976))
- **devdeps:** update dependency webpack to v5.58.2 ([#814](https://github.com/scaleway/scaleway-ui/issues/814)) ([ea8057a](https://github.com/scaleway/scaleway-ui/commit/ea8057a6a87eb6f51a1e330dc3efa63c9bd82d92))
- **devdeps:** update emotion monorepo to v11.5.0 ([#815](https://github.com/scaleway/scaleway-ui/issues/815)) ([82c9eda](https://github.com/scaleway/scaleway-ui/commit/82c9eda371e0338892130745aa55ada973f30d83))
- **devdeps:** update node.js to v16.11 ([#812](https://github.com/scaleway/scaleway-ui/issues/812)) ([8d603bf](https://github.com/scaleway/scaleway-ui/commit/8d603bf6af3d69807f8f0e976276895b185e71e9))
- **devdeps:** update node.js to v16.12 ([#840](https://github.com/scaleway/scaleway-ui/issues/840)) ([a246dc7](https://github.com/scaleway/scaleway-ui/commit/a246dc75dfe02ac8601f5f6a385b65acc9e81812))
- **devdeps:** update storybook monorepo to v6.3.12 ([#809](https://github.com/scaleway/scaleway-ui/issues/809)) ([17db46f](https://github.com/scaleway/scaleway-ui/commit/17db46fd5f5683288afb9dd2cba3f6d9d7273cc8))
- **storybook:** migrate mdx to ts stories ([#801](https://github.com/scaleway/scaleway-ui/issues/801)) ([316630d](https://github.com/scaleway/scaleway-ui/commit/316630d2f77f7a17a2613bbd613b09389dcd0a37))

### :bug: Bug Fixes

- **deps:** update dependency @scaleway/random-name to v2.1.1 ([#839](https://github.com/scaleway/scaleway-ui/issues/839)) ([5a0417e](https://github.com/scaleway/scaleway-ui/commit/5a0417ed2de04f1f23cf44e97a6dcba36f8d616c))
- **deps:** update dependency react-datepicker to v4.3.0 ([#842](https://github.com/scaleway/scaleway-ui/issues/842)) ([05d4fc1](https://github.com/scaleway/scaleway-ui/commit/05d4fc1cbc33839ff4bb45fcda169cdf8854b0fa))

### [0.117.6](https://github.com/scaleway/scaleway-ui/compare/v0.117.5...v0.117.6) (2021-10-19)

### :zap: Refactor

- migrate actionbar, activityindicator, alert and avatar stories to tsx ([#802](https://github.com/scaleway/scaleway-ui/issues/802)) ([cce67ff](https://github.com/scaleway/scaleway-ui/commit/cce67ff66a6279742f429f14db2cda9e69824883))

### :package: Chore

- **deps:** pin dependencies ([#803](https://github.com/scaleway/scaleway-ui/issues/803)) ([109378c](https://github.com/scaleway/scaleway-ui/commit/109378c7b24d144ab51d50e0f54d30d64a7a72bc))
- replace dependabot with renovate ([#789](https://github.com/scaleway/scaleway-ui/issues/789)) ([b7e9c2b](https://github.com/scaleway/scaleway-ui/commit/b7e9c2b521c640c989889fcf2beae17118f3c806))

### [0.117.5](https://github.com/scaleway/scaleway-ui/compare/v0.117.4...v0.117.5) (2021-10-18)

### :bug: Bug Fixes

- **radio-bordered-box:** cursor is only available on label ([#795](https://github.com/scaleway/scaleway-ui/issues/795)) ([2453729](https://github.com/scaleway/scaleway-ui/commit/24537298c1f3c4d7e47385f1ade6c9fda8247ac0))

### [0.117.4](https://github.com/scaleway/scaleway-ui/compare/v0.117.3...v0.117.4) (2021-10-18)

### :package: Chore

- **deps:** bump actions/checkout from 2.3.4 to 2.3.5 ([#799](https://github.com/scaleway/scaleway-ui/issues/799)) ([fbfcfdc](https://github.com/scaleway/scaleway-ui/commit/fbfcfdc60ba378d938c447992c5b07c1938648e2))

### :bug: Bug Fixes

- **package:** yarn version ([#796](https://github.com/scaleway/scaleway-ui/issues/796)) ([b52f084](https://github.com/scaleway/scaleway-ui/commit/b52f084cc334c3ada87c7a11e8a3c8b51665c308))

### [0.117.3](https://github.com/scaleway/scaleway-ui/compare/v0.117.2...v0.117.3) (2021-10-14)

### :bug: Bug Fixes

- **radio-bordered-box:** avoid using multiple label ([#793](https://github.com/scaleway/scaleway-ui/issues/793)) ([be040c6](https://github.com/scaleway/scaleway-ui/commit/be040c63ceb310fc32e182eb026c69f355af7ce8))

### [0.117.2](https://github.com/scaleway/scaleway-ui/compare/v0.117.1...v0.117.2) (2021-10-14)

### :bug: Bug Fixes

- avoid to retrigger animation on re-render & fix types ([#792](https://github.com/scaleway/scaleway-ui/issues/792)) ([72bff22](https://github.com/scaleway/scaleway-ui/commit/72bff22c27312f708a0c893d93112d8ad5485c47))

### [0.117.1](https://github.com/scaleway/scaleway-ui/compare/v0.117.0...v0.117.1) (2021-10-12)

### :bug: Bug Fixes

- copy paste on verification code ([#788](https://github.com/scaleway/scaleway-ui/issues/788)) ([63e9de3](https://github.com/scaleway/scaleway-ui/commit/63e9de361ec94cba1739c0d605bb655be6b9ac49))

## [0.117.0](https://github.com/scaleway/scaleway-ui/compare/v0.116.0...v0.117.0) (2021-10-12)

### :gear: Features

- new component barstack ([#787](https://github.com/scaleway/scaleway-ui/issues/787)) ([35448ba](https://github.com/scaleway/scaleway-ui/commit/35448ba04e49bdb86cf62c23a500e39a26c39d3d))

## [0.116.0](https://github.com/scaleway/scaleway-ui/compare/v0.115.0...v0.116.0) (2021-10-11)

### :gear: Features

- Charts components ([#766](https://github.com/scaleway/scaleway-ui/issues/766)) ([fbee4aa](https://github.com/scaleway/scaleway-ui/commit/fbee4aa3085cfb5c03ef6cd948c8592b2eddb715))

## [0.115.0](https://github.com/scaleway/scaleway-ui/compare/v0.114.0...v0.115.0) (2021-10-08)

### :gear: Features

- **theme:** use default color from theme ([#784](https://github.com/scaleway/scaleway-ui/issues/784)) ([3dff73e](https://github.com/scaleway/scaleway-ui/commit/3dff73e65efcb6b72f3b41d5a8ee1bbbf93bf0aa))

## [0.114.0](https://github.com/scaleway/scaleway-ui/compare/v0.113.1...v0.114.0) (2021-10-08)

### :zap: Refactor

- convert RichSelect to typescript ([#709](https://github.com/scaleway/scaleway-ui/issues/709)) ([68dbbfb](https://github.com/scaleway/scaleway-ui/commit/68dbbfbd35927e5da47dfb9d56cefc528619c608))

### :repeat: CI

- **a11y:** added tests and ci ([#760](https://github.com/scaleway/scaleway-ui/issues/760)) ([e087e18](https://github.com/scaleway/scaleway-ui/commit/e087e187d79d4bbe4f0520ddfb85fca028fc3691))

### :package: Chore

- **babel-eslint:** remove useless package ([#773](https://github.com/scaleway/scaleway-ui/issues/773)) ([168a389](https://github.com/scaleway/scaleway-ui/commit/168a3893b5d372bf73c12eae71f376d50135b1af))
- **deps-dev:** bump jest-junit from 12.3.0 to 13.0.0 ([#775](https://github.com/scaleway/scaleway-ui/issues/775)) ([ed7ecf7](https://github.com/scaleway/scaleway-ui/commit/ed7ecf76be074ea35d65a81953e32d339e3a4b74))
- **package:** remove deprecated types date fns ([#779](https://github.com/scaleway/scaleway-ui/issues/779)) ([9e08356](https://github.com/scaleway/scaleway-ui/commit/9e083562799212a3113db521e3508cc6811b4645))

### :gear: Features

- **icon:** add vpc icon ([#786](https://github.com/scaleway/scaleway-ui/issues/786)) ([e69dad9](https://github.com/scaleway/scaleway-ui/commit/e69dad9da1435ba4eacacec9e63c34fc5ee84489))

### [0.113.1](https://github.com/scaleway/scaleway-ui/compare/v0.113.0...v0.113.1) (2021-10-05)

### :bug: Bug Fixes

- popper disclosure type ([#777](https://github.com/scaleway/scaleway-ui/issues/777)) ([e9ba992](https://github.com/scaleway/scaleway-ui/commit/e9ba992a235a915f0b24f6ef7323a320468b863d))

## [0.113.0](https://github.com/scaleway/scaleway-ui/compare/v0.112.4...v0.113.0) (2021-10-05)

### :package: Chore

- **deps-dev:** bump @storybook/addon-links from 6.3.8 to 6.3.9 ([#762](https://github.com/scaleway/scaleway-ui/issues/762)) ([764bbc0](https://github.com/scaleway/scaleway-ui/commit/764bbc0e2d92e9958983e87f60a885c82a3b7f0b))
- **deps-dev:** bump @storybook/manager-webpack5 from 6.3.8 to 6.3.9 ([#763](https://github.com/scaleway/scaleway-ui/issues/763)) ([622161d](https://github.com/scaleway/scaleway-ui/commit/622161da54aa4f7c34b6496c858606ed677d7899))
- **deps-dev:** bump @storybook/react from 6.3.8 to 6.3.9 ([#765](https://github.com/scaleway/scaleway-ui/issues/765)) ([26914e7](https://github.com/scaleway/scaleway-ui/commit/26914e7908cdb990f7eb77063f9f06e401e42a44))
- **deps-dev:** bump @testing-library/react from 12.1.1 to 12.1.2 ([#761](https://github.com/scaleway/scaleway-ui/issues/761)) ([4f22187](https://github.com/scaleway/scaleway-ui/commit/4f22187124d69f05916ec36ed6fdcc87c0e7f0a1))
- **deps-dev:** bump lint-staged from 11.1.4 to 11.2.0 ([#772](https://github.com/scaleway/scaleway-ui/issues/772)) ([b06dc24](https://github.com/scaleway/scaleway-ui/commit/b06dc24931746159255b892224bb89ffe17ab18d))
- **deps-dev:** bump rollup from 2.57.0 to 2.58.0 ([#764](https://github.com/scaleway/scaleway-ui/issues/764)) ([52511de](https://github.com/scaleway/scaleway-ui/commit/52511de30b2b881039db996289e289c9fd59ca0a))
- **deps-dev:** bump webpack from 5.55.1 to 5.56.1 ([#767](https://github.com/scaleway/scaleway-ui/issues/767)) ([6ef5a8a](https://github.com/scaleway/scaleway-ui/commit/6ef5a8a86b992241b2ef43f3112875f83b99e301))
- **yarn:** upgrade yarn manager ([#758](https://github.com/scaleway/scaleway-ui/issues/758)) ([ddd859a](https://github.com/scaleway/scaleway-ui/commit/ddd859a1fad496a627e5b75b2c547470a18a9a37))

### :gear: Features

- **modal:** makes disclosure a react element if wanted ([#774](https://github.com/scaleway/scaleway-ui/issues/774)) ([1576ffe](https://github.com/scaleway/scaleway-ui/commit/1576ffe8befece708c204cd60ca8077cdc6a34b5))

### [0.112.4](https://github.com/scaleway/scaleway-ui/compare/v0.112.3...v0.112.4) (2021-09-30)

### :bug: Bug Fixes

- children is not mandatory for button component ([#759](https://github.com/scaleway/scaleway-ui/issues/759)) ([d71c36c](https://github.com/scaleway/scaleway-ui/commit/d71c36c46802b83bb7a39c573be43009f9fdef80))

### [0.112.3](https://github.com/scaleway/scaleway-ui/compare/v0.112.2...v0.112.3) (2021-09-30)

### :package: Chore

- **commitlint:** use new configuration ([#751](https://github.com/scaleway/scaleway-ui/issues/751)) ([8e1a59e](https://github.com/scaleway/scaleway-ui/commit/8e1a59ee2202f05efb1eef1f7b5b6b76a11e6a7e))
- **deps-dev:** bump jest from 27.2.2 to 27.2.3 ([#753](https://github.com/scaleway/scaleway-ui/issues/753)) ([1557ebe](https://github.com/scaleway/scaleway-ui/commit/1557ebe6e3ccade542118c279b829b5e716d82c2))
- **deps-dev:** bump jest from 27.2.3 to 27.2.4 ([#757](https://github.com/scaleway/scaleway-ui/issues/757)) ([24b184c](https://github.com/scaleway/scaleway-ui/commit/24b184c745605bb028cbea0fe2882e2311535fe2))
- **deps-dev:** bump webpack from 5.54.0 to 5.55.0 ([#754](https://github.com/scaleway/scaleway-ui/issues/754)) ([4a6cd16](https://github.com/scaleway/scaleway-ui/commit/4a6cd169ecbb43dd43e7ae87aac1a74c5ec67186))
- **deps-dev:** bump webpack from 5.55.0 to 5.55.1 ([#755](https://github.com/scaleway/scaleway-ui/issues/755)) ([b9d29e8](https://github.com/scaleway/scaleway-ui/commit/b9d29e846b66580ad9c8c3993fde7e2acb938a29))

### :bug: Bug Fixes

- **menu:** allow to not render inside menu when it s not necessary ([#756](https://github.com/scaleway/scaleway-ui/issues/756)) ([e0d199e](https://github.com/scaleway/scaleway-ui/commit/e0d199ecabf7e1bfb53e1531c15b7efe9e1e8cb2))

### [0.112.2](https://github.com/scaleway/scaleway-ui/compare/v0.112.1...v0.112.2) (2021-09-28)

### :package: Chore

- **deps-dev:** bump @commitlint/cli from 13.1.0 to 13.2.0 ([#750](https://github.com/scaleway/scaleway-ui/issues/750)) ([39f2db9](https://github.com/scaleway/scaleway-ui/commit/39f2db9336b1f93848f82ea501967e40d157b5b0))
- **deps-dev:** bump @commitlint/config-conventional ([#749](https://github.com/scaleway/scaleway-ui/issues/749)) ([472d83a](https://github.com/scaleway/scaleway-ui/commit/472d83ae8d3a45a9910504fb2e548b0694dc5f45))
- **deps-dev:** bump @semantic-release/github from 8.0.0 to 8.0.1 ([#739](https://github.com/scaleway/scaleway-ui/issues/739)) ([bee9fe3](https://github.com/scaleway/scaleway-ui/commit/bee9fe3b3ef6cf20c572c5438687b206bcb1dc8c))
- **deps-dev:** bump @testing-library/react from 12.1.0 to 12.1.1 ([#748](https://github.com/scaleway/scaleway-ui/issues/748)) ([531ee17](https://github.com/scaleway/scaleway-ui/commit/531ee175c0604f23d463c49e1c5dc6cfb189daae))
- **deps-dev:** bump jest from 27.2.1 to 27.2.2 ([#742](https://github.com/scaleway/scaleway-ui/issues/742)) ([133cfd7](https://github.com/scaleway/scaleway-ui/commit/133cfd7a8277d291ac82db0f87e6bc6b3b8004c6))
- **deps-dev:** bump postcss from 8.3.7 to 8.3.8 ([#743](https://github.com/scaleway/scaleway-ui/issues/743)) ([a2fd958](https://github.com/scaleway/scaleway-ui/commit/a2fd958745518635ce3d5af973513b2dfc78b05e))
- **deps-dev:** bump webpack from 5.53.0 to 5.54.0 ([#745](https://github.com/scaleway/scaleway-ui/issues/745)) ([3d65fdf](https://github.com/scaleway/scaleway-ui/commit/3d65fdfa539a0485a67b7ce41c7e6cabb6dce713))
- **deps:** bump @types/react-datepicker from 4.1.6 to 4.1.7 ([#718](https://github.com/scaleway/scaleway-ui/issues/718)) ([6174d9b](https://github.com/scaleway/scaleway-ui/commit/6174d9b21ccc64829202e0fbc01b1bc02225e702))
- **deps:** bump actions/setup-node from 2.4.0 to 2.4.1 ([#747](https://github.com/scaleway/scaleway-ui/issues/747)) ([2a38711](https://github.com/scaleway/scaleway-ui/commit/2a38711ba2777e2c3d16f656132634a197fa8678))

### :bug: Bug Fixes

- **navigationstepper:** update border width according to feebacks ([#752](https://github.com/scaleway/scaleway-ui/issues/752)) ([259c776](https://github.com/scaleway/scaleway-ui/commit/259c7761d1609241eea3cf76c1a17175459130dc))

### [0.112.1](https://github.com/scaleway/scaleway-ui/compare/v0.112.0...v0.112.1) (2021-09-23)

### :package: Chore

- **deps-dev:** bump @babel/eslint-parser from 7.15.4 to 7.15.7 ([#730](https://github.com/scaleway/scaleway-ui/issues/730)) ([c0affd1](https://github.com/scaleway/scaleway-ui/commit/c0affd115f66ca26b12a01d70c5ae83657b675cc))
- **deps-dev:** bump @rollup/plugin-node-resolve from 13.0.4 to 13.0.5 ([#736](https://github.com/scaleway/scaleway-ui/issues/736)) ([e4e352a](https://github.com/scaleway/scaleway-ui/commit/e4e352a29399830aa7c2c0494efa0b05970cf463))
- **deps-dev:** bump @types/react-router-dom from 5.1.9 to 5.3.0 ([#735](https://github.com/scaleway/scaleway-ui/issues/735)) ([b50fe65](https://github.com/scaleway/scaleway-ui/commit/b50fe651de1a035b7992cdee09fe84e817299422))
- **deps-dev:** bump jest from 27.2.0 to 27.2.1 ([#731](https://github.com/scaleway/scaleway-ui/issues/731)) ([6c988d8](https://github.com/scaleway/scaleway-ui/commit/6c988d82ef633d4b4ad91c507431f09509216286))
- **deps-dev:** bump jest-junit from 12.2.0 to 12.3.0 ([#738](https://github.com/scaleway/scaleway-ui/issues/738)) ([cf0cc69](https://github.com/scaleway/scaleway-ui/commit/cf0cc691ab80354033f81ad1f4509fe28a91477e))
- **deps-dev:** bump postcss from 8.3.6 to 8.3.7 ([#737](https://github.com/scaleway/scaleway-ui/issues/737)) ([0a9febe](https://github.com/scaleway/scaleway-ui/commit/0a9febe5fad4a618702babe64ac382f7908e95fa))
- **deps-dev:** bump rollup from 2.56.3 to 2.57.0 ([#733](https://github.com/scaleway/scaleway-ui/issues/733)) ([386e2f3](https://github.com/scaleway/scaleway-ui/commit/386e2f38552ee8920a5a1664b64aadbff976c4a3))
- **deps-dev:** bump semantic-release, @semantic-release/changelog, @semantic-release/commit-analyzer, @semantic-release/git, @semantic-release/github, @semantic-release/npm and @semantic-release/release-notes-generator ([#734](https://github.com/scaleway/scaleway-ui/issues/734)) ([f3846de](https://github.com/scaleway/scaleway-ui/commit/f3846de75ff11972360234b21bf905ebabe957f8))
- **deps:** bump react-countup from 5.2.0 to 6.0.0 ([#729](https://github.com/scaleway/scaleway-ui/issues/729)) ([61daa04](https://github.com/scaleway/scaleway-ui/commit/61daa042f3e8f2c2fadfac218903ed32cf1a6cdd))
- **deps:** bump reakit from 1.3.9 to 1.3.10 ([#732](https://github.com/scaleway/scaleway-ui/issues/732)) ([b77dc9f](https://github.com/scaleway/scaleway-ui/commit/b77dc9f73319b091dc1130a1bed280b085b9edb6))

### :bug: Bug Fixes

- colors not const ([#740](https://github.com/scaleway/scaleway-ui/issues/740)) ([440f57c](https://github.com/scaleway/scaleway-ui/commit/440f57c4fc3b481bb3f4ed6a9ee964ecc21e4ecb))

## [0.112.0](https://github.com/scaleway/scaleway-ui/compare/v0.111.0...v0.112.0) (2021-09-17)

### :package: Chore

- **deps-dev:** bump @scaleway/eslint-config-react from 2.2.0 to 2.2.1 ([#725](https://github.com/scaleway/scaleway-ui/issues/725)) ([bcc6e2d](https://github.com/scaleway/scaleway-ui/commit/bcc6e2d6bde988e4ed1787bb2c04d690b27d92ca))
- **deps-dev:** bump date-fns from 2.23.0 to 2.24.0 ([#727](https://github.com/scaleway/scaleway-ui/issues/727)) ([cbf01a9](https://github.com/scaleway/scaleway-ui/commit/cbf01a9cf164217cb1a8ca5e27790deab4795fe7))
- **deps-dev:** bump webpack from 5.52.1 to 5.53.0 ([#728](https://github.com/scaleway/scaleway-ui/issues/728)) ([f205a8f](https://github.com/scaleway/scaleway-ui/commit/f205a8f1d54253f9fdf56b6048cd9e95038e7120))

### :gear: Features

- **textbox:** reduce padding & add `inputProps` ([#726](https://github.com/scaleway/scaleway-ui/issues/726)) ([e3c086e](https://github.com/scaleway/scaleway-ui/commit/e3c086e1eda0a7e21d636b83650c9d7f6c65f54a))

## [0.111.0](https://github.com/scaleway/scaleway-ui/compare/v0.110.0...v0.111.0) (2021-09-16)

### :gear: Features

- fix codecov errors ([#723](https://github.com/scaleway/scaleway-ui/issues/723)) ([c39cdba](https://github.com/scaleway/scaleway-ui/commit/c39cdbab14c142ee7b9729edd9a46b3421d23487))

## [0.110.0](https://github.com/scaleway/scaleway-ui/compare/v0.109.0...v0.110.0) (2021-09-16)

### :package: Chore

- **deps:** bump codecov/codecov-action from 2.0.3 to 2.1.0 ([#721](https://github.com/scaleway/scaleway-ui/issues/721)) ([acd38fe](https://github.com/scaleway/scaleway-ui/commit/acd38fe652b2da858f9116474c3a0754c0968be3))
- **deps-dev:** bump @types/react-router-dom from 5.1.8 to 5.1.9 ([#722](https://github.com/scaleway/scaleway-ui/issues/722)) ([aca2ffb](https://github.com/scaleway/scaleway-ui/commit/aca2ffb032f9b0230387ef3a3cc34afbd84fb428))
- **deps-dev:** bump prettier from 2.4.0 to 2.4.1 ([#724](https://github.com/scaleway/scaleway-ui/issues/724)) ([aa0e491](https://github.com/scaleway/scaleway-ui/commit/aa0e4913e4923202be7865ba0d4fff40f098c2ad))

### :gear: Features

- migrate list to typescript ([#708](https://github.com/scaleway/scaleway-ui/issues/708)) ([3e73d7a](https://github.com/scaleway/scaleway-ui/commit/3e73d7a8fa0603626910ae3df384019686979ede))

## [0.109.0](https://github.com/scaleway/scaleway-ui/compare/v0.108.0...v0.109.0) (2021-09-13)

### :package: Chore

- **deps-dev:** bump @scaleway/eslint-config-react from 2.1.2 to 2.2.0 ([#713](https://github.com/scaleway/scaleway-ui/issues/713)) ([9160889](https://github.com/scaleway/scaleway-ui/commit/9160889aeb275e5ab72e52920c85314e98e63fda))
- **deps-dev:** bump @testing-library/react from 12.0.0 to 12.1.0 ([#717](https://github.com/scaleway/scaleway-ui/issues/717)) ([83be4cd](https://github.com/scaleway/scaleway-ui/commit/83be4cdfb49eb3c5d2f41deddc0cd28316ece081))
- **deps-dev:** bump jest from 27.1.1 to 27.2.0 ([#720](https://github.com/scaleway/scaleway-ui/issues/720)) ([0ac2633](https://github.com/scaleway/scaleway-ui/commit/0ac2633feb6a9d2b2e121afd6f4837b941cfcb3c))
- **deps-dev:** bump typescript from 4.4.2 to 4.4.3 ([#719](https://github.com/scaleway/scaleway-ui/issues/719)) ([2f92b4c](https://github.com/scaleway/scaleway-ui/commit/2f92b4c45371bf1e0ebd1013c60b6cb148dbb209))

### :gear: Features

- pagination to typescript ([#691](https://github.com/scaleway/scaleway-ui/issues/691)) ([37a1749](https://github.com/scaleway/scaleway-ui/commit/37a1749be0c086722874bb5ca1c61f637d8812e6))

## [0.108.0](https://github.com/scaleway/scaleway-ui/compare/v0.107.7...v0.108.0) (2021-09-10)

### :gear: Features

- **CNS-4317:** add AI category icon ([#692](https://github.com/scaleway/scaleway-ui/issues/692)) ([8870768](https://github.com/scaleway/scaleway-ui/commit/8870768993b8907cbb337c338f30372e13e2cc1e))

### [0.107.7](https://github.com/scaleway/scaleway-ui/compare/v0.107.6...v0.107.7) (2021-09-10)

### :package: Chore

- **deps-dev:** bump webpack from 5.52.0 to 5.52.1 ([#716](https://github.com/scaleway/scaleway-ui/issues/716)) ([f671faf](https://github.com/scaleway/scaleway-ui/commit/f671faf6ce55906d0af01092b0cd11e0bcbadd15))

### :bug: Bug Fixes

- **modal:** onBeforeClose & ExtendReminder CustomLink ([#705](https://github.com/scaleway/scaleway-ui/issues/705)) ([1e154c9](https://github.com/scaleway/scaleway-ui/commit/1e154c9e70a3cd5fe0a4f76b7ad4748955ffe827))

### [0.107.6](https://github.com/scaleway/scaleway-ui/compare/v0.107.5...v0.107.6) (2021-09-10)

### :repeat: CI

- downgrade test/jest node version ([#711](https://github.com/scaleway/scaleway-ui/issues/711)) ([e653018](https://github.com/scaleway/scaleway-ui/commit/e65301862a571ea5c6bbf5c3b973420bf5f17625))

### :package: Chore

- **deps-dev:** bump @babel/preset-env from 7.15.4 to 7.15.6 ([#714](https://github.com/scaleway/scaleway-ui/issues/714)) ([c75d073](https://github.com/scaleway/scaleway-ui/commit/c75d073ce6a3e09423536e749894a18a841c1c16))
- **deps-dev:** bump jest from 27.1.0 to 27.1.1 ([#710](https://github.com/scaleway/scaleway-ui/issues/710)) ([cb762eb](https://github.com/scaleway/scaleway-ui/commit/cb762ebaff91766813318b60ba2a7a2d87bcb398))
- **deps-dev:** bump prettier from 2.3.2 to 2.4.0 ([#715](https://github.com/scaleway/scaleway-ui/issues/715)) ([413e0cf](https://github.com/scaleway/scaleway-ui/commit/413e0cf09036dff69d2a2ec5737cd5dfef7f95d4))

### :bug: Bug Fixes

- radioborderedbox add xstyledprops ([#712](https://github.com/scaleway/scaleway-ui/issues/712)) ([8747875](https://github.com/scaleway/scaleway-ui/commit/874787536635e1ace5126c2075d180add28401f5))

### [0.107.5](https://github.com/scaleway/scaleway-ui/compare/v0.107.4...v0.107.5) (2021-09-07)

### :bug: Bug Fixes

- adds correct types to textbox ([#707](https://github.com/scaleway/scaleway-ui/issues/707)) ([280d249](https://github.com/scaleway/scaleway-ui/commit/280d249ed4fc41ed15e5825fb5814847b72b5093))

### [0.107.4](https://github.com/scaleway/scaleway-ui/compare/v0.107.3...v0.107.4) (2021-09-07)

### :bug: Bug Fixes

- **theme:** allow theme constants inspection in typescript ([#706](https://github.com/scaleway/scaleway-ui/issues/706)) ([fd904cf](https://github.com/scaleway/scaleway-ui/commit/fd904cfb805eb2babe26d958aa2e7f8698fdc305))

### [0.107.3](https://github.com/scaleway/scaleway-ui/compare/v0.107.2...v0.107.3) (2021-09-07)

### :bug: Bug Fixes

- avoid to declare emotion Theme typings ([#704](https://github.com/scaleway/scaleway-ui/issues/704)) ([bd01bed](https://github.com/scaleway/scaleway-ui/commit/bd01bed7bddff1c69c65ad6633f1c89178e3bc25))

### [0.107.2](https://github.com/scaleway/scaleway-ui/compare/v0.107.1...v0.107.2) (2021-09-07)

### :package: Chore

- **deps:** bump @types/react-datepicker from 4.1.5 to 4.1.6 ([#702](https://github.com/scaleway/scaleway-ui/issues/702)) ([4e61638](https://github.com/scaleway/scaleway-ui/commit/4e61638db7143577f058408575c0856588d41b40))
- **deps:** bump reakit from 1.3.8 to 1.3.9 ([#697](https://github.com/scaleway/scaleway-ui/issues/697)) ([fc092fa](https://github.com/scaleway/scaleway-ui/commit/fc092fa7a9cad21747cdae23f47b35a0d372c193))
- **deps-dev:** bump @babel/preset-env from 7.15.0 to 7.15.4 ([#701](https://github.com/scaleway/scaleway-ui/issues/701)) ([a56e2b0](https://github.com/scaleway/scaleway-ui/commit/a56e2b0f157f716b1c67d8808cda3dae97db1909))
- **deps-dev:** bump @semantic-release/git from 9.0.0 to 9.0.1 ([#703](https://github.com/scaleway/scaleway-ui/issues/703)) ([a8b2a51](https://github.com/scaleway/scaleway-ui/commit/a8b2a5137c1f624edbf04dc7383e77822822cd01))
- **deps-dev:** bump @storybook/addon-essentials from 6.3.7 to 6.3.8 ([#698](https://github.com/scaleway/scaleway-ui/issues/698)) ([ce9ab32](https://github.com/scaleway/scaleway-ui/commit/ce9ab320317521fcd834e9a0f2f3b07df6c37c4f))
- **deps-dev:** bump react-router-dom from 5.2.1 to 5.3.0 ([#696](https://github.com/scaleway/scaleway-ui/issues/696)) ([91474a8](https://github.com/scaleway/scaleway-ui/commit/91474a872b126f8937d647d75fa13a5044a838a9))

### :bug: Bug Fixes

- correct css 1px gap when using responsive utilities ([#700](https://github.com/scaleway/scaleway-ui/issues/700)) ([3a2e83e](https://github.com/scaleway/scaleway-ui/commit/3a2e83eab8775a1f0f7b71fb3ce8ee561c626d3b))

### [0.107.1](https://github.com/scaleway/scaleway-ui/compare/v0.107.0...v0.107.1) (2021-09-06)

### :package: Chore

- **deps:** bump @babel/runtime from 7.15.3 to 7.15.4 ([#689](https://github.com/scaleway/scaleway-ui/issues/689)) ([3ccc292](https://github.com/scaleway/scaleway-ui/commit/3ccc2927ba5edf4292f014d32dd348ccc5ef96bc))
- **deps:** bump docker/setup-buildx-action from 1.5.1 to 1.6.0 ([#693](https://github.com/scaleway/scaleway-ui/issues/693)) ([a91d81b](https://github.com/scaleway/scaleway-ui/commit/a91d81b1fa2f1a4ff15fb9b83d4ef8023fa7b131))
- **deps-dev:** bump @babel/core from 7.15.0 to 7.15.5 ([#694](https://github.com/scaleway/scaleway-ui/issues/694)) ([2d180da](https://github.com/scaleway/scaleway-ui/commit/2d180da4fc7c8169b67992ba7878250a54bfb7a6))
- **deps-dev:** bump @babel/eslint-parser from 7.15.0 to 7.15.4 ([#690](https://github.com/scaleway/scaleway-ui/issues/690)) ([32c4a2a](https://github.com/scaleway/scaleway-ui/commit/32c4a2aeed5344e32674c8be8a6c47a125b05188))
- **deps-dev:** bump @scaleway/use-i18n from 3.1.7 to 3.1.8 ([#685](https://github.com/scaleway/scaleway-ui/issues/685)) ([728cf78](https://github.com/scaleway/scaleway-ui/commit/728cf785451f94428607539265c5aff829a848a3))
- **deps-dev:** bump webpack from 5.51.1 to 5.52.0 ([#695](https://github.com/scaleway/scaleway-ui/issues/695)) ([7a509ed](https://github.com/scaleway/scaleway-ui/commit/7a509ed85b7a26dc018ea0419fb802df22091b30))

### :bug: Bug Fixes

- add ability to pass className to NavigationStepper ([#686](https://github.com/scaleway/scaleway-ui/issues/686)) ([6aa8ff6](https://github.com/scaleway/scaleway-ui/commit/6aa8ff6064228fbd2982b9e57d61460d7b0d7ea1))

## [0.107.0](https://github.com/scaleway/scaleway-ui/compare/v0.106.0...v0.107.0) (2021-09-02)

### :zap: Refactor

- **date-input:** migration typescript ([#666](https://github.com/scaleway/scaleway-ui/issues/666)) ([7ad703d](https://github.com/scaleway/scaleway-ui/commit/7ad703d7764d1b84db071e956bcad7f5396ee367))

### :package: Chore

- **deps:** bump @types/react-datepicker from 4.1.4 to 4.1.5 ([#684](https://github.com/scaleway/scaleway-ui/issues/684)) ([4758b1b](https://github.com/scaleway/scaleway-ui/commit/4758b1bb794d04b142532e90c47db0878094e045))

### :gear: Features

- **DotSteps:** update component dots style ([#683](https://github.com/scaleway/scaleway-ui/issues/683)) ([2e1427e](https://github.com/scaleway/scaleway-ui/commit/2e1427e4036d10608e5fcae1a8a945361b2eccf6))

## [0.106.0](https://github.com/scaleway/scaleway-ui/compare/v0.105.0...v0.106.0) (2021-09-01)

### :zap: Refactor

- **tags:** migration typescript ([#674](https://github.com/scaleway/scaleway-ui/issues/674)) ([5432238](https://github.com/scaleway/scaleway-ui/commit/54322388db203372dd926af78c64979bd38f27e9))

### :gear: Features

- navigationstepper ([#675](https://github.com/scaleway/scaleway-ui/issues/675)) ([001b00f](https://github.com/scaleway/scaleway-ui/commit/001b00fbaaa551e222f776fd02187ed91cc3d1f0))

## [0.105.0](https://github.com/scaleway/scaleway-ui/compare/v0.104.0...v0.105.0) (2021-08-31)

### :package: Chore

- **deps-dev:** bump rollup-plugin-dts from 3.0.2 to 4.0.0 ([#680](https://github.com/scaleway/scaleway-ui/issues/680)) ([cebb5eb](https://github.com/scaleway/scaleway-ui/commit/cebb5eb12e3b3c1d902f38855db3e39407a3862a))

### :gear: Features

- add rocket icon ([#682](https://github.com/scaleway/scaleway-ui/issues/682)) ([301cce6](https://github.com/scaleway/scaleway-ui/commit/301cce6d617182f6f630d15301a0552bba942ce3))

## [0.104.0](https://github.com/scaleway/scaleway-ui/compare/v0.103.0...v0.104.0) (2021-08-30)

### :package: Chore

- **deps:** bump codecov/codecov-action from 2.0.2 to 2.0.3 ([#663](https://github.com/scaleway/scaleway-ui/issues/663)) ([7afa62a](https://github.com/scaleway/scaleway-ui/commit/7afa62a4959ea4ebe7717c33c6801287811d2e46))
- **deps-dev:** bump @scaleway/eslint-config-react from 2.1.1 to 2.1.2 ([#669](https://github.com/scaleway/scaleway-ui/issues/669)) ([f946194](https://github.com/scaleway/scaleway-ui/commit/f9461945bcc4c1bd7dd7e439955a26bfef6467bf))
- **deps-dev:** bump @scaleway/use-i18n from 3.1.6 to 3.1.7 ([#676](https://github.com/scaleway/scaleway-ui/issues/676)) ([4bbd3e0](https://github.com/scaleway/scaleway-ui/commit/4bbd3e03c66216407fc274d84a8ce549e31d9f12))
- **deps-dev:** bump husky from 7.0.1 to 7.0.2 ([#664](https://github.com/scaleway/scaleway-ui/issues/664)) ([f0f4d33](https://github.com/scaleway/scaleway-ui/commit/f0f4d3302a2314fed3aed679005100c6dd6a8600))
- **deps-dev:** bump jest from 27.0.6 to 27.1.0 ([#678](https://github.com/scaleway/scaleway-ui/issues/678)) ([8028f43](https://github.com/scaleway/scaleway-ui/commit/8028f436d72546267c2a7acda23a0478075fa579))
- **deps-dev:** bump react-router-dom from 5.2.0 to 5.2.1 ([#677](https://github.com/scaleway/scaleway-ui/issues/677)) ([daf6a34](https://github.com/scaleway/scaleway-ui/commit/daf6a34f2cffc5815a9f88792d997239bdf17202))
- **deps-dev:** bump semantic-release from 17.4.6 to 17.4.7 ([#668](https://github.com/scaleway/scaleway-ui/issues/668)) ([262c624](https://github.com/scaleway/scaleway-ui/commit/262c624b7c86a4d4fc26fb2e068750c17bf7fa90))
- **deps-dev:** bump typescript from 4.3.5 to 4.4.2 ([#671](https://github.com/scaleway/scaleway-ui/issues/671)) ([4700694](https://github.com/scaleway/scaleway-ui/commit/47006943f8bbf2785b105440d7ddd09f004b97ad))

### :zap: Refactor

- **menu:** migration typescript ([#670](https://github.com/scaleway/scaleway-ui/issues/670)) ([f330464](https://github.com/scaleway/scaleway-ui/commit/f330464543ca42f27d4784f2dc50b1293a503b6b))
- **modal:** migration typescript ([#665](https://github.com/scaleway/scaleway-ui/issues/665)) ([f2f8c2c](https://github.com/scaleway/scaleway-ui/commit/f2f8c2cbf60cf0fc9e0d09a05d40d6d8e44636f5))
- **tagspoplist:** migration typescript ([#667](https://github.com/scaleway/scaleway-ui/issues/667)) ([8ba8a21](https://github.com/scaleway/scaleway-ui/commit/8ba8a2110093008cac7acc2f82ebbe0d633473ca))
- **typescript:** touchable, textbox, tag components ([#642](https://github.com/scaleway/scaleway-ui/issues/642)) ([7646df9](https://github.com/scaleway/scaleway-ui/commit/7646df9af73d753cb6dedf0850155a6c5f0cee79))

### :gear: Features

- migration typescript chart stepper statusindicator ([#660](https://github.com/scaleway/scaleway-ui/issues/660)) ([7a3db37](https://github.com/scaleway/scaleway-ui/commit/7a3db37242b3de80cdbb7623c30181276efdbcc9))

## [0.103.0](https://github.com/scaleway/scaleway-ui/compare/v0.102.2...v0.103.0) (2021-08-24)

### :gear: Features

- correct es module tree shaking by preserving modules on output ([#654](https://github.com/scaleway/scaleway-ui/issues/654)) ([69bc517](https://github.com/scaleway/scaleway-ui/commit/69bc51781ab88abcc927cd2ba7894961d77bd1be))

### [0.102.2](https://github.com/scaleway/scaleway-ui/compare/v0.102.1...v0.102.2) (2021-08-24)

### :bug: Bug Fixes

- correct generated types + some tests ([#662](https://github.com/scaleway/scaleway-ui/issues/662)) ([f07cd07](https://github.com/scaleway/scaleway-ui/commit/f07cd07ae2dcde77e1bee12913446447c7037c8a))

### [0.102.1](https://github.com/scaleway/scaleway-ui/compare/v0.102.0...v0.102.1) (2021-08-24)

### :package: Chore

- **deps-dev:** bump @scaleway/eslint-config-react from 2.1.0 to 2.1.1 ([#659](https://github.com/scaleway/scaleway-ui/issues/659)) ([507545a](https://github.com/scaleway/scaleway-ui/commit/507545ab17940e2ba5965c92f82d586307c350f6))
- **deps-dev:** bump @scaleway/use-i18n from 3.1.5 to 3.1.6 ([#658](https://github.com/scaleway/scaleway-ui/issues/658)) ([76dd766](https://github.com/scaleway/scaleway-ui/commit/76dd766d67e1526dd43674f8709f56e44f65c98e))
- **deps-dev:** bump semantic-release from 17.4.5 to 17.4.6 ([#661](https://github.com/scaleway/scaleway-ui/issues/661)) ([36e419a](https://github.com/scaleway/scaleway-ui/commit/36e419a3ae25696dbe330a685215bffcbb00c7c1))

### :bug: Bug Fixes

- removes zindex from tooltip component ([#651](https://github.com/scaleway/scaleway-ui/issues/651)) ([2a0fb7f](https://github.com/scaleway/scaleway-ui/commit/2a0fb7f0c2c9419603991a2d4f2d53bb72326ed8))

## [0.102.0](https://github.com/scaleway/scaleway-ui/compare/v0.101.0...v0.102.0) (2021-08-23)

### :package: Chore

- **deps:** bump docker/build-push-action from 2.6.1 to 2.7.0 ([#655](https://github.com/scaleway/scaleway-ui/issues/655)) ([bd14a8b](https://github.com/scaleway/scaleway-ui/commit/bd14a8b50e6de0d80923aceea51a8c743b067f83))
- **deps-dev:** bump @scaleway/use-i18n from 3.1.4 to 3.1.5 ([#656](https://github.com/scaleway/scaleway-ui/issues/656)) ([0d5676c](https://github.com/scaleway/scaleway-ui/commit/0d5676cad84d49d8a014be1f1422c69a8950fe0e))
- **deps-dev:** bump rollup from 2.56.2 to 2.56.3 ([#657](https://github.com/scaleway/scaleway-ui/issues/657)) ([ce243ac](https://github.com/scaleway/scaleway-ui/commit/ce243ac4424e7d9528592ed63c9cea1dcfb31ba9))
- **deps-dev:** bump webpack from 5.50.0 to 5.51.1 ([#653](https://github.com/scaleway/scaleway-ui/issues/653)) ([353a17c](https://github.com/scaleway/scaleway-ui/commit/353a17cca6b5feb2f0fa84e8313ded946d36f563))

### :gear: Features

- scrollView reminder range radio radioBorderedBox to typescript ([#634](https://github.com/scaleway/scaleway-ui/issues/634)) ([1a741b8](https://github.com/scaleway/scaleway-ui/commit/1a741b87ea61df3f5a4bbb78e2a8ecb4ba459c3e))

## [0.101.0](https://github.com/scaleway/scaleway-ui/compare/v0.100.1...v0.101.0) (2021-08-19)

### :zap: Refactor

- **typescript:** migrate VolumeSize, VerificationCode, TooltipIcon, Toaster, Table, TabGroup ([#631](https://github.com/scaleway/scaleway-ui/issues/631)) ([cc425a1](https://github.com/scaleway/scaleway-ui/commit/cc425a135224286d339ba2afae48166973296908))

### :package: Chore

- **deps:** bump react-datepicker from 4.2.0 to 4.2.1 ([#650](https://github.com/scaleway/scaleway-ui/issues/650)) ([99779a7](https://github.com/scaleway/scaleway-ui/commit/99779a7549c25b8812b696ebcc944a02bca4accf))

### :gear: Features

- migrate some components to typescript again ([#649](https://github.com/scaleway/scaleway-ui/issues/649)) ([98da359](https://github.com/scaleway/scaleway-ui/commit/98da359b67291e45f0b5290db8fe73a73839a35f))

### [0.100.1](https://github.com/scaleway/scaleway-ui/compare/v0.100.0...v0.100.1) (2021-08-18)

### :package: Chore

- ensure consistents emotion css classNames ([#641](https://github.com/scaleway/scaleway-ui/issues/641)) ([be8d9d4](https://github.com/scaleway/scaleway-ui/commit/be8d9d47f134f2bce76f9deb8c9a180088b8185f))
- force english lang for tests scripts ([#646](https://github.com/scaleway/scaleway-ui/issues/646)) ([5ba9d0d](https://github.com/scaleway/scaleway-ui/commit/5ba9d0d47abb7f732df3a80e7d1776e875a16760))
- **deps-dev:** bump @scaleway/use-i18n from 3.1.3 to 3.1.4 ([#644](https://github.com/scaleway/scaleway-ui/issues/644)) ([b641a0c](https://github.com/scaleway/scaleway-ui/commit/b641a0cf490bdfbfd295004230c42644120b4ee0))
- **deps-dev:** bump @types/intl-tel-input from 17.0.3 to 17.0.4 ([#643](https://github.com/scaleway/scaleway-ui/issues/643)) ([b11ee95](https://github.com/scaleway/scaleway-ui/commit/b11ee957793c427a1d1ac54fcb72d3d7a7a5203e))

### :bug: Bug Fixes

- **container:** some props was forward to the DOM ([#648](https://github.com/scaleway/scaleway-ui/issues/648)) ([9a80689](https://github.com/scaleway/scaleway-ui/commit/9a806899ca5a99b17e30d2ea9d8996e5a1a07d0b))
- **tooltip:** using unstable portal and set it to false ([#647](https://github.com/scaleway/scaleway-ui/issues/647)) ([e08bb87](https://github.com/scaleway/scaleway-ui/commit/e08bb87a09153d2d013f882b64d527846a0c4be6))

## [0.100.0](https://github.com/scaleway/scaleway-ui/compare/v0.99.0...v0.100.0) (2021-08-16)

### :zap: Refactor

- **typescript:** popper, button & placeholder components ([#635](https://github.com/scaleway/scaleway-ui/issues/635)) ([073e117](https://github.com/scaleway/scaleway-ui/commit/073e1170822bc9f50352d943a52ec52412b771c3))

### :package: Chore

- **deps-dev:** bump read-pkg from 6.0.0 to 7.0.0 ([#639](https://github.com/scaleway/scaleway-ui/issues/639)) ([7951e1d](https://github.com/scaleway/scaleway-ui/commit/7951e1d1b864ff037322012df1c2fcb918c24359))
- typescript migration checkbox container flexbox dot dotsteps extendedreminder ([#609](https://github.com/scaleway/scaleway-ui/issues/609)) ([315fd93](https://github.com/scaleway/scaleway-ui/commit/315fd93f869639a581d33b264c3615422b28f8ac))
- **deps-dev:** bump @scaleway/use-i18n from 3.1.2 to 3.1.3 ([#638](https://github.com/scaleway/scaleway-ui/issues/638)) ([ab496d8](https://github.com/scaleway/scaleway-ui/commit/ab496d8795510a7d5d21e13f854f66418a8f6181))
- **deps-dev:** bump semantic-release from 17.4.4 to 17.4.5 ([#640](https://github.com/scaleway/scaleway-ui/issues/640)) ([e6b4c01](https://github.com/scaleway/scaleway-ui/commit/e6b4c01ca8dfdded6fdf8edf9d743590bd3b6dc1))

### :gear: Features

- migrate some components to typescript ([#632](https://github.com/scaleway/scaleway-ui/issues/632)) ([a719a5d](https://github.com/scaleway/scaleway-ui/commit/a719a5dd52a66dd9672ba99d7abb5f37c980ceb1))

## [0.99.0](https://github.com/scaleway/scaleway-ui/compare/v0.98.4...v0.99.0) (2021-08-13)

### :package: Chore

- **deps-dev:** bump rollup-plugin-postcss from 4.0.0 to 4.0.1 ([#636](https://github.com/scaleway/scaleway-ui/issues/636)) ([ddf00ce](https://github.com/scaleway/scaleway-ui/commit/ddf00cee1a933fb9cc8ecbfbe992f76487168631))

### :gear: Features

- migrate Slider, Sphere, StealthCopiable, Switch and SwitchButton to typescript ([#626](https://github.com/scaleway/scaleway-ui/issues/626)) ([241fd58](https://github.com/scaleway/scaleway-ui/commit/241fd582cb360f69b234584107e89f206d287f06))

### [0.98.4](https://github.com/scaleway/scaleway-ui/compare/v0.98.3...v0.98.4) (2021-08-11)

### :bug: Bug Fixes

- **Expandable:** do not forward height to Box ([#633](https://github.com/scaleway/scaleway-ui/issues/633)) ([9610f69](https://github.com/scaleway/scaleway-ui/commit/9610f69517615290fe83ff08bf6cc2913a239936))

### [0.98.3](https://github.com/scaleway/scaleway-ui/compare/v0.98.2...v0.98.3) (2021-08-11)

### :package: Chore

- **deps:** bump @babel/runtime from 7.14.8 to 7.15.3 ([#629](https://github.com/scaleway/scaleway-ui/issues/629)) ([3e793f1](https://github.com/scaleway/scaleway-ui/commit/3e793f104ebfb988db3830c4d4602bf4e1d1ab81))
- **deps:** bump react-datepicker from 4.1.1 to 4.2.0 ([#616](https://github.com/scaleway/scaleway-ui/issues/616)) ([32029eb](https://github.com/scaleway/scaleway-ui/commit/32029ebcdea0f30fc3a8b86012cd9bffd2baaeeb))
- **deps-dev:** bump @scaleway/eslint-config-react from 2.0.0 to 2.1.0 ([#630](https://github.com/scaleway/scaleway-ui/issues/630)) ([9b4ef98](https://github.com/scaleway/scaleway-ui/commit/9b4ef9883a64063cddf77b99724026eacc358112))
- **deps-dev:** bump @storybook/react from 6.3.6 to 6.3.7 ([#624](https://github.com/scaleway/scaleway-ui/issues/624)) ([eeeb195](https://github.com/scaleway/scaleway-ui/commit/eeeb1951a8aac9ac1c09574cc10233860764ca47))
- **deps-dev:** bump rollup from 2.56.1 to 2.56.2 ([#627](https://github.com/scaleway/scaleway-ui/issues/627)) ([a0303f6](https://github.com/scaleway/scaleway-ui/commit/a0303f6d80c51bb3b7ab52772639f53e0015af1a))
- **deps-dev:** bump webpack from 5.49.0 to 5.50.0 ([#628](https://github.com/scaleway/scaleway-ui/issues/628)) ([4249d4a](https://github.com/scaleway/scaleway-ui/commit/4249d4aa7deb21ca9fa85efb4df655e01f95ff4f))

### :bug: Bug Fixes

- **Typography:** correct missing event in reakit event handlers ([#625](https://github.com/scaleway/scaleway-ui/issues/625)) ([41e0e6e](https://github.com/scaleway/scaleway-ui/commit/41e0e6efd74b931f28233285a4011849548cf4a1))

### [0.98.2](https://github.com/scaleway/scaleway-ui/compare/v0.98.1...v0.98.2) (2021-08-10)

### :package: Chore

- **deps-dev:** bump @scaleway/use-i18n from 3.1.1 to 3.1.2 ([#619](https://github.com/scaleway/scaleway-ui/issues/619)) ([06d08de](https://github.com/scaleway/scaleway-ui/commit/06d08de891f07d59a54b6e24950fe3f0f4529cd6))

### :bug: Bug Fixes

- correct BreadCrumbs export ([#620](https://github.com/scaleway/scaleway-ui/issues/620)) ([b828c95](https://github.com/scaleway/scaleway-ui/commit/b828c9513ff86eee731ae6fe94ea0ab846856458))

### [0.98.1](https://github.com/scaleway/scaleway-ui/compare/v0.98.0...v0.98.1) (2021-08-09)

### :bug: Bug Fixes

- correct Alert tests ([#613](https://github.com/scaleway/scaleway-ui/issues/613)) ([92508b9](https://github.com/scaleway/scaleway-ui/commit/92508b9430e05dbc2e901b071f1334d5ac4a8b7f))

## [0.98.0](https://github.com/scaleway/scaleway-ui/compare/v0.97.0...v0.98.0) (2021-08-09)

### :package: Chore

- **deps-dev:** bump @emotion/react from 11.4.0 to 11.4.1 ([#617](https://github.com/scaleway/scaleway-ui/issues/617)) ([6ed77c1](https://github.com/scaleway/scaleway-ui/commit/6ed77c1b9e2061c105a1e9ef03d2b95bd7f5935b))
- **deps-dev:** bump rollup from 2.56.0 to 2.56.1 ([#615](https://github.com/scaleway/scaleway-ui/issues/615)) ([8b7fb3b](https://github.com/scaleway/scaleway-ui/commit/8b7fb3bdf7267596cb5752792c5e081717c2e894))
- **deps-dev:** bump webpack from 5.48.0 to 5.49.0 ([#614](https://github.com/scaleway/scaleway-ui/issues/614)) ([901957a](https://github.com/scaleway/scaleway-ui/commit/901957a87dedfa058e2a8717a226c9f303eec089))

### :gear: Features

- migrate highly depended on components to typescript ([#612](https://github.com/scaleway/scaleway-ui/issues/612)) ([fe40190](https://github.com/scaleway/scaleway-ui/commit/fe40190bbb4369ecafb7306c86a4df3bb04adabe))

## [0.97.0](https://github.com/scaleway/scaleway-ui/compare/v0.96.0...v0.97.0) (2021-08-06)

### :package: Chore

- **deps:** bump actions/setup-node from 2.3.1 to 2.3.2 ([#602](https://github.com/scaleway/scaleway-ui/issues/602)) ([b58321f](https://github.com/scaleway/scaleway-ui/commit/b58321f87c7e5daca8006bf428482627f0a78631))
- **deps:** bump actions/setup-node from 2.3.2 to 2.4.0 ([#610](https://github.com/scaleway/scaleway-ui/issues/610)) ([f7a773d](https://github.com/scaleway/scaleway-ui/commit/f7a773d47b7b8f5c9d76b4cf35fc7e3229259e12))
- **deps-dev:** bump @babel/core from 7.14.8 to 7.15.0 ([#606](https://github.com/scaleway/scaleway-ui/issues/606)) ([c85c665](https://github.com/scaleway/scaleway-ui/commit/c85c665a23b2a75de9e50ceab252fa963227acdd))
- **deps-dev:** bump @babel/eslint-parser from 7.14.9 to 7.15.0 ([#608](https://github.com/scaleway/scaleway-ui/issues/608)) ([af8f2d2](https://github.com/scaleway/scaleway-ui/commit/af8f2d2f093a061d211bab37dc822c4973a03a5e))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#605](https://github.com/scaleway/scaleway-ui/issues/605)) ([d54a2eb](https://github.com/scaleway/scaleway-ui/commit/d54a2eb8ee55d5c7a9e51ba9a9804763a12bcdc3))
- **deps-dev:** bump @babel/preset-env from 7.14.9 to 7.15.0 ([#607](https://github.com/scaleway/scaleway-ui/issues/607)) ([ad6fff2](https://github.com/scaleway/scaleway-ui/commit/ad6fff20ac8b39e921672bf2063e30389d01273c))
- **deps-dev:** bump @babel/preset-typescript from 7.14.5 to 7.15.0 ([#603](https://github.com/scaleway/scaleway-ui/issues/603)) ([f7d6644](https://github.com/scaleway/scaleway-ui/commit/f7d66442e50dc2ec64e794da4f08b79a9fd8bcc3))
- **deps-dev:** bump lint-staged from 11.1.1 to 11.1.2 ([#611](https://github.com/scaleway/scaleway-ui/issues/611)) ([e307865](https://github.com/scaleway/scaleway-ui/commit/e3078655c0421103f09bbe7163787d8b3c753ecf))
- **deps-dev:** bump rollup from 2.55.1 to 2.56.0 ([#604](https://github.com/scaleway/scaleway-ui/issues/604)) ([3c48104](https://github.com/scaleway/scaleway-ui/commit/3c4810442833836356f4c0d9184e9bd813a1bcb4))

### :gear: Features

- typescript migration of alert and icon ([#595](https://github.com/scaleway/scaleway-ui/issues/595)) ([3edc43b](https://github.com/scaleway/scaleway-ui/commit/3edc43ba4af733ee6f662adf01973eaadbc6d2c1))

## [0.96.0](https://github.com/scaleway/scaleway-ui/compare/v0.95.0...v0.96.0) (2021-08-04)

### :package: Chore

- **deps:** bump actions/setup-node from 2.3.0 to 2.3.1 ([#601](https://github.com/scaleway/scaleway-ui/issues/601)) ([09b2662](https://github.com/scaleway/scaleway-ui/commit/09b2662ec1f7d44f414d5e47f9932375f727dafa))

### :gear: Features

- **a11y:** add tabs arrow navigation ([#600](https://github.com/scaleway/scaleway-ui/issues/600)) ([82bd0d3](https://github.com/scaleway/scaleway-ui/commit/82bd0d3eb8d91097907c9485e434e9883fbd8a90))

## [0.95.0](https://github.com/scaleway/scaleway-ui/compare/v0.94.3...v0.95.0) (2021-08-02)

### :gear: Features

- migration utils and theme to typescript ([#593](https://github.com/scaleway/scaleway-ui/issues/593)) ([66601c3](https://github.com/scaleway/scaleway-ui/commit/66601c34f354d4e0a2cbf80e1c267d807b2b1b6c))

### :package: Chore

- **deps-dev:** bump webpack from 5.47.1 to 5.48.0 ([#599](https://github.com/scaleway/scaleway-ui/issues/599)) ([4aea856](https://github.com/scaleway/scaleway-ui/commit/4aea856215c3bf10f7061dad0bc4ed6bdd9f399b))
- start migration to typescript ([#589](https://github.com/scaleway/scaleway-ui/issues/589)) ([918fa8c](https://github.com/scaleway/scaleway-ui/commit/918fa8c88c74cec083b82adc693ba66245c14d87))
- **deps:** bump react-countup from 5.1.0 to 5.2.0 ([#592](https://github.com/scaleway/scaleway-ui/issues/592)) ([37bbb8f](https://github.com/scaleway/scaleway-ui/commit/37bbb8f6340919f82f6eb38520de244a78d39eb3))
- **deps-dev:** bump @babel/eslint-parser from 7.14.7 to 7.14.9 ([#596](https://github.com/scaleway/scaleway-ui/issues/596)) ([a1a9853](https://github.com/scaleway/scaleway-ui/commit/a1a9853d6cceb6d5a6b367c28a26e538a04505c6))
- **deps-dev:** bump @babel/preset-env from 7.14.8 to 7.14.9 ([#597](https://github.com/scaleway/scaleway-ui/issues/597)) ([279af0c](https://github.com/scaleway/scaleway-ui/commit/279af0ceb51aee67b438a7072510110ed428294d))
- **deps-dev:** bump eslint from 7.31.0 to 7.32.0 ([#598](https://github.com/scaleway/scaleway-ui/issues/598)) ([1b60bd2](https://github.com/scaleway/scaleway-ui/commit/1b60bd28975c396d1459955af42fc6032b92ce4e))
- **deps-dev:** bump rollup from 2.55.0 to 2.55.1 ([#591](https://github.com/scaleway/scaleway-ui/issues/591)) ([6d99cd0](https://github.com/scaleway/scaleway-ui/commit/6d99cd00508a5c046ab3bc47cb581da59d525afe))
- **deps-dev:** bump webpack from 5.47.0 to 5.47.1 ([#590](https://github.com/scaleway/scaleway-ui/issues/590)) ([aadf293](https://github.com/scaleway/scaleway-ui/commit/aadf293372b35bc5fb35d828dca7e346ab37af15))

### [0.94.3](https://github.com/scaleway/scaleway-ui/compare/v0.94.2...v0.94.3) (2021-07-29)

### :package: Chore

- **deps:** bump @babel/runtime from 7.14.6 to 7.14.8 ([#553](https://github.com/scaleway/scaleway-ui/issues/553)) ([f2b494d](https://github.com/scaleway/scaleway-ui/commit/f2b494d69076a6fb9b8285d7f07437a4f8fd58c7))
- **deps:** bump @scaleway/random-name from 1.3.2 to 2.0.0 ([#554](https://github.com/scaleway/scaleway-ui/issues/554)) ([97b2d63](https://github.com/scaleway/scaleway-ui/commit/97b2d636a60f23cd25e46e7a7e5a62a61f3d071e))
- **deps:** bump @scaleway/random-name from 2.0.0 to 2.1.0 ([#558](https://github.com/scaleway/scaleway-ui/issues/558)) ([87553a5](https://github.com/scaleway/scaleway-ui/commit/87553a57a98d7c2fe1bb12a14b1eb8a83de8aef8))
- **deps:** bump actions/setup-node from 2.2.0 to 2.3.0 ([#550](https://github.com/scaleway/scaleway-ui/issues/550)) ([e109a43](https://github.com/scaleway/scaleway-ui/commit/e109a4327450e6a4326d466d693290e935f01851))
- **deps:** bump codecov/codecov-action from 1.5.2 to 2.0.1 ([#549](https://github.com/scaleway/scaleway-ui/issues/549)) ([1225462](https://github.com/scaleway/scaleway-ui/commit/1225462b943d35564c2dab6b3b764cb746e79af2))
- **deps:** bump codecov/codecov-action from 2.0.1 to 2.0.2 ([#572](https://github.com/scaleway/scaleway-ui/issues/572)) ([41cffa3](https://github.com/scaleway/scaleway-ui/commit/41cffa3815d045704383b1eb5176d2fd501013db))
- **deps:** bump react-countup from 4.4.0 to 5.1.0 ([#586](https://github.com/scaleway/scaleway-ui/issues/586)) ([ceb4e8e](https://github.com/scaleway/scaleway-ui/commit/ceb4e8ee775b1d8ac2308aca8fcdc472e9709924))
- **deps-dev:** bump @babel/core from 7.14.6 to 7.14.8 ([#551](https://github.com/scaleway/scaleway-ui/issues/551)) ([3ca56e5](https://github.com/scaleway/scaleway-ui/commit/3ca56e5d3a2cfb882a6f91ba47a6ddcebf39eb8d))
- **deps-dev:** bump @babel/preset-env from 7.14.7 to 7.14.8 ([#555](https://github.com/scaleway/scaleway-ui/issues/555)) ([7083644](https://github.com/scaleway/scaleway-ui/commit/70836444655864644b8109d31c46b8e29919f683))
- **deps-dev:** bump @commitlint/cli from 12.1.4 to 13.1.0 ([#569](https://github.com/scaleway/scaleway-ui/issues/569)) ([6c3582d](https://github.com/scaleway/scaleway-ui/commit/6c3582d53491867f75e314788620a1a1a7066de6))
- **deps-dev:** bump @commitlint/config-conventional ([#568](https://github.com/scaleway/scaleway-ui/issues/568)) ([556a899](https://github.com/scaleway/scaleway-ui/commit/556a89932f1f8d7bc6453e7f301decb9df7e6626))
- **deps-dev:** bump @rollup/plugin-node-resolve from 13.0.2 to 13.0.4 ([#578](https://github.com/scaleway/scaleway-ui/issues/578)) ([543f92a](https://github.com/scaleway/scaleway-ui/commit/543f92a009972b59f77b8d2f9849637b4aa0c4c3))
- **deps-dev:** bump @rollup/plugin-url from 6.0.0 to 6.1.0 ([#582](https://github.com/scaleway/scaleway-ui/issues/582)) ([63e8106](https://github.com/scaleway/scaleway-ui/commit/63e81067b4bb7a4c0174194d8e9fe118682b287b))
- **deps-dev:** bump @scaleway/use-i18n from 2.2.1 to 3.0.0 ([#552](https://github.com/scaleway/scaleway-ui/issues/552)) ([2c460fe](https://github.com/scaleway/scaleway-ui/commit/2c460fe4d1f17560b37f99aa055ab78a28b91c31))
- **deps-dev:** bump @scaleway/use-i18n from 3.0.0 to 3.1.1 ([#559](https://github.com/scaleway/scaleway-ui/issues/559)) ([ddc4e94](https://github.com/scaleway/scaleway-ui/commit/ddc4e94c4bb8ee1da7475e5b6ac779a60f446601))
- **deps-dev:** bump @storybook/addons from 6.3.5 to 6.3.6 ([#576](https://github.com/scaleway/scaleway-ui/issues/576)) ([45b77b8](https://github.com/scaleway/scaleway-ui/commit/45b77b897b5f8b1e7ab215c9c93521ac407c4895))
- **deps-dev:** bump @storybook/builder-webpack5 from 6.3.4 to 6.3.5 ([#561](https://github.com/scaleway/scaleway-ui/issues/561)) ([4394718](https://github.com/scaleway/scaleway-ui/commit/4394718eb223779c2d345465b215c1746831b0c5))
- **deps-dev:** bump @testing-library/user-event from 13.2.0 to 13.2.1 ([#579](https://github.com/scaleway/scaleway-ui/issues/579)) ([185bd22](https://github.com/scaleway/scaleway-ui/commit/185bd222e3e22cd3c02a0f68af3aeb82016dc233))
- **deps-dev:** bump date-fns from 2.22.1 to 2.23.0 ([#570](https://github.com/scaleway/scaleway-ui/issues/570)) ([232e5f6](https://github.com/scaleway/scaleway-ui/commit/232e5f61b92487024f9bc7b42f25998c1c6668f2))
- **deps-dev:** bump lint-staged from 11.0.1 to 11.1.1 ([#574](https://github.com/scaleway/scaleway-ui/issues/574)) ([82032e0](https://github.com/scaleway/scaleway-ui/commit/82032e030cf0776ff8106b47b85a9074e1e9655d))
- **deps-dev:** bump postcss from 8.3.5 to 8.3.6 ([#560](https://github.com/scaleway/scaleway-ui/issues/560)) ([c6aadf7](https://github.com/scaleway/scaleway-ui/commit/c6aadf759e9c55ba3396da36e8fa93c9e8d7d0cb))
- **deps-dev:** bump regenerator-runtime from 0.13.7 to 0.13.9 ([#565](https://github.com/scaleway/scaleway-ui/issues/565)) ([990ad0b](https://github.com/scaleway/scaleway-ui/commit/990ad0b7aad0dffdac9f69cbdee548d21568489c))
- **deps-dev:** bump rollup from 2.53.2 to 2.53.3 ([#557](https://github.com/scaleway/scaleway-ui/issues/557)) ([a0a2872](https://github.com/scaleway/scaleway-ui/commit/a0a2872dfcca1a4255f9a42d11fc39c511612cdb))
- **deps-dev:** bump rollup from 2.53.3 to 2.54.0 ([#573](https://github.com/scaleway/scaleway-ui/issues/573)) ([89bcab4](https://github.com/scaleway/scaleway-ui/commit/89bcab481ead3796bae5dfb1f0cc4dfc21cbe929))
- **deps-dev:** bump rollup from 2.54.0 to 2.55.0 ([#584](https://github.com/scaleway/scaleway-ui/issues/584)) ([91e9015](https://github.com/scaleway/scaleway-ui/commit/91e901514aebce8cab51d32e006fcb7a3fcdfc44))
- **deps-dev:** bump webpack from 5.45.1 to 5.46.0 ([#563](https://github.com/scaleway/scaleway-ui/issues/563)) ([b32d066](https://github.com/scaleway/scaleway-ui/commit/b32d0663ba8f44e8a6fef064109049c5bb0aa36e))
- **deps-dev:** bump webpack from 5.46.0 to 5.47.0 ([#585](https://github.com/scaleway/scaleway-ui/issues/585)) ([ac7e13e](https://github.com/scaleway/scaleway-ui/commit/ac7e13e3070de0b4b21d8ed7a96fe32b0623420c))

### :memo: Documentation

- updated all t components documentation ([#580](https://github.com/scaleway/scaleway-ui/issues/580)) ([0cc7ee8](https://github.com/scaleway/scaleway-ui/commit/0cc7ee8af315f1e5ebd199584584914e8505cd03))
- **s:** updated all S components docs ([#497](https://github.com/scaleway/scaleway-ui/issues/497)) ([1c1ad31](https://github.com/scaleway/scaleway-ui/commit/1c1ad31f734602d145a3703412a9c754c3170a60))
- **storybook:** fixed argstable ([#532](https://github.com/scaleway/scaleway-ui/issues/532)) ([89c6059](https://github.com/scaleway/scaleway-ui/commit/89c60591bb3b4f4c9989ee2f540a4ced78838fdc))

### :zap: Refactor

- kickstart typescript migration ([#583](https://github.com/scaleway/scaleway-ui/issues/583)) ([21872f2](https://github.com/scaleway/scaleway-ui/commit/21872f2e6255bee891c57e5b7ae54372e8c80589))
- migrate src/helpers to typescript ([#588](https://github.com/scaleway/scaleway-ui/issues/588)) ([2dc9637](https://github.com/scaleway/scaleway-ui/commit/2dc96374a159320caef992df186c45e410410ff9))

### :bug: Bug Fixes

- **theme:** fixed background richSelect for theming ([#587](https://github.com/scaleway/scaleway-ui/issues/587)) ([70d69f8](https://github.com/scaleway/scaleway-ui/commit/70d69f8caa6df802d23c4d1649c78137ce90893d))

### [0.94.2](https://github.com/scaleway/scaleway-ui/compare/v0.94.1...v0.94.2) (2021-07-19)

### :package: Chore

- **deps-dev:** bump @rollup/plugin-node-resolve from 13.0.1 to 13.0.2 ([#538](https://github.com/scaleway/scaleway-ui/issues/538)) ([2259cce](https://github.com/scaleway/scaleway-ui/commit/2259ccef47696d4439a74518c52a8af45f489142))
- **deps-dev:** bump @scaleway/use-i18n from 2.2.0 to 2.2.1 ([#534](https://github.com/scaleway/scaleway-ui/issues/534)) ([dec1498](https://github.com/scaleway/scaleway-ui/commit/dec1498fa863901923b098d576e3376bd5b78510))
- **deps-dev:** bump @testing-library/user-event from 13.1.9 to 13.2.0 ([#540](https://github.com/scaleway/scaleway-ui/issues/540)) ([0fab03a](https://github.com/scaleway/scaleway-ui/commit/0fab03a1f4e3eb075c057c5f3a0a20a707380e49))
- **deps-dev:** bump eslint from 7.30.0 to 7.31.0 ([#539](https://github.com/scaleway/scaleway-ui/issues/539)) ([0217a58](https://github.com/scaleway/scaleway-ui/commit/0217a589ada479db4cd9d58f5c946a232d5e2880))
- **deps-dev:** bump rollup from 2.53.1 to 2.53.2 ([#537](https://github.com/scaleway/scaleway-ui/issues/537)) ([d074545](https://github.com/scaleway/scaleway-ui/commit/d074545603c30e99ea4a35e45e3e4a2d7940ec2a))
- **deps-dev:** bump webpack from 5.44.0 to 5.45.1 ([#541](https://github.com/scaleway/scaleway-ui/issues/541)) ([0ecfbf4](https://github.com/scaleway/scaleway-ui/commit/0ecfbf477d781b1437c174b76a0cc2ca3d5b0113))

### :bug: Bug Fixes

- list empty component ([#542](https://github.com/scaleway/scaleway-ui/issues/542)) ([cf2be4d](https://github.com/scaleway/scaleway-ui/commit/cf2be4db223d139183661d2ae5d99faacaf96b8d))

### [0.94.1](https://github.com/scaleway/scaleway-ui/compare/v0.94.0...v0.94.1) (2021-07-15)

### :rocket: Performance

- **size:** adding size script and workflow ([#536](https://github.com/scaleway/scaleway-ui/issues/536)) ([469580e](https://github.com/scaleway/scaleway-ui/commit/469580e4f4d46e09563482cd23287a52d349b21e))

## [0.94.0](https://github.com/scaleway/scaleway-ui/compare/v0.93.1...v0.94.0) (2021-07-15)

### :package: Chore

- **deps-dev:** bump lint-staged from 11.0.0 to 11.0.1 ([#535](https://github.com/scaleway/scaleway-ui/issues/535)) ([7a5a55d](https://github.com/scaleway/scaleway-ui/commit/7a5a55dee6c8fd3b2b39d4a58ab69ae0dec6509c))

### :gear: Features

- merge progressbar into breadcrumbs ([#505](https://github.com/scaleway/scaleway-ui/issues/505)) ([0ffd177](https://github.com/scaleway/scaleway-ui/commit/0ffd17795aee9b5e08ed9c25b4b9e3302925eba6))

### [0.93.1](https://github.com/scaleway/scaleway-ui/compare/v0.93.0...v0.93.1) (2021-07-13)

### :package: Chore

- **deps:** bump docker/setup-buildx-action from 1.5.0 to 1.5.1 ([#533](https://github.com/scaleway/scaleway-ui/issues/533)) ([6756c29](https://github.com/scaleway/scaleway-ui/commit/6756c293dab4729ff29a302837da35ea7d3f738f))
- **deps-dev:** bump @scaleway/use-i18n from 2.1.4 to 2.2.0 ([#530](https://github.com/scaleway/scaleway-ui/issues/530)) ([5d5d0b1](https://github.com/scaleway/scaleway-ui/commit/5d5d0b1ae77e72ada8a97acf934c5a125294624f))
- upgrade eslint-mdx ([#529](https://github.com/scaleway/scaleway-ui/issues/529)) ([8d7909d](https://github.com/scaleway/scaleway-ui/commit/8d7909d228a64e663ec5e1a21ebff301b7aa79e8))
- **deps-dev:** bump rollup from 2.53.0 to 2.53.1 ([#531](https://github.com/scaleway/scaleway-ui/issues/531)) ([588edac](https://github.com/scaleway/scaleway-ui/commit/588edac3758616e9d80e91f2aaca11876d0cfffe))

### :bug: Bug Fixes

- **menu:** allow toggle props ([#521](https://github.com/scaleway/scaleway-ui/issues/521)) ([aa29f30](https://github.com/scaleway/scaleway-ui/commit/aa29f30fe7a5945816e0b0c18749999df10e1abb))

## [0.93.0](https://github.com/scaleway/scaleway-ui/compare/v0.92.1...v0.93.0) (2021-07-09)

### :gear: Features

- list and pagination improvement ([#520](https://github.com/scaleway/scaleway-ui/issues/520)) ([36f8612](https://github.com/scaleway/scaleway-ui/commit/36f861266fdadb4e2d968238822e62056bb3b1ec))

### [0.92.1](https://github.com/scaleway/scaleway-ui/compare/v0.92.0...v0.92.1) (2021-07-09)

### :bug: Bug Fixes

- tooltip flexbox drop ([#512](https://github.com/scaleway/scaleway-ui/issues/512)) ([0ba8fe6](https://github.com/scaleway/scaleway-ui/commit/0ba8fe6b3b59f5279b6c71a62393407448f29fd9))

### :package: Chore

- **deps-dev:** bump @storybook/addon-essentials from 6.3.3 to 6.3.4 ([#522](https://github.com/scaleway/scaleway-ui/issues/522)) ([9f679bb](https://github.com/scaleway/scaleway-ui/commit/9f679bbafbf23c86b7048e4a0677cd2b6568b790))
- **deps-dev:** bump @storybook/builder-webpack5 from 6.3.2 to 6.3.3 ([#515](https://github.com/scaleway/scaleway-ui/issues/515)) ([11e06fd](https://github.com/scaleway/scaleway-ui/commit/11e06fdda5330abc4ccfdb1272930effd57990e1))
- **deps-dev:** bump rollup from 2.52.8 to 2.53.0 ([#526](https://github.com/scaleway/scaleway-ui/issues/526)) ([8a99d40](https://github.com/scaleway/scaleway-ui/commit/8a99d40293d3d10180d0d4ee0bdeb66069c463b8))
- **deps-dev:** bump rollup-plugin-visualizer from 5.5.1 to 5.5.2 ([#523](https://github.com/scaleway/scaleway-ui/issues/523)) ([9ff715a](https://github.com/scaleway/scaleway-ui/commit/9ff715a0d80079110aa45a4aefce4de2aa280c64))

## [0.92.0](https://github.com/scaleway/scaleway-ui/compare/v0.91.4...v0.92.0) (2021-07-07)

### :package: Chore

- **deps-dev:** bump husky from 7.0.0 to 7.0.1 ([#510](https://github.com/scaleway/scaleway-ui/issues/510)) ([31fd300](https://github.com/scaleway/scaleway-ui/commit/31fd3006bd3c94821da32fc49bca3c98192f82ac))
- **deps-dev:** bump rollup from 2.52.7 to 2.52.8 ([#509](https://github.com/scaleway/scaleway-ui/issues/509)) ([334adcd](https://github.com/scaleway/scaleway-ui/commit/334adcdebb150ec3ac934b80fc6ddad234da760f))

### :memo: Documentation

- r components ([#494](https://github.com/scaleway/scaleway-ui/issues/494)) ([1f4452f](https://github.com/scaleway/scaleway-ui/commit/1f4452f82c635bfdaf94c5b0d326574e467e620a))

### :gear: Features

- access pagination from list render props ([#511](https://github.com/scaleway/scaleway-ui/issues/511)) ([57ca1da](https://github.com/scaleway/scaleway-ui/commit/57ca1da2001cd5346c32bdac40778fa657a53a95))

### [0.91.4](https://github.com/scaleway/scaleway-ui/compare/v0.91.3...v0.91.4) (2021-07-06)

### :bug: Bug Fixes

- tooltip display ([#508](https://github.com/scaleway/scaleway-ui/issues/508)) ([06b71f9](https://github.com/scaleway/scaleway-ui/commit/06b71f929455fa93f3051acd7498e0cd9af4a83f))

### [0.91.3](https://github.com/scaleway/scaleway-ui/compare/v0.91.2...v0.91.3) (2021-07-06)

### :white_check_mark: Test

- add u and v components ([#491](https://github.com/scaleway/scaleway-ui/issues/491)) ([7f05701](https://github.com/scaleway/scaleway-ui/commit/7f05701b75f19a31fe450ef4c5cf04d61bd0764d))

### :package: Chore

- **deps-dev:** bump @scaleway/eslint-config-react from 1.5.0 to 2.0.0 ([#507](https://github.com/scaleway/scaleway-ui/issues/507)) ([925aefe](https://github.com/scaleway/scaleway-ui/commit/925aefe3ddc4c22d3c10005fc8a031328ab5b9d3))
- **deps-dev:** bump @scaleway/use-i18n from 2.1.3 to 2.1.4 ([#506](https://github.com/scaleway/scaleway-ui/issues/506)) ([7079a3b](https://github.com/scaleway/scaleway-ui/commit/7079a3bdf3a60f8e128f409915c68b5eb90de35f))
- **deps-dev:** bump husky from 6.0.0 to 7.0.0 ([#493](https://github.com/scaleway/scaleway-ui/issues/493)) ([32b154c](https://github.com/scaleway/scaleway-ui/commit/32b154c9d6969a574e518c0f6e45ed966a83df36))

### :bug: Bug Fixes

- **menu:** disabled props wasn't forward to component ([#504](https://github.com/scaleway/scaleway-ui/issues/504)) ([44d4d5e](https://github.com/scaleway/scaleway-ui/commit/44d4d5ed3a8bb064bcdff7d5314cdf9102708496))

### [0.91.2](https://github.com/scaleway/scaleway-ui/compare/v0.91.1...v0.91.2) (2021-07-05)

### :bug: Bug Fixes

- pagination control infinite rendering ([#501](https://github.com/scaleway/scaleway-ui/issues/501)) ([24324aa](https://github.com/scaleway/scaleway-ui/commit/24324aa190aa8fad46cd5b7964bea592e5d61e60))

### :package: Chore

- **deps:** bump docker/setup-buildx-action from 1.4.1 to 1.5.0 ([#502](https://github.com/scaleway/scaleway-ui/issues/502)) ([aabdfb2](https://github.com/scaleway/scaleway-ui/commit/aabdfb2496d3eb8cfca5a4a2a4e9b04872489364))
- **deps:** bump react-countup from 4.3.3 to 4.4.0 ([#483](https://github.com/scaleway/scaleway-ui/issues/483)) ([c7e8ba5](https://github.com/scaleway/scaleway-ui/commit/c7e8ba5680d924cd1cb33f002a553d6afa954952))
- **deps-dev:** bump eslint from 7.29.0 to 7.30.0 ([#503](https://github.com/scaleway/scaleway-ui/issues/503)) ([05f3f77](https://github.com/scaleway/scaleway-ui/commit/05f3f77c6a3970d2c737f316b035ee618790fa1f))

### [0.91.1](https://github.com/scaleway/scaleway-ui/compare/v0.91.0...v0.91.1) (2021-07-02)

### :bug: Bug Fixes

- **merge:** merged NotificationBar, IconMessage, Information into Alert ([#473](https://github.com/scaleway/scaleway-ui/issues/473)) ([2347942](https://github.com/scaleway/scaleway-ui/commit/23479428cfa3c5d4d0af7f1353cfc18a157e45e2))

## [0.91.0](https://github.com/scaleway/scaleway-ui/compare/v0.90.2...v0.91.0) (2021-07-02)

### :package: Chore

- **deps:** bump actions/setup-node from 2.1.5 to 2.2.0 ([#486](https://github.com/scaleway/scaleway-ui/issues/486)) ([32a03a7](https://github.com/scaleway/scaleway-ui/commit/32a03a79b144c941d956100be01aad65df797bf3))
- **deps:** bump docker/build-push-action from 2.5.0 to 2.6.1 ([#498](https://github.com/scaleway/scaleway-ui/issues/498)) ([7652ec5](https://github.com/scaleway/scaleway-ui/commit/7652ec58c83c9191456eabfe0c336dce35f7a581))
- **deps-dev:** bump rollup from 2.52.6 to 2.52.7 ([#499](https://github.com/scaleway/scaleway-ui/issues/499)) ([f8fc987](https://github.com/scaleway/scaleway-ui/commit/f8fc98759a29b2a0c4eb0cf836bd77ccca61b340))

### :gear: Features

- add some accessibility, customization on list and pagination ([#500](https://github.com/scaleway/scaleway-ui/issues/500)) ([da1b8a5](https://github.com/scaleway/scaleway-ui/commit/da1b8a553e52594d4b7f5fc22b208ecfd4eec80e))

### [0.90.2](https://github.com/scaleway/scaleway-ui/compare/v0.90.1...v0.90.2) (2021-07-02)

### :package: Chore

- **deps-dev:** bump rollup from 2.52.4 to 2.52.6 ([#492](https://github.com/scaleway/scaleway-ui/issues/492)) ([e960cba](https://github.com/scaleway/scaleway-ui/commit/e960cbafe2272c65830cd8af5e60f68f35d146fd))

### :bug: Bug Fixes

- list and pagination integration ([#496](https://github.com/scaleway/scaleway-ui/issues/496)) ([6f07922](https://github.com/scaleway/scaleway-ui/commit/6f07922a1c34443f9d320ab017265232e9acb4db))

### [0.90.1](https://github.com/scaleway/scaleway-ui/compare/v0.90.0...v0.90.1) (2021-07-01)

### :memo: Documentation

- group components by design system kinds ([#485](https://github.com/scaleway/scaleway-ui/issues/485)) ([ae40369](https://github.com/scaleway/scaleway-ui/commit/ae4036984bb019d6e1e9f2b3cb9a2b10017cdf6a))

### :package: Chore

- **deps-dev:** bump @storybook/builder-webpack5 from 6.3.1 to 6.3.2 ([#487](https://github.com/scaleway/scaleway-ui/issues/487)) ([3828de5](https://github.com/scaleway/scaleway-ui/commit/3828de5a907bdc143e254847d692e3e5b425e2c9))

### :bug: Bug Fixes

- export of pagination and list ([#495](https://github.com/scaleway/scaleway-ui/issues/495)) ([8083410](https://github.com/scaleway/scaleway-ui/commit/80834106f0fccc5feaa8d8dc32e642b80b6a1d14))

## [0.90.0](https://github.com/scaleway/scaleway-ui/compare/v0.89.0...v0.90.0) (2021-06-30)

### :zap: Refactor

- remove RichSelectTags ([#472](https://github.com/scaleway/scaleway-ui/issues/472)) ([dc2fa3f](https://github.com/scaleway/scaleway-ui/commit/dc2fa3f08ea38722e801537a1dbf050a0e92eb2f))

### :gear: Features

- add list and pagination component ([#419](https://github.com/scaleway/scaleway-ui/issues/419)) ([#449](https://github.com/scaleway/scaleway-ui/issues/449)) ([8c5ccca](https://github.com/scaleway/scaleway-ui/commit/8c5ccca12a7f162fddb587d6b114c07f3699b9c6)), closes [#454](https://github.com/scaleway/scaleway-ui/issues/454)

## [0.89.0](https://github.com/scaleway/scaleway-ui/compare/v0.88.0...v0.89.0) (2021-06-30)

### :memo: Documentation

- add documentation about testing ([#448](https://github.com/scaleway/scaleway-ui/issues/448)) ([dacb58e](https://github.com/scaleway/scaleway-ui/commit/dacb58e896116e3c8d2335c98724bfc441a6d642))
- add e and g documentation ([#459](https://github.com/scaleway/scaleway-ui/issues/459)) ([a4328bc](https://github.com/scaleway/scaleway-ui/commit/a4328bc1ddd928d53e5c4b1ed0db28a64822399e))
- add i documentation ([#461](https://github.com/scaleway/scaleway-ui/issues/461)) ([b69c11b](https://github.com/scaleway/scaleway-ui/commit/b69c11bb1ca4f0196e0408824423e30ca367ad3b))

### :zap: Refactor

- merge icon, menuicon and categoryicon ([#467](https://github.com/scaleway/scaleway-ui/issues/467)) ([bf16ce6](https://github.com/scaleway/scaleway-ui/commit/bf16ce621d8662646fd7afeac872c8dba3b954b1))

### :gear: Features

- add d components documentation ([#471](https://github.com/scaleway/scaleway-ui/issues/471)) ([e3907fc](https://github.com/scaleway/scaleway-ui/commit/e3907fc7983f6d6bc3e648bc20fadfa1f3be25c4))

### :package: Chore

- **deps:** bump docker/login-action from 1.9.0 to 1.10.0 ([#462](https://github.com/scaleway/scaleway-ui/issues/462)) ([c64f880](https://github.com/scaleway/scaleway-ui/commit/c64f8805e44aac35adf4a8799eca82997c3a0ef1))
- **deps:** bump docker/setup-buildx-action from 1.3.0 to 1.4.1 ([#481](https://github.com/scaleway/scaleway-ui/issues/481)) ([fc42c55](https://github.com/scaleway/scaleway-ui/commit/fc42c55060a759c8558cd40431a593763aec7504))
- **deps-dev:** bump @babel/eslint-parser from 7.14.5 to 7.14.7 ([#457](https://github.com/scaleway/scaleway-ui/issues/457)) ([0264b87](https://github.com/scaleway/scaleway-ui/commit/0264b87f14ada8329bf6bf5ac4f88c5a390661df))
- **deps-dev:** bump @babel/preset-env from 7.14.5 to 7.14.7 ([#458](https://github.com/scaleway/scaleway-ui/issues/458)) ([55be097](https://github.com/scaleway/scaleway-ui/commit/55be0975b08d48ff66485a7a3d6b7ffad0dcde4f))
- **deps-dev:** bump @storybook/addon-links from 6.2.9 to 6.3.0 ([#463](https://github.com/scaleway/scaleway-ui/issues/463)) ([9118dab](https://github.com/scaleway/scaleway-ui/commit/9118dab259383109eebf4d2ef028b32f76c541f7))
- **deps-dev:** bump @storybook/builder-webpack5 from 6.3.0 to 6.3.1 ([#474](https://github.com/scaleway/scaleway-ui/issues/474)) ([1dfaa5f](https://github.com/scaleway/scaleway-ui/commit/1dfaa5fd3d53130c20defe8f905a45962741cb3e))
- **deps-dev:** bump @storybook/manager-webpack5 from 6.3.0 to 6.3.1 ([#478](https://github.com/scaleway/scaleway-ui/issues/478)) ([7a815e3](https://github.com/scaleway/scaleway-ui/commit/7a815e3805d637016d9f7d9c26b133491d912249))
- **deps-dev:** bump @testing-library/react from 11.2.7 to 12.0.0 ([#468](https://github.com/scaleway/scaleway-ui/issues/468)) ([9a446a5](https://github.com/scaleway/scaleway-ui/commit/9a446a5f7f73f9285a9f43578b83d1ee6a495701))
- **deps-dev:** bump @testing-library/user-event from 13.1.2 to 13.1.9 ([#366](https://github.com/scaleway/scaleway-ui/issues/366)) ([d60cdf2](https://github.com/scaleway/scaleway-ui/commit/d60cdf2753dc817f3ee8ff0e369b46b5e0a40771))
- **deps-dev:** bump eslint from 7.28.0 to 7.29.0 ([#456](https://github.com/scaleway/scaleway-ui/issues/456)) ([1538285](https://github.com/scaleway/scaleway-ui/commit/153828590c58babc65839e5a9966f73c60783c08))
- **deps-dev:** bump jest from 27.0.4 to 27.0.5 ([#460](https://github.com/scaleway/scaleway-ui/issues/460)) ([f61c9e9](https://github.com/scaleway/scaleway-ui/commit/f61c9e96287f9f871e28eef0624e752ae9fbb49b))
- **deps-dev:** bump jest from 27.0.5 to 27.0.6 ([#480](https://github.com/scaleway/scaleway-ui/issues/480)) ([d1a0be0](https://github.com/scaleway/scaleway-ui/commit/d1a0be0a4d2c9bd70f032fdbe6fd55144a3dccd0))
- **deps-dev:** bump prettier from 2.3.1 to 2.3.2 ([#470](https://github.com/scaleway/scaleway-ui/issues/470)) ([b3ff59f](https://github.com/scaleway/scaleway-ui/commit/b3ff59f287c1dc3d5cf34387d70e93379050ae39))
- **deps-dev:** bump rollup from 2.52.1 to 2.52.2 ([#455](https://github.com/scaleway/scaleway-ui/issues/455)) ([fd3962c](https://github.com/scaleway/scaleway-ui/commit/fd3962ca54160474b398e8768d6620caa161d9f3))
- **deps-dev:** bump rollup from 2.52.2 to 2.52.3 ([#469](https://github.com/scaleway/scaleway-ui/issues/469)) ([288b4fb](https://github.com/scaleway/scaleway-ui/commit/288b4fb74f7ffb7509cd362cc3b6c57e48fb68d7))
- **deps-dev:** bump rollup from 2.52.3 to 2.52.4 ([#482](https://github.com/scaleway/scaleway-ui/issues/482)) ([12238da](https://github.com/scaleway/scaleway-ui/commit/12238da4bf79acfcba4086c38ffd2b47b838bb24))
- **deps-dev:** bump rollup-plugin-visualizer from 5.5.0 to 5.5.1 ([#484](https://github.com/scaleway/scaleway-ui/issues/484)) ([abac7e6](https://github.com/scaleway/scaleway-ui/commit/abac7e6ccae187ff44b2ab64916e5bc9617c08c2))

## [0.88.0](https://github.com/scaleway/scaleway-ui/compare/v0.87.1...v0.88.0) (2021-06-18)

### :gear: Features

- **icons:** added sun - moon and github svg icons ([#453](https://github.com/scaleway/scaleway-ui/issues/453)) ([4bfc4cf](https://github.com/scaleway/scaleway-ui/commit/4bfc4cf700c9ec0eb76e63bb8b1fafa4dc094946))

### [0.87.1](https://github.com/scaleway/scaleway-ui/compare/v0.87.0...v0.87.1) (2021-06-17)

### :bug: Bug Fixes

- **menu:** item color ([#450](https://github.com/scaleway/scaleway-ui/issues/450)) ([20df304](https://github.com/scaleway/scaleway-ui/commit/20df304ebd3faf7255b1c72066900eb671967eef))

## [0.87.0](https://github.com/scaleway/scaleway-ui/compare/v0.86.0...v0.87.0) (2021-06-17)

### :gear: Features

- add FlexBox component ([#391](https://github.com/scaleway/scaleway-ui/issues/391)) ([be5a714](https://github.com/scaleway/scaleway-ui/commit/be5a71435851ca49b898ad3f77dbb2b95f622d08))

### :white_check_mark: Test

- update snaps ([d0d578b](https://github.com/scaleway/scaleway-ui/commit/d0d578bd2be25a830ef2e2d851d771deea512b8c))

## [0.86.0](https://github.com/scaleway/scaleway-ui/compare/v0.85.1...v0.86.0) (2021-06-17)

### :gear: Features

- merge Action into Button ([#437](https://github.com/scaleway/scaleway-ui/issues/437)) ([fe5f789](https://github.com/scaleway/scaleway-ui/commit/fe5f78946d467c336234aab1403951e053a0d269))

### [0.85.1](https://github.com/scaleway/scaleway-ui/compare/v0.85.0...v0.85.1) (2021-06-17)

### :package: Chore

- **deps-dev:** bump postcss from 8.3.4 to 8.3.5 ([#452](https://github.com/scaleway/scaleway-ui/issues/452)) ([d721787](https://github.com/scaleway/scaleway-ui/commit/d7217874018a45cc5a5a0a51c0c08e0221ddb4f0))
- **deps-dev:** bump rollup from 2.51.2 to 2.52.0 ([#446](https://github.com/scaleway/scaleway-ui/issues/446)) ([c4daea1](https://github.com/scaleway/scaleway-ui/commit/c4daea1c0a38fb32d54dead181b04b914a7d477d))
- **deps-dev:** bump rollup from 2.52.0 to 2.52.1 ([#451](https://github.com/scaleway/scaleway-ui/issues/451)) ([0d733e6](https://github.com/scaleway/scaleway-ui/commit/0d733e6609da9a56dcdba88e5d3ab67992878081))
- **deps-dev:** bump semantic-release from 17.4.3 to 17.4.4 ([#445](https://github.com/scaleway/scaleway-ui/issues/445)) ([c9c1725](https://github.com/scaleway/scaleway-ui/commit/c9c172534b337b57013a7c8652d1077c391acac9))

### :bug: Bug Fixes

- **Slider:** correct drag image object ([#447](https://github.com/scaleway/scaleway-ui/issues/447)) ([f744408](https://github.com/scaleway/scaleway-ui/commit/f744408468343c9080fd556e0efb8253ebb28cdf))

## [0.85.0](https://github.com/scaleway/scaleway-ui/compare/v0.84.0...v0.85.0) (2021-06-15)

### :zap: Refactor

- adds extra color into SWUI ([a635624](https://github.com/scaleway/scaleway-ui/commit/a6356247534a34fbacdc2d8bf3ab89667e177287))

### :memo: Documentation

- **menu):** add description ([#443](https://github.com/scaleway/scaleway-ui/issues/443)) ([bbf69e9](https://github.com/scaleway/scaleway-ui/commit/bbf69e9c5fcd96c350f8dacd40962622b3136ec8))

### :gear: Features

- migrate command into typography CNS-4040 ([#444](https://github.com/scaleway/scaleway-ui/issues/444)) ([3adc5a8](https://github.com/scaleway/scaleway-ui/commit/3adc5a86fcc9f7c098682995dd483df2e7aecd48))

## [0.84.0](https://github.com/scaleway/scaleway-ui/compare/v0.83.1...v0.84.0) (2021-06-15)

### :package: Chore

- **deps:** bump @babel/runtime from 7.14.0 to 7.14.5 ([#426](https://github.com/scaleway/scaleway-ui/issues/426)) ([5a37683](https://github.com/scaleway/scaleway-ui/commit/5a37683768ada11dfce6336ba0d1771e7fcababe))
- **deps:** bump @babel/runtime from 7.14.5 to 7.14.6 ([#439](https://github.com/scaleway/scaleway-ui/issues/439)) ([b2d0af3](https://github.com/scaleway/scaleway-ui/commit/b2d0af38fe3d659adf4c8a166f51accb575d9ab7))
- **deps:** bump bobheadxi/deployments from 0.5.2 to 0.6.0 ([#434](https://github.com/scaleway/scaleway-ui/issues/434)) ([17c1297](https://github.com/scaleway/scaleway-ui/commit/17c1297d050d8aaf08e9d03f3abbfc5e875c3f5e))
- **deps:** bump codecov/codecov-action from 1.5.0 to 1.5.2 ([#418](https://github.com/scaleway/scaleway-ui/issues/418)) ([8425edf](https://github.com/scaleway/scaleway-ui/commit/8425edf520272f5895c91fc510080a369606c464))
- **deps-dev:** bump @babel/core from 7.14.3 to 7.14.5 ([#424](https://github.com/scaleway/scaleway-ui/issues/424)) ([885b791](https://github.com/scaleway/scaleway-ui/commit/885b7911f0c53097d08f64787789215d3bf9e5ff))
- **deps-dev:** bump @babel/core from 7.14.5 to 7.14.6 ([#438](https://github.com/scaleway/scaleway-ui/issues/438)) ([ae20572](https://github.com/scaleway/scaleway-ui/commit/ae205721c8db566e6d07dd33a512ad5a8c56c8a9))
- **deps-dev:** bump @babel/eslint-parser from 7.14.4 to 7.14.5 ([#422](https://github.com/scaleway/scaleway-ui/issues/422)) ([4320f95](https://github.com/scaleway/scaleway-ui/commit/4320f9540b9fd16ebd0aaebaf8b47588d4b4d0aa))
- **deps-dev:** bump @babel/plugin-proposal-class-properties ([#423](https://github.com/scaleway/scaleway-ui/issues/423)) ([3674cc9](https://github.com/scaleway/scaleway-ui/commit/3674cc91de7f71622309bf70fcac85a90e9e09ad))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#429](https://github.com/scaleway/scaleway-ui/issues/429)) ([4d6b68a](https://github.com/scaleway/scaleway-ui/commit/4d6b68abd5e7fead85c2964e13dd749a00ad736d))
- **deps-dev:** bump @babel/preset-env from 7.14.4 to 7.14.5 ([#428](https://github.com/scaleway/scaleway-ui/issues/428)) ([ba347c7](https://github.com/scaleway/scaleway-ui/commit/ba347c70eaffcb2001717230501e4a921bb21cf4))
- **deps-dev:** bump @babel/preset-react from 7.13.13 to 7.14.5 ([#430](https://github.com/scaleway/scaleway-ui/issues/430)) ([c9a8dcc](https://github.com/scaleway/scaleway-ui/commit/c9a8dcc6ad127ae58bae97d9e4cbc25f82994163))
- **deps-dev:** bump @semantic-release/release-notes-generator ([#433](https://github.com/scaleway/scaleway-ui/issues/433)) ([f369aaa](https://github.com/scaleway/scaleway-ui/commit/f369aaa9ac7e7e03deeb1721747d2cc6fd19f614))
- **deps-dev:** bump @testing-library/jest-dom from 5.13.0 to 5.14.1 ([#436](https://github.com/scaleway/scaleway-ui/issues/436)) ([b1d1500](https://github.com/scaleway/scaleway-ui/commit/b1d15000d722a2e2380368a3a2bd7f2d75f83fa2))
- **deps-dev:** bump jest-junit from 12.1.0 to 12.2.0 ([#425](https://github.com/scaleway/scaleway-ui/issues/425)) ([ec3ebb9](https://github.com/scaleway/scaleway-ui/commit/ec3ebb98f4fdb4d6ca11a60435298c83491cd2dc))
- **deps-dev:** bump postcss from 8.3.0 to 8.3.1 ([#427](https://github.com/scaleway/scaleway-ui/issues/427)) ([93c004e](https://github.com/scaleway/scaleway-ui/commit/93c004ec5fe47b09ff8c793b7e487f5df5cd5e53))
- **deps-dev:** bump postcss from 8.3.1 to 8.3.2 ([#432](https://github.com/scaleway/scaleway-ui/issues/432)) ([67a8aed](https://github.com/scaleway/scaleway-ui/commit/67a8aed6acfb25d6c94d8f30ab5d6f12efb47d73))
- **deps-dev:** bump postcss from 8.3.2 to 8.3.3 ([#435](https://github.com/scaleway/scaleway-ui/issues/435)) ([b8649f3](https://github.com/scaleway/scaleway-ui/commit/b8649f3e879547c6c6e0f62362eb76dd6b801083))
- **deps-dev:** bump postcss from 8.3.3 to 8.3.4 ([#440](https://github.com/scaleway/scaleway-ui/issues/440)) ([c541b99](https://github.com/scaleway/scaleway-ui/commit/c541b99142984012fab8022e2c154e207689eb28))
- **deps-dev:** bump rollup from 2.51.1 to 2.51.2 ([#431](https://github.com/scaleway/scaleway-ui/issues/431)) ([26683ee](https://github.com/scaleway/scaleway-ui/commit/26683ee58684b815a8f5f61bdeb0a9a477271a4b))

### :zap: Refactor

- **box:** merge box and borderedbox ([#421](https://github.com/scaleway/scaleway-ui/issues/421)) ([097e722](https://github.com/scaleway/scaleway-ui/commit/097e722be60e5c676fa3221ca2676eba6dede548))

### :gear: Features

- **menu:** add menu component ([#420](https://github.com/scaleway/scaleway-ui/issues/420)) ([9d2af8e](https://github.com/scaleway/scaleway-ui/commit/9d2af8ea00f20fe1ca04e3ac2d34181e25fe8e1b))

### :bug: Bug Fixes

- **separator:** add role and aria-orientation ([#442](https://github.com/scaleway/scaleway-ui/issues/442)) ([1298143](https://github.com/scaleway/scaleway-ui/commit/1298143daa4f130ec4950de8f62d19c3b3eea11c))

### [0.83.1](https://github.com/scaleway/scaleway-ui/compare/v0.83.0...v0.83.1) (2021-06-08)

### :package: Chore

- **lint:** sort keys ont rollup config file ([#415](https://github.com/scaleway/scaleway-ui/issues/415)) ([889da59](https://github.com/scaleway/scaleway-ui/commit/889da593d9535faa20df39aa9f3379d007c4bd48))

### :bug: Bug Fixes

- **button:** button with as link doesn't forward disabled property correctly ([#416](https://github.com/scaleway/scaleway-ui/issues/416)) ([0f50197](https://github.com/scaleway/scaleway-ui/commit/0f50197163c6c83a8d3cfd560a5e145709465880))

## [0.83.0](https://github.com/scaleway/scaleway-ui/compare/v0.82.2...v0.83.0) (2021-06-08)

### :memo: Documentation

- updated all P components doc ([#395](https://github.com/scaleway/scaleway-ui/issues/395)) ([c5d9211](https://github.com/scaleway/scaleway-ui/commit/c5d9211597869615408a114019c0d160b09621d4))

### :package: Chore

- **deps-dev:** bump eslint from 7.27.0 to 7.28.0 ([#414](https://github.com/scaleway/scaleway-ui/issues/414)) ([ab5e318](https://github.com/scaleway/scaleway-ui/commit/ab5e3183a115eec05614a1ef845a994593a221f7))
- **deps-dev:** bump prettier from 2.3.0 to 2.3.1 ([#413](https://github.com/scaleway/scaleway-ui/issues/413)) ([e3a9aa2](https://github.com/scaleway/scaleway-ui/commit/e3a9aa28ba4a6b453f15315e75f3a5b859da72d0))
- **deps-dev:** bump rollup from 2.50.6 to 2.51.0 ([#412](https://github.com/scaleway/scaleway-ui/issues/412)) ([6174780](https://github.com/scaleway/scaleway-ui/commit/61747804e9f1c38df1548d183f95b07539e26144))
- **deps-dev:** bump rollup from 2.51.0 to 2.51.1 ([#417](https://github.com/scaleway/scaleway-ui/issues/417)) ([604ba31](https://github.com/scaleway/scaleway-ui/commit/604ba31047b6653ac102d4c3ce03b734ecb5ab86))

### :gear: Features

- merge ProgressCircle into ActivityIndicator ([#403](https://github.com/scaleway/scaleway-ui/issues/403)) ([f5bdf21](https://github.com/scaleway/scaleway-ui/commit/f5bdf2152ea7868d6feec002fc734a96a25775d6))

### [0.82.2](https://github.com/scaleway/scaleway-ui/compare/v0.82.1...v0.82.2) (2021-06-07)

### :memo: Documentation

- updated all B components doc ([#383](https://github.com/scaleway/scaleway-ui/issues/383)) ([27b6065](https://github.com/scaleway/scaleway-ui/commit/27b606548580f4d54dd012e1ec574a977fb0dba3))
- updated all C components doc ([#387](https://github.com/scaleway/scaleway-ui/issues/387)) ([e34b610](https://github.com/scaleway/scaleway-ui/commit/e34b610c81149aa74aafb5a02acc887f6b6d5d66))

### :package: Chore

- **deps:** bump react-datepicker from 3.8.0 to 4.1.0 ([#397](https://github.com/scaleway/scaleway-ui/issues/397)) ([c16bae2](https://github.com/scaleway/scaleway-ui/commit/c16bae25a6fc5fb5ccba8b7be35d892eaa85ddff))
- **deps-dev:** bump @testing-library/jest-dom from 5.12.0 to 5.13.0 ([#409](https://github.com/scaleway/scaleway-ui/issues/409)) ([34be24e](https://github.com/scaleway/scaleway-ui/commit/34be24e0a7e1531fbf73df61f248dc19ebf94cde))
- **deps-dev:** bump jest from 27.0.3 to 27.0.4 ([#410](https://github.com/scaleway/scaleway-ui/issues/410)) ([c9a4923](https://github.com/scaleway/scaleway-ui/commit/c9a492343b9f2bc9db9ea98f612f70f3dbe536bc))
- remove unused Select component ([#405](https://github.com/scaleway/scaleway-ui/issues/405)) ([fff04dc](https://github.com/scaleway/scaleway-ui/commit/fff04dca8b05aac12df9464f96f957821d482833))
- **deps:** bump react-datepicker from 4.1.0 to 4.1.1 ([#408](https://github.com/scaleway/scaleway-ui/issues/408)) ([e0b0452](https://github.com/scaleway/scaleway-ui/commit/e0b0452a8929eaed3b6459d71e2cf4186f536ff0))
- **deps-dev:** bump jest from 26.6.3 to 27.0.3 ([#394](https://github.com/scaleway/scaleway-ui/issues/394)) ([39ddc0e](https://github.com/scaleway/scaleway-ui/commit/39ddc0e13f44bab688899fc14e85629604ab65b9))
- **deps-dev:** bump rollup from 2.50.5 to 2.50.6 ([#407](https://github.com/scaleway/scaleway-ui/issues/407)) ([ed9bb12](https://github.com/scaleway/scaleway-ui/commit/ed9bb12fc90f9633f904ab1f1c92b3553e91ca3f))

### :bug: Bug Fixes

- richselect innerRef ([#411](https://github.com/scaleway/scaleway-ui/issues/411)) ([7fbe049](https://github.com/scaleway/scaleway-ui/commit/7fbe049967d7df437ac01be78cf832a2a7ec5130))

### [0.82.1](https://github.com/scaleway/scaleway-ui/compare/v0.82.0...v0.82.1) (2021-06-02)

## [0.82.0](https://github.com/scaleway/scaleway-ui/compare/v0.81.1...v0.82.0) (2021-06-02)

### :white_check_mark: Test

- correct shouldMatchEmotionSnapshot usage ([#402](https://github.com/scaleway/scaleway-ui/issues/402)) ([b521d52](https://github.com/scaleway/scaleway-ui/commit/b521d528d35f469b1fa1b8fc32e1cba47dbfcd12))

### :memo: Documentation

- improves documentation for components from l to n CNS-3985 ([#386](https://github.com/scaleway/scaleway-ui/issues/386)) ([da268da](https://github.com/scaleway/scaleway-ui/commit/da268da9fe0b5f8e5167710f7a320b704032acc4))

### :gear: Features

- **accessibility:** enable storybook accessibility ([#385](https://github.com/scaleway/scaleway-ui/issues/385)) ([6e74d15](https://github.com/scaleway/scaleway-ui/commit/6e74d151af9cc46e22ae931a4e8c5eb67d110071))

### [0.81.1](https://github.com/scaleway/scaleway-ui/compare/v0.81.0...v0.81.1) (2021-05-31)

### :bug: Bug Fixes

- richselect option ([#401](https://github.com/scaleway/scaleway-ui/issues/401)) ([02638e2](https://github.com/scaleway/scaleway-ui/commit/02638e2b7453d6f54afd388d99fc669cd6a95a6a))

### :package: Chore

- **deps:** bump @xstyled/emotion from 2.5.0 to 3.0.0 ([#373](https://github.com/scaleway/scaleway-ui/issues/373)) ([5c060ef](https://github.com/scaleway/scaleway-ui/commit/5c060efd9c01c08dbbc4f7c562cf2f2e4dbc90a1))
- **deps-dev:** bump date-fns from 2.21.3 to 2.22.1 ([#400](https://github.com/scaleway/scaleway-ui/issues/400)) ([ae6bbb3](https://github.com/scaleway/scaleway-ui/commit/ae6bbb3ebb2775d31cdae4c8a8bb45b6e3daf033))

## [0.81.0](https://github.com/scaleway/scaleway-ui/compare/v0.80.4...v0.81.0) (2021-05-31)

### :gear: Features

- ssr safe rendering ([#380](https://github.com/scaleway/scaleway-ui/issues/380)) ([327d51a](https://github.com/scaleway/scaleway-ui/commit/327d51a859d95e15a6e6b8e77176abe434cc930b))

### :package: Chore

- **deps:** bump intl-tel-input from 17.0.12 to 17.0.13 ([#398](https://github.com/scaleway/scaleway-ui/issues/398)) ([89d782c](https://github.com/scaleway/scaleway-ui/commit/89d782c6579d61227154083bb07a1605afa6d1cc))
- **deps:** bump polished from 4.1.2 to 4.1.3 ([#399](https://github.com/scaleway/scaleway-ui/issues/399)) ([715447d](https://github.com/scaleway/scaleway-ui/commit/715447d9e3ad2e837dfd368019de7e0a1c00310f))
- **deps-dev:** bump @babel/eslint-parser from 7.14.3 to 7.14.4 ([#393](https://github.com/scaleway/scaleway-ui/issues/393)) ([f9fdfa9](https://github.com/scaleway/scaleway-ui/commit/f9fdfa981df16d2c65ae94847c5236f47718646e))
- **deps-dev:** bump @babel/preset-env from 7.14.2 to 7.14.4 ([#392](https://github.com/scaleway/scaleway-ui/issues/392)) ([147ea56](https://github.com/scaleway/scaleway-ui/commit/147ea5673f37c56aeae183a77384844ba1e87da3))
- **deps-dev:** bump rollup from 2.50.2 to 2.50.5 ([#396](https://github.com/scaleway/scaleway-ui/issues/396)) ([f92a33a](https://github.com/scaleway/scaleway-ui/commit/f92a33a55cbe9618d7a78ccf540a8de2ac86d3bd))

### [0.80.4](https://github.com/scaleway/scaleway-ui/compare/v0.80.3...v0.80.4) (2021-05-31)

### :package: Chore

- **deps:** bump actions/cache from 2.1.5 to 2.1.6 ([#388](https://github.com/scaleway/scaleway-ui/issues/388)) ([f95ca9c](https://github.com/scaleway/scaleway-ui/commit/f95ca9ce8fea719b1fba7d57f50f4efa1bc16c94))
- **deps-dev:** bump rollup from 2.50.1 to 2.50.2 ([#389](https://github.com/scaleway/scaleway-ui/issues/389)) ([c87cb3e](https://github.com/scaleway/scaleway-ui/commit/c87cb3eea788e45d17b7a714525d5c287a784ffc))

### :bug: Bug Fixes

- **action:** add forwardRef to button ([#390](https://github.com/scaleway/scaleway-ui/issues/390)) ([f656eb4](https://github.com/scaleway/scaleway-ui/commit/f656eb4923abf8f38cf175aa6252a4d1610a1a1c))

### [0.80.3](https://github.com/scaleway/scaleway-ui/compare/v0.80.2...v0.80.3) (2021-05-27)

### :package: Chore

- **deps:** bump docker/build-push-action from 2.4.0 to 2.5.0 ([#384](https://github.com/scaleway/scaleway-ui/issues/384)) ([cf7c68f](https://github.com/scaleway/scaleway-ui/commit/cf7c68fae2d41eb0cc986c88aba30a35017bf350))

### :bug: Bug Fixes

- rich select issues ([#372](https://github.com/scaleway/scaleway-ui/issues/372)) ([c1db37b](https://github.com/scaleway/scaleway-ui/commit/c1db37b8a38eebc26f6989e50d9f4eca3665555a))

### [0.80.2](https://github.com/scaleway/scaleway-ui/compare/v0.80.1...v0.80.2) (2021-05-27)

### :bug: Bug Fixes

- textbox import ([#375](https://github.com/scaleway/scaleway-ui/issues/375)) ([e2ac446](https://github.com/scaleway/scaleway-ui/commit/e2ac4468f4613481ad96a5514fe1d383328df400))

### [0.80.1](https://github.com/scaleway/scaleway-ui/compare/v0.80.0...v0.80.1) (2021-05-27)

### :memo: Documentation

- add story documentation on A components ([#368](https://github.com/scaleway/scaleway-ui/issues/368)) ([4cbf77b](https://github.com/scaleway/scaleway-ui/commit/4cbf77bd2793a0ad4557bfe05a71a8ab0172ecd6))

### :package: Chore

- **deps-dev:** bump @scaleway/use-i18n from 2.1.2 to 2.1.3 ([#378](https://github.com/scaleway/scaleway-ui/issues/378)) ([bca1f37](https://github.com/scaleway/scaleway-ui/commit/bca1f375fba28b953da624b0b513d9d0211b8485))
- **deps-dev:** bump eslint from 7.26.0 to 7.27.0 ([#371](https://github.com/scaleway/scaleway-ui/issues/371)) ([c7ce9c7](https://github.com/scaleway/scaleway-ui/commit/c7ce9c70d49dd8681e73e6e2c640babc0cde2527))
- **deps-dev:** bump jest-junit from 12.0.0 to 12.1.0 ([#381](https://github.com/scaleway/scaleway-ui/issues/381)) ([96d6aad](https://github.com/scaleway/scaleway-ui/commit/96d6aad78bb3d7ff6dca355cee72b72c489d973b))
- **deps-dev:** bump rollup from 2.49.0 to 2.50.1 ([#382](https://github.com/scaleway/scaleway-ui/issues/382)) ([94eaf12](https://github.com/scaleway/scaleway-ui/commit/94eaf12dc6d935850a33cce310b576acd687a92d))
- remove old renovate config ([#374](https://github.com/scaleway/scaleway-ui/issues/374)) ([1a9e33f](https://github.com/scaleway/scaleway-ui/commit/1a9e33ff611a0bc5ca23e93f84fbe6f08aac039f))
- **deps-dev:** bump rollup from 2.48.0 to 2.49.0 ([#370](https://github.com/scaleway/scaleway-ui/issues/370)) ([11b2329](https://github.com/scaleway/scaleway-ui/commit/11b23296a7971ff410cbfe9a172d124efebbf737))

### :bug: Bug Fixes

- **stepper:** fixed border and added tests event ([#376](https://github.com/scaleway/scaleway-ui/issues/376)) ([0b67d84](https://github.com/scaleway/scaleway-ui/commit/0b67d849dc43a1dbe07a739f2fe2b95f6cb44940))

## [0.80.0](https://github.com/scaleway/scaleway-ui/compare/v0.79.2...v0.80.0) (2021-05-21)

### :memo: Documentation

- index and customization ([#359](https://github.com/scaleway/scaleway-ui/issues/359)) ([1735948](https://github.com/scaleway/scaleway-ui/commit/17359482ad0b11957c7bd172df08c56fdea59dff))

### :package: Chore

- **deps-dev:** bump @scaleway/use-i18n from 2.1.0 to 2.1.2 ([#367](https://github.com/scaleway/scaleway-ui/issues/367)) ([df86f16](https://github.com/scaleway/scaleway-ui/commit/df86f1672df71f8d9764b005028b6e30dd08275c))
- **deps-dev:** bump postcss from 8.2.15 to 8.3.0 ([#369](https://github.com/scaleway/scaleway-ui/issues/369)) ([4ede66c](https://github.com/scaleway/scaleway-ui/commit/4ede66c6867333971abec75261c137a030feb620))

### :gear: Features

- **stepper:** new design ([#349](https://github.com/scaleway/scaleway-ui/issues/349)) ([9ff694b](https://github.com/scaleway/scaleway-ui/commit/9ff694b9f9c1598f7d1166c742c65e0a25b01433))

### [0.79.2](https://github.com/scaleway/scaleway-ui/compare/v0.79.1...v0.79.2) (2021-05-18)

### :package: Chore

- **deps:** bump react-select from 4.3.0 to 4.3.1 ([#338](https://github.com/scaleway/scaleway-ui/issues/338)) ([c0a23b3](https://github.com/scaleway/scaleway-ui/commit/c0a23b3c77303444db08a2f7fd32e91bf3633083))
- **deps-dev:** bump @babel/core from 7.14.2 to 7.14.3 ([#365](https://github.com/scaleway/scaleway-ui/issues/365)) ([4c98cdc](https://github.com/scaleway/scaleway-ui/commit/4c98cdc9787f13340eeaaab103b1db0a44dc8907))
- **deps-dev:** bump @babel/eslint-parser from 7.14.2 to 7.14.3 ([#364](https://github.com/scaleway/scaleway-ui/issues/364)) ([23080b8](https://github.com/scaleway/scaleway-ui/commit/23080b8bc2df3ceefd9f3c9766c9a88a2063b488))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#363](https://github.com/scaleway/scaleway-ui/issues/363)) ([de6beb7](https://github.com/scaleway/scaleway-ui/commit/de6beb7def1e8abb1bd3a6c15a696d7ec2d50327))

### :bug: Bug Fixes

- export RichSelectTags ([#362](https://github.com/scaleway/scaleway-ui/issues/362)) ([41c184f](https://github.com/scaleway/scaleway-ui/commit/41c184fb8f90930ea248f4fb3cee8c37639afca0))

### [0.79.1](https://github.com/scaleway/scaleway-ui/compare/v0.79.0...v0.79.1) (2021-05-17)

### :bug: Bug Fixes

- checkbox text alignement ([#358](https://github.com/scaleway/scaleway-ui/issues/358)) ([47c19dc](https://github.com/scaleway/scaleway-ui/commit/47c19dce95debadae65b8f6f0880ce0ed08b67ca))

## [0.79.0](https://github.com/scaleway/scaleway-ui/compare/v0.78.2...v0.79.0) (2021-05-17)

### :package: Chore

- **deps-dev:** bump @babel/core from 7.14.0 to 7.14.2 ([#355](https://github.com/scaleway/scaleway-ui/issues/355)) ([1031918](https://github.com/scaleway/scaleway-ui/commit/10319185a7f7d67dd291431f3dbacd8612a5ca1a))
- **deps-dev:** bump @babel/eslint-parser from 7.13.14 to 7.14.2 ([#357](https://github.com/scaleway/scaleway-ui/issues/357)) ([e3a81ec](https://github.com/scaleway/scaleway-ui/commit/e3a81ec4a50fb851eccdc2758a20d2d20d9bb286))
- **deps-dev:** bump @testing-library/react from 11.2.6 to 11.2.7 ([#361](https://github.com/scaleway/scaleway-ui/issues/361)) ([488b02f](https://github.com/scaleway/scaleway-ui/commit/488b02fe06031706e6ed6b2791e1cfbcea5cc1fa))
- **deps-dev:** bump rollup from 2.47.0 to 2.48.0 ([#360](https://github.com/scaleway/scaleway-ui/issues/360)) ([0f08040](https://github.com/scaleway/scaleway-ui/commit/0f080406439b945850a6a5c20a1b94fa76ca2cad))

### :gear: Features

- **UniversalLink:** add mailto native support ([#331](https://github.com/scaleway/scaleway-ui/issues/331)) ([f4f4b91](https://github.com/scaleway/scaleway-ui/commit/f4f4b91df0735504cdbf0745d35abec05149a30e))

### [0.78.2](https://github.com/scaleway/scaleway-ui/compare/v0.78.1...v0.78.2) (2021-05-14)

### :package: Chore

- **deps-dev:** bump @babel/plugin-transform-runtime ([#350](https://github.com/scaleway/scaleway-ui/issues/350)) ([a27857c](https://github.com/scaleway/scaleway-ui/commit/a27857cfec5fafded4526c0ec3890d3f228754a9))
- **deps-dev:** bump @babel/preset-env from 7.14.1 to 7.14.2 ([#353](https://github.com/scaleway/scaleway-ui/issues/353)) ([99015dd](https://github.com/scaleway/scaleway-ui/commit/99015dde4f1af9d1f6f4eb9ab2d1fe9687cb4a09))
- **deps-dev:** bump @commitlint/cli from 12.1.3 to 12.1.4 ([#354](https://github.com/scaleway/scaleway-ui/issues/354)) ([ff69128](https://github.com/scaleway/scaleway-ui/commit/ff691286324832e3e4f5423abd635818ffda8c15))
- **deps-dev:** bump @commitlint/config-conventional ([#351](https://github.com/scaleway/scaleway-ui/issues/351)) ([2c814f8](https://github.com/scaleway/scaleway-ui/commit/2c814f8cd0eb7a2b6c6f0917848dccbdbc582792))
- **deps-dev:** bump semantic-release from 17.4.2 to 17.4.3 ([#356](https://github.com/scaleway/scaleway-ui/issues/356)) ([c6db620](https://github.com/scaleway/scaleway-ui/commit/c6db620ba7a29ddeddb67589ea02625fef716d1b))
- **eslint:** sort ([#341](https://github.com/scaleway/scaleway-ui/issues/341)) ([4e31b7e](https://github.com/scaleway/scaleway-ui/commit/4e31b7e6b52a8129674ea552bd9af649770fb973))

### :bug: Bug Fixes

- correct node engine version ([#352](https://github.com/scaleway/scaleway-ui/issues/352)) ([6d221df](https://github.com/scaleway/scaleway-ui/commit/6d221df719f4c49b8366f0b8fd87091fdfb02720))

### [0.78.1](https://github.com/scaleway/scaleway-ui/compare/v0.78.0...v0.78.1) (2021-05-12)

### :package: Chore

- **deps-dev:** bump @commitlint/cli from 12.1.1 to 12.1.3 ([#348](https://github.com/scaleway/scaleway-ui/issues/348)) ([c787f85](https://github.com/scaleway/scaleway-ui/commit/c787f8510e1391327b4f907e72af3378e3747e4e))
- **deps-dev:** bump @commitlint/config-conventional ([#347](https://github.com/scaleway/scaleway-ui/issues/347)) ([b26fc80](https://github.com/scaleway/scaleway-ui/commit/b26fc80b1b5937fc0dbd81f819f75d6ef3338e75))

### :bug: Bug Fixes

- creationprogress space between lines ([#332](https://github.com/scaleway/scaleway-ui/issues/332)) ([66ea09c](https://github.com/scaleway/scaleway-ui/commit/66ea09c84a61349d2650df18d9f9fa2e5d797875))

## [0.78.0](https://github.com/scaleway/scaleway-ui/compare/v0.77.3...v0.78.0) (2021-05-12)

### :memo: Documentation

- **package:** add licence, homepage, and url field ([#330](https://github.com/scaleway/scaleway-ui/issues/330)) ([7dee175](https://github.com/scaleway/scaleway-ui/commit/7dee1758d9654a2d77ce08c731354e96b82e8a67))

### :package: Chore

- **deps:** bump @scaleway/random-name from 1.3.0 to 1.3.2 ([#336](https://github.com/scaleway/scaleway-ui/issues/336)) ([63bbc9f](https://github.com/scaleway/scaleway-ui/commit/63bbc9f500543d2f4f2d65da899c6aca6832641d))
- **deps:** bump actions/checkout from 2 to 2.3.4 ([#342](https://github.com/scaleway/scaleway-ui/issues/342)) ([53001e5](https://github.com/scaleway/scaleway-ui/commit/53001e5b2bf8efc935cff7d9bdb5cea10d1edafa))
- **deps:** bump codecov/codecov-action from 1 to 1.5.0 ([#344](https://github.com/scaleway/scaleway-ui/issues/344)) ([a009f21](https://github.com/scaleway/scaleway-ui/commit/a009f21a8c8d78fee7e39fc2d7c61a8be44cec49))
- **deps:** bump docker/build-push-action from 2 to 2.4.0 ([#346](https://github.com/scaleway/scaleway-ui/issues/346)) ([0654f12](https://github.com/scaleway/scaleway-ui/commit/0654f12ec1caa8d2758fe99a1e4c7cc2c8bf6ab7))
- **deps:** bump docker/login-action from 1 to 1.9.0 ([#345](https://github.com/scaleway/scaleway-ui/issues/345)) ([da0e7d9](https://github.com/scaleway/scaleway-ui/commit/da0e7d906bc3e541c80b59778b82e1ec61923b8b))
- **deps:** bump docker/setup-buildx-action from 1 to 1.3.0 ([#343](https://github.com/scaleway/scaleway-ui/issues/343)) ([31ffb07](https://github.com/scaleway/scaleway-ui/commit/31ffb0777668c06239f2fd5d90b5a44a064a11be))
- **deps-dev:** bump @scaleway/use-i18n from 2.0.0 to 2.0.2 ([#337](https://github.com/scaleway/scaleway-ui/issues/337)) ([93452fd](https://github.com/scaleway/scaleway-ui/commit/93452fd03255508bfdac2bdf5edb0f81f8f28098))
- **deps-dev:** bump @scaleway/use-i18n from 2.0.2 to 2.1.0 ([#339](https://github.com/scaleway/scaleway-ui/issues/339)) ([83543ea](https://github.com/scaleway/scaleway-ui/commit/83543eafe20758d9ebd6081bf7cf3d1a509ea06e))
- **deps-dev:** bump postcss from 8.2.14 to 8.2.15 ([#334](https://github.com/scaleway/scaleway-ui/issues/334)) ([b391f70](https://github.com/scaleway/scaleway-ui/commit/b391f7078ea7b304dfd9a8b1af2aee26f330806c))

### :gear: Features

- port RichSelectTags ([#323](https://github.com/scaleway/scaleway-ui/issues/323)) ([3d13ab7](https://github.com/scaleway/scaleway-ui/commit/3d13ab76d8757f1ee1e2954bb7cbdfc40ca6530b))

### [0.77.3](https://github.com/scaleway/scaleway-ui/compare/v0.77.2...v0.77.3) (2021-05-10)

### :repeat: CI

- correct deployment ([#322](https://github.com/scaleway/scaleway-ui/issues/322)) ([1890773](https://github.com/scaleway/scaleway-ui/commit/1890773f693d40efbd2d5e598aa52e37e7b09729))

### :package: Chore

- **deps-dev:** bump @emotion/react from 11.1.5 to 11.4.0 ([#317](https://github.com/scaleway/scaleway-ui/issues/317)) ([472d5f0](https://github.com/scaleway/scaleway-ui/commit/472d5f06eb209d98d59bda23fe9977428b98ff6c))
- **deps-dev:** bump @rollup/plugin-node-resolve from 11.2.1 to 13.0.0 ([#313](https://github.com/scaleway/scaleway-ui/issues/313)) ([c88aaf8](https://github.com/scaleway/scaleway-ui/commit/c88aaf828ae6e297efb773b6efb4399ad9cbaf47))
- **deps-dev:** bump @semantic-release/github from 7.2.2 to 7.2.3 ([#324](https://github.com/scaleway/scaleway-ui/issues/324)) ([726205e](https://github.com/scaleway/scaleway-ui/commit/726205e687d30d0a66c388f3f4900a1577c5d655))
- **deps-dev:** bump date-fns from 2.21.2 to 2.21.3 ([#326](https://github.com/scaleway/scaleway-ui/issues/326)) ([505686b](https://github.com/scaleway/scaleway-ui/commit/505686b90a63bccb6519d8d1f521451ecf22c3a7))
- **deps-dev:** bump eslint from 7.25.0 to 7.26.0 ([#325](https://github.com/scaleway/scaleway-ui/issues/325)) ([bc47521](https://github.com/scaleway/scaleway-ui/commit/bc47521f9972e84ec94982e29176a15ba10192c0))
- **deps-dev:** bump lint-staged from 10.5.4 to 11.0.0 ([#328](https://github.com/scaleway/scaleway-ui/issues/328)) ([dce25d4](https://github.com/scaleway/scaleway-ui/commit/dce25d4da5ba8d7e38e6fc25ec5f554b9e119f23))
- **deps-dev:** bump prettier from 2.2.1 to 2.3.0 ([#327](https://github.com/scaleway/scaleway-ui/issues/327)) ([2affb1d](https://github.com/scaleway/scaleway-ui/commit/2affb1de6ddcf0bd34e7ecb37d10b0402705e81e))

### :bug: Bug Fixes

- consistent export method ([#321](https://github.com/scaleway/scaleway-ui/issues/321)) ([eb2ce52](https://github.com/scaleway/scaleway-ui/commit/eb2ce529807b4da5ab24d4ad8bf40cffaf3a2c67))

### [0.77.2](https://github.com/scaleway/scaleway-ui/compare/v0.77.1...v0.77.2) (2021-05-07)

### :memo: Documentation

- **code-of-conduct:** add code of conduct ([#311](https://github.com/scaleway/scaleway-ui/issues/311)) ([743203f](https://github.com/scaleway/scaleway-ui/commit/743203f1133419466d964580f636d362c85ce2e6))

### :package: Chore

- **deps:** bump @xstyled/emotion from 2.4.1 to 2.5.0 ([#303](https://github.com/scaleway/scaleway-ui/issues/303)) ([3225e56](https://github.com/scaleway/scaleway-ui/commit/3225e566569c800c9da1b3e416eb3133bbf2e112))
- **deps-dev:** bump @babel/preset-env from 7.14.0 to 7.14.1 ([#304](https://github.com/scaleway/scaleway-ui/issues/304)) ([a5a1f40](https://github.com/scaleway/scaleway-ui/commit/a5a1f4070f452e6c12337c7cd6794cceaebba6cc))
- **deps-dev:** bump @emotion/cache from 11.1.3 to 11.4.0 ([#318](https://github.com/scaleway/scaleway-ui/issues/318)) ([16e9079](https://github.com/scaleway/scaleway-ui/commit/16e90797121468cb8fa3284aba1662bc5a50e6c9))
- **deps-dev:** bump @rollup/plugin-commonjs from 18.0.0 to 18.1.0 ([#307](https://github.com/scaleway/scaleway-ui/issues/307)) ([8070a6c](https://github.com/scaleway/scaleway-ui/commit/8070a6c6e58114c764c6853dabc6e2cf41bc0924))
- **deps-dev:** bump @scaleway/use-i18n from 1.1.1 to 2.0.0 ([#300](https://github.com/scaleway/scaleway-ui/issues/300)) ([30e6a25](https://github.com/scaleway/scaleway-ui/commit/30e6a25d085d2d4d12da9852b4b0f106ac6fd843))
- **deps-dev:** bump @semantic-release/github from 7.2.1 to 7.2.2 ([#308](https://github.com/scaleway/scaleway-ui/issues/308)) ([44d5519](https://github.com/scaleway/scaleway-ui/commit/44d5519a8df9d904f0e899138a29f5be71fb71a1))
- **deps-dev:** bump @semantic-release/npm from 7.1.1 to 7.1.3 ([#314](https://github.com/scaleway/scaleway-ui/issues/314)) ([e5fe61f](https://github.com/scaleway/scaleway-ui/commit/e5fe61f75b44633a7df87c03e3c958c65a213d7a))
- **deps-dev:** bump date-fns from 2.21.1 to 2.21.2 ([#309](https://github.com/scaleway/scaleway-ui/issues/309)) ([4c5c3a9](https://github.com/scaleway/scaleway-ui/commit/4c5c3a95a666cb1f377d58aa7a1adbb423582d08))
- **deps-dev:** bump postcss from 8.2.13 to 8.2.14 ([#316](https://github.com/scaleway/scaleway-ui/issues/316)) ([c090136](https://github.com/scaleway/scaleway-ui/commit/c09013693a4d19a2cfc47ceb076804f87d2aca75))
- **deps-dev:** bump rollup from 2.46.0 to 2.47.0 ([#305](https://github.com/scaleway/scaleway-ui/issues/305)) ([63263d1](https://github.com/scaleway/scaleway-ui/commit/63263d12178494640dce0322708702587973c498))
- **deps-dev:** bump rollup-plugin-visualizer from 5.4.1 to 5.5.0 ([#306](https://github.com/scaleway/scaleway-ui/issues/306)) ([cf8d155](https://github.com/scaleway/scaleway-ui/commit/cf8d1555c65b7c7110768b370b03d1920f6d76ab))
- **template:** add template bug and feature request ([#310](https://github.com/scaleway/scaleway-ui/issues/310)) ([51ebc20](https://github.com/scaleway/scaleway-ui/commit/51ebc203ea925fe7184007ec0bce4715de0cf20c))

### :bug: Bug Fixes

- **DateInput:** capitalize month and day names ([#315](https://github.com/scaleway/scaleway-ui/issues/315)) ([215bda9](https://github.com/scaleway/scaleway-ui/commit/215bda9b9c11ae36ffabcfc108b4572f4203b282))

### [0.77.1](https://github.com/scaleway/scaleway-ui/compare/v0.77.0...v0.77.1) (2021-04-30)

### :bug: Bug Fixes

- fixed radio bordered box label color ([#302](https://github.com/scaleway/scaleway-ui/issues/302)) ([b66146d](https://github.com/scaleway/scaleway-ui/commit/b66146d797a5df7ade56d8597bdfea909834a3db))

## [0.77.0](https://github.com/scaleway/scaleway-ui/compare/v0.76.2...v0.77.0) (2021-04-30)

### :package: Chore

- **deps:** bump @babel/runtime from 7.13.17 to 7.14.0 ([#299](https://github.com/scaleway/scaleway-ui/issues/299)) ([dc0e193](https://github.com/scaleway/scaleway-ui/commit/dc0e193b5a9249de3fc9ba8416e1f69df66d7be7))
- **deps-dev:** bump @babel/core from 7.13.16 to 7.14.0 ([#297](https://github.com/scaleway/scaleway-ui/issues/297)) ([de4d0b7](https://github.com/scaleway/scaleway-ui/commit/de4d0b7a5da0db2c9b1f02d97eb963bf3da66ead))
- **deps-dev:** bump @babel/preset-env from 7.13.15 to 7.14.0 ([#298](https://github.com/scaleway/scaleway-ui/issues/298)) ([4f01420](https://github.com/scaleway/scaleway-ui/commit/4f0142065bbb7e79afa57a4e22070a384935ea56))
- **deps-dev:** bump rollup from 2.45.2 to 2.46.0 ([#296](https://github.com/scaleway/scaleway-ui/issues/296)) ([b833388](https://github.com/scaleway/scaleway-ui/commit/b83338833b8f9514343616e161eab2ec1e317306))

### :gear: Features

- add multiple creation progress sizes ([#280](https://github.com/scaleway/scaleway-ui/issues/280)) ([94dce4b](https://github.com/scaleway/scaleway-ui/commit/94dce4b136dcb50d084ea9e2450faadb712f683f))

### [0.76.2](https://github.com/scaleway/scaleway-ui/compare/v0.76.1...v0.76.2) (2021-04-28)

### :bug: Bug Fixes

- **universal-link:** add to when using react-router-dom ([#295](https://github.com/scaleway/scaleway-ui/issues/295)) ([2e18f91](https://github.com/scaleway/scaleway-ui/commit/2e18f911510d3b138a555f44449789d8e0d76c57))

### [0.76.1](https://github.com/scaleway/scaleway-ui/compare/v0.76.0...v0.76.1) (2021-04-27)

### :package: Chore

- **deps:** bump polished from 4.1.1 to 4.1.2 ([#291](https://github.com/scaleway/scaleway-ui/issues/291)) ([377bb27](https://github.com/scaleway/scaleway-ui/commit/377bb2755f0e618badcccb64d07114c238fdff11))
- **deps:** bump react-toastify from 7.0.3 to 7.0.4 ([#293](https://github.com/scaleway/scaleway-ui/issues/293)) ([83a73ad](https://github.com/scaleway/scaleway-ui/commit/83a73ad2f1af6d0b79bb3e70ce4342daf7810011))
- **deps:** bump reakit from 1.3.7 to 1.3.8 ([#288](https://github.com/scaleway/scaleway-ui/issues/288)) ([f1bb6d6](https://github.com/scaleway/scaleway-ui/commit/f1bb6d6a8ebbce9883aadf38b823488899e0e5b7))
- **deps-dev:** bump @storybook/addon-essentials from 6.2.8 to 6.2.9 ([#282](https://github.com/scaleway/scaleway-ui/issues/282)) ([0703d65](https://github.com/scaleway/scaleway-ui/commit/0703d652c786fb97c6371ce72c62645da59ab2aa))
- **deps-dev:** bump @storybook/addon-links from 6.2.8 to 6.2.9 ([#284](https://github.com/scaleway/scaleway-ui/issues/284)) ([4e6639e](https://github.com/scaleway/scaleway-ui/commit/4e6639e8bf8f5cb370d07d15b34dcb4a54d5d438))
- **deps-dev:** bump @storybook/builder-webpack5 from 6.2.8 to 6.2.9 ([#286](https://github.com/scaleway/scaleway-ui/issues/286)) ([1c808b4](https://github.com/scaleway/scaleway-ui/commit/1c808b4e444454e56ee7d94db74c433d9962291d))
- **deps-dev:** bump @storybook/react from 6.2.8 to 6.2.9 ([#283](https://github.com/scaleway/scaleway-ui/issues/283)) ([086f651](https://github.com/scaleway/scaleway-ui/commit/086f651469b4bd67d3c544309a3fb1cc177e7f00))
- **deps-dev:** bump @testing-library/jest-dom from 5.11.10 to 5.12.0 ([#287](https://github.com/scaleway/scaleway-ui/issues/287)) ([101e8a1](https://github.com/scaleway/scaleway-ui/commit/101e8a1dfd7efdac28753c4c854484db7fb577cc))
- **deps-dev:** bump eslint from 7.24.0 to 7.25.0 ([#292](https://github.com/scaleway/scaleway-ui/issues/292)) ([bb30fb2](https://github.com/scaleway/scaleway-ui/commit/bb30fb2d41dbc85276114a9bdde5e95feaa6b784))
- **deps-dev:** bump postcss from 8.2.10 to 8.2.12 ([#290](https://github.com/scaleway/scaleway-ui/issues/290)) ([d382ac8](https://github.com/scaleway/scaleway-ui/commit/d382ac862e3fb568646f1c8027a1ffb22d8124eb))
- **deps-dev:** bump postcss from 8.2.12 to 8.2.13 ([#294](https://github.com/scaleway/scaleway-ui/issues/294)) ([b552d92](https://github.com/scaleway/scaleway-ui/commit/b552d92a1c3fe21ecb2f5deddd2e7fe9de1911eb))

### :bug: Bug Fixes

- **date-input:** add locale props from date-fns ([#278](https://github.com/scaleway/scaleway-ui/issues/278)) ([b2f0a0c](https://github.com/scaleway/scaleway-ui/commit/b2f0a0c61c22d5b3a811ff659d87b1bc08e3667a))

## [0.76.0](https://github.com/scaleway/scaleway-ui/compare/v0.75.6...v0.76.0) (2021-04-22)

### :package: Chore

- **deps:** bump @babel/runtime from 7.13.10 to 7.13.17 ([#277](https://github.com/scaleway/scaleway-ui/issues/277)) ([97520e6](https://github.com/scaleway/scaleway-ui/commit/97520e6a64f89bcf9483da8cb2e893b6ad4a96e3))

### :lipstick: Style

- adds comment and refacto code a bit ([#266](https://github.com/scaleway/scaleway-ui/issues/266)) ([ec1e433](https://github.com/scaleway/scaleway-ui/commit/ec1e4331defbd5b9665ab58d9a9e528089163c3a))

### :gear: Features

- **logo:** change with new logo ([#279](https://github.com/scaleway/scaleway-ui/issues/279)) ([5907b68](https://github.com/scaleway/scaleway-ui/commit/5907b6812a6ea24386481dd5004cf29ded1f9556))

### [0.75.6](https://github.com/scaleway/scaleway-ui/compare/v0.75.5...v0.75.6) (2021-04-21)

### :repeat: CI

- correct github login credentials ([5520541](https://github.com/scaleway/scaleway-ui/commit/5520541fc572205b4328860628e3c2627d256260))

### :package: Chore

- **deps-dev:** bump @babel/core from 7.13.15 to 7.13.16 ([#276](https://github.com/scaleway/scaleway-ui/issues/276)) ([5e3cd7a](https://github.com/scaleway/scaleway-ui/commit/5e3cd7a761257c93c178c67bc49ebcd98e954f3f))

### :bug: Bug Fixes

- errors has wrong conditions ([#245](https://github.com/scaleway/scaleway-ui/issues/245)) ([79c9ab6](https://github.com/scaleway/scaleway-ui/commit/79c9ab6f50abd9a418105030a58f1860530da1e7))

### [0.75.5](https://github.com/scaleway/scaleway-ui/compare/v0.75.4...v0.75.5) (2021-04-20)

### :lipstick: Style

- eslint warnings ([#226](https://github.com/scaleway/scaleway-ui/issues/226)) ([477bea7](https://github.com/scaleway/scaleway-ui/commit/477bea77aff77b00952204100cbeab9780e55a32))

### :bug: Bug Fixes

- **tooltip:** fixed prop spreading ([#272](https://github.com/scaleway/scaleway-ui/issues/272)) ([dd7da00](https://github.com/scaleway/scaleway-ui/commit/dd7da0080573f553a3a63670ce06c06f09799c71))

### :package: Chore

- **deps:** bump actions/cache from v2.1.4 to v2.1.5 ([#255](https://github.com/scaleway/scaleway-ui/issues/255)) ([21922c7](https://github.com/scaleway/scaleway-ui/commit/21922c7cd6e8e54673ad4ce3ccd082274d8a9b1b))
- **deps:** bump react-datepicker from 3.7.0 to 3.8.0 ([#275](https://github.com/scaleway/scaleway-ui/issues/275)) ([8a74fdd](https://github.com/scaleway/scaleway-ui/commit/8a74fdd6e165045549bb8819c55a650fdc144a2e))
- **deps-dev:** bump @storybook/addon-essentials from 6.2.7 to 6.2.8 ([#261](https://github.com/scaleway/scaleway-ui/issues/261)) ([3fefe3a](https://github.com/scaleway/scaleway-ui/commit/3fefe3aff92c532a4884c7b986655bd22548257f))
- **deps-dev:** bump @storybook/addon-links from 6.2.7 to 6.2.8 ([#265](https://github.com/scaleway/scaleway-ui/issues/265)) ([53ade2e](https://github.com/scaleway/scaleway-ui/commit/53ade2ef6ec14a4aee402084f3b5af8e6aeecbf3))
- **deps-dev:** bump @storybook/builder-webpack5 from 6.2.7 to 6.2.8 ([#258](https://github.com/scaleway/scaleway-ui/issues/258)) ([30d0395](https://github.com/scaleway/scaleway-ui/commit/30d0395320f60db32c5a3e2b0acbf5bf10b05eb2))
- **deps-dev:** bump @storybook/react from 6.2.7 to 6.2.8 ([#259](https://github.com/scaleway/scaleway-ui/issues/259)) ([8a3c60a](https://github.com/scaleway/scaleway-ui/commit/8a3c60afb228b05c14b77aa9d06fed60d3463426))
- **deps-dev:** bump read-pkg from 5.2.0 to 6.0.0 ([#180](https://github.com/scaleway/scaleway-ui/issues/180)) ([249e768](https://github.com/scaleway/scaleway-ui/commit/249e7688617abd8c2c48f9f3a5040481cfd7243f))
- **deps-dev:** bump rollup from 2.45.1 to 2.45.2 ([#256](https://github.com/scaleway/scaleway-ui/issues/256)) ([886707f](https://github.com/scaleway/scaleway-ui/commit/886707f5ec3afa2ab2cb809dd24402f9b8c85590))
- **deps-dev:** bump rollup-plugin-visualizer from 5.3.4 to 5.3.6 ([#257](https://github.com/scaleway/scaleway-ui/issues/257)) ([ff349f9](https://github.com/scaleway/scaleway-ui/commit/ff349f9fc80c6c229154f357ed7754618b46ac94))
- **deps-dev:** bump rollup-plugin-visualizer from 5.3.6 to 5.4.0 ([#271](https://github.com/scaleway/scaleway-ui/issues/271)) ([202d7ce](https://github.com/scaleway/scaleway-ui/commit/202d7ce1b965fd0c53122677343eecaa75128ebb))
- **deps-dev:** bump rollup-plugin-visualizer from 5.4.0 to 5.4.1 ([#273](https://github.com/scaleway/scaleway-ui/issues/273)) ([8ce5676](https://github.com/scaleway/scaleway-ui/commit/8ce567633101a78de7b8045cf5002bc60ed82e50))

### :repeat: CI

- avoid persisting credentials ([449e32f](https://github.com/scaleway/scaleway-ui/commit/449e32fe8ec4b7c73c703e6bad54a199d8918193))
- correct deployment author ([0b54555](https://github.com/scaleway/scaleway-ui/commit/0b5455542c6dd6a5077bb9638dde97edb2c76480))
- remove CODECOV_TOKEN as repository is public ([#269](https://github.com/scaleway/scaleway-ui/issues/269)) ([0d77bf5](https://github.com/scaleway/scaleway-ui/commit/0d77bf5b75c7a28585ce853149cda0aff1d6d513))
- use github actions runners ([#254](https://github.com/scaleway/scaleway-ui/issues/254)) ([3214513](https://github.com/scaleway/scaleway-ui/commit/3214513899ae6561a2582b1a472476b3e0893c3d))
- use pat instead of gh_token ([c531dfd](https://github.com/scaleway/scaleway-ui/commit/c531dfd7583136e8dc063445d63994714b627a6d))

### [0.75.4](https://github.com/scaleway/scaleway-ui/compare/v0.75.3...v0.75.4) (2021-04-12)

### :package: Chore

- **deps-dev:** bump @testing-library/user-event from 13.1.1 to 13.1.2 ([#248](https://github.com/scaleway/scaleway-ui/issues/248)) ([3a966bc](https://github.com/scaleway/scaleway-ui/commit/3a966bc8d5c7f2bbf41d96cecd924da4312d25c6))
- **deps-dev:** bump eslint from 7.23.0 to 7.24.0 ([#252](https://github.com/scaleway/scaleway-ui/issues/252)) ([3744e91](https://github.com/scaleway/scaleway-ui/commit/3744e918dde9119df9bac70af9c74f7b72dd61af))
- **deps-dev:** bump postcss from 8.2.9 to 8.2.10 ([#251](https://github.com/scaleway/scaleway-ui/issues/251)) ([1308c53](https://github.com/scaleway/scaleway-ui/commit/1308c53b923417ad802e55ca46b18bc7e371dc70))
- **deps-dev:** bump rollup from 2.45.0 to 2.45.1 ([#250](https://github.com/scaleway/scaleway-ui/issues/250)) ([4adb8a2](https://github.com/scaleway/scaleway-ui/commit/4adb8a280e6bd9a11883db6a8943df9bfdeb2567))
- **deps-dev:** bump rollup-plugin-visualizer from 5.3.0 to 5.3.4 ([#249](https://github.com/scaleway/scaleway-ui/issues/249)) ([a518f43](https://github.com/scaleway/scaleway-ui/commit/a518f4370db8ecbbf771ae2c772402385be2f95d))

### :memo: Documentation

- reword README and add disclaimer ([#235](https://github.com/scaleway/scaleway-ui/issues/235)) ([e643b64](https://github.com/scaleway/scaleway-ui/commit/e643b64ab603f5e8c59f2f939749d29d2d5ddfa0))
- **readme:** add badges ([#225](https://github.com/scaleway/scaleway-ui/issues/225)) ([2861338](https://github.com/scaleway/scaleway-ui/commit/286133820f6aade20142ce4763ca7d839e48cf8c))

### :bug: Bug Fixes

- **DateInput:** correct colors ([#253](https://github.com/scaleway/scaleway-ui/issues/253)) ([7892120](https://github.com/scaleway/scaleway-ui/commit/78921203caaa2f58f7f93d1280e353d88300ae6d))

### [0.75.3](https://github.com/scaleway/scaleway-ui/compare/v0.75.2...v0.75.3) (2021-04-12)

### :bug: Bug Fixes

- **PhoneInput:** correct country flags not showing ([#244](https://github.com/scaleway/scaleway-ui/issues/244)) ([6845409](https://github.com/scaleway/scaleway-ui/commit/684540974d8cc50276793b75fef8b89142215dd6))

### [0.75.2](https://github.com/scaleway/scaleway-ui/compare/v0.75.1...v0.75.2) (2021-04-12)

### :bug: Bug Fixes

- correct named exports ([#247](https://github.com/scaleway/scaleway-ui/issues/247)) ([2ec0e25](https://github.com/scaleway/scaleway-ui/commit/2ec0e2540fe143ccb2c98f7c6a260a4a7cdae1de))

### [0.75.1](https://github.com/scaleway/scaleway-ui/compare/v0.75.0...v0.75.1) (2021-04-12)

### :package: Chore

- **deps-dev:** bump @storybook/addon-essentials from 6.2.5 to 6.2.7 ([#240](https://github.com/scaleway/scaleway-ui/issues/240)) ([3752790](https://github.com/scaleway/scaleway-ui/commit/375279027cb89f56fa3dca918590b659bbc954ec))

### :bug: Bug Fixes

- **Chart:** correct Legend bullet color ([#246](https://github.com/scaleway/scaleway-ui/issues/246)) ([0b7358c](https://github.com/scaleway/scaleway-ui/commit/0b7358c3224eb38225b85dede6911f1143330d2c))

## [0.75.0](https://github.com/scaleway/scaleway-ui/compare/v0.74.0...v0.75.0) (2021-04-09)

### :package: Chore

- **deps-dev:** bump @semantic-release/npm from 7.1.0 to 7.1.1 ([#242](https://github.com/scaleway/scaleway-ui/issues/242)) ([76753fe](https://github.com/scaleway/scaleway-ui/commit/76753fe6ccd1d546f52898b34fa30c6c9ac79201))
- **deps-dev:** bump @storybook/addon-actions from 6.2.5 to 6.2.7 ([#243](https://github.com/scaleway/scaleway-ui/issues/243)) ([4027b0b](https://github.com/scaleway/scaleway-ui/commit/4027b0bd4ba0a49e344a0b518a7e21f1da95cc11))
- **deps-dev:** bump @storybook/addon-docs from 6.2.5 to 6.2.7 ([#229](https://github.com/scaleway/scaleway-ui/issues/229)) ([1a03abb](https://github.com/scaleway/scaleway-ui/commit/1a03abbd4de4245483be1c61a956030ca64ed118))

### :gear: Features

- use colors from theme end ([#231](https://github.com/scaleway/scaleway-ui/issues/231)) ([b6def9c](https://github.com/scaleway/scaleway-ui/commit/b6def9c81c96afe33c95faae868a8d82e6761c3e)), closes [#209](https://github.com/scaleway/scaleway-ui/issues/209) [#210](https://github.com/scaleway/scaleway-ui/issues/210) [#211](https://github.com/scaleway/scaleway-ui/issues/211) [#201](https://github.com/scaleway/scaleway-ui/issues/201) [#155](https://github.com/scaleway/scaleway-ui/issues/155) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#150](https://github.com/scaleway/scaleway-ui/issues/150) [#152](https://github.com/scaleway/scaleway-ui/issues/152) [#187](https://github.com/scaleway/scaleway-ui/issues/187) [#161](https://github.com/scaleway/scaleway-ui/issues/161) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#178](https://github.com/scaleway/scaleway-ui/issues/178) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#168](https://github.com/scaleway/scaleway-ui/issues/168) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#179](https://github.com/scaleway/scaleway-ui/issues/179) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#202](https://github.com/scaleway/scaleway-ui/issues/202) [#155](https://github.com/scaleway/scaleway-ui/issues/155) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#150](https://github.com/scaleway/scaleway-ui/issues/150) [#152](https://github.com/scaleway/scaleway-ui/issues/152) [#187](https://github.com/scaleway/scaleway-ui/issues/187) [#161](https://github.com/scaleway/scaleway-ui/issues/161) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#178](https://github.com/scaleway/scaleway-ui/issues/178) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#168](https://github.com/scaleway/scaleway-ui/issues/168) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#179](https://github.com/scaleway/scaleway-ui/issues/179) [#160](https://github.com/scaleway/scaleway-ui/issues/160)

## [0.74.0](https://github.com/scaleway/scaleway-ui/compare/v0.73.0...v0.74.0) (2021-04-09)

### :repeat: CI

- safeguard deploy domain name ([#207](https://github.com/scaleway/scaleway-ui/issues/207)) ([7560fb9](https://github.com/scaleway/scaleway-ui/commit/7560fb9e17a98b2a17c3082840280916cd2210ba))

### :package: Chore

- **deps-dev:** bump @babel/core from 7.13.14 to 7.13.15 ([#238](https://github.com/scaleway/scaleway-ui/issues/238)) ([3d20b02](https://github.com/scaleway/scaleway-ui/commit/3d20b0237444bcef629cbbe7a27866ba36f97359))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#241](https://github.com/scaleway/scaleway-ui/issues/241)) ([2020bd7](https://github.com/scaleway/scaleway-ui/commit/2020bd7be4b58068d1317cf63eecd8c052863572))
- **deps-dev:** bump @babel/preset-env from 7.13.12 to 7.13.15 ([#227](https://github.com/scaleway/scaleway-ui/issues/227)) ([9c12420](https://github.com/scaleway/scaleway-ui/commit/9c1242005993d88a3342a8a4a67e082243157bf0))
- **deps-dev:** bump @emotion/jest from 11.2.1 to 11.3.0 ([#233](https://github.com/scaleway/scaleway-ui/issues/233)) ([0b96542](https://github.com/scaleway/scaleway-ui/commit/0b965428fdabc2d228709dcecbb5dfaec1a679ba))
- **deps-dev:** bump @emotion/styled from 11.1.5 to 11.3.0 ([#236](https://github.com/scaleway/scaleway-ui/issues/236)) ([18d5a5e](https://github.com/scaleway/scaleway-ui/commit/18d5a5eddeaea1d153c8adf62c6eee076367170d))
- **deps-dev:** bump @storybook/addon-links from 6.2.5 to 6.2.7 ([#237](https://github.com/scaleway/scaleway-ui/issues/237)) ([9e752aa](https://github.com/scaleway/scaleway-ui/commit/9e752aab6724a26d9b77ba1905ca1b9292712db9))
- **deps-dev:** bump @storybook/addons from 6.2.5 to 6.2.7 ([#230](https://github.com/scaleway/scaleway-ui/issues/230)) ([286c534](https://github.com/scaleway/scaleway-ui/commit/286c53486e3554c51d00c2b17c7c63fcead21867))
- **deps-dev:** bump @storybook/builder-webpack5 from 6.2.5 to 6.2.7 ([#239](https://github.com/scaleway/scaleway-ui/issues/239)) ([8a491a5](https://github.com/scaleway/scaleway-ui/commit/8a491a50138a7ae5e8d5b24d129416f7bc7a5351))
- **deps-dev:** bump @storybook/react from 6.2.5 to 6.2.7 ([#234](https://github.com/scaleway/scaleway-ui/issues/234)) ([6d6dc96](https://github.com/scaleway/scaleway-ui/commit/6d6dc96d1f1da1bf2978c9f361ab0e0ed03d08fe))
- **deps-dev:** bump rollup from 2.44.0 to 2.45.0 ([#228](https://github.com/scaleway/scaleway-ui/issues/228)) ([c055a22](https://github.com/scaleway/scaleway-ui/commit/c055a228eb8a623c9544cdf849bfce882a0f4b76))

### :gear: Features

- port Chart ([#204](https://github.com/scaleway/scaleway-ui/issues/204)) ([b51c123](https://github.com/scaleway/scaleway-ui/commit/b51c123b86f6f0ee463b1d93740fb193e27ac2b7))

## [0.73.0](https://github.com/scaleway/scaleway-ui/compare/v0.72.1...v0.73.0) (2021-04-09)

### :gear: Features

- port ActionBar, BulletList and Container ([#215](https://github.com/scaleway/scaleway-ui/issues/215)) ([4eccc43](https://github.com/scaleway/scaleway-ui/commit/4eccc43443a228f37d4081a4e6468b8ca888f114))

### [0.72.1](https://github.com/scaleway/scaleway-ui/compare/v0.72.0...v0.72.1) (2021-04-09)

### :package: Chore

- **deps:** bump react-datepicker from 3.6.0 to 3.7.0 ([#216](https://github.com/scaleway/scaleway-ui/issues/216)) ([158c42e](https://github.com/scaleway/scaleway-ui/commit/158c42e8f8dcadd1767ccea380ca4335310c03b1))
- **deps:** bump react-select from 4.1.0 to 4.3.0 ([#159](https://github.com/scaleway/scaleway-ui/issues/159)) ([ca60aba](https://github.com/scaleway/scaleway-ui/commit/ca60aba3f60529db2f5b7309ff5df470ebc76460))
- **deps:** bump reakit from 1.3.6 to 1.3.7 ([#217](https://github.com/scaleway/scaleway-ui/issues/217)) ([e8ca8a8](https://github.com/scaleway/scaleway-ui/commit/e8ca8a84e386a21178fd30648dcd3c70f4c67c67))
- upgrade all deps ([ffe9e33](https://github.com/scaleway/scaleway-ui/commit/ffe9e331d52645e58e1c65fdc5f95c1b6f961ecd))
- **deps-dev:** bump @commitlint/cli from 12.0.1 to 12.1.1 ([#213](https://github.com/scaleway/scaleway-ui/issues/213)) ([a2d21e8](https://github.com/scaleway/scaleway-ui/commit/a2d21e81ecc14e36d5a298c0f12ff0c9fb00a76d))
- **deps-dev:** bump @commitlint/config-conventional ([#218](https://github.com/scaleway/scaleway-ui/issues/218)) ([df9219a](https://github.com/scaleway/scaleway-ui/commit/df9219a1afdb19b8d1aa6b1e8ddc179abb29f1c1))
- **deps-dev:** bump @semantic-release/github from 7.2.0 to 7.2.1 ([#220](https://github.com/scaleway/scaleway-ui/issues/220)) ([8bc282f](https://github.com/scaleway/scaleway-ui/commit/8bc282fb088c956e9d89ab15f608af47576407bf))
- **deps-dev:** bump @semantic-release/npm from 7.0.10 to 7.1.0 ([#212](https://github.com/scaleway/scaleway-ui/issues/212)) ([74f5b8f](https://github.com/scaleway/scaleway-ui/commit/74f5b8f93f98d92e0adb8c93764740a0c44e3668))
- **deps-dev:** bump @storybook/react from 6.1.21 to 6.2.2 ([#206](https://github.com/scaleway/scaleway-ui/issues/206)) ([6dbbee1](https://github.com/scaleway/scaleway-ui/commit/6dbbee1d550fe0f1b3c284974443cc4dbaa2dbab))
- **deps-dev:** bump @storybook/theming from 6.2.3 to 6.2.4 ([#221](https://github.com/scaleway/scaleway-ui/issues/221)) ([c770192](https://github.com/scaleway/scaleway-ui/commit/c770192a9dc3e0c260ff77ff7c542d9cdee9bf1f))
- **deps-dev:** bump husky from 4.3.8 to 6.0.0 ([#189](https://github.com/scaleway/scaleway-ui/issues/189)) ([ef231c8](https://github.com/scaleway/scaleway-ui/commit/ef231c82d2b9c66a9cbc704f09695fc54c8d8c86))
- **deps-dev:** bump rollup-plugin-visualizer from 4.2.2 to 5.3.0 ([#214](https://github.com/scaleway/scaleway-ui/issues/214)) ([af4528b](https://github.com/scaleway/scaleway-ui/commit/af4528b41494c7b9d51ee6a05264f28ca9ca93af))

### :bug: Bug Fixes

- **build:** manually inject css files ([#219](https://github.com/scaleway/scaleway-ui/issues/219)) ([47b3eca](https://github.com/scaleway/scaleway-ui/commit/47b3ecaa5ec402447cec84cc194c7299c9ae09bd))
- **StealthCopiable:** allow component as children instead of only string ([#224](https://github.com/scaleway/scaleway-ui/issues/224)) ([eea458e](https://github.com/scaleway/scaleway-ui/commit/eea458e81a7cfd3f7bbef4e721f326fa52f0935f))

## [0.72.0](https://github.com/scaleway/scaleway-ui/compare/v0.71.0...v0.72.0) (2021-04-06)

### :gear: Features

- **migration:** migrated UnitInput ([#200](https://github.com/scaleway/scaleway-ui/issues/200)) ([28dd07a](https://github.com/scaleway/scaleway-ui/commit/28dd07add427f7f28509b7939501728d07272644))

## [0.71.0](https://github.com/scaleway/scaleway-ui/compare/v0.70.0...v0.71.0) (2021-04-02)

### :gear: Features

- port Image component ([#203](https://github.com/scaleway/scaleway-ui/issues/203)) ([7bc518d](https://github.com/scaleway/scaleway-ui/commit/7bc518d0939edd70e8cb6473b0b0e04c8e9579a9))

## [0.70.0](https://github.com/scaleway/scaleway-ui/compare/v0.69.0...v0.70.0) (2021-04-02)

### :package: Chore

- **deps-dev:** bump @testing-library/react from 11.2.5 to 11.2.6 ([#198](https://github.com/scaleway/scaleway-ui/issues/198)) ([85c6ffd](https://github.com/scaleway/scaleway-ui/commit/85c6ffd78c73b002885331a5bd745e77370c6de0))

### :gear: Features

- use colors from theme start ([#169](https://github.com/scaleway/scaleway-ui/issues/169)) ([0ad3b42](https://github.com/scaleway/scaleway-ui/commit/0ad3b42fc62939488e8d3a65c568e65cc498a0b3)), closes [#155](https://github.com/scaleway/scaleway-ui/issues/155) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#150](https://github.com/scaleway/scaleway-ui/issues/150) [#152](https://github.com/scaleway/scaleway-ui/issues/152) [#187](https://github.com/scaleway/scaleway-ui/issues/187) [#161](https://github.com/scaleway/scaleway-ui/issues/161) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#178](https://github.com/scaleway/scaleway-ui/issues/178) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#168](https://github.com/scaleway/scaleway-ui/issues/168) [#160](https://github.com/scaleway/scaleway-ui/issues/160) [#179](https://github.com/scaleway/scaleway-ui/issues/179) [#160](https://github.com/scaleway/scaleway-ui/issues/160)

## [0.69.0](https://github.com/scaleway/scaleway-ui/compare/v0.68.0...v0.69.0) (2021-03-31)

### :gear: Features

- migration of ProgressCircle ([#193](https://github.com/scaleway/scaleway-ui/issues/193)) ([daf63e4](https://github.com/scaleway/scaleway-ui/commit/daf63e49ae2fe0291b67d7cd83a3abead3956863))

## [0.68.0](https://github.com/scaleway/scaleway-ui/compare/v0.67.0...v0.68.0) (2021-03-31)

### :memo: Documentation

- updated logo url in storybook ([49fbbae](https://github.com/scaleway/scaleway-ui/commit/49fbbae505b776ff4cad13345a3fd77d33eb7e1b))

### :package: Chore

- **deps-dev:** bump @testing-library/user-event from 13.0.16 to 13.1.1 ([#197](https://github.com/scaleway/scaleway-ui/issues/197)) ([5945938](https://github.com/scaleway/scaleway-ui/commit/5945938c4f23ddcbdff35987eae0f8d26be48d0b))

### :gear: Features

- port StealthCopiable ([#195](https://github.com/scaleway/scaleway-ui/issues/195)) ([b631fd1](https://github.com/scaleway/scaleway-ui/commit/b631fd13cb73922f2f7c2df06405ede183d9a820))

## [0.67.0](https://github.com/scaleway/scaleway-ui/compare/v0.66.2...v0.67.0) (2021-03-29)

### :package: Chore

- **deps-dev:** bump @babel/core from 7.13.10 to 7.13.14 ([#190](https://github.com/scaleway/scaleway-ui/issues/190)) ([a8809e3](https://github.com/scaleway/scaleway-ui/commit/a8809e35e82f48bd582282a99df3c96c9a1de7ca))
- **deps-dev:** bump @babel/eslint-parser from 7.13.10 to 7.13.14 ([#192](https://github.com/scaleway/scaleway-ui/issues/192)) ([87a1223](https://github.com/scaleway/scaleway-ui/commit/87a1223187344d3420cfd52458885856466f692f))
- **deps-dev:** bump @babel/preset-react from 7.12.13 to 7.13.13 ([#184](https://github.com/scaleway/scaleway-ui/issues/184)) ([ab53307](https://github.com/scaleway/scaleway-ui/commit/ab533074cf44c52b4ba2611bb040d05331bbc34f))
- **deps-dev:** bump @rollup/plugin-commonjs from 17.1.0 to 18.0.0 ([#186](https://github.com/scaleway/scaleway-ui/issues/186)) ([f49de37](https://github.com/scaleway/scaleway-ui/commit/f49de3794e599b60f62d3a2117d6db728072e7f1))
- **deps-dev:** bump eslint from 7.22.0 to 7.23.0 ([#185](https://github.com/scaleway/scaleway-ui/issues/185)) ([c767c31](https://github.com/scaleway/scaleway-ui/commit/c767c3125484f2347429d39e38e581d8c16e490e))
- **deps-dev:** bump rollup from 2.43.1 to 2.44.0 ([#188](https://github.com/scaleway/scaleway-ui/issues/188)) ([eadc227](https://github.com/scaleway/scaleway-ui/commit/eadc227c532a7fed5dd6edbae1fa8357739ea850))

### :gear: Features

- port Notice ([#178](https://github.com/scaleway/scaleway-ui/issues/178)) ([05e17be](https://github.com/scaleway/scaleway-ui/commit/05e17bef3e5d281067f4a716302b4b43448b88dd))

### [0.66.2](https://github.com/scaleway/scaleway-ui/compare/v0.66.1...v0.66.2) (2021-03-29)

### :package: Chore

- **deps:** bump @xstyled/emotion from 2.3.0 to 2.4.1 ([#183](https://github.com/scaleway/scaleway-ui/issues/183)) ([958ec61](https://github.com/scaleway/scaleway-ui/commit/958ec61ca8fbb1c37f0c9b3541b7d0150917434a))
- **deps-dev:** bump @rollup/plugin-node-resolve from 11.2.0 to 11.2.1 ([#182](https://github.com/scaleway/scaleway-ui/issues/182)) ([a8f782c](https://github.com/scaleway/scaleway-ui/commit/a8f782c4d32d2c3ba6e4f36fabd82ef57d1f81e3))
- **deps-dev:** bump @testing-library/jest-dom from 5.11.9 to 5.11.10 ([#175](https://github.com/scaleway/scaleway-ui/issues/175)) ([eb966ed](https://github.com/scaleway/scaleway-ui/commit/eb966edd13bcb3289af22a01d078b0a87b9f701f))
- **deps-dev:** bump @testing-library/user-event ([#176](https://github.com/scaleway/scaleway-ui/issues/176)) ([cca6fca](https://github.com/scaleway/scaleway-ui/commit/cca6fcafa75a11146b11f1be8bebb9024ddc5a08))
- **deps-dev:** bump rollup from 2.42.3 to 2.43.1 ([#181](https://github.com/scaleway/scaleway-ui/issues/181)) ([c3e9621](https://github.com/scaleway/scaleway-ui/commit/c3e962108f2d876a42c078b6d565eb70977601bc))

### :bug: Bug Fixes

- **richselect:** fixed no label ([5e714a0](https://github.com/scaleway/scaleway-ui/commit/5e714a06f66c3b419c45d6c651ec105e98707b28))

### [0.66.1](https://github.com/scaleway/scaleway-ui/compare/v0.66.0...v0.66.1) (2021-03-24)

### :memo: Documentation

- adds doc about coverage ([#149](https://github.com/scaleway/scaleway-ui/issues/149)) ([57dc62b](https://github.com/scaleway/scaleway-ui/commit/57dc62b8bfbfa55b812b9e0aefeb7fc87848e5a6))

### :white_check_mark: Test

- use testing-library to handle paste events ([#145](https://github.com/scaleway/scaleway-ui/issues/145)) ([f315a2a](https://github.com/scaleway/scaleway-ui/commit/f315a2ac7c010d56df82fe4843ccfbc5af1ca7b8))
- **stepper:** add user event test ([#137](https://github.com/scaleway/scaleway-ui/issues/137)) ([5c0e422](https://github.com/scaleway/scaleway-ui/commit/5c0e4228974bf447bdf3baeddd1310bb478888a6))

### :package: Chore

- **deps:** bump @xstyled/emotion from 2.2.3 to 2.3.0 ([#166](https://github.com/scaleway/scaleway-ui/issues/166)) ([29adafb](https://github.com/scaleway/scaleway-ui/commit/29adafbee7683894611b006e92c8146475a354af))
- **deps-dev:** bump @babel/preset-env from 7.13.10 to 7.13.12 ([#162](https://github.com/scaleway/scaleway-ui/issues/162)) ([059d91d](https://github.com/scaleway/scaleway-ui/commit/059d91d470d1a24f0b9788b1f10ff1067259fe30))
- **deps-dev:** bump @testing-library/user-event from 12.8.3 to 13.0.6 ([#156](https://github.com/scaleway/scaleway-ui/issues/156)) ([972063c](https://github.com/scaleway/scaleway-ui/commit/972063c2555c53cc1ba8710e920823851900a972))
- **deps-dev:** bump @testing-library/user-event from 13.0.6 to 13.0.7 ([#167](https://github.com/scaleway/scaleway-ui/issues/167)) ([73ef3be](https://github.com/scaleway/scaleway-ui/commit/73ef3be9c141bb63e5b3a6d188881d8363a82880))
- **deps-dev:** bump @testing-library/user-event from 13.0.7 to 13.0.10 ([#171](https://github.com/scaleway/scaleway-ui/issues/171)) ([66d7eaa](https://github.com/scaleway/scaleway-ui/commit/66d7eaa9bb6643b4348a5d0da757332f348783c8))
- **deps-dev:** bump react from 17.0.1 to 17.0.2 ([#163](https://github.com/scaleway/scaleway-ui/issues/163)) ([9129d86](https://github.com/scaleway/scaleway-ui/commit/9129d866e6267df806f2e8d20aa310e6e40e5a07))
- **deps-dev:** bump react-is from 17.0.1 to 17.0.2 ([#165](https://github.com/scaleway/scaleway-ui/issues/165)) ([7cc567f](https://github.com/scaleway/scaleway-ui/commit/7cc567f112bab11b50211fe3b7ed314607cc6574))
- **deps-dev:** bump rollup from 2.41.4 to 2.42.2 ([#157](https://github.com/scaleway/scaleway-ui/issues/157)) ([0edbe4e](https://github.com/scaleway/scaleway-ui/commit/0edbe4e0cdc5fe2d0715523b0c056ecd1b884e22))
- **deps-dev:** bump rollup from 2.42.2 to 2.42.3 ([#164](https://github.com/scaleway/scaleway-ui/issues/164)) ([04edd4c](https://github.com/scaleway/scaleway-ui/commit/04edd4c20b32bacc68878db4ef7b8ee5620c43f1))
- **deps-dev:** bump rollup-plugin-visualizer from 4.2.0 to 4.2.1 ([#146](https://github.com/scaleway/scaleway-ui/issues/146)) ([8261e7a](https://github.com/scaleway/scaleway-ui/commit/8261e7aecea99f55d31f6d018ff78d99845dd9b3))
- **deps-dev:** bump rollup-plugin-visualizer from 4.2.1 to 4.2.2 ([#170](https://github.com/scaleway/scaleway-ui/issues/170)) ([65bea02](https://github.com/scaleway/scaleway-ui/commit/65bea02666b984670fac4a7f62da0e29eb21fbd3))

### :bug: Bug Fixes

- rich select option label ([658d0c9](https://github.com/scaleway/scaleway-ui/commit/658d0c9bf52291c51bcc51259822768c7b2e8cf9))

## [0.66.0](https://github.com/scaleway/scaleway-ui/compare/v0.65.0...v0.66.0) (2021-03-18)

### :gear: Features

- **badge:** new variant ([7c77b34](https://github.com/scaleway/scaleway-ui/commit/7c77b34c0e68b9383002fed727598b6bfcf906ee))

## [0.65.0](https://github.com/scaleway/scaleway-ui/compare/v0.64.1...v0.65.0) (2021-03-18)

### :gear: Features

- radioborderedbox and bordered box from console ([#144](https://github.com/scaleway/scaleway-ui/issues/144)) ([1cccb8a](https://github.com/scaleway/scaleway-ui/commit/1cccb8ad861ce44467335d1203d8d1dfe383f42e))

### [0.64.1](https://github.com/scaleway/scaleway-ui/compare/v0.64.0...v0.64.1) (2021-03-18)

### :package: Chore

- **deps-dev:** bump eslint from 7.21.0 to 7.22.0 ([#135](https://github.com/scaleway/scaleway-ui/issues/135)) ([50b2222](https://github.com/scaleway/scaleway-ui/commit/50b22229c0b6cc693e7a62068f8446c16c08735f))
- **deps-dev:** bump eslint-plugin-mdx from 1.9.0 to 1.9.1 ([#133](https://github.com/scaleway/scaleway-ui/issues/133)) ([54b6fd9](https://github.com/scaleway/scaleway-ui/commit/54b6fd99bd8eace2031919a8f1ecc0caa9364b47))
- **deps-dev:** bump rollup from 2.41.1 to 2.41.2 ([#136](https://github.com/scaleway/scaleway-ui/issues/136)) ([3ea600b](https://github.com/scaleway/scaleway-ui/commit/3ea600b7c8dc171187405dcb3971c9b833d88fd9))
- **deps-dev:** bump rollup from 2.41.2 to 2.41.3 ([#138](https://github.com/scaleway/scaleway-ui/issues/138)) ([0e7ef20](https://github.com/scaleway/scaleway-ui/commit/0e7ef20ffd7cc7a2b6e4c1adde5003f27a32b6cc))
- **deps-dev:** bump rollup from 2.41.3 to 2.41.4 ([#142](https://github.com/scaleway/scaleway-ui/issues/142)) ([899e1f3](https://github.com/scaleway/scaleway-ui/commit/899e1f31bee1aba051ff2689fc93b9f20dbd3d28))

### :bug: Bug Fixes

- spacing on textbox error with medium size and no label ([#139](https://github.com/scaleway/scaleway-ui/issues/139)) ([d26ceb4](https://github.com/scaleway/scaleway-ui/commit/d26ceb4828aa4448aa6454f3f44c4bebef95ce6d))

## [0.64.0](https://github.com/scaleway/scaleway-ui/compare/v0.63.0...v0.64.0) (2021-03-15)

### :gear: Features

- tags component ([#130](https://github.com/scaleway/scaleway-ui/issues/130)) ([f66f1f7](https://github.com/scaleway/scaleway-ui/commit/f66f1f7fd9fe9f1db044aa0aa625287a21f2af9f))

## [0.63.0](https://github.com/scaleway/scaleway-ui/compare/v0.62.0...v0.63.0) (2021-03-15)

### :package: Chore

- **deps:** bump bobheadxi/deployments from v0.4.3 to v0.5.2 ([#132](https://github.com/scaleway/scaleway-ui/issues/132)) ([6982722](https://github.com/scaleway/scaleway-ui/commit/6982722a4d1b96f39c6b44c14ab1021fcdb92f15))
- **deps-dev:** bump semantic-release from 17.4.1 to 17.4.2 ([#134](https://github.com/scaleway/scaleway-ui/issues/134)) ([19b6028](https://github.com/scaleway/scaleway-ui/commit/19b60284c4846770b7867a9ad1a7542be665055e))

### :gear: Features

- migrate date input ([#108](https://github.com/scaleway/scaleway-ui/issues/108)) ([12ea81d](https://github.com/scaleway/scaleway-ui/commit/12ea81d0c3c0c06d9e157a8108c4dfdbcbb8c684))

## [0.62.0](https://github.com/scaleway/scaleway-ui/compare/v0.61.0...v0.62.0) (2021-03-11)

### :package: Chore

- **deps:** bump @babel/runtime from 7.13.9 to 7.13.10 ([#127](https://github.com/scaleway/scaleway-ui/issues/127)) ([a558ead](https://github.com/scaleway/scaleway-ui/commit/a558ead83c28380ab11633d4b9d6031c04bb6cdc))
- **deps-dev:** bump @babel/core from 7.13.8 to 7.13.10 ([#125](https://github.com/scaleway/scaleway-ui/issues/125)) ([2c876ab](https://github.com/scaleway/scaleway-ui/commit/2c876abd8dd75ebcf42e6cb17a231aad3d9c4798))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#128](https://github.com/scaleway/scaleway-ui/issues/128)) ([a82bfa5](https://github.com/scaleway/scaleway-ui/commit/a82bfa5e54d02bf9b6f0626a03f951668d9819df))
- **deps-dev:** bump @babel/preset-env from 7.13.9 to 7.13.10 ([#124](https://github.com/scaleway/scaleway-ui/issues/124)) ([bec2a48](https://github.com/scaleway/scaleway-ui/commit/bec2a48c29536b119e3557e04b3157044d1aa194))
- **deps-dev:** bump @semantic-release/release-notes-generator ([#122](https://github.com/scaleway/scaleway-ui/issues/122)) ([396cedd](https://github.com/scaleway/scaleway-ui/commit/396cedd5d2eaeecaa47a1460ed460e53394be5a1))
- **deps-dev:** bump postcss from 8.2.7 to 8.2.8 ([#129](https://github.com/scaleway/scaleway-ui/issues/129)) ([42738f4](https://github.com/scaleway/scaleway-ui/commit/42738f4c7e75ffe72e5fa41ae3f75a3839e1d7e2))
- **deps-dev:** bump rollup from 2.40.0 to 2.41.0 ([#123](https://github.com/scaleway/scaleway-ui/issues/123)) ([36c8ce7](https://github.com/scaleway/scaleway-ui/commit/36c8ce729660cd3aa58d6b344dabc1eacd224e53))
- **deps-dev:** bump rollup from 2.41.0 to 2.41.1 ([#131](https://github.com/scaleway/scaleway-ui/issues/131)) ([455716f](https://github.com/scaleway/scaleway-ui/commit/455716f91c62dfcc6126d5ab200060afdbce8f83))

### :gear: Features

- migrate phoneinput ([#90](https://github.com/scaleway/scaleway-ui/issues/90)) ([2d467ad](https://github.com/scaleway/scaleway-ui/commit/2d467ade5c312820c91e76b135d891ec737e350f))

## [0.61.0](https://github.com/scaleway/scaleway-ui/compare/v0.60.1...v0.61.0) (2021-03-08)

### :gear: Features

- add tab group ([#101](https://github.com/scaleway/scaleway-ui/issues/101)) ([213c5e8](https://github.com/scaleway/scaleway-ui/commit/213c5e872d587ec7e3c7309c8f54da2e48914c10))

### [0.60.1](https://github.com/scaleway/scaleway-ui/compare/v0.60.0...v0.60.1) (2021-03-08)

### :memo: Documentation

- added default template for pull requests ([0e01007](https://github.com/scaleway/scaleway-ui/commit/0e01007da66f9c1db7ada054cb0f530ed8264aca))

### :bug: Bug Fixes

- **information:** fixed component to use children only ([263e9f6](https://github.com/scaleway/scaleway-ui/commit/263e9f6ad55ca97525e25835d1a4beab4d010379))

## [0.60.0](https://github.com/scaleway/scaleway-ui/compare/v0.59.0...v0.60.0) (2021-03-08)

### :package: Chore

- **deps:** bump reakit from 1.3.5 to 1.3.6 ([#95](https://github.com/scaleway/scaleway-ui/issues/95)) ([b6620c7](https://github.com/scaleway/scaleway-ui/commit/b6620c7f2c15a96bd3b4e1a76b5d7ec7c8908f1b))
- **deps-dev:** bump @emotion/jest from 11.2.0 to 11.2.1 ([#121](https://github.com/scaleway/scaleway-ui/issues/121)) ([3d246d9](https://github.com/scaleway/scaleway-ui/commit/3d246d9a19312ae4a3ba4b6fca31fc78c2a6c8e6))

### :gear: Features

- migrate Placeholder ([#79](https://github.com/scaleway/scaleway-ui/issues/79)) ([3a760d8](https://github.com/scaleway/scaleway-ui/commit/3a760d89c1f26ccbf99539b52e1b6aab8901add3))

## [0.59.0](https://github.com/scaleway/scaleway-ui/compare/v0.58.4...v0.59.0) (2021-03-04)

### :gear: Features

- add some new functionnalities to switch component ([#82](https://github.com/scaleway/scaleway-ui/issues/82)) ([b73468a](https://github.com/scaleway/scaleway-ui/commit/b73468a6273734d96b7b082a74a66f83e2d3766a))

### [0.58.4](https://github.com/scaleway/scaleway-ui/compare/v0.58.3...v0.58.4) (2021-03-04)

### :bug: Bug Fixes

- add orange as text color in information ([9629a1e](https://github.com/scaleway/scaleway-ui/commit/9629a1e15d1675113a2d7e1ea687af9d9076cbfb))

### :package: Chore

- **deps-dev:** bump @scaleway/eslint-config-react from 1.3.1 to 1.4.0 ([#114](https://github.com/scaleway/scaleway-ui/issues/114)) ([86f5acd](https://github.com/scaleway/scaleway-ui/commit/86f5acd7d6b1fd7bf6bf5dc62c3b4d4da8db524b))

### [0.58.3](https://github.com/scaleway/scaleway-ui/compare/v0.58.2...v0.58.3) (2021-03-04)

### :package: Chore

- **deps:** bump @babel/runtime from 7.13.7 to 7.13.9 ([#96](https://github.com/scaleway/scaleway-ui/issues/96)) ([da59040](https://github.com/scaleway/scaleway-ui/commit/da59040ec407f96c1a4c9d34c9443d60065717ca))
- **deps:** bump @scaleway/random-name from 1.2.1 to 1.3.0 ([#116](https://github.com/scaleway/scaleway-ui/issues/116)) ([3f44509](https://github.com/scaleway/scaleway-ui/commit/3f44509b70df54bc781b700d69463444219e747a))
- **deps-dev:** bump @babel/core from 7.13.1 to 7.13.8 ([#97](https://github.com/scaleway/scaleway-ui/issues/97)) ([6d35c4f](https://github.com/scaleway/scaleway-ui/commit/6d35c4f7828c1ac84b3298e738695edba552955f))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#99](https://github.com/scaleway/scaleway-ui/issues/99)) ([06940f8](https://github.com/scaleway/scaleway-ui/commit/06940f89e912ef102d6ac5054c65bd4056fe74ec))
- **deps-dev:** bump @babel/preset-env from 7.13.8 to 7.13.9 ([#98](https://github.com/scaleway/scaleway-ui/issues/98)) ([01b645c](https://github.com/scaleway/scaleway-ui/commit/01b645cbcc62738dcc2d3a7226090630fc58c9c8))
- **deps-dev:** bump @commitlint/config-conventional ([#115](https://github.com/scaleway/scaleway-ui/issues/115)) ([2884b92](https://github.com/scaleway/scaleway-ui/commit/2884b92a1d3b2b582da69d785b3281c4e1b0695f))
- **deps-dev:** bump @storybook/addon-essentials from 6.1.20 to 6.1.21 ([#107](https://github.com/scaleway/scaleway-ui/issues/107)) ([6e8ac42](https://github.com/scaleway/scaleway-ui/commit/6e8ac4291331037e06bef98db5d0ed234c51b9c2))
- **deps-dev:** bump @storybook/addon-links from 6.1.20 to 6.1.21 ([#103](https://github.com/scaleway/scaleway-ui/issues/103)) ([5bf17f9](https://github.com/scaleway/scaleway-ui/commit/5bf17f9dcd3ad6832ca76fc99e3fa4a81ee4afe1))
- **deps-dev:** bump @storybook/react from 6.1.20 to 6.1.21 ([#104](https://github.com/scaleway/scaleway-ui/issues/104)) ([154498f](https://github.com/scaleway/scaleway-ui/commit/154498f77e54d8ce9261a03b1d9bc70adaf8e2ef))
- **deps-dev:** bump @storybook/theming from 6.1.20 to 6.1.21 ([#111](https://github.com/scaleway/scaleway-ui/issues/111)) ([c4ca4df](https://github.com/scaleway/scaleway-ui/commit/c4ca4df880ca77a81baf57b2f4af8a7840ec4d20))
- **deps-dev:** bump postcss from 8.2.6 to 8.2.7 ([#110](https://github.com/scaleway/scaleway-ui/issues/110)) ([49cf977](https://github.com/scaleway/scaleway-ui/commit/49cf97797ac27285946f2dcb5042269e6d8e8a52))
- **deps-dev:** bump semantic-release from 17.4.0 to 17.4.1 ([#112](https://github.com/scaleway/scaleway-ui/issues/112)) ([f4e3d81](https://github.com/scaleway/scaleway-ui/commit/f4e3d8103f1d123f53905f316a4defa094b05fb7))

### :bug: Bug Fixes

- adds yalc into readme ([#113](https://github.com/scaleway/scaleway-ui/issues/113)) ([a9f4aaf](https://github.com/scaleway/scaleway-ui/commit/a9f4aaff1252d07ac7ab60cff0f59c4895ad9119))

### [0.58.2](https://github.com/scaleway/scaleway-ui/compare/v0.58.1...v0.58.2) (2021-03-02)

### :lipstick: Style

- enable second batch of eslint warnings ([#81](https://github.com/scaleway/scaleway-ui/issues/81)) ([ec77432](https://github.com/scaleway/scaleway-ui/commit/ec77432e30085017b94b28197f2514171a549389))

### :repeat: CI

- use new scaleway domain ([#89](https://github.com/scaleway/scaleway-ui/issues/89)) ([170acf0](https://github.com/scaleway/scaleway-ui/commit/170acf04d066c6fcf280c1af62293cc1667dc62b))

### :package: Chore

- remove useCopyToClipboard hook ([#88](https://github.com/scaleway/scaleway-ui/issues/88)) ([c0e8507](https://github.com/scaleway/scaleway-ui/commit/c0e8507cb2bed2d5835ea933b62ae6c49d8e16df))
- **deps:** bump polished from 4.1.0 to 4.1.1 ([#84](https://github.com/scaleway/scaleway-ui/issues/84)) ([935a379](https://github.com/scaleway/scaleway-ui/commit/935a3794494ba037c75d66e66bd77d0612f9c6f6))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#91](https://github.com/scaleway/scaleway-ui/issues/91)) ([f3ed91a](https://github.com/scaleway/scaleway-ui/commit/f3ed91ac424058baa8d7c6178f45919772e35717))
- **deps-dev:** bump @babel/preset-env from 7.13.5 to 7.13.8 ([#94](https://github.com/scaleway/scaleway-ui/issues/94)) ([b49e771](https://github.com/scaleway/scaleway-ui/commit/b49e771b30c4badb544c133a2f595efb1689fa19))
- **deps-dev:** bump @commitlint/cli from 12.0.0 to 12.0.1 ([#92](https://github.com/scaleway/scaleway-ui/issues/92)) ([1879e9a](https://github.com/scaleway/scaleway-ui/commit/1879e9a6d8269e2b8bbb0394c3d80a95596bd9e7))
- **deps-dev:** bump @emotion/babel-preset-css-prop ([#83](https://github.com/scaleway/scaleway-ui/issues/83)) ([8065808](https://github.com/scaleway/scaleway-ui/commit/806580861f577b1e7be52ffae088721e024469e7))
- **deps-dev:** bump @storybook/addon-essentials from 6.1.19 to 6.1.20 ([#78](https://github.com/scaleway/scaleway-ui/issues/78)) ([75b0aeb](https://github.com/scaleway/scaleway-ui/commit/75b0aebb01dbe70acc3b2a4f4e57363095ebb678))
- **deps-dev:** bump eslint from 7.20.0 to 7.21.0 ([#93](https://github.com/scaleway/scaleway-ui/issues/93)) ([9af87fd](https://github.com/scaleway/scaleway-ui/commit/9af87fd4abfafdd0befa2eabd3b58ae32a7a27af))
- **deps-dev:** bump rollup from 2.39.1 to 2.40.0 ([#87](https://github.com/scaleway/scaleway-ui/issues/87)) ([ae4efaa](https://github.com/scaleway/scaleway-ui/commit/ae4efaa4145ba4a69af58f516fdc6241c10f6e2b))
- **deps-dev:** bump semantic-release from 17.3.9 to 17.4.0 ([#86](https://github.com/scaleway/scaleway-ui/issues/86)) ([d753a09](https://github.com/scaleway/scaleway-ui/commit/d753a09e989f40d2f32d627f30bd26f65b6dd0ef))

### :bug: Bug Fixes

- correct useEffect when using reakit state ([#100](https://github.com/scaleway/scaleway-ui/issues/100)) ([01d0241](https://github.com/scaleway/scaleway-ui/commit/01d0241417bb8d606ac9c809b4e3384406b8176c))

### [0.58.1](https://github.com/scaleway/scaleway-ui/compare/v0.58.0...v0.58.1) (2021-02-26)

### :white_check_mark: Test

- add tests on helpers and utils ([#55](https://github.com/scaleway/scaleway-ui/issues/55)) ([107b407](https://github.com/scaleway/scaleway-ui/commit/107b4078736c8d55cfdba9d7bd5b99a3276d6144))

### :bug: Bug Fixes

- textbox random disabled ([#80](https://github.com/scaleway/scaleway-ui/issues/80)) ([3a7b769](https://github.com/scaleway/scaleway-ui/commit/3a7b7692da4051a7d57a15fd590f62ad796af8d6))

## [0.58.0](https://github.com/scaleway/scaleway-ui/compare/v0.57.2...v0.58.0) (2021-02-25)

### :gear: Features

- migrate TimeInput ([#77](https://github.com/scaleway/scaleway-ui/issues/77)) ([5b350c9](https://github.com/scaleway/scaleway-ui/commit/5b350c9c1d384e4b9f05c783ffc4350773554680))

### :package: Chore

- **deps:** bump @babel/runtime from 7.12.18 to 7.13.7 ([#62](https://github.com/scaleway/scaleway-ui/issues/62)) ([4b9dcf2](https://github.com/scaleway/scaleway-ui/commit/4b9dcf2fa9905021a414bfda821d7a8fa575afb4))
- **deps:** bump @scaleway/random-name from 1.2.0 to 1.2.1 ([#76](https://github.com/scaleway/scaleway-ui/issues/76)) ([542a575](https://github.com/scaleway/scaleway-ui/commit/542a5757eef1f6ad1240787721bde7aeaa31de3e))
- **deps:** bump @xstyled/emotion from 2.2.2 to 2.2.3 ([#73](https://github.com/scaleway/scaleway-ui/issues/73)) ([c7042f9](https://github.com/scaleway/scaleway-ui/commit/c7042f92c94cf9f70986ec8d0350b901e22daf95))
- **deps-dev:** bump @babel/plugin-transform-runtime ([#69](https://github.com/scaleway/scaleway-ui/issues/69)) ([b7bba3d](https://github.com/scaleway/scaleway-ui/commit/b7bba3ddcf6ec4f593522c90e9c96104133e387f))
- **deps-dev:** bump @babel/preset-env from 7.12.13 to 7.13.5 ([#57](https://github.com/scaleway/scaleway-ui/issues/57)) ([8c79ae6](https://github.com/scaleway/scaleway-ui/commit/8c79ae6e5f81339469367063ec23a85dc4c3de1b))
- **deps-dev:** bump @commitlint/config-conventional ([#60](https://github.com/scaleway/scaleway-ui/issues/60)) ([3cca2d9](https://github.com/scaleway/scaleway-ui/commit/3cca2d904d913c8ec25ecb62d3f67e990ce9ab4a))
- **deps-dev:** bump @rollup/plugin-babel from 5.2.3 to 5.3.0 ([#71](https://github.com/scaleway/scaleway-ui/issues/71)) ([8325d5c](https://github.com/scaleway/scaleway-ui/commit/8325d5cd045000a69e21b5372246f6e7a098707d))
- **deps-dev:** bump @scaleway/eslint-config-react from 1.2.0 to 1.3.1 ([#75](https://github.com/scaleway/scaleway-ui/issues/75)) ([78d3501](https://github.com/scaleway/scaleway-ui/commit/78d3501852f7b69f2ad4d565adfc75f39b076eb6))
- **deps-dev:** bump @storybook/addon-actions from 6.1.19 to 6.1.20 ([#70](https://github.com/scaleway/scaleway-ui/issues/70)) ([c5e0fed](https://github.com/scaleway/scaleway-ui/commit/c5e0fed4088a399a937efc25139dd4c33f8062e5))
- **deps-dev:** bump @storybook/addon-links from 6.1.18 to 6.1.20 ([#66](https://github.com/scaleway/scaleway-ui/issues/66)) ([519816c](https://github.com/scaleway/scaleway-ui/commit/519816cb219d5a678c1ecb16d0041095d7d67cf8))
- **deps-dev:** bump @storybook/addons from 6.1.19 to 6.1.20 ([#65](https://github.com/scaleway/scaleway-ui/issues/65)) ([f8633b6](https://github.com/scaleway/scaleway-ui/commit/f8633b6c5caf52286f142a6b23081261bc520d83))
- **deps-dev:** bump @storybook/react from 6.1.17 to 6.1.20 ([#68](https://github.com/scaleway/scaleway-ui/issues/68)) ([e13cdf6](https://github.com/scaleway/scaleway-ui/commit/e13cdf6f5518213378b0c6ca9103c5c7d75864f5))
- **deps-dev:** bump @storybook/theming from 6.1.18 to 6.1.20 ([#64](https://github.com/scaleway/scaleway-ui/issues/64)) ([bcfbca3](https://github.com/scaleway/scaleway-ui/commit/bcfbca33c9c9a92c7adff81a652614994cb77993))
- **deps-dev:** bump eslint from 7.19.0 to 7.20.0 ([#59](https://github.com/scaleway/scaleway-ui/issues/59)) ([d40f448](https://github.com/scaleway/scaleway-ui/commit/d40f4484b07984f13ada8c3e278e56306c6cbce1))
- **deps-dev:** bump eslint-plugin-mdx from 1.8.2 to 1.9.0 ([#74](https://github.com/scaleway/scaleway-ui/issues/74)) ([7bdfa58](https://github.com/scaleway/scaleway-ui/commit/7bdfa58a91d6f0fa25c9ff7e1e167b8433e4270b))
- **deps-dev:** bump semantic-release from 17.3.7 to 17.3.9 ([#72](https://github.com/scaleway/scaleway-ui/issues/72)) ([e7d68f1](https://github.com/scaleway/scaleway-ui/commit/e7d68f1ea0cefff6eb3b519166aa6d74dc18f7b7))

### [0.57.2](https://github.com/scaleway/scaleway-ui/compare/v0.57.1...v0.57.2) (2021-02-24)

### :repeat: CI

- do not reuse dirty cache on deploy ([#46](https://github.com/scaleway/scaleway-ui/issues/46)) ([eae2dd8](https://github.com/scaleway/scaleway-ui/commit/eae2dd8e4e91539ac0664d66db2217ca15cbd3c7))

### :package: Chore

- **deps:** bump actions/setup-node from v2.1.4 to v2.1.5 ([#48](https://github.com/scaleway/scaleway-ui/issues/48)) ([340f8a2](https://github.com/scaleway/scaleway-ui/commit/340f8a2ef6835626be6d644d1446e303235da492))
- **deps-dev:** bump @babel/core from 7.12.13 to 7.13.1 ([#49](https://github.com/scaleway/scaleway-ui/issues/49)) ([6664964](https://github.com/scaleway/scaleway-ui/commit/666496462bd936d9d6fa961895a5b49051c5ecf1))
- **deps-dev:** bump @commitlint/cli from 11.0.0 to 12.0.0 ([#52](https://github.com/scaleway/scaleway-ui/issues/52)) ([3f8707e](https://github.com/scaleway/scaleway-ui/commit/3f8707ebea8e9d64ef729bee6ec03415368af515))
- **deps-dev:** bump @emotion/eslint-plugin from 11.0.0 to 11.2.0 ([#47](https://github.com/scaleway/scaleway-ui/issues/47)) ([f420ba9](https://github.com/scaleway/scaleway-ui/commit/f420ba9007434fd4c66f0acf47e118f49638885d))
- **deps-dev:** bump @emotion/jest from 11.1.0 to 11.2.0 ([#41](https://github.com/scaleway/scaleway-ui/issues/41)) ([305b7e4](https://github.com/scaleway/scaleway-ui/commit/305b7e4002029753a89b199285217270598a0abe))
- **deps-dev:** bump @rollup/plugin-node-resolve from 11.1.1 to 11.2.0 ([#40](https://github.com/scaleway/scaleway-ui/issues/40)) ([ca22c45](https://github.com/scaleway/scaleway-ui/commit/ca22c450ad24d6e91f825f8f151e3c1575ea9db0))
- **deps-dev:** bump @storybook/addon-essentials from 6.1.17 to 6.1.19 ([#54](https://github.com/scaleway/scaleway-ui/issues/54)) ([e351f3f](https://github.com/scaleway/scaleway-ui/commit/e351f3f706a7ed89a3660cf5ead0bb0153843aad))
- **deps-dev:** bump postcss from 8.2.5 to 8.2.6 ([#58](https://github.com/scaleway/scaleway-ui/issues/58)) ([172609c](https://github.com/scaleway/scaleway-ui/commit/172609c0adb3e83597361912aeb094a86efb4352))
- **deps-dev:** bump rollup from 2.38.5 to 2.39.1 ([#50](https://github.com/scaleway/scaleway-ui/issues/50)) ([44f044d](https://github.com/scaleway/scaleway-ui/commit/44f044dd39ed7c727dca07754dad539dc8e59c72))

### :bug: Bug Fixes

- textbox can have number and text as value ([#53](https://github.com/scaleway/scaleway-ui/issues/53)) ([d10d0c5](https://github.com/scaleway/scaleway-ui/commit/d10d0c5dbc37c9b49531698a84595f874d5ff31d))

### [0.57.1](https://github.com/scaleway/scaleway-ui/compare/v0.57.0...v0.57.1) (2021-02-22)

### :bug: Bug Fixes

- **button-switch:** do not unset border on hover ([#38](https://github.com/scaleway/scaleway-ui/issues/38)) ([c76793c](https://github.com/scaleway/scaleway-ui/commit/c76793c62af06d94d9be2b0530c45b566783a948))

## [0.57.0](https://github.com/scaleway/scaleway-ui/compare/v0.56.4...v0.57.0) (2021-02-22)

### :zap: Refactor

- clean warnings and lint ([#36](https://github.com/scaleway/scaleway-ui/issues/36)) ([3acbf13](https://github.com/scaleway/scaleway-ui/commit/3acbf130bbe2b7be26c6924d51cf40683dbd76af))

### :repeat: CI

- update dependabot reviewers team ([0f80453](https://github.com/scaleway/scaleway-ui/commit/0f80453a4234d176032d4bf6a155a7b9f267a605))

### :package: Chore

- **deps:** bump @babel/runtime from 7.12.13 to 7.12.18 ([#42](https://github.com/scaleway/scaleway-ui/issues/42)) ([2340232](https://github.com/scaleway/scaleway-ui/commit/2340232c9a488b377d8decf8018f034e2d4a513c))
- **deps-dev:** bump @storybook/addon-links from 6.1.17 to 6.1.18 ([#45](https://github.com/scaleway/scaleway-ui/issues/45)) ([ae0bd95](https://github.com/scaleway/scaleway-ui/commit/ae0bd95dcbd27e79fd68c928e5bfb961c53583b2))
- **deps-dev:** bump @storybook/addons from 6.1.17 to 6.1.18 ([#39](https://github.com/scaleway/scaleway-ui/issues/39)) ([d0c4399](https://github.com/scaleway/scaleway-ui/commit/d0c43993d98670b47b2cb6110b467a55bf5ac937))

### :gear: Features

- add ray-start-arrow icon ([#37](https://github.com/scaleway/scaleway-ui/issues/37)) ([7b44dea](https://github.com/scaleway/scaleway-ui/commit/7b44dea8b9b843122771de3014f3bbb5ee47d3ab))

### [0.56.4](https://github.com/scaleway/scaleway-ui/compare/v0.56.3...v0.56.4) (2021-02-17)

### :bug: Bug Fixes

- removed required children from col ([fad4b9c](https://github.com/scaleway/scaleway-ui/commit/fad4b9c46020c5942c1a2a33e2eb6bcd73e726f7))

### [0.56.3](https://github.com/scaleway/scaleway-ui/compare/v0.56.2...v0.56.3) (2021-02-11)

### :bug: Bug Fixes

- uses disclosure on modal example and fixes warning ([#33](https://github.com/scaleway/scaleway-ui/issues/33)) ([8b05c94](https://github.com/scaleway/scaleway-ui/commit/8b05c947d68018b98c4a059d2d60fbafbc01d350))

### [0.56.2](https://github.com/scaleway/scaleway-ui/compare/v0.56.1...v0.56.2) (2021-02-11)

### :package: Chore

- **deps:** bump react-select from 4.0.2 to 4.1.0 ([#21](https://github.com/scaleway/scaleway-ui/issues/21)) ([b60c16f](https://github.com/scaleway/scaleway-ui/commit/b60c16fa8e7dd8dafd5b6d8266802516ad2c8e69))

### :bug: Bug Fixes

- add forwardRef and withComponent shim to Box ([#34](https://github.com/scaleway/scaleway-ui/issues/34)) ([1c7c4f9](https://github.com/scaleway/scaleway-ui/commit/1c7c4f92eb2b6758fa36e01ba5a6301780816f09))

### [0.56.1](https://github.com/scaleway/scaleway-ui/compare/v0.56.0...v0.56.1) (2021-02-10)

### :bug: Bug Fixes

- shim old width/height behavior on Box ([#32](https://github.com/scaleway/scaleway-ui/issues/32)) ([9b41179](https://github.com/scaleway/scaleway-ui/commit/9b411791009857098dc6dc79020b442c62d96fd2))

## [0.56.0](https://github.com/scaleway/scaleway-ui/compare/v0.55.3...v0.56.0) (2021-02-09)

### :gear: Features

- migrate to xstyled ([#17](https://github.com/scaleway/scaleway-ui/issues/17)) ([4b8bc07](https://github.com/scaleway/scaleway-ui/commit/4b8bc07fa03631b363c50fee27b83a9b2b82f0b6))

### [0.55.3](https://github.com/scaleway/scaleway-ui/compare/v0.55.2...v0.55.3) (2021-02-09)

### :bug: Bug Fixes

- improve documentation and fix text overlap ([#29](https://github.com/scaleway/scaleway-ui/issues/29)) ([01f8ca8](https://github.com/scaleway/scaleway-ui/commit/01f8ca8cc03249960b6b80e38948504831bdb929))

### [0.55.2](https://github.com/scaleway/scaleway-ui/compare/v0.55.1...v0.55.2) (2021-02-09)

### :white_check_mark: Test

- add some more tests ([#28](https://github.com/scaleway/scaleway-ui/issues/28)) ([f316841](https://github.com/scaleway/scaleway-ui/commit/f31684135f31d1ba8a7279062dc3a9a35c1f8a99))

### :repeat: CI

- correct Pull Request teardown ([#31](https://github.com/scaleway/scaleway-ui/issues/31)) ([49b5b10](https://github.com/scaleway/scaleway-ui/commit/49b5b108823c08114aedbc8c2ba56da9fb96e573))
- use self-hosted runner ([#30](https://github.com/scaleway/scaleway-ui/issues/30)) ([969be06](https://github.com/scaleway/scaleway-ui/commit/969be06c2561b59109f5f3b1c3cb68ecb8e07ea8))

### :bug: Bug Fixes

- change props name of custom components in richselect ([#27](https://github.com/scaleway/scaleway-ui/issues/27)) ([c8e309f](https://github.com/scaleway/scaleway-ui/commit/c8e309f905c875eb5e3595df6638f324f7c83bac))

### [0.55.1](https://github.com/scaleway/scaleway-ui/compare/v0.55.0...v0.55.1) (2021-02-08)

### :bug: Bug Fixes

- remove invalid css ([#25](https://github.com/scaleway/scaleway-ui/issues/25)) ([344e6d7](https://github.com/scaleway/scaleway-ui/commit/344e6d70c710afa5e2b85ad5b217a1fba19414b4))

## [0.55.0](https://github.com/scaleway/scaleway-ui/compare/v0.54.0...v0.55.0) (2021-02-08)

### :repeat: CI

- add dependabot reviewers + pretty changelog ([#7](https://github.com/scaleway/scaleway-ui/issues/7)) ([f3e0cbd](https://github.com/scaleway/scaleway-ui/commit/f3e0cbd1d827a0342a1b346570b40624f443b03e))

### :package: Chore

- **deps:** bump @emotion/react from 11.1.4 to 11.1.5 ([#23](https://github.com/scaleway/scaleway-ui/issues/23)) ([a6e5d4e](https://github.com/scaleway/scaleway-ui/commit/a6e5d4e74010d4e0f5350231e10a43bdfcb67537))
- **deps:** bump react-toastify from 6.2.0 to 7.0.3 ([#3](https://github.com/scaleway/scaleway-ui/issues/3)) ([a12a2c4](https://github.com/scaleway/scaleway-ui/commit/a12a2c47923a8c82a765ee2d2eca421156f5cb50))
- **deps-dev:** bump @emotion/styled from 11.0.0 to 11.1.5 ([#20](https://github.com/scaleway/scaleway-ui/issues/20)) ([887e728](https://github.com/scaleway/scaleway-ui/commit/887e728e011a65c68b91f1f5132babebb995bba6))

### :gear: Features

- port StateBar semantic ([#24](https://github.com/scaleway/scaleway-ui/issues/24)) ([f28b22e](https://github.com/scaleway/scaleway-ui/commit/f28b22ef7fbc6f246fc8e350abb68949b02ae559))

## [0.54.0](https://github.com/scaleway/scaleway-ui/compare/v0.53.1...v0.54.0) (2021-02-08)

### Features

- add loading feature on select and some exemples ([#2](https://github.com/scaleway/scaleway-ui/issues/2)) ([70e6e12](https://github.com/scaleway/scaleway-ui/commit/70e6e129eb4355f01216f121ade15ac367e56189))

### [0.53.1](https://github.com/scaleway/scaleway-ui/compare/v0.53.0...v0.53.1) (2021-02-08)

### Bug Fixes

- correct ProgressBar migration ([#8](https://github.com/scaleway/scaleway-ui/issues/8)) ([0b2489d](https://github.com/scaleway/scaleway-ui/commit/0b2489d05b051511f86a8929311a760cc76ce374))

## [0.53.0](https://github.com/scaleway/scaleway-ui/compare/v0.52.2...v0.53.0) (2021-02-04)

### Features

- migrate to github ([#1](https://github.com/scaleway/scaleway-ui/issues/1)) ([fcb97eb](https://github.com/scaleway/scaleway-ui/commit/fcb97eb4f7ef6824b32bcde498207ef66951dd58))

### [0.52.2](https://github.com/scaleway/scaleway-ui/compare/v0.52.1...v0.52.2) (2021-02-03)

### Bug Fixes

- **switchbutton:** fixed SwitchButton border when disabled ([7eb1c0e](https://github.com/scaleway/scaleway-ui/commit/7eb1c0e54353d2f0d7fb7c891d0c6984af1b46c0))

### [0.52.1](https://github.com/scaleway/scaleway-ui/compare/v0.52.0...v0.52.1) (2021-02-03)

### Bug Fixes

- updated documentation ([165653a](https://github.com/scaleway/scaleway-ui/commit/165653a53d59ea8dba325232a81ca888ab233017))

## [0.52.0](https://github.com/scaleway/scaleway-ui/compare/v0.51.0...v0.52.0) (2021-02-02)

### Features

- upgrade to emotion@11 :tada: ([79af477](https://github.com/scaleway/scaleway-ui/commit/79af477370ced8edde4b8f375e4c51160f6c7796))

## [0.51.0](https://github.com/scaleway/scaleway-ui/compare/v0.50.1...v0.51.0) (2021-01-28)

### Features

- add icon size on alert ([c7826ff](https://github.com/scaleway/scaleway-ui/commit/c7826ffaa5c7a81fe847d79c901cea57302163f5))

### [0.50.1](https://github.com/scaleway/scaleway-ui/compare/v0.50.0...v0.50.1) (2021-01-27)

### Bug Fixes

- **passwordstrengthmeter:** added new properties - userInputs - to ban specific words in password ([62ff565](https://github.com/scaleway/scaleway-ui/commit/62ff565bb5a9b61e53fa7d62982b786d7192c8e9))

## [0.50.0](https://github.com/scaleway/scaleway-ui/compare/v0.49.1...v0.50.0) (2021-01-26)

### Features

- add ability to not display a link in ExtendedReminder ([0da1b70](https://github.com/scaleway/scaleway-ui/commit/0da1b709257a66b773524474c2782019f1c882ed))

### [0.49.1](https://github.com/scaleway/scaleway-ui/compare/v0.49.0...v0.49.1) (2021-01-26)

### Bug Fixes

- correct overflowing ProgressBar ([0e474ea](https://github.com/scaleway/scaleway-ui/commit/0e474eac85fc42d22f554d68e3927ccc28e3666c))

## [0.49.0](https://github.com/scaleway/scaleway-ui/compare/v0.48.2...v0.49.0) (2021-01-26)

### Features

- port Grid system from smooth-ui ([1b10e30](https://github.com/scaleway/scaleway-ui/commit/1b10e30e7230bdaf4c9e9a67ba8e49986a60ec05))

### [0.48.2](https://github.com/scaleway/scaleway-ui/compare/v0.48.1...v0.48.2) (2021-01-25)

### Bug Fixes

- **richselect:** fixed animation timeout depending on animationDuration ([2d9e376](https://github.com/scaleway/scaleway-ui/commit/2d9e376c5ea4e6d28450438b56302e78f3f3178f))

### [0.48.1](https://github.com/scaleway/scaleway-ui/compare/v0.48.0...v0.48.1) (2021-01-21)

### Bug Fixes

- correct some missing props on Switch and SwitchButton ([bd7ce3e](https://github.com/scaleway/scaleway-ui/commit/bd7ce3e6da50342ad8de904be26048a427a671db))

## [0.48.0](https://github.com/scaleway/scaleway-ui/compare/v0.47.1...v0.48.0) (2021-01-21)

### Features

- add up, down and Breakpoint to replace smooth-ui's ([1a11404](https://github.com/scaleway/scaleway-ui/commit/1a114040c97a5a55b9a7ef0b5e21838a54579e97))

### [0.47.1](https://github.com/scaleway/scaleway-ui/compare/v0.47.0...v0.47.1) (2021-01-20)

### Bug Fixes

- **statusindicator:** move animated as a prop ([8f2685f](https://github.com/scaleway/scaleway-ui/commit/8f2685f07823e30dce684fcd0512d867239c4c42))

## [0.47.0](https://github.com/scaleway/scaleway-ui/compare/v0.46.0...v0.47.0) (2021-01-20)

### Features

- **phoneinput:** migrate phone input CNS-2095 ([fce0708](https://github.com/scaleway/scaleway-ui/commit/fce070857672010ad0527547259ac6b1d5092bc2))

## [0.46.0](https://github.com/scaleway/scaleway-ui/compare/v0.45.1...v0.46.0) (2021-01-20)

### Features

- migrate Radio to reakit ([7e73eb1](https://github.com/scaleway/scaleway-ui/commit/7e73eb188e21eb8c4bc2448cbf7536826cfed8ed))

### [0.45.1](https://github.com/scaleway/scaleway-ui/compare/v0.45.0...v0.45.1) (2021-01-20)

### Bug Fixes

- correct SwitchButton label id ([587defc](https://github.com/scaleway/scaleway-ui/commit/587defcbd87b65e6e6321a371987253e93cca278))

## [0.45.0](https://github.com/scaleway/scaleway-ui/compare/v0.44.0...v0.45.0) (2021-01-20)

### Features

- **richselect:** added animation on RichSelect CNS-3553 ([dbe64d7](https://github.com/scaleway/scaleway-ui/commit/dbe64d7d6e83e2cb12097d4754a6af25b688e63c))

## [0.44.0](https://github.com/scaleway/scaleway-ui/compare/v0.43.1...v0.44.0) (2021-01-20)

### Features

- migration of volumesize - CNS-2118 ([dd02e0c](https://github.com/scaleway/scaleway-ui/commit/dd02e0c6e26c60d05c2ef939781ec40253e7fc61))

### [0.43.1](https://github.com/scaleway/scaleway-ui/compare/v0.43.0...v0.43.1) (2021-01-19)

### Bug Fixes

- **stepper:** added sizes to stepper ([a071877](https://github.com/scaleway/scaleway-ui/commit/a07187743cdded19eea8245dfa2a6ef7edf82551))

## [0.43.0](https://github.com/scaleway/scaleway-ui/compare/v0.42.0...v0.43.0) (2021-01-19)

### Features

- migrate SwitchButton to reakit ([b231b90](https://github.com/scaleway/scaleway-ui/commit/b231b9026f1b553cd7588b507c649c886a433269))

## [0.42.0](https://github.com/scaleway/scaleway-ui/compare/v0.41.0...v0.42.0) (2021-01-19)

### Features

- migrate Switch to reakit ([d6e785d](https://github.com/scaleway/scaleway-ui/commit/d6e785d74310054864e16e53fd2d5b48a88e4332))

## [0.41.0](https://github.com/scaleway/scaleway-ui/compare/v0.40.0...v0.41.0) (2021-01-15)

### Features

- add paste ability to VerificationCode ([db5bf4d](https://github.com/scaleway/scaleway-ui/commit/db5bf4daea659f93c71d13ae844e2f83cd42c5bc))

## [0.40.0](https://github.com/scaleway/scaleway-ui/compare/v0.39.0...v0.40.0) (2021-01-12)

### Features

- add ExtendedReminder success variant ([9513a3a](https://github.com/scaleway/scaleway-ui/commit/9513a3a34122b26e7fa5f8402240078d494d7054))

## [0.39.0](https://github.com/scaleway/scaleway-ui/compare/v0.38.2...v0.39.0) (2021-01-08)

### Features

- **PasswordCheck:** migration of PasswordCheck CNS-2093 ([9aa110b](https://github.com/scaleway/scaleway-ui/commit/9aa110b0fbf258042ad2aa5c11e954a9e6043ead))

### [0.38.2](https://github.com/scaleway/scaleway-ui/compare/v0.38.1...v0.38.2) (2021-01-07)

### Bug Fixes

- **tooltips:** remove z-index ([f83214c](https://github.com/scaleway/scaleway-ui/commit/f83214c16eda1c029dcdaf3a099a14e8db6d84f0))

### [0.38.1](https://github.com/scaleway/scaleway-ui/compare/v0.38.0...v0.38.1) (2021-01-05)

### Bug Fixes

- **tooltip:** z-index ([987dde9](https://github.com/scaleway/scaleway-ui/commit/987dde99d35652c87d5e7d94a3b384f01aa904bb))

## [0.38.0](https://github.com/scaleway/scaleway-ui/compare/v0.37.12...v0.38.0) (2021-01-04)

### Features

- **modal:** add slide animations ([0352898](https://github.com/scaleway/scaleway-ui/commit/0352898303c6139ace84a896231403134b5b1675))

### [0.37.12](https://github.com/scaleway/scaleway-ui/compare/v0.37.11...v0.37.12) (2021-01-04)

### Bug Fixes

- **modal:** overflow on modal with lot of content inside ([e72d006](https://github.com/scaleway/scaleway-ui/commit/e72d00615d9c0bf034cc9725c68591f082ef7562))

### [0.37.11](https://github.com/scaleway/scaleway-ui/compare/v0.37.10...v0.37.11) (2020-12-30)

### Bug Fixes

- **checkbox:** added autofocus parameter ([6b515fb](https://github.com/scaleway/scaleway-ui/commit/6b515fb043efdde50dfc82026097512dfafb9902))

### [0.37.10](https://github.com/scaleway/scaleway-ui/compare/v0.37.9...v0.37.10) (2020-12-28)

### Bug Fixes

- replace or deprecate grey with gray and update tests CNS-3523 ([aff72cf](https://github.com/scaleway/scaleway-ui/commit/aff72cf57c642bde99d5a3c69660b6ac876a96fd))

### [0.37.9](https://github.com/scaleway/scaleway-ui/compare/v0.37.8...v0.37.9) (2020-12-23)

### Bug Fixes

- **modal:** dom backdrop element ([0f40ba0](https://github.com/scaleway/scaleway-ui/commit/0f40ba03dd35e0b5cc2dd1d7063349dc0d10dc8b))

### [0.37.8](https://github.com/scaleway/scaleway-ui/compare/v0.37.7...v0.37.8) (2020-12-23)

### Bug Fixes

- **modal:** render content only when modal is open ([e7a9252](https://github.com/scaleway/scaleway-ui/commit/e7a925200e428d8ee2280d2fb93fb5c0abc4bdc1))

### [0.37.7](https://github.com/scaleway/scaleway-ui/compare/v0.37.6...v0.37.7) (2020-12-21)

### Bug Fixes

- **modal:** add animated props ([3253079](https://github.com/scaleway/scaleway-ui/commit/3253079ad1ddc347d0a392abe6ad2e0314538d48))

### [0.37.6](https://github.com/scaleway/scaleway-ui/compare/v0.37.5...v0.37.6) (2020-12-21)

### Bug Fixes

- **notificationbar:** adds possibility to have custom icon ([52fa884](https://github.com/scaleway/scaleway-ui/commit/52fa884a048607487e0c5e8ce5c6971e89b8e8e3))

### [0.37.5](https://github.com/scaleway/scaleway-ui/compare/v0.37.4...v0.37.5) (2020-12-18)

### Bug Fixes

- **checkbox:** cursor pointer on label ([559817c](https://github.com/scaleway/scaleway-ui/commit/559817cbe371e184c2bbfef06369156c9781856b))

### [0.37.4](https://github.com/scaleway/scaleway-ui/compare/v0.37.3...v0.37.4) (2020-12-18)

### Bug Fixes

- **events:** safari propagation ([df5d3d1](https://github.com/scaleway/scaleway-ui/commit/df5d3d1117204e5b9e1c249715c64f790f9090b6))

### [0.37.3](https://github.com/scaleway/scaleway-ui/compare/v0.37.2...v0.37.3) (2020-12-18)

### Bug Fixes

- **events:** safari event propagation on svg ([e2ec70b](https://github.com/scaleway/scaleway-ui/commit/e2ec70bf7d238ace6568c88f36944fbc060f2b5f))

### [0.37.2](https://github.com/scaleway/scaleway-ui/compare/v0.37.1...v0.37.2) (2020-12-17)

### Bug Fixes

- **checkbox:** propagation event without visibile input ([9de0736](https://github.com/scaleway/scaleway-ui/commit/9de073626357fabd2bd9ee0fb7eca8bd6680ffb5))

### [0.37.1](https://github.com/scaleway/scaleway-ui/compare/v0.37.0...v0.37.1) (2020-12-15)

### Bug Fixes

- **checkbox:** stopPropagation ([f64505e](https://github.com/scaleway/scaleway-ui/commit/f64505e632c92c5a7247ead00631c5978cda9951))

## [0.37.0](https://github.com/scaleway/scaleway-ui/compare/v0.36.0...v0.37.0) (2020-12-14)

### Features

- **modal:** migration reakit ([b9706d1](https://github.com/scaleway/scaleway-ui/commit/b9706d1b4552710778bb60edd30444765f2a53ce))

## [0.36.0](https://github.com/scaleway/scaleway-ui/compare/v0.35.0...v0.36.0) (2020-12-09)

### Features

- port CategoryIcon from shire ([c40269d](https://github.com/scaleway/scaleway-ui/commit/c40269dc60202370e4cb7ea85d1d99dc3200b225))

## [0.35.0](https://github.com/scaleway/scaleway-ui/compare/v0.34.2...v0.35.0) (2020-12-08)

### Features

- **badge:** added lighter variants for badge ([c0c7dd1](https://github.com/scaleway/scaleway-ui/commit/c0c7dd1dc9b2ca6bb7bb1c73804eaad795ab4baa))

### [0.34.2](https://github.com/scaleway/scaleway-ui/compare/v0.34.1...v0.34.2) (2020-12-07)

### Bug Fixes

- correct checkbox onClick handler ([e11efe1](https://github.com/scaleway/scaleway-ui/commit/e11efe1e8237b59e90302c227acd8c53949a7924))

### [0.34.1](https://github.com/scaleway/scaleway-ui/compare/v0.34.0...v0.34.1) (2020-12-07)

### Bug Fixes

- stop propagation on checkbox ([1f27113](https://github.com/scaleway/scaleway-ui/commit/1f27113f98d213677bddf9fe68d0dec741f712df))

## [0.34.0](https://github.com/scaleway/scaleway-ui/compare/v0.33.0...v0.34.0) (2020-12-03)

### Features

- **checkbox:** use reakit ([97b09d6](https://github.com/scaleway/scaleway-ui/commit/97b09d6b35280e6448d48bb9d56314f9cec5d2c6))

## [0.33.0](https://github.com/scaleway/scaleway-ui/compare/v0.32.6...v0.33.0) (2020-12-03)

### Features

- port CreationProgress from shire ([215c192](https://github.com/scaleway/scaleway-ui/commit/215c19256a0509e8818b7ef705a917d26ebbba7f))

### [0.32.6](https://github.com/scaleway/scaleway-ui/compare/v0.32.5...v0.32.6) (2020-11-26)

### Bug Fixes

- correctly pass style system to Table [CNS-3468] ([3d57e3d](https://github.com/scaleway/scaleway-ui/commit/3d57e3d351c005aa514b1ccd1fce1eed3edf31ea))

### [0.32.5](https://github.com/scaleway/scaleway-ui/compare/v0.32.4...v0.32.5) (2020-11-23)

### Bug Fixes

- **status:** add few missing status ([251f51e](https://github.com/scaleway/scaleway-ui/commit/251f51ebde37942c66b497a6065471cb13713d38))

### [0.32.4](https://github.com/scaleway/scaleway-ui/compare/v0.32.3...v0.32.4) (2020-11-20)

### Bug Fixes

- **tooltips:** use effect first ([f4135e0](https://github.com/scaleway/scaleway-ui/commit/f4135e03e89ae39d3c01d9e3bd49535561d95088))

### [0.32.3](https://github.com/scaleway/scaleway-ui/compare/v0.32.2...v0.32.3) (2020-11-20)

### Bug Fixes

- **popper:** add border-radius ([d7b7ad4](https://github.com/scaleway/scaleway-ui/commit/d7b7ad4f23e628439bab98f0a812b179ae965236))

### [0.32.2](https://github.com/scaleway/scaleway-ui/compare/v0.32.1...v0.32.2) (2020-11-20)

### Bug Fixes

- avoid direct font reference in GlobalStyle ([9e2d1bb](https://github.com/scaleway/scaleway-ui/commit/9e2d1bb0ebc1d489c32c3fdc414c163808963144))

### [0.32.1](https://github.com/scaleway/scaleway-ui/compare/v0.32.0...v0.32.1) (2020-11-20)

### Bug Fixes

- wrap when large list of tags [CNS-3466] ([19610af](https://github.com/scaleway/scaleway-ui/commit/19610afd3126a3bcddf8146d40a9a715cefabbf2))

## [0.32.0](https://github.com/scaleway/scaleway-ui/compare/v0.31.4...v0.32.0) (2020-11-20)

### Features

- **component:** add Popper ([8afce23](https://github.com/scaleway/scaleway-ui/commit/8afce236ea86de85d9ea7db03de2a0f8ca563113))

### [0.31.4](https://github.com/scaleway/scaleway-ui/compare/v0.31.3...v0.31.4) (2020-11-19)

### Bug Fixes

- **link:** support tel links ([e814bf5](https://github.com/scaleway/scaleway-ui/commit/e814bf5e7a2e8819a7a343ef741f84860f687fcb))

### [0.31.3](https://github.com/scaleway/scaleway-ui/compare/v0.31.2...v0.31.3) (2020-11-18)

### Bug Fixes

- **checkbox:** design feedback and fix html syntax CNS-3131 ([6ddc38e](https://github.com/scaleway/scaleway-ui/commit/6ddc38e49798cdf502bd144f37597c762af194fb))

### [0.31.2](https://github.com/scaleway/scaleway-ui/compare/v0.31.1...v0.31.2) (2020-11-17)

### Bug Fixes

- correct Toaster propTypes ([52a2c45](https://github.com/scaleway/scaleway-ui/commit/52a2c45104048cb17816615079090e96879e853a))

### [0.31.1](https://github.com/scaleway/scaleway-ui/compare/v0.31.0...v0.31.1) (2020-11-17)

### Bug Fixes

- **counter:** propagate onend api func ([66b19a6](https://github.com/scaleway/scaleway-ui/commit/66b19a6097b7e2d401b419fd2409fd33a3d21104))

## [0.31.0](https://github.com/scaleway/scaleway-ui/compare/v0.30.1...v0.31.0) (2020-11-16)

### Features

- port Stepper from shire [CNS-2109] ([71d43ac](https://github.com/scaleway/scaleway-ui/commit/71d43ac728ff509b4bb14a01aab137e691a729fe))

### [0.30.1](https://github.com/scaleway/scaleway-ui/compare/v0.30.0...v0.30.1) (2020-11-16)

### Bug Fixes

- avoid false on Touchable tabIndex ([055e7e3](https://github.com/scaleway/scaleway-ui/commit/055e7e3ed9cb562853c3b558f387189c34a2e3b0))

## [0.30.0](https://github.com/scaleway/scaleway-ui/compare/v0.29.0...v0.30.0) (2020-11-13)

### Features

- migrate Avatar from shire ([202aba9](https://github.com/scaleway/scaleway-ui/commit/202aba98f8c4cbf44bb6ace5c7bc61d486499be2))

## [0.29.0](https://github.com/scaleway/scaleway-ui/compare/v0.28.0...v0.29.0) (2020-11-13)

### Features

- migrate Label, ScrollView, StatusIndicator and Unselectable from shire ([e0be446](https://github.com/scaleway/scaleway-ui/commit/e0be446a6de90fd7cd4dd3e0913962e5bdba849c))

## [0.28.0](https://github.com/scaleway/scaleway-ui/compare/v0.27.1...v0.28.0) (2020-11-13)

### Features

- add backgroundColor on ProgressBar + tests ([a4b8562](https://github.com/scaleway/scaleway-ui/commit/a4b85628f747c4fedc09f72b0d919c42a7037bb8))

### [0.27.1](https://github.com/scaleway/scaleway-ui/compare/v0.27.0...v0.27.1) (2020-11-13)

### Bug Fixes

- correct popper position on Table BodyCell ([e0ee00c](https://github.com/scaleway/scaleway-ui/commit/e0ee00caa74551569c54157a073cc83d58f2bd07))

## [0.27.0](https://github.com/scaleway/scaleway-ui/compare/v0.26.2...v0.27.0) (2020-11-12)

### Features

- add Pentagon component ([8a91a19](https://github.com/scaleway/scaleway-ui/commit/8a91a19ef0952881cc169c1993fea5edc5c4d29e))

### [0.26.2](https://github.com/scaleway/scaleway-ui/compare/v0.26.1...v0.26.2) (2020-11-09)

### Bug Fixes

- correct Typography const instance to allow forwarding ref ([a6b958e](https://github.com/scaleway/scaleway-ui/commit/a6b958ecde03a095225f6f8825c73823ce376e0d))

### [0.26.1](https://github.com/scaleway/scaleway-ui/compare/v0.26.0...v0.26.1) (2020-11-09)

### Bug Fixes

- **components:** add focus style ([d206ad6](https://github.com/scaleway/scaleway-ui/commit/d206ad6ef662d2dd3f47d734a143a46d9d0272e6))

## [0.26.0](https://github.com/scaleway/scaleway-ui/compare/v0.25.0...v0.26.0) (2020-11-09)

### Features

- port Typography component from shire [CNS-2106] ([5576c7e](https://github.com/scaleway/scaleway-ui/commit/5576c7e137f3800135a039a1323ad27150b5d60a))

## [0.25.0](https://github.com/scaleway/scaleway-ui/compare/v0.24.1...v0.25.0) (2020-11-09)

### Features

- port Table component from shire ([77a651d](https://github.com/scaleway/scaleway-ui/commit/77a651d4af2bb4c1b873a1ac248489156cc52a24))

### [0.24.1](https://github.com/scaleway/scaleway-ui/compare/v0.24.0...v0.24.1) (2020-11-09)

### Bug Fixes

- coherent style ([824f405](https://github.com/scaleway/scaleway-ui/commit/824f405bfe8ab817099636ba7e191c15ebb605fe))

## [0.24.0](https://github.com/scaleway/scaleway-ui/compare/v0.23.3...v0.24.0) (2020-11-09)

### Features

- **range:** adds range component ([fe1cad1](https://github.com/scaleway/scaleway-ui/commit/fe1cad120985a8cca616bbc1cf2421ad94755e9b))

### [0.23.3](https://github.com/scaleway/scaleway-ui/compare/v0.23.2...v0.23.3) (2020-11-06)

### Bug Fixes

- **deps:** yarn lock ([1d2ea35](https://github.com/scaleway/scaleway-ui/commit/1d2ea35848f0b69c53e3cfbbfbb2351ab32d7dd9))

### [0.23.2](https://github.com/scaleway/scaleway-ui/compare/v0.23.1...v0.23.2) (2020-11-06)

### Bug Fixes

- correct storybook build ([f5f3efe](https://github.com/scaleway/scaleway-ui/commit/f5f3efe245890d4acf5e28e8449ca46176ce326f))

### [0.23.1](https://github.com/scaleway/scaleway-ui/compare/v0.23.0...v0.23.1) (2020-11-05)

### Bug Fixes

- correct Action default size ([ea6ae5b](https://github.com/scaleway/scaleway-ui/commit/ea6ae5b472f0ee0e0046d92307cc1e31d38b48c3))

## [0.23.0](https://github.com/scaleway/scaleway-ui/compare/v0.22.0...v0.23.0) (2020-11-05)

### Features

- add Progress component [CNS-2098] ([c43fce2](https://github.com/scaleway/scaleway-ui/commit/c43fce2a4915efc193a93295784a99c729a30b11))

## [0.22.0](https://github.com/scaleway/scaleway-ui/compare/v0.21.3...v0.22.0) (2020-11-05)

### Features

- **component:** migration Command component ([0f80ae2](https://github.com/scaleway/scaleway-ui/commit/0f80ae2c6965b719179c69b8921288e5f0588931))

### [0.21.3](https://github.com/scaleway/scaleway-ui/compare/v0.21.2...v0.21.3) (2020-11-04)

### Bug Fixes

- correct Breadcrumbs export ([464dc34](https://github.com/scaleway/scaleway-ui/commit/464dc3447b5630e195010dc742966a2724acf546))

### [0.21.2](https://github.com/scaleway/scaleway-ui/compare/v0.21.1...v0.21.2) (2020-11-04)

### Bug Fixes

- some PropTypes ([f04db3c](https://github.com/scaleway/scaleway-ui/commit/f04db3cef0504c53e9328ecbd8bb81e1d241f879))

### [0.21.1](https://github.com/scaleway/scaleway-ui/compare/v0.21.0...v0.21.1) (2020-11-04)

### Bug Fixes

- adds glacier icons ([60ff63b](https://github.com/scaleway/scaleway-ui/commit/60ff63bf4dd2664b066b3efe40dc5a0549188b68))

## [0.21.0](https://github.com/scaleway/scaleway-ui/compare/v0.20.2...v0.21.0) (2020-11-03)

### Features

- **component:** action ([85a48dd](https://github.com/scaleway/scaleway-ui/commit/85a48dd032669ddee3898a334df4a45315f16a27))

### [0.20.2](https://github.com/scaleway/scaleway-ui/compare/v0.20.1...v0.20.2) (2020-11-02)

### Bug Fixes

- support react 16 and 17 ([c581458](https://github.com/scaleway/scaleway-ui/commit/c5814588ead06f07dac0965d66345e6b58418f2f))

### [0.20.1](https://github.com/scaleway/scaleway-ui/compare/v0.20.0...v0.20.1) (2020-11-02)

### Bug Fixes

- **build:** ensure css files are bundled ([19996ba](https://github.com/scaleway/scaleway-ui/commit/19996baf9441a740b65570602322d112ea471f34))

## [0.20.0](https://github.com/scaleway/scaleway-ui/compare/v0.19.1...v0.20.0) (2020-11-02)

### Features

- migrate ProgressionButton from shire ([80f7cb6](https://github.com/scaleway/scaleway-ui/commit/80f7cb65c0244d1b335293ce2ee105efe12377e0))

### [0.19.1](https://github.com/scaleway/scaleway-ui/compare/v0.19.0...v0.19.1) (2020-10-28)

### Bug Fixes

- **engine:** lax engine version ([ef65e47](https://github.com/scaleway/scaleway-ui/commit/ef65e479b59d969bacb752e9ebfbb891a09bb00a))

## [0.19.0](https://github.com/scaleway/scaleway-ui/compare/v0.18.0...v0.19.0) (2020-10-27)

### Features

- add shielded-account icon (also Icon tests) ([2257e40](https://github.com/scaleway/scaleway-ui/commit/2257e406e35508aca9ba79c6792d7baddb2f149e))

## [0.18.0](https://github.com/scaleway/scaleway-ui/compare/v0.17.0...v0.18.0) (2020-10-27)

### Features

- refactor Reminder to add ability to act as a Button ([5567ced](https://github.com/scaleway/scaleway-ui/commit/5567ced94efce893fc1a8f19f1d5627f737f6205))

## [0.17.0](https://github.com/scaleway/scaleway-ui/compare/v0.16.0...v0.17.0) (2020-10-26)

### Features

- **code:** code component CNS-3413 ([8be5b65](https://github.com/scaleway/scaleway-ui/commit/8be5b6582dbda16561217f295fc14b956952ff68))

## [0.16.0](https://github.com/scaleway/scaleway-ui/compare/v0.15.3...v0.16.0) (2020-10-26)

### Features

- **extendedreminder:** new component extended reminder ([39e71e1](https://github.com/scaleway/scaleway-ui/commit/39e71e14d4e0ccf59ae76255421d72144556dc9f))

### [0.15.3](https://github.com/scaleway/scaleway-ui/compare/v0.15.2...v0.15.3) (2020-10-19)

### Bug Fixes

- **config:** harmonise renovate config with shire one and enable renovate on docker too ([03f35d0](https://github.com/scaleway/scaleway-ui/commit/03f35d0d69334cccd1be408e42628c3acacb9dbf))

### [0.15.2](https://github.com/scaleway/scaleway-ui/compare/v0.15.1...v0.15.2) (2020-10-16)

### Bug Fixes

- **icon:** add key icon ([7d3e5cf](https://github.com/scaleway/scaleway-ui/commit/7d3e5cf9114dd071310315498b7bc4e98ea82e98))

### [0.15.1](https://github.com/scaleway/scaleway-ui/compare/v0.15.0...v0.15.1) (2020-10-14)

### Bug Fixes

- **badge:** width to fit-content ([4449128](https://github.com/scaleway/scaleway-ui/commit/44491284dd7f41d29d50e704ce54ba6654cdb8a5))

## [0.15.0](https://github.com/scaleway/scaleway-ui/compare/v0.14.2...v0.15.0) (2020-10-13)

### Features

- adds sphere component ([897b216](https://github.com/scaleway/scaleway-ui/commit/897b2165909dc14f7f3f7b5f9055bc759b240702))

### [0.14.2](https://github.com/scaleway/scaleway-ui/compare/v0.14.1...v0.14.2) (2020-10-13)

### Bug Fixes

- **richselect:** adds forward ref ([2a3e7ab](https://github.com/scaleway/scaleway-ui/commit/2a3e7ab6afbe79ba24d130bb5507b6aa514a9b20))

### [0.14.1](https://github.com/scaleway/scaleway-ui/compare/v0.14.0...v0.14.1) (2020-10-12)

### Bug Fixes

- **ci:** correct deploy ([9b4b806](https://github.com/scaleway/scaleway-ui/commit/9b4b806b5aead19f500acdec05a463442888198e))

## [0.14.0](https://github.com/scaleway/scaleway-ui/compare/v0.13.14...v0.14.0) (2020-10-12)

### Features

- add Reminder component [CNS-3354] ([64e87e7](https://github.com/scaleway/scaleway-ui/commit/64e87e7941aadee77694f5ba665511e44ae9cd7a))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.13.14](https://***REMOVED***///compare/v0.13.13...v0.13.14) (2020-10-05)

### [0.13.13](https://***REMOVED***///compare/v0.13.12...v0.13.13) (2020-09-30)

### Bug Fixes

- **switch-button:** added new variant for SwitchButton ([59f7159](https://***REMOVED***///commit/59f71598850665f522ae32989b9d0e2d423bc9d7))

### [0.13.12](https://***REMOVED***///compare/v0.13.11...v0.13.12) (2020-09-30)

### [0.13.11](https://***REMOVED***///compare/v0.13.10...v0.13.11) (2020-09-29)

### Bug Fixes

- **tag:** correct onClick handler ([5973fca](https://***REMOVED***///commit/5973fcaecfe45a8119e2e65962bd758ecfa43712))
- correct deploy docz domain ([b7db9b8](https://***REMOVED***///commit/b7db9b8dfdb11a8e0d4d404312cb6e18c5f5c92c))

### [0.13.10](https://***REMOVED***///compare/v0.13.9...v0.13.10) (2020-09-29)

### Features

- **switch:** added Switch and SwitchButton components ([26704ba](https://***REMOVED***///commit/26704baf84de5d6b8f47b12324897ab4d407b664))

### [0.13.9](https://***REMOVED***///compare/v0.13.8...v0.13.9) (2020-09-29)

### Features

- **rollup:** simpler rollup config ([b05fc4b](https://***REMOVED***///commit/b05fc4bf3fa07063119f52e537744a531e063bea))

### Bug Fixes

- **ci:** correctly remove pr-staging docker container ([d947273](https://***REMOVED***///commit/d947273ead505b26b78154e448a426b0c99a23d4))
- correct Radio import in doc ([4638ac6](https://***REMOVED***///commit/4638ac6b7d86e4b01e1ec2cdeb39a7170da5477d))

### [0.13.8](https://***REMOVED***///compare/v0.13.7...v0.13.8) (2020-09-24)

### Bug Fixes

- **rich-select:** fixed riche select input position ([bab2f4a](https://***REMOVED***///commit/bab2f4a9684c3757f280c042aa7088e3631060ee))

### [0.13.7](https://***REMOVED***///compare/v0.13.6...v0.13.7) (2020-09-16)

### Bug Fixes

- **Tooltip:** conserve children reference before cloning ([c08b271](https://***REMOVED***///commit/c08b2717c1f08c0cffddeb491db5b54c5d7c2184))

### [0.13.6](https://***REMOVED***///compare/v0.13.5...v0.13.6) (2020-09-15)

### Features

- **gitlab:** deploy multi-pr ([9e311dd](https://***REMOVED***///commit/9e311dd613f6da7dd5f0d57937e0cd0b5626f166))
- **rich-select:** add multi props ([39d127f](https://***REMOVED***///commit/39d127f4055fb33f4fd12e6d73fb5c33a8315ed7))

### [0.13.5](https://***REMOVED***///compare/v0.13.4...v0.13.5) (2020-08-27)

### Bug Fixes

- **rich select:** useless console log ([cf42086](https://***REMOVED***///commit/cf42086d8d0a5369fc4c87053013ad2a4ad84c96))
- **ui:** updated TextBoxField ([f1658b1](https://***REMOVED***///commit/f1658b1eb3950c9b66995ed15fbb5041ce299f7a))

### [0.13.4](https://***REMOVED***///compare/v0.13.3...v0.13.4) (2020-08-19)

### Bug Fixes

- **snapshots:** updated RichSelect data-testid value ([23c39f9](https://***REMOVED***///commit/23c39f9aa48ab37a143c73e2482b0bae12e01e2f))

### [0.13.3](https://***REMOVED***///compare/v0.13.2...v0.13.3) (2020-08-19)

### Bug Fixes

- **test:** updated RichSelect data-testid ([a000ef3](https://***REMOVED***///commit/a000ef3f30c4dea164339567966f19298e59df6b))

### [0.13.2](https://***REMOVED***///compare/v0.13.1...v0.13.2) (2020-08-05)

### Features

- **button:** add blue button ([4708259](https://***REMOVED***///commit/470825944ec844a7845b29f00eee4f71e4af6a1a))

### Bug Fixes

- dot steps last dot margin right ([4c94519](https://***REMOVED***///commit/4c9451994d63ee9d1d69601021a5fde843647cfc))
- fixed soft bordered warning button ([ca526ec](https://***REMOVED***///commit/ca526ec4d6515c80038ff0b69113cc0e49a3437a))

### [0.13.1](https://***REMOVED***///compare/v0.13.0...v0.13.1) (2020-07-07)

### Bug Fixes

- tooltip portal zindex ([b643592](https://***REMOVED***///commit/b643592ffb80e060dd0791f60771f9261e651ad4))

## [0.13.0](https://***REMOVED***///compare/v0.12.5...v0.13.0) (2020-07-01)

### ⚠ BREAKING CHANGES

- **richselect:** it should break tests based on data-test

### Bug Fixes

- **button:** disabled ([0ee6783](https://***REMOVED***///commit/0ee678310a248b223e2fb055f8e93e423ca78b9f))
- **richselect:** change data-test to data-testid ([3c651f6](https://***REMOVED***///commit/3c651f6dfb41ff05a9c3fdd1876d277696071261))
- **tooltip:** do not push volontary errors in console ([a00a1d5](https://***REMOVED***///commit/a00a1d569171fcf73c10655269d34d6afe9d37a4))

### [0.12.5](https://***REMOVED***///compare/v0.12.4...v0.12.5) (2020-06-10)

### Bug Fixes

- add ref forwarding on icon ([cb8c5f8](https://***REMOVED***///commit/cb8c5f8ff6be6a391077b2792ea57011b1146993))

### [0.12.4](https://***REMOVED***///compare/v0.12.3...v0.12.4) (2020-06-09)

### Bug Fixes

- button|tooltip - rework ([fe64d43](https://***REMOVED***///commit/fe64d4359fb14c1ff937d654967b13cd1da8bca1))

### [0.12.3](https://***REMOVED***///compare/v0.12.2...v0.12.3) (2020-05-18)

### Bug Fixes

- **tooltipicon:** update props name and width CNS-2931 ([7e43581](https://***REMOVED***///commit/7e43581aabb3c06312ad874f54795197080661a0))

### [0.12.2](https://***REMOVED***///compare/v0.10.21...v0.12.2) (2020-05-14)

### Features

- reakit for tooltip BREAKING CHANGES ([ff3938f](https://***REMOVED***///commit/ff3938f4cd344ec46ef4d24dae7c0eba17750c0b))
- **rich-select:** add possibility tu use with integration test ([c3cc5ae](https://***REMOVED***///commit/c3cc5aea6ba7c29c37aff75cadbb5e5793c1586b))
- new tooltip icon component CNS-2117 ([31407f9](https://***REMOVED***///commit/31407f924f8193797f27714715d4c93d713d6f84))
- **countup:** add counter component CNS-2809 ([f75581d](https://***REMOVED***///commit/f75581d8031da5ced10690729134a93102a14103))

### Bug Fixes

- add menu key to custom style richselect ([f330b65](https://***REMOVED***///commit/f330b6546fed6bb43688c756f8933bda57e669d1))
- update dependency polished to ^3.5.2 ([c3dfafe](https://***REMOVED***///commit/c3dfafef8c5849274a906fbace0ded888f34311d))
- **button:** update size names for consistency CNS-2860 BREAKING CHANGE ([1438e92](https://***REMOVED***///commit/1438e92253b43529e60a41ea6bc5eb9f8efd2d36))
- **tooltip:** check tooltip exists before rendering its wrapper ([46d7414](https://***REMOVED***///commit/46d74148d1caa13e1c8571923e2eebe4388bb177))
- **tooltip:** remove tooltip width ([07bd8ea](https://***REMOVED***///commit/07bd8ea89b9f68f9f07bd840a1bfa3e5d6205a0b))
- array in one of props type ([3d7682b](https://***REMOVED***///commit/3d7682bc7d5f14116d984fd071fe2c37d74549a3))
- button height style CNS-2836 ([0e87a39](https://***REMOVED***///commit/0e87a39c1216e5c25d34cad4a51f7ac7b7bdb6a6))
- import in richselect component ([5bba5bb](https://***REMOVED***///commit/5bba5bbaebce7377f77fb047c8dfc4a4c1149d54))
- update dependency framer-motion to ^1.10.3 ([acb9d61](https://***REMOVED***///commit/acb9d610436b189b55d445450671e77a3858a1e6))
- update dependency react-tooltip to ^4.1.5 ([9a3c1ed](https://***REMOVED***///commit/9a3c1ed1b2819497c3c86af43a9377c1dcab254b))

### [0.12.1](https://***REMOVED***///compare/v0.12.0...v0.12.1) (2020-04-21)

### Bug Fixes

- **tooltip:** check tooltip exists before rendering its wrapper ([46d7414](https://***REMOVED***///commit/46d74148d1caa13e1c8571923e2eebe4388bb177))
- **tooltip:** remove tooltip width ([07bd8ea](https://***REMOVED***///commit/07bd8ea89b9f68f9f07bd840a1bfa3e5d6205a0b))

## [0.12.0](https://***REMOVED***///compare/v0.11.1...v0.12.0) (2020-04-17)

### Bug Fixes

- **button:** update size names for consistency CNS-2860 BREAKING CHANGE ([1438e92](https://***REMOVED***///commit/1438e92253b43529e60a41ea6bc5eb9f8efd2d36))

### [0.11.1](https://***REMOVED***///compare/v0.10.25...v0.11.1) (2020-04-15)

### Features

- reakit for tooltip BREAKING CHANGES ([ff3938f](https://***REMOVED***///commit/ff3938f4cd344ec46ef4d24dae7c0eba17750c0b))

### [0.10.25](https://***REMOVED***///compare/v0.10.24...v0.10.25) (2020-04-09)

### Bug Fixes

- array in one of props type ([3d7682b](https://***REMOVED***///commit/3d7682bc7d5f14116d984fd071fe2c37d74549a3))
- update dependency react-tooltip to ^4.1.5 ([9a3c1ed](https://***REMOVED***///commit/9a3c1ed1b2819497c3c86af43a9377c1dcab254b))

### [0.10.24](https://***REMOVED***///compare/v0.10.23...v0.10.24) (2020-04-03)

### Features

- **rich-select:** add possibility tu use with integration test ([c3cc5ae](https://***REMOVED***///commit/c3cc5aea6ba7c29c37aff75cadbb5e5793c1586b))

### Bug Fixes

- button height style CNS-2836 ([0e87a39](https://***REMOVED***///commit/0e87a39c1216e5c25d34cad4a51f7ac7b7bdb6a6))

### [0.10.23](https://***REMOVED***///compare/v0.10.22...v0.10.23) (2020-04-02)

### Features

- new tooltip icon component CNS-2117 ([31407f9](https://***REMOVED***///commit/31407f924f8193797f27714715d4c93d713d6f84))

### Bug Fixes

- import in richselect component ([5bba5bb](https://***REMOVED***///commit/5bba5bbaebce7377f77fb047c8dfc4a4c1149d54))
- update dependency framer-motion to ^1.10.3 ([acb9d61](https://***REMOVED***///commit/acb9d610436b189b55d445450671e77a3858a1e6))

### [0.10.22](https://***REMOVED***///compare/v0.10.21...v0.10.22) (2020-04-01)

### Features

- **countup:** add counter component CNS-2809 ([f75581d](https://***REMOVED***///commit/f75581d8031da5ced10690729134a93102a14103))

### [0.10.21](https://***REMOVED***///compare/v0.10.20...v0.10.21) (2020-03-31)

### Bug Fixes

- remove double icon ([6337689](https://***REMOVED***///commit/6337689118a8c53558828858bdceca53f6f349ad))
- update dependency framer-motion to ^1.10.2 ([adbc8d1](https://***REMOVED***///commit/adbc8d161c57b452c730352e97d57a39da1bafa4))
- update dependency polished to ^3.5.1 ([7a0c50d](https://***REMOVED***///commit/7a0c50dca7665cebf0f2665fa113009f7c397d38))
- update dependency react-select to ^3.1.0 ([f13b0eb](https://***REMOVED***///commit/f13b0eb498f01c64f8e57007bd25a2b7995f2d61))

### [0.10.20](https://***REMOVED***///compare/v0.10.19...v0.10.20) (2020-03-26)

### Features

- **migration:** dashboard slider ([41f55cc](https://***REMOVED***///commit/41f55cc290ac1fd2d71547bf75b59f9720cde5d5))

### [0.10.19](https://***REMOVED***///compare/v0.10.18...v0.10.19) (2020-03-26)

### [0.10.18](https://***REMOVED***///compare/v0.10.17...v0.10.18) (2020-03-26)

### Features

- **toaster:** create toaster component CNS-2116 ([c8bb5c2](https://***REMOVED***///commit/c8bb5c214e04cd7878354428c881fbf5fbfde2fc))

### Bug Fixes

- **button:** revert prop renaming ([228bd63](https://***REMOVED***///commit/228bd63abd4a57aceef3fd030513fe9b5c3e8edc))

### [0.10.17](https://***REMOVED***///compare/v0.10.16...v0.10.17) (2020-03-24)

### [0.10.16](https://***REMOVED***///compare/v0.10.15...v0.10.16) (2020-03-20)

### Features

- dotsteps component ([1b89a83](https://***REMOVED***///commit/1b89a830658fbd5c29ff292a2994a0510ed0dc3a))
- **textbox units:** make unit font size bigger and allow to center it CNS-2728 ([f3c74d1](https://***REMOVED***///commit/f3c74d12692ccebbbd11d7a423178085014dc6a4))

### Bug Fixes

- update dependency framer-motion to ^1.9.1 ([584c36c](https://***REMOVED***///commit/584c36ccbd0907a1a017b1599d4fec1a5aa5c917))

### [0.10.15](https://***REMOVED***///compare/v0.10.14...v0.10.15) (2020-03-06)

### Bug Fixes

- update dependency framer-motion to ^1.9.0 ([ca32c0c](https://***REMOVED***///commit/ca32c0cdd5bc29910a6e066f8df75ea5b1789c1c))
- update dependency polished to ^3.4.4 ([94a6e65](https://***REMOVED***///commit/94a6e65e47d3da6a3acfc34980f445152de2ab32))

### [0.10.14](https://***REMOVED***///compare/v0.10.13...v0.10.14) (2020-02-24)

### [0.10.13](https://***REMOVED***///compare/v0.10.12...v0.10.13) (2020-02-05)

### Features

- **dns:** change dns ([8bbff89](https://***REMOVED***///commit/8bbff894341a07f01dbe4f55566f07e9f04f92f2))
- **icon:** add bullhorn ([79ecb77](https://***REMOVED***///commit/79ecb77e14e651f12844359bc7001793ef58cdcc))

### [0.10.12](https://***REMOVED***///compare/v0.10.11...v0.10.12) (2020-01-14)

### [0.10.11](https://***REMOVED***///compare/v0.10.10...v0.10.11) (2020-01-09)

### Features

- **migration:** add password strength meter CNS-2094 ([145d4ea](https://***REMOVED***///commit/145d4ea5c33e5472ac0b8d9b6f3ca62b17efbb3d))

### [0.10.10](https://***REMOVED***///compare/v0.10.9...v0.10.10) (2019-12-10)

### [0.10.9](https://***REMOVED***///compare/v0.10.8...v0.10.9) (2019-12-10)

### Features

- **notification bar:** migrate notification bar component ([57ab8d3](https://***REMOVED***///commit/57ab8d3344417ff026e21043ec4cffb27de16adc))

### [0.10.8](https://***REMOVED***///compare/v0.10.7...v0.10.8) (2019-10-23)

### Features

- filter icon ([0e1fe88](https://***REMOVED***///commit/0e1fe88))
- icon dots vertical ([3a5a64f](https://***REMOVED***///commit/3a5a64f))

### [0.10.7](https://***REMOVED***///compare/v0.10.5...v0.10.7) (2019-10-14)

### Bug Fixes

- **checkbox:** add outline CNS-2327 ([f267f71](https://***REMOVED***///commit/f267f71))
- **icon:** no error thrown if name is undefined ([63fdf90](https://***REMOVED***///commit/63fdf90))

### Features

- **TextBox:** Add tabindex attr CNS-2327 ([0601c64](https://***REMOVED***///commit/0601c64))

### [0.10.6](https://***REMOVED***///compare/v0.10.5...v0.10.6) (2019-10-09)

### Bug Fixes

- **checkbox:** add outline CNS-2327 ([f267f71](https://***REMOVED***///commit/f267f71))

### Features

- **TextBox:** Add tabindex attr CNS-2327 ([0601c64](https://***REMOVED***///commit/0601c64))

### [0.10.5](https://***REMOVED***///compare/v0.10.4...v0.10.5) (2019-09-27)

### Features

- **icon:** add detach icon ([b1fcebd](https://***REMOVED***///commit/b1fcebd))

### [0.10.4](https://***REMOVED***///compare/v0.10.2...v0.10.4) (2019-09-25)

### Bug Fixes

- **information:** just string prop type for color ([61123df](https://***REMOVED***///commit/61123df))
- update information component with children ([dba7930](https://***REMOVED***///commit/dba7930))

### [0.10.3](https://***REMOVED***///compare/v0.10.2...v0.10.3) (2019-09-06)

### Bug Fixes

- update information component with children ([dba7930](https://***REMOVED***///commit/dba7930))

### [0.10.2](https://***REMOVED***///compare/v0.10.1...v0.10.2) (2019-09-04)

### Bug Fixes

- **ui:** fix checkbox hover regression CNS-2160 ([9b0897a](https://***REMOVED***///commit/9b0897a))

### [0.10.1](https://***REMOVED***///compare/v0.10.0...v0.10.1) (2019-09-02)

### Bug Fixes

- **link:** needNativeLink on to & href now ([d8e756f](https://***REMOVED***///commit/d8e756f))

## [0.10.0](https://***REMOVED***///compare/v0.9.0...v0.10.0) (2019-08-28)

### Features

- add colors list ([cd5c16c](https://***REMOVED***///commit/cd5c16c))
- add IconMessage component ([96f5711](https://***REMOVED***///commit/96f5711))
- add Information component ([d43d2aa](https://***REMOVED***///commit/d43d2aa))
- add size variant to Badge component ([7991e51](https://***REMOVED***///commit/7991e51))

## [0.9.0](https://***REMOVED***///compare/v0.8.2...v0.9.0) (2019-08-21)

### Bug Fixes

- **checkbox:** cursor when it is disabled ([ddc1e5b](https://***REMOVED***///commit/ddc1e5b))
- **select:** fix css ([20fcc3f](https://***REMOVED***///commit/20fcc3f))

### Features

- rich select ([a723425](https://***REMOVED***///commit/a723425))
- **icon:** add new icons ([b4a45c3](https://***REMOVED***///commit/b4a45c3))
- **link:** add primary variant ([0d26fb2](https://***REMOVED***///commit/0d26fb2))

### [0.8.2](https://***REMOVED***///compare/v0.8.1...v0.8.2) (2019-08-08)

### Bug Fixes

- text box error height ([5cf36fc](https://***REMOVED***///commit/5cf36fc))

### [0.8.1](https://***REMOVED***///compare/v0.8.0...v0.8.1) (2019-08-02)

### Bug Fixes

- checkbox error is inside box ([5423504](https://***REMOVED***///commit/5423504))
- remove flatten library ([90c2194](https://***REMOVED***///commit/90c2194))

## [0.8.0](https://***REMOVED***///compare/v0.7.0...v0.8.0) (2019-08-01)

### Bug Fixes

- clipboard SSR compilance ([c0ef0c1](https://***REMOVED***///commit/c0ef0c1))
- upgrade major dependancies ([54b6553](https://***REMOVED***///commit/54b6553))
- upgrade minor dependancies ([f6dbb72](https://***REMOVED***///commit/f6dbb72))
- upgrade smooth-ui peer dependency to ^10.0.0 ([5fac54d](https://***REMOVED***///commit/5fac54d))

### Features

- checkbox new errors display ([1bdc006](https://***REMOVED***///commit/1bdc006))
- textbox new errors display ([ca8bce6](https://***REMOVED***///commit/ca8bce6))

# [0.7.0](https://github.com/scaleway/scaleway-ui/compare/v0.6.0...v0.7.0) (2019-07-03)

### Bug Fixes

- remove npm private config ([4dfdf70](https://github.com/scaleway/scaleway-ui/commit/4dfdf70))
- upgrade minor dependancies ([182a0a6](https://github.com/scaleway/scaleway-ui/commit/182a0a6))
- use google fonts for asap ([1421e1f](https://github.com/scaleway/scaleway-ui/commit/1421e1f))

### Features

- introduce fontsRoot in GlobalStyle ([8552ca7](https://github.com/scaleway/scaleway-ui/commit/8552ca7))

# [0.6.0](https://github.com/scaleway/scaleway-ui/compare/v0.5.3...v0.6.0) (2019-06-27)

### Features

- make clipboard util SSR compilant ([34afefd](https://github.com/scaleway/scaleway-ui/commit/34afefd))

## [0.5.3](https://github.com/scaleway/scaleway-ui/compare/v0.5.2...v0.5.3) (2019-06-26)

### Bug Fixes

- GlobalStyle prop types ([c1d2887](https://github.com/scaleway/scaleway-ui/commit/c1d2887))
- select chevron centering ([2eae9d2](https://github.com/scaleway/scaleway-ui/commit/2eae9d2))

## [0.5.2](https://github.com/scaleway/scaleway-ui/compare/v0.5.1...v0.5.2) (2019-06-25)

### Bug Fixes

- yarn install before publish ([cd606b3](https://github.com/scaleway/scaleway-ui/commit/cd606b3))

## [0.5.1](https://github.com/scaleway/scaleway-ui/compare/v0.5.0...v0.5.1) (2019-06-25)

### Bug Fixes

- prepublishOnly perm ([21ce0b5](https://github.com/scaleway/scaleway-ui/commit/21ce0b5))

# [0.5.0](https://github.com/scaleway/scaleway-ui/compare/v0.4.0...v0.5.0) (2019-06-25)

### Bug Fixes

- use front-ci-cd ansible_user ([e22d96b](https://github.com/scaleway/scaleway-ui/commit/e22d96b))

### Features

- ci-cd publish npm registry ([35ce0d2](https://github.com/scaleway/scaleway-ui/commit/35ce0d2))
- GlobalStyle component ([f9dc3d4](https://github.com/scaleway/scaleway-ui/commit/f9dc3d4))
- Select component ([70e2592](https://github.com/scaleway/scaleway-ui/commit/70e2592))
- useCopyToClipboard ([2c79b00](https://github.com/scaleway/scaleway-ui/commit/2c79b00))

# [0.4.0](https://github.com/scaleway/scaleway-ui/compare/v0.3.1...v0.4.0) (2019-06-14)

### Bug Fixes

- button proptypes ([e2537b2](https://github.com/scaleway/scaleway-ui/commit/e2537b2))

### Features

- UniversalLink for link logic delegation ([a63a594](https://github.com/scaleway/scaleway-ui/commit/a63a594))
- use native link for anchors ([b86eb01](https://github.com/scaleway/scaleway-ui/commit/b86eb01))

## [0.3.1](https://github.com/scaleway/scaleway-ui/compare/v0.3.0...v0.3.1) (2019-04-29)

# [0.3.0](https://github.com/scaleway/scaleway-ui/compare/v0.2.1...v0.3.0) (2019-04-24)

### Features

- add TextBox ([b4709ef](https://github.com/scaleway/scaleway-ui/commit/b4709ef))
- rename project to @scaleway/ui ([1654dc7](https://github.com/scaleway/scaleway-ui/commit/1654dc7))

## [0.2.1](https://github.com/scaleway/scaleway-ui/compare/v0.2.0...v0.2.1) (2019-04-24)

# [0.2.0](https://github.com/smooth-code/scaleway-ui/compare/v0.1.0...v0.2.0) (2019-04-24)

### Features

- add Expandable & Toggler ([ac5ebd0](https://github.com/smooth-code/scaleway-ui/commit/ac5ebd0))

# [0.1.0](https://github.com/smooth-code/scaleway-ui/compare/v0.1.0-alpha.1...v0.1.0) (2019-04-23)

### Features

- add Breadcrumbs variant ([995e72c](https://github.com/smooth-code/scaleway-ui/commit/995e72c))
- add Table ([2d82746](https://github.com/smooth-code/scaleway-ui/commit/2d82746))

# [0.1.0-alpha.1](https://github.com/smooth-code/scaleway-ui/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2019-04-23)

### Features

- Stepper, StateBar, ProgressBar ([1578e16](https://github.com/smooth-code/scaleway-ui/commit/1578e16))
- Touchable, Checkbox, Stepper, Grid ([1e369df](https://github.com/smooth-code/scaleway-ui/commit/1e369df))

# 0.1.0-alpha.0 (2019-04-18)

### Features

- add Button ([a10a003](https://github.com/smooth-code/scaleway-ui/commit/a10a003))
- add components ([d3f763e](https://github.com/smooth-code/scaleway-ui/commit/d3f763e))
- add new components ([bb8195c](https://github.com/smooth-code/scaleway-ui/commit/bb8195c))
- BorderedBox ([57cd18f](https://github.com/smooth-code/scaleway-ui/commit/57cd18f))
- Link, Breadcrumbs and Separator ([a60b962](https://github.com/smooth-code/scaleway-ui/commit/a60b962))
- setup & badge ([1dca575](https://github.com/smooth-code/scaleway-ui/commit/1dca575))
