import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it } from 'vitest'
import { Row } from '..'

describe('row - A11y', { tags: ['a11y'] }, () => {
  it('should not have violations with default props', async () => {
    const { container } = renderWithTheme(
      <Row templateColumns="1fr 1fr">
        <div>Column 1</div>
        <div>Column 2</div>
      </Row>,
    )
    await expectNoViolations(container)
  })

  it('should not have violations with gap', async () => {
    const { container } = renderWithTheme(
      <Row gap={1} templateColumns="1fr 1fr">
        <div>Column 1</div>
        <div>Column 2</div>
      </Row>,
    )
    await expectNoViolations(container)
  })

  it('should not have violations with responsive columns', async () => {
    const { container } = renderWithTheme(
      <Row templateColumns={{ xxsmall: '1fr', medium: '1fr 1fr', large: '1fr 1fr 1fr' }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Row>,
    )
    await expectNoViolations(container)
  })

  it('should not have violations with semantic children', async () => {
    const { container } = renderWithTheme(
      <Row templateColumns="1fr 1fr">
        <article>
          <h2>Card 1</h2>
          <p>Content</p>
        </article>
        <article>
          <h2>Card 2</h2>
          <p>Content</p>
        </article>
      </Row>,
    )
    await expectNoViolations(container)
  })
})
