window.quizData = {
    title: "3-（４）CNN：畳み込みニューラルネットワーク",
    
    cheatSheet: `
        <style>
            .cnn-container { display: flex; flex-direction: column; align-items: center; gap: 15px; background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .cnn-row { display: flex; align-items: center; justify-content: center; gap: 5px; flex-wrap: wrap; }
            .cnn-box { border: 2px solid #333; padding: 10px; background: white; border-radius: 5px; text-align: center; width: 80px; font-size: 0.8em; position: relative; }
            .cnn-arrow { font-weight: bold; color: #555; }
            .grid-icon { width: 100px; height: 100px; margin: auto; background: #fff; }
            .grid-cell { fill: #fff; stroke: #ccc; stroke-width: 1; }
            .filter-highlight { fill: rgba(231, 76, 60, 0.3); stroke: #e74c3c; stroke-width: 2; }
            .pool-highlight { fill: rgba(52, 152, 219, 0.3); stroke: #3498db; stroke-width: 2; }
            .calc-box { background:#eef; padding:10px; border-radius:5px; text-align:center; font-weight:bold; margin: 10px 0; border: 1px solid #ccd; }
        </style>

        <h3>■ CNNの全体像：なぜ畳み込む？</h3>
        <p>全結合層だけで画像処理をすると、「形状（空間情報）」が無視され、パラメータ数が爆発します。<br>CNNは<strong>「形を保ったまま」</strong>特徴を取り出します。</p>
        
        <div class="cnn-container">
            <div class="cnn-row">
                <div class="cnn-box" style="border-style:dashed;">
                    <strong>入力画像</strong><br>
                    <small>RGB<br>(H, W, 3)</small>
                </div>
                <div class="cnn-arrow">→</div>
                <div class="cnn-box" style="background:#eafaf1; border-color:#27ae60;">
                    <strong>畳み込み</strong><br>
                    (Conv)<br>
                    <small>特徴抽出</small>
                </div>
                <div class="cnn-arrow">→</div>
                <div class="cnn-box" style="background:#fef9e7; border-color:#f39c12;">
                    <strong>ReLU</strong><br>
                    (Act)<br>
                    <small>非線形化</small>
                </div>
                <div class="cnn-arrow">→</div>
                <div class="cnn-box" style="background:#ebf5fb; border-color:#3498db;">
                    <strong>Pool</strong><br>
                    (Sub)<br>
                    <small>圧縮・不変性</small>
                </div>
                <div class="cnn-arrow">...繰返...</div>
                <div class="cnn-arrow">→</div>
                <div class="cnn-box" style="background:#fceceb; border-color:#e74c3c;">
                    <strong>全結合</strong><br>
                    (FC)<br>
                    <small>分類・回帰</small>
                </div>
            </div>
        </div>

        <h3>■ 1. 畳み込み (Convolution) の仕組み</h3>
        <div style="display:flex; align-items:center; justify-content:space-around;">
            <div style="text-align:center;">
                <svg class="grid-icon" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="20" height="20" class="grid-cell" /> <rect x="30" y="10" width="20" height="20" class="grid-cell" /> <rect x="50" y="10" width="20" height="20" class="grid-cell" /> <rect x="70" y="10" width="20" height="20" class="grid-cell" />
                    <rect x="10" y="30" width="20" height="20" class="grid-cell" /> <rect x="30" y="30" width="20" height="20" class="grid-cell" /> <rect x="50" y="30" width="20" height="20" class="grid-cell" /> <rect x="70" y="30" width="20" height="20" class="grid-cell" />
                    <rect x="10" y="50" width="20" height="20" class="grid-cell" /> <rect x="30" y="50" width="20" height="20" class="grid-cell" /> <rect x="50" y="50" width="20" height="20" class="grid-cell" /> <rect x="70" y="50" width="20" height="20" class="grid-cell" />
                    <rect x="10" y="70" width="20" height="20" class="grid-cell" /> <rect x="30" y="70" width="20" height="20" class="grid-cell" /> <rect x="50" y="70" width="20" height="20" class="grid-cell" /> <rect x="70" y="70" width="20" height="20" class="grid-cell" />
                    
                    <rect x="10" y="10" width="60" height="60" class="filter-highlight" />
                    <path d="M75,40 L90,40" stroke="#e74c3c" stroke-width="3" marker-end="url(#arrowhead)" />
                </svg>
            </div>
            <div style="width:60%;">
                <p><strong>フィルタ（カーネル）</strong>をスライドさせながら、画像の一部（局所）と積和演算を行います。</p>
                <ul>
                    <li><strong>局所受容野</strong>: 近くのピクセル同士の関係を見る。</li>
                    <li><strong>重み共有</strong>: 同じフィルタを全体で使い回すため、パラメータが少なくて済む。</li>
                </ul>
            </div>
        </div>

        <h3>■ 2. プーリング (Pooling) の仕組み</h3>
        <div style="display:flex; align-items:center; justify-content:space-around; margin-top:10px;">
            <div style="text-align:center;">
                <svg class="grid-icon" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="20" height="20" class="grid-cell" /> <rect x="30" y="10" width="20" height="20" class="grid-cell" /> <rect x="50" y="10" width="20" height="20" class="grid-cell" /> <rect x="70" y="10" width="20" height="20" class="grid-cell" />
                    <rect x="10" y="30" width="20" height="20" class="grid-cell" /> <rect x="30" y="30" width="20" height="20" class="grid-cell" /> <rect x="50" y="30" width="20" height="20" class="grid-cell" /> <rect x="70" y="30" width="20" height="20" class="grid-cell" />
                    <rect x="10" y="50" width="20" height="20" class="grid-cell" /> <rect x="30" y="50" width="20" height="20" class="grid-cell" /> <rect x="50" y="50" width="20" height="20" class="grid-cell" /> <rect x="70" y="50" width="20" height="20" class="grid-cell" />
                    <rect x="10" y="70" width="20" height="20" class="grid-cell" /> <rect x="30" y="70" width="20" height="20" class="grid-cell" /> <rect x="50" y="70" width="20" height="20" class="grid-cell" /> <rect x="70" y="70" width="20" height="20" class="grid-cell" />
                    
                    <rect x="10" y="10" width="40" height="40" class="pool-highlight" />
                    <text x="30" y="35" text-anchor="middle" fill="#3498db" font-size="20" font-weight="bold">Max</text>
                </svg>
            </div>
            <div style="width:60%;">
                <p>画像を縮小（ダウンサンプリング）します。</p>
                <ul>
                    <li><strong>Max Pooling</strong>: 領域内の最大値をとる（主流）。</li>
                    <li><strong>不変性</strong>: 画像が少しズレても、最大値が変わらなければ結果は同じになる（ロバスト性が向上）。</li>
                </ul>
            </div>
        </div>

        <h3>■ 【絶対暗記】出力サイズの計算公式</h3>
        <p>入力 $H$, フィルタ $K$, パディング $P$, ストライド $S$ のとき：</p>
        <div class="calc-box">
            $$H' = \frac{H + 2P - K}{S} + 1$$
        </div>
        <p>※試験では割り切れる設定がほとんどです。割り切れない場合は切り捨て (`floor`) が一般的。</p>

        <h3>■ 特殊な畳み込み & テクニック</h3>
        <table>
            <tr><th>名称</th><th>役割・特徴</th></tr>
            <tr><td><strong>1x1畳み込み</strong><br>(Pointwise)</td><td>縦横サイズは変えず、<strong>チャンネル数だけを変える</strong>（圧縮・拡張）。<br>計算量削減（Bottleneck構造）に使われる。</td></tr>
            <tr><td><strong>GAP</strong><br>(Global Avg Pool)</td><td>特徴マップ1枚ごとの平均値をとり、1つの値にする。<br>全結合層の代わりに使用（パラメータ削減）。</td></tr>
            <tr><td><strong>Im2Col</strong></td><td>畳み込みを行列積に変換して高速化する実装テクニック。<br>for文を使わずGPUで一気に計算できる。</td></tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "サイズ計算",
            question: "入力サイズ $H=5$、フィルタサイズ $K=3$、パディング $P=0$、ストライド $S=1$ のとき、出力サイズ $H'$ はいくつになるか。",
            options: ["3", "2", "4", "5"],
            answer: 0,
            explanation: "公式：$(5 + 2\\times0 - 3) / 1 + 1 = 2 / 1 + 1 = 3$。"
        },
        {
            category: "サイズ計算",
            question: "入力サイズ $H=6$、フィルタサイズ $K=3$、パディング $P=1$、ストライド $S=1$ のとき、出力サイズ $H'$ はいくつになるか。",
            options: ["6", "5", "4", "3"],
            answer: 0,
            explanation: "公式：$(6 + 2\\times1 - 3) / 1 + 1 = 5 + 1 = 6$。パディングにより入力と同じサイズが保たれます（Same Padding）。"
        },
        {
            category: "サイズ計算",
            question: "入力サイズ $H=10$、フィルタサイズ $K=2$、パディング $P=0$、ストライド $S=2$ （Pooling等）のとき、出力サイズ $H'$ はいくつになるか。",
            options: ["5", "4", "6", "10"],
            answer: 0,
            explanation: "公式：$(10 + 0 - 2) / 2 + 1 = 4 + 1 = 5$。サイズが半分になります。"
        },
        {
            category: "プーリング層",
            question: "Max Pooling層を導入する主な目的として、最も適切なものはどれか。",
            options: ["画像の微小な位置ズレに対する不変性（ロバスト性）を高める", "パラメータ数を増やす", "画像を鮮明にする", "チャンネル数を増やす"],
            answer: 0,
            explanation: "多少ズレても、領域内の最大値が変わらなければ同じ特徴として検出できるため、位置ズレに強くなります。"
        },
        {
            category: "全結合層との違い",
            question: "画像認識において、全結合層（MLP）ではなくCNNが用いられる最大の理由は何か。",
            options: ["画像の空間的な構造（縦横の並び）を保持したまま特徴抽出ができ、かつパラメータ共有により効率的だから", "計算が簡単だから", "全結合層は画像を入力できないから", "CNNの方が層を浅くできるから"],
            answer: 0,
            explanation: "全結合層に入れるには画像を1列に潰す（Flatten）必要があり、形状情報が失われます。CNNは形状を維持します。"
        },
        {
            category: "重み共有",
            question: "CNNにおける「重み共有 (Weight Sharing)」とはどういう意味か。",
            options: ["1枚の特徴マップを作る際、画像全体に対して「同じフィルタ（パラメータ）」を使い回すこと", "全ての層で同じ重みを使うこと", "学習データとテストデータで重みを共有すること", "重みを0にすること"],
            answer: 0,
            explanation: "「画像右上の鳥」も「左下の鳥」も同じフィルタで検出できるはず、という仮定のもと、パラメータを共有して数を劇的に減らします。"
        },
        {
            category: "1x1畳み込み",
            question: "「1x1畳み込み（Pointwise Convolution）」の主な利用目的は何か。",
            options: ["特徴マップの「チャンネル数」を増減（主に圧縮）させ、計算量を削減する", "画像の解像度を上げる", "ぼかし効果を入れる", "エッジを検出する"],
            answer: 0,
            explanation: "GoogleLeNet (Inception) などで導入されました。縦横サイズは変えずに、チャンネル方向の線形結合を行うことで次元圧縮します。"
        },
        {
            category: "Im2Col",
            question: "CNNの実装において用いられる「im2col (image to column)」アルゴリズムの役割は何か。",
            options: ["畳み込み演算を行列積に変換し、GPUなどで高速に計算できるようにする", "画像をカラーから白黒に変換する", "画像を列ごとに分割して保存する", "パラメータ数を減らす"],
            answer: 0,
            explanation: "for文でスライドさせると遅いため、入力データを行列に展開（コピー）し、一発の行列掛け算で済ませるテクニックです。"
        },
        {
            category: "GAP",
            question: "Global Average Pooling (GAP) は、CNNの最後によく使われるが、何を行う処理か。",
            options: ["各特徴マップ（チャンネル）の全画素の平均値をとり、1つの値にする", "全特徴マップの最大値をとる", "画像を平均化してぼかす", "全結合層と同じ処理をする"],
            answer: 0,
            explanation: "全結合層（パラメータ大量）の代わりに使われることが多く、過学習を防ぎ、任意の入力サイズに対応できるようになります。"
        },
        {
            category: "チャンネル数",
            question: "RGB画像（3チャンネル）に対して、カーネル数（フィルタ数）が10個の畳み込み層を適用した場合、出力データのチャンネル数はいくつになるか。",
            options: ["10", "3", "13", "30"],
            answer: 0,
            explanation: "畳み込み層の出力チャンネル数は、適用した「フィルタの数」と一致します。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "受容野(応用)",
            question: "CNNにおいて層が深くなるにつれて「受容野 (Receptive Field)」はどう変化するか。",
            options: ["広くなる（元の画像における広い範囲の情報を見るようになる）", "狭くなる", "変わらない", "ランダムに変化する"],
            answer: 0,
            explanation: "畳み込みとプーリングを繰り返すことで、奥の層の1ピクセルは、入力画像のより広い範囲の情報を集約したものになります。"
        },
        {
            category: "Dilated Conv(応用)",
            question: "フィルタに隙間（穴）を空けて畳み込みを行う「Dilated Convolution」のメリットは何か。",
            options: ["パラメータ数を増やさずに、受容野（Receptive Field）を広げることができる", "解像度を上げることができる", "計算量を減らせる", "ノイズを除去できる"],
            answer: 0,
            explanation: "セマンティックセグメンテーションなどで、解像度を維持しつつ広い範囲のコンテキストを取り込みたい場合に使われます。"
        },
        {
            category: "Transposed Conv(応用)",
            question: "「逆畳み込み (Transposed Convolution / Deconvolution)」は主にどのようなタスクで使われるか。",
            options: ["セマンティックセグメンテーションやGANなど、画像の解像度を上げる（アップサンプリング）タスク", "画像分類タスク", "音声認識タスク", "自然言語処理"],
            answer: 0,
            explanation: "通常の畳み込みとは逆に、特徴マップを引き伸ばして画像を生成・復元する際に使われます。"
        },
        {
            category: "Depthwise Separable(応用)",
            question: "MobileNetなどで採用されている「Depthwise Separable Convolution」は、通常の畳み込みをどの2段階に分解したものか。",
            options: ["Depthwise Convolution（空間方向）と Pointwise Convolution（チャンネル方向）", "Dilated Convolution と Transposed Convolution", "Max Pooling と Average Pooling", "3x3 Conv と 5x5 Conv"],
            answer: 0,
            explanation: "空間方向とチャンネル方向を別々に畳み込むことで、計算量とパラメータ数を劇的に削減します。"
        },
        {
            category: "パディングの計算(応用)",
            question: "入力サイズ $H$、ストライド $1$、カーネルサイズ $K$ のとき、出力サイズを入力と同じ $H$ に保つために必要なパディング $P$ の計算式はどれか。",
            options: ["$P = (K - 1) / 2$", "$P = K / 2$", "$P = K - 1$", "$P = K$"],
            answer: 0,
            explanation: "公式 $H = (H + 2P - K)/1 + 1$ を解くと、$2P = K - 1$ となり、$P = (K-1)/2$ となります（Kは通常奇数）。"
        },
        {
            category: "プーリングの誤差逆伝播(応用)",
            question: "Max Pooling層の誤差逆伝播において、勾配はどのように伝わるか。",
            options: ["順伝播時に最大値として選ばれた箇所にのみ勾配を伝え、それ以外は0にする", "全ての箇所に均等に勾配を伝える", "全ての箇所に勾配0を伝える", "ランダムに伝える"],
            answer: 0,
            explanation: "選ばれなかった値は出力に寄与していないため、微分（勾配）は0になります。"
        },
        {
            category: "LeNet(応用)",
            question: "CNNの祖先とも言える、1998年にYann LeCunらが提案した手書き数字認識モデルはどれか。",
            options: ["LeNet", "AlexNet", "VGG", "ResNet"],
            answer: 0,
            explanation: "畳み込み層とプーリング層を交互に配置する現在のCNNの基本形を確立しました。"
        },
        {
            category: "転移学習とCNN(応用)",
            question: "ImageNetで学習済みのCNNを別のタスクに転移学習させる際、一般的に「初期の層」の重みを固定するのはなぜか。",
            options: ["初期の層は「エッジ」や「テクスチャ」などの汎用的な特徴を抽出しており、タスクが変わっても流用できるから", "初期の層は計算が重いから", "初期の層は重要ではないから", "過学習しやすいから"],
            answer: 0,
            explanation: "深い層ほどタスク特有（「犬の顔」など）の特徴になりますが、浅い層はどの画像にも共通する基本的な特徴を見ています。"
        },
        {
            category: "CNNの欠点(応用)",
            question: "CNN（特にMaxPoolingを使用するもの）が抱える「位置情報の欠落」という課題に対処するために、Hintonらが提案したネットワークは何か。",
            options: ["カプセルネットワーク (Capsule Network)", "ResNet", "GAN", "Transformer"],
            answer: 0,
            explanation: "Poolingによる不変性は「位置関係（目と口の配置など）」をある程度無視してしまうため、パーツ間の位置関係を保存するカプセルネットワークが提案されました。"
        },
        {
            category: "パラメータ数計算(応用)",
            question: "入力チャンネル $C_{in}=3$、出力チャンネル $C_{out}=10$、カーネルサイズ $3 \\times 3$ の畳み込み層のパラメータ数（バイアス含む）はいくつか。",
            options: ["280個 $((3 \\times 3 \\times 3 + 1) \\times 10)$", "90個", "30個", "100個"],
            answer: 0,
            explanation: "重み: $3 \\times 3$ (サイズ) $\\times 3$ (入力ch) $\\times 10$ (出力ch) $= 270$。バイアス: $10$ (出力ch分)。合計 $280$個。"
        }
    ]
};
