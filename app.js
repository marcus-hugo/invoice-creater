const addBtns = document.querySelectorAll('.addBtn');
const ul = document.getElementById('display');
const grandTotal = document.querySelector('.grand-total-display');
const submitBtn = document.getElementById('submit-button');
let servicesArr = [];

submitBtn.classList.add('disabled');
submitBtn.disabled = true;

for (let btn of addBtns) {
    btn.addEventListener('click', function () {
        servicesArr.push({
            'description': `${btn.innerText}`,
            'amount': `${btn.value}`
        });
        renderItems(servicesArr);
        btn.classList.add('disabled');
        btn.disabled = true;
    })
}

function renderItems(services) {
    let listItems = '';
    let totalItems = '';
    for (let i = 0; i < services.length; i++) {
        listItems += `
            <li class="rendered-items">
                <p>${servicesArr[i].description.slice(0, servicesArr[i].description.length - 3)}</p>
                <p>${servicesArr[i].amount.replace('', '$')}</p>
            </li>
        `;
    }
    if (servicesArr.length === 1) {
        totalItems = parseInt(servicesArr[0].amount);
    } else if (servicesArr.length === 2) {
        totalItems = parseInt(servicesArr[0].amount) + parseInt(servicesArr[1].amount);
    } else if (servicesArr.length === 3) {
        totalItems = parseInt(servicesArr[0].amount) + parseInt(servicesArr[1].amount) + parseInt(servicesArr[2].amount);
    }
    ul.innerHTML = listItems;
    grandTotal.innerText = totalItems.toString().replace('', '$');

    if (servicesArr.length >=1 && servicesArr.length <= 3) {
        submitBtn.classList.remove('disabled');
        submitBtn.disabled = false;
    }
}