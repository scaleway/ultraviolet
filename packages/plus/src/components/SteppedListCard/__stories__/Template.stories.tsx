import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { blockStorageWire } from '@ultraviolet/illustrations/products/blockStorage'
import { Checkbox, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { SteppedListContainer } from '..'

const StyledImage = styled.img`
  filter: invert();
`
export const Template: StoryFn<
  ComponentProps<typeof SteppedListContainer>
> = props => {
  const [done, setDone] = useState([false, false, false])
  const theme = useTheme()

  const setDoneElement = (index: number) => {
    const doneI = [...done]
    doneI[index - 1] = !doneI[index - 1]
    setDone(doneI)
  }

  return (
    <SteppedListContainer {...props}>
      <SteppedListContainer.Card
        stepNumber={1}
        subHeader="First step"
        done={done[0]}
        image={
          theme.theme === 'light' ? (
            <StyledImage src={blockStorageWire} width={200} />
          ) : (
            <img src={blockStorageWire} width={200} alt="blockStorage" />
          )
        }
        nextButton
      >
        Description
        <Stack gap={2} direction="row">
          <Checkbox onChange={() => setDoneElement(1)} checked={done[0]}>
            Done
          </Checkbox>
        </Stack>
      </SteppedListContainer.Card>
      <SteppedListContainer.Card
        stepNumber={2}
        subHeader="Second step"
        done={done[1]}
        image={
          theme.theme === 'light' ? (
            <StyledImage src={blockStorageWire} width={200} />
          ) : (
            <img src={blockStorageWire} width={200} alt="blockStorage" />
          )
        }
        nextButton
        previousButton
      >
        Description step 2
        <Stack gap={2} direction="row">
          <Checkbox onChange={() => setDoneElement(2)} checked={done[1]}>
            Done
          </Checkbox>
        </Stack>
      </SteppedListContainer.Card>
      <SteppedListContainer.Card
        stepNumber={3}
        subHeader="Third step"
        done={done[2]}
        image={
          theme.theme === 'light' ? (
            <StyledImage src={blockStorageWire} width={200} />
          ) : (
            <img src={blockStorageWire} width={200} alt="blockStorage" />
          )
        }
        previousButton
      >
        Description step 3
        <Stack gap={2} direction="row">
          <Checkbox onChange={() => setDoneElement(3)} checked={done[2]}>
            Done
          </Checkbox>
        </Stack>
      </SteppedListContainer.Card>
    </SteppedListContainer>
  )
}

Template.args = {
  header: 'Header',
}
