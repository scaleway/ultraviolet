import { Snippet, Stack, Text } from '@ultraviolet/ui'

import { CheckboxGroupField } from '..'
import { Form } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

import type { Meta } from '@storybook/react-vite'

export default {
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
  title: 'Form/Components/Fields/CheckboxGroupField',
  args: {
    name: 'conditions',
    legend: 'Conditions',
  },
  parameters: {
    a11y: false,
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof CheckboxGroupField>

export { Playground } from './Playground.stories'

export { Required } from './Required.stories'
export { PartiallyRequired } from './PartiallyRequired.stories'
export { NotRequired } from './NotRequired.stories'
