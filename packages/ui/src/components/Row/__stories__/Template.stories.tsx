import styled from '@emotion/styled'
import type { ComponentStory } from '@storybook/react'
import { Row } from '..'

const DivWithBackground = styled.div`
  background: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.primary.text};
`

export const Template: ComponentStory<typeof Row> = ({ ...props }) => (
  <Row {...props} templateColumns="3fr 6fr 3fr">
    <DivWithBackground>3fr | 3/12</DivWithBackground>
    <DivWithBackground>6fr | 6/12</DivWithBackground>
    <DivWithBackground>3fr | 3/12</DivWithBackground>
  </Row>
)
