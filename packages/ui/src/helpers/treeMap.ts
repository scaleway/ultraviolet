import type { Theme } from '@emotion/react'
import type { DefaultTreeMapDatum } from '@nivo/treemap'

type ReturnType = Record<string, string>

/**
 * Recursively collects all IDs from a tree map data structure.
 *
 * @param {DefaultTreeMapDatum} datum - The root node of the tree map to traverse
 * @returns {string[]} An array containing the ID of the root node and all descendant node IDs
 *
 * @description
 * This function performs a depth-first traversal of a tree map structure, collecting
 * the ID from each node. It starts with the root node's ID and recursively processes
 * all children if they exist, flattening the hierarchical structure into a single array.
 *
 * @example
 * const tree = {
 *   id: 'root',
 *   children: [
 *     { id: 'child1', children: [{ id: 'grandchild1' }] },
 *     { id: 'child2' }
 *   ]
 * }
 * getAllIds(tree) // returns ['root', 'child1', 'grandchild1', 'child2']
 */
export const getAllIds = (data: DefaultTreeMapDatum): string[] => {
  const ids: string[] = [data.id]

  if (data.children) {
    for (const child of data.children) {
      ids.push(...getAllIds(child))
    }
  }

  return ids
}

/**
 * Converts a number to an opacity value using a custom mapping algorithm.
 *
 * @param {number} n - The input number to convert (expected range: 0-100)
 * @returns {number} The calculated opacity value (range: 0-100)
 *
 * @description
 * This function applies the following transformations:
 * - 0 → 100 (special case: full opacity)
 * - 100 → 0 (special case: full transparency)
 * - 1-9 → 10-90 (multiply by 10)
 * - 10-99 → swap digits (e.g., 12 → 21, 45 → 54)
 * We disperse values like that so we don't get the almost the same opacity
 * for successive data
 *
 * @example
 * getOpacity(0)   // returns 100
 * getOpacity(5)   // returns 50
 * getOpacity(12)  // returns 21
 * getOpacity(100) // returns 0
 */
export const getOpacity = (n: number): number => {
  if (n === 0) {
    return 100
  }

  if (n === 100) {
    return 0
  }

  if (n >= 1 && n <= 9) {
    return n * 10
  }

  // swap digits for numbers 10-99
  const tens = Math.floor(n / 10)
  const units = n % 10

  return units * 10 + tens
}

/**
 * Converts a percentage value to a two-digit hexadecimal string.
 *
 * @param {number} percentage - The percentage value to convert (range: 0-100)
 * @returns {string} A two-digit uppercase hexadecimal string (range: "00"-"FF")
 *
 * @description
 * This function is commonly used for converting opacity/alpha percentages to hex values
 * for use in color codes (e.g., #RRGGBBAA format). The percentage is mapped to the
 * 0-255 range, converted to hexadecimal, and formatted as a two-character uppercase string.
 *
 * @example
 * percentToHex(0)    // returns "00"
 * percentToHex(50)   // returns "80"
 * percentToHex(100)  // returns "FF"
 * percentToHex(25.5) // returns "41"
 */
export const percentToHex = (percentage: number): string => {
  const intValue = Math.round((percentage / 100) * 255) // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16) // get hexadecimal representation

  return hexValue.padStart(2, '0').toUpperCase() // format with leading 0 and upper case characters
}

/**
 * Generates a color mapping for tree map data with graduated opacity values.
 *
 * @param {DefaultTreeMapDatum} data - The tree map data structure to generate colors for
 * @param {Theme} theme - The theme object containing color configuration
 * @returns {ReturnType} An object mapping node IDs to color strings in hex format with alpha channel
 *
 * @description
 * This function creates a color scheme for a tree map visualization by:
 * 1. Extracting all node IDs from the tree structure
 * 2. Assigning each node a color based on the primary text color from the theme
 * 3. Applying graduated opacity values (100% to 0%) based on node order
 * 4. Using modulo arithmetic to cycle through opacity values for datasets with >100 nodes
 *
 * The resulting colors follow the format: #RRGGBBAA where AA is the alpha/opacity channel.
 * Earlier nodes in the traversal order receive higher opacity, creating a visual hierarchy.
 *
 * @example
 * const data = { id: 'root', children: [{ id: 'child1' }, { id: 'child2' }] }
 * const theme = { colors: { primary: { text: '#3B82F6' } } }
 * getDataColors(data, theme)
 * // returns { 'root': '#3B82F6FF', 'child1': '#3B82F600', 'child2': '#3B82F610' }
 */
export const getDataColors = (
  data: DefaultTreeMapDatum,
  theme: Theme,
): ReturnType => {
  const baseColor = theme.colors.primary.text

  const colors: ReturnType = {}

  getAllIds(data).forEach((element, key) => {
    // if we have more than 100 elements, we use the mod function to be able to return to the start
    // as we only have 100 transparency values for a given color
    colors[element] =
      `${baseColor}${percentToHex(getOpacity((100 - key) % 100))}`
  })

  return colors
}
