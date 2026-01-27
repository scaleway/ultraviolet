/** Function to create a valid className given a list of strings/undefined classNames, needed because we use vanilla-extract */
type CN = (...props: (string | undefined | null)[]) => string

export const cn: CN = (...props) => props.filter(Boolean).join(' ').trim()
