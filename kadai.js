window.onload = function () {
    // タスクリストの作成(配列)
    let taskList = [];
    // タスクを記述するテーブルタグ(tbody)のIDを取得(タスクリスト)
    const listArea = document.getElementById('listarea');
    // タスクを格納する連想配列を作成する関数
    // inputボタンの値を受け取る
    const addTask = (taskValue) => {
        const task = {
            id: taskList.length,
            comment: taskValue,
            state: 0
        };
        taskList.push(task);
    };
    // 「作業中」ボタンの追加
    const addWorkBtn = () => {
        const td = document.createElement('td');
        const button = document.createElement('button');
        listArea.lastElementChild.appendChild(td).appendChild(button);
        listArea.lastElementChild.lastElementChild.lastElementChild.textContent = '作業中';
    };
    // 「削除」ボタンの追加
    const addRemoveBtn = () => {
        const td = document.createElement('td');
        const button = document.createElement('button');
        listArea.lastElementChild.appendChild(td).appendChild(button);
        listArea.lastElementChild.lastElementChild.lastElementChild.textContent = '削除';
        return button;
    };
    // 「削除」ボタン押下時のイベントの追加
    const addRemoveEvent = (button) => {
        button.addEventListener('click', function() {
            // クリックイベントが発生した要素のID(=対象オブジェクトのid)を取得
            const num = this.parentElement.parentElement.firstElementChild.textContent;
            // 配列から対象の要素を削除して積める
            taskList.splice( num, 1 );
            // 各タスクのidの降り直し
            for (let i = 0; i < taskList.length; i++) {
                taskList[i].id = i;
            };
            // htmlへの再出力
            putBtn();
        });
    };
    // 追加ボタンが押下された時の処理
    const putBtn = () => {
        // タスクリストのタイトル部分以外を削除
        listArea.innerHTML = '';
        // フォームの内容をからにする
        document.getElementById('task').value = '';
        taskList.forEach(value => {
            const tr = document.createElement('tr');
            listArea.appendChild(tr);
            const td = document.createElement('td');
            listArea.lastElementChild.appendChild(td).textContent = value.id;
            const tdTask = document.createElement('td');
            listArea.lastElementChild.appendChild(tdTask);
            listArea.lastElementChild.lastElementChild.textContent = value.comment;
            addWorkBtn();
            let button = addRemoveBtn();
            addRemoveEvent(button);
        });
    };
    // 追加ボタンが押下された時の処理
    const addEvent = () => {
        // 追加するタスクの内容を取得
        const taskValue = document.getElementById('task').value;
        // タスクの内容(taskValue)をタスクの追加関数(addTask)に渡す
        addTask(taskValue);
        putBtn();
    };
    document.getElementById('addbtn').addEventListener('click', addEvent);
}