import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { Badge } from '..'
import { SENTIMENTS } from '../../../theme'
import { PROMINENCES, SIZES } from '../constant'

describe('badge', () => {
  it('renders correctly with default values', () => shouldMatchSnapshot(<Badge>Sample badge</Badge>))

  it('renders correctly with icon', () =>
    shouldMatchSnapshot(
      <Badge>
        <InformationOutlineIcon />
        Sample badge
      </Badge>,
    ))

  it('renders correctly when disabled', () => shouldMatchSnapshot(<Badge disabled>Sample badge</Badge>))

  it.each(SENTIMENTS)(`renders correctly sentiment %s`, sentiment =>
    shouldMatchSnapshot(<Badge sentiment={sentiment}>Sample badge</Badge>),
  )

  it.each(Object.keys(SIZES))(`renders correctly size %s`, size =>
    shouldMatchSnapshot(<Badge size={size as keyof typeof SIZES}>Sample badge</Badge>),
  )

  it.each(Object.keys(PROMINENCES))(`renders correctly prominence %s`, prominence =>
    shouldMatchSnapshot(<Badge prominence={prominence as keyof typeof PROMINENCES}>Sample badge</Badge>),
  )
})
