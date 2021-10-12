import { shouldMatchEmotionSnapshotWithPortal } from './jestHelpers'

export default shouldMatchEmotionSnapshotWithPortal

// /* eslint-disable import/no-extraneous-dependencies */
// import { createSerializer } from '@emotion/jest'
// import { RenderOptions, render } from '@testing-library/react'
// import { ReactNode } from 'react'
// import defaultTheme from '../theme'
// import renderWithTheme from './renderWithTheme'

// // use only class hash (generated from css style content)
// expect.addSnapshotSerializer(
//   createSerializer({ classNameReplacer: className => className }),
// )

// interface Options {
//   options?: RenderOptions
//   theme?: typeof defaultTheme
//   transform?: (node: ReturnType<typeof render>) => Promise<void> | void
// }

// export default async (
//   component: ReactNode,
//   { transform, options, theme }: Options = {},
// ): Promise<void> => {
//   // Save the instance of console (disable warning about adding element directly to document.body which is necessary when testing portal components)
//   const { console } = global
//   global.console = { ...console, error: jest.fn() }

//   const node = renderWithTheme(
//     component,
//     {
//       container: document.body,
//       ...options,
//     },
//     theme,
//   )
//   if (transform) await transform(node)
//   expect(node.asFragment()).toMatchSnapshot()

//   // Unmounting to don't see the warning message described above
//   node.unmount()
//   global.console = console
// }
