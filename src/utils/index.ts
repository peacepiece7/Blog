import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// * 랜덤한 Hex Color를 반환합니다.
export const randomBrightColor = (str: string) => {
  var hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 14) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export type Toc = {
  level: string
  text: string
}
// * Markdown에서 Table of Content를 생성합니다.
export const createToc = (markdown: string) => {
  const toc = [] as Toc[]
  let flag = false
  const headers = markdown
    .split('\n')
    .filter((line) => {
      if (line.startsWith('```')) flag = !flag
      if (flag) return false
      if (!line.startsWith('#')) return false
      return true
    })
    .join('\n')
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  })
  const htmlHeaders = md.render(headers)
  htmlHeaders.split('\n').forEach((line: string) => {
    const level = line.match(/<h(\d)>/)
    if (!level) return
    const text = line.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '').trim()
    toc.push({ level: level[1], text })
  })
  return toc
}

// * markdown을 HTML(string)로 변환합니다.
export const parseMdToHTML = (markdown: string) => {
  const mdRole = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return ''
    }
  })
  return addIdToHeaderTag(mdRole.render(markdown))
}

// * markdown의 heading tag에 id 속성을 부여합니다.
export const addIdToHeaderTag = (html: string) => {
  return html
    .split('\n')
    .map((line) => {
      if (!line.match(/<h(\d)>/)) return line
      const id = line
        .replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '')
        .replaceAll(' ', '_')
        .trim()
      return line.replace(/<h(\d)>/, `<h$1 id="${id}">`)
    })
    .join('\n')
}

// * Production, Development에 따라 다른 base URL을 반환합니다.
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' ? `http://127.0.0.1:3000` : `https://${process.env.VERCEL_URL}`
}

// * progress bar를 표기합니다.

export function paintProgressBar(containerId: string, barId: string) {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100
  const container = document.getElementById(containerId)!

  // * scroll bar container를 visible/hidden 합니다.
  scrolled > 5 ? (container.style.visibility = 'visible') : (container.style.visibility = 'hidden')

  const progressBar = document.getElementById(barId)!
  progressBar.style.width = scrolled + '%'
}
