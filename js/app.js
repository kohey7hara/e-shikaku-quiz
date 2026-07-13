const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');
const STORAGE_KEY = 'e-shikaku-progress-v2';

let currentQuizData = null;
let sessionQuestions = [];
let currentIndex = 0;
let correctCount = 0;
let sessionAnswers = [];
let startedAt = null;
let timerId = null;

const shuffle = items => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const questionKey = q => `${quizId}:${q.id || hashText(q.question)}`;
const hashText = text => {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
};

function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (_) { return {}; }
}

function saveAnswer(q, isCorrect) {
    const progress = loadProgress();
    const key = questionKey(q);
    const prior = progress[key] || { attempts: 0, correct: 0, wrong: 0 };
    prior.attempts += 1;
    prior.correct += isCorrect ? 1 : 0;
    prior.wrong += isCorrect ? 0 : 1;
    prior.lastCorrect = isCorrect;
    prior.lastSeen = new Date().toISOString();
    prior.category = q.category;
    prior.quizId = quizId;
    progress[key] = prior;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

if (quizId) {
    const script = document.createElement('script');
    script.src = `js/data/${quizId}.js?v=20260713-visual`;
    script.onload = () => window.quizData ? (currentQuizData = window.quizData, initApp()) : showError('問題データの形式が正しくありません。');
    script.onerror = () => showError('指定された問題データが見つかりません。');
    document.body.appendChild(script);
} else {
    showError('URLにドリルIDが指定されていません。');
}

function showError(msg) {
    document.getElementById('quizTitle').textContent = 'エラー';
    document.getElementById('cheatSheetContent').innerHTML = `<p class="error-message">${msg}</p>`;
}

function initApp() {
    document.title = currentQuizData.title;
    document.getElementById('quizTitle').textContent = currentQuizData.title;
    document.getElementById('cheatSheetContent').innerHTML = currentQuizData.cheatSheet || '<p>要点まとめは準備中です。</p>';
    renderSetup();
    typeset(document.getElementById('cheatSheetContent'));
}

function renderSetup() {
    const progress = loadProgress();
    const questions = currentQuizData.questions;
    const attempted = questions.filter(q => progress[questionKey(q)]?.attempts).length;
    const weak = questions.filter(q => progress[questionKey(q)]?.lastCorrect === false).length;
    const visual = questions.filter(q => q.kind === '図表・長文').length;
    document.getElementById('sessionSetup').innerHTML = `
        <div class="setup-card">
            <p class="eyebrow">SESSION SELECT</p>
            <h2>今日はどう鍛える？</h2>
            <div class="setup-stats">
                <span><strong>${questions.length}</strong> 収録問題</span>
                <span><strong>${attempted}</strong> 挑戦済み</span>
                <span><strong>${weak}</strong> 要復習</span>
            </div>
            <div class="mode-grid">
                <button onclick="startQuiz('sprint')"><strong>10問スプリント</strong><small>約12分・毎日の仕上げ</small></button>
                <button onclick="startQuiz('full')"><strong>全問チャレンジ</strong><small>問題順・選択肢をシャッフル</small></button>
                ${visual ? `<button onclick="startQuiz('visual')"><strong>図表・長文演習</strong><small>${visual}問・本試験型を集中演習</small></button>` : ''}
                <button onclick="startQuiz('weak')" ${weak ? '' : 'disabled'}><strong>誤答だけ復習</strong><small>${weak ? `${weak}問を再演習` : '誤答すると利用できます'}</small></button>
            </div>
            <p class="pace-note">本試験ペースの目安：1問72秒。迷ったら消去法で仮決めし、時間を使いすぎない。</p>
        </div>`;
}

window.switchTab = function(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content-area').forEach(c => c.classList.remove('active'));
    const quiz = tabName === 'quiz';
    document.querySelectorAll('.tab')[quiz ? 1 : 0].classList.add('active');
    document.getElementById(quiz ? 'quiz-area' : 'cheatsheet-area').classList.add('active');
};

window.startQuiz = function(mode) {
    const progress = loadProgress();
    let pool = [...currentQuizData.questions];
    if (mode === 'weak') pool = pool.filter(q => progress[questionKey(q)]?.lastCorrect === false);
    if (mode === 'visual') pool = pool.filter(q => q.kind === '図表・長文');
    pool = shuffle(pool);
    if (mode === 'sprint') pool = pool.slice(0, Math.min(10, pool.length));
    if (!pool.length) return;
    sessionQuestions = pool;
    currentIndex = 0;
    correctCount = 0;
    sessionAnswers = [];
    startedAt = Date.now();
    document.getElementById('sessionSetup').hidden = true;
    document.getElementById('quizContainer').hidden = false;
    document.getElementById('scoreBoard').hidden = false;
    clearInterval(timerId);
    timerId = setInterval(updateHeader, 1000);
    renderCurrentQuestion();
};

function renderCurrentQuestion() {
    const q = sessionQuestions[currentIndex];
    const options = shuffle(q.options.map((text, originalIndex) => ({ text, originalIndex })));
    const difficulty = q.difficulty || '標準';
    const kind = q.kind || (q.question.includes('計算') ? '計算' : '理解');
    document.getElementById('quizContainer').innerHTML = `
        <article class="question-card">
            <div class="question-meta"><span class="category-tag">${q.category}</span><span>${kind}</span><span>${difficulty}</span></div>
            <div class="question-text">Q${currentIndex + 1}. ${q.question}</div>
            <div class="options-container">
                ${options.map((opt, i) => `<button class="option-btn" data-original="${opt.originalIndex}" onclick="checkAnswer(${opt.originalIndex}, this)"><b>${String.fromCharCode(65 + i)}</b>${opt.text}</button>`).join('')}
            </div>
            <div id="result" class="result" aria-live="polite"></div>
        </article>`;
    updateHeader();
    typeset(document.getElementById('quizContainer'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.checkAnswer = function(originalIndex, btn) {
    const result = document.getElementById('result');
    if (result.dataset.answered) return;
    result.dataset.answered = 'true';
    const q = sessionQuestions[currentIndex];
    const isCorrect = originalIndex === q.answer;
    if (isCorrect) correctCount += 1;
    sessionAnswers.push({ q, isCorrect });
    saveAnswer(q, isCorrect);

    document.querySelectorAll('.option-btn').forEach(button => {
        button.disabled = true;
        if (Number(button.dataset.original) === q.answer) button.classList.add('answer-correct');
    });
    if (!isCorrect) btn.classList.add('answer-wrong');
    result.className = `result ${isCorrect ? 'correct' : 'incorrect'}`;
    result.innerHTML = `
        <div class="result-title">${isCorrect ? '正解' : '不正解'} <span>${isCorrect ? '判断は合っています。根拠まで固定しましょう。' : `正解：${q.options[q.answer]}`}</span></div>
        <div class="explanation"><strong>なぜそうなるか</strong>${q.explanation}</div>
        ${q.trap ? `<div class="trap"><strong>試験の罠</strong>${q.trap}</div>` : ''}
        <button class="next-btn" onclick="nextQuestion()">${currentIndex + 1 === sessionQuestions.length ? '結果を見る' : '次の問題へ'}</button>`;
    updateHeader();
    typeset(result);
};

window.nextQuestion = function() {
    currentIndex += 1;
    if (currentIndex >= sessionQuestions.length) finishQuiz();
    else renderCurrentQuestion();
};

function updateHeader() {
    if (!startedAt) return;
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    const pace = Math.floor(elapsed / Math.max(1, sessionAnswers.length));
    const pct = Math.round((sessionAnswers.length / sessionQuestions.length) * 100);
    document.getElementById('scoreBoard').innerHTML = `
        <div class="progress-track"><i style="width:${pct}%"></i></div>
        <span>${Math.min(currentIndex + 1, sessionQuestions.length)} / ${sessionQuestions.length}</span>
        <span>正解 ${correctCount}</span>
        <span>経過 ${formatTime(elapsed)}</span>
        <span class="${pace > 72 ? 'pace-over' : ''}">平均 ${sessionAnswers.length ? pace : 0}秒</span>`;
}

function finishQuiz() {
    clearInterval(timerId);
    const total = sessionQuestions.length;
    const rate = Math.round(correctCount / total * 100);
    const byCategory = {};
    sessionAnswers.forEach(({ q, isCorrect }) => {
        byCategory[q.category] ||= { correct: 0, total: 0 };
        byCategory[q.category].total += 1;
        byCategory[q.category].correct += isCorrect ? 1 : 0;
    });
    const weakest = Object.entries(byCategory).sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total).slice(0, 3);
    const verdict = rate >= 80 ? '合格圏の精度' : rate >= 70 ? '合格圏まであと一段' : '弱点の再固定が必要';
    document.getElementById('quizContainer').innerHTML = `
        <section class="finish-card">
            <p class="eyebrow">SESSION COMPLETE</p>
            <div class="score-ring" style="--score:${rate * 3.6}deg"><strong>${rate}<small>%</small></strong></div>
            <h2>${verdict}</h2>
            <p>${correctCount} / ${total} 問正解。目標は、初見・時間制限ありで安定して80%以上です。</p>
            <div class="category-results">
                ${Object.entries(byCategory).map(([name, s]) => `<div><span>${name}</span><b>${s.correct}/${s.total}</b></div>`).join('')}
            </div>
            ${weakest.length ? `<div class="weak-advice"><strong>次に優先する領域</strong>${weakest.map(([name]) => name).join(' → ')}</div>` : ''}
            <div class="finish-actions"><button onclick="restartSetup()">別モードを選ぶ</button><button onclick="startQuiz('weak')">今回を含む誤答を復習</button></div>
        </section>`;
    document.getElementById('scoreBoard').hidden = true;
    typeset(document.getElementById('quizContainer'));
}

window.restartSetup = function() {
    startedAt = null;
    document.getElementById('quizContainer').hidden = true;
    document.getElementById('sessionSetup').hidden = false;
    renderSetup();
};

function formatTime(sec) {
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

function typeset(element, attempt = 0) {
    if (!element?.isConnected) return;
    if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([element]).catch(() => {});
        return;
    }
    if (attempt < 30) setTimeout(() => typeset(element, attempt + 1), 100);
}
