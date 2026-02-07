window.quizData = {
    title: "5-（１）（２）エッジAI & 分散処理",
    
    cheatSheet: `
        <style>
            .concept-container { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px; }
            .concept-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; width: 30%; min-width: 300px; background: #fff; vertical-align: top; }
            .card-title { font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 10px; display: inline-block; }
            
            /* 蒸留用 */
            .distill-box { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 10px 0; }
            .teacher-model { width: 60px; height: 80px; border: 2px solid #e74c3c; background: #fceceb; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #c0392b; font-size: 0.8em; }
            .student-model { width: 40px; height: 50px; border: 2px solid #3498db; background: #ebf5fb; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #2980b9; font-size: 0.7em; }
            .distill-arrow { color: #f39c12; font-weight: bold; font-size: 1.5em; }

            /* 量子化用 */
            .quant-container { text-align: center; }
            .bit-bar { height: 20px; margin: 5px auto; border: 1px solid #999; display: flex; }
            .bit-32 { width: 100px; background: linear-gradient(90deg, #3498db, #85c1e9); }
            .bit-8 { width: 25px; background: #e74c3c; }
            
            /* 分散処理用 */
            .gpu-grid { display: flex; justify-content: center; gap: 5px; margin-top: 5px; }
            .gpu-icon { width: 40px; height: 40px; border: 2px solid #333; background: #333; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.7em; border-radius: 4px; }
            .data-piece { width: 30px; height: 10px; margin: 2px auto; }
            .data-a { background: #e74c3c; } .data-b { background: #3498db; } .data-c { background: #27ae60; }
            .model-part { height: 10px; border: 1px solid #fff; margin: 1px; }

            .comp-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .comp-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .comp-table td { border: 1px solid #ccc; padding: 5px; }
            .good { color: #27ae60; font-weight: bold; }
            .bad { color: #c0392b; font-weight: bold; }
        </style>

        <h3>■ 1. モデルの軽量化技術 (エッジAI)</h3>
        <p>スマホやIoTデバイスで動かすために、精度を保ちつつサイズを減らします。</p>
        
        <div class="concept-container">
            <div class="concept-card">
                <div class="card-title" style="border-color:#f39c12;">蒸留 (Distillation)</div>
                <div class="distill-box">
                    <div class="teacher-model">Teacher<br>(巨大)</div>
                    <div class="distill-arrow">➡</div>
                    <div class="student-model">Student<br>(軽量)</div>
                </div>
                <p style="font-size:0.85em;">
                    教師の「出力確率分布（Soft target）」を真似させる。<br>
                    <strong>「温度付きSoftmax」</strong>で分布を滑らかにして情報を伝える。
                </p>
            </div>

            <div class="concept-card">
                <div class="card-title" style="border-color:#3498db;">量子化 (Quantization)</div>
                <div class="quant-container">
                    <div style="font-size:0.8em;">FP32 (32bit)</div>
                    <div class="bit-bar bit-32"></div>
                    <div style="font-size:1.5em; line-height:1;">⬇</div>
                    <div class="bit-bar bit-8"></div>
                    <div style="font-size:0.8em;">INT8 (8bit)</div>
                </div>
                <p style="font-size:0.85em; margin-top:5px;">
                    表現のビット数を減らす。<br>
                    <span class="good">サイズ1/4、計算高速化</span>。<br>
                    <span class="bad">精度が少し落ちる</span>。
                </p>
            </div>

            <div class="concept-card">
                <div class="card-title" style="border-color:#27ae60;">プルーニング (Pruning)</div>
                <div style="text-align:center; font-size:2em; margin:5px;">✂️</div>
                <p style="font-size:0.85em;">
                    寄与度の低い（重みが0に近い）ニューロンや結合を<strong>枝刈り（削除）</strong>する。<br>
                    モデルがスカスカ（スパース）になる。
                </p>
            </div>
        </div>

        <h3>■ 2. 並列分散処理 (GPU学習)</h3>
        <p>巨大なモデルやデータを扱うための技術です。</p>
        
        <div class="concept-container">
            <div class="concept-card">
                <div class="card-title" style="border-color:#3498db;">データ並列 (主流)</div>
                <p style="font-size:0.8em;">各GPUに<strong>同じモデル</strong>をコピー。</p>
                <div class="gpu-grid">
                    <div>
                        <div class="gpu-icon">GPU1</div>
                        <div class="data-piece data-a"></div>
                    </div>
                    <div>
                        <div class="gpu-icon">GPU2</div>
                        <div class="data-piece data-b"></div>
                    </div>
                    <div>
                        <div class="gpu-icon">GPU3</div>
                        <div class="data-piece data-c"></div>
                    </div>
                </div>
                <p style="font-size:0.85em; margin-top:5px;">
                    異なるデータを流し、計算した<strong>勾配を集計（同期）</strong>する。<br>
                    ※通信量が増えるのが課題。
                </p>
            </div>

            <div class="concept-card">
                <div class="card-title" style="border-color:#e74c3c;">モデル並列</div>
                <p style="font-size:0.8em;"><strong>巨大モデル</strong>を分割。</p>
                <div class="gpu-grid">
                    <div>
                        <div class="gpu-icon" style="background:#e74c3c;">GPU1</div>
                        <div style="font-size:0.7em;">層1〜10</div>
                    </div>
                    <div style="font-size:1.5em;">➡</div>
                    <div>
                        <div class="gpu-icon" style="background:#e74c3c;">GPU2</div>
                        <div style="font-size:0.7em;">層11〜20</div>
                    </div>
                </div>
                <p style="font-size:0.85em; margin-top:5px;">
                    1つのGPUに乗らないモデルで使用。<br>
                    ※待ち時間が発生しやすい（パイプライン化で対策）。
                </p>
            </div>
        </div>

        <h3>■ E資格対策：重要キーワード比較</h3>
        <table class="comp-table">
            <tr><th>用語</th><th>内容</th><th>試験のツボ</th></tr>
            <tr><td><strong>QAT</strong><br>(Quantization Aware Training)</td><td><strong>学習中</strong>に量子化をシミュレーションして、劣化しにくい重みを見つける。</td><td>推論時に行うPTQより<strong>精度が高い</strong>。</td></tr>
            <tr><td><strong>MobileNet</strong></td><td><strong>Depthwise Separable Conv</strong>を用いた軽量モデル。</td><td>通常の畳み込みより計算量を劇的に削減。</td></tr>
            <tr><td><strong>All-Reduce</strong></td><td>全GPUのデータを集計(Reduce)し、全GPUに配る(Broadcast)通信アルゴリズム。</td><td><strong>Ring All-Reduce</strong>などの効率化手法がある。</td></tr>
            <tr><td><strong>同期型 vs 非同期型</strong></td><td>同期型は全員の計算を待つ。非同期型（パラメータサーバ）は待たない。</td><td>現在は精度が安定する<strong>同期型</strong>が主流。</td></tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "蒸留",
            question: "モデルの軽量化手法「蒸留 (Distillation)」において、生徒モデルが教師モデルから継承する「知識」とは具体的に何か。",
            options: ["教師モデルが出力する、正解以外のクラスも含めた「確率分布（Soft target）」", "教師モデルの重みパラメータそのもの", "教師モデルの層の構造", "教師モデルの学習データ"],
            answer: 0,
            explanation: "「正解は犬」だけでなく「猫っぽさも少しある」といった、教師モデルが持つ暗黙知（確率の揺らぎ）を学び取ります。"
        },
        {
            category: "量子化",
            question: "ディープラーニングにおける「量子化 (Quantization)」の主な効果はどれか。",
            options: ["パラメータのビット数を減らすことで、モデルサイズを縮小し、メモリ帯域を節約して推論を高速化する", "学習率を自動調整する", "過学習を防ぐ", "新しいデータを生成する"],
            answer: 0,
            explanation: "一般的に32bit浮動小数点(FP32)を8bit整数(INT8)などに変換します。サイズは1/4になり、専用回路での計算も速くなります。"
        },
        {
            category: "プルーニング",
            question: "「プルーニング (Pruning / 枝刈り)」とはどのような処理か。",
            options: ["重みの絶対値が小さい（寄与度が低い）結合やニューロンを削除して、モデルをスパース（疎）にする", "決定木の枝を剪定する", "学習データを間引く", "画像をトリミングする"],
            answer: 0,
            explanation: "不要な結合を切ることで計算量を減らします。構造を維持しない「非構造化プルーニング」と、フィルタごと消す「構造化プルーニング」があります。"
        },
        {
            category: "データ並列",
            question: "分散学習の「データ並列 (Data Parallelism)」において、各GPUで共有（同期）する必要があるものは何か。",
            options: ["計算された「勾配（Gradient）」を集計して、全GPUのモデルパラメータを同一に更新する", "入力データ", "中間層の出力", "学習率"],
            answer: 0,
            explanation: "各GPUは異なるデータで勾配を計算しますが、モデルは同一である必要があるため、勾配の平均をとって全員同じように更新します。"
        },
        {
            category: "モデル並列",
            question: "分散学習の「モデル並列 (Model Parallelism)」を採用すべきシチュエーションはどれか。",
            options: ["モデルが巨大すぎて、1つのGPUのメモリに乗り切らない場合", "データ量が多すぎる場合", "計算を高速化したい場合", "GPUが1つしかない場合"],
            answer: 0,
            explanation: "層ごとに分割して異なるGPUに配置します。GPU間の通信待ちが発生しやすいため、パイプライン化などの工夫が必要です。"
        },
        {
            category: "MobileNet",
            question: "軽量モデル「MobileNet」が計算量を削減するために採用した、通常の畳み込みを2段階に分ける手法は何か。",
            options: ["Depthwise Separable Convolution", "Dilated Convolution", "Transposed Convolution", "Group Convolution"],
            answer: 0,
            explanation: "「空間方向(Depthwise)」と「チャンネル方向(Pointwise)」に分けることで、精度をほぼ落とさずに計算量を1/10程度に減らします。"
        },
        {
            category: "エッジAIの定義",
            question: "「エッジAI」とはどのような形態のAI利用を指すか。",
            options: ["クラウドではなく、端末（スマホ、IoT機器、車など）側で推論処理を行う形態", "最先端のAI技術のこと", "クラウドサーバーで集中処理する形態", "GPUを使わないAIのこと"],
            answer: 0,
            explanation: "通信遅延がない（リアルタイム）、プライバシー保護、通信コスト削減などのメリットがあります。"
        },
        {
            category: "同期型分散学習",
            question: "「同期型」のデータ並列分散学習の特徴として正しいものはどれか。",
            options: ["全てのGPU（ワーカー）の勾配計算が終わるのを待ってから、一括してパラメータを更新する", "計算が終わったGPUから順次パラメータを更新する", "最も速いGPUの結果だけを使う", "学習が不安定になりやすい"],
            answer: 0,
            explanation: "全員の足並みを揃えるため、数学的にはバッチサイズを大きくした通常のミニバッチ学習と等価になり、学習が安定します。"
        },
        {
            category: "温度付きSoftmax",
            question: "蒸留において、教師モデルの出力をより滑らか（Soft）にするために調整するハイパーパラメータ $T$ を何と呼ぶか。",
            options: ["温度 (Temperature)", "学習率 (Learning Rate)", "モーメンタム (Momentum)", "減衰率 (Decay)"],
            answer: 0,
            explanation: "Softmax関数の中で入力値を $T$ で割ります。$T$ を大きくすると分布が平坦になり、小さな確率の情報も生徒に伝わりやすくなります。"
        },
        {
            category: "All-Reduce",
            question: "分散学習において、全ノードのデータを集計し、その結果を全ノードに分配する通信操作を何と呼ぶか。",
            options: ["All-Reduce", "Broadcast", "Gather", "Scatter"],
            answer: 0,
            explanation: "データ並列学習で勾配の総和（平均）を全GPUに行き渡らせるための核心となる通信処理です。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "QAT(応用)",
            question: "「Quantization Aware Training (QAT)」の特徴として正しいものはどれか。",
            options: ["学習中に量子化による精度の劣化をシミュレーションしながら（偽量子化）、量子化に強い重みを学習する", "学習済みモデルを後から量子化する", "量子化を行わずにモデルを圧縮する", "推論時にのみ量子化を行う"],
            answer: 0,
            explanation: "学習後に変換する「Post-Training Quantization (PTQ)」よりも手間がかかりますが、精度劣化を最小限に抑えることができます。"
        },
        {
            category: "Ring All-Reduce(応用)",
            question: "通信ボトルネックを解消するために考案された「Ring All-Reduce」アルゴリズムの特徴は何か。",
            options: ["GPUをリング状につなぎ、隣のGPUにデータをバケツリレー式に渡すことで、通信帯域を効率よく利用する", "全てのGPUを中心のサーバーに接続する", "ランダムに通信する", "通信を行わない"],
            answer: 0,
            explanation: "パラメータサーバ方式（1対多）だとサーバが混雑しますが、リング型なら各GPUの負荷が一定になり、GPU数が増えても効率が落ちにくいです。"
        },
        {
            category: "Batch Sizeと学習率(応用)",
            question: "データ並列でGPU数を増やして「巨大なバッチサイズ」で学習する場合、学習率はどのように調整すべきという経験則（Linear Scaling Rule）があるか。",
            options: ["バッチサイズを $k$ 倍にしたら、学習率も $k$ 倍にする", "バッチサイズを $k$ 倍にしたら、学習率を $1/k$ にする", "学習率は変えない", "学習率を2乗する"],
            answer: 0,
            explanation: "バッチサイズが大きいと勾配の推定精度が上がるため、一度に大きく進んでも安全だからです（ただしWarmupなどが必要な場合もあります）。"
        },
        {
            category: "TensorRT(応用)",
            question: "NVIDIAが提供している、学習済みモデルをGPU上で高速に推論させるためのライブラリ（SDK）は何か。",
            options: ["TensorRT", "CUDA", "CuDNN", "OpenCV"],
            answer: 0,
            explanation: "層の融合（Fusion）や精度の自動調整などを行い、特定のGPUに最適化された推論エンジンを生成します。"
        },
        {
            category: "パイプライン並列(応用)",
            question: "モデル並列の欠点である「計算待ち時間（バブル）」を減らすための工夫は何か。",
            options: ["ミニバッチをさらに細かく分割（マイクロバッチ）し、パイプラインのように次々と流し込む（Pipeline Parallelism）", "GPUの数を減らす", "モデルを小さくする", "通信速度を上げる"],
            answer: 0,
            explanation: "前の層の計算が終わるのを待たずに、次のマイクロバッチの計算を始めることで、GPUの稼働率（利用効率）を高めます。"
        },
        {
            category: "宝くじ仮説(応用)",
            question: "プルーニングに関連する「宝くじ仮説 (Lottery Ticket Hypothesis)」が主張する内容はどれか。",
            options: ["ランダムに初期化された密なネットワークの中には、単独で学習させても元のネットワークと同等の性能を出せる「当たり」の部分ネットワーク（サブネットワーク）が存在する", "宝くじに当たる確率で学習が成功する", "プルーニングは運任せである", "モデルを大きくすれば必ず性能が上がる"],
            answer: 0,
            explanation: "「不要な重みを削ったから性能が出る」のではなく、「最初から優秀な骨格（当たりのチケット）が含まれていた」という説です。"
        },
        {
            category: "連合学習(応用)",
            question: "プライバシー保護の観点から注目される「連合学習 (Federated Learning)」の仕組みはどれか。",
            options: ["各デバイス（エッジ）でローカルデータを使ってモデルを学習し、データではなく「更新された重み（勾配）」だけをサーバーに送って統合する", "全てのデータをサーバーに集めて学習する", "データを暗号化してサーバーに送る", "学習を行わない"],
            answer: 0,
            explanation: "個人の生データ（スマホの操作ログなど）を外部に出さずに、集合知としてモデルを賢くできる技術です。"
        },
        {
            category: "ZeRO(応用)",
            question: "DeepSpeedなどで採用されている「ZeRO (Zero Redundancy Optimizer)」は、データ並列分散学習の何を最適化（削減）するか。",
            options: ["各GPUが重複して持っている「オプティマイザの状態」「勾配」「パラメータ」のメモリ消費", "通信量", "計算時間", "ディスク容量"],
            answer: 0,
            explanation: "従来のデータ並列では全GPUが同じモデル全体を持っていましたが、ZeROはこれを分割して持つことで、巨大モデルの学習を可能にします。"
        },
        {
            category: "Loss Scaling(応用)",
            question: "混合精度学習（FP16）において、勾配の値が小さすぎて0になってしまう（アンダーフロー）問題を防ぐための手法は何か。",
            options: ["Loss Scaling（損失を定数倍して勾配を大きくしてからバックプロパゲーションし、更新時に元に戻す）", "学習率を大きくする", "バッチサイズを小さくする", "FP32に戻す"],
            answer: 0,
            explanation: "FP16は表現できる最小値が大きいため、小さな勾配が消えてしまいます。一時的に値を大きく（スケーリング）して計算します。"
        },
        {
            category: "Knowledge Distillationの損失(応用)",
            question: "蒸留の損失関数において、生徒モデルの学習に使われるのは「教師とのSoft targetの誤差」だけではない。もう一つは何との誤差か。",
            options: ["正解ラベル（Hard target）との誤差", "教師モデルの重みとの誤差", "入力データとの再構成誤差", "ランダムなノイズとの誤差"],
            answer: 0,
            explanation: "「教師の真似（暗黙知の継承）」と「正解ラベルでの学習（本来のタスク）」の両方をバランスよく（重み付けして）行います。"
        }
    ]
};
