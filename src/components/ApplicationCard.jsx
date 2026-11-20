import { CalendarDays, ExternalLink, Pencil, Trash2, Building2 } from 'lucide-react';
import { deadlineLabel, deadlineTone, formatDate } from '../utils/dates';
export default function ApplicationCard({item,number,onEdit,onDelete}) {
  const tone = deadlineTone(item.deadline,item.status);
  return <article className="application-card">
   <span className="record-num">{String(number).padStart(2,'0')}</span>
   <div className="record-main"><div className="record-tags"><span className="category-pill">{item.type}</span><span className={`status status-${item.status.toLowerCase().replace('ş','s').replace('ü','u').replace('ö','o')}`}>{item.status}</span></div><h3>{item.title}</h3><p className="organization"><Building2 size={14}/> {item.organization}</p>{item.note && <p className="card-note">{item.note}</p>}{item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="open-link">Başvuru bağlantısı <ExternalLink size={13}/></a>}</div>
   <div className="record-side"><span className={`deadline-pill ${tone}`}>{deadlineLabel(item.deadline,item.status)}</span><span className="record-date"><CalendarDays size={14}/> {formatDate(item.deadline)}</span><div className="card-actions"><button type="button" onClick={()=>onEdit(item)} title="Düzenle" aria-label={`${item.title} düzenle`}><Pencil size={16}/></button><button type="button" onClick={()=>onDelete(item)} title="Sil" aria-label={`${item.title} sil`}><Trash2 size={16}/></button></div></div>
  </article>;
}
