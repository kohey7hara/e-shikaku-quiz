window.quizData = {
    title: "4-（４）自然言語処理：Word2Vec, BERT, GPT",
    
    cheatSheet: `
        <style>
            .nlp-container { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px; }
            .nlp-box { border: 1px solid #ccc; border-radius: 8px; padding: 10px; width: 45%; min-width: 300px; background: #fff; }
            .nlp-title { font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 10px; display: inline-block; }
            
            .w2v-flow { display: flex; align-items: center; justify-content: center; font-size: 0.85em; gap: 5px; }
            .word-node { border: 1px solid #999; padding: 5px; border-radius: 4px; background: #eee; width: 60px; text-align: center; }
            .target-node { border: 2px solid #e74c3c; background: #fceceb; color: #c0392b; font-weight: bold; }
            .arrow-s { color: #555; font-weight: bold; }

            .model-struct { display: flex; justify-content: center; gap: 2px; margin-top: 5px; }
            .block { width: 30px; height: 30px; border: 1px solid #999; text-align: center; line-height: 30px; font-size: 0.8em; border-radius: 3px; background: #fff; }
            .mask { background: #333; color: #fff; }
            .arrow-bi { color: #3498db; font-weight: bold; font-size: 1.2em; }
            .arrow-uni { color: #e74c3c; font-weight: bold; font-size: 1.2em; }

            .comp-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .comp-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .comp-table td { border: 1px solid #ccc; padding: 5px; }
            .good { color: #27ae60; font-weight: bold; }
            .bad { color: #c0392b; font-weight: bold; }
        </style>

        <h3>■ 1. Word2Vec：単語の意味をベクトル化</h3>
        <p>「同じ文脈（周り）に現れる単語は似た意味を持つ」という<strong>分布仮説</strong>に基づきます。</p>
        <div class="nlp-container">
            <div class="nlp-box">
                <div class="nlp-title">CBOW</div>
                <p style="font-size:0.8em;">「周り」から「真ん中」を当てる</p>
                <div class="w2v-flow">
                    <div class="word-node">昨日</div>
                    <div class="word-node">食べた</div>
                    <div class="arrow-s">→</div>
                    <div class="word-node target-node">リンゴ</div>
                    <div class="arrow-s">←</div>
                    <div class="word-node">は</div>
                    <div class="word-node">美味</div>
                </div>
                <ul style="font-size:0.8em; margin-top:5px;">
                    <li><span class="good">強み</span>: 学習が速い。</li>
                    <li><span class="bad">弱み</span>: 頻出語になびきやすい。</li>
                </ul>
            </div>
            <div class="nlp-box">
                <div class="nlp-title">Skip-gram</div>
                <p style="font-size:0.8em;">「真ん中」から「周り」を当てる</p>
                <div class="w2v-flow">
                    <div class="word-node">?</div>
                    <div class="word-node">?</div>
                    <div class="arrow-s">←</div>
                    <div class="word-node target-node">リンゴ</div>
                    <div class="arrow-s">→</div>
                    <div class="word-node">?</div>
                    <div class="word-node">?</div>
                </div>
                <ul style="font-size:0.8em; margin-top:5px;">
                    <li><span class="good">強み</span>: <strong>レアな単語</strong>の精度が良い。</li>
                    <li><span class="bad">弱み</span>: 計算コストが高い。</li>
                </ul>
            </div>
        </div>

        <h3>■ 2. BERT vs GPT：Transformerの使い分け</h3>
        <p>同じTransformerベースですが、矢印の向き（見える範囲）が違います。</p>
        <div class="nlp-container">
            <div class="nlp-box" style="border-top: 3px solid #3498db;">
                <strong style="color:#3498db;">BERT (Encoder)</strong><br>
                <small>Bidirectional (双方向)</small>
                <div class="model-struct">
                    <div class="block">A</div>
                    <div class="arrow-bi">⇔</div>
                    <div class="block">B</div>
                    <div class="arrow-bi">⇔</div>
                    <div class="block mask">[M]</div>
                    <div class="arrow-bi">⇔</div>
                    <div class="block">D</div>
                </div>
                <p style="font-size:0.8em; margin-top:5px;">
                    文中の一部を隠して（Mask）、前後を見て穴埋めする。<br>
                    <strong>「文脈を読む」</strong>のが得意。
                </p>
            </div>
            <div class="nlp-box" style="border-top: 3px solid #e74c3c;">
                <strong style="color:#e74c3c;">GPT (Decoder)</strong><br>
                <small>Unidirectional (単方向)</small>
                <div class="model-struct">
                    <div class="block">A</div>
                    <div class="arrow-uni">→</div>
                    <div class="block">B</div>
                    <div class="arrow-uni">→</div>
                    <div class="block">C</div>
                    <div class="arrow-uni">→</div>
                    <div class="block mask">?</div>
                </div>
                <p style="font-size:0.8em; margin-top:5px;">
                    前の単語から次の単語を予測する。<br>
                    <strong>「文章を書く（生成）」</strong>のが得意。
                </p>
            </div>
        </div>

        <h3>■ モデル比較まとめ</h3>
        <table class="comp-table">
            <tr><th>項目</th><th>BERT</th><th>GPT</th></tr>
            <tr><td><strong>構造</strong></td><td><strong>Encoder</strong>のみ<br>(入力を理解する部分)</td><td><strong>Decoder</strong>のみ<br>(出力を生成する部分)</td></tr>
            <tr><td><strong>注意の向き</strong></td><td><strong>双方向</strong> (Bidirectional)<br>未来の単語も見れる</td><td><strong>単方向</strong> (Auto-regressive)<br>過去しか見れない</td></tr>
            <tr><td><strong>事前学習</strong></td><td><strong>MLM</strong> (穴埋め)<br><strong>NSP</strong> (次の文か予測)</td><td><strong>CL</strong> (次単語予測)<br>Language Modeling</td></tr>
            <tr><td><strong>得意タスク</strong></td><td><span class="good">分類、抽出、質問応答</span><br>（意味理解系）</td><td><span class="good">文章生成、要約、対話</span><br>（生成系）</td></tr>
            <tr><td><strong>弱点</strong></td><td><span class="bad">文章生成は苦手</span><br>(マスクがないと動かない)</td><td><span class="bad">文脈理解はやや劣る</span><br>(後ろを見れないため)</td></tr>
        </table>

        <h3>■ その他の重要キーワード</h3>
        <ul>
            <li><strong>ELMo</strong>: BERTの前身。LSTMを使って「文脈に応じた単語ベクトル」を作った（Word2Vecは文脈無視の固定ベクトル）。</li>
            <li><strong>fastText</strong>: 単語を「部分文字列 (subword)」に分解して学習。未知語（OOV）に強い。</li>
            <li><strong>トークン化 (Tokenization)</strong>:
                <ul>
                    <li><strong>BPE / SentencePiece</strong>: 頻出する文字列をひとかたまりにする手法。今のデファクトスタンダード。</li>
                </ul>
            </li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "分布仮説",
            question: "Word2Vecなどの単語埋め込み技術の基礎となっている、「単語の意味は、その周囲に現れる単語によって決まる」という考え方を何と呼ぶか。",
            options: ["分布仮説 (Distributional Hypothesis)", "万能近似定理", "ノーフリーランチ定理", "中心極限定理"],
            answer: 0,
            explanation: "「王様 - 男 + 女 = 女王」のような演算ができるのも、文脈（分布）が似ている単語はベクトル空間上で近くに配置されるためです。"
        },
        {
            category: "Word2Vec",
            question: "Word2Vecの手法のうち、ある単語を入力として、その周辺にある単語（文脈）を予測するように学習するモデルはどれか。",
            options: ["Skip-gram", "CBOW (Continuous Bag-of-Words)", "GloVe", "fastText"],
            answer: 0,
            explanation: "Skip-gramは1つの単語から複数を予測するため難しいタスクですが、その分、稀出語（レア単語）の学習精度が高くなる傾向があります。"
        },
        {
            category: "CBOW",
            question: "CBOW (Continuous Bag-of-Words) の特徴として正しいものはどれか。",
            options: ["周辺の複数の単語から、中心の単語を予測する", "中心の単語から、周辺の単語を予測する", "文章全体のトピックを予測する", "次の文を予測する"],
            answer: 0,
            explanation: "「昨日 [ ? ] 食べた」から「リンゴ」を当てるようなモデルです。周辺語の平均的な情報を使うため学習が高速です。"
        },
        {
            category: "BERTの構造",
            question: "BERTのアーキテクチャは、Transformerのどの部分に基づいているか。",
            options: ["Encoderのみ", "Decoderのみ", "EncoderとDecoderの両方", "Attention機構のみ（FFNなし）"],
            answer: 0,
            explanation: "BERTは入力文の「理解」に特化しているため、情報を吸い上げるEncoder部分のみを多層に積み重ねています。"
        },
        {
            category: "BERTの事前学習",
            question: "BERTの事前学習タスクの一つである「MLM (Masked Language Model)」とはどのようなものか。",
            options: ["入力文の一部をランダムに[MASK]トークンに置き換え、その元の単語を予測する", "次の文が論理的に繋がっているかを予測する", "次の単語を順番に予測する", "文章の感情を分類する"],
            answer: 0,
            explanation: "穴埋め問題（クイズ）を大量に解かせることで、前後の文脈から単語の意味を推測する能力を養います。"
        },
        {
            category: "GPTの構造",
            question: "GPT (Generative Pre-trained Transformer) のアーキテクチャは、Transformerのどの部分に基づいているか。",
            options: ["Decoderのみ", "Encoderのみ", "EncoderとDecoderの両方", "RNN"],
            answer: 0,
            explanation: "GPTは文章の「生成」に特化しているため、未来の情報をマスクしながら予測を行うDecoder部分を使用します。"
        },
        {
            category: "GPTの特性",
            question: "GPTのような「左から右へ」単語を予測していくモデルを何と呼ぶか。",
            options: ["自己回帰モデル (Auto-regressive Model)", "自己符号化器 (Auto-encoder)", "双方向モデル (Bidirectional Model)", "識別モデル (Discriminative Model)"],
            answer: 0,
            explanation: "自分が生成した出力を次の入力として使い、次々と連鎖的に生成していくモデルのことです。"
        },
        {
            category: "NSP",
            question: "BERTのもう一つの事前学習タスク「NSP (Next Sentence Prediction)」の目的は何か。",
            options: ["2つの文が連続しているか（文脈のつながり）を理解すること", "単語の意味を理解すること", "文法誤りを訂正すること", "翻訳精度を上げること"],
            answer: 0,
            explanation: "[SEP]トークンで区切られた2つの文AとBが、本来続いていたものか、ランダムに選ばれたものかを判定します。質問応答などで重要です。"
        },
        {
            category: "ELMo",
            question: "BERT以前に提案された「ELMo」が、Word2Vecと決定的に異なっていた点は何か。",
            options: ["文脈に応じて単語ベクトルが変化する（多義語を区別できる）", "計算が非常に速い", "画像も扱える", "固定長のベクトルしか出せない"],
            answer: 0,
            explanation: "Word2Vecでは「bank（銀行）」も「bank（土手）」も同じベクトルでしたが、ELMoはLSTMを使って文脈に応じた異なるベクトルを出力します。"
        },
        {
            category: "トークン化",
            question: "BERTやGPTで使われる「Subword（サブワード）」トークン化（BPEなど）の利点は何か。",
            options: ["「未知語（Out-of-Vocabulary）」を減らし、語彙サイズを抑えつつ多様な単語を表現できる", "単語の意味がより明確になる", "処理速度が遅くなる", "数字が扱えなくなる"],
            answer: 0,
            explanation: "「unhappiness」を「un」「happi」「ness」のように分割することで、未知の複合語でも既知の部品の組み合わせとして処理できます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "Negative Sampling(応用)",
            question: "Word2Vecの学習を高速化するために用いられる「Negative Sampling」とはどのような手法か。",
            options: ["分母の計算（全単語の総和）を避けるため、正解以外の単語（負例）をいくつかランダムに選んで、それらとの区別だけを学習する", "負の値を0にする", "学習率を負にする", "不要なデータを削除する"],
            answer: 0,
            explanation: "Softmaxで全単語（数万〜数百万）の確率を計算するのは重すぎるため、少数のハズレ（負例）だけを使って近似計算します。"
        },
        {
            category: "階層的Softmax(応用)",
            question: "Word2Vecのもう一つの高速化手法「Hierarchical Softmax（階層的ソフトマックス）」はどのような構造を使うか。",
            options: ["ハフマン木（二分木）", "決定木", "ニューラルネットワーク", "ハッシュテーブル"],
            answer: 0,
            explanation: "頻出語ほど浅い階層になるように二分木を作り、葉ノード（単語）に到達するまでの分岐確率の積で確率を表現します。計算量が $O(V)$ から $O(\\log V)$ に減ります。"
        },
        {
            category: "fastTextの特徴(応用)",
            question: "Facebookが開発した「fastText」が、Word2Vecよりも優れている点（特に未知語に対して）は何か。",
            options: ["単語を「文字n-gram（部分文字列）」の集合として表現するため、未知語でも部分文字列の情報からベクトルを推定できる", "文脈を考慮できる", "Transformerを使っている", "計算量が少ない"],
            answer: 0,
            explanation: "例えば「apple」を `<ap`, `app`, `ppl`, `ple`, `le>` のように分解して学習するため、綴りが似ている単語は似たベクトルになります。"
        },
        {
            category: "BERTの入力(応用)",
            question: "BERTに入力する際、先頭に必ず付与する特殊トークン `[CLS]` は、主に何のために使われるか。",
            options: ["文全体の分類タスク（感情分析など）を行う際の、文全体の特徴ベクトルとして利用する", "文の区切りを表す", "マスクされた単語を表す", "未知語を表す"],
            answer: 0,
            explanation: "Self-Attentionによって全トークンの情報が `[CLS]` に集約されるよう学習されるため、このトークンの出力ベクトルを分類器に入力します。"
        },
        {
            category: "BERTの学習制限(応用)",
            question: "BERTの事前学習において、1回のイテレーションで予測（学習）されるのは入力トークンのうちおよそ何%か。",
            options: ["15% (マスクされた部分のみ)", "100% (全ての単語)", "50%", "1%"],
            answer: 0,
            explanation: "BERTはマスクされた15%の単語しか予測の対象になりません。そのため、全単語を予測するGPTに比べて、同じデータ量でも学習効率は悪く、学習に時間がかかります。"
        },
        {
            category: "位置情報の埋め込み(応用)",
            question: "Transformer系モデルにおける「Positional Encoding」は、単語埋め込みベクトルに対してどのように適用されるか。",
            options: ["足し算 (加算) される", "結合 (Concatenate) される", "掛け算 (乗算) される", "別の入力として扱われる"],
            answer: 0,
            explanation: "単語の意味ベクトルに位置情報を「足し合わせ」ます。高次元空間では、足し合わせても元の情報は保持されやすいという性質を利用しています。"
        },
        {
            category: "GPTのFew-shot(応用)",
            question: "GPT-3などで注目された「Few-shot Learning（In-context Learning）」とはどのような使いかたか。",
            options: ["重みの更新（学習）を行わず、プロンプトに「例題」をいくつか含めるだけで、タスクを解かせる", "少量のデータでFine-tuningする", "モデルの一部だけを学習する", "画像を見せる"],
            answer: 0,
            explanation: "「翻訳して：apple→りんご, pen→ペン, book→」のように例示するだけで、続きを予測する能力を使って回答させます。パラメータ更新はしません。"
        },
        {
            category: "Doc2Vec(応用)",
            question: "Word2Vecを拡張して、文章や段落全体のベクトル（Paragraph Vector）を獲得する手法は何か。",
            options: ["Doc2Vec (PV-DM / PV-DBOW)", "Seq2Seq", "GloVe", "Latent Dirichlet Allocation"],
            answer: 0,
            explanation: "「段落ID」も一つの単語のように扱い、単語と同時に学習させることで、可変長の文章を固定長のベクトルに変換します。"
        },
        {
            category: "BERTのFine-tuning(応用)",
            question: "BERTを特定のタスク（例：感情分析）にFine-tuningする際、一般的に行われる操作はどれか。",
            options: ["事前学習済みの重みを初期値とし、タスク用の出力層を追加して、全体のパラメータを微調整する", "事前学習済みの重みは固定し、出力層だけを学習する", "全ての重みをランダム初期化して一から学習する", "EncoderではなくDecoderを追加する"],
            answer: 0,
            explanation: "BERTの強力な言語理解能力を維持しつつ、タスクに合わせて全体を少しチューニングするのが最も精度が出ます。"
        },
        {
            category: "未知語トークン(応用)",
            question: "BERTなどのトークナイザにおいて、語彙に含まれない文字や単語が出現した場合、どのようなトークンに置き換えられるか。",
            options: ["`[UNK]` (Unknown)", "`[MASK]`", "`[CLS]`", "`[SEP]`"],
            answer: 0,
            explanation: "Subword分割でも対応しきれない文字などは `[UNK]` になりますが、多言語モデルなどではこれが起きないように語彙が工夫されています。"
        }
    ]
};
