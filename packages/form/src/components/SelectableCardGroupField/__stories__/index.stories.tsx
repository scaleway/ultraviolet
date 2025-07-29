import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form, SelectableCardGroupField } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export default {
  component: SelectableCardGroupField,
  subcomponents: {
    'SelectableCardGroupField.Card': SelectableCardGroupField.Card,
  },
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
        component: 'A group of Selectable cards field',
      },
    },
  },
  title: 'Form/Components/Fields/SelectableCardGroupField',
} as Meta

export { Playground } from './Playground.stories'
export { Checkbox } from './Checkbox'
export { Required } from './Required.stories'
export { Error } from './Error.stories'
