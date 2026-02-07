window.quizData = {
    title: "1. 数学的基礎：確率・統計 & 情報理論",
    
    cheatSheet: `
        <style>
            .concept-box { border-left: 4px solid #3498db; padding: 10px; background: #f0f8ff; margin-bottom: 10px; }
            .visual-bar { display: inline-block; width: 10px; background: #ccc; margin-right: 2px; vertical-align: bottom; }
            .h-high { height: 40px; background: #e74c3c; } /* 高い確率 */
            .h-mid { height: 20px; background: #3498db; }  /* 中くらいの確率 */
            .h-low { height: 5px; background: #ccc; }     /* 低い確率 */
            .dist-curve { width: 100px; height: 40px; border-radius: 50% 50% 0 0; border: 2px solid #333; border-bottom: none; display:inline-block; text-align:center; line-height:35px; color:#555; font-size:0.8em;}
        </style>

        <h3>■ 確率・統計：パラメータ推定の比較</h3>
        <p>「データ（結果）」から「パラメータ（原因）」を探るアプローチの違いです。</p>

        <div class="concept-box">
            <h4>1. 最尤推定 (MLE) vs MAP推定</h4>
            <table>
                <tr>
                    <th>最尤推定 (MLE)</th>
                    <th>MAP推定</th>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <span style="font-size:2em;">🎯</span><br>
                        <strong>データだけを見る</strong><br>
                        <small>「データが全てだ！」</small>
                    </td>
                    <td style="text-align:center;">
                        <span style="font-size:2em;">🧠 + 🎯</span><br>
                        <strong>事前知識 + データ</strong><br>
                        <small>「経験則(事前分布)も加味する」</small>
                    </td>
                </tr>
                <tr>
                    <td>データの尤度 $P(D|\\theta)$ を最大化。<br>※データが少ないと<strong>過学習</strong>する。</td>
                    <td>事後確率 $P(\\theta|D)$ を最大化。<br>※事前分布が<strong>正則化項</strong>として働く。</td>
                </tr>
            </table>
        </div>

        <div class="concept-box">
            <h4>2. 点推定 vs ベイズ推定</h4>
            <table>
                <tr>
                    <th>点推定 (MLE, MAP)</th>
                    <th>ベイズ推定</th>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <div style="font-size:1.5em; font-weight:bold;">📍 ピンポイント</div>
                        <small>答えは「1つ」の値</small>
                    </td>
                    <td style="text-align:center;">
                        <div class="dist-curve" style="border-color:#e67e22; background:#fdf2e9;">山(分布)</div>
                        <small>答えは「確率分布」</small>
                    </td>
                </tr>
                <tr>
                    <td>計算が速い。<br>「予測値」しか分からない。</td>
                    <td>計算が重い（積分が必要）。<br><strong>「予測の自信のなさ（不確実性）」</strong>も分かる。</td>
                </tr>
            </table>
        </div>

        <h3>■ 情報理論：エントロピーの可視化</h3>
        
        <div class="concept-box">
            <h4>エントロピー（乱雑さ・予測のつかなさ）</h4>
            <table>
                <tr>
                    <th>エントロピーが小さい</th>
                    <th>エントロピーが大きい</th>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <div class="visual-bar h-high"></div>
                        <div class="visual-bar h-low"></div>
                        <div class="visual-bar h-low"></div>
                        <div class="visual-bar h-low"></div>
                        <br><strong>「ほぼ決まり」</strong>
                    </td>
                    <td style="text-align:center;">
                        <div class="visual-bar h-mid"></div>
                        <div class="visual-bar h-mid"></div>
                        <div class="visual-bar h-mid"></div>
                        <div class="visual-bar h-mid"></div>
                        <br><strong>「どれか分からない」</strong>
                    </td>
                </tr>
                <tr>
                    <td>確率の偏りが激しい。<br>例：イカサマコイン（表99%）</td>
                    <td>確率が均等（一様分布）。<br>例：公平なサイコロ（どれも1/6）</td>
                </tr>
            </table>
        </div>

        <div class="concept-box">
            <h4>距離の概念</h4>
            <ul>
                <li><strong>KLダイバージェンス</strong>: <br>
                分布 $P$ と $Q$ の「重ね合わせのズレ」。<br>
                $P$から見た$Q$の距離 $\\neq$ $Q$から見た$P$の距離（<strong>非対称</strong>）。</li>
                <li><strong>相互情報量</strong>:<br>
                $X$ と $Y$ の「共有している情報」。<br>
                円グラフの重なり部分のイメージ（独立なら重なりゼロ）。</li>
            </ul>
        </div>
    `,
    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "自己情報量",
            question: "ある事象 $x$ が起こる確率を $P(x)$ としたとき、自己情報量 $I(x)$ の定義式として正しいものはどれか。",
            options: ["$I(x) = -\\log P(x)$", "$I(x) = \\log P(x)$", "$I(x) = P(x) \\log P(x)$", "$I(x) = 1/P(x)$"],
            answer: 0,
            explanation: "確率は1以下の値なので、対数をとると負になります。情報量を正の値にするためにマイナスをつけます。確率が低いほど値は大きくなります。"
        },
        {
            category: "ベイズ則",
            question: "ベイズの定理の公式として正しいものはどれか。（$P(Y|X)$を事後確率とする）",
            options: ["$P(Y|X) = \\frac{P(X|Y)P(Y)}{P(X)}$", "$P(Y|X) = \\frac{P(Y|X)P(X)}{P(Y)}$", "$P(Y|X) = P(X|Y)P(X)$", "$P(Y|X) = \\frac{P(X|Y)P(X)}{P(Y)}$"],
            answer: 0,
            explanation: "事後確率 $P(Y|X)$ は、尤度 $P(X|Y)$ と 事前確率 $P(Y)$ の積に比例します。"
        },
        {
            category: "最尤推定",
            question: "最尤推定(MLE)の目的として最も適切なものはどれか。",
            options: ["尤度関数 $P(D|\\theta)$ を最大化するパラメータ $\\theta$ を求める", "事後確率 $P(\\theta|D)$ を最大化するパラメータ $\\theta$ を求める", "パラメータ $\\theta$ の事後分布自体を求める", "事前確率 $P(\\theta)$ を最大化するパラメータ $\\theta$ を求める"],
            answer: 0,
            explanation: "手元にあるデータ $D$ が発生する確率（尤度）が最も高くなるようなパラメータを探す手法です。"
        },
        {
            category: "エントロピー",
            question: "平均情報量（エントロピー）$H(X)$ の定義式として正しいものはどれか。",
            options: ["$H(X) = -\\sum P(x) \\log P(x)$", "$H(X) = \\sum P(x) \\log P(x)$", "$H(X) = -\\sum \\log P(x)$", "$H(X) = \\sum P(x)^2$"],
            answer: 0,
            explanation: "自己情報量 $-\\log P(x)$ の期待値（平均）をとったものがエントロピーです。"
        },
        {
            category: "KLダイバージェンス",
            question: "KLダイバージェンス（カルバック・ライブラー情報量）の定義式はどれか。（基準分布を$P$とする）",
            options: ["$D_{KL}(P||Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$", "$D_{KL}(P||Q) = \\sum Q(x) \\log \\frac{P(x)}{Q(x)}$", "$D_{KL}(P||Q) = \\sum P(x) (P(x) - Q(x))$", "$D_{KL}(P||Q) = -\\sum P(x) \\log Q(x)$"],
            answer: 0,
            explanation: "分布 $P$ と $Q$ の対数差の期待値です。選択肢4はクロスエントロピーの式です。"
        },
        {
            category: "クロスエントロピー",
            question: "分類問題でよく使われる「クロスエントロピー」の定義式はどれか。（真の分布を$P$、予測分布を$Q$とする）",
            options: ["$H(P,Q) = -\\sum P(x) \\log Q(x)$", "$H(P,Q) = -\\sum Q(x) \\log P(x)$", "$H(P,Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$", "$H(P,Q) = -\\sum P(x) \\log P(x)$"],
            answer: 0,
            explanation: "真の確率 $P$ で重み付けをして、予測確率 $Q$ の自己情報量を平均したものです。"
        },
        {
            category: "MAP推定",
            question: "MAP推定（最大事後確率推定）の説明として正しいものはどれか。",
            options: ["尤度関数と事前分布の積を最大化するパラメータを求める", "尤度関数のみを最大化するパラメータを求める", "パラメータの事後分布の平均値を求める", "観測データを使わず、事前分布のみを最大化する"],
            answer: 0,
            explanation: "最尤推定に「事前の知識（事前分布）」を掛け合わせたものを最大化します。"
        },
        {
            category: "平均二乗誤差",
            question: "回帰問題における「平均二乗誤差（MSE）」の定義式はどれか。（正解$t$、予測$y$、データ数$N$）",
            options: ["$E = \\frac{1}{N} \\sum (y_i - t_i)^2$", "$E = \\frac{1}{N} \\sum |y_i - t_i|$", "$E = \\sum (y_i - t_i)^2$", "$E = -\\sum t_i \\log y_i$"],
            answer: 0,
            explanation: "誤差の二乗の平均をとります。選択肢2はMAE（平均絶対誤差）です。"
        },
        {
            category: "相互情報量",
            question: "相互情報量 $I(X;Y)$ の定義式として、$H(X)$ と $H(X|Y)$ を用いた正しい式はどれか。",
            options: ["$I(X;Y) = H(X) - H(X|Y)$", "$I(X;Y) = H(X) + H(X|Y)$", "$I(X;Y) = H(X|Y) - H(X)$", "$I(X;Y) = H(X) \\times H(X|Y)$"],
            answer: 0,
            explanation: "元の不確実性 $H(X)$ から、$Y$を知った後の不確実性 $H(X|Y)$ を引いた差が、得られた情報量になります。"
        },
        {
            category: "ベイズ推定",
            question: "ベイズ推定の特徴として正しい記述はどれか。",
            options: ["パラメータを定数ではなく確率変数として扱い、その分布（事後分布）を推定する", "計算コストが非常に低く、大規模データに対して最も高速である", "事前分布を考慮しないため、客観的な推定が可能である", "常に最尤推定と同じ結果になる"],
            answer: 0,
            explanation: "点（1つの値）ではなく分布全体を求めるのがベイズ推定の最大の特徴です。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "平均二乗誤差(応用)",
            question: "回帰問題において「平均二乗誤差（MSE）」を最小化することは、誤差がどのような分布に従うと仮定した場合の「最尤推定」と等価か。",
            options: ["ガウス分布（正規分布）", "ラプラス分布", "ベルヌーイ分布", "一様分布"],
            answer: 0,
            explanation: "ガウス分布の対数尤度を計算すると二乗誤差の項が現れます。ラプラス分布の場合はMAE（絶対誤差）と等価になります。"
        },
        {
            category: "KLダイバージェンス(応用)",
            question: "KLダイバージェンスの性質として、**誤っている**記述はどれか。",
            options: ["対称性が成り立つ（ $D_{KL}(P||Q) = D_{KL}(Q||P)$ ）", "常に0以上の値をとる（非負性）", "2つの分布が完全に一致するとき、値は0になる", "三角不等式を満たさない"],
            answer: 0,
            explanation: "KLダイバージェンスは非対称です（行きと帰りの距離が違う）。これが数学的な「距離」と見なされない理由です。"
        },
        {
            category: "ナイーブベイズ(応用)",
            question: "ナイーブベイズ分類器において、入力データの特徴量間に対して置かれている「ナイーブ（単純）」な仮定とは何か。",
            options: ["各特徴量が互いに独立である", "各特徴量が正規分布に従う", "事前確率が一様分布である", "クラス分類の境界線が線形である"],
            answer: 0,
            explanation: "実際には相関があっても（例：天気と湿度）、計算を簡単にするために「独立している」と仮定します。"
        },
        {
            category: "MAP推定(応用)",
            question: "最尤推定（MLE）と比較した際の、MAP推定の利点として最も適切なものはどれか。",
            options: ["事前分布を導入することで、データ数が少ない時の過学習（極端な推定）を抑制できる", "計算が最尤推定よりも常に高速である", "パラメータの事後分布全体を求めることができる", "どんな事前分布を選んでも、結果は最尤推定と一致する"],
            answer: 0,
            explanation: "事前分布が正則化項（重みの暴走を防ぐブレーキ）の役割を果たすため、データが少ない場合でも安定した推定が可能です。"
        },
        {
            category: "クロスエントロピー(応用)",
            question: "クロスエントロピー誤差の最小化は、数学的には「何」の最小化と等価か。（真の分布$P$は固定とする）",
            options: ["真の分布$P$と予測分布$Q$のKLダイバージェンス", "真の分布$P$のエントロピー", "相互情報量", "予測分布$Q$の分散"],
            answer: 0,
            explanation: "式：$H(P,Q) = H(P) + D_{KL}(P||Q)$。$H(P)$は定数なので、これを最小化することはKLダイバージェンス（距離）を最小化することと同じです。"
        },
        {
            category: "JSダイバージェンス(応用)",
            question: "JSダイバージェンスがKLダイバージェンスよりも優れている点として、GAN（敵対的生成ネットワーク）などで重視される性質はどれか。",
            options: ["対称性を持ち、値が常に有限（0から1の間など）に収まる", "計算コストがKLダイバージェンスよりも低い", "負の値をとることができるため、勾配消失を防げる", "微分不可能であるため、勾配爆発が起きない"],
            answer: 0,
            explanation: "KLは非対称かつ無限大になりえますが、JSはこれを改良して対称かつ有界にしたもので、学習が安定しやすくなります。"
        },
        {
            category: "相互情報量(応用)",
            question: "確率変数$X$と$Y$が互いに「独立」であるとき、相互情報量$I(X;Y)$の値はどうなるか。",
            options: ["0になる", "1になる", "無限大になる", "負の値になる"],
            answer: 0,
            explanation: "独立している場合、片方を知っても他方の情報は何も得られないため、共有する情報量は0です。"
        },
        {
            category: "最尤推定(応用)",
            question: "最尤推定において、尤度関数そのものではなく「対数尤度」を最大化する計算上の主なメリットはどれか。",
            options: ["確率の積を和に変換でき、アンダーフロー（数値が0になる）を防げる", "パラメータが負の値になるのを防ぐことができる", "局所解（ローカルミニマム）に陥るのを防ぐことができる", "計算精度よりも計算速度を優先するため"],
            answer: 0,
            explanation: "0〜1の値を何度も掛け算すると、計算機上では限りなく0になってしまいます。対数をとって足し算にすることでこれを防ぎます。"
        },
        {
            category: "MAP推定(応用)",
            question: "MAP推定において、事前分布として「ラプラス分布」を使用することは、機械学習におけるどの正則化手法と等価か。",
            options: ["L1正則化（Lasso）", "L2正則化（Ridge）", "ドロップアウト", "バッチ正規化"],
            answer: 0,
            explanation: "ラプラス分布の式には絶対値が含まれており、対数をとるとL1ノルム（Lasso）の形になります。ガウス分布ならL2ノルム（Ridge）です。"
        },
        {
            category: "エントロピー(応用)",
            question: "エントロピー$H(X)$が最大となる確率分布はどれか。（変数が離散的で有限の場合）",
            options: ["一様分布", "正規分布", "ベルヌーイ分布", "ディリクレ分布"],
            answer: 0,
            explanation: "「どれが出るか全くわからない（全て等確率）」状態が最も不確実性が高く、エントロピーは最大になります。"
        }
    ]
};
