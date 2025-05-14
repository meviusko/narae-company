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
      { img: 'img/dr.melaxin_cemenrete.png', name: 'Cemenrete', price: '' },
      { img: 'img/dr.melaxin_astaxanthin.png', name: 'Astaxanthin', price: '' },
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
  const modalImg1 = document.getElementById('modalImage1');
  const modalImg2 = document.getElementById('modalImage2');
  const modalImg3 = document.getElementById('modalImage3');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  
  // 모달이 열릴 때 history state 추가
  if (!window.modalOpen) {
    history.pushState({ modal: true }, '', window.location.href);
    window.modalOpen = true;
  }
  
  if (title === 'BonDex Clinic') {
    modalImg1.src = 'img/s1.png';
    modalImg2.src = 'img/s2.png';
    modalImg3.src = 'img/s3.png';
    modalDescription.style.display = 'block';
  } else if (title === 'EyePhalt') {
    modalImg1.src = 'img/a1.png';
    modalImg2.src = 'img/a2.png';
    modalImg3.src = 'img/a3.png';
    modalDescription.style.display = 'block';
    modalDescription.innerHTML = `
      <p>[Нүд орчмын бүх асуудлын шийдэл, нүдний доорх хавангийн эзэлхүүнийг дээшлүүлэх эмнэлзүйн туршилт амжилттай]</p>
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
      </div>`;
  } else if (title === 'Astaxanthin') {
    modalImg1.src = imgSrc;
    modalImg2.src = '';
    modalImg3.src = '';
    modalDescription.style.display = 'block';
    modalDescription.innerHTML = `
      <p>[Хүчтэй антиоксидант үйлчлэлтэй найрлагын хослолоор мелазма/цайруулах арчилгаа]</p>
      <ul>
        <li>Арьсны гадаргуугаас меланин хэмжээг хамгийн ихдээ 38.72%-иар сайжруулна</li>
        <li>Пигментацын хуримтлалыг хамгийн ихдээ 46.89%-иар сайжруулна</li>
        <li>Мелазма, хар толбо зэрэг пигментацийг намжаана</li>
        <li>Цайруулах үйлчилгээтэй найрлага агуулсан</li>
        <li>0.00 цочрол үүсгэдэггүй, хүн дээрх туршилт амжилттай дууссан</li>
      </ul>
      
      <h4 class="ingredients-title">Бүрэн найрлага</h4>
      <div class="ingredients-section">
        <p>Цэвэршүүлсэн ус, Бутиленгликол, Фенилтриметикон, Ниацинамид, Транексамийн хүчил, 1,2-Гександиол, Каприлик/Каприк триглицерид, Полиглицерил-6 дикапрат, Аргинин, Карбомер, Этилгексилглицерин, Аденозин, Астаксантин (100 000 ppb), Энэтхэгийн модны цэцгийн ханд, Энэтхэгийн модны навчны ханд, Бетаин, Ариун базилик навчны ханд, Кораллын мөхлөгт ургамлын ханд, Иви гоуд жимсний ханд, Гурвалжин үндэсний ханд, Аскорбийн хүчил, Токоферол, Тиоктикийн хүчил, Термус термофилус ферментжүүлсэн ханд, Глицерин, ...</p>
      </div>`;
  } else {
    modalImg1.src = imgSrc;
    modalImg2.src = '';
    modalImg3.src = '';
    modalDescription.style.display = 'block';
    modalDescription.innerHTML = `
      <p>[Coming Soon]</p>
      <ul>
        <li>제품 설명 준비 중입니다.</li>
      </ul>`;
  }
  
  modalTitle.textContent = title;
  
  // 가격 정보 추가
  const priceInfo = document.createElement('div');
  priceInfo.className = 'modal-price-info';
  if (originalPrice) {
    const originalPriceDiv = document.createElement('div');
    originalPriceDiv.className = 'modal-original-price';
    // 정가 텍스트를 분리하여 숫자 부분만 취소선 적용
    const priceText = originalPrice.split(' ');
    originalPriceDiv.innerHTML = priceText.map((word, index) => {
      if (word.includes('98,800') || word.includes('99,000')) {
        return `<span class=\"price-number\">${word}</span>`;
      }
      return word;
    }).join(' ');
    priceInfo.appendChild(originalPriceDiv);
  }
  if (discountPrice) {
    const discountPriceDiv = document.createElement('div');
    discountPriceDiv.className = 'modal-discount-price';
    discountPriceDiv.textContent = discountPrice;
    priceInfo.appendChild(discountPriceDiv);
  }
  
  // 기존 가격 정보가 있다면 제거
  const existingPriceInfo = modalTitle.nextElementSibling;
  if (existingPriceInfo && existingPriceInfo.className === 'modal-price-info') {
    existingPriceInfo.remove();
  }
  
  // 새로운 가격 정보 추가
  modalTitle.after(priceInfo);
  
  modal.style.display = 'block';
};

window.closeModal = function() {
  console.log('closeModal 호출됨');
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
  window.modalOpen = false;
  // 모달이 닫힐 때 history state 제거
  if (window.modalOpen) {
    history.back();
  }
};

window.goHome = function() {
  console.log('goHome 호출됨');
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
  window.modalOpen = false;
  
  // ESC 키로 모달 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
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
      closeModal();
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