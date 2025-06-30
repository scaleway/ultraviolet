import type { StoryFn } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import {
  CheckboxField,
  DateInputField,
  Form,
  NumberInputField,
  RadioField,
  SelectInputField,
  SelectableCardField,
  Submit,
  SubmitErrorAlert,
  TagInputField,
  TextInputField,
  TimeInputField,
  ToggleField,
} from '../..'
import { useForm } from '../../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'

const data = [
  { value: '1', label: '1', disabled: false },
  { value: '2', label: '2', disabled: false },
]

type FormValues = {
  receiveEmailUpdates: boolean
  choice: string
  tags: string[]
  selectableCard: string
  disableName: boolean
  email: string
  date: Date
  time: Date
  name: string
  age: number
  select: (typeof data)[number]['value']
  taginput: string[]
}

export const Playground: StoryFn<typeof Form> = () => {
  const methods = useForm<FormValues>({
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
    <Form
      errors={mockErrors}
      methods={methods}
      onSubmit={() =>
        new Promise(rejects => {
          setTimeout(() => rejects('SERVER ERROR'), 5000)
        })
      }
    >
      <Stack gap={3}>
        <CheckboxField name="disableName" control={methods.control}>
          I&apos;m disabling the field name to remove validation
        </CheckboxField>
        <Stack gap={2} direction="row">
          <RadioField
            name="choice"
            value="1"
            required
            label="1"
            control={methods.control}
          />
          <RadioField
            name="choice"
            value="2"
            required
            label="2"
            control={methods.control}
          />
          <RadioField
            name="choice"
            value="3"
            required
            label="3"
            control={methods.control}
          />
        </Stack>
        <Stack gap={2} direction="row">
          <DateInputField
            name="date"
            label="Date"
            required
            control={methods.control}
          />
          <TimeInputField name="time" required control={methods.control} />
        </Stack>

        <Stack gap={2} direction="row">
          <SelectableCardField
            name="selectableCard"
            aria-label="Select"
            value="1"
            required
            control={methods.control}
          >
            Selectable Card 1
          </SelectableCardField>
          <SelectableCardField
            name="selectableCard"
            aria-label="Select"
            value="2"
            required
            control={methods.control}
          >
            Selectable Card 2
          </SelectableCardField>
          <SelectableCardField
            name="selectableCard"
            aria-label="Select"
            value="3"
            required
            control={methods.control}
          >
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
          control={methods.control}
        />
        <NumberInputField
          name="age"
          control={methods.control}
          min={1}
          max={99}
        />
        <TextInputField
          name="email"
          label="Email"
          type="email"
          placeholder="john.smith@email.com"
          required
          regex={[emailRegex]}
          control={methods.control}
        />

        <SelectInputField
          name="select"
          required
          options={data}
          searchable={false}
          control={methods.control}
        />

        <TagInputField
          name="tags"
          placeholder="TagInput..."
          control={methods.control}
        />

        <Stack gap={2} direction="row" justifyContent="center">
          <CheckboxField name="receiveEmailUpdates" control={methods.control}>
            I&apos;d like to receive news updates
          </CheckboxField>

          <ToggleField
            name="receiveEmailUpdates"
            label="Toggle"
            control={methods.control}
          />
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
  onSubmit: values => {
    // oxlint-disable-next-line eslint/no-console
    console.log('Submit', values)
  },
}
