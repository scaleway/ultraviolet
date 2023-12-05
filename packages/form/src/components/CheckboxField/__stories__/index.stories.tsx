import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { CheckboxField, Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: CheckboxField,
  decorators: [
    ChildStory => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        {values => (
          <Stack gap={2}>
            {ChildStory()}
            <Stack gap={1}>
              <Text variant="bodyStrong" as="p">
                Form values:
              </Text>
              <Snippet prefix="lines">
                {JSON.stringify(values.values, null, 1)}
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
        component: 'A checkbox field',
      },
    },
  },
  title: 'Form/Components/Fields/CheckboxField',
} as Meta

export { Playground } from './Playground.stories'

export { Checked } from './Checked.stories'

export { BooleanChecked } from './BooleanChecked.stories'

export { Disabled } from './Disabled.stories'

export { Required } from './Required.stories'
