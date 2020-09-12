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
    if (urlsArray) {
        const newArray = urlsArray.map(e=> {
            return removeProtocol(e);
        });
        document.querySelector(elements.urlsaText).value = newArray.join('\n');
    }
}

function removeProtocol(url) {
    return url.replace('https://', '').replace('http://', '');
}

export const formatURLsB = () => {
    const urlsArray = document.querySelector(elements.urlsbText).value.trim().split('\n');
    const domain = document.querySelector(elements.sitesSelector).value;
    if (urlsArray) {
        const newArray = urlsArray.map(e => {
            const outcome = removeProtocol(e).replace(domain, '');
            return outcome.length === 0 ? `${outcome}/` : outcome;
        });
        document.querySelector(elements.urlsbText).value = newArray.join('\n').trim();
    }
}

export const getRedirectData = () => {
    const redirect = {
        ruleName: document.querySelector(elements.redirectDescription).value,
        domain: document.querySelector(elements.sitesSelector).value,
        queryString: 1,
        schemeAndHost: 1,
        useRelative: 'copy_scheme_hostname',
        statusCode: parseInt(document.querySelector(elements.typeSelector).value),
        urlsa: document.querySelector(elements.urlsaText).value.trim().split('\n'),
        urlsb: document.querySelector(elements.urlsbText).value.trim().split('\n')
    }

    return redirect;
}

export const renderTableResult = (redirect) => {
    console.log(redirect);
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
    document.querySelector(elements.redirectDescription).focus();
    document.querySelector(elements.tableResult).innerHTML = `<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>`;
}