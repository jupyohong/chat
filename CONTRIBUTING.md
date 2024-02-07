# How to contribute to KKM Express Server

당사 GitHub Repository에 Issue 및 Pull Request 요청할 때 참고하는 문서입니다.

## Style Guide

### Linting and Code Convention

더 좋은 코드는 무엇일까 고민하는 중입니다. 프로젝트 내 `eslintrc.js`, `prettierrc` 파일 설정을 참고해주세요. [Airbnb JavaScript 스타일 가이드](https://github.com/airbnb/javascript)와 같은 문서를 참고하여 제안을 주셔도 좋습니다.

### Commit Log Guidelines

```
<type>: <description> [(#issue-number)]

[optional body]

[optional footer(s)]
```

- `type`, `description`은 반드시 작성하며 `:`으로 연결합니다.

#### 작성 요령

1. **fix**: 버그를 수정할 때 사용합니다. `type` 부분에 작성합니다. (Semantic Versioning의 `PATCH` 버전 업데이트)
2. **feat**: 신규 기능 추가 또는 기능 수정할 때 사용합니다. 마찬가지로 `type` 부분에 작성합니다. (`MINOR` 버전 업데이트)
3. `feat`나 `fix` 이외에도 `type`에 사용 가능한 것들은 아래와 같습니다.

- `feat`: 신규 기능
- `fix`: 버그 수정
- `refactor`: 버그 수정(fix)이나 기능 추가(feat)가 아닌 코드 수정
- `test`: 테스트 추가, 수정
- `docs`: 문서 관련한 변경 사항만!
- `style`: 띄어쓰기, 코드 형식, 세미콜론 누락과 같이 코드의 본래 기능을 건드리지 않는 변경
- `skip`: 리뷰 반영 (또는 첫 번째 커밋에 붙이는 커밋에 사용)
- `chore`: 기타 모든 작업 (CI/CD, 빌드 시스템이나 외부 디펜던시(`npm`)에 영향을 미치는 변경 사항, 유지 보수 관련된 작업 등)

4. **description**: 한글 또는 영문으로 작업 내용을 작성합니다.
5. (선택) 관련 이슈 번호를 추가하고 싶다면 `description` 뒤에 `(#123)`와 같이 작성합니다.
6. **BREAKING CHANGE**: 푸터(footer)에 `BREAKING CHANGE`가 있거나, `type` 뒤에 `!`가 붙으면 코드 대격변입니다. 어떤 `type`에도 붙을 수 있습니다. (`MAJOR` 버전 업데이트)

#### 작성 예시

아래와 같이 간단하게 Commit Log를 작성할 수 있습니다.

```
fix: 불요한 DeepLink 제거
```

만약 코드 변경으로 인해 대격변이 발생한다면 두 가지 방법으로 Commit Log를 작성합니다.

1. `type` 뒤에 `!` 붙이기

```
feat!: 카드 결제 모듈 추가
```

2. 푸터에 `BREAKING CHANGE: <description>` 형태로 작성

```
feat: 1:1 문의 기능 삭제

BREAKING CHANGE: 콜센터 설립으로 1:1 문의 기능이 삭제됩니다.
```

관련 이슈를 참조하고 싶은 경우 아래와 같이 작성할 수도 있습니다.

```
fix: QR 코드 생성 로직 수정 (#123)

모듈화를 진행하고, 에러 처리가 가능하도록 변경했습니다.
```

코드 리뷰를 적용한 커밋의 메시지 작성 예시입니다.

```
skip: 리뷰 반영
```

## How to submit Pull Requests

Pull Request를 제출하는 단계는 아래와 같습니다:

1. 해당 프로젝트 GitHub Repository를 clone ([참고](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories), 예: `git clone <GITHUB_SSH_URL>`)
2. `main` 브랜치에서 새로운 브랜치를 생성 (예: `git switch -c 123-create-new-feature`)
3. 즐거운 코딩
4. 테스트 코드 작성 (가능하다면)
5. 린팅과 코드 스타일을 점검 (예: NestJS의 경우 `npm run lint`)
6. 테스트 코드 실행 (예: `npm test`)
7. 컨벤션에 맞춰 commit log 작성하여 생성한 브랜치를 원격 저장소에 Push
8. Push한 브랜치를 `main` 브랜치로 병합하는 PR 생성 (Reviewer를 지정)
9. 리뷰를 기다립니다. 모든 요건이 충족되면 `main` 브랜치에 머지(Squash merge)됩니다.
10. 완료!

## 참고

- [GitHub Docs: About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Naver Billboard.js](https://github.com/naver/billboard.js)
- [Toss NestJS AOP](https://github.com/toss/nestjs-aop)
