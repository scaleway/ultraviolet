import styled from '@emotion/styled'
import type { ComponentStory } from '@storybook/react'
import ActionBar from '..'
import Button from '../../Button'
import Stack from '../../Stack'

const StyledStack = styled(Stack)`
  flex: 1;
`

const FullHeightStack = styled(Stack)`
  height: 100%;
  padding: 0 ${({ theme }) => theme.space['2']};
`

export const Template: ComponentStory<typeof ActionBar> = args => (
  <ActionBar {...args}>
    <FullHeightStack alignItems="center" direction="row">
      I am the Playground Action Bar
      <StyledStack alignItems="flex-end">
        <Button action variant="warning-bordered" icon="delete" />
      </StyledStack>
    </FullHeightStack>
  </ActionBar>
)
