import { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { TYPES, STATUSES, emptyApplication } from '../interfaces/application';

export default function ApplicationForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial ?? emptyApplication);
  const [error, setError] = useState('');
  useEffect(() => { setForm(initial ?? emptyApplication); setError(''); }, [initial]);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  function submit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.organization.trim()) {
      setError('Başlık ve kurum alanlarını doldurmalısın.');
      return;
    }
    onSave({ ...form, title: form.title.trim(), organization: form.organization.trim(), link: form.link.trim(), note: form.note.trim() });
  }
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={initial ? 'Başvuru düzenle' : 'Yeni başvuru'}>
        <div className="modal-title"><div><p className="eyebrow">BAŞVURU FORMU</p><h2>{initial ? 'Başvuruyu düzenle' : 'Yeni fırsat ekle'}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Kapat"><X size={21}/></button></div>
        <form onSubmit={submit} className="entry-form">
          <label>Başvuru / program adı <span>*</span><input maxLength="90" autoFocus value={form.title} onChange={(e) => update('title',e.target.value)} placeholder="Örn. Yazılım Geliştirme Stajı"/></label>
          <label>Kurum / şirket <span>*</span><input maxLength="80" value={form.organization} onChange={(e) => update('organization',e.target.value)} placeholder="Örn. Teknoloji şirketi"/></label>
          <div className="form-grid"><label>Kategori<select value={form.type} onChange={(e)=>update('type',e.target.value)}>{TYPES.map((x)=><option key={x}>{x}</option>)}</select></label><label>Durum<select value={form.status} onChange={(e)=>update('status',e.target.value)}>{STATUSES.map((x)=><option key={x}>{x}</option>)}</select></label></div>
          <label>Son başvuru tarihi<input type="date" value={form.deadline} onChange={(e) => update('deadline',e.target.value)}/></label>
          <label>Başvuru bağlantısı<input type="url" value={form.link} onChange={(e) => update('link',e.target.value)} placeholder="https://..."/></label>
          <label>Notlar<textarea rows="3" maxLength="600" value={form.note} onChange={(e)=>update('note',e.target.value)} placeholder="Gerekli belgeler, görüşme notları, yapılacaklar..."/></label>
          {error && <p role="alert" className="form-error">{error}</p>}
          <div className="modal-actions"><button type="button" className="button ghost" onClick={onClose}>Vazgeç</button><button type="submit" className="button primary"><Save size={17}/> {initial ? 'Değişiklikleri kaydet' : 'Başvuruyu kaydet'}</button></div>
        </form>
      </section>
    </div>
  );
}
