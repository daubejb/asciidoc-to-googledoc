/**
* used to control the App functions
* and hold globals values
* @namespace App
*/
var App = (function (ns) {
  
  ns.globals = {
    images: {
      titlePageHeaderBlob: UrlFetchApp.fetch('https://lh3.googleusercontent.com/4B6jO2IhjJv68gXUt8qZSjS2bs6nlSr8x2cTuvKh9T1OGv4ZyghLNa8ejjnUXw0zykdSb0IETs5ShN2fkUX-uF_LXLAGAPZdxJ8ATfnNhD9ROSI6_SAXIbs_DLOs4iUTE0tDQwuBewqhH7fQG0HaBYbKlE-TzEpSzBWo8Za9RAhasHAo6nFxRY_-C_7pQcZSxyIcHDnXzGea7CRji8bCCPSNn_KEqm0EKrhYSo-WUuQSXk0CfC3go_wnwUHc4XrtNMxIj8zyJXHFmdO4QUIv0sE7UlMtI5YggeAm4FsBwXj4lpY2wMqSsX2pxFiQC87B3utvbHxKvkz5VHgo8GH_bOw7yt6vbS-9sSvzmYvV_fEY6aOEUFjnuDpGbSzQo52ggbmBuRQ7au6wDJVChJUvXn48EAePDTBaGflYNFYkf7B2gCGAaMCaAl6Xf0c7_EKQlPpqKqaRidlLUA2UmFhYv8hexjmRJ8exyUuGcy57zaqd6FdkUXj20FpK84G2lDdW1wqd24U_RU_jx3yyaSSfYbPH0aUt5jjtb8PV8wsJTDNdEgoTazOpdWMN1uIAmjfbZ5ZpesFPxobYVTym4EkrxxnvFLh4O6omgIjZ9TQc3TuZU-ZYC6nUikGFFQgm2H_sj5OuTlPqPh1JufswAJhgczwZz_GCieO5YzPmwEvsZctP4upG6b0HjZx2NXliEhq8PsK0qna4tcZd_NiyDhv-7SHTNQSHlW6futyQ2vzWj_WgtijN=s192-no').getBlob()
    }
  };
  
  return ns;
}) (App || {});
