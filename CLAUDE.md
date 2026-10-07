# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 목적
창원경일고 학생이 희망 진로·관심 분야에서 출발해 탐구 주제 → 질문 → 조사·자료 → 활동 → 결과 정리 → 보고서·발표 → 후속 탐구를 스스로 설계하도록 돕는 웹도구. AI가 탐구를 대신 완성하는 도구가 아니라 선택·질문·검증을 돕는 코치다. 기능 수보다 정확성, 자기주도성, 사용 편의성, 개인정보 보호를 우선한다. UI 작업 전에는 `DESIGN.md`, 변경 이력은 `README.md`를 먼저 읽는다.

## 변하지 않는 원칙
- **정적 파일 4개로 동작**: `index.html`(화면·CSS) → `data.js` → `cases.js` → `app.js` 순서로 `<script src>` 로드. 빌드·패키지·테스트 도구 없음. 외부 CDN·스크립트·폰트·API를 쓰지 않는다(공통 파일 `inquiry-standard.js`·`inquiry-notes.js`·`kyungil-link.js`는 저장소 안 로컬 파일)(폴더째 열어도 오프라인에서 동작해야 함). 꼭 필요하면 승인 후 로컬 파일로 넣는다.
- **공개 배포(v2.5~).** 「모두의 학과별 탐구 지도」 사례 공개 사용 허가를 확보했다는 운영자 판단에 따라 GitHub Pages로 공개한다. 사례 출처·검증 수준·“합격 공식 아님” 안내는 유지한다.
- **개인정보 수집 금지.** 이름·학번·연락처·성적·건강정보·생기부·상담 원문 입력칸을 만들지 않고, 예시도 가명·공개 자료만 쓴다. 입력값은 외부로 보내지 않는다. `localStorage`(`cet-v2:` 키, 주제별)에는 체크 상태, 학생이 쓴 탐구 질문·활동 메모, 참고문헌(최대 5개), `meta.ts`(진행 중 목록용)만 저장한다.
- **기존 기능·파일을 지우거나 옮기지 않는다**(필요하면 승인 먼저). 영향 범위가 크면 계획부터 제시한다. 역할을 확인하지 못한 파일은 [추정]으로 표시한다.

## Git·GitHub
- 원격: `https://github.com/mathlhk15-glitch/career-exploration-tool` (public + GitHub Pages, 브랜치 `main`). 커밋·푸시는 사용자가 요청할 때만 하고, 수정 후 `git diff`로 실제 변경점을 확인한다.
- 커밋 대상: `index.html`, `data.js`, `cases.js`, `app.js`, `README.md`, `CLAUDE.md`, `DESIGN.md`, `.gitignore`, `.claude/launch.json`. 참고 자료와 `index_old.html`(v0.3 사본, git 기록에 있음)은 `.gitignore`로 제외.

## 실행·확인
```bash
python -m http.server 8123 --bind 127.0.0.1
```
`.claude/launch.json`의 `career-tool` 설정과 같다(브라우저 패널 `preview_start`). 테스트 프레임워크는 없고 브라우저 콘솔에서 확인한다(화면이 무거우니 `go()` 뒤 200ms 이상 기다린 후 DOM을 확인).
- 데이터: 주제 id 중복 없음, 모든 주제의 `questions` 3개·`KYEOL`/`METHODS` 키 유효, 학년별 `gradeSubjects(t.subjects, g)[0][1]`이 비지 않음, 2015 개정 과목명 없음.
- 화면: `go({g, f, t})`로 모든 분야×학년×주제, 범용 진로(`f=gen`), 진행 중 목록·뒤로가기·새로고침·localStorage, 인쇄, 375px 모바일(가로 스크롤 없음, 누르는 요소 44px).
- `sources`를 추가·수정했다면 그 링크가 열리는지 확인한다.
- 보고할 때는 변경 파일과 이유, 실제로 확인한 것과 확인하지 못한 것을 구분해 적는다.

## 구조
- **`data.js`**
  - 교육과정: `SCHOOL[1|2|3]`(우리 학교 편제, 「2026. 입학생 교육과정 편제표」), `BASE_OF`·`NEXT_OF`·`gradeSubjects(list, g)`(학년별 과목 표시), `NATIONAL_COURSE_CATALOG`(2022 개정 전체 과목, 교과별), `FIELD_EXTENDED_SUBJECTS`(분야별 확장 과목), `isSchoolSubject`(우리 학교 개설 여부), `SUBJECT_TYPE`(일반·진로·융합 배지).
  - 공통: `GRADES`, `KYEOL`(결 5가지 exp/data/soc/lit/cmp), `METHODS`, 질문 틀·체크리스트, `CLUSTERS`(7계열 → 분야 id).
  - `FIELDS`(15개 분야, 주제 객체 `id, title, kyeol, methods[], grades[], link, questions[3], research, steps, safety?, subjects, keywords, next` + 선택 `difficulty, time, tools, approval, output`). 뒤쪽에서 주제가 덧붙는다: `EXTRA_TOPICS`, `pushTopic()`(제목 중복이면 건너뜀), `ATTACHMENT_TOPIC_IDEAS` → `compactTopic()`(짧은 아이디어를 주제 객체로 생성), `DISPLAY_TITLE_FIXES`, `FIELD_KEYWORD_ADD`, 마지막에 방법·본문 단어로 안전 문구를 자동 추가하는 루프.
- **`cases.js`** — `MAP_CASES`(탐구 지도 365건 원문: `[주제, 대학, 학년도, 쪽, 학과, 계열, 교과, 결, 학과연결근거, 분야ids]`), `AI_CASES`(AI 추가 사례 120건). 끝의 `cleanCaseData()`가 실행 시 제어문자 제거·문장 조각 제외(현재 353건)·분야 보정을 한다.
- **`app.js`** — `buildGenericField`(범용 진로), `ensureTopicMeta`(최소/표준/심화 기준 기본값), `safetyLevel`, 해시 라우팅(`#g=학년&f=분야&t=주제&k=입력진로&m=1`) `readState`/`go` → `render()` → `renderHome / renderCareer / renderChoose / renderTopics / renderGuide`. 과목 표시는 `nationalSubjectBlock`(전체 교육과정 + 우리 학교 개설 강조)과 `subjectBlock`(편제 기준, 접어 둠). 사례 패널 `casePanel`/`bindCasePanel`, `NEXT_KYEOL`. `search()`는 "…교사"면 선택 화면, 그 외 `matchFields` 1등이 단독일 때만 바로 이동.

## 수정 규칙
- 동적 문자열(특히 학생 입력 `k`)은 HTML에 넣기 전에 `esc()`를 거친다.
- 조사는 `j(word, '받침O/받침X')` 순서로 쓴다 — `'은/는'`, `'이/가'`, `'과/와'`.
- `matchFields`는 부분 문자열 매칭이고 맞은 글자 수만큼 점수를 준다. 짧은 키워드('웹', '법', '공학', '엔지니어' 등)는 다른 분야를 잘못 잡으므로, 키워드를 바꾸면 기존 입력 40개 안팎의 매칭 결과를 바꾸기 전과 비교한다. 같은 주의가 `cases.js`의 `infer` 정규식에도 적용된다('법'은 '방법·기법'에 걸리고 '생태'는 '언론 생태계'에 걸린다).
- **자료 사용 구분**: 주제·질문(`FIELDS`)은 원자료를 재구성해 새로 쓴다. `MAP_CASES` 원문 문장은 고치지 않는다(실행 시 정제만). 분야 보정은 **학과 근거가 있으면 원래 분야를 유지하고, 학과 근거가 없을 때만 추정 분야를 덧붙인다**(덮어쓰지 않음). `MAP_CASES`(합격생 사례)와 `AI_CASES`(아이디어 예시)는 섞지 않고, 화면의 출처·검증 수준·"합격 공식 아님" 안내를 유지한다.
- 과목: 2022 개정 교육과정 전체에서 연결하고, 우리 학교 개설 여부는 `SCHOOL`(편제표) 기준으로만 표시한다. 2015 개정 과목명은 쓰지 않는다.
- 학생용 문구는 쉬운 해요체. 본문 16px 이상, 누를 수 있는 요소(버튼·칩·단계 바로가기·`summary`·입력칸)는 높이 44px 이상. 색만으로 상태를 구분하지 않는다(범례·텍스트 배지·`aria-pressed` + ✓).
- 강조색은 파랑(`--primary`)·초록(`--accent`, 우리 학교 개설 과목 칩 포함), 경고만 주황. 결 분포 막대(`KCOLOR`)는 차트라서 예외.
- 휴대폰에서 헤더는 한 줄이어야 한다(`.step-nav`가 `top:56px`에 고정).
- 버전 표기는 `README.md` 제목, `index.html` 하단, 각 JS 첫 줄 주석을 함께 올린다.

## 참고 자료 (커밋·배포 대상 아님)
- `2026. 입학생 교육과정 편제표.xlsx` — 우리 학교 개설 과목 기준(선택군 A~M). openpyxl이 없으므로 `zipfile` + XML로 읽는다.
- `2025학년도일반고교육과정편성도움자료.pdf` — 2022 개정 과목 체계 참고. `2026학년도 학교교육과정 편성표(...).pdf` — 현재 사용하지 않음(현 고2 편성 확인용).
- `career-exploration-materials-full/` — 365건 통계 분석, 계열×결 매트릭스, AI 추가 사례 120건(CSV), 탐구 설계 기본가이드.
- `모두의 학과별 탐구 지도.url` — https://park-sanggeun-all.github.io/teacher-console-map/ (사례 원본; 페이지 인라인 `const DATA = {rows:[...]}`).
- `student_growth_roadmap-main.zip`(선생님의 기존 플랫폼; `growth-standards.js`. 출처 기경민 교사), `arts-inquiry-guide-main.zip`(예체능 탐구 가이드).

## 경일 진로·탐구 성장 시스템 (v2.5~)
- 로드 순서: `data.js → cases.js → app.js → inquiry-standard.js → inquiry-notes.js → kyungil-link.js`.
- `inquiry-standard.js`·`inquiry-notes.js`는 gyeongil-growth-hub 원본의 복사본이다. 여기서 직접 고치지 말고 원본을 고친 뒤 네 저장소에 같은 파일을 넣는다.
- `kyungil-link.js`는 `readState`·`getField`·`storageKey`·`search`·`GRADES`를 읽기만 한다. 이 이름을 바꾸면 연결 코드도 함께 고친다.
- 공통 탐구노트 키: `kyungil.inquiryNotes.v1`(목록), `kyungil.activeNote`(sessionStorage, 지금 이어 쓰는 노트).
