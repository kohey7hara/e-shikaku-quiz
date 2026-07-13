window.quizData = {
    title: "合格圏ブートキャンプ 2026",
    cheatSheet: `
        <p><strong>このページの使い方：</strong>数式を丸暗記する必要はありません。最初に略語を日本語へ直し、次に数字を式へ1つずつ入れ、最後に答えの意味を確認します。以下は「初めて見ても計算できる」順番で書いてあります。</p>

        <h3>0. 最初に覚える略語</h3>
        <table>
          <tr><th>略語</th><th>日本語での意味</th><th>イメージ</th></tr>
          <tr><td><strong>TP</strong><br>True Positive</td><td>本当は正例で、予測も正例</td><td>病気の人を「病気」と当てた</td></tr>
          <tr><td><strong>FN</strong><br>False Negative</td><td>本当は正例なのに、予測は負例</td><td>病気の人を見逃した</td></tr>
          <tr><td><strong>FP</strong><br>False Positive</td><td>本当は負例なのに、予測は正例</td><td>健康な人を「病気」と誤判定した</td></tr>
          <tr><td><strong>TN</strong><br>True Negative</td><td>本当は負例で、予測も負例</td><td>健康な人を「健康」と当てた</td></tr>
          <tr><td><strong>PP</strong><br>Perplexity</td><td>パープレキシティ。言語モデルの迷いの大きさ</td><td>PP=4なら、平均的に4択で迷う程度</td></tr>
          <tr><td><strong>Q / K / V</strong></td><td>Query（質問）/ Key（索引）/ Value（中身）</td><td>質問Qに合う索引Kを探し、その中身Vを取り出す</td></tr>
        </table>

        <h3>1. Softmax：点数を確率へ変える</h3>
        <p><strong>ロジット</strong>は、モデルが各クラスへ付けた変換前の点数です。Softmaxは各点数を指数関数で正の値にし、合計が1になるよう割ります。</p>
        <ol>
          <li>最大の点数を全要素から引く。例：<code>[0,100,100] → [-100,0,0]</code></li>
          <li>指数を取る。<code>[e^-100, 1, 1] ≒ [0,1,1]</code></li>
          <li>合計2で割る。答えは <code>[0,0.5,0.5]</code></li>
        </ol>
        <p>最大値を引くのは巨大な数を作らないためです。全要素から同じ数を引いても確率は変わりません。</p>

        <h3>2. 自己情報量：珍しい出来事ほど情報が大きい</h3>
        <p>式は $I(x)=-\\log_2 P(x)$ です。$P(x)$ はその出来事の確率です。底が2なので単位はbitになります。</p>
        <ol>
          <li>まず出来事が何通りあるか数える。</li>
          <li>「該当する通り数 ÷ 全通り数」で確率を出す。</li>
          <li>その確率を $-\\log_2$ へ入れる。</li>
        </ol>
        <p>例：コイン3回で表が2回なら、表表裏・表裏表・裏表表の3通り。全8通りなので確率は3/8です。</p>

        <h3>3. 混同行列：分母を日本語で決める</h3>
        <p><strong>TPR（真陽性率・再現率）</strong>は「本当の正例を何割見つけたか」。したがって分母は本当の正例である <code>TP+FN</code> です。</p>
        <p>$TPR=TP/(TP+FN)$</p>
        <p><strong>FPR（偽陽性率）</strong>は「本当の負例を何割、正例と誤判定したか」。分母は本当の負例である <code>FP+TN</code> です。</p>
        <p>$FPR=FP/(FP+TN)$</p>

        <h3>4. コサイン類似度：向きがどれくらい近いか</h3>
        <ol>
          <li>内積 $a\\cdot b$ を計算する。</li>
          <li>それぞれの長さ $\\|a\\|$ と $\\|b\\|$ を計算する。</li>
          <li>内積を「2つの長さの積」で割る。</li>
        </ol>
        <p>答えは-1〜1です。1に近いほど同じ向き、0なら直角、-1なら逆向きです。</p>

        <h3>5. CNNの出力サイズ：記号を先に翻訳する</h3>
        <table>
          <tr><th>記号</th><th>意味</th></tr>
          <tr><td>H</td><td>入力の高さ</td></tr><tr><td>K</td><td>カーネルの大きさ</td></tr>
          <tr><td>P</td><td>周囲へ追加する余白（padding）</td></tr><tr><td>S</td><td>何マスずつ動かすか（stride）</td></tr>
          <tr><td>D</td><td>カーネル要素の間隔（dilation）</td></tr>
        </table>
        <p>出力は $\\lfloor(H+2P-D(K-1)-1)/S+1\\rfloor$。床記号 $\\lfloor x\\rfloor$ は小数点以下を切り捨てる意味です。</p>
        <p>例：H=32、K=3、P=1、S=2、D=1なら、$(32+2-2-1)/2+1=16.5$ を切り捨てて16です。</p>

        <h3>6. Attention：質問に近い情報を集める</h3>
        <p>式は $softmax(QK^T/\\sqrt{d_k})V$ ですが、4段階に分ければ大丈夫です。</p>
        <ol>
          <li>Q（質問）と各K（索引）の内積を取り、似ている度合いを出す。</li>
          <li>$\\sqrt{d_k}$ で割り、値が極端に大きくなるのを防ぐ。</li>
          <li>Softmaxで合計1の重みにする。</li>
          <li>その重みでV（中身）を加重平均する。</li>
        </ol>
        <p>Cross-Attentionでは、QはDecoder側、KとVはEncoderの出力です。</p>

        <h3>7. パープレキシティ：言語モデルがどれくらい迷うか</h3>
        <p><strong>PPはPerplexity（パープレキシティ）の略</strong>です。1トークン当たり平均クロスエントロピーをHとすると、$PP=\\exp(H)$ です。</p>
        <ol>
          <li>問題のHを確認する。例：$H=\\ln(4)$</li>
          <li>式へ入れる。$PP=\\exp(\\ln(4))$</li>
          <li>$\\exp$ と $\\ln$ は互いに打ち消すので、$PP=4$</li>
        </ol>
        <p>PPは小さいほど良く、1が理想です。PP=4は「平均的に4個の候補で迷っている」感覚です。</p>

        <h3>8. PyTorchで混同しやすい組合せ</h3>
        <ul>
          <li><code>CrossEntropyLoss</code>へ渡すのはSoftmax前の点数（logits）。Softmaxと対数計算は損失関数の内部で行われます。</li>
          <li><code>model.eval()</code>はDropoutやBatchNormを推論用へ切り替えます。<code>torch.no_grad()</code>は勾配の記録を止めます。役割が違うので推論では通常両方使います。</li>
          <li><code>backward()</code>は勾配を上書きせず加算します。通常は各更新の前に<code>zero_grad()</code>で前回分を消します。</li>
          <li><code>permute()</code>後はデータの並びが非連続になる場合があります。安全に形を変えるなら<code>reshape()</code>、または<code>contiguous().view()</code>を使います。</li>
        </ul>
        <h3>9. 図表・長文問題の読み方</h3>
        <ol>
          <li><strong>最後の一文を先に読む：</strong>何を答える問題かを確定します。</li>
          <li><strong>図へ日本語を書き足す：</strong>矢印は「何が、どこから、どこへ」を表すか確認します。</li>
          <li><strong>使う数字だけ丸で囲む：</strong>飾りの条件と計算に必要な条件を分けます。</li>
          <li><strong>各選択肢を図へ戻す：</strong>用語の印象ではなく、図の流れと矛盾しないかで消去します。</li>
        </ol>
        <p>この後半には、本試験を想定した図解付き長文問題があります。最初は時間を測らず、図の矢印へQ・K・Vやテンソル形状を書き込んでください。</p>
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
            question:"2つの事象A、Bがそれぞれ確率0.5で起こる。エントロピー（底2）はいくつか。",
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
            options:["ベースラインから入力までの経路上で入力勾配を積分し、特徴寄与を求める", "最終畳み込み特徴マップだけを平均する", "モデルの全重みを量子化する", "正解ラベルの個数だけを数える"], answer:0,
            explanation:"ベースライン $x'$ から入力 $x$ までを補間し、勾配を積分して $(x-x')$ を掛けます。寄与の総和が概ね出力差 $F(x)-F(x')$ になるcompletenessが重要です。"
        },
        {
            id:"xai-gradcam-ig", category:"XAI・識別", kind:"概念識別", difficulty:"難",
            question:"Grad-CAMとIntegrated Gradientsの典型的な違いとして正しいものはどれか。",
            options:["Grad-CAMは畳み込み特徴マップから粗い空間重要度、IGは入力特徴ごとの寄与を求められる", "IGはCNNにしか使えない", "Grad-CAMは勾配を一切使わない", "両者はモデル非依存の同一手法"], answer:0,
            explanation:"Grad-CAMは対象クラス勾配で特徴マップを重み付けしてヒートマップ化します。IGは微分可能モデルに対し、基準入力からの経路積分で入力次元の寄与を出します。"
        }
    ]
};

const bootcampBeginnerExplanations = {
    "math-softmax-extreme": `<p><strong>まず用語：</strong>ロジットは、Softmaxへ入れる前の「各クラスの点数」です。</p><ol><li>最大値100を全要素から引き、[0,100,100]を[-100,0,0]にします。</li><li>指数を取ると[e^-100,1,1]です。e^-100はほぼ0なので、[0,1,1]と考えられます。</li><li>合計2で割ると[0,0.5,0.5]です。</li></ol><p>後ろ2つは同じ点数なので、確率を半分ずつ分け合います。</p>`,
    "math-softmax-shift": `<p>Softmaxでは各要素の指数を合計で割ります。全要素へ同じ定数cを足すと、各指数には同じ倍率e^cが掛かります。</p><p>分子と分母の両方にe^cがあるため約分され、確率は変わりません。これを利用して最大ロジットを引くと、計算結果を変えずに巨大な指数値を防げます。</p>`,
    "math-information-combination": `<p><strong>自己情報量</strong>は「その出来事がどれほど珍しいか」を表し、珍しいほど大きくなります。</p><ol><li>表が2回の並びは、表表裏・表裏表・裏表表の3通りです。</li><li>コイン3回の全結果は2×2×2=8通りなので、確率は3/8です。</li><li>I=-log2(3/8)=log2(8/3)≒1.42 bitです。</li></ol><p>「表表裏」だけを数えて1/8にしないことがポイントです。</p>`,
    "math-cosine": `<p>コサイン類似度は、ベクトルの大きさではなく<strong>向きの近さ</strong>を-1〜1で測ります。</p><ol><li>内積：1×2+2×1=4</li><li>aの長さ：√(1²+2²)=√5、bの長さも√5</li><li>4÷(√5×√5)=4÷5=0.8</li></ol><p>内積4だけで終わらず、必ず2つの長さで割ります。</p>`,
    "math-confusion": `<p><strong>TPR（True Positive Rate・真陽性率）</strong>は、本当の正例50件（TP+FN=40+10）のうち40件を見つけた割合です。40÷50=0.80です。</p><p><strong>FPR（False Positive Rate・偽陽性率）</strong>は、本当の負例50件（FP+TN=15+35）のうち15件を誤って正例にした割合です。15÷50=0.30です。</p><p>分母を「本当の正例」「本当の負例」と日本語で書くと混乱しません。</p>`,
    "math-entropy": `<p>エントロピーは、結果がどれほど予測しにくいかを表す平均情報量です。</p><p>H=-(0.5×log2 0.5+0.5×log2 0.5)。log2 0.5=-1なので、H=-(-0.5-0.5)=1 bitです。</p><p>2つが同じ確率のとき最も迷うため、2択のエントロピーは最大の1 bitになります。</p>`,
    "math-bayes": `<p>感度90%を、そのまま「陽性なら病気である確率」としてはいけません。最初の有病率1%も使います。</p><p>1万人で考えると、病気100人のうち陽性は90人。健康9,900人のうち偽陽性は495人です。陽性者は合計585人なので、本当に病気なのは90÷585≒0.154、約15.4%です。</p><p>人数へ置き換えると、ベイズ則の分母を作りやすくなります。</p>`,
    "metric-micro-macro": `<p><strong>macro平均</strong>は、まずクラスごとに指標を出し、それらを同じ重みで平均します。そのため件数の少ないクラスも1クラスとして平等に扱われます。</p><p><strong>micro平均</strong>は全クラスのTPなどを先に合計するため、件数の多いクラスの影響が強くなります。少数クラスも重視したい本問ではmacro平均が適切です。</p>`,
    "metric-perplexity": `<p><strong>PPはPerplexity（パープレキシティ）の略</strong>で、言語モデルが次のトークン選びでどれくらい迷っているかを表します。</p><ol><li>平均クロスエントロピーをHとすると、PP=exp(H)です。</li><li>H=ln(4)を代入して、PP=exp(ln(4))。</li><li>expとlnは互いに逆の演算なので、exp(ln(4))=4です。</li></ol><p>PP=4は「平均的に4個ほどの候補で迷う」程度と解釈できます。小さいほど良く、理想値は1です。</p>`,
    "dl-cross-entropy": `<p>クロスエントロピーは、正解クラスへモデルがどれだけ高い確率を付けたかを損失にします。</p><p>one-hotとは正解だけが1、他が0の教師ラベルです。そのため式L=-Σ t_i ln(p_i)では正解クラスの項だけ残り、L=-ln(0.7)≒0.357です。</p><p>正解確率が1へ近づくほど損失は0へ近づきます。</p>`,
    "dl-ce-gradient": `<p>Softmaxとクロスエントロピーを組み合わせると、複雑な微分が整理され、各ロジットの勾配は<strong>予測p_i－正解t_i</strong>になります。</p><p>例えば正解クラスでp=0.7、t=1なら勾配は-0.3です。勾配降下ではこのロジットを上げる方向へ更新されます。誤クラスでp=0.2、t=0なら+0.2となり、そのロジットを下げます。</p>`,
    "dl-conv-output": `<p>記号は入力H=32、余白P=1、カーネルK=3、移動幅S=2、間隔D=1です。</p><p>出力=⌊(H+2P-D(K-1)-1)/S+1⌋へ入れると、⌊(32+2-2-1)/2+1⌋=⌊16.5⌋=16です。</p><p>⌊ ⌋は小数点以下を切り捨てる記号です。高さと幅が同じ条件なので16×16になります。</p>`,
    "dl-conv-dilation": `<p>dilationは、カーネル要素を何マス間隔で置くかを表します。K=3、D=2なら要素を置く位置は0、2、4です。</p><p>端の位置0から4までを含む幅は5なので、有効幅はD(K-1)+1=2×2+1=5です。「3要素×間隔2=6」ではありません。</p>`,
    "dl-conv-params": `<p>Conv2dの重みは<strong>出力チャネル数×入力チャネル数×高さ×幅</strong>です。</p><p>16×3×3×3=432個。bias=Trueなので、出力16チャネルそれぞれにバイアスが1個ずつあり16個を足します。432+16=448個です。</p>`,
    "dl-depthwise-cost": `<p>通常畳み込みは各出力チャネルが全入力チャネルを見るため、64×64×3×3=36,864個です。</p><p>Depthwise畳み込みは各入力チャネルを別々に処理するので64×3×3=576個。Pointwiseの1×1畳み込みでチャネルを混ぜる重みは64×64=4,096個です。</p><p>合計576+4,096=4,672個となり、通常畳み込みより大幅に減ります。</p>`,
    "dl-bn-ln-axis": `<p>Nはバッチ数、Lは系列長、Dは各トークンの特徴数です。</p><p>Layer Normalizationは、1つのトークンが持つD個の特徴の中で平均・分散を計算します。Batch Normalizationは同じ特徴について、主にバッチN方向の複数標本から統計を計算します。</p><p>LayerNormはバッチ内の他サンプルに依存しない点が重要です。</p>`,
    "dl-normalization-use": `<p>文章は長さが違い、paddingの量も変わります。さらに大規模モデルでは小さいバッチで学習することも多く、BatchNormのバッチ統計が安定しにくくなります。</p><p>LayerNormは各トークン自身の特徴Dだけで正規化できるため、系列長やバッチサイズが変わっても使いやすいのです。どちらも通常、学習可能な拡大係数と平行移動係数を持ちます。</p>`,
    "dl-initialization": `<p>n_inは、その層へ入ってくる入力数です。ReLUは負の入力を0にするため、およそ半分の信号が消えます。</p><p>He（Kaiming）初期化は重みの分散を約2/n_inにして、その減少を補い、層を重ねても信号や勾配が極端に小さくなりにくくします。全重みを0にすると全ユニットが同じ動きになり学習できません。</p>`,
    "dl-dropout-scale": `<p>p=0.2は20%を捨てるという意味なので、残す確率は1-p=0.8です。</p><p>PyTorchのinverted dropoutは、学習時に残った値を1/0.8倍して平均的な大きさを保ちます。したがって10÷0.8=12.5です。</p><p>学習時に補正済みなので、推論時に改めて0.8倍する必要はありません。</p>`,
    "transformer-routing": `<p>QはQuery（質問）、KはKey（検索用の索引）、VはValue（取り出す中身）です。</p><p>Decoderは「今の生成状態に必要な入力情報は何か」をQとして問い合わせます。Encoder出力からKとVを作り、Qに近いKのVを取り出します。</p><p>したがってCross-AttentionではQがDecoder側、KとVがEncoder側です。</p>`,
    "transformer-self-cross": `<p>Attentionの種類は、Q・K・Vを<strong>どこから作ったか</strong>で見分けます。</p><p>Self-AttentionはQ・K・Vがすべて同じ系列由来です。Cross-AttentionはQとK/Vが別の系列由来です。Softmax、Multi-Head、位置情報の有無だけでは両者を区別できません。</p>`,
    "transformer-scaled-calc": `<p>d_kはKeyベクトル1本の次元数です。内積の値が次元とともに大きくなりすぎないよう、Softmaxの前に√d_kで割ります。</p><p>√4=2なので、[2,0]÷2=[1,0]です。その後Softmaxを取ると、およそ[0.731,0.269]の重みになります。</p>`,
    "transformer-mask": `<p>自己回帰Decoderは文章を左から右へ作るため、現在位置から未来の正解を見てはいけません。</p><p>参照禁止位置の点数へ-∞に近い大きな負数を足すと、指数exp(-∞)が0になり、Softmax後の重みも0になります。0を足すだけでは元の点数が残るので隠せません。</p>`,
    "transformer-mha-shape": `<p>Multi-Head Attentionでは、モデル全体の特徴512次元を8個のheadへ等分します。</p><p>512÷8=64なので、各headのQ・K・Vは通常64次元です。8個の出力を横に連結すると64×8=512次元へ戻ります。</p>`,
    "transformer-shifted-window": `<p>Swin Transformerは画像を小さな窓に分け、窓の中だけでAttentionを計算して計算量を抑えます。</p><p>ただし毎層同じ窓では、窓の境界を越えて情報が伝わりにくくなります。次の層で窓位置をずらすShifted Windowにより、前の層では別窓だった領域を同じ窓で結び付けます。</p>`,
    "llm-next-token": `<p>GPTは文章を左から右へ読み、それまでのトークンから次の1トークンを予測します。これをNext Token Predictionと呼びます。</p><p>各位置で正解トークンの確率を高くする、つまりクロスエントロピーを小さくするよう学習します。文中をランダムに隠して復元するMLMとは目的が異なります。</p>`,
    "llm-rag": `<p>RAGは<strong>Retrieval-Augmented Generation（検索拡張生成）</strong>の略です。</p><ol><li>質問に関係する文書を外部データベースから検索します。</li><li>見つけた文書を質問と一緒にプロンプトへ入れます。</li><li>言語モデルがその文脈を使って回答を生成します。</li></ol><p>モデルの重みを更新するファインチューニングとは別の仕組みです。</p>`,
    "pytorch-ce-logits": `<p>logits（ロジット）は、Softmax前の各クラスの生の点数です。</p><p><code>CrossEntropyLoss</code>は内部でLogSoftmax（確率化して対数を取る処理）とNLLLoss（正解クラスの負の対数を取る損失）を行います。そのためモデル側で先にSoftmaxせず、shape (N,C) のlogitsをそのまま渡します。</p>`,
    "pytorch-bce-logits": `<p>BCEはBinary Cross Entropy（二値交差エントロピー）の略です。</p><p><code>BCEWithLogitsLoss</code>はSigmoidとBCEを1つにまとめ、非常に大きい・小さいlogitでも安定して計算します。<code>BCELoss</code>は0〜1の確率を受け取るので、使うなら別途Sigmoidが必要です。</p>`,
    "pytorch-eval-no-grad": `<p><code>model.eval()</code>はモデルの運転モードを推論用へ変えます。Dropoutを止め、BatchNormは保存済み統計を使いますが、勾配の記録自体は続きます。</p><p><code>torch.no_grad()</code>は計算グラフを作らず、勾配記録を止めてメモリを節約しますが、層のモードは変えません。推論では役割の異なる両方を使います。</p>`,
    "pytorch-gradient-accum": `<p>PyTorchの<code>backward()</code>は、<code>.grad</code>を上書きせず加算します。</p><p>すでに3が入っているところへ新しい勾配5を計算すると、3+5=8です。通常の各ミニバッチ更新では事前に<code>zero_grad()</code>で消しますが、意図的に複数回分をためる勾配蓄積ではこの仕様を利用します。</p>`,
    "pytorch-zero-order": `<p>1回の更新は次の順です。</p><ol><li><code>zero_grad</code>：前回の勾配を消す</li><li><code>forward</code>：入力から予測を計算する</li><li><code>loss</code>：予測と正解のずれを測る</li><li><code>backward</code>：各重みの勾配を計算する</li><li><code>step</code>：勾配を使って重みを更新する</li></ol><p><code>step</code>を<code>backward</code>より先には実行できません。</p>`,
    "pytorch-permute-view": `<p><code>permute</code>は軸の見え方を入れ替えますが、メモリ上の実際の並びを移動しないため、非連続になる場合があります。</p><p><code>view</code>は連続した並びを前提とするので失敗することがあります。<code>reshape</code>は必要ならコピーを作るため安全です。別解は<code>y.contiguous().view(...)</code>です。</p>`,
    "pytorch-detach": `<p>autogradは計算のつながりを記録し、逆伝播で勾配を流します。<code>detach()</code>は値を保ったまま、その地点で計算グラフとのつながりを切ったTensorを返します。</p><p>元Tensorと同じストレージを共有するため、完全に独立したコピーも欲しい場合は<code>x.detach().clone()</code>を使います。</p>`,
    "pytorch-lstm-shape": `<p><code>h_n</code>は各層・各方向の最後の隠れ状態を持ち、形状は<strong>(層数×方向数, バッチ数, hidden_size)</strong>です。</p><p>2層、双方向なので2×2=4。batch=8、hidden_size=32を続けて、(4,8,32)です。<code>batch_first=True</code>は入力と時系列outputの軸順だけを変え、h_nには影響しません。</p>`,
    "pytorch-autograd-inplace": `<p>in-place演算は、末尾が<code>_</code>の演算など、同じTensorの中身をその場で書き換える処理です。</p><p>autogradは逆伝播用に中間値とversion番号を保存しています。必要な値を途中で書き換えると、計算時の値と合わなくなり、エラーや誤った勾配の原因になります。</p>`,
    "pytorch-train-bn": `<p>BatchNormは学習中、現在のミニバッチから平均と分散を計算して正規化します。同時に、推論時に使うrunning_meanとrunning_varも少しずつ更新します。</p><p><code>model.eval()</code>へ切り替えると、原則として現在のバッチではなく、この保存済みrunning統計を使います。Dropoutのようにチャネルをランダムに0にはしません。</p>`,
    "generative-ddpm": `<p>DDPMは<strong>Denoising Diffusion Probabilistic Model（ノイズ除去拡散確率モデル）</strong>の略です。</p><p>学習では、画像へ段階的にノイズを加え、各段階で加えたノイズなどをニューラルネットに予測させます。生成では完全なランダムノイズから始め、予測したノイズを少しずつ除いて画像へ戻します。</p>`,
    "generative-vae-elbo": `<p>VAEはVariational Autoencoder（変分オートエンコーダ）、ELBOはEvidence Lower Bound（周辺尤度の下限）の略です。</p><p>第1項は<strong>再構成</strong>で、入力をどれだけ元通りに作れたかを評価します。第2項のKLダイバージェンスは、Encoderが作る潜在分布を事前分布へ近づけ、潜在空間を整えます。</p><p>つまり「きれいに復元する」と「潜在空間をばらばらにしない」の両方を最適化します。</p>`,
    "generative-gan-ddpm": `<p>GANはGenerative Adversarial Network（敵対的生成ネットワーク）で、偽物を作るGeneratorと見破るDiscriminatorを競わせます。</p><p>DDPMは識別器との対戦ではなく、ノイズを加える過程の逆向きを学びます。GANは少ない回数で高速生成しやすい一方、mode collapse（似た出力ばかりになる現象）が課題です。DDPMは反復回数が多いものの学習が比較的安定しています。</p>`,
    "rl-q-sarsa": `<p>TDターゲットは「今のQ値が近づくべき目標値」です。どちらも即時報酬rと、割引率γを掛けた次状態のQ値を使います。</p><p>Q学習は次状態で最大のQ値を使うため、実際に取る行動とは別の最良行動を学ぶoff-policyです。Sarsaは実際の方策が選んだ次行動a'のQ値を使うon-policyです。</p>`,
    "xai-integrated-gradients": `<p>Integrated Gradients（積分勾配法）は、入力の各特徴が予測へどれだけ貢献したかを求める説明手法です。</p><p>まず黒画像などの基準入力（baseline）を決め、そこから実入力まで少しずつ変化させます。その道中の勾配を平均し、入力との差を掛けます。各特徴の寄与を合計すると、おおむね実入力とbaselineの出力差になる性質があります。</p>`,
    "xai-gradcam-ig": `<p>Grad-CAMは主にCNNの最後の畳み込み特徴マップを使い、「画像のどの辺を見たか」を粗いヒートマップで示します。</p><p>Integrated Gradients（IG）はbaselineから実入力までの勾配を積分し、入力画素や入力特徴ごとの寄与を求めます。Grad-CAMはCNNの空間位置に強く、IGは微分可能な幅広いモデルへ使える、という違いです。</p>`
};

const bootcampBeginnerQuestionUpdates = {
    "math-confusion": {
        question: "TP（真陽性）=40、FN（偽陰性）=10、FP（偽陽性）=15、TN（真陰性）=35のとき、TPR（真陽性率）とFPR（偽陽性率）の組はどれか。"
    },
    "metric-perplexity": {
        question: "言語モデルの1トークン当たり平均クロスエントロピーHが ln(4) のとき、パープレキシティPPはいくつか。",
        options: ["4", "ln(4)（約1.386）", "2", "16"]
    },
    "dl-conv-output": {
        question: "入力32×32、kernel（カーネル）=3、stride（移動幅）=2、padding（余白）=1、dilation（間隔）=1のConv2d出力サイズはどれか。"
    },
    "dl-conv-dilation": {
        question: "kernel（カーネル）=3、dilation（要素間隔）=2の1次元畳み込みで、端から端までの有効カーネル幅はいくつか。"
    },
    "dl-bn-ln-axis": {
        trap: "LayerNormのLayerは『層数の方向』という意味ではありません。PyTorchのnormalized_shapeは、各データの末尾にある特徴軸Dなど、どの範囲で平均・分散を取るかを指定します。"
    },
    "transformer-routing": {
        question: "Encoder-Decoder TransformerのCross-Attentionで、Q（Query）、K（Key）、V（Value）の入力元はどれか。"
    },
    "transformer-scaled-calc": {
        question: "1つのQueryに対する内積スコアQK^Tが[2,0]、Keyの次元数d_kが4である。Softmaxへ入れる直前のスコアはどれか。"
    },
    "transformer-mask": {
        question: "文章を左から順に生成する自己回帰Decoderのcausal maskでは、未来の参照禁止位置のAttentionロジットへ通常何を加えるか。"
    },
    "transformer-mha-shape": {
        question: "モデル全体の特徴次元d_modelが512、Multi-Head Attentionのhead数が8で、各headへ等分する。各headのKey次元d_kはいくつか。"
    },
    "llm-rag": {
        question: "RAG（Retrieval-Augmented Generation・検索拡張生成）の典型的な処理順として正しいものはどれか。"
    },
    "pytorch-ce-logits": {
        trap: "Nは1回に処理するデータ数、Cはクラス数です。logitsは(N,C)の実数の点数、正解targetは通常(N)の整数クラス番号で、PyTorchではlong型を使います。"
    },
    "pytorch-bce-logits": {
        question: "2値分類で、Sigmoid前の生の点数（logit）を直接渡せて数値的にも安定した損失関数はどれか。"
    },
    "rl-q-sarsa": {
        question: "Q学習とSarsaで、TDターゲット（現在のQ値が近づく目標値）の違いとして正しいものはどれか。"
    },
    "generative-ddpm": {
        question: "DDPM（ノイズ除去拡散確率モデル）の学習と生成の対応として正しいものはどれか。"
    },
    "generative-vae-elbo": {
        question: "VAE（変分オートエンコーダ）でELBO（周辺尤度の下限）を最大化するとき、主要な2項はどれか。"
    },
    "generative-gan-ddpm": {
        question: "GAN（敵対的生成ネットワーク）とDDPM（ノイズ除去拡散確率モデル）の違いとして最も適切なものはどれか。"
    },
    "xai-integrated-gradients": {
        question: "Integrated Gradients（積分勾配法）の説明として正しいものはどれか。"
    },
    "xai-gradcam-ig": {
        question: "Grad-CAMとIntegrated Gradients（IG・積分勾配法）の典型的な違いとして正しいものはどれか。"
    }
};

window.quizData.questions.forEach(question => {
    question.explanation = bootcampBeginnerExplanations[question.id];
    question.beginnerReviewed = true;
    if (bootcampBeginnerQuestionUpdates[question.id]) Object.assign(question, bootcampBeginnerQuestionUpdates[question.id]);
});

const bootcampVisualQuestions = [
    {
        id: "visual-transformer-routing", category: "Transformer", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">次の図はEncoder-Decoder TransformerのDecoder側を簡略化したものである。Cross-Attentionへ入るXとして正しいものを選べ。</div><div class="exam-figure"><span class="figure-title">Cross-Attentionの入力経路</span><div class="diagram-row"><div class="diagram-node primary">Encoderの出力</div><div class="diagram-arrow">→</div><div class="diagram-node">K・V</div><div class="diagram-arrow">↘</div><div class="diagram-node accent">Cross-Attention</div></div><div class="diagram-row"><div class="diagram-node primary">Decoderの現在の表現</div><div class="diagram-arrow">→</div><div class="diagram-node warn">X</div><div class="diagram-arrow">↗</div></div><p class="figure-caption">Qは「何を探すか」、Kは「検索用の見出し」、Vは「取り出す内容」と考える。</p></div>`,
        options: ["Query（Q）", "Key（K）", "Value（V）", "位置エンコーディングだけ"], answer: 0,
        explanation: `<p><strong>正解はQuery（Q）です。</strong></p><p>Decoderは「今ほしい情報」をQとして出し、Encoderの出力をK・Vとして検索します。したがって配線は、<strong>Decoder→Q、Encoder→KとV</strong>です。</p><ol class="step-list"><li>Cross-Attentionでは、異なる場所から入力が来ます。</li><li>質問する側がDecoderなのでQです。</li><li>元文の情報を持つEncoderがK・Vです。</li></ol><p><strong>ひっかけ：</strong>Self-AttentionならQ・K・Vは同じ系列から作ります。</p>`
    },
    {
        id: "visual-residual-projection", category: "CNN・ResNet", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">残差ブロックで主経路F(x)の形が16×16×128になった。入力xは32×32×64である。加算を成立させるため、スキップ経路Xに必要な処理はどれか。</div><div class="exam-figure"><span class="figure-title">Residual Block</span><div class="diagram-row"><div class="diagram-node primary">x<br>32×32×64</div><div class="diagram-arrow">→</div><div class="diagram-node">F(x)<br>16×16×128</div><div class="diagram-arrow">↘</div><div class="diagram-node accent">要素ごとの加算</div></div><div class="diagram-row"><div class="diagram-node primary">x</div><div class="diagram-arrow">→</div><div class="diagram-node warn">X</div><div class="diagram-arrow">↗</div></div></div>`,
        options: ["1×1畳み込み、stride=2、出力128チャネル", "3×3 MaxPoolだけ", "Global Average Pooling", "何もしない恒等写像"], answer: 0,
        explanation: `<p><strong>加算する2つのテンソルは形が同じでなければなりません。</strong></p><p>高さ・幅は32→16なのでstride=2、チャネルは64→128なので出力128チャネルへの変換が必要です。1×1畳み込みなら空間サイズとチャネル数を同時に合わせられます。</p><p><strong>確認：</strong>X(x)も16×16×128となり、F(x)+X(x)が可能になります。</p>`
    },
    {
        id: "visual-cnn-shape-pipeline", category: "CNN", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">次のCNNに32×32×3の画像を1枚入力する。最後の特徴マップの形として正しいものを選べ。Convの表記はK=kernel、S=stride、P=padding、C=出力チャネルを表す。</div><div class="exam-figure"><span class="figure-title">形状を左から追う</span><div class="diagram-row"><div class="diagram-node primary">入力<br>32×32×3</div><div class="diagram-arrow">→</div><div class="diagram-node">Conv<br>K3 S1 P1 C16</div><div class="diagram-arrow">→</div><div class="diagram-node">MaxPool<br>K2 S2</div><div class="diagram-arrow">→</div><div class="diagram-node">Conv<br>K3 S1 P0 C32</div></div></div>`,
        options: ["14×14×32", "16×16×32", "15×15×16", "30×30×32"], answer: 0,
        explanation: `<p><strong>正解は14×14×32です。</strong></p><ol class="step-list"><li>最初のConvはP=1なので32×32を維持し、チャネルだけ16になります。</li><li>MaxPoolで高さ・幅が半分になり、16×16×16です。</li><li>最後のConvはP=0なので16−3+1=14。出力チャネルは32です。</li></ol><p>したがって<strong>14×14×32</strong>です。チャネル数はkernel計算式ではなくCの指定を見る点が重要です。</p>`
    },
    {
        id: "visual-confusion-matrix-long", category: "評価指標", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">病変を陽性とする分類器を100件で評価した。次の混同行列からPrecision（適合率）とRecall（再現率）の組合せを選べ。</div><div class="exam-figure"><span class="figure-title">混同行列</span><table class="figure-table"><tr><th></th><th>予測：陽性</th><th>予測：陰性</th></tr><tr><th>実際：陽性</th><td class="hot">TP=40</td><td>FN=10</td></tr><tr><th>実際：陰性</th><td>FP=15</td><td>TN=35</td></tr></table><p class="figure-caption">Precisionは「陽性と予測した中」、Recallは「実際に陽性の中」を分母にする。</p></div>`,
        options: ["Precision≈0.727、Recall=0.800", "Precision=0.800、Recall≈0.727", "Precision≈0.533、Recall=0.800", "Precision≈0.727、Recall≈0.533"], answer: 0,
        explanation: `<p><strong>Precision=TP/(TP+FP)=40/(40+15)=40/55≈0.727</strong>です。</p><p><strong>Recall=TP/(TP+FN)=40/(40+10)=40/50=0.800</strong>です。</p><p>FPは「誤って陽性と言った数」なのでPrecisionを下げ、FNは「陽性を見逃した数」なのでRecallを下げます。名前だけでなく、どの誤りが分母に入るかで判断します。</p>`
    },
    {
        id: "visual-learning-curves", category: "機械学習の課題", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">学習を12 epoch行ったところ、訓練Lossは下がり続けたが、検証Lossはepoch 6付近を最小として上昇した。最も適切な判断と対応を選べ。</div><div class="exam-figure"><span class="figure-title">学習曲線</span><svg class="curve-svg" viewBox="0 0 520 220" role="img" aria-label="訓練Lossは低下し続け、検証Lossは途中から上昇するグラフ"><line x1="55" y1="20" x2="55" y2="180" stroke="currentColor"/><line x1="55" y1="180" x2="500" y2="180" stroke="currentColor"/><polyline points="60,45 120,75 180,105 240,125 300,140 360,151 420,160 480,166" fill="none" stroke="#1769e0" stroke-width="5"/><polyline points="60,55 120,85 180,112 240,130 300,137 360,124 420,102 480,76" fill="none" stroke="#e05a47" stroke-width="5"/><line x1="300" y1="25" x2="300" y2="180" stroke="#666" stroke-dasharray="7 6"/><text x="310" y="42">epoch 6</text><text x="390" y="160" fill="#1769e0">訓練Loss</text><text x="390" y="88" fill="#e05a47">検証Loss</text><text x="8" y="28">Loss</text><text x="455" y="208">epoch</text></svg></div>`,
        options: ["過学習の兆候。epoch 6付近を候補にEarly Stoppingする", "未学習の兆候。必ずepochを増やす", "勾配消失なので活性化関数だけを変える", "検証Lossは見ず、訓練Lossが最小のepoch 12を採用する"], answer: 0,
        explanation: `<p><strong>訓練だけ良くなり、未知データに近い検証性能が悪化するのは過学習の典型です。</strong></p><p>モデル採用の候補は検証Lossが最小のepoch 6付近です。Early Stoppingは検証指標が一定期間改善しないとき学習を止めます。</p><p><strong>注意：</strong>グラフは1点の揺れもあるため、実装ではpatience（何epoch待つか）を設けることがあります。</p>`
    },
    {
        id: "visual-pytorch-ce-code", category: "PyTorch実装", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">3クラス分類を学習する次のコードには、損失関数の使い方として不適切な箇所がある。修正として最も適切なものを選べ。</div><div class="exam-figure"><span class="figure-title">学習コード</span><pre class="code-figure"><code>criterion = nn.CrossEntropyLoss()<br>logits = model(x)　# shape: (N, 3)<br>probs = torch.softmax(logits, dim=1)<br>loss = criterion(probs, target)<br>loss.backward()</code></pre><p class="figure-caption">targetはshape (N) のクラス番号で、dtypeはtorch.longとする。</p></div>`,
        options: ["softmax行を外し、criterion(logits, target)とする", "softmaxのdimを0に変える", "targetにもsoftmaxをかける", "loss.backward()をmodel.eval()の中で実行する"], answer: 0,
        explanation: `<p><strong>CrossEntropyLossにはSoftmax前の生の点数logitsを渡します。</strong></p><p>内部でLogSoftmaxとNLLLossに相当する処理を、数値的に安定した形で行います。先にSoftmaxをかけると、期待する入力ではなく確率を再びロジットのように扱うことになります。</p><ol class="step-list"><li>model(x)でlogitsを得る。</li><li>criterion(logits, target)を計算する。</li><li>backward()で勾配を求める。</li></ol>`
    },
    {
        id: "visual-causal-mask-matrix", category: "Transformer", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">自己回帰DecoderのSelf-Attentionに次のcausal maskを使う。行がQuery、列がKeyで、○は参照可能、×は参照禁止を表す。位置t3が参照できる位置を選べ。</div><div class="exam-figure"><span class="figure-title">Causal Mask</span><table class="figure-table"><tr><th>Q＼K</th><th>t1</th><th>t2</th><th>t3</th><th>t4</th></tr><tr><th>t1</th><td>○</td><td class="masked">×</td><td class="masked">×</td><td class="masked">×</td></tr><tr><th>t2</th><td>○</td><td>○</td><td class="masked">×</td><td class="masked">×</td></tr><tr><th>t3</th><td>○</td><td>○</td><td>○</td><td class="masked">×</td></tr><tr><th>t4</th><td>○</td><td>○</td><td>○</td><td>○</td></tr></table></div>`,
        options: ["t1、t2、t3", "t3だけ", "t3、t4", "t1、t2、t3、t4"], answer: 0,
        explanation: `<p><strong>t3は自分自身と過去のt1、t2を参照できますが、未来のt4は参照できません。</strong></p><p>自己回帰生成では、学習時に正解の未来トークンが入力に並んでいても、そこを見られないようにします。禁止位置のAttentionロジットへ−∞相当を加えると、Softmax後の重みはほぼ0になります。</p>`
    },
    {
        id: "visual-layernorm-axis", category: "正規化", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">Transformerへの入力テンソルが(N,L,D)=(2,3,4)である。各トークンの4特徴にLayer Normalizationを適用するとき、平均と分散は何組計算されるか。</div><div class="exam-figure"><span class="figure-title">LayerNormがまとめる方向</span><div class="diagram-column"><div class="diagram-node primary">バッチN=2</div><div class="diagram-node">各バッチにトークンL=3</div><div class="diagram-node accent">各トークンの特徴D=4<br>← この4個から平均・分散 →</div></div><p class="figure-caption">文章の長さLやバッチNをまたいで一括計算しない。</p></div>`,
        options: ["6組（N×L）", "2組（N）", "3組（L）", "4組（D）"], answer: 0,
        explanation: `<p><strong>1トークンごとにD=4個の特徴から平均・分散を求めます。</strong></p><p>トークンはN×L=2×3=6個あるので、統計量は6組です。LayerNormは他の文章やトークンに依存しにくく、可変長系列や小さいバッチでも扱いやすい点がTransformerと相性のよい理由です。</p>`
    },
    {
        id: "visual-rag-failure", category: "LLM・RAG", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">社内規程を答えるRAGで、LLMは与えられた文書には忠実だが回答を誤った。ログを見ると、検索結果の上位3件はすべて質問と無関係だった。最初に改善すべき箇所を選べ。</div><div class="exam-figure"><span class="figure-title">失敗したRAGの流れ</span><div class="diagram-row"><div class="diagram-node primary">質問</div><div class="diagram-arrow">→</div><div class="diagram-node warn">Retriever</div><div class="diagram-arrow">→</div><div class="diagram-node warn">無関係な文書<br>Top 3</div><div class="diagram-arrow">→</div><div class="diagram-node">LLM</div><div class="diagram-arrow">→</div><div class="diagram-node warn">誤答</div></div></div>`,
        options: ["文書分割、埋め込み、検索・再ランキングなどRetriever側", "LLMの出力温度だけを上げる", "回答を長くするよう指示する", "検索を外してLLMの事前学習知識だけに任せる"], answer: 0,
        explanation: `<p><strong>根拠文書が検索できていないため、まずRetriever側を直します。</strong></p><p>候補は、chunkの大きさと重なり、埋め込みモデル、検索方式、Top-k、メタデータ絞り込み、rerankerです。LLMが渡された文書に忠実なら、生成段階より前の検索がボトルネックです。</p><p><strong>切り分けの型：</strong>「正しい根拠が取れたか」→「根拠から正しく生成できたか」の順に確認します。</p>`
    },
    {
        id: "visual-generative-models", category: "生成モデル", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">A〜Cは代表的な生成モデルの学習・生成経路を簡略化した図である。VAE、GAN、DDPMの対応として正しいものを選べ。</div><div class="exam-figure"><span class="figure-title">3つの生成モデル</span><div class="diagram-column"><div class="diagram-node"><strong>A</strong> 入力x → Encoder → μ,σ → z → Decoder → 復元x'</div><div class="diagram-node"><strong>B</strong> ノイズz → Generator → 偽物 ─┐<br>本物x ─────────────────→ Discriminator</div><div class="diagram-node"><strong>C</strong> データx₀ → 少しずつノイズ追加 → xₜ<br>xₜ → 学習した逆過程 → x₀</div></div></div>`,
        options: ["A=VAE、B=GAN、C=DDPM", "A=GAN、B=DDPM、C=VAE", "A=DDPM、B=VAE、C=GAN", "A=VAE、B=DDPM、C=GAN"], answer: 0,
        explanation: `<p><strong>A=VAE、B=GAN、C=DDPMです。</strong></p><ul><li><strong>VAE：</strong>μとσから潜在変数zをサンプリングし、復元項とKL項で学習します。</li><li><strong>GAN：</strong>GeneratorとDiscriminatorが敵対的に学習します。</li><li><strong>DDPM：</strong>前向き過程でノイズを加え、逆過程のノイズ除去を学習します。</li></ul><p>名称ではなく、図に現れる固有部品で識別します。</p>`
    },
    {
        id: "visual-lstm-cell", category: "系列モデル", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">LSTMのセル状態を cₜ=fₜ×cₜ₋₁+iₜ×c̃ₜ で更新する。図の値を使ったとき、新しいセル状態cₜはいくつか。</div><div class="exam-figure"><span class="figure-title">LSTMセル状態の更新</span><div class="diagram-row"><div class="diagram-node primary">過去の記憶<br>cₜ₋₁=4</div><div class="diagram-node">忘却ゲート<br>fₜ=0.75</div><div class="diagram-arrow">→ 3</div><div class="diagram-node primary">新しい候補<br>c̃ₜ=2</div><div class="diagram-node">入力ゲート<br>iₜ=0.5</div><div class="diagram-arrow">→ 1</div><div class="diagram-node accent">加算<br>cₜ=?</div></div></div>`,
        options: ["4", "3", "5", "6"], answer: 0,
        explanation: `<p><strong>cₜ=0.75×4+0.5×2=3+1=4です。</strong></p><ol class="step-list"><li>残す過去の記憶：fₜ×cₜ₋₁=0.75×4=3</li><li>書き込む新しい情報：iₜ×c̃ₜ=0.5×2=1</li><li>両者を足してcₜ=4</li></ol><p>ゲート値は0〜1で、情報をどれだけ通すかを表します。全部を掛け合わせるのではなく、2経路を最後に足します。</p>`
    },
    {
        id: "visual-mask-rcnn-pipeline", category: "物体検出・セグメンテーション", kind: "図表・長文", difficulty: "本試験型", beginnerReviewed: true,
        question: `<div class="exam-stem">次の図はMask R-CNNの概略である。候補領域を作り、各候補が物体らしいかを示すobjectnessとboxのずれを出力するXはどれか。</div><div class="exam-figure"><span class="figure-title">Mask R-CNNの処理経路</span><div class="diagram-row"><div class="diagram-node primary">画像</div><div class="diagram-arrow">→</div><div class="diagram-node">Backbone + FPN</div><div class="diagram-arrow">→</div><div class="diagram-node warn">X</div><div class="diagram-arrow">→</div><div class="diagram-node">候補領域</div><div class="diagram-arrow">→</div><div class="diagram-node">RoI Align</div><div class="diagram-arrow">→</div><div class="diagram-node accent">分類・Box・Mask</div></div></div>`,
        options: ["RPN（Region Proposal Network）", "Global Average Pooling", "DecoderのCross-Attention", "Discriminator"], answer: 0,
        explanation: `<p><strong>XはRPNです。</strong></p><p>RPNは特徴マップ上で、物体がありそうかというobjectnessと、基準枠からのbox offsetを予測して候補領域を作ります。その候補をRoI Alignで同じ大きさの特徴にそろえ、後段の分類・box回帰・mask予測へ渡します。</p><p><strong>識別：</strong>候補領域を作る=RPN、候補特徴を位置ずれ少なく切り出す=RoI Alignです。</p>`
    },
];

window.quizData.questions.push(...bootcampVisualQuestions);
