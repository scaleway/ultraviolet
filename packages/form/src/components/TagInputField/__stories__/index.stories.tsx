import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { TagInputField } from '..'
import { Form } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TagInputField,
  decorators: [
    ChildStory => {
      const methods = useForm({
        defaultValues: { tags: ['tag1', 'tag2'] },
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
  parameters: {
    docs: {
      description: {
        component: 'A tags field',
      },
    },
  },
  title: 'Form/Components/Fields/TagInputField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
