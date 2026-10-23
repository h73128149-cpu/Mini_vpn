const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); try { tg.setHeaderColor('#0b0b0f'); tg.setBackgroundColor('#09090d'); } catch(e) {} }
const BOT_USERNAME = 'Hesamm_vpnbot'; // اگر یوزرنیم ربات عوض شد، این مقدار را هم عوض کن.
function showToast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)}
function returnToBot(payload){
  const url = `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(payload)}`;
  showToast('در حال انتقال درخواست به ربات…');
  if (tg && tg.openTelegramLink) { tg.openTelegramLink(url); }
  else { window.location.href = url; }
}
function sendAction(action){ if(['my_account','wallet','support','shop'].includes(action)) returnToBot(action === 'my_account' ? 'account' : action); else showToast('برای ادامه از ربات استفاده کنید.'); }
function choosePlan(price){ const p=Number(price); if(![50000,100000,250000,350000].includes(p)){showToast('پلن نامعتبر است.');return;} returnToBot('buy_'+p); }
