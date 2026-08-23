window.quizData = {
    title: "3-（５）RNN：系列データと自然言語処理",

    cheatSheet: `
        <style>
            .rnn-core{margin:12px 0 18px;padding:13px 15px;border-left:5px solid #2780b8;border-radius:8px;background:#eef7fb;line-height:1.75}
            .rnn-flow{display:flex;align-items:center;justify-content:center;gap:7px;margin:12px 0 18px;padding:14px;border:1px solid #d7e2ec;border-radius:10px;background:#fff;overflow-x:auto}
            .rnn-node{flex:0 0 auto;min-width:76px;padding:9px;border:2px solid #2780b8;border-radius:8px;background:#eef7fb;text-align:center}
            .rnn-node.memory{border-color:#27ae60;background:#eafaf1}.rnn-arrow{flex:0 0 auto;color:#627d98;font-size:1.25em;font-weight:800}
            .rnn-formula{margin:8px 0;padding:9px 11px;border:1px solid #c8dbee;border-radius:8px;background:#f8fbfe;color:#123f68;text-align:center;overflow-x:auto}.rnn-formula mjx-container{margin:0!important}
            .rnn-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:12px 0 18px}.rnn-card{padding:13px;border:1px solid #d7e2ec;border-radius:10px;background:#fff;line-height:1.65}.rnn-card>strong{display:block;margin-bottom:6px;color:#123f68}
            .rnn-year{display:inline-block;margin-right:7px;padding:2px 7px;border-radius:12px;background:#f7f1fa;color:#6c3483;font-size:.82em;font-weight:800}.rnn-memory-line{margin:7px 0;padding:8px 10px;border-radius:7px;background:#f8fbfe}
            .rnn-warning,.rnn-ok{margin:10px 0 18px;padding:11px 13px;border-left:5px solid;border-radius:7px;line-height:1.7}.rnn-warning{border-color:#e74c3c;background:#fff3f1}.rnn-ok{border-color:#27ae60;background:#eafaf1}
            .rnn-table-wrap{overflow-x:auto}.rnn-final-table{min-width:720px}.rnn-final-table td:nth-child(3){min-width:250px}
            @media(max-width:760px){.rnn-two{grid-template-columns:1fr}.rnn-flow{justify-content:flex-start}}
        </style>

        <h3>■ 1. まず全体：RNNは「前の状態」を次へ渡す</h3>
        <div class="rnn-core"><strong>RNN（Recurrent Neural Network）</strong>は、現在の入力 $x_t$ と前の隠れ状態 $h_{t-1}$ から、現在の隠れ状態 $h_t$ を作ります。<br><strong>覚え方：</strong>$x$＝今入った情報、$h$＝ここまで読んだ要約、$y$＝現在の出力。</div>
        <div class="rnn-flow" aria-label="RNNを時間方向へ展開した図"><div class="rnn-node">入力 $x_{t-1}$<br><strong>$h_{t-1}$</strong></div><div class="rnn-arrow">→</div><div class="rnn-node memory">入力 $x_t$<br><strong>$h_t$</strong><br>↓ $y_t$</div><div class="rnn-arrow">→</div><div class="rnn-node">入力 $x_{t+1}$<br><strong>$h_{t+1}$</strong></div></div>
        <div class="rnn-ok"><strong>試験の決め手：</strong>各時刻で同じ重みを使います。系列長 $T$ が長くなっても、重みを $T$ 個作るわけではありません。</div>

        <h3>■ 2. 順伝播とBPTT：試験ポイントは2つだけ</h3>
        <p><strong>順伝播：</strong>今の入力と前の記憶を足して、現在の記憶を作ります。</p>
        <div class="rnn-formula">$\\displaystyle h_t=\\tanh(W_{xh}x_t+W_{hh}h_{t-1}+b)$</div>
        <p><strong>BPTT（Backpropagation Through Time）：</strong>RNNを時間方向に展開し、出力側から過去へ誤差を戻します。</p>
        <div class="rnn-flow" aria-label="BPTTは時間を逆向きに誤差を伝える"><div class="rnn-node">$h_{t-2}$</div><div class="rnn-arrow">← 勾配</div><div class="rnn-node">$h_{t-1}$</div><div class="rnn-arrow">← 勾配</div><div class="rnn-node memory">$h_t$</div></div>
        <div class="rnn-warning"><strong>掛け算の連続が試験ポイント：</strong>小さい倍率が続く → <strong>勾配消失</strong>。大きい倍率が続く → <strong>勾配爆発</strong>。勾配爆発には<strong>勾配クリッピング</strong>。</div>
        <p><strong>パラメータ数：</strong>Simple RNNは $H(D+H+1)$、LSTMはその4組、GRUは3組。<strong>系列長 $T$ は掛けません</strong>。この式は各変換にバイアス1組とする試験用の数え方で、実装や問題文に別指定があれば従います。</p>

        <h3>■ 3. Jordan → Elman：戻すものを見分ける</h3>
        <p>年代順は <strong>Jordan（1986）→ Elman（1990）</strong>。試験では「何を次時刻へ戻すか」を見ます。</p>
        <div class="rnn-two">
            <div class="rnn-card"><strong><span class="rnn-year">1986</span>Jordan Network</strong><div class="rnn-memory-line">$y_{t-1}\\longrightarrow h_t$</div>前の<strong>出力 $y$</strong>をContext Unitへ戻す。<br><strong>Jordan＝Output</strong></div>
            <div class="rnn-card"><strong><span class="rnn-year">1990</span>Elman Network</strong><div class="rnn-memory-line">$h_{t-1}\\longrightarrow h_t$</div>前の<strong>隠れ状態 $h$</strong>をContext Unitへ戻す。<br><strong>Elman＝Hidden</strong></div>
        </div>
        <div class="rnn-ok"><strong>図問題の解き方：</strong>戻り矢印の始点だけを見る。$y$から戻ればJordan、$h$から戻ればElman。</div>

        <h3>■ 4. LSTMとGRU：ゲート名と状態を区別</h3>
        <div class="rnn-two">
            <div class="rnn-card"><strong>LSTM（Long Short-Term Memory）</strong><div class="rnn-memory-line"><strong>$c_t$：</strong>長期記憶（メモリーセル／Cell state）</div><div class="rnn-memory-line"><strong>$h_t$：</strong>短期記憶（現在の出力／Hidden state）</div><strong>3ゲート：</strong>忘却 $f$・入力 $i$・出力 $o$</div>
            <div class="rnn-card"><strong>GRU（Gated Recurrent Unit）</strong>独立したセル状態 $c_t$ を持たず、$h_t$ にまとめます。<br><strong>2ゲート：</strong>更新 $z$・リセット $r$<br>LSTMより構造が簡単で、一般にパラメータが少ない。</div>
        </div>
        <div class="rnn-formula">$\\displaystyle c_t=f_t\\odot c_{t-1}+i_t\\odot\\widetilde c_t$</div><div class="rnn-formula">$\\displaystyle h_t=o_t\\odot\\tanh(c_t)$</div>
        <p><strong>式の読み方：</strong>過去を残す量（$f_t$）＋新情報を書く量（$i_t$）→ $c_t$。そこから外へ出す量を $o_t$ が決めます。</p>

        <h3>■ 5. 双方向RNN：前と後ろを両方読む</h3>
        <div class="rnn-flow" aria-label="双方向RNNは順方向と逆方向を結合する"><div class="rnn-node">順方向<br>$\\overrightarrow h_t$</div><div class="rnn-arrow">＋</div><div class="rnn-node">逆方向<br>$\\overleftarrow h_t$</div><div class="rnn-arrow">→</div><div class="rnn-node memory">Concat<br>$[\\overrightarrow h_t;\\overleftarrow h_t]$</div></div>
        <p>各方向の隠れ次元が $H$ なら、Concat後は通常 $2H$。未来側も読むため、全系列が届く前の<strong>リアルタイム予測には不向き</strong>です。</p>
        <div class="rnn-ok"><strong>Shape問題：</strong><code>return_sequences=True</code>なら時間軸 $T$ を残す。Falseなら系列を1個にまとめる。</div>

        <h3>■ 6. Encoder–Decoder / Seq2Seq / Attention</h3>
        <div class="rnn-flow" aria-label="Seq2SeqとAttentionの情報の流れ"><div class="rnn-node">入力系列</div><div class="rnn-arrow">→</div><div class="rnn-node">Encoder<br>読む</div><div class="rnn-arrow">→</div><div class="rnn-node memory">Attention<br>必要箇所を選ぶ</div><div class="rnn-arrow">→</div><div class="rnn-node">Decoder<br>生成</div></div>
        <p><strong>Seq2Seq（Sequence-to-Sequence）：</strong>Encoderが入力系列を読み、Decoderが別の系列を1語ずつ生成します。翻訳のように入出力の長さが違っても扱えます。</p>
        <p><strong>Attention：</strong>①Encoder状態とのscore → ②Softmaxで重み（合計1）→ ③重み付き和で文脈ベクトル。固定長ベクトル1個への詰め込みを緩和します。</p>
        <div class="rnn-two"><div class="rnn-card"><strong>Teacher Forcing（学習時）</strong>前の<strong>正解トークン</strong>を次のDecoder入力に使う。入力は $[BOS,y_1,y_2,\\ldots]$、正解は1つ先へずらす。</div><div class="rnn-card"><strong>Exposure Bias（問題点）</strong>推論時は前の<strong>自分の予測</strong>を入力するため、学習時との条件差で誤りが連鎖しやすい。</div></div>

        <h3>■ 7. 最後はこの表だけ</h3>
        <div class="rnn-table-wrap"><table class="rnn-final-table">
            <tr><th>問題文の合図</th><th>答える語</th><th>決め手</th></tr>
            <tr><td>前の隠れ状態・同じ重み</td><td><strong>RNN</strong></td><td>$x_t$ と $h_{t-1}$ から $h_t$。</td></tr>
            <tr><td>時間を展開し、誤差を過去へ</td><td><strong>BPTT</strong></td><td>小さい積は消失、大きい積は爆発。</td></tr>
            <tr><td>勾配ノルムを閾値内へ</td><td><strong>Gradient Clipping</strong></td><td>勾配爆発への対策。</td></tr>
            <tr><td>出力 $y$ をContextへ</td><td><strong>Jordan</strong></td><td>Jordan＝Output（1986）。</td></tr>
            <tr><td>隠れ状態 $h$ をContextへ</td><td><strong>Elman</strong></td><td>Elman＝Hidden（1990）。</td></tr>
            <tr><td>$c_t$・忘却／入力／出力</td><td><strong>LSTM</strong></td><td>長い記憶は$c_t$、現在の出力は$h_t$。</td></tr>
            <tr><td>更新／リセット・独立セルなし</td><td><strong>GRU</strong></td><td>$h_t$へ統合し、LSTMより簡単。</td></tr>
            <tr><td>順方向＋逆方向・Concat</td><td><strong>BiRNN</strong></td><td>各方向$H$なら通常$2H$。</td></tr>
            <tr><td>Encoderで読み、Decoderで生成</td><td><strong>Seq2Seq</strong></td><td>系列から系列へ変換。</td></tr>
            <tr><td>Score → Softmax → 重み付き和</td><td><strong>Attention</strong></td><td>生成ごとに入力側の重要箇所を参照。</td></tr>
            <tr><td>学習は前の正解、推論は前の予測</td><td><strong>Teacher Forcing / Exposure Bias</strong></td><td>入力条件の差で誤りが連鎖。</td></tr>
        </table></div>`,

    questions: [
    {
        "id": "rnn-bptt-definition",
        "category": "BPTT",
        "question": "RNNの学習において、時間を遡って誤差を伝播させるアルゴリズムを何と呼ぶか。",
        "options": [
            "BPTT (Backpropagation Through Time)",
            "BP (Backpropagation)",
            "SGD",
            "Adam"
        ],
        "answer": 0,
        "explanation": "RNNは展開すると非常に深いネットワークとみなせるため、時間軸に沿って逆伝播を行います。"
    },
    {
        "id": "rnn-seq2seq-structure",
        "category": "Seq2Seq",
        "question": "翻訳タスクなどで使われる「Seq2Seq (Sequence-to-Sequence)」モデルは、どのような構造で構成されているか。",
        "options": [
            "Encoder-Decoder モデル",
            "Generator-Discriminator モデル",
            "Actor-Critic モデル",
            "Self-Attention モデル"
        ],
        "answer": 0,
        "explanation": "Seq2SeqはEncoder–Decoderで構成されます。この章で扱う従来型では、入力を読むRNN Encoderと出力を生成するRNN Decoderを使います。"
    },
    {
        "id": "rnn-attention-bottleneck",
        "category": "Attention",
        "question": "Attention（注意機構）が解決しようとした、従来のSeq2Seqの最大の問題点は何か。",
        "options": [
            "入力文が長くなると、固定長の文脈ベクトル（Context Vector）に情報を詰め込みきれず、精度が低下する問題",
            "計算量が少なすぎる問題",
            "単語の意味が理解できない問題",
            "逆伝播ができない問題"
        ],
        "answer": 0,
        "explanation": "Encoderの最終状態だけを使うボトルネックを解消するため、Decoderが「入力の全単語（隠れ状態）」を直接参照できるようにしました。"
    },
    {
        "id": "rnn-bidirectional-benefit",
        "category": "双方向RNN",
        "question": "Bidirectional RNN（双方向RNN）のメリットは何か。",
        "options": [
            "「過去」の情報だけでなく、「未来」の情報も考慮して現在の出力を決定できる",
            "計算量が半分になる",
            "リアルタイム処理が可能になる",
            "メモリ消費量が減る"
        ],
        "answer": 0,
        "explanation": "文章の穴埋め問題などでは、後ろの単語を見ないと前の単語が決まらないことがあります。順方向と逆方向の2つのRNNを組み合わせることでこれを解決します。"
    },
    {
        "id": "rnn-teacher-forcing-definition",
        "category": "Teacher Forcing",
        "question": "RNNの学習テクニックである「Teacher Forcing（教師強制）」とはどのような手法か。",
        "options": [
            "次の時刻の入力として、モデル自身の「予測値」ではなく「正解データ（教師データ）」を使う",
            "教師モデルを使って生徒モデルを学習させる",
            "学習率を強制的に固定する",
            "勾配を強制的に0にする"
        ],
        "answer": 0,
        "explanation": "学習初期はモデルの予測がデタラメなので、それを次の入力に使うと学習が進みません。正解を入力してあげることで学習をガイドします。"
    },
    {
        "id": "rnn-lstm-cell-calc",
        "category": "LSTM（計算）",
        "question": "LSTMのセル更新 $c_t=f_t c_{t-1}+i_t\\tilde c_t$ で、$f_t=0.8,c_{t-1}=2,i_t=0.5,\\tilde c_t=0.4$ のとき $c_t$ はいくつか。",
        "options": [
            "1.8",
            "1.6",
            "1.2",
            "2.2"
        ],
        "answer": 0,
        "explanation": "$0.8\\times2+0.5\\times0.4=1.6+0.2=1.8$ です。忘却ゲートで残す過去と入力ゲートで書き込む候補を足します。"
    },
    {
        "id": "rnn-lstm-three-gates",
        "category": "LSTM（ゲート）",
        "question": "LSTMの忘却・入力・出力ゲートの役割の組合せとして正しいものはどれか。",
        "options": [
            "忘却＝過去を残す割合、入力＝新情報を書く割合、出力＝セル内容を外へ見せる割合",
            "忘却＝Softmax、入力＝系列長、出力＝学習率を決める",
            "3つとも同じ役割で、常に同じ値になる",
            "忘却＝未来を読む、入力＝過去を削除、出力＝重みを固定する"
        ],
        "answer": 0,
        "explanation": "LSTMでは $c_t=f_t\\odot c_{t-1}+i_t\\odot\\widetilde c_t$ として過去と新情報を混ぜ、$h_t=o_t\\odot\\tanh(c_t)$ として外へ見せる量を決めます。"
    },
    {
        "id": "rnn-lstm-output-gate",
        "category": "LSTM（内部構造）",
        "question": "LSTMの出力ゲート $o_t$ が直接制御するものはどれか。",
        "options": [
            "セル状態から隠れ状態 $h_t=o_t\\odot\\tanh(c_t)$ として外へ見せる量",
            "過去セルを消す量だけ",
            "候補セルへ書き込む量だけ",
            "系列長"
        ],
        "answer": 0,
        "explanation": "忘却ゲートfは保持、入力ゲートiは書込み、出力ゲートoはセル内容の公開を制御します。図問題ではセル状態の横方向と隠れ状態への分岐を追います。"
    },
    {
        "id": "rnn-gru-gates",
        "category": "GRU（識別）",
        "question": "GRUがLSTMより構造を簡略化している点として正しいものはどれか。",
        "options": [
            "更新ゲートとリセットゲートを使い、独立したセル状態を持たず隠れ状態を更新する",
            "ゲートを一切使わない",
            "必ず双方向にする",
            "畳み込みだけで系列を処理する"
        ],
        "answer": 0,
        "explanation": "GRUはupdate/resetの2ゲートが中心で、LSTMのような3ゲート＋独立セル状態を持ちません。パラメータが少ない一方、長期依存を扱う狙いは共通です。"
    },
    {
        "id": "rnn-bptt-gradient",
        "category": "BPTT（計算）",
        "question": "単純化して各時刻の再帰ヤコビアンが0.5で、4時刻さかのぼる勾配倍率はどれか。",
        "options": [
            "$0.5^4=0.0625$",
            "$0.5\\times4=2$",
            "$4/0.5=8$",
            "$1-0.5^4$"
        ],
        "answer": 0,
        "explanation": "BPTTでは時刻をまたぐたびヤコビアンが連鎖的に掛かります。絶対値1未満が続くと指数的に小さくなり、勾配消失になります。"
    },
    {
        "id": "rnn-forward-numeric",
        "category": "RNN順伝播（計算）",
        "question": "単純RNNで $h_t=\\tanh(W_{xh}x_t+W_{hh}h_{t-1}+b)$ とする。$x_t=2,h_{t-1}=1,W_{xh}=0.5,W_{hh}=0.2,b=0$ のとき、$h_t$ に最も近い値はどれか。",
        "options": [
            "$\\tanh(1.2)\\approx0.834$",
            "$\\tanh(0.7)\\approx0.604$",
            "$1.2$",
            "$2.2$"
        ],
        "answer": 0,
        "explanation": "活性化前は $0.5\\times2+0.2\\times1=1.2$。最後にtanhを適用して約0.834です。重み付き和だけで計算を止めないことが重要です。"
    },
    {
        "id": "rnn-weight-sharing",
        "category": "RNN重み共有",
        "question": "同じRNNセルを系列長10で展開したとき、時刻ごとの再帰重み $W_{hh}$ はどう扱われるか。",
        "options": [
            "全10時刻で同じ $W_{hh}$ を共有する",
            "時刻ごとに別の $W_{hh}$ を10個学習する",
            "最初の時刻だけ $W_{hh}$ を使う",
            "逆伝播時だけ共有する"
        ],
        "answer": 0,
        "explanation": "RNNは時間方向に同じセルと重みを再利用します。そのため系列長はパラメータ数に掛けません。"
    },
    {
        "id": "rnn-parameter-numeric",
        "category": "RNNパラメータ数（計算）",
        "question": "入力次元 $D=3$、隠れ次元 $H=4$ の単純RNNについて、再帰部分のパラメータ数はいくつか。バイアスを含み、出力層は含めない。",
        "options": [
            "$4(3+4+1)=32$",
            "$3\\times4=12$",
            "$4^2=16$",
            "$4(3+4)=28$"
        ],
        "answer": 0,
        "explanation": "入力重み $HD=12$、再帰重み $H^2=16$、バイアス $H=4$ の合計で32です。"
    },
    {
        "id": "rnn-gated-parameter-numeric",
        "category": "LSTM・GRUパラメータ数",
        "question": "入力次元 $D=5$、隠れ次元 $H=4$ とし、各変換にバイアスを1組持つとする。LSTMとGRUの再帰部分のパラメータ数の組として正しいものはどれか。",
        "options": [
            "LSTM: $4\\times4(5+4+1)=160$、GRU: $3\\times4(5+4+1)=120$",
            "LSTM: 40、GRU: 40",
            "LSTM: 120、GRU: 160",
            "LSTM: 80、GRU: 40"
        ],
        "answer": 0,
        "explanation": "この問題の規約では、LSTMは4組（忘却・入力・出力・候補）、GRUは3組（更新・リセット・候補）の変換を持つと数えます。PyTorchなど、入力側と再帰側でバイアスを分ける実装では問題文の定義を優先します。"
    },
    {
        "id": "rnn-bidirectional-dimension",
        "category": "双方向RNN（計算）",
        "question": "双方向RNNで順方向と逆方向の隠れ状態がそれぞれ8次元で、両者を結合する場合、各時刻の出力次元は通常いくつか。",
        "options": [
            "16次元",
            "8次元",
            "64次元",
            "4次元"
        ],
        "answer": 0,
        "explanation": "順方向8次元と逆方向8次元を連結するので $8+8=16$ 次元です。"
    },
    {
        "id": "rnn-bidirectional-online",
        "category": "双方向RNN（識別）",
        "question": "双方向RNNが純粋なリアルタイム次トークン生成に向きにくい主な理由はどれか。",
        "options": [
            "逆方向の計算には、まだ到着していない未来側の入力が必要だから",
            "勾配を計算できないから",
            "隠れ状態を持たないから",
            "必ずCNNと組み合わせる必要があるから"
        ],
        "answer": 0,
        "explanation": "双方向RNNは系列の後ろ側も参照します。全系列がそろう分類やラベリングでは有効ですが、未来が未確定のオンライン生成ではそのまま使いにくいです。"
    },
    {
        "id": "rnn-gradient-clipping-numeric",
        "category": "勾配クリッピング（計算）",
        "question": "勾配ベクトルのノルムが12、クリッピング閾値が3のとき、ノルムクリッピングでは勾配全体を何倍にするか。",
        "options": [
            "$3/12=0.25$倍",
            "4倍",
            "9倍",
            "0倍"
        ],
        "answer": 0,
        "explanation": "方向は保ったまま、ノルムが3になるよう $g\\leftarrow(3/12)g$ と縮小します。勾配爆発への対策です。"
    },
    {
        "id": "rnn-attention-weight-sum",
        "category": "Attention（基本）",
        "question": "AttentionスコアへSoftmaxを適用して得る重み $\\alpha_{t,s}$ の性質として正しいものはどれか。",
        "options": [
            "各重みは非負で、参照する入力時刻方向の合計が1になる",
            "各重みは必ず0か1になる",
            "合計は系列長になる",
            "負の重みだけを使う"
        ],
        "answer": 0,
        "explanation": "Softmaxにより重みを確率のように正規化します。Hard Attentionと異なり、通常のSoft Attentionは連続値の重みです。"
    },
    {
        "id": "rnn-attention-context-numeric",
        "category": "Attention（計算）",
        "question": "Attention重みが $\\alpha=(0.25,0.75)$、Encoder状態が $h_1=(2,0),h_2=(0,4)$ のとき、文脈ベクトル $c=\\sum_s\\alpha_s h_s$ はどれか。",
        "options": [
            "$(0.5,3)$",
            "$(2,4)$",
            "$(1,2)$",
            "$(0.25,0.75)$"
        ],
        "answer": 0,
        "explanation": "$0.25(2,0)+0.75(0,4)=(0.5,0)+(0,3)=(0.5,3)$ です。"
    },
    {
        "id": "rnn-attention-score-vs-weight",
        "category": "Attention（識別）",
        "question": "Attentionにおけるscoreと重み $\\alpha$ の関係として正しいものはどれか。",
        "options": [
            "scoreは相性を表す正規化前の値で、Softmax後の $\\alpha$ が重みになる",
            "scoreと $\\alpha$ は常に同じ",
            "$\\alpha$ を計算してからscoreを求める",
            "scoreは必ず合計1になる"
        ],
        "answer": 0,
        "explanation": "まずDecoder状態と各Encoder状態のscoreを求め、次にSoftmaxで合計1のAttention重みへ変換します。"
    },
    {
        "id": "rnn-seq2seq-bottleneck",
        "category": "Seq2Seq（識別）",
        "question": "Attentionなしの初期Seq2Seqで、長い入力ほど性能が落ちやすかった主因はどれか。",
        "options": [
            "入力系列全体を固定長の文脈ベクトル1つへ圧縮するボトルネック",
            "Encoderが入力を一切読まないため",
            "Decoderが学習できないため",
            "出力系列の長さを固定できないため"
        ],
        "answer": 0,
        "explanation": "Encoderの最終状態だけに全情報を詰め込むのが難しいためです。Attentionは各Encoder状態を生成時に直接参照します。"
    },
    {
        "id": "rnn-gru-reset-role",
        "category": "GRUゲート",
        "question": "GRUのリセットゲート $r_t$ の主な役割はどれか。",
        "options": [
            "候補状態を作る際に、過去の隠れ状態をどの程度参照するかを調整する",
            "出力確率の合計を1にする",
            "系列長を短くする",
            "未来方向の状態を作る"
        ],
        "answer": 0,
        "explanation": "リセットゲートが小さいと候補状態を作るとき過去を弱く参照し、文脈を切り替えやすくなります。"
    },
    {
        "id": "rnn-lstm-hidden-numeric",
        "category": "LSTM（計算）",
        "question": "LSTMでセル状態 $c_t=1.8$、出力ゲート $o_t=0.5$ とする。$\\tanh(1.8)\\approx0.947$ のとき、隠れ状態 $h_t=o_t\\tanh(c_t)$ はいくつか。",
        "options": [
            "約0.474",
            "約0.947",
            "1.8",
            "2.3"
        ],
        "answer": 0,
        "explanation": "$h_t=0.5\\times0.947=0.4735$ なので約0.474です。出力ゲートはセル内容を外へ見せる割合を制御します。"
    },
    {
        "id": "rnn-jordan-feedback",
        "category": "Jordan Network",
        "difficulty": "標準",
        "question": "Jordan Networkの再帰接続として正しいものはどれか。",
        "options": [
            "未来の隠れ状態を入力へ戻す",
            "直前の出力 $y_{t-1}$ をContext Unit経由で隠れ層へ戻す",
            "セル状態だけを出力へ戻す",
            "入力を畳み込み層へ戻す"
        ],
        "answer": 1,
        "explanation": "Jordan Networkは直前の出力 $y_{t-1}$ をContext Unitへ保存し、次時刻の隠れ層計算に使います。Jordan＝Outputです。"
    },
    {
        "id": "rnn-elman-feedback",
        "category": "Elman Network",
        "difficulty": "標準",
        "question": "Elman NetworkでContext Unitへコピーされ、次時刻の隠れ層へ戻されるものはどれか。",
        "options": [
            "直前の隠れ状態 $h_{t-1}$",
            "直前の出力 $y_{t-1}$",
            "未来の入力 $x_{t+1}$",
            "損失関数の値"
        ],
        "answer": 0,
        "explanation": "Elman Networkは直前の隠れ状態 $h_{t-1}$ をContext Unitへ保存し、次時刻の隠れ層計算に使います。Elman＝Hiddenです。"
    },
    {
        "id": "rnn-elman-jordan-compare",
        "category": "Jordan・Elman比較",
        "difficulty": "標準",
        "question": "Jordan NetworkとElman Networkの見分け方として正しいものはどれか。",
        "options": [
            "Jordanは出力、Elmanは隠れ状態を戻す",
            "Jordanは隠れ状態、Elmanは出力を戻す",
            "両方とも未来入力を戻す",
            "Jordanはセル状態、Elmanは畳み込み結果を戻す"
        ],
        "answer": 0,
        "explanation": "合言葉はJordan＝Output、Elman＝Hiddenです。古い順もJordan（1986）→Elman（1990）です。"
    },
    {
        "id": "rnn-model-history-order",
        "category": "RNNモデル史",
        "difficulty": "応用",
        "question": "提案時期が古いものから新しいものへの並びとして正しいものはどれか。",
        "options": [
            "GRU → LSTM → Elman → Jordan",
            "LSTM → Jordan → GRU → Elman",
            "Elman → Jordan → GRU → LSTM",
            "Jordan → Elman → LSTM → GRU"
        ],
        "answer": 3,
        "explanation": "代表的な年代はJordan（1986）→Elman（1990）→LSTM（1997）→GRU（2014）です。"
    },
    {
        "id": "rnn-exam-bilstm-output-shape",
        "setId": "rnn-exam-diagram-reading",
        "setOrder": 1,
        "category": "Bidirectional LSTM（図表）",
        "kind": "図表・長文",
        "difficulty": "本試験型",
        "beginnerReviewed": true,
        "question": "<div style=\"line-height:1.7;\">次のモデル概要で、<strong>B</strong>はバッチサイズ、各方向のLSTMの隠れ次元は64とする。<code>merge_mode=\"concat\"</code>、<code>return_sequences=False</code>のとき、出力Shapeはどれか。</div>\n                <div style=\"margin:12px 0;padding:12px;border:1px solid #c8dbee;border-radius:10px;background:#f8fbfe;overflow-x:auto;\">\n                    <table style=\"width:100%;min-width:520px;border-collapse:collapse;text-align:left;\">\n                        <tr><th style=\"padding:7px;border:1px solid #c8dbee;background:#eaf2fb;\">Layer</th><th style=\"padding:7px;border:1px solid #c8dbee;background:#eaf2fb;\">Input</th><th style=\"padding:7px;border:1px solid #c8dbee;background:#eaf2fb;\">読む状態</th></tr>\n                        <tr><td style=\"padding:7px;border:1px solid #c8dbee;\">Bidirectional(LSTM(64))</td><td style=\"padding:7px;border:1px solid #c8dbee;\">$(B,T,E)$</td><td style=\"padding:7px;border:1px solid #c8dbee;\">$\\overrightarrow h_T$（64）と $\\overleftarrow h_1$（64）</td></tr>\n                    </table>\n                    <div style=\"display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin-top:12px;\"><span style=\"padding:7px;border:1px solid #2780b8;border-radius:6px;\">$\\overrightarrow h_T$: 64</span><span>→</span><strong style=\"padding:8px 12px;border:2px solid #8e44ad;border-radius:7px;\">Concat</strong><span>←</span><span style=\"padding:7px;border:1px solid #e74c3c;border-radius:6px;\">$\\overleftarrow h_1$: 64</span></div>\n                </div>",
        "options": [
            "$(B,128)$",
            "$(B,T,128)$",
            "$(B,64)$",
            "$(B,T,64)$"
        ],
        "answer": 0,
        "explanation": "<p><strong>図で見る場所：</strong>「各方向64」「Concat」「return_sequences=False」を確認します。</p><p><strong>読み取り：</strong>系列全体を1個へまとめるので時間軸$T$は出力に残りません。順方向の最終状態64次元と、逆方向の最終状態64次元を連結します。</p><p><strong>答え：</strong>$64+64=128$より、出力は<strong>$(B,128)$</strong>です。</p><p><strong>他が違う理由：</strong>$(B,T,128)$は各時刻を返す<code>return_sequences=True</code>の形です。64次元の選択肢は片方向分しか数えていません。</p>"
    },
    {
        "id": "rnn-exam-bilstm-token-vs-summary",
        "setId": "rnn-exam-diagram-reading",
        "setOrder": 2,
        "category": "Bidirectional LSTM（図表）",
        "kind": "図表・長文",
        "difficulty": "本試験型",
        "beginnerReviewed": true,
        "question": "<div style=\"line-height:1.7;\">元の入力系列を$x_1,x_2,\\ldots,x_T$とする。次の図で、<strong>各時刻の系列ラベリング用表現</strong>と、<strong>系列分類用の全体要約</strong>の組合せとして正しいものはどれか。</div>\n                <div style=\"margin:12px 0;padding:12px;border:1px solid #d7e2ec;border-radius:10px;background:#fff;\">\n                    <div style=\"text-align:center;color:#2780b8;font-weight:700;\">$x_1\\;\\rightarrow\\;x_2\\;\\rightarrow\\;\\cdots\\;\\rightarrow\\;x_T$　（順方向）</div>\n                    <div style=\"text-align:center;margin:9px 0;\"><span style=\"padding:6px 10px;border:1px solid #8e44ad;border-radius:6px;\">位置$t$で2方向をConcat</span></div>\n                    <div style=\"text-align:center;color:#e74c3c;font-weight:700;\">$x_1\\;\\leftarrow\\;x_2\\;\\leftarrow\\;\\cdots\\;\\leftarrow\\;x_T$　（逆方向）</div>\n                </div>",
        "options": [
            "各時刻：$[\\overrightarrow h_t;\\overleftarrow h_t]$、全体要約：$[\\overrightarrow h_T;\\overleftarrow h_1]$",
            "各時刻：$[\\overrightarrow h_T;\\overleftarrow h_1]$、全体要約：$[\\overrightarrow h_t;\\overleftarrow h_t]$",
            "各時刻も全体要約も $[\\overrightarrow h_1;\\overleftarrow h_T]$",
            "逆方向は使わず、どちらも $\\overrightarrow h_T$"
        ],
        "answer": 0,
        "explanation": "<p><strong>図で見る場所：</strong>下付き文字が「現在位置$t$」か「系列の端$1,T$」かを見ます。</p><p><strong>読み取り：</strong>位置$t$の予測には、その位置での前向き・後ろ向き状態を連結します。全体要約では、順方向が全入力を読み終えた$\\overrightarrow h_T$と、逆方向が全入力を読み終えた$\\overleftarrow h_1$を使います。</p><p><strong>答え：</strong>各時刻は$[\\overrightarrow h_t;\\overleftarrow h_t]$、全体要約は$[\\overrightarrow h_T;\\overleftarrow h_1]$です。</p><p><strong>他が違う理由：</strong>$\\overrightarrow h_1$と$\\overleftarrow h_T$は、それぞれ自分の方向でまだ系列全体を読んでいません。各時刻表現と全体要約を入れ替えないようにします。</p>"
    },
    {
        "id": "rnn-exam-teacher-forcing-shift",
        "setId": "rnn-exam-diagram-reading",
        "setOrder": 3,
        "category": "Teacher Forcing（図表）",
        "kind": "図表・長文",
        "difficulty": "本試験型",
        "beginnerReviewed": true,
        "question": "<div style=\"line-height:1.7;\">Decoderの正解系列が「私 → は → 猫 → EOS」である。Teacher Forcingで各位置の<strong>次トークン</strong>を学習するとき、Decoder入力と教師ラベルの正しい組合せはどれか。</div>\n                <div style=\"margin:12px 0;padding:12px;border:1px solid #c8dbee;border-radius:10px;background:#f8fbfe;overflow-x:auto;\">\n                    <table style=\"width:100%;min-width:500px;border-collapse:collapse;text-align:center;\"><tr><th style=\"border:1px solid #c8dbee;padding:6px;\">位置</th><th style=\"border:1px solid #c8dbee;padding:6px;\">1</th><th style=\"border:1px solid #c8dbee;padding:6px;\">2</th><th style=\"border:1px solid #c8dbee;padding:6px;\">3</th><th style=\"border:1px solid #c8dbee;padding:6px;\">4</th></tr><tr><th style=\"border:1px solid #c8dbee;padding:6px;\">入力</th><td colspan=\"4\" style=\"border:1px solid #c8dbee;padding:6px;\">ここを選ぶ</td></tr><tr><th style=\"border:1px solid #c8dbee;padding:6px;\">予測する正解</th><td style=\"border:1px solid #c8dbee;padding:6px;\">私</td><td style=\"border:1px solid #c8dbee;padding:6px;\">は</td><td style=\"border:1px solid #c8dbee;padding:6px;\">猫</td><td style=\"border:1px solid #c8dbee;padding:6px;\">EOS</td></tr></table>\n                </div>",
        "options": [
            "入力：$[BOS,私,は,猫]$、教師：$[私,は,猫,EOS]$",
            "入力：$[私,は,猫,EOS]$、教師：$[私,は,猫,EOS]$",
            "入力：$[EOS,猫,は,私]$、教師：$[私,は,猫,BOS]$",
            "入力：各位置でモデル自身の予測だけ、教師：使用しない"
        ],
        "answer": 0,
        "explanation": "<p><strong>図で見る場所：</strong>入力行と「予測する正解」行を同じ列で縦に見ます。</p><p><strong>読み取り：</strong>BOSから「私」を予測し、「私」から「は」を予測します。このため正解列を1個右へずらし、空いた先頭へBOSを置きます。</p><p><strong>答え：</strong>入力$[BOS,私,は,猫]$、教師$[私,は,猫,EOS]$です。</p><p><strong>他が違う理由：</strong>入力と教師が同じでは、各位置で次ではなく同じ語を見せます。逆順化や、学習中に教師を全く使わない処理はTeacher Forcingではありません。</p>"
    },
    {
        "id": "rnn-exam-teacher-forcing-exposure-bias",
        "setId": "rnn-exam-diagram-reading",
        "setOrder": 4,
        "category": "学習時と推論時の入力差（図表）",
        "kind": "図表・長文",
        "difficulty": "本試験型",
        "beginnerReviewed": true,
        "question": "<div style=\"line-height:1.7;\">同じDecoderについて、次の入力経路の違いによって起こりやすい問題はどれか。</div>\n                <div style=\"margin:12px 0;padding:12px;border:1px solid #d7e2ec;border-radius:10px;background:#fff;\">\n                    <div style=\"margin:7px 0;\"><strong>学習時：</strong><span style=\"padding:5px 8px;border:1px solid #27ae60;border-radius:6px;background:#eafaf1;\">前の正解 $y^*_{t-1}$</span> → Decoder → $\\hat y_t$</div>\n                    <div style=\"margin:7px 0;\"><strong>推論時：</strong><span style=\"padding:5px 8px;border:1px solid #e74c3c;border-radius:6px;background:#fff3f1;\">前の予測 $\\hat y_{t-1}$</span> → Decoder → $\\hat y_t$</div>\n                </div>",
        "options": [
            "Exposure Bias：学習時に経験しない自己予測の誤りが、推論時に次の入力へ連鎖しうる",
            "Vanishing Resolution：画像の幅が必ず0になる",
            "Label Leakage：推論時にも正解ラベルを必ず入力できる",
            "Covariate Shift：双方向LSTMの出力次元が半分になる"
        ],
        "answer": 0,
        "explanation": "<p><strong>図で見る場所：</strong>2本の経路で、次のDecoderへ入るものが「正解」か「モデルの予測」かを比較します。</p><p><strong>読み取り：</strong>Teacher Forcing中は常にきれいな正解履歴を見ます。しかし推論では一度の誤予測が次の入力となり、その後の誤りへつながります。</p><p><strong>答え：</strong>この学習時と推論時の条件差が<strong>Exposure Bias</strong>です。</p><p><strong>他が違う理由：</strong>画像解像度やBiLSTMの次元の問題ではありません。推論時には正解ラベルを利用できないため、正解を必ず入力できるという説明も逆です。</p>"
    }
]
};
