import "./styles.css";

const onClickAdd = () => {
  //インプットボックスに入力された内容を追加ボタンを推した際にgetする
  //インプットボックスの情報にアクセスするための目印が必要
  //ID="add-text"で示されたインプットボックスにある値を取得
  const inputText = document.getElementById("add-text").value;

  // インプットボックスの値を取得後はインプットボックスの中身をクリアする
  document.getElementById("add-text").value = "";
  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //divタグの生成
  /**
   * DOMはDocument Object Modelの略でHTMLやXML文書を取り扱うためのAPI
   */
  const div = document.createElement("div"); //HTMLのdomを生成 divタグ
  div.className = "list-row"; //divタグにクラス名としてlist-rowを入れる
  const li = document.createElement("li"); //HTMLのdomを生成 liタグ
  li.innerText = text; //li.innerTextにボタンを追加ボタンを推した際に取得したTextを代入

  //button(完了)タグの生成
  const completeButton = document.createElement("button");
  //完了という文字をボタンタグに入れる
  completeButton.innerText = "完了";
  //ボタンタグが作られた時点でボタンタグのイベントの割りあてをする
  completeButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode);
    //完了リストに追加する要素
    const addTarget = completeButton.parentNode; // 完了ボタンの親要素取得
    const text = addTarget.firstElementChild.innerText; //最初の要素のテキスト取得

    //div以下を初期化
    addTarget.textContent = null;

    // liタグの生成
    const li = document.createElement("li");
    li.innerText = text;
    //buttonタグ(戻す)の生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    //戻すボタンが押されたときのイベントを定義する
    //戻すボタンが押されたら完了リストにタスクを戻す
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ(div)を完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得, 押されたボタンの親要素であるdivタグの最初の要素のliタグのテキストを取得
      const text = backButton.parentNode.firstChild.innerText;
      createIncompleteList(text); //未完了リストに追加
    });

    //divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);
    //完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //未完了リストから指定の要素を削除する関数
  const deleteFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
  };

  //button(削除)タグの生成
  const deleteButton = document.createElement("button");
  //削除という文字をボタンタグに入れる
  deleteButton.innerText = "削除";
  //ボタンタグが作られた時点でボタンタグのイベントの割りあてをする
  deleteButton.addEventListener("click", () => {
    //おされた削除ボタンの親タグ(div)を未完了リストから削除
    const deleteTarget = deleteButton.parentNode;
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  //divタグの子要素に各要素を設定する
  div.appendChild(li); //divタグの子要素にliタグを入れる
  div.appendChild(completeButton); //divタグの子要素にbutton(完了)タグを入れる
  div.appendChild(deleteButton); //divタグの子要素にbutton(削除)タグを入れる

  //未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button") //ボタンをクリックしたときにadd-button　IDを受け取る
  //clickした際にclickイベントを付与して、onClickAdd()を実行する
  .addEventListener("click", () => onClickAdd());
