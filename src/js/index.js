import * as Data from './models/data';
import * as redirectView from './views/redirectView';
import {elements} from './views/base';

window.addEventListener('load', e => {
    Data.sitesData.forEach(e=> redirectView.fillDropDownSites(e.site));
    Data.redirectTypes.forEach(e => redirectView.fillDropDownTypes(e));
    document.querySelector(elements.redirectDescription).focus();
});