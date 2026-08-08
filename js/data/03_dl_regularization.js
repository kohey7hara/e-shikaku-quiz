window.quizData = {
    title: "3-（３）深層モデルのための正則化・汎化性能向上",
    
    cheatSheet: `
        <style>
            .flow-container { display: flex; flex-direction: column; align-items: center; gap: 10px; background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .flow-row { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; justify-content: center; }
            .box { border: 2px solid #333; padding: 8px; background: white; border-radius: 5px; text-align: center; font-size: 0.85em; width: 100px; position: relative; }
            .arrow { font-weight: bold; color: #555; }
            
            /* テクニックごとの色分け */
            .tech-data { border-color: #27ae60; background: #eafaf1; }
            .tech-layer { border-color: #f39c12; background: #fef9e7; }
            .tech-loss { border-color: #e74c3c; background: #fceceb; }
            .tech-loop { border-color: #8e44ad; background: #f4ecf7; }

            .badge { position: absolute; top: -10px; right: -5px; background: #333; color: white; font-size: 0.7em; padding: 2px 5px; border-radius: 3px; }
            .badge-data { background: #27ae60; }
            .badge-layer { background: #f39c12; }
            .badge-loss { background: #e74c3c; }

            .visual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .visual-card { border: 1px solid #ddd; padding: 10px; border-radius: 5px; text-align: center; background: #fff; }
            .svg-icon { width: 80px; height: 80px; margin: auto; }
            .l1-shape { fill: rgba(231, 76, 60, 0.2); stroke: #e74c3c; stroke-width: 2; }
            .l2-shape { fill: rgba(52, 152, 219, 0.2); stroke: #3498db; stroke-width: 2; }
            .contour { fill: none; stroke: #999; stroke-width: 1; stroke-dasharray: 2,2; }
            .syllabus-core { margin: 12px 0 20px; padding: 14px 16px; border-left: 5px solid #2780b8; border-radius: 8px; background: #eef7fb; line-height: 1.8; }
            .formula-box { margin: 6px 0; padding: 8px 10px; border-radius: 8px; background: #f3f7fb; color: #123f68; font-size: 1.02em; white-space: nowrap; }
            .formula-box mjx-container { margin: 0 !important; }
            .bn-guide { margin: 14px 0 20px; padding: 16px; border: 2px solid #3aa6b9; border-radius: 12px; background: #f3fbfc; }
            .bn-flow { display: flex; align-items: stretch; justify-content: center; gap: 8px; flex-wrap: wrap; margin: 14px 0; }
            .bn-step { width: 170px; min-height: 118px; padding: 12px; border: 1px solid #bddde3; border-radius: 10px; background: #fff; text-align: center; }
            .bn-step-number { display: inline-block; min-width: 26px; margin-bottom: 6px; padding: 2px 7px; border-radius: 999px; background: #167f92; color: #fff; font-weight: 800; }
            .bn-step strong { display: block; margin-bottom: 5px; color: #123f68; }
            .bn-arrow { align-self: center; color: #167f92; font-size: 1.5em; font-weight: 900; }
            .bn-result { margin-top: 10px; padding: 10px 12px; border-left: 5px solid #f39c12; border-radius: 7px; background: #fff8e7; line-height: 1.7; }
            .compact-note { margin: 8px 0 16px; padding: 10px 12px; border-radius: 8px; background: #fff6f2; line-height: 1.7; }
            .comparison-table td:nth-child(3) { min-width: 330px; }
            .concept-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 12px 0 18px; }
            .concept-card { padding: 12px; border: 1px solid #d7e2ec; border-radius: 10px; background: #fff; text-align: center; }
            .concept-card strong { display: block; margin-bottom: 5px; color: #123f68; }
            .concept-svg { display: block; width: 100%; max-width: 320px; height: 130px; margin: 4px auto 8px; }
            .concept-caption { font-size: 0.86em; line-height: 1.55; color: #334e68; }
            .svg-label { font-size: 11px; fill: #334e68; font-weight: 700; }
            .svg-note { font-size: 9px; fill: #627d98; }
            @media (max-width: 760px) {
                .visual-grid { grid-template-columns: 1fr; }
                .concept-grid { grid-template-columns: 1fr; }
                .bn-step { width: 100%; box-sizing: border-box; }
                .bn-arrow { width: 100%; text-align: center; transform: rotate(90deg); }
            }
        </style>

        <h3>■ 2026シラバスの出題本線</h3>
        <div class="syllabus-core">
            <strong>① 重みを抑える：</strong>L1・L2・weight decay<br>
            <strong>② ランダム性を入れる：</strong>Dropout・DropConnect・データ拡張<br>
            <strong>③ 学習を制御する：</strong>Early Stopping・バッチサイズ・学習率<br>
            <strong>④ 分布を整える：</strong>Batch / Layer / Instance / Group Normalization<br>
            <strong>⑤ 複数モデルと探索：</strong>アンサンブル・ハイパーパラメータ最適化
        </div>

        <h3>■ 正則化マップ：どこで効く？</h3>
        <p>過学習を防ぐための「罠」や「工夫」を仕掛ける場所は4箇所あります。</p>
        
        <div class="flow-container">
            <div style="width:100%; text-align:left; font-size:0.8em; color:#666;">学習ループ (Epoch)</div>
            
            <div class="flow-row">
                <div class="box tech-data">
                    <strong>入力データ</strong>
                    <div class="badge badge-data">前処理</div>
                </div>
                <div class="arrow">→</div>
                <div class="box tech-layer">
                    <strong>中間層</strong><br>
                    (Layer)
                    <div class="badge badge-layer">構造</div>
                </div>
                <div class="arrow">→</div>
                <div class="box tech-loss">
                    <strong>損失関数</strong><br>
                    (Loss)
                    <div class="badge badge-loss">計算</div>
                </div>
            </div>

            <div class="flow-row" style="align-items: flex-start; margin-top:5px;">
                <div style="width:100px; font-size:0.8em; color:#27ae60; text-align:center;">
                    ▲<br><strong>データ拡張</strong><br>Noise injection
                </div>
                <div style="width:20px;"></div>
                <div style="width:100px; font-size:0.8em; color:#f39c12; text-align:center;">
                    ▲<br><strong>Dropout</strong><br><strong>Batch Norm</strong>
                </div>
                <div style="width:20px;"></div>
                <div style="width:100px; font-size:0.8em; color:#e74c3c; text-align:center;">
                    ▲<br><strong>L1 / L2 正則化</strong><br>(Penalty項)
                </div>
            </div>

            <div style="margin-top:10px; border-top:2px dashed #8e44ad; width:90%; padding-top:5px; text-align:center; font-size:0.8em; color:#8e44ad;">
                <strong>Early Stopping</strong> (検証誤差を見てループを強制終了)
            </div>
        </div>

        <h3>■ L1 vs L2 正則化 (ペナルティの形)</h3>
        <p>損失関数 $E(w) + \lambda R(w)$ を最小化するイメージです。</p>
        <div class="visual-grid">
            <div class="visual-card">
                <strong>L1正則化 (Lasso)</strong>
                <svg class="svg-icon" viewBox="0 0 100 100">
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#ccc" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#ccc" />
                    <polygon points="50,20 80,50 50,80 20,50" class="l1-shape" />
                    <ellipse cx="85" cy="15" rx="30" ry="20" class="contour" transform="rotate(45, 85, 15)" />
                    <circle cx="20" cy="50" r="3" fill="red" /> </svg>
                <div style="font-size:0.8em; margin-top:5px;">
                    <strong>「尖っている」</strong><br>
                    等高線が<strong>軸上（角）</strong>でぶつかりやすい。<br>
                    → 重みが完全に <strong>0</strong> になる。<br>
                    → <strong>次元削減・特徴選択</strong>
                </div>
            </div>
            <div class="visual-card">
                <strong>L2正則化 (Ridge)</strong>
                <svg class="svg-icon" viewBox="0 0 100 100">
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#ccc" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#ccc" />
                    <circle cx="50" cy="50" r="30" class="l2-shape" />
                    <path d="M60,10 Q90,40 60,70" class="contour" fill="none" />
                    <circle cx="71" cy="29" r="3" fill="blue" /> </svg>
                <div style="font-size:0.8em; margin-top:5px;">
                    <strong>「丸い」</strong><br>
                    等高線が滑らかに接する。<br>
                    → 重みは 0 に近づくが 0 にはならない。<br>
                    → <strong>過学習抑制</strong>の基本
                </div>
            </div>
        </div>

        <h3>■ L1・L2・weight decay：式で見分ける</h3>
        <table class="comparison-table">
            <tr><th>手法</th><th>損失・更新式</th><th>試験のツボ</th></tr>
            <tr>
                <td><strong>L1</strong></td>
                <td><div class="formula-box">$\\displaystyle L=L_{data}+\\lambda\\sum_i|w_i|$</div></td>
                <td>絶対値。重みを<strong>ちょうど0</strong>にしやすく、スパース表現・特徴選択へ。</td>
            </tr>
            <tr>
                <td><strong>L2</strong></td>
                <td><div class="formula-box">$\\displaystyle L=L_{data}+\\frac{\\lambda}{2}\\sum_iw_i^2$</div></td>
                <td>二乗。大きな重みを強く罰し、全体を滑らかに小さくする。</td>
            </tr>
            <tr>
                <td><strong>Weight decay</strong></td>
                <td>
                    <div class="formula-box">$\\displaystyle g=\\nabla L_{data}$</div>
                    <div class="formula-box">$\\displaystyle w\\leftarrow(1-\\eta\\lambda)w-\\eta g$</div>
                </td>
                <td>SGDではL2正則化と同じ形。適応的手法ではAdamWのような<strong>分離型</strong>と区別。</td>
            </tr>
        </table>

        <h3>■ Batch Norm：何をしている？</h3>
        <div class="bn-guide">
            <p><strong>まず結論：</strong>同じ特徴の値を、ミニバッチ内で「中心0・ばらつき1」にそろえた後、学習可能な $\\gamma,\\beta$ で使いやすい尺度へ戻します。<strong>データ全体を正規分布に変える処理ではありません。</strong></p>
            <p><strong>例：</strong>ある1つの特徴について、ミニバッチの値が $x=[1,3]$ だった場合</p>
            <div class="bn-flow">
                <div class="bn-step">
                    <span class="bn-step-number">1</span>
                    <strong>平均を求める</strong>
                    $(1+3)/2$
                    <div class="formula-box">$\\mu_B=2$</div>
                </div>
                <div class="bn-arrow">→</div>
                <div class="bn-step">
                    <span class="bn-step-number">2</span>
                    <strong>分散を求める</strong>
                    <div class="formula-box">$\\sigma_B^2=1$</div>
                    平均からの距離は $-1,+1$
                </div>
                <div class="bn-arrow">→</div>
                <div class="bn-step">
                    <span class="bn-step-number">3</span>
                    <strong>標準化する</strong>
                    <div class="formula-box">$\\hat{x}=\\frac{x-\\mu_B}{\\sqrt{\\sigma_B^2+\\varepsilon}}$</div>
                    $\\hat{x}\\approx[-1,1]$
                </div>
                <div class="bn-arrow">→</div>
                <div class="bn-step">
                    <span class="bn-step-number">4</span>
                    <strong>尺度を学び直す</strong>
                    <div class="formula-box">$y=\\gamma\\hat{x}+\\beta$</div>
                    $\\gamma,\\beta$ は学習対象
                </div>
            </div>
            <div class="bn-result">
                たとえば $\\gamma=2,\\beta=0.5$ なら、$[-1,1]\\to[-1.5,2.5]$。<br>
                <strong>「いったん整える → 必要な幅と位置はモデル自身に学ばせる」</strong>と覚えます。
            </div>
        </div>

        <h3>■ Batch Norm：学習時と推論時</h3>
        <table>
            <tr><th>場面</th><th>使う平均・分散</th><th>理由</th></tr>
            <tr><td><strong>学習時</strong></td><td>現在のミニバッチの平均・分散</td><td>各バッチを正規化し、同時に移動平均を保存する。</td></tr>
            <tr><td><strong>推論時</strong></td><td>学習中に保存した移動平均</td><td>1件入力でも結果を安定させ、同じ入力から同じ出力を得る。</td></tr>
        </table>
        <div class="compact-note">
            <strong>CNNでは：</strong>チャネルごとに $N,H,W$ 方向で平均・分散を計算します。<br>
            <strong>注意：</strong>正規化直後は平均0・分散1ですが、$\\gamma,\\beta$ 適用後の出力は必ずしも平均0・分散1ではありません。小バッチでは統計が不安定になりやすいため、Group Normが候補です。
        </div>

        <h3>■ 4つの正規化：どの方向をそろえる？</h3>
        <div class="concept-grid">
            <div class="concept-card">
                <strong>Batch Norm：縦に集める</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="複数サンプルの同じ特徴を縦方向に集計">
                    <text x="8" y="24" class="svg-note">sample 1</text><text x="8" y="49" class="svg-note">sample 2</text>
                    <text x="8" y="74" class="svg-note">sample 3</text><text x="8" y="99" class="svg-note">sample 4</text>
                    <g stroke="#cbd5e1">
                        <rect x="62" y="10" width="28" height="20" fill="#f8fafc"/><rect x="94" y="10" width="28" height="20" fill="#63c5da"/><rect x="126" y="10" width="28" height="20" fill="#f8fafc"/><rect x="158" y="10" width="28" height="20" fill="#f8fafc"/>
                        <rect x="62" y="35" width="28" height="20" fill="#f8fafc"/><rect x="94" y="35" width="28" height="20" fill="#63c5da"/><rect x="126" y="35" width="28" height="20" fill="#f8fafc"/><rect x="158" y="35" width="28" height="20" fill="#f8fafc"/>
                        <rect x="62" y="60" width="28" height="20" fill="#f8fafc"/><rect x="94" y="60" width="28" height="20" fill="#63c5da"/><rect x="126" y="60" width="28" height="20" fill="#f8fafc"/><rect x="158" y="60" width="28" height="20" fill="#f8fafc"/>
                        <rect x="62" y="85" width="28" height="20" fill="#f8fafc"/><rect x="94" y="85" width="28" height="20" fill="#63c5da"/><rect x="126" y="85" width="28" height="20" fill="#f8fafc"/><rect x="158" y="85" width="28" height="20" fill="#f8fafc"/>
                    </g>
                    <path d="M108 112 L108 18" stroke="#167f92" stroke-width="2" marker-end="url(#bnArrow)"/>
                    <defs><marker id="bnArrow" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#167f92"/></marker></defs>
                    <text x="194" y="60" class="svg-label">同じ特徴</text><text x="194" y="75" class="svg-label">を集計</text>
                </svg>
                <div class="concept-caption">バッチをまたいで、同じ特徴・チャネルの統計を取る。</div>
            </div>
            <div class="concept-card">
                <strong>Layer Norm：横に集める</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="1サンプル内の特徴を横方向に集計">
                    <text x="8" y="24" class="svg-note">sample 1</text><text x="8" y="49" class="svg-note">sample 2</text>
                    <text x="8" y="74" class="svg-note">sample 3</text><text x="8" y="99" class="svg-note">sample 4</text>
                    <g stroke="#cbd5e1">
                        <rect x="62" y="10" width="28" height="20" fill="#f8fafc"/><rect x="94" y="10" width="28" height="20" fill="#f8fafc"/><rect x="126" y="10" width="28" height="20" fill="#f8fafc"/><rect x="158" y="10" width="28" height="20" fill="#f8fafc"/>
                        <rect x="62" y="35" width="28" height="20" fill="#8dd3a8"/><rect x="94" y="35" width="28" height="20" fill="#8dd3a8"/><rect x="126" y="35" width="28" height="20" fill="#8dd3a8"/><rect x="158" y="35" width="28" height="20" fill="#8dd3a8"/>
                        <rect x="62" y="60" width="28" height="20" fill="#f8fafc"/><rect x="94" y="60" width="28" height="20" fill="#f8fafc"/><rect x="126" y="60" width="28" height="20" fill="#f8fafc"/><rect x="158" y="60" width="28" height="20" fill="#f8fafc"/>
                        <rect x="62" y="85" width="28" height="20" fill="#f8fafc"/><rect x="94" y="85" width="28" height="20" fill="#f8fafc"/><rect x="126" y="85" width="28" height="20" fill="#f8fafc"/><rect x="158" y="85" width="28" height="20" fill="#f8fafc"/>
                    </g>
                    <path d="M66 45 L180 45" stroke="#267a47" stroke-width="2" marker-end="url(#lnArrow)"/>
                    <defs><marker id="lnArrow" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#267a47"/></marker></defs>
                    <text x="78" y="122" class="svg-label">1サンプル内の特徴</text>
                </svg>
                <div class="concept-caption">1サンプルの中で完結。バッチサイズに依存しない。</div>
            </div>
            <div class="concept-card">
                <strong>Instance Norm：画像1枚・チャネル1枚</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="1画像1チャネルの空間全体を集計">
                    <text x="12" y="20" class="svg-label">1 image / 1 channel</text>
                    <g stroke="#9fb3c8" fill="#d9c2f0">
                        <rect x="55" y="28" width="28" height="22"/><rect x="85" y="28" width="28" height="22"/><rect x="115" y="28" width="28" height="22"/><rect x="145" y="28" width="28" height="22"/>
                        <rect x="55" y="52" width="28" height="22"/><rect x="85" y="52" width="28" height="22"/><rect x="115" y="52" width="28" height="22"/><rect x="145" y="52" width="28" height="22"/>
                        <rect x="55" y="76" width="28" height="22"/><rect x="85" y="76" width="28" height="22"/><rect x="115" y="76" width="28" height="22"/><rect x="145" y="76" width="28" height="22"/>
                    </g>
                    <path d="M42 25 L42 103 L184 103" fill="none" stroke="#7a4ba3" stroke-width="2"/>
                    <text x="77" y="119" class="svg-label">空間 H×W を集計</text>
                </svg>
                <div class="concept-caption">画像ごとのコントラストをそろえるイメージ。</div>
            </div>
            <div class="concept-card">
                <strong>Group Norm：チャネルを束にする</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="チャネルを複数グループに分けて集計">
                    <text x="26" y="20" class="svg-label">Group 1</text><text x="144" y="20" class="svg-label">Group 2</text>
                    <g stroke="#fff" stroke-width="2">
                        <rect x="28" y="30" width="22" height="72" rx="3" fill="#63c5da"/><rect x="52" y="30" width="22" height="72" rx="3" fill="#63c5da"/>
                        <rect x="76" y="30" width="22" height="72" rx="3" fill="#63c5da"/><rect x="100" y="30" width="22" height="72" rx="3" fill="#63c5da"/>
                        <rect x="140" y="30" width="22" height="72" rx="3" fill="#f3b36a"/><rect x="164" y="30" width="22" height="72" rx="3" fill="#f3b36a"/>
                        <rect x="188" y="30" width="22" height="72" rx="3" fill="#f3b36a"/><rect x="212" y="30" width="18" height="72" rx="3" fill="#f3b36a"/>
                    </g>
                    <text x="49" y="119" class="svg-note">channels</text><text x="165" y="119" class="svg-note">channels</text>
                </svg>
                <div class="concept-caption">1サンプル内でチャネルを数グループに分ける。</div>
            </div>
        </div>
        <table class="comparison-table">
            <tr><th>手法</th><th>統計を取る単位</th><th>向く場面・見分け方</th></tr>
            <tr><td><strong>Batch Norm</strong></td><td>同じ特徴・チャネルを<strong>バッチ方向</strong>に集計</td><td>CNNで定番。学習/推論で統計が異なり、小バッチに弱い。</td></tr>
            <tr><td><strong>Layer Norm</strong></td><td>1サンプル内の<strong>特徴方向</strong></td><td>バッチサイズ非依存。Transformer・RNNで定番。</td></tr>
            <tr><td><strong>Instance Norm</strong></td><td>1画像・1チャネル内の<strong>空間方向</strong></td><td>画像ごとのコントラストを除きやすく、スタイル変換で有効。</td></tr>
            <tr><td><strong>Group Norm</strong></td><td>1画像内でチャネルを<strong>複数グループ</strong>に分割</td><td>小バッチの画像認識でも安定。</td></tr>
        </table>

        <h3>■ Dropout・Early Stopping・陰的正則化</h3>
        <div class="concept-grid">
            <div class="concept-card">
                <strong>Dropout：毎回ちがう部分ネットワーク</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="一部のニューロンをランダムに無効化">
                    <g stroke="#9fb3c8" stroke-width="1.5">
                        <line x1="45" y1="30" x2="115" y2="22"/><line x1="45" y1="30" x2="115" y2="65"/><line x1="45" y1="95" x2="115" y2="65"/>
                        <line x1="45" y1="95" x2="115" y2="108"/><line x1="115" y1="22" x2="195" y2="65"/><line x1="115" y1="65" x2="195" y2="65"/><line x1="115" y1="108" x2="195" y2="65"/>
                    </g>
                    <g fill="#167f92"><circle cx="45" cy="30" r="9"/><circle cx="45" cy="95" r="9"/><circle cx="115" cy="22" r="9"/><circle cx="115" cy="108" r="9"/><circle cx="195" cy="65" r="10"/></g>
                    <circle cx="115" cy="65" r="10" fill="#e2e8f0"/>
                    <path d="M107 57 L123 73 M123 57 L107 73" stroke="#e74c3c" stroke-width="4"/>
                    <text x="82" y="125" class="svg-label">学習ごとにランダムOFF</text>
                </svg>
                <div class="concept-caption">特定ニューロンへの依存を減らし、多数のモデルを平均する効果。</div>
            </div>
            <div class="concept-card">
                <strong>Early Stopping：谷の底で保存</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="検証損失が最小になる位置で早期終了">
                    <line x1="30" y1="105" x2="220" y2="105" stroke="#627d98"/><line x1="30" y1="105" x2="30" y2="15" stroke="#627d98"/>
                    <path d="M35 24 C70 48,120 75,215 94" fill="none" stroke="#2780b8" stroke-width="3"/>
                    <path d="M35 35 C75 70,112 91,140 67 C165 47,190 38,215 30" fill="none" stroke="#e05d5d" stroke-width="3"/>
                    <line x1="137" y1="18" x2="137" y2="105" stroke="#f39c12" stroke-width="2" stroke-dasharray="5,4"/>
                    <circle cx="137" cy="69" r="5" fill="#f39c12"/>
                    <text x="145" y="64" class="svg-label">best</text><text x="154" y="120" class="svg-note">epoch</text>
                    <text x="45" y="20" class="svg-note" fill="#2780b8">train</text><text x="178" y="25" class="svg-note" fill="#e05d5d">validation</text>
                </svg>
                <div class="concept-caption">検証損失の最小地点を保存。最後の重みではない。</div>
            </div>
            <div class="concept-card">
                <strong>バッチサイズ：揺れがノイズになる</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="小バッチは揺れながら進み大バッチは滑らかに進む">
                    <path d="M20 108 Q70 15 120 108 Q170 15 220 108" fill="none" stroke="#d9e2ec" stroke-width="2"/>
                    <path d="M28 100 L55 73 L77 84 L101 51 L124 62 L150 38 L176 47 L205 25" fill="none" stroke="#e67e22" stroke-width="3"/>
                    <path d="M28 110 C82 90,135 55,205 28" fill="none" stroke="#2780b8" stroke-width="3"/>
                    <circle cx="205" cy="25" r="5" fill="#e67e22"/><circle cx="205" cy="28" r="4" fill="#2780b8"/>
                    <text x="28" y="20" class="svg-note">小バッチ：揺れる</text><text x="28" y="35" class="svg-note">大バッチ：滑らか</text>
                </svg>
                <div class="concept-caption">適度な揺れは汎化に役立つ場合がある。小さすぎると不安定。</div>
            </div>
            <div class="concept-card">
                <strong>学習率：1歩の大きさ</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="学習率が小さいと短い歩幅、大きいと長い歩幅">
                    <line x1="20" y1="88" x2="220" y2="88" stroke="#d9e2ec" stroke-width="3"/>
                    <g fill="#2780b8"><circle cx="30" cy="55" r="5"/><circle cx="55" cy="55" r="5"/><circle cx="80" cy="55" r="5"/><circle cx="105" cy="55" r="5"/></g>
                    <g stroke="#2780b8" stroke-width="2"><line x1="35" y1="55" x2="50" y2="55"/><line x1="60" y1="55" x2="75" y2="55"/><line x1="85" y1="55" x2="100" y2="55"/></g>
                    <g fill="#e67e22"><circle cx="30" cy="102" r="5"/><circle cx="100" cy="102" r="5"/><circle cx="190" cy="102" r="5"/></g>
                    <g stroke="#e67e22" stroke-width="3"><line x1="35" y1="102" x2="95" y2="102"/><line x1="105" y1="102" x2="185" y2="102"/></g>
                    <text x="125" y="58" class="svg-label">小さい η</text><text x="125" y="105" class="svg-label">大きい η</text>
                </svg>
                <div class="concept-caption">大きすぎれば飛び越えて発散、小さすぎれば進まない。</div>
            </div>
        </div>
        <table class="comparison-table">
            <tr><th>手法</th><th>学習時</th><th>試験のツボ</th></tr>
            <tr>
                <td><strong>Inverted Dropout</strong></td>
                <td>
                    <div class="formula-box">$\\displaystyle m\\sim\\mathrm{Bernoulli}(1-p)$</div>
                    <div class="formula-box">$\\displaystyle y=\\frac{m}{1-p}x$</div>
                </td>
                <td>生き残った出力を $1/(1-p)$ 倍。推論時は何もしない。</td>
            </tr>
            <tr><td><strong>Early Stopping</strong></td><td>検証指標が改善しない期間を監視</td><td>最後ではなく<strong>検証性能が最良だった重み</strong>を復元する。</td></tr>
            <tr><td><strong>小さめのバッチ</strong></td><td>勾配に適度なノイズが入る</td><td>汎化に有利な場合があるが、小さすぎるとBNや学習が不安定。</td></tr>
            <tr><td><strong>学習率</strong></td><td>安定範囲内で更新幅を調整</td><td>大きすぎれば発散、小さすぎれば停滞。陰的正則化にも関係。</td></tr>
        </table>

        <h3>■ データ拡張：媒体ごとの必須セット</h3>
        <div class="concept-grid">
            <div class="concept-card">
                <strong>画像：見た目を変えても正解は保つ</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="画像を反転・消去・切り抜きして増やす">
                    <rect x="12" y="25" width="58" height="72" rx="5" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/>
                    <circle cx="41" cy="50" r="12" fill="#f3b36a"/><path d="M22 90 L40 68 L55 82 L68 64" fill="none" stroke="#2780b8" stroke-width="3"/>
                    <path d="M77 61 L99 61" stroke="#627d98" stroke-width="2"/><path d="M94 55 L101 61 L94 67" fill="none" stroke="#627d98" stroke-width="2"/>
                    <g transform="translate(108,15)">
                        <rect x="0" y="0" width="48" height="48" rx="4" fill="#eafaf1" stroke="#27ae60"/><circle cx="30" cy="17" r="8" fill="#f3b36a"/><text x="9" y="43" class="svg-note">Flip</text>
                        <rect x="56" y="0" width="48" height="48" rx="4" fill="#eafaf1" stroke="#27ae60"/><rect x="70" y="12" width="20" height="18" fill="#627d98"/><text x="65" y="43" class="svg-note">Erase</text>
                        <rect x="28" y="58" width="48" height="48" rx="4" fill="#eafaf1" stroke="#27ae60"/><rect x="39" y="68" width="26" height="24" fill="none" stroke="#e67e22" stroke-width="2"/><text x="38" y="101" class="svg-note">Crop</text>
                    </g>
                </svg>
                <div class="concept-caption">向き・明るさ・一部欠損が変わっても、ラベルの意味は変えない。</div>
            </div>
            <div class="concept-card">
                <strong>自然言語：意味を保って言い換える</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="文章の同義語置換や削除でデータ拡張">
                    <rect x="20" y="20" width="88" height="34" rx="17" fill="#eef7fb" stroke="#2780b8"/><text x="39" y="42" class="svg-label">猫が走る</text>
                    <path d="M112 37 L138 37" stroke="#627d98" stroke-width="2"/><path d="M132 31 L139 37 L132 43" fill="none" stroke="#627d98" stroke-width="2"/>
                    <rect x="144" y="20" width="82" height="34" rx="17" fill="#eafaf1" stroke="#27ae60"/><text x="158" y="42" class="svg-label">ネコが走る</text>
                    <rect x="35" y="76" width="70" height="30" rx="15" fill="#fff8e7" stroke="#f39c12"/><text x="49" y="96" class="svg-note">置換・挿入</text>
                    <rect x="125" y="76" width="70" height="30" rx="15" fill="#fff8e7" stroke="#f39c12"/><text x="139" y="96" class="svg-note">交換・削除</text>
                </svg>
                <div class="concept-caption">EDAは単語操作。文章の意味や正解ラベルを壊さない。</div>
            </div>
            <div class="concept-card">
                <strong>音声：波形・時間・周波数を変える</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="音声波形へのノイズ付与とスペクトログラムのマスク">
                    <path d="M12 43 L25 43 L32 20 L42 68 L53 31 L64 56 L75 43 L100 43" fill="none" stroke="#2780b8" stroke-width="3"/>
                    <text x="16" y="82" class="svg-note">noise / volume / pitch</text>
                    <rect x="122" y="15" width="105" height="92" rx="5" fill="#eef2f7" stroke="#9fb3c8"/>
                    <g stroke="#d9e2ec"><line x1="122" y1="38" x2="227" y2="38"/><line x1="122" y1="61" x2="227" y2="61"/><line x1="122" y1="84" x2="227" y2="84"/></g>
                    <rect x="148" y="15" width="18" height="92" fill="#e05d5d" opacity="0.7"/><rect x="122" y="62" width="105" height="18" fill="#f3b36a" opacity="0.8"/>
                    <text x="142" y="123" class="svg-label">SpecAugment</text>
                </svg>
                <div class="concept-caption">SpecAugmentは時間帯・周波数帯を帯状に隠す。</div>
            </div>
            <div class="concept-card">
                <strong>MixUp：入力もラベルも同じ比率で混ぜる</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="2つの入力とラベルを同じ比率で混合">
                    <circle cx="45" cy="50" r="25" fill="#63c5da" opacity="0.85"/><text x="37" y="55" class="svg-label">A</text>
                    <circle cx="115" cy="50" r="25" fill="#e05d5d" opacity="0.85"/><text x="107" y="55" class="svg-label">B</text>
                    <text x="74" y="55" class="svg-label">＋</text><path d="M145 50 L172 50" stroke="#627d98" stroke-width="2"/><path d="M166 44 L173 50 L166 56" fill="none" stroke="#627d98" stroke-width="2"/>
                    <circle cx="202" cy="50" r="25" fill="#8f8fd3"/><text x="186" y="55" class="svg-label">A+B</text>
                    <text x="36" y="96" class="svg-note">λxA + (1-λ)xB</text><text x="135" y="111" class="svg-note">ラベルも同じ比率</text>
                </svg>
                <div class="concept-caption">境界を滑らかに学ぶ。画像だけでなく自然言語・音声にも登場。</div>
            </div>
        </div>
        <table class="comparison-table">
            <tr><th>媒体</th><th>主な手法</th><th>注意点</th></tr>
            <tr><td><strong>画像</strong></td><td>Flip / Erase / Crop / Contrast / Brightness / Rotate、RandAugment、MixUp</td><td>ラベルの意味を壊さない。RandAugmentは変換数と強度で探索を簡略化。</td></tr>
            <tr><td><strong>自然言語</strong></td><td>EDA（同義語置換・挿入・交換・削除）、MixUp</td><td>文の意味やラベルを保つ範囲で行う。</td></tr>
            <tr><td><strong>音声</strong></td><td>ノイズ、音量、ピッチシフト、MixUp、SpecAugment</td><td>SpecAugmentは時間帯・周波数帯をマスクする。</td></tr>
        </table>

        <h3>■ アンサンブルとハイパーパラメータ探索</h3>
        <div class="concept-grid">
            <div class="concept-card">
                <strong>アンサンブル：複数の判断をまとめる</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="3つのモデルの予測を多数決で統合">
                    <rect x="15" y="12" width="62" height="27" rx="5" fill="#eef7fb" stroke="#2780b8"/><text x="28" y="30" class="svg-label">Model A</text>
                    <rect x="15" y="51" width="62" height="27" rx="5" fill="#eafaf1" stroke="#27ae60"/><text x="28" y="69" class="svg-label">Model B</text>
                    <rect x="15" y="90" width="62" height="27" rx="5" fill="#fff8e7" stroke="#f39c12"/><text x="28" y="108" class="svg-label">Model C</text>
                    <path d="M82 26 L151 60 M82 65 L151 65 M82 103 L151 70" stroke="#627d98" stroke-width="2"/>
                    <rect x="153" y="45" width="72" height="42" rx="8" fill="#f4ecf7" stroke="#8e44ad" stroke-width="2"/>
                    <text x="169" y="63" class="svg-label">平均・多数決</text><text x="176" y="78" class="svg-note">meta model</text>
                </svg>
                <div class="concept-caption">Baggingは並列、Boostingは逐次、Stackingはメタモデル。</div>
            </div>
            <div class="concept-card">
                <strong>探索：次にどこを試す？</strong>
                <svg class="concept-svg" viewBox="0 0 240 130" role="img" aria-label="グリッド探索・ランダム探索・ベイズ最適化の違い">
                    <g transform="translate(8,22)">
                        <text x="12" y="-6" class="svg-label">Grid</text>
                        <g fill="#2780b8"><circle cx="10" cy="10" r="3"/><circle cx="30" cy="10" r="3"/><circle cx="50" cy="10" r="3"/><circle cx="10" cy="30" r="3"/><circle cx="30" cy="30" r="3"/><circle cx="50" cy="30" r="3"/><circle cx="10" cy="50" r="3"/><circle cx="30" cy="50" r="3"/><circle cx="50" cy="50" r="3"/></g>
                    </g>
                    <g transform="translate(84,22)">
                        <text x="5" y="-6" class="svg-label">Random</text>
                        <g fill="#27ae60"><circle cx="8" cy="42" r="4"/><circle cx="23" cy="15" r="4"/><circle cx="42" cy="53" r="4"/><circle cx="57" cy="26" r="4"/><circle cx="33" cy="34" r="4"/></g>
                    </g>
                    <g transform="translate(164,22)">
                        <text x="8" y="-6" class="svg-label">Bayes</text>
                        <path d="M4 55 Q20 12 35 45 T66 18" fill="none" stroke="#8e44ad" stroke-width="2"/>
                        <circle cx="35" cy="45" r="4" fill="#8e44ad"/><circle cx="66" cy="18" r="5" fill="#f39c12"/>
                        <path d="M38 39 L60 23" stroke="#f39c12" stroke-width="2" stroke-dasharray="3,2"/>
                    </g>
                    <text x="23" y="116" class="svg-note">全組合せ</text><text x="92" y="116" class="svg-note">無作為</text><text x="166" y="116" class="svg-note">履歴から次候補</text>
                </svg>
                <div class="concept-caption">評価が高価なら、過去の結果を使うBayesian Optimizationが有力。</div>
            </div>
        </div>
        <table class="comparison-table">
            <tr><th>分類</th><th>手法</th><th>一言で見分ける</th></tr>
            <tr><td rowspan="4"><strong>アンサンブル</strong></td><td>Bagging</td><td>独立・並列に学習して平均/多数決。分散を下げる。</td></tr>
            <tr><td>Boosting</td><td>前の誤りを次が重点的に学ぶ。逐次的。</td></tr>
            <tr><td>Bootstrap</td><td>元データから<strong>復元抽出</strong>して複数データ集合を作る。</td></tr>
            <tr><td>Stacking</td><td>複数モデルの予測をメタモデルへ入力する。</td></tr>
            <tr><td rowspan="3"><strong>探索</strong></td><td>Grid Search</td><td>候補の全組合せ。低次元・小さい探索空間向き。</td></tr>
            <tr><td>Random Search</td><td>組合せを無作為抽出。重要な軸が少ない高次元探索に強い。</td></tr>
            <tr><td>Bayesian Optimization</td><td>過去の結果から次に試す候補を選ぶ。1回の評価が高価な場合に有効。</td></tr>
        </table>
        <p><strong>データ分割の鉄則：</strong>調整は検証データ、テストデータは最後の性能確認にだけ使います。</p>
    `,

    questions: [
        // ---------------------------------------------------------
        // 【基礎編】 Q1 - Q15
        // ---------------------------------------------------------
        {
            category: "L1正則化",
            question: "L1正則化（Lasso）のペナルティ項として正しい数式はどれか。",
            options: ["$\\lambda \\sum |w|$ （重みの絶対値の和）", "$\\frac{1}{2} \\lambda \\sum w^2$ （重みの二乗和）", "$\\lambda \\sum w$ （重みの和）", "$\\lambda \\sum \\log(w)$"],
            answer: 0,
            explanation: "L1は「Manhattan距離」の形をしており、絶対値を足し合わせます。これがスパース性（0になりやすい性質）を生みます。"
        },
        {
            category: "L2正則化",
            question: "L2正則化（Ridge）において、正則化項を加えることでパラメータ $w$ はどのように変化するか。",
            options: ["全体的に値が0に近づき小さくなる（Weight Decay）", "多くのパラメータが完全に0になる", "パラメータの値が大きくなる", "パラメータの符号が反転する"],
            answer: 0,
            explanation: "大きな値を持つことに対してペナルティ（二乗）がかかるため、重みが滑らかに小さく抑えられます。これを「荷重減衰 (Weight Decay)」と呼びます。"
        },
        {
            category: "ドロップアウト",
            question: "ドロップアウト（Dropout）が汎化性能を向上させる理由として、最も適切な説明はどれか。",
            options: ["異なる部分ネットワークを多数学習させることになり、実質的に「アンサンブル学習」を行っているのと同じ効果があるから", "計算量が減って学習が速くなるから", "入力データを増やす効果があるから", "勾配消失を防ぐから"],
            answer: 0,
            explanation: "毎回ランダムにニューロンを消すことは、毎回違う形のネットワークを学習させていることになり、それらの平均を取ることで頑健性が増します。"
        },
        {
            category: "ドロップアウトの推論時",
            question: "学習時にドロップアウト率 $p=0.5$ （50%を無効化）で学習した場合、推論（テスト）時には出力をどう調整する必要があるか。（Inverted Dropoutでない場合）",
            options: ["出力を $0.5$ 倍する（平均をとる）", "出力を 2 倍する", "調整は不要", "出力を 0 にする"],
            answer: 0,
            explanation: "学習時は信号が半分しか通っていないため、推論時（全ニューロン使用）には信号量が2倍になってしまいます。学習時と同じスケールにするため、出力に $(1-p)$ を掛けます。"
        },
        {
            category: "バッチ正規化",
            question: "Batch Normalization（バッチ正規化）を行う主なメリットはどれか。",
            options: ["各層の値の尺度を整えて学習を安定させ、比較的大きな学習率も使いやすくする", "モデルのパラメータ数が減る", "計算コストが必ず下がる", "過学習が完全に起きなくなる"],
            answer: 0,
            explanation: "ミニバッチ統計で中間表現の尺度を整えることで最適化が安定します。古典的には「内部共変量シフトの低減」と説明されますが、試験では「学習の安定化・高速化」を押さえれば十分です。"
        },
        {
            category: "バッチ正規化の場所",
            question: "一般的に、Batch Normalization層はネットワークのどこに挿入するのが推奨されているか（原論文に基づく）。",
            options: ["全結合層（Affine）または畳み込み層の後、活性化関数の前", "活性化関数の後", "入力層の直前のみ", "出力層の直後"],
            answer: 0,
            explanation: "活性化関数（ReLUなど）に入れる前の値 $u$ を正規化することで、活性化関数の「おいしい部分（非線形性）」を有効に使えます。"
        },
        {
            category: "早期終了",
            question: "Early Stopping（早期終了）を行う際、学習をストップさせる基準となる指標はどれか。",
            options: ["検証データ（Validation Data）に対する誤差", "訓練データ（Training Data）に対する誤差", "テストデータ（Test Data）に対する誤差", "学習率の大きさ"],
            answer: 0,
            explanation: "訓練誤差ではなく検証誤差などの検証指標を監視します。偶然の上下ですぐ止めず、一定期間改善しない状態を待つ patience を設定し、最良時点の重みを保存します。"
        },
        {
            category: "データ拡張",
            question: "画像認識におけるデータ拡張（Data Augmentation）の手法として、不適切なものはどれか。",
            options: ["画像の意味が変わってしまうような極端な変形（数字の6を180度回転させて9にする等）", "左右反転", "ランダムクロップ（切り抜き）", "輝度の変更"],
            answer: 0,
            explanation: "データ拡張は「ラベル（正解）が変わらない範囲」で行う必要があります。6を回転させて9に見えるような変換は、ラベルが変わるため不適切です。"
        },
        {
            category: "正則化の目的",
            question: "正則化（Regularization）の根本的な目的を一言で言うと何か。",
            options: ["過学習（Overfitting）を防ぎ、未知のデータに対する汎化性能を高めること", "学習データに対する精度（Training Accuracy）を最大化すること", "計算速度を上げること", "モデルの層を深くすること"],
            answer: 0,
            explanation: "訓練データに過剰に適合しすぎるのを防ぐために、モデルの複雑さにペナルティを与えたり、ノイズを加えたりします。"
        },
        {
            category: "Weight Decay",
            question: "最適化手法（SGDなど）の実装において、L2正則化はしばしば別の名前で呼ばれる。それは何か。",
            options: ["Weight Decay (荷重減衰)", "Gradient Clipping", "Momentum", "Learning Rate Decay"],
            answer: 0,
            explanation: "更新式の変形により、L2正則化項の微分は「現在の重み $w$ を少し小さくする（減衰させる）」項として現れるため、Weight Decayと呼ばれます。"
        },

        // ---------------------------------------------------------
        // 【応用編】 Q11 - Q25
        // ---------------------------------------------------------
        {
            category: "スパース性(応用)",
            question: "L1正則化を行うと、なぜパラメータが「完全に0」になりやすい（スパースになる）のか。幾何学的な理由として正しいものはどれか。",
            options: ["制約領域がひし形（尖っている）であり、等高線がその「角（軸上）」で接する確率が高いため", "制約領域が円形であり、滑らかだから", "微分値が常に0だから", "L1ノルムは微分不可能だから"],
            answer: 0,
            explanation: "ひし形の頂点は軸の上にあります。損失関数の等高線が広がってきたとき、最初にぶつかるのがこの「尖った頂点」になりやすいため、他の成分が0になります。"
        },
        {
            category: "Inverted Dropout(応用)",
            question: "最近の深層学習フレームワーク（PyTorchなど）で主流の「Inverted Dropout」とはどのような処理か。",
            options: ["学習時にドロップアウトしなかったニューロンの出力を $1/(1-p)$ 倍してスケールを合わせ、推論時は何もしない", "推論時に出力を $p$ 倍する", "学習時に出力を $p$ 倍する", "ドロップアウト率を徐々に下げる"],
            answer: 0,
            explanation: "推論時は高速に計算したいので、「学習時にあらかじめ値を大きくしておく」ことで、推論時の掛け算処理を省略するテクニックです。"
        },
        {
            category: "BNの副作用(応用)",
            question: "Batch Normalizationはバッチサイズが極端に小さい（例: 2や4）場合、どのような問題が起きるか。",
            options: ["バッチ内の統計量（平均・分散）が母集団の推定として不正確になり、学習が不安定になる", "計算ができなくなる", "過学習しなくなる", "精度が向上する"],
            answer: 0,
            explanation: "平均・分散はサンプル数が多いほど安定します。少ないとノイズだらけの統計量で正規化することになり、逆効果になります（対策：Group Normなど）。"
        },
        {
            category: "正規化のスケール(応用)",
            question: "L2正則化の強さを決めるハイパーパラメータ $\\lambda$ (lambda) を大きくしすぎると、モデルはどうなるか。",
            options: ["重みが0に近づきすぎてモデルが単純になりすぎ、未学習（Underfitting）を起こす", "過学習（Overfitting）を起こす", "学習が非常に速くなる", "重みが発散する"],
            answer: 0,
            explanation: "ペナルティが強すぎると、モデルは「誤差を減らす」ことよりも「重みを小さくする」ことを優先してしまい、何も学習できなくなります（全て0に近づく）。"
        },
        {
            category: "ノイズの注入(応用)",
            question: "入力データや隠れ層にガウスノイズを加える「Noise Injection」は、正則化としてどのような効果があるか。",
            options: ["モデルが入力の微小な変化に対して頑健になり、決定境界を滑らかにする（L2正則化と似た効果）", "データを破壊して精度を下げる", "計算速度を上げる", "モデルをスパースにする"],
            answer: 0,
            explanation: "「少しずれたデータ」も同じクラスだと教えることになるため、データ拡張と同様に汎化性能を高める効果があります。"
        },
        {
            category: "Label Smoothing(応用)",
            question: "過学習を防ぐために、正解ラベルを `[0, 1, 0]` ではなく `[0.1, 0.8, 0.1]` のように少しなまらせる手法を何と呼ぶか。",
            options: ["Label Smoothing (ラベル平滑化)", "MixUp", "CutOut", "Batch Norm"],
            answer: 0,
            explanation: "モデルが「確信度100%」を目指して無理やり学習するのを防ぎ、ソフトな確率分布を学習させることで汎化性能を上げます。"
        },
        {
            category: "MixUp(応用)",
            question: "データ拡張手法「MixUp」の特徴的な処理はどれか。",
            options: ["2つの画像をピクセル単位で重み付け加算し、ラベルも同じ比率で混ぜる", "画像を切り抜いて貼り付ける", "画像にノイズを加える", "画像を回転させる"],
            answer: 0,
            explanation: "「犬」と「猫」を混ぜた画像に対して「犬50%, 猫50%」と教えることで、クラス間の境界領域を滑らかに学習させます。"
        },
        {
            category: "BNの推論時(応用)",
            question: "Batch Normalizationにおいて、推論（テスト）時に使用する平均と分散はどこから持ってくるか。",
            options: ["学習中に計算しておいた移動平均（Moving Average）", "テストデータそのものの平均・分散", "0と1を固定で使う", "ランダムな値"],
            answer: 0,
            explanation: "推論時はデータが1つずつ来ることもあるため、その場の統計量は使えません。学習中に記録しておいた「グローバルな統計量」を使います。"
        },
        {
            category: "早期終了の注意点(応用)",
            question: "Early Stoppingを採用する場合、学習終了後のモデルの状態について注意すべきことは何か。",
            options: ["最後の状態ではなく、検証誤差が最小だった時点のパラメータを保存（ロード）しておく必要がある", "最後の状態が常にベストである", "パラメータを全て0に戻す", "学習率を0にする"],
            answer: 0,
            explanation: "「止めた時点」ではすでに過学習が始まって誤差が上がっている可能性があります。ベストスコアを記録した時点の重みを取り出す機能（Model Checkpoint）が必要です。"
        },
        {
            category: "Layer Norm(応用)",
            question: "RNNなどでBatch Normの代わりに使われる「Layer Normalization」は、どの単位で正規化を行うか。",
            options: ["1つのデータ（サンプル）の中の全特徴量（チャンネル・隠れ層）で正規化", "バッチ全体の同じチャンネルで正規化", "画像1枚ごとに正規化", "重み行列ごとに正規化"],
            answer: 0,
            explanation: "バッチサイズに依存せず、その瞬間の入力データ内部だけで正規化するため、系列長が変わるRNNなどで安定して動作します。"
        },
        {
            category: "正則化のハイパーパラメータ(応用)",
            question: "L2正則化係数 $\\lambda$ を交差検証（Cross Validation）で決める際、探索範囲として適切なスケールはどれか。",
            options: ["対数スケール（例: 0.1, 0.01, 0.001 ...）", "線形スケール（例: 0.1, 0.2, 0.3 ...）", "ランダム", "負の値"],
            answer: 0,
            explanation: "正則化の影響力は桁数（オーダー）で変わることが多いため、グリッドサーチなどでは $10^{-3}, 10^{-4}$ のように対数スケールで探すのが定石です。"
        },
        {
            category: "DropConnect(応用)",
            question: "Dropoutの派生形である「DropConnect」は、何をランダムに無効化するか。",
            options: ["重み（結合）そのもの", "ニューロン（ノード）", "バイアス", "入力データ"],
            answer: 0,
            explanation: "Dropoutは「点（ノード）」を消しますが、DropConnectは「線（重み）」を消します。より汎化性能が高いとされることもあります。"
        },
        {
            category: "勾配クリッピング(応用)",
            question: "正則化の一種ともみなせる「勾配クリッピング」は、主に何を防ぐために使われるか。",
            options: ["勾配爆発 (Exploding Gradient)", "勾配消失 (Vanishing Gradient)", "過学習", "局所解へのトラップ"],
            answer: 0,
            explanation: "勾配のノルムが閾値を超えたらカットすることで、学習が大きく飛びすぎて発散するのを物理的に防ぎます。"
        },
        {
            category: "データ拡張の副作用(応用)",
            question: "データ拡張を行いすぎると、どのような弊害が起こり得るか。",
            options: ["学習データの分布がテストデータの分布から乖離しすぎて、逆に精度が落ちる（Underfitting）", "過学習しやすくなる", "モデルが小さくなる", "計算が速くなる"],
            answer: 0,
            explanation: "例えば数字認識で「回転」をさせすぎると、6と9の区別がつかなくなり、学習が収束しなくなります（多様性と正解保持のトレードオフ）。"
        },
        {
            id: "reg-bn-mean-variance",
            category: "Batch Norm・平均と分散（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "Batch Normalizationで、ある特徴のミニバッチ値が $x=[1,3]$ である。分散をバッチ要素数2で割って求めるとき、平均 $\\mu_B$ と分散 $\\sigma_B^2$ の組合せはどれか。",
            options: ["$\\mu_B=1,\\ \\sigma_B^2=2$", "$\\mu_B=2,\\ \\sigma_B^2=1$", "$\\mu_B=2,\\ \\sigma_B^2=2$", "$\\mu_B=3,\\ \\sigma_B^2=1$"],
            answer: 1,
            explanation: "平均は $(1+3)/2=2$。分散は $\\{(1-2)^2+(3-2)^2\\}/2=(1+1)/2=1$ です。最初に平均、その後に平均との差の二乗平均を求めます。"
        },
        {
            id: "reg-bn-normalize-calc",
            category: "Batch Norm・標準化（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "前問の $x=[1,3],\\mu_B=2,\\sigma_B^2=1$ について、$\\varepsilon=0$ とする。$\\hat{x}=(x-\\mu_B)/\\sqrt{\\sigma_B^2+\\varepsilon}$ はどれか。",
            options: ["$[0,1]$", "$[1,3]$", "$[-1,1]$", "$[-2,2]$"],
            answer: 2,
            explanation: "各値から平均2を引くと $[-1,1]$。標準偏差 $\\sqrt{1}=1$ で割るため、そのまま $[-1,1]$ です。"
        },
        {
            id: "reg-bn-gamma-beta-calc",
            category: "Batch Norm・スケール変換（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "$\\hat{x}=[-1,1]$ に対し、$y=\\gamma\\hat{x}+\\beta$、$\\gamma=2,\\beta=0.5$ とする。出力 $y$ はどれか。",
            options: ["$[-2,2]$", "$[-0.5,1.5]$", "$[1.5,2.5]$", "$[-1.5,2.5]$"],
            answer: 3,
            explanation: "$2[-1,1]+0.5=[-2,2]+[0.5,0.5]=[-1.5,2.5]$ です。$\\gamma$ で幅、$\\beta$ で中心を調整します。"
        },
        {
            id: "reg-bn-gamma-beta-role",
            category: "Batch Norm・γとβ",
            difficulty: "標準",
            question: "Batch Normalizationの学習可能パラメータ $\\gamma$ と $\\beta$ の役割として正しいものはどれか。",
            options: ["正規化後の尺度と位置を、モデルに適した値へ学び直す", "バッチサイズを自動決定する", "平均と分散を常に0にする", "重みをスパースにする"],
            answer: 0,
            explanation: "$\\gamma$ はスケール、$\\beta$ はシフトです。標準化で一度そろえた後、必要な表現力を回復します。"
        },
        {
            id: "reg-bn-after-affine",
            category: "Batch Norm・出力分布",
            difficulty: "応用",
            question: "Batch Normalizationで標準化後に $y=\\gamma\\hat{x}+\\beta$ を適用した。$y$ の平均と分散について正しいものはどれか。",
            options: ["常に平均0・分散1", "常に平均1・分散0", "$\\gamma,\\beta$ により、平均0・分散1とは限らない", "バッチサイズだけで決まる"],
            answer: 2,
            explanation: "$\\hat{x}$ はおおむね平均0・分散1ですが、その後に学習可能な拡大縮小と平行移動を行うため、最終出力 $y$ は平均0・分散1に固定されません。"
        },
        {
            id: "reg-bn-cnn-axes",
            category: "Batch Norm・CNN",
            difficulty: "応用",
            question: "入力テンソルの形が $(N,C,H,W)$ のCNN用Batch Normalizationで、平均・分散をチャネルごとに求める主な集計方向はどれか。",
            options: ["$C$ 方向だけ", "$N,H,W$ 方向", "$N,C$ 方向", "$H$ 方向だけ"],
            answer: 1,
            explanation: "各チャネル $C$ を別々に扱い、そのチャネル内のバッチ $N$ と空間 $H,W$ の値を集めて平均・分散を計算します。"
        },
        {
            id: "reg-bn-train-inference",
            category: "Batch Norm・学習時と推論時",
            difficulty: "標準",
            question: "Batch Normalizationの統計量の使い分けとして正しいものはどれか。",
            options: ["学習時も推論時も現在の1件から計算", "学習時も推論時も平均0・分散1を固定", "学習時はミニバッチ統計、推論時は学習中に保存した移動平均", "学習時は移動平均、推論時はテストバッチ統計"],
            answer: 2,
            explanation: "学習時は現在のバッチから統計を計算し、同時に移動平均を更新します。推論時は保存済み統計を使い、入力件数に依存しない安定した出力を得ます。"
        },
        {
            id: "reg-group-norm-small-batch",
            category: "Group Norm",
            difficulty: "標準",
            question: "物体検出などでGPUメモリ制約によりバッチサイズが1〜2しか取れない。正規化手法の有力候補はどれか。",
            options: ["Batch Normだけ", "Dropout", "Weight decay", "Group Norm"],
            answer: 3,
            explanation: "Group Normは各サンプル内でチャネルをグループ分けして統計を取るため、バッチサイズに依存しません。"
        },
        {
            id: "reg-layer-norm-transformer",
            category: "Layer Norm",
            difficulty: "標準",
            question: "TransformerでLayer Normalizationが使いやすい主な理由はどれか。",
            options: ["各サンプル・トークンの特徴方向で正規化し、バッチサイズに依存しない", "画像の空間方向だけを正規化する", "推論時だけ動作する", "重みを0にする"],
            answer: 0,
            explanation: "Layer Normは同一サンプル内の隠れ次元で統計を取ります。バッチ統計が不要なので、系列モデルと相性が良い手法です。"
        },
        {
            id: "reg-instance-norm",
            category: "Instance Norm",
            difficulty: "標準",
            question: "Instance Normalizationの説明として正しいものはどれか。",
            options: ["バッチ全体の同じチャネルを正規化する", "各画像・各チャネルの空間方向を正規化し、スタイル変換などで使われる", "全チャネルを1つのグループに固定する", "損失関数を正規化する"],
            answer: 1,
            explanation: "画像1枚ごと、さらにチャネルごとに $H,W$ 方向の統計を取ります。画像固有のコントラスト情報を除きやすい特徴があります。"
        },
        {
            id: "reg-l1-penalty-calc",
            category: "L1正則化（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "重みが $w=[-2,1]$、L1正則化係数が $\\lambda=0.1$ のとき、ペナルティ $\\lambda\\sum_i|w_i|$ はいくつか。",
            options: ["0.1", "0.2", "0.3", "0.5"],
            answer: 2,
            explanation: "$0.1\\times(|-2|+|1|)=0.1\\times3=0.3$ です。L1では符号に関係なく絶対値を足します。"
        },
        {
            id: "reg-l2-penalty-calc",
            category: "L2正則化（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "重みが $w=[-2,1]$、$\\lambda=0.1$ のとき、L2ペナルティ $\\frac{\\lambda}{2}\\sum_iw_i^2$ はいくつか。",
            options: ["0.05", "0.1", "0.2", "0.25"],
            answer: 3,
            explanation: "$\\frac{0.1}{2}\\{(-2)^2+1^2\\}=0.05\\times5=0.25$ です。二乗してから合計します。"
        },
        {
            id: "reg-weight-decay-calc",
            category: "Weight decay（計算）",
            kind: "計算",
            difficulty: "応用",
            question: "データ損失の勾配を0とし、$w=2,\\eta=0.1,\\lambda=0.5$ とする。$w\\leftarrow(1-\\eta\\lambda)w$ による1回後の重みはどれか。",
            options: ["1.9", "1.5", "1.0", "2.1"],
            answer: 0,
            explanation: "$(1-0.1\\times0.5)\\times2=0.95\\times2=1.9$ です。weight decayは更新ごとに重みを少し縮めます。"
        },
        {
            id: "reg-inverted-dropout-calc",
            category: "Inverted Dropout（計算）",
            kind: "計算",
            difficulty: "標準",
            question: "Inverted Dropoutでドロップ率 $p=0.25$、活性値 $x=4$ が生き残った。学習時の出力 $x/(1-p)$ はどれか。",
            options: ["3", "$16/3\\approx5.33$", "4", "16"],
            answer: 1,
            explanation: "$4/(1-0.25)=4/0.75=16/3\\approx5.33$。消えなかった値を拡大し、期待値を学習時と推論時でそろえます。"
        },
        {
            id: "reg-batch-size-implicit",
            category: "陰的正則化・バッチサイズ",
            difficulty: "応用",
            question: "バッチサイズと汎化の関係について、最も適切な説明はどれか。",
            options: ["小さいほど必ず高精度", "大きいほど必ず高精度", "小さめのバッチは勾配ノイズが汎化に役立つ場合があるが、小さすぎると学習やBNが不安定", "バッチサイズは汎化に無関係"],
            answer: 2,
            explanation: "ミニバッチ勾配の揺らぎが陰的正則化として働く場合があります。ただし極端に小さいバッチは推定ノイズやBN統計の不安定化を招きます。"
        },
        {
            id: "reg-learning-rate-implicit",
            category: "陰的正則化・学習率",
            difficulty: "応用",
            question: "学習率を汎化性能の観点で調整するときの説明として正しいものはどれか。",
            options: ["大きいほど常に良い", "小さいほど常に良い", "0にすれば最適", "安定範囲内の大きめの学習率が平坦な解を促す場合があるが、大きすぎると発散する"],
            answer: 3,
            explanation: "学習率は最適化だけでなく陰的正則化にも関係します。ただし効果はデータやモデルに依存し、最終的には検証データで選びます。"
        },
        {
            id: "reg-randaugment",
            category: "画像データ拡張・RandAugment",
            difficulty: "標準",
            question: "RandAugmentの特徴として正しいものはどれか。",
            options: ["適用する変換数と強度という少数の設定で、画像変換をランダムに組み合わせる", "画像を必ず左右反転するだけ", "特徴量を平均0にする", "複数モデルを直列に学習する"],
            answer: 0,
            explanation: "複雑な方策探索を簡略化し、何種類の変換をどれくらい強く適用するかを主に調整します。"
        },
        {
            id: "reg-random-erasing",
            category: "画像データ拡張・Random Erasing",
            difficulty: "標準",
            question: "Random Erasingの狙いとして最も適切なものはどれか。",
            options: ["画像全体を削除する", "画像の一部領域を隠し、遮蔽に頑健な特徴を学ばせる", "クラスラベルを削除する", "解像度を必ず2倍にする"],
            answer: 1,
            explanation: "ランダムな矩形領域を消すことで、特定の局所部分だけに依存しない認識を促します。"
        },
        {
            id: "reg-eda",
            category: "自然言語データ拡張・EDA",
            difficulty: "標準",
            question: "自然言語のEDA（Easy Data Augmentation）に含まれる代表的な操作はどれか。",
            options: ["時間・周波数マスク", "画像のランダムクロップ", "同義語置換・ランダム挿入・交換・削除", "バッチ統計による正規化"],
            answer: 2,
            explanation: "EDAは文の意味をなるべく保ちながら、単語レベルの簡単な操作で訓練文を増やします。"
        },
        {
            id: "reg-specaugment",
            category: "音声データ拡張・SpecAugment",
            difficulty: "標準",
            question: "SpecAugmentが主に行う処理はどれか。",
            options: ["音声をテキストへ変換する", "重みをランダムに削除する", "複数モデルを平均する", "スペクトログラムの時間帯や周波数帯をマスクする"],
            answer: 3,
            explanation: "時間マスキングや周波数マスキングにより、一部が欠けても認識できる頑健な音声モデルを学習します。"
        },
        {
            id: "reg-bootstrap",
            category: "アンサンブル・Bootstrap",
            difficulty: "標準",
            question: "Bootstrap標本の作り方として正しいものはどれか。",
            options: ["元データから重複を許して復元抽出する", "元データを重複なしで1回ずつ使う", "テストデータを訓練へ混ぜる", "特徴量を全て0にする"],
            answer: 0,
            explanation: "選んだデータを母集団へ戻して再び選べるため、同じサンプルが複数回入り、選ばれないサンプルも生じます。"
        },
        {
            id: "reg-bagging-boosting",
            category: "BaggingとBoosting",
            difficulty: "標準",
            question: "BaggingとBoostingの違いとして正しいものはどれか。",
            options: ["両方とも必ず1モデルだけ使う", "Baggingは独立・並列、Boostingは前段の誤りを受けて逐次的に学習", "Baggingは逐次、Boostingは独立・並列", "両方ともデータ拡張ではないので学習しない"],
            answer: 1,
            explanation: "Baggingは複数モデルの平均で主に分散を下げます。Boostingは弱学習器を順につなぎ、前の誤りを補います。"
        },
        {
            id: "reg-stacking",
            category: "アンサンブル・Stacking",
            difficulty: "標準",
            question: "Stackingの説明として正しいものはどれか。",
            options: ["データを縦に連結する", "同じモデルの重みを0にする", "複数のベースモデルの予測を、別のメタモデルの入力にする", "学習率を段階的に下げる"],
            answer: 2,
            explanation: "異なるモデルの得意・不得意を、上位のメタモデルが組み合わせます。メタモデル用データのリーク防止も重要です。"
        },
        {
            id: "reg-random-search",
            category: "ハイパーパラメータ・Random Search",
            difficulty: "応用",
            question: "高次元の探索で、実際に重要なハイパーパラメータが一部だけの場合、Grid SearchよりRandom Searchが有利になりやすい理由はどれか。",
            options: ["同じ組合せだけを繰り返すから", "勾配を厳密計算するから", "必ず最適解を証明できるから", "限られた試行回数で各重要軸の多様な値を試しやすいから"],
            answer: 3,
            explanation: "Grid Searchは重要でない軸の組合せに試行を使いがちです。Random Searchは各軸の値を広く試せます。"
        },
        {
            id: "reg-bayesian-optimization",
            category: "ハイパーパラメータ・ベイズ最適化",
            difficulty: "応用",
            question: "ベイズ最適化が特に向く状況はどれか。",
            options: ["1回の学習評価が高価で、過去の結果から有望な次候補を選びたい", "評価が無料で全組合せを試せる", "ハイパーパラメータが存在しない", "訓練データを増やしたいだけ"],
            answer: 0,
            explanation: "代理モデルで性能を予測し、獲得関数で探索と活用を両立させながら次の候補を選びます。"
        },
        {
            id: "reg-hyperparameter-data-split",
            category: "ハイパーパラメータ・データ分割",
            difficulty: "標準",
            question: "ハイパーパラメータを選ぶときのデータの使い方として正しいものはどれか。",
            options: ["テストデータで何度も調整する", "検証データで調整し、テストデータは最終評価にだけ使う", "訓練データを使わない", "検証データを最終学習の正解ラベルとして混ぜる"],
            answer: 1,
            explanation: "テストデータを繰り返し見て調整すると、テストデータへ過学習して公正な最終評価ではなくなります。"
        }
    ]
};
