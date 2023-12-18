import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form, TextInputField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TextInputField,
  decorators: [
    ChildStory => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
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
        component: 'A switch field that act like a checkbox',
      },
    },
  },
  title: 'Form/Components/Fields/TextInputField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { DynamicRequired } from './DynamicRequired.stories'
export { MinMaxLength } from './MinMaxLength.stories'
export { Regex } from './Regex.stories'
