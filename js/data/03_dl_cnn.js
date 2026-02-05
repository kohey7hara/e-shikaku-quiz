window.quizData = {
    title: "3-（４）CNN：畳み込みニューラルネットワーク",
    
    cheatSheet: `
        <h3>■ 【絶対暗記】出力サイズの計算公式</h3>
        <p>入力サイズ $H$, フィルタサイズ $K$, パディング $P$, ストライド $S$ のとき、出力サイズ $H'$ は：</p>
        <div style="background:#eef; padding:10px; border-radius:5px; text-align:center; font-weight:bold;">
            $$H' = \\frac{H + 2P - K}{S} + 1$$
        </div>
        <p>※割り切れない場合は切り捨て（フレームワークによるが試験では割り切れることが多い）。</p>

        <h3>■ CNNの構成要素</h3>
        <table>
            <tr><th>用語</th><th>役割・特徴</th></tr>
            <tr><td><strong>畳み込み層</strong> (Conv)</td><td>フィルタ（カーネル）を使って局所的な特徴を抽出する。<br><strong>重み共有</strong>によりパラメータ数を削減。</td></tr>
            <tr><td><strong>プーリング層</strong> (Pooling)</td><td>画像を縮小して、位置ズレに対する<strong>不変性</strong>（ロバスト性）を高める。<br>学習パラメータはない。Max Poolingが主流。</td></tr>
            <tr><td><strong>全結合層</strong> (FC)</td><td>最後に特徴をまとめてクラス分類を行う。<br>最近はGAP (Global Average Pooling) に置き換わることも多い。</td></tr>
        </table>

        <h3>■ 特殊な畳み込み</h3>
        <ul>
            <li><strong>1x1畳み込み (Pointwise)</strong>: チャンネル数の調整（圧縮・拡張）に使用。計算量削減に効く。</li>
            <li><strong>Depthwise畳み込み</strong>: チャンネルごとに独立して畳み込む。</li>
            <li><strong>逆畳み込み (Transposed Conv)</strong>: 解像度を上げる（アップサンプリング）。</li>
            <li><strong>im2col</strong>: 畳み込みを行列演算に変換して高速化するアルゴリズム。</li>
        </ul>
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
            explanation: "「重み共有」によるパラメータ削減と、「局所受容野」による空間構造の維持がCNNの強みです。"
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
            explanation: "GoogleLeNet (Inception) などで採用。空間方向のサイズは変えずに、チャンネル方向の次元圧縮を行い、計算コストを劇的に下げます。"
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
            explanation: "特徴マップ1枚につき1つの値を出力します。パラメータ数が0になるため、過学習を防ぐ効果があります（CAMなどでも利用）。"
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
        }
    ]
};
