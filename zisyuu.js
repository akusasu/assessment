(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    const zyuuniseiza = document.getElementById('rty-name')

    /** 
    * 指定した要素の子どもを全て削除する
    * @param {HTMLElement} element HTMLの要素
    */

    function removeAllChildren(okokoko) { //　引き数はこのプログラムの場合には、どんな値を入れてもOK!　4つ同じ名前を入れればOK!
        while (okokoko.firstChild) { // 要素の子どもの要素があるかぎり削除。
            okokoko.removeChild(okokoko.firstChild);
        }
    }

    assessmentButton.onclick = () => { 
        const userName = userNameInput.value; // userNameにあなたのいいところ診断のテキストに入力された名前を取得する。という意味。
        const rtyName = zyuuniseiza.value; 
        if (userName.length === 0) { // 名前が空の時は処理を終了する!!!!
            return;
        }


        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName, rtyName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);


        // TODO ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = '#あなたのいいところ をツイートする';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    }; 

    userNameInput.onkeypress = (evenr) => { //　引き数はこのプログラムの場合には、どんな値を入れてもOK!　2つ同じ名前を入れればOK!
        if (evenr.keyCode === 13) {
            assessmentButton.onclick();
        }
    };



    const answers = [
        '{rtyName}の{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{rtyName}の{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{rtyName}の{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{rtyName}の{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{rtyName}の{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{rtyName}の{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{rtyName}の{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{rtyName}の{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{rtyName}の{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{rtyName}の{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{rtyName}の{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{rtyName}の{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{rtyName}の{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{rtyName}の{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{rtyName}の{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{rtyName}の{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];


    /** 
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
    function assessment(userName, rtyName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);
        result = result.replace(/{rtyName}/g, rtyName);
        return result;
    }
})();


