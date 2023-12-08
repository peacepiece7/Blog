# Web-log

## Intro

Next.js 13.4 버전 app directory를 사용하여 개발한 기술 블로그입니다.

아래 주소로 접속 가능합니다.

[Deploy](https://web-log-wheat.vercel.app/)

## Techologies and skills

- Next.js 13.4
- TypeScript
- Tailwind CSS
- Firebase Cloud Firestore
- Firebase Storage
- Vercel

## Architecture

- 무료 크래딧 내에서 DB, 웹 애플리케이션이 호스팅 되도록 Vercel. Firebase SDK 사용
- DB 사용량을 최소한으로 줄일 수있도록 Next.js를 사용하여 ISR로 배포

![architecture 14 excalidraw](https://github.com/peacepiece7/web-log/assets/73880776/604fb6b6-db10-476b-a929-5639764db587)

## Performance 

### ISR 구현

웹 애플리케이션의 대부분이 ISR로 동작하게 구현함으로 활성 사용자 수에 관계 없이 첫 요청만 firebase SDK가 호출되도록 구현했습니다.

다음 기능을 사용하여 구현했습니다.

- Route segment를 사용하여 full route cache
```ts
export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME
```
- fetch API에 revalidate을 주어 data cache
```ts
export default async function Home() {
  const [logs, thumbs] = await Prmoise.all([
  getLogsFetcher<Log[]>('api/logs', {
    next : {
      revalidate : API_REVALIDATE_TIME,
      tags : [LOGS_TAG]
    }
  }),
  // ...the rest of logic
])
}
```

다음과 같은 시퀀스로 동작합니다.

![ISR sequnce diagram1](https://github.com/peacepiece7/web-log/assets/73880776/a02af6b4-ff5c-425d-a437-f1b318a4ef14)


포스트가 추가, 삭제, 수정될 경우 `next/cache`의 `revalidatePath`를 사용하여 revalidate time이 무효화되어 캐시가 갱신되도록 구현했습니다.
```ts
export async function POST(request: Request) {
  try {
    const { storagePath, content }: UpdateContentRequest = await request.json()
    await updateStorageContent(storagePath, content)
    revalidatePath('/')
    // ...the rest of logic
```

다음과 같은 시퀀스로 동작합니다.

![ISR sequnce diagram](https://github.com/peacepiece7/web-log/assets/73880776/c1c18171-712a-4eb5-b60a-4b7ceda9cad0)

## Log

[Next.js 13으로 블로그 만든 후기](https://web-log-wheat.vercel.app/log/DW4YQW719zt2ATxRNRKe)

[Next.js 13에서 변경된 기능 알아보기](https://web-log-wheat.vercel.app/log/PSp2NaL62wGmUChPZ6bH)

## 감사합니다.
