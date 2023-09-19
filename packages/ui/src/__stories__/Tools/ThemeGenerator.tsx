import styled from '@emotion/styled'
import {
  Form,
  Submit,
  TextInputField,
  useFieldArray,
  // eslint-disable-next-line import/no-relative-packages
} from '../../../../form/src'
import { Button, Notice, Stack, Text } from '../../components'

const CapitalizeText = styled(Text)`
  &::first-letter {
    text-transform: capitalize;
  }
`

const INITIAL_VALUES = {
  sentiment_neutral: 'neutral',
  sentiment_neutral_value: '#FFFFFF',
  sentiments: [
    {
      key: 'primary',
      value: '#3B1A61',
      required: true,
    },
    {
      key: 'secondary',
      value: '#470e60',
      required: true,
    },
    {
      key: 'success',
      value: '#0d261d',
      required: true,
    },
    {
      key: 'warning',
      value: '#3e2711',
      required: true,
    },
    {
      key: 'danger',
      value: '#590a27',
      required: true,
    },
    {
      key: 'info',
      value: '#002e50',
      required: true,
    },
  ],
}

type KeyValue = { key: string; value: string; required?: boolean }

const FormContent = () => {
  const { fields } = useFieldArray<KeyValue>('sentiments')

  return (
    <Stack gap={2}>
      <Stack gap={1} direction="row">
        <Stack gap={1} flex={1}>
          <CapitalizeText
            variant="bodyStrong"
            as="label"
            htmlFor="sentiment_neutral"
          >
            Neutral sentiment name
          </CapitalizeText>
          <TextInputField
            name="sentiment_neutral"
            id="sentiment_neutral"
            placeholder="neutral"
            noTopLabel
            disabled
          />
          <Notice>Neutral sentiment cannot be changed</Notice>
        </Stack>
        <Stack gap={1} flex={1}>
          <CapitalizeText
            variant="bodyStrong"
            as="label"
            htmlFor="sentiment_neutral_value"
          >
            Neutral sentiment value
          </CapitalizeText>
          <TextInputField
            name="sentiment_neutral_value"
            id="sentiment_neutral_value"
            placeholder="#FFFFFF"
            noTopLabel
            disabled
          />
        </Stack>
      </Stack>

      {fields.map((fieldName, index) => {
        const isRequiredSentiment = fields.value[index].required
        const countAdditionalSentiment = fields.value.filter(
          ({ required }) => !required,
        ).length

        return (
          <Stack gap={1} direction="row" key={fieldName}>
            <Stack gap={1} flex={1}>
              <CapitalizeText
                variant="bodyStrong"
                as="label"
                htmlFor={`${fieldName}.key`}
              >
                {isRequiredSentiment
                  ? `${fields.value[index].key} sentiment name`
                  : `Additional sentiment ${countAdditionalSentiment} name`}
              </CapitalizeText>
              <TextInputField
                name={`${fieldName}.key`}
                id={`${fieldName}.key`}
                placeholder="neutral"
                noTopLabel
                disabled={isRequiredSentiment}
                notice={
                  isRequiredSentiment
                    ? 'This sentiment name cannot be changed as it is essential for the theme to work. But you can change the value of it.'
                    : undefined
                }
              />
            </Stack>
            <Stack gap={1} flex={1}>
              <CapitalizeText
                variant="bodyStrong"
                as="label"
                htmlFor={`${fieldName}.value`}
              >
                {isRequiredSentiment
                  ? `${fields.value[index].key} sentiment value`
                  : `Additional sentiment ${countAdditionalSentiment} value`}
              </CapitalizeText>
              <Stack gap={1} alignItems="center" direction="row">
                <Stack flex={1}>
                  <TextInputField
                    name={`${fieldName}.value`}
                    id={`${fieldName}.value`}
                    placeholder="#FFFFFF"
                    noTopLabel
                  />
                </Stack>
                {!isRequiredSentiment ? (
                  <Button
                    icon="close"
                    variant="filled"
                    sentiment="neutral"
                    size="large"
                    onClick={() => fields.remove(index)}
                  />
                ) : null}
              </Stack>
            </Stack>
          </Stack>
        )
      })}
      <Button
        sentiment="neutral"
        variant="filled"
        icon="plus"
        onClick={() => fields.push({ key: '', value: '' })}
      >
        Add additional sentiment
      </Button>
      <Submit>Generate</Submit>
    </Stack>
  )
}

const ThemeGenerator = () => (
  <Stack gap={4}>
    <Form
      onRawSubmit={() => console.log('form submitted')}
      initialValues={INITIAL_VALUES}
      errors={{
        TOO_LOW: '',
        TOO_HIGH: '',
        MIN_LENGTH: '',
        MAX_LENGTH: '',
        REGEX: '',
        REQUIRED: '',
        MAX_DATE: '',
        MIN_DATE: '',
      }}
    >
      {({ values }) => {
        console.log(values)

        return <FormContent />
      }}
    </Form>
  </Stack>
)

export default ThemeGenerator
