import styled from '@emotion/styled'
import { useState } from 'react'
import {
  Submit,
  TextInputField,
  useFieldArray,
  useForm,
  useFormState,
  // eslint-disable-next-line import/no-relative-packages
} from '../../../../../../form/src'
import { Button, Row, Stack, Text, Tooltip } from '../../../../components'
import { INITIAL_VALUES, hexadecimalColorRegex } from '../contants'

const CapitalizeText = styled(Text)`
  &::first-letter {
    text-transform: capitalize;
  }
`

const StyledRow = styled(Row)`
  width: 100%;
`

type KeyValue = { key: string; value: string; required?: boolean }

export const FormContent = () => {
  const [confirmResetForm, setConfirmResetForm] = useState(false)
  const { fields, remove } = useFieldArray<KeyValue>('sentiments')
  const { errors } = useFormState()
  const { reset } = useForm()

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
                noTopLabel
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
                noTopLabel
                disabled
                required
              />
            </Stack>
          </Tooltip>
        </Stack>
      </Stack>

      {fields.map((fieldName, index) => {
        const isRequiredSentiment = fields.value[index].required
        const countRequiredSentiments = fields.value.filter(
          ({ required }) => required,
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
                    name={`${fieldName}.key`}
                    id={`${fieldName}.key`}
                    placeholder="neutral"
                    noTopLabel
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
                htmlFor={`${fieldName}.value`}
              >
                {isRequiredSentiment
                  ? `${fields.value[index].key} sentiment value`
                  : `Additional sentiment ${
                      index - countRequiredSentiments + 1
                    } value`}
              </CapitalizeText>
              <Stack gap={1} alignItems="center" direction="row">
                <StyledRow templateColumns="9fr 1fr" gap={1}>
                  <TextInputField
                    name={`${fieldName}.value`}
                    id={`${fieldName}.value`}
                    placeholder="#FFFFFF"
                    noTopLabel
                    regex={[hexadecimalColorRegex]}
                    valid={
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                      !errors?.['sentiments']?.[index]
                    }
                    required
                  />
                  <TextInputField
                    name={`${fieldName}.value`}
                    id={`${fieldName}.value`}
                    placeholder="#FFFFFF"
                    noTopLabel
                    type="color"
                  />
                </StyledRow>
                {!isRequiredSentiment ? (
                  <Button
                    icon="close"
                    variant="filled"
                    sentiment="neutral"
                    size="large"
                    onClick={() => remove(index)}
                  />
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
                icon="close"
                onClick={() => {
                  setConfirmResetForm(false)
                }}
              >
                Cancel
              </Button>
              <Button
                sentiment="success"
                variant="outlined"
                icon="check"
                onClick={() => {
                  setConfirmResetForm(false)
                  reset(INITIAL_VALUES)
                }}
              >
                Confirm
              </Button>
            </Row>
          ) : (
            <Button
              sentiment="danger"
              variant="outlined"
              icon="restore"
              onClick={() => {
                setConfirmResetForm(true)
              }}
            >
              Reset
            </Button>
          )}
        </Stack>
        <Submit>Generate</Submit>
      </Stack>
    </Stack>
  )
}
