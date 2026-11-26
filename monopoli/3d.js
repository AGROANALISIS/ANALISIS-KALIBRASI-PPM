/* ===== MONOPOLI NUSANTARA 3D (Three.js) — lapisan visual di atas logika game yang sama ===== */
(function(){
if(!window.THREE){console.warn('Three.js gagal dimuat, memakai papan 2D');return}
const stage=$('stage'),cvs=document.createElement('canvas');cvs.id='gl';stage.insertBefore(cvs,$('scene'));
document.body.classList.add('is3d');
const R=new THREE.WebGLRenderer({canvas:cvs,antialias:true,alpha:true});R.setPixelRatio(Math.min(Math.max(devicePixelRatio,1.5),2.5));
R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=.95;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(38,1,.1,200);
S.add(new THREE.HemisphereLight(0xdfe6ff,0x4a3a2a,.7));
const sun=new THREE.DirectionalLight(0xffe9c0,1.0);sun.position.set(-9,18,10);sun.castShadow=true;sun.shadow.mapSize.set(3072,3072);
Object.assign(sun.shadow.camera,{left:-15,right:15,top:15,bottom:-15,near:1,far:50});sun.shadow.bias=-.0004;S.add(sun);
const sz=c=>c==1||c==11?2.4:1.8,lo=[];{let a=-10.5;for(let c=1;c<=11;c++){lo[c]=a;a+=sz(c)}}
const cx=c=>lo[c]+sz(c)/2;
const M=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.55,metalness:.1},o||{}));
function box(w,h,d,m,x,y,z,par,sh){const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);b.castShadow=sh!==0;b.receiveShadow=true;(par||S).add(b);return b}
function txt(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');fn(x,w,h);const t=new THREE.CanvasTexture(c);t.anisotropy=16;t.encoding=THREE.sRGBEncoding;return t}
/* papan & dasar: bingkai emas-cokelat seperti papan referensi */
const gold=M(0xb9801c,{metalness:.55,roughness:.4});
box(23.8,.9,23.8,gold,0,-.75,0);box(22.2,.3,22.2,M(0x5a2f12,{roughness:.8}),0,-.15,0);
/* panel tengah: lukisan pemandangan Nusantara (tanpa kotak 3D) */
const plaza=new THREE.Mesh(new THREE.PlaneGeometry(17.4,17.4),new THREE.MeshStandardMaterial({roughness:.7,map:txt(1024,1024,(x,w,h)=>{
 let g=x.createLinearGradient(0,0,0,h*.62);g.addColorStop(0,'#5fb4f0');g.addColorStop(1,'#e8f6ff');x.fillStyle=g;x.fillRect(0,0,w,h);
 x.fillStyle='#fff';[[160,150,70],[420,110,55],[780,170,80],[900,100,50]].forEach(c=>{[0,.7,1.4].forEach(k=>{x.beginPath();x.arc(c[0]+k*c[2]*.7,c[1]-(k==.7?c[2]*.3:0),c[2]*(k==.7?1.1:.8),0,7);x.fill()})});
 x.fillStyle='#e53935';x.fillRect(0,0,w,34);x.fillStyle='#fff';x.fillRect(0,34,w,34);
 g=x.createLinearGradient(0,h*.6,0,h);g.addColorStop(0,'#2f9be0');g.addColorStop(1,'#0b4a8f');x.fillStyle=g;x.fillRect(0,h*.6,w,h*.4);
 x.fillStyle='#4a9c4a';x.beginPath();x.moveTo(0,h*.62);x.quadraticCurveTo(w*.25,h*.5,w*.5,h*.62);x.fill();x.beginPath();x.moveTo(w*.5,h*.62);x.quadraticCurveTo(w*.8,h*.52,w,h*.62);x.fill();
 for(let k=0;k<6;k++){x.fillStyle=['#9a7b5a','#8a6a4a','#a98a68'][k%3];x.fillRect(110+k*14,h*.6-30-k*28,300-k*28,26)}
 x.fillStyle='#c8a46a';x.fillRect(240,h*.6-210,40,50);
 x.fillStyle='#e9e1cf';x.fillRect(745,h*.6-300,22,300);x.fillStyle='#ffd76a';x.beginPath();x.arc(756,h*.6-310,20,0,7);x.fill();
 x.fillStyle='#7a4a1c';x.beginPath();x.moveTo(430,h*.82);x.lineTo(640,h*.82);x.lineTo(610,h*.88);x.lineTo(460,h*.88);x.fill();x.fillRect(535,h*.62,6,h*.2);
 x.fillStyle='#fff6d8';x.beginPath();x.moveTo(542,h*.63);x.lineTo(610,h*.8);x.lineTo(542,h*.8);x.fill();x.beginPath();x.moveTo(530,h*.66);x.lineTo(470,h*.8);x.lineTo(530,h*.8);x.fill();
 x.strokeStyle='#ffffff66';x.lineWidth=4;for(let r=0;r<5;r++){x.beginPath();for(let q=0;q<w;q+=8)x.lineTo(q,h*(.7+r*.06)+Math.sin(q/30+r)*6);x.stroke()}
 x.textAlign='center';x.lineJoin='round';x.font='bold 120px Verdana';x.lineWidth=18;x.strokeStyle='#7a1010';x.strokeText('MONOPOLI',w/2,h*.3);x.fillStyle='#ffe27a';x.fillText('MONOPOLI',w/2,h*.3);
 x.font='bold 100px Verdana';x.strokeText('NUSANTARA',w/2,h*.41);x.fillStyle='#fff';x.fillText('NUSANTARA',w/2,h*.41);
 x.font='italic bold 38px Verdana';x.fillStyle='#3a1a00';x.fillText('Dari Sabang sampai Merauke!',w/2,h*.48)})}));
plaza.rotation.x=-Math.PI/2;plaza.position.y=.04;plaza.receiveShadow=true;S.add(plaza);
box(17.7,.12,.16,M(0xffd76a,{metalness:.7}),0,.08,-8.8,null,0);box(17.7,.12,.16,M(0xffd76a,{metalness:.7}),0,.08,8.8,null,0);box(.16,.12,17.7,M(0xffd76a,{metalness:.7}),-8.8,.08,0,null,0);box(.16,.12,17.7,M(0xffd76a,{metalness:.7}),8.8,.08,0,null,0);
/* lukisan pemandangan per daerah (HD, berwarna) */
const PALT=[['#ff9a5a','#ffe0a0','#2f7d4f'],['#3aa0e8','#bfe8ff','#2f8f5f'],['#ff7a8a','#ffd0a0','#3a7a4a'],['#6a5bd6','#f6a8c8','#4a7a3a'],['#1aa0c0','#aef0ff','#1f8a5a'],['#ff8a3a','#ffd070','#2a7a5a'],['#1f6fb5','#8fdcff','#2a8a7a'],['#5a4bc0','#ffb0d0','#3a4a8a']];
const PALX={r:['#37474f','#ffb74d','#455a64'],u:['#0288d1','#b3e5fc','#2e7d32'],c:['#ef6c00','#ffe082','#8d6e63'],h:['#8e24aa','#ffd54f','#4a148c'],x:['#c62828','#ffcdd2','#6d1b1b'],s:['#e53935','#ffd54f','#3a7a3a'],j:['#455a64','#cfd8dc','#263238'],g:['#1a237e','#7986cb','#283593'],f:['#00897b','#b2dfdb','#2e7d32']};
function paintScene(x,sx,sy,sw,sh,t,i){const pl=t.t=='p'?PALT[t.g]:(PALX[t.t]||PALX.u),sea=t.t=='p'&&(t.g==4||t.g==6||i%3==0);
 x.save();x.beginPath();x.rect(sx,sy,sw,sh);x.clip();
 let g=x.createLinearGradient(0,sy,0,sy+sh*.72);g.addColorStop(0,pl[0]);g.addColorStop(1,pl[1]);x.fillStyle=g;x.fillRect(sx,sy,sw,sh);
 g=x.createRadialGradient(sx+sw*.78,sy+sh*.26,2,sx+sw*.78,sy+sh*.26,sw*.3);g.addColorStop(0,'#fffbe0');g.addColorStop(.35,'#fff0a8aa');g.addColorStop(1,'#fff0a800');x.fillStyle=g;x.fillRect(sx,sy,sw,sh);
 x.fillStyle='#ffffffcc';[[.2,.18,.07],[.52,.1,.06]].forEach(c=>{[0,.7,1.4].forEach(k=>{x.beginPath();x.arc(sx+sw*(c[0]+k*c[2]*.8),sy+sh*(c[1]+(k==.7?-.02:0)),sw*c[2]*(k==.7?1.2:.85),0,7);x.fill()})});
 x.fillStyle=pl[2]+'99';x.beginPath();x.moveTo(sx,sy+sh*.66);[[.15,.42],[.32,.58],[.5,.36],[.7,.56],[.88,.44],[1,.6]].forEach(p=>x.lineTo(sx+sw*p[0],sy+sh*p[1]));x.lineTo(sx+sw,sy+sh*.7);x.lineTo(sx,sy+sh*.7);x.fill();
 x.fillStyle=pl[2];x.beginPath();x.moveTo(sx,sy+sh*.72);x.quadraticCurveTo(sx+sw*.3,sy+sh*.6,sx+sw*.55,sy+sh*.72);x.quadraticCurveTo(sx+sw*.8,sy+sh*.62,sx+sw,sy+sh*.7);x.lineTo(sx+sw,sy+sh);x.lineTo(sx,sy+sh);x.fill();
 if(sea){g=x.createLinearGradient(0,sy+sh*.72,0,sy+sh);g.addColorStop(0,'#2aa8e8');g.addColorStop(1,'#0a4a99');x.fillStyle=g;x.fillRect(sx,sy+sh*.74,sw,sh*.26);x.strokeStyle='#ffffff88';x.lineWidth=3;for(let r=0;r<3;r++){x.beginPath();for(let q=0;q<=sw;q+=6)x.lineTo(sx+q,sy+sh*(.8+r*.06)+Math.sin(q/14+r*2)*3);x.stroke()}}
 [[.1,.86,1],[.9,.84,-1]].forEach(a=>{const px=sx+sw*a[0],py=sy+sh*a[1];x.strokeStyle='#6b4a1d';x.lineWidth=5;x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+a[2]*10,py-sh*.12,px+a[2]*6,py-sh*.22);x.stroke();x.fillStyle='#2f9a3f';for(let k=0;k<6;k++){x.save();x.translate(px+a[2]*6,py-sh*.22);x.rotate(k*1.05-1.3);x.beginPath();x.ellipse(sw*.07,0,sw*.09,sw*.025,0,0,7);x.fill();x.restore()}});
 x.restore()}
/* petak */
const tiles=[],pick=[];
T.forEach((t,i)=>{const[c,r]=xy(i),w=sz(c)==2.4&&sz(r)==2.4?2.4:1.8,h=sz(r)==2.4&&sz(c)==2.4?2.4:(c==1||c==11?1.8:2.4);
 const corner=i%10==0,side=corner?'b':r==11?'b':r==1?'t':c==1?'l':'r',yaw={b:0,t:Math.PI,l:-Math.PI/2,r:Math.PI/2}[side];
 const W=corner?2.4:1.8,H=2.4,g=new THREE.Group();g.position.set(cx(c),0,cx(r));g.rotation.y=corner?0:yaw;S.add(g);
 const body=new THREE.Group();g.add(body);
 const top=txt(W*260,H*260,(x,w,h)=>{x.fillStyle='#f4e2b4';x.fillRect(0,0,w,h);
  const bc=t.t=='p'?COL[t.g]:t.t=='r'?'#455a64':t.t=='u'?'#0288d1':t.t=='x'?'#8e24aa':t.t=='c'?'#1565c0':t.t=='h'?'#ef6c00':'#c62828';
  if(!corner){x.fillStyle=bc;x.fillRect(0,0,w,h*.1);x.fillStyle='#0003';x.fillRect(0,h*.1,w,4)}
  const sy=corner?h*.07:h*.27,sh=h*(corner?.72:.52),sx=w*.06,sw=w*.88;paintScene(x,sx,sy,sw,sh,t,i);
  x.strokeStyle='#8a5a10';x.lineWidth=6;x.strokeRect(sx,sy,sw,sh);
  x.textAlign='center';x.textBaseline='middle';x.fillStyle='#2a1a05';const fs=corner?44:32;x.font='bold '+fs+'px Verdana,sans-serif';
  const words=t.n.split(' '),ly=[];let cur='';words.forEach(q=>{if((cur+' '+q).trim().length>(corner?14:9)&&cur){ly.push(cur);cur=q}else cur=(cur+' '+q).trim()});ly.push(cur);
  if(!corner)ly.forEach((l,k)=>x.fillText(l,w/2,h*.1+h*.085+k*(fs+2)-(ly.length-1)*(fs+2)/2+(ly.length>1?6:0)));
  else{x.fillStyle='#fff8e0';x.strokeStyle='#5a2f12';x.lineWidth=8;ly.forEach((l,k)=>{const yy=h*.86+k*(fs+2)-(ly.length-1)*fs/2;x.strokeText(l,w/2,yy);x.fillText(l,w/2,yy)})}
  x.shadowColor='#000a';x.shadowBlur=18;x.shadowOffsetY=8;x.font=(corner?190:140)+'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';x.fillStyle='#000';x.fillText(ICONS[i],w/2,sy+sh*.56);x.shadowColor='transparent';
  if(t.price){const gp=x.createLinearGradient(0,h*.84,0,h*.96);gp.addColorStop(0,'#ffe27a');gp.addColorStop(1,'#d9a020');x.fillStyle=gp;x.beginPath();x.roundRect?x.roundRect(w*.18,h*.855,w*.64,h*.095,14):x.rect(w*.18,h*.855,w*.64,h*.095);x.fill();x.strokeStyle='#7a4f00';x.lineWidth=3;x.stroke();x.fillStyle='#4a2f00';x.font='bold 36px Verdana';x.fillText(t.price+' jt',w/2,h*.903)}
  x.strokeStyle='#8a5a10';x.lineWidth=10;x.strokeRect(5,5,w-10,h-10)});
 const sm=[M(0xd9b24a),M(0xd9b24a),new THREE.MeshStandardMaterial({map:top,roughness:.6}),M(0x8a5a10),M(0xd9b24a),M(0xd9b24a)];
 const b=new THREE.Mesh(new THREE.BoxGeometry(W-.06,.3,H-.06),sm);b.position.y=.15;b.castShadow=b.receiveShadow=true;b.userData.i=i;body.add(b);
 const ring=new THREE.Mesh(new THREE.BoxGeometry(W-.06,.08,H-.06),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false}));ring.position.y=.34;body.add(ring);
 const hs=new THREE.Group();hs.position.set(0,.3,-H*.3);body.add(hs);
 tiles[i]={g,body,b,ring,hs,y:0,h:-1,tg:0,pulse:0,x:cx(c),z:cx(r),yaw:g.rotation.y,H,W};pick.push(b)});
/* rumah & hotel 3D (detail: jendela, pintu, atap joglo bertingkat) */
function house(col,hotel){const g=new THREE.Group(),wm=M(0xfff0cf),rm=M(col,{roughness:.45}),dk=M(0x5a3a1a),gl=M(0x9fd8ff,{emissive:0x2a7ac0,emissiveIntensity:.6}),au=M(0xffd76a,{metalness:.7,roughness:.3});
 const roof=(r,h,y,sx,sz,m)=>{const q=new THREE.Mesh(new THREE.ConeGeometry(r,h,4),m);q.rotation.y=Math.PI/4;q.scale.set(sx,1,sz);q.position.y=y;q.castShadow=true;g.add(q);return q};
 if(hotel){box(1.3,.45,.72,wm,0,.23,0,g);box(1.0,.4,.58,wm,0,.65,0,g);box(.7,.34,.46,wm,0,1.02,0,g);
  [-.42,-.14,.14,.42].forEach(a=>{box(.14,.2,.02,gl,a,.25,.37,g,0);box(.14,.18,.02,gl,a*.8,.66,.3,g,0)});box(.2,.28,.03,dk,0,.14,.37,g,0);
  roof(.98,.28,.95,1,.62,rm);roof(.72,.26,1.28,1,.62,rm);roof(.46,.24,1.55,1,.7,rm);const sp=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.4,6),au);sp.position.y=1.9;g.add(sp);const fl=box(.22,.14,.01,rm,.12,2.0,0,g,0)}
 else{box(.36,.26,.32,wm,0,.13,0,g);roof(.34,.24,.38,1,.9,rm);box(.07,.14,.01,dk,0,.07,.165,g,0);box(.07,.07,.01,gl,-.11,.17,.165,g,0);box(.07,.07,.01,gl,.11,.17,.165,g,0);box(.06,.14,.06,M(0x9a5a3a),.12,.5,-.06,g)}
 return g}
/* bidak */
const pawns=[];
function mkPawn(i){const g=new THREE.Group(),col=new THREE.Color(PC[i]),sk=['#f2c9a0','#e0a878','#f2c9a0','#e8b88a'][i],sm=M(sk,{roughness:.6}),cm=M(col,{roughness:.5}),pm=M(i==1?0x7a4a1a:0x2b2f4a),hm=M(0x1b1208);
 const mk=(geo,m,x,y,z,p)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;(p||g).add(o);return o};
 const legs=[-1,1].map(s=>{const lg=new THREE.Group();lg.position.set(s*.11,.52,0);g.add(lg);mk(new THREE.CylinderGeometry(.075,.068,.5,10),pm,0,-.26,0,lg);mk(new THREE.BoxGeometry(.15,.07,.25),hm,0,-.52,.04,lg);return lg});
 mk(new THREE.CylinderGeometry(.2,.17,.5,14),cm,0,.8,0);mk(new THREE.CylinderGeometry(.205,.205,.07,14),M(0xffd76a,{metalness:.5}),0,.58,0);
 const arms=[-1,1].map(s=>{const a=new THREE.Group();a.position.set(s*.27,1.0,0);g.add(a);mk(new THREE.CylinderGeometry(.057,.05,.42,8),cm,0,-.2,0,a);mk(new THREE.SphereGeometry(.06,10,8),sm,0,-.44,0,a);return a});
 mk(new THREE.CylinderGeometry(.06,.07,.08,8),sm,0,1.07,0);const hd=mk(new THREE.SphereGeometry(.2,20,16),sm,0,1.26,0);
 [-1,1].forEach(s=>{mk(new THREE.SphereGeometry(.028,8,8),hm,s*.07,1.28,.18);mk(new THREE.SphereGeometry(.03,8,8),M(0xff8a80),s*.12,1.2,.16)});
 mk(new THREE.BoxGeometry(.07,.012,.01),M(0x7a2a2a),0,1.19,.195);
 const hair=new THREE.Mesh(new THREE.SphereGeometry(.21,18,12,0,Math.PI*2,0,Math.PI*.55),hm);hair.position.set(0,1.27,-.02);hair.rotation.x=-.25;g.add(hair);
 if(i==0){mk(new THREE.CylinderGeometry(.3,.3,.03,20),M(0x111111),0,1.43,0);mk(new THREE.CylinderGeometry(.17,.17,.3,20),M(0x111111),0,1.59,0);mk(new THREE.CylinderGeometry(.175,.175,.07,20),M(0xd62828),0,1.49,0)}
 if(i==1){const b=mk(new THREE.SphereGeometry(.2,16,10,0,Math.PI*2,0,Math.PI*.5),M(0x7a4a1a,{roughness:.5}),0,1.36,0);mk(new THREE.SphereGeometry(.06,10,8),M(0xffd76a,{metalness:.6}),0,1.34,-.2)}
 if(i==2){mk(new THREE.CylinderGeometry(.16,.19,.15,18),M(0x111111),0,1.46,0)}
 if(i==3){mk(new THREE.BoxGeometry(.3,.5,.08),hm,0,1.08,-.18);const f=mk(new THREE.SphereGeometry(.07,10,8),M(0xff7ab8),.17,1.42,.05);mk(new THREE.SphereGeometry(.03,8,8),M(0xffe14d),.2,1.43,.1)}
 const halo=new THREE.Mesh(new THREE.RingGeometry(.45,.6,32),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.9,side:2}));halo.rotation.x=-Math.PI/2;halo.position.y=.02;g.add(halo);
 g.scale.setScalar(1.05);S.add(g);return{g,halo,legs,arms,x:0,z:0,y:0,pos:-1,a:null}}
const scaf=[];let camF=null;
const OFF=[[-.4,-.35],[.4,-.35],[-.4,.35],[.4,.35]];
function slot(p){const t=tiles[p.pos],o=OFF[p.i],ca=Math.cos(t.yaw),sa=Math.sin(t.yaw);return[t.x+o[0]*ca+o[1]*sa,t.z-o[0]*sa+o[1]*ca]}
/* dadu 3D */
const FV=[3,4,1,6,2,5],pip=v=>txt(128,128,(x,w,h)=>{x.fillStyle='#fffdf5';x.fillRect(0,0,w,h);x.fillStyle=v==1?'#d32f2f':'#222';const P=[[],[[.5,.5]],[[.25,.25],[.75,.75]],[[.25,.25],[.5,.5],[.75,.75]],[[.25,.25],[.75,.25],[.25,.75],[.75,.75]],[[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]],[[.25,.25],[.75,.25],[.25,.5],[.75,.5],[.25,.75],[.75,.75]]];P[v].forEach(q=>{x.beginPath();x.arc(q[0]*w,q[1]*h,v==1?16:10,0,7);x.fill()})});
const dm=FV.map(v=>new THREE.MeshStandardMaterial({map:pip(v),roughness:.3}));
const dice=[0,1].map(k=>{const d=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),dm);d.castShadow=true;d.position.set(k?1.1:-1.1,.7,3.6);S.add(d);return{m:d,v:1,roll:false,t:0,sp:[Math.random(),Math.random(),Math.random()],k}});
const QV={1:[0,0,0],6:[Math.PI,0,0],3:[0,0,Math.PI/2],4:[0,0,-Math.PI/2],2:[-Math.PI/2,0,0],5:[Math.PI/2,0,0]};
function dread(){const ds=$('dice').children,r=ds[0].className=='r';dice.forEach((d,k)=>{const v=FACE.indexOf(ds[k].textContent)+1||1;if(r&&!d.roll){d.roll=true;d.t=0}if(!r&&d.roll){d.roll=false;d.t=0;d.land=1;d.v=v;const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...QV[v])),yq=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.random()*6.28);d.q=yq.multiply(q)}if(!r&&!d.roll&&!d.land){d.v=v;const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...QV[v]));d.m.quaternion.copy(q)}})}
new MutationObserver(dread).observe($('dice'),{subtree:true,childList:true,characterData:true,attributes:true});dread();
/* partikel koin / konfeti */
const parts=[],pg=new THREE.BoxGeometry(.14,.14,.03);
function burst(x,z,n,cols,pw){pw=pw||1;for(let k=0;k<n;k++){const c=cols[k%cols.length],m=new THREE.Mesh(pg,new THREE.MeshBasicMaterial({color:c}));m.position.set(x,.8,z);S.add(m);parts.push({m,v:new THREE.Vector3((Math.random()-.5)*5*pw,(4+Math.random()*5)*pw,(Math.random()-.5)*5*pw),l:1.6,r:new THREE.Vector3(Math.random()*9,Math.random()*9,0)})}}
const GOLD=[0xffd76a,0xffb300,0xfff3b0],CONF=[0xff5c8a,0x7cf7c0,0x8ab4ff,0xffd76a,0xc084fc];
/* animasi uang: teks melayang 3D + koin + hitung naik di panel */
const floaters=[];
function floatText(x,z,msg,col,big){const sp=new THREE.Sprite(new THREE.SpriteMaterial({transparent:true,depthTest:false,map:txt(512,160,(c,w,h)=>{c.font='bold '+(big?84:72)+'px Verdana';c.textAlign='center';c.textBaseline='middle';c.lineWidth=14;c.lineJoin='round';c.strokeStyle='#1a1030';c.strokeText(msg,w/2,h/2);c.fillStyle=col;c.fillText(msg,w/2,h/2)})}));
 sp.scale.set(big?6:4.2,big?1.9:1.3,1);sp.position.set(x,2,z);sp.renderOrder=9;S.add(sp);floaters.push({sp,t:0,big})}
function countUp(pi,from,to){const t0=performance.now(),up=to>from;(function f(){const q=Math.min(1,(performance.now()-t0)/900),el=document.querySelectorAll('#pls .pl')[pi];
 if(el){const b=el.lastChild;if(b&&b.nodeType==3)b.nodeValue=Math.round(from+(to-from)*q)+' jt';el.style.transition='none';el.style.boxShadow=q<1?'inset 0 0 0 2px '+(up?'#7CFC7C':'#ff6b6b'):''}
 if(q<1)requestAnimationFrame(f)})()}
function money(w,p,diff){const x=w.x,z=w.z;
 if(diff>0){const st=p.pos==0&&diff>=START_BONUS;floatText(x,z,'+'+diff+' jt',st?'#ffe14d':'#7CFC7C',st);burst(x,z,st?90:Math.min(40,8+diff/10|0),GOLD);
  if(st){tiles[0].pulse=1;floatText(tiles[0].x,tiles[0].z,'🏁 START!','#fff',true);burst(tiles[0].x,tiles[0].z,40,CONF);shake=Math.max(shake,.12)}}
 else floatText(x,z,diff+' jt','#ff6b6b',false)}
/* kamera */
let yaw=0,pitch=.95,dist=30,tY=0,tP=.95,tD=30,free=0,shake=0;const look=new THREE.Vector3(),tl=new THREE.Vector3();
function fit(){const w=stage.clientWidth||600,h=stage.clientHeight||600;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();tD=dist=31*(w<h?1:1)}
new ResizeObserver(fit).observe(stage);fit();
/* input */
const rc=new THREE.Raycaster(),mv=new THREE.Vector2();let dn=null,hov=-1;
function hit(e){const r=cvs.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);rc.setFromCamera(mv,C);const h=rc.intersectObjects(pick,false)[0];return h?h.object.userData.i:-1}
cvs.addEventListener('pointerdown',e=>{dn={x:e.clientX,y:e.clientY,yw:tY,pt:tP,m:0};cvs.setPointerCapture(e.pointerId)});
cvs.addEventListener('pointermove',e=>{if(dn){const dx=e.clientX-dn.x,dy=e.clientY-dn.y;if(Math.abs(dx)+Math.abs(dy)>6)dn.m=1;if(dn.m){tY=dn.yw-dx*.006;tP=Math.max(.45,Math.min(1.35,dn.pt+dy*.004));free=performance.now()+5000}}else hov=hit(e);cvs.style.cursor=hov>=0?'pointer':'grab'});
cvs.addEventListener('pointerup',e=>{if(dn&&!dn.m){const i=hit(e);if(i>=0)tileClick(i)}dn=null});
cvs.addEventListener('wheel',e=>{e.preventDefault();tD=Math.max(16,Math.min(40,tD+e.deltaY*.02));free=performance.now()+5000},{passive:false});
/* sinkronisasi dengan state game */
let last=performance.now();
function sync(){
 const now=performance.now();
 T.forEach((_,i)=>{const o=own[i],t=tiles[i],hh=o?o.h:0,oc=o?PC[P[o.p].i]:null,key=hh+'|'+oc;if(t.key!==key){
  const first=t.key===undefined,newB=!first&&hh>(t.ph||0)&&t.po===oc,bought=!first&&o&&!t.po,keep=newB?(hh>=5?0:hh-1):(hh>=5?1:hh);
  t.key=key;t.ph=hh;t.po=oc;while(t.hs.children.length)t.hs.remove(t.hs.children[0]);t.ring.material.opacity=o?.55:0;if(o)t.ring.material.color.set(oc);
  if(hh){const n=hh>=5?1:hh;for(let k=0;k<n;k++){const m=house(new THREE.Color(oc),hh>=5);m.position.x=hh>=5?0:(k-(n-1)/2)*.4;const anim=k>=keep;m.userData.s=anim?0:1;m.userData.d=now+(anim?750:0);m.scale.setScalar(anim?.001:1);t.hs.add(m)}}
  if(newB){camF={x:t.x,z:t.z,u:now+3200};tiles[i].pulse=1;
   const sc=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(hh>=5?1.5:1.3,hh>=5?1.9:.95,.95)),new THREE.LineBasicMaterial({color:0xb8742a,transparent:true}));sc.position.y=hh>=5?.95:.48;t.hs.add(sc);scaf.push({o:sc,t0:now});
   floatText(t.x,t.z,hh>=5?'🏨 Hotel!':'🔨 Membangun...','#ffd76a',true);
   for(let k=0;k<5;k++)setTimeout(()=>{burst(t.x,t.z,14,[0xc8a070,0xe6d2b0,0x9a8a7a],.45);if(k%2==0)burst(t.x,t.z,8,[0xffe27a,0xffb300],.8)},180+k*160);
   setTimeout(()=>{burst(t.x,t.z,50,CONF);floatText(t.x,t.z,hh>=5?'🏨 Selesai!':'🏠 Selesai!','#7CFC7C',false);shake=Math.max(shake,.1)},1500)}
  if(bought){burst(t.x,t.z,45,CONF);floatText(t.x,t.z,'📜 Sertifikat!','#fff3b0',true);camF={x:t.x,z:t.z,u:now+1800}}}});
  P.forEach(p=>{let w=pawns[p.i];if(!w)w=pawns[p.i]=mkPawn(p.i);w.p=p;if(w.cash!==undefined&&p.cash!==w.cash&&!p.out){const d=p.cash-w.cash;setTimeout(()=>{if(w.x!==undefined)money(w,p,d)},40);countUp(P.indexOf(p),w.cash,p.cash)}w.cash=p.cash;if(p.out||p.drv){w.hide=1;return}w.hide=0;
  if(w.pos!==p.pos){const [x,z]=slot(p),far=w.pos<0?0:Math.min((p.pos-w.pos+40)%40,40-(p.pos-w.pos+40)%40);
   if(w.pos<0){w.x=x;w.z=z}else w.a={x0:w.x,z0:w.z,x1:x,z1:z,t0:now,d:far>1?850:330,hi:far>1?3:.9};w.pos=p.pos}
  else if(!w.a){const[x,z]=slot(p);w.x=x;w.z=z}})}
const od=window.draw;window.draw=function(){od.apply(this,arguments);try{sync()}catch(e){console.error(e)}};
const of=window.flashL;window.flashL=function(i){of.apply(this,arguments);if(tiles[i])tiles[i].pulse=1};
const os=window.snd;window.snd=function(n){os.apply(this,arguments);try{const p=P[cur],t=p&&tiles[p.pos];if(!t)return;
 if(n=='buy'||n=='build'){burst(t.x,t.z,40,CONF);tiles[p.pos].pulse=1}else if(n=='coin')burst(t.x,t.z,14,GOLD);else if(n=='jail'||n=='tax'||n=='bankrupt')shake=1;else if(n=='land')shake=Math.max(shake,.15)}catch(e){}};
/* loop render */
const L=(a,b,k)=>a+(b-a)*k;
function loop(){requestAnimationFrame(loop);if(document.hidden)return;
 const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const k=1-Math.pow(.001,dt);


 tiles.forEach((t,i)=>{const g=document.getElementById('t'+i),pk=g&&g.classList.contains('pk'),tg=(i==hov?.22:0)+(pk?.12+Math.sin(now/180)*.08:0)+t.pulse*.35;t.body.position.y=L(t.body.position.y,tg,.25);t.pulse=Math.max(0,t.pulse-dt*1.4);
  t.b.material[2].emissive=t.b.material[2].emissive||new THREE.Color();t.b.material[2].emissive.setRGB(t.pulse*.6+(pk?.15:0),t.pulse*.5+(pk?.12:0),t.pulse*.2);
  t.hs.children.forEach(h=>{if(now>h.userData.d){h.userData.s=Math.min(1,h.userData.s+dt*2.6);const s=h.userData.s,e=1+2.70158*Math.pow(s-1,3)+1.70158*Math.pow(s-1,2);h.scale.setScalar(Math.max(.001,e));h.rotation.y=(1-s)*.9}})});
 let fp=null;
 pawns.forEach(w=>{if(!w)return;w.g.visible=!w.hide;if(w.hide)return;let y=0,sw=0,ry=null;
  if(w.a){const q=Math.min(1,(now-w.a.t0)/w.a.d),e=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;w.x=L(w.a.x0,w.a.x1,e);w.z=L(w.a.z0,w.a.z1,e);y=Math.sin(q*Math.PI)*w.a.hi*.7;sw=Math.sin(now/(w.a.hi>2?55:70))*.95;ry=Math.atan2(w.a.x1-w.a.x0,w.a.z1-w.a.z0);if(q>=1)w.a=null;fp=w}
  const act=w.p===P[cur];w.halo.scale.setScalar(act?1+Math.sin(now/220)*.15:.8);w.halo.material.opacity=act?1:.5;
  w.g.position.set(w.x,.3+y+(!w.a?Math.sin(now/500+w.p.i)*.02+(act?Math.abs(Math.sin(now/380))*.07:0):0),w.z);
  const tr=ry!==null?ry:yaw,dd=tr-w.g.rotation.y;w.g.rotation.y+=Math.atan2(Math.sin(dd),Math.cos(dd))*(ry!==null?.35:.08);w.g.rotation.x=ry!==null?.12:0;
  w.legs[0].rotation.x=sw;w.legs[1].rotation.x=-sw;w.arms[0].rotation.x=-sw;w.arms[1].rotation.x=sw;
  w.arms[0].rotation.z=L(w.arms[0].rotation.z,-.08,.2);w.arms[1].rotation.z=act&&!w.a?2.5+Math.sin(now/150)*.35:L(w.arms[1].rotation.z,.08,.2);
  w.cur=act;if(act&&!fp)fp=w});
 dice.forEach(d=>{const m=d.m;if(d.roll){d.t+=dt;m.rotation.x+=dt*(9+d.sp[0]*6);m.rotation.y+=dt*(8+d.sp[1]*6);m.rotation.z+=dt*(7+d.sp[2]*6);m.position.y=.7+Math.abs(Math.sin(d.t*7))*2.6;m.position.x=(d.k?1.1:-1.1)+Math.sin(d.t*5+d.k)*.8}
  else if(d.land){d.land=Math.min(1.6,d.land+dt*1.1);m.quaternion.slerp(d.q,.2);m.position.x=L(m.position.x,d.k?1.1:-1.1,.15);m.position.y=.7+Math.abs(Math.sin((d.land-1)*7))*Math.max(0,1.2-(d.land-1)*2);if(d.land>=1.6){d.land=0;m.position.y=.7;m.quaternion.copy(d.q)}}});
 for(let i=scaf.length-1;i>=0;i--){const q=scaf[i],a=now-q.t0;q.o.material.opacity=a<1300?1:Math.max(0,1-(a-1300)/600);if(a>1900){q.o.parent&&q.o.parent.remove(q.o);scaf.splice(i,1)}}
 for(let i=floaters.length-1;i>=0;i--){const f=floaters[i];f.t+=dt;f.sp.position.y+=dt*(f.big?1.6:1.2);const a=f.t<.2?f.t/.2:Math.max(0,1-(f.t-1.3)/.7);f.sp.material.opacity=a;f.sp.scale.multiplyScalar(f.t<.2?1.03:1);if(f.t>2){S.remove(f.sp);f.sp.material.map.dispose();f.sp.material.dispose();floaters.splice(i,1)}}
 for(let i=parts.length-1;i>=0;i--){const q=parts[i];q.l-=dt;q.v.y-=14*dt;q.m.position.addScaledVector(q.v,dt);q.m.rotation.x+=q.r.x*dt;q.m.rotation.y+=q.r.y*dt;if(q.m.position.y<.2){q.m.position.y=.2;q.v.y*=-.35;q.v.x*=.7;q.v.z*=.7}
  if(q.l<=0){S.remove(q.m);q.m.material.dispose();parts.splice(i,1)}}
 /* kamera otomatis: ikuti bidak yang sedang jalan / giliran sekarang */
 const auto=now>free;if(auto&&camF&&now<camF.u){tl.set(camF.x*.6,0,camF.z*.6);tY=Math.atan2(camF.x,camF.z)*.3;tD=19;tP=.78}else if(auto&&fp){tl.set(fp.x*.5,0,fp.z*.5);tY=Math.atan2(fp.x,fp.z)*.25;tD=fp.a?24:28;tP=fp.a?.9:1}else if(auto){tl.set(0,0,0)}
 look.lerp(tl,1-Math.pow(.05,dt));yaw=L(yaw,tY,k);pitch=L(pitch,tP,k);dist=L(dist,tD,k);
 shake=Math.max(0,shake-dt*1.6);const sh=shake*.5;
 C.position.set(look.x+Math.sin(yaw)*Math.cos(pitch)*dist+(Math.random()-.5)*sh,look.y+Math.sin(pitch)*dist+(Math.random()-.5)*sh,look.z+Math.cos(yaw)*Math.cos(pitch)*dist);C.lookAt(look);
 R.render(S,C)}
loop();window.M3D={sync,burst,scene:S};
setTimeout(()=>{try{sync()}catch(e){}},50);
})();
