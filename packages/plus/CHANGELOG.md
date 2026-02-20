# @ultraviolet/plus

## 3.5.2

### Patch Changes

- Updated dependencies [[`695a610`](https://github.com/scaleway/ultraviolet/commit/695a6102e42bd25120d75fc74b7abd3d05cd5af4)]:
  - @ultraviolet/ui@3.10.2

## 3.5.1

### Patch Changes

- Updated dependencies [[`7aee29b`](https://github.com/scaleway/ultraviolet/commit/7aee29bbab4b2c046bd0228ab76453855215f3d6), [`cbcbfa7`](https://github.com/scaleway/ultraviolet/commit/cbcbfa77e5e849c1858f0eb6e4fd257323dc35f0)]:
  - @ultraviolet/ui@3.10.1

## 3.5.0

### Minor Changes

- [#6076](https://github.com/scaleway/ultraviolet/pull/6076) [`00f05de`](https://github.com/scaleway/ultraviolet/commit/00f05dea8a72043d276644c3dc8df62968d299c6) Thanks [@lisalupi](https://github.com/lisalupi)! - Deprecated `OfferList` and `Plans` - use the `@ultraviolet/ui/compositions` version

- [#6114](https://github.com/scaleway/ultraviolet/pull/6114) [`5d8d786`](https://github.com/scaleway/ultraviolet/commit/5d8d7862f586f9e2dcbf2ea80117ce45d24535b8) Thanks [@lisalupi](https://github.com/lisalupi)! - Deprecated `OrderSummary` and `SteppedListCard` - use the `@ultraviolet/ui/composition` version instead

### Patch Changes

- Updated dependencies [[`a6086be`](https://github.com/scaleway/ultraviolet/commit/a6086be8a1a63ce983c93916c48be9a335b27c67), [`5d8d786`](https://github.com/scaleway/ultraviolet/commit/5d8d7862f586f9e2dcbf2ea80117ce45d24535b8), [`bd4d306`](https://github.com/scaleway/ultraviolet/commit/bd4d306a72df7389074ec9d8bcbb04ab3b2b5608), [`41ce87d`](https://github.com/scaleway/ultraviolet/commit/41ce87dc2359476b739ed75884dd83df1a19ef62), [`1739b63`](https://github.com/scaleway/ultraviolet/commit/1739b63e682ace39ed4f9a36884d2fe792bf8ec8), [`6525fe4`](https://github.com/scaleway/ultraviolet/commit/6525fe4974a18e2660b73857b01722ab2fe7bcef), [`00f05de`](https://github.com/scaleway/ultraviolet/commit/00f05dea8a72043d276644c3dc8df62968d299c6), [`21bb5e6`](https://github.com/scaleway/ultraviolet/commit/21bb5e68e33c60af5bc2db0f12c2fbb816c88990)]:
  - @ultraviolet/ui@3.10.0
  - @ultraviolet/icons@5.1.4

## 3.4.5

### Patch Changes

- [#6071](https://github.com/scaleway/ultraviolet/pull/6071) [`035691d`](https://github.com/scaleway/ultraviolet/commit/035691dbc90acf0193136072cb2fd840a7e2f10e) Thanks [@lisalupi](https://github.com/lisalupi)! - `CodeEditor`: new props `expandableHeight`, `showText` and `hideText` to add a show/hide button and a max height

- [#6111](https://github.com/scaleway/ultraviolet/pull/6111) [`3458287`](https://github.com/scaleway/ultraviolet/commit/3458287bd6f3eaa35bd92e7c46b3935a5545d477) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - Fix strikethrough price condition on order summary

- [#6073](https://github.com/scaleway/ultraviolet/pull/6073) [`73acf0b`](https://github.com/scaleway/ultraviolet/commit/73acf0bd2e818b3cbc04c2daa4782cbbd09cf2c3) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`:

  - when prop `priceInformation` is set to true, automatically display "/unit" (unit is the selected unit on the UnitInput)
  - remove "s" on unit when showing "/unit" ("/hours" -> "/hour")

- [#6112](https://github.com/scaleway/ultraviolet/pull/6112) [`76d82e1`](https://github.com/scaleway/ultraviolet/commit/76d82e13d008ffdfbdab115e53f6da3e359ffa9b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.14`.

- [#6085](https://github.com/scaleway/ultraviolet/pull/6085) [`3b0c551`](https://github.com/scaleway/ultraviolet/commit/3b0c551b1092de318878a3c17f795a244e949569) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.13`.

- [#6087](https://github.com/scaleway/ultraviolet/pull/6087) [`81af8ef`](https://github.com/scaleway/ultraviolet/commit/81af8ef520ca38208a5b5f118957f2ff56b1db7f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.29.0`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.29.0`.
  Updated dependency `@babel/preset-env` to `7.29.0`.
- Updated dependencies [[`884a3c5`](https://github.com/scaleway/ultraviolet/commit/884a3c5b913a618e2fffc82b98753f7c493bd5a1), [`fcb3341`](https://github.com/scaleway/ultraviolet/commit/fcb33414be9c1994e367a2b288472f1ad6bfeeb1), [`5517d73`](https://github.com/scaleway/ultraviolet/commit/5517d731dcbb46da670c9695043d83c61677fe1a), [`a96c4d8`](https://github.com/scaleway/ultraviolet/commit/a96c4d82a5bdf30822d4aaadaceaaafe616e6883), [`9092995`](https://github.com/scaleway/ultraviolet/commit/90929953481b4c7cd24bc57a74fe3143135ee231), [`da1a564`](https://github.com/scaleway/ultraviolet/commit/da1a5646dbc078e6ee12527cf2ce07f374dea1ff), [`0eb656f`](https://github.com/scaleway/ultraviolet/commit/0eb656f02dd4b10ac99757ff71de97b0c0b0acc4), [`a623c0f`](https://github.com/scaleway/ultraviolet/commit/a623c0ff315e8e77a4b030e52d76cacc272b3d70), [`7c5e8aa`](https://github.com/scaleway/ultraviolet/commit/7c5e8aacbc4c34c42d828b1f3633bfce9e1c649e), [`76d82e1`](https://github.com/scaleway/ultraviolet/commit/76d82e13d008ffdfbdab115e53f6da3e359ffa9b), [`3b0c551`](https://github.com/scaleway/ultraviolet/commit/3b0c551b1092de318878a3c17f795a244e949569), [`81af8ef`](https://github.com/scaleway/ultraviolet/commit/81af8ef520ca38208a5b5f118957f2ff56b1db7f), [`0ae6194`](https://github.com/scaleway/ultraviolet/commit/0ae61943b9891e4abf9ad3294a7c7689dc6a7ae3), [`9ec1f47`](https://github.com/scaleway/ultraviolet/commit/9ec1f473d91909a79eb8ef4156e10d76304bfc24), [`eb2ca15`](https://github.com/scaleway/ultraviolet/commit/eb2ca15481ac0be4a41430789dc904aaa653cb46), [`246960e`](https://github.com/scaleway/ultraviolet/commit/246960e87d80fd02c01fbd905e515d1e01e7bc6a), [`2f268dd`](https://github.com/scaleway/ultraviolet/commit/2f268dd0c904c56128db3a50ace7f5f87286d72d)]:
  - @ultraviolet/ui@3.9.0
  - @ultraviolet/themes@3.1.0
  - @ultraviolet/icons@5.1.3
  - @ultraviolet/utils@1.0.4

## 3.4.4

### Patch Changes

- [#6064](https://github.com/scaleway/ultraviolet/pull/6064) [`6de2594`](https://github.com/scaleway/ultraviolet/commit/6de2594c6254bb98f51a05e22b3c4b70504fe2e3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.2.4`.
  Updated dependency `@types/react` to `19.2.10`.
  Updated dependency `react-dom` to `19.2.4`.
- Updated dependencies [[`6de2594`](https://github.com/scaleway/ultraviolet/commit/6de2594c6254bb98f51a05e22b3c4b70504fe2e3)]:
  - @ultraviolet/icons@5.1.2
  - @ultraviolet/themes@3.0.6
  - @ultraviolet/ui@3.8.2
  - @ultraviolet/utils@1.0.3

## 3.4.3

### Patch Changes

- Updated dependencies [[`f4d92c5`](https://github.com/scaleway/ultraviolet/commit/f4d92c5db0098b1e19fce048088d6185fa8191fc), [`9413c49`](https://github.com/scaleway/ultraviolet/commit/9413c495b7e614f4d6e73e421b0be7319ad35e22), [`75c6cce`](https://github.com/scaleway/ultraviolet/commit/75c6ccec42acedc701defe36f82f48e0b8ecb679)]:
  - @ultraviolet/ui@3.8.1
  - @ultraviolet/utils@1.0.2
  - @ultraviolet/icons@5.1.1

## 3.4.2

### Patch Changes

- [#6049](https://github.com/scaleway/ultraviolet/pull/6049) [`3e8b0fe`](https://github.com/scaleway/ultraviolet/commit/3e8b0feeee6904619b03fbe44c61b79bfadcf13d) Thanks [@lisalupi](https://github.com/lisalupi)! - Replace remaining `end` and `start` by `flex-end/start`

- Updated dependencies [[`e4238e6`](https://github.com/scaleway/ultraviolet/commit/e4238e6ecfa439ba078b629ce7d44127ccae48f9), [`3e8b0fe`](https://github.com/scaleway/ultraviolet/commit/3e8b0feeee6904619b03fbe44c61b79bfadcf13d), [`ba37cc2`](https://github.com/scaleway/ultraviolet/commit/ba37cc2143d766db0d86c31dc3bae7c35d889e16), [`4d53257`](https://github.com/scaleway/ultraviolet/commit/4d53257eeee42b8dadae0c17898608b6f30b1e9d), [`00b7be6`](https://github.com/scaleway/ultraviolet/commit/00b7be62fcb42d1639e90c6f7c81fbe588806c56), [`9461d8c`](https://github.com/scaleway/ultraviolet/commit/9461d8c764fe59a13450e8880b76a731718e1ca2), [`56658d2`](https://github.com/scaleway/ultraviolet/commit/56658d2a16785d4dd2d8f2f4c2c7490a5cc9c0df), [`5ea2afe`](https://github.com/scaleway/ultraviolet/commit/5ea2afe47e6f6f2bbebca207e25498055d3588ee), [`3a7eb2a`](https://github.com/scaleway/ultraviolet/commit/3a7eb2ad19a47b65c2fcac84dcb3be94271dcc4c)]:
  - @ultraviolet/ui@3.8.0
  - @ultraviolet/icons@5.1.0

## 3.4.1

### Patch Changes

- [#6036](https://github.com/scaleway/ultraviolet/pull/6036) [`8181dd2`](https://github.com/scaleway/ultraviolet/commit/8181dd2a540251c47a2019c7a3527c63ab10b49b) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: prop `amountFree` should be seen as a discount

- Updated dependencies [[`31ddb5d`](https://github.com/scaleway/ultraviolet/commit/31ddb5d664b7a5a6193f1f290b85fdfd714aec95), [`405191b`](https://github.com/scaleway/ultraviolet/commit/405191b6d45bca78b5f519d8f3a0b834673d3f7b), [`4e17bc7`](https://github.com/scaleway/ultraviolet/commit/4e17bc7c713ce7e751f28f4b71e2413d055808e8), [`9999889`](https://github.com/scaleway/ultraviolet/commit/9999889888c8cec1fa304ff3b903523232401957), [`f35febd`](https://github.com/scaleway/ultraviolet/commit/f35febdb8fdd6960b365fc6b8e42462069e77048), [`428a597`](https://github.com/scaleway/ultraviolet/commit/428a59713015f9b04bc2b324baef7fe28f57d49e)]:
  - @ultraviolet/ui@3.7.1
  - @ultraviolet/icons@5.0.7
  - @ultraviolet/themes@3.0.5

## 3.4.0

### Minor Changes

- [#6009](https://github.com/scaleway/ultraviolet/pull/6009) [`1c76a24`](https://github.com/scaleway/ultraviolet/commit/1c76a246cc1113ec8238dedf0312706f5ed32807) Thanks [@lisalupi](https://github.com/lisalupi)! - Reduce usage of `globalStyle`

### Patch Changes

- [#6033](https://github.com/scaleway/ultraviolet/pull/6033) [`fb32c13`](https://github.com/scaleway/ultraviolet/commit/fb32c131a4b4b4643285dd0371342fed4c3dceaa) Thanks [@philibea](https://github.com/philibea)! - Fix require export based on .cjs files instead of .js

- [#5990](https://github.com/scaleway/ultraviolet/pull/5990) [`7c676d2`](https://github.com/scaleway/ultraviolet/commit/7c676d2023946b7315844d25d7617ac3120fb74a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.9`.

- [#6023](https://github.com/scaleway/ultraviolet/pull/6023) [`9c4014a`](https://github.com/scaleway/ultraviolet/commit/9c4014a3deeb09b19547ae66ddb5bc0e8c1bd0ff) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `10.0.2`.

- Updated dependencies [[`fb32c13`](https://github.com/scaleway/ultraviolet/commit/fb32c131a4b4b4643285dd0371342fed4c3dceaa), [`c8fd687`](https://github.com/scaleway/ultraviolet/commit/c8fd68734ec9b8fa38420414ff6ebd7741f89846), [`e93190f`](https://github.com/scaleway/ultraviolet/commit/e93190fc9a6ae8c18a3dd558f62dabe499cba14c), [`1c76a24`](https://github.com/scaleway/ultraviolet/commit/1c76a246cc1113ec8238dedf0312706f5ed32807), [`7c676d2`](https://github.com/scaleway/ultraviolet/commit/7c676d2023946b7315844d25d7617ac3120fb74a), [`8f4eb5c`](https://github.com/scaleway/ultraviolet/commit/8f4eb5c6dd994d597bc48abd503906841178156d)]:
  - @ultraviolet/themes@3.0.4
  - @ultraviolet/icons@5.0.6
  - @ultraviolet/ui@3.7.0
  - @ultraviolet/utils@1.0.1

## 3.3.0

### Minor Changes

- [#6011](https://github.com/scaleway/ultraviolet/pull/6011) [`ac1d8a9`](https://github.com/scaleway/ultraviolet/commit/ac1d8a9162c528053a66404b38a4c0f7dbebc588) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: fix discounts

  - Show undiscounted total price when the discount is applied to a category/subcategory
  - Show the undiscounted price of the category when a discount is applied to a subcategory
  - Fix category discount in %

- [#5988](https://github.com/scaleway/ultraviolet/pull/5988) [`bace03b`](https://github.com/scaleway/ultraviolet/commit/bace03b4aa3dba12f50d214b73d6033e2fc051dd) Thanks [@lisalupi](https://github.com/lisalupi)! - `OfferList.Row`: click anywhere on the row to select it when it is not expandable. When expandable, only a click on the checkbox/radio will trigger the selection

### Patch Changes

- Updated dependencies [[`f8c97f3`](https://github.com/scaleway/ultraviolet/commit/f8c97f3746a2e3e0ffc8580935f28bb00212fd2d), [`bace03b`](https://github.com/scaleway/ultraviolet/commit/bace03b4aa3dba12f50d214b73d6033e2fc051dd), [`e32a1c6`](https://github.com/scaleway/ultraviolet/commit/e32a1c607ce28322ffe0c31d8f722f9040ddffd8), [`7a70c84`](https://github.com/scaleway/ultraviolet/commit/7a70c843313863916f6520c4a69418dd1c421856), [`ce69316`](https://github.com/scaleway/ultraviolet/commit/ce693160ffa3d471fd58235304b6826f33bf6640)]:
  - @ultraviolet/ui@3.6.0
  - @ultraviolet/icons@5.0.5

## 3.2.0

### Minor Changes

- [#5986](https://github.com/scaleway/ultraviolet/pull/5986) [`d811852`](https://github.com/scaleway/ultraviolet/commit/d811852062e7bfb1de9981aa6fecb5546358512a) Thanks [@lisalupi](https://github.com/lisalupi)! - `Navigation`:
  - Fix issue with `Navigation.Separator` height
  - New subComponent `Navigation.ShowHide`, paired with new props such as `showHide` (`NavigationProvider`) and `alwaysVisible` (`Navigation.Item`). With this feature, it is possible to add a "show/hide" button to only display items with the `alwaysVisible` prop set to true.
  - New prop `additionalData` (`Navigation.Group`) to display information on the right of a group
  - `PinnedItem`: fix color of dropable area indicator

## 3.1.9

### Patch Changes

- [#5998](https://github.com/scaleway/ultraviolet/pull/5998) [`9029fe7`](https://github.com/scaleway/ultraviolet/commit/9029fe74683a6b4d8ac16dd1d4e2404d6f6ce08d) Thanks [@philibea](https://github.com/philibea)! - Fix navigation item pinned border css issue

## 3.1.8

### Patch Changes

- Updated dependencies [[`94bf725`](https://github.com/scaleway/ultraviolet/commit/94bf7250328c6ac91cfd3aac3f8bff6df75e1bd4), [`3c88802`](https://github.com/scaleway/ultraviolet/commit/3c8880208839eae1a25cac5b341dd2882713dbbd), [`98abf07`](https://github.com/scaleway/ultraviolet/commit/98abf07b11fd74bb458cb7907f18167f5613aae5), [`6e4bbf2`](https://github.com/scaleway/ultraviolet/commit/6e4bbf23dc97370604609c11fed75f079f78f48b), [`648e6ca`](https://github.com/scaleway/ultraviolet/commit/648e6cafb7a2e2d090e1b234f5b86d9986b852e9), [`2fa66cb`](https://github.com/scaleway/ultraviolet/commit/2fa66cba74f8809b3c93708519003f8cd563dcd0), [`fe79b43`](https://github.com/scaleway/ultraviolet/commit/fe79b43d8bda3660fff2e00ad566befb1bbbc90b), [`5961951`](https://github.com/scaleway/ultraviolet/commit/5961951efb3c41c1407d48885fb315b6f1272ee7)]:
  - @ultraviolet/ui@3.5.1
  - @ultraviolet/themes@3.0.3
  - @ultraviolet/icons@5.0.4

## 3.1.7

### Patch Changes

- [#5962](https://github.com/scaleway/ultraviolet/pull/5962) [`0f98f5f`](https://github.com/scaleway/ultraviolet/commit/0f98f5fcfe176849e2d0cf00b99c96fa9852e744) Thanks [@lisalupi](https://github.com/lisalupi)! - `EstimteCost`: new prop `compact`

- [#5974](https://github.com/scaleway/ultraviolet/pull/5974) [`813703d`](https://github.com/scaleway/ultraviolet/commit/813703de77f5722a0b2cd2fcaa8f70703c31917c) Thanks [@lisalupi](https://github.com/lisalupi)! - `Plans`: fix padding on header when `hideLabel=true`

- [#5967](https://github.com/scaleway/ultraviolet/pull/5967) [`c82c60c`](https://github.com/scaleway/ultraviolet/commit/c82c60c7b443dd78dc9baf88190ed05de8fe40bb) Thanks [@lisalupi](https://github.com/lisalupi)! - Use `flex-start` and `flex-end` instead of `start` and `end` (css)

- Updated dependencies [[`bc5944a`](https://github.com/scaleway/ultraviolet/commit/bc5944a8a06b9dcec1e2465a99705580cc1cfc5f), [`8941121`](https://github.com/scaleway/ultraviolet/commit/8941121b00778cd24a26ef37e914dae6d10ea173), [`b91a316`](https://github.com/scaleway/ultraviolet/commit/b91a316c7b24041fdf2878a0ea1ac2825f260bbc), [`9ca5894`](https://github.com/scaleway/ultraviolet/commit/9ca5894a892da3331b602541200d2958852ac2d4), [`c82c60c`](https://github.com/scaleway/ultraviolet/commit/c82c60c7b443dd78dc9baf88190ed05de8fe40bb), [`c82c60c`](https://github.com/scaleway/ultraviolet/commit/c82c60c7b443dd78dc9baf88190ed05de8fe40bb)]:
  - @ultraviolet/ui@3.5.0

## 3.1.6

### Patch Changes

- Updated dependencies [[`91d356e`](https://github.com/scaleway/ultraviolet/commit/91d356ecaf117813d9e84cebb9f31bf2f41e93b7), [`fb6d20f`](https://github.com/scaleway/ultraviolet/commit/fb6d20fc543d51458091546e9e4120299449a397), [`fb6d20f`](https://github.com/scaleway/ultraviolet/commit/fb6d20fc543d51458091546e9e4120299449a397)]:
  - @ultraviolet/ui@3.4.0

## 3.1.5

### Patch Changes

- [#5959](https://github.com/scaleway/ultraviolet/pull/5959) [`e8b5adf`](https://github.com/scaleway/ultraviolet/commit/e8b5adfd138ae123653c0ca1c2dab9415f5fa8b3) Thanks [@lisalupi](https://github.com/lisalupi)! - `Navigation.Item`: fix infinite loop with register item

- [#5951](https://github.com/scaleway/ultraviolet/pull/5951) [`6fd50a3`](https://github.com/scaleway/ultraviolet/commit/6fd50a3563f189693aa625fe739be11c22a56c1e) Thanks [@lisalupi](https://github.com/lisalupi)! - `OfferList`: fix badge placement (Safari)

- Updated dependencies [[`b844a9d`](https://github.com/scaleway/ultraviolet/commit/b844a9d5915b1bd4a7d901e96d841eeaecf827f3)]:
  - @ultraviolet/ui@3.3.1

## 3.1.4

### Patch Changes

- [#5896](https://github.com/scaleway/ultraviolet/pull/5896) [`f72efaf`](https://github.com/scaleway/ultraviolet/commit/f72efafcac5143935efe7d62df823131e6e023f7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.2.3`.
  Updated dependency `react-dom` to `19.2.3`.
- Updated dependencies [[`22994af`](https://github.com/scaleway/ultraviolet/commit/22994af651f7eb409ed6568dd7e11cbe1445e126), [`9d45b88`](https://github.com/scaleway/ultraviolet/commit/9d45b88cc22118f8bcd498aec748d1ceff09e845), [`64a051e`](https://github.com/scaleway/ultraviolet/commit/64a051eb9d1de401edfda77d931ce72382fed7e1), [`f1b9119`](https://github.com/scaleway/ultraviolet/commit/f1b9119d59378e56c44caa307a3040e0ef3b613d), [`ad3fddd`](https://github.com/scaleway/ultraviolet/commit/ad3fddd2ce77f59a7f5e04157f4c363180eec55c), [`d8f8952`](https://github.com/scaleway/ultraviolet/commit/d8f8952f530eea717f7bc3756b8401b39795661d), [`9583dc7`](https://github.com/scaleway/ultraviolet/commit/9583dc703bdd0b65f5c86c268137a45b5d59aa05), [`f72efaf`](https://github.com/scaleway/ultraviolet/commit/f72efafcac5143935efe7d62df823131e6e023f7), [`c532a07`](https://github.com/scaleway/ultraviolet/commit/c532a071ae72689ca6c68233eff49988e1208299), [`9bc47cf`](https://github.com/scaleway/ultraviolet/commit/9bc47cfa03ca1e380e01f147cabfaeacb3c7471d), [`5adc0e6`](https://github.com/scaleway/ultraviolet/commit/5adc0e6b1bc3e610fd21f03b320639dcc43b2df1), [`d509f5c`](https://github.com/scaleway/ultraviolet/commit/d509f5cc1b5469fdb368973544d8d0d6a38dfbc6)]:
  - @ultraviolet/ui@3.3.0
  - @ultraviolet/icons@5.0.3
  - @ultraviolet/themes@3.0.2

## 3.1.3

### Patch Changes

- Updated dependencies [[`1b34a68`](https://github.com/scaleway/ultraviolet/commit/1b34a68987c49c100e2fe01dbc9b6814bb3e7749), [`c4708a8`](https://github.com/scaleway/ultraviolet/commit/c4708a82dae51724af2fe3a0f13d777138b63a78)]:
  - @ultraviolet/ui@3.2.1

## 3.1.2

### Patch Changes

- [#5857](https://github.com/scaleway/ultraviolet/pull/5857) [`e173e1d`](https://github.com/scaleway/ultraviolet/commit/e173e1dcc89be8ff5ce30b5ac1e00ce5e8e84287) Thanks [@lisalupi](https://github.com/lisalupi)! - Use `cn` function to generate clean classnames

- [#5869](https://github.com/scaleway/ultraviolet/pull/5869) [`3a1daaa`](https://github.com/scaleway/ultraviolet/commit/3a1daaad38cbebec5509e1162c4351c0a251afd4) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - Dependency upgrade: Upgrade vitest to v4

- [#5861](https://github.com/scaleway/ultraviolet/pull/5861) [`ec3805a`](https://github.com/scaleway/ultraviolet/commit/ec3805aff08299614dce412db7ab9fbaa6141f56) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.2.1`.
  Updated dependency `react-dom` to `19.2.1`.

- [#5890](https://github.com/scaleway/ultraviolet/pull/5890) [`44aa0e5`](https://github.com/scaleway/ultraviolet/commit/44aa0e5fc7f789c2c286c238dc2f528a69677581) Thanks [@philibea](https://github.com/philibea)! - tsconfig add isolated module

- Updated dependencies [[`5374a2a`](https://github.com/scaleway/ultraviolet/commit/5374a2afe9c58a445b2a0dc3ff3a5733ece0a4ea), [`ec99ee5`](https://github.com/scaleway/ultraviolet/commit/ec99ee591e1de6b9c9428146fa7f8cb1bda1b81e), [`d1b9517`](https://github.com/scaleway/ultraviolet/commit/d1b9517b55a3f84ea94d52e09bbbb4b872e7219c), [`774fb31`](https://github.com/scaleway/ultraviolet/commit/774fb31d7929ae8bf20f180f54d38fec8fdb968b), [`e173e1d`](https://github.com/scaleway/ultraviolet/commit/e173e1dcc89be8ff5ce30b5ac1e00ce5e8e84287), [`e173e1d`](https://github.com/scaleway/ultraviolet/commit/e173e1dcc89be8ff5ce30b5ac1e00ce5e8e84287), [`22e27d6`](https://github.com/scaleway/ultraviolet/commit/22e27d621a269ddfd8f952e76e20b11c6914ad2b), [`3a1daaa`](https://github.com/scaleway/ultraviolet/commit/3a1daaad38cbebec5509e1162c4351c0a251afd4), [`ec3805a`](https://github.com/scaleway/ultraviolet/commit/ec3805aff08299614dce412db7ab9fbaa6141f56), [`44aa0e5`](https://github.com/scaleway/ultraviolet/commit/44aa0e5fc7f789c2c286c238dc2f528a69677581)]:
  - @ultraviolet/ui@3.2.0
  - @ultraviolet/themes@3.0.1
  - @ultraviolet/icons@5.0.2

## 3.1.1

### Patch Changes

- Updated dependencies [[`10ced0d`](https://github.com/scaleway/ultraviolet/commit/10ced0d1c7e22af4ccaf4b8f4e60b655e56579da)]:
  - @ultraviolet/ui@3.1.1

## 3.1.0

### Minor Changes

- [#5836](https://github.com/scaleway/ultraviolet/pull/5836) [`4432843`](https://github.com/scaleway/ultraviolet/commit/4432843f502fac07df39bfaa844154203fd71557) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`:
  - New prop `priceInformation` to display on the right side of the estimated cost
  - New prop `icon` for a subcategory to add an icon on the left side of the subcategory title
  - Prop `details` (subcategory) is now a `ReactNode` instead of a `string`
  - New prop `subtitle` (category) to add information beneath the category name
  - New prop `anchor` (category and subcategory)

### Patch Changes

- [#5821](https://github.com/scaleway/ultraviolet/pull/5821) [`e064b69`](https://github.com/scaleway/ultraviolet/commit/e064b6930434aad7b1e31f1e960f00ae291bb43f) Thanks [@lisalupi](https://github.com/lisalupi)! - `Plans`: new prop "highlight"

- [#5833](https://github.com/scaleway/ultraviolet/pull/5833) [`0e4dd48`](https://github.com/scaleway/ultraviolet/commit/0e4dd487741e0030d9f652e468b2dc035e2722d4) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`:

  - new prop `totalPriceInfoPlacement` for the placement of `totalPriceInfo`
  - new prop `hideBeforePrice` to only show discounted price
  - `discount = 1` interpreted as 100% instead of 1€ for the total price

- [#5856](https://github.com/scaleway/ultraviolet/pull/5856) [`1d7ad74`](https://github.com/scaleway/ultraviolet/commit/1d7ad7412c243ecb926bbe5760fbfbbc121cedef) Thanks [@lisalupi](https://github.com/lisalupi)! - ⚠️ `@ultraviolet/ui` is no longer a peer-dependency of `@ultraviolet/plus`, `@ultraviolet/form` and `@ultraviolet/nextjs` in order to simplify versioning with changeset

- [#5852](https://github.com/scaleway/ultraviolet/pull/5852) [`fa8b53c`](https://github.com/scaleway/ultraviolet/commit/fa8b53c3ba4aaa152c6fb10eece94b22f6de0223) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `10.0.0`.

- [#5824](https://github.com/scaleway/ultraviolet/pull/5824) [`a0d8757`](https://github.com/scaleway/ultraviolet/commit/a0d87578627cab57138181861559e6db7ab97d13) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.7`.

- Updated dependencies [[`634c88f`](https://github.com/scaleway/ultraviolet/commit/634c88f9597b432c21afc9903c0d96e3d54b578d), [`c650f4f`](https://github.com/scaleway/ultraviolet/commit/c650f4fd70be4b6a09477514b5719becec6a278b), [`7bde3d9`](https://github.com/scaleway/ultraviolet/commit/7bde3d9d0c905f610b903d1af7802742e3cfcc4e), [`019e4b3`](https://github.com/scaleway/ultraviolet/commit/019e4b3322d76f29986f275f5e852cc9d2089a43), [`cc568fc`](https://github.com/scaleway/ultraviolet/commit/cc568fc91c73e4ae185f304176a8690132eadff8), [`9bcbc09`](https://github.com/scaleway/ultraviolet/commit/9bcbc092a10a604f4f5fe3bea29c2a0bb85e5f23), [`a0d8757`](https://github.com/scaleway/ultraviolet/commit/a0d87578627cab57138181861559e6db7ab97d13), [`173e194`](https://github.com/scaleway/ultraviolet/commit/173e194b9524e7396cf98fc8725eba068d4d65cb), [`7625641`](https://github.com/scaleway/ultraviolet/commit/76256412346cff9d655d153d1b48741bc099db6d), [`cb75383`](https://github.com/scaleway/ultraviolet/commit/cb7538341653c9dc485bd59ef107cea863449fa1), [`6bc5d37`](https://github.com/scaleway/ultraviolet/commit/6bc5d376cd48c8dedf04f62e34b5b3c78f872a5e), [`0e4dd48`](https://github.com/scaleway/ultraviolet/commit/0e4dd487741e0030d9f652e468b2dc035e2722d4)]:
  - @ultraviolet/ui@3.1.0
  - @ultraviolet/icons@5.0.1

## 3.0.0

### Major Changes

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Release new beta version to compensate major released by error

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Remove `Emotion` and update READMEs.

- [#5819](https://github.com/scaleway/ultraviolet/pull/5819) [`48cc201`](https://github.com/scaleway/ultraviolet/commit/48cc201bd9278802a16d57e13c556364c88274bd) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor all components to use `vanilla-extract` instead of `Emotion`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Theme provider has been moved to `@ultraviolet/themes` package. `@ultraviolet/ui` imports it internally and export `ThemeProvider` and `useTheme` hook for convenience.

### Minor Changes

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add parameter `additionalInfo` on `subCategories` in `<OrderSummary />`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Configure vanilla extract on build and export styles. Can be imported as follow: `import '@ultraviolet/plus/styles'`

### Patch Changes

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `CodeEditor`: add background color on copy button for readability

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `OfferList`: first column should be strong and selected row text should be primary

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `style` to every component

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<Stack />` to provide `as` prop for polymorphic composition used in `<Navigation />` for example

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `InfoTable`: oneLine should work correctly with Stack and Row

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - remove cjs build

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `SteppedListCard`:

  - possibility to have an icon instead of a step number
  - `nextStep` will not change the step state (completed or not) if it does not receive a prop
  - smaller bullets
  - Update stories

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `ContentCard`: image should not be disabled when `disabled=false`

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add error message on Code editor

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<CodeEditor />` to have fallback value

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix `<OrderSummary />` component to show full unit input on time section

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: fix sub-category title size

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Updated dependency `@types/react` to `19.2.6`.
  Updated dependency `@types/react-dom` to `19.2.3`.

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.25.3`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.25.3`.
  Updated dependency `@uiw/react-codemirror` to `4.25.3`.

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add min-width instead of fixed width on OrderSummary, Add min-height on scrollable item on OrderSummary

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: `discount=1` should be interpreted as "100%", not "1€"

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add missing `className` and `data-testid` on some components

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `InfoTable`: oneLine created a visual issue

- [#5816](https://github.com/scaleway/ultraviolet/pull/5816) [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3) Thanks [@lisalupi](https://github.com/lisalupi)! - `OfferList`: add prop "prominence" for badge

- Updated dependencies [[`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`48cc201`](https://github.com/scaleway/ultraviolet/commit/48cc201bd9278802a16d57e13c556364c88274bd), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3), [`37ce3eb`](https://github.com/scaleway/ultraviolet/commit/37ce3ebe31043332cf38b789711ff88b87a6bce3)]:
  - @ultraviolet/themes@3.0.0
  - @ultraviolet/ui@3.0.0
  - @ultraviolet/icons@5.0.0

## 3.0.0-beta.19

### Patch Changes

- [#5795](https://github.com/scaleway/ultraviolet/pull/5795) [`7b8d1bd`](https://github.com/scaleway/ultraviolet/commit/7b8d1bd477f0cdd23e7d3a4ce57cf30bbc3fec9a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.2.6`.
  Updated dependency `@types/react-dom` to `19.2.3`.

- [#5803](https://github.com/scaleway/ultraviolet/pull/5803) [`bdcdecf`](https://github.com/scaleway/ultraviolet/commit/bdcdecfca0f04f74c921c23f63e14dc279ce5382) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.25.3`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.25.3`.
  Updated dependency `@uiw/react-codemirror` to `4.25.3`.
- Updated dependencies [[`7b8d1bd`](https://github.com/scaleway/ultraviolet/commit/7b8d1bd477f0cdd23e7d3a4ce57cf30bbc3fec9a)]:
  - @ultraviolet/icons@5.0.0-beta.13
  - @ultraviolet/ui@3.0.0-beta.29

## 3.0.0-beta.18

### Patch Changes

- [#5799](https://github.com/scaleway/ultraviolet/pull/5799) [`d63ca76`](https://github.com/scaleway/ultraviolet/commit/d63ca76316e49b2949be927bb86835c5611542af) Thanks [@lisalupi](https://github.com/lisalupi)! - `InfoTable`: oneLine created a visual issue

## 3.0.0-beta.17

### Patch Changes

- [#5786](https://github.com/scaleway/ultraviolet/pull/5786) [`6ab7982`](https://github.com/scaleway/ultraviolet/commit/6ab7982b7986378c7ef3b85d003d95fe53c4b05c) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: fix sub-category title size

- Updated dependencies [[`b7ab0e3`](https://github.com/scaleway/ultraviolet/commit/b7ab0e3e71e5d570b57d33907e1b51ae00d32c9a), [`63a8f2a`](https://github.com/scaleway/ultraviolet/commit/63a8f2a32a804c0c6767a9a030cb95de2cee563d), [`85d3468`](https://github.com/scaleway/ultraviolet/commit/85d3468dfce3a7532866cf63a017274e65661c80), [`b062bbe`](https://github.com/scaleway/ultraviolet/commit/b062bbe30e73ca43e5684aaf98b03aea57fea4c9), [`83455a7`](https://github.com/scaleway/ultraviolet/commit/83455a73d5c258ffd4d33e5f2050d696270bc96c), [`b9f0d1e`](https://github.com/scaleway/ultraviolet/commit/b9f0d1e7ad0aae0a4e7756d7d7e107a8228e9419)]:
  - @ultraviolet/ui@3.0.0-beta.28
  - @ultraviolet/icons@5.0.0-beta.12

## 3.0.0-beta.16

### Major Changes

- [#5768](https://github.com/scaleway/ultraviolet/pull/5768) [`3f0c64c`](https://github.com/scaleway/ultraviolet/commit/3f0c64c1fcc5c80af9275671795c6eb3886ceda5) Thanks [@lisalupi](https://github.com/lisalupi)! - Remove `Emotion` and update READMEs.

### Patch Changes

- [#5783](https://github.com/scaleway/ultraviolet/pull/5783) [`fa0a526`](https://github.com/scaleway/ultraviolet/commit/fa0a526367c4e6acaf6e1b327c7e0a55d82a1d12) Thanks [@lisalupi](https://github.com/lisalupi)! - `InfoTable`: oneLine should work correctly with Stack and Row

- [#5757](https://github.com/scaleway/ultraviolet/pull/5757) [`50851d4`](https://github.com/scaleway/ultraviolet/commit/50851d4cbf7123744e59d88c939f23d0fc575acd) Thanks [@philibea](https://github.com/philibea)! - remove cjs build

- [#5780](https://github.com/scaleway/ultraviolet/pull/5780) [`dad6df1`](https://github.com/scaleway/ultraviolet/commit/dad6df17eaf56756b5d0e4bf72ceba4767a32072) Thanks [@lisalupi](https://github.com/lisalupi)! - `SteppedListCard`:
  - possibility to have an icon instead of a step number
  - `nextStep` will not change the step state (completed or not) if it does not receive a prop
  - smaller bullets
  - Update stories
- Updated dependencies [[`c6eb5c7`](https://github.com/scaleway/ultraviolet/commit/c6eb5c7acd5b32f647306c35f9755c51e60ab33a), [`3f0c64c`](https://github.com/scaleway/ultraviolet/commit/3f0c64c1fcc5c80af9275671795c6eb3886ceda5), [`ad4a930`](https://github.com/scaleway/ultraviolet/commit/ad4a930595722ef9e7764f1f2e2ba67948efaa06), [`50851d4`](https://github.com/scaleway/ultraviolet/commit/50851d4cbf7123744e59d88c939f23d0fc575acd), [`2974892`](https://github.com/scaleway/ultraviolet/commit/2974892ab614235acdf141f1a83c9a867237cb9b), [`5747647`](https://github.com/scaleway/ultraviolet/commit/57476477b2e7888e644ac44fe31ba6f270913248)]:
  - @ultraviolet/icons@5.0.0-beta.11
  - @ultraviolet/ui@3.0.0-beta.27
  - @ultraviolet/themes@3.0.0-beta.4

## 3.0.0-beta.15

### Patch Changes

- [#5773](https://github.com/scaleway/ultraviolet/pull/5773) [`75d6213`](https://github.com/scaleway/ultraviolet/commit/75d6213d3b5a9f006bf0202371a6c3c1c882caf7) Thanks [@vincentaudebert](https://github.com/vincentaudebert)! - `OfferList`: add prop "prominence" for badge

- Updated dependencies [[`abfbe9e`](https://github.com/scaleway/ultraviolet/commit/abfbe9e150f8e7880b03ea3ce69ede86f6c46420)]:
  - @ultraviolet/ui@3.0.0-beta.26

## 3.0.0-beta.14

### Patch Changes

- [#5767](https://github.com/scaleway/ultraviolet/pull/5767) [`91c824a`](https://github.com/scaleway/ultraviolet/commit/91c824a1c9e90124e99df8e132a148e1b3ac996a) Thanks [@lisalupi](https://github.com/lisalupi)! - `OfferList`: first column should be strong and selected row text should be primary

- [#5759](https://github.com/scaleway/ultraviolet/pull/5759) [`ee2f3eb`](https://github.com/scaleway/ultraviolet/commit/ee2f3eb9bf0f16e95b57817e0c8a5e5eba1f6aa3) Thanks [@lisalupi](https://github.com/lisalupi)! - Add prop `style` to every component

- [#5763](https://github.com/scaleway/ultraviolet/pull/5763) [`396c248`](https://github.com/scaleway/ultraviolet/commit/396c248989905a975b532f1eeb9e23e4ee182529) Thanks [@lisalupi](https://github.com/lisalupi)! - `ContentCard`: image should not be disabled when `disabled=false`

- [#5762](https://github.com/scaleway/ultraviolet/pull/5762) [`440d5bb`](https://github.com/scaleway/ultraviolet/commit/440d5bb536d3b10b9079e5cea83450d1b88001fa) Thanks [@lisalupi](https://github.com/lisalupi)! - `Plans` migrate missing sub-component to vanilla extract

- [#5770](https://github.com/scaleway/ultraviolet/pull/5770) [`6e8d4e1`](https://github.com/scaleway/ultraviolet/commit/6e8d4e1dfd17606b09994e6eda5c001e27f9f4d1) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: `discount=1` should be interpreted as "100%", not "1€"

- Updated dependencies [[`bc629aa`](https://github.com/scaleway/ultraviolet/commit/bc629aa7771057a7ca7a9e59bff983a0df73d2fa), [`ee2f3eb`](https://github.com/scaleway/ultraviolet/commit/ee2f3eb9bf0f16e95b57817e0c8a5e5eba1f6aa3), [`deba7e9`](https://github.com/scaleway/ultraviolet/commit/deba7e941ade8a796666c18f64bf7c2959709e19), [`440d5bb`](https://github.com/scaleway/ultraviolet/commit/440d5bb536d3b10b9079e5cea83450d1b88001fa), [`29df8eb`](https://github.com/scaleway/ultraviolet/commit/29df8ebd47e8d0cdbf8a3ca73f74bfe9afdd3983)]:
  - @ultraviolet/ui@3.0.0-beta.25
  - @ultraviolet/icons@5.0.0-beta.10

## 3.0.0-beta.13

### Minor Changes

- [#5743](https://github.com/scaleway/ultraviolet/pull/5743) [`6683a8d`](https://github.com/scaleway/ultraviolet/commit/6683a8dad5f4c47eff0d7d5deeef6be5b0dfae71) Thanks [@lisalupi](https://github.com/lisalupi)! - Refaactor component `Navigation` to use vanilla-extract instead of Emotion

- [#5755](https://github.com/scaleway/ultraviolet/pull/5755) [`eecead1`](https://github.com/scaleway/ultraviolet/commit/eecead1342d5381766aabd806e38eb89f5373af4) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `SteppedListCard` to use vanilla-extract instead of Emotion

- [#5751](https://github.com/scaleway/ultraviolet/pull/5751) [`4c52634`](https://github.com/scaleway/ultraviolet/commit/4c526348c5982e4e004c949c74320e5dd3d57881) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `OrderSummary` to use vanilla-extract instead of Emotion

- [#5752](https://github.com/scaleway/ultraviolet/pull/5752) [`137020b`](https://github.com/scaleway/ultraviolet/commit/137020b8430d777910fc8c23eed9dea3e379c49a) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Plans` to use vanilla-extract instead of Emotion

- [#5737](https://github.com/scaleway/ultraviolet/pull/5737) [`62e6d7c`](https://github.com/scaleway/ultraviolet/commit/62e6d7cbc06decf5fe036649ae832613c789b066) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `EstimateCost` to use vanilla extract instead of Emotion

### Patch Changes

- Updated dependencies [[`2eea0ad`](https://github.com/scaleway/ultraviolet/commit/2eea0add9d9b3988e3edcbdd54c2b1367e6923d6), [`2eea0ad`](https://github.com/scaleway/ultraviolet/commit/2eea0add9d9b3988e3edcbdd54c2b1367e6923d6), [`4386617`](https://github.com/scaleway/ultraviolet/commit/4386617bee7563bb9f8fee177c936038f11dd47d), [`5ac319e`](https://github.com/scaleway/ultraviolet/commit/5ac319e45abb27c624f2f33dd897be4cf1638312)]:
  - @ultraviolet/themes@3.0.0-beta.3
  - @ultraviolet/ui@3.0.0-beta.24
  - @ultraviolet/icons@5.0.0-beta.9

## 3.0.0-beta.12

### Minor Changes

- [#5718](https://github.com/scaleway/ultraviolet/pull/5718) [`4020830`](https://github.com/scaleway/ultraviolet/commit/4020830505e8fc3adaf976dea214e2e225b64ac9) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `CustomerSatisfaction` to use vanilla extract instead of Emotion

### Patch Changes

- Updated dependencies [[`317dbf6`](https://github.com/scaleway/ultraviolet/commit/317dbf6ee868f1e35dc1eeda47c3f169f3d1f391), [`e2088f2`](https://github.com/scaleway/ultraviolet/commit/e2088f2f29499ba4c6737f638be657bb2b038d6b), [`3e9b92b`](https://github.com/scaleway/ultraviolet/commit/3e9b92bc1fe287d10f7806536fbb9256048d97af), [`56915f1`](https://github.com/scaleway/ultraviolet/commit/56915f180a3da3289ebc5f6527e5a4427e441e1d), [`0523069`](https://github.com/scaleway/ultraviolet/commit/0523069fd9a4455c375315ea7a47b4292ebc978e), [`eb6127e`](https://github.com/scaleway/ultraviolet/commit/eb6127e80e64644b0e2a4237a3cea291172acade), [`0dcf373`](https://github.com/scaleway/ultraviolet/commit/0dcf37393506dc01609e803e11743b013296dfa0), [`065f4e2`](https://github.com/scaleway/ultraviolet/commit/065f4e279b76b6953c6d9b4778cb6ed1b78f5e9b), [`e23a69c`](https://github.com/scaleway/ultraviolet/commit/e23a69c30e95bec45b0a79e315682b330c0fbcef)]:
  - @ultraviolet/ui@3.0.0-beta.23
  - @ultraviolet/icons@5.0.0-beta.8

## 3.0.0-beta.11

### Minor Changes

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`68006e1`](https://github.com/scaleway/ultraviolet/commit/68006e14d373276ce7d77638ec6261229cce60b5) Thanks [@lisalupi](https://github.com/lisalupi)! - - Refactor component `InfoTable` to use vanilla extract instead of Emotion

  - Add prop "style" to `Row`

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`de4cc1c`](https://github.com/scaleway/ultraviolet/commit/de4cc1c180e36fbe991da9268871b21868bd7112) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `Conversation` to use vanilla extract instead of Emotion

### Patch Changes

- [#5491](https://github.com/scaleway/ultraviolet/pull/5491) [`f0df145`](https://github.com/scaleway/ultraviolet/commit/f0df145add1796ded05c854d9e7c21fe40802c62) Thanks [@lisalupi](https://github.com/lisalupi)! - `CodeEditor`: add backgroundc color on copy button for readability

- Updated dependencies [[`bf7256b`](https://github.com/scaleway/ultraviolet/commit/bf7256b5d2ef4b3b1346037bff5d86c2f47e4785), [`68006e1`](https://github.com/scaleway/ultraviolet/commit/68006e14d373276ce7d77638ec6261229cce60b5), [`7091562`](https://github.com/scaleway/ultraviolet/commit/709156284a91877ccbe72feba79b4ae44797319f), [`203174a`](https://github.com/scaleway/ultraviolet/commit/203174a4d8a5e74bdff04b9d961b478423a8da1e), [`0e47e5c`](https://github.com/scaleway/ultraviolet/commit/0e47e5c2288171ce4a3b3b613dbb4da4165428c7), [`a67faa2`](https://github.com/scaleway/ultraviolet/commit/a67faa2467ff6624b7a8c552c8e0b9d26c5b3063), [`97f362c`](https://github.com/scaleway/ultraviolet/commit/97f362ca8f84a654bd0174b719c5e660991fd866)]:
  - @ultraviolet/icons@5.0.0-beta.7
  - @ultraviolet/ui@3.0.0-beta.22

## 3.0.0-beta.10

### Minor Changes

- [#5663](https://github.com/scaleway/ultraviolet/pull/5663) [`60fc74b`](https://github.com/scaleway/ultraviolet/commit/60fc74b03a86a163709df4a2200a8ddf7ca105ae) Thanks [@matthprost](https://github.com/matthprost)! - Refactor `<ContentCardGroup />` to use vanilla extract

### Patch Changes

- [#5661](https://github.com/scaleway/ultraviolet/pull/5661) [`3e9f9ad`](https://github.com/scaleway/ultraviolet/commit/3e9f9ad699a2415264a7b8f9c78d439b32ecef45) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<OrderSummary />` component to show full unit input on time section

- Updated dependencies [[`f6948b0`](https://github.com/scaleway/ultraviolet/commit/f6948b0aefe91750203bdbcd1b5173b872819004), [`b348f99`](https://github.com/scaleway/ultraviolet/commit/b348f99ea11415508b618d52df29d1b7dcc4b302), [`634ced8`](https://github.com/scaleway/ultraviolet/commit/634ced8b45f33a7f192f2e8e3f862e83ad5c72b4), [`c186192`](https://github.com/scaleway/ultraviolet/commit/c186192ad5e8e8e7e03f5e547602e34c04d8bac3), [`fb3f4ca`](https://github.com/scaleway/ultraviolet/commit/fb3f4ca7a883c5f733afd01904eb4900769f1548), [`3e9f9ad`](https://github.com/scaleway/ultraviolet/commit/3e9f9ad699a2415264a7b8f9c78d439b32ecef45), [`1893b2b`](https://github.com/scaleway/ultraviolet/commit/1893b2b6f104eb5843145c8cb69c46ac0ead6bbe), [`fdb5be1`](https://github.com/scaleway/ultraviolet/commit/fdb5be1171509eaa17278264eae53e23be234925), [`13350bc`](https://github.com/scaleway/ultraviolet/commit/13350bca640b8db2152219a7efbae1c922128558)]:
  - @ultraviolet/ui@3.0.0-beta.21

## 3.0.0-beta.9

### Major Changes

- [#5632](https://github.com/scaleway/ultraviolet/pull/5632) [`4d56ac4`](https://github.com/scaleway/ultraviolet/commit/4d56ac4f9b25449393fa3739a31097bcdfa40089) Thanks [@matthprost](https://github.com/matthprost)! - Theme provider has been moved to `@ultraviolet/themes` package. `@ultraviolet/ui` imports it internally and export `ThemeProvider` and `useTheme` hook for convenience.

### Minor Changes

- [#5683](https://github.com/scaleway/ultraviolet/pull/5683) [`26738ef`](https://github.com/scaleway/ultraviolet/commit/26738ef8ee643a1b9f5e39c298ae2b9bd9df5613) Thanks [@matthprost](https://github.com/matthprost)! - Add parameter `additionalInfo` on `subCategories` in `<OrderSummary />`

### Patch Changes

- Updated dependencies [[`4d56ac4`](https://github.com/scaleway/ultraviolet/commit/4d56ac4f9b25449393fa3739a31097bcdfa40089)]:
  - @ultraviolet/themes@3.0.0-beta.2
  - @ultraviolet/icons@5.0.0-beta.6
  - @ultraviolet/ui@3.0.0-beta.20

## 3.0.0-beta.8

### Minor Changes

- [#5659](https://github.com/scaleway/ultraviolet/pull/5659) [`1212bbd`](https://github.com/scaleway/ultraviolet/commit/1212bbd3e59e6e6a2c2e30da3b396710f38df498) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `FAQ` to use vanilla extract instead of Emotion

- [#5654](https://github.com/scaleway/ultraviolet/pull/5654) [`afa989d`](https://github.com/scaleway/ultraviolet/commit/afa989d8297bbaf7896f0ebf2dc89bfaeba2f3a0) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor component `CodeEditor` to use vanilla extract instead of Emotion

### Patch Changes

- Updated dependencies [[`4fb8e97`](https://github.com/scaleway/ultraviolet/commit/4fb8e97474b1d8a33fa98f22cdddfdeed753e3f1), [`5c10948`](https://github.com/scaleway/ultraviolet/commit/5c10948eceb6a4e257bd6f752273dc7fee85d08e), [`4d97647`](https://github.com/scaleway/ultraviolet/commit/4d97647adcc1fb2282ca1a7294c46310fc9ea695), [`8ec50bb`](https://github.com/scaleway/ultraviolet/commit/8ec50bbb6b49f71ca574adeeaa1905d27511d0a8), [`aa20c75`](https://github.com/scaleway/ultraviolet/commit/aa20c755e8f1bfa0f0ed927edfe53f8bda642102), [`29bfec5`](https://github.com/scaleway/ultraviolet/commit/29bfec55c9519756f62f61aabcb775b0db1bc968)]:
  - @ultraviolet/icons@5.0.0-beta.5
  - @ultraviolet/ui@3.0.0-beta.19

## 3.0.0-beta.7

### Minor Changes

- [#5628](https://github.com/scaleway/ultraviolet/pull/5628) [`4520138`](https://github.com/scaleway/ultraviolet/commit/452013864b764f77ab3f8024fc830a9a1170b618) Thanks [@matthprost](https://github.com/matthprost)! - - Refactor `<ContentCard />` to use vanilla extract
  - Configure vanilla extract on build and export styles. Can be imported as follow: `import '@ultraviolet/plus/styles'`

### Patch Changes

- Updated dependencies [[`945ce38`](https://github.com/scaleway/ultraviolet/commit/945ce3842e11407e4bdda076c27f41465ec73284), [`12fc99d`](https://github.com/scaleway/ultraviolet/commit/12fc99dde57e3e97543bc26402a99ad0ea359cd8), [`4520138`](https://github.com/scaleway/ultraviolet/commit/452013864b764f77ab3f8024fc830a9a1170b618), [`a8b9b62`](https://github.com/scaleway/ultraviolet/commit/a8b9b6237173d72b9c74af2ac4d57b4b81949982), [`d1b44ff`](https://github.com/scaleway/ultraviolet/commit/d1b44ffd1bf0a8ded5b13d3b51a3e8ed0077a46d), [`4e03810`](https://github.com/scaleway/ultraviolet/commit/4e038106bf90dc1a44db45b19417d3ad04955c5c), [`e4d6b23`](https://github.com/scaleway/ultraviolet/commit/e4d6b23e719e64e48ec6fc4e8b18b863bd5dc471), [`6fb2304`](https://github.com/scaleway/ultraviolet/commit/6fb230499200457163122799f7bdfdc633407492)]:
  - @ultraviolet/ui@3.0.0-beta.18

## 3.0.0-beta.6

### Patch Changes

- Updated dependencies [[`776c6df`](https://github.com/scaleway/ultraviolet/commit/776c6df268e796d6ee741fce25d70e0991085f5e), [`c80b7c3`](https://github.com/scaleway/ultraviolet/commit/c80b7c30d1692a6f07e5a90fa73d03cba3627fa3), [`6fdf91d`](https://github.com/scaleway/ultraviolet/commit/6fdf91da1cca7c74f843dbb338960ef9d1b686bb), [`3bca6bb`](https://github.com/scaleway/ultraviolet/commit/3bca6bb32cbab6b9359542b112568d84a11dcab9)]:
  - @ultraviolet/icons@5.0.0-beta.4
  - @ultraviolet/ui@3.0.0-beta.17

## 3.0.0-beta.5

### Patch Changes

- Updated dependencies [[`b19c4e5`](https://github.com/scaleway/ultraviolet/commit/b19c4e5c142fcbfd21b822c07baea90d34d8eee2), [`1f78aa4`](https://github.com/scaleway/ultraviolet/commit/1f78aa437fe0d449f5a68f94291a4a1bb6387290), [`1e8e44b`](https://github.com/scaleway/ultraviolet/commit/1e8e44b1175d645ffc7659f8d1ac338b0ef9af7f), [`5c46f8a`](https://github.com/scaleway/ultraviolet/commit/5c46f8acf6c75499e40d9c9e78f380ea55f3eeb3), [`c3adef6`](https://github.com/scaleway/ultraviolet/commit/c3adef6960af5d6c1355244a0ab3a18ab42b4204)]:
  - @ultraviolet/icons@5.0.0-beta.3
  - @ultraviolet/ui@3.0.0-beta.16

## 3.0.0-beta.4

### Patch Changes

- Updated dependencies [[`4ade022`](https://github.com/scaleway/ultraviolet/commit/4ade022e8d80eaa44de37559c04f53e87f7f3d6a), [`d85d9f5`](https://github.com/scaleway/ultraviolet/commit/d85d9f5c782a16eacaf5f7f95956e121bb1daa32)]:
  - @ultraviolet/ui@3.0.0-beta.15

## 3.0.0-beta.3

### Patch Changes

- Updated dependencies [[`d73ead7`](https://github.com/scaleway/ultraviolet/commit/d73ead73008c7798c3085724e1966d9e55503a24), [`245d454`](https://github.com/scaleway/ultraviolet/commit/245d4542c11d636973aaaef86ae53a57ab16f236), [`93d75dd`](https://github.com/scaleway/ultraviolet/commit/93d75dd371c3c7740e669b1567a2580d0e17afd8), [`660d30e`](https://github.com/scaleway/ultraviolet/commit/660d30e5d85dac2be4f10f28f486c31ad922b60a), [`943b05a`](https://github.com/scaleway/ultraviolet/commit/943b05adef22d7e03976cd67a5d97f56c18c2482), [`568797d`](https://github.com/scaleway/ultraviolet/commit/568797dde5a4ca3cee9e56014d1e45dfff171b2c), [`9ad2c9a`](https://github.com/scaleway/ultraviolet/commit/9ad2c9af20cc15669fdcd959f4e5c1b0971e99c6), [`aaa2c52`](https://github.com/scaleway/ultraviolet/commit/aaa2c521f9c2a924c50ecaf5aa49f92791e734c9)]:
  - @ultraviolet/ui@3.0.0-beta.14
  - @ultraviolet/icons@5.0.0-beta.2

## 3.0.0-beta.2

### Patch Changes

- [#5581](https://github.com/scaleway/ultraviolet/pull/5581) [`4150091`](https://github.com/scaleway/ultraviolet/commit/4150091824659471cc006be8d89a707cdf41902f) Thanks [@matthprost](https://github.com/matthprost)! - Add missing `className` and `data-testid` on some components

- Updated dependencies [[`c79b4fb`](https://github.com/scaleway/ultraviolet/commit/c79b4fb72779a31b1b9b5f9ee3228fbc56630022), [`47257af`](https://github.com/scaleway/ultraviolet/commit/47257afab643364777bf0f98a292bb87808242c7), [`dce2961`](https://github.com/scaleway/ultraviolet/commit/dce2961df8780b3f11ac6527de93911c0ac6d560), [`4a20bf5`](https://github.com/scaleway/ultraviolet/commit/4a20bf5ebc5b298cc5ed7e0842214701a2c1efc7), [`02ca583`](https://github.com/scaleway/ultraviolet/commit/02ca5830154c172c8d4e3cb92b8cff67ff14a976), [`1b41251`](https://github.com/scaleway/ultraviolet/commit/1b412515e05d1de803e65d7d57ef6dee02c55c8b), [`647bf54`](https://github.com/scaleway/ultraviolet/commit/647bf545eb3496fee1503c8e18e68f1b4812fc25)]:
  - @ultraviolet/ui@3.0.0-beta.13

## 3.0.0-beta.1

### Major Changes

- [`f7a0e49`](https://github.com/scaleway/ultraviolet/commit/f7a0e49c94677e5d9603263a5f183f57a1a19238) Thanks [@matthprost](https://github.com/matthprost)! - Release new beta version to compensate major released by error

### Patch Changes

- [#5560](https://github.com/scaleway/ultraviolet/pull/5560) [`68d7561`](https://github.com/scaleway/ultraviolet/commit/68d7561d5199fc5ec4953ae8f42c3a745bf2c4d9) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<CodeEditor />` to have fallback value

- Updated dependencies [[`f7a0e49`](https://github.com/scaleway/ultraviolet/commit/f7a0e49c94677e5d9603263a5f183f57a1a19238)]:
  - @ultraviolet/icons@5.0.0-beta.1
  - @ultraviolet/themes@3.0.0-beta.1
  - @ultraviolet/ui@3.0.0-beta.12

## 2.0.0-beta.11

### Patch Changes

- [`2806dad`](https://github.com/scaleway/ultraviolet/commit/2806dadb95844176cc9d7c87eab5464c2742e7c8) Thanks [@philibea](https://github.com/philibea)! - Add min-width instead of fixed width on OrderSummary, Add min-height on scrollable item on OrderSummary

- Updated dependencies [[`3f54ff6`](https://github.com/scaleway/ultraviolet/commit/3f54ff6109b2d123ccb0f56f4dccab81d6c3d82a)]:
  - @ultraviolet/ui@3.0.0-beta.11

## 2.0.0-beta.9

### Patch Changes

- [#5546](https://github.com/scaleway/ultraviolet/pull/5546) [`72382ac`](https://github.com/scaleway/ultraviolet/commit/72382ac8b93c7c0b5b1451fe625e0971117e4a30) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Stack />` to provide `as` prop for polymorphic composition used in `<Navigation />` for example

- Updated dependencies [[`29d2395`](https://github.com/scaleway/ultraviolet/commit/29d2395c652b3035c286e3e13da934a268153940), [`72382ac`](https://github.com/scaleway/ultraviolet/commit/72382ac8b93c7c0b5b1451fe625e0971117e4a30)]:
  - @ultraviolet/ui@3.0.0-beta.9

## 2.0.0-beta.8

### Patch Changes

- Updated dependencies [[`81cb7b1`](https://github.com/scaleway/ultraviolet/commit/81cb7b1fcae70e255351ede447a3cb2977a4f168), [`f2d6c57`](https://github.com/scaleway/ultraviolet/commit/f2d6c57addd55d577329d9931c11866b955fcc92), [`694b0d5`](https://github.com/scaleway/ultraviolet/commit/694b0d5fca9b4ffec2f81e2570466569eab08565), [`be21b81`](https://github.com/scaleway/ultraviolet/commit/be21b81f1a776a7b7edcb0ef96eed3e58264c33d), [`0c071df`](https://github.com/scaleway/ultraviolet/commit/0c071df7fb6c5a5d96319baa7660ce801439eb97), [`80bdfbd`](https://github.com/scaleway/ultraviolet/commit/80bdfbd9b00cc58f87779779bc3eba4fdbc48e77), [`43f5891`](https://github.com/scaleway/ultraviolet/commit/43f589191ef2e51fcf7533826ded0be28698fbe7), [`272422f`](https://github.com/scaleway/ultraviolet/commit/272422f803f5bcdeb6d05f84455f6904e2b901c5)]:
  - @ultraviolet/ui@3.0.0-beta.8
  - @ultraviolet/icons@4.1.0-beta.4

## 2.0.0-beta.7

### Patch Changes

- Updated dependencies [[`a6ca909`](https://github.com/scaleway/ultraviolet/commit/a6ca90992bc60e052e53fbe9317ca6ede96ebe4d), [`4439df6`](https://github.com/scaleway/ultraviolet/commit/4439df607ffa1f7e6bb2a45bdbbedff6ae3c27b2), [`7de4324`](https://github.com/scaleway/ultraviolet/commit/7de43248e0591d95b510adcdb79d559862de9eb6)]:
  - @ultraviolet/icons@4.1.0-beta.3
  - @ultraviolet/themes@2.1.0-beta.1
  - @ultraviolet/ui@3.0.0-beta.7

## 2.1.5

### Patch Changes

- [#5561](https://github.com/scaleway/ultraviolet/pull/5561) [`28755fc`](https://github.com/scaleway/ultraviolet/commit/28755fcf56d7c447b6cd5d0221edbd058604880d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.25.2`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.25.2`.
  Updated dependency `@uiw/react-codemirror` to `4.25.2`.

## 2.1.4

### Patch Changes

- [#5539](https://github.com/scaleway/ultraviolet/pull/5539) [`63aa37e`](https://github.com/scaleway/ultraviolet/commit/63aa37ea0e76e027138c113e95570f0d196843c1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.4`.
  Updated dependency `@babel/runtime` to `7.28.4`.
  Updated dependency `@babel/eslint-parser` to `7.28.4`.
- Updated dependencies [[`63aa37e`](https://github.com/scaleway/ultraviolet/commit/63aa37ea0e76e027138c113e95570f0d196843c1)]:
  - @ultraviolet/icons@4.1.1
  - @ultraviolet/ui@2.1.4

## 2.1.3

### Patch Changes

- [#5543](https://github.com/scaleway/ultraviolet/pull/5543) [`8267b84`](https://github.com/scaleway/ultraviolet/commit/8267b849315ca4affd86b671c5e4cf4042389e95) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.13`.

- Updated dependencies [[`8267b84`](https://github.com/scaleway/ultraviolet/commit/8267b849315ca4affd86b671c5e4cf4042389e95), [`b1057f8`](https://github.com/scaleway/ultraviolet/commit/b1057f8ad18cf62e105f990d2ebad59842b6ec67)]:
  - @ultraviolet/icons@4.1.0
  - @ultraviolet/ui@2.1.3

## 2.1.2

### Patch Changes

- [#5514](https://github.com/scaleway/ultraviolet/pull/5514) [`8d46d50`](https://github.com/scaleway/ultraviolet/commit/8d46d508b669fb93199806ff3defabd6210f12c7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.25.1`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.25.1`.
  Updated dependency `@uiw/react-codemirror` to `4.25.1`.

## 2.1.1

### Patch Changes

- Updated dependencies [[`4439df6`](https://github.com/scaleway/ultraviolet/commit/4439df607ffa1f7e6bb2a45bdbbedff6ae3c27b2)]:
  - @ultraviolet/themes@2.1.0
  - @ultraviolet/icons@4.0.5
  - @ultraviolet/ui@2.1.2

## 2.1.0

### Minor Changes

- [#5460](https://github.com/scaleway/ultraviolet/pull/5460) [`9826c20`](https://github.com/scaleway/ultraviolet/commit/9826c200d02e9d2ad9f68610ac15112a896fa0ef) Thanks [@Echo-IV](https://github.com/Echo-IV)! - Add lineNumber prop on `<CodeEditor />` component

### Patch Changes

- [#5490](https://github.com/scaleway/ultraviolet/pull/5490) [`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.12`.
  Updated dependency `@types/react-dom` to `19.1.9`.

- [#5499](https://github.com/scaleway/ultraviolet/pull/5499) [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.3`.
  Updated dependency `@babel/runtime` to `7.28.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.28.3`.
  Updated dependency `@babel/preset-env` to `7.28.3`.
- Updated dependencies [[`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7), [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542)]:
  - @ultraviolet/icons@4.0.4
  - @ultraviolet/ui@2.1.1

## 2.0.0-beta.6

### Minor Changes

- [#5460](https://github.com/scaleway/ultraviolet/pull/5460) [`9826c20`](https://github.com/scaleway/ultraviolet/commit/9826c200d02e9d2ad9f68610ac15112a896fa0ef) Thanks [@Echo-IV](https://github.com/Echo-IV)! - Add lineNumber prop on `<CodeEditor />` component

### Patch Changes

- [`37debae`](https://github.com/scaleway/ultraviolet/commit/37debae5387ce8f03beda91c0518c6f739513188) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - Add error message on Code editor

- [#5490](https://github.com/scaleway/ultraviolet/pull/5490) [`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.12`.
  Updated dependency `@types/react-dom` to `19.1.9`.

- [#5499](https://github.com/scaleway/ultraviolet/pull/5499) [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.3`.
  Updated dependency `@babel/runtime` to `7.28.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.28.3`.
  Updated dependency `@babel/preset-env` to `7.28.3`.
- Updated dependencies [[`65da279`](https://github.com/scaleway/ultraviolet/commit/65da27924e47c48bfe97e485881d2a3aeb147bb6), [`7a6a41e`](https://github.com/scaleway/ultraviolet/commit/7a6a41e26303a8c273700e2a32784ca515067f15), [`475669b`](https://github.com/scaleway/ultraviolet/commit/475669bd710411ec99a5370ede1523535161fbdc), [`a65dcc1`](https://github.com/scaleway/ultraviolet/commit/a65dcc1e898321d13480c88036d5196c1fa28814), [`2779f6d`](https://github.com/scaleway/ultraviolet/commit/2779f6de81b6e4522cf304d94d09dcd4f2bcc6f7), [`0f049c0`](https://github.com/scaleway/ultraviolet/commit/0f049c044ba9208abf7a1a6a6ea0d911803ea542), [`6815e33`](https://github.com/scaleway/ultraviolet/commit/6815e33cae41e61b0285fca98fb6894837f1b6ef), [`cb3aaed`](https://github.com/scaleway/ultraviolet/commit/cb3aaeddda933b0ccb0db8a484e18dcbb631d6ff)]:
  - @ultraviolet/ui@3.0.0-beta.6
  - @ultraviolet/icons@4.0.4-beta.2

## 2.0.0-beta.5

### Patch Changes

- Updated dependencies [[`671427e`](https://github.com/scaleway/ultraviolet/commit/671427eab0dd3e7c72f7085c75a8e0dd77b26761), [`8d11143`](https://github.com/scaleway/ultraviolet/commit/8d111439baf02a951bab616dfea637e269f0f7ec), [`52f4748`](https://github.com/scaleway/ultraviolet/commit/52f47488f0b50e5d8dbdd1a78eb27d60786e6532)]:
  - @ultraviolet/ui@3.0.0-beta.5

## 2.0.0-beta.4

### Patch Changes

- Updated dependencies [[`0ce72ef`](https://github.com/scaleway/ultraviolet/commit/0ce72ef33b9b21dfa4404f54d1b0aaa1f156e41c), [`963df3d`](https://github.com/scaleway/ultraviolet/commit/963df3db19a71edf8118d8ddfc87dbd9d3270ccd), [`15512aa`](https://github.com/scaleway/ultraviolet/commit/15512aaad1da3218ea3765261451d15fb05d6660)]:
  - @ultraviolet/ui@3.0.0-beta.4
  - @ultraviolet/icons@4.0.4-beta.1

## 2.0.0-beta.3

### Patch Changes

- Updated dependencies [[`9187560`](https://github.com/scaleway/ultraviolet/commit/9187560d39c6f7b1145bbc2df76898d7a797b78a), [`db1aedc`](https://github.com/scaleway/ultraviolet/commit/db1aedce578a5d1caedc299d666d8584250421b1), [`cd7bed7`](https://github.com/scaleway/ultraviolet/commit/cd7bed7983dcae8c072b1140d1cbd92d8d026624)]:
  - @ultraviolet/ui@3.0.0-beta.3

## 2.0.0-beta.2

### Patch Changes

- Updated dependencies [[`c4b76f1`](https://github.com/scaleway/ultraviolet/commit/c4b76f1293eaf9b621af3f5a3584fc72d1eda80a)]:
  - @ultraviolet/ui@3.0.0-beta.2

## 2.0.0-beta.1

### Patch Changes

- Updated dependencies [[`6f5f565`](https://github.com/scaleway/ultraviolet/commit/6f5f5650031f99808c710bfe069bdf7094ce336b)]:
  - @ultraviolet/themes@2.1.0-beta.0
  - @ultraviolet/icons@4.0.4-beta.0
  - @ultraviolet/ui@3.0.0-beta.1

## 2.0.0-beta.0

### Patch Changes

- Updated dependencies [[`177fd92`](https://github.com/scaleway/ultraviolet/commit/177fd92f018b692084815705bf10537832368330)]:
  - @ultraviolet/ui@3.0.0-beta.0

## 1.0.6

### Patch Changes

- Updated dependencies [[`8a5652e`](https://github.com/scaleway/ultraviolet/commit/8a5652ea86f6bce6ff75f5123acfc5c6ae648ac7)]:
  - @ultraviolet/ui@2.0.6

## 1.0.5

### Patch Changes

- Updated dependencies [[`4285555`](https://github.com/scaleway/ultraviolet/commit/4285555acb58cd7648e58881daec180d76621e23)]:
  - @ultraviolet/ui@2.0.5

## 1.0.4

### Patch Changes

- [#5410](https://github.com/scaleway/ultraviolet/pull/5410) [`6d6ea09`](https://github.com/scaleway/ultraviolet/commit/6d6ea09eabd68bebc0300b1002a8308b1f336e3b) Thanks [@lisalupi](https://github.com/lisalupi)! - - `OfferList`: fix spacing between rows
  - `List`: new props "onMouseLeave" and "onMouseEnter"
- Updated dependencies [[`c38483f`](https://github.com/scaleway/ultraviolet/commit/c38483f88c2ddc09c85e825553adb25be33c8e2f), [`22733ab`](https://github.com/scaleway/ultraviolet/commit/22733ab678cb58a71cc8e6f93f98544b3f3d2cdf), [`6d6ea09`](https://github.com/scaleway/ultraviolet/commit/6d6ea09eabd68bebc0300b1002a8308b1f336e3b), [`0bb13d0`](https://github.com/scaleway/ultraviolet/commit/0bb13d0055c5e930d7eb12df0941012afba9a71b), [`81fea2a`](https://github.com/scaleway/ultraviolet/commit/81fea2a34ed7420af0a4cf108fe84f6943778b47)]:
  - @ultraviolet/icons@4.0.3
  - @ultraviolet/ui@2.0.4

## 1.0.3

### Patch Changes

- [#5404](https://github.com/scaleway/ultraviolet/pull/5404) [`35a6123`](https://github.com/scaleway/ultraviolet/commit/35a6123aff795d1dc829cd9ffde83d4a61cafe4d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react` to `19.1.1`.
  Updated dependency `react-dom` to `19.1.1`.

- [#5406](https://github.com/scaleway/ultraviolet/pull/5406) [`330fd6d`](https://github.com/scaleway/ultraviolet/commit/330fd6dbfd053c50e830152358565173b6d63ad0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.9`.
  Updated dependency `@types/react-dom` to `19.1.7`.

- [#5409](https://github.com/scaleway/ultraviolet/pull/5409) [`6044fc2`](https://github.com/scaleway/ultraviolet/commit/6044fc227ad58d9d61b931617d61667026322ac2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.24.2`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.24.2`.
  Updated dependency `@uiw/react-codemirror` to `4.24.2`.

- [#5407](https://github.com/scaleway/ultraviolet/pull/5407) [`8d1201a`](https://github.com/scaleway/ultraviolet/commit/8d1201a338484261ce86dba25046ca1db9752cd9) Thanks [@matthprost](https://github.com/matthprost)! - Add props `labelDescription` on `<Navigation.Item />` to allow more custom elements on items

- Updated dependencies [[`b144d15`](https://github.com/scaleway/ultraviolet/commit/b144d152b50d1f6c7a1eda04c680b9e687db6e11), [`cd3ba5b`](https://github.com/scaleway/ultraviolet/commit/cd3ba5b70ac1678b3a781a3213357acad0fae277), [`35a6123`](https://github.com/scaleway/ultraviolet/commit/35a6123aff795d1dc829cd9ffde83d4a61cafe4d), [`330fd6d`](https://github.com/scaleway/ultraviolet/commit/330fd6dbfd053c50e830152358565173b6d63ad0)]:
  - @ultraviolet/ui@2.0.3
  - @ultraviolet/icons@4.0.2

## 1.0.2

### Patch Changes

- [#5395](https://github.com/scaleway/ultraviolet/pull/5395) [`2772b6e`](https://github.com/scaleway/ultraviolet/commit/2772b6e5d6dd005000cd864295d10b0982eb0485) Thanks [@lisalupi](https://github.com/lisalupi)! - `OfferList`: new prop "selected"

- Updated dependencies [[`35e725f`](https://github.com/scaleway/ultraviolet/commit/35e725fd1f72da4ea67ade2230bafbb4845b356b)]:
  - @ultraviolet/ui@2.0.2

## 1.0.1

### Patch Changes

- [#5303](https://github.com/scaleway/ultraviolet/pull/5303) [`3edf7d5`](https://github.com/scaleway/ultraviolet/commit/3edf7d5395e4a5155853b708637736e370d93ae1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.24.1`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.24.1`.
  Updated dependency `@uiw/react-codemirror` to `4.24.1`.

- [#5359](https://github.com/scaleway/ultraviolet/pull/5359) [`b28f612`](https://github.com/scaleway/ultraviolet/commit/b28f612a171e1e6d0beb63cc0e83211fe8369984) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.28.0`.
  Updated dependency `@babel/eslint-parser` to `7.28.0`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.28.0`.
  Updated dependency `@babel/preset-env` to `7.28.0`.
- Updated dependencies [[`b28f612`](https://github.com/scaleway/ultraviolet/commit/b28f612a171e1e6d0beb63cc0e83211fe8369984), [`e18cc72`](https://github.com/scaleway/ultraviolet/commit/e18cc72310f4ae681da95e4d94bfa39e35c4626b)]:
  - @ultraviolet/icons@4.0.1
  - @ultraviolet/ui@2.0.1

## 1.0.0

### Major Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ `@ultraviolet/ui` is now a peer-dependency of `@ultraviolet/form` and `@ultraviolet/plus`. This means you need to have an installed version of `@ultraviolet/ui` in your project that matches the version defined by the peer-dependency.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Beta release

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `CodeEditor`: prop "title" removed -> use "label" instead
  - `Icon`: prop "color" removed -> use "sentiment" instead
  - `Icon`: prop "size" can only be "xsmall", "small", "medium", "large", "xlarge" or "xxlarge"
  - `Bullet`: prop "text" removed -> use "children" instead

### Minor Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - New component `OrderSummary`

### Patch Changes

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `OrderSummary`: add prop "additionalInfo"

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - New component `InfoTable`

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - New component `<Plans />`

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `EstimateCost`: add `z-index` to overlay

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `InfoTable.Row`: prop "templateColumn" renamed "templateColumns" (typo) to match `Row` prop

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `InfoTable.Cell`: prop "title" is now a ReactNode

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `OrderSummary`: fix size of the UnitInput

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `Navigation`: new prop "itemWrapper" for `Navigation.PinnedItems`. With this prop, it is possible to have a wrapper around each indidividual Pinned element. This can be useful to add a `<NavLink/>` around them, add a tooltip, etc.

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `OrderSummary`: fix empty div when no subcategories (causes misalignment)

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - `Navigation`: isActive should work when the Item is wrapped in a Link/NavLink (React rooter)

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SteppedListCard />` content to fit better

- [#5380](https://github.com/scaleway/ultraviolet/pull/5380) [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7) Thanks [@matthprost](https://github.com/matthprost)! - New component `OfferList`

- Updated dependencies [[`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7), [`7dd79d2`](https://github.com/scaleway/ultraviolet/commit/7dd79d21854986780983094ef0deeabcc58b74b7)]:
  - @ultraviolet/ui@2.0.0
  - @ultraviolet/icons@4.0.0
  - @ultraviolet/themes@2.0.0

## 1.0.0-beta.19

### Patch Changes

- [#5378](https://github.com/scaleway/ultraviolet/pull/5378) [`fa9597a`](https://github.com/scaleway/ultraviolet/commit/fa9597ae4ad1cc8adc9bae485cb98eb2177c8081) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: fix empty div when no subcategories (causes misalignment)

- [#5330](https://github.com/scaleway/ultraviolet/pull/5330) [`f7a5db2`](https://github.com/scaleway/ultraviolet/commit/f7a5db2ea2a90dd4db2dcc7779f8f2fd4a6d77ff) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `OfferList`

- Updated dependencies [[`2169048`](https://github.com/scaleway/ultraviolet/commit/2169048055c37b870c57f2a56ee8a628b36af6c6), [`f791286`](https://github.com/scaleway/ultraviolet/commit/f791286dc4e5dad0f4cbf14c53801d7890e0ee63)]:
  - @ultraviolet/ui@2.0.0-beta.19

## 1.0.0-beta.18

### Patch Changes

- [#5377](https://github.com/scaleway/ultraviolet/pull/5377) [`d5846b5`](https://github.com/scaleway/ultraviolet/commit/d5846b5d63e6f34c673961549e79ed82b6d65221) Thanks [@lisalupi](https://github.com/lisalupi)! - `InfoTable.Cell`: prop "title" is now a ReactNode

- [#5351](https://github.com/scaleway/ultraviolet/pull/5351) [`ea55dea`](https://github.com/scaleway/ultraviolet/commit/ea55dea228d3e634f13e1de358d2738de210e7b2) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: fix size of the UnitInput

- Updated dependencies [[`ec7c55a`](https://github.com/scaleway/ultraviolet/commit/ec7c55a7bdad9e5f49a2b8aaf2aca2e228bb725e), [`f921df0`](https://github.com/scaleway/ultraviolet/commit/f921df0aea3ea46e014311f6008b3d44f95e16cf), [`706bfaa`](https://github.com/scaleway/ultraviolet/commit/706bfaabf558ab751c7dbcd1c3bf5e84dde8f529), [`ea55dea`](https://github.com/scaleway/ultraviolet/commit/ea55dea228d3e634f13e1de358d2738de210e7b2), [`2ddbbf9`](https://github.com/scaleway/ultraviolet/commit/2ddbbf9a785f40cb79a06b6ba1bfb89e5a22cf6b), [`996f5b9`](https://github.com/scaleway/ultraviolet/commit/996f5b98db88ca0ca7c7eac08535697ff36f7365)]:
  - @ultraviolet/ui@2.0.0-beta.18
  - @ultraviolet/icons@4.0.0-beta.9

## 1.0.0-beta.17

### Major Changes

- [#5335](https://github.com/scaleway/ultraviolet/pull/5335) [`40e189c`](https://github.com/scaleway/ultraviolet/commit/40e189cb6af270ea830b9d7faeee20d15817425a) Thanks [@lisalupi](https://github.com/lisalupi)! - **BREAKING CHANGES**

  Deprecated props removed:

  - `CodeEditor`: prop "title" removed -> use "label" instead
  - `Icon`: prop "color" removed -> use "sentiment" instead
  - `Icon`: prop "size" can only be "xsmall", "small", "medium", "large", "xlarge" or "xxlarge"
  - `Bullet`: prop "text" removed -> use "children" instead

### Patch Changes

- [#5325](https://github.com/scaleway/ultraviolet/pull/5325) [`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.7`.

- [#5315](https://github.com/scaleway/ultraviolet/pull/5315) [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/styled` to `11.14.1`.

- Updated dependencies [[`d25d9d8`](https://github.com/scaleway/ultraviolet/commit/d25d9d8c71ffdc922f033daaf4ec6252f8382992), [`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a), [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb), [`c453a01`](https://github.com/scaleway/ultraviolet/commit/c453a01967a64eeec644a2193b145572b6ed1569), [`f95c6d2`](https://github.com/scaleway/ultraviolet/commit/f95c6d2b5e1e4402822dc6c1362ca280d513e1dd), [`40e189c`](https://github.com/scaleway/ultraviolet/commit/40e189cb6af270ea830b9d7faeee20d15817425a), [`f95c6d2`](https://github.com/scaleway/ultraviolet/commit/f95c6d2b5e1e4402822dc6c1362ca280d513e1dd)]:
  - @ultraviolet/ui@2.0.0-beta.17
  - @ultraviolet/icons@4.0.0-beta.8
  - @ultraviolet/themes@2.0.0-beta.3

## 1.0.0-beta.16

### Patch Changes

- Updated dependencies [[`b8fa3f6`](https://github.com/scaleway/ultraviolet/commit/b8fa3f6542b0b99bd2887b07ac4db0487e9371a1)]:
  - @ultraviolet/ui@2.0.0-beta.16

## 1.0.0-beta.15

### Patch Changes

- [#5339](https://github.com/scaleway/ultraviolet/pull/5339) [`ccb7a52`](https://github.com/scaleway/ultraviolet/commit/ccb7a52bbe49a479333f628c99ced3c4c8eac814) Thanks [@lisalupi](https://github.com/lisalupi)! - `InfoTable.Row`: prop "templateColumn" renamed "templateColumns" (typo) to match `Row` prop

- Updated dependencies [[`288eec8`](https://github.com/scaleway/ultraviolet/commit/288eec8554bec97892574f598cf6193331e1fb7a), [`35780ff`](https://github.com/scaleway/ultraviolet/commit/35780fffd11eb7218dfd7d7134f1376758c871ed), [`7ce2d34`](https://github.com/scaleway/ultraviolet/commit/7ce2d34977de7731e873106d5ccdc3dcbca7b92b)]:
  - @ultraviolet/ui@2.0.0-beta.15
  - @ultraviolet/icons@4.0.0-beta.7

## 1.0.0-beta.14

### Patch Changes

- [#5334](https://github.com/scaleway/ultraviolet/pull/5334) [`21907b0`](https://github.com/scaleway/ultraviolet/commit/21907b05bf352b91d6f8a5173a0b21ca2a85bc66) Thanks [@lisalupi](https://github.com/lisalupi)! - `OrderSummary`: add prop "additionalInfo"

- Updated dependencies [[`fe3e1c1`](https://github.com/scaleway/ultraviolet/commit/fe3e1c1aae01dd0af0f6b9f10a5d9dbcb591cc29), [`80e0af3`](https://github.com/scaleway/ultraviolet/commit/80e0af3b006b51bf83e49581d84eab9eb94bc4c7), [`a3f9b52`](https://github.com/scaleway/ultraviolet/commit/a3f9b520dce181d481e8230b271cda7e0b730e86), [`a8108ff`](https://github.com/scaleway/ultraviolet/commit/a8108ff2c2fad133172d30db5aa3dcb0e9e42e17)]:
  - @ultraviolet/ui@2.0.0-beta.14

## 1.0.0-beta.13

### Patch Changes

- [#5280](https://github.com/scaleway/ultraviolet/pull/5280) [`514f8da`](https://github.com/scaleway/ultraviolet/commit/514f8da49e825e3b2f945be808766ee31e671272) Thanks [@lisalupi](https://github.com/lisalupi)! - `Navigation`: new prop "itemWrapper" for `Navigation.PinnedItems`. With this prop, it is possible to have a wrapper around each indidividual Pinned element. This can be useful to add a `<NavLink/>` around them, add a tooltip, etc.

- Updated dependencies [[`bcb7243`](https://github.com/scaleway/ultraviolet/commit/bcb7243c8d2c6112bcc1353d052ba230323c3f34), [`99eb24a`](https://github.com/scaleway/ultraviolet/commit/99eb24a498e1ac2c270272fa771f0eaa1b2d4fea), [`b3873c7`](https://github.com/scaleway/ultraviolet/commit/b3873c7a0f9e77ed9b075735e0e444c1d33d21b3), [`dac6d07`](https://github.com/scaleway/ultraviolet/commit/dac6d07a5823b6ae12b98ee9c656fab7105ccfe7), [`e3570d8`](https://github.com/scaleway/ultraviolet/commit/e3570d88c8f66e89c532f545c727eccd06d5664c), [`fac72c0`](https://github.com/scaleway/ultraviolet/commit/fac72c03508fe71cb020837975b14e5dabccbfe2)]:
  - @ultraviolet/ui@2.0.0-beta.13

## 1.0.0-beta.12

### Patch Changes

- Updated dependencies [[`52e9bf4`](https://github.com/scaleway/ultraviolet/commit/52e9bf49d5c17e0e64bf88eaf12e5815eb304e94), [`a0398de`](https://github.com/scaleway/ultraviolet/commit/a0398debe9d06372fb8888755673fec10ee93f34), [`a2ac9c4`](https://github.com/scaleway/ultraviolet/commit/a2ac9c492f673c5395dabfd6d97fd3051e58d6ec)]:
  - @ultraviolet/ui@2.0.0-beta.12
  - @ultraviolet/icons@4.0.0-beta.6

## 1.0.0-beta.11

### Minor Changes

- [#5281](https://github.com/scaleway/ultraviolet/pull/5281) [`631550b`](https://github.com/scaleway/ultraviolet/commit/631550bc8c76d37ec28d31d1207389748030470e) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - New component `OrderSummary`

### Patch Changes

- [#5281](https://github.com/scaleway/ultraviolet/pull/5281) [`c84f04c`](https://github.com/scaleway/ultraviolet/commit/c84f04c3c7d3685a3e956cc14a3357efaa909088) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - New component `InfoTable`

- [#5281](https://github.com/scaleway/ultraviolet/pull/5281) [`9097041`](https://github.com/scaleway/ultraviolet/commit/909704133bb67e42bf118b8845ed900b35be0a3e) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - `EstimateCost`: add `z-index` to overlay

- [#5242](https://github.com/scaleway/ultraviolet/pull/5242) [`1ff37f7`](https://github.com/scaleway/ultraviolet/commit/1ff37f7e70e92db710bd2194b87b01218ae7abb1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.13`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.13`.
  Updated dependency `@uiw/react-codemirror` to `4.23.13`.

- [`f762e28`](https://github.com/scaleway/ultraviolet/commit/f762e28d09a0e2297903d8eef760cd9f53d8ae89) Thanks [@lisalupi](https://github.com/lisalupi)! - `Navigation`: isActive should work when the Item is wrapped in a Link/NavLink (React rooter)

- Updated dependencies [[`5870ea6`](https://github.com/scaleway/ultraviolet/commit/5870ea62864ba881ffc888a924bcf731387636ba), [`b03ed1b`](https://github.com/scaleway/ultraviolet/commit/b03ed1b50e7807eb72f8ae392bcd34f42772ca02), [`1275792`](https://github.com/scaleway/ultraviolet/commit/12757925af5c4fd08b857f165027b1cd6dee8b08), [`f41150e`](https://github.com/scaleway/ultraviolet/commit/f41150ebb2d97a95c074080f3db8fcd91c2b5d93), [`40d4066`](https://github.com/scaleway/ultraviolet/commit/40d40662d7305712b0ca23d08759b37590a677a0), [`80d5c50`](https://github.com/scaleway/ultraviolet/commit/80d5c50e294efdc5fe714a55ef985ff142c07b6e)]:
  - @ultraviolet/ui@2.0.0-beta.11

## 1.0.0-beta.10

### Patch Changes

- Updated dependencies [[`0040779`](https://github.com/scaleway/ultraviolet/commit/00407792bf0cd64eee0c02db107f3c43d42fa1a4)]:
  - @ultraviolet/ui@2.0.0-beta.10

## 1.0.0-beta.9

### Patch Changes

- [`e1646b0`](https://github.com/scaleway/ultraviolet/commit/e1646b082c7cd3d034c323c0876995376aaa274d) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `<Plans />`

- Updated dependencies [[`b4279e4`](https://github.com/scaleway/ultraviolet/commit/b4279e441718dfc00ecfe271c9744d51f2dcacf9), [`0cf10d4`](https://github.com/scaleway/ultraviolet/commit/0cf10d4b48b8a09992b0e8b92552b2d26357b173), [`edc91f5`](https://github.com/scaleway/ultraviolet/commit/edc91f508667d221d616616f782a79579a516156), [`0608206`](https://github.com/scaleway/ultraviolet/commit/0608206affcae3630ef6d373ca260c43f30fd036)]:
  - @ultraviolet/ui@2.0.0-beta.9

## 1.0.0-beta.8

### Patch Changes

- Updated dependencies [[`f8df4dd`](https://github.com/scaleway/ultraviolet/commit/f8df4ddce45073537a4ae9a334030d472b9f0d96)]:
  - @ultraviolet/icons@4.0.0-beta.5
  - @ultraviolet/ui@2.0.0-beta.8

## 1.0.0-beta.7

### Patch Changes

- Updated dependencies [[`15fd34a`](https://github.com/scaleway/ultraviolet/commit/15fd34ad677dfaf551a4e6884ca9ecee18280654), [`cfe5bbe`](https://github.com/scaleway/ultraviolet/commit/cfe5bbed94318b75a6643cd8fb11b761f7aa3e48), [`08e0353`](https://github.com/scaleway/ultraviolet/commit/08e03530fcd28a1c478fda9ddca41a63d5124581)]:
  - @ultraviolet/icons@4.0.0-beta.4
  - @ultraviolet/ui@2.0.0-beta.7

## 1.0.0-beta.6

### Patch Changes

- Updated dependencies [[`5d0a970`](https://github.com/scaleway/ultraviolet/commit/5d0a9702142eb4de78f4511e38004b60e2264634)]:
  - @ultraviolet/ui@2.0.0-beta.6

## 1.0.0-beta.5

### Patch Changes

- Updated dependencies [[`bb47261`](https://github.com/scaleway/ultraviolet/commit/bb472611b711cb3988c186d6d384c29f3c9037e2), [`be22eef`](https://github.com/scaleway/ultraviolet/commit/be22eef5335a4a6b96378547b70053a086476107), [`cc10503`](https://github.com/scaleway/ultraviolet/commit/cc1050379db613d13c921a3af172128aa4cf225b), [`53fcf41`](https://github.com/scaleway/ultraviolet/commit/53fcf415f169f61b4593f72fdacd7de3ebbd9387), [`6b0565d`](https://github.com/scaleway/ultraviolet/commit/6b0565d2991db0510067d91b2140274dcde2ea21), [`6752ec1`](https://github.com/scaleway/ultraviolet/commit/6752ec1b60483e1f882bb6448a82dce62a03a0a7), [`c5b82c2`](https://github.com/scaleway/ultraviolet/commit/c5b82c2674ba8189ee4432178b358f1a4ee05b02)]:
  - @ultraviolet/ui@2.0.0-beta.5
  - @ultraviolet/themes@2.0.0-beta.2
  - @ultraviolet/icons@4.0.0-beta.3

## 1.0.0-beta.4

### Patch Changes

- Updated dependencies [[`b1c9952`](https://github.com/scaleway/ultraviolet/commit/b1c99521313cf8c2a2b3f58090a577084060ed56)]:
  - @ultraviolet/ui@2.0.0-beta.4

## 1.0.0-beta.3

### Patch Changes

- Updated dependencies [[`855a68c`](https://github.com/scaleway/ultraviolet/commit/855a68cc2740225d56f7f326338d6b6b482f804b), [`fd88786`](https://github.com/scaleway/ultraviolet/commit/fd887868e66208f5d3ab6de2e25df9ed7518eec7), [`da3e7f7`](https://github.com/scaleway/ultraviolet/commit/da3e7f7c41ce6bad2c0dcd9a05693cee587f2ef3), [`855a68c`](https://github.com/scaleway/ultraviolet/commit/855a68cc2740225d56f7f326338d6b6b482f804b), [`ae4ca59`](https://github.com/scaleway/ultraviolet/commit/ae4ca592099b440cdedfafdb1c5a2ea0540d97f8), [`421d104`](https://github.com/scaleway/ultraviolet/commit/421d104ae17d8c805d981ed214417916f73d561c)]:
  - @ultraviolet/ui@2.0.0-beta.3
  - @ultraviolet/icons@4.0.0-beta.2
  - @ultraviolet/themes@2.0.0-beta.1

## 1.0.0-beta.2

### Patch Changes

- [`82626eb`](https://github.com/scaleway/ultraviolet/commit/82626ebab42dbaeaf26dbefe145d7ef11483c2fe) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SteppedListCard />` content to fit better

- Updated dependencies [[`f9dc10c`](https://github.com/scaleway/ultraviolet/commit/f9dc10cbe3ea826e4d6f682fbd5567ff0463f75b)]:
  - @ultraviolet/ui@2.0.0-beta.2

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies [[`1464f54`](https://github.com/scaleway/ultraviolet/commit/1464f54cb9099b6daa51b254cc935f36147004d0), [`4308966`](https://github.com/scaleway/ultraviolet/commit/4308966450c594969417d3740d984099463e7da8)]:
  - @ultraviolet/icons@4.0.0-beta.1
  - @ultraviolet/ui@2.0.0-beta.1

## 1.0.0-beta.0

### Major Changes

- [#5126](https://github.com/scaleway/ultraviolet/pull/5126) [`17da30c`](https://github.com/scaleway/ultraviolet/commit/17da30c133f624964daff6398e481568bd6da446) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ `@ultraviolet/ui` is now a peer-dependency of `@ultraviolet/form` and `@ultraviolet/plus`. This means you need to have an installed version of `@ultraviolet/ui` in your project that matches the version defined by the peer-dependency.

- [#5112](https://github.com/scaleway/ultraviolet/pull/5112) [`37a7d63`](https://github.com/scaleway/ultraviolet/commit/37a7d632cd1e61d7615e5356fc179ec08f3bec09) Thanks [@matthprost](https://github.com/matthprost)! - Beta release

### Patch Changes

- Updated dependencies [[`37a7d63`](https://github.com/scaleway/ultraviolet/commit/37a7d632cd1e61d7615e5356fc179ec08f3bec09), [`a928589`](https://github.com/scaleway/ultraviolet/commit/a9285896d638e34eba9bb25c55c38de2aef4e210), [`865c160`](https://github.com/scaleway/ultraviolet/commit/865c160aee2db5bd5e7b357e9693a45a17ef4284)]:
  - @ultraviolet/themes@2.0.0-beta.0
  - @ultraviolet/ui@2.0.0-beta.0
  - @ultraviolet/icons@4.0.0-beta.0
    ## 0.28.13

### Patch Changes

- Updated dependencies [[`4a91262`](https://github.com/scaleway/ultraviolet/commit/4a912623fed44b3a20ed9d1dd8f057a9eb371894), [`ad1d4f5`](https://github.com/scaleway/ultraviolet/commit/ad1d4f5dce14977841e4dd617da45e18d2fe39ae)]:
  - @ultraviolet/ui@1.95.14

## 0.28.12

### Patch Changes

- [#5325](https://github.com/scaleway/ultraviolet/pull/5325) [`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.7`.

- [#5315](https://github.com/scaleway/ultraviolet/pull/5315) [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/styled` to `11.14.1`.

- Updated dependencies [[`faaccb7`](https://github.com/scaleway/ultraviolet/commit/faaccb764e48cc9d517c0da1212a9ba77eec3d7a), [`029f2bc`](https://github.com/scaleway/ultraviolet/commit/029f2bcc6fb11d24ea2c46cd0a3f5546cffa30fb), [`c453a01`](https://github.com/scaleway/ultraviolet/commit/c453a01967a64eeec644a2193b145572b6ed1569)]:
  - @ultraviolet/icons@3.15.8
  - @ultraviolet/ui@1.95.13

## 0.28.11

### Patch Changes

- [#5242](https://github.com/scaleway/ultraviolet/pull/5242) [`1ff37f7`](https://github.com/scaleway/ultraviolet/commit/1ff37f7e70e92db710bd2194b87b01218ae7abb1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.13`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.13`.
  Updated dependency `@uiw/react-codemirror` to `4.23.13`.
- Updated dependencies [[`40d4066`](https://github.com/scaleway/ultraviolet/commit/40d40662d7305712b0ca23d08759b37590a677a0), [`80d5c50`](https://github.com/scaleway/ultraviolet/commit/80d5c50e294efdc5fe714a55ef985ff142c07b6e)]:
  - @ultraviolet/ui@1.95.12

## 0.28.10

### Patch Changes

- [#5202](https://github.com/scaleway/ultraviolet/pull/5202) [`b3ca3ca`](https://github.com/scaleway/ultraviolet/commit/b3ca3ca957c2cec8c51f5717e597326fd17f9cb0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.4`.
  Updated dependency `@babel/runtime` to `7.27.6`.
  Updated dependency `@babel/eslint-parser` to `7.27.5`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.27.4`.

- [#5258](https://github.com/scaleway/ultraviolet/pull/5258) [`eec2dfa`](https://github.com/scaleway/ultraviolet/commit/eec2dfa2ea6b98c83ab154ae6b06ff3acc6bbc76) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.8`.

- Updated dependencies [[`b3ca3ca`](https://github.com/scaleway/ultraviolet/commit/b3ca3ca957c2cec8c51f5717e597326fd17f9cb0), [`eec2dfa`](https://github.com/scaleway/ultraviolet/commit/eec2dfa2ea6b98c83ab154ae6b06ff3acc6bbc76)]:
  - @ultraviolet/icons@3.15.7
  - @ultraviolet/ui@1.95.11

## 0.28.9

### Patch Changes

- [#5195](https://github.com/scaleway/ultraviolet/pull/5195) [`e9822bf`](https://github.com/scaleway/ultraviolet/commit/e9822bfad330bb6dc368e756bbc03265fc00f330) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.6`.
  Updated dependency `@types/react-dom` to `19.1.6`.
- Updated dependencies [[`7015837`](https://github.com/scaleway/ultraviolet/commit/7015837cedb57acd891485521cf4406261d3fd14), [`e9822bf`](https://github.com/scaleway/ultraviolet/commit/e9822bfad330bb6dc368e756bbc03265fc00f330)]:
  - @ultraviolet/ui@1.95.10
  - @ultraviolet/icons@3.15.6

## 0.28.8

### Patch Changes

- Updated dependencies [[`90d89a2`](https://github.com/scaleway/ultraviolet/commit/90d89a29e8f2115d875e2f1497aaca6a33bde792), [`67fd741`](https://github.com/scaleway/ultraviolet/commit/67fd741ae39739275ffa3ff314c38a205857175b)]:
  - @ultraviolet/ui@1.95.9

## 0.28.7

### Patch Changes

- Updated dependencies [[`be22eef`](https://github.com/scaleway/ultraviolet/commit/be22eef5335a4a6b96378547b70053a086476107)]:
  - @ultraviolet/ui@1.95.8

## 0.28.6

### Patch Changes

- [#5173](https://github.com/scaleway/ultraviolet/pull/5173) [`bfaed8d`](https://github.com/scaleway/ultraviolet/commit/bfaed8dfeb9358780a96520f1ecbb82b4397e2c0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.5`.

- Updated dependencies [[`11d7478`](https://github.com/scaleway/ultraviolet/commit/11d7478f0ebff3944e0b69ccca4878c6aadb1235), [`bfaed8d`](https://github.com/scaleway/ultraviolet/commit/bfaed8dfeb9358780a96520f1ecbb82b4397e2c0), [`b411a4a`](https://github.com/scaleway/ultraviolet/commit/b411a4a337848d964f10eab8a597fa73a05f4526)]:
  - @ultraviolet/ui@1.95.7
  - @ultraviolet/icons@3.15.5

## 0.28.5

### Patch Changes

- [#5159](https://github.com/scaleway/ultraviolet/pull/5159) [`530f7b4`](https://github.com/scaleway/ultraviolet/commit/530f7b47b46ffb2d3d472dda535972b8507a142e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.4`.
  Updated dependency `@types/react-dom` to `19.1.5`.
- Updated dependencies [[`6c8f8af`](https://github.com/scaleway/ultraviolet/commit/6c8f8af8d22cca8162121c95bd350bbb98d4d2c6), [`7562afb`](https://github.com/scaleway/ultraviolet/commit/7562afbc31dda6282cb1735892fec2205218cc3a), [`530f7b4`](https://github.com/scaleway/ultraviolet/commit/530f7b47b46ffb2d3d472dda535972b8507a142e), [`69d26f1`](https://github.com/scaleway/ultraviolet/commit/69d26f10f3614c594690ef2f78aa2e2ef3925227)]:
  - @ultraviolet/ui@1.95.6
  - @ultraviolet/icons@3.15.4

## 0.28.4

### Patch Changes

- [#5118](https://github.com/scaleway/ultraviolet/pull/5118) [`ae591aa`](https://github.com/scaleway/ultraviolet/commit/ae591aae37100cc944443a7eb0949f8762a1e82a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.27.1`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.27.1`.
  Updated dependency `@babel/preset-env` to `7.27.1`.
  Updated dependency `@babel/preset-react` to `7.27.1`.

- [#5066](https://github.com/scaleway/ultraviolet/pull/5066) [`2994649`](https://github.com/scaleway/ultraviolet/commit/299464918c93def07bd958ab4a4025b802382a3b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.12`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.12`.
  Updated dependency `@uiw/react-codemirror` to `4.23.12`.

- [#4971](https://github.com/scaleway/ultraviolet/pull/4971) [`89cbdcc`](https://github.com/scaleway/ultraviolet/commit/89cbdccf524e4248b74993389bc99f0b24df058c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.1.2`.
  Updated dependency `@types/react-dom` to `19.1.3`.
  Updated dependency `react` to `19.1.0`.
  Updated dependency `react-dom` to `19.1.0`.
- Updated dependencies [[`ae591aa`](https://github.com/scaleway/ultraviolet/commit/ae591aae37100cc944443a7eb0949f8762a1e82a), [`89cbdcc`](https://github.com/scaleway/ultraviolet/commit/89cbdccf524e4248b74993389bc99f0b24df058c), [`bf9d70b`](https://github.com/scaleway/ultraviolet/commit/bf9d70b72ee22724fd8abafb81264c6ecb87d587)]:
  - @ultraviolet/icons@3.15.3
  - @ultraviolet/ui@1.95.5

## 0.28.3

### Patch Changes

- Updated dependencies [[`d8b7d1d`](https://github.com/scaleway/ultraviolet/commit/d8b7d1dcb14cf6601d9ab5dbbe9604c03e676358)]:
  - @ultraviolet/icons@3.15.2
  - @ultraviolet/ui@1.95.4

## 0.28.2

### Patch Changes

- Updated dependencies [[`06a1acd`](https://github.com/scaleway/ultraviolet/commit/06a1acd30dcacd10d84dd07d48c8f41b9098f098)]:
  - @ultraviolet/icons@3.15.1
  - @ultraviolet/ui@1.95.3

## 0.28.1

### Patch Changes

- Updated dependencies [[`e12eb18`](https://github.com/scaleway/ultraviolet/commit/e12eb18c1c130fc1a3da39bd7acbbba8d3fe0872)]:
  - @ultraviolet/ui@1.95.2

## 0.28.0

### Minor Changes

- [#5100](https://github.com/scaleway/ultraviolet/pull/5100) [`314b5c6`](https://github.com/scaleway/ultraviolet/commit/314b5c61bc76cb660432c79c83e01171a0441f69) Thanks [@matthprost](https://github.com/matthprost)! - ⚠️ BREAKING CHANGES:

  `Navigation.Item`: change in the types and deprecated category icon props:

  - `categoryIcon`: type switch from union type to react node to allow you adding your own category icon.

  ```tsx
  // Before
  <Navigation.Item categoryIcon="useCase" />;

  // After
  import { UseCaseCategoryIcon } from "@ultraviolet/icons/category";

  <Navigation.Item categoryIcon={<UseCaseCategoryIcon />} />;
  ```

  - `categoryIconVariant`: has been removed. Use the variant of the icon component itself.

  ```tsx
  // Before
  <Navigation.Item categoryIcon="useCase" categoryIconVariant="neutral" />;

  // After
  import { UseCaseCategoryIcon } from "@ultraviolet/icons/category";

  <Navigation.Item categoryIcon={<UseCaseCategoryIcon variant="neutral" />} />;
  ```

### Patch Changes

- [#4919](https://github.com/scaleway/ultraviolet/pull/4919) [`b062798`](https://github.com/scaleway/ultraviolet/commit/b06279807f3751351e3aa4a6dbe52be613954d5c) Thanks [@lisalupi](https://github.com/lisalupi)! - `<CodeEditor />`:
  - Rename prop `title` to `label` and change style
  - New prop `helper`
  - New prop `disabled`
  - New prop `copyButton`
  - Update component style to match ultraviolet theme (the component always uses Dark Theme colors)
- Updated dependencies [[`302eadc`](https://github.com/scaleway/ultraviolet/commit/302eadca152c594170a843070d48a6482afcb9e0)]:
  - @ultraviolet/ui@1.95.1

## 0.27.3

### Patch Changes

- [#5084](https://github.com/scaleway/ultraviolet/pull/5084) [`6af6249`](https://github.com/scaleway/ultraviolet/commit/6af6249593e0ca8d62fe8cf03c9cf8cc8a9e7f25) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` not to register an item if there is no pinned feature

- Updated dependencies [[`31829f4`](https://github.com/scaleway/ultraviolet/commit/31829f4b7e83f52a1df700059799d150c6739c3e), [`5705e3c`](https://github.com/scaleway/ultraviolet/commit/5705e3c02e7915b1c4c812426e2676ce34e38696), [`fa7dee1`](https://github.com/scaleway/ultraviolet/commit/fa7dee12f32431c277559741d13275d51c79e151)]:
  - @ultraviolet/ui@1.95.0

## 0.27.2

### Patch Changes

- [#5074](https://github.com/scaleway/ultraviolet/pull/5074) [`57a38d2`](https://github.com/scaleway/ultraviolet/commit/57a38d2ad2babf6117e9ca5ff62ec04e604e3cf5) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<EstimateCost.Unit />` to have correct amount updated according to the item

## 0.27.1

### Patch Changes

- Updated dependencies [[`c7d0d85`](https://github.com/scaleway/ultraviolet/commit/c7d0d8578bfa92ac563c7dd39e2c9cedae095aab)]:
  - @ultraviolet/ui@1.94.2

## 0.27.0

### Minor Changes

- [#5030](https://github.com/scaleway/ultraviolet/pull/5030) [`aa6f519`](https://github.com/scaleway/ultraviolet/commit/aa6f5190170c7b5bc233811d35fc09c21f93d0cc) Thanks [@matthprost](https://github.com/matthprost)! - New prop `autoCompletion` on `<CodeEditor />` component

### Patch Changes

- [#5053](https://github.com/scaleway/ultraviolet/pull/5053) [`2a9c1b4`](https://github.com/scaleway/ultraviolet/commit/2a9c1b4c76d54da411f69126e86fa7ee2fe8c8a2) Thanks [@matthprost](https://github.com/matthprost)! - Fix `PascalToCamelCaseWithoutSuffix` type utility to simplify the usage

- [#5049](https://github.com/scaleway/ultraviolet/pull/5049) [`1407666`](https://github.com/scaleway/ultraviolet/commit/14076667dd174a1cb3125d65cb849d735accbd5e) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ContentCard />` to align center the title when there is no description, children of subtitle

- Updated dependencies [[`2a9c1b4`](https://github.com/scaleway/ultraviolet/commit/2a9c1b4c76d54da411f69126e86fa7ee2fe8c8a2), [`2eee369`](https://github.com/scaleway/ultraviolet/commit/2eee369ed7191ab5f82dac27b28e0e339b816464), [`2a9c1b4`](https://github.com/scaleway/ultraviolet/commit/2a9c1b4c76d54da411f69126e86fa7ee2fe8c8a2), [`2a9c1b4`](https://github.com/scaleway/ultraviolet/commit/2a9c1b4c76d54da411f69126e86fa7ee2fe8c8a2)]:
  - @ultraviolet/ui@1.94.1
  - @ultraviolet/icons@3.15.0

## 0.26.1

### Patch Changes

- [#5055](https://github.com/scaleway/ultraviolet/pull/5055) [`b6c456d`](https://github.com/scaleway/ultraviolet/commit/b6c456d756141e4befdd87667eaddaf0cc1e248e) Thanks [@matthprost](https://github.com/matthprost)! - Fix `PascalToCamelCaseWithoutSuffix` type utility to simplify the usage

- [#4988](https://github.com/scaleway/ultraviolet/pull/4988) [`ef6e926`](https://github.com/scaleway/ultraviolet/commit/ef6e9267be8eb6ef8a16e52b7b224b83a248595f) Thanks [@matthprost](https://github.com/matthprost)! - Improve `<Navigation />` performance not to render all sub items that are expandable

- Updated dependencies [[`f1bb63d`](https://github.com/scaleway/ultraviolet/commit/f1bb63d9c4966f5cbeabbe1b0457beaabded62e1), [`1f21803`](https://github.com/scaleway/ultraviolet/commit/1f2180317917e6cab7603361da9956ffc42b000d), [`0ca192f`](https://github.com/scaleway/ultraviolet/commit/0ca192f994641abf9c19f6b3b81cdb60e15b952e), [`c1a0104`](https://github.com/scaleway/ultraviolet/commit/c1a0104c37fcf0b8be8cd9020e611dd71a18a449), [`9cf64a6`](https://github.com/scaleway/ultraviolet/commit/9cf64a6af130ff1a9e93d058e230542191ee9303), [`ef6e926`](https://github.com/scaleway/ultraviolet/commit/ef6e9267be8eb6ef8a16e52b7b224b83a248595f), [`f989f99`](https://github.com/scaleway/ultraviolet/commit/f989f995442f9746892bb356ec7aa12166a2c6bf)]:
  - @ultraviolet/ui@1.94.0
  - @ultraviolet/icons@3.14.0

## 0.26.0

### Minor Changes

- [#5011](https://github.com/scaleway/ultraviolet/pull/5011) [`93c306f`](https://github.com/scaleway/ultraviolet/commit/93c306f0c29b24fcd8ce27556af1d606bd14dbcd) Thanks [@matthprost](https://github.com/matthprost)! - Integration of `"use client"` on all components

### Patch Changes

- Updated dependencies [[`93c306f`](https://github.com/scaleway/ultraviolet/commit/93c306f0c29b24fcd8ce27556af1d606bd14dbcd), [`cf94d68`](https://github.com/scaleway/ultraviolet/commit/cf94d68e806a352c5cba80e5c5ca53f6b9525c11)]:
  - @ultraviolet/icons@3.13.0
  - @ultraviolet/ui@1.93.0

## 0.25.9

### Patch Changes

- Updated dependencies [[`96685a2`](https://github.com/scaleway/ultraviolet/commit/96685a24c9406f331c83d3611ea1ec240537b337), [`d78387c`](https://github.com/scaleway/ultraviolet/commit/d78387cc7470a2099ca4783cc365cde6f9a65906)]:
  - @ultraviolet/ui@1.92.6

## 0.25.8

### Patch Changes

- Updated dependencies [[`16c02b9`](https://github.com/scaleway/ultraviolet/commit/16c02b9c52660b3ad6841af5f9ef7b41c7374bcd), [`8a7e507`](https://github.com/scaleway/ultraviolet/commit/8a7e507a2ee57c648318149b4273caf2c60cdd3e), [`b388aff`](https://github.com/scaleway/ultraviolet/commit/b388affcc6519920be33776f0e6d98fa304c7e8a)]:
  - @ultraviolet/ui@1.92.5

## 0.25.7

### Patch Changes

- Updated dependencies [[`b9ebc2a`](https://github.com/scaleway/ultraviolet/commit/b9ebc2ac2595618d9524001efb4d8e0493f86a69), [`3b9a151`](https://github.com/scaleway/ultraviolet/commit/3b9a151d514928c2b52ed91ee4dcfc6d2c2ade01), [`58657d8`](https://github.com/scaleway/ultraviolet/commit/58657d800433f7ae36dbd9cd44f19f63cd93cb75)]:
  - @ultraviolet/ui@1.92.4
  - @ultraviolet/themes@1.17.0
  - @ultraviolet/icons@3.12.5

## 0.25.6

### Patch Changes

- Updated dependencies [[`453efd8`](https://github.com/scaleway/ultraviolet/commit/453efd8095fae0c2a91baf5cd2ce4c6bc8596360)]:
  - @ultraviolet/ui@1.92.3

## 0.25.5

### Patch Changes

- Updated dependencies [[`865dd71`](https://github.com/scaleway/ultraviolet/commit/865dd710d3cf1243455f6d55cc8a8f54aaa54b95), [`f81674d`](https://github.com/scaleway/ultraviolet/commit/f81674ddb14403dadd208023cced359191519bdf), [`1252790`](https://github.com/scaleway/ultraviolet/commit/125279049c1bcbf5e6de9ee00f742b9a845d5e6a), [`ec95d1d`](https://github.com/scaleway/ultraviolet/commit/ec95d1d0c46a871fbf5d2dd066492e02bc91cc05)]:
  - @ultraviolet/ui@1.92.2
  - @ultraviolet/icons@3.12.4

## 0.25.4

### Patch Changes

- [#4960](https://github.com/scaleway/ultraviolet/pull/4960) [`b5ce46c`](https://github.com/scaleway/ultraviolet/commit/b5ce46caecff90dfd52722b129dc5fe4db76c30a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` wrong alignement on pinned items

- Updated dependencies [[`917948a`](https://github.com/scaleway/ultraviolet/commit/917948ab383fd3dd894be500eed3310c354252cc)]:
  - @ultraviolet/icons@3.12.3
  - @ultraviolet/ui@1.92.1

## 0.25.3

### Patch Changes

- [#4935](https://github.com/scaleway/ultraviolet/pull/4935) [`09911bd`](https://github.com/scaleway/ultraviolet/commit/09911bd06bb77ea266e20254fbeddc39eac2ceb0) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Navigation />` : change alignement of cateogry icon to be at the top instead of vertically centered

- Updated dependencies [[`dcdf00f`](https://github.com/scaleway/ultraviolet/commit/dcdf00f20cda1aa2bda9907dbeaf9009b48c47ab), [`2cdbba8`](https://github.com/scaleway/ultraviolet/commit/2cdbba8a821856c3a16f9170b35d6d400b527c91), [`5448fec`](https://github.com/scaleway/ultraviolet/commit/5448fec85cbb289cf0d8227556dbf572727652b7)]:
  - @ultraviolet/ui@1.92.0

## 0.25.2

### Patch Changes

- [#4930](https://github.com/scaleway/ultraviolet/pull/4930) [`d0a2c76`](https://github.com/scaleway/ultraviolet/commit/d0a2c767f9600328b1113730f0ab12f2e4f17c1d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.12`.

- [#4896](https://github.com/scaleway/ultraviolet/pull/4896) [`e3702b4`](https://github.com/scaleway/ultraviolet/commit/e3702b4186517a94f1900f516105fe9837b1ff34) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.10`.
  Updated dependency `@babel/eslint-parser` to `7.26.10`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.26.10`.

- [#4893](https://github.com/scaleway/ultraviolet/pull/4893) [`c1213bb`](https://github.com/scaleway/ultraviolet/commit/c1213bb889e35debe6cdd2ac09399e8ba9700a8e) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation.Item />` not to spread `hasParent` in the DOM and use a provider instead

- Updated dependencies [[`d0a2c76`](https://github.com/scaleway/ultraviolet/commit/d0a2c767f9600328b1113730f0ab12f2e4f17c1d), [`e3702b4`](https://github.com/scaleway/ultraviolet/commit/e3702b4186517a94f1900f516105fe9837b1ff34), [`747a788`](https://github.com/scaleway/ultraviolet/commit/747a788f6767814b0fde4e2f51becece9a11bb86), [`ba74625`](https://github.com/scaleway/ultraviolet/commit/ba74625349f2bf2196784a3e9b2a71ab9663ce2c), [`4840a0d`](https://github.com/scaleway/ultraviolet/commit/4840a0dc8ec320560fddd4a1e117bb124e2365d1)]:
  - @ultraviolet/icons@3.12.2
  - @ultraviolet/ui@1.91.0

## 0.25.1

### Patch Changes

- Updated dependencies [[`d841d65`](https://github.com/scaleway/ultraviolet/commit/d841d65cb3096b6afda5abf72b344094bb8d966f)]:
  - @ultraviolet/ui@1.90.4

## 0.25.0

### Minor Changes

- [#4847](https://github.com/scaleway/ultraviolet/pull/4847) [`781be4f`](https://github.com/scaleway/ultraviolet/commit/781be4fe9c6dcf3ce86272eca4be5a009baf7ced) Thanks [@lisalupi](https://github.com/lisalupi)! - - **Breaking change**: `<SteppedListContainer />` is now `<SteppedListCard />`
  - Propagate prop `completed` to `SteppedListCard.Step` to choose pre-completed steps

### Patch Changes

- [#4906](https://github.com/scaleway/ultraviolet/pull/4906) [`196f910`](https://github.com/scaleway/ultraviolet/commit/196f910e2ef6de11104cf2064554b6c39ecde067) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.16.0`.

- Updated dependencies [[`64ae35b`](https://github.com/scaleway/ultraviolet/commit/64ae35b678e3b2ddc67f9bd467d6f71c53e441c2)]:
  - @ultraviolet/icons@3.12.1
  - @ultraviolet/ui@1.90.3

## 0.24.11

### Patch Changes

- Updated dependencies [[`c4cf56d`](https://github.com/scaleway/ultraviolet/commit/c4cf56d39c2cac7de0eb2cb05df2f7cc7bee668b), [`713518d`](https://github.com/scaleway/ultraviolet/commit/713518d8b46bc38191428fafa9e8a25dc50dfd86)]:
  - @ultraviolet/ui@1.90.2

## 0.24.10

### Patch Changes

- Updated dependencies [[`ea9dce1`](https://github.com/scaleway/ultraviolet/commit/ea9dce18d980a958799bd95555be6a0cbd9d1dd5), [`1cd3b16`](https://github.com/scaleway/ultraviolet/commit/1cd3b16c80fad09a2eafe71a0373716efb71f03d)]:
  - @ultraviolet/ui@1.90.1

## 0.24.9

### Patch Changes

- Updated dependencies [[`52d584a`](https://github.com/scaleway/ultraviolet/commit/52d584aacd99a2948456b363032c06e766a3291d), [`655ee66`](https://github.com/scaleway/ultraviolet/commit/655ee6604201e5e4cac4f7214a106080cb03daf1), [`284ec89`](https://github.com/scaleway/ultraviolet/commit/284ec896df9712f53cf6565db571568e5a935e05)]:
  - @ultraviolet/ui@1.90.0

## 0.24.8

### Patch Changes

- Updated dependencies [[`22e118b`](https://github.com/scaleway/ultraviolet/commit/22e118ba34cd044ed2933548cb8af64b68048ec8), [`a96f772`](https://github.com/scaleway/ultraviolet/commit/a96f77290ded98cbc11581ecb893d8c0e387ac3c)]:
  - @ultraviolet/ui@1.89.2

## 0.24.7

### Patch Changes

- [#4853](https://github.com/scaleway/ultraviolet/pull/4853) [`407ed61`](https://github.com/scaleway/ultraviolet/commit/407ed6168f9633f936c0e123d05b0dde15ecd00a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.10`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.10`.
  Updated dependency `@uiw/react-codemirror` to `4.23.10`.
- Updated dependencies [[`c8f5887`](https://github.com/scaleway/ultraviolet/commit/c8f58872d928a6fb804e27bc42bbadafe72e325c)]:
  - @ultraviolet/ui@1.89.1

## 0.24.6

### Patch Changes

- Updated dependencies [[`0450562`](https://github.com/scaleway/ultraviolet/commit/0450562f96b7e44f4abd2c7869be75aadcb9bf37), [`b160d8f`](https://github.com/scaleway/ultraviolet/commit/b160d8ffb3ada5411c59d696eb63e736e1b47ed9), [`e2b112c`](https://github.com/scaleway/ultraviolet/commit/e2b112c46745e025af3995afbb3256263cf3d199), [`5f72c9d`](https://github.com/scaleway/ultraviolet/commit/5f72c9d93757181173329b096bcb2fdbd0fbfc8b), [`63f9b91`](https://github.com/scaleway/ultraviolet/commit/63f9b911ed8ca47e51fbfd52ab873f7b3badf95d), [`5e2164c`](https://github.com/scaleway/ultraviolet/commit/5e2164c9fe2457b084a7bacff6855c1258bab07f)]:
  - @ultraviolet/ui@1.89.0
  - @ultraviolet/icons@3.12.0

## 0.24.5

### Patch Changes

- [#4810](https://github.com/scaleway/ultraviolet/pull/4810) [`0ff30c2`](https://github.com/scaleway/ultraviolet/commit/0ff30c27283f16e02c2405869fb6c89ef0965e47) Thanks [@matthprost](https://github.com/matthprost)! - Refactor system icons to use a better default size that is not deprecated

- [#4751](https://github.com/scaleway/ultraviolet/pull/4751) [`d2ff54c`](https://github.com/scaleway/ultraviolet/commit/d2ff54cc6a0d3c8d0d6c3366a81d37fbc8e9eabe) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.8`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.8`.
  Updated dependency `@uiw/react-codemirror` to `4.23.8`.

- [#4839](https://github.com/scaleway/ultraviolet/pull/4839) [`d07fe3a`](https://github.com/scaleway/ultraviolet/commit/d07fe3a970e4b1d079a36466523b05c8b14b3569) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<SelectInput />` wrong arrow size

- Updated dependencies [[`0ff30c2`](https://github.com/scaleway/ultraviolet/commit/0ff30c27283f16e02c2405869fb6c89ef0965e47), [`21ca832`](https://github.com/scaleway/ultraviolet/commit/21ca8327995f699842f0ee8dd44edbc9a7a3a188), [`037ec90`](https://github.com/scaleway/ultraviolet/commit/037ec902c96717cc3072a53410dcc51705e5dca4), [`d07fe3a`](https://github.com/scaleway/ultraviolet/commit/d07fe3a970e4b1d079a36466523b05c8b14b3569)]:
  - @ultraviolet/icons@3.11.4
  - @ultraviolet/ui@1.88.1

## 0.24.4

### Patch Changes

- [#4792](https://github.com/scaleway/ultraviolet/pull/4792) [`e650ee6`](https://github.com/scaleway/ultraviolet/commit/e650ee613de68f28a6ba37d00cfb7c1c614699a6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.10`.
  Updated dependency `@types/react-dom` to `19.0.4`.
  Updated dependency `eslint-plugin-react-hooks` to `5.1.0`.

- [#4775](https://github.com/scaleway/ultraviolet/pull/4775) [`f1902a6`](https://github.com/scaleway/ultraviolet/commit/f1902a694b02c22a9a6dba89fde98ca2771c5833) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.9`.
  Updated dependency `@babel/runtime` to `7.26.9`.
  Updated dependency `@babel/eslint-parser` to `7.26.8`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.26.9`.
  Updated dependency `@babel/preset-env` to `7.26.9`.
- Updated dependencies [[`4a0a1fb`](https://github.com/scaleway/ultraviolet/commit/4a0a1fb9bb43864e85cc53ee94690ac02044737f), [`e650ee6`](https://github.com/scaleway/ultraviolet/commit/e650ee613de68f28a6ba37d00cfb7c1c614699a6), [`f1902a6`](https://github.com/scaleway/ultraviolet/commit/f1902a694b02c22a9a6dba89fde98ca2771c5833), [`8273a0f`](https://github.com/scaleway/ultraviolet/commit/8273a0fc3932b7bdd1b99f441a52a5c4ff53d1b4), [`c231fb2`](https://github.com/scaleway/ultraviolet/commit/c231fb29a64c2d0caaa749b8c56c846420d8fc9f)]:
  - @ultraviolet/ui@1.88.0
  - @ultraviolet/icons@3.11.3

## 0.24.3

### Patch Changes

- Updated dependencies [[`8413cad`](https://github.com/scaleway/ultraviolet/commit/8413cad6007aabe702e0c9695784b3e948292c2c), [`d764e76`](https://github.com/scaleway/ultraviolet/commit/d764e76ccfc444dddd8c4a777babd3acdae25435), [`da1c46e`](https://github.com/scaleway/ultraviolet/commit/da1c46ea061a7357a5656438d2b4aa8f28ba6196), [`183b377`](https://github.com/scaleway/ultraviolet/commit/183b377a4e09f4fa0fc8b8dd55c853baee495397)]:
  - @ultraviolet/ui@1.87.3

## 0.24.2

### Patch Changes

- Updated dependencies [[`d6df8b9`](https://github.com/scaleway/ultraviolet/commit/d6df8b9cff3bd0273c202074d5d4c722a0f6817b)]:
  - @ultraviolet/ui@1.87.2

## 0.24.1

### Patch Changes

- [#4779](https://github.com/scaleway/ultraviolet/pull/4779) [`de2895a`](https://github.com/scaleway/ultraviolet/commit/de2895ac39d4348c56d65497808e373bab02c5c3) Thanks [@matthprost](https://github.com/matthprost)! - Fix icons to work with legacy one

- Updated dependencies [[`35a1958`](https://github.com/scaleway/ultraviolet/commit/35a1958cb64e8fbd8d90e356df70c191eceac620), [`de2895a`](https://github.com/scaleway/ultraviolet/commit/de2895ac39d4348c56d65497808e373bab02c5c3)]:
  - @ultraviolet/ui@1.87.1
  - @ultraviolet/icons@3.11.2

## 0.24.0

### Minor Changes

- [#4768](https://github.com/scaleway/ultraviolet/pull/4768) [`3b8a89a`](https://github.com/scaleway/ultraviolet/commit/3b8a89a770748a40939f553e9456edc0cc1492a4) Thanks [@matthprost](https://github.com/matthprost)! - Improve `<Navigation.Item />` component by adding props `rel` and `target`. Previously a `href` item meant external link, it has now changed. Take this in consideration as your links might not open in a new browser and not have the external icon anymore.

### Patch Changes

- Updated dependencies [[`d36d815`](https://github.com/scaleway/ultraviolet/commit/d36d815ddb0db8ff2514200d00bbe0e01e731ef4), [`9133763`](https://github.com/scaleway/ultraviolet/commit/9133763cd6c1dfeb24ca656ac68a5dfa7b5c20cd), [`1c7ef50`](https://github.com/scaleway/ultraviolet/commit/1c7ef50ca4ac37b8d9a171e2a7ab14be0b4d953d), [`3b8a89a`](https://github.com/scaleway/ultraviolet/commit/3b8a89a770748a40939f553e9456edc0cc1492a4), [`62981ad`](https://github.com/scaleway/ultraviolet/commit/62981ad6b122a3670c0687d2854aa9134cca85f3)]:
  - @ultraviolet/ui@1.87.0
  - @ultraviolet/icons@3.11.1

## 0.23.6

### Patch Changes

- Updated dependencies [[`a1cc1af`](https://github.com/scaleway/ultraviolet/commit/a1cc1afbc8b97b61736caf441f48555e543a9f66), [`a81daa4`](https://github.com/scaleway/ultraviolet/commit/a81daa4ea5b41b3eba10c80501d96845f2222098), [`ec29328`](https://github.com/scaleway/ultraviolet/commit/ec29328fa0a0b85d8721b9cd920a7946b5a470fd), [`5b840a8`](https://github.com/scaleway/ultraviolet/commit/5b840a8d081da1ffff44e94fc6b3fcf7e142d6f1)]:
  - @ultraviolet/ui@1.86.0

## 0.23.5

### Patch Changes

- [#4760](https://github.com/scaleway/ultraviolet/pull/4760) [`fbec332`](https://github.com/scaleway/ultraviolet/commit/fbec332731b7d0e199a6fc142b65b0f847e053a7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` icons

- Updated dependencies [[`3d28302`](https://github.com/scaleway/ultraviolet/commit/3d28302a867df3b16cbbe64b375d15c9742797a7), [`c959773`](https://github.com/scaleway/ultraviolet/commit/c959773c06154ca253b2cc6ed68d01021a3de7f4), [`6108aff`](https://github.com/scaleway/ultraviolet/commit/6108affee43423302ee20c7e98410029a279c3a9)]:
  - @ultraviolet/ui@1.85.3
  - @ultraviolet/icons@3.11.0

## 0.23.4

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
  - @ultraviolet/ui@1.85.2

## 0.23.3

### Patch Changes

- [#4719](https://github.com/scaleway/ultraviolet/pull/4719) [`cb9e923`](https://github.com/scaleway/ultraviolet/commit/cb9e923a2364aa82ab3f33cbd1cb068a71035b4d) Thanks [@matthprost](https://github.com/matthprost)! - Fix multiple icons that were not displayed properly

- Updated dependencies [[`cb9e923`](https://github.com/scaleway/ultraviolet/commit/cb9e923a2364aa82ab3f33cbd1cb068a71035b4d), [`fa3766c`](https://github.com/scaleway/ultraviolet/commit/fa3766cf94a1cd83973be43eff92bc100390f05d)]:
  - @ultraviolet/icons@3.10.1
  - @ultraviolet/ui@1.85.1

## 0.23.2

### Patch Changes

- [#4732](https://github.com/scaleway/ultraviolet/pull/4732) [`e5235bf`](https://github.com/scaleway/ultraviolet/commit/e5235bff9b10d06cd7f4b0527ef654543643946e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.15.1`.

- Updated dependencies [[`1b5dd12`](https://github.com/scaleway/ultraviolet/commit/1b5dd123043ebddec4ee4013df551d8667796209), [`fc68c84`](https://github.com/scaleway/ultraviolet/commit/fc68c84440eff61479ec507c513dd274a4b2e32a), [`112031d`](https://github.com/scaleway/ultraviolet/commit/112031d911fa0609e3b4945ad99f1d95624f7e9e)]:
  - @ultraviolet/ui@1.85.0

## 0.23.1

### Patch Changes

- [#4687](https://github.com/scaleway/ultraviolet/pull/4687) [`913a498`](https://github.com/scaleway/ultraviolet/commit/913a498f7c3931b113de9d23b73ffe3b9c295624) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.15.0`.

- [#4725](https://github.com/scaleway/ultraviolet/pull/4725) [`4a4ed79`](https://github.com/scaleway/ultraviolet/commit/4a4ed79d68bb1d15ce11dde755d92e9de05cc844) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.7`.
  Updated dependency `@babel/runtime` to `7.26.7`.
  Updated dependency `@babel/preset-env` to `7.26.7`.
- Updated dependencies [[`19b2bed`](https://github.com/scaleway/ultraviolet/commit/19b2bed2284098aa227a22a3f1b71a8af29e19e5), [`4a4ed79`](https://github.com/scaleway/ultraviolet/commit/4a4ed79d68bb1d15ce11dde755d92e9de05cc844)]:
  - @ultraviolet/icons@3.10.0
  - @ultraviolet/ui@1.84.5

## 0.23.0

### Minor Changes

- [#4708](https://github.com/scaleway/ultraviolet/pull/4708) [`d44d0dc`](https://github.com/scaleway/ultraviolet/commit/d44d0dcfd0d5ec850d0c0bf0a63cfbb67ae6bb3e) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - feat: add new prop `showToggleOption` to `SteppedListContainer`

### Patch Changes

- [#4713](https://github.com/scaleway/ultraviolet/pull/4713) [`9de3560`](https://github.com/scaleway/ultraviolet/commit/9de3560479d871bf31bc68b050ccba1e62665816) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.8`.

- Updated dependencies [[`d3acc50`](https://github.com/scaleway/ultraviolet/commit/d3acc506910ecaadea92dcccaafeb600200fb274), [`ef98866`](https://github.com/scaleway/ultraviolet/commit/ef98866a1a36b3d89b032b776becd4056db98a62), [`310e32e`](https://github.com/scaleway/ultraviolet/commit/310e32e35e51bc3c53d27cf374bc5bfeaac33768), [`9de3560`](https://github.com/scaleway/ultraviolet/commit/9de3560479d871bf31bc68b050ccba1e62665816)]:
  - @ultraviolet/ui@1.84.4
  - @ultraviolet/icons@3.9.1

## 0.22.10

### Patch Changes

- Updated dependencies [[`9a58499`](https://github.com/scaleway/ultraviolet/commit/9a58499f3ef519f7f29cab1441d56638d75bf827)]:
  - @ultraviolet/icons@3.9.0
  - @ultraviolet/ui@1.84.3

## 0.22.9

### Patch Changes

- Updated dependencies [[`f8e9911`](https://github.com/scaleway/ultraviolet/commit/f8e99113b95758ce6c40aa4f3c7d4cebc3db91ca), [`c4767ba`](https://github.com/scaleway/ultraviolet/commit/c4767ba4a1f2bad56ba66f6c2ace874838bc8c82), [`d41d0ff`](https://github.com/scaleway/ultraviolet/commit/d41d0ff7756acd0d69a3a63e62cdb49e09341729), [`3d37913`](https://github.com/scaleway/ultraviolet/commit/3d3791392c86ca6e6e7c9f8518507762865132c0), [`fddc860`](https://github.com/scaleway/ultraviolet/commit/fddc860ffcf4c0bf7458818a0152becd91f96b54)]:
  - @ultraviolet/themes@1.16.0
  - @ultraviolet/ui@1.84.2
  - @ultraviolet/icons@3.8.4

## 0.22.8

### Patch Changes

- Updated dependencies [[`aff907c`](https://github.com/scaleway/ultraviolet/commit/aff907c0e3df8318f3494bf935e9ca137628ce7b), [`80fe6dc`](https://github.com/scaleway/ultraviolet/commit/80fe6dcce854a37c46861a43ab7f00a08cfe1bea), [`4fe32b4`](https://github.com/scaleway/ultraviolet/commit/4fe32b4d4b30fb4cdeb1bdf85f9a6d72e12bb7f3)]:
  - @ultraviolet/ui@1.84.1
  - @ultraviolet/icons@3.8.3

## 0.22.7

### Patch Changes

- [#4663](https://github.com/scaleway/ultraviolet/pull/4663) [`d11059c`](https://github.com/scaleway/ultraviolet/commit/d11059c4b1e51f582d525245eb873fa1fd96dcee) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.6`.

- [#4679](https://github.com/scaleway/ultraviolet/pull/4679) [`acd9e4e`](https://github.com/scaleway/ultraviolet/commit/acd9e4e7cb782c13120b7e7613286f106f7b3692) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.7`.

- Updated dependencies [[`9db9273`](https://github.com/scaleway/ultraviolet/commit/9db927334bfc4eeb583d1753c775b6b91abe97d2), [`b4b5366`](https://github.com/scaleway/ultraviolet/commit/b4b536696ca576f4c3f489879192e80777acf615), [`d11059c`](https://github.com/scaleway/ultraviolet/commit/d11059c4b1e51f582d525245eb873fa1fd96dcee), [`acd9e4e`](https://github.com/scaleway/ultraviolet/commit/acd9e4e7cb782c13120b7e7613286f106f7b3692), [`5509994`](https://github.com/scaleway/ultraviolet/commit/5509994312fd8474517b123b2eb9c8b3101b47cb), [`8219a68`](https://github.com/scaleway/ultraviolet/commit/8219a68715c8017a1a71d33af97b52d0ff8f1c67), [`3b593c7`](https://github.com/scaleway/ultraviolet/commit/3b593c76c3ef86cbf3465e1055ad0d32e63f6b95)]:
  - @ultraviolet/ui@1.84.0
  - @ultraviolet/icons@3.8.2

## 0.22.6

### Patch Changes

- Updated dependencies [[`3271b0a`](https://github.com/scaleway/ultraviolet/commit/3271b0a2cfcf46de3e0ffeb9442d4fad5f2d844c)]:
  - @ultraviolet/ui@1.83.2

## 0.22.5

### Patch Changes

- [#4633](https://github.com/scaleway/ultraviolet/pull/4633) [`b9ea27c`](https://github.com/scaleway/ultraviolet/commit/b9ea27cad114de81b638be88070b11b357e7d605) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.14.1`.

- [#4644](https://github.com/scaleway/ultraviolet/pull/4644) [`8b7e989`](https://github.com/scaleway/ultraviolet/commit/8b7e98975598d5f24b006d29f83b59c807eeca58) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.3`.

- Updated dependencies [[`8b7e989`](https://github.com/scaleway/ultraviolet/commit/8b7e98975598d5f24b006d29f83b59c807eeca58), [`86641c4`](https://github.com/scaleway/ultraviolet/commit/86641c44e754bab39932bd4efe489a3d567abf81)]:
  - @ultraviolet/icons@3.8.1
  - @ultraviolet/ui@1.83.1

## 0.22.4

### Patch Changes

- Updated dependencies [[`61d26ae`](https://github.com/scaleway/ultraviolet/commit/61d26aec4a97f56ce6d3ab570c3c230a52c48aaa), [`76a8557`](https://github.com/scaleway/ultraviolet/commit/76a8557ca97592e3383465c6f273249cf76d9081)]:
  - @ultraviolet/ui@1.83.0

## 0.22.3

### Patch Changes

- Updated dependencies [[`9972cc5`](https://github.com/scaleway/ultraviolet/commit/9972cc56f910fbd2ed6a81fd172337604e0585e0), [`a492cbe`](https://github.com/scaleway/ultraviolet/commit/a492cbe263f5b43f36fa84e7c36ba9dfdece1f33), [`d8c3416`](https://github.com/scaleway/ultraviolet/commit/d8c3416895fedd524d2a3eefc76dbf7074b9dd3b), [`bab3b75`](https://github.com/scaleway/ultraviolet/commit/bab3b756dd168954be6be86f0cef078a822df934), [`2205ef6`](https://github.com/scaleway/ultraviolet/commit/2205ef68e0841ce0ab985cc3896fe5b68ef35b89), [`c0f8849`](https://github.com/scaleway/ultraviolet/commit/c0f8849a0e14d337e6feca67dff8169e23ceaecf), [`9fd969e`](https://github.com/scaleway/ultraviolet/commit/9fd969e4ed3580d52d16d853c4b11dbb39312477)]:
  - @ultraviolet/ui@1.82.3
  - @ultraviolet/icons@3.8.0

## 0.22.2

### Patch Changes

- [#4600](https://github.com/scaleway/ultraviolet/pull/4600) [`ef4dd67`](https://github.com/scaleway/ultraviolet/commit/ef4dd67e74ac5d11e2df3d8c42684e107879aa2b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.7`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.7`.
  Updated dependency `@uiw/react-codemirror` to `4.23.7`.
- Updated dependencies [[`64fdd0c`](https://github.com/scaleway/ultraviolet/commit/64fdd0c62b20bb07a4d8c1baf65b434e87c4dbef)]:
  - @ultraviolet/ui@1.82.2

## 0.22.1

### Patch Changes

- [#4603](https://github.com/scaleway/ultraviolet/pull/4603) [`e94eaad`](https://github.com/scaleway/ultraviolet/commit/e94eaad0be3138679cee9743b13335c32f71d3a2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.1`.
  Updated dependency `@types/react-dom` to `19.0.2`.

- [#4609](https://github.com/scaleway/ultraviolet/pull/4609) [`e14c76d`](https://github.com/scaleway/ultraviolet/commit/e14c76d530ba5be85602c07e8351ecddbc07ac39) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `19.0.2`.

- Updated dependencies [[`39e17a6`](https://github.com/scaleway/ultraviolet/commit/39e17a6842f8bdf58f2500b5867937c96e0c4b68), [`e94eaad`](https://github.com/scaleway/ultraviolet/commit/e94eaad0be3138679cee9743b13335c32f71d3a2), [`e14c76d`](https://github.com/scaleway/ultraviolet/commit/e14c76d530ba5be85602c07e8351ecddbc07ac39), [`79a5b3a`](https://github.com/scaleway/ultraviolet/commit/79a5b3ad7a302a43c816081001f2f96c7556c33c)]:
  - @ultraviolet/ui@1.82.1
  - @ultraviolet/icons@3.7.1

## 0.22.0

### Minor Changes

- [#4558](https://github.com/scaleway/ultraviolet/pull/4558) [`293aa2c`](https://github.com/scaleway/ultraviolet/commit/293aa2c041a5753394f2b4ae9e6e2f74b9bd10f5) Thanks [@matthprost](https://github.com/matthprost)! - Upgrade from react 18 to react 19

### Patch Changes

- [#4589](https://github.com/scaleway/ultraviolet/pull/4589) [`92ff6e6`](https://github.com/scaleway/ultraviolet/commit/92ff6e6095cba60d35c4af5c23dd10b1222f522f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.14.0`.

- [#4588](https://github.com/scaleway/ultraviolet/pull/4588) [`3b3aaaa`](https://github.com/scaleway/ultraviolet/commit/3b3aaaa7c42af3c8df46ba4db57160007870484d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.17`.

- Updated dependencies [[`293aa2c`](https://github.com/scaleway/ultraviolet/commit/293aa2c041a5753394f2b4ae9e6e2f74b9bd10f5), [`5b14b1a`](https://github.com/scaleway/ultraviolet/commit/5b14b1ab7ce9907f6fd1710233d7b2d38ced3101), [`535010a`](https://github.com/scaleway/ultraviolet/commit/535010a74c527cf69a08b0e4267290a61aae97f5), [`3b3aaaa`](https://github.com/scaleway/ultraviolet/commit/3b3aaaa7c42af3c8df46ba4db57160007870484d), [`4d8a5b5`](https://github.com/scaleway/ultraviolet/commit/4d8a5b51b80d669ae6d3753bf339d54e4444ec70)]:
  - @ultraviolet/icons@3.7.0
  - @ultraviolet/ui@1.82.0

## 0.21.40

### Patch Changes

- Updated dependencies [[`907b477`](https://github.com/scaleway/ultraviolet/commit/907b477b96459a1f59cf0bed929aefa3ce4d04d4), [`bd99975`](https://github.com/scaleway/ultraviolet/commit/bd9997595a47919f7bbbaa52d7ac64f3072ddb19)]:
  - @ultraviolet/ui@1.81.3

## 0.21.39

### Patch Changes

- [#4574](https://github.com/scaleway/ultraviolet/pull/4574) [`de622a2`](https://github.com/scaleway/ultraviolet/commit/de622a277da244ce265841f819d476cad9565ca9) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.15`.

- [#4583](https://github.com/scaleway/ultraviolet/pull/4583) [`54b5d89`](https://github.com/scaleway/ultraviolet/commit/54b5d897596dce5eaa2ad5357b3fda9879c53b80) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.16`.
  Updated dependency `@types/react-dom` to `18.3.5`.
- Updated dependencies [[`2f660df`](https://github.com/scaleway/ultraviolet/commit/2f660df8cc7313fc13a6bcef3a66dfbb7d56a650), [`de622a2`](https://github.com/scaleway/ultraviolet/commit/de622a277da244ce265841f819d476cad9565ca9), [`54b5d89`](https://github.com/scaleway/ultraviolet/commit/54b5d897596dce5eaa2ad5357b3fda9879c53b80)]:
  - @ultraviolet/ui@1.81.2
  - @ultraviolet/icons@3.6.3

## 0.21.38

### Patch Changes

- Updated dependencies [[`456d104`](https://github.com/scaleway/ultraviolet/commit/456d104c77e5a261f191ee797b2e38e0a4bcad7a)]:
  - @ultraviolet/ui@1.81.1

## 0.21.37

### Patch Changes

- [#4562](https://github.com/scaleway/ultraviolet/pull/4562) [`e08da2d`](https://github.com/scaleway/ultraviolet/commit/e08da2d06812061f8fff3e6b51cc95fa86383668) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-dom` to `18.3.3`.

- [#4568](https://github.com/scaleway/ultraviolet/pull/4568) [`3e42097`](https://github.com/scaleway/ultraviolet/commit/3e4209795e1915cc2069401115009128365a320b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.14.0`.
  Updated dependency `@emotion/styled` to `11.14.0`.
  Updated dependency `@emotion/cache` to `11.14.0`.
- Updated dependencies [[`e08da2d`](https://github.com/scaleway/ultraviolet/commit/e08da2d06812061f8fff3e6b51cc95fa86383668), [`3e42097`](https://github.com/scaleway/ultraviolet/commit/3e4209795e1915cc2069401115009128365a320b), [`ffb2c06`](https://github.com/scaleway/ultraviolet/commit/ffb2c06779d938abc7dde959adcd610ed5af65d7), [`7633f1f`](https://github.com/scaleway/ultraviolet/commit/7633f1f9c8302b01b7be66116bdea62afe09fa07)]:
  - @ultraviolet/icons@3.6.2
  - @ultraviolet/ui@1.81.0

## 0.21.36

### Patch Changes

- [#4553](https://github.com/scaleway/ultraviolet/pull/4553) [`2241ec1`](https://github.com/scaleway/ultraviolet/commit/2241ec1fb89d3e2f6c679b9b4a9af6733344e643) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.14`.
  Updated dependency `@types/react-dom` to `18.3.2`.
- Updated dependencies [[`612316c`](https://github.com/scaleway/ultraviolet/commit/612316c778cd82f852dacfa67a664d463611f23b), [`2241ec1`](https://github.com/scaleway/ultraviolet/commit/2241ec1fb89d3e2f6c679b9b4a9af6733344e643)]:
  - @ultraviolet/ui@1.80.0
  - @ultraviolet/icons@3.6.1

## 0.21.35

### Patch Changes

- [#4544](https://github.com/scaleway/ultraviolet/pull/4544) [`ab0d6ea`](https://github.com/scaleway/ultraviolet/commit/ab0d6ea3de0566b9b5aaba130c92830d122c2e0f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.13`.

- Updated dependencies [[`5e39094`](https://github.com/scaleway/ultraviolet/commit/5e39094932462147c4302c12a8414333c73879e9), [`19c1d19`](https://github.com/scaleway/ultraviolet/commit/19c1d194141c8f4b0714de17d8daf3e050533322), [`007019c`](https://github.com/scaleway/ultraviolet/commit/007019c37d6207953b12a0d10fcc1b4e61fc9710), [`ab0d6ea`](https://github.com/scaleway/ultraviolet/commit/ab0d6ea3de0566b9b5aaba130c92830d122c2e0f)]:
  - @ultraviolet/ui@1.79.0
  - @ultraviolet/icons@3.6.0

## 0.21.34

### Patch Changes

- Updated dependencies [[`36f3b03`](https://github.com/scaleway/ultraviolet/commit/36f3b0359da76156cb69179b7b892aaace159b9c)]:
  - @ultraviolet/ui@1.78.1

## 0.21.33

### Patch Changes

- Updated dependencies [[`6ab8373`](https://github.com/scaleway/ultraviolet/commit/6ab837360da3fe85cac22b7780b3e771dd28ca34), [`bbdad4a`](https://github.com/scaleway/ultraviolet/commit/bbdad4aeda1a790fdfeee4657c177e270335200e)]:
  - @ultraviolet/ui@1.78.0

## 0.21.32

### Patch Changes

- Updated dependencies [[`d876181`](https://github.com/scaleway/ultraviolet/commit/d8761814f5d54a6fe85c92d7089fa37aec14106f), [`72d5285`](https://github.com/scaleway/ultraviolet/commit/72d5285303755d0861a6b3dd8b2ed6c15ca8c102)]:
  - @ultraviolet/ui@1.77.4

## 0.21.31

### Patch Changes

- [#4489](https://github.com/scaleway/ultraviolet/pull/4489) [`70a3515`](https://github.com/scaleway/ultraviolet/commit/70a351548fc2dd5d38822b0fcc83740bc72acfe5) Thanks [@matthprost](https://github.com/matthprost)! - Improve render performances on `<EstimateCost />`

- Updated dependencies [[`84d8445`](https://github.com/scaleway/ultraviolet/commit/84d8445f79b109030ffeed92338e975ad51cbdd5)]:
  - @ultraviolet/icons@3.5.0
  - @ultraviolet/ui@1.77.3

## 0.21.30

### Patch Changes

- [#4483](https://github.com/scaleway/ultraviolet/pull/4483) [`2c4f9af`](https://github.com/scaleway/ultraviolet/commit/2c4f9afc66e6cd9df2a1bceab51212eac62692ef) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.13.5`.
  Updated dependency `@emotion/styled` to `11.13.5`.
  Updated dependency `@emotion/serialize` to `1.3.3`.
  Updated dependency `@emotion/cache` to `11.13.5`.
- Updated dependencies [[`2c4f9af`](https://github.com/scaleway/ultraviolet/commit/2c4f9afc66e6cd9df2a1bceab51212eac62692ef)]:
  - @ultraviolet/icons@3.4.3
  - @ultraviolet/ui@1.77.2

## 0.21.29

### Patch Changes

- [#4471](https://github.com/scaleway/ultraviolet/pull/4471) [`f3a3028`](https://github.com/scaleway/ultraviolet/commit/f3a3028827b1b7bb810621f236e3b19f1b98fe87) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` disabled pin button still working when clicking on it

- Updated dependencies [[`d4ccb3b`](https://github.com/scaleway/ultraviolet/commit/d4ccb3b802b4b93a412b65990c462e3ca92f364d), [`f4d106a`](https://github.com/scaleway/ultraviolet/commit/f4d106a4dd46e779a2570e70fdd77d8e04a12039)]:
  - @ultraviolet/ui@1.77.1

## 0.21.28

### Patch Changes

- Updated dependencies [[`66a6680`](https://github.com/scaleway/ultraviolet/commit/66a6680101f5fad1b2fb67b40b9ed4e0f6c86b66), [`4495f5c`](https://github.com/scaleway/ultraviolet/commit/4495f5c967ca277f2b7b05455ec083625e577a69), [`20ee243`](https://github.com/scaleway/ultraviolet/commit/20ee2435d3897000717338dcfbb4e38c922bcf0d)]:
  - @ultraviolet/ui@1.77.0

## 0.21.27

### Patch Changes

- [#4452](https://github.com/scaleway/ultraviolet/pull/4452) [`f0c4302`](https://github.com/scaleway/ultraviolet/commit/f0c4302c892caf68f0505677b53b442f82f9ba07) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ContentCard />` to add space between body text and button

- [#4433](https://github.com/scaleway/ultraviolet/pull/4433) [`ca7e4a6`](https://github.com/scaleway/ultraviolet/commit/ca7e4a64b50d5e950bf01ce37e5062b4d6ebed1a) Thanks [@matthprost](https://github.com/matthprost)! - `<EstimateCost />` make it more responsive

- [#4444](https://github.com/scaleway/ultraviolet/pull/4444) [`9e8f93d`](https://github.com/scaleway/ultraviolet/commit/9e8f93dbcc117923a3cb4d48f5fb6c5aa6d9f8b6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.26.0`.
  Updated dependency `@babel/runtime` to `7.26.0`.
  Updated dependency `@babel/preset-env` to `7.26.0`.
  Updated dependency `@babel/preset-typescript` to `7.26.0`.

- [#4458](https://github.com/scaleway/ultraviolet/pull/4458) [`8ddfbc1`](https://github.com/scaleway/ultraviolet/commit/8ddfbc14cd43770e68f35b9b77c0be2ef3c1cf3f) Thanks [@matthprost](https://github.com/matthprost)! - Revert @uiw/react-codemirror update

- Updated dependencies [[`990a7de`](https://github.com/scaleway/ultraviolet/commit/990a7deebf4fc56c2bd1c04e89854ddccce1896f), [`5326acf`](https://github.com/scaleway/ultraviolet/commit/5326acf8fafba39bca49ad8faf56c6d75869d557), [`9e8f93d`](https://github.com/scaleway/ultraviolet/commit/9e8f93dbcc117923a3cb4d48f5fb6c5aa6d9f8b6), [`898728d`](https://github.com/scaleway/ultraviolet/commit/898728d2b99a1ad5e895c2bac2cd1dfac487181f)]:
  - @ultraviolet/ui@1.76.0
  - @ultraviolet/themes@1.15.0
  - @ultraviolet/icons@3.4.2

## 0.21.26

### Patch Changes

- [#4388](https://github.com/scaleway/ultraviolet/pull/4388) [`db86e50`](https://github.com/scaleway/ultraviolet/commit/db86e504e5e63fa5a498a6d8eff7c855bedee9f9) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.12`.

- [#4399](https://github.com/scaleway/ultraviolet/pull/4399) [`7eb6f8d`](https://github.com/scaleway/ultraviolet/commit/7eb6f8dde3a43678d4c53f4441e977f189cab4f1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.6`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.6`.
  Updated dependency `@uiw/react-codemirror` to `4.23.6`.

- [#4398](https://github.com/scaleway/ultraviolet/pull/4398) [`6fc92ce`](https://github.com/scaleway/ultraviolet/commit/6fc92cebfe1720df0e5e9e6c6205aba9cbfdc107) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.9`.
  Updated dependency `@babel/runtime` to `7.25.9`.
  Updated dependency `@babel/eslint-parser` to `7.25.9`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.25.9`.
  Updated dependency `@babel/preset-env` to `7.25.9`.
  Updated dependency `@babel/preset-react` to `7.25.9`.
  Updated dependency `@babel/preset-typescript` to `7.25.9`.

- [#4394](https://github.com/scaleway/ultraviolet/pull/4394) [`9248ce4`](https://github.com/scaleway/ultraviolet/commit/9248ce40410df52711b8f1721faeb234d1daa760) Thanks [@matthprost](https://github.com/matthprost)! - Optimise svg files

- [#4392](https://github.com/scaleway/ultraviolet/pull/4392) [`04c120e`](https://github.com/scaleway/ultraviolet/commit/04c120ed8cce111e7085642eb327fa87d7d1dc6d) Thanks [@matthprost](https://github.com/matthprost)! - Auto increase the height of `<Card />` in a row context

- Updated dependencies [[`3c545cc`](https://github.com/scaleway/ultraviolet/commit/3c545cce96071ab905fca83b5cd8862aafe8c56f), [`0bcfa7e`](https://github.com/scaleway/ultraviolet/commit/0bcfa7edf242717d9f2eee24b96c260bef334e91), [`db86e50`](https://github.com/scaleway/ultraviolet/commit/db86e504e5e63fa5a498a6d8eff7c855bedee9f9), [`0aff4e5`](https://github.com/scaleway/ultraviolet/commit/0aff4e5ee074caa39cb799eeb8b5ccd9a970f962), [`6fc92ce`](https://github.com/scaleway/ultraviolet/commit/6fc92cebfe1720df0e5e9e6c6205aba9cbfdc107), [`9248ce4`](https://github.com/scaleway/ultraviolet/commit/9248ce40410df52711b8f1721faeb234d1daa760), [`02450b5`](https://github.com/scaleway/ultraviolet/commit/02450b59897e5c99ea4db08ba21fd08ec4f4f03f), [`8b92813`](https://github.com/scaleway/ultraviolet/commit/8b928139ec5c99ae9e65ea1129705dbb1413268c), [`04c120e`](https://github.com/scaleway/ultraviolet/commit/04c120ed8cce111e7085642eb327fa87d7d1dc6d)]:
  - @ultraviolet/ui@1.75.4
  - @ultraviolet/icons@3.4.1

## 0.21.25

### Patch Changes

- Updated dependencies [[`14756fb`](https://github.com/scaleway/ultraviolet/commit/14756fbe69fce22e1ddf8f181e9eef5348c4ca8a), [`5e5d521`](https://github.com/scaleway/ultraviolet/commit/5e5d521255b6b99806f4aa0071ac3df6d1704c95)]:
  - @ultraviolet/ui@1.75.3

## 0.21.24

### Patch Changes

- Updated dependencies [[`1d3d064`](https://github.com/scaleway/ultraviolet/commit/1d3d0640c097788e63915f567d2a54df586a34e9)]:
  - @ultraviolet/ui@1.75.2

## 0.21.23

### Patch Changes

- Updated dependencies [[`d203ee4`](https://github.com/scaleway/ultraviolet/commit/d203ee4840e6c588b476b7d2c3eb71d65669c673)]:
  - @ultraviolet/ui@1.75.1

## 0.21.22

### Patch Changes

- Updated dependencies [[`82f8ecc`](https://github.com/scaleway/ultraviolet/commit/82f8eccb176a9377a7af07c1a6057366698a7d28)]:
  - @ultraviolet/ui@1.75.0

## 0.21.21

### Patch Changes

- Updated dependencies [[`7376580`](https://github.com/scaleway/ultraviolet/commit/73765805d94a08b881fe8fc33edff8f54bec9101), [`8e77c03`](https://github.com/scaleway/ultraviolet/commit/8e77c03fdabffedae38fd6a135af914140f3027e), [`291882b`](https://github.com/scaleway/ultraviolet/commit/291882ba824d89f57168e8924d9e063f985de1c5), [`c289c5d`](https://github.com/scaleway/ultraviolet/commit/c289c5d4cfaa8eb587115b73ad119a079793826e)]:
  - @ultraviolet/icons@3.4.0
  - @ultraviolet/ui@1.74.0

## 0.21.20

### Patch Changes

- Updated dependencies [[`705a52d`](https://github.com/scaleway/ultraviolet/commit/705a52db708a91a66af83f5e1684bd9e00d09a72)]:
  - @ultraviolet/ui@1.73.2

## 0.21.19

### Patch Changes

- Updated dependencies [[`123daed`](https://github.com/scaleway/ultraviolet/commit/123daed9b671db0a1a12afe88e589bbe526c2009)]:
  - @ultraviolet/ui@1.73.1

## 0.21.18

### Patch Changes

- [#4345](https://github.com/scaleway/ultraviolet/pull/4345) [`ac4ea15`](https://github.com/scaleway/ultraviolet/commit/ac4ea155936387e3a75b68c44f3cd6934ceaa8d0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-dom` to `18.3.1`.

- [#4344](https://github.com/scaleway/ultraviolet/pull/4344) [`d8ed9af`](https://github.com/scaleway/ultraviolet/commit/d8ed9afe748371891745e619f1d91eb10cd23c8f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.8`.
  Updated dependency `@babel/eslint-parser` to `7.25.8`.
  Updated dependency `@babel/preset-env` to `7.25.8`.
- Updated dependencies [[`543f8e1`](https://github.com/scaleway/ultraviolet/commit/543f8e1d7bbae941434652ca5c8141d15cc77825), [`7f996a2`](https://github.com/scaleway/ultraviolet/commit/7f996a20050cc044b6b64599b802949c700cbbae), [`ac4ea15`](https://github.com/scaleway/ultraviolet/commit/ac4ea155936387e3a75b68c44f3cd6934ceaa8d0), [`d8ed9af`](https://github.com/scaleway/ultraviolet/commit/d8ed9afe748371891745e619f1d91eb10cd23c8f), [`a150eaa`](https://github.com/scaleway/ultraviolet/commit/a150eaa31523355521468fe412409d24630f9285), [`9df8735`](https://github.com/scaleway/ultraviolet/commit/9df87355da947078dc607e411aafdd47c1fc82dc), [`7a47067`](https://github.com/scaleway/ultraviolet/commit/7a47067b94292fa23be258a85a3b48cca7c9cdba)]:
  - @ultraviolet/ui@1.73.0
  - @ultraviolet/icons@3.3.0

## 0.21.17

### Patch Changes

- Updated dependencies [[`501e353`](https://github.com/scaleway/ultraviolet/commit/501e3532f3dc8e0ddecd58e3d30d63c9776a524d)]:
  - @ultraviolet/ui@1.72.3

## 0.21.16

### Patch Changes

- [#4322](https://github.com/scaleway/ultraviolet/pull/4322) [`7429c29`](https://github.com/scaleway/ultraviolet/commit/7429c29c5a81340914a00b4a3cc6cacacb71516e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.5`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.5`.
  Updated dependency `@uiw/react-codemirror` to `4.23.5`.
- Updated dependencies [[`e637068`](https://github.com/scaleway/ultraviolet/commit/e637068fe15b7c6d0792a1d05e1791d3e3b958ab), [`a26d439`](https://github.com/scaleway/ultraviolet/commit/a26d439c494ad24dbb857196f4430e657838bd8e), [`3c0ac55`](https://github.com/scaleway/ultraviolet/commit/3c0ac55291796453035a1c1c3aa0e0f07e0afd8d), [`b1739f1`](https://github.com/scaleway/ultraviolet/commit/b1739f1238d347060f5da85f71971009ba6478f0), [`ed8f35a`](https://github.com/scaleway/ultraviolet/commit/ed8f35aae233ee795311030aab81936ce99d2585)]:
  - @ultraviolet/ui@1.72.2
  - @ultraviolet/icons@3.2.0

## 0.21.15

### Patch Changes

- [#4310](https://github.com/scaleway/ultraviolet/pull/4310) [`b69aa0e`](https://github.com/scaleway/ultraviolet/commit/b69aa0e1031f6f813427ef690f6fffdf015ae5c3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.11`.

- [#4306](https://github.com/scaleway/ultraviolet/pull/4306) [`5ef4b53`](https://github.com/scaleway/ultraviolet/commit/5ef4b532a4250d0f0e14cb80ea4665458875cc5f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.4`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.4`.
  Updated dependency `@uiw/react-codemirror` to `4.23.4`.

- [#4308](https://github.com/scaleway/ultraviolet/pull/4308) [`b40d079`](https://github.com/scaleway/ultraviolet/commit/b40d0798711639d9cad2510aa32d34d6feb3a72f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.7`.
  Updated dependency `@babel/runtime` to `7.25.7`.
  Updated dependency `@babel/eslint-parser` to `7.25.7`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.25.7`.
  Updated dependency `@babel/preset-env` to `7.25.7`.
- Updated dependencies [[`b69aa0e`](https://github.com/scaleway/ultraviolet/commit/b69aa0e1031f6f813427ef690f6fffdf015ae5c3), [`b40d079`](https://github.com/scaleway/ultraviolet/commit/b40d0798711639d9cad2510aa32d34d6feb3a72f)]:
  - @ultraviolet/icons@3.1.4
  - @ultraviolet/ui@1.72.1

## 0.21.14

### Patch Changes

- [#4292](https://github.com/scaleway/ultraviolet/pull/4292) [`f093375`](https://github.com/scaleway/ultraviolet/commit/f093375341d13bbfda03272b6f1554eb133ed2fc) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.10`.

- Updated dependencies [[`8300d7b`](https://github.com/scaleway/ultraviolet/commit/8300d7be46c0bb6ae4b7ea437f4c407a856307c3), [`f093375`](https://github.com/scaleway/ultraviolet/commit/f093375341d13bbfda03272b6f1554eb133ed2fc), [`875bbed`](https://github.com/scaleway/ultraviolet/commit/875bbed19ace07fc96178c861b8891a5f2700bfa), [`04e9273`](https://github.com/scaleway/ultraviolet/commit/04e9273a02fd00f8334e03bee97e5408d61f163b), [`04e9273`](https://github.com/scaleway/ultraviolet/commit/04e9273a02fd00f8334e03bee97e5408d61f163b)]:
  - @ultraviolet/ui@1.72.0
  - @ultraviolet/icons@3.1.3

## 0.21.13

### Patch Changes

- Updated dependencies [[`2ba5a34`](https://github.com/scaleway/ultraviolet/commit/2ba5a34a6c4eaf6237544d83d534dd1d8f629a85)]:
  - @ultraviolet/themes@1.14.2
  - @ultraviolet/icons@3.1.2
  - @ultraviolet/ui@1.71.1

## 0.21.12

### Patch Changes

- [#4250](https://github.com/scaleway/ultraviolet/pull/4250) [`84f639e`](https://github.com/scaleway/ultraviolet/commit/84f639e5de8822995b0f228943e21d981028265f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.8`.

- [#4277](https://github.com/scaleway/ultraviolet/pull/4277) [`012095b`](https://github.com/scaleway/ultraviolet/commit/012095b790f99c9f98022370fb2468c4c74bface) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.9`.

- [#4271](https://github.com/scaleway/ultraviolet/pull/4271) [`3d07599`](https://github.com/scaleway/ultraviolet/commit/3d07599de8804fee5041f84bdb2d23837df88527) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.3`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.3`.
  Updated dependency `@uiw/react-codemirror` to `4.23.3`.
- Updated dependencies [[`9c722d7`](https://github.com/scaleway/ultraviolet/commit/9c722d7c003f49c05909e8166627e824f08e4fb2), [`b55a6e6`](https://github.com/scaleway/ultraviolet/commit/b55a6e68626dc2891fbd9cfaca918e423a09978c), [`59df043`](https://github.com/scaleway/ultraviolet/commit/59df04313458c8e38ff434deacaf9131828fe998), [`4e2e5b5`](https://github.com/scaleway/ultraviolet/commit/4e2e5b5218f098bac558651c0fbc004ceb33b4b9), [`820c5d4`](https://github.com/scaleway/ultraviolet/commit/820c5d4876310c695709ae484086bae29216ed7c), [`9a859d9`](https://github.com/scaleway/ultraviolet/commit/9a859d989cd8ef3a0c0befa8c326ab62707b749a), [`84f639e`](https://github.com/scaleway/ultraviolet/commit/84f639e5de8822995b0f228943e21d981028265f), [`37fbbca`](https://github.com/scaleway/ultraviolet/commit/37fbbca9d45ab6ed184cb7257f99c78f7ad4b225), [`012095b`](https://github.com/scaleway/ultraviolet/commit/012095b790f99c9f98022370fb2468c4c74bface)]:
  - @ultraviolet/ui@1.71.0
  - @ultraviolet/themes@1.14.1
  - @ultraviolet/icons@3.1.1

## 0.21.11

### Patch Changes

- Updated dependencies [[`801e1d8`](https://github.com/scaleway/ultraviolet/commit/801e1d87d292235837045c2157d423f49cd7db5c), [`7ff9bfb`](https://github.com/scaleway/ultraviolet/commit/7ff9bfbb4eed93daab03c36bdd927994e3bab5b1), [`3c11e91`](https://github.com/scaleway/ultraviolet/commit/3c11e9184afd8ac1e2478c5d6a9056c4a85591b0)]:
  - @ultraviolet/ui@1.70.2
  - @ultraviolet/icons@3.1.0

## 0.21.10

### Patch Changes

- [#4226](https://github.com/scaleway/ultraviolet/pull/4226) [`656db57`](https://github.com/scaleway/ultraviolet/commit/656db574ac43b2f92c13facca733a5c6cfec4ac8) Thanks [@lisalupi](https://github.com/lisalupi)! - `<ContentCard />`: new prop `headingTag` to change tag of header

- Updated dependencies [[`408dade`](https://github.com/scaleway/ultraviolet/commit/408dade64b06994f2de8fdd3b999b6d966b57e2f), [`1152b39`](https://github.com/scaleway/ultraviolet/commit/1152b3945df7420d300d2c6f2976e57af520082a), [`92fc208`](https://github.com/scaleway/ultraviolet/commit/92fc208384c24126f4a5ea37d4c6f0248267205d), [`6fae267`](https://github.com/scaleway/ultraviolet/commit/6fae2676176e2a7479e3a07b2e80d9ae126bc019)]:
  - @ultraviolet/ui@1.70.1
  - @ultraviolet/icons@3.0.2

## 0.21.9

### Patch Changes

- [#4224](https://github.com/scaleway/ultraviolet/pull/4224) [`35d68a8`](https://github.com/scaleway/ultraviolet/commit/35d68a8f4ee9a2c4fd729beaf47c5206d7519771) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.2`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.2`.
  Updated dependency `@uiw/react-codemirror` to `4.23.2`.

- [#4210](https://github.com/scaleway/ultraviolet/pull/4210) [`23f38b8`](https://github.com/scaleway/ultraviolet/commit/23f38b85602bf57ff1562868a920e9698ebbfa01) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.1`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.1`.
  Updated dependency `@uiw/react-codemirror` to `4.23.1`.

- [#4219](https://github.com/scaleway/ultraviolet/pull/4219) [`2c6e8ad`](https://github.com/scaleway/ultraviolet/commit/2c6e8ad1879913fc676486f768862c5fa7bdadfe) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<FAQ />` component, `productIconName` not working properly

- Updated dependencies [[`75a5de6`](https://github.com/scaleway/ultraviolet/commit/75a5de629394e862c69165aaf0fcae6c2191cdce), [`ac11dc5`](https://github.com/scaleway/ultraviolet/commit/ac11dc5f4a2934b8ae70051c9f09408c4bb9657c), [`84cab43`](https://github.com/scaleway/ultraviolet/commit/84cab43c806f1753ab052b0b622d075eb02dd1bd), [`ee3c0b5`](https://github.com/scaleway/ultraviolet/commit/ee3c0b5a35758d3920506cdfaca2bc06409a96c6), [`ee3c0b5`](https://github.com/scaleway/ultraviolet/commit/ee3c0b5a35758d3920506cdfaca2bc06409a96c6)]:
  - @ultraviolet/ui@1.70.0
  - @ultraviolet/themes@1.14.0
  - @ultraviolet/icons@3.0.1

## 0.21.8

### Patch Changes

- [#4207](https://github.com/scaleway/ultraviolet/pull/4207) [`3ac1f11`](https://github.com/scaleway/ultraviolet/commit/3ac1f117837300260d36ff90cdd08020bfb61192) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.13.1`.

- Updated dependencies [[`5dcee9d`](https://github.com/scaleway/ultraviolet/commit/5dcee9def0850a6395bd2bcc69fe92143c8b53c4), [`919cbd0`](https://github.com/scaleway/ultraviolet/commit/919cbd0e1e3c7d5050b09fd63347d7c2f621152c)]:
  - @ultraviolet/icons@3.0.0
  - @ultraviolet/ui@1.69.0

## 0.21.7

### Patch Changes

- [#4142](https://github.com/scaleway/ultraviolet/pull/4142) [`6642dec`](https://github.com/scaleway/ultraviolet/commit/6642dec9fb12bf1812ab4c0c3acfaa6efdc3fd65) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.13.3`.
  Updated dependency `@emotion/serialize` to `1.3.1`.

- [#4176](https://github.com/scaleway/ultraviolet/pull/4176) [`eab247e`](https://github.com/scaleway/ultraviolet/commit/eab247efca5e2412de7b5343e9f72f70fba27bf9) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.5`.

- [#4173](https://github.com/scaleway/ultraviolet/pull/4173) [`bc80541`](https://github.com/scaleway/ultraviolet/commit/bc805411aa30c08f2aa27da33b587320ca4dd7c7) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<EstimateCost.Item />` to have better responsiveness when using `shouldBeHidden` prop

- Updated dependencies [[`a0a3ec9`](https://github.com/scaleway/ultraviolet/commit/a0a3ec9c5ead1b0ce2d5b70444e36bcca5a3d0b8), [`49a5b17`](https://github.com/scaleway/ultraviolet/commit/49a5b179c1f934c6123689fa365c3f13fc30dcb8), [`0faa36e`](https://github.com/scaleway/ultraviolet/commit/0faa36e357a6c60fb1875114ef5a7ca5714e5297), [`6642dec`](https://github.com/scaleway/ultraviolet/commit/6642dec9fb12bf1812ab4c0c3acfaa6efdc3fd65), [`eab247e`](https://github.com/scaleway/ultraviolet/commit/eab247efca5e2412de7b5343e9f72f70fba27bf9)]:
  - @ultraviolet/icons@2.17.0
  - @ultraviolet/themes@1.13.0
  - @ultraviolet/ui@1.68.1

## 0.21.6

### Patch Changes

- [#4131](https://github.com/scaleway/ultraviolet/pull/4131) [`512495d`](https://github.com/scaleway/ultraviolet/commit/512495da6c84abe69641df32266e3286723f87c9) Thanks [@philibea](https://github.com/philibea)! - forward toggle props to MenuItem

## 0.21.5

### Patch Changes

- Updated dependencies [[`bd3700e`](https://github.com/scaleway/ultraviolet/commit/bd3700e52ffc8c12962635185ad016681956d434), [`5da5215`](https://github.com/scaleway/ultraviolet/commit/5da52153666ec49345010ede3de476489c3bee36)]:
  - @ultraviolet/ui@1.68.0

## 0.21.4

### Patch Changes

- [#4120](https://github.com/scaleway/ultraviolet/pull/4120) [`131b607`](https://github.com/scaleway/ultraviolet/commit/131b607a1060a38b98099c418a60e112ea381d66) Thanks [@philibea](https://github.com/philibea)! - fix pinned items click

## 0.21.3

### Patch Changes

- [#4117](https://github.com/scaleway/ultraviolet/pull/4117) [`8847e65`](https://github.com/scaleway/ultraviolet/commit/8847e65888712bd73fff26ab07b8c3ceb9e40715) Thanks [@philibea](https://github.com/philibea)! - update animation on navigation component

## 0.21.2

### Patch Changes

- Updated dependencies [[`3de4a9c`](https://github.com/scaleway/ultraviolet/commit/3de4a9c635422e603843db2305d4358e9f4ff7d7), [`f6a7aae`](https://github.com/scaleway/ultraviolet/commit/f6a7aaea5e56e1d377239a27875d7f83b855ab3d)]:
  - @ultraviolet/ui@1.67.3

## 0.21.1

### Patch Changes

- [#4106](https://github.com/scaleway/ultraviolet/pull/4106) [`18372bf`](https://github.com/scaleway/ultraviolet/commit/18372bfdd03691a14674507e1b6b83bf5970cc82) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.25.2`.
  Updated dependency `@babel/eslint-parser` to `7.25.1`.
  Updated dependency `@babel/preset-env` to `7.25.3`.
- Updated dependencies [[`b3b8fe5`](https://github.com/scaleway/ultraviolet/commit/b3b8fe544f097368e3477272697259d938ab85d5), [`3bcfb9a`](https://github.com/scaleway/ultraviolet/commit/3bcfb9a57c82e0b733fc8eb635544a204ba21aa7), [`18372bf`](https://github.com/scaleway/ultraviolet/commit/18372bfdd03691a14674507e1b6b83bf5970cc82)]:
  - @ultraviolet/ui@1.67.2
  - @ultraviolet/icons@2.16.2

## 0.21.0

### Minor Changes

- [#4091](https://github.com/scaleway/ultraviolet/pull/4091) [`e0facac`](https://github.com/scaleway/ultraviolet/commit/e0facac731dc579988402b8ce26201745ed23224) Thanks [@radhi-nasser-scaleway](https://github.com/radhi-nasser-scaleway)! - feat: add `titleAs` and `subtitleAs` to `ContentCardGroup`

### Patch Changes

- Updated dependencies [[`f19fe83`](https://github.com/scaleway/ultraviolet/commit/f19fe83f78235813532ec199808d0e52567dcfc5)]:
  - @ultraviolet/icons@2.16.1
  - @ultraviolet/ui@1.67.1

## 0.20.9

### Patch Changes

- Updated dependencies [[`1d751f1`](https://github.com/scaleway/ultraviolet/commit/1d751f1a81482561541df983f51b651bd2623e38), [`89583b1`](https://github.com/scaleway/ultraviolet/commit/89583b1a056acf5ad01fc122c38506ffe0a1adb3), [`c3ec2dd`](https://github.com/scaleway/ultraviolet/commit/c3ec2dde045ed93bbc68b36d888364e243913ec0), [`6012d08`](https://github.com/scaleway/ultraviolet/commit/6012d083018aefd7e9d8c44c0a2920dd4c6f2d7a), [`c9e19a6`](https://github.com/scaleway/ultraviolet/commit/c9e19a62d20f33c5ba9321723e55357888d30994)]:
  - @ultraviolet/icons@2.16.0
  - @ultraviolet/ui@1.67.0

## 0.20.8

### Patch Changes

- Updated dependencies [[`cf076da`](https://github.com/scaleway/ultraviolet/commit/cf076da9abeea8bd91450a5f94ceb2921be30e2c), [`f2fd9ed`](https://github.com/scaleway/ultraviolet/commit/f2fd9ed168062e709ca68b6c456149a33eea3e22)]:
  - @ultraviolet/ui@1.66.0
  - @ultraviolet/themes@1.12.4
  - @ultraviolet/icons@2.15.1

## 0.20.7

### Patch Changes

- Updated dependencies [[`e506708`](https://github.com/scaleway/ultraviolet/commit/e5067086fea4385c430f2905034ee39d35d30300)]:
  - @ultraviolet/ui@1.65.2

## 0.20.6

### Patch Changes

- Updated dependencies [[`2f7fa0d`](https://github.com/scaleway/ultraviolet/commit/2f7fa0d2c4066210754b3be8a05c0ccf59018776)]:
  - @ultraviolet/ui@1.65.1

## 0.20.5

### Patch Changes

- [#4059](https://github.com/scaleway/ultraviolet/pull/4059) [`2f08079`](https://github.com/scaleway/ultraviolet/commit/2f08079fd4207eeffbafd1924ff1cd92af45cad5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.13.0`.
  Updated dependency `@emotion/styled` to `11.13.0`.
  Updated dependency `@emotion/babel-plugin` to `11.12.0`.
  Updated dependency `@emotion/cache` to `11.13.0`.
  Updated dependency `@emotion/eslint-plugin` to `11.12.0`.
  Updated dependency `@emotion/jest` to `11.13.0`.
  Updated dependency `@emotion/serialize` to `1.3.0`.
- Updated dependencies [[`2f211e3`](https://github.com/scaleway/ultraviolet/commit/2f211e31a4f455df94425f190c807b75eee33a29), [`8588cde`](https://github.com/scaleway/ultraviolet/commit/8588cde71dd3a18b9593f3f367b7f5f5722ba0b0), [`2f1b211`](https://github.com/scaleway/ultraviolet/commit/2f1b211af846a3f973b20166e041a1ce193d28dd), [`e8ed01e`](https://github.com/scaleway/ultraviolet/commit/e8ed01e38dce351ef105e05180c7dead4cc97f96), [`2f08079`](https://github.com/scaleway/ultraviolet/commit/2f08079fd4207eeffbafd1924ff1cd92af45cad5), [`2f211e3`](https://github.com/scaleway/ultraviolet/commit/2f211e31a4f455df94425f190c807b75eee33a29), [`7e201dd`](https://github.com/scaleway/ultraviolet/commit/7e201dd8eb2969839c2d4227a4795d4bc1afd994)]:
  - @ultraviolet/ui@1.65.0
  - @ultraviolet/icons@2.15.0

## 0.20.4

### Patch Changes

- [#4047](https://github.com/scaleway/ultraviolet/pull/4047) [`8e433f7`](https://github.com/scaleway/ultraviolet/commit/8e433f7a9352e161a2f375a78350d6eb4a6ef2bd) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` to have animation set to `true` by default

- Updated dependencies [[`45e975e`](https://github.com/scaleway/ultraviolet/commit/45e975e3276c7f3164f2fd28d7563d3a170e0879)]:
  - @ultraviolet/ui@1.64.0

## 0.20.3

### Patch Changes

- Updated dependencies [[`122b8b9`](https://github.com/scaleway/ultraviolet/commit/122b8b9aa2ea085e3e78b4888c1827a5d9e12de5), [`e797379`](https://github.com/scaleway/ultraviolet/commit/e797379928682b812130a4092ed29d951faa3909), [`6e576df`](https://github.com/scaleway/ultraviolet/commit/6e576df73521ede5b4ee1d714aeb8ed0bfe619ba), [`02c7d1e`](https://github.com/scaleway/ultraviolet/commit/02c7d1e6d106e2748d0acefdc72bab61adcd1396)]:
  - @ultraviolet/ui@1.63.0
  - @ultraviolet/icons@2.14.0

## 0.20.2

### Patch Changes

- [#4024](https://github.com/scaleway/ultraviolet/pull/4024) [`5d66ca7`](https://github.com/scaleway/ultraviolet/commit/5d66ca70bede877a080ba770fa532e4b6be9eb7a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.9`.
  Updated dependency `@babel/runtime` to `7.24.8`.
  Updated dependency `@babel/eslint-parser` to `7.24.8`.
  Updated dependency `@babel/preset-env` to `7.24.8`.

- [#4020](https://github.com/scaleway/ultraviolet/pull/4020) [`0f63141`](https://github.com/scaleway/ultraviolet/commit/0f631410d0eda3d8f6c2f9051c8c850ddc41761c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.13.0`.

- Updated dependencies [[`0d0833c`](https://github.com/scaleway/ultraviolet/commit/0d0833c0b370f2c5dab6c633b2e8ce83f89437c4), [`5d66ca7`](https://github.com/scaleway/ultraviolet/commit/5d66ca70bede877a080ba770fa532e4b6be9eb7a), [`a0e0a95`](https://github.com/scaleway/ultraviolet/commit/a0e0a95a56f4882e6099e5d9a88264a27ff0c0c1), [`f17223e`](https://github.com/scaleway/ultraviolet/commit/f17223e5d2f3033932ce37eb6bbfbc32ebd931db)]:
  - @ultraviolet/ui@1.62.0
  - @ultraviolet/icons@2.13.2

## 0.20.1

### Patch Changes

- [#4006](https://github.com/scaleway/ultraviolet/pull/4006) [`e011345`](https://github.com/scaleway/ultraviolet/commit/e0113459832a0c026164344fc7efd6a3ab490df7) Thanks [@philibea](https://github.com/philibea)! - Add turborepo

- Updated dependencies [[`7ab5e04`](https://github.com/scaleway/ultraviolet/commit/7ab5e04105e8cc77104395d410f0ab9b1bd80950), [`d571c5e`](https://github.com/scaleway/ultraviolet/commit/d571c5e07d3f90ac3a80d85e95b2e33b8479927f), [`e011345`](https://github.com/scaleway/ultraviolet/commit/e0113459832a0c026164344fc7efd6a3ab490df7)]:
  - @ultraviolet/ui@1.61.1
  - @ultraviolet/icons@2.13.1
  - @ultraviolet/themes@1.12.2

## 0.20.0

### Minor Changes

- [#3983](https://github.com/scaleway/ultraviolet/pull/3983) [`200a99b`](https://github.com/scaleway/ultraviolet/commit/200a99b1a0731d09332d7496dcf8f8590e212f0a) Thanks [@matthprost](https://github.com/matthprost)! - Add `animation` prop on `<NavigationProvider />` to disable all animations on Navigation

### Patch Changes

- Updated dependencies [[`200a99b`](https://github.com/scaleway/ultraviolet/commit/200a99b1a0731d09332d7496dcf8f8590e212f0a), [`52a83f4`](https://github.com/scaleway/ultraviolet/commit/52a83f4da9c7025c3b04056e3209ee705aa92f53), [`14f8d15`](https://github.com/scaleway/ultraviolet/commit/14f8d15ce7a6e0fe4ae55aa4982d5357226bbf30)]:
  - @ultraviolet/ui@1.61.0
  - @ultraviolet/icons@2.13.0

## 0.19.3

### Patch Changes

- [#3986](https://github.com/scaleway/ultraviolet/pull/3986) [`e98cf4e`](https://github.com/scaleway/ultraviolet/commit/e98cf4ecbe01b4565ab05b2b2dfd43f9759cdcfa) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.23.0`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.23.0`.
  Updated dependency `@uiw/react-codemirror` to `4.23.0`.
- Updated dependencies [[`43324e7`](https://github.com/scaleway/ultraviolet/commit/43324e7abdf8d8877ad2f86ee90cd4ac0fc12b21), [`f2fd03e`](https://github.com/scaleway/ultraviolet/commit/f2fd03e4b97bd36bb86d2242efbd9c3558f91bd8)]:
  - @ultraviolet/ui@1.60.0

## 0.19.2

### Patch Changes

- Updated dependencies [[`1cc1b37`](https://github.com/scaleway/ultraviolet/commit/1cc1b37cca324b3261053184a8ba86b5eb348156)]:
  - @ultraviolet/ui@1.59.1

## 0.19.1

### Patch Changes

- Updated dependencies [[`fe71811`](https://github.com/scaleway/ultraviolet/commit/fe71811b58f7b4e28d861073d6a6a7dcb8807251), [`e0eced0`](https://github.com/scaleway/ultraviolet/commit/e0eced00f577edb115e4175f297b7f1cff771113), [`61f8b22`](https://github.com/scaleway/ultraviolet/commit/61f8b228f4e7c9ede64cd0f3326ad68dd7ce0f1a), [`e0a9f60`](https://github.com/scaleway/ultraviolet/commit/e0a9f602cfa77843ed9789c1809ac3a06c8d5ecc)]:
  - @ultraviolet/ui@1.59.0

## 0.19.0

### Minor Changes

- [#3959](https://github.com/scaleway/ultraviolet/pull/3959) [`0dad65d`](https://github.com/scaleway/ultraviolet/commit/0dad65da862fc404ec47c2771bcd60c244732af4) Thanks [@matthprost](https://github.com/matthprost)! - Allow negative values on prop `monthlyPrice` and `price` from `<EstimateCost.Item />`. The total value will always be 0 or higher.

### Patch Changes

- Updated dependencies [[`3630184`](https://github.com/scaleway/ultraviolet/commit/363018420c9bb43831ca4dda4f78d200908a5914), [`16f59dd`](https://github.com/scaleway/ultraviolet/commit/16f59dde7261f341301f0da0bfe1ff37a167d94a), [`745c278`](https://github.com/scaleway/ultraviolet/commit/745c2781442663469f8d02caecdb6e496d408998), [`3a97e74`](https://github.com/scaleway/ultraviolet/commit/3a97e744a0a955eae9dc0e9c831a98647e0be068), [`8b1cc9e`](https://github.com/scaleway/ultraviolet/commit/8b1cc9e24ddb5b40ec0688254f2bd8526292f083), [`1ab8aca`](https://github.com/scaleway/ultraviolet/commit/1ab8acafb7edf5cd73373e22ad37359fb4da0ff4), [`2b5efd1`](https://github.com/scaleway/ultraviolet/commit/2b5efd127c776174e7a092b9cac57fa49e8d9096)]:
  - @ultraviolet/ui@1.58.0
  - @ultraviolet/icons@2.12.18

## 0.18.0

### Minor Changes

- [#3949](https://github.com/scaleway/ultraviolet/pull/3949) [`ed752cc`](https://github.com/scaleway/ultraviolet/commit/ed752cc2c2afa92e26cca8999cecac6de93eee07) Thanks [@matthprost](https://github.com/matthprost)! - Add new prop `disabled` on `<ContentCard />` component

### Patch Changes

- Updated dependencies [[`7dee114`](https://github.com/scaleway/ultraviolet/commit/7dee114d97f7e7e0758eabc5e301ddc716ceea40), [`b1e5948`](https://github.com/scaleway/ultraviolet/commit/b1e59486cc336527871fc211faa8ea73c6b59fa6)]:
  - @ultraviolet/ui@1.57.1

## 0.17.11

### Patch Changes

- Updated dependencies [[`9d6a957`](https://github.com/scaleway/ultraviolet/commit/9d6a9571440c2af81ffd8f0feafae51a845df17f), [`bc58d97`](https://github.com/scaleway/ultraviolet/commit/bc58d97033e2028b69ca5d284bef88fff16e50ba), [`10da1f6`](https://github.com/scaleway/ultraviolet/commit/10da1f6cebdc09d2f902e606f27f9797903660a4), [`561e001`](https://github.com/scaleway/ultraviolet/commit/561e00184740f825927d3bb6191cbd07c7d96c15)]:
  - @ultraviolet/ui@1.57.0
  - @ultraviolet/themes@1.12.1
  - @ultraviolet/icons@2.12.17

## 0.17.10

### Patch Changes

- [#3864](https://github.com/scaleway/ultraviolet/pull/3864) [`f69471f`](https://github.com/scaleway/ultraviolet/commit/f69471fc23840270c90040dfd79fe3ddaace9066) Thanks [@lisalupi](https://github.com/lisalupi)! - Fix(`Navigation`): Focus disappear on space pressed

- Updated dependencies [[`c41ded2`](https://github.com/scaleway/ultraviolet/commit/c41ded21c99e830cfcc55c65c6907897bd665493), [`35292ba`](https://github.com/scaleway/ultraviolet/commit/35292baeffd460f35b03f23117dd7b741cd5f851), [`02cc330`](https://github.com/scaleway/ultraviolet/commit/02cc330cd530b116d4dcde26df95be7559dfd95d), [`e618b6e`](https://github.com/scaleway/ultraviolet/commit/e618b6e90801749be57cde6d40d27d6f9f12e790), [`5ffacdc`](https://github.com/scaleway/ultraviolet/commit/5ffacdc76e3d6f331c59197c360d52714808d43e), [`ed837ad`](https://github.com/scaleway/ultraviolet/commit/ed837ad86f6b0c9af9f5a8424e6bd9aa29d55450), [`e1fda7e`](https://github.com/scaleway/ultraviolet/commit/e1fda7e8f64185ffe12c2aff94171c94842e056c)]:
  - @ultraviolet/ui@1.56.1
  - @ultraviolet/icons@2.12.16

## 0.17.9

### Patch Changes

- [#3872](https://github.com/scaleway/ultraviolet/pull/3872) [`10e7a83`](https://github.com/scaleway/ultraviolet/commit/10e7a8352a229f49fe6f6782b09d031dc5dab399) Thanks [@lisalupi](https://github.com/lisalupi)! - `<NumberInputV2 />`: possibility to hide controls

- [#3803](https://github.com/scaleway/ultraviolet/pull/3803) [`74973df`](https://github.com/scaleway/ultraviolet/commit/74973df8d260be3ac4bf0e5d29a2614336c4a233) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.3.3`.

- Updated dependencies [[`31c2ac6`](https://github.com/scaleway/ultraviolet/commit/31c2ac6d51490ef1627b51bf75c74e363dba2a8c), [`10e7a83`](https://github.com/scaleway/ultraviolet/commit/10e7a8352a229f49fe6f6782b09d031dc5dab399), [`74973df`](https://github.com/scaleway/ultraviolet/commit/74973df8d260be3ac4bf0e5d29a2614336c4a233), [`885c605`](https://github.com/scaleway/ultraviolet/commit/885c605f91da60683916d9d1fd840b00248373b4), [`ce4dfdd`](https://github.com/scaleway/ultraviolet/commit/ce4dfdd88c7359e14a55499c5b7f7b67628cc8c4)]:
  - @ultraviolet/ui@1.56.0
  - @ultraviolet/icons@2.12.15

## 0.17.8

### Patch Changes

- [#3860](https://github.com/scaleway/ultraviolet/pull/3860) [`407888b`](https://github.com/scaleway/ultraviolet/commit/407888bbd0cb7894bea0d1a9995e0026c6b98abd) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.22.2`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.22.2`.
  Updated dependency `@uiw/react-codemirror` to `4.22.2`.

- [#3857](https://github.com/scaleway/ultraviolet/pull/3857) [`c18d7de`](https://github.com/scaleway/ultraviolet/commit/c18d7dece50df328256c146c999bead24ad89ec5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.10.3`.

- Updated dependencies [[`a7c9266`](https://github.com/scaleway/ultraviolet/commit/a7c9266a832d75e8df515e0c7c561877acb763b0), [`7dd5063`](https://github.com/scaleway/ultraviolet/commit/7dd506377c10604d48f7f5144f3aa66ab676d16c)]:
  - @ultraviolet/ui@1.55.3

## 0.17.7

### Patch Changes

- [#3850](https://github.com/scaleway/ultraviolet/pull/3850) [`8c4e45a`](https://github.com/scaleway/ultraviolet/commit/8c4e45aef4b181f344eaacdd2634e2ad9100e1b7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.7`.
  Updated dependency `@babel/runtime` to `7.24.7`.
  Updated dependency `@babel/eslint-parser` to `7.24.7`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.7`.
  Updated dependency `@babel/preset-env` to `7.24.7`.
  Updated dependency `@babel/preset-react` to `7.24.7`.
  Updated dependency `@babel/preset-typescript` to `7.24.7`.
- Updated dependencies [[`36f2ef2`](https://github.com/scaleway/ultraviolet/commit/36f2ef2ee3fa9932536d1daea46ec691ec24e2b7), [`8c4e45a`](https://github.com/scaleway/ultraviolet/commit/8c4e45aef4b181f344eaacdd2634e2ad9100e1b7)]:
  - @ultraviolet/ui@1.55.2
  - @ultraviolet/icons@2.12.14

## 0.17.6

### Patch Changes

- Updated dependencies [[`61fd691`](https://github.com/scaleway/ultraviolet/commit/61fd691d458acb42e925e4916d1c7aceda6321a0), [`39a5ee7`](https://github.com/scaleway/ultraviolet/commit/39a5ee76fcdc4e083b16fc8620bd666458bdda94), [`39a5ee7`](https://github.com/scaleway/ultraviolet/commit/39a5ee76fcdc4e083b16fc8620bd666458bdda94)]:
  - @ultraviolet/ui@1.55.1
  - @ultraviolet/themes@1.12.0
  - @ultraviolet/icons@2.12.13

## 0.17.5

### Patch Changes

- [#3821](https://github.com/scaleway/ultraviolet/pull/3821) [`3500e6c`](https://github.com/scaleway/ultraviolet/commit/3500e6cd9d3724cd8cc50a9b8402aedcc92cbfdf) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.6`.
  Updated dependency `@babel/runtime` to `7.24.6`.
  Updated dependency `@babel/eslint-parser` to `7.24.6`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.6`.
  Updated dependency `@babel/preset-env` to `7.24.6`.
  Updated dependency `@babel/preset-react` to `7.24.6`.
  Updated dependency `@babel/preset-typescript` to `7.24.6`.
- Updated dependencies [[`150f6ae`](https://github.com/scaleway/ultraviolet/commit/150f6aed639170f5b617ad7d11bcaf3571fa68c1), [`3500e6c`](https://github.com/scaleway/ultraviolet/commit/3500e6cd9d3724cd8cc50a9b8402aedcc92cbfdf)]:
  - @ultraviolet/ui@1.55.0
  - @ultraviolet/icons@2.12.12

## 0.17.4

### Patch Changes

- Updated dependencies [[`0c77ec7`](https://github.com/scaleway/ultraviolet/commit/0c77ec72bcce69989392f91f952042ab575e13f7), [`a915531`](https://github.com/scaleway/ultraviolet/commit/a915531712a6c819ffcf3b98dc190e338c9317f8), [`2be2c09`](https://github.com/scaleway/ultraviolet/commit/2be2c0947ce477b092f6494659f8d88c4e3873ac), [`90dbb2b`](https://github.com/scaleway/ultraviolet/commit/90dbb2b9bf925c5b158ac8f221cc51bd0104ca6d), [`2c7da50`](https://github.com/scaleway/ultraviolet/commit/2c7da50c778527dd78a30c3cb33344175a21c8ef), [`2c7da50`](https://github.com/scaleway/ultraviolet/commit/2c7da50c778527dd78a30c3cb33344175a21c8ef)]:
  - @ultraviolet/ui@1.54.0
  - @ultraviolet/icons@2.12.11

## 0.17.3

### Patch Changes

- Updated dependencies [[`c458956`](https://github.com/scaleway/ultraviolet/commit/c4589564872bc9fd3ddf95e327ae768226934274)]:
  - @ultraviolet/themes@1.11.0
  - @ultraviolet/icons@2.12.10
  - @ultraviolet/ui@1.53.4

## 0.17.2

### Patch Changes

- [#3806](https://github.com/scaleway/ultraviolet/pull/3806) [`8a650a7`](https://github.com/scaleway/ultraviolet/commit/8a650a7fd41353f47549a1d27638533ecb982292) Thanks [@matthprost](https://github.com/matthprost)! - Fix typing on prop `locales` from `<Navigation />` and `<EstimateCost />` components.

- [#3784](https://github.com/scaleway/ultraviolet/pull/3784) [`097ed2f`](https://github.com/scaleway/ultraviolet/commit/097ed2f7e087354fb892b101d438d1d8e546b1c6) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Card />`: add flex to have full height card aligned into a Row.

- Updated dependencies [[`8a9bd89`](https://github.com/scaleway/ultraviolet/commit/8a9bd89a3331a14ff7540975a5212230c6dafa5a), [`097ed2f`](https://github.com/scaleway/ultraviolet/commit/097ed2f7e087354fb892b101d438d1d8e546b1c6), [`cf6de9a`](https://github.com/scaleway/ultraviolet/commit/cf6de9ac066449127d7a63412a00c24f52c6188d), [`e4c4cd9`](https://github.com/scaleway/ultraviolet/commit/e4c4cd99ff822909d0ac5d737aeca9de349c3a77)]:
  - @ultraviolet/ui@1.53.3

## 0.17.1

### Patch Changes

- [#3782](https://github.com/scaleway/ultraviolet/pull/3782) [`0ed8930`](https://github.com/scaleway/ultraviolet/commit/0ed8930aac665a8283de27bf327f579d0db7d6ca) Thanks [@matthprost](https://github.com/matthprost)! - Slight performance improvement on `<Expandable />` component to remove class generation when open and close

- Updated dependencies [[`0ed8930`](https://github.com/scaleway/ultraviolet/commit/0ed8930aac665a8283de27bf327f579d0db7d6ca)]:
  - @ultraviolet/ui@1.53.2

## 0.17.0

### Minor Changes

- [#3776](https://github.com/scaleway/ultraviolet/pull/3776) [`a959390`](https://github.com/scaleway/ultraviolet/commit/a9593909a3208f036ad5b9bdee07b13ef7b59f40) Thanks [@matthprost](https://github.com/matthprost)! - New prop `initialAllowNavigationResize` on `<NavigationProvider />` and serving `allowNavigationResize` and `setAllowNavigationResize` through `useNavigation()`

### Patch Changes

- Updated dependencies [[`1ebb688`](https://github.com/scaleway/ultraviolet/commit/1ebb688d45b7c5085b2fe67cbdff74d9da7fa9ff)]:
  - @ultraviolet/ui@1.53.1

## 0.16.0

### Minor Changes

- [#3774](https://github.com/scaleway/ultraviolet/pull/3774) [`1bb8016`](https://github.com/scaleway/ultraviolet/commit/1bb80165bf9409d12bbb9fc0011e06c16fbc914c) Thanks [@matthprost](https://github.com/matthprost)! - Add `onTotalPriceChange` prop on `<EstimateCost />` this function will provide `total` and `totalMax when the total price is re-computed allowing users to get that value.`

### Patch Changes

- [#3779](https://github.com/scaleway/ultraviolet/pull/3779) [`75d4446`](https://github.com/scaleway/ultraviolet/commit/75d4446c5dc91b599d7c40bb071771671318a704) Thanks [@matthprost](https://github.com/matthprost)! - Some fixes on `<Navigation />`:
  - Rename of `onClickExpand` to `onExpandChange` on `<NavigationProvider />`
  - Add new prop `onToggleExpand` on `<Navigation />` => this function will be triggered on click on the expand/collapse button
- Updated dependencies [[`503aad3`](https://github.com/scaleway/ultraviolet/commit/503aad3931fcd2eb1b1e438c6d75e4934ba070cd), [`8ecd1b0`](https://github.com/scaleway/ultraviolet/commit/8ecd1b0c8b0a8a112fbfe23397ae78830b978539)]:
  - @ultraviolet/ui@1.53.0

## 0.15.5

### Patch Changes

- [#3749](https://github.com/scaleway/ultraviolet/pull/3749) [`701c54b`](https://github.com/scaleway/ultraviolet/commit/701c54ba11ee32c0efd1a8ff2cf104fcb3d63a74) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` to hide unknown added pinned items

- Updated dependencies [[`b70242f`](https://github.com/scaleway/ultraviolet/commit/b70242f5b0d23a23698b7d270cfe839b694896fc), [`46bcdda`](https://github.com/scaleway/ultraviolet/commit/46bcddab272a4c87a690ca7286f07d15789d1e63), [`f275108`](https://github.com/scaleway/ultraviolet/commit/f275108351e5e53c3022fdd38d94fb36966f6d97)]:
  - @ultraviolet/ui@1.52.0

## 0.15.4

### Patch Changes

- Updated dependencies [[`fd81844`](https://github.com/scaleway/ultraviolet/commit/fd81844fed1d73b58b11f831015690e022e1c511), [`948b2eb`](https://github.com/scaleway/ultraviolet/commit/948b2ebbacfac4bad12dec6814876730ed7ee477)]:
  - @ultraviolet/ui@1.51.5
  - @ultraviolet/icons@2.12.9

## 0.15.3

### Patch Changes

- [#3747](https://github.com/scaleway/ultraviolet/pull/3747) [`5e77f1b`](https://github.com/scaleway/ultraviolet/commit/5e77f1b9198390c76376733343b75aa5410daa2c) Thanks [@matthprost](https://github.com/matthprost)! - Fixes on `<Navigation />` component for pin / unpin feature

- [#3744](https://github.com/scaleway/ultraviolet/pull/3744) [`3c1d30d`](https://github.com/scaleway/ultraviolet/commit/3c1d30d0b7926e1843b257c56b6c972449dbf0cd) Thanks [@philibea](https://github.com/philibea)! - add cjs export

- Updated dependencies [[`3c1d30d`](https://github.com/scaleway/ultraviolet/commit/3c1d30d0b7926e1843b257c56b6c972449dbf0cd)]:
  - @ultraviolet/themes@1.10.2
  - @ultraviolet/icons@2.12.8
  - @ultraviolet/ui@1.51.4

## 0.15.2

### Patch Changes

- [#3742](https://github.com/scaleway/ultraviolet/pull/3742) [`0b2e92f`](https://github.com/scaleway/ultraviolet/commit/0b2e92f655b966e7d780593a27d7a291eb526f70) Thanks [@philibea](https://github.com/philibea)! - udpate build with @emotion/babel

- Updated dependencies [[`0b2e92f`](https://github.com/scaleway/ultraviolet/commit/0b2e92f655b966e7d780593a27d7a291eb526f70)]:
  - @ultraviolet/icons@2.12.7
  - @ultraviolet/ui@1.51.3

## 0.15.1

### Patch Changes

- [#3731](https://github.com/scaleway/ultraviolet/pull/3731) [`362a534`](https://github.com/scaleway/ultraviolet/commit/362a5348a67b986907b65eec2606fd36fd21f621) Thanks [@philibea](https://github.com/philibea)! - migrate from vite config to rollup

- [#3740](https://github.com/scaleway/ultraviolet/pull/3740) [`bf6419b`](https://github.com/scaleway/ultraviolet/commit/bf6419b5a0523550153dfe5edc582ca3997b442f) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<NavigationComponent />` to have correct empty state, pin / unpin to be div instead of button and fix on click on pin / unpin

- Updated dependencies [[`362a534`](https://github.com/scaleway/ultraviolet/commit/362a5348a67b986907b65eec2606fd36fd21f621)]:
  - @ultraviolet/themes@1.10.1
  - @ultraviolet/icons@2.12.6
  - @ultraviolet/ui@1.51.2

## 0.15.0

### Minor Changes

- [#3717](https://github.com/scaleway/ultraviolet/pull/3717) [`87c3a99`](https://github.com/scaleway/ultraviolet/commit/87c3a99912c8323a5839b6fd9471fb070ac3da28) Thanks [@matthprost](https://github.com/matthprost)! - New pinned feature on `<Navigation />` you can enable it using prop `pinnedFeature={true}` on `<NavigationProvider />`

### Patch Changes

- Updated dependencies [[`0f133ea`](https://github.com/scaleway/ultraviolet/commit/0f133ea7032a555bdb9624e005db92d21b6a04b7)]:
  - @ultraviolet/ui@1.51.1

## 0.14.4

### Patch Changes

- Updated dependencies [[`9801140`](https://github.com/scaleway/ultraviolet/commit/980114070bef7258feaf4ab81627e14d7ac01e30)]:
  - @ultraviolet/ui@1.51.0

## 0.14.3

### Patch Changes

- Updated dependencies [[`4dd0d6e`](https://github.com/scaleway/ultraviolet/commit/4dd0d6e58e4a7666a3e729997c15246c297db02f)]:
  - @ultraviolet/ui@1.50.0

## 0.14.2

### Patch Changes

- Updated dependencies [[`8ee1377`](https://github.com/scaleway/ultraviolet/commit/8ee13771ba89eddd1920248415e2aa276f9dbe17), [`83d3902`](https://github.com/scaleway/ultraviolet/commit/83d39026cbdd66a3c8726b3c724059145f39aac3), [`a481e45`](https://github.com/scaleway/ultraviolet/commit/a481e45e8dfa343c7069490bf13bbf3f29bf8308)]:
  - @ultraviolet/ui@1.49.0

## 0.14.1

### Patch Changes

- [#3707](https://github.com/scaleway/ultraviolet/pull/3707) [`70256fb`](https://github.com/scaleway/ultraviolet/commit/70256fb186c43e6f5cbb702197a73865d3dbe08c) Thanks [@matthprost](https://github.com/matthprost)! - Export missing `<NaivgationProvider />` and `useNavigation()`

- Updated dependencies [[`9a03d6d`](https://github.com/scaleway/ultraviolet/commit/9a03d6dcc43d8d20ea585e8d0976ed06931bd42f)]:
  - @ultraviolet/ui@1.48.1

## 0.14.0

### Minor Changes

- [#3681](https://github.com/scaleway/ultraviolet/pull/3681) [`deb91d2`](https://github.com/scaleway/ultraviolet/commit/deb91d24672a4422c9bb97a90350bed702f944e6) Thanks [@matthprost](https://github.com/matthprost)! - Add prop `hideHourlyPriceOnTotal` on `<EstimateCost />` component to be able to hide hourly price in total section

- [#3695](https://github.com/scaleway/ultraviolet/pull/3695) [`a89b320`](https://github.com/scaleway/ultraviolet/commit/a89b32007f7ff7ac2767e4d838b99c79bbc1299c) Thanks [@matthprost](https://github.com/matthprost)! - Export `<NavigationProvider />` and `useNavigation()` to make the control of the nav easier

### Patch Changes

- [#3690](https://github.com/scaleway/ultraviolet/pull/3690) [`d3740c1`](https://github.com/scaleway/ultraviolet/commit/d3740c1d6d0b4fc965c7ba158779f99e597e4774) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.79`.

- [#3693](https://github.com/scaleway/ultraviolet/pull/3693) [`76b258d`](https://github.com/scaleway/ultraviolet/commit/76b258d1875ce9c04edb76c57d029ec86ce9a163) Thanks [@lisalupi](https://github.com/lisalupi)! - `<Navigation />`: Changed color of the text in `Navigation.Item` from textWeak to textDefault

- Updated dependencies [[`d3740c1`](https://github.com/scaleway/ultraviolet/commit/d3740c1d6d0b4fc965c7ba158779f99e597e4774), [`dfa7a06`](https://github.com/scaleway/ultraviolet/commit/dfa7a06984f876da0574dcc7fbc1f4085c1f9f1c)]:
  - @ultraviolet/ui@1.48.0

## 0.13.1

### Patch Changes

- Updated dependencies [[`59fb7f7`](https://github.com/scaleway/ultraviolet/commit/59fb7f7537d54066dda4249e89898a2921f642bd)]:
  - @ultraviolet/ui@1.47.1

## 0.13.0

### Minor Changes

- [#3631](https://github.com/scaleway/ultraviolet/pull/3631) [`30153dc`](https://github.com/scaleway/ultraviolet/commit/30153dc6ccf54e32281325386888263afd32bed9) Thanks [@matthprost](https://github.com/matthprost)! - Update `<Navigation />` with the new style of the menu to open on hover and have badges

### Patch Changes

- [#3652](https://github.com/scaleway/ultraviolet/pull/3652) [`abe48a8`](https://github.com/scaleway/ultraviolet/commit/abe48a8ca4f70718776ec3ccb9d613d49674ba87) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.8.2`.

- [#3658](https://github.com/scaleway/ultraviolet/pull/3658) [`53fb87d`](https://github.com/scaleway/ultraviolet/commit/53fb87d6899c892fb9b7ee5482fc2165cff76a0b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.78`.
  Updated dependency `@types/react-dom` to `18.2.25`.
- Updated dependencies [[`4e95be5`](https://github.com/scaleway/ultraviolet/commit/4e95be52f3bdb99c18d00d3db75756e608e7f72d), [`53fb87d`](https://github.com/scaleway/ultraviolet/commit/53fb87d6899c892fb9b7ee5482fc2165cff76a0b), [`30153dc`](https://github.com/scaleway/ultraviolet/commit/30153dc6ccf54e32281325386888263afd32bed9)]:
  - @ultraviolet/ui@1.47.0

## 0.12.7

### Patch Changes

- [#3653](https://github.com/scaleway/ultraviolet/pull/3653) [`75735a6`](https://github.com/scaleway/ultraviolet/commit/75735a6cca6abc58ba58517a8e89f50d72a5924c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` category icon and add `id` prop

## 0.12.6

### Patch Changes

- [#3628](https://github.com/scaleway/ultraviolet/pull/3628) [`ae54a12`](https://github.com/scaleway/ultraviolet/commit/ae54a12483b943ec8552500e23cd74786172320b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.4`.
  Updated dependency `@babel/runtime` to `7.24.4`.
  Updated dependency `@babel/preset-env` to `7.24.4`.

- [#3649](https://github.com/scaleway/ultraviolet/pull/3649) [`201bd77`](https://github.com/scaleway/ultraviolet/commit/201bd77a159065a28f2924db29084b9497351846) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` category icon variant on collapsed version

- Updated dependencies [[`93055fa`](https://github.com/scaleway/ultraviolet/commit/93055faf1d36847b1aff4cfbbd030684790a9f75), [`ae54a12`](https://github.com/scaleway/ultraviolet/commit/ae54a12483b943ec8552500e23cd74786172320b), [`cd2d0f3`](https://github.com/scaleway/ultraviolet/commit/cd2d0f320a8bb17bc6026382fb607bd841fc7442)]:
  - @ultraviolet/ui@1.46.0

## 0.12.5

### Patch Changes

- Updated dependencies []:
  - @ultraviolet/ui@1.45.6

## 0.12.4

### Patch Changes

- Updated dependencies [[`0db5ccf`](https://github.com/scaleway/ultraviolet/commit/0db5ccf6234e37e5d662115e6ba5189a9273f14b)]:
  - @ultraviolet/ui@1.45.5

## 0.12.3

### Patch Changes

- [#3636](https://github.com/scaleway/ultraviolet/pull/3636) [`3b850d3`](https://github.com/scaleway/ultraviolet/commit/3b850d3691acd1454d2986ea1ac9bd026dc42855) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react-dom` to `18.2.24`.

- [#3642](https://github.com/scaleway/ultraviolet/pull/3642) [`199ddfe`](https://github.com/scaleway/ultraviolet/commit/199ddfef030f2b85a276d70d029c7cda44ef21b8) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` to have correct text color on hover

- Updated dependencies [[`3b850d3`](https://github.com/scaleway/ultraviolet/commit/3b850d3691acd1454d2986ea1ac9bd026dc42855)]:
  - @ultraviolet/ui@1.45.4

## 0.12.2

### Patch Changes

- Updated dependencies [[`9d909c0`](https://github.com/scaleway/ultraviolet/commit/9d909c06b8df81a7c48c0d059934d45123bbacb9)]:
  - @ultraviolet/ui@1.45.3

## 0.12.1

### Patch Changes

- [#3632](https://github.com/scaleway/ultraviolet/pull/3632) [`190c205`](https://github.com/scaleway/ultraviolet/commit/190c205a17b5f95d46121392d4cbd88fb4666af0) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` active item with wrong color

## 0.12.0

### Minor Changes

- [#3627](https://github.com/scaleway/ultraviolet/pull/3627) [`a71f616`](https://github.com/scaleway/ultraviolet/commit/a71f6169c53727a1bc0945c2c1d78f96949d4307) Thanks [@matthprost](https://github.com/matthprost)! - New prop `categoryIconVariant` in `<Navigation />`

### Patch Changes

- [#3626](https://github.com/scaleway/ultraviolet/pull/3626) [`823fcb0`](https://github.com/scaleway/ultraviolet/commit/823fcb0866c41a8e60a4bf3aca839e03e94707fe) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<Navigation />` to have correct color for `<Navigation.Item />` that has sub items

- [#3615](https://github.com/scaleway/ultraviolet/pull/3615) [`6c1edef`](https://github.com/scaleway/ultraviolet/commit/6c1edef32591c78469be0da9e6b212898a5ff4c5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.74`.
  Updated dependency `@types/react-dom` to `18.2.23`.
- Updated dependencies [[`823fcb0`](https://github.com/scaleway/ultraviolet/commit/823fcb0866c41a8e60a4bf3aca839e03e94707fe), [`a71f616`](https://github.com/scaleway/ultraviolet/commit/a71f6169c53727a1bc0945c2c1d78f96949d4307), [`6c1edef`](https://github.com/scaleway/ultraviolet/commit/6c1edef32591c78469be0da9e6b212898a5ff4c5), [`d05acf2`](https://github.com/scaleway/ultraviolet/commit/d05acf2f68f8b7d67b0b1cef8142d35a20af49f3)]:
  - @ultraviolet/ui@1.45.2
  - @ultraviolet/themes@1.10.0

## 0.11.1

### Patch Changes

- [#3620](https://github.com/scaleway/ultraviolet/pull/3620) [`d63adc3`](https://github.com/scaleway/ultraviolet/commit/d63adc3bdd03f66c18980830774866c0aec7dc44) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `<Navigation />` to work better with slider, have better tab index and close the menu when clicking

  - Fix `<EstimateCost />` to have prop `overlayMargin` in order to adapt the overlay depending on the width of the navigation

- [#3616](https://github.com/scaleway/ultraviolet/pull/3616) [`8f285a6`](https://github.com/scaleway/ultraviolet/commit/8f285a6460db5c442abf10f074dda8f3f543a271) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/styled` to `11.11.5`.
  Updated dependency `@emotion/serialize` to `1.1.4`.
- Updated dependencies [[`d63adc3`](https://github.com/scaleway/ultraviolet/commit/d63adc3bdd03f66c18980830774866c0aec7dc44), [`8f285a6`](https://github.com/scaleway/ultraviolet/commit/8f285a6460db5c442abf10f074dda8f3f543a271)]:
  - @ultraviolet/ui@1.45.1

## 0.11.0

### Minor Changes

- [#3598](https://github.com/scaleway/ultraviolet/pull/3598) [`b8865ec`](https://github.com/scaleway/ultraviolet/commit/b8865ec1322f651128e45dd06fe8e2ec13d9038f) Thanks [@matthprost](https://github.com/matthprost)! - Change `<Separator />` color from `border` to `borderWeak`

- [#3537](https://github.com/scaleway/ultraviolet/pull/3537) [`21c0841`](https://github.com/scaleway/ultraviolet/commit/21c0841e6461bc4e1a6e410c6ee2ca022507cf55) Thanks [@matthprost](https://github.com/matthprost)! - New component `<Navigation />`

- [#3585](https://github.com/scaleway/ultraviolet/pull/3585) [`e8dca84`](https://github.com/scaleway/ultraviolet/commit/e8dca8467a1b458bbba0914c9697894367aa95da) Thanks [@matthprost](https://github.com/matthprost)! - Remove `react-flatten-children` and `@nivo/toolip`

### Patch Changes

- [#3596](https://github.com/scaleway/ultraviolet/pull/3596) [`470fa09`](https://github.com/scaleway/ultraviolet/commit/470fa09ed67275de5dff586070ab66dfd693320c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.21.25`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.21.25`.
  Updated dependency `@uiw/react-codemirror` to `4.21.25`.

- [#3540](https://github.com/scaleway/ultraviolet/pull/3540) [`ad00080`](https://github.com/scaleway/ultraviolet/commit/ad0008075e57d73fda7e25d288d27420fe395ccf) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.64`.
  Updated dependency `@types/react-dom` to `18.2.21`.

- [#3600](https://github.com/scaleway/ultraviolet/pull/3600) [`6a7ec72`](https://github.com/scaleway/ultraviolet/commit/6a7ec7286ae10880695d2a9a7fc2a0fbaaf7cf68) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.3`.
  Updated dependency `@babel/preset-env` to `7.24.3`.
- Updated dependencies [[`b8865ec`](https://github.com/scaleway/ultraviolet/commit/b8865ec1322f651128e45dd06fe8e2ec13d9038f), [`9e08841`](https://github.com/scaleway/ultraviolet/commit/9e08841e134cc16b01ba7039c320c1422c993f37), [`713a4df`](https://github.com/scaleway/ultraviolet/commit/713a4df7a14d17dfa2602284c6e036e00cd37e3f), [`8878dc5`](https://github.com/scaleway/ultraviolet/commit/8878dc5095786dca15735a9974696911d37a2c1c), [`e8dca84`](https://github.com/scaleway/ultraviolet/commit/e8dca8467a1b458bbba0914c9697894367aa95da), [`0260206`](https://github.com/scaleway/ultraviolet/commit/0260206c4be4b11c059f0827cd758f4a3428c879), [`ad00080`](https://github.com/scaleway/ultraviolet/commit/ad0008075e57d73fda7e25d288d27420fe395ccf), [`6a7ec72`](https://github.com/scaleway/ultraviolet/commit/6a7ec7286ae10880695d2a9a7fc2a0fbaaf7cf68), [`9e2215d`](https://github.com/scaleway/ultraviolet/commit/9e2215df8a6a31c11ec02e896a1fab6131917290)]:
  - @ultraviolet/ui@1.45.0

## 0.10.6

### Patch Changes

- [#3576](https://github.com/scaleway/ultraviolet/pull/3576) [`e695eee`](https://github.com/scaleway/ultraviolet/commit/e695eee730766105ee238e4a85c1cc6f51b6f116) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.1`.
  Updated dependency `@babel/runtime` to `7.24.1`.
  Updated dependency `@babel/eslint-parser` to `7.24.1`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.1`.
  Updated dependency `@babel/preset-env` to `7.24.1`.
  Updated dependency `@babel/preset-react` to `7.24.1`.
  Updated dependency `@babel/preset-typescript` to `7.24.1`.
- Updated dependencies [[`51b9ec5`](https://github.com/scaleway/ultraviolet/commit/51b9ec53f873d462d4a57f0819a014ab544f364f), [`12415b1`](https://github.com/scaleway/ultraviolet/commit/12415b1f0d2c1511b5d50ac582bf9a96e5adcdd9), [`e695eee`](https://github.com/scaleway/ultraviolet/commit/e695eee730766105ee238e4a85c1cc6f51b6f116), [`167f96d`](https://github.com/scaleway/ultraviolet/commit/167f96d5158b80a211160a98af4d74169e7b56be)]:
  - @ultraviolet/ui@1.44.0

## 0.10.5

### Patch Changes

- [#3573](https://github.com/scaleway/ultraviolet/pull/3573) [`117fefa`](https://github.com/scaleway/ultraviolet/commit/117fefa3867c5ecfee6956a777abb44d2b8886b6) Thanks [@fabienhebert](https://github.com/fabienhebert)! - NumberInputV2: fix empty value behavior

- Updated dependencies [[`117fefa`](https://github.com/scaleway/ultraviolet/commit/117fefa3867c5ecfee6956a777abb44d2b8886b6), [`751c706`](https://github.com/scaleway/ultraviolet/commit/751c7065c32da5dba62a0a6e0fb5fb1a5e79588b), [`b1b6ea4`](https://github.com/scaleway/ultraviolet/commit/b1b6ea4793b978ccb76c93a9a3cdf23146c1f960)]:
  - @ultraviolet/ui@1.43.2

## 0.10.4

### Patch Changes

- Updated dependencies [[`1d836df`](https://github.com/scaleway/ultraviolet/commit/1d836dfe2e1ae570ce9a7e43cab44c5da4d1a388)]:
  - @ultraviolet/ui@1.43.1

## 0.10.3

### Patch Changes

- Updated dependencies [[`3fd16ed`](https://github.com/scaleway/ultraviolet/commit/3fd16edd65e34ac3e131b6bd88b01461900a90a8)]:
  - @ultraviolet/ui@1.43.0

## 0.10.2

### Patch Changes

- Updated dependencies [[`e20299c`](https://github.com/scaleway/ultraviolet/commit/e20299c35aa7f9ef0c083b1c1769ee38ff82c9c9), [`3dce91d`](https://github.com/scaleway/ultraviolet/commit/3dce91d56f3707e0a93c07ca4ba7762ab7dbaf09)]:
  - @ultraviolet/ui@1.42.0

## 0.10.1

### Patch Changes

- [#3532](https://github.com/scaleway/ultraviolet/pull/3532) [`c3ed184`](https://github.com/scaleway/ultraviolet/commit/c3ed184233eee36d4f5717f8a14bd14eb5955d3d) Thanks [@lisalupi](https://github.com/lisalupi)! - Refactor of `Icon` with new icons and variant and update of every component accordingly

- [#3544](https://github.com/scaleway/ultraviolet/pull/3544) [`04f46d8`](https://github.com/scaleway/ultraviolet/commit/04f46d81467a7da8d7d6a6a5399560444c14a049) Thanks [@philibea](https://github.com/philibea)! - remove z-index from EstimateCost Overlay component

- Updated dependencies [[`c3ed184`](https://github.com/scaleway/ultraviolet/commit/c3ed184233eee36d4f5717f8a14bd14eb5955d3d)]:
  - @ultraviolet/ui@1.41.1

## 0.10.0

### Minor Changes

- [#3549](https://github.com/scaleway/ultraviolet/pull/3549) [`4c8d467`](https://github.com/scaleway/ultraviolet/commit/4c8d46799452c9afbe5fc3a537ae27f32ced37c1) Thanks [@fabienhebert](https://github.com/fabienhebert)! - `EstimateCost.Region`: forward `hideFromOverlay` prop

## 0.9.0

### Minor Changes

- [#3510](https://github.com/scaleway/ultraviolet/pull/3510) [`1a44900`](https://github.com/scaleway/ultraviolet/commit/1a44900c00277a63d9419bbef1a8ea82e8d405ad) Thanks [@lisalupi](https://github.com/lisalupi)! - - New component `<SteppedListContainer>`
  - New props `prominence` and `onClick` to `<StepList>`

### Patch Changes

- Updated dependencies [[`3e9da5c`](https://github.com/scaleway/ultraviolet/commit/3e9da5c844e15cffbdd1f5958b732b15a88f1c41), [`14e2121`](https://github.com/scaleway/ultraviolet/commit/14e212107630fc72ffee819a898554ea16cc6aaf), [`71fa38d`](https://github.com/scaleway/ultraviolet/commit/71fa38d83bc230d18384ef5a14f8c5edba956a55), [`a8f1e7b`](https://github.com/scaleway/ultraviolet/commit/a8f1e7b84299dd9929e7c6529eef07db1ea47957)]:
  - @ultraviolet/ui@1.41.0

## 0.8.6

### Patch Changes

- [#3517](https://github.com/scaleway/ultraviolet/pull/3517) [`0012b7d`](https://github.com/scaleway/ultraviolet/commit/0012b7d2c46d2a3fdad0afd308ea4e5e96e71875) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.61`.

- [#3522](https://github.com/scaleway/ultraviolet/pull/3522) [`2914ba9`](https://github.com/scaleway/ultraviolet/commit/2914ba9db8eb3058b17a3105dae31a0312dbfde5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.24.0`.
  Updated dependency `@babel/runtime` to `7.24.0`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.24.0`.
  Updated dependency `@babel/preset-env` to `7.24.0`.
- Updated dependencies [[`2ea29a7`](https://github.com/scaleway/ultraviolet/commit/2ea29a7e5903402655ab05cc5279701e5760e9cb), [`0012b7d`](https://github.com/scaleway/ultraviolet/commit/0012b7d2c46d2a3fdad0afd308ea4e5e96e71875), [`2914ba9`](https://github.com/scaleway/ultraviolet/commit/2914ba9db8eb3058b17a3105dae31a0312dbfde5), [`ebe4f91`](https://github.com/scaleway/ultraviolet/commit/ebe4f918405236317ac765fb886ca36fe1553b95)]:
  - @ultraviolet/ui@1.40.1

## 0.8.5

### Patch Changes

- [#3507](https://github.com/scaleway/ultraviolet/pull/3507) [`085ed55`](https://github.com/scaleway/ultraviolet/commit/085ed550df75506b658fa52240e9e3fa4f951a91) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@emotion/react` to `11.11.4`.

- Updated dependencies [[`116ec01`](https://github.com/scaleway/ultraviolet/commit/116ec01d909cb0851ed5aad571723aae1e83f0df), [`085ed55`](https://github.com/scaleway/ultraviolet/commit/085ed550df75506b658fa52240e9e3fa4f951a91)]:
  - @ultraviolet/ui@1.40.0

## 0.8.4

### Patch Changes

- [#3506](https://github.com/scaleway/ultraviolet/pull/3506) [`5902ed1`](https://github.com/scaleway/ultraviolet/commit/5902ed18cce71676391e3d4991ea567f1f95249f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.21.24`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.21.24`.
  Updated dependency `@uiw/react-codemirror` to `4.21.24`.

- [#3492](https://github.com/scaleway/ultraviolet/pull/3492) [`288cab8`](https://github.com/scaleway/ultraviolet/commit/288cab80143ba35616fc5cf1db717a562ec28c71) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.21.23`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.21.23`.
  Updated dependency `@uiw/react-codemirror` to `4.21.23`.
- Updated dependencies [[`71e24c7`](https://github.com/scaleway/ultraviolet/commit/71e24c7cc505bd1bcc2ed91478890aef5f8d6be8)]:
  - @ultraviolet/ui@1.39.0

## 0.8.3

### Patch Changes

- [#3502](https://github.com/scaleway/ultraviolet/pull/3502) [`3a2c771`](https://github.com/scaleway/ultraviolet/commit/3a2c7713528c388c508af6f9e85f0dee6eeb269a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.8.1`.

- [#3434](https://github.com/scaleway/ultraviolet/pull/3434) [`3400941`](https://github.com/scaleway/ultraviolet/commit/3400941dceaf45bdf477a4010da0c2c3cc70a06a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.55`.
  Updated dependency `@types/react-dom` to `18.2.19`.
- Updated dependencies [[`3303a8a`](https://github.com/scaleway/ultraviolet/commit/3303a8a8999ab0f022d7df4ede4e964e9bc36f7a), [`3400941`](https://github.com/scaleway/ultraviolet/commit/3400941dceaf45bdf477a4010da0c2c3cc70a06a)]:
  - @ultraviolet/ui@1.38.0

## 0.8.2

### Patch Changes

- [#3487](https://github.com/scaleway/ultraviolet/pull/3487) [`1afcd50`](https://github.com/scaleway/ultraviolet/commit/1afcd50d7c39001572998fac1d36f86afcf1d1f9) Thanks [@matthprost](https://github.com/matthprost)! - Fix multiple inputs that has bug when required and not label set the required icon was staying:
  - `<NumberInputV2 />`
  - `<TagInput />`
  - `<TextArea />`
  - `<TextInputV2 />`
  - `<DateInput />`
- Updated dependencies [[`2fbc604`](https://github.com/scaleway/ultraviolet/commit/2fbc604581b72377210daae29c1c9985a548dcad), [`4a3f3f4`](https://github.com/scaleway/ultraviolet/commit/4a3f3f4dd698a8b00baff37288b297907f568bdd), [`1afcd50`](https://github.com/scaleway/ultraviolet/commit/1afcd50d7c39001572998fac1d36f86afcf1d1f9)]:
  - @ultraviolet/ui@1.37.1

## 0.8.1

### Patch Changes

- [#3478](https://github.com/scaleway/ultraviolet/pull/3478) [`54b97c6`](https://github.com/scaleway/ultraviolet/commit/54b97c6bdd80a97aa7038fabbaf65d9cfc336532) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.21.22`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.21.22`.
  Updated dependency `@uiw/react-codemirror` to `4.21.22`.
- Updated dependencies [[`656e0bb`](https://github.com/scaleway/ultraviolet/commit/656e0bb9a6eaeafae844a3fa2c13e242219161e9), [`6042654`](https://github.com/scaleway/ultraviolet/commit/60426545837829008f5b0550fc1f22fa14e8e678), [`5615de4`](https://github.com/scaleway/ultraviolet/commit/5615de48ef162b32c3a43836bbad11c942afe55a), [`8d64a1a`](https://github.com/scaleway/ultraviolet/commit/8d64a1a66ecbc131a191ddf883884b86d368f42c), [`398822d`](https://github.com/scaleway/ultraviolet/commit/398822d39f20a502d59e17f8ca375f3ad13a5e07)]:
  - @ultraviolet/ui@1.37.0
  - @ultraviolet/themes@1.9.0

## 0.8.0

### Minor Changes

- [#3466](https://github.com/scaleway/ultraviolet/pull/3466) [`9cac538`](https://github.com/scaleway/ultraviolet/commit/9cac5381230f134841ca298fd53f624140f07fde) Thanks [@lisalupi](https://github.com/lisalupi)! - Add component `FAQ` to ultraviolet plus

## 0.7.2

### Patch Changes

- Updated dependencies [[`0e2ad05`](https://github.com/scaleway/ultraviolet/commit/0e2ad053edcb8c9eed094543f2415e292525590d), [`8be31ae`](https://github.com/scaleway/ultraviolet/commit/8be31ae84810bd2f8dd95ffc441c123c95a44b51)]:
  - @ultraviolet/ui@1.36.0

## 0.7.1

### Patch Changes

- Updated dependencies [[`c483fff`](https://github.com/scaleway/ultraviolet/commit/c483fffbbfefc55eb7c59ad4f863b7132674d006)]:
  - @ultraviolet/ui@1.35.0

## 0.7.0

### Minor Changes

- [#3452](https://github.com/scaleway/ultraviolet/pull/3452) [`be011be`](https://github.com/scaleway/ultraviolet/commit/be011be7e20d18202083012c1bbe4fc77bff736c) Thanks [@lisalupi](https://github.com/lisalupi)! - New component `Conversation`

### Patch Changes

- [#3454](https://github.com/scaleway/ultraviolet/pull/3454) [`f3bfaa5`](https://github.com/scaleway/ultraviolet/commit/f3bfaa599db39fa1aa884d061d4290ae59aaa5cd) Thanks [@DorianMaliszewski](https://github.com/DorianMaliszewski)! - fix(ContentCard): fix role when onClick and href is provided

## 0.6.15

### Patch Changes

- [#3450](https://github.com/scaleway/ultraviolet/pull/3450) [`63d20e7`](https://github.com/scaleway/ultraviolet/commit/63d20e7e66752a2b8f147ccb47f635af513010e1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.8.0`.

- Updated dependencies [[`e78475a`](https://github.com/scaleway/ultraviolet/commit/e78475a6f944c46701f4ffcbaceead1e54eff8e0)]:
  - @ultraviolet/ui@1.34.0

## 0.6.14

### Patch Changes

- Updated dependencies [[`5c9df3e`](https://github.com/scaleway/ultraviolet/commit/5c9df3e3687395909b2183619a2e3314b2dcb13b)]:
  - @ultraviolet/ui@1.33.0

## 0.6.13

### Patch Changes

- [#3447](https://github.com/scaleway/ultraviolet/pull/3447) [`119b913`](https://github.com/scaleway/ultraviolet/commit/119b9139bcf75e542017f76c5349cb01c853e0b9) Thanks [@vincentaudebert](https://github.com/vincentaudebert)! - Fix `<EstimateCost />` component, alertTitle prop was not forwarded

## 0.6.12

### Patch Changes

- [#3446](https://github.com/scaleway/ultraviolet/pull/3446) [`e6edfa6`](https://github.com/scaleway/ultraviolet/commit/e6edfa6acf5c06d27d5576a22c571cbaaa2afc16) Thanks [@vincentaudebert](https://github.com/vincentaudebert)! - Fix `<EstimateCost />` component, discount value was missing in the overlay

- [#3437](https://github.com/scaleway/ultraviolet/pull/3437) [`6eae25a`](https://github.com/scaleway/ultraviolet/commit/6eae25a6a5780bb1d4f2420dcfea2ebc9a18843b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.7.0`.

## 0.6.11

### Patch Changes

- Updated dependencies [[`fbd0141`](https://github.com/scaleway/ultraviolet/commit/fbd014187a47bd2bfe8e22ad58af34bc70a0deb5)]:
  - @ultraviolet/ui@1.32.2

## 0.6.10

### Patch Changes

- Updated dependencies [[`14f6440`](https://github.com/scaleway/ultraviolet/commit/14f6440cb5c633dc36977faa131b74490f584f49)]:
  - @ultraviolet/ui@1.32.1

## 0.6.9

### Patch Changes

- [#3402](https://github.com/scaleway/ultraviolet/pull/3402) [`6d6e5e4`](https://github.com/scaleway/ultraviolet/commit/6d6e5e4629b15a2e1a0d547541ba3ef17aa5b0d3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.52`.

- [#3418](https://github.com/scaleway/ultraviolet/pull/3418) [`e311042`](https://github.com/scaleway/ultraviolet/commit/e311042e0af9849c12ff0440617f681308245d9a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.6.0`.

- [#3400](https://github.com/scaleway/ultraviolet/pull/3400) [`7cf9be7`](https://github.com/scaleway/ultraviolet/commit/7cf9be78c513b221f188e8c8d5bb7ca50b0eeb6f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `react-intersection-observer` to `9.5.4`.

- Updated dependencies [[`ee2f4a5`](https://github.com/scaleway/ultraviolet/commit/ee2f4a593b4cb97de3a00170b8d129c0721f3fc7), [`80f6ed6`](https://github.com/scaleway/ultraviolet/commit/80f6ed6890504faa28885552b677bb13e0295da8), [`75cfcfa`](https://github.com/scaleway/ultraviolet/commit/75cfcfa42c3d1ce662fa67552e59f01f6f944969), [`6d6e5e4`](https://github.com/scaleway/ultraviolet/commit/6d6e5e4629b15a2e1a0d547541ba3ef17aa5b0d3), [`70fda53`](https://github.com/scaleway/ultraviolet/commit/70fda5326c64340ff6db11670bac8f10358ef3a6), [`6c134b4`](https://github.com/scaleway/ultraviolet/commit/6c134b4e213edcd53cf40f043096a04419f09212)]:
  - @ultraviolet/ui@1.32.0

## 0.6.8

### Patch Changes

- [#3399](https://github.com/scaleway/ultraviolet/pull/3399) [`ba87606`](https://github.com/scaleway/ultraviolet/commit/ba876069b502f525189f0e6a3ba9421778d74e6a) Thanks [@matthprost](https://github.com/matthprost)! - Fix `EstimateCost.NumberInput` to be able to remove fully the content

- [#3396](https://github.com/scaleway/ultraviolet/pull/3396) [`958ca76`](https://github.com/scaleway/ultraviolet/commit/958ca769620795b3232dfcfac2727ad9faefe240) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `SelectInput` required icon to stay with danger sentiment
  - Fix `TimeField` to pass `noTopLabel` prop
- Updated dependencies [[`4662905`](https://github.com/scaleway/ultraviolet/commit/4662905fc479a97a1dacbede8fceeef917b4180f), [`958ca76`](https://github.com/scaleway/ultraviolet/commit/958ca769620795b3232dfcfac2727ad9faefe240)]:
  - @ultraviolet/ui@1.31.7

## 0.6.7

### Patch Changes

- Updated dependencies [[`90785f5`](https://github.com/scaleway/ultraviolet/commit/90785f50f81f73f415bda96364a1294baf4a1dfb), [`2c56a48`](https://github.com/scaleway/ultraviolet/commit/2c56a489cf94738a09bb4ae743f2b1952c6f98b2)]:
  - @ultraviolet/ui@1.31.6

## 0.6.6

### Patch Changes

- [#3365](https://github.com/scaleway/ultraviolet/pull/3365) [`126b7e9`](https://github.com/scaleway/ultraviolet/commit/126b7e98941dc99eebb01097d4fcaf3cafa033ce) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<EstimateCost />` time unit spacing on firefox

- [#3378](https://github.com/scaleway/ultraviolet/pull/3378) [`a5eff2a`](https://github.com/scaleway/ultraviolet/commit/a5eff2ad4264dcf56c3b44b28d3f84acd0f849b6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.9`.
  Updated dependency `@babel/runtime` to `7.23.9`.
  Updated dependency `@babel/eslint-parser` to `7.23.9`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.9`.
  Updated dependency `@babel/preset-env` to `7.23.9`.
- Updated dependencies [[`b492e36`](https://github.com/scaleway/ultraviolet/commit/b492e36ae2f540bed61458993b6baa8db2444a24), [`c1dfb10`](https://github.com/scaleway/ultraviolet/commit/c1dfb103f5b149e6b7483d0c271536fed59a7a09), [`a5eff2a`](https://github.com/scaleway/ultraviolet/commit/a5eff2ad4264dcf56c3b44b28d3f84acd0f849b6), [`75a8424`](https://github.com/scaleway/ultraviolet/commit/75a8424b2da80cc9eb2083b9b7e6b0db7b496b1b)]:
  - @ultraviolet/themes@1.8.0
  - @ultraviolet/ui@1.31.5

## 0.6.5

### Patch Changes

- [#3372](https://github.com/scaleway/ultraviolet/pull/3372) [`2ab58ef`](https://github.com/scaleway/ultraviolet/commit/2ab58efd55530673da91d50042c5eb014ebad446) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.48`.

- Updated dependencies [[`c2e824e`](https://github.com/scaleway/ultraviolet/commit/c2e824efe7f875b9f917b946c2b4575f82132240), [`2ab58ef`](https://github.com/scaleway/ultraviolet/commit/2ab58efd55530673da91d50042c5eb014ebad446)]:
  - @ultraviolet/ui@1.31.4

## 0.6.4

### Patch Changes

- [#3301](https://github.com/scaleway/ultraviolet/pull/3301) [`a13c6a7`](https://github.com/scaleway/ultraviolet/commit/a13c6a7ce3e712ef7788ac7219434b723a7983e0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.47`.

- Updated dependencies [[`740915c`](https://github.com/scaleway/ultraviolet/commit/740915c2111c49c77e10679bc48dc006f0c589b0), [`08fa9b5`](https://github.com/scaleway/ultraviolet/commit/08fa9b5a68ff52b68cd5ff68e8965be1ae29359f), [`a13c6a7`](https://github.com/scaleway/ultraviolet/commit/a13c6a7ce3e712ef7788ac7219434b723a7983e0), [`f59a7b2`](https://github.com/scaleway/ultraviolet/commit/f59a7b270dd90fd5ed5893abf0e8ae5afcd1a8d2)]:
  - @ultraviolet/ui@1.31.3

## 0.6.3

### Patch Changes

- Updated dependencies [[`4be9628`](https://github.com/scaleway/ultraviolet/commit/4be96287e93eb0990c8cd6e0f92a8ef364a3e66e)]:
  - @ultraviolet/ui@1.31.2

## 0.6.2

### Patch Changes

- [#3333](https://github.com/scaleway/ultraviolet/pull/3333) [`56ffe3b`](https://github.com/scaleway/ultraviolet/commit/56ffe3b110c384c3cda3daa7ceaeeb8fd4db799b) Thanks [@matthprost](https://github.com/matthprost)! - Remove usages of `createRef` to use only `useRef`

- [#3328](https://github.com/scaleway/ultraviolet/pull/3328) [`1237885`](https://github.com/scaleway/ultraviolet/commit/1237885bd348b6a48207a8eba30f45cff0cfa7f3) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<CUstomerSatisfaction />`

- Updated dependencies [[`9db896c`](https://github.com/scaleway/ultraviolet/commit/9db896cda9486fab624c35c00b25e529aa5a0c6d), [`56ffe3b`](https://github.com/scaleway/ultraviolet/commit/56ffe3b110c384c3cda3daa7ceaeeb8fd4db799b)]:
  - @ultraviolet/ui@1.31.1

## 0.6.1

### Patch Changes

- [#3317](https://github.com/scaleway/ultraviolet/pull/3317) [`5e4ee53`](https://github.com/scaleway/ultraviolet/commit/5e4ee53f33aaa4098e0cc55f00f182bdf6f68902) Thanks [@matthprost](https://github.com/matthprost)! - Remove useless props spread to dom for `<EstimateCost />`

- Updated dependencies [[`718fc59`](https://github.com/scaleway/ultraviolet/commit/718fc5990087e262912af121c46c39a6b11fa6a2), [`0c04608`](https://github.com/scaleway/ultraviolet/commit/0c04608dcc1dcc4b05e78ff184e24309d2964e72), [`5e4ee53`](https://github.com/scaleway/ultraviolet/commit/5e4ee53f33aaa4098e0cc55f00f182bdf6f68902), [`95b71bf`](https://github.com/scaleway/ultraviolet/commit/95b71bfe96218975c9dc986e2f2af8ff299746c6)]:
  - @ultraviolet/ui@1.31.0

## 0.6.0

### Minor Changes

- [#3295](https://github.com/scaleway/ultraviolet/pull/3295) [`f65dccd`](https://github.com/scaleway/ultraviolet/commit/f65dccdce849c7a07d5cc1baced0fdbc51495fad) Thanks [@scaleway-bot](https://github.com/scaleway-bot)! - New typography headings in tokens

### Patch Changes

- [#3270](https://github.com/scaleway/ultraviolet/pull/3270) [`829e304`](https://github.com/scaleway/ultraviolet/commit/829e304b8bc44451cace7810c5db117d112895e4) Thanks [@philibea](https://github.com/philibea)! - add customer satisfaction component

- Updated dependencies [[`f65dccd`](https://github.com/scaleway/ultraviolet/commit/f65dccdce849c7a07d5cc1baced0fdbc51495fad)]:
  - @ultraviolet/themes@1.7.0
  - @ultraviolet/ui@1.30.0

## 0.5.10

### Patch Changes

- [#3291](https://github.com/scaleway/ultraviolet/pull/3291) [`a82cda0`](https://github.com/scaleway/ultraviolet/commit/a82cda0ec4a11fb7a3b4d50da391b2b161e65ce1) Thanks [@Lawndlwd](https://github.com/Lawndlwd)! - Adjust the estimated cost condition to control the visibility of the description

- Updated dependencies [[`db889ce`](https://github.com/scaleway/ultraviolet/commit/db889ce0dd85d8eac323b25c8ad6d4b01c070f2e)]:
  - @ultraviolet/ui@1.29.4

## 0.5.9

### Patch Changes

- [#3290](https://github.com/scaleway/ultraviolet/pull/3290) [`9b57f52`](https://github.com/scaleway/ultraviolet/commit/9b57f523a5153448ea2dd0a6c227e1aead9a3365) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.7`.
  Updated dependency `@babel/runtime` to `7.23.7`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.7`.
  Updated dependency `@babel/preset-env` to `7.23.7`.
- Updated dependencies [[`9b57f52`](https://github.com/scaleway/ultraviolet/commit/9b57f523a5153448ea2dd0a6c227e1aead9a3365), [`97f4a2c`](https://github.com/scaleway/ultraviolet/commit/97f4a2cb57bc1a9d27815c75214d05eb264afffc), [`149e900`](https://github.com/scaleway/ultraviolet/commit/149e9004ad0473e5f1aebcea7124bfec97313261)]:
  - @ultraviolet/ui@1.29.3

## 0.5.8

### Patch Changes

- [#3262](https://github.com/scaleway/ultraviolet/pull/3262) [`5214374`](https://github.com/scaleway/ultraviolet/commit/521437477757bcab2acbc0d0f92b855690763412) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<EstimateCost.Unit />` increase the size of the unit and fix overflowing

- [#3237](https://github.com/scaleway/ultraviolet/pull/3237) [`63e55ab`](https://github.com/scaleway/ultraviolet/commit/63e55aba435fab09b90c0ef3cf5022a27851eb6c) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<EstimateCost />` unit input to be clearable completly

- Updated dependencies [[`5214374`](https://github.com/scaleway/ultraviolet/commit/521437477757bcab2acbc0d0f92b855690763412), [`27ed74a`](https://github.com/scaleway/ultraviolet/commit/27ed74a32c1a3639f09161beb49c5ed3d2726bfa), [`35e84a0`](https://github.com/scaleway/ultraviolet/commit/35e84a0467d44acdef0c951c502ed2c2ef9c413a)]:
  - @ultraviolet/ui@1.29.2
  - @ultraviolet/themes@1.6.0

## 0.5.7

### Patch Changes

- [#3250](https://github.com/scaleway/ultraviolet/pull/3250) [`df48b95`](https://github.com/scaleway/ultraviolet/commit/df48b95184de08f799eb8c9bad76ee0ab11e7de4) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.45`.
  Updated dependency `@types/react-dom` to `18.2.18`.
- Updated dependencies [[`5029e35`](https://github.com/scaleway/ultraviolet/commit/5029e35e9f73f356d874feea160dc2c0b119e0fa), [`ccbdcb9`](https://github.com/scaleway/ultraviolet/commit/ccbdcb90da3a245802431d6fc7f0ca851a63835f), [`df48b95`](https://github.com/scaleway/ultraviolet/commit/df48b95184de08f799eb8c9bad76ee0ab11e7de4)]:
  - @ultraviolet/ui@1.29.1

## 0.5.6

### Patch Changes

- [#3242](https://github.com/scaleway/ultraviolet/pull/3242) [`c9c9881`](https://github.com/scaleway/ultraviolet/commit/c9c98818f4bf94b0bf7019f8cbfd0f541c580f47) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.6`.
  Updated dependency `@babel/runtime` to `7.23.6`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.6`.
  Updated dependency `@babel/preset-env` to `7.23.6`.
- Updated dependencies [[`10c677f`](https://github.com/scaleway/ultraviolet/commit/10c677fd6eb97ed250cf739c322b6a758c3bd3d1), [`29e8c56`](https://github.com/scaleway/ultraviolet/commit/29e8c566927f7c4eef1ccab67431e3d1d1c97f25), [`c9c9881`](https://github.com/scaleway/ultraviolet/commit/c9c98818f4bf94b0bf7019f8cbfd0f541c580f47)]:
  - @ultraviolet/ui@1.29.0

## 0.5.5

### Patch Changes

- [#3210](https://github.com/scaleway/ultraviolet/pull/3210) [`f077a9c`](https://github.com/scaleway/ultraviolet/commit/f077a9cdf14baf623e868e938185862472ad21b3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.43`.
  Updated dependency `@types/react-dom` to `18.2.17`.

- [#3227](https://github.com/scaleway/ultraviolet/pull/3227) [`d497ba6`](https://github.com/scaleway/ultraviolet/commit/d497ba6088496c64eaccd3e55644390f1e4b921d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.5`.
  Updated dependency `@babel/runtime` to `7.23.5`.
  Updated dependency `@babel/preset-env` to `7.23.5`.

- [#3229](https://github.com/scaleway/ultraviolet/pull/3229) [`51ee42a`](https://github.com/scaleway/ultraviolet/commit/51ee42a2796994e6aa072c8da8e2c5f32217a7c9) Thanks [@matthprost](https://github.com/matthprost)! - Fix EstimateCost when the discount is set to 0

- Updated dependencies [[`d20f2da`](https://github.com/scaleway/ultraviolet/commit/d20f2da0d1d137218d8ebd32ea3828e595fd77d2), [`4903820`](https://github.com/scaleway/ultraviolet/commit/49038205d25db2efc9dca152179407d6554b42ee), [`f077a9c`](https://github.com/scaleway/ultraviolet/commit/f077a9cdf14baf623e868e938185862472ad21b3), [`d497ba6`](https://github.com/scaleway/ultraviolet/commit/d497ba6088496c64eaccd3e55644390f1e4b921d), [`eea834d`](https://github.com/scaleway/ultraviolet/commit/eea834d585874b915d06798358ae8cef784c99e5), [`4900764`](https://github.com/scaleway/ultraviolet/commit/4900764288eaa13c16b5637e58cd0b2f5de4cce5)]:
  - @ultraviolet/ui@1.28.0

## 0.5.4

### Patch Changes

- [#3216](https://github.com/scaleway/ultraviolet/pull/3216) [`3df455e4`](https://github.com/scaleway/ultraviolet/commit/3df455e445495ed6a43f3550cef0403ad850eb34) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@uiw/codemirror-extensions-langs` to `4.21.21`.
  Updated dependency `@uiw/codemirror-theme-material` to `4.21.21`.
  Updated dependency `@uiw/react-codemirror` to `4.21.21`.
- Updated dependencies [[`997398d0`](https://github.com/scaleway/ultraviolet/commit/997398d0161da31e676973f4cb4519c7b35b2abd)]:
  - @ultraviolet/ui@1.27.3

## 0.5.3

### Patch Changes

- [#3207](https://github.com/scaleway/ultraviolet/pull/3207) [`1a4f472d`](https://github.com/scaleway/ultraviolet/commit/1a4f472dab9030e52e1fc0c485167768082226ec) Thanks [@matthprost](https://github.com/matthprost)! - Added missing props in EstimateCost

## 0.5.2

### Patch Changes

- [#3204](https://github.com/scaleway/ultraviolet/pull/3204) [`2b07d908`](https://github.com/scaleway/ultraviolet/commit/2b07d90850606239859cb757dd1275b40a1da11e) Thanks [@matthprost](https://github.com/matthprost)! - Fix estimate cost style and export default locales

- Updated dependencies [[`7f397e1c`](https://github.com/scaleway/ultraviolet/commit/7f397e1ca87a895f8b575d9748e632e5dd523e3b)]:
  - @ultraviolet/ui@1.27.2

## 0.5.1

### Patch Changes

- [#3202](https://github.com/scaleway/ultraviolet/pull/3202) [`af367959`](https://github.com/scaleway/ultraviolet/commit/af367959b47bda6ac4e448fef545d2f5ce25e6f1) Thanks [@matthprost](https://github.com/matthprost)! - Add missing export of EstimateCost

- Updated dependencies [[`2dd78d39`](https://github.com/scaleway/ultraviolet/commit/2dd78d394a2dea12011c3cf13b463308f0fc7e0b)]:
  - @ultraviolet/ui@1.27.1

## 0.5.0

### Minor Changes

- [#2984](https://github.com/scaleway/ultraviolet/pull/2984) [`e54a941a`](https://github.com/scaleway/ultraviolet/commit/e54a941a9f1843e10f9a438a08e426559bd55c5c) Thanks [@matthprost](https://github.com/matthprost)! - Add new component `<EstimateCost />`

### Patch Changes

- [#3188](https://github.com/scaleway/ultraviolet/pull/3188) [`437e367c`](https://github.com/scaleway/ultraviolet/commit/437e367c0a8d36af82a57d689796570522fc5829) Thanks [@matthprost](https://github.com/matthprost)! - - Fix `<ContentCardGroup />` height depending on the content
  - Change title from `bodyStronger` to `bodyStrong` on `<ContentCard />`
- Updated dependencies [[`5b88fc85`](https://github.com/scaleway/ultraviolet/commit/5b88fc856e94740ff024b527f375f25ab5c340ca), [`65ce94d5`](https://github.com/scaleway/ultraviolet/commit/65ce94d54fc63792b5c40a7ea558b4779cee96d8), [`a23bf3f8`](https://github.com/scaleway/ultraviolet/commit/a23bf3f842b2a4774e7fdd251df24352df296cf2), [`69134027`](https://github.com/scaleway/ultraviolet/commit/691340270327e319841da361ad4521b71e72555c)]:
  - @ultraviolet/ui@1.27.0

## 0.4.10

### Patch Changes

- Updated dependencies [[`623fa42f`](https://github.com/scaleway/ultraviolet/commit/623fa42f7100f5a23cd65c1dc2b7dd127a22ae6c), [`5fbf7727`](https://github.com/scaleway/ultraviolet/commit/5fbf772799c09fe34f0acbd7d7247fdde71a4f73)]:
  - @ultraviolet/ui@1.26.2

## 0.4.9

### Patch Changes

- [#3173](https://github.com/scaleway/ultraviolet/pull/3173) [`9839e1f8`](https://github.com/scaleway/ultraviolet/commit/9839e1f89ddfaded0ee07765cee998998bbe1ce1) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ContentCardGroup />` to fit inside a `<Row />`

## 0.4.8

### Patch Changes

- Updated dependencies [[`931d1c7c`](https://github.com/scaleway/ultraviolet/commit/931d1c7c360ff84350e8d6fb7ffba5d2b9ce9963), [`b14a53d9`](https://github.com/scaleway/ultraviolet/commit/b14a53d98c6ec5a777e282b7cc9b8b82afca4d1f)]:
  - @ultraviolet/ui@1.26.1

## 0.4.7

### Patch Changes

- [#3147](https://github.com/scaleway/ultraviolet/pull/3147) [`73fd455d`](https://github.com/scaleway/ultraviolet/commit/73fd455d685f8104f6e48943bd2edc412c8f4774) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.3`.
  Updated dependency `@babel/eslint-parser` to `7.23.3`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.3`.
  Updated dependency `@babel/preset-env` to `7.23.3`.
  Updated dependency `@babel/preset-react` to `7.23.3`.
  Updated dependency `@babel/preset-typescript` to `7.23.3`.
- Updated dependencies [[`b6e59335`](https://github.com/scaleway/ultraviolet/commit/b6e5933584b59d2f73d3880a7b02e89f0c94b116), [`73fd455d`](https://github.com/scaleway/ultraviolet/commit/73fd455d685f8104f6e48943bd2edc412c8f4774), [`e2e06f2f`](https://github.com/scaleway/ultraviolet/commit/e2e06f2f885cc24ce6bd4221596fd81c50176a84), [`58b643bc`](https://github.com/scaleway/ultraviolet/commit/58b643bcbba996e7817c01703c0cf332a0d91d01), [`4e76930d`](https://github.com/scaleway/ultraviolet/commit/4e76930d54833e033ef21357f0b444e82b3d08bb)]:
  - @ultraviolet/ui@1.26.0

## 0.4.6

### Patch Changes

- Updated dependencies [[`753555d5`](https://github.com/scaleway/ultraviolet/commit/753555d543976046b324d63e53b6567f4e8c0d5a), [`ce626d2f`](https://github.com/scaleway/ultraviolet/commit/ce626d2f0fc4c486068ce6998cb565bddc806fa4)]:
  - @ultraviolet/themes@1.5.0
  - @ultraviolet/ui@1.25.0

## 0.4.5

### Patch Changes

- [#3129](https://github.com/scaleway/ultraviolet/pull/3129) [`ea93383b`](https://github.com/scaleway/ultraviolet/commit/ea93383b467ba08a66ef4c5989ad02d983e299b1) Thanks [@matthprost](https://github.com/matthprost)! - Fix package json export index location

## 0.4.4

### Patch Changes

- [#3127](https://github.com/scaleway/ultraviolet/pull/3127) [`5025d38d`](https://github.com/scaleway/ultraviolet/commit/5025d38dc49dacc3a37c93fcb0f910c0a543fce1) Thanks [@matthprost](https://github.com/matthprost)! - Remove useless packages

## 0.4.3

### Patch Changes

- [#3125](https://github.com/scaleway/ultraviolet/pull/3125) [`3e7de2b2`](https://github.com/scaleway/ultraviolet/commit/3e7de2b2dd33577afd087af89379a3e214242721) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.37`.
  Updated dependency `@types/react-dom` to `18.2.15`.
- Updated dependencies [[`3e7de2b2`](https://github.com/scaleway/ultraviolet/commit/3e7de2b2dd33577afd087af89379a3e214242721)]:
  - @ultraviolet/ui@1.24.2

## 0.4.2

### Patch Changes

- [#3117](https://github.com/scaleway/ultraviolet/pull/3117) [`812a5447`](https://github.com/scaleway/ultraviolet/commit/812a54479cfa0843eb55f4ce25d009d84dc8c79f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@formatjs/ecma402-abstract` to `1.17.3`.
  Updated dependency `intl-messageformat` to `10.5.5`.

- [#3121](https://github.com/scaleway/ultraviolet/pull/3121) [`b515aa4d`](https://github.com/scaleway/ultraviolet/commit/b515aa4dfbbee08daa519f2e0aef8bc1eaa35eda) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ContentCard />` to have title and subtitle vertically centered aligned

## 0.4.1

### Patch Changes

- [#3108](https://github.com/scaleway/ultraviolet/pull/3108) [`a6a3eb0f`](https://github.com/scaleway/ultraviolet/commit/a6a3eb0fe587dea72def3ad465de0929c3d1ab70) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.34`.

- Updated dependencies [[`499d65f6`](https://github.com/scaleway/ultraviolet/commit/499d65f6c0510bd37c34f8cc24476a601cfaa6f3), [`a6a3eb0f`](https://github.com/scaleway/ultraviolet/commit/a6a3eb0fe587dea72def3ad465de0929c3d1ab70)]:
  - @ultraviolet/themes@1.4.0
  - @ultraviolet/ui@1.24.1

## 0.4.0

### Minor Changes

- [#3096](https://github.com/scaleway/ultraviolet/pull/3096) [`4535f192`](https://github.com/scaleway/ultraviolet/commit/4535f19264aa3331be6fcc8669318a939c5a0b58) Thanks [@fabienhebert](https://github.com/fabienhebert)! - new component `ContentCardGroup`

### Patch Changes

- Updated dependencies [[`eaf89db1`](https://github.com/scaleway/ultraviolet/commit/eaf89db14a8446af6409ed9a02d14ef26f93ca4b)]:
  - @ultraviolet/ui@1.24.0

## 0.3.3

### Patch Changes

- [#3095](https://github.com/scaleway/ultraviolet/pull/3095) [`747fb898`](https://github.com/scaleway/ultraviolet/commit/747fb8981cffbd3eea341c4220d45b6b44a35f92) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.33`.

- Updated dependencies [[`6349e4e3`](https://github.com/scaleway/ultraviolet/commit/6349e4e303153558d1a0535557013e25356341c1), [`e46396a2`](https://github.com/scaleway/ultraviolet/commit/e46396a23c0f502fd9a84cd9a8d7515072f44000), [`747fb898`](https://github.com/scaleway/ultraviolet/commit/747fb8981cffbd3eea341c4220d45b6b44a35f92)]:
  - @ultraviolet/ui@1.23.0

## 0.3.2

### Patch Changes

- Updated dependencies [[`625692c3`](https://github.com/scaleway/ultraviolet/commit/625692c3327b84df4cf378cad5501105eef676ce), [`88ec8f4c`](https://github.com/scaleway/ultraviolet/commit/88ec8f4ca3692245e49278d66e26fe9b6dcd1030), [`fdc513b5`](https://github.com/scaleway/ultraviolet/commit/fdc513b557b1807cedf5f8554b81cc39d23f44d3), [`70e36110`](https://github.com/scaleway/ultraviolet/commit/70e361106a80a4f4a1b59052306168893bd36d1b)]:
  - @ultraviolet/ui@1.22.0

## 0.3.1

### Patch Changes

- [#3072](https://github.com/scaleway/ultraviolet/pull/3072) [`45652fea`](https://github.com/scaleway/ultraviolet/commit/45652fea602ac763e741b954ba152fff94e17889) Thanks [@matthprost](https://github.com/matthprost)! - Fix `<ContentCard />` component color usage on title and description

- Updated dependencies [[`9d985b8f`](https://github.com/scaleway/ultraviolet/commit/9d985b8fd02dd283d6e1d5d6d4a5333a25212cf5), [`2e60a083`](https://github.com/scaleway/ultraviolet/commit/2e60a08383351c63789bb6692dc202d36abc8af9)]:
  - @ultraviolet/ui@1.21.1

## 0.3.0

### Minor Changes

- [#3071](https://github.com/scaleway/ultraviolet/pull/3071) [`5d7da681`](https://github.com/scaleway/ultraviolet/commit/5d7da681ea352a80b821fcf1be9d029e8c23869c) Thanks [@matthprost](https://github.com/matthprost)! - New font `Inter` added into the theme. The font will fall back on `Asap` until next major. In the meaning time you can start importing and using `Inter`.

### Patch Changes

- [#3062](https://github.com/scaleway/ultraviolet/pull/3062) [`7d00e109`](https://github.com/scaleway/ultraviolet/commit/7d00e1095709ce2f4374a355b58a6edfea0fbac6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.31`.
  Updated dependency `@types/react-dom` to `18.2.14`.
- Updated dependencies [[`064d44f3`](https://github.com/scaleway/ultraviolet/commit/064d44f39f73d825a3300001b12afe26188c3fa8), [`74c4bc83`](https://github.com/scaleway/ultraviolet/commit/74c4bc8357ec4eaed1894305ce10e170b9df9f56), [`7d00e109`](https://github.com/scaleway/ultraviolet/commit/7d00e1095709ce2f4374a355b58a6edfea0fbac6), [`4e73b96d`](https://github.com/scaleway/ultraviolet/commit/4e73b96d747604b9631ba5d7a53e80e1627c75be), [`5d7da681`](https://github.com/scaleway/ultraviolet/commit/5d7da681ea352a80b821fcf1be9d029e8c23869c)]:
  - @ultraviolet/themes@1.3.0
  - @ultraviolet/ui@1.21.0

## 0.2.2

### Patch Changes

- Updated dependencies [[`cc8bce1d`](https://github.com/scaleway/ultraviolet/commit/cc8bce1d0fc7f326d19d6f55173f2cf386079d23)]:
  - @ultraviolet/ui@1.20.2

## 0.2.1

### Patch Changes

- Updated dependencies [[`3927d9ad`](https://github.com/scaleway/ultraviolet/commit/3927d9ada21b57c6e9ec78ef356f528d82275996)]:
  - @ultraviolet/ui@1.20.1

## 0.2.0

### Minor Changes

- [#3037](https://github.com/scaleway/ultraviolet/pull/3037) [`be20d1a1`](https://github.com/scaleway/ultraviolet/commit/be20d1a125b139c94acd0e341aad5354bdfba2b1) Thanks [@philibea](https://github.com/philibea)! - New component `<CodeEditor />`

### Patch Changes

- [#3031](https://github.com/scaleway/ultraviolet/pull/3031) [`25617eca`](https://github.com/scaleway/ultraviolet/commit/25617ecaabd2eee8c93a2b18e5091b05ff1df669) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@types/react` to `18.2.28`.
  Updated dependency `@types/react-dom` to `18.2.13`.

- [#3038](https://github.com/scaleway/ultraviolet/pull/3038) [`aadd4845`](https://github.com/scaleway/ultraviolet/commit/aadd4845680c771211fb124f82e7f412015b13a0) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `intl-messageformat` to `10.5.4`.

- [#3036](https://github.com/scaleway/ultraviolet/pull/3036) [`018c1e13`](https://github.com/scaleway/ultraviolet/commit/018c1e13e5412223d254b1124fc7adeda3c06a34) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `international-types` to `0.8.1`.

- [#3026](https://github.com/scaleway/ultraviolet/pull/3026) [`49a72ac9`](https://github.com/scaleway/ultraviolet/commit/49a72ac9c0ea61ee552e5b74251c8eeb8239126d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `@babel/core` to `7.23.2`.
  Updated dependency `@babel/plugin-transform-runtime` to `7.23.2`.
  Updated dependency `@babel/preset-env` to `7.23.2`.
- Updated dependencies [[`7364c97f`](https://github.com/scaleway/ultraviolet/commit/7364c97fb31435817ccf7e9bc78cd3ec9b2e6703), [`dcb99f39`](https://github.com/scaleway/ultraviolet/commit/dcb99f39b00cbf50f9763d37b71d4b3b0fdbf248), [`b232bff4`](https://github.com/scaleway/ultraviolet/commit/b232bff46ba7248283a8ab8f38429269c058ca09), [`3b01b130`](https://github.com/scaleway/ultraviolet/commit/3b01b1308db15430074fe47a9f1b694a25ed171b), [`1c89ebde`](https://github.com/scaleway/ultraviolet/commit/1c89ebde6e57de5dfa574df098c0f7fc45f6cd0a), [`25617eca`](https://github.com/scaleway/ultraviolet/commit/25617ecaabd2eee8c93a2b18e5091b05ff1df669), [`1e4705d5`](https://github.com/scaleway/ultraviolet/commit/1e4705d5f36bae7474c941beee8fd60c06842671), [`49a72ac9`](https://github.com/scaleway/ultraviolet/commit/49a72ac9c0ea61ee552e5b74251c8eeb8239126d)]:
  - @ultraviolet/ui@1.20.0

## 0.1.3

### Patch Changes

- [#3020](https://github.com/scaleway/ultraviolet/pull/3020) [`3c4e3ccf`](https://github.com/scaleway/ultraviolet/commit/3c4e3ccfcc1d315f7ced005072af79d1ef1f5014) Thanks [@matthprost](https://github.com/matthprost)! - Replace title text variant from `bodyStrong` to `bodyStronger`

- Updated dependencies [[`e9b4ade5`](https://github.com/scaleway/ultraviolet/commit/e9b4ade5cbcba41248b273daf87fc63b6a3e1d4a), [`37998cf7`](https://github.com/scaleway/ultraviolet/commit/37998cf74de0ce658ee107443b4ecd327434700a), [`a789422d`](https://github.com/scaleway/ultraviolet/commit/a789422dcc5103d9b3e3ea3865c9430d0f690e17)]:
  - @ultraviolet/ui@1.19.0

## 0.1.2

### Patch Changes

- [#3015](https://github.com/scaleway/ultraviolet/pull/3015) [`2545037c`](https://github.com/scaleway/ultraviolet/commit/2545037c55fce56a7ff7e3fcc1f21576d37f8ca8) Thanks [@matthprost](https://github.com/matthprost)! - `<ContentCard />` component to take full height

## 0.1.1

### Patch Changes

- Updated dependencies []:
  - @ultraviolet/ui@1.18.1

## 0.1.0

### Minor Changes

- [#2982](https://github.com/scaleway/ultraviolet/pull/2982) [`d21064ed`](https://github.com/scaleway/ultraviolet/commit/d21064ed415f85b8f3c2f1b452b386359279d2f5) Thanks [@matthprost](https://github.com/matthprost)! - New library and introduction of new component `<ContentCard />`

### Patch Changes

- Updated dependencies [[`d21064ed`](https://github.com/scaleway/ultraviolet/commit/d21064ed415f85b8f3c2f1b452b386359279d2f5), [`86e7cf78`](https://github.com/scaleway/ultraviolet/commit/86e7cf78edf39e6e73e6c58f1ade7d53d05096d7), [`5e857dc7`](https://github.com/scaleway/ultraviolet/commit/5e857dc70a89b7317df183e44c89dbae38dd7637), [`8afda3ae`](https://github.com/scaleway/ultraviolet/commit/8afda3ae9c4cf52862703592d6bda7516c2e5e4d), [`a79bf17a`](https://github.com/scaleway/ultraviolet/commit/a79bf17a09da901e7735e354a6d386721103098c), [`1463f3e1`](https://github.com/scaleway/ultraviolet/commit/1463f3e18b3971cfbdac1bcda762952fc5b31bc1), [`cede2a7e`](https://github.com/scaleway/ultraviolet/commit/cede2a7eea4b61a342efccff63a6b3bdc84b8148), [`0ea3aadf`](https://github.com/scaleway/ultraviolet/commit/0ea3aadf0e9f3176026f6e0c649b076a58eb66d2), [`90504ba8`](https://github.com/scaleway/ultraviolet/commit/90504ba8232e979dd57fb8c06df2464f32600f10)]:
  - @ultraviolet/ui@1.18.0
