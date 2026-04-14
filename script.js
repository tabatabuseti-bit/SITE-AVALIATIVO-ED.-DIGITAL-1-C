const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 20;
let currentFontSize = DEFAULT_FONT_SIZE;

const applyFontSize = () => {
  document.documentElement.style.fontSize = `${currentFontSize}px`;
};

const increaseFont = () => {
  currentFontSize = Math.min(MAX_FONT_SIZE, currentFontSize + 2);
  applyFontSize();
};

const decreaseFont = () => {
  currentFontSize = Math.max(MIN_FONT_SIZE, currentFontSize - 2);
  applyFontSize();
};

const toggleContrast = () => {
  document.body.classList.toggle('high-contrast');
};

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const accessibilityBtn = document.getElementById('accessibility-btn');
const accessibilityMenu = document.getElementById('accessibility-menu');
const revealElements = document.querySelectorAll('.reveal');
const dots = document.querySelectorAll('.dot');
const navMore = document.querySelector('.nav-more');
const navMoreBtn = document.getElementById('nav-more-btn');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

if (navMore && navMoreBtn) {
  navMoreBtn.addEventListener('click', () => {
    const isOpen = navMore.classList.toggle('open');
    navMoreBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navMore.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMore.classList.remove('open');
      navMoreBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navMore.contains(event.target)) {
      navMore.classList.remove('open');
      navMoreBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

if (accessibilityBtn && accessibilityMenu) {
  accessibilityBtn.addEventListener('click', () => {
    const isHidden = accessibilityMenu.classList.toggle('hidden');
    accessibilityBtn.setAttribute('aria-expanded', String(!isHidden));
  });
}

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const carouselItems = [
  {
    src: './img/campo.png',
    alt: 'Campo de cevada em Guarapuava',
    title: 'Campo de cevada',
    description: 'O início da jornada acontece no campo, onde o cultivo da cevada depende de planejamento, clima favorável e cuidado com os recursos naturais.'
  },
  {
    src: './img/malte.png',
    alt: 'Malte em processo de beneficiamento',
    title: 'Transformação em malte',
    description: 'Após a colheita, a cevada passa por etapas de beneficiamento e transformação, unindo produção agrícola, tecnologia e indústria.'
  },
  {
    src: './img/cidade.png',
    alt: 'Cidade conectada à cadeia produtiva do malte',
    title: 'Campo e cidade conectados',
    description: 'O produto final chega à cidade e mostra como o agro movimenta a economia, abastece o cotidiano e depende de um futuro sustentável.'
  }
];

let currentIndex = 0;
let autoSlide;

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function updateCarousel() {
  const item = carouselItems[currentIndex];
  const img = document.getElementById('carousel-image');
  const title = document.getElementById('carousel-title');
  const description = document.getElementById('carousel-description');

  if (!img || !title || !description) return;

  img.src = item.src;
  img.alt = item.alt;
  title.textContent = item.title;
  description.textContent = item.description;
  updateDots();
}

function changeSlide(direction) {
  currentIndex = (currentIndex + direction + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    goToSlide(Number(dot.dataset.index));
    stopAutoSlide();
    startAutoSlide();
  });
});

const facts = [
  'A cevada é um dos grãos cultivados há mais tempo pela humanidade e segue tendo grande importância econômica e alimentar.',
  'O malte não está presente apenas em bebidas: ele também pode ser utilizado em diferentes alimentos.',
  'A força do agro também depende do cuidado com o solo, a água e os demais recursos naturais.',
  'Produção e meio ambiente precisam caminhar juntos para garantir um futuro realmente sustentável.'
];

const factText = document.getElementById('fact-text');
const factBtn = document.getElementById('fact-btn');
let currentFactIndex = 0;

if (factBtn && factText) {
  factBtn.addEventListener('click', () => {
    let nextIndex;

    do {
      nextIndex = Math.floor(Math.random() * facts.length);
    } while (nextIndex === currentFactIndex && facts.length > 1);

    currentFactIndex = nextIndex;
    factText.textContent = facts[currentFactIndex];
  });
}

const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

if (quizForm && quizResult) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const answers = ['q1', 'q2', 'q3', 'q4', 'q5'];
    let score = 0;
    let allAnswered = true;

    answers.forEach((question) => {
      const selected = document.querySelector(`input[name="${question}"]:checked`);

      if (!selected) {
        allAnswered = false;
        return;
      }

      if (selected.value === 'certo') {
        score += 1;
      }
    });

    if (!allAnswered) {
      quizResult.textContent = 'Responda todas as perguntas para ver o resultado.';
      quizResult.classList.add('show');
      return;
    }

    const feedbacks = {
      5: 'Parabéns! Você acertou tudo e compreendeu muito bem a relação entre cevada, malte, campo, cidade e sustentabilidade.',
      4: 'Excelente! Você acertou 4 de 5 perguntas e demonstrou ótima compreensão do tema.',
      3: 'Muito bom! Você acertou 3 de 5 perguntas e já domina boa parte do conteúdo.',
      2: 'Você acertou 2 de 5 perguntas. Vale revisar o conteúdo e tentar novamente.',
      1: 'Você acertou 1 de 5 perguntas. Explore o site novamente e tente mais uma vez.',
      0: 'Você ainda não acertou nenhuma. Explore o site novamente e faça uma nova tentativa.'
    };

    quizResult.textContent = `Resultado: ${score}/5. ${feedbacks[score]}`;
    quizResult.classList.add('show');
  });
}

const cardToggles = document.querySelectorAll('.card-toggle');

cardToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.expandable-card');
    const isOpen = card.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('.card-icon').textContent = isOpen ? '−' : '+';
  });
});

const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
  carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
  carouselWrapper.addEventListener('mouseleave', startAutoSlide);
}

updateCarousel();
