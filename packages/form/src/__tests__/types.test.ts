import { describe, expectTypeOf, it } from 'vitest'
import type { BaseFieldProps } from '../types'

describe('types', () => {
  describe('baseFieldProps', () => {
    it('should infer correct name type for string field', () => {
      type Props = BaseFieldProps<{ username: string }, 'username', string>
      expectTypeOf<Props>().toHaveProperty('name').toEqualTypeOf<'username'>()
      expectTypeOf<Props>().toHaveProperty('required').toEqualTypeOf<boolean | undefined>()
      expectTypeOf<Props>().toHaveProperty('label').toEqualTypeOf<string | undefined>()
      expectTypeOf<Props>().toHaveProperty('defaultValue').toEqualTypeOf<string | undefined>()
    })

    it('should infer correct name type for number field', () => {
      type Props = BaseFieldProps<{ age: number }, 'age', number>
      expectTypeOf<Props>().toHaveProperty('name').toEqualTypeOf<'age'>()
      expectTypeOf<Props>().toHaveProperty('defaultValue').toEqualTypeOf<number | undefined>()
    })

    it('should infer correct name type for boolean field', () => {
      type Props = BaseFieldProps<{ isActive: boolean }, 'isActive', boolean>
      expectTypeOf<Props>().toHaveProperty('name').toEqualTypeOf<'isActive'>()
      expectTypeOf<Props>().toHaveProperty('defaultValue').toEqualTypeOf<boolean | undefined>()
    })

    it('should accept onChange with correct value type', () => {
      type Props = BaseFieldProps<{ count: number }, 'count', number>
      expectTypeOf<Props>().toHaveProperty('onChange').toEqualTypeOf<((value?: number) => void) | undefined>()
    })

    it('should accept control and shouldUnregister from UseControllerProps', () => {
      type FormValues = { username: string }
      type Props = BaseFieldProps<FormValues, 'username', string>
      expectTypeOf<Props>().toHaveProperty('control').toMatchTypeOf<object | undefined>()
      expectTypeOf<Props>().toHaveProperty('shouldUnregister').toEqualTypeOf<boolean | undefined>()
    })

    it('should accept errorLabel property', () => {
      type Props = BaseFieldProps<{ username: string }, 'username', string>
      expectTypeOf<Props>().toHaveProperty('errorLabel').toEqualTypeOf<string | undefined>()
    })

    it('should work with nested field paths', () => {
      type FormValues = { user: { name: string } }
      type Props = BaseFieldProps<FormValues, 'user.name', string>
      expectTypeOf<Props>().toHaveProperty('name').toEqualTypeOf<'user.name'>()
      expectTypeOf<Props>().toHaveProperty('defaultValue').toEqualTypeOf<string | undefined>()
    })

    it('should work with array field values', () => {
      type FormValues = { tags: string[] }
      type Props = BaseFieldProps<FormValues, 'tags', string[]>
      expectTypeOf<Props>().toHaveProperty('name').toEqualTypeOf<'tags'>()
      expectTypeOf<Props>().toHaveProperty('defaultValue').toEqualTypeOf<string[] | undefined>()
    })
  })
})
