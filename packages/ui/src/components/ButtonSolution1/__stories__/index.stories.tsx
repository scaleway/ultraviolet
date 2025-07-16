import type { Meta } from '@storybook/react'
import { ButtonSolution1 } from '..'
import styled from '@emotion/styled'

const StyledButton = styled(ButtonSolution1)`
  background-color: red;
  border-color: red;
`

export default {
  component: ButtonSolution1,
  title: 'Components/Action/ButtonSolution1',
} as Meta<typeof ButtonSolution1>

export const Playground = () => (
  <ButtonSolution1 sentiment="primary" variant="outlined">
    Button
  </ButtonSolution1>
)

export const WithStyled = () => (
  <StyledButton sentiment="primary" variant="strong">
    Button
  </StyledButton>
)
