import type { Decorator } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import * as WireIllustration from '../__generated__'
import type { SupportPlansWire } from '../__generated__'

export const List = (args: ComponentProps<typeof SupportPlansWire>) =>
  Object.keys(WireIllustration).map(name => {
    const Illustration = WireIllustration[name as keyof typeof WireIllustration]

    return (
      <Stack direction="row" gap={1} alignItems="center" key={name}>
        <Stack direction="column" alignItems="start">
          <Stack direction="row" gap={1} alignItems="center">
            <Illustration {...args} />
          </Stack>
        </Stack>
        <div style={{ width: '880px' }}>
          <Text as="code" variant="code">
            <Snippet>{`import { ${name} } from '@ultraviolet/illustrations'`}</Snippet>
          </Text>
        </div>
      </Stack>
    )
  })

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
