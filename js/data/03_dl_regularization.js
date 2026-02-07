window.quizData = {
    title: "3-（３）深層モデルのための正則化・汎化性能向上",
    
    cheatSheet: `
        <style>
            .flow-container { display: flex; flex-direction: column; align-items: center; gap: 10px; background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .flow-row { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; justify-content: center; }
            .box { border: 2px solid #333; padding: 8px; background: white; border-radius: 5px; text-align: center; font-size: 0.85em; width: 100px; position: relative; }
            .arrow { font-weight: bold; color: #555; }
            
            /* テクニックごとの色分け */
            .tech-data { border-color: #27ae60; background: #eafaf1; }
            .tech-layer { border-color: #f39c12; background: #fef9e7; }
            .tech-loss { border-color: #e74c3c; background: #fceceb; }
            .tech-loop { border-color: #8e44ad; background: #f4ecf7; }

            .badge { position: absolute; top: -10px; right: -5px; background: #333; color: white; font-size: 0.7em; padding: 2px 5px; border-radius: 3px; }
            .badge-data { background: #27ae60; }
            .badge-layer { background: #f39c12; }
            .badge-loss { background: #e74c3c; }

            .visual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .visual-card { border: 1px solid #ddd; padding: 10px; border-radius: 5px; text-align: center; background: #fff; }
            .svg-icon { width: 80px; height: 80px; margin: auto; }
            .l1-shape { fill: rgba(231, 76, 60, 0.2); stroke: #e74c3c; stroke-width: 2; }
            .l2-shape { fill: rgba(52, 152, 219, 0.2); stroke: #3498db; stroke-width: 2; }
            .contour { fill: none; stroke: #999; stroke-width: 1; stroke-dasharray: 2,2; }
        </style>

        <h3>■ 正則化マップ：どこで効く？</h3>
        <p>過学習を防ぐための「罠」や「工夫」を仕掛ける場所は4箇所あります。</p>
        
        <div class="flow-container">
            <div style="width:100%; text-align:left; font-size:0.8em; color:#666;">学習ループ (Epoch)</div>
            
            <div class="flow-row">
                <div class="box tech-data">
                    <strong>入力データ</strong>
                    <div class="badge badge-data">前処理</div>
                </div>
                <div class="arrow">→</div>
                <div class="box tech-layer">
                    <strong>中間層</strong><br>
                    (Layer)
                    <div class="badge badge-layer">構造</div>
                </div>
                <div class="arrow">→</div>
                <div class="box tech-loss">
                    <strong>損失関数</strong><br>
                    (Loss)
                    <div class="badge badge-loss">計算</div>
                </div>
            </div>

            <div class="flow-row" style="align-items: flex-start; margin-top:5px;">
                <div style="width:100px; font-size:0.8em; color:#27ae60; text-align:center;">
                    ▲<br><strong>データ拡張</strong><br>Noise injection
                </div>
                <div style="width:20px;"></div>
                <div style="width:100px; font-size:0.8em; color:#f39c12; text-align:center;">
                    ▲<br><strong>Dropout</strong><br><strong>Batch Norm</strong>
                </div>
                <div style="width:20px;"></div>
                <div style="width:100px; font-size:0.8em; color:#e74c3c; text-align:center;">
                    ▲<br><strong>L1 / L2 正則化</strong><br>(Penalty項)
                </div>
            </div>

            <div style="margin-top:10px; border-top:2px dashed #8e44ad; width:90%; padding-top:5px; text-align:center; font-size:0.8em; color:#8e44ad;">
                <strong>Early Stopping</strong> (検証誤差を見てループを強制終了)
            </div>
        </div>

        <h3>■ L1 vs L2 正則化 (ペナルティの形)</h3>
        <p>損失関数 $E(w) + \lambda R(w)$ を最小化するイメージです。</p>
        <div class="visual-grid">
            <div class="visual-card">
                <strong>L1正則化 (Lasso)</strong>
                <svg class="svg-icon" viewBox="0 0 100 100">
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#ccc" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#ccc" />
                    <polygon points="50,20 80,50 50,80 20,50" class="l1-shape" />
                    <ellipse cx="85" cy="15" rx="30" ry="20" class="contour" transform="rotate(45, 85, 15)" />
                    <circle cx="20" cy="50" r="3" fill="red" /> </svg>
                <div style="font-size:0.8em; margin-top:5px;">
                    <strong>「尖っている」</strong><br>
                    等高線が<strong>軸上（角）</strong>でぶつかりやすい。<br>
                    → 重みが完全に <strong>0</strong> になる。<br>
                    → <strong>次元削減・特徴選択</strong>
                </div>
            </div>
            <div class="visual-card">
                <strong>L2正則化 (Ridge)</strong>
                <svg class="svg-icon" viewBox="0 0 100 100">
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#ccc" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#ccc" />
                    <circle cx="50" cy="50" r="30" class="l2-shape" />
                    <path d="M60,10 Q90,40 60,70" class="contour" fill="none" />
                    <circle cx="71" cy="29" r="3" fill="blue" /> </svg>
                <div style="font-size:0.8em; margin-top:5px;">
                    <strong>「丸い」</strong><br>
                    等高線が滑らかに接する。<br>
                    → 重みは 0 に近づくが 0 にはならない。<br>
                    → <strong>過学習抑制</strong>の基本
                </div>
            </div>
        </div>

        <h3>■ その他の汎化テクニック図鑑</h3>
        <table>
            <tr><th>名称</th><th>イメージ</th><th>仕組み・効果</th></tr>
            <tr>
                <td><strong>Dropout</strong><br>(ドロップアウト)</td>
                <td>
                    <svg width="40" height="30">
                        <circle cx="10" cy="10" r="3" fill="#333" />
                        <circle cx="20" cy="10" r="3" fill="#ddd" stroke="#ddd" /> <circle cx="30" cy="10" r="3" fill="#333" />
                        <circle cx="10" cy="20" r="3" fill="#ddd" stroke="#ddd" /> <circle cx="20" cy="20" r="3" fill="#333" />
                        <circle cx="30" cy="20" r="3" fill="#333" />
                    </svg>
                </td>
                <td>
                    学習時にランダムにニューロンを消す。<br>
                    ・<strong>アンサンブル学習</strong>と同等の効果。<br>
                    ・推論時は出力をスケーリングする。
                </td>
            </tr>
            <tr>
                <td><strong>Early Stopping</strong><br>(早期終了)</td>
                <td>
                    <svg width="40" height="30" viewBox="0 0 40 30">
                        <path d="M5,5 Q10,25 35,28" stroke="blue" fill="none" stroke-width="1"/> <path d="M5,10 Q15,20 35,15" stroke="red" fill="none" stroke-width="1"/> <line x1="20" y1="0" x2="20" y2="30" stroke="#333" stroke-dasharray="2,1" />
                    </svg>
                </td>
                <td>
                    検証誤差(赤)が下がらなくなったら止める。<br>
                    ・それ以上やると過学習(U字カーブの右側)になるため。
                </td>
            </tr>
            <tr>
                <td><strong>Batch Norm</strong><br>(バッチ正規化)</td>
                <td>
                    $[x_1, x_2] \to \mathcal{N}(0, 1)$
                </td>
                <td>
                    各層の入力を「平均0, 分散1」に強制変換。<br>
                    ・<strong>学習速度UP</strong>。<br>
                    ・初期値依存の低減。
                </td>
            </tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "L1正則化",
            question: "L1正則化（Lasso）のペナルティ項として正しい数式はどれか。",
            options: ["$\\lambda \\sum |w|$ （重みの絶対値の和）", "$\\frac{1}{2} \\lambda \\sum w^2$ （重みの二乗和）", "$\\lambda \\sum w$ （重みの和）", "$\\lambda \\sum \\log(w)$"],
            answer: 0,
            explanation: "L1は「Manhattan距離」の形をしており、絶対値を足し合わせます。これがスパース性（0になりやすい性質）を生みます。"
        },
        {
            category: "L2正則化",
            question: "L2正則化（Ridge）において、正則化項を加えることでパラメータ $w$ はどのように変化するか。",
            options: ["全体的に値が0に近づき小さくなる（Weight Decay）", "多くのパラメータが完全に0になる", "パラメータの値が大きくなる", "パラメータの符号が反転する"],
            answer: 0,
            explanation: "大きな値を持つことに対してペナルティ（二乗）がかかるため、重みが滑らかに小さく抑えられます。これを「荷重減衰 (Weight Decay)」と呼びます。"
        },
        {
            category: "ドロップアウト",
            question: "ドロップアウト（Dropout）が汎化性能を向上させる理由として、最も適切な説明はどれか。",
            options: ["異なる部分ネットワークを多数学習させることになり、実質的に「アンサンブル学習」を行っているのと同じ効果があるから", "計算量が減って学習が速くなるから", "入力データを増やす効果があるから", "勾配消失を防ぐから"],
            answer: 0,
            explanation: "毎回ランダムにニューロンを消すことは、毎回違う形のネットワークを学習させていることになり、それらの平均を取ることで頑健性が増します。"
        },
        {
            category: "ドロップアウトの推論時",
            question: "学習時にドロップアウト率 $p=0.5$ （50%を無効化）で学習した場合、推論（テスト）時には出力をどう調整する必要があるか。（Inverted Dropoutでない場合）",
            options: ["出力を $0.5$ 倍する（平均をとる）", "出力を 2 倍する", "調整は不要", "出力を 0 にする"],
            answer: 0,
            explanation: "学習時は信号が半分しか通っていないため、推論時（全ニューロン使用）には信号量が2倍になってしまいます。学習時と同じスケールにするため、出力に $(1-p)$ を掛けます。"
        },
        {
            category: "バッチ正規化",
            question: "Batch Normalization（バッチ正規化）を行う主なメリットはどれか。",
            options: ["学習が安定し、収束速度が劇的に速くなる（大きな学習率を使える）", "モデルのパラメータ数が減る", "計算コストが下がる", "過学習が完全に起きなくなる"],
            answer: 0,
            explanation: "内部共変量シフト（層ごとの分布のズレ）を抑えることで、学習係数を大きくしても発散しにくくなり、初期値への依存性も下がります。"
        },
        {
            category: "バッチ正規化の場所",
            question: "一般的に、Batch Normalization層はネットワークのどこに挿入するのが推奨されているか（原論文に基づく）。",
            options: ["全結合層（Affine）または畳み込み層の後、活性化関数の前", "活性化関数の後", "入力層の直前のみ", "出力層の直後"],
            answer: 0,
            explanation: "活性化関数（ReLUなど）に入れる前の値 $u$ を正規化することで、活性化関数の「おいしい部分（非線形性）」を有効に使えます。"
        },
        {
            category: "早期終了",
            question: "Early Stopping（早期終了）を行う際、学習をストップさせる基準となる指標はどれか。",
            options: ["検証データ（Validation Data）に対する誤差", "訓練データ（Training Data）に対する誤差", "テストデータ（Test Data）に対する誤差", "学習率の大きさ"],
            answer: 0,
            explanation: "訓練誤差は下がり続けますが、検証誤差はある時点から上がり始めます（過学習の開始）。この「上がり始めた瞬間」を見極めるために検証データを使います。"
        },
        {
            category: "データ拡張",
            question: "画像認識におけるデータ拡張（Data Augmentation）の手法として、不適切なものはどれか。",
            options: ["画像の意味が変わってしまうような極端な変形（数字の6を180度回転させて9にする等）", "左右反転", "ランダムクロップ（切り抜き）", "輝度の変更"],
            answer: 0,
            explanation: "データ拡張は「ラベル（正解）が変わらない範囲」で行う必要があります。6を回転させて9に見えるような変換は、ラベルが変わるため不適切です。"
        },
        {
            category: "正則化の目的",
            question: "正則化（Regularization）の根本的な目的を一言で言うと何か。",
            options: ["過学習（Overfitting）を防ぎ、未知のデータに対する汎化性能を高めること", "学習データに対する精度（Training Accuracy）を最大化すること", "計算速度を上げること", "モデルの層を深くすること"],
            answer: 0,
            explanation: "訓練データに過剰に適合しすぎるのを防ぐために、モデルの複雑さにペナルティを与えたり、ノイズを加えたりします。"
        },
        {
            category: "Weight Decay",
            question: "最適化手法（SGDなど）の実装において、L2正則化はしばしば別の名前で呼ばれる。それは何か。",
            options: ["Weight Decay (荷重減衰)", "Gradient Clipping", "Momentum", "Learning Rate Decay"],
            answer: 0,
            explanation: "更新式の変形により、L2正則化項の微分は「現在の重み $w$ を少し小さくする（減衰させる）」項として現れるため、Weight Decayと呼ばれます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q25
        // ---------------------------------------------------------
        {
            category: "スパース性(応用)",
            question: "L1正則化を行うと、なぜパラメータが「完全に0」になりやすい（スパースになる）のか。幾何学的な理由として正しいものはどれか。",
            options: ["制約領域がひし形（尖っている）であり、等高線がその「角（軸上）」で接する確率が高いため", "制約領域が円形であり、滑らかだから", "微分値が常に0だから", "L1ノルムは微分不可能だから"],
            answer: 0,
            explanation: "ひし形の頂点は軸の上にあります。損失関数の等高線が広がってきたとき、最初にぶつかるのがこの「尖った頂点」になりやすいため、他の成分が0になります。"
        },
        {
            category: "Inverted Dropout(応用)",
            question: "最近の深層学習フレームワーク（PyTorchなど）で主流の「Inverted Dropout」とはどのような処理か。",
            options: ["学習時にドロップアウトしなかったニューロンの出力を $1/(1-p)$ 倍してスケールを合わせ、推論時は何もしない", "推論時に出力を $p$ 倍する", "学習時に出力を $p$ 倍する", "ドロップアウト率を徐々に下げる"],
            answer: 0,
            explanation: "推論時は高速に計算したいので、「学習時にあらかじめ値を大きくしておく」ことで、推論時の掛け算処理を省略するテクニックです。"
        },
        {
            category: "BNの副作用(応用)",
            question: "Batch Normalizationはバッチサイズが極端に小さい（例: 2や4）場合、どのような問題が起きるか。",
            options: ["バッチ内の統計量（平均・分散）が母集団の推定として不正確になり、学習が不安定になる", "計算ができなくなる", "過学習しなくなる", "精度が向上する"],
            answer: 0,
            explanation: "平均・分散はサンプル数が多いほど安定します。少ないとノイズだらけの統計量で正規化することになり、逆効果になります（対策：Group Normなど）。"
        },
        {
            category: "正規化のスケール(応用)",
            question: "L2正則化の強さを決めるハイパーパラメータ $\\lambda$ (lambda) を大きくしすぎると、モデルはどうなるか。",
            options: ["重みが0に近づきすぎてモデルが単純になりすぎ、未学習（Underfitting）を起こす", "過学習（Overfitting）を起こす", "学習が非常に速くなる", "重みが発散する"],
            answer: 0,
            explanation: "ペナルティが強すぎると、モデルは「誤差を減らす」ことよりも「重みを小さくする」ことを優先してしまい、何も学習できなくなります（全て0に近づく）。"
        },
        {
            category: "ノイズの注入(応用)",
            question: "入力データや隠れ層にガウスノイズを加える「Noise Injection」は、正則化としてどのような効果があるか。",
            options: ["モデルが入力の微小な変化に対して頑健になり、決定境界を滑らかにする（L2正則化と似た効果）", "データを破壊して精度を下げる", "計算速度を上げる", "モデルをスパースにする"],
            answer: 0,
            explanation: "「少しずれたデータ」も同じクラスだと教えることになるため、データ拡張と同様に汎化性能を高める効果があります。"
        },
        {
            category: "正則化とMAP推定(応用)",
            question: "ベイズ統計の観点から見ると、L2正則化項を加えることは、重みの事前分布に何を仮定したMAP推定と等価か。",
            options: ["ガウス分布（正規分布）", "ラプラス分布", "一様分布", "ベルヌーイ分布"],
            answer: 0,
            explanation: "「重みは0付近に集まっているはずだ（ガウス分布）」という事前知識（バイアス）を入れることが、数式上L2正則化項になります。（※L1正則化はラプラス分布）"
        },
        {
            category: "Label Smoothing(応用)",
            question: "過学習を防ぐために、正解ラベルを `[0, 1, 0]` ではなく `[0.1, 0.8, 0.1]` のように少しなまらせる手法を何と呼ぶか。",
            options: ["Label Smoothing (ラベル平滑化)", "MixUp", "CutOut", "Batch Norm"],
            answer: 0,
            explanation: "モデルが「確信度100%」を目指して無理やり学習するのを防ぎ、ソフトな確率分布を学習させることで汎化性能を上げます。"
        },
        {
            category: "MixUp(応用)",
            question: "データ拡張手法「MixUp」の特徴的な処理はどれか。",
            options: ["2つの画像をピクセル単位で重み付け加算し、ラベルも同じ比率で混ぜる", "画像を切り抜いて貼り付ける", "画像にノイズを加える", "画像を回転させる"],
            answer: 0,
            explanation: "「犬」と「猫」を混ぜた画像に対して「犬50%, 猫50%」と教えることで、クラス間の境界領域を滑らかに学習させます。"
        },
        {
            category: "BNの推論時(応用)",
            question: "Batch Normalizationにおいて、推論（テスト）時に使用する平均と分散はどこから持ってくるか。",
            options: ["学習中に計算しておいた移動平均（Moving Average）", "テストデータそのものの平均・分散", "0と1を固定で使う", "ランダムな値"],
            answer: 0,
            explanation: "推論時はデータが1つずつ来ることもあるため、その場の統計量は使えません。学習中に記録しておいた「グローバルな統計量」を使います。"
        },
        {
            category: "早期終了の注意点(応用)",
            question: "Early Stoppingを採用する場合、学習終了後のモデルの状態について注意すべきことは何か。",
            options: ["最後の状態ではなく、検証誤差が最小だった時点のパラメータを保存（ロード）しておく必要がある", "最後の状態が常にベストである", "パラメータを全て0に戻す", "学習率を0にする"],
            answer: 0,
            explanation: "「止めた時点」ではすでに過学習が始まって誤差が上がっている可能性があります。ベストスコアを記録した時点の重みを取り出す機能（Model Checkpoint）が必要です。"
        },
        {
            category: "Layer Norm(応用)",
            question: "RNNなどでBatch Normの代わりに使われる「Layer Normalization」は、どの単位で正規化を行うか。",
            options: ["1つのデータ（サンプル）の中の全特徴量（チャンネル・隠れ層）で正規化", "バッチ全体の同じチャンネルで正規化", "画像1枚ごとに正規化", "重み行列ごとに正規化"],
            answer: 0,
            explanation: "バッチサイズに依存せず、その瞬間の入力データ内部だけで正規化するため、系列長が変わるRNNなどで安定して動作します。"
        },
        {
            category: "正則化のハイパーパラメータ(応用)",
            question: "L2正則化係数 $\\lambda$ を交差検証（Cross Validation）で決める際、探索範囲として適切なスケールはどれか。",
            options: ["対数スケール（例: 0.1, 0.01, 0.001 ...）", "線形スケール（例: 0.1, 0.2, 0.3 ...）", "ランダム", "負の値"],
            answer: 0,
            explanation: "正則化の影響力は桁数（オーダー）で変わることが多いため、グリッドサーチなどでは $10^{-3}, 10^{-4}$ のように対数スケールで探すのが定石です。"
        },
        {
            category: "DropConnect(応用)",
            question: "Dropoutの派生形である「DropConnect」は、何をランダムに無効化するか。",
            options: ["重み（結合）そのもの", "ニューロン（ノード）", "バイアス", "入力データ"],
            answer: 0,
            explanation: "Dropoutは「点（ノード）」を消しますが、DropConnectは「線（重み）」を消します。より汎化性能が高いとされることもあります。"
        },
        {
            category: "勾配クリッピング(応用)",
            question: "正則化の一種ともみなせる「勾配クリッピング」は、主に何を防ぐために使われるか。",
            options: ["勾配爆発 (Exploding Gradient)", "勾配消失 (Vanishing Gradient)", "過学習", "局所解へのトラップ"],
            answer: 0,
            explanation: "勾配のノルムが閾値を超えたらカットすることで、学習が大きく飛びすぎて発散するのを物理的に防ぎます。"
        },
        {
            category: "データ拡張の副作用(応用)",
            question: "データ拡張を行いすぎると、どのような弊害が起こり得るか。",
            options: ["学習データの分布がテストデータの分布から乖離しすぎて、逆に精度が落ちる（Underfitting）", "過学習しやすくなる", "モデルが小さくなる", "計算が速くなる"],
            answer: 0,
            explanation: "例えば数字認識で「回転」をさせすぎると、6と9の区別がつかなくなり、学習が収束しなくなります（多様性と正解保持のトレードオフ）。"
        }
    ]
};
