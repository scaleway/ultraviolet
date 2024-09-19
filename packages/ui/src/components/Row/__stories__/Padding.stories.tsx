import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { Row } from '..'
import { Separator, Stack } from '../..'

const DivWithBackground = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.primary.text};
`
const StackWithBackground = styled(Stack)`
background-color: ${({ theme }) => theme.colors.primary.background};
`

export const Padding: StoryFn = args => (
  <StackWithBackground gap={0}>
    <Row {...args} templateColumns="1fr" padding="50px 0">
      <DivWithBackground>Padding-top and bottom: 50px</DivWithBackground>
    </Row>
    <Separator />
    <Row {...args} templateColumns="1fr" padding="0 50px">
      <DivWithBackground>Padding-left and right: 50px</DivWithBackground>
    </Row>
    <Separator />
    <Row {...args} templateColumns="1fr" padding="16px 32px 24px 8px">
      <DivWithBackground>
        Padding-left: 8px, padding-right: 32px, padding-top: 16px,
        padding-bottom: 24px;
      </DivWithBackground>
    </Row>
  </StackWithBackground>
)

Padding.parameters = {
  docs: {
    description: {
      story: 'You can use the prop `padding` to add a padding',
    },
  },
}
