!function(e){var t={};function r(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,r),c.l=!0,c.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)r.d(o,c,function(t){return e[t]}.bind(null,c));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const o=[{site:"www.solarwinds.com",policy:"ER_SolarWinds2",policy_loc:"ER_SolarWinds3",lang:["/de/","/es/","/pt/","/fr/","/ja/","/ko/","/zh/"]},{site:"www.dameware.com",policy:"ER_Brandsites",policy_loc:"ER_Brandsites",lang:["/de/","/pt/","/fr/","/ja/"]},{site:"www.webhelpdesk.com",policy:"ER_Webhelpdesk",policy_loc:"ER_Webhelpdesk",lang:["NA"]},{site:"www.serv-u.com",policy:"ER_Servu",policy_loc:"ER_Servu",lang:["NA"]},{site:"www.kiwisyslog.com",policy:"ER_Kiwi",policy_loc:"ER_Kiwi",lang:["NA"]},{site:"www.appoptics.com",policy:"ER_appotpics",policy_loc:"ER_appotpics",lang:["/de/","/es/","/pt/","/fr/","/ja/","/ko/","/zh/"]},{site:"try.solarwinds.com",policy:"ER_trySolarwinds",policy_loc:"ER_trySolarwinds",lang:["NA"]},{site:"support.solarwinds.com",policy:"ER_CSC_2",policy_loc:"ER_CSC_2",lang:["NA"]},{site:"www.loggly.com",policy:"ER_Loggly",policy_loc:"ER_Loggly",lang:["NA"]},{site:"www.pingdom.com",policy:"ER_Pingdom",policy_loc:"ER_Pingdom",lang:["NA"]}],c=[301,302],n="Selected domain does not match.",i="This is redirected to the same URL, this might cause a redirect loop.",l="Localized versions do not match.",s=new Date,u=`# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\t\t\t\n# Policy Type: Edge Redirector Cloudlet\t\t\t\n# Policy: See file name\t\t\t\n# Policy ID: 42899\t\t\t\n# Version: ##\t\t\t\n# Description: for the next 5k redirects\t\t\t\n# Create Date: ${s}\t\t\t\n# Last Update: ${s}\t\t\t\n# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \nruleName,matchURL,scheme,host,path,query,disabled,result.useIncomingQueryString,result.useIncomingSchemeAndHost,result.useRelativeUrl,result.redirectURL,result.statusCode\n`,a={sitesSelector:"#redirect-domain",typeSelector:"#redirect-type",redirectDescription:"#redirect-description",queryStringSelector:"#copyQueryString",urlsaText:"#urlsa-redirect",urlsbText:"#urlsb-redirect",validateBtn:"#validate-btn",tableResult:".table",tableRedirectType:".individual-redirectType",tableQueryString:".individual-checkbox",clearButton:"#clear-btn",generateButton:"#generate-btn",langValidation:"#validate-language",ticketContent:"#ticket-content",ticketContentSelector:"#ticket-content-selector",wuTicket:"#wuTicket",themeSwitch:"#theme input"};class d{constructor(e,t,r){this.ticket=e,this.ruleName=t,this.domain=r,this.info=[],this.status=!1,this.policy=[],this.langValidation=!0}addRedirect(e,t="TBD",r="/",o,c,n,i,l){const s={redirectId:e,matchUrl:t,resultUrl:r,queryString:o,schemeAndHost:this.useHost(r),useRelative:this.isRelative(r),statusCode:i,isLoc:this.isLoc(t),redirectStatus:this.validations(t,r).status,redirectStatusMessage:this.validations(t,r).message.join("\n")};this.langValidation=l,this.info.push(s),this.getPolicy()}isLoc(e){let t=!1;return this.getLang().forEach(r=>{e.includes(r)&&(t=!0)}),t}getLang(){let e;return o.forEach((t,r)=>{t.site===this.domain&&(e=t.lang)}),e}validations(e,t){let r={status:!0,message:[]};if(e.includes(this.domain)||(r.status=!1,r.message.push(n)),t===e.slice(e.indexOf(".com")+4,e.length)&&(r.status=!1,r.message.push(i)),0===t.indexOf("/")&&this.langValidation){const o=this.getLang();if("NA"!==o[0])for(const c of o)!e.includes(c)||t.includes(c)||(r.status=!1,r.message.push(l))}return r}readyToGenerate(){let e=!0;for(const t of this.info)if(!t.redirectStatus){this.status=!1,e=!1;break}return e}updateRedirect(e,t){for(const r of this.info)if(r.redirectId===e){r.statusCode=t;break}}updateRedirectQuery(e,t){for(const r of this.info)if(r.redirectId===e){r.queryString=t;break}}isRelative(e){return e.startsWith("/")?1:""}useHost(e){return e.startsWith("/")?"copy_scheme_hostname":""}getPolicy(){this.policy.length=0,o.forEach(e=>{e.site===this.domain&&(e.policy!==e.policy_loc?(this.policy.push(e.policy),this.policy.push(e.policy_loc)):this.policy.push(e.policy))})}generateContent(){const e=[];let t=u,r=u;return this.info.forEach(e=>{(e.isLoc||e.matchUrl.includes("/free-tools/")||e.matchUrl.includes("/resources/"))&&"www.solarwinds.com"===this.domain?r+=`${this.ruleName},${e.matchUrl},,,,,,${e.queryString},${e.useRelative},${e.schemeAndHost},${e.resultUrl},${e.statusCode}\n`:t+=`${this.ruleName},${e.matchUrl},,,,,,${e.queryString},${e.useRelative},${e.schemeAndHost},${e.resultUrl},${e.statusCode}\n`}),e.push(t),e.push(r),e}generateTicketContent(e){if("wo"===e){return`Hi WebOps could you please sync the following policies and versions to Akamai Staging %0D%0A%0D%0A%E2%80%A2%09${this.policy}%0D%0A%0D%0AThank you.%0D%0A`.replace(",","%0D%0A%E2%80%A2%09")}{let e="";return this.info.forEach(t=>{0===t.resultUrl.indexOf("/")?e+=`| https://${t.matchUrl} | https://${this.domain+t.resultUrl} |\n`:e+=`| https://${t.matchUrl} |${t.resultUrl} |\n`}),e+="h4. {color:red}Notes{color}\n* Notes\n\n*FYI*\n[~vivian.chollette], @reporter",`h3. {panel:title=(on) *Ready for verification*|titleBGColor=#FFCEB8|titleColor=#292929}{panel}\n\nh4. Redirect platform\n * Akamai \n\nh4. Policy Name and Version \n * ${this.policy}\n\n\n\n\n||From || To ||\n${e}`}}}const h=()=>{const e=document.querySelector(a.urlsaText).value.trim().split("\n");let t="";if(e){for(const r of e)""!==r&&(t+=y(r)+"\n");document.querySelector(a.urlsaText).value=t.trim()}document.querySelector(a.urlsaText).value.trim()&&(document.querySelector(a.urlsaText).rows=""+document.querySelector(a.urlsaText).value.trim().split("\n").length)};function y(e){return e.replace("https://","").replace("http://","")}const m=()=>{const e=document.querySelector(a.urlsbText).value.trim().split("\n"),t=document.querySelector(a.sitesSelector).value;let r="";if(e){for(const o of e)if(""!==o){const e=y(o).replace(t,"");r+=0===e.length?e+"/\n":e+"\n"}document.querySelector(a.urlsbText).value=r.trim()}document.querySelector(a.urlsbText).value.trim()&&(document.querySelector(a.urlsbText).rows=""+document.querySelector(a.urlsbText).value.trim().split("\n").length)},p=e=>{const t=`<tr id='${e.redirectId}' class='${e.redirectStatus?"correct":"wrong"} table-row'>\n        <td>\n            <span class='status-icon'>\n                <img src="img/${e.redirectStatus?"correct.png":"wrong.png"}" alt="">\n                    <span class='error-panel'>${e.redirectStatusMessage.replace(".",".<br>")}</span>\n            </span>${e.matchUrl}\n        </td>\n        <td>\n            ${e.resultUrl}\n        </td>\n        <td>\n            <select class="form-control individual-redirectType" name="" id="">\n                <option value=${c[0]} ${301===e.statusCode?"selected":""}>${c[0]}</option>\n                <option value=${c[1]} ${302===e.statusCode?"selected":""}>${c[1]}</option>\n            </select>\n        </td>\n        <td>\n        <input class='form-control individual-checkbox' type="checkbox" name="" id="" ${1==e.queryString?"checked":""}>\n        </td>\n    </tr>`;document.querySelector(a.tableResult).insertAdjacentHTML("beforeend",t)},S=()=>{[a.redirectDescription,a.urlsaText,a.urlsbText].forEach(e=>{document.querySelector(e).value=""}),document.querySelector(a.generateButton).disabled=!0,document.querySelector(a.redirectDescription).focus(),document.querySelector(a.tableResult).innerHTML="<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>",document.querySelector(a.langValidation).checked=!0,document.querySelector(a.urlsbText).rows="10",document.querySelector(a.urlsaText).rows="10",document.querySelector("#next-steps").style.display="none",document.querySelector("#wuTicket").textContent="Generate WU comment",document.querySelector(a.queryStringSelector).value=1},g=e=>{document.querySelector(a.generateButton).disabled=!e},f={};window.addEventListener("load",e=>{o.forEach(e=>(e=>{const t=`<option value="${e}">${e}</option>`;document.querySelector(a.sitesSelector).insertAdjacentHTML("beforeend",t)})(e.site)),c.forEach(e=>(e=>{const t=`<option value="${e}">${e}</option>`;document.querySelector(a.typeSelector).insertAdjacentHTML("beforeend",t)})(e)),document.querySelector(a.redirectDescription).focus(),S(),"dark"===localStorage.getItem("theme")?(document.querySelector(a.themeSwitch).checked=!0,document.querySelector("body").classList.add("dark")):(document.querySelector(a.themeSwitch).checked=!1,document.querySelector("body").classList.remove("dark")),document.querySelector(a.redirectDescription).addEventListener("keyup",e=>{13===e.keyCode&&document.querySelector(a.sitesSelector).focus()}),document.querySelector(a.sitesSelector).addEventListener("keyup",e=>{13===e.keyCode&&document.querySelector(a.typeSelector).focus()}),document.querySelector(a.typeSelector).addEventListener("keyup",e=>{13===e.keyCode&&document.querySelector(a.urlsaText).focus()}),document.querySelector(a.urlsaText).addEventListener("keyup",e=>{13!==e.which&&37!==e.which&&38!==e.which&&39!==e.which&&40!==e.which&&8!==e.which&&46!==e.which&&(h(),t())}),document.querySelector(a.urlsbText).addEventListener("keyup",e=>{13!==e.which&&37!==e.which&&38!==e.which&&39!==e.which&&40!==e.which&&8!==e.which&&46!==e.which&&(m(),t())}),document.querySelector(a.urlsbText).addEventListener("focusout",e=>{m(),t()}),document.querySelector(a.urlsaText).addEventListener("focusout",e=>{h(),t()});const t=()=>{const e={ruleName:document.querySelector(a.redirectDescription).value.trim(),domain:document.querySelector(a.sitesSelector).value,queryString:document.querySelector(a.queryStringSelector).value,schemeAndHost:1,useRelative:"copy_scheme_hostname",statusCode:parseInt(document.querySelector(a.typeSelector).value),urlsa:document.querySelector(a.urlsaText).value.trim().split("\n"),urlsb:document.querySelector(a.urlsbText).value.trim().split("\n"),langValidation:document.querySelector(a.langValidation).checked};e.ruleName&&(e.urlsa.length>1&&e.urlsb.length>1?(f.redirect=new d(e.ruleName.split(" ")[0],e.ruleName,e.domain),e.urlsa.forEach((t,r)=>{f.redirect.addRedirect("redirect-"+(parseInt(r,10)+1),t,""===e.urlsb[r]?"/":e.urlsb[r],e.queryString,e.schemeAndHost,e.useRelative,e.statusCode,e.langValidation)}),document.querySelector(a.tableResult).innerHTML="<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>",f.redirect.info.forEach(e=>{p(e),g(),g(f.redirect.readyToGenerate())})):document.querySelector(a.tableResult).innerHTML="<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>"),console.log(f.redirect)};document.querySelector(a.redirectDescription).addEventListener("input",e=>{t()}),document.querySelector(a.sitesSelector).addEventListener("change",e=>{t(),h(),m()}),document.querySelector(a.typeSelector).addEventListener("change",e=>{t(),h(),m()}),document.querySelector(a.queryStringSelector).addEventListener("change",t),document.querySelector(a.tableResult).addEventListener("click",e=>{const t=e.target.closest(".table-row").id;if(e.target.matches(a.tableRedirectType+" option")){const e=document.querySelector(`#${t} ${a.tableRedirectType}`).value;f.redirect.updateRedirect(t,parseInt(e,10)),document.querySelector(a.tableResult).innerHTML="<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>",f.redirect.info.forEach(e=>{p(e)})}else if(e.target.matches(""+a.tableQueryString)){const e=document.querySelector(`#${t} ${a.tableQueryString}`).checked;f.redirect.updateRedirectQuery(t,!0===e?parseInt(1,10):""),document.querySelector(a.tableResult).innerHTML="<tr><th>From</th><th>To</th><th>Code</th><th>Query String</th></tr>",f.redirect.info.forEach(e=>{p(e)})}}),document.querySelector(a.clearButton).addEventListener("click",e=>{S()}),document.querySelector(a.generateButton).addEventListener("click",e=>{const t=f.redirect.generateContent();f.redirect.policy.forEach((e,r)=>{((e,t)=>{let r=document.createElement("a");r.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),r.setAttribute("download",e),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)})(`${f.redirect.ruleName} ${e}.csv`,t[r])}),document.querySelector("#next-steps").style.display="block",document.querySelector("#webopsTicket").href="mailto:helpdesk.webops@solarwinds.com?subject=Sync Akamai to Staging&body="+f.redirect.generateTicketContent("wo")}),document.querySelector(a.langValidation).addEventListener("change",t),document.querySelector(a.wuTicket).addEventListener("click",e=>{document.querySelector(a.ticketContent).style.display="block",document.querySelector(a.ticketContent).value=f.redirect.generateTicketContent("wu"),document.querySelector(a.ticketContent).select(),document.execCommand("copy"),document.querySelector(a.ticketContent).style.display="none",document.querySelector("#wuTicket").href="https://jira.solarwinds.com/browse/"+f.redirect.ticket,document.querySelector("#wuTicket").textContent="Copied to clipboard"}),document.querySelector(a.themeSwitch).addEventListener("click",e=>{document.querySelector(a.themeSwitch).checked?(document.querySelector("body").classList.add("dark"),localStorage.setItem("theme","dark")):(document.querySelector("body").classList.remove("dark"),localStorage.setItem("theme","light"))})})}]);