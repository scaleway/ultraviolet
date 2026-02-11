import type { StoryFn } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { useForm } from '../../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'
import {
  CheckboxField,
  DateInputField,
  Form,
  NumberInputField,
  RadioField,
  SelectableCardField,
  SelectInputField,
  Submit,
  SubmitErrorAlert,
  TagInputField,
  TextInputField,
  TimeInputField,
  ToggleField,
} from '../..'

const data = [
  { disabled: false, label: '1', value: '1' },
  { disabled: false, label: '2', value: '2' },
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
    defaultValues: {
      choice: '2',
      disableName: false,
      email: 'email',
      receiveEmailUpdates: true,
      selectableCard: '1',
      tags: ['cloud', 'of', 'choice'],
    },
    mode: 'onChange',
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
      onSubmit={async () =>
        new Promise(rejects => {
          setTimeout(() => rejects('SERVER ERROR'), 5000)
        })
      }
    >
      <Stack gap={3}>
        <CheckboxField control={methods.control} name="disableName">
          I&apos;m disabling the field name to remove validation
        </CheckboxField>
        <Stack direction="row" gap={2}>
          <RadioField
            control={methods.control}
            label="1"
            name="choice"
            required
            value="1"
          />
          <RadioField
            control={methods.control}
            label="2"
            name="choice"
            required
            value="2"
          />
          <RadioField
            control={methods.control}
            label="3"
            name="choice"
            required
            value="3"
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <DateInputField
            control={methods.control}
            label="Date"
            name="date"
            required
          />
          <TimeInputField control={methods.control} name="time" required />
        </Stack>

        <Stack direction="row" gap={2}>
          <SelectableCardField
            aria-label="Select"
            control={methods.control}
            name="selectableCard"
            required
            value="1"
          >
            Selectable Card 1
          </SelectableCardField>
          <SelectableCardField
            aria-label="Select"
            control={methods.control}
            name="selectableCard"
            required
            value="2"
          >
            Selectable Card 2
          </SelectableCardField>
          <SelectableCardField
            aria-label="Select"
            control={methods.control}
            name="selectableCard"
            required
            value="3"
          >
            Selectable Card 3
          </SelectableCardField>
        </Stack>

        <TextInputField
          autoComplete="given-name"
          control={methods.control}
          disabled={disableName}
          label="Name"
          name="name"
          placeholder="John"
          required={!disableName}
        />
        <NumberInputField
          control={methods.control}
          max={99}
          min={1}
          name="age"
        />
        <TextInputField
          control={methods.control}
          label="Email"
          name="email"
          placeholder="john.smith@email.com"
          regex={[emailRegex]}
          required
          type="email"
        />

        <SelectInputField
          control={methods.control}
          name="select"
          options={data}
          required
          searchable={false}
        />

        <TagInputField
          control={methods.control}
          name="tags"
          placeholder="TagInput..."
        />

        <Stack direction="row" gap={2} justifyContent="center">
          <CheckboxField control={methods.control} name="receiveEmailUpdates">
            I&apos;d like to receive news updates
          </CheckboxField>

          <ToggleField
            control={methods.control}
            label="Toggle"
            name="receiveEmailUpdates"
          />
        </Stack>

        <SubmitErrorAlert />
        <Submit>Submit</Submit>
      </Stack>
      <Stack gap={2}>
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
                dirtyFields,
                errors,
                isDirty,
                isLoading,
                isSubmitSuccessful,
                isSubmitted,
                isSubmitting,
                isValid,
                isValidating,
                submitCount,
                touchedFields,
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
