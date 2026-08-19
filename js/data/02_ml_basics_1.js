window.quizData = {
    title: "2-（１）機械学習の基礎 Vol.1：パターン認識・課題",
    
    cheatSheet: `
        <h3>■ 距離・類似度：試験で問われる「使い分け」</h3>
        <p>データの性質に合わせて、どの距離を使うべきかが問われます。まず同じ2点 $\\mathbf{x}=(1,2)$、$\\mathbf{y}=(4,6)$ を3通りで測ります。横の差は3、縦の差は4です。</p>
        <div class="exam-figure answer-figure" role="group" aria-label="同じ2点をユークリッド距離、マンハッタン距離、チェビシェフ距離で測り比べる図">
            <span class="figure-title">同じ2点でも「進み方のルール」で距離が変わる</span>
            <svg viewBox="0 0 1020 420" role="img" aria-labelledby="ml-distance-path-title ml-distance-path-desc" style="display:block;width:100%;min-width:860px;height:auto">
                <title id="ml-distance-path-title">3種類の距離の経路比較</title>
                <desc id="ml-distance-path-desc">点x=(1,2)から点y=(4,6)までを測ります。直線のユークリッド距離は5、縦横に進むマンハッタン距離は7、斜め移動も1手とするチェビシェフ距離は4です。</desc>
                <g font-family="-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',sans-serif" fill="#102a43">
                    <rect x="15" y="40" width="320" height="360" rx="16" fill="#fff" stroke="#cfdae7" stroke-width="2"></rect>
                    <rect x="350" y="40" width="320" height="360" rx="16" fill="#fff" stroke="#cfdae7" stroke-width="2"></rect>
                    <rect x="685" y="40" width="320" height="360" rx="16" fill="#fff" stroke="#cfdae7" stroke-width="2"></rect>

                    <text x="175" y="72" text-anchor="middle" font-size="17" font-weight="900" fill="#1769df">ユークリッド距離 L₂</text>
                    <text x="510" y="72" text-anchor="middle" font-size="17" font-weight="900" fill="#d64545">マンハッタン距離 L₁</text>
                    <text x="845" y="72" text-anchor="middle" font-size="17" font-weight="900" fill="#168a67">チェビシェフ距離 L∞</text>

                    <g stroke="#d9e2ec" stroke-width="1.5">
                        <path d="M80 105V285M125 105V285M170 105V285M215 105V285M260 105V285M80 105H260M80 150H260M80 195H260M80 240H260M80 285H260"></path>
                        <path d="M415 105V285M460 105V285M505 105V285M550 105V285M595 105V285M415 105H595M415 150H595M415 195H595M415 240H595M415 285H595"></path>
                        <path d="M750 105V285M795 105V285M840 105V285M885 105V285M930 105V285M750 105H930M750 150H930M750 195H930M750 240H930M750 285H930"></path>
                    </g>

                    <line x1="80" y1="285" x2="215" y2="105" stroke="#1769df" stroke-width="7" stroke-linecap="round"></line>
                    <polyline points="415,285 550,285 550,105" fill="none" stroke="#d64545" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"></polyline>
                    <polyline points="750,285 795,240 840,195 885,150 885,105" fill="none" stroke="#168a67" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"></polyline>

                    <g fill="#fff" stroke="#102a43" stroke-width="3">
                        <circle cx="80" cy="285" r="8"></circle><circle cx="215" cy="105" r="8"></circle>
                        <circle cx="415" cy="285" r="8"></circle><circle cx="550" cy="105" r="8"></circle>
                        <circle cx="750" cy="285" r="8"></circle><circle cx="885" cy="105" r="8"></circle>
                    </g>
                    <g fill="#168a67">
                        <circle cx="795" cy="240" r="5"></circle><circle cx="840" cy="195" r="5"></circle><circle cx="885" cy="150" r="5"></circle>
                    </g>

                    <text x="62" y="310" font-size="13" font-weight="800">x</text><text x="227" y="110" font-size="13" font-weight="800">y</text>
                    <text x="397" y="310" font-size="13" font-weight="800">x</text><text x="562" y="110" font-size="13" font-weight="800">y</text>
                    <text x="732" y="310" font-size="13" font-weight="800">x</text><text x="897" y="110" font-size="13" font-weight="800">y</text>

                    <text x="175" y="342" text-anchor="middle" font-size="19" font-weight="900">√(3²＋4²) ＝ 5</text>
                    <text x="510" y="342" text-anchor="middle" font-size="19" font-weight="900">3＋4 ＝ 7</text>
                    <text x="845" y="342" text-anchor="middle" font-size="19" font-weight="900">max(3, 4) ＝ 4</text>
                    <text x="175" y="374" text-anchor="middle" font-size="14" fill="#486581">定規で結ぶ最短の直線</text>
                    <text x="510" y="374" text-anchor="middle" font-size="14" fill="#486581">縦・横の移動量を全部足す</text>
                    <text x="845" y="374" text-anchor="middle" font-size="14" fill="#486581">斜め3手＋上1手＝王将の4手</text>
                </g>
            </svg>
            <p class="figure-caption"><strong>同じ2点でも値は違います：</strong>最大差4（チェビシェフ）≦ 直線5（ユークリッド）≦ 縦横7（マンハッタン）。</p>
        </div>
        <table>
            <tr><th>名称</th><th>数式・定義</th><th>脳内イメージ・特徴</th></tr>
            <tr>
                <td><strong>ユークリッド距離</strong><br>($L_2$ノルム)</td>
                <td>$\\sqrt{\\sum (x_i - y_i)^2}$</td>
                <td><strong>「定規で測った直線距離」</strong><br>・最も一般的。<br>・最短距離を行くイメージ。</td>
            </tr>
            <tr>
                <td><strong>マンハッタン距離</strong><br>($L_1$ノルム)</td>
                <td>$\\sum |x_i - y_i|$</td>
                <td><strong>「碁盤の目の移動距離」</strong><br>・タクシーがビル街を走る距離。<br>・軸に沿ってカクカク進む。</td>
            </tr>
            <tr>
                <td><strong>チェビシェフ距離</strong><br>($L_\\infty$ノルム)</td>
                <td>$\\max_i |x_i-y_i|$</td>
                <td><strong>「各座標差のうち最大のもの」</strong><br>・斜め移動も1手とする王将の最短手数。<br>・最もずれた特徴を重視。</td>
            </tr>
            <tr>
                <td><strong>コサイン距離</strong><br>(1 - 類似度)</td>
                <td>$1 - \\frac{\\mathbf{x} \\cdot \\mathbf{y}}{\\|\\mathbf{x}\\|_2\\|\\mathbf{y}\\|_2}$</td>
                <td><strong>「方向（角度）の違い」</strong><br>・ベクトルの<strong>長さは無視</strong>。<br>・同じ向きほど類似度は大きく、距離は小さい。<br>・文章の類似度などで活躍。</td>
            </tr>
            <tr>
                <td><strong>マハラノビス距離</strong></td>
                <td>$\\sqrt{(\\mathbf{x}-\\mathbf{\\mu})^T \\Sigma^{-1} (\\mathbf{x}-\\mathbf{\\mu})}$</td>
                <td><strong>「分布の広がりを考慮した距離」</strong><br>・共分散（分散＋相関）で補正する。<br>・よく散らばる方向の差は割り引く。<br>・異常検知によく使われる。</td>
            </tr>
        </table>

        <div class="exam-figure answer-figure" role="group" aria-label="コサイン距離とマハラノビス距離の違いを示す図">
            <span class="figure-title">経路ではなく「向き」や「分布」を見る距離</span>
            <svg viewBox="0 0 1020 370" role="img" aria-labelledby="ml-distance-context-title ml-distance-context-desc" style="display:block;width:100%;min-width:820px;height:auto">
                <title id="ml-distance-context-title">コサイン距離とマハラノビス距離の比較</title>
                <desc id="ml-distance-context-desc">コサイン距離は原点から伸びるベクトルの角度を測り、長さを無視します。マハラノビス距離は分布の楕円の広がりと相関を考慮し、よく広がる方向の差を小さく扱います。</desc>
                <g font-family="-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',sans-serif" fill="#102a43">
                    <rect x="15" y="40" width="490" height="315" rx="16" fill="#fff" stroke="#cfdae7" stroke-width="2"></rect>
                    <rect x="520" y="40" width="485" height="315" rx="16" fill="#fff" stroke="#cfdae7" stroke-width="2"></rect>
                    <text x="260" y="72" text-anchor="middle" font-size="18" font-weight="900" fill="#1769df">コサイン距離：向き（角度）を見る</text>
                    <text x="762" y="72" text-anchor="middle" font-size="18" font-weight="900" fill="#8b5cf6">マハラノビス距離：分布から見る</text>

                    <line x1="105" y1="260" x2="415" y2="75" stroke="#d9822b" stroke-width="6" stroke-linecap="round"></line>
                    <polygon points="415,75 399,79 407,92" fill="#d9822b"></polygon>
                    <line x1="105" y1="260" x2="260" y2="167.5" stroke="#1769df" stroke-width="8" stroke-linecap="round"></line>
                    <polygon points="260,168 242,172 251,186" fill="#1769df"></polygon>
                    <circle cx="105" cy="260" r="7" fill="#102a43"></circle>
                    <text x="86" y="281" font-size="14" font-weight="800">原点O</text>
                    <text x="267" y="163" font-size="14" font-weight="900" fill="#1769df">短いベクトル x</text>
                    <text x="350" y="95" font-size="14" font-weight="900" fill="#d9822b">長いベクトル y</text>
                    <text x="260" y="302" text-anchor="middle" font-size="16" font-weight="900">長さが違っても同じ向き：θ＝0°</text>
                    <text x="260" y="329" text-anchor="middle" font-size="15" fill="#486581">類似度＝1 ／ コサイン距離＝0</text>

                    <ellipse cx="755" cy="185" rx="175" ry="58" transform="rotate(-25 755 185)" fill="#f1edff" stroke="#8b5cf6" stroke-width="3"></ellipse>
                    <ellipse cx="755" cy="185" rx="115" ry="38" transform="rotate(-25 755 185)" fill="none" stroke="#b8a3f5" stroke-width="2" stroke-dasharray="7 6"></ellipse>
                    <line x1="755" y1="185" x2="864" y2="134" stroke="#168a67" stroke-width="3" stroke-dasharray="6 5"></line>
                    <line x1="755" y1="185" x2="806" y2="294" stroke="#d64545" stroke-width="3" stroke-dasharray="6 5"></line>
                    <circle cx="755" cy="185" r="7" fill="#102a43"></circle>
                    <circle cx="864" cy="134" r="8" fill="#168a67"></circle>
                    <circle cx="806" cy="294" r="8" fill="#d64545"></circle>
                    <text x="738" y="209" font-size="14" font-weight="900">平均 μ</text>
                    <text x="873" y="128" font-size="14" font-weight="900" fill="#168a67">P</text>
                    <text x="819" y="298" font-size="14" font-weight="900" fill="#d64545">Q</text>
                    <text x="780" y="112" font-size="14" font-weight="800" fill="#168a67">広がる方向 → 近い扱い</text>
                    <text x="602" y="292" font-size="14" font-weight="800" fill="#d64545">狭い方向 → 遠い扱い</text>
                    <text x="762" y="330" text-anchor="middle" font-size="15" fill="#486581">PとQは平均からの直線距離が同じでも、異常度は違う</text>
                </g>
            </svg>
            <p class="figure-caption"><strong>覚え方：</strong>コサイン＝原点から見た<strong>向き</strong>、マハラノビス＝データ分布から見た<strong>珍しさ</strong>。</p>
        </div>

        <h3>■ 学習の課題：バイアス・バリアンスのトレードオフ</h3>
        <p>モデルの複雑さと誤差の関係を表す最重要概念です。</p>
        <table>
            <tr><th>状態</th><th>バイアス<br><small>(思い込み)</small></th><th>バリアンス<br><small>(変動)</small></th><th>モデルの特徴</th></tr>
            <tr>
                <td><strong>未学習</strong><br>(Underfitting)</td>
                <td style="color:red; font-weight:bold;">高い (High)</td>
                <td style="color:blue;">低い (Low)</td>
                <td><strong>「単純すぎる」</strong><br>データの特徴を捉えられていない。<br>例：直線で近似</td>
            </tr>
            <tr>
                <td><strong>適正学習</strong><br>(Just right)</td>
                <td>低〜中</td>
                <td>低〜中</td>
                <td><strong>「ちょうどいい」</strong><br>汎化性能が高い状態。</td>
            </tr>
            <tr>
                <td><strong>過学習</strong><br>(Overfitting)</td>
                <td style="color:blue;">低い (Low)</td>
                <td style="color:red; font-weight:bold;">高い (High)</td>
                <td><strong>「複雑すぎる」</strong><br>ノイズまで学習してしまう。<br>未知のデータに弱い。</td>
            </tr>
        </table>

        <h3>■ その他重要ワード</h3>
        <ul>
            <li><strong>k近傍法 (k-NN)</strong>: 「近くの $k$ 人の多数決」で決める。<br>
                <ul>
                    <li>$k$ が小さい ($k=1$) → 境界が複雑（ギザギザ） → <strong>過学習</strong>しやすい</li>
                    <li>$k$ が大きい ($k=N$) → 境界が単純（平坦） → <strong>未学習</strong>しやすい</li>
                </ul>
            </li>
            <li><strong>次元の呪い</strong>: 次元が増えると空間の体積が爆発的に増え、データがスカスカになる現象。<br>→ 近傍法などが機能しなくなるため、次元削減が必要。</li>
        </ul>

        <h3>■ 最後はこの表だけ</h3>
        <table>
            <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
            <tr><td>定規で測る直線距離</td><td><strong>ユークリッド距離（$L_2$）</strong></td><td>座標差を二乗和し、平方根を取る。</td></tr>
            <tr><td>碁盤目・絶対値の和</td><td><strong>マンハッタン距離（$L_1$）</strong></td><td>各軸に沿った移動量を足す。</td></tr>
            <tr><td>各座標差の最大値・王将の手数</td><td><strong>チェビシェフ距離（$L_\\infty$）</strong></td><td>最も大きい座標差だけを使う。</td></tr>
            <tr><td>長さを無視して向きだけ比較</td><td><strong>コサイン距離</strong></td><td>$1-$コサイン類似度。文章ベクトルにも使う。</td></tr>
            <tr><td>分散・相関を考慮した異常度</td><td><strong>マハラノビス距離</strong></td><td>ばらつきの大きい方向を割り引く。</td></tr>
            <tr><td>近い$k$個の多数決</td><td><strong>k-NN</strong><br><small>k-Nearest Neighbors（k近傍法）</small></td><td>$k$が小さすぎると複雑、大きすぎると単純。</td></tr>
            <tr><td>軸で空間を再帰分割し近傍探索</td><td><strong>kd-tree</strong><br><small>k-dimensional tree</small></td><td>低次元の厳密近傍探索を高速化する。</td></tr>
            <tr><td>訓練・テストとも悪い／単純すぎる</td><td><strong>未学習・高バイアス</strong></td><td>データの規則そのものを捉えられていない。</td></tr>
            <tr><td>訓練だけ良く、テストが悪い</td><td><strong>過学習・高バリアンス</strong></td><td>訓練データのノイズまで覚えている。</td></tr>
            <tr><td>高次元で近傍が遠く、空間が疎</td><td><strong>次元の呪い</strong></td><td>次元削減やデータ増加が必要になる。</td></tr>
        </table>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "距離計算",
            question: "2点間の距離を計算する際、各座標の差の絶対値の総和をとるものはどれか。",
            options: ["ユークリッド距離 ($L_2$ノルム)", "マンハッタン距離 ($L_1$ノルム)", "チェビシェフ距離 ($L_\\infty$ノルム)", "マハラノビス距離"],
            answer: 1,
            explanation: "グリッド状の道路を移動する距離に例えられます。式は $\\sum |x_i - y_i|$ です。"
        },
        {
            category: "k近傍法",
            question: "k近傍法(k-NN)において、近傍の数 $k$ を「1」に設定した場合の傾向として正しいものはどれか。",
            options: ["決定境界が滑らかになり、未学習になりやすい", "決定境界が複雑になり、過学習しやすくなる", "すべてのデータを同じクラスに分類する", "計算量が最小になる"],
            answer: 1,
            explanation: "$k=1$ は「最も近い1つのデータ」だけで判断するため、ノイズまで忠実に拾ってしまい、境界が複雑化して過学習のリスクが高まります。"
        },
        {
            category: "機械学習の分類",
            question: "「教師あり学習」に該当しないタスクはどれか。",
            options: ["スパムメールの分類", "住宅価格の予測（回帰）", "正解ラベルなしで似た顧客をグループに分ける", "手書き数字認識"],
            answer: 2,
            explanation: "正解ラベルを与えず、データの構造自体を見つける処理は教師なし学習です。"
        },
        {
            category: "過学習",
            question: "モデルが「過学習（Overfitting）」を起こしている時の典型的な状態はどれか。",
            options: ["訓練誤差が大きく、汎化誤差も大きい", "訓練誤差は小さいが、汎化誤差が大きい", "訓練誤差も汎化誤差も小さい", "訓練誤差が大きく、汎化誤差は小さい"],
            answer: 1,
            explanation: "手元のデータ（訓練データ）には完璧に正解するが、未知のデータ（テストデータ）には通用しない状態です。"
        },
        {
            category: "マハラノビス距離",
            question: "マハラノビス距離の特徴として正しいものはどれか。",
            options: ["データの分散や相関（共分散）を考慮して距離を測る", "常にユークリッド距離よりも値が小さくなる", "ベクトルの方向のみを考慮し、大きさは無視する", "計算にデータの平均値を使用しない"],
            answer: 0,
            explanation: "分布の広がりを考慮するため、外れ値検知などによく使われます。共分散行列の逆行列を用いて計算します。"
        },
        {
            category: "次元の呪い",
            question: "「次元の呪い」と呼ばれる現象の説明として適切なものはどれか。",
            options: ["次元が増えると計算時間が指数関数的に減る", "高次元空間ではデータが疎（スカスカ）になり、距離の差がつきにくくなる", "次元削減を行うと必ず情報量が失われる", "高次元データは可視化できないため理解できない"],
            answer: 1,
            explanation: "次元が増えると空間の体積が爆発的に増え、データ間の距離が均一化してしまい、近傍法などが機能しにくくなります。"
        },
        {
            category: "コサイン距離",
            question: "コサイン類似度が「1」になるときの2つのベクトル $\\mathbf{a}, \\mathbf{b}$ の関係はどれか。",
            options: ["向きが完全に同じ（0度）", "直交している（90度）", "向きが正反対（180度）", "長さが等しい"],
            answer: 0,
            explanation: "$\\cos 0^\\circ = 1$ です。コサイン類似度は方向の一致度を表します（コサイン距離は $1 - \\text{類似度}$ なので 0 になります）。"
        },
        {
            category: "半教師あり学習",
            question: "半教師あり学習（Semi-supervised Learning）のデータセット構成として正しいものはどれか。",
            options: ["全てのデータに正解ラベルがついている", "全てのデータに正解ラベルがついていない", "一部のデータにラベルがあり、残りの大量のデータにはラベルがない", "ラベルの代わりに報酬（Reward）が与えられる"],
            answer: 2,
            explanation: "ラベル付けコストが高い場合に、少量のラベル付きデータと大量のラベルなしデータを組み合わせて学習する手法です。"
        },
        {
            category: "バイアス・バリアンス",
            question: "モデルが単純すぎてデータの傾向を捉えられていない（未学習）状態は、バイアスとバリアンスの観点ではどう表現されるか。",
            options: ["高バイアス・低バリアンス", "低バイアス・高バリアンス", "高バイアス・高バリアンス", "低バイアス・低バリアンス"],
            answer: 0,
            explanation: "モデルの思い込みが激しい（単純すぎる）状態は「高バイアス」です。逆にデータに振り回される（複雑すぎる）のが「高バリアンス」です。"
        },
        {
            category: "kd-tree",
            question: "k近傍法の探索を高速化するために用いられる、空間を分割する木構造のアルゴリズムはどれか。",
            options: ["kd-tree", "B-tree", "ハッシュテーブル", "スタック"],
            answer: 0,
            explanation: "k-dimensional treeの略で、空間を軸ごとに分割して近傍探索を効率化します。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "k近傍法(応用)",
            question: "k近傍法において、パラメータ $k$ をデータ総数 $N$ と同じ値に設定した場合（$k=N$）、どのような予測結果になるか。",
            options: ["入力データに最も近い1点のクラスが出力される", "常に学習データの中で最も多いクラス（多数派）が出力される", "ランダムなクラスが出力される", "決定境界が非常に複雑になる"],
            answer: 1,
            explanation: "全データとの多数決になるため、入力データの特徴に関わらず、常に全体で最も多いクラスが答えになります（超・高バイアス）。"
        },
        {
            category: "マハラノビス距離(応用)",
            question: "マハラノビス距離において、データの各変数が互いに無相関で、かつ分散が全て「1」の場合、この距離は何と一致するか。",
            options: ["ユークリッド距離", "マンハッタン距離", "コサイン距離", "チェビシェフ距離"],
            answer: 0,
            explanation: "共分散行列が単位行列になるため、式がユークリッド距離と同じ形になります。"
        },
        {
            category: "学習曲線(応用)",
            question: "学習曲線（Learning Curve）において、訓練データのサイズを増やしていった時、訓練誤差と検証誤差が共に高い値で収束し、差が縮まらない場合、何が疑われるか。",
            options: ["過学習 (High Variance)", "未学習 (High Bias)", "適切な学習状態", "データの品質不良"],
            answer: 1,
            explanation: "データが増えても精度が上がらない（誤差が高いまま）なのは、モデルの表現力が不足している「未学習（高バイアス）」の特徴です。"
        },
        {
            category: "次元の呪い(応用)",
            question: "「次元の呪い」への対策として、一般的に行われる前処理はどれか。",
            options: ["データを複製して増やす（オーバーサンプリング）", "不要な特徴量を選別し、有効な特徴だけを残す", "より高次元の空間へ写像する", "距離尺度としてユークリッド距離を使う"],
            answer: 1,
            explanation: "不要な特徴量を除き、有効な特徴へ絞ることで、データの疎さを抑えて学習を効率化します。"
        },
        {
            category: "距離尺度(応用)",
            question: "Lp距離（ミンコフスキー距離）において、$p$ を無限大 ($p \\to \\infty$) に近づけたときの距離は「チェビシェフ距離」と呼ばれるが、これはどのような値になるか。",
            options: ["各座標の差の絶対値の合計", "各座標の差の絶対値のうちの最大値", "各座標の差の絶対値の最小値", "0になる"],
            answer: 1,
            explanation: "$L_\\infty$ノルムは、成分ごとの差の中で「最大の差」だけが支配的になる距離です。"
        },
        {
            category: "k近傍法(応用)",
            question: "k近傍法の特徴として「怠惰学習 (Lazy Learning)」と呼ばれる理由は何か。",
            options: ["計算精度が低いため", "事前にモデルのパラメータ学習を行わず、予測時に初めて全データとの距離計算を行うため", "実装が簡単で手抜きできるため", "学習率の設定が必要ないため"],
            answer: 1,
            explanation: "訓練データを記憶するだけで、モデル（数式）の構築を行いません。そのため学習時間はゼロですが、予測に時間がかかります。"
        },
        {
            category: "バイアス・バリアンス(応用)",
            question: "一般に、モデルの複雑さ（自由度）を上げていくと、バイアスとバリアンスはどのように変化するか。",
            options: ["バイアスは下がり、バリアンスは上がる", "バイアスは上がり、バリアンスは下がる", "両方とも下がる", "両方とも上がる"],
            answer: 0,
            explanation: "モデルが複雑になれば表現力が上がり（低バイアス）、データごとの変動（ノイズ）を拾いやすくなります（高バリアンス）。これはトレードオフの関係です。"
        },
        {
            category: "コサイン距離(応用)",
            question: "テキストマイニングなどで、文書間の類似度を測る際に「ユークリッド距離」よりも「コサイン類似度」が好まれる理由は何か。",
            options: ["計算速度が速いから", "文書の長さ（単語数）の影響を受けずに、単語の出現傾向（ベクトル方向）の一致度を見たいから", "負の値をとらないから", "疎行列に対応していないから"],
            answer: 1,
            explanation: "長い文章と短い文章でも、使われている単語の比率が似ていれば「似ている」と判定したい場合に、大きさ（長さ）を無視できるコサイン類似度が有効です。"
        },
        {
            category: "kd-tree(応用)",
            question: "近傍探索において、kd-treeの検索効率が著しく低下し、全探索と変わらなくなってしまうのはどのような場合か。",
            options: ["データ数が非常に少ない場合", "データの次元数が非常に高い場合", "データが正規分布に従う場合", "k=1の場合"],
            answer: 1,
            explanation: "高次元になると「次元の呪い」により、空間分割による枝刈りの効果が薄れ、ほぼ全てのノードを探索することになってしまいます。"
        },
        {
            category: "正則化(応用)",
            question: "過学習を抑制するための「正則化」は、バイアス・バリアンスの観点ではどのような操作に当たるか。",
            options: ["バリアンスを下げて、バイアスを少し上げる", "バリアンスを上げて、バイアスを下げる", "バリアンスもバイアスも下げる", "バリアンスもバイアスも上げる"],
            answer: 0,
            explanation: "モデルを単純化する（制約をかける）ことで、変動（バリアンス）を抑えますが、その分表現力が落ちるためバイアスはわずかに上昇します。"
        },

        // ---------------------------------------------------------
        // 【距離の計算演習】 Q21 - Q24
        // ---------------------------------------------------------
        {
            category: "ユークリッド距離（計算）",
            question: "2点 $\\mathbf{x}=(1,2)$、$\\mathbf{y}=(4,6)$ のユークリッド距離はいくつか。",
            options: ["7", "5", "25", "$\\sqrt{7}$"],
            answer: 1,
            explanation: "各成分の差を2乗して足し、最後に平方根を取ります。$d=\\sqrt{(1-4)^2+(2-6)^2}=\\sqrt{(-3)^2+(-4)^2}=\\sqrt{9+16}=\\sqrt{25}=5$ です。"
        },
        {
            category: "マンハッタン距離（計算）",
            question: "2点 $\\mathbf{x}=(1,2)$、$\\mathbf{y}=(4,6)$ のマンハッタン距離はいくつか。",
            options: ["5", "25", "7", "12"],
            answer: 2,
            explanation: "各成分の差の絶対値を足します。$d=|1-4|+|2-6|=|-3|+|-4|=3+4=7$ です。ユークリッド距離のように2乗や平方根は使いません。"
        },
        {
            category: "コサイン距離（計算）",
            question: "ベクトル $\\mathbf{x}=(1,2)$、$\\mathbf{y}=(2,1)$ のコサイン距離はいくつか。コサイン距離は $1-\\text{コサイン類似度}$ とする。",
            options: ["0.8", "0.2", "1.2", "4"],
            answer: 1,
            explanation: "まず内積は $\\mathbf{x}\\cdot\\mathbf{y}=1\\times2+2\\times1=4$、両方の大きさは $\\sqrt{1^2+2^2}=\\sqrt{5}$ です。コサイン類似度は $4/(\\sqrt{5}\\sqrt{5})=4/5=0.8$。したがってコサイン距離は $1-0.8=0.2$ です。"
        },
        {
            category: "マハラノビス距離（計算）",
            question: "点 $\\mathbf{x}=(3,4)$、平均 $\\boldsymbol{\\mu}=(1,2)$、共分散行列 $\\Sigma=\\mathrm{diag}(4,1)$ のとき、点 $\\mathbf{x}$ の平均からのマハラノビス距離はいくつか。",
            options: ["5", "$\\sqrt{8}$", "$\\sqrt{5}$", "4"],
            answer: 2,
            explanation: "差は $\\mathbf{x}-\\boldsymbol{\\mu}=(2,2)$、逆共分散行列は $\\Sigma^{-1}=\\mathrm{diag}(1/4,1)$ です。$d=\\sqrt{(\\mathbf{x}-\\boldsymbol{\\mu})^T\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})}=\\sqrt{2^2/4+2^2/1}=\\sqrt{1+4}=\\sqrt{5}$ です。分散4の第1成分は、同じ差でも距離への影響が小さくなります。"
        }
    ]
};
