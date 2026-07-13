window.quizData = {
    title: "4-（５）音声処理：波形から文字列まで",
    cheatSheet: `
        <style>
            .audio-flow { display:flex; align-items:center; justify-content:center; gap:7px; flex-wrap:wrap; margin:15px 0; }
            .audio-node { width:130px; min-height:74px; display:grid; place-items:center; text-align:center; border:2px solid #2e86c1; border-radius:10px; background:#eef7fd; padding:8px; }
            .audio-node strong { display:block; color:#1769aa; }
            .audio-arrow { color:#777; font-size:1.3em; font-weight:bold; }
            .sample-wrap { overflow-x:auto; padding:8px 0; }
            .sample-line { position:relative; height:120px; min-width:600px; border-bottom:2px solid #777; background:repeating-linear-gradient(90deg,transparent 0 39px,#dfe8ef 40px); }
            .wave { position:absolute; left:0; right:0; top:38px; text-align:center; color:#3498db; letter-spacing:5px; font-size:2em; white-space:nowrap; }
            .sample-dots { position:absolute; inset:0; display:flex; justify-content:space-around; align-items:center; }
            .sample-dots i { width:10px; height:10px; border-radius:50%; background:#e74c3c; display:block; }
            .dilation-row { display:flex; align-items:center; justify-content:center; gap:7px; margin:7px 0; }
            .dilation-row span { width:24px; height:24px; display:grid; place-items:center; border-radius:50%; background:#e8eef5; }
            .dilation-row span.on { background:#8e44ad; color:white; }
            .ctc-row { display:flex; gap:5px; justify-content:center; align-items:center; flex-wrap:wrap; margin:10px 0; }
            .ctc-token { border:2px solid #27ae60; background:#effaf3; padding:7px 10px; border-radius:7px; font-weight:bold; }
            .ctc-blank { color:#999; border-style:dashed; background:#fafafa; }
        </style>

        <p><strong>全体像：</strong>音声は空気の振動です。コンピュータへ取り込み、時間ごとの周波数成分へ変換し、モデルが音や文字列を予測します。</p>
        <div class="audio-flow">
            <div class="audio-node"><strong>① 波形</strong>連続した空気振動</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>② 標本化</strong>一定間隔で数値化</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>③ STFT</strong>短時間ごとの周波数</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>④ メル/MFCC</strong>人の聴覚に近い特徴</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>⑤ モデル</strong>認識・合成</div>
        </div>

        <h3>■ 1. サンプリング定理：1周期を最低2点で測る</h3>
        <div class="sample-wrap"><div class="sample-line"><div class="wave">∿ ∿ ∿ ∿ ∿ ∿ ∿</div><div class="sample-dots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>
        <p>最高周波数 $f_{max}$ を失わず取り込むには、サンプリング周波数 $f_s\\ge2f_{max}$ が必要です。$f_s/2$ を<strong>ナイキスト周波数</strong>と呼びます。</p>
        <p><strong>例：</strong>8kHzまで含む音声 → 理論上は16kHz以上で標本化。足りないと高い音が低い音へ化ける<strong>エイリアシング</strong>が起きます。</p>

        <h3>■ 2. STFT：短い窓に切って、音の変化も残す</h3>
        <div class="audio-flow">
            <div class="audio-node"><strong>長い波形</strong>いつ何が鳴った？</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>窓をずらす</strong>短区間に分割</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>各窓でFFT</strong>周波数へ変換</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>スペクトログラム</strong>時間 × 周波数 × 強さ</div>
        </div>
        <p>短い窓は時間変化に強いが周波数分解能が粗く、長い窓は周波数を細かく見られる一方で時間変化がぼやけます。窓関数は区間端の不連続を和らげます。</p>

        <h3>■ 3. メル尺度とMFCC</h3>
        <div class="audio-flow">
            <div class="audio-node"><strong>振幅スペクトル</strong>周波数ごとの強さ</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>メルフィルタ</strong>高域ほど粗くまとめる</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>対数</strong>音量感覚へ近づける</div><span class="audio-arrow">→</span>
            <div class="audio-node"><strong>DCT</strong>MFCCへ圧縮</div>
        </div>
        <p>人は低い周波数差には敏感、高い周波数差には鈍感です。メル尺度はこの知覚に合わせます。MFCCはメルスペクトログラムをさらにDCTし、音色・発話の特徴をコンパクトに表します。</p>

        <h3>■ 4. WaveNet：未来を見ず、広い過去を見る</h3>
        <p>Dilated Causal Convolutionは未来を参照せず、層が深くなるほど間隔を広げて過去を見ます。</p>
        <div class="dilation-row"><strong>d=1</strong><span class="on">●</span><span class="on">●</span><span class="on">●</span><span>○</span><span>○</span><span>○</span><span>○</span></div>
        <div class="dilation-row"><strong>d=2</strong><span class="on">●</span><span>○</span><span class="on">●</span><span>○</span><span class="on">●</span><span>○</span><span>○</span></div>
        <div class="dilation-row"><strong>d=4</strong><span class="on">●</span><span>○</span><span>○</span><span>○</span><span class="on">●</span><span>○</span><span>○</span></div>
        <p>穴を空けるように見るため、パラメータを急増させず受容野を広げられます。GTUは $tanh$ と $sigmoid$ の積で情報をゲートします。</p>

        <h3>■ 5. CTC：フレームと文字の位置合わせを自動化</h3>
        <div class="ctc-row"><span class="ctc-token">ね</span><span class="ctc-token">ね</span><span class="ctc-token ctc-blank">blank</span><span class="ctc-token">こ</span><span class="ctc-token">こ</span></div>
        <div style="text-align:center;font-weight:bold;">連続重複をまとめ、blankを除く ↓</div>
        <div class="ctc-row"><span class="ctc-token">ね</span><span class="ctc-token">こ</span></div>
        <p>音声フレーム数と文字数が違っても、全ての可能な位置合わせの確率を合計して学習できます。連続する同じ文字を区別したい場合は間にblankが必要です。</p>
    `,
    questions: [
        { id:"audio-sampling-nyquist", category:"サンプリング定理", question:"最高周波数8kHzの信号を理論上失わず標本化する最低サンプリング周波数はどれか。", options:["16kHz", "8kHz", "4kHz", "64kHz"], answer:0, explanation:"サンプリング定理より最高周波数の2倍以上が必要なので16kHzです。" },
        { id:"audio-nyquist-frequency", category:"ナイキスト周波数", question:"サンプリング周波数44.1kHzのとき、ナイキスト周波数はいくつか。", options:["22.05kHz", "44.1kHz", "88.2kHz", "11.025kHz"], answer:0, explanation:"ナイキスト周波数は $f_s/2$ なので22.05kHzです。" },
        { id:"audio-aliasing", category:"エイリアシング", question:"サンプリング周波数が不足したときに起きる現象として正しいものはどれか。", options:["高周波成分が別の低周波に見える", "音量が必ず0になる", "文字列が自動生成される", "周波数分解能が無限大になる"], answer:0, explanation:"ナイキスト周波数を超える成分が折り返され、存在しない低い周波数として観測されます。" },
        { id:"audio-stft-purpose", category:"STFT", question:"STFTを使う主な目的はどれか。", options:["時間と周波数の両方の情報を得る", "音声を必ず文章へ変換する", "サンプリング周波数を0にする", "モデルの勾配を計算する"], answer:0, explanation:"短い時間窓ごとにフーリエ変換し、いつ・どの周波数が強いかを表します。" },
        { id:"audio-window-tradeoff", category:"STFT(窓幅)", question:"STFTの窓を長くした場合の一般的な変化はどれか。", options:["周波数分解能は上がるが、時間分解能は下がる", "時間・周波数分解能が両方無限に上がる", "周波数情報が消える", "必ずエイリアシングが起きる"], answer:0, explanation:"長い区間を見ると周波数を細かく区別できますが、短時間の変化はぼやけます。" },
        { id:"audio-window-function", category:"窓関数", question:"STFTでHann窓などの窓関数を掛ける主な理由はどれか。", options:["切り出した区間端の不連続によるスペクトル漏れを抑える", "音声を二値化する", "文字数を揃える", "未来フレームを隠す"], answer:0, explanation:"区間を突然切ると端で不連続になり、周波数成分が広がるスペクトル漏れが起きます。窓関数は端を滑らかにします。" },
        { id:"audio-spectrogram-axis", category:"スペクトログラム", question:"一般的なスペクトログラムが表す3要素はどれか。", options:["時間・周波数・強度", "高さ・幅・クラスID", "状態・行動・報酬", "Q・K・V"], answer:0, explanation:"横軸が時間、縦軸が周波数、色や濃さがその成分の強度を表します。" },
        { id:"audio-mel", category:"メル尺度", question:"メル尺度が人の聴覚に合わせて行う変換として正しいものはどれか。", options:["高周波側の周波数差を相対的に圧縮する", "全周波数を同じ値にする", "時間軸を逆転する", "振幅をone-hot化する"], answer:0, explanation:"人は高域の細かな周波数差に鈍いため、高周波側を圧縮した知覚尺度を使います。" },
        { id:"audio-mfcc-flow", category:"MFCC", question:"MFCCを作る代表的な流れとして正しいものはどれか。", options:["スペクトル → メルフィルタバンク → 対数 → DCT", "文字列 → Softmax → IoU", "画像 → RPN → NMS", "報酬 → Q学習 → DCT"], answer:0, explanation:"メルフィルタバンクの対数エネルギーへDCTを適用し、コンパクトなケプストラム係数を得ます。" },
        { id:"audio-wavenet-causal", category:"WaveNet", question:"WaveNetのCausal Convolutionで保証されることはどれか。", options:["時刻tの出力が未来t+1以降の入力を参照しない", "全ての時刻を未来から処理する", "周波数変換が不要になる", "出力が必ず文字列になる"], answer:0, explanation:"自己回帰生成で未来をカンニングしないよう、現在以前の入力だけを参照します。" },
        { id:"audio-dilated", category:"Dilated Convolution", question:"Dilated Convolutionの主な利点はどれか。", options:["カーネル要素の間隔を広げ、少ない層・パラメータで受容野を広げる", "未来の入力だけを見る", "チャネルを必ず1にする", "サンプリング周波数を上げる"], answer:0, explanation:"dilationを増やして離れた過去を参照し、長い依存関係を効率的に扱います。" },
        { id:"audio-gtu", category:"GTU", question:"WaveNetのGated Tanh Unit（GTU）の基本形として近いものはどれか。", options:["$tanh(a)\\odot sigmoid(b)$", "$softmax(a+b)$", "$ReLU(a)-ReLU(b)$", "$a/b$ のみ"], answer:0, explanation:"tanhの候補情報へsigmoidの0〜1ゲートを掛け、通す情報量を制御します。" },
        { id:"audio-ctc-purpose", category:"CTC", question:"CTCが音声認識で解決する主な課題はどれか。", options:["音声フレームと出力文字の位置合わせが未知でも学習できる", "録音時間を必ず半分にする", "サンプリング定理を不要にする", "画像の物体領域を提案する"], answer:0, explanation:"フレーム単位ラベルなしで、可能なアラインメント経路を合計して系列ラベルの確率を計算します。" },
        { id:"audio-ctc-collapse", category:"CTC(デコード)", question:"CTC出力「ね, ね, blank, こ, こ」をcollapseすると何になるか。", options:["ねこ", "ねねここ", "ねねこ", "こね"], answer:0, explanation:"連続重複を1つにまとめてからblankを除くため「ねこ」です。" },
        { id:"audio-beam-search", category:"ビームサーチ", question:"音声認識のビームサーチの説明として正しいものはどれか。", options:["各時刻で上位の複数候補系列を保持し、greedyより広く探索する", "全候補を必ず完全列挙する", "常に最上位1候補だけ残す", "モデルを再学習する"], answer:0, explanation:"ビーム幅の数だけ有望な仮説を残します。幅1はほぼgreedyで、幅を増やすと探索は広がりますが計算も増えます。" }
    ]
};
