import { usePaginationContext } from '..'

const ExampleChildren = () => {
  const { pageData } = usePaginationContext<string>()

  return (
    <ul>
      {pageData.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default ExampleChildren
