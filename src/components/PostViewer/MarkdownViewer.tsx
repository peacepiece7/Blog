'use client'
import React from 'react'
import { parseMdToHTML } from '@/utils'
import './MarkdownViewer.css'

interface MarkdownViewerProps {
  content: string
}
export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  const html = parseMdToHTML(content)
  return (
    <div
      id="markdown-body"
      className="prose max-w-7xl m-auto md:px-8 sm:px-4 px-1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
