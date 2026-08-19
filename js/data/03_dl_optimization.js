const optimizationExplanationFigures = {
    chainRule: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">逆伝播は「損失側から届いた勾配 × この箱の微分」</span>
            <div class="diagram-row">
                <div class="diagram-node primary">損失側から届いた勾配<br><b>2</b></div>
                <div class="diagram-arrow">×</div>
                <div class="diagram-node accent">この箱の微分<br><b>3</b></div>
                <div class="diagram-arrow">＝</div>
                <div class="diagram-node warn">入力側へ渡す勾配<br><b>6</b></div>
            </div>
            <p class="figure-caption">同じ変数から複数経路へ分岐した場合、戻ってきた勾配は足し合わせます。</p>
        </div>`,
    adamBiasCorrection: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">ADAMの初回：0から始めた移動平均を補正する</span>
            <div class="diagram-row">
                <div class="diagram-node primary">$m_0=0$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">$m_1=(1-β_1)g$</div>
                <div class="diagram-arrow">÷ $(1-β_1)$</div>
                <div class="diagram-node accent">補正後 $m_1=g$</div>
            </div>
            <p class="figure-caption">補正しないと、学習初期の移動平均が0側へ小さく偏ります。</p>
        </div>`,
    initializationVariance: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">分散と標準偏差を区別する</span>
            <div class="diagram-row">
                <div class="diagram-node primary">Heの分散<br>2 / fan-in</div>
                <div class="diagram-arrow">平方根</div>
                <div class="diagram-node accent">Heの標準偏差<br>√(2 / fan-in)</div>
            </div>
            <p class="figure-caption">問題が「分散」を聞いているか「標準偏差」を聞いているかを最初に確認します。</p>
        </div>`
};

const optimizationQuestionFigures = {
    chainArrowBlank: `
        <div class="exam-figure" role="group" aria-label="3つの変数を直列につないだ計算グラフの矢印空欄">
            <svg viewBox="0 0 760 230" role="img" aria-labelledby="opt-q-chain-title opt-q-chain-desc" style="display:block;width:100%;min-width:640px;height:auto">
                <title id="opt-q-chain-title">直列の計算グラフと局所微分の空欄</title>
                <desc id="opt-q-chain-desc">xからu、uからyへ進む計算グラフ。最初の矢印にA、次の矢印にdy/duと書かれ、dy/dxを求める。</desc>
                <defs>
                    <marker id="opt-q-chain-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2780b8"/></marker>
                </defs>
                <rect x="12" y="12" width="736" height="206" rx="14" fill="#fbfdff" stroke="#c9d8e6"/>
                <g fill="#102a43" text-anchor="middle">
                    <rect x="55" y="70" width="130" height="70" rx="10" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="120" y="112" font-size="23" font-weight="700">x</text>
                    <rect x="315" y="70" width="130" height="70" rx="10" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/>
                    <text x="380" y="101" font-size="20" font-weight="700">u = f(x)</text>
                    <text x="380" y="126" font-size="14">中間値</text>
                    <rect x="575" y="70" width="130" height="70" rx="10" fill="#f2edfb" stroke="#7d61b4" stroke-width="2"/>
                    <text x="640" y="101" font-size="20" font-weight="700">y = g(u)</text>
                    <text x="640" y="126" font-size="14">出力</text>
                </g>
                <g fill="none" stroke="#2780b8" stroke-width="3" marker-end="url(#opt-q-chain-arrow)">
                    <path d="M185 105 H305"/><path d="M445 105 H565"/>
                </g>
                <text x="245" y="87" text-anchor="middle" font-size="18" font-weight="700" fill="#d64545">A</text>
                <text x="505" y="87" text-anchor="middle" font-size="17" font-weight="700" fill="#123f68">dy / du</text>
                <text x="380" y="185" text-anchor="middle" font-size="18" font-weight="700" fill="#102a43">dy / dx = (dy / du) × A</text>
            </svg>
        </div>`,
    branchGraph: `
        <div class="exam-figure" role="group" aria-label="2つの入力から2つの中間値へ分岐し、1つの出力へ合流する計算グラフ">
            <svg viewBox="0 0 820 330" role="img" aria-labelledby="opt-q-branch-title opt-q-branch-desc" style="display:block;width:100%;min-width:680px;height:auto">
                <title id="opt-q-branch-title">分岐と合流を含む計算グラフ</title>
                <desc id="opt-q-branch-desc">入力xとyから積uと和vを作り、uとvの積をLとする計算グラフ。</desc>
                <defs>
                    <marker id="opt-q-branch-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2780b8"/></marker>
                    <marker id="opt-q-branch-purple-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#7d61b4"/></marker>
                </defs>
                <rect x="12" y="12" width="796" height="306" rx="14" fill="#fbfdff" stroke="#c9d8e6"/>
                <g fill="#102a43" text-anchor="middle">
                    <rect x="45" y="70" width="110" height="62" rx="10" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/><text x="100" y="108" font-size="22" font-weight="700">x</text>
                    <rect x="45" y="210" width="110" height="62" rx="10" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/><text x="100" y="248" font-size="22" font-weight="700">y</text>
                    <rect x="330" y="63" width="170" height="76" rx="10" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/><text x="415" y="96" font-size="20" font-weight="700">u = x × y</text><text x="415" y="123" font-size="14">掛け算</text>
                    <rect x="330" y="203" width="170" height="76" rx="10" fill="#f2edfb" stroke="#7d61b4" stroke-width="2"/><text x="415" y="236" font-size="20" font-weight="700">v = x + y</text><text x="415" y="263" font-size="14">足し算</text>
                    <rect x="650" y="133" width="130" height="76" rx="10" fill="#fdecec" stroke="#d64545" stroke-width="2"/><text x="715" y="166" font-size="20" font-weight="700">L = u × v</text><text x="715" y="193" font-size="14">最終出力</text>
                </g>
                <g fill="none" stroke="#2780b8" stroke-width="3" marker-end="url(#opt-q-branch-arrow)">
                    <path d="M155 90 C220 90 260 86 320 86"/>
                    <path d="M155 112 C225 112 250 215 320 222"/>
                    <path d="M500 101 C570 101 585 158 640 166"/>
                    <path d="M500 241 C570 241 585 184 640 176"/>
                </g>
                <circle cx="236" cy="171" r="8" fill="#fbfdff"/>
                <g fill="none" stroke="#7d61b4" stroke-width="3" stroke-dasharray="8 5" marker-end="url(#opt-q-branch-purple-arrow)">
                    <path d="M155 252 C220 252 260 254 320 254"/>
                    <path d="M155 230 C225 230 250 123 320 118"/>
                </g>
                <text x="410" y="303" text-anchor="middle" font-size="15" fill="#42566a">同じ変数から複数の経路がある点に注目</text>
            </svg>
        </div>`
};

window.quizData = {
    title: "3-（２）深層モデルのための最適化",
    
    cheatSheet: `
        <style>
            .opt-icon { width: 80px; height: 50px; background: #fff; margin: auto; border: 1px solid #eee; }
            .path-line { fill: none; stroke-width: 3; stroke-linecap: round; }
            .core-strip { margin: 12px 0 18px; padding: 12px 14px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .optimizer-formula-table td:nth-child(3), .initialization-formula-table td:nth-child(3) { min-width: 480px; }
            .optimizer-equation, .initialization-equation { margin: 6px 0; padding: 7px 10px; border-radius: 8px; background: #f3f7fb; color: #123f68; font-size: 1.02em; white-space: nowrap; }
            .optimizer-equation mjx-container, .initialization-equation mjx-container { margin: 0 !important; }
            .optimization-visual-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 14px 0 18px; }
            .optimization-wide-svg { display: block; width: 100%; min-width: 900px; height: auto; }
            .optimization-keyword-table td:nth-child(2) { font-weight: 700; color: #123f68; }
            .optimization-test-point { margin: 12px 0; padding: 11px 14px; border: 1px solid #b8d9ee; border-radius: 9px; background: #f7fbfe; line-height: 1.75; }
        </style>

        <h3>■ まず全体：何を求める章なのか</h3>
        <p>
            深層学習では、モデルの予測と正解のずれを<strong>損失（Loss）$L$</strong>という1つの数にします。
            この章の目的は、<strong>損失 $L$ が小さくなる重み $W$ とバイアス $b$ を探すこと</strong>です。
        </p>
        <div class="optimization-visual-wrap">
            <svg class="optimization-wide-svg" viewBox="0 0 1040 500" role="img" aria-labelledby="opt-whole-flow-title opt-whole-flow-desc">
                <title id="opt-whole-flow-title">深層学習の最適化を4段階で見る全体フロー</title>
                <desc id="opt-whole-flow-desc">損失を小さくする重みを探すため、初期化、予測と損失計算、逆伝播による勾配計算、オプティマイザによる重み更新を行い、後ろ3段階を繰り返す。</desc>
                <defs>
                    <marker id="opt-whole-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2780b8"/></marker>
                    <marker id="opt-whole-loop-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#d64545"/></marker>
                </defs>
                <rect x="18" y="18" width="1004" height="464" rx="18" fill="#fbfdff" stroke="#c9d8e6"/>
                <text x="40" y="53" font-size="22" font-weight="700" fill="#102a43">何を求めたい？　損失 L が小さくなる重み W・バイアス b</text>
                <text x="40" y="82" font-size="16" fill="#42566a">最適化は、現在の重みで予測 → ずれを測る → 影響度を求める → 重みを直す、を繰り返します。</text>

                <g fill="#102a43" text-anchor="middle">
                    <rect x="42" y="112" width="188" height="226" rx="14" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="136" y="145" font-size="19" font-weight="700">① 初期値を決める</text>
                    <text x="136" y="174" font-size="15">学習前に1回だけ</text>
                    <line x1="65" y1="190" x2="207" y2="190" stroke="#9fc9e2"/>
                    <text x="136" y="220" font-size="16" font-weight="700">Xavier／He</text>
                    <text x="136" y="249" font-size="14">sigmoid・tanh → Xavier</text>
                    <text x="136" y="276" font-size="14">ReLU → He</text>
                    <text x="136" y="311" font-size="14" fill="#51697d">W を同じ0にしない</text>

                    <rect x="270" y="112" width="208" height="226" rx="14" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/>
                    <text x="374" y="145" font-size="19" font-weight="700">② 予測して採点</text>
                    <text x="374" y="174" font-size="15">ミニバッチ X, y</text>
                    <line x1="294" y1="190" x2="454" y2="190" stroke="#e8c979"/>
                    <text x="374" y="220" font-size="16" font-weight="700">Forward（順伝播）</text>
                    <text x="374" y="250" font-size="15">予測　ŷ = f(X; W, b)</text>
                    <text x="374" y="281" font-size="15">損失　L(ŷ, y)</text>
                    <text x="374" y="311" font-size="14" fill="#6d5b32">予測と正解のずれを1つの数へ</text>

                    <rect x="518" y="112" width="222" height="226" rx="14" fill="#f2edfb" stroke="#7d61b4" stroke-width="2"/>
                    <text x="629" y="145" font-size="19" font-weight="700">③ 影響度を求める</text>
                    <text x="629" y="174" font-size="15">Backward（逆伝播）</text>
                    <line x1="543" y1="190" x2="715" y2="190" stroke="#c5b5e2"/>
                    <text x="629" y="220" font-size="16" font-weight="700">自動微分</text>
                    <text x="629" y="250" font-size="15">連鎖律・デルタ</text>
                    <text x="629" y="281" font-size="15">g = ∂L / ∂W</text>
                    <text x="629" y="311" font-size="14" fill="#5d5077">各重みがLossへ与える影響</text>

                    <rect x="780" y="112" width="218" height="226" rx="14" fill="#fdecec" stroke="#d64545" stroke-width="2"/>
                    <text x="889" y="145" font-size="19" font-weight="700">④ 重みを更新する</text>
                    <text x="889" y="174" font-size="15">Optimizer（更新方法）</text>
                    <line x1="805" y1="190" x2="973" y2="190" stroke="#e9acac"/>
                    <text x="889" y="220" font-size="14">SGD・Momentum・NAG</text>
                    <text x="889" y="248" font-size="14">AdaGrad・RMSProp・Adam</text>
                    <text x="889" y="281" font-size="15">学習率 η ＝ 1回の歩幅</text>
                    <text x="889" y="311" font-size="14" fill="#7a4747">勾配を使って W, b を直す</text>
                </g>
                <g fill="none" stroke="#2780b8" stroke-width="3" marker-end="url(#opt-whole-arrow)">
                    <path d="M230 225 H262"/><path d="M478 225 H510"/><path d="M740 225 H772"/>
                </g>
                <path d="M889 342 V382 H374 V346" fill="none" stroke="#d64545" stroke-width="3" stroke-dasharray="8 6" marker-end="url(#opt-whole-loop-arrow)"/>
                <text x="631" y="405" text-anchor="middle" font-size="16" font-weight="700" fill="#d64545">② → ③ → ④を、次のミニバッチで繰り返す</text>
                <rect x="92" y="426" width="856" height="38" rx="9" fill="#eef7fb" stroke="#b8d9ee"/>
                <text x="520" y="452" text-anchor="middle" font-size="16" font-weight="700" fill="#123f68">ŷ = f(X;W,b)　→　L(ŷ,y)　→　g = ∂L/∂W　→　WをOptimizerで更新</text>
            </svg>
        </div>
        <table>
            <tr><th>段階</th><th>ここで答える問い</th><th>この章の用語を入れる箱</th></tr>
            <tr><td><strong>① 初期値</strong></td><td>学習開始時の重みをどう置く？</td><td>Xavier・He</td></tr>
            <tr><td><strong>② 予測・Loss</strong></td><td>今の重みでは、どれくらい間違えた？</td><td>バッチ／ミニバッチ・順伝播・損失</td></tr>
            <tr><td><strong>③ 勾配</strong></td><td>どの重みがLossへどれだけ影響した？</td><td>誤差逆伝播・連鎖律・デルタ・自動微分</td></tr>
            <tr><td><strong>④ 更新</strong></td><td>求めた勾配で、重みをどう動かす？</td><td>学習率・SGD・Momentum・NAG・AdaGrad・RMSProp・Adam</td></tr>
        </table>
        <div class="core-strip">
            <strong>最重要：</strong>Backwardは<strong>勾配を求める担当</strong>、Optimizerは<strong>その勾配で重みを更新する担当</strong>です。SGDやAdamは④に入ります。
        </div>

        <h3>■ 連鎖律：矢印の式は「経路内で掛け、複数経路を足す」</h3>
        <p><strong>勾配</strong>とは「その値を少し変えたら、最後の出力や損失がどれだけ変わるか」です。試験では、計算グラフの矢印に局所微分を入れ、求めたい端から端までつなぎます。</p>
        <div class="optimization-visual-wrap">
            <svg class="optimization-wide-svg" viewBox="0 0 960 390" role="img" aria-labelledby="opt-chain-basic-title opt-chain-basic-desc">
                <title id="opt-chain-basic-title">1本道の計算グラフで使う連鎖律</title>
                <desc id="opt-chain-basic-desc">xから中間値u、uから出力yへ順伝播し、逆伝播ではyからu、uからxへ戻る。各矢印の局所微分dy/duとdu/dxを掛けるとdy/dxになる。</desc>
                <defs>
                    <marker id="opt-chain-basic-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2780b8"/></marker>
                    <marker id="opt-chain-basic-back-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#d64545"/></marker>
                </defs>
                <rect x="18" y="18" width="924" height="354" rx="18" fill="#fbfdff" stroke="#c9d8e6"/>
                <text x="42" y="54" font-size="20" font-weight="700" fill="#102a43">レベル1：1本道なら、矢印に書かれた局所微分を掛ける</text>
                <g fill="#102a43" text-anchor="middle">
                    <rect x="65" y="94" width="150" height="78" rx="12" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="140" y="127" font-size="22" font-weight="700">x</text><text x="140" y="153" font-size="14">入力</text>
                    <rect x="405" y="94" width="150" height="78" rx="12" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/>
                    <text x="480" y="125" font-size="19" font-weight="700">u = f(x)</text><text x="480" y="153" font-size="14">中間値</text>
                    <rect x="745" y="94" width="150" height="78" rx="12" fill="#f2edfb" stroke="#7d61b4" stroke-width="2"/>
                    <text x="820" y="125" font-size="19" font-weight="700">y = g(u)</text><text x="820" y="153" font-size="14">出力</text>
                </g>
                <g fill="none" stroke="#2780b8" stroke-width="3" marker-end="url(#opt-chain-basic-arrow)">
                    <path d="M215 133 H395"/><path d="M555 133 H735"/>
                </g>
                <text x="305" y="112" text-anchor="middle" font-size="17" font-weight="700" fill="#123f68">du / dx</text>
                <text x="645" y="112" text-anchor="middle" font-size="17" font-weight="700" fill="#123f68">dy / du</text>
                <path d="M820 206 H140" fill="none" stroke="#d64545" stroke-width="3" marker-end="url(#opt-chain-basic-back-arrow)"/>
                <text x="480" y="198" text-anchor="middle" font-size="15" font-weight="700" fill="#d64545">逆伝播で勾配をたどる向き：y → u → x</text>
                <rect x="100" y="235" width="760" height="70" rx="12" fill="#eef8f1" stroke="#69a97a"/>
                <text x="480" y="264" text-anchor="middle" font-size="18" font-weight="700" fill="#1c6b3d">求めたいもの：dy / dx</text>
                <text x="480" y="292" text-anchor="middle" font-size="20" font-weight="700" fill="#102a43">dy / dx ＝ (dy / du) × (du / dx)</text>
                <text x="480" y="347" text-anchor="middle" font-size="14" fill="#42566a">覚え方：左辺の y から x へ、y → u → x と文字がつながる並びを選ぶ</text>
            </svg>
        </div>
        <div class="optimization-test-point">
            <strong>試験での3手：</strong>① 求めたい微分を左辺に書く → ② 出力側から入力側へ矢印を逆にたどる → ③ 1本道では局所微分を掛ける。<br>
            <strong>向きの注意：</strong>$du/dy$ や $dx/du$ は矢印と逆向きの微分です。求めるものが $dy/dx$ なら、$dy/du$ と $du/dx$ を使います。<br>
            <strong>$d$ と $\\partial$：</strong>変数が1つの式では $d$、Lossが多数の重みに依存する深層学習では「他を固定して1つだけ動かす」$\\partial$ をよく使います。連鎖律の考え方は同じです。<br>
            <strong>補足：</strong>真ん中の $du$ が消えるように見えるのは覚え方であり、普通の分数を約分しているわけではありません。
        </div>

        <div class="optimization-visual-wrap">
            <svg class="optimization-wide-svg" viewBox="0 0 960 640" role="img" aria-labelledby="opt-chain-branch-title opt-chain-branch-desc">
                <title id="opt-chain-branch-title">分岐と合流を含む複雑な計算グラフの連鎖律</title>
                <desc id="opt-chain-branch-desc">xとyから積uと和vを作り、L=uvへ合流する。xからLへは2経路あるため、各経路の局所微分を掛けた後で足す。</desc>
                <defs>
                    <marker id="opt-chain-branch-blue-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2780b8"/></marker>
                    <marker id="opt-chain-branch-purple-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#7d61b4"/></marker>
                    <marker id="opt-chain-branch-red-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#d64545"/></marker>
                </defs>
                <rect x="18" y="18" width="924" height="604" rx="18" fill="#fbfdff" stroke="#c9d8e6"/>
                <text x="42" y="54" font-size="20" font-weight="700" fill="#102a43">レベル2：分岐したら「各経路で掛ける → 同じ変数への寄与を足す」</text>

                <g fill="#102a43" text-anchor="middle">
                    <rect x="54" y="120" width="126" height="68" rx="11" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="117" y="161" font-size="23" font-weight="700">x</text>
                    <rect x="54" y="310" width="126" height="68" rx="11" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="117" y="351" font-size="23" font-weight="700">y</text>

                    <rect x="385" y="105" width="188" height="94" rx="12" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/>
                    <text x="479" y="139" font-size="21" font-weight="700">u = x × y</text>
                    <text x="479" y="170" font-size="14">∂u/∂x = y　∂u/∂y = x</text>
                    <rect x="385" y="295" width="188" height="94" rx="12" fill="#f2edfb" stroke="#7d61b4" stroke-width="2"/>
                    <text x="479" y="329" font-size="21" font-weight="700">v = x + y</text>
                    <text x="479" y="360" font-size="14">∂v/∂x = 1　∂v/∂y = 1</text>

                    <rect x="770" y="200" width="142" height="94" rx="12" fill="#fdecec" stroke="#d64545" stroke-width="2"/>
                    <text x="841" y="234" font-size="21" font-weight="700">L = u × v</text>
                    <text x="841" y="265" font-size="14">∂L/∂u = v</text>
                    <text x="841" y="284" font-size="14">∂L/∂v = u</text>
                </g>

                <g fill="none" stroke="#2780b8" stroke-width="3" marker-end="url(#opt-chain-branch-blue-arrow)">
                    <path d="M180 154 H375"/>
                    <path d="M180 344 H375"/>
                    <path d="M180 344 H245 V82 H479 V97"/>
                </g>
                <g fill="none" stroke="#7d61b4" stroke-width="3" stroke-dasharray="8 5" marker-end="url(#opt-chain-branch-purple-arrow)">
                    <path d="M180 154 H220 V420 H479 V397"/>
                </g>
                <g fill="none" stroke="#d64545" stroke-width="3" marker-end="url(#opt-chain-branch-red-arrow)">
                    <path d="M573 152 C655 152 680 220 760 236"/>
                    <path d="M573 342 C655 342 680 274 760 258"/>
                </g>

                <text x="278" y="136" text-anchor="middle" font-size="15" font-weight="700" fill="#123f68">∂u/∂x = y</text>
                <text x="290" y="104" text-anchor="middle" font-size="15" font-weight="700" fill="#123f68">∂u/∂y = x</text>
                <text x="278" y="326" text-anchor="middle" font-size="15" font-weight="700" fill="#123f68">∂v/∂y = 1</text>
                <text x="300" y="442" text-anchor="middle" font-size="15" font-weight="700" fill="#665093">∂v/∂x = 1</text>
                <text x="662" y="154" text-anchor="middle" font-size="15" font-weight="700" fill="#a63434">∂L/∂u = v</text>
                <text x="662" y="349" text-anchor="middle" font-size="15" font-weight="700" fill="#a63434">∂L/∂v = u</text>

                <rect x="55" y="478" width="850" height="112" rx="13" fill="#eef8f1" stroke="#69a97a"/>
                <text x="80" y="507" font-size="17" font-weight="700" fill="#1c6b3d">x から L へは2経路ある</text>
                <text x="80" y="540" font-size="18" font-weight="700" fill="#102a43">∂L/∂x = (∂L/∂u)(∂u/∂x) ＋ (∂L/∂v)(∂v/∂x)</text>
                <text x="80" y="572" font-size="18" font-weight="700" fill="#102a43">∂L/∂y = (∂L/∂u)(∂u/∂y) ＋ (∂L/∂v)(∂v/∂y)</text>
                <text x="790" y="507" text-anchor="middle" font-size="15" font-weight="700" fill="#d64545">経路内：×</text>
                <text x="790" y="532" text-anchor="middle" font-size="15" font-weight="700" fill="#d64545">経路間：＋</text>
            </svg>
        </div>
        <table>
            <tr><th>計算グラフの箱</th><th>局所微分</th><th>試験での覚え方</th></tr>
            <tr><td>$u=x+y$（加算）</td><td>$\\partial u/\\partial x=1$、$\\partial u/\\partial y=1$</td><td>加算は、そのまま1を返す</td></tr>
            <tr><td>$u=xy$（乗算）</td><td>$\\partial u/\\partial x=y$、$\\partial u/\\partial y=x$</td><td>乗算は、反対側の入力を返す</td></tr>
            <tr><td>1本道</td><td>局所微分を掛ける</td><td>経路の中は「×」</td></tr>
            <tr><td>同じ変数から複数経路</td><td>各経路の積を足す</td><td>経路どうしは「＋」</td></tr>
        </table>
        <div class="core-strip">
            <strong>本試験の解法：</strong>まず求めたい $\\partial L/\\partial x$ を書く → $x$ から $L$ までの全経路を探す → 各経路の矢印を掛ける → 複数経路の答えを足します。行列・Jacobianでは掛ける順序を勝手に入れ替えません。
        </div>

        <h3>■ 逆伝播：数字を入れて「右へ計算、左へ影響を戻す」</h3>
        <div class="optimization-visual-wrap">
            <svg class="optimization-wide-svg" viewBox="0 0 960 460" role="img" aria-labelledby="opt-backprop-title opt-backprop-desc">
                <title id="opt-backprop-title">順伝播と逆伝播の計算グラフ</title>
                <desc id="opt-backprop-desc">x=2から3倍してy=6、二乗して損失36を求める順伝播と、損失側から局所微分を掛けてxの勾配36を求める逆伝播。分岐では勾配を足す。</desc>
                <defs>
                    <marker id="opt-forward-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2780b8"/></marker>
                    <marker id="opt-backward-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#d64545"/></marker>
                </defs>
                <rect x="18" y="18" width="924" height="424" rx="18" fill="#fbfdff" stroke="#c9d8e6"/>
                <text x="45" y="52" font-size="20" font-weight="700" fill="#102a43">① 順伝播：入力から右へ計算し、損失を出す</text>
                <g font-size="16" text-anchor="middle" fill="#102a43">
                    <rect x="55" y="76" width="120" height="66" rx="10" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/><text x="115" y="105">入力</text><text x="115" y="130" font-weight="700">x = 2</text>
                    <rect x="250" y="76" width="120" height="66" rx="10" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/><text x="310" y="105">この箱</text><text x="310" y="130" font-weight="700">× 3</text>
                    <rect x="445" y="76" width="120" height="66" rx="10" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/><text x="505" y="105">中間値</text><text x="505" y="130" font-weight="700">y = 6</text>
                    <rect x="640" y="76" width="120" height="66" rx="10" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/><text x="700" y="105">この箱</text><text x="700" y="130" font-weight="700">二乗</text>
                    <rect x="815" y="76" width="100" height="66" rx="10" fill="#fdecec" stroke="#d64545" stroke-width="2"/><text x="865" y="105">損失</text><text x="865" y="130" font-weight="700">L = 36</text>
                </g>
                <g fill="none" stroke="#2780b8" stroke-width="3" marker-end="url(#opt-forward-arrow)">
                    <path d="M175 109 H242"/><path d="M370 109 H437"/><path d="M565 109 H632"/><path d="M760 109 H807"/>
                </g>
                <text x="45" y="190" font-size="20" font-weight="700" fill="#102a43">② 逆伝播：損失側から「届いた勾配 × この箱の微分」</text>
                <g font-size="15" text-anchor="middle" fill="#102a43">
                    <rect x="55" y="218" width="130" height="72" rx="10" fill="#fdecec" stroke="#d64545" stroke-width="2"/><text x="120" y="247">入力側へ到着</text><text x="120" y="274" font-weight="700">∂L/∂x = 36</text>
                    <rect x="250" y="218" width="130" height="72" rx="10" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/><text x="315" y="247">×3 の微分</text><text x="315" y="274" font-weight="700">3</text>
                    <rect x="445" y="218" width="130" height="72" rx="10" fill="#fdecec" stroke="#d64545" stroke-width="2"/><text x="510" y="247">途中の勾配</text><text x="510" y="274" font-weight="700">∂L/∂y = 12</text>
                    <rect x="640" y="218" width="130" height="72" rx="10" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/><text x="705" y="247">y² の微分</text><text x="705" y="274" font-weight="700">2y = 12</text>
                    <rect x="815" y="218" width="100" height="72" rx="10" fill="#fdecec" stroke="#d64545" stroke-width="2"/><text x="865" y="247">出発点</text><text x="865" y="274" font-weight="700">1</text>
                </g>
                <g fill="none" stroke="#d64545" stroke-width="3" marker-end="url(#opt-backward-arrow)">
                    <path d="M815 254 H778"/><path d="M640 254 H583"/><path d="M445 254 H388"/><path d="M250 254 H193"/>
                </g>
                <text x="480" y="319" font-size="17" text-anchor="middle" font-weight="700" fill="#d64545">直列は掛ける：1 × 12 × 3 = 36（連鎖律）</text>
                <rect x="48" y="346" width="404" height="72" rx="12" fill="#f5f7fa" stroke="#c9d1dc"/>
                <text x="68" y="373" font-size="16" font-weight="700" fill="#102a43">分岐は足す</text>
                <text x="68" y="400" font-size="15" fill="#31465a">2経路から 2 と 3 が戻る → 合計勾配 2 + 3 = 5</text>
                <rect x="492" y="346" width="420" height="72" rx="12" fill="#eef8f1" stroke="#69a97a"/>
                <text x="512" y="373" font-size="16" font-weight="700" fill="#1c6b3d">自動微分がすること</text>
                <text x="512" y="400" font-size="15" fill="#31465a">順伝播の箱を記録し、この掛け算・足し算を自動実行</text>
            </svg>
        </div>

        <h3>■ デルタ問題は「何を求めるか」で式を選ぶ</h3>
        <div class="optimization-test-point">
            <strong>問題文の合図：</strong>「$z=wx+b$」「$Z=XW+b$」「デルタ $\\delta$／$\\Delta$」「重み・バイアス・入力の勾配」「Shape」が出たら、この型を使います。<br>
            <strong>デルタの扱い方：</strong>$\\Delta=\\partial L/\\partial Z$ は、後ろの層から $Z$ まで<strong>すでに戻ってきた途中の勾配</strong>です。学習率や更新量ではありません。
        </div>
        <div class="optimization-visual-wrap">
            <svg class="optimization-wide-svg" viewBox="0 0 960 270" role="img" aria-labelledby="opt-delta-title opt-delta-desc">
                <title id="opt-delta-title">全結合層の順伝播とデルタが戻る位置</title>
                <desc id="opt-delta-desc">入力Xと重みWを掛け、バイアスbを加えてZを作り、後続層から損失Lへ進む。逆伝播では損失側からデルタがZへ戻る。</desc>
                <defs>
                    <marker id="opt-delta-forward-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#2780b8"/></marker>
                    <marker id="opt-delta-back-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#d64545"/></marker>
                </defs>
                <rect x="18" y="18" width="924" height="234" rx="16" fill="#fbfdff" stroke="#c9d8e6"/>
                <text x="42" y="49" font-size="19" font-weight="700" fill="#102a43">順伝播：X × W ＋ b で Z を作り、Lossまで計算する</text>
                <g font-size="15" text-anchor="middle" fill="#102a43">
                    <rect x="48" y="70" width="150" height="64" rx="10" fill="#eaf4fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="123" y="96" font-weight="700">入力 X</text><text x="123" y="120">(B, D_in)</text>
                    <rect x="248" y="70" width="190" height="64" rx="10" fill="#fff7e3" stroke="#e3a11a" stroke-width="2"/>
                    <text x="343" y="88" font-weight="700">× W ＋ b</text><text x="343" y="108" font-size="13">W:(D_in, D_out)</text><text x="343" y="127" font-size="13">b:(D_out,)</text>
                    <rect x="488" y="70" width="150" height="64" rx="10" fill="#f2edfb" stroke="#7d61b4" stroke-width="2"/>
                    <text x="563" y="96" font-weight="700">活性化前 Z</text><text x="563" y="120">(B, D_out)</text>
                    <rect x="688" y="70" width="100" height="64" rx="10" fill="#f5f7fa" stroke="#8796a5" stroke-width="2"/>
                    <text x="738" y="96">後続の層</text><text x="738" y="120">…</text>
                    <rect x="838" y="70" width="80" height="64" rx="10" fill="#fdecec" stroke="#d64545" stroke-width="2"/>
                    <text x="878" y="96" font-weight="700">Loss</text><text x="878" y="120">L</text>
                </g>
                <g fill="none" stroke="#2780b8" stroke-width="3" marker-end="url(#opt-delta-forward-arrow)">
                    <path d="M198 102 H240"/><path d="M438 102 H480"/><path d="M638 102 H680"/><path d="M788 102 H830"/>
                </g>
                <path d="M878 142 V178 H563 V142" fill="none" stroke="#d64545" stroke-width="3" marker-end="url(#opt-delta-back-arrow)"/>
                <text x="726" y="201" text-anchor="middle" font-size="16" font-weight="700" fill="#d64545">逆伝播：Loss側からZへ Δ = ∂L/∂Z が戻る</text>
                <text x="480" y="232" text-anchor="middle" font-size="15" fill="#42566a">B＝バッチ数　D_in＝入力特徴数　D_out＝出力ユニット数</text>
            </svg>
        </div>
        <table>
            <tr><th>問題で何を求める？</th><th>使う式</th><th>答えのShape</th><th>覚え方</th></tr>
            <tr><td>Softmax＋交差エントロピーの出力デルタ</td><td>合計損失：$\\Delta=y-\\mathrm{correct}$<br>平均損失：$\\Delta=(y-\\mathrm{correct})/B$</td><td>$(B,D_{out})$</td><td>予測確率－one-hot正解</td></tr>
            <tr><td>重み $W$ の勾配</td><td>$\\partial L/\\partial W=X^T\\Delta$</td><td>$(D_{in},D_{out})$＝$W$と同じ</td><td>入力を転置してデルタ</td></tr>
            <tr><td>バイアス $b$ の勾配</td><td>$\\partial L/\\partial b=\\mathrm{sum}(\\Delta,axis=0)$</td><td>$(D_{out},)$＝$b$と同じ</td><td>バッチ方向を足す</td></tr>
            <tr><td>入力 $X$ へ戻す勾配</td><td>$\\partial L/\\partial X=\\Delta W^T$</td><td>$(B,D_{in})$＝$X$と同じ</td><td>デルタに重みの転置</td></tr>
        </table>
        <div class="optimization-test-point">
            <strong>解き方は4手：</strong><br>
            ① 求めるものが $W$・$b$・$X$・出力デルタのどれか確認<br>
            ② $X:(B,D_{in})$、$W:(D_{in},D_{out})$、$\\Delta:(B,D_{out})$ とShapeを書く<br>
            ③ 上の表から式を選び、行列積の内側の数字が一致するか確認<br>
            ④ 最後に「勾配のShape＝勾配を求めた元の変数のShape」を確認
        </div>
        <div class="optimization-test-point">
            <strong>解法例：</strong>$X:(8,6)$、$W:(6,4)$、$\\Delta:(8,4)$ で重み勾配を聞かれたら、<br>
            $\\partial L/\\partial W=X^T\\Delta=(6,8)(8,4)=(6,4)$。答えが元の $W:(6,4)$ と同じShapeなので確認できます。<br>
            <strong>1サンプルのスカラー問題：</strong>$z=wx+b$なら同じ考え方で $\\partial L/\\partial w=\\delta x$ です。<br>
            <strong>平均の注意：</strong>バッチサイズ $B$ で割るのは、損失・デルタ・更新処理のどこか1か所です。二重に割らないようにします。
        </div>
        <table>
            <tr><th>言葉</th><th>初心者向けの意味</th><th>試験で問われること</th></tr>
            <tr><td><strong>誤差逆伝播</strong></td><td>損失への影響を、右から左へ戻す手順</td><td>直列は掛ける／分岐は足す</td></tr>
            <tr><td><strong>自動微分</strong></td><td>計算グラフを記録し、逆伝播を自動計算</td><td>順伝播の記録→逆向き計算</td></tr>
            <tr><td><strong>勾配消失</strong></td><td>1未満の局所微分を何度も掛け、入力側の勾配が極端に小さくなる</td><td>深い層／Sigmoid／入力側の重みが更新されにくい</td></tr>
            <tr><td><strong>Optimizer</strong></td><td>得られた勾配を使って重みを更新</td><td>backwardとは別担当</td></tr>
        </table>

        <h3>■ オプティマイザは「何を記憶するか」で見分ける</h3>
        <table class="optimization-keyword-table">
            <tr><th>手法</th><th>一言キーワード</th><th>問題文の合図</th></tr>
            <tr><td>SGD</td><td>今だけ</td><td>現在のミニバッチ勾配だけで更新</td></tr>
            <tr><td>Momentum</td><td>慣性</td><td>過去の移動方向を残し、振動を抑える</td></tr>
            <tr><td>NAG</td><td>先読み</td><td>慣性で進んだ先の位置で勾配を測る</td></tr>
            <tr><td>AdaGrad</td><td>全履歴</td><td>勾配二乗を累積し、実効学習率が下がり続ける</td></tr>
            <tr><td>RMSProp</td><td>古い履歴を忘れる</td><td>勾配二乗の指数移動平均</td></tr>
            <tr><td>Adam</td><td>方向＋歩幅</td><td>一次・二次モーメント＋初期バイアス補正</td></tr>
        </table>

        <h3>■ オプティマイザの式（確認用）</h3>
        <p>2026シラバスの主要手法は、SGD、Momentum/NAG、AdaGrad、RMSProp、Adamです。式と特徴を同じ行で確認します。</p>
        <p><strong>共通記号：</strong>$w_t$＝現在の重み、$g_t$＝勾配、$\\eta$＝学習率、$t$＝更新回数</p>
        <table class="optimizer-formula-table">
            <tr><th>名称</th><th>軌跡</th><th>更新式・特徴・試験のツボ</th></tr>
            <tr>
                <td><strong>SGD</strong><br>(確率的勾配降下法)</td>
                <td>
                    <svg class="opt-icon" viewBox="0 0 80 50">
                        <ellipse cx="70" cy="25" rx="5" ry="5" fill="#e74c3c" />
                        <path d="M10,10 L30,40 L50,15 L60,30 L70,25" stroke="#e74c3c" class="path-line" stroke-linejoin="bevel"/>
                    </svg>
                </td>
                <td>
                    <strong>「千鳥足の酔っ払い」</strong><br>
                    <div class="optimizer-equation">$\\displaystyle w_{t+1}=w_t-\\eta g_t$</div>
                    現在の勾配だけで更新。<br>
                    <span style="color:red;">⚠ 弱点:</span> ジグザグして効率が悪い。
                </td>
            </tr>
            <tr>
                <td><strong>Momentum</strong><br>(モーメンタム)</td>
                <td>
                    <svg class="opt-icon" viewBox="0 0 80 50">
                        <ellipse cx="70" cy="25" rx="5" ry="5" fill="#3498db" />
                        <path d="M10,10 Q40,60 75,25" stroke="#3498db" class="path-line" fill="none"/>
                    </svg>
                </td>
                <td>
                    <strong>「重い鉄球 (慣性)」</strong><br>
                    <div class="optimizer-equation">$\\displaystyle v_t=\\alpha v_{t-1}+g_t$</div>
                    <div class="optimizer-equation">$\\displaystyle w_{t+1}=w_t-\\eta v_t$</div>
                    過去の速度を維持。<br>
                    <span style="color:red;">⚠ 弱点:</span> 行き過ぎる（オーバーシュート）。
                </td>
            </tr>
            <tr>
                <td><strong>NAG</strong><br>(Nesterov)</td>
                <td>
                    <svg class="opt-icon" viewBox="0 0 80 50">
                        <ellipse cx="70" cy="25" rx="5" ry="5" fill="#2980b9" />
                        <path d="M10,10 Q40,60 80,30 M80,30 L70,25" stroke="#2980b9" class="path-line" fill="none" stroke-dasharray="2,2"/>
                    </svg>
                </td>
                <td>
                    <strong>「先読みするMomentum」</strong><br>
                    <div class="optimizer-equation">$\\displaystyle w_{\\mathrm{lookahead}}=w_t+\\alpha\\,\\Delta w_{t-1}$</div>
                    <div class="optimizer-equation">$\\displaystyle g_t=\\nabla L(w_{\\mathrm{lookahead}})$</div>
                    <div class="optimizer-equation">$\\displaystyle \\Delta w_t=\\alpha\\,\\Delta w_{t-1}-\\eta g_t$</div>
                    <div class="optimizer-equation">$\\displaystyle w_{t+1}=w_t+\\Delta w_t$</div>
                    「慣性で進んだ<strong>未来の位置</strong>」で勾配を計算して補正する。<br>
                    Momentumの行き過ぎブレーキ版。
                </td>
            </tr>
            <tr>
                <td><strong>AdaGrad</strong><br>(アダグラッド)</td>
                <td>
                    <svg class="opt-icon" viewBox="0 0 80 50">
                        <ellipse cx="70" cy="25" rx="5" ry="5" fill="#ccc" />
                        <path d="M10,25 L30,25 L40,25" stroke="#f39c12" class="path-line" stroke-dasharray="5,2"/>
                        <circle cx="40" cy="25" r="3" fill="#f39c12" />
                    </svg>
                </td>
                <td>
                    <strong>「疲れるランナー」</strong><br>
                    <div class="optimizer-equation">$\\displaystyle G_t=G_{t-1}+g_t^2$</div>
                    <div class="optimizer-equation">$\\displaystyle w_{t+1}=w_t-\\frac{\\eta g_t}{\\sqrt{G_t}+\\varepsilon}$</div>
                    過去の勾配二乗を全て累積。<br>
                    <span style="color:red;">⚠ 弱点:</span> 実効学習率が下がり続け、更新が極端に小さくなって<strong>停滞しやすい</strong>。
                </td>
            </tr>
            <tr>
                <td><strong>RMSProp</strong><br>(アールエムエスプロップ)</td>
                <td>
                    <svg class="opt-icon" viewBox="0 0 80 50">
                        <ellipse cx="70" cy="25" rx="5" ry="5" fill="#2ecc71" />
                        <path d="M10,25 L40,25 L70,25" stroke="#2ecc71" class="path-line" />
                    </svg>
                </td>
                <td>
                    <strong>「忘れるAdaGrad」</strong><br>
                    <div class="optimizer-equation">$\\displaystyle v_t=\\rho v_{t-1}+(1-\\rho)g_t^2$</div>
                    <div class="optimizer-equation">$\\displaystyle w_{t+1}=w_t-\\frac{\\eta g_t}{\\sqrt{v_t}+\\varepsilon}$</div>
                    過去を徐々に忘れることで、学習を継続させる。
                </td>
            </tr>
            <tr>
                <td><strong>Adam</strong><br>(アダム)</td>
                <td>
                    <svg class="opt-icon" viewBox="0 0 80 50">
                        <ellipse cx="70" cy="25" rx="5" ry="5" fill="#9b59b6" />
                        <path d="M10,10 Q40,25 70,25" stroke="#9b59b6" class="path-line" />
                    </svg>
                </td>
                <td>
                    <strong>「全部入り」</strong><br>
                    <div class="optimizer-equation">$\\displaystyle m_t=\\beta_1m_{t-1}+(1-\\beta_1)g_t$</div>
                    <div class="optimizer-equation">$\\displaystyle v_t=\\beta_2v_{t-1}+(1-\\beta_2)g_t^2$</div>
                    <div class="optimizer-equation">$\\displaystyle \\hat{m}_t=\\frac{m_t}{1-\\beta_1^t},\\quad \\hat{v}_t=\\frac{v_t}{1-\\beta_2^t}$</div>
                    <div class="optimizer-equation">$\\displaystyle w_{t+1}=w_t-\\frac{\\eta\\hat{m}_t}{\\sqrt{\\hat{v}_t}+\\varepsilon}$</div>
                    Momentum + RMSProp。<br>
                    学習初期は移動平均を<strong>バイアス補正</strong>。<br>
                    広く用いられる代表的な適応的最適化手法。
                </td>
            </tr>
        </table>
        <p><strong>式の注意：</strong>$\\varepsilon$ は0除算と数値不安定を防ぐ小さな定数です。Momentum/NAGは速度の符号定義によって式の＋・－が変わりますが、<strong>過去の移動方向を残す／先で勾配を見る</strong>という意味は同じです。</p>

        <h3>■ Xavier・Heは「活性化関数」を見て選ぶ</h3>
        <div class="optimization-visual-wrap">
            <svg class="optimization-wide-svg" viewBox="0 0 960 430" role="img" aria-labelledby="opt-init-title opt-init-desc">
                <title id="opt-init-title">Xavier初期化とHe初期化の選び方</title>
                <desc id="opt-init-desc">sigmoidまたはtanhならXavier、ReLUならHeを選ぶ。Xavierはfan-inとfan-out、Heはfan-inを使う。標準偏差は分散の平方根。</desc>
                <defs><marker id="opt-init-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#466681"/></marker></defs>
                <rect x="18" y="18" width="924" height="394" rx="18" fill="#fbfdff" stroke="#c9d8e6"/>
                <rect x="330" y="42" width="300" height="58" rx="12" fill="#102a43"/>
                <text x="480" y="78" text-anchor="middle" font-size="19" font-weight="700" fill="#fff">最初に活性化関数を見る</text>
                <g fill="none" stroke="#466681" stroke-width="3" marker-end="url(#opt-init-arrow)"><path d="M420 100 L280 150"/><path d="M540 100 L680 150"/></g>
                <rect x="78" y="153" width="355" height="142" rx="15" fill="#eef6fc" stroke="#2780b8" stroke-width="2"/>
                <text x="255" y="183" text-anchor="middle" font-size="19" font-weight="700" fill="#123f68">sigmoid／tanh → Xavier（Glorot）</text>
                <text x="105" y="219" font-size="16" fill="#102a43">使う数：fan_in と fan_out</text>
                <text x="105" y="251" font-size="18" font-weight="700" fill="#123f68">分散 = 2 / (fan_in + fan_out)</text>
                <text x="105" y="278" font-size="14" fill="#31465a">入出力が同じ n のときだけ 1 / n</text>
                <rect x="527" y="153" width="355" height="142" rx="15" fill="#fff5e8" stroke="#e39b24" stroke-width="2"/>
                <text x="705" y="183" text-anchor="middle" font-size="19" font-weight="700" fill="#8a5100">ReLU → He（Kaiming）</text>
                <text x="554" y="219" font-size="16" fill="#102a43">使う数：fan_in</text>
                <text x="554" y="251" font-size="18" font-weight="700" fill="#8a5100">分散 = 2 / fan_in</text>
                <text x="554" y="278" font-size="14" fill="#31465a">負側が0になるReLUの信号を補う</text>
                <rect x="78" y="320" width="804" height="68" rx="12" fill="#f5f7fa" stroke="#c9d1dc"/>
                <text x="102" y="347" font-size="16" font-weight="700" fill="#102a43">fan_in＝入力数　fan_out＝出力数</text>
                <text x="102" y="374" font-size="15" fill="#31465a">例：Linear(100, 50) → fan_in=100、fan_out=50　／　標準偏差を聞かれたら √分散</text>
            </svg>
        </div>
        <div class="optimization-test-point">
            <strong>試験の解く順：</strong>① ReLUかsigmoid/tanhか → ② $fan_{in}$・$fan_{out}$ を読む → ③ 分散か標準偏差か → ④ 必要なら平方根。<br>
            <strong>重みが小さすぎる</strong>と信号・勾配が消え、<strong>大きすぎる</strong>と爆発しやすいため、適度な広がりを保つのが初期化の目的です。
        </div>
        <table>
            <tr><th>例：$fan_{in}=fan_{out}=100$</th><th>分散</th><th>標準偏差</th></tr>
            <tr><td>Xavier</td><td>$2/(100+100)=0.01$</td><td>$\\sqrt{0.01}=0.1$</td></tr>
            <tr><td>He</td><td>$2/100=0.02$</td><td>$\\sqrt{0.02}\\approx0.141$</td></tr>
        </table>

        <h3>■ Xavier・Heの式（確認用）</h3>
        <p>Step 0（準備段階）で、乱数の「広がり具合（分散）」を決めます。一様分布の上下限は、分散式を理解した後に確認します。</p>
        <p><strong>共通記号：</strong>$fan_{in}$＝入力数、$fan_{out}$＝出力数、$\\mathrm{Var}(w)$＝分散、$\\sigma$＝標準偏差</p>
        <table class="initialization-formula-table">
            <tr><th>初期化手法</th><th>相性の良い関数</th><th>式・特徴</th></tr>
            <tr>
                <td><strong>Xavier (Glorot)</strong></td>
                <td><strong>Sigmoid, Tanh</strong><br>(S字・対称)</td>
                <td>
                    <strong>正規分布</strong>
                    <div class="initialization-equation">$\\displaystyle \\mathrm{Var}(w)=\\frac{2}{fan_{in}+fan_{out}}$</div>
                    <div class="initialization-equation">$\\displaystyle \\sigma=\\sqrt{\\frac{2}{fan_{in}+fan_{out}}}$</div>
                    <strong>一様分布</strong>
                    <div class="initialization-equation">$\\displaystyle a=\\sqrt{\\frac{6}{fan_{in}+fan_{out}}}$</div>
                    <div class="initialization-equation">$\\displaystyle w\\sim U(-a,a)$</div>
                    <small>$fan_{in}=fan_{out}=n$ なら、分散は $1/n$、標準偏差は $1/\\sqrt{n}$。</small>
                </td>
            </tr>
            <tr>
                <td><strong>He (Kaiming)</strong></td>
                <td><strong>ReLU</strong><br>(折れ線・非対称)</td>
                <td>
                    <strong>正規分布</strong>
                    <div class="initialization-equation">$\\displaystyle \\mathrm{Var}(w)=\\frac{2}{fan_{in}}$</div>
                    <div class="initialization-equation">$\\displaystyle \\sigma=\\sqrt{\\frac{2}{fan_{in}}}$</div>
                    <strong>一様分布</strong>
                    <div class="initialization-equation">$\\displaystyle a=\\sqrt{\\frac{6}{fan_{in}}}$</div>
                    <div class="initialization-equation">$\\displaystyle w\\sim U(-a,a)$</div>
                </td>
            </tr>
        </table>
        <p><strong>最重要：</strong>Xavierの $1/n$ は、$fan_{in}=fan_{out}=n$ の場合だけ使える簡略形です。一般形は $2/(fan_{in}+fan_{out})$ です。</p>

        <h3>■ 最後はこの表だけ</h3>
        <table>
            <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
            <tr><td>全データで1回の勾配</td><td><strong>バッチ学習／最急降下法</strong></td><td>1回の計算・メモリ負荷が大きい。</td></tr>
            <tr><td>一部データをまとめて更新</td><td><strong>ミニバッチ学習</strong></td><td>計算効率と勾配の揺らぎを両立する。</td></tr>
            <tr><td>更新の歩幅 $\\eta$</td><td><strong>学習率</strong></td><td>大きすぎると振動・発散、小さすぎると遅い。</td></tr>
            <tr><td>現在のミニバッチ勾配だけで更新</td><td><strong>SGD</strong><br><small>Stochastic Gradient Descent（確率的勾配降下法）</small></td><td>$w\\leftarrow w-\\eta g$。更新経路が振動することがある。</td></tr>
            <tr><td>過去の移動方向を慣性として蓄積</td><td><strong>Momentum</strong></td><td>振動を打ち消し、同じ方向へ加速する。</td></tr>
            <tr><td>一歩先の位置で勾配を見る</td><td><strong>NAG</strong><br><small>Nesterov Accelerated Gradient</small></td><td>Momentumを先読みして修正する。</td></tr>
            <tr><td>過去の勾配二乗を累積</td><td><strong>AdaGrad</strong><br><small>Adaptive Gradient</small></td><td>スパース勾配に強いが、学習率が下がり続ける。</td></tr>
            <tr><td>勾配二乗の移動平均で割る</td><td><strong>RMSProp</strong><br><small>Root Mean Square Propagation</small></td><td>AdaGradの古い履歴を忘れ、停滞を抑える。</td></tr>
            <tr><td>一次・二次モーメント＋初期バイアス補正</td><td><strong>Adam</strong><br><small>Adaptive Moment Estimation</small></td><td>MomentumとRMSPropの考えを組み合わせる。</td></tr>
            <tr><td>直列演算の勾配</td><td><strong>連鎖律：掛ける</strong></td><td>損失側から届いた勾配×その箱の微分。</td></tr>
            <tr><td>同じ変数から分岐した勾配</td><td><strong>各経路を加算</strong></td><td>変数への総影響をすべて足す。</td></tr>
            <tr><td>$z=wx+b$ の誤差信号</td><td><strong>$\\delta=\\partial L/\\partial z$</strong></td><td>$\\partial L/\\partial w=\\delta x$。</td></tr>
            <tr><td>損失1個から多数パラメータへ戻る</td><td><strong>逆モード自動微分</strong></td><td>出力側から1回戻ると全勾配を効率よく得られる。</td></tr>
            <tr><td>Sigmoid／tanhと相性</td><td><strong>Xavier（Glorot）初期化</strong></td><td>入出力の分散を保ち、飽和を抑える。</td></tr>
            <tr><td>ReLUと相性／$fan_{in}$が与えられる</td><td><strong>He（Kaiming）初期化</strong></td><td>分散$2/fan_{in}$、標準偏差$\\sqrt{2/fan_{in}}$。</td></tr>
            <tr><td>全ニューロンを同じ値で初期化</td><td><strong>対称性が破れない</strong></td><td>同じ勾配で同じ特徴しか学べないため、重みはランダムにする。</td></tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】
        // ---------------------------------------------------------
        {
            category: "初期化手法",
            question: "活性化関数に「ReLU」を用いる場合、重みの初期値として最も適切なものはどれか。",
            options: ["Heの初期値", "Xavier (Glorot) の初期値", "標準偏差0.01のガウス分布", "全ての重みを0にする"],
            answer: 0,
            explanation: "ReLUでは負側の出力が0になるため、その影響を補って信号の広がりを保ちやすいHe初期化が適します。試験の合図は「ReLU→He」です。"
        },
        {
            category: "初期化手法",
            question: "活性化関数に「Sigmoid」または「Tanh」を用いる場合、最も適切な重みの初期値はどれか。",
            options: ["Heの初期値", "Xavier (Glorot) の初期値", "分散1で固定した一様分布", "全ての重みを1にする"],
            answer: 1,
            explanation: "S字型の関数にはXavier（Glorot）の初期値が適しています。正規分布では分散 $2/(fan_{in}+fan_{out})$ を使い、入出力数が同じ $n$ なら $1/n$ になります。"
        },
        {
            category: "SGD",
            question: "SGD（確率的勾配降下法）の更新式において、パラメータ更新の「歩幅」を決めるハイパーパラメータ $\\eta$ を何と呼ぶか。",
            options: ["学習率 (Learning Rate)", "モーメンタム (Momentum)", "減衰率 (Decay Rate)", "バッチサイズ (Batch Size)"],
            answer: 0,
            explanation: "勾配方向にどれだけ進むかを決める係数です。大きすぎると振動・発散しやすく、小さすぎると学習が極端に遅くなります。"
        },
        {
            category: "誤差逆伝播法",
            question: "誤差逆伝播法（Backpropagation）において、微分を効率よく計算するために利用される数学的な性質はどれか。",
            options: ["連鎖律 (Chain Rule)", "積分法", "二分探索", "最短経路法"],
            answer: 0,
            explanation: "合成関数では、損失側から届いた勾配に「その箱の微分」を掛けます。式では $\\frac{\\partial L}{\\partial x}=\\frac{\\partial L}{\\partial y}\\frac{\\partial y}{\\partial x}$ です。この掛け算を出力側から繰り返します。"
        },
        {
            category: "Adam",
            question: "Adamの「一次モーメント」と「二次モーメント」の役割を説明する組み合わせとして、最も適切なものはどれか。",
            options: ["一次はMomentum的な方向、二次はRMSProp的な歩幅調整", "一次はXavier、二次はHe", "一次はDropout、二次はBatchNorm", "一次は誤差逆伝播、二次はデータ拡張"],
            answer: 0,
            explanation: "Adamは一次モーメントで勾配の方向を平滑化し、二次モーメントでパラメータごとの歩幅を調整します。試験では「方向＋歩幅＋初期バイアス補正」が合図です。"
        },
        {
            category: "AdaGrad",
            question: "AdaGradの最大の特徴であり、同時に欠点（学習が停滞する原因）ともなり得るのはどれか。",
            options: ["過去の勾配の二乗和を累積し、学習率を徐々に小さくする", "慣性項を用いて、過去の移動方向を維持する", "勾配の符号のみを利用する", "学習率をランダムに変化させる"],
            answer: 0,
            explanation: "「よく更新されたパラメータの実効学習率を下げる」という適応的な調整です。ただし勾配二乗和を累積し続けるため、実効学習率が極端に小さくなって停滞しやすい点が弱点です。"
        },
        {
            category: "ミニバッチ学習",
            question: "全データの中から一部（例: 32個）をランダムに選んで勾配を計算し、パラメータを更新する手法を何と呼ぶか。",
            options: ["ミニバッチ学習", "バッチ学習（最急降下法）", "オンライン学習", "転移学習"],
            answer: 0,
            explanation: "計算コストを抑えつつ、ランダム性による局所解回避の効果も期待できる、現在の深層学習の標準的な学習方法です。"
        },
        {
            category: "Momentum",
            question: "Momentum（モメンタム）SGDにおける「物理的なイメージ」として正しいものはどれか。",
            options: ["ボールが谷底に向かって転がり落ちる動き（慣性）", "熱した金属が徐々に冷えていく動き", "生物が環境に適応して進化する動き", "気体分子がランダムに拡散する動き"],
            answer: 0,
            explanation: "現在の勾配だけでなく「過去の移動速度（慣性）」を加算することで、ジグザグした振動を抑えてスムーズに加速します。"
        },
        {
            category: "勾配消失",
            question: "誤差逆伝播法において、層が深くなるにつれて勾配の値がどんどん小さくなり、入力層付近の重みが更新されなくなる現象はどれか。",
            options: ["勾配消失 (Vanishing Gradient)", "勾配爆発 (Exploding Gradient)", "過学習 (Overfitting)", "モード崩壊 (Mode Collapse)"],
            answer: 0,
            explanation: "特にSigmoid関数などを多層に重ねた場合に発生しやすい問題です。"
        },
        {
            category: "自動微分",
            question: "PyTorchやTensorFlowなどのフレームワークで採用されている、計算グラフを構築して勾配を自動的に求める仕組みを何と呼ぶか。",
            options: ["自動微分 (Automatic Differentiation)", "数値微分", "記号微分", "有限差分法"],
            answer: 0,
            explanation: "順伝播時に「どの演算を、どの順で行ったか」と中間値を計算グラフへ記録し、backward時に各箱の微分を掛けながら逆向きにたどります。手計算の連鎖律をフレームワークが自動実行する仕組みです。"
        },
        {
            category: "RMSProp",
            question: "RMSPropがAdaGradの弱点を克服するために導入した仕組みは何か。",
            options: ["過去の勾配二乗の「指数移動平均」をとり、古い情報を徐々に忘れる", "学習率を固定した", "慣性項を追加した", "勾配を正規化した"],
            answer: 0,
            explanation: "古い勾配二乗の履歴を減衰させ、AdaGradのように二乗和を一方向へ累積し続けないため、実効学習率の過度な低下を抑えます。生の勾配の移動平均を使うMomentumとの違いも押さえましょう。"
        },
        {
            category: "Nesterov (NAG)",
            question: "Nesterovの加速勾配法 (NAG) は、Momentumをどのように改良した手法か。",
            options: ["「現在位置」ではなく、「慣性で進んだ先（未来の位置）」での勾配を使って補正する", "過去の勾配を忘れるようにした", "学習率を自動調整した", "重みをランダムにリセットした"],
            answer: 0,
            explanation: "「どうせそっちに行くなら、行った先でブレーキをかけるか判断しよう」という先読みの考え方を取り入れています。"
        },
        {
            category: "初期化のタイミング",
            question: "重みの初期化（Initialization）は、学習プロセスのどの段階で行われるか。",
            options: ["学習ループ（Epoch 1）が始まる前の、モデル定義直後", "毎回のミニバッチ処理の後", "損失関数を計算する直前", "推論を行う直前"],
            answer: 0,
            explanation: "初期化は「Step 0」です。一度学習が始まったら、重みはオプティマイザによって更新されていくため、再初期化は（意図的なリセットを除き）行いません。"
        },
        {
            category: "バッチ学習",
            question: "全データを一度に使ってパラメータを1回更新する「バッチ学習（最急降下法）」のデメリットは何か。",
            options: ["1回の更新に必要な計算量・メモリが大きく、更新頻度も低くなる", "必ず計算が不安定になる", "行列演算で並列化できない", "メモリを全く使わない"],
            answer: 0,
            explanation: "全データから正確な勾配を求められる一方、1回の更新が重く、次の更新まで時間がかかります。大規模データではミニバッチが実用的です。"
        },

        // ---------------------------------------------------------
        // 【応用編】
        // ---------------------------------------------------------
        {
            category: "Heの初期値の分散",
            question: "Heの初期値において、前の層のノード数を $n$ としたとき、重みの分散 $\\sigma^2$ はどのように設定されるか。",
            options: ["$\\frac{2}{n}$", "$\\frac{1}{n}$", "$\\frac{1}{\\sqrt{n}}$", "$n$"],
            answer: 0,
            explanation: "He初期化はReLUの負側が0になる影響を補うため、$fan_{in}=n$なら分散を$2/n$とします。Xavierの$1/n$は$fan_{in}=fan_{out}=n$の場合の簡略形です。"
        },
        {
            category: "Adamのハイパーパラメータ",
            question: "Adamには学習率以外に $\\beta_1, \\beta_2$ というハイパーパラメータがある。これらは通常何を制御するものか。",
            options: ["Momentum（一次モーメント）と RMSProp（二次モーメント）の減衰率", "学習率の初期値と終了値", "正則化の強さ", "バッチサイズ"],
            answer: 0,
            explanation: "通常 $\\beta_1=0.9$ (慣性)、$\\beta_2=0.999$ (二乗和の移動平均) 程度に設定され、過去の情報をどれくらい残すかを制御します。"
        },
        {
            category: "スパースデータ",
            question: "自然言語処理など、出現頻度が低い単語（スパースデータ）が多いタスクにおいて、SGDよりもAdaGradやAdamが有利とされる理由は何か。",
            options: ["頻繁に更新されるパラメータの学習率は下げ、滅多に更新されないパラメータの実効学習率を大きく保てるから", "計算速度が必ず最速になるから", "メモリ消費が必ず最小になるから", "初期値に依存しなくなるから"],
            answer: 0,
            explanation: "適応的学習率の手法は、パラメータごとに学習率を変えられるため、更新回数が少ないレアな特徴量もしっかり学習できます。"
        },
        {
            category: "ミニバッチ学習の利点",
            question: "オンライン学習（N=1）と比較した際の、ミニバッチ学習（N=32〜128程度）の計算機上の利点は何か。",
            options: ["行列演算による並列化が可能で、GPUの計算能力を効率よく利用できる", "メモリ使用量が最小になる", "局所解に陥りにくい", "過学習しにくい"],
            answer: 0,
            explanation: "1つずつ計算するより、まとめて計算したほうがSIMD命令やGPU並列処理を活かして高速に処理できます。"
        },
        {
            category: "Nesterovの数式イメージ",
            question: "符号込みの前回更新量を$\\Delta w_{t-1}$とし、$\\Delta w_t=\\alpha\\Delta w_{t-1}-\\eta\\nabla E(\\cdot)$と定義する。Nesterov (NAG) が勾配を測る位置はどれか。",
            options: ["$w_t+\\alpha\\Delta w_{t-1}$（慣性で進んだ先）", "$w_t$（現在位置だけ）", "$w_0$（初期位置）", "勾配を測らない"],
            answer: 0,
            explanation: "前回の更新量$\\Delta w_{t-1}$は進行方向の符号を含みます。したがって先読み位置は$w_t+\\alpha\\Delta w_{t-1}$です。そこで勾配を測り、行き過ぎを早めに補正します。"
        },
        {
            category: "重みの対称性",
            question: "初期化の際に、全ての重みを「0」や「定数」にしてはいけない理由は何か。",
            options: ["全てのニューロンが同じ勾配を持ち、同じように更新されてしまうため（対称性の破れが起きない）", "初期値が0だと計算エラーになるから", "学習率が0になるから", "過学習するから"],
            answer: 0,
            explanation: "みんな同じ値だと、みんな同じ修正を受けるため、結局1つのニューロンがあるのと同じ表現力しか持てなくなります。だから「乱数」が必要です。"
        },
        {id:"opt-sgd-step-calc",category:"SGD(計算)",kind:"計算",question:"重み$w=2$、勾配$g=3$、学習率$\\eta=0.1$のSGD更新後のwはどれか。",options:["1.7","2.3","1.9","-1"],answer:0,explanation:"<strong>使う公式：</strong>$w_{new}=w-\\eta g$。<br><strong>代入：</strong>$2-0.1×3=1.7$。<br><strong>答え：</strong>1.7です。勾配と逆向きへ進みます。"},
        {id:"opt-momentum-calc",category:"Momentum(計算)",kind:"計算",question:"$v_t=0.9v_{t-1}+g_t$、$v_{t-1}=2,g_t=1$なら$v_t$はいくつか。",options:["2.8","1.9","3","1.8"],answer:0,explanation:"<strong>使う公式：</strong>$v_t=0.9v_{t-1}+g_t$。<br><strong>代入：</strong>$0.9×2+1=2.8$。<br><strong>答え：</strong>2.8です。過去の方向を慣性として残します。"},
        {id:"opt-adagrad-calc",category:"AdaGrad(計算)",kind:"計算",question:"AdaGradで今回の更新に使う累積二乗和が$G_t=9$、現在勾配$g_t=3$、学習率1、$\\epsilon$無視の更新量の大きさはどれか。",options:["1","3","1/3","9"],answer:0,explanation:"<strong>使う公式：</strong>更新量の大きさは$\\eta g_t/\\sqrt{G_t}$。<br><strong>代入：</strong>$1×3/\\sqrt{9}=3/3=1$。<br><strong>答え：</strong>1です。累積値が増えるほど実効学習率が下がります。"},
        {id:"opt-rmsprop-calc",category:"RMSProp(計算)",kind:"計算",question:"RMSPropの二乗勾配移動平均$v_t=0.9v_{t-1}+0.1g_t^2$で、$v_{t-1}=4,g_t=2$なら$v_t$はどれか。",options:["4","3.6","4.4","2"],answer:0,explanation:"<strong>使う公式：</strong>$v_t=0.9v_{t-1}+0.1g_t^2$。<br><strong>代入：</strong>$0.9×4+0.1×2^2=3.6+0.4=4$。<br><strong>答え：</strong>4です。古い履歴を徐々に忘れる移動平均です。"},
        {id:"opt-adam-first",category:"Adam(計算)",kind:"計算",question:"Adamの一次モーメント$m_t=0.9m_{t-1}+0.1g_t$で、$m_{t-1}=0,g_t=5$なら$m_t$はどれか。",options:["0.5","5","4.5","0.1"],answer:0,explanation:"<strong>使う公式：</strong>$m_t=0.9m_{t-1}+0.1g_t$。<br><strong>代入：</strong>$0.9×0+0.1×5=0.5$。<br><strong>答え：</strong>0.5です。実際のAdamは初期バイアス補正も行います。"},
        {id:"opt-chain-rule-calc",category:"連鎖律(計算)",kind:"計算",question:"$y=x^2,z=3y$のとき$x=2$での$dz/dx$はいくつか。",options:["12","6","4","3"],answer:0,explanation:"<strong>使う公式：</strong>$dz/dx=(dz/dy)(dy/dx)$。<br><strong>局所微分：</strong>$dz/dy=3$、$dy/dx=2x$。<br><strong>代入：</strong>$3×(2×2)=12$。答えは12です。"},
        {
            id: "opt-chain-arrow-missing-local",
            setId: "opt-exam-chain-rule-arrows",
            setOrder: 1,
            category: "計算グラフ・矢印空欄",
            kind: "図表・長文",
            difficulty: "本試験型",
            beginnerReviewed: true,
            question: `次の計算グラフで、$dy/dx=(dy/du)×A$ と表す。矢印の空欄 $A$ に入るものはどれか。${optimizationQuestionFigures.chainArrowBlank}`,
            options: ["$du/dx$", "$dx/du$", "$du/dy$", "$dy/du$"],
            answer: 0,
            explanation: "<strong>① 求めたいもの：</strong>$dy/dx$。<br><strong>② 矢印を逆にたどる：</strong>$y→u→x$ なので、$dy/du$ の次は $du/dx$ です。<br><strong>③ 使う公式：</strong>$dy/dx=(dy/du)(du/dx)$。<br><strong>答え：</strong>$A=du/dx$ です。$dx/du$ は矢印と逆向きです。"
        },
        {
            id: "opt-chain-branch-path-sum",
            setId: "opt-exam-chain-rule-arrows",
            setOrder: 2,
            category: "計算グラフ・複数経路",
            kind: "図表・長文",
            difficulty: "本試験型",
            beginnerReviewed: true,
            question: `次の計算グラフで、$x$ から $L$ へは $u$ を通る経路と $v$ を通る経路がある。$\\partial L/\\partial x$ を表す式として正しいものはどれか。${optimizationQuestionFigures.branchGraph}`,
            options: [
                "$(\\partial L/\\partial u)(\\partial u/\\partial x)+(\\partial L/\\partial v)(\\partial v/\\partial x)$",
                "$(\\partial L/\\partial u)(\\partial u/\\partial x)(\\partial L/\\partial v)(\\partial v/\\partial x)$",
                "$\\partial u/\\partial x+\\partial v/\\partial x$",
                "$(\\partial L/\\partial u)(\\partial v/\\partial x)$"
            ],
            answer: 0,
            explanation: "<strong>① 全経路を探す：</strong>$x→u→L$ と $x→v→L$ の2本です。<br><strong>② 経路の中：</strong>矢印の局所微分を掛けます。<br><strong>③ 経路どうし：</strong>同じ $x$ への寄与なので足します。<br><strong>答え：</strong>$(\\partial L/\\partial u)(\\partial u/\\partial x)+(\\partial L/\\partial v)(\\partial v/\\partial x)$ です。"
        },
        {
            id: "opt-chain-branch-numeric",
            setId: "opt-exam-chain-rule-arrows",
            setOrder: 3,
            category: "計算グラフ・分岐計算",
            kind: "図表・長文",
            difficulty: "本試験型",
            beginnerReviewed: true,
            question: `次の計算グラフで $x=2,y=3$ とする。$\\partial L/\\partial x$ はいくつか。${optimizationQuestionFigures.branchGraph}`,
            options: ["21", "16", "15", "30"],
            answer: 0,
            explanation: "<strong>① 順伝播：</strong>$u=xy=6$、$v=x+y=5$、$L=uv$。<br><strong>② 使う公式：</strong>$\\partial L/\\partial x=(\\partial L/\\partial u)(\\partial u/\\partial x)+(\\partial L/\\partial v)(\\partial v/\\partial x)$。<br><strong>③ 局所微分：</strong>$\\partial L/\\partial u=v=5$、$\\partial u/\\partial x=y=3$、$\\partial L/\\partial v=u=6$、$\\partial v/\\partial x=1$。<br><strong>④ 代入：</strong>$5×3+6×1=21$。答えは21です。"
        },
        {id:"opt-xavier-var",category:"Xavier初期化(計算)",kind:"計算",question:"Xavier初期化で$fan_{in}=fan_{out}=100$のとき、重みの分散はどれか。",options:["0.01","0.1","1","100"],answer:0,explanation:"<strong>使う公式：</strong>$\\mathrm{Var}(w)=2/(fan_{in}+fan_{out})$。<br><strong>代入：</strong>$2/(100+100)=2/200=0.01$。<br><strong>答え：</strong>0.01です。$1/n$は入出力数が同じときだけの簡略形です。"},
        {id:"opt-he-var",category:"He初期化(計算)",kind:"計算",question:"He初期化で分散を$2/fan_{in}$とすると、$fan_{in}=100$での分散はどれか。",options:["0.02","0.01","0.2","2"],answer:0,explanation:"<strong>使う公式：</strong>$\\mathrm{Var}(w)=2/fan_{in}$。<br><strong>代入：</strong>$2/100=0.02$。<br><strong>答え：</strong>0.02です。ReLUで負側が0になる影響を補います。"},

        // ---------------------------------------------------------
        // 【2026シラバス補強】逆伝播・デルタShape・Adam・初期化
        // ---------------------------------------------------------
        {
            id: "opt-delta-matrix-shape",
            category: "誤差逆伝播・デルタShape",
            kind: "計算",
            difficulty: "標準",
            question: "$Z=XW+b$で、$X$のShapeが$(5,4)$、$W$が$(4,3)$、デルタ$\\Delta=\\partial L/\\partial Z$が$(5,3)$である。$\\partial L/\\partial W$の式とShapeの正しい組み合わせはどれか。",
            options: ["$X^T\\Delta$、Shape $(4,3)$", "$\\Delta W^T$、Shape $(5,4)$", "$\\mathrm{sum}(\\Delta,axis=0)$、Shape $(3)$", "$\\Delta^T X$、Shape $(3,4)$"],
            answer: 0,
            explanation: "<strong>問題文の合図：</strong>重み$W$の勾配とShapeを求める。<br><strong>使う公式：</strong>$\\partial L/\\partial W=X^T\\Delta$。<br><strong>Shape：</strong>$(4,5)(5,3)=(4,3)$。<br><strong>答え：</strong>$X^T\\Delta$、Shape $(4,3)$です。重み勾配のShapeは元の$W$と一致します。"
        },
        {
            id: "opt-minibatch-update-count",
            category: "ミニバッチ・更新回数（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "訓練データ1,000件をバッチサイズ100で学習する。1エポックで全データを1回ずつ使い、3エポック学習したとき、パラメータ更新は合計何回か。",
            options: ["3回", "10回", "30回", "300回"],
            answer: 2,
            explanation: "<strong>使う公式：</strong>更新回数＝$\\lceil$データ数÷バッチサイズ$\\rceil×$エポック数。<br><strong>代入：</strong>$(1000÷100)×3=10×3=30$。<br><strong>答え：</strong>30回です。",
            trap: "エポック数は全データを何周するか、バッチサイズは1回の更新に使う件数です。"
        },
        {
            id: "opt-backprop-affine-square",
            category: "誤差逆伝播・デルタ（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "$a=wx+b$、$L=a²$ とする。$w=3, x=2, b=1$ のとき、$∂L/∂w$ はいくつか。",
            options: ["7", "14", "28", "49"],
            answer: 2,
            explanation: "<strong>順伝播：</strong>$a=3×2+1=7$。<br><strong>デルタ：</strong>$\\delta=\\partial L/\\partial a=2a=14$。<br><strong>使う公式：</strong>$\\partial L/\\partial w=\\delta x$。<br><strong>代入：</strong>$14×2=28$。答えは28です。",
            explanationFigure: optimizationExplanationFigures.chainRule
        },
        {
            id: "opt-branch-gradient-sum",
            category: "計算グラフ・分岐（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "計算グラフで変数 $x$ が2つの経路へ分岐し、逆伝播で各経路から $∂L/∂x=2$ と $3$ が戻ってきた。$x$ に対する合計勾配はいくつか。",
            options: ["1", "5", "6", "9"],
            answer: 1,
            explanation: "<strong>使うルール：</strong>同じ変数へ戻る分岐の勾配は加算。<br><strong>代入：</strong>$2+3=5$。<br><strong>答え：</strong>5です。直列では掛け、分岐の合流では足します。",
            explanationFigure: optimizationExplanationFigures.chainRule
        },
        {
            id: "opt-reverse-mode-autodiff",
            category: "自動微分・逆モード",
            difficulty: "応用",
            question: "1個のスカラー損失から数百万個のパラメータ勾配を求める深層学習で、逆モード自動微分が適する主な理由はどれか。",
            options: ["1回の逆向き計算で、多数の入力パラメータに対する勾配をまとめて求めやすい", "微分公式を一切使わない", "順伝播が不要になる", "数値微分より常にメモリを使わない"],
            answer: 0,
            explanation: "出力が1個で入力パラメータが多数という形では、出力側から計算グラフを逆にたどると全パラメータの勾配を効率よく計算できます。これが通常のbackwardの基礎です。"
        },
        {
            id: "opt-adam-bias-correction",
            category: "Adam・バイアス補正（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "Adamの一次モーメントを $m_1=β_1m_0+(1-β_1)g_1$ とする。$m_0=0, β_1=0.9, g_1=4$ のとき、補正後 $m_1/(1-β_1)$ はいくつか。",
            options: ["0.4", "3.6", "4", "40"],
            answer: 2,
            explanation: "<strong>使う公式：</strong>$m_1=β_1m_0+(1-β_1)g_1$、補正後$=m_1/(1-β_1)$。<br><strong>代入：</strong>$m_1=0.9×0+0.1×4=0.4$、$0.4/(1-0.9)=4$。<br><strong>答え：</strong>4です。",
            explanationFigure: optimizationExplanationFigures.adamBiasCorrection
        },
        {
            id: "opt-adaptive-epsilon",
            category: "適応的学習率・ε",
            difficulty: "標準",
            question: "AdaGrad、RMSProp、Adamの更新式で、分母の平方根に加える小さな定数 $ε$ の主な役割はどれか。",
            options: ["0除算と数値不安定を防ぐ", "Momentumを発生させる", "勾配の符号を反転する", "バッチサイズを自動決定する"],
            answer: 0,
            explanation: "二乗勾配の蓄積値が0または非常に小さいと分母が不安定になります。$ε$ はその分母を安全に保つための小さな定数です。"
        },
        {
            id: "opt-glorot-full-variance",
            category: "Xavier・Glorot（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "Glorot正規初期化の分散を $2/(fan_{in}+fan_{out})$ とする。$fan_{in}=100, fan_{out}=50$ のとき分散はどれか。",
            options: ["1/150", "1/100", "1/75", "2/50"],
            answer: 2,
            explanation: "<strong>使う公式：</strong>$\\mathrm{Var}(w)=2/(fan_{in}+fan_{out})$。<br><strong>代入：</strong>$2/(100+50)=2/150=1/75\\approx0.0133$。<br><strong>答え：</strong>$1/75$です。$1/n$は入出力数が等しい場合だけの簡略形です。"
        },
        {
            id: "opt-he-standard-deviation",
            category: "He初期化・標準偏差（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "He正規初期化で分散が $2/fan_{in}$ のとき、$fan_{in}=200$ における標準偏差はいくつか。",
            options: ["0.01", "0.1", "1", "10"],
            answer: 1,
            explanation: "<strong>使う公式：</strong>Heの分散$=2/fan_{in}$、標準偏差$=\\sqrt{\\mathrm{Var}(w)}$。<br><strong>代入：</strong>分散$=2/200=0.01$、標準偏差$=\\sqrt{0.01}=0.1$。<br><strong>答え：</strong>0.1です。",
            explanationFigure: optimizationExplanationFigures.initializationVariance,
            trap: "分散0.01をそのまま標準偏差と答えないようにします。"
        },
        {
            id: "opt-zero-bias-initialization",
            category: "初期化・対称性（識別）",
            difficulty: "標準",
            question: "全結合層の初期化として、一般に問題がない組み合わせはどれか。",
            options: ["重みはXavierやHeでランダム、バイアスは0", "重みもバイアスも全て同じ0", "重みもバイアスも全て同じ1", "全ニューロンの重みを同じ乱数ベクトルにする"],
            answer: 0,
            explanation: "ニューロン間の対称性を破る主役は重みです。重みが異なる乱数なら、バイアスを0で始めても各ニューロンは異なる勾配を受けられます。"
        },
        {
            id: "opt-vanishing-chain-calc",
            category: "勾配消失（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "逆伝播で局所微分0.5を4回連続して掛ける。損失側から届いた勾配が1なら、入力側へ届く勾配はいくつか。",
            options: ["0.0625", "0.125", "0.25", "2"],
            answer: 0,
            explanation: "<strong>使う公式：</strong>直列の勾配は局所微分を掛ける。<br><strong>代入：</strong>$1×0.5^4=1/16=0.0625$。<br><strong>答え：</strong>0.0625です。1より小さい微分を繰り返し掛けると勾配消失につながります。"
        },
        {
            id: "opt-delta-weight-gradient",
            category: "誤差逆伝播・デルタ（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$z=wx+b$で、デルタ$\\delta=\\partial L/\\partial z=4$、入力$x=3$とする。$\\partial L/\\partial w$はいくつか。",
            options: ["12", "7", "4/3", "1"],
            answer: 0,
            explanation: "<strong>問題文の合図：</strong>デルタ$\\delta$が与えられ、重み$w$の勾配を聞かれている。<br><strong>使う公式：</strong>$\\partial L/\\partial w=\\delta x$。<br><strong>代入：</strong>$4×3=12$。<br><strong>答え：</strong>12です。"
        },
        {
            id: "opt-fan-in-out",
            category: "He初期化・fan-in（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "ReLUを使う全結合層が64入力→32出力である。$fan_{in}$、$fan_{out}$、He初期化の分散の正しい組み合わせはどれか。",
            options: [
                "$fan_{in}=64, fan_{out}=32, \\mathrm{Var}(w)=2/64$",
                "$fan_{in}=32, fan_{out}=64, \\mathrm{Var}(w)=2/32$",
                "$fan_{in}=64, fan_{out}=32, \\mathrm{Var}(w)=1/64$",
                "$fan_{in}=96, fan_{out}=96, \\mathrm{Var}(w)=2/96$"
            ],
            answer: 0,
            explanation: "<strong>使う定義：</strong>$fan_{in}$＝入力数、$fan_{out}$＝出力数。ReLUではHeの分散$=2/fan_{in}$。<br><strong>代入：</strong>$fan_{in}=64$、$fan_{out}=32$、分散$=2/64=1/32$。<br><strong>答え：</strong>選択肢1です。"
        },
        {
            id: "opt-learning-rate-symptoms",
            category: "学習率・症状の識別",
            difficulty: "標準",
            question: "学習率と学習中の症状の組み合わせとして、最も適切なものはどれか。",
            options: [
                "大きすぎる→損失が振動・発散しやすい／小さすぎる→学習が極端に遅い",
                "大きすぎる→必ず大域的最適解へ到達／小さすぎる→必ず発散",
                "大きすぎる→重みが更新されない／小さすぎる→1回で収束",
                "学習率の大小は学習曲線に影響しない"
            ],
            answer: 0,
            explanation: "学習率は1回の更新の歩幅です。大きすぎると谷底を飛び越えて振動・発散しやすく、小さすぎると少しずつしか進めず学習が遅くなります。"
        }
    ]
};
