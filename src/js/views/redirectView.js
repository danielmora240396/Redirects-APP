import { elements } from './base'

export const fillDropDownSites = (value) => {
    const markup = `<option value="${value}">${value}</option>`;
    document.querySelector(elements.sitesSelector).insertAdjacentHTML('beforeend', markup);
}

export const fillDropDownTypes = (value) => {
    const markup = `<option value="${value}">${value}</option>`;
    document.querySelector(elements.typeSelector).insertAdjacentHTML('beforeend', markup);
}