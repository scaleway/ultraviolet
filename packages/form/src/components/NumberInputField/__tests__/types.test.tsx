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
    }
    type FormKey = keyof FormData
    type NameForm<T extends FormKey> = NumberInputFieldProps<FormData, T>['name']

    it('should accept number field names', () => {
      expectTypeOf<NameForm<'requiredNumber'>>().toEqualTypeOf<'requiredNumber'>()
      expectTypeOf<NameForm<'optionalNumber'>>().toEqualTypeOf<'optionalNumber'>()
      expectTypeOf<NameForm<'undefinedNumber'>>().toEqualTypeOf<'undefinedNumber'>()
      expectTypeOf<NameForm<'undefinedOrNullNumber'>>().toEqualTypeOf<'undefinedOrNullNumber'>()
    })

    it('should reject string field names', () => {
      // This will inform the user that the name doesn't have right type inside the form.
      expectTypeOf<NameForm<'requiredString'>>().toEqualTypeOf<never>()
      expectTypeOf<NameForm<'optionalString'>>().toEqualTypeOf<never>()
      expectTypeOf<NameForm<'undefinedString'>>().toEqualTypeOf<never>()
    })

    it('should have correct value type of NumberInput', () => {
      expectTypeOf<NumberInputFieldProps<FormData, 'optionalNumber'>['value']>().toEqualTypeOf<
        number | null | undefined
      >()
    })
  })
})
