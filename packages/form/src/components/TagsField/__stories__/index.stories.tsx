import type { Meta } from '@storybook/react'
import { TagsField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TagsField,
  decorators: [
    ChildStory => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        {ChildStory()}
      </Form>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A tags field',
      },
    },
  },
  title: 'Components/Fields/TagsField',
} as Meta

export { Playground } from './Playground.stories'
export { Placeholder } from './Placeholder.stories'
export { Disabled } from './Disabled.stories'
export { DefaultTags } from './DefaultTags.stories'
export { Required } from './Required.stories'
