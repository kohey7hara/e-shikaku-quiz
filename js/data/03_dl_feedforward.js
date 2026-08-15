const ffExplanationFigures = {
    relu: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">RELUは「負を止め、正をそのまま通す」</span>
            <div class="diagram-row">
                <div class="diagram-node warn">入力 $x=-2$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">$\\max(0,x)$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node warn">出力 $0$</div>
                <div class="diagram-label">負なら0</div>
            </div>
            <div class="diagram-row figure-subrow">
                <div class="diagram-node primary">入力 $x=3$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">$\\max(0,x)$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node accent">出力 $3$</div>
                <div class="diagram-label">正ならそのまま</div>
            </div>
        </div>`,
    sigmoidRange: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">SIGMOIDはどんな入力も0と1の間へ押し込む</span>
            <div class="diagram-row">
                <div class="diagram-node warn">$x=-10$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node primary">Sigmoid</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-column"><div class="diagram-node warn">$0$に近い</div><div class="diagram-label">ただし0にはならない</div></div>
            </div>
            <div class="diagram-row figure-subrow">
                <div class="diagram-node accent">$x=10$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node primary">Sigmoid</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-column"><div class="diagram-node accent">$1$に近い</div><div class="diagram-label">ただし1にはならない</div></div>
            </div>
            <p class="figure-caption">したがって値域は $0&lt;y&lt;1$ です。</p>
        </div>`,
    vanishingGradient: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">小さい微分を何度も掛けると、勾配が消える</span>
            <div class="diagram-row">
                <div class="diagram-node primary">勾配 $1$</div>
                <div class="diagram-arrow">$\\times0.2$ →</div>
                <div class="diagram-node">$0.2$</div>
                <div class="diagram-arrow">$\\times0.2$ →</div>
                <div class="diagram-node warn">$0.04$</div>
                <div class="diagram-arrow">$\\times0.2$ →</div>
                <div class="diagram-node warn">$0.008$</div>
            </div>
            <p class="figure-caption">入力層へ戻るほど0に近づき、重みをほとんど更新できなくなります。</p>
        </div>`,
    affine: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">全結合層は「重み付き入力＋バイアス」</span>
            <div class="diagram-row">
                <div class="diagram-node primary">入力 $x$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-column"><div class="diagram-node accent">$Wx$</div><div class="diagram-label">重みを掛ける</div></div>
                <div class="diagram-arrow">＋</div>
                <div class="diagram-column"><div class="diagram-node warn">$b$</div><div class="diagram-label">位置をずらす</div></div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node primary">$y=Wx+b$</div>
            </div>
        </div>`,
    parameterCount: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">全結合層のパラメータを2つに分けて数える</span>
            <div class="diagram-row">
                <div class="diagram-node primary">入力<br><b>10個</b></div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node accent">すべて接続</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node primary">出力<br><b>5個</b></div>
            </div>
            <div class="diagram-row figure-subrow">
                <div class="diagram-column">
                    <div class="diagram-node accent">重み $W$<br><b>$10\\times5=50$個</b></div>
                    <div class="diagram-label">出力5個それぞれに、入力10個分</div>
                </div>
                <div class="diagram-arrow">＋</div>
                <div class="diagram-column">
                    <div class="diagram-node warn">バイアス $b$<br><b>$5$個</b></div>
                    <div class="diagram-label">出力1個につき1個</div>
                </div>
                <div class="diagram-arrow">＝</div>
                <div class="diagram-node primary">合計<br><b>$55$個</b></div>
            </div>
            <p class="figure-caption">覚え方：全結合層のパラメータ数 ＝ 入力数×出力数 ＋ 出力数。</p>
        </div>`,
    multilabel: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">複数の答えを、それぞれ独立に判定する</span>
            <div class="diagram-row">
                <div class="diagram-node primary">1枚の画像</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-column">
                    <div class="diagram-node accent">犬：$0.90$ ✓</div>
                    <div class="diagram-node accent">屋外：$0.80$ ✓</div>
                    <div class="diagram-node">走る：$0.20$</div>
                </div>
                <div class="diagram-label">各出力にSigmoid<br>合計は1でなくてよい</div>
            </div>
        </div>`,
    sigmoidDerivative: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">SIGMOIDの微分は中央でも最大0.25</span>
            <div class="diagram-row">
                <div class="diagram-node primary">$f(x)=0.5$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node accent">$f'(x)=f(x)(1-f(x))$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node warn">$0.5\\times0.5=0.25$</div>
            </div>
            <p class="figure-caption">0や1に近い場所では、掛け算の片方が0に近づくため微分はさらに小さくなります。</p>
        </div>`,
    dyingRelu: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">負の領域に固定されると、更新の合図が届かない</span>
            <div class="diagram-row">
                <div class="diagram-node warn">入力が常に負</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">ReLU出力 $0$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node warn">勾配 $0$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node warn">重みを更新できない</div>
            </div>
            <p class="figure-caption">Leaky ReLUは負側にも小さな傾きを残し、更新の合図を通します。</p>
        </div>`,
    multitask: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">出力を目的ごとに分けて足す</span>
            <div class="diagram-row">
                <div class="diagram-node primary">共通の特徴</div>
                <div class="diagram-arrow">↗</div>
                <div class="diagram-column">
                    <div class="diagram-node accent">分類：犬・猫・鳥<br><b>3個</b></div>
                    <div class="diagram-node warn">座標：$x,y$<br><b>2個</b></div>
                </div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node primary">$3+2=5$個</div>
            </div>
        </div>`,
    zeroInitialization: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">全て0で始めると、ニューロンの個性が生まれない</span>
            <div class="diagram-row">
                <div class="diagram-node primary">同じ入力</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-column">
                    <div class="diagram-node warn">ニューロンA<br>$W=0$</div>
                    <div class="diagram-node warn">ニューロンB<br>$W=0$</div>
                </div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-column">
                    <div class="diagram-node">同じ出力</div>
                    <div class="diagram-node">同じ勾配</div>
                </div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node warn">ずっと同じ働き</div>
            </div>
            <p class="figure-caption">ランダムな初期値で対称性を破ると、各ニューロンが異なる特徴を学べます。</p>
        </div>`,
    linearCollapse: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">活性化関数がないと、2層でも1つの式にまとまる</span>
            <div class="diagram-row">
                <div class="diagram-node primary">$x$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">$W_1x+b_1$</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">$W_2(・)+b_2$</div>
                <div class="diagram-arrow">＝</div>
                <div class="diagram-node warn">1つの $Wx+b$</div>
            </div>
            <p class="figure-caption">途中にReLUなどを挟むことで、1本の直線では表せない境界を学べます。</p>
        </div>`,
    ordinalRegression: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">順序回帰は「どの境界を越えたか」を判定する</span>
            <div class="diagram-row">
                <div class="diagram-node">軽症</div>
                <div class="diagram-arrow">境界1 →</div>
                <div class="diagram-node warn">中等症</div>
                <div class="diagram-arrow">境界2 →</div>
                <div class="diagram-node accent">重症</div>
            </div>
            <p class="figure-caption">順番は重要ですが、「軽症→中等症」と「中等症→重症」の間隔が同じとは限りません。</p>
        </div>`,
    sigmoidTemperature: `
        <div class="exam-figure answer-figure">
            <span class="figure-title">温度Tが大きいほど、0.5付近へならされる</span>
            <div class="diagram-row">
                <div class="diagram-node primary">ロジット $z$</div>
                <div class="diagram-arrow">÷ 大きな $T$</div>
                <div class="diagram-node">$z/T$ は0に近づく</div>
                <div class="diagram-arrow">→ Sigmoid →</div>
                <div class="diagram-node accent">$0.5$に近づく</div>
            </div>
            <p class="figure-caption">ゲイン $a$ を使う Sigmoid($az$) では逆で、$a$ が大きいほど急になります（$a=1/T$）。</p>
        </div>`
};

window.quizData = {
    title: "3-（１）順伝播型ネットワーク：MLP・活性化関数",
    
    cheatSheet: `
        <style>
            .flow-box { display: flex; align-items: center; justify-content: center; background: #f9f9f9; padding: 10px; border-radius: 8px; margin-bottom: 15px; font-size: 0.9em; }
            .step { border: 2px solid #333; padding: 5px 10px; background: white; border-radius: 5px; text-align: center; width: 100px; }
            .arrow { margin: 0 5px; font-weight: bold; color: #555; }
            .graph-icon { width: 60px; height: 40px; border: 1px solid #ccc; background: #fff; margin: auto; }
            .graph-line { stroke: #e74c3c; stroke-width: 2; fill: none; }
            .axis { stroke: #ccc; stroke-width: 1; }
            .bar-container { display: flex; align-items: flex-end; justify-content: space-around; height: 35px; width: 60px; margin: auto; }
            .bar { width: 10px; background: #3498db; }
            
            /* 数式代替CSS */
            .frac { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; font-size: 0.9em; }
            .numer { border-bottom: 1px solid #000; padding: 0 2px; }
            .denom { padding: 0 2px; }
            .quick-formula { margin: 12px 0 16px; padding: 12px 14px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .quick-formula code { color: #123f68; font-weight: 800; }
            .loss-formula-table td:nth-child(2) { min-width: 390px; }
            .loss-equation { margin: 5px 0; padding: 7px 10px; border-radius: 8px; background: #f3f7fb; color: #123f68; font-size: 1.04em; white-space: nowrap; }
            .loss-equation mjx-container { margin: 0 !important; }
            .loss-reading { color: #405a72; font-weight: 700; line-height: 1.7; }
            .activation-formula-table td:nth-child(3) { min-width: 460px; }
            .activation-equation { margin: 6px 0; padding: 7px 10px; border-radius: 8px; background: #f3f7fb; color: #123f68; font-size: 1.03em; white-space: nowrap; }
            .activation-equation mjx-container { margin: 0 !important; }
        </style>

        <h3>■ 順伝播の流れ：①計算 → ②変換</h3>
        <div class="flow-box">
            <div class="step">
                <strong>入力 <i>x</i></strong>
            </div>
            <div class="arrow">→</div>
            <div class="step" style="background:#eef;">
                <strong>① 全結合層</strong><br>
                (Affine)<br>
                <small>行列演算<br><i>Wx + b</i></small>
            </div>
            <div class="arrow">→</div>
            <div class="step" style="background:#fee;">
                <strong>② 活性化関数</strong><br>
                (Activation)<br>
                <small>非線形変換<br><i>f(u)</i></small>
            </div>
            <div class="arrow">→</div>
            <div class="step">
                <strong>出力 <i>y</i></strong>
            </div>
        </div>
        <div class="quick-formula">
            <strong>MLP計算の型</strong><br>
            ① <code>z = Wx + b</code> → ② <code>y = f(z)</code><br>
            1層のパラメータ数：<code>入力数 × 出力数 ＋ 出力数</code><br>
            ※活性化関数を挟まない多層のAffine層は、1層のAffine層にまとめられます。
        </div>

        <h3>■ 【重要】タスク別・出力層の鉄板セット</h3>
        <p>活性化関数を使う理由:複雑なカーブ（非線形）を描けるようにするため<br>中間層での役割: 直線をねじ曲げて、複雑な表現力を持たせること。<br>出力層での役割: 計算結果を、確率などの人間が欲しい形式に変換すること。<br>最終段（出力層）では、タスクに応じて<strong>②活性化関数</strong>を使い分けます。<br>①全結合層は、必要な出力数（クラス数など）に合わせるために必ず存在します。</p>
        <table>
            <tr><th>タスク</th><th>② 活性化関数の選択</th><th>損失関数の選択</th></tr>
            <tr>
                <td><strong>回帰</strong><br>(数値予測)</td>
                <td><strong>恒等関数</strong> (Identity)<br><small>※何もせず値をそのまま通す</small></td>
                <td><strong>平均二乗誤差</strong><br>(MSE)</td>
            </tr>
            <tr>
                <td><strong>2値分類</strong><br><small>Yes/Noを1個出力</small></td>
                <td rowspan="2"><strong>Sigmoid</strong><br><small>※各出力を独立して<br>0.0〜1.0にする</small></td>
                <td rowspan="2"><strong>バイナリ<br>クロスエントロピー</strong><br><small>(BCE)</small></td>
            </tr>
            <tr>
                <td><strong>マルチラベル</strong><br><small>Yes/Noを複数出力</small></td>
            </tr>
            <tr>
                <td><strong>多クラス分類</strong><br>(どれか1つ)</td>
                <td><strong>Softmax</strong><br><small>※出力の合計を 1.0 (100%) にする</small></td>
                <td><strong>交差エントロピー</strong><br>(Cross Entropy)</td>
            </tr>
            <tr>
                <td><strong>順序回帰</strong><br><small>例：軽症・中等症・重症</small></td>
                <td><strong>代表：境界を判定</strong><br><small>※K段階ならK-1個の境界</small></td>
                <td><strong>代表：境界ごとのBCE</strong></td>
            </tr>
        </table>
        <p><strong>順序回帰のポイント：</strong>クラスに順番はありますが、段階間の距離が同じとは限りません。通常の多クラス分類は順番を使わず、単純な回帰は段階間を等間隔の数値として扱いやすい点が違います。</p>

        <h3>■ 計算問題で使う損失関数</h3>
        <table class="loss-formula-table">
            <tr><th>場面</th><th>計算式</th><th>試験での読み方</th></tr>
            <tr>
                <td><strong>回帰</strong></td>
                <td>
                    <div class="loss-equation">$\\displaystyle \\mathrm{MSE}=\\frac{1}{N}\\sum_{i=1}^{N}(y_i-\\hat{y}_i)^2$</div>
                    <div class="loss-equation">$\\displaystyle \\mathrm{MAE}=\\frac{1}{N}\\sum_{i=1}^{N}|y_i-\\hat{y}_i|$</div>
                </td>
                <td class="loss-reading">MSE：誤差を<strong>二乗</strong><br>MAE：誤差の<strong>絶対値</strong></td>
            </tr>
            <tr>
                <td><strong>2値・<br>マルチラベル</strong></td>
                <td>
                    <div class="loss-equation">$\\displaystyle \\mathrm{BCE}=-\\{y\\ln p+(1-y)\\ln(1-p)\\}$</div>
                </td>
                <td class="loss-reading">$y=1$ → $-\\ln p$<br>$y=0$ → $-\\ln(1-p)$</td>
            </tr>
            <tr>
                <td><strong>多クラス</strong></td>
                <td>
                    <div class="loss-equation">$\\displaystyle \\mathrm{CE}=-\\ln p_{\\mathrm{正解クラス}}$</div>
                </td>
                <td class="loss-reading"><strong>正解クラスの確率</strong>だけを見る</td>
            </tr>
        </table>

        <h3>■ 活性化関数図鑑 (E資格 必須セット)</h3>
        <p>形状と「微分の性質」が問われます。</p>
        <table class="activation-formula-table">
            <tr><th>関数名</th><th>形状 (イメージ)</th><th>式・特徴・試験のツボ</th></tr>
            <tr>
                <td><strong>ReLU</strong><br>(Rectified Linear Unit)</td>
                <td>
                    <svg class="graph-icon" viewBox="0 0 60 40">
                        <line x1="0" y1="30" x2="60" y2="30" class="axis" />
                        <line x1="30" y1="0" x2="30" y2="40" class="axis" />
                        <polyline points="0,30 30,30 55,5" class="graph-line" />
                    </svg>
                </td>
                <td>
                    <strong>「今の主役」</strong><br>
                    <div class="activation-equation">$\\displaystyle f(x)=\\max(0,x)$</div>
                    ・<i>x</i> > 0 で微分値が <strong>1.0</strong>（勾配消失しない）。<br>
                    ・<i>x</i> &le; 0 で微分値 0。<br>
                    ・計算が超高速。
                </td>
            </tr>
            <tr>
                <td><strong>Leaky ReLU</strong><br>(LReLU)</td>
                <td>
                    <svg class="graph-icon" viewBox="0 0 60 40">
                        <line x1="0" y1="30" x2="60" y2="30" class="axis" />
                        <line x1="30" y1="0" x2="30" y2="40" class="axis" />
                        <polyline points="0,35 30,30 55,5" class="graph-line" />
                    </svg>
                </td>
                <td>
                    <strong>「死んだReLU対策」</strong><br>
                    <div class="activation-equation">$\\displaystyle f(x)=\\max(x,\\alpha x)$</div>
                    ・<i>x</i> < 0 でもわずかに傾き（&alpha;=0.01等）を持つ。<br>
                    ・学習が止まる現象(Dying ReLU)を防ぐ。
                </td>
            </tr>
            <tr>
                <td><strong>Sigmoid</strong><br>(シグモイド)</td>
                <td>
                    <svg class="graph-icon" viewBox="0 0 60 40">
                        <line x1="0" y1="35" x2="60" y2="35" class="axis" />
                        <line x1="30" y1="0" x2="30" y2="40" class="axis" />
                        <path d="M5,35 C20,35 20,5 55,5" class="graph-line" />
                    </svg>
                </td>
                <td>
                    <strong>「確率 (0〜1) に変換」</strong><br>
                    <div class="activation-equation">$\\displaystyle \\sigma(x)=\\frac{1}{1+e^{-x}}$</div>
                    <div class="activation-equation">$\\displaystyle \\sigma'(x)=\\sigma(x)\\{1-\\sigma(x)\\}$</div>
                    ・$\\sigma(0)=0.5$。温度 <i>T</i> が大きいほど平坦。<br>
                    ・2値分類の出力層で使う。<br>
                    ・中間層で使うと<strong>勾配消失</strong>の原因になる（最大微分値0.25）。
                </td>
            </tr>
            <tr>
                <td><strong>GELU</strong><br>(Gaussian Error Linear Unit)</td>
                <td>
                    <svg class="graph-icon" viewBox="0 0 60 40">
                        <line x1="0" y1="30" x2="60" y2="30" class="axis" />
                        <line x1="30" y1="0" x2="30" y2="40" class="axis" />
                        <path d="M5,31 C18,32 24,34 30,29 C38,18 45,9 55,4" class="graph-line" />
                    </svg>
                </td>
                <td>
                    <strong>「滑らかなReLU」</strong><br>
                    <div class="activation-equation">$\\displaystyle f(x)=x\\Phi(x)$</div>
                    ・負側もわずかに通し、0付近も滑らか。<br>
                    ・Transformerでよく使う。
                </td>
            </tr>
            <tr>
                <td><strong>Tanh</strong><br>(ハイパボリックタンジェント)</td>
                <td>
                    <svg class="graph-icon" viewBox="0 0 60 40">
                        <line x1="0" y1="20" x2="60" y2="20" class="axis" />
                        <line x1="30" y1="0" x2="30" y2="40" class="axis" />
                        <path d="M5,35 C25,35 35,5 55,5" class="graph-line" />
                    </svg>
                </td>
                <td>
                    <strong>「ゼロ中心 (-1〜1)」</strong><br>
                    <div class="activation-equation">$\\displaystyle \\tanh(x)=\\frac{e^x-e^{-x}}{e^x+e^{-x}}$</div>
                    <div class="activation-equation">$\\displaystyle \\frac{d}{dx}\\tanh(x)=1-\\tanh^2(x)$</div>
                    ・$\\tanh(0)=0$。<br>
                    ・Sigmoidより学習効率が良い。<br>
                    ・RNNなどでよく使われる。
                </td>
            </tr>
            <tr>
                <td><strong>Step関数</strong><br>(階段関数)</td>
                <td>
                    <svg class="graph-icon" viewBox="0 0 60 40">
                        <line x1="0" y1="30" x2="60" y2="30" class="axis" />
                        <line x1="30" y1="0" x2="30" y2="40" class="axis" />
                        <polyline points="0,30 30,30 30,10 60,10" class="graph-line" />
                    </svg>
                </td>
                <td>
                    <strong>「元祖・パーセプトロン」</strong><br>
                    <div class="activation-equation">$\\displaystyle f(x)=\\begin{cases}0 & (x<0) \\\\ 1 & (x\\ge 0)\\end{cases}$</div>
                    ・0か1か。<br>
                    ・<i>x</i>=0 で不連続、他は傾き0のため、<strong>誤差逆伝播法が使えない</strong>。
                </td>
            </tr>
        </table>

        <h3>■ 多クラス分類の切り札：Softmax関数</h3>
        <p>出力層で使われます。数値を「確率分布」に変換します。</p>
        <div style="display:flex; justify-content:space-around; align-items:center; background:#fff; padding:10px; border:1px solid #ccc; border-radius:5px;">
            <div style="text-align:center;">
                <strong>入力 (Logits)</strong><br>
                <small>バラバラな数値</small><br>
                <code>[2.0, 1.0, 0.1]</code>
            </div>
            <div class="arrow">→</div>
            <div style="text-align:center; background:#eef; padding:5px; border-radius:5px;">
                <strong>Softmax</strong><br>
                <small>
                    <i>y<sub>i</sub></i> = 
                    <span class="frac">
                        <span class="numer">exp(<i>x<sub>i</sub></i>)</span>
                        <span class="denom">&Sigma; exp(<i>x<sub>k</sub></i>)</span>
                    </span>
                </small>
            </div>
            <div class="arrow">→</div>
            <div style="text-align:center;">
                <strong>出力 (Probability)</strong><br>
                <small>合計 1.0 (100%)</small><br>
                <div class="bar-container">
                    <div class="bar" style="height:25px;"></div>
                    <div class="bar" style="height:10px;"></div>
                    <div class="bar" style="height:2px;"></div>
                </div>
                <code>[0.7, 0.2, 0.1]</code>
            </div>
        </div>
        <h3>■ 最後はこの表だけ</h3>
        <table>
            <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
            <tr><td>$z=Wx+b$を層状に重ねる</td><td><strong>MLP</strong><br><small>Multi-Layer Perceptron（多層パーセプトロン）</small></td><td>全結合層の間に非線形な活性化関数を挟む。</td></tr>
            <tr><td>連続値をそのまま予測</td><td><strong>恒等関数＋MSE／MAE</strong><br><small>Mean Squared Error／Mean Absolute Error</small></td><td>MSEは二乗、MAEは絶対値で回帰誤差を測る。</td></tr>
            <tr><td>Yes／Noを1個出力</td><td><strong>Sigmoid＋BCE</strong><br><small>Binary Cross-Entropy（二値交差エントロピー）</small></td><td>1個の独立な確率を0〜1へ変換する。</td></tr>
            <tr><td>排他的な$K$クラスから1つ</td><td><strong>Softmax＋CE</strong><br><small>Cross-Entropy（交差エントロピー）</small></td><td>$K$出力の合計を1にする。</td></tr>
            <tr><td>複数ラベルが同時に正解</td><td><strong>各クラス独立Sigmoid＋BCE</strong></td><td>クラス同士を排他的にしない。</td></tr>
            <tr><td>$K$段階に順序がある</td><td><strong>累積型の順序回帰・$K-1$境界</strong></td><td>大小関係を利用し、各境界を超えたか判定する代表方式。</td></tr>
            <tr><td>正ならそのまま、負なら0</td><td><strong>ReLU</strong><br><small>Rectified Linear Unit</small></td><td>正側の勾配を保つが、負側はDying ReLUに注意。</td></tr>
            <tr><td>負側にも小さな傾きを残す</td><td><strong>Leaky ReLU</strong></td><td>負側の勾配を完全な0にしない。</td></tr>
            <tr><td>滑らかなReLU・Transformerで頻出</td><td><strong>GELU</strong><br><small>Gaussian Error Linear Unit</small></td><td>負側もわずかに通す滑らかな活性化。</td></tr>
            <tr><td>全結合層のパラメータ数</td><td><strong>入力数×出力数＋出力数</strong></td><td>重みの本数に、出力ノードごとのバイアスを足す。</td></tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "出力層の設計",
            question: "「多クラス分類問題（例：手書き数字の0〜9の識別）」において、出力層で使用すべき活性化関数はどれか。",
            options: ["シグモイド関数", "ソフトマックス関数", "恒等関数", "ReLU"],
            answer: 1,
            explanation: "多クラス分類では、出力の総和が1（確率分布）になるように「ソフトマックス関数」を使用します。"
        },
        {
            category: "損失関数",
            question: "「2値分類問題（例：スパムか否か）」において、一般的に使用される損失関数はどれか。",
            options: ["平均二乗誤差 (MSE)", "交差エントロピー誤差 (Binary Cross-entropy)", "ヒンジ損失", "KLダイバージェンス"],
            answer: 1,
            explanation: "2値分類では、正解ラベルと予測確率のずれを測るバイナリクロスエントロピーを用います。"
        },
        {
            category: "活性化関数",
            question: "現在、中間層（隠れ層）の活性化関数として最も標準的に使われている、入力が負なら0、正ならそのまま出力する関数はどれか。",
            options: ["Sigmoid", "Tanh", "ReLU", "Step関数"],
            answer: 2,
            explanation: "ReLU (Rectified Linear Unit) です。勾配消失が起きにくく、計算も高速なため標準的に使われます。",
            explanationFigure: ffExplanationFigures.relu
        },
        {
            category: "Sigmoid関数",
            question: "シグモイド関数 $\\sigma(x)$ の出力値の範囲（値域）として正しいものはどれか。",
            options: ["$0 \\le y \\le 1$", "$0 < y < 1$", "$-1 < y < 1$", "$0 \\le y < \\infty$"],
            answer: 1,
            explanation: "シグモイド関数は $0$ と $1$ に漸近しますが、厳密には到達しません。確率は $0$ より大きく $1$ より小さい範囲になります（極限を除く）。",
            explanationFigure: ffExplanationFigures.sigmoidRange
        },
        {
            category: "One-hotベクトル",
            question: "正解ラベルが「クラス2（3番目のクラス）」である場合、クラス数が4の時のOne-hotベクトル表現はどれか。",
            options: ["[0, 1, 0, 0]", "[0, 0, 1, 0]", "[0, 0, 2, 0]", "[2]"],
            answer: 1,
            explanation: "該当するインデックスだけが $1$、他は $0$ になるベクトルです。0始まりなので、クラス2は3番目の要素 `[0, 0, 1, 0]` になります。"
        },
        {
            category: "勾配消失問題",
            question: "多層パーセプトロンにおいて、層を深くしすぎると入力層に近い側の勾配が小さくなり、学習が進まなくなる現象を何と呼ぶか。",
            options: ["勾配消失問題 (Vanishing Gradient)", "勾配爆発問題 (Exploding Gradient)", "過学習 (Overfitting)", "次元の呪い"],
            answer: 0,
            explanation: "誤差逆伝播法では微分値を掛け算していくため、1より小さい値（シグモイドの微分など）が続くと勾配が0に近づいてしまいます。",
            explanationFigure: ffExplanationFigures.vanishingGradient
        },
        {
            category: "回帰問題",
            question: "回帰問題（実数値の予測）において、出力層の活性化関数として適切なものはどれか。",
            options: ["シグモイド関数", "ReLU", "恒等関数（何も通さない）", "ソフトマックス関数"],
            answer: 2,
            explanation: "回帰では出力値の範囲を制限する必要がないため、線形変換の結果をそのまま出す「恒等関数」を使います。"
        },
        {
            category: "Tanh関数",
            question: "Tanh（ハイパボリックタンジェント）関数の特徴として正しいものはどれか。",
            options: ["出力範囲が $(0, 1)$ である", "出力範囲が $(-1, 1)$ であり、ゼロ中心のデータ分布を作りやすい", "微分値の最大値が 0.25 である", "入力が負のとき出力は常に0になる"],
            answer: 1,
            explanation: "シグモイドと異なり、出力が0を中心に対称（-1〜1）になるため、次の層の学習が効率的になると言われています。"
        },
        {
            category: "全結合層",
            question: "全結合層（Affine層）の計算式として正しいものはどれか。（入力: $x$, 重み: $W$, バイアス: $b$）",
            options: ["$y = Wx + b$", "$y = Wx$", "$y = x + b$", "$y = W(x+b)$"],
            answer: 0,
            explanation: "線形変換 $Wx$ にバイアス $b$ を加算するのが全結合層の基本計算です。",
            explanationFigure: ffExplanationFigures.affine
        },
        {
            category: "ソフトマックス関数",
            question: "ソフトマックス関数の重要な性質はどれか。",
            options: ["出力値の総和が常に1になる", "出力値の最大値が常に1になる", "負の値を出力することができる", "入力の大小関係が出力では逆転する"],
            answer: 0,
            explanation: "出力を「確率」として解釈できるように正規化するため、総和が必ず1になります。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "パラメータ数計算(応用)",
            question: "入力層のノード数が $10$、出力層のノード数が $5$ の全結合層において、学習すべきパラメータ（重み $W$ とバイアス $b$）の総数はいくつか。",
            options: ["15個", "50個", "55個", "60個"],
            answer: 2,
            explanation: "重みは $10 \\times 5 = 50$個。バイアスは出力ノードごとに1つ付くので $5$個。合計 $50 + 5 = 55$個です。バイアスを忘れないように注意！",
            explanationFigure: ffExplanationFigures.parameterCount
        },
        {
            category: "マルチラベル分類(応用)",
            question: "1つの画像に「犬」「屋外」「走る」など複数のタグを付与する「マルチラベル分類」を行う場合、出力層の活性化関数は何を使うべきか。",
            options: ["ソフトマックス関数", "シグモイド関数", "ReLU", "恒等関数"],
            answer: 1,
            explanation: "ソフトマックスは「どれか1つ」を選ぶ関数です。複数正解がある場合は、各ノードで独立して確率を出せる「シグモイド関数」を使います。",
            explanationFigure: ffExplanationFigures.multilabel
        },
        {
            category: "活性化関数の微分(応用)",
            question: "シグモイド関数 $f(x)$ の導関数（微分） $f'(x)$ は、元の関数 $f(x)$ を使ってどのように表せるか。",
            options: ["$f(x)(1 - f(x))$", "$1 - f(x)$", "$f(x)^2$", "$e^{-x}$"],
            answer: 0,
            explanation: "シグモイド関数の微分は $y(1-y)$ と書けます。この形は計算グラフでの実装時によく使われます。最大値が $0.5 \\times 0.5 = 0.25$ になることもここから分かります。",
            explanationFigure: ffExplanationFigures.sigmoidDerivative
        },
        {
            category: "ReLUの弱点(応用)",
            question: "ReLUにおいて、学習中に特定ニューロンの入力が常に負になり、勾配が常に0になって学習が進まなくなる現象を何と呼ぶか。",
            options: ["Dying ReLU (死んだReLU)", "Exploding ReLU", "Vanishing ReLU", "Leaky ReLU"],
            answer: 0,
            explanation: "一度重みが更新されて「常に入力が負」の状態に陥ると、勾配が0になり二度と復活しなくなる現象です。これを防ぐのがLeaky ReLUなどです。",
            explanationFigure: ffExplanationFigures.dyingRelu
        },
        {
            category: "損失関数の使い分け(応用)",
            question: "回帰問題において、訓練データに極端な「外れ値」が含まれている場合、MSE（平均二乗誤差）よりもMAE（平均絶対誤差）を使うべき理由は何か。",
            options: ["MAEの方が計算が速いから", "MAEは微分不可能だから", "MSEは誤差を二乗するため、外れ値の影響を過剰に受けてモデルが歪んでしまうから", "MAEの方が精度が出やすいから"],
            answer: 2,
            explanation: "MSEは大きな誤差に対してペナルティを二乗で与えるため、外れ値に引きずられやすくなります。ロバスト性が欲しい場合はMAE（またはHuber損失）を使います。"
        },
        {
            category: "GELU(応用)",
            question: "BERTやGPTなどのTransformerモデルでよく採用されている活性化関数「GELU (Gaussian Error Linear Unit)」の特徴はどれか。",
            options: ["ReLUを滑らかにしたような形状で、負の入力に対してもわずかに値を持つ", "シグモイド関数と同じ形状をしている", "一定値以上をクリッピングする", "周期的な波形を持つ"],
            answer: 0,
            explanation: "ReLUの$x=0$での微分不可能性を解消し、確率的な解釈を取り入れた滑らかな関数です。高性能な言語モデルで標準的に使われています。"
        },
        {
            category: "ソフトマックス関数(応用)",
            question: "ソフトマックス関数の出力は、入力値に定数を足し引きしても変化しない（シフト不変性）。これを利用して、計算時のオーバーフロー対策として行われる処理はどれか。",
            options: ["入力値の最大値を、全ての入力値から引く", "入力値を全て2倍する", "入力値の平均を引く", "入力値を0〜1に正規化する"],
            answer: 0,
            explanation: "$e^x$ の計算は $x$ が大きいとすぐに無限大（オーバーフロー）になります。最大値を引いて $x \\le 0$ にすることで、計算を安定させます。"
        },
        {
            category: "シグモイド係数(応用)",
            question: "シグモイド関数 $y = \\frac{1}{1+e^{-ax}}$ において、係数 $a$（ゲイン）を大きくすると関数の形状はどうなるか。",
            options: ["傾きが緩やかになり、線形に近づく", "傾きが急になり、ステップ関数に近づく", "最大値が大きくなる", "平行移動する"],
            answer: 1,
            explanation: "$a$ を大きくすると $x=0$ 付近での変化が急激になり、ステップ関数に近づきます。Sigmoid($x/T$) と書く場合は $a=1/T$ なので、ゲイン $a$ と温度 $T$ は逆の働きです。"
        },
        {
            category: "出力層のノード数(応用)",
            question: "ある画像が「犬」「猫」「鳥」のいずれか（3クラス）であり、かつその「座標(x, y)」も予測したい場合、出力層のノード数は最低いくつ必要か。",
            options: ["3個", "2個", "5個", "6個"],
            answer: 2,
            explanation: "クラス分類用の確率3つ（Softmax）＋座標回帰用の数値2つ（恒等関数）＝合計5つの出力ノードが必要です。この場合、マルチタスク学習となります。",
            explanationFigure: ffExplanationFigures.multitask
        },
        {
            category: "勾配消失の対策(応用)",
            question: "勾配消失問題への対策として、**不適切なもの**はどれか。",
            options: ["活性化関数をSigmoidからReLUに変更する", "Batch Normalizationを導入する", "層の数を減らす（浅くする）", "重みの初期値を全て0にする"],
            answer: 3,
            explanation: "重みを全て0にすると、全てのニューロンが同じ計算をしてしまい（対称性の破れがない）、学習が正しく進みません。これは勾配消失以前の問題です。",
            explanationFigure: ffExplanationFigures.zeroInitialization
        },
        {
            id: "ff-bce-calc",
            category: "二値交差エントロピー（計算）",
            question: "正解y=1、予測確率p=0.8の二値交差エントロピー $-[y\\ln p+(1-y)\\ln(1-p)]$ はどれか。",
            options: ["$-\\ln 0.8$", "$-\\ln 0.2$", "$0.8^2$", "$\\ln 1$"],
            answer: 0,
            explanation: "$y=1$ では第2項が消え、$-\\ln p=-\\ln0.8\\approx0.223$ です。自信を持って正解すると損失は小さくなります。"
        },
        {
            id: "ff-ce-softmax-calc",
            category: "Softmax・交差エントロピー（計算）",
            question: "3クラスの予測確率が[0.1, 0.7, 0.2]で正解が第2クラスなら、交差エントロピーはどれか。",
            options: ["$-\\ln0.7$", "$-\\ln0.1$", "$-\\ln0.2$", "$-(\\ln0.1+\\ln0.7+\\ln0.2)$"],
            answer: 0,
            explanation: "one-hot教師では正解クラスの項だけ残るため $-\\ln0.7\\approx0.357$ です。全クラスの対数を無条件に足しません。"
        },
        {
            id: "ff-multilabel-output",
            category: "多クラス・マルチラベル（識別）",
            question: "1枚の画像に「犬」と「屋外」が同時に成立するマルチラベル分類の典型的な出力・損失はどれか。",
            options: ["各クラス独立Sigmoid＋BCE", "全クラス一括Softmax＋必ず1クラス", "恒等関数＋MSEだけ", "Argmaxを学習中に微分する"],
            answer: 0,
            explanation: "複数ラベルが同時に1になれるため、各出力を独立なBernoulli確率として扱います。排他的な多クラス分類はSoftmax＋CEが典型です。"
        },

        // ---------------------------------------------------------
        // 【2026シラバス補強】MLP・順序回帰・計算問題
        // ---------------------------------------------------------
        {
            id: "ff-nonlinearity-collapse",
            category: "MLP・非線形性（重要）",
            difficulty: "標準",
            question: "全結合層を何層も重ねても、層の間に活性化関数を入れなかった場合、モデルはどうなるか。",
            options: ["全体を1つのAffine変換として表せ、複雑な非線形境界を作れない", "層数に比例して必ず非線形性が増す", "Softmaxと同じ確率分布になる", "全ての出力が必ず0になる"],
            answer: 0,
            explanation: "$W_2(W_1x+b_1)+b_2$ は、重みとバイアスをまとめれば別の $Wx+b$ になります。ReLUなどの非線形変換を途中に挟むことが、多層化の表現力につながります。",
            explanationFigure: ffExplanationFigures.linearCollapse,
            trap: "層を増やすだけでは不十分です。「Affine → 活性化関数」を1セットとして考えます。"
        },
        {
            id: "ff-two-layer-parameter-count",
            category: "多層MLP・パラメータ数（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "4入力→3隠れノード→2出力ノードの全結合MLPがある。2つの全結合層の重みとバイアスの総数はいくつか。",
            options: ["18個", "20個", "23個", "26個"],
            answer: 2,
            explanation: "入力→隠れ層は $4×3+3=15$個、隠れ層→出力層は $3×2+2=8$個です。合計は $15+8=23$個です。",
            trap: "各層で、出力ノード数と同じ個数のバイアスを足します。"
        },
        {
            id: "ff-forward-relu-calc",
            category: "順伝播（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "1ニューロンで $z=2x_1-x_2-2$、$y=ReLU(z)$ とする。$x_1=2, x_2=1$ のとき出力 $y$ はいくつか。",
            options: ["-1", "0", "1", "3"],
            answer: 2,
            explanation: "まずAffine計算で $z=2×2-1-2=1$。次に $ReLU(1)=1$ なので、出力は1です。必ず「Affine→活性化関数」の順に計算します。"
        },
        {
            id: "ff-batch-parameter-count",
            category: "パラメータ数・バッチ（識別）",
            difficulty: "標準",
            question: "10入力→5出力の全結合層へ、32件のミニバッチを同時に入力する。学習対象のパラメータ総数はいくつか。",
            options: ["55個", "320個", "1,600個", "1,760個"],
            answer: 0,
            explanation: "パラメータは重み $10×5=50$個とバイアス5個で、合計55個です。32は同じ重みを共有して処理するデータ件数なので、パラメータ数には掛けません。",
            trap: "バッチサイズや中間出力の要素数は、学習する重み・バイアスの個数ではありません。"
        },
        {
            id: "ff-ordinal-identification",
            category: "順序回帰（識別）",
            difficulty: "標準",
            question: "順序回帰として扱うのが最も適切な例はどれか。",
            options: ["病状を軽症・中等症・重症の3段階で予測する", "画像を犬・猫・鳥のいずれかに分類する", "住宅価格を円単位で予測する", "画像に犬と屋外のタグを同時に付ける"],
            answer: 0,
            explanation: "軽症＜中等症＜重症には順番がありますが、段階間の距離が同じとは限りません。このような順序付きカテゴリを扱うのが順序回帰です。",
            explanationFigure: ffExplanationFigures.ordinalRegression,
            trap: "数値ラベル1・2・3を付けても、単純な回帰の連続量と同じとは限りません。"
        },
        {
            id: "ff-ordinal-threshold-count",
            category: "順序回帰・出力数（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "5段階評価を、隣接する段階の境界を順に越えたか判定する累積型の順序回帰で扱う。典型的に必要な境界判定はいくつか。",
            options: ["1個", "4個", "5個", "10個"],
            answer: 1,
            explanation: "K段階を分ける境界はK-1個です。5段階なら「段階1を越えたか」から「段階4を越えたか」までの4境界を判定します。"
        },
        {
            id: "ff-mse-mae-calc",
            category: "MSE・MAE（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "2件の予測誤差が1と3である。MSEとMAEの組み合わせとして正しいものはどれか。",
            options: ["MSE=2、MAE=5", "MSE=4、MAE=2", "MSE=5、MAE=2", "MSE=10、MAE=4"],
            answer: 2,
            explanation: "MSEは $(1²+3²)/2=(1+9)/2=5$。MAEは $(|1|+|3|)/2=(1+3)/2=2$ です。"
        },
        {
            id: "ff-softmax-from-logits-calc",
            category: "Softmax（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "3クラスのロジットが [ln(4), ln(2), 0] のとき、Softmax出力はどれか。",
            options: ["[4/7, 2/7, 1/7]", "[4/6, 2/6, 0]", "[1/3, 1/3, 1/3]", "[ln(4)/6, ln(2)/6, 0]"],
            answer: 0,
            explanation: "指数を取ると [4, 2, 1] です。合計7で割るため [4/7, 2/7, 1/7] になります。$e^0=1$ を忘れないことがポイントです。"
        },
        {
            id: "ff-bce-negative-label-calc",
            category: "BCE・負例（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "正解 $y=0$、予測確率 $p=0.2$ のBCE $-[y\\ln p+(1-y)\\ln(1-p)]$ はどれか。",
            options: ["$-\\ln0.8$", "$-\\ln0.2$", "$\\ln0.8$", "$0$"],
            answer: 0,
            explanation: "$y=0$ では第1項が消え、$-\\ln(1-p)=-\\ln0.8≈0.223$ です。負例では「0である確率」$1-p$ を見ます。"
        },
        {
            id: "ff-sigmoid-temperature",
            category: "Sigmoid・温度パラメータ",
            difficulty: "応用",
            question: "温度付きSigmoid $Sigmoid(z/T)$ で、ロジット $z$ を固定したまま温度 $T$ を大きくすると、出力は一般にどうなるか。",
            options: ["0.5に近づき、曲線は平坦になる", "0か1に近づき、曲線は急になる", "必ず0になる", "出力範囲が-1〜1になる"],
            answer: 0,
            explanation: "$T$ が大きいと $z/T$ は0に近づき、$Sigmoid(0)=0.5$ に近づきます。温度を上げるほど判断はsoftになります。",
            explanationFigure: ffExplanationFigures.sigmoidTemperature,
            trap: "ゲイン $a$ の式 $Sigmoid(az)$ では逆です。$a=1/T$ と整理すると混乱しません。"
        },
        {
            id: "ff-tanh-derivative-zero",
            category: "tanh・微分（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$y=tanh(x)$ の微分が $dy/dx=1-y²$ であるとき、$x=0$ での微分値はいくつか。",
            options: ["0", "0.25", "0.5", "1"],
            answer: 3,
            explanation: "$tanh(0)=0$ なので、微分値は $1-0²=1$ です。tanhの傾きは中央で最大になり、両端では0に近づきます。"
        },
        {
            id: "ff-leaky-relu-calc",
            category: "Leaky ReLU（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "Leaky ReLUを $f(x)=max(x, αx)$ とし、$α=0.01$ とする。$x=-4$ のとき出力はいくつか。",
            options: ["-4", "-0.04", "0", "0.04"],
            answer: 1,
            explanation: "負の入力では $αx$ を使うため、$0.01×(-4)=-0.04$ です。ReLUと違い、負側を完全な0にしない点が重要です。"
        }
    ]
};
