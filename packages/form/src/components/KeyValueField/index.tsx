import { Button, Row, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFieldArray } from 'react-hook-form'
import { TextInputField } from '../TextInputField'

type InputProps = {
  label: ComponentProps<typeof TextInputField>['label']
  required?: ComponentProps<typeof TextInputField>['required']
  regex?: ComponentProps<typeof TextInputField>['regex']
}

type InputValueProps = {
  type?: ComponentProps<typeof TextInputField>['type']
  placeholder?: ComponentProps<typeof TextInputField>['placeholder']
} & InputProps

type AddButtonProps = {
  name: ComponentProps<typeof Button>['children']
  fullWidth?: ComponentProps<typeof Button>['fullWidth']
  tooltip: string
  tooltipAlert: string
}

type KeyValueFieldProps = {
  name: string
  inputKey: InputProps
  inputValue: InputValueProps
  addButton: AddButtonProps
  maxSize?: number
  readonly?: boolean
}

export type KeyValue = { key: string; value: string }

export const KeyValueField = ({
  name,
  inputKey,
  inputValue,
  addButton,
  maxSize = 100,
  readonly = false,
}: KeyValueFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
  })

  const canAdd = fields.length !== undefined && fields.length < maxSize

  return (
    <Stack gap={3}>
      {fields.length ? (
        <Stack gap={2}>
          {fields.map((field, index) => (
            <Row key={field.id} templateColumns="1fr 1fr auto" gap={2}>
              <TextInputField
                readOnly={readonly}
                required={inputKey.required}
                name={`${name}.${index}.key`}
                label={inputKey.label}
                regex={inputKey.regex}
              />
              <TextInputField
                readOnly={readonly}
                required={inputValue.required}
                name={`${name}.${index}.value`}
                label={inputValue.label}
                placeholder={inputValue.placeholder}
                type={inputValue.type}
                autoComplete="off"
                regex={inputValue.regex}
              />

              <Button
                disabled={readonly}
                data-testid={`remove-button-${index}`} // @note: used for this component unit test
                icon="delete"
                variant="outlined"
                sentiment="danger"
                size="large"
                onClick={() => remove(index)}
              />
            </Row>
          ))}
        </Stack>
      ) : null}
      <Stack direction="row" justifyContent="flex-start">
        <Button
          data-testid="add-button" // @note: used for this component unit test
          icon="plus"
          variant="filled"
          sentiment="neutral"
          fullWidth={addButton.fullWidth}
          disabled={!canAdd || readonly}
          tooltip={!canAdd ? addButton.tooltipAlert : addButton.tooltip}
          onClick={() => append({ key: '', value: '' })}
        >
          {addButton.name}
        </Button>
      </Stack>
    </Stack>
  )
}
