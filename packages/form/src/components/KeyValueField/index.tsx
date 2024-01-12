import { Button, Row, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFieldArray } from 'react-hook-form'
<<<<<<< HEAD
import type { Control, FieldArrayPath, FieldValues } from 'react-hook-form'
import { TextInputField } from '../TextInputField'

type InputKeyProps = {
=======
import { TextInputField } from '../TextInputField'

type InputProps = {
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
  label: ComponentProps<typeof TextInputField>['label']
  required?: ComponentProps<typeof TextInputField>['required']
  regex?: ComponentProps<typeof TextInputField>['regex']
}

type InputValueProps = {
  type?: ComponentProps<typeof TextInputField>['type']
  placeholder?: ComponentProps<typeof TextInputField>['placeholder']
<<<<<<< HEAD
} & InputKeyProps
=======
} & InputProps
>>>>>>> 0a3ee302 (feat: add KeyValueField component)

type AddButtonProps = {
  name: ComponentProps<typeof Button>['children']
  fullWidth?: ComponentProps<typeof Button>['fullWidth']
<<<<<<< HEAD
  tooltip: string
  maxSizeReachedTooltip: string
}

export type KeyValue = { key: string; value: string }

type KeyValueFieldProps<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
> = {
  name: TFieldArrayName
  inputKey: InputKeyProps
=======
  tooltip?: string
  tooltipAlert: string
}

type KeyValueFieldProps = {
  name: string
  inputKey: InputProps
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
  inputValue: InputValueProps
  addButton: AddButtonProps
  maxSize?: number
  readonly?: boolean
<<<<<<< HEAD
  control?: Control<TFieldValues>
}

/**
 * A React component that allows users to manage key-value pairs
 */
export const KeyValueField = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
=======
}

export type KeyValue = { key: string; value: string }

export const KeyValueField = ({
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
  name,
  inputKey,
  inputValue,
  addButton,
  maxSize = 100,
  readonly = false,
<<<<<<< HEAD
  control,
}: KeyValueFieldProps<TFieldValues, TFieldArrayName>) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
=======
}: KeyValueFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
  })

  const canAdd = fields.length !== undefined && fields.length < maxSize

  return (
    <Stack gap={3}>
      {fields.length ? (
        <Stack gap={2}>
          {fields.map((field, index) => (
<<<<<<< HEAD
            <Row key={field.id} templateColumns="1fr 1fr auto" gap={2}>
=======
            <Row
              key={field.id}
              templateColumns="1fr 1fr auto"
              alignItems="flex-start"
              gap={2}
            >
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
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
<<<<<<< HEAD
                data-testid={`remove-button-${index}`}
=======
                data-testid={`remove-button-${index}`} // @note: used for this component unit test
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
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
<<<<<<< HEAD
          data-testid="add-button"
=======
          data-testid="add-button" // @note: used for this component unit test
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
          icon="plus"
          variant="filled"
          sentiment="neutral"
          fullWidth={addButton.fullWidth}
          disabled={!canAdd || readonly}
<<<<<<< HEAD
          tooltip={
            !canAdd ? addButton.maxSizeReachedTooltip : addButton.tooltip
          }
          // @ts-expect-error can't infer properly
=======
          tooltip={!canAdd ? addButton.tooltipAlert : addButton.tooltip}
>>>>>>> 0a3ee302 (feat: add KeyValueField component)
          onClick={() => append({ key: '', value: '' })}
        >
          {addButton.name}
        </Button>
      </Stack>
    </Stack>
  )
}
