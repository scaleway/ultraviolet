import type { Decorator } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DEPRECATED_ICONS } from '../../../deprecatedIcons'
import * as Icon from '..'
import type { AddressIcon } from '../__generated__'

export const List = (args: ComponentProps<typeof AddressIcon>) =>
  Object.keys(Icon).map(name => {
    const FoundIcon = Icon[name as keyof typeof Icon]

    const deprecated = DEPRECATED_ICONS.find(icon => icon.name === name)

    return (
      <Stack direction="row" gap={1} alignItems="center" key={name}>
        <Stack direction="column" alignItems="start">
          <Stack direction="row" gap={1} alignItems="center">
            <FoundIcon {...args} size="small" />
            <FoundIcon {...args} size="large" />
          </Stack>
        </Stack>
        <div style={{ width: '880px' }}>
          <Text as="code" variant="code" strikeThrough={!!deprecated}>
            <Snippet>{`import { ${name} } from '@ultraviolet/icons'`}</Snippet>
          </Text>
        </div>
        {deprecated ? (
          <Text as="span" variant="bodySmall">
            <Text as="span" variant="bodySmallStrong" sentiment="danger">
              Deprecated:&nbsp;
            </Text>
            {deprecated.deprecatedReason}
          </Text>
        ) : null}
      </Stack>
    )
  })

List.parameters = {
  docs: {
    description: {
      story:
        'Two type of icons are cohexisting awaiting for a major release. The legacy ones that should be avoided as much as possible as it will be removed later. And the new ones that are shown below with the correct way to import them. Both are shown here to check the render of both.',
    },
  },
}

List.decorators = [
  Story => (
    <Stack gap={1}>
      <Story />
    </Stack>
  ),
] as Decorator[]
