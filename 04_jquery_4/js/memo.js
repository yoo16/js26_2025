$(function () {
    var selected = $();

    const defaultClass = "flex justify-between bg-white items-center p-3";
    const selectedClass = "selected bg-sky-100";
    const unselectedClass = "bg-gray-100";

    function newItem() {
        const value = getInputValue();
        //TODO: liタグを作成し、テキスト表示
        const li = $("<li>");
        // バニラJSの場合
        // const li = document.createElement('li');
        li.text(value)
        // console.log(li)
        //TODO: addClass() で defaultClass を追加
        li.addClass(defaultClass)

        // span タグを作成
        const span = $('<span>')
        // const span = document.createElement('span');

        // span タグに x の文字を設定
        span.text('×')
        // spna.innerText = '×'

        // class を追加
        const deleteClass = "text-sm bg-red-500 text-white cursor-pointer rounded-full px-2 py-1"
        span.addClass(deleteClass)
        // span.classList.add(deleteClass)

        // クリックしたら親要素（li）を削除
        span.on('click', function () {
            // alert('delete!')
            // 自分の親要素 li を削除
            $(this).parent().remove()
        })
        // span.addEventListener('click', function () {
        //     this.parentElement.remove()
        // })

        // li をクリックしたら
        li.on('click', function () {
            // 訂正せんを引く
            $(this).toggleClass('line-through')
        })
        // li をマウスオーバーしたら 自分の背景をかえる
        // li をマウスアウトしたら 元にもどす
        li.on({
            mouseover: function () {
                // 自分の背景をかえる : class="bg-sky-300"
                $(this).addClass('bg-sky-300')
            },
            mouseout: function () {
                // 自分の背景を元にもどす : class=""
                $(this).removeClass('bg-sky-300')
            },
        })

        li.append(span)

        return li;
    }

    function flashMessage(text) {
        $('#message').text(text);
        setTimeout(function () {
            $('#message').text('');
        }, 2000);
    }

    function getInputValue() {
        // テキストボックスの値を取得し、前後の空白を削除
        // 値が空の場合は 'new memo' を返す
        return $('#input-text').val().trim() || 'new memo';
    }

    $('#btn-append').on('click', function () {
        const element = newItem();
        // TODO: 親要素(id=item-list)の最後に追加(append)
        $('#item-list').append(element);

        $('#input-text').val('');
    });

    $('#btn-prepend').on('click', function () {
        const element = newItem();
        // TODO: 親要素(id=item-list)の最初に追加(prepend)
        $('#item-list').prepend(element);

        // TODO: テキストボックス(id=input-text)を空にする
        $('#input-text').val('');
    });

    $('#btn-before').on('click', function () {
        if (selected.length) {
            const element = newItem();
            // TODO: 選択中の要素の前に追加(before)
            selected.before(element);

            $('#input-text').val('');
        } else {
            flashMessage('メモを選択してください');
        }
    });

    $('#btn-after').on('click', function () {
        if (selected.length) {
            const element = newItem();
            // TODO: 選択中の要素の後に追加(after)
            selected.after(element);

            $('#input-text').val('');
        } else {
            flashMessage('メモを選択してください');
        }
    });

    $('#btn-remove').on('click', function () {
        if (selected.length) {
            // TODO: 選択中の要素を削除(remove)
            selected.remove();

            // 選択解除
            selected = $();
        } else {
            flashMessage('メモを選択してください');
        }
    });

    $('#item-list').on('click', 'li', function () {
        // すべての li の選択解除
        $('#item-list li').removeClass(selectedClass).addClass(unselectedClass);
        // 自分の場合は、選択状態
        $(this).addClass(selectedClass).removeClass(unselectedClass);

        // TODO: 選択処理: 最後にクリックされた li が記憶
        selected = $(this)
    });
});