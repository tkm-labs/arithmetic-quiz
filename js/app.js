let questionEl = document.getElementById('question');
let answerInput = document.getElementById('answer');
let resultEl = document.getElementById('result');
let okBtn = document.getElementById('ok-btn');
let progressEl = document.getElementById('progress');
let currentQuestion = 0;
let score = 0;
let correctAnswer;
const calculator = document.getElementById('calculator');
const calcButtons = document.querySelectorAll('.calc-btn');
const retryBtn = document.getElementById('retry-btn');

// ランダム問題生成
function generationQuestion() {
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    let operator = Math.random() < 0.5 ? '+' : '-';
    if (operator === '-' && num1 < num2) [num1, num2] = [num2, num1];

    questionEl.textContent = `${num1} ${operator} ${num2} = ?`;
    correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

    answerInput.value = '';
    resultEl.textContent = '';
    progressEl.textContent = `${currentQuestion + 1} / 10 問目`;
}

// 判定
okBtn.addEventListener('click', () => {
  let userAnswer = parseInt(answerInput.value, 10);
  if(isNaN(userAnswer)){
    resultEl.textContent = '数字を入力しよう';
    return;
  }

  if (userAnswer === correctAnswer) {
    resultEl.textContent = "✅ 正解！";
    score++;
  } else {
    resultEl.textContent = `❌ 不正解！正解は ${correctAnswer}`;
  }

  currentQuestion++;

  if(currentQuestion < 10){
    setTimeout(generationQuestion, 1000);
  } else {
    setTimeout(showScore, 1000);
  }
});

// 終了時
function showScore (){
    questionEl.textContent = "🎉 終了 🎉";
    answerInput.style.display = 'none';
    okBtn.style.display = 'none';
    resultEl.textContent = `10問中 ${score} 問正解でした`;
    progressEl.textContent = '';

    calculator.style.setProperty('display', 'none', 'important');
    retryBtn.style.setProperty('display', 'block', 'important');
}

// 電卓ボタン処理
calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;
        if(value === '←'){
            answerInput.value = answerInput.value.slice(0, -1);
        } else if (value === 'OK'){
            // 判定はOKボタンのイベントに任せる
        } else {
            answerInput.value += value;
        }
    });
});

// もう一回やる
function startNewProblem (){
    currentQuestion = 0;
    score = 0;

    answerInput.style.display = 'inline-block';
    okBtn.style.display = 'inline-block';

    calculator.style.setProperty('display', 'flex', 'important');
    retryBtn.style.setProperty('display', 'none', 'important');

    generationQuestion();
}

retryBtn.addEventListener('click', () => {
    startNewProblem();
});

// 初期問題
generationQuestion();