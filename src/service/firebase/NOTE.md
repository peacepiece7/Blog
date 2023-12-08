# server-action

만약 server action을 적용한다면 form 내에서 일어나는 액션(Create, Update, Delete 작업)을 서버에서 처리할 수 있습니다. 

하지만 아직 server-action이 적용되지 않았기 떄문에 form 내에서 일어나는 행동은 모두 클라이언트에서 처리됩니다.

하지만 클라이언트로 firebase 관련 코드를 넣는 것은 좋지 않은 방법이기 떄문에,

client component에서 사용되는 GET 이외의 요청은 자신의 서버로 API를 호출하여 처리하고,

GET 이외의 요청은 server component에서 처리하도록 합니다.

## TODO

- [ ] server-action 적용
- [ ] firebase transaction 적용