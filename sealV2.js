dt_ua=navigator.userAgent.toLowerCase();
dt_isop = (dt_ua.indexOf("opera") != -1);
dt_isie = (dt_ua.indexOf("msie") != -1);
dt_bma = parseInt(navigator.appVersion);
dt_localtest = true;
dt_si = "facecheck.id/";

dt_hn=window.location.hostname;

dt_ph = screen.height - 120;
if(screen!=null)if(screen.height<670)dt_ph=screen.height-70;
dt_ws="status=1,location=0,scrollbars=1,resizeable=yes,width=468,height="+dt_ph;
dt_w=null;
var dt_ver=-1;
var dt_re=new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
if (dt_re.exec(dt_ua) != null)
 dt_ver = parseFloat( RegExp.$1 );
if ( dt_ver > 0 ) dt_bma=dt_ver;




function dt_sp() {
 dt_w=window.open(dt_rsip,'dt_SIP',dt_ws);
 if ((dt_w != null)&&(!dt_isie||(dt_bma >= 5))) dt_w.focus();
}

function dt_dc(e) {
 if (dt_isop||document.addEventListener) {
 var eit=(e.target.name=="_dt_seal");
 if (eit){if (e.which==3){}}
 }
 else if (document.captureEvents) {
  var tgt=e.target.toString();
  var eit=(tgt.indexOf(dt_s)!=-1);
  if (eit){ if (e.which==3){}}
 }
}

function dt_md() {
 if(typeof event != 'undefined'){  if (event.button==2){
  return false;
 }else if(event.button==1){
  if(dt_isie) {
   return true;
  }
 }}
 dt_sp();
 return false;
}



function dt_set_seal(dt_div, dt_seal_type, dt_seal_align, dt_seal_id=0) {
    dt_sip = (dt_localtest ? "/" : "https://" + dt_si) + "certificate/" + dt_seal_id;
    dt_rsip = dt_sip + "?Referer=" + dt_hn;
    dt_is = (dt_localtest ? "/" : "//" + dt_si) + "seal_" + dt_seal_id + "_" + dt_seal_type + ".png";


    try
    {
        if (document.referrer != '' && document.referrer.indexOf(location.hostname) < 0 && typeof (window.dt_r_set) === 'undefined') {
            dt_is += "?r=" + encodeURIComponent(document.referrer.replace('http://', '').replace('https://', '')).replace(/%/g, "PRC");
            window.dt_r_set = true;
        }
    }
    catch (err) {
    }

    var css = "width: 200px;height: 110px;background-color: #fff;padding-left: 5px;zoom: 1;border: navy 2px solid;border-radius: 8px;background-image: url('/img/chrome_extension_seal.svg');background-repeat: no-repeat;background-position-x: 16px;background-position-y: 11px;cursor: pointer;";
    dt_div.setAttribute('style', css);

    dt_div.style.position = 'fixed';
    dt_div.style.zIndex = 1000;
    dt_div.style.left = '0px';
    dt_div.style.bottom = '0px';
    window.dt_div = dt_div;
    document.querySelector('.faceseal').onclick = function () {
        window.open('https://chrome.google.com/webstore/detail/facecheck-reverse-image-s/ciocmmdeghlmioiedoggnlefllfpfmdj', '_blank');
    };

}

if (document.addEventListener){
 document.addEventListener('mouseup',dt_dc,true);
}













(function () {

    var css = "display:none;background-color:#000;color:white;position:absolute;top:-310px; border:1px solid #000;width:300px;height:300px;";
    document.querySelector('.extension_preview').setAttribute('style', css);

    $(".faceseal").mouseover(function () {
        var img = document.querySelector('.extension_preview img')
        img.src = img.getAttribute('data-src');
        $(this).children(".extension_preview").show();
    }).mouseout(function () {
        $(this).children(".extension_preview").hide();
    });

    function ext_chrome_exists(fce) {
        try {
            if (chrome === undefined || chrome.runtime === undefined || chrome.runtime.sendMessage === undefined) {
                fce(null);
                return;
            }

            chrome.runtime.sendMessage('ciocmmdeghlmioiedoggnlefllfpfmdj', 'version', response => {
                if (!response) {
                    console.log('No extension');
                    fce(null);
                }
                else {
                    console.log('Extension installed: ' + response.version);
                    fce(response.version);
                }
            });
        }
        catch (ex) {
            console.log(ex);
            if (ex.message.indexOf("Cannot read properties of undefined (reading 'sendMessage')")>=0) {
                fce(null);
            }
        }
    };


    if (typeof dt_run_only_once == "undefined") {
        dt_run_only_once = true;

        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

        if (isChrome && window.innerWidth > 800 && window.innerHeight > 600) {
            ext_chrome_exists((exists) => {


                console.log(exists);
                if (exists == null) {
                    var divs = document.querySelectorAll('.faceseal');
                    for (var i = 0; i < divs.length; i++) {
                        var d = divs[i];
                        var dt_seal_type = d.getAttribute('data-seal_type');
                        var dt_seal_align = d.getAttribute('data-seal_align');
                        dt_set_seal(d, dt_seal_type, dt_seal_align, 0);
                    }
                }
            });
        }

    }
})();










