function getNumber() {
    var num = document.getElementById('num_of_Crul').value;
    console.log("num : " + num );
    var fields = document.getElementById('rule_content');
    // console.log("fields : " + fields);
    var column = ["StartRing", "RignID", "companyID", "FilterID", "RelationSec", "Relation"];
    var v = ["checkbox","text", "text", "text", "text", "text"];

    var table = '<table class="correlationTable"><tr>'
    var thead='';
    for(let i=0;i<column.length;i++) {
        thead += '<th>'+column[i]+'</th>';
    }
    table += (thead+'</tr>');

    for(let j=0;j<num;j++) {
        table += '<tr>'
        for(var i=0; i<column.length; i++) {
            table += '<td><input type="'+v[i]+'" id="ring'+i+'"></td>'
        }
        table +='</tr>';
    }
    document.getElementById('rule_content').innerHTML = table;
    // for(n in num) {
    //     for (len in v.length) {
    //         var field = document.createElement("input");
    //         field.setAttribute('type',column[len]);
    //         field.setAttribute('id',"ring"+i+"_chk");
    //    fields.appendChild(field);
    //
    //    field.setAttribute('type','text');
    //    field.setAttribute('id',"ring"+i);
    //    fields.appendChild(field);
    // }
}