import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../..'
import { ToggleGroupField } from '..'

export default {
  args: {
    legend: 'Choose options:',
    name: 'options',
  },
  component: ToggleGroupField,
  decorators: [
    ChildStory => {
      const methods = useForm({
        defaultValues: {
          options: ['weekly-save'],
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
        <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
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
  title: 'Form/Components/Fields/ToggleGroupField',
} as Meta<typeof ToggleGroupField>

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
