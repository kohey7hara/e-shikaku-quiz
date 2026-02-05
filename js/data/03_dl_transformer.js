window.quizData = {
    title: "3-（６）Transformer",
    
    cheatSheet: `
        <h3>■ Scaled Dot-Product Attention（絶対暗記）</h3>
        <p>Transformerの核となる計算式です。</p>
        <div style="background:#eef; padding:10px; border-radius:5px; text-align:center; font-weight:bold;">
            $$Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
        </div>
        <ul>
            <li><strong>Q (Query)</strong>: 検索したい情報（検索クエリ）。</li>
            <li><strong>K (Key)</strong>: 検索対象の見出し（インデックス）。</li>
            <li><strong>V (Value)</strong>: 取り出したい中身（コンテンツ）。</li>
            <li><strong>$\\sqrt{d_k}$</strong>: スケーリング係数。内積が大きくなりすぎて勾配消失するのを防ぐ。</li>
        </ul>

        <h3>■ Attentionの種類</h3>
        <table>
            <tr><th>種類</th><th>Q, K, Vの出処</th><th>役割</th></tr>
            <tr><td><strong>Self-Attention</strong></td><td>全て<strong>同じ層</strong>の出力<br>($Q=K=V$)</td><td>文中の単語間の関係性（係り受けなど）を学習する。</td></tr>
            <tr><td><strong>Source-Target Attention</strong><br>(Cross Attention)</td><td>Q: <strong>デコーダ</strong><br>K, V: <strong>エンコーダ</strong></td><td>翻訳などで、入力文（エンコーダ）のどの情報を翻訳に使うかを見る。</td></tr>
            <tr><td><strong>Masked Attention</strong></td><td>Self-Attentionと同じ<br>ただし未来を隠す</td><td>デコーダ学習時に、<strong>カンニング（未来の単語を見る）</strong>を防ぐ。</td></tr>
        </table>

        <h3>■ その他の構成要素</h3>
        <ul>
            <li><strong>Multi-Head Attention</strong>: Attentionを複数並列に行い、異なる種類の関連性（文法、意味など）を同時に捉える。</li>
            <li><strong>Positional Encoding</strong>: RNNと違い順序情報がないため、位置情報を足し算で埋め込む。</li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "基本構造",
            question: "Transformerの画期的な特徴であり、RNNを使わずに系列データを処理できるようになった要因は何か。",
            options: ["Attention機構のみを用いた（Attention is All You Need）", "CNNを多層化した", "強化学習を取り入れた", "メモリセルを増やした"],
            answer: 0,
            explanation: "再帰結合（RNN）や畳み込み（CNN）を使わず、Attentionのみで文脈を捉えるアーキテクチャを提案し、並列計算を可能にしました。"
        },
        {
            category: "Scaled Dot-Product Attention",
            question: "Transformerで用いられるAttentionの計算式として正しいものはどれか。",
            options: ["$\\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V$", "$\\text{softmax}(QK^T)V$", "$\\tanh(\\frac{QK^T}{\\sqrt{d_k}})V$", "$\\frac{QV^T}{\\sqrt{d_k}}K$"],
            answer: 0,
            explanation: "QueryとKeyの内積を取り、スケーリングしてSoftmaxで確率化し、それを重みとしてValueを足し合わせます。"
        },
        {
            category: "Positional Encoding",
            question: "Transformerにおいて「Positional Encoding（位置エンコーディング）」が必要な理由は何か。",
            options: ["Transformerの構造自体には、単語の「順序」を認識する仕組みがないため", "単語の意味をベクトル化するため", "計算速度を上げるため", "過学習を防ぐため"],
            answer: 0,
            explanation: "Attentionは「どの単語と関連があるか」は見ますが、「隣にあるか」などの位置情報は無視します（順列不変）。そのため、位置情報を別途足し合わせる必要があります。"
        },
        {
            category: "Self-Attention",
            question: "「Self-Attention（自己注意機構）」において、Query(Q), Key(K), Value(V) はどこから来るか。",
            options: ["全て同じ入力（前の層の出力）から生成される", "Qはデコーダ、KとVはエンコーダから来る", "QとKは入力、Vは外部メモリから来る", "全てランダムに生成される"],
            answer: 0,
            explanation: "自分自身の入力 $X$ に対して、重み $W^Q, W^K, W^V$ を掛けて $Q, K, V$ を作ります。つまり「自分自身の中での関係性」を見ます。"
        },
        {
            category: "Source-Target Attention",
            question: "Seq2Seqモデルのデコーダ側にある「Source-Target Attention（またはEncoder-Decoder Attention）」において、Query(Q)はどこから来るか。",
            options: ["デコーダ（自分自身）の前の層", "エンコーダの出力", "Positional Encoding", "外部データベース"],
            answer: 0,
            explanation: "「翻訳したい内容（デコーダのQ）」を使って、「原文（エンコーダのK, V）」から情報を検索する、という構造です。"
        },
        {
            category: "Multi-Head Attention",
            question: "「Multi-Head Attention」を採用する（Attentionを複数並列にする）主な利点は何か。",
            options: ["異なる部分空間（意味、文法、共起など）の異なる関係性を同時に学習できる", "計算量が削減できる", "パラメータ数が減る", "層を深くしなくて済む"],
            answer: 0,
            explanation: "1つのAttention（シングルヘッド）だと1種類の関係しか見れませんが、ヘッドを増やすことで「誰が」や「いつ」など複数の視点を同時に持てます。"
        },
        {
            category: "Masked Attention",
            question: "デコーダ側のSelf-Attentionにおいて、未来の単語（まだ生成していない単語）を参照できないようにする処理を何と呼ぶか。",
            options: ["Masking (Masked Attention)", "Padding", "Clipping", "Dropout"],
            answer: 0,
            explanation: "学習時は正解文が全て見えていますが、予測時には未来の単語は見えないはずです。カンニングを防ぐために、未来のスコアを $-\\infty$ にしてSoftmax結果を0にします。"
        },
        {
            category: "Feed Forward Network",
            question: "Transformerの各層に含まれる「Position-wise Feed-Forward Networks」は、どのような構造か。",
            options: ["各単語（位置）ごとに独立して適用される、2層の全結合ネットワーク", "全単語を結合するリカレントネットワーク", "畳み込みニューラルネットワーク", "ルックアップテーブル"],
            answer: 0,
            explanation: "Attentionで集めた情報を、各単語ごとに個別に変換する層です。単語間の相互作用はAttentionで行い、情報の加工はここで行います。"
        },
        {
            category: "残差接続",
            question: "Transformerの各サブレイヤー（AttentionやFFN）の出力で行われる「Add & Norm」の「Add」は何を指すか。",
            options: ["残差接続（Residual Connection）：入力 $x$ を出力に足す", "バイアス項の加算", "次の層への加算", "位置情報の加算"],
            answer: 0,
            explanation: "ResNetと同様に、勾配消失を防ぎ学習を安定させるために、入力をそのまま出力に足し合わせます。"
        },
        {
            category: "Layer Normalization",
            question: "Transformerで採用されている正規化手法は「Batch Normalization」ではなく何か。",
            options: ["Layer Normalization", "Instance Normalization", "Group Normalization", "Weight Normalization"],
            answer: 0,
            explanation: "NLPでは文の長さ（バッチ内のパディング量）がバラバラなため、バッチ単位で統計をとるBatch Normよりも、個々のデータ内で正規化するLayer Normが適しています。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "スケーリング係数(応用)",
            question: "Scaled Dot-Product Attentionにおいて、内積 $QK^T$ を $\\sqrt{d_k}$ で割る（スケーリングする）数学的な理由は何か。",
            options: ["次元数 $d_k$ が大きくなると内積の値が大きくなりすぎ、Softmaxの勾配が極端に小さくなる（勾配消失）のを防ぐため", "計算速度を速めるため", "値を0〜1の範囲に収めるため", "KeyとQueryの次元を合わせるため"],
            answer: 0,
            explanation: "内積の分散は次元数 $d_k$ に比例して大きくなります。値が大きいとSoftmax関数の端（勾配がほぼ0の部分）に行ってしまい、学習が進まなくなります。"
        },
        {
            category: "計算量比較(応用)",
            question: "系列長を $n$、埋め込み次元を $d$ としたとき、Self-Attention層の計算量はオーダー表記でどうなるか。（$d$は$n$より小さいとする）",
            options: ["$O(n^2 \\cdot d)$", "$O(n \\cdot d^2)$", "$O(n)$", "$O(\\log n)$"],
            answer: 0,
            explanation: "全ての単語対（$n \\times n$）について内積計算を行うため、系列長 $n$ の二乗に比例します。これが非常に長い文章でTransformerが重くなる理由です。"
        },
        {
            category: "RNNとの比較(応用)",
            question: "RNNと比較した際の、Transformerの最大のメリット（学習時）は何か。",
            options: ["再帰的な計算がないため、系列全体を一括で並列計算できる（高速化）", "パラメータ数が圧倒的に少ない", "メモリ使用量が少ない", "短い文章の精度が高い"],
            answer: 0,
            explanation: "RNNは前の単語の計算が終わらないと次に行けませんが、TransformerはAttention行列を一発で計算できるため、GPUの並列性能をフルに活かせます。"
        },
        {
            category: "長距離依存性(応用)",
            question: "TransformerがRNNよりも「長距離の依存関係（離れた単語同士の関係）」を捉えやすい理由は何か。",
            options: ["Attentionにより、どんなに離れた単語でもパスの長さ（距離）が常に「1」だから", "記憶セル（Memory Cell）の容量が大きいから", "逆伝播の回数が多いから", "Positional Encodingがあるから"],
            answer: 0,
            explanation: "RNNではステップ数分のホップが必要ですが、Attentionは全単語に直接アクセスできるため、距離に関係なく情報を取得できます（Path Length = $O(1)$）。"
        },
        {
            category: "Positional Encoding(応用)",
            question: "オリジナルのTransformer論文で採用されたPositional Encodingは、どのような関数を用いているか。",
            options: ["正弦波（sin）と余弦波（cos）の組み合わせ", "学習可能なパラメータ（Embedding層）", "0から1への線形増加", "乱数"],
            answer: 0,
            explanation: "学習不要な固定の関数（周期の異なるsin/cos）を使っています。これにより、学習時より長い文章が来てもある程度対応できるとされています（BERTなどは学習可能パラメータを使います）。"
        },
        {
            category: "Source-Target Attention(応用)",
            question: "Source-Target Attentionにおいて、Query(Q)の次元数を $d_q$、Key(K)の次元数を $d_k$ としたとき、計算可能であるための条件は何か。",
            options: ["$d_q = d_k$ （内積をとるため次元が一致している必要がある）", "$d_q > d_k$", "$d_q < d_k$", "特に制約はない"],
            answer: 0,
            explanation: "Attentionスコアは $Q$ と $K$ の内積（ドット積）で計算するため、この2つのベクトルの次元数は一致していなければなりません。"
        },
        {
            category: "BERTのAttention(応用)",
            question: "BERT（Encoderのみのモデル）が「双方向（Bidirectional）」の文脈を学習できるのは、Transformerのどの機能のおかげか。",
            options: ["Maskedではない通常のSelf-Attentionを使っているため（全単語がお互いを参照できる）", "Masked Attentionを使っているため", "Source-Target Attentionを使っているため", "RNNを使っているため"],
            answer: 0,
            explanation: "GPTなどは未来を隠すMasked Attentionを使いますが、BERTは穴埋め問題（MLM）を解くため、マスクなしのSelf-Attentionで前後の文脈を同時に見ることができます。"
        },
        {
            category: "Transformerの弱点(応用)",
            question: "Transformer（特に初期のモデル）の弱点として挙げられるものはどれか。",
            options: ["系列長 $n$ に対して計算量とメモリが二乗（$O(n^2)$）で増えるため、極端に長い文章を扱いにくい", "並列計算ができない", "短い文章の精度がRNNより低い", "勾配消失が起きやすい"],
            answer: 0,
            explanation: "この $O(n^2)$ 問題を解決するために、後にSparse AttentionやReformer、Linformerなどの「効率的Transformer（X-formers）」が多数提案されています。"
        },
        {
            category: "学習率のスケジューリング(応用)",
            question: "Transformerの学習において推奨される、学習率を「最初は徐々に上げ、その後徐々に下げる」スケジューリング手法を何と呼ぶか。",
            options: ["Warmup (Warmup Steps)", "Step Decay", "Cosine Annealing", "Early Stopping"],
            answer: 0,
            explanation: "学習初期は勾配が不安定なため、小さな学習率から始めて徐々に本来の学習率まで上げていく「Warmup」が、Transformerの学習安定化には不可欠です。"
        },
        {
            category: "FFNの次元(応用)",
            question: "TransformerのFeed-Forward Networkにおける中間層の次元数（$d_{ff}$）は、埋め込み次元（$d_{model}$）と比べて通常どう設定されるか。",
            options: ["埋め込み次元よりも大きく設定される（例：4倍）", "埋め込み次元と同じ", "埋め込み次元よりも小さく設定される（ボトルネック）", "ランダムに設定される"],
            answer: 0,
            explanation: "論文（Baseモデル）では $d_{model}=512$ に対し、$d_{ff}=2048$ と4倍に拡大しています。一度高次元に写像してから元に戻すことで表現力を高めています。"
        }
    ]
};
