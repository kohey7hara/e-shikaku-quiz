window.quizData = {
    title: "4-（８）（９）様々な学習方法 & 説明性 (XAI)",
    
    cheatSheet: `
        <style>
            .concept-wrap { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px; }
            /* ↓ widthを100%にして、中のコンテンツが横に広がるように変更 */
            .concept-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; width: 100%; background: #fff; vertical-align: top; }
            .card-title { font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 10px; display: inline-block; }
            
            /* 転移学習用：横向きレイアウト */
            .tl-container { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; }
            .tl-block { border: 1px solid #999; padding: 8px; border-radius: 4px; text-align: center; font-size: 0.85em; min-width: 80px; }
            .frozen { background-color: #ddd; color: #777; border-style: dashed; }
            .train { background-color: #fceceb; border-color: #e74c3c; color: #c0392b; font-weight: bold; }
            .tl-arrow { color: #555; font-weight: bold; font-size: 1.2em; }

            /* 距離学習用 */
            .triplet-container { display: flex; align-items: center; justify-content: center; gap: 5px; margin-top: 10px; font-size: 0.8em; }
            .circle { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
            .anc { background: #3498db; }
            .pos { background: #27ae60; }
            .neg { background: #e74c3c; }
            .force-arrow { font-size: 1.5em; font-weight: bold; margin-top: -5px; }

            /* XAI用 */
            .heatmap-grid { display: grid; grid-template-columns: repeat(4, 1fr); width: 80px; height: 80px; margin: 0 auto; border: 1px solid #333; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="2" fill="%23ccc"/></svg>'); }
            .heat-cell { opacity: 0.6; }
            .heat-low { background: blue; }
            .heat-mid { background: yellow; }
            .heat-high { background: red; }

            .comp-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .comp-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .comp-table td { border: 1px solid #ccc; padding: 5px; }
            .good { color: #27ae60; font-weight: bold; }
            .bad { color: #c0392b; font-weight: bold; }
        </style>

        <h3>■ 1. 転移学習 vs ファインチューニング</h3>
        <div class="concept-wrap">
            <div class="concept-card">
                <div class="card-title" style="border-color:#3498db;">転移学習 (Transfer Learning)</div>
                <p style="font-size:0.85em; margin-bottom:5px;">学習済みモデルの重みを固定し、最後の層だけすげ替えて学習。</p>
                
                <div class="tl-container">
                    <div class="tl-block frozen">入力層<br>(固定)</div>
                    <div class="tl-arrow">→</div>
                    <div class="tl-block frozen">中間層<br>(固定)</div>
                    <div class="tl-arrow">→</div>
                    <div class="tl-block frozen">中間層<br>(固定)</div>
                    <div class="tl-arrow">→</div>
                    <div class="tl-block train">出力層<br>(新規学習)</div>
                </div>

                <ul style="font-size:0.85em; margin-top:5px;">
                    <li><span class="good">強み</span>: データが少なくても学習できる。計算が速い。</li>
                    <li><span class="bad">弱み</span>: 元のタスクと大きく違うタスクには不向き。</li>
                </ul>
            </div>
            
            <div class="concept-card">
                <div class="card-title" style="border-color:#e74c3c;">ファインチューニング</div>
                <p style="font-size:0.85em; margin-bottom:5px;">学習済みモデルを初期値として、全体を再学習（微調整）。</p>
                
                <div class="tl-container">
                    <div class="tl-block train">入力層<br>(学習)</div>
                    <div class="tl-arrow">→</div>
                    <div class="tl-block train">中間層<br>(学習)</div>
                    <div class="tl-arrow">→</div>
                    <div class="tl-block train">中間層<br>(学習)</div>
                    <div class="tl-arrow">→</div>
                    <div class="tl-block train">出力層<br>(学習)</div>
                </div>

                <ul style="font-size:0.85em; margin-top:5px;">
                    <li><span class="good">強み</span>: タスクに特化した高精度なモデルになる。</li>
                    <li><span class="bad">弱み</span>: ある程度のデータ量が必要（過学習リスク）。<strong>壊滅的忘却</strong>に注意。</li>
                </ul>
            </div>
        </div>

        <h3>■ 2. 距離学習 (Metric Learning)</h3>
        <p>「似たものは近く、違うものは遠く」なるように空間を学習します。</p>
        <div class="concept-wrap">
            <div class="concept-card">
                <div class="card-title" style="border-color:#27ae60;">Triplet Loss の仕組み</div>
                <div class="triplet-container">
                    <div style="text-align:center;">
                        <div class="circle pos">P</div>
                        <small>正例</small>
                    </div>
                    <div class="force-arrow" style="color:#27ae60;">←</div>
                    <div style="text-align:center;">
                        <div class="circle anc">A</div>
                        <small>基準</small>
                    </div>
                    <div class="force-arrow" style="color:#e74c3c;">→</div>
                    <div style="text-align:center;">
                        <div class="circle neg">N</div>
                        <small>負例</small>
                    </div>
                </div>
                <p style="text-align:center; font-size:0.85em; margin-top:5px;">
                    基準(Anchor)に対し、正例(Positive)を引き寄せ、負例(Negative)を突き放す。<br>
                    $L = \max(0, d(A, P) - d(A, N) + \alpha)$
                </p>
            </div>
        </div>

        <h3>■ 3. その他の学習手法・テクニック</h3>
        <table class="comp-table">
            <tr><th>手法</th><th>概要・キーワード</th></tr>
            <tr>
                <td><strong>自己教師あり学習</strong><br>(Self-supervised)</td>
                <td>ラベルなしデータから自分で正解を作って学習。<br>例: <strong>SimCLR</strong> (対照学習), 画像の回転予測。<br>ラベル付けコストが不要。</td>
            </tr>
            <tr>
                <td><strong>蒸留</strong><br>(Distillation)</td>
                <td>「教師モデル（巨大）」の知識を「生徒モデル（軽量）」に教え込む。<br>出力の確率分布（Soft target）を真似させる。</td>
            </tr>
            <tr>
                <td><strong>メタ学習</strong><br>(Meta-Learning)</td>
                <td>「学習の仕方を学習する」。<br>例: <strong>MAML</strong> (少ないデータですぐ適応できる初期値を探す)。Few-shot向け。</td>
            </tr>
        </table>

        <h3>■ 4. 説明可能AI (XAI)</h3>
        <p>「なぜAIがそう判断したか」を可視化・説明する技術です。</p>
        <table class="comp-table">
            <tr><th>手法</th><th>仕組みと特徴</th><th>イメージ</th></tr>
            <tr>
                <td><strong>Grad-CAM</strong></td>
                <td>最後の畳み込み層の勾配を使い、判断に寄与した箇所をヒートマップ化。<br>CNNなら何でも使える。</td>
                <td>
                    <div class="heatmap-grid">
                        <div class="heat-cell heat-low"></div><div class="heat-cell heat-mid"></div><div class="heat-cell heat-low"></div><div class="heat-cell heat-low"></div>
                        <div class="heat-cell heat-mid"></div><div class="heat-cell heat-high"></div><div class="heat-cell heat-high"></div><div class="heat-cell heat-low"></div>
                        <div class="heat-cell heat-mid"></div><div class="heat-cell heat-high"></div><div class="heat-cell heat-high"></div><div class="heat-cell heat-mid"></div>
                        <div class="heat-cell heat-low"></div><div class="heat-cell heat-mid"></div><div class="heat-cell heat-mid"></div><div class="heat-cell heat-low"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td><strong>LIME</strong></td>
                <td>入力データの周辺を少し変化させてモデルに入れ、その挙動を線形モデルで<strong>局所的に近似</strong>して説明する。</td>
                <td>（局所近似）</td>
            </tr>
            <tr>
                <td><strong>SHAP</strong></td>
                <td>協力ゲーム理論の<strong>シャープレイ値</strong>（貢献度）を用いて、各特徴量が予測値をどう押し上げたか/下げたかを算出。公平だが計算が重い。</td>
                <td>（貢献度）</td>
            </tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "転移学習",
            question: "「転移学習 (Transfer Learning)」を行う際、一般的に再学習（重みの更新）が行われるのはモデルのどの部分か。",
            options: ["出力層（全結合層）付近のみ", "入力層のみ", "全ての中間層", "畳み込み層のみ"],
            answer: 0,
            explanation: "入力に近い層は汎用的な特徴（エッジなど）を持っているため固定し、タスクに依存する出力層だけを自前のデータで学習し直します。"
        },
        {
            category: "ファインチューニング",
            question: "「ファインチューニング (Fine-tuning)」を行う際、注意すべきリスクは何か。",
            options: ["データ量が少ない場合、モデル全体を学習させるため「過学習」しやすい", "学習が進まない", "計算量が少なすぎる", "精度が下がることはない"],
            answer: 0,
            explanation: "巨大なモデルを少量のデータで全層学習させると、すぐにデータを丸暗記してしまい汎化性能が落ちるリスクがあります。"
        },
        {
            category: "壊滅的忘却",
            question: "学習済みモデルに新しいタスクを学習させた際、以前学習したタスクの性能が著しく低下してしまう現象を何と呼ぶか。",
            options: ["壊滅的忘却 (Catastrophic Forgetting)", "勾配消失", "過学習", "モード崩壊"],
            answer: 0,
            explanation: "人間と違い、ニューラルネットは新しい知識を上書きすると古い知識を忘れやすい性質があります。これを防ぐ研究（継続学習）もあります。"
        },
        {
            category: "蒸留",
            question: "モデルの軽量化手法の一つである「蒸留 (Knowledge Distillation)」において、生徒モデルが学習の参考にする「教師モデルの出力」はどのようなものか。",
            options: ["Softmax温度付きの確率分布（Soft target）。正解クラスだけでなく、間違いクラスの確率情報も含んでいる", "正解ラベル（Hard target）のみ", "中間層の重みそのもの", "入力データそのもの"],
            answer: 0,
            explanation: "「これは犬だけど、少し猫っぽくもある」といった、0/1のラベルには含まれない「暗黙の知識」を受け継ぐことができます。"
        },
        {
            category: "自己教師あり学習",
            question: "ラベルなしデータを用いて、データ自身から生成した擬似的なラベルで学習を行う手法（例：画像の回転角度を当てる、一部を隠して復元する）を何と呼ぶか。",
            options: ["自己教師あり学習 (Self-supervised Learning)", "教師あり学習", "強化学習", "半教師あり学習"],
            answer: 0,
            explanation: "「Pretext Task（前口上タスク）」を解かせることで、データの特徴表現を事前学習させ、その後少量のラベルデータでFine-tuningします。"
        },
        {
            category: "SimCLR",
            question: "自己教師あり学習の代表例である「SimCLR」が用いている学習の枠組みはどれか。",
            options: ["対照学習 (Contrastive Learning)", "敵対的学習", "強化学習", "生成モデル"],
            answer: 0,
            explanation: "同じ画像からデータ拡張で作った2枚を「近づけ」、別の画像からは「遠ざける」ように学習することで、有益な特徴表現を獲得します。"
        },
        {
            category: "距離学習",
            question: "距離学習 (Metric Learning) の目的として最も適切なものはどれか。",
            options: ["似ているデータ同士の距離が近く、似ていないデータ同士の距離が遠くなるような「特徴空間（埋め込み）」を学習する", "分類精度を最大化する", "画像を生成する", "データをクラスタリングする"],
            answer: 0,
            explanation: "顔認証などで使われます。「Aさんの顔」と「Aさんの別の顔」を近づけ、「Bさんの顔」を遠ざけます。"
        },
        {
            category: "Triplet Loss",
            question: "Triplet Lossの損失関数において、学習が目指す大小関係はどれか。（A: Anchor, P: Positive, N: Negative, $\\alpha$: マージン）",
            options: ["$d(A, P) + \\alpha < d(A, N)$", "$d(A, P) > d(A, N) + \\alpha$", "$d(A, N) + \\alpha < d(A, P)$", "$d(A, P) = d(A, N)$"],
            answer: 0,
            explanation: "「正例との距離」に「マージン」を足しても、なお「負例との距離」の方が遠くなるように学習します。"
        },
        {
            category: "Grad-CAM",
            question: "CNNの判断根拠を可視化する「Grad-CAM」が、ヒートマップを作成するために利用する情報は何か。",
            options: ["最後の畳み込み層の特徴マップに対する、予測クラススコアの「勾配（Gradient）」", "入力画像のピクセル値", "全結合層の重み", "フィルタの重み"],
            answer: 0,
            explanation: "「どの特徴マップが予測に寄与したか」を勾配の大きさから重み付けし、特徴マップを足し合わせて可視化します。"
        },
        {
            category: "LIME",
            question: "説明可能AIの手法「LIME」のアプローチはどれか。",
            options: ["入力データの近傍にサンプルを生成し、その局所的な領域で「線形モデル」などの解釈可能なモデルを学習させて近似する", "モデルの内部構造を解析する", "ゲーム理論に基づく", "勾配情報を使う"],
            answer: 0,
            explanation: "ブラックボックスなモデルでも、ある入力の「ごく近く」だけを見れば線形で近似できるはず、という考え方です（局所的な説明）。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "ArcFace(応用)",
            question: "顔認証などで使われる距離学習手法「ArcFace」の特徴は何か。",
            options: ["Softmax損失に「角度マージン」を加えることで、クラス間をより明確に分離し、クラス内を凝集させる", "ユークリッド距離を使う", "Triplet Lossを使う", "3次元顔モデルを使う"],
            answer: 0,
            explanation: "特徴ベクトルを球面上に配置し、角度（コサイン類似度）ベースでマージンを設けることで、Triplet Lossより安定して高性能を出せます。"
        },
        {
            category: "メタ学習(応用)",
            question: "メタ学習（Meta-Learning）の目的を表すフレーズとして最も適切なものはどれか。",
            options: ["Learning to Learn（学習の仕方を学習する）", "End-to-End Learning", "Unsupervised Learning", "Lifelong Learning"],
            answer: 0,
            explanation: "「新しいタスクに出会ったとき、少ないデータですぐに適応できる能力（初期値や更新ルール）」を学習します。"
        },
        {
            category: "MAML(応用)",
            question: "メタ学習の代表的手法「MAML (Model-Agnostic Meta-Learning)」は何を最適化するか。",
            options: ["未知のタスクに対して、わずかな勾配更新（数ステップ）で適応できる「良いモデルの初期パラメータ」", "学習率", "ネットワーク構造", "ハイパーパラメータ"],
            answer: 0,
            explanation: "どのタスクにも「あと少し調整すれば届く」ような、汎用性の高い初期地点を見つけ出します。"
        },
        {
            category: "SHAP(応用)",
            question: "XAI手法「SHAP」が基づいている「シャープレイ値」とは、もともとどの分野の概念か。",
            options: ["協力ゲーム理論（各プレイヤーが協力して得た報酬を、貢献度に応じて公平に分配する理論）", "グラフ理論", "制御理論", "カオス理論"],
            answer: 0,
            explanation: "「特徴量」を「プレイヤー」、「予測値」を「報酬」と見なし、どの特徴量がどれだけ予測に貢献したかを公平に算出します。"
        },
        {
            category: "Integrated Gradients(応用)",
            question: "勾配ベースの説明手法「Integrated Gradients」の特徴は何か。",
            options: ["ベースライン（真っ黒な画像等）から入力画像まで変化させたときの「勾配の積分」をとることで、勾配消失の問題などを防ぐ", "勾配の絶対値をとる", "勾配を2乗する", "勾配を使わない"],
            answer: 0,
            explanation: "単なる勾配（Saliency Map）だと、飽和している領域で勾配が0になってしまい重要度が反映されない問題を解決します。"
        },
        {
            category: "Siamese Network(応用)",
            question: "距離学習で使われる「Siamese Network（シャムネットワーク）」の構造的特徴は何か。",
            options: ["2つの入力に対して、重みを共有する「全く同じネットワーク」を2つ用意し、それぞれの出力ベクトルの距離を計算する", "異なる2つのネットワークを使う", "入力層が2つあるが出力層は1つ", "敵対的なネットワークである"],
            answer: 0,
            explanation: "重みを共有することで、「同じ基準」で2つのデータをベクトル化し、その類似度を測ることができます。"
        },
        {
            category: "BYOL(応用)",
            question: "自己教師あり学習手法「BYOL (Bootstrap Your Own Latent)」がSimCLRなどの対照学習と異なる画期的な点は何か。",
            options: ["「負例（Negative samples）」を使わずに、正例のみで学習が崩壊せずに表現を獲得できた点", "ラベルありデータを使う点", "画像生成を行う点", "強化学習を使う点"],
            answer: 0,
            explanation: "通常、正例だけだと「全て同じ値を出力する」という崩壊が起きますが、BYOLはTarget Network（移動平均）を使うことでこれを回避しました。"
        },
        {
            category: "Domain Adaptation(応用)",
            question: "転移学習の一種である「ドメイン適応 (Domain Adaptation)」の主な目的は何か。",
            options: ["ソースドメイン（学習データ）とターゲットドメイン（テストデータ）の「分布のズレ」を埋め、ターゲット領域でも精度を出せるようにする", "ラベルの種類を増やす", "モデルを圧縮する", "計算を速くする"],
            answer: 0,
            explanation: "例：「CG画像で学習して、実写画像でテストする」など。分布が違うと精度が落ちるため、敵対的学習などで特徴量の分布を近づけます。"
        },
        {
            category: "CAM vs Grad-CAM(応用)",
            question: "初期の「CAM (Class Activation Mapping)」が抱えていた制約（弱点）は何か。",
            options: ["GAP (Global Average Pooling) 層を用いた特定のアーキテクチャでしか使えず、全結合層があるモデルなどには適用できなかった", "計算が遅すぎる", "精度が低い", "色情報を使えない"],
            answer: 0,
            explanation: "CAMはGAP直前の重みを使うため構造が限定されました。Grad-CAMは勾配を使うことで、GAPがなくても（どんなCNNでも）使えるように汎用化しました。"
        },
        {
            category: "Open Set Recognition(応用)",
            question: "距離学習などが応用される「Open Set Recognition（開集合認識）」とはどのようなタスクか。",
            options: ["学習時に見たことのないクラス（未知クラス）が入力されたときに、無理やり分類せず「未知」として拒絶するタスク", "全てのクラスが既知であるタスク", "ラベルなしデータを分類するタスク", "多ラベル分類タスク"],
            answer: 0,
            explanation: "通常のSoftmax分類器は未知の入力も無理やり既知のクラスに分類してしまいます。距離学習で「どのクラスのクラスタからも遠い」場合は未知と判定します。"
        }
    ]
};
