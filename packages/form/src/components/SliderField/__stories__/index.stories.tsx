import type { Meta } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { Form, SliderField } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export default {
  component: SliderField,
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
          onSubmit={() => {
            methods.reset({})
          }}
          errors={mockErrors}
          methods={methods}
        >
          <Stack gap={2}>
            <div
              style={{
                width: '250px',
              }}
            >
              <ChildStory />
            </div>
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
        component: 'A Slider field',
      },
    },
    experimental: true,
  },
  title: 'Form/Components/Fields/SliderField',
} as Meta

export { Playground } from './Playground.stories'
export { Double } from './Double.stories'
export { Options } from './Options.stories'
export { Required } from './Required.stories'
