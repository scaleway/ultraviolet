import styled from '@emotion/styled'
import type { Decorator } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import * as Icon from '..'
import { Icon as Icons } from '../legacy'

const StyledText = styled(Text)`
  width: 70px;
`

const pascalToKebab = (str: string) =>
  str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1)

export const Name = (args: ComponentProps<(typeof Icon)['AddressIcon']>) =>
  Object.keys(Icon).map(name => {
    const FoundIcon = Icon[name as keyof typeof Icon]

    const isOutline = name.includes('Outline')

    const formattedName = name.replace('Icon', '').replace('Outline', '')

    return (
      <Stack direction="row" gap={1} alignItems="center" key={name}>
        <Stack direction="column" alignItems="start">
          <Stack direction="row" gap={1} alignItems="center">
            <StyledText as="span" variant="body">
              New:
            </StyledText>
            <FoundIcon {...args} size="small" />
            <FoundIcon {...args} size="large" />
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <StyledText as="span" variant="body">
              Legacy:
            </StyledText>
            <Icons
              name={
                pascalToKebab(formattedName) as ComponentProps<
                  typeof Icons
                >['name']
              }
              variant={isOutline ? 'outlined' : 'filled'}
              sentiment="neutral"
              size="small"
            />
            <Icons
              name={
                pascalToKebab(formattedName) as ComponentProps<
                  typeof Icons
                >['name']
              }
              variant={isOutline ? 'outlined' : 'filled'}
              sentiment="neutral"
              size="large"
            />
          </Stack>
        </Stack>
        <Snippet>{`import { ${name} } from '@ultraviolet/icons'`}</Snippet>
      </Stack>
    )
  })

Name.parameters = {
  docs: {
    description: {
      story:
        'Two type of icons are cohexisting awaiting for a major release. The legacy ones that should be avoided as much as possible as it will be removed later. And the new ones that are shown below with the correct way to import them. Both are shown here to check the render of both.',
    },
  },
}

Name.decorators = [
  Story => (
    <Stack gap={1}>
      <Story />
    </Stack>
  ),
] as Decorator[]
