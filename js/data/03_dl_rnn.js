window.quizData = {
    title: "3-（５）RNN：系列データと自然言語処理",
    
    cheatSheet: `
        <style>
            .rnn-flow { display: flex; align-items: center; justify-content: center; gap: 5px; background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; overflow-x: auto; }
            .rnn-step { border: 2px solid #333; padding: 5px; background: white; border-radius: 5px; text-align: center; width: 60px; font-size: 0.8em; position: relative; }
            .rnn-arrow { color: #555; font-weight: bold; font-size: 1.2em; }
            .hidden-state { background-color: #eafaf1; border-color: #27ae60; color: #27ae60; font-weight: bold; padding: 2px; margin-top: 5px; border-radius: 3px; }
            .time-label { position: absolute; top: -20px; left: 0; width: 100%; font-size: 0.7em; color: #999; }
            
            .lstm-box { border: 2px solid #3498db; background: #ebf5fb; padding: 10px; border-radius: 8px; margin: 5px; width: 45%; vertical-align: top; display: inline-block; }
            .gate-icon { display: inline-block; width: 20px; height: 20px; line-height: 20px; border-radius: 50%; background: #333; color: white; font-size: 0.7em; text-align: center; margin: 2px; }
            
            .seq-container { display: flex; justify-content: center; align-items: center; background: #fff; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 10px; }
            .box-enc { background: #fef9e7; border: 2px solid #f39c12; padding: 10px; border-radius: 5px; text-align: center; }
            .box-dec { background: #fceceb; border: 2px solid #e74c3c; padding: 10px; border-radius: 5px; text-align: center; }
            .context-vec { background: #333; color: #fff; padding: 5px 10px; border-radius: 20px; font-size: 0.8em; margin: 0 10px; }
            .attention-line { border-top: 2px dashed #e74c3c; width: 100%; margin-top: 5px; position: relative; }
            .attention-text { position: absolute; top: -12px; left: 35%; background: #fff; font-size: 0.7em; color: #e74c3c; padding: 0 5px; }

            .table-wrap { overflow-x: auto; }
            .term-map { border: 1px dashed #666; padding: 10px; background: #fff; border-radius: 5px; margin-top: 20px; }
            .rnn-exam-core { margin: 12px 0 20px; padding: 14px 16px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .rnn-formula { margin: 7px 0; padding: 9px 11px; border: 1px solid #c8dbee; border-radius: 8px; background: #f3f8fd; color: #123f68; text-align: center; overflow-x: auto; }
            .rnn-formula mjx-container { margin: 0 !important; }
            .rnn-concept-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 12px 0 20px; }
            .rnn-concept-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 10px; background: #fff; text-align: center; }
            .rnn-concept-card > strong { display: block; color: #123f68; }
            .rnn-concept-svg { display: block; width: 100%; max-width: 320px; height: 125px; margin: 5px auto 8px; }
            .rnn-concept-caption { font-size: 0.86em; line-height: 1.55; color: #334e68; }
            .rnn-svg-label { font-size: 11px; fill: #334e68; font-weight: 700; }
            .rnn-svg-note { font-size: 9px; fill: #627d98; }
            .rnn-answer { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #27ae60; border-radius: 7px; background: #eafaf1; line-height: 1.7; }
            .rnn-warning { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #e74c3c; border-radius: 7px; background: #fff3f1; line-height: 1.7; }
            .rnn-comparison td:nth-child(3) { min-width: 300px; }
            .rnn-model-table { min-width: 840px; }
            .rnn-model-table td:nth-child(4) { min-width: 290px; }
            .rnn-model-timeline { display: flex; gap: 8px; margin: 12px 0 20px; padding: 4px 2px 10px; overflow-x: auto; }
            .rnn-model-year { flex: 0 0 128px; padding: 10px 8px; border-top: 5px solid #8e44ad; border-radius: 8px; background: #f7f1fa; text-align: center; }
            .rnn-model-year strong { display: block; margin: 2px 0 5px; color: #50305e; }
            .rnn-model-year small { display: block; line-height: 1.45; color: #627d98; }
            .rnn-model-key { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #8e44ad; border-radius: 7px; background: #f7f1fa; line-height: 1.7; }
            .rnn-read-guide { margin: 12px 0 20px; padding: 14px 16px; border: 1px solid #c8dbee; border-radius: 10px; background: #f8fbfe; }
            .rnn-read-row { display: grid; grid-template-columns: 2.2em 1fr; gap: 8px; align-items: start; margin: 7px 0; line-height: 1.65; }
            .rnn-read-number { display: inline-flex; align-items: center; justify-content: center; width: 1.8em; height: 1.8em; border-radius: 50%; background: #2780b8; color: #fff; font-weight: 800; }
            .rnn-shift-line { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 8px 0; }
            .rnn-shift-token { min-width: 45px; padding: 5px 8px; border: 1px solid #9fb3c8; border-radius: 6px; background: #fff; text-align: center; }
            @media (max-width: 760px) {
                .rnn-concept-grid { grid-template-columns: 1fr; }
                .lstm-box { display: block; width: auto; margin: 8px 0; }
            }
        </style>

        <h3>■ 2026シラバス：まずこの3本</h3>
        <div class="rnn-exam-core">
            <strong>① RNN本体：</strong>現在の入力と前の隠れ状態から $h_t$ を計算し、時間方向へ重みを共有する。<br>
            <strong>② 長期記憶：</strong>BPTTの勾配消失・爆発を理解し、LSTMとGRUのゲートを見分ける。<br>
            <strong>③ 系列変換：</strong>Encoder–Decoder、Seq2Seq、Attentionの情報の流れを追う。<br>
            <strong>解く順：</strong>「何が入力か」→「どの状態を引き継ぐか」→「どのゲート・重みで更新するか」。
        </div>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>学習項目</th><th>必須キーワード</th><th>一言で見分ける</th></tr>
                <tr><td>計算</td><td>順伝播・BPTT</td><td>前向きは状態更新、逆向きは時間を遡ってヤコビアンを連続で掛ける。</td></tr>
                <tr><td>構造</td><td>双方向RNN・LSTM・GRU</td><td>双方向は未来も参照。LSTMはセル＋3ゲート、GRUは隠れ状態＋2ゲート。</td></tr>
                <tr><td>系列変換</td><td>Encoder–Decoder・Seq2Seq・Attention</td><td>入力を符号化して出力を生成。Attentionは毎時刻、入力側の重要箇所を重み付き平均。</td></tr>
            </table>
        </div>

        <h3>■ RNNの仕組み：時間を展開する</h3>
        <p>RNNは、自身へのループ構造を持つネットワークです。<br>学習時は時間を遡って誤差を伝えます (<strong>BPTT</strong>)。</p>
        
        <div class="rnn-flow">
            <div class="rnn-step">
                <div class="time-label">t-1</div>
                $x_{t-1}$<br>↓<br><div class="hidden-state">$h_{t-1}$</div>
            </div>
            <div class="rnn-arrow">→</div>
            <div class="rnn-step">
                <div class="time-label">t (現在)</div>
                $x_t$<br>↓<br><div class="hidden-state">$h_t$</div><br>↓<br>$y_t$
            </div>
            <div class="rnn-arrow">→</div>
            <div class="rnn-step">
                <div class="time-label">t+1</div>
                $x_{t+1}$<br>↓<br><div class="hidden-state">$h_{t+1}$</div>
            </div>
        </div>
        <p style="font-size:0.8em; text-align:center;">
            前の時間の隠れ状態 $h_{t-1}$ が、現在の入力 $x_t$ と一緒に計算に使われます。<br>
            <strong>「過去の記憶を引き継ぐ」</strong>仕組みです。
        </p>

        <h3>■ 順伝播：1時刻の計算式</h3>
        <div class="rnn-formula">$\\displaystyle a_t=W_{xh}x_t+W_{hh}h_{t-1}+b_h$</div>
        <div class="rnn-formula">$\\displaystyle h_t=\\tanh(a_t),\\qquad \\hat y_t=\\mathrm{softmax}(W_{hy}h_t+b_y)$</div>
        <p><strong>意味：</strong>$W_{xh}x_t$ は「現在の入力」、$W_{hh}h_{t-1}$ は「過去の記憶」。両方を足して新しい隠れ状態を作ります。</p>
        <div class="rnn-answer">
            <strong>小さな計算例：</strong>$x_t=2,h_{t-1}=1,W_{xh}=0.5,W_{hh}=0.2,b_h=0$ なら、<br>
            $a_t=0.5\\times2+0.2\\times1=1.2$、したがって $h_t=\\tanh(1.2)\\approx0.834$。
        </div>

        <div class="rnn-concept-grid">
            <div class="rnn-concept-card">
                <strong>時間が違っても同じ重み</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="RNNは各時刻で同じ重みを共有する">
                    <g fill="#eafaf1" stroke="#27ae60" stroke-width="2"><rect x="18" y="42" width="54" height="36" rx="6"/><rect x="103" y="42" width="54" height="36" rx="6"/><rect x="188" y="42" width="54" height="36" rx="6"/></g>
                    <g class="rnn-svg-label"><text x="35" y="64">h₁</text><text x="120" y="64">h₂</text><text x="205" y="64">h₃</text></g>
                    <path d="M73 60 H100 M158 60 H185" stroke="#627d98" stroke-width="2"/>
                    <g fill="#627d98"><path d="M100 60 l-7 -5 v10 z"/><path d="M185 60 l-7 -5 v10 z"/></g>
                    <g fill="#eef7fb" stroke="#2780b8"><circle cx="45" cy="18" r="13"/><circle cx="130" cy="18" r="13"/><circle cx="215" cy="18" r="13"/></g>
                    <g class="rnn-svg-note"><text x="39" y="21">x₁</text><text x="124" y="21">x₂</text><text x="209" y="21">x₃</text></g>
                    <path d="M45 31 V40 M130 31 V40 M215 31 V40" stroke="#2780b8"/>
                    <text x="38" y="98" class="rnn-svg-note">同じ Wxh・Whh を全時刻で再利用</text>
                    <path d="M55 87 H205" stroke="#f39c12" stroke-width="3" stroke-dasharray="5,3"/>
                </svg>
                <div class="rnn-concept-caption">系列が長くなっても、<strong>時刻ごとに別の重みは作らない</strong>。</div>
            </div>
            <div class="rnn-concept-card">
                <strong>BPTT：掛け算が続く</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="BPTTでは勾配倍率が時間方向に繰り返し掛かり消失または爆発する">
                    <text x="15" y="16" class="rnn-svg-label">消失：0.5を4回</text>
                    <g fill="#2780b8"><circle cx="25" cy="42" r="7"/><circle cx="65" cy="42" r="5"/><circle cx="105" cy="42" r="4"/><circle cx="145" cy="42" r="3"/><circle cx="185" cy="42" r="2"/></g>
                    <text x="203" y="45" class="rnn-svg-note">0.5⁴=0.0625</text>
                    <path d="M33 42 H57 M72 42 H98 M111 42 H139 M150 42 H180" stroke="#627d98"/>
                    <text x="15" y="76" class="rnn-svg-label">爆発：1.5を4回</text>
                    <g fill="#e74c3c"><circle cx="25" cy="102" r="3"/><circle cx="65" cy="102" r="4"/><circle cx="105" cy="102" r="6"/><circle cx="145" cy="102" r="9"/><circle cx="190" cy="102" r="14"/></g>
                    <text x="210" y="106" class="rnn-svg-note">1.5⁴≈5.06</text>
                </svg>
                <div class="rnn-concept-caption">小さい積は<strong>勾配消失</strong>、大きい積は<strong>勾配爆発</strong>。爆発には勾配クリッピング。</div>
            </div>
        </div>

        <h3>■ パラメータ数：時間長は掛けない</h3>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>セル</th><th>再帰部分のパラメータ数</th><th>理由</th></tr>
                <tr><td>単純RNN</td><td>$H(D+H+1)$</td><td>入力 $HD$ ＋ 再帰 $H^2$ ＋ バイアス $H$。</td></tr>
                <tr><td>LSTM</td><td>$4H(D+H+1)$</td><td>忘却・入力・出力・候補セルの4組。</td></tr>
                <tr><td>GRU</td><td>$3H(D+H+1)$</td><td>更新・リセット・候補状態の3組。</td></tr>
            </table>
        </div>
        <p style="font-size:0.82em;">※上式は各変換にバイアス1組とする試験の標準形。実装や問題文でバイアスを分けて定義する場合は、その指定に従います。</p>
        <div class="rnn-warning">
            <strong>試験の罠：</strong>系列長 $T$ はパラメータ数に掛けない。同じ重みを全時刻で共有するため。出力層まで数える問題では、さらに $OH+O$ を加える。
        </div>

        <h3>■ 入出力パターンはタスクで見分ける</h3>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>型</th><th>代表例</th><th>イメージ</th></tr>
                <tr><td><strong>Many-to-One</strong></td><td>感情分析・系列分類</td><td>単語列を最後に1つのラベルへまとめる。</td></tr>
                <tr><td><strong>One-to-Many</strong></td><td>画像キャプション</td><td>1つの入力から文章を順番に生成する。</td></tr>
                <tr><td><strong>Many-to-Many（同じ長さ）</strong></td><td>品詞推定・系列ラベリング</td><td>各入力時刻に対応する出力を返す。</td></tr>
                <tr><td><strong>Seq2Seq（長さが異なる）</strong></td><td>翻訳・要約</td><td>Encoderで読んでからDecoderが別の系列を生成する。</td></tr>
            </table>
        </div>

        <h3>■ 自然言語をRNNへ入れるまで</h3>
        <div class="rnn-concept-card">
            <svg class="rnn-concept-svg" viewBox="0 0 300 125" role="img" aria-label="文章をトークン化してIDと埋め込みベクトルへ変換しRNNへ入力する流れ">
                <rect x="5" y="42" width="50" height="35" rx="5" fill="#fff8e7" stroke="#f39c12"/><text x="15" y="63" class="rnn-svg-label">文章</text>
                <path d="M57 60 H78" stroke="#627d98" stroke-width="2"/><path d="M78 60 l-6 -4 v8 z" fill="#627d98"/>
                <rect x="81" y="36" width="60" height="47" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="89" y="55" class="rnn-svg-note">Tokenize</text><text x="92" y="70" class="rnn-svg-note">[私, は, 猫]</text>
                <path d="M143 60 H163" stroke="#627d98" stroke-width="2"/><path d="M163 60 l-6 -4 v8 z" fill="#627d98"/>
                <rect x="166" y="36" width="54" height="47" rx="5" fill="#f4ecf7" stroke="#8e44ad"/><text x="177" y="55" class="rnn-svg-note">Embedding</text><text x="176" y="70" class="rnn-svg-note">密なベクトル</text>
                <path d="M222 60 H242" stroke="#627d98" stroke-width="2"/><path d="M242 60 l-6 -4 v8 z" fill="#627d98"/>
                <rect x="245" y="36" width="48" height="47" rx="5" fill="#eafaf1" stroke="#27ae60"/><text x="258" y="63" class="rnn-svg-label">RNN</text>
                <text x="75" y="107" class="rnn-svg-note">可変長はPaddingし、損失ではMaskして無視</text>
            </svg>
            <div class="rnn-concept-caption">RNNへ文字列を直接入れない。<strong>トークンID → 埋め込みベクトル</strong>へ変換する。</div>
        </div>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>項目</th><th>役割</th><th>試験のツボ</th></tr>
                <tr><td><strong>One-hot</strong></td><td>語彙中の1箇所だけ1</td><td>高次元・疎。単語間の類似度を直接表さない。</td></tr>
                <tr><td><strong>Embedding</strong></td><td>単語IDを低次元の密ベクトルへ変換</td><td>語彙数 $V$、埋め込み次元 $E$ ならパラメータ数は $VE$。</td></tr>
                <tr><td><strong>Padding / Mask</strong></td><td>系列長をそろえ、ダミー部分を無視</td><td>Padding部分を損失・Attentionの計算対象から除外する。</td></tr>
                <tr><td><strong>次トークン予測</strong></td><td>過去のトークンから次を予測</td><td>入力と正解を1トークンずらす。</td></tr>
            </table>
        </div>

        <h3>■ LSTM vs GRU (記憶の保持)</h3>
        <p>単純RNNは長い系列で勾配消失・爆発が起きやすい。LSTMとGRUは、ゲートで「残す・忘れる・書く」を制御して長期依存を扱いやすくします。</p>
        <div style="text-align:center;">
            <div class="lstm-box">
                <strong>LSTM</strong><br>
                <span style="font-size:0.8em; color:#3498db;">セル (Cell) + 3つのゲート</span>
                <hr style="border:0; border-top:1px solid #abd2ef; margin:5px 0;">
                <div style="text-align:left; font-size:0.8em;">
                    <span class="gate-icon">C</span> <strong>セル状態</strong>: 記憶のベルトコンベア（勾配を保ちやすい）<br>
                    <span class="gate-icon">F</span> <strong>忘却</strong>: いらない記憶を消す<br>
                    <span class="gate-icon">I</span> <strong>入力</strong>: 新しい情報を足す<br>
                    <span class="gate-icon">O</span> <strong>出力</strong>: 次に伝える情報を選ぶ
                </div>
            </div>
            <div class="lstm-box" style="border-color:#e67e22; background:#fdf2e9;">
                <strong>GRU</strong><br>
                <span style="font-size:0.8em; color:#e67e22;">隠れ状態のみ + 2つのゲート</span>
                <hr style="border:0; border-top:1px solid #fadbd8; margin:5px 0;">
                <div style="text-align:left; font-size:0.8em;">
                    <br>
                    <span class="gate-icon" style="background:#e67e22;">R</span> <strong>リセット</strong>: 過去を無視する<br>
                    <span class="gate-icon" style="background:#e67e22;">Z</span> <strong>更新</strong>: LSTMの入力+忘却を統合<br>
                    <br>
                    ※パラメータが少なく計算が速い
                </div>
            </div>
        </div>

        <h4>LSTMの更新式：過去を残して、新情報を足す</h4>
        <div class="rnn-formula">$\\displaystyle c_t=\\underbrace{f_t\\odot c_{t-1}}_{\\text{過去を残す}}+\\underbrace{i_t\\odot\\tilde c_t}_{\\text{新情報を書く}}$</div>
        <div class="rnn-formula">$\\displaystyle h_t=o_t\\odot\\tanh(c_t)$</div>
        <p>ゲート $f_t,i_t,o_t$ はシグモイドで $0$〜$1$。候補 $\\tilde c_t$ は通常tanhです。セル状態は<strong>加算型</strong>で更新されるため、単純RNNより勾配を長く伝えやすくなります。</p>
        <div class="rnn-answer">
            <strong>計算例：</strong>$f_t=0.8,c_{t-1}=2,i_t=0.5,\\tilde c_t=0.4$ なら、<br>
            $c_t=0.8\\times2+0.5\\times0.4=1.6+0.2=1.8$。
        </div>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>比較</th><th>LSTM</th><th>GRU</th></tr>
                <tr><td>状態</td><td>$c_t$ と $h_t$</td><td>$h_t$ のみ</td></tr>
                <tr><td>ゲート</td><td>忘却・入力・出力の3つ</td><td>更新・リセットの2つ</td></tr>
                <tr><td>パラメータ</td><td>多い（4組の変換）</td><td>少ない（3組の変換）</td></tr>
                <tr><td>見分け方</td><td>セル状態の横の流れがある</td><td>独立セルがなく、更新ゲートで新旧を混ぜる</td></tr>
            </table>
        </div>

        <h3>■ Seq2Seq と Attention (翻訳モデル)</h3>
        <p>「Encoder」で読み込み、「Decoder」で生成します。</p>
        
        <div class="seq-container">
            <div class="box-enc">
                Encoder<br>
                <small>入力: "I am a cat"</small>
            </div>
            <div class="context-vec">
                Context<br>
                Vector
            </div>
            <div class="box-dec">
                Decoder<br>
                <small>出力: "吾輩は猫..."</small>
            </div>
        </div>
        
        <div style="margin-top:10px; background:#f9f9f9; padding:10px; border-radius:5px;">
            <strong>Attention (注意機構) の追加</strong>
            <div class="attention-line">
                <span class="attention-text">直接参照 (近道)</span>
            </div>
            <p style="font-size:0.8em; margin-top:5px;">
                Decoderが単語を生成するたびに、Encoderの<strong>「どの単語を見るべきか」</strong>を計算して、必要な情報を直接つまみ食いする仕組み。<br>
                → 固定長ベクトルだけに圧縮する場合より、長い文章の情報を保ちやすい。
            </p>
        </div>

        <h4>Attentionの3手順</h4>
        <div class="rnn-formula">$\\displaystyle e_{t,s}=\\mathrm{score}(s_{t-1},h_s)$</div>
        <div class="rnn-formula">$\\displaystyle \\alpha_{t,s}=\\mathrm{softmax}(e_{t,s}),\\qquad c_t=\\sum_s\\alpha_{t,s}h_s$</div>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>手順</th><th>すること</th><th>試験で見る点</th></tr>
                <tr><td>① Score</td><td>Decoder状態と各Encoder状態の相性を計算</td><td>内積・加法など。まだ確率ではない。</td></tr>
                <tr><td>② Softmax</td><td>スコアを注目度 $\\alpha$ へ変換</td><td>$\\alpha$ は非負で、入力方向の合計が1。</td></tr>
                <tr><td>③ Weighted Sum</td><td>Encoder状態の重み付き和 $c_t$ を作る</td><td>生成する単語ごとに文脈ベクトルが変わる。</td></tr>
            </table>
        </div>
        <div class="rnn-answer">
            <strong>計算例：</strong>$\\alpha=(0.25,0.75)$、$h_1=(2,0),h_2=(0,4)$ なら、<br>
            $c=0.25(2,0)+0.75(0,4)=(0.5,3)$。
        </div>

        <h3>■ モデル図の読み方／試験で見る場所</h3>
        <div class="rnn-read-guide">
            <div class="rnn-read-row"><span class="rnn-read-number">1</span><span><strong>矢印の向き：</strong>$\\rightarrow$ は左から右、$\\leftarrow$ は右から左。各方向がどこまで読んだ状態かを確認する。</span></div>
            <div class="rnn-read-row"><span class="rnn-read-number">2</span><span><strong>出力する範囲：</strong>各時刻なら $[\\overrightarrow h_t;\\overleftarrow h_t]$、系列を1個にまとめるなら $[\\overrightarrow h_T;\\overleftarrow h_1]$。</span></div>
            <div class="rnn-read-row"><span class="rnn-read-number">3</span><span><strong>結合方法：</strong>Concatなら次元は足す。各方向64次元なら $64+64=128$ 次元。</span></div>
            <div class="rnn-read-row"><span class="rnn-read-number">4</span><span><strong>Decoderの入力：</strong>学習時は正解列を1個右へずらしてBOSを置く。推論時は直前の予測を入れる。</span></div>
        </div>

        <h3>■ 学習時と推論時：ここが混乱ポイント</h3>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>場面</th><th>Decoderへ入れる前トークン</th><th>結果</th></tr>
                <tr><td><strong>学習時：Teacher Forcing</strong></td><td>正解トークン</td><td>学習が安定しやすい。</td></tr>
                <tr><td><strong>推論時：自己回帰生成</strong></td><td>モデル自身が直前に予測したトークン</td><td>誤りが次の入力へ入り、連鎖しうる。</td></tr>
                <tr><td><strong>Exposure Bias</strong></td><td>学習と推論の入力条件が異なる</td><td>Teacher Forcingの副作用として問われる。</td></tr>
            </table>
        </div>

        <div class="rnn-read-guide">
            <strong>Teacher Forcingの右シフト例</strong>
            <div class="rnn-shift-line"><span style="min-width:5.5em;"><strong>正解列：</strong></span><span class="rnn-shift-token">私</span><span class="rnn-shift-token">は</span><span class="rnn-shift-token">猫</span><span class="rnn-shift-token">EOS</span></div>
            <div class="rnn-shift-line"><span style="min-width:5.5em;"><strong>Decoder入力：</strong></span><span class="rnn-shift-token" style="background:#f7f1fa;">BOS</span><span class="rnn-shift-token">私</span><span class="rnn-shift-token">は</span><span class="rnn-shift-token">猫</span></div>
            <small><strong>見る場所：</strong>同じ列で「入力から次の正解を予測」する。学習時は正解を入れられるが、推論時は正解がないため自分の予測を戻す。この差がExposure Biasです。</small>
        </div>

        <h3>■ 双方向RNN：未来も使えるが、未来待ち</h3>
        <div class="rnn-concept-grid">
            <div class="rnn-concept-card">
                <strong>順方向＋逆方向を結合</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 260 125" role="img" aria-label="双方向RNNは順方向と逆方向の隠れ状態を結合する">
                    <g fill="#eef7fb" stroke="#2780b8"><circle cx="35" cy="30" r="13"/><circle cx="100" cy="30" r="13"/><circle cx="165" cy="30" r="13"/><circle cx="230" cy="30" r="13"/></g>
                    <path d="M49 30 H85 M114 30 H150 M179 30 H215" stroke="#2780b8" stroke-width="2"/>
                    <g fill="#fceceb" stroke="#e74c3c"><circle cx="35" cy="90" r="13"/><circle cx="100" cy="90" r="13"/><circle cx="165" cy="90" r="13"/><circle cx="230" cy="90" r="13"/></g>
                    <path d="M216 90 H180 M151 90 H115 M86 90 H50" stroke="#e74c3c" stroke-width="2"/>
                    <text x="13" y="12" class="rnn-svg-note">過去 → 未来</text><text x="192" y="118" class="rnn-svg-note">未来 → 過去</text>
                    <path d="M100 44 V72 M165 44 V72" stroke="#627d98" stroke-dasharray="3,2"/>
                    <text x="114" y="63" class="rnn-svg-label">結合</text>
                </svg>
                <div class="rnn-concept-caption">各時刻なら $[\\overrightarrow h_t;\\overleftarrow h_t]$。系列全体の要約なら、元系列の端まで読んだ $[\\overrightarrow h_T;\\overleftarrow h_1]$。各方向が $H$ 次元ならConcat後は通常 $2H$ 次元。</div>
            </div>
            <div class="rnn-concept-card">
                <strong>向く場面・向かない場面</strong>
                <div class="table-wrap">
                    <table>
                        <tr><th>向く</th><th>向かない</th></tr>
                        <tr><td>文章分類<br>系列ラベリング<br>音声認識</td><td>未来入力がまだない<br>リアルタイム生成</td></tr>
                    </table>
                </div>
                <div class="rnn-concept-caption">未来側の系列が必要なので、<strong>純粋なオンライン処理では待ち時間</strong>が生じる。</div>
            </div>
        </div>

        <h3>■ RNNモデル史：何をフィードバックし、何を記憶するか</h3>
        <div class="rnn-model-timeline" aria-label="代表的RNNモデルの歴史">
            <div class="rnn-model-year"><small>1986</small><strong>Jordan</strong><small>出力を戻す</small></div>
            <div class="rnn-model-year"><small>1990</small><strong>Elman</strong><small>隠れ状態を戻す</small></div>
            <div class="rnn-model-year"><small>1997</small><strong>BiRNN</strong><small>過去＋未来</small></div>
            <div class="rnn-model-year"><small>1997</small><strong>LSTM</strong><small>セル状態＋ゲート</small></div>
            <div class="rnn-model-year"><small>2001</small><strong>ESN</strong><small>固定Reservoir</small></div>
            <div class="rnn-model-year"><small>2006</small><strong>CTC</strong><small>位置合わせ不要</small></div>
            <div class="rnn-model-year"><small>2014</small><strong>GRU</strong><small>軽量ゲート</small></div>
            <div class="rnn-model-year"><small>2014</small><strong>Seq2Seq</strong><small>Encoder–Decoder</small></div>
            <div class="rnn-model-year"><small>2014</small><strong>Attention</strong><small>入力を直接参照</small></div>
            <div class="rnn-model-year"><small>2015</small><strong>ConvLSTM</strong><small>空間＋時間</small></div>
        </div>
        <div class="rnn-model-key">
            <strong>モデル問題の見分け方：</strong><strong>Elman＝隠れ状態</strong>、<strong>Jordan＝出力</strong>、<strong>LSTM＝セル</strong>、<strong>GRU＝2ゲート</strong>、<strong>ESN＝内部を固定</strong>、<strong>CTC＝blank</strong>を最初に探す。
        </div>

        <div class="table-wrap">
            <table class="rnn-comparison rnn-model-table">
                <tr><th>モデル</th><th>状態・接続</th><th>一言暗記</th><th>設計意図・用途</th></tr>
                <tr><td><strong>Elman Network</strong></td><td>$h_{t-1}\\to h_t$</td><td>隠れ状態をContextへ</td><td>直前の内部表現を現在の計算へ戻す、基本的なSimple RNN。</td></tr>
                <tr><td><strong>Jordan Network</strong></td><td>$y_{t-1}\\to h_t$</td><td>出力をContextへ</td><td>直前の出力をフィードバックし、過去の出力系列を次の状態へ反映。</td></tr>
                <tr><td><strong>Stacked RNN</strong></td><td>$h_t^{(l-1)}\\to h_t^{(l)}$</td><td>時間＋層の深さ</td><td>同じ時刻で下層から上層へ渡し、より抽象的な系列特徴を学ぶ。</td></tr>
                <tr><td><strong>Bidirectional RNN</strong></td><td>$[\\overrightarrow h_t;\\overleftarrow h_t]$</td><td>過去＋未来</td><td>全系列が使える分類・ラベリング向け。未来未確定のオンライン生成には不向き。</td></tr>
                <tr><td><strong>LSTM</strong></td><td>$c_t$と$h_t$、3ゲート</td><td>加算型セル更新</td><td>勾配を長く伝えやすくし、長期依存を扱う。忘却・入力・出力ゲート。</td></tr>
                <tr><td><strong>GRU</strong></td><td>$h_t$、2ゲート</td><td>セルなしで軽量</td><td>更新・リセットゲートで新旧情報を調整。LSTMよりパラメータが少ない。</td></tr>
                <tr><td><strong>Echo State Network</strong></td><td>固定Reservoir＋学習する出力</td><td>内部重みを学習しない</td><td>ランダムな再帰層で豊かな動的特徴を作り、通常は出力重みだけ学習。</td></tr>
                <tr><td><strong>Seq2Seq</strong></td><td>Encoder → Decoder</td><td>系列から系列へ</td><td>翻訳など長さの異なる系列を変換。Attentionなしでは固定長文脈がボトルネック。</td></tr>
                <tr><td><strong>CTC</strong></td><td>blankを含む全alignment</td><td>位置合わせなし学習</td><td>音声と文字のように入出力の対応時刻が未知でも、可能な経路の確率を合計。</td></tr>
                <tr><td><strong>ConvLSTM</strong></td><td>ゲート内部を畳み込み</td><td>空間構造を保つLSTM</td><td>動画・降水予測など、画像系列の空間情報と時間変化を同時に扱う。</td></tr>
                <tr><td><strong>BiLSTM–CRF</strong></td><td>BiLSTM特徴＋CRF遷移</td><td>ラベル間依存も考慮</td><td>固有表現抽出などで、前後文脈と隣接ラベルの整合性を使う。</td></tr>
            </table>
        </div>

        <h3>■ モデル構造を図で見分ける</h3>
        <div class="rnn-concept-grid">
            <div class="rnn-concept-card">
                <strong>Elman：隠れ状態を戻す</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 300 125" role="img" aria-label="Elman Networkは直前の隠れ状態をContext Unit経由で現在の隠れ層へ戻す">
                    <rect x="9" y="45" width="45" height="32" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="24" y="65" class="rnn-svg-label">xₜ</text>
                    <path d="M56 61 H93" stroke="#627d98" stroke-width="2"/><path d="M93 61 l-6 -4 v8 z" fill="#627d98"/>
                    <rect x="97" y="38" width="66" height="46" rx="5" fill="#eafaf1" stroke="#27ae60"/><text x="119" y="58" class="rnn-svg-label">hₜ</text><text x="106" y="74" class="rnn-svg-note">Hidden</text>
                    <path d="M165 61 H207" stroke="#627d98" stroke-width="2"/><path d="M207 61 l-6 -4 v8 z" fill="#627d98"/>
                    <rect x="211" y="45" width="44" height="32" rx="5" fill="#fff8e7" stroke="#f39c12"/><text x="225" y="65" class="rnn-svg-label">yₜ</text>
                    <path d="M130 36 V14 H72 V43" fill="none" stroke="#8e44ad" stroke-width="3"/><rect x="53" y="4" width="78" height="24" rx="4" fill="#f7f1fa" stroke="#8e44ad"/><text x="60" y="20" class="rnn-svg-note">Context hₜ₋₁</text>
                    <text x="75" y="111" class="rnn-svg-note">戻るのは出力yではなく内部状態h</text>
                </svg>
                <div class="rnn-concept-caption">基本式は $h_t=f(W_xx_t+W_hh_{t-1}+b)$。</div>
            </div>
            <div class="rnn-concept-card">
                <strong>Jordan：出力を戻す</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 300 125" role="img" aria-label="Jordan Networkは直前の出力をContext Unit経由で現在の隠れ層へ戻す">
                    <rect x="9" y="45" width="45" height="32" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="24" y="65" class="rnn-svg-label">xₜ</text>
                    <path d="M56 61 H93" stroke="#627d98" stroke-width="2"/><path d="M93 61 l-6 -4 v8 z" fill="#627d98"/>
                    <rect x="97" y="38" width="66" height="46" rx="5" fill="#eafaf1" stroke="#27ae60"/><text x="119" y="58" class="rnn-svg-label">hₜ</text><text x="106" y="74" class="rnn-svg-note">Hidden</text>
                    <path d="M165 61 H207" stroke="#627d98" stroke-width="2"/><path d="M207 61 l-6 -4 v8 z" fill="#627d98"/>
                    <rect x="211" y="45" width="44" height="32" rx="5" fill="#fff8e7" stroke="#f39c12"/><text x="225" y="65" class="rnn-svg-label">yₜ</text>
                    <path d="M233 43 V14 H72 V43" fill="none" stroke="#e74c3c" stroke-width="3"/><rect x="53" y="4" width="78" height="24" rx="4" fill="#fff3f1" stroke="#e74c3c"/><text x="60" y="20" class="rnn-svg-note">Context yₜ₋₁</text>
                    <text x="81" y="111" class="rnn-svg-note">直前に何を出力したかを次へ戻す</text>
                </svg>
                <div class="rnn-concept-caption"><strong>Elman＝Hidden</strong>、<strong>Jordan＝Output</strong>で区別。</div>
            </div>
            <div class="rnn-concept-card">
                <strong>Echo State Network：Reservoirを固定</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 300 125" role="img" aria-label="Echo State Networkは入力を固定されたランダムReservoirへ入れ出力重みだけを学習する">
                    <rect x="7" y="46" width="45" height="32" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="20" y="66" class="rnn-svg-label">Input</text>
                    <path d="M54 62 H83" stroke="#627d98" stroke-width="2"/><path d="M83 62 l-6 -4 v8 z" fill="#627d98"/>
                    <circle cx="143" cy="62" r="49" fill="#f7f1fa" stroke="#8e44ad" stroke-width="2"/>
                    <g fill="#8e44ad"><circle cx="116" cy="39" r="5"/><circle cx="144" cy="28" r="5"/><circle cx="166" cy="45" r="5"/><circle cx="120" cy="70" r="5"/><circle cx="151" cy="62" r="5"/><circle cx="171" cy="79" r="5"/><circle cx="139" cy="91" r="5"/></g>
                    <g stroke="#a887b6"><path d="M116 39 L151 62 L139 91 L120 70 L166 45 L171 79 L144 28 L116 39"/><path d="M120 70 L171 79 M144 28 L139 91"/></g>
                    <text x="117" y="118" class="rnn-svg-note">固定・ランダム</text>
                    <path d="M194 62 H224" stroke="#27ae60" stroke-width="3"/><path d="M224 62 l-6 -4 v8 z" fill="#27ae60"/>
                    <rect x="228" y="46" width="64" height="32" rx="5" fill="#eafaf1" stroke="#27ae60"/><text x="238" y="59" class="rnn-svg-note">Output</text><text x="236" y="72" class="rnn-svg-note">ここを学習</text>
                </svg>
                <div class="rnn-concept-caption">入力・再帰重みを通常は固定し、<strong>出力重みだけ</strong>を回帰などで学習。</div>
            </div>
            <div class="rnn-concept-card">
                <strong>CTC：経路をまとめて正解文字列へ</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 300 125" role="img" aria-label="CTCはblankを含む時刻ごとの出力から連続重複とblankを除いて文字列を得る">
                    <text x="8" y="18" class="rnn-svg-note">時刻ごとの経路</text>
                    <g fill="#eef7fb" stroke="#2780b8"><rect x="8" y="30" width="35" height="30" rx="4"/><rect x="48" y="30" width="35" height="30" rx="4"/><rect x="88" y="30" width="35" height="30" rx="4"/><rect x="128" y="30" width="35" height="30" rx="4"/><rect x="168" y="30" width="35" height="30" rx="4"/><rect x="208" y="30" width="35" height="30" rx="4"/></g>
                    <g class="rnn-svg-label"><text x="17" y="50">–</text><text x="61" y="50">A</text><text x="101" y="50">A</text><text x="137" y="50">–</text><text x="181" y="50">B</text><text x="221" y="50">B</text></g>
                    <path d="M248 45 H276" stroke="#627d98" stroke-width="2"/><path d="M276 45 l-6 -4 v8 z" fill="#627d98"/>
                    <text x="279" y="50" class="rnn-svg-label">AB</text>
                    <text x="31" y="87" class="rnn-svg-note">①連続重複をまとめる　②blank（–）を除く</text>
                    <text x="38" y="106" class="rnn-svg-note">正確なフレーム位置の教師ラベルは不要</text>
                </svg>
                <div class="rnn-concept-caption">blankを挟めば同じ文字の連続も表現可能。全alignment経路の確率を合計する。</div>
            </div>
            <div class="rnn-concept-card">
                <strong>ConvLSTM：行列積を畳み込みへ</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 300 125" role="img" aria-label="ConvLSTMは画像系列を入力しLSTMゲート内部で畳み込みを使って空間形状を保つ">
                    <g fill="#eef7fb" stroke="#2780b8"><rect x="8" y="37" width="48" height="48"/><rect x="14" y="31" width="48" height="48"/></g><text x="15" y="103" class="rnn-svg-note">画像 xₜ</text>
                    <path d="M68 60 H100" stroke="#627d98" stroke-width="2"/><path d="M100 60 l-6 -4 v8 z" fill="#627d98"/>
                    <rect x="104" y="27" width="91" height="66" rx="7" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/><text x="123" y="48" class="rnn-svg-label">ConvLSTM</text><text x="118" y="65" class="rnn-svg-note">Gate内で K＊X</text><text x="116" y="80" class="rnn-svg-note">空間H×Wを保持</text>
                    <path d="M197 60 H229" stroke="#627d98" stroke-width="2"/><path d="M229 60 l-6 -4 v8 z" fill="#627d98"/>
                    <g fill="#fff8e7" stroke="#f39c12"><rect x="233" y="37" width="48" height="48"/><rect x="239" y="31" width="48" height="48"/></g><text x="238" y="103" class="rnn-svg-note">状態 hₜ</text>
                </svg>
                <div class="rnn-concept-caption">ベクトル系列ではなく<strong>画像系列</strong>向け。動画・降水レーダーなど。</div>
            </div>
            <div class="rnn-concept-card">
                <strong>BiLSTM–CRF：特徴＋ラベル遷移</strong>
                <svg class="rnn-concept-svg" viewBox="0 0 300 125" role="img" aria-label="BiLSTM-CRFは単語列を双方向LSTMで表現しCRFでラベル系列全体を復号する">
                    <g fill="#eef7fb" stroke="#2780b8"><rect x="6" y="77" width="47" height="28" rx="4"/><rect x="61" y="77" width="47" height="28" rx="4"/><rect x="116" y="77" width="47" height="28" rx="4"/></g><g class="rnn-svg-note"><text x="18" y="95">私</text><text x="73" y="95">は</text><text x="128" y="95">猫</text></g>
                    <rect x="35" y="39" width="103" height="28" rx="4" fill="#f7f1fa" stroke="#8e44ad"/><text x="55" y="57" class="rnn-svg-label">BiLSTM</text>
                    <path d="M30 76 L51 68 M84 76 V68 M139 76 L124 68" stroke="#627d98"/>
                    <path d="M140 53 H178" stroke="#627d98" stroke-width="2"/><path d="M178 53 l-6 -4 v8 z" fill="#627d98"/>
                    <rect x="182" y="39" width="62" height="28" rx="4" fill="#eafaf1" stroke="#27ae60"/><text x="200" y="57" class="rnn-svg-label">CRF</text>
                    <path d="M245 53 H285" stroke="#627d98" stroke-width="2"/><path d="M285 53 l-6 -4 v8 z" fill="#627d98"/>
                    <text x="247" y="33" class="rnn-svg-note">最適ラベル列</text><text x="174" y="91" class="rnn-svg-note">B-PERの次にI-PER等の遷移も評価</text>
                </svg>
                <div class="rnn-concept-caption">BiLSTMが前後文脈を抽出し、CRFが<strong>ラベル列全体の整合性</strong>を評価。</div>
            </div>
        </div>

        <h3>■ Attentionと復号方法もモデル名で区別</h3>
        <div class="table-wrap">
            <table class="rnn-comparison rnn-model-table">
                <tr><th>手法</th><th>すること</th><th>見分け方</th></tr>
                <tr><td><strong>Bahdanau Attention</strong></td><td>小さなNNでscoreを計算</td><td>Additive Attention。Encoder状態とDecoder状態を変換して加算。</td></tr>
                <tr><td><strong>Luong Attention</strong></td><td>内積・双線形でscoreを計算</td><td>Dot / General。計算が比較的単純。</td></tr>
                <tr><td><strong>Greedy Search</strong></td><td>毎時刻の最大確率を1つ選ぶ</td><td>速いが、系列全体の最適解を逃しやすい。</td></tr>
                <tr><td><strong>Beam Search</strong></td><td>上位$B$個の候補系列を保持</td><td>$B=1$ならGreedyと同じ。幅を増やすほど計算量も増える。</td></tr>
                <tr><td><strong>Scheduled Sampling</strong></td><td>学習中に正解入力とモデル予測を混ぜる</td><td>Teacher Forcingと推論条件の差、Exposure Biasを緩和。</td></tr>
            </table>
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="table-wrap">
            <table class="rnn-comparison">
                <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
                <tr><td>隠れ状態を次時刻へ渡す</td><td><strong>RNN（Recurrent Neural Network）</strong></td><td>過去の状態を使って系列を順に処理する。</td></tr>
                <tr><td>時間方向へ展開して逆伝播</td><td><strong>BPTT（Backpropagation Through Time）</strong></td><td>時間を層のように見なし、誤差を過去へ伝える。</td></tr>
                <tr><td>勾配ノルムが閾値を超えた</td><td><strong>Gradient Clipping</strong></td><td>勾配爆発を抑えるが、勾配消失の解決策ではない。</td></tr>
                <tr><td>セル状態・忘却／入力／出力ゲート</td><td><strong>LSTM（Long Short-Term Memory）</strong></td><td>加算型のセル更新で長期依存を扱いやすくする。</td></tr>
                <tr><td>更新／リセットゲート・独立セルなし</td><td><strong>GRU（Gated Recurrent Unit）</strong></td><td>LSTMより単純でパラメータが少ない。</td></tr>
                <tr><td>過去と未来の両方を参照</td><td><strong>BiRNN（Bidirectional Recurrent Neural Network）</strong></td><td>全系列が必要なためオンライン生成には不向き。</td></tr>
                <tr><td>Encoderで読み、Decoderで生成</td><td><strong>Seq2Seq（Sequence-to-Sequence）</strong></td><td>長さの異なる系列同士を変換できる。</td></tr>
                <tr><td>Score → Softmax → 重み付き和</td><td><strong>Attention</strong></td><td>Decoderが必要なEncoder状態を生成時に直接参照する。</td></tr>
                <tr><td>blank・重複をまとめる・位置合わせ不要</td><td><strong>CTC（Connectionist Temporal Classification）</strong></td><td>全alignment経路の確率を合計する。</td></tr>
                <tr><td>固定されたランダムなReservoir</td><td><strong>ESN（Echo State Network）</strong></td><td>通常は再帰層を固定し、出力重みだけを学習する。</td></tr>
                <tr><td>前後文脈＋ラベル遷移</td><td><strong>BiLSTM–CRF</strong></td><td>BiLSTM（Bidirectional LSTM）とCRF（Conditional Random Field）を組み合わせる。</td></tr>
                <tr><td>Hiddenを戻す／Outputを戻す</td><td><strong>Elman／Jordan Network</strong></td><td>Elmanは隠れ状態、Jordanは出力をフィードバックする。</td></tr>
            </table>
        </div>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "BPTT",
            question: "RNNの学習において、時間を遡って誤差を伝播させるアルゴリズムを何と呼ぶか。",
            options: ["BPTT (Backpropagation Through Time)", "BP (Backpropagation)", "SGD", "Adam"],
            answer: 0,
            explanation: "RNNは展開すると非常に深いネットワークとみなせるため、時間軸に沿って逆伝播を行います。"
        },
        {
            category: "LSTMの構造",
            question: "LSTMにおいて、勾配消失問題を防ぐために中心的な役割を果たしている、勾配を減衰させずに保持する機構はどれか。",
            options: ["CEC (Constant Error Carousel)", "忘却ゲート (Forget Gate)", "出力ゲート (Output Gate)", "覗き穴結合 (Peephole Connection)"],
            answer: 0,
            explanation: "LSTMのセル状態は加算型の経路を持ち、忘却ゲートが1に近ければ勾配を長く保ちやすくなります。必ず消失しないという意味ではありません。"
        },
        {
            category: "勾配爆発",
            question: "RNNで発生しやすい「勾配爆発（Gradient Explosion）」への対策として、最も一般的な手法はどれか。",
            options: ["勾配クリッピング (Gradient Clipping)", "Batch Normalization", "ReLUを使う", "LSTMを使う"],
            answer: 0,
            explanation: "勾配のノルム（大きさ）が閾値を超えた場合、強制的にその閾値まで小さくすることで、重みの破壊的な更新を防ぎます。"
        },
        {
            category: "GRUの特徴",
            question: "GRU（Gated Recurrent Unit）がLSTMと比較して優れている点（特徴）はどれか。",
            options: ["ゲート数が少なくパラメータが少ないため、計算コストが低く学習が速い", "表現力がLSTMより圧倒的に高い", "長期記憶の保持能力がLSTMより高い", "勾配爆発が起きない"],
            answer: 0,
            explanation: "GRUは「リセットゲート」と「更新ゲート」の2つしか持たず（セルがない）、LSTMより構造がシンプルです。"
        },
        {
            category: "Seq2Seq",
            question: "翻訳タスクなどで使われる「Seq2Seq (Sequence-to-Sequence)」モデルは、どのような構造で構成されているか。",
            options: ["Encoder-Decoder モデル", "Generator-Discriminator モデル", "Actor-Critic モデル", "Self-Attention モデル"],
            answer: 0,
            explanation: "入力系列を処理するEncoderと、出力系列を生成するDecoderの2つのRNNで構成されます。"
        },
        {
            category: "Attention",
            question: "Attention（注意機構）が解決しようとした、従来のSeq2Seqの最大の問題点は何か。",
            options: ["入力文が長くなると、固定長の文脈ベクトル（Context Vector）に情報を詰め込みきれず、精度が低下する問題", "計算量が少なすぎる問題", "単語の意味が理解できない問題", "逆伝播ができない問題"],
            answer: 0,
            explanation: "Encoderの最終状態だけを使うボトルネックを解消するため、Decoderが「入力の全単語（隠れ状態）」を直接参照できるようにしました。"
        },
        {
            category: "双方向RNN",
            question: "Bidirectional RNN（双方向RNN）のメリットは何か。",
            options: ["「過去」の情報だけでなく、「未来」の情報も考慮して現在の出力を決定できる", "計算量が半分になる", "リアルタイム処理が可能になる", "メモリ消費量が減る"],
            answer: 0,
            explanation: "文章の穴埋め問題などでは、後ろの単語を見ないと前の単語が決まらないことがあります。順方向と逆方向の2つのRNNを組み合わせることでこれを解決します。"
        },
        {
            category: "Teacher Forcing",
            question: "RNNの学習テクニックである「Teacher Forcing（教師強制）」とはどのような手法か。",
            options: ["次の時刻の入力として、モデル自身の「予測値」ではなく「正解データ（教師データ）」を使う", "教師モデルを使って生徒モデルを学習させる", "学習率を強制的に固定する", "勾配を強制的に0にする"],
            answer: 0,
            explanation: "学習初期はモデルの予測がデタラメなので、それを次の入力に使うと学習が進みません。正解を入力してあげることで学習をガイドします。"
        },
        {
            category: "RNNの入力",
            question: "RNNで自然言語処理を行う際、単語IDを学習可能な低次元の密ベクトルへ変換する処理を何と呼ぶか。",
            options: ["単語埋め込み (Word Embedding)", "One-hot Encoding", "正規化", "プーリング"],
            answer: 0,
            explanation: "One-hotベクトルは次元数が大きすぎるため、Word2VecなどのEmbedding層を使って密なベクトル（分散表現）に変換するのが一般的です。"
        },
        {
            category: "CECの課題",
            question: "初期のLSTMにおけるCEC（Constant Error Carousel）の課題に対し、「忘却ゲート」が導入された理由は何か。",
            options: ["記憶が蓄積され続けると、過去の不要な情報がノイズとなり、新しい情報を学習できなくなるため", "勾配が消失してしまうため", "計算が複雑すぎるため", "パラメータが多すぎるため"],
            answer: 0,
            explanation: "CECは記憶を保持し続けるため、文脈が変わった時などに記憶をリセットする機能（忘却ゲート）が必要でした。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q25
        // ---------------------------------------------------------
        {
            category: "ゲートの活性化関数(応用)",
            question: "LSTMのゲート（忘却・入力・出力）の開閉（0〜1）を制御するために使われる活性化関数はどれか。",
            options: ["シグモイド関数", "tanh関数", "ReLU", "ソフトマックス関数"],
            answer: 0,
            explanation: "ゲートは「通す(1)」か「通さない(0)」かの割合を決めるため、0〜1の値を出力するシグモイド関数が使われます。一方、データ変換にはtanhが使われます。"
        },
        {
            category: "Peephole(応用)",
            question: "LSTMの改良版である「Peephole Connection（覗き穴結合）」の特徴は何か。",
            options: ["ゲートの制御に、現在のCEC（セル）の状態も直接入力として使う", "隠れ層を覗き見る", "出力を入力に戻す", "セルを削除する"],
            answer: 0,
            explanation: "通常のLSTMではゲートは入力と隠れ状態のみを見ますが、Peepholeは「現在の記憶状態（セル）」も参考にしてゲートを開閉します。"
        },
        {
            category: "Attentionスコア(応用)",
            question: "Attention機構において、Encoderの隠れ状態とDecoderの隠れ状態の類似度（スコア）を計算する際、最も単純で計算が速い手法はどれか。",
            options: ["内積 (Dot Product)", "加算 (Additive / Bahdanau)", "多層パーセプトロン", "畳み込み"],
            answer: 0,
            explanation: "ベクトルの内積をとる方法（Luong Attentionなど）が計算コストが低く高速です。TransformerでもScaled Dot-Product Attentionが採用されています。"
        },
        {
            category: "Bleu Score(応用)",
            question: "機械翻訳（Seq2Seqなど）の評価指標として最も一般的に使われる「BLEUスコア」は何に基づいているか。",
            options: ["生成された文と正解文のn-gram（単語の並び）の一致率", "文法の正確さ", "意味の類似度", "文字数の一致率"],
            answer: 0,
            explanation: "人間が作成した参照訳と、どれくらい単語の並び（1-gram, 2-gram...）が一致しているかを計算する指標です。"
        },
        {
            category: "Exposure Bias(応用)",
            question: "Teacher Forcingの問題点として挙げられる「Exposure Bias（露光バイアス）」とは何か。",
            options: ["学習時は正解データが入力されるが、推論時は自身の予測値を入力するため、分布のズレが生じてエラーが蓄積すること", "学習データにバイアスがあること", "過学習のこと", "勾配消失のこと"],
            answer: 0,
            explanation: "本番（推論）では先生（正解）がいないため、一度間違えると、その間違いを入力としてさらに間違えるという悪循環に陥るリスクのことです。"
        },
        {
            category: "勾配消失の原因(応用)",
            question: "単純なRNNにおいて、活性化関数に `tanh` を使用していても勾配消失が起きる主な数学的理由は何か。",
            options: ["tanhの微分の最大値が1であり、層（時間）を遡るたびに重み行列と微分の積が繰り返され、値が1未満になりやすいため", "tanhの出力が負になるから", "重みが0になるから", "バイアスが大きすぎるから"],
            answer: 0,
            explanation: "逆伝播では「重み × tanhの微分」を何度も掛け算します。これが1より小さいと、指数関数的に勾配が小さくなってしまいます（0.9の100乗はほぼ0）。"
        },
        {
            category: "Seq2Seqの応用(応用)",
            question: "Seq2Seqモデルが応用されているタスクとして、不適切なものはどれか。",
            options: ["画像の物体検出 (Object Detection)", "機械翻訳 (Translation)", "要約 (Summarization)", "対話生成 (Chatbot)"],
            answer: 0,
            explanation: "物体検出は主にCNN（YOLO, SSDなど）の領分です。Seq2Seqは「系列から系列」への変換（翻訳、要約、対話）に使われます。"
        },
        {
            category: "Hard vs Soft Attention(応用)",
            question: "Attention機構において、「Hard Attention」と「Soft Attention」の違いは何か。",
            options: ["Hardは特定の箇所のみを確率的に選択（微分不可）、Softは全箇所の重み付き平均を使用（微分可能）", "HardはGPUを使う、SoftはCPUを使う", "Hardは精度が高い、Softは精度が低い", "Hardは画像用、Softはテキスト用"],
            answer: 0,
            explanation: "通常のDeep Learning（誤差逆伝播）で学習できるのは、滑らかに重みを計算する「Soft Attention」です。Hard Attentionは強化学習などが必要です。"
        },
        {
            category: "Transformerとの関係(応用)",
            question: "RNNを使わずにAttention機構のみで構成された「Transformer」が、RNNより優れている最大の点は何か。",
            options: ["並列計算が可能であり、学習が高速かつ長距離の依存関係を捉えやすい", "パラメータ数が少ない", "メモリ使用量が少ない", "再帰構造を持っている"],
            answer: 0,
            explanation: "RNNは前の単語の計算が終わらないと次へ進めませんが、Transformerは文全体を一気に入力して並列計算できます（Self-Attention）。"
        },
        {
            category: "RNNのパラメータ数(応用)",
            question: "入力次元 $D$、隠れ層次元 $H$ の単純なRNNにおける、1ステップ分のパラメータ数はおよそいくつか（バイアス含む）。",
            options: ["$H(H + D + 1)$", "$H^2$", "$D^2$", "$H \\times D$"],
            answer: 0,
            explanation: "入力への重み($H \\times D$)、前状態への重み($H \\times H$)、バイアス($H$)の合計が必要です。"
        },
        {
            category: "Global Attention(応用)",
            question: "Luongらが提案したGlobal Attentionにおいて、Attentionスコアから算出された「文脈ベクトル」は、その後どう使われるか。",
            options: ["Decoderの隠れ状態と結合(Concatenate)され、最終的な出力層に入力される", "Encoderの入力に戻される", "次の時刻の入力ゲートに使われる", "損失関数に直接加えられる"],
            answer: 0,
            explanation: "「注目した情報（文脈）」と「自身の状態」を合わせることで、次にどの単語を出力すべきかを決定します。"
        },
        {
            category: "LSTMの忘却ゲート(応用)",
            question: "LSTMの忘却ゲートのバイアス項の初期値として、学習初期に推奨される値はどれか。",
            options: ["1 (記憶を保持する方向)", "0", "-1 (記憶を消す方向)", "0.5"],
            answer: 0,
            explanation: "初期値が0や負だと、学習初期にいきなり記憶を忘れてしまい、勾配が伝わらなくなる可能性があります。最初は「忘れない（1）」設定から始めるのが定石です（Jozefowicz et al.）。"
        },
        {
            category: "GNMT(応用)",
            question: "Google Neural Machine Translation (GNMT) で採用された、翻訳精度向上のための工夫はどれか。",
            options: ["EncoderとDecoderの両方にLSTMを多層化（8層など）し、残差結合（Skip Connection）を取り入れた", "CNNのみを使用した", "Attentionを廃止した", "単語単位ではなく文字単位で処理した"],
            answer: 0,
            explanation: "RNNも層を深くすると精度が上がりますが、学習が難しくなるため、ResNetのような残差結合が導入されました。"
        },
        {
            category: "Image Captioning(応用)",
            question: "画像を入力して説明文を生成する「Image Captioning」タスクでは、EncoderとDecoderにそれぞれ何が使われるのが一般的か。",
            options: ["Encoder: CNN, Decoder: RNN (LSTM)", "Encoder: RNN, Decoder: CNN", "Encoder: RNN, Decoder: RNN", "Encoder: CNN, Decoder: CNN"],
            answer: 0,
            explanation: "画像の特徴抽出にはCNN（VGGやResNet）を使い、その特徴を初期状態としてRNNで文章を生成します。"
        },
        {
            category: "勾配消失とReLu(応用)",
            question: "単純なRNNで活性化関数にReLUを使う際のリスクとして、最も注意すべき点は何か。",
            options: ["出力が発散しやすく、勾配爆発を起こしやすい", "勾配消失が起きやすくなる", "計算が遅くなる", "負の値が出力できない"],
            answer: 0,
            explanation: "ReLUは最大値に制限がないため、ループするたびに値が大きくなり続け、数値的に不安定（発散・爆発）になりやすいです。そのため、適切な初期化やクリッピングが必要です。"
        },
        // ---------------------------------------------------------
        // 【計算・シラバス補強】 Q26 - Q48
        // ---------------------------------------------------------
        {
            id: "rnn-lstm-cell-calc",
            category: "LSTM（計算）",
            question: "LSTMのセル更新 $c_t=f_t c_{t-1}+i_t\\tilde c_t$ で、$f_t=0.8,c_{t-1}=2,i_t=0.5,\\tilde c_t=0.4$ のとき $c_t$ はいくつか。",
            options: ["1.8", "1.6", "1.2", "2.2"],
            answer: 0,
            explanation: "$0.8\\times2+0.5\\times0.4=1.6+0.2=1.8$ です。忘却ゲートで残す過去と入力ゲートで書き込む候補を足します。"
        },
        {
            id: "rnn-lstm-output-gate",
            category: "LSTM（内部構造）",
            question: "LSTMの出力ゲート $o_t$ が直接制御するものはどれか。",
            options: ["セル状態から隠れ状態 $h_t=o_t\\odot\\tanh(c_t)$ として外へ見せる量", "過去セルを消す量だけ", "候補セルへ書き込む量だけ", "系列長"],
            answer: 0,
            explanation: "忘却ゲートfは保持、入力ゲートiは書込み、出力ゲートoはセル内容の公開を制御します。図問題ではセル状態の横方向と隠れ状態への分岐を追います。"
        },
        {
            id: "rnn-gru-gates",
            category: "GRU（識別）",
            question: "GRUがLSTMより構造を簡略化している点として正しいものはどれか。",
            options: ["更新ゲートとリセットゲートを使い、独立したセル状態を持たず隠れ状態を更新する", "ゲートを一切使わない", "必ず双方向にする", "畳み込みだけで系列を処理する"],
            answer: 0,
            explanation: "GRUはupdate/resetの2ゲートが中心で、LSTMのような3ゲート＋独立セル状態を持ちません。パラメータが少ない一方、長期依存を扱う狙いは共通です。"
        },
        {
            id: "rnn-bptt-gradient",
            category: "BPTT（計算）",
            question: "単純化して各時刻の再帰ヤコビアンが0.5で、4時刻さかのぼる勾配倍率はどれか。",
            options: ["$0.5^4=0.0625$", "$0.5\\times4=2$", "$4/0.5=8$", "$1-0.5^4$"],
            answer: 0,
            explanation: "BPTTでは時刻をまたぐたびヤコビアンが連鎖的に掛かります。絶対値1未満が続くと指数的に小さくなり、勾配消失になります。"
        },
        {
            id: "rnn-forward-numeric",
            category: "RNN順伝播（計算）",
            question: "単純RNNで $h_t=\\tanh(W_{xh}x_t+W_{hh}h_{t-1}+b)$ とする。$x_t=2,h_{t-1}=1,W_{xh}=0.5,W_{hh}=0.2,b=0$ のとき、$h_t$ に最も近い値はどれか。",
            options: ["$\\tanh(1.2)\\approx0.834$", "$\\tanh(0.7)\\approx0.604$", "$1.2$", "$2.2$"],
            answer: 0,
            explanation: "活性化前は $0.5\\times2+0.2\\times1=1.2$。最後にtanhを適用して約0.834です。重み付き和だけで計算を止めないことが重要です。"
        },
        {
            id: "rnn-weight-sharing",
            category: "RNN重み共有",
            question: "同じRNNセルを系列長10で展開したとき、時刻ごとの再帰重み $W_{hh}$ はどう扱われるか。",
            options: ["全10時刻で同じ $W_{hh}$ を共有する", "時刻ごとに別の $W_{hh}$ を10個学習する", "最初の時刻だけ $W_{hh}$ を使う", "逆伝播時だけ共有する"],
            answer: 0,
            explanation: "RNNは時間方向に同じセルと重みを再利用します。そのため系列長はパラメータ数に掛けません。"
        },
        {
            id: "rnn-parameter-numeric",
            category: "RNNパラメータ数（計算）",
            question: "入力次元 $D=3$、隠れ次元 $H=4$ の単純RNNについて、再帰部分のパラメータ数はいくつか。バイアスを含み、出力層は含めない。",
            options: ["$4(3+4+1)=32$", "$3\\times4=12$", "$4^2=16$", "$4(3+4)=28$"],
            answer: 0,
            explanation: "入力重み $HD=12$、再帰重み $H^2=16$、バイアス $H=4$ の合計で32です。"
        },
        {
            id: "rnn-gated-parameter-numeric",
            category: "LSTM・GRUパラメータ数",
            question: "入力次元 $D=5$、隠れ次元 $H=4$ のとき、標準的なLSTMとGRUの再帰部分のパラメータ数の組として正しいものはどれか。",
            options: ["LSTM: $4\\times4(5+4+1)=160$、GRU: $3\\times4(5+4+1)=120$", "LSTM: 40、GRU: 40", "LSTM: 120、GRU: 160", "LSTM: 80、GRU: 40"],
            answer: 0,
            explanation: "LSTMは4組（忘却・入力・出力・候補）、GRUは3組（更新・リセット・候補）の変換を持つと数えます。"
        },
        {
            id: "rnn-many-to-one",
            category: "系列入出力",
            question: "レビュー文を単語列として入力し、最後に「肯定／否定」を1つ出力する感情分析はどの型か。",
            options: ["Many-to-One", "One-to-Many", "Many-to-Many（同じ長さ）", "One-to-One"],
            answer: 0,
            explanation: "複数時刻の入力系列を1つの分類結果へまとめるためMany-to-Oneです。"
        },
        {
            id: "rnn-aligned-many-to-many",
            category: "系列入出力",
            question: "各単語に対して1つずつ品詞ラベルを付ける系列ラベリングは、どの入出力型か。",
            options: ["入力と出力が時刻対応するMany-to-Many", "Many-to-One", "One-to-Many", "長さの異なるSeq2Seqだけ"],
            answer: 0,
            explanation: "各入力単語に対応する出力ラベルがあるため、同じ長さのMany-to-Manyです。翻訳のような長さの異なるSeq2Seqと区別します。"
        },
        {
            id: "rnn-bidirectional-dimension",
            category: "双方向RNN（計算）",
            question: "双方向RNNで順方向と逆方向の隠れ状態がそれぞれ8次元で、両者を結合する場合、各時刻の出力次元は通常いくつか。",
            options: ["16次元", "8次元", "64次元", "4次元"],
            answer: 0,
            explanation: "順方向8次元と逆方向8次元を連結するので $8+8=16$ 次元です。"
        },
        {
            id: "rnn-bidirectional-online",
            category: "双方向RNN（識別）",
            question: "双方向RNNが純粋なリアルタイム次トークン生成に向きにくい主な理由はどれか。",
            options: ["逆方向の計算には、まだ到着していない未来側の入力が必要だから", "勾配を計算できないから", "隠れ状態を持たないから", "必ずCNNと組み合わせる必要があるから"],
            answer: 0,
            explanation: "双方向RNNは系列の後ろ側も参照します。全系列がそろう分類やラベリングでは有効ですが、未来が未確定のオンライン生成ではそのまま使いにくいです。"
        },
        {
            id: "rnn-truncated-bptt",
            category: "Truncated BPTT",
            question: "Truncated BPTTの説明として正しいものはどれか。",
            options: ["逆伝播する時間範囲を一定長で打ち切り、計算量とメモリを抑える", "順伝播だけを途中で止める", "勾配を常に0へ切り捨てる", "系列を逆順に並べ替える"],
            answer: 0,
            explanation: "長い系列全体へ逆伝播せず、一定区間だけ遡ります。効率は上がりますが、区間を越える長期依存は学びにくくなります。"
        },
        {
            id: "rnn-gradient-clipping-numeric",
            category: "勾配クリッピング（計算）",
            question: "勾配ベクトルのノルムが12、クリッピング閾値が3のとき、ノルムクリッピングでは勾配全体を何倍にするか。",
            options: ["$3/12=0.25$倍", "4倍", "9倍", "0倍"],
            answer: 0,
            explanation: "方向は保ったまま、ノルムが3になるよう $g\\leftarrow(3/12)g$ と縮小します。勾配爆発への対策です。"
        },
        {
            id: "rnn-attention-weight-sum",
            category: "Attention（基本）",
            question: "AttentionスコアへSoftmaxを適用して得る重み $\\alpha_{t,s}$ の性質として正しいものはどれか。",
            options: ["各重みは非負で、参照する入力時刻方向の合計が1になる", "各重みは必ず0か1になる", "合計は系列長になる", "負の重みだけを使う"],
            answer: 0,
            explanation: "Softmaxにより重みを確率のように正規化します。Hard Attentionと異なり、通常のSoft Attentionは連続値の重みです。"
        },
        {
            id: "rnn-attention-context-numeric",
            category: "Attention（計算）",
            question: "Attention重みが $\\alpha=(0.25,0.75)$、Encoder状態が $h_1=(2,0),h_2=(0,4)$ のとき、文脈ベクトル $c=\\sum_s\\alpha_s h_s$ はどれか。",
            options: ["$(0.5,3)$", "$(2,4)$", "$(1,2)$", "$(0.25,0.75)$"],
            answer: 0,
            explanation: "$0.25(2,0)+0.75(0,4)=(0.5,0)+(0,3)=(0.5,3)$ です。"
        },
        {
            id: "rnn-attention-score-vs-weight",
            category: "Attention（識別）",
            question: "Attentionにおけるscoreと重み $\\alpha$ の関係として正しいものはどれか。",
            options: ["scoreは相性を表す正規化前の値で、Softmax後の $\\alpha$ が重みになる", "scoreと $\\alpha$ は常に同じ", "$\\alpha$ を計算してからscoreを求める", "scoreは必ず合計1になる"],
            answer: 0,
            explanation: "まずDecoder状態と各Encoder状態のscoreを求め、次にSoftmaxで合計1のAttention重みへ変換します。"
        },
        {
            id: "rnn-seq2seq-bottleneck",
            category: "Seq2Seq（識別）",
            question: "Attentionなしの初期Seq2Seqで、長い入力ほど性能が落ちやすかった主因はどれか。",
            options: ["入力系列全体を固定長の文脈ベクトル1つへ圧縮するボトルネック", "Encoderが入力を一切読まないため", "Decoderが学習できないため", "出力系列の長さを固定できないため"],
            answer: 0,
            explanation: "Encoderの最終状態だけに全情報を詰め込むのが難しいためです。Attentionは各Encoder状態を生成時に直接参照します。"
        },
        {
            id: "rnn-gru-reset-role",
            category: "GRUゲート",
            question: "GRUのリセットゲート $r_t$ の主な役割はどれか。",
            options: ["候補状態を作る際に、過去の隠れ状態をどの程度参照するかを調整する", "出力確率の合計を1にする", "系列長を短くする", "未来方向の状態を作る"],
            answer: 0,
            explanation: "リセットゲートが小さいと候補状態を作るとき過去を弱く参照し、文脈を切り替えやすくなります。"
        },
        {
            id: "rnn-lstm-hidden-numeric",
            category: "LSTM（計算）",
            question: "LSTMでセル状態 $c_t=1.8$、出力ゲート $o_t=0.5$ とする。$\\tanh(1.8)\\approx0.947$ のとき、隠れ状態 $h_t=o_t\\tanh(c_t)$ はいくつか。",
            options: ["約0.474", "約0.947", "1.8", "2.3"],
            answer: 0,
            explanation: "$h_t=0.5\\times0.947=0.4735$ なので約0.474です。出力ゲートはセル内容を外へ見せる割合を制御します。"
        },
        {
            id: "rnn-embedding-parameters",
            category: "Embedding（計算）",
            question: "語彙数 $V=10,000$、埋め込み次元 $E=128$ のEmbedding層のパラメータ数はいくつか。バイアスはないものとする。",
            options: ["$10,000\\times128=1,280,000$", "$10,000+128=10,128$", "$128^2=16,384$", "$10,000$"],
            answer: 0,
            explanation: "各語彙IDに128次元のベクトルを1本ずつ持つため、Embedding行列の形は $V\\times E$ です。"
        },
        {
            id: "rnn-padding-mask",
            category: "Padding・Mask",
            question: "長さの異なる文を同じミニバッチで扱うためPaddingしたとき、Maskを使う主な理由はどれか。",
            options: ["Padding部分を損失や状態集約の有効データとして数えないため", "語彙数を増やすため", "勾配を必ず大きくするため", "双方向RNNを単方向にするため"],
            answer: 0,
            explanation: "Paddingは長さ合わせ用のダミー値です。Maskで無視しないと、ダミー部分まで正解データのように学習してしまいます。"
        },
        {
            id: "rnn-next-token-shift",
            category: "次トークン予測",
            question: "RNN言語モデルで入力が「[私, は, 猫]」のとき、次トークン予測用の正解系列として適切なものはどれか。",
            options: ["「[は, 猫, です]」のように1トークン先へずらした系列", "入力と同じ「[私, は, 猫]」", "逆順の「[猫, は, 私]」", "すべてPadding"],
            answer: 0,
            explanation: "各時刻で「次のトークン」を正解にします。入力と教師系列を1つずらすのが基本です。"
        },

        // ---------------------------------------------------------
        // 【代表RNNモデル対策】 Q49 - Q68
        // ---------------------------------------------------------
        {
            id: "rnn-elman-feedback",
            category: "Elman Network",
            difficulty: "標準",
            question: "Elman NetworkでContext Unitへコピーされ、次時刻の隠れ層へ戻されるものはどれか。",
            options: ["直前の隠れ状態 $h_{t-1}$", "直前の出力 $y_{t-1}$", "未来の入力 $x_{t+1}$", "損失関数の値"],
            answer: 0,
            explanation: "Elman Networkは隠れ層の状態をContext Unitへ保存し、次時刻の隠れ層計算に使います。基本的なSimple RNNの形です。"
        },
        {
            id: "rnn-jordan-feedback",
            category: "Jordan Network",
            difficulty: "標準",
            question: "Jordan Networkの再帰接続として正しいものはどれか。",
            options: ["未来の隠れ状態を入力へ戻す", "直前の出力 $y_{t-1}$ をContext Unit経由で隠れ層へ戻す", "セル状態だけを出力へ戻す", "入力を畳み込み層へ戻す"],
            answer: 1,
            explanation: "Jordanは出力フィードバックです。Elmanの隠れ状態フィードバックと対にして覚えます。"
        },
        {
            id: "rnn-elman-jordan-compare",
            category: "Elman・Jordan比較",
            difficulty: "標準",
            question: "Elman NetworkとJordan Networkの見分け方として正しいものはどれか。",
            options: ["Elmanは出力、Jordanはセル状態を戻す", "両方とも未来入力を戻す", "Elmanは隠れ状態、Jordanは出力を戻す", "Elmanは双方向、Jordanは畳み込みを使う"],
            answer: 2,
            explanation: "合言葉はElman＝Hidden、Jordan＝Outputです。どの値がContext Unitへ保存されるかを確認します。"
        },
        {
            id: "rnn-stacked-structure",
            category: "Stacked RNN",
            difficulty: "標準",
            question: "Stacked RNN（多層RNN）の説明として正しいものはどれか。",
            options: ["系列を必ず逆順にする", "全時刻で別々の重みを使う", "再帰接続を削除する", "各時刻で下位RNN層の出力を上位RNN層へ渡す"],
            answer: 3,
            explanation: "時間方向の再帰に加え、層方向にも深くします。同じ時刻$t$で$h_t^{(l-1)}$を上位層$h_t^{(l)}$へ渡します。"
        },
        {
            id: "rnn-bidirectional-parameter-count",
            category: "Bidirectional RNN（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "入力次元$D=5$、各方向の隠れ次元$H=4$の単純な双方向RNNについて、再帰部分の総パラメータ数はいくつか。各方向にバイアスを含み、出力層は除く。",
            options: ["$2\\times4(5+4+1)=80$", "$4(5+4+1)=40$", "$5\\times4=20$", "$2\\times4^2=32$"],
            answer: 0,
            explanation: "1方向は$H(D+H+1)=4(5+4+1)=40$。順方向と逆方向は別々の重みを持つため$40\\times2=80$です。"
        },
        {
            id: "rnn-esn-trained-weights",
            category: "Echo State Network",
            difficulty: "標準",
            question: "標準的なEcho State Networkで通常学習する部分はどれか。",
            options: ["Reservoir内部の全再帰重みだけ", "Reservoirから出力への重み", "入力系列そのもの", "全時刻の隠れ状態を個別パラメータとして学習"],
            answer: 1,
            explanation: "入力重みとReservoir内部の再帰重みは通常ランダムに初期化して固定し、出力重みだけを線形回帰などで学習します。"
        },
        {
            id: "rnn-esn-reservoir-role",
            category: "Reservoir Computing",
            difficulty: "標準",
            question: "Echo State NetworkのReservoirの役割として最も適切なものはどれか。",
            options: ["正解ラベルを保存する", "未来入力を生成する", "入力系列を高次元の動的特徴へ写像する", "Softmaxの合計を1にする"],
            answer: 2,
            explanation: "固定された非線形・再帰ネットワークが入力履歴を豊かな状態表現へ変換し、学習する出力層がその特徴を利用します。"
        },
        {
            id: "rnn-echo-state-property",
            category: "Echo State Property",
            difficulty: "応用",
            question: "Echo State Propertyの直感的な説明として正しいものはどれか。",
            options: ["初期状態の影響が永遠に増え続ける", "Reservoirが入力を無視する", "出力層を学習しなくても必ず正解する", "時間が進むと初期状態の影響が薄れ、状態が主に入力履歴で決まる"],
            answer: 3,
            explanation: "安定したReservoirでは初期状態の差が次第に消え、現在状態が入力履歴のechoとして決まります。スペクトル半径は安定性を調整する代表的な指標です。"
        },
        {
            id: "rnn-ctc-blank-role",
            category: "CTC",
            difficulty: "標準",
            question: "CTCで使用するblank記号の役割として正しいものはどれか。",
            options: ["その時刻ではどの出力ラベルにも対応しないことを表す", "文末を必ず表す", "未知語だけを表す", "Paddingしたバッチだけを表す"],
            answer: 0,
            explanation: "blankはラベルを出さない時刻を表します。重複ラベルの統合とblank除去により、長い時刻列から短いラベル列を得ます。"
        },
        {
            id: "rnn-ctc-collapse",
            category: "CTC（経路計算）",
            kind: "計算",
            difficulty: "標準",
            question: "CTCで経路$[blank,A,A,blank,B,B]$を「連続重複の統合→blank除去」の順に変換したラベル列はどれか。",
            options: ["AAB", "AB", "ABB", "blankAB"],
            answer: 1,
            explanation: "連続するAとBをそれぞれ1個へまとめると$[blank,A,blank,B]$。その後blankを除いて$AB$になります。"
        },
        {
            id: "rnn-ctc-alignment",
            category: "CTC（学習）",
            difficulty: "応用",
            question: "CTCが音声認識などで有効な理由として正しいものはどれか。",
            options: ["入力と出力の長さを必ず同じにする", "各フレームの正解文字位置を人手で指定する", "正解ラベル列へ対応する複数のalignment経路の確率を合計できる", "Decoderが未来の正解を参照する"],
            answer: 2,
            explanation: "発話のどのフレームがどの文字かという位置合わせがなくても、同じ文字列へcollapseされる全経路を動的計画法で合計して学習できます。"
        },
        {
            id: "rnn-convlstm-operation",
            category: "ConvLSTM",
            difficulty: "標準",
            question: "ConvLSTMが通常のLSTMと異なる主な点はどれか。",
            options: ["セル状態を持たない", "未来だけを入力する", "ゲートをすべて削除する", "ゲート内部のアフィン変換を畳み込みに置き換え、空間構造を保つ"],
            answer: 3,
            explanation: "入力と隠れ状態を画像状のテンソルとして扱い、行列積の代わりに畳み込みを使います。動画や降水予測などに向きます。"
        },
        {
            id: "rnn-bilstm-crf-role",
            category: "BiLSTM–CRF",
            difficulty: "応用",
            question: "固有表現抽出で使われるBiLSTM–CRFの役割分担として正しいものはどれか。",
            options: ["BiLSTMが前後文脈を表現し、CRFがラベル間の遷移を含めて系列全体を復号する", "BiLSTMが画像を拡大し、CRFが畳み込む", "BiLSTMがblankを除き、CRFが単語埋め込みを作る", "両方とも各時刻を完全に独立分類する"],
            answer: 0,
            explanation: "BiLSTMは単語の前後文脈を特徴化し、CRFはB-PERの次にI-PERが続きやすい、といったラベル列の整合性を考えて最適系列を選びます。"
        },
        {
            id: "rnn-scheduled-sampling",
            category: "Scheduled Sampling",
            difficulty: "標準",
            question: "Scheduled Samplingの説明として正しいものはどれか。",
            options: ["推論時も常に正解トークンだけを入力する", "学習中、正解トークンとモデル自身の予測を一定確率で混ぜて次入力にする", "Attention重みをランダムに0へする", "系列をすべて逆順にする"],
            answer: 1,
            explanation: "Teacher Forcingから自己予測入力へ徐々に近づけ、学習時と推論時の条件差によるExposure Biasを緩和します。"
        },
        {
            id: "rnn-beam-search",
            category: "Beam Search",
            difficulty: "標準",
            question: "Seq2SeqのBeam SearchがGreedy Searchと異なる点はどれか。",
            options: ["各時刻で最小確率だけを選ぶ", "正解系列をDecoderへ入力する", "上位$B$個の候補系列を保持し、系列全体として良い候補を探索する", "出力語彙を1語に固定する"],
            answer: 2,
            explanation: "Greedyは各時刻の最大確率1個だけを残します。Beam Searchは複数候補を保持するため、局所的な選択ミスを回避できる場合があります。"
        },
        {
            id: "rnn-beam-width-one",
            category: "Beam Search（識別）",
            difficulty: "標準",
            question: "Beam Searchのbeam幅$B=1$は、どの復号方法と等価か。",
            options: ["Sampling", "Teacher Forcing", "CTC", "Greedy Search"],
            answer: 3,
            explanation: "候補を1つしか残さないため、毎時刻で最良候補だけを選ぶGreedy Searchと同じです。"
        },
        {
            id: "rnn-bahdanau-attention",
            category: "Bahdanau Attention",
            difficulty: "応用",
            question: "Bahdanau Attentionのscore計算の特徴はどれか。",
            options: ["Encoder状態とDecoder状態を変換・加算し、小さなNNでscoreを求めるAdditive Attention", "単純な内積だけを必ず使う", "blankを除去してscoreを作る", "Reservoir内部の重みを固定する"],
            answer: 0,
            explanation: "代表式は$v^T\\tanh(W_ss_{t-1}+W_hh_s)$です。LuongのDot/General型と区別します。"
        },
        {
            id: "rnn-luong-attention",
            category: "Luong Attention",
            difficulty: "応用",
            question: "Luong Attentionで使われる代表的なscoreはどれか。",
            options: ["加法型NNだけ", "Dot積や$s_t^TW h_s$のような双線形形式", "CTCのblank確率", "GRUのリセットゲート"],
            answer: 1,
            explanation: "Luong Attentionにはdot、general、concatなどのscoreがあります。Dot/Generalは行列積として計算しやすい形式です。"
        },
        {
            id: "rnn-attentional-seq2seq-context",
            category: "Attention-based Seq2Seq",
            difficulty: "標準",
            question: "Attention付きSeq2Seqが、固定長ベクトルだけを使う初期Seq2Seqと異なる点はどれか。",
            options: ["Encoderを使わない", "出力系列を入力と同じ長さに固定する", "Decoderの各生成時刻でEncoderの全状態から文脈ベクトルを作り直す", "必ず双方向Decoderを使う"],
            answer: 2,
            explanation: "生成する単語ごとにAttention重みが変わり、必要な入力位置を直接参照します。1個の固定長文脈へ全情報を詰め込む必要がありません。"
        },
        {
            id: "rnn-model-history-order",
            category: "RNNモデル史",
            difficulty: "応用",
            question: "提案時期が古いものから新しいものへの並びとして正しいものはどれか。",
            options: ["GRU → LSTM → Elman → Jordan", "LSTM → Jordan → GRU → Elman", "Elman → Jordan → GRU → LSTM", "Jordan → Elman → LSTM → GRU"],
            answer: 3,
            explanation: "代表的な年代はJordan（1986）→Elman（1990）→LSTM（1997）→GRU（2014）です。"
        },
        {
            id: "rnn-exam-bilstm-output-shape",
            setId: "rnn-exam-diagram-reading",
            setOrder: 1,
            category: "Bidirectional LSTM（図表）",
            kind: "図表・長文",
            difficulty: "本試験型",
            beginnerReviewed: true,
            question: `<div style="line-height:1.7;">次のモデル概要で、<strong>B</strong>はバッチサイズ、各方向のLSTMの隠れ次元は64とする。<code>merge_mode="concat"</code>、<code>return_sequences=False</code>のとき、出力Shapeはどれか。</div>
                <div style="margin:12px 0;padding:12px;border:1px solid #c8dbee;border-radius:10px;background:#f8fbfe;overflow-x:auto;">
                    <table style="width:100%;min-width:520px;border-collapse:collapse;text-align:left;">
                        <tr><th style="padding:7px;border:1px solid #c8dbee;background:#eaf2fb;">Layer</th><th style="padding:7px;border:1px solid #c8dbee;background:#eaf2fb;">Input</th><th style="padding:7px;border:1px solid #c8dbee;background:#eaf2fb;">読む状態</th></tr>
                        <tr><td style="padding:7px;border:1px solid #c8dbee;">Bidirectional(LSTM(64))</td><td style="padding:7px;border:1px solid #c8dbee;">$(B,T,E)$</td><td style="padding:7px;border:1px solid #c8dbee;">$\\overrightarrow h_T$（64）と $\\overleftarrow h_1$（64）</td></tr>
                    </table>
                    <div style="display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin-top:12px;"><span style="padding:7px;border:1px solid #2780b8;border-radius:6px;">$\\overrightarrow h_T$: 64</span><span>→</span><strong style="padding:8px 12px;border:2px solid #8e44ad;border-radius:7px;">Concat</strong><span>←</span><span style="padding:7px;border:1px solid #e74c3c;border-radius:6px;">$\\overleftarrow h_1$: 64</span></div>
                </div>`,
            options: ["$(B,128)$", "$(B,T,128)$", "$(B,64)$", "$(B,T,64)$"],
            answer: 0,
            explanation: `<p><strong>図で見る場所：</strong>「各方向64」「Concat」「return_sequences=False」を確認します。</p><p><strong>読み取り：</strong>系列全体を1個へまとめるので時間軸$T$は出力に残りません。順方向の最終状態64次元と、逆方向の最終状態64次元を連結します。</p><p><strong>答え：</strong>$64+64=128$より、出力は<strong>$(B,128)$</strong>です。</p><p><strong>他が違う理由：</strong>$(B,T,128)$は各時刻を返す<code>return_sequences=True</code>の形です。64次元の選択肢は片方向分しか数えていません。</p>`
        },
        {
            id: "rnn-exam-bilstm-token-vs-summary",
            setId: "rnn-exam-diagram-reading",
            setOrder: 2,
            category: "Bidirectional LSTM（図表）",
            kind: "図表・長文",
            difficulty: "本試験型",
            beginnerReviewed: true,
            question: `<div style="line-height:1.7;">元の入力系列を$x_1,x_2,\\ldots,x_T$とする。次の図で、<strong>各時刻の系列ラベリング用表現</strong>と、<strong>系列分類用の全体要約</strong>の組合せとして正しいものはどれか。</div>
                <div style="margin:12px 0;padding:12px;border:1px solid #d7e2ec;border-radius:10px;background:#fff;">
                    <div style="text-align:center;color:#2780b8;font-weight:700;">$x_1\\;\\rightarrow\\;x_2\\;\\rightarrow\\;\\cdots\\;\\rightarrow\\;x_T$　（順方向）</div>
                    <div style="text-align:center;margin:9px 0;"><span style="padding:6px 10px;border:1px solid #8e44ad;border-radius:6px;">位置$t$で2方向をConcat</span></div>
                    <div style="text-align:center;color:#e74c3c;font-weight:700;">$x_1\\;\\leftarrow\\;x_2\\;\\leftarrow\\;\\cdots\\;\\leftarrow\\;x_T$　（逆方向）</div>
                </div>`,
            options: [
                "各時刻：$[\\overrightarrow h_t;\\overleftarrow h_t]$、全体要約：$[\\overrightarrow h_T;\\overleftarrow h_1]$",
                "各時刻：$[\\overrightarrow h_T;\\overleftarrow h_1]$、全体要約：$[\\overrightarrow h_t;\\overleftarrow h_t]$",
                "各時刻も全体要約も $[\\overrightarrow h_1;\\overleftarrow h_T]$",
                "逆方向は使わず、どちらも $\\overrightarrow h_T$"
            ],
            answer: 0,
            explanation: `<p><strong>図で見る場所：</strong>下付き文字が「現在位置$t$」か「系列の端$1,T$」かを見ます。</p><p><strong>読み取り：</strong>位置$t$の予測には、その位置での前向き・後ろ向き状態を連結します。全体要約では、順方向が全入力を読み終えた$\\overrightarrow h_T$と、逆方向が全入力を読み終えた$\\overleftarrow h_1$を使います。</p><p><strong>答え：</strong>各時刻は$[\\overrightarrow h_t;\\overleftarrow h_t]$、全体要約は$[\\overrightarrow h_T;\\overleftarrow h_1]$です。</p><p><strong>他が違う理由：</strong>$\\overrightarrow h_1$と$\\overleftarrow h_T$は、それぞれ自分の方向でまだ系列全体を読んでいません。各時刻表現と全体要約を入れ替えないようにします。</p>`
        },
        {
            id: "rnn-exam-teacher-forcing-shift",
            setId: "rnn-exam-diagram-reading",
            setOrder: 3,
            category: "Teacher Forcing（図表）",
            kind: "図表・長文",
            difficulty: "本試験型",
            beginnerReviewed: true,
            question: `<div style="line-height:1.7;">Decoderの正解系列が「私 → は → 猫 → EOS」である。Teacher Forcingで各位置の<strong>次トークン</strong>を学習するとき、Decoder入力と教師ラベルの正しい組合せはどれか。</div>
                <div style="margin:12px 0;padding:12px;border:1px solid #c8dbee;border-radius:10px;background:#f8fbfe;overflow-x:auto;">
                    <table style="width:100%;min-width:500px;border-collapse:collapse;text-align:center;"><tr><th style="border:1px solid #c8dbee;padding:6px;">位置</th><th style="border:1px solid #c8dbee;padding:6px;">1</th><th style="border:1px solid #c8dbee;padding:6px;">2</th><th style="border:1px solid #c8dbee;padding:6px;">3</th><th style="border:1px solid #c8dbee;padding:6px;">4</th></tr><tr><th style="border:1px solid #c8dbee;padding:6px;">入力</th><td colspan="4" style="border:1px solid #c8dbee;padding:6px;">ここを選ぶ</td></tr><tr><th style="border:1px solid #c8dbee;padding:6px;">予測する正解</th><td style="border:1px solid #c8dbee;padding:6px;">私</td><td style="border:1px solid #c8dbee;padding:6px;">は</td><td style="border:1px solid #c8dbee;padding:6px;">猫</td><td style="border:1px solid #c8dbee;padding:6px;">EOS</td></tr></table>
                </div>`,
            options: [
                "入力：$[BOS,私,は,猫]$、教師：$[私,は,猫,EOS]$",
                "入力：$[私,は,猫,EOS]$、教師：$[私,は,猫,EOS]$",
                "入力：$[EOS,猫,は,私]$、教師：$[私,は,猫,BOS]$",
                "入力：各位置でモデル自身の予測だけ、教師：使用しない"
            ],
            answer: 0,
            explanation: `<p><strong>図で見る場所：</strong>入力行と「予測する正解」行を同じ列で縦に見ます。</p><p><strong>読み取り：</strong>BOSから「私」を予測し、「私」から「は」を予測します。このため正解列を1個右へずらし、空いた先頭へBOSを置きます。</p><p><strong>答え：</strong>入力$[BOS,私,は,猫]$、教師$[私,は,猫,EOS]$です。</p><p><strong>他が違う理由：</strong>入力と教師が同じでは、各位置で次ではなく同じ語を見せます。逆順化や、学習中に教師を全く使わない処理はTeacher Forcingではありません。</p>`
        },
        {
            id: "rnn-exam-teacher-forcing-exposure-bias",
            setId: "rnn-exam-diagram-reading",
            setOrder: 4,
            category: "学習時と推論時の入力差（図表）",
            kind: "図表・長文",
            difficulty: "本試験型",
            beginnerReviewed: true,
            question: `<div style="line-height:1.7;">同じDecoderについて、次の入力経路の違いによって起こりやすい問題はどれか。</div>
                <div style="margin:12px 0;padding:12px;border:1px solid #d7e2ec;border-radius:10px;background:#fff;">
                    <div style="margin:7px 0;"><strong>学習時：</strong><span style="padding:5px 8px;border:1px solid #27ae60;border-radius:6px;background:#eafaf1;">前の正解 $y^*_{t-1}$</span> → Decoder → $\\hat y_t$</div>
                    <div style="margin:7px 0;"><strong>推論時：</strong><span style="padding:5px 8px;border:1px solid #e74c3c;border-radius:6px;background:#fff3f1;">前の予測 $\\hat y_{t-1}$</span> → Decoder → $\\hat y_t$</div>
                </div>`,
            options: [
                "Exposure Bias：学習時に経験しない自己予測の誤りが、推論時に次の入力へ連鎖しうる",
                "Vanishing Resolution：画像の幅が必ず0になる",
                "Label Leakage：推論時にも正解ラベルを必ず入力できる",
                "Covariate Shift：双方向LSTMの出力次元が半分になる"
            ],
            answer: 0,
            explanation: `<p><strong>図で見る場所：</strong>2本の経路で、次のDecoderへ入るものが「正解」か「モデルの予測」かを比較します。</p><p><strong>読み取り：</strong>Teacher Forcing中は常にきれいな正解履歴を見ます。しかし推論では一度の誤予測が次の入力となり、その後の誤りへつながります。</p><p><strong>答え：</strong>この学習時と推論時の条件差が<strong>Exposure Bias</strong>です。</p><p><strong>他が違う理由：</strong>画像解像度やBiLSTMの次元の問題ではありません。推論時には正解ラベルを利用できないため、正解を必ず入力できるという説明も逆です。</p>`
        }
    ]
};
