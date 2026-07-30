window.quizSupplements = {
    "01_math_basics": {
        before: '<h3>■ 情報理論の重要概念</h3>',
        html: `
            <h3>■ 7概念は「何をしたいか」で使い分ける</h3>
            <p>式だけでなく、<strong>どんな場面で登場するか</strong>を簡単な例とセットで覚えましょう。</p>
            <table>
                <tr><th>概念</th><th>数式・何を知りたい？</th><th>脳内イメージ・使われる場面</th></tr>
                <tr>
                    <td><strong>最尤推定<br>(MLE)</strong></td>
                    <td>$\\hat{\\theta}_{MLE}=\\arg\\max_\\theta P(D|\\theta)$<br>観測データを最も起こしやすくする値は？</td>
                    <td><strong>「実績だけで決める」</strong><br>・例：広告が10回中3回クリックされた → クリック率を0.3と見積もる。<br>・場面：モデルのパラメータを<strong>学習データに合うように</strong>決める。</td>
                </tr>
                <tr>
                    <td><strong>MAP推定</strong></td>
                    <td>$\\hat{\\theta}_{MAP}=\\arg\\max_\\theta P(D|\\theta)P(\\theta)$<br>データと事前知識を合わせた最有力値は？</td>
                    <td><strong>「実績 ＋ 常識で決める」</strong><br>・例：新しい広告が1回中1回クリックされても、すぐにクリック率100%とは決めない。<br>・場面：データが少ないとき、<strong>事前知識をブレーキ</strong>にして極端な推定を抑える。</td>
                </tr>
                <tr>
                    <td><strong>ベイズ推定</strong></td>
                    <td>$P(\\theta|D)=\\frac{P(D|\\theta)P(\\theta)}{P(D)}$<br>各候補はそれぞれ何%ありそう？</td>
                    <td><strong>「新情報で確信度を更新する」</strong><br>・例：障害原因Aが60%・Bが40% → 新しいログを見てAが80%・Bが20%へ更新。<br>・場面：答えを1つに断定せず、<strong>不確実性も残して</strong>判断する。</td>
                </tr>
                <tr>
                    <td><strong>エントロピー</strong></td>
                    <td>$H(P)=-\\sum_x P(x)\\log P(x)$<br>結果が分かるまで、どれくらい迷う？</td>
                    <td><strong>「選択肢の迷い具合」</strong><br>・例：犬50%・猫50%は迷いが大きく、犬100%なら迷いは0。<br>・場面：分類結果の不確実性や、<strong>決定木の分割前後の乱雑さ</strong>を測る。</td>
                </tr>
                <tr>
                    <td><strong>クロス<br>エントロピー</strong></td>
                    <td>$H(P,Q)=-\\sum_x P(x)\\log Q(x)$<br>予測は正解から見て、どれくらい悪い？</td>
                    <td><strong>「自信満々の間違いを強く叱る」</strong><br>・例：正解が犬なのに、犬の確率を0.9なら小さな罰、0.1なら大きな罰。<br>・場面：画像分類などのモデルを学習する<strong>損失関数</strong>。</td>
                </tr>
                <tr>
                    <td><strong>KLダイバー<br>ジェンス</strong></td>
                    <td>$D_{KL}(P||Q)=\\sum_x P(x)\\log\\frac{P(x)}{Q(x)}$<br>分布 $Q$ は基準 $P$ からどれくらいずれた？</td>
                    <td><strong>「2つの確率分布のずれ」</strong><br>・例：正解の犬80%・猫20%に、予測の犬75%・猫25%がどれだけ近いかを見る。<br>・場面：予測分布を目標分布へ近づける学習や、<strong>VAE</strong>の正則化。</td>
                </tr>
                <tr>
                    <td><strong>相互情報量</strong></td>
                    <td>$I(X;Y)=H(X)-H(X|Y)$<br>$Y$ を知ると $X$ の迷いがどれだけ減る？</td>
                    <td><strong>「その情報、答えの役に立つ？」</strong><br>・例：天気を知ると「傘を持つか」の迷いがどれだけ減るか。<br>・場面：役立つ特徴量の選択や、<strong>決定木の分割</strong>を選ぶ。</td>
                </tr>
            </table>
        `
    }
};
