const tg = window.Telegram && window.Telegram.WebApp;
const BOT_USERNAME = "Hesamm_vpnbot";
const ALLOWED_PRICES = [50000, 100000, 250000, 350000];

if (tg) {
  tg.ready();
  tg.expand();
  try {
    tg.setHeaderColor('#070d0a');
    tg.setBackgroundColor('#070d0a');
  } catch (_) {}
}

function showToast(text) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  window.setTimeout(() => el.classList.remove('show'), 2600);
}

/*
 * This store is also hosted as a normal GitHub Pages site, not necessarily
 * opened as a Telegram Web App. Therefore we use Telegram's bot deep-link
 * start parameter rather than WebApp.sendData(), which only works for apps
 * launched through the appropriate Telegram Web App keyboard button.
 */
function openBotAction(payload) {
  const allowed = new Set(['account', 'wallet', 'support', 'shop']);
  let startPayload = '';

  if (typeof payload === 'string' && allowed.has(payload)) {
    startPayload = payload;
  } else if (payload && payload.action === 'buy_plan') {
    const price = Number(payload.price);
    if (!ALLOWED_PRICES.includes(price)) {
      showToast('پلن نامعتبر است.');
      return;
    }
    startPayload = `buy_${price}`;
  } else {
    showToast('درخواست نامعتبر است.');
    return;
  }

  const url = `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(startPayload)}`;
  try {
    if (tg && typeof tg.openTelegramLink === 'function') {
      tg.openTelegramLink(url);
      // openTelegramLink normally closes the Web App itself; this is a fallback.
      window.setTimeout(() => {
        try { if (tg && typeof tg.close === 'function') tg.close(); } catch (_) {}
      }, 500);
    } else {
      // On a regular browser, open the bot deep link in Telegram/browser.
      window.location.href = url;
    }
  } catch (err) {
    console.error('Could not open bot deep link', err);
    window.location.href = url;
  }
}

function sendAction(action) {
  openBotAction(action);
}

function choosePlan(price) {
  const p = Number(price);
  if (!ALLOWED_PRICES.includes(p)) {
    showToast('پلن نامعتبر است.');
    return;
  }
  openBotAction({ action: 'buy_plan', price: p });
}
