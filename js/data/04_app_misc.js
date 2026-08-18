window.quizData = {
    title: "4-（８）（９）様々な学習方法・説明性（eXplainable AI／XAI）",

    cheatSheet: `
        <style>
            .mix-core { background:#eef8f8; border-left:5px solid #35b9c5; border-radius:0 10px 10px 0; padding:14px 18px; margin:12px 0 22px; }
            .mix-note { background:#fff8e8; border-left:5px solid #f39c12; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0 22px; }
            .mix-formula { background:#f7f9fc; border:1px solid #d9e2ec; border-radius:8px; padding:11px 14px; margin:10px 0; overflow-x:auto; }
            .mix-table-wrap { overflow-x:auto; margin:12px 0 22px; }
            .mix-table { width:100%; min-width:760px; border-collapse:collapse; }
            .mix-table th { background:#eaf2fb; color:#102a43; text-align:left; padding:10px; border:1px solid #d9e2ec; }
            .mix-table td { padding:10px; border:1px solid #d9e2ec; vertical-align:top; }
            .mix-visual-wrap { overflow-x:auto; margin:14px 0 22px; }
            .mix-visual-card { min-width:990px; border:1px solid #d9e2ec; border-radius:12px; background:#fff; padding:12px; box-sizing:border-box; }
            .mix-wide-svg { display:block; width:100%; min-width:960px; height:auto; }
            .mix-svg-title { font-size:16px; font-weight:700; fill:#102a43; }
            .mix-svg-label { font-size:13px; font-weight:700; fill:#102a43; }
            .mix-svg-note { font-size:12px; fill:#334e68; }
            .mix-svg-mini { font-size:11px; fill:#486581; }
            .mix-box { fill:#fff; stroke:#cbd5e1; stroke-width:1.5; }
            .mix-blue { fill:#eef7fb; stroke:#2780b8; stroke-width:1.5; }
            .mix-green { fill:#eafaf1; stroke:#27ae60; stroke-width:1.5; }
            .mix-orange { fill:#fff8e7; stroke:#f39c12; stroke-width:1.5; }
            .mix-purple { fill:#f7f0ff; stroke:#8e44ad; stroke-width:1.5; }
            .mix-gray { fill:#f1f5f9; stroke:#94a3b8; stroke-width:1.5; }
            .mix-caption { margin:8px 8px 0; color:#334e68; }
            .mix-details { margin:12px 0 22px; border:1px solid #d9e2ec; border-radius:8px; padding:10px 14px; }
            .mix-details summary { cursor:pointer; font-weight:700; color:#102a43; }
        </style>

        <h3>■ まず全体：「何が足りないか」で選ぶ</h3>
        <div class="mix-core">
            この章は、<strong>知識を再利用する・ラベルを補う・距離を学ぶ・判断根拠を説明する</strong>の4本で整理すると混乱しません。
        </div>
        <div class="mix-note">
            <strong>先に用語：</strong>Backbone（バックボーン）＝入力から特徴を取り出す本体、Head（ヘッド）＝特徴から答えを出す部分、埋め込み＝入力を比較用の数値ベクトルへ変えたもの、Encoder（エンコーダ）＝入力を埋め込みへ変換する部分、View＝同じデータの異なる特徴の見方、margin＝最低限空けたい距離または距離差です。
        </div>
        <div class="mix-note">
            <strong>この章の略語：</strong>XAI＝eXplainable AI（説明可能AI）／Grad-CAM＝Gradient-weighted Class Activation Mapping／IG＝Integrated Gradients（積分勾配法）／LIME＝Local Interpretable Model-agnostic Explanations／SHAP＝SHapley Additive exPlanations。
        </div>
        <h3>■ モデル図はこの順で読む</h3>
        <div class="mix-core">
            <strong>距離学習：</strong>①入力が2個か3個か → ②Encoderの重みを共有するか → ③距離をどう使うか。2枝＋共有Encoder＝Siamese、A・P・Nの3枝＋共有Encoder＝Tripletです。<br>
            <strong>XAI：</strong>①何を入力に使うか → ②何を出力するか。クラス勾配＋特徴map→場所ならGrad-CAM、baselineからの経路勾配→入力寄与ならIG、近傍予測→局所代理モデルならLIME、特徴の組合せ→Shapley寄与ならSHAPです。
        </div>
        <div class="mix-table-wrap">
            <table class="mix-table">
                <tr><th>困っていること</th><th>選ぶ考え方</th><th>中心語</th></tr>
                <tr><td>新タスクのデータが少ない</td><td>学習済み知識を再利用</td><td><strong>Transfer Learning</strong>・Fine-tuning</td></tr>
                <tr><td>学習元と実運用の分布が違う</td><td>分布のずれへ適応</td><td><strong>Domain Shift</strong>・Domain Adaptation</td></tr>
                <tr><td>正解ラベルが少ない／ない</td><td>未ラベルデータから学ぶ</td><td><strong>Self-Training</strong>・Co-Training・Contrastive Learning</td></tr>
                <tr><td>似ている・違うを判定したい</td><td>埋め込み空間の距離を学ぶ</td><td><strong>Siamese Network</strong>・Triplet Network</td></tr>
                <tr><td>AIの予測理由を知りたい</td><td>場所・特徴の寄与を説明</td><td><strong>XAI</strong>・Grad-CAM・IG・LIME・SHAP</td></tr>
            </table>
        </div>

        <h3>■ 転移学習：固定か微調整か、分布を合わせるか</h3>
        <div class="mix-visual-wrap">
            <div class="mix-visual-card">
                <svg class="mix-wide-svg" viewBox="0 0 960 420" role="img" aria-labelledby="mix-transfer-title mix-transfer-desc">
                    <title id="mix-transfer-title">転移学習とドメイン適応の関係</title>
                    <desc id="mix-transfer-desc">学習済みモデルを特徴抽出またはファインチューニングで新タスクへ使い、分布が違う場合はドメイン適応を行う。</desc>
                    <defs><marker id="mix-arrow-transfer" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="mix-svg-title">Transfer Learning（転移学習）＝学習済み知識を別タスクへ再利用する上位概念</text>

                    <rect x="20" y="48" width="920" height="176" rx="12" class="mix-blue"></rect>
                    <rect x="48" y="93" width="190" height="82" rx="10" class="mix-purple"></rect>
                    <text x="69" y="121" class="mix-svg-label">学習済みモデル</text>
                    <text x="69" y="147" class="mix-svg-note">汎用的な特徴を保持</text>
                    <line x1="248" y1="118" x2="293" y2="95" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-transfer)"></line>
                    <line x1="248" y1="150" x2="293" y2="174" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-transfer)"></line>

                    <rect x="305" y="66" width="286" height="70" rx="10" class="mix-gray"></rect>
                    <text x="325" y="91" class="mix-svg-label">特徴抽出（Feature Extraction）</text>
                    <text x="325" y="116" class="mix-svg-note">Backbone固定 ＋ 新しいHeadだけ学習</text>
                    <rect x="305" y="151" width="286" height="70" rx="10" class="mix-orange"></rect>
                    <text x="325" y="176" class="mix-svg-label">Fine-tuning（微調整）</text>
                    <text x="325" y="201" class="mix-svg-note">事前学習層の一部または全部を小さな学習率で更新</text>
                    <line x1="601" y1="101" x2="646" y2="101" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-transfer)"></line>
                    <line x1="601" y1="186" x2="646" y2="169" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-transfer)"></line>
                    <rect x="658" y="84" width="244" height="102" rx="10" class="mix-green"></rect>
                    <text x="682" y="116" class="mix-svg-label">新しいTarget Task</text>
                    <text x="682" y="143" class="mix-svg-note">少量データでも学習を始めやすい</text>
                    <text x="682" y="168" class="mix-svg-mini">元タスクに近いほど転用しやすい</text>

                    <rect x="20" y="244" width="920" height="154" rx="12" class="mix-orange"></rect>
                    <text x="42" y="273" class="mix-svg-label">Domain Shift（ドメインシフト）＝学習元と適用先のデータ分布が違う</text>
                    <rect x="52" y="296" width="176" height="66" rx="10" class="mix-blue"></rect>
                    <text x="72" y="323" class="mix-svg-label">Source Domain</text>
                    <text x="72" y="347" class="mix-svg-note">例：Computer Graphics</text>
                    <text x="247" y="337" class="mix-svg-title">≠</text>
                    <rect x="285" y="296" width="176" height="66" rx="10" class="mix-orange"></rect>
                    <text x="305" y="323" class="mix-svg-label">Target Domain</text>
                    <text x="305" y="347" class="mix-svg-note">例：実写画像</text>
                    <line x1="474" y1="329" x2="552" y2="329" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-transfer)"></line>
                    <text x="483" y="315" class="mix-svg-mini">分布を近づける</text>
                    <rect x="564" y="286" width="342" height="86" rx="10" class="mix-green"></rect>
                    <text x="590" y="316" class="mix-svg-label">Domain Adaptation（ドメイン適応）</text>
                    <text x="590" y="342" class="mix-svg-note">Target側でも性能が落ちにくい表現・モデルへ調整</text>
                </svg>
                <p class="mix-caption"><strong>試験の分かれ目：</strong>転移学習は上位概念です。「固定する＝特徴抽出」「一部または全部を更新＝Fine-tuning」「分布差を埋める＝Domain Adaptation」と見分けます。</p>
            </div>
        </div>

        <div class="mix-table-wrap">
            <table class="mix-table">
                <tr><th>語</th><th>何をするか</th><th>よく出る注意</th></tr>
                <tr><td><strong>Feature Extraction</strong></td><td>特徴抽出部を固定し、新しいHeadを学習</td><td>転移学習の一つ。転移学習そのものと同義ではない。</td></tr>
                <tr><td><strong>Fine-tuning</strong></td><td>事前学習済み層の一部または全部を更新</td><td>通常は小さい学習率。全層更新とは限らない。</td></tr>
                <tr><td><strong>Domain Shift</strong></td><td>SourceとTargetの分布が異なる状態</td><td>原因・現象の名前。</td></tr>
                <tr><td><strong>Domain Adaptation</strong></td><td>分布差があってもTargetで性能を出せるよう調整</td><td>Domain Shiftへの対策。</td></tr>
            </table>
        </div>

        <h3>■ 半教師・自己教師・距離学習：教師信号はどこから来るか</h3>
        <div class="mix-table-wrap">
            <table class="mix-table">
                <tr><th>学習</th><th>与えられるデータ</th><th>教師信号の作り方</th><th>目的</th></tr>
                <tr><td><strong>半教師あり</strong></td><td>少量のラベルあり＋大量のラベルなし</td><td>人手ラベルと疑似ラベルなど</td><td>目的タスクの予測</td></tr>
                <tr><td><strong>自己教師あり</strong></td><td>主にラベルなし</td><td>データ自身から代理課題を作る</td><td>再利用しやすい表現を事前学習</td></tr>
                <tr><td><strong>Contrastive Learning</strong></td><td>同じデータの別変換など</td><td>Positiveを近く、Negativeを遠く</td><td>埋め込み表現を学習</td></tr>
                <tr><td><strong>Metric Learning</strong></td><td>同一／異なる組や3つ組</td><td>距離を直接損失にする</td><td>類似検索・認証に使える空間</td></tr>
            </table>
        </div>

        <div class="mix-visual-wrap">
            <div class="mix-visual-card">
                <svg class="mix-wide-svg" viewBox="0 0 960 540" role="img" aria-labelledby="mix-learning-title mix-learning-desc">
                    <title id="mix-learning-title">Self-Training、Co-Training、Siamese Network、Triplet Network</title>
                    <desc id="mix-learning-desc">半教師あり学習の疑似ラベル作成と、2サンプルおよび3サンプルの距離学習を比較する。</desc>
                    <defs><marker id="mix-arrow-learning" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="mix-svg-title">上：未ラベルデータを使う　／　下：距離を学ぶ</text>

                    <rect x="20" y="48" width="440" height="205" rx="12" class="mix-blue"></rect>
                    <text x="40" y="76" class="mix-svg-label">Self-Training（自己訓練）</text>
                    <rect x="43" y="96" width="105" height="54" rx="8" class="mix-box"></rect>
                    <text x="58" y="121" class="mix-svg-note">少量の</text><text x="58" y="141" class="mix-svg-note">ラベルあり</text>
                    <line x1="156" y1="126" x2="181" y2="126" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <rect x="193" y="99" width="92" height="54" rx="8" class="mix-purple"></rect>
                    <text x="216" y="132" class="mix-svg-note">モデル</text>
                    <rect x="43" y="170" width="110" height="46" rx="8" class="mix-gray"></rect>
                    <text x="55" y="198" class="mix-svg-note">大量の未ラベル</text>
                    <line x1="161" y1="193" x2="184" y2="151" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="293" y1="126" x2="329" y2="126" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <rect x="341" y="91" width="94" height="70" rx="8" class="mix-green"></rect>
                    <text x="355" y="116" class="mix-svg-note">高確信の</text><text x="355" y="138" class="mix-svg-note">疑似ラベル</text>
                    <path d="M388 170 C388 225, 250 225, 250 163" fill="none" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></path>
                    <text x="245" y="240" class="mix-svg-mini">追加して再学習（誤りの増幅に注意）</text>

                    <rect x="500" y="48" width="440" height="205" rx="12" class="mix-green"></rect>
                    <text x="520" y="76" class="mix-svg-label">Co-Training（協調訓練）</text>
                    <rect x="530" y="101" width="110" height="54" rx="8" class="mix-box"></rect>
                    <text x="550" y="124" class="mix-svg-note">View 1</text><text x="550" y="144" class="mix-svg-mini">例：本文</text>
                    <rect x="800" y="101" width="110" height="54" rx="8" class="mix-box"></rect>
                    <text x="820" y="124" class="mix-svg-note">View 2</text><text x="820" y="144" class="mix-svg-mini">例：リンク</text>
                    <rect x="552" y="180" width="122" height="48" rx="8" class="mix-blue"></rect>
                    <text x="579" y="209" class="mix-svg-note">学習器 A</text>
                    <rect x="766" y="180" width="122" height="48" rx="8" class="mix-orange"></rect>
                    <text x="793" y="209" class="mix-svg-note">学習器 B</text>
                    <line x1="640" y1="128" x2="607" y2="170" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="800" y1="128" x2="833" y2="170" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <path d="M674 197 C715 160, 745 160, 766 197" fill="none" stroke="#8e44ad" stroke-width="2" marker-end="url(#mix-arrow-learning)"></path>
                    <path d="M766 216 C725 248, 695 248, 674 216" fill="none" stroke="#2780b8" stroke-width="2" marker-end="url(#mix-arrow-learning)"></path>
                    <text x="673" y="146" class="mix-svg-mini">互いに疑似ラベルを渡す</text>

                    <rect x="20" y="278" width="440" height="238" rx="12" class="mix-purple"></rect>
                    <text x="40" y="307" class="mix-svg-label">2サンプル：Siamese Network</text>
                    <rect x="48" y="335" width="84" height="44" rx="8" class="mix-box"></rect>
                    <text x="63" y="362" class="mix-svg-note">入力 x₁</text>
                    <rect x="48" y="413" width="84" height="44" rx="8" class="mix-box"></rect>
                    <text x="63" y="440" class="mix-svg-note">入力 x₂</text>
                    <line x1="140" y1="357" x2="188" y2="357" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="140" y1="435" x2="188" y2="435" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <rect x="200" y="326" width="120" height="60" rx="8" class="mix-blue"></rect>
                    <text x="222" y="351" class="mix-svg-note">Encoder f</text><text x="222" y="373" class="mix-svg-mini">同じ重み</text>
                    <rect x="200" y="404" width="120" height="60" rx="8" class="mix-blue"></rect>
                    <text x="222" y="429" class="mix-svg-note">Encoder f</text><text x="222" y="451" class="mix-svg-mini">同じ重み</text>
                    <line x1="328" y1="357" x2="366" y2="383" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="328" y1="435" x2="366" y2="409" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <rect x="378" y="369" width="60" height="54" rx="8" class="mix-green"></rect>
                    <text x="391" y="392" class="mix-svg-note">距離</text><text x="388" y="413" class="mix-svg-mini">近／遠</text>
                    <text x="88" y="492" class="mix-svg-note">Contrastive Lossで同じ組を近く、異なる組をmargin以上遠く</text>

                    <rect x="500" y="278" width="440" height="238" rx="12" class="mix-orange"></rect>
                    <text x="520" y="307" class="mix-svg-label">3サンプル：Triplet Network</text>
                    <rect x="524" y="335" width="74" height="44" rx="8" class="mix-blue"></rect>
                    <text x="543" y="362" class="mix-svg-note">A 基準</text>
                    <rect x="524" y="393" width="74" height="44" rx="8" class="mix-green"></rect>
                    <text x="543" y="420" class="mix-svg-note">P 正例</text>
                    <rect x="524" y="451" width="74" height="44" rx="8" class="mix-orange"></rect>
                    <text x="543" y="478" class="mix-svg-note">N 負例</text>
                    <line x1="606" y1="357" x2="648" y2="357" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="606" y1="415" x2="648" y2="415" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="606" y1="473" x2="648" y2="473" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <rect x="660" y="326" width="112" height="60" rx="8" class="mix-purple"></rect>
                    <text x="680" y="351" class="mix-svg-note">Encoder f</text><text x="680" y="373" class="mix-svg-mini">重み共有</text>
                    <rect x="660" y="384" width="112" height="60" rx="8" class="mix-purple"></rect>
                    <text x="680" y="409" class="mix-svg-note">Encoder f</text><text x="680" y="431" class="mix-svg-mini">重み共有</text>
                    <rect x="660" y="442" width="112" height="60" rx="8" class="mix-purple"></rect>
                    <text x="680" y="467" class="mix-svg-note">Encoder f</text><text x="680" y="489" class="mix-svg-mini">重み共有</text>
                    <line x1="780" y1="357" x2="824" y2="381" stroke="#27ae60" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="780" y1="415" x2="824" y2="395" stroke="#27ae60" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <line x1="780" y1="473" x2="824" y2="440" stroke="#e67e22" stroke-width="2" marker-end="url(#mix-arrow-learning)"></line>
                    <text x="832" y="387" class="mix-svg-mini">AとPを近く</text>
                    <text x="832" y="432" class="mix-svg-mini">AとNを遠く</text>
                </svg>
                <p class="mix-caption"><strong>覚え方：</strong>Self-Trainingは自分の予測を再利用、Co-Trainingは2つの見方が教え合う。Siameseは2入力、TripletはA・P・Nの3入力です。</p>
            </div>
        </div>

        <div class="mix-formula">
            <strong>計算で使う公式</strong><br>
            D＝2つの埋め込み間の距離、m＝margin。A＝Anchor（基準）、P＝Positive（同種）、N＝Negative（異種）です。<br>
            Contrastive Loss（y=1：同じ、y=0：異なる）：
            $L=yD^2+(1-y)\\max(0,m-D)^2$<br>
            Triplet Loss：
            $L=\\max\\{0,d(A,P)-d(A,N)+m\\}$
        </div>

        <h3>■ XAI：1件を説明するか、モデル全体を説明するか</h3>
        <div class="mix-table-wrap">
            <table class="mix-table">
                <tr><th>説明範囲</th><th>意味</th><th>代表例</th></tr>
                <tr><td><strong>局所的な解釈（Local）</strong></td><td>この1件を、なぜその予測にしたか</td><td>Grad-CAM、Integrated Gradients、LIME、1件のSHAP</td></tr>
                <tr><td><strong>大域的な解釈（Global）</strong></td><td>モデル全体が、どの特徴をどう使う傾向か</td><td>多数データのSHAPを集約、単純な代理モデルなど</td></tr>
            </table>
        </div>
        <div class="mix-note">
            <strong>XAI（Explainable Artificial Intelligence／説明可能AI）</strong>は予測根拠を説明します。CNNは<strong>Convolutional Neural Network（畳み込みニューラルネットワーク）</strong>の略です。ただし、特徴が予測に寄与したことは<strong>因果関係の証明ではありません</strong>。
        </div>

        <div class="mix-visual-wrap">
            <div class="mix-visual-card">
                <svg class="mix-wide-svg" viewBox="0 0 960 530" role="img" aria-labelledby="mix-xai-title mix-xai-desc">
                    <title id="mix-xai-title">Grad-CAM、Integrated Gradients、LIME、SHAPの仕組み</title>
                    <desc id="mix-xai-desc">4つのXAI手法が、ヒートマップ、経路勾配、局所代理モデル、Shapley値で予測を説明する様子。</desc>
                    <defs><marker id="mix-arrow-xai" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                    <text x="20" y="28" class="mix-svg-title">同じ「説明」でも、使う情報と出力が違う</text>

                    <rect x="20" y="48" width="440" height="210" rx="12" class="mix-blue"></rect>
                    <text x="40" y="76" class="mix-svg-label">Grad-CAM（Gradient-weighted Class Activation Mapping）</text>
                    <rect x="48" y="101" width="86" height="86" rx="8" class="mix-box"></rect>
                    <circle cx="91" cy="144" r="25" fill="#dbeafe"></circle>
                    <text x="68" y="205" class="mix-svg-mini">入力画像</text>
                    <line x1="144" y1="144" x2="188" y2="144" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-xai)"></line>
                    <rect x="200" y="112" width="106" height="64" rx="8" class="mix-purple"></rect>
                    <text x="220" y="138" class="mix-svg-note">CNN＋</text><text x="215" y="160" class="mix-svg-note">対象クラス勾配</text>
                    <line x1="316" y1="144" x2="352" y2="144" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-xai)"></line>
                    <rect x="364" y="101" width="70" height="86" rx="8" fill="#fee2e2" stroke="#e74c3c" stroke-width="1.5"></rect>
                    <circle cx="400" cy="140" r="25" fill="#ef4444" opacity="0.65"></circle>
                    <text x="368" y="205" class="mix-svg-mini">粗い注目位置</text>
                    <text x="48" y="235" class="mix-svg-note">最後の畳み込み特徴mapをクラス勾配で重み付け</text>

                    <rect x="500" y="48" width="440" height="210" rx="12" class="mix-green"></rect>
                    <text x="520" y="76" class="mix-svg-label">LIME（Local Interpretable Model-agnostic Explanations）</text>
                    <circle cx="610" cy="146" r="8" fill="#2780b8"></circle>
                    <circle cx="579" cy="118" r="6" fill="#93c5fd"></circle>
                    <circle cx="645" cy="120" r="6" fill="#93c5fd"></circle>
                    <circle cx="572" cy="170" r="6" fill="#93c5fd"></circle>
                    <circle cx="651" cy="174" r="6" fill="#93c5fd"></circle>
                    <line x1="548" y1="194" x2="674" y2="96" stroke="#27ae60" stroke-width="3"></line>
                    <line x1="686" y1="146" x2="730" y2="146" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-xai)"></line>
                    <rect x="742" y="106" width="166" height="80" rx="8" class="mix-box"></rect>
                    <text x="760" y="133" class="mix-svg-note">近傍だけで単純な</text>
                    <text x="760" y="157" class="mix-svg-note">代理モデルを学習</text>
                    <text x="520" y="235" class="mix-svg-note">入力を少し変えた予測を集め、1件の周辺を局所近似</text>

                    <rect x="20" y="278" width="440" height="226" rx="12" class="mix-purple"></rect>
                    <text x="40" y="307" class="mix-svg-label">IG（Integrated Gradients／積分勾配法）</text>
                    <rect x="48" y="344" width="76" height="52" rx="8" class="mix-gray"></rect>
                    <text x="61" y="366" class="mix-svg-note">baseline</text><text x="70" y="386" class="mix-svg-mini">基準入力</text>
                    <line x1="132" y1="370" x2="170" y2="370" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-xai)"></line>
                    <rect x="182" y="344" width="62" height="52" rx="8" class="mix-box"></rect>
                    <text x="201" y="376" class="mix-svg-note">25%</text>
                    <line x1="252" y1="370" x2="284" y2="370" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-xai)"></line>
                    <rect x="296" y="344" width="62" height="52" rx="8" class="mix-box"></rect>
                    <text x="315" y="376" class="mix-svg-note">75%</text>
                    <line x1="366" y1="370" x2="398" y2="370" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-xai)"></line>
                    <rect x="410" y="344" width="32" height="52" rx="8" class="mix-green"></rect>
                    <text x="416" y="376" class="mix-svg-note">x</text>
                    <text x="48" y="427" class="mix-svg-note">baselineから入力までの途中の勾配を平均して寄与を配分</text>
                    <text x="48" y="454" class="mix-svg-mini">入力点だけの勾配が0になる「飽和」の影響を緩和</text>
                    <text x="48" y="480" class="mix-svg-mini">Completeness：寄与の総和＝F(x)−F(baseline)</text>

                    <rect x="500" y="278" width="440" height="226" rx="12" class="mix-orange"></rect>
                    <text x="520" y="307" class="mix-svg-label">SHAP（SHapley Additive exPlanations）</text>
                    <rect x="528" y="342" width="104" height="54" rx="8" class="mix-box"></rect>
                    <text x="549" y="364" class="mix-svg-note">基準値</text><text x="557" y="386" class="mix-svg-mini">0.20</text>
                    <text x="651" y="375" class="mix-svg-title">＋</text>
                    <rect x="682" y="331" width="98" height="42" rx="8" class="mix-green"></rect>
                    <text x="699" y="357" class="mix-svg-note">年齢 +0.50</text>
                    <rect x="682" y="382" width="98" height="42" rx="8" fill="#fee2e2" stroke="#e74c3c" stroke-width="1.5"></rect>
                    <text x="699" y="408" class="mix-svg-note">負債 −0.10</text>
                    <line x1="790" y1="377" x2="824" y2="377" stroke="#486581" stroke-width="2" marker-end="url(#mix-arrow-xai)"></line>
                    <rect x="836" y="342" width="82" height="54" rx="8" class="mix-purple"></rect>
                    <text x="852" y="364" class="mix-svg-note">予測</text><text x="852" y="386" class="mix-svg-mini">0.60</text>
                    <text x="520" y="454" class="mix-svg-note">協力ゲーム理論のShapley Valueで特徴の貢献を配分</text>
                    <text x="520" y="480" class="mix-svg-mini">1件は局所説明。多数のSHAPを集約すれば大域傾向も見られる</text>
                </svg>
                <p class="mix-caption"><strong>一言で：</strong>Grad-CAM＝場所、IG＝baselineからの入力寄与、LIME＝近傍の単純モデル、SHAP＝基準値からの公平な貢献配分。</p>
            </div>
        </div>

        <div class="mix-table-wrap">
            <table class="mix-table">
                <tr><th>手法</th><th>使う情報</th><th>出力</th><th>適用条件・範囲</th></tr>
                <tr><td><strong>Grad-CAM</strong></td><td>対象クラスの勾配＋畳み込み特徴map</td><td>粗い空間ヒートマップ</td><td>勾配と特徴mapへアクセスできるCNN。局所。</td></tr>
                <tr><td><strong>Integrated Gradients</strong></td><td>baselineから入力までの経路勾配</td><td>入力特徴ごとの寄与</td><td>微分可能なモデル。局所。</td></tr>
                <tr><td><strong>LIME</strong></td><td>入力近傍を変化させた予測</td><td>解釈可能な局所代理モデル</td><td>モデル非依存。局所。</td></tr>
                <tr><td><strong>SHAP</strong></td><td>特徴の組合せによる予測変化</td><td>Shapley Valueによる加法的寄与</td><td>実装方式は複数。局所から大域集約も可能。</td></tr>
            </table>
        </div>

        <details class="mix-details">
            <summary>試験で見るXAIの式</summary>
            <div class="mix-formula">
                $IG_i$＝特徴iの寄与、$\\phi_0$＝基準値、$\\phi_i$＝特徴iの寄与です。$v(S)$は特徴集合Sを使ったときのモデル出力、$\\emptyset$はどの特徴も使わない基準を表します。<br>
                <strong>Integrated GradientsのCompleteness：</strong>
                $\\sum_i IG_i(x)=F(x)-F(x')$（x'はbaseline）<br>
                <strong>SHAPの加法性：</strong>
                $f(x)=\\phi_0+\\sum_i\\phi_i$（$\\phi_0$は基準値）<br>
                <strong>2特徴A・BのShapley Value：</strong>
                $\\phi_A=\\frac12\\{v(A)-v(\\emptyset)\\}+\\frac12\\{v(A,B)-v(B)\\}$
            </div>
        </details>

        <h3>■ モデル別キーワード</h3>
        <div class="mix-table-wrap">
            <table class="mix-table">
                <tr><th>モデル</th><th>覚えるキーワード</th><th>一言イメージ</th></tr>
                <tr><td><strong>Self-Training</strong></td><td>単一モデル・高確信予測・疑似ラベル・反復学習</td><td>自分の予測を新しい正解として学び直す。</td></tr>
                <tr><td><strong>Co-Training</strong></td><td>2つのView・2分類器・疑似ラベル交換</td><td>別の見方をする2人が互いに教える。</td></tr>
                <tr><td><strong>Siamese</strong></td><td>重み共有・2枝・入力ペア・Contrastive Loss</td><td>2つを同じ物差しで測る。</td></tr>
                <tr><td><strong>Triplet</strong></td><td>Anchor・Positive・Negative・margin・3枝</td><td>似た例を近く、違う例をmargin以上遠くする。</td></tr>
                <tr><td><strong>Grad-CAM</strong></td><td>対象クラスの勾配・畳み込み特徴map・ヒートマップ</td><td>CNNが画像のどこを見たか色で示す。</td></tr>
                <tr><td><strong>IG</strong></td><td>baseline・経路上の勾配積分・Completeness</td><td>基準入力からの変化を各特徴へ配る。</td></tr>
                <tr><td><strong>LIME</strong></td><td>近傍摂動・局所代理モデル・モデル非依存</td><td>その予測の周辺だけ単純な模型で説明する。</td></tr>
                <tr><td><strong>SHAP</strong></td><td>Shapley Value・協力ゲーム理論・加法的寄与</td><td>基準値との差を特徴ごとに公平に配る。</td></tr>
            </table>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="mix-table-wrap">
            <table class="mix-table">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>学習済み知識を別タスクへ再利用</td><td><strong>Transfer Learning</strong></td><td>特徴抽出とFine-tuningを含む上位概念。</td></tr>
                <tr><td>Backbone固定・新しいHeadだけ学習</td><td><strong>Feature Extraction</strong></td><td>学習済み特徴をそのまま使う。</td></tr>
                <tr><td>事前学習済み層を小さい学習率で更新</td><td><strong>Fine-tuning</strong></td><td>一部または全層を微調整。</td></tr>
                <tr><td>SourceとTargetの分布が違う／埋める</td><td><strong>Domain Shift／Adaptation</strong></td><td>Shiftは現象、Adaptationは対策。</td></tr>
                <tr><td>自分の高確信予測を疑似ラベルへ</td><td><strong>Self-Training</strong></td><td>単一モデルで反復。誤り増幅に注意。</td></tr>
                <tr><td>異なる2つのViewが教え合う</td><td><strong>Co-Training</strong></td><td>学習器間で疑似ラベルを渡す。</td></tr>
                <tr><td>Positiveを近く、Negativeを遠く</td><td><strong>Contrastive Learning</strong></td><td>再利用しやすい埋め込みを学ぶ。</td></tr>
                <tr><td>2入力・重み共有</td><td><strong>Siamese Network</strong></td><td>Contrastive Lossで距離を学ぶ。</td></tr>
                <tr><td>Anchor・Positive・Negative</td><td><strong>Triplet Network</strong></td><td>重みを共有し、A-NをA-Pよりmargin以上遠くする。</td></tr>
                <tr><td>1件／モデル全体の説明</td><td><strong>Local／Global</strong></td><td>何件を説明するかの違い。</td></tr>
                <tr><td>CNNの注目位置・クラス勾配</td><td><strong>Grad-CAM</strong></td><td>粗い空間ヒートマップ。</td></tr>
                <tr><td>baselineから入力まで勾配を積分</td><td><strong>Integrated Gradients</strong></td><td>入力特徴へ寄与を配分。</td></tr>
                <tr><td>予測点の近傍を単純モデルで説明</td><td><strong>LIME</strong></td><td>モデル非依存の局所近似。</td></tr>
                <tr><td>協力ゲーム理論・Shapley Value</td><td><strong>SHAP</strong></td><td>基準値から各特徴の寄与を配分。</td></tr>
            </table>
        </div>
    `,

    questions: [
        {
            id: "misc-transfer-umbrella",
            category: "転移学習",
            question: "Transfer Learning（転移学習）の説明として最も適切なものはどれか。",
            options: ["学習済みモデルの知識を別タスクへ再利用する上位概念", "必ず全層を固定する方法だけ", "必ず全層を更新する方法だけ", "未学習モデルを乱数のまま使う方法"],
            answer: 0,
            explanation: "転移学習は知識再利用の上位概念です。Backboneを固定する特徴抽出も、一部または全層を更新するFine-tuningも代表的な使い方です。"
        },
        {
            id: "misc-feature-extraction",
            category: "転移学習",
            question: "学習済みBackboneを固定し、新しい分類Headだけを学習する方法はどれか。",
            options: ["Feature Extraction（特徴抽出）", "Fine-tuningだけ", "Domain Shift", "Co-Training"],
            answer: 0,
            explanation: "Backboneの汎用特徴を固定して使い、新タスク固有の出力Headだけを学びます。データが少ないときに過学習と計算量を抑えやすい方法です。"
        },
        {
            id: "misc-fine-tuning",
            category: "Fine-tuning",
            question: "Fine-tuning（ファインチューニング）の説明として正しいものはどれか。",
            options: ["事前学習済み層の一部または全部を、新タスクに合わせて更新する", "必ず出力層だけを更新する", "重みを一切更新しない", "入力データの分布を必ず同じにする"],
            answer: 0,
            explanation: "Fine-tuningは学習済み重みを初期値として、一部または全層を微調整します。既存知識を急に壊さないよう、小さい学習率から始めるのが代表的です。"
        },
        {
            id: "misc-domain-shift",
            category: "Domain Shift",
            question: "CG（Computer Graphics／コンピュータグラフィックス）画像で学習し、見た目の異なる実写画像へ適用したら精度が低下した。この主な現象はどれか。",
            options: ["Domain Shift（ドメインシフト）", "Mode Collapse", "Gradient Clipping", "Knowledge Distillation"],
            answer: 0,
            explanation: "学習元のSource Domainと適用先のTarget Domainでデータ分布が違う状態をDomain Shiftと呼びます。"
        },
        {
            id: "misc-domain-adaptation",
            category: "Domain Adaptation",
            question: "Domain Adaptation（ドメイン適応）の主な目的はどれか。",
            options: ["SourceとTargetの分布差があってもTarget側で性能を出せるよう調整する", "モデルのクラス数を必ず減らす", "全特徴をランダム化する", "学習済み重みを必ず削除する"],
            answer: 0,
            explanation: "Domain Shiftが問題の状態、Domain Adaptationがその対策です。Target側でも使える特徴や判断境界へ近づけます。"
        },
        {
            id: "misc-source-target-domain",
            category: "Domain Adaptation",
            question: "ドメイン適応で、学習の主な出発点となる領域と、性能を出したい適用先領域の組合せはどれか。",
            options: ["Source DomainとTarget Domain", "Train HeadとLoss Head", "ActorとCritic", "GeneratorとDiscriminator"],
            answer: 0,
            explanation: "Sourceは知識を得る学習元、Targetは実際に適用したい先です。両者の分布差を埋めるのがDomain Adaptationです。"
        },
        {
            id: "misc-semi-vs-self-supervised",
            category: "半教師あり・自己教師あり",
            question: "半教師あり学習と自己教師あり学習の違いとして正しいものはどれか。",
            options: ["半教師ありは少量の人手ラベルも使い、自己教師ありはデータ自身から教師信号を作って事前学習する", "両者とも必ず人手ラベルだけを使う", "自己教師ありは強化学習と同じ", "半教師ありは未ラベルデータを使えない"],
            answer: 0,
            explanation: "半教師ありは少量のラベルありデータと大量の未ラベルデータを併用します。自己教師ありは未ラベルデータの一部を隠すなど、データ自身から代理課題を作ります。"
        },
        {
            id: "misc-self-training",
            category: "Self-Training",
            question: "Self-Training（自己訓練）の基本手順はどれか。",
            options: ["モデルの高確信予測を疑似ラベルとして未ラベルデータへ付け、再学習する", "2つの異なるViewを必ず用意する", "人手ラベルをすべて削除する", "モデルの重みを共有しない"],
            answer: 0,
            explanation: "まずラベルありデータでモデルを作り、未ラベルデータの高確信予測を疑似ラベルにします。それを学習データへ加えて反復します。"
        },
        {
            id: "misc-self-training-risk",
            category: "Self-Training",
            question: "Self-Trainingで、誤った高確信予測を疑似ラベルとして繰り返し使う主なリスクはどれか。",
            options: ["誤りが自己強化されるConfirmation Bias（確証バイアス）", "勾配が必ず無限大になる", "ラベル数が必ず0になる", "モデルが必ず線形になる"],
            answer: 0,
            explanation: "最初の誤りを正解として再学習すると、同じ誤りへの確信が強まることがあります。そのため確信度の閾値や整合性確認が重要です。"
        },
        {
            id: "misc-self-co-training",
            category: "Co-Training",
            question: "Self-TrainingとCo-Trainingの違いとして最も適切なものはどれか。",
            options: ["Self-Trainingは自分の予測を使い、Co-Trainingは異なる特徴Viewの学習器が互いにラベルを補う", "両者とも必ずGANを使う", "Co-Trainingは単一モデルの推論と同義", "Self-Trainingはラベルありデータを使えない"],
            answer: 0,
            explanation: "Self-Trainingは単一モデルの高確信予測を再利用します。Co-Trainingは異なる情報を持つ複数Viewの学習器が、互いに疑似ラベルを渡します。古典的なCo-Trainingでは、各Viewが単独でも予測に十分な情報を持つことを仮定します。"
        },
        {
            id: "misc-contrastive-positive",
            category: "Contrastive Learning",
            question: "画像のContrastive LearningでPositive Pairとして最も典型的なのはどれか。",
            options: ["同じ元画像へ異なるデータ拡張を施した2つのView", "無関係な2画像だけ", "画像とランダムなラベル", "同じ画像を必ず完全に削除した組"],
            answer: 0,
            explanation: "同じ内容の別Viewを近づけることで、色や切り抜きの違いに頑健な表現を学びます。別データをNegativeとして遠ざける構成が代表的です。"
        },
        {
            id: "misc-representation-learning",
            category: "表現学習",
            question: "Representation Learning（表現学習）の目的として最も適切なものはどれか。",
            options: ["後続タスクで使いやすい特徴ベクトルをデータから学ぶ", "入力を必ず1画素へ縮小する", "ラベル名だけを暗記する", "モデルの説明を必ず文章化する"],
            answer: 0,
            explanation: "人手で特徴を固定せず、分類・検索・認証などに使いやすい埋め込みを学びます。Contrastive LearningやMetric Learningが代表例です。"
        },
        {
            id: "misc-metric-purpose",
            category: "Metric Learning",
            question: "Metric Learning（距離学習）の目標はどれか。",
            options: ["似たデータを近く、異なるデータを遠くする埋め込み空間を学ぶ", "画像を生成する", "予測理由だけを可視化する", "入力順序を必ず反転する"],
            answer: 0,
            explanation: "顔認証なら同じ人物の画像を近く、別人物を遠く配置します。未知サンプルも埋め込み間の距離で比較できます。"
        },
        {
            id: "misc-siamese-shared",
            category: "Siamese Network",
            question: "Siamese Network（シャムネットワーク）の構造的特徴はどれか。",
            options: ["2入力を同じ重みを共有するEncoderへ通し、埋め込み距離を比較する", "2入力を必ず異なる重みで処理する", "3入力が必須である", "勾配を一切使わない"],
            answer: 0,
            explanation: "同じEncoderを共有するため、2入力を同じ基準でベクトル化できます。2サンプルの類似・非類似をContrastive Lossで学ぶ構成が代表的です。"
        },
        {
            id: "misc-two-vs-three-sample",
            category: "Siamese・Triplet",
            question: "2サンプル比較と3サンプル比較の代表的な組合せはどれか。",
            options: ["Siamese Network＋Contrastive Loss／Triplet Network＋Triplet Loss", "Triplet Network＋MSE／Siamese Network＋GAN Loss", "LIME＋SHAP／Grad-CAM＋IG", "DQN＋A3C／VAE＋GAN"],
            answer: 0,
            explanation: "Siameseは2入力の距離、TripletはAnchor・Positive・Negativeの3入力の相対距離を学びます。"
        },
        {
            id: "misc-contrastive-similar-calc",
            category: "Contrastive Loss（計算）",
            kind: "計算",
            question: "Contrastive Lossを$L=yD^2+(1-y)\\max(0,m-D)^2$とする。y=1を同じクラスとし、D=0.4のときLはいくつか。",
            options: ["0.16", "0.36", "0.40", "1.00"],
            answer: 0,
            explanation: "<strong>使う公式（同じクラス、y=1）：</strong><br>$L=D^2$<br><br><strong>代入：</strong>$L=0.4^2=0.16$。<br><strong>答え：</strong>0.16です。同じクラスは距離そのものを小さくします。"
        },
        {
            id: "misc-contrastive-loss-calc",
            category: "Contrastive Loss（計算）",
            kind: "計算",
            question: "Contrastive Lossを$L=yD^2+(1-y)\\max(0,m-D)^2$とする。異なるクラスなのでy=0、D=0.4、margin m=1のときLはいくつか。",
            options: ["0.36", "0.16", "0.60", "1.00"],
            answer: 0,
            explanation: "<strong>使う公式（異なるクラス、y=0）：</strong><br>$L=\\max(0,m-D)^2$<br><br><strong>代入：</strong>$L=(1-0.4)^2=0.6^2=0.36$。<br><strong>答え：</strong>0.36です。marginより近い負例を罰します。"
        },
        {
            id: "misc-triplet-roles",
            category: "Triplet Loss",
            question: "Triplet LossにおけるAnchor（A）、Positive（P）、Negative（N）の関係はどれか。",
            options: ["PはAと同種、NはAと異種", "PもNもAと同種", "PもNもAと異種", "Aだけがラベルを持たない"],
            answer: 0,
            explanation: "Anchorを基準にPositiveを近づけ、Negativeを遠ざけます。絶対距離よりも相対的な大小関係を学びます。"
        },
        {
            id: "misc-triplet-network",
            category: "Triplet Network",
            question: "Triplet Networkの説明として正しいものはどれか。",
            options: ["A・P・Nの3入力を重み共有Encoderで埋め込み、2つの距離を比較する", "3つの独立した教師モデルを使う", "必ず画像を3枚生成する", "勾配を使わず距離を固定する"],
            answer: 0,
            explanation: "3枝は同じ重みを共有します。これによりA-P距離とA-N距離を同じ尺度で比較できます。"
        },
        {
            id: "misc-triplet-loss-calc",
            category: "Triplet Loss（計算）",
            kind: "計算",
            question: "Triplet Lossを$L=\\max\\{0,d(A,P)-d(A,N)+m\\}$とする。$d(A,P)=0.6,d(A,N)=0.9,m=0.5$のときLはいくつか。",
            options: ["0.2", "0", "0.8", "1.0"],
            answer: 0,
            explanation: "<strong>使う公式（Triplet Loss）：</strong><br>$L=\\max\\{0,d(A,P)-d(A,N)+m\\}$<br><br><strong>代入：</strong>$L=\\max(0,0.6-0.9+0.5)=0.2$。<br><strong>答え：</strong>0.2です。margin分だけ離れるまで損失が残ります。"
        },
        {
            id: "misc-triplet-zero",
            category: "Triplet Loss",
            question: "Triplet Lossが0になる代表的な条件はどれか。",
            options: ["$d(A,P)+m\\le d(A,N)$", "$d(A,P)>d(A,N)$", "$d(A,P)=d(A,N)+m$", "$m\\lt0$だけ"],
            answer: 0,
            explanation: "NegativeがPositiveよりmargin分以上遠ければ、目的を満たしています。そのため$\\max(0,\\cdot)$の中が0以下となり、損失は0です。"
        },
        {
            id: "xai-purpose",
            category: "XAI",
            question: "XAI（Explainable Artificial Intelligence）の主な目的はどれか。",
            options: ["モデルが予測へ使った根拠や特徴の寄与を人が理解できる形で示す", "必ず予測精度を100%にする", "学習データを自動削除する", "モデルを必ず線形に変換する"],
            answer: 0,
            explanation: "XAIは予測結果だけでなく「どこ・どの特徴が寄与したか」を示します。監査、デバッグ、利用者への説明に役立ちます。"
        },
        {
            id: "xai-not-causality",
            category: "XAIの注意",
            question: "ある特徴のSHAP値や勾配寄与が大きかったとき、正しい解釈はどれか。",
            options: ["そのモデルの予測に強く寄与したが、現実世界の因果関係を証明したとは限らない", "必ず現実の原因である", "モデルが間違っている証拠である", "予測値には関係しない"],
            answer: 0,
            explanation: "説明手法が示すのは主にモデル内部の予測との関係です。観察された寄与と因果効果は別なので、因果を主張するには追加検証が必要です。"
        },
        {
            id: "xai-local-global",
            category: "局所・大域説明",
            question: "局所的な解釈と大域的な解釈の違いはどれか。",
            options: ["局所は1件の予測、大域はモデルやデータ全体の傾向を説明する", "局所は全モデル、大域は1件だけ", "両者は常に同じ", "大域説明は特徴を使わない"],
            answer: 0,
            explanation: "LIMEは局所説明が中心です。SHAPは1件の寄与を出し、多数サンプルを集約して大域的な特徴傾向も確認できます。"
        },
        {
            id: "xai-gradcam-inputs",
            category: "Grad-CAM",
            question: "Grad-CAMがヒートマップ作成に使う代表的な情報はどれか。",
            options: ["対象クラススコアの勾配と畳み込み特徴マップ", "入力画像のファイル名だけ", "学習率だけ", "SHAP値だけ"],
            answer: 0,
            explanation: "クラススコアが各特徴mapにどれだけ依存するかを勾配で重み付けします。通常は最後の畳み込み層を使い、粗い空間位置を示します。"
        },
        {
            id: "xai-gradcam-class-specific",
            category: "Grad-CAM",
            question: "Grad-CAMの説明として正しいものはどれか。",
            options: ["対象クラスを変えると勾配が変わるため、ヒートマップも変わり得る", "常に全クラスで同じ画像になる", "CNNの重みを再学習しないと使えない", "モデル非依存で勾配は不要"],
            answer: 0,
            explanation: "Grad-CAMは指定したクラススコアの勾配を使うため、クラス依存の説明です。勾配と畳み込み特徴mapへアクセスできるモデルで使います。"
        },
        {
            id: "xai-ig-baseline",
            category: "Integrated Gradients",
            question: "Integrated Gradientsにおけるbaselineの役割として最も適切なものはどれか。",
            options: ["特徴がない基準状態を定め、そこから実入力までの出力変化を寄与へ配分する", "学習率を決める", "分類クラス数を決める", "勾配を常に0にする"],
            answer: 0,
            explanation: "baselineは比較の出発点です。黒画像や0は例であり、必ず0とは限りません。baselineの選び方で説明が変わり得ます。"
        },
        {
            id: "xai-ig-path",
            category: "Integrated Gradients",
            question: "Integrated Gradientsが入力点の勾配だけでなく、baselineから入力までの経路上の勾配を平均する理由はどれか。",
            options: ["入力点で勾配が0になる飽和の影響を緩和するため", "学習時の勾配消失を必ず完全に防ぐため", "モデルを線形回帰へ置換するため", "未ラベルデータへ疑似ラベルを付けるため"],
            answer: 0,
            explanation: "重要な特徴でも入力点で出力が飽和すると局所勾配が0になり得ます。経路上の勾配を積分することで、その途中の変化も寄与へ反映します。"
        },
        {
            id: "xai-ig-completeness",
            category: "Integrated Gradients",
            question: "Integrated GradientsのCompletenessが表す内容はどれか。",
            options: ["理論上、全入力特徴の寄与の和が$F(x)-F(x')$に一致する", "寄与の和が必ず1になる", "全特徴が同じ寄与になる", "モデル精度が100%になる"],
            answer: 0,
            explanation: "$x'$はbaselineです。理論上は出力差と一致し、数値積分で近似する実装では小さな誤差が生じることがあります。"
        },
        {
            id: "xai-ig-completeness-calc",
            category: "Integrated Gradients（計算）",
            kind: "計算",
            question: "$F(x)=0.8,F(x')=0.2$。特徴1のIG寄与が0.25のとき、Completenessを満たす特徴2の寄与はいくつか。",
            options: ["0.35", "0.60", "0.25", "1.00"],
            answer: 0,
            explanation: "<strong>使う公式（Completeness）：</strong><br>$IG_1+IG_2=F(x)-F(x')$<br><br><strong>代入：</strong>$IG_2=0.8-0.2-0.25=0.35$。<br><strong>答え：</strong>0.35です。"
        },
        {
            id: "xai-gradcam-vs-ig",
            category: "XAIの識別",
            question: "Grad-CAMとIntegrated Gradientsの典型的な違いとして正しいものはどれか。",
            options: ["Grad-CAMは畳み込み特徴map由来の粗い位置、IGは入力特徴ごとの寄与を示す", "IGは勾配を使わない", "Grad-CAMは常にモデル非依存", "両者は完全に同じ"],
            answer: 0,
            explanation: "どちらも勾配を使います。Grad-CAMはCNNの空間的な注目位置、IGはbaselineからの経路積分による入力特徴の寄与を示します。"
        },
        {
            id: "xai-lime",
            category: "LIME",
            question: "LIMEの基本的な説明方法はどれか。",
            options: ["説明したい入力の近傍を変化させ、そこでブラックボックスの挙動を単純モデルで局所近似する", "全データで必ず同じ線形モデルを作る", "CNNの特徴mapだけを使う", "協力ゲーム理論だけを使う"],
            answer: 0,
            explanation: "入力を少し変えたサンプルを作り、元の入力に近いものを重視して線形モデルなどを学習します。ブラックボックス内部を知らなくても使える局所説明です。"
        },
        {
            id: "xai-lime-local",
            category: "LIME",
            question: "LIMEの説明について正しい注意点はどれか。",
            options: ["近傍の作り方や乱数により説明が変わり得て、局所近似の忠実度確認が必要", "必ず大域的に完全一致する", "因果関係を必ず証明する", "勾配がないモデルでは使えない"],
            answer: 0,
            explanation: "LIMEは1件の周辺だけを単純モデルで近似します。近傍サンプルの作り方次第で説明が変わるため、モデル全体の法則と誤解しないことが重要です。"
        },
        {
            id: "xai-shap-theory",
            category: "SHAP",
            question: "SHAPのShapley Valueが由来する分野はどれか。",
            options: ["協力ゲーム理論", "フーリエ解析", "制御理論", "強化学習の報酬設計"],
            answer: 0,
            explanation: "特徴をプレイヤー、予測を協力で得た価値とみなし、特徴が参加する順序を公平に平均して貢献を配分します。"
        },
        {
            id: "xai-shap-additive-calc",
            category: "SHAP（計算）",
            kind: "計算",
            question: "SHAPの基準値$\\phi_0=0.20$、特徴寄与が$\\phi_1=+0.50,\\phi_2=-0.10$のとき、予測値はいくつか。",
            options: ["0.60", "0.40", "0.80", "0.20"],
            answer: 0,
            explanation: "<strong>使う公式（SHAPの加法性）：</strong><br>$f(x)=\\phi_0+\\phi_1+\\phi_2$<br><br><strong>代入：</strong>$0.20+0.50-0.10=0.60$。<br><strong>答え：</strong>0.60です。正の寄与は予測を押し上げ、負は下げます。"
        },
        {
            id: "xai-shap-two-feature-calc",
            category: "Shapley Value（計算）",
            kind: "計算",
            question: "2特徴A・Bで$v(\\emptyset)=0,v(A)=2,v(B)=1,v(A,B)=5$。AのShapley Valueはいくつか。",
            options: ["3", "2", "4", "5"],
            answer: 0,
            explanation: "<strong>使う公式（2特徴のShapley Value）：</strong><br>$\\phi_A=\\frac12\\{v(A)-v(\\emptyset)\\}+\\frac12\\{v(A,B)-v(B)\\}$<br><br>$v(S)$は特徴集合Sを使った出力、$\\emptyset$は特徴なしの基準です。$\\frac12$ずつなのは、AがBより先に加わる順序と、後に加わる順序を平均するためです。<br><br><strong>代入：</strong>$\\phi_A=\\frac12(2-0)+\\frac12(5-1)=1+2=3$。<br><strong>答え：</strong>3です。"
        },
        {
            id: "xai-lime-vs-shap",
            category: "LIME・SHAP",
            question: "LIMEとSHAPの組合せとして正しいものはどれか。",
            options: ["LIME＝近傍の局所代理モデル、SHAP＝Shapley Valueに基づく加法的寄与", "LIME＝クラス勾配、SHAP＝畳み込み特徴map", "両方とも必ずCNN専用", "両方とも因果効果を証明する"],
            answer: 0,
            explanation: "LIMEは予測点の周辺を単純モデルで近似します。SHAPは協力ゲーム理論に基づき、基準値から各特徴の寄与を配分します。"
        },
        {
            id: "misc-visual-siamese-triplet",
            setId: "misc-visual-architectures",
            setOrder: 1,
            category: "学習モデル図・共有Encoder",
            kind: "図表・長文",
            difficulty: "本試験型",
            question: `次のA・Bの構造と代表的な学習目的の組合せとして正しいものはどれか。図中のfθは、すべて同じ重みを共有するEncoderである。
                <div class="mix-visual-wrap"><div class="mix-visual-card">
                    <svg class="mix-wide-svg" viewBox="0 0 960 330" role="img" aria-label="Aは2入力を共有Encoderへ通して距離を測り、BはAnchor Positive Negativeを3つの共有Encoderへ通す">
                        <defs><marker id="mix-q-metric-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"/></marker></defs>
                        <rect x="20" y="43" width="440" height="260" rx="12" class="mix-purple"/><text x="40" y="72" class="mix-svg-title">A：2つの入力</text>
                        <rect x="48" y="102" width="84" height="44" rx="8" class="mix-box"/><text x="73" y="129" class="mix-svg-note">x1</text><rect x="48" y="205" width="84" height="44" rx="8" class="mix-box"/><text x="73" y="232" class="mix-svg-note">x2</text>
                        <line x1="140" y1="124" x2="190" y2="124" stroke="#486581" stroke-width="2" marker-end="url(#mix-q-metric-arrow)"/><line x1="140" y1="227" x2="190" y2="227" stroke="#486581" stroke-width="2" marker-end="url(#mix-q-metric-arrow)"/>
                        <rect x="202" y="91" width="116" height="66" rx="8" class="mix-blue"/><text x="239" y="119" class="mix-svg-label">fθ</text><text x="220" y="142" class="mix-svg-mini">共有重み</text><rect x="202" y="194" width="116" height="66" rx="8" class="mix-blue"/><text x="239" y="222" class="mix-svg-label">fθ</text><text x="220" y="245" class="mix-svg-mini">共有重み</text>
                        <line x1="326" y1="124" x2="371" y2="161" stroke="#486581" stroke-width="2" marker-end="url(#mix-q-metric-arrow)"/><line x1="326" y1="227" x2="371" y2="190" stroke="#486581" stroke-width="2" marker-end="url(#mix-q-metric-arrow)"/><rect x="382" y="148" width="58" height="56" rx="8" class="mix-green"/><text x="397" y="174" class="mix-svg-note">距離</text><text x="395" y="194" class="mix-svg-mini">D</text>
                        <rect x="500" y="43" width="440" height="260" rx="12" class="mix-orange"/><text x="520" y="72" class="mix-svg-title">B：3つの入力</text>
                        <g><rect x="524" y="91" width="82" height="42" rx="8" class="mix-blue"/><rect x="524" y="148" width="82" height="42" rx="8" class="mix-green"/><rect x="524" y="205" width="82" height="42" rx="8" class="mix-orange"/></g><text x="553" y="117" class="mix-svg-note">A</text><text x="553" y="174" class="mix-svg-note">P</text><text x="553" y="231" class="mix-svg-note">N</text>
                        <g><rect x="660" y="84" width="100" height="54" rx="8" class="mix-blue"/><rect x="660" y="141" width="100" height="54" rx="8" class="mix-blue"/><rect x="660" y="198" width="100" height="54" rx="8" class="mix-blue"/></g><text x="697" y="116" class="mix-svg-label">fθ</text><text x="697" y="173" class="mix-svg-label">fθ</text><text x="697" y="230" class="mix-svg-label">fθ</text>
                        <path d="M606 112 H652 M606 169 H652 M606 226 H652" stroke="#486581" stroke-width="2" marker-end="url(#mix-q-metric-arrow)"/>
                        <path d="M768 111 L837 154 M768 168 H837 M768 225 L837 182" stroke="#486581" stroke-width="2"/><rect x="840" y="140" width="78" height="58" rx="8" class="mix-green"/><text x="854" y="165" class="mix-svg-note">相対距離</text><text x="858" y="187" class="mix-svg-mini">AP&lt;AN</text>
                        <text x="42" y="286" class="mix-svg-note">同じ組を近く、異なる組をmargin以上遠く</text><text x="522" y="286" class="mix-svg-note">A-PをA-Nよりmargin以上近く</text>
                    </svg>
                </div></div>`,
            options: ["A＝Triplet Network＋Triplet Loss、B＝Siamese Network＋Contrastive Loss", "A＝Siamese Network＋Contrastive Loss、B＝Triplet Network＋Triplet Loss", "A＝Grad-CAM、B＝SHAP", "A＝DQN、B＝A3C"],
            answer: 1,
            explanation: "<strong>図の決め手：</strong>Aは共有Encoderが2枝で距離Dを出し、BはAnchor・Positive・Negativeの3枝です。<br><strong>正解：</strong>A＝Siamese Network＋Contrastive Loss、B＝Triplet Network＋Triplet Lossです。<br><strong>他候補との違い：</strong>Grad-CAM/SHAPは説明手法、DQN/A3Cは強化学習モデルで、入力間距離を共有Encoderで学ぶ図ではありません。"
        },
        {
            id: "misc-visual-xai-io",
            setId: "misc-visual-architectures",
            setOrder: 2,
            category: "XAI図・入力と出力",
            kind: "図表・長文",
            difficulty: "本試験型",
            question: `次のA〜Dに対応するXAI手法の組合せはどれか。
                <div class="mix-table-wrap">
                    <table class="mix-table" aria-label="4つのXAI手法が使う情報と返す説明の比較">
                        <tr><th>図</th><th>説明へ入れる情報</th><th>返すもの</th></tr>
                        <tr><td><strong>A</strong></td><td>対象クラスの勾配 ＋ 畳み込み特徴map</td><td>画像上の粗い注目ヒートマップ</td></tr>
                        <tr><td><strong>B</strong></td><td>baseline → 実入力までの経路上の勾配</td><td>入力特徴ごとの寄与</td></tr>
                        <tr><td><strong>C</strong></td><td>説明したい1件の近傍を変化させた予測</td><td>近傍でだけ合う単純な局所代理モデル</td></tr>
                        <tr><td><strong>D</strong></td><td>特徴が参加する組合せごとの予測変化</td><td>Shapley Valueによる加法的寄与</td></tr>
                    </table>
                </div>`,
            options: ["A＝LIME、B＝SHAP、C＝Grad-CAM、D＝IG", "A＝SHAP、B＝LIME、C＝IG、D＝Grad-CAM", "A＝Grad-CAM、B＝IG、C＝LIME、D＝SHAP", "A＝IG、B＝Grad-CAM、C＝SHAP、D＝LIME"],
            answer: 2,
            explanation: "<strong>図の決め手：</strong>場所＋CNN特徴map＝Grad-CAM、baselineからの経路＝IG、近傍の単純モデル＝LIME、特徴の組合せとShapley Value＝SHAPです。<br><strong>正解：</strong>A＝Grad-CAM、B＝Integrated Gradients、C＝LIME、D＝SHAPです。<br><strong>他候補との違い：</strong>Grad-CAMはCNNの空間ヒートマップ、IGは入力特徴寄与、LIMEはモデル非依存の局所近似、SHAPは加法的寄与という出力の違いで見分けます。"
        }
    ]
};
