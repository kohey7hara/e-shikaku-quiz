window.quizData = {
    title: "3-（４）CNN：畳み込みニューラルネットワーク",
    
    cheatSheet: `
        <style>
            .cnn-flow { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 5px; background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .cnn-step { border: 2px solid #333; padding: 8px; background: white; border-radius: 5px; text-align: center; width: 85px; font-size: 0.8em; }
            .cnn-arrow { color: #555; font-weight: bold; }
            
            .visual-container { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
            .visual-box { border: 1px solid #ccc; padding: 10px; border-radius: 8px; background: #fff; width: 45%; min-width: 250px; }
            .grid-table { border-collapse: collapse; margin: 10px auto; }
            .grid-table td { width: 25px; height: 25px; border: 1px solid #ddd; text-align: center; font-size: 0.8em; color: #ccc; }
            
            /* 畳み込みの強調 */
            .conv-active { border: 2px solid #e74c3c !important; color: #e74c3c !important; font-weight: bold; background: #fceceb; }
            /* プーリングの強調 */
            .pool-active { border: 2px solid #3498db !important; color: #3498db !important; font-weight: bold; background: #ebf5fb; }

            .formula-box { background:#eef6ff; padding:10px; border-radius:7px; text-align:center; font-weight:bold; margin: 8px 0; border: 1px solid #c8dbee; white-space: nowrap; }
            .formula-box mjx-container { margin: 0 !important; }
            .exam-core { margin: 12px 0 20px; padding: 14px 16px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .calc-steps { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 12px 0; }
            .calc-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 9px; background: #fff; }
            .calc-card strong { color: #123f68; }
            .answer-strip { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #f39c12; border-radius: 7px; background: #fff8e7; line-height: 1.7; }
            .comparison-table td:nth-child(3) { min-width: 330px; }
            @media (max-width: 760px) {
                .calc-steps { grid-template-columns: 1fr; }
            }
        </style>

        <h3>■ 試験は「形・数・役割」の3本</h3>
        <div class="exam-core">
            <strong>形：</strong>出力の高さ・幅・チャネル数を求める。<br>
            <strong>数：</strong>重みとバイアスのパラメータ数を求める。<br>
            <strong>役割：</strong>通常畳み込み、特殊な畳み込み、プーリングを見分ける。<br>
            <strong>迷ったら：</strong>①実効カーネル → ②出力サイズ → ③出力チャネル → ④パラメータ数の順。
        </div>

        <h3>■ CNNの処理フロー：形を保って特徴を掴む</h3>
        <p>全結合層（1列に潰す）と違い、CNNは「画像の形」を維持したまま、以下の流れで処理します。</p>
        
        <div class="cnn-flow">
            <div class="cnn-step" style="border-style:dashed;">
                <strong>入力</strong><br>
                <small>画像</small>
            </div>
            <div class="cnn-arrow">→</div>
            <div class="cnn-step" style="background:#eafaf1; border-color:#27ae60;">
                <strong>畳み込み</strong><br>
                (Conv)<br>
                <small>特徴抽出</small>
            </div>
            <div class="cnn-arrow">→</div>
            <div class="cnn-step" style="background:#fef9e7; border-color:#f39c12;">
                <strong>ReLU</strong><br>
                (Act)<br>
                <small>活性化</small>
            </div>
            <div class="cnn-arrow">→</div>
            <div class="cnn-step" style="background:#ebf5fb; border-color:#3498db;">
                <strong>Pool</strong><br>
                (Sub)<br>
                <small>圧縮</small>
            </div>
            <div class="cnn-arrow">...</div>
            <div class="cnn-step" style="background:#fceceb; border-color:#e74c3c;">
                <strong>全結合</strong><br>
                (FC)<br>
                <small>分類</small>
            </div>
        </div>

        <h3>■ 図解：畳み込みとプーリングの違い</h3>
        <div class="visual-container">
            <div class="visual-box">
                <h4>1. 畳み込み (Convolution)</h4>
                <p style="font-size:0.8em;">フィルタをスライドさせて、局所的な特徴（縦線、横線など）を見つけます。</p>
                <table class="grid-table">
                    <tr><td class="conv-active">1</td><td class="conv-active">0</td><td>1</td><td>0</td></tr>
                    <tr><td class="conv-active">0</td><td class="conv-active">1</td><td>0</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>1</td><td>0</td></tr>
                    <tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>
                </table>
                <div style="text-align:center; font-size:0.8em; color:#e74c3c;">
                    ▲ フィルタと積和演算<br>(重み共有でパラメータ削減)
                </div>
            </div>

            <div class="visual-box">
                <h4>2. プーリング (Max Pooling)</h4>
                <p style="font-size:0.8em;">領域内の「最大値」だけを残し、画像を縮小します。</p>
                <table class="grid-table">
                    <tr><td class="pool-active">9</td><td class="pool-active">3</td><td>2</td><td>1</td></tr>
                    <tr><td class="pool-active">4</td><td class="pool-active">5</td><td>0</td><td>8</td></tr>
                    <tr><td>2</td><td>1</td><td>6</td><td>7</td></tr>
                    <tr><td>0</td><td>5</td><td>3</td><td>4</td></tr>
                </table>
                <div style="text-align:center; font-size:0.8em; color:#3498db;">
                    ▲ 最大値「9」を採用<br>(位置ズレに強くなる)
                </div>
            </div>
        </div>

        <h3>■ 計算は4手順だけ</h3>
        <div class="calc-steps">
            <div class="calc-card">
                <strong>① 実効カーネル</strong>
                <div class="formula-box">$\\displaystyle K_{eff}=D(K-1)+1$</div>
                通常の畳み込みは $D=1$ なので $K_{eff}=K$。
            </div>
            <div class="calc-card">
                <strong>② 出力サイズ</strong>
                <div class="formula-box">$\\displaystyle H_{out}=\\left\\lfloor\\frac{H+2P-K_{eff}}{S}\\right\\rfloor+1$</div>
                幅 $W_{out}$ も同じ式。割り切れない端は切り捨て。
            </div>
            <div class="calc-card">
                <strong>③ 出力チャネル</strong>
                <div class="formula-box">$\\displaystyle C_{out}=\\text{フィルタの個数}$</div>
                1フィルタが1枚の特徴マップを作る。
            </div>
            <div class="calc-card">
                <strong>④ パラメータ数</strong>
                <div class="formula-box">$\\displaystyle (K_hK_wC_{in}+1)C_{out}$</div>
                $+1$ は出力チャネルごとのバイアス。無視なら外す。
            </div>
        </div>
        <div class="answer-strip">
            <strong>例：</strong>入力 $32\\times32\\times3$、$3\\times3$、$P=1,S=1$、フィルタ64個<br>
            → 出力は $32\\times32\\times64$、パラメータは $(3\\times3\\times3+1)\\times64=1,792$。
        </div>

        <h3>■ 積和演算：1マスの作り方</h3>
        <p>入力の小領域とカーネルを<strong>同じ位置どうしで掛け、全部足す</strong>だけです。</p>
        <div class="formula-box">
            $\\displaystyle
            \\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}
            \\odot
            \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$
        </div>
        <div class="formula-box">
            $\\displaystyle 1\\times1+2\\times0+3\\times0+4\\times(-1)=-3$
        </div>

        <h3>■ 用語は1行で覚える</h3>
        <table class="comparison-table">
            <tr><th>用語</th><th>一言</th><th>試験のツボ</th></tr>
            <tr><td><strong>フィルタ / カーネル</strong></td><td>局所領域に掛ける重み</td><td>同じ重みを全位置で使う＝<strong>重み共有</strong>。</td></tr>
            <tr><td><strong>特徴マップ</strong></td><td>1フィルタの反応結果</td><td>フィルタ数＝出力チャネル数。</td></tr>
            <tr><td><strong>受容野</strong></td><td>出力1点が見ている入力範囲</td><td>深い層・大きいstride・dilationで広がる。</td></tr>
            <tr><td><strong>im2col</strong></td><td>各パッチを行へ展開</td><td>行列積で高速化するが、重複展開でメモリ増加。</td></tr>
            <tr><td><strong>単純型 / 複雑型細胞</strong></td><td>特徴抽出 / 位置ずれ吸収</td><td>畳み込み / プーリングの生物学的イメージ。</td></tr>
        </table>

        <h3>■ 特別な畳み込み：何を分ける？</h3>
        <table class="comparison-table">
            <tr><th>手法</th><th>何をするか</th><th>暗記ワード</th></tr>
            <tr><td><strong>Pointwise（1×1）</strong></td><td>各位置でチャネルを混ぜ、$C_{out}$ を変更</td><td>空間サイズを保ったままチャネル圧縮・拡張。</td></tr>
            <tr><td><strong>Depthwise</strong></td><td>入力チャネルごとに独立して空間畳み込み</td><td>チャネルを<strong>混ぜない</strong>。</td></tr>
            <tr><td><strong>Depthwise Separable</strong></td><td>Depthwise → Pointwise</td><td>空間処理とチャネル混合を分離して軽量化。</td></tr>
            <tr><td><strong>Grouped</strong></td><td>チャネルを複数グループへ分割</td><td>通常畳み込みとDepthwiseの中間。</td></tr>
            <tr><td><strong>Dilated</strong></td><td>カーネル要素の間隔を空ける</td><td>パラメータ数を増やさず受容野を拡大。</td></tr>
            <tr><td><strong>Transposed</strong></td><td>学習可能なアップサンプリング</td><td>数学的な逆畳み込みではない。</td></tr>
        </table>

        <h3>■ プーリング：残すものを見分ける</h3>
        <table class="comparison-table">
            <tr><th>手法</th><th>残すもの</th><th>形・特徴</th></tr>
            <tr><td><strong>Max Pooling</strong></td><td>領域内の最大値</td><td>強い特徴を残す。学習パラメータなし。</td></tr>
            <tr><td><strong>Average Pooling</strong></td><td>領域内の平均</td><td>滑らかな要約。</td></tr>
            <tr><td><strong>Lp Pooling</strong></td><td>$\\left(\\sum_i|x_i|^p\\right)^{1/p}$</td><td>$p\\to\\infty$ でMaxに近づく。</td></tr>
            <tr><td><strong>Global Average Pooling</strong></td><td>各チャネル全体の平均</td><td>$H\\times W\\times C\\to1\\times1\\times C$。</td></tr>
        </table>
        <p><strong>最後の整理：</strong>畳み込みは移動に対して<strong>同じように位置が動く（equivariance）</strong>。プーリングやGAPが位置ずれへの<strong>不変性</strong>を強めます。</p>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "畳み込み演算",
            question: "畳み込みニューラルネットワーク（CNN）が、全結合層だけのネットワーク（MLP）と比べて画像認識に優れている主な理由はどれか。",
            options: ["画像の位置ズレに対する頑健性（移動不変性）と、局所的な特徴抽出能力を持つため", "計算量がMLPよりも圧倒的に多いから", "学習データが少なくても過学習しないから", "活性化関数を使わなくて済むから"],
            answer: 0,
            explanation: "「重み共有」によるパラメータ削減と、「局所受容野」による空間構造の維持がCNNの強みです。厳密には畳み込みは移動に対して同じように反応位置が動く性質（移動等変性）を持ち、Poolingなどが位置ずれへの不変性を強めます。"
        },
        {
            category: "出力サイズ計算",
            question: "入力サイズ $10 \\times 10$、フィルタサイズ $3 \\times 3$、パディング $0$、ストライド $1$ のとき、出力される特徴マップのサイズはいくつか。",
            options: ["$8 \\times 8$", "$7 \\times 7$", "$9 \\times 9$", "$10 \\times 10$"],
            answer: 0,
            explanation: "式：$\\frac{10 + 0 - 3}{1} + 1 = 7 + 1 = 8$。 $8 \\times 8$ になります。"
        },
        {
            category: "パディング",
            question: "畳み込み層において「パディング (Padding)」を行う主な目的はどれか。",
            options: ["出力サイズが入力サイズより小さくなるのを防ぐ（端の情報を保持する）", "計算速度を上げる", "過学習を防ぐ", "画像のコントラストを上げる"],
            answer: 0,
            explanation: "パディングなしで畳み込みを繰り返すと画像がどんどん小さくなり、端の情報が失われてしまいます。周囲を0で埋める（Zero Padding）のが一般的です。"
        },
        {
            category: "プーリング",
            question: "「Max Pooling」の操作として正しいものはどれか。",
            options: ["対象領域内の「最大値」を取り出す", "対象領域内の「平均値」を取り出す", "対象領域内の「中央値」を取り出す", "対象領域内の値をランダムに取り出す"],
            answer: 0,
            explanation: "領域内の最も強い特徴（最大値）だけを残すことで、微小な位置ズレを無視（吸収）できるようにします。"
        },
        {
            category: "1x1畳み込み",
            question: "「1x1畳み込み (Pointwise Convolution)」の主な用途はどれか。",
            options: ["チャンネル数（深さ）の削減・調整による計算量の軽量化", "画像サイズの拡大", "エッジ（輪郭）の検出", "過学習の防止"],
            answer: 0,
            explanation: "GoogLeNet（Inception）などで採用。空間方向のサイズは変えずに、チャンネル方向の次元圧縮を行い、計算コストを大きく下げます。"
        },
        {
            category: "im2col",
            question: "CNNの実装において「im2col (image to column)」というアルゴリズムが使われる理由は何か。",
            options: ["畳み込み演算を行列の掛け算（GEMM）に変換し、計算を高速化するため", "メモリ使用量を最小限にするため", "画像を白黒に変換するため", "逆伝播の計算を不要にするため"],
            answer: 0,
            explanation: "4次元データ（バッチ、CH、高さ、幅）を2次元の行列に展開することで、GPUが得意な行列積で一気に計算できるようにします。"
        },
        {
            category: "受容野",
            question: "CNNにおける「受容野 (Receptive Field)」とは何を指すか。",
            options: ["出力層の1つのニューロンが、入力画像のどのくらいの範囲（領域）の情報を見ているか", "フィルタのサイズそのもの", "入力画像の解像度", "全結合層のニューロン数"],
            answer: 0,
            explanation: "層が深くなるほど、一度に見ている範囲（受容野）は広くなります。"
        },
        {
            category: "生物学的背景",
            question: "CNNの元となった「ネオコグニトロン」のモデルにおいて、エッジ検出などの単純な特徴抽出を行う細胞を何と呼ぶか。",
            options: ["単純型細胞 (Simple cell)", "複雑型細胞 (Complex cell)", "錐体細胞", "神経節細胞"],
            answer: 0,
            explanation: "単純型細胞（S細胞）が特徴抽出（今の畳み込み層）を行い、複雑型細胞（C細胞）が位置ズレの吸収（今のプーリング層）を行うというモデルです。"
        },
        {
            category: "ストライド",
            question: "畳み込み時にフィルタを動かす歩幅のことを何と呼ぶか。",
            options: ["ストライド (Stride)", "パディング (Padding)", "カーネル (Kernel)", "チャンネル (Channel)"],
            answer: 0,
            explanation: "ストライドを2以上にすると、画像サイズを縮小（ダウンサンプリング）する効果があります。"
        },
        {
            category: "Global Average Pooling",
            question: "CNNの最後の全結合層の代わりに用いられる「Global Average Pooling (GAP)」の操作はどれか。",
            options: ["各チャンネルの特徴マップ全体の平均値をとり、1つの値にする", "全特徴マップの最大値をとる", "特徴マップを1列に並べる（Flatten）", "特徴マップ同士を足し合わせる"],
            answer: 0,
            explanation: "特徴マップ1枚につき1つの値を出力します。学習パラメータを増やさずに $H\\times W\\times C$ を $1\\times1\\times C$ へ要約でき、全結合層よりパラメータを抑えられます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "サイズ計算(応用)",
            question: "入力 $32 \\times 32$、フィルタ $5 \\times 5$、パディング $2$、ストライド $1$ のとき、出力サイズはどうなるか。",
            options: ["$32 \\times 32$", "$28 \\times 28$", "$30 \\times 30$", "$34 \\times 34$"],
            answer: 0,
            explanation: "式：$\\frac{32 + (2\\times 2) - 5}{1} + 1 = 32 + 4 - 5 + 1 = 32$。パディングによりサイズが維持される設定（Same Padding）です。"
        },
        {
            category: "Depthwise Separable Conv(応用)",
            question: "MobileNetなどで使われる「Depthwise Separable Convolution」は、通常の畳み込みをどの2段階に分解したものか。",
            options: ["Depthwise Convolution と Pointwise Convolution (1x1)", "Group Convolution と Dilated Convolution", "Transposed Convolution と Max Pooling", "3x3 Convolution と 5x5 Convolution"],
            answer: 0,
            explanation: "「空間方向（Depthwise）」と「チャンネル方向（Pointwise）」の畳み込みを分けることで、パラメータ数と計算量を劇的に削減します。"
        },
        {
            category: "逆畳み込み(応用)",
            question: "セグメンテーション（FCNなど）やGANで用いられる、特徴マップの解像度を大きくする（アップサンプリング）処理はどれか。",
            options: ["逆畳み込み (Transposed Convolution / Deconvolution)", "Max Pooling", "Dilated Convolution", "Global Average Pooling"],
            answer: 0,
            explanation: "通常の畳み込みの逆演算のような処理を行い、画像を拡大します（厳密な数学的逆演算ではありません）。"
        },
        {
            category: "パラメータ数計算(応用)",
            question: "入力チャンネル数 $3$、出力チャンネル数 $64$、フィルタサイズ $3 \\times 3$ の畳み込み層のパラメータ（重み）数はいくつか。（バイアスは無視）",
            options: ["$3 \\times 3 \\times 3 \\times 64 = 1,728$", "$3 \\times 3 \\times 64 = 576$", "$3 \\times 3 \\times 3 = 27$", "$64 \\times 64 \\times 3 = 12,288$"],
            answer: 0,
            explanation: "1つのフィルタは「入力CH × 3 × 3」の体積を持ちます。それが「出力CH」個あるので、全部掛け算します。"
        },
        {
            category: "Dilated Conv(応用)",
            question: "セグメンテーションなどで使われる、フィルタの要素間に隙間（穴）を空けて畳み込む「Dilated Convolution」のメリットは何か。",
            options: ["パラメータ数を増やさずに受容野（Receptive Field）を広げることができる", "画像を縮小せずに計算量を減らせる", "エッジ検出の精度が上がる", "逆伝播が速くなる"],
            answer: 0,
            explanation: "プーリングで解像度を落とすことなく、広い範囲のコンテキスト情報を集約できるため、ピクセル単位の予測タスクで有用です。"
        },
        {
            category: "グループ化畳み込み(応用)",
            question: "AlexNetやResNeXtで採用されている「Grouped Convolution」の特徴はどれか。",
            options: ["入力チャンネルをいくつかのグループに分割し、グループごとに独立して畳み込みを行う", "複数の異なるサイズのフィルタを並列に適用する", "時間の次元を含めて畳み込みを行う", "バッチごとに異なるフィルタを適用する"],
            answer: 0,
            explanation: "元々はGPUメモリの制約で分割したのが始まりですが、パラメータ削減と性能向上の効果があることが分かりました。"
        },
        {
            category: "受容野の計算(応用)",
            question: "$3 \\times 3$ の畳み込み層（ストライド1）を2層重ねたとき、最終的な出力から見た入力画像の受容野のサイズはいくつになるか。",
            options: ["$5 \\times 5$", "$3 \\times 3$", "$6 \\times 6$", "$9 \\times 9$"],
            answer: 0,
            explanation: " 1層目で3x3、2層目でさらに周囲に+1ずつ広がるため、$3+2=5$ になります。（$5 \\times 5$ の畳み込み1回と同じ受容野）"
        },
        {
            category: "プーリングの欠点(応用)",
            question: "Capsule Networkなどが指摘した、Max Poolingの欠点（失われる情報）とは何か。",
            options: ["特徴同士の相対的な位置関係（空間的配置）の情報が失われる", "色が失われる", "計算コストが高すぎる", "過学習しやすくなる"],
            answer: 0,
            explanation: "「目」と「口」があることは分かっても、その位置関係（顔として正しいか）まではプーリングによって曖昧になってしまう、という指摘です。"
        },
        {
            category: "im2colの欠点(応用)",
            question: "im2colを用いた畳み込み計算のデメリットは何か。",
            options: ["展開後の行列サイズが大きくなり、メモリ消費量が増える", "計算速度が遅くなる", "GPUで計算できない", "精度が下がる"],
            answer: 0,
            explanation: "画像を重複部分も含めて展開するため、元の画像よりもデータ量が数倍〜数十倍に膨れ上がり、メモリを圧迫します。"
        },
        {
            category: "チャンネルの意味(応用)",
            question: "CNNの中間層において、「チャンネル数」が増えていくことは何を意味していると解釈できるか。",
            options: ["抽出される特徴の種類（エッジ、テクスチャ、パーツなど）が増えていく", "画像の解像度が上がっていく", "色の情報が増えていく", "ノイズが増えていく"],
            answer: 0,
            explanation: "各チャンネル（特徴マップ）は、特定のパターン（横線、丸、顔など）に反応するフィルタの結果を表しています。"
        },
        {
            id: "cnn-convolution-value-calc",
            category: "畳み込み・積和演算（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "入力パッチ $\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$ とカーネル $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ の積和を求める。バイアスは0とする。",
            options: ["$-4$", "$-3$", "$3$", "$4$"],
            answer: 1,
            explanation: "同じ位置を掛けて足します。$1\\times1+2\\times0+3\\times0+4\\times(-1)=1-4=-3$ です。"
        },
        {
            id: "cnn-output-floor-calc",
            category: "出力サイズ・切り捨て（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "入力サイズ $H=8$、カーネル $K=3$、パディング $P=0$、ストライド $S=2$ の出力サイズはいくつか。",
            options: ["2", "4", "3", "5"],
            answer: 2,
            explanation: "$\\left\\lfloor(8-3)/2\\right\\rfloor+1=\\lfloor2.5\\rfloor+1=3$。割り切れない端は切り捨てます。"
        },
        {
            id: "cnn-dilation-effective-kernel",
            category: "Dilated Conv・実効カーネル（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "カーネルサイズ $K=3$、dilation $D=2$ の実効カーネルサイズ $K_{eff}=D(K-1)+1$ はいくつか。",
            options: ["2", "3", "4", "5"],
            answer: 3,
            explanation: "$2(3-1)+1=5$。重みは3×3のままですが、入力上では5×5の範囲を見ます。"
        },
        {
            id: "cnn-output-shape-calc",
            category: "出力テンソル形状（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "入力 $28\\times28\\times3$ に、$5\\times5$、$P=0,S=1$ のフィルタを16個適用する。出力形状はどれか。",
            options: ["$24\\times24\\times16$", "$24\\times24\\times3$", "$28\\times28\\times16$", "$16\\times16\\times24$"],
            answer: 0,
            explanation: "空間は $(28-5)+1=24$。出力チャネル数はフィルタ数16なので $24\\times24\\times16$ です。"
        },
        {
            id: "cnn-parameter-with-bias",
            category: "パラメータ数・バイアス込み（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$3\\times3$ 畳み込みで $C_{in}=3,C_{out}=8$。出力チャネルごとにバイアス1個を持つとき、総パラメータ数はいくつか。",
            options: ["216", "224", "72", "232"],
            answer: 1,
            explanation: "重みは $3\\times3\\times3\\times8=216$、バイアスは8個。合計 $216+8=224$ です。"
        },
        {
            id: "cnn-pointwise-parameter-calc",
            category: "1×1畳み込み（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "1×1畳み込みで $C_{in}=64,C_{out}=32$。バイアスを無視したパラメータ数はいくつか。",
            options: ["96", "1,024", "2,048", "4,096"],
            answer: 2,
            explanation: "$1\\times1\\times64\\times32=2,048$。空間方向ではなくチャネル方向を混ぜます。"
        },
        {
            id: "cnn-depthwise-parameter-calc",
            category: "Depthwise Conv（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$3\\times3$ Depthwise Convolutionで入力チャネル数が32、depth multiplierが1のとき、バイアスを除く重み数はいくつか。",
            options: ["32", "96", "1,024", "288"],
            answer: 3,
            explanation: "各入力チャネルに3×3カーネルを1個ずつ持つので $3\\times3\\times32=288$ です。"
        },
        {
            id: "cnn-depthwise-separable-reduction",
            category: "Depthwise Separable Conv（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "$K=3,C_{in}=32,C_{out}=64$。通常畳み込みとDepthwise Separable Convolutionの重み数の組合せはどれか。バイアスは無視する。",
            options: ["通常18,432、分離2,336", "通常2,336、分離18,432", "どちらも18,432", "通常2,048、分離288"],
            answer: 0,
            explanation: "通常は $9\\times32\\times64=18,432$。分離はDepthwise $9\\times32=288$ とPointwise $32\\times64=2,048$ の合計2,336です。"
        },
        {
            id: "cnn-group-conv-parameter",
            category: "Grouped Conv（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "$3\\times3,C_{in}=64,C_{out}=128$ のGrouped Convolutionでグループ数 $G=8$。バイアスを除く重み数はいくつか。",
            options: ["73,728", "9,216", "8,192", "576"],
            answer: 1,
            explanation: "通常畳み込みの重み数をグループ数で割り、$3\\times3\\times64\\times128/8=9,216$ です。"
        },
        {
            id: "cnn-max-pooling-calc",
            category: "Max Pooling（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "領域 $\\begin{bmatrix}1&5\\\\3&2\\end{bmatrix}$ にMax Poolingを適用した出力はどれか。",
            options: ["1", "3", "5", "11"],
            answer: 2,
            explanation: "領域内の最大値を選ぶため5です。掛け算や平均は行いません。"
        },
        {
            id: "cnn-lp-pooling-limit",
            category: "Lp Pooling",
            difficulty: "標準",
            question: "Lp Poolingの $p$ を非常に大きくしたとき、どのPoolingに近づくか。",
            options: ["Average Pooling", "Global Average Pooling", "Min Pooling", "Max Pooling"],
            answer: 3,
            explanation: "$p$ が大きいほど大きな絶対値の影響が支配的になり、$p\\to\\infty$ でMax Poolingに近づきます。"
        },
        {
            id: "cnn-gap-output-shape",
            category: "Global Average Pooling（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$7\\times7\\times256$ の特徴マップにGlobal Average Poolingを適用した出力形状はどれか。",
            options: ["$1\\times1\\times256$", "$7\\times7\\times1$", "$1\\times1\\times1$", "$256\\times256\\times1$"],
            answer: 0,
            explanation: "各チャネルの7×7を1つの平均値へまとめるため、チャネル数を保った $1\\times1\\times256$ になります。"
        },
        {
            id: "cnn-receptive-field-stride",
            category: "受容野とstride（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "受容野1から開始し、$3\\times3$ Conv（S=1）→$2\\times2$ Pool（S=2）→$3\\times3$ Conv（S=1）を通る。最終受容野の一辺はいくつか。",
            options: ["6", "8", "9", "10"],
            answer: 1,
            explanation: "受容野 $r$ と入力上の間隔 $j$ を使います。開始 $(r,j)=(1,1)$ → Conv $(3,1)$ → Pool $(4,2)$ → Conv $(8,2)$ です。"
        },
        {
            id: "cnn-equivariance-invariance",
            category: "移動等変性と不変性",
            difficulty: "応用",
            question: "畳み込みとPoolingの位置ずれに対する性質として最も適切なものはどれか。",
            options: ["畳み込みもPoolingも完全に不変", "畳み込みは位置情報を全て消す", "畳み込みは移動等変性を持ち、Poolingは局所的な移動不変性を強める", "Poolingは位置ずれを増幅する"],
            answer: 2,
            explanation: "入力が移動すると特徴マップの反応位置も移動するのが等変性です。Poolingは近傍をまとめ、小さな位置ずれの影響を弱めます。"
        },
        {
            id: "cnn-im2col-shape",
            category: "im2col・行列形状（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "1チャネルの $5\\times5$ 入力へ、$3\\times3,P=0,S=1$ のim2colを行う。1行を1パッチとすると行列形状はどれか。",
            options: ["$5\\times5$", "$3\\times3$", "$25\\times9$", "$9\\times9$"],
            answer: 3,
            explanation: "出力位置は $3\\times3=9$ 個なので9行。各パッチは $3\\times3=9$ 要素なので9列です。"
        },
        {
            id: "cnn-multi-channel-convolution",
            category: "複数入力チャネル",
            difficulty: "標準",
            question: "通常の畳み込みで1枚の出力特徴マップを作るとき、複数の入力チャネルはどう扱われるか。",
            options: ["各入力チャネルとの畳み込み結果を足し合わせ、必要ならバイアスを加える", "入力チャネルを1つだけ選ぶ", "入力チャネル数だけ空間サイズを広げる", "チャネルごとの結果を必ず別出力にする"],
            answer: 0,
            explanation: "1つのフィルタは全入力チャネル分の厚みを持ちます。各チャネルの積和結果を合計して1枚の特徴マップを作ります。"
        },
        {
            id: "cnn-transposed-convolution",
            category: "Transposed Convolution",
            difficulty: "標準",
            question: "Transposed Convolutionの説明として正しいものはどれか。",
            options: ["元画像を完全に復元する厳密な逆演算", "学習可能なアップサンプリングであり、通常の畳み込みの厳密な逆演算ではない", "必ず空間サイズを半分にする", "学習パラメータを持たない"],
            answer: 1,
            explanation: "畳み込みを行列とみなしたときの転置に対応する演算です。解像度を上げられますが、失われた情報を必ず復元できるわけではありません。"
        },
        {
            id: "cnn-same-padding",
            category: "Same Padding（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "奇数カーネル $K=5$、stride $S=1$ で空間サイズを保つSame Paddingの片側パディング $P$ はいくつか。",
            options: ["0", "1", "2", "4"],
            answer: 2,
            explanation: "$P=(K-1)/2=(5-1)/2=2$。上下左右へ2ピクセルずつ追加します。"
        },
        {
            id: "cnn-pooling-parameters",
            category: "Pooling・パラメータ数",
            difficulty: "標準",
            question: "一般的なMax Pooling層が持つ学習パラメータ数はいくつか。",
            options: ["カーネル面積と同じ", "入力チャネル数と同じ", "出力チャネル数と同じ", "0"],
            answer: 3,
            explanation: "Max Poolingは決められた領域から最大値を選ぶ処理であり、学習する重みやバイアスを持ちません。"
        },
        {
            id: "cnn-nchw-output-shape",
            category: "NCHW形状（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "NCHW形式で入力が $(8,3,32,32)$。$3\\times3,P=1,S=1,C_{out}=16$ の畳み込み後の形状はどれか。",
            options: ["$(8,16,32,32)$", "$(8,3,30,30)$", "$(16,8,32,32)$", "$(8,32,32,16)$"],
            answer: 0,
            explanation: "バッチ数8は不変、出力チャネルは16、Same Paddingで高さと幅は32のままです。NCHW順なので $(8,16,32,32)$ です。"
        }
    ]
};
