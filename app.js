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
                <p>${services[i].description.slice(0, servicesArr[i].description.length - 3)}</p>
                <button type="button" id='${services[i].amount}' class="remove-button">Remove</button>
                <p>${services[i].amount.replace('', '$')}</p>
            </li>
        `;
    }

    if (services.length === 1) {
        totalItems = parseInt(services[0].amount);
    } else if (services.length === 2) {
        totalItems = parseInt(services[0].amount) + parseInt(services[1].amount);
    } else if (services.length === 3) {
        totalItems = parseInt(services[0].amount) + parseInt(services[1].amount) + parseInt(services[2].amount);
    }

    ul.innerHTML = listItems;
    grandTotal.innerText = totalItems.toString().replace('', '$');

    if (services.length >=1 && services.length <= 3) {
        submitBtn.classList.remove('disabled');
        submitBtn.disabled = false;
    }

    let removeBtns = document.querySelectorAll('.remove-button');

    for (let btn of removeBtns) {
        btn.addEventListener('click', function() {
           let findService = (service) => service.amount === btn.id;
           let serviceIndex = servicesArr.findIndex(findService);
            console.log(serviceIndex);
            servicesArr.splice(serviceIndex, 1);

            renderItems(servicesArr);

            if(servicesArr.length === 0) {
                submitBtn.classList.add('disabled');
                submitBtn.disabled = true;

               for(let btn of addBtns) {
                   btn.classList.remove('disabled')
                   btn.disabled = false;
               }
            }
          
        })
    }
    
}

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    servicesArr = []
    renderItems(servicesArr);
    for(let btn of addBtns) {
        btn.classList.remove('disabled');
        btn.disabled = false;
    }
})