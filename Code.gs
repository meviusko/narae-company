// 구글 시트 > 확장 프로그램 > Apps Script 에 붙여넣기
const SHEET_NAME = "주문";
const NOTIFY_EMAIL = ""; // 비우면 스크립트 주인 메일로 알림

const safe = s => /^[=+\-@]/.test(s) ? "'" + s : s;
const out = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

function doGet() { return out({ ok: true }); }

function doPost(e) {
  try {
    const o = JSON.parse(e.postData.contents);
    if (o.website) return out({ ok: true }); // 스팸 방지용 숨김 칸
    const name = String(o.name || "").slice(0, 80), phone = String(o.phone || "").slice(0, 30);
    const address = String(o.address || "").slice(0, 300), note = String(o.note || "").slice(0, 300);
    const code = String(o.code || "").slice(0, 20);
    if (!name || !phone || !address || !Array.isArray(o.items) || !o.items.length || o.items.length > 50) return out({ ok: false });
    const items = o.items.map(i => String(i.name).slice(0, 100) + " x" + (Number(i.qty) || 1) + " (" + (Number(i.price) || 0) + ")").join("\n");
    const total = Number(o.total) || 0;
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() == 0) sh.appendRow(["접수시간", "주문번호", "이름", "전화번호", "주소", "메모", "상품", "합계(원)", "상태"]);
    sh.appendRow([new Date(), code, safe(name), safe(phone), safe(address), safe(note), items, total, "입금대기"]);
    lock.releaseLock();
    MailApp.sendEmail(NOTIFY_EMAIL || Session.getEffectiveUser().getEmail(), "[새 주문] " + code + " " + name,
      "주문번호: " + code + "\n이름: " + name + "\n전화: " + phone + "\n주소: " + address + "\n메모: " + note + "\n\n" + items + "\n\n합계: " + total + "원");
    return out({ ok: true });
  } catch (err) { return out({ ok: false }); }
}
