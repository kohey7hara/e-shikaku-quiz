// js/config.js

const menuConfig = [
    // =================================================================
    // １．数学的基礎
    // =================================================================
    {
        id: "01_math_basics",
        title: "1-（２）（３）確率・統計 & 情報理論",
        desc: "ベイズ則 / 最尤推定 / MAP推定 / エントロピー / KLダイバージェンス",
        isActive: true // ★データ作成済み
    },

    // =================================================================
    // ２．機械学習
    // =================================================================
    {
        id: "02_ml_basics_1",
        title: "2-（１）機械学習の基礎：パターン認識・分類",
        desc: "k近傍法 / 距離計算 / 教師あり・なし・半教師あり / 過学習",
        isActive: true // データ未作成（リンク有効）
    },
    {
        id: "02_ml_basics_2",
        title: "2-（１）機械学習の基礎：検証・性能指標",
        desc: "交差検証 / Accuracy / Precision / Recall / F値 / ROC / AUC",
        isActive: true // データ未作成（リンク有効）
    },

    // =================================================================
    // ３．深層学習の基礎
    // =================================================================
    {
        id: "03_dl_feedforward",
        title: "3-（１）順伝播型ネットワーク",
        desc: "MLP / 損失関数(MSE, CrossEntropy) / 活性化関数(ReLU, Sigmoid)",
        isActive: true
    },
    {
        id: "03_dl_optimization",
        title: "3-（２）深層モデルのための最適化",
        desc: "SGD / Momentum / Adam / 誤差逆伝播法 / 初期化(He, Xavier)",
        isActive: true
    },
    {
        id: "03_dl_regularization",
        title: "3-（３）深層モデルのための正則化",
        desc: "L1・L2正則化 / Dropout / Early Stopping",
        isActive: true
    },
    {
        id: "03_dl_cnn",
        title: "3-（４）CNN (畳み込みニューラルネットワーク)",
        desc: "畳み込み / Pooling / 受容野 / Im2Col / 1x1畳み込み",
        isActive: true
    },
    {
        id: "03_dl_rnn",
        title: "3-（５）RNN (リカレントニューラルネットワーク)",
        desc: "BPTT / LSTM / GRU / ゲート機構 / Seq2Seq / Attention",
        isActive: true
    },
    {
        id: "03_dl_transformer",
        title: "3-（６）Transformer",
        desc: "Self-Attention / Multi-Head Attention / Positional Encoding",
        isActive: true
    },
    {
        id: "03_dl_generalization",
        title: "3-（７）汎化性能向上のテクニック",
        desc: "データ拡張(MixUp) / Batch Norm / アンサンブル / ハイパーパラメータ探索",
        isActive: true
    },

    // =================================================================
    // ４．深層学習の応用
    // =================================================================
    {
        id: "04_app_image",
        title: "4-（１）（２）（３）画像認識・物体検出・セグメンテーション",
        desc: "ResNet / ViT / YOLO / R-CNN / FCN / U-Net / IoU / mAP",
        isActive: true
    },
    {
        id: "04_app_nlp",
        title: "4-（４）自然言語処理",
        desc: "Word2Vec / BERT / GPT / Prompt Learning",
        isActive: true
    },
    {
        id: "04_app_generative",
        title: "4-（６）生成モデル",
        desc: "GAN / VAE / 拡散モデル / フローベース",
        isActive: true
    },
    {
        id: "04_app_rl",
        title: "4-（７）深層強化学習",
        desc: "DQN / A3C / 方策勾配法 / 報酬",
        isActive: true
    },
    {
        id: "04_app_misc",
        title: "4-（８）（９）様々な学習方法 & 説明性",
        desc: "転移学習 / 距離学習 / XAI (Grad-CAM, SHAP, LIME)",
        isActive: true
    },

    // =================================================================
    // ５．開発・運用環境
    // =================================================================
    {
        id: "05_dev_env",
        title: "5-（１）〜（４）開発環境と軽量化",
        desc: "軽量化(蒸留, 量子化) / Docker / 分散処理 / GPU / TPU",
        isActive: true
    }
];
