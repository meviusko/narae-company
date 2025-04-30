import { getData } from './js/firebase-config.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { db } from './js/firebase-config.js';

// 전역 변수
let currentSlide = 0;

console.log('script.js 로드됨');

// 전역 함수들을 window 객체에 등록
window.showLoginForm = function() {
  console.log('showLoginForm 호출됨');
  const modal = document.getElementById('loginModal');
  modal.style.display = 'flex';
}

window.hideLoginForm = function() {
  console.log('hideLoginForm 호출됨');
  const modal = document.getElementById('loginModal');
  modal.style.display = 'none';
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
      { img: 'img/206444_410774_554-removebg-preview.png', name: 'BonDex Clinic', price: '98,800원' },
      { img: 'img/6128d637a82c2c472bba840d58a7c788-removebg-preview.png', name: 'EyePhalt', price: '99,000원' },
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
          <span class="product-price">${p.price}</span>
        </div>
        <p class="view-toggle" onclick="openModal('${p.img}', '${p.name}', '${p.price}')">View</p>
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

window.openModal = function(imgSrc, title, price) {
  const modal = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  
  history.pushState({ modal: true }, '', window.location.href);
  
  if (title === 'BonDex Clinic') {
    modalImg.src = 'img/s1.png';
    modalPrice.textContent = '98,800원';
  } else if (title === 'EyePhalt') {
    modalImg.src = 'img/a1.png';
    modalPrice.textContent = '99,000원';
  } else {
    modalImg.src = imgSrc;
    modalPrice.textContent = price;
  }
  
  modalTitle.textContent = title;
  modal.style.display = 'block';
}

window.showSlide = function(index) {
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
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
}

window.goHome = function() {
  closeModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
  // 이메일 로그인 폼 제출 처리
  document.getElementById('emailLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('이메일 로그인 시도:', email);
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
});

// Firebase 데이터 읽기
const dbRef = ref(db, "test");
get(dbRef).then((snapshot) => {
  const value = snapshot.val();
  const outputEl = document.getElementById("firebase-output");
  if (value) {
    outputEl.innerText = `Firebase: ${value}`;
  } else {
    outputEl.innerText = "";  // 데이터 없을 땐 아무것도 출력 안 함
  }
}).catch((error) => {
  console.error("Firebase 데이터 가져오기 실패:", error);
  document.getElementById("firebase-output").innerText = "";
});

// 페이지 로드 시 데이터 불러오기
document.addEventListener('DOMContentLoaded', loadTestData); 