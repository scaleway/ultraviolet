import type { NextPageContext } from 'next'

type ErrorPageProps = {
  statusCode: number
}

const ErrorPage = ({ statusCode }: ErrorPageProps) => (
  <div>
    {statusCode
      ? `SCWUI: An error ${statusCode} occurred on server`
      : 'SCWUI: An error occurred on client'}
  </div>
)

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404

  return { statusCode }
}

export default ErrorPage
