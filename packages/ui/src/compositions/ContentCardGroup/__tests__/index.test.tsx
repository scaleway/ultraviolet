import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ContentCardGroup } from '..'

describe('contentCardGroup', () => {
  beforeEach(() => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.415_591_366_944_480_4)
  })

  afterEach(() => {
    vi.spyOn(global.Math, 'random').mockRestore()
  })

  it('renders correctly with required title & hread', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    ))

  it('renders correctly with subtitle', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" subtitle="subtitle" title="title" />
      </ContentCardGroup>,
    ))

  it('renders correctly with description', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card description="description" href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    ))

  it('renders correctly with loading prop', () => {
    const { asFragment } = renderWithTheme(
      <ContentCardGroup loading>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with link target _parent', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent" title="title" />
      </ContentCardGroup>,
    ))

  it('renders correctly with a children', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent">
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    ))

  it('renders correctly with different title and subtitle and with custom titleAs and subtitleAs', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          href="http://scaleway.com"
          subtitle="subtitle"
          subtitleAs="h2"
          title="title"
          titleAs="h1"
        >
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    ))
})
