"use strict";

/*
 * Pengaturan bahasa website: Indonesia (bawaan), Inggris, Jepang, Mandarin, Rusia.
 * Urutan isi setiap entri terjemahan: [id, en, ja, zh, ru].
 * Untuk menambah atau mengubah teks, cukup edit entri di TEKS di bawah ini.
 */

const URUTAN_BAHASA = ["id", "en", "ja", "zh", "ru"];
const LOCALE = { id: "id-ID", en: "en-GB", ja: "ja-JP", zh: "zh-CN", ru: "ru-RU" };
const KODE_HTML = { id: "id", en: "en", ja: "ja", zh: "zh-CN", ru: "ru" };
const KUNCI_SIMPAN = "ridwan-rotan-bahasa";
const NAMA_SITUS = "Ridwan Rotan Cirebon";

let bahasaAktif = "id";

/* Fungsi yang dipanggil ulang setiap bahasa diganti (untuk isi yang dibuat lewat JavaScript) */
const HOOK_BAHASA = [];

/* ============================================================
   Teks antarmuka
   ============================================================ */

const TEKS = {
    /* ---------- Navigasi, footer, umum ---------- */
    "nav.beranda": ["Beranda", "Home", "ホーム", "首页", "Главная"],
    "nav.produk": ["Produk", "Products", "製品", "产品", "Товары"],
    "nav.pesan": ["Hitung pesanan", "Calculate order", "注文を計算", "计算订单", "Расчёт заказа"],
    "nav.faq": ["FAQ", "FAQ", "よくある質問", "常见问题", "Вопросы"],
    "nav.kontak": ["Kontak", "Contact", "お問い合わせ", "联系我们", "Контакты"],
    "nav.buka": ["Buka menu", "Open menu", "メニューを開く", "打开菜单", "Открыть меню"],
    "bahasa.label": ["Bahasa", "Language", "言語", "语言", "Язык"],
    "wa.chat": ["Chat WhatsApp", "Chat on WhatsApp", "WhatsAppでチャット", "WhatsApp 聊天", "Чат в WhatsApp"],

    "footer.deskripsi": [
        "Pengrajin dan eksportir produk rotan dari Cirebon, Jawa Barat. Cek stok, harga, ongkir, dan estimasi tiba langsung di website ini.",
        "Rattan craftsman and exporter from Cirebon, West Java. Check stock, prices, shipping costs, and estimated arrival right on this website.",
        "西ジャワ州チレボンの籐製品の職人・輸出業者です。在庫、価格、送料、到着予定日をこのウェブサイトですぐに確認できます。",
        "来自西爪哇井里汶的藤制品工匠与出口商。您可以直接在本网站查看库存、价格、运费和预计到达时间。",
        "Мастерская и экспортёр ротанговых изделий из Чиребона, Западная Ява. Проверяйте наличие, цены, стоимость доставки и ориентировочную дату прибытия прямо на сайте."
    ],
    "footer.menu": ["Menu", "Menu", "メニュー", "菜单", "Меню"],
    "footer.hubungi": ["Hubungi kami", "Contact us", "お問い合わせ", "联系我们", "Связаться с нами"],
    "footer.jam": [
        "Senin - Sabtu, 08.00 - 17.00",
        "Mon - Sat, 08:00 - 17:00",
        "月〜土 8:00〜17:00",
        "周一至周六 08:00 - 17:00",
        "Пн - Сб, 08:00 - 17:00"
    ],
    "footer.hak": [
        "© {y} Ridwan Rotan Cirebon. Seluruh hak dilindungi.",
        "© {y} Ridwan Rotan Cirebon. All rights reserved.",
        "© {y} Ridwan Rotan Cirebon. 無断転載を禁じます。",
        "© {y} Ridwan Rotan Cirebon. 版权所有。",
        "© {y} Ridwan Rotan Cirebon. Все права защищены."
    ],

    /* ---------- Judul dan deskripsi halaman ---------- */
    "judul.beranda": ["Beranda", "Home", "ホーム", "首页", "Главная"],
    "judul.produk": ["Produk", "Products", "製品", "产品", "Товары"],
    "judul.pesan": ["Hitung pesanan", "Calculate order", "注文を計算", "计算订单", "Расчёт заказа"],
    "judul.faq": ["FAQ", "FAQ", "よくある質問", "常见问题", "Вопросы и ответы"],
    "judul.kontak": ["Kontak", "Contact", "お問い合わせ", "联系我们", "Контакты"],

    "desc.beranda": [
        "Website resmi bisnis ekspor rotan Pak Ridwan di Cirebon. Cek stok, harga, ongkir, dan estimasi tiba.",
        "Official website of Pak Ridwan's rattan export business in Cirebon. Check stock, prices, shipping costs, and estimated arrival.",
        "チレボンにあるPak Ridwanの籐製品輸出ビジネスの公式サイト。在庫、価格、送料、到着予定日を確認できます。",
        "Pak Ridwan 在井里汶的藤制品出口业务官方网站。可查看库存、价格、运费和预计到达时间。",
        "Официальный сайт экспортного бизнеса Pak Ridwan по ротанговым изделиям в Чиребоне. Наличие, цены, доставка и ориентировочная дата прибытия."
    ],
    "desc.produk": [
        "Daftar produk rotan, varian, harga, dan stok dari Ridwan Rotan Cirebon.",
        "List of rattan products, variants, prices, and stock from Ridwan Rotan Cirebon.",
        "Ridwan Rotan Cirebon の籐製品、バリエーション、価格、在庫の一覧です。",
        "Ridwan Rotan Cirebon 的藤制品、款式、价格和库存列表。",
        "Список ротанговых изделий, вариантов, цен и наличия Ridwan Rotan Cirebon."
    ],
    "desc.pesan": [
        "Hitung total harga, ongkir, dan estimasi sampai pesanan rotan Anda.",
        "Calculate the total price, shipping cost, and estimated arrival of your rattan order.",
        "籐製品のご注文の合計金額、送料、到着予定日を計算します。",
        "计算您的藤制品订单的总价、运费和预计到达时间。",
        "Рассчитайте итоговую цену, стоимость доставки и ориентировочную дату прибытия вашего заказа."
    ],
    "desc.faq": [
        "Pertanyaan yang sering diajukan calon klien tentang stok, varian, harga, ongkir, dan estimasi sampai.",
        "Questions prospective clients often ask about stock, variants, prices, shipping costs, and estimated arrival.",
        "在庫、バリエーション、価格、送料、到着予定日について、お客様からよくいただくご質問です。",
        "潜在客户常问的关于库存、款式、价格、运费和预计到达时间的问题。",
        "Вопросы, которые чаще всего задают клиенты: наличие, варианты, цены, доставка и сроки."
    ],
    "desc.kontak": [
        "Hubungi Ridwan Rotan Cirebon untuk pesanan besar atau pertanyaan lain.",
        "Contact Ridwan Rotan Cirebon for large orders or other questions.",
        "大口のご注文やその他のご質問は Ridwan Rotan Cirebon までご連絡ください。",
        "大批量订单或其他问题，请联系 Ridwan Rotan Cirebon。",
        "Свяжитесь с Ridwan Rotan Cirebon по вопросам крупных заказов и другим вопросам."
    ],

    /* ---------- Beranda ---------- */
    "hero.judul": [
        "Rotan Cirebon, langsung dari pengrajin ke tujuan Anda.",
        "Cirebon rattan, straight from the craftsman to your destination.",
        "チレボンの籐製品を、職人から直接あなたのもとへ。",
        "井里汶藤制品，从工匠直达您的目的地。",
        "Ротан из Чиребона — прямо от мастера к вам."
    ],
    "hero.lead": [
        "Ridwan Rotan Cirebon mengekspor furnitur, anyaman, dan bahan baku rotan. Di sini Anda bisa mengecek stok, menghitung total harga, ongkir, dan estimasi tiba tanpa menunggu balasan chat.",
        "Ridwan Rotan Cirebon exports rattan furniture, woven goods, and raw materials. Here you can check stock and calculate the total price, shipping cost, and estimated arrival without waiting for a chat reply.",
        "Ridwan Rotan Cirebon は、籐の家具、編み製品、原材料を輸出しています。チャットの返信を待たずに、在庫の確認や、合計金額・送料・到着予定日の計算ができます。",
        "Ridwan Rotan Cirebon 出口藤制家具、编织品和藤原材料。您可以在这里查看库存，并计算总价、运费和预计到达时间，无需等待聊天回复。",
        "Ridwan Rotan Cirebon экспортирует ротанговую мебель, плетёные изделия и сырьё. Здесь вы можете проверить наличие и рассчитать итоговую цену, доставку и дату прибытия, не дожидаясь ответа в чате."
    ],
    "hero.tombol1": ["Hitung pesanan", "Calculate order", "注文を計算する", "计算订单", "Рассчитать заказ"],
    "hero.tombol2": ["Lihat produk", "View products", "製品を見る", "查看产品", "Смотреть товары"],
    "hero.ready": ["{n} varian ready stock", "{n} ready-stock variants", "在庫あり {n} バリエーション", "{n} 个现货款式", "{n} вариантов в наличии"],
    "hero.negara": ["{n} negara tujuan ekspor", "{n} export destination countries", "輸出先 {n} か国", "{n} 个出口目的国", "Стран экспорта: {n}"],

    "jawab.judul": [
        "Pertanyaan calon klien, jawabannya ada di sini",
        "Questions from prospective clients, answered here",
        "お客様からよくあるご質問への答えはこちら",
        "潜在客户的疑问，答案都在这里",
        "Вопросы клиентов — ответы здесь"
    ],
    "jawab.1.t": ["Apakah produk ready?", "Is the product in stock?", "商品は在庫がありますか？", "产品有现货吗？", "Товар в наличии?"],
    "jawab.1.s": ["Cek stok setiap varian", "Check stock for each variant", "各バリエーションの在庫を確認", "查看每个款式的库存", "Проверьте наличие каждого варианта"],
    "jawab.2.t": ["Apa saja variannya?", "What variants are available?", "どんなバリエーションがありますか？", "有哪些款式？", "Какие есть варианты?"],
    "jawab.2.s": ["Ukuran, warna, dan harganya", "Sizes, colors, and prices", "サイズ、色、価格", "尺寸、颜色和价格", "Размеры, цвета и цены"],
    "jawab.3.t": ["Berapa total harganya?", "What is the total price?", "合計金額はいくらですか？", "总价是多少？", "Какова итоговая цена?"],
    "jawab.3.s": [
        "Dihitung otomatis dari jumlah pesanan",
        "Calculated automatically from your order quantity",
        "注文数量から自動計算",
        "根据订购数量自动计算",
        "Считается автоматически по количеству"
    ],
    "jawab.4.t": ["Berapa biaya pengiriman?", "How much is shipping?", "送料はいくらですか？", "运费是多少？", "Сколько стоит доставка?"],
    "jawab.4.s": ["Pilih negara dan metode kirim", "Choose a country and shipping method", "国と配送方法を選択", "选择国家和运输方式", "Выберите страну и способ доставки"],
    "jawab.5.t": ["Berapa lama sampai?", "How long until it arrives?", "到着までどのくらいかかりますか？", "多久能到？", "Сколько идёт доставка?"],
    "jawab.5.s": ["Perkiraan tanggal tiba", "Estimated arrival date", "到着予定日の目安", "预计到达日期", "Ориентировочная дата прибытия"],

    "tentang.judul": ["Tentang bisnis kami", "About our business", "私たちについて", "关于我们", "О нашем бизнесе"],
    "tentang.p1": [
        "Kami berbasis di Cirebon, salah satu sentra kerajinan rotan terbesar di Indonesia. Pesanan kami kerjakan oleh pengrajin lokal, lalu dikemas dan dikirim ke pembeli di berbagai negara.",
        "We are based in Cirebon, one of the largest rattan craft centers in Indonesia. Orders are made by local craftsmen, then packed and shipped to buyers in many countries.",
        "私たちはインドネシア最大級の籐工芸の産地のひとつ、チレボンを拠点としています。ご注文の品は地元の職人が製作し、梱包して各国のお客様へお届けします。",
        "我们位于井里汶，这是印度尼西亚最大的藤编工艺中心之一。订单由当地工匠制作，然后包装并发送给各国买家。",
        "Мы находимся в Чиребоне — одном из крупнейших центров ротанговых промыслов Индонезии. Заказы изготавливают местные мастера, после чего товар упаковывается и отправляется покупателям в разные страны."
    ],
    "tentang.p2": [
        "Selama ini calon klien sering menanyakan hal yang sama lewat chat: stok, varian, harga, ongkir, dan lama pengiriman. Website ini dibuat agar semua jawabannya bisa dilihat langsung, kapan pun Anda butuh.",
        "Prospective clients often ask the same things over chat: stock, variants, prices, shipping costs, and delivery time. This website was made so all the answers are visible right away, whenever you need them.",
        "これまで、お客様からは在庫、バリエーション、価格、送料、配送期間など、同じご質問をチャットで何度もいただいていました。このウェブサイトは、いつでもすぐにそれらの答えをご覧いただけるように作られています。",
        "过去，潜在客户经常通过聊天询问相同的问题：库存、款式、价格、运费和运输时间。建立本网站是为了让您随时都能直接看到所有答案。",
        "Раньше потенциальные клиенты часто задавали в чате одни и те же вопросы: наличие, варианты, цены, стоимость и сроки доставки. Этот сайт создан для того, чтобы все ответы были доступны сразу, когда вам это нужно."
    ],
    "fitur.1.t": ["Dibuat pengrajin", "Handmade by craftsmen", "職人の手仕事", "工匠手工制作", "Работа мастеров"],
    "fitur.1.p": [
        "Anyaman rapi dengan rotan pilihan dari Cirebon.",
        "Neat weaving using selected rattan from Cirebon.",
        "チレボン産の厳選した籐で、丁寧に編み上げます。",
        "采用井里汶优质藤条，编织工整细致。",
        "Аккуратное плетение из отборного ротанга из Чиребона."
    ],
    "fitur.2.t": ["Stok terlihat", "Visible stock", "在庫を表示", "库存一目了然", "Наличие на виду"],
    "fitur.2.p": [
        "Status ready, terbatas, atau habis tampil per varian.",
        "Ready, limited, or sold-out status is shown for each variant.",
        "在庫あり・残りわずか・売り切れの状態をバリエーションごとに表示します。",
        "每个款式都会显示现货、库存有限或售罄状态。",
        "Статус «в наличии», «ограничено» или «нет в наличии» показан для каждого варианта."
    ],
    "fitur.3.t": ["Harga transparan", "Transparent pricing", "明朗な価格", "价格透明", "Прозрачные цены"],
    "fitur.3.p": [
        "Total dan ongkir dihitung otomatis sebelum Anda memesan.",
        "Total and shipping are calculated automatically before you order.",
        "ご注文前に合計金額と送料が自動で計算されます。",
        "下单前自动计算总价和运费。",
        "Итог и доставка рассчитываются автоматически до оформления заказа."
    ],
    "fitur.4.t": ["Kirim ke luar negeri", "Ships worldwide", "海外へ発送", "发往海外", "Доставка за рубеж"],
    "fitur.4.p": [
        "Lewat kapal laut atau pesawat sesuai kebutuhan.",
        "By sea or air freight, as you need.",
        "ご希望に応じて、船便または航空便でお送りします。",
        "可根据需要选择海运或空运。",
        "Морем или самолётом — на ваш выбор."
    ],

    "unggulan.judul": ["Produk unggulan", "Featured products", "人気製品", "热门产品", "Популярные товары"],
    "unggulan.sub": [
        "Tiga produk yang paling sering dipesan klien.",
        "The three products clients order most often.",
        "お客様に最も多くご注文いただいている3つの製品です。",
        "客户订购最多的三款产品。",
        "Три товара, которые клиенты заказывают чаще всего."
    ],
    "unggulan.semua": ["Semua produk", "All products", "すべての製品", "全部产品", "Все товары"],

    "cara.judul": ["Cara memesan", "How to order", "ご注文方法", "订购方式", "Как заказать"],
    "cara.sub": [
        "Empat langkah, tanpa perlu bertanya satu per satu.",
        "Four steps, no need to ask one by one.",
        "4つのステップで完了。ひとつずつ質問する必要はありません。",
        "四个步骤，无需逐个询问。",
        "Четыре шага — не нужно спрашивать по отдельности."
    ],
    "cara.1.t": ["Pilih produk dan varian", "Choose a product and variant", "製品とバリエーションを選ぶ", "选择产品和款式", "Выберите товар и вариант"],
    "cara.1.p": [
        "Tambahkan produk ke daftar pesanan. Jumlah dibatasi sesuai stok.",
        "Add products to your order list. Quantity is limited to available stock.",
        "製品を注文リストに追加します。数量は在庫数が上限です。",
        "将产品添加到订单列表。数量以库存为限。",
        "Добавьте товары в список заказа. Количество ограничено наличием на складе."
    ],
    "cara.2.t": [
        "Pilih tujuan dan metode kirim",
        "Choose destination and shipping method",
        "配送先と配送方法を選ぶ",
        "选择目的地和运输方式",
        "Выберите страну и способ доставки"
    ],
    "cara.2.p": [
        "Ongkir dan estimasi tiba menyesuaikan negara serta kapal laut atau pesawat.",
        "Shipping cost and estimated arrival depend on the country and on sea or air freight.",
        "送料と到着予定日は、配送先の国と船便・航空便によって変わります。",
        "运费和预计到达时间取决于国家以及海运或空运。",
        "Стоимость и срок доставки зависят от страны и от того, морем или самолётом."
    ],
    "cara.3.t": ["Periksa total pembayaran", "Review the total", "お支払い合計を確認", "核对应付总额", "Проверьте итоговую сумму"],
    "cara.3.p": [
        "Subtotal, ongkir, dan total muncul otomatis.",
        "Subtotal, shipping, and total appear automatically.",
        "小計、送料、合計が自動で表示されます。",
        "小计、运费和总额会自动显示。",
        "Подитог, доставка и итого отображаются автоматически."
    ],
    "cara.4.t": [
        "Kirim pesanan lewat WhatsApp",
        "Send your order via WhatsApp",
        "WhatsAppで注文を送る",
        "通过 WhatsApp 发送订单",
        "Отправьте заказ через WhatsApp"
    ],
    "cara.4.p": [
        "Ringkasan pesanan terisi sendiri, tinggal Anda kirim ke Pak Ridwan.",
        "The order summary is filled in for you; just send it to Pak Ridwan.",
        "注文内容は自動で入力されるので、Pak Ridwan に送信するだけです。",
        "订单摘要会自动填好，您只需发送给 Pak Ridwan。",
        "Сводка заказа заполняется сама — останется отправить её Pak Ridwan."
    ],

    "cta.judul": [
        "Siap menghitung pesanan Anda?",
        "Ready to calculate your order?",
        "注文の計算を始めますか？",
        "准备好计算您的订单了吗？",
        "Готовы рассчитать заказ?"
    ],
    "cta.p": [
        "Masukkan produk dan negara tujuan, lalu lihat total biayanya sekarang.",
        "Enter your products and destination country, then see the total cost now.",
        "製品と配送先の国を入力して、今すぐ合計金額をご確認ください。",
        "输入产品和目的国，立即查看总费用。",
        "Укажите товары и страну назначения и сразу узнайте итоговую стоимость."
    ],
    "cta.tombol": ["Mulai hitung pesanan", "Start calculating", "注文の計算を始める", "开始计算订单", "Начать расчёт заказа"],

    /* ---------- Produk ---------- */
    "produk.h1": ["Produk rotan", "Rattan products", "籐製品", "藤制产品", "Ротанговые изделия"],
    "produk.intro": [
        "Daftar produk beserta varian, harga, dan status stok. Klik Pesan pada varian yang ready untuk langsung menghitung pesanan.",
        "Products with their variants, prices, and stock status. Click Order on an available variant to calculate your order right away.",
        "製品とそのバリエーション、価格、在庫状況の一覧です。在庫のあるバリエーションの「注文」をクリックすると、すぐに注文を計算できます。",
        "产品及其款式、价格和库存状态一览。点击有货款式上的“订购”即可直接计算订单。",
        "Товары с вариантами, ценами и статусом наличия. Нажмите «Заказать» у доступного варианта, чтобы сразу рассчитать заказ."
    ],
    "cari.label": ["Cari produk", "Search products", "製品を検索", "搜索产品", "Поиск товаров"],
    "cari.ph": ["Contoh: kursi, keranjang", "e.g. chair, basket", "例: チェア、かご", "例如：藤椅、篮", "Например: стул, корзина"],
    "kategori.label": ["Kategori", "Category", "カテゴリー", "类别", "Категория"],
    "kategori.semua": ["Semua kategori", "All categories", "すべてのカテゴリー", "全部类别", "Все категории"],
    "hanya.ready": ["Hanya yang ready", "Only available", "在庫ありのみ", "仅显示有货", "Только в наличии"],
    "produk.kosong": [
        "Tidak ada produk yang cocok. Ubah kata kunci atau filter Anda.",
        "No matching products. Change your keyword or filters.",
        "一致する製品がありません。キーワードやフィルターを変更してください。",
        "没有匹配的产品。请更改关键词或筛选条件。",
        "Подходящих товаров нет. Измените запрос или фильтры."
    ],

    /* ---------- Tabel, badge, satuan ---------- */
    "tbl.varian": ["Varian", "Variant", "バリエーション", "款式", "Вариант"],
    "tbl.harga": ["Harga", "Price", "価格", "价格", "Цена"],
    "tbl.stok": ["Stok", "Stock", "在庫", "库存", "Наличие"],
    "tbl.pesan": ["Pesan", "Order", "注文", "订购", "Заказать"],
    "tbl.produk": ["Produk", "Product", "製品", "产品", "Товар"],
    "tbl.status": ["Status", "Status", "状態", "状态", "Статус"],
    "tbl.jumlah": ["Jumlah", "Quantity", "数量", "数量", "Кол-во"],
    "tbl.subtotal": ["Subtotal", "Subtotal", "小計", "小计", "Подитог"],
    "tbl.negara": ["Negara tujuan", "Destination country", "配送先の国", "目的国", "Страна назначения"],
    "tbl.laut.kg": ["Kapal laut / kg", "Sea freight / kg", "船便 / kg", "海运 / 公斤", "Морем / кг"],
    "tbl.udara.kg": ["Pesawat / kg", "Air freight / kg", "航空便 / kg", "空运 / 公斤", "Самолётом / кг"],
    "badge.habis": ["Habis", "Sold out", "売り切れ", "售罄", "Нет в наличии"],
    "badge.sisa": ["Sisa {n}", "{n} left", "残り {n}", "仅剩 {n}", "Осталось {n}"],
    "badge.ready": ["Ready", "In stock", "在庫あり", "现货", "В наличии"],
    "unit": ["{n} unit", "{n} units", "{n} 個", "{n} 件", "{n} шт."],
    "hari": ["{a}-{b} hari", "{a}-{b} days", "{a}〜{b} 日", "{a}-{b} 天", "{a}-{b} дн."],
    "metode.laut": ["Kapal laut", "Sea freight", "船便", "海运", "Морем"],
    "metode.udara": ["Pesawat udara", "Air freight", "航空便", "空运", "Самолётом"],

    /* ---------- Hitung pesanan ---------- */
    "pesan.intro": [
        "Pilih produk, tentukan negara tujuan, lalu lihat total harga, ongkir, dan estimasi tiba secara otomatis.",
        "Choose products, set your destination country, then see the total price, shipping, and estimated arrival automatically.",
        "製品を選び、配送先の国を指定すると、合計金額・送料・到着予定日が自動で表示されます。",
        "选择产品、确定目的国，即可自动查看总价、运费和预计到达时间。",
        "Выберите товары и страну назначения — итоговая цена, доставка и дата прибытия рассчитаются автоматически."
    ],
    "pesan.1": ["1. Pilih produk", "1. Choose products", "1. 製品を選ぶ", "1. 选择产品", "1. Выберите товары"],
    "pesan.jumlah": ["Jumlah (unit)", "Quantity (units)", "数量（個）", "数量（件）", "Количество (шт.)"],
    "pesan.tambah": ["Tambah ke pesanan", "Add to order", "注文に追加", "添加到订单", "Добавить в заказ"],
    "pesan.daftar": ["Daftar pesanan", "Order list", "注文リスト", "订单列表", "Список заказа"],
    "pesan.kosongkan": ["Kosongkan", "Clear all", "すべて削除", "清空", "Очистить"],
    "pesan.kosong": [
        "Belum ada produk. Pilih produk di atas lalu klik Tambah ke pesanan.",
        "No products yet. Choose a product above, then click Add to order.",
        "製品がまだありません。上で製品を選び、「注文に追加」をクリックしてください。",
        "还没有产品。请在上方选择产品，然后点击“添加到订单”。",
        "Товаров пока нет. Выберите товар выше и нажмите «Добавить в заказ»."
    ],
    "pesan.2": ["2. Tujuan dan pengiriman", "2. Destination and shipping", "2. 配送先と配送方法", "2. 目的地与运输", "2. Страна и доставка"],
    "pesan.negara": ["Negara tujuan", "Destination country", "配送先の国", "目的国", "Страна назначения"],
    "pesan.pilihnegara": ["Pilih negara tujuan", "Choose destination country", "配送先の国を選択", "选择目的国", "Выберите страну назначения"],
    "pesan.metode": ["Metode pengiriman", "Shipping method", "配送方法", "运输方式", "Способ доставки"],
    "pesan.laut": [
        "Kapal laut (lebih hemat, lebih lama)",
        "Sea freight (cheaper, slower)",
        "船便（経済的・日数は長め）",
        "海运（更省钱，耗时更长）",
        "Морем (дешевле, дольше)"
    ],
    "pesan.udara": [
        "Pesawat udara (lebih cepat, lebih mahal)",
        "Air freight (faster, more expensive)",
        "航空便（早い・割高）",
        "空运（更快，更贵）",
        "Самолётом (быстрее, дороже)"
    ],
    "pesan.3": ["3. Ringkasan biaya", "3. Cost summary", "3. 費用のまとめ", "3. 费用汇总", "3. Сводка расходов"],
    "ring.subtotal": ["Subtotal produk", "Product subtotal", "製品小計", "产品小计", "Подитог по товарам"],
    "ring.berat": ["Berat tagih", "Chargeable weight", "請求重量", "计费重量", "Расчётный вес"],
    "ring.ongkir": ["Ongkir", "Shipping", "送料", "运费", "Доставка"],
    "ring.total": ["Total", "Total", "合計", "总计", "Итого"],
    "ring.tarif.awal": ["Tambahkan produk terlebih dahulu.", "Add products first.", "まず製品を追加してください。", "请先添加产品。", "Сначала добавьте товары."],
    "ring.pilihtujuan": ["Pilih tujuan", "Choose destination", "配送先を選択", "选择目的地", "Выберите страну"],
    "ring.pilihtujuan.info": [
        "Pilih negara tujuan untuk melihat ongkir.",
        "Choose a destination country to see the shipping cost.",
        "配送先の国を選ぶと送料が表示されます。",
        "选择目的国即可查看运费。",
        "Выберите страну, чтобы увидеть стоимость доставки."
    ],
    "ring.tarif": [
        "{perkg} per kg, minimum {min}",
        "{perkg} per kg, minimum {min}",
        "1kgあたり {perkg}、最低料金 {min}",
        "每公斤 {perkg}，最低收费 {min}",
        "{perkg} за кг, минимум {min}"
    ],
    "ring.lama": [
        "{a}-{b} hari pengiriman + {p} hari persiapan",
        "{a}-{b} days shipping + {p} days preparation",
        "配送 {a}〜{b} 日 + 準備 {p} 日",
        "运输 {a}-{b} 天 + 备货 {p} 天",
        "доставка {a}-{b} дн. + подготовка {p} дн."
    ],
    "ring.estimasi": ["Perkiraan barang sampai", "Estimated arrival", "到着予定", "预计到达时间", "Ориентировочная дата прибытия"],
    "pesan.nama": ["Nama Anda", "Your name", "お名前", "您的姓名", "Ваше имя"],
    "pesan.catatan": ["Catatan (opsional)", "Notes (optional)", "備考（任意）", "备注（选填）", "Примечание (необязательно)"],
    "pesan.btnwa": [
        "Kirim pesanan lewat WhatsApp",
        "Send order via WhatsApp",
        "WhatsAppで注文を送信",
        "通过 WhatsApp 发送订单",
        "Отправить заказ через WhatsApp"
    ],

    "info.habis": [
        "Semua varian produk ini sedang habis.",
        "All variants of this product are currently sold out.",
        "この製品のバリエーションはすべて売り切れです。",
        "该产品的所有款式目前均已售罄。",
        "Все варианты этого товара сейчас распроданы."
    ],
    "info.sisa": ["Sisa yang bisa dipesan: {n}", "Available to order: {n}", "注文可能な数量: {n}", "可订购数量：{n}", "Доступно для заказа: {n}"],
    "info.harga": [
        "Harga {harga} per unit, berat {berat} kg per unit",
        "Price {harga} per unit, weight {berat} kg per unit",
        "1個あたりの価格 {harga}、重量 {berat} kg",
        "单价 {harga}，每件重 {berat} 公斤",
        "Цена {harga} за шт., вес {berat} кг за шт."
    ],
    "opt.habis": ["(habis)", "(sold out)", "（売り切れ）", "（售罄）", "(нет в наличии)"],
    "aria.ubah": ["Ubah jumlah", "Change quantity", "数量を変更", "更改数量", "Изменить количество"],
    "aria.kurang": ["Kurangi", "Decrease", "減らす", "减少", "Уменьшить"],
    "aria.tambah": ["Tambah", "Increase", "増やす", "增加", "Увеличить"],
    "aria.hapus": ["Hapus", "Remove", "削除", "删除", "Удалить"],

    "msg.habis": [
        "Varian ini sedang habis. Pilih varian lain yang ready.",
        "This variant is sold out. Please choose another available variant.",
        "このバリエーションは売り切れです。在庫のある別のバリエーションを選んでください。",
        "该款式已售罄，请选择其他有货款式。",
        "Этот вариант распродан. Выберите другой вариант в наличии."
    ],
    "msg.jumlah": [
        "Jumlah harus berupa bilangan bulat minimal 1.",
        "Quantity must be a whole number of at least 1.",
        "数量は1以上の整数で入力してください。",
        "数量必须是不小于 1 的整数。",
        "Количество должно быть целым числом не менее 1."
    ],
    "msg.stok": [
        "Stok {p} ({v}) hanya {s} unit. Di daftar pesanan sudah ada {a} unit.",
        "Stock for {p} ({v}) is only {s} units. There are already {a} units in your order list.",
        "{p}（{v}）の在庫は {s} 個のみです。注文リストにはすでに {a} 個あります。",
        "{p}（{v}）的库存仅有 {s} 件，订单列表中已有 {a} 件。",
        "Остаток {p} ({v}) — всего {s} шт. В списке заказа уже {a} шт."
    ],
    "msg.ditambah": [
        "{p} ({v}) x {j} ditambahkan.",
        "{p} ({v}) x {j} added.",
        "{p}（{v}）× {j} を追加しました。",
        "已添加 {p}（{v}）x {j}。",
        "Добавлено: {p} ({v}) x {j}."
    ],
    "msg.maks": [
        "Jumlah sudah mencapai stok yang tersedia ({s} unit).",
        "Quantity has reached the available stock ({s} units).",
        "数量が在庫数（{s} 個）に達しました。",
        "数量已达到可用库存（{s} 件）。",
        "Количество достигло имеющегося запаса ({s} шт.)."
    ],
    "wa.kosong": ["Daftar pesanan masih kosong.", "Your order list is still empty.", "注文リストが空です。", "订单列表仍为空。", "Список заказа пуст."],
    "wa.tujuan": [
        "Pilih negara tujuan terlebih dahulu.",
        "Please choose a destination country first.",
        "先に配送先の国を選んでください。",
        "请先选择目的国。",
        "Сначала выберите страну назначения."
    ],
    "wa.nama": [
        "Isi nama Anda terlebih dahulu.",
        "Please enter your name first.",
        "先にお名前を入力してください。",
        "请先填写您的姓名。",
        "Сначала введите ваше имя."
    ],

    /* ---------- FAQ ---------- */
    "faq.h1": [
        "Pertanyaan yang sering diajukan",
        "Frequently asked questions",
        "よくあるご質問",
        "常见问题",
        "Часто задаваемые вопросы"
    ],
    "faq.intro": [
        "Jawaban untuk hal-hal yang paling sering ditanyakan calon klien: stok, varian, harga, ongkir, dan lama pengiriman.",
        "Answers to what prospective clients ask most: stock, variants, prices, shipping costs, and delivery time.",
        "お客様から最も多く寄せられる在庫、バリエーション、価格、送料、配送期間についての回答です。",
        "解答潜在客户最常询问的问题：库存、款式、价格、运费和运输时间。",
        "Ответы на самые частые вопросы клиентов: наличие, варианты, цены, стоимость и сроки доставки."
    ],
    "faq.cari.label": ["Cari pertanyaan", "Search questions", "質問を検索", "搜索问题", "Поиск вопросов"],
    "faq.cari.ph": [
        "Contoh: ongkir, stok, estimasi",
        "e.g. shipping, stock, estimate",
        "例: 送料、在庫、到着",
        "例如：运费、库存、预计",
        "Например: доставка, цена, срок"
    ],
    "faq.kosong": [
        `Pertanyaan tidak ditemukan. Silakan <a href="#kontak">hubungi kami</a> langsung.`,
        `No questions found. Please <a href="#kontak">contact us</a> directly.`,
        `該当する質問が見つかりません。<a href="#kontak">こちら</a>から直接お問い合わせください。`,
        `未找到相关问题。请直接<a href="#kontak">联系我们</a>。`,
        `Вопросы не найдены. Пожалуйста, <a href="#kontak">свяжитесь с нами</a> напрямую.`
    ],
    "faq.lain": ["Masih ada pertanyaan lain?", "Still have other questions?", "ほかにご質問はありますか？", "还有其他问题吗？", "Остались вопросы?"],
    "faq.tanyawa": ["Tanya lewat WhatsApp", "Ask via WhatsApp", "WhatsAppで質問する", "通过 WhatsApp 咨询", "Спросить в WhatsApp"],

    "faq.q1": ["Apakah produknya ready?", "Is the product in stock?", "商品は在庫がありますか？", "产品有库存吗？", "Есть ли товар в наличии?"],
    "faq.a1": [
        `Sebagian besar produk kami ready stock. Status di bawah mengikuti data stok terbaru. Varian berlabel <em>Habis</em> bisa dipesan lewat WhatsApp untuk produksi ulang.`,
        `Most of our products are ready stock. The status below follows the latest stock data. Variants labeled <em>Sold out</em> can be ordered via WhatsApp for re-production.`,
        `ほとんどの製品は在庫がございます。以下の状況は最新の在庫データに基づいています。<em>売り切れ</em>と表示されているバリエーションは、WhatsAppで再生産のご注文を承ります。`,
        `我们的大部分产品都有现货。下方状态依据最新库存数据。标有<em>售罄</em>的款式可通过 WhatsApp 下单，安排重新生产。`,
        `Большая часть товаров есть в наличии. Статус ниже соответствует актуальным данным по складу. Варианты с пометкой <em>Нет в наличии</em> можно заказать через WhatsApp для повторного производства.`
    ],
    "faq.q2": [
        "Produknya apa saja dan apa saja variannya?",
        "What products do you sell, and what are the variants?",
        "どんな製品があり、どんなバリエーションがありますか？",
        "有哪些产品，各有哪些款式？",
        "Какие у вас товары и какие есть варианты?"
    ],
    "faq.a2.intro": [
        "Kami menjual furnitur, anyaman, dekorasi, dan bahan baku rotan:",
        "We sell rattan furniture, woven goods, decor, and raw materials:",
        "籐の家具、編み製品、インテリア雑貨、原材料を扱っています。",
        "我们销售藤制家具、编织品、装饰品和藤原材料：",
        "Мы продаём ротанговую мебель, плетёные изделия, декор и сырьё:"
    ],
    "faq.a2.outro": [
        `Lihat foto dan harga lengkap di halaman <a href="#produk">Produk</a>.`,
        `See the full photos and prices on the <a href="#produk">Products</a> page.`,
        `写真と全価格は<a href="#produk">製品</a>ページでご覧いただけます。`,
        `完整照片和价格请见<a href="#produk">产品</a>页面。`,
        `Полные фото и цены смотрите на странице <a href="#produk">«Товары»</a>.`
    ],
    "faq.q3": ["Berapa total harganya?", "What is the total price?", "合計金額はいくらですか？", "总价是多少？", "Какова итоговая цена?"],
    "faq.a3.p1": [
        `Total harga = harga varian x jumlah, ditambah ongkir. Anda tidak perlu menghitung sendiri: pilih produk, varian, dan jumlah di halaman <a href="#pesan">Hitung Pesanan</a>, maka subtotal dan total langsung muncul.`,
        `Total price = variant price x quantity, plus shipping. You don't need to calculate it yourself: choose the product, variant, and quantity on the <a href="#pesan">Calculate Order</a> page, and the subtotal and total appear instantly.`,
        `合計金額 = バリエーションの価格 × 数量 + 送料です。ご自身で計算する必要はありません。<a href="#pesan">注文を計算</a>ページで製品・バリエーション・数量を選ぶと、小計と合計がすぐに表示されます。`,
        `总价 = 款式单价 x 数量 + 运费。您无需自己计算：在<a href="#pesan">计算订单</a>页面选择产品、款式和数量，小计和总价就会立即显示。`,
        `Итоговая цена = цена варианта × количество + доставка. Считать самостоятельно не нужно: выберите товар, вариант и количество на странице <a href="#pesan">«Расчёт заказа»</a>, и подитог и итог появятся сразу.`
    ],
    "faq.a3.p2": [
        "Contoh: 10 Keranjang Anyaman ukuran Sedang = 10 x {a} = {b} sebelum ongkir.",
        "Example: 10 Woven Baskets, Medium size = 10 x {a} = {b} before shipping.",
        "例: 編みかご（中）10個 = 10 × {a} = {b}（送料別）。",
        "例如：10 个中号藤编篮 = 10 x {a} = {b}（未含运费）。",
        "Пример: 10 плетёных корзин среднего размера = 10 x {a} = {b} без учёта доставки."
    ],
    "faq.q4": ["Berapa biaya pengirimannya?", "How much does shipping cost?", "送料はいくらですか？", "运费是多少？", "Сколько стоит доставка?"],
    "faq.a4": [
        "Ongkir dihitung dari berat total (dibulatkan ke atas per kg) dikali tarif negara tujuan. Ada biaya minimum per pengiriman. Tarif per kilogram:",
        "Shipping is calculated from total weight (rounded up to the next kg) multiplied by the destination country's rate. There is a minimum charge per shipment. Rates per kilogram:",
        "送料は、総重量（1kg単位で切り上げ）に配送先の国の料金を掛けて計算します。1回の発送ごとに最低料金があります。1kgあたりの料金：",
        "运费按总重量（向上取整到整公斤）乘以目的国费率计算。每次发货设有最低收费。每公斤费率：",
        "Стоимость доставки считается как общий вес (с округлением вверх до целого кг), умноженный на тариф страны назначения. Для каждой отправки действует минимальная плата. Тарифы за килограмм:"
    ],
    "faq.q5": [
        "Berapa lama perkiraan barang sampai?",
        "What is the estimated arrival time?",
        "到着までの目安はどのくらいですか？",
        "预计多久能到货？",
        "Каков ориентировочный срок доставки?"
    ],
    "faq.a5.intro": [
        "Estimasi dihitung dari {p} hari persiapan (packing dan dokumen ekspor) ditambah lama pengiriman:",
        "The estimate is based on {p} days of preparation (packing and export documents) plus shipping time:",
        "目安は、準備期間 {p} 日（梱包と輸出書類の手配）に配送期間を加えて計算しています。",
        "预计时间按 {p} 天备货期（包装和出口文件）加上运输时间计算：",
        "Срок рассчитывается как {p} дн. подготовки (упаковка и экспортные документы) плюс время доставки:"
    ],
    "faq.a5.outro": [
        "Tanggal tiba yang spesifik muncul otomatis di halaman Hitung Pesanan.",
        "The specific arrival date appears automatically on the Calculate Order page.",
        "具体的な到着予定日は「注文を計算」ページに自動で表示されます。",
        "具体的到达日期会自动显示在“计算订单”页面。",
        "Конкретная дата прибытия автоматически показывается на странице «Расчёт заказа»."
    ],
    "faq.q6": ["Bagaimana cara memesan?", "How do I place an order?", "どのように注文しますか？", "如何下单？", "Как сделать заказ?"],
    "faq.a6.1": [
        "Buka halaman Hitung Pesanan dan tambahkan produk yang diinginkan.",
        "Open the Calculate Order page and add the products you want.",
        "「注文を計算」ページを開き、ご希望の製品を追加します。",
        "打开“计算订单”页面并添加所需产品。",
        "Откройте страницу «Расчёт заказа» и добавьте нужные товары."
    ],
    "faq.a6.2": [
        "Pilih negara tujuan dan metode pengiriman.",
        "Choose the destination country and shipping method.",
        "配送先の国と配送方法を選びます。",
        "选择目的国和运输方式。",
        "Выберите страну назначения и способ доставки."
    ],
    "faq.a6.3": [
        "Periksa total harga, ongkir, dan estimasi tiba.",
        "Check the total price, shipping, and estimated arrival.",
        "合計金額、送料、到着予定日を確認します。",
        "核对总价、运费和预计到达时间。",
        "Проверьте итоговую цену, доставку и дату прибытия."
    ],
    "faq.a6.4": [
        "Klik tombol WhatsApp untuk mengirim ringkasan pesanan ke {pemilik}.",
        "Click the WhatsApp button to send the order summary to {pemilik}.",
        "WhatsAppボタンをクリックして、注文内容を {pemilik} に送信します。",
        "点击 WhatsApp 按钮，将订单摘要发送给 {pemilik}。",
        "Нажмите кнопку WhatsApp, чтобы отправить сводку заказа {pemilik}."
    ],
    "faq.q7": [
        "Bagaimana pembayaran dan kemasannya?",
        "How do payment and packaging work?",
        "お支払いと梱包はどうなりますか？",
        "付款和包装是怎样的？",
        "Как происходят оплата и упаковка?"
    ],
    "faq.a7.p1": [
        "Pembayaran lewat transfer bank: uang muka 50% saat pesanan dikonfirmasi dan pelunasan sebelum barang dikirim.",
        "Payment is by bank transfer: a 50% down payment when the order is confirmed, and the balance before the goods are shipped.",
        "お支払いは銀行振込です。ご注文確定時に前払金50%、残金は出荷前にお支払いいただきます。",
        "付款方式为银行转账：订单确认时支付 50% 定金，发货前付清余款。",
        "Оплата банковским переводом: предоплата 50% при подтверждении заказа и доплата перед отправкой товара."
    ],
    "faq.a7.p2": [
        "Barang dikemas kardus berlapis dan, untuk furnitur, diperkuat rangka kayu agar aman selama pengiriman ekspor.",
        "Goods are packed in multi-layer cartons and, for furniture, reinforced with a wooden frame to stay safe during export shipping.",
        "商品は多層の段ボールで梱包し、家具は木枠で補強して、輸出輸送中も安全にお届けします。",
        "货物使用多层纸箱包装，家具另加木架加固，确保出口运输途中安全。",
        "Товар упаковывается в многослойные картонные коробки, а мебель дополнительно усиливается деревянной обрешёткой для безопасной экспортной перевозки."
    ],
    "faq.q8": [
        "Apakah bisa memesan dalam jumlah besar atau model khusus?",
        "Can I order in large quantities or request custom models?",
        "大量注文やオーダーメイドにも対応できますか？",
        "可以大批量订购或定制特殊款式吗？",
        "Можно ли заказать большую партию или особую модель?"
    ],
    "faq.a8": [
        "Bisa. Untuk jumlah besar, ukuran khusus, atau warna di luar daftar, hubungi kami lewat WhatsApp di {telp} agar harga dan waktu produksi dapat disesuaikan.",
        "Yes. For large quantities, custom sizes, or colors not on the list, contact us via WhatsApp at {telp} so the price and production time can be adjusted.",
        "はい、可能です。大量注文、特別サイズ、リストにない色をご希望の場合は、WhatsApp（{telp}）までご連絡ください。価格と製作期間を調整いたします。",
        "可以。如需大批量、特殊尺寸或清单以外的颜色，请通过 WhatsApp（{telp}）联系我们，以便调整价格和生产时间。",
        "Да. Для больших партий, нестандартных размеров или цветов вне списка свяжитесь с нами в WhatsApp по номеру {telp} — мы согласуем цену и срок производства."
    ],

    /* ---------- Kontak ---------- */
    "kontak.intro": [
        "Untuk pesanan besar, model khusus, atau pertanyaan lain, kirim pesan langsung ke Pak Ridwan.",
        "For large orders, custom models, or other questions, send a message directly to Pak Ridwan.",
        "大口のご注文、オーダーメイド、その他のご質問は、Pak Ridwan に直接メッセージをお送りください。",
        "如需大批量订单、定制款式或有其他问题，请直接给 Pak Ridwan 发消息。",
        "По вопросам крупных заказов, особых моделей и другим вопросам напишите напрямую Pak Ridwan."
    ],
    "kontak.info": ["Informasi bisnis", "Business information", "事業者情報", "商家信息", "Информация о компании"],
    "kontak.pemilik": ["Pemilik", "Owner", "オーナー", "店主", "Владелец"],
    "kontak.alamat": ["Alamat", "Address", "住所", "地址", "Адрес"],
    "kontak.jamkerja": ["Jam kerja", "Business hours", "営業時間", "营业时间", "Часы работы"],
    "kontak.jam.val": [
        "Senin - Sabtu, 08.00 - 17.00 WIB",
        "Mon - Sat, 08:00 - 17:00 WIB (UTC+7)",
        "月〜土 8:00〜17:00 WIB（UTC+7）",
        "周一至周六 08:00 - 17:00 WIB（UTC+7）",
        "Пн - Сб, 08:00 - 17:00 WIB (UTC+7)"
    ],
    "kontak.kirim": ["Kirim pesan", "Send a message", "メッセージを送る", "发送消息", "Отправить сообщение"],
    "kontak.nama": ["Nama", "Name", "お名前", "姓名", "Имя"],
    "kontak.topik": ["Topik", "Topic", "件名", "主题", "Тема"],
    "topik.1": ["Pertanyaan produk", "Product question", "製品に関する質問", "产品咨询", "Вопрос о товаре"],
    "topik.2": ["Pesanan jumlah besar", "Large order", "大口注文", "大批量订单", "Крупный заказ"],
    "topik.3": ["Model atau ukuran khusus", "Custom model or size", "特注モデル・特別サイズ", "定制款式或尺寸", "Особая модель или размер"],
    "topik.4": [
        "Kerja sama distributor",
        "Distributor partnership",
        "ディストリビューター提携",
        "经销商合作",
        "Сотрудничество в качестве дистрибьютора"
    ],
    "kontak.pesan": ["Pesan", "Message", "メッセージ", "消息内容", "Сообщение"],
    "kontak.btn": ["Kirim lewat WhatsApp", "Send via WhatsApp", "WhatsAppで送信", "通过 WhatsApp 发送", "Отправить через WhatsApp"],
    "kontak.wajib": [
        "Nama dan pesan wajib diisi.",
        "Name and message are required.",
        "お名前とメッセージは必須です。",
        "姓名和消息内容为必填项。",
        "Имя и сообщение обязательны для заполнения."
    ]
};

/* ============================================================
   Terjemahan data produk, varian, kategori, dan negara
   (data aslinya ada di data.js dan tetap berbahasa Indonesia)
   ============================================================ */

const TERJEMAH_PRODUK = {
    "kursi-rotan": {
        nama: ["Kursi Rotan Natural", "Natural Rattan Chair", "ナチュラル籐チェア", "原色藤椅", "Стул из натурального ротанга"],
        deskripsi: [
            "Kursi anyaman rotan dengan rangka kuat, nyaman untuk ruang tamu, teras, dan kafe.",
            "Woven rattan chair with a sturdy frame, comfortable for living rooms, patios, and cafes.",
            "頑丈なフレームの籐編みチェア。リビング、テラス、カフェに最適な座り心地です。",
            "结实框架的藤编椅，适合客厅、露台和咖啡馆，坐感舒适。",
            "Плетёный ротанговый стул с прочным каркасом — удобен для гостиной, террасы и кафе."
        ]
    },
    "meja-bundar": {
        nama: ["Meja Rotan Bundar", "Round Rattan Table", "丸型籐テーブル", "圆形藤桌", "Круглый ротанговый стол"],
        deskripsi: [
            "Meja bundar berkaki rotan dengan permukaan rata, cocok untuk ruang santai.",
            "Round table with rattan legs and a flat surface, ideal for relaxed spaces.",
            "籐の脚と平らな天板を備えた丸型テーブル。くつろぎの空間にぴったりです。",
            "带藤制桌腿和平整桌面的圆桌，适合休闲空间。",
            "Круглый стол на ротанговых ножках с ровной столешницей — подходит для зон отдыха."
        ]
    },
    "keranjang-anyam": {
        nama: ["Keranjang Anyaman", "Woven Basket", "編みかご", "藤编篮", "Плетёная корзина"],
        deskripsi: [
            "Keranjang serbaguna untuk pakaian, mainan, atau penyimpanan. Tepi dirapikan dan halus.",
            "Versatile basket for clothes, toys, or storage. The edges are finished and smooth.",
            "衣類やおもちゃ、収納に使える万能かご。縁は丁寧に仕上げられ、なめらかです。",
            "适用于衣物、玩具或收纳的多用途篮子。边缘经过修整，光滑细腻。",
            "Универсальная корзина для одежды, игрушек и хранения. Края аккуратно обработаны и гладкие."
        ]
    },
    "tikar-rotan": {
        nama: ["Tikar Rotan", "Rattan Mat", "籐マット", "藤席", "Ротанговый коврик"],
        deskripsi: [
            "Tikar anyaman rotan tipis untuk lantai atau dekorasi dinding bergaya tropis.",
            "Thin woven rattan mat for floors or tropical-style wall decoration.",
            "床や、トロピカルスタイルの壁面装飾に使える薄手の籐編みマット。",
            "可用于地面或热带风格墙面装饰的薄款藤编席。",
            "Тонкий плетёный ротанговый коврик для пола или декора стен в тропическом стиле."
        ]
    },
    "lampu-gantung": {
        nama: ["Lampu Gantung Rotan", "Rattan Pendant Lamp", "籐ペンダントランプ", "藤编吊灯", "Ротанговый подвесной светильник"],
        deskripsi: [
            "Kap lampu gantung dari anyaman rotan yang memberi cahaya hangat. Fitting tidak termasuk.",
            "Woven rattan pendant lampshade that gives a warm glow. Fitting not included.",
            "温かな光を生み出す籐編みのペンダントランプシェード。ソケットは含まれません。",
            "藤编吊灯灯罩，带来温暖光线。不含灯头配件。",
            "Подвесной абажур из плетёного ротанга дарит тёплый свет. Патрон в комплект не входит."
        ]
    },
    "rotan-mentah": {
        nama: ["Batang Rotan Mentah", "Raw Rattan Poles", "未加工の籐（丸棒）", "原藤杆", "Необработанные стебли ротанга"],
        deskripsi: [
            "Batang rotan kering untuk bahan baku produsen furnitur. Dijual per bundel 50 kg.",
            "Dried rattan poles as raw material for furniture makers. Sold per 50 kg bundle.",
            "家具メーカー向けの原材料となる乾燥籐の丸棒。50kgの束単位で販売します。",
            "供家具制造商使用的干藤原料杆，按 50 公斤一捆出售。",
            "Сухие стебли ротанга как сырьё для производителей мебели. Продаются связками по 50 кг."
        ]
    }
};

const TERJEMAH_KATEGORI = {
    "Furnitur": ["Furnitur", "Furniture", "家具", "家具", "Мебель"],
    "Anyaman": ["Anyaman", "Woven goods", "編み製品", "编织品", "Плетёные изделия"],
    "Dekorasi": ["Dekorasi", "Decor", "インテリア雑貨", "装饰品", "Декор"],
    "Bahan baku": ["Bahan baku", "Raw materials", "原材料", "原材料", "Сырьё"]
};

const TERJEMAH_VARIAN = {
    "Natural": ["Natural", "Natural", "ナチュラル", "原色", "Натуральный"],
    "Honey Brown": ["Honey Brown", "Honey Brown", "ハニーブラウン", "蜂蜜棕", "Медово-коричневый"],
    "Hitam": ["Hitam", "Black", "ブラック", "黑色", "Чёрный"],
    "Kecil": ["Kecil", "Small", "小", "小号", "Малая"],
    "Sedang": ["Sedang", "Medium", "中", "中号", "Средняя"],
    "Besar": ["Besar", "Large", "大", "大号", "Большая"]
};

const AWALAN_DIAMETER = ["Diameter ", "Diameter ", "直径 ", "直径 ", "Диаметр "];

const TERJEMAH_NEGARA = {
    sg: ["Singapura", "Singapore", "シンガポール", "新加坡", "Сингапур"],
    my: ["Malaysia", "Malaysia", "マレーシア", "马来西亚", "Малайзия"],
    jp: ["Jepang", "Japan", "日本", "日本", "Япония"],
    kr: ["Korea Selatan", "South Korea", "韓国", "韩国", "Южная Корея"],
    au: ["Australia", "Australia", "オーストラリア", "澳大利亚", "Австралия"],
    ae: ["Uni Emirat Arab", "United Arab Emirates", "アラブ首長国連邦", "阿拉伯联合酋长国", "Объединённые Арабские Эмираты"],
    sa: ["Arab Saudi", "Saudi Arabia", "サウジアラビア", "沙特阿拉伯", "Саудовская Аравия"],
    nl: ["Belanda", "Netherlands", "オランダ", "荷兰", "Нидерланды"],
    de: ["Jerman", "Germany", "ドイツ", "德国", "Германия"],
    us: ["Amerika Serikat", "United States", "アメリカ合衆国", "美国", "США"]
};

/* ============================================================
   Fungsi penerjemah
   ============================================================ */

function pilihTeks(larik, bahasa) {
    const indeks = URUTAN_BAHASA.indexOf(bahasa || bahasaAktif);
    const isi = larik[indeks < 0 ? 0 : indeks];
    return (isi === undefined || isi === "") ? larik[0] : isi;
}

/* Ambil teks sesuai bahasa aktif. Parameter {nama} diganti dari objek param. */
function tr(kunci, param, bahasa) {
    const entri = TEKS[kunci];
    if (!entri) { return kunci; }
    const nilai = Object.assign({ y: new Date().getFullYear() }, param || {});
    return pilihTeks(entri, bahasa).replace(/\{(\w+)\}/g, function (cocok, nama) {
        return Object.prototype.hasOwnProperty.call(nilai, nama) ? nilai[nama] : cocok;
    });
}

function namaProduk(produk, bahasa) {
    if ((bahasa || bahasaAktif) === "id" || !TERJEMAH_PRODUK[produk.id]) { return produk.nama; }
    return pilihTeks(TERJEMAH_PRODUK[produk.id].nama, bahasa);
}

function deskripsiProduk(produk, bahasa) {
    if ((bahasa || bahasaAktif) === "id" || !TERJEMAH_PRODUK[produk.id]) { return produk.deskripsi; }
    return pilihTeks(TERJEMAH_PRODUK[produk.id].deskripsi, bahasa);
}

function namaKategori(kategori, bahasa) {
    if ((bahasa || bahasaAktif) === "id" || !TERJEMAH_KATEGORI[kategori]) { return kategori; }
    return pilihTeks(TERJEMAH_KATEGORI[kategori], bahasa);
}

function namaVarian(varian, bahasa) {
    if ((bahasa || bahasaAktif) === "id") { return varian.nama; }
    const diameter = /^Diameter (.+)$/.exec(varian.nama);
    if (diameter) { return pilihTeks(AWALAN_DIAMETER, bahasa) + diameter[1]; }
    if (TERJEMAH_VARIAN[varian.nama]) { return pilihTeks(TERJEMAH_VARIAN[varian.nama], bahasa); }
    return varian.nama;
}

function namaNegara(tujuan, bahasa) {
    if ((bahasa || bahasaAktif) === "id" || !TERJEMAH_NEGARA[tujuan.id]) { return tujuan.negara; }
    return pilihTeks(TERJEMAH_NEGARA[tujuan.id], bahasa);
}

/* ============================================================
   Menerapkan dan mengganti bahasa
   ============================================================ */

function bacaBahasaTersimpan() {
    try {
        const tersimpan = window.localStorage.getItem(KUNCI_SIMPAN);
        if (URUTAN_BAHASA.indexOf(tersimpan) !== -1) { return tersimpan; }
    } catch (e) { /* penyimpanan browser tidak tersedia: pakai bahasa bawaan */ }
    return "id";
}

function simpanBahasa(kode) {
    try {
        window.localStorage.setItem(KUNCI_SIMPAN, kode);
    } catch (e) { /* abaikan: bahasa tetap berlaku untuk halaman ini */ }
}

/* Teks tetap di HTML: ditandai atribut data-i18n, data-i18n-html, data-i18n-placeholder, data-i18n-aria-label */
function terapkanTeksTetap() {
    document.documentElement.lang = KODE_HTML[bahasaAktif];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        el.textContent = tr(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
        el.innerHTML = tr(el.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        el.setAttribute("placeholder", tr(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
        el.setAttribute("aria-label", tr(el.dataset.i18nAriaLabel));
    });

    const halaman = document.body.dataset.halaman;
    if (halaman && TEKS["judul." + halaman]) {
        document.title = tr("judul." + halaman) + " | " + NAMA_SITUS;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) { meta.setAttribute("content", tr("desc." + halaman)); }
    }
}

function setBahasa(kode) {
    if (URUTAN_BAHASA.indexOf(kode) === -1) { return; }
    bahasaAktif = kode;
    simpanBahasa(kode);
    terapkanTeksTetap();
    HOOK_BAHASA.forEach(function (fungsi) { fungsi(); });
}

function inisialisasiBahasa() {
    bahasaAktif = bacaBahasaTersimpan();
    const pilih = document.getElementById("pilihBahasa");
    if (pilih) {
        pilih.value = bahasaAktif;
        pilih.addEventListener("change", function () { setBahasa(pilih.value); });
    }
    terapkanTeksTetap();
}

