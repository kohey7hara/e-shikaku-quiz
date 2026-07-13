window.quizData = {
    title: "1-（１）線形代数：行列・固有値・SVD",
    cheatSheet: `
        <style>
            .la-flow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin:14px 0}.la-box{border:2px solid #2e86c1;background:#eef7fd;border-radius:10px;padding:10px;text-align:center;min-width:130px}.la-arrow{font-weight:bold;color:#777}.matrix-demo{display:grid;grid-template-columns:repeat(2,42px);gap:3px;justify-content:center;margin:8px}.matrix-demo span{display:grid;place-items:center;height:35px;background:#edf2f7;border-radius:4px}.eigen-axis{position:relative;height:150px;max-width:480px;margin:15px auto;border-left:2px solid #777;border-bottom:2px solid #777}.eigen-line{position:absolute;left:45px;bottom:20px;width:300px;height:4px;background:#e74c3c;transform:rotate(-22deg);transform-origin:left}.eigen-dot{position:absolute;left:255px;bottom:100px;width:14px;height:14px;border-radius:50%;background:#e74c3c}.svd-row{display:flex;align-items:center;justify-content:center;gap:9px;flex-wrap:wrap}.svd-box{padding:14px;border-radius:9px;background:#f4effa;border:2px solid #8e44ad;font-weight:bold}
        </style>
        <p><strong>線形代数は「数値」より先に「形状」を見る</strong>のが鉄則です。ニューラルネットのほぼ全ては、入力を行列・テンソルとして変換する計算です。</p>
        <h3>■ 1. 行列積とアダマール積</h3>
        <div class="la-flow"><div class="la-box">$A:(m\\times n)$</div><span class="la-arrow">×</span><div class="la-box">$B:(n\\times p)$</div><span class="la-arrow">→</span><div class="la-box">$AB:(m\\times p)$</div></div>
        <p>内側の次元 $n$ が一致すると掛けられ、外側の次元 $(m,p)$ が答えに残ります。一方、<strong>アダマール積</strong> $A\\odot B$ は同じ位置同士を掛けるため、原則として形状が同じ必要があります。</p>
        <h3>■ 2. ランク：独立な情報の本数</h3>
        <div class="la-flow"><div class="la-box"><div class="matrix-demo"><span>1</span><span>2</span><span>2</span><span>4</span></div></div><span class="la-arrow">→</span><div class="la-box"><strong>rank = 1</strong><br>第2行は第1行の2倍</div></div>
        <p>行や列が他の行・列の組合せで作れるなら、新しい情報ではありません。ランクは独立な行（列）の最大本数です。</p>
        <h3>■ 3. 固有値・固有ベクトル</h3>
        <div class="eigen-axis"><div class="eigen-line"></div><div class="eigen-dot"></div></div>
        <p>$A\\boldsymbol v=\\lambda\\boldsymbol v$。行列変換後も<strong>向きが変わらず、長さだけ $\\lambda$ 倍</strong>になる方向が固有ベクトルです。固有値は $\\det(A-\\lambda I)=0$ から求めます。</p>
        <h3>■ 4. SVD：どんな行列でも「回す→伸ばす→回す」</h3>
        <div class="svd-row"><div class="svd-box">$A$</div><span>=</span><div class="svd-box">$U$</div><div class="svd-box">$\\Sigma$</div><div class="svd-box">$V^T$</div></div>
        <p>$A=U\\Sigma V^T$。特異値は非負で、大きい順に並びます。小さい特異値を捨てると、情報をなるべく保った低ランク近似になります。</p>
    `,
    questions: [
        {id:"la-matmul-shape",category:"行列積(形状)",kind:"計算",question:"$A$が$(3,4)$、$B$が$(4,2)$の行列のとき、$AB$の形状はどれか。",options:["$(3,2)$","$(4,4)$","$(2,3)$","計算できない"],answer:0,explanation:"内側の4が一致し、外側の3と2が残るため$(3,2)$です。"},
        {id:"la-matmul-invalid",category:"行列積(形状)",kind:"計算",question:"$A:(2,3)$ と $B:(2,4)$ の行列積 $AB$ について正しいものはどれか。",options:["内側の3と2が一致しないため計算できない","形状は$(2,4)$","形状は$(3,2)$","形状は$(4,3)$"],answer:0,explanation:"$AB$にはAの列数とBの行数の一致が必要です。"},
        {id:"la-matmul-value",category:"行列積(手計算)",kind:"計算",question:"$A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$、$x=\\begin{pmatrix}2\\\\1\\end{pmatrix}$ の $Ax$ はどれか。",options:["$\\begin{pmatrix}4\\\\10\\end{pmatrix}$","$\\begin{pmatrix}3\\\\7\\end{pmatrix}$","$\\begin{pmatrix}5\\\\11\\end{pmatrix}$","$\\begin{pmatrix}2\\\\4\\end{pmatrix}$"],answer:0,explanation:"第1行は$1×2+2×1=4$、第2行は$3×2+4×1=10$です。"},
        {id:"la-hadamard",category:"アダマール積",kind:"計算",question:"$A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$、$B=\\begin{pmatrix}2&0\\\\1&2\\end{pmatrix}$ の $A\\odot B$ はどれか。",options:["$\\begin{pmatrix}2&0\\\\3&8\\end{pmatrix}$","$\\begin{pmatrix}4&4\\\\10&8\\end{pmatrix}$","$\\begin{pmatrix}3&2\\\\4&6\\end{pmatrix}$","$\\begin{pmatrix}2&2\\\\3&6\\end{pmatrix}$"],answer:0,explanation:"同じ位置同士を掛けるため$(1×2,2×0;3×1,4×2)$です。"},
        {id:"la-tensor-batch",category:"テンソル形状",kind:"計算",question:"バッチ行列積で $X:(32,10,64)$、$W:(64,128)$ のとき、$XW$の形状はどれか。",options:["$(32,10,128)$","$(32,64,128)$","$(10,128)$","$(32,128,10)$"],answer:0,explanation:"最後の64が縮約され、バッチ32と系列10、出力128が残ります。"},
        {id:"la-rank-one",category:"行列ランク",kind:"計算",question:"$A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$のランクはどれか。",options:["1","0","2","4"],answer:0,explanation:"第2行が第1行の2倍なので独立な行は1本です。"},
        {id:"la-rank-full",category:"行列ランク",kind:"計算",question:"$A=\\begin{pmatrix}1&0\\\\0&3\\end{pmatrix}$のランクはどれか。",options:["2","1","0","3"],answer:0,explanation:"2行（2列）が独立で、2×2行列のフルランクです。"},
        {id:"la-gradient-scalar",category:"勾配",kind:"計算",question:"$f(x,y)=x^2+3xy$ の勾配 $\\nabla f$ はどれか。",options:["$(2x+3y,3x)$","$(2x,3y)$","$(x+3y,3x)$","$(2x+3,3y)$"],answer:0,explanation:"xで偏微分すると$2x+3y$、yで偏微分すると$3x$です。"},
        {id:"la-gradient-point",category:"勾配(手計算)",kind:"計算",question:"$f(x,y)=x^2+y^2$ の点$(1,-2)$での勾配はどれか。",options:["$(2,-4)$","$(1,-2)$","$(2,4)$","$(-2,4)$"],answer:0,explanation:"$\\nabla f=(2x,2y)$へ代入して$(2,-4)$です。"},
        {id:"la-eigen-diagonal",category:"固有値",kind:"計算",question:"対角行列 $A=\\begin{pmatrix}2&0\\\\0&5\\end{pmatrix}$ の固有値はどれか。",options:["2と5","0と7","1と10","-2と-5"],answer:0,explanation:"対角行列の固有値は対角成分です。"},
        {id:"la-eigen-triangular",category:"固有値",kind:"計算",question:"上三角行列 $A=\\begin{pmatrix}3&4\\\\0&1\\end{pmatrix}$ の固有値はどれか。",options:["3と1","4と0","7と0","2と2"],answer:0,explanation:"三角行列の固有値も対角成分3と1です。"},
        {id:"la-eigen-vector",category:"固有ベクトル",kind:"計算",question:"$A=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ に対し、固有値2の固有ベクトルとして正しいものはどれか。",options:["$(1,0)^T$","$(0,1)^T$","$(1,1)^T$","$(2,3)^T$"],answer:0,explanation:"$A(1,0)^T=(2,0)^T=2(1,0)^T$です。"},
        {id:"la-char-poly",category:"固有値方程式",kind:"計算",question:"固有値を求める方程式として正しいものはどれか。",options:["$\\det(A-\\lambda I)=0$","$\\det(A+I)=1$","$A+\\lambda=0$","$\\det(A)=\\lambda^2$のみ"],answer:0,explanation:"非零解$(A-λI)v=0$が存在するには係数行列の行列式が0である必要があります。"},
        {id:"la-diagonalize",category:"対角化",kind:"理解",question:"$A=PDP^{-1}$で対角化できるとき、$P$の列に並ぶものはどれか。",options:["Aの一次独立な固有ベクトル","Aの各行の平均","Aの特異値だけ","単位ベクトルだけ"],answer:0,explanation:"Dの対角には固有値、Pの対応する列には固有ベクトルが並びます。"},
        {id:"la-diagonal-power",category:"対角化(応用)",kind:"理解",question:"対角化 $A=PDP^{-1}$ が行列の高いべき $A^k$ の計算を簡単にする理由はどれか。",options:["$A^k=PD^kP^{-1}$となり、対角成分をk乗すればよい","Pをk回足せばよい","逆行列が不要になる","固有値が全て1になる"],answer:0,explanation:"中間の$P^{-1}P$が相殺され、対角行列Dのべきだけを計算できます。"},
        {id:"la-svd-form",category:"特異値分解",kind:"理解",question:"行列Aの特異値分解として正しい形はどれか。",options:["$A=U\\Sigma V^T$","$A=U+\\Sigma+V$","$A=V\\Sigma V^{-1}$のみ","$A=Q^TQ$"],answer:0,explanation:"左特異ベクトルU、特異値Σ、右特異ベクトルVから構成されます。"},
        {id:"la-svd-nonnegative",category:"特異値",kind:"理解",question:"特異値の性質として正しいものはどれか。",options:["常に0以上","必ず負","複素数のみ","行列が正方形でなければ存在しない"],answer:0,explanation:"特異値は$A^TA$の非負固有値の平方根なので非負です。"},
        {id:"la-singular-calc",category:"特異値(計算)",kind:"計算",question:"$A=\\begin{pmatrix}3&0\\\\0&4\\end{pmatrix}$ の特異値はどれか。",options:["4と3","16と9","7と1","3と-4"],answer:0,explanation:"$A^TA=diag(9,16)$の固有値の平方根なので3と4です。"},
        {id:"la-svd-shapes",category:"SVD(形状)",kind:"計算",question:"$A$が$(m,n)$、full SVDで $A=U\\Sigma V^T$ のとき、Uの形状はどれか。",options:["$(m,m)$","$(n,n)$","$(m,n)$","$(n,m)$"],answer:0,explanation:"full SVDではUはm×m、Σはm×n、Vはn×nです。"},
        {id:"la-low-rank",category:"低ランク近似",kind:"理解",question:"SVDによるrank-k近似で通常残すものはどれか。",options:["大きい方からk個の特異値と対応ベクトル","小さい方からk個の特異値","負の特異値だけ","全ての成分の平均"],answer:0,explanation:"大きな特異値ほど行列の主要な変動・情報を表します。"},
        {id:"la-frobenius",category:"行列ノルム",kind:"計算",question:"$A=\\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$ のFrobeniusノルムはどれか。",options:["$\\sqrt{10}$","6","10","$\\sqrt6$"],answer:0,explanation:"全要素二乗和の平方根で$√(1+4+4+1)=√10$です。"},
        {id:"la-trace-eigen",category:"固有値の性質",kind:"計算",question:"2×2行列の固有値が2と5のとき、その行列のトレースはいくつか。",options:["7","10","3","2.5"],answer:0,explanation:"固有値の和はトレースに等しいため7です。"},
        {id:"la-det-eigen",category:"固有値の性質",kind:"計算",question:"2×2行列の固有値が2と5のとき、その行列式はいくつか。",options:["10","7","3","25"],answer:0,explanation:"固有値の積は行列式に等しいため10です。"},
        {id:"la-svd-vs-eigen",category:"固有値分解とSVD",kind:"識別",question:"固有値分解と比べたSVDの重要な特徴はどれか。",options:["長方形行列を含む任意の行列に適用できる","正方対称行列にしか使えない","特異値は必ず複素数","低ランク近似には使えない"],answer:0,explanation:"SVDはm×nの一般行列に適用でき、圧縮や次元削減にも使われます。"}
    ]
};
