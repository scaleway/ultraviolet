import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form, TextInputField } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TextInputField,
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
        component: 'A switch field that act like a checkbox',
      },
    },
    deprecated: true,
    deprecatedReason:
      'This component is deprecated, please use TextInputFieldV2 instead',
    migrationLink: 'Migrations/TextInput to TextInputV2',
  },
  title: 'Form/Components/Fields/TextInputField',
  tags: ['deprecated'],
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { DynamicRequired } from './DynamicRequired.stories'
export { MinMaxLength } from './MinMaxLength.stories'
export { Regex } from './Regex.stories'
