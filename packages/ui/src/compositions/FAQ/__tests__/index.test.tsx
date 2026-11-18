import { SupportProductIcon } from '@ultraviolet/icons/product/SupportProductIcon'
import { describe, it } from 'vitest'
import { FAQ } from '..'
import { shouldMatchSnapshot } from '../../../__tests__/helpers'

describe('fAQ', () => {
  it('should work with default props', () => shouldMatchSnapshot(<FAQ description="Description" title="Title" />))
  it('should work with notes', () => shouldMatchSnapshot(<FAQ description="Description" notes="Notes" title="Title" />))
  it('should work with illustrationTest', () =>
    shouldMatchSnapshot(<FAQ description="Description" illustrationText={1} title="Title" />))
  it('should work with productIconName', () =>
    shouldMatchSnapshot(
      <FAQ description="Description" productIcon={<SupportProductIcon size="xlarge" />} title="Title" />,
    ))
})
