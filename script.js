let currentQuestion = 0;
const quizData = [
  {
    text: "What is your skin type?",
    answers: ["Oily", "Dry", "Sensitive", "Combination"],
    hasInfo: true
  },
  {
    text: "What is your top skin concern?",
    answers: ["Itchy, Flaky Skin", "Excessively Oily Skin", "Acne", "Scarring and Hyperpigmentation"],
    hasInfo: false
  }
];
let answers = {};

document.getElementById('hamburger').addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

function goHome() {
  showPage('landing');
}

function startQuiz() {
  currentQuestion = 0;
  answers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
  loadQuestion();
  showPage('quiz');
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById('question-text').textContent = q.text;
  document.getElementById('info-btn').style.display = q.hasInfo ? 'inline' : 'none';
  document.getElementById('info-box').classList.add('hidden');
  const ansDiv = document.getElementById('answers');
  ansDiv.innerHTML = '';
  q.answers.forEach(a => {
    const btn = document.createElement('button');
    btn.textContent = a;
    btn.onclick = () => answerQuestion(a);
    ansDiv.appendChild(btn);
  });
}

document.getElementById('info-btn').addEventListener('click', () => {
  document.getElementById('info-box').classList.toggle('hidden');
});

function answerQuestion(ans) {
  answers[currentQuestion] = ans;
  localStorage.setItem('quizAnswers', JSON.stringify(answers));
  if (currentQuestion + 1 < quizData.length) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showPage('result');
  runConfetti();
}

function showRoutine() {
  showPage('routine');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function runConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];
  const colors = ['#FFFFFF', '#003057', '#0070CE'];
  for (let i = 0; i < 200; i++) {
    particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      color: colors[Math.floor(Math.random()*colors.length)],
      size: Math.random()*4+1, speed: Math.random()*3+1 });
  }
  let t = 0;
  const interval = setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -p.size;
    });
    t+=50;
    if (t > 5000) clearInterval(interval);
  }, 50);
}
