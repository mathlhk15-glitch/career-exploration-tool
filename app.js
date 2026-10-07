// 진로 탐구 길잡이 v2.5 - 화면·검색·저장·인쇄 로직
/* 목록에 없는 진로를 위한 범용 탐구 틀 */
function buildGenericField(c) {
  const field = {
    id: 'gen', name: '“' + c + '” 진로', icon: '🧭', generic: true,
    desc: '입력한 진로에 맞춰, 어떤 진로에도 쓸 수 있는 탐구 틀을 보여 줘요.',
    careers: [],
    sources: [
      { name: '고용24 직업정보', url: 'https://www.work24.go.kr', what: '직업별 하는 일, 임금, 전망' },
      { name: '한국고용정보원', url: 'https://www.keis.re.kr', what: '직업 전망·미래 직업 보고서' }
    ],
    topics: [
      {
        id: 'gen-job', title: c + '의 일과 필요한 역량 알아보기', kyeol: 'cmp', methods: ['literature'], grades: [1, 2, 3],
        link: j(c, '이/가') + ' 실제로 어떤 일을 하는지 알면 지금 무엇을 준비해야 할지 보여요.',
        questions: [
          j(c, '은/는') + ' 하루 동안 어떤 일을 하며, 그 일에 꼭 필요한 지식과 역량은 무엇일까?',
          j(c, '이/가') + ' 되기까지의 과정(학과·자격·경력)은 어떠하며, 고등학생인 지금 준비할 수 있는 것은 무엇일까?',
          c + '의 일은 10년 뒤 어떻게 달라질까? 기술과 사회 변화를 근거로 예측해 보자.'
        ],
        research: ['커리어넷·고용24에서 하는 일, 필요한 능력, 관련 학과', '관련 학과의 전공 과목 (대학 학과 누리집)', '관련 자격증과 진출 경로', '현직자 인터뷰 기사나 영상'],
        steps: ['커리어넷에서 직업을 검색해 하는 일·필요 역량·관련 학과를 정리해요.', '관련 학과 2곳의 누리집에서 1~4학년 전공 과목을 살펴봐요.', '현직자 인터뷰 기사·영상을 2개 이상 보고 실제 하루 일과를 정리해요.', '(선택) 주변에 이 일을 하는 분이 있다면 질문 5개를 미리 준비해 인터뷰해요. 녹음은 동의를 받고 해요.', '“필요한 역량 – 지금 내 모습 – 준비 계획” 표를 만들어요.'],
        subjects: ['통합사회1·2', '주제 탐구 독서', '독서 토론과 글쓰기', '직무 의사소통'],
        keywords: [c + ' 하는 일', c + ' 필요 역량', c + ' 관련 학과'],
        next: ['관련 학과 대학생이나 현직자 인터뷰로 깊이 알아보기', '비슷한 직업 2~3개 비교 탐구', '이 직업과 관련된 교과 내용 하나를 골라 깊이 탐구하기']
      },
      {
        id: 'gen-change', title: '기술과 사회 변화가 ' + c + '의 일에 주는 영향', kyeol: 'soc', methods: ['literature'], grades: [2, 3],
        link: '미래에 일할 분야가 어떻게 바뀌는지 알면 전공과 준비 방향을 더 잘 정할 수 있어요.',
        questions: ['인공지능 같은 새로운 기술은 ' + c + '의 일을 어떻게 바꾸고 있을까?', c + ' 분야에서 최근 5년 동안 가장 큰 변화는 무엇이며, 그 원인은 무엇일까?', '미래의 ' + c + '에게 새롭게 필요한 역량은 무엇일까?'],
        research: ['관련 분야의 최근 3년 뉴스', '관련 기술의 기본 원리', '미래 직업 전망 보고서 (한국고용정보원 등)', '다른 나라의 사례'],
        steps: ['빅카인즈에서 “' + c + ' 인공지능”, “' + c + ' 변화” 등으로 최근 기사를 검색해요.', '기사 10개를 읽고 변화를 “기술·제도·사람들의 인식”으로 나누어 표로 정리해요.', 'RISS 등에서 관련 논문 초록 2~3편을 찾아 핵심을 요약해요.', '변화의 좋은 점과 걱정되는 점을 나누어 정리해요.', '미래에 필요한 역량을 3가지로 정리하고 근거를 붙여요.'],
        subjects: ['통합사회1·2', '정보', '사회와 문화', '주제 탐구 독서'],
        keywords: [c + ' 인공지능', c + ' 미래 전망', c + ' 변화'],
        next: ['변화에 대해 현직자는 어떻게 생각하는지 인터뷰하기', '다른 나라의 같은 직업과 비교하기', '필요한 역량을 기르는 나만의 1년 계획 세우기']
      },
      {
        id: 'gen-problem', title: c + '의 눈으로 우리 주변 문제 해결하기', kyeol: 'soc', methods: ['survey'], grades: [1, 2, 3],
        link: c + '의 지식으로 실제 문제를 해결해 보면 진로를 더 깊이 이해할 수 있어요.',
        questions: ['우리 학교나 지역에서 ' + c + '의 전문성으로 도울 수 있는 문제는 무엇일까?', '그 문제를 겪는 사람은 얼마나 많고, 무엇을 가장 불편해할까?', c + '의 관점에서 제안할 수 있는 해결 방법은 무엇이며, 효과를 어떻게 확인할 수 있을까?'],
        research: ['고른 문제와 관련된 통계 자료', '이미 시도된 해결 사례', '관련 기관과 정책', c + ' 분야에서 이 문제를 다루는 방법'],
        steps: ['우리 학교·지역의 불편한 점을 떠올려 적고, 내 진로와 관련 있는 문제 하나를 골라요.', '문제를 겪는 사람들의 생각을 알아보는 익명 설문(5~8문항)을 만들어요.', '선생님 허락을 받고 설문한 뒤 결과를 정리해요.', '이미 시도된 해결 사례를 조사해요.', '해결 방법을 제안하고, 가능하면 작게 실천해 본 뒤 결과를 기록해요.'],
        subjects: ['통합사회1·2', '사회와 문화', '실용 통계'],
        keywords: [c + ' 사회 문제', c + ' 지역사회', c + ' 해결 사례'],
        next: ['제안한 해결 방법을 실제로 실천하고 효과 측정하기', '관련 기관에 제안서 형식으로 정리해 보기', '같은 문제를 다른 진로의 관점에서 보기']
      }
    ]
  };
  field.topics.forEach(t => ensureTopicMeta(t));
  return field;
}

/* =========================================================
   4. 도우미 함수
   ========================================================= */

function ensureTopicMeta(t) {
  if (!t.minimum) t.minimum = ['핵심 질문 1개 확정', '자료·측정값 최소 1종 확보', '표·그래프 또는 비교표 1개', '결론 3문장 + 한계 1가지'];
  if (!t.standard) t.standard = ['자료 3개 이상 또는 반복 측정', '비교 조건 2개 이상', '기존 자료와 내 결과 비교', '진로·교과 연결 작성'];
  if (!t.advanced) t.advanced = ['대상·기간·변인 확대', '다른 자료원으로 교차검증', '후속 탐구 또는 개선안 제안'];
  if (!t.difficulty) t.difficulty = t.methods && t.methods.some(m => ['experiment','making','math','people'].includes(m)) ? 2 : 1;
  if (!t.time) t.time = t.difficulty >= 3 ? '8~12시간' : (t.difficulty === 2 ? '5~8시간' : '3~5시간');
  if (!t.tools) t.tools = t.methods && t.methods.includes('data') ? '스프레드시트·공개자료' : '공식자료·책·논문';
  if (!t.approval) t.approval = t.methods && t.methods.some(m => ['survey','people','experiment','practice'].includes(m)) ? '교사 확인 권장/필요' : '대체로 불필요';
  if (!t.output) t.output = '탐구 보고서 또는 발표 자료';
  return t;
}

function isPeopleTopic(t) {
  return t.methods && t.methods.some(m => ['survey','people','practice'].includes(m));
}
function safetyLevel(t) {
  if (t.safetyLevel === 'red') return ['🔴','교사 지도 필수'];
  if (t.safetyLevel === 'yellow') return ['🟡','교사 확인 권장'];
  if (t.safetyLevel === 'green') return ['🟢','교실·가정에서 가능'];
  const text = [t.approval, ...(t.safety || []), t.tools, ...(t.methods || [])].join(' ');
  if (/승인 필요|지도 필수|유기용매|강산|강염기|전기회로|배양|공구|글루건|심박|운동 수행/.test(text)) return ['🔴','교사 지도 필수'];
  if (isPeopleTopic(t) || /확인 권장|야외|관찰|촬영|인터뷰|제작/.test(text)) return ['🟡','교사 확인 권장'];
  return ['🟢','교실·가정에서 가능'];
}
function clearAllMyRecords() {
  const keys=[];
  for (let i=0;i<localStorage.length;i++) { const k=localStorage.key(i); if (k && k.startsWith('cet-v')) keys.push(k); }
  keys.forEach(k=>localStorage.removeItem(k));
}
function savedProgressItems() {
  const out=[];
  for (let i=0;i<localStorage.length;i++) {
    const key=localStorage.key(i); if(!key || !key.startsWith('cet-v')) continue;
    try { const v=JSON.parse(localStorage.getItem(key)||'{}'); if(v && (v.myQ || (v.checks && Object.keys(v.checks).length))) out.push({key,v}); } catch(e){}
  }
  return out.sort((a,b)=>((b.v.meta&&b.v.meta.ts)||0)-((a.v.meta&&a.v.meta.ts)||0)).slice(0,6);
}

const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

// 받침 여부에 따라 조사 붙이기: j('간호사', '은/는') → '간호사는'
function j(word, pair) {
  const [withBatchim, without] = pair.split('/');
  const code = word.trim().slice(-1).charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return word + withBatchim + '(' + without + ')';
  return word + (code % 28 ? withBatchim : without);
}

const store = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)) || null; } catch (e) { return null; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { } },
  del(key) { try { localStorage.removeItem(key); } catch (e) { } }
};

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.timer);
  // 글이 길수록 오래 보여 줌 (2.5~5초)
  toast.timer = setTimeout(() => t.classList.remove('show'), Math.min(5000, Math.max(2500, msg.length * 120)));
}

function copyText(text) {
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { }
    ta.remove();
    toast(ok ? '복사했어요' : '복사하지 못했어요. 직접 선택해서 복사해 주세요.');
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => toast('복사했어요'), fallback);
  } else {
    fallback();
  }
}

/* 주소(#)로 화면 상태를 관리해서 뒤로 가기·새로 고침이 자연스럽게 동작하게 함 */
function readState() {
  const p = new URLSearchParams(location.hash.slice(1));
  const s = {};
  for (const key of ['g', 'f', 't', 'k', 'm']) if (p.get(key)) s[key] = p.get(key);
  if (s.g && !GRADES[s.g]) return {};
  return s;
}
function go(s) {
  const p = new URLSearchParams();
  for (const key of ['g', 'f', 't', 'k', 'm']) if (s[key]) p.set(key, s[key]);
  const next = '#' + p.toString();
  if (location.hash === next) render(); else location.hash = next;
}

function getField(s) {
  if (s.f === 'gen') return s.k ? buildGenericField(s.k) : null;
  return FIELDS.find(f => f.id === s.f) || null;
}

function matchFields(input) {
  const norm = input.toLowerCase().replace(/\s+/g, '');
  if (!norm) return [];
  return FIELDS.map(f => {
    const words = f.keywords.concat(f.careers).map(w => w.toLowerCase().replace(/\s+/g, ''));
    let score = 0;
    words.forEach(w => {
      if (w === norm) score += 20;
      else if (norm.length >= 2 && w.startsWith(norm)) score += Math.max(8, norm.length * 3);
      else if (norm.length >= 3 && w.includes(norm)) score += Math.max(3, norm.length);
      else if (w.length >= 2 && norm.includes(w)) score += Math.max(5, w.length * 2);
    });
    // 직업명 완전 일치는 분야 키워드의 우연한 부분 일치보다 항상 우선
    if (f.careers.some(w => w.toLowerCase().replace(/\s+/g,'') === norm)) score += 30;
    return { f, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score || a.f.name.localeCompare(b.f.name));
}

function setProgress(step) {
  document.querySelectorAll('#progress li').forEach((li, i) => {
    li.className = i + 1 === step ? 'on' : (i + 1 < step ? 'done' : '');
    if (i + 1 === step) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
}

const kyeolTag = t => { const k = KYEOL[t.kyeol]; return `<span class="tag k">${k.icon} ${esc(k.kid)}</span>`; };
const methodTags = t => t.methods.map(m => `<span class="tag m">${METHODS[m].icon} ${esc(METHODS[m].name)}</span>`).join('');

function subjectBlock(list, g, max) {
  return gradeSubjects(list, g)
    .filter(([, items]) => items.length)
    .map(([title, items, later]) => `
      <div class="subj-group">
        <span class="label">${esc(title)}</span>
        <div class="chips">${items.slice(0, max || 99).map(x => `<span class="chip subj${later ? ' later' : ''}">${esc(x)}${typeof SUBJECT_TYPE!=='undefined' && SUBJECT_TYPE[x] ? ` <small class="stype">${esc(SUBJECT_TYPE[x])}</small>` : ''}</span>`).join('')}</div>
      </div>`).join('');
}


function nationalSubjectBlock(list, fieldId, max) {
  const extended = typeof FIELD_EXTENDED_SUBJECTS !== 'undefined' && FIELD_EXTENDED_SUBJECTS[fieldId] ? FIELD_EXTENDED_SUBJECTS[fieldId] : [];
  const items = uniq([...(list||[]), ...extended]).slice(0, max || 16);
  return `<div class="subj-group">
    <span class="label">2022 개정 교육과정 전체에서 연결해 볼 과목</span>
    <div class="subject-legend" aria-label="과목 표시 범례">
      <span class="legend-item school-open">우리학교 개설</span>
      <span class="legend-item other-course">학교 밖 개설 경로 확인</span>
    </div>
    <div class="chips">${items.map(x=>{
      const school = isSchoolSubject(x);
      return `<span class="chip subj ${school?'school-open':'other-course'}">${esc(x)}${SUBJECT_TYPE[x]?` <small class="stype">${esc(SUBJECT_TYPE[x])}</small>`:''}${school?' <small class="stype school">우리학교 개설</small>':' <small class="stype outside">공동·온라인 확인</small>'}</span>`;
    }).join('')}</div>
  </div>`;
}

function kyeolGuide() {
  return `
    <details class="kyeol">
      <summary>탐구의 결 5가지란?</summary>
      <p class="hint mt-s">탐구는 방식에 따라 다섯 가지 “결”로 나눌 수 있어요. 좋고 나쁜 결은 없어요. 한 가지 결에만 머물지 않고 다른 결로 넓혀 갈수록 탐구가 깊어져요.</p>
      <div class="kgrid">
        ${Object.values(KYEOL).map(k => `<div>${k.icon} <b>${esc(k.kid)}</b> (${esc(k.name)}) — ${esc(k.desc)}</div>`).join('')}
      </div>
    </details>`;
}

/* =========================================================
   5. 탐구 사례 (대학 공개 자료 + 추가 탐구 아이디어)
   ========================================================= */

const KEYS = ['exp', 'data', 'soc', 'lit', 'cmp'];
const KCOLOR = { exp: '#e07b39', data: '#3d82c9', soc: '#8b5fd0', lit: '#2f9e6e', cmp: '#c99a1e' };
// 이 결의 탐구를 했다면 다음에는 어느 결로 넓혀 볼지 (탐구 지도의 상담 요령을 따름)
const NEXT_KYEOL = { exp: 'lit', data: 'exp', soc: 'data', lit: 'exp', cmp: 'data' };
const MAP_TIP = '학생의 탐구가 어느 결에 몰려 있는지 먼저 보세요. 조사와 비교에만 머물러 있다면 다음 단계는 검증입니다. 자료를 모으는 데서 그치지 말고 직접 확인하거나 수치로 따져보게 하세요. 반대로 실험만 많다면 그 결과가 어떤 의미인지 문헌으로 뒷받침하도록 이끌어 주세요.';
const norm = s => String(s || '').toLowerCase().replace(/\s+/g, '');

function fieldCases(field, k) {
  if (field.generic) {
    const q = norm(k);
    return {
      map: MAP_CASES.filter(c => q && (norm(c[0]).includes(q) || norm(c[4]).includes(q))),
      ai: AI_CASES.filter(a => q && (norm(a[0]).includes(q) || norm(a[2]).includes(q)))
    };
  }
  return { map: MAP_CASES.filter(c => c[9].includes(field.id)), ai: AI_CASES.filter(a => a[1] === field.id) };
}

function kyeolSummary(list) {
  if (!list.length) return '';
  const cnt = Object.fromEntries(KEYS.map(k => [k, list.filter(c => c[7] === k).length]));
  const top = KEYS.slice().sort((a, b) => cnt[b] - cnt[a])[0];
  return `
    <div class="kbar" role="img" aria-label="탐구의 결 분포">${KEYS.filter(k => cnt[k]).map(k => `<i style="width:${cnt[k] / list.length * 100}%;background:${KCOLOR[k]}"></i>`).join('')}</div>
    <div class="klegend">${KEYS.map(k => `<span><span class="dot" style="background:${KCOLOR[k]}"></span>${esc(KYEOL[k].name)} ${cnt[k]}</span>`).join('')}</div>
    <p class="mt-s">가장 두터운 결은 <b>${esc(KYEOL[top].name)}</b>(${cnt[top]}건, ${Math.round(cnt[top] / list.length * 100)}%)이에요. ${esc(KYEOL[top].desc)}</p>`;
}

function mapCaseItem(c) {
  const guess = c[8] === '추정' || c[8] === '지면추정';
  const where = [c[4] && (c[4] + (guess ? ' (학과 연결 추정)' : '')), c[5] && c[5] + ' 계열', c[6] && '교과: ' + c[6]].filter(Boolean).join(' · ');
  return `<li><span class="t">${esc(c[0])}</span>
    <div class="tags">${kyeolTag({ kyeol: c[7] })}<span class="tag source">${guess ? '◐ 학과 연결 추정' : '● 출처 확인 사례'}</span></div>
    <span class="m">${esc(c[1])} ${esc(c[2])}학년도 가이드북 p.${esc(c[3])}${where ? ' · ' + esc(where) : ''}</span></li>`;
}

function aiCaseItem(a) {
  return `<li><span class="t">${esc(a[0])}</span>
    <div class="tags">${kyeolTag({ kyeol: a[4] })}<span class="tag ai">○ 탐구 아이디어 예시</span></div>
    <span class="m">관심 키워드: ${esc(a[2])} · 권장 방법: ${esc(a[3])}</span></li>`;
}

function casePanel(field, k) {
  const { map, ai } = fieldCases(field, k);
  return `
    <section class="card" id="casePanel">
      <h2>🗺️ 선배들의 탐구 사례</h2>
      <p class="lead">「모두의 학과별 탐구 지도」(대학 공개 자료 기반, 현재 ${MAP_CASES.length}건)와 탐구 아이디어 예시 ${AI_CASES.length}건 가운데 ${field.generic ? '입력한 진로와 관련된' : '이 분야와 연결된'} 사례예요. 출처 확인·추정 사례 ${map.length}건, 탐구 아이디어 ${ai.length}건.</p>
      ${kyeolSummary(map)}
      <p class="notice k mt-s">💬 <b>활용 요령</b> — ${esc(MAP_TIP)}</p><p class="hint"><b>검증 수준:</b> ● 출처 확인 사례 = 대학 공개 자료에 실린 사례 · ◐ 학과 연결 추정 = 탐구 내용은 확인됐지만 학과 연결은 추정 · ○ 탐구 아이디어 예시 = 수행 전 출처·방법·안전 확인 필요</p>
      <p class="notice warn mt-s"><b>⚠️ 읽기 전에</b> 이 주제를 하면 합격한다는 뜻이 아니에요. 가이드북 문장을 옮겨 와서 다듬어지지 않은 문장이 섞여 있고, 학과 연결 일부는 추정이에요. 주제를 그대로 따라 하지 말고 질문 구조·방법·탐구의 결을 참고해 내 탐구로 바꾸세요.</p>
      <div class="case-tools no-print">
        <div class="chips" id="caseKyeol">
          <button class="chip on" type="button" data-cf="" aria-pressed="true">전체</button>
          ${KEYS.map(x => `<button class="chip" type="button" data-cf="${x}" aria-pressed="false">${KYEOL[x].icon} ${esc(KYEOL[x].name)}</button>`).join('')}
        </div>
        <div class="chips" id="caseSrc">
          <button class="chip on" type="button" data-cs="map" aria-pressed="true">합격생 사례</button>
          <button class="chip on" type="button" data-cs="ai" aria-pressed="true">탐구 아이디어 예시</button>
        </div>
        <label for="caseSearch" class="sr">사례 검색</label>
        <input id="caseSearch" type="search" placeholder="사례 검색 (예: 배터리, 설문, 영상)">
        <label><input id="caseAll" type="checkbox"> 모든 분야의 사례에서 찾기</label>
      </div>
      <p class="hint" id="caseCount"></p>
      <ul class="case-list" id="caseList"></ul>
      <div class="row mt-s no-print"><button class="btn small" type="button" id="caseMore">더 보기</button></div>
    </section>`;
}

function bindCasePanel(field, k) {
  const st = { kyeol: '', src: { map: true, ai: true }, q: '', all: false, limit: 12 };
  const listEl = document.getElementById('caseList');
  const draw = () => {
    const base = st.all ? { map: MAP_CASES, ai: AI_CASES } : fieldCases(field, k);
    const q = norm(st.q);
    const hit = (text) => !q || norm(text).includes(q);
    const map = st.src.map ? base.map.filter(c => (!st.kyeol || c[7] === st.kyeol) && hit(c[0] + c[4] + c[6])) : [];
    const ai = st.src.ai ? base.ai.filter(a => (!st.kyeol || a[4] === st.kyeol) && hit(a[0] + a[2] + a[3])) : [];
    const items = map.map(mapCaseItem).concat(ai.map(aiCaseItem));
    listEl.innerHTML = items.slice(0, st.limit).join('') || '<li>조건에 맞는 사례가 없어요. 검색어를 바꾸거나 “모든 분야”를 켜 보세요.</li>';
    document.getElementById('caseCount').textContent = `${items.length}건 중 ${Math.min(st.limit, items.length)}건 표시`;
    document.getElementById('caseMore').hidden = items.length <= st.limit;
  };
  document.getElementById('caseKyeol').addEventListener('click', e => {
    const b = e.target.closest('[data-cf]'); if (!b) return;
    st.kyeol = b.dataset.cf; st.limit = 12;
    b.parentNode.querySelectorAll('.chip').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    draw();
  });
  document.getElementById('caseSrc').addEventListener('click', e => {
    const b = e.target.closest('[data-cs]'); if (!b) return;
    st.src[b.dataset.cs] = !st.src[b.dataset.cs]; st.limit = 12;
    b.classList.toggle('on', st.src[b.dataset.cs]);
    b.setAttribute('aria-pressed', String(st.src[b.dataset.cs]));
    draw();
  });
  document.getElementById('caseSearch').addEventListener('input', e => { st.q = e.target.value; st.limit = 12; draw(); });
  document.getElementById('caseAll').addEventListener('change', e => { st.all = e.target.checked; st.limit = 12; draw(); });
  document.getElementById('caseMore').addEventListener('click', () => { st.limit += 12; draw(); });
  draw();
}

/* =========================================================
   6. 화면
   ========================================================= */

function renderHome() {
  setProgress(1);
  app.innerHTML = `
    <section class="hero">
      <h1>내 진로와 연결된<br>탐구 활동을 시작해 볼까요?</h1>
      <p>희망 진로를 입력하면 2022 개정 교육과정 전체 과목과 연결된 탐구 주제부터 질문 만들기, 활동 방법, 보고서 쓰기까지 차근차근 안내해 줄게요.</p>
      <div class="flow">
        <div><b>① 진로 입력</b>희망 진로나 관심 분야를 써요</div>
        <div><b>② 주제 고르기</b>내 학년에 맞는 주제를 골라요</div>
        <div><b>③ 단계별로 따라 하기</b>체크하며 탐구를 진행해요</div>
      </div>
    </section>
    <section class="card notice-card">
      <p>🔒 <b>저장 안내</b> — 입력한 진로·탐구 질문·체크 기록은 서버로 전송하지 않고 현재 브라우저에만 저장해요. 공용 컴퓨터에서는 사용 후 <b>모든 탐구 기록 지우기</b>를 사용하세요. 이름·학번·연락처·건강정보는 입력하지 마세요.</p>
      <div class="row no-print"><button class="btn small" type="button" data-resume>↩ 진행 중인 탐구 보기</button><button class="btn ghost small" type="button" data-resetallglobal>모든 탐구 기록 지우기</button></div>
    </section>
    <section class="card">
      <h2>먼저, 몇 학년인가요?</h2>
      <p class="lead">학년에 맞게 탐구의 깊이와 기간, 연결 과목을 맞춰 드려요.</p>
      <div class="grade-grid">
        ${Object.entries(GRADES).map(([g, d]) => `
          <button class="grade-btn" type="button" data-grade="${g}" aria-label="${d.label} ${d.title}">
            <b>${d.label}</b><em>${d.title}</em><small>${d.short}</small>
          </button>`).join('')}
      </div>
    </section>`;
}

function fieldButtons(list) {
  return list.map(f => `
    <button class="field-btn" type="button" data-field="${f.id}">
      <span class="ico" aria-hidden="true">${f.icon}</span>
      <b>${esc(f.name)}</b>
      <small>${esc(f.careers.slice(0, 3).join(' · '))}</small>
    </button>`).join('');
}

function clusterButtons() {
  return CLUSTERS.map(([name, ids]) => `
    <div class="cluster">
      <h3>${esc(name)} 계열</h3>
      <div class="field-grid">${fieldButtons(ids.map(id => FIELDS.find(f => f.id === id)))}</div>
    </div>`).join('');
}

function renderCareer(s) {
  setProgress(2);
  const gd = GRADES[s.g];
  app.innerHTML = `
    <div class="row no-print"><button class="btn ghost small" type="button" data-back="home">← 학년 다시 고르기</button></div>
    <section class="card">
      <span class="tag rec">${gd.label} · ${gd.title}</span>
      <h2 class="mt-s">희망 진로나 관심 분야를 입력하세요</h2>
      <p class="lead">직업 이름(예: 간호사)이나 학과·관심 분야(예: 신소재공학, 인공지능)를 써도 좋아요.</p>
      <form class="search" id="careerForm" role="search">
        <label for="careerInput" class="sr">희망 진로</label>
        <input id="careerInput" type="text" maxlength="30" autocomplete="off" placeholder="예: 간호사, 건축가, 기자" value="${esc(s.k || '')}">
        <button class="btn primary" type="submit">찾기</button>
      </form>
      <p class="hint mt-s">🔒 이름 같은 개인정보는 쓰지 마세요. 입력한 내용은 어디에도 전송되지 않아요.</p>
      <div class="mt">
        <span class="label">이렇게 입력해 볼 수 있어요</span>
        <div class="chips">
          ${['간호사', '게임 개발자', '건축가', '변호사', '기자', '디자이너', '초등교사', '반도체'].map(x => `<button class="chip" type="button" data-try="${esc(x)}">${esc(x)}</button>`).join('')}
        </div>
      </div>
    </section>
    <section class="card">
      <h2>또는 계열에서 바로 고르기</h2>
      <p class="lead">7개 계열, ${FIELDS.length}개 분야가 있어요. 목록에 없는 진로를 입력하면 어떤 진로에도 쓸 수 있는 탐구 틀을 보여 드려요.</p>
      ${clusterButtons()}
    </section>`;
  if (!s.k) document.getElementById('careerInput').focus({ preventScroll: true });
}

function renderChoose(s) {
  setProgress(2);
  const matches = matchFields(s.k || '');
  const many = matches.length > 1;
  app.innerHTML = `
    <div class="row no-print"><button class="btn ghost small" type="button" data-back="career">← 진로 다시 입력하기</button></div>
    <section class="card">
      <h2>${many
        ? `“${esc(s.k)}”${esc(j(s.k, '은/는').slice(s.k.length))} 여러 분야와 연결돼요`
        : `“${esc(s.k)}”${esc(j(s.k, '과/와').slice(s.k.length))} 딱 맞는 분야를 아직 찾지 못했어요`}</h2>
      <p class="lead">${many ? '더 관심 있는 쪽을 골라 보세요.' : '가장 가까운 분야를 고르거나, 입력한 진로 그대로 범용 탐구 틀로 시작할 수 있어요.'}</p>
      ${many ? `<div class="field-grid">${fieldButtons(matches.map(m => m.f))}</div>` : clusterButtons()}
    </section>
    <section class="card">
      <h2>🧭 “${esc(s.k)}” 진로로 바로 시작하기</h2>
      <p class="lead">직업 알아보기, 미래 변화 조사, 주변 문제 해결하기처럼 어떤 진로에도 쓸 수 있는 탐구 주제를 보여 드려요.</p>
      <button class="btn primary" type="button" data-generic>범용 탐구 주제 보기 →</button>
    </section>`;
}

function renderTopics(s, field) {
  setProgress(3);
  const g = Number(s.g);
  const gd = GRADES[g];
  const rec = field.topics.filter(t => t.grades.includes(g));
  const other = field.topics.filter(t => !t.grades.includes(g));
  const recLevel = g - 1;
  const allSubjects = uniq(field.topics.flatMap(t => t.subjects));
  const card = (t, isRec) => `
    <button class="topic" type="button" data-topic="${t.id}">
      <div class="tags">${isRec ? `<span class="tag rec">${gd.label} 추천</span>` : ''}${kyeolTag(t)}${methodTags(t)} ${(()=>{const sl=safetyLevel(t);return `<span class="tag">${sl[0]} ${esc(sl[1])}</span>${isPeopleTopic(t)?'<span class="tag">🙋 참여자 동의 필요</span>':''}`})()}<span class="tag">난이도 ${'★'.repeat(t.difficulty || 1)}${'☆'.repeat(3-(t.difficulty||1))}</span><span class="tag">⏱ ${esc(t.time||'')}</span></div>
      <h3>${esc(t.title)}</h3>
      <p>예시 질문: ${esc(t.questions[Math.min(recLevel, t.questions.length - 1)])}</p>
      <span class="go">이 주제로 탐구하기 →</span>
    </button>`;
  const matchedNote = s.k && !field.generic ? `<p class="notice ok mt-s">“${esc(s.k)}” → <b>${esc(field.name)}</b> 분야의 탐구 주제를 찾았어요.</p>` : '';
  app.innerHTML = `
    <div class="row no-print"><button class="btn ghost small" type="button" data-back="career">← 진로 다시 입력하기</button></div>
    <section class="card">
      <div class="tags"><span class="tag rec">${gd.label} · ${gd.title}</span></div>
      <h2 class="mt-s">${field.icon} ${esc(field.name)} 탐구 주제</h2>
      <p class="lead">${esc(field.desc)}</p><p class="hint">이 분야에서 선택할 수 있는 상세 탐구 주제 <b>${field.topics.length}개</b></p>
      ${matchedNote}
      ${field.careers.length ? `<p class="hint mt-s">관련 직업: ${esc(field.careers.join(', '))}</p>` : ''}
      <p class="hint mt">📚 이 분야와 연결되는 과목</p>
      ${nationalSubjectBlock(allSubjects, field.id, 18)}
      <p class="hint mt-s">※ 학교 개설 여부에 관계없이 2022 개정 교육과정 전체에서 탐구와 연결해 볼 수 있는 과목을 제시해요. <b>우리학교 개설</b> 표시는 현재 편제표에 있는 과목만 알려 주는 참고표시이며, 대학 지원의 필수 이수 과목이나 개인별 수강 권고를 뜻하지 않습니다. 실제 수강 가능 여부는 학교·공동교육과정·온라인학교 등의 개설 상황을 확인하세요.</p>
      ${kyeolGuide()}
    </section>
    <p class="notice">💡 ${esc(gd.focus)}</p>
    ${rec.length ? `<h2 class="group-title">${gd.label}에게 추천하는 주제</h2>${rec.map(t => card(t, true)).join('')}` : ''}
    ${other.length ? `<h2 class="group-title">도전해 볼 수 있는 다른 주제</h2>${other.map(t => card(t, false)).join('')}` : ''}
    ${casePanel(field, s.k)}`;
  bindCasePanel(field, s.k);
}

function storageKey(s) { return 'cet-v2:' + [s.f, s.t, s.g, s.f === 'gen' ? s.k : ''].join(':'); }

function renderGuide(s, field, t) {
  ensureTopicMeta(t);
  setProgress(4);
  const g = Number(s.g);
  const gd = GRADES[g];
  const k = KYEOL[t.kyeol];
  const recLevel = Math.min(g - 1, t.questions.length - 1);
  const saved = store.get(storageKey(s)) || { checks: {}, myQ: '' };
  const ck = (id, text, numbered) => `
    <li><label><input type="checkbox" data-ck="${id}" ${saved.checks[id] ? 'checked' : ''}>
    <span>${numbered ? `<span class="n">${numbered}.</span>` : ''}${esc(text)}</span></label></li>`;
  const sources = COMMON_SOURCES.filter(x => x.lv <= g).concat(field.sources);
  const ethics = uniq(t.methods.flatMap(m => METHODS[m].ethics).concat(t.safety || []));
  const nextQ = g < 3 ? t.questions[recLevel + 1] : null;
  const moreSubjects = uniq(field.topics.flatMap(x => x.subjects)).filter(x => !t.subjects.includes(x));
  const fc = fieldCases(field, s.k);
  const nk = NEXT_KYEOL[t.kyeol];
  const nextCases = fc.map.filter(c => c[7] === nk).slice(0, 3).map(mapCaseItem)
    .concat(fc.ai.filter(a => a[4] === nk).slice(0, 2).map(aiCaseItem)).slice(0, 4);
  const steps = [
    ['s1', '탐구 질문'], ['s2', '조사할 내용'], ['s3', '자료 찾기'], ['s4', '활동 방법'],
    ['s5', '결과 정리'], ['s6', '보고서·발표'], ['s7', '후속 탐구']
  ];

  app.innerHTML = `
    <div class="row no-print"><button class="btn ghost small" type="button" data-back="topics">← 다른 주제 보기</button></div>

    <section class="card topic-head">
      <div class="field">${field.icon} ${esc(field.name)} · ${gd.label} ${gd.title}</div>
      <h1>${esc(t.title)}</h1>
      <div class="tags">${kyeolTag(t)}${methodTags(t)} ${(()=>{const sl=safetyLevel(t);return `<span class="tag">${sl[0]} ${esc(sl[1])}</span>${isPeopleTopic(t)?'<span class="tag">🙋 참여자 동의 필요</span>':''}`})()}</div>
      <dl class="meta">
        <dt>진로 연결</dt><dd>${esc(t.link)}</dd>
        <dt>탐구의 결</dt><dd>${k.icon} ${esc(k.kid)} (${esc(k.name)}) — ${esc(k.desc)}</dd>
        <dt>추천 기간</dt><dd>${gd.period}</dd>
        <dt>수행 난이도</dt><dd>${'★'.repeat(t.difficulty || 1)}${'☆'.repeat(3-(t.difficulty||1))} · 약 ${esc(t.time||gd.period)}</dd>
        <dt>필요 도구</dt><dd>${esc(t.tools||'주제별 자료·도구')}</dd>
        <dt>교사 확인</dt><dd>${esc(t.approval||'주제에 따라 확인')}</dd>
        <dt>추천 산출물</dt><dd>${esc(t.output||'탐구 보고서')}</dd>
      </dl>
      <p class="hint mt">📚 이 탐구와 연결되는 과목</p>
      ${nationalSubjectBlock(t.subjects, field.id, 14)}
      <details class="mt-s"><summary>우리 학교 편제에서 이어 볼 과목 보기</summary>${subjectBlock(t.subjects, g)}</details>
      <p class="hint mt-s">※ 관련 과목은 탐구 연결 예시입니다. 학교 개설 여부와 무관하게 국가 교육과정 전체를 고려했으며, 반드시 이 과목을 선택해야 한다는 뜻은 아닙니다.</p>
      <div class="mt no-print">
        <span class="hint" id="doneText"></span>
        <div class="bar" aria-hidden="true"><i id="doneBar"></i></div>
      </div>
    </section>

    <section class="card quickstart no-print">
      <h2>⚡ 10분 안에 탐구 시작하기</h2>
      <p class="lead">처음부터 전부 읽지 않아도 괜찮아요. 아래 네 가지만 먼저 하면 탐구가 실제로 시작됩니다.</p>
      <ul class="check">
        ${ck('quick0', '예시 질문 하나를 골라 내 상황에 맞게 한 문장으로 바꿨어요.')}
        ${ck('quick1', '추천 검색어 2개로 공식 자료나 책·논문 후보를 2개 이상 찾았어요.')}
        ${ck('quick2', '이번 주에 할 첫 활동(측정·조사·읽기·제작 중 하나)을 정했어요.')}
        ${ck('quick3', '결과가 예상과 달라도 그대로 기록하고 이유를 찾기로 했어요.')}
      </ul>
      <div class="mini">
        <div><b>자료 찾기 기준</b><br>가능하면 공식기관 자료 1개 + 책·논문·연구자료 1개를 함께 확인해요.</div>
        <div><b>막히면 줄이기</b><br>대상·기간·조건 중 하나를 줄이면 탐구를 끝까지 해내기 쉬워져요.</div>
      </div>
    </section>

    <nav class="step-nav no-print" aria-label="단계 바로 가기">
      ${steps.map(([id, name], i) => `<button type="button" data-jump="${id}">${i + 1}. ${name}</button>`).join('')}
    </nav>

    <section class="card section" id="s1">
      <h2><span class="num">1</span>탐구 질문 정하기</h2>
      <p class="why">탐구 질문은 탐구 전체의 방향을 정해요. 아래 예시를 그대로 쓰지 말고, 내 경험과 말로 바꿔 보세요.</p>
      <div class="qlist">
        ${t.questions.map((q, i) => `
          <div class="q ${i === recLevel ? 'rec' : ''}">
            <span class="lv">${LEVELS[i]}${i === recLevel ? ` · ${gd.label} 추천` : ''}</span>
            <p>${esc(q)}</p>
            <button class="btn small no-print" type="button" data-useq="${i}">이 질문에서 시작하기</button>
          </div>`).join('')}
      </div>
      <h3><label for="myQ">✏️ 내 탐구 질문</label></h3>
      <textarea id="myQ" placeholder="예시 질문을 고른 뒤 대상·기간·조건을 내 상황에 맞게 바꿔 보세요. 예: 청소년 → 우리 학교 2학년, 일상 → 최근 2주">${esc(saved.myQ || '')}</textarea>
      <p class="print-only" id="myQPrint"></p>
      <div class="mini mt"><div><b>① 비교·관찰 대상</b><br>예: 우리 학교 학생 / 최근 5년 / 음료 10종</div><div><b>② 바꾸거나 비교할 조건</b><br>예: 시간대 / 재료 / 자료 유형 / 집단</div><div><b>③ 확인할 결과</b><br>예: 평균 / 정확도 / 응답 비율 / 이동거리</div><div><b>④ 한 문장으로</b><br>“○○에 따라 △△은 어떻게 달라질까?”</div></div>
      <p class="notice mt"><b>조사와 탐구는 달라요.</b><br>① 배경조사: 기존 자료에서 무엇을 알았는가? → ② 내 탐구: 내가 직접 비교·측정·분석한 것은 무엇인가? → ③ 해석: 내 결과가 기존 자료와 같거나 다른 이유는 무엇인가?</p>
      <h3>질문을 만드는 틀</h3>
      <ul>${QUESTION_FORMS.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <h3>탐구 설계 미니 카드</h3>
      <div class="mini design-card">
        <label>내가 바꾸거나 비교할 조건<input type="text" data-design="condition" placeholder="예: 스마트폰 사용 시간 / 기온 구간 / 종이 구조"></label>
        <label>내가 확인할 결과<input type="text" data-design="result" placeholder="예: 평균 수면 시간 / 이동 거리 / 견딘 무게"></label>
        <label>같게 맞출 조건<input type="text" data-design="control" placeholder="예: 측정 시간 / 재료 양 / 참가자 안내 문구"></label>
        <label>자료 수 또는 참여자 수<input type="text" data-design="sample" placeholder="예: 조건마다 3회 / 익명 응답 30명 안팎"></label>
        <label>예상되는 한계<input type="text" data-design="limit" placeholder="예: 표본이 우리 반에 한정 / 날씨가 일정하지 않음"></label>
      </div>
      <p class="hint">※ 30~50명은 절대 기준이 아니에요. 소규모 수업 탐구의 현실적 목표일 뿐이며 표본 편향과 한계를 반드시 함께 적으세요.</p>
      <h3>좋은 질문인지 확인해요</h3>
      <ul class="check">${QUESTION_CHECKS.map((x, i) => ck('q' + i, x)).join('')}</ul>
      ${g >= 2 ? `<p class="plan-note mt">🎯 <b>고${g} 팁:</b> 질문을 정했다면 “나는 ○○할수록 △△할 것이라고 예상한다. 왜냐하면 …” 형식으로 예상이나 가설을 한 문장 써 보세요. 결과가 다르게 나와도 실패가 아니라 해석할 자료가 됩니다.</p>` : ''}
    </section>

    <section class="card section" id="s2">
      <h2><span class="num">2</span>조사할 내용</h2>
      <p class="why">활동을 시작하기 전에 아래 내용을 먼저 알아 두면 결과를 깊이 있게 해석할 수 있어요. 조사했으면 체크하세요.</p>
      <ul class="check">${t.research.map((x, i) => ck('r' + i, x)).join('')}</ul>
    </section>

    <section class="card section" id="s3">
      <h2><span class="num">3</span>자료 찾는 방법</h2>
      <h3>🔎 추천 검색어 <span class="hint no-print">(누르면 복사돼요)</span></h3>
      <div class="chips">${t.keywords.map(x => `<button class="chip" type="button" data-copy="${esc(x)}">${esc(x)}</button>`).join('')}</div>
      <h3>어디에서 찾을까요?</h3>
      <ul class="src">
        ${sources.map(x => `<li><b>${x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.name)} ↗</a>` : esc(x.name)}</b><small>${esc(x.what)}</small></li>`).join('')}
      </ul>
      <h3>자료 찾기 요령</h3>
      <ul>${SEARCH_TIPS.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <h3>도구를 이렇게 쓰면 좋아요</h3>
      <ul>
        ${t.methods.includes('survey')||t.methods.includes('people') ? '<li><b>설문:</b> 먼저 3~5명에게 예비조사를 해 문장이 애매하지 않은지 확인하세요. 30~50명은 소규모 학교 탐구의 현실적 목표일 수 있지만 대표성을 보장하는 절대 기준은 아니며 표본 편향을 반드시 적어요.</li>' : ''}
        ${t.methods.includes('data') ? '<li><b>Excel/Google Sheets:</b> 범주별 합계·평균은 피벗 테이블, 두 수치의 관계는 산점도와 추세선으로 확인해 보세요. 추세선이 곧 인과관계는 아닙니다.</li>' : ''}
        ${t.methods.includes('literature') ? '<li><b>RISS·KCI:</b> 제목만 보고 저장하지 말고 초록(Abstract)과 결론(Conclusion)을 먼저 읽어 내 질문과 맞는 자료인지 선별하세요.</li>' : ''}
      </ul>
      <p class="plan-note mt">📌 <b>자료 2+1 원칙</b> — 가능하면 공식기관·원자료 1개, 책·논문·연구자료 1개, 서로 다른 관점의 자료 1개를 확인해요. 자료마다 <b>저자·기관 / 날짜 / 핵심 근거 / 내가 쓸 부분</b>을 바로 메모하면 보고서 작성이 훨씬 쉬워져요.</p>
    </section>

    <section class="card section" id="s4">
      <h2><span class="num">4</span>실제 활동 방법</h2>
      <h3>📅 ${gd.label} 추천 일정 (${gd.period})</h3>
      <div class="sched">${gd.schedule.map(([w, d]) => `<div><b>${w}</b><span>${esc(d)}</span></div>`).join('')}</div>
      <h3>활동 순서 <span class="hint">(끝낸 단계에 체크하세요)</span></h3>
      <ul class="check">${t.steps.map((x, i) => ck('s' + i, x, i + 1)).join('')}</ul>
      <h3>내 상황에 맞는 수행 수준</h3>
      <div class="three">
        <div class="box"><h3>🌱 최소 버전</h3><ul>${t.minimum.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="box"><h3>📘 표준 버전</h3><ul>${t.standard.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="box"><h3>🚀 심화 버전</h3><ul>${t.advanced.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
      <div class="notice warn mt">
        <b>⚠️ 안전과 윤리, 꼭 지켜요</b>
        <ul>${ethics.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        ${isPeopleTopic(t)?'<button class="btn small no-print" type="button" data-consentcopy>🙋 참여 안내문 복사</button>':''}
      </div>
    </section>

    <section class="card section" id="s5">
      <h2><span class="num">5</span>결과 정리 방법</h2>
      <h3>${gd.label} 수준에 맞게 정리하기</h3>
      <ul>${gd.organize.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <h3>이 탐구 방법에서는</h3>
      <ul>${t.methods.map(m => `<li><b>${esc(METHODS[m].name)}</b>: ${esc(METHODS[m].organize)}</li>`).join('')}</ul>
      <p class="notice mt">🔁 <b>예상과 다른 결과도 탐구 결과입니다.</b> 차이가 없었다면 “차이가 없었다”를 수치로 제시하고, 표본·조건·측정 한계를 분석하세요. 한 번 실패했다면 한 조건만 고쳐 다시 해 보고 그 과정을 기록하세요.</p>
      ${t.methods.includes('data') || t.methods.includes('survey') ? `<p class="plan-note mt"><b>상관관계 ≠ 인과관계</b> — 두 값이 함께 변했다고 해서 한쪽이 다른 쪽의 원인이라고 단정할 수 없어요. 다른 변인과 조사 설계의 한계를 함께 적으세요.</p>` : ''}
    </section>

    <section class="card section" id="s6">
      <h2><span class="num">6</span>보고서·발표로 발전시키기</h2>
      <div class="two">
        <div class="box"><h3>📝 보고서</h3><p>${esc(gd.report.form)}</p></div>
        <div class="box"><h3>🎤 발표</h3><p>${esc(gd.report.talk)}</p></div>
      </div>
      <h3>보고서 목차</h3>
      <ol>${REPORT_OUTLINE.map(([h, d]) => `<li><b>${esc(h)}</b> — ${esc(d)}</li>`).join('')}</ol>
      <h3>발표 슬라이드 구성</h3>
      <ol>${SLIDE_OUTLINE.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
      <h3>교과 세특·창체 연계 4단계 활동 메모</h3>
      <div class="mini record-card">
        <label><b>1. 탐구 계기</b><textarea data-record="motive" rows="2" placeholder="수업에서 배운 개념과 진로 질문을 연결해 직접 작성"></textarea></label>
        <label><b>2. 탐구 과정</b><textarea data-record="process" rows="2" placeholder="내 질문, 사용한 자료, 직접 한 비교·측정·분석"></textarea></label>
        <label><b>3. 탐구 결과·한계</b><textarea data-record="result" rows="2" placeholder="핵심 수치·사실 + 표본·변인·측정 한계"></textarea></label>
        <label><b>4. 성장·확장</b><textarea data-record="growth" rows="2" placeholder="새로 배운 점 + 다음 과목·후속 탐구"></textarea></label>
      </div>
      <div class="print-only box" id="recordPrint"></div>
      <button class="btn small no-print" type="button" data-recordcopy>📋 자기평가서용 활동 정리 복사</button>
      <p class="hint mt">※ 생활기록부 문장을 학생이 대신 작성하는 기능이 아니라, 내가 실제로 한 활동과 근거를 자기평가서에 정확히 옮기기 위한 <b>학생 활동 정리</b>입니다.</p>
      <h3>생성형 AI를 썼다면 기록해요</h3>
      <div class="box"><p>사용한 도구 / 사용 목적 / 내가 확인한 원자료 / AI 답변 중 수정·버린 내용 / 최종 문장을 내가 어떻게 다시 썼는지 간단히 남기세요.</p></div>
      <h3>그래프 해석 문장 틀</h3>
      <p class="box">“________ 조건에서는 평균 ________가 나타났다. 이는 ________ 조건과 비교해 약 ________만큼 높거나 낮다. 다만 ________라는 한계가 있어 결과를 일반화하기는 어렵다.”</p>
      <h3>참고문헌 간단 서식 만들기</h3>
      <div class="mini bib-card">
        <label>기관 또는 저자<input type="text" id="bibAuthor" placeholder="예: 통계청"></label>
        <label>자료 제목<input type="text" id="bibTitle" placeholder="예: 청년 인구이동 통계"></label>
        <label>URL<input type="url" id="bibUrl" placeholder="https://..."></label>
      </div>
      <div class="row no-print"><button class="btn small" type="button" data-bibadd>+ 참고문헌 저장</button><button class="btn small ghost" type="button" data-bibcopy>목록 복사</button></div>
      <div id="bibList" class="box mt-s"></div>
      <p class="hint">주제별로 최대 5개까지 현재 브라우저에 저장해요. 기관/저자 · 제목 · URL · 확인일을 기록하고, 학교 양식이 있으면 그 양식을 우선하세요.</p>
      <h3>제출 전 마지막 점검</h3>
      <ul class="check">${REPORT_CHECKS.map((x, i) => ck('p' + i, x)).join('')}</ul>
      <p class="notice mt">💬 완성한 보고서나 발표 자료는 관련 과목 선생님께 보여 드리고 의견을 받아 보세요. 탐구하며 찍은 사진과 기록은 버리지 말고 모아 두세요.</p>
    </section>

    <section class="card section" id="s7">
      <h2><span class="num">7</span>후속 탐구 아이디어</h2>
      <p class="why">탐구는 한 번으로 끝나지 않아요. 결과에서 생긴 새로운 궁금증을 다음 탐구로 이어 가세요.</p>
      <h3>이어서 해 볼 탐구</h3>
      <ul>${t.next.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <h3>다른 결로 넓혀 보기</h3>
      <p class="notice k">${k.icon} 이 탐구는 “${esc(k.kid)}”에 가까워요. ${esc(k.next)}</p>
      ${nextCases.length ? `<p class="hint mt">참고: 이 분야 선배들의 “${esc(KYEOL[NEXT_KYEOL[t.kyeol]].kid)}” 탐구 사례</p>
      <p class="hint">⚠️ 이 주제를 하면 합격한다는 뜻이 아니에요. 주제를 따라 하지 말고 질문 구조와 방법만 참고하세요. (출처: 「모두의 학과별 탐구 지도」, 공개 자료 기반 · 학과 연결 일부 추정)</p>
      <ul class="case-list mt-s">${nextCases.join('')}</ul>` : ''}
      ${nextQ ? `<h3>질문을 한 단계 발전시키기</h3><p class="notice">${esc(nextQ)}</p>` : `<h3>고3이라면</h3><p class="notice">이 탐구에서 다룬 개념이 대학 전공에서 어떻게 이어지는지, 관련 학과의 전공 과목을 찾아 연결해 보세요.</p>`}
      ${moreSubjects.length ? `<h3>더 넓혀 볼 수 있는 과목</h3>${subjectBlock(moreSubjects, g, 8)}` : ''}
    </section>

    <div class="actions no-print">
      <button class="btn primary" type="button" data-print>🖨️ 전체 인쇄 / PDF</button>
      <button class="btn" type="button" data-plan>📄 내 탐구 계획 한 장</button>
      <button class="btn" type="button" data-copyall>📋 내용 복사</button>
      <button class="btn" type="button" data-back="topics">다른 주제 보기</button>
      <button class="btn ghost" type="button" data-reset>이 주제 기록 지우기</button>
      <button class="btn ghost" type="button" data-resetall>모든 탐구 기록 지우기</button>
    </div>
    <p class="hint no-print mt-s">PDF로 저장하려면 인쇄 창에서 “대상”을 “PDF로 저장”으로 바꾸세요.</p>`;

  const myQ = document.getElementById('myQ');
  const myQPrint = document.getElementById('myQPrint');
  const save = () => {
    const data = { checks: {}, myQ: myQ.value, design: {}, meta:{g:s.g,f:s.f,t:s.t,k:s.k||'',title:t.title,field:field.name,ts:Date.now()} };
    app.querySelectorAll('[data-design]').forEach(x => data.design[x.dataset.design] = x.value);
    data.record={}; app.querySelectorAll('[data-record]').forEach(x=>data.record[x.dataset.record]=x.value);
    data.bibs=(store.get(storageKey(s))||{}).bibs||[];
    app.querySelectorAll('[data-ck]').forEach(c => { if (c.checked) data.checks[c.dataset.ck] = true; });
    store.set(storageKey(s), data);
    updateDone();
  };
  const savedNow = store.get(storageKey(s)) || {};
  app.querySelectorAll('[data-design]').forEach(x => { x.value = (savedNow.design && savedNow.design[x.dataset.design]) || ''; });
  app.querySelectorAll('[data-record]').forEach(x => { x.value = (savedNow.record && savedNow.record[x.dataset.record]) || ''; });
  const updateDone = () => {
    const all = app.querySelectorAll('[data-ck]');
    const done = app.querySelectorAll('[data-ck]:checked').length;
    document.getElementById('doneText').textContent = `할 일 ${all.length}개 중 ${done}개 완료`;
    document.getElementById('doneBar').style.width = (all.length ? done / all.length * 100 : 0) + '%';
    myQPrint.textContent = myQ.value ? '내 탐구 질문: ' + myQ.value : '내 탐구 질문: ______________________________';
    const rp=document.getElementById('recordPrint');
    if(rp){const r={}; app.querySelectorAll('[data-record]').forEach(x=>r[x.dataset.record]=x.value.trim()); rp.innerHTML='<b>교과 세특·창체 연계 활동 메모</b><br>1. 탐구 계기: '+esc(r.motive||'(미작성)')+'<br>2. 탐구 과정: '+esc(r.process||'(미작성)')+'<br>3. 탐구 결과·한계: '+esc(r.result||'(미작성)')+'<br>4. 성장·확장: '+esc(r.growth||'(미작성)');}
  };
  app.querySelectorAll('[data-ck]').forEach(c => c.addEventListener('change', save));
  myQ.addEventListener('input', save);
  app.querySelectorAll('[data-design]').forEach(x => x.addEventListener('input', save));
  app.querySelectorAll('[data-record]').forEach(x => x.addEventListener('input', save));
  app.querySelectorAll('[data-useq]').forEach(b => b.addEventListener('click', () => {
    myQ.value = t.questions[Number(b.dataset.useq)];
    save();
    myQ.focus();
    toast('내 탐구 질문에 넣었어요. 내 말로 다듬어 보세요!');
  }));
  app.querySelector('[data-reset]').addEventListener('click', () => {
    if (!confirm('이 주제에 체크한 내용과 내가 쓴 질문을 지울까요?')) return;
    store.del(storageKey(s));
    render();
    toast('기록을 지웠어요');
  });
  const resetAll = app.querySelector('[data-resetall]');
  if (resetAll) resetAll.addEventListener('click', () => {
    if (!confirm('진로 탐구 길잡이에 저장된 질문과 체크만 지울까요? 공통 내 탐구노트는 남아 있습니다.')) return;
    clearAllMyRecords();
    render();
    toast('진로 탐구 길잡이 기록을 지웠어요');
  });
  app.querySelector('[data-copyall]').addEventListener('click', () => copyText(guideText(field, t, g, myQ.value)));
  app.querySelector('[data-plan]').addEventListener('click', () => printOnePagePlan(field, t, g, myQ.value));
  const recordBtn=app.querySelector('[data-recordcopy]');
  if(recordBtn) recordBtn.addEventListener('click',()=>{
    const r={}; app.querySelectorAll('[data-record]').forEach(x=>r[x.dataset.record]=x.value.trim());
    const subs=t.subjects.join(', ');
    copyText(`[탐구활동 자기평가서용 활동 정리]
1. 탐구 주제: ${t.title}
2. 연계 과목: ${subs}
3. 탐구 질문: ${myQ.value.trim() || '(직접 작성)'}
4. 탐구 계기: ${r.motive||'(직접 작성)'}
5. 탐구 과정 및 방법: ${r.process||'(직접 작성)'}
6. 탐구 결과 및 한계: ${r.result||'(직접 작성)'}
7. 성장 및 후속 탐구: ${r.growth||'(직접 작성)'}`);
  });
  const consentBtn=app.querySelector('[data-consentcopy]');
  if(consentBtn) consentBtn.addEventListener('click',()=>copyText(`[참여 안내]\n이 활동은 ${t.title} 탐구를 위한 익명 조사·활동입니다.\n참여는 자율이며, 참여하지 않아도 불이익이 없습니다.\n응답 또는 활동 중 언제든 그만둘 수 있습니다.\n이름, 학번, 연락처, 계정 정보는 수집하지 않습니다.\n결과는 개인을 알아볼 수 없는 통계 형태로만 사용합니다.`));
  const renderBibs=()=>{
    const data=store.get(storageKey(s))||{}; const bibs=data.bibs||[];
    const box=document.getElementById('bibList'); if(!box)return;
    box.innerHTML=bibs.length?bibs.map((b,i)=>`<div class="bibitem"><span>${i+1}. ${esc(b.text)}</span><button class="btn ghost small no-print" type="button" data-bibdel="${i}">삭제</button></div>`).join(''):'<span class="hint">저장한 참고문헌이 아직 없어요.</span>';
    box.querySelectorAll('[data-bibdel]').forEach(btn=>btn.addEventListener('click',()=>{const d=store.get(storageKey(s))||{};d.bibs=(d.bibs||[]).filter((_,i)=>i!==Number(btn.dataset.bibdel));store.set(storageKey(s),d);renderBibs();}));
  };
  const bibAdd=app.querySelector('[data-bibadd]');
  if(bibAdd) bibAdd.addEventListener('click',()=>{
    const a=(document.getElementById('bibAuthor')?.value||'').trim(); const ti=(document.getElementById('bibTitle')?.value||'').trim(); const u=(document.getElementById('bibUrl')?.value||'').trim();
    if(!a||!ti){toast('기관/저자와 자료 제목을 먼저 입력해 주세요');return;}
    const d=new Date(); const ds=`${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`; const text=`${a}. 「${ti}」. ${u?'URL: '+u+'. ':''}확인일: ${ds}`;
    const saved=store.get(storageKey(s))||{}; const bibs=saved.bibs||[]; if(bibs.length>=5){toast('참고문헌은 주제별 최대 5개까지 저장할 수 있어요');return;} bibs.push({text}); saved.bibs=bibs; saved.meta=saved.meta||{g:s.g,f:s.f,t:s.t,k:s.k||'',title:t.title,field:field.name,ts:Date.now()}; saved.meta.ts=Date.now(); store.set(storageKey(s),saved); renderBibs(); toast('참고문헌을 저장했어요');
  });
  const bibBtn = app.querySelector('[data-bibcopy]');
  if (bibBtn) bibBtn.addEventListener('click', () => { const bibs=(store.get(storageKey(s))||{}).bibs||[]; if(!bibs.length){toast('저장한 참고문헌이 없어요');return;} copyText(bibs.map((b,i)=>`${i+1}. ${b.text}`).join('\n')); });
  renderBibs();
  updateDone();
}

function printOnePagePlan(field, t, g, myQ) {
  const gd = GRADES[g];
  const k = KYEOL[t.kyeol];
  const subj = gradeSubjects(t.subjects, g).filter(([, items]) => items.length)
    .map(([title, items]) => `<div><b>${esc(title)}</b>: ${items.map(esc).join(', ')}</div>`).join('');
  const q = myQ || t.questions[Math.min(g - 1, t.questions.length - 1)];
  const w = window.open('', '_blank');
  if (w) { try { w.opener = null; } catch(e) {} }
  if (!w) { toast('팝업이 차단되었어요. 이 사이트의 팝업을 허용해 주세요.'); return; }
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>내 탐구 계획 한 장</title>
  <style>
    @page{size:A4;margin:14mm}*{box-sizing:border-box}body{font-family:system-ui,-apple-system,"Malgun Gothic",sans-serif;color:#111;line-height:1.5;font-size:11.5pt;margin:0}
    h1{font-size:20pt;margin:0 0 4px}h2{font-size:13pt;margin:14px 0 5px;border-bottom:1px solid #999;padding-bottom:3px}.meta{font-size:10pt;color:#444;margin-bottom:10px}.box{border:1px solid #bbb;border-radius:8px;padding:9px 11px;margin:6px 0}.q{font-size:13pt;font-weight:700}.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.small{font-size:9.5pt;color:#444}.line{height:24px;border-bottom:1px solid #aaa}.check{font-size:10pt}.check span{display:inline-block;margin-right:14px}footer{margin-top:12px;font-size:9pt;color:#555}
    @media print{button{display:none}}
  </style></head><body>
  <h1>내 진로 탐구 계획 한 장</h1>
  <div class="meta">${esc(field.name)} · ${esc(gd.label)} ${esc(gd.title)} · 추천 기간 ${esc(gd.period)} · ${esc(k.kid)}</div>
  <h2>1. 탐구 주제와 질문</h2><div class="box"><b>주제</b> ${esc(t.title)}<br><br><div class="q">${esc(q)}</div></div>
  <h2>2. 진로·교과 연결</h2><div class="box"><b>진로 연결</b>: ${esc(t.link)}<br>${subj}</div>
  <h2>3. 먼저 알아볼 핵심 개념</h2><div class="box">${t.research.slice(0,4).map(x=>`• ${esc(x)}`).join('<br>')}</div>
  <h2>4. 실제로 할 일</h2><div class="box">${t.steps.slice(0,6).map((x,i)=>`${i+1}. ${esc(x)}`).join('<br>')}</div>
  <div class="grid"><div><h2>5. 자료 후보</h2><div class="line"></div><div class="line"></div><div class="line"></div></div><div><h2>6. 일정</h2><div class="line">시작: </div><div class="line">중간 점검: </div><div class="line">완료: </div></div></div>
  <h2>7. 시작 전에 스스로 확인</h2><div class="check"><span>□ 안전·윤리 확인</span><span>□ 출처 기록</span><span>□ 개인정보 최소화</span><span>□ 결과를 있는 그대로 기록</span></div>
  <h2>8. 선생님 피드백</h2><div class="line"></div><div class="line"></div>
  <footer>진로 탐구 길잡이 · ${esc(SCHOOL.name)} · 이 계획서는 탐구를 시작하기 위한 초안이며, 교과 선생님의 피드백을 받아 수정해도 좋습니다.</footer>
  <script>window.onload=()=>{window.print();}<\/script></body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
}

function guideText(field, t, g, myQ) {
  const gd = GRADES[g];
  const k = KYEOL[t.kyeol];
  const L = [];
  L.push(`[진로 탐구 계획] ${t.title}`, `${field.name} · ${gd.label} ${gd.title} · 추천 기간 ${gd.period}`, '');
  L.push('■ 진로 연결: ' + t.link);
  L.push(`■ 탐구의 결: ${k.kid} (${k.name})`);
  gradeSubjects(t.subjects, g).filter(([, items]) => items.length).forEach(([title, items]) => L.push(`■ ${title}: ${items.join(', ')}`));
  L.push('', '1. 탐구 질문');
  L.push('  내 질문: ' + (myQ || '(아직 정하지 않음)'));
  t.questions.forEach((q, i) => L.push(`  - ${LEVELS[i]}: ${q}`));
  L.push('', '2. 조사할 내용');
  t.research.forEach(x => L.push('  - ' + x));
  L.push('', '3. 추천 검색어: ' + t.keywords.join(', '), '');
  L.push('4. 활동 순서');
  t.steps.forEach((x, i) => L.push(`  ${i + 1}) ${x}`));
  L.push('', '5. 결과 정리');
  gd.organize.forEach(x => L.push('  - ' + x));
  L.push('', `6. 보고서: ${gd.report.form} / 발표: ${gd.report.talk}`, '');
  L.push('7. 후속 탐구 아이디어');
  t.next.forEach(x => L.push('  - ' + x));
  L.push('  - 다른 결로 넓히기: ' + k.next);
  return L.join('\n');
}

function showResume(){
  const items=savedProgressItems();
  if(!items.length){toast('저장된 진행 기록이 없어요');return;}
  const existing=document.getElementById('resumePanel'); if(existing){existing.remove();return;}
  const sec=document.createElement('section');sec.id='resumePanel';sec.className='card';
  sec.innerHTML=`<h2>↩ 이어서 할 탐구</h2><p class="hint">최근 저장한 순서예요. 원하는 탐구를 누르면 바로 이어집니다.</p><div class="topic-grid">${items.map((x,i)=>{const m=x.v.meta||{};return `<button class="topic" type="button" data-resumeitem="${i}"><h3>${esc(m.title||'탐구')}</h3><p>${esc(m.field||'')} ${x.v.myQ?'· '+esc(x.v.myQ):''}</p></button>`}).join('')}</div>`;
  app.insertBefore(sec,app.children[2]||null);
  sec.querySelectorAll('[data-resumeitem]').forEach(b=>b.addEventListener('click',()=>{const m=items[Number(b.dataset.resumeitem)].v.meta||{};if(m.g&&m.f&&m.t)go({g:m.g,f:m.f,t:m.t,k:m.k||''});}));
}

function render() {
  /* 학생용 단일 화면: 교사용 대시보드는 사용하지 않습니다. */
  const s = readState();
  let field, topic;
  if (!s.g) renderHome();
  else if (s.m && s.k) renderChoose(s);
  else if (!s.f || !(field = getField(s))) renderCareer(s);
  else if (!s.t || !(topic = field.topics.find(t => t.id === s.t))) renderTopics(s, field);
  else renderGuide(s, field, topic);
  window.scrollTo(0, 0);
}

// 화면이 바뀌면 키보드 포커스를 새 화면의 제목으로 옮김 (입력칸에 이미 포커스가 있으면 그대로 둠)
function moveFocus() {
  if (app.contains(document.activeElement) && document.activeElement.matches('input, textarea')) return;
  const h = app.querySelector('h1, h2');
  if (!h) return;
  h.setAttribute('tabindex', '-1');
  h.focus({ preventScroll: true });
}

/* =========================================================
   6. 클릭·입력 처리
   ========================================================= */

document.addEventListener('click', e => {
  const el = e.target.closest('button');
  if (!el) return;
  const s = readState();
  const d = el.dataset;
  if ('home' in d) go({});
  else if (d.grade) go({ g: d.grade });
  else if (d.try) { document.getElementById('careerInput').value = d.try; search(s.g, d.try); }
  else if (d.field) go({ g: s.g, f: d.field, k: s.k });
  else if ('generic' in d) go({ g: s.g, f: 'gen', k: s.k });
  else if (d.topic) go({ g: s.g, f: s.f, k: s.k, t: d.topic });
  else if (d.back === 'home') go({});
  else if (d.back === 'career') go({ g: s.g, k: s.k });
  else if (d.back === 'topics') go({ g: s.g, f: s.f, k: s.k });
  else if (d.jump) document.getElementById(d.jump).scrollIntoView({ behavior: 'smooth', block: 'start' });
  else if (d.copy) copyText(d.copy);
  else if ('resume' in d) showResume();
  else if ('resetallglobal' in d) { if(confirm('진로 탐구 길잡이에 저장된 기록만 지울까요? 공통 내 탐구노트는 남아 있습니다.')){clearAllMyRecords();toast('진로 탐구 길잡이 기록을 지웠어요');} }
  else if ('print' in d) window.print();
});

document.addEventListener('submit', e => {
  if (e.target.id !== 'careerForm') return;
  e.preventDefault();
  const value = document.getElementById('careerInput').value.trim();
  if (!value) { toast('희망 진로나 관심 분야를 입력해 주세요'); return; }
  search(readState().g, value);
});

// 한 분야가 다른 분야보다 더 많이 맞으면 바로 이동, 비슷하면 고르게 함
function search(g, value) {
  const k = value.trim().slice(0, 30);
  const matches = matchFields(k);
  // ‘수학교사·체육교사’처럼 교과+교사 형태는 교과 분야와 교육 분야를 학생이 직접 고르게 합니다.
  if (/교사$/.test(k) && matches.length > 1) { go({ g, k, m: '1' }); return; }
  if (matches.length && (matches.length === 1 || matches[0].score > matches[1].score)) go({ g, f: matches[0].f.id, k });
  else go({ g, k, m: '1' });
}

document.getElementById('schoolNote').textContent =
  `📚 과목 연결은 2022 개정 고등학교 교육과정 전체(일반·진로·융합선택과 교양·계열 선택 포함)를 기준으로 보고, ${SCHOOL.name} 「${SCHOOL.source}」는 ‘우리학교 개설’ 여부를 표시하는 참고 자료로만 사용해요. 실제 수강 가능 여부는 학교·공동교육과정·온라인학교 등의 개설 상황을 확인하세요. 🧪 실제 실험·설문·현장 활동은 안전·윤리를 우선하고 담당 선생님과 먼저 상의하세요. 🗺️ 대학 공개 탐구 사례는 질문 구조·자료 활용·분석 방법을 참고하기 위한 자료이며, 제목이나 결론을 그대로 따라 하기보다 자신의 진로·수업·자료에 맞게 질문을 새롭게 설정하세요.`;

window.addEventListener('hashchange', () => { render(); moveFocus(); });
render();
