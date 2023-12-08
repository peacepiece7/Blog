import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

/**
 * @description 문자열 길이를 기준으로 즉정 패턴의 Hex Color를 반환합니다.
 */
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

export type TableOfContent = {
  level: string
  text: string
}

/**
 * @description 문자열을 파싱하여 Table of Content를 생성하고 반환합니다.
 */
export const createToc = (markdown: string) => {
  const toc = [] as TableOfContent[]
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

/**
 * @description markdown을 HTML 형식의 문자열로 변환합니다.
 */
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

/**
 * @description markdown의 header tag에 id를 추가합니다.
 */
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

/**
 * @description  process.env.NODE_ENV 에 따라 다른 URL을 반환합니다.
 */
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' ? `http://127.0.0.1:3000` : `https://${process.env.VERCEL_URL}`
}

/**
 * @description 현재 스크롤 위치를 기준으로 progress bar를 그립니다.
 */
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
