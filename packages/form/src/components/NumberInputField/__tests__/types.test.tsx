import type { Path } from 'react-hook-form'
import { describe, expectTypeOf, it } from 'vitest'
import type { NumberInputFieldProps } from '..'

describe('numberInputField', () => {
  describe('types', () => {
    type FormData = {
      requiredNumber: number
      optionalNumber: number | null
      undefinedNumber?: number
      undefinedOrNullNumber?: number | null
      requiredString: string
      optionalString: string | null
      undefinedString?: string
      nested: {
        string: string
        number: number
      }
    }
    type FormKey = Path<FormData>
    type FieldFormName<T extends FormKey> = NumberInputFieldProps<FormData, T>['name']
    type FieldFormValue<T extends FormKey> = NumberInputFieldProps<FormData, T>['value']

    it('should accept number field names', () => {
      expectTypeOf<FieldFormName<'requiredNumber'>>().toEqualTypeOf<'requiredNumber'>()
      expectTypeOf<FieldFormName<'optionalNumber'>>().toEqualTypeOf<'optionalNumber'>()
      expectTypeOf<FieldFormName<'undefinedNumber'>>().toEqualTypeOf<'undefinedNumber'>()
      expectTypeOf<FieldFormName<'undefinedOrNullNumber'>>().toEqualTypeOf<'undefinedOrNullNumber'>()
      expectTypeOf<FieldFormName<'nested.number'>>().toEqualTypeOf<'nested.number'>()

      // name is never if the type is not equal to the value: number in that case
      expectTypeOf<FieldFormName<'nested.string'>>().toEqualTypeOf<never>()
      expectTypeOf<FieldFormName<'nested'>>().toEqualTypeOf<never>()
    })

    it('should reject string field names', () => {
      // This will inform the user that the name doesn't have right type inside the form.
      expectTypeOf<FieldFormName<'requiredString'>>().toEqualTypeOf<never>()
      expectTypeOf<FieldFormName<'optionalString'>>().toEqualTypeOf<never>()
      expectTypeOf<FieldFormName<'undefinedString'>>().toEqualTypeOf<never>()
    })

    it('should have correct value type of NumberInput', () => {
      type NestedValue = FieldFormValue<'nested.number'>
      expectTypeOf<NestedValue>().toEqualTypeOf<number | null | undefined>()
    })

    it('should accept nested number field names with dot notation', () => {
      // Test with a proper nested number type
      type NestedFormData = {
        dbConfig: {
          port: number
          host: string
        }
      }

      type FormNestedKey = Path<NestedFormData>
      type FieldNestedFormName<T extends FormNestedKey, S extends 'name' | 'value'> = NumberInputFieldProps<
        NestedFormData,
        T
      >[S]

      // Nested number field should be accepted
      type Name = FieldNestedFormName<'dbConfig.port', 'name'>
      type Value = FieldNestedFormName<'dbConfig.port', 'value'>
      expectTypeOf<Name>().toEqualTypeOf<'dbConfig.port'>()
      expectTypeOf<Value>().toEqualTypeOf<number | null | undefined>()
    })
  })
})
