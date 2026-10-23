const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); try { tg.setHeaderColor('#070d0a'); tg.setBackgroundColor('#070d0a'); } catch(e) {} }
const BOT_USERNAME = 'Hes_vpn'; // اگر یوزرنیم ربات عوض شد، این مقدار را هم عوض کن.
function showToast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)}
function returnToBot(payload){
  const url = `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(payload)}`;
  showToast('در حال انتقال به ربات…');
  if (tg && tg.openTelegramLink) {
    // Open the bot deep link, then close the Mini App so the user returns to chat.
    tg.openTelegramLink(url);
    window.setTimeout(() => { try { tg.close(); } catch (e) {} }, 350);
  } else {
    // Outside Telegram, follow the deep link normally.
    window.location.href = url;
  }
}
function sendAction(action){ if(['my_account','wallet','support','shop'].includes(action)) returnToBot(action === 'my_account' ? 'account' : action); else showToast('برای ادامه از ربات استفاده کنید.'); }
function choosePlan(price){ const p=Number(price); if(![50000,100000,250000,350000].includes(p)){showToast('پلن نامعتبر است.');return;} returnToBot('buy_'+p); }
