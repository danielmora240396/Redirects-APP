import { sitesData } from './data';
import { errors } from './data';

export default class Redirect {
    constructor(ruleName, domain){
        this.ruleName = ruleName
        this.domain = domain,
        this.info = []
        this.status = false;
        this.policy = []
    }

    addRedirect(redirectId, matchUrl, resultUrl, queryString, schemeAndHost, useRelative, statusCode){
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

        if (resultUrl.indexOf('/') === 0) {
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
        return resultUrl.includes(this.domain) ? 1 : '';
    }

    useHost(resultUrl) {
        return resultUrl.includes(this.domain) ? 'copy_scheme_hostname' : '';
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
    
}