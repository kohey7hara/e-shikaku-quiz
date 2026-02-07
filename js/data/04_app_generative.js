window.quizData = {
    title: "4-（６）生成モデル：VAE, GAN, 拡散モデル",
    
    cheatSheet: `
        <style>
            .gen-container { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px; }
            .gen-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; width: 30%; min-width: 300px; background: #fff; }
            .gen-title { font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 10px; display: inline-block; }
            
            /* VAE */
            .vae-flow { display: flex; align-items: center; justify-content: center; font-size: 0.8em; gap: 2px; }
            .vae-box { border: 1px solid #999; padding: 5px; border-radius: 4px; background: #eee; text-align: center; }
            .vae-z { border: 2px solid #3498db; background: #ebf5fb; color: #3498db; border-radius: 50%; width: 30px; height: 30px; line-height: 30px; text-align: center; font-weight: bold; }
            
            /* GAN */
            .gan-layout { display: flex; justify-content: space-around; align-items: center; font-size: 0.8em; text-align: center; background: #f9f9f9; padding: 5px; border-radius: 5px; }
            .gan-g { border: 2px solid #e74c3c; background: #fceceb; padding: 5px; border-radius: 5px; width: 40%; }
            .gan-d { border: 2px solid #8e44ad; background: #f4ecf7; padding: 5px; border-radius: 5px; width: 40%; }

            /* Diffusion */
            .diff-flow { display: flex; align-items: center; justify-content: center; font-size: 0.8em; gap: 5px; margin-top: 5px; }
            .diff-step { width: 40px; height: 40px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 0.7em; background: #fff; }
            .diff-noise { background: #7f8c8d; color: white; }
            
            .comp-table { width: 100%; border-collapse: collapse; font-size: 0.85em; margin-top: 10px; }
            .comp-table th { background: #eee; border: 1px solid #ccc; padding: 5px; }
            .comp-table td { border: 1px solid #ccc; padding: 5px; }
            .good { color: #27ae60; font-weight: bold; }
            .bad { color: #c0392b; font-weight: bold; }
            
            .keyword-box { background:#f9f9f9; padding:8px; border-left:3px solid #f39c12; margin: 5px 0; font-size: 0.85em; }
        </style>

        <h3>■ 生成モデルの分類と仕組み</h3>
        <p>データ <i>x</i> の分布 <i>P(x)</i> を学習し、新しいデータを生み出します。</p>
        
        <div class="gen-container">
            <div class="gen-card">
                <div class="gen-title" style="border-color:#3498db;">VAE</div>
                <small>(変分オートエンコーダ)</small>
                <div style="margin: 10px 0; text-align:center;">
                    <div class="vae-flow">
                        <div class="vae-box">入</div>
                        <span>&rarr;</span>
                        <div style="font-size:0.7em;">Encoder<br>(&mu;, &sigma;)</div>
                        <span>&rarr;</span>
                        <div class="vae-z">z</div>
                        <span>&rarr;</span>
                        <div style="font-size:0.7em;">Decoder</div>
                        <span>&rarr;</span>
                        <div class="vae-box">出</div>
                    </div>
                </div>
                <p style="font-size:0.85em;">
                    入力を「確率分布（平均・分散）」に圧縮し、そこからサンプリングして復元。<br>
                    <strong>潜在空間 z が連続的</strong>になる。
                </p>
            </div>

            <div class="gen-card">
                <div class="gen-title" style="border-color:#e74c3c;">GAN</div>
                <small>(敵対的生成NW)</small>
                <div style="margin: 10px 0;">
                    <div class="gan-layout">
                        <div class="gan-g"><strong>G</strong><br>偽造者</div>
                        <div style="font-size:1.5em;">vs</div>
                        <div class="gan-d"><strong>D</strong><br>鑑定士</div>
                    </div>
                    <div style="text-align:center; font-size:0.8em; margin-top:5px;">
                        GはDを騙したい<br>DはGを見破りたい
                    </div>
                </div>
                <p style="font-size:0.85em;">
                    2つのNWが競い合う（Minimaxゲーム）。くっきりした画像が作れる。
                </p>
            </div>

            <div class="gen-card">
                <div class="gen-title" style="border-color:#27ae60;">拡散モデル</div>
                <small>(Diffusion Model)</small>
                <div style="margin: 10px 0; text-align:center;">
                    <div style="font-size:0.7em;">ノイズ除去 (生成) &rarr;</div>
                    <div class="diff-flow">
                        <div class="diff-step diff-noise">ノイズ</div>
                        <span>&rarr;</span>
                        <div class="diff-step" style="background:#eee;">少し<br>除去</div>
                        <span>&rarr;</span>
                        <div class="diff-step">画像</div>
                    </div>
                </div>
                <p style="font-size:0.85em;">
                    ノイズを徐々に除去する過程を学習。<br>
                    <strong>最高品質・多様性</strong>があるが、計算が遅い。
                </p>
            </div>
        </div>

        <h3>■ 3大モデルの比較</h3>
        <table class="comp-table">
            <tr><th>モデル</th><th>強み (Pros)</th><th>弱み (Cons)</th><th>主な用途</th></tr>
            <tr>
                <td><strong>VAE</strong></td>
                <td><span class="good">数学的に安定</span>。<br>潜在空間が綺麗。</td>
                <td><span class="bad">ぼやける</span>。<br>(平均化されるため)</td>
                <td>異常検知<br>特徴抽出</td>
            </tr>
            <tr>
                <td><strong>GAN</strong></td>
                <td><span class="good">くっきり高画質</span>。<br>生成速度が速い。</td>
                <td><span class="bad">学習が不安定</span>。<br><strong>モード崩壊</strong>が起きる。</td>
                <td>StyleGAN<br>Pix2Pix</td>
            </tr>
            <tr>
                <td><strong>拡散モデル</strong><br>(Diffusion)</td>
                <td><span class="good">最高品質・多様性</span>。<br>学習が安定。</td>
                <td><span class="bad">生成が遅い</span>。<br>(何度も計算が必要)</td>
                <td>DALL-E 2<br>Stable Diffusion</td>
            </tr>
        </table>

        <h3>■ E資格対策：重要キーワード</h3>
        <div class="keyword-box">
            <strong>1. VAEの損失関数 (ELBO)</strong><br>
            「再構成誤差（入力を復元したい）」＋「正則化項（zを正規分布に近づけたい）」の和。<br>
            ※正則化には <strong>KLダイバージェンス</strong> を使う。
        </div>
        <div class="keyword-box">
            <strong>2. Reparameterization Trick</strong><br>
            確率的なサンプリング操作は微分ができないため、ノイズ &epsilon; を外に出して式変形し、<strong>誤差逆伝播を可能にする</strong>テクニック。
        </div>
        <div class="keyword-box">
            <strong>3. GANの評価指標: FID</strong><br>
            Fréchet Inception Distance。<br>
            本物画像と生成画像の「特徴量の分布」の距離。<br>
            <strong>値が小さいほど良い</strong>（分布が似ている＝高品質）。
        </div>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q10
        // ---------------------------------------------------------
        {
            category: "生成モデルの定義",
            question: "識別モデルが P(y|x) を学習するのに対し、生成モデルが学習しようとする確率はどれか。",
            options: ["データの分布 P(x)", "事後確率 P(y|x)", "条件付き確率 P(x|y) のみ", "決定境界"],
            answer: 0,
            explanation: "生成モデルはデータそのものの分布を学習し、そこから新しいサンプル x を生成することを目指します。"
        },
        {
            category: "VAEの構造",
            question: "VAE (Variational Autoencoder) のEncoderが出力するものは何か。",
            options: ["潜在変数 z の確率分布のパラメータ（平均と分散）", "固定された潜在ベクトル", "復元された画像", "クラスラベル"],
            answer: 0,
            explanation: "入力を一点に圧縮するのではなく、「この辺りにあるはず」という分布（ガウス分布）のパラメータに変換します。"
        },
        {
            category: "Reparameterization Trick",
            question: "VAEにおいて「Reparameterization Trick」を用いる主な理由は何か。",
            options: ["確率的なサンプリング処理を含むネットワークでも、誤差逆伝播法による勾配計算を可能にするため", "計算速度を上げるため", "潜在変数の次元を減らすため", "過学習を防ぐため"],
            answer: 0,
            explanation: "確率的な部分を外部ノイズとして分離することで、平均や分散のパラメータに関して微分可能にします。"
        },
        {
            category: "GANの仕組み",
            question: "GAN (Generative Adversarial Networks) におけるGenerator (生成器) の目的は何か。",
            options: ["Discriminator (識別器) が「本物だ」と誤認するようなデータを生成すること", "Discriminatorの学習を助けること", "入力画像を正確に復元すること", "潜在変数を推定すること"],
            answer: 0,
            explanation: "Discriminatorを騙す（識別エラー率を最大化する）ことがGeneratorの勝利条件です（Minimaxゲーム）。"
        },
        {
            category: "モード崩壊",
            question: "GANの学習における失敗例の一つ「モード崩壊 (Mode Collapse)」とはどのような現象か。",
            options: ["Generatorが、特定のパターン（似たような画像）ばかりを生成し、多様性が失われる現象", "Generatorがノイズしか生成しなくなる現象", "Discriminatorが強くなりすぎて学習が止まる現象", "画像がぼやける現象"],
            answer: 0,
            explanation: "生成画像のバリエーションがなくなり、例えば「数字の7」しか出さなくなるような状態です。"
        },
        {
            category: "拡散モデルの概要",
            question: "拡散モデル (Diffusion Model) の画像生成プロセス（逆拡散過程）の基本的な動作はどれか。",
            options: ["完全なノイズ画像からスタートし、徐々にノイズを除去していき、鮮明な画像を生成する", "潜在変数から一発で画像を生成する", "2つの画像を合成する", "画像を圧縮する"],
            answer: 0,
            explanation: "学習時はノイズを徐々に加えて画像を破壊し、生成時はその逆手順（ノイズの予測・除去）を行います。"
        },
        {
            category: "VAEの弱点",
            question: "一般的に、GANと比較した際のVAEの生成画像の特徴（弱点）は何か。",
            options: ["全体的にぼやけた画像になりやすい", "ノイズが多すぎる", "幾何学的な歪みが生じやすい", "色が反転しやすい"],
            answer: 0,
            explanation: "再構成誤差を最小化する性質上、平均的な（無難な）画像を出力する傾向があり、高周波成分（詳細）が失われやすいです。"
        },
        {
            category: "DCGAN",
            question: "GANの学習を安定させるために、全結合層の代わりに畳み込み層を使用するなどしたアーキテクチャを何と呼ぶか。",
            options: ["DCGAN (Deep Convolutional GAN)", "StyleGAN", "CycleGAN", "BigGAN"],
            answer: 0,
            explanation: "Pooling層を廃止してStrided Convolutionを使う、Batch Normを入れるなどの指針を示し、GANの実用化に貢献しました。"
        },
        {
            category: "Pix2Pix",
            question: "「線画から着色画像」「航空写真から地図」のように、ペアとなる画像データを用いて変換を行うモデルはどれか。",
            options: ["Pix2Pix", "CycleGAN", "StyleGAN", "VAE"],
            answer: 0,
            explanation: "条件付きGAN (cGAN) の一種で、入力画像という条件のもとで目的の画像を生成します。ペアデータが必要です。"
        },
        {
            category: "CycleGAN",
            question: "Pix2Pixとは異なり、「ペアではない」画像データセット間（例：馬の集合とシマウマの集合）でのスタイル変換を可能にしたモデルはどれか。",
            options: ["CycleGAN", "DCGAN", "StarGAN", "BigGAN"],
            answer: 0,
            explanation: "「変換して、また元に戻したときに、元の画像と一致すべき」というサイクル一貫性損失 (Cycle Consistency Loss) を導入しました。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q20
        // ---------------------------------------------------------
        {
            category: "KLダイバージェンス(応用)",
            question: "VAEの損失関数に含まれる「KLダイバージェンス」項の役割は何か。",
            options: ["エンコーダが出力する分布を、事前分布（通常は標準正規分布）に近づける正則化", "画像をくっきりさせる", "再構成誤差を最小化する", "潜在変数の次元を増やす"],
            answer: 0,
            explanation: "これがないと、潜在変数がバラバラの場所に配置されてしまい、未知のデータを生成するための連続的な潜在空間が形成されません。"
        },
        {
            category: "GANの損失関数(応用)",
            question: "標準的なGANの損失関数は、数理的にはどのような距離の最小化と解釈できるか。",
            options: ["Jensen-Shannon (JS) ダイバージェンス", "KLダイバージェンス", "ユークリッド距離", "コサイン類似度"],
            answer: 0,
            explanation: "Discriminatorが最適なとき、Generatorの学習は本物分布と生成分布のJSダイバージェンスを最小化することと等価になります。"
        },
        {
            category: "FID (応用)",
            question: "生成モデルの評価指標「FID (Fréchet Inception Distance)」の特徴として正しいものはどれか。",
            options: ["実画像と生成画像の分布の距離を測る。値が「小さい」ほど高品質で多様性がある", "値が「大きい」ほど良い", "画像のピクセルごとの差を測る", "人間の主観評価と相関しない"],
            answer: 0,
            explanation: "平均と共分散行列を用いて2つのガウス分布間の距離を測ります。値が0に近いほど、生成画像は実画像に近いとみなされます。"
        },
        {
            category: "WGAN (応用)",
            question: "GANの学習不安定性を解消するために、「Wasserstein距離」を損失関数に導入したモデルは何か。",
            options: ["WGAN (Wasserstein GAN)", "DCGAN", "StyleGAN", "ProGAN"],
            answer: 0,
            explanation: "分布が重なっていなくても勾配が消失しないWasserstein距離を使うことで、学習が劇的に安定しました。"
        },
        {
            category: "拡散モデルの学習(応用)",
            question: "拡散モデル（DDPM）の学習時に、ニューラルネットワーク（U-Net等）が予測するターゲットは具体的に何か。",
            options: ["そのステップで画像に加えられた「ノイズ成分」", "ノイズ除去後の「きれいな画像」", "次のステップの画像", "画像のクラスラベル"],
            answer: 0,
            explanation: "「入力画像（ノイズ混じり）に含まれているノイズはこれくらいだ」と予測し、それを引き算することでノイズ除去を行います。"
        },
        {
            category: "Score-based Model(応用)",
            question: "拡散モデルと関連が深い「スコアベースモデル」において、学習する「スコア」とは何を指すか。",
            options: ["データ分布の対数確率密度の勾配", "画像の画質スコア", "分類の確信度", "ノイズの大きさ"],
            answer: 0,
            explanation: "データが存在する方向（密度の高い方向）を示すベクトル場を学習することで、ノイズだらけの空間からデータのある場所へ戻れるようにします。"
        },
        {
            category: "StyleGAN(応用)",
            question: "StyleGANの特徴的な構造である「Mapping Network」の役割は何か。",
            options: ["潜在変数 z を、より解きほぐされた中間潜在空間 w に変換し、スタイルの制御をしやすくする", "画像を生成する", "画像の解像度を上げる", "ノイズを除去する"],
            answer: 0,
            explanation: "正規分布からサンプリングされた z をそのまま使うのではなく、非線形変換した w を使うことで、特徴（髪の色や向きなど）を独立して操作しやすくしています。"
        },
        {
            category: "Conditional GAN(応用)",
            question: "「Conditional GAN (cGAN)」において、生成したい画像の条件（ラベルなど）はどのようにモデルに入力されるか。",
            options: ["GeneratorとDiscriminatorの「両方」に入力される", "Generatorのみに入力される", "Discriminatorのみに入力される", "損失関数のみに使われる"],
            answer: 0,
            explanation: "Dにも条件を見せることで、「（条件通りの）本物か？」を判定させます。これによりGは条件に沿った画像を生成するようになります。"
        },
        {
            category: "VQ-VAE(応用)",
            question: "「VQ-VAE」の特徴は何か。",
            options: ["潜在変数を連続値ではなく「離散的（デジタル）」なコードブックのベクトルとして扱う", "潜在変数をなくした", "GANと結合した", "時間を扱うことができる"],
            answer: 0,
            explanation: "潜在空間を離散化（量子化）することで、ぼやけを防ぎ、PixelCNNやTransformerなどの自己回帰モデルと組み合わせやすくしました。"
        },
        {
            category: "CLIP(応用)",
            question: "画像生成AI（Stable Diffusion等）で、テキストから画像を生成する際に重要な役割を果たすモデル「CLIP」は何を学習したものか。",
            options: ["画像とテキストのペアデータを使い、それぞれの特徴ベクトルが似た意味なら近くなるように対照学習したモデル", "画像からテキストを生成するモデル", "テキストから画像を生成するモデル", "画像の分類モデル"],
            answer: 0,
            explanation: "「テキスト」と「画像」を同じベクトル空間に埋め込むことができるため、拡散モデルの条件付け（テキストプロンプトの理解）に利用されます。"
        }
    ]
};
