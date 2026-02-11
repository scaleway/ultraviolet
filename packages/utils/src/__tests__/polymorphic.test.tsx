import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { mergeProps, renderElement } from '../polymorphic'
import '@testing-library/jest-dom/vitest'

describe('polymorphic', () => {
  describe(mergeProps, () => {
    test('merges basic props, child overrides parent', () => {
      const parent = { id: 'parent', title: 'parent' }
      const child = { id: 'child' }
      const result = mergeProps(parent, child)
      expect(result).toEqual({ id: 'child', title: 'parent' })
    })

    test('concatenates className', () => {
      const parent = { className: 'parent-class' }
      const child = { className: 'child-class' }
      const result = mergeProps(parent, child)
      expect(result).toEqual({ className: 'parent-class child-class' })
    })

    test('merges styles, child overrides parent', () => {
      const parent = { style: { color: 'red', display: 'block' } }
      const child = { style: { color: 'blue' } }
      const result = mergeProps(parent, child)
      expect(result['style']).toEqual({ color: 'blue', display: 'block' })
    })

    test('does not merge event handlers', () => {
      const parent = { onClick: () => {} }
      const child = { onClick: () => {} }
      const result = mergeProps(parent, child)
      expect(result['onClick']).toBe(child.onClick)
    })
  })

  describe(renderElement, () => {
    test('renders function form', () => {
      const renderFn = vi.fn(props => <a {...props}>test link content</a>)
      const props = { href: '/test', className: 'test' }

      render(renderElement(renderFn, props))

      expect(renderFn).toHaveBeenCalledWith(props)
      const element = screen.getByText('test link content')
      expect(element).toHaveAttribute('href', '/test')
      expect(element).toHaveClass('test')
    })

    test('renders element form with merged props', () => {
      const customElement = (
        <a className="child" href="/child">
          child
        </a>
      )
      const props = { className: 'parent', 'data-testid': 'test' }

      render(renderElement(customElement, props))

      const element = screen.getByText('child')
      expect(element).toHaveClass('parent child')
      expect(element).toHaveAttribute('href', '/child')
      expect(element).toHaveAttribute('data-testid', 'test')
    })

    test('handles children correctly', () => {
      const customElement = <div className="child">Original</div>
      const props = { children: 'Overridden' }

      render(renderElement(customElement, props))

      expect(screen.getByText('Overridden')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    test('preserves element children if props.children is undefined', () => {
      const customElement = <div className="child">Original</div>
      const props = { className: 'parent' }

      render(renderElement(customElement, props))

      expect(screen.getByText('Original')).toBeInTheDocument()
    })
  })
})
