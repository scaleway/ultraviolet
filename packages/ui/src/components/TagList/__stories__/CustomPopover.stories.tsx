import { Template } from './Template.stories'

export const CustomPopover = Template.bind({})

CustomPopover.args = {
  tags: ['smooth', 'code', 'hello', 'world'],
  threshold: 2,
  popoverTitle: 'Custom title',
  children: ({ tags }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {tags.map((tag, index) => (
        // useful when two tags are identical `${tag}-${index}`
        // eslint-disable-next-line react/no-array-index-key
        <span key={`${tag}-${index}`} style={{ color: 'black' }}>
          Tag: {tag}
        </span>
      ))}
    </div>
  ),
}
