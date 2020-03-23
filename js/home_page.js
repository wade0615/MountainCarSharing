
// 定義 所有共乘資訊 的url
const allRecordURL = "https://carsharing.rayoutstanding.space/api/post?row=100"

// 定義 站內共乘資訊 的url
const record_ptt = "https://carsharing.rayoutstanding.space/api/post?type=2&row=100"

// 定義 登出 的url
const logout = "https://carsharing.rayoutstanding.space/api/logout"

// 定義 新增共乘 的url
const post = "https://carsharing.rayoutstanding.space/api/post"

// get cookie
let cookie = document.cookie.split("=");

// var search_range = $("#search_range").val()
// var search_departure = $("#search_departure").val()

// 一進畫面就先讀取一次第一筆資料
mainFunction();
function mainFunction(){
    console.log(cookie[1])
    getAllRecord();
}

// 抓取 所有共乘資訊
function getAllRecord(){
    fetch(allRecordURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization:`Bearer ${cookie[1]}`, Accept: "application/json; charset=utf-8", "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response => {
            response = Promise.resolve(response.json());
            response.then(result => {
                const callbackRecords = result.data;
                type = callbackRecords.type;
                // console.log(data);
                // console.log("我要列出所有資料啦");
                recordlist(callbackRecords);
            });
        })
        .catch(err => {
            console.log(err);
            alert('Failed!'); 
        })
};

// 抓取 搜尋條件中的共乘資訊
function get_search_record(){
    var search_range = $("#search_range").val();
    var search_departure = $("#search_departure").val();
    var search_destination = $("#search_destination").val();
    var search_date = $("#search_departure_date").val();
    var search_url = `https://carsharing.rayoutstanding.space/api/post?departure_date=${search_date}&departure=${search_departure}&destination=${search_destination}&type=${search_range}&row=100`
    console.log(search_url);
    $.ajax({
    url: search_url,
    type: 'GET',
    datatype: 'json',
    headers: {
        Authorization:`Bearer ${cookie[1]}`,
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
    },
    beforeSend: function(){
        console.log(this)
    },
    success: function(json) { 
        data = json["data"];
        type = data[0].type;
        console.log("我要列出ptt資料啦");
        recordlist();
    },
    error: function(err) { 
        console.log(err);
        // alert('Failed!'); 
    },
    });
};

// 登出
const btnDanger = document.querySelector('.btn-danger');
btnDanger.addEventListener('click', () => {
    fetch(logout, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Authorization:`Bearer ${cookie[1]}`, 
            Accept: "application/json; charset=utf-8", 
            "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(() => {
            window.location.href='./index.html'
        })
        .catch(err => {
            console.log(err);
            alert("登出失敗");
            window.location.href='./index.html'
        })
});

// 新增共乘資料
$(".btn-info").click(
    function() {
        $.ajax({
            url: post,
            type: 'POST',
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${cookie[1]}`
            },
            data: JSON.stringify({
                subject: $("#add_subject").val(),
                departure_date: $("#add_departure_date").val(),
                departure: $("#add_departure").val(),
                destination: $("#add_destination").val(),
                description: $("#add_description").val(),
                seat: $("#add_seat").val(),
            }),
            success: function() {
                alert("新增成功");
                $("#add").css("display","none");
                $("#list").css("display","none");
                $("ul").empty();
                getAllRecord();
                clean_records();
            },
            error: function(err) { 
                console.log(err);
                alert("新增失敗");
            },
            });
    }
);

// 顯示共乘資訊
const ul = document.querySelector('ul');

function recordlist(callbackRecords) {
    console.log("陣列出共乘資訊", callbackRecords);
    callbackRecords.forEach((callbackRecord, index) => {
        let li = document.createElement('li');

        if ( callbackRecord.type === 1 ) {
            ul.appendChild(li);
            li.setAttribute('value', `${index}`)
            li.innerHTML = `<span class="local_data">[站內]</span><p>${callbackRecord.subject}</p>`;
        } else if (callbackRecord.type === 2) {
            ul.appendChild(li);
            li.setAttribute('value', `${index}`)
            li.innerHTML = `<span class="ptt_data">[PTT]</span><p>${callbackRecord.subject}</p>`;
        }
        }
    )
    moreImfor(callbackRecords);
};

// 列出詳細資訊
const list = document.querySelector('#list');
const list_subject = document.querySelector('#list_subject');
const list_departure_date = document.querySelector('#list_departure_date');
const list_departure = document.querySelector('#list_departure');
const list_destination = document.querySelector('#list_destination');
const list_seat = document.querySelector('#list_seat');
const list_description = document.querySelector('#list_description');

const list_ptt = document.querySelector('#list_ptt');
const list_ptt_subject = document.querySelector('#list_ptt_subject');
const list_ptt_departure_date = document.querySelector('#list_ptt_departure_date');
const list_ptt_description = document.querySelector('#list_ptt_description');
const pttUrl = document.querySelector("#list_ptt_url");

function moreImfor(callbackRecords) {
    let recordsList = document.querySelectorAll('li');

    recordsList.forEach(e => e.addEventListener('click', function() {
        let thisValue = $(this).val();
        let thisRecord = callbackRecords[thisValue];

        if ( thisRecord.type === 1 ) {
            list.setAttribute("style", "display:block");
            list_subject.setAttribute("value", thisRecord.subject);
            list_departure_date.setAttribute("value", thisRecord.departure_date);
            list_departure.setAttribute("value", thisRecord.departure);
            list_destination.setAttribute("value", thisRecord.destination);
            list_seat .setAttribute("value", thisRecord.seat);
            list_description.setAttribute("value", thisRecord.description);
        } else if (thisRecord.type === 2) {
            list_ptt.setAttribute("style", "display:block");
            list_ptt_subject.setAttribute("value", thisRecord.subject);
            list_ptt_departure_date.setAttribute("value", thisRecord.departure_date);
            pttUrl.setAttribute("href", thisRecord.ptt_url);
            list_ptt_description.setAttribute("value", thisRecord.description);
        }
    }))
}


// 點擊按鈕開始新增共乘
const add = document.querySelector('#add');
const search = document.querySelector('#search');

document.querySelector('.btn-add').addEventListener('click', () => {
    add.setAttribute("style", "display:block")
});

// 取消返回主頁
document.querySelectorAll('.btn-secondary').forEach(e => e.addEventListener('click', () => {
    add.setAttribute("style", "display:none")
    list.setAttribute("style", "display:none")
    list_ptt.setAttribute("style", "display:none")
    search.setAttribute("style", "display:none")
    })
)

// 點擊按鈕進入 搜尋 頁面
document.querySelector('.btn-search').addEventListener('click', () => {
    search.setAttribute("style", "display:block");
});

// 一但開始 搜尋 先清空<ul>
document.querySelector('.btn-warning').addEventListener('click', () => {
    search.setAttribute("style", "display:none");
    ul.innerHTML = '';
    get_search_record()
});

// 清空新增欄位詳細資訊
function clean_records() {
    $("#add_subject").val("")
    $("#add_departure_date").val("")
    $("#add_departure").val("")
    $("#add_destination").val("")
    $("#add_seat").val("")
    $("#add_description").val("")
}