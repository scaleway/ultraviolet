import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form, FileInputField } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

// Needed to correcty display an element of type File in the snippet
const serializeValues = (values: Record<string, File>) =>
  Object.entries(values).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = [...value].map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        webkitRelativePath: file.webkitRelativePath,
        file: URL.createObjectURL(file),
      }))
    } else {
      acc[key] = value
    }
    return acc
  }, {})

export default {
  component: FileInputField,
  decorators: [
    ChildStory => {
      const methods = useForm()
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
                {JSON.stringify(serializeValues(methods.watch()), null, 1)}
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
  title: 'Form/Components/Fields/FileInputField',
  parameters: {
    a11y: false,
  },
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { AsOverlay } from './AsOverlay.stories'
