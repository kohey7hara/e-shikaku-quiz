window.quizData = {
    title: "4-（５）発展的NLP：ELMo, fastText, Tokenization",
    
    cheatSheet: `
        <style>
            .concept-container { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px; }
            .concept-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; width: 30%; min-width: 300px; background: #fff; vertical-align: top; }
            .card-title { font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 10px; display: inline-block; padding-bottom: 3px; }
            
            /* ELMo用スタイル */
            .elmo-row { display: flex; align-items: center; margin-bottom: 5px; font-size: 0.85em; }
            .word-box { border: 1px solid #999; padding: 3px 5px; border-radius: 3px; background: #eee; margin-right: 5px; }
            .vec-box { color: white; padding: 3px 8px; border-radius: 10px; font-size: 0.8em; font-weight: bold; }
            .vec-a { background-color: #3498db; }
            .vec-b { background-color: #e74c3c; }

            /* fastText用スタイル */
            .ngram-container { text-align: center; margin: 10px 0; }
            .ngram-chip { display: inline-block; background: #eafaf1; border: 1px solid #27ae60; color: #27ae60; padding: 2px 5px; border-radius: 4px; font-size: 0.8em; margin: 2px; }
            
            /* Tokenization用スタイル */
            .token-step { background: #f9f9f9; border-left: 3px solid #f39c12; padding: 5px 10px; margin: 5px 0; font-size: 0.85em; }
            .merge-arrow { color: #f39c12; font-weight: bold; }

            .summary-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .summary-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .summary-table td { border: 1px solid #ccc; padding: 5px; }
        </style>

        <h3>■ 1. ELMo：文脈で意味が変わる</h3>
        <p>「文脈化単語埋め込み」の先駆け。Word2Vecの弱点を克服しました。</p>
        <div class="concept-container">
            <div class="concept-card">
                <div class="card-title" style="border-color:#999;">Word2Vec (固定)</div>
                <div style="font-size:0.9em; margin-bottom:10px;">どんな文脈でもベクトルは同じ。</div>
                <div class="elmo-row">
                    <span class="word-box">River</span> <strong>Bank</strong>
                    → <span class="vec-box vec-a">[0.5, 0.1]</span>
                </div>
                <div class="elmo-row">
                    <span class="word-box">Money</span> <strong>Bank</strong>
                    → <span class="vec-box vec-a">[0.5, 0.1]</span>
                </div>
                <div style="font-size:0.8em; color:red; margin-top:5px;">
                    ⚠ 銀行も土手も区別できない
                </div>
            </div>
            <div class="concept-card" style="border: 2px solid #3498db;">
                <div class="card-title" style="border-color:#3498db;">ELMo (可変)</div>
                <div style="font-size:0.9em; margin-bottom:10px;"><strong>Bi-LSTM</strong>で文脈を読んで変化。</div>
                <div class="elmo-row">
                    <span class="word-box">River</span> <strong>Bank</strong>
                    → <span class="vec-box vec-a">[0.9, 0.1]</span> (土手)
                </div>
                <div class="elmo-row">
                    <span class="word-box">Money</span> <strong>Bank</strong>
                    → <span class="vec-box vec-b">[0.1, 0.9]</span> (銀行)
                </div>
                <div style="font-size:0.8em; color:#3498db; margin-top:5px;">
                    💡 多義語を正しく扱える！
                </div>
            </div>
        </div>

        <h3>■ 2. fastText：部分文字列 (Subword)</h3>
        <p>単語を「文字の集まり」として捉え、未知語 (OOV) に対応します。</p>
        <div class="concept-container">
            <div class="concept-card" style="border: 2px solid #27ae60;">
                <div class="card-title" style="border-color:#27ae60;">fastTextの仕組み</div>
                <p style="font-size:0.9em;">単語 "apple" を<strong>文字n-gram</strong>に分解して学習。</p>
                <div class="ngram-container">
                    <span class="ngram-chip">&lt;ap</span>
                    <span class="ngram-chip">app</span>
                    <span class="ngram-chip">ppl</span>
                    <span class="ngram-chip">ple</span>
                    <span class="ngram-chip">le&gt;</span>
                </div>
                <p style="font-size:0.9em; border-top:1px dashed #ccc; padding-top:5px;">
                    <strong>メリット:</strong><br>
                    未知語 "appple" (ミススペル) が来ても...<br>
                    <span class="ngram-chip">app</span> や <span class="ngram-chip">ple</span> のベクトルを知っているため、<br>
                    <strong>「リンゴっぽい意味だ」</strong>と推測できる。
                </p>
            </div>
        </div>

        <h3>■ 3. トークン化：BPE / SentencePiece</h3>
        <p>「単語（Word）」と「文字（Char）」のいいとこ取りをする、現在のデファクトスタンダード。</p>
        <div class="concept-container">
            <div class="concept-card" style="border: 2px solid #f39c12; width:60%;">
                <div class="card-title" style="border-color:#f39c12;">BPE (Byte Pair Encoding)</div>
                <p style="font-size:0.9em;">頻出するペアをくっつけて「新しい単位」を作る。</p>
                
                <div class="token-step">
                    1. 初期状態 (文字ごと):<br>
                    [ l, o, w ], [ l, o, w, e, r ], [ n, e, w ]
                </div>
                <div style="text-align:center;" class="merge-arrow">↓ "l" と "o" がよく出る！</div>
                <div class="token-step">
                    2. "lo" を結合:<br>
                    [ <strong>lo</strong>, w ], [ <strong>lo</strong>, w, e, r ], [ n, e, w ]
                </div>
                <div style="text-align:center;" class="merge-arrow">↓ "lo" と "w" がよく出る！</div>
                <div class="token-step">
                    3. "low" を結合:<br>
                    [ <strong>low</strong> ], [ <strong>low</strong>, e, r ], [ n, e, w ]
                </div>
                <p style="font-size:0.9em; margin-top:5px;">
                    <strong>結果:</strong> 頻出語は「1単語」に、レア語は「部分文字列」に分割される。<br>
                    → <strong>「未知語をなくしつつ、語彙数を抑える」</strong>最適解。
                </p>
            </div>
        </div>

        <h3>■ まとめ：E資格のツボ</h3>
        <table class="summary-table">
            <tr><th>モデル/手法</th><th>キーワード</th><th>Word2Vecとの違い</th></tr>
            <tr>
                <td><strong>ELMo</strong></td>
                <td>Bi-LSTM<br>文脈化単語埋め込み</td>
                <td>ベクトルが<strong>可変</strong>（文脈による）。<br>Word2Vecは固定。</td>
            </tr>
            <tr>
                <td><strong>fastText</strong></td>
                <td>Subword (部分語)<br>文字n-gram</td>
                <td>単語の中身（文字の並び）を見る。<br><strong>未知語</strong>に強い。</td>
            </tr>
            <tr>
                <td><strong>BPE /<br>SentencePiece</strong></td>
                <td>サブワード分割<br>語彙数削減</td>
                <td>前処理の技術。<br>未知語をなくし、効率的に学習させる。</td>
            </tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎・応用】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "ELMoの特徴",
            question: "ELMo (Embeddings from Language Models) がWord2Vecと比較して革新的だった点は何か。",
            options: ["文脈に応じて単語ベクトルが動的に変化するため、多義語（例: Bank）の意味を区別できるようになった", "計算量が大幅に減った", "画像データも扱えるようになった", "単語を文字単位に分解した"],
            answer: 0,
            explanation: "Word2Vecでは「Bank」は常に1つのベクトルですが、ELMoはLSTMの出力を使うため、文脈によって異なるベクトルになります。"
        },
        {
            category: "ELMoの構造",
            question: "ELMoのモデル構造として使われているニューラルネットワークはどれか。",
            options: ["双方向LSTM (Bi-LSTM)", "Transformer (Encoder)", "CNN", "単純なRNN"],
            answer: 0,
            explanation: "順方向と逆方向の2つのLSTMの出力を結合することで、文脈情報を獲得しています。（※この後、より強力なTransformerを使ったBERTが登場します）"
        },
        {
            category: "fastTextの仕組み",
            question: "fastTextにおいて、単語のベクトルはどのように計算されるか。",
            options: ["単語を構成する「文字n-gram（部分文字列）」のベクトルの和（または平均）として表現される", "単語ごとにランダムなベクトルを割り当てる", "文全体のベクトルの平均をとる", "辞書にある単語しかベクトル化できない"],
            answer: 0,
            explanation: "単語全体そのもののベクトルに加え、構成する部分文字列（subword）のベクトルも学習し、それらを足し合わせます。"
        },
        {
            category: "fastTextの利点",
            question: "fastTextがWord2Vecよりも優れている（強い）シチュエーションはどれか。",
            options: ["未知語（OOV）やスペルミスが多いデータ、または形態素解析が難しい言語", "計算リソースが非常に少ない場合", "文脈理解が最優先される場合", "長文の要約を行う場合"],
            answer: 0,
            explanation: "Word2Vecは辞書にない単語はお手上げですが、fastTextは「部分文字列」の組み合わせから未知語のベクトルを推定できます。"
        },
        {
            category: "Tokenizationの課題",
            question: "自然言語処理の前処理において、「単語単位（Word-level）」で分割することの主なデメリットは何か。",
            options: ["語彙数が膨大になり、かつ未知語（Out-Of-Vocabulary）への対応が難しい", "文が長くなりすぎる", "意味が失われる", "計算が速すぎる"],
            answer: 0,
            explanation: "世の中の全ての単語を辞書に登録するのは不可能です。単語単位だと、辞書にない単語は全て `[UNK]` になってしまいます。"
        },
        {
            category: "BPEのアルゴリズム",
            question: "BPE (Byte Pair Encoding) アルゴリズムの基本的な動作原理はどれか。",
            options: ["データ中で最も頻繁に出現する「文字（バイト）のペア」を繰り返し結合して、新しいトークンとして登録する", "ランダムに単語を分割する", "文法規則に基づいて単語を分割する", "母音で分割する"],
            answer: 0,
            explanation: "頻出するペア（例: 'l', 'o' → 'lo'）を結合していくことで、頻出語は1トークンに、稀な語は細かいサブワードに分割されるようになります。"
        },
        {
            category: "SentencePiece",
            question: "Googleが開発した「SentencePiece」の特徴として正しいものはどれか。",
            options: ["言語ごとの分かち書き（形態素解析）を前提とせず、生テキストから直接サブワードモデルを学習できる", "英語専用である", "単語単位の分割しかできない", "ニューラルネットワークを用いている"],
            answer: 0,
            explanation: "日本語のようにスペース区切りがない言語でも、BPEやUnigramモデルを直接適用できるため、多言語モデル（mBERTなど）で重宝されます。"
        },
        {
            category: "サブワードのメリット",
            question: "BPEやSentencePieceのようなサブワード分割を採用する最大のメリットは何か。",
            options: ["未知語を「既知のサブワードの組み合わせ」として表現でき、実質的に語彙サイズを固定しながら未知語問題を解決できる", "文の長さが短くなる", "学習時間が半分になる", "文脈理解が不要になる"],
            answer: 0,
            explanation: "例えば「Smartphonessss」という未知語が来ても、「Smartphone」+「s」+「s」...のように分割して意味を捉えることができます。"
        },
        {
            category: "Unigram Language Model",
            question: "SentencePieceで採用されている、BPEとは別のサブワード分割アルゴリズム「Unigram Language Model」の特徴は何か。",
            options: ["大きな語彙集合からスタートし、モデルの尤度（確率）を下げないように不要なサブワードを削っていく（Top-down）", "小さい単位から結合していく（Bottom-up）", "ランダムに分割する", "文字単位のみを使う"],
            answer: 0,
            explanation: "BPEは結合（ボトムアップ）ですが、Unigramは削除（トップダウン）のアプローチで最適な分割を探します。"
        },
        {
            category: "BERTとトークナイザ",
            question: "BERT（英語モデル）で一般的に使われているトークン化手法はどれか。",
            options: ["WordPiece (BPEの亜種)", "MeCab", "Jieba", "White space splitting"],
            answer: 0,
            explanation: "BERTはWordPieceを採用しています。BPEと似ていますが、結合基準に尤度（確率）を用いる点が少し異なります。"
        }
    ]
};
