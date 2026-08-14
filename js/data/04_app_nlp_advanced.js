window.quizData = {
    title: "4-（5）関連知識：ELMo・fastText・Tokenization",

    cheatSheet: `
        <style>
            .nlpa-core { background:#eef8f8; border-left:5px solid #35b9c5; border-radius:0 10px 10px 0; padding:14px 18px; margin:12px 0 22px; }
            .nlpa-note { background:#fff8e8; border-left:5px solid #f39c12; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0; }
            .nlpa-link-map { background:#f5f7fa; border:1px solid #d9e2ec; border-radius:10px; padding:12px 16px; margin:12px 0 22px; }
            .nlpa-formula { background:#f7f9fc; border:1px solid #d9e2ec; border-radius:8px; padding:11px 14px; margin:10px 0; font-family:Georgia, "Times New Roman", serif; overflow-x:auto; }
            .nlpa-visual-wrap { overflow-x:auto; margin:14px 0 22px; }
            .nlpa-visual-card { min-width:990px; border:1px solid #d9e2ec; border-radius:12px; background:#fff; padding:12px; }
            .nlpa-wide-svg { display:block; width:100%; min-width:960px; height:auto; }
            .nlpa-svg-title { font-size:16px; font-weight:700; fill:#102a43; }
            .nlpa-svg-label { font-size:13px; font-weight:700; fill:#102a43; }
            .nlpa-svg-note { font-size:12px; fill:#334e68; }
            .nlpa-svg-mini { font-size:11px; fill:#486581; }
            .nlpa-svg-box { fill:#fff; stroke:#cbd5e1; stroke-width:1.5; rx:10; }
            .nlpa-svg-blue { fill:#eef6ff; stroke:#3498db; stroke-width:1.5; rx:10; }
            .nlpa-svg-green { fill:#effaf4; stroke:#27ae60; stroke-width:1.5; rx:10; }
            .nlpa-svg-orange { fill:#fff8e8; stroke:#f39c12; stroke-width:1.5; rx:10; }
            .nlpa-svg-purple { fill:#f7f0ff; stroke:#8e44ad; stroke-width:1.5; rx:10; }
            .nlpa-caption { margin:8px 8px 0; color:#334e68; }
            .nlpa-table-wrap { overflow-x:auto; margin:12px 0 22px; }
            .nlpa-table { width:100%; min-width:780px; border-collapse:collapse; }
            .nlpa-table th { background:#eaf2fb; color:#102a43; text-align:left; padding:10px; border:1px solid #d9e2ec; }
            .nlpa-table td { padding:10px; border:1px solid #d9e2ec; vertical-align:top; }
            .nlpa-steps { margin:8px 0 0; padding-left:1.5em; }
            .nlpa-steps li { margin:5px 0; }
            .nlpa-chip { display:inline-block; padding:2px 7px; margin:2px; border:1px solid #9fb3c8; border-radius:6px; background:#fff; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; }
        </style>

        <div class="nlpa-link-map"><strong>この章の位置づけ：</strong>本サイトでは、4-（4）のWord2Vec・BERT・GPTを比較して理解するための補足章を「4-（5）関連知識」としています。Q・K・VやAttention計算は <a href="quiz.html?id=03_dl_transformer">3-（6）Transformer</a>、NLP本線は <a href="quiz.html?id=04_app_nlp">4-（4）自然言語処理</a> で扱います。</div>

        <h3>■ まず全体：3つの弱点をどう補うか</h3>
        <div class="nlpa-table-wrap">
            <table class="nlpa-table">
                <tr><th>困りごと</th><th>解決の考え方</th><th>代表語</th></tr>
                <tr><td>同じ単語が文脈で別の意味になる</td><td>文全体を読んで、出力ベクトルを変える</td><td><strong>ELMo</strong></td></tr>
                <tr><td>辞書にない単語はベクトルを持てない</td><td>単語を文字の部分列へ分け、既知の部品から組み立てる</td><td><strong>fastText</strong></td></tr>
                <tr><td>単語辞書は巨大、文字分割は系列が長い</td><td>単語と文字の中間であるサブワードへ分ける</td><td><strong>BPE / WordPiece / Unigram</strong></td></tr>
            </table>
        </div>

        <h3>■ 1. ELMo：同じ単語でも文脈で出力が変わる</h3>
        <div class="nlpa-visual-wrap">
            <div class="nlpa-visual-card">
                <svg class="nlpa-wide-svg" viewBox="0 0 960 350" role="img" aria-labelledby="nlpa-elmo-title nlpa-elmo-desc">
                    <title id="nlpa-elmo-title">Word2Vecの固定表現とELMoの文脈化表現</title>
                    <desc id="nlpa-elmo-desc">Word2Vecではbankのベクトルが常に同じだが、ELMoではbankの左文脈と右文脈から矢印が集まり、岸と銀行で異なる表現を出す。</desc>
                    <defs>
                        <marker id="nlpa-arrow-elmo" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker>
                    </defs>
                    <text x="20" y="28" class="nlpa-svg-title">固定ベクトルと文脈化ベクトルの違い</text>

                    <rect x="20" y="48" width="350" height="274" class="nlpa-svg-purple"></rect>
                    <text x="40" y="76" class="nlpa-svg-label">Word2Vec：単語ごとに固定</text>
                    <rect x="42" y="96" width="130" height="42" class="nlpa-svg-box"></rect>
                    <text x="58" y="122" class="nlpa-svg-note">river bank</text>
                    <line x1="177" y1="117" x2="228" y2="117" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <rect x="238" y="96" width="105" height="42" class="nlpa-svg-box"></rect>
                    <text x="255" y="122" class="nlpa-svg-note">[0.5, 0.1]</text>
                    <rect x="42" y="158" width="130" height="42" class="nlpa-svg-box"></rect>
                    <text x="54" y="184" class="nlpa-svg-note">money bank</text>
                    <line x1="177" y1="179" x2="228" y2="179" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <rect x="238" y="158" width="105" height="42" class="nlpa-svg-box"></rect>
                    <text x="255" y="184" class="nlpa-svg-note">[0.5, 0.1]</text>
                    <text x="42" y="232" class="nlpa-svg-note">辞書の bank の行を2文とも参照</text>
                    <text x="42" y="256" class="nlpa-svg-label">→ 表記が同じならベクトルも同じ</text>
                    <text x="42" y="291" class="nlpa-svg-mini">多義語の意味を文脈だけで切り替えられない</text>

                    <rect x="390" y="48" width="550" height="274" class="nlpa-svg-blue"></rect>
                    <text x="410" y="76" class="nlpa-svg-label">ELMo：前後文脈から毎回作る</text>
                    <text x="414" y="107" class="nlpa-svg-note">river</text>
                    <text x="460" y="92" class="nlpa-svg-mini">Forward LSTM</text>
                    <line x1="453" y1="102" x2="540" y2="102" stroke="#3498db" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <rect x="551" y="83" width="78" height="38" class="nlpa-svg-box"></rect>
                    <text x="574" y="107" class="nlpa-svg-note">bank</text>
                    <text x="698" y="92" class="nlpa-svg-mini">Backward LSTM</text>
                    <line x1="780" y1="102" x2="640" y2="102" stroke="#8e44ad" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <text x="790" y="107" class="nlpa-svg-note">overflowed</text>
                    <line x1="630" y1="113" x2="674" y2="133" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <rect x="685" y="118" width="225" height="49" class="nlpa-svg-box"></rect>
                    <text x="704" y="139" class="nlpa-svg-note">前後を結合 → [0.9, 0.1]</text>
                    <text x="770" y="158" class="nlpa-svg-mini">「岸」</text>

                    <text x="414" y="207" class="nlpa-svg-note">money</text>
                    <text x="460" y="192" class="nlpa-svg-mini">Forward LSTM</text>
                    <line x1="462" y1="202" x2="540" y2="202" stroke="#3498db" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <rect x="551" y="183" width="78" height="38" class="nlpa-svg-box"></rect>
                    <text x="574" y="207" class="nlpa-svg-note">bank</text>
                    <text x="698" y="192" class="nlpa-svg-mini">Backward LSTM</text>
                    <line x1="780" y1="202" x2="640" y2="202" stroke="#8e44ad" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <text x="790" y="207" class="nlpa-svg-note">loan</text>
                    <line x1="630" y1="213" x2="674" y2="233" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-elmo)"></line>
                    <rect x="685" y="218" width="225" height="49" class="nlpa-svg-box"></rect>
                    <text x="704" y="239" class="nlpa-svg-note">前後を結合 → [0.1, 0.9]</text>
                    <text x="763" y="258" class="nlpa-svg-mini">「銀行」</text>
                    <text x="414" y="278" class="nlpa-svg-label">→ 同じ表記でも、文脈で出力が変わる</text>
                    <text x="414" y="301" class="nlpa-svg-mini">BiLSTM = Bidirectional Long Short-Term Memory（双方向LSTM）</text>
                </svg>
                <p class="nlpa-caption"><strong>覚え方：</strong>Word2Vec＝単語ごとに固定。ELMo＝前向きLSTMと後ろ向きLSTMを結合し、前後文脈で変える。</p>
            </div>
        </div>

        <div class="nlpa-core">
            <strong>ELMo（Embeddings from Language Models）の中身</strong>
            <ol class="nlpa-steps">
                <li><strong>文字CNN（Convolutional Neural Network／畳み込みニューラルネットワーク）</strong>で単語の形（つづり）を表す。</li>
                <li><strong>多層BiLSTM</strong>で左文脈と右文脈を読む。</li>
                <li>下位層から上位層までを、下流タスクが学ぶ重みで<strong>加重和</strong>する。</li>
            </ol>
            <div class="nlpa-formula"><strong>ELMo<sub>t</sub> = γ × Σ s<sub>j</sub> h<sub>t,j</sub></strong>　（s<sub>j</sub>：各層の重み、合計1／γ：全体の倍率）</div>
            <div>例：第1層が10、第2層が30、重みが0.25と0.75、γ=1なら、<strong>0.25×10＋0.75×30=25</strong>。</div>
        </div>

        <div class="nlpa-table-wrap">
            <table class="nlpa-table">
                <tr><th>手法</th><th>単語表現</th><th>主な仕組み</th><th>一言で</th></tr>
                <tr><td><strong>Word2Vec</strong></td><td>固定</td><td>単語ID（Identifier／識別番号）ごとの埋め込み</td><td>同じ語はいつも同じ</td></tr>
                <tr><td><strong>ELMo</strong></td><td>文脈化</td><td>文字CNN＋多層BiLSTM</td><td>前後を読んで変える</td></tr>
                <tr><td><strong>BERT（Bidirectional Encoder Representations from Transformers）</strong></td><td>文脈化</td><td>Transformer Encoder</td><td>Self-Attentionで双方向文脈</td></tr>
            </table>
        </div>

        <h3>■ 2. fastText：文字n-gramから単語を組み立てる</h3>
        <div class="nlpa-visual-wrap">
            <div class="nlpa-visual-card">
                <svg class="nlpa-wide-svg" viewBox="0 0 960 310" role="img" aria-labelledby="nlpa-fast-title nlpa-fast-desc">
                    <title id="nlpa-fast-title">fastTextが既知語と未知語を文字n-gramから表す流れ</title>
                    <desc id="nlpa-fast-desc">既知語appleは単語ベクトルと文字n-gramを足す。辞書にないapppleは利用できる文字n-gramを足して近似する。</desc>
                    <defs>
                        <marker id="nlpa-arrow-fast" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker>
                    </defs>
                    <text x="20" y="28" class="nlpa-svg-title">既知語は「単語＋部分」、OOVは「部分」から推定</text>
                    <rect x="20" y="48" width="920" height="106" class="nlpa-svg-green"></rect>
                    <text x="38" y="73" class="nlpa-svg-label">既知語 apple</text>
                    <rect x="40" y="91" width="100" height="38" class="nlpa-svg-box"></rect>
                    <text x="66" y="115" class="nlpa-svg-note">apple</text>
                    <line x1="146" y1="110" x2="190" y2="110" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-fast)"></line>
                    <text x="205" y="91" class="nlpa-svg-mini">n=3・境界記号を追加</text>
                    <text x="205" y="116" class="nlpa-svg-note">&lt;ap ｜ app ｜ ppl ｜ ple ｜ le&gt;</text>
                    <line x1="480" y1="110" x2="534" y2="110" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-fast)"></line>
                    <rect x="548" y="82" width="185" height="52" class="nlpa-svg-box"></rect>
                    <text x="566" y="104" class="nlpa-svg-note">単語ベクトル＋各n-gram</text>
                    <text x="614" y="124" class="nlpa-svg-mini">を加算</text>
                    <line x1="739" y1="110" x2="786" y2="110" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-fast)"></line>
                    <rect x="800" y="82" width="115" height="52" class="nlpa-svg-box"></rect>
                    <text x="814" y="113" class="nlpa-svg-note">語ベクトル</text>

                    <rect x="20" y="170" width="920" height="116" class="nlpa-svg-orange"></rect>
                    <text x="38" y="195" class="nlpa-svg-label">OOV（Out-of-Vocabulary／語彙外語）appple</text>
                    <rect x="40" y="211" width="100" height="42" class="nlpa-svg-box"></rect>
                    <text x="61" y="237" class="nlpa-svg-note">appple</text>
                    <line x1="146" y1="232" x2="190" y2="232" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-fast)"></line>
                    <text x="205" y="219" class="nlpa-svg-note">&lt;ap ｜ app ｜ ppp ｜ ppl ｜ ple ｜ le&gt;</text>
                    <text x="205" y="243" class="nlpa-svg-mini">学習済み部分を利用（未知部分があってもよい）</text>
                    <line x1="517" y1="232" x2="571" y2="232" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-fast)"></line>
                    <rect x="585" y="205" width="160" height="54" class="nlpa-svg-box"></rect>
                    <text x="604" y="228" class="nlpa-svg-note">利用可能なn-gram</text>
                    <text x="632" y="249" class="nlpa-svg-mini">を加算</text>
                    <line x1="751" y1="232" x2="793" y2="232" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-fast)"></line>
                    <rect x="807" y="205" width="108" height="54" class="nlpa-svg-box"></rect>
                    <text x="821" y="236" class="nlpa-svg-note">近似表現</text>
                </svg>
                <p class="nlpa-caption"><strong>注意：</strong>つづりの共通部分から表現を作りやすいだけで、未知語の意味を必ず正しく推定できるわけではありません。</p>
            </div>
        </div>

        <div class="nlpa-core">
            <strong>計算の形</strong>
            <div class="nlpa-formula">既知語：v<sub>w</sub> = z<sub>w</sub> + Σ<sub>g∈G(w)</sub> z<sub>g</sub>　／　OOV：v<sub>w</sub> ≈ Σ<sub>g∈G(w)</sub> z<sub>g</sub></div>
            <div><strong>固定したnで作れるn-gram数：</strong>境界記号を両端に足すため、文字数Lなら <strong>(L+2)−n+1 = L−n+3</strong>。例：cat（L=3）を3-gramにすると、<span class="nlpa-chip">&lt;ca</span><span class="nlpa-chip">cat</span><span class="nlpa-chip">at&gt;</span> の<strong>3個</strong>です。</div>
        </div>

        <h3>■ 3. Tokenization：単語と文字の中間を使う</h3>
        <div class="nlpa-visual-wrap">
            <div class="nlpa-visual-card">
                <svg class="nlpa-wide-svg" viewBox="0 0 960 430" role="img" aria-labelledby="nlpa-token-title nlpa-token-desc">
                    <title id="nlpa-token-title">単語・文字・サブワードの比較とBPE・SentencePieceの関係</title>
                    <desc id="nlpa-token-desc">上段は単語、文字、サブワード分割の長所短所を比較する。下段はBPEが頻出ペアを結合するアルゴリズムで、SentencePieceは生テキストからBPEまたはUnigramを学習できる仕組みだと示す。</desc>
                    <defs>
                        <marker id="nlpa-arrow-token" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker>
                    </defs>
                    <text x="20" y="28" class="nlpa-svg-title">粒度の比較：Subwordは「中間」</text>
                    <rect x="20" y="48" width="290" height="142" class="nlpa-svg-purple"></rect>
                    <text x="38" y="75" class="nlpa-svg-label">Word-level（単語）</text>
                    <text x="38" y="104" class="nlpa-svg-note">[ unhappiness ]</text>
                    <text x="38" y="132" class="nlpa-svg-note">○ 系列は短い</text>
                    <text x="38" y="156" class="nlpa-svg-note">△ 語彙が巨大・OOVに弱い</text>

                    <rect x="335" y="48" width="290" height="142" class="nlpa-svg-orange"></rect>
                    <text x="353" y="75" class="nlpa-svg-label">Character-level（文字）</text>
                    <text x="353" y="104" class="nlpa-svg-note">[ u ][ n ][ h ][ a ] …</text>
                    <text x="353" y="132" class="nlpa-svg-note">○ 語彙は小さくOOVに強い</text>
                    <text x="353" y="156" class="nlpa-svg-note">△ 系列が長く意味単位が細かい</text>

                    <rect x="650" y="48" width="290" height="142" class="nlpa-svg-green"></rect>
                    <text x="668" y="75" class="nlpa-svg-label">Subword-level（部分語）</text>
                    <text x="668" y="104" class="nlpa-svg-note">[ un ][ happi ][ ness ]</text>
                    <text x="668" y="132" class="nlpa-svg-note">○ 語彙数と系列長のバランス</text>
                    <text x="668" y="156" class="nlpa-svg-note">○ 未知語を既知部品へ分けやすい</text>

                    <text x="20" y="225" class="nlpa-svg-label">BPE（Byte Pair Encoding）＝頻出ペアを結合するアルゴリズム</text>
                    <rect x="25" y="243" width="150" height="48" class="nlpa-svg-box"></rect>
                    <text x="42" y="272" class="nlpa-svg-note">l ｜ o ｜ w</text>
                    <line x1="181" y1="267" x2="226" y2="267" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-token)"></line>
                    <rect x="240" y="243" width="176" height="48" class="nlpa-svg-box"></rect>
                    <text x="278" y="264" class="nlpa-svg-note">コーパス全体で</text>
                    <text x="267" y="282" class="nlpa-svg-mini">隣接ペアを数える</text>
                    <line x1="422" y1="267" x2="467" y2="267" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-token)"></line>
                    <rect x="481" y="243" width="150" height="48" class="nlpa-svg-box"></rect>
                    <text x="506" y="272" class="nlpa-svg-note">lo ｜ w</text>
                    <line x1="637" y1="267" x2="682" y2="267" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-token)"></line>
                    <rect x="696" y="243" width="220" height="48" class="nlpa-svg-box"></rect>
                    <text x="720" y="264" class="nlpa-svg-note">規定の語彙数まで反復</text>
                    <text x="764" y="282" class="nlpa-svg-mini">例：low</text>

                    <text x="20" y="329" class="nlpa-svg-label">SentencePiece＝生テキストから学習できるトークナイザの仕組み</text>
                    <rect x="25" y="346" width="200" height="53" class="nlpa-svg-box"></rect>
                    <text x="43" y="368" class="nlpa-svg-note">空白分割前の生テキスト</text>
                    <text x="66" y="389" class="nlpa-svg-mini">I like apple</text>
                    <line x1="231" y1="372" x2="276" y2="372" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-token)"></line>
                    <rect x="290" y="346" width="190" height="53" class="nlpa-svg-blue"></rect>
                    <text x="327" y="369" class="nlpa-svg-note">SentencePiece</text>
                    <text x="329" y="389" class="nlpa-svg-mini">BPE または Unigram</text>
                    <line x1="486" y1="372" x2="531" y2="372" stroke="#486581" stroke-width="2" marker-end="url(#nlpa-arrow-token)"></line>
                    <rect x="545" y="346" width="371" height="53" class="nlpa-svg-box"></rect>
                    <text x="574" y="369" class="nlpa-svg-note">▁I ｜ ▁like ｜ ▁apple</text>
                    <text x="574" y="389" class="nlpa-svg-mini">▁ は語頭の空白を表す記号</text>
                </svg>
                <p class="nlpa-caption"><strong>混同防止：</strong>BPEとUnigramは分割方法。SentencePieceは、それらを生テキストから学習・実行できる枠組みです。</p>
            </div>
        </div>

        <div class="nlpa-table-wrap">
            <table class="nlpa-table">
                <tr><th>名称</th><th>学習・作り方</th><th>実際の分割</th><th>試験の合図</th></tr>
                <tr><td><strong>BPE</strong></td><td>小さい単位から頻出ペアを結合</td><td>学習した結合規則を適用</td><td>Bottom-up／最頻出ペア</td></tr>
                <tr><td><strong>WordPiece</strong></td><td>語彙の有用性を評価して構成</td><td>代表的実装はLongest Match First</td><td>BERT／継続部分の <code>##</code></td></tr>
                <tr><td><strong>Unigram LM（Language Model）</strong></td><td>大きな候補集合から、尤度低下が小さい候補を削る</td><td>積の確率が最大になる分割を選ぶ</td><td>Top-down／確率モデル</td></tr>
                <tr><td><strong>SentencePiece</strong></td><td>生テキストから固定語彙を学習</td><td>BPEまたはUnigramを利用</td><td>空白を <code>▁</code> として扱う</td></tr>
                <tr><td><strong>Byte-level BPE</strong></td><td>byteを初期単位にしてBPE</td><td>任意のUTF-8（Unicode Transformation Format 8-bit）入力をbyte列へ分けられる</td><td>GPT-2／未知文字に強い</td></tr>
            </table>
        </div>

        <div class="nlpa-core">
            <strong>最重要の混同防止：fastTextとSubword Tokenizerは別物</strong>
            <div class="nlpa-table-wrap" style="margin-bottom:0;">
                <table class="nlpa-table">
                    <tr><th></th><th>文字の部品を何に使うか</th><th>モデルへ渡す系列</th></tr>
                    <tr><td><strong>fastText</strong></td><td>1単語の<strong>1本の埋め込み</strong>を合成する</td><td>appleは1語・1位置のまま</td></tr>
                    <tr><td><strong>BPE / WordPiece等</strong></td><td>入力文を<strong>複数token ID（Identifier／識別番号）</strong>へ分割する</td><td>unhappiness → un / happi / ness の3位置</td></tr>
                </table>
            </div>
        </div>

        <div class="nlpa-table-wrap">
            <table class="nlpa-table">
                <tr><th>代表モデル</th><th>代表的なTokenizer</th><th>覚える合図</th></tr>
                <tr><td><strong>BERT（Bidirectional Encoder Representations from Transformers）</strong></td><td>WordPiece</td><td><code>##</code>・Longest Match First</td></tr>
                <tr><td><strong>GPT-2（Generative Pre-trained Transformer 2）</strong></td><td>Byte-level BPE</td><td>byteを基礎単位にしてOOVを避けやすい</td></tr>
                <tr><td><strong>T5（Text-to-Text Transfer Transformer）</strong></td><td>SentencePiece（Unigram）</td><td>生テキスト・<code>▁</code></td></tr>
            </table>
        </div>

        <div class="nlpa-note">
            <strong>計算問題の3手順</strong>
            <ol class="nlpa-steps">
                <li><strong>BPE：</strong>隣接ペアを数える → 最頻出ペアを全箇所で結合 → もう一度数える。</li>
                <li><strong>Unigram：</strong>各分割のサブワード確率を掛ける（または負の対数を足す）→ 積が最大の分割を選ぶ。</li>
                <li><strong>語彙の粒度：</strong>語彙を大きくすると系列は短くなりやすいが、埋め込み行列は大きくなる。小さくすると逆。</li>
            </ol>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="nlpa-table-wrap">
            <table class="nlpa-table">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>同じ単語でも文脈でベクトルが変わる</td><td><strong>ELMo（Embeddings from Language Models）</strong></td><td>文字CNN＋多層BiLSTM＋層の加重和。</td></tr>
                <tr><td>前向きと後ろ向きの系列モデル</td><td><strong>BiLSTM（Bidirectional Long Short-Term Memory）</strong></td><td>左文脈と右文脈を結合する。</td></tr>
                <tr><td>文字n-gram・つづりの一部を利用</td><td><strong>fastText</strong></td><td>部分文字列のベクトルを加算する。</td></tr>
                <tr><td>学習語彙にない語</td><td><strong>OOV（Out-of-Vocabulary）</strong></td><td>fastTextやSubwordで扱いやすくする。</td></tr>
                <tr><td>語彙外の入力を共通記号へ置換</td><td><strong>[UNK]（Unknown Token／未知トークン）</strong></td><td>OOVは状態、[UNK]は置換後のtoken。</td></tr>
                <tr><td>単語と文字の中間単位</td><td><strong>Subword Tokenization</strong></td><td>語彙数と系列長を両立しやすい。</td></tr>
                <tr><td>最頻出の隣接ペアを反復結合</td><td><strong>BPE（Byte Pair Encoding）</strong></td><td>小さい単位から作るBottom-up。</td></tr>
                <tr><td>BERT・<code>##</code>・最長一致</td><td><strong>WordPiece</strong></td><td>語彙中の長い部分語から照合する。</td></tr>
                <tr><td>大候補集合から確率的に削る</td><td><strong>Unigram Language Model</strong></td><td>尤度低下の小さい候補を削るTop-down。</td></tr>
                <tr><td>生テキスト・<code>▁</code>・BPE/Unigram</td><td><strong>SentencePiece</strong></td><td>分割方法ではなくトークナイザの枠組み。</td></tr>
                <tr><td>GPT-2・byteを初期単位にするBPE</td><td><strong>Byte-level BPE</strong></td><td>任意のUTF-8入力をbyte列として表しやすい。</td></tr>
                <tr><td>複数の分割をサンプリング</td><td><strong>Subword Regularization</strong></td><td>分割ゆらぎを学習させ頑健性を高める。</td></tr>
            </table>
        </div>
    `,

    questions: [
        {
            category: "ELMoの特徴",
            question: "ELMo (Embeddings from Language Models) がWord2Vecと比較して革新的だった点は何か。",
            options: ["文脈に応じて単語ベクトルが動的に変化するため、多義語（例: Bank）の意味を区別できるようになった", "計算量が大幅に減った", "画像データも扱えるようになった", "単語を文字単位に分解した"],
            answer: 0,
            explanation: "Word2Vecでは同じ単語IDは基本的に同じベクトルです。ELMoは文全体をBiLSTMで読み、各位置の表現を毎回作るため、bankを『岸』と『銀行』で異なるベクトルにできます。"
        },
        {
            category: "ELMoの構造",
            question: "ELMoのモデル構造として使われているニューラルネットワークはどれか。",
            options: ["双方向LSTM (BiLSTM)", "Transformer Encoder", "CNNだけ", "単方向の単純RNNだけ"],
            answer: 0,
            explanation: "ELMoは文字CNNで単語の形を表し、その後に多層BiLSTMを使います。前向きLSTMが左側、後ろ向きLSTMが右側の文脈を読み、両方向の出力を結合します。"
        },
        {
            category: "fastTextの仕組み",
            question: "fastTextにおいて、単語のベクトルはどのように計算されるか。",
            options: ["単語ベクトルと、その単語を構成する文字n-gramのベクトルを足し合わせる", "単語ごとにランダムなベクトルを割り当てる", "文全体のベクトルの平均だけを使う", "辞書にある単語しかベクトル化できない"],
            answer: 0,
            explanation: "fastTextは単語を文字n-gramへ分け、各部分文字列のベクトルを加算します。既知語では単語自身のベクトルも利用し、OOVでは利用可能なn-gramから表現を組み立てます。"
        },
        {
            category: "fastTextの利点",
            question: "fastTextがWord2Vecよりも優れている（強い）シチュエーションはどれか。",
            options: ["未知語（OOV）やスペル変化が多いデータ、または語形変化が多い言語", "文脈を左右から読むことが最優先の場合", "長文を直接生成する場合", "画像分類を行う場合"],
            answer: 0,
            explanation: "標準的なWord2Vecは語彙にない単語IDのベクトルを直接持ちません。fastTextは文字n-gramを再利用できるため、未知語や語形変化へ対応しやすくなります。ただし意味を必ず正しく推定できるわけではありません。"
        },
        {
            category: "Tokenizationの課題",
            question: "自然言語処理の前処理において、「単語単位（Word-level）」で分割することの主なデメリットは何か。",
            options: ["語彙数が膨大になり、かつ未知語（Out-of-Vocabulary）への対応が難しい", "必ず文字単位より系列が長くなる", "単語の順序が必ず失われる", "埋め込み行列が不要になる"],
            answer: 0,
            explanation: "単語の活用形・固有名詞・新語まで全部を辞書に登録すると語彙が巨大になります。辞書にない語は [UNK] になりやすいため、Subwordで既知の部品へ分けます。"
        },
        {
            category: "BPEのアルゴリズム",
            question: "BPE (Byte Pair Encoding) アルゴリズムの基本的な動作原理はどれか。",
            options: ["データ中で最も頻繁に出現する隣接ペアを繰り返し結合し、新しいトークンとして登録する", "ランダムに単語を分割する", "文法規則だけで単語を分割する", "出現頻度の最も低い文字から削除する"],
            answer: 0,
            explanation: "BPEは小さい単位から始め、隣接ペアを数え、最頻出ペアを結合します。例：l｜o｜wでl＋oが最多ならlo｜wへ変え、再びペアを数えます。"
        },
        {
            category: "SentencePiece",
            question: "SentencePieceの特徴として正しいものはどれか。",
            options: ["言語ごとの事前の分かち書きを前提とせず、生テキストから直接サブワードモデルを学習できる", "英語専用である", "単語単位の分割しかできない", "BPEだけを実装した単一アルゴリズムである"],
            answer: 0,
            explanation: "SentencePieceはトークナイザの枠組みで、BPE方式とUnigram方式を利用できます。空白も通常の記号として扱い、語頭の空白を ▁ で表すため、空白分割を前提にしない言語にも適用しやすいのが特徴です。"
        },
        {
            category: "サブワードのメリット",
            question: "BPEやSentencePieceのようなサブワード分割を採用する最大のメリットは何か。",
            options: ["語彙数を抑えつつ、未知語を既知の部分語へ分解して扱いやすくできる", "どんな未知文字も必ず処理できる", "文の長さが必ず単語分割より短くなる", "文脈モデルが不要になる"],
            answer: 0,
            explanation: "Subwordは単語と文字の中間です。語彙にない語でも既知の部分語へ分けやすくなります。ただし語彙や文字カバレッジの設計次第で [UNK] が残ることはあり、『必ず未知語がゼロ』とは限りません。"
        },
        {
            category: "Unigram Language Model",
            question: "SentencePieceで利用できる、BPEとは別のサブワード分割アルゴリズム「Unigram Language Model」の特徴は何か。",
            options: ["大きな候補語彙から始め、削除時の尤度低下が小さいサブワードを段階的に取り除く", "小さい単位から最頻出ペアを結合する", "常に文字単位だけを使う", "空白だけで分割する"],
            answer: 0,
            explanation: "BPEは結合して増やすBottom-upです。Unigramは大きな候補集合から始め、削除によるコーパス尤度の悪化が小さい候補を取り除くTop-downです。推論では確率が高い分割を選びます。"
        },
        {
            category: "BERTとトークナイザ",
            question: "BERT（英語モデル）で一般的に使われているトークン化手法はどれか。",
            options: ["WordPiece", "MeCab", "Jieba", "White space splittingだけ"],
            answer: 0,
            explanation: "BERTはWordPieceを採用します。代表的な分割はLongest Match Firstで、語彙にある最長の部分語から照合します。継続部分を ##ing のように表す実装が代表的です。"
        },
        {
            id: "nlpa-elmo-weighted-sum",
            category: "ELMoの計算",
            question: "ELMoで第1層の値が10、第2層の値が30、層重みがそれぞれ0.25と0.75、全体倍率γ=1のとき、加重和はいくつか。",
            options: ["25", "20", "40", "15"],
            answer: 0,
            explanation: "手順は『各層×重み→足す→γを掛ける』です。0.25×10=2.5、0.75×30=22.5、合計2.5+22.5=25。最後にγ=1を掛けても25です。"
        },
        {
            id: "nlpa-elmo-character-cnn",
            category: "ELMoの入力",
            question: "ELMoがBiLSTMへ入力する文脈非依存の単語表現を作るために利用するものはどれか。",
            options: ["文字CNN", "物体検出用CNN", "Causal Self-Attention", "単語IDだけの固定Embedding"],
            answer: 0,
            explanation: "ELMoは最初に文字CNNでつづり情報を含む単語表現を作り、その後、多層BiLSTMで文脈化します。『文字CNN→BiLSTM→層の加重和』の順で覚えます。"
        },
        {
            id: "nlpa-elmo-layer-property",
            category: "ELMoの層",
            question: "ELMoの各層を加重和して下流タスクへ渡す理由として最も適切なものはどれか。",
            options: ["層ごとに構文寄り・意味寄りなど異なる情報を持ち、タスクに合う混合比を学べるから", "層数を必ず1層に減らすため", "単語順を削除するため", "語彙を文字だけにするため"],
            answer: 0,
            explanation: "ELMoでは内部層が異なる種類の言語情報を持ちます。下流タスクごとに層重みsを学ぶことで、必要な層を強く使えます。"
        },
        {
            id: "nlpa-fixed-contextual-compare",
            category: "埋め込み比較",
            question: "固定埋め込み・BiLSTMによる文脈化・Transformer Encoderによる文脈化の組合せとして正しいものはどれか。",
            options: ["Word2Vec＝固定、ELMo＝BiLSTM、BERT＝Transformer Encoder", "Word2Vec＝BiLSTM、ELMo＝固定、BERT＝CNN", "Word2Vec＝Transformer、ELMo＝CNNだけ、BERT＝固定", "3つとも固定"],
            answer: 0,
            explanation: "モデル史の軸は『固定→文脈化』です。Word2Vecは固定表現、ELMoはBiLSTM、BERTはTransformer Encoderで文脈化します。"
        },
        {
            id: "nlpa-fasttext-trigram-count",
            category: "文字n-gram計算",
            question: "単語 cat の両端に境界記号 &lt; と &gt; を付け、固定長3の文字n-gramへ分ける。n-gramはいくつできるか。",
            options: ["3個", "2個", "4個", "5個"],
            answer: 0,
            explanation: "<code>&lt;cat&gt;</code> は5文字です。長さ5から長さ3の窓を1文字ずつ動かすので、5−3+1=3個。実際に <code>&lt;ca</code>・<code>cat</code>・<code>at&gt;</code> の3個です。"
        },
        {
            id: "nlpa-fasttext-vector-sum",
            category: "fastTextの計算",
            question: "あるOOVを構成する利用可能な3つの文字n-gramベクトルが (1,0)、(0,2)、(1,1) のとき、単純な和で作るOOV表現はどれか。",
            options: ["(2,3)", "(1,3)", "(2,2)", "(3,2)"],
            answer: 0,
            explanation: "成分ごとに足します。第1成分は1+0+1=2、第2成分は0+2+1=3なので (2,3) です。fastTextの基本イメージは『部分文字列ベクトルの足し算』です。"
        },
        {
            id: "nlpa-fasttext-oov-caution",
            category: "fastTextの限界",
            question: "fastTextのOOV対応について正しい説明はどれか。",
            options: ["既知の文字n-gramから表現を作りやすいが、未知語の意味を必ず正しく推定できるわけではない", "どんな未知語でも正しい辞書定義を復元できる", "OOVでは文字n-gramを使えない", "文脈に応じて同じ語のベクトルが自動で変わる"],
            answer: 0,
            explanation: "fastTextが利用する主な手がかりは文字の形です。つづりが似ていれば近い表現を作りやすい一方、文脈依存の意味判定や正確な辞書定義を保証しません。"
        },
        {
            id: "nlpa-token-granularity",
            category: "粒度の比較",
            question: "Word-level、Character-level、Subword-levelの一般的な関係として正しいものはどれか。",
            options: ["Subwordは語彙数と系列長の両面で、単語と文字の中間になりやすい", "Characterは語彙が最大で系列が最短", "Word-levelならOOVは絶対に起きない", "Subwordは必ず1文字ずつ分割する"],
            answer: 0,
            explanation: "単語分割は系列が短い代わりに語彙が大きく、文字分割は語彙が小さい代わりに系列が長くなります。Subwordはその中間を狙います。"
        },
        {
            id: "nlpa-bpe-one-step",
            category: "BPE手順",
            question: "BPEで語列 l｜o｜w と l｜o｜w｜e｜r があり、最頻出ペアが (l,o) だった。1回結合した結果はどれか。",
            options: ["lo｜w と lo｜w｜e｜r", "l｜ow と l｜ow｜e｜r", "low と lower", "l｜o と l｜o｜e｜r"],
            answer: 0,
            explanation: "BPEは選ばれた隣接ペアをコーパス中で結合します。(l,o) を1つのtoken loへ変えるため、lo｜w と lo｜w｜e｜r になります。まだ (lo,w) は結合していません。"
        },
        {
            id: "nlpa-bpe-merge-count",
            category: "BPE計算",
            question: "初期語彙が文字20種類で、BPEのmergeを100回行い、毎回1つの新しいtokenを語彙へ追加した。最終語彙数はいくつか。特殊tokenは無視する。",
            options: ["120", "100", "80", "2000"],
            answer: 0,
            explanation: "初期20種類に、100回のmergeで作られた新tokenを1種類ずつ足します。20+100=120です。『merge回数＝追加token数』が計算の軸です。"
        },
        {
            id: "nlpa-wordpiece-longest-match",
            category: "WordPiece",
            question: "WordPieceの代表的な推論時分割で使われるLongest Match Firstとは何か。",
            options: ["現在位置から語彙にある最長の部分語を優先して選ぶ", "最短の1文字だけを常に選ぶ", "最も頻度の低いtokenを選ぶ", "文全体を1tokenにする"],
            answer: 0,
            explanation: "先頭から、語彙に存在する最長候補を探して選びます。見つからなければ候補を短くします。BERT系では継続部分を ## で表す実装が代表的です。"
        },
        {
            id: "nlpa-sentencepiece-framework",
            category: "SentencePieceの位置づけ",
            question: "BPE、Unigram Language Model、SentencePieceの関係として正しいものはどれか。",
            options: ["BPEとUnigramは分割方法で、SentencePieceはそれらを利用できるトークナイザの枠組み", "3つは全く同じ結合アルゴリズム", "SentencePieceはBPEのmerge回数だけを指す", "UnigramはSentencePieceでは利用できない"],
            answer: 0,
            explanation: "BPEは結合型、Unigramは確率モデル型の分割アルゴリズムです。SentencePieceは生テキストから語彙を学習し、BPEまたはUnigramを実行できる仕組みです。"
        },
        {
            id: "nlpa-sentencepiece-space-marker",
            category: "SentencePieceの記号",
            question: "SentencePieceの出力に現れる記号 ▁ の代表的な意味は何か。",
            options: ["そのtokenの前に空白があることを表す", "未知語を表す", "文末だけを表す", "マスクされたtokenを表す"],
            answer: 0,
            explanation: "SentencePieceは空白も通常の記号として扱います。▁I や ▁apple の ▁ は語頭側の空白を可視化したものです。これにより分割と復元を一貫して扱えます。"
        },
        {
            id: "nlpa-unigram-segmentation-calc",
            category: "Unigramの計算",
            question: "Unigram LMで文字列 ab の分割候補が [a,b] と [ab]。P(a)=0.4、P(b)=0.3、P(ab)=0.1のとき、単純な確率積が大きい分割はどれか。",
            options: ["[a,b]（0.4×0.3=0.12）", "[ab]（0.10）", "両方0.10", "確率では比較できない"],
            answer: 0,
            explanation: "[a,b] の確率積は0.4×0.3=0.12、[ab] は0.10です。0.12>0.10なので [a,b] を選びます。実装では対数を使い、log確率の和として計算します。"
        },
        {
            id: "nlpa-subword-regularization",
            category: "Subword Regularization",
            question: "学習時に1つの文から複数のサブワード分割を確率的にサンプリングする主な狙いは何か。",
            options: ["分割の揺らぎをデータ拡張として学習し、頑健性を高める", "必ず系列長を1にする", "語順を完全に削除する", "語彙を無限に増やす"],
            answer: 0,
            explanation: "同じ文を毎回まったく同じ分割だけで学習するのではなく、確率に従って別の妥当な分割も見せます。これがSubword Regularizationで、分割への過度な依存を減らします。"
        },
        {
            id: "nlpa-vocab-sequence-tradeoff",
            category: "語彙サイズのトレードオフ",
            question: "一般にサブワード語彙を大きくしたときの傾向として最も適切なものはどれか。",
            options: ["系列は短くなりやすいが、埋め込み行列のパラメータ数は増えやすい", "系列も埋め込み行列も必ず小さくなる", "系列は長くなり、語彙は小さくなる", "モデルへの影響はない"],
            answer: 0,
            explanation: "大きな語彙には長い部分語を多く登録できるため、1文のtoken数は減りやすくなります。一方、埋め込み行列は語彙数V×次元Dなので、Vが増えるほど大きくなります。"
        },
        {
            id: "nlpa-fasttext-vs-tokenizer",
            category: "fastTextとTokenizer",
            question: "fastTextの文字n-gramと、BPEなどのSubword Tokenizationの違いとして正しいものはどれか。",
            options: ["fastTextは文字n-gramから1語の埋め込みを合成し、BPEは入力を複数token IDへ分割する", "どちらも必ず文字を1文字ずつモデルへ渡す", "fastTextは系列長を増やすTokenizerである", "BPEは単語を常に1位置のまま保持する"],
            answer: 0,
            explanation: "fastTextではappleの文字n-gramを内部で足しても、モデルへ渡すappleは1語・1ベクトルです。BPE等はunhappinessをun / happi / nessのように複数位置へ分け、系列長そのものを変えます。"
        },
        {
            id: "nlpa-byte-level-bpe",
            category: "Byte-level BPE",
            question: "Byte-level BPEが通常の文字語彙より未知文字へ強い主な理由は何か。",
            options: ["UTF-8入力を有限種類のbyteへ分解してからBPEを適用できるから", "未知文字をすべて削除するから", "必ず1文を1tokenにするから", "文脈に応じてEmbedding次元を変えるから"],
            answer: 0,
            explanation: "文字そのものを初期語彙にすると未収録文字が [UNK] になり得ます。Byte-level方式は入力をbyte列へ変換できるため、任意のUTF-8文字列を既知の基礎単位で表しやすくなります。代表例はGPT-2です。"
        },
        {
            id: "nlpa-tokenizer-model-match",
            category: "Tokenizerとモデル",
            question: "事前学習済みモデルを使うとき、原則として同じTokenizerと語彙を使う必要があるのはなぜか。",
            options: ["token IDがEmbedding行列の行番号に対応しており、語彙を変えるとIDと学習済みベクトルの対応が崩れるから", "Tokenizerが重みを毎回再学習するから", "文章の意味に関係なくtoken数を必ず1にするため", "計算機がTokenizer名だけを検査するから"],
            answer: 0,
            explanation: "モデルは『ID 1234ならEmbedding行列の1234行目』という対応を学習済みです。別語彙で同じIDが別tokenを指すと入力の意味が崩れます。モデルとTokenizerはセットで使うのが原則です。"
        }
    ]
};
