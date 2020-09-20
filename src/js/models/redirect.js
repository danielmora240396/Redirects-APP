import { elements } from '../views/base';
import { sitesData } from './data';
import { errors } from './data';
import { fileContent } from './data';

export default class Redirect {
    constructor(ticket, ruleName, domain){
        this.ticket = ticket,
        this.ruleName = ruleName
        this.domain = domain,
        this.info = []
        this.status = false;
        this.policy = [];
        this.langValidation = true;
    }

    addRedirect(redirectId, matchUrl = "TBD", resultUrl = "/", queryString, schemeAndHost, useRelative, statusCode, langValidation){
        const redirect = {
                redirectId: redirectId,
                matchUrl: matchUrl,
                resultUrl: resultUrl,
                queryString: queryString,
                schemeAndHost: this.useHost(resultUrl),
                useRelative: this.isRelative(resultUrl),
                statusCode: statusCode,
                isLoc: this.isLoc(matchUrl),
                redirectStatus: this.validations(matchUrl, resultUrl).status,
                redirectStatusMessage: this.validations(matchUrl, resultUrl).message.join('\n')
        };
        this.langValidation = langValidation;
        this.info.push(redirect);
        this.getPolicy();
    }

    isLoc(url){
        let flag = false;
        const lang = this.getLang();
        lang.forEach(e => {
            if (url.includes(e)) {
                flag = true;
            }
        })

        return flag;

    }

    getLang() {
        let lang;
        sitesData.forEach((e, i) => {
            if (e.site === this.domain) {
                lang = e.lang;
            }
        });

        return lang;
    }

    validations(url, resultUrl){
        let result = {
            status: true,
            message: []
        }
        if (!url.includes(this.domain)) {
            result.status = false;
            result.message.push(errors.wrongDomain);
        }

        if (resultUrl === url.slice(url.indexOf('.com') + 4, url.length)) {
            result.status = false;
            result.message.push(errors.selfRedirected);
        }

        if (resultUrl.indexOf('/') === 0 && this.langValidation) {
                const lang = this.getLang();
                if (lang[0] !== 'NA') {
                    for (const e of lang) {
                        if (url.includes(e) && !resultUrl.includes(e) || !url.includes(e) && resultUrl.includes(e)) {
                            result.status = false;
                            result.message.push(errors.locMismatch);
                            continue;
                        }
                    }
                }
        }
        return result;
    }

    readyToGenerate(){
        let flag = true;
        for (const interator of this.info) {
            if (!interator.redirectStatus) {
                this.status = false;
                flag = false;
                break;
            }
        }

        return flag;
    }

    updateRedirect(id, data){
        for (const element of this.info) {
            if (element.redirectId === id) {
                element.statusCode = data;
                break;
            }
        }
    }

    updateRedirectQuery(id, data){
        for (const element of this.info) {
            if (element.redirectId === id) {
                element.queryString = data;
                break;
            }
        }
    }

    isRelative(resultUrl){
        return resultUrl.startsWith('/') ? 1: '';
    }

    useHost(resultUrl) {
        return resultUrl.startsWith('/') ? 'copy_scheme_hostname': '' ;
    }

    getPolicy(){
        this.policy.length = 0;
        sitesData.forEach(e => {
            if (e.site === this.domain) {
                if (e.policy !== e.policy_loc) {
                    this.policy.push(e.policy);
                    this.policy.push(e.policy_loc);
                } else {
                    this.policy.push(e.policy);
                }
            }
        });
    }

    generateContent(){
        const files = [];
        let content = fileContent;
        let locContent = fileContent;

        this.info.forEach((e, index) => {
            if (!e.isLoc) {
                content+= `${this.ruleName},${e.matchUrl},,,,,,${e.queryString},${e.useRelative},${e.schemeAndHost},${e.resultUrl},${e.statusCode}\n`;
            } else {
                locContent += `${this.ruleName},${e.matchUrl},,,,,,${e.queryString},${e.useRelative},${e.schemeAndHost},${e.resultUrl},${e.statusCode}\n`;
            }
        });

        files.push(content);
        files.push(locContent);

        return files;

    }

    generateTicketContent(ticket){

        if (ticket === "wo") {
            let content = `Hi WebOps could you please sync the following policies and versions to Akamai Staging %0D%0A%0D%0A%E2%80%A2%09${this.policy}%0D%0A%0D%0AThank you.%0D%0A`;
            return content.replace(',','%0D%0A%E2%80%A2%09');
        } else {
            let urls = "";
            this.info.forEach(e => {
                if (e.resultUrl.indexOf('/') === 0) {
                    urls += `| https://${e.matchUrl} | https://${this.domain + e.resultUrl} |\n`;
                } else {
                    urls += `| https://${e.matchUrl} |${e.resultUrl} |\n`;
                }
                
            });
            urls += `h4. {color:red}Notes{color}\n* Notes\n\n*FYI*\n[~vivian.chollette], @reporter`;

            let data = `h3. {panel:title=(on) *Ready for verification*|titleBGColor=#FFCEB8|titleColor=#292929}{panel}\n\nh4. Redirect platform\n * Akamai \n\nh4. Policy Name and Version \n * ${this.policy}\n\n\n\n\n||From || To ||\n${urls}`;
    
            return data;
        }

        
    }
    
}

