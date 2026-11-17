const $=s=>document.querySelector(s);
const AS=window.TWST_ASSETS||{backgrounds:[],sprites:[],characters:[]};
const lib={bg:[...AS.backgrounds,...(window.TWST_BACKGROUNDS||[]).map(s=>({...s,src:decodeURI(s.src)}))],sp:[...AS.sprites,...(window.TWST_SPRITES||[]).map(s=>({...s,src:decodeURI(s.src)}))]};
const CUS=(()=>{try{return JSON.parse(localStorage.getItem("twst-custom-v1"))||{}}catch(e){return{}}})();
CUS.bg=CUS.bg||[];CUS.sp=CUS.sp||[];CUS.chars=CUS.chars||[];
CUS.bg.forEach(e=>lib.bg.push({...e,custom:1}));CUS.sp.forEach(e=>lib.sp.push({...e,custom:1}));
const saveCus=()=>{try{localStorage.setItem("twst-custom-v1",JSON.stringify(CUS))}catch(e){alert("Not enough browser storage to remember this entry after you close the page. It will still work for now.")}};
const Ly=src=>({src,flip:false,x:0,y:0,sc:0,hide:false});
const DEF=()=>({bg:lib.bg[0]?.src||"",text:"Who touched my apple pie?!",fs:31,hideText:false,name:"Epel",hideName:false,off:0,sel:0,layers:[Ly("public/sprites/epel/angry.png")]});
let S;try{S=JSON.parse(localStorage.getItem("twst-sandbox-v2"))}catch(e){}
S=S&&S.layers?S:DEF();S.lang=S.lang||"en";S.layers.forEach(l=>{l.src=(l.src||"").replace(/^public\/sprites\/([^/]+\.(png|webp|jpe?g|gif))$/i,"public/sprites/epel/$1")});
const JA={Riddle:"リドル",Trey:"トレイ",Cater:"ケイト",Ace:"エース",Deuce:"デュース",Leona:"レオナ",Ruggie:"ラギー",Jack:"ジャック",Azul:"アズール",Jade:"ジェイド",Floyd:"フロイド",Kalim:"カリム",Jamil:"ジャミル",Vil:"ヴィル",Epel:"エペル",Rook:"ルーク",Idia:"イデア",Ortho:"オルト",Malleus:"マレウス",Lilia:"リリア",Silver:"シルバー",Sebek:"セベク",Yuu:"ユウ",Grim:"グリム",Crowley:"クロウリー",Crewel:"クルーウェル",Trein:"トレイン",Vargas:"バルガス",Sam:"サム","???":"？？？",Narrator:"ナレーター"};
const GJA={"Royal Sword Academy":"ロイヤルソードアカデミー",Heartslabyul:"ハーツラビュル寮",Savanaclaw:"サバナクロー寮",Octavinelle:"オクタヴィネル寮",Scarabia:"スカラビア寮",Pomefiore:"ポムフィオーレ寮",Ignihyde:"イグニハイド寮",Diasomnia:"ディアソムニア寮",Others:"その他"};
const UI={
en:{save:"Save",clear:"Clear",background:"Background",text:"Text",nametag:"Name Tag",experimental:"Experimental",sprites:"Sprites",sprite:"Sprite",options:"Options",hidden:"Hidden",flip:"Flip",note:"If the text in the canvas does not line up correctly, adjustments may be necessary.",wip:"Still in progress! You can add sprites and backgrounds on your own too.",fact:"I can't add more 2D live sprites due to space, so you can add them yourself!",f1:"Sprites folder 1",f2:"Sprites folder 2",char:"Character…",none:"— none —",layer:"Layer",empty:"Empty",custom:"(custom)",fs:"Text Font Size",off:"Font Offset",x:"X-Offset",y:"Y-Offset",sc:"Scale",add:"+ Add entry",addname:"+ Add name",mychars:"My characters",myup:"My uploads",nosp:"No sprites were found. Put sprites in public/sprites/<character>/, then update src/sprites-manifest.js (run tools/make-manifest.py, or push to GitHub and let the Action do it) and redeploy.",nobg:"No backgrounds were found. Put images in public/backgrounds/, then update src/sprites-manifest.js and redeploy.",namefor:"Name for this entry:",chname:"Character name:",del:"Remove this entry?"},
ja:{save:"保存",clear:"クリア",background:"背景",text:"テキスト",nametag:"名前タグ",experimental:"実験的",sprites:"スプライト",sprite:"スプライト",options:"オプション",hidden:"非表示",flip:"反転",note:"キャンバス内のテキスト位置がずれる場合は、調整が必要になることがあります。",wip:"制作中です！スプライトや背景は自分で追加することもできます。",fact:"容量の都合で2D Liveスプライトはこれ以上追加できないので、自分で追加してください！",f1:"スプライトフォルダ 1",f2:"スプライトフォルダ 2",char:"キャラクター…",none:"— なし —",layer:"レイヤー",empty:"空",custom:"(カスタム)",fs:"文字サイズ",off:"文字オフセット",x:"X位置",y:"Y位置",sc:"拡大率",add:"+ エントリーを追加",addname:"+ 名前を追加",mychars:"マイキャラクター",myup:"アップロード",nosp:"スプライトが見つかりません。public/sprites/<キャラ名>/ に画像を入れ、src/sprites-manifest.js を更新（tools/make-manifest.py を実行、または GitHub の Action）してから再デプロイしてください。",nobg:"背景が見つかりません。public/backgrounds/ に画像を入れ、src/sprites-manifest.js を更新して再デプロイしてください。",namefor:"このエントリーの名前:",chname:"キャラクター名:",del:"このエントリーを削除しますか？"}};
const T=k=>(UI[S.lang]||UI.en)[k];
const nm=n=>S.lang==="ja"?(JA[n]||n):n;
const toLang=(n,l)=>{const en=Object.keys(JA).find(k=>k===n||JA[k]===n);return en?(l==="ja"?JA[en]:en):n};
function applyLang(){document.documentElement.lang=S.lang;document.body.classList.toggle("ja",S.lang==="ja");
  document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T(e.dataset.i18n));$("#langSel").value=S.lang}
const SL={ // slider definitions
  fs:{lbl:"Text Font Size",min:12,max:60,def:31,u:"px",get:()=>S.fs,set:v=>S.fs=v},
  off:{lbl:"Font Offset",min:-30,max:30,def:0,u:"px",get:()=>S.off,set:v=>S.off=v},
  x:{lbl:"X-Offset",min:-640,max:640,def:0,u:"px",get:()=>cl().x,set:v=>cl().x=v},
  y:{lbl:"Y-Offset",min:-320,max:320,def:0,u:"px",get:()=>cl().y,set:v=>cl().y=v},
  sc:{lbl:"Scale",min:-100,max:100,def:0,u:"%",get:()=>cl().sc,set:v=>cl().sc=v}};
const cl=()=>S.layers[S.sel]||(S.layers=[Ly("")],S.sel=0,S.layers[0]);
const esc=t=>String(t).replace(/"/g,"&quot;");
const charLabel=slug=>{const l=slug.replace(/-/g," ").toLowerCase();for(const g of (AS.characters||[]))for(const n of (g.names||[]))if(n.toLowerCase()===l)return nm(n);return slug.charAt(0).toUpperCase()+slug.slice(1)};
const spLabel=src=>{const a=lib.sp.find(a=>a.src===src);return a?(a.char?charLabel(a.char)+" · ":"")+a.label:(src?T("custom"):T("empty"))};

// slider widgets
document.querySelectorAll("[data-sl]").forEach(h=>{const k=h.dataset.sl,c=SL[k];
  h.innerHTML=`<label class="sl" id="l_${k}"></label><div class="srow"><input type="range" id="r_${k}" min="${c.min}" max="${c.max}">
  <button class="ic" data-ed="${k}" title="Type a value"><svg viewBox="0 0 24 24" class="fill"><path d="M4 20l1-4L16 5l3 3L8 19z"/></svg></button>
  <button class="ic" data-rs="${k}" title="Reset"><svg viewBox="0 0 24 24"><path d="M19 12a7 7 0 1 1-2.2-5.1M19 4v4h-4"/></svg></button></div>`;
  $("#r_"+k).oninput=e=>{c.set(+e.target.value);upd()};});
document.addEventListener("click",e=>{
  const ed=e.target.closest("[data-ed]"),rs=e.target.closest("[data-rs]");
  if(ed){const c=SL[ed.dataset.ed],v=prompt(c.lbl+" ("+c.min+" to "+c.max+")",c.get());if(v!==null&&!isNaN(+v)){c.set(Math.max(c.min,Math.min(c.max,+v)));upd()}}
  if(rs){SL[rs.dataset.rs].set(SL[rs.dataset.rs].def);upd()}
});

function fill(sel,arr,none){sel.innerHTML=(none?`<option value="">${T("none")}</option>`:"")+arr.map(a=>`<option value="${esc(a.src)}">${a.label}</option>`).join("")}
function sync(){
  applyLang();$("#fBg").textContent=(lib.bg.find(a=>a.src===S.bg)||{}).label||T("custom");
  $("#fSprite").textContent=cl().src?spLabel(cl().src):T("none");$("#fChar").textContent=T("char");
  $("#fLayer").innerHTML=S.layers.map((l,i)=>`<option value="${i}">${T("layer")} ${i+1}: ${spLabel(l.src)}</option>`).join("");$("#fLayer").value=S.sel;
  $("#fText").value=S.text;$("#fName").value=S.name;$("#hText").checked=S.hideText;$("#hName").checked=S.hideName;
  $("#hSpr").checked=cl().hide;$("#fFlip").checked=cl().flip;
  for(const k in SL){$("#r_"+k).value=SL[k].get();$("#l_"+k).textContent=`${T(k)} (${SL[k].get()}${SL[k].u})`}
}
function render(){
  $("#pageBg").style.backgroundImage=S.bg?`url("${S.bg}")`:"none";
  $("#bg").src=S.bg||"";$("#bg").style.display=S.bg?"":"none";$("#bgPrev").src=S.bg||"";
  $("#layers").innerHTML=S.layers.map(l=>l.src&&!l.hide?`<div class="spr${l.flip?" flip":""}" style="left:${50+l.x/12.8}%;top:${8+l.y/6.4}%;height:${165+l.sc}%"><img src="${esc(l.src)}" alt=""></div>`:"").join("");
  const nm=$("#name");nm.style.display=(S.hideName||!S.name)?"none":"";nm.textContent=S.name;let ns=2.45;nm.style.fontSize=ns+"cqw";
  while(nm.scrollWidth>nm.clientWidth+1&&ns>1.2){ns-=.1;nm.style.fontSize=ns+"cqw"}
  const t=$("#txt");t.textContent=S.text;t.style.display=S.hideText?"none":"";
  t.style.fontSize=S.fs/12.8+"cqw";t.style.lineHeight=S.fs/12.8*1.24+"cqw";t.style.marginTop=S.off/12.8+"cqw";
}
function upd(){render();sync();try{localStorage.setItem("twst-sandbox-v2",JSON.stringify(S))}catch(e){}}

// inputs
$("#fText").oninput=e=>{S.text=e.target.value;render();persist()};
$("#fName").oninput=e=>{S.name=e.target.value;render();persist()};
const persist=()=>{try{localStorage.setItem("twst-sandbox-v2",JSON.stringify(S))}catch(e){}};
$("#langSel").onchange=e=>{S.lang=e.target.value;S.name=toLang(S.name,S.lang);upd()};
$("#fChar").onclick=()=>openPicker("char");
$("#hText").onchange=e=>{S.hideText=e.target.checked;upd()};
$("#hName").onchange=e=>{S.hideName=e.target.checked;upd()};
$("#hSpr").onchange=e=>{cl().hide=e.target.checked;upd()};
$("#fFlip").onchange=e=>{cl().flip=e.target.checked;upd()};
$("#fBg").onclick=()=>openPicker("bg");
$("#fSprite").onclick=()=>openPicker("sp");
$("#fLayer").onchange=e=>{S.sel=+e.target.value;upd()};
$("#lAdd").onclick=()=>{S.layers.splice(S.sel+1,0,Ly(""));S.sel++;upd()};
$("#lDel").onclick=()=>{if(S.layers.length>1){S.layers.splice(S.sel,1);S.sel=Math.max(0,S.sel-1)}else S.layers[0]=Ly("");upd()};
$("#lUp").onclick=()=>{const i=S.sel;if(i<S.layers.length-1){[S.layers[i],S.layers[i+1]]=[S.layers[i+1],S.layers[i]];S.sel++;upd()}};
$("#lDn").onclick=()=>{const i=S.sel;if(i>0){[S.layers[i],S.layers[i-1]]=[S.layers[i-1],S.layers[i]];S.sel--;upd()}};
$("#clear").onclick=()=>{S={...DEF(),text:"",name:"",layers:[Ly("")]};upd()};
$("#toggle").onclick=()=>{document.body.classList.toggle("nopanel");$("#toggle").textContent=document.body.classList.contains("nopanel")?"‹":"›"};
document.querySelectorAll("#tabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("#tabs button,.pane").forEach(e=>e.classList.remove("on"));b.classList.add("on");$("#"+b.dataset.tab).classList.add("on")});

// uploads (stored as data URLs)
let upT=null;
document.addEventListener("click",e=>{const t=e.target.closest("[data-up]");if(t){upT=t.dataset.up;$("#upF").value="";$("#upF").click()}});
$("#upF").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{
  const type=upT==="bg"?"bg":"sp",base=f.name.replace(/\.[^.]+$/,"");
  const label=(prompt(T("namefor"),base)||base).trim()||base,ent={label,src:r.result};
  lib[type].push({...ent,custom:1});CUS[type].push(ent);saveCus();
  if(type==="bg")S.bg=ent.src;else cl().src=ent.src;
  $("#modal").hidden=true;upd()};r.readAsDataURL(f)};

// ---------- Pickers (list for sprites / names, gallery for backgrounds) ----------
function delEntry(type,src){
  if(!confirm(T("del")))return;
  lib[type]=lib[type].filter(a=>a.src!==src);CUS[type]=CUS[type].filter(a=>a.src!==src);saveCus();
  if(S.bg===src)S.bg=lib.bg[0]?.src||"";S.layers.forEach(l=>{if(l.src===src)l.src=""});upd();
}
function openPicker(type){
  const m=$("#modal"),box=$("#mBox");m.hidden=false;m.className=type;
  const close=()=>{m.hidden=true};
  m.onclick=e=>{if(e.target===m)close()};
  const bar=(addTxt,addFn)=>`<div class="mbar"><button class="mx" data-x>×</button><button class="madd" data-add>${addTxt}</button></div>`;
  let h="";
  if(type==="bg"){
    h=bar(T("add"))+(lib.bg.some(a=>!a.custom)?"":`<div class="mhint">${T("nobg")}</div>`)+lib.bg.map((a,i)=>`<div class="card${a.src===S.bg?" on":""}" data-i="${i}"><img src="${esc(a.src)}" alt=""><div class="cap"><span>${a.label}</span>${a.custom?`<button class="mdel" data-del="${i}">✕</button>`:""}</div></div>`).join("");
  }else if(type==="sp"){
    const order=[];(AS.characters||[]).forEach(g=>(g.names||[]).forEach(n=>order.push(n.toLowerCase())));
    const slugs=[...new Set(lib.sp.filter(a=>a.char).map(a=>a.char))].sort((a,b)=>{const x=order.indexOf(a),y=order.indexOf(b);return (x<0?999:x)-(y<0?999:y)});
    const row=(a,i)=>`<div class="mrow${a.src===cl().src?" on":""}" data-i="${i}"><span class="l">${a.label}</span>${a.custom?`<button class="mdel" data-del="${i}">✕</button>`:""}<i class="rad"></i></div>`;
    h=bar(T("add"))+`<div class="mrow${cl().src===""?" on":""}" data-i="-1"><span class="l">${T("none")}</span><i class="rad"></i></div>`+
      (slugs.length?"":`<div class="mhint">${T("nosp")}</div>`)+slugs.map(s=>`<div class="mgrp">${charLabel(s)}</div>`+lib.sp.map((a,i)=>a.char===s?row(a,i):"").join("")).join("")+
      (lib.sp.some(a=>!a.char)?`<div class="mgrp">${T("myup")}</div>`+lib.sp.map((a,i)=>a.char?"":row(a,i)).join(""):"");
  }else{
    const groups=[...(AS.characters||[]),...(CUS.chars.length?[{group:"__my",names:CUS.chars}]:[])];
    h=bar(T("addname"))+groups.map(g=>{const title=g.group==="__my"?T("mychars"):(S.lang==="ja"?(GJA[g.group]||g.group):g.group);
      return `<div class="mgrp">${title}</div>`+g.names.map(n=>`<div class="mrow${nm(n)===S.name?" on":""}" data-n="${esc(n)}"><span class="l">${nm(n)}</span>${g.group==="__my"?`<button class="mdel" data-delc="${esc(n)}">✕</button>`:""}<i class="rad"></i></div>`).join("")}).join("");
  }
  box.innerHTML=h;
  box.onclick=e=>{
    if(e.target.closest("[data-x]"))return close();
    if(e.target.closest("[data-add]")){
      if(type==="char"){const n=(prompt(T("chname"))||"").trim();if(n){CUS.chars.push(n);saveCus();S.name=n;upd();openPicker("char")}}
      else{upT=type==="bg"?"bg":"sp";$("#upF").value="";$("#upF").click()}
      return}
    const dc=e.target.closest("[data-delc]");
    if(dc){if(confirm(T("del"))){CUS.chars=CUS.chars.filter(c=>c!==dc.dataset.delc);saveCus();openPicker("char")}return}
    const d=e.target.closest("[data-del]");
    if(d){const a=lib[type][+d.dataset.del];delEntry(type,a.src);openPicker(type);return}
    const row=e.target.closest("[data-i],[data-n]");if(!row)return;
    if(type==="char")S.name=nm(row.dataset.n);
    else{const i=+row.dataset.i,src=i<0?"":lib[type][i].src;if(type==="bg")S.bg=src;else cl().src=src}
    close();upd();
  };
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#modal").hidden=true});

// ---------- Save PNG (2560x1280) ----------
async function savePNG(){
  const W=2560,H=1280,u=W/100,c=document.createElement("canvas");c.width=W;c.height=H;const g=c.getContext("2d");
  const load=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error("load "+src.slice(0,40)));i.src=src});
  try{await Promise.all([document.fonts.load("40px TsukuAB"),document.fonts.load("40px TsukuAJ"),document.fonts.load("40px Boucherie")])}catch(e){}
  if(S.bg){const im=await load(S.bg),r=Math.max(W/im.width,H/im.height),w=im.width*r,h=im.height*r;g.drawImage(im,(W-w)/2,(H-h)/2,w,h)}
  for(const l of S.layers){if(!l.src||l.hide)continue;
    const im=await load(l.src),h=(165+l.sc)/100*H,w=h*im.width/im.height,cx=W/2+l.x*2,y=.08*H+l.y*2;
    g.save();if(l.flip){g.translate(cx,0);g.scale(-1,1);g.drawImage(im,-w/2,y,w,h)}else g.drawImage(im,cx-w/2,y,w,h);g.restore()}
  const ui=await load("public/ui/dialogue_ui.png"),uw=ui.width,uh=ui.height;
  g.drawImage(ui,0,.6*uh,uw,.4*uh,W/2*(1-1.12),.965*H+(.6*H-.965*H)*1.3,W*1.12,.4*H*1.3);
  g.drawImage(ui,0,0,uw,.3*uh,0,0,W,.3*H);
  g.textBaseline="middle";
  if(S.name&&!S.hideName){let s=2.45;g.font=`${s*u}px Boucherie, TsukuAJ, TsukuAB, serif`;
    while(g.measureText(S.name).width>18.5*u&&s>1.2){s-=.1;g.font=`${s*u}px Boucherie, TsukuAJ, TsukuAB, serif`}
    g.fillStyle="#f1ede6";g.textAlign="center";g.fillText(S.name,(16.1+19.4/2)*u,(32.6+2.2)*u+u*.15)}
  if(!S.hideText){const s=S.fs/12.8,lh=s*1.24,maxW=58*u;g.font=`${s*u}px ${S.lang==="ja"?"TsukuAJ, TsukuAB":"TsukuAB"}, sans-serif`;const lines=[];
    for(const para of (S.text||"").split("\n")){let cur="";for(const w of (S.lang==="ja"?Array.from(para):para.split(/(\s+)/))){const t=cur+w;if(g.measureText(t).width>maxW&&cur.trim()){lines.push(cur.trimEnd());cur=w.trimStart()}else cur=t}lines.push(cur)}
    g.fillStyle="#5b5650";g.textAlign="left";
    lines.forEach((t,i)=>g.fillText(t,21.3*u,(38.2+S.off/12.8+lh/2+i*lh)*u))}
  c.toBlob(b=>{if(!b)return;const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="dialogue.png";a.click()},"image/png");
}
$("#save").onclick=async()=>{try{await savePNG();const n=$("#notice");n.classList.add("show");setTimeout(()=>n.classList.remove("show"),4000)}
  catch(e){alert("Couldn't save the PNG: "+e.message+"\n\nRun start.bat (Windows) or start.sh (Mac/Linux) and open http://localhost:8080 — browsers block saving when the page is opened as a file.")}};
upd();
document.fonts.ready.then(render);document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",render);
