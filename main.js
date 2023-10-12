const input = document.querySelector('input');
const btnAdd = document.querySelector('.btnAdd');
const list = document.querySelector('ul');
const noText = document.querySelector('.noText');
const tutorial = document.querySelector('.tutorial');
let itemSave = [];



function localSave(texto, itemId) {
    const savedItemObj = {
        texto,
        itemId
    }
 
    
    if (sessionStorage.getItem('itemSave') === null) {
        itemSave.push(savedItemObj)
        sessionStorage.setItem('itemSave', JSON.stringify(itemSave));
    } else {

        const getItemSave = JSON.parse(sessionStorage.getItem('itemSave'));
        getItemSave.push(savedItemObj);
        sessionStorage.setItem('itemSave', JSON.stringify(getItemSave));
    }

}



function showSaveItem() {
    const saveItem = JSON.parse(sessionStorage.getItem('itemSave'));
    console.log(saveItem)
    if (saveItem !== null) {
        for (let x = 0; x < saveItem.length; x += 1) {
            let allItems = saveItem[x];
            let saveText = allItems.texto;
            let saveId = allItems.itemId;
            
            const li = document.createElement('li');
            const itemText = document.createElement('p');
            itemText.textContent = saveText;
            itemText.setAttribute('class', saveId)

            li.appendChild(itemText);
            li.appendChild(btnDelete());
            list.appendChild(li);

            noText.style.display = 'none';
            tutorial.style.display = 'none';
        }
    }
}



function delSaveItem()){

}


showSaveItem()






btnAdd.addEventListener('click', (evt) => {
    evt.preventDefault();

    const texto = input.value;

    if (texto !== '') {

        const li = document.createElement('li');
        const itemText = document.createElement('p');
        const itemId = Date.now();
        itemText.textContent = texto;
        itemText.setAttribute('class', itemId);
        li.appendChild(itemText);
        li.appendChild(btnDelete());
        list.appendChild(li);

        input.value = '';

        noText.style.display = 'none';
        tutorial.style.display = 'none';

        localSave(texto, itemId);


    }

});




function btnDelete() {
    const btnDel = document.createElement('button');

    btnDel.textContent = 'del';
    btnDel.className = 'btnDel';

    btnDel.addEventListener('click', (evt) => {
        const item = evt.target.parentElement;


        list.removeChild(item);

        const items = document.querySelectorAll('li');


        if (items.length === 0) {
            noText.style.display = 'block';
            tutorial.style.display = 'block';
        }

    })

    return btnDel;
}
