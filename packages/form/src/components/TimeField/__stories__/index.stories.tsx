import styled from '@emotion/styled'
import type { Meta } from '@storybook/react'
import { Form, TimeField } from '../..'
import { mockErrors } from '../../../mocks'

const Container = styled.div`
  margin-bottom: 300px;
`
export default {
  component: TimeField,
  decorators: [
    ChildStory => (
      <Container>
        <Form onRawSubmit={() => {}} errors={mockErrors}>
          {ChildStory()}
        </Form>
      </Container>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'TimeField is a component used in Form to pick a date. This component is a Wrapper of DateInput https://github.com/scaleway/scaleway-ui/tree/main/src/components/DateInput',
      },
    },
  },
  title: 'Form/Components/Fields/TimeField',
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
