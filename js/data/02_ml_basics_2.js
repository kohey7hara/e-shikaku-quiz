window.quizData = {
    title: "2-（１）機械学習の基礎 Vol.2：検証・性能指標",
    
    cheatSheet: `
        <h3>■ 混同行列 (Confusion Matrix) の読み解き方</h3>
        <p>「予測」が主語か、「実際」が主語かで名前が決まります。</p>
        <table style="text-align:center;">
            <tr>
                <th style="background:#eee;"></th>
                <th style="background:#eef;">予測：Positive (1)<br><small>「ある！」と予測</small></th>
                <th style="background:#fee;">予測：Negative (0)<br><small>「ない...」と予測</small></th>
            </tr>
            <tr>
                <th style="background:#eef;">実際：Positive (1)<br><small>実は「ある」</small></th>
                <td style="color:blue;"><strong>TP</strong> (True Positive)<br>ヒット（正解）</td>
                <td style="color:red;"><strong>FN</strong> (False Negative)<br><strong>見逃し</strong>（偽陰性）<br><small>病気を見落とす等</small></td>
            </tr>
            <tr>
                <th style="background:#fee;">実際：Negative (0)<br><small>実は「ない」</small></th>
                <td style="color:red;"><strong>FP</strong> (False Positive)<br><strong>誤警報</strong>（偽陽性）<br><small>スパムじゃないのに隔離等</small></td>
                <td style="color:blue;"><strong>TN</strong> (True Negative)<br>正解（真陰性）</td>
            </tr>
        </table>

        <h3>■ 分類指標：分母を見れば意味が分かる</h3>
        <p>「何を減らしたいか」で使い分けます。両立は困難です。</p>
        <table>
            <tr><th>指標</th><th>数式・意味</th><th>脳内イメージ・重視する場面</th></tr>
            <tr>
                <td><strong>適合率</strong><br>(Precision)</td>
                <td>$\\frac{TP}{TP + \\mathbf{FP}}$<br>予測した中で、どれだけ当たったか？</td>
                <td><strong>「オオカミ少年にならない」</strong><br>・<strong>誤検知(FP)</strong> を減らしたい。<br>・例：スパムフィルタ（大事なメールを消したくない）</td>
            </tr>
            <tr>
                <td><strong>再現率／真陽性率</strong><br>(Recall / TPR)</td>
                <td>$\\frac{TP}{TP + \\mathbf{FN}}$<br>取りこぼしなく拾えたか？</td>
                <td><strong>「怪しい奴は全員拾う」</strong><br>・<strong>見逃し(FN)</strong> を減らしたい。<br>・例：がん検診（病気の人を見逃したくない）</td>
            </tr>
            <tr>
                <td><strong>特異度</strong><br>(Specificity / TNR)</td>
                <td>$\\frac{TN}{TN + \\mathbf{FP}}$<br>実際の陰性を、正しく陰性と判定できたか？</td>
                <td><strong>「無実の人を巻き込まない」</strong><br>・<strong>誤検知(FP)</strong> を減らしたい。<br>・陰性側の正解率。</td>
            </tr>
            <tr>
                <td><strong>偽陽性率</strong><br>(FPR)</td>
                <td>$\\frac{FP}{FP + TN}=1-\\text{Specificity}$<br>実際は陰性なのに陽性と誤判定した割合。</td>
                <td><strong>「誤警報の割合」</strong><br>・小さいほどよい。<br>・ROC曲線の<strong>横軸</strong>。</td>
            </tr>
            <tr>
                <td><strong>F値</strong><br>(F-measure)</td>
                <td>$2 \\cdot \\frac{Pre \\cdot Rec}{Pre + Rec}$<br>（調和平均）</td>
                <td><strong>「バランス重視」</strong><br>PrecisionとRecallのバランスが良いと高くなる。<br>片方が0だと0になる。</td>
            </tr>
            <tr>
                <td><strong>正解率</strong><br>(Accuracy)</td>
                <td>$\\frac{TP+TN}{All}$</td>
                <td><strong>「全体の正答率」</strong><br>※不均衡データ（病気1人、健康99人など）では、全員「健康」と答えるだけで99%になるため<strong>信用できない</strong>。</td>
            </tr>
        </table>

        <h3>■ ROC曲線 / AUC：しきい値を動かした軌跡</h3>
        <style>
            .roc-wrap { background:#f7fbff; border:1px solid #cbd9e8; border-radius:14px; padding:12px; margin:14px 0; }
            .roc-svg { display:block; width:min(100%,720px); height:auto; margin:auto; }
            .roc-axis { stroke:#24364b; stroke-width:2.5; }
            .roc-grid { stroke:#c9d5e2; stroke-width:1; }
            .roc-area { fill:#d9edff; opacity:.9; }
            .roc-line { fill:none; stroke:#1769aa; stroke-width:6; stroke-linecap:round; stroke-linejoin:round; }
            .roc-random { fill:none; stroke:#8a96a3; stroke-width:2.5; stroke-dasharray:9 7; }
            .roc-dot { fill:#e67e22; stroke:white; stroke-width:3; }
            .roc-ideal { fill:#27ae60; stroke:white; stroke-width:3; }
            .roc-svg text { fill:#24364b; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif; font-size:16px; }
            .roc-svg .roc-small { font-size:14px; }
            .roc-svg .roc-strong { font-weight:700; }
            .roc-calc { display:grid; grid-template-columns:repeat(4,minmax(135px,1fr)); gap:8px; margin-top:12px; }
            .roc-calc div { background:white; border:1px solid #cbd9e8; border-radius:9px; padding:9px; text-align:center; }
            .roc-calc strong { display:block; color:#1769aa; }
            @media(max-width:680px) { .roc-calc { grid-template-columns:repeat(2,minmax(125px,1fr)); } .roc-svg text { font-size:14px; } }
        </style>
        <p>分類スコアの<strong>しきい値</strong>を高い値から低い値へ動かし、そのたびに得られる $(FPR,TPR)$ を結んだ曲線です。左上へ膨らむほど、誤警報を抑えながら正例を多く拾えます。</p>
        <div class="roc-wrap">
            <svg class="roc-svg" viewBox="0 0 700 430" role="img" aria-labelledby="roc-title roc-desc">
                <title id="roc-title">ROC曲線とAUCの模式図</title>
                <desc id="roc-desc">横軸が偽陽性率FPR、縦軸が真陽性率TPR。ランダム分類は対角線、性能の良いモデルは左上へ膨らむ。曲線下の青い領域がAUC。</desc>
                <line class="roc-grid" x1="70" y1="195" x2="630" y2="195"></line>
                <line class="roc-grid" x1="350" y1="40" x2="350" y2="350"></line>
                <line class="roc-axis" x1="70" y1="350" x2="642" y2="350"></line>
                <line class="roc-axis" x1="70" y1="362" x2="70" y2="30"></line>
                <path class="roc-area" d="M70 350 L98 235 L160 145 L280 86 L430 58 L630 40 L630 350 Z"></path>
                <path class="roc-random" d="M70 350 L630 40"></path>
                <path class="roc-line" d="M70 350 L98 235 L160 145 L280 86 L430 58 L630 40"></path>
                <circle class="roc-dot" cx="98" cy="235" r="7"></circle>
                <circle class="roc-dot" cx="160" cy="145" r="7"></circle>
                <circle class="roc-dot" cx="430" cy="58" r="7"></circle>
                <circle class="roc-ideal" cx="70" cy="40" r="8"></circle>
                <text x="77" y="55" class="roc-small roc-strong">理想点 (FPR=0, TPR=1)</text>
                <text x="112" y="239" class="roc-small">しきい値：高</text>
                <text x="174" y="139" class="roc-small">中</text>
                <text x="443" y="54" class="roc-small">低</text>
                <text x="372" y="230" class="roc-small">ランダム分類：AUC=0.5</text>
                <text x="300" y="328" class="roc-strong">曲線の下の面積 = AUC</text>
                <text x="58" y="372">0</text><text x="622" y="372">1</text>
                <text x="44" y="355">0</text><text x="44" y="47">1</text>
                <text x="255" y="408" class="roc-strong">FPR = FP / (FP + TN)</text>
                <text x="19" y="260" transform="rotate(-90 19 260)" class="roc-strong">TPR = TP / (TP + FN)</text>
            </svg>
            <div class="roc-calc">
                <div><strong>TP = 40</strong>正例を正しく検出</div>
                <div><strong>FN = 10</strong>正例を見逃し</div>
                <div><strong>FP = 5</strong>陰性を誤検知</div>
                <div><strong>TN = 45</strong>陰性を正しく判定</div>
            </div>
        </div>
        <p><strong>上の例：</strong>$TPR=40/(40+10)=0.8$、特異度 $=45/(45+5)=0.9$、$FPR=5/(5+45)=0.1$。したがってROC曲線上の点は <strong>$(FPR,TPR)=(0.1,0.8)$</strong> です。</p>
        <ul>
            <li><strong>しきい値を下げる：</strong>Positive判定が増えるため、通常はTPRもFPRも上がり、右上へ進む。</li>
            <li><strong>AUC：</strong>ROC曲線の下の面積。1に近いほど識別能力が高く、0.5はランダム分類。</li>
            <li><strong>軸の順番：</strong>座標は $(x,y)=(FPR,TPR)$。TPRを先に書かないよう注意。</li>
        </ul>

        <h3>■ その他の重要指標</h3>
        <table>
            <tr><th>名称</th><th>内容・特徴</th></tr>
            <tr>
                <td><strong>IoU</strong><br>(Intersection over Union)</td>
                <td>
                    物体検出で利用。「重なり具合」を測る。<br>
                    $\\frac{\\text{積集合 (重なり)}}{\\text{和集合 (合わせた面積)}} = \\frac{A \\cap B}{A \\cup B}$
                </td>
            </tr>
            <tr>
                <td><strong>Micro平均</strong><br>vs<br><strong>Macro平均</strong></td>
                <td>
                    多クラス分類での平均の取り方。<br>
                    ・<strong>Micro</strong>: 全件合計してから計算（<strong>多数派</strong>クラスに引きずられる）<br>
                    ・<strong>Macro</strong>: クラスごとに計算して平均（<strong>少数派</strong>も平等に評価）
                </td>
            </tr>
        </table>

        <h3>■ パープレキシティ：言語モデルの「迷いの数」</h3>
        <style>
            .ppl-flow { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; margin:14px 0; }
            .ppl-node { border:2px solid #3498db; background:#eef7ff; border-radius:10px; padding:10px 13px; text-align:center; min-width:150px; }
            .ppl-node strong { display:block; color:#1769aa; }
            .ppl-arrow { font-size:1.3em; color:#777; font-weight:bold; }
            .ppl-choice { display:flex; justify-content:center; gap:7px; margin-top:7px; }
            .ppl-choice span { border:1px solid #bbb; border-radius:6px; padding:4px 8px; background:white; }
        </style>
        <p>パープレキシティ（Perplexity; PPL）は、モデルが次の単語を平均して何択くらいで迷っているかを表す指標です。</p>
        <div class="ppl-flow">
            <div class="ppl-node"><strong>正解単語の確率</strong>高いほどよい</div>
            <div class="ppl-arrow">→</div>
            <div class="ppl-node"><strong>平均損失 $H$</strong>低いほどよい</div>
            <div class="ppl-arrow">→</div>
            <div class="ppl-node"><strong>$PPL=e^H$</strong>低いほどよい</div>
        </div>
        <div class="ppl-node" style="border-color:#27ae60;background:#effaf4;max-width:520px;margin:auto;">
            <strong>例：PPL = 4</strong>
            <div class="ppl-choice"><span>猫</span><span>犬</span><span>鳥</span><span>魚</span></div>
            <small>平均的に「同程度にありそうな4候補」で迷うイメージ</small>
        </div>
        <p><strong>試験の罠：</strong>PPLは正解率ではありません。同じデータ・同じトークン化条件で比較し、原則として<strong>小さい方が良い</strong>と判断します。</p>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "混同行列",
            question: "混同行列において、モデルが「Positive」と予測したが、実際には「Negative」だったケース（誤警報）を何と呼ぶか。",
            options: ["TP (True Positive)", "FP (False Positive)", "FN (False Negative)", "TN (True Negative)"],
            answer: 1,
            explanation: "False（間違って）Positive（陽性）と判定したので FP です。日本語では「偽陽性」または「第1種の過誤」とも呼ばれます。"
        },
        {
            category: "評価指標",
            question: "「再現率 (Recall)」の定義式として正しいものはどれか。",
            options: ["TP / (TP + FP)", "TP / (TP + FN)", "(TP + TN) / 全体", "FP / (FP + TN)"],
            answer: 1,
            explanation: "「実際にPositiveであるもの(TP+FN)」の中で、「正しくPositiveと判定できたもの(TP)」の割合です。"
        },
        {
            category: "F値",
            question: "適合率(Precision)と再現率(Recall)の「F値 (F1-score)」は、どのような平均を用いて計算されるか。",
            options: ["算術平均（足して2で割る）", "幾何平均（掛けてルート）", "調和平均（逆数の平均の逆数）", "加重平均"],
            answer: 2,
            explanation: "F値は極端に低い値の影響を受けやすくするために調和平均を使います。式は $2 \\times \\frac{Precision \\times Recall}{Precision + Recall}$ です。"
        },
        {
            category: "検証手法",
            question: "「k-分割交差検証 (k-fold Cross Validation)」の手順として正しいものはどれか。",
            options: ["データをk個に分割し、そのうち1つをテスト用、残りを学習用として、k回入れ替えて評価する", "データをk個に分割し、それぞれのデータでk回学習を繰り返して平均をとる", "学習データをk回コピーしてデータ量を増やしてから検証を行う", "モデルのパラメータをk種類用意して、最も良いものを選ぶ"],
            answer: 0,
            explanation: "データを無駄なく使い、かつデータの偏りによる評価ブレを防ぐための手法です。"
        },
        {
            category: "ROC曲線",
            question: "ROC曲線の縦軸と横軸の組み合わせとして正しいものはどれか。",
            options: ["縦軸：適合率(Precision)、横軸：再現率(Recall)", "縦軸：真陽性率(TPR)、横軸：偽陽性率(FPR)", "縦軸：正解率(Accuracy)、横軸：F値", "縦軸：真陽性率(TPR)、横軸：特異度(Specificity)"],
            answer: 1,
            explanation: "ROC曲線は、閾値を変化させたときの TPR (Recall) と FPR (1 - Specificity) のトレードオフを描いたものです。"
        },
        {
            category: "IoU",
            question: "物体検出における「IoU (Intersection over Union)」の計算式はどれか。（A：予測領域、B：正解領域）",
            options: ["(A ∩ B) / (A ∪ B)", "(A ∪ B) / (A ∩ B)", "(A ∩ B) / A", "A / B"],
            answer: 0,
            explanation: "「重なっている面積」を「合わせた面積（和集合）」で割った値です。ジャカール係数とも呼ばれます。"
        },
        {
            category: "回帰の指標",
            question: "回帰問題の評価指標である「RMSE (二乗平均平方根誤差)」の特徴はどれか。",
            options: ["値が0から1の間に収まる", "大きな誤差（外れ値）の影響を強く受ける", "誤差の絶対値の平均である", "正解率を表す"],
            answer: 1,
            explanation: "誤差を二乗してから平均をとるため、大きな誤差があると値が跳ね上がります。外れ値に敏感です。"
        },
        {
            category: "多クラス分類",
            question: "多クラス分類において、クラスごとのサンプル数の偏りを考慮せず、全サンプルのTP, FP等を合計してから算出する平均手法はどれか。",
            options: ["Micro平均", "Macro平均", "Weighted平均", "Harmonic平均"],
            answer: 0,
            explanation: "Micro平均は全体を合算して計算するため、サンプル数が多いクラス（多数派）の精度に強く影響されます。"
        },
        {
            category: "ホールドアウト法",
            question: "ホールドアウト法の説明として適切なものはどれか。",
            options: ["データを学習用とテスト用の2つ（または検証用含む3つ）に分割して評価する手法", "データをk個に分割して交差検証する手法", "過去のデータを使わず、未来のデータのみで評価する手法", "全データを学習に使い、同じデータでテストする手法"],
            answer: 0,
            explanation: "最も単純な検証手法ですが、データの分け方によって評価結果が変わる（偶然良いデータがテストに回るなど）リスクがあります。"
        },
        {
            category: "混同行列",
            question: "「特異度 (Specificity)」とは何を表す指標か。",
            options: ["実際にPositiveなデータのうち、正しくPositiveと予測された割合", "実際にNegativeなデータのうち、正しくNegativeと予測された割合", "Positiveと予測されたデータのうち、実際にPositiveだった割合", "全データのうち正解した割合"],
            answer: 1,
            explanation: "特異度は「陰性の正解率」です。式は $TN / (TN + FP)$ です。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "指標の使い分け(応用)",
            question: "「癌の検診」のように、実際に病気である人（Positive）を見逃すことのリスクが非常に高い場合、最も重視して最大化すべき指標はどれか。",
            options: ["正解率 (Accuracy)", "適合率 (Precision)", "再現率 (Recall)", "特異度 (Specificity)"],
            answer: 2,
            explanation: "「見逃し（False Negative）」を減らしたい＝「病気の人は全員拾いたい」という場合は、再現率 (Recall) を重視します。"
        },
        {
            category: "指標の使い分け(応用)",
            question: "逆に、「スパムメールフィルタ」のように、重要なメールを誤ってスパム判定（誤検知）してしまうのを絶対に避けたい場合、重視すべき指標はどれか。",
            options: ["正解率 (Accuracy)", "適合率 (Precision)", "再現率 (Recall)", "F値"],
            answer: 1,
            explanation: "「スパムだと予測したものの中に、通常メールが混ざらないようにしたい（False Positiveを減らしたい）」ので、適合率 (Precision) を重視します。"
        },
        {
            category: "不均衡データ(応用)",
            question: "正例が1%、負例が99%という極端な不均衡データにおいて、すべてのデータを「負例（Negative）」と予測するモデルを作った。この時の評価として正しいものはどれか。",
            options: ["正解率(Accuracy)は99%と非常に高くなるが、再現率(Recall)は0%であり、無意味なモデルである", "正解率も再現率も高く、優秀なモデルである", "正解率は50%程度になる", "F値は非常に高くなる"],
            answer: 0,
            explanation: "Accuracyの罠です。多数派クラスを予測するだけで正解率は高くなりますが、少数派（検知したい対象）を全く見つけられていないため、実用性はありません。"
        },
        {
            category: "ROC/AUC(応用)",
            question: "ROC曲線を描いたとき、グラフが「対角線（左下から右上への直線）」と重なった場合、そのモデルのAUCは約0.5となる。これはどのような状態を意味するか。",
            options: ["完璧に分類できている理想的なモデル", "ランダムに予測（コイントス）しているのと同じ性能のモデル", "全てのデータをPositiveと予測しているモデル", "過学習しているモデル"],
            answer: 1,
            explanation: "AUC=0.5 はランダム予測（当てずっぽう）と同等の性能であることを意味します。AUC=1.0 が理想的です。"
        },
        {
            category: "F値の計算(応用)",
            question: "あるモデルの適合率(Precision)が 0.8、再現率(Recall)が 0.5 であった。このときのF値はいくらか。",
            options: ["0.65", "約 0.62", "0.4", "1.3"],
            answer: 1,
            explanation: "調和平均の計算: $2 \\times \\frac{0.8 \\times 0.5}{0.8 + 0.5} = 2 \\times \\frac{0.4}{1.3} = \\frac{0.8}{1.3} \\approx 0.615$。"
        },
        {
            category: "mAP(応用)",
            question: "物体検出で使われる「mAP (mean Average Precision)」の説明として正しいものはどれか。",
            options: ["各クラスごとのIoUの平均値", "各クラスごとにPR曲線（Precision-Recall曲線）の下側面積(AP)を求め、それを全クラスで平均したもの", "全ての検出ボックスの正解率の平均", "IoUが0.5を超えたものの割合"],
            answer: 1,
            explanation: "mAPは、クラスごとの検出精度（AP）を平均した総合的な指標です。閾値を変化させた時のPrecisionとRecallのグラフ面積を使います。"
        },
        {
            category: "回帰指標の比較(応用)",
            question: "MAE (平均絶対誤差) が RMSE (二乗平均平方根誤差) よりも好まれるケースはどのような場合か。",
            options: ["外れ値（異常値）の影響をあえて大きく評価したい場合", "外れ値の影響を抑えて、一般的な誤差の大きさを評価したい場合", "計算速度を最優先したい場合", "常にRMSEの方が優れているため、MAEを使う理由はない"],
            answer: 1,
            explanation: "RMSEは二乗するため外れ値の影響を過大に受けます。MAEは絶対値なので外れ値に対してロバスト（頑健）です。"
        },
        {
            category: "Micro/Macro平均(応用)",
            question: "クラスA（10件）、クラスB（10件）、クラスC（1000件）というデータセットがある。クラスAとBの精度が重要である場合、どちらの平均手法を見るべきか。",
            options: ["Micro平均", "Macro平均", "どちらでも変わらない", "Accuracy"],
            answer: 1,
            explanation: "Micro平均だと数が多いクラスCの成績に支配されてしまいます。Macro平均なら各クラスを平等（1/3ずつ）に扱うため、少数クラスA,Bの成績も反映されます。"
        },
        {
            category: "PR曲線(応用)",
            question: "ROC曲線ではなく「PR曲線（Precision-Recall Curve）」を使うべき場面はどのような時か。",
            options: ["陽性（Positive）と陰性（Negative）のバランスがとれている時", "陰性（Negative）が圧倒的に多く、陽性（Positive）の検出に注目したい不均衡データの場合", "回帰問題を解いている時", "データ数が非常に少ない時"],
            answer: 1,
            explanation: "ROC曲線はTN（大量の陰性）の影響を受けにくいため、不均衡データでは過大評価されることがあります。その場合、TNを使わないPR曲線の方が実態を表します。"
        },
        {
            category: "交差検証(応用)",
            question: "k-分割交差検証において、kの値を大きくしすぎた場合（例：k=データ数、Leave-One-Out）のデメリットは何か。",
            options: ["計算コストが非常に高くなる", "バイアスが高くなる", "データが無駄になる", "評価結果の信頼性が下がる"],
            answer: 0,
            explanation: "学習と評価をデータ数分だけ繰り返すことになるため、計算時間が膨大になります。"
        },
        // ---------------------------------------------------------
        // 【混同行列・ROC 計算演習】 Q21 - Q26
        // ---------------------------------------------------------
        {
            id: "metric-specificity-calc",
            category: "特異度（計算）",
            kind: "手計算",
            difficulty: "必須",
            question: "混同行列が $TP=40, FN=10, FP=5, TN=45$ のとき、特異度（Specificity）はいくつか。",
            options: ["0.8", "0.9", "0.1", "0.5"],
            answer: 1,
            explanation: "特異度は実際の陰性$TN+FP$を分母にします。$Specificity=TN/(TN+FP)=45/(45+5)=45/50=0.9$です。陰性50件のうち45件を正しく陰性と判定できました。"
        },
        {
            id: "metric-tpr-calc",
            category: "TPR（計算）",
            kind: "手計算",
            difficulty: "必須",
            question: "混同行列が $TP=40, FN=10, FP=5, TN=45$ のとき、TPR（真陽性率）はいくつか。",
            options: ["0.1", "0.9", "0.8", "0.45"],
            answer: 2,
            explanation: "$TPR=TP/(TP+FN)=40/(40+10)=40/50=0.8$です。TPRはRecall（再現率）と同じで、実際の正例をどれだけ拾えたかを表します。"
        },
        {
            id: "metric-fpr-calc",
            category: "FPR（計算）",
            kind: "手計算",
            difficulty: "必須",
            question: "混同行列が $TP=40, FN=10, FP=5, TN=45$ のとき、FPR（偽陽性率）はいくつか。",
            options: ["0.8", "0.9", "0.5", "0.1"],
            answer: 3,
            explanation: "$FPR=FP/(FP+TN)=5/(5+45)=5/50=0.1$です。また、$FPR=1-Specificity=1-0.9=0.1$としても求められます。"
        },
        {
            id: "metric-roc-point-calc",
            category: "ROC座標（計算）",
            kind: "手計算",
            difficulty: "本試験型",
            question: "混同行列が $TP=40, FN=10, FP=5, TN=45$ のとき、このしきい値がROC曲線上に作る点 $(x,y)$ はどれか。",
            options: ["$(0.1,0.8)$", "$(0.8,0.1)$", "$(0.9,0.8)$", "$(0.1,0.9)$"],
            answer: 0,
            explanation: "ROC曲線の横軸$x$はFPR、縦軸$y$はTPRです。$FPR=0.1$、$TPR=0.8$なので$(x,y)=(0.1,0.8)$です。特異度0.9を横軸へ置かないことが試験の注意点です。"
        },
        {
            id: "metric-roc-threshold",
            category: "ROCとしきい値",
            kind: "仕組み",
            difficulty: "標準",
            question: "陽性と判定するスコアのしきい値を下げたとき、一般にTPRとFPRはどのように変化するか。",
            options: ["TPRは下がり、FPRは上がる", "TPRは上がり、FPRは下がる", "TPRもFPRも上がる", "TPRもFPRも必ず0になる"],
            answer: 2,
            explanation: "しきい値を下げるとPositive判定が増えます。正例を拾いやすくなってTPRは上がりますが、陰性も誤ってPositiveにしやすくなるためFPRも上がります。ROC曲線では右上方向へ進みます。"
        },
        {
            id: "metric-auc-ranking",
            category: "AUC（意味）",
            kind: "理解",
            difficulty: "標準",
            question: "AUCの確率的な解釈として最も適切なものはどれか。",
            options: ["モデルの正解率が必ずAUCと同じになる", "ランダムに選んだ正例へ、ランダムに選んだ陰性より高いスコアを付ける確率と解釈できる", "陽性の割合そのものを表す", "最適なしきい値を一意に決める値である"],
            answer: 1,
            explanation: "AUCは正例と陰性を1件ずつ無作為に選んだとき、正例のスコアを陰性より高く順位付けできる確率として解釈できます。特定のしきい値1点ではなく、しきい値全体での識別能力です。"
        },
        {
            id: "metric-perplexity-meaning",
            category: "パープレキシティ",
            question: "言語モデルのパープレキシティ（PPL）が4であるとき、最も近い直感的な説明はどれか。",
            options: ["次のトークンについて、平均的に同程度の4候補で迷っている", "正解率が必ず25%である", "4トークン先まで必ず予測できる", "語彙数が4である"],
            answer: 0,
            explanation: "PPLはモデルの不確実性を『実効的な選択肢数』として見たものです。正解率や語彙数そのものではありません。"
        },
        {
            id: "metric-perplexity-calc",
            category: "パープレキシティ(計算)",
            question: "1トークン当たりの平均クロスエントロピーが $\\ln 5$ のとき、パープレキシティはいくつか。",
            options: ["5", "$\\ln5$", "25", "$1/5$"],
            answer: 0,
            explanation: "$PPL=\\exp(H)$ なので、$\\exp(\\ln5)=5$ です。対数の底が2なら $PPL=2^H$ と書けます。"
        },
        {
            id: "metric-perplexity-compare",
            category: "パープレキシティ(比較)",
            question: "同じテストデータと同じトークナイザで、モデルAのPPLが12、モデルBが8だった。PPLだけを基準にするとどちらが良いか。",
            options: ["モデルB", "モデルA", "必ず同等", "PPLは大きいほど良いのでA"],
            answer: 0,
            explanation: "同条件ならPPLが低いモデルBの方が、正解系列へ高い確率を割り当てています。トークナイザやデータが違うPPLは単純比較できません。"
        }
    ]
};
