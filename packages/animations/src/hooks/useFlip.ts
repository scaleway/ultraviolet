import { useCallback, useRef } from 'react'

import type { RefObject } from 'react'

type UseFlipOptions = {
  duration?: number
  easing?: string
}

/**
 * Simplified implementation of the FLIP animation technique.
 * @see https://css-tricks.com/animating-layouts-with-the-flip-technique/
 *
 * This implementation only animates the position of the objects.
 *
 * @example
 * ```tsx
 * function MyList() {
 *   const ref = useRef<HTMLDivElement>(null)
 *   const { prepareAnimation, animate } = useFlip(ref)
 *
 *   const handleReorder = async () => {
 *     prepareAnimation()
 *     // Reorder items...
 *     requestAnimationFrame(() => {
 *       animate()
 *     })
 *   }
 *
 *   return (
 *     <div ref={ref}>
 *       {items.map(item => (
 *         <div key={item.id} data-flip-id={item.id}>
 *           {item.name}
 *         </div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export const useFlip = (
  ref: RefObject<HTMLElement | null>,
  options: UseFlipOptions = {},
) => {
  const { duration = 250, easing = 'ease' } = options

  const firstPositions = useRef<Map<string, DOMRect>>(new Map())
  const animations = useRef<Animation[]>([])

  const prepareAnimation = useCallback(() => {
    if (!ref.current || typeof ref.current.animate !== 'function') {
      return
    }

    const elements = ref.current.querySelectorAll<HTMLElement>('[data-flip-id]')
    const positions = new Map<string, DOMRect>()

    elements.forEach(element => {
      const id = element.dataset['flipId']
      if (id) {
        positions.set(id, element.getBoundingClientRect())
      }
    })

    firstPositions.current = positions
  }, [ref])

  const animate = useCallback(() => {
    if (!ref.current || typeof ref.current.animate !== 'function') {
      return Promise.resolve()
    }

    animations.current.forEach(animation => animation.cancel())

    const elements = ref.current.querySelectorAll<HTMLElement>('[data-flip-id]')

    animations.current = [...elements]
      .map(element => {
        const id = element.dataset['flipId']
        if (!id || !firstPositions.current.has(id)) {
          return null
        }

        const first = firstPositions.current.get(id)!
        const last = element.getBoundingClientRect()

        const deltaX = first.left - last.left
        const deltaY = first.top - last.top

        if (deltaX === 0 && deltaY === 0) {
          return null
        }

        return element.animate(
          [{ transform: `translate(${deltaX}px, ${deltaY}px)` }, {}],
          { duration, easing },
        )
      })
      .filter(animation => animation !== null)

    return Promise.allSettled(
      animations.current.map(animation => animation.finished),
    )
  }, [ref, duration, easing])

  return { prepareAnimation, animate }
}
