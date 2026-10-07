(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const termById = Object.fromEntries(TERMS.map((t) => [t.id, t]));
  const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

  const state = { query: "", category: "all" };

  /* ----------------------------- Tabs / views ----------------------------- */
  function showView(view) {
    $$(".tabs [role=tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.view === view)));
    $$(".view").forEach((v) => (v.hidden = v.id !== `view-${view}`));
  }

  /* ------------------------------- Glosarium ------------------------------ */
  function renderChips() {
    const chips = [{ id: "all", name: "Semua", icon: "✨" }, ...CATEGORIES];
    $("#category-chips").innerHTML = chips
      .map(
        (c) =>
          `<button class="chip" data-cat="${c.id}" aria-pressed="${state.category === c.id}">${c.icon} ${esc(c.name)}</button>`
      )
      .join("");
  }

  function matches(t) {
    if (state.category !== "all" && t.category !== state.category) return false;
    if (!state.query) return true;
    const hay = norm([t.term, t.en, t.short, t.definition, t.analogy, t.example.title, t.example.text].join(" "));
    return norm(state.query)
      .split(/\s+/)
      .filter(Boolean)
      .every((w) => hay.includes(w));
  }

  function renderTerms() {
    const list = TERMS.filter(matches);
    $("#result-count").textContent = state.query || state.category !== "all" ? `${list.length} istilah ditemukan` : `${TERMS.length} istilah dalam ${CATEGORIES.length} kategori`;

    if (!list.length) {
      $("#term-groups").innerHTML = `<div class="empty">🤔 Tidak ada istilah yang cocok dengan “${esc(state.query)}”. Coba kata lain, misalnya <em>enkripsi</em>, <em>hak</em>, atau <em>kontrak</em>.</div>`;
      return;
    }

    $("#term-groups").innerHTML = CATEGORIES.map((c) => {
      const items = list.filter((t) => t.category === c.id);
      if (!items.length) return "";
      return `
        <section class="group">
          <header class="group-head">
            <h2>${c.icon} ${esc(c.name)}</h2>
            <p>${esc(c.desc)}</p>
          </header>
          <div class="grid">
            ${items
              .map(
                (t) => `
              <a class="card" href="#term/${t.id}" data-cat="${t.category}">
                <div class="card-top">
                  <h3>${esc(t.term)}</h3>
                  ${t.demo ? `<span class="badge" title="Ada demo interaktif">🧪 Demo</span>` : ""}
                </div>
                <p class="en">${esc(t.en)}</p>
                <p>${esc(t.short)}</p>
                <span class="more">Lihat penjelasan & contoh →</span>
              </a>`
              )
              .join("")}
          </div>
        </section>`;
    }).join("");
  }

  /* --------------------------------- Modal -------------------------------- */
  let lastFocus = null;

  function openTerm(id) {
    const t = termById[id];
    if (!t) return;
    const c = catById[t.category];
    if ($("#modal").hidden) lastFocus = document.activeElement;

    const related = (t.related || [])
      .filter((r) => termById[r])
      .map((r) => `<a class="chip small" href="#term/${r}">${esc(termById[r].term)}</a>`)
      .join("");

    $("#modal-body").innerHTML = `
      <p class="eyebrow" data-cat="${t.category}">${c.icon} ${esc(c.name)}</p>
      <h2 id="modal-title">${esc(t.term)}</h2>
      <p class="en big">${esc(t.en)}</p>

      <div class="block">
        <h3>📖 Definisi</h3>
        <p>${esc(t.definition)}</p>
      </div>

      <div class="block analogy">
        <h3>💡 Analogi sederhana</h3>
        <p>${esc(t.analogy)}</p>
      </div>

      <div class="block example">
        <h3>🧾 Contoh kasus: ${esc(t.example.title)}</h3>
        <p>${esc(t.example.text)}</p>
        <ul>${t.example.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>

      ${t.demo ? `<div class="block demo"><h3>🧪 Coba sendiri</h3><div id="demo-mount"></div></div>` : ""}

      ${t.misconception ? `<div class="block warn"><h3>⚠️ Hati-hati / miskonsepsi</h3><p>${esc(t.misconception)}</p></div>` : ""}

      <div class="block refs">
        <h3>📚 Rujukan</h3>
        <dl>
          <dt>🇮🇩 UU PDP</dt><dd>${esc(t.refs.pdp)}</dd>
          <dt>🇪🇺 GDPR</dt><dd>${esc(t.refs.gdpr)}</dd>
        </dl>
      </div>

      ${related ? `<div class="block"><h3>🔗 Istilah terkait</h3><div class="chips">${related}</div></div>` : ""}
    `;

    if (t.demo && window.Demos && Demos[t.demo]) Demos[t.demo]($("#demo-mount"));

    const modal = $("#modal");
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    $(".modal-card").scrollTop = 0;
    $(".modal-close").focus();
    document.title = `${t.term} · Kamus Privasi Data`;
  }

  function closeModal() {
    if ($("#modal").hidden) return;
    $("#modal").hidden = true;
    document.body.classList.remove("no-scroll");
    document.title = "Kamus Privasi Data";
    if (location.hash.startsWith("#term/")) history.replaceState(null, "", "#glosarium");
    if (lastFocus) lastFocus.focus();
  }

  /* ------------------------------ Perbandingan ---------------------------- */
  function renderCompare() {
    const { cols, rows } = COMPARE_TECH;
    $("#compare-tech").innerHTML = `
      <thead><tr><th></th>${cols.map((c) => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${rows
        .map((r) => `<tr><th scope="row">${esc(r.label)}</th>${r.vals.map((v) => `<td>${esc(v)}</td>`).join("")}</tr>`)
        .join("")}</tbody>`;

    const bases = TERMS.filter((t) => t.category === "hukum");
    const letters = ["a", "b", "c", "d", "e", "f"];
    $("#basis-grid").innerHTML = bases
      .map(
        (t, i) => `
        <a class="basis" href="#term/${t.id}">
          <span class="basis-letter">${letters[i]}</span>
          <h3>${esc(t.term)}</h3>
          <p class="en">${esc(t.en)}</p>
          <p>${esc(t.short)}</p>
          <p class="basis-ex"><b>Contoh:</b> ${esc(t.example.points[0].replace(/\s*[✅❌]\s*/g, " ").trim())}</p>
        </a>`
      )
      .join("");
  }

  /* ---------------------------------- Kuis -------------------------------- */
  const quizState = { answered: {}, score: 0 };

  function renderQuiz() {
    const total = QUIZ.length;
    const done = Object.keys(quizState.answered).length;
    $("#quiz").innerHTML = `
      <div class="quiz-score">
        <span>Skor: <b>${quizState.score}</b> / ${total}</span>
        <span class="muted">${done}/${total} dijawab</span>
        <div class="bar"><span style="width:${(done / total) * 100}%"></span></div>
        ${done ? `<button class="btn ghost" id="quiz-reset">↺ Ulangi</button>` : ""}
      </div>
      ${QUIZ.map((item, i) => {
        const picked = quizState.answered[i];
        const opts = item.options
          .map((o) => {
            let cls = "opt";
            if (picked) {
              if (o === item.answer) cls += " correct";
              else if (o === picked) cls += " wrong";
            }
            return `<button class="${cls}" data-q="${i}" data-opt="${o}" ${picked ? "disabled" : ""}>${esc(termById[o].term)}</button>`;
          })
          .join("");
        const fb = picked
          ? `<div class="feedback ${picked === item.answer ? "ok" : "no"}">
               <b>${picked === item.answer ? "✅ Tepat!" : `❌ Kurang tepat — jawabannya: ${esc(termById[item.answer].term)}`}</b>
               <p>${esc(item.why)}</p>
               <a href="#term/${item.answer}">Pelajari “${esc(termById[item.answer].term)}” →</a>
             </div>`
          : "";
        return `<div class="q"><p class="q-num">Kasus ${i + 1}</p><p class="q-text">${esc(item.q)}</p><div class="opts">${opts}</div>${fb}</div>`;
      }).join("")}`;
  }

  /* --------------------------------- Router ------------------------------- */
  function route() {
    const h = location.hash.slice(1);
    if (h.startsWith("term/")) {
      showView("glosarium");
      openTerm(h.slice(5));
      return;
    }
    closeModal();
    showView(["glosarium", "banding", "kuis", "tentang"].includes(h) ? h : "glosarium");
  }

  /* --------------------------------- Events ------------------------------- */
  function bind() {
    $(".tabs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-view]");
      if (b) location.hash = b.dataset.view;
    });

    $("#search").addEventListener("input", (e) => {
      state.query = e.target.value.trim();
      renderTerms();
    });

    $("#category-chips").addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      state.category = b.dataset.cat;
      renderChips();
      renderTerms();
    });

    $("#modal").addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeModal();
    });

    $("#quiz").addEventListener("click", (e) => {
      if (e.target.id === "quiz-reset") {
        quizState.answered = {};
        quizState.score = 0;
        renderQuiz();
        return;
      }
      const b = e.target.closest(".opt");
      if (!b || b.disabled) return;
      const i = Number(b.dataset.q);
      quizState.answered[i] = b.dataset.opt;
      if (b.dataset.opt === QUIZ[i].answer) quizState.score++;
      renderQuiz();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
      const typing = /input|textarea|select/i.test(document.activeElement.tagName);
      if (e.key === "/" && !typing && $("#modal").hidden) {
        e.preventDefault();
        location.hash = "glosarium";
        $("#search").focus();
      }
    });

    window.addEventListener("hashchange", route);
  }

  renderChips();
  renderTerms();
  renderCompare();
  renderQuiz();
  bind();
  route();
})();
