window.quizData = {
    title: "3-（６）Transformer：Attention機構",
    
    cheatSheet: `
        <style>
            .concept-container { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px; }
            .concept-box { border: 1px solid #ccc; border-radius: 8px; padding: 10px; width: 45%; min-width: 300px; background: #fff; }
            .flow-vertical { display: flex; flex-direction: column; align-items: center; gap: 5px; }
            .step-box { border: 2px solid #333; padding: 8px; border-radius: 5px; background: #fff; width: 80%; text-align: center; font-size: 0.85em; position: relative; }
            .arrow-down { color: #555; font-weight: bold; }
            
            /* 色分け */
            .bg-q { background-color: #fceceb; border-color: #e74c3c; color: #c0392b; }
            .bg-k { background-color: #ebf5fb; border-color: #3498db; color: #2980b9; }
            .bg-v { background-color: #eafaf1; border-color: #27ae60; color: #27ae60; }
            .bg-attn { background-color: #f9e79f; border-color: #f1c40f; }
            
            .calc-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; text-align: center; font-size: 0.8em; margin: 10px 0; }
            .qkv-label { font-weight: bold; padding: 5px; border-radius: 4px; }
            
            .analogy-table { width: 100%; border-collapse: collapse; font-size: 0.9em; margin-top: 10px; }
            .analogy-table th { background: #eee; padding: 5px; border: 1px solid #ccc; }
            .analogy-table td { padding: 5px; border: 1px solid #ccc; }
        </style>

        <h3>■ Transformerとは？（RNNとの違い）</h3>
        <p>「Attention（注意機構）だけで十分だ」という論文 (Attention Is All You Need) から生まれました。</p>
        <div class="concept-container">
            <div class="concept-box">
                <strong>従来のRNN / LSTM</strong><br>
                <div style="margin-top:5px; text-align:center;">
                    [I] → [love] → [AI]<br>
                    <span style="color:red; font-size:0.8em;">順番に計算（遅い・忘れる）</span>
                </div>
                <ul>
                    <li>単語を<strong>1つずつ</strong>処理する。</li>
                    <li>長文になると過去を忘れる。</li>
                    <li>並列計算ができない（GPU活用度低）。</li>
                </ul>
            </div>
            <div class="concept-box" style="border: 2px solid #3498db;">
                <strong>Transformer</strong><br>
                <div style="margin-top:5px; text-align:center;">
                    [I, love, AI] (一括入力)<br>
                    <span style="color:blue; font-size:0.8em;">並列計算（速い・全部見る）</span>
                </div>
                <ul>
                    <li>文章全体を<strong>一度に</strong>処理する。</li>
                    <li>離れた単語の関係も一瞬で捉える。</li>
                    <li><strong>並列計算</strong>が得意（高速）。</li>
                </ul>
            </div>
        </div>

        <h3>■ Attention (Q, K, V) の直感的イメージ</h3>
        <p>「検索エンジン」や「辞書」に例えられます。</p>
        
        <div class="calc-grid">
            <div class="qkv-label bg-q">Query (Q)<br>「検索ワード」</div>
            <div class="qkv-label bg-k">Key (K)<br>「見出し・タグ」</div>
            <div class="qkv-label bg-v">Value (V)<br>「本文・中身」</div>
        </div>

        <table class="analogy-table">
            <tr><th>項目</th><th>役割</th><th>図書館での例え</th></tr>
            <tr>
                <td><strong>Query</strong></td>
                <td>知りたい情報（起点）。</td>
                <td>「AIの歴史を知りたい」（検索者の意図）</td>
            </tr>
            <tr>
                <td><strong>Key</strong></td>
                <td>検索対象との関連度を測るための指標。</td>
                <td>本の「タイトル」や「背表紙」</td>
            </tr>
            <tr>
                <td><strong>Value</strong></td>
                <td>最終的に取り出す情報。</td>
                <td>本の「中身（文章）」</td>
            </tr>
        </table>
        <p style="font-size:0.8em; margin-top:5px;">
            ※ $Q$ と $K$ の類似度（内積）を計算し、その類似度に応じて $V$ を混ぜ合わせます。<br>
            <strong>「関連する $V$ だけを強く取り込む」</strong> 仕組みです。
        </p>

        <h3>■ Scaled Dot-Product Attention（絶対暗記）</h3>
        <div style="background:#eef; padding:10px; border-radius:5px; text-align:center; font-weight:bold; margin-bottom:10px;">
            $$Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
        </div>
        
        <div class="flow-vertical" style="background:#f9f9f9; padding:10px; border-radius:8px;">
            <div class="step-box">
                <strong>Step 1: 類似度計算</strong><br>
                $QK^T$ (内積)<br>
                <small>クエリとキーが似ているか？</small>
            </div>
            <div class="arrow-down">↓</div>
            <div class="step-box">
                <strong>Step 2: スケーリング</strong><br>
                $\\div \\sqrt{d_k}$<br>
                <small>値が大きくなりすぎるのを防ぐ<br>(勾配消失対策)</small>
            </div>
            <div class="arrow-down">↓</div>
            <div class="step-box">
                <strong>Step 3: 確率化 (重み付け)</strong><br>
                softmax<br>
                <small>合計1.0にする</small>
            </div>
            <div class="arrow-down">↓</div>
            <div class="step-box bg-attn">
                <strong>Step 4: 値の取得</strong><br>
                $\\times V$<br>
                <small>重みに応じてValueを合成</small>
            </div>
        </div>

        <h3>■ その他の重要構成要素</h3>
        <ul>
            <li><strong>Multi-Head Attention</strong>: Attentionを8個など並列に行う。「文法」「意味」「文脈」など異なる視点の情報を同時に捉えるため。</li>
            <li><strong>Positional Encoding</strong>: Transformerは順序という概念がないため、「位置情報（1番目、2番目...）」をベクトルに足し算して教える。</li>
            <li><strong>Position-wise FFN</strong>: 各位置ごとに独立して行われる全結合層。</li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "Attentionの数式",
            question: "Scaled Dot-Product Attentionの数式 $Attention(Q, K, V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V$ において、分母の $\\sqrt{d_k}$ は何のためにあるか。",
            options: ["内積の値が大きくなりすぎて、Softmaxの勾配が消失するのを防ぐため", "計算速度を上げるため", "次元数を減らすため", "負の値にならないようにするため"],
            answer: 0,
            explanation: "次元数 $d_k$ が大きいと内積の和が大きくなり、Softmax関数の端（勾配がほぼ0の部分）に行ってしまうのを防ぐスケーリング係数です。"
        },
        {
            category: "Q, K, V",
            question: "Attention機構における $Q, K, V$ の名称として正しい組み合わせはどれか。",
            options: ["Query, Key, Value", "Question, Keyword, Vector", "Queue, Kernel, Volume", "Quantization, Knowledge, Verification"],
            answer: 0,
            explanation: "検索システム（QueryでKeyを探し、Valueを取り出す）のアナロジーから来ています。"
        },
        {
            category: "Positional Encoding",
            question: "Transformerにおいて「Positional Encoding（位置エンコーディング）」が必要な理由は何か。",
            options: ["Transformerの構造自体には再帰（RNN）も畳み込み（CNN）もなく、単語の「順序情報」を認識できないため", "単語の意味を強調するため", "計算量を減らすため", "過学習を防ぐため"],
            answer: 0,
            explanation: "Attentionは「どの単語とどの単語が関連しているか」を見ますが、「どちらが前か」は分かりません。そのため、位置情報を入力に足し合わせます。"
        },
        {
            category: "Multi-Head Attention",
            question: "「Multi-Head Attention」を採用する（Attentionを複数並列に行う）主な利点は何か。",
            options: ["異なる部分空間（視点）の特徴を同時に学習できる（例：あるヘッドは文法を、別のヘッドは意味関係を見るなど）", "計算が1回で済むので速い", "パラメータ数が減る", "長期記憶が保持できる"],
            answer: 0,
            explanation: "1つのAttentionだけでは捉えきれない、複数の異なる関係性を同時に捉えることができます（アンサンブルのような効果）。"
        },
        {
            category: "Self-Attention",
            question: "「Self-Attention（自己注意機構）」の特徴として正しいものはどれか。",
            options: ["$Q, K, V$ の全てが「同じ入力元（同じ層の出力）」から作られる", "$Q$ はDecoder、$K, V$ はEncoderから来る", "自分自身の未来の情報だけを見る", "ランダムに注意を向ける"],
            answer: 0,
            explanation: "自分（入力文）の中での単語間の係り受け（例えば代名詞が何を指すかなど）を学習します。"
        },
        {
            category: "論文",
            question: "Transformerが提案された、Googleによる2017年の有名な論文のタイトルは何か。",
            options: ["Attention Is All You Need", "Deep Residual Learning", "ImageNet Classification with Deep CNN", "Learning to Forget"],
            answer: 0,
            explanation: "「必要なのはAttentionだけ（RNNやCNNはいらない）」という衝撃的なタイトルで、その後のNLP界を塗り替えました。"
        },
        {
            category: "計算量",
            question: "系列長を $n$、埋め込み次元を $d$ としたとき、Self-Attentionの計算量はオーダーでどう表されるか。",
            options: ["$O(n^2 d)$", "$O(n d^2)$", "$O(n)$", "$O(n^3)$"],
            answer: 0,
            explanation: "全ての単語対（$n \\times n$）について類似度を計算するため、系列長 $n$ の二乗に比例します。そのため、極端に長い文章は苦手です。"
        },
        {
            category: "Masked Attention",
            question: "Decoder側で使われる「Masked Self-Attention」の役割は何か。",
            options: ["ある単語を予測する際に、「未来の単語」をカンニングできないように隠すこと", "重要でない単語を無視すること", "計算量を減らすこと", "パディング部分を無視すること"],
            answer: 0,
            explanation: "生成タスクでは、まだ生成していない「未来の単語」は見えてはいけません。マスク行列（下三角行列）を使って未来の注意スコアを $-\\infty$ にします。"
        },
        {
            category: "FFN",
            question: "Transformerの各層にある「Position-wise Feed-Forward Networks」は、どのような処理を行うか。",
            options: ["各位置（単語）ごとに独立して、同じパラメータの全結合層を適用する", "全単語をまとめて畳み込む", "時系列順に処理する", "入力と出力を逆転させる"],
            answer: 0,
            explanation: "Attentionで混ぜ合わされた情報を、単語ごとに個別に非線形変換します。構造は $ReLU(xW_1+b_1)W_2+b_2$ の2層MLPです。"
        },
        {
            category: "Source-Target Attention",
            question: "Encoder-Decoder型のTransformerにおいて、Decoderにある「Source-Target Attention（Cross Attention）」の $K$ と $V$ はどこから来るか。",
            options: ["Encoderの最終出力", "Decoderの一つ前の層", "入力埋め込み", "ランダムな値"],
            answer: 0,
            explanation: "Encoderが作った「入力文の情報」を、Decoderが検索（Query）して利用するためのAttentionです。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "Positional Encodingの式(応用)",
            question: "原論文におけるPositional Encodingでは、どのような関数を用いて位置情報を生成しているか。",
            options: ["サイン波 (sin) とコサイン波 (cos) の周期関数", "学習可能な埋め込み層 (Learnable Embedding)", "0から1までの線形増加", "正規分布乱数"],
            answer: 0,
            explanation: "異なる周波数のsin/cos関数を使うことで、相対的な位置関係をモデルが学習しやすくしています（※BERTなどでは学習可能パラメータを使うことも多い）。"
        },
        {
            category: "Layer Normalization(応用)",
            question: "TransformerではBatch Normalizationではなく「Layer Normalization」が使われる。Layer Normの特徴はどれか。",
            options: ["1つのサンプル内の全ニューロン（特徴量）で正規化を行い、バッチサイズに依存しない", "バッチ全体の平均を使う", "チャンネルごとに正規化する", "重みを正規化する"],
            answer: 0,
            explanation: "NLPでは文の長さがバラバラでバッチ統計量が不安定になりやすいため、サンプル単位で正規化するLayer Normが適しています。"
        },
        {
            category: "BERT vs GPT(応用)",
            question: "Transformerの構造において、BERTとGPTはそれぞれどの部分を使用しているか。",
            options: ["BERTはEncoderのみ、GPTはDecoderのみ", "BERTはDecoderのみ、GPTはEncoderのみ", "両方ともEncoder-Decoder", "両方ともEncoderのみ"],
            answer: 0,
            explanation: "BERTは文脈を双方向から読む理解タスク向け（Encoder）、GPTは次単語予測による生成タスク向け（Decoder）です。"
        },
        {
            category: "Residual Connection(応用)",
            question: "Transformerの各サブレイヤー（AttentionやFFN）の後には「Add & Norm」がある。「Add」が指すResidual Connection（残差結合）の主な効果は何か。",
            options: ["勾配消失を防ぎ、深い層まで学習を可能にする", "パラメータ数を増やす", "計算速度を上げる", "ノイズを除去する"],
            answer: 0,
            explanation: "ResNet由来の技術で、入力 $x$ を出力に足し合わせる（$F(x) + x$）ことで、勾配の高速道路を作り学習を安定させます。"
        },
        {
            category: "内積と類似度(応用)",
            question: "Attentionにおいて、QueryとKeyの「内積」をとる幾何学的な意味は何か。",
            options: ["2つのベクトルの向きがどれくらい似ているか（類似度）を測る", "2つのベクトルの距離を測る", "2つのベクトルの外積をとる", "ベクトルを回転させる"],
            answer: 0,
            explanation: "内積が大きい＝ベクトルの向きが揃っている＝関連度が高い、と解釈してAttentionスコアにします。"
        },
        {
            category: "Softmaxの役割(応用)",
            question: "Attentionスコアの計算でSoftmax関数を通す理由は何か。",
            options: ["スコアを確率分布（合計1.0、すべて正の値）に変換し、Valueの加重平均をとれるようにするため", "最大値だけを取り出すため", "計算を簡単にするため", "負の値を作るため"],
            answer: 0,
            explanation: "どこにどれくらい注目するかを「割合」で表現するためです。"
        },
        {
            category: "Warmup(応用)",
            question: "Transformerの学習時によく用いられる、学習率を初期は線形に上げ、その後減衰させるスケジューリングを何と呼ぶか。",
            options: ["Warmup", "Dropout", "Early Stopping", "Gradient Clipping"],
            answer: 0,
            explanation: "Transformerは初期の勾配が不安定なため、いきなり高い学習率で始めると発散しやすいです。徐々に上げるWarmupが必須テクニックです。"
        },
        {
            category: "CNNとの比較(応用)",
            question: "CNNと比較した際のTransformer（Self-Attention）の利点として、「大域的な情報の取得」という観点から正しい説明はどれか。",
            options: ["CNNは層を重ねないと遠くの情報を見れないが、Transformerは1層目から文中のあらゆる距離の単語関係を直接捉えられる", "Transformerは局所的な情報しか見れない", "CNNの方が長距離依存に強い", "どちらも同じ"],
            answer: 0,
            explanation: "Self-Attentionは全単語間のリンクを持つため、距離に関係なくパスの長さが1（直接参照）となり、長距離の依存関係を捉えやすいです。"
        },
        {
            category: "帰納的バイアス(応用)",
            question: "CNNやRNNと比較して、Transformerは「帰納的バイアス（Inductive Bias）」が弱いと言われる。これは何を意味するか。",
            options: ["画像や時間といったデータ構造への仮定（局所性や順序）がモデルに組み込まれておらず、大量のデータで学習しないとパターンを見つけにくい", "初期値に依存しやすい", "過学習しにくい", "バイアス項が存在しない"],
            answer: 0,
            explanation: "CNNは「隣同士は関係ある」、RNNは「時間は続く」という前提（バイアス）がありますが、Transformerにはそれがないため、柔軟ですが大量のデータが必要です。"
        },
        {
            category: "Label Smoothing(応用)",
            question: "Transformerの学習（翻訳タスクなど）で過学習を防ぐためによく使われる、正解ラベルの確率を1.0ではなく0.9などに下げる手法は何か。",
            options: ["Label Smoothing", "Dropout", "Batch Norm", "Weight Decay"],
            answer: 0,
            explanation: "「絶対にこれだ！」と確信しすぎるのを防ぎ、汎化性能を向上させるテクニックです。"
        }
    ]
};
