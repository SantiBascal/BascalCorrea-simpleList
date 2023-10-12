const input = document.querySelector('input');
const btnAdd = document.querySelector('.btnAdd');
const list = document.querySelector('ul');
const noText = document.querySelector('.noText');
const tutorial = document.querySelector('.tutorial');
const itemSave = [];



function localSave(texto) {

    if (sessionStorage.getItem('itemSave') === null) {
        itemSave.push(texto);
        sessionStorage.setItem('itemSave', JSON.stringify(itemSave));
    } else {

        const getItemSave = JSON.parse(sessionStorage.getItem('itemSave'));
        getItemSave.push(texto);
        sessionStorage.setItem('itemSave', JSON.stringify(getItemSave));
    }

}



function showSaveItem() {
    const saveItem = JSON.parse(sessionStorage.getItem('itemSave'));
    if (saveItem !== null) {
        for (let x = 0; x < saveItem.length; x += 1) {
            const li = document.createElement('li');
            const itemText = document.createElement('p');

            itemText.textContent = saveItem[x];
            li.appendChild(itemText);
            li.appendChild(btnDelete());
            list.appendChild(li);

            noText.style.display = 'none';
            tutorial.style.display = 'none';
        }
    }
}



showSaveItem()






btnAdd.addEventListener('click', (evt) => {
    evt.preventDefault();

    const texto = input.value;

    if (texto !== '') {

        const li = document.createElement('li');
        const itemText = document.createElement('p');
        itemText.textContent = texto;
        li.appendChild(itemText);
        li.appendChild(btnDelete());
        list.appendChild(li);

        input.value = '';

        noText.style.display = 'none';
        tutorial.style.display = 'none';

        localSave(texto);


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
