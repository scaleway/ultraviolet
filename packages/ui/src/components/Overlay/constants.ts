export const FOCUSABLE_ELEMENTS = `
  :is(
    a[href],
    button,
    input:not([type="hidden"]),
    select,
    textarea,
    [tabindex],
    [contenteditable="true"],
    details,
    summary,
    audio[controls],
    video[controls]
  )
  :not([disabled])
  :not([tabindex="-1"])
`.replaceAll(/\s+/gv, '')
