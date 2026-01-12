import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form, TextInputField } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TextInputField,
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
  title: 'Form/Components/Fields/TextInputField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { AsyncValidation } from './AsyncValidation.stories'
