import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { CheckboxGroupField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: CheckboxGroupField,
  decorators: [
    ChildStory => (
      <Form
        onRawSubmit={() => {}}
        errors={mockErrors}
        initialValues={{ conditions: ['termsAndConditions'] }}
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
  title: 'Form/Components/Fields/CheckboxGroupField',
  args: {
    name: 'conditions',
    legend: 'Conditions',
  },
} as Meta<typeof CheckboxGroupField>

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
