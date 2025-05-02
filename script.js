// 전역 변수
let currentSlide = 0;

console.log('script.js 로드됨');

// Google 로그인 함수
window.loginWithGoogle = function() {
  console.log('Google 로그인 시도');
  alert('Google 로그인 기능이 준비 중입니다.');
};

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
        price: '98,800원',
        images: [
          'img/bondex1.jpg',
          'img/bondex2.jpg',
          'img/bondex3.jpg'
        ],
        description: `<p>[Патентлагдсан уургийн бондо систем, гэмтсэн үсэнд зориулсан гэрийн салоны арчилгаа]</p>
        <ul>
          <li>Байгалийн аргаар сайжруулах боломжгүй гэмтэлтэй үсийг хамгийн ихдээ 120% сайжруулах нөлөө</li>
          <li>Барзгар болсон үсний гадаргуугийн уураг холболтыг 50 цагийн турш хадгалах үр нөлөө</li>
          <li>Уургийн бондо гол патентын найрлага 20,000ppm агуулсан</li>
          <li>Тасарсан кератины дисульфид холбоог сэргээж үсний уургийн бүтцийг шинэчлэх</li>
          <li>Хуурайшсан үсэнд үр дүнтэй AQUARICH® чийгшүүлэх арчилгаа агуулсан</li>
          <li>Салонд эмчилгээ хийлгэсэн мэт өтгөрсөн нягт гэрийн арчилгаа</li>
        </ul>`
      },
      { img: 'img/6128d637a82c2c472bba840d58a7c788-removebg-preview.png', name: 'EyePhalt', price: '99,000원' },
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
          <span class="product-price">${p.price}</span>
        </div>
        <button class="view-toggle" onclick="openModal('${p.name}', '${p.img}', '${p.price}', ${JSON.stringify(p.description || '')}, ${JSON.stringify(p.images || [])})">View</button>
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

window.openModal = function(title, imgSrc, price, description, images = []) {
  console.log('openModal 호출됨:', title);
  const modal = document.getElementById('productModal');
  const modalImg1 = document.getElementById('modalImage1');
  const modalImg2 = document.getElementById('modalImage2');
  const modalImg3 = document.getElementById('modalImage3');
  const modalTitle = document.getElementById('modalTitle');
  const modalPriceInfo = document.getElementById('modalPriceInfo');
  const modalDescription = document.getElementById('modalDescription');
  
  history.pushState({ modal: true }, '', window.location.href);
  
  if (title === 'BonDex Clinic' && images && images.length > 0) {
    modalImg1.src = images[0];
    modalImg2.src = images[1];
    modalImg3.src = images[2];
    modalImg1.classList.add('active');
    modalImg2.classList.remove('active');
    modalImg3.classList.remove('active');
    currentSlide = 0;
    updateSliderDots();
  } else {
    modalImg1.src = imgSrc;
    modalImg2.src = '';
    modalImg3.src = '';
    modalImg1.classList.add('active');
    modalImg2.classList.remove('active');
    modalImg3.classList.remove('active');
  }
  
  modalTitle.textContent = title;
  
  if (price) {
    modalPriceInfo.innerHTML = `
      <div class="modal-original-price">
        <span class="price-number">${price}</span>
      </div>
    `;
  } else {
    modalPriceInfo.innerHTML = '';
  }
  
  if (description) {
    modalDescription.style.display = 'block';
    modalDescription.innerHTML = description;
  } else {
    modalDescription.style.display = 'none';
  }
  
  modal.style.display = 'block';
};

window.closeModal = function() {
  console.log('closeModal 호출됨');
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
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

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
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

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      hideLoginForm();
    }
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

  // 슬라이더 닷 클릭 이벤트
  document.querySelectorAll('.slider-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
});

// 슬라이드 관련 함수들
function showSlide(index) {
  const images = document.querySelectorAll('.modal-image');
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  images.forEach(img => img.classList.remove('active'));
  images[index].classList.add('active');
  currentSlide = index;
  updateSliderDots();
}

function updateSliderDots() {
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// 터치 및 마우스 이벤트 통합
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