# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 목적
창원경일고 학생이 희망 진로·관심 분야에서 출발해 탐구 주제 → 질문 → 조사·자료 → 활동 → 결과 정리 → 보고서·발표 → 후속 탐구를 스스로 설계하도록 돕는 웹도구. AI가 탐구를 대신 완성하는 도구가 아니라 선택·질문·검증을 돕는 코치다. 기능 수보다 정확성, 자기주도성, 사용 편의성, 개인정보 보호를 우선한다. UI 작업 전에는 `DESIGN.md`를 먼저 읽고 따른다.

## 변하지 않는 원칙
- **결과물은 `index.html` 한 파일**(HTML·CSS·JS·데이터 인라인). 빌드·패키지·테스트 도구 없음. 외부 CDN·스크립트·폰트·API를 쓰지 않는다(파일만 열어도 오프라인에서 동작해야 함). 꼭 필요하면 승인 후 인라인으로 넣는다.
- **교내 진학 상담용.** 내장된 「모두의 학과별 탐구 지도」 사례는 "수록 자료의 저작권은 각 대학, 교내 진학 상담 목적으로만 이용" 조건이다. 그래서 GitHub 저장소는 **비공개(private)**로 두고, **GitHub Pages는 켜지 않는다**(Pages 사이트는 누구나 볼 수 있다). 공개 저장소·공개 배포 제안이 나오면 먼저 사용자에게 확인한다.
- **개인정보 수집 금지.** 이름·학번·연락처·성적·생기부·상담 원문 입력칸을 만들지 않고, 예시도 가명·공개 자료만 쓴다. 입력값은 외부로 보내지 않는다. `localStorage`(`cet-v1:` 키)에는 체크 상태, 학생이 쓴 탐구 질문, (범용 주제일 때) 입력 진로만 저장한다.
- **기존 기능·파일을 지우거나 옮기지 않는다**(필요하면 승인 먼저). 영향 범위가 크면 계획부터 제시한다. 역할을 확인하지 못한 파일은 [추정]으로 표시한다.

## Git·GitHub
- 아직 git 저장소가 아니다. 저장소를 만들 때 `.gitignore`로 참고 자료를 제외한다: `career-exploration-materials-full/`, `*.zip`, `*.xlsx`, `*.pdf`, `*.url`, 그리고 빈 `새 텍스트 문서.txt`. 커밋 대상은 `index.html`, `CLAUDE.md`, `DESIGN.md`, `.claude/launch.json`.
- 저장소가 생긴 뒤에는 수정 후 `git diff`로 실제 변경점을 확인하고, 커밋·푸시는 사용자가 요청할 때만 한다. 저장소가 생기기 전에는 큰 수정 전에 백업 사본을 만든다.

## 실행·확인
```bash
python -m http.server 8123 --bind 127.0.0.1
```
`.claude/launch.json`의 `career-tool` 설정과 같다(브라우저 패널 `preview_start`). 테스트 프레임워크는 없고 브라우저 콘솔에서 확인한다.
- 데이터: 모든 `topic.subjects` ∈ `SCHOOL[1]∪[2]∪[3]`, `NEXT_OF` 값 ∈ `SCHOOL[3]`, `BASE_OF` 값 ∈ `SCHOOL[1]`, 학년별 `gradeSubjects(t.subjects, g)[0][1]`이 비지 않음.
- 화면: `go({g, f, t})`로 모든 분야×학년×주제를 열어 콘솔 오류가 없는지. 고1·2·3, 목록에 있는 진로·없는 진로(범용), 뒤로가기·새로고침, localStorage, 인쇄, 375px 모바일(가로 스크롤 없음).
- `sources`를 추가·수정했다면 그 링크가 열리는지 확인한다.
- 보고할 때는 변경 파일과 이유, 그리고 실제로 확인한 것과 확인하지 못한 것을 구분해 적는다.

## 구조 (`index.html` 안 `<script>` 순서)
1. **학교 교육과정** — `SCHOOL[1|2|3]`(학년별 개설 과목), `BASE_OF`(2학년 과목 → 1학년 바탕 과목), `NEXT_OF`(1·2학년 과목 → 3학년 이어지는 과목), `gradeSubjects(list, g)`. 주제에는 과목을 한 번만 태그하고, 학년별 표시(지금 배우는 과목 / 점선의 이전·다음 학년 과목)는 이 매핑으로 계산한다.
2. **공통 데이터** — `GRADES`(학년별 기간·일정·정리·보고서 수준), `KYEOL`(탐구의 결 5가지: exp/data/soc/lit/cmp, 학생용 이름과 다음 결 안내), `METHODS`(방법별 안전·윤리 문구와 정리 방법), 질문 틀·체크리스트, `CLUSTERS`(7계열 → 분야 id).
3. **`FIELDS`** — 15개 분야. 각 분야: `id, keywords(진로 입력 매칭), careers, sources, topics[]`. 각 주제: `id, title, kyeol, methods[], grades[], link, questions[3](기초/심화/융합), research, steps, safety?, subjects, keywords, next`. `buildGenericField(c)`는 매칭 안 된 진로용 범용 주제(`f=gen`, 입력 문자열 `k` 사용).
4. **탐구 사례** — `MAP_CASES`(탐구 지도 365건: `[주제, 대학, 학년도, 쪽, 학과, 계열, 교과, 결, 학과연결근거, 분야ids]`), `AI_CASES`(실습 자료 120건: `[질문, 분야id, 키워드, 방법, 결]`). `casePanel`/`bindCasePanel`(주제 목록 화면 하단, 결 분포·필터·검색), `NEXT_KYEOL`(가이드 7단계의 "다른 결로 넓혀 보기" 사례).
5. **화면** — 해시 라우팅: `#g=학년&f=분야&t=주제&k=입력진로&m=1(분야 선택 화면)`. `readState`/`go` → `render()`가 `renderHome / renderCareer / renderChoose / renderTopics / renderGuide` 중 하나를 그린다. 클릭은 `document`의 위임 핸들러(`data-*` 속성)로 처리. `search()`는 `matchFields` 점수 1등이 단독일 때만 바로 이동하고, 동점이거나 매칭이 없으면 선택 화면을 띄운다.

## 수정 규칙
- 동적 문자열(특히 학생 입력 `k`)은 HTML에 넣기 전에 `esc()`를 거친다.
- 조사는 `j(word, '받침O/받침X')` 순서로 쓴다 — `'은/는'`, `'이/가'`, `'과/와'`(`'와/과'`로 쓰면 반대로 붙는다).
- `matchFields`는 부분 문자열 매칭이고, 맞은 글자 수만큼 점수를 준다(긴 단어가 우연히 겹친 짧은 단어를 이김. 예: '전기자동차' 속 '기자'). 짧은 키워드('웹', '법', '공학', '엔지니어' 등)는 다른 분야를 잘못 잡으므로, 키워드를 바꾸면 기존 입력 사례 40개 안팎의 매칭 결과를 바꾸기 전과 비교한다.
- **자료 사용 구분**: 주제·질문(`FIELDS`)은 원자료를 재구성해 새로 쓴다. 원문은 사례 영역에서만 쓴다. `MAP_CASES`(합격생 사례)와 `AI_CASES`(AI 추가 사례)는 섞지 않고, 화면에 출처와 "합격 공식 아님·학과 연결 일부 추정" 안내를 유지한다. 사례 원문은 고치지 않는다.
- 과목은 `2026. 입학생 교육과정 편제표.xlsx`(2022 개정) 기준만 쓴다. 2015 개정 과목명은 쓰지 않는다.
- 학생용 문구는 쉬운 해요체. 본문 16px 이상, 누를 수 있는 요소(버튼·칩·단계 바로가기·`summary`)는 높이 44px 이상. 색만으로 상태를 구분하지 않는다(켜고 끄는 칩은 `aria-pressed` + ✓ 표시).
- 강조색은 파랑(`--primary`)·초록(`--accent`) 두 가지, 경고만 주황. 결 분포 막대(`KCOLOR`)는 차트라서 예외다. 읽기 전용 목록은 왼쪽 선, 누르는 항목은 테두리 상자로 구분한다.
- 휴대폰에서 헤더는 한 줄이어야 한다(`.step-nav`가 `top:56px`에 고정되므로, 헤더가 두 줄이 되면 겹친다).

## 참고 자료 (커밋·배포 대상 아님)
- `2026. 입학생 교육과정 편제표.xlsx` — 교육과정 기준(선택군 A~M). openpyxl이 없으므로 `zipfile` + XML로 읽는다.
- `2026학년도 학교교육과정 편성표(...).pdf` — 현재 사용하지 않음(현 고2의 실제 편성 확인용).
- `career-exploration-materials-full/` — 365건 통계 분석, 계열×결 매트릭스, AI 추가 사례 120건(CSV), 탐구 설계 기본가이드.
- `모두의 학과별 탐구 지도.url` — https://park-sanggeun-all.github.io/teacher-console-map/ (사례 원본; 페이지 인라인 `const DATA = {rows:[...]}`).
- `student_growth_roadmap-main.zip`(선생님의 기존 플랫폼; `growth-standards.js`에 질문–방법–수정–배움, 범위 줄이기 5개 가위, 위험 유형. 출처 기경민 교사), `arts-inquiry-guide-main.zip`(예체능 탐구 가이드).
