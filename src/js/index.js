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
    redirectView.clearInput();
    redirectView.setTheme();

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
            e.which !== 40 &&
            e.which !== 8 &&
            e.which !== 46) {
            redirectView.formatURLsA();
            dataTreatment();
        }
    });

    document.querySelector(elements.urlsbText).addEventListener('keyup', e => {
        if (e.which !== 13 && 
            e.which !== 37 &&
            e.which !== 38 &&
            e.which !== 39 &&
            e.which !== 40 &&
            e.which !== 8 &&
            e.which !== 46) {
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
         //data.urlsa[0] !== "" && data.urlsb[0] !== "" &&
         //data.urlsa && data.urlsb
        const data = redirectView.getRedirectData();
        if (data.ruleName) {
                if (data.urlsa.length > 1 && data.urlsb.length > 1) {
                    state.redirect = new Redirect(data.ruleName.split(' ')[0], data.ruleName, data.domain);
                    data.urlsa.forEach((e, i) => {
                        state.redirect.addRedirect(`redirect-${parseInt(i, 10) + 1}`, e , data.urlsb[i] === "" ? "/" : data.urlsb[i], data.queryString, data.schemeAndHost, data.useRelative, data.statusCode, data.langValidation);
                    });
                    document.querySelector(elements.tableResult).innerHTML = `<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>`;
                    state.redirect.info.forEach(e => {
                    redirectView.renderTableResult(e);
                    redirectView.toggleButton();
                    redirectView.toggleButton(state.redirect.readyToGenerate());
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
        redirectView.formatURLsA();
        redirectView.formatURLsB();
    });

    document.querySelector(elements.typeSelector).addEventListener('change', e => {
        dataTreatment();
        redirectView.formatURLsA();
        redirectView.formatURLsB();
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

    document.querySelector(elements.generateButton).addEventListener('click', e => {
        const files = state.redirect.generateContent();
        state.redirect.policy.forEach((e, index) => {
            redirectView.downloadContent(`${state.redirect.ruleName} ${e}.csv`, files[index]);
        });
        document.querySelector("#next-steps").style.display = 'block';
        document.querySelector("#webopsTicket").href = `mailto:helpdesk.webops@solarwinds.com?subject=Sync Akamai to Staging&body=${state.redirect.generateTicketContent('wo')}`;

    })

    document.querySelector(elements.langValidation).addEventListener('change', dataTreatment);

    document.querySelector(elements.wuTicket).addEventListener('click', e=> {
        document.querySelector(elements.ticketContent).style.display = "block";
        document.querySelector(elements.ticketContent).value = state.redirect.generateTicketContent("wu");
        document.querySelector(elements.ticketContent).select();
        document.execCommand('copy');
        document.querySelector(elements.ticketContent).style.display = "none";
        document.querySelector("#wuTicket").href = `https://jira.solarwinds.com/browse/${state.redirect.ticket}`;
        document.querySelector("#wuTicket").textContent = "Copied to clipboard";

    });

    document.querySelector(elements.themeSwitch).addEventListener('click', e => {
        if (document.querySelector(elements.themeSwitch).checked) {
            document.querySelector('body').classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.querySelector('body').classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        
    });
});

