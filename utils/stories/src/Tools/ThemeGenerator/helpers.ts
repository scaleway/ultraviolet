// eslint-disable no-bitwise
// biome-ignore-all lint/suspicious/noBitwiseOperators: disabled rule
// Function imported from https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#stackoverflow-archive-begin to shade hexa colors

type ShadeHexColorType = (color: string, percent: number) => string

export const shadeHexColor: ShadeHexColorType = (color, percent) => {
  const f = Number.parseInt(color.slice(1), 16)
  const t = percent < 0 ? 0 : 255
  const p = percent < 0 ? percent * -1 : percent

  const R = f >> 16

  const G = (f >> 8) & 0x00_ff

  const B = f & 0x00_00_ff

  return `#${(
    0x1_00_00_00 +
    (Math.round((t - R) * p) + R) * 0x1_00_00 +
    (Math.round((t - G) * p) + G) * 0x1_00 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`
}

export const generateShadeContrast = (
  shadeKey: string,
  value: string,
  index: number,
) =>
  Number(shadeKey) < 900
    ? shadeHexColor(value, (1 / 15) * (index + 1))
    : shadeHexColor(value, -(1 / 15) * (index + 1))
