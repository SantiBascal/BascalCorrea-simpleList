const input = document.querySelector('input');
const btnAdd = document.querySelector('.btnAdd');
const list = document.querySelector('ul');
const noText = document.querySelector('.noText');
const tutorial = document.querySelector('.tutorial');
let itemSave = [];




function eliminarObjeto(id) {
    let arrayGuardado = JSON.parse(sessionStorage.getItem('itemSave'));

    let indiceAEliminar = arrayGuardado.findIndex(function(objeto) {
        return objeto.Id === id;
    });

 
    if (indiceAEliminar !== -1) {
        arrayGuardado.splice(indiceAEliminar, 1);


        sessionStorage.setItem('itemSave', JSON.stringify(arrayGuardado));

        console.log('Objeto eliminado correctamente.');
    } else {
        console.log('Objeto no encontrado en el array.');
    }
}

function btnDelete() {
    let btnDel = document.createElement("button");
    btnDel.textContent = "del";
    btnDel.className = "btnDel";
    btnDel.addEventListener("click", function(evt) {
        const item = evt.target.parentElement;
        list.removeChild(item)

        let idDel = Number(item.className);

        eliminarObjeto(idDel);

        const Items = document.querySelectorAll("li");
        if (Items.length === 0) {
            noText.style.display = "block";
            tutorial.style.display = "block";
        }
    });

    return btnDel;
}




function localSave(texto, Id) {
    const savedItemObj = {
        texto,
        Id
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
    if (saveItem !== null) {
        for (let x = 0; x < saveItem.length; x += 1) {
            let allItems = saveItem[x];
            let saveText = allItems.texto;
            let saveId = allItems.Id;

            const li = document.createElement('li');
            const itemText = document.createElement('p');
            itemText.textContent = saveText;
            li.setAttribute('class', saveId)

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
        const itemId = Date.now();
        itemText.textContent = texto;
        li.setAttribute('class', itemId);
        li.appendChild(itemText);
        li.appendChild(btnDelete());
        list.appendChild(li);

        input.value = '';

        noText.style.display = 'none';
        tutorial.style.display = 'none';

        localSave(texto, itemId);


    }

});

