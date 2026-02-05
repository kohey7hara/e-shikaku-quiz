// URLパラメータ (?id=xxx) を取得
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');

// グローバル変数
let currentQuizData = null;
let correctCount = 0;

// 1. データファイルの読み込み処理
if (quizId) {
    const script = document.createElement('script');
    
    // ★ポイント: 末尾に現在時刻(?v=...)をつけることでキャッシュを回避し、常に最新データを読み込む
    script.src = `js/data/${quizId}.js?v=${new Date().getTime()}`;
    
    script.onload = () => {
        // データ読み込み完了後の処理
        if (window.quizData) {
            currentQuizData = window.quizData;
            initApp();
        } else {
            showError('データの形式が正しくありません (window.quizDataが見つかりません)');
        }
    };
    
    script.onerror = () => {
        showError('指定された問題データが見つかりません。<br>URLが正しいか、ファイルがアップロードされているか確認してください。');
    };
    
    document.body.appendChild(script);
} else {
    showError('エラー: URLにIDが指定されていません');
}

// エラー表示用関数
function showError(msg) {
    document.getElementById('quizTitle').innerText = "エラー";
    document.getElementById('cheatSheetContent').innerHTML = `<p style="color:red; font-weight:bold;">${msg}</p>`;
}

// 2. アプリ初期化
function initApp() {
    // タイトルの設定
    document.title = currentQuizData.title;
    document.getElementById('quizTitle').innerText = currentQuizData.title;
    
    // チートシート（要点まとめ）の描画
    const csContent = currentQuizData.cheatSheet || "<p>この単元のまとめは準備中です。</p>";
    document.getElementById('cheatSheetContent').innerHTML = csContent;

    // 問題の描画
    renderQuestions();

    // ★ポイント: MathJaxに「数式を変換して！」と依頼する
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

// 3. タブ切り替え機能
window.switchTab = function(tabName) {
    // 全てのタブとエリアから active クラスを外す
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content-area').forEach(c => c.classList.remove('active'));

    // 指定されたタブをアクティブにする
    if (tabName === 'cheatsheet') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('cheatsheet-area').classList.add('active');
    } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('quiz-area').classList.add('active');
    }
};

// 4. 問題の生成・描画
function renderQuestions() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = ''; // クリア
    
    currentQuizData.questions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';

        // 選択肢ボタンの生成
        let optionsHtml = '<div class="options-container">';
        q.options.forEach((opt, optIndex) => {
            optionsHtml += `<button class="option-btn" onclick="checkAnswer(${index}, ${optIndex}, this)">${optIndex + 1}. ${opt}</button>`;
        });
        optionsHtml += '</div>';

        // カードのHTML組み立て
        card.innerHTML = `
            <span class="category-tag">${q.category}</span>
            <div class="question-text">Q${index + 1}. ${q.question}</div>
            ${optionsHtml}
            <div id="result-${index}" class="result">
                <div class="msg"></div>
                <div class="explanation"><strong>解説:</strong> ${q.explanation}</div>
            </div>
        `;
        container.appendChild(card);
    });
    
    updateScore();
}

// 5. 正誤判定ロジック
window.checkAnswer = function(qIndex, optIndex, btn) {
    const q = currentQuizData.questions[qIndex];
    const resultDiv = document.getElementById(`result-${qIndex}`);
    
    // すでに回答済みの場合は何もしない
    if (resultDiv.style.display === 'block') return;

    // 同じ問題の全ボタンを無効化（連打防止）
    const btns = btn.parentElement.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    const msgDiv = resultDiv.querySelector('.msg');
    
    if (optIndex === q.answer) {
        // 正解の場合
        correctCount++;
        resultDiv.classList.add('correct');
        msgDiv.innerHTML = '<strong>✅ 正解！</strong>';
        btn.style.backgroundColor = '#d4edda';
        btn.style.borderColor = '#c3e6cb';
    } else {
        // 不正解の場合
        resultDiv.classList.add('incorrect');
        msgDiv.innerHTML = `<strong>❌ 不正解...</strong> (正解: ${q.options[q.answer]})`;
        btn.style.backgroundColor = '#f8d7da';
        btn.style.borderColor = '#f5c6cb';
        
        // 正解のボタンを緑色にして教えてあげる
        btns[q.answer].style.backgroundColor = '#d4edda';
        btns[q.answer].style.borderColor = '#c3e6cb';
    }

    // 結果エリアを表示
    resultDiv.style.display = 'block';
    updateScore();

    // ★ポイント: 解説文の中に数式があるかもしれないので、ここでもMathJaxを呼ぶ
    if (window.MathJax && window.MathJax.typesetPromise) {
        // 全体を再変換すると重いので、特定要素だけ変換する手もあるが、
        // 今回は単純化のため全体、もしくは非同期で処理されるためそのままでOK
        MathJax.typesetPromise(); 
    }
};

// スコア更新
function updateScore() {
    const total = currentQuizData.questions.length;
    document.getElementById('scoreBoard').innerText = `正解数: ${correctCount} / ${total}`;
}
