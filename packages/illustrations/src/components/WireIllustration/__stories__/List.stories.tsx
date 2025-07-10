import type { Decorator } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { WireIllustration } from '..'
import { ILLUSTRATIONS } from '../__generated__/Illustrations'

const illustrationKeys = Object.keys(ILLUSTRATIONS).filter(
  key => !key.startsWith('__') && key !== 'displayName',
)

export const List = (args: ComponentProps<typeof WireIllustration>) =>
  illustrationKeys.map(name => (
    <Stack direction="row" gap={1} alignItems="center" key={name}>
      <Stack direction="column" alignItems="start">
        <Stack direction="row" gap={1} alignItems="center">
          <WireIllustration
            {...args}
            name={name as ComponentProps<typeof WireIllustration>['name']}
          />
        </Stack>
      </Stack>
      <div style={{ width: '880px' }}>
        <Text as="code" variant="code">
          <Snippet>{`import { ${name} } from '@ultraviolet/illustrations'`}</Snippet>
        </Text>
      </div>
    </Stack>
  ))

List.args = {
  width: 200,
  height: 200,
}
List.decorators = [
  Story => (
    <Stack gap={1}>
      <Story />
    </Stack>
  ),
] as Decorator[]
