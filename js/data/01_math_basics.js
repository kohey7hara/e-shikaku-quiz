window.quizData = {
    title: "1. 数学的基礎：確率・統計 & 情報理論",
    
    cheatSheet: `
        <h3>■ 最尤推定・MAP推定・ベイズ推定：同じデータで比べる</h3>
        <p><strong>まず「何が与えられ、何を求めるのか」から始めます。</strong>次の例では、障害の原因候補がAとBの2つあり、新しいエラーログ $D$ が観測されたとします。このログを手掛かりに原因を推定します。</p>
        <table>
            <tr><th>与えられたもの</th><th>意味</th><th>今回の値</th></tr>
            <tr><td>$A,\\ B$</td><td>推定したい原因の候補</td><td>原因A、原因B</td></tr>
            <tr><td>$D$</td><td>実際に観測されたデータ</td><td>新しいエラーログ</td></tr>
            <tr><td>$P(A),\\ P(B)$</td><td><strong>事前確率</strong>：ログを見る前の起こりやすさ</td><td>$P(A)=0.4,\\ P(B)=0.6$</td></tr>
            <tr><td>$P(D|A),\\ P(D|B)$</td><td><strong>尤度</strong>：その原因なら、このログが出る確率</td><td>$P(D|A)=0.75,\\ P(D|B)=0.25$</td></tr>
        </table>
        <p><strong>条件付き確率の読み方：</strong>$P(D|A)$ は「原因がAだったと仮定したとき、ログ $D$ が出る確率」です。縦棒 $|$ の<strong>右側を前提</strong>として読みます。</p>

        <h3>■ 同じ数値を3つの手法へ代入する</h3>
        <table>
            <tr><th>手法</th><th>使う式</th><th>今回の計算・答え</th><th>何をしたいとき？</th></tr>
            <tr>
                <td><strong>最尤推定<br>(MLE)</strong></td>
                <td>$\\hat{\\theta}_{MLE}=\\underset{\\theta}{\\arg\\max}\\ P(D|\\theta)$<br>尤度が最大の候補を選ぶ</td>
                <td>$P(D|A)=0.75$<br>$P(D|B)=0.25$<br>$0.75>0.25$ なので <strong>A</strong></td>
                <td><strong>「観測データだけで決める」</strong><br>学習データに最も合うパラメータを求める場面。</td>
            </tr>
            <tr>
                <td><strong>MAP推定</strong></td>
                <td>$\\hat{\\theta}_{MAP}=\\underset{\\theta}{\\arg\\max}\\ P(D|\\theta)P(\\theta)$<br>尤度 × 事前確率が最大の候補を選ぶ</td>
                <td>A：$0.75\\times0.4=0.30$<br>B：$0.25\\times0.6=0.15$<br>$0.30>0.15$ なので <strong>A</strong></td>
                <td><strong>「データ ＋ 事前知識で決める」</strong><br>データが少ないとき、事前知識で極端な推定を抑える場面。</td>
            </tr>
            <tr>
                <td><strong>ベイズ推定</strong></td>
                <td>$P(\\theta|D)=\\dfrac{P(D|\\theta)P(\\theta)}{P(D)}$<br>各候補の事後確率を求める</td>
                <td>$P(D)=0.30+0.15=0.45$<br>$P(A|D)=0.30/0.45\\approx0.667$<br>$P(B|D)=0.15/0.45\\approx0.333$</td>
                <td><strong>「候補ごとの確信度を残す」</strong><br>AかBかを一点に断定せず、不確実性も含めて判断する場面。</td>
            </tr>
        </table>

        <h3>■ ベイズ推定の解法は「掛ける → 足す → 割る」</h3>
        <p>ベイズ推定では、まず各候補の<strong>尤度 × 事前確率</strong>を計算します。これはまだ合計が1ではないため、最後に正規化して事後確率へ直します。</p>
        <ol>
            <li><strong>掛ける：</strong>$s_A=P(D|A)P(A)=0.75\\times0.4=0.30$、$s_B=P(D|B)P(B)=0.25\\times0.6=0.15$。</li>
            <li><strong>足す：</strong>$P(D)=s_A+s_B=0.30+0.15=0.45$。候補が3つ以上なら、すべての候補の値を足す。</li>
            <li><strong>割る：</strong>$P(A|D)=s_A/P(D)=0.30/0.45\\approx0.667$。Bも同様に割ると約0.333になり、合計が1になる。</li>
        </ol>
        <p><strong>2候補の場合の式：</strong>$P(A|D)=\\dfrac{P(D|A)P(A)}{P(D|A)P(A)+P(D|B)P(B)}$</p>
        <p><strong>「A×A'、B×B'」というイメージについて：</strong>考え方は「各候補で2つの値を掛ける」なので近いですが、正式には <strong>$P(D|A)\\times P(A)$、$P(D|B)\\times P(B)$</strong> と書きます。確率の記法で $A'$ は「Aではない」という補集合を表すことがあるため、尤度の代わりに $A'$ と書かないようにします。</p>
        <p><strong>ここが3手法の分かれ目：</strong>尤度 $0.75$ と $0.25$ だけを比べるのが<strong>最尤推定 (MLE)</strong>、掛けた値 $0.30$ と $0.15$ を比べて大きいAを選ぶのが<strong>MAP推定</strong>、Aが約66.7%・Bが約33.3%という分布を両方残すのが<strong>ベイズ推定</strong>です。</p>

        <h3>■ 検査のベイズ問題は「人数に直して4手」で解く</h3>
        <p><strong>典型問題：</strong>感染率1%、感染者を98%で陽性、非感染者も0.1%で陽性になる検査で、陽性だった人が本当に感染している確率を求めます。</p>
        <p><strong>最初に向きを確認：</strong>与えられた98%は「感染しているなら陽性」$P(+|D)$ です。求めたいのは逆向きの「陽性なら感染」$P(D|+)$ なので、98%をそのまま答えてはいけません。</p>
        <table>
            <tr><th>問題文の表現</th><th>確率記号</th><th>名前・意味</th></tr>
            <tr><td>人口の1%が感染</td><td>$P(D)=0.01$</td><td>有病率・事前確率</td></tr>
            <tr><td>感染者の98%が陽性</td><td>$P(+|D)=0.98$</td><td>感度・真陽性率</td></tr>
            <tr><td>非感染者の0.1%も陽性</td><td>$P(+|\\bar{D})=0.001$</td><td>偽陽性率（0.1%=0.001）</td></tr>
            <tr><td>陽性者が本当に感染している確率</td><td>$P(D|+)$</td><td>事後確率・今回の答え</td></tr>
        </table>
        <ol>
            <li><strong>① 全体を10万人と置く：</strong>小数の人数を避けるためです。何人と置いても最終割合は同じです。</li>
            <li><strong>② 感染／非感染へ分ける：</strong>感染者は $100000\\times0.01=1000$ 人、非感染者は $100000\\times0.99=99000$ 人。</li>
            <li><strong>③ 両方の「陽性」を数える：</strong>感染者の陽性は $1000\\times0.98=980$ 人、非感染者の偽陽性は $99000\\times0.001=99$ 人。</li>
            <li><strong>④ 本物÷陽性全員：</strong>$980/(980+99)=980/1079\\approx0.908$。</li>
        </ol>
        <table>
            <tr><th>実際の状態</th><th>人数</th><th>陽性になる割合</th><th>陽性者数</th></tr>
            <tr><td><strong>感染</strong></td><td>1,000人</td><td>98%</td><td><strong>980人（真陽性）</strong></td></tr>
            <tr><td><strong>非感染</strong></td><td>99,000人</td><td>0.1%</td><td><strong>99人（偽陽性）</strong></td></tr>
            <tr><td colspan="3"><strong>陽性者の合計</strong></td><td><strong>1,079人</strong></td></tr>
        </table>
        <p><strong>答え：</strong>陽性者1,079人のうち本当に感染している人は980人なので、$980/1079\\approx90.8\\%$。選択肢では<strong>91%</strong>です。</p>
        <p><strong>同じ計算を確率で書く：</strong>$P(D|+)=\\dfrac{0.98\\times0.01}{0.98\\times0.01+0.001\\times0.99}\\approx0.908$。人数法の980と99を、全人口に対する割合で計算しているだけです。</p>

        <h3>■ 陽性問題・陰性問題の使い分け</h3>
        <table>
            <tr><th>検査結果</th><th>感染者側で掛ける値</th><th>非感染者側で掛ける値</th><th>最後に割る</th></tr>
            <tr><td><strong>陽性だった</strong></td><td>感度<br>$P(+|D)$</td><td>偽陽性率<br>$P(+|\\bar{D})$</td><td>真陽性÷（真陽性＋偽陽性）</td></tr>
            <tr><td><strong>陰性だった</strong></td><td>偽陰性率＝$1-$感度<br>$P(-|D)$</td><td>特異度＝$1-$偽陽性率<br>$P(-|\\bar{D})$</td><td>偽陰性÷（偽陰性＋真陰性）</td></tr>
        </table>
        <p><strong>ひっかけ対策：</strong>特異度が99.9%なら偽陽性率は $1-0.999=0.001=0.1\\%$。また、1%は0.01、0.1%は0.001です。百分率を小数へ直すときは100で割ります。</p>

        <h3>■ 情報理論の4概念は「何を測るか」で使い分ける</h3>
        <table>
            <tr><th>用語</th><th>数式・何を測る？</th><th>簡単な例・使われる場面</th></tr>
            <tr>
                <td><strong>エントロピー</strong><br>(平均情報量)</td>
                <td>$H(P) = -\\sum P(x) \\log P(x)$<br>1つの分布の迷い具合</td>
                <td><strong>「選択肢の迷い具合」</strong><br>・例：犬50%・猫50%は迷いが大きく、犬100%なら0。<br>・場面：分類の不確実性や決定木の乱雑さを測る。</td>
            </tr>
            <tr>
                <td><strong>KLダイバージェンス</strong><br>(相対エントロピー)</td>
                <td>$D_{KL}(P||Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$<br>分布 $Q$ の基準 $P$ からのずれ</td>
                <td><strong>「2つの確率分布のずれ」</strong><br>・例：正解の犬80%・猫20%と、予測の犬75%・猫25%のずれ。<br>・場面：分布を近づける学習やVAEの正則化。<br>・非対称で、常に0以上。</td>
            </tr>
            <tr>
                <td><strong>クロスエントロピー</strong></td>
                <td>$H(P,Q) = -\\sum P(x) \\log Q(x)$<br>予測 $Q$ の正解 $P$ に対する悪さ</td>
                <td><strong>「自信満々の間違いを強く叱る」</strong><br>・例：正解が犬なのに、犬の予測確率が0.9なら小さな罰、0.1なら大きな罰。<br>・場面：画像分類などの損失関数。</td>
            </tr>
            <tr>
                <td><strong>相互情報量</strong></td>
                <td>$I(X;Y) = H(X) - H(X|Y)$<br>$Y$ を知って減った $X$ の迷い</td>
                <td><strong>「その情報、答えの役に立つ？」</strong><br>・例：天気を知ると「傘を持つか」の迷いがどれだけ減るか。<br>・場面：特徴量選択や決定木の分割。独立なら0。</td>
            </tr>
        </table>

        <h3>■ 情報理論は「驚き・余計な驚き・減った迷い」：式から計算する</h3>
        <p><strong>まず与えられた値を確認します。</strong>基準となる分布を $P=[0.5,0.5]$、予測分布を $Q=[0.25,0.75]$ とします。対数の底は2とし、$\\log_2 0.5=-1$、$\\log_2 0.25=-2$、$\\log_2 0.75\\approx-0.415$、$\\log_2(2/3)\\approx-0.585$ を使います。</p>
        <table>
            <tr><th>概念</th><th>与えられた値</th><th>定義式 → 数値を代入</th><th>答え・何を表す？</th></tr>
            <tr>
                <td><strong>エントロピー</strong></td>
                <td>$P=[0.5,0.5]$</td>
                <td>$H(P)=-\\sum_i P_i\\log_2P_i$<br>$=-[0.5\\log_2 0.5+0.5\\log_2 0.5]$<br>$=-[0.5(-1)+0.5(-1)]$</td>
                <td><strong>$H(P)=1.0$ bit</strong><br>$P$ 自体に元々ある「平均的な驚き・迷い」。</td>
            </tr>
            <tr>
                <td><strong>クロス<br>エントロピー</strong></td>
                <td>$P=[0.5,0.5]$<br>$Q=[0.25,0.75]$</td>
                <td>$H(P,Q)=-\\sum_i P_i\\log_2Q_i$<br>$=-[0.5\\log_2 0.25+0.5\\log_2 0.75]$<br>$=-[0.5(-2)+0.5(-0.415)]$</td>
                <td><strong>$H(P,Q)\\approx1.208$ bit</strong><br>真実は $P$ なのに予測 $Q$ を使ったときの「平均的な驚き」。</td>
            </tr>
            <tr>
                <td><strong>KLダイバー<br>ジェンス</strong></td>
                <td>$P=[0.5,0.5]$<br>$Q=[0.25,0.75]$</td>
                <td>$D_{KL}(P||Q)=\\sum_iP_i\\log_2\\dfrac{P_i}{Q_i}$<br>$=0.5\\log_2\\dfrac{0.5}{0.25}+0.5\\log_2\\dfrac{0.5}{0.75}$<br>$=0.5(1)+0.5(-0.585)$</td>
                <td><strong>$D_{KL}(P||Q)\\approx0.208$ bit</strong><br>$Q$ を使ったことで増えた「余計な驚き」。</td>
            </tr>
            <tr>
                <td><strong>相互情報量</strong></td>
                <td>$H(X)=1.5$ bit<br>$H(X|Y)=0.5$ bit</td>
                <td>$I(X;Y)=H(X)-H(X|Y)$<br>$=1.5-0.5$</td>
                <td><strong>$I(X;Y)=1.0$ bit</strong><br>$Y$ を知ったことで減った $X$ の迷い。</td>
            </tr>
        </table>
        <p><strong>3つの値を照合：</strong>$H(P,Q)=H(P)+D_{KL}(P||Q)$ なので、今回も $1.208\\approx1.0+0.208$ となります。つまり、<strong>クロスエントロピー ＝ 元々の驚き ＋ 予測がずれた分の余計な驚き</strong>です。</p>
        <p><strong>対数の底：</strong>底が2なら単位は bit、自然対数 $\\ln$ なら単位は natです。同じ問題の途中で底を混ぜないようにします。</p>

        <h3>■ 最後はこの表だけ</h3>
        <table>
            <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
            <tr><td>観測データの尤度を最大化</td><td><strong>MLE</strong><br><small>Maximum Likelihood Estimation（最尤推定）</small></td><td>事前確率を使わず、データに最も合う一点を選ぶ。</td></tr>
            <tr><td>尤度×事前確率を最大化</td><td><strong>MAP</strong><br><small>Maximum A Posteriori（最大事後確率推定）</small></td><td>事前知識も使うが、答えは一点。</td></tr>
            <tr><td>正規化して事後分布全体を残す</td><td><strong>ベイズ推定</strong></td><td>掛ける→足す→割る。不確実性も確率として残す。</td></tr>
            <tr><td>陽性後に本当に感染している確率</td><td><strong>真陽性÷陽性全員</strong></td><td>感染側と非感染側の陽性を両方数える。</td></tr>
            <tr><td>特異度から偽陽性率を出す</td><td><strong>偽陽性率＝1−特異度</strong></td><td>陽性問題の非感染者側へ掛ける。</td></tr>
            <tr><td>1つの分布の迷い・平均情報量</td><td><strong>エントロピー</strong></td><td>均等なほど大きく、確実なら0。</td></tr>
            <tr><td>正解分布 $P$ で予測 $Q$ を採点</td><td><strong>クロスエントロピー</strong></td><td>正解へ低い確率を付けるほど罰が大きい。</td></tr>
            <tr><td>向きのある2分布のずれ</td><td><strong>KL</strong><br><small>Kullback-Leibler divergence</small></td><td>非負・非対称で、同じ分布なら0。</td></tr>
            <tr><td>対称で有界な分布のずれ</td><td><strong>JS</strong><br><small>Jensen-Shannon divergence</small></td><td>混合分布$M=(P+Q)/2$へのKLを両側から平均する。</td></tr>
            <tr><td>$Y$を知って減った$X$の迷い</td><td><strong>相互情報量</strong></td><td>$I(X;Y)=H(X)-H(X|Y)$。独立なら0。</td></tr>
            <tr><td>回帰誤差を二乗して平均</td><td><strong>MSE</strong><br><small>Mean Squared Error（平均二乗誤差）</small></td><td>大きな誤差を強く罰する。</td></tr>
        </table>
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
            category: "エントロピー(応用)",
            question: "離散的な4事象のエントロピー$H(X)$が最大となる確率の割り当てはどれか。",
            options: ["[0.25, 0.25, 0.25, 0.25]", "[1, 0, 0, 0]", "[0.7, 0.1, 0.1, 0.1]", "[0.4, 0.3, 0.2, 0.1]"],
            answer: 0,
            explanation: "全事象が等確率のとき不確実性が最も高く、エントロピーは最大になります。"
        },

        // ---------------------------------------------------------
        // 【計算編】 Q19 - Q29
        // ---------------------------------------------------------
        {
            id: "math-bayes-posterior-calc",
            category: "ベイズ推定（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "2つのモデル $A,B$ の事前確率が $P(A)=0.4,\\ P(B)=0.6$ である。観測データ $D$ に対する尤度が $P(D|A)=0.75,\\ P(D|B)=0.25$ のとき、ベイズ推定による事後確率 $P(A|D)$ はどれか。",
            options: ["0.25", "0.40", "約0.667", "0.75"],
            answer: 2,
            explanation: `<ol><li>モデルAの「尤度 × 事前確率」は $0.75\\times0.4=0.30$ です。</li><li>モデルBは $0.25\\times0.6=0.15$ です。</li><li>周辺尤度は両者の和なので、$P(D)=0.30+0.15=0.45$ です。</li><li>ベイズ則へ代入すると、$P(A|D)=0.30/0.45=2/3\\approx0.667$ です。</li></ol><p>観測前はAの確率が40%でしたが、DはAのもとで起こりやすいため、観測後は約66.7%まで上がります。</p>`
        },
        {
            id: "math-bayes-medical-positive-calc",
            category: "ベイズ推定・検査（計算）",
            kind: "計算",
            difficulty: "本試験型",
            question: "全人口の1%が感染している病気がある。検査Xは、感染者なら98%で陽性になり、非感染者でも0.1%で陽性になる。Aさんが陽性だったとき、実際に感染している確率に最も近い値はどれか。",
            options: ["99%", "91%", "83%", "67%"],
            answer: 1,
            explanation: `
                <p><strong>① 求める向きを確認：</strong>98%は「感染なら陽性」$P(+|D)$ です。問われているのは逆向きの「陽性なら感染」$P(D|+)$ なので、98%をそのまま答えません。</p>
                <p><strong>② 使う公式（人数法）：</strong>真陽性 ÷（真陽性＋偽陽性）です。全体を10万人と置きます。</p>
                <table>
                    <tr><th>実際の状態</th><th>元の人数</th><th>陽性者数</th></tr>
                    <tr><td>感染</td><td>$100000\\times0.01=1000$ 人</td><td>$1000\\times0.98=980$ 人</td></tr>
                    <tr><td>非感染</td><td>$100000\\times0.99=99000$ 人</td><td>$99000\\times0.001=99$ 人</td></tr>
                </table>
                <p><strong>③ 代入：</strong>$P(D|+)=980/(980+99)=980/1079\\approx0.908$。</p>
                <p><strong>④ 答え：</strong>約90.8%なので、最も近い<strong>91%</strong>です。分母は全人口ではなく「陽性者全員」であることがポイントです。</p>
            `
        },
        {
            id: "math-bayes-low-prevalence-calc",
            category: "ベイズ推定・低有病率（計算）",
            kind: "計算",
            difficulty: "本試験型",
            question: "有病率0.1%の病気について、感度99%、偽陽性率0.1%の検査を行った。陽性だった人が実際に病気である確率に最も近い値はどれか。",
            options: ["約99.0%", "約90.0%", "約49.8%", "約0.1%"],
            answer: 2,
            explanation: `
                <p><strong>① 使う公式：</strong>真陽性 ÷（真陽性＋偽陽性）です。小数を避けるため全体を100万人と置きます。</p>
                <p><strong>② 真陽性：</strong>病気の人は $1000000\\times0.001=1000$ 人。その99%なので $1000\\times0.99=990$ 人です。</p>
                <p><strong>③ 偽陽性：</strong>健康な人は999,000人。その0.1%なので $999000\\times0.001=999$ 人です。</p>
                <p><strong>④ 代入：</strong>$990/(990+999)=990/1989\\approx0.4977$。</p>
                <p><strong>答え：</strong>約<strong>49.8%</strong>です。感度が99%でも、病気そのものが非常に珍しいと、偽陽性の人数を無視できません。</p>
            `
        },
        {
            id: "math-bayes-specificity-calc",
            category: "ベイズ推定・特異度（計算）",
            kind: "計算",
            difficulty: "本試験型",
            question: "有病率2%、感度90%、特異度95%の検査がある。陽性だった人が実際に病気である確率に最も近い値はどれか。",
            options: ["約95.0%", "約90.0%", "約50.0%", "約26.9%"],
            answer: 3,
            explanation: `
                <p><strong>① 使う補数：</strong>陽性問題で健康な人に掛けるのは偽陽性率です。特異度95%なので、偽陽性率は $1-0.95=0.05=5\\%$ です。</p>
                <p><strong>② 使う公式：</strong>真陽性 ÷（真陽性＋偽陽性）。全体を10,000人と置きます。</p>
                <p><strong>③ 2本の陽性ルート：</strong>真陽性は $10000\\times0.02\\times0.90=180$ 人。偽陽性は $10000\\times0.98\\times0.05=490$ 人です。</p>
                <p><strong>④ 代入：</strong>$180/(180+490)=180/670\\approx0.269$。</p>
                <p><strong>答え：</strong>約<strong>26.9%</strong>です。「特異度」が与えられたら、陽性問題ではまず $1-$特異度へ直します。</p>
            `
        },
        {
            id: "math-bayes-negative-result-calc",
            category: "ベイズ推定・陰性（計算）",
            kind: "計算",
            difficulty: "本試験型",
            question: "有病率1%、感度98%、偽陽性率0.1%の検査で陰性だった。実際には病気である確率に最も近い値はどれか。",
            options: ["約0.020%", "約2.0%", "約98.0%", "約99.9%"],
            answer: 0,
            explanation: `
                <p><strong>① 陰性問題で使う率：</strong>病気側には偽陰性率 $1-0.98=0.02$、健康側には特異度 $1-0.001=0.999$ を掛けます。</p>
                <p><strong>② 使う公式：</strong>偽陰性 ÷（偽陰性＋真陰性）。全体を10万人と置きます。</p>
                <p><strong>③ 2本の陰性ルート：</strong>偽陰性は $100000\\times0.01\\times0.02=20$ 人。真陰性は $100000\\times0.99\\times0.999=98901$ 人です。</p>
                <p><strong>④ 代入：</strong>$20/(20+98901)=20/98921\\approx0.000202$。百分率へ直すと約 $0.0202\\%$ です。</p>
                <p><strong>答え：</strong>約<strong>0.020%</strong>です。陰性だった人の中にも少数の偽陰性がいるため、確率は完全な0にはなりません。</p>
            `
        },
        {
            id: "math-mle-likelihood-product-calc",
            category: "最尤推定（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "MLE（Maximum Likelihood Estimation：最尤推定）を行う。独立な2つの観測 $x_1,x_2$ について、候補 $\\theta_1$ では $P(x_1|\\theta_1)=0.8,\\ P(x_2|\\theta_1)=0.6$、$\\theta_2$ では $0.5,\\ 0.9$、$\\theta_3$ では $0.7,\\ 0.5$ である。最尤推定値はどれか。",
            options: ["$\\theta_2$", "$\\theta_1$", "$\\theta_3$", "3候補は同じ"],
            answer: 1,
            explanation: `<ol><li>独立な観測の尤度は、各観測の確率の積です。</li><li>$L(\\theta_1)=0.8\\times0.6=0.48$。</li><li>$L(\\theta_2)=0.5\\times0.9=0.45$。</li><li>$L(\\theta_3)=0.7\\times0.5=0.35$。</li></ol><p>最大は0.48なので、最尤推定値は $\\theta_1$ です。MLEは事前確率を使わず、観測データの尤度だけを比較します。</p>`
        },
        {
            id: "math-map-score-calc",
            category: "MAP推定（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "MAP（Maximum A Posteriori：最大事後確率）推定を行う。候補 $\\theta_A,\\theta_B$ の尤度がそれぞれ $0.6,\\ 0.4$、事前確率がそれぞれ $0.2,\\ 0.8$ である。MAP推定で選ばれる候補と、その候補の正規化後の事後確率の組合せはどれか。",
            options: ["$\\theta_A$、約0.273", "$\\theta_A$、0.600", "$\\theta_B$、0.800", "$\\theta_B$、約0.727"],
            answer: 3,
            explanation: `<ol><li>$\\theta_A$ のMAPスコアは、$0.6\\times0.2=0.12$ です。</li><li>$\\theta_B$ は、$0.4\\times0.8=0.32$ です。</li><li>大きい方は $\\theta_B$ なので、MAP推定では $\\theta_B$ を選びます。</li><li>正規化すると、$P(\\theta_B|D)=0.32/(0.12+0.32)=0.32/0.44\\approx0.727$ です。</li></ol><p>尤度だけなら $\\theta_A$ が有利ですが、強い事前確率を考慮すると $\\theta_B$ が選ばれます。ここがMLEとの違いです。</p>`
        },
        {
            id: "math-entropy-three-outcomes-calc",
            category: "エントロピー（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "確率分布 $P=[0.5,\\ 0.25,\\ 0.25]$ のエントロピー $H(P)=-\\sum_i P_i\\log_2P_i$ は何 bit か。$\\log_2 0.5=-1,\\ \\log_2 0.25=-2$ とする。",
            options: ["1.5 bit", "1.0 bit", "0.5 bit", "2.0 bit"],
            answer: 0,
            explanation: `<ol><li>式へ代入すると、$H(P)=-[0.5\\log_2 0.5+0.25\\log_2 0.25+0.25\\log_2 0.25]$ です。</li><li>対数値を入れると、$-[0.5(-1)+0.25(-2)+0.25(-2)]$。</li><li>$-[-0.5-0.5-0.5]=1.5$ bit です。</li></ol><p>確率が1つに集中するとエントロピーは小さくなり、均等に近づくほど不確実性が増えて大きくなります。</p>`
        },
        {
            id: "math-cross-entropy-one-hot-calc",
            category: "クロスエントロピー（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "真の分布が $P=[1,0,0]$、予測分布が $Q=[0.8,0.1,0.1]$ のとき、クロスエントロピー（Cross Entropy）$H(P,Q)=-\\sum_i P_i\\log_2Q_i$ はどれか。$\\log_2 0.8\\approx-0.322$ とする。",
            options: ["0.100 bit", "0.800 bit", "約0.322 bit", "約3.322 bit"],
            answer: 2,
            explanation: `<ol><li>$P=[1,0,0]$ なので、正解クラスである第1項だけが残ります。</li><li>$H(P,Q)=-[1\\times\\log_2 0.8+0\\times\\log_2 0.1+0\\times\\log_2 0.1]$。</li><li>$-\\log_2 0.8=-(-0.322)\\approx0.322$ bit です。</li></ol><p>正解クラスの予測確率0.8が1へ近づくほど、この損失は0へ近づきます。</p>`
        },
        {
            id: "math-kl-divergence-binary-calc",
            category: "KLダイバージェンス（計算）",
            kind: "計算",
            difficulty: "やや難",
            question: "分布 $P=[0.5,0.5]$ と $Q=[0.25,0.75]$ に対し、KL（Kullback-Leibler）ダイバージェンス $D_{KL}(P||Q)=\\sum_iP_i\\log_2(P_i/Q_i)$ はどれか。$\\log_2(2/3)\\approx-0.585$ とする。",
            options: ["0 bit", "約0.208 bit", "0.500 bit", "約1.585 bit"],
            answer: 1,
            explanation: `<ol><li>第1項は、$0.5\\log_2(0.5/0.25)=0.5\\log_2 2=0.5$ です。</li><li>第2項は、$0.5\\log_2(0.5/0.75)=0.5\\log_2(2/3)\\approx0.5\\times(-0.585)=-0.2925$ です。</li><li>合計は、$0.5-0.2925=0.2075\\approx0.208$ bit です。</li></ol><p>$P$ と $Q$ が一致していないため0より大きくなります。また、$D_{KL}(Q||P)$ は一般に別の値です。</p>`
        },
        {
            id: "math-mutual-information-entropy-calc",
            category: "相互情報量（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "確率変数 $X$ のエントロピーが $H(X)=1.5$ bit、$Y$ を知った後の条件付きエントロピーが $H(X|Y)=0.5$ bit である。相互情報量（Mutual Information）$I(X;Y)$ はどれか。",
            options: ["0 bit", "0.5 bit", "2.0 bit", "1.0 bit"],
            answer: 3,
            explanation: `<ol><li>相互情報量は、$I(X;Y)=H(X)-H(X|Y)$ です。</li><li>値を代入すると、$I(X;Y)=1.5-0.5=1.0$ bit です。</li></ol><p>$Y$ を知ることで、$X$ の不確実性が1.0 bit減った、つまり $X$ について1.0 bitの情報を得たことを意味します。</p>`
        }
    ]
};
