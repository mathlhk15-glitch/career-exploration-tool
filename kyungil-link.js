/* v2.5 진로 탐구 길잡이 ↔ 경일 진로·탐구 성장 시스템 연결
 * app.js가 그린 화면을 바꾸지 않고, 화면이 그려진 뒤 공통 메뉴·진로 실험실 결과·“탐구노트에 담기” 카드를 덧붙입니다.
 * app.js의 전역 함수 readState·getField·storageKey·esc·toast를 읽기만 합니다.
 */
(function () {
  'use strict';
  var K = window.KIS, N = window.KNotes;
  if (!K || !N || typeof readState !== 'function') return;
  var S = K.SITES, e2 = K.esc;
  K.mountNav('topic', document.querySelector('header.top'));
  N.migrate();

  var css = document.createElement('style');
  css.textContent = '.kis-hubintro{box-sizing:border-box;max-width:780px;border:1px solid var(--line);border-left:4px solid var(--primary);background:var(--surface);border-radius:14px;padding:12px 16px;margin:16px auto}.kis-hubintro p{margin:.25em 0}.kis-hubintro a{font-weight:800}' + '.kis-card{border-left:4px solid var(--primary)}.kis-card .kis-links{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:15px}.kis-lab{border-left:4px solid var(--accent)}';
  document.head.appendChild(css);

  var app = document.getElementById('app');
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function syncHubIntro(s) {
    var hi = document.getElementById('kisHubIntro');
    var show = !s.g && location.search.indexOf('teacher=1') < 0;
    if (!show) { if (hi) hi.remove(); return; }
    if (!hi) {
      hi = el('<section class="kis-hubintro no-print" id="kisHubIntro"><b>🧭 주제·과목·탐구 방법을 깊게 찾는 곳이에요.</b> <a href="' + S.hub + 'index.html">처음이면 통합 허브에서 시작하기 →</a></section>');
      app.parentNode.insertBefore(hi, app);
    }
  }

  function labCard(s) {
    var lab = N.labBridge();
    if (!lab.has || !lab.job) return null;
    var grades = Object.keys(GRADES).map(function (g) { return '<button class="btn small" type="button" data-kislab="' + g + '">' + e2(GRADES[g].label) + '으로 찾기</button>'; }).join('');
    return el('<section class="card kis-lab no-print" id="kisLab"><h2>🌱 진로 실험실에서 찾은 관심</h2>' +
      '<p class="lead">' + e2(N.interestText(lab)) + '</p>' +
      (s.g ? '<div class="row"><button class="btn small" type="button" data-kislab="' + s.g + '">“' + e2(lab.job) + '”로 주제 찾기</button></div>' : '<p class="hint">학년을 고르면 이 진로로 탐구 주제를 찾아 드려요.</p><div class="row">' + grades + '</div>') +
      '</section>');
  }

  function noteCard(s) {
    var field = getField(s); if (!field) return null;
    var t = field.topics.filter(function (x) { return x.id === s.t; })[0]; if (!t) return null;
    var key = storageKey(s);
    var linked = N.findBy(function (n) { return n.links.explore === key; });
    var card = el('<section class="card kis-card no-print" id="kisNote"><h2>📓 내 탐구노트에 담기</h2>' +
      '<p class="lead">이 주제와 위에 쓴 <b>내 탐구 질문</b>을 공통 탐구노트에 담아요. 질문 수준(찾기 → 설명하기 → 비교·분석하기 → 판단·확장하기)과 질문에 맞는 방법 점검, 근거·수정·생각 변화 기록은 탐구노트에서 이어서 해요.</p>' +
      '<div class="row"><button class="btn" type="button" id="kisSave">' + (linked ? '탐구노트 업데이트' : '탐구노트에 담기') + '</button>' +
      (linked ? '<a class="btn ghost" href="' + S.hub + 'notes.html#' + encodeURIComponent(linked.id) + '">탐구노트 열기</a>' : '') + '</div>' +
      '<p class="hint" id="kisMsg" role="status"></p>' +
      '<p class="kis-links"><a href="' + S.guide + '#question">🛟 질문이 너무 쉬운 것 같아요</a><a href="' + S.guide + '#evidence">🛟 자료를 믿어도 될까요?</a><a id="kisLabContinue" href="' + S.lab + 'inquiry.html' + (linked ? '?note=' + encodeURIComponent(linked.id) : '') + '">🔬 진로 실험실에서 설계안 쓰기</a></p></section>');
    card.querySelector('#kisSave').addEventListener('click', function () {
      var q = (document.getElementById('myQ') || {}).value || '';
      if (!q.trim()) q = t.questions[Math.min(Number(s.g) - 1, t.questions.length - 1)] || t.questions[0];
      var patch = {
        topic: t.title, field: field.name, interest: s.k || field.name,
        subject: (t.subjects || []).slice(0, 3).join(', '), grade: String(s.g || ''),
        question: q.trim(), method: K.MAP.fromExplore[(t.methods || [])[0]] || '',
        start: { from: s.k ? 'career' : '' },
        links: { explore: key, exploreUrl: location.href }
      };
      var n = N.findBy(function (x) { return x.links.explore === key; });
      n = n ? N.merge(n.id, patch) : N.create(patch, 'explore');
      N.setActive(n.id);
      var msg = card.querySelector('#kisMsg');
      msg.innerHTML = '담았어요. <a href="' + S.hub + 'notes.html#' + encodeURIComponent(n.id) + '">탐구노트에서 이어 쓰기 →</a>';
      this.textContent = '탐구노트 업데이트';
      var goLab = card.querySelector('#kisLabContinue'); if (goLab) goLab.href = S.lab + 'inquiry.html?note=' + encodeURIComponent(n.id);
      if (typeof toast === 'function') toast('내 탐구노트에 담았어요');
    });
    return card;
  }

  function decorate() {
    var s = readState();
    syncHubIntro(s);
    if (!document.getElementById('kisLab') && (!s.g || (s.g && !s.f && document.getElementById('careerInput')))) {
      var lc = labCard(s);
      if (lc) { var hero = app.querySelector('.hero'), first = app.querySelector('section'); if (hero) hero.after(lc); else if (first) first.before(lc); }
    }
    if (s.t && !document.getElementById('kisNote')) {
      var s1 = document.getElementById('s1'), nc = noteCard(s);
      if (s1 && nc) s1.after(nc);
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-kislab]'); if (!b) return;
    var lab = N.labBridge(); if (lab.job) search(b.getAttribute('data-kislab'), lab.job);
  });
  new MutationObserver(function () { decorate(); }).observe(app, { childList: true });
  decorate();
})();
