// oxlint-disable typescript/no-unsafe-type-assertion
import { vi } from 'vitest'

export class MockResizeObserver {
  static disconnect = vi.fn()

  private readonly callback: ResizeObserverCallback
  private readonly observed = new Set<Element>()

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe(target: Element) {
    this.observed.add(target)
    const entry = { target, contentRect: { width: 800 } } as unknown as ResizeObserverEntry
    this.callback([entry], this)
  }

  unobserve(target: Element) {
    this.observed.delete(target)
  }

  disconnect() {
    this.observed.clear()
    MockResizeObserver.disconnect()
  }
}
