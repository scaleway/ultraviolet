import type { StoryFn } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { useForm } from 'react-hook-form'
import {
  CheckboxField,
  DateField,
  Form,
  NumberInputField,
  RadioField,
  SelectInputFieldV2,
  SelectableCardField,
  Submit,
  SubmitErrorAlert,
  TagInputField,
  TextInputField,
  TimeField,
  ToggleField,
} from '../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'

type FormValues = {
  receiveEmailUpdates: boolean
  choice: string
  tags: string[]
  selectableCard: string
  disableName: boolean
  email: string
}
const data = [
  { value: '1', label: '1', disabled: false },
  { value: '2', label: '2', disabled: false },
]

export const Playground: StoryFn<typeof Form> = () => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      receiveEmailUpdates: true,
      choice: '2',
      tags: ['cloud', 'of', 'choice'],
      selectableCard: '1',
      disableName: false,
      email: 'email',
    },
  })

  const disableName = methods.watch('disableName')
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
    <Form<FormValues>
      errors={mockErrors}
      methods={methods}
      onRawSubmit={() =>
        new Promise(rejects => {
          setTimeout(
            () => rejects({ 'FINAL_FORM/form-error': 'SERVER ERROR' }),
            5000,
          )
        })
      }
    >
      <Stack gap={3}>
        <CheckboxField name="disableName">
          I&apos;m disabling the field name to remove validation
        </CheckboxField>
        <Stack gap={2} direction="row">
          <RadioField name="choice" value="1" required label="1" />
          <RadioField name="choice" value="2" required label="2" />
          <RadioField name="choice" value="3" required label="3" />
        </Stack>
        <Stack gap={2} direction="row">
          <DateField name="date" label="Date" required />
          <TimeField name="time" required />
        </Stack>

        <Stack gap={2} direction="row">
          <SelectableCardField name="selectableCard" value="1" required>
            Selectable Card 1
          </SelectableCardField>
          <SelectableCardField name="selectableCard" value="2" required>
            Selectable Card 2
          </SelectableCardField>
          <SelectableCardField name="selectableCard" value="3" required>
            Selectable Card 3
          </SelectableCardField>
        </Stack>

        <TextInputField
          name="name"
          label="Name"
          placeholder="John"
          autoComplete="given-name"
          required={!disableName}
          disabled={disableName}
        />
        <NumberInputField name="age" minValue={1} maxValue={99} />
        <TextInputField
          name="email"
          label="Email"
          type="email"
          placeholder="john.smith@email.com"
          required
          rules={{
            pattern: {
              value: emailRegex,
              message: 'Must be an email',
            },
          }}
        />

        <SelectInputFieldV2
          name="select"
          required
          options={data}
          searchable={false}
        />

        <TagInputField name="taginput" placeholder="TagInput..." />

        <Stack gap={2} direction="row" justifyContent="center">
          <CheckboxField name="receiveEmailUpdates">
            I&apos;d like to receive news updates
          </CheckboxField>

          <ToggleField name="receiveEmailUpdates" label="Toggle" />
        </Stack>

        <SubmitErrorAlert />
        <Submit>Submit</Submit>
      </Stack>
      <Stack gap={2}>
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
}

Playground.args = {
  onRawSubmit: values => {
    console.log('Submit', values)
  },
}
