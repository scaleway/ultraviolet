import { createVar } from '@vanilla-extract/css'

/**
 * The current width of the navigation panel.
 */
export const widthNavigationContainer = createVar()
/**
 * The width of the navigation panel when expanded.
 * It's used for the expanding animation.
 */
export const widthNavigationContainerExpanded = createVar()
/**
 * Duration of the transition of the width of the navigation.
 * It's set to 0 when resizing the panel with the handle.
 */
export const widthNavigationContainerDuration = createVar()
