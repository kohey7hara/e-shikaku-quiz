window.quizData = {
    title: "4-（４）自然言語処理：Word2Vec, BERT, GPT",
    
    cheatSheet: `
        <h3>■ 単語のベクトル化 (Word Embedding)</h3>
        <ul>
            <li><strong>Word2Vec</strong>: 「同じ文脈に現れる単語は似た意味を持つ（分布仮説）」に基づく。
                <ul>
                    <li><strong>CBOW</strong>: 周りから真ん中を予測。</li>
                    <li><strong>Skip-gram</strong>: 真ん中から周りを予測（精度高い）。</li>
                </ul>
            </li>
        </ul>

        <h3>■ BERT vs GPT (Transformerベース)</h3>
        <table>
            <tr><th>モデル</th><th>構造</th><th>事前学習タスク</th><th>得意タスク</th></tr>
            <tr><td><strong>BERT</strong></td><td><strong>Encoder</strong>のみ<br>（双方向）</td><td><strong>MLM</strong> (穴埋め)<br><strong>NSP</strong> (次の文か予測)</td><td>分類、抽出、質問応答<br>(文脈理解に強い)</td></tr>
            <tr><td><strong>GPT</strong></td><td><strong>Decoder</strong>のみ<br>（左から右へ）</td><td><strong>CL</strong> (次の単語予測)<br>言語モデル</td><td><strong>文章生成</strong>、要約<br>(流暢な生成に強い)</td></tr>
        </table>

        <h3>■ 最近の学習手法 (Prompt Learning)</h3>
        <ul>
            <li><strong>Fine-tuning</strong>: 事前学習済みモデルの全パラメータをタスクに合わせて微調整。</li>
            <li><strong>Zero/Few-shot</strong>: 追加学習なし（または数例の提示のみ）で、プロンプト（指示文）だけでタスクを解かせる手法。</li>
        </ul>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "Word2Vec",
            question: "Word2Vecの学習モデルの一つで、「周辺の単語（コンテキスト）」から「中心の単語」を予測するモデルはどれか。",
            options: ["CBOW (Continuous Bag-of-Words)", "Skip-gram", "GloVe", "FastText"],
            answer: 0,
            explanation: "CBOWは「周り（ヒント）からターゲットを当てる」モデルです。逆にターゲットから周りを予測するのがSkip-gramです。"
        },
        {
            category: "分布仮説",
            question: "Word2Vecなどの単語埋め込み手法の基礎となっている「分布仮説」の説明として正しいものはどれか。",
            options: ["単語の意味は、その単語がどのような文脈（周囲の単語）で使われるかによって決まる", "単語の出現頻度はジップの法則に従う", "単語の長さと意味には相関がある", "単語の意味は辞書の定義によって決まる"],
            answer: 0,
            explanation: "「King」と「Queen」は似たような文脈（王宮、玉座など）で使われるため、ベクトル空間上でも近くなる、という考え方です。"
        },
        {
            category: "BERTの構造",
            question: "BERTのモデル構造は、Transformerのどの部分に基づいているか。",
            options: ["Encoder（エンコーダ）のみ", "Decoder（デコーダ）のみ", "EncoderとDecoderの両方", "Attention層のみ"],
            answer: 0,
            explanation: "BERTは入力を理解・抽出することに特化したモデルであり、TransformerのEncoder部分を積層して作られています。"
        },
        {
            category: "MLM",
            question: "BERTの事前学習タスクの一つである「MLM (Masked Language Modeling)」とはどのようなタスクか。",
            options: ["入力文の一部を[MASK]トークンに置き換え、その元の単語を予測する（穴埋め問題）", "次の文が論理的に続くかどうかを判定する", "次の単語を予測して文章を生成する", "文章の感情を分類する"],
            answer: 0,
            explanation: "穴埋め問題を解くことで、前後の文脈（双方向）からの情報を利用して単語の意味を学習します。"
        },
        {
            category: "GPTの構造",
            question: "GPT (Generative Pre-trained Transformer) のモデル構造は、Transformerのどの部分に基づいているか。",
            options: ["Decoder（デコーダ）のみ", "Encoder（エンコーダ）のみ", "EncoderとDecoderの両方", "RNN"],
            answer: 0,
            explanation: "GPTは文章生成（次の単語予測）に特化しており、左から右へ情報を流すTransformerのDecoder部分を使用しています。"
        },
        {
            category: "NSP",
            question: "BERTのもう一つの事前学習タスク「NSP (Next Sentence Prediction)」の目的は何か。",
            options: ["2つの文が連続した文かどうか（文間の関係）を学習する", "次の単語を予測する", "品詞を予測する", "固有名詞を特定する"],
            answer: 0,
            explanation: "文と文のつながり（談話構造）を理解する能力を養うためのタスクです（後の研究で効果が疑問視されることもありますが、BERTの基本仕様です）。"
        },
        {
            category: "Fine-tuning",
            question: "「ファインチューニング (Fine-tuning)」の説明として正しいものはどれか。",
            options: ["大量のデータで事前学習したモデルのパラメータを初期値とし、特定のタスク用データで再度全層（または一部）を学習させる", "モデルのパラメータを固定し、入力データだけを調整する", "学習済みモデルの出力を別のモデルに入力する", "ハイパーパラメータをランダムに探索する"],
            answer: 0,
            explanation: "「巨人の肩に乗る」アプローチです。ゼロから学習するより圧倒的に少ないデータと時間で高精度を達成できます。"
        },
        {
            category: "Zero-shot",
            question: "GPT-3などで注目された「Zero-shot Learning」とはどのような手法か。",
            options: ["タスク固有の学習データ（例題）を一切与えず、プロンプト（指示）だけでタスクを行わせる", "学習データを0個にして、ランダムに回答させる", "学習データを全て0で埋める", "画像を見ずに画像を分類する"],
            answer: 0,
            explanation: "モデルが十分に賢ければ、「これを翻訳して」という指示だけで、翻訳の訓練データを見せなくても翻訳タスクをこなせるという概念です。"
        },
        {
            category: "トークン",
            question: "BERTなどで文の先頭に付与される特別なトークン「[CLS]」の主な役割は何か。",
            options: ["文全体の意味表現（ベクトル）を保持し、分類タスクなどに利用する", "文の区切りを表す", "マスクされた単語を表す", "未知語を表す"],
            answer: 0,
            explanation: "Classification Tokenの略です。Self-Attentionにより文中の全情報がこのトークンに集約されるよう学習されます。"
        },
        {
            category: "ネガティブサンプリング",
            question: "Word2Vecの学習を高速化するために用いられる「ネガティブサンプリング」とはどのような手法か。",
            options: ["正解の単語以外の「不正解（負例）」を、全語彙からではなく少数だけランダムに選んで計算する", "負の値を入力データに含める", "学習データを間引いて減らす", "頻出単語を削除する"],
            answer: 0,
            explanation: "分母の計算（全単語の総和）が重すぎるため、少数の「ハズレ」単語だけを使って近似計算を行い、高速化します。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "Word2Vecの演算(応用)",
            question: "Word2Vecで学習された単語ベクトルにおいて、「王様 (King) - 男性 (Man) + 女性 (Woman)」というベクトル演算を行うと、どの単語に近いベクトルが得られるか。",
            options: ["女王 (Queen)", "王子 (Prince)", "王宮 (Palace)", "人間 (Human)"],
            answer: 0,
            explanation: "有名なアナロジー（類推）の例です。単語の意味（概念）の加減算がベクトル空間上で可能であることを示しました。"
        },
        {
            category: "BERT vs GPT(応用)",
            question: "BERTは双方向（Bidirectional）の文脈を見ることができるが、GPTは片方向（Unidirectional）しか見ることができない。これはGPTが何のタスクに特化しているためか。",
            options: ["言語生成（次の単語の予測）", "感情分析", "固有表現抽出", "画像認識"],
            answer: 0,
            explanation: "文章生成では「未来の単語」はまだ存在しないため、カンニングできません。過去（左側）の情報だけで次を予測する必要があるため、片方向（Masked Self-Attention）になります。"
        },
        {
            category: "Prompt Learning(応用)",
            question: "「Prompt Base Learning（プロンプト学習）」のアプローチが、従来の「Pre-train & Fine-tune」と大きく異なる点は何か。",
            options: ["下流タスクをモデルの事前学習形式（穴埋めや次単語予測）に合わせて解かせるため、モデルのパラメータ更新を必須としない", "モデルの構造をタスクごとに変更する", "ラベル付きデータが大量に必要になる", "計算コストが非常に高くなる"],
            answer: 0,
            explanation: "「この映画は面白かった。感情は[MASK]」のように入力形式を工夫することで、モデルを再学習させずに分類タスクなどを解かせることができます。"
        },
        {
            category: "Positional Embeddings(応用)",
            question: "BERTで用いられる位置情報「Positional Embeddings」は、オリジナルのTransformer（正弦波関数）とどう違うか。",
            options: ["学習可能なパラメータとして定義されており、データから学習される", "固定の乱数を使用している", "RNNを使って計算される", "使用されていない"],
            answer: 0,
            explanation: "BERTでは位置情報もベクトルとして用意し、学習プロセスの中で最適な値を獲得させます（最大系列長512までの制限があるのはこのためです）。"
        },
        {
            category: "サブワード(応用)",
            question: "BERTなどで使われる「WordPiece」や「BPE」などのサブワード分割の主なメリットは何か。",
            options: ["未知語（OOV）を減らし、語彙サイズを抑制しつつ意味のある最小単位で表現できる", "単語の意味をより深く理解できる", "処理速度が速くなる", "文法が正確になる"],
            answer: 0,
            explanation: "「unhappiness」を「un」「happi」「ness」のように分割することで、未知の単語も既知の部品の組み合わせとして扱えるようになります。"
        },
        {
            category: "事前学習のコスト(応用)",
            question: "近年の大規模言語モデル（LLM）において「スケーリング則（Scaling Laws）」が示唆していることは何か。",
            options: ["モデルサイズ、データ量、計算量を増やせば増やすほど、性能（Loss）はべき乗則に従って予測通りに向上する", "モデルサイズをある程度大きくすると性能が頭打ちになる", "データ量よりもモデル構造の工夫の方が重要である", "小さなモデルの方が汎化性能が高い"],
            answer: 0,
            explanation: "「工夫するより力技（規模拡大）が正義」という経験則です。これが今の巨大モデル開発競争の根拠になっています。"
        },
        {
            category: "Masked Attention(応用)",
            question: "GPTなどのDecoderモデルで使われる「Masked Self-Attention」において、注意スコア行列（Attention Matrix）にはどのような特徴（制約）があるか。",
            options: ["対角成分より右上（未来部分）が全て $-\\infty$（Softmax後は0）にマスクされている（下三角行列）", "対角成分が全て0になっている", "ランダムに0が含まれている", "全ての要素が1になっている"],
            answer: 0,
            explanation: "自分より後ろ（未来）の単語を見ないようにするため、行列の右上半分を遮断します。"
        },
        {
            category: "BERTの入力表現(応用)",
            question: "BERTへの入力は「Token Embeddings」に加え、位置情報の「Position Embeddings」と、もう一つ何の和（足し算）で構成されるか。",
            options: ["Segment Embeddings（2つの文のどちらに属するかを表す）", "Word Embeddings", "Image Embeddings", "Attention Embeddings"],
            answer: 0,
            explanation: "NSPタスク（2文入力）に対応するため、「文A」か「文B」かを区別するSegment Embeddingを加算します。"
        },
        {
            category: "Few-shot Learning(応用)",
            question: "GPT-3などにおける「Few-shot Learning」の「Few」とは具体的に何を指しているか。",
            options: ["プロンプト（入力）の中に、タスクの回答例（デモンストレーション）を数個含めること", "数回だけ重みの更新（学習）を行うこと", "数枚の画像を見せること", "モデルの層数を数層に減らすこと"],
            answer: 0,
            explanation: "重み更新（学習）は行わず、「例題：英語→日本語、例1：Cat→猫、問題：Dog→」のように、入力テキスト内で例示することでタスクを教える手法です。"
        },
        {
            category: "ELMo(応用)",
            question: "BERT登場以前のモデルである「ELMo」が、従来のWord2Vecと比べて画期的だった点は何か。",
            options: ["文脈に応じて単語のベクトルが動的に変化する（多義語に対応できる）", "Transformerを使用した", "画像も扱えるようになった", "学習が非常に高速だった"],
            answer: 0,
            explanation: "Word2Vecでは「Bank（土手）」も「Bank（銀行）」も同じベクトルでしたが、ELMo（Bi-LSTMベース）は文脈を見て異なるベクトルを出力できるようになりました。"
        }
    ]
};
