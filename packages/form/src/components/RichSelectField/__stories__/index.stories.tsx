import styled from '@emotion/styled'
import type { Meta } from '@storybook/react'
import { Form, RichSelectField } from '../..'
import { mockErrors } from '../../../mocks'

const Container = styled.div`
  min-height: 300px;
`

export default {
  component: RichSelectField,
  decorators: [
    ChildStory => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        <Container>{ChildStory()}</Container>
      </Form>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A rich select field',
      },
    },
  },
  title: 'Form/Components/Fields/RichSelectField',
} as Meta

export { Playground } from './Playground.stories'
export { Groups } from './Groups.stories'
