// URLの ?id=〇〇 を取得
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');

let currentQuizData = null;
let correctCount = 0;

// データファイルの読み込み
if (quizId) {
    const script = document.createElement('script');
    script.src = `js/data/${quizId}.js`; // ここでデータを指定
    script.onload = () => {
        if (window.quizData) {
            currentQuizData = window.quizData;
            initApp();
        } else {
            alert('データの形式が正しくありません');
        }
    };
    script.onerror = () => {
        document.getElementById('quizTitle').innerText = "データが見つかりません";
        document.getElementById('cheatSheetContent').innerHTML = "<p>指定されたファイルが存在しません。<br>URLを確認してください。</p>";
    };
    document.body.appendChild(script);
}

// 初期化処理
function initApp() {
    document.title = currentQuizData.title;
    document.getElementById('quizTitle').innerText = currentQuizData.title;
    
    // チートシート表示 (ない場合はメッセージ)
    const csContent = currentQuizData.cheatSheet || "<p>この単元のまとめは準備中です。</p>";
    document.getElementById('cheatSheetContent').innerHTML = csContent;

    renderQuestions();
}

// タブ切り替え
window.switchTab = function(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content-area').forEach(c => c.classList.remove('active'));

    if (tabName === 'cheatsheet') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('cheatsheet-area').classList.add('active');
    } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('quiz-area').classList.add('active');
    }
};

// 問題描画
function renderQuestions() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    
    currentQuizData.questions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';

        let optionsHtml = '';
        q.options.forEach((opt, optIndex) => {
            optionsHtml += `<button class="option-btn" onclick="checkAnswer(${index}, ${optIndex}, this)">${optIndex + 1}. ${opt}</button>`;
        });

        card.innerHTML = `
            <span class="category-tag">${q.category}</span>
            <div class="question-text">Q${index + 1}. ${q.question}</div>
            <div>${optionsHtml}</div>
            <div id="result-${index}" class="result">
                <div class="msg"></div>
                <div class="explanation"><strong>解説:</strong> ${q.explanation}</div>
            </div>
        `;
        container.appendChild(card);
    });
    
    updateScore();
}

// 正誤判定
window.checkAnswer = function(qIndex, optIndex, btn) {
    const q = currentQuizData.questions[qIndex];
    const resultDiv = document.getElementById(`result-${qIndex}`);
    
    // 回答済みなら終了
    if (resultDiv.style.display === 'block') return;

    const btns = btn.parentElement.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true); // 連打防止

    const msgDiv = resultDiv.querySelector('.msg');
    
    if (optIndex === q.answer) {
        correctCount++;
        resultDiv.classList.add('correct');
        msgDiv.innerHTML = '<strong>✅ 正解！</strong>';
        btn.style.backgroundColor = '#d4edda';
        btn.style.borderColor = '#c3e6cb';
    } else {
        resultDiv.classList.add('incorrect');
        msgDiv.innerHTML = `<strong>❌ 不正解...</strong> (正解: ${q.options[q.answer]})`;
        btn.style.backgroundColor = '#f8d7da';
        btn.style.borderColor = '#f5c6cb';
        // 正解ボタンを緑に
        btns[q.answer].style.backgroundColor = '#d4edda';
    }

    resultDiv.style.display = 'block';
    updateScore();
};

function updateScore() {
    document.getElementById('scoreBoard').innerText = `正解数: ${correctCount} / ${currentQuizData.questions.length}`;
}
