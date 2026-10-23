const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); try { tg.setHeaderColor('#0b0b0f'); tg.setBackgroundColor('#09090d'); } catch(e) {} }
function showToast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)}
function sendAction(action){if(tg && tg.sendData){tg.sendData(JSON.stringify({action}));showToast('درخواست به ربات ارسال شد.');}else{showToast('برای استفاده از این دکمه، مینی‌اپ را از داخل ربات تلگرام باز کن.')}}
function choosePlan(price){if(tg && tg.sendData){tg.sendData(JSON.stringify({action:'buy_plan',price:Number(price)}));showToast('درخواست پلن به ربات ارسال شد.');}else{showToast('این صفحه نمایشی است؛ آن را از داخل ربات تلگرام باز کن.')}}
