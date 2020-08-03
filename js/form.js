var dt;
const formToJson = elements => [].reduce.call(elements,(data, element) => {
    data[element.name] = element.value;
    return data;
}, {});

const handleFormSubmit = event => {
    event.preventDefault();
    console.log(form.elements);
    const data = formToJson(form.elements);
    console.log("handleFormSubmit");
    document.querySelector('.bg-modal').style.display = 'none';
    dt = data;
    console.log(dt);
    return data;
}

function editForm(index) {
    var rowData = document.querySelectorAll('#data tbody tr')[index-1];
    // rowData[0].
}

//form 내용추가
//form clear 추가
//validation check
// -


