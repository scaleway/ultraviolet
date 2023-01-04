import styled from '@emotion/styled'
import type { ComponentStory } from '@storybook/react'
import ActionBar from '..'

const FullHeightDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 ${({ theme }) => theme.space['2']};
`

export const Ranks: ComponentStory<typeof ActionBar> = props => (
  <>
    <ActionBar {...props} rank={1}>
      <FullHeightDiv>I am an Action Bar with rank 1</FullHeightDiv>
    </ActionBar>
    <ActionBar {...props} rank={2}>
      <FullHeightDiv>I am an Action Bar with rank 2</FullHeightDiv>
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
