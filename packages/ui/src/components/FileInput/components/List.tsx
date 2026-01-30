import {
  AudioIcon,
  CloseIcon,
  DocIcon,
  ImageIcon,
  VideoIcon,
} from '@ultraviolet/icons'
import { useState } from 'react'
import { Button } from '../../Button'
import { Loader } from '../../Loader'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { useFileInput } from '../FileInputProvider'
import { formatFileSize, getMimeTypeType } from '../helpers'
import { fileInfo, fileViewerContainer, fileViewerImage } from '../styles.css'
import type { ListProps, MimeType } from '../types'

const getIllustration = (
  type: MimeType,
  file: string,
  error: boolean,
  loading?: boolean,
) => {
  if (loading) {
    return (
      <div className={fileViewerImage[error ? 'error' : 'default']}>
        <Loader active sentiment="primary" size="xsmall" />
      </div>
    )
  }
  if (type === 'audio') {
    return (
      <div className={fileViewerImage[error ? 'error' : 'default']}>
        <AudioIcon sentiment={error ? 'danger' : 'primary'} size="medium" />
      </div>
    )
  }
  if (type === 'video') {
    return (
      <div className={fileViewerImage[error ? 'error' : 'default']}>
        <VideoIcon sentiment={error ? 'danger' : 'primary'} size="medium" />
      </div>
    )
  }
  if (type === 'image' && !error) {
    return (
      <img
        alt=""
        className={fileViewerImage.default}
        height="auto"
        src={file}
        width="auto"
      />
    )
  }

  if (type === 'image' && error) {
    return (
      <div className={fileViewerImage[error ? 'error' : 'default']}>
        <ImageIcon sentiment={error ? 'danger' : 'primary'} size="medium" />
      </div>
    )
  }

  return (
    <div className={fileViewerImage[error ? 'error' : 'default']}>
      <DocIcon sentiment={error ? 'danger' : 'primary'} size="medium" />
    </div>
  )
}

export const ListFiles = ({
  limit,
  textLimit,
  prominence = 'default',
}: ListProps) => {
  const [computedLimit, setLimit] = useState(limit)
  const seeAllOnClick = () => {
    setLimit(undefined)
  }
  const { files, setFiles, onChangeFiles, error } = useFileInput()

  return files.length > 0 ? (
    <Stack direction="row" gap={1} wrap="wrap">
      {files.map((file, index) => {
        if (!computedLimit || index < computedLimit) {
          const fileType = getMimeTypeType(file.type)
          const illustration = getIllustration(
            fileType,
            file.file,
            !!file.error || error,
            file.loading,
          )
          const sentiment = file.error ? 'danger' : 'neutral'

          return (
            <Stack data-testid={file.fileName} gap={0.5} key={file.fileName}>
              <Stack
                alignItems="center"
                className={
                  fileViewerContainer[
                    file.error || error ? 'error' : prominence
                  ]
                }
                direction="row"
                gap={2}
                justifyContent="center"
              >
                <Stack alignItems="center" direction="row" gap={1}>
                  {illustration}
                  <Stack className={fileInfo} direction="column">
                    <Text
                      as="p"
                      oneLine
                      sentiment={sentiment}
                      variant="bodySmallStrong"
                    >
                      {file.fileName}
                    </Text>
                    <Text as="p" sentiment={sentiment} variant="caption">
                      {formatFileSize(file.size)}
                    </Text>
                  </Stack>
                </Stack>
                <Button
                  data-testid={`remove-${file.fileName}`}
                  onClick={() => {
                    const newFiles = files.filter(
                      oldFile => file.file !== oldFile.file,
                    )
                    setFiles(newFiles)
                    onChangeFiles?.(newFiles)
                  }}
                  sentiment={sentiment}
                  size="xsmall"
                  variant="ghost"
                >
                  <CloseIcon />
                </Button>
              </Stack>
              {file.error ? (
                <Text as="p" sentiment="danger" variant="caption">
                  {file.error}
                </Text>
              ) : null}
            </Stack>
          )
        }

        return null
      })}
      {computedLimit && files.length > computedLimit ? (
        <Button
          data-testid="see-all"
          onClick={seeAllOnClick}
          sentiment="primary"
          size="large"
          variant="ghost"
        >
          {textLimit} ({files.length})
        </Button>
      ) : null}
    </Stack>
  ) : null
}
