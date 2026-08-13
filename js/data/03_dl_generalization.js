window.quizData = {
    title: "3-（７）汎化性能向上のためのテクニック",

    cheatSheet: `
        <style>
            .gen-core { margin: 10px 0 20px; padding: 13px 15px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.75; }
            .gen-note { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #f39c12; border-radius: 8px; background: #fff8e7; line-height: 1.7; }
            .gen-formula { margin: 7px 0; padding: 9px 11px; border: 1px solid #c8dbee; border-radius: 8px; background: #f3f8fd; color: #123f68; text-align: center; overflow-x: auto; }
            .gen-formula mjx-container { margin: 0 !important; }
            .gen-table-wrap { overflow-x: auto; margin-bottom: 18px; }
            .gen-table { width: 100%; border-collapse: collapse; }
            .gen-table th { background: #eaf2fb; }
            .gen-table th, .gen-table td { padding: 9px; border: 1px solid #d7e2ec; vertical-align: top; }
            .gen-table td:first-child { white-space: nowrap; }
            .gen-compact-terms td:nth-child(odd) { white-space: nowrap; color: #123f68; font-weight: 800; }
            .gen-symbol-table td:nth-child(2) { min-width: 430px; }
            .gen-visual-wrap { margin: 12px 0 20px; overflow-x: auto; border: 1px solid #d7e2ec; border-radius: 12px; background: #fff; }
            .gen-visual-card { box-sizing: border-box; min-width: 830px; padding: 12px; }
            .gen-wide-svg { display: block; width: 100%; min-width: 800px; height: auto; margin: 0 auto; }
            .gen-svg-title { font-size: 15px; fill: #102a43; font-weight: 800; }
            .gen-svg-label { font-size: 12px; fill: #243b53; font-weight: 750; }
            .gen-svg-note { font-size: 10px; fill: #526d82; }
            .gen-svg-mini { font-size: 9px; fill: #627d98; }
            .gen-visual-caption { padding: 0 15px 13px; color: #334e68; line-height: 1.7; }
            .gen-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 12px 0 20px; }
            .gen-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 10px; background: #fff; text-align: center; }
            .gen-card > strong { display: block; margin-bottom: 5px; color: #123f68; }
            .gen-mini-svg { display: block; width: 100%; max-width: 340px; height: 145px; margin: 4px auto 8px; }
            .gen-card-caption { color: #334e68; font-size: 0.88em; line-height: 1.6; }
            .gen-link-map { margin: 9px 0 20px; padding: 11px 13px; border: 1px dashed #9fb3c8; border-radius: 8px; background: #f8fafc; line-height: 1.75; }
            @media (max-width: 760px) {
                .gen-grid { grid-template-columns: 1fr; }
            }
        </style>

        <h3>■ まず4本：何を変えて汎化させる？</h3>
        <p><strong>汎化性能</strong>とは、訓練で見ていないデータにも正しく対応できる力です。この章は「データ・中間表現・予測・設定」の4方向で整理します。</p>
        <div class="gen-visual-wrap">
            <div class="gen-visual-card">
                <svg class="gen-wide-svg" viewBox="0 0 960 250" role="img" aria-label="汎化性能を上げる4方向としてデータ拡張、正規化、アンサンブル、ハイパーパラメータ選択を示す図">
                    <defs><marker id="gen-overview-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <rect x="16" y="13" width="928" height="52" rx="10" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="382" y="35" class="gen-svg-title">目標：未知データでも当てる</text><text x="347" y="54" class="gen-svg-note">訓練データの丸暗記ではなく、規則を学ぶ</text>
                    <path d="M480 67 V87 M480 87 H128 V103 M480 87 H365 V103 M480 87 H597 V103 M480 87 H832 V103" fill="none" stroke="#627d98" stroke-width="2" marker-end="url(#gen-overview-arrow)"/>

                    <rect x="20" y="106" width="216" height="118" rx="10" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/>
                    <text x="72" y="130" class="gen-svg-title">① データ拡張</text>
                    <rect x="43" y="148" width="42" height="42" rx="5" fill="#63c5da"/><text x="59" y="175" class="gen-svg-label">A</text>
                    <path d="M91 169 H117" stroke="#627d98" stroke-width="2" marker-end="url(#gen-overview-arrow)"/>
                    <g fill="#b7e4c7" stroke="#27ae60"><rect x="123" y="140" width="36" height="36" rx="4"/><rect x="150" y="162" width="36" height="36" rx="4"/><rect x="177" y="140" width="36" height="36" rx="4"/></g>
                    <text x="49" y="214" class="gen-svg-note">1例から意味を保った別例を作る</text>

                    <rect x="248" y="106" width="216" height="118" rx="10" fill="#f4ecf7" stroke="#8e44ad" stroke-width="2"/>
                    <text x="309" y="130" class="gen-svg-title">② 正規化</text>
                    <g fill="#e74c3c"><circle cx="275" cy="151" r="5"/><circle cx="302" cy="183" r="5"/><circle cx="329" cy="144" r="5"/><circle cx="356" cy="190" r="5"/></g>
                    <path d="M375 168 H397" stroke="#627d98" stroke-width="2" marker-end="url(#gen-overview-arrow)"/>
                    <g fill="#8e44ad"><circle cx="407" cy="153" r="5"/><circle cx="418" cy="169" r="5"/><circle cx="431" cy="159" r="5"/><circle cx="440" cy="176" r="5"/></g>
                    <text x="276" y="214" class="gen-svg-note">尺度をそろえて学習を安定化</text>

                    <rect x="476" y="106" width="216" height="118" rx="10" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                    <text x="522" y="130" class="gen-svg-title">③ アンサンブル</text>
                    <g fill="#fff" stroke="#f39c12"><rect x="497" y="143" width="53" height="25" rx="4"/><rect x="497" y="174" width="53" height="25" rx="4"/></g>
                    <text x="511" y="160" class="gen-svg-note">Model 1</text><text x="511" y="191" class="gen-svg-note">Model 2</text>
                    <path d="M554 155 L606 169 M554 187 L606 173" stroke="#627d98" stroke-width="2"/>
                    <rect x="609" y="151" width="61" height="41" rx="6" fill="#f9e79f" stroke="#d4ac0d"/><text x="620" y="168" class="gen-svg-mini">平均・投票</text><text x="628" y="183" class="gen-svg-mini">最終予測</text>
                    <text x="500" y="214" class="gen-svg-note">複数の誤りを平均して安定化</text>

                    <rect x="704" y="106" width="236" height="118" rx="10" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="732" y="130" class="gen-svg-title">④ ハイパーパラメータ</text>
                    <g fill="#2780b8"><circle cx="735" cy="154" r="5"/><circle cx="765" cy="181" r="5"/><circle cx="795" cy="150" r="5"/><circle cx="825" cy="188" r="5"/><circle cx="855" cy="160" r="5"/></g>
                    <circle cx="886" cy="145" r="8" fill="#27ae60" stroke="#1e8449" stroke-width="2"/><text x="871" y="180" class="gen-svg-mini">Validationで選ぶ</text>
                    <text x="731" y="214" class="gen-svg-note">候補を比較し、よい設定を選ぶ</text>
                </svg>
            </div>
            <div class="gen-visual-caption"><strong>一言暗記：</strong>データを増やす／尺度をそろえる／複数で相談する／設定を選ぶ。</div>
        </div>

        <div class="gen-link-map">
            <strong>章の重複を避ける：</strong>Dropout・L1/L2・Early Stoppingの仕組みは
            <a href="quiz.html?id=03_dl_regularization">3-（3）正則化</a>、訓練／検証／テストと交差検証は
            <a href="quiz.html?id=02_ml_basics_2">2-（1）機械学習 Vol.2</a>、オプティマイザや学習率スケジュールは
            <a href="quiz.html?id=03_dl_optimization">3-（2）深層モデルのための最適化</a>で扱います。本章では<strong>2026シラバス3-（7）の4領域</strong>に集中します。
        </div>

        <h3>■ データ拡張：ラベルの意味を保って例を増やす</h3>
        <div class="gen-grid">
            <div class="gen-card">
                <strong>基本変換：ラベルはそのまま</strong>
                <svg class="gen-mini-svg" viewBox="0 0 340 145" role="img" aria-label="元画像を反転、切り抜き、明るさ変更して同じラベルの学習例を作る">
                    <defs><marker id="gen-aug-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#627d98"/></marker></defs>
                    <rect x="15" y="36" width="68" height="68" rx="7" fill="#d6ecfa" stroke="#2780b8"/><circle cx="49" cy="65" r="17" fill="#f39c12"/><path d="M36 85 Q49 73 62 85" fill="none" stroke="#102a43" stroke-width="3"/><text x="31" y="124" class="gen-svg-label">元画像 A</text>
                    <path d="M89 70 H118" stroke="#627d98" stroke-width="2" marker-end="url(#gen-aug-arrow)"/>
                    <rect x="126" y="15" width="55" height="55" rx="6" fill="#d6ecfa" stroke="#2780b8"/><circle cx="153" cy="41" r="13" fill="#f39c12"/><text x="139" y="87" class="gen-svg-note">Flip</text>
                    <rect x="198" y="15" width="55" height="55" rx="6" fill="#d6ecfa" stroke="#2780b8"/><circle cx="236" cy="42" r="18" fill="#f39c12"/><text x="209" y="87" class="gen-svg-note">Crop</text>
                    <rect x="270" y="15" width="55" height="55" rx="6" fill="#fef3c7" stroke="#f39c12"/><circle cx="297" cy="41" r="13" fill="#f8c471"/><text x="275" y="87" class="gen-svg-note">Brightness</text>
                    <text x="140" y="115" class="gen-svg-label">すべてラベル A</text><text x="132" y="133" class="gen-svg-note">意味を壊す変換は使わない</text>
                </svg>
                <div class="gen-card-caption">画像の位置・見え方を少し変えて別の訓練例を作る。変換後も正解が変わらないことが前提。</div>
            </div>
            <div class="gen-card">
                <strong>Random Erasing：一部を隠す</strong>
                <svg class="gen-mini-svg" viewBox="0 0 340 145" role="img" aria-label="画像の一部を矩形で隠して遮蔽に強くするRandom Erasing">
                    <rect x="48" y="25" width="92" height="92" rx="8" fill="#d6ecfa" stroke="#2780b8"/><circle cx="94" cy="64" r="24" fill="#f39c12"/><path d="M74 94 Q94 76 114 94" fill="none" stroke="#102a43" stroke-width="4"/><text x="62" y="137" class="gen-svg-note">元画像・ラベルA</text>
                    <path d="M151 71 H190" stroke="#627d98" stroke-width="2" marker-end="url(#gen-aug-arrow)"/>
                    <rect x="200" y="25" width="92" height="92" rx="8" fill="#d6ecfa" stroke="#2780b8"/><circle cx="246" cy="64" r="24" fill="#f39c12"/><path d="M226 94 Q246 76 266 94" fill="none" stroke="#102a43" stroke-width="4"/><rect x="242" y="42" width="43" height="38" fill="#334e68" opacity="0.9"/><text x="210" y="137" class="gen-svg-note">一部を消す・ラベルA</text>
                </svg>
                <div class="gen-card-caption">特定部分だけに依存せず、遮蔽されても残りから判断する力を鍛える。</div>
            </div>
            <div class="gen-card">
                <strong>RandAugment：個数N・強度M</strong>
                <svg class="gen-mini-svg" viewBox="0 0 340 145" role="img" aria-label="変換候補からN個を選び共通強度Mで適用するRandAugment">
                    <rect x="10" y="17" width="118" height="105" rx="9" fill="#f8fafc" stroke="#9fb3c8"/><text x="36" y="38" class="gen-svg-label">変換の候補例</text>
                    <g fill="#eef7fb" stroke="#2780b8"><rect x="22" y="49" width="42" height="23" rx="4"/><rect x="72" y="49" width="42" height="23" rx="4"/><rect x="22" y="82" width="42" height="23" rx="4"/><rect x="72" y="82" width="42" height="23" rx="4"/></g>
                    <text x="32" y="65" class="gen-svg-mini">Flip</text><text x="81" y="65" class="gen-svg-mini">Crop</text><text x="29" y="98" class="gen-svg-mini">Rotate</text><text x="78" y="98" class="gen-svg-mini">Color</text>
                    <path d="M135 70 H168" stroke="#627d98" stroke-width="2" marker-end="url(#gen-aug-arrow)"/>
                    <rect x="176" y="25" width="65" height="90" rx="9" fill="#fff8e7" stroke="#f39c12"/><text x="189" y="48" class="gen-svg-label">① 個数</text><text x="195" y="74" class="gen-svg-title">N=2</text><text x="184" y="99" class="gen-svg-note">2種類を選ぶ</text>
                    <path d="M247 70 H271" stroke="#627d98" stroke-width="2" marker-end="url(#gen-aug-arrow)"/>
                    <rect x="278" y="37" width="52" height="66" rx="8" fill="#eafaf1" stroke="#27ae60"/><text x="287" y="59" class="gen-svg-label">② 強さ</text><text x="289" y="84" class="gen-svg-title">M</text>
                </svg>
                <div class="gen-card-caption"><strong>N = Number（個数）</strong>、<strong>M = Magnitude（強さ）</strong>。1枚の画像にN種類の変換を選び、それぞれをMレベルの強さで順番にかける。</div>
            </div>
            <div class="gen-card">
                <strong>MixUp：入力もラベルも混ぜる</strong>
                <svg class="gen-mini-svg" viewBox="0 0 340 145" role="img" aria-label="2つの入力とラベルを同じ比率で混ぜるMixUp">
                    <circle cx="49" cy="55" r="30" fill="#63c5da" opacity="0.9"/><text x="41" y="60" class="gen-svg-label">A</text>
                    <text x="84" y="60" class="gen-svg-title">＋</text>
                    <circle cx="125" cy="55" r="30" fill="#e05d5d" opacity="0.9"/><text x="117" y="60" class="gen-svg-label">B</text>
                    <path d="M160 55 H194" stroke="#627d98" stroke-width="2" marker-end="url(#gen-aug-arrow)"/>
                    <circle cx="234" cy="55" r="34" fill="#8f8fd3" opacity="0.9"/><text x="216" y="60" class="gen-svg-label">A＋B</text>
                    <text x="35" y="108" class="gen-svg-note">入力：x̃=λxA+(1−λ)xB</text><text x="178" y="108" class="gen-svg-note">ラベル：ỹ=λyA+(1−λ)yB</text>
                    <text x="96" y="131" class="gen-svg-label">同じλで両方を混ぜる</text>
                </svg>
                <div class="gen-card-caption">画像は画素、自然言語では埋め込み・隠れ表現などを混ぜる。決定境界を滑らかにする。</div>
            </div>
        </div>

        <div class="gen-table-wrap">
            <table class="gen-table gen-compact-terms">
                <tr><th>手法</th><th>何をする？</th><th>手法</th><th>何をする？</th></tr>
                <tr><td>Flip</td><td>画像を反転する。画像分類では左右反転が代表。</td><td>Erase</td><td>一部を矩形で隠し、見えない状況にも強くする。</td></tr>
                <tr><td>Crop</td><td>画像の一部を切り出し、位置や構図を変える。</td><td>Contrast</td><td>明るい所と暗い所の<strong>差</strong>を変える。</td></tr>
                <tr><td>Brightness</td><td>画像<strong>全体の明るさ</strong>を変える。</td><td>Rotate</td><td>画像を少し回転する。</td></tr>
                <tr><td>ノイズ付与</td><td>画素値を少しランダムに揺らす。ぼかすGaussian Filterとは別。</td><td colspan="2"><strong>共通ルール：</strong>見た目だけを変え、正解ラベルは変えない。</td></tr>
            </table>
        </div>
        <div class="gen-note">
            <strong>RandAugmentを2手で考える：</strong><br>
            ① 候補から<strong>N種類</strong>をランダムに選ぶ → ② 選んだ変換を<strong>Mレベルの強さ</strong>で適用する。<br>
            <strong>例：</strong>N=2なら「Rotate＋Brightness」のように2種類を選ぶ。Mを大きくすると、回転角や明るさの変化をより強くする。Nは画像枚数や学習回数ではない。
        </div>

        <div class="gen-table-wrap">
            <table class="gen-table">
                <tr><th>対象</th><th>シラバスの手法</th><th>見分け方</th></tr>
                <tr><td><strong>画像</strong></td><td>ノイズ付与、Random Flip／Erase／Crop／Contrast／Brightness／Rotate、RandAugment、MixUp</td><td>ラベル不変を守る。MixUpだけはラベルも混合。</td></tr>
                <tr><td><strong>自然言語</strong></td><td>EDA、MixUp</td><td>EDA＝同義語置換・ランダム挿入・交換・削除。意味を壊さない。</td></tr>
            </table>
        </div>

        <h3>■ 正規化：平均・分散を「どこから取るか」</h3>
        <p>4手法は共通して、対象集合の平均・分散で標準化し、学習可能な $\\gamma,\\beta$ で尺度を戻します。</p>
        <div class="gen-formula">$\\displaystyle \\hat{x}=\\frac{x-\\mu}{\\sqrt{\\sigma^2+\\varepsilon}},\\qquad y=\\gamma\\hat{x}+\\beta$</div>
        <div class="gen-table-wrap">
            <table class="gen-table gen-symbol-table">
                <tr><th>表記</th><th>文字の意味</th><th>具体例</th></tr>
                <tr>
                    <td><strong>NCHW</strong><br>CNNの画像</td>
                    <td><strong>N</strong>：Batch（同時に処理する画像の枚数）<br><strong>C</strong>：Channel（RGBの色、途中の層では特徴マップ数）<br><strong>H</strong>：Height（高さ）　<strong>W</strong>：Width（幅）</td>
                    <td><strong>(8, 3, 32, 32)</strong><br>32×32のRGB画像が8枚</td>
                </tr>
                <tr>
                    <td><strong>NLD</strong><br>Transformerの系列</td>
                    <td><strong>N</strong>：文章数　<strong>L</strong>：Length（トークン数）<br><strong>D</strong>：Dimension（各トークンを表す特徴・埋め込みの数）</td>
                    <td><strong>(2, 4, 8)</strong><br>2文×4トークン、各トークンは8特徴</td>
                </tr>
            </table>
        </div>
        <div class="gen-core"><strong>D方向とは：</strong>1つのトークンを表すD個の数値を横に見ること。TransformerのLayer Normは、他の文章Nや他のトークンLとは混ぜず、<strong>各トークンごとにD個の特徴から平均・分散</strong>を求めます。Dは層の深さではありません。</div>
        <div class="gen-visual-wrap">
            <div class="gen-visual-card">
                <svg class="gen-wide-svg" viewBox="0 0 960 300" role="img" aria-label="CNNのNCHWと系列のNLDでBatch Layer Instance Group Normalizationが統計を取る範囲を比較する図">
                    <text x="18" y="26" class="gen-svg-title">どこをまとめる？ BN・IN・GNはNCHW、LNは系列NLDの代表例</text>
                    <rect x="18" y="48" width="220" height="220" rx="11" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="72" y="75" class="gen-svg-title">Batch Norm</text><text x="61" y="96" class="gen-svg-note">Cごとに N・H・W を集計</text>
                    <g stroke="#b8c7d6"><rect x="50" y="116" width="35" height="28" fill="#63c5da"/><rect x="90" y="116" width="35" height="28" fill="#f8fafc"/><rect x="130" y="116" width="35" height="28" fill="#f8fafc"/><rect x="170" y="116" width="35" height="28" fill="#f8fafc"/><rect x="50" y="150" width="35" height="28" fill="#63c5da"/><rect x="90" y="150" width="35" height="28" fill="#f8fafc"/><rect x="130" y="150" width="35" height="28" fill="#f8fafc"/><rect x="170" y="150" width="35" height="28" fill="#f8fafc"/><rect x="50" y="184" width="35" height="28" fill="#63c5da"/><rect x="90" y="184" width="35" height="28" fill="#f8fafc"/><rect x="130" y="184" width="35" height="28" fill="#f8fafc"/><rect x="170" y="184" width="35" height="28" fill="#f8fafc"/></g>
                    <text x="52" y="235" class="gen-svg-label">バッチ依存</text><text x="52" y="251" class="gen-svg-note">CNN・大きめbatch</text>

                    <rect x="252" y="48" width="220" height="220" rx="11" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/>
                    <text x="312" y="75" class="gen-svg-title">Layer Norm</text><text x="288" y="96" class="gen-svg-note">各トークンのD個の特徴を集計</text>
                    <g stroke="#b8c7d6"><rect x="284" y="116" width="35" height="28" fill="#f8fafc"/><rect x="324" y="116" width="35" height="28" fill="#f8fafc"/><rect x="364" y="116" width="35" height="28" fill="#f8fafc"/><rect x="404" y="116" width="35" height="28" fill="#f8fafc"/><rect x="284" y="150" width="35" height="28" fill="#8dd3a8"/><rect x="324" y="150" width="35" height="28" fill="#8dd3a8"/><rect x="364" y="150" width="35" height="28" fill="#8dd3a8"/><rect x="404" y="150" width="35" height="28" fill="#8dd3a8"/><rect x="284" y="184" width="35" height="28" fill="#f8fafc"/><rect x="324" y="184" width="35" height="28" fill="#f8fafc"/><rect x="364" y="184" width="35" height="28" fill="#f8fafc"/><rect x="404" y="184" width="35" height="28" fill="#f8fafc"/></g>
                    <text x="286" y="235" class="gen-svg-label">バッチ非依存</text><text x="286" y="251" class="gen-svg-note">RNN・Transformer</text>

                    <rect x="486" y="48" width="220" height="220" rx="11" fill="#f4ecf7" stroke="#8e44ad" stroke-width="2"/>
                    <text x="538" y="75" class="gen-svg-title">Instance Norm</text><text x="520" y="96" class="gen-svg-note">各N・各Cの H・W を集計</text>
                    <rect x="535" y="116" width="122" height="96" rx="6" fill="#d9c2f0" stroke="#8e44ad"/><path d="M565 116 V212 M596 116 V212 M627 116 V212 M535 148 H657 M535 180 H657" stroke="#fff"/>
                    <text x="520" y="235" class="gen-svg-label">画像・チャネル単位</text><text x="520" y="251" class="gen-svg-note">スタイル変換</text>

                    <rect x="720" y="48" width="222" height="220" rx="11" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                    <text x="779" y="75" class="gen-svg-title">Group Norm</text><text x="751" y="96" class="gen-svg-note">CをG組に分け、組内C・H・W</text>
                    <g stroke="#fff"><rect x="754" y="118" width="36" height="94" fill="#f8c471"/><rect x="790" y="118" width="36" height="94" fill="#f8c471"/><rect x="826" y="118" width="36" height="94" fill="#82e0aa"/><rect x="862" y="118" width="36" height="94" fill="#82e0aa"/></g>
                    <path d="M750 111 H828 M828 111 H902" stroke="#f39c12" stroke-width="3"/><text x="766" y="108" class="gen-svg-mini">group 1</text><text x="846" y="108" class="gen-svg-mini">group 2</text>
                    <text x="752" y="235" class="gen-svg-label">バッチ非依存</text><text x="752" y="251" class="gen-svg-note">小batchのCNN</text>
                </svg>
            </div>
            <div class="gen-visual-caption"><strong>軸で見分ける：</strong>BNはCを1つ固定し、そのCについてN・H・Wから統計を取る。TransformerのLNは各トークンを1つ固定し、そのD個の特徴から統計を取る。</div>
        </div>

        <div class="gen-table-wrap">
            <table class="gen-table">
                <tr><th>手法</th><th>統計を取る範囲</th><th>試験で返す一言</th></tr>
                <tr><td><strong>Batch Norm</strong></td><td>CごとにN,H,W</td><td>学習時はバッチ統計、推論時は保存した移動平均。小バッチに弱い。</td></tr>
                <tr><td><strong>Layer Norm</strong></td><td>各トークンごとのD個の特徴</td><td>他のN・Lとは混ぜない。バッチ非依存。RNN・Transformer。</td></tr>
                <tr><td><strong>Instance Norm</strong></td><td>各画像・各CのH,W</td><td>画像ごとのコントラストを正規化。スタイル変換。</td></tr>
                <tr><td><strong>Group Norm</strong></td><td>各画像でCをG群に分け、群内C,H,W</td><td>バッチ非依存。小バッチのCNN。</td></tr>
            </table>
        </div>

        <h3>■ アンサンブル：複数モデルをどう組み合わせる？</h3>
        <div class="gen-visual-wrap">
            <div class="gen-visual-card">
                <svg class="gen-wide-svg" viewBox="0 0 960 330" role="img" aria-label="Bagging Boosting Stackingの学習フローを比較する図">
                    <defs><marker id="gen-ens-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <rect x="15" y="15" width="930" height="89" rx="10" fill="#eef7fb" stroke="#2780b8"/>
                    <text x="30" y="39" class="gen-svg-title">Bagging：Bootstrap標本で独立・並列</text>
                    <rect x="31" y="55" width="70" height="30" rx="5" fill="#fff" stroke="#2780b8"/><text x="42" y="74" class="gen-svg-note">元データD</text>
                    <path d="M105 70 H145" stroke="#627d98" stroke-width="2" marker-end="url(#gen-ens-arrow)"/>
                    <g fill="#fff" stroke="#27ae60"><rect x="153" y="48" width="64" height="22" rx="4"/><rect x="153" y="74" width="64" height="22" rx="4"/></g><text x="164" y="63" class="gen-svg-mini">Bootstrap D1</text><text x="164" y="89" class="gen-svg-mini">Bootstrap D2</text>
                    <path d="M222 59 H263 M222 85 H263" stroke="#627d98" marker-end="url(#gen-ens-arrow)"/>
                    <g fill="#fff" stroke="#2780b8"><rect x="271" y="48" width="64" height="22" rx="4"/><rect x="271" y="74" width="64" height="22" rx="4"/></g><text x="284" y="63" class="gen-svg-mini">Model 1</text><text x="284" y="89" class="gen-svg-mini">Model 2</text>
                    <path d="M340 59 L391 70 M340 85 L391 73" stroke="#627d98" marker-end="url(#gen-ens-arrow)"/>
                    <rect x="399" y="54" width="92" height="34" rx="6" fill="#eafaf1" stroke="#27ae60"/><text x="416" y="75" class="gen-svg-note">平均／多数決</text>
                    <text x="532" y="68" class="gen-svg-label">主に分散を下げる</text><text x="532" y="87" class="gen-svg-note">同じ学習器の不安定さを平均する</text>

                    <rect x="15" y="119" width="930" height="89" rx="10" fill="#fff8e7" stroke="#f39c12"/>
                    <text x="30" y="143" class="gen-svg-title">Boosting：前の誤りを次が学ぶ・逐次</text>
                    <rect x="48" y="157" width="72" height="32" rx="5" fill="#fff" stroke="#f39c12"/><text x="64" y="177" class="gen-svg-note">Model 1</text>
                    <path d="M124 173 H185" stroke="#e67e22" stroke-width="2" marker-end="url(#gen-ens-arrow)"/><text x="137" y="165" class="gen-svg-mini">誤りを重視</text>
                    <rect x="193" y="157" width="72" height="32" rx="5" fill="#fff" stroke="#f39c12"/><text x="209" y="177" class="gen-svg-note">Model 2</text>
                    <path d="M269 173 H330" stroke="#e67e22" stroke-width="2" marker-end="url(#gen-ens-arrow)"/><text x="282" y="165" class="gen-svg-mini">残差を学習</text>
                    <rect x="338" y="157" width="72" height="32" rx="5" fill="#fff" stroke="#f39c12"/><text x="354" y="177" class="gen-svg-note">Model 3</text>
                    <path d="M414 173 H455" stroke="#627d98" marker-end="url(#gen-ens-arrow)"/>
                    <rect x="463" y="157" width="79" height="32" rx="5" fill="#f9e79f" stroke="#d4ac0d"/><text x="481" y="177" class="gen-svg-note">加重和</text>
                    <text x="575" y="169" class="gen-svg-label">弱学習器を強いモデルへ</text><text x="575" y="188" class="gen-svg-note">ノイズ・外れ値へ過度に合わせないよう注意</text>

                    <rect x="15" y="223" width="930" height="92" rx="10" fill="#f4ecf7" stroke="#8e44ad"/>
                    <text x="30" y="247" class="gen-svg-title">Stacking：異なるモデルの予測をメタモデルが学ぶ</text>
                    <g fill="#fff" stroke="#8e44ad"><rect x="43" y="260" width="74" height="22" rx="4"/><rect x="43" y="286" width="74" height="22" rx="4"/></g><text x="58" y="275" class="gen-svg-mini">Model A</text><text x="58" y="301" class="gen-svg-mini">Model B</text>
                    <path d="M122 271 L194 282 M122 297 L194 285" stroke="#627d98" marker-end="url(#gen-ens-arrow)"/>
                    <rect x="202" y="266" width="105" height="36" rx="6" fill="#fff" stroke="#8e44ad"/><text x="218" y="280" class="gen-svg-mini">Out-of-Fold予測</text><text x="227" y="295" class="gen-svg-mini">リークを防ぐ</text>
                    <path d="M312 284 H359" stroke="#627d98" marker-end="url(#gen-ens-arrow)"/>
                    <rect x="367" y="266" width="94" height="36" rx="6" fill="#f9e79f" stroke="#d4ac0d"/><text x="382" y="288" class="gen-svg-note">Meta Model</text>
                    <path d="M466 284 H506" stroke="#627d98" marker-end="url(#gen-ens-arrow)"/>
                    <rect x="514" y="266" width="72" height="36" rx="6" fill="#eafaf1" stroke="#27ae60"/><text x="532" y="288" class="gen-svg-note">予測</text>
                    <text x="624" y="279" class="gen-svg-label">各モデルの得意分野を再学習</text><text x="624" y="298" class="gen-svg-note">学習データ上の予測をそのまま使わない</text>
                </svg>
            </div>
            <div class="gen-visual-caption"><strong>BootstrapとBaggingは別：</strong>Bootstrapは「復元抽出でデータを作る操作」、Baggingは「その標本で複数モデルを学習し統合する方法」です。</div>
        </div>

        <div class="gen-table-wrap">
            <table class="gen-table">
                <tr><th>手法</th><th>学習順</th><th>最終予測</th><th>一言</th></tr>
                <tr><td><strong>Bagging</strong></td><td>独立・並列</td><td>平均／多数決</td><td>Bootstrapを使い、主に分散を下げる。</td></tr>
                <tr><td><strong>Boosting</strong></td><td>逐次</td><td>加重和</td><td>前の誤り・残差を次が学ぶ。</td></tr>
                <tr><td><strong>Stacking</strong></td><td>ベース → メタ</td><td>メタモデル</td><td>複数モデルの予測を新しい特徴として学ぶ。</td></tr>
            </table>
        </div>

        <h3>■ ハイパーパラメータ：何を選び、どう探す？</h3>
        <div class="gen-table-wrap">
            <table class="gen-table">
                <tr><th>設定</th><th>小さすぎる／少なすぎる</th><th>大きすぎる／多すぎる</th></tr>
                <tr><td><strong>学習率</strong></td><td>収束が遅い、停滞</td><td>振動・発散</td></tr>
                <tr><td><strong>隠れ層・ユニット数</strong></td><td>表現力不足・過少適合</td><td>計算増・過学習リスク</td></tr>
                <tr><td><strong>Dropout率</strong></td><td>正則化が弱い</td><td>情報を消しすぎて過少適合</td></tr>
                <tr><td><strong>バッチサイズ</strong></td><td>勾配ノイズ大・メモリ小</td><td>勾配安定・メモリ大。汎化差は条件依存</td></tr>
            </table>
        </div>

        <div class="gen-visual-wrap">
            <div class="gen-visual-card">
                <svg class="gen-wide-svg" viewBox="0 0 960 270" role="img" aria-label="Grid Search Random Search Bayesian Optimizationの候補選択方法を比較する図">
                    <rect x="20" y="18" width="286" height="220" rx="11" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="96" y="46" class="gen-svg-title">Grid Search</text><text x="78" y="66" class="gen-svg-note">指定した全組合せを試す</text>
                    <g stroke="#d7e2ec"><path d="M69 87 V195 M111 87 V195 M153 87 V195 M195 87 V195 M237 87 V195 M48 103 H258 M48 134 H258 M48 165 H258 M48 196 H258"/></g>
                    <g fill="#2780b8"><circle cx="69" cy="103" r="5"/><circle cx="111" cy="103" r="5"/><circle cx="153" cy="103" r="5"/><circle cx="195" cy="103" r="5"/><circle cx="237" cy="103" r="5"/><circle cx="69" cy="134" r="5"/><circle cx="111" cy="134" r="5"/><circle cx="153" cy="134" r="5"/><circle cx="195" cy="134" r="5"/><circle cx="237" cy="134" r="5"/><circle cx="69" cy="165" r="5"/><circle cx="111" cy="165" r="5"/><circle cx="153" cy="165" r="5"/><circle cx="195" cy="165" r="5"/><circle cx="237" cy="165" r="5"/><circle cx="69" cy="196" r="5"/><circle cx="111" cy="196" r="5"/><circle cx="153" cy="196" r="5"/><circle cx="195" cy="196" r="5"/><circle cx="237" cy="196" r="5"/></g>
                    <text x="80" y="222" class="gen-svg-label">確実だが組合せ爆発</text>

                    <rect x="337" y="18" width="286" height="220" rx="11" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/>
                    <text x="402" y="46" class="gen-svg-title">Random Search</text><text x="400" y="66" class="gen-svg-note">空間から無作為に試す</text>
                    <rect x="375" y="85" width="210" height="116" rx="5" fill="#fff" stroke="#b7e4c7"/>
                    <g fill="#27ae60"><circle cx="393" cy="180" r="6"/><circle cx="416" cy="105" r="6"/><circle cx="450" cy="152" r="6"/><circle cx="483" cy="96" r="6"/><circle cx="508" cy="187" r="6"/><circle cx="547" cy="126" r="6"/><circle cx="568" cy="168" r="6"/><circle cx="530" cy="148" r="6"/></g>
                    <text x="385" y="222" class="gen-svg-label">高次元・試行回数固定に強い</text>

                    <rect x="654" y="18" width="286" height="220" rx="11" fill="#f4ecf7" stroke="#8e44ad" stroke-width="2"/>
                    <text x="710" y="46" class="gen-svg-title">Bayesian Optimization</text><text x="704" y="66" class="gen-svg-note">過去の結果から次候補を選ぶ</text>
                    <path d="M691 192 H910 M694 195 V88" fill="none" stroke="#b8c7d6"/>
                    <path d="M698 178 Q735 148 762 160 T820 116 T874 142 T905 92" fill="none" stroke="#8e44ad" stroke-width="3"/>
                    <g fill="#8e44ad"><circle cx="720" cy="160" r="5"/><circle cx="770" cy="157" r="5"/><circle cx="823" cy="116" r="5"/></g>
                    <path d="M828 110 Q858 81 888 112" fill="none" stroke="#f39c12" stroke-width="2" stroke-dasharray="5,3"/><circle cx="888" cy="131" r="8" fill="#f39c12"/><text x="848" y="88" class="gen-svg-note">獲得関数で次へ</text>
                    <text x="699" y="222" class="gen-svg-label">1回の評価が高価な場合</text>
                </svg>
            </div>
            <div class="gen-visual-caption"><strong>使い分け：</strong>Grid＝全候補、Random＝無作為、Bayes＝履歴から次を選ぶ。性能の比較には検証データを使い、テストデータは最後まで触りません。</div>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="gen-table-wrap">
            <table class="gen-table">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>入力とラベルを同じ比率で混ぜる</td><td><strong>MixUp</strong></td><td>入力間を補間し、決定境界を滑らかにする。</td></tr>
                <tr><td>N＝変換数、M＝共通の強さ</td><td><strong>RandAugment</strong></td><td>変換の組合せ探索をNとMへ単純化する。</td></tr>
                <tr><td>NCHWでCを固定し、N・H・Wを集計</td><td><strong>BN（Batch Normalization）</strong></td><td>バッチ統計を使うため小バッチでは不安定になりやすい。</td></tr>
                <tr><td>NLDで各トークンのD特徴を集計</td><td><strong>LN（Layer Normalization）</strong></td><td>他の文やトークンと混ぜず、バッチに依存しない。</td></tr>
                <tr><td>各画像・各チャネルのH・Wを集計</td><td><strong>IN（Instance Normalization）</strong></td><td>画像ごとのコントラストを整え、スタイル変換で使われる。</td></tr>
                <tr><td>小バッチCNN・チャネルを群分け</td><td><strong>GN（Group Normalization）</strong></td><td>各画像内のグループで統計を取り、バッチに依存しない。</td></tr>
                <tr><td>元データから復元抽出</td><td><strong>Bootstrap</strong></td><td>同じ標本が複数回選ばれることがある。</td></tr>
                <tr><td>独立・並列に学習して平均／投票</td><td><strong>Bagging（Bootstrap Aggregating）</strong></td><td>複数モデルを統合し、主に分散を下げる。</td></tr>
                <tr><td>前の誤りを次が重点的に修正</td><td><strong>Boosting</strong></td><td>弱学習器を逐次的に加えて予測を改善する。</td></tr>
                <tr><td>複数モデルの予測をメタモデルへ</td><td><strong>Stacking</strong></td><td>予測値を新しい特徴として統合方法も学習する。</td></tr>
                <tr><td>過去の評価から次候補を選ぶ</td><td><strong>Bayesian Optimization</strong></td><td>1回の評価が高価な探索で試行を節約する。</td></tr>
                <tr><td>設定選択／最後の性能確認</td><td><strong>Validation／Test</strong></td><td>検証データで選び、テストデータは最終評価だけに使う。</td></tr>
            </table>
        </div>
    `,

    questions: [
        {
            id: "gen-augmentation-purpose",
            category: "データ拡張",
            difficulty: "基礎",
            question: "データ拡張の基本原則として最も適切なものはどれか。",
            options: ["ラベルの意味を保つ範囲で入力を変換し、訓練例の多様性を増やす", "テストデータへ正解ラベルを追加する", "モデルの重みを複製する", "全入力を平均0に固定する"],
            answer: 0,
            explanation: "データ拡張は、正解の意味が変わらない変換で訓練データの多様性を増やします。意味を壊す変換は誤った教師信号になります。"
        },
        {
            id: "gen-noise-augmentation",
            category: "画像データ拡張",
            difficulty: "基礎",
            question: "訓練画像へ小さなランダムノイズを加える主な狙いはどれか。",
            options: ["画素の小さな揺らぎに対する頑健性を高める", "画像のクラス数を減らす", "推論時の計算量を必ず半分にする", "画像を正規分布へ厳密に変換する"],
            answer: 0,
            explanation: "ノイズ付与により、微小な入力変化で予測が崩れにくいモデルを促します。ラベルを保てる強さに抑える必要があります。"
        },
        {
            id: "gen-label-breaking-transform",
            category: "画像データ拡張",
            difficulty: "標準",
            question: "数字6の画像を180度回転すると9に見えるデータで、元ラベル6のまま学習する問題点はどれか。",
            options: ["変換によりラベルの意味が変わり、誤った教師データになる", "回転は必ず計算できない", "画像のチャネル数が増える", "Batch Normが無効になる"],
            answer: 0,
            explanation: "データ拡張はタスク固有のラベル不変性を確認します。一般画像で有効な回転でも、数字認識では意味を変える場合があります。"
        },
        {
            id: "gen-random-erasing",
            category: "Random Erasing",
            difficulty: "基礎",
            question: "Random Erasingの説明として正しいものはどれか。",
            options: ["画像のランダムな矩形領域を隠し、遮蔽に頑健な特徴を学ばせる", "画像全体を学習集合から削除する", "ラベルの一部を0にする", "複数モデルを逐次学習する"],
            answer: 0,
            explanation: "一部が見えない訓練例を作ることで、モデルが特定の局所特徴だけに依存するのを抑えます。"
        },
        {
            id: "gen-randaugment-nm",
            category: "RandAugment",
            difficulty: "基礎",
            question: "RandAugmentで主に指定する2つの量はどれか。",
            options: ["適用する変換数Nと共通の変換強度M", "クラス数Cとバッチ数N", "学習率とMomentum", "平均と分散"],
            answer: 0,
            explanation: "NはNumber（個数）、MはMagnitude（強さ）です。候補群からN種類を選び、それぞれをMレベルの強さで適用します。"
        },
        {
            id: "gen-randaugment-interpretation",
            category: "RandAugment",
            difficulty: "標準",
            question: "RandAugmentでN=2としたときの意味として最も適切なものはどれか。",
            options: ["候補変換から原則2種類を選んで適用する", "各画像を2クラスへ分類する", "画像を必ず2倍に拡大する", "2エポックだけ学習する"],
            answer: 0,
            explanation: "Nは1枚の画像へかける変換の個数です。N=2なら、RotateとBrightnessなど2種類を選びます。画像を2枚作る、2回学習するという意味ではありません。"
        },
        {
            id: "gen-randaugment-magnitude",
            category: "RandAugment",
            difficulty: "標準",
            question: "RandAugmentのMを大きくしたとき、一般に何が変わるか。",
            options: ["回転角や明るさ変更など、選ばれた変換をより強くかける", "1枚に適用する変換の個数だけが増える", "画像のクラス数が増える", "バッチサイズが大きくなる"],
            answer: 0,
            explanation: "MはMagnitude、つまり強さのレベルです。Rotateなら回転角、Brightnessなら明るさの変化量というように、各変換に応じた強さへ対応します。"
        },
        {
            id: "gen-mixup-definition",
            category: "MixUp",
            difficulty: "基礎",
            question: "MixUpの正しい処理はどれか。",
            options: ["2入力を重み付き加算し、ラベルも同じ比率で混ぜる", "画像の一部を黒く塗るだけ", "複数モデルを多数決する", "ラベルだけをランダムに交換する"],
            answer: 0,
            explanation: "$\\tilde{x}=\\lambda x_A+(1-\\lambda)x_B$ と $\\tilde{y}=\\lambda y_A+(1-\\lambda)y_B$ を同じ $\\lambda$ で作ります。"
        },
        {
            id: "gen-mixup-label-calc",
            category: "MixUp（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "MixUpで $\\lambda=0.7$、$y_A=[1,0]$、$y_B=[0,1]$ のとき、混合ラベルはどれか。",
            options: ["$[0.7,0.3]$", "$[0.3,0.7]$", "$[1,1]$", "$[0.5,0.5]$"],
            answer: 0,
            explanation: "$0.7[1,0]+0.3[0,1]=[0.7,0.3]$ です。入力と教師ラベルを同じ比率で混ぜます。"
        },
        {
            id: "gen-mixup-input-calc",
            category: "MixUp（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "1次元入力 $x_A=2$, $x_B=8$ を $\\lambda=0.25$ でMixUpした $\\tilde{x}$ はいくつか。",
            options: ["$6.5$", "$3.5$", "$5.0$", "$10.0$"],
            answer: 0,
            explanation: "$\\tilde{x}=0.25\\times2+0.75\\times8=0.5+6=6.5$ です。$1-\\lambda$ を忘れないようにします。"
        },
        {
            id: "gen-nlp-eda",
            category: "自然言語データ拡張",
            difficulty: "基礎",
            question: "EDA（Easy Data Augmentation）の代表的な操作の組合せはどれか。",
            options: ["同義語置換・ランダム挿入・交換・削除", "回転・切り抜き・明るさ変更", "時間マスク・周波数マスク", "平均・分散・共分散の計算"],
            answer: 0,
            explanation: "EDAは単語レベルの簡単な4操作で文を変形します。文意やラベルを壊さない強さが重要です。"
        },
        {
            id: "gen-nlp-mixup",
            category: "自然言語MixUp",
            difficulty: "応用",
            question: "自然言語でMixUpを適用する考え方として最も適切なものはどれか。",
            options: ["離散的な文字列そのものではなく、埋め込みや隠れ表現とラベルを混ぜる", "2文の文字を必ず1文字ずつ交互に並べる", "単語をすべて削除する", "テスト文を訓練文へ追加する"],
            answer: 0,
            explanation: "トークン列は離散値なので、連続値であるEmbeddingや中間表現でMixUpする考え方が一般的です。"
        },
        {
            id: "gen-augmentation-train-only",
            category: "データ拡張の適用範囲",
            difficulty: "標準",
            question: "通常の学習用データ拡張を適用する集合として最も適切なものはどれか。",
            options: ["訓練データ", "テストデータだけ", "検証・テストの正解ラベル", "全データへ同じランダム変換を固定"],
            answer: 0,
            explanation: "学習用Augmentationは訓練データに適用します。検証・テストは原則として同じ評価条件を保ちます。"
        },
        {
            id: "gen-normalization-common-formula",
            category: "正規化",
            difficulty: "基礎",
            question: "BN・LN・IN・GNの主な違いはどれか。",
            options: ["平均・分散を計算する要素の範囲", "使う損失関数の種類", "出力クラス数", "勾配を計算するかどうか"],
            answer: 0,
            explanation: "標準化と $\\gamma,\\beta$ による変換は共通で、どの軸・要素をまとめて統計を取るかが異なります。"
        },
        {
            id: "gen-bn-training-inference",
            category: "Batch Normalization",
            difficulty: "基礎",
            question: "Batch Normalizationの統計量の使い分けとして正しいものはどれか。",
            options: ["学習時はミニバッチ統計、推論時は学習中に保存した移動平均・分散", "常に現在の1サンプルだけ", "学習時はテスト統計、推論時は訓練統計", "推論時は正規化しない"],
            answer: 0,
            explanation: "推論時に入力バッチへ依存しないよう、学習中に蓄積したrunning mean/varianceを使います。"
        },
        {
            id: "gen-bn-axes-nchw",
            category: "Batch Normalization（軸）",
            difficulty: "標準",
            question: "CNNのNCHW形式における通常のBatch Normalizationは、各チャネルCについて主にどの軸から平均・分散を求めるか。",
            options: ["N・H・W", "Cだけ", "Nだけ", "Hだけ"],
            answer: 0,
            explanation: "N=画像枚数、C=チャネル、H=高さ、W=幅です。BNはCを1つ固定し、そのチャネルのN,H,W全体から平均・分散を求めます。"
        },
        {
            id: "gen-bn-mean-var-calc",
            category: "Batch Normalization（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "1特徴のミニバッチ値が $[1,3]$ のとき、Batch Normで使う平均と分散（$m$で割る）はどれか。",
            options: ["平均2、分散1", "平均2、分散2", "平均4、分散1", "平均1、分散3"],
            answer: 0,
            explanation: "$\\mu=(1+3)/2=2$、$\\sigma^2=((1-2)^2+(3-2)^2)/2=1$ です。"
        },
        {
            id: "gen-bn-standardize-calc",
            category: "Batch Normalization（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "平均2、分散1、$\\varepsilon$を無視するとき、値 $x=3$ の標準化後 $\\hat{x}$ はいくつか。",
            options: ["1", "-1", "2", "3"],
            answer: 0,
            explanation: "$\\hat{x}=(3-2)/\\sqrt{1}=1$ です。"
        },
        {
            id: "gen-bn-gamma-beta-calc",
            category: "Batch Normalization（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$\\hat{x}=-1$、$\\gamma=2$、$\\beta=0.5$ のとき、$y=\\gamma\\hat{x}+\\beta$ はいくつか。",
            options: ["$-1.5$", "$-2.5$", "$1.5$", "$2.5$"],
            answer: 0,
            explanation: "$y=2\\times(-1)+0.5=-1.5$ です。$\\gamma,\\beta$ は学習可能なスケールとシフトです。"
        },
        {
            id: "gen-bn-small-batch",
            category: "Batch Normalization",
            difficulty: "標準",
            question: "Batch Normalizationが極端に小さいバッチで不安定になりやすい理由はどれか。",
            options: ["平均・分散の推定に使えるサンプルが少ない", "学習可能な重みが存在しない", "必ず勾配が0になる", "チャネル数が自動的に1になる"],
            answer: 0,
            explanation: "BNはバッチ統計に依存します。少数サンプルでは統計のばらつきが大きくなります。"
        },
        {
            id: "gen-layer-norm",
            category: "Layer Normalization",
            difficulty: "基礎",
            question: "TransformerでLayer Normalizationが使いやすい主な理由はどれか。",
            options: ["各サンプル・トークン内の特徴方向で正規化し、バッチサイズに依存しない", "全バッチの同じ画素だけを見る", "推論時だけ動作する", "パラメータ数を必ず半分にする"],
            answer: 0,
            explanation: "TransformerをNLDで表すと、N=文章数、L=トークン数、D=各トークンの特徴数です。LNは各トークンごとにD個の値を正規化するため、バッチ構成に依存しません。"
        },
        {
            id: "gen-layer-norm-d-axis",
            category: "Layer Normalization（軸）",
            difficulty: "標準",
            question: "TransformerのテンソルをNLD形式で表すとき、各トークンへ通常のLayer Normalizationを行う主な方向はどれか。",
            options: ["D：そのトークンを表す特徴・埋め込みの方向", "N：文章をまたぐ方向", "L：すべてのトークンを混ぜる方向", "層の深さ方向"],
            answer: 0,
            explanation: "DはDimension、各トークンを表す特徴数です。各トークンを1つ固定し、そのD個の値から平均・分散を求めます。Dはネットワークの層数ではありません。"
        },
        {
            id: "gen-instance-norm",
            category: "Instance Normalization",
            difficulty: "基礎",
            question: "Instance Normalizationの説明として正しいものはどれか。",
            options: ["各画像・各チャネルについてH,W方向を正規化し、スタイル変換などで使われる", "バッチ全体を1つにまとめる", "チャネルを複数グループへ分ける", "モデルの予測を平均する"],
            answer: 0,
            explanation: "INはNとCを固定して空間方向H,Wの統計を取ります。画像固有のコントラストを除きやすい特徴があります。"
        },
        {
            id: "gen-group-norm",
            category: "Group Normalization",
            difficulty: "基礎",
            question: "高解像度画像のためバッチサイズが1〜2しか取れないCNNで、有力な正規化手法はどれか。",
            options: ["Group Normalization", "Batch Normalizationだけ", "MixUp", "Bagging"],
            answer: 0,
            explanation: "GNは各サンプル内でチャネルをグループ化して統計を取るため、バッチサイズに依存しません。"
        },
        {
            id: "gen-normalization-not-gaussian",
            category: "正規化の誤解",
            difficulty: "応用",
            question: "Batch Normalizationについて正しい説明はどれか。",
            options: ["平均と分散を整えるが、データ分布を必ず正規分布へ変換するわけではない", "必ずガウス分布へ変換する", "$\\gamma,\\beta$は常に1と0へ固定", "推論時はバッチ統計だけを使う"],
            answer: 0,
            explanation: "標準化は平均・分散を整える操作であり、分布形状そのものをガウス分布へ変換する保証はありません。"
        },
        {
            id: "gen-bootstrap-definition",
            category: "Bootstrap",
            difficulty: "基礎",
            question: "Bootstrap標本の作り方として正しいものはどれか。",
            options: ["元データから重複を許して復元抽出する", "必ず重複なしで抽出する", "テストデータを訓練へ移す", "特徴量をランダムに0へする"],
            answer: 0,
            explanation: "抽出したサンプルを戻して再び選べるため、同じ例が複数回入り、選ばれない例も生じます。"
        },
        {
            id: "gen-bootstrap-probability",
            category: "Bootstrap（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "5件から復元抽出で5回選ぶとき、特定の1件が一度も選ばれない確率はどれか。",
            options: ["$(4/5)^5$", "$1/5$", "$(1/5)^5$", "$4/5$"],
            answer: 0,
            explanation: "1回で選ばれない確率は4/5。5回とも選ばれない確率は独立な積 $(4/5)^5$ です。"
        },
        {
            id: "gen-bootstrap-oob-limit",
            category: "Bootstrap（応用）",
            kind: "計算",
            difficulty: "応用",
            question: "N件からN回Bootstrap抽出するとき、Nが大きい場合に特定サンプルが一度も選ばれない確率は約いくつか。",
            options: ["36.8%", "63.2%", "50.0%", "0%"],
            answer: 0,
            explanation: "$(1-1/N)^N\\to e^{-1}\\approx0.368$。少なくとも1回選ばれる割合は約63.2%です。"
        },
        {
            id: "gen-bagging",
            category: "Bagging",
            difficulty: "基礎",
            question: "Baggingの説明として正しいものはどれか。",
            options: ["複数モデルを独立・並列に学習し、回帰は平均、分類は多数決などで統合する", "前の誤りを次が逐次学ぶ", "予測値をメタモデルだけで作る", "単一モデルの層を増やす"],
            answer: 0,
            explanation: "異なるBootstrap標本などで独立学習した予測を平均し、主に分散を下げます。"
        },
        {
            id: "gen-bootstrap-vs-bagging",
            category: "BootstrapとBagging",
            difficulty: "標準",
            question: "BootstrapとBaggingの関係として正しいものはどれか。",
            options: ["Bootstrapは復元抽出の操作、Baggingはその標本で複数モデルを学習・統合する手法", "両者は完全に同義", "Baggingはデータ抽出だけ", "Bootstrapは逐次学習だけ"],
            answer: 0,
            explanation: "Bootstrapはデータ集合の作成方法です。BaggingはBootstrap Aggregatingの略で、学習と予測統合まで含みます。"
        },
        {
            id: "gen-boosting",
            category: "Boosting",
            difficulty: "基礎",
            question: "Boostingの特徴はどれか。",
            options: ["弱学習器を逐次学習し、前段の誤りや残差を後段が補う", "すべてのモデルを完全に独立学習する", "学習済み予測を単純平均するだけ", "復元抽出だけ行い学習しない"],
            answer: 0,
            explanation: "Baggingが並列なのに対し、Boostingは順番に学びます。AdaBoostや勾配Boostingが代表例です。"
        },
        {
            id: "gen-bagging-boosting-risk",
            category: "BaggingとBoosting",
            difficulty: "応用",
            question: "BaggingとBoostingの傾向として最も適切なものはどれか。",
            options: ["Baggingは主に分散低減、Boostingは誤りを逐次補うがノイズへ過度に適合する場合がある", "両方とも必ず分散を増やす", "Boostingは並列処理だけ", "Baggingは前段の誤りを重視する"],
            answer: 0,
            explanation: "Baggingは不安定な予測を平均します。Boostingは難例を重視するため強力ですが、設定によって外れ値やノイズへ敏感です。"
        },
        {
            id: "gen-stacking",
            category: "Stacking",
            difficulty: "基礎",
            question: "Stackingの構造として正しいものはどれか。",
            options: ["複数のベースモデルの予測を、別のメタモデルの入力にする", "同じモデルを直列に複製する", "すべての予測を必ず単純平均する", "モデルを1つだけ選ぶ"],
            answer: 0,
            explanation: "各モデルの予測を新しい特徴量として、上位のメタモデルが組合せ方を学びます。"
        },
        {
            id: "gen-stacking-oof",
            category: "Stacking（応用）",
            difficulty: "応用",
            question: "Stackingでメタモデル用特徴としてOut-of-Fold予測を使う主な理由はどれか。",
            options: ["ベースモデルがその行を学習した上で出した過度に楽観的な予測によるリークを防ぐ", "モデル数を必ず1つにする", "テストラベルを利用する", "全予測を0へする"],
            answer: 0,
            explanation: "各行を学習に使っていないFoldのモデルで予測し、未知データに近い予測特徴をメタモデルへ渡します。"
        },
        {
            id: "gen-hyperparameter-identify",
            category: "ハイパーパラメータ",
            difficulty: "基礎",
            question: "ハイパーパラメータに該当する組合せはどれか。",
            options: ["学習率・隠れ層数・ユニット数・Dropout率・バッチサイズ", "学習後の重みとバイアスだけ", "予測ラベルと正解ラベル", "勾配と損失値だけ"],
            answer: 0,
            explanation: "重み・バイアスは学習で更新されるパラメータです。モデル構造や学習方法の設定値はハイパーパラメータです。"
        },
        {
            id: "gen-learning-rate",
            category: "学習率の調整",
            difficulty: "基礎",
            question: "学習率が大きすぎる場合に起こりやすい現象はどれか。",
            options: ["最小値の周辺を飛び越えて振動・発散する", "更新が完全に止まるだけ", "パラメータ数が自動で減る", "必ず汎化性能が上がる"],
            answer: 0,
            explanation: "歩幅が大きすぎると良い領域を通り過ぎます。小さすぎる場合は収束が非常に遅くなります。"
        },
        {
            id: "gen-capacity-tuning",
            category: "層数・ユニット数",
            difficulty: "標準",
            question: "隠れ層数やユニット数を増やしすぎた場合の一般的な注意点はどれか。",
            options: ["表現力と計算量が増え、データ量に対して過剰なら過学習しやすい", "必ず過少適合する", "学習率が0になる", "データ数が自動で増える"],
            answer: 0,
            explanation: "容量が少なすぎれば過少適合、多すぎれば計算増加と過学習のリスクがあります。検証性能で選びます。"
        },
        {
            id: "gen-dropout-rate-tuning",
            category: "Dropout率の調整",
            difficulty: "標準",
            question: "Dropout率を極端に高くした場合に起こりやすいことはどれか。",
            options: ["情報を消しすぎて学習能力が下がり、過少適合する", "正則化が弱くなる", "必ず訓練精度100%になる", "モデルの層数が増える"],
            answer: 0,
            explanation: "率が低すぎれば正則化が弱く、高すぎれば有用な信号まで消します。Dropout自体の仕組みは3-（3）で扱います。"
        },
        {
            id: "gen-grid-search",
            category: "Grid Search",
            difficulty: "基礎",
            question: "Grid Searchの説明として正しいものはどれか。",
            options: ["事前に指定した候補値の全組合せを評価する", "候補を無作為に選ぶ", "過去の結果から確率的に次候補を選ぶ", "勾配で層数を直接更新する"],
            answer: 0,
            explanation: "候補数が増えると直積で試行数が増え、組合せ爆発しやすい手法です。"
        },
        {
            id: "gen-grid-count-calc",
            category: "Grid Search（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "学習率3候補、バッチサイズ4候補、層数2候補をGrid Searchする。総試行数はいくつか。",
            options: ["24", "9", "12", "64"],
            answer: 0,
            explanation: "全組合せなので $3\\times4\\times2=24$ 回です。"
        },
        {
            id: "gen-random-search",
            category: "Random Search",
            difficulty: "基礎",
            question: "Random Searchの説明として正しいものはどれか。",
            options: ["探索空間の組合せを無作為にサンプリングして評価する", "全組合せを必ず試す", "代理モデルと獲得関数が必須", "重みをランダムに削除する"],
            answer: 0,
            explanation: "設定した試行回数だけ候補を無作為抽出できます。並列化もしやすい手法です。"
        },
        {
            id: "gen-random-search-advantage",
            category: "Random Search（応用）",
            difficulty: "応用",
            question: "重要なハイパーパラメータが一部だけの高次元探索で、Random SearchがGrid Searchより効率的になりやすい理由はどれか。",
            options: ["限られた試行数でも重要な軸の多様な値を試しやすい", "必ず大域最適解を証明する", "評価を一度も行わない", "全軸で同じ値だけを試す"],
            answer: 0,
            explanation: "Gridは重要でない軸の組合せにも試行を費やします。Randomは各重要軸で異なる値を広く試しやすくなります。"
        },
        {
            id: "gen-bayesian-optimization",
            category: "Bayesian Optimization",
            difficulty: "基礎",
            question: "Bayesian Optimizationが特に適する状況はどれか。",
            options: ["1回の学習評価が高価で、過去の結果から有望な次候補を選びたい", "候補が2つだけで両方を即時評価できる", "ハイパーパラメータが存在しない", "正解ラベルを作りたい"],
            answer: 0,
            explanation: "少ない評価回数で良い候補を探したい場合に有効です。代理モデルで未知候補の性能を推定します。"
        },
        {
            id: "gen-acquisition-function",
            category: "Bayesian Optimization（応用）",
            difficulty: "応用",
            question: "Bayesian Optimizationの獲得関数（Acquisition Function）の役割はどれか。",
            options: ["代理モデルの予測を使い、探索と活用を考慮して次に評価する候補を決める", "損失関数を必ずMSEへ変える", "全候補を同時に学習する", "テストラベルを推定する"],
            answer: 0,
            explanation: "未探索で不確かな領域を見る探索と、良さそうな領域を詳しく見る活用のバランスを取ります。"
        },
        {
            id: "gen-validation-for-tuning",
            category: "ハイパーパラメータ選択",
            difficulty: "基礎",
            question: "ハイパーパラメータを比較して選ぶ際に使うデータとして正しいものはどれか。",
            options: ["検証データ", "テストデータを何度も利用", "正解のない本番データだけ", "訓練データの訓練誤差だけ"],
            answer: 0,
            explanation: "検証性能で設定を選び、テストデータは選択が終わった後の最終評価にだけ使います。データ分割の詳細は機械学習Vol.2の担当です。"
        }
    ]
};
