import type { Meta } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form } from '../../..'
import { useForm } from '../../../..'
import { mockErrors } from '../../../../mocks'
import { CustomerSatisfactionField } from '..'

export default {
  component: CustomerSatisfactionField,
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
        <Form
          errors={mockErrors}
          methods={methods}
          name="CustomerSatisfaction"
          onSubmit={() => {}}
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
  title: 'Form/Components/Compositions/CustomerSatisfactionField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
