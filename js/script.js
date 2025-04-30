// 전역 변수
let currentSlide = 0;

console.log('script.js 로드됨');

// 로그인 관련 함수
window.showLoginForm = function() {
  console.log('showLoginForm 호출됨');
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'flex';
  } else {
    console.error('loginModal을 찾을 수 없습니다.');
  }
}

window.hideLoginForm = function() {
  console.log('hideLoginForm 호출됨');
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('loginModal을 찾을 수 없습니다.');
  }
}

// 제품 관련 함수
window.toggleProducts = function(card, type) {
  console.log('toggleProducts 호출됨:', type);
  console.log('Card element:', card);
  
  const existingGrid = card.nextElementSibling;
  console.log('Existing grid:', existingGrid);

  if (existingGrid && existingGrid.classList.contains('product-grid')) {
    console.log('Removing existing grid');
    existingGrid.remove();
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'product-grid';
  console.log('Created new grid');

  let html = "";

  if (type === 'melaxin') {
    console.log('Creating melaxin products');
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
      console.log('Adding product:', p.name);
      html += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <div class="product-title">
          <span class="product-name">${p.name}</span>
          <span class="product-price">${p.price || ''}</span>
        </div>
        <p class="view-toggle" onclick="window.openModal('${p.img}', '${p.name}', '${p.originalPrice || ''}', '${p.discountPrice || ''}')">View</p>
      </div>`;
    });
  } else {
    console.log('Creating coming soon products');
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
  console.log('Grid added to DOM');
}

window.openModal = function(imgSrc, title, originalPrice, discountPrice) {
  console.log('openModal 호출됨:', title);
  const modal = document.getElementById('productModal');
  const modalImg1 = document.getElementById('modalImage1');
  const modalImg2 = document.getElementById('modalImage2');
  const modalImg3 = document.getElementById('modalImage3');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  
  if (!modal || !modalImg1 || !modalImg2 || !modalImg3 || !modalTitle || !modalDescription) {
    console.error('필요한 모달 요소를 찾을 수 없습니다.');
    return;
  }
  
  history.pushState({ modal: true }, '', window.location.href);
  
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
      </ul>`;
  } else {
    modalImg1.src = imgSrc;
    modalImg2.src = '';
    modalImg3.src = '';
    modalDescription.style.display = 'none';
  }
  
  modalTitle.textContent = title;
  modal.style.display = 'block';
}

window.showSlide = function(index) {
  console.log('showSlide 호출됨:', index);
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

window.closeModal = function() {
  console.log('closeModal 호출됨');
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('productModal을 찾을 수 없습니다.');
  }
}

window.goHome = function() {
  console.log('goHome 호출됨');
  window.closeModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded 이벤트 발생');
  
  // 이메일 로그인 폼 제출 처리
  const emailLoginForm = document.getElementById('emailLoginForm');
  if (emailLoginForm) {
    emailLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      console.log('이메일 로그인 시도:', email);
    });
  }

  // 모달 외부 클릭시 닫기
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      if (e.target === this) {
        window.hideLoginForm();
      }
    });
  }

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.closeModal();
      window.hideLoginForm();
    }
  });
}); 