window.quizData = {
    title: "2-（１）機械学習の基礎 Vol.2：検証・性能指標",
    
    cheatSheet: `
        <h3>■ 混同行列 (Confusion Matrix)</h3>
        <table>
            <tr><th></th><th>予測: Positive (1)</th><th>予測: Negative (0)</th></tr>
            <tr><th>実際: Positive (1)</th><td><strong>TP</strong> (True Positive)<br>正解（真陽性）</td><td><strong>FN</strong> (False Negative)<br>見逃し（偽陰性）</td></tr>
            <tr><th>実際: Negative (0)</th><td><strong>FP</strong> (False Positive)<br>誤警報（偽陽性）</td><td><strong>TN</strong> (True Negative)<br>正解（真陰性）</td></tr>
        </table>
        
        <h3>■ 主要な評価指標</h3>
        <ul>
            <li><strong>正解率 (Accuracy)</strong>: $(TP+TN)/All$<br>全体の正答率。不均衡データでは信用できない。</li>
            <li><strong>適合率 (Precision)</strong>: $TP/(TP+FP)$<br>予測したもののうち、正しかった割合。「誤検知(FP)を減らしたい」時に重視。</li>
            <li><strong>再現率 (Recall)</strong>: $TP/(TP+FN)$<br>実際の正解のうち、見つけられた割合。「見逃し(FN)を減らしたい」時に重視。</li>
            <li><strong>F値 (F-measure)</strong>: PrecisionとRecallの<strong>調和平均</strong>。<br>バランスを見る指標。$2 \\cdot \\frac{Pre \\cdot Rec}{Pre + Rec}$</li>
        </ul>

        <h3>■ その他の重要指標</h3>
        <ul>
            <li><strong>ROC曲線 / AUC</strong>: 縦軸にTPR(Recall)、横軸にFPRをとった曲線。曲線下の面積(AUC)が大きいほど良い。</li>
            <li><strong>IoU (Intersection over Union)</strong>: 物体検出で利用。<br>$\\frac{\\text{領域の重なり}}{\\text{領域の和集合}}$</li>
            <li><strong>Micro平均</strong>: 全体のTP, FP数を合計してから計算（データ数が多いクラスの影響大）。</li>
            <li><strong>Macro平均</strong>: クラスごとの指標を計算してから平均（全クラス平等）。</li>
        </ul>
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
        }
    ]
};
