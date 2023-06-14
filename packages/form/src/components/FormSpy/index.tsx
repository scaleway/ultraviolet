import { useEffect } from 'react'
import type { DeepPartial, FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type FormSpyProps<TFieldValues extends FieldValues> = {
  onChange?: (values: { values: DeepPartial<TFieldValues> }) => void
}

/**
 * @deprecated
 */
export const FormSpy = <TFieldValues extends FieldValues>({
  onChange,
}: FormSpyProps<TFieldValues>) => {
  const { watch } = useForm<TFieldValues>()

  useEffect(() => {
    const subscription = watch(values => onChange?.({ values }))

    return () => subscription.unsubscribe()
  }, [watch, onChange])

  return null
}
