'use client'
import React from 'react'
import { parseMdToHTML } from '@/utils'
import './MarkdownViewer.css'

type Props = {
  content: string
}

export default function MarkdownViewer({ content }: Props) {
  const html = parseMdToHTML(content)
  return (
    // @tailwindcss/typography를 적용하지 않았습니다!
    <div
      id="markdown-body"
      className="prose max-w-7xl m-auto md:px-8 sm:px-4 px-1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
