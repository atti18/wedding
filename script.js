// 오디오 컨트롤
let audioPlaying = false;
const audioBtn = document.getElementById('audioControl');
const bgMusic = document.getElementById('bgMusic');

function toggleAudio() {
  if (audioPlaying) {
    bgMusic.pause();
    audioBtn.classList.remove('playing');
  } else {
    bgMusic.play();
    audioBtn.classList.add('playing');
  }
  audioPlaying = !audioPlaying;
}

// 페이지 로드 시 자동 재생 시도
document.addEventListener('DOMContentLoaded', function() {
  bgMusic.volume = 0.5; // 볼륨 50%로 설정
  
  // iOS Safari에서의 자동 재생을 위한 처리
  document.addEventListener('touchstart', function() {
    if (!audioPlaying) {
      bgMusic.play()
        .then(() => {
          audioPlaying = true;
          audioBtn.classList.add('playing');
        })
        .catch(() => {
          console.log('자동 재생이 차단되었습니다.');
        });
    }
  }, { once: true });

  // 데스크톱에서의 자동 재생 시도
  bgMusic.play()
    .then(() => {
      audioPlaying = true;
      audioBtn.classList.add('playing');
    })
    .catch(() => {
      console.log('자동 재생이 차단되었습니다.');
    });
});

// D-day 카운터
function updateDday() {
  const weddingDate = new Date('2025-05-11');
  const today = new Date();
  const diff = weddingDate - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  document.getElementById('dday').innerText = `D-${days}`;
}
updateDday();

// 페이드인 애니메이션
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// 이미지 모달
function openModal(src) {
  document.getElementById('imageModal').style.display = 'block';
  document.getElementById('modalImage').src = src;
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

// 계좌번호 복사
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert(document.documentElement.lang === 'ko' ? '계좌번호가 복사되었습니다.' : 'Account number copied to clipboard.');
  });
}

// 카카오톡 공유
Kakao.init('YOUR_KAKAO_APP_KEY');
function shareKakao() {
  const isKorean = document.documentElement.lang === 'ko';
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: isKorean ? '우리 결혼합니다 💍' : 'We\'re Getting Married 💍',
      description: isKorean ? '2025.05.11 | 광명역사컨벤션웨딩홀' : 'May 11th, 2025 | Gwangmyeong Station Convention Wedding Hall',
      imageUrl: location.origin + '/images/001-MIL00324.jpg',
      link: {
        mobileWebUrl: location.href,
        webUrl: location.href
      }
    },
    buttons: [
      {
        title: isKorean ? '청첩장 보기' : 'View Invitation',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href
        }
      }
    ]
  });
}

// 갤러리 스와이퍼
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// 방명록 기능
function saveMessage() {
  const messageBox = document.querySelector('.message-box');
  const message = messageBox.value.trim();
  if (message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.style.padding = '1rem';
    messageElement.style.margin = '1rem 0';
    messageElement.style.backgroundColor = 'var(--secondary-color)';
    messageElement.style.borderRadius = '10px';
    messageElement.textContent = message;
    messagesDiv.prepend(messageElement);
    messageBox.value = '';
  }
}

// 네이버 지도 초기화
document.addEventListener('DOMContentLoaded', function() {
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    const location = new naver.maps.LatLng(37.4164, 126.8843);
    const mapOptions = {
      center: location,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    };
    
    const map = new naver.maps.Map(mapContainer, mapOptions);
    
    // 마커 추가
    const marker = new naver.maps.Marker({
      position: location,
      map: map,
      title: document.documentElement.lang === 'ko' ? '광명역사컨벤션웨딩홀' : 'Gwangmyeong Station Convention Wedding Hall'
    });
    
    // 정보창 추가
    const contentString = document.documentElement.lang === 'ko' ?
      '<div style="padding:10px;width:200px;text-align:center;">' +
      '<h3 style="margin:0 0 10px;color:#7F9ACD;">광명역사컨벤션웨딩홀</h3>' +
      '<p style="margin:0;">경기도 광명시 광명역로 21 지하1층</p>' +
      '</div>' :
      '<div style="padding:10px;width:200px;text-align:center;">' +
      '<h3 style="margin:0 0 10px;color:#7F9ACD;">Gwangmyeong Station Convention Wedding Hall</h3>' +
      '<p style="margin:0;">B1, 21 Gwangmyeongyeok-ro, Gwangmyeong-si, Gyeonggi-do</p>' +
      '</div>';

    const infowindow = new naver.maps.InfoWindow({
      content: contentString,
      maxWidth: 250,
      backgroundColor: "#fff",
      borderColor: "#7F9ACD",
      borderWidth: 2,
      anchorSize: new naver.maps.Size(20, 20),
      anchorSkew: true,
      pixelOffset: new naver.maps.Point(0, -10)
    });

    // 마커 클릭 시 정보창 표시
    naver.maps.Event.addListener(marker, "click", function() {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });

    // 초기에 정보창 표시
    infowindow.open(map, marker);
  }
}); 