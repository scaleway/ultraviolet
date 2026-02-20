import { SupportProductIcon } from '@ultraviolet/icons/product/SupportProductIcon'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { FAQ } from '..'

describe('fAQ', () => {
  it('should work with default props', () =>
    shouldMatchSnapshot(<FAQ description="Description" title="Title" />))
  it('should work with notes', () =>
    shouldMatchSnapshot(
      <FAQ description="Description" notes="Notes" title="Title" />,
    ))
  it('should work with illustrationTest', () =>
    shouldMatchSnapshot(
      <FAQ description="Description" illustrationText={1} title="Title" />,
    ))
  it('should work with productIconName', () =>
    shouldMatchSnapshot(
      <FAQ
        description="Description"
        productIcon={<SupportProductIcon size="xlarge" />}
        title="Title"
      />,
    ))
})
