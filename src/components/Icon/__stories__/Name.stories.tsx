import styled from '@emotion/styled'
import { ComponentStory } from '@storybook/react'
import Icon, { icons } from '..'
import Stack from '../../Stack'

const StyledStack = styled(Stack)`
  font-size: ${({ theme }) => theme.typography.heading.fontSize};
`

export const Name: ComponentStory<typeof Icon> = args => (
  <>
    {icons.map(name => (
      <StyledStack key={name} direction="row" gap={2} alignItems="center">
        <Icon name={name} {...args} /> {name}
      </StyledStack>
    ))}
  </>
)

Name.parameters = {
  docs: {
    storyDescription: 'Set desired icon using `name` property.',
  },
}

Name.decorators = [
  Story => (
    <Stack gap={1}>
      <Story />
    </Stack>
  ),
]
