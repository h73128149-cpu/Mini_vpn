const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); try { tg.setHeaderColor('#070d0a'); tg.setBackgroundColor('#070d0a'); } catch(e) {} }
const BOT_USERNAME = 'Hes_vpn'; // اگر یوزرنیم ربات عوض شد، این مقدار را هم عوض کن.
function showToast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)}
function returnToBot(payload){
  showToast('در حال بازگشت به ربات…');
  const url = `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(payload)}`;
  if (tg && tg.openTelegramLink) {
    // A start deep-link carries the selected plan to the bot. Do not close too early:
    // Telegram must first process the link and its start payload.
    tg.openTelegramLink(url);
  } else {
    window.location.href = url;
  }
}
function sendAction(action){ if(['my_account','wallet','support','shop'].includes(action)) returnToBot(action === 'my_account' ? 'account' : action); else showToast('برای ادامه از ربات استفاده کنید.'); }
function choosePlan(price){ const p=Number(price); if(![50000,100000,250000,350000].includes(p)){showToast('پلن نامعتبر است.');return;} returnToBot('buy_'+p); }
