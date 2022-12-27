import styled from '@emotion/styled'
import type { Meta } from '@storybook/react'
import { DateField, Form } from '../..'
import { mockErrors } from '../../../mocks'

const Container = styled.div`
  margin-bottom: 300px;
`
export default {
  component: DateField,
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
          'DateField is a component used in Form to pick a date. This component is a Wrapper of DateInput https://github.com/scaleway/scaleway-ui/tree/main/src/components/DateInput',
      },
    },
  },
  title: 'Components/Fields/DateField',
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { MinMaxDate } from './MinMaxDate.stories'
export { MinMaxDateWithTimeField } from './MinMaxWithTimeField.stories'
