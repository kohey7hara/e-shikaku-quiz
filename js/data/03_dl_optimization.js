window.quizData = {
    title: "3-（２）深層モデルのための最適化",
    
    cheatSheet: `
        <style>
            .flow-box { display: flex; align-items: center; justify-content: center; background: #f9f9f9; padding: 10px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9em; flex-wrap: wrap; }
            .step { border: 2px solid #333; padding: 5px 10px; background: white; border-radius: 5px; text-align: center; width: 90px; margin: 5px; }
            .init-step { border: 2px solid #3498db; background: #ebf5fb; font-weight: bold; }
            .optimizer-step { border: 2px solid #e74c3c; background: #fceceb; font-weight: bold; }
            .arrow { margin: 0 5px; font-weight: bold; color: #555; }
            .loop-arrow { border-top: 2px dashed #999; width: 100%; text-align: center; margin-top: 5px; font-size: 0.8em; color: #777; }
            .opt-icon { width: 80px; height: 50px; background: #fff; margin: auto; border: 1px solid #eee; }
            .path-line { fill: none; stroke-width: 3; stroke-linecap: round; }
        </style>

        <h3>■ 学習の全体タイムライン：初期化はどこ？</h3>
        <p>「初期化」は学習ループに入る前の<strong>準備段階（Step 0）</strong>で行われます。<br>ここでの設定（He/Xavier）が、その後の学習効率を決定づけます。</p>
        
        <div class="flow-box" style="display:block; text-align:center;">
            <div style="display:inline-block; vertical-align:top; margin-right:20px;">
                <div style="margin-bottom:5px; font-weight:bold; color:#3498db;">Step 0: 準備 (1回だけ)</div>
                <div class="step init-step">
                    <strong>初期化</strong><br>
                    (Init)<br>
                    <small>重み $W$ に<br>乱数を入れる</small>
                </div>
            </div>

            <div style="display:inline-block; vertical-align:top; font-size:2em; color:#555; padding-top:10px;">→</div>

            <div style="display:inline-block; vertical-align:top; margin-left:20px; border:2px dashed #999; padding:10px; border-radius:10px; background:#fff;">
                <div style="margin-bottom:5px; font-weight:bold; color:#e74c3c;">Step 1〜N: 学習ループ (繰り返し)</div>
                <div style="display:flex; align-items:center;">
                    <div class="step">順伝播<br>(Forward)</div>
                    <div class="arrow">→</div>
                    <div class="step">逆伝播<br>(Backward)</div>
                    <div class="arrow">→</div>
                    <div class="step optimizer-step">
                        <strong>最適化</strong><br>
                        (Update)<br>
                        <small>SGD/Adam等</small>
                    </div>
                </div>
                <div class="loop-arrow">↑ 次のミニバッチへ (繰り返し) ↑</div>
            </div>
        </div>

        <h3>■ オプティマイザ図鑑 (E資格 完全版)</h3>
        <p>基本の5つに加え、試験に出る派生形2つを追加しました。</p>
        <table>
            <tr><th>名称</th><th>軌跡イメージ</th><th>特徴・試験のツボ</th></tr>
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
                    <span style="color:red;">⚠ 弱点:</span> 学習率が0になり<strong>止まる</strong>。
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
                    過去を徐々に忘れることで、学習を継続させる。
                </td>
            </tr>
            <tr>
                <td><strong>Adadelta</strong><br>(アダデルタ)</td>
                <td>
                    <svg class="opt-icon" viewBox="0 0 80 50">
                        <ellipse cx="70" cy="25" rx="5" ry="5" fill="#16a085" />
                        <path d="M10,25 L40,25 L70,25" stroke="#16a085" class="path-line" />
                    </svg>
                </td>
                <td>
                    <strong>「学習率の設定不要」</strong><br>
                    RMSPropと似ているが、<strong>学習率ハイパーパラメータが存在しない</strong>（単位を揃える工夫で自動化）。
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
                    Momentum + RMSProp。<br>
                    今のデファクトスタンダード。
                </td>
            </tr>
        </table>

        <h3>■ 【暗記】初期化手法の鉄板セット</h3>
        <p>Step 0（準備段階）で、乱数の「広がり具合（分散）」をどう決めるかです。</p>
        <table>
            <tr><th>初期化手法</th><th>相性の良い関数</th><th>特徴</th></tr>
            <tr>
                <td><strong>Xavier (Glorot)</strong></td>
                <td><strong>Sigmoid, Tanh</strong><br>(S字・対称)</td>
                <td>分散 $\\frac{1}{n}$。<br>左右対称な関数で、信号の強さを保つ。</td>
            </tr>
            <tr>
                <td><strong>He (Kaiming)</strong></td>
                <td><strong>ReLU</strong><br>(折れ線・非対称)</td>
                <td>分散 $\\frac{2}{n}$。<br>ReLUを通すと半分消えるので、<strong>2倍</strong>にして補う。</td>
            </tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "初期化手法",
            question: "活性化関数に「ReLU」を用いる場合、重みの初期値として最も適切なものはどれか。",
            options: ["Heの初期値", "Xavier (Glorot) の初期値", "標準偏差0.01のガウス分布", "全ての重みを0にする"],
            answer: 0,
            explanation: "ReLUは負の領域で0になるため、Xavierの初期値では分散が小さくなりすぎて勾配消失を招きます。分散を2倍にした「Heの初期値」を使います。"
        },
        {
            category: "初期化手法",
            question: "活性化関数に「Sigmoid」または「Tanh」を用いる場合、最も適切な重みの初期値はどれか。",
            options: ["Heの初期値", "Xavier (Glorot) の初期値", "一様分布", "全ての重みを1にする"],
            answer: 1,
            explanation: "S字型の関数にはXavier（グロロット）の初期値が適しています。前層のノード数 $n$ に対して分散 $1/n$ の分布を使います。"
        },
        {
            category: "SGD",
            question: "SGD（確率的勾配降下法）の更新式において、パラメータ更新の「歩幅」を決めるハイパーパラメータ $\\eta$ を何と呼ぶか。",
            options: ["学習率 (Learning Rate)", "モーメンタム (Momentum)", "減衰率 (Decay Rate)", "バッチサイズ (Batch Size)"],
            answer: 0,
            explanation: "勾配方向にどれだけ進むかを決める係数です。大きすぎると発散し、小さすぎると収束しません。"
        },
        {
            category: "誤差逆伝播法",
            question: "誤差逆伝播法（Backpropagation）において、微分を効率よく計算するために利用される数学的な性質はどれか。",
            options: ["連鎖律 (Chain Rule)", "対角化", "特異値分解", "中心極限定理"],
            answer: 0,
            explanation: "合成関数の微分は、各関数の微分の積で表せる（$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial y} \\frac{\\partial y}{\\partial x}$）という性質を利用して、出力層から入力層へ勾配を伝播させます。"
        },
        {
            category: "Adam",
            question: "現在主流の最適化手法である「Adam」は、既存のどの2つの手法の利点を組み合わせたものか。",
            options: ["Momentum と RMSProp", "AdaGrad と RMSProp", "SGD と Momentum", "Momentum と AdaGrad"],
            answer: 0,
            explanation: "「慣性（Momentum）」で振動を抑えつつ、「RMSProp」の仕組みでパラメータごとに学習率を調整する、両者のいいとこ取りをした手法です。"
        },
        {
            category: "AdaGrad",
            question: "AdaGradの最大の特徴であり、同時に欠点（学習が停滞する原因）ともなり得るのはどれか。",
            options: ["過去の勾配の二乗和を累積し、学習率を徐々に小さくする", "慣性項を用いて、過去の移動方向を維持する", "勾配の符号のみを利用する", "学習率をランダムに変化させる"],
            answer: 0,
            explanation: "「よく学習したパラメータの学習率は下げる」という適応的な調整を行いますが、二乗和が無限に増えるため、最終的に学習率がほぼ0になり更新が止まってしまいます。"
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
            explanation: "Define-by-Runなどの方式で計算の過程をグラフとして記録し、逆伝播（Backprop）を自動化する技術です。"
        },
        {
            category: "RMSProp",
            question: "RMSPropがAdaGradの弱点を克服するために導入した仕組みは何か。",
            options: ["過去の勾配情報の「指数移動平均」をとり、古い情報を徐々に忘れる", "学習率を固定した", "慣性項を追加した", "勾配を正規化した"],
            answer: 0,
            explanation: "古い勾配情報を減衰率（$\\rho$など）で消していくため、分母が無限大にならず、学習を継続できます。"
        },
        {
            category: "Nesterov (NAG)",
            question: "Nesterovの加速勾配法 (NAG) は、Momentumをどのように改良した手法か。",
            options: ["「現在位置」ではなく、「慣性で進んだ先（未来の位置）」での勾配を使って補正する", "過去の勾配を忘れるようにした", "学習率を自動調整した", "重みをランダムにリセットした"],
            answer: 0,
            explanation: "「どうせそっちに行くなら、行った先でブレーキをかけるか判断しよう」という先読みの考え方を取り入れています。"
        },
        {
            category: "Adadelta",
            question: "Adadeltaの最大の特徴（ユーザーにとっての利点）は何か。",
            options: ["学習率（Learning Rate）のハイパーパラメータを設定する必要がない", "計算が最も速い", "メモリを使わない", "GPUが不要"],
            answer: 0,
            explanation: "Adadeltaは単位（次元）を整える過程で学習率の項が消去されており、デフォルト設定でうまく動くように設計されています。"
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
            options: ["データ量が多いと計算コストが膨大になり、局所解に陥りやすい", "計算が不安定になる", "並列化できない", "メモリを使わない"],
            answer: 0,
            explanation: "計算は安定しますが、重すぎて実用的でなく、また確率的な揺らぎがないため局所解から抜け出しにくいです。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q16 - Q30
        // ---------------------------------------------------------
        {
            category: "鞍点 (Saddle Point)",
            question: "SGDの欠点の一つとして「鞍点（あんてん）」で学習が停滞しやすいことが挙げられる。鞍点とはどのような状態か。",
            options: ["ある方向から見れば極小だが、別の方向から見れば極大になっている（馬の鞍のような）点", "勾配が無限大になる点", "損失が0になる点", "学習率が大きすぎる状態"],
            answer: 0,
            explanation: "勾配が0に近い平坦な場所ですが、最小値ではありません。SGDは勾配0で止まってしまいますが、Momentumなどは勢いでここを突破できます。"
        },
        {
            category: "Heの初期値の分散",
            question: "Heの初期値において、前の層のノード数を $n$ としたとき、重みの分散 $\\sigma^2$ はどのように設定されるか。",
            options: ["$\\frac{2}{n}$", "$\\frac{1}{n}$", "$\\frac{1}{\\sqrt{n}}$", "$n$"],
            answer: 0,
            explanation: "Xavierは $\\frac{1}{n}$ ですが、HeはReLUで半分消えることを考慮して2倍の $\\frac{2}{n}$ に設定します。"
        },
        {
            category: "Adadeltaの単位",
            question: "AdadeltaがSGDやAdaGradと理論的に異なる点として、「単位（次元）の整合性」がある。通常のSGDの更新式の単位はどうなっているか。",
            options: ["更新量の単位が「重みの単位」と一致していない（勾配の逆数になっている）", "更新量の単位が「重みの単位」と一致している", "単位が存在しない", "時間の単位になっている"],
            answer: 0,
            explanation: "通常のSGD ($w - \\eta \\frac{\\partial L}{\\partial w}$) は、単位を見ると次元が合っていません。Adadeltaはヘッセ行列の近似を用いることで、この次元不整合を解消しています。"
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
            options: ["頻繁に出現するパラメータの学習率は下げ、滅多に出ない（重要な）パラメータの学習率を大きく保てるから", "計算速度が速いから", "メモリ消費が少ないから", "初期値に依存しないから"],
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
            question: "通常のMomentumの更新量が $-\\eta \\nabla E(w_t)$ を含むのに対し、Nesterov (NAG) はどのような勾配を使うか。",
            options: ["$-\\eta \\nabla E(w_t + \\alpha v_t)$ （慣性で進んだ先での勾配）", "$-\\eta \\nabla E(w_t - \\alpha v_t)$ （過去の位置での勾配）", "$-\\eta \\nabla E(w_0)$ （初期位置での勾配）", "勾配を使わない"],
            answer: 0,
            explanation: "$w_t + \\alpha v_t$ は「今の勢いで進んだら到達するはずの未来の場所」です。そこで勾配を測ることで、賢くブレーキをかけます。"
        },
        {
            category: "重みの対称性",
            question: "初期化の際に、全ての重みを「0」や「定数」にしてはいけない理由は何か。",
            options: ["全てのニューロンが同じ勾配を持ち、同じように更新されてしまうため（対称性の破れが起きない）", "初期値が0だと計算エラーになるから", "学習率が0になるから", "過学習するから"],
            answer: 0,
            explanation: "みんな同じ値だと、みんな同じ修正を受けるため、結局1つのニューロンがあるのと同じ表現力しか持てなくなります。だから「乱数」が必要です。"
        },
        {
            category: "大域的最適解",
            question: "ディープラーニングの最適化において、真の最小値である「大域的最適解（Global Minima）」に到達することは保証されているか。",
            options: ["保証されていない（多くの局所解が存在する非凸関数であるため）", "保証されている（SGDを使えば必ず到達する）", "保証されている（Adamを使えば必ず到達する）", "凸関数なので保証されている"],
            answer: 0,
            explanation: "DLの損失関数は複雑な凸凹（非凸）なので、局所解（Local Minima）にハマる可能性があります。しかし、高次元空間では局所解も十分に良い値であることが多いです。"
        },
        {
            category: "学習率の減衰",
            question: "学習の後半で、オプティマイザの自動調整とは別に「Learning Rate Decay（学習率減衰）」を行う主な目的は何か。",
            options: ["最適解の付近で振動せず、底に収束させるため", "学習を早く終わらせるため", "過学習を防ぐため", "初期化の影響を消すため"],
            answer: 0,
            explanation: "ある程度近づいたら、歩幅（学習率）を小さくしないと、正解の周りをうろうろ飛び跳ねてしまい、着地できません。"
        },
        {
            category: "Warmup",
            question: "学習の最初期に学習率を非常に小さく設定し、徐々に大きくしていく「Warmup」戦略の目的は何か。",
            options: ["学習初期の不安定な勾配による急激なパラメータ変動を防ぎ、安定したスタートを切るため", "学習時間を短縮するため", "過学習を防ぐため", "データのノイズを除去するため"],
            answer: 0,
            explanation: "Adamなどは初期に不安定になりやすいため、最初はそっと動かし、安定してから本来の学習率まで上げることで、最終的な精度が向上することがあります。"
        },
        {
            category: "Rprop",
            question: "Rprop（Resilient Propagation）は勾配の「符号」のみを用いて更新する手法だが、なぜディープラーニング（特にミニバッチ学習）ではあまり使われないのか。",
            options: ["バッチごとの勾配のノイズに弱く、ミニバッチ学習と相性が悪いから（フルバッチ向き）", "計算量が多すぎるから", "メモリを使いすぎるから", "学習率の設定が難しいから"],
            answer: 0,
            explanation: "Rpropは勾配の大きさ（信頼度）を無視して符号だけで全速力で進むため、ノイズの多いミニバッチ学習では暴れてしまい、うまく収束しません。"
        },
        {
            category: "AdamW",
            question: "Adamの改良版である「AdamW」は、通常のAdamと何が違うか。",
            options: ["Weight Decay（重み減衰）を、勾配の更新とは独立して（Decoupled）適用する", "学習率を固定する", "Momentumを使わない", "L1正則化を使う"],
            answer: 0,
            explanation: "Adamの実装上のバグ（L2正則化とWeight Decayの混同）を修正し、正しくWeight Decayを効かせることで汎化性能を向上させた手法です。"
        },
        {
            category: "Lookahead",
            question: "「Lookahead」オプティマイザの動作原理として正しいものはどれか。",
            options: ["「速い重み（Adam等で更新）」と「遅い重み（指数移動平均）」を持ち、速い重みが先行して探索し、遅い重みが安定してそれを追いかける", "未来の勾配を予測する", "学習率を自動調整する", "勾配の二乗和を使う"],
            answer: 0,
            explanation: "「k歩進んでから、元の場所との中間地点に戻る」ような動きをすることで、局所解からの脱出と安定性を両立させるメタオプティマイザです。"
        },
        {
            category: "勾配のスパース化",
            question: "L1正則化（Lasso）を行うと、最適化の結果としてパラメータにどのような特徴が現れるか。",
            options: ["多くのパラメータが完全に「0」になり、モデルがスパース（疎）になる", "全てのパラメータが均等に小さくなる", "パラメータが大きくなる", "パラメータが正規分布に従う"],
            answer: 0,
            explanation: "L1ノルムの等高線はひし形（尖っている）ため、軸上（値が0）で解が決まりやすく、不要な特徴量を削除（特徴量選択）する効果があります。"
        }
    ]
};
