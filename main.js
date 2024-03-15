let itemsList = [];
let itemToEdit;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItems = document.getElementById('lista-de-itens');
const ulItemsBuyed = document.getElementById('itens-comprados');
const recoveredList = localStorage.getItem('itemsList');

function updateLocalStorage(){
    localStorage.setItem('itemsList', JSON.stringify(itemsList));
};

if(recoveredList) {
    itemsList = JSON.parse(recoveredList);
    showItem();
} else {
    itemsList = [];
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    saveItem();
    showItem();
    itensInput.focus();
});

function saveItem() {
    const buyItem = itensInput.value;
    const checkTwo = itemsList.some((e) => e.valor.toUpperCase() === buyItem.toUpperCase());

    if(checkTwo) {
        alert('Item já existe');
    } else {
        itemsList.push({
            valor: buyItem,
            checar: false
        });
    };

    itensInput.value = '';
};

function showItem() {
    ulItems.innerHTML = '';
    ulItemsBuyed.innerHTML = '';
    itemsList.forEach((e, index) => {
        if(e.checar) {
            ulItemsBuyed.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${e.valor}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `;
        } else {
            ulItems.innerHTML += `
                    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${e.valor}" ${index != itemToEdit ? 'disabled' : ''}></input>
                    </div>

                    <div>
                        ${index == itemToEdit ? '<button onclick="saveEdit()"><i class="fa-regular fa-floppy-disk is-clickable"></i>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i></button>'}
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `;
        };
    });

    const inputCheck = document.querySelectorAll('input[type="checkbox"]');
    inputCheck.forEach(i => {
        i.addEventListener('click', (e) => {
            const elementValue = e.target.parentElement.parentElement.getAttribute('data-value');
            itemsList[elementValue].checar = e.target.checked
            showItem();
        });
    });

    const deleteObject = document.querySelectorAll('.deletar');
    deleteObject.forEach(i => {
        i.addEventListener('click', (e) => {
            const elementValue = e.target.parentElement.parentElement.getAttribute('data-value');
            itemsList.splice(elementValue, 1);
            showItem();
        });
    });

    const editItem = document.querySelectorAll('.editar');
    editItem.forEach(i => {
        i.addEventListener('click', (e) => {
            itemToEdit = e.target.parentElement.parentElement.getAttribute('data-value');

            showItem();
        });
    });

};

updateLocalStorage();

function saveEdit() {
    const editedItem = document.querySelector(`[data-value="${itemToEdit}"] input[type="text"]`);
    itemsList[itemToEdit].value = editedItem.value;
    itemToEdit = -1;
    showItem()
}
