import { vi } from 'vitest'

/**
 * Creates a mock `ResizeObserver` class for tests.
 *
 * @param observe - receives the callback and the target element; decides
 *   when/how to invoke the callback (e.g. immediately, or with a synthetic entry).
 *   Defaults to calling the callback with an empty array immediately.
 * @returns `{ MockResizeObserver, disconnectSpy }` — `disconnectSpy` is the
 *   `vi.fn()` backing `disconnect()`, useful for assertions.
 */
export const createMockResizeObserver = (
  observe: (callback: ResizeObserverCallback, target: Element) => void = callback => {
    callback([], undefined as unknown as ResizeObserver)
  },
) => {
  const disconnectSpy = vi.fn()

  class MockResizeObserver {
    static disconnect = disconnectSpy

    private readonly callback: ResizeObserverCallback

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      observe(this.callback, target)
    }

    // oxlint-disable-next-line eslint/class-methods-use-this -- mock implementation per ResizeObserver interface
    unobserve() {}

    // oxlint-disable-next-line eslint/class-methods-use-this -- mock delegates to static spy
    disconnect() {
      MockResizeObserver.disconnect()
    }
  }

  return { MockResizeObserver, disconnectSpy }
}
