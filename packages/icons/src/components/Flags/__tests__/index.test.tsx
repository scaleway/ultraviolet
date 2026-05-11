import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  AustriaFlag,
  BelgiumFlag,
  BulgariaFlag,
  CroatiaFlag,
  CyprusFlag,
  CzechRepublicFlag,
  DenmarkFlag,
  EstoniaFlag,
  FinlandFlag,
  FranceFlag,
} from '..'
import type { IconProps } from '../Icon'

describe('flags', () => {
  const flags = [
    AustriaFlag,
    BelgiumFlag,
    BulgariaFlag,
    CroatiaFlag,
    CyprusFlag,
    CzechRepublicFlag,
    DenmarkFlag,
    EstoniaFlag,
    FinlandFlag,
    FranceFlag,
  ]

  flags.forEach(FlagComponent => {
    const flagName = FlagComponent.name

    describe(flagName, () => {
      it(`renders ${flagName} correctly`, () => {
        const { asFragment } = render(<FlagComponent />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${flagName} with custom size`, () => {
        const sizes: IconProps['size'][] = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']

        sizes.forEach(size => {
          const { asFragment } = render(<FlagComponent size={size} />)
          expect(asFragment()).toMatchSnapshot()
        })
      })

      it(`renders ${flagName} with disabled state`, () => {
        const { asFragment } = render(<FlagComponent disabled />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${flagName} with custom className`, () => {
        const { asFragment } = render(<FlagComponent className="custom-class" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${flagName} with custom aria-label`, () => {
        const { asFragment } = render(<FlagComponent aria-label="Custom label" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${flagName} with hidden aria`, () => {
        const { asFragment } = render(<FlagComponent aria-hidden />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${flagName} with custom data-testid`, () => {
        const { asFragment } = render(<FlagComponent data-testid="custom-test-id" />)
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})
