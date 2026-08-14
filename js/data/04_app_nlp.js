window.quizData = {
    title: "4-（４）自然言語処理：Word2Vec・BERT・GPT",

    cheatSheet: `
        <style>
            .nlp-core { margin: 10px 0 18px; padding: 12px 14px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.75; }
            .nlp-note { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #f39c12; border-radius: 8px; background: #fff8e7; line-height: 1.7; }
            .nlp-formula { margin: 8px 0 15px; padding: 10px 12px; border: 1px solid #c8dbee; border-radius: 8px; background: #f3f8fd; color: #123f68; text-align: center; overflow-x: auto; }
            .nlp-formula mjx-container { margin: 0 !important; }
            .nlp-table-wrap { margin: 10px 0 20px; overflow-x: auto; }
            .nlp-table { width: 100%; border-collapse: collapse; }
            .nlp-table th { background: #eaf2fb; }
            .nlp-table th, .nlp-table td { padding: 9px; border: 1px solid #d7e2ec; text-align: left; vertical-align: top; }
            .nlp-table td:first-child { white-space: nowrap; }
            .nlp-visual-wrap { margin: 12px 0 20px; overflow-x: auto; border: 1px solid #d7e2ec; border-radius: 12px; background: #fff; }
            .nlp-visual-card { box-sizing: border-box; min-width: 990px; padding: 12px; }
            .nlp-wide-svg { display: block; width: 100%; min-width: 960px; height: auto; margin: 0 auto; }
            .nlp-svg-title { font-size: 16px; fill: #102a43; font-weight: 800; }
            .nlp-svg-label { font-size: 13px; fill: #243b53; font-weight: 750; }
            .nlp-svg-note { font-size: 12px; fill: #526d82; }
            .nlp-svg-mini { font-size: 11px; fill: #627d98; }
            .nlp-caption { padding: 0 15px 13px; color: #334e68; line-height: 1.7; }
            .nlp-link-map { margin: 9px 0 20px; padding: 11px 13px; border: 1px dashed #9fb3c8; border-radius: 8px; background: #f8fafc; line-height: 1.75; }
            .nlp-token { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        </style>

        <h3>■ まず全体：3モデルは「何をしたいか」が違う</h3>
        <div class="nlp-visual-wrap">
            <div class="nlp-visual-card">
                <svg class="nlp-wide-svg" viewBox="0 0 960 255" role="img" aria-labelledby="nlp-overview-title nlp-overview-desc">
                    <title id="nlp-overview-title">Word2Vec、BERT、GPTの役割比較</title>
                    <desc id="nlp-overview-desc">Word2Vecは単語を固定ベクトルにし、BERTは前後文脈を使って文を理解し、GPTは過去のトークンから次のトークンを生成する。</desc>
                    <defs><marker id="nlp-arrow-overview" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="nlp-svg-title">同じ自然言語処理でも、答えさせるものが違う</text>
                    <g transform="translate(20 48)">
                        <rect width="290" height="172" rx="12" fill="#f4ecf7" stroke="#8e44ad" stroke-width="2"/>
                        <text x="98" y="28" class="nlp-svg-title">Word2Vec</text>
                        <rect x="24" y="50" width="78" height="38" rx="7" fill="#fff" stroke="#8e44ad"/><text x="44" y="74" class="nlp-svg-label">単語</text>
                        <path d="M108 69 H143" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-overview)"/>
                        <rect x="153" y="48" width="112" height="42" rx="7" fill="#e8d8ef" stroke="#8e44ad"/><text x="168" y="66" class="nlp-svg-mini">[0.2, −0.4, ...]</text><text x="177" y="81" class="nlp-svg-mini">固定ベクトル</text>
                        <text x="40" y="121" class="nlp-svg-label">単語の近さ・関係を見る</text>
                        <text x="36" y="145" class="nlp-svg-note">同じ単語には原則同じベクトル</text>
                    </g>
                    <g transform="translate(335 48)">
                        <rect width="290" height="172" rx="12" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                        <text x="122" y="28" class="nlp-svg-title">BERT</text>
                        <g transform="translate(14 50)"><rect width="68" height="38" rx="6" fill="#fff" stroke="#2780b8"/><text x="14" y="24" class="nlp-svg-label">入力文</text><path d="M73 19 H88" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-overview)"/><rect x="96" width="92" height="38" rx="6" fill="#d6ecfa" stroke="#2780b8"/><text x="117" y="24" class="nlp-svg-label">Encoder</text><path d="M193 19 H208" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-overview)"/><rect x="216" width="58" height="38" rx="6" fill="#fff" stroke="#2780b8"/><text x="229" y="24" class="nlp-svg-label">表現</text></g>
                        <text x="75" y="112" class="nlp-svg-note">← 左右のtokenを相互参照 →</text>
                        <text x="54" y="145" class="nlp-svg-label">文脈に応じた表現を作る</text>
                    </g>
                    <g transform="translate(650 48)">
                        <rect width="290" height="172" rx="12" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                        <text x="124" y="28" class="nlp-svg-title">GPT</text>
                        <g transform="translate(26 50)"><rect width="52" height="34" rx="5" fill="#fff" stroke="#f39c12"/><text x="17" y="22" class="nlp-svg-label">私</text><path d="M57 17 H78" stroke="#627d98" marker-end="url(#nlp-arrow-overview)"/><rect x="86" width="52" height="34" rx="5" fill="#fff" stroke="#f39c12"/><text x="103" y="22" class="nlp-svg-label">は</text><path d="M143 17 H164" stroke="#627d98" marker-end="url(#nlp-arrow-overview)"/><rect x="172" width="72" height="34" rx="5" fill="#fdebd0" stroke="#f39c12"/><text x="188" y="22" class="nlp-svg-label">次の語</text></g>
                        <path d="M224 99 C260 99 260 132 211 132 H89" fill="none" stroke="#f39c12" stroke-width="2" stroke-dasharray="6,4" marker-end="url(#nlp-arrow-overview)"/>
                        <text x="79" y="151" class="nlp-svg-label">生成語を戻して続きを書く</text>
                    </g>
                </svg>
            </div>
            <div class="nlp-caption"><strong>一言暗記：</strong>Word2Vec＝単語を座標にする／BERT＝前後を見て文を読む／GPT＝過去を見て続きを書く。3モデルを直列につなぐ図ではなく、役割の比較です。</div>
        </div>
        <div class="nlp-link-map"><strong>章の分担：</strong>Q・K・V、Scaled Dot-Product、Multi-Head、Mask行列の計算は <a href="quiz.html?id=03_dl_transformer">3-（6）Transformer</a>。ELMo・fastText・BPE・SentencePieceは <a href="quiz.html?id=04_app_nlp_advanced">4-（5）関連知識</a>。本章はシラバス本線のLSI・n-gram・Word2Vec・BERT・GPT-n・基盤モデル・Prompt・RAGへ集中します。</div>

        <h3>■ 略語は最初にこれだけ：正式名称＋一言</h3>
        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>略語（正式名称）</th><th>簡単にいうと</th></tr>
                <tr><td><strong>LSI</strong>（Latent Semantic Indexing）</td><td>単語×文書行列を低次元化し、背後の話題を取り出す。</td></tr>
                <tr><td><strong>CBOW</strong>（Continuous Bag-of-Words）</td><td>周辺語をまとめて中央語を予測するWord2Vec方式。</td></tr>
                <tr><td><strong>BERT</strong>（Bidirectional Encoder Representations from Transformers）</td><td>左右の文脈を使うEncoder-onlyの理解系モデル。</td></tr>
                <tr><td><strong>MLM</strong>（Masked Language Modeling）</td><td>一部のトークンを予測する、原典BERTの穴埋め学習。</td></tr>
                <tr><td><strong>NSP</strong>（Next Sentence Prediction）</td><td>2文が本当に連続するかを判定する、原典BERTの学習課題。</td></tr>
                <tr><td><strong>GPT</strong>（Generative Pre-trained Transformer）</td><td>過去から次トークンを予測するDecoder-onlyの生成系モデル。</td></tr>
                <tr><td><strong>CLM</strong>（Causal Language Modeling）</td><td>未来を隠し、過去から次トークンを予測する学習。</td></tr>
                <tr><td><strong>LLM</strong>（Large Language Model）</td><td>大量データ・大規模パラメータで事前学習した言語モデル。</td></tr>
                <tr><td><strong>RAG</strong>（Retrieval-Augmented Generation）</td><td>外部文書を検索し、その内容を追加してから生成する。</td></tr>
            </table>
        </div>

        <h3>■ 1. Word Embedding：単語を計算できる座標へ</h3>
        <div class="nlp-core"><strong>分布仮説：</strong>似た文脈に現れる単語は、似た意味を持つ。Word2Vecはこの考えを利用し、各単語を低次元の密なベクトルで表します。</div>
        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>方法</th><th>何を見るか</th><th>試験の合図</th></tr>
                <tr><td><strong>n-gram</strong></td><td>連続するn個のトークンを1組として数える。</td><td>$L\\ge n$かつ境界記号なしなら$L-n+1$個。</td></tr>
                <tr><td><strong>LSI</strong></td><td>単語×文書行列を切り詰めSVD（Singular Value Decomposition／特異値分解）で低ランク近似。</td><td>潜在トピック・次元削減。</td></tr>
                <tr><td><strong>Word2Vec</strong></td><td>中央語と周辺語の予測課題を通じて埋め込みを学ぶ。</td><td>CBOW・Skip-gram・Negative Sampling。</td></tr>
            </table>
        </div>
        <div class="nlp-formula">$\\displaystyle \\text{n-gram数}=L-n+1,\\qquad E\\in\\mathbb{R}^{V\\times D},\\qquad \\text{埋め込み表1枚のパラメータ数}=V\\times D$</div>
        <div class="nlp-note"><strong>重み数の注意：</strong>問題が「埋め込み行列1枚」と指定したら$V\\times D$。Word2Vecの学習で入力側・出力側の2行列を両方数える指定なら$2VD$です。</div>

        <div class="nlp-visual-wrap">
            <div class="nlp-visual-card">
                <svg class="nlp-wide-svg" viewBox="0 0 960 315" role="img" aria-labelledby="nlp-w2v-title nlp-w2v-desc">
                    <title id="nlp-w2v-title">CBOWとSkip-gramの矢印の向き</title>
                    <desc id="nlp-w2v-desc">CBOWは周辺語から中央語を予測し、Skip-gramは中央語から各周辺語を予測する。</desc>
                    <defs><marker id="nlp-arrow-w2v" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="nlp-svg-title">例文：毎朝｜赤い｜りんご｜を｜食べる（窓幅2）</text>
                    <g transform="translate(18 45)"><rect x="0" y="0" width="120" height="36" rx="6" fill="#f8fafc" stroke="#9fb3c8"/><text x="43" y="23" class="nlp-svg-label">毎朝</text><rect x="130" y="0" width="120" height="36" rx="6" fill="#f8fafc" stroke="#9fb3c8"/><text x="171" y="23" class="nlp-svg-label">赤い</text><rect x="260" y="0" width="120" height="36" rx="6" fill="#fdebd0" stroke="#f39c12" stroke-width="2"/><text x="296" y="23" class="nlp-svg-label">りんご</text><rect x="390" y="0" width="120" height="36" rx="6" fill="#f8fafc" stroke="#9fb3c8"/><text x="443" y="23" class="nlp-svg-label">を</text><rect x="520" y="0" width="120" height="36" rx="6" fill="#f8fafc" stroke="#9fb3c8"/><text x="556" y="23" class="nlp-svg-label">食べる</text><text x="677" y="23" class="nlp-svg-note">中央＝対象語、左右2語ずつ＝文脈語</text></g>
                    <g transform="translate(22 110)">
                        <rect width="430" height="166" rx="11" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                        <text x="142" y="28" class="nlp-svg-title">CBOW：周 → 中</text>
                        <text x="25" y="59" class="nlp-svg-note">毎朝・赤い・を・食べる</text><rect x="26" y="72" width="153" height="38" rx="7" fill="#fff" stroke="#2780b8"/><text x="47" y="96" class="nlp-svg-label">文脈を平均・集約</text>
                        <path d="M186 91 H250" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-w2v)"/>
                        <rect x="262" y="72" width="130" height="38" rx="7" fill="#d6ecfa" stroke="#2780b8"/><text x="289" y="96" class="nlp-svg-label">りんごを予測</text>
                        <text x="25" y="139" class="nlp-svg-label">入力＝複数の周辺語／正解＝中央語</text>
                    </g>
                    <g transform="translate(508 110)">
                        <rect width="430" height="166" rx="11" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                        <text x="123" y="28" class="nlp-svg-title">Skip-gram：中 → 周</text>
                        <rect x="26" y="66" width="116" height="38" rx="7" fill="#fdebd0" stroke="#f39c12"/><text x="52" y="90" class="nlp-svg-label">りんご</text>
                        <path d="M150 85 H201" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-w2v)"/>
                        <g transform="translate(213 49)"><rect width="80" height="30" rx="5" fill="#fff" stroke="#f39c12"/><text x="26" y="20" class="nlp-svg-note">毎朝</text><rect x="90" width="80" height="30" rx="5" fill="#fff" stroke="#f39c12"/><text x="118" y="20" class="nlp-svg-note">赤い</text><rect y="40" width="80" height="30" rx="5" fill="#fff" stroke="#f39c12"/><text x="35" y="60" class="nlp-svg-note">を</text><rect x="90" y="40" width="80" height="30" rx="5" fill="#fff" stroke="#f39c12"/><text x="112" y="60" class="nlp-svg-note">食べる</text></g>
                        <text x="25" y="139" class="nlp-svg-label">入力＝中央語／正解＝周辺語ごとに1ペア</text>
                    </g>
                </svg>
            </div>
            <div class="nlp-caption"><strong>一言暗記：</strong>CBOW＝周→中、Skip-gram＝中→周。窓幅2で文端でなければ周辺語は最大4個なので、Skip-gramの正例ペアも4組です。</div>
        </div>
        <div class="nlp-core"><strong>Negative Sampling：</strong>正しい「中央語・周辺語」1組を正例、ランダムに選んだ誤った組を負例として二値分類します。負例を$k$個選ぶなら、正例1＋負例$k$＝$k+1$件を判定。全語彙Softmaxを使わず計算を軽くします。</div>

        <h3>■ 2. BERT：前後を見て、入力を理解する</h3>
        <div class="nlp-visual-wrap">
            <div class="nlp-visual-card">
                <svg class="nlp-wide-svg" viewBox="0 0 960 330" role="img" aria-labelledby="nlp-bert-input-title nlp-bert-input-desc">
                    <title id="nlp-bert-input-title">BERTの入力と3種類の埋め込み</title>
                    <desc id="nlp-bert-input-desc">BERTではCLS、文A、SEP、文B、SEPの各位置でToken、Position、Segmentの3埋め込みを加算してEncoderへ入れる。</desc>
                    <defs><marker id="nlp-arrow-bert-input" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="nlp-svg-title">2文入力の基本形：[CLS] 文A [SEP] 文B [SEP]</text>
                    <g transform="translate(25 48)">
                        <rect x="0" y="0" width="90" height="38" rx="6" fill="#d6ecfa" stroke="#2780b8"/><text x="26" y="24" class="nlp-svg-label">[CLS]</text>
                        <rect x="100" y="0" width="90" height="38" rx="6" fill="#eef7fb" stroke="#2780b8"/><text x="113" y="24" class="nlp-svg-note">文A token列</text>
                        <rect x="200" y="0" width="90" height="38" rx="6" fill="#d6ecfa" stroke="#2780b8"/><text x="226" y="24" class="nlp-svg-label">[SEP]</text>
                        <rect x="300" y="0" width="90" height="38" rx="6" fill="#fff8e7" stroke="#f39c12"/><text x="313" y="24" class="nlp-svg-note">文B token列</text>
                        <rect x="400" y="0" width="90" height="38" rx="6" fill="#fdebd0" stroke="#f39c12"/><text x="426" y="24" class="nlp-svg-label">[SEP]</text>
                        <text x="530" y="24" class="nlp-svg-note">CLS＝分類用の代表／SEP＝区切り</text>
                    </g>
                    <text x="352" y="106" class="nlp-svg-label">各token位置ごとに加算</text>
                    <g transform="translate(46 118)">
                        <rect width="205" height="48" rx="8" fill="#f4ecf7" stroke="#8e44ad"/><text x="35" y="22" class="nlp-svg-label">Token Embedding</text><text x="27" y="39" class="nlp-svg-note">何というtokenか</text>
                        <text x="269" y="31" class="nlp-svg-title">＋</text>
                        <rect x="315" width="205" height="48" rx="8" fill="#eef7fb" stroke="#2780b8"/><text x="345" y="22" class="nlp-svg-label">Position Embedding</text><text x="354" y="39" class="nlp-svg-note">何番目の位置か</text>
                        <text x="538" y="31" class="nlp-svg-title">＋</text>
                        <rect x="584" width="205" height="48" rx="8" fill="#fff8e7" stroke="#f39c12"/><text x="617" y="22" class="nlp-svg-label">Segment Embedding</text><text x="630" y="39" class="nlp-svg-note">文Aか文Bか</text>
                    </g>
                    <path d="M448 178 V214" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-bert-input)"/>
                    <rect x="310" y="225" width="340" height="56" rx="9" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/><text x="385" y="248" class="nlp-svg-label">要素ごとに加算 → BERT Encoder</text><text x="371" y="267" class="nlp-svg-note">3つが各768次元なら、加算後も768次元</text>
                    <text x="25" y="312" class="nlp-svg-note">※Segment Embeddingは文の区別。Position Embeddingは文中の順番。役割を入れ替えない。</text>
                </svg>
            </div>
            <div class="nlp-caption"><strong>入力長の数え方：</strong>文Aが$a$ token、文Bが$b$ tokenなら、<code>[CLS]</code> 1個＋<code>[SEP]</code> 2個も含めて$a+b+3$ token。</div>
        </div>

        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>原典BERTの段階</th><th>何をするか</th><th>試験ポイント</th></tr>
                <tr><td><strong>事前学習</strong></td><td>大量のラベルなし文章でMLMとNSPを学ぶ。</td><td>汎用的な言語表現を作る。</td></tr>
                <tr><td><strong>MLM</strong></td><td>全tokenの15%を予測対象に選ぶ。選択分の80%を[MASK]、10%をランダム語、10%を元の語のまま入力。</td><td>15%すべてを[MASK]へ変えるわけではない。</td></tr>
                <tr><td><strong>NSP</strong></td><td>文Bが文Aの本当の続きかを二値分類。</td><td>原典BERTの課題。後続モデルが必ず使うとは限らない。</td></tr>
                <tr><td><strong>Fine-tuning</strong></td><td>タスク用Headを加え、事前学習済み重みの全部または一部を更新。</td><td>Promptだけ与える方法と違い、重みを更新する。</td></tr>
            </table>
        </div>
        <div class="nlp-note"><strong>BERT BASE / LARGEの定番：</strong>BASE＝12層・隠れ768・12 head、LARGE＝24層・隠れ1024・16 head。構造はEncoder-onlyです。</div>

        <h3>■ 3. BERT vs GPT：見える範囲と学習課題</h3>
        <div class="nlp-visual-wrap">
            <div class="nlp-visual-card">
                <svg class="nlp-wide-svg" viewBox="0 0 960 345" role="img" aria-labelledby="nlp-bert-gpt-title nlp-bert-gpt-desc">
                    <title id="nlp-bert-gpt-title">BERTとGPTの参照範囲と学習課題</title>
                    <desc id="nlp-bert-gpt-desc">BERTは入力列の左右を参照してマスク語を予測し、GPTは未来を隠して過去から次の語を予測する。</desc>
                    <defs><marker id="nlp-arrow-bert-gpt" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <g transform="translate(20 25)">
                        <rect width="445" height="285" rx="12" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                        <text x="114" y="30" class="nlp-svg-title">BERT（Encoder-only）</text>
                        <g transform="translate(28 62)"><rect width="55" height="36" rx="5" fill="#fff" stroke="#2780b8"/><text x="10" y="23" class="nlp-svg-mini">[CLS]</text><rect x="63" width="45" height="36" rx="5" fill="#fff" stroke="#2780b8"/><text x="79" y="23" class="nlp-svg-label">私</text><rect x="116" width="45" height="36" rx="5" fill="#fff" stroke="#2780b8"/><text x="132" y="23" class="nlp-svg-label">は</text><rect x="169" width="64" height="36" rx="5" fill="#d6ecfa" stroke="#2780b8"/><text x="177" y="23" class="nlp-svg-mini">[MASK]</text><rect x="241" width="45" height="36" rx="5" fill="#fff" stroke="#2780b8"/><text x="251" y="23" class="nlp-svg-label">好き</text><rect x="294" width="55" height="36" rx="5" fill="#fff" stroke="#2780b8"/><text x="304" y="23" class="nlp-svg-mini">[SEP]</text></g>
                        <path d="M166 120 Q194 145 222 104" fill="none" stroke="#2780b8" stroke-width="2" marker-end="url(#nlp-arrow-bert-gpt)"/><path d="M292 120 Q264 145 236 104" fill="none" stroke="#2780b8" stroke-width="2" marker-end="url(#nlp-arrow-bert-gpt)"/>
                        <text x="108" y="183" class="nlp-svg-label">MLM：予測 [MASK]＝猫</text>
                        <text x="84" y="213" class="nlp-svg-note">分類・抽出・質問応答などの理解系</text>
                        <text x="67" y="243" class="nlp-svg-note">[MASK]は事前学習用。通常入力に必須ではない</text>
                    </g>
                    <g transform="translate(495 25)">
                        <rect width="445" height="285" rx="12" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                        <text x="119" y="30" class="nlp-svg-title">GPT（Decoder-only）</text>
                        <g transform="translate(28 62)"><rect width="55" height="36" rx="5" fill="#fff" stroke="#f39c12"/><text x="14" y="23" class="nlp-svg-note">開始</text><path d="M58 18 H67" stroke="#627d98" marker-end="url(#nlp-arrow-bert-gpt)"/><rect x="70" width="45" height="36" rx="5" fill="#fff" stroke="#f39c12"/><text x="86" y="23" class="nlp-svg-label">私</text><path d="M118 18 H127" stroke="#627d98" marker-end="url(#nlp-arrow-bert-gpt)"/><rect x="130" width="45" height="36" rx="5" fill="#fff" stroke="#f39c12"/><text x="146" y="23" class="nlp-svg-label">は</text><path d="M178 18 H187" stroke="#627d98" marker-end="url(#nlp-arrow-bert-gpt)"/><rect x="190" width="45" height="36" rx="5" fill="#fff" stroke="#f39c12"/><text x="206" y="23" class="nlp-svg-label">猫</text><path d="M238 18 H247" stroke="#627d98" marker-end="url(#nlp-arrow-bert-gpt)"/><rect x="250" width="88" height="36" rx="5" fill="#fdebd0" stroke="#f39c12"/><text x="269" y="23" class="nlp-svg-label">次の語</text></g>
                        <path d="M322 101 V142" stroke="#f39c12" stroke-width="2" stroke-dasharray="6,4" marker-end="url(#nlp-arrow-bert-gpt)"/><text x="73" y="160" class="nlp-svg-note">生成tokenを末尾へ追加し、さらに次を予測</text>
                        <path d="M392 57 V171" stroke="#d64545" stroke-width="2" stroke-dasharray="5,4"/><text x="350" y="188" class="nlp-svg-note">未来は見ない</text>
                        <text x="92" y="213" class="nlp-svg-label">CLM：過去から次token</text>
                        <text x="100" y="243" class="nlp-svg-note">文章生成・対話・要約など</text>
                    </g>
                </svg>
            </div>
            <div class="nlp-caption"><strong>一言暗記：</strong>BERT＝前後を見て穴埋め／GPT＝過去だけ見て続きを生成。BERTが「[MASK]なしでは動かない」わけではありません。</div>
        </div>

        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>比較</th><th>BERT</th><th>GPT</th></tr>
                <tr><td><strong>基本構造</strong></td><td>Encoder-only</td><td>Causal Self-Attentionを持つDecoder-only。通常Cross-Attentionなし。</td></tr>
                <tr><td><strong>事前学習</strong></td><td>MLM＋原典ではNSP</td><td>CLM（Causal Language Modeling）／Next Token Prediction</td></tr>
                <tr><td><strong>各位置から見える範囲</strong></td><td>左右の入力token</td><td>自分自身と過去。未来tokenは見ない。</td></tr>
                <tr><td><strong>代表用途</strong></td><td>分類・抽出・系列ラベリング</td><td>生成・対話・要約</td></tr>
            </table>
        </div>

        <h3>■ 4. GPT-n：Next Token Predictionから基盤モデルへ</h3>
        <div class="nlp-core"><strong>基盤モデル（Foundation Model）：</strong>大規模かつ広いデータで事前学習し、Prompt、Few-shot、Fine-tuningなどで多くの下流タスクへ適応できる土台となるモデルです。</div>
        <div class="nlp-formula">$\\displaystyle P(x_{1:T})=\\prod_{t=1}^{T}P(x_t\\mid x_{&lt;t})$</div>
        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>場面</th><th>何が起きるか</th><th>試験の罠</th></tr>
                <tr><td><strong>学習時</strong></td><td>正解系列をずらした教師にし、Causal Maskの下で各位置の損失を並列計算できる。</td><td>学習まで必ず1tokenずつ逐次計算、ではない。</td></tr>
                <tr><td><strong>推論時</strong></td><td>1token生成し、そのtokenを入力へ追加して次を生成。</td><td>未来の正解tokenは存在しないため逐次生成。</td></tr>
            </table>
        </div>
        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>適応方法</th><th>Prompt内の例</th><th>重み更新</th></tr>
                <tr><td><strong>Zero-shot</strong></td><td>0個。指示だけ。</td><td>なし</td></tr>
                <tr><td><strong>One-shot</strong></td><td>1個。</td><td>なし</td></tr>
                <tr><td><strong>Few-shot</strong></td><td>少数個。</td><td>なし</td></tr>
                <tr><td><strong>Fine-tuning</strong></td><td>例をPromptへ置くことが本質ではない。</td><td>あり</td></tr>
            </table>
        </div>

        <h3>■ RAG：覚え直すのではなく、資料を探してから答える</h3>
        <div class="nlp-visual-wrap">
            <div class="nlp-visual-card">
                <svg class="nlp-wide-svg" viewBox="0 0 960 235" role="img" aria-labelledby="nlp-rag-title nlp-rag-desc">
                    <title id="nlp-rag-title">RAGの4段階</title>
                    <desc id="nlp-rag-desc">質問を受け、外部文書を検索し、関連文書を質問へ追加し、その根拠を使って回答を生成する。</desc>
                    <defs><marker id="nlp-arrow-rag" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="nlp-svg-title">Retrieval（検索）で文脈を増やしてからGeneration（生成）</text>
                    <g transform="translate(25 58)"><rect width="180" height="105" rx="10" fill="#eef7fb" stroke="#2780b8"/><text x="62" y="29" class="nlp-svg-title">① 質問</text><text x="45" y="57" class="nlp-svg-label">ユーザー入力</text><text x="38" y="80" class="nlp-svg-note">「最新規程は？」</text></g>
                    <path d="M211 110 H251" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-rag)"/>
                    <g transform="translate(262 58)"><rect width="180" height="105" rx="10" fill="#f4ecf7" stroke="#8e44ad"/><text x="62" y="29" class="nlp-svg-title">② 検索</text><text x="38" y="57" class="nlp-svg-label">外部DBから取得</text><text x="23" y="80" class="nlp-svg-note">関連度が高い文書をk件</text></g>
                    <path d="M448 110 H488" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-rag)"/>
                    <g transform="translate(499 58)"><rect width="180" height="105" rx="10" fill="#fff8e7" stroke="#f39c12"/><text x="42" y="29" class="nlp-svg-title">③ 文脈追加</text><text x="30" y="57" class="nlp-svg-label">質問＋取得文書</text><text x="37" y="80" class="nlp-svg-note">Generatorへ入力</text></g>
                    <path d="M685 110 H725" stroke="#627d98" stroke-width="2" marker-end="url(#nlp-arrow-rag)"/>
                    <g transform="translate(736 58)"><rect width="180" height="105" rx="10" fill="#eafaf1" stroke="#27ae60"/><text x="62" y="29" class="nlp-svg-title">④ 生成</text><text x="32" y="57" class="nlp-svg-label">文書を根拠に回答</text><text x="37" y="80" class="nlp-svg-note">検索失敗の影響あり</text></g>
                    <text x="25" y="204" class="nlp-svg-note">文書DBは更新しやすい。一方、RAGでも誤検索・文書無視・誤生成は起こり得る。</text>
                </svg>
            </div>
        </div>
        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>比較</th><th>RAG</th><th>Fine-tuning</th></tr>
                <tr><td><strong>知識・適応の入れ方</strong></td><td>推論時に外部文書を追加。</td><td>学習で重みを更新。</td></tr>
                <tr><td><strong>向く場面</strong></td><td>頻繁に変わる知識、社内文書、根拠提示。</td><td>文体、出力形式、タスク固有の振る舞い。</td></tr>
            </table>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="nlp-table-wrap">
            <table class="nlp-table">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>単語×文書行列を低ランク化</td><td><strong>LSI（Latent Semantic Indexing）</strong></td><td>SVDで潜在的な話題を取り出す。</td></tr>
                <tr><td>連続するn個のtoken</td><td><strong>n-gram</strong></td><td>長さ$L$なら$L-n+1$個。</td></tr>
                <tr><td>周辺語から中央語</td><td><strong>CBOW（Continuous Bag-of-Words）</strong></td><td>周→中。</td></tr>
                <tr><td>中央語から周辺語</td><td><strong>Skip-gram</strong></td><td>中→周。</td></tr>
                <tr><td>正例＋少数の負例を二値識別</td><td><strong>Negative Sampling</strong></td><td>全語彙Softmaxを避ける。</td></tr>
                <tr><td>双方向Encoder・穴埋め</td><td><strong>BERT／MLM</strong></td><td>入力の左右を参照する。</td></tr>
                <tr><td>Token＋Position＋Segment</td><td><strong>BERTの入力Embedding</strong></td><td>3つを加算して次元は不変。</td></tr>
                <tr><td>事前学習済み重みを下流タスクで更新</td><td><strong>Fine-tuning</strong></td><td>タスク用Headを加えて微調整。</td></tr>
                <tr><td>Causal・Next Token Prediction</td><td><strong>GPT（Generative Pre-trained Transformer）</strong></td><td>過去から次tokenを予測。</td></tr>
                <tr><td>例なし／少数例をPromptへ</td><td><strong>Zero-shot／Few-shot</strong></td><td>In-context Learningでは重み更新なし。</td></tr>
                <tr><td>多用途へ適応できる事前学習済み土台</td><td><strong>Foundation Model（基盤モデル）</strong></td><td>PromptやFine-tuningで下流タスクへ適応。</td></tr>
                <tr><td>外部文書を検索してから生成</td><td><strong>RAG（Retrieval-Augmented Generation）</strong></td><td>質問→検索→文脈追加→生成。</td></tr>
            </table>
        </div>
    `,

    questions: [
        {
            category: "分布仮説",
            question: "Word2Vecなどの単語埋め込み技術の基礎となっている、「単語の意味は、その周囲に現れる単語によって決まる」という考え方を何と呼ぶか。",
            options: ["分布仮説 (Distributional Hypothesis)", "万能近似定理", "ノーフリーランチ定理", "残差学習"],
            answer: 0,
            explanation: "単語の意味を辞書だけで決めず、『どの単語の近くに現れるか』から捉える考え方です。似た文脈で使われる単語は、ベクトル空間でも近くなるよう学習されます。"
        },
        {
            category: "Word2Vec",
            question: "Word2Vecの手法のうち、ある単語を入力として、その周辺にある単語（文脈）を予測するように学習するモデルはどれか。",
            options: ["Skip-gram", "CBOW (Continuous Bag-of-Words)", "GloVe", "LSI"],
            answer: 0,
            explanation: "Skip-gramは中央語を入力し、周辺語を1語ずつ正解として学びます。覚え方は『中→周』です。"
        },
        {
            category: "CBOW",
            question: "CBOW (Continuous Bag-of-Words) の特徴として正しいものはどれか。",
            options: ["周辺の複数の単語から、中心の単語を予測する", "中心の単語から、周辺の単語を予測する", "文章全体のトピックだけを予測する", "次の文が連続するかを予測する"],
            answer: 0,
            explanation: "CBOWは周辺語のベクトルを平均・合計などで集約し、中央語を予測します。覚え方は『周→中』です。"
        },
        {
            category: "BERTの構造",
            question: "BERTのアーキテクチャは、Transformerのどの部分に基づいているか。",
            options: ["Encoderのみ", "Decoderのみ", "EncoderとDecoderの両方", "Attention機構のみ（FFNなし）"],
            answer: 0,
            explanation: "BERTはEncoder-only型です。Causal Maskで未来を隠すのではなく、入力の左右の文脈を使って各tokenの表現を作ります。"
        },
        {
            category: "BERTの事前学習",
            question: "BERTの事前学習タスクの一つである「MLM（Masked Language Modeling）」とはどのようなものか。",
            options: ["入力文の一部を予測対象にし、前後の文脈から元の単語を当てる", "次の単語だけを左から右へ予測する", "画像の一部を復元する", "文章の感情ラベルだけを予測する"],
            answer: 0,
            explanation: "MLMは穴埋め型の学習です。原典BERTでは全tokenの15%を予測対象に選びますが、その15%すべてを[MASK]へ置換するわけではありません。"
        },
        {
            category: "GPTの構造",
            question: "GPT (Generative Pre-trained Transformer) のアーキテクチャは、Transformerのどの部分に基づいているか。",
            options: ["Causal Self-Attentionを持つDecoder-only型", "Encoder-only型", "必ずEncoderとDecoderの両方", "RNNのみ"],
            answer: 0,
            explanation: "GPTはDecoder-only型で、通常はEncoderやCross-Attentionを持ちません。Causal Maskにより各位置から未来tokenを見ず、次tokenを予測します。"
        },
        {
            category: "GPTの特性",
            question: "GPTのような「左から右へ」単語を予測していくモデルを何と呼ぶか。",
            options: ["自己回帰モデル (Autoregressive Model)", "自己符号化器 (Autoencoder)", "双方向モデル (Bidirectional Model)", "識別モデルだけ"],
            answer: 0,
            explanation: "自分が生成したtokenも次の入力へ加え、1tokenずつ続きを生成します。『過去の出力を使って次を出す』のが自己回帰です。"
        },
        {
            category: "NSP",
            question: "BERTのもう一つの事前学習タスク「NSP (Next Sentence Prediction)」の目的は何か。",
            options: ["2つの文が本当に連続しているかを判定すること", "次tokenを左から右へ生成すること", "単語を画像へ変換すること", "文法誤りだけを訂正すること"],
            answer: 0,
            explanation: "文Aと文Bを入力し、文Bが文Aの本当の続きかを二値分類します。NSPは原典BERTの課題であり、後続モデルが必ず採用するわけではありません。"
        },
        {
            category: "Negative Sampling",
            question: "Word2Vecの学習を高速化するために用いられる「Negative Sampling」とはどのような手法か。",
            options: ["正しい単語ペアと、少数の誤った単語ペアを二値分類する", "負の値をすべて0にする", "学習率を負にする", "全語彙の確率を毎回厳密計算する"],
            answer: 0,
            explanation: "全語彙Softmaxを使わず、正例と少数の負例の二値識別へ置き換えます。『Softmaxの分母を少数語で近似する』というより、別の二値分類目的で学ぶと捉えるのが正確です。"
        },
        {
            category: "BERTの入力",
            question: "BERTに入力する際、先頭に付与する特殊トークン `[CLS]` は、主に何のために使われるか。",
            options: ["文全体の分類で代表ベクトルとして使う", "文Aと文Bの区切りだけを表す", "MLMで隠した語を表す", "未知語だけを表す"],
            answer: 0,
            explanation: "[CLS]位置の最終出力を文分類用の代表表現として利用します。文や文ペアの区切りには[SEP]、MLMの置換には[MASK]を使います。"
        },
        {
            category: "BERTのMLM",
            question: "BERTの事前学習において、予測対象として選ばれる入力トークンは原典設定でおよそ何%か。",
            options: ["15%", "100%", "50%", "1%"],
            answer: 0,
            explanation: "全tokenの15%を予測対象に選びます。そのうち80%を[MASK]、10%をランダム語、10%を元の語のまま入力します。したがって『15%全部が[MASK]』ではありません。"
        },
        {
            category: "BERTのPosition Embedding",
            question: "BERTでToken Embedding、Position Embedding、Segment Embeddingを組み合わせる方法はどれか。",
            options: ["同じ次元の3ベクトルを要素ごとに加算する", "連結して次元を3倍にする", "Positionだけを入力する", "SegmentをSoftmaxする"],
            answer: 0,
            explanation: "3種類を要素ごとに足します。例えば各768次元なら、加算後も768次元です。Positionは位置、Segmentは文A/Bを表します。"
        },
        {
            category: "GPTのFew-shot",
            question: "GPT-3などで注目された「Few-shot Learning（In-context Learning）」とはどのような使いかたか。",
            options: ["重みを更新せず、プロンプトに少数の入出力例を含める", "少量データで必ずFine-tuningする", "モデルの一部だけを削除する", "画像だけを入力する"],
            answer: 0,
            explanation: "Prompt内に少数例を示し、続き予測能力で同じ形式の回答を引き出します。In-context Learningでは推論中にモデル重みを更新しません。"
        },
        {
            category: "BERTのFine-tuning",
            question: "BERTを特定のタスク（例：感情分析）にFine-tuningする際、一般的に行われる操作はどれか。",
            options: ["事前学習済み重みを初期値にし、タスク用Headを加えて全部または一部の重みを更新する", "重みを一切更新せずPromptだけ変える", "全てを必ずランダム初期化する", "Encoderを捨ててRNNだけを学習する"],
            answer: 0,
            explanation: "Fine-tuningは事前学習で得た汎用表現を出発点にし、下流タスク用データで重みを微調整します。『重み更新あり』がIn-context Learningとの分かれ目です。"
        },
        {
            id: "nlp-next-token-objective",
            category: "Next Token Prediction",
            question: "GPT系モデルのNext Token Predictionで最小化する代表的な損失はどれか。",
            options: ["各位置の次トークンに対するクロスエントロピー", "画像のIoU", "Triplet Lossのみ", "再構成画像のMSEのみ"],
            answer: 0,
            explanation: "各位置で正解の次tokenへ高い確率を割り当てるよう、語彙分布と正解tokenのクロスエントロピーを最小化します。"
        },
        {
            id: "nlp-autoregressive-factorization",
            category: "自己回帰（数式）",
            question: "系列確率の自己回帰分解として正しいものはどれか。",
            options: ["$P(x_{1:T})=\\prod_tP(x_t|x_{&lt;t})$", "$P(x_{1:T})=\\sum_tP(x_t)$", "$P(x_{1:T})=P(x_T)$", "$P(x_{1:T})=\\prod_tP(x_t|x_{&gt;t})$"],
            answer: 0,
            explanation: "系列全体の確率は、各tokenの『それ以前を条件とした確率』の積です。未来$x_{>t}$は条件に入りません。"
        },
        {
            id: "nlp-rag-order",
            category: "RAG",
            question: "RAGの一般的な処理順として正しいものはどれか。",
            options: ["質問 → 関連文書を検索 → 文書を文脈に追加 → 回答生成", "回答生成 → 文書検索 → 質問", "モデルを再学習 → 質問を削除 → 回答", "質問 → 画像分類 → 回答"],
            answer: 0,
            explanation: "Retrievalで関連文書を取り出し、質問と取得文書をGeneratorへ渡して回答します。順番は『質問→検索→追加→生成』です。"
        },
        {
            id: "nlp-rag-vs-finetune",
            category: "RAG（識別）",
            question: "社内規程が毎週更新され、回答に参照根拠も示したい。まず検討すべき方法はどれか。",
            options: ["更新文書を検索対象にできるRAG", "毎回モデルをゼロから事前学習", "Dropout率だけを変更", "画像のShifted Window"],
            answer: 0,
            explanation: "頻繁に変わる外部知識は、文書DBを差し替えられるRAGと相性が良いです。ただし検索に失敗すれば回答品質も落ちます。"
        },
        {
            id: "nlp-lsi-svd",
            category: "LSI",
            difficulty: "必須",
            question: "LSI（Latent Semantic Indexing）の基本的な考え方として正しいものはどれか。",
            options: ["単語×文書行列をSVDで低ランク近似し、潜在的な意味・話題を表す", "次tokenを自己回帰生成する", "画像を畳み込む", "Q値を最大化する"],
            answer: 0,
            explanation: "①単語と文書の出現関係を行列にする、②SVD（Singular Value Decomposition／特異値分解）で分解する、③上位の成分だけ残す、という流れです。表面上異なる単語でも、文書での使われ方が似れば近い潜在表現になります。"
        },
        {
            id: "nlp-ngram-count",
            category: "n-gram（計算）",
            difficulty: "必須",
            question: "境界記号を追加しない。7 tokenから連続3 tokenの3-gramはいくつ作れるか。",
            options: ["5個", "7個", "21個", "4個"],
            answer: 0,
            explanation: "長さ$L$から作れるn-gram数は$L-n+1$です。ここでは$7-3+1=5$個。開始位置が1〜5の5通りです。"
        },
        {
            id: "nlp-embedding-params",
            category: "Embedding（計算）",
            difficulty: "必須",
            question: "語彙数$V=10,000$、埋め込み次元$D=300$のEmbedding行列1枚に含まれるパラメータ数はいくつか。",
            options: ["3,000,000", "30,000", "10,300", "300"],
            answer: 0,
            explanation: "Embedding行列は$V×D$なので、$10,000×300=3,000,000$です。入力側・出力側の2行列を両方数える指定なら2倍ですが、この問題は1枚と明記しています。"
        },
        {
            id: "nlp-skipgram-positive-pairs",
            category: "Skip-gram（計算）",
            difficulty: "必須",
            question: "文端ではない中央語に窓幅2のSkip-gramを使う。左右2語ずつを周辺語とすると、この中央語から作る正例ペアはいくつか。",
            options: ["4組", "2組", "1組", "8組"],
            answer: 0,
            explanation: "左に2語、右に2語あるため周辺語は$2+2=4$語です。中央語と各周辺語を1組ずつにするので正例ペアは4組です。"
        },
        {
            id: "nlp-cbow-average",
            category: "CBOW（計算）",
            difficulty: "計算",
            question: "単純なCBOWで、2つの文脈語ベクトル$(1,2)$と$(3,0)$を平均する。集約後のベクトルはどれか。",
            options: ["$(2,1)$", "$(4,2)$", "$(1,1)$", "$(3,2)$"],
            answer: 0,
            explanation: "各次元を別々に平均します。第1次元は$(1+3)/2=2$、第2次元は$(2+0)/2=1$なので$(2,1)$です。"
        },
        {
            id: "nlp-negative-sampling-count",
            category: "Negative Sampling（計算）",
            difficulty: "必須",
            question: "正例100組の各々に負例を5組ずつ付ける。負例数と二値判定の総数の組合せはどれか。",
            options: ["負例500組、総数600組", "負例100組、総数500組", "負例5組、総数105組", "負例600組、総数700組"],
            answer: 0,
            explanation: "負例は$100×5=500$組です。正例100組も判定するため、総数は$100+500=600$組です。"
        },
        {
            id: "nlp-static-contextual",
            category: "固定表現と文脈化表現",
            difficulty: "本試験型",
            question: "Word2VecとBERTの単語表現の違いとして最も適切なものはどれか。",
            options: ["Word2Vecは単語ごとに原則固定、BERTは周囲の文脈によって同じ単語の表現も変わる", "どちらも文脈に関係なくone-hot", "BERTだけが単語を固定ベクトルにする", "Word2Vecは必ず文章全体を生成する"],
            answer: 0,
            explanation: "Word2Vecの辞書では同じ表記の単語は原則1つのベクトルです。BERTは文全体をEncoderへ通すため、『銀行のbank』と『土手のbank』で出力表現が変わります。"
        },
        {
            id: "nlp-bert-embedding-dim",
            category: "BERT入力（計算）",
            difficulty: "必須",
            question: "Token・Position・Segment Embeddingがそれぞれ768次元である。3つをBERT方式で組み合わせた1 tokenの入力次元はいくつか。",
            options: ["768次元", "2304次元", "256次元", "3次元"],
            answer: 0,
            explanation: "3つは連結ではなく要素ごとに加算します。$768+768+768$と次元数を足すのではなく、同じ位置同士を足すため768次元のままです。"
        },
        {
            id: "nlp-bert-segment-role",
            category: "Segment Embedding",
            difficulty: "必須",
            question: "BERTのSegment Embeddingが主に表すものはどれか。",
            options: ["各tokenが文Aと文Bのどちらに属するか", "各tokenが何番目か", "語彙中の単語IDだけ", "MLMの正解確率"],
            answer: 0,
            explanation: "Segmentは2文入力で所属する文を区別します。Positionは順番、Tokenは単語・サブワードの種類なので、役割を混ぜないでください。"
        },
        {
            id: "nlp-bert-special-length",
            category: "BERT入力長（計算）",
            difficulty: "必須",
            question: "文Aが3 token、文Bが4 tokenである。`[CLS] 文A [SEP] 文B [SEP]` の総token数はいくつか。",
            options: ["10", "7", "8", "9"],
            answer: 0,
            explanation: "本文は$3+4=7$、特殊tokenは[CLS]が1個、[SEP]が2個です。合計$7+1+2=10$ tokenです。"
        },
        {
            id: "nlp-bert-mlm-801010-calc",
            category: "MLM（計算）",
            difficulty: "本試験型",
            question: "原典BERTのMLM設定を期待値として考える。200 tokenの15%を予測対象にし、その80%を[MASK]、10%をランダム語、10%を変更なしにする。各個数はどれか。",
            options: ["予測対象30、[MASK]24、ランダム3、変更なし3", "予測対象30、[MASK]30、ランダム0、変更なし0", "予測対象15、[MASK]12、ランダム2、変更なし1", "予測対象200、[MASK]160、ランダム20、変更なし20"],
            answer: 0,
            explanation: "①$200×0.15=30$個を選択。②$30×0.8=24$個を[MASK]。③残る20%を半分ずつなのでランダム3、変更なし3です。"
        },
        {
            id: "nlp-pretrain-finetune",
            category: "事前学習とFine-tuning",
            difficulty: "必須",
            question: "事前学習とFine-tuningの関係として正しいものはどれか。",
            options: ["事前学習で汎用表現を得て、Fine-tuningで下流タスク用データに合わせて重みを微調整する", "Fine-tuningの後に必ず重みを全削除する", "事前学習では画像ラベルだけを使う", "両者とも重みを一切更新しない"],
            answer: 0,
            explanation: "事前学習は大量データから汎用的な知識・表現を作る段階、Fine-tuningはその重みを出発点に分類など特定タスクへ適応する段階です。"
        },
        {
            id: "nlp-bert-base-large",
            category: "BERTモデルサイズ",
            difficulty: "発展",
            question: "原典BERTのBASEとLARGEの対応として正しいものはどれか。",
            options: ["BASE＝12層・768次元・12 head、LARGE＝24層・1024次元・16 head", "BASE＝24層・LARGE＝12層", "どちらも1層・1 head", "BASEだけDecoder-only"],
            answer: 0,
            explanation: "定番の数値セットです。BASEは12-768-12、LARGEは24-1024-16と覚えます。どちらもBERTなのでEncoder-onlyです。"
        },
        {
            id: "nlp-foundation-model",
            category: "基盤モデル",
            difficulty: "必須",
            question: "基盤モデル（Foundation Model）の説明として最も適切なものはどれか。",
            options: ["大規模・広範なデータで事前学習され、PromptやFine-tuningで多様な下流タスクへ適応できる土台", "1つの固定タスクだけを手作業規則で解くモデル", "検索DBだけで回答し生成をしない仕組み", "学習済み重みを持たない乱数"],
            answer: 0,
            explanation: "『土台』という名のとおり、1つの事前学習済みモデルをZero/Few-shot、Prompt、Fine-tuningなどで複数用途へ適応させます。"
        },
        {
            id: "nlp-gpt-train-infer",
            category: "GPTの学習と推論",
            difficulty: "本試験型",
            question: "自己回帰GPTの学習時と推論時の違いとして正しいものはどれか。",
            options: ["学習時は正解系列をずらして各位置の損失を並列計算できるが、推論時は生成tokenを戻し1tokenずつ進む", "学習時も推論時も未来の正解を自由に見る", "推論時だけ重みを毎token再学習する", "学習時はCausal Maskを使えない"],
            answer: 0,
            explanation: "学習データには正解系列全体があるため、Causal Maskで未来を隠しながら全位置をまとめて計算できます。推論では次の正解がないので、生成→追加入力を繰り返します。"
        },
        {
            id: "nlp-autoregressive-prob-calc",
            category: "自己回帰確率（計算）",
            difficulty: "必須",
            question: "$P(x_1)=0.5$、$P(x_2|x_1)=0.4$、$P(x_3|x_1,x_2)=0.2$のとき、系列$x_1,x_2,x_3$の確率はいくつか。",
            options: ["0.04", "1.1", "0.4", "0.02"],
            answer: 0,
            explanation: "自己回帰分解では条件付き確率を掛けます。$0.5×0.4×0.2=0.04$です。足し算ではありません。"
        },
        {
            id: "nlp-zero-few-shot",
            category: "Zero/Few-shot",
            difficulty: "必須",
            question: "重みを更新せず、指示だけを与える方法と、Prompt内に少数の入出力例も与える方法の組合せはどれか。",
            options: ["指示だけ＝Zero-shot、少数例あり＝Few-shot", "指示だけ＝Fine-tuning、少数例あり＝事前学習", "どちらもRAG", "どちらも必ず重み更新あり"],
            answer: 0,
            explanation: "Zeroは例が0、Oneは例が1、Fewは少数です。Prompt内で例を見せるIn-context Learningでは、モデル重みは更新しません。"
        },
        {
            id: "nlp-prompt-based-learning",
            category: "Prompt Based Learning",
            difficulty: "必須",
            question: "Prompt Based Learningの説明として最も適切なものはどれか。",
            options: ["指示文や例示など入力の与え方を設計し、事前学習済みモデルから目的の出力を引き出す", "モデルを毎回ゼロから学習する", "入力tokenをすべて削除する", "外部文書検索だけを行い生成しない"],
            answer: 0,
            explanation: "Promptはモデルに渡す文脈・指示・例の設計です。Promptを変えるだけなら通常は重みを更新しません。Fine-tuningとはそこが違います。"
        },
        {
            id: "nlp-bert-gpt-compare",
            category: "BERT vs GPT",
            difficulty: "本試験型",
            kind: "図表・長文",
            question: "BERTとGPTの組合せとして正しいものはどれか。",
            options: ["BERT＝Encoder-only・MLM・左右文脈、GPT＝Decoder-only・Next Token Prediction・未来を隠す", "BERT＝Decoder-only・次token生成、GPT＝Encoder-only・MLM", "どちらもRNNのみ", "どちらも未来tokenを常に参照する"],
            answer: 0,
            explanation: "構造・学習課題・見える範囲を1セットで覚えます。BERTは理解系の双方向Encoder、GPTはCausalなDecoder-onlyで自己回帰生成です。"
        }
    ]
};
