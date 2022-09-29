import styled from '@emotion/styled'
import Stack from '..'
import { Template } from './Template'

export const Classname = Template.bind({})

const StyledStack = styled(Stack)`
  background: #aaa;
`

Classname.parameters = {
  docs: {
    storyDescription:
      'prop `Classname` allows to specify the html element className',
  },
}

Classname.decorators = [
  () => (
    <StyledStack gap={2} direction="row">
      <div style={{ background: '#DDD', padding: '8px' }}>First child</div>
      <div style={{ background: '#DDD', padding: '8px' }}>Second child</div>
      <div style={{ background: '#DDD', padding: '8px' }}>Third child</div>
    </StyledStack>
  ),
]
