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
        // 【基礎編】 Q1 - Q10
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

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "初期化の失敗(応用)",
            question: "重みの初期値を「全て0」に設定して学習を開始するとどうなるか。",
            options: ["全てのニューロンが同じ勾配を持ち、同じように更新されるため、表現力が増さない", "学習が非常に高速に進む", "勾配爆発が起きる", "過学習しやすくなる"],
            answer: 0,
            explanation: "「対称性の破れ」がないため、何層重ねても1つのニューロンがあるのと同じ状態になり、複雑な関数を学習できません。"
        },
        {
            category: "学習率の影響(応用)",
            question: "学習率 $\\eta$ を極端に大きく設定しすぎた場合、損失関数の値はどうなる傾向があるか。",
            options: ["発散してしまい、損失が `NaN` (非数) や無限大になる", "局所解（ローカルミニマム）にトラップされる", "学習が非常にゆっくり進む", "過学習を起こす"],
            answer: 0,
            explanation: "最適解を飛び越えてしまい、谷の反対側に激しく移動することを繰り返し、最終的に値が発散して壊れます。"
        },
        {
            category: "RMSProp vs AdaGrad(応用)",
            question: "AdaGradの「学習が止まる」という欠点を解消するために、RMSPropが導入した仕組みは何か。",
            options: ["過去の勾配情報の「指数移動平均」をとり、古い情報を徐々に忘れる", "学習率を周期的に増減させる（サイクリカル学習率）", "勾配の絶対値ではなく、符号のみを使う", "慣性項（Momentum）を追加する"],
            answer: 0,
            explanation: "累積和ではなく「減衰平均」を使うことで、直近の勾配情報を重視しつつ、学習率が0になり続けるのを防ぎました。"
        },
        {
            category: "鞍点問題(応用)",
            question: "高次元空間での最適化において、局所解（ローカルミニマム）よりも頻繁に発生し、学習の停滞を招く場所はどこか。",
            options: ["鞍点（サドルポイント）", "大域解（グローバルミニマム）", "特異点", "不連続点"],
            answer: 0,
            explanation: "ある方向では極小だが、別の方向では極大になっている点（馬の鞍のような形）。勾配が0になるためSGDでは脱出しにくいですが、Momentumなどを使えば脱出しやすくなります。"
        },
        {
            category: "Nesterov(応用)",
            question: "Nesterovの加速勾配法（NAG）は、通常のMomentumと何が違うか。",
            options: ["「現在位置」ではなく、「慣性で移動した先の位置」での勾配を使って更新ベクトルを決める", "学習率を自動調整する機能がついている", "勾配の二乗和を利用する", "重みの減衰（Weight Decay）を内蔵している"],
            answer: 0,
            explanation: "「どうせ移動するなら、移動した先で坂の様子を見てから微調整しよう」という先読みの戦略をとることで、収束が速くなります。"
        },
        {
            category: "バッチサイズの影響(応用)",
            question: "ミニバッチサイズを「小さく」設定した場合のメリットとして正しいものはどれか。（例：Batch Size = 1〜10）",
            options: ["勾配にノイズが乗るため、鞍点や局所解から脱出しやすくなる（汎化性能向上）", "行列演算の並列化効率が高まり、計算速度（1エポックの時間）が最速になる", "勾配の方向が正確になり、最短距離で収束する", "メモリ消費量が増える"],
            answer: 0,
            explanation: "小さなバッチは計算が不安定（ノイズが多い）ですが、その揺らぎのおかげで悪い場所（局所解）から抜け出しやすくなり、結果的に未知のデータに強いモデルになりやすいです。"
        },
        {
            category: "計算グラフ(応用)",
            question: "誤差逆伝播法において、計算グラフ（Computational Graph）上で「分岐」したノードでの逆伝播（勾配）はどう処理されるか。",
            options: ["分岐先からの勾配を「合算（足し算）」して戻す", "分岐先からの勾配の「平均」をとって戻す", "分岐先からの勾配の「最大値」をとって戻す", "ランダムにどちらかの勾配を選ぶ"],
            answer: 0,
            explanation: "順伝播で値がコピーされて分岐した場合（例: $y=x$ と $z=x$）、逆伝播ではそれぞれの勾配が合流して足し合わされます（$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial y} + \\frac{\\partial L}{\\partial z}$）。"
        },
        {
            category: "Heの初期値(応用)",
            question: "Heの初期値の標準偏差は $\\sqrt{\\frac{2}{n}}$ である。Xavierの初期値 $\\sqrt{\\frac{1}{n}}$ よりも分散が大きい理由は何か。",
            options: ["ReLUは入力が負のときに値を0にして情報（分散）を半分消してしまうため、それを補うために倍の広がりを持たせる", "Sigmoid関数よりもReLUの方が最大値が大きいため", "層が深くなると分散が大きくなるのを防ぐため", "学習率を小さく設定するため"],
            answer: 0,
            explanation: "ReLUを通すとデータの半分が0になります（分散が半分になる）。層を進むごとに信号が弱まるのを防ぐため、初期値の分散を2倍にしてバランスを取っています。"
        },
        {
            category: "最適化手法の選択(応用)",
            question: "一般的に、初めて扱うデータセットに対して、最初に試すべき「無難で性能が良い」オプティマイザはどれとされているか。",
            options: ["Adam", "SGD (パラメータ調整なし)", "AdaGrad", "Newton法"],
            answer: 0,
            explanation: "Adamはハイパーパラメータの調整が比較的少なくて済み、初期段階で高速に収束するため、ベースラインとして最初に試すのに最適です（最終的な精度出しではMomentum SGDが勝ることもあります）。"
        },
        {
            category: "勾配爆発の対策(応用)",
            question: "RNNなどで発生しやすい「勾配爆発（Gradient Explosion）」を防ぐための代表的な手法はどれか。",
            options: ["勾配クリッピング (Gradient Clipping)", "学習率を上げる", "ReLUを使う", "Heの初期値を使う"],
            answer: 0,
            explanation: "勾配のノルムが一定値（閾値）を超えたら、強制的にその値まで小さくカットする手法です。これにより学習の崩壊を防ぎます。"
        }
    ]
};
