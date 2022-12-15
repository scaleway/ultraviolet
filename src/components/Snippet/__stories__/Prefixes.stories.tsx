import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import Snippet from '../index'

const VALUE = `
pnpm add @scaleway/ui
pnpm install
pnpm start
`

export const Prefixes = (props: ComponentProps<typeof Snippet>) =>
  (['command', 'lines'] as const).map(suffix => (
    <Snippet {...props} prefix={suffix} />
  ))

Prefixes.args = {
  children: VALUE,
}

Prefixes.decorators = [
  StoryComponent => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      <StoryComponent />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]
