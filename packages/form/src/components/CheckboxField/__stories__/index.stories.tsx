import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { useForm } from 'react-hook-form'
import { CheckboxField, Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: CheckboxField,
  decorators: [
    ChildStory => {
      const methods = useForm()

      return (
        <Form onRawSubmit={() => {}} errors={mockErrors} methods={methods}>
          <Stack gap={2}>
            {ChildStory()}
            <Stack gap={1}>
              <Text variant="bodyStrong" as="p">
                Form values:
              </Text>
              <Snippet prefix="lines">
                {JSON.stringify(methods.watch(), null, 1)}
              </Snippet>
            </Stack>
          </Stack>
        </Form>
      )
    },
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
