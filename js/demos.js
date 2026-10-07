/*
 * Demo interaktif untuk istilah teknis. Semua proses berjalan lokal di browser
 * (Web Crypto API) — tidak ada data yang dikirim ke server.
 */
window.Demos = (() => {
  "use strict";

  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  const toB64 = (u8) => btoa(String.fromCharCode(...u8));
  const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const randHex = (n) => toHex(crypto.getRandomValues(new Uint8Array(n)));
  const hasSubtle = !!(window.crypto && crypto.subtle);
  const noCrypto = `<p class="demo-note">⚠️ Browser ini tidak menyediakan Web Crypto API (biasanya karena halaman dibuka lewat HTTP biasa, bukan HTTPS/localhost).</p>`;

  /* ------------------------------ Enkripsi ------------------------------ */
  async function deriveKey(password, salt) {
    const base = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
      base,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  function encrypt(root) {
    if (!hasSubtle) return (root.innerHTML = noCrypto);
    root.innerHTML = `
      <p class="demo-note">AES-GCM 256-bit, kunci diturunkan dari kata sandi dengan PBKDF2. Coba dekripsi dengan kata sandi yang salah.</p>
      <div class="demo-grid">
        <label>Plaintext (data asli)
          <textarea id="d-plain" rows="2">Nama: Budi Santoso, NIK: 3171012345670001</textarea>
        </label>
        <label>Kata sandi / kunci
          <input id="d-pass" value="RahasiaKantor#2026" />
        </label>
      </div>
      <button class="btn" id="d-enc">🔒 Enkripsi</button>
      <label>Ciphertext (Base64: salt + IV + data terenkripsi)
        <textarea id="d-cipher" rows="3" readonly placeholder="Hasil enkripsi akan muncul di sini…"></textarea>
      </label>
      <div class="demo-grid">
        <label>Kata sandi untuk dekripsi
          <input id="d-pass2" value="RahasiaKantor#2026" />
        </label>
        <div class="demo-actions"><button class="btn" id="d-dec">🔓 Dekripsi</button></div>
      </div>
      <div class="demo-out" id="d-result" aria-live="polite"></div>
      <p class="demo-note">Perhatikan: mengenkripsi teks yang sama dua kali menghasilkan ciphertext berbeda karena salt dan IV dibuat acak.</p>`;

    const out = root.querySelector("#d-result");
    root.querySelector("#d-enc").onclick = async () => {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(root.querySelector("#d-pass").value, salt);
      const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(root.querySelector("#d-plain").value)));
      const packed = new Uint8Array(salt.length + iv.length + ct.length);
      packed.set(salt, 0);
      packed.set(iv, salt.length);
      packed.set(ct, salt.length + iv.length);
      root.querySelector("#d-cipher").value = toB64(packed);
      out.className = "demo-out";
      out.textContent = "Terenkripsi. Tanpa kata sandi, ciphertext di atas tidak bermakna.";
    };
    root.querySelector("#d-dec").onclick = async () => {
      const b64 = root.querySelector("#d-cipher").value.trim();
      if (!b64) {
        out.className = "demo-out no";
        out.textContent = "Enkripsi dulu sebelum mendekripsi.";
        return;
      }
      try {
        const packed = fromB64(b64);
        const key = await deriveKey(root.querySelector("#d-pass2").value, packed.slice(0, 16));
        const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: packed.slice(16, 28) }, key, packed.slice(28));
        out.className = "demo-out ok";
        out.textContent = `✅ Berhasil didekripsi: ${dec.decode(pt)}`;
      } catch {
        out.className = "demo-out no";
        out.textContent = "❌ Gagal mendekripsi: kunci salah atau ciphertext telah diubah (AES-GCM juga menjaga integritas).";
      }
    };
  }

  /* ------------------------------- Hashing ------------------------------ */
  const sha256 = async (s) => toHex(await crypto.subtle.digest("SHA-256", enc.encode(s)));

  function diffBits(a, b) {
    let n = 0;
    for (let i = 0; i < a.length; i += 2) {
      let x = parseInt(a.substr(i, 2), 16) ^ parseInt(b.substr(i, 2), 16);
      while (x) {
        n += x & 1;
        x >>= 1;
      }
    }
    return n;
  }

  function hash(root) {
    if (!hasSubtle) return (root.innerHTML = noCrypto);
    const salt = randHex(8);
    root.innerHTML = `
      <p class="demo-note">SHA-256 dihitung langsung saat Anda mengetik. Ubah satu huruf saja di input B dan lihat seberapa besar perubahan hash-nya.</p>
      <label>Input A <input id="h-a" value="budi@contoh.id" /></label>
      <code class="hash" id="h-ha"></code>
      <label>Input B <input id="h-b" value="budi@contoh.ie" /></label>
      <code class="hash" id="h-hb"></code>
      <div class="demo-out" id="h-diff"></div>
      <label class="check"><input type="checkbox" id="h-salt" /> Tambahkan salt rahasia <code>${salt}</code> (hash = SHA-256(salt + input))</label>
      <p class="demo-note">Tanpa salt rahasia, siapa pun dapat menghitung SHA-256 dari semua kemungkinan email/NIK lalu mencocokkannya. Karena itu hash data pribadi masih tergolong <b>pseudonimisasi</b>, bukan anonimisasi.</p>`;

    const update = async () => {
      const s = root.querySelector("#h-salt").checked ? salt : "";
      const a = await sha256(s + root.querySelector("#h-a").value);
      const b = await sha256(s + root.querySelector("#h-b").value);
      root.querySelector("#h-ha").textContent = a;
      root.querySelector("#h-hb").textContent = b;
      const d = diffBits(a, b);
      root.querySelector("#h-diff").innerHTML =
        a === b
          ? "Input identik → hash identik. Inilah yang memungkinkan hash dipakai untuk mencocokkan data."
          : `<b>${d} dari 256 bit</b> (${Math.round((d / 256) * 100)}%) berbeda — avalanche effect.`;
    };
    root.querySelectorAll("input").forEach((i) => i.addEventListener("input", update));
    update();
  }

  /* --------------------------- Pseudonimisasi --------------------------- */
  const PATIENTS = [
    { nama: "Budi Santoso", nik: "3171012345670001", umur: 34, kota: "Jakarta", diagnosis: "Diabetes tipe 2" },
    { nama: "Siti Rahma", nik: "3273024506880002", umur: 29, kota: "Bandung", diagnosis: "Hipertensi" },
    { nama: "Andi Wijaya", nik: "3578031207750003", umur: 51, kota: "Surabaya", diagnosis: "Asma" },
    { nama: "Dewi Lestari", nik: "5171044309920004", umur: 41, kota: "Denpasar", diagnosis: "Diabetes tipe 2" },
  ];

  function pseudonym(root) {
    let mapping = null;
    let reveal = false;

    const render = () => {
      const rows = PATIENTS.map((p, i) => {
        const id = mapping ? mapping[i].code : null;
        const showReal = !mapping || reveal;
        return `<tr>
          <td>${mapping ? `<span class="pill">${id}</span>` : esc(p.nama)}${mapping && reveal ? `<br><small class="muted">${esc(p.nama)}</small>` : ""}</td>
          <td>${mapping && !showReal ? "—" : esc(p.nik)}</td>
          <td>${p.umur}</td><td>${esc(p.kota)}</td><td>${esc(p.diagnosis)}</td></tr>`;
      }).join("");

      root.innerHTML = `
        <p class="demo-note">Dataset rekam medis yang akan dibagikan ke tim peneliti.</p>
        <div class="demo-actions">
          <button class="btn" id="p-go">${mapping ? "↺ Kembalikan data asli" : "🎭 Pseudonimisasi"}</button>
          ${mapping ? `<button class="btn ghost" id="p-reveal">${reveal ? "🙈 Sembunyikan lagi" : "🔑 Re-identifikasi (pakai tabel kunci)"}</button>` : ""}
        </div>
        <p class="demo-label">📄 Dataset untuk peneliti</p>
        <div class="table-scroll"><table class="mini">
          <thead><tr><th>Nama / Kode</th><th>NIK</th><th>Umur</th><th>Kota</th><th>Diagnosis</th></tr></thead>
          <tbody>${rows}</tbody></table></div>
        ${
          mapping
            ? `<div class="vault">
                 <p class="demo-label">🔐 Tabel kunci — disimpan TERPISAH oleh unit rekam medis (akses terbatas)</p>
                 <ul>${mapping.map((m, i) => `<li><span class="pill">${m.code}</span> → ${esc(PATIENTS[i].nama)} · ${esc(PATIENTS[i].nik)}</li>`).join("")}</ul>
               </div>
               <p class="demo-note">Peneliti tetap bisa menganalisis umur, kota, dan diagnosis. Namun karena tabel kunci masih ada, data ini <b>tetap data pribadi</b>. Perhatikan juga: kombinasi umur + kota + diagnosis yang langka masih berisiko mengungkap identitas.</p>`
            : ""
        }`;

      root.querySelector("#p-go").onclick = () => {
        mapping = mapping ? null : PATIENTS.map(() => ({ code: "PSN-" + randHex(2).toUpperCase() }));
        reveal = false;
        render();
      };
      const r = root.querySelector("#p-reveal");
      if (r)
        r.onclick = () => {
          reveal = !reveal;
          render();
        };
    };
    render();
  }

  /* ---------------------- Anonimisasi / k-anonymity --------------------- */
  const SURVEY = [
    [23, "12940", "P", "Flu"], [27, "12945", "P", "Asma"], [25, "12950", "P", "Flu"],
    [29, "12955", "P", "Migrain"], [34, "13110", "L", "Diabetes"], [36, "13115", "L", "Flu"],
    [38, "13120", "L", "Hipertensi"], [31, "13125", "L", "Asma"], [45, "14210", "P", "Hipertensi"],
    [47, "14215", "P", "Diabetes"], [42, "14220", "P", "Flu"], [49, "14225", "P", "Hipertensi"],
  ];

  function anonym(root) {
    const s = { age: 0, zip: 0, sex: true };

    const genAge = (a) => {
      if (s.age === 0) return String(a);
      const w = s.age === 1 ? 5 : 10;
      const lo = Math.floor(a / w) * w;
      return `${lo}–${lo + w - 1}`;
    };
    const genZip = (z) => (s.zip === 0 ? z : z.slice(0, 5 - s.zip) + "*".repeat(s.zip));

    const render = () => {
      const rows = SURVEY.map(([a, z, sx, d]) => ({ a: genAge(a), z: genZip(z), sx: s.sex ? sx : "*", d }));
      const keyOf = (r) => `${r.a}|${r.z}|${r.sx}`;
      const counts = {};
      rows.forEach((r) => (counts[keyOf(r)] = (counts[keyOf(r)] || 0) + 1));
      const k = Math.min(...Object.values(counts));
      const unique = rows.filter((r) => counts[keyOf(r)] === 1).length;

      root.innerHTML = `
        <p class="demo-note">Kolom <b>umur, kode pos, dan jenis kelamin</b> adalah quasi-identifier. Nama sudah dihapus — tetapi apakah sudah anonim? Atur generalisasi dan lihat nilai <b>k</b>.</p>
        <div class="demo-grid three">
          <label>Umur
            <select id="a-age"><option value="0">Angka persis</option><option value="1">Rentang 5 tahun</option><option value="2">Rentang 10 tahun</option></select>
          </label>
          <label>Kode pos
            <select id="a-zip"><option value="0">5 digit</option><option value="1">Sembunyikan 1 digit</option><option value="2">Sembunyikan 2 digit</option></select>
          </label>
          <label>Jenis kelamin
            <select id="a-sex"><option value="1">Tampilkan</option><option value="0">Sembunyikan</option></select>
          </label>
        </div>
        <div class="kmeter ${k >= 3 ? "ok" : k === 2 ? "mid" : "no"}">
          <span class="k">k = ${k}</span>
          <span>${
            k === 1
              ? `❌ ${unique} orang memiliki kombinasi unik dan mudah dikenali (singling out).`
              : k === 2
              ? "⚠️ Setiap orang tersamar di antara 2 orang — masih lemah."
              : `✅ Setiap orang tersamar di antara minimal ${k} orang.`
          }</span>
        </div>
        <div class="table-scroll"><table class="mini">
          <thead><tr><th>Umur</th><th>Kode pos</th><th>JK</th><th>Diagnosis (sensitif)</th></tr></thead>
          <tbody>${rows
            .map((r) => `<tr class="${counts[keyOf(r)] === 1 ? "risk" : ""}"><td>${r.a}</td><td>${r.z}</td><td>${r.sx}</td><td>${esc(r.d)}</td></tr>`)
            .join("")}</tbody></table></div>
        <p class="demo-note">Baris merah = unik (berisiko). Trade-off-nya: semakin digeneralisasi, semakin privat, tetapi semakin berkurang detail untuk analisis. k-anonymity juga belum cukup bila semua anggota kelompok memiliki diagnosis yang sama.</p>`;

      const age = root.querySelector("#a-age");
      const zip = root.querySelector("#a-zip");
      const sex = root.querySelector("#a-sex");
      age.value = s.age;
      zip.value = s.zip;
      sex.value = s.sex ? "1" : "0";
      age.onchange = () => ((s.age = +age.value), render());
      zip.onchange = () => ((s.zip = +zip.value), render());
      sex.onchange = () => ((s.sex = sex.value === "1"), render());
    };
    render();
  }

  /* ------------------------------ Tokenisasi ---------------------------- */
  function token(root) {
    const vault = new Map();
    root.innerHTML = `
      <p class="demo-note">Masukkan nomor kartu (gunakan nomor uji, mis. 4111 1111 1111 1111). Token dibuat acak — tidak dihitung dari nomor kartu.</p>
      <div class="demo-grid">
        <label>Nomor kartu <input id="t-in" value="4111 1111 1111 1111" inputmode="numeric" /></label>
        <div class="demo-actions"><button class="btn" id="t-go">🎟️ Tokenisasi</button></div>
      </div>
      <div class="demo-out" id="t-out">Yang disimpan merchant hanyalah token.</div>
      <div class="vault"><p class="demo-label">🏦 Token vault (hanya di payment gateway)</p><ul id="t-vault"><li class="muted">Kosong</li></ul></div>
      <div class="demo-grid">
        <label>Detokenisasi — tempel token <input id="t-tok" placeholder="tok_…" /></label>
        <div class="demo-actions"><button class="btn ghost" id="t-back">🔍 Cari di vault</button></div>
      </div>
      <div class="demo-out" id="t-res"></div>`;

    const drawVault = () => {
      root.querySelector("#t-vault").innerHTML = [...vault]
        .map(([t, v]) => `<li><span class="pill">${t}</span> → ${esc(v)}</li>`)
        .join("");
    };
    root.querySelector("#t-go").onclick = () => {
      const val = root.querySelector("#t-in").value.trim();
      if (!val) return;
      const t = "tok_" + randHex(8);
      vault.set(t, val);
      drawVault();
      root.querySelector("#t-out").innerHTML = `Merchant menyimpan: <span class="pill">${t}</span> — jalankan lagi dengan nomor yang sama, tokennya tetap acak.`;
      root.querySelector("#t-tok").value = t;
    };
    root.querySelector("#t-back").onclick = () => {
      const t = root.querySelector("#t-tok").value.trim();
      const res = root.querySelector("#t-res");
      if (vault.has(t)) {
        res.className = "demo-out ok";
        res.textContent = `✅ Vault mengembalikan: ${vault.get(t)}`;
      } else {
        res.className = "demo-out no";
        res.textContent = "❌ Token tidak dikenal. Tanpa akses ke vault, token tidak bisa dibalik.";
      }
    };
  }

  /* -------------------------------- Masking ----------------------------- */
  const maskers = {
    email: (v) => {
      const [u, d] = v.split("@");
      if (!d) return "—";
      return (u.length <= 2 ? u[0] + "*" : u[0] + "*".repeat(u.length - 2) + u.slice(-1)) + "@" + d;
    },
    phone: (v) => {
      const s = v.replace(/\D/g, "");
      return s.length < 8 ? "—" : s.slice(0, 4) + "*".repeat(s.length - 8) + s.slice(-4);
    },
    nik: (v) => {
      const s = v.replace(/\D/g, "");
      return s.length < 8 ? "—" : s.slice(0, 4) + "*".repeat(s.length - 8) + s.slice(-4);
    },
    card: (v) => {
      const s = v.replace(/\D/g, "");
      return s.length < 12 ? "—" : ("**** ".repeat(Math.ceil((s.length - 4) / 4)) + s.slice(-4)).trim();
    },
  };

  function mask(root) {
    const fields = [
      ["email", "Email", "budiman@gmail.com"],
      ["phone", "Nomor HP", "081234567890"],
      ["nik", "NIK", "3171012345670001"],
      ["card", "Nomor kartu", "4111111111111111"],
    ];
    root.innerHTML = `
      <p class="demo-note">Dynamic masking: data asli tetap tersimpan, tetapi tampilan menyesuaikan peran pengguna.</p>
      <label class="check"><input type="checkbox" id="m-role" /> Login sebagai <b>Supervisor</b> (berwenang melihat data lengkap)</label>
      <div class="table-scroll"><table class="mini">
        <thead><tr><th>Field</th><th>Data asli (input)</th><th>Yang terlihat di layar</th></tr></thead>
        <tbody>${fields
          .map(([k, label, v]) => `<tr><td>${label}</td><td><input data-k="${k}" value="${v}" /></td><td><code data-o="${k}"></code></td></tr>`)
          .join("")}</tbody></table></div>
      <p class="demo-note">Ingat: masking harus diterapkan di server/API, bukan hanya di tampilan, agar data lengkap tidak ikut terkirim ke browser.</p>`;

    const update = () => {
      const sup = root.querySelector("#m-role").checked;
      root.querySelectorAll("[data-k]").forEach((inp) => {
        root.querySelector(`[data-o="${inp.dataset.k}"]`).textContent = sup ? inp.value : maskers[inp.dataset.k](inp.value);
      });
    };
    root.querySelectorAll("input").forEach((i) => i.addEventListener("input", update));
    update();
  }

  return { encrypt, hash, pseudonym, anonym, token, mask };
})();
