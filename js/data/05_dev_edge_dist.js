window.quizData = {
    title: "5-（１）エッジコンピューティング・5-（２）分散処理",

    cheatSheet: `
        <style>
            .edge-core { background:#eef8f8; border-left:5px solid #35b9c5; border-radius:0 10px 10px 0; padding:14px 18px; margin:12px 0 22px; }
            .edge-note { background:#fff8e8; border-left:5px solid #f39c12; border-radius:0 10px 10px 0; padding:12px 16px; margin:12px 0 22px; }
            .edge-formula { background:#f7f9fc; border:1px solid #d9e2ec; border-radius:8px; padding:11px 14px; margin:10px 0 22px; overflow-x:auto; }
            .edge-table-wrap { overflow-x:auto; margin:12px 0 22px; }
            .edge-table { width:100%; min-width:760px; border-collapse:collapse; }
            .edge-table th { background:#eaf2fb; color:#102a43; text-align:left; padding:10px; border:1px solid #d9e2ec; }
            .edge-table td { padding:10px; border:1px solid #d9e2ec; vertical-align:top; }
            .edge-visual-wrap { overflow-x:auto; margin:14px 0 22px; }
            .edge-visual-card { min-width:990px; border:1px solid #d9e2ec; border-radius:12px; background:#fff; padding:12px; box-sizing:border-box; }
            .edge-wide-svg { display:block; width:100%; min-width:960px; height:auto; }
            .edge-svg-title { font-size:16px; font-weight:700; fill:#102a43; }
            .edge-svg-label { font-size:13px; font-weight:700; fill:#102a43; }
            .edge-svg-note { font-size:12px; fill:#334e68; }
            .edge-svg-mini { font-size:11px; fill:#486581; }
            .edge-box { fill:#fff; stroke:#cbd5e1; stroke-width:1.5; }
            .edge-blue { fill:#eef7fb; stroke:#2780b8; stroke-width:1.5; }
            .edge-green { fill:#eafaf1; stroke:#27ae60; stroke-width:1.5; }
            .edge-orange { fill:#fff8e7; stroke:#f39c12; stroke-width:1.5; }
            .edge-purple { fill:#f7f0ff; stroke:#8e44ad; stroke-width:1.5; }
            .edge-gray { fill:#f1f5f9; stroke:#94a3b8; stroke-width:1.5; }
            .edge-caption { margin:8px 8px 0; color:#334e68; }
        </style>

        <h3>■ まず全体：「何がボトルネックか」で選ぶ</h3>
        <div class="edge-core">この章は、<strong>端末の制約を解く軽量化</strong>と、<strong>複数deviceで学習を分担する分散処理</strong>の2本です。</div>
        <div class="edge-note"><strong>先に略語：</strong>GPU＝Graphics Processing Unit（画像処理装置）、FP32＝32-bit Floating Point（32ビット浮動小数点）、INT8＝8-bit Integer（8ビット整数）です。</div>
        <div class="edge-note"><strong>先に用語：</strong>Edge＝データが生まれる場所の近く、gateway＝端末とserverをつなぐ中継装置、logit＝Softmax前のクラス得点、activation＝層の中間出力、sparsity＝0にした割合、worker＝計算を担当するdevice、throughput＝単位時間あたりの処理量です。</div>
        <div class="edge-table-wrap"><table class="edge-table">
            <tr><th>困っていること</th><th>選ぶ考え方</th><th>中心語</th></tr>
            <tr><td>cloud往復の遅延・通信量を減らしたい</td><td>データの近くで処理</td><td><strong>Edge Computing</strong></td></tr>
            <tr><td>不要な重み・channelが多い</td><td>重要度の低い部分を削る</td><td><strong>Pruning</strong></td></tr>
            <tr><td>数値表現のbit数が大きい</td><td>FP32などをINT8などへ変換</td><td><strong>Quantization</strong></td></tr>
            <tr><td>小型modelだけでは精度が不足</td><td>大きな教師の答え方を小さな生徒へ</td><td><strong>Distillation</strong></td></tr>
            <tr><td>data量が多く、学習を並列化したい</td><td>同じmodelへ異なるdata</td><td><strong>Data Parallelism</strong></td></tr>
            <tr><td>modelが1台のmemoryへ載らない</td><td>model自体を複数台へ分割</td><td><strong>Model Parallelism</strong></td></tr>
        </table></div>

        <h3>■ エッジコンピューティング：近くで処理するために軽くする</h3>
        <div class="edge-visual-wrap"><div class="edge-visual-card">
            <svg class="edge-wide-svg" viewBox="0 0 960 590" role="img" aria-labelledby="edge-light-title edge-light-desc">
                <title id="edge-light-title">クラウドとエッジの違い、および3つの軽量化手法</title>
                <desc id="edge-light-desc">クラウドへ送る処理とデータ近くで処理するエッジを比較し、枝刈り、量子化、蒸留の違いを示す。</desc>
                <defs><marker id="edge-arrow-light" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                <text x="20" y="28" class="edge-svg-title">CloudとEdge：計算する場所が違う</text>

                <rect x="20" y="48" width="920" height="142" rx="12" class="edge-blue"></rect>
                <text x="40" y="76" class="edge-svg-label">Cloud Computing：データを遠隔serverへ送り、強力な計算資源で処理</text>
                <rect x="54" y="100" width="100" height="54" rx="8" class="edge-box"></rect>
                <text x="72" y="132" class="edge-svg-note">Sensor / 端末</text>
                <line x1="162" y1="127" x2="213" y2="127" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-light)"></line>
                <text x="169" y="111" class="edge-svg-mini">Network</text>
                <rect x="225" y="91" width="174" height="72" rx="8" class="edge-purple"></rect>
                <text x="254" y="120" class="edge-svg-label">Cloud Server</text><text x="254" y="145" class="edge-svg-note">大きなmodelで推論</text>
                <line x1="407" y1="127" x2="458" y2="127" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-light)"></line>
                <rect x="470" y="100" width="96" height="54" rx="8" class="edge-green"></rect><text x="492" y="132" class="edge-svg-note">結果</text>
                <text x="605" y="112" class="edge-svg-note">強み：大きな計算資源・集中管理</text>
                <text x="605" y="137" class="edge-svg-note">注意：通信遅延・回線依存・生データ送信</text>
                <text x="605" y="162" class="edge-svg-mini">※用途に応じてEdgeと使い分ける</text>

                <rect x="20" y="208" width="920" height="154" rx="12" class="edge-green"></rect>
                <text x="40" y="237" class="edge-svg-label">Edge Computing：端末・gateway・近くのserverで処理</text>
                <rect x="54" y="267" width="100" height="58" rx="8" class="edge-box"></rect><text x="72" y="301" class="edge-svg-note">Sensor / 端末</text>
                <line x1="162" y1="296" x2="213" y2="296" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-light)"></line>
                <rect x="225" y="258" width="180" height="76" rx="8" class="edge-orange"></rect><text x="249" y="286" class="edge-svg-label">端末内の軽量model</text><text x="249" y="312" class="edge-svg-note">データの近くで推論</text>
                <line x1="413" y1="296" x2="464" y2="296" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-light)"></line>
                <rect x="476" y="267" width="96" height="58" rx="8" class="edge-blue"></rect><text x="498" y="301" class="edge-svg-note">結果</text>
                <text x="610" y="269" class="edge-svg-note">利点：低遅延・offline動作・通信量削減</text>
                <text x="610" y="296" class="edge-svg-note">利点：生データを外へ出す量を減らせる</text>
                <text x="610" y="323" class="edge-svg-note">制約：memory・演算性能・電力予算が限られる</text>
                <text x="610" y="346" class="edge-svg-mini">※privacyを保証するわけではない</text>

                <text x="20" y="392" class="edge-svg-title">制約の厳しい端末へ載せる3手法</text>
                <rect x="20" y="410" width="292" height="154" rx="12" class="edge-purple"></rect>
                <text x="40" y="439" class="edge-svg-label">Pruning（プルーニング／枝刈り）</text>
                <text x="42" y="470" class="edge-svg-note">100個の重み・channel</text><line x1="174" y1="465" x2="220" y2="465" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-light)"></line><text x="230" y="470" class="edge-svg-note">必要な40個</text>
                <text x="40" y="508" class="edge-svg-note">importanceの低い部分を削る</text><text x="40" y="535" class="edge-svg-mini">疎な重み／小さい構造へ</text>

                <rect x="334" y="410" width="292" height="154" rx="12" class="edge-blue"></rect>
                <text x="354" y="439" class="edge-svg-label">Quantization（量子化）</text>
                <rect x="360" y="460" width="112" height="32" rx="6" class="edge-purple"></rect><text x="380" y="481" class="edge-svg-note">FP32：32bit</text>
                <line x1="480" y1="476" x2="521" y2="476" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-light)"></line>
                <rect x="533" y="460" width="66" height="32" rx="6" class="edge-orange"></rect><text x="546" y="481" class="edge-svg-note">INT8</text>
                <text x="354" y="521" class="edge-svg-note">重み・activationのbit数を減らす</text><text x="354" y="545" class="edge-svg-mini">raw格納量↓／精度・hardwareに注意</text>

                <rect x="648" y="410" width="292" height="154" rx="12" class="edge-orange"></rect>
                <text x="668" y="439" class="edge-svg-label">Distillation（蒸留）</text>
                <rect x="672" y="458" width="88" height="54" rx="8" class="edge-purple"></rect><text x="687" y="481" class="edge-svg-note">Teacher</text><text x="692" y="501" class="edge-svg-mini">大きい</text>
                <line x1="768" y1="485" x2="811" y2="485" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-light)"></line><text x="766" y="468" class="edge-svg-mini">soft target</text>
                <rect x="823" y="458" width="88" height="54" rx="8" class="edge-green"></rect><text x="836" y="481" class="edge-svg-note">Student</text><text x="842" y="501" class="edge-svg-mini">小さい</text>
                <text x="668" y="538" class="edge-svg-note">答え方を真似る。推論はStudentだけ</text>
            </svg>
            <p class="edge-caption"><strong>覚え方：</strong>Pruning＝削る、Quantization＝bitを減らす、Distillation＝大きなTeacherの答え方を小さなStudentへ移す。</p>
        </div></div>

        <div class="edge-table-wrap"><table class="edge-table">
            <tr><th>手法</th><th>何を変えるか</th><th>主な効果</th><th>試験の注意</th></tr>
            <tr><td><strong>Pruning</strong></td><td>重み・channel・filterなどを削る</td><td>疎な重み、または小さい構造</td><td>Unstructuredは疎演算対応がないと高速化しない場合がある。</td></tr>
            <tr><td><strong>Quantization</strong></td><td>重み／activationの数値bit幅</td><td>格納量・memory帯域・対応演算costを削減</td><td>高速化はhardware依存。scale等のoverheadもある。</td></tr>
            <tr><td><strong>Distillation</strong></td><td>小さなStudentの学習方法</td><td>Teacherのclass間情報を継承</td><td>重みcopyではない。典型的にはsoft targetとhard labelを併用。</td></tr>
        </table></div>
        <div class="edge-table-wrap"><table class="edge-table">
            <tr><th>混同しやすい組</th><th>違い</th></tr>
            <tr><td><strong>Unstructured／Structured Pruning</strong></td><td>個々の重みを疎にする／channel・filter等を単位ごと削り、dense hardwareでも高速化しやすい。</td></tr>
            <tr><td><strong>PTQ／QAT</strong></td><td>PTQ（Post-Training Quantization）は学習後に変換。QAT（Quantization-Aware Training）は学習中に量子化誤差を模擬。</td></tr>
            <tr><td><strong>Soft／Hard target</strong></td><td>Teacherの確率分布／人が与えた正解label。典型的な蒸留では両方を使う。</td></tr>
        </table></div>
        <div class="edge-formula"><strong>計算で使う公式</strong><br>
            残存要素数：$N_{remain}=N(1-s)$（sはsparsity／削除率）<br>
            raw格納量：$M_{new}=M_{old}\\times b_{new}/b_{old}$<br>
            一様量子化：$q=\\operatorname{clip}(\\operatorname{round}(x/s)+z_q,\,q_{min},\,q_{max})$（$s$はscale、$z_q$はzero point）<br>
            温度付きSoftmax：$p_i(T)=\\exp(\\ell_i/T)\,/\,\\sum_j\\exp(\\ell_j/T)$（$\\ell_i$はlogit、$T>1$で平坦）
        </div>

        <h3>■ 分散深層学習：データを分けるか、モデルを分けるか</h3>
        <div class="edge-visual-wrap"><div class="edge-visual-card">
            <svg class="edge-wide-svg" viewBox="0 0 960 510" role="img" aria-labelledby="edge-parallel-title edge-parallel-desc">
                <title id="edge-parallel-title">データ並列とモデル並列の比較</title>
                <desc id="edge-parallel-desc">同じモデルへ異なるデータを与えて勾配を集約するデータ並列と、大きなモデルを複数GPUへ分けるモデル並列を示す。</desc>
                <defs><marker id="edge-arrow-parallel" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#486581"></path></marker></defs>
                <text x="20" y="28" class="edge-svg-title">Distributed Deep Learning（分散深層学習）＝複数deviceで学習を分担</text>

                <rect x="20" y="48" width="450" height="430" rx="12" class="edge-blue"></rect>
                <text x="40" y="78" class="edge-svg-label">Data Parallelism：同じmodel × 異なるmini-batch</text>
                <rect x="49" y="108" width="100" height="44" rx="8" class="edge-box"></rect><text x="77" y="136" class="edge-svg-note">Data D1</text>
                <rect x="185" y="108" width="100" height="44" rx="8" class="edge-box"></rect><text x="213" y="136" class="edge-svg-note">Data D2</text>
                <rect x="321" y="108" width="100" height="44" rx="8" class="edge-box"></rect><text x="349" y="136" class="edge-svg-note">Data D3</text>
                <line x1="99" y1="160" x2="99" y2="194" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line><line x1="235" y1="160" x2="235" y2="194" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line><line x1="371" y1="160" x2="371" y2="194" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line>
                <rect x="49" y="206" width="100" height="72" rx="8" class="edge-purple"></rect><text x="70" y="233" class="edge-svg-note">GPU 1</text><text x="65" y="258" class="edge-svg-label">Model M</text>
                <rect x="185" y="206" width="100" height="72" rx="8" class="edge-purple"></rect><text x="206" y="233" class="edge-svg-note">GPU 2</text><text x="201" y="258" class="edge-svg-label">Model M</text>
                <rect x="321" y="206" width="100" height="72" rx="8" class="edge-purple"></rect><text x="342" y="233" class="edge-svg-note">GPU 3</text><text x="337" y="258" class="edge-svg-label">Model M</text>
                <line x1="99" y1="286" x2="192" y2="330" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line><line x1="235" y1="286" x2="235" y2="322" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line><line x1="371" y1="286" x2="278" y2="330" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line>
                <rect x="164" y="334" width="142" height="58" rx="8" class="edge-green"></rect><text x="184" y="358" class="edge-svg-note">Gradient集約</text><text x="188" y="381" class="edge-svg-mini">平均などで同期</text>
                <line x1="235" y1="400" x2="235" y2="428" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line>
                <text x="80" y="454" class="edge-svg-note">全GPUを同じ更新後modelへそろえる</text><text x="80" y="472" class="edge-svg-mini">通信：gradient／parameter。throughput向上に使う。</text>

                <rect x="490" y="48" width="450" height="430" rx="12" class="edge-orange"></rect>
                <text x="510" y="78" class="edge-svg-label">Model Parallelism：1つの大きなmodelを分割</text>
                <rect x="522" y="112" width="104" height="68" rx="8" class="edge-purple"></rect><text x="545" y="139" class="edge-svg-note">GPU 1</text><text x="539" y="163" class="edge-svg-label">Block 1</text>
                <line x1="634" y1="146" x2="674" y2="146" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line><text x="639" y="129" class="edge-svg-mini">activation</text>
                <rect x="686" y="112" width="104" height="68" rx="8" class="edge-blue"></rect><text x="709" y="139" class="edge-svg-note">GPU 2</text><text x="703" y="163" class="edge-svg-label">Block 2</text>
                <line x1="798" y1="146" x2="838" y2="146" stroke="#486581" stroke-width="2" marker-end="url(#edge-arrow-parallel)"></line>
                <rect x="850" y="112" width="66" height="68" rx="8" class="edge-green"></rect><text x="866" y="139" class="edge-svg-note">GPU 3</text><text x="860" y="163" class="edge-svg-mini">Block 3</text>
                <text x="520" y="220" class="edge-svg-label">代表的な分け方</text>
                <rect x="526" y="244" width="176" height="82" rx="8" class="edge-box"></rect><text x="548" y="271" class="edge-svg-label">Pipeline Parallel</text><text x="548" y="298" class="edge-svg-note">層・block単位で分割</text>
                <rect x="728" y="244" width="176" height="82" rx="8" class="edge-box"></rect><text x="757" y="271" class="edge-svg-label">Tensor Parallel</text><text x="750" y="298" class="edge-svg-note">行列・tensor内を分割</text>
                <text x="528" y="363" class="edge-svg-note">目的：1台に載らないmodelを複数deviceへ配置</text>
                <text x="528" y="393" class="edge-svg-note">通信：分割境界のactivation・gradient・tensor</text>
                <text x="528" y="423" class="edge-svg-note">注意：通信待ち・memoryの偏り・pipeline bubble</text>
                <text x="528" y="453" class="edge-svg-mini">※層分割は一例。model並列＝層分割だけではない</text>
            </svg>
            <p class="edge-caption"><strong>一言で：</strong>Data Parallelismはmodelを複製、Model Parallelismはmodelを分割します。</p>
        </div></div>

        <div class="edge-table-wrap"><table class="edge-table">
            <tr><th>比較軸</th><th>Data Parallelism</th><th>Model Parallelism</th></tr>
            <tr><td>各GPUのmodel</td><td>同じmodelを複製</td><td>modelの一部を保持</td></tr>
            <tr><td>各GPUのdata</td><td>異なるmini-batch</td><td>同じ計算graphのdataが分割間を流れる</td></tr>
            <tr><td>代表的な通信</td><td>gradientを集約し更新を同期</td><td>activation・gradient・tensorを分割境界で通信</td></tr>
            <tr><td>向く場面</td><td>学習throughputを上げたい</td><td>modelが1台のmemoryへ載らない</td></tr>
            <tr><td>主な注意</td><td>通信量・遅いworker待ち・巨大global batch</td><td>通信待ち・負荷分散・pipeline bubble</td></tr>
        </table></div>
        <div class="edge-formula"><strong>分散処理の計算公式</strong><br>
            Global batch：$B_{global}=B_{local}\\times N_{worker}$<br>
            平均gradient：$g_{avg}=\\frac{1}{N}\\sum_{k=1}^{N}g_k$<br>
            単純分割の理想parameter格納量：$M_{device}=M_{model}/N_{device}$（activation・optimizer・偏り等は無視）
        </div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="edge-table-wrap"><table class="edge-table">
            <tr><th>問題文の合図</th><th>答える語</th><th>一言理由</th></tr>
            <tr><td>データ発生源の近くで処理</td><td><strong>Edge Computing</strong></td><td>cloud往復を減らし、低遅延・offline動作へ。</td></tr>
            <tr><td>importanceの低い重み・channelを削る</td><td><strong>Pruning</strong></td><td>枝刈りで疎または小さいmodelへ。</td></tr>
            <tr><td>個々の重みを0へ／channel単位で削る</td><td><strong>Unstructured／Structured</strong></td><td>疎演算が必要／dense演算でも高速化しやすい。</td></tr>
            <tr><td>FP32をINT8などへ</td><td><strong>Quantization</strong></td><td>bit幅を減らし格納量・memory帯域を削減。</td></tr>
            <tr><td>学習後／学習中に量子化誤差を模擬</td><td><strong>PTQ／QAT</strong></td><td>PTQは手軽、QATは精度を保ちやすい。</td></tr>
            <tr><td>Teacherのsoft targetをStudentへ</td><td><strong>Distillation</strong></td><td>class間の類似度を小型modelへ伝える。</td></tr>
            <tr><td>同じmodel・異なるmini-batch</td><td><strong>Data Parallelism</strong></td><td>gradientを集約して同じ重みへ更新。</td></tr>
            <tr><td>1台に載らないmodelを分割</td><td><strong>Model Parallelism</strong></td><td>layer・tensor等を複数GPUへ配置。</td></tr>
            <tr><td>複数deviceで深層学習を分担</td><td><strong>Distributed Deep Learning</strong></td><td>dataまたはmodelを分けて学習。</td></tr>
        </table></div>
    `,

    questions: [
        { id:"edge-computing-location", category:"エッジコンピューティング", question:"Edge Computingの説明として最も適切なものはどれか。", options:["データが生まれる場所の近くにある端末・gateway・edge serverなどで処理する", "必ず遠隔cloudだけで処理する", "GPUを使わないAIの総称", "最先端のAIだけを指す"], answer:0, explanation:"Edgeは端末だけに限定されず、gatewayや近くのserverも含みます。Cloudと協調する構成もあります。" },
        { id:"edge-benefits", category:"エッジの利点", question:"Cloudだけで処理する場合と比べたEdge Computingの代表的な利点はどれか。", options:["cloud往復の遅延・通信量・生データ送信を減らしやすい", "計算資源が必ず無限になる", "privacyが必ず完全に保証される", "大規模学習が必ず高速になる"], answer:0, explanation:"データの近くで推論するため低遅延やoffline動作に向きます。ただし端末自体の安全性やmodel更新など別のriskは残ります。" },
        { id:"edge-constraints", category:"エッジの制約", question:"Edge deviceへ深層学習modelを載せる際の代表的な制約はどれか。", options:["利用できるmemory・演算性能・電力予算が限られる", "network帯域が常に無限", "model sizeに制限がない", "batteryを考えなくてよい"], answer:0, explanation:"端末では利用できるmemory・演算性能・電力予算が限られ、発熱にも制約があります。そのためPruning・Quantization・Distillationが重要になります。" },
        { id:"edge-privacy-caveat", category:"エッジの注意", question:"Edge処理とprivacyの関係について正しいものはどれか。", options:["生データを外へ送る量は減らせるが、端末攻撃などもありprivacyを自動保証するわけではない", "Edgeなら必ず情報漏えいが0になる", "Cloudより必ず危険である", "privacyとは無関係である"], answer:0, explanation:"通信を減らすことはprivacy上の利点ですが、端末保護・更新・保存dataなど別の対策も必要です。" },
        { id:"edge-method-matching", category:"軽量化手法の識別", question:"Pruning・Quantization・Distillationの対応として正しいものはどれか。", options:["Pruning＝削る、Quantization＝bit幅を減らす、Distillation＝Teacherの答え方をStudentへ伝える", "Pruning＝bit幅、Quantization＝教師と生徒、Distillation＝枝刈り", "3つとも同じ処理", "3つともdataを増やす手法"], answer:0, explanation:"何を小さくするかで見分けます。構造、数値表現、学習方法の違いです。" },
        { id:"edge-pruning-definition", category:"Pruning", question:"Pruning（枝刈り）の説明として正しいものはどれか。", options:["importanceの低い重み・channel・filterなどを削る", "すべての重みを0にする", "学習dataを削除する", "bit数だけを変える"], answer:0, explanation:"重みの絶対値は代表的なimportance基準の一つです。小さい重みだけが唯一の基準ではありません。" },
        { id:"edge-structured-unstructured", category:"Pruningの種類", question:"Structured PruningとUnstructured Pruningの違いとして正しいものはどれか。", options:["Structuredはchannel等を単位ごと削り、Unstructuredは個々の重みを疎にする", "Structuredはdataを削る", "Unstructuredはmodel全体を削除する", "両者に違いはない"], answer:0, explanation:"Structuredは通常のdense演算でも形状が小さくなるため高速化へつなげやすく、Unstructuredは高いsparsityを作りやすい特徴があります。" },
        { id:"edge-pruning-speed-caveat", category:"Pruningの注意", question:"Unstructured Pruningで重みを多数0にしたが、推論時間がほぼ短くならなかった。主な理由はどれか。", options:["hardware・libraryが疎演算を効率化していない可能性がある", "0はFP32より重い", "Pruningは精度だけを上げる", "data並列が必須"], answer:0, explanation:"0が多くてもdense演算をそのまま行えば計算を飛ばせません。実速度は疎形式とkernelの対応に依存します。" },
        { id:"edge-pruning-calc", category:"Pruning（計算）", kind:"計算", question:"2,000,000個の重みを75% Pruningした。残る重みはいくつか。", options:["500,000個", "1,500,000個", "750,000個", "2,000,000個"], answer:0, explanation:"<strong>使う公式（残存数）：</strong><br>$N_{remain}=N(1-s)$<br><br><strong>代入：</strong>$2{,}000{,}000\\times(1-0.75)=500{,}000$。<br><strong>答え：</strong>500,000個です。" },
        { id:"edge-quantization-definition", category:"Quantization", question:"Quantization（量子化）の対象として最も適切なものはどれか。", options:["重みやactivationの数値表現bit幅", "学習dataの件数だけ", "networkの層数だけ", "正解labelだけ"], answer:0, explanation:"FP32の重みやactivationをINT8などへ変換します。対象はparameterだけとは限りません。" },
        { id:"edge-quantization-memory-calc", category:"Quantization（計算）", kind:"計算", question:"重みだけで400MBのFP32 modelをINT8へ量子化する。overheadを無視したraw格納量はいくつか。", options:["100MB", "200MB", "400MB", "50MB"], answer:0, explanation:"<strong>使う公式（bit幅による格納量）：</strong><br>$M_{new}=M_{old}\\times b_{new}/b_{old}$<br><br><strong>代入：</strong>$400\\times8/32=100$MB。<br><strong>答え：</strong>100MBです。model全体ではscale等のoverheadや未量子化部分があります。" },
        { id:"edge-uniform-quantization-calc", category:"Quantization（計算）", kind:"計算", question:"一様量子化で、整数範囲内に収まると仮定して$q=\\operatorname{round}(x/s)+z_q$とする。$x=1.0,s=0.25,z_q=0$のときqはいくつか。", options:["4", "0.25", "1", "8"], answer:0, explanation:"<strong>使う公式（一様量子化）：</strong><br>$q=\\operatorname{round}(x/s)+z_q$（整数範囲内を仮定）<br><br>$s$はscale、$z_q$はzero pointです。<strong>代入：</strong>$q=\\operatorname{round}(1.0/0.25)+0=4$。<br><strong>答え：</strong>4です。通常は最後に整数範囲へclipします。" },
        { id:"edge-ptq-qat", category:"PTQ・QAT", question:"PTQとQATの違いとして正しいものはどれか。", options:["PTQは学習後に量子化し、QATは学習中に偽量子化で誤差を模擬する", "PTQだけが学習中に使われる", "QATは量子化しない", "両者はPruningの種類"], answer:0, explanation:"PTQ（Post-Training Quantization）は手軽です。QAT（Quantization-Aware Training）は再学習が必要ですが、量子化後の精度を保ちやすい方法です。" },
        { id:"edge-quantization-calibration", category:"量子化のscale", question:"量子化のcalibrationで主に決めるものはどれか。", options:["実数値を整数範囲へ対応させるscaleやzero point", "modelのclass数", "Pruningのchannel数だけ", "GPUの台数"], answer:0, explanation:"代表dataの値域を観測し、浮動小数点値と整数値の対応関係を決めます。zero pointは実数0に対応する整数値です。" },
        { id:"edge-quantization-speed-caveat", category:"量子化の注意", question:"INT8量子化を行えば、どの環境でも必ず4倍高速になるという説明が誤りである理由はどれか。", options:["対応INT8 hardware・kernel、memory bottleneck、変換overheadで実速度が変わる", "INT8は32bitだから", "量子化はdata数を増やすから", "INT8では推論できないから"], answer:0, explanation:"raw要素の格納bit数は1/4ですが、model全体のsizeと処理時間が必ず1/4になるわけではありません。" },
        { id:"edge-distillation-soft-target", category:"Distillation", question:"Knowledge DistillationでTeacherからStudentへ伝える代表的な知識はどれか。", options:["正解以外のclassも含む出力確率分布（soft target）", "Teacherの全重みをそのままcopy", "TeacherのGPU", "学習dataのfile名"], answer:0, explanation:"soft targetには『犬0.7、猫0.2』のようなclass間の似ている度合いが含まれます。単なるweight copyではありません。" },
        { id:"edge-distillation-hard-soft", category:"Distillation", question:"典型的なKnowledge DistillationのStudent学習について正しいものはどれか。", options:["Teacherのsoft targetと正解labelのhard targetを重み付けして使う", "soft targetだけしか使えない", "正解labelを必ず捨てる", "Studentは学習しない"], answer:0, explanation:"Teacherを真似るlossと本来のtask lossを組み合わせる構成が代表的です。" },
        { id:"edge-distillation-temperature", category:"温度付きSoftmax", question:"DistillationでSoftmaxのtemperature Tを1より大きくすると、Teacherの出力分布は一般にどうなるか。", options:["平坦になり、小さなclass確率の関係が見えやすくなる", "必ずone-hotになる", "全確率が0になる", "class数が減る"], answer:0, explanation:"logitをTで割るため差が縮まり、分布がsoftになります。Studentへclass間情報を伝えやすくします。" },
        { id:"edge-distillation-temperature-calc", category:"温度付きSoftmax（計算）", kind:"計算", question:"2classのlogitが[2,0]、temperature T=2。$e\\approx2.718$として第1class確率はいくつか。", options:["約0.731", "約0.881", "0.500", "1.000"], answer:0, explanation:"<strong>使う公式（温度付きSoftmax）：</strong><br>$p_1=\\frac{\\exp(2/2)}{\\exp(2/2)+\\exp(0/2)}$<br><br><strong>代入：</strong>$p_1=e/(e+1)=2.718/3.718\\approx0.731$。<br><strong>答え：</strong>約0.731です。T=1の約0.881より平坦です。" },
        { id:"edge-distillation-inference", category:"Distillation", question:"Distillation後の通常の推論時に使うmodelはどれか。", options:["Student modelだけ", "Teacher modelだけ", "TeacherとStudentを必ず両方", "どちらも使わない"], answer:0, explanation:"学習時にTeacherから知識を受け取り、配備時には小さいStudentだけで推論するのが軽量化の目的です。" },
        { id:"dist-deep-learning-definition", category:"分散深層学習", question:"Distributed Deep Learningの説明として最も適切なものはどれか。", options:["複数の計算deviceへdataやmodelの計算を分担して学習する", "1台のCPUだけで推論する", "学習dataを公開する", "modelを必ず量子化する"], answer:0, explanation:"代表的な分担方法がData ParallelismとModel Parallelismです。両者を組み合わせる場合もあります。" },
        { id:"dist-data-parallel", category:"Data Parallelism", question:"Data Parallelismの構成として正しいものはどれか。", options:["各GPUに同じmodelを置き、異なるmini-batchを処理してgradientを集約する", "modelを必ず層ごとに分割する", "各GPUが異なるtaskだけを学ぶ", "gradientを共有しない"], answer:0, explanation:"各GPUのmodelを同じ重みに保つため、計算したgradientを平均するなどして同期します。" },
        { id:"dist-model-parallel", category:"Model Parallelism", question:"Model Parallelismが特に必要となる場面はどれか。", options:["modelが大きすぎて1台のGPU memoryへ載らない", "dataが1件しかない", "推論結果を説明したい", "labelが少ない"], answer:0, explanation:"modelのparameterや計算を複数deviceへ分けます。層分割だけでなくtensor分割もあります。" },
        { id:"dist-communication-compare", category:"並列方式の通信", question:"Data ParallelismとModel Parallelismの典型的な通信内容はどれか。", options:["Data並列＝gradient集約、Model並列＝分割境界のactivationやtensor", "両者とも通信しない", "Data並列＝file名だけ", "Model並列＝正解labelだけ"], answer:0, explanation:"Data並列はmodel replicaを同じ重みへそろえます。Model並列は計算がdevice境界をまたぐため中間値を渡します。" },
        { id:"dist-global-batch-calc", category:"Data Parallelism（計算）", kind:"計算", question:"8台のGPUが各32sampleのlocal batchを同時処理する。Global batch sizeはいくつか。", options:["256", "32", "40", "8"], answer:0, explanation:"<strong>使う公式（Global batch）：</strong><br>$B_{global}=B_{local}\\times N_{worker}$<br><br><strong>代入：</strong>$32\\times8=256$。<br><strong>答え：</strong>256です。" },
        { id:"dist-gradient-average-calc", category:"Data Parallelism（計算）", kind:"計算", question:"4台のGPUの同一parameterに対するgradientが1、3、5、7。平均gradientはいくつか。", options:["4", "16", "7", "2.5"], answer:0, explanation:"<strong>使う公式（平均gradient）：</strong><br>$g_{avg}=\\frac{1}{N}\\sum_{k=1}^{N}g_k$<br><br><strong>代入：</strong>$(1+3+5+7)/4=4$。<br><strong>答え：</strong>4です。実装ではsum後にframeworkがscaleする場合もあります。" },
        { id:"dist-model-memory-calc", category:"Model Parallelism（計算）", kind:"計算", question:"parameterだけで24GBのmodelを4台へ均等分割する。activation等を無視した理想的な1台あたりparameter格納量はいくつか。", options:["6GB", "24GB", "96GB", "4GB"], answer:0, explanation:"<strong>使う公式（単純均等分割）：</strong><br>$M_{device}=M_{model}/N_{device}$<br><br><strong>代入：</strong>$24/4=6$GB。<br><strong>答え：</strong>6GBです。実際にはactivation・optimizer stateの格納量や、分割の偏りも考慮が必要です。" },
        { id:"dist-bottleneck-choice", category:"並列方式の選択", question:"同じmodelは1台へ載るが、data量が多くthroughputを上げたい。第一候補はどれか。", options:["Data Parallelism", "Model Parallelismだけ", "Pruningだけ", "Integrated Gradients"], answer:0, explanation:"model replicaを増やし、異なるmini-batchを同時処理します。modelが載らない場合はModel Parallelismを検討します。" },
        { id:"dist-sync-data-parallel", category:"Gradient同期", question:"同期型Data Parallelismの1 updateとして正しい流れはどれか。", options:["各workerのgradient計算完了を待ち、集約して同じparameterへ更新する", "最速workerのgradientだけを使う", "workerごとにmodelを永久に別々にする", "gradientを削除する"], answer:0, explanation:"同じ更新前modelから計算したgradientを集約します。遅いworkerを待つstraggler問題や通信costは残ります。" },
        { id:"dist-model-parallel-types", category:"Model Parallelismの種類", question:"Model Parallelismの代表的な分け方はどれか。", options:["Pipeline ParallelismとTensor Parallelism", "PTQとQAT", "PruningとDistillation", "LIMEとSHAP"], answer:0, explanation:"Pipelineは層・blockを分け、Tensor Parallelは行列演算やtensor自体を複数deviceへ分けます。" },
        { id:"dist-data-model-summary", category:"並列方式の総合", question:"Data ParallelismとModel Parallelismの最も短い見分け方はどれか。", options:["Data並列はmodelを複製し、Model並列はmodelを分割する", "両方ともmodelを削除する", "Data並列はbit幅を変える", "Model並列はsoft targetを使う"], answer:0, explanation:"『同じmodel・異なるdata』と『大きなmodelを複数deviceへ分割』が決定的な合図です。" }
    ]
};
