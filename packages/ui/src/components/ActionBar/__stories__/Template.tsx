import styled from '@emotion/styled'
import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { ActionBar } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

const StyledFlexDiv = styled.div`
  display: flex;
  align-items: flex-end;
  text-align: right;
`

const FullHeightStack = styled(Stack)`
  height: 100%;
  padding: 0 ${({ theme }) => theme.space['2']};
`

export const Template: ComponentStory<typeof ActionBar> = args => {
  const [state, setState] = useState(false)

  const toggle = () => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, 5000)
  }

  return (
    <>
      <Button variant="primary" onClick={toggle}>
        Click on me to display
      </Button>
      {state ? (
        <ActionBar {...args}>
          <FullHeightStack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <div>I am the Playground Action Bar</div>
            <StyledFlexDiv>
              <Button action variant="warning-bordered" icon="delete" />
            </StyledFlexDiv>
          </FullHeightStack>
        </ActionBar>
      ) : null}
    </>
  )
}
