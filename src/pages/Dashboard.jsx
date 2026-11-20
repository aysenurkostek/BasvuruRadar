import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, CalendarDays, Clock3, Send, CheckCircle2, Download, FilterX, ArrowUpRight, BookOpen, ListFilter } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationCard from '../components/ApplicationCard';
import { TYPES, STATUSES } from '../interfaces/application';
import { daysUntil } from '../utils/dates';
const STORAGE_KEY = 'basvururadar-v1';
const starter = [
 {id:'demo-1',title:'Yazılım Geliştirme Stajı',organization:'Örnek Teknoloji A.Ş.',type:'Staj',status:'Hazırlanıyor',deadline:'',link:'',note:'CV ve transkript hazırlanacak.',createdAt:'2026-01-01T12:00:00.000Z'},
 {id:'demo-2',title:'Başarı Bursu',organization:'Örnek Eğitim Vakfı',type:'Burs',status:'Başvuruldu',deadline:'',link:'',note:'Başvuru değerlendirme sonucu bekleniyor.',createdAt:'2026-01-02T12:00:00.000Z'},
 {id:'demo-3',title:'Frontend Geliştirme Programı',organization:'Örnek Akademi',type:'Eğitim',status:'Görüşme',deadline:'',link:'',note:'Ön görüşme için hazırlık yapılacak.',createdAt:'2026-01-03T12:00:00.000Z'}
];
function readStored() {
 try { const data = localStorage.getItem(STORAGE_KEY); if (data !== null) { const parsed=JSON.parse(data); if(Array.isArray(parsed)) return parsed; } } catch (error) { console.warn('Kayıtlar okunamadı:',error); }
 return starter;
}
function csvCell(value) { const text=String(value ?? ''); return '"' + text.replaceAll('"','""') + '"'; }
export default function Dashboard() {
 const [items,setItems] = useState(readStored);
 const [dialog,setDialog] = useState(null);
 const [editing,setEditing] = useState(null);
 const [query,setQuery] = useState('');
 const [type,setType] = useState('Hepsi');
 const [status,setStatus] = useState('Hepsi');
 const [sort,setSort] = useState('deadline');
 useEffect(()=>{ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(items));}catch(error){console.warn('Kayıt kaydedilemedi:',error);} },[items]);
 const upcoming = items.filter((x)=>!['Kabul','Ret'].includes(x.status) && daysUntil(x.deadline)!==null && daysUntil(x.deadline)>=0 && daysUntil(x.deadline)<=7).length;
 const applied = items.filter((x)=>['Başvuruldu','Görüşme','Kabul','Ret'].includes(x.status)).length;
 const accepted = items.filter((x)=>x.status==='Kabul').length;
 const filtered = useMemo(()=>items.filter((x)=>{
   const q=query.toLocaleLowerCase('tr-TR').trim();
   return (!q || [x.title,x.organization,x.note].some((v)=>String(v||'').toLocaleLowerCase('tr-TR').includes(q))) && (type==='Hepsi'||x.type===type) && (status==='Hepsi'||x.status===status);
 }).sort((a,b)=>{if(sort==='recent') return new Date(b.createdAt)-new Date(a.createdAt);if(sort==='name') return a.title.localeCompare(b.title,'tr');return (a.deadline||'9999').localeCompare(b.deadline||'9999');}),[items,query,type,status,sort]);
 function openNew(){setEditing(null);setDialog('form');}
 function openEdit(item){setEditing(item);setDialog('form');}
 function save(item){if(editing){setItems((prev)=>prev.map((x)=>x.id===editing.id?{...item,id:x.id,createdAt:x.createdAt}:x));}else{setItems((prev)=>[{...item,id:crypto.randomUUID?.()??String(Date.now()),createdAt:new Date().toISOString()},...prev]);}setDialog(null);setEditing(null);}
 function remove(item){if(window.confirm(`“${item.title}” kaydını silmek istiyor musun?`)){setItems((prev)=>prev.filter((x)=>x.id!==item.id));}}
 function exportCSV(){const columns=['Başlık','Kurum','Kategori','Durum','Son Tarih','Bağlantı','Not'];const rows=items.map((x)=>[x.title,x.organization,x.type,x.status,x.deadline,x.link,x.note]);const csv='\uFEFF'+[columns,...rows].map((row)=>row.map(csvCell).join(';')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='basvurularim.csv';a.click();URL.revokeObjectURL(url);}
 const hasFilters=Boolean(query)||type!=='Hepsi'||status!=='Hepsi';
 return <div className="app-shell">
 <header className="site-header">
   <div className="site-brand"><span className="brand-mark">br<span>.</span></span><span className="brand-name">başvuru<span>radar</span></span></div>
   <div className="header-right"><span className="edition">KİŞİSEL BAŞVURU DEFTERİ <span className="edition-slash">/</span> 2026</span><button className="button header-add" onClick={openNew}><Plus size={17}/> Yeni kayıt</button></div>
 </header>
 <main className="page-content">
   <div className="intro"><div className="intro-meta"><span className="intro-index">01 / GENEL BAKIŞ</span><span className="intro-line"/></div><div className="intro-title-row"><div><p className="intro-kicker">Bir şeyleri kaçırmamak için.</p><h1>Başvurularım<span className="title-period">.</span></h1></div><span className="intro-scribble" aria-hidden="true">küçük bir düzen,<br/> büyük rahatlık <span>↗</span></span></div><p className="intro-description">Staj, iş, burs... Hepsinin son tarihi ve durumu aynı sayfada. Bu defter, aklında tutmak istemediğin detaylar için.</p></div>
   <div className="workspace">
     <aside className="notes-column">
       <section className="notes-heading"><span>BU DEFTERDE</span><span>↘</span></section>
       <div className="counter-list">
         <div className="counter-row"><span className="counter-num">01</span><span className="counter-label">Toplam kayıt</span><strong>{items.length}</strong></div>
         <div className="counter-row"><span className="counter-num">02</span><span className="counter-label">Yaklaşan son tarih <small>7 gün içinde</small></span><strong>{upcoming}</strong></div>
         <div className="counter-row"><span className="counter-num">03</span><span className="counter-label">Başvuru yapılan</span><strong>{applied}</strong></div>
         <div className="counter-row"><span className="counter-num">04</span><span className="counter-label">Kabul edilen</span><strong>{accepted}</strong></div>
       </div>
       <div className="paper-note"><div className="note-tape"/><span className="note-heading">Kendime not</span><p>Son gün telaşını<br/>kendine yaşatma.</p><span className="note-caption">Belgelerini bir gün önceden kontrol et.</span><span className="note-doodle">✳</span></div>
       <p className="aside-footnote"><BookOpen size={15}/> Kayıtların bu tarayıcıda tutulur.</p>
     </aside>
     <section className="records-column"><div className="records-top"><div><span className="section-index">02 / KAYITLAR</span><h2>Takip listesi <span className="record-count">{filtered.length}</span></h2><p>Başvurularının güncel hâli burada.</p></div><button className="button export-button" onClick={exportCSV}><Download size={16}/> CSV indir</button></div>
       <div className="filters"><label className="search"><Search size={17}/><input aria-label="Başvurularda ara" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Başvuru veya kurum ara"/></label><select aria-label="Kategori filtresi" value={type} onChange={e=>setType(e.target.value)}><option>Hepsi</option>{TYPES.map(x=><option key={x}>{x}</option>)}</select><select aria-label="Durum filtresi" value={status} onChange={e=>setStatus(e.target.value)}><option>Hepsi</option>{STATUSES.map(x=><option key={x}>{x}</option>)}</select><select aria-label="Sıralama" value={sort} onChange={e=>setSort(e.target.value)}><option value="deadline">Son tarihe göre</option><option value="recent">En yeni</option><option value="name">İsme göre</option></select></div>
       {filtered.length ? <div className="record-list">{filtered.map((x,i)=><ApplicationCard key={x.id} item={x} number={i+1} onEdit={openEdit} onDelete={remove}/>)}</div> : <div className="empty"><ListFilter size={27}/><h3>{hasFilters?'Bu filtreyle kayıt bulunamadı.':'Defter henüz boş.'}</h3><p>{hasFilters?'Başka kelimeler veya filtreler deneyebilirsin.':'İlk başvurunu ekleyerek başla.'}</p>{hasFilters?<button className="button outline" onClick={()=>{setQuery('');setType('Hepsi');setStatus('Hepsi');}}><FilterX size={16}/> Temizle</button>:<button className="button primary" onClick={openNew}><Plus size={16}/> İlk kaydı ekle</button>}</div>}
       <button className="bottom-add" onClick={openNew}><Plus size={19}/> Listeye yeni başvuru ekle <ArrowUpRight size={18}/></button>
     </section>
   </div>
   <footer className="page-footer"><span>başvururadar / kişisel takip sayfası</span><span>Veriler bu tarayıcıda saklanır · Otomatik bildirim gönderilmez.</span></footer>
 </main>
 {dialog==='form'&&<ApplicationForm initial={editing} onSave={save} onClose={()=>setDialog(null)}/>}
 </div>;
}
