import type { ComponentStoryParameters } from './AccessibilityAudit/types'

export type ComponentStoryModule = {
  default: {
    title: string
    parameters: ComponentStoryParameters
  }
}

export const storiesComponentModules = Object.values(
  import.meta.glob<ComponentStoryModule>('../../../packages/ui/src/components/**/__stories__/index.stories.tsx'),
).map(loader => loader())

export const storiesCompositionsModules = Object.values(
  import.meta.glob<ComponentStoryModule>('../../../packages/ui/src/compositions/**/__stories__/index.stories.tsx'),
).map(loader => loader())
