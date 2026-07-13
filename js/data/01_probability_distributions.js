window.quizData = {
    title: "1-（２）確率・統計：確率分布と手計算",
    cheatSheet: `
        <style>.prob-flow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin:14px}.prob-box{border:2px solid #27ae60;background:#effaf3;border-radius:10px;padding:10px;text-align:center;min-width:145px}.prob-arrow{font-weight:bold;color:#777}.dist-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:9px}.dist-card{border:1px solid #ccd6df;border-top:4px solid #3498db;border-radius:9px;padding:11px;background:white}.bell{height:110px;position:relative;border-bottom:2px solid #777;margin:10px}.bell:after{content:"";position:absolute;left:15%;right:15%;bottom:0;height:90px;border-radius:50% 50% 0 0/100% 100% 0 0;border-top:4px solid #8e44ad;transform:scaleY(.8)} </style>
        <h3>■ 1. 同時・条件付き・周辺確率</h3><div class="prob-flow"><div class="prob-box"><strong>同時確率</strong>$P(X,Y)$</div><span class="prob-arrow">合計→</span><div class="prob-box"><strong>周辺確率</strong>$P(X)=\\sum_yP(X,y)$</div><span class="prob-arrow">割る→</span><div class="prob-box"><strong>条件付き</strong>$P(X|Y)=P(X,Y)/P(Y)$</div></div>
        <h3>■ 2. 期待値・分散・共分散</h3><p>$E[X]=\\sum xp(x)$、$Var(X)=E[X^2]-E[X]^2$。共分散 $Cov(X,Y)=E[(X-E[X])(Y-E[Y])]$ は一緒に増減する傾向を表しますが、0でも一般には独立とは限りません。</p>
        <h3>■ 3. 分布を「何を数えるか」で識別</h3><div class="dist-cards"><div class="dist-card"><strong>ベルヌーイ</strong><br>1回の成功/失敗</div><div class="dist-card"><strong>二項分布</strong><br>n回中の成功回数</div><div class="dist-card"><strong>カテゴリカル</strong><br>1回の多クラス結果</div><div class="dist-card"><strong>多項分布</strong><br>n回のクラス別回数</div></div>
        <h3>■ 4. ガウス・t・混合ガウス</h3><div class="bell"></div><p>ガウス分布は平均$\\mu$と分散$\\sigma^2$で決まります。t分布は母分散未知・小標本で裾が厚い分布。混合ガウスは複数のガウス分布を重み付きで足し、多峰性を表現します。</p>
    `,
    questions: [
        {id:"prob-joint-marginal",category:"周辺確率",kind:"計算",question:"$P(X=1,Y=0)=0.2$、$P(X=1,Y=1)=0.3$ のとき、$P(X=1)$はいくつか。",options:["0.5","0.2","0.3","0.06"],answer:0,explanation:"Yの全場合を足し、$0.2+0.3=0.5$です。"},
        {id:"prob-conditional",category:"条件付き確率",kind:"計算",question:"$P(A\\cap B)=0.2$、$P(B)=0.5$ のとき $P(A|B)$ はどれか。",options:["0.4","0.1","0.7","2.5"],answer:0,explanation:"$P(A|B)=P(A∩B)/P(B)=0.2/0.5=0.4$です。"},
        {id:"prob-independence",category:"独立",kind:"計算",question:"$P(A)=0.4$、$P(B)=0.5$で独立なら、$P(A\\cap B)$はいくつか。",options:["0.2","0.9","0.4","0.5"],answer:0,explanation:"独立なら積$0.4×0.5=0.2$です。"},
        {id:"prob-expectation",category:"期待値",kind:"計算",question:"$X$が0を確率0.25、2を確率0.75で取るとき、$E[X]$はいくつか。",options:["1.5","1.0","2.0","0.5"],answer:0,explanation:"$0×0.25+2×0.75=1.5$です。"},
        {id:"prob-variance",category:"分散",kind:"計算",question:"$X$が0と2を各確率0.5で取るとき、$Var(X)$はいくつか。",options:["1","2","0","4"],answer:0,explanation:"$E[X]=1,E[X^2]=2$なので$Var=2-1^2=1$です。"},
        {id:"prob-covariance",category:"共分散",kind:"理解",question:"$Cov(X,Y)>0$ が通常示す傾向はどれか。",options:["Xが平均より大きいとYも大きい傾向","必ずXとYが独立","XとYが常に同じ値","Yが必ず減る"],answer:0,explanation:"同方向に変動する傾向を示します。大きさは単位に依存します。"},
        {id:"prob-zero-cov",category:"共分散(罠)",kind:"識別",question:"$Cov(X,Y)=0$から一般に必ず言えることはどれか。",options:["線形な相関がないが、独立とは限らない","必ず独立","必ず同じ分布","必ず正規分布"],answer:0,explanation:"非線形な依存が残る場合があり、無相関は一般に独立より弱い条件です。"},
        {id:"prob-pmf-pdf",category:"PMFとPDF",kind:"識別",question:"連続確率変数の確率密度関数$f(x)$について正しいものはどれか。",options:["一点の確率ではなく、区間の積分が確率になる","$f(x)$は必ず1以下","一点の確率が$f(x)$そのもの","総和が必ず0"],answer:0,explanation:"連続変数では$P(a≤X≤b)=∫_a^bf(x)dx$です。密度は1を超えることもあります。"},
        {id:"prob-bernoulli-mean",category:"ベルヌーイ分布",kind:"計算",question:"成功確率$p=0.3$のベルヌーイ変数の期待値はどれか。",options:["0.3","0.7","0.21","1"],answer:0,explanation:"ベルヌーイ分布の期待値はpです。"},
        {id:"prob-bernoulli-var",category:"ベルヌーイ分布",kind:"計算",question:"成功確率$p=0.3$のベルヌーイ変数の分散はどれか。",options:["0.21","0.3","0.09","0.7"],answer:0,explanation:"分散は$p(1-p)=0.3×0.7=0.21$です。"},
        {id:"prob-binomial",category:"二項分布",kind:"計算",question:"成功確率0.5の試行を3回行い、ちょうど2回成功する確率はどれか。",options:["3/8","1/8","1/2","2/3"],answer:0,explanation:"$C(3,2)0.5^2 0.5=3/8$です。"},
        {id:"prob-binomial-mean",category:"二項分布",kind:"計算",question:"$X\\sim Binomial(n=10,p=0.2)$の期待値はどれか。",options:["2","0.2","8","1.6"],answer:0,explanation:"二項分布の期待値は$np=2$です。"},
        {id:"prob-binomial-var",category:"二項分布",kind:"計算",question:"$X\\sim Binomial(n=10,p=0.2)$の分散はどれか。",options:["1.6","2","0.16","8"],answer:0,explanation:"分散は$np(1-p)=10×0.2×0.8=1.6$です。"},
        {id:"prob-categorical",category:"カテゴリカル分布",kind:"識別",question:"カテゴリカル分布が表すものはどれか。",options:["1回の試行でKクラスのどれが出るか","n回中の2値成功回数","連続値の平均","複数ガウスの混合"],answer:0,explanation:"ベルヌーイ分布をKカテゴリへ拡張した1回試行の分布です。"},
        {id:"prob-multinomial",category:"多項分布",kind:"識別",question:"多項分布が表すものはどれか。",options:["n回のカテゴリカル試行における各クラスの出現回数","1回の2値結果","連続実数","標本平均だけ"],answer:0,explanation:"二項分布をKカテゴリへ拡張した回数ベクトルの分布です。"},
        {id:"prob-gaussian-z",category:"ガウス分布",kind:"計算",question:"平均10、標準偏差2のガウス分布で$x=14$のz-scoreはいくつか。",options:["2","4","7","0.5"],answer:0,explanation:"$z=(14-10)/2=2$です。"},
        {id:"prob-gaussian-linear",category:"ガウス分布",kind:"計算",question:"$X$の平均が3、分散が4のとき、$Y=2X+1$の平均と分散はどれか。",options:["平均7、分散16","平均7、分散8","平均6、分散9","平均4、分散16"],answer:0,explanation:"$E[Y]=2×3+1=7$、$Var(Y)=2^2×4=16$です。"},
        {id:"prob-t-dist",category:"t分布",kind:"識別",question:"t分布が正規分布より適する典型例はどれか。",options:["母分散が未知で標本数が少ない平均推定","カテゴリ数が多い分類","画像の物体検出","確率が既知のベルヌーイ試行"],answer:0,explanation:"分散推定の不確実性を反映し、正規分布より裾が厚くなります。"},
        {id:"prob-t-limit",category:"t分布",kind:"理解",question:"自由度が大きくなるとt分布は何に近づくか。",options:["標準正規分布","一様分布","ベルヌーイ分布","指数分布"],answer:0,explanation:"標本数増加で分散推定が安定し、標準正規分布へ近づきます。"},
        {id:"prob-gmm",category:"混合ガウス分布",kind:"モデル理解",question:"混合ガウスモデル（GMM）の特徴はどれか。",options:["複数のガウス分布を混合重みで足し、多峰性を表現する","ガウス分布を1つだけ使う","クラス境界を必ず直線にする","確率を使わない"],answer:0,explanation:"各成分の平均・共分散と混合比により複雑な密度を表します。"},
        {id:"prob-gmm-weight",category:"混合ガウス分布",kind:"計算",question:"2成分GMMの混合重みが0.3と0.7で、点xでの各密度が0.2と0.5なら混合密度はいくつか。",options:["0.41","0.7","0.35","0.1"],answer:0,explanation:"$0.3×0.2+0.7×0.5=0.06+0.35=0.41$です。"},
        {id:"prob-clt",category:"中心極限定理",kind:"理解",question:"中心極限定理の説明として最も適切なものはどれか。",options:["条件下で標本平均の分布が標本数増加とともに正規分布へ近づく","元データが必ず正規分布になる","全ての分散が0になる","カテゴリカル分布が二項分布になる"],answer:0,explanation:"元の分布が正規でなくても、独立同分布かつ有限分散などの条件で標本平均が正規へ近づきます。"},
        {id:"prob-clt-se",category:"中心極限定理",kind:"計算",question:"母標準偏差が10、標本数100の標本平均の標準誤差はいくつか。",options:["1","10","0.1","100"],answer:0,explanation:"標準誤差は$σ/√n=10/10=1$です。"},
        {id:"prob-bayes-calc",category:"ベイズ則",kind:"計算",question:"$P(D)=0.1$、$P(+|D)=0.8$、$P(+|\\neg D)=0.2$のとき$P(D|+)$はどれか。",options:["約0.308","0.8","0.1","0.4"],answer:0,explanation:"$0.08/(0.08+0.2×0.9)=0.08/0.26≈0.308$です。"}
    ]
};
