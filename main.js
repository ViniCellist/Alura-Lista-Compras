let itemsList = [];

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    saveItem();
});

function saveItem() {
    const buyItem = itensInput.value;
    const checkTwo = itemsList.some((e) => e.valor.toUpperCase() === buyItem.toUpperCase());

    if(checkTwo) {
        alert('Item já existe');
    } else {
        itemsList.push({
            valor: buyItem
        });
    };

    console.log(itemsList);
};