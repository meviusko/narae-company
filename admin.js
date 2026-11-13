// 관리자 화면: 주소 끝에 #admin 을 붙여 열었을 때만 불러와요.
const GH = { owner: "meviusko", repo: "narae-company", branch: "main" };
(async () => {
  let tok = localStorage.getItem("ghtok") || prompt("GitHub 토큰을 붙여넣어 주세요 (이 기기에 한 번만 저장돼요)");
  if (!tok) return;
  const api = (p, o = {}) => fetch("https://api.github.com/repos/" + GH.owner + "/" + GH.repo + p, { ...o, headers: { Authorization: "Bearer " + tok, Accept: "application/vnd.github+json", "Content-Type": "application/json" } });
  try { const r = await api(""); if (!r.ok) throw 0; localStorage.setItem("ghtok", tok); }
  catch (e) { localStorage.removeItem("ghtok"); alert("토큰이 올바르지 않아요. 다시 시도해 주세요."); return; }
  const enc = s => { const b = new TextEncoder().encode(s); let x = ""; for (let i = 0; i < b.length; i += 8192) x += String.fromCharCode(...b.subarray(i, i + 8192)); return btoa(x); };
  const dec = b => new TextDecoder().decode(Uint8Array.from(atob(b.replace(/\s/g, "")), c => c.charCodeAt(0)));
  const put = (path, b64, sha, msg) => api("/contents/" + path, { method: "PUT", body: JSON.stringify({ message: msg, content: b64, branch: GH.branch, ...(sha ? { sha } : {}) }) });
  const prep = f => new Promise((res, rej) => { const im = new Image(); im.onload = () => { const k = Math.min(1, 800 / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); c.toBlob(b => { const r = new FileReader(); r.onload = () => res({ b64: r.result.split(",")[1], ext: b.type == "image/webp" ? "webp" : "png" }); r.readAsDataURL(b); }, "image/webp", .8); }; im.onerror = rej; im.src = URL.createObjectURL(f); });
  async function commit(mut, msg) {
    for (let t = 0; t < 2; t++) {
      const r = await api("/contents/products.js?ref=" + GH.branch + "&t=" + Date.now()), j = await r.json();
      if (!r.ok) throw new Error(j.message);
      const txt = dec(j.content), data = JSON.parse(txt.slice(txt.indexOf("const PRODUCTS=") + 15).trim().replace(/;$/, ""));
      const bm = txt.match(/const BRANDS=(\[.*?\]);/s), brands = bm ? JSON.parse(bm[1]) : BRANDS.slice(); mut(data, brands);
      const out = "// 상품 목록 (관리자 화면에서 자동 저장돼요)\nconst BRANDS=" + JSON.stringify(brands) + ";\nconst PRODUCTS=" + JSON.stringify(data, null, 1) + ";\n";
      const w = await put("products.js", enc(out), j.sha, msg);
      if (w.ok) { PRODUCTS.length = 0; PRODUCTS.push(...data); BRANDS.length = 0; BRANDS.push(...brands); return; }
      if (w.status != 409 && w.status != 422) { const e = await w.json(); throw new Error(e.message); }
    }
    throw new Error("동시에 수정되어 실패했어요. 새로고침 후 다시 해주세요.");
  }
  const form = (p, i) => show(`<div class="t">${i === "" ? "상품 추가" : "상품 수정"}</div>
   <select id="eb">${BRANDS.map(b => `<option${b == p.brand ? " selected" : ""}>${E(b)}</option>`).join("")}</select>
   <input id="en" placeholder="상품명" value="${E(p.name)}"><input id="ep" type="number" placeholder="할인가 (₮ 투그릭, 0이면 가격 문의)" value="${E(p.price)}"><input id="eo" type="number" placeholder="정가 (₮ 투그릭, 선택)" value="${E(p.orig)}">
   <textarea id="ed" rows="7" placeholder="상세 설명">${E(p.desc)}</textarea>
   <small>사진 1~3장 (첫 번째가 대표 사진, 바꿀 사진만 선택)</small><input id="f0" type="file" accept="image/*"><input id="f1" type="file" accept="image/*"><input id="f2" type="file" accept="image/*">
   <div id="fe" style="color:#c33;font-size:13px;margin-top:8px"></div>
   <button class="btn" data-a="save" data-i="${i}">저장</button>${i === "" ? "" : `<button class="btn o" data-a="del" data-i="${i}">삭제</button>`}`);
  A.edit = i => form(PRODUCTS[i], i);
  A.newp = bi => form({ brand: BRANDS[bi] }, "");
  A.save = async (i, btn) => {
    const name = $("#en").value.trim(); if (!name) { $("#fe").textContent = "상품명을 입력하세요."; return; }
    btn.disabled = true; btn.textContent = "저장 중...";
    try {
      const old = i === "" ? null : PRODUCTS[i], imgs = old ? old.imgs.slice() : [];
      for (let k = 0; k < 3; k++) { const f = $("#f" + k).files[0]; if (!f) continue; const im = await prep(f), path = "photos/p" + Date.now() + "-" + k + "." + im.ext; const r = await put(path, im.b64, null, "사진 추가"); if (!r.ok) throw new Error((await r.json()).message); imgs[k] = path; }
      const list = imgs.filter(Boolean), cover = list[0] || (old && old.cover) || "img/nr_logo.png";
      const p = { name, brand: $("#eb").value, orig: +$("#eo").value || 0, price: +$("#ep").value || 0, cover, imgs: list.length ? list : [cover], desc: $("#ed").value };
      await commit(d => { if (old) { if (!d[i] || d[i].name !== old.name) throw new Error("다른 곳에서 수정됐어요. 새로고침 후 다시 해주세요."); d[i] = p; } else d.push(p); }, "상품 저장: " + name);
      op[p.brand] = true; render(); show(`<div class="ok"><div class="t">저장했어요</div><p class="d">사이트에는 1~2분 뒤 모든 고객 화면에 반영돼요.</p><button class="btn" data-a="close">확인</button></div>`);
    } catch (e) { btn.disabled = false; btn.textContent = "저장"; $("#fe").textContent = "저장 실패: " + e.message + " (토큰 권한이 Contents: Read and write 인지 확인하세요)"; }
  };
  A.del = async (i, btn) => {
    if (!confirm("이 상품을 삭제할까요?")) return; const old = PRODUCTS[i];
    try { await commit(d => { if (!d[i] || d[i].name !== old.name) throw new Error("다른 곳에서 수정됐어요."); d.splice(i, 1); }, "상품 삭제: " + old.name); render(); A.close(); }
    catch (e) { $("#fe").textContent = "삭제 실패: " + e.message; }
  };
  const brandOp = async (fn, msg) => { try { await commit(fn, msg); render(); } catch (e) { alert("저장 실패: " + e.message); } };
  const dup = (b, n) => { if (b.includes(n)) throw new Error("같은 이름이 이미 있어요."); };
  A.bnew = () => { const n = (prompt("새 브랜드(카드) 이름") || "").trim(); if (!n) return; brandOp((d, b) => { dup(b, n); b.push(n); }, "브랜드 추가: " + n).then(() => { op[n] = true; render(); }); };
  A.bren = i => { const o = BRANDS[i], n = (prompt("새 이름", o) || "").trim(); if (!n || n === o) return; op[n] = op[o]; brandOp((d, b) => { dup(b, n); const k = b.indexOf(o); if (k < 0) throw new Error("새로고침 후 다시 해주세요."); b[k] = n; d.forEach(p => { if (p.brand === o) p.brand = n; }); }, "브랜드 이름 변경: " + o + " → " + n); };
  A.bdel = i => { const o = BRANDS[i]; if (PRODUCTS.some(p => p.brand === o)) { alert("이 브랜드에 상품이 있어요. 상품을 먼저 다른 브랜드로 옮기거나 삭제해 주세요."); return; } if (!confirm(o + " 카드를 삭제할까요?")) return; brandOp((d, b) => { const k = b.indexOf(o); if (k >= 0) b.splice(k, 1); }, "브랜드 삭제: " + o); };
  A.bup = i => { const o = BRANDS[i]; brandOp((d, b) => { const k = b.indexOf(o); if (k > 0) [b[k - 1], b[k]] = [b[k], b[k - 1]]; }, "브랜드 순서 변경"); };
  A.bdn = i => { const o = BRANDS[i]; brandOp((d, b) => { const k = b.indexOf(o); if (k >= 0 && k < b.length - 1) [b[k + 1], b[k]] = [b[k], b[k + 1]]; }, "브랜드 순서 변경"); };
  const bar = document.createElement("div"); bar.id = "adm"; bar.innerHTML = '관리자 모드 <a id="lo">로그아웃</a>'; document.body.prepend(bar);
  $("#lo").onclick = () => { localStorage.removeItem("ghtok"); location.hash = ""; location.reload(); };
  admin = true; render();
})();
