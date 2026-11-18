/* Isi SUPABASE_URL dan SUPABASE_ANON_KEY dari Supabase > Project Settings > API.
   Gunakan publishable/anon key, JANGAN gunakan secret atau service_role key. */
const SUPABASE_URL = "PASTE_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE";
const TABLE = "site_content";
const BUCKET = "class-media";
const DEFAULT_CONTENT = {
  brandName:"KELAS VII C",brandTagline:"Bersama, Berkarya, Berprestasi",
  heroEyebrow:"PROFIL KELAS • TAHUN AJARAN 2026/2027",heroTitle:"Satu Kelas,<br><em>Banyak Cerita.</em>",
  heroDescription:"Selamat datang di website resmi kelas VII C. Tempat kami belajar, tumbuh, dan menciptakan kenangan bersama.",
  heroFootLeft:"KOMPAK • KREATIF • INSPIRATIF",heroFootRight:"EST. 2026",
  aboutTitle:"Mengenal lebih dekat<br><em>keluarga VII C.</em>",
  aboutText:"Kami adalah keluarga kelas VII C yang terdiri dari siswa-siswi dengan semangat untuk belajar, saling mendukung, dan berkembang bersama.",
  aboutExtra:"Setiap hari adalah kesempatan untuk mencoba hal baru, bekerja sama, dan menciptakan pengalaman yang berarti.",
  statStudents:"28",statTeachers:"—",statYear:"2026",
  membersTitle:"Orang-orang di balik<br><em>cerita VII C.</em>",membersIntro:"Kenali teman-teman dan pengurus kelas kami.",
  galleryTitle:"Potongan cerita<br><em>yang tersimpan.</em>",galleryIntro:"Momen kebersamaan yang menjadi bagian dari perjalanan kelas kami.",
  newsTitle:"Informasi &<br><em>pengumuman.</em>",newsIntro:"Informasi terbaru seputar kegiatan kelas VII C.",
  contactTitle:"Ada yang ingin<br><em>ditanyakan?</em>",contactText:"Hubungi administrator kelas melalui kontak berikut.",
  contactAddress:"Alamat sekolah / kelas",contactPhone:"Belum diatur",contactEmail:"Belum diatur",
  whatsappNumber:"",headerContact:"#kontak",footerText:"Bersama, Berkarya, Berprestasi.",
  footerCopyright:"© 2026 Kelas VII C. All rights reserved.",socialLinks:"",
  logoUrl:"https://placehold.co/160x160/171b26/d6b46b?text=VII+C",
  heroImageUrl:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85",
  members:[{name:"Ketua Kelas",role:"Ketua Kelas",image:""},{name:"Wakil Ketua",role:"Wakil Ketua",image:""},{name:"Sekretaris",role:"Sekretaris",image:""},{name:"Bendahara",role:"Bendahara",image:""}],
  gallery:[],news:[]
};
let supabaseClient=null, content={...DEFAULT_CONTENT}, currentUser=null;
const $=id=>document.getElementById(id);
const isConfigured=()=>!SUPABASE_URL.includes("PASTE_")&&!SUPABASE_ANON_KEY.includes("PASTE_");
function escapeHtml(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function setMessage(id,message,isError=false){$(id).textContent=message;$(id).style.color=isError?"#ff9b91":"#e4cf9d";}
function safeUrl(value){try{const u=new URL(value,location.href);return ["http:","https:"].includes(u.protocol)?u.href:"#";}catch{return "#";}}
function setText(id,value){if($(id))$(id).textContent=value??"";}
function setHtml(id,value){if($(id))$(id).innerHTML=value??"";}
function render(){
  setText("brandName",content.brandName);setText("brandTagline",content.brandTagline);
  $("brandLogo").src=content.logoUrl||DEFAULT_CONTENT.logoUrl;
  setText("heroEyebrow",content.heroEyebrow);setHtml("heroTitle",content.heroTitle);setText("heroDescription",content.heroDescription);
  setText("heroFootLeft",content.heroFootLeft);setText("heroFootRight",content.heroFootRight);
  $("heroImage").style.backgroundImage=`url("${String(content.heroImageUrl||DEFAULT_CONTENT.heroImageUrl).replace(/["\\]/g,"")}")`;
  setHtml("aboutTitle",content.aboutTitle);setText("aboutText",content.aboutText);setText("aboutExtra",content.aboutExtra);
  setText("statStudents",content.statStudents);setText("statTeachers",content.statTeachers);setText("statYear",content.statYear);
  setHtml("membersTitle",content.membersTitle);setText("membersIntro",content.membersIntro);
  setHtml("galleryTitle",content.galleryTitle);setText("galleryIntro",content.galleryIntro);
  setHtml("newsTitle",content.newsTitle);setText("newsIntro",content.newsIntro);
  setHtml("contactTitle",content.contactTitle);setText("contactText",content.contactText);
  setText("contactAddress",content.contactAddress);setText("contactPhone",content.contactPhone);setText("contactEmail",content.contactEmail);
  setText("footerName",content.brandName);setText("footerText",content.footerText);setText("footerCopyright",content.footerCopyright);
  $("headerContact").href=safeUrl(content.headerContact||"#kontak");
  const wa=String(content.whatsappNumber||"").replace(/\D/g,"");
  $("whatsappButton").href=wa?`https://wa.me/${wa}?text=${encodeURIComponent("Halo administrator kelas VII C, saya ingin bertanya.")}`:"#kontak";
  $("whatsappButton").style.opacity=wa?"1":".5";
  $("memberGrid").innerHTML=(content.members||[]).map(m=>`<article class="member-card"><img loading="lazy" src="${escapeHtml(m.image||"https://placehold.co/500x550/282d39/e4cf9d?text=VII+C")}" alt="${escapeHtml(m.name)}"><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.role)}</p></article>`).join("")||'<p class="muted">Data anggota belum ditambahkan.</p>';
  $("galleryGrid").innerHTML=(content.gallery||[]).map(g=>`<article class="gallery-card"><img loading="lazy" src="${escapeHtml(g.image||"")}" alt="${escapeHtml(g.title)}"><div class="gallery-caption"><strong>${escapeHtml(g.title)}</strong><span>${escapeHtml(g.caption||"")}</span></div></article>`).join("")||'<p class="muted">Galeri akan segera diperbarui.</p>';
  $("newsList").innerHTML=(content.news||[]).map(n=>`<article class="news-item"><div class="news-date">${escapeHtml(n.date||"INFO KELAS")}</div><div><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.body)}</p></div>${n.url?`<a href="${escapeHtml(safeUrl(n.url))}" target="_blank" rel="noopener">↗</a>`:""}</article>`).join("")||'<p class="muted" style="padding:24px 0">Belum ada pengumuman.</p>';
}
async function loadContent(){
  if(!isConfigured()){render();return;}
  const {data,error}=await supabaseClient.from(TABLE).select("content").eq("id",1).maybeSingle();
  if(error){console.error(error);return;}
  if(data?.content)content={...DEFAULT_CONTENT,...data.content};
  render();
}
async function saveContent(){
  const fields=[...document.querySelectorAll("[data-path]")];
  fields.forEach(el=>{content[el.dataset.path]=el.value;});
  const {error}=await supabaseClient.from(TABLE).upsert({id:1,content,updated_at:new Date().toISOString()});
  if(error)throw error;render();setMessage("adminMessage","Konten berhasil disimpan.");
}
function fillEditor(){
  document.querySelectorAll("[data-path]").forEach(el=>{el.value=content[el.dataset.path]??"";});
  $("membersEditor").value=(content.members||[]).map(m=>[m.name,m.role,m.image||""].join(" | ")).join("\n");
  $("galleryEditor").value=(content.gallery||[]).map(g=>[g.title,g.image,g.caption||""].join(" | ")).join("\n");
  $("newsEditor").value=(content.news||[]).map(n=>[n.date,n.title,n.body,n.url||""].join(" | ")).join("\n");
}
function parseLines(value,count){return value.split("\n").map(x=>x.trim()).filter(Boolean).map(line=>{const p=line.split("|").map(v=>v.trim());return p.slice(0,count);});}
async function saveJsonField(field,value){content[field]=value;const {error}=await supabaseClient.from(TABLE).upsert({id:1,content,updated_at:new Date().toISOString()});if(error)throw error;render();setMessage("adminMessage","Perubahan berhasil disimpan.");}
async function uploadImage(file,kind){
  if(!file)return;
  if(!file.type.startsWith("image/"))throw new Error("Pilih file gambar.");
  if(file.size>6*1024*1024)throw new Error("Ukuran gambar maksimal 6 MB.");
  const ext=(file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"");
  const path=`${kind}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const {error}=await supabaseClient.storage.from(BUCKET).upload(path,file,{cacheControl:"3600",upsert:false});
  if(error)throw error;
  const {data}=supabaseClient.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
async function requireAdmin(){
  const {data:{user}}=await supabaseClient.auth.getUser();
  if(!user)return false;
  const {data,error}=await supabaseClient.from("app_admins").select("user_id").eq("user_id",user.id).maybeSingle();
  if(error||!data)return false;
  currentUser=user;return true;
}
async function showDashboard(){
  const allowed=await requireAdmin();
  if(!allowed){$("loginPanel").hidden=false;$("dashboardPanel").hidden=true;setMessage("loginMessage","Akun ini belum memiliki hak administrator.",true);return;}
  $("loginPanel").hidden=true;$("dashboardPanel").hidden=false;$("adminIdentity").textContent=currentUser.email||"Administrator";
  await loadContent();fillEditor();
}
document.addEventListener("DOMContentLoaded",async()=>{
  $("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
  $("mainNav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));
  $("openAdmin").addEventListener("click",()=>{$("adminDialog").showModal();});
  $("closeAdmin").addEventListener("click",()=>$("adminDialog").close());
  $("adminDialog").addEventListener("click",e=>{if(e.target===$("adminDialog"))$("adminDialog").close();});
  if(!isConfigured()){render();return;}
  supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
  await loadContent();
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(session)await showDashboard();
  supabaseClient.auth.onAuthStateChange((_event,session)=>{if(session)setTimeout(showDashboard,0);else{$("loginPanel").hidden=false;$("dashboardPanel").hidden=true;}});
  $("loginButton").addEventListener("click",async()=>{
    setMessage("loginMessage","Memeriksa akun...");
    const {error}=await supabaseClient.auth.signInWithPassword({email:$("adminEmail").value.trim(),password:$("adminPassword").value});
    if(error){setMessage("loginMessage",error.message,true);return;}
    await showDashboard();
  });
  $("logoutButton").addEventListener("click",()=>supabaseClient.auth.signOut());
  document.querySelectorAll(".admin-tabs button").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".admin-tabs button").forEach(b=>b.classList.toggle("active",b===btn));
    document.querySelectorAll(".admin-tab").forEach(tab=>tab.hidden=tab.id!==btn.dataset.tab);
    setMessage("adminMessage","");
  }));
  $("saveContent").addEventListener("click",async()=>{try{await saveContent();}catch(e){setMessage("adminMessage",e.message,true);}});
  $("saveMembers").addEventListener("click",async()=>{try{const rows=parseLines($("membersEditor").value,3);await saveJsonField("members",rows.map(p=>({name:p[0]||"",role:p[1]||"",image:p[2]||""})));}catch(e){setMessage("adminMessage",e.message,true);}});
  $("saveGallery").addEventListener("click",async()=>{try{const rows=parseLines($("galleryEditor").value,3);await saveJsonField("gallery",rows.map(p=>({title:p[0]||"",image:p[1]||"",caption:p[2]||""})));}catch(e){setMessage("adminMessage",e.message,true);}});
  $("saveNews").addEventListener("click",async()=>{try{const rows=parseLines($("newsEditor").value,4);await saveJsonField("news",rows.map(p=>({date:p[0]||"",title:p[1]||"",body:p[2]||"",url:p[3]||""})));}catch(e){setMessage("adminMessage",e.message,true);}});
  $("logoUpload").addEventListener("change",async e=>{try{const url=await uploadImage(e.target.files[0],"logo");if(url){content.logoUrl=url;await saveJsonField("logoUrl",url);fillEditor();}}catch(err){setMessage("adminMessage",err.message,true);}});
  $("heroUpload").addEventListener("change",async e=>{try{const url=await uploadImage(e.target.files[0],"hero");if(url){content.heroImageUrl=url;await saveJsonField("heroImageUrl",url);fillEditor();}}catch(err){setMessage("adminMessage",err.message,true);}});
  $("galleryUpload").addEventListener("change",async e=>{try{const current=content.gallery||[];for(const file of e.target.files){const url=await uploadImage(file,"gallery");current.push({title:file.name.replace(/\.[^.]+$/,""),image:url,caption:""});}await saveJsonField("gallery",current);fillEditor();}catch(err){setMessage("adminMessage",err.message,true);}});
});