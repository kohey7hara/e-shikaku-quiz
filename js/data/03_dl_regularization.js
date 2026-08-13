window.quizData = {
    title: "3-（３）深層モデルのための正則化",

    cheatSheet: `
        <style>
            .reg-core { margin: 12px 0 20px; padding: 14px 16px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .reg-flow { display: flex; align-items: stretch; justify-content: center; gap: 10px; flex-wrap: wrap; margin: 12px 0 20px; }
            .reg-flow-card { flex: 1 1 210px; max-width: 290px; padding: 13px; border: 2px solid #cbd5e1; border-radius: 10px; background: #fff; text-align: center; }
            .reg-flow-card strong { display: block; margin-bottom: 5px; color: #123f68; }
            .visual-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 12px 0 20px; }
            .visual-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 10px; background: #fff; text-align: center; }
            .visual-card strong { display: block; margin-bottom: 5px; color: #123f68; }
            .visual-svg { display: block; width: 100%; max-width: 320px; height: 135px; margin: 4px auto 8px; }
            .l1-shape { fill: rgba(231, 76, 60, 0.2); stroke: #e74c3c; stroke-width: 2; }
            .l2-shape { fill: rgba(52, 152, 219, 0.2); stroke: #3498db; stroke-width: 2; }
            .contour { fill: none; stroke: #999; stroke-width: 1; stroke-dasharray: 2,2; }
            .svg-label { font-size: 11px; fill: #334e68; font-weight: 700; }
            .svg-note { font-size: 9px; fill: #627d98; }
            .visual-caption { font-size: 0.88em; line-height: 1.6; color: #334e68; }
            .formula-box { margin: 6px 0; padding: 8px 10px; border-radius: 8px; background: #f3f7fb; color: #123f68; font-size: 1.02em; white-space: nowrap; }
            .formula-box mjx-container { margin: 0 !important; }
            .comparison-table td:nth-child(3) { min-width: 330px; }
            .reg-memory { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #f39c12; border-radius: 8px; background: #fff8e7; line-height: 1.75; }
            @media (max-width: 760px) {
                .visual-grid { grid-template-columns: 1fr; }
            }
        </style>

        <h3>■ まずは3か所で整理</h3>
        <div class="reg-core">
            <strong>① 重みを抑える：</strong>L1・L2・weight decay<br>
            <strong>② ネットワークを間引く：</strong>Dropout・DropConnect<br>
            <strong>③ 学習を止める・揺らす：</strong>Early Stopping・バッチサイズ・学習率
        </div>
        <div class="reg-flow">
            <div class="reg-flow-card"><strong>損失・重み</strong>L1 / L2 / weight decay<br>大きすぎる重みを抑える</div>
            <div class="reg-flow-card"><strong>中間層・結合</strong>Dropout / DropConnect<br>特定部分への依存を減らす</div>
            <div class="reg-flow-card"><strong>学習ループ</strong>Early Stopping / batch / 学習率<br>過適合する前に止め、更新を調整</div>
        </div>
        <div class="reg-memory"><strong>章の分担：</strong>正規化4種・データ拡張・アンサンブル・探索は <a href="quiz.html?id=03_dl_generalization">3-（7）汎化性能向上</a> に集約しています。</div>

        <h3>■ L1 vs L2：ペナルティの形</h3>
        <p>データ損失にペナルティを足した $L_{data}+\\lambda R(w)$ を最小化します。</p>
        <div class="visual-grid">
            <div class="visual-card">
                <strong>L1正則化（Lasso）</strong>
                <svg class="visual-svg" viewBox="0 0 180 135" role="img" aria-label="L1制約のひし形と軸上の接点">
                    <line x1="90" y1="5" x2="90" y2="125" stroke="#cbd5e1"/><line x1="30" y1="65" x2="150" y2="65" stroke="#cbd5e1"/>
                    <polygon points="90,25 130,65 90,105 50,65" class="l1-shape"/>
                    <ellipse cx="144" cy="25" rx="45" ry="27" class="contour" transform="rotate(40,144,25)"/>
                    <circle cx="50" cy="65" r="5" fill="#e74c3c"/><text x="18" y="59" class="svg-label">軸上</text>
                    <text x="56" y="126" class="svg-note">角で接しやすい → 0が生まれる</text>
                </svg>
                <div class="visual-caption"><strong>尖ったひし形</strong>の角は軸上。重みがちょうど0になりやすく、スパース化・特徴選択につながる。</div>
            </div>
            <div class="visual-card">
                <strong>L2正則化（Ridge）</strong>
                <svg class="visual-svg" viewBox="0 0 180 135" role="img" aria-label="L2制約の円と滑らかな接点">
                    <line x1="90" y1="5" x2="90" y2="125" stroke="#cbd5e1"/><line x1="30" y1="65" x2="150" y2="65" stroke="#cbd5e1"/>
                    <circle cx="90" cy="65" r="40" class="l2-shape"/>
                    <ellipse cx="151" cy="22" rx="45" ry="27" class="contour" transform="rotate(40,151,22)"/>
                    <circle cx="119" cy="37" r="5" fill="#3498db"/>
                    <text x="45" y="126" class="svg-note">滑らかに接する → 全体が小さくなる</text>
                </svg>
                <div class="visual-caption"><strong>丸い制約</strong>に滑らかに接する。重み全体を0に近づけるが、通常はちょうど0にはしない。</div>
            </div>
        </div>

        <h3>■ L1・L2・weight decay：式で見分ける</h3>
        <table class="comparison-table">
            <tr><th>手法</th><th>式</th><th>試験のツボ</th></tr>
            <tr>
                <td><strong>L1</strong></td>
                <td><div class="formula-box">$\\displaystyle L=L_{data}+\\lambda\\sum_i|w_i|$</div></td>
                <td>絶対値。重みを<strong>ちょうど0</strong>にしやすく、スパース化・特徴選択へ。</td>
            </tr>
            <tr>
                <td><strong>L2</strong></td>
                <td><div class="formula-box">$\\displaystyle L=L_{data}+\\frac{\\lambda}{2}\\sum_iw_i^2$</div></td>
                <td>二乗。大きな重みを強く罰し、全体を滑らかに小さくする。</td>
            </tr>
            <tr>
                <td><strong>Weight decay</strong></td>
                <td><div class="formula-box">$\\displaystyle w\\leftarrow(1-\\eta\\lambda)w-\\eta\\nabla L_{data}$</div></td>
                <td>更新時に重みを直接縮める。SGDではL2と同じ形だが、AdamWでは勾配更新から<strong>分離</strong>する。</td>
            </tr>
        </table>
        <div class="reg-memory"><strong>$\\lambda$ を大きくしすぎると：</strong>制約が強すぎて重みが小さくなり、未学習（underfitting）になります。</div>

        <h3>■ DropoutとDropConnect：何を消す？</h3>
        <div class="visual-grid">
            <div class="visual-card">
                <strong>Dropout：ノードを消す</strong>
                <svg class="visual-svg" viewBox="0 0 240 135" role="img" aria-label="一部のニューロンをランダムに無効化">
                    <g stroke="#9fb3c8" stroke-width="1.5">
                        <line x1="45" y1="30" x2="115" y2="22"/><line x1="45" y1="30" x2="115" y2="67"/><line x1="45" y1="100" x2="115" y2="67"/>
                        <line x1="45" y1="100" x2="115" y2="112"/><line x1="115" y1="22" x2="195" y2="67"/><line x1="115" y1="67" x2="195" y2="67"/><line x1="115" y1="112" x2="195" y2="67"/>
                    </g>
                    <g fill="#167f92"><circle cx="45" cy="30" r="9"/><circle cx="45" cy="100" r="9"/><circle cx="115" cy="22" r="9"/><circle cx="115" cy="112" r="9"/><circle cx="195" cy="67" r="10"/></g>
                    <circle cx="115" cy="67" r="10" fill="#e2e8f0"/><path d="M107 59 L123 75 M123 59 L107 75" stroke="#e74c3c" stroke-width="4"/>
                    <text x="79" y="132" class="svg-label">ニューロンをランダムOFF</text>
                </svg>
                <div class="visual-caption">毎回異なる部分ネットワークを学習し、特定ニューロンへの<strong>共適応</strong>を抑える。</div>
            </div>
            <div class="visual-card">
                <strong>DropConnect：結合を消す</strong>
                <svg class="visual-svg" viewBox="0 0 240 135" role="img" aria-label="一部の重み結合をランダムに無効化">
                    <g stroke="#9fb3c8" stroke-width="2">
                        <line x1="45" y1="30" x2="120" y2="25"/><line x1="45" y1="30" x2="120" y2="68"/><line x1="45" y1="102" x2="120" y2="68"/><line x1="45" y1="102" x2="120" y2="112"/>
                        <line x1="120" y1="25" x2="198" y2="68"/><line x1="120" y1="68" x2="198" y2="68"/><line x1="120" y1="112" x2="198" y2="68"/>
                    </g>
                    <g fill="#167f92"><circle cx="45" cy="30" r="9"/><circle cx="45" cy="102" r="9"/><circle cx="120" cy="25" r="9"/><circle cx="120" cy="68" r="9"/><circle cx="120" cy="112" r="9"/><circle cx="198" cy="68" r="10"/></g>
                    <path d="M73 40 L88 55 M88 40 L73 55" stroke="#e74c3c" stroke-width="4"/><text x="77" y="132" class="svg-label">重み（線）をランダムOFF</text>
                </svg>
                <div class="visual-caption">ノードは残し、重み行列の一部を0にする。<strong>点ならDropout、線ならDropConnect</strong>。</div>
            </div>
        </div>
        <table class="comparison-table">
            <tr><th>手法</th><th>学習時</th><th>推論時・見分け方</th></tr>
            <tr>
                <td><strong>Inverted Dropout</strong></td>
                <td><div class="formula-box">$\\displaystyle m\\sim\\mathrm{Bernoulli}(1-p),\\quad y=\\frac{m}{1-p}x$</div></td>
                <td>生き残った出力を $1/(1-p)$ 倍して期待値を保つ。推論時は何もしない。</td>
            </tr>
            <tr><td><strong>DropConnect</strong></td><td>重み（結合）をランダムに0</td><td>Dropoutはノード、DropConnectは結合。</td></tr>
        </table>

        <h3>■ Early Stoppingと陰的正則化</h3>
        <div class="visual-grid">
            <div class="visual-card">
                <strong>Early Stopping：検証損失の谷で保存</strong>
                <svg class="visual-svg" viewBox="0 0 240 135" role="img" aria-label="検証損失が最小になる位置で早期終了">
                    <line x1="30" y1="108" x2="220" y2="108" stroke="#627d98"/><line x1="30" y1="108" x2="30" y2="15" stroke="#627d98"/>
                    <path d="M35 24 C70 48,120 78,215 97" fill="none" stroke="#2780b8" stroke-width="3"/>
                    <path d="M35 35 C75 70,112 94,140 69 C165 49,190 39,215 31" fill="none" stroke="#e05d5d" stroke-width="3"/>
                    <line x1="137" y1="18" x2="137" y2="108" stroke="#f39c12" stroke-width="2" stroke-dasharray="5,4"/><circle cx="137" cy="71" r="5" fill="#f39c12"/>
                    <text x="145" y="66" class="svg-label">best</text><text x="158" y="125" class="svg-note">epoch</text><text x="45" y="20" class="svg-note">train</text><text x="178" y="26" class="svg-note">validation</text>
                </svg>
                <div class="visual-caption">検証指標が一定期間改善しなければ停止し、<strong>最後ではなく最良時点の重み</strong>を復元する。</div>
            </div>
            <div class="visual-card">
                <strong>バッチサイズ：勾配の揺れ</strong>
                <svg class="visual-svg" viewBox="0 0 240 135" role="img" aria-label="小バッチは揺れながら進み大バッチは滑らかに進む">
                    <path d="M20 112 Q70 18 120 112 Q170 18 220 112" fill="none" stroke="#d9e2ec" stroke-width="2"/>
                    <path d="M28 102 L55 75 L77 87 L101 53 L124 64 L150 40 L176 49 L205 27" fill="none" stroke="#e67e22" stroke-width="3"/>
                    <path d="M28 114 C82 93,135 57,205 30" fill="none" stroke="#2780b8" stroke-width="3"/>
                    <text x="28" y="20" class="svg-note">小バッチ：揺れが大きい</text><text x="28" y="34" class="svg-note">大バッチ：滑らか</text>
                </svg>
                <div class="visual-caption">小さめのバッチの勾配ノイズは汎化に役立つ場合がある。ただし小さすぎると学習が不安定。</div>
            </div>
            <div class="visual-card">
                <strong>学習率：1歩の大きさ</strong>
                <svg class="visual-svg" viewBox="0 0 240 135" role="img" aria-label="小さい学習率と大きい学習率の歩幅">
                    <g fill="#2780b8"><circle cx="30" cy="48" r="5"/><circle cx="55" cy="48" r="5"/><circle cx="80" cy="48" r="5"/><circle cx="105" cy="48" r="5"/></g>
                    <g stroke="#2780b8" stroke-width="2"><line x1="35" y1="48" x2="50" y2="48"/><line x1="60" y1="48" x2="75" y2="48"/><line x1="85" y1="48" x2="100" y2="48"/></g>
                    <g fill="#e67e22"><circle cx="30" cy="98" r="5"/><circle cx="100" cy="98" r="5"/><circle cx="190" cy="98" r="5"/></g>
                    <g stroke="#e67e22" stroke-width="3"><line x1="35" y1="98" x2="95" y2="98"/><line x1="105" y1="98" x2="185" y2="98"/></g>
                    <text x="125" y="51" class="svg-label">小さい η</text><text x="125" y="101" class="svg-label">大きい η</text>
                </svg>
                <div class="visual-caption">安定範囲内の大きめの学習率が平坦な解を促す場合があるが、大きすぎると発散する。</div>
            </div>
        </div>
        <table class="comparison-table">
            <tr><th>手法</th><th>監視・調整</th><th>試験のツボ</th></tr>
            <tr><td><strong>Early Stopping</strong></td><td>検証指標と patience</td><td>テストデータで止めない。最良時点の重みを保存・復元。</td></tr>
            <tr><td><strong>小さめのバッチ</strong></td><td>勾配に適度なノイズ</td><td>陰的正則化として働く場合があるが、「小さいほど必ず良い」ではない。</td></tr>
            <tr><td><strong>学習率</strong></td><td>更新の歩幅</td><td>大きすぎれば発散、小さすぎれば停滞。汎化にも影響する。</td></tr>
        </table>
        <div class="reg-memory"><strong>一言で覚える：</strong>L1は「0を作る」、L2は「全体を縮める」、Dropoutは「点を消す」、DropConnectは「線を消す」、Early Stoppingは「検証損失の谷で戻す」。</div>

        <h3>■ 最後はこの表だけ</h3>
        <table>
            <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
            <tr><td>絶対値ペナルティ／スパース化</td><td><strong>L1正則化（Lasso）</strong><br><small>Least Absolute Shrinkage and Selection Operator</small></td><td>ひし形の角で接し、重みをちょうど0にしやすい。</td></tr>
            <tr><td>二乗ペナルティ／全体を小さく</td><td><strong>L2正則化（Ridge）</strong></td><td>大きな重みを強く罰し、滑らかに縮める。</td></tr>
            <tr><td>更新ごとに重みを直接縮める</td><td><strong>weight decay</strong></td><td>SGD（Stochastic Gradient Descent）ではL2と同じ更新形。</td></tr>
            <tr><td>適応的勾配更新と重み減衰を分離</td><td><strong>AdamW</strong><br><small>Adaptive Moment Estimation with decoupled Weight Decay</small></td><td>L2項を適応的学習率で歪めず、別に減衰させる。</td></tr>
            <tr><td>ニューロンをランダムに無効化</td><td><strong>Dropout</strong></td><td>特定ノード同士の共適応を抑える。</td></tr>
            <tr><td>重み・結合をランダムに無効化</td><td><strong>DropConnect</strong></td><td>点を消すDropoutに対し、線を消す。</td></tr>
            <tr><td>学習時に生存値を$1/(1-p)$倍（$p$はドロップ率）</td><td><strong>Inverted Dropout</strong></td><td>期待値をそろえるため、推論時の倍率調整は不要。</td></tr>
            <tr><td>検証指標が改善しない</td><td><strong>Early Stopping</strong></td><td>最後ではなく、検証性能が最良の重みへ戻す。</td></tr>
            <tr><td>小さめバッチの勾配ノイズ</td><td><strong>陰的正則化</strong></td><td>汎化に役立つ場合があるが、小さいほど良いとは限らない。</td></tr>
            <tr><td>学習率が大きすぎる／小さすぎる</td><td><strong>発散／停滞</strong></td><td>学習率は最適化だけでなく、到達する解の汎化にも影響する。</td></tr>
        </table>
    `,

    questions: [
        {
            id: "reg-l1-formula",
            category: "L1正則化",
            question: "L1正則化（Lasso）のペナルティ項として正しい数式はどれか。",
            options: ["$\\lambda \\sum |w|$（重みの絶対値の和）", "$\\frac{1}{2}\\lambda \\sum w^2$（重みの二乗和）", "$\\lambda \\sum w$（重みの和）", "$\\lambda \\sum \\log(w)$"],
            answer: 0,
            explanation: "L1は重みの絶対値を足します。この尖った制約が、重みをちょうど0にしやすいスパース性を生みます。"
        },
        {
            id: "reg-l2-effect",
            category: "L2正則化",
            question: "L2正則化（Ridge）を加えると、パラメータ $w$ は一般にどうなるか。",
            options: ["全体的に0へ近づき小さくなる", "多くのパラメータが必ず完全に0になる", "必ず大きくなる", "符号だけが反転する"],
            answer: 0,
            explanation: "L2は大きな重みを二乗で強く罰し、重み全体を滑らかに縮めます。通常、L1のように多数をちょうど0にはしません。"
        },
        {
            id: "reg-objective",
            category: "正則化の目的",
            question: "正則化の根本的な目的として最も適切なものはどれか。",
            options: ["過学習を抑え、未知データへの汎化性能を高める", "訓練精度だけを最大化する", "必ず計算速度を上げる", "必ず層を深くする"],
            answer: 0,
            explanation: "訓練データだけに過剰適合しないようモデルへ制約やランダム性を加え、未知データでも機能することを目指します。"
        },
        {
            id: "reg-weight-decay-name",
            category: "Weight decay",
            question: "SGDの実装でL2正則化と同じ形で現れる、重みを更新ごとに縮める処理は何か。",
            options: ["Weight decay", "Gradient clipping", "Momentum", "Learning-rate decay"],
            answer: 0,
            explanation: "更新式に $(1-\\eta\\lambda)w$ が現れ、現在の重みを少しずつ減衰させます。"
        },
        {
            id: "reg-adamw-decoupled",
            category: "Weight decay・AdamW",
            difficulty: "応用",
            question: "AdamWのweight decayの説明として正しいものはどれか。",
            options: ["重みの減衰を適応的勾配更新から分離して適用する", "勾配を常に0にする", "L1ペナルティだけを使う", "学習率を固定で1にする"],
            answer: 0,
            explanation: "AdamWはweight decayを損失勾配へ混ぜず、適応的な勾配更新とは別に重みへ直接適用します。"
        },
        {
            id: "reg-l1-geometry",
            category: "L1正則化・幾何",
            difficulty: "応用",
            question: "L1正則化でパラメータが0になりやすい幾何学的理由はどれか。",
            options: ["ひし形の制約領域の角が軸上にあり、等高線が角で接しやすい", "制約領域が円形だから", "勾配が常に0だから", "二乗ペナルティだから"],
            answer: 0,
            explanation: "L1制約のひし形には軸上の尖った角があります。最適点がその角に来ると、対応する重みが0になります。"
        },
        {
            id: "reg-lambda-too-large",
            category: "正則化係数",
            difficulty: "応用",
            question: "L1・L2の正則化係数 $\\lambda$ を大きくしすぎると、一般にどうなるか。",
            options: ["制約が強すぎてモデルが単純になり、未学習を起こす", "必ず過学習する", "必ず学習が高速化する", "重みが必ず発散する"],
            answer: 0,
            explanation: "データ誤差を減らすより重みを小さくすることが優先され、表現力不足によるunderfittingが起こり得ます。"
        },
        {
            id: "reg-dropout-effect",
            category: "Dropout",
            question: "Dropoutが汎化性能を向上させる理由として最も適切なものはどれか。",
            options: ["学習ごとに異なる部分ネットワークとなり、特定ニューロンへの共適応を抑える", "入力データ数を直接増やす", "勾配消失を必ず防ぐ", "パラメータ数を恒久的に減らす"],
            answer: 0,
            explanation: "ニューロンをランダムに無効化することで、特定の経路だけに依存しにくい頑健な表現を促します。"
        },
        {
            id: "reg-dropout-classic-inference",
            category: "Dropout・推論時",
            question: "非Inverted Dropoutで、学習時のドロップ率が $p=0.5$ のとき、推論時の出力調整はどれか。",
            options: ["出力を0.5倍する", "出力を2倍する", "調整しない", "出力を0にする"],
            answer: 0,
            explanation: "学習時は期待的に半分の信号だけが残るため、全ノードを使う推論時に $(1-p)=0.5$ を掛けて尺度をそろえます。"
        },
        {
            id: "reg-inverted-dropout",
            category: "Inverted Dropout",
            question: "Inverted Dropoutの処理として正しいものはどれか。",
            options: ["学習時に生き残った出力を $1/(1-p)$ 倍し、推論時は調整しない", "推論時だけ出力を $1/(1-p)$ 倍する", "学習時に全ノードを使う", "重みを必ず0にする"],
            answer: 0,
            explanation: "学習時に期待値をそろえておくため、推論時には全ノードをそのまま使用できます。主要フレームワークで一般的な方式です。"
        },
        {
            id: "reg-dropconnect",
            category: "DropConnect",
            question: "DropConnectは何をランダムに無効化するか。",
            options: ["重み（結合）", "ニューロン（ノード）", "正解ラベル", "バッチ全体"],
            answer: 0,
            explanation: "Dropoutはノードを消し、DropConnectはノード間の重み、つまり結合を消します。"
        },
        {
            id: "reg-early-stopping-monitor",
            category: "Early Stopping",
            question: "Early Stoppingで監視すべき指標はどれか。",
            options: ["検証データに対する損失などの検証指標", "訓練損失だけ", "テスト損失", "パラメータ数"],
            answer: 0,
            explanation: "訓練損失は下がり続けても過学習している可能性があります。独立した検証データの指標で停止を判断します。"
        },
        {
            id: "reg-early-stopping-restore",
            category: "Early Stopping・重み復元",
            difficulty: "応用",
            question: "Early Stopping後に採用すべきモデルの重みはどれか。",
            options: ["検証指標が最良だった時点の重み", "最後のepochの重み", "最初の重み", "すべて0にした重み"],
            answer: 0,
            explanation: "停止判定までのpatience期間中に性能が悪化している場合があるため、最良時点のcheckpointへ戻します。"
        },
        {
            id: "reg-l1-penalty-calc",
            category: "L1正則化（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "重みが $w=[-2,1]$、$\\lambda=0.1$ のとき、L1ペナルティ $\\lambda\\sum_i|w_i|$ はいくつか。",
            options: ["0.1", "0.2", "0.3", "0.5"],
            answer: 2,
            explanation: "$0.1\\times(|-2|+|1|)=0.1\\times3=0.3$ です。"
        },
        {
            id: "reg-l2-penalty-calc",
            category: "L2正則化（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "重みが $w=[-2,1]$、$\\lambda=0.1$ のとき、L2ペナルティ $\\frac{\\lambda}{2}\\sum_iw_i^2$ はいくつか。",
            options: ["0.05", "0.1", "0.2", "0.25"],
            answer: 3,
            explanation: "$\\frac{0.1}{2}\\{(-2)^2+1^2\\}=0.05\\times5=0.25$ です。"
        },
        {
            id: "reg-weight-decay-calc",
            category: "Weight decay（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "データ損失の勾配を0とし、$w=2,\\eta=0.1,\\lambda=0.5$ とする。$w\\leftarrow(1-\\eta\\lambda)w$ による1回後の重みはどれか。",
            options: ["1.9", "1.5", "1.0", "2.1"],
            answer: 0,
            explanation: "$(1-0.1\\times0.5)\\times2=0.95\\times2=1.9$ です。"
        },
        {
            id: "reg-inverted-dropout-calc",
            category: "Inverted Dropout（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "Inverted Dropoutでドロップ率 $p=0.25$、活性値 $x=4$ が生き残った。学習時の出力 $x/(1-p)$ はどれか。",
            options: ["3", "$16/3\\approx5.33$", "4", "16"],
            answer: 1,
            explanation: "$4/(1-0.25)=4/0.75=16/3\\approx5.33$。生き残った値を拡大して期待値を保ちます。"
        },
        {
            id: "reg-batch-size-implicit",
            category: "陰的正則化・バッチサイズ",
            difficulty: "応用",
            question: "バッチサイズと汎化の関係について最も適切な説明はどれか。",
            options: ["小さいほど必ず高精度", "大きいほど必ず高精度", "小さめのバッチの勾配ノイズが汎化に役立つ場合があるが、小さすぎると不安定", "汎化とは無関係"],
            answer: 2,
            explanation: "勾配の揺らぎが陰的正則化として働く場合がありますが、効果はデータやモデルに依存します。"
        },
        {
            id: "reg-learning-rate-implicit",
            category: "陰的正則化・学習率",
            difficulty: "応用",
            question: "学習率を汎化性能の観点で調整するときの説明として正しいものはどれか。",
            options: ["大きいほど常に良い", "小さいほど常に良い", "0が最適", "安定範囲内の大きめの学習率が平坦な解を促す場合があるが、大きすぎると発散する"],
            answer: 3,
            explanation: "学習率は最適化だけでなく陰的正則化にも関係します。極端な値を避け、検証データで調整します。"
        }
    ]
};
