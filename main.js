document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modifyNumVal').forEach(container =>{
        const inputField = container.querySelector('.number')
        const incrementBtn = container.querySelector('.plus')
        const decrementBtn = container.querySelector('.minus')

        const getInputValue = () => {
            return parseInt(inputField.value) || 0
        }

        incrementBtn.addEventListener('click', () => {
            let currentValue = getInputValue()
            inputField.value = currentValue + 1
        })

        decrementBtn.addEventListener('click', () => {
            let currentValue = getInputValue() - 1
            inputField.value = currentValue >= 0 ? currentValue : 0
        })
    })

    document.getElementById('addBtn').addEventListener('click', () => {
        const textField = document.getElementById('comment')
        if(textField.value === "") return
        const list = document.getElementById('customerComment')
        const newElement = document.createElement('li')
        newElement.setAttribute('class', "comments")
        newElement.innerText = textField.value
        list.appendChild(newElement)
        textField.value = ""
    })

    document.getElementById('generate').addEventListener('click', () => {
        const date = document.getElementById('date').value.split('-').reverse();
        const location = document.getElementById('locations');
        const shift = document.getElementById('shift');
        const installations = document.getElementById('appInstallCount').value;
        const offer = document.getElementById('customerOffersCount').value;
        const leaflets = document.getElementById('leafletCount').value;
        const service = document.getElementById('tableServeCount').value;
        const mcCafe = document.getElementById('mcCafeCount').value;
        const overview = document.getElementById('dayOverview');
        let customerComment = [];
        document.querySelectorAll('.comments').forEach(container => {
            customerComment.push(container.innerHTML);
        });

        function getValue(num) {
            return num === '' ? 0 : Number(num);
        }

        const template =
            `Дата: ${date.join('.')}
Обект: ${location.options[location.selectedIndex].text}
Смяна: ${shift.options[shift.selectedIndex].text} 

1.Брой изтеглени проложения: ${getValue(installations)}

2. Брой клиенти, възползвали се от офертите: ${getValue(offer)}

3. Брой раздадени талони за приложението:  ${getValue(leaflets)}

4. Брой сервирани маси: ${getValue(service)}

5. За обектите на МакКафе (Сердика и Младост) - брой закупени напитки/десерти 
след като вие сте предложили или случайно ако видите да са си купили: ${getValue(mcCafe)}

6. Коментари как е протекъл денят:
${overview.value}

7. Коментари от хората:
- ${customerComment.join('\n- ')}`;

        // Display the popup with the generated template
        document.getElementById('popup-content').textContent = template;
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    });

    // Close popup logic
    document.getElementById('cls-button').addEventListener('click', () => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    // Close popup when clicking outside of it
    document.getElementById('overlay').addEventListener('click', () => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    // Copy template to clipboard
    document.getElementById('copyBtn').addEventListener('click', () => {
        const text = document.getElementById('popup-content').textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert('Template copied to clipboard');
        }).catch(err => {
            console.log(`Failed to copy template: ${err}`);
        });
    });
});
