import {
  Submit,
  TextInputField,
  useFieldArray,
  useFormContext,
  useFormState,
} from '@ultraviolet/form'
import { CheckIcon, CloseIcon, RestoreIcon } from '@ultraviolet/icons'
import { Button, Row, Stack, Text, Tooltip } from '@ultraviolet/ui'
import { useState } from 'react'
import { hexadecimalColorRegex, INITIAL_VALUES } from '../contants'
import { capitalizeText, row } from './style.css'

export const FormContent = () => {
  const [confirmResetForm, setConfirmResetForm] = useState(false)
  const { fields, remove } = useFieldArray<typeof INITIAL_VALUES>({
    name: 'sentiments',
  })
  const { errors } = useFormState()
  const { reset } = useFormContext<typeof INITIAL_VALUES>()

  return (
    <Stack gap={6}>
      <Stack direction="row" gap={1}>
        <Stack flex={1} gap={1}>
          <Text
            as="label"
            className={capitalizeText}
            htmlFor="sentiment_neutral"
            variant="bodyStrong"
          >
            Neutral sentiment name
          </Text>
          <Tooltip text="Neutral sentiment name cannot be changed as it is essential for the theme to work.">
            <Stack flex={1}>
              <TextInputField
                disabled
                id="sentiment_neutral"
                name="sentiment_neutral"
                placeholder="neutral"
                required
              />
            </Stack>
          </Tooltip>
        </Stack>
        <Stack flex={1} gap={1}>
          <Text
            as="label"
            className={capitalizeText}
            htmlFor="sentiment_neutral_value"
            variant="bodyStrong"
          >
            Neutral sentiment value
          </Text>
          <Tooltip text="Neutral sentiment value cannot be changed as it is essential for the theme to work.">
            <Stack flex={1}>
              <TextInputField
                disabled
                id="sentiment_neutral_value"
                name="sentiment_neutral_value"
                placeholder="#FFFFFF"
                required
              />
            </Stack>
          </Tooltip>
        </Stack>
      </Stack>

      {fields.map((field, index) => {
        const isRequiredSentiment = field.required
        const countRequiredSentiments = fields.filter(
          ({ required }) => required,
        ).length

        // oxlint-disable-next-line eslint/no-console
        console.log({ errors })

        return (
          <Stack direction="row" gap={1} key={field.id}>
            <Stack flex={1} gap={1}>
              <Text
                as="label"
                className={capitalizeText}
                htmlFor={`sentiments.${index}.key`}
                variant="bodyStrong"
              >
                {isRequiredSentiment
                  ? `${field.key} sentiment name`
                  : `Additional sentiment ${
                      index - countRequiredSentiments + 1
                    } name`}
              </Text>
              <Tooltip
                text={
                  isRequiredSentiment
                    ? 'This sentiment name cannot be changed as it is essential for the theme to work. But you can change the value of it.'
                    : undefined
                }
              >
                <Stack flex={1}>
                  <TextInputField
                    disabled={isRequiredSentiment}
                    id={`sentiments.${index}.key`}
                    name={`sentiments.${index}.key`}
                    placeholder="neutral"
                    required
                  />
                </Stack>
              </Tooltip>
            </Stack>
            <Stack flex={1} gap={1}>
              <Text
                as="label"
                className={capitalizeText}
                htmlFor={`sentiments.${index}.value`}
                variant="bodyStrong"
              >
                {isRequiredSentiment
                  ? `${field.key} sentiment value`
                  : `Additional sentiment ${
                      index - countRequiredSentiments + 1
                    } value`}
              </Text>
              <Stack alignItems="center" direction="row" gap={1}>
                <Row className={row} gap={1} templateColumns="9fr 1fr">
                  <TextInputField
                    id={`sentiments.${index}.value`}
                    name={`sentiments.${index}.value`}
                    placeholder="#FFFFFF"
                    regex={[hexadecimalColorRegex]}
                  />
                </Row>
                {isRequiredSentiment ? null : (
                  <Button
                    onClick={() => remove(index)}
                    sentiment="neutral"
                    size="large"
                    variant="filled"
                  >
                    <CloseIcon />
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        )
      })}
      <Stack gap={2}>
        <Stack>
          {confirmResetForm ? (
            <Row gap={1} templateColumns="1fr 1fr">
              <Button
                onClick={() => {
                  setConfirmResetForm(false)
                }}
                sentiment="danger"
                variant="outlined"
              >
                {' '}
                <CloseIcon />
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setConfirmResetForm(false)
                  reset(INITIAL_VALUES)
                }}
                sentiment="success"
                variant="outlined"
              >
                <CheckIcon />
                Confirm
              </Button>
            </Row>
          ) : (
            <Button
              onClick={() => {
                setConfirmResetForm(true)
              }}
              sentiment="danger"
              variant="outlined"
            >
              <RestoreIcon />
              Reset
            </Button>
          )}
        </Stack>
        <Submit>Generate</Submit>
      </Stack>
    </Stack>
  )
}
