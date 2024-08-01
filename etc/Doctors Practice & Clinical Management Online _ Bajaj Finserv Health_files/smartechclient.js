"use strict";

(function () {
    if (!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom") && window.smartechclient) return;
    window.smartechclient = {
        w: window,
        d: document,
        s: "script",
        f: "//osjs.netcoresmartech.com/",
        o: "smartech",
        initiator: function (w, d, s, f, o) {
            w["SmartechObject"] = o;
            w[o] = w[o] || this.preSmartech
            w[o] = w[o].bind(this);

            const config = localStorage.getItem("__stconfig") || null;
            if (config) {
                const cnfg = JSON.parse(config),
                    expd = new Date(cnfg.exd);
                if (expd > new Date()) {
                    if (cnfg.ps === "0" || cnfg.js === "0") {
                        console.log("Js blocked.");
                        return;
                    }
                } else {
                    localStorage.removeItem("__stconfig");
                }
            }
        },
        setCustomVariable: function (paramName, defaultValue) {
            const searchParam = window.location.href;
            const searchParamURL = new URL(searchParam);

            if (searchParam.includes(paramName) || sessionStorage.getItem(paramName) !== null) {
                let paramValue = searchParamURL.searchParams.get(paramName)
                const nonAlphaNumericRegex = /\W/g;
                if (nonAlphaNumericRegex.test(paramValue)) {
                    return defaultValue;
                }
                if (!searchParam.includes(paramName)) {
                    paramValue = sessionStorage.getItem(paramName)
                }
                if (paramValue === "null") {
                    if (sessionStorage.getItem(paramName) !== null) {
                        sessionStorage.removeItem(paramName)
                    }
                    return defaultValue;
                } else {
                    if (searchParam.includes(paramName)) {
                        sessionStorage.setItem(paramName, paramValue);
                    }
                }
                return paramValue;
            } else {
                return defaultValue;
            }
        },
        checkLoad: function (ck, sk) {
            if (ck && sk) {
                let md = sessionStorage.getItem("__stmd");
                if (!["l", "s", "demo", "dev"].includes(md)) {
                    md = Math.random();
                    md = md > 0.95 ? "l" : "s";
                    sessionStorage.setItem("__stmd", md);
                }
                this.loadSt(ck, sk, md);
            }
        },
        generateSrc: function (ck, sk, rc) {
            const queryParam = "?clientkey=" + ck + "&siteid=" + sk + "&rc=" + rc;
            let envUrl = this.setCustomVariable("smtenv", "v1/js-versioning");
            if (envUrl != "v1/js-versioning") {
                envUrl += ".js"
            }
            this.f = "//" + this.setCustomVariable("smtdomain", "osjs");
            let port = this.setCustomVariable('smtport', "");
            if (port.length > 0) {
                port = ":" + port;
            }
            return "https:" + this.f + ".netcoresmartech.com" + port + "/" + envUrl + queryParam;
        },
        fetchTokens: async function(src, scriptNode, sk) {
            const urlOsjsToken = "https://cdnvc.netcoresmartech.com/vc/prod/wntoken.txt";
            const urlWnConfigToken = `https://cdnvc.netcoresmartech.com/vc/prod/wntoken_${sk}.txt`;
            const [osjsToken, wnConfigToken] = await Promise.all(
                [
                    this.getToken(urlOsjsToken),
                    this.getToken(urlWnConfigToken)
                ]
            );
            scriptNode.src = `${src}&tk1=${osjsToken}&tk2=${wnConfigToken}`;
        },
        getToken: async function(url) {
            const ts = Date.now();
            try {
                url = `${url}?ts=${ts}`;
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    return data;
                } else {
                    return ts;
                }
            } catch(error) {
                return ts;
            }
        },
        loadSt: function (ck, sk, rc) {
            let scriptNode = this.d.createElement(this.s);
            scriptNode.async = 1;
            const src = this.generateSrc(ck, sk, rc);
            scriptNode.id = "smartech_v4";
            const smt = this.d.getElementById(scriptNode.id);
            if (!smt) {
                this.d.head.appendChild(scriptNode);
                this.fetchTokens(src, scriptNode, sk);
            }
        },
        preSmartech: function (a, c, n) {
            let defaultck, defaultsk;
            if (a === "create") {
                defaultck = c;
                c = this.setCustomVariable("smtclientid", defaultck);
                sessionStorage.setItem("ck", c);
                sessionStorage.setItem("__smtidc", (n || "").toLowerCase());
                this.checkLoad(sessionStorage.getItem("ck"), localStorage.getItem("__stsiteid"));
                return;
            }
            if (a === "register") {
                defaultsk = c;
                c = this.setCustomVariable("smtsiteid", defaultsk);
                localStorage.setItem("__stsiteid", c);
                this.checkLoad(sessionStorage.getItem("ck"), localStorage.getItem("__stsiteid"));
                return;
            }
            (this.w[this.o].q = this.w[this.o].q || []).push(arguments);
        }
    }

    window.smartechclient.initiator.bind(window.smartechclient);
    window.smartechclient.setCustomVariable.bind(window.smartechclient);
    window.smartechclient.checkLoad.bind(window.smartechclient);
    window.smartechclient.generateSrc.bind(window.smartechclient);
    window.smartechclient.fetchTokens.bind(window.smartechclient);
    window.smartechclient.loadSt.bind(window.smartechclient);
    window.smartechclient.preSmartech.bind(window.smartechclient);
    window.smartechclient.initiator(window, document, "script", "//osjs.netcoresmartech.com/", "smartech");

    if (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"))
        module.exports = window.smartechclient
})()
