import * as Data from './models/data';
import Redirect from './models/redirect';
import * as redirectView from './views/redirectView';
import {elements} from './views/base';

const state = {

};

window.addEventListener('load', e => {
    Data.sitesData.forEach(e=> redirectView.fillDropDownSites(e.site));
    Data.redirectTypes.forEach(e => redirectView.fillDropDownTypes(e));
    document.querySelector(elements.redirectDescription).focus();

    document.querySelector(elements.redirectDescription).addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            document.querySelector(elements.sitesSelector).focus();
        }
    });

    document.querySelector(elements.sitesSelector).addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            document.querySelector(elements.typeSelector).focus();
        }
    });

    document.querySelector(elements.typeSelector).addEventListener('keyup', e => {
        
        if (e.keyCode === 13) {
            document.querySelector(elements.urlsaText).focus();
        }
    });

    document.querySelector(elements.urlsaText).addEventListener('keyup', e => {

        if (e.which !== 13 && 
            e.which !== 37 &&
            e.which !== 38 &&
            e.which !== 39 &&
            e.which !== 40) {
            redirectView.formatURLsA();
            dataTreatment();
        }
    });

    document.querySelector(elements.urlsbText).addEventListener('keyup', e => {
        if (e.which !== 13 && 
            e.which !== 37 &&
            e.which !== 38 &&
            e.which !== 39 &&
            e.which !== 40) {
            redirectView.formatURLsB();
            dataTreatment();
        }
    });

    document.querySelector(elements.urlsbText).addEventListener('focusout', e => {
        redirectView.formatURLsB();
        dataTreatment();
    });

    document.querySelector(elements.urlsaText).addEventListener('focusout', e => {
        redirectView.formatURLsA();
        dataTreatment();
    });

    const dataTreatment = () => {
        const data = redirectView.getRedirectData();
        if (data.ruleName &&
            data.urlsa[0] !== "" && data.urlsb[0] !== "" &&
            data.urlsa && data.urlsb) {
                if (data.urlsa.length === data.urlsb.length) {
                    state.redirect = new Redirect(data.ruleName, data.domain);
                    data.urlsa.forEach((e, i) => {
                        state.redirect.addRedirect(`redirect-${parseInt(i, 10) + 1}`, e, data.urlsb[i], data.queryString, data.schemeAndHost, data.useRelative, data.statusCode);
                    });
                    document.querySelector(elements.tableResult).innerHTML = `<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>`;
                    state.redirect.info.forEach(e => {
                    redirectView.renderTableResult(e);
                    });
                } else {
                    document.querySelector(elements.tableResult).innerHTML = `<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>`;
                }
        }
        console.log(state.redirect);
            
    }

    document.querySelector(elements.redirectDescription).addEventListener('input', e => {
        dataTreatment();
    });

    document.querySelector(elements.sitesSelector).addEventListener('change', e => {
        dataTreatment();
    });

    document.querySelector(elements.typeSelector).addEventListener('change', e => {
        dataTreatment();
    })

    document.querySelector(elements.tableResult).addEventListener('click', e => {
        const redirectId = e.target.closest('.table-row').id;
        if (e.target.matches(`${elements.tableRedirectType} option`)) {
            const data = document.querySelector(`#${redirectId} ${elements.tableRedirectType}`).value;
            //console.log(data);
            state.redirect.updateRedirect(redirectId, parseInt(data, 10));
            document.querySelector(elements.tableResult).innerHTML = `<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>`;
            state.redirect.info.forEach(e => {
                redirectView.renderTableResult(e);
            });
            
        } else if (e.target.matches(`${elements.tableQueryString}`)){
            const data = document.querySelector(`#${redirectId} ${elements.tableQueryString}`).checked;
            state.redirect.updateRedirectQuery(redirectId, data === true? parseInt(1, 10): '');
            document.querySelector(elements.tableResult).innerHTML = `<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>`;
            state.redirect.info.forEach(e => {
                redirectView.renderTableResult(e);
            });
        }
        
    });

    document.querySelector(elements.clearButton).addEventListener('click', e => {
        redirectView.clearInput();
    })
});

