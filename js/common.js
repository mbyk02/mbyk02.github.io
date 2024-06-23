
(function ($) {
    'use strict';
  
    //合計問題数
    let $questionTotalNum = 5;
  
    /* -----------------------------------------------
      県庁所在地クイズ
    -------------------------------------------------- */
    const prefecturalCapital = [    /* const は「再代入できない変数」を定義する変数宣言 */
      {
        id: "01",
        question: "これまでにモデルになっていない日本の地方は？",
        answer01: "中部",
        answer02: "九州",
        answer03: "近畿",
        answer04: "北海道",
      },
      {
        id: "02",
        question: "XY（第６世代）から登場した施設は？",
        answer01: "ブティック",
        answer02: "フレンドリィショップ",
        answer03: "バトルフロンティア",
        answer04: "無人発電所",
      },
      {
        id: "03",
        question: "ロコンのしっぽの数は？",
        answer01: "６",
        answer02: "９",
        answer03: "３",
        answer04: "１",
      },
      {
        id: "04",
        question: "リーフィアが初登場した世代は？",
        answer01: "ダイアモンド・パール（第４世代）",
        answer02: "赤緑（初代）",
        answer03: "ルビー。サファイア（第３世代）",
        answer04: "XY（第6世代）",
      },
      {
        id: "05",
        question: "シャドーボールを受けた際、２０％で起こる追加効果とは？",
        answer01: "D１段階ダウン",
        answer02: "B１段階ダウン",
        answer03: "S１段階ダウン",
        answer04: "C１段階ダウン",
      },
      {
        id: "06",
        question: "スカーレット・バイオレット（第９世代）の男主人公の名前は？",
        answer01: "ハルト",
        answer02: "ヨウ",
        answer03: "マサル",
        answer04: "レッド",
      },
      {
        id: "07",
        question: "ギラティナの専用技は？",
        answer01: "シャドーダイブ",
        answer02: "ダークホール",
        answer03: "エアロブラスト",
        answer04: "さばきのつぶて",
      },
      {
        id: "08",
        question: "「たかさ」が最も大きいポケモンは？",
        answer01: "ムゲンダイナ",
        answer02: "ホエルオー",
        answer03: "アクジキング",
        answer04: "フーパ（ときはなたれしフーパ）",
      },
      {
        id: "09",
        question: "６００族のポケモンは？",
        answer01: "ヌメルゴン",
        answer02: "オンバーン",
        answer03: "ジュラルドン",
        answer04: "フライゴン",
      },
      {
        id: "10",
        question: "ミミッキュの\"専用\"Z技は？",
        answer01: "ぽかぼかフレンドタイム",
        answer02: "てんこがすめつぼうのひかり",
        answer03: "むげんあんやへのいざない",
        answer04: "ラブリースターインパクト",
      },
      {
        id: "11",
        question: "ブラッキーが初登場した世代は？",
        answer01:"ルビー。サファイア（第３世代）",
        answer02: "赤緑（初代）",
        answer03: "ダイアモンド・パール（第４世代）",
        answer04: "XY（第6世代）",
      },

    ];
  
    //質問をランダムにする
    function shuffleQuiz(array) {
      for (let i = (array.length - 1); 0 < i; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let selected = array[i];
        array[i] = array[random];
        array[random] = selected;
      }
      return array;
    }
    let quizId = ["01", "02", "03", "04", "05","06","07","08","09","10","11"];
    shuffleQuiz(quizId);
    
  
    //現在の質問数
    let $currentNum = 0;
  
    //得点
    let $pointPerCorrect = 10;
  
    let questionObject = (function () {
      let Obj = function ($target) {
  
        //質問の番号
        this.$questionNumber = $target.find('.quiz-question-number');
  
        //質問文
        this.$questionName = $target.find('.quiz-question');
  
        //選択肢ボタン
        this.$questionButton = $target.find('.quiz-button');
        this.$button01 = $target.find('.button01');
        this.$button02 = $target.find('.button02');
        this.$button03 = $target.find('.button03');
        this.$button04 = $target.find('.button04');
  
        //選択肢のテキスト
        this.$answer01 = $target.find('.quiz-text01');
        this.$answer02 = $target.find('.quiz-text02');
        this.$answer03 = $target.find('.quiz-text03');
        this.$answer04 = $target.find('.quiz-text04');
  
        //score
        this.$score = $target.find('.score-wrap .score');
  
        this.init();
      };
      Obj.prototype = {
        //初回設定
        init: function () {
          //イベント登録
          this.event();
        },
        event: function () {
          let _this = this;
          let score = 0;
  
          //ウインドウ読み込み時
          $(window).on('load', function () {
            //value取得
            let value = quizId[$currentNum]; //最初は0（1番目）
            //次の質問を取得
            let nextQuestion = _this.searchQuestion(value);
            //次の質問に切り替える
            _this.changeQuestion(nextQuestion);
            //回答のシャッフル
            _this.shuffleAnswer($('.quiz-answer'));
          });
  
          //button クリック
          this.$questionButton.on("click", function () {
  
            if ($(this).hasClass('button01')) {
              $(this).parents('.quiz-answer').addClass('is-correct');
              score = score + $pointPerCorrect;
            } else {
              $(this).parents('.quiz-answer').addClass('is-incorrect');
            }
  
            $(this).addClass('is-checked');
  
            if ($currentNum + 1 == $questionTotalNum) {
              setTimeout(function () {
                $('.finish').addClass('is-show');
                $('.score-wrap .score').text(score);
              }, 1000);
            } else {
              setTimeout(function () {
                //現在の数字の更新
                $currentNum = $currentNum + 1;
  
                //次の質問番号を取得
                let value = quizId[$currentNum];
  
                //次の質問を取得
                let nextQuestion = _this.searchQuestion(value);
  
                //次の質問に切り替える
                _this.changeQuestion(nextQuestion);
  
                //クラスを取る
                _this.$questionButton.removeClass('is-checked');
                $('.quiz-answer').removeClass('is-correct').removeClass('is-incorrect');
  
                //回答のシャッフル
                _this.shuffleAnswer($('.quiz-answer'));
  
              }, 1000);
            }
            return false;
          });
        },
        searchQuestion: function (questionId) {
          let nextQuestion = null;
          prefecturalCapital.forEach(function (item) {
            if (item.id == questionId) {
              nextQuestion = item;
            }
          });
          return nextQuestion;
        },
        changeQuestion: function (nextQuestion) {
          let _this = this;
  
          //質問文の入れ替え
          _this.$questionName.text(nextQuestion.question + '');
  
          //質問番号を1つ増やす
          let numPlusOne = $currentNum + 1;
          _this.$questionNumber.text('質問' + numPlusOne);
  
          //選択肢のテキストの入れ替え
          _this.$answer01.text(nextQuestion.answer01);
          _this.$answer02.text(nextQuestion.answer02);
          _this.$answer03.text(nextQuestion.answer03);
          _this.$answer04.text(nextQuestion.answer04);
        },
        shuffleAnswer: function (container) {
          let content = container.find("> *");
          let total = content.length;
          content.each(function () {
            content.eq(Math.floor(Math.random() * total)).prependTo(container);
          });
        },
      };
      return Obj;
    })();
  
    let quiz = $('.quiz');
    if (quiz[0]) {
      let queInstance = new questionObject(quiz);
    }
  
  
  })(jQuery);
