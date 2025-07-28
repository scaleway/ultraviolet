import styled from '@emotion/styled'
import { CheckIcon, CloseIcon, RestoreIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import {
  Submit,
  TextInputField,
  useFieldArray,
  useFormContext,
  useFormState,
} from '../../../../../../form/src'
import { Button, Row, Stack, Text, Tooltip } from '../../../../components'
import { hexadecimalColorRegex, INITIAL_VALUES } from '../contants'

const CapitalizeText = styled(Text)`
  &::first-letter {
    text-transform: capitalize;
  }
`

const StyledRow = styled(Row)`
  width: 100%;
`

export const FormContent = () => {
  const [confirmResetForm, setConfirmResetForm] = useState(false)
  const { fields, remove } = useFieldArray<typeof INITIAL_VALUES>({
    name: 'sentiments',
  })
  const { errors } = useFormState()
  const { reset } = useFormContext<typeof INITIAL_VALUES>()

  return (
    <Stack gap={6}>
      <Stack gap={1} direction="row">
        <Stack gap={1} flex={1}>
          <CapitalizeText
            variant="bodyStrong"
            as="label"
            htmlFor="sentiment_neutral"
          >
            Neutral sentiment name
          </CapitalizeText>
          <Tooltip text="Neutral sentiment name cannot be changed as it is essential for the theme to work.">
            <Stack flex={1}>
              <TextInputField
                name="sentiment_neutral"
                id="sentiment_neutral"
                placeholder="neutral"
                disabled
                required
              />
            </Stack>
          </Tooltip>
        </Stack>
        <Stack gap={1} flex={1}>
          <CapitalizeText
            variant="bodyStrong"
            as="label"
            htmlFor="sentiment_neutral_value"
          >
            Neutral sentiment value
          </CapitalizeText>
          <Tooltip text="Neutral sentiment value cannot be changed as it is essential for the theme to work.">
            <Stack flex={1}>
              <TextInputField
                name="sentiment_neutral_value"
                id="sentiment_neutral_value"
                placeholder="#FFFFFF"
                disabled
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
          <Stack gap={1} direction="row" key={field.id}>
            <Stack gap={1} flex={1}>
              <CapitalizeText
                variant="bodyStrong"
                as="label"
                htmlFor={`sentiments.${index}.key`}
              >
                {isRequiredSentiment
                  ? `${field.key} sentiment name`
                  : `Additional sentiment ${
                      index - countRequiredSentiments + 1
                    } name`}
              </CapitalizeText>
              <Tooltip
                text={
                  isRequiredSentiment
                    ? 'This sentiment name cannot be changed as it is essential for the theme to work. But you can change the value of it.'
                    : undefined
                }
              >
                <Stack flex={1}>
                  <TextInputField
                    name={`sentiments.${index}.key`}
                    id={`sentiments.${index}.key`}
                    placeholder="neutral"
                    disabled={isRequiredSentiment}
                    required
                  />
                </Stack>
              </Tooltip>
            </Stack>
            <Stack gap={1} flex={1}>
              <CapitalizeText
                variant="bodyStrong"
                as="label"
                htmlFor={`sentiments.${index}.value`}
              >
                {isRequiredSentiment
                  ? `${field.key} sentiment value`
                  : `Additional sentiment ${
                      index - countRequiredSentiments + 1
                    } value`}
              </CapitalizeText>
              <Stack gap={1} alignItems="center" direction="row">
                <StyledRow templateColumns="9fr 1fr" gap={1}>
                  <TextInputField
                    name={`sentiments.${index}.value`}
                    id={`sentiments.${index}.value`}
                    placeholder="#FFFFFF"
                    regex={[hexadecimalColorRegex]}
                  />
                  <TextInputField
                    name={`sentiments.${index}.value`}
                    id={`sentiments.${index}.value`}
                    placeholder="#FFFFFF"
                    regex={[hexadecimalColorRegex]}
                  />
                </StyledRow>
                {!isRequiredSentiment ? (
                  <Button
                    variant="filled"
                    sentiment="neutral"
                    size="large"
                    onClick={() => remove(index)}
                  >
                    <CloseIcon />
                  </Button>
                ) : null}
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
                sentiment="danger"
                variant="outlined"
                onClick={() => {
                  setConfirmResetForm(false)
                }}
              >
                {' '}
                <CloseIcon />
                Cancel
              </Button>
              <Button
                sentiment="success"
                variant="outlined"
                onClick={() => {
                  setConfirmResetForm(false)
                  reset(INITIAL_VALUES)
                }}
              >
                <CheckIcon />
                Confirm
              </Button>
            </Row>
          ) : (
            <Button
              sentiment="danger"
              variant="outlined"
              onClick={() => {
                setConfirmResetForm(true)
              }}
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
