window.quizData = {
    title: "合格圏ブートキャンプ 2026",
    cheatSheet: `
        <p><strong>狙い：</strong>前回50%台だった4領域を、単語暗記ではなく「式 → 数値 → 内部挙動」の順で結び直します。計算は途中式を紙に書き、選択肢を見る前に答えの符号・桁・形状を予測してください。</p>
        <h3>1. 72秒で使う計算テンプレート</h3>
        <table>
          <tr><th>テーマ</th><th>最初に書く式</th><th>罠</th></tr>
          <tr><td>Softmax</td><td>$p_i=\\exp(z_i-m)/\\sum_j\\exp(z_j-m)$</td><td>最大値 $m$ を引いても確率は不変。オーバーフローを防ぐ。</td></tr>
          <tr><td>自己情報量</td><td>$I(x)=-\\log_2P(x)$</td><td>組合せ数を数えてから確率を作る。底2なら単位はbit。</td></tr>
          <tr><td>混同行列</td><td>$TPR=TP/(TP+FN)$、$FPR=FP/(FP+TN)$</td><td>分母は実際の正例／実際の負例。</td></tr>
          <tr><td>コサイン類似度</td><td>$a\\cdot b/(\\|a\\|\\|b\\|)$</td><td>内積だけではない。大きさで割る。</td></tr>
          <tr><td>CNN出力</td><td>$\\lfloor(H+2P-D(K-1)-1)/S+1\\rfloor$</td><td>dilationがあると有効カーネルは $D(K-1)+1$。</td></tr>
          <tr><td>Attention</td><td>$softmax(QK^T/\\sqrt{d_k})V$</td><td>Cross-Attentionは $Q$ がDecoder、$K,V$ がEncoder。</td></tr>
        </table>
        <h3>2. 実装の内部仕様</h3>
        <ul>
          <li><code>CrossEntropyLoss</code> は未正規化logitsを受け取り、内部でLogSoftmaxとNLLLossを行う。</li>
          <li><code>model.eval()</code> はDropout/BatchNormの挙動を変えるが、勾配記録は止めない。<code>torch.no_grad()</code>とは別。</li>
          <li><code>backward()</code> は勾配を加算する。意図的な勾配蓄積でなければ更新前に<code>zero_grad()</code>。</li>
          <li><code>permute()</code>後は非連続になり得るため、<code>view()</code>前に<code>contiguous()</code>、または<code>reshape()</code>を使う。</li>
        </ul>
        <h3>3. E2026#2の追加キーワード</h3>
        <p><strong>パープレキシティ、Shifted window、Next token prediction、RAG、自己回帰、Integrated Gradients</strong>が追加。名称だけでなく、何を入力し何を最適化・可視化するかまで説明できる状態にします。</p>
    `,
    questions: [
        {
            id:"math-softmax-extreme", category:"応用数学・計算", kind:"手計算", difficulty:"必須",
            question:"ロジット $z=[0,100,100]$ にSoftmaxを適用する。最も近い出力はどれか。",
            options:["$[0,0.5,0.5]$", "$[0,1,1]$", "$[1/3,1/3,1/3]$", "$[0,0,1]$"], answer:0,
            explanation:"最大値100を引くと $[-100,0,0]$。指数は $[e^{-100},1,1]$ なので、和はほぼ2。したがって $[e^{-100}/2,1/2,1/2]\\approx[0,0.5,0.5]$ です。0と100の差は大きい一方、後ろ2要素の差は0なので同率になります。",
            trap:"Softmaxは最大要素を1にする関数ではありません。同じ最大ロジットが2つなら確率を分け合います。"
        },
        {
            id:"math-softmax-shift", category:"応用数学・計算", kind:"数式理解", difficulty:"標準",
            question:"任意の定数 $c$ について $softmax(z)$ と必ず等しいものはどれか。",
            options:["$softmax(z+c)$", "$softmax(cz)$", "$c\\,softmax(z)$", "$softmax(z)/c$"], answer:0,
            explanation:"各項は $e^{z_i+c}=e^c e^{z_i}$ となり、分子・分母の $e^c$ が相殺されます。この平行移動不変性により、実装では最大ロジットを引いて数値安定化できます。"
        },
        {
            id:"math-information-combination", category:"応用数学・計算", kind:"手計算", difficulty:"必須",
            question:"公平なコインを3回投げる。表がちょうど2回出る事象の自己情報量はどれか（底2）。",
            options:["$-\\log_2(3/8)\\approx1.42$ bit", "$-\\log_2(1/8)=3$ bit", "$-\\log_2(2/3)\\approx0.58$ bit", "$3/8$ bit"], answer:0,
            explanation:"表2回の並びは $\\binom{3}{2}=3$ 通り、全事象は $2^3=8$ 通りなので $P=3/8$。よって $I=-\\log_2(3/8)=\\log_2(8/3)\\approx1.42$ bitです。",
            trap:"「表表裏」の1通りだけを数えて $1/8$ としないこと。順序の異なる重複組合せを先に数えます。"
        },
        {
            id:"math-cosine", category:"応用数学・計算", kind:"手計算", difficulty:"必須",
            question:"$a=(1,2), b=(2,1)$ のコサイン類似度はいくつか。",
            options:["$4/5=0.8$", "$3/5=0.6$", "$4/\\sqrt5$", "$1$"], answer:0,
            explanation:"内積は $1\\times2+2\\times1=4$。両ノルムは $\\sqrt5$ なので、$4/(\\sqrt5\\sqrt5)=4/5=0.8$ です。"
        },
        {
            id:"math-confusion", category:"評価指標・計算", kind:"手計算", difficulty:"必須",
            question:"$TP=40,FN=10,FP=15,TN=35$ のとき、TPRとFPRの組はどれか。",
            options:["TPR=0.80, FPR=0.30", "TPR=0.73, FPR=0.30", "TPR=0.80, FPR=0.20", "TPR=0.73, FPR=0.20"], answer:0,
            explanation:"$TPR=40/(40+10)=0.80$。$FPR=15/(15+35)=0.30$。TPRの分母は実際の正例、FPRの分母は実際の負例です。"
        },
        {
            id:"math-entropy", category:"応用数学・計算", kind:"手計算", difficulty:"標準",
            question:"ベルヌーイ変数の $P(X=1)=P(X=0)=0.5$。エントロピー（底2）はいくつか。",
            options:["1 bit", "0 bit", "0.5 bit", "2 bit"], answer:0,
            explanation:"$H=-2\\times0.5\\log_2 0.5=-\\log_2 0.5=1$ bit。一様な2値分布なので不確実性は最大です。"
        },
        {
            id:"math-bayes", category:"応用数学・計算", kind:"手計算", difficulty:"難",
            question:"有病率1%、感度90%、偽陽性率5%の検査で陽性となった。実際に有病である確率に最も近いものはどれか。",
            options:["約15.4%", "90%", "約1.8%", "95%"], answer:0,
            explanation:"ベイズ則より $0.9\\times0.01/(0.9\\times0.01+0.05\\times0.99)=0.009/0.0585\\approx0.154$。感度の90%を事後確率と取り違えないこと。"
        },
        {
            id:"math-matrix-rank", category:"線形代数・計算", kind:"手計算", difficulty:"標準",
            question:"行列 $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ のランクはいくつか。",
            options:["1", "0", "2", "4"], answer:0,
            explanation:"第2行は第1行の2倍で独立ではありません。一方、非零行は存在するため独立な行（列）は1本、rankは1です。"
        },
        {
            id:"metric-micro-macro", category:"評価指標・計算", kind:"概念識別", difficulty:"難",
            question:"クラス数が極端に不均衡な多クラス分類で、少数クラスも同じ重みで評価したい。適切なのはどれか。",
            options:["各クラス指標を等重みで平均するmacro平均", "全サンプルのTP等を合算するmicro平均", "Accuracyのみ", "多数クラスだけのRecall"], answer:0,
            explanation:"macro平均はクラスごとの指標を計算して等重みで平均するため、少数クラスの性能も反映します。micro平均は件数の多いクラスの影響が強くなります。"
        },
        {
            id:"metric-perplexity", category:"評価指標・計算", kind:"手計算", difficulty:"新シラバス",
            question:"言語モデルの1トークン当たり平均クロスエントロピーが $\\ln 4$ のとき、パープレキシティはいくつか。",
            options:["4", "$\\ln4$", "2", "16"], answer:0,
            explanation:"パープレキシティは $PP=\\exp(H)$。したがって $\\exp(\\ln4)=4$。平均的に4択から迷っているような不確実性と解釈できます。"
        },
        {
            id:"dl-cross-entropy", category:"深層学習・数式", kind:"手計算", difficulty:"必須",
            question:"3クラス分類で予測確率が $[0.1,0.7,0.2]$、正解がクラス2（確率0.7）なら、1例のクロスエントロピーはいくつか（自然対数）。",
            options:["$-\\ln0.7\\approx0.357$", "$-\\ln0.1\\approx2.303$", "$1-0.7=0.3$", "$-\\ln0.2\\approx1.609$"], answer:0,
            explanation:"one-hot正解では正解クラスの項だけが残り、$L=-\\sum t_i\\ln p_i=-\\ln0.7\\approx0.357$ です。"
        },
        {
            id:"dl-ce-gradient", category:"深層学習・数式", kind:"数式理解", difficulty:"難",
            question:"Softmaxとクロスエントロピーを組み合わせたとき、ロジット $z_i$ に対する損失の勾配はどれか（one-hot正解を $t_i$、予測を $p_i$ とする）。",
            options:["$p_i-t_i$", "$t_i-p_i$", "$p_i(1-p_i)$", "$-t_i/p_i$"], answer:0,
            explanation:"Softmaxのヤコビアンと交差エントロピーの微分が整理され、$\\partial L/\\partial z_i=p_i-t_i$ になります。正解クラスでは負、過大予測した誤クラスでは正になり、更新方向が直感と一致します。"
        },
        {
            id:"dl-conv-output", category:"CNN・計算", kind:"手計算", difficulty:"必須",
            question:"入力 $32\\times32$、kernel=3、stride=2、padding=1、dilation=1 のConv2d出力の空間サイズはどれか。",
            options:["$16\\times16$", "$15\\times15$", "$17\\times17$", "$32\\times32$"], answer:0,
            explanation:"$\\lfloor(32+2-3)/2+1\\rfloor=\\lfloor16.5\\rfloor=16$。高さ・幅とも16です。"
        },
        {
            id:"dl-conv-dilation", category:"CNN・計算", kind:"手計算", difficulty:"難",
            question:"kernel=3、dilation=2 の1次元畳み込みにおける有効カーネル幅はいくつか。",
            options:["5", "6", "3", "7"], answer:0,
            explanation:"有効幅は $D(K-1)+1=2(3-1)+1=5$。要素位置は0,2,4となり、間隔は2でも端から端は5です。"
        },
        {
            id:"dl-conv-params", category:"CNN・計算", kind:"手計算", difficulty:"必須",
            question:"<code>Conv2d(3,16,kernel_size=3,bias=True)</code> の学習パラメータ数はいくつか。",
            options:["448", "432", "144", "464"], answer:0,
            explanation:"重みは $16\\times3\\times3\\times3=432$。出力チャネルごとのbiasが16個なので合計448です。"
        },
        {
            id:"dl-depthwise-cost", category:"CNN・計算", kind:"手計算", difficulty:"難",
            question:"入力・出力チャネルとも64、kernel=3の通常畳み込みと、depthwise 3x3 + pointwise 1x1の重み数（biasなし）の組として正しいものはどれか。",
            options:["通常36,864、分離4,672", "通常4,096、分離576", "通常36,864、分離4,096", "通常576、分離36,864"], answer:0,
            explanation:"通常は $64\\times64\\times9=36,864$。depthwiseは $64\\times9=576$、pointwiseは $64\\times64=4,096$、合計4,672です。"
        },
        {
            id:"dl-bn-ln-axis", category:"正規化・内部仕様", kind:"概念識別", difficulty:"必須",
            question:"系列テンソル $(N,L,D)$ に対する一般的なLayerNormとBatchNormの説明として正しいものはどれか。",
            options:["LayerNormは各トークンの特徴次元Dを正規化し、BatchNormは同じ特徴についてバッチ等から統計を取る", "両者とも常にNだけを正規化する", "LayerNormは学習時と推論時で移動平均を切り替える", "BatchNormはバッチサイズに依存しない"], answer:0,
            explanation:"LayerNormは各サンプル（Transformerでは各トークン）の特徴軸内で平均・分散を計算するためバッチ統計に依存しません。BatchNormはバッチ由来の統計と移動平均を使います。",
            trap:"「Layer」という名称から層数方向を正規化すると考えないこと。実装ではnormalized_shapeで末尾の特徴軸を指定します。"
        },
        {
            id:"dl-normalization-use", category:"正規化・内部仕様", kind:"概念識別", difficulty:"標準",
            question:"NLP/TransformerでBatchNormよりLayerNormが使われやすい主因はどれか。",
            options:["可変長系列や小さいバッチでも、各サンプル内の特徴統計で安定して正規化できるため", "LayerNormには学習パラメータが一切ないため", "LayerNormはAttentionの計算量を線形にするため", "BatchNormは画像に使用できないため"], answer:0,
            explanation:"系列長・パディング・バッチ構成でバッチ統計が不安定になりやすい一方、LayerNormは個々のサンプル内で完結します。どちらにも通常、学習可能なscaleとshiftがあります。"
        },
        {
            id:"dl-initialization", category:"最適化・数式", kind:"概念識別", difficulty:"標準",
            question:"ReLUを使う深いネットワークの重み初期化として最も対応が良いものはどれか。",
            options:["He/Kaiming初期化（分散の目安 $2/n_{in}$）", "Xavier初期化のみ（分散の目安 $1/n_{in}$）", "全て0", "非常に大きな定数"], answer:0,
            explanation:"ReLUは負側を0にするため、その分を補うHe初期化が適します。全重み0では対称性が破れず、各ユニットが同じ更新になります。"
        },
        {
            id:"dl-dropout-scale", category:"正則化・内部仕様", kind:"手計算", difficulty:"難",
            question:"PyTorchのDropout(p=0.2)を学習時に通し、残った活性値が10だった。inverted dropoutによる出力値はいくつか。",
            options:["12.5", "10", "8", "2"], answer:0,
            explanation:"保持確率は0.8。学習時に残った値を $1/(1-p)=1/0.8$ 倍するため $10/0.8=12.5$。これにより期待値を保ち、推論時は追加スケーリング不要です。"
        },
        {
            id:"transformer-routing", category:"Transformer・配線", kind:"図解識別", difficulty:"必須",
            question:"Encoder-Decoder TransformerのCross-Attentionで、Q・K・Vの入力元はどれか。",
            options:["QはDecoder側、KとVはEncoder出力", "Q,K,VすべてEncoder出力", "Q,K,VすべてDecoder側", "QとKはEncoder、VはDecoder"], answer:0,
            explanation:"Decoderの現在表現がQueryとなって、Encoderが作った入力系列のKey/Valueを検索します。矢印図ではEncoder最終出力からDecoderのCross-Attentionへ2本（K,V）入るのが目印です。"
        },
        {
            id:"transformer-self-cross", category:"Transformer・配線", kind:"概念識別", difficulty:"必須",
            question:"Self-AttentionとCross-Attentionを見分ける最も本質的な基準はどれか。",
            options:["Q,K,Vが同一系列由来か、QとK/Vが異なる系列由来か", "Softmaxを使うかどうか", "Multi-HeadかSingle-Headか", "位置符号を加えるかどうか"], answer:0,
            explanation:"Self-AttentionはQ/K/Vが同じ系列表現から作られます。Cross-AttentionはQueryとKey/Valueの情報源が異なります。どちらも通常SoftmaxとMulti-Head化を使えます。"
        },
        {
            id:"transformer-scaled-calc", category:"Transformer・計算", kind:"手計算", difficulty:"難",
            question:"1つのQueryに対する $QK^T=[2,0]$、$d_k=4$ とする。Softmaxへ入るスコアはどれか。",
            options:["$[1,0]$", "$[2,0]$", "$[0.5,0]$", "$[4,0]$"], answer:0,
            explanation:"$\\sqrt{d_k}=2$ なので $[2,0]/2=[1,0]$。その後Softmaxを取り、重みは約 $[0.731,0.269]$ です。"
        },
        {
            id:"transformer-mask", category:"Transformer・配線", kind:"内部仕様", difficulty:"標準",
            question:"自己回帰Decoderのcausal maskでは、参照禁止位置のAttentionロジットへ通常何を加えるか。",
            options:["$-\\infty$（実装では十分大きな負数）", "$+\\infty$", "0", "1"], answer:0,
            explanation:"Softmax前に大きな負数を加えると、その位置の指数が0となりAttention重みも0になります。0を加えるだけでは隠せません。"
        },
        {
            id:"transformer-mha-shape", category:"Transformer・計算", kind:"手計算", difficulty:"難",
            question:"$d_{model}=512$、head数8で各headへ等分すると、通常の $d_k$ はいくつか。",
            options:["64", "8", "512", "4096"], answer:0,
            explanation:"各headの次元は $512/8=64$。各headの出力を連結すると再び512次元になり、出力射影を適用します。"
        },
        {
            id:"transformer-shifted-window", category:"画像認識・新シラバス", kind:"概念識別", difficulty:"新シラバス",
            question:"Swin TransformerのShifted windowが解決する主な課題はどれか。",
            options:["前層と窓位置をずらし、固定窓をまたぐ情報交換を可能にする", "画像の明るさをランダムに変える", "未来トークンを隠す", "パッチ数を常に1にする"], answer:0,
            explanation:"Window attentionは計算を局所窓に限定して効率化しますが、固定窓だけでは窓間の接続が弱くなります。次の層で窓をシフトし、隣接窓のトークンを同じ窓で注意させます。"
        },
        {
            id:"llm-next-token", category:"LLM・新シラバス", kind:"概念識別", difficulty:"新シラバス",
            question:"GPT系のNext token predictionの学習目的として正しいものはどれか。",
            options:["それ以前のトークン列から次トークンの条件付き確率を最大化する", "文中のランダムなマスクだけを復元する", "次文が連続するかだけを分類する", "検索文書の順位だけを学習する"], answer:0,
            explanation:"自己回帰分解 $P(x_{1:T})=\\prod_tP(x_t|x_{<t})$ に基づき、各位置で次トークンの対数尤度を最大化（交差エントロピーを最小化）します。"
        },
        {
            id:"llm-rag", category:"LLM・新シラバス", kind:"概念識別", difficulty:"新シラバス",
            question:"RAGの典型的な処理順として正しいものはどれか。",
            options:["質問で外部文書を検索 → 関連文書を文脈に追加 → 生成", "生成 → 学習データを削除 → 検索", "全モデル重みを更新 → 検索 → 量子化", "質問を画像化 → 物体検出 → 生成"], answer:0,
            explanation:"Retrieval-Augmented Generationは、モデル外の知識ベースから関連情報を取得し、それをプロンプト文脈に与えて生成します。重み更新を伴うファインチューニングとは別です。"
        },
        {
            id:"pytorch-ce-logits", category:"PyTorch・内部仕様", kind:"コード判定", difficulty:"必須",
            question:"多クラス分類で <code>criterion = nn.CrossEntropyLoss()</code> を使う。モデルがcriterionへ渡すべき出力はどれか。",
            options:["Softmax前の未正規化logits", "Softmax後の確率", "argmax後のクラスID", "one-hot化した予測"], answer:0,
            explanation:"CrossEntropyLossは内部でLogSoftmaxとNLLLossを組み合わせます。事前にSoftmaxすると数値安定性を損ない、意図と異なる二重変換になります。",
            trap:"正解targetは通常shape (N) の整数クラスID（dtype long）。logitsはshape (N,C) です。"
        },
        {
            id:"pytorch-bce-logits", category:"PyTorch・内部仕様", kind:"コード判定", difficulty:"難",
            question:"2値分類で数値安定性を優先し、モデルの生logitを直接渡す損失はどれか。",
            options:["nn.BCEWithLogitsLoss()", "nn.BCELoss()", "nn.CrossEntropyLoss()にsigmoid後を渡す", "nn.MSELoss()"], answer:0,
            explanation:"BCEWithLogitsLossはSigmoidとBCEを数値安定に統合します。BCELossは確率入力を期待するため、別途Sigmoidが必要です。"
        },
        {
            id:"pytorch-eval-no-grad", category:"PyTorch・内部仕様", kind:"コード判定", difficulty:"必須",
            question:"推論時の <code>model.eval()</code> と <code>torch.no_grad()</code> の関係として正しいものはどれか。",
            options:["evalは層の挙動を切替え、no_gradは勾配記録を止めるため、通常は両方使う", "evalだけで勾配記録も止まる", "no_gradだけでDropoutが無効になる", "両者は完全に同じ"], answer:0,
            explanation:"<code>eval()</code>はDropoutとBatchNorm等を推論モードへ切り替えますがautogradは有効なまま。<code>no_grad()</code>は計算グラフ作成を止めますが層のtrainingフラグは変えません。"
        },
        {
            id:"pytorch-gradient-accum", category:"PyTorch・内部仕様", kind:"手計算", difficulty:"必須",
            question:"あるパラメータの <code>.grad</code> が3の状態で、リセットせず次の <code>backward()</code> が勾配5を計算した。新しい <code>.grad</code> はいくつか。",
            options:["8", "5", "3", "15"], answer:0,
            explanation:"PyTorchのbackwardは既存の.gradへ加算するため $3+5=8$。これは複数ミニバッチで意図的に勾配蓄積する場合に利用できます。"
        },
        {
            id:"pytorch-zero-order", category:"PyTorch・内部仕様", kind:"コード判定", difficulty:"標準",
            question:"標準的な1ミニバッチ更新で正しい主要順序はどれか。",
            options:["zero_grad → forward → loss → backward → step", "forward → step → backward → zero_grad", "zero_grad → step → loss → backward", "backward → forward → zero_grad → step"], answer:0,
            explanation:"前回勾配を消し、順伝播と損失計算、逆伝播、更新の順です。zero_gradは次のbackward前なら機能上可能ですが、この順が最も読みやすく安全です。"
        },
        {
            id:"pytorch-permute-view", category:"PyTorch・内部仕様", kind:"コード判定", difficulty:"難",
            question:"<code>y = x.permute(0,2,3,1)</code> の直後に安全に2次元へ変形したい。最も適切なのはどれか。",
            options:["y.reshape(y.size(0), -1)", "y.view(y.size(0), -1) が常に安全", "y.numpy().view(...)", "y.detach()だけ"], answer:0,
            explanation:"permute後はメモリが非連続になり得てviewが失敗します。reshapeは必要に応じてコピーします。別解は <code>y.contiguous().view(...)</code> です。"
        },
        {
            id:"pytorch-detach", category:"PyTorch・内部仕様", kind:"コード判定", difficulty:"難",
            question:"Tensorの値は共有しつつ、そのTensor以降を現在の計算グラフから切り離す操作はどれか。",
            options:["x.detach()", "x.clone()のみ", "x.eval()", "x.zero_grad()"], answer:0,
            explanation:"detachは同じストレージを共有する、requires_grad=FalseのTensorを返します。独立した保存コピーも必要なら <code>x.detach().clone()</code> を使います。"
        },
        {
            id:"pytorch-lstm-shape", category:"PyTorch・内部仕様", kind:"形状計算", difficulty:"必須",
            question:"2層・双方向LSTM、hidden_size=32、batch=8。<code>h_n</code> の形状はどれか（batch_first=Trueでも同じ）。",
            options:["(4,8,32)", "(8,4,32)", "(2,8,64)", "(8,2,32)"], answer:0,
            explanation:"形状は (num_layers × num_directions, batch, hidden_size)。$2\\times2=4$ なので (4,8,32) です。batch_firstは入力とoutputだけに影響します。"
        },
        {
            id:"pytorch-autograd-inplace", category:"PyTorch・内部仕様", kind:"コード判定", difficulty:"難",
            question:"autogradが逆伝播に必要な中間Tensorへin-place演算を行う主なリスクはどれか。",
            options:["必要な値やversionが変わり、逆伝播エラーや不正な勾配の原因になる", "必ずGPUメモリが2倍になる", "自動的に勾配が0になる", "モデルがevalモードになる"], answer:0,
            explanation:"末尾アンダースコアの演算などはTensorをその場で変更します。autogradが保存した値とversionが一致しなくなると、逆伝播時に検出されエラーになる場合があります。"
        },
        {
            id:"pytorch-train-bn", category:"PyTorch・内部仕様", kind:"概念識別", difficulty:"標準",
            question:"<code>model.train()</code> 時のBatchNorm2dの挙動として正しいものはどれか。",
            options:["現在のミニバッチ統計で正規化し、running統計も更新する", "running統計だけで正規化し更新しない", "チャネルをランダムに0にする", "勾配計算を停止する"], answer:0,
            explanation:"学習時はバッチ平均・分散を使用し、推論用running_mean/running_varを更新します。eval時は原則running統計を使用します。"
        },
        {
            id:"generative-ddpm", category:"生成モデル・識別", kind:"概念識別", difficulty:"必須",
            question:"DDPMの学習・生成の対応として正しいものはどれか。",
            options:["学習は加えたノイズ等を予測し、生成はノイズから反復的に除去する", "生成器と識別器を敵対させる", "潜在変数を使わず1回の線形変換で生成する", "検索文書を連結して生成する"], answer:0,
            explanation:"前向き過程でデータへ段階的にガウスノイズを加え、逆過程をニューラルネットで学習します。生成時はランダムノイズから多数ステップでデノイズします。"
        },
        {
            id:"generative-vae-elbo", category:"生成モデル・数式", kind:"数式理解", difficulty:"難",
            question:"VAEのELBOを最大化するときの2つの主要項はどれか。",
            options:["再構成対数尤度と、近似事後を事前分布へ近づけるKL項", "識別器損失と生成器損失", "TD誤差とエントロピー", "Attentionスコアと位置符号"], answer:0,
            explanation:"$ELBO=E_{q(z|x)}[\\log p(x|z)]-D_{KL}(q(z|x)||p(z))$。再構成品質と潜在空間の正則化を両立します。"
        },
        {
            id:"generative-gan-ddpm", category:"生成モデル・識別", kind:"概念識別", difficulty:"必須",
            question:"GANとDDPMの違いとして最も適切なものはどれか。",
            options:["GANは生成器・識別器の敵対学習、DDPMは拡散の逆過程を学ぶ", "両者とも必ずEncoderとDecoderだけで構成される", "DDPMだけが識別器を必須とする", "GANは常に尤度を厳密計算できる"], answer:0,
            explanation:"GANはminimaxの敵対学習で高速な1回生成が可能な一方、mode collapse等が課題。DDPMは反復生成で遅い傾向がありますが、高品質で学習が比較的安定です。"
        },
        {
            id:"rl-q-sarsa", category:"強化学習・計算", kind:"更新式識別", difficulty:"必須",
            question:"Q学習とSarsaのTDターゲットの違いとして正しいものはどれか。",
            options:["Q学習は次状態のmax Q、Sarsaは実際の方策で選んだ次行動のQ", "Sarsaだけが報酬を使う", "Q学習は状態価値しか使えない", "両者は常に同じターゲット"], answer:0,
            explanation:"Q学習は $r+\\gamma\\max_{a'}Q(s',a')$ のoff-policy。Sarsaは $r+\\gamma Q(s',a')$ で、行動方策が実際に選んだ $a'$ を使うon-policyです。"
        },
        {
            id:"xai-integrated-gradients", category:"XAI・新シラバス", kind:"概念識別", difficulty:"新シラバス",
            question:"Integrated Gradientsの説明として正しいものはどれか。",
            options:["ベースラインから入力までの経路上で入力勾配を積分し、特徴寄与を求める", "最終畳み込み特徴マップだけを平均する", "モデルを決定木1本で完全再現する", "学習データをクラスタリングする"], answer:0,
            explanation:"ベースライン $x'$ から入力 $x$ までを補間し、勾配を積分して $(x-x')$ を掛けます。寄与の総和が概ね出力差 $F(x)-F(x')$ になるcompletenessが重要です。"
        },
        {
            id:"xai-gradcam-ig", category:"XAI・識別", kind:"概念識別", difficulty:"難",
            question:"Grad-CAMとIntegrated Gradientsの典型的な違いとして正しいものはどれか。",
            options:["Grad-CAMは畳み込み特徴マップから粗い空間重要度、IGは入力特徴ごとの寄与を求められる", "IGはCNNにしか使えない", "Grad-CAMは勾配を一切使わない", "両者はモデル非依存の同一手法"], answer:0,
            explanation:"Grad-CAMは対象クラス勾配で特徴マップを重み付けしてヒートマップ化します。IGは微分可能モデルに対し、基準入力からの経路積分で入力次元の寄与を出します。"
        },
        {
            id:"audio-nyquist", category:"音声処理・計算", kind:"手計算", difficulty:"新シラバス対応",
            question:"最大8kHzの周波数成分を含む信号をエイリアシングなく標本化する理論上の最低サンプリング周波数はどれか。",
            options:["16kHz", "8kHz", "4kHz", "64kHz"], answer:0,
            explanation:"サンプリング定理より最高周波数の2倍以上が必要なので16kHz。実システムではフィルタの遷移帯域を考え、余裕を持たせます。"
        }
    ]
};
