import styled from '@emotion/styled'
import type { Story } from '@storybook/react'
import { Row } from '..'
import { Separator, Stack } from '../..'

const DivWithBackground = styled.div`
  background: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.primary.text};
`

export const AlignItems: Story = () => (
  <Stack gap={2}>
    <Row templateColumns="repeat(3, 1fr)">
      <DivWithBackground style={{ height: '100px' }}>
        100px height & default align
      </DivWithBackground>
      <DivWithBackground style={{ height: '50px' }}>
        50px height & default align
      </DivWithBackground>
      <DivWithBackground>auto height & default align</DivWithBackground>
    </Row>
    <Separator />
    <Row templateColumns="repeat(3, 1fr)" alignItems="center">
      <DivWithBackground style={{ height: '100px' }}>
        100px height & align center
      </DivWithBackground>
      <DivWithBackground style={{ height: '50px' }}>
        50px height & align center
      </DivWithBackground>
      <DivWithBackground>auto height & align center</DivWithBackground>
    </Row>
  </Stack>
)

AlignItems.parameters = {
  docs: {
    storyDescription:
      'You can use the prop `alignItems` to align each row elements',
  },
}
