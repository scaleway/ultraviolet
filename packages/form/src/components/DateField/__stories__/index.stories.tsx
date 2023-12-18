import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { DateField, Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: DateField,
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
        component:
          'DateField is a component used in Form to pick a date. This component is a Wrapper of DateInput https://github.com/scaleway/ultraviolet/tree/main/src/components/DateInput',
      },
    },
  },
  title: 'Form/Components/Fields/DateField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { MinMaxDate } from './MinMaxDate.stories'
export { MinMaxDateWithTimeField } from './MinMaxWithTimeField.stories'
