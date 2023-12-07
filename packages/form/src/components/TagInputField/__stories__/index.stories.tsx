import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { TagInputField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TagInputField,
  decorators: [
    ChildStory => (
      <Form
        onRawSubmit={() => {}}
        initialValues={{ defaultTagInput: ['tag1', 'tag2'] }}
        errors={mockErrors}
      >
        {values => (
          <Stack gap={2}>
            {ChildStory()}
            <Stack gap={1}>
              <Text variant="bodyStrong" as="p">
                Form input values:
              </Text>
              <Snippet prefix="lines" initiallyExpanded>
                {JSON.stringify(values.values, null, 1)}
              </Snippet>
            </Stack>
            <Stack gap={1}>
              <Text variant="bodyStrong" as="p">
                Form values:
              </Text>
              <Snippet prefix="lines">
                {JSON.stringify(values, null, 1)}
              </Snippet>
            </Stack>
          </Stack>
        )}
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
  title: 'Form/Components/Fields/TagInputField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
