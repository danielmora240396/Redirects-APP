import { elements } from './base'
import { redirectTypes } from '../models/data';
export const fillDropDownSites = (value) => {
    const markup = `<option value="${value}">${value}</option>`;
    document.querySelector(elements.sitesSelector).insertAdjacentHTML('beforeend', markup);
}

export const fillDropDownTypes = (value) => {
    const markup = `<option value="${value}">${value}</option>`;
    document.querySelector(elements.typeSelector).insertAdjacentHTML('beforeend', markup);
}

export const formatURLsA = () => {
    const urlsArray = document.querySelector(elements.urlsaText).value.trim().split('\n');
    let newArray = "";
    if (urlsArray) {
        /*const newArray = urlsArray.map(e=> {
            return removeProtocol(e);
        });*/
        for (const iterator of urlsArray) {
            if (iterator !== "") {
                newArray += removeProtocol(iterator) + "\n";
            }
        }
        //document.querySelector(elements.urlsaText).value = newArray.join('\n');
        document.querySelector(elements.urlsaText).value = newArray.trim();
    }
    if (document.querySelector(elements.urlsaText).value.trim()) {
        document.querySelector(elements.urlsaText).rows = `${document.querySelector(elements.urlsaText).value.trim().split('\n').length}`;
    }
}

function removeProtocol(url) {
    return url.replace('https://', '').replace('http://', '');
}

export const formatURLsB = () => {
    const urlsArray = document.querySelector(elements.urlsbText).value.trim().split('\n');
    const domain = document.querySelector(elements.sitesSelector).value;
    let newArray = "";
    if (urlsArray) {
        /*const newArray = urlsArray.map(e => {
            const outcome = removeProtocol(e).replace(domain, '');
            return outcome.length === 0 ? `${outcome}/` : outcome;
        });*/
        for (const iterator of urlsArray) {
            if (iterator !== "") {
                const outcome = removeProtocol(iterator).replace(domain, '');
                newArray += outcome.length === 0 ? `${outcome}/\n` : outcome+'\n';
            }
        }
        //document.querySelector(elements.urlsbText).value = newArray.join('\n').trim();
        document.querySelector(elements.urlsbText).value = newArray.trim();
    }
    if (document.querySelector(elements.urlsbText).value.trim()) {
        document.querySelector(elements.urlsbText).rows = `${document.querySelector(elements.urlsbText).value.trim().split('\n').length}`;
    }
}

export const getRedirectData = () => {
    const redirect = {
        ruleName: document.querySelector(elements.redirectDescription).value.trim(),
        domain: document.querySelector(elements.sitesSelector).value,
        queryString: 1,
        schemeAndHost: 1,
        useRelative: 'copy_scheme_hostname',
        statusCode: parseInt(document.querySelector(elements.typeSelector).value),
        urlsa: document.querySelector(elements.urlsaText).value.trim().split('\n'),
        urlsb: document.querySelector(elements.urlsbText).value.trim().split('\n'),
        langValidation: document.querySelector(elements.langValidation).checked
    }

    return redirect;
}

export const renderTableResult = (redirect) => {
    //console.log(redirect);
    const markup = 
    `<tr id='${redirect.redirectId}' class='${redirect.redirectStatus ? 'correct' : 'wrong'} table-row'>
        <td>
            <span class='status-icon'>
                <img src="img/${redirect.redirectStatus ? 'correct.png' : 'wrong.png'}" alt="">
                    <span class='error-panel'>${redirect.redirectStatusMessage.replace('.', '.<br>')}</span>
            </span>${redirect.matchUrl}
        </td>
        <td>
            ${redirect.resultUrl}
        </td>
        <td>
            <select class="form-control individual-redirectType" name="" id="">
                <option value=${redirectTypes[0]} ${redirect.statusCode === 301? 'selected' : ''}>${redirectTypes[0]}</option>
                <option value=${redirectTypes[1]} ${redirect.statusCode === 302? 'selected' : ''}>${redirectTypes[1]}</option>
            </select>
        </td>
        <td>
        <input class='form-control individual-checkbox' type="checkbox" name="" id="" ${redirect.queryString === 1? 'checked': ''}>
        </td>
    </tr>`;
    document.querySelector(elements.tableResult).insertAdjacentHTML('beforeend', markup);

}

export const clearInput = () => {
    [elements.redirectDescription, elements.urlsaText, elements.urlsbText].forEach(e => {
        document.querySelector(e).value = "";
    });
    document.querySelector(elements.generateButton).disabled = true;
    document.querySelector(elements.redirectDescription).focus();
    document.querySelector(elements.tableResult).innerHTML = `<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>`;
    document.querySelector(elements.langValidation).checked = true;
    document.querySelector(elements.urlsbText).rows = '10';
    document.querySelector(elements.urlsaText).rows = '10';
    document.querySelector("#next-steps").style.display = 'none';
    document.querySelector("#wuTicket").textContent = "Generate WU comment";
}

export const downloadContent = (fileName, data) => {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
}

export const toggleButton = (flag) => {
      document.querySelector(elements.generateButton).disabled = !flag;
}

export const getTicket = () => {
    return document.querySelector(elements.ticketContentSelector).value;
}

export const setTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
        document.querySelector(elements.themeSwitch).checked = true;
        document.querySelector('body').classList.add('dark');
    } else {
        document.querySelector(elements.themeSwitch).checked = false;
        document.querySelector('body').classList.remove('dark');
    } 
}
