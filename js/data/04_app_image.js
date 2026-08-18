window.quizData = {
    title: "4-（１〜３）画像認識・物体検出・セグメンテーション",

    cheatSheet: `
        <style>
            .img-core { margin: 10px 0 18px; padding: 12px 14px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.75; }
            .img-note { margin: 10px 0 18px; padding: 11px 13px; border-left: 5px solid #f39c12; border-radius: 8px; background: #fff8e7; line-height: 1.7; }
            .img-formula { margin: 7px 0; padding: 9px 11px; border: 1px solid #c8dbee; border-radius: 8px; background: #f3f8fd; color: #123f68; text-align: center; overflow-x: auto; }
            .img-formula mjx-container { margin: 0 !important; }
            .img-table-wrap { overflow-x: auto; margin-bottom: 18px; }
            .img-table { width: 100%; border-collapse: collapse; }
            .img-table th { background: #eaf2fb; }
            .img-table th, .img-table td { padding: 9px; border: 1px solid #d7e2ec; vertical-align: top; }
            .img-table td:first-child { white-space: nowrap; }
            .img-visual-wrap { margin: 12px 0 20px; overflow-x: auto; border: 1px solid #d7e2ec; border-radius: 12px; background: #fff; }
            .img-visual-card { box-sizing: border-box; min-width: 830px; padding: 12px; }
            .img-wide-svg { display: block; width: 100%; min-width: 800px; height: auto; margin: 0 auto; }
            .img-svg-title { font-size: 15px; fill: #102a43; font-weight: 800; }
            .img-svg-label { font-size: 12px; fill: #243b53; font-weight: 750; }
            .img-svg-note { font-size: 10px; fill: #526d82; }
            .img-svg-mini { font-size: 9px; fill: #627d98; }
            .img-caption { padding: 0 15px 13px; color: #334e68; line-height: 1.7; }
            .img-link-map { margin: 9px 0 20px; padding: 11px 13px; border: 1px dashed #9fb3c8; border-radius: 8px; background: #f8fafc; line-height: 1.75; }
            .img-nms-answer { margin-top: 12px; padding: 12px; overflow-x: auto; border: 1px solid #c8dbee; border-radius: 10px; background: #f8fbfe; }
            .img-nms-answer table { width: 100%; min-width: 680px; border-collapse: collapse; }
            .img-nms-answer th, .img-nms-answer td { padding: 8px; border: 1px solid #d7e2ec; text-align: left; vertical-align: top; }
            .img-nms-answer th { background: #eaf2fb; }
            .img-nms-answer .keep { color: #137a55; font-weight: 800; }
            .img-nms-answer .drop { color: #c0392b; font-weight: 800; }
        </style>

        <h3>■ まず3つ：出力が違う</h3>
        <div class="img-visual-wrap">
            <div class="img-visual-card">
                <svg class="img-wide-svg" viewBox="0 0 960 270" role="img" aria-label="同じ画像に対する分類、物体検出、セグメンテーションの出力の違い">
                    <defs><marker id="img-task-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="img-svg-title">同じ画像に、何を答えさせる？</text>
                    <g transform="translate(24 49)">
                        <rect width="275" height="190" rx="12" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                        <text x="83" y="28" class="img-svg-title">画像認識・分類</text>
                        <rect x="27" y="49" width="106" height="85" rx="7" fill="#d6ecfa" stroke="#2780b8"/><circle cx="66" cy="82" r="20" fill="#f39c12"/><rect x="85" y="93" width="31" height="24" rx="4" fill="#27ae60"/>
                        <path d="M143 92 H170" stroke="#627d98" stroke-width="2" marker-end="url(#img-task-arrow)"/>
                        <rect x="178" y="68" width="72" height="49" rx="7" fill="#fff" stroke="#2780b8"/><text x="194" y="88" class="img-svg-label">犬 0.9</text><text x="190" y="105" class="img-svg-mini">画像全体で1答</text>
                        <text x="58" y="161" class="img-svg-label">「これは何？」</text><text x="42" y="179" class="img-svg-note">出力：クラス・確率</text>
                    </g>
                    <g transform="translate(342 49)">
                        <rect width="275" height="190" rx="12" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                        <text x="101" y="28" class="img-svg-title">物体検出</text>
                        <rect x="27" y="49" width="221" height="85" rx="7" fill="#f8fafc" stroke="#9fb3c8"/>
                        <circle cx="75" cy="82" r="20" fill="#f39c12"/><rect x="48" y="57" width="58" height="57" fill="none" stroke="#e67e22" stroke-width="3"/><text x="48" y="52" class="img-svg-mini">犬 .92</text>
                        <rect x="155" y="84" width="42" height="29" rx="4" fill="#27ae60"/><rect x="144" y="69" width="66" height="55" fill="none" stroke="#1e8449" stroke-width="3"/><text x="148" y="64" class="img-svg-mini">車 .86</text>
                        <text x="72" y="161" class="img-svg-label">「どこに何？」</text><text x="45" y="179" class="img-svg-note">出力：物体ごとのBox・クラス</text>
                    </g>
                    <g transform="translate(660 49)">
                        <rect width="275" height="190" rx="12" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/>
                        <text x="69" y="28" class="img-svg-title">セグメンテーション</text>
                        <rect x="27" y="49" width="221" height="85" rx="7" fill="#d6ecfa" stroke="#9fb3c8"/>
                        <path d="M43 121 L43 94 Q58 76 80 79 Q102 81 109 103 L104 126 Z" fill="#f8c471"/><path d="M135 130 L142 84 L205 78 L223 130 Z" fill="#82e0aa"/>
                        <text x="54" y="107" class="img-svg-mini">犬</text><text x="171" y="109" class="img-svg-mini">車</text>
                        <text x="57" y="161" class="img-svg-label">「各画素は何？」</text><text x="47" y="179" class="img-svg-note">出力：入力と同じ広さのマスク</text>
                    </g>
                </svg>
            </div>
            <div class="img-caption"><strong>一言暗記：</strong>分類＝1画像1答／検出＝物体ごとに枠／セグメンテーション＝画素ごとに色分け。</div>
        </div>
        <div class="img-link-map"><strong>章の分担：</strong>畳み込みの出力形状・重み数・受容野・AlexNet／VGGなどの比較史は <a href="quiz.html?id=03_dl_cnn">3-（4）CNN</a>、Precision／Recall／PR曲線の一般原理は <a href="quiz.html?id=02_ml_basics_2">2-（1）機械学習 Vol.2</a>。本章は画像モデルと応用タスクの流れに集中します。</div>

        <h3>■ モデル図はこの順で読む</h3>
        <div class="img-core">
            <strong>① 出力はclass・Box・Maskのどれか</strong> → <strong>② 候補領域を先に作る2-stageか、直接出す1-stageか</strong> → <strong>③ 接続はAddかConcatか</strong> → <strong>④ 局所窓・Patch・多段特徴のどれか</strong>の順です。<br>
            AddのResidual Block＝ResNet、Patch列＋CLS＝ViT、ずらす局所窓＝Swin、RPNで候補＝Faster R-CNN、Default Box＝SSD、Anchorなし＋Centerness＝FCOS、上から下へ特徴を戻して横接続＝FPNと見分けます。
        </div>

        <h3>■ 略語は最初にこれだけ：正式名称＋一言</h3>
        <div class="img-core">略語は丸暗記せず、<strong>正式名称から役割を思い出す</strong>と整理できます。同じ略語が問題文に再登場したときは、この表へ戻ってください。</div>
        <div class="img-table-wrap">
            <table class="img-table">
                <tr><th>略語（正式名称）</th><th>簡単にいうと</th></tr>
                <tr><td><strong>CNN</strong>（Convolutional Neural Network）</td><td>畳み込みで画像の局所特徴を取り出すネットワーク。</td></tr>
                <tr><td><strong>ResNet</strong>（Residual Network）</td><td>入力を近道させ、変換結果と足す画像モデル。</td></tr>
                <tr><td><strong>ViT</strong>（Vision Transformer）／<strong>CLS</strong>（Classification token）</td><td>画像をPatch列として処理し、CLSを分類結果の代表にする。</td></tr>
                <tr><td><strong>Swin</strong>（Shifted Window Transformer）</td><td>局所窓を次層でずらし、窓をまたぐ情報もつなぐ。</td></tr>
                <tr><td><strong>R-CNN</strong>（Region-based Convolutional Neural Network）</td><td>候補領域ごとに詳しく調べる2ステージ検出系。</td></tr>
                <tr><td><strong>RPN</strong>（Region Proposal Network）／<strong>ROI</strong>（Region of Interest）</td><td>RPNが物体らしい候補を作り、ROIとして詳しく調べる。</td></tr>
                <tr><td><strong>YOLO</strong>（You Only Look Once）</td><td>画像を1回のネットワーク処理で検出する1ステージ系。</td></tr>
                <tr><td><strong>SSD</strong>（Single Shot MultiBox Detector）</td><td>複数解像度とDefault Boxを使う1ステージ検出器。</td></tr>
                <tr><td><strong>FCOS</strong>（Fully Convolutional One-Stage Object Detection）</td><td>Anchorを置かず、各位置からBoxを直接予測する検出器。</td></tr>
                <tr><td><strong>FPN</strong>（Feature Pyramid Network）</td><td>高・低解像度の特徴を組み合わせ、大小の物体を扱う。</td></tr>
                <tr><td><strong>NMS</strong>（Non-Maximum Suppression）</td><td>同じ物体に重なった複数Boxから、代表だけを残す後処理。</td></tr>
                <tr><td><strong>IoU</strong>（Intersection over Union）</td><td>2つのBoxの「重なり÷和集合」。0〜1で重なりを測る。</td></tr>
                <tr><td><strong>AP／mAP</strong>（Average Precision／mean Average Precision）</td><td>PR曲線からAPを求め、クラスごとに平均したものがmAP。</td></tr>
                <tr><td><strong>FCN</strong>（Fully Convolutional Network）</td><td>全結合層を使わず、画素ごとのマスクを出すネットワーク。</td></tr>
                <tr><td><strong>GT／TP／FP</strong>（Ground Truth／True Positive／False Positive）</td><td>正解データ／正しく検出／誤って検出。</td></tr>
            </table>
        </div>

        <h3>■ 1. 画像認識：ResNet系とViT系</h3>
        <div class="img-table-wrap">
            <table class="img-table">
                <tr><th>モデル</th><th>中心アイデア</th><th>試験で返す一言</th></tr>
                <tr><td><strong>ResNet</strong></td><td>$H(x)=F(x)+S(x)$。形が同じなら $S(x)=x$。</td><td>残差を<strong>加算</strong>し、深いPlain Networkの劣化問題を改善。</td></tr>
                <tr><td><strong>WideResNet</strong></td><td>極端に深くする代わりにResidual Blockのチャネル幅を広げる。</td><td>深さだけでなく<strong>幅</strong>。</td></tr>
                <tr><td><strong>ViT</strong></td><td>画像をPatch token列へ変換し、Transformer Encoderで処理。</td><td>CLS token＝分類用、Position embedding＝位置を付ける。</td></tr>
                <tr><td><strong>Swin Transformer</strong></td><td>局所Window Attention＋次層で窓をずらす。</td><td>高解像度を効率化し、Shiftで窓間を接続。</td></tr>
            </table>
        </div>
        <div class="img-table-wrap">
            <table class="img-table">
                <tr><th>Residual Block</th><th>中身</th><th>代表</th></tr>
                <tr><td><strong>Basic</strong></td><td>$3×3 → 3×3$</td><td>ResNet-18／34</td></tr>
                <tr><td><strong>Bottleneck</strong></td><td>$1×1$圧縮 → $3×3$ → $1×1$拡張</td><td>ResNet-50／101／152</td></tr>
                <tr><td><strong>Projection Shortcut</strong></td><td>$1×1$ ConvなどでH,W,Cを合わせる</td><td>主経路とShortcutの形が違うとき</td></tr>
            </table>
        </div>
        <div class="img-note"><strong>劣化問題 ≠ 過学習：</strong>深いPlain Networkで<strong>訓練誤差まで</strong>悪化するのが劣化問題。ResNetは恒等写像なら $F(x)=0$ と学べる形にして最適化しやすくします。</div>

        <div class="img-visual-wrap">
            <div class="img-visual-card">
                <svg class="img-wide-svg" viewBox="0 0 960 225" role="img" aria-label="ResNetのResidual Blockで主経路とShortcutを加算する流れ">
                    <defs><marker id="img-res-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="img-svg-title">Residual Block：入力を「変換する道」と「近道」に分けて、最後にAdd</text>
                    <rect x="28" y="65" width="94" height="50" rx="8" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/><text x="60" y="95" class="img-svg-label">入力 x</text>
                    <path d="M124 82 H174" stroke="#627d98" stroke-width="2" marker-end="url(#img-res-arrow)"/>
                    <rect x="184" y="54" width="133" height="56" rx="8" fill="#fff8e7" stroke="#f39c12"/><text x="207" y="78" class="img-svg-label">Conv → ReLU</text><text x="220" y="97" class="img-svg-note">特徴を変換</text>
                    <path d="M319 82 H369" stroke="#627d98" stroke-width="2" marker-end="url(#img-res-arrow)"/>
                    <rect x="379" y="54" width="114" height="56" rx="8" fill="#fff8e7" stroke="#f39c12"/><text x="402" y="78" class="img-svg-label">Conv</text><text x="408" y="97" class="img-svg-note">F(x)</text>
                    <path d="M495 82 H566" stroke="#627d98" stroke-width="2" marker-end="url(#img-res-arrow)"/>
                    <circle cx="605" cy="82" r="27" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/><text x="596" y="89" class="img-svg-title">＋</text>
                    <path d="M633 82 H700" stroke="#627d98" stroke-width="2" marker-end="url(#img-res-arrow)"/>
                    <rect x="710" y="57" width="156" height="50" rx="8" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/><text x="742" y="79" class="img-svg-label">出力 H(x)</text><text x="733" y="97" class="img-svg-note">＝F(x)＋S(x)</text>
                    <path d="M122 100 C180 176 500 176 590 111" fill="none" stroke="#2780b8" stroke-width="3" stroke-dasharray="8,5" marker-end="url(#img-res-arrow)"/>
                    <text x="288" y="171" class="img-svg-label">Shortcut S(x)</text><text x="404" y="171" class="img-svg-note">同じ形ならIdentity／違えば1×1 Convなどで形を合わせる</text>
                    <text x="24" y="207" class="img-svg-note">試験の罠：ResNetはAdd。U-Netの同解像度Skipは通常Concat。</text>
                </svg>
            </div>
        </div>

        <div class="img-visual-wrap">
            <div class="img-visual-card">
                <svg class="img-wide-svg" viewBox="0 0 960 310" role="img" aria-label="ViTの画像パッチ化からCLS tokenによる分類までとSwin TransformerのShifted Window">
                    <defs><marker id="img-vit-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="img-svg-title">ViT：画像を単語のようなPatch列へ</text>
                    <rect x="24" y="53" width="126" height="126" rx="8" fill="#d6ecfa" stroke="#2780b8"/>
                    <path d="M66 53 V179 M108 53 V179 M24 95 H150 M24 137 H150" stroke="#fff" stroke-width="3"/><text x="43" y="199" class="img-svg-label">224×224画像</text><text x="38" y="216" class="img-svg-note">Patch 16なら14×14個</text>
                    <path d="M160 116 H198" stroke="#627d98" stroke-width="2" marker-end="url(#img-vit-arrow)"/>
                    <g transform="translate(208 58)"><rect width="42" height="42" rx="5" fill="#f8c471"/><rect x="48" width="42" height="42" rx="5" fill="#63c5da"/><rect x="96" width="42" height="42" rx="5" fill="#82e0aa"/><rect x="144" width="42" height="42" rx="5" fill="#d9c2f0"/><text x="8" y="67" class="img-svg-mini">196 Patch tokens</text></g>
                    <rect x="208" y="142" width="55" height="42" rx="6" fill="#f39c12"/><text x="217" y="168" class="img-svg-label">[CLS]</text><text x="273" y="158" class="img-svg-note">＋ Position embedding</text><text x="273" y="176" class="img-svg-note">順番・場所を加える</text>
                    <path d="M407 116 H445" stroke="#627d98" stroke-width="2" marker-end="url(#img-vit-arrow)"/>
                    <rect x="455" y="69" width="164" height="94" rx="9" fill="#f4ecf7" stroke="#8e44ad" stroke-width="2"/><text x="484" y="105" class="img-svg-title">Transformer</text><text x="498" y="128" class="img-svg-label">Encoder × L</text><text x="480" y="149" class="img-svg-mini">全Patch間の関係を学習</text>
                    <path d="M628 116 H666" stroke="#627d98" stroke-width="2" marker-end="url(#img-vit-arrow)"/>
                    <rect x="676" y="86" width="112" height="60" rx="8" fill="#eafaf1" stroke="#27ae60"/><text x="694" y="111" class="img-svg-label">CLSの出力</text><text x="700" y="131" class="img-svg-note">→ クラス分類</text>
                    <rect x="806" y="51" width="132" height="142" rx="10" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/><text x="826" y="76" class="img-svg-title">Swin</text><g stroke="#fff"><rect x="826" y="91" width="36" height="36" fill="#63c5da"/><rect x="862" y="91" width="36" height="36" fill="#f8c471"/><rect x="826" y="127" width="36" height="36" fill="#82e0aa"/><rect x="862" y="127" width="36" height="36" fill="#d9c2f0"/></g><rect x="844" y="109" width="54" height="54" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,3"/><text x="818" y="181" class="img-svg-mini">局所窓を次層でShift</text>
                    <text x="28" y="258" class="img-svg-label">計算の型</text><text x="104" y="258" class="img-svg-note">Patch数＝(H/P)×(W/P)　／　CLS込み系列長＝Patch数＋1</text>
                    <text x="28" y="285" class="img-svg-label">見分け</text><text x="104" y="285" class="img-svg-note">ViT＝全Patchの大域Attention　／　Swin＝局所Window＋Shift＋階層構造</text>
                </svg>
            </div>
            <div class="img-caption"><strong>例：</strong>224×224画像、Patch 16×16なら $14×14=196$ Patch。CLSを先頭に足すので系列長は197。</div>
        </div>

        <h3>■ 2. 物体検出：3系統を流れで区別</h3>
        <div class="img-visual-wrap">
            <div class="img-visual-card">
                <svg class="img-wide-svg" viewBox="0 0 960 345" role="img" aria-label="FasterとMask R-CNN、YOLOとSSD、FCOSの検出フロー比較">
                    <defs><marker id="img-det-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="img-svg-title">候補を先に作る？ 1回で直接出す？ Anchorを使う？</text>
                    <rect x="18" y="43" width="924" height="88" rx="10" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/>
                    <text x="31" y="65" class="img-svg-label">2ステージ：Faster R-CNN／Mask R-CNN</text>
                    <g fill="#fff" stroke="#2780b8"><rect x="35" y="82" width="89" height="31" rx="5"/><rect x="165" y="82" width="100" height="31" rx="5"/><rect x="306" y="82" width="91" height="31" rx="5"/><rect x="438" y="72" width="235" height="23" rx="5"/><rect x="438" y="102" width="259" height="23" rx="5"/></g>
                    <text x="50" y="102" class="img-svg-note">Backbone特徴</text><text x="186" y="102" class="img-svg-note">RPN：候補</text><text x="323" y="102" class="img-svg-note">各ROI</text><text x="455" y="88" class="img-svg-note">Faster：ROI Pooling → Class＋Box</text><text x="455" y="118" class="img-svg-note">Mask：ROI Align → Class／Box ∥ Mask</text>
                    <path d="M126 98 H157 M267 98 H298 M399 98 H425 M425 98 V84 H430 M425 98 V114 H430" fill="none" stroke="#627d98" stroke-width="2" marker-end="url(#img-det-arrow)"/><text x="744" y="91" class="img-svg-label">候補 → 詳しく判定</text><text x="744" y="108" class="img-svg-note">Mask枝はClass／Box枝と並列</text>
                    <rect x="18" y="143" width="924" height="84" rx="10" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/>
                    <text x="31" y="165" class="img-svg-label">1ステージ：YOLO（版によりAnchor使用）／SSD（Default Box）</text>
                    <g fill="#fff" stroke="#f39c12"><rect x="35" y="179" width="89" height="31" rx="5"/><rect x="178" y="179" width="144" height="31" rx="5"/><rect x="376" y="179" width="121" height="31" rx="5"/><rect x="551" y="179" width="70" height="31" rx="5"/></g>
                    <text x="50" y="199" class="img-svg-note">特徴マップ</text><text x="193" y="199" class="img-svg-note">Class＋Boxを密に予測</text><text x="390" y="199" class="img-svg-note">scoreで絞る</text><text x="574" y="199" class="img-svg-note">NMS</text>
                    <path d="M126 195 H170 M324 195 H368 M499 195 H543" stroke="#627d98" stroke-width="2" marker-end="url(#img-det-arrow)"/><text x="680" y="189" class="img-svg-label">SSD：複数スケール＋Default Box</text><text x="680" y="207" class="img-svg-note">Hard Negative Miningで背景過多を調整</text>
                    <rect x="18" y="235" width="924" height="84" rx="10" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/>
                    <text x="31" y="257" class="img-svg-label">1ステージ＋Anchor-Free：FCOS</text>
                    <g fill="#fff" stroke="#27ae60"><rect x="35" y="271" width="95" height="31" rx="5"/><rect x="181" y="271" width="94" height="31" rx="5"/><rect x="326" y="271" width="125" height="31" rx="5"/><rect x="502" y="271" width="101" height="31" rx="5"/></g>
                    <text x="57" y="291" class="img-svg-note">FPN各階層</text><text x="204" y="291" class="img-svg-note">各位置</text><text x="340" y="291" class="img-svg-note">l,t,r,b＋class</text><text x="515" y="291" class="img-svg-note">Centerness</text>
                    <path d="M132 287 H173 M277 287 H318 M453 287 H494" stroke="#627d98" stroke-width="2" marker-end="url(#img-det-arrow)"/><text x="665" y="281" class="img-svg-label">枠のひな形を置かない</text><text x="665" y="299" class="img-svg-note">中心から遠い低品質Boxを抑制</text>
                </svg>
            </div>
            <div class="img-caption"><strong>一言暗記：</strong>Faster＝RPNで候補／Mask＝ROI Align後にMask枝を並列追加／YOLO＝1-stage（Anchorは版による）／SSD＝Default Box＋複数スケール／FCOS＝Anchor-Free＋FPN＋Centerness。</div>
        </div>

        <div class="img-table-wrap">
            <table class="img-table">
                <tr><th>用語</th><th>まずこう読む</th><th>試験で結び付ける先</th></tr>
                <tr><td><strong>Bounding Box</strong></td><td>物体を囲む長方形。位置と大きさを座標で表す。</td><td>検出器の位置出力</td></tr>
                <tr><td><strong>ROI</strong></td><td>Region of Interest＝詳しく調べる候補領域。</td><td>R-CNN系</td></tr>
                <tr><td><strong>Anchor／Default Box</strong></td><td>あらかじめ各位置へ置く枠のひな形。Default BoxはSSDでの呼び方。</td><td>Faster R-CNN／SSD</td></tr>
                <tr><td><strong>Anchor-Free</strong></td><td>枠のひな形を置かず、各位置からBoxを直接作る。</td><td>FCOS</td></tr>
                <tr><td><strong>ROI Pooling／Align</strong></td><td>ROI特徴を固定サイズ化。Poolingは座標を丸め、Alignは丸めず補間。</td><td>Fast／Mask R-CNN</td></tr>
                <tr><td><strong>Ambiguous Sample</strong></td><td>1位置が複数の正解Box内にあり、担当する物体が曖昧。</td><td>FCOS＋FPNの割当</td></tr>
            </table>
        </div>

        <div class="img-visual-wrap">
            <div class="img-visual-card">
                <svg class="img-wide-svg" viewBox="0 0 960 275" role="img" aria-label="R-CNNからMask R-CNNまでの進化">
                    <defs><marker id="img-rcnn-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="img-svg-title">R-CNN系：遅い部分を順にネットワーク化・共有化</text>
                    <g transform="translate(25 55)"><rect width="174" height="137" rx="10" fill="#f8fafc" stroke="#9fb3c8"/><text x="55" y="27" class="img-svg-title">R-CNN</text><text x="23" y="54" class="img-svg-note">Selective SearchでROI</text><text x="23" y="76" class="img-svg-note">ROIごとにCNN</text><text x="23" y="102" class="img-svg-label">遅い</text></g>
                    <path d="M204 123 H236" stroke="#627d98" stroke-width="2" marker-end="url(#img-rcnn-arrow)"/>
                    <g transform="translate(246 55)"><rect width="174" height="137" rx="10" fill="#eef7fb" stroke="#2780b8"/><text x="43" y="27" class="img-svg-title">Fast R-CNN</text><text x="23" y="54" class="img-svg-note">CNN特徴を画像で共有</text><text x="23" y="76" class="img-svg-note">ROI Poolingで固定長</text><text x="23" y="102" class="img-svg-label">候補はまだ外部</text></g>
                    <path d="M425 123 H457" stroke="#627d98" stroke-width="2" marker-end="url(#img-rcnn-arrow)"/>
                    <g transform="translate(467 55)"><rect width="204" height="137" rx="10" fill="#fff8e7" stroke="#f39c12"/><text x="35" y="27" class="img-svg-title">Faster R-CNN</text><text x="23" y="54" class="img-svg-note">RPNが候補を学習</text><text x="23" y="76" class="img-svg-note">Class＋Boxを予測</text><text x="23" y="102" class="img-svg-label">候補提案もNNへ</text></g>
                    <path d="M676 123 H708" stroke="#627d98" stroke-width="2" marker-end="url(#img-rcnn-arrow)"/>
                    <g transform="translate(718 55)"><rect width="217" height="137" rx="10" fill="#eafaf1" stroke="#27ae60"/><text x="37" y="27" class="img-svg-title">Mask R-CNN</text><text x="23" y="54" class="img-svg-note">ROI Align：丸めず補間</text><text x="23" y="76" class="img-svg-note">Class＋Box＋Mask枝</text><text x="23" y="102" class="img-svg-label">個体ごとの画素マスク</text></g>
                    <text x="27" y="231" class="img-svg-label">ROI</text><text x="64" y="231" class="img-svg-note">Region of Interest＝処理対象の候補領域</text><text x="443" y="231" class="img-svg-label">end-to-end</text><text x="526" y="231" class="img-svg-note">候補作成を含む主要処理を学習可能な部品でつなぐ</text>
                </svg>
            </div>
        </div>

        <h3>■ IoU（重なり）・NMS（重複除去）・mAP（全体評価）：役割を混ぜない</h3>
        <div class="img-visual-wrap">
            <div class="img-visual-card">
                <svg class="img-wide-svg" viewBox="0 0 960 270" role="img" aria-label="IoU、NMS、mAPの役割の違い">
                    <rect x="18" y="25" width="290" height="215" rx="11" fill="#eef7fb" stroke="#2780b8" stroke-width="2"/><text x="130" y="50" class="img-svg-title">IoU</text>
                    <rect x="63" y="73" width="105" height="82" fill="#63c5da" opacity=".55" stroke="#2780b8" stroke-width="2"/><rect x="119" y="104" width="105" height="82" fill="#f8c471" opacity=".55" stroke="#f39c12" stroke-width="2"/><rect x="119" y="104" width="49" height="51" fill="#8dd3a8" opacity=".9"/><text x="49" y="207" class="img-svg-label">重なり ÷ 和集合</text><text x="54" y="225" class="img-svg-note">予測同士／予測とGTを比較</text>
                    <rect x="335" y="25" width="290" height="215" rx="11" fill="#fff8e7" stroke="#f39c12" stroke-width="2"/><text x="450" y="50" class="img-svg-title">NMS</text>
                    <g fill="none" stroke-width="3"><rect x="377" y="82" width="118" height="87" stroke="#27ae60"/><rect x="392" y="94" width="118" height="87" stroke="#d64545" stroke-dasharray="6,4" opacity=".65"/><rect x="472" y="71" width="103" height="82" stroke="#9b59b6"/></g><text x="374" y="76" class="img-svg-mini">A .92 残す</text><text x="401" y="191" class="img-svg-mini" fill="#d64545">B .81 抑制</text><text x="504" y="67" class="img-svg-mini">C .54 残す</text><text x="368" y="207" class="img-svg-label">同クラス・高IoUを抑制</text><text x="388" y="225" class="img-svg-note">予測Box vs 予測Box</text>
                    <rect x="652" y="25" width="290" height="215" rx="11" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/><text x="759" y="50" class="img-svg-title">mAP</text>
                    <path d="M695 174 V77 M695 174 H902" stroke="#627d98"/><path d="M696 88 L737 99 L780 112 L823 139 L895 163" fill="none" stroke="#27ae60" stroke-width="3"/><path d="M696 88 L737 99 L780 112 L823 139 L895 163 L895 174 L696 174 Z" fill="#82e0aa" opacity=".35"/><text x="680" y="69" class="img-svg-mini">Precision</text><text x="863" y="190" class="img-svg-mini">Recall</text><text x="690" y="207" class="img-svg-label">PR面積APをクラス平均</text><text x="686" y="225" class="img-svg-note">予測 vs GTのIoUでTP／FP</text>
                </svg>
            </div>
            <div class="img-caption"><strong>正しい流れ：</strong>予測 → scoreで絞る → NMS（予測Box同士のIoU）→ 正解GTと照合（予測BoxとGTのIoU）→ TP／FP → PR曲線・AP → クラス平均がmAP。</div>
        </div>
        <div class="img-formula">$\\displaystyle IoU=\\frac{|A\\cap B|}{|A\\cup B|}=\\frac{I}{|A|+|B|-I},\\qquad mAP=\\frac{1}{C}\\sum_{c=1}^{C}AP_c$</div>
        <div class="img-note"><strong>NMS（Non-Maximum Suppression）の3手：</strong>①同じクラスでscore最大のBoxを残す → ②そのBoxとIoUが閾値を超える重複Boxを抑制 → ③残りで繰り返す。ここでの閾値は<strong>scoreの合格点ではなく、Box同士のIoU閾値</strong>です。閾値が低いほど強く消すため、近接した別物体まで消す場合があります。</div>
        <div class="img-core"><strong>mAPの表記：</strong>mAP@0.5はIoU 0.5以上を一致とする評価。mAP@[0.5:0.95]は複数のIoU閾値でも平均するため、Box位置の正確さまで厳しく見ます。</div>

        <h3>■ 3. セグメンテーション：誰まで分ける？</h3>
        <div class="img-visual-wrap">
            <div class="img-visual-card">
                <svg class="img-wide-svg" viewBox="0 0 960 365" role="img" aria-label="Semantic Instance Panoptic SegmentationとFCN U-Netの違い">
                    <defs><marker id="img-seg-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#627d98"/></marker></defs>
                    <text x="18" y="25" class="img-svg-title">同じクラスの2個体を、同じ色で塗る？ 別々に塗る？</text>
                    <g transform="translate(20 47)"><rect width="290" height="135" rx="10" fill="#eef7fb" stroke="#2780b8"/><text x="88" y="25" class="img-svg-title">Semantic</text><rect x="28" y="45" width="234" height="68" fill="#d6ecfa"/><circle cx="88" cy="79" r="29" fill="#f8c471"/><circle cx="178" cy="79" r="29" fill="#f8c471"/><text x="49" y="128" class="img-svg-note">同じ「人」なら同色。個体IDなし</text></g>
                    <g transform="translate(335 47)"><rect width="290" height="135" rx="10" fill="#fff8e7" stroke="#f39c12"/><text x="111" y="25" class="img-svg-title">Instance</text><rect x="28" y="45" width="234" height="68" fill="#d6ecfa"/><circle cx="88" cy="79" r="29" fill="#f8c471"/><circle cx="178" cy="79" r="29" fill="#d9c2f0"/><text x="54" y="128" class="img-svg-note">人A・人Bを別IDで塗る</text></g>
                    <g transform="translate(650 47)"><rect width="290" height="135" rx="10" fill="#eafaf1" stroke="#27ae60"/><text x="107" y="25" class="img-svg-title">Panoptic</text><rect x="28" y="45" width="234" height="68" fill="#b7e4c7"/><circle cx="88" cy="79" r="29" fill="#f8c471"/><circle cx="178" cy="79" r="29" fill="#d9c2f0"/><text x="38" y="128" class="img-svg-note">全画素にclass。thingには個体IDも</text></g>
                    <text x="18" y="218" class="img-svg-title">FCNとU-Net：縮めた後、元の解像度へ戻す</text>
                    <g transform="translate(29 238)"><rect x="0" y="0" width="98" height="60" rx="7" fill="#d6ecfa" stroke="#2780b8"/><text x="22" y="35" class="img-svg-label">Encoder</text><path d="M103 30 H140" stroke="#627d98" stroke-width="2" marker-end="url(#img-seg-arrow)"/><rect x="150" y="12" width="75" height="36" rx="6" fill="#f4ecf7" stroke="#8e44ad"/><text x="169" y="35" class="img-svg-note">低解像度</text><path d="M230 30 H267" stroke="#627d98" stroke-width="2" marker-end="url(#img-seg-arrow)"/><rect x="277" y="0" width="98" height="60" rx="7" fill="#eafaf1" stroke="#27ae60"/><text x="297" y="26" class="img-svg-label">Decoder</text><text x="294" y="43" class="img-svg-note">Upsample</text><path d="M380 30 H417" stroke="#627d98" stroke-width="2" marker-end="url(#img-seg-arrow)"/><rect x="427" y="0" width="98" height="60" rx="7" fill="#82e0aa" stroke="#27ae60"/><text x="446" y="35" class="img-svg-label">Pixel mask</text></g>
                    <path d="M78 307 C78 340 355 340 355 305" fill="none" stroke="#f39c12" stroke-width="3" stroke-dasharray="7,4" marker-end="url(#img-seg-arrow)"/><text x="145" y="347" class="img-svg-note">U-Net：同じ解像度のEncoder特徴をDecoderへConcat</text>
                    <text x="593" y="264" class="img-svg-label">FCN</text><text x="650" y="264" class="img-svg-note">全結合を畳み込みへ置換し、粗い特徴をUpsampling</text><text x="593" y="292" class="img-svg-label">U-Net</text><text x="650" y="292" class="img-svg-note">Encoder-Decoder＋同解像度Skipで細部を復元</text><text x="593" y="320" class="img-svg-label">Mask R-CNN</text><text x="690" y="320" class="img-svg-note">各ROIに個体マスク</text>
                </svg>
            </div>
            <div class="img-caption"><strong>接続の罠：</strong>ResNetは特徴をAdd、U-Netは同解像度のEncoder特徴とDecoder特徴を通常Concat。</div>
        </div>
        <div class="img-formula">$\\displaystyle mIoU=\\frac{1}{C}\\sum_{c=1}^{C}IoU_c,\\qquad Dice=\\frac{2|P\\cap G|}{|P|+|G|}$</div>

        <h3>■ 最後はこの表だけ</h3>
        <div class="img-table-wrap">
            <table class="img-table">
                <tr><th>問題文の合図</th><th>答える語</th></tr>
                <tr><td>残差を加算／訓練誤差まで悪化</td><td><strong>ResNet／劣化問題</strong></td></tr>
                <tr><td>深さの代わりにチャネルを広く</td><td><strong>WideResNet</strong></td></tr>
                <tr><td>Patch列・分類用の特別token・位置を付与</td><td><strong>ViT／CLS token／Position embedding</strong></td></tr>
                <tr><td>局所窓を次層でずらす</td><td><strong>Swin Transformer</strong></td></tr>
                <tr><td>候補領域を学習</td><td><strong>RPN</strong>（Region Proposal Network）／Faster R-CNN</td></tr>
                <tr><td>ROI Align後にClass・Box・Maskを並列出力</td><td><strong>Mask R-CNN</strong></td></tr>
                <tr><td>丸めを避け双線形補間</td><td><strong>ROI Align</strong><br><small>ROI: Region of Interest（候補領域）</small><br>座標を丸めず補間し、位置ずれを抑える。</td></tr>
                <tr><td>1-stageで画像からBoxとclassを直接予測</td><td><strong>YOLO</strong>（You Only Look Once）</td></tr>
                <tr><td>複数スケール＋Default Box＋難しい背景</td><td><strong>SSD</strong>（Single Shot MultiBox Detector）</td></tr>
                <tr><td>Anchor-Free＋FPN＋Centerness</td><td><strong>FCOS</strong>（Fully Convolutional One-Stage Object Detection）</td></tr>
                <tr><td>Top-down経路＋Lateral Connection</td><td><strong>FPN</strong>（Feature Pyramid Network）</td></tr>
                <tr><td>重複Boxを抑制</td><td><strong>NMS</strong>（Non-Maximum Suppression）</td></tr>
                <tr><td>同解像度Skipで細部を戻す</td><td><strong>U-Net</strong></td></tr>
                <tr><td>全画素にclass、thingには個体IDも付与</td><td><strong>Panoptic Segmentation</strong></td></tr>
            </table>
        </div>
    `,

    questions: [
        {
            id: "img-task-output",
            category: "3大画像タスク",
            difficulty: "基礎",
            question: "画像認識・物体検出・セマンティックセグメンテーションの出力の対応として正しいものはどれか。",
            options: ["認識＝画像全体のクラス、検出＝物体ごとのBoxとクラス、セグメンテーション＝画素ごとのクラス", "認識＝画素マスク、検出＝画像全体のクラス、セグメンテーション＝Boxだけ", "3つとも同じ出力", "認識＝Box、検出＝文章、セグメンテーション＝確率1個"],
            answer: 0,
            explanation: "分類は画像全体へ1つの答え、検出は複数物体それぞれの場所と種類、セグメンテーションは入力画像の各画素へ種類を割り当てます。"
        },
        {
            id: "img-resnet-degradation",
            category: "ResNet（劣化問題）",
            difficulty: "必須",
            question: "ResNetが主に改善した劣化問題の説明として正しいものはどれか。",
            options: ["深いPlain Networkで表現力は増えるはずなのに訓練誤差まで悪化する最適化上の問題", "テスト誤差だけ増える通常の過学習", "画像の画素数が0になる問題", "クラス数が自動的に減る問題"],
            answer: 0,
            explanation: "劣化問題では訓練誤差まで悪化します。Residual Learningは恒等写像を作りやすくし、深いネットワークを最適化しやすくします。"
        },
        {
            id: "img-residual-formula",
            category: "ResNet（残差学習）",
            difficulty: "必須",
            question: "ResNetで目的写像を $H(x)$、Residual Blockが学ぶ残差を $F(x)$ とすると正しい関係はどれか。",
            options: ["$F(x)=H(x)-x$、したがって $H(x)=F(x)+x$", "$F(x)=H(x)+x$", "$H(x)=F(x)\\times x$", "$H(x)=F(x)-x$"],
            answer: 0,
            explanation: "Blockは入力との差である残差を学び、Shortcutの入力を足して目的写像へ戻します。"
        },
        {
            id: "img-resnet-projection",
            category: "ResNet（Projection Shortcut）",
            difficulty: "本試験型",
            question: "主経路の出力が $16×16×128$、入力が $32×32×64$ のとき、加算前のShortcutとして適切なものはどれか。",
            options: ["$1×1$畳み込みをstride 2・出力128チャネルで適用", "入力をそのまま加算", "GAPで $1×1×64$ にする", "$3×3$ Max Poolingだけでチャネルも128にする"],
            answer: 0,
            explanation: "加算にはH,W,Cの一致が必要です。$1×1$ Convのstride 2で32→16、出力チャネル128で64→128を同時に合わせます。"
        },
        {
            id: "img-resnet-blocks",
            category: "ResNet（Block比較）",
            difficulty: "必須",
            question: "Basic BlockとBottleneck Blockの対応として正しいものはどれか。",
            options: ["ResNet-18/34は主に $3×3→3×3$、ResNet-50以上は主に $1×1→3×3→1×1$", "全ResNetが $5×5$ だけ", "ResNet-18だけBottleneck", "BottleneckはSoftmaxを3回使う"],
            answer: 0,
            explanation: "深いResNetでは、$1×1$でチャネル圧縮してから高コストな$3×3$を行い、最後に$1×1$で拡張します。"
        },
        {
            id: "img-wideresnet",
            category: "WideResNet",
            difficulty: "基礎",
            question: "WideResNetの基本的な発想はどれか。",
            options: ["極端に深くする代わりにResidual Blockのチャネル幅を広げる", "Shortcutを削除する", "画像幅Wだけを増やす", "全層をRNNにする"],
            answer: 0,
            explanation: "Wideのwidthは画像の横幅ではなく、ネットワーク内のチャネル幅です。"
        },
        {
            id: "img-vit-pipeline",
            category: "Vision Transformer",
            difficulty: "必須",
            question: "ViTの分類フローとして正しいものはどれか。",
            options: ["画像をPatchへ分割・線形射影→CLS tokenとPosition embedding→Transformer Encoder→CLS出力で分類", "画像→RPN→ROI Align→分類", "画像→LSTM→NMS→分類", "各画素へMaskを出して多数決"],
            answer: 0,
            explanation: "画像Patchを自然言語のtokenのような列に変換し、CLS出力を画像全体の分類表現として使います。"
        },
        {
            id: "img-vit-patch-count",
            category: "ViT（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$224×224$画像を $16×16$ Patchへ重複なく分割する。Patch数とCLS込み系列長はどれか。",
            options: ["196 Patch、系列長197", "196 Patch、系列長196", "224 Patch、系列長225", "256 Patch、系列長257"],
            answer: 0,
            explanation: "$224/16=14$なのでPatch数は$14×14=196$。先頭にCLS tokenを1個足すため系列長は197です。"
        },
        {
            id: "img-cls-token",
            category: "ViT（CLS token）",
            difficulty: "基礎",
            question: "ViTのCLS tokenの主な役割はどれか。",
            options: ["全Patchから情報を集め、画像全体の分類に使う表現となる", "Patchの位置を直接表す", "未来のPatchを隠す", "画像を切り抜く"],
            answer: 0,
            explanation: "CLSは分類用に追加する特別tokenです。Position embeddingは別に、Patchの順序・場所を与えます。"
        },
        {
            id: "img-position-embedding",
            category: "ViT（Position embedding）",
            difficulty: "基礎",
            question: "ViTでPosition embeddingを加える主な理由はどれか。",
            options: ["各Patchが画像中のどこにあるかをモデルへ伝える", "クラス数を減らす", "BoxをNMSする", "チャネル数を必ず3にする"],
            answer: 0,
            explanation: "Self-Attentionだけではtokenの並びを自動的には区別できないため、位置情報をPatch表現へ加えます。"
        },
        {
            id: "img-shifted-window",
            category: "Swin Transformer",
            difficulty: "必須",
            question: "Swin Transformerで連続する層のWindow位置をずらす主な目的はどれか。",
            options: ["固定Windowの境界を越えてPatch間の情報を交換する", "未来のPatchを隠す", "画像をデータ拡張する", "CLS tokenを削除する"],
            answer: 0,
            explanation: "局所Windowは軽量ですが窓同士が分断されます。次層で窓をずらすと、以前は別窓だったPatchが同じ窓に入ります。"
        },
        {
            id: "img-vit-vs-swin",
            category: "ViT／Swin比較",
            difficulty: "標準",
            question: "ViTとSwin Transformerの違いとして最も適切なものはどれか。",
            options: ["ViTは全Patchの大域Attention、Swinは局所Window＋Shift＋階層特徴", "ViTはRNN、Swinは決定木", "どちらもRPNを使う", "Swinだけ位置情報を一切使わない"],
            answer: 0,
            explanation: "Swinは局所計算で高解像度を扱いやすくし、Patch Mergingによる階層特徴も持ちます。"
        },
        {
            id: "img-detector-family",
            category: "物体検出（方式比較）",
            difficulty: "必須",
            question: "検出方式の対応として正しいものはどれか。",
            options: ["Faster/Mask R-CNN＝2-stage、YOLO/SSD＝1-stage、FCOS＝1-stageかつAnchor-Free", "すべて2-stage", "YOLOだけ2-stage", "FCOSはセグメンテーション専用"],
            answer: 0,
            explanation: "候補領域を作ってから判定するR-CNN系、密に直接予測するYOLO/SSD、さらにAnchorを使わないFCOSで整理します。"
        },
        {
            id: "img-rcnn-evolution",
            category: "R-CNN系の進化",
            difficulty: "必須",
            question: "R-CNN系の進化として正しい順序はどれか。",
            options: ["R-CNN（ROIごとCNN）→Fast R-CNN（特徴共有）→Faster R-CNN（RPN）→Mask R-CNN（ROI Align＋Mask枝）", "Faster→R-CNN→Mask→Fast", "YOLO→SSD→R-CNN→FCN", "FCN→U-Net→RPN→ViT"],
            answer: 0,
            explanation: "Selective Searchなど外部候補とROIごとの処理を、特徴共有、RPN、ROI AlignとMask枝へ順に改善しました。"
        },
        {
            id: "img-faster-end-to-end",
            category: "Faster R-CNN（end-to-end）",
            difficulty: "本試験型",
            question: "Fast R-CNNからFaster R-CNNで、検出処理のend-to-end化が進んだ主な変更はどれか。",
            options: ["外部のSelective Searchに代えて、特徴を共有するRPNで候補領域を学習する", "ROIごとにCNNを最初から実行する", "Bounding Boxを使わなくする", "分類を手作業にする"],
            answer: 0,
            explanation: "Fast R-CNNは特徴抽出を共有しましたが、候補作成は外部手法でした。Faster R-CNNはRPNを導入し、候補作成も学習可能なネットワークへ組み込みました。"
        },
        {
            id: "img-rpn-output",
            category: "RPN（候補領域）",
            difficulty: "標準",
            question: "Faster R-CNNのRPN（Region Proposal Network：候補領域を作るネットワーク）が、各Anchorについて主に予測するものはどれか。",
            options: ["物体らしさobjectnessとBounding Box補正量", "最終Maskだけ", "学習率とバッチサイズ", "PR曲線の面積"],
            answer: 0,
            explanation: "RPNは候補領域を作るネットワークです。物体か背景かと、Anchorをどのように動かすかを予測します。"
        },
        {
            id: "img-rpn-anchor-count",
            category: "RPN（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$10×10$の特徴マップの各位置へ9個のAnchorを置く。Anchor総数はいくつか。",
            options: ["900", "100", "90", "9000"],
            answer: 0,
            explanation: "位置数は$10×10=100$、各位置9個なので$100×9=900$です。"
        },
        {
            id: "img-roi-align",
            category: "ROI Pooling／ROI Align",
            difficulty: "必須",
            question: "ROI（Region of Interest：候補領域）Alignが、ROI Poolingより位置ずれを抑える仕組みはどれか。",
            options: ["座標を整数へ丸めず、双線形補間で特徴をサンプリングする", "全座標を切り捨てる", "Anchorを削除する", "NMSを学習する"],
            answer: 0,
            explanation: "ROI Poolingの座標量子化は境界をずらします。ROI Alignは連続座標のまま補間し、Maskの画素精度を改善します。"
        },
        {
            id: "img-mask-rcnn-heads",
            category: "Mask R-CNN",
            difficulty: "必須",
            question: "Mask R-CNNがROIごとに出す主な3種類の予測はどれか。",
            options: ["クラス・Box回帰・個体マスク", "クラス・文章・音声", "学習率・Momentum・Mask", "IoU・mAP・NMSだけ"],
            answer: 0,
            explanation: "Faster R-CNNの分類・Box回帰に、ピクセル単位のMask予測枝を並列に追加します。"
        },
        {
            id: "img-yolo",
            category: "YOLO",
            difficulty: "基礎",
            question: "YOLO（You Only Look Once）系の基本的な設計を2-stage検出器と比べた説明として正しいものはどれか。",
            options: ["独立した候補生成段階を置かず、1回のネットワークでクラスとBoxを密に予測する", "必ずSelective Searchを使う", "Maskだけを予測する", "物体ごとにCNNを再実行する"],
            answer: 0,
            explanation: "初期YOLOはgrid cellから直接予測しました。現代のYOLOにも共通する本質は、1-stageで密に予測する点です。"
        },
        {
            id: "img-ssd-set",
            category: "SSD",
            difficulty: "必須",
            question: "SSD（Single Shot MultiBox Detector）の特徴の組として正しいものはどれか。",
            options: ["複数解像度の特徴マップ・Default Box・Hard Negative Mining", "RPN・ROI Align・Mask枝", "Anchor-Free・Centernessだけ", "CLS token・Position embedding"],
            answer: 0,
            explanation: "SSDは各スケールのDefault Box（Anchorのひな形）から検出し、背景が多すぎる問題を難しい負例の選択で調整します。"
        },
        {
            id: "img-hard-negative-calc",
            category: "SSD（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "SSDで正例が12個、Hard Negative Miningの負例:正例を最大3:1とする。選ぶ負例の最大数はいくつか。",
            options: ["36", "12", "4", "48"],
            answer: 0,
            explanation: "$12×3=36$です。容易な背景ばかりで損失が支配されないよう、損失の大きな負例を選びます。"
        },
        {
            id: "img-fcos",
            category: "FCOS",
            difficulty: "必須",
            question: "FCOS（Fully Convolutional One-Stage Object Detection）の説明として正しいものはどれか。",
            options: ["Anchor-Freeで、各位置からBox辺までの$l,t,r,b$を回帰し、FPNとCenternessを使う", "RPNでROIを作る2-stage専用", "Default Boxだけを分類する", "CLS tokenでBoxを作る"],
            answer: 0,
            explanation: "FCOSはFully Convolutional One-Stage Object Detectionの略で、Anchorのひな形を置かない1ステージ検出器です。各位置からBoxの左・上・右・下辺までの距離を回帰し、Centernessで中心から遠い低品質な予測を抑えます。"
        },
        {
            id: "img-fcos-ambiguous",
            category: "FCOS（Ambiguous Sample）",
            difficulty: "応用",
            question: "FCOSのAmbiguous Sampleとはどのような状態か。",
            options: ["1つの特徴マップ位置が複数の正解Box内に入り、どの物体へ割り当てるか曖昧な状態", "Anchorが1個もない状態", "全BoxのIoUが1の状態", "画像に物体が1個だけの状態"],
            answer: 0,
            explanation: "密な物体や重なりで1位置が複数GTへ対応し得ます。FPNのスケール範囲や割当規則で曖昧さを軽減します。"
        },
        {
            id: "img-fpn",
            category: "FPN",
            difficulty: "標準",
            question: "FPN（Feature Pyramid Network）の主な役割はどれか。",
            options: ["深い層の意味情報と浅い層の位置情報をtop-downと横接続で統合し、複数スケールを検出する", "画像を1画素にする", "PR曲線を計算する", "未来情報を隠す"],
            answer: 0,
            explanation: "FPNはFeature Pyramid Networkの略です。深い層の意味情報と浅い層の位置情報を統合し、高解像度の階層は小物体、低解像度の階層は大物体というように異なる大きさを扱いやすくします。"
        },
        {
            id: "img-iou-formula",
            category: "IoU",
            difficulty: "基礎",
            question: "正解BoxをA、予測BoxをBとしたとき、IoU（Intersection over Union：重なり÷和集合）の式はどれか。",
            options: ["$|A\\cap B|/|A\\cup B|$", "$|A\\cup B|/|A\\cap B|$", "$|A\\cap B|/|A|$だけ", "$|A|-|B|$"],
            answer: 0,
            explanation: "完全一致なら1、重なりなしなら0です。和集合はA面積＋B面積−交差面積で求めます。"
        },
        {
            id: "img-iou-calc",
            category: "IoU（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "正解Boxの面積100、予測Boxの面積80、交差面積40のときIoUはいくつか。",
            options: ["$40/(100+80-40)=2/7\\approx0.286$", "$40/180\\approx0.222$", "$40/100=0.4$", "$140/40=3.5$"],
            answer: 0,
            explanation: "和集合は$100+80-40=140$。IoUは$40/140=2/7\\approx0.286$です。交差を二重に数えないよう1回引きます。"
        },
        {
            id: "img-nms",
            category: "NMS",
            difficulty: "必須",
            question: "NMS（Non-Maximum Suppression：重複Boxを抑える後処理）の説明として正しいものはどれか。",
            options: ["同クラスでscore最大を残し、それとIoUが閾値を超える重複Boxを抑制して繰り返す", "全Boxを単純平均する", "正解Boxを削除する", "クラス数を減らす"],
            answer: 0,
            explanation: "NMSは、同じ物体に何本も重なって出た予測Boxを整理する処理です。scoreが最大のBoxを代表として残し、同じクラスで大きく重なるBoxだけを重複とみなして抑制します。"
        },
        {
            id: "img-nms-step",
            category: "NMS（手順）",
            difficulty: "本試験型",
            question: "同クラスのBox A（score 0.9）、B（0.8）、C（0.7）がある。IoU(A,B)=0.8、IoU(A,C)=0.1、NMSのIoU閾値が0.5なら、最終的に抑制されず残るBoxはどれか。",
            options: ["AとC。Aを残し、高IoUのBを抑制する", "Bだけ", "Aだけ", "BとC"],
            answer: 0,
            explanation: "<strong>正解はAとCです。</strong> scoreはモデルの自信度（大きいほど自信が高い）、IoUはBox同士の重なり度（大きいほどよく重なる）です。NMSでは、まずscoreで代表Boxを1つ選び、そのBoxとのIoUで重複かどうかを判定します。0.5はscoreの合格点ではなく、Box同士の重なりを判定するIoU閾値です。",
            explanationFigure: `
                <div class="img-nms-answer">
                    <table>
                        <tr><th>手順</th><th>計算・比較</th><th>判定</th><th>残るBox</th></tr>
                        <tr><td>① 代表を選ぶ</td><td>score：A 0.9 ＞ B 0.8 ＞ C 0.7</td><td>Aが最大なので<span class="keep">Aを確定して残す</span></td><td>A</td></tr>
                        <tr><td>② AとBを比較</td><td>IoU(A,B)=0.8 ＞ 閾値0.5</td><td>大きく重なるため同じ物体の重複とみなし、<span class="drop">Bを抑制</span></td><td>A</td></tr>
                        <tr><td>③ AとCを比較</td><td>IoU(A,C)=0.1 ＜ 閾値0.5</td><td>重なりが小さいため、<span class="keep">Cは抑制しない</span></td><td>A、C</td></tr>
                        <tr><td>④ 残りで反復</td><td>未確定はCだけ</td><td>Cを確定して残す</td><td><strong>A、C</strong></td></tr>
                    </table>
                    <div style="margin-top:9px;line-height:1.7"><strong>覚え方：</strong>scoreは「誰を先に残すか」、IoUは「その周りのどれを重複として消すか」を決めます。</div>
                </div>`
        },
        {
            id: "img-map",
            category: "mAP",
            difficulty: "基礎",
            question: "物体検出のmAP（mean Average Precision）の説明として正しいものはどれか。",
            options: ["confidence閾値を動かしたPR曲線からクラスごとのAPを求め、その平均を取る", "各BoxのIoUだけを平均する", "ROC曲線の最大値", "Accuracyと同じ"],
            answer: 0,
            explanation: "APはAverage Precision、mAPはmean Average Precisionの略です。IoU条件などでTP/FPを決め、score順で得られるPrecision-Recall関係からクラスごとのAPを求め、その平均を取ります。"
        },
        {
            id: "img-map-calc",
            category: "mAP（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "3クラスのAPが0.8、0.6、0.7のときmAPはいくつか。",
            options: ["0.7", "2.1", "0.6", "0.8"],
            answer: 0,
            explanation: "クラス平均なので$(0.8+0.6+0.7)/3=0.7$です。"
        },
        {
            id: "img-map-iou-threshold",
            category: "mAP（IoU閾値）",
            difficulty: "本試験型",
            question: "一般にmAP@[0.5:0.95]がmAP@0.5より厳しい評価になる主な理由はどれか。",
            options: ["高いIoU閾値も含めて平均し、Box位置の正確さまで要求するため", "クラス数を1つにするため", "NMSを使わないため", "Recallだけを0にするため"],
            answer: 0,
            explanation: "mAP@0.5はIoU 0.5の判定です。一方、COCO式のmAP@[0.5:0.95]は0.5から0.95まで複数閾値のAPを平均するため、ずれたBoxには厳しくなります。"
        },
        {
            id: "img-fcn",
            category: "FCN",
            difficulty: "必須",
            question: "FCN（Fully Convolutional Network）の説明として正しいものはどれか。",
            options: ["全結合層を畳み込みへ置き換え、空間的な予測をUpsamplingして画素マスクを出す", "ROIごとにSVMだけで分類", "Anchorを必ず使う", "文章を生成する"],
            answer: 0,
            explanation: "FCNはFully Convolutional Networkの略です。画像全体を一度に処理し、粗い出力をTransposed Convolutionなどで元の解像度へ戻して、画素ごとのマスクを作ります。"
        },
        {
            id: "img-unet",
            category: "U-Net",
            difficulty: "必須",
            question: "U-Netの同解像度Skip Connectionの主な役割はどれか。",
            options: ["Encoderの細かな位置情報をDecoderへ通常Concatし、境界や細部を復元する", "Residualとして必ずAddする", "NMSを行う", "CLS tokenを追加する"],
            answer: 0,
            explanation: "深いEncoder特徴だけでは細部が失われます。同じ解像度の浅い特徴をDecoderへ渡して精密な領域を復元します。"
        },
        {
            id: "img-seg-types",
            category: "Segmentationの種類",
            difficulty: "必須",
            question: "Semantic・Instance・Panoptic Segmentationの対応として正しいものはどれか。",
            options: ["Semantic＝クラス単位、Instance＝同クラスの個体も区別、Panoptic＝全画素にclassを付けthingには個体IDも付ける", "Semanticだけ個体IDを付ける", "Instanceは画像全体に1ラベル", "3つは同じ"],
            answer: 0,
            explanation: "Panopticはstuff（空・道路など）とthing（人・車など）を統合します。thingだけ個体IDで分けます。"
        },
        {
            id: "img-mask-task",
            category: "Mask R-CNN（タスク）",
            difficulty: "標準",
            question: "Mask R-CNNが主に行うセグメンテーションはどれか。",
            options: ["Instance Segmentation", "画像分類だけ", "Semantic Segmentationだけで個体は区別しない", "音声分離"],
            answer: 0,
            explanation: "検出した各ROIについて個体ごとの二値Maskを出します。"
        },
        {
            id: "img-miou-calc",
            category: "mIoU（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "3クラスのIoUが0.6、0.3、0.9のときmIoUはいくつか。",
            options: ["0.6", "1.8", "0.3", "0.9"],
            answer: 0,
            explanation: "クラス平均なので$(0.6+0.3+0.9)/3=0.6$です。"
        },
        {
            id: "img-dice-calc",
            category: "Dice係数（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "予測領域50画素、正解領域70画素、交差30画素のときDice係数はいくつか。",
            options: ["$2×30/(50+70)=0.5$", "$30/(50+70)=0.25$", "$30/(50+70-30)=1/3$", "$60/30=2$"],
            answer: 0,
            explanation: "Diceは$2|P\\cap G|/(|P|+|G|)$なので$60/120=0.5$です。"
        },
        {
            id: "img-visual-resnet-blocks",
            setId: "image-visual-architectures",
            setOrder: 1,
            category: "画像モデル図・Residual Block",
            kind: "図表・長文",
            difficulty: "本試験型",
            question: `次のResidual Block A・Bの対応として正しいものはどれか。どちらも最後にShortcutとAddする。
                <div class="img-table-wrap">
                    <table class="img-table" aria-label="ResNetの2種類のResidual Block処理列比較">
                        <tr><th>図</th><th>主経路F(x)</th><th>代表モデル</th></tr>
                        <tr><td><strong>A</strong></td><td><strong>3×3 Conv</strong> → ReLU → <strong>3×3 Conv</strong> → Add</td><td>ResNet-18／34</td></tr>
                        <tr><td><strong>B</strong></td><td><strong>1×1 圧縮</strong> → 3×3 → <strong>1×1 拡張</strong> → Add</td><td>ResNet-50／101／152</td></tr>
                    </table>
                </div>`,
            options: ["A＝Bottleneck、B＝Basic", "A＝Basic、B＝Bottleneck", "A＝U-Net、B＝FPN", "A＝ViT、B＝Swin"],
            answer: 1,
            explanation: "<strong>図の決め手：</strong>Aは3×3が2個、Bは1×1・3×3・1×1の3段です。<br><strong>正解：</strong>A＝Basic Block、B＝Bottleneck Blockです。<br><strong>他候補との違い：</strong>U-NetはEncoderとDecoderをConcatで結び、ViT/SwinはAttention系です。Residual Blockはいずれも最後にShortcutをAddします。"
        },
        {
            id: "img-visual-vit-swin",
            setId: "image-visual-architectures",
            setOrder: 2,
            category: "画像モデル図・Patch系モデル比較",
            kind: "図表・長文",
            difficulty: "本試験型",
            question: `次のA・Bに対応するモデルの組合せはどれか。
                <div class="img-visual-wrap"><div class="img-visual-card">
                    <svg class="img-wide-svg" viewBox="0 0 960 235" role="img" aria-label="Aは画像をパッチ列へ変換しCLSを加えてEncoderへ、Bは局所窓を次の層でずらす">
                        <text x="20" y="28" class="img-svg-title">A</text>
                        <rect x="55" y="48" width="126" height="126" rx="8" fill="#d6ecfa" stroke="#2780b8"/><path d="M97 48 V174 M139 48 V174 M55 90 H181 M55 132 H181" stroke="#fff" stroke-width="3"/>
                        <text x="202" y="116" class="img-svg-title">→</text><rect x="244" y="68" width="70" height="48" rx="7" fill="#f39c12"/><text x="258" y="98" class="img-svg-label">[CLS]</text>
                        <g fill="#eafaf1" stroke="#27ae60"><rect x="325" y="68" width="48" height="48" rx="6"/><rect x="380" y="68" width="48" height="48" rx="6"/><rect x="435" y="68" width="48" height="48" rx="6"/></g>
                        <text x="337" y="98" class="img-svg-note">P1</text><text x="392" y="98" class="img-svg-note">P2</text><text x="447" y="98" class="img-svg-note">…</text><text x="505" y="98" class="img-svg-title">→ Encoder</text>
                        <line x1="604" y1="20" x2="604" y2="212" stroke="#d7e2ec"/>
                        <text x="630" y="28" class="img-svg-title">B</text>
                        <g transform="translate(650 48)" stroke="#fff" stroke-width="2"><rect width="60" height="60" fill="#63c5da"/><rect x="60" width="60" height="60" fill="#f8c471"/><rect y="60" width="60" height="60" fill="#82e0aa"/><rect x="60" y="60" width="60" height="60" fill="#d9c2f0"/></g>
                        <text x="785" y="112" class="img-svg-title">→</text><g transform="translate(825 48)" stroke="#fff" stroke-width="2"><rect width="60" height="60" fill="#63c5da"/><rect x="60" width="60" height="60" fill="#f8c471"/><rect y="60" width="60" height="60" fill="#82e0aa"/><rect x="60" y="60" width="60" height="60" fill="#d9c2f0"/><rect x="30" y="30" width="90" height="90" fill="none" stroke="#e74c3c" stroke-width="4"/></g>
                        <text x="657" y="200" class="img-svg-note">局所Windowを次層でShiftし、窓をまたぐ情報を接続</text>
                    </svg>
                </div></div>`,
            options: ["A＝Swin、B＝ViT", "A＝ResNet、B＝U-Net", "A＝ViT、B＝Swin", "A＝SSD、B＝FCOS"],
            answer: 2,
            explanation: "<strong>図の決め手：</strong>Aは画像をPatch token列へ変換しCLSを加え、Bは局所Windowの位置を次層でずらしています。<br><strong>正解：</strong>A＝ViT、B＝Swin Transformerです。<br><strong>他候補との違い：</strong>ResNetは残差Add、U-NetはEncoder–DecoderのSkip Concat、SSD/FCOSは物体検出器です。"
        },
        {
            id: "img-visual-rcnn-evolution",
            setId: "image-visual-architectures",
            setOrder: 3,
            category: "画像モデル図・R-CNN系",
            kind: "図表・長文",
            difficulty: "本試験型",
            question: `次の進化図で、外部手法で作っていた候補領域をネットワーク内のRPNで学習するようになった変化はどの矢印か。
                <div class="img-table-wrap">
                    <table class="img-table" aria-label="R-CNNからMask R-CNNまでの進化">
                        <tr><th>A</th><th>→</th><th>B</th><th>→</th><th>C</th><th>→</th><th>D</th></tr>
                        <tr><td><strong>R-CNN</strong><br>ROIごとCNN</td><td>①</td><td><strong>Fast R-CNN</strong><br>画像全体で特徴共有</td><td>②</td><td><strong>Faster R-CNN</strong><br>新しい候補生成部品</td><td>③</td><td><strong>Mask R-CNN</strong><br>ROI Align＋Mask枝</td></tr>
                    </table>
                </div>`,
            options: ["①：R-CNN→Fast R-CNN", "②：Fast R-CNN→Faster R-CNN", "③：Faster R-CNN→Mask R-CNN", "どの矢印でもない"],
            answer: 1,
            explanation: "<strong>図の決め手：</strong>候補領域を学習する部品はRPNで、初めて現れるのはFaster R-CNNです。<br><strong>正解：</strong>②のFast R-CNN→Faster R-CNNです。<br><strong>他候補との違い：</strong>①は画像全体のCNN特徴を共有する改良、③はROI Alignと個体Maskの予測枝を加える改良です。"
        },
        {
            id: "img-visual-one-stage-detectors",
            setId: "image-visual-architectures",
            setOrder: 4,
            category: "画像モデル図・1-stage検出",
            kind: "図表・長文",
            difficulty: "本試験型",
            question: `次の1-stage検出器A〜Cの対応として正しいものはどれか。
                <div class="img-table-wrap">
                    <table class="img-table" aria-label="3種類の1-stage検出器の構造比較">
                        <tr><th>図</th><th>画像から出力までの決め手</th></tr>
                        <tr><td><strong>A</strong></td><td>画像 → 1回のネットワーク処理 → 密にclass・Boxを直接予測</td></tr>
                        <tr><td><strong>B</strong></td><td>複数解像度の特徴map → 各位置の<strong>Default Box</strong>を分類・補正</td></tr>
                        <tr><td><strong>C</strong></td><td>FPN各位置 → 辺までのl,t,r,b＋class＋<strong>Centerness</strong>（Anchorなし）</td></tr>
                    </table>
                </div>`,
            options: ["A＝SSD、B＝FCOS、C＝YOLO", "A＝Faster R-CNN、B＝U-Net、C＝ViT", "A＝YOLO、B＝SSD、C＝FCOS", "A＝FCOS、B＝YOLO、C＝SSD"],
            answer: 2,
            explanation: "<strong>図の決め手：</strong>Aは1回で直接予測、BはDefault Box、CはAnchorなしのl,t,r,bとCenternessです。<br><strong>正解：</strong>A＝YOLO、B＝SSD、C＝FCOSです。<br><strong>他候補との違い：</strong>Faster R-CNNはRPNで候補を作る2-stage、U-Netはセグメンテーション、ViTは画像分類などに使うTransformer系Backboneです。"
        },
        {
            id: "img-visual-fpn-paths",
            setId: "image-visual-architectures",
            setOrder: 5,
            category: "画像モデル図・FPN",
            kind: "図表・長文",
            difficulty: "本試験型",
            question: `次の図のXが行う処理と、FPNの目的の組合せとして正しいものはどれか。
                <div class="img-visual-wrap"><div class="img-visual-card">
                    <svg class="img-wide-svg" viewBox="0 0 960 270" role="img" aria-label="FPNのtop-down経路と、正体を問う横方向の経路X">
                        <text x="20" y="28" class="img-svg-title">Backbone：下へ行くほど低解像度・意味が強い</text>
                        <g fill="#eef7fb" stroke="#2780b8"><rect x="45" y="55" width="150" height="42" rx="7"/><rect x="105" y="115" width="150" height="42" rx="7"/><rect x="165" y="175" width="150" height="42" rx="7"/></g>
                        <text x="76" y="81" class="img-svg-label">C3：高解像度</text><text x="136" y="141" class="img-svg-label">C4</text><text x="196" y="201" class="img-svg-label">C5：低解像度</text>
                        <path d="M315 196 H440 V146 H510" fill="none" stroke="#8e44ad" stroke-width="3"/><path d="M510 146 V86 H580" fill="none" stroke="#8e44ad" stroke-width="3"/>
                        <text x="358" y="188" class="img-svg-note">Top-down：Upsample</text>
                        <path d="M195 76 H580 M255 136 H510 M315 196 H440" fill="none" stroke="#f39c12" stroke-width="3" stroke-dasharray="8 5"/>
                        <rect x="592" y="53" width="160" height="46" rx="7" fill="#eafaf1" stroke="#27ae60"/><rect x="522" y="113" width="160" height="46" rx="7" fill="#eafaf1" stroke="#27ae60"/><rect x="452" y="173" width="160" height="46" rx="7" fill="#eafaf1" stroke="#27ae60"/>
                        <text x="637" y="81" class="img-svg-label">P3 小物体</text><text x="567" y="141" class="img-svg-label">P4</text><text x="497" y="201" class="img-svg-label">P5 大物体</text>
                        <rect x="690" y="130" width="230" height="86" rx="9" fill="#fff8e7" stroke="#f39c12"/><text x="785" y="163" class="img-svg-title">経路 X</text><text x="704" y="195" class="img-svg-note">橙の破線が何を運ぶか？</text>
                    </svg>
                </div></div>`,
            options: ["X＝特徴をすべて捨て、1解像度だけにする／大物体だけを検出", "X＝同解像度のBackbone特徴を横から融合／大小の物体を複数階層で扱う", "X＝NMS／重複Boxだけを作る", "X＝Causal Mask／未来のPatchを隠す"],
            answer: 1,
            explanation: "<strong>図の決め手：</strong>上位の意味情報をUpsampleするTop-down経路と、同解像度のBackbone特徴を横から入れるLateral Connectionがあります。<br><strong>正解：</strong>Xは横接続による特徴融合で、P3〜P5の複数階層から大小の物体を扱います。<br><strong>他候補との違い：</strong>NMSは検出後の重複除去、Causal Maskは自己回帰Transformerで未来を隠す処理です。"
        }
    ]
};
