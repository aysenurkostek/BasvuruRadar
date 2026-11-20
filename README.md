# BaşvuruRadar

Staj, iş, burs ve eğitim programı başvurularını takip etmek için geliştirilmiş, Türkçe arayüzlü bir React uygulamasıdır.

## Neden bu proje?

Başvurular farklı internet sitelerinde kalabiliyor. Bu proje; son tarih, kurum adı, durum ve notları tek sayfada tutarak başvuru süreçlerinin takibini kolaylaştırır.

## Kullanılan teknolojiler

- React (JavaScript)
- Vite
- Pure CSS (hazır CSS kütüphanesi kullanılmadı)
- localStorage (tarayıcıda veri saklama)
- lucide-react (ikonlar)

## Özellikler

1. Başvuru ekleme (Create)
2. Başvuruları listeleme (Read)
3. Başvuruyu düzenleme (Update)
4. Başvuru silme (Delete)
5. Kategori ve durum filtreleme
6. Başlık, kurum ve notlarda arama
7. Son tarihe, eklenme zamanına veya isme göre sıralama
8. Yaklaşan son tarihleri (7 gün) gösterme
9. Toplam başvuru, başvurulan ve kabul edilen sayıları
10. CSV dışa aktarma
11. Telefon ekranına uyumlu tasarım

## Mac / Windows üzerinde çalıştırma

Öncelikle Node.js (LTS) kurulu olmalı.

```bash
npm install
npm run dev
```

Terminalin verdiği yerel bağlantıyı açın (genellikle http://localhost:5173).

## Proje klasör yapısı

```
BasvuruRadar/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── style.css
    ├── components/
    │   ├── ApplicationCard.jsx
    │   └── ApplicationForm.jsx
    ├── pages/
    │   └── Dashboard.jsx
    ├── interfaces/
    │   └── application.js
    └── utils/
        └── dates.js
```

## Nasıl kullanılır?

1. **Yeni başvuru ekle** butonuna basın.
2. Başvuru adı ve kurumu yazın, isterseniz son tarih, bağlantı ve not ekleyin.
3. Kaydın üstündeki **Düzenle** veya **Sil** simgelerini kullanın.
4. Filtreleri değiştirerek sadece belli tür veya durumdaki başvuruları görün.
5. **CSV indir** ile kayıtlarınızın bir kopyasını alın.

**Not:** İlk açılışta görünen üç kayıt temsili örnektir; gerçek ilan ya da açık başvuru değildir. Son tarihler özellikle boş bırakılmıştır.

## Veri saklama

Veriler `localStorage` ile **sadece mevcut tarayıcıda ve cihazda** tutulur. Hesap sistemi veya sunucu bulunmaz. Tarayıcı verilerini temizlerseniz kayıtlar silinebilir; önce CSV yedeği alın. Uygulama kendiliğinden e-posta veya telefon bildirimi göndermez. Son tarih uyarıları yalnızca uygulama açıldığında görüntülenir.

## Github'a yükleme

1. GitHub'da yeni bir repository oluşturun (örn. `basvuru-radar`).
2. VS Code'da proje klasörünü açın.
3. Terminalde:

```bash
git init
git add .
git commit -m "Ilk surum"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/basvuru-radar.git
git push -u origin main
```

`KULLANICI_ADIN` yerine GitHub kullanıcı adınızı yazın. `node_modules` ve `dist` klasörleri `.gitignore` sayesinde yüklenmez.

## Netlify'a yayınlama

1. Netlify hesabına giriş yapın.
2. **Add new project > Import an existing project** yolunu izleyin.
3. GitHub'daki repoyu seçin.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy edin ve verilen site adresini saklayın.

## Öğretmene teslim öncesi kontrol

- [ ] `npm install` ve `npm run dev` ile uygulama çalışıyor.
- [ ] Ekleme, düzenleme, listeleme ve silme denenmiş.
- [ ] En az bir uygulama ekran görüntüsü alınmış.
- [ ] Proje kaynak kodu GitHub'a yüklenmiş.
- [ ] Netlify adresi açılıyor.
- [ ] İstenen teslim formuna GitHub ve Netlify bağlantıları yazılmış.

## Kısa sunum metni

> Projemin adı BaşvuruRadar. Staj, iş, burs ve eğitim başvurularını tek sayfadan takip etmek için geliştirdim. React ve Vite kullandım. Kullanıcı başvuruları ekleyebiliyor, görebiliyor, düzenleyebiliyor ve silebiliyor. Ayrıca kategori ve duruma göre filtreleme, son tarihe göre sıralama ve CSV dosyası indirme özellikleri var. Veriler localStorage içinde saklanıyor.
