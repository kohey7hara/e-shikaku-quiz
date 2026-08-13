window.quizData = {
    title: "3-（４）CNN：畳み込みニューラルネットワーク",
    
    cheatSheet: `
        <style>
            .cnn-flow { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 5px; background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .cnn-step { border: 2px solid #333; padding: 8px; background: white; border-radius: 5px; text-align: center; width: 85px; font-size: 0.8em; }
            .cnn-arrow { color: #555; font-weight: bold; }
            
            .visual-container { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
            .visual-box { border: 1px solid #ccc; padding: 10px; border-radius: 8px; background: #fff; width: 45%; min-width: 250px; }
            .grid-table { border-collapse: collapse; margin: 10px auto; }
            .grid-table td { width: 25px; height: 25px; border: 1px solid #ddd; text-align: center; font-size: 0.8em; color: #ccc; }
            
            /* 畳み込みの強調 */
            .conv-active { border: 2px solid #e74c3c !important; color: #e74c3c !important; font-weight: bold; background: #fceceb; }
            /* プーリングの強調 */
            .pool-active { border: 2px solid #3498db !important; color: #3498db !important; font-weight: bold; background: #ebf5fb; }

            .formula-box { background:#eef6ff; padding:10px; border-radius:7px; text-align:center; font-weight:bold; margin: 8px 0; border: 1px solid #c8dbee; white-space: nowrap; }
            .formula-box mjx-container { margin: 0 !important; }
            .exam-core { margin: 12px 0 20px; padding: 14px 16px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .calc-steps { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 12px 0; }
            .calc-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 9px; background: #fff; }
            .calc-card strong { color: #123f68; }
            .answer-strip { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #f39c12; border-radius: 7px; background: #fff8e7; line-height: 1.7; }
            .worked-example { margin: 12px 0 20px; padding: 16px; border: 2px solid #f39c12; border-radius: 12px; background: #fffaf0; }
            .worked-given { margin-bottom: 12px; }
            .worked-symbols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-top: 9px; }
            .worked-symbol { padding: 7px 9px; border: 1px solid #ead7aa; border-radius: 7px; background: #fff; text-align: center; }
            .worked-step { display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 10px; margin-top: 10px; padding: 11px; border: 1px solid #e5eaf0; border-radius: 9px; background: #fff; line-height: 1.65; }
            .worked-step-number { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: #167f92; color: #fff; font-weight: 800; }
            .worked-step strong { color: #123f68; }
            .worked-step .formula-box { white-space: normal; overflow-x: auto; }
            .worked-result { margin-top: 12px; padding: 11px 13px; border-left: 5px solid #27ae60; border-radius: 7px; background: #eafaf1; line-height: 1.7; }
            .worked-trap { margin-top: 10px; padding: 10px 12px; border-left: 5px solid #e74c3c; border-radius: 7px; background: #fff3f1; line-height: 1.7; }
            .comparison-table td:nth-child(3) { min-width: 330px; }
            .cnn-concept-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 12px 0 20px; }
            .cnn-concept-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 10px; background: #fff; text-align: center; }
            .cnn-concept-card > strong { display: block; margin-bottom: 5px; color: #123f68; }
            .cnn-concept-svg { display: block; width: 100%; max-width: 320px; height: 125px; margin: 4px auto 8px; }
            .cnn-concept-caption { font-size: 0.86em; line-height: 1.55; color: #334e68; }
            .cnn-svg-label { font-size: 11px; fill: #334e68; font-weight: 700; }
            .cnn-svg-note { font-size: 9px; fill: #627d98; }
            .cnn-table-wrap { overflow-x: auto; margin-bottom: 18px; }
            .cnn-model-table { min-width: 820px; }
            .cnn-model-table td:nth-child(4) { min-width: 290px; }
            .cnn-model-timeline { display: flex; gap: 8px; margin: 12px 0 20px; padding: 4px 2px 10px; overflow-x: auto; }
            .cnn-model-year { flex: 0 0 126px; padding: 10px 8px; border-top: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; text-align: center; }
            .cnn-model-year strong { display: block; margin: 2px 0 5px; color: #123f68; }
            .cnn-model-year small { display: block; line-height: 1.45; color: #526d82; }
            .cnn-model-key { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #8e44ad; border-radius: 7px; background: #f7f1fa; line-height: 1.7; }
            @media (max-width: 760px) {
                .calc-steps { grid-template-columns: 1fr; }
                .worked-symbols { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .cnn-concept-grid { grid-template-columns: 1fr; }
            }
        </style>

        <h3>■ 試験は「形・数・役割」の3本</h3>
        <div class="exam-core">
            <strong>形：</strong>出力の高さ・幅・チャネル数を求める。<br>
            <strong>数：</strong>重みとバイアスのパラメータ数を求める。<br>
            <strong>役割：</strong>通常畳み込み、特殊な畳み込み、プーリングを見分ける。<br>
            <strong>迷ったら：</strong>①実効カーネル → ②出力サイズ → ③出力チャネル → ④パラメータ数の順。
        </div>

        <h3>■ CNNの処理フロー：形を保って特徴を掴む</h3>
        <p>全結合層（1列に潰す）と違い、CNNは「画像の形」を維持したまま、以下の流れで処理します。</p>
        
        <div class="cnn-flow">
            <div class="cnn-step" style="border-style:dashed;">
                <strong>入力</strong><br>
                <small>画像</small>
            </div>
            <div class="cnn-arrow">→</div>
            <div class="cnn-step" style="background:#eafaf1; border-color:#27ae60;">
                <strong>畳み込み</strong><br>
                (Conv)<br>
                <small>特徴抽出</small>
            </div>
            <div class="cnn-arrow">→</div>
            <div class="cnn-step" style="background:#fef9e7; border-color:#f39c12;">
                <strong>ReLU</strong><br>
                (Act)<br>
                <small>活性化</small>
            </div>
            <div class="cnn-arrow">→</div>
            <div class="cnn-step" style="background:#ebf5fb; border-color:#3498db;">
                <strong>Pool</strong><br>
                (Sub)<br>
                <small>圧縮</small>
            </div>
            <div class="cnn-arrow">...</div>
            <div class="cnn-step" style="background:#fceceb; border-color:#e74c3c;">
                <strong>全結合</strong><br>
                (FC)<br>
                <small>分類</small>
            </div>
        </div>

        <h3>■ 図解：畳み込みとプーリングの違い</h3>
        <div class="visual-container">
            <div class="visual-box">
                <h4>1. 畳み込み (Convolution)</h4>
                <p style="font-size:0.8em;">フィルタをスライドさせて、局所的な特徴（縦線、横線など）を見つけます。</p>
                <table class="grid-table">
                    <tr><td class="conv-active">1</td><td class="conv-active">0</td><td>1</td><td>0</td></tr>
                    <tr><td class="conv-active">0</td><td class="conv-active">1</td><td>0</td><td>1</td></tr>
                    <tr><td>1</td><td>0</td><td>1</td><td>0</td></tr>
                    <tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>
                </table>
                <div style="text-align:center; font-size:0.8em; color:#e74c3c;">
                    ▲ フィルタと積和演算<br>(重み共有でパラメータ削減)
                </div>
            </div>

            <div class="visual-box">
                <h4>2. プーリング (Max Pooling)</h4>
                <p style="font-size:0.8em;">領域内の「最大値」だけを残し、画像を縮小します。</p>
                <table class="grid-table">
                    <tr><td class="pool-active">9</td><td class="pool-active">3</td><td>2</td><td>1</td></tr>
                    <tr><td class="pool-active">4</td><td class="pool-active">5</td><td>0</td><td>8</td></tr>
                    <tr><td>2</td><td>1</td><td>6</td><td>7</td></tr>
                    <tr><td>0</td><td>5</td><td>3</td><td>4</td></tr>
                </table>
                <div style="text-align:center; font-size:0.8em; color:#3498db;">
                    ▲ 最大値「9」を採用<br>(位置ズレに強くなる)
                </div>
            </div>
        </div>

        <h3>■ 計算は4手順だけ</h3>
        <div class="calc-steps">
            <div class="calc-card">
                <strong>① 実効カーネル</strong>
                <div class="formula-box">$\\displaystyle K_{eff}=D(K-1)+1$</div>
                通常の畳み込みは $D=1$ なので $K_{eff}=K$。
            </div>
            <div class="calc-card">
                <strong>② 出力サイズ</strong>
                <div class="formula-box">$\\displaystyle H_{out}=\\left\\lfloor\\frac{H+2P-K_{eff}}{S}\\right\\rfloor+1$</div>
                幅 $W_{out}$ も同じ式。割り切れない端は切り捨て。
            </div>
            <div class="calc-card">
                <strong>③ 出力チャネル</strong>
                <div class="formula-box">$\\displaystyle C_{out}=\\text{フィルタの個数}$</div>
                1フィルタが1枚の特徴マップを作る。
            </div>
            <div class="calc-card">
                <strong>④ パラメータ数</strong>
                <div class="formula-box">$\\displaystyle (K_hK_wC_{in}+1)C_{out}$</div>
                $+1$ は出力チャネルごとのバイアス。無視なら外す。
            </div>
        </div>
        <h3>■ 計算例：どの数字をどこへ入れる？</h3>
        <div class="worked-example">
            <div class="worked-given">
                <strong>問題：</strong>入力 $32\\times32\\times3$ に、$3\\times3$ のフィルタを64個適用する。Padding $P=1$、Stride $S=1$ のとき、出力の形とパラメータ数を求める。
                <div class="worked-symbols">
                    <div class="worked-symbol">高さ・幅<br><strong>$H=W=32$</strong></div>
                    <div class="worked-symbol">入力チャネル<br><strong>$C_{in}=3$</strong></div>
                    <div class="worked-symbol">カーネル<br><strong>$K_h=K_w=3$</strong></div>
                    <div class="worked-symbol">Padding<br><strong>$P=1$</strong></div>
                    <div class="worked-symbol">Stride<br><strong>$S=1$</strong></div>
                    <div class="worked-symbol">フィルタ数<br><strong>$C_{out}=64$</strong></div>
                </div>
            </div>

            <div class="worked-step">
                <span class="worked-step-number">1</span>
                <div>
                    <strong>実効カーネルを求める</strong><br>
                    Dilationの指定がない通常畳み込みなので $D=1$。
                    <div class="formula-box">$\\displaystyle K_{eff}=D(K-1)+1=1\\times(3-1)+1=3$</div>
                    したがって、実際に見る範囲は通常どおり $3\\times3$。
                </div>
            </div>

            <div class="worked-step">
                <span class="worked-step-number">2</span>
                <div>
                    <strong>出力の高さと幅を求める</strong>
                    <div class="formula-box">$\\displaystyle H_{out}=\\left\\lfloor\\frac{32+2\\times1-3}{1}\\right\\rfloor+1=31+1=32$</div>
                    幅も同じ計算なので $W_{out}=32$。Paddingで $32+2=34$ に広げ、そこへ幅3のフィルタを1マスずつ動かすため、出力は元と同じ $32\\times32$ になる。
                </div>
            </div>

            <div class="worked-step">
                <span class="worked-step-number">3</span>
                <div>
                    <strong>出力チャネル数を決める</strong><br>
                    1個のフィルタが1枚の特徴マップを作る。フィルタが64個なので、
                    <div class="formula-box">$\\displaystyle C_{out}=64$</div>
                    よって出力の形は <strong>$32\\times32\\times64$</strong>。
                </div>
            </div>

            <div class="worked-step">
                <span class="worked-step-number">4</span>
                <div>
                    <strong>学習するパラメータ数を求める</strong><br>
                    1個のフィルタは、RGBの3チャネルすべてを見る。そのため重みは $3\\times3\\times3=27$ 個。さらにフィルタごとにバイアスが1個ある。
                    <div class="formula-box">$\\displaystyle \\underbrace{(3\\times3\\times3+1)}_{\\text{1フィルタ分 }28}\\times\\underbrace{64}_{\\text{フィルタ数}}=1,792$</div>
                    内訳は、重み $3\\times3\\times3\\times64=1,728$ 個、バイアス $64$ 個。合計 $1,728+64=1,792$ 個。
                </div>
            </div>

            <div class="worked-result">
                <strong>答え：</strong>出力の形は $32\\times32\\times64$、学習するパラメータ数は <strong>1,792個</strong>。
            </div>
            <div class="worked-trap">
                <strong>試験の注意：</strong>パラメータ数に $32\\times32$ は掛けない。同じフィルタの重みを全位置で繰り返し使う<strong>重み共有</strong>だから。出力要素数を聞かれた場合は $32\\times32\\times64=65,536$ と計算する。
            </div>
        </div>

        <h3>■ 図でわかる「形・数」の頻出4点</h3>
        <div class="cnn-concept-grid">
            <div class="cnn-concept-card">
                <strong>Padding と Stride</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="パディングは周囲を足し、ストライドはフィルタの移動幅を広げる">
                    <text x="40" y="14" class="cnn-svg-label">Padding</text>
                    <rect x="16" y="25" width="82" height="82" rx="4" fill="#eef7fb" stroke="#2780b8" stroke-width="2" stroke-dasharray="5,3"/>
                    <rect x="28" y="37" width="58" height="58" fill="#fff" stroke="#627d98"/>
                    <g stroke="#d7e2ec"><path d="M42 37 V95 M57 37 V95 M72 37 V95 M28 51 H86 M28 66 H86 M28 81 H86"/></g>
                    <text x="33" y="118" class="cnn-svg-note">P=1：周囲を足す</text>
                    <text x="164" y="14" class="cnn-svg-label">Stride</text>
                    <path d="M132 66 H242" stroke="#d7e2ec" stroke-width="3"/>
                    <g fill="#2780b8"><circle cx="142" cy="66" r="6"/><circle cx="182" cy="66" r="6"/><circle cx="222" cy="66" r="6"/></g>
                    <g fill="#2780b8"><path d="M174 66 l-7 -5 v10 z"/><path d="M214 66 l-7 -5 v10 z"/></g>
                    <text x="160" y="53" class="cnn-svg-note">2マス</text><text x="200" y="53" class="cnn-svg-note">2マス</text>
                    <text x="157" y="91" class="cnn-svg-note">S=2：飛ばして動く</text>
                </svg>
                <div class="cnn-concept-caption"><strong>Paddingは形を保つ</strong>、Strideは<strong>出力を小さくする</strong>。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>フィルタ数 ＝ 出力チャネル数</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="入力3チャネルに64個のフィルタを適用すると出力は64チャネル">
                    <g fill="#eef7fb" stroke="#2780b8"><rect x="12" y="32" width="62" height="62"/><rect x="18" y="26" width="62" height="62"/><rect x="24" y="20" width="62" height="62"/></g>
                    <text x="25" y="108" class="cnn-svg-note">入力 C=3</text>
                    <path d="M92 56 H123" stroke="#627d98" stroke-width="2"/><path d="M123 56 l-7 -5 v10 z" fill="#627d98"/>
                    <g fill="#fff8e7" stroke="#f39c12"><rect x="130" y="28" width="28" height="28"/><rect x="136" y="34" width="28" height="28"/><rect x="142" y="40" width="28" height="28"/></g>
                    <text x="127" y="83" class="cnn-svg-note">フィルタ64個</text>
                    <path d="M176 56 H201" stroke="#627d98" stroke-width="2"/><path d="M201 56 l-7 -5 v10 z" fill="#627d98"/>
                    <g fill="#eafaf1" stroke="#27ae60"><rect x="205" y="35" width="42" height="42"/><rect x="209" y="31" width="42" height="42"/><rect x="213" y="27" width="42" height="42"/></g>
                    <text x="205" y="92" class="cnn-svg-note">出力 C=64</text>
                </svg>
                <div class="cnn-concept-caption">1個のフィルタが<strong>1枚の特徴マップ</strong>を作る。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>受容野：深いほど広く見る</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="層が深くなるほど出力1点が参照する入力範囲が広がる">
                    <g transform="translate(15,24)"><rect width="64" height="64" fill="#f8fafc" stroke="#b8c7d6"/><rect x="22" y="22" width="20" height="20" fill="#fceceb" stroke="#e74c3c" stroke-width="2"/><text x="19" y="82" class="cnn-svg-note">浅い層</text></g>
                    <path d="M86 55 H112" stroke="#627d98" stroke-width="2"/><path d="M112 55 l-7 -5 v10 z" fill="#627d98"/>
                    <g transform="translate(119,24)"><rect width="64" height="64" fill="#f8fafc" stroke="#b8c7d6"/><rect x="13" y="13" width="38" height="38" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/><text x="19" y="82" class="cnn-svg-note">中間層</text></g>
                    <path d="M190 55 H212" stroke="#627d98" stroke-width="2"/><path d="M212 55 l-7 -5 v10 z" fill="#627d98"/>
                    <g transform="translate(217,24)"><rect width="38" height="64" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/><text x="3" y="82" class="cnn-svg-note">深い層</text></g>
                    <text x="75" y="118" class="cnn-svg-note">局所 → 模様 → 物体全体</text>
                </svg>
                <div class="cnn-concept-caption">小さなカーネルを重ねても、見える入力範囲は広がる。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>im2col：パッチを行に並べる</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="画像の局所パッチを行列へ展開して行列積で畳み込みを計算">
                    <rect x="10" y="22" width="72" height="72" fill="#fff" stroke="#627d98"/>
                    <g stroke="#d7e2ec"><path d="M28 22 V94 M46 22 V94 M64 22 V94 M10 40 H82 M10 58 H82 M10 76 H82"/></g>
                    <rect x="10" y="22" width="36" height="36" fill="#fceceb" fill-opacity="0.7" stroke="#e74c3c" stroke-width="2"/>
                    <rect x="46" y="58" width="36" height="36" fill="#eef7fb" fill-opacity="0.7" stroke="#2780b8" stroke-width="2"/>
                    <path d="M88 57 H115" stroke="#627d98" stroke-width="2"/><path d="M115 57 l-7 -5 v10 z" fill="#627d98"/>
                    <rect x="122" y="22" width="75" height="72" fill="#f8fafc" stroke="#627d98"/>
                    <g stroke="#d7e2ec"><path d="M122 46 H197 M122 70 H197 M141 22 V94 M160 22 V94 M179 22 V94"/></g>
                    <rect x="122" y="22" width="75" height="24" fill="#fceceb" fill-opacity="0.7"/>
                    <rect x="122" y="70" width="75" height="24" fill="#eef7fb" fill-opacity="0.7"/>
                    <text x="132" y="112" class="cnn-svg-note">各パッチ＝1行</text>
                    <text x="205" y="61" class="cnn-svg-label">× W</text>
                    <text x="223" y="81" class="cnn-svg-note">行列積</text>
                </svg>
                <div class="cnn-concept-caption"><strong>計算は高速化</strong>するが、重複展開で<strong>メモリは増える</strong>。</div>
            </div>
        </div>

        <h3>■ 積和演算：1マスの作り方</h3>
        <p>入力の小領域とカーネルを<strong>同じ位置どうしで掛け、全部足す</strong>だけです。</p>
        <div class="formula-box">
            $\\displaystyle
            \\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}
            \\odot
            \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$
        </div>
        <div class="formula-box">
            $\\displaystyle 1\\times1+2\\times0+3\\times0+4\\times(-1)=-3$
        </div>

        <h3>■ 用語は1行で覚える</h3>
        <table class="comparison-table">
            <tr><th>用語</th><th>一言</th><th>試験のツボ</th></tr>
            <tr><td><strong>フィルタ / カーネル</strong></td><td>局所領域に掛ける重み</td><td>同じ重みを全位置で使う＝<strong>重み共有</strong>。</td></tr>
            <tr><td><strong>特徴マップ</strong></td><td>1フィルタの反応結果</td><td>フィルタ数＝出力チャネル数。</td></tr>
            <tr><td><strong>受容野</strong></td><td>出力1点が見ている入力範囲</td><td>深い層・大きいstride・dilationで広がる。</td></tr>
            <tr><td><strong>im2col</strong></td><td>各パッチを行へ展開</td><td>行列積で高速化するが、重複展開でメモリ増加。</td></tr>
            <tr><td><strong>単純型 / 複雑型細胞</strong></td><td>特徴抽出 / 位置ずれ吸収</td><td>畳み込み / プーリングの生物学的イメージ。</td></tr>
        </table>

        <h3>■ 図で見分ける「特殊な畳み込み」</h3>
        <div class="cnn-concept-grid">
            <div class="cnn-concept-card">
                <strong>Depthwise Separable</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="チャネル別のDepthwise畳み込みの後に1かける1畳み込みでチャネルを混ぜる">
                    <text x="14" y="14" class="cnn-svg-label">Depthwise</text>
                    <g fill="#eef7fb" stroke="#2780b8"><rect x="13" y="27" width="35" height="22"/><rect x="13" y="55" width="35" height="22"/><rect x="13" y="83" width="35" height="22"/></g>
                    <g fill="#eafaf1" stroke="#27ae60"><rect x="76" y="27" width="35" height="22"/><rect x="76" y="55" width="35" height="22"/><rect x="76" y="83" width="35" height="22"/></g>
                    <path d="M50 38 H73 M50 66 H73 M50 94 H73" stroke="#627d98" stroke-width="1.5"/>
                    <text x="17" y="119" class="cnn-svg-note">別々に空間処理</text>
                    <path d="M116 66 H150" stroke="#627d98" stroke-width="2"/><path d="M150 66 l-7 -5 v10 z" fill="#627d98"/>
                    <rect x="155" y="42" width="42" height="48" rx="5" fill="#fff8e7" stroke="#f39c12"/>
                    <text x="166" y="62" class="cnn-svg-label">1×1</text><text x="160" y="78" class="cnn-svg-note">Pointwise</text>
                    <path d="M201 66 H221" stroke="#627d98" stroke-width="2"/><path d="M221 66 l-7 -5 v10 z" fill="#627d98"/>
                    <rect x="225" y="38" width="28" height="56" fill="#f4ecf7" stroke="#8e44ad"/>
                    <text x="210" y="115" class="cnn-svg-note">混ぜる</text>
                </svg>
                <div class="cnn-concept-caption"><strong>チャネル別の空間処理 → 1×1で混合</strong>。軽量化の定番。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>Pointwise と Grouped</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="Pointwise畳み込みは同じ位置のチャネルを混ぜ、Grouped畳み込みはチャネル群を分けて処理">
                    <text x="35" y="14" class="cnn-svg-label">Pointwise 1×1</text>
                    <g fill="#eef7fb" stroke="#2780b8"><circle cx="28" cy="38" r="9"/><circle cx="28" cy="63" r="9"/><circle cx="28" cy="88" r="9"/></g>
                    <path d="M39 38 L91 55 M39 63 H91 M39 88 L91 71" stroke="#627d98" stroke-width="1.5"/>
                    <rect x="94" y="48" width="28" height="30" rx="4" fill="#fff8e7" stroke="#f39c12"/>
                    <text x="99" y="66" class="cnn-svg-note">混合</text>
                    <path d="M132 20 V106" stroke="#d7e2ec"/>
                    <text x="164" y="14" class="cnn-svg-label">Grouped</text>
                    <g fill="#fceceb" stroke="#e74c3c"><circle cx="153" cy="42" r="8"/><circle cx="153" cy="62" r="8"/></g>
                    <g fill="#eef7fb" stroke="#2780b8"><circle cx="153" cy="82" r="8"/><circle cx="153" cy="102" r="8"/></g>
                    <path d="M163 42 H207 M163 62 H207 M163 82 H207 M163 102 H207" stroke="#627d98"/>
                    <rect x="210" y="31" width="35" height="38" rx="4" fill="#fceceb" stroke="#e74c3c"/><rect x="210" y="75" width="35" height="38" rx="4" fill="#eef7fb" stroke="#2780b8"/>
                    <text x="215" y="52" class="cnn-svg-note">Group1</text><text x="215" y="97" class="cnn-svg-note">Group2</text>
                </svg>
                <div class="cnn-concept-caption">1×1は<strong>同じ位置のチャネルを混ぜる</strong>。Groupedは<strong>群を分離</strong>。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>Dilated：間を空けて広く見る</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="Dilated畳み込みはカーネル要素の間隔を空けて受容野を広げる">
                    <g transform="translate(25,16)">
                        <rect width="92" height="92" fill="#f8fafc" stroke="#b8c7d6"/>
                        <g stroke="#e4ebf1"><path d="M18 0 V92 M36 0 V92 M55 0 V92 M73 0 V92 M0 18 H92 M0 36 H92 M0 55 H92 M0 73 H92"/></g>
                        <g fill="#8e44ad"><circle cx="9" cy="9" r="5"/><circle cx="46" cy="9" r="5"/><circle cx="83" cy="9" r="5"/><circle cx="9" cy="46" r="5"/><circle cx="46" cy="46" r="5"/><circle cx="83" cy="46" r="5"/><circle cx="9" cy="83" r="5"/><circle cx="46" cy="83" r="5"/><circle cx="83" cy="83" r="5"/></g>
                    </g>
                    <path d="M131 62 H167" stroke="#627d98" stroke-width="2"/><path d="M167 62 l-7 -5 v10 z" fill="#627d98"/>
                    <rect x="175" y="24" width="66" height="76" rx="6" fill="#f4ecf7" stroke="#8e44ad" stroke-width="2"/>
                    <text x="189" y="54" class="cnn-svg-label">3×3重み</text><text x="186" y="72" class="cnn-svg-note">見える範囲は</text><text x="196" y="86" class="cnn-svg-label">5×5</text>
                    <text x="45" y="122" class="cnn-svg-note">D=2：9個の重みはそのまま</text>
                </svg>
                <div class="cnn-concept-caption"><strong>パラメータを増やさず受容野を拡大</strong>する。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>Transposed：学習して拡大</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="転置畳み込みは小さい特徴マップを学習可能な処理で大きくする">
                    <text x="12" y="14" class="cnn-svg-note">小さい特徴マップ</text>
                    <rect x="24" y="32" width="60" height="60" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                    <path d="M54 32 V92 M24 62 H84" stroke="#2780b8"/>
                    <path d="M95 62 H155" stroke="#f39c12" stroke-width="3"/><path d="M155 62 l-8 -6 v12 z" fill="#f39c12"/>
                    <text x="102" y="50" class="cnn-svg-note">学習可能な</text><text x="109" y="82" class="cnn-svg-note">拡大</text>
                    <rect x="166" y="18" width="78" height="88" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                    <g stroke="#ead7aa"><path d="M186 18 V106 M205 18 V106 M225 18 V106 M166 40 H244 M166 62 H244 M166 84 H244"/></g>
                    <text x="178" y="121" class="cnn-svg-note">大きい出力</text>
                </svg>
                <div class="cnn-concept-caption">セグメンテーション等で使用。<strong>数学的な逆畳み込みではない</strong>。</div>
            </div>
        </div>

        <h3>■ 特別な畳み込み：何を分ける？</h3>
        <table class="comparison-table">
            <tr><th>手法</th><th>何をするか</th><th>暗記ワード</th></tr>
            <tr><td><strong>Pointwise（1×1）</strong></td><td>各位置でチャネルを混ぜ、$C_{out}$ を変更</td><td>空間サイズを保ったままチャネル圧縮・拡張。</td></tr>
            <tr><td><strong>Depthwise</strong></td><td>入力チャネルごとに独立して空間畳み込み</td><td>チャネルを<strong>混ぜない</strong>。</td></tr>
            <tr><td><strong>Depthwise Separable</strong></td><td>Depthwise → Pointwise</td><td>空間処理とチャネル混合を分離して軽量化。</td></tr>
            <tr><td><strong>Grouped</strong></td><td>チャネルを複数グループへ分割</td><td>通常畳み込みとDepthwiseの中間。</td></tr>
            <tr><td><strong>Dilated</strong></td><td>カーネル要素の間隔を空ける</td><td>パラメータ数を増やさず受容野を拡大。</td></tr>
            <tr><td><strong>Transposed</strong></td><td>学習可能なアップサンプリング</td><td>数学的な逆畳み込みではない。</td></tr>
        </table>

        <h3>■ プーリング：残すものを見分ける</h3>
        <table class="comparison-table">
            <tr><th>手法</th><th>残すもの</th><th>形・特徴</th></tr>
            <tr><td><strong>Max Pooling</strong></td><td>領域内の最大値</td><td>強い特徴を残す。学習パラメータなし。</td></tr>
            <tr><td><strong>Average Pooling</strong></td><td>領域内の平均</td><td>滑らかな要約。</td></tr>
            <tr><td><strong>Lp Pooling</strong></td><td>$\\left(\\sum_i|x_i|^p\\right)^{1/p}$</td><td>$p\\to\\infty$ でMaxに近づく。</td></tr>
            <tr><td><strong>Global Average Pooling</strong></td><td>各チャネル全体の平均</td><td>$H\\times W\\times C\\to1\\times1\\times C$。</td></tr>
        </table>
        <div class="cnn-concept-grid">
            <div class="cnn-concept-card">
                <strong>GAP：各チャネルを1個に要約</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="Global Average Poolingは各特徴マップ全体の平均を1つずつ出力する">
                    <g transform="translate(14,19)"><rect width="62" height="62" fill="#fceceb" stroke="#e74c3c"/><g stroke="#efb7b0"><path d="M20 0 V62 M41 0 V62 M0 20 H62 M0 41 H62"/></g><text x="20" y="80" class="cnn-svg-note">Map 1</text></g>
                    <g transform="translate(43,30)"><rect width="62" height="62" fill="#eef7fb" stroke="#2780b8"/><g stroke="#b9d8e9"><path d="M20 0 V62 M41 0 V62 M0 20 H62 M0 41 H62"/></g><text x="20" y="80" class="cnn-svg-note">Map 2</text></g>
                    <g transform="translate(72,41)"><rect width="62" height="62" fill="#eafaf1" stroke="#27ae60"/><g stroke="#bce8cf"><path d="M20 0 V62 M41 0 V62 M0 20 H62 M0 41 H62"/></g><text x="20" y="80" class="cnn-svg-note">Map C</text></g>
                    <path d="M142 63 H183" stroke="#627d98" stroke-width="2"/><path d="M183 63 l-7 -5 v10 z" fill="#627d98"/>
                    <text x="145" y="51" class="cnn-svg-note">全体平均</text>
                    <g><circle cx="199" cy="42" r="11" fill="#fceceb" stroke="#e74c3c"/><circle cx="220" cy="63" r="11" fill="#eef7fb" stroke="#2780b8"/><circle cx="241" cy="84" r="11" fill="#eafaf1" stroke="#27ae60"/></g>
                    <text x="186" y="115" class="cnn-svg-note">1×1×C</text>
                </svg>
                <div class="cnn-concept-caption">Flattenせず、<strong>特徴マップ1枚につき平均1個</strong>を残す。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>等変性 と 不変性</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="畳み込みでは入力が移動すると反応も移動し、プーリングでは要約値が変わりにくい">
                    <text x="23" y="14" class="cnn-svg-label">Conv：等変</text>
                    <rect x="12" y="25" width="92" height="48" rx="4" fill="#f8fafc" stroke="#b8c7d6"/>
                    <rect x="22" y="39" width="17" height="17" fill="#e74c3c"/><path d="M45 48 H67" stroke="#627d98"/><path d="M67 48 l-6 -4 v8 z" fill="#627d98"/><rect x="75" y="39" width="17" height="17" fill="#e74c3c"/>
                    <text x="14" y="88" class="cnn-svg-note">入力が動く → 反応も動く</text>
                    <path d="M124 15 V110" stroke="#d7e2ec"/>
                    <text x="147" y="14" class="cnn-svg-label">Pool：不変に近づく</text>
                    <rect x="138" y="25" width="104" height="48" rx="4" fill="#f8fafc" stroke="#b8c7d6"/>
                    <rect x="148" y="39" width="17" height="17" fill="#2780b8"/><rect x="181" y="39" width="17" height="17" fill="#2780b8"/>
                    <path d="M169 48 H177" stroke="#627d98"/>
                    <text x="204" y="53" class="cnn-svg-label">→ 9</text>
                    <text x="139" y="88" class="cnn-svg-note">位置がずれても要約値は同じ</text>
                </svg>
                <div class="cnn-concept-caption">畳み込みは<strong>反応位置も動く</strong>。Pooling/GAPが<strong>位置ずれを吸収</strong>。</div>
            </div>
        </div>
        <p><strong>最後の整理：</strong>畳み込みは移動に対して<strong>同じように位置が動く（equivariance）</strong>。プーリングやGAPが位置ずれへの<strong>不変性</strong>を強めます。</p>

        <h3>■ CNNモデル史：試験は「何を新しく導入したか」</h3>
        <div class="cnn-model-timeline" aria-label="代表的CNNモデルの歴史">
            <div class="cnn-model-year"><small>1998</small><strong>LeNet-5</strong><small>Conv＋Poolの原型</small></div>
            <div class="cnn-model-year"><small>2012</small><strong>AlexNet</strong><small>ReLU・GPU・Dropout</small></div>
            <div class="cnn-model-year"><small>2014</small><strong>VGG</strong><small>小さい3×3を積層</small></div>
            <div class="cnn-model-year"><small>2014</small><strong>GoogLeNet</strong><small>Inceptionで並列処理</small></div>
            <div class="cnn-model-year"><small>2015</small><strong>ResNet</strong><small>Residual / Skip</small></div>
            <div class="cnn-model-year"><small>2017</small><strong>ResNeXt</strong><small>Cardinality</small></div>
            <div class="cnn-model-year"><small>2017</small><strong>DenseNet</strong><small>特徴をConcat</small></div>
            <div class="cnn-model-year"><small>2017</small><strong>MobileNet</strong><small>Depthwise Separable</small></div>
            <div class="cnn-model-year"><small>2019</small><strong>EfficientNet</strong><small>複合スケーリング</small></div>
        </div>
        <div class="cnn-model-key">
            <strong>歴史問題の解き方：</strong>「深くする」だけでなく、<strong>AlexNet＝学習を成立</strong>、<strong>VGG＝小さいカーネル</strong>、<strong>GoogLeNet＝並列</strong>、<strong>ResNet＝足し算</strong>、<strong>ResNeXt＝分岐数</strong>、<strong>DenseNet＝連結</strong>で区別する。ResNet／WideResNetのResidual Block・劣化問題・Projection Shortcutは <a href="quiz.html?id=04_app_image">4-（1〜3）画像認識</a>で詳しく演習します。
        </div>

        <div class="cnn-table-wrap">
            <table class="comparison-table cnn-model-table">
                <tr><th>モデル</th><th>代表構造</th><th>一言暗記</th><th>試験で問われる設計意図</th></tr>
                <tr><td><strong>LeNet-5</strong></td><td>Conv → Pool → FC</td><td>CNNの原型</td><td>手書き数字認識。畳み込みとサブサンプリングを組み合わせた初期モデル。</td></tr>
                <tr><td><strong>AlexNet</strong></td><td>Conv 5層＋FC 3層</td><td>ReLU・Dropout・GPU</td><td>勾配飽和を抑えるReLU、Data Augmentation、FC層のDropout。Grouped Convは当初2GPUへ分割する都合。</td></tr>
                <tr><td><strong>VGG-16/19</strong></td><td>3×3 Convを反復</td><td>小さく深く</td><td>大きいカーネルを小さい3×3の積層へ置換し、非線形性を増やしながらパラメータを抑える。</td></tr>
                <tr><td><strong>GoogLeNet</strong></td><td>Inception Module</td><td>並列＋1×1圧縮</td><td>1×1・3×3・5×5・Poolingを並列化。高価な畳み込みの前に1×1でチャネルを削減。</td></tr>
                <tr><td><strong>ResNet</strong></td><td>Residual Block</td><td>Shortcutで加算</td><td>本章では歴史上の位置を確認。Blockの詳細と計算は4-（1〜3）画像認識へ。</td></tr>
                <tr><td><strong>ResNeXt</strong></td><td>Split–Transform–Merge</td><td>Cardinality</td><td>同形の変換を複数分岐で行い加算。Grouped Convで効率よく実装する。</td></tr>
                <tr><td><strong>DenseNet</strong></td><td>$[x_0,x_1,\ldots]$</td><td>足さずにConcat</td><td>前層の特徴を後続層へすべて連結し、特徴再利用と勾配伝播を促す。</td></tr>
                <tr><td><strong>MobileNet</strong></td><td>Depthwise → 1×1</td><td>空間とチャネルを分離</td><td>通常畳み込みを分解して端末向けに計算量を削減。V2はInverted ResidualとLinear Bottleneck。</td></tr>
                <tr><td><strong>EfficientNet</strong></td><td>Compound Scaling</td><td>深さ・幅・解像度を同時調整</td><td>depthだけを増やさず、width・depth・resolutionを一定則でバランスよく拡大。</td></tr>
            </table>
        </div>

        <h3>■ モデル構造を図で見分ける</h3>
        <div class="cnn-concept-grid">
            <div class="cnn-concept-card">
                <strong>AlexNet：深層CNNを実用化</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 320 125" role="img" aria-label="AlexNetは5つの畳み込み層と3つの全結合層で構成される">
                    <rect x="5" y="43" width="38" height="34" rx="4" fill="#eef7fb" stroke="#2780b8"/><text x="13" y="64" class="cnn-svg-note">Input</text>
                    <path d="M45 60 H61" stroke="#627d98"/><path d="M61 60 l-5 -4 v8 z" fill="#627d98"/>
                    <g fill="#eafaf1" stroke="#27ae60"><rect x="65" y="25" width="26" height="70"/><rect x="76" y="31" width="26" height="64"/><rect x="87" y="37" width="26" height="58"/><rect x="98" y="43" width="26" height="52"/><rect x="109" y="49" width="26" height="46"/></g>
                    <text x="76" y="112" class="cnn-svg-note">Conv × 5</text>
                    <path d="M139 60 H162" stroke="#627d98"/><path d="M162 60 l-5 -4 v8 z" fill="#627d98"/>
                    <g fill="#fff8e7" stroke="#f39c12"><rect x="166" y="31" width="36" height="58"/><rect x="205" y="31" width="36" height="58"/><rect x="244" y="31" width="36" height="58"/></g>
                    <text x="184" y="112" class="cnn-svg-note">FC × 3</text>
                    <text x="73" y="16" class="cnn-svg-note">ReLU・Pool・LRN</text><text x="196" y="16" class="cnn-svg-note">Dropout</text>
                    <path d="M283 60 H310" stroke="#627d98"/><path d="M310 60 l-5 -4 v8 z" fill="#627d98"/>
                </svg>
                <div class="cnn-concept-caption">最初は大きな<strong>11×11・stride 4</strong>。Grouped Convは当初<strong>2GPUへの分割</strong>が理由。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>VGG：3×3を重ねる</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 320 125" role="img" aria-label="VGGでは5かける5畳み込み1層の代わりに3かける3畳み込みを2層重ねる">
                    <text x="38" y="17" class="cnn-svg-label">5×5 Conv × 1</text>
                    <rect x="37" y="31" width="74" height="74" fill="#fceceb" stroke="#e74c3c" stroke-width="2"/><text x="56" y="72" class="cnn-svg-label">RF 5×5</text>
                    <text x="139" y="70" class="cnn-svg-label">≈</text>
                    <text x="190" y="17" class="cnn-svg-label">3×3 Conv × 2</text>
                    <rect x="181" y="39" width="58" height="58" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/><rect x="225" y="31" width="58" height="74" fill="#eafaf1" fill-opacity="0.8" stroke="#27ae60" stroke-width="2"/>
                    <text x="203" y="70" class="cnn-svg-label">RF 5×5</text>
                    <text x="174" y="119" class="cnn-svg-note">非線形性が2回・重みも少ない</text>
                </svg>
                <div class="cnn-concept-caption">同じチャネル数なら重みは $25C^2$ に対し $18C^2$。受容野は同じ5×5。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>GoogLeNet：Inceptionで並列</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 320 125" role="img" aria-label="Inceptionモジュールは1かける1、3かける3、5かける5、プーリングを並列に処理して連結する">
                    <rect x="5" y="45" width="44" height="32" rx="4" fill="#eef7fb" stroke="#2780b8"/><text x="15" y="64" class="cnn-svg-note">Input</text>
                    <path d="M51 61 L82 17 M51 61 L82 46 M51 61 L82 75 M51 61 L82 104" stroke="#627d98"/>
                    <g fill="#fff8e7" stroke="#f39c12"><rect x="84" y="5" width="68" height="24" rx="4"/><rect x="84" y="35" width="68" height="24" rx="4"/><rect x="84" y="65" width="68" height="24" rx="4"/><rect x="84" y="95" width="68" height="24" rx="4"/></g>
                    <g class="cnn-svg-note"><text x="104" y="21">1×1</text><text x="104" y="51">3×3</text><text x="104" y="81">5×5</text><text x="99" y="111">Pooling</text></g>
                    <path d="M154 17 L196 51 M154 47 L196 57 M154 77 L196 65 M154 107 L196 71" stroke="#627d98"/>
                    <rect x="199" y="43" width="69" height="39" rx="4" fill="#eafaf1" stroke="#27ae60"/><text x="216" y="60" class="cnn-svg-label">Concat</text><text x="211" y="74" class="cnn-svg-note">channel方向</text>
                    <path d="M270 62 H310" stroke="#627d98"/><path d="M310 62 l-5 -4 v8 z" fill="#627d98"/>
                </svg>
                <div class="cnn-concept-caption">異なる受容野を同時に取得。3×3・5×5の前の<strong>1×1でチャネル圧縮</strong>。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>ResNeXt：同じ変換を複数分岐</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 320 125" role="img" aria-label="ResNeXtは入力を複数の同形変換へ分岐し結果を集約する">
                    <rect x="5" y="45" width="42" height="32" rx="4" fill="#eef7fb" stroke="#2780b8"/><text x="20" y="65" class="cnn-svg-label">x</text>
                    <path d="M49 61 L79 18 M49 61 L79 47 M49 61 L79 76 M49 61 L79 105" stroke="#627d98"/>
                    <g fill="#f4ecf7" stroke="#8e44ad"><rect x="82" y="5" width="92" height="24" rx="4"/><rect x="82" y="35" width="92" height="24" rx="4"/><rect x="82" y="65" width="92" height="24" rx="4"/><rect x="82" y="95" width="92" height="24" rx="4"/></g>
                    <g class="cnn-svg-note"><text x="105" y="21">Transform 1</text><text x="105" y="51">Transform 2</text><text x="105" y="81">Transform 3</text><text x="105" y="111">Transform C</text></g>
                    <path d="M176 17 L218 51 M176 47 L218 57 M176 77 L218 65 M176 107 L218 71" stroke="#627d98"/>
                    <circle cx="225" cy="61" r="17" fill="#eafaf1" stroke="#27ae60"/><text x="219" y="67" class="cnn-svg-label">Σ</text>
                    <path d="M244 61 H308" stroke="#627d98" stroke-width="2"/><path d="M308 61 l-6 -4 v8 z" fill="#627d98"/>
                </svg>
                <div class="cnn-concept-caption">分岐数を<strong>cardinality</strong>と呼ぶ。Grouped Convで一括実装できる。</div>
            </div>
            <div class="cnn-concept-card">
                <strong>AddとConcatを混同しない</strong>
                <svg class="cnn-concept-svg" viewBox="0 0 320 125" role="img" aria-label="ResNetとResNeXtは特徴を加算しDenseNetはチャネル方向へ連結する">
                    <text x="28" y="16" class="cnn-svg-label">ResNet / ResNeXt</text>
                    <g fill="#eef7fb" stroke="#2780b8"><rect x="17" y="28" width="55" height="27"/><rect x="17" y="66" width="55" height="27"/></g><path d="M74 42 L108 58 M74 80 L108 64" stroke="#627d98"/><circle cx="121" cy="61" r="15" fill="#eafaf1" stroke="#27ae60"/><text x="115" y="67" class="cnn-svg-label">＋</text><text x="32" y="111" class="cnn-svg-note">要素ごとに加算</text>
                    <path d="M160 13 V112" stroke="#d7e2ec"/>
                    <text x="213" y="16" class="cnn-svg-label">DenseNet</text>
                    <g fill="#fff8e7" stroke="#f39c12"><rect x="178" y="28" width="55" height="27"/><rect x="178" y="66" width="55" height="27"/></g><path d="M235 42 L264 53 M235 80 L264 69" stroke="#627d98"/><rect x="267" y="42" width="43" height="40" rx="4" fill="#f4ecf7" stroke="#8e44ad"/><text x="274" y="66" class="cnn-svg-note">Concat</text><text x="200" y="111" class="cnn-svg-note">チャネル方向に連結</text>
                </svg>
                <div class="cnn-concept-caption"><strong>ResNet/ResNeXt＝加算</strong>、<strong>DenseNet＝連結</strong>。頻出の引っかけ。</div>
            </div>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="cnn-table-wrap">
            <table class="comparison-table">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>局所を見る・重みを全位置で共有</td><td><strong>CNN（Convolutional Neural Network）</strong></td><td>画像の空間構造を保って特徴を抽出する。</td></tr>
                <tr><td>フィルタ数を聞かれた</td><td><strong>出力チャネル数 $C_{out}$</strong></td><td>1フィルタが特徴マップを1枚作る。</td></tr>
                <tr><td>パラメータ数（バイアスあり）</td><td><strong>$(K_hK_wC_{in}+1)C_{out}$</strong></td><td>重みだけなら$K_hK_wC_{in}C_{out}$。$+1$は各出力チャネルのバイアス。</td></tr>
                <tr><td>チャネル別の空間処理 → $1×1$で混合</td><td><strong>Depthwise Separable Convolution</strong></td><td>空間処理とチャネル混合を分けて軽量化する。</td></tr>
                <tr><td>各特徴マップ全体を1個の平均へ</td><td><strong>GAP（Global Average Pooling）</strong></td><td>$H×W×C→1×1×C$で、Cは残す。</td></tr>
                <tr><td>GPU・Dropout・ReLU</td><td><strong>AlexNet</strong></td><td>ReLU（Rectified Linear Unit）で深いCNNの学習を実用化。</td></tr>
                <tr><td>小さい $3×3$ を反復</td><td><strong>VGG（Visual Geometry Group）</strong></td><td>小さなカーネルを積み、深さと非線形性を増やす。</td></tr>
                <tr><td>複数サイズの畳み込みを並列</td><td><strong>GoogLeNet／Inception</strong></td><td>$1×1$で圧縮しながら複数スケールを見る。</td></tr>
                <tr><td>Shortcut・残差を加算</td><td><strong>ResNet（Residual Network）</strong></td><td>深層化による劣化問題を改善する。</td></tr>
                <tr><td>Cardinality・同形の複数分岐</td><td><strong>ResNeXt</strong></td><td>分岐をGrouped Convolutionで効率よく実装する。</td></tr>
                <tr><td>前層の特徴をすべて連結</td><td><strong>DenseNet</strong></td><td>Addではなくチャネル方向へConcatする。</td></tr>
                <tr><td>深さ・幅・解像度を同時に拡大</td><td><strong>EfficientNet</strong></td><td>Compound Scalingで3軸をバランスよく調整する。</td></tr>
            </table>
        </div>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "畳み込み演算",
            question: "畳み込みニューラルネットワーク（CNN）が、全結合層だけのネットワーク（MLP）と比べて画像認識に優れている主な理由はどれか。",
            options: ["画像の位置ズレに対する頑健性（移動不変性）と、局所的な特徴抽出能力を持つため", "計算量がMLPよりも圧倒的に多いから", "学習データが少なくても過学習しないから", "活性化関数を使わなくて済むから"],
            answer: 0,
            explanation: "「重み共有」によるパラメータ削減と、「局所受容野」による空間構造の維持がCNNの強みです。厳密には畳み込みは移動に対して同じように反応位置が動く性質（移動等変性）を持ち、Poolingなどが位置ずれへの不変性を強めます。"
        },
        {
            category: "出力サイズ計算",
            question: "入力サイズ $10 \\times 10$、フィルタサイズ $3 \\times 3$、パディング $0$、ストライド $1$ のとき、出力される特徴マップのサイズはいくつか。",
            options: ["$8 \\times 8$", "$7 \\times 7$", "$9 \\times 9$", "$10 \\times 10$"],
            answer: 0,
            explanation: "式：$\\frac{10 + 0 - 3}{1} + 1 = 7 + 1 = 8$。 $8 \\times 8$ になります。"
        },
        {
            category: "パディング",
            question: "畳み込み層において「パディング (Padding)」を行う主な目的はどれか。",
            options: ["出力サイズが入力サイズより小さくなるのを防ぐ（端の情報を保持する）", "計算速度を上げる", "過学習を防ぐ", "画像のコントラストを上げる"],
            answer: 0,
            explanation: "パディングなしで畳み込みを繰り返すと画像がどんどん小さくなり、端の情報が失われてしまいます。周囲を0で埋める（Zero Padding）のが一般的です。"
        },
        {
            category: "プーリング",
            question: "「Max Pooling」の操作として正しいものはどれか。",
            options: ["対象領域内の「最大値」を取り出す", "対象領域内の「平均値」を取り出す", "対象領域内の「中央値」を取り出す", "対象領域内の値をランダムに取り出す"],
            answer: 0,
            explanation: "領域内の最も強い特徴（最大値）だけを残すことで、微小な位置ズレを無視（吸収）できるようにします。"
        },
        {
            category: "1x1畳み込み",
            question: "「1x1畳み込み (Pointwise Convolution)」の主な用途はどれか。",
            options: ["チャンネル数（深さ）の削減・調整による計算量の軽量化", "画像サイズの拡大", "エッジ（輪郭）の検出", "過学習の防止"],
            answer: 0,
            explanation: "GoogLeNet（Inception）などで採用。空間方向のサイズは変えずに、チャンネル方向の次元圧縮を行い、計算コストを大きく下げます。"
        },
        {
            category: "im2col",
            question: "CNNの実装において「im2col (image to column)」というアルゴリズムが使われる理由は何か。",
            options: ["畳み込み演算を行列の掛け算（GEMM）に変換し、計算を高速化するため", "メモリ使用量を最小限にするため", "画像を白黒に変換するため", "逆伝播の計算を不要にするため"],
            answer: 0,
            explanation: "4次元データ（バッチ、CH、高さ、幅）を2次元の行列に展開することで、GPUが得意な行列積で一気に計算できるようにします。"
        },
        {
            category: "受容野",
            question: "CNNにおける「受容野 (Receptive Field)」とは何を指すか。",
            options: ["出力層の1つのニューロンが、入力画像のどのくらいの範囲（領域）の情報を見ているか", "フィルタのサイズそのもの", "入力画像の解像度", "全結合層のニューロン数"],
            answer: 0,
            explanation: "層が深くなるほど、一度に見ている範囲（受容野）は広くなります。"
        },
        {
            category: "生物学的背景",
            question: "CNNの元となった「ネオコグニトロン」のモデルにおいて、エッジ検出などの単純な特徴抽出を行う細胞を何と呼ぶか。",
            options: ["単純型細胞 (Simple cell)", "複雑型細胞 (Complex cell)", "錐体細胞", "神経節細胞"],
            answer: 0,
            explanation: "単純型細胞（S細胞）が特徴抽出（今の畳み込み層）を行い、複雑型細胞（C細胞）が位置ズレの吸収（今のプーリング層）を行うというモデルです。"
        },
        {
            category: "ストライド",
            question: "畳み込み時にフィルタを動かす歩幅のことを何と呼ぶか。",
            options: ["ストライド (Stride)", "パディング (Padding)", "カーネル (Kernel)", "チャンネル (Channel)"],
            answer: 0,
            explanation: "ストライドを2以上にすると、画像サイズを縮小（ダウンサンプリング）する効果があります。"
        },
        {
            category: "Global Average Pooling",
            question: "CNNの最後の全結合層の代わりに用いられる「Global Average Pooling (GAP)」の操作はどれか。",
            options: ["各チャンネルの特徴マップ全体の平均値をとり、1つの値にする", "全特徴マップの最大値をとる", "特徴マップを1列に並べる（Flatten）", "特徴マップ同士を足し合わせる"],
            answer: 0,
            explanation: "特徴マップ1枚につき1つの値を出力します。学習パラメータを増やさずに $H\\times W\\times C$ を $1\\times1\\times C$ へ要約でき、全結合層よりパラメータを抑えられます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "サイズ計算(応用)",
            question: "入力 $32 \\times 32$、フィルタ $5 \\times 5$、パディング $2$、ストライド $1$ のとき、出力サイズはどうなるか。",
            options: ["$32 \\times 32$", "$28 \\times 28$", "$30 \\times 30$", "$34 \\times 34$"],
            answer: 0,
            explanation: "式：$\\frac{32 + (2\\times 2) - 5}{1} + 1 = 32 + 4 - 5 + 1 = 32$。パディングによりサイズが維持される設定（Same Padding）です。"
        },
        {
            category: "Depthwise Separable Conv(応用)",
            question: "MobileNetなどで使われる「Depthwise Separable Convolution」は、通常の畳み込みをどの2段階に分解したものか。",
            options: ["Depthwise Convolution と Pointwise Convolution (1x1)", "Group Convolution と Dilated Convolution", "Transposed Convolution と Max Pooling", "3x3 Convolution と 5x5 Convolution"],
            answer: 0,
            explanation: "「空間方向（Depthwise）」と「チャンネル方向（Pointwise）」の畳み込みを分けることで、パラメータ数と計算量を劇的に削減します。"
        },
        {
            category: "逆畳み込み(応用)",
            question: "セグメンテーション（FCNなど）やGANで用いられる、特徴マップの解像度を大きくする（アップサンプリング）処理はどれか。",
            options: ["逆畳み込み (Transposed Convolution / Deconvolution)", "Max Pooling", "Dilated Convolution", "Global Average Pooling"],
            answer: 0,
            explanation: "通常の畳み込みの逆演算のような処理を行い、画像を拡大します（厳密な数学的逆演算ではありません）。"
        },
        {
            category: "パラメータ数計算(応用)",
            question: "入力チャンネル数 $3$、出力チャンネル数 $64$、フィルタサイズ $3 \\times 3$ の畳み込み層のパラメータ（重み）数はいくつか。（バイアスは無視）",
            options: ["$3 \\times 3 \\times 3 \\times 64 = 1,728$", "$3 \\times 3 \\times 64 = 576$", "$3 \\times 3 \\times 3 = 27$", "$64 \\times 64 \\times 3 = 12,288$"],
            answer: 0,
            explanation: "1つのフィルタは「入力CH × 3 × 3」の体積を持ちます。それが「出力CH」個あるので、全部掛け算します。"
        },
        {
            category: "Dilated Conv(応用)",
            question: "セグメンテーションなどで使われる、フィルタの要素間に隙間（穴）を空けて畳み込む「Dilated Convolution」のメリットは何か。",
            options: ["パラメータ数を増やさずに受容野（Receptive Field）を広げることができる", "画像を縮小せずに計算量を減らせる", "エッジ検出の精度が上がる", "逆伝播が速くなる"],
            answer: 0,
            explanation: "プーリングで解像度を落とすことなく、広い範囲のコンテキスト情報を集約できるため、ピクセル単位の予測タスクで有用です。"
        },
        {
            category: "グループ化畳み込み(応用)",
            question: "AlexNetやResNeXtで採用されている「Grouped Convolution」の特徴はどれか。",
            options: ["入力チャンネルをいくつかのグループに分割し、グループごとに独立して畳み込みを行う", "複数の異なるサイズのフィルタを並列に適用する", "時間の次元を含めて畳み込みを行う", "バッチごとに異なるフィルタを適用する"],
            answer: 0,
            explanation: "元々はGPUメモリの制約で分割したのが始まりですが、パラメータ削減と性能向上の効果があることが分かりました。"
        },
        {
            category: "受容野の計算(応用)",
            question: "$3 \\times 3$ の畳み込み層（ストライド1）を2層重ねたとき、最終的な出力から見た入力画像の受容野のサイズはいくつになるか。",
            options: ["$5 \\times 5$", "$3 \\times 3$", "$6 \\times 6$", "$9 \\times 9$"],
            answer: 0,
            explanation: " 1層目で3x3、2層目でさらに周囲に+1ずつ広がるため、$3+2=5$ になります。（$5 \\times 5$ の畳み込み1回と同じ受容野）"
        },
        {
            category: "プーリングの欠点(応用)",
            question: "Capsule Networkなどが指摘した、Max Poolingの欠点（失われる情報）とは何か。",
            options: ["特徴同士の相対的な位置関係（空間的配置）の情報が失われる", "色が失われる", "計算コストが高すぎる", "過学習しやすくなる"],
            answer: 0,
            explanation: "「目」と「口」があることは分かっても、その位置関係（顔として正しいか）まではプーリングによって曖昧になってしまう、という指摘です。"
        },
        {
            category: "im2colの欠点(応用)",
            question: "im2colを用いた畳み込み計算のデメリットは何か。",
            options: ["展開後の行列サイズが大きくなり、メモリ消費量が増える", "計算速度が遅くなる", "GPUで計算できない", "精度が下がる"],
            answer: 0,
            explanation: "画像を重複部分も含めて展開するため、元の画像よりもデータ量が数倍〜数十倍に膨れ上がり、メモリを圧迫します。"
        },
        {
            category: "チャンネルの意味(応用)",
            question: "CNNの中間層において、「チャンネル数」が増えていくことは何を意味していると解釈できるか。",
            options: ["抽出される特徴の種類（エッジ、テクスチャ、パーツなど）が増えていく", "画像の解像度が上がっていく", "色の情報が増えていく", "ノイズが増えていく"],
            answer: 0,
            explanation: "各チャンネル（特徴マップ）は、特定のパターン（横線、丸、顔など）に反応するフィルタの結果を表しています。"
        },
        {
            id: "cnn-convolution-value-calc",
            category: "畳み込み・積和演算（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "入力パッチ $\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$ とカーネル $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ の積和を求める。バイアスは0とする。",
            options: ["$-4$", "$-3$", "$3$", "$4$"],
            answer: 1,
            explanation: "同じ位置を掛けて足します。$1\\times1+2\\times0+3\\times0+4\\times(-1)=1-4=-3$ です。"
        },
        {
            id: "cnn-output-floor-calc",
            category: "出力サイズ・切り捨て（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "入力サイズ $H=8$、カーネル $K=3$、パディング $P=0$、ストライド $S=2$ の出力サイズはいくつか。",
            options: ["2", "4", "3", "5"],
            answer: 2,
            explanation: "$\\left\\lfloor(8-3)/2\\right\\rfloor+1=\\lfloor2.5\\rfloor+1=3$。割り切れない端は切り捨てます。"
        },
        {
            id: "cnn-dilation-effective-kernel",
            category: "Dilated Conv・実効カーネル（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "カーネルサイズ $K=3$、dilation $D=2$ の実効カーネルサイズ $K_{eff}=D(K-1)+1$ はいくつか。",
            options: ["2", "3", "4", "5"],
            answer: 3,
            explanation: "$2(3-1)+1=5$。重みは3×3のままですが、入力上では5×5の範囲を見ます。"
        },
        {
            id: "cnn-output-shape-calc",
            category: "出力テンソル形状（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "入力 $28\\times28\\times3$ に、$5\\times5$、$P=0,S=1$ のフィルタを16個適用する。出力形状はどれか。",
            options: ["$24\\times24\\times16$", "$24\\times24\\times3$", "$28\\times28\\times16$", "$16\\times16\\times24$"],
            answer: 0,
            explanation: "空間は $(28-5)+1=24$。出力チャネル数はフィルタ数16なので $24\\times24\\times16$ です。"
        },
        {
            id: "cnn-parameter-with-bias",
            category: "パラメータ数・バイアス込み（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$3\\times3$ 畳み込みで $C_{in}=3,C_{out}=8$。出力チャネルごとにバイアス1個を持つとき、総パラメータ数はいくつか。",
            options: ["216", "224", "72", "232"],
            answer: 1,
            explanation: "重みは $3\\times3\\times3\\times8=216$、バイアスは8個。合計 $216+8=224$ です。"
        },
        {
            id: "cnn-pointwise-parameter-calc",
            category: "1×1畳み込み（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "1×1畳み込みで $C_{in}=64,C_{out}=32$。バイアスを無視したパラメータ数はいくつか。",
            options: ["96", "1,024", "2,048", "4,096"],
            answer: 2,
            explanation: "$1\\times1\\times64\\times32=2,048$。空間方向ではなくチャネル方向を混ぜます。"
        },
        {
            id: "cnn-depthwise-parameter-calc",
            category: "Depthwise Conv（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$3\\times3$ Depthwise Convolutionで入力チャネル数が32、depth multiplierが1のとき、バイアスを除く重み数はいくつか。",
            options: ["32", "96", "1,024", "288"],
            answer: 3,
            explanation: "各入力チャネルに3×3カーネルを1個ずつ持つので $3\\times3\\times32=288$ です。"
        },
        {
            id: "cnn-depthwise-separable-reduction",
            category: "Depthwise Separable Conv（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "$K=3,C_{in}=32,C_{out}=64$。通常畳み込みとDepthwise Separable Convolutionの重み数の組合せはどれか。バイアスは無視する。",
            options: ["通常18,432、分離2,336", "通常2,336、分離18,432", "どちらも18,432", "通常2,048、分離288"],
            answer: 0,
            explanation: "通常畳み込みでは、1個の出力フィルタが $3\\times3$ の空間と入力32チャネルのすべてを見るため、1フィルタの重みは $3\\times3\\times32$ 個です。これを出力64チャネル分持つので、一般式 $K^2C_{in}C_{out}$ に代入して $3^2\\times32\\times64=18,432$ 個です。Depthwise Separable Convolutionはこれを2段階へ分けます。①Depthwise：入力チャネルごとに $3\\times3$ フィルタを1個使うため $3^2\\times32=288$ 個。この段階ではチャネル同士を混ぜません。②Pointwise：$1\\times1$ 畳み込みで32チャネルを混ぜて64チャネルへ変換するため $1^2\\times32\\times64=2,048$ 個。合計は $288+2,048=2,336$ 個です。したがって正解は「通常18,432、分離2,336」。空間処理とチャネル混合を分離することで、重み数は約87%削減されます。"
        },
        {
            id: "cnn-group-conv-parameter",
            category: "Grouped Conv（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "$3\\times3,C_{in}=64,C_{out}=128$ のGrouped Convolutionでグループ数 $G=8$。バイアスを除く重み数はいくつか。",
            options: ["73,728", "9,216", "8,192", "576"],
            answer: 1,
            explanation: "通常畳み込みの重み数をグループ数で割り、$3\\times3\\times64\\times128/8=9,216$ です。"
        },
        {
            id: "cnn-max-pooling-calc",
            category: "Max Pooling（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "領域 $\\begin{bmatrix}1&5\\\\3&2\\end{bmatrix}$ にMax Poolingを適用した出力はどれか。",
            options: ["1", "3", "5", "11"],
            answer: 2,
            explanation: "領域内の最大値を選ぶため5です。掛け算や平均は行いません。"
        },
        {
            id: "cnn-lp-pooling-limit",
            category: "Lp Pooling",
            difficulty: "標準",
            question: "Lp Poolingの $p$ を非常に大きくしたとき、どのPoolingに近づくか。",
            options: ["Average Pooling", "Global Average Pooling", "Min Pooling", "Max Pooling"],
            answer: 3,
            explanation: "$p$ が大きいほど大きな絶対値の影響が支配的になり、$p\\to\\infty$ でMax Poolingに近づきます。"
        },
        {
            id: "cnn-gap-output-shape",
            category: "Global Average Pooling（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$7\\times7\\times256$ の特徴マップにGlobal Average Poolingを適用した出力形状はどれか。",
            options: ["$1\\times1\\times256$", "$7\\times7\\times1$", "$1\\times1\\times1$", "$256\\times256\\times1$"],
            answer: 0,
            explanation: "まず $7\\times7\\times256$ を「高さ $H=7$・幅 $W=7$・チャネル数 $C=256$」と読みます。GAPはチャネル $c$ ごとに、$z_c=\\frac{1}{7\\times7}\\sum_{i=1}^{7}\\sum_{j=1}^{7}x_{i,j,c}$ を計算します。つまり、1チャネルにある $7\\times7=49$ 個の値を1個の平均値へまとめます。この処理を256チャネルそれぞれに行うため、高さと幅は $1\\times1$ になりますが、チャネル数256は変わりません。したがって出力は $1\\times1\\times256$ です。チャネル同士を平均して1チャネルにする処理ではないため、$7\\times7\\times1$ や $1\\times1\\times1$ にはなりません。"
        },
        {
            id: "cnn-receptive-field-stride",
            category: "受容野とstride（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "受容野1から開始し、$3\\times3$ Conv（S=1）→$2\\times2$ Pool（S=2）→$3\\times3$ Conv（S=1）を通る。最終受容野の一辺はいくつか。",
            options: ["6", "8", "9", "10"],
            answer: 1,
            explanation: "受容野 $r$ と入力上の間隔 $j$ を使います。開始 $(r,j)=(1,1)$ → Conv $(3,1)$ → Pool $(4,2)$ → Conv $(8,2)$ です。"
        },
        {
            id: "cnn-equivariance-invariance",
            category: "移動等変性と不変性",
            difficulty: "応用",
            question: "畳み込みとPoolingの位置ずれに対する性質として最も適切なものはどれか。",
            options: ["畳み込みもPoolingも完全に不変", "畳み込みは位置情報を全て消す", "畳み込みは移動等変性を持ち、Poolingは局所的な移動不変性を強める", "Poolingは位置ずれを増幅する"],
            answer: 2,
            explanation: "入力が移動すると特徴マップの反応位置も移動するのが等変性です。Poolingは近傍をまとめ、小さな位置ずれの影響を弱めます。"
        },
        {
            id: "cnn-im2col-shape",
            category: "im2col・行列形状（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "1チャネルの $5\\times5$ 入力へ、$3\\times3,P=0,S=1$ のim2colを行う。1行を1パッチとすると行列形状はどれか。",
            options: ["$5\\times5$", "$3\\times3$", "$25\\times9$", "$9\\times9$"],
            answer: 3,
            explanation: "出力位置は $3\\times3=9$ 個なので9行。各パッチは $3\\times3=9$ 要素なので9列です。"
        },
        {
            id: "cnn-multi-channel-convolution",
            category: "複数入力チャネル",
            difficulty: "標準",
            question: "通常の畳み込みで1枚の出力特徴マップを作るとき、複数の入力チャネルはどう扱われるか。",
            options: ["各入力チャネルとの畳み込み結果を足し合わせ、必要ならバイアスを加える", "入力チャネルを1つだけ選ぶ", "入力チャネル数だけ空間サイズを広げる", "チャネルごとの結果を必ず別出力にする"],
            answer: 0,
            explanation: "1つのフィルタは全入力チャネル分の厚みを持ちます。各チャネルの積和結果を合計して1枚の特徴マップを作ります。"
        },
        {
            id: "cnn-transposed-convolution",
            category: "Transposed Convolution",
            difficulty: "標準",
            question: "Transposed Convolutionの説明として正しいものはどれか。",
            options: ["元画像を完全に復元する厳密な逆演算", "学習可能なアップサンプリングであり、通常の畳み込みの厳密な逆演算ではない", "必ず空間サイズを半分にする", "学習パラメータを持たない"],
            answer: 1,
            explanation: "畳み込みを行列とみなしたときの転置に対応する演算です。解像度を上げられますが、失われた情報を必ず復元できるわけではありません。"
        },
        {
            id: "cnn-same-padding",
            category: "Same Padding（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "奇数カーネル $K=5$、stride $S=1$ で空間サイズを保つSame Paddingの片側パディング $P$ はいくつか。",
            options: ["0", "1", "2", "4"],
            answer: 2,
            explanation: "$P=(K-1)/2=(5-1)/2=2$。上下左右へ2ピクセルずつ追加します。"
        },
        {
            id: "cnn-pooling-parameters",
            category: "Pooling・パラメータ数",
            difficulty: "標準",
            question: "一般的なMax Pooling層が持つ学習パラメータ数はいくつか。",
            options: ["カーネル面積と同じ", "入力チャネル数と同じ", "出力チャネル数と同じ", "0"],
            answer: 3,
            explanation: "Max Poolingは決められた領域から最大値を選ぶ処理であり、学習する重みやバイアスを持ちません。"
        },
        {
            id: "cnn-nchw-output-shape",
            category: "NCHW形状（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "NCHW形式で入力が $(8,3,32,32)$。$3\\times3,P=1,S=1,C_{out}=16$ の畳み込み後の形状はどれか。",
            options: ["$(8,16,32,32)$", "$(8,3,30,30)$", "$(16,8,32,32)$", "$(8,32,32,16)$"],
            answer: 0,
            explanation: "NCHWは（画像の枚数・チャネル数・高さ・幅）の順です。① $N=8$：畳み込みでは画像の枚数は変わりません。② $C=C_{out}=16$：出力フィルタ16個が16枚の特徴マップを作ります。③ $H,W$：出力サイズの式 $\\lfloor(H+2P-K)/S\\rfloor+1$ を使い、$\\lfloor(32+2\\times1-3)/1\\rfloor+1=32$。したがってNCHW順に並べると $(8,16,32,32)$ です。"
        },

        // ---------------------------------------------------------
        // 【代表CNNモデル対策】 Q41 - Q60
        // ---------------------------------------------------------
        {
            id: "cnn-alexnet-layer-count",
            category: "AlexNet（構造）",
            difficulty: "標準",
            question: "AlexNetの基本構成として正しいものはどれか。",
            options: ["畳み込み5層と全結合3層", "畳み込み16層のみ", "Residual Blockを50層", "Inception Moduleを22個"],
            answer: 0,
            explanation: "AlexNetは学習可能な層としてConv 5層＋FC 3層の8層構成です。ResNetのSkip ConnectionやGoogLeNetのInceptionはまだ使いません。"
        },
        {
            id: "cnn-alexnet-techniques",
            category: "AlexNet（技術）",
            difficulty: "標準",
            question: "AlexNetで画像認識性能の向上に寄与した技術の組合せとして最も適切なものはどれか。",
            options: ["Sigmoid・Layer Norm・Self-Attention", "ReLU・Data Augmentation・Dropout・GPU学習", "LSTM・Teacher Forcing・CTC", "Residual Connection・Dense Connection"],
            answer: 1,
            explanation: "AlexNetはReLUで学習を高速化し、Data AugmentationとFC層のDropoutで過学習を抑え、大規模なGPU学習を成功させました。"
        },
        {
            id: "cnn-alexnet-first-conv",
            category: "AlexNet（構造）",
            difficulty: "応用",
            question: "AlexNetの最初の畳み込み層として代表的な設定はどれか。",
            options: ["$3×3$、stride 1", "$1×1$、stride 1", "$11×11$、stride 4", "$7×7$、stride 7"],
            answer: 2,
            explanation: "AlexNetの先頭は大きな$11×11$カーネルをstride 4で適用し、早い段階で空間サイズを縮小します。後年のVGGは小さな3×3の積層を重視しました。"
        },
        {
            id: "cnn-alexnet-group-origin",
            category: "AlexNet（Grouped Conv）",
            difficulty: "応用",
            question: "AlexNetでGrouped Convolutionが導入された当初の主な理由はどれか。",
            options: ["異なる大きさのカーネルを並列化するため", "未来の特徴をマスクするため", "画像を時系列として処理するため", "モデルを2台のGPUへ分割してメモリ制約に対応するため"],
            answer: 3,
            explanation: "当初はネットワークを2GPUへ分ける実装上の理由でした。後のResNeXtではGrouped Convを、cardinalityを増やす設計として積極的に利用します。"
        },
        {
            id: "cnn-vgg-design",
            category: "VGG（設計）",
            difficulty: "標準",
            question: "VGGNetの設計思想として最も適切なものはどれか。",
            options: ["小さな$3×3$畳み込みを繰り返して深層化する", "複数分岐をcardinalityとして集約する", "全畳み込みをDepthwise Convへ置き換える", "再帰結合で系列を処理する"],
            answer: 0,
            explanation: "VGG-16/19はほぼ一様な3×3 Convを積み重ねる単純な設計です。「小さいカーネルを深く」が合言葉です。"
        },
        {
            id: "cnn-vgg-receptive-field",
            category: "VGG（受容野計算）",
            kind: "計算",
            difficulty: "標準",
            question: "stride 1の$3×3$畳み込みを2層重ねたときの受容野は、1層のどのカーネルと同じか。",
            options: ["$3×3$", "$5×5$", "$6×6$", "$9×9$"],
            answer: 1,
            explanation: "1層目で3、2層目で左右へ1ずつ広がるため$3+2=5$です。VGGは大きなカーネルを小さな3×3の積層で置き換えます。"
        },
        {
            id: "cnn-vgg-parameter-comparison",
            category: "VGG（パラメータ計算）",
            kind: "計算",
            difficulty: "応用",
            question: "入出力チャネル数をともに$C$、バイアスなしとする。$5×5$ Conv 1層と$3×3$ Conv 2層の重み数はそれぞれどれか。",
            options: ["$5C^2$ と $6C^2$", "$25C$ と $18C$", "$25C^2$ と $18C^2$", "どちらも$25C^2$"],
            answer: 2,
            explanation: "$5×5$は$25C^2$。$3×3$を2層なら$2×9C^2=18C^2$です。同じ5×5受容野で重みを減らし、活性化を2回入れられます。"
        },
        {
            id: "cnn-inception-parallel",
            category: "GoogLeNet（Inception）",
            difficulty: "標準",
            question: "GoogLeNetのInception Moduleの特徴はどれか。",
            options: ["入力と出力を必ず要素ごとに加算する", "全チャネルを独立に畳み込む", "1種類の11×11畳み込みだけを使う", "1×1・3×3・5×5畳み込みやPoolingを並列に行い、出力を連結する"],
            answer: 3,
            explanation: "異なるサイズの受容野を持つ分岐を並列処理し、結果をチャネル方向へConcatします。"
        },
        {
            id: "cnn-inception-one-by-one",
            category: "GoogLeNet（1×1 Conv）",
            difficulty: "応用",
            question: "Inception Moduleで高価な3×3・5×5畳み込みの前に1×1畳み込みを置く主な目的はどれか。",
            options: ["入力チャネルを減らして後続の計算量を抑える", "空間サイズを必ず2倍にする", "Residual加算の形を合わせるだけ", "時系列方向の情報を混ぜる"],
            answer: 0,
            explanation: "1×1 Convで$C_{in}$を圧縮してから大きいカーネルを適用すると、空間サイズを保ちながらパラメータ数と演算量を削減できます。"
        },
        {
            id: "cnn-googlenet-auxiliary",
            category: "GoogLeNet（Auxiliary Classifier）",
            difficulty: "応用",
            question: "元のGoogLeNetで中間層にAuxiliary Classifierを置いた主な狙いはどれか。",
            options: ["推論時に必ず3モデルの多数決を行う", "学習時に中間層へ勾配を届けやすくし、正則化も促す", "入力画像を3倍に増やす", "Grouped Convのグループ数を決める"],
            answer: 1,
            explanation: "中間出力にも補助損失を与え、深いネットワークの学習を助けます。通常、推論時の主出力は最終分類器を使います。"
        },
        {
            id: "cnn-resnext-cardinality",
            category: "ResNeXt（Cardinality）",
            difficulty: "標準",
            question: "ResNeXtにおけるcardinalityが表すものはどれか。",
            options: ["ネットワークの総層数", "入力画像の解像度", "クラス数", "並列な変換経路またはグループの数"],
            answer: 3,
            explanation: "ResNeXtは幅や深さだけでなく、同形の変換を何本並列にするかというcardinalityを性能向上の軸にしました。"
        },
        {
            id: "cnn-resnext-pattern",
            category: "ResNeXt（構造）",
            difficulty: "応用",
            question: "ResNeXtの基本的な設計を表す言葉はどれか。",
            options: ["Split–Transform–Merge", "Encode–Attend–Decode", "Depthwise–Pointwise–Softmax", "Mask–Predict–Pool"],
            answer: 0,
            explanation: "入力を複数経路へ分け、同形の変換を行い、結果を集約します。Grouped Convolutionにより効率よく表現できます。"
        },
        {
            id: "cnn-densenet-concat",
            category: "DenseNet（接続）",
            difficulty: "標準",
            question: "DenseNetとResNetの接続方法の違いとして正しいものはどれか。",
            options: ["DenseNetはAddし、ResNetはConcatする", "DenseNetはチャネル方向にConcatし、ResNetは要素ごとにAddする", "両方とも必ず掛け算する", "両方とも接続を持たない"],
            answer: 1,
            explanation: "DenseNetは過去の特徴マップを連結して再利用するためチャネル数が増えます。ResNetは同じ形状の特徴を足すため、加算自体ではチャネル数は増えません。"
        },
        {
            id: "cnn-mobilenet-v2",
            category: "MobileNetV2",
            difficulty: "応用",
            question: "MobileNetV2の代表的な構成要素はどれか。",
            options: ["Inception ModuleとAuxiliary Classifier", "Dense ConnectionとGrowth Rate", "Inverted ResidualとLinear Bottleneck", "11×11 ConvとLRN"],
            answer: 2,
            explanation: "低次元入力を1×1で拡張し、Depthwise Convで処理して、線形な1×1で低次元へ戻します。狭い層同士をShortcutで接続します。"
        },
        {
            id: "cnn-efficientnet-scaling",
            category: "EfficientNet",
            difficulty: "標準",
            question: "EfficientNetのCompound Scalingで同時に調整する3要素はどれか。",
            options: ["学習率・バッチサイズ・エポック数", "カーネル・パディング・ストライド", "Precision・Recall・F値", "ネットワークの深さ・幅・入力解像度"],
            answer: 3,
            explanation: "depth・width・resolutionを一定の複合係数に基づいてバランスよく拡大します。どれか1つだけを増やす設計ではありません。"
        }
    ]
};
