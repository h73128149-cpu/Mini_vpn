const tg = window.Telegram && window.Telegram.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor('#070d0a'); tg.setBackgroundColor('#070d0a'); } catch(e) {}
}

function showToast(text) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
}

/*
 * The Mini App is launched from Telegram's WebApp keyboard button.
 * sendData sends JSON as message.web_app_data.data; Telegram closes
 * the Mini App automatically after this call. Do not use t.me username
 * deep-links here, because they can fail with "Username not found".
 */
function sendToBot(data) {
  if (tg && typeof tg.sendData === 'function') {
    try {
      tg.sendData(JSON.stringify(data));
      showToast('درخواست ارسال شد؛ در حال بازگشت به ربات…');
      return;
    } catch (e) {
      console.error('Telegram sendData failed', e);
    }
  }
  showToast('فروشگاه را از دکمهٔ Shop داخل ربات باز کنید تا درخواست به ربات ارسال شود.');
}

function sendAction(action) {
  const map = {
    my_account: { action: 'my_account' },
    wallet: { action: 'wallet' },
    support: { action: 'support' },
    shop: { action: 'shop' }
  };
  if (map[action]) sendToBot(map[action]);
  else showToast('برای ادامه از ربات استفاده کنید.');
}

function choosePlan(price) {
  const p = Number(price);
  if (![50000, 100000, 250000, 350000].includes(p)) {
    showToast('پلن نامعتبر است.');
    return;
  }
  sendToBot({ action: 'buy_plan', price: p });
}
