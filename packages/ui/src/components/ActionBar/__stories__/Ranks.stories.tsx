import styled from '@emotion/styled'
import type { ComponentStory } from '@storybook/react'
import ActionBar from '..'
import Stack from '../../Stack'

const FullHeightStack = styled(Stack)`
  height: 100%;
  padding: 0 ${({ theme }) => theme.space['2']};
`

export const Ranks: ComponentStory<typeof ActionBar> = props => (
  <>
    <ActionBar {...props} rank={1}>
      <FullHeightStack alignItems="center" direction="row">
        I am an Action Bar with rank 1
      </FullHeightStack>
    </ActionBar>
    <ActionBar {...props} rank={2}>
      <FullHeightStack alignItems="center" direction="row">
        I am an Action Bar with rank 2
      </FullHeightStack>
    </ActionBar>
  </>
)

Ranks.parameters = {
  docs: {
    story: {
      description:
        'You can choose the order of multiple `ActionBar` by using the `rank` prop.',
    },
  },
}
