import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { DeleteIcon } from '@ultraviolet/icons'
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

export const Template: StoryFn<typeof ActionBar> = args => {
  const [state, setState] = useState(false)

  const toggle = () => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, 5000)
  }

  return (
    <>
      <Button onClick={toggle}>Click on me to display</Button>
      {state ? (
        <ActionBar {...args}>
          <FullHeightStack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <div>I am the Playground Action Bar</div>
            <StyledFlexDiv>
              <Button variant="outlined" sentiment="danger" size="small">
                <DeleteIcon />
              </Button>
            </StyledFlexDiv>
          </FullHeightStack>
        </ActionBar>
      ) : null}
    </>
  )
}
