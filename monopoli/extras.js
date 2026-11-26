/* Sertifikat di ikon pemain: daftar chip, klik = lihat kartu sertifikat, animasi terbang saat beli/bangun */
(function(){
const _d=window.draw,snap={};
function chips(){document.querySelectorAll('#pls .pl').forEach((el,pi)=>{if(el.querySelector('.cc'))return;const c=document.createElement('div');c.className='cc';
 T.forEach((t,k)=>{const o=own[k];if(o&&o.p==pi){const e=document.createElement('i');e.dataset.k=k;e.style.background=t.g>=0?COL[t.g]:'#546e7a';e.textContent=(t.n.length>7?t.n.slice(0,6)+'…':t.n)+(o.h?(o.h>=5?' 🏨':' 🏠'+o.h):'');if(snap.pop==k+'|'+pi)e.className='pop';c.appendChild(e)}});
 if(c.children.length)el.appendChild(c)})}
function fly(k,pi){const st=document.getElementById('stage'),el=document.querySelectorAll('#pls .pl')[pi];if(!st||!el)return;const a=st.getBoundingClientRect(),b=el.getBoundingClientRect(),t=T[k];
 const f=document.createElement('div');f.className='flycert';f.innerHTML='📜<br>'+t.n;f.style.borderTop='10px solid '+(t.g>=0?COL[t.g]:'#546e7a');f.style.left=(a.left+a.width/2-35)+'px';f.style.top=(a.top+a.height/2-30)+'px';document.body.appendChild(f);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.transform=`translate(${b.left+30-(a.left+a.width/2)}px,${b.top+10-(a.top+a.height/2)}px) scale(.45) rotate(-8deg)`;f.style.opacity='.9'}));
 setTimeout(()=>{f.remove();snap.pop=k+'|'+pi;chips2()},1050)}
function chips2(){document.querySelectorAll('#pls .cc').forEach(e=>e.remove());chips()}
window.draw=function(){_d.apply(this,arguments);try{
 T.forEach((t,k)=>{const o=own[k],key=o?o.p+':'+o.h:'';if(snap[k]!==undefined&&snap[k]!==key&&o){const prev=snap[k];if(!prev||prev.split(':')[0]!=String(o.p)||+prev.split(':')[1]<o.h)setTimeout(()=>fly(k,o.p),900)}snap[k]=key});
 chips()}catch(e){console.error(e)}};
document.getElementById('pls').addEventListener('click',e=>{const el=e.target.closest('.pl');if(!el)return;const pi=[...document.querySelectorAll('#pls .pl')].indexOf(el),p=P[pi];if(!p)return;
 document.getElementById('certt').textContent='📜 Sertifikat '+p.n+(p.lap?'':' (belum melewati START)');const g=document.getElementById('certg');g.innerHTML='';let n=0;
 T.forEach((t,k)=>{const o=own[k];if(o&&o.p==pi){n++;const d=document.createElement('div');d.className='cd';d.onclick=()=>{try{showScene&&0}catch(_){}};
  d.innerHTML=`<div class="tp" style="background:${t.g>=0?COL[t.g]:'#546e7a'}"></div><div class="e">${ICONS[k]}</div><b>${t.n}</b><small>Harga ${t.price} jt · ${t.t=='p'?(o.h?(o.h>=5?'🏨 Hotel':'🏠 Rumah ×'+o.h):'Tanah kosong'):'Aset'}<br>Sewa ${rent(k,7)} jt</small>`;g.appendChild(d)}});
 if(!n)g.innerHTML='<div style="grid-column:1/-1;text-align:center;opacity:.8;padding:18px">Belum punya sertifikat.<br>Beli petak untuk mendapatkannya!</div>';
 document.getElementById('certm').classList.add('on')});
document.getElementById('certm').addEventListener('click',e=>{if(e.target.id=='certm')e.target.classList.remove('on')});
})();
