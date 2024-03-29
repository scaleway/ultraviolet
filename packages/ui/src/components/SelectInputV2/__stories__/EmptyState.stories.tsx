import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Template } from './Template.stories'

const StyledStack = styled(Stack)`
  padding: 30px;
`
const emptyStateText = (
  <StyledStack gap={2}>
    <Text variant="heading" as="h3">
      No options
    </Text>
    <Text variant="body" as="div">
      This is an example of custom EmptyState. You can customise it as you want
      and make it as detailed, long and pretty as you want.
    </Text>
    <Link
      iconPosition="right"
      href="https://storybook.ultraviolet.scaleway.com/?path=/docs/get-started--docs"
    >
      It is possible to add links, for instance.
    </Link>
  </StyledStack>
)

export const EmptyState: StoryFn<typeof SelectInputV2> = args => (
  <SelectInputV2 {...args} emptyState={emptyStateText} />
)
EmptyState.args = {
  ...Template.args,
  options: {},
}
EmptyState.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
