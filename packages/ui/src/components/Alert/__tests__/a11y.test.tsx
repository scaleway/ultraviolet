import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from '..'
import type { AlertSentiment } from '../type'

describe.todo('alert - A11y', { tags: ['a11y'] }, () => {
  const sentiments: TupleUnion<AlertSentiment> = ['danger', 'warning', 'info', 'success', 'neutral']

  describe('aRIA roles', () => {
    it.each(sentiments.filter(s => ['danger', 'warning'].includes(s)))(
      'should have role="alert" for %s sentiment',
      sentiment => {
        const { container } = renderWithTheme(<Alert sentiment={sentiment}>Message</Alert>)
        expect(container.querySelector('[role="alert"]')).toBeInTheDocument()
      },
    )

    it.each(sentiments.filter(s => ['info', 'success', 'neutral'].includes(s)))(
      'should have role="status" for %s sentiment',
      sentiment => {
        const { container } = renderWithTheme(<Alert sentiment={sentiment}>Message</Alert>)
        expect(container.querySelector('[role="status"]')).toBeInTheDocument()
      },
    )
  })

  describe('aria-live', () => {
    it.each(sentiments.filter(s => ['danger', 'warning'].includes(s)))(
      'should have aria-live="assertive" for %s sentiment',
      sentiment => {
        const { container } = renderWithTheme(<Alert sentiment={sentiment}>Message</Alert>)
        const alert = container.querySelector(`[role="alert"]`)
        expect(alert).toHaveAttribute('aria-live', 'assertive')
      },
    )

    it.each(sentiments.filter(s => ['info', 'success', 'neutral'].includes(s)))(
      'should have aria-live="polite" for %s sentiment',
      sentiment => {
        const { container } = renderWithTheme(<Alert sentiment={sentiment}>Message</Alert>)
        const alert = container.querySelector(`[role="status"]`)
        expect(alert).toHaveAttribute('aria-live', 'polite')
      },
    )
  })

  describe('aria-labelledby', () => {
    it('should have aria-labelledby when title is provided', () => {
      const { container } = renderWithTheme(<Alert title="Test Title">Content</Alert>)
      const alert = container.querySelector('[role="alert"]')
      expect(alert).toHaveAttribute('aria-labelledby')
    })

    it('should not have aria-labelledby when no title', () => {
      const { container } = renderWithTheme(<Alert>No title</Alert>)
      const alert = container.querySelector('[role="alert"]')
      expect(alert).not.toHaveAttribute('aria-labelledby')
    })
  })

  describe('keyboard accessibility', () => {
    it('should close with Escape key when closable', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()

      renderWithTheme(
        <Alert closable onClose={onClose}>
          Dismissible alert
        </Alert>,
      )

      await user.keyboard('{Escape}')
      expect(onClose).toHaveBeenCalled()
    })

    it('should not close with Escape when not closable', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()

      renderWithTheme(<Alert onClose={onClose}>Non-dismissible</Alert>)

      await user.keyboard('{Escape}')
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('button accessibility', () => {
    it('should have accessible button text', () => {
      const { getByRole } = renderWithTheme(
        <Alert sentiment="success" buttonText="Retry action" onClickButton={vi.fn()}>
          Message
        </Alert>,
      )
      expect(getByRole('button', { name: /retry action/iu })).toBeInTheDocument()
    })

    it('should have accessible close button', () => {
      const { getByRole } = renderWithTheme(
        <Alert closable onClose={vi.fn()}>
          Message
        </Alert>,
      )
      expect(getByRole('button', { name: /close/u })).toBeInTheDocument()
    })
  })

  describe('automated accessibility', () => {
    it.each(sentiments)('should not have violations with %s sentiment', async sentiment => {
      const { container } = renderWithTheme(
        <Alert sentiment={sentiment} title="Test">
          Alert message
        </Alert>,
      )
      await expectNoViolations(container)
    })

    it('should not have violations with all features', async () => {
      const { container } = renderWithTheme(
        <Alert
          sentiment="warning"
          title="Warning Title"
          buttonText="Action"
          onClickButton={vi.fn()}
          closable
          onClose={vi.fn()}
        >
          This is a warning message with action and close button.
        </Alert>,
      )
      await expectNoViolations(container)
    })
  })
})
