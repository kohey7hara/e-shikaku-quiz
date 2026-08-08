window.quizData = {
    title: "3-（６）Transformer：Attention機構",
    
    cheatSheet: `
        <style>
            .concept-container { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px; }
            .concept-box { border: 1px solid #ccc; border-radius: 8px; padding: 10px; width: 45%; min-width: 300px; background: #fff; }
            .flow-vertical { display: flex; flex-direction: column; align-items: center; gap: 5px; }
            .step-box { border: 2px solid #333; padding: 8px; border-radius: 5px; background: #fff; width: 80%; text-align: center; font-size: 0.85em; position: relative; }
            .arrow-down { color: #555; font-weight: bold; }
            
            /* 色分け */
            .bg-q { background-color: #fceceb; border-color: #e74c3c; color: #c0392b; }
            .bg-k { background-color: #ebf5fb; border-color: #3498db; color: #2980b9; }
            .bg-v { background-color: #eafaf1; border-color: #27ae60; color: #27ae60; }
            .bg-attn { background-color: #f9e79f; border-color: #f1c40f; }
            
            .calc-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; text-align: center; font-size: 0.8em; margin: 10px 0; }
            .qkv-label { font-weight: bold; padding: 5px; border-radius: 4px; }
            
            .analogy-table { width: 100%; border-collapse: collapse; font-size: 0.9em; margin-top: 10px; }
            .analogy-table th { background: #eee; padding: 5px; border: 1px solid #ccc; }
            .analogy-table td { padding: 5px; border: 1px solid #ccc; }
            .tr-exam-core { margin: 12px 0 20px; padding: 14px 16px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .tr-formula { margin: 7px 0; padding: 9px 11px; border: 1px solid #c8dbee; border-radius: 8px; background: #f3f8fd; color: #123f68; text-align: center; overflow-x: auto; }
            .tr-formula mjx-container { margin: 0 !important; }
            .tr-table-wrap { overflow-x: auto; }
            .tr-comparison td:nth-child(3) { min-width: 300px; }
            .tr-concept-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 12px 0 20px; }
            .tr-concept-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 10px; background: #fff; text-align: center; }
            .tr-concept-card > strong { display: block; color: #123f68; }
            .tr-concept-svg { display: block; width: 100%; max-width: 330px; height: 130px; margin: 5px auto 8px; }
            .tr-concept-caption { font-size: 0.86em; line-height: 1.55; color: #334e68; }
            .tr-svg-label { font-size: 11px; fill: #334e68; font-weight: 700; }
            .tr-svg-note { font-size: 9px; fill: #627d98; }
            .tr-answer { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #27ae60; border-radius: 7px; background: #eafaf1; line-height: 1.7; }
            .tr-warning { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #e74c3c; border-radius: 7px; background: #fff3f1; line-height: 1.7; }
            .tr-badge { display: inline-block; margin-right: 5px; padding: 2px 7px; border-radius: 999px; background: #e74c3c; color: #fff; font-size: 0.75em; font-weight: 800; }
            @media (max-width: 760px) {
                .tr-concept-grid { grid-template-columns: 1fr; }
                .concept-box { width: auto; min-width: 0; }
                .calc-grid { grid-template-columns: 1fr; }
            }
        </style>

        <h3>■ 2026シラバス：試験の6点セット</h3>
        <div class="tr-exam-core">
            <strong>① Self-Attention：</strong>同じ系列から $Q,K,V$ を作る。<br>
            <strong>② Scaled Dot-Product：</strong>$QK^T$ → $\\sqrt{d_k}$ で割る → Mask → Softmax → $V$。<br>
            <strong>③ Source–Target Attention：</strong>Decoderの $Q$ でEncoderの $K,V$ を検索する。<br>
            <strong>④ Masked Attention：</strong>生成時に未来を見せない。Padding Maskとは目的が違う。<br>
            <strong>⑤ Multi-Head：</strong>複数の部分空間でAttentionし、連結して $W^O$ で統合する。<br>
            <strong>⑥ Positional Encoding：</strong>Attention単体にない順序情報を入力へ加える。
        </div>
        <div class="tr-table-wrap">
            <table class="tr-comparison">
                <tr><th>出題形式</th><th>まず見るもの</th><th>解き方</th></tr>
                <tr><td><span class="tr-badge">最重要</span>計算</td><td>$d_k$、Score、Mask、Softmax、$V$</td><td>式を一気に計算せず、5段階に分ける。</td></tr>
                <tr><td><span class="tr-badge">最重要</span>配線</td><td>$Q,K,V$ の入力元</td><td>Selfは同じ入力元、CrossはQだけDecoder。</td></tr>
                <tr><td><span class="tr-badge">最重要</span>形状</td><td>系列長と各ベクトル次元</td><td>$QK^T$ の行数はQuery数、列数はKey数。</td></tr>
            </table>
        </div>

        <h3>■ Transformerとは？（RNNとの違い）</h3>
        <p>「Attention（注意機構）だけで十分だ」という論文 (Attention Is All You Need) から生まれました。</p>
        <div class="concept-container">
            <div class="concept-box">
                <strong>従来のRNN / LSTM</strong><br>
                <div style="margin-top:5px; text-align:center;">
                    [I] → [love] → [AI]<br>
                    <span style="color:red; font-size:0.8em;">順番に計算（遅い・忘れる）</span>
                </div>
                <ul>
                    <li>単語を<strong>1つずつ</strong>処理する。</li>
                    <li>長文になると過去を忘れる。</li>
                    <li>並列計算ができない（GPU活用度低）。</li>
                </ul>
            </div>
            <div class="concept-box" style="border: 2px solid #3498db;">
                <strong>Transformer</strong><br>
                <div style="margin-top:5px; text-align:center;">
                    [I, love, AI] (一括入力)<br>
                    <span style="color:blue; font-size:0.8em;">並列計算（速い・全部見る）</span>
                </div>
                <ul>
                    <li>文章全体を<strong>一度に</strong>処理する。</li>
                    <li>離れた単語の関係も一瞬で捉える。</li>
                    <li><strong>並列計算</strong>が得意（高速）。</li>
                </ul>
            </div>
        </div>

        <h3>■ Attention (Q, K, V) の直感的イメージ</h3>
        <p>「検索エンジン」や「辞書」に例えられます。</p>
        
        <div class="calc-grid">
            <div class="qkv-label bg-q">Query (Q)<br>「検索ワード」</div>
            <div class="qkv-label bg-k">Key (K)<br>「見出し・タグ」</div>
            <div class="qkv-label bg-v">Value (V)<br>「本文・中身」</div>
        </div>

        <table class="analogy-table">
            <tr><th>項目</th><th>役割</th><th>図書館での例え</th></tr>
            <tr>
                <td><strong>Query</strong></td>
                <td>知りたい情報（起点）。</td>
                <td>「AIの歴史を知りたい」（検索者の意図）</td>
            </tr>
            <tr>
                <td><strong>Key</strong></td>
                <td>検索対象との関連度を測るための指標。</td>
                <td>本の「タイトル」や「背表紙」</td>
            </tr>
            <tr>
                <td><strong>Value</strong></td>
                <td>最終的に取り出す情報。</td>
                <td>本の「中身（文章）」</td>
            </tr>
        </table>
        <p style="font-size:0.8em; margin-top:5px;">
            ※ $Q$ と $K$ の類似度（内積）を計算し、その類似度に応じて $V$ を混ぜ合わせます。<br>
            <strong>「関連する $V$ だけを強く取り込む」</strong> 仕組みです。
        </p>

        <h3>■ 行列の形：$QK^T$ は「誰が誰を見るか」</h3>
        <div class="tr-concept-card">
            <svg class="tr-concept-svg" viewBox="0 0 320 130" role="img" aria-label="QとKの積でトークン対トークンのAttentionスコア行列を作りVと掛ける">
                <rect x="8" y="28" width="54" height="68" rx="5" fill="#fceceb" stroke="#e74c3c" stroke-width="2"/><text x="29" y="53" class="tr-svg-label">Q</text><text x="17" y="72" class="tr-svg-note">n × dₖ</text>
                <text x="70" y="66" class="tr-svg-label">×</text>
                <rect x="86" y="39" width="68" height="46" rx="5" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/><text x="113" y="57" class="tr-svg-label">Kᵀ</text><text x="100" y="74" class="tr-svg-note">dₖ × n</text>
                <text x="162" y="66" class="tr-svg-label">＝</text>
                <rect x="182" y="24" width="72" height="76" rx="5" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                <g stroke="#ead7aa"><path d="M200 24 V100 M218 24 V100 M236 24 V100 M182 43 H254 M182 62 H254 M182 81 H254"/></g>
                <text x="194" y="116" class="tr-svg-note">Score n × n</text>
                <path d="M258 62 H278" stroke="#627d98" stroke-width="2"/><path d="M278 62 l-6 -4 v8 z" fill="#627d98"/>
                <rect x="282" y="31" width="31" height="62" rx="4" fill="#eafaf1" stroke="#27ae60"/><text x="293" y="55" class="tr-svg-label">V</text><text x="285" y="75" class="tr-svg-note">n×dᵥ</text>
                <text x="98" y="15" class="tr-svg-note">各行：1つのQueryが全Keyをどれだけ見るか</text>
            </svg>
            <div class="tr-concept-caption">Self-Attentionで系列長が $n$ ならScoreは $n\\times n$。Cross-AttentionでQuery長 $m$、Encoder長 $n$ なら $m\\times n$。</div>
        </div>
        <div class="tr-table-wrap">
            <table class="tr-comparison">
                <tr><th>行列</th><th>形</th><th>意味</th></tr>
                <tr><td>$Q=XW^Q$</td><td>$n\\times d_k$</td><td>各トークンが「何を探すか」。</td></tr>
                <tr><td>$K=XW^K$</td><td>$n\\times d_k$</td><td>各トークンが「何として検索されるか」。</td></tr>
                <tr><td>$V=XW^V$</td><td>$n\\times d_v$</td><td>見つかったとき実際に取り出す情報。</td></tr>
                <tr><td>$QK^T$</td><td>$n\\times n$</td><td>全トークン対の関連度。系列長二乗の主因。</td></tr>
                <tr><td>$AV$</td><td>$n\\times d_v$</td><td>重み $A$ でValueを混ぜた出力。</td></tr>
            </table>
        </div>

        <h3>■ Scaled Dot-Product Attention（絶対暗記）</h3>
        <div style="background:#eef; padding:10px; border-radius:5px; text-align:center; font-weight:bold; margin-bottom:10px;">
            $$Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
        </div>
        
        <div class="flow-vertical" style="background:#f9f9f9; padding:10px; border-radius:8px;">
            <div class="step-box">
                <strong>Step 1: 類似度計算</strong><br>
                $QK^T$ (内積)<br>
                <small>クエリとキーが似ているか？</small>
            </div>
            <div class="arrow-down">↓</div>
            <div class="step-box">
                <strong>Step 2: スケーリング</strong><br>
                $\\div \\sqrt{d_k}$<br>
                <small>内積の分散増大とSoftmaxの飽和を防ぐ</small>
            </div>
            <div class="arrow-down">↓</div>
            <div class="step-box">
                <strong>Step 3: Maskを加える</strong><br>
                未来・Padding位置へ $-\\infty$<br>
                <small>Mask不要ならこの手順を省略</small>
            </div>
            <div class="arrow-down">↓</div>
            <div class="step-box">
                <strong>Step 4: 確率化 (重み付け)</strong><br>
                softmax<br>
                <small>合計1.0にする</small>
            </div>
            <div class="arrow-down">↓</div>
            <div class="step-box bg-attn">
                <strong>Step 5: 値の取得</strong><br>
                $\\times V$<br>
                <small>重みに応じてValueを合成</small>
            </div>
        </div>

        <h3>■ 計算例：式を5段階に分ける</h3>
        <p>$QK^T=[2,0]$、$d_k=4$、Maskなし、Valueが $V=[4,10]$ の場合。</p>
        <div class="tr-table-wrap">
            <table class="tr-comparison">
                <tr><th>手順</th><th>計算</th><th>結果</th></tr>
                <tr><td>① Score</td><td>$QK^T$</td><td>$[2,0]$</td></tr>
                <tr><td>② Scale</td><td>$[2,0]/\\sqrt4$</td><td>$[1,0]$</td></tr>
                <tr><td>③ Mask</td><td>今回はなし</td><td>$[1,0]$</td></tr>
                <tr><td>④ Softmax</td><td>$[e^1,e^0]/(e^1+e^0)$</td><td>$[0.731,0.269]$</td></tr>
                <tr><td>⑤ Weighted Sum</td><td>$0.731\\times4+0.269\\times10$</td><td>$5.614$</td></tr>
            </table>
        </div>
        <div class="tr-answer">
            <strong>答え：</strong>Attention出力は約 $5.614$。Scoreの最大値4や10をそのまま選ぶのではなく、<strong>Softmax重みによるValueの加重平均</strong>です。
        </div>

        <h3>■ Maskは2種類を分ける</h3>
        <div class="tr-concept-grid">
            <div class="tr-concept-card">
                <strong>Causal Mask：未来を見ない</strong>
                <svg class="tr-concept-svg" viewBox="0 0 260 130" role="img" aria-label="Causal MaskはAttention行列の右上を隠す下三角マスク">
                    <text x="20" y="16" class="tr-svg-note">列：参照するKeyの位置</text>
                    <g transform="translate(60,25)">
                        <rect width="100" height="100" fill="#fff" stroke="#627d98"/>
                        <g stroke="#d7e2ec"><path d="M25 0 V100 M50 0 V100 M75 0 V100 M0 25 H100 M0 50 H100 M0 75 H100"/></g>
                        <g fill="#eafaf1"><rect x="0" y="0" width="25" height="25"/><rect x="0" y="25" width="50" height="25"/><rect x="0" y="50" width="75" height="25"/><rect x="0" y="75" width="100" height="25"/></g>
                        <g fill="#fceceb"><rect x="25" y="0" width="75" height="25"/><rect x="50" y="25" width="50" height="25"/><rect x="75" y="50" width="25" height="25"/></g>
                    </g>
                    <text x="168" y="48" class="tr-svg-note">未来</text><text x="168" y="62" class="tr-svg-note">−∞</text>
                    <text x="165" y="102" class="tr-svg-note">現在まで</text><text x="165" y="116" class="tr-svg-note">参照OK</text>
                </svg>
                <div class="tr-concept-caption">時刻 $t$ は $t$ 以前だけを見る。Decoderの自己回帰生成に使う。</div>
            </div>
            <div class="tr-concept-card">
                <strong>Padding Mask：ダミーを見ない</strong>
                <svg class="tr-concept-svg" viewBox="0 0 260 130" role="img" aria-label="Padding Maskは系列長をそろえたダミートークンを隠す">
                    <g transform="translate(12,37)">
                        <rect width="45" height="40" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="12" y="25" class="tr-svg-note">私</text>
                        <rect x="50" width="45" height="40" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="61" y="25" class="tr-svg-note">は</text>
                        <rect x="100" width="45" height="40" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="111" y="25" class="tr-svg-note">猫</text>
                        <rect x="150" width="45" height="40" rx="5" fill="#fceceb" stroke="#e74c3c"/><text x="156" y="25" class="tr-svg-note">PAD</text>
                        <rect x="200" width="45" height="40" rx="5" fill="#fceceb" stroke="#e74c3c"/><text x="206" y="25" class="tr-svg-note">PAD</text>
                    </g>
                    <path d="M174 22 L233 95 M224 22 L183 95" stroke="#e74c3c" stroke-width="4"/>
                    <text x="70" y="108" class="tr-svg-note">損失・Attentionの対象外</text>
                </svg>
                <div class="tr-concept-caption">バッチ内で長さをそろえるためのPADを無視。<strong>未来Maskとは目的が別</strong>。</div>
            </div>
        </div>

        <h3>■ 3種類のAttention：入力元で見分ける</h3>
        <div class="tr-table-wrap">
            <table class="tr-comparison">
                <tr><th>種類</th><th>$Q,K,V$ の入力元</th><th>Mask・役割</th></tr>
                <tr><td><strong>Encoder Self-Attention</strong></td><td>Q/K/VすべてEncoder側</td><td>文全体を双方向に参照。Padding Maskは使いうる。</td></tr>
                <tr><td><strong>Decoder Masked Self-Attention</strong></td><td>Q/K/VすべてDecoder側</td><td>Causal Maskで未来を禁止。</td></tr>
                <tr><td><strong>Cross / Source–Target Attention</strong></td><td>QはDecoder、K/VはEncoder</td><td>出力生成中に入力系列を検索する。</td></tr>
            </table>
        </div>
        <div class="tr-warning">
            <strong>配線問題の合言葉：</strong>Selfは3つとも同じ側。Crossは<strong>QだけDecoder、K/VはEncoder</strong>。
        </div>

        <h3>■ Multi-Head：分けて見る → 連結 → 統合</h3>
        <div class="tr-concept-card">
            <svg class="tr-concept-svg" viewBox="0 0 330 130" role="img" aria-label="Multi-Head Attentionは複数ヘッドを並列計算して連結し出力射影で統合する">
                <rect x="5" y="46" width="45" height="34" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="17" y="67" class="tr-svg-label">X</text>
                <path d="M52 63 H75" stroke="#627d98" stroke-width="2"/>
                <g fill="#fceceb" stroke="#e74c3c"><rect x="78" y="8" width="62" height="26" rx="4"/><rect x="78" y="39" width="62" height="26" rx="4"/><rect x="78" y="70" width="62" height="26" rx="4"/><rect x="78" y="101" width="62" height="26" rx="4"/></g>
                <g class="tr-svg-note"><text x="91" y="25">Head 1</text><text x="91" y="56">Head 2</text><text x="91" y="87">Head 3</text><text x="91" y="118">Head h</text></g>
                <path d="M52 63 L76 21 M52 63 L76 52 M52 63 L76 83 M52 63 L76 114" stroke="#627d98"/>
                <path d="M142 21 L176 51 M142 52 L176 58 M142 83 L176 66 M142 114 L176 73" stroke="#627d98"/>
                <rect x="178" y="43" width="58" height="40" rx="5" fill="#fff8e7" stroke="#f39c12"/><text x="189" y="61" class="tr-svg-label">Concat</text><text x="189" y="75" class="tr-svg-note">n × dmodel</text>
                <path d="M238 63 H262" stroke="#627d98" stroke-width="2"/><path d="M262 63 l-6 -4 v8 z" fill="#627d98"/>
                <rect x="265" y="43" width="58" height="40" rx="5" fill="#eafaf1" stroke="#27ae60"/><text x="286" y="60" class="tr-svg-label">Wᴼ</text><text x="273" y="75" class="tr-svg-note">出力を統合</text>
            </svg>
            <div class="tr-concept-caption">$d_{model}$ を $h$ ヘッドへ等分する標準形では、各ヘッドの $d_k=d_{model}/h$。連結後は通常 $d_{model}$ 次元へ戻る。</div>
        </div>
        <div class="tr-formula">$\\displaystyle \\mathrm{MultiHead}(Q,K,V)=\\mathrm{Concat}(head_1,\\ldots,head_h)W^O$</div>
        <div class="tr-formula">$\\displaystyle head_i=\\mathrm{Attention}(QW_i^Q,KW_i^K,VW_i^V)$</div>

        <h3>■ Positional Encoding：順序を足し算する</h3>
        <div class="tr-concept-grid">
            <div class="tr-concept-card">
                <strong>単語ベクトル＋位置ベクトル</strong>
                <svg class="tr-concept-svg" viewBox="0 0 300 130" role="img" aria-label="単語埋め込みと同じ次元の位置エンコーディングを要素ごとに加算する">
                    <rect x="8" y="24" width="90" height="42" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="22" y="42" class="tr-svg-label">Token Emb.</text><text x="29" y="57" class="tr-svg-note">dmodel次元</text>
                    <text x="110" y="50" class="tr-svg-label">＋</text>
                    <rect x="130" y="24" width="90" height="42" rx="5" fill="#f4ecf7" stroke="#8e44ad"/><text x="145" y="42" class="tr-svg-label">Position</text><text x="151" y="57" class="tr-svg-note">dmodel次元</text>
                    <path d="M225 45 H248" stroke="#627d98" stroke-width="2"/><path d="M248 45 l-6 -4 v8 z" fill="#627d98"/>
                    <rect x="251" y="24" width="42" height="42" rx="5" fill="#eafaf1" stroke="#27ae60"/><text x="264" y="49" class="tr-svg-label">X</text>
                    <g transform="translate(25,88)" fill="none" stroke-width="2"><path d="M0 15 Q15 -10 30 15 T60 15 T90 15" stroke="#2780b8"/><path d="M105 15 Q120 0 135 15 T165 15 T195 15" stroke="#e74c3c"/></g>
                    <text x="91" y="124" class="tr-svg-note">異なる周期のsin / cos</text>
                </svg>
                <div class="tr-concept-caption">通常は<strong>連結ではなく加算</strong>。入力の次元を $d_{model}$ のまま保つ。</div>
            </div>
            <div class="tr-concept-card">
                <strong>原論文のsin / cos</strong>
                <div class="tr-formula">$\\displaystyle PE(pos,2i)=\\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</div>
                <div class="tr-formula">$\\displaystyle PE(pos,2i+1)=\\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</div>
                <div class="tr-concept-caption">偶数次元はsin、奇数次元はcos。モデルによっては学習可能な位置埋め込みを使う。</div>
            </div>
        </div>

        <h3>■ EncoderとDecoderの中身</h3>
        <div class="tr-table-wrap">
            <table class="tr-comparison">
                <tr><th>ブロック</th><th>処理順</th><th>試験のツボ</th></tr>
                <tr><td><strong>Encoder</strong></td><td>Self-Attention → FFN</td><td>各サブレイヤーにResidual（Add）とLayer Norm。</td></tr>
                <tr><td><strong>Decoder</strong></td><td>Masked Self-Attention → Cross-Attention → FFN</td><td>EncoderよりCross-Attentionが1つ多い。</td></tr>
                <tr><td><strong>Position-wise FFN</strong></td><td>$d_{model}\\to d_{ff}\\to d_{model}$</td><td>位置ごとに独立だが、全位置で同じ重みを共有。</td></tr>
                <tr><td><strong>Add & Norm</strong></td><td>$x+\\mathrm{Sublayer}(x)$ を正規化</td><td>残差加算には入出力の形が一致する必要がある。</td></tr>
            </table>
        </div>

        <h3>■ モデルは「どこを使うか」で整理</h3>
        <div class="tr-table-wrap">
            <table class="tr-comparison">
                <tr><th>型</th><th>代表</th><th>Attentionと用途</th></tr>
                <tr><td><strong>Encoder-only</strong></td><td>BERT</td><td>双方向Self-Attention。文章理解・分類。</td></tr>
                <tr><td><strong>Decoder-only</strong></td><td>GPT</td><td>Causal Mask付きSelf-Attention。次トークン生成。</td></tr>
                <tr><td><strong>Encoder–Decoder</strong></td><td>原Transformer・T5</td><td>Cross-Attentionで入力を参照。翻訳・要約。</td></tr>
            </table>
        </div>

        <h3>■ 最後の暗記表</h3>
        <div class="tr-table-wrap">
            <table class="tr-comparison">
                <tr><th>用語</th><th>一言</th><th>セットで覚える</th></tr>
                <tr><td>Scaled Dot-Product</td><td>$QK^T/\\sqrt{d_k}$</td><td>Scale → Mask → Softmax → Value。</td></tr>
                <tr><td>Self-Attention</td><td>Q/K/Vが同じ入力元</td><td>Encoderは全体、DecoderはCausal Mask。</td></tr>
                <tr><td>Cross-Attention</td><td>QがDecoder、K/VがEncoder</td><td>出力側が入力側を検索。</td></tr>
                <tr><td>Multi-Head</td><td>複数視点を並列計算</td><td>Concat後に $W^O$。</td></tr>
                <tr><td>Positional Encoding</td><td>順序情報を入力へ加算</td><td>原論文はsin/cos。</td></tr>
                <tr><td>計算量</td><td>Self-Attentionは系列長に対し $O(n^2d)$</td><td>Score行列が $n\\times n$。</td></tr>
            </table>
        </div>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "Attentionの数式",
            question: "Scaled Dot-Product Attentionの数式 $Attention(Q, K, V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V$ において、分母の $\\sqrt{d_k}$ は何のためにあるか。",
            options: ["内積の値が大きくなりすぎて、Softmaxの勾配が消失するのを防ぐため", "計算速度を上げるため", "次元数を減らすため", "負の値にならないようにするため"],
            answer: 0,
            explanation: "次元数 $d_k$ が大きいと内積の和が大きくなり、Softmax関数の端（勾配がほぼ0の部分）に行ってしまうのを防ぐスケーリング係数です。"
        },
        {
            category: "Q, K, V",
            question: "Attention機構における $Q, K, V$ の名称として正しい組み合わせはどれか。",
            options: ["Query, Key, Value", "Question, Keyword, Vector", "Queue, Kernel, Volume", "Quantization, Knowledge, Verification"],
            answer: 0,
            explanation: "検索システム（QueryでKeyを探し、Valueを取り出す）のアナロジーから来ています。"
        },
        {
            category: "Positional Encoding",
            question: "Transformerにおいて「Positional Encoding（位置エンコーディング）」が必要な理由は何か。",
            options: ["Transformerの構造自体には再帰（RNN）も畳み込み（CNN）もなく、単語の「順序情報」を認識できないため", "単語の意味を強調するため", "計算量を減らすため", "過学習を防ぐため"],
            answer: 0,
            explanation: "Attentionは「どの単語とどの単語が関連しているか」を見ますが、「どちらが前か」は分かりません。そのため、位置情報を入力に足し合わせます。"
        },
        {
            category: "Multi-Head Attention",
            question: "「Multi-Head Attention」を採用する（Attentionを複数並列に行う）主な利点は何か。",
            options: ["異なる部分空間（視点）の特徴を同時に学習できる（例：あるヘッドは文法を、別のヘッドは意味関係を見るなど）", "計算が1回で済むので速い", "パラメータ数が減る", "長期記憶が保持できる"],
            answer: 0,
            explanation: "各headが別々の射影行列を学習するため、語順・係り受け・意味関係など、異なる関係性を並列に捉えられます。"
        },
        {
            category: "Self-Attention",
            question: "「Self-Attention（自己注意機構）」の特徴として正しいものはどれか。",
            options: ["$Q, K, V$ の全てが「同じ入力元（同じ層の出力）」から作られる", "$Q$ はDecoder、$K, V$ はEncoderから来る", "自分自身の未来の情報だけを見る", "ランダムに注意を向ける"],
            answer: 0,
            explanation: "自分（入力文）の中での単語間の係り受け（例えば代名詞が何を指すかなど）を学習します。"
        },
        {
            category: "論文",
            question: "Transformerが提案された、Googleによる2017年の有名な論文のタイトルは何か。",
            options: ["Attention Is All You Need", "Deep Residual Learning", "ImageNet Classification with Deep CNN", "Learning to Forget"],
            answer: 0,
            explanation: "「必要なのはAttentionだけ（RNNやCNNはいらない）」という衝撃的なタイトルで、その後のNLP界を塗り替えました。"
        },
        {
            category: "計算量",
            question: "系列長を $n$、埋め込み次元を $d$ としたとき、Self-Attentionの計算量はオーダーでどう表されるか。",
            options: ["$O(n^2 d)$", "$O(n d^2)$", "$O(n)$", "$O(n^3)$"],
            answer: 0,
            explanation: "全ての単語対（$n \\times n$）について類似度を計算するため、系列長 $n$ の二乗に比例します。そのため、極端に長い文章は苦手です。"
        },
        {
            category: "Masked Attention",
            question: "Decoder側で使われる「Masked Self-Attention」の役割は何か。",
            options: ["ある単語を予測する際に、「未来の単語」をカンニングできないように隠すこと", "重要でない単語を無視すること", "計算量を減らすこと", "パディング部分を無視すること"],
            answer: 0,
            explanation: "生成タスクでは、まだ生成していない「未来の単語」は見えてはいけません。マスク行列（下三角行列）を使って未来の注意スコアを $-\\infty$ にします。"
        },
        {
            category: "FFN",
            question: "Transformerの各層にある「Position-wise Feed-Forward Networks」は、どのような処理を行うか。",
            options: ["各位置（単語）ごとに独立して、同じパラメータの全結合層を適用する", "全単語をまとめて畳み込む", "時系列順に処理する", "入力と出力を逆転させる"],
            answer: 0,
            explanation: "Attentionで混ぜ合わされた情報を、単語ごとに個別に非線形変換します。構造は $ReLU(xW_1+b_1)W_2+b_2$ の2層MLPです。"
        },
        {
            category: "Source-Target Attention",
            question: "Encoder-Decoder型のTransformerにおいて、Decoderにある「Source-Target Attention（Cross Attention）」の $K$ と $V$ はどこから来るか。",
            options: ["Encoderの最終出力", "Decoderの一つ前の層", "入力埋め込み", "ランダムな値"],
            answer: 0,
            explanation: "Encoderが作った「入力文の情報」を、Decoderが検索（Query）して利用するためのAttentionです。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "Positional Encodingの式(応用)",
            question: "原論文におけるPositional Encodingでは、どのような関数を用いて位置情報を生成しているか。",
            options: ["サイン波 (sin) とコサイン波 (cos) の周期関数", "学習可能な埋め込み層 (Learnable Embedding)", "0から1までの線形増加", "正規分布乱数"],
            answer: 0,
            explanation: "異なる周波数のsin/cos関数を使うことで、相対的な位置関係をモデルが学習しやすくしています（※BERTなどでは学習可能パラメータを使うことも多い）。"
        },
        {
            category: "Layer Normalization(応用)",
            question: "TransformerではBatch Normalizationではなく「Layer Normalization」が使われる。Layer Normの特徴はどれか。",
            options: ["1つのサンプル内の全ニューロン（特徴量）で正規化を行い、バッチサイズに依存しない", "バッチ全体の平均を使う", "チャンネルごとに正規化する", "重みを正規化する"],
            answer: 0,
            explanation: "NLPでは文の長さがバラバラでバッチ統計量が不安定になりやすいため、サンプル単位で正規化するLayer Normが適しています。"
        },
        {
            category: "BERT vs GPT(応用)",
            question: "Transformerの構造において、BERTとGPTはそれぞれどの部分を使用しているか。",
            options: ["BERTはEncoderのみ、GPTはDecoderのみ", "BERTはDecoderのみ、GPTはEncoderのみ", "両方ともEncoder-Decoder", "両方ともEncoderのみ"],
            answer: 0,
            explanation: "BERTは文脈を双方向から読む理解タスク向け（Encoder）、GPTは次単語予測による生成タスク向け（Decoder）です。"
        },
        {
            category: "Residual Connection(応用)",
            question: "Transformerの各サブレイヤー（AttentionやFFN）の後には「Add & Norm」がある。「Add」が指すResidual Connection（残差結合）の主な効果は何か。",
            options: ["勾配消失を防ぎ、深い層まで学習を可能にする", "パラメータ数を増やす", "計算速度を上げる", "ノイズを除去する"],
            answer: 0,
            explanation: "ResNet由来の技術で、入力 $x$ を出力に足し合わせる（$F(x) + x$）ことで、勾配の高速道路を作り学習を安定させます。"
        },
        {
            category: "内積と類似度(応用)",
            question: "Attentionにおいて、QueryとKeyの内積を使う説明として最も正確なものはどれか。",
            options: ["学習されたQとKの対応成分を掛けて足し、関連度スコアを作る", "2つのベクトル間のユークリッド距離を求める", "2つのベクトルの外積をとる", "ベクトルをランダムに回転させる"],
            answer: 0,
            explanation: "学習されたQueryとKeyの内積を関連度スコアとして使います。値が大きいほど強く参照します。内積は大きさにも依存するため、正規化済みベクトルのコサイン類似度と完全に同じではありません。"
        },
        {
            category: "Softmaxの役割(応用)",
            question: "Attentionスコアの計算でSoftmax関数を通す理由は何か。",
            options: ["各Queryの重みを合計1.0にし、Valueの加重平均をとれるようにするため", "最大値だけを取り出すため", "計算を簡単にするため", "負の値を作るため"],
            answer: 0,
            explanation: "どこにどれくらい注目するかを「割合」で表現するためです。"
        },
        {
            category: "Warmup(応用)",
            question: "Transformerの学習時によく用いられる、学習率を初期は線形に上げ、その後減衰させるスケジューリングを何と呼ぶか。",
            options: ["Warmup", "Dropout", "Early Stopping", "Gradient Clipping"],
            answer: 0,
            explanation: "学習開始直後は小さい学習率を使い、徐々に上げて学習を安定させます。原Transformerを含む代表的な学習設定で使われます。"
        },
        {
            category: "CNNとの比較(応用)",
            question: "CNNと比較した際のTransformer（Self-Attention）の利点として、「大域的な情報の取得」という観点から正しい説明はどれか。",
            options: ["CNNは層を重ねないと遠くの情報を見れないが、Transformerは1層目から文中のあらゆる距離の単語関係を直接捉えられる", "Transformerは局所的な情報しか見れない", "CNNの方が長距離依存に強い", "どちらも同じ"],
            answer: 0,
            explanation: "Self-Attentionは全単語間のリンクを持つため、距離に関係なくパスの長さが1（直接参照）となり、長距離の依存関係を捉えやすいです。"
        },
        {
            category: "帰納的バイアス(応用)",
            question: "CNNやRNNと比較して、Transformerは「帰納的バイアス（Inductive Bias）」が弱いと言われる。これは何を意味するか。",
            options: ["画像や時間といったデータ構造への仮定（局所性や順序）がモデルに組み込まれておらず、大量のデータで学習しないとパターンを見つけにくい", "初期値に依存しやすい", "過学習しにくい", "バイアス項が存在しない"],
            answer: 0,
            explanation: "CNNは「隣同士は関係ある」、RNNは「時間は続く」という前提（バイアス）がありますが、Transformerにはそれがないため、柔軟ですが大量のデータが必要です。"
        },
        {
            category: "Label Smoothing(応用)",
            question: "Transformerの学習（翻訳タスクなど）で過学習を防ぐためによく使われる、正解ラベルの確率を1.0ではなく0.9などに下げる手法は何か。",
            options: ["Label Smoothing", "Dropout", "Batch Norm", "Weight Decay"],
            answer: 0,
            explanation: "「絶対にこれだ！」と確信しすぎるのを防ぎ、汎化性能を向上させるテクニックです。"
        },
        // ---------------------------------------------------------
        // 【計算問題】 Q21 - Q25
        // ---------------------------------------------------------
        {id:"tr-attention-score-calc",category:"Attention(計算)",question:"$QK^T=[2,0]$、$d_k=4$のときSoftmaxへ入るスコアはどれか。",options:["$[1,0]$","$[2,0]$","$[0.5,0]$","$[4,0]$"],answer:0,explanation:"$\\sqrt{d_k}=2$で割るため$[2,0]/2=[1,0]$です。"},
        {id:"tr-softmax-two-calc",category:"Attention(計算)",question:"Softmax入力が$[0,0]$ならAttention重みはどれか。",options:["$[0.5,0.5]$","$[0,0]$","$[1,1]$","$[0,1]$"],answer:0,explanation:"指数値が等しいため重みを等分します。"},
        {id:"tr-weighted-value",category:"Attention出力(計算)",question:"Attention重みが$[0.25,0.75]$、Valueがスカラー$[2,6]$なら出力はいくつか。",options:["5","4","8","3"],answer:0,explanation:"重み付き和$0.25×2+0.75×6=0.5+4.5=5$です。"},
        {id:"tr-mha-dim",category:"Multi-Head(形状)",question:"$d_{model}=768$、head数12で等分すると各headの$d_k$はいくつか。",options:["64","12","768","9216"],answer:0,explanation:"$768/12=64$です。各head連結後は通常768次元へ戻ります。"},
        {id:"tr-qkv-route-detail",category:"Cross-Attention(配線)",question:"Encoder-Decoder TransformerのCross-Attentionで正しい配線はどれか。",options:["QはDecoder、K/VはEncoder最終出力","Q/K/VすべてEncoder","Q/K/VすべてDecoder","Q/VはEncoder、KはDecoder"],answer:0,explanation:"Decoderが入力文表現を検索するため、Decoder表現をQuery、Encoder出力をKey/Valueにします。"},

        // ---------------------------------------------------------
        // 【2026シラバス補強】 Q26 - Q45
        // ---------------------------------------------------------
        {id:"tr-score-matrix-shape",category:"Self-Attention(形状)",question:"系列長$n=6$で、$Q$と$K$がともに$6\\times8$のとき、$QK^T$の形状はどれか。",options:["$6\\times6$","$8\\times8$","$6\\times8$","$8\\times6$"],answer:0,explanation:"$Q(6\\times8)K^T(8\\times6)$なので、各トークンが全6トークンを見る$6\\times6$のスコア行列になります。"},
        {id:"tr-cross-score-shape",category:"Cross-Attention(形状)",question:"Decoder側の系列長が4、Encoder側の系列長が7のとき、Cross-Attentionのスコア行列$QK^T$の形状はどれか。",options:["$4\\times7$","$7\\times4$","$4\\times4$","$7\\times7$"],answer:0,explanation:"QueryはDecoderの4位置、KeyはEncoderの7位置です。したがって「出力側4位置 × 入力側7位置」の$4\\times7$になります。"},
        {id:"tr-q-projection-shape",category:"Q/K/V(形状)",question:"入力$X$が$5\\times16$、射影行列$W^Q$が$16\\times4$のとき、$Q=XW^Q$の形状はどれか。",options:["$5\\times4$","$16\\times4$","$5\\times16$","$4\\times5$"],answer:0,explanation:"行列積$(5\\times16)(16\\times4)$では内側の16が消え、外側の$5\\times4$が残ります。"},
        {id:"tr-full-attention-calc",category:"Scaled Dot-Product(計算)",question:"$QK^T=[2,0]$、$d_k=4$、対応するValueが$[4,10]$のとき、Attention出力に最も近い値はどれか。$e^1\\simeq2.718$とする。",options:["$5.61$","$7.00$","$4.00$","$14.00$"],answer:0,explanation:"①$[2,0]/2=[1,0]$、②Softmaxは約$[0.731,0.269]$、③$0.731×4+0.269×10=5.614$です。"},
        {id:"tr-mask-before-softmax",category:"Causal Mask",question:"未来位置を確実に参照させないため、Causal Maskでは通常どの処理をSoftmaxの前に行うか。",options:["未来位置のスコアに$-\\infty$を加える","未来位置のValueを2倍する","過去位置のスコアを0にする","行列を転置する"],answer:0,explanation:"$e^{-\\infty}=0$なので、Softmax後の未来位置の重みが0になります。マスクはSoftmaxの前です。"},
        {id:"tr-causal-visible-range",category:"Causal Mask",question:"1始まりで3番目のトークンを処理している。Causal Mask付きSelf-Attentionで参照できる位置はどれか。",options:["1・2・3番目","3番目だけ","3番目以降すべて","全位置"],answer:0,explanation:"自分自身と過去は見られますが、未来の4番目以降は隠します。行列では下三角部分だけが有効です。"},
        {id:"tr-padding-mask-purpose",category:"Padding Mask",question:"Padding Maskの目的として正しいものはどれか。",options:["長さを揃えるために追加したPADをAttention対象から除く","未来の正解を隠す","一部のheadを削除する","位置情報を加える"],answer:0,explanation:"Padding Maskは「意味のないPADを見ない」ためのものです。「未来を見ない」Causal Maskとは目的が異なります。"},
        {id:"tr-softmax-row-sum",category:"Attention重み",question:"Attention重み行列$A=\\mathrm{softmax}(QK^T/\\sqrt{d_k})$について、通常の各行が表すものはどれか。",options:["1つのQueryが各Keyへ向ける重みで、合計は1","1つのKeyが各Queryへ向ける重みで、合計は系列長","Valueの特徴量で、合計は0","位置番号で、合計は一定でない"],answer:0,explanation:"Softmaxは行ごとに適用されます。各行は1つのQueryの参照割合で、マスクされた位置を含めた重みの合計は1です。"},
        {id:"tr-attention-matrix-elements",category:"Self-Attention(計算量)",question:"系列長128のSelf-Attentionで、1 headのAttentionスコア行列に含まれる要素数はいくつか。",options:["16,384","128","256","131,072"],answer:0,explanation:"全トークン対を作るため$128×128=16,384$要素です。これが系列長に対して二乗で増える理由です。"},
        {id:"tr-mha-concat-dim",category:"Multi-Head(形状)",question:"$d_{model}=512$、8 headで各headの出力が64次元である。8個をConcatした直後の次元はいくつか。",options:["512","64","8","4096"],answer:0,explanation:"$64×8=512$です。各headを連結した後、通常は$W^O$で混ぜて$d_{model}=512$次元の出力にします。"},
        {id:"tr-mha-output-projection",category:"Multi-Head(手順)",question:"各Attention headを計算した直後の標準的な処理順序はどれか。",options:["各headをConcatし、出力射影$W^O$を掛ける","各headを足してSoftmaxする","最大のheadだけ残す","headごとに損失を計算して終了する"],answer:0,explanation:"$\\mathrm{MultiHead}=\\mathrm{Concat}(head_1,\\ldots,head_h)W^O$が基本式です。"},
        {id:"tr-mha-parameter-count",category:"Multi-Head(計算)",question:"$d_{model}=512$で、$W^Q,W^K,W^V,W^O$がすべて$512\\times512$とする。バイアスを除く4行列の総パラメータ数はいくつか。",options:["1,048,576","262,144","2,097,152","2048"],answer:0,explanation:"$4×512×512=4×262,144=1,048,576$です。headに分けても、標準構成の射影全体の規模はこの計算で求められます。"},
        {id:"tr-pe-add-not-concat",category:"Positional Encoding",question:"埋め込みが512次元、Positional Encodingも512次元の場合、原Transformerでは両者をどう組み合わせるか。",options:["要素ごとに加算し、512次元のままにする","連結して1024次元にする","内積をとって1次元にする","位置情報だけを入力する"],answer:0,explanation:"Token Embeddingと同じ次元の位置ベクトルを要素ごとに足します。連結ではないので次元は512のままです。"},
        {id:"tr-pe-sin-cos-index",category:"Positional Encoding(式)",question:"原論文の固定Positional Encodingで正しい対応はどれか。",options:["偶数次元にsin、奇数次元にcos","偶数次元にcos、奇数次元にsin","全次元にReLU","全次元にSoftmax"],answer:0,explanation:"$PE(pos,2i)=\\sin(\\cdots)$、$PE(pos,2i+1)=\\cos(\\cdots)$です。異なる周期を使って位置を表します。"},
        {id:"tr-encoder-block-order",category:"Encoder構造",question:"原TransformerのEncoderブロックを構成する主要な2サブレイヤーはどれか。",options:["Self-AttentionとPosition-wise FFN","Masked Self-AttentionとCross-Attention","LSTMとCNN","Poolingと再帰層"],answer:0,explanation:"EncoderはSelf-Attentionで位置間の情報を混ぜ、FFNで各位置を同じMLPにより変換します。各サブレイヤーには残差結合とLayer Normがあります。"},
        {id:"tr-decoder-extra-layer",category:"Decoder構造",question:"Encoderにはなく、Encoder–Decoder型TransformerのDecoderに追加されるAttentionはどれか。",options:["Encoder出力をK/Vとして参照するCross-Attention","未来だけを見るAttention","CNN Attention","Batch Attention"],answer:0,explanation:"DecoderはMasked Self-Attentionの後、Cross-AttentionでEncoderの入力文表現を参照します。"},
        {id:"tr-residual-shape-rule",category:"Add & Norm(形状)",question:"Residual Connectionで$F(x)+x$を要素ごとに加算するために必要な条件はどれか。",options:["$F(x)$と$x$の形状が一致する","バッチサイズが1である","系列長が偶数である","Attention headが1つである"],answer:0,explanation:"加算には形状の一致が必要です。そのため各サブレイヤーは基本的に$d_{model}$次元へ戻してから残差を足します。"},
        {id:"tr-position-wise-ffn-sharing",category:"Position-wise FFN",question:"Position-wise FFNの適用方法として正しいものはどれか。",options:["各位置を独立に処理し、全位置で同じ重みを共有する","位置ごとに別の重みを学習する","全位置を1ベクトルにしてから処理する","未来位置だけを処理する"],answer:0,explanation:"トークン同士を混ぜるのはAttentionです。FFNは各位置に同じ2層MLPを独立適用します。"},
        {id:"tr-encoder-mask-rule",category:"Self-Attention比較",question:"BERTなどEncoder-onlyモデルのSelf-Attentionについて、基本的に正しいものはどれか。",options:["PADは除外するが、Causal Maskなしで左右両方向を参照する","必ず未来を隠す","過去だけを参照する","Cross-Attentionだけを使う"],answer:0,explanation:"Encoderは文章理解のため左右の文脈を参照します。一方、GPTなど自己回帰Decoderは未来を隠すCausal Maskを使います。"},
        {id:"tr-parallel-and-quadratic",category:"RNNとの比較",question:"Self-Attentionの性質をRNNと比べた説明として最も適切なものはどれか。",options:["系列位置を並列処理しやすいが、標準Attentionのスコア行列は系列長の二乗で増える","逐次処理が必須で、計算量は常に一定","長い系列ほどスコア行列が小さくなる","順序情報を再帰状態だけで表す"],answer:0,explanation:"再帰がないため位置を並列計算できますが、全トークン対を比較する標準Self-Attentionは$O(n^2d)$です。"}
    ]
};
