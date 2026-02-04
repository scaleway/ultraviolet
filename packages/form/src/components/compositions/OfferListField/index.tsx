import type {
  BaseFieldProps,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from '@ultraviolet/form'
import { Label, Stack, Text } from '@ultraviolet/ui'
import { OfferList } from '@ultraviolet/ui/compositions/OfferList'
import type { ComponentProps, ReactNode } from 'react'
import { useController } from 'react-hook-form'
import { useErrors } from '../../../providers'

type OfferListFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof OfferList>, 'selected' | 'onChangeSelect'> & {
    className?: string
    id?: string
    name: string
    label?: string | ReactNode
    required?: boolean
  }

const OfferListField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  expandable,
  type = 'radio',
  columns,
  control,
  children,
  loading,
  autoCollapse,
  className,
  id,
  name,
  label,
  required,
  value,
  onChange,
  shouldUnregister,
}: OfferListFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue: value,
    name,
    rules: {
      required,
    },
    shouldUnregister,
  })

  return (
    <Stack className={className} gap={1} id={id}>
      {label ? <Label required={required}>{label}</Label> : null}
      <OfferList
        autoCollapse={autoCollapse}
        columns={columns}
        expandable={expandable}
        loading={loading}
        onChangeSelect={val => {
          field.onChange(val)
          onChange?.(val as PathValue<TFieldValues, Path<TFieldValues>>)
        }}
        selected={field.value}
        type={type}
      >
        {children}
      </OfferList>
      {error ? (
        <Text as="p" prominence="default" sentiment="danger" variant="caption">
          {getError(
            {
              label: label ?? name,
              value: field.value,
            },
            error,
          )}
        </Text>
      ) : null}
    </Stack>
  )
}

OfferListField.Row = OfferList.Row
OfferListField.Cell = OfferList.Cell

export { OfferListField }
