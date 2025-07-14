const quizData = [
  {
    text: "What is your skin type?",
    answers: ["Oily","Dry","Sensitive","Combination"],
    hasInfo:true
  },
  {
    text: "What is your top skin concern?",
    answers:["Itchy, Flaky Skin","Excessively Oily Skin","Acne","Scarring and Hyperpigmentation"],
    hasInfo:false
  }
];

let current=0;

if(document.getElementById('quiz')){
  loadQ();
  document.getElementById('info-btn').addEventListener('click',()=>{
    document.getElementById('info-box').classList.toggle('hidden');
  });
}

function loadQ(){
  const q=quizData[current];
  document.getElementById('question-text').textContent=q.text;
  document.getElementById('info-btn').style.display=q.hasInfo?'inline':'none';
  document.getElementById('info-box').classList.add('hidden');
  const ansDiv=document.getElementById('answers');
  ansDiv.innerHTML='';
  q.answers.forEach(a=>{
    const b=document.createElement('button');
    b.textContent=a;
    b.onclick=()=>answer(a);
    ansDiv.appendChild(b);
  });
}

function answer(){
  current++;
  if(current<quizData.length) loadQ();
  else window.location.href='routine.html';
}
