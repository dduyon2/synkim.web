
function createTable(arrayData) {

    console.log(arrayData)
    $('#data').append('<table id="jsonTable"><thead><tr></tr></thead><tbody id="jsonTbody"></tbody></table>');

    $('#jsonTable thead tr').append('<th></th>');
    $('#jsonTable thead tr').append('<th></th>');
    $.each(Object.values(arrayData[0]), function (index, key) {
        console.log("index"+ index + "    key : "+ key);
        $('#jsonTable thead tr').append('<th>' + key + '</th>');
    });

    $.each(arrayData, function (index, jsonObject) {
        if(index === 0 || index ===1) return;
        if (Object.keys(jsonObject).length > 0) {
            var tableRow = '<tr>';
            tableRow += "<td><input type='button' class='editBtn' onclick='getId(this)'></td>";
            tableRow += "<td><input style='height: 10px; width: 10px;' class= 'select' type='checkbox'></td>";
            $.each(Object.keys(jsonObject), function (i, key) {
                tableRow += '<td>' + jsonObject[key] + '</td>';
            });
            tableRow += "</tr>";
            $('#jsonTable tbody').append(tableRow);
        }
    });

    return setFields();
}
function getId(row) {
    var index = row.closest('tr').rowIndex;
    editForm(index);

}
// dt -> db에 넣기(파일로쓰기로 지금만 대체)
// dt -> 표에 한줄 추가
function setFields() {
    const fieldsList = [];
    var tble = document.querySelectorAll("#jsonTable tr");
    console.log(tble);
    var cols = tble[0].querySelectorAll("th");
    console.log('c:'+ cols);
    for(let i=2;i<cols.length; i++) {
        fieldsList[i-1] = cols[i].innerText;
    }
    document.getElementById("inputColumn").value= fieldsList.join(",");
    return fieldsList;
}

function changeFields(org_fields, new_fields) {
   var index = new_fields.filter((word) => !org_fields.includes(word));
   console.log(index);
   var tble = document.querySelectorAll("#data table tr");
   var cols = tble[0].querySelectorAll("th").length;

   for(let i=0;i<index.length;i++) {
       $('#jsonTable thead tr').append('<th>' + index[i] + '</th>');
       $('#jsonTable tr:gt(0)').append('<td></td>');}

}
function addData(data) {

}

function deleteData() {
    document.querySelectorAll("#data .select:checked").forEach(e => {
        e.parentNode.parentNode.remove();

    });
    //todo : delete data from DB
}


function exportData() {
    const text = [];
    const rows = document.querySelectorAll("#data table tr");
    // console.log(rows);
    for(let i=0; i< rows.length;i++) {
        const row = [], cols= rows[i].querySelectorAll("td, th");
        // console.log(cols);
        for (let j=1;j<cols.length;j++) {
            console.log(cols[j].innerHTML);
            row.push(cols[j].innerText);
        }
        console.log(row);
        console.log("::::");
        text.push(row.join('\t@\t'));
    }
    console.log(text);
    console.log(text.join("\r\n"));
    textFile = new Blob([text.join("\r\n")], {type:"text/plain;charset=utf-8"});
    downloadLink = document.createElement("a");
    downloadLink.download = 'data.text';
    downloadLink.href = window.URL.createObjectURL(textFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click()
//todo: do not write checkbox, submit, edit rows' name&value
}

function importData() {
    var columnNm = [];
    const fileSelector = document.getElementById('import');
    fileSelector.addEventListener('change', function (e) {
        console.log('file'+fileSelector.files);
        const reader = new FileReader();
        reader.onload = function() {
            const lines = reader.result.split('\n').map(function (line) {
                return line.split('\t@\t');
            })
            liveRuleData = lines;
            columnNm = createTable(liveRuleData);

        }
        reader.readAsText(fileSelector.files[0]);
    }, false);
    return columnNm;


}