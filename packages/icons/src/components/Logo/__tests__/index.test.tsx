import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  AirflowLogo,
  AlmaLinuxLogo,
  AlpineLinuxLogo,
  AndroidLogo,
  ApacheSparkLogo,
  ArchLinuxLogo,
  ArgoLogo,
  BaaiLogo,
  CentosLogo,
  CPanelLogo,
} from '..'

describe('logos', () => {
  const logos = [
    AirflowLogo,
    AlmaLinuxLogo,
    AlpineLinuxLogo,
    AndroidLogo,
    ApacheSparkLogo,
    ArchLinuxLogo,
    ArgoLogo,
    BaaiLogo,
    CentosLogo,
    CPanelLogo,
  ]

  // oxlint-disable-next-line vitest/require-hook
  logos.forEach(LogoComponent => {
    const logoName = LogoComponent.name

    describe(logoName, () => {
      it(`renders ${logoName} correctly`, () => {
        const { asFragment } = render(<LogoComponent />)
        expect(asFragment()).toMatchSnapshot()
      })

      it.each(['small', 'medium', 'large', 'xlarge'] as const)(`renders ${logoName} with custom size %s`, size => {
        const { asFragment } = render(<LogoComponent size={size} />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${logoName} with custom className`, () => {
        const { asFragment } = render(<LogoComponent className="custom-class" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${logoName} with custom aria-label`, () => {
        const { asFragment } = render(<LogoComponent aria-label="Custom label" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${logoName} with hidden aria`, () => {
        const { asFragment } = render(<LogoComponent aria-hidden />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${logoName} with custom data-testid`, () => {
        const { asFragment } = render(<LogoComponent data-testid="custom-test-id" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${logoName} with custom style`, () => {
        const { asFragment } = render(<LogoComponent style={{ color: 'red', cursor: 'pointer' }} />)
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})
