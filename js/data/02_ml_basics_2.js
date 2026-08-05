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
            .roc-chart-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; }
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
            @media(max-width:680px) { .roc-calc { grid-template-columns:repeat(2,minmax(125px,1fr)); } .roc-svg { width:600px; max-width:none; margin:0; } .roc-svg text { font-size:15px; } }
        </style>
        <p>分類スコアの<strong>しきい値</strong>を高い値から低い値へ動かし、そのたびに得られる $(FPR,TPR)$ を結んだ曲線です。左上へ膨らむほど、誤警報を抑えながら正例を多く拾えます。</p>
        <div class="roc-wrap">
            <div class="roc-chart-scroll" aria-label="ROC曲線の図。画面が狭い場合は横にスクロールできます。">
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
            </div>
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

        <h3>■ PR曲線 / AP：正例を拾う力と、予測の信頼性</h3>
        <p>PR曲線（Precision-Recall Curve）は、しきい値を動かしたときの<strong>再現率と適合率の組</strong>を結びます。正例が少ない不均衡データでは、誤検知FPが性能へ直接表れるため、ROC曲線より実態を捉えやすいことがあります。</p>
        <table>
            <tr><th>曲線</th><th>横軸 $x$</th><th>縦軸 $y$</th><th>特に見たい場面</th></tr>
            <tr>
                <td><strong>ROC曲線</strong></td>
                <td>$FPR=\\frac{FP}{FP+TN}$</td>
                <td>$TPR=Recall=\\frac{TP}{TP+FN}$</td>
                <td>正例と負例を含む識別・順位付け能力を見たい</td>
            </tr>
            <tr>
                <td><strong>PR曲線</strong></td>
                <td>$Recall=\\frac{TP}{TP+FN}$</td>
                <td>$Precision=\\frac{TP}{TP+FP}$</td>
                <td><strong>正例が少ない</strong>状況で、見逃しと誤検知を見たい</td>
            </tr>
        </table>
        <style>
            .pr-wrap { background:#fffaf2; border:1px solid #e7d4ad; border-radius:14px; padding:12px; margin:14px 0; }
            .pr-chart-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; }
            .pr-svg { display:block; width:min(100%,720px); height:auto; margin:auto; }
            .pr-axis { stroke:#24364b; stroke-width:2.5; }
            .pr-grid { stroke:#d8d1c2; stroke-width:1; }
            .pr-area { fill:#ffe6b8; opacity:.82; }
            .pr-line { fill:none; stroke:#d66a1f; stroke-width:6; stroke-linecap:round; stroke-linejoin:round; }
            .pr-baseline { fill:none; stroke:#8a96a3; stroke-width:2.5; stroke-dasharray:9 7; }
            .pr-dot { fill:#1769aa; stroke:white; stroke-width:3; }
            .pr-svg text { fill:#24364b; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif; font-size:16px; }
            .pr-svg .pr-small { font-size:14px; }
            .pr-svg .pr-strong { font-weight:700; }
            .pr-steps { display:grid; grid-template-columns:repeat(2,minmax(220px,1fr)); gap:8px; margin-top:12px; }
            .pr-steps div { background:white; border:1px solid #e7d4ad; border-radius:9px; padding:10px; }
            .pr-steps strong { display:block; color:#a94d12; }
            @media(max-width:680px) { .pr-steps { grid-template-columns:1fr; } .pr-svg { width:600px; max-width:none; margin:0; } .pr-svg text { font-size:15px; } }
        </style>
        <div class="pr-wrap">
            <div class="pr-chart-scroll" aria-label="PR曲線の図。画面が狭い場合は横にスクロールできます。">
                <svg class="pr-svg" viewBox="0 0 700 430" role="img" aria-labelledby="pr-title pr-desc">
                    <title id="pr-title">PR曲線とAPの模式図</title>
                    <desc id="pr-desc">横軸が再現率Recall、縦軸が適合率Precision。しきい値を下げると一般に右へ進み、適合率は下がりやすい。曲線下の領域がAPまたはAUPRC。</desc>
                    <line class="pr-grid" x1="70" y1="195" x2="630" y2="195"></line>
                    <line class="pr-grid" x1="350" y1="40" x2="350" y2="350"></line>
                    <line class="pr-axis" x1="70" y1="350" x2="642" y2="350"></line>
                    <line class="pr-axis" x1="70" y1="362" x2="70" y2="30"></line>
                    <path class="pr-area" d="M70 40 L130 50 L220 70 L350 84 L518 74 L590 145 L630 265 L630 350 L70 350 Z"></path>
                    <path class="pr-baseline" d="M70 319 L630 319"></path>
                    <path class="pr-line" d="M70 40 L130 50 L220 70 L350 84 L518 74 L590 145 L630 265"></path>
                    <circle class="pr-dot" cx="130" cy="50" r="7"></circle>
                    <circle class="pr-dot" cx="350" cy="84" r="7"></circle>
                    <circle class="pr-dot" cx="518" cy="74" r="8"></circle>
                    <circle class="pr-dot" cx="590" cy="145" r="7"></circle>
                    <text x="142" y="46" class="pr-small">しきい値：高</text>
                    <text x="535" y="67" class="pr-small pr-strong">例 (0.8, 0.889)</text>
                    <text x="520" y="139" class="pr-small">低</text>
                    <text x="360" y="245" class="pr-strong">曲線の下側 = AP / AUPRC</text>
                    <text x="380" y="312" class="pr-small">ランダム基準 = 正例率 0.10</text>
                    <text x="58" y="372">0</text><text x="622" y="372">1</text>
                    <text x="44" y="355">0</text><text x="44" y="47">1</text>
                    <text x="260" y="408" class="pr-strong">Recall = TP / (TP + FN)</text>
                    <text x="19" y="275" transform="rotate(-90 19 275)" class="pr-strong">Precision = TP / (TP + FP)</text>
                </svg>
            </div>
            <div class="pr-steps">
                <div><strong>① 横軸 Recall</strong>$40/(40+10)=0.8$</div>
                <div><strong>② 縦軸 Precision</strong>$40/(40+5)=8/9\\approx0.889$</div>
            </div>
        </div>
        <p><strong>したがってPR曲線上の点は $(Recall,Precision)=(0.8,0.889)$。</strong>ROC曲線とは横軸も縦軸も違うため、座標の順番に注意します。</p>
        <ul>
            <li><strong>しきい値を下げる：</strong>Positive判定が増えてRecallは通常上がり、FPも増えるためPrecisionは下がりやすい。ただし有限データでは上下に揺れることがあります。</li>
            <li><strong>ランダム分類の基準：</strong>Precisionはおおむね<strong>正例率</strong>。正例10%なら基準は0.10であり、ROC-AUCの基準0.5とは異なります。</li>
            <li><strong>AP / AUPRC：</strong>PR曲線を1つの値にまとめた指標で、大きいほどよい。問題で区間ごとのPrecisionが与えられたら、$AP=\\sum_i (R_i-R_{i-1})P_i$ として計算することがあります。</li>
        </ul>
        <p><strong>APの簡単な計算例：</strong>Recallが $0\\rightarrow0.5$ の区間でPrecisionが0.8、$0.5\\rightarrow1.0$ の区間で0.6なら、$AP=(0.5-0)\\times0.8+(1.0-0.5)\\times0.6=0.7$ です。補間方法が指定されている場合は、その定義に従います。</p>

        <h3>■ しきい値を下げたときの「矢印フレームワーク」</h3>
        <style>
            .threshold-start { background:#fff8e8; border:2px solid #e2a02b; border-radius:10px; padding:12px; margin:14px 0; text-align:center; font-size:1.08em; }
            .threshold-mantra { border-left:5px solid #27ae60; background:#effaf4; padding:12px 14px; margin:14px 0; }
            .threshold-mantra strong { display:block; color:#167247; }
        </style>
        <div class="threshold-start">
            <strong>しきい値 ↓ → 網を広げる → Positive判定 ↑</strong>
        </div>
        <table>
            <tr><th>網を広げた結果</th><th>指標の変化</th><th>曲線の動き</th></tr>
            <tr>
                <td><strong>TP ↑</strong><br>本当の陽性を拾う</td>
                <td><strong>Recall・TPR ↑</strong></td>
                <td>ROCは<strong>上</strong><br>PRは<strong>右</strong></td>
            </tr>
            <tr>
                <td><strong>FP ↑</strong><br>本当は陰性も巻き込む</td>
                <td><strong>FPR ↑</strong><br><strong>Precision ↓傾向</strong></td>
                <td>ROCは<strong>右</strong><br>PRは<strong>下がりやすい</strong></td>
            </tr>
        </table>
        <div class="threshold-mantra">
            <strong>これだけ覚える</strong>
            ROCは<strong>右上</strong>。PRは<strong>右へ進み、下がりやすい</strong>。
        </div>
        <p><small>※Precisionは、新しく拾ったデータによって一時的に上がることもあります。</small></p>

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

        <h3>■ パープレキシティ：Next Token Predictionの「迷い」を測る</h3>
        <style>
            .ppl-flow { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; margin:14px 0; }
            .ppl-node { border:2px solid #3498db; background:#eef7ff; border-radius:10px; padding:10px 13px; text-align:center; min-width:150px; }
            .ppl-node strong { display:block; color:#1769aa; }
            .ppl-arrow { font-size:1.3em; color:#777; font-weight:bold; }
            .ppl-formula { background:#f7fbff; border:1px solid #cbd9e8; border-radius:12px; padding:12px; margin:14px 0; text-align:center; overflow-x:auto; }
            .ppl-formula strong { display:block; color:#1769aa; }
            .ppl-first { background:#effaf4; border-left:5px solid #27ae60; padding:12px 14px; margin:14px 0; }
            .ppl-first strong { display:block; color:#167247; font-size:1.08em; }
            .ppl-story { display:grid; grid-template-columns:repeat(2,minmax(220px,1fr)); gap:9px; margin:14px 0; }
            .ppl-story div { border:1px solid #cbd9e8; border-radius:10px; padding:11px; background:#fff; }
            .ppl-story span { display:inline-block; margin-bottom:5px; color:#1769aa; font-weight:800; }
            .ppl-story strong { display:block; }
            .ppl-calc-steps { display:grid; grid-template-columns:repeat(3,minmax(150px,1fr)); gap:8px; margin:14px 0; }
            .ppl-calc-steps div { border:1px solid #cbd9e8; border-radius:9px; padding:10px; background:#f7fbff; }
            .ppl-calc-steps strong { display:block; color:#1769aa; }
            .ppl-example { display:grid; grid-template-columns:repeat(3,minmax(155px,1fr)); gap:8px; margin:14px 0; }
            .ppl-example div { border:1px solid #cbd9e8; border-radius:9px; padding:10px; text-align:center; background:white; }
            .ppl-example strong { display:block; color:#1769aa; }
            .ppl-rule { border-bottom:1px solid #dce3ed; padding:10px 0; }
            .ppl-rule:last-child { border-bottom:0; }
            .ppl-rule strong { display:block; color:#1769aa; }
            .ppl-warn { border-left:5px solid #e2a02b; background:#fff8e8; padding:12px; margin:14px 0; }
            @media(max-width:680px) { .ppl-story,.ppl-calc-steps,.ppl-example { grid-template-columns:1fr; } }
        </style>
        <div class="ppl-first">
            <strong>最初にこれだけ覚える</strong>
            言語モデルへ「次のトークンは何？」という問題を何問も出し、<strong>正解にどれだけ高い確率を付けたか</strong>を測ります。迷いが少ないほどPPLは小さくなり、<strong>1が理想値</strong>です。PPL=4は「平均すると、同じくらいありそうな4択で迷っている」というイメージです。
        </div>
        <p>トークンとは、モデルが文章を扱う単位です。単語そのものの場合もあれば、単語をさらに分けた文字列の場合もあります。</p>

        <h4>■ まずは「2問の次トークンクイズ」で考える</h4>
        <p>正解文の一部を順番に見せて、次の正解トークンへ付けた確率を採点します。</p>
        <div class="ppl-story">
            <div>
                <span>第1問</span>
                <strong>入力「私は」 → 正解「猫」</strong>
                モデルが「猫」に付けた確率：$1/2$
            </div>
            <div>
                <span>第2問</span>
                <strong>入力「私は 猫 が」 → 正解「好き」</strong>
                モデルが「好き」に付けた確率：$1/4$
            </div>
        </div>
        <p>$1/2$は比較的自信があり、$1/4$は4択程度に迷った状態です。この<strong>複数回の迷いを、1問当たりの値へまとめたもの</strong>がPPLです。</p>

        <h4>■ 記号は「採点表」だと思えばよい</h4>
        <table>
            <tr><th>記号・用語</th><th>初心者向けの意味</th></tr>
            <tr><td><strong>$p_t$</strong></td><td>$t$問目で、モデルが<strong>正解トークン</strong>に付けた確率</td></tr>
            <tr><td><strong>$-\\ln p_t$</strong></td><td>1問分の「驚き・ペナルティ」。正解確率が低いほど大きくなる</td></tr>
            <tr><td><strong>NLL $L$</strong></td><td>全問題のペナルティを足した合計。Negative Log-Likelihood（負の対数尤度）</td></tr>
            <tr><td><strong>トークン数 $N$</strong></td><td>実際に採点した問題数。paddingなどは通常数えない</td></tr>
            <tr><td><strong>平均損失 $H=L/N$</strong></td><td>1問当たりの平均ペナルティ。クロスエントロピーと呼ばれる</td></tr>
            <tr><td><strong>PPL</strong></td><td>平均ペナルティを「実効的な選択肢数」の感覚へ戻した値</td></tr>
        </table>
        <p><strong>全体の流れ：</strong>正解確率 $p_t$ → 驚き $-\\ln p_t$ → 全部足してNLL $L$ → $N$で割って平均損失 $H$ → 指数を取ってPPL、です。</p>

        <div class="ppl-formula">
            <strong>上の採点手順を数式で1行にしたもの</strong>
            $$H=-\\frac{1}{N}\\sum_{t=1}^{N}\\ln p_t$$
            $$PPL=\\exp(H)=\\exp\\left(-\\frac{1}{N}\\sum_{t=1}^{N}\\ln p_t\\right)
            =\\left(\\prod_{t=1}^{N}\\frac{1}{p_t}\\right)^{1/N}$$
            <small>式を丸暗記する前に「確率 → ペナルティ → 1問平均 → 元の尺度へ戻す」と理解すれば十分です。</small>
        </div>
        <div class="ppl-flow">
            <div class="ppl-node"><strong>正解トークンの確率 $p_t$</strong>高いほどよい</div>
            <div class="ppl-arrow">→</div>
            <div class="ppl-node"><strong>平均損失 $H$</strong>低いほどよい</div>
            <div class="ppl-arrow">→</div>
            <div class="ppl-node"><strong>$PPL=e^H$</strong>低いほどよい</div>
        </div>

        <h4>■ 上の2問を実際に計算する</h4>
        <div class="ppl-calc-steps">
            <div><strong>① 確率を掛ける</strong>$1/2\\times1/4=1/8$</div>
            <div><strong>② 2問平均にする</strong>$\\sqrt{1/8}\\approx0.354$<br><small>確率は掛け算なので幾何平均</small></div>
            <div><strong>③ 逆数にする</strong>$PPL=1/0.354\\approx2.83$</div>
        </div>
        <p><strong>なぜ平方根？</strong>2問分の確率を掛けたので、2乗根を取ると「1問当たり」の確率へ戻せるからです。$N$問なら$N$乗根です。合計確率$1/8$の逆数8をそのまま答えると、文章の長さを考慮していないため誤りです。</p>

        <div class="ppl-example">
            <div><strong>$PPL=1$</strong>正解に毎回確率1<br>理想的で迷いなし</div>
            <div><strong>$PPL=4$</strong>実効的に4択で迷う<br>一様4択なら各確率$1/4$</div>
            <div><strong>一様な$V$語彙</strong>各トークンが$1/V$なら<br>$PPL=V$</div>
        </div>

        <h4>■ 4通りに見えるが、同じPPLを別の入口から求めている</h4>
        <p>試験では、確率からではなく途中計算済みの$H$や$L$が与えられることがあります。<strong>別の指標ではなく、どこから計算を始めるかが違うだけ</strong>です。</p>
        <table>
            <tr><th>問題で与えられるもの</th><th>考え方・使う式</th><th>例</th></tr>
            <tr>
                <td>平均損失 $H$（nat）</td>
                <td>すでに1問平均まで済んでいるので、$PPL=e^H$</td>
                <td>$H=\\ln5\\Rightarrow PPL=5$</td>
            </tr>
            <tr>
                <td>平均損失 $H_2$（bit）</td>
                <td>底2の対数で採点済みなので、$PPL=2^{H_2}$</td>
                <td>$H_2=3\\Rightarrow PPL=8$</td>
            </tr>
            <tr>
                <td>合計NLL $L$ とトークン数 $N$</td>
                <td>先に$H=L/N$で1問平均にし、$PPL=e^H$</td>
                <td>$L=8,N=4\\Rightarrow e^2\\approx7.39$</td>
            </tr>
            <tr>
                <td>各正解トークンの確率 $p_t$</td>
                <td>確率の<strong>幾何平均を求め、その逆数</strong></td>
                <td>$p=(1/2,1/4)\\Rightarrow PPL=\\sqrt{8}\\approx2.83$</td>
            </tr>
        </table>
        <p><strong>natとbitの違い：</strong>長さをcmとinchのどちらで表すかに似た「単位の違い」です。$\\ln$（自然対数）で計算したnatなら$e^H$、$\\log_2$で計算したbitなら$2^{H_2}$を使います。</p>

        <h4>■ 評価時の重要ルールを、理由から理解する</h4>
        <div>
            <div class="ppl-rule">
                <strong>Teacher Forcing＝「前問の正解」を渡して次を採点</strong>
                第1問でモデルが「猫」ではなく「犬」を最有力にしても、第2問では正解文の「私は 猫 が」を入力します。最初の間違いを後の全問題へ連鎖させず、各位置の予測力を公平に測るためです。
            </div>
            <div class="ppl-rule">
                <strong>長さで正規化＝合計点ではなく1問平均で比べる</strong>
                20トークンの文は2トークンの文よりNLLが大きくなりやすいため、合計NLLを総トークン数$N$で割ります。複数文では「全NLLの合計÷全トークン数」を使い、文ごとのPPLを単純平均しません。
            </div>
            <div class="ppl-rule">
                <strong>マスク＝ダミーの空欄は採点しない</strong>
                paddingは文の長さを揃えるために追加したダミートークンです。本物の次トークン問題ではないため、通常は損失の合計にも$N$にも含めません。
            </div>
            <div class="ppl-rule">
                <strong>比較条件＝同じ問題集・同じ採点単位で比べる</strong>
                トークナイザが違うと、同じ文章でも分割数と問題内容が変わります。そのため、同じテストデータ、トークナイザ、前処理、token/word単位で計算したPPL同士を比較します。
            </div>
            <div class="ppl-rule">
                <strong>Masked LM＝BERTは「次を当てるクイズ」ではない</strong>
                GPTは左から右へ次トークンを当てます。一方、BERTは文章の一部を隠し、左右の文脈から穴埋めします。そのため同じ系列確率の式を直接使えず、疑似PPLなどは別の評価方法です。
            </div>
        </div>
        <div class="ppl-warn"><strong>試験の罠：</strong>PPLは正解率でも、文章品質・事実性・安全性の保証でもありません。同条件なら小さい方が次トークンへ高い確率を付けていますが、下流タスク性能やハルシネーションの少なさまで必ず優れるとは限りません。</div>
        <p><strong>差の読み方：</strong>平均損失が$\\ln2$だけ下がると、$PPL$は$e^{\\ln2}=2$分の1になります。損失の小さな差が指数変換でPPLの比になる点も計算問題になり得ます。</p>
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
            explanation: "負例が非常に多いと、FPRの分母$FP+TN$も大きいためROC曲線ではFPRが小さく見えることがあります。TNを使わず、FPをPrecisionへ直接反映するPR曲線の方が、少数の正例を見つける性能を把握しやすくなります。"
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
        // ---------------------------------------------------------
        // 【PR曲線・AP 計算演習】 Q27 - Q32
        // ---------------------------------------------------------
        {
            id: "metric-pr-axes",
            category: "PR曲線（軸）",
            kind: "基礎",
            difficulty: "必須",
            question: "PR曲線の横軸$x$と縦軸$y$の組み合わせとして正しいものはどれか。",
            options: ["$(x,y)=(Recall,Precision)$", "$(x,y)=(Precision,Recall)$", "$(x,y)=(FPR,TPR)$", "$(x,y)=(Specificity,Precision)$"],
            answer: 0,
            explanation: "PR曲線は横軸がRecall（再現率）、縦軸がPrecision（適合率）です。ROC曲線の$(FPR,TPR)$と混同しないよう、曲線名の後半から前半へ並ぶと覚えるより、横軸Recall・縦軸Precisionを式と一緒に確認しましょう。"
        },
        {
            id: "metric-pr-precision-calc",
            category: "PR曲線（計算）",
            kind: "手計算",
            difficulty: "必須",
            question: "混同行列が $TP=40, FN=10, FP=5, TN=45$ のとき、Precisionはいくつか。",
            options: ["$40/45\\approx0.889$", "$40/50=0.8$", "$45/50=0.9$", "$5/50=0.1$"],
            answer: 0,
            explanation: "$Precision=TP/(TP+FP)=40/(40+5)=40/45=8/9\\approx0.889$です。分母はPositiveと予測した件数なので、FNやTNは使いません。"
        },
        {
            id: "metric-pr-point-calc",
            category: "PR座標（計算）",
            kind: "手計算",
            difficulty: "本試験型",
            question: "混同行列が $TP=40, FN=10, FP=5, TN=45$ のとき、このしきい値がPR曲線上に作る点 $(x,y)$ はどれか。",
            options: ["$(0.8,0.889)$", "$(0.889,0.8)$", "$(0.1,0.8)$", "$(0.8,0.9)$"],
            answer: 0,
            explanation: "横軸は$Recall=40/(40+10)=0.8$、縦軸は$Precision=40/(40+5)\\approx0.889$です。したがって$(x,y)=(Recall,Precision)=(0.8,0.889)$です。"
        },
        {
            id: "metric-pr-baseline-calc",
            category: "PR曲線（基準値）",
            kind: "手計算",
            difficulty: "標準",
            question: "全200件のうち正例が20件であるデータに対し、ランダムに陽性判定する分類器を考える。PR曲線におけるPrecisionの基準値はおよそいくつか。",
            options: ["0.1", "0.5", "0.9", "1.0"],
            answer: 0,
            explanation: "ランダム分類のPrecisionの期待値は正例率です。$20/200=0.1$なので基準は約0.1です。ROC-AUCのランダム基準0.5と混同しないよう注意します。"
        },
        {
            id: "metric-pr-ap-calc",
            category: "AP（計算）",
            kind: "手計算",
            difficulty: "本試験型",
            question: "ステップ状のPR曲線で、Recallが$0\\rightarrow0.5$の区間のPrecisionが0.8、$0.5\\rightarrow1.0$の区間が0.6だった。$AP=\\sum_i(R_i-R_{i-1})P_i$で計算したAPはいくつか。",
            options: ["0.7", "0.6", "0.8", "1.4"],
            answer: 0,
            explanation: "$AP=(0.5-0)\\times0.8+(1.0-0.5)\\times0.6=0.4+0.3=0.7$です。補間方法が別途指定されている問題では、その定義を優先します。"
        },
        {
            id: "metric-pr-threshold",
            category: "PR曲線としきい値",
            kind: "仕組み",
            difficulty: "標準",
            question: "陽性と判定するスコアのしきい値を下げたとき、PR曲線では一般にRecallとPrecisionはどう変化しやすいか。",
            options: ["Recallは上がり、Precisionは下がりやすい", "Recallは下がり、Precisionは上がりやすい", "RecallもPrecisionも必ず上がる", "どちらも必ず一定になる"],
            answer: 0,
            explanation: "しきい値を下げるとPositive判定が増え、正例を拾いやすくなるためRecallは通常上がります。一方でFPも増えやすいためPrecisionは下がる傾向があります。有限データではPrecisionが局所的に上下することがあります。"
        },
        // ---------------------------------------------------------
        // 【パープレキシティ】 Q33 - Q45
        // ---------------------------------------------------------
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
        },
        {
            id: "metric-perplexity-formula",
            category: "パープレキシティ（式）",
            kind: "数式理解",
            difficulty: "必須",
            question: "正解トークンへ割り当てた条件付き確率を$p_1,\\ldots,p_N$とする。自然対数を用いたPPLの式として正しいものはどれか。",
            options: [
                "$\\exp\\left(\\frac{1}{N}\\sum_{t=1}^{N}\\ln p_t\\right)$",
                "$-\\frac{1}{N}\\sum_{t=1}^{N}p_t$",
                "$\\exp\\left(-\\frac{1}{N}\\sum_{t=1}^{N}\\ln p_t\\right)$",
                "$\\prod_{t=1}^{N}p_t$"
            ],
            answer: 2,
            explanation: "平均クロスエントロピーは$H=-\\frac1N\\sum_t\\ln p_t$で、$PPL=\\exp(H)$です。したがって正解は$\\exp(-\\frac1N\\sum_t\\ln p_t)$です。"
        },
        {
            id: "metric-perplexity-prob-product-calc",
            category: "パープレキシティ（確率計算）",
            kind: "手計算",
            difficulty: "本試験型",
            question: "2トークンの正解系列に対し、モデルが正解トークンへ順に$0.5$、$0.25$の確率を割り当てた。PPLはいくつか。",
            options: ["8", "$\\sqrt8\\approx2.83$", "4", "$1/8$"],
            answer: 1,
            explanation: "$PPL=(1/(0.5\\times0.25))^{1/2}=(1/0.125)^{1/2}=\\sqrt8\\approx2.83$です。系列確率$0.125$の逆数8を、そのまま答えないよう注意します。"
        },
        {
            id: "metric-perplexity-total-nll-calc",
            category: "パープレキシティ（NLL計算）",
            kind: "手計算",
            difficulty: "本試験型",
            question: "4トークンに対する負の対数尤度（NLL）の合計が8 natだった。1トークン当たりの平均を用いたPPLはいくつか。",
            options: ["$e^8$", "2", "8", "$e^{8/4}=e^2\\approx7.39$"],
            answer: 3,
            explanation: "まず平均NLLを求め、$H=8/4=2$。次に$PPL=e^H=e^2\\approx7.39$です。合計NLLをそのまま指数へ入れないことがポイントです。"
        },
        {
            id: "metric-perplexity-bits-calc",
            category: "パープレキシティ（対数の底）",
            kind: "手計算",
            difficulty: "標準",
            question: "クロスエントロピーを底2の対数で計算したところ、1トークン当たり3 bitだった。PPLはいくつか。",
            options: ["$2^3=8$", "$e^3\\approx20.1$", "3", "$\\log_2 3$"],
            answer: 0,
            explanation: "損失の対数が底2なら$PPL=2^{H_2}$なので、$2^3=8$です。自然対数なら$e^H$を使います。"
        },
        {
            id: "metric-perplexity-uniform-vocab",
            category: "パープレキシティ（直感）",
            kind: "数式理解",
            difficulty: "標準",
            question: "語彙数500の言語モデルが、毎回すべての語へ一様に$1/500$の確率を割り当てる。このモデルのPPLはいくつか。",
            options: ["1", "$\\sqrt{500}$", "500", "$1/500$"],
            answer: 2,
            explanation: "各正解トークンの確率が常に$1/V$なら、$H=-\\ln(1/V)=\\ln V$、$PPL=e^{\\ln V}=V$です。したがって500です。"
        },
        {
            id: "metric-perplexity-loss-delta",
            category: "パープレキシティ（比の計算）",
            kind: "手計算",
            difficulty: "発展",
            question: "モデルBの平均クロスエントロピーが、モデルAより$\\ln2$だけ小さい。両者を同条件で評価したとき、PPLの関係として正しいものはどれか。",
            options: ["BのPPLはAの2倍", "BのPPLはAの$1/2$", "両者のPPLは同じ", "情報不足で比は求められない"],
            answer: 1,
            explanation: "$PPL_B/PPL_A=e^{H_B-H_A}=e^{-\\ln2}=1/2$です。損失の差は、指数変換するとPPLの比になります。"
        },
        {
            id: "metric-perplexity-corpus-aggregation",
            category: "パープレキシティ（集計）",
            kind: "手計算",
            difficulty: "発展",
            question: "文Aは2トークンで合計NLLが2、文Bは6トークンで合計NLLが9だった。コーパス全体のPPLとして適切な式はどれか。",
            options: ["$(e^{2/2}+e^{9/6})/2$", "$e^{(2+9)/2}$", "$e^{(2/2+9/6)}$", "$e^{(2+9)/(2+6)}=e^{11/8}$"],
            answer: 3,
            explanation: "コーパス全体では合計NLLを評価対象の総トークン数で割ります。平均NLLは$(2+9)/(2+6)=11/8$なので、$PPL=e^{11/8}$です。文ごとのPPLの単純平均ではありません。"
        },
        {
            id: "metric-perplexity-teacher-forcing",
            category: "パープレキシティ（評価方法）",
            kind: "仕組み",
            difficulty: "標準",
            question: "自己回帰型言語モデルのテストデータ上のPPLを通常計算するとき、各次トークン確率の条件として用いるものはどれか。",
            options: ["テストデータの正解の過去トークン", "モデルが自由生成した過去トークンだけ", "未来の正解トークン", "語彙全体の平均ベクトル"],
            answer: 0,
            explanation: "通常はTeacher Forcingにより、正解の過去トークン$w_{&lt;t}$を条件に$p(w_t\\mid w_{&lt;t})$を評価します。paddingなど評価対象外の位置は損失とトークン数から除外します。"
        },
        {
            id: "metric-perplexity-mlm-limit",
            category: "パープレキシティ（モデル差）",
            kind: "概念",
            difficulty: "発展",
            question: "BERTのようなMasked Language Modelに、GPTと同じ標準的なPPLをそのまま適用しにくい主な理由はどれか。",
            options: ["BERTには語彙が存在しないから", "BERTは確率を出力しないから", "左から右への系列確率として直接因数分解するモデルではないから", "BERTの損失は常に0だから"],
            answer: 2,
            explanation: "標準PPLは系列確率を$\\prod_t p(w_t\\mid w_{&lt;t})$と因数分解する自己回帰モデルに自然です。Masked LMでは同じ因数分解を直接使えず、疑似PPLなど別の定義が必要です。"
        },
        {
            id: "metric-perplexity-quality-limit",
            category: "パープレキシティ（解釈）",
            kind: "概念",
            difficulty: "必須",
            question: "同じデータとトークナイザでモデルAのPPLがモデルBより低かった。この結果から必ず言えることはどれか。",
            options: ["Aは事実誤認を必ず起こさない", "Aはすべての下流タスクで必ず高精度", "Aの生成文は人間評価でも必ず高品質", "Aはその評価系列の正解トークンへ、平均的により高い確率を割り当てた"],
            answer: 3,
            explanation: "PPLが低いことから直接言えるのは、評価系列への平均負の対数尤度が小さいことです。文章品質、事実性、安全性、下流タスク性能まで自動的に保証する指標ではありません。"
        }
    ]
};
