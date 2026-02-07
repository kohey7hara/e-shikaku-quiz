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

        <h3>■ 【重要】タスク別・出力層の鉄板セット</h3>
        <p>最終段（出力層）では、タスクに応じて<strong>②活性化関数</strong>を使い分けます。<br>※①全結合層は、必要な出力数（クラス数など）に合わせるために必ず存在します。</p>
        <table>
            <tr><th>タスク</th><th>② 活性化関数の選択</th><th>損失関数の選択</th></tr>
            <tr>
                <td><strong>回帰</strong><br>(数値予測)</td>
                <td><strong>恒等関数</strong> (Identity)<br><small>※何もせず値をそのまま通す</small></td>
                <td><strong>平均二乗誤差</strong><br>(MSE)</td>
            </tr>
            <tr>
                <td><strong>2値分類</strong><br>(Yes/No)</td>
                <td><strong>Sigmoid</strong><br><small>※出力を 0.0〜1.0 の確率にする</small></td>
                <td><strong>バイナリ<br>クロスエントロピー</strong></td>
            </tr>
            <tr>
                <td><strong>多クラス分類</strong><br>(どれか1つ)</td>
                <td><strong>Softmax</strong><br><small>※出力の合計を 1.0 (100%) にする</small></td>
                <td><strong>交差エントロピー</strong><br>(Cross Entropy)</td>
            </tr>
            <tr>
                <td><strong>マルチラベル</strong><br>(複数OK)</td>
                <td><strong>Sigmoid</strong><br><small>※各クラス独立して判定</small></td>
                <td><strong>バイナリ<br>クロスエントロピー</strong></td>
            </tr>
        </table>

        <h3>■ 活性化関数図鑑 (E資格 必須セット)</h3>
        <p>形状と「微分の性質」が問われます。</p>
        <table>
            <tr><th>関数名</th><th>形状 (イメージ)</th><th>特徴・試験のツボ</th></tr>
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
                    ・2値分類の出力層で使う。<br>
                    ・中間層で使うと<strong>勾配消失</strong>の原因になる（最大微分値0.25）。
                </td>
            </tr>
            <tr>
                <td><strong>Tanh</strong><br>(タンエイチ)</td>
                <td>
                    <svg class="graph-icon" viewBox="0 0 60 40">
                        <line x1="0" y1="20" x2="60" y2="20" class="axis" />
                        <line x1="30" y1="0" x2="30" y2="40" class="axis" />
                        <path d="M5,35 C25,35 35,5 55,5" class="graph-line" />
                    </svg>
                </td>
                <td>
                    <strong>「ゼロ中心 (-1〜1)」</strong><br>
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
            explanation: "2値分類（出力が確率）の場合、ベルヌーイ分布の負の対数尤度である「バイナリクロスエントロピー」を用います。"
        },
        {
            category: "活性化関数",
            question: "現在、中間層（隠れ層）の活性化関数として最も標準的に使われている、入力が負なら0、正ならそのまま出力する関数はどれか。",
            options: ["Sigmoid", "Tanh", "ReLU", "Step関数"],
            answer: 2,
            explanation: "ReLU (Rectified Linear Unit) です。勾配消失が起きにくく、計算も高速なため標準的に使われます。"
        },
        {
            category: "Sigmoid関数",
            question: "シグモイド関数 $\\sigma(x)$ の出力値の範囲（値域）として正しいものはどれか。",
            options: ["$0 \\le y \\le 1$", "$0 < y < 1$", "$-1 < y < 1$", "$0 \\le y < \\infty$"],
            answer: 1,
            explanation: "シグモイド関数は $0$ と $1$ に漸近しますが、厳密には到達しません。確率は $0$ より大きく $1$ より小さい範囲になります（極限を除く）。"
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
            explanation: "誤差逆伝播法では微分値を掛け算していくため、1より小さい値（シグモイドの微分など）が続くと勾配が0に近づいてしまいます。"
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
            explanation: "線形変換 $Wx$ にバイアス $b$ を加算するのが全結合層の基本計算です。"
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
            explanation: "重みは $10 \\times 5 = 50$個。バイアスは出力ノードごとに1つ付くので $5$個。合計 $50 + 5 = 55$個です。バイアスを忘れないように注意！"
        },
        {
            category: "マルチラベル分類(応用)",
            question: "1つの画像に「犬」「屋外」「走る」など複数のタグを付与する「マルチラベル分類」を行う場合、出力層の活性化関数は何を使うべきか。",
            options: ["ソフトマックス関数", "シグモイド関数", "ReLU", "恒等関数"],
            answer: 1,
            explanation: "ソフトマックスは「どれか1つ」を選ぶ関数です。複数正解がある場合は、各ノードで独立して確率を出せる「シグモイド関数」を使います。"
        },
        {
            category: "活性化関数の微分(応用)",
            question: "シグモイド関数 $f(x)$ の導関数（微分） $f'(x)$ は、元の関数 $f(x)$ を使ってどのように表せるか。",
            options: ["$f(x)(1 - f(x))$", "$1 - f(x)$", "$f(x)^2$", "$e^{-x}$"],
            answer: 0,
            explanation: "シグモイド関数の微分は $y(1-y)$ と書けます。この形は計算グラフでの実装時によく使われます。最大値が $0.5 \\times 0.5 = 0.25$ になることもここから分かります。"
        },
        {
            category: "ReLUの弱点(応用)",
            question: "ReLUにおいて、学習中に特定ニューロンの入力が常に負になり、勾配が常に0になって学習が進まなくなる現象を何と呼ぶか。",
            options: ["Dying ReLU (死んだReLU)", "Exploding ReLU", "Vanishing ReLU", "Leaky ReLU"],
            answer: 0,
            explanation: "一度重みが更新されて「常に入力が負」の状態に陥ると、勾配が0になり二度と復活しなくなる現象です。これを防ぐのがLeaky ReLUなどです。"
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
            explanation: "$a$ を大きくすると $x=0$ 付近での変化が急激になり、0か1かのデジタルな動き（ステップ関数）に近づきます。これを「温度パラメータ」として扱うこともあります。"
        },
        {
            category: "出力層のノード数(応用)",
            question: "ある画像が「犬」「猫」「鳥」のいずれか（3クラス）であり、かつその「座標(x, y)」も予測したい場合、出力層のノード数は最低いくつ必要か。",
            options: ["3個", "2個", "5個", "6個"],
            answer: 2,
            explanation: "クラス分類用の確率3つ（Softmax）＋座標回帰用の数値2つ（恒等関数）＝合計5つの出力ノードが必要です。この場合、マルチタスク学習となります。"
        },
        {
            category: "勾配消失の対策(応用)",
            question: "勾配消失問題への対策として、**不適切なもの**はどれか。",
            options: ["活性化関数をSigmoidからReLUに変更する", "Batch Normalizationを導入する", "層の数を減らす（浅くする）", "重みの初期値を全て0にする"],
            answer: 3,
            explanation: "重みを全て0にすると、全てのニューロンが同じ計算をしてしまい（対称性の破れがない）、学習が正しく進みません。これは勾配消失以前の問題です。"
        }
    ]
};
