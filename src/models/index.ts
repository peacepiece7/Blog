export type Tag = {
  id: string
  name: string
  thumbnailId: string
}

export type Log = {
  id: string
  thumbnailId?: string
  storagePath: string
  lastModifiedAt: string
  tags: string[]
  title: string
  createdAt: string
}

export type Thumb = {
  id: string
  name: string
  source: string
}

export type LogDocument = {
  createdAt: string
  lastModifiedAt: string
  storagePath: string
  tags: string[]
  thumbnailId?: string
  title: string
}

export type ThumbnailDocument = {
  name: string
  source: string
}
