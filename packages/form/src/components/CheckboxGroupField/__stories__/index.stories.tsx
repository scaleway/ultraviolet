import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../..'
import { CheckboxGroupField } from '..'

export default {
  args: {
    legend: 'Conditions',
    name: 'conditions',
  },
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
          errors={mockErrors}
          methods={methods}
          onSubmit={data => {
            // oxlint-disable-next-line eslint/no-console
            console.log('data', data)
          }}
        >
          <Stack gap={2}>
            <ChildStory />
            <Stack gap={1}>
              <Text as="p" variant="bodyStrong">
                Form input values:
              </Text>
              <Snippet initiallyExpanded prefix="lines">
                {JSON.stringify(methods.watch(), null, 1)}
              </Snippet>
            </Stack>
            <Stack gap={1}>
              <Text as="p" variant="bodyStrong">
                Form values:
              </Text>
              <Snippet prefix="lines">
                {JSON.stringify(
                  {
                    dirtyFields,
                    errors,
                    isDirty,
                    isLoading,
                    isSubmitSuccessful,
                    isSubmitted,
                    isSubmitting,
                    isValid,
                    isValidating,
                    submitCount,
                    touchedFields,
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
} as Meta<typeof CheckboxGroupField>

export { NotRequired } from './NotRequired.stories'
export { PartiallyRequired } from './PartiallyRequired.stories'
export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
