const addBtns = document.querySelectorAll('.add-button');
const ul = document.getElementById('display');
const grandTotal = document.querySelector('.grand-total-display');
const submitBtn = document.getElementById('submit-button');
let servicesArr = [];
let addBtnsArr = [];
let itemsTotal = '';

submitBtn.classList.add('disabled');
submitBtn.disabled = true;

for (let btn of addBtns) {
    btn.addEventListener('click', function () {
        addBtnsArr.push(`${btn.value}`)
        servicesArr.push({
            'description': `${btn.innerText}`,
            'amount': `${btn.value}`
        });
        renderItems(servicesArr);
        btn.classList.add('disabled');
        btn.disabled = true;
    })
}

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addBtnsArr = []
    servicesArr = []
    renderItems(servicesArr);
    for (let btn of addBtns) {
        btn.classList.remove('disabled');
        btn.disabled = false;
    }
})

function calcTotal(services) {
    if (services.length === 1) {
        itemsTotal = parseInt(services[0].amount);
    } else if (services.length === 2) {
        itemsTotal = parseInt(services[0].amount) + parseInt(services[1].amount);
    } else if (services.length === 3) {
        itemsTotal = parseInt(services[0].amount) + parseInt(services[1].amount) + parseInt(services[2].amount);
    } else {
        itemsTotal = '0';
    }
}

function renderItems(services) {
    let listItems = '';
    
    for (let i = 0; i < services.length; i++) {
        listItems += `
            <li class="rendered-items">
                <p>${services[i].description.slice(0, servicesArr[i].description.length - 3)}</p>
                <button type="button" id='${services[i].amount}' class="remove-button">Remove</button>
                <p>${services[i].amount.replace('', '$')}</p>
            </li>
        `;
    }
    calcTotal(servicesArr);
    ul.innerHTML = listItems;
    grandTotal.innerText = itemsTotal.toString().replace('', '$');
    
    if (services.length >= 1 && services.length <= 3) {
        submitBtn.classList.remove('disabled');
        submitBtn.disabled = false;
    }
    removeButtons(servicesArr);
}

function removeButtons(services) {
    let removeBtns = document.querySelectorAll('.remove-button');

    for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', function () {
            // finds the add button index based on a conditional
            let findServiceIndex = (services) => services.amount === removeBtns[i].id;
            let serviceIndex = services.findIndex(findServiceIndex);
          
            for (let button of addBtns) {
                if (removeBtns[i].id === button.id) {
                    button.classList.remove('disabled');
                    button.disabled = false;
                }
            }
            addBtnsArr.splice(serviceIndex, 1)
            servicesArr.splice(serviceIndex, 1);
            renderItems(servicesArr);
            isServicesZero(servicesArr);
            console.log(servicesArr)
        })
    }
}

function isServicesZero(services) {
    if (services.length === 0) {
        submitBtn.classList.add('disabled');
        submitBtn.disabled = true;
        // grandTotal.innerText = ''
        for (let btn of addBtns) {
            btn.classList.remove('disabled')
            btn.disabled = false;
        }
    }
}