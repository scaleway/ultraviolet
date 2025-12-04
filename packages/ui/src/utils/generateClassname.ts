/** Function to create a valid className given a list of strings/undefined classNames */
export const cn = (...props: (string | undefined)[]) =>
  props.filter(Boolean).join(' ')
