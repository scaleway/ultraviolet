import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { DateField, Form } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export default {
  component: DateField,
  decorators: [
    ChildStory => {
      const methods = useForm({
        mode: 'onChange',
      })
      const {
        errors,
        isDirty,
        isSubmitting,
        touchedFields,
        submitCount,
        dirtyFields,
        isValid,
        isLoading,
        isSubmitted,
        isValidating,
        isSubmitSuccessful,
      } = methods.formState

      return (
        <Form onSubmit={() => {}} errors={mockErrors} methods={methods}>
          <Stack gap={2}>
            <ChildStory />
            <Stack gap={1}>
              <Text variant="bodyStrong" as="p">
                Form input values:
              </Text>
              <Snippet prefix="lines" initiallyExpanded>
                {JSON.stringify(methods.watch(), null, 1)}
              </Snippet>
            </Stack>
            <Stack gap={1}>
              <Text variant="bodyStrong" as="p">
                Form values:
              </Text>
              <Snippet prefix="lines">
                {JSON.stringify(
                  {
                    errors,
                    isDirty,
                    isSubmitting,
                    touchedFields,
                    submitCount,
                    dirtyFields,
                    isValid,
                    isLoading,
                    isSubmitted,
                    isValidating,
                    isSubmitSuccessful,
                  },
                  null,
                  1,
                )}
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
export { MinMaxDateRange } from './MinMaxDateRange.stories'
export { Input } from './Input.stories'
