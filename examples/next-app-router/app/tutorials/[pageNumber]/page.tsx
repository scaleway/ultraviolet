import { TutorialList } from '../_components/tutorial-list'

type PageProps = {
  params: Promise<{ pageNumber: string }>
}

export default async function Page({ params }: PageProps) {
  const { pageNumber } = await params

  return <TutorialList page={Number(pageNumber) || 1} />
}
