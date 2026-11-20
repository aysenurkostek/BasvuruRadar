// Uygulamadaki kayıtların veri şeması (JavaScript projesinde açıklayıcı interface).
// { id, title, organization, type, status, deadline, link, note, createdAt }
export const TYPES = ['Staj', 'İş', 'Burs', 'Eğitim', 'Diğer'];
export const STATUSES = ['Hazırlanıyor', 'Başvuruldu', 'Görüşme', 'Kabul', 'Ret'];
export const emptyApplication = {
  title: '', organization: '', type: 'Staj', status: 'Hazırlanıyor',
  deadline: '', link: '', note: ''
};
