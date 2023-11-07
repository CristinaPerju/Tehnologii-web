async function load() {
    document.getElementsByTagName('input')[0].onkeyup = addItem;
    const response = await fetch('/items');
    if (response.status === 200) {
        const body = await response.json();
        body.forEach(({ id, text }) => appendItem(id, text));
    }
}

async function addItem(event) {
    const text = event.target.value.trim();
    if (event.key === 'Enter' && text.length > 0) {
        const response = await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: text
        });
        if (response.status === 201) {
            const body = await response.text();
            appendItem(body, text);
        }
        event.target.value = '';
    }
}

function appendItem(id, text) {
    const listItem = document.createElement('li');
    listItem.data = id;
    const input = document.createElement('input');
    input.value = text;
    input.onkeyup = (event) => changeItem(event, listItem);
    const anchor = document.createElement('a');
    anchor.href = 'javascript:void(0)';
    anchor.onclick = () => removeItem(listItem);
    anchor.innerText = 'Remove';
    listItem.appendChild(input);
    listItem.appendChild(anchor);
    document.getElementsByTagName('ul')[0].appendChild(listItem);
}

async function changeItem(event, listItem) {
    if (event.key === 'Enter') {
        const id = listItem.data;
        const text = event.target.value.trim();

        if (text.length > 0) {
            const response = await fetch(`/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: text
            });

            if (response.status === 200) {}
        }
    }
}

async function removeItem(listItem) {
    const id = listItem.data;
    const response = await fetch(`/items/${id}`, {
        method: 'DELETE'
    });
    if (response.status === 204) {
        listItem.parentNode.removeChild(listItem);
    } else {
        alert('Item could not be removed.');
    }
}
