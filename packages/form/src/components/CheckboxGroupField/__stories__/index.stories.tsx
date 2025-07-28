import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../..'
import { CheckboxGroupField } from '..'

export default {
  component: CheckboxGroupField,
  decorators: [
    ChildStory => {
      const methods = useForm({
        defaultValues: {
          conditions: [],
        },
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
        <Form
          onSubmit={data => {
            // oxlint-disable-next-line eslint/no-console
            console.log('data', data)
          }}
          errors={mockErrors}
          methods={methods}
        >
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
  title: 'Form/Components/Fields/CheckboxGroupField',
  args: {
    name: 'conditions',
    legend: 'Conditions',
  },
} as Meta<typeof CheckboxGroupField>

export { NotRequired } from './NotRequired.stories'
export { PartiallyRequired } from './PartiallyRequired.stories'
export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
