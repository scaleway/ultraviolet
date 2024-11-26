import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form, NumberInputField } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export default {
  component: NumberInputField,
  decorators: [
    ChildStory => {
      const methods = useForm({
        defaultValues: {
          value: 0,
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
        component: 'A NumberInput field',
      },
    },
    deprecated: true,
    deprecatedReason:
      'This component is deprecated, use NumberInputFieldV2 instead.',
    migrationLink: 'Migrations/NumberInput to NumberInputV2',
  },
  title: 'Form/Components/Fields/NumberInputField',
  tags: ['deprecated'],
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
