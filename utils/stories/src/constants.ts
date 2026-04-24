import * as components from '../../../packages/ui/src/components'
import * as compositions from '../../../packages/ui/src/compositions'

export const componentsNames = Object.keys(components)
export const compositionNames = Object.keys(compositions)

export const storiesComponentModules = componentsNames.map(
  async name =>
    import(
      `../../../packages/ui/src/components/${name}/__stories__/index.stories.tsx`
    ),
)

export const storiesCompositionsModules = compositionNames.map(
  async name =>
    import(
      `../../../packages/ui/src/compositions/${name}/__stories__/index.stories.tsx`
    ),
)
