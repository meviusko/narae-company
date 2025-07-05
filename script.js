// 전역 변수
let currentSlide = 0;

console.log('script.js 로드됨');

// Google 로그인 함수


// 전역 함수 정의
window.toggleProducts = function(card, type) {
  console.log('toggleProducts 호출됨:', type);
  const existingGrid = card.nextElementSibling;
  
  if (existingGrid && existingGrid.classList.contains('product-grid')) {
    existingGrid.remove();
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'product-grid';

  let html = "";

  if (type === 'melaxin') {
    const products = [
      { 
        img: 'img/206444_410774_554-removebg-preview.png', 
        name: 'BonDex Clinic', 
        originalPrice: 'Борлуулалтын үнэ 98,800 вон',
        discountPrice: 'Хямдралтай үнэ 39,800 вон'
      },
      { 
        img: 'img/6128d637a82c2c472bba840d58a7c788-removebg-preview.png', 
        name: 'EyePhalt', 
        originalPrice: 'Борлуулалтын үнэ 99,000 вон',
        discountPrice: 'Хямдралтай үнэ 59,000 вон'
      },
      { img: 'img/astax_image1.png', name: 'Astaxanthin', price: '' },
      { img: 'img/dr.melaxin_dubai_peptide.png', name: 'Dubai Peptide', price: '' }
    ];
    products.forEach((p) => {
      html += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <div class="product-title">
          <span class="product-name">${p.name}</span>
          <span class="product-price">${p.price || ''}</span>
        </div>
        <p class="view-toggle" onclick="openModal('${p.img}', '${p.name}', '${p.originalPrice || ''}', '${p.discountPrice || ''}')">View</p>
      </div>`;
    });
  } else if (type === 'altist') {
    const products = [
      { 
        img: 'img/ww2.png', 
        name: 'Magic Wave', 
        originalPrice: '',
        discountPrice: '',
        modalType: 'magicwave' 
      },
      { 
        img: 'img/ee1.png', 
        name: 'New Product', 
        originalPrice: '',
        discountPrice: '',
        modalType: 'newproduct' 
      },
      { 
        img: 'img/m2.jpg', 
        name: 'Magic Wave Auto Curling Iron', 
        originalPrice: 'Борлуулалтын үнэ 89,000 вон',
        discountPrice: 'Хямдралтай үнэ 59,000 вон'
      },
      { 
        img: 'img/l3.jpg', 
        name: 'Glam&Magic Cordless Hair Styler ion-max', 
        originalPrice: 'Борлуулалтын үнэ 95,000 вон',
        discountPrice: 'Хямдралтай үнэ 65,000 вон'
      },
      { 
        img: 'img/p1.jpg', 
        name: 'Vent Brush', 
        originalPrice: 'Борлуулалтын үнэ 45,000 вон',
        discountPrice: 'Хямдралтай үнэ 29,000 вон'
      }
    ];
    products.forEach((p) => {
      if (p.modalType === 'magicwave') {
        html += `
        <div class="product-card">
          <img src="${p.img}" alt="${p.name}">
          <div class="product-title">
            <span class="product-name">${p.name}</span>
          </div>
          <p class="view-toggle" onclick="openModal('img/ww1.png', 'Magic Wave', '', '')">View</p>
        </div>`;
      } else if (p.modalType === 'newproduct') {
        html += `
        <div class="product-card">
          <img src="${p.img}" alt="${p.name}">
          <div class="product-title">
            <span class="product-name">${p.name}</span>
          </div>
          <p class="view-toggle" onclick="openModal('img/ee1.png', 'New Product', '', '')">View</p>
        </div>`;
      } else {
        html += `
        <div class="product-card">
          <img src="${p.img}" alt="${p.name}">
          <div class="product-title">
            <span class="product-name">${p.name}</span>
          </div>
          <p class="view-toggle" onclick="openModal('${p.img}', '${p.name}', '${p.originalPrice}', '${p.discountPrice}')">View</p>
        </div>`;
      }
    });
  } else if (type === 'facefood') {
    const products = [
      { 
        img: 'img/ff1.png', 
        name: 'Essello', 
        originalPrice: 'Борлуулалтын үнэ 75,000 вон',
        discountPrice: 'Хямдралтай үнэ 49,000 вон'
      },
      { 
        img: 'img/ss3.png', 
        name: 'FaceFood', 
        originalPrice: 'Борлуулалтын үнэ 68,000 вон',
        discountPrice: 'Хямдралтай үнэ 45,000 вон'
      }
    ];
    products.forEach((p) => {
      html += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <div class="product-title">
          <span class="product-name">${p.name}</span>
        </div>
        <p class="view-toggle" onclick="openModal('${p.img}', '${p.name}', '${p.originalPrice}', '${p.discountPrice}')">View</p>
      </div>`;
    });
  } else if (type === 'celladix') {
    const products = [
      { img: 'img/cc1.png', name: 'Celladix 1', moveDown: true },
      { img: 'img/cc2.png', name: 'Celladix 2' },
      { img: 'img/cc3.png', name: 'Celladix 3' },
      { img: 'img/cc4.png', name: 'Celladix 4', moveDown: true },
      { img: 'img/cc5.png', name: 'Celladix 5' },
      { img: 'img/cc6.png', name: 'Celladix 6' },
      { img: 'img/cc7.png', name: 'Celladix 7' }
    ];
    products.forEach((p) => {
      html += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}"${p.moveDown ? ' style=\"margin-top:24px;\"' : ''}>
        <div class="product-title">
          <span class="product-name">${p.name}</span>
        </div>
        <p class="view-toggle" onclick="openModal('${p.img}', '${p.name}', '', '')">View</p>
      </div>`;
    });
  } else {
    for (let i = 0; i < 2; i++) {
      html += `
      <div class="product-card">
        <img src="img/nr_logo.png" alt="Coming Soon">
        <div class="product-title">
          <span class="product-name">Coming Soon</span>
          <span class="product-price"></span>
        </div>
      </div>`;
    }
  }

  grid.innerHTML = html;
  card.after(grid);
};



window.openModal = function(imgSrc, title, originalPrice, discountPrice) {
  console.log('openModal 호출됨:', title);
  const modal = document.getElementById('productModal');
  modal.scrollTop = 0;
  const modalImg1 = document.getElementById('modalImage1');
  const modalImg2 = document.getElementById('modalImage2');
  const modalImg3 = document.getElementById('modalImage3');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDescription = document.getElementById('modalDescription');
    // Reset to first image
    modalImg1.classList.add('active');
    modalImg2.classList.remove('active');
    modalImg3.classList.remove('active');

    // Reset dots to first
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots.length > 0) dots[0].classList.add('active');

  // Reset description
  // Reset active image to first
  modalImg1.classList.add('active');
  modalImg2.classList.remove('active');
  modalImg3.classList.remove('active');
  modalDescription.innerHTML = '';
  modalDescription.style.display = 'none';

  // Set title and price
  modalTitle.textContent = title;
  modalPrice.textContent = discountPrice ? discountPrice : originalPrice;

  // Set images based on product title
  if (title.startsWith('Celladix ')) {
    const idx = title.split(' ')[1];
    modalImg1.src = `img/cc${idx}.png`;
    modalImg2.src = `img/cc${idx}.png`;
    modalImg3.src = `img/cc${idx}.png`;
  } else if (title === 'Essello') {
    modalImg1.src = 'img/ff1.png';
    modalImg2.src = 'img/ff2.jfif';
    modalImg3.src = 'img/ff1.png';
  } else if (title === 'FaceFood') {
    modalImg1.src = 'img/ss3.png';
    modalImg2.src = 'img/ss1.jpg';
    modalImg3.src = 'img/ss2.jpg';
  } else if (title === 'BonDex Clinic') {
    modalImg1.src = 'img/s1.png';
    modalImg2.src = 'img/s2.png';
    modalImg3.src = 'img/s3.png';
  } else if (title === 'EyePhalt') {
    modalImg1.src = 'img/a1.png';
    modalImg2.src = 'img/a2.png';
    modalImg3.src = 'img/a3.png';
  } else if (title === 'Astaxanthin') {
    modalImg1.src = 'img/astax_image1.png';
    modalImg2.src = 'img/astax_image2.png';
    modalImg3.src = 'img/astax_image3.png';
  }
  else if (title === 'Dubai Peptide') {
    modalImg1.src = 'img/d1.png';
    modalImg2.src = 'img/d2.png';
    modalImg3.src = 'img/d3.png';
  } else if (title === 'Magic Wave Auto Curling Iron') {
    modalImg1.src = 'img/m2.jpg';
    modalImg2.src = 'img/m1.jpg';
    modalImg3.src = 'img/m2.jpg';
  } else if (title === 'Magic Wave') {
    modalImg1.src = 'img/ww1.png';
    modalImg2.src = 'img/ww2.png';
    modalImg3.src = 'img/ww2.png';
  } else if (title === 'New Product') {
    modalImg1.src = 'img/ee1.png';
    modalImg2.src = 'img/ee2.png';
    modalImg3.src = 'img/ee3.png';
  } else if (title === 'Glam&Magic Cordless Hair Styler ion-max') {
    modalImg1.src = 'img/l3.jpg';
    modalImg2.src = 'img/l1.jpg';
    modalImg3.src = 'img/l2.jpg';
  } else if (title === 'Vent Brush') {
    modalImg1.src = 'img/p1.jpg';
    modalImg2.src = 'img/p2.jpg';
    modalImg3.src = 'img/p3.jpg';
  } else {
    modalImg1.src = imgSrc;
    modalImg2.src = 'img/nr_logo.png';
    modalImg3.src = 'img/nr_logo.png';
  }

  // Description mapping
  const descMap = {
    'BonDex Clinic': `<p>[Патентлагдсан уургийн бондо систем, гэмтсэн үсэнд зориулсан гэрийн салоны арчилгаа]</p>
        <ul>
          <li>Байгалийн аргаар сайжруулах боломжгүй гэмтэлтэй үсийг хамгийн ихдээ 120% сайжруулах нөлөө</li>
          <li>Барзгар болсон үсний гадаргуугийн уураг холболтыг 50 цагийн турш хадгалах үр нөлөө</li>
          <li>Уургийн бондо гол патентын найрлага 20,000ppm агуулсан</li>
          <li>Тасарсан кератины дисульфид холбоог сэргээж үсний уургийн бүтцийг шинэчлэх</li>
          <li>Хуурайшсан үсэнд үр дүнтэй AQUARICH® чийгшүүлэх арчилгаа агуулсан</li>
          <li>Салонд эмчилгээ хийлгэсэн мэт өтгөрсөн нягт гэрийн арчилгаа</li>
        </ul>
        
        <h4 class="ingredients-title">Бүтээгдэхүүний бүрэн найрлага</h4>
        
        <div class="ingredients-section">
          <h5>[Шампунь]</h5>
                        <p>Цэвэршүүлсэн ус, Натринийн лаурет сульфат, Аммонийн лаурил сульфат, Кокамидопропил бетаин, Кокамид метил МЭА, Анхилуун үнэртэн, Бутиленгликол, Натринийн хлорид, Натринийн бензоат, Цетил спирт, Диметикон, Гуа гидроксипропил триемониум хлорид, Трайгидроксистеарин, Глицерин, Ситрийн хүчил, Лаурил спирт, Динатринийн ЭДТА, Аммонийн сульфат, Этилгексилглицерин, Стрептококкус термофилус исгэлтийн бүтээгдэхүүн, Синтетик флюорфлогопит, Хар овъёосны ханд, Лецитин, Титаны диоксид, Миристил спирт, Стеарил спирт, Кали сорбат, Аргинин, Арганы самрын тос, 1,2-Гександиол, Каприлик/каприк триглицерид, Ус төрөгчжүүлсэн лецитин, Натринийн пальмитоил саркозинат, SH-Олигопептид-78, Лимонен, Линалол, Бензил салицилат, Бензил бензоат</p>`,
    'EyePhalt': `<p>[Нүд орчмын бүх асуудлын шийдэл, нүдний доорх хавангийн эзэлхүүнийг дээшлүүлэх эмнэлзүйн туршилт амжилттай]</p>
      <ul>
        <li>Арьсны липидтэй төстэй ВАСОМ ретинол агуулсан, будалтын дор хальцарч, гулгахгүй ZERO</li>
        <li>Өдөрт хоёр удаа, тэлсэн төлөвт арчлах Day&Night хос өргөх шийдэл</li>
        <li>Зөвхөн 1 удаагийн хэрэглээгээр нүдний доорх хавангийн эзэлхүүн хамгийн ихдээ 156.67% сайжирсан</li>
        <li>Зөвхөн 1 удаагийн хэрэглээгээр үрчлээ хамгийн ихдээ 121.32% сайжирсан</li>
        <li>Арьсны цочролын тест амжилттай дууссан</li>
      </ul>
      
      <h4 class="ingredients-title">Бүрэн найрлага</h4>
      <div class="ingredients-section">
        <p>Цэвэршүүлсэн ус, Триметилпентандиол/Адипийн хүчил/Глицериний кроссполимер, Глицерин, Диметикон, Ниацинамид, Диметикон/Винилдиметиконы кроссполимер, 1,2-Гександиол, VP/VA кополимер, Натрийн акрилат/Натрийн акрилоилдиметилтаурийн кополимер, Изогексадекан, Гидроксипропилметилцеллюлоз, Амодиметикон, Полисорбат 80, Бутиленгликол, Канолын тос, Каприллилгликол, Сорбитан олеат, Этигексилглицерин, C12-14 Сек-Алкез-7, Аденозин, Одой анисын ханд, Пентиленгликол, Макадамийн үрийн тос, Каприлик/Каприк триглицерид, Устөрөгчжүүлсэн фосфатидилхолин, Ретинол, Пропиленгликол, Полисорбат 20, Этилийн спирт, PEG-5 Чаргана үрийн стерол, Рапсын стерол, Цетет-5, Цетет-3, Калийн цетилфосфат, BHT (бутилжуулсан гидрокситолуол), Холестерин, Луувангийн үрийн тос, Лецитин, Натрийн фосфат, SH-Олигопептид-1, Гидролизжүүлсэн далайн хөвд, Токоферил ацетат, Наранцэцгийн үрийн тос, Луувангийн ханд, Бета-каротин, Коллаген, Кофеин, Натрийн гиалуронат, Гидроксипропилтримониум гиалуронат, Натрийн ацетилилсан гиалуронат, Гидролизжүүлсэн гиалуроны хүчил, Гиалуроны хүчил, Натрийн гиалуронатын кроссполимер, Гидролизжүүлсэн натрийн гиалуронат, Калийн гиалуронат, Динатрийн ЭДТА, Анхилуун үнэртэн, Кумарин, Линалол</p>
      </div>`,
    'Cemenrete': `<p>[Cemenrete бүтээгдэхүүний товч танилцуулга]</p><ul><li>Ингредиент мэдээлэл хүлээгдэж байна...</li></ul>`,
    'Astaxanthin': `<p>[Хүчтэй антиоксидант үйлчлэлтэй найрлагын хослолоор мелазма/цайруулах арчилгаа]</p>
      <ul>
        <li>Арьсны гадаргуугаас меланин хэмжээг хамгийн ихдээ 38.72%-иар сайжруулна</li>
        <li>Пигментацын хуримтлалыг хамгийн ихдээ 46.89%-иар сайжруулна</li>
        <li>Мелазма, хар толбо зэрэг пигментацийг намжаана</li>
        <li>Цайруулах үйлчилгээтэй найрлага агуулсан</li>
        <li>0.00 цочрол үүсгэдэггүй, хүн дээрх туршилт амжилттай дууссан</li>
      </ul>
      <h4 class="ingredients-title">Бүтээгдэхүүний бүрэн найрлага</h4>
      <div class="ingredients-section">
        <p>Цэвэршүүлсэн ус, Бутиленгликол, Фенилтриметикон, Ниацинамид, Транексамийн хүчил, 1,2-Гександиол, Каприлик/Каприк триглицерид, Полиглицерил-6 дикапрат, Аргинин, Карбомер, Этилгексилглицерин, Аденозин, Астаксантин (100 000 ppb), Энэтхэгийн модны цэцгийн ханд, Энэтхэгийн модны навчны ханд, Бетаин, Ариун базилик навчны ханд, Кораллын мөхлөгт ургамлын ханд, Иви гоуд жимсний ханд, Гурвалжин үндэсний ханд, Аскорбийн хүчил, Токоферол, Тиоктикийн хүчил, Термус термофилус ферментжүүлсэн ханд, Глицерин, ...</p>
      </div>`,
    'Dubai Peptide': `<p>[Үрэх тусам тосыг хүчтэй шингээдэг, өнгө нь хувирдаг шаврын маск]</p>
      <ul>
        <li>Нүүрс 35,000 ppm агуулснаар илүү хүчтэй тосны шингээлтийн үр дүн</li>
        <li>Хүлээлгүйгээр үрээд, өнгө нь хувирсан үед нь угааж авдаг түргэн угаадаг маск</li>
        <li>4 төрлийн пептид болон нүх сүв агшаах патентлагдсан найрлага агуулсан тул чангалалтын арчилгаа</li>
        <li>Чийгийг ихээр хадгалах бүтэцтэй тул зөөлөн, чийглэг төгсгөл</li>
      </ul>

<h4>Бүтээгдэхүүний бүрэн найрлага</h4>
<p>Цэвэршүүлсэн ус, Глицерин, Каолин (50 000 ppm), Пропандиол, 1,2-Гександиол, Глицерил стеарат, Бентонит, Цетилэтилгексаноат, Каприллик/каприктриглицерид, Титан диоксид, Цетеарил спирт, Бутиленгликол, Нүүрсний нунтаг, Маннитол, Шар өнгийн төмрийн оксид, Микрокристаллин целлюлоз, Эрдэнэ шишийн цардуул, Натрийн полиакрилат, Хромын ногоон оксид, Полиакрилат кроссполимер-6, Этилгексилглицерин, Үнэртүүлэгч, Гидроксипропил цардуулын фосфат, Хар өнгийн төмрийн оксид, Гидрогенжүүлсэн лецитин, Динатрийн ЭДТА, Т-бутил спирт, Самрын хальсны ханд, Персиммон навчны ханд, Лаванда цэцгийн ханд, Усан үзмийн ханд, Хожангийн үндэс ханд, Сафлор цэцгийн ханд, Кофе шошны ханд, Декстрин, Сахарид изомерат, Ногоон цайны ханд, Чопинаму жимсний ханд, Какао жимсний ханд, Фисташ жимсний ханд, Папаин, Протеаз, Бромелайн, Липаз, Натрийн цитрат, Цитрийн хүчил, SH-олигопептид-1 (0.3 ppb), SH-полипептид-1 (0.3 ppb), SH-олигопептид-2 (0.3 ppb), SH-олигопептид-22 (0.3 ppb)</p>
`,
    'Magic Wave Auto Curling Iron': `<p>[Автомат завивка систем, үсний хэлбэржүүлэлтийн шинэ технологи]</p>
      <ul>
        <li>Автомат завивка систем ашиглан үсний хэлбэржүүлэлтийг хялбарчилна</li>
        <li>Температурын хяналттай систем ашиглан үсийг хамгаална</li>
        <li>Хурдан халах систем ашиглан цаг хэмнэнэ</li>
        <li>Эргономик дизайн ашиглан ашиглахад хялбар</li>
        <li>Урт хугацааны хэлбэржүүлэлтийн үр дүн</li>
      </ul>
      
      <h4 class="ingredients-title">Техникийн онцлог</h4>
      <div class="ingredients-section">
        <p>Автомат завивка систем, Температурын хяналт, Хурдан халах технологи, Эргономик дизайн, Урт хугацааны хэлбэржүүлэлт, Үсний хамгаалалтын систем</p>
      </div>`,
    'Glam&Magic Cordless Hair Styler ion-max': `<p>[Утасгүй үсний хэлбэржүүлэгч, ион технологи ашиглан үсний хамгаалалт]</p>
      <ul>
        <li>Утасгүй дизайн ашиглан чөлөөтэй ашиглах боломжтой</li>
        <li>Ион технологи ашиглан үсний цахилгаан статикийг багасгана</li>
        <li>Хурдан халах систем ашиглан цаг хэмнэнэ</li>
        <li>Урт хугацааны батарей ашиглан тасралтгүй ажиллана</li>
        <li>Олон төрлийн үсний хэлбэржүүлэлтийн боломжтой</li>
      </ul>
      
      <h4 class="ingredients-title">Техникийн онцлог</h4>
      <div class="ingredients-section">
        <p>Утасгүй дизайн, Ион технологи, Хурдан халах систем, Урт хугацааны батарей, Олон төрлийн хэлбэржүүлэлт, Үсний хамгаалалтын систем</p>
      </div>`,
    'Vent Brush': `<p>[Агааржуулалтын системтэй үсний сам, үсний хэлбэржүүлэлтийн туслах]</p>
      <ul>
        <li>Агааржуулалтын систем ашиглан үсний хэлбэржүүлэлтийг хялбарчилна</li>
        <li>Зөөлөн самны үзүүр ашиглан үсний хамгаалалт</li>
        <li>Эргономик дизайн ашиглан ашиглахад хялбар</li>
        <li>Олон төрлийн үсний урттай зохицсон</li>
        <li>Хялбар цэвэрлэх боломжтой</li>
      </ul>
      
      <h4 class="ingredients-title">Техникийн онцлог</h4>
      <div class="ingredients-section">
        <p>Агааржуулалтын систем, Зөөлөн самны үзүүр, Эргономик дизайн, Олон төрлийн үсний урттай зохицсон, Хялбар цэвэрлэх, Үсний хамгаалалт</p>
      </div>`,
    'ESSELLO': `<p>[ESSELLO бүтээгдэхүүний товч танилцуулга]</p>
      <ul>
        <li>ESSELLO бүтээгдэхүүний онцлог шинж чанар</li>
        <li>Өндөр чанартай найрлага ашиглан үр дүнтэй арчилгаа</li>
        <li>Байгалийн орц ашиглан арьсны эрүүл мэндэд сайн</li>
        <li>Хялбар ашиглах боломжтой</li>
        <li>Урт хугацааны үр дүнтэй</li>
      </ul>
      
      <h4 class="ingredients-title">Бүтээгдэхүүний онцлог</h4>
      <div class="ingredients-section">
        <p>ESSELLO бүтээгдэхүүний дэлгэрэнгүй мэдээлэл, найрлага, ашиглах арга зэргийг энд оруулна</p>
      </div>`,
    'FaceFood': `<p>[FaceFood бүтээгдэхүний товч танилцуулга]</p>
      <ul>
        <li>FaceFood бүтээгдэхүүний онцлог шинж чанар</li>
        <li>Арьсны эрүүл мэндэд тустай найрлага</li>
        <li>Байгалийн орц ашиглан хамгаалалт</li>
        <li>Хялбар ашиглах боломжтой</li>
        <li>Түргэн үр дүнтэй</li>
      </ul>
      
      <h4 class="ingredients-title">Бүтээгдэхүүний онцлог</h4>
      <div class="ingredients-section">
        <p>FaceFood бүтээгдэхүүний дэлгэрэнгүй мэдээлэл, найрлага, ашиглах арга зэргийг энд оруулна</p>
      </div>`
  };

  const html = descMap[title] || '';
  if (html) {
    modalDescription.innerHTML = html;
    modalDescription.style.display = 'block';
  
      modalDescription.scrollTop = 0;
}

  modal.style.display = 'block';
};

window.closeModal = function() {
  console.log('closeModal 호출됨');
  const modal = document.getElementById('productModal');
  modal.scrollTop = 0;
  modal.style.display = 'none';
};

window.goHome = function() {
  console.log('goHome 호출됨');
  closeModal();
  window.location.href = 'index.html';
  closeModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showLoginForm = function() {
  console.log('showLoginForm 호출됨');
  const modal = document.getElementById('loginModal');
  modal.style.display = 'flex';
};

window.hideLoginForm = function() {
  console.log('hideLoginForm 호출됨');
  const modal = document.getElementById('loginModal');
  modal.style.display = 'none';
};

// 이벤트 리스너 한 번만 등록
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('productModal');
  modal.scrollTop = 0;
  
  // ESC 키로 모달 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // 모달 외부 클릭시 닫기
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 모바일 뒤로가기 버튼 처리
  window.addEventListener('popstate', function(e) {
    if (modal.style.display === 'block') {
      e.preventDefault();
      closeModal();
      history.pushState(null, '', window.location.href);
    }
  });

  // 이메일 로그인 폼 제출 처리
  document.getElementById('emailLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('이메일 로그인 시도:', email);
    // TODO: 이메일 로그인 구현
    alert('이메일 로그인 기능이 준비 중입니다.');
  });

  // 모달 외부 클릭시 닫기
  document.getElementById('loginModal').addEventListener('click', function(e) {
    if (e.target === this) {
      hideLoginForm();
    }
  });

  // 슬라이더 닷 클릭 이벤트
  document.querySelectorAll('.slider-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // 터치 이벤트
  const imageContainer = document.getElementById('modalImageContainer');
  imageContainer.addEventListener('touchstart', handleDragStart);
  imageContainer.addEventListener('touchmove', handleDragMove);
  imageContainer.addEventListener('touchend', handleDragEnd);

  // 마우스 이벤트
  imageContainer.addEventListener('mousedown', handleDragStart);
  imageContainer.addEventListener('mousemove', handleDragMove);
  imageContainer.addEventListener('mouseup', handleDragEnd);
  imageContainer.addEventListener('mouseleave', handleDragEnd);
});

// 슬라이드 관련 함수들
function showSlide(index) {
  const images = document.querySelectorAll('.modal-image');
  const dots = document.querySelectorAll('.slider-dot');
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  images[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

// 터치 및 마우스 이벤트 통합
const imageContainer = document.getElementById('modalImageContainer');
let startX = 0;
let isDragging = false;

function handleDragStart(e) {
  startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  isDragging = true;
}

function handleDragMove(e) {
  if (!isDragging) return;
  const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  const diffX = currentX - startX;
  if (Math.abs(diffX) > 50) {
    if (diffX < 0) showSlide(currentSlide + 1);
    else showSlide(currentSlide - 1);
    isDragging = false;
  }
}

function handleDragEnd() {
  isDragging = false;
} 
// 뒤로가기 시 모달 닫기
window.addEventListener('popstate', () => {
  const modal = document.getElementById('productModal');
  modal.scrollTop = 0;
  if (modal.style.display === 'block') {
    closeModal();
    history.replaceState(null, '', window.location.pathname);
  }
});