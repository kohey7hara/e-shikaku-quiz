window.quizData = {
    title: "6. PyTorch実装対策ドリル（全章横断・完全版）",

    cheatSheet: `
        <style>
            .pt-wrap { color:#102a43; }
            .pt-lead { background:#f0fafb; border-left:6px solid #35bfc2; padding:14px 16px; border-radius:0 10px 10px 0; }
            .pt-note { background:#fff8e8; border-left:5px solid #f39c12; padding:10px 13px; margin:12px 0; border-radius:0 8px 8px 0; }
            .pt-code { background:#172a3a; color:#f7fbff; padding:14px; border-radius:9px; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.92em; line-height:1.65; overflow-x:auto; white-space:pre; }
            .pt-code .pt-comment { color:#b7c9d8; }
            .pt-question-code { margin:12px 0; padding:12px 14px; background:#f6f9fc; color:#17324d; border:1px solid #cfdae7; border-radius:9px; font:600 .82em/1.55 ui-monospace,SFMono-Regular,Menlo,monospace; white-space:pre; overflow-x:auto; }
            .pt-question-code code { display:block; padding:0; border-radius:0; background:transparent; color:inherit; font:inherit; }
            .pt-ask { color:#5a2200; background:#fff2a8; font-weight:900; border:2px solid #9a3412; border-radius:4px; padding:0 .14em; text-decoration:underline double #9a3412 2px; text-underline-offset:2px; -webkit-box-decoration-break:clone; box-decoration-break:clone; }
            .pt-ask-legend { display:flex; align-items:center; gap:9px; flex-wrap:wrap; margin:10px 0 18px; padding:9px 12px; color:#334e68; background:#fffdf4; border:1px solid #ecd889; border-radius:9px; font-weight:700; }
            .pt-exam-tag { display:inline-block; padding:3px 8px; color:#fff; background:#9a3412; border-radius:999px; font-size:.82em; letter-spacing:.02em; }
            .pt-formula { margin:12px 0; padding:12px 14px; background:#eef7ff; border:1px solid #b8d4ee; border-radius:9px; }
            .pt-shape-flow { display:flex; align-items:stretch; gap:7px; min-width:920px; }
            .pt-shape-step { flex:1; min-width:132px; padding:11px 9px; background:#fff; border:1px solid #b8d4ee; border-radius:9px; text-align:center; }
            .pt-shape-step strong { display:block; color:#0b6b78; margin-bottom:5px; }
            .pt-shape-arrow { display:flex; align-items:center; color:#52799b; font-size:1.35em; font-weight:900; }
            .pt-table-wrap, .pt-visual-wrap { overflow-x:auto; margin:14px 0 20px; }
            .pt-table { width:100%; min-width:760px; border-collapse:collapse; }
            .pt-table th, .pt-table td { border:1px solid #d7e2ee; padding:10px 12px; text-align:left; vertical-align:top; }
            .pt-table th { background:#eaf2fd; }
            .pt-table tr:nth-child(even) td { background:#fbfdff; }
            .pt-svg { width:100%; min-width:900px; height:auto; display:block; background:#fff; border:1px solid #d7e2ee; border-radius:12px; }
            .pt-svg-title { font:700 18px system-ui,sans-serif; fill:#102a43; }
            .pt-svg-label { font:700 14px system-ui,sans-serif; fill:#102a43; }
            .pt-svg-text { font:13px system-ui,sans-serif; fill:#334e68; }
            .pt-svg-mini { font:12px system-ui,sans-serif; fill:#486581; }
            .pt-card-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:10px; margin:12px 0 20px; }
            .pt-card { border:1px solid #d7e2ee; border-radius:10px; padding:12px; background:#fff; }
            .pt-card strong { display:block; color:#0b6b78; margin-bottom:4px; }
            .pt-kicker { font-weight:800; color:#0b6b78; }
            @media (max-width:700px) { .pt-code{font-size:.84em;} .pt-table{min-width:700px;} }
        </style>

        <div class="pt-wrap">
        <div class="pt-lead">
            <strong>試験コードは、①Shape ②dtype ③device ④学習／推論モード ⑤勾配の流れ、の順に確認します。</strong><br>
            まず各行の右にShapeを書き、次にtargetの型と損失関数が合っているかを確認します。
        </div>
        <div class="pt-ask-legend"><span class="pt-exam-tag">★頻出空欄</span><span><span class="pt-ask">黄色＋濃い文字＋二重下線</span>の箇所が、選択肢・空欄・Shape問題で特に聞かれます。まずここだけ拾ってください。</span></div>

        <h3>■ 最初に読む記号</h3>
        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>記号</th><th>意味</th><th>例</th></tr>
            <tr><td><strong>B</strong></td><td>Batch size（同時に処理するデータ数）</td><td>画像8枚ならB=8</td></tr>
            <tr><td><strong>C</strong></td><td>ChannelまたはClass。文脈で区別</td><td>RGB画像はC=3、10クラス分類のlogitsはC=10</td></tr>
            <tr><td><strong>H, W</strong></td><td>Height, Width（高さ・幅）</td><td>CNN入力は通常(B,C,H,W)</td></tr>
            <tr><td><strong>L</strong></td><td>Sequence length（トークン数・系列長）</td><td>文章を20 tokenにそろえたらL=20</td></tr>
            <tr><td><strong>D / E</strong></td><td>Feature / Embedding dimension（特徴次元）</td><td>Transformer入力は(B,L,D)</td></tr>
            <tr><td><strong>H<sub>hidden</sub></strong></td><td>RNNのhidden size（隠れ次元）</td><td>双方向LSTMのoutput幅は2H<sub>hidden</sub></td></tr>
        </table></div>

        <h3>■ 図解①：1ミニバッチの学習と推論</h3>
        <div class="pt-visual-wrap">
        <svg class="pt-svg" viewBox="0 0 960 500" role="img" aria-labelledby="pt-train-title pt-train-desc">
            <title id="pt-train-title">PyTorchの学習ループと推論ループ</title>
            <desc id="pt-train-desc">学習時はデータ取得、勾配消去、順伝播、損失、逆伝播、更新の順。推論時はevalとinference_modeを併用する。</desc>
            <defs>
                <marker id="pt-arrow-train" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#52799b"/></marker>
                <marker id="pt-arrow-back" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#d64545"/></marker>
            </defs>
            <text x="28" y="35" class="pt-svg-title">学習：Autograd（自動微分）とOptimizer（更新担当）は別の役割</text>
            <rect x="28" y="58" width="135" height="58" rx="9" fill="#eaf2fd" stroke="#3498db"/>
            <text x="45" y="83" class="pt-svg-label">DataLoader</text><text x="45" y="103" class="pt-svg-mini">batch: x, y</text>
            <rect x="190" y="58" width="135" height="58" rx="9" fill="#f7f1fa" stroke="#8e44ad"/>
            <text x="211" y="82" class="pt-svg-label">zero_grad()</text><text x="205" y="103" class="pt-svg-mini">前回の.gradを消す</text>
            <rect x="352" y="58" width="135" height="58" rx="9" fill="#eafaf1" stroke="#27ae60"/>
            <text x="376" y="82" class="pt-svg-label">model(x)</text><text x="371" y="103" class="pt-svg-mini">forward→logits</text>
            <rect x="514" y="58" width="135" height="58" rx="9" fill="#fff8e8" stroke="#f39c12"/>
            <text x="544" y="82" class="pt-svg-label">criterion</text><text x="543" y="103" class="pt-svg-mini">lossを計算</text>
            <rect x="676" y="58" width="120" height="58" rx="9" fill="#fff0f0" stroke="#d64545"/>
            <text x="690" y="82" class="pt-svg-label">backward()</text><text x="692" y="103" class="pt-svg-mini">.gradへ加算</text>
            <rect x="823" y="58" width="108" height="58" rx="9" fill="#e8f8f5" stroke="#16a085"/>
            <text x="839" y="82" class="pt-svg-label">step()</text><text x="836" y="103" class="pt-svg-mini">重みを更新</text>
            <g stroke="#52799b" stroke-width="2" marker-end="url(#pt-arrow-train)"><path d="M163 87H187"/><path d="M325 87H349"/><path d="M487 87H511"/><path d="M649 87H673"/><path d="M796 87H820"/></g>
            <path d="M736 122 C705 180,505 180,418 122" fill="none" stroke="#d64545" stroke-width="2" marker-end="url(#pt-arrow-back)"/>
            <text x="492" y="204" class="pt-svg-text">backwardはforwardで記録した計算グラフを逆向きにたどる</text>

            <rect x="30" y="215" width="900" height="82" rx="10" fill="#f8fbfe" stroke="#b9cde0"/>
            <text x="50" y="241" class="pt-svg-label">重要：PyTorchの勾配は上書きではなく加算</text>
            <text x="50" y="266" class="pt-svg-text">通常の更新：各batchで zero_grad → backward → step</text>
            <text x="500" y="266" class="pt-svg-text">勾配蓄積：複数batch分をbackwardしてからstep</text>
            <text x="50" y="287" class="pt-svg-mini">Gradient clippingを使うなら backward後・step前</text>

            <text x="28" y="337" class="pt-svg-title">推論：2つをセットで使う</text>
            <rect x="70" y="360" width="235" height="78" rx="10" fill="#eafaf1" stroke="#27ae60"/>
            <text x="100" y="390" class="pt-svg-label">model.eval()</text><text x="91" y="416" class="pt-svg-text">Dropout・BatchNormの挙動を切替</text>
            <rect x="365" y="360" width="265" height="78" rx="10" fill="#eaf2fd" stroke="#3498db"/>
            <text x="394" y="390" class="pt-svg-label">torch.inference_mode()</text><text x="400" y="416" class="pt-svg-text">勾配記録を止め、推論向けに実行</text>
            <rect x="690" y="360" width="200" height="78" rx="10" fill="#fff8e8" stroke="#f39c12"/>
            <text x="737" y="390" class="pt-svg-label">model(x)</text><text x="720" y="416" class="pt-svg-text">logits→予測・指標</text>
            <g stroke="#52799b" stroke-width="2" marker-end="url(#pt-arrow-train)"><path d="M305 399H362"/><path d="M630 399H687"/></g>
            <text x="70" y="471" class="pt-svg-mini">eval()だけでは勾配記録は止まらない。inference_mode()だけではDropout/BatchNormのモードは変わらない。</text>
        </svg></div>

        <div class="pt-code"><span class="pt-comment"># 学習</span>
<span class="pt-ask">model.train()</span>
for x, y in train_loader:
    x, y = x.to(device), y.to(device)
    <span class="pt-ask">optimizer.zero_grad(set_to_none=True)</span>
    logits = model(x)
    loss = criterion(logits, y)
    <span class="pt-ask">loss.backward()</span>
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  <span class="pt-comment"># 必要な場合</span>
    <span class="pt-ask">optimizer.step()</span>

<span class="pt-comment"># 推論</span>
<span class="pt-ask">model.eval()</span>
with <span class="pt-ask">torch.inference_mode()</span>:
    logits = model(x)
    pred = <span class="pt-ask">logits.argmax(dim=1)</span></div>

        <h3>■ 損失関数：コードは「出力 → target → loss」の3行で読む</h3>
        <div class="pt-lead">
            <strong>試験の3手：</strong>①モデル出力のShapeを見る → ②targetのShapeとdtypeをそろえる → ③損失関数へ渡す。<br>
            <strong>logits（ロジット）</strong>は、SoftmaxやSigmoidをかける前の「生の点数」です。
        </div>
        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>何を予測するか</th><th>出力</th><th>target</th><th>使う損失</th><th>試験の一言</th></tr>
            <tr><td>実数</td><td><code>pred=(B,1)</code>など</td><td>float・predと同Shape</td><td><code>MSELoss</code></td><td>回帰には確率化もargmaxも不要。</td></tr>
            <tr><td>C classから1つ</td><td><code>logits=(B,C)</code></td><td>long・class番号<code>(B,)</code></td><td><code>CrossEntropyLoss</code></td><td>loss前のSoftmaxは不要。</td></tr>
            <tr><td>1出力の2値分類</td><td><code>logits=(B,1)</code></td><td>float・logitsと同Shape</td><td><code>BCEWithLogitsLoss</code></td><td>Sigmoid込み。先にSigmoidしない。</td></tr>
            <tr><td>複数labelを独立判定</td><td><code>logits=(B,C)</code></td><td>float・0/1の<code>(B,C)</code></td><td><code>BCEWithLogitsLoss</code></td><td>C個のYes／No判定。</td></tr>
            <tr><td>多class segmentation</td><td><code>logits=(B,C,H,W)</code></td><td>long・class番号<code>(B,H,W)</code></td><td><code>CrossEntropyLoss</code></td><td>targetからC軸を除く。</td></tr>
            <tr><td>LogSoftmax済み</td><td><code>log_probs=(B,C)</code></td><td>long・class番号<code>(B,)</code></td><td><code>NLLLoss</code></td><td>raw logitsを直接渡さない。</td></tr>
        </table></div>

        <h4>① 多class分類：CrossEntropyLoss</h4>
        <p>ここでは、本試験の基本形である<strong>「1sampleにつき正解classが1つ」</strong>の場合を扱います。</p>
        <pre class="pt-question-code"><code>logits = <span class="pt-ask">model(x)</span>                  # <span class="pt-ask">(B, C)</span>：生の点数
target = <span class="pt-ask">target.long()</span>            # <span class="pt-ask">(B,)</span>：正解class番号
loss = <span class="pt-ask">nn.CrossEntropyLoss()(logits, target)</span>

pred = <span class="pt-ask">logits.argmax(dim=1)</span>       # 予測classは(B,)</code></pre>
        <div class="pt-note">
            <strong>最重要：</strong><code>logits</code>は「モデルの予測」、<code>target</code>は「正解」です。引数の順番は必ず<strong>予測 → 正解</strong>。<br>
            CEの基本形では、<code>logits=(B,C)</code>と<code>target=(B,)</code>は<strong>同じShapeではありません</strong>。
        </div>

        <h4><code>nn.CrossEntropyLoss()(logits, target)</code>を2段階に分ける</h4>
        <pre class="pt-question-code"><code># ① 最初の ()：損失関数を作る
criterion = <span class="pt-ask">nn.CrossEntropyLoss()</span>

# ② 次の (logits, target)：予測と正解を渡す
loss = <span class="pt-ask">criterion(logits, target)</span>

# 上の2行と同じ意味
loss = <span class="pt-ask">nn.CrossEntropyLoss()(logits, target)</span></code></pre>
        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>空欄になりやすい場所</th><th>答え</th><th>なぜそうなるか</th><th>よくある誤答</th></tr>
            <tr><td>モデルの最終層</td><td><code>nn.Linear(hidden, C)</code></td><td>C classそれぞれの点数を出す。</td><td><code>nn.Linear(hidden, 1)</code></td></tr>
            <tr><td><code>logits</code>のShape</td><td><strong>(B,C)</strong></td><td>B件それぞれにC個の点数。</td><td>(C,B)、(B,)</td></tr>
            <tr><td><code>target</code>のShape</td><td><strong>(B,)</strong></td><td>1sampleにつき正解class番号は1個。</td><td>(B,1)、(B,C)のone-hot</td></tr>
            <tr><td><code>target</code>のdtype</td><td><code>torch.long</code></td><td>0〜C−1のclass番号を入れる。</td><td><code>float</code></td></tr>
            <tr><td>lossの引数順</td><td><code>(logits, target)</code></td><td>予測を先、正解を後に渡す。</td><td><code>(target, logits)</code></td></tr>
            <tr><td>予測class</td><td><code>argmax(dim=1)</code></td><td><code>dim=1</code>がclass軸C。</td><td><code>dim=0</code></td></tr>
            <tr><td>lossのShape</td><td><strong>scalar <code>()</code></strong></td><td>既定の<code>reduction='mean'</code>でBatch平均。</td><td>(B,C)</td></tr>
        </table></div>

        <h4>Shape図解：「点数表」と「正解番号」を比べる</h4>
        <pre class="pt-question-code"><code>logits = [                         # Shape (B=3, C=3)
    [ 2.1, 0.3, -1.0 ],          # sample 0：3classの点数
    [ 0.2, 0.8,  1.5 ],          # sample 1：3classの点数
    [ 0.1, 2.0,  0.4 ]           # sample 2：3classの点数
]

target = [0, 2, 1]               # Shape (B=3,)・long
         # ↑  ↑  ↑
         # 各sampleの正解class番号

loss = criterion(logits, target) # 既定では平均された1個のloss</code></pre>

        <div class="pt-card-grid">
            <div class="pt-card"><strong>試験でよく聞かれる5か所</strong>①<code>Linear</code>の出力数C<br>②logitsのShape<br>③targetのShape・dtype<br>④<code>(logits,target)</code>の順番<br>⑤<code>argmax(dim=1)</code></div>
            <div class="pt-card"><strong>この基本形なら5秒で消せる</strong>loss前にSoftmax／targetがfloat／引数が逆／<code>argmax(dim=0)</code>／C classなのに最終出力が1個。</div>
            <div class="pt-card"><strong>覚える1行</strong><code>点数表 (B,C) ＋ 正解番号 (B,) → loss 1個</code><br><code>pred</code>は正解率の計算用で、lossへは渡さない。</div>
        </div>
        <div class="pt-note"><strong>Softmaxはいつ使う？</strong>CEの学習時は不要です。確率を表示したい推論時だけ使います。最大位置は変わらないため、予測classだけなら<code>logits.argmax(dim=1)</code>で求められます。</div>

        <h4>② 1出力の2値分類：BCEWithLogitsLoss</h4>
        <pre class="pt-question-code"><code>logits = model(x)                         # (B, 1)
target = <span class="pt-ask">target.float().view_as(logits)</span>  # (B, 1)へそろえる
loss = <span class="pt-ask">nn.BCEWithLogitsLoss()(logits, target)</span>

prob = <span class="pt-ask">torch.sigmoid(logits)</span>             # Sigmoidは予測時</code></pre>
        <div class="pt-note"><strong>覚え方：</strong>BCEWithLogits＝Sigmoid＋BCE。targetはfloatかつlogitsと同Shapeです。<code>target=(B,)</code>のまま渡すのはShape不一致です。</div>

        <h4>③ 回帰・マルチラベル・segmentation</h4>
        <pre class="pt-question-code"><code># 回帰：実数を当てる
pred = model(x)                           # (B, 1)
target = <span class="pt-ask">target.float().view_as(pred)</span>    # (B, 1)
loss = <span class="pt-ask">nn.MSELoss()(pred, target)</span>

# マルチラベル：各labelを独立にYes／No
logits = model(x)                         # (B, C)
target = target.float()                  # (B, C)、各要素は0/1
loss = <span class="pt-ask">nn.BCEWithLogitsLoss()(logits, target)</span>

# 多class segmentation：画素ごとにclass番号
logits = model(x)                         # (B, C, H, W)
target = <span class="pt-ask">target.long()</span>                   # (B, H, W)
loss = <span class="pt-ask">nn.CrossEntropyLoss()(logits, target)</span></code></pre>

        <h4>④ CrossEntropyLossとNLLLossのコード差</h4>
        <pre class="pt-question-code"><code># raw logitsをそのまま使う
loss_ce = <span class="pt-ask">nn.CrossEntropyLoss()(logits, target)</span>

# LogSoftmaxを自分で書いた場合
log_probs = <span class="pt-ask">torch.log_softmax(logits, dim=1)</span>
loss_nll = <span class="pt-ask">nn.NLLLoss()(log_probs, target)</span></code></pre>
        <div class="pt-note"><strong>試験の見分け方：</strong><code>raw logits → CrossEntropyLoss</code>、<code>log_softmax済み → NLLLoss</code>です。通常のclass番号targetでは、この2つは同じ組合せを別の書き方にしたものです。</div>

        <h4>⑤ 手書きSoftmax＋Cross Entropy：逆伝播まで</h4>
        <pre class="pt-question-code"><code># u: (B,in), W: (in,C), z・y・correct: (B,C)
z = u @ W + b
z = z - np.max(z, <span class="pt-ask">axis=1, keepdims=True</span>)  # 各sampleの最大値を引く
exp_z = np.exp(z)
y = exp_z / np.sum(exp_z, axis=1, keepdims=True)

loss = -np.mean(
    np.sum(correct * np.log(y + 1e-8), axis=1)
)

# 各sampleの未平均の誤差と勾配和
<span class="pt-ask">dz = y - correct</span>
<span class="pt-ask">dW = u.T @ dz</span>
<span class="pt-ask">db = np.sum(dz, axis=0)</span>
<span class="pt-ask">du = dz @ W.T</span>

# この実装では更新時に1回だけBatch平均する
B = u.shape[0]
<span class="pt-ask">W = W - learning_rate * dW / B</span>
b = b - learning_rate * db / B</code></pre>
        <div class="pt-note">
            <strong>最重要：</strong>各sampleでは<code>dz = y - correct</code>です。平均lossなら<code>/B</code>を、<code>dz</code>・勾配・更新式の<strong>どこか1か所だけ</strong>で行います。2回割ってはいけません。<br>
            <strong>PyTorchでは：</strong>通常はこれらを手書きせず、<code>loss.backward()</code>が自動計算します。NumPyの穴埋め問題では上の式を使います。
        </div>

        <h3>■ NumPy手書きDNN連問は「Shape → 公式 → コード」で解く</h3>
        <p>本試験では、PyTorchだけでなくNumPyで全結合層・Softmax・Cross Entropy・誤差逆伝播を手書きした長いコードから、複数の空欄を連続して問う形式があります。コードを丸暗記せず、<strong>行列のShapeがつながるか</strong>を先に確認します。</p>
        <div class="pt-note"><strong>PyTorchとの違い：</strong>手書きNumPy版は <code>Softmax → one-hot正解とのCross Entropy</code> を明示します。一方、PyTorchの標準的な多クラス分類は、<code>raw logits</code>と<code>longのclass番号</code>をそのまま<code>CrossEntropyLoss</code>へ渡します。重みのShapeも、ここでのNumPy版は<code>W=(in,out)</code>として<code>x @ W</code>、<code>nn.Linear</code>は<code>weight=(out,in)</code>として内部で実質<code>x @ weight.T + bias</code>です。2つの流儀を混ぜないことが重要です。</div>

        <div class="pt-visual-wrap">
        <svg class="pt-svg" viewBox="0 0 960 390" role="img" aria-labelledby="pt-numpy-title pt-numpy-desc">
            <title id="pt-numpy-title">NumPyで手書きする多層全結合ネットワークの順伝播と逆伝播</title>
            <desc id="pt-numpy-desc">入力784次元、隠れ層128次元と64次元、出力10クラスのShapeと、逆伝播で使う4つの式を示す。</desc>
            <defs>
                <marker id="pt-arrow-numpy-forward" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#52799b"/></marker>
                <marker id="pt-arrow-numpy-back" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#d64545"/></marker>
            </defs>
            <text x="28" y="34" class="pt-svg-title">Forward：右端の特徴数だけが 784 → 128 → 64 → 10 と変わる</text>

            <rect x="28" y="80" width="135" height="72" rx="9" fill="#eaf2fd" stroke="#3498db"/>
            <text x="54" y="107" class="pt-svg-label">入力 x</text><text x="52" y="133" class="pt-svg-text">(B, 784)</text>
            <rect x="225" y="80" width="155" height="72" rx="9" fill="#fff8e8" stroke="#f39c12"/>
            <text x="246" y="107" class="pt-svg-label">中間層1</text><text x="245" y="133" class="pt-svg-text">ReLU → (B,128)</text>
            <rect x="442" y="80" width="155" height="72" rx="9" fill="#fff8e8" stroke="#f39c12"/>
            <text x="463" y="107" class="pt-svg-label">中間層2</text><text x="462" y="133" class="pt-svg-text">ReLU → (B,64)</text>
            <rect x="659" y="80" width="155" height="72" rx="9" fill="#eafaf1" stroke="#27ae60"/>
            <text x="686" y="107" class="pt-svg-label">出力 y</text><text x="681" y="133" class="pt-svg-text">Softmax → (B,10)</text>
            <rect x="856" y="80" width="76" height="72" rx="9" fill="#f7f1fa" stroke="#8e44ad"/>
            <text x="871" y="107" class="pt-svg-label">Loss</text><text x="873" y="133" class="pt-svg-mini">CE平均</text>

            <g stroke="#52799b" stroke-width="2" marker-end="url(#pt-arrow-numpy-forward)">
                <path d="M163 116H222"/><path d="M380 116H439"/><path d="M597 116H656"/><path d="M814 116H853"/>
            </g>
            <text x="165" y="69" class="pt-svg-mini">W0: (784,128)</text>
            <text x="382" y="69" class="pt-svg-mini">W1: (128,64)</text>
            <text x="605" y="69" class="pt-svg-mini">W2: (64,10)</text>

            <path d="M810 205H228" fill="none" stroke="#d64545" stroke-width="2" marker-end="url(#pt-arrow-numpy-back)"/>
            <text x="320" y="191" class="pt-svg-label" fill="#d64545">Backward：出力側から同じ規則を1層ずつ繰り返す</text>

            <rect x="28" y="232" width="205" height="62" rx="8" fill="#fff0f0" stroke="#d64545"/>
            <text x="48" y="258" class="pt-svg-label">1層前へ戻す</text><text x="48" y="281" class="pt-svg-text">du = dz @ Wᵀ</text>
            <rect x="257" y="232" width="205" height="62" rx="8" fill="#fff0f0" stroke="#d64545"/>
            <text x="277" y="258" class="pt-svg-label">重みの勾配</text><text x="277" y="281" class="pt-svg-text">dW = uᵀ @ dz</text>
            <rect x="486" y="232" width="205" height="62" rx="8" fill="#fff0f0" stroke="#d64545"/>
            <text x="506" y="258" class="pt-svg-label">biasの勾配</text><text x="506" y="281" class="pt-svg-text">db = sum(dz, axis=0)</text>
            <rect x="715" y="232" width="217" height="62" rx="8" fill="#fff0f0" stroke="#d64545"/>
            <text x="735" y="258" class="pt-svg-label">各sampleの誤差</text><text x="735" y="281" class="pt-svg-text">dz = y − correct</text>

            <rect x="28" y="318" width="435" height="48" rx="8" fill="#f8fbfe" stroke="#b9cde0"/>
            <text x="48" y="348" class="pt-svg-text">更新：W ← W − learning_rate × dW / B</text>
            <rect x="486" y="318" width="446" height="48" rx="8" fill="#f8fbfe" stroke="#b9cde0"/>
            <text x="506" y="348" class="pt-svg-text">正解率：argmax(axis=1)を比較 → mean</text>
        </svg></div>

        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>段階</th><th>Shapeで見る</th><th>使う公式・コード</th></tr>
            <tr><td><strong>① 初期化</strong></td><td>隣接層を (入力, 出力) で組にする</td><td><code>zip(sizes[:-1], sizes[1:])</code></td></tr>
            <tr><td><strong>② Forward・Loss</strong></td><td><code>(B,in) @ (in,out) → (B,out)</code><br>class軸は<code>axis=1</code></td><td><code>z = u @ W + b</code><br><code>-mean(sum(correct * log(y), axis=1))</code></td></tr>
            <tr><td><strong>③ Backward</strong></td><td><code>dz:(B,out)</code>からparameterと同じShapeを作る</td><td>各sampleは<code>dz=y-correct</code><br><code>dW=u.T@dz</code>、<code>db=sum(dz,axis=0)</code>、<code>du=dz@W.T</code></td></tr>
            <tr><td><strong>④ 更新・評価</strong></td><td>勾配和ならBatch数Bで1回だけ割る<br>1行が1sample</td><td><code>W -= lr*dW/B</code><br><code>mean(argmax(y,axis=1) == argmax(correct,axis=1))</code></td></tr>
        </table></div>
        <div class="pt-note"><strong>添付問題を安全に読む補足：</strong>定義が<code>DNNClassifier(input_size, num_class, hidden_units)</code>なら、実行できる生成例は<code>DNNClassifier(784, 10, [128,64])</code>です。また、<code>np.equal(...)</code>だけではTrue/Falseの配列なので、正解率にするには最後に<code>np.mean(...)</code>が必要です。</div>

        <h3>■ 本試験型：L1・L2のコード空欄</h3>
        <div class="pt-note"><strong>最初に式を見る：</strong>L1なら<code>abs()</code>、L2なら<code>pow(2)</code>または<code>weight_decay</code>。損失へ手動で足す方式とoptimizerの<code>weight_decay</code>を同時に使うと二重適用になるため、問題文の方式に合わせます。</div>
        <div class="pt-code"># L1：損失へ絶対値和を足す
data_loss = criterion(outputs, labels)
l1_penalty = <span class="pt-ask">sum(p.abs().sum() for p in model.parameters())</span>
loss = data_loss + lambda_l1 * l1_penalty

# L2相当：optimizerで指定
optimizer = torch.optim.SGD(
    model.parameters(),
    lr=0.01,
    <span class="pt-ask">weight_decay=lambda_l2</span>
)</div>
        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>問題文の合図</th><th>空欄へ答えるコード</th><th>意味</th></tr>
            <tr><td>L1／絶対値和／スパース</td><td><code class="pt-ask">p.abs().sum()</code></td><td>各parameterの絶対値を合計。</td></tr>
            <tr><td>L2／二乗和を手動加算</td><td><code>p.pow(2).sum()</code></td><td>二乗和をlossへ足す。</td></tr>
            <tr><td>optimizerでL2相当</td><td><code class="pt-ask">weight_decay=...</code></td><td>SGDではL2と同じ更新形。</td></tr>
            <tr><td>Adamで減衰を分離</td><td><code>torch.optim.AdamW(...)</code></td><td>weight decayを適応的勾配更新から分ける。</td></tr>
        </table></div>

        <h3>■ Module・Tensor・DataLoaderの最小セット</h3>
        <div class="pt-card-grid">
            <div class="pt-card"><strong>nn.Module</strong><code>__init__</code>で層を登録し、<code>forward</code>で接続する。可変個数の層は<code>ModuleList</code>。</div>
            <div class="pt-card"><strong>Tensor操作</strong><code>reshape</code>＝形変更、<code>permute</code>＝軸順変更、<code>unsqueeze</code>＝長さ1の軸を追加。</div>
            <div class="pt-card"><strong>Dataset</strong>必須の入口は<code>__len__</code>と<code>__getitem__</code>。1件を返す。</div>
            <div class="pt-card"><strong>DataLoader</strong>複数件をbatch化。可変長データは<code>collate_fn</code>でpaddingする。</div>
            <div class="pt-card"><strong>device</strong>モデルと入力を同じCPU/GPUへ。<code>x = x.to(device)</code>の戻り値を受け取る。</div>
            <div class="pt-card"><strong>state_dict</strong>parameterとpersistent bufferを持つ。再開にはoptimizer・epoch等もcheckpointへ。</div>
        </div>

        <div class="pt-code">class MLP(nn.Module):
    def __init__(self, in_dim, hidden, classes):
        <span class="pt-ask">super().__init__()</span>
        self.layers = nn.Sequential(
            nn.Linear(in_dim, hidden),
            nn.ReLU(),
            <span class="pt-ask">nn.Linear(hidden, classes)</span>
        )

    def forward(self, x):
        <span class="pt-ask">return self.layers(x)</span></div>

        <h3>■ 図解②：CNN・RNN・TransformerのShape</h3>
        <div class="pt-visual-wrap">
        <svg class="pt-svg" viewBox="0 0 960 610" role="img" aria-labelledby="pt-shape-title pt-shape-desc">
            <title id="pt-shape-title">CNN RNN TransformerのPyTorch shapeフロー</title>
            <desc id="pt-shape-desc">CNNはBCHW、RNNとTransformerはbatch_firstならBLDで処理する。</desc>
            <defs><marker id="pt-arrow-shape" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#52799b"/></marker></defs>
            <text x="28" y="34" class="pt-svg-title">Shapeは「軸の意味」を日本語に戻してから追う</text>

            <rect x="28" y="58" width="904" height="145" rx="12" fill="#f5f9ff" stroke="#3498db"/>
            <text x="48" y="84" class="pt-svg-label">CNN（Convolutional Neural Network／畳み込みニューラルネットワーク）</text>
            <rect x="52" y="105" width="130" height="52" rx="7" fill="#fff" stroke="#3498db"/><text x="70" y="128" class="pt-svg-label">x: (B,C,H,W)</text><text x="67" y="147" class="pt-svg-mini">N=B（batch）</text>
            <rect x="226" y="105" width="160" height="52" rx="7" fill="#fff" stroke="#3498db"/><text x="260" y="128" class="pt-svg-label">Conv / Pool</text><text x="235" y="147" class="pt-svg-mini">Conv:C→Cout／Pool:C維持</text>
            <rect x="430" y="105" width="150" height="52" rx="7" fill="#fff" stroke="#3498db"/><text x="449" y="128" class="pt-svg-label">flatten(x,1)</text><text x="455" y="147" class="pt-svg-mini">→(B,Features)</text>
            <rect x="624" y="105" width="130" height="52" rx="7" fill="#fff" stroke="#3498db"/><text x="650" y="128" class="pt-svg-label">Linear</text><text x="646" y="147" class="pt-svg-mini">→(B,classes)</text>
            <g stroke="#52799b" stroke-width="2" marker-end="url(#pt-arrow-shape)"><path d="M182 131H223"/><path d="M386 131H427"/><path d="M580 131H621"/></g>
            <text x="52" y="184" class="pt-svg-mini">ReLU・BatchNorm2dはShape不変／PoolはCを保つ／AdaptiveAvgPool2d((1,1))はH,Wを1×1へ</text>

            <rect x="28" y="222" width="904" height="167" rx="12" fill="#f4fbf7" stroke="#27ae60"/>
            <text x="48" y="248" class="pt-svg-label">RNN（再帰型NN）/ LSTM（長短期記憶）（batch_first=True）</text>
            <rect x="52" y="270" width="130" height="52" rx="7" fill="#fff" stroke="#27ae60"/><text x="78" y="293" class="pt-svg-label">IDs (B,L)</text><text x="65" y="312" class="pt-svg-mini">dtype=torch.long</text>
            <rect x="226" y="270" width="145" height="52" rx="7" fill="#fff" stroke="#27ae60"/><text x="251" y="293" class="pt-svg-label">Embedding</text><text x="255" y="312" class="pt-svg-mini">→(B,L,E)</text>
            <rect x="415" y="270" width="135" height="52" rx="7" fill="#fff" stroke="#27ae60"/><text x="455" y="293" class="pt-svg-label">LSTM</text><text x="445" y="312" class="pt-svg-mini">2種類を返す</text>
            <rect x="594" y="258" width="285" height="78" rx="7" fill="#fff" stroke="#27ae60"/><text x="616" y="280" class="pt-svg-label">output と (h_n, c_n)</text><text x="616" y="302" class="pt-svg-mini">output: (B,L,Directions×H_hidden)</text><text x="616" y="322" class="pt-svg-mini">state: (Layers×Directions,B,H_hidden)</text>
            <g stroke="#52799b" stroke-width="2" marker-end="url(#pt-arrow-shape)"><path d="M182 296H223"/><path d="M371 296H412"/><path d="M550 296H591"/></g>
            <text x="52" y="350" class="pt-svg-mini">output[:,-1,:]は同一長・単方向の単純例。paddingありはlength/pack、双方向はh_nの方向軸も確認。</text>
            <text x="52" y="374" class="pt-svg-mini">GRUはc_nを返さず、outputとh_nを返す。</text>

            <rect x="28" y="408" width="904" height="172" rx="12" fill="#fff9ef" stroke="#f39c12"/>
            <text x="48" y="434" class="pt-svg-label">Transformer Encoder（batch_first=True）</text>
            <rect x="52" y="456" width="132" height="52" rx="7" fill="#fff" stroke="#f39c12"/><text x="78" y="479" class="pt-svg-label">IDs (B,L)</text><text x="65" y="498" class="pt-svg-mini">paddingも含む</text>
            <rect x="228" y="456" width="168" height="52" rx="7" fill="#fff" stroke="#f39c12"/><text x="243" y="479" class="pt-svg-label">Embedding＋位置</text><text x="262" y="498" class="pt-svg-mini">→(B,L,D)</text>
            <rect x="440" y="456" width="210" height="52" rx="7" fill="#fff" stroke="#f39c12"/><text x="462" y="479" class="pt-svg-label">TransformerEncoder</text><text x="492" y="498" class="pt-svg-mini">→(B,L,D)</text>
            <rect x="694" y="456" width="190" height="52" rx="7" fill="#fff" stroke="#f39c12"/><text x="708" y="479" class="pt-svg-label">CLS token / mean</text><text x="728" y="498" class="pt-svg-mini">→Linear→logits</text>
            <g stroke="#52799b" stroke-width="2" marker-end="url(#pt-arrow-shape)"><path d="M184 482H225"/><path d="M396 482H437"/><path d="M650 482H691"/></g>
            <text x="52" y="540" class="pt-svg-mini">d_modelはnheadで割り切れる。padding mask: (B,L)／causal mask: (L,L)。役割は別。</text>
            <text x="52" y="562" class="pt-svg-mini">Padding mask＝PADを見ない。Causal mask＝未来を見ない。</text>
        </svg></div>

        <h3>■ CNNのNCHW連問：<code>32 → 28 → 14 → 10 → 5</code>を追う</h3>
        <div class="pt-lead">
            <strong>NCHWは、N＝画像枚数、C＝channel数、H＝高さ、W＝幅です。</strong><br>
            先にH・Wを計算し、ConvではCを<code>out_channels</code>へ変更、PoolではCをそのまま残します。
        </div>
        <div class="pt-formula">
            <strong>通常の試験（dilation=1）で使う式：</strong>
            <code>out = floor((in + 2P − K) / S) + 1</code><br>
            <small>K＝kernel、S＝stride、P＝padding。dilationが指定されたときだけ、<code>K</code>を<code>D(K−1)+1</code>へ置き換えます。</small>
        </div>

        <pre class="pt-question-code"><code>class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, <span class="pt-ask">6</span>, kernel_size=<span class="pt-ask">5</span>, stride=1, padding=0)
        self.pool  = nn.MaxPool2d(kernel_size=<span class="pt-ask">2</span>, stride=<span class="pt-ask">2</span>)
        self.conv2 = nn.Conv2d(6, <span class="pt-ask">16</span>, kernel_size=<span class="pt-ask">5</span>, stride=1, padding=0)
        self.fc1   = nn.Linear(in_features=<span class="pt-ask">16 * 5 * 5</span>, out_features=120)
        self.fc2   = nn.Linear(120, 84)
        self.fc3   = nn.Linear(84, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = <span class="pt-ask">torch.flatten(x, 1)</span>
        return self.fc3(F.relu(self.fc2(F.relu(self.fc1(x)))))</code></pre>

        <div class="pt-visual-wrap"><div class="pt-shape-flow" role="img" aria-label="4枚の32×32 RGB画像がConv、Pool、Conv、Pool、Flatten、Linearを通るNCHWの数値遷移">
            <div class="pt-shape-step"><strong>入力</strong><code>(4,3,32,32)</code><br><small>N=4, C=3</small></div><div class="pt-shape-arrow">→</div>
            <div class="pt-shape-step"><strong>Conv1</strong><code>(4,6,28,28)</code><br><small>32−5＋1</small></div><div class="pt-shape-arrow">→</div>
            <div class="pt-shape-step"><strong>Pool1</strong><code>(4,6,14,14)</code><br><small>28÷2</small></div><div class="pt-shape-arrow">→</div>
            <div class="pt-shape-step"><strong>Conv2</strong><code>(4,16,10,10)</code><br><small>14−5＋1</small></div><div class="pt-shape-arrow">→</div>
            <div class="pt-shape-step"><strong>Pool2</strong><code>(4,16,5,5)</code><br><small>10÷2</small></div><div class="pt-shape-arrow">→</div>
            <div class="pt-shape-step"><strong>Flatten</strong><code>(4,400)</code><br><small>16×5×5</small></div><div class="pt-shape-arrow">→</div>
            <div class="pt-shape-step"><strong>3つのLinear</strong><code>(4,10)</code><br><small>120→84→10</small></div>
        </div></div>

        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>通過地点</th><th>N</th><th>C</th><th>H×W／Features</th><th>書き込むShape</th></tr>
            <tr><td>入力</td><td>4</td><td>3</td><td>32×32</td><td><code>(4,3,32,32)</code></td></tr>
            <tr><td><code>Conv2d(3,6,K=5,S=1,P=0)</code></td><td>4</td><td><span class="pt-ask">6</span></td><td><span class="pt-ask">32−5＋1＝28</span></td><td><code>(4,6,28,28)</code></td></tr>
            <tr><td><code>MaxPool2d(K=2,S=2)</code></td><td>4</td><td>6</td><td><span class="pt-ask">28÷2＝14</span></td><td><code>(4,6,14,14)</code></td></tr>
            <tr><td><code>Conv2d(6,16,K=5,S=1,P=0)</code></td><td>4</td><td><span class="pt-ask">16</span></td><td><span class="pt-ask">14−5＋1＝10</span></td><td><code>(4,16,10,10)</code></td></tr>
            <tr><td>同じPoolをもう1回</td><td>4</td><td>16</td><td><span class="pt-ask">10÷2＝5</span></td><td><code>(4,16,5,5)</code></td></tr>
            <tr><td><code>torch.flatten(x,1)</code></td><td>4</td><td colspan="2"><span class="pt-ask">16×5×5＝400</span></td><td><code>(4,400)</code></td></tr>
            <tr><td><code>Linear(400,120)→(120,84)→(84,10)</code></td><td>4</td><td colspan="2">最後の軸だけ120→84→10</td><td><code>(4,10)</code></td></tr>
        </table></div>

        <div class="pt-note"><strong>空欄（あ）の答え方：</strong>2回目のPool直後は<code>(B,16,5,5)</code>。したがって、<code>torch.flatten(x,1)</code>後の1sampleは<strong>16×5×5＝400個</strong>です。答えは<code>nn.Linear(in_features=16 * 5 * 5, out_features=120)</code>です。</div>
        <div class="pt-card-grid">
            <div class="pt-card"><strong>forwardの返り値</strong>最後にSoftmaxがないため、返すのはclass事後確率ではなく<strong>raw logits</strong>です。</div>
            <div class="pt-card"><strong>入力画像サイズ</strong><code>fc1</code>を<code>16*5*5</code>へ固定したため、任意サイズの正方形画像へそのまま対応はできません。</div>
            <div class="pt-card"><strong>同じPoolを2回使用</strong>同じobjectを呼びますが、<code>MaxPool2d</code>には学習parameterがありません。「訓練parameterを共有」は不適切です。</div>
            <div class="pt-card"><strong>Normalize</strong><code>Normalize(mean=(.5,.5,.5), std=(.5,.5,.5))</code>なら、各RGB channelへ平均0.5・標準偏差0.5を使う正規化が適用されます。</div>
        </div>

        <h3>■ 実装で混同しやすい5組</h3>
        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>組</th><th>違い</th><th>覚え方</th></tr>
            <tr><td><code>train()</code> / <code>eval()</code></td><td>Dropout・BatchNormなどの層の挙動を切り替える</td><td>モデルの運転モード</td></tr>
            <tr><td><code>no_grad()</code> / <code>inference_mode()</code></td><td>勾配記録を止める。inference_modeは推論専用でさらに制約が強い</td><td>Autogradの記録</td></tr>
            <tr><td><code>requires_grad=False</code> / <code>detach()</code></td><td>前者はparameterを学習対象外へ。後者はTensorを現在の計算グラフから切る</td><td>重みを凍結／値を切り離す</td></tr>
            <tr><td><code>cat</code> / <code>stack</code></td><td>catは既存軸で連結、stackは新しい軸を追加</td><td>軸を増やすか</td></tr>
            <tr><td><code>attn_mask</code> / <code>key_padding_mask</code></td><td>前者は位置間（例：未来禁止）、後者は各batchのPAD位置</td><td>(L,L)／(B,L)</td></tr>
        </table></div>

        <h3>■ 本試験型コードは60秒で4手</h3>
        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>手順</th><th>最初に確認するもの</th><th>自分への質問</th></tr>
            <tr><td><strong>① 入力</strong></td><td>Shape・dtype・device</td><td>各軸は何か。class labelはlongか。modelとdataは同じdeviceか。</td></tr>
            <tr><td><strong>② forward</strong></td><td>各層の出力Shape</td><td>Conv／Pool／Flatten／LSTM／Attentionの後で何Shapeになるか。</td></tr>
            <tr><td><strong>③ loss</strong></td><td>logitsとtargetの契約</td><td>CE・BCE・MSEのどれか。Softmax／Sigmoidを重ねていないか。</td></tr>
            <tr><td><strong>④ 更新</strong></td><td>mode・勾配・処理順</td><td>zero_grad→backward→stepか。eval／no_grad／detachの役割は何か。</td></tr>
        </table></div>
        <div class="pt-note"><strong>連問の解き方：</strong>同じコードが続いたら、最初の問題で各行の右にShapeを書き込みます。次の問題では最初から読み直さず、そのメモを再利用します。迷った問題は約72秒で仮決めし、後から戻ります。</div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="pt-table-wrap"><table class="pt-table">
            <tr><th>問題文の合図</th><th>答えるコード／Shape</th><th>一言理由</th></tr>
            <tr><td>1回の学習更新</td><td><code class="pt-ask">optimizer.zero_grad() → model(x) → criterion(...) → loss.backward() → optimizer.step()</code></td><td>勾配は.gradへ加算される。</td></tr>
            <tr><td>多クラス分類</td><td><code class="pt-ask">nn.CrossEntropyLoss()(logits, target.long())</code></td><td>logits=(B,C)、target=longの(B,)。</td></tr>
            <tr><td>1出力の2値分類</td><td><code class="pt-ask">nn.BCEWithLogitsLoss()(logits, target.float().view_as(logits))</code></td><td>logits・targetは同じ(B,1)。Sigmoid込み。</td></tr>
            <tr><td>マルチラベル</td><td><code class="pt-ask">nn.BCEWithLogitsLoss()(logits, target.float())</code></td><td>logits・targetは同じ(B,C)。</td></tr>
            <tr><td>回帰</td><td><code class="pt-ask">nn.MSELoss()(pred, target.float().view_as(pred))</code></td><td>予測とtargetを同Shapeにする。</td></tr>
            <tr><td>LogSoftmax済み</td><td><code class="pt-ask">nn.NLLLoss()(log_probs, target)</code></td><td>raw logitsならCrossEntropyLoss。</td></tr>
            <tr><td>NumPyで隣接層を初期化</td><td><code>zip(sizes[:-1], sizes[1:])</code></td><td>重みShapeを(入力, 出力)で作る。</td></tr>
            <tr><td>手書きSoftmax＋CEの逆伝播</td><td>各sampleは<code>dz=y-correct</code><br><code>dW=u.T@dz</code>、<code>db=sum(dz,axis=0)</code></td><td>biasはBatch軸axis=0を足す。Batch平均は1回だけ。</td></tr>
            <tr><td>手書きSGD・正解率</td><td><code>W-=lr*dW/B</code><br><code>mean(argmax予測 == argmax正解)</code></td><td>下降はマイナス。class軸はaxis=1。</td></tr>
            <tr><td>推論</td><td><code class="pt-ask">model.eval()</code>＋<code class="pt-ask">with torch.inference_mode():</code></td><td>層のモードと勾配記録を別々に切替。</td></tr>
            <tr><td>CNNのNCHW入力</td><td><code class="pt-ask">(N,C,H,W)=(4,3,32,32)</code></td><td>NはBatch、CはRGB channel。</td></tr>
            <tr><td>Conv→Pool→Conv→Pool</td><td><code class="pt-ask">(4,3,32,32)→(4,6,28,28)→(4,6,14,14)→(4,16,10,10)→(4,16,5,5)</code></td><td>ConvはCをout_channelsへ、PoolはCを保つ。</td></tr>
            <tr><td>CNNのFlatten→Linear</td><td><code class="pt-ask">(4,16,5,5)→flatten(x,1)→(4,400)→Linear(400,120)→(4,120)</code></td><td>16×5×5＝400。Linearは右端だけ変更。</td></tr>
            <tr><td>LSTM</td><td>output=(B,L,Directions×H<sub>hidden</sub>)<br>h_n/c_n=(Layers×Directions,B,H<sub>hidden</sub>)</td><td>batch_firstでも状態の軸順は不変。</td></tr>
            <tr><td>Transformer</td><td>(B,L,D)、D % nhead = 0</td><td>各headの次元はD/nhead。</td></tr>
            <tr><td>可変長系列</td><td><code>collate_fn</code>＋padding mask／pack</td><td>PADを実データとして扱わない。</td></tr>
            <tr><td>転移学習</td><td><code>requires_grad=False</code>→head交換</td><td>凍結後にoptimizer対象を選ぶ。</td></tr>
            <tr><td>保存・再開</td><td><code>state_dict</code>＋optimizer＋epoch</td><td>推論だけならmodel state、再開なら学習状態も保存。</td></tr>
            <tr><td>分散Data Parallel</td><td>DDP（Distributed Data Parallel）＋DistributedSampler</td><td>同じmodel・異なるdata・勾配同期。</td></tr>
            <tr><td>実装補足：混合精度</td><td>AMP（Automatic Mixed Precision）: autocast＋GradScaler</td><td>速度・memoryと数値安定性を両立。</td></tr>
        </table></div>
        </div>
    `,

    questions: [
        // 1. Tensor・Module・Autograd
        {
            id:"pt-linear-definition", category:"Module", kind:"コード判定", difficulty:"必須",
            question:"入力100次元、出力50次元の全結合層を定義するコードはどれか。",
            options:["<code>nn.Linear(100, 50)</code>","<code>nn.Linear(50, 100)</code>","<code>nn.Dense(100, 50)</code>","<code>nn.Linear(in_channels=100, out_channels=50)</code>"], answer:0,
            explanation:"<p><code>nn.Linear(in_features, out_features)</code>の順です。入力Tensorの最後の軸が100、出力の最後の軸が50になります。</p>"
        },
        {
            id:"pt-module-forward", category:"Module", kind:"コード判定", difficulty:"必須",
            question:"自作モデルで層をsubmoduleとして登録し、その中のparameterも追跡させて順伝播を定義する組合せとして正しいものはどれか。",
            options:["<code>__init__</code>で層を定義し、<code>forward</code>で接続する","<code>forward</code>内で毎回新しいLinearを作る","<code>__len__</code>で層を登録する","<code>backward</code>を自分で必ず実装する"], answer:0,
            explanation:"<p><code>nn.Module</code>を継承し、<code>__init__</code>で<code>super().__init__()</code>を呼んで層を登録します。通常の逆伝播はAutograd（Automatic Differentiation／自動微分）が行うため、<code>backward</code>を自作する必要はありません。</p>"
        },
        {
            id:"pt-module-list-registration", category:"Module", kind:"コード判定", difficulty:"標準",
            question:"可変個数の<code>nn.Linear</code>層を保持し、<code>model.parameters()</code>へ正しく登録したい。適切なのはどれか。",
            options:["<code>nn.ModuleList(layers)</code>","通常のPython <code>list</code>だけに入れる","<code>torch.tensor(layers)</code>","<code>set(layers)</code>"], answer:0,
            explanation:"<p><code>ModuleList</code>に入れたModuleは親モデルへ登録され、device移動・保存・optimizer対象に含まれます。通常のPython listだけでは、内部ModuleをPyTorchが自動追跡しません。</p>"
        },
        {
            id:"pt-linear-params-calc", category:"Linear", kind:"計算", difficulty:"必須",
            question:"<code>nn.Linear(10, 4, bias=True)</code>の学習parameter数はいくつか。",
            options:["40","44","14","50"], answer:1,
            explanation:"<p><strong>使う公式：</strong>重み数＝入力数×出力数、bias数＝出力数。</p><p><strong>代入：</strong>10×4＋4＝44。</p><p><strong>答え：</strong>44個です。重みshapeは(4,10)、bias shapeは(4)です。</p>"
        },
        {
            id:"pt-flatten-batch", category:"Tensor Shape", kind:"コード判定", difficulty:"必須",
            question:"<code>x</code>のshapeが(B,C,H,W)のとき、B軸を残して(B,Features)へする安全で明快なコードはどれか。",
            options:["<code>torch.flatten(x, start_dim=1)</code>","<code>x.flatten()</code>","<code>x.view(-1)</code>","<code>x.squeeze(0)</code>"], answer:0,
            explanation:"<p><code>start_dim=1</code>は0番目のBatch軸を残し、C,H,Wを1軸へまとめます。引数なしの<code>flatten()</code>はBatchまで含めて1次元にします。</p>"
        },
        {
            id:"pt-permute-reshape", category:"Tensor Shape", kind:"コード判定", difficulty:"標準",
            question:"<code>y=x.permute(0,2,3,1)</code>の直後、Batchを残して安全に2次元へ変形したい。最も適切なのはどれか。",
            options:["<code>y.reshape(y.size(0), -1)</code>","<code>y.view(y.size(0), -1)</code>が常に安全","<code>y.detach()</code>","<code>y.transpose()</code>"], answer:0,
            explanation:"<p><code>permute</code>後はmemory上でnon-contiguous（非連続）になり得るため、<code>view</code>が失敗する場合があります。<code>reshape</code>は必要ならcopyを作ります。別解は<code>y.contiguous().view(...)</code>です。</p>"
        },
        {
            id:"pt-unsqueeze-shape", category:"Tensor Shape", kind:"計算", difficulty:"標準",
            question:"shapeが(8,32)のTensor <code>x</code>に<code>x.unsqueeze(1)</code>を適用したshapeはどれか。",
            options:["(1,8,32)","(8,1,32)","(8,32,1)","(256,1)"], answer:1,
            explanation:"<p><strong>使うShape規則：</strong><code>unsqueeze(dim)</code>は指定位置へ長さ1の新しい軸を挿入します。</p><p><strong>代入：</strong>(8,32)のdim=1へ1を挿入。</p><p><strong>答え：</strong>(8,1,32)です。</p>"
        },
        {
            id:"pt-cat-stack-shape", category:"Tensor Shape", kind:"計算", difficulty:"標準",
            question:"<code>a</code>と<code>b</code>がともにshape (4,3)である。<code>torch.stack([a,b], dim=0)</code>のshapeはどれか。",
            options:["(8,3)","(4,6)","(2,4,3)","(4,3,2)"], answer:2,
            explanation:"<p><strong>使うShape規則：</strong><code>stack</code>は新しい軸を1本追加します。</p><p><strong>代入：</strong>2枚の(4,3)をdim=0へ積む。</p><p><strong>答え：</strong>(2,4,3)です。<code>cat(...,dim=0)</code>なら(8,3)です。</p>"
        },
        {
            id:"pt-broadcasting", category:"Tensor演算", kind:"形状計算", difficulty:"標準",
            question:"<code>x</code>が(B,D)、<code>b</code>が(D)のとき、<code>x+b</code>のshapeは一般にどうなるか。",
            options:["(B,D)","(D)","(B)","計算できない"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>右端から軸を比べ、同じ長さまたは片方が1ならbroadcastできます。</p><p><strong>代入：</strong>(B,D)と(D)では末尾Dが一致し、bは各batchへ共有されます。</p><p><strong>答え：</strong>(B,D)です。</p>"
        },
        {
            id:"pt-grad-accum-calc", category:"Autograd", kind:"計算", difficulty:"必須",
            question:"parameterの<code>.grad</code>に3が残ったまま、次の<code>backward()</code>で勾配5を計算した。新しい<code>.grad</code>はいくつか。",
            options:["2","3","5","8"], answer:3,
            explanation:"<p><strong>使う規則：</strong>PyTorchの<code>backward()</code>は既存の<code>.grad</code>へ加算します。</p><p><strong>代入：</strong>3＋5＝8。</p><p><strong>答え：</strong>8です。通常は更新前に<code>optimizer.zero_grad()</code>で消します。</p>"
        },
        {
            id:"pt-detach-role", category:"Autograd", kind:"コード判定", difficulty:"標準",
            question:"値は使いたいが、その地点より前へ勾配を流したくない。最も直接的な操作はどれか。",
            options:["<code>x.detach()</code>","<code>x.backward()</code>","<code>x.requires_grad_()</code>","<code>x.item()</code>して学習を続ける"], answer:0,
            explanation:"<p><code>detach()</code>は値を共有しつつ、現在の計算グラフから切り離したTensorを返します。完全に独立したcopyも必要なら<code>x.detach().clone()</code>です。</p>"
        },
        {
            id:"pt-item-role", category:"Tensor演算", kind:"コード判定", difficulty:"標準",
            question:"scalar Tensorの損失をPythonの数値としてログ表示したい。適切なのはどれか。",
            options:["<code>loss.item()</code>","<code>loss.backward()</code>","<code>loss.grad()</code>","<code>loss.argmax()</code>"], answer:0,
            explanation:"<p><code>item()</code>は1要素TensorをPython scalarへ変換します。学習に使うloss本体はTensorのまま<code>backward()</code>へ渡します。</p>"
        },
        {
            id:"pt-eval-inference-mode", category:"推論", kind:"コード判定", difficulty:"必須",
            question:"推論時の<code>model.eval()</code>と<code>torch.inference_mode()</code>の関係として正しいものはどれか。",
            options:["evalは層の挙動、inference_modeは勾配記録を切り替えるため通常は両方使う","evalだけで必ず勾配記録も止まる","inference_modeだけでDropoutが無効になる","両者は完全に同じ"], answer:0,
            explanation:"<p><code>eval()</code>はDropoutとBatchNorm等を推論用へ切り替えます。<code>inference_mode()</code>はAutograd記録を止めますが、modelのtraining flagは変えません。</p>"
        },
        {
            id:"pt-leaf-grad", category:"Autograd", kind:"概念識別", difficulty:"難",
            question:"通常、<code>backward()</code>後に<code>.grad</code>が自動保存される中心的なTensorはどれか。",
            options:["<code>nn.Parameter</code>などrequires_grad=Trueのleaf Tensor","すべての中間Tensor","Pythonの整数","DataLoaderそのもの"], answer:0,
            explanation:"<p>Autogradは逆伝播に中間値を使いますが、通常<code>.grad</code>が保持されるのはleaf Tensorです。中間Tensorのgradを保持したい場合は<code>retain_grad()</code>が必要です。</p>"
        },

        // 2. 損失・Optimizer・DataLoader・保存
        {
            id:"pt-ce-input", category:"損失関数", kind:"コード判定", difficulty:"必須",
            question:"3classから1つを選ぶ分類で、（あ）（い）の正しい組合せはどれか。<pre class='pt-question-code'><code>logits = model(x)  # float・(8, 3)\ntarget = torch.tensor([1,0,2,1,2,0,1,2])  # (8,)\ncriterion = nn.CrossEntropyLoss()\nloss = criterion(（あ）, （い）)</code></pre>",
            options:["（あ）<code>logits</code>／（い）<code>target.long()</code>","（あ）<code>target</code>／（い）<code>logits</code>","（あ）<code>torch.softmax(logits, dim=1)</code>／（い）<code>target.float()</code>","（あ）<code>logits.argmax(dim=1)</code>／（い）<code>target</code>"], answer:0,
            explanation:"<p><strong>① 第1引数：</strong><code>logits</code>はモデルが出したfloatの生点数<code>(B,C)=(8,3)</code>です。</p><p><strong>② 第2引数：</strong><code>target.long()</code>は正解class番号<code>(B,)=(8,)</code>です。</p><p><strong>③ 引数順：</strong><code>criterion(logits, target)</code>＝予測→正解。<code>pred=argmax(...)</code>やSoftmax後の確率は、この基本形のlossへ渡しません。</p>"
        },
        {
            id:"pt-ce-target-range", category:"損失関数", kind:"コード判定", difficulty:"標準",
            question:"次の3class分類コードがエラーになる主な理由はどれか。<pre class='pt-question-code'><code>logits = torch.randn(4, 3)\ntarget = torch.tensor([0, 2, 3, 1], dtype=torch.long)\nloss = nn.CrossEntropyLoss()(logits, target)</code></pre>",
            options:["3classの有効なclass番号は0・1・2だが、targetに3が含まれる","logitsのShapeは必ず(3,4)でなければならない","targetはfloat型でなければならない","CrossEntropyLossの前にSoftmaxがない"], answer:0,
            explanation:"<p><strong>① class数：</strong><code>logits=(B,C)=(4,3)</code>なのでC=3です。</p><p><strong>② 番号の範囲：</strong>class番号は<code>0〜C-1</code>、つまり0・1・2です。</p><p><strong>③ 誤り：</strong><code>target</code>に範囲外の3が含まれます。Softmaxはloss前に不要です。</p>"
        },
        {
            id:"pt-ce-loss-pred-shape", category:"損失関数", kind:"形状計算", difficulty:"標準",
            question:"既定設定の<code>CrossEntropyLoss</code>を使う。<code>loss</code>と<code>pred</code>のShapeの組合せはどれか。<pre class='pt-question-code'><code>logits = model(x)  # (5, 3)\ntarget = target.long()  # (5,)\nloss = nn.CrossEntropyLoss()(logits, target)\npred = logits.argmax(dim=1)</code></pre>",
            options:["lossはscalar <code>()</code>、predは<code>(5,)</code>","lossは<code>(5,3)</code>、predはscalar <code>()</code>","lossもpredも<code>(5,3)</code>","lossもpredも<code>(3,)</code>"], answer:0,
            explanation:"<p><strong>① loss：</strong>既定の<code>reduction='mean'</code>はsampleのlossを平均するためscalar Tensorです。</p><p><strong>② pred：</strong><code>argmax(dim=1)</code>は各sampleのclass軸を1個の番号へ縮めます。</p><p><strong>③ 答え：</strong><code>loss.shape=()</code>、<code>pred.shape=(B,)=(5,)</code>です。</p>"
        },
        {
            id:"pt-bce-logits-input", category:"損失関数", kind:"コード判定", difficulty:"必須",
            question:"1出力の2値分類で、空欄へ入る適切なコードはどれか。<pre class='pt-question-code'><code>logits = model(x)  # (6, 1)\ntarget = torch.tensor([1,0,1,1,0,0])  # (6,)\nloss = （あ）</code></pre>",
            options:["<code>nn.BCEWithLogitsLoss()(logits, target.float().view_as(logits))</code>","<code>nn.BCEWithLogitsLoss()(torch.sigmoid(logits), target.long())</code>","<code>nn.CrossEntropyLoss()(logits, target.float())</code>","<code>nn.MSELoss()(logits, target.long())</code>"], answer:0,
            explanation:"<p><strong>① 出力：</strong><code>logits=(6,1)</code>です。</p><p><strong>② target：</strong><code>float().view_as(logits)</code>で同じ<code>(6,1)</code>へそろえます。</p><p><strong>③ loss：</strong><code>BCEWithLogitsLoss</code>はSigmoid込みなので、先にSigmoidしません。</p>"
        },
        {
            id:"pt-multilabel-loss", category:"損失関数", kind:"コード判定", difficulty:"標準",
            question:"5labelを独立に複数選べる分類で、空欄へ入る適切なコードはどれか。<pre class='pt-question-code'><code>logits = model(x)   # (B, 5)\ntarget = labels     # (B, 5)、各要素は0または1\nloss = （あ）</code></pre>",
            options:["<code>nn.BCEWithLogitsLoss()(logits, target.float())</code>","<code>nn.CrossEntropyLoss()(logits, target.long())</code>","<code>nn.NLLLoss()(torch.sigmoid(logits), target)</code>","<code>nn.MSELoss()(logits.argmax(1), target)</code>"], answer:0,
            explanation:"<p><strong>① 問題文：</strong>複数labelが同時に正解になります。</p><p><strong>② Shape：</strong>logitsとtargetはともに<code>(B,5)</code>。</p><p><strong>③ loss：</strong>5個の独立したYes／No判定なので、float targetと<code>BCEWithLogitsLoss</code>を使います。</p>"
        },
        {
            id:"pt-segmentation-ce-shape", category:"損失関数", kind:"形状計算", difficulty:"本試験型",
            question:"多class Semantic Segmentationで、空欄へ入る適切なコードはどれか。<pre class='pt-question-code'><code>logits = model(images)  # (B, C, H, W)\ntarget = masks          # (B, H, W)、各画素のclass番号\nloss = （あ）</code></pre>",
            options:["<code>nn.CrossEntropyLoss()(logits, target.long())</code>","<code>nn.CrossEntropyLoss()(logits, target.float().unsqueeze(1))</code>","<code>nn.BCEWithLogitsLoss()(logits, target.long())</code>","<code>nn.MSELoss()(logits.argmax(1), target)</code>"], answer:0,
            explanation:"<p><strong>① 出力：</strong>class軸Cを持つ<code>(B,C,H,W)</code>です。</p><p><strong>② target：</strong>各画素にclass番号1個なので、C軸のないlong型<code>(B,H,W)</code>です。</p><p><strong>③ loss：</strong><code>CrossEntropyLoss(logits, target)</code>を使います。</p>"
        },
        {
            id:"pt-mse-shape-contract", category:"損失関数", kind:"コード判定", difficulty:"必須",
            question:"1個の実数を予測する回帰で、Shapeをそろえて<code>MSELoss</code>を計算するコードはどれか。<pre class='pt-question-code'><code>pred = model(x)  # (5, 1)\ntarget = torch.tensor([2.1, 3.0, 1.5, 4.2, 0.8])  # (5,)\nloss = （あ）</code></pre>",
            options:["<code>nn.MSELoss()(pred, target.float().view_as(pred))</code>","<code>nn.MSELoss()(torch.softmax(pred, dim=1), target)</code>","<code>nn.CrossEntropyLoss()(pred, target.long())</code>","<code>nn.BCEWithLogitsLoss()(pred, target.long())</code>"], answer:0,
            explanation:"<p><strong>① task：</strong>実数を当てる回帰なので<code>MSELoss</code>です。</p><p><strong>② Shape：</strong><code>pred=(5,1)</code>に対しtargetは元々<code>(5,)</code>です。</p><p><strong>③ 修正：</strong><code>float().view_as(pred)</code>でfloat型の<code>(5,1)</code>へそろえます。Shape不一致のbroadcastを避けます。</p>"
        },
        {
            id:"pt-nllloss-code", category:"損失関数", kind:"コード判定", difficulty:"標準",
            question:"多class分類で<code>NLLLoss</code>を使う正しいコードはどれか。targetはlong型のclass番号<code>(B,)</code>とする。",
            options:["<code>nn.NLLLoss()(torch.log_softmax(logits, dim=1), target)</code>","<code>nn.NLLLoss()(torch.softmax(logits, dim=1), target)</code>","<code>nn.NLLLoss()(logits, target.float())</code>","<code>nn.NLLLoss()(torch.sigmoid(logits), target)</code>"], answer:0,
            explanation:"<p><strong>① NLLLossの入力：</strong>通常の確率ではなくlog確率です。</p><p><strong>② 前処理：</strong><code>torch.log_softmax(logits, dim=1)</code>を使います。</p><p><strong>③ 関係：</strong>標準的なclass番号targetなら、これは<code>CrossEntropyLoss(logits, target)</code>と同じ組合せです。</p>"
        },
        {
            id:"pt-train-loop-order", category:"学習ループ", kind:"コード判定", difficulty:"必須",
            question:"1ミニバッチでparameterを更新する基本順序として正しいものはどれか。",
            options:["zero_grad→forward→loss→backward→step","forward→step→loss→backward","backward→zero_grad→step→forward","step→zero_grad→backward→loss"], answer:0,
            explanation:"<p>①前回の勾配を消す ②予測 ③損失 ④勾配計算 ⑤更新、の順です。勾配蓄積を意図する場合だけ、複数batchの間でzero_gradを省きます。</p>"
        },
        {
            id:"pt-grad-clip-order", category:"学習ループ", kind:"コード判定", difficulty:"標準",
            question:"勾配clipを使う場合、<code>clip_grad_norm_</code>を置く基本位置はどこか。",
            options:["<code>loss.backward()</code>の後、<code>optimizer.step()</code>の前","forwardの前","stepの後だけ","evalの中だけ"], answer:0,
            explanation:"<p>clipは計算済みのgradを制限してからoptimizerへ渡す処理です。したがってbackward→clip→stepの順になります。</p>"
        },
        {
            id:"pt-weight-decay", category:"正則化実装", kind:"コード判定", difficulty:"標準",
            question:"AdamWでweight decayを0.01に設定する代表的なコードはどれか。",
            options:["<code>torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)</code>","<code>model.eval(weight_decay=0.01)</code>","<code>loss.backward(0.01)</code>","<code>nn.Dropout(weight_decay=0.01)</code>"], answer:0,
            explanation:"<p>AdamWはweight decayをgradient更新から分離して適用します。biasやNormalization parameterをdecay対象外にする場合はparameter groupを分けます。</p>"
        },
        {
            id:"pt-l1-regularization-hole", category:"正則化実装", kind:"コード穴埋め", difficulty:"本試験型",
            question:"PyTorchでL1正則化を手動で加える。コードの（あ）に入るものはどれか。<pre class='pt-question-code'><code>outputs = model(x)\ndata_loss = criterion(outputs, target)\nl1_penalty = （あ）\nloss = data_loss + lambda_l1 * l1_penalty</code></pre>",
            options:["<code>sum(p.abs().sum() for p in model.parameters())</code>","<code>sum(p.pow(2).sum() for p in model.parameters())</code>","<code>sum(p.argmax() for p in model.parameters())</code>","<code>model.eval()</code>"], answer:0,
            explanation:"<p><strong>使う式：</strong>L1は$\\sum_i|w_i|$です。</p><p><strong>コード対応：</strong><code>p.abs()</code>で絶対値、内側の<code>sum()</code>でTensor内、外側の<code>sum</code>でparameter間を合計します。</p><p><strong>答え：</strong><code>sum(p.abs().sum() for p in model.parameters())</code>。L2なら<code>p.pow(2).sum()</code>です。</p>"
        },
        {
            id:"pt-l2-manual-regularization-hole", category:"正則化実装", kind:"コード穴埋め", difficulty:"本試験型",
            question:"PyTorchでL2の二乗和を損失へ手動で加える。コードの（あ）に入るものはどれか。<pre class='pt-question-code'><code>l2_penalty = （あ）\nloss = data_loss + lambda_l2 / 2 * l2_penalty</code></pre>",
            options:["<code>sum(p.abs().sum() for p in model.parameters())</code>","<code>sum(p.pow(2).sum() for p in model.parameters())</code>","<code>sum(p.sign().sum() for p in model.parameters())</code>","<code>torch.argmax(outputs)</code>"], answer:1,
            explanation:"<p><strong>使う式：</strong>$L=L_{data}+\\frac{\\lambda}{2}\\sum_iw_i^2$。</p><p><strong>コード対応：</strong><code>p.pow(2)</code>が二乗、<code>sum()</code>が総和です。</p><p><strong>答え：</strong>選択肢2。L1の<code>abs</code>と取り違えないでください。</p>"
        },
        {
            id:"pt-sgd-weight-decay-hole", category:"正則化実装", kind:"コード穴埋め", difficulty:"本試験型",
            question:"SGDでL2正則化と同じ更新形になる設定を加える。コードの（あ）に入るものはどれか。<pre class='pt-question-code'><code>optimizer = torch.optim.SGD(\n    model.parameters(),\n    lr=0.01,\n    （あ）\n)</code></pre>",
            options:["<code>weight_decay=lambda_l2</code>","<code>dropout=lambda_l2</code>","<code>l1=lambda_l2</code>","<code>eval=lambda_l2</code>"], answer:0,
            explanation:"<p><strong>答え：</strong><code>weight_decay=lambda_l2</code>です。</p><p>SGDではL2正則化と同じ更新形になります。すでにL2項をlossへ手動加算しているなら、同じ係数をweight decayでも重ねないようにします。</p>"
        },
        {
            id:"pt-scheduler-timing", category:"学習率", kind:"コード判定", difficulty:"本試験型",
            question:"Learning Rate Schedulerの<code>step()</code>を呼ぶ時点について正しいものはどれか。",
            options:["Schedulerの種類で異なる。StepLRは通常epoch単位、OneCycleLRはbatch単位、ReduceLROnPlateauは検証指標後","すべてforward前に1回だけ","すべてoptimizer作成前","すべて推論時だけ"], answer:0,
            explanation:"<p>Schedulerごとに想定単位が違います。『scheduler.stepは必ずepoch末』と暗記せず、使用するclassの仕様を確認します。</p>"
        },
        {
            id:"pt-kaiming-init", category:"初期化", kind:"コード判定", difficulty:"標準",
            question:"ReLUを主に使う層のweight初期化として代表的なPyTorch APIはどれか。",
            options:["<code>nn.init.kaiming_normal_(layer.weight, nonlinearity='relu')</code>","<code>nn.init.zeros_(layer.weight)</code>だけ","<code>torch.softmax(layer.weight)</code>","<code>layer.eval()</code>"], answer:0,
            explanation:"<p>Kaiming（He）初期化はReLU系の分散を保つ設計です。Sigmoid/tanh系ではXavier初期化が代表です。</p>"
        },
        {
            id:"pt-dataset-interface", category:"Dataset", kind:"コード判定", difficulty:"必須",
            question:"自作<code>Dataset</code>でDataLoaderが1件ずつ取得するための基本interfaceはどれか。",
            options:["<code>__len__</code>と<code>__getitem__</code>","<code>forward</code>と<code>backward</code>","<code>fit</code>と<code>predict</code>","<code>compile</code>と<code>run</code>"], answer:0,
            explanation:"<p><code>__len__</code>は件数、<code>__getitem__(idx)</code>は1件を返します。<code>__init__</code>はdata path等を準備する一般的な場所ですが、Dataset interface上の必須2メソッドはこの組です。</p>"
        },
        {
            id:"pt-dataloader-batch-shape", category:"DataLoader", kind:"計算", difficulty:"必須",
            question:"Datasetの画像1件がshape (3,32,32)、<code>batch_size=8</code>である。通常のDataLoaderが返す画像batchのshapeはどれか。",
            options:["(3,32,32)","(8,3,32,32)","(3,8,32,32)","(8,32,32,3)"], answer:1,
            explanation:"<p><strong>使うShape規則：</strong>DataLoaderは各sampleの先頭にBatch軸を追加します。</p><p><strong>代入：</strong>1件(3,32,32)を8件まとめる。</p><p><strong>答え：</strong>(8,3,32,32)です。</p>"
        },
        {
            id:"pt-collate-padding", category:"DataLoader", kind:"コード判定", difficulty:"標準",
            question:"長さの異なる文章を同じミニバッチへ入れ、paddingとmaskを作りたい。DataLoaderへ指定するものはどれか。",
            options:["<code>collate_fn</code>","<code>requires_grad</code>","<code>state_dict</code>","<code>kernel_size</code>"], answer:0,
            explanation:"<p><code>collate_fn</code>はDatasetが返した複数sampleをbatchへまとめる処理を差し替えます。可変長系列のpadding・length・padding mask作成に使えます。</p>"
        },
        {
            id:"pt-drop-last", category:"DataLoader", kind:"計算", difficulty:"標準",
            question:"データ数103、batch_size=32で<code>drop_last=True</code>にしたとき、1epochで使うbatch数はいくつか。",
            options:["3","4","32","103"], answer:0,
            explanation:"<p><strong>使う公式：</strong>drop_last=Trueなら完全なbatch数＝floor(N/B)。</p><p><strong>代入：</strong>floor(103/32)=3。</p><p><strong>答え：</strong>3 batchです。残り7件はそのepochでは捨てられます。</p>"
        },
        {
            id:"pt-device-agnostic", category:"device", kind:"コード判定", difficulty:"必須",
            question:"CPU（Central Processing Unit）／GPU（Graphics Processing Unit）の両方で同じコードを使う書き方として最も適切なのはどれか。",
            options:["<code>device=torch.device('cuda' if torch.cuda.is_available() else 'cpu'); model=model.to(device); x=x.to(device)</code>","modelだけGPUへ送りxはCPUのまま","<code>x.cuda()</code>をCPU環境でも必ず呼ぶ","<code>model.gpu()</code>"], answer:0,
            explanation:"<p>演算に関わるmodelとTensorは同じdeviceへ置きます。<code>.to()</code>は移動後のobjectを返すため、<code>x=x.to(device)</code>のように受け取ります。</p>"
        },
        {
            id:"pt-state-dict", category:"保存・読込", kind:"コード判定", difficulty:"必須",
            question:"推論用にmodel stateを保存する推奨形はどれか。",
            options:["<code>torch.save(model.state_dict(), path)</code>","<code>model.save_weights(path)</code>","<code>torch.save(model.forward, path)</code>","<code>optimizer.step(path)</code>"], answer:0,
            explanation:"<p><code>state_dict</code>にはparameterとpersistent buffer（BatchNormのrunning stats等）が入ります。復元時は同じ構造のmodelを作り、<code>load_state_dict</code>します。</p>"
        },
        {
            id:"pt-checkpoint-resume", category:"保存・読込", kind:"コード判定", difficulty:"標準",
            question:"中断した学習を同じ状態から再開するcheckpointに、model state以外で特に必要なものはどれか。",
            options:["optimizer stateとepoch（必要ならscheduler/scalerも）","予測labelだけ","model.eval()の戻り値","Datasetの長さだけ"], answer:0,
            explanation:"<p>optimizerはmomentumやAdamの移動平均を持ちます。これを保存しないと、weightだけ同じでも更新状態は続きからになりません。別deviceで読む場合は<code>map_location</code>を使います。</p>"
        },
        {
            id:"pt-transfer-freeze", category:"転移学習", kind:"コード判定", difficulty:"必須",
            question:"事前学習済みfeature extractorを凍結し、新しいclassifier headだけ学習したい。基本手順はどれか。",
            options:["backboneのparameterを<code>requires_grad=False</code>→head交換→学習対象だけoptimizerへ","model全体を<code>detach()</code>してlossを計算","<code>model.eval()</code>だけ呼ぶ","targetを凍結する"], answer:0,
            explanation:"<p><code>eval()</code>は層のモード変更であり、parameter凍結ではありません。凍結後にheadを交換し、<code>p.requires_grad</code>がTrueのparameterをoptimizerへ渡します。backboneを完全固定するなら、BatchNormのrunning statsやDropoutの挙動も変わらないようbackbone側のeval modeも管理します。</p>"
        },

        // 3. CNN・正規化
        {
            id:"pt-conv2d-definition", category:"CNN", kind:"コード判定", difficulty:"必須",
            question:"RGB（Red・Green・Blue）入力、出力16channel、3×3 kernel、stride=1、padding=1の畳み込みはどれか。",
            options:["<code>nn.Conv2d(3,16,kernel_size=3,stride=1,padding=1)</code>","<code>nn.Conv2d(16,3,1,3,1)</code>","<code>nn.Linear(3,16,3)</code>","<code>nn.Conv1d(3,16,3,padding=1)</code>"], answer:0,
            explanation:"<p><code>Conv2d(in_channels, out_channels, kernel_size, stride, padding)</code>の順です。padding=1・stride=1・dilation=1なら、3×3畳み込み後もH,Wを保ちます。</p>"
        },
        {
            id:"pt-conv-output-calc", category:"CNN", kind:"計算", difficulty:"必須",
            question:"入力の空間サイズ32、kernel=3、stride=2、padding=1、dilation=1の<code>Conv2d</code>出力サイズはどれか。",
            options:["14","15","16","17"], answer:2,
            explanation:"<p><strong>使う公式：</strong>out=floor((in+2P−D(K−1)−1)/S)+1。</p><p><strong>代入：</strong>floor((32+2−1×2−1)/2)+1=floor(31/2)+1=16。</p><p><strong>答え：</strong>高さ・幅とも16です。</p>"
        },
        {
            id:"pt-conv-params-calc", category:"CNN", kind:"計算", difficulty:"必須",
            question:"<code>nn.Conv2d(3,16,kernel_size=3,bias=True)</code>の学習parameter数はいくつか。",
            options:["432","448","144","464"], answer:1,
            explanation:"<p><strong>使う公式：</strong>(K<sub>h</sub>×K<sub>w</sub>×C<sub>in</sub>＋bias 1個)×C<sub>out</sub>。</p><p><strong>代入：</strong>(3×3×3＋1)×16=28×16=448。</p><p><strong>答え：</strong>448個です。</p>"
        },
        {
            id:"pt-group-conv-weight-shape", category:"CNN", kind:"形状計算", difficulty:"本試験型",
            question:"<code>nn.Conv2d(8,12,kernel_size=3,groups=4)</code>のweight shapeはどれか。",
            options:["(12,8,3,3)","(12,2,3,3)","(4,12,3,3)","(8,3,3,12)"], answer:1,
            explanation:"<p><strong>使うShape規則：</strong>Conv2d weightは(C<sub>out</sub>, C<sub>in</sub>/groups, K<sub>h</sub>, K<sub>w</sub>)。</p><p><strong>代入：</strong>(12,8/4,3,3)。</p><p><strong>答え：</strong>(12,2,3,3)です。</p>"
        },
        {
            id:"pt-depthwise-conv", category:"CNN", kind:"コード判定", difficulty:"標準",
            question:"入力channel数Cごとに独立したdepthwise convolutionを行う基本設定はどれか（depth multiplier=1）。",
            options:["<code>nn.Conv2d(C,C,3,padding=1,groups=C)</code>","<code>nn.Conv2d(C,C,3,groups=1)</code>","<code>nn.Linear(C,C)</code>","<code>nn.Conv2d(1,C,1,groups=1)</code>"], answer:0,
            explanation:"<p><code>groups=C</code>にすると各入力channelを独立に畳み込みます。channel混合は別の1×1 pointwise convolutionで行うのがDepthwise Separable Convolutionです。</p>"
        },
        {
            id:"pt-conv-transpose-role", category:"CNN", kind:"概念識別", difficulty:"標準",
            question:"学習可能なupsamplingとして使われるPyTorch layerはどれか。",
            options:["<code>nn.ConvTranspose2d</code>","<code>nn.Conv2d</code>の<code>eval()</code>","<code>nn.Dropout2d</code>","<code>nn.Flatten</code>"], answer:0,
            explanation:"<p><code>ConvTranspose2d</code>は転置畳み込みです。出力shapeはkernel・stride・padding・output_padding等で決まり、単なるConv2dの逆関数とは限りません。</p>"
        },
        {
            id:"pt-batchnorm2d-channel", category:"正規化", kind:"コード判定", difficulty:"必須",
            question:"<code>Conv2d</code>の出力shapeが(B,32,H,W)である。直後のBatch Normalizationは一般にどれか。",
            options:["<code>nn.BatchNorm2d(32)</code>","<code>nn.BatchNorm2d(H)</code>","<code>nn.BatchNorm1d(B)</code>","<code>nn.LayerNorm(B)</code>"], answer:0,
            explanation:"<p><code>BatchNorm2d(num_features)</code>のnum_featuresはchannel数Cです。学習時はbatch統計とrunning statsを更新し、eval時は保存済みrunning statsを使います。</p>"
        },
        {
            id:"pt-layernorm-transformer", category:"正規化", kind:"コード判定", difficulty:"標準",
            question:"TransformerのTensorが(B,L,D)で、各tokenのD特徴をLayer Normalizationしたい。代表的な定義はどれか。",
            options:["<code>nn.LayerNorm(D)</code>","<code>nn.BatchNorm2d(D)</code>","<code>nn.LayerNorm(B)</code>","<code>nn.InstanceNorm2d(L)</code>"], answer:0,
            explanation:"<p><code>LayerNorm(D)</code>は最後のD軸で平均・分散を計算します。Layerは『層数方向』という意味ではありません。</p>"
        },
        {
            id:"pt-adaptive-gap", category:"Pooling", kind:"コード判定", difficulty:"必須",
            question:"入力のH,Wが変わっても、各channelを必ず1×1へGlobal Average Poolingしたい。適切なのはどれか。",
            options:["<code>nn.AdaptiveAvgPool2d((1,1))</code>","<code>nn.MaxPool2d(1)</code>","<code>nn.Flatten()</code>","<code>nn.BatchNorm2d(1)</code>"], answer:0,
            explanation:"<p>AdaptiveAvgPool2dは入力H,Wに応じてpooling範囲を調整し、指定した出力サイズへします。(1,1)なら各channelにつき平均1個を残します。</p>"
        },
        {
            id:"pt-cnn-flatten-dim-calc", category:"CNN", kind:"計算", difficulty:"標準",
            question:"Tensor shapeが(B,64,7,7)である。<code>torch.flatten(x,1)</code>後の1sampleあたりFeatures数はいくつか。",
            options:["448","3136","6272","64"], answer:1,
            explanation:"<p><strong>使う公式：</strong>Features=C×H×W。</p><p><strong>代入：</strong>64×7×7=3136。</p><p><strong>答え：</strong>出力shapeは(B,3136)です。</p>"
        },
        {
            id:"pt-residual-shape", category:"ResNet実装", kind:"形状計算", difficulty:"本試験型",
            question:"Residual blockで<code>out + identity</code>を要素ごとに加算するための基本条件はどれか。",
            options:["projection後を含め、両Tensorのshapeを同じにする","class数だけ同じにする","dtypeだけ同じならshapeは任意","意図せずbroadcastさせる"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>Residual addはoutとidentityの各要素を1対1で加えるため、shapeを一致させます。</p><p><strong>判断：</strong>B,C,H,Wを比較します。</p><p><strong>答え：</strong>同じshapeへそろえます。channelや空間サイズが変わる場合は1×1 convolution等のprojection shortcutを使います。PyTorch上でbroadcastできても、意図しないbroadcastはblockのbugになり得ます。</p>"
        },
        {
            id:"pt-augmentation-mode", category:"Data Augmentation", kind:"コード判定", difficulty:"標準",
            question:"RandomCropやRandomHorizontalFlipなどのrandom augmentationを適用する基本方針として適切なのはどれか。",
            options:["train datasetへ適用し、validation/testは決定的なresize・normalize中心にする","testだけへ強く適用する","正解labelを必ず別classへ変える","model.eval()だけでtransformが自動停止する"], answer:0,
            explanation:"<p>学習時に見た目のvariationを増やし、validation/testは同じ条件で安定評価します。transform pipelineはmodel modeとは別なので、train用とeval用を分けます。</p>"
        },

        // 4. Embedding・RNN・Transformer
        {
            id:"pt-embedding-shape", category:"NLP実装", kind:"計算", difficulty:"必須",
            question:"token IDのTensor shapeが(B=8,L=20)、<code>nn.Embedding(10000,128)</code>を通した出力shapeはどれか。",
            options:["(8,20)","(8,20,128)","(10000,128)","(8,128,20,1)"], answer:1,
            explanation:"<p><strong>使うShape規則：</strong>Embeddingは各IDをembedding_dim個の特徴へ置換します。</p><p><strong>代入：</strong>(8,20)の各要素→128次元。</p><p><strong>答え：</strong>(8,20,128)です。入力IDのdtypeは通常<code>torch.long</code>です。</p>"
        },
        {
            id:"pt-embedding-padding-idx", category:"NLP実装", kind:"コード判定", difficulty:"標準",
            question:"PAD tokenのembeddingを更新対象外にしやすくする<code>nn.Embedding</code>の引数はどれか。",
            options:["<code>padding_idx=pad_id</code>","<code>kernel_size=pad_id</code>","<code>drop_last=True</code>","<code>groups=pad_id</code>"], answer:0,
            explanation:"<p><code>padding_idx</code>を指定すると、そのindexのembedding vectorはgradientによる更新を受けず、padding表現として使えます。Attention側ではpadding maskも別途必要です。</p>"
        },
        {
            id:"pt-lstm-input-shape", category:"LSTM", kind:"形状計算", difficulty:"必須",
            question:"<code>nn.LSTM(input_size=64,hidden_size=32,batch_first=True)</code>へ、B=8、L=20の系列を入れるshapeはどれか。",
            options:["(8,20,64)","(20,8,64)","(8,64,20)","(8,20,32)"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>batch_first=Trueの入力は(B,L,input_size)。</p><p><strong>代入：</strong>(8,20,64)。</p><p><strong>答え：</strong>(8,20,64)です。hidden_sizeは入力ではなく出力側の次元です。</p>"
        },
        {
            id:"pt-lstm-output-shape", category:"LSTM", kind:"計算", difficulty:"必須",
            question:"2層・双方向LSTM、hidden_size=32、batch_first=Trueへ(B=8,L=20,D=64)を入れた。<code>output</code>のshapeはどれか。",
            options:["(8,20,32)","(8,20,64)","(4,8,32)","(2,20,64)"], answer:1,
            explanation:"<p><strong>使う公式：</strong>output=(B,L,Directions×H<sub>hidden</sub>)。</p><p><strong>代入：</strong>(8,20,2×32)。</p><p><strong>答え：</strong>(8,20,64)です。層数はoutputの先頭軸には現れません。</p>"
        },
        {
            id:"pt-lstm-hn-shape", category:"LSTM", kind:"計算", difficulty:"必須",
            question:"3層・双方向LSTM、hidden_size=16、batch=10の<code>h_n</code>と<code>c_n</code>のshapeはどれか。",
            options:["(3,10,16)","(6,10,16)","(10,3,32)","(10,6,16)"], answer:1,
            explanation:"<p><strong>使う公式：</strong>h_n/c_n=(Layers×Directions,B,H<sub>hidden</sub>)。</p><p><strong>代入：</strong>(3×2,10,16)。</p><p><strong>答え：</strong>(6,10,16)です。batch_first=Trueでもこの軸順は変わりません。</p>"
        },
        {
            id:"pt-gru-return", category:"GRU", kind:"コード判定", difficulty:"標準",
            question:"PyTorchのGRUの代表的な戻り値はどれか。",
            options:["<code>output, h_n</code>","<code>output, (h_n,c_n)</code>","<code>c_n</code>だけ","<code>attention_weights</code>だけ"], answer:0,
            explanation:"<p>GRU（Gated Recurrent Unit）はLSTMのような独立したcell state <code>c_n</code>を持たず、<code>output</code>と<code>h_n</code>を返します。</p>"
        },
        {
            id:"pt-lstm-last-padding-trap", category:"LSTM", kind:"コード判定", difficulty:"本試験型",
            question:"paddingを含む可変長系列で<code>output[:,-1,:]</code>を分類へ使う際の注意として正しいものはどれか。",
            options:["最後の位置がPADの場合があるため、lengthで選ぶ・packする・h_nを正しく整形する必要がある","常に各系列の最後の実tokenになる","双方向でも必ず未来方向の最終状態と一致する","padding maskはCNN専用である"], answer:0,
            explanation:"<p><code>-1</code>はTensor上の最後の列であり、各sampleの実系列長は見ていません。同一長・単方向なら単純に使えますが、可変長や双方向ではlengthと方向を確認します。</p>"
        },
        {
            id:"pt-pack-padded", category:"LSTM", kind:"コード判定", difficulty:"難",
            question:"paddingされた可変長系列をRNNへ効率よく渡すPyTorch APIの組合せはどれか。",
            options:["<code>pack_padded_sequence</code>と必要に応じて<code>pad_packed_sequence</code>","<code>ConvTranspose2d</code>だけ","<code>state_dict</code>だけ","<code>optimizer.step</code>だけ"], answer:0,
            explanation:"<p><code>pack_padded_sequence</code>は実系列長を使ってPAD部分のRNN計算を避けます。通常lengthはCPU上で渡し、未sortなら<code>enforce_sorted=False</code>を使えます。</p>"
        },
        {
            id:"pt-transformer-layer-definition", category:"Transformer", kind:"コード判定", difficulty:"必須",
            question:"特徴次元D=256、head数8でbatch-firstのTransformer Encoder layerを作るコードはどれか。",
            options:["<code>nn.TransformerEncoderLayer(d_model=256,nhead=8,batch_first=True)</code>","<code>nn.LSTM(256,8,batch_first=True)</code>","<code>nn.Conv2d(256,8,3)</code>","<code>nn.Embedding(256,8,batch_first=True)</code>"], answer:0,
            explanation:"<p><code>d_model</code>はtoken特徴次元、<code>nhead</code>はMulti-Head Attentionのhead数です。<code>batch_first=True</code>なら入力は(B,L,D)です。</p>"
        },
        {
            id:"pt-mha-head-dim-calc", category:"Transformer", kind:"計算", difficulty:"必須",
            question:"<code>d_model=256</code>、<code>nhead=8</code>のとき、標準的な1 headあたりの次元はいくつか。",
            options:["8","16","32","64"], answer:2,
            explanation:"<p><strong>使う公式：</strong>head_dim=d_model/nhead。</p><p><strong>代入：</strong>256/8=32。</p><p><strong>答え：</strong>32です。d_modelはnheadで割り切れる必要があります。</p>"
        },
        {
            id:"pt-key-padding-mask-shape", category:"Transformer", kind:"形状計算", difficulty:"必須",
            question:"batch-firstでB=8、L=20の系列について、各sampleのPAD位置を隠す<code>key_padding_mask</code>の代表的shapeはどれか。",
            options:["(8,20)","(20,20)","(8,256)","(20)だけ"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>Padding maskは各sample・各token位置に1つの印を持つため(B,L)。</p><p><strong>代入：</strong>B=8、L=20。</p><p><strong>答え：</strong>(8,20)です。bool maskでは一般にTrueの位置を無視します。</p>"
        },
        {
            id:"pt-causal-mask-shape", category:"Transformer", kind:"形状計算", difficulty:"必須",
            question:"系列長L=20で未来tokenを見ないcausal mask（Self-Attention用）の代表的shapeはどれか。",
            options:["(20,20)","(8,20)","(20,256)","(8,8)"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>Causal maskは各query位置と各key位置の組を表すため(L,L)。</p><p><strong>代入：</strong>L=20。</p><p><strong>答え：</strong>(20,20)です。Padding maskの(B,L)とは役割が違います。</p>"
        },
        {
            id:"pt-transformer-pooling", category:"Transformer", kind:"コード判定", difficulty:"標準",
            question:"Transformer Encoderの出力(B,L,D)から文全体を分類する代表的な方法はどれか。",
            options:["CLS位置の特徴またはmaskを考慮したmean pooling→Linear","L軸をclass数としてそのままCrossEntropyLossへ","PAD位置だけを平均する","D軸を削除して文字列に戻す"], answer:0,
            explanation:"<p>各token表現を1つの文表現へ集約し、classifierへ渡します。mean poolingではPADを平均に含めないようmaskを使います。</p>"
        },
        {
            id:"pt-softmax-dim", category:"Tensor演算", kind:"コード判定", difficulty:"必須",
            question:"多クラスlogitsのshapeが(B,C)で、各sample内のclass確率和を1にしたい。Softmaxのdimはどれか。",
            options:["<code>dim=1</code>","<code>dim=0</code>","<code>dim=-2</code>だけが唯一","dim指定は不要"], answer:0,
            explanation:"<p>(B,C)ではclass軸がdim=1（同時にdim=-1）です。ただし学習時に<code>CrossEntropyLoss</code>へ渡す前はSoftmaxせず、raw logitsを渡します。</p>"
        },

        // 5. 応用モデル・分散・実行
        {
            id:"pt-vae-reparameterization", category:"VAE実装", kind:"コード判定", difficulty:"本試験型",
            question:"VAE（Variational Autoencoder／変分オートエンコーダ）の再parameter化として正しいコードはどれか。",
            options:["<code>std=torch.exp(0.5*logvar); eps=torch.randn_like(std); z=mu+std*eps</code>","<code>z=mu.detach()</code>だけ","<code>z=torch.argmax(mu)</code>","<code>z=loss.backward()</code>"], answer:0,
            explanation:"<p>Encoderは平均<code>mu</code>と対数分散<code>logvar</code>を出します。標準偏差は<code>exp(0.5*logvar)</code>。乱数を<code>eps</code>へ外出しすることで、<code>mu</code>と<code>logvar</code>へ勾配を流せます。</p>"
        },
        {
            id:"pt-gan-detach", category:"GAN実装", kind:"コード判定", difficulty:"本試験型",
            question:"GAN（Generative Adversarial Network／敵対的生成ネットワーク）のDiscriminatorを更新するとき、Generatorまで勾配を流さない代表的な書き方はどれか。",
            options:["<code>d_fake = D(fake.detach())</code>","<code>d_fake = D(fake.backward())</code>","<code>G.eval()</code>だけ","<code>fake.argmax()</code>"], answer:0,
            explanation:"<p><code>detach()</code>でfake画像の値はDへ渡しつつ、Gへ戻る計算グラフを切ります。Generator更新時はdetachせず、Dを通した結果からGへ勾配を流します。</p>"
        },
        {
            id:"pt-dqn-gather", category:"強化学習実装", kind:"コード判定", difficulty:"本試験型",
            question:"DQN（Deep Q-Network）でnetwork出力<code>q_all</code>が(B,Actions)、実行actionがshape (B)のlong Tensorである。各sampleで選んだ行動のQ値(B)を取り出す代表的コードはどれか。",
            options:["<code>q=q_all.gather(1, action.unsqueeze(1)).squeeze(1)</code>","<code>q=q_all.mean()</code>","<code>q=q_all[:,0]</code>で常に固定","<code>q=action.float()</code>"], answer:0,
            explanation:"<p><code>gather(dim=1,index)</code>は各行からaction列を選びます。indexは<code>torch.long</code>でq_allと同じdeviceに置き、(B,1)へそろえます。最後にsqueezeして(B)へ戻します。</p>"
        },
        {
            id:"pt-early-stopping", category:"汎化実装", kind:"コード判定", difficulty:"標準",
            question:"Early Stoppingを実装する基本方針として正しいものはどれか。",
            options:["validation指標が改善したmodel stateを保存し、一定epoch改善しなければ停止してbest stateを復元","training lossが1回下がれば必ず停止","test dataで毎epoch調整","model.eval()を呼ぶだけで自動停止"], answer:0,
            explanation:"<p>Early Stoppingはvalidation dataで『選ぶ』処理です。best score・patience（待つepoch数）・best stateを管理し、test dataは最後の評価だけに使います。</p>"
        },
        {
            id:"pt-ddp-role", category:"分散実装", kind:"コード判定", difficulty:"必須",
            question:"DDP（Distributed Data Parallel／分散Data Parallel）の説明として正しいものはどれか。",
            options:["各processが同じmodel replicaと異なるdataを持ち、backward時に勾配を同期する","1つのmodelを必ずlayerごとに分割する","parameterを同期せず別modelとして学習する","CPUでしか使えない"], answer:0,
            explanation:"<p>DDPは通常1 GPU＝1 processで同じmodelを複製し、異なるmini-batchを処理します。勾配をAll-Reduce等で同期し、同じparameterへ更新します。</p>"
        },
        {
            id:"pt-distributed-sampler", category:"分散実装", kind:"コード判定", difficulty:"標準",
            question:"DDPで各processへ重複を抑えてdataを分配し、epochごとにshuffle順を変える代表的な組合せはどれか。",
            options:["<code>DistributedSampler</code>を使い、各epochで<code>sampler.set_epoch(epoch)</code>","全processで同じ通常shuffleだけ","<code>ModuleList</code>をsamplerにする","<code>model.eval()</code>でdataを分割"], answer:0,
            explanation:"<p><code>DistributedSampler</code>がdataset indexをprocessごとに分けます。<code>set_epoch</code>を呼ぶことで、全processで整合した別のshuffle順をepochごとに生成します。</p>"
        },
        {
            id:"pt-amp-pattern", category:"実装補足・高速化", kind:"コード判定", difficulty:"標準",
            question:"CUDAのFP16混合精度学習で代表的な組合せはどれか。",
            options:["<code>autocast</code>でforward/lossを計算し、<code>GradScaler</code>でscale→backward→step→update","modelとdataを常に整数へ変換","<code>no_grad</code>内で学習","lossをPython floatへしてからbackward"], answer:0,
            explanation:"<p>AMPはAutomatic Mixed Precision（自動混合精度）です。現行APIの代表は<code>torch.autocast(device_type='cuda')</code>と<code>torch.amp.GradScaler('cuda')</code>で、旧<code>torch.cuda.amp.*</code>はdeprecated（非推奨）です。FP16（16-bit floating point）で勾配clipも行う場合は、<code>scaler.unscale_(optimizer)</code>→clip→<code>scaler.step(optimizer)</code>→<code>scaler.update()</code>の順にします。</p>"
        },
        {
            id:"pt-reproducibility", category:"再現性", kind:"概念識別", difficulty:"難",
            question:"PyTorch実験の再現性について最も正確な説明はどれか。",
            options:["Python・NumPy・torch等のseed、deterministic設定、DataLoader worker/generator等を管理するが、環境差まで含む完全一致は常に保証されない","<code>torch.manual_seed</code>を1回呼べば全環境で完全一致する","num_workersを増やせば必ず再現する","model.eval()だけで学習が再現する"], answer:0,
            explanation:"<p>乱数源は複数あり、GPU algorithmやlibrary/version差でも結果が変わり得ます。再現性と速度にはtrade-offがあるため、必要な範囲を明示して設定します。</p>"
        },

        // 6. 公開受験レポートの形式を踏まえた本試験型コード連問
        {
            id:"pt-exam-autograd-loss", setId:"pt-exam-autograd", setOrder:1,
            category:"本試験型・Autograd", kind:"図表・長文", difficulty:"本試験型",
            question:"次のコードについて、<code>loss</code>の値はどれか。<pre class='pt-question-code'><code>w = torch.tensor(2.0, requires_grad=True)\nx = torch.tensor(3.0)\ntarget = torch.tensor(1.0)\npred = w * x\nloss = (pred - target) ** 2\nloss.backward()</code></pre>",
            options:["5","10","25","30"], answer:2,
            explanation:"<p><strong>使う式：</strong>predictionは<code>pred=wx</code>、二乗誤差は<code>loss=(pred-target)^2</code>。</p><p><strong>代入：</strong>pred=2×3=6、loss=(6-1)^2=25。</p><p><strong>答え：</strong>25です。まずforwardの数値を上から順に追います。</p>"
        },
        {
            id:"pt-exam-autograd-grad", setId:"pt-exam-autograd", setOrder:2,
            category:"本試験型・Autograd", kind:"図表・長文", difficulty:"本試験型",
            question:"同じコードで<code>loss.backward()</code>直後の<code>w.grad</code>はいくつか。<pre class='pt-question-code'><code>w = torch.tensor(2.0, requires_grad=True)\nx = torch.tensor(3.0)\ntarget = torch.tensor(1.0)\npred = w * x\nloss = (pred - target) ** 2\nloss.backward()</code></pre>",
            options:["5","10","25","30"], answer:3,
            explanation:"<p><strong>使う公式：</strong>$\\frac{d}{dw}(wx-t)^2=2(wx-t)x$。</p><p><strong>代入：</strong>2×(2×3-1)×3=2×5×3=30。</p><p><strong>答え：</strong><code>w.grad=30</code>です。Autogradは同じ微分を計算グラフから求めます。</p>"
        },
        {
            id:"pt-exam-autograd-sgd", setId:"pt-exam-autograd", setOrder:3,
            category:"本試験型・Autograd", kind:"図表・長文", difficulty:"本試験型",
            question:"学習率0.1のSGD（Stochastic Gradient Descent／確率的勾配降下法）で1回更新すると、<code>w</code>はいくつになるか。<pre class='pt-question-code'><code># backward後：w=2.0, w.grad=30.0\nlr = 0.1\nwith torch.no_grad():\n    w -= lr * w.grad</code></pre>",
            options:["-1.0","1.7","2.3","5.0"], answer:0,
            explanation:"<p><strong>使う公式：</strong>$w_{new}=w-lr\\times grad$。</p><p><strong>代入：</strong>2.0-0.1×30.0=-1.0。</p><p><strong>答え：</strong>-1.0です。Optimizerの<code>step()</code>も基本的に勾配を使ってparameterを更新します。</p>"
        },

        {
            id:"pt-exam-mlp-output", setId:"pt-exam-mlp", setOrder:1,
            category:"本試験型・MLP", kind:"図表・長文", difficulty:"本試験型",
            question:"次の多クラス分類コードで<code>logits</code>のShapeはどれか。<pre class='pt-question-code'><code>model = nn.Sequential(\n    nn.Linear(4, 8),\n    nn.ReLU(),\n    nn.Linear(8, 3)\n)\nx = torch.randn(5, 4)\ntarget = torch.tensor([0, 2, 1, 0, 2], dtype=torch.long)\nlogits = model(x)\nloss = nn.CrossEntropyLoss()(logits, target)</code></pre>",
            options:["(5,3)","(3,5)","(5,8)","(4,3)"], answer:0,
            explanation:"<p><strong>まず入力を日本語にする：</strong><code>x.shape=(5,4)</code>の5はBatch（データの件数）、4は1件あたりの特徴数です。つまり「特徴を4個持つデータが5件」です。</p><p><strong>使うShape規則：</strong><code>Linear(in_features, out_features)</code>は、右端の特徴数だけを<code>in_features→out_features</code>へ変えます。データ件数の5は変えません。</p><div class='pt-table-wrap'><table class='pt-table'><tr><th>通過する場所</th><th>1件あたりの変化</th><th>Shape</th></tr><tr><td>入力<code>x</code></td><td>特徴4個</td><td><strong>(5,4)</strong></td></tr><tr><td><code>Linear(4,8)</code></td><td>4個→8個</td><td><strong>(5,8)</strong></td></tr><tr><td><code>ReLU()</code></td><td>負の値を0にするだけ</td><td><strong>(5,8)</strong></td></tr><tr><td><code>Linear(8,3)</code></td><td>8個→3 classの点数</td><td><strong>(5,3)</strong></td></tr></table></div><p><strong><code>logits</code>とは：</strong>各データに対するclass 0・1・2の「確率にする前の生の点数」です。行が5件のデータ、列が3 classなので(5,3)になります。</p><p><strong><code>target</code>との対応：</strong><code>[0,2,1,0,2]</code>は5件それぞれの正解class番号です。1件目はclass 0、2件目はclass 2です。<code>CrossEntropyLoss</code>が、logitsの各行と対応する正解番号を比較し、最後に1個のlossを返します。</p><p><strong>答え：</strong><code>(5,3)</code>です。覚え方は「<code>Linear</code>はShapeの右端だけを変える」です。</p>"
        },
        {
            id:"pt-exam-mlp-params", setId:"pt-exam-mlp", setOrder:2,
            category:"本試験型・MLP", kind:"図表・長文", difficulty:"本試験型",
            question:"同じモデルの学習parameter総数はいくつか。biasは両Linearにある。<pre class='pt-question-code'><code>model = nn.Sequential(\n    nn.Linear(4, 8),\n    nn.ReLU(),\n    nn.Linear(8, 3)\n)</code></pre>",
            options:["56","64","67","75"], answer:2,
            explanation:"<p><strong>使う公式：</strong>Linearのparameter数＝入力×出力＋出力bias。</p><p><strong>代入：</strong>(4×8+8)+(8×3+3)=40+27=67。</p><p><strong>答え：</strong>67個です。ReLUには学習parameterがありません。</p>"
        },
        {
            id:"pt-exam-mlp-ce-contract", setId:"pt-exam-mlp", setOrder:3,
            category:"本試験型・MLP", kind:"図表・長文", difficulty:"本試験型",
            question:"この<code>CrossEntropyLoss</code>への入力として、なぜコードは正しいのか。<pre class='pt-question-code'><code>logits = model(x)          # shape (5,3)\ntarget = torch.tensor(\n    [0,2,1,0,2], dtype=torch.long\n)                          # shape (5)\nloss = nn.CrossEntropyLoss()(logits, target)</code></pre>",
            options:["raw logitsは(B,C)、hard labelはlongの(B)だから","logitsへSoftmaxを2回かけているから","targetがfloatのone-hotだから","Batch軸とClass軸を入れ替えているから"], answer:0,
            explanation:"<p><strong>使う契約：</strong>hard class labelを使う標準形では、CE入力＝raw logits (B,C)、target＝<code>torch.long</code>のclass index (B)。</p><p><strong>照合：</strong>(5,3)とlongの(5)なので一致します。</p><p><strong>答え：</strong>選択肢1です。学習時にSoftmaxを先にかけません。</p>"
        },

        {
            id:"pt-exam-numpy-dnn-init-pairs", setId:"pt-exam-numpy-dnn", setOrder:1,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"NumPyで784→128→64→10の全結合ネットワークを作る。空欄（あ）に入り、隣接する層の重みを正しい順序で作るものはどれか。<pre class='pt-question-code'><code>num_units = [784, 128, 64, 10]\nweights = [\n    np.random.randn(prev_size, size)\n    for prev_size, size in （あ）\n]</code></pre>",
            options:["<code>zip(num_units[1:], num_units[0:])</code>","<code>zip(num_units[1:], num_units[1:])</code>","<code>zip(num_units[0:], num_units[1:])</code>","<code>zip(num_units, num_units)</code>"], answer:2,
            explanation:"<p><strong>① この空欄の役割：</strong>各重みを「手前の層のunit数、次の層のunit数」の組から作ります。</p><p><strong>② Shape：</strong>必要なのは(784,128)、(128,64)、(64,10)です。入力<code>(B,in)</code>と重み<code>(in,out)</code>を掛けると出力<code>(B,out)</code>になります。</p><p><strong>③ コード：</strong><code>zip(num_units[0:], num_units[1:])</code>は<code>(784,128),(128,64),(64,10)</code>を作ります。<code>zip</code>は短い側で終了します。</p><p><strong>④ 答え：</strong>選択肢3です。意図がさらに明確な書き方は<code>zip(num_units[:-1], num_units[1:])</code>です。</p>"
        },
        {
            id:"pt-exam-numpy-dnn-softmax", setId:"pt-exam-numpy-dnn", setOrder:2,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"出力層の点数<code>z</code>を各classの確率<code>y</code>へ変換するSoftmaxの定義式として正しいものはどれか。<pre class='pt-question-code'><code># z, y のShapeはどちらも (B, C)\n# i は注目するclass、j は全classを表す\ny_i = （い）</code></pre>",
            options:["$\\dfrac{e^{-z_i}}{\\sum_j e^{z_j}}$","$\\dfrac{e^{-z_i}}{\\sum_j e^{-z_j}}$","$\\dfrac{e^{z_i}}{\\sum_j e^{-z_j}}$","$\\dfrac{e^{z_i}}{\\sum_j e^{z_j}}$"], answer:3,
            explanation:"<p><strong>① この空欄の役割：</strong>同じsample内のclass点数を、合計1の確率へ直します。</p><p><strong>② Shape：</strong><code>z=(B,C)</code>です。各行ごとにC個のclassを合計するため、class軸は<code>axis=1</code>です。</p><p><strong>③ 公式：</strong>$y_i=\\dfrac{e^{z_i}}{\\sum_j e^{z_j}}$。つまり「自分の指数÷全classの指数合計」です。</p><p><strong>④ 答え：</strong>選択肢4です。実装では<code>z_shift = z - np.max(z, axis=1, keepdims=True)</code>として各行の最大値を先に引くと、overflowを防ぎながら同じ確率を得られます。</p>"
        },
        {
            id:"pt-exam-numpy-dnn-cross-entropy", setId:"pt-exam-numpy-dnn", setOrder:3,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"予測確率<code>y</code>とone-hot正解<code>correct</code>から、各sampleのCross Entropyを求める式として正しいものはどれか。<pre class='pt-question-code'><code># y, correct: (B, C)\n# correctは正解classだけ1、ほかは0\ncross_entropy = （う）\nloss = np.mean(cross_entropy)</code></pre>",
            options:["<code>-np.sum(y * np.log(correct + 1e-8), axis=1)</code>","<code>-np.sum(correct * np.log(y + 1e-8), axis=1)</code>","<code>np.sum(correct * np.log(y + 1e-8), axis=1)</code>","<code>-np.sum(correct * np.log(y + 1e-8), axis=0)</code>"], answer:1,
            explanation:"<p><strong>① この空欄の役割：</strong>正解classへ割り当てた予測確率を採点します。</p><p><strong>② Shape：</strong><code>(B,C)</code>をclass軸<code>axis=1</code>で合計すると、sampleごとの損失<code>(B,)</code>になります。その後<code>mean</code>で1個のlossにします。</p><p><strong>③ 公式：</strong>$L=-\\sum_i correct_i\\log y_i$。one-hotの0が誤classの項を消し、正解classの<code>-log(y)</code>だけが残ります。</p><p><strong>④ 答え：</strong>選択肢2です。<code>1e-8</code>は<code>log(0)</code>を避けます。</p>"
        },
        {
            id:"pt-exam-numpy-dnn-output-grad", setId:"pt-exam-numpy-dnn", setOrder:4,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"この実装ではBatch平均の<code>1/B</code>を更新時に1回だけ適用する。SoftmaxとCross Entropyを組み合わせた出力層で、各sampleの未平均の出力誤差<code>dz</code>として正しいものはどれか。<pre class='pt-question-code'><code># y, correct, dz: (B, C)\ndz = （え）</code></pre>",
            options:["<code>y * correct</code>","<code>np.square(y - correct)</code>","<code>np.log(y) * correct</code>","<code>y - correct</code>"], answer:3,
            explanation:"<p><strong>① この空欄の役割：</strong>出力の誤差を、出力層の重みへ渡せる形にします。</p><p><strong>② Shape：</strong><code>y</code>と<code>correct</code>はともに<code>(B,C)</code>なので、差の<code>dz</code>も<code>(B,C)</code>です。</p><p><strong>③ 公式：</strong>sample $n$ のCross Entropyを$\\ell_n$とすると、Softmaxとまとめた勾配は$\\dfrac{\\partial \\ell_n}{\\partial z_n}=y_n-correct_n$です。平均lossの厳密な勾配は<code>(y-correct)/B</code>ですが、この実装は勾配をいったん合計し、更新時に<code>/B</code>します。</p><p><strong>④ 答え：</strong><code>y - correct</code>です。<code>/B</code>は<code>dz</code>側か更新側のどちらか一度だけ行います。</p>"
        },
        {
            id:"pt-exam-numpy-dnn-bias-grad", setId:"pt-exam-numpy-dnn", setOrder:5,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"出力層のbias勾配を求める空欄（お）として正しいものはどれか。<pre class='pt-question-code'><code># dz: (B, C), bias: (C,)\ngrads_w[-1] = np.matmul(u.transpose(), dz)\ngrads_b[-1] = （お）</code></pre>",
            options:["<code>np.sum(dz, axis=1)</code>","<code>np.sum(u, axis=1)</code>","<code>np.sum(dz, axis=0)</code>","<code>np.sum(u, axis=0)</code>"], answer:2,
            explanation:"<p><strong>① この空欄の役割：</strong>全sampleが同じbiasを使うため、sampleごとの誤差を合計します。</p><p><strong>② Shape：</strong><code>dz=(B,C)</code>からbiasと同じ<code>(C,)</code>を作りたいので、Batch軸Bを消し、class軸Cを残します。</p><p><strong>③ コード：</strong><code>axis=0</code>は行方向、つまりBatchを足します。したがって<code>np.sum(dz, axis=0)</code>です。</p><p><strong>④ 答え：</strong>選択肢3です。覚え方は「biasは列ごとに1個なので、縦に足す」です。</p>"
        },
        {
            id:"pt-exam-numpy-dnn-backprop-matmul", setId:"pt-exam-numpy-dnn", setOrder:6,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"逆伝播で現在の<code>dz</code>を1層前の出力勾配<code>du</code>へ戻す空欄（か）はどれか。重みは入力側から順に格納されている。<pre class='pt-question-code'><code># i=0では dz:(B,10), weights[-1]:(64,10)\nfor i in range(self.num_hidden):\n    du = （か）\n    dz = relu_prime(u) * du</code></pre>",
            options:["<code>np.matmul(dz, self.weights[-i-1].transpose())</code>","<code>np.matmul(dz, self.weights[-i-2].transpose())</code>","<code>np.matmul(self.weights[-i-1].transpose(), dz)</code>","<code>np.matmul(self.weights[-i-2].transpose(), dz)</code>"], answer:0,
            explanation:"<p><strong>① この空欄の役割：</strong>現在の層の誤差を、重みを通して1層前へ戻します。</p><p><strong>② Shape：</strong>最初の反復は<code>dz:(B,10)</code>、<code>W[-1]:(64,10)</code>、したがって<code>W[-1].T:(10,64)</code>です。</p><p><strong>③ 公式：</strong>$du=dz\\,W^\\top$。代入すると<code>(B,10) @ (10,64) → (B,64)</code>となり、ReLU層のShapeへ戻れます。</p><p><strong>④ 答え：</strong>選択肢1です。次の反復では自動的に<code>weights[-2]</code>を使います。</p>"
        },
        {
            id:"pt-exam-numpy-dnn-sgd-update", setId:"pt-exam-numpy-dnn", setOrder:7,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"この実装では<code>grads_w</code>にBatch内の勾配の合計が入る。SGDで重みを更新する空欄（き）はどれか。<pre class='pt-question-code'><code>self.weights = [\n    （き）\n    for w, grad in zip(self.weights, grads_w)\n]</code></pre>",
            options:["<code>w + learning_rate * grad * batch_size</code>","<code>w - learning_rate * grad * batch_size</code>","<code>w + learning_rate * grad / batch_size</code>","<code>w - learning_rate * grad / batch_size</code>"], answer:3,
            explanation:"<p><strong>① この空欄の役割：</strong>損失を小さくする方向へparameterを1回更新します。</p><p><strong>② Shape：</strong><code>w</code>と<code>grad</code>は同じShapeなので要素ごとに更新できます。</p><p><strong>③ 公式：</strong>$W_{new}=W-learning\\_rate\\times dW/B$。勾配と反対へ進むのでマイナス、今回は勾配の合計なのでBatch数Bで平均します。</p><p><strong>④ 答え：</strong>選択肢4です。<code>dz</code>側ですでにBで割った実装なら、更新時にもう一度割ってはいけません。</p>"
        },
        {
            id:"pt-exam-numpy-dnn-accuracy", setId:"pt-exam-numpy-dnn", setOrder:8,
            category:"本試験型・NumPy DNN", kind:"図表・長文", difficulty:"本試験型",
            question:"予測<code>y</code>とone-hot正解<code>correct</code>はいずれも<code>(B,C)</code>である。正解率を求める空欄（く）はどれか。<pre class='pt-question-code'><code>accuracy = np.mean(\n    （く）\n)</code></pre>",
            options:["<code>np.equal(np.argmin(y, axis=1), np.argmin(correct, axis=1))</code>","<code>np.equal(np.argmax(y, axis=1), np.argmax(correct, axis=1))</code>","<code>np.equal(np.argmax(y, axis=0), np.argmax(correct, axis=0))</code>","<code>np.equal(np.argmin(y, axis=0), np.argmin(correct, axis=0))</code>"], answer:1,
            explanation:"<p><strong>① この空欄の役割：</strong>各sampleの予測classと正解classが一致したかをTrue/Falseで求めます。</p><p><strong>② Shape：</strong>1行が1sample、列がclassなので、<code>argmax(axis=1)</code>で<code>(B,C)→(B,)</code>にします。</p><p><strong>③ コード：</strong>予測と正解の<code>argmax</code>同士を<code>np.equal</code>で比較します。外側の<code>np.mean</code>がTrueの割合をscalarへ変えます。</p><p><strong>④ 答え：</strong>選択肢2です。<code>axis=0</code>ではsampleごとではなく、classごとにBatch方向の最大を探してしまいます。</p>"
        },

        {
            id:"pt-exam-cnn-pool-shape", setId:"pt-exam-cnn", setOrder:1,
            category:"本試験型・CNN", kind:"図表・長文", difficulty:"本試験型",
            question:"次のモデルで、最初の<code>MaxPool2d</code>直後のShapeはどれか。<pre class='pt-question-code'><code>model = nn.Sequential(\n    nn.Conv2d(3, 16, 3, padding=1),\n    nn.ReLU(),\n    nn.MaxPool2d(2),\n    nn.Conv2d(16, 32, 3, padding=1),\n    nn.ReLU(),\n    nn.AdaptiveAvgPool2d((1, 1)),\n    nn.Flatten(1),\n    nn.Linear(32, 10)\n)\nx = torch.randn(8, 3, 32, 32)</code></pre>",
            options:["(8,16,16,16)","(8,3,16,16)","(8,16,32,32)","(16,8,16,16)"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>padding=1の3×3 Conv・stride=1はH,Wを保ち、MaxPool2d(2)はH,Wを半分にします。</p><p><strong>代入：</strong>(8,3,32,32)→Convで(8,16,32,32)→Poolで(8,16,16,16)。</p><p><strong>答え：</strong>(8,16,16,16)です。</p>"
        },
        {
            id:"pt-exam-cnn-conv-params", setId:"pt-exam-cnn", setOrder:2,
            category:"本試験型・CNN", kind:"図表・長文", difficulty:"本試験型",
            question:"最初の<code>Conv2d(3,16,3,padding=1)</code>のparameter数はいくつか。biasありとする。<pre class='pt-question-code'><code>nn.Conv2d(\n    in_channels=3,\n    out_channels=16,\n    kernel_size=3,\n    padding=1\n)</code></pre>",
            options:["432","448","576","592"], answer:1,
            explanation:"<p><strong>使う公式：</strong>parameter数＝(K_h×K_w×C_in＋bias 1個)×C_out。</p><p><strong>代入：</strong>(3×3×3+1)×16=28×16=448。</p><p><strong>答え：</strong>448個です。paddingはparameter数へ影響しません。</p>"
        },
        {
            id:"pt-exam-cnn-final-shape", setId:"pt-exam-cnn", setOrder:3,
            category:"本試験型・CNN", kind:"図表・長文", difficulty:"本試験型",
            question:"同じモデルで、<code>AdaptiveAvgPool2d((1,1))</code>以降のShape推移として正しいものはどれか。<pre class='pt-question-code'><code>...\nnn.Conv2d(16, 32, 3, padding=1),\nnn.AdaptiveAvgPool2d((1, 1)),\nnn.Flatten(1),\nnn.Linear(32, 10)</code></pre>",
            options:["(8,32,1,1)→(8,32)→(8,10)","(8,1,1,32)→(256)→(10)","(8,32,16,16)→(8,8192)→(8,10)だけ","(32,8,1,1)→(32,8)→(10,8)"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>AdaptiveAvgPoolは各channelの空間を1×1へし、Flatten(1)はBatch以外をまとめ、Linearは最後の軸を10へ変えます。</p><p><strong>代入：</strong>(8,32,H,W)→(8,32,1,1)→(8,32)→(8,10)。</p><p><strong>答え：</strong>選択肢1です。</p>"
        },
        {
            id:"pt-exam-cnn-lenet-linear", setId:"pt-exam-cnn-lenet", setOrder:1,
            category:"本試験型・CNN", kind:"図表・長文", difficulty:"本試験型",
            question:"32×32のRGB画像を入力する。クラス<code>Net</code>の（あ）に入る適切なコードはどれか。<pre class='pt-question-code'><code>class Net(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv1 = nn.Conv2d(3, 6, 5, stride=1, padding=0)\n        self.pool  = nn.MaxPool2d(2, stride=2, padding=0)\n        self.conv2 = nn.Conv2d(6, 16, 5, stride=1, padding=0)\n        self.fc1   = <span class='pt-ask'>（あ）</span>\n        self.fc2   = nn.Linear(120, 84)\n        self.fc3   = nn.Linear(84, 10)\n\n    def forward(self, x):\n        x = self.pool(F.relu(self.conv1(x)))\n        x = self.pool(F.relu(self.conv2(x)))\n        x = torch.flatten(x, 1)\n        x = F.relu(self.fc1(x))\n        x = F.relu(self.fc2(x))\n        return self.fc3(x)</code></pre>",
            options:["<code>nn.Linear(in_features=16 * 32 * 32, out_features=120)</code>","<code>nn.Linear(in_features=16 * 11 * 11, out_features=120)</code>","<code>nn.Linear(in_features=16 * 5 * 5, out_features=120)</code>","<code>nn.Linear(in_features=16 * 8 * 8, out_features=120)</code>"], answer:2,
            explanation:"<p><strong>使う公式：</strong>dilation=1なら、<code>out=floor((in+2P−K)/S)+1</code>です。正方形なのでHとWは同じ計算をします。</p><div class='pt-table-wrap'><table class='pt-table'><tr><th>場所</th><th>空間サイズ</th><th>Shape</th></tr><tr><td>入力</td><td>32</td><td><code>(B,3,32,32)</code></td></tr><tr><td>Conv1：K=5</td><td>32−5＋1＝28</td><td><code>(B,6,28,28)</code></td></tr><tr><td>Pool1：K=S=2</td><td>28÷2＝14</td><td><code>(B,6,14,14)</code></td></tr><tr><td>Conv2：K=5</td><td>14−5＋1＝10</td><td><code>(B,16,10,10)</code></td></tr><tr><td>Pool2：K=S=2</td><td>10÷2＝5</td><td><code>(B,16,5,5)</code></td></tr></table></div><p><strong>Flatten：</strong>Batch軸を残し、1sampleを<code>16×5×5＝400</code>個へまとめます。</p><p><strong>答え：</strong><code>nn.Linear(in_features=16 * 5 * 5, out_features=120)</code>です。最短メモは<strong>32→28→14→10→5</strong>です。</p>"
        },
        {
            id:"pt-exam-cnn-lenet-statement", setId:"pt-exam-cnn-lenet", setOrder:2,
            category:"本試験型・CNN", kind:"図表・長文", difficulty:"本試験型",
            question:"同じCNNプログラムの説明として、適切なものはどれか。<pre class='pt-question-code'><code># model\nself.pool = nn.MaxPool2d(2, stride=2)\nself.fc1 = nn.Linear(16 * 5 * 5, 120)\n...\nreturn self.fc3(x)\n\n# input transform\ntransforms.Normalize(\n    mean=(0.5, 0.5, 0.5),\n    std=(0.5, 0.5, 0.5)\n)</code></pre>",
            options:["<code>forward()</code>の返り値は、入力画像に対するclass事後確率である","正方形画像であれば、画像sizeに依存せずclass分類が可能である","<code>forward()</code>で2度用いるPooling層は、訓練parameterを共有している","入力画像には、各RGB channelについて平均0.5・標準偏差0.5を用いるNormalizeが適用される"], answer:3,
            explanation:"<p><strong>正解：</strong>4です。<code>Normalize(mean=(.5,.5,.5), std=(.5,.5,.5))</code>が、各RGB channelへ指定値を使う正規化を適用します。</p><p><strong>1が誤り：</strong>最後にSoftmaxがないため、<code>fc3</code>の返り値は確率ではなくraw logitsです。<code>CrossEntropyLoss</code>にはこのlogitsを渡します。</p><p><strong>2が誤り：</strong><code>fc1</code>の入力を<code>16*5*5</code>へ固定しているため、入力sizeを変えるとShapeが合いません。</p><p><strong>3が誤り：</strong>同じ<code>self.pool</code>を2回呼びますが、<code>MaxPool2d</code>に学習parameterはありません。共有する訓練parameter自体がありません。</p>"
        },

        {
            id:"pt-exam-eval-missing", setId:"pt-exam-eval", setOrder:1,
            category:"本試験型・推論", kind:"図表・長文", difficulty:"本試験型",
            question:"次のvalidationコードで、DropoutとBatchNormを推論時の挙動へ切り替えるため不足している1行はどれか。<pre class='pt-question-code'><code>def evaluate(model, loader, device):\n    # ここに1行必要\n    with torch.no_grad():\n        for x, y in loader:\n            x = x.to(device)\n            logits = model(x)</code></pre>",
            options:["<code>model.eval()</code>","<code>model.zero_grad()</code>","<code>model.cpu()</code>","<code>loss.backward()</code>"], answer:0,
            explanation:"<p><strong>使う規則：</strong><code>eval()</code>はDropout・BatchNorm等の層の挙動を推論用へ切り替えます。</p><p><strong>コード照合：</strong><code>no_grad()</code>は勾配記録だけを止め、層のmodeは変更しません。</p><p><strong>答え：</strong><code>model.eval()</code>です。</p>"
        },
        {
            id:"pt-exam-eval-no-grad", setId:"pt-exam-eval", setOrder:2,
            category:"本試験型・推論", kind:"図表・長文", difficulty:"本試験型",
            question:"同じコードの<code>with torch.no_grad():</code>が担当する役割はどれか。<pre class='pt-question-code'><code>model.eval()\nwith torch.no_grad():\n    logits = model(x)</code></pre>",
            options:["Autogradの計算グラフ記録を止める","Dropout率を0へ書き換える","BatchNormのrunning statsを削除する","modelをGPUへ送る"], answer:0,
            explanation:"<p><strong>使う規則：</strong><code>no_grad()</code>はその範囲の勾配記録を止めます。</p><p><strong>結果：</strong>推論時のmemory・計算を減らせますが、model modeは変えません。</p><p><strong>答え：</strong>Autogradの計算グラフ記録を止める、です。</p>"
        },
        {
            id:"pt-exam-eval-only", setId:"pt-exam-eval", setOrder:3,
            category:"本試験型・推論", kind:"図表・長文", difficulty:"本試験型",
            question:"<code>model.eval()</code>だけを呼び、<code>no_grad()</code>も<code>inference_mode()</code>も使わずにforwardした場合、最も正確な説明はどれか。<pre class='pt-question-code'><code>model.eval()\nlogits = model(x)</code></pre>",
            options:["層は推論modeだが、必要なTensorでは計算グラフが記録され得る","勾配記録も必ず停止する","parameterが自動削除される","学習modeのDropoutが有効なまま"], answer:0,
            explanation:"<p><strong>使う区別：</strong><code>eval()</code>＝層のmode、<code>no_grad()</code>／<code>inference_mode()</code>＝Autograd記録。</p><p><strong>照合：</strong>前者しか呼んでいないため、層は推論modeでも勾配記録は別です。</p><p><strong>答え：</strong>選択肢1です。</p>"
        },

        {
            id:"pt-exam-lstm-embedding", setId:"pt-exam-lstm", setOrder:1,
            category:"本試験型・LSTM", kind:"図表・長文", difficulty:"本試験型",
            question:"次のコードで<code>emb</code>のShapeはどれか。<pre class='pt-question-code'><code>embedding = nn.Embedding(1000, 64)\nlstm = nn.LSTM(\n    64, 32, num_layers=2,\n    bidirectional=True, batch_first=True\n)\nids = torch.randint(0, 1000, (4, 12))\nemb = embedding(ids)\noutput, (h_n, c_n) = lstm(emb)</code></pre>",
            options:["(4,12,64)","(12,4,64)","(4,12,32)","(1000,64)"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong><code>Embedding(V,E)</code>は各token IDをE次元vectorへ変え、元の軸を保ちます。</p><p><strong>代入：</strong>IDs (B,L)=(4,12)、E=64。</p><p><strong>答え：</strong>(4,12,64)です。</p>"
        },
        {
            id:"pt-exam-lstm-output", setId:"pt-exam-lstm", setOrder:2,
            category:"本試験型・LSTM", kind:"図表・長文", difficulty:"本試験型",
            question:"同じコードの<code>output</code>のShapeはどれか。<pre class='pt-question-code'><code>lstm = nn.LSTM(\n    input_size=64, hidden_size=32,\n    num_layers=2, bidirectional=True,\n    batch_first=True\n)\noutput, (h_n, c_n) = lstm(emb)  # emb: (4,12,64)</code></pre>",
            options:["(4,12,64)","(4,12,32)","(4,2,32)","(12,4,64)"], answer:0,
            explanation:"<p><strong>使う公式：</strong>batch_firstのoutput＝(B,L,Directions×H_hidden)。</p><p><strong>代入：</strong>(4,12,2×32)=(4,12,64)。</p><p><strong>答え：</strong>(4,12,64)です。双方向なので最後の軸が2倍です。</p>"
        },
        {
            id:"pt-exam-lstm-state", setId:"pt-exam-lstm", setOrder:3,
            category:"本試験型・LSTM", kind:"図表・長文", difficulty:"本試験型",
            question:"同じコードの<code>h_n</code>と<code>c_n</code>のShapeはどれか。<pre class='pt-question-code'><code>lstm = nn.LSTM(64, 32,\n    num_layers=2, bidirectional=True,\n    batch_first=True)\noutput, (h_n, c_n) = lstm(emb)</code></pre>",
            options:["(4,4,32)","(4,12,64)","(2,4,32)","(4,32)"], answer:0,
            explanation:"<p><strong>使う公式：</strong>state＝(Layers×Directions,B,H_hidden)。</p><p><strong>代入：</strong>(2×2,4,32)=(4,4,32)。</p><p><strong>答え：</strong>両方とも(4,4,32)です。<code>batch_first</code>でもstateの軸順は変わりません。</p>"
        },
        {
            id:"pt-exam-lstm-padding", setId:"pt-exam-lstm", setOrder:4,
            category:"本試験型・LSTM", kind:"図表・長文", difficulty:"本試験型",
            question:"実際の系列長が<code>[12,10,8,6]</code>で右側をPADしている。文分類に<code>output[:, -1, :]</code>を使う問題点はどれか。<pre class='pt-question-code'><code># output: (B=4, L=12, Features)\nlengths = torch.tensor([12, 10, 8, 6])\nfeatures = output[:, -1, :]</code></pre>",
            options:["短いsampleでは最後の実tokenでなくPAD位置の出力を選び得る","必ず最初のtokenを選ぶ","Class軸を平均してしまう","h_nとc_nを自動削除する"], answer:0,
            explanation:"<p><strong>使う規則：</strong><code>-1</code>は全sampleで固定のL=12位置です。</p><p><strong>照合：</strong>長さ10・8・6のsampleでは、その位置はPAD領域です。</p><p><strong>答え：</strong>PAD位置を選び得ます。lengthで最後の実tokenを集める、packを使う、または双方向stateを正しく整形します。</p>"
        },

        {
            id:"pt-exam-transformer-head", setId:"pt-exam-transformer", setOrder:1,
            category:"本試験型・Transformer", kind:"図表・長文", difficulty:"本試験型",
            question:"次のEncoderで1 headあたりの次元はいくつか。<pre class='pt-question-code'><code>layer = nn.TransformerEncoderLayer(\n    d_model=128, nhead=8,\n    batch_first=True\n)\nencoder = nn.TransformerEncoder(layer, num_layers=2)\nx = torch.randn(4, 20, 128)\npad_mask = torch.zeros(4, 20, dtype=torch.bool)\ny = encoder(x, src_key_padding_mask=pad_mask)</code></pre>",
            options:["8","16","20","128"], answer:1,
            explanation:"<p><strong>使う公式：</strong>head_dim=d_model/nhead。</p><p><strong>代入：</strong>128/8=16。</p><p><strong>答え：</strong>16です。d_modelはnheadで割り切れる必要があります。</p>"
        },
        {
            id:"pt-exam-transformer-output", setId:"pt-exam-transformer", setOrder:2,
            category:"本試験型・Transformer", kind:"図表・長文", difficulty:"本試験型",
            question:"同じEncoderの出力<code>y</code>のShapeはどれか。<pre class='pt-question-code'><code># batch_first=True\nx = torch.randn(4, 20, 128)\ny = encoder(\n    x, src_key_padding_mask=pad_mask\n)</code></pre>",
            options:["(4,20,128)","(20,4,128)","(4,8,16)","(4,128)"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>Transformer Encoderはtoken数Lとmodel次元Dを保ち、batch_firstなら(B,L,D)です。</p><p><strong>代入：</strong>(4,20,128)→Encoder→(4,20,128)。</p><p><strong>答え：</strong>(4,20,128)です。headへ分割しても最後に結合されます。</p>"
        },
        {
            id:"pt-exam-transformer-mask", setId:"pt-exam-transformer", setOrder:3,
            category:"本試験型・Transformer", kind:"図表・長文", difficulty:"本試験型",
            question:"<code>src_key_padding_mask</code>のShapeとbool値の意味として正しいものはどれか。<pre class='pt-question-code'><code>x = torch.randn(4, 20, 128)\npad_mask = torch.zeros(4, 20, dtype=torch.bool)\ny = encoder(x, src_key_padding_mask=pad_mask)</code></pre>",
            options:["(B,L)=(4,20)で、True位置をkeyとして無視する","(L,L)=(20,20)で、True位置だけ学習する","(B,D)=(4,128)で、True channelを削除する","(nhead,L)=(8,20)で、headを停止する"], answer:0,
            explanation:"<p><strong>使うShape規則：</strong>key padding maskは各sample・各key位置に印を持つため(B,L)。</p><p><strong>代入：</strong>B=4、L=20なので(4,20)。PyTorchのbool padding maskではTrue位置を無視します。</p><p><strong>答え：</strong>選択肢1です。</p>"
        }
    ]
};
