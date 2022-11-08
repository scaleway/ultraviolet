import styled from '@emotion/styled'
import { DecoratorFunction } from '@storybook/addons'
import { ComponentStory } from '@storybook/react'
import Separator from '..'

const StyledContainer = styled.div`
  display: inline-flex;
`

export const Direction: ComponentStory<typeof Separator> = args => (
  <>
    <div style={{ marginRight: 8 }}>left part</div>
    <Separator {...args} />
    <div style={{ marginLeft: 8 }}>right part</div>
  </>
)

Direction.args = {
  direction: 'vertical',
}

Direction.decorators = [
  Story => (
    <StyledContainer>
      <Story />
    </StyledContainer>
  ),
] as DecoratorFunction<JSX.Element>[]
