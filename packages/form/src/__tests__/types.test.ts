import { describe, expectTypeOf, it } from 'vitest'
import type { DistributiveOmit } from '../types'

type TestTypeXOR =
  | { label: string; 'aria-label'?: never; id?: string }
  | { label?: never; 'aria-label': string; id?: string }
  | { label?: never; 'aria-label'?: never; id: string }

// Helper to filter a specific union member — needed because TypeScript only
// distributes conditional types over type parameters, not type aliases.
type FilterMember<T, Pattern> = T extends Pattern ? T : never

describe('types', () => {
  it('should omit keys from a simple object type', () => {
    type Input = { a: string; b: number; c: boolean }
    type Result = DistributiveOmit<Input, 'a'>

    expectTypeOf<Result>().toEqualTypeOf<{ b: number; c: boolean }>()
  })

  it('should omit multiple keys from a simple object type', () => {
    type Input = { a: string; b: number; c: boolean }
    type Result = DistributiveOmit<Input, 'a' | 'b'>

    expectTypeOf<Result>().toEqualTypeOf<{ c: boolean }>()
  })

  it('should distribute over union types while preserving each member', () => {
    type Input = { a: string; b: number } | { a: string; c: boolean }
    type Result = DistributiveOmit<Input, 'a'>

    expectTypeOf<Result>().toEqualTypeOf<{ b: number } | { c: boolean }>()
  })

  it('should preserve XOR constraints after omission (the core issue)', () => {
    type Result = DistributiveOmit<TestTypeXOR, 'id'>

    // After omitting 'id', the 3-way XOR is preserved:
    type Expected =
      | { label: string; 'aria-label'?: never }
      | { label?: never; 'aria-label': string }
      | { label?: never; 'aria-label'?: never }

    expectTypeOf<Result>().toEqualTypeOf<Expected>()
  })

  it('should keep label required in the first XOR member (not collapsed to optional)', () => {
    type Result = DistributiveOmit<TestTypeXOR, 'id'>

    // Extract the member where label is required — it should still be `string`, not `string | undefined`
    type Member = FilterMember<Result, { label: string }>

    expectTypeOf<Member>().toEqualTypeOf<{ label: string; 'aria-label'?: never }>()
  })

  it('should keep aria-label required in the second XOR member', () => {
    type Result = DistributiveOmit<TestTypeXOR, 'id'>

    type Member = FilterMember<Result, { 'aria-label': string }>

    expectTypeOf<Member>().toEqualTypeOf<{ label?: never; 'aria-label': string }>()
  })

  it('should preserve the never constraint on excluded props in XOR', () => {
    type Result = DistributiveOmit<TestTypeXOR, 'id'>

    // In the member where aria-label is required, label must still be `never` (optional),
    // NOT `string | undefined` (which is what broken Omit would produce).
    type Member = FilterMember<Result, { 'aria-label': string }>

    // The member should have `label?: never`, not `label?: string`
    expectTypeOf<Member>().toEqualTypeOf<{ label?: never; 'aria-label': string }>()
  })

  it('should preserve required props in remaining XOR members', () => {
    type XORType = { mode: 'a'; value: string; fallback?: never } | { mode: 'b'; value?: never; fallback: number }

    type Result = DistributiveOmit<XORType, 'mode'>

    type Expected = { value: string; fallback?: never } | { value?: never; fallback: number }
    expectTypeOf<Result>().toEqualTypeOf<Expected>()
  })

  it('should handle non-union types identically to Omit', () => {
    type Input = { a: string; b: number; c: boolean }
    type Result = DistributiveOmit<Input, 'b'>
    type Expected = Omit<Input, 'b'>

    expectTypeOf<Result>().toEqualTypeOf<Expected>()
  })

  it('should handle omission of no keys', () => {
    type Input = { a: string } | { b: number }
    type Result = DistributiveOmit<Input, never>

    expectTypeOf<Result>().toEqualTypeOf<Input>()
  })

  it('should work with intersection types in unions', () => {
    type Base = { common: string }
    type Input = (Base & { extra: number }) | (Base & { extra: boolean })
    type Result = DistributiveOmit<Input, 'common'>

    expectTypeOf<Result>().toEqualTypeOf<{ extra: number } | { extra: boolean }>()
  })
})
