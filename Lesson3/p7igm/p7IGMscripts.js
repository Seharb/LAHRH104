
/* 
 ================================================
 PVII Image Gallery Magic 2 scripts
 Copyright (c) 2012-2015 Project Seven Development
 www.projectseven.com
 Version: 2.3.9 -build 98
 ================================================
 
*/

var p7IGMctl=[],p7IGMi=false,p7IGMa=false,p7IGMfsd=false,p7IGMdy=(1000/100);
function P7_IGMset(){
	var h,sh,hd,ie=P7_IGMgetIEver();
	if (!document.getElementById){
		return;
	}
	sh='';
	sh+='.IGM-thumbs {white-space: nowrap !important;}\n';
	sh+='.IGM-thumbs a {display: block !important;}\n';
	sh+='.IGM-thumbs li {display: inline-block !important;}\n';
	sh+='.IGM-arrows {display: block !important;}\n';
	sh+='.p7IGMimage-wrapper {position:relative; overflow:hidden;}\n';
	sh+='.p7IGMfixed-height {position:absolute; display:block; zoom:1; filter:inherit;}\n';
	sh+='.p7IGM-FSMode {height:100%;left:0;position:fixed;top:0;width:100% !important;z-index:99999998;}\n';
	sh+='.IGM-caption, .IGM-description {filter:inherit;}\n';
	sh+='.IGMno-display {display:none !important;}\n';
	sh+='.p7IGMroot-wrapper {margin:0;padding:0;}\n';
	if(ie>5&&ie<9){
		sh+='.IGM-cap-overlay-top, .IGM-cap-overlay-bottom, ';
		sh+='.p7IGMdescription-wrapper.IGM-desc-overlay-top .IGM-description, ';
		sh+='.p7IGMdescription-wrapper.IGM-desc-overlay-bottom ';
		sh+='.IGM-description { filter: alpha(opacity=80) !important; zoom: 1;}\n';
	}
	if(ie>5&&ie<8){
		sh+='.IGM-thumbs li {display: inline !important;}\n';
		sh+='.IGM-toolbar-top li, .IGM-toolbar-bottom li {display: inline;}\n';
		sh+='.IGMpaginator-pags-bottom ul, .IGMpaginator-pags-top ul {display: inline;}\n';
	}
	if(ie>5&&ie<7){
		sh+='.IGM-thumbs-top, .IGM-thumbs-bottom {margin: 0px !important;}\n';
		sh+='.IGM-thumbs a {display: inline !important;}\n';
		sh+='.IGM-thumbsVP {width: 100%;}\n';
		sh+='.IGM-arrows {zoom: 1;}\n';
		sh+='.arrow-left, .arrow-right {position: absolute !important; z-index: 999;}\n';
		sh+='.arrow-right {left: auto; right: -2px;}\n';
		sh+='div {zoom: 1;}\n';
	}
	if (document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n' + sh + '\n</s' + 'tyle>';
		document.write(h);
	}
	else{
		h=document.createElement('style');
		h.type='text/css';
		h.appendChild(document.createTextNode(sh));
		hd=document.getElementsByTagName('head');
		hd[0].appendChild(h);
	}
}
P7_IGMset();
function P7_opIGM(){
	if(!document.getElementById){
		return;
	}
	p7IGMctl[p7IGMctl.length]=arguments;
	if(arguments[1]>1){
		var tD=document.getElementById(arguments[0]);
		if(tD){
			tD.p7opt=arguments;
			P7_IGMthumbSetVert(tD.id);
		}
	}
}
function P7_IGMaddLoad(){
	if(!document.getElementById){
		return;
	}
	if(window.addEventListener){
		document.addEventListener("DOMContentLoaded",P7_initIGM,false);
		window.addEventListener("load",P7_initIGM,false);
		window.addEventListener("unload",P7_IGMrf,false);
		window.addEventListener("resize",P7_IGMrsz,false);
		document.addEventListener("keydown",P7_IGMkey,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie_igm defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_igm").onreadystatechange=function(){
			if(this.readyState=="complete"){
				if(p7IGMctl.length>0){
					P7_initIGM();
				}
			}
		};
		window.attachEvent("onload",P7_initIGM);
		window.attachEvent("onresize",P7_IGMrsz);
		document.attachEvent("onkeydown",P7_IGMkey);
	}
}
P7_IGMaddLoad();
function P7_IGMrf(){
	return;
}
function P7_initIGM(){
	var i,j,w,jj,k,x=0,tD,tV,tA,tC,li,tR,tW,im,a,dv,fS,fI,el,sn,cl,pN,n,cvs,tch;
	if(p7IGMi){
		return;
	}
	p7IGMi=true;
	tch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch || navigator.msMaxTouchPoints);
	document.p7igmpre=[];
	dv=document.createElement('div');
	dv.setAttribute('id','p7IGMfsc');
	document.getElementsByTagName('body')[0].appendChild(dv);
	for(j=0;j<p7IGMctl.length;j++){
		tD=document.getElementById(p7IGMctl[j][0]);
		if(tD){
			tD.p7opt=p7IGMctl[j];
			P7_IGMtblfix(tD);
			dv=document.createElement('div');
			dv.setAttribute('id',tD.id.replace('_','wrapper_'));
			dv.className='p7IGMroot-wrapper';
			pN=tD.parentNode;
			pN.insertBefore(dv,tD);
			dv.appendChild(tD);
			tD=document.getElementById(p7IGMctl[j][0]);
			P7_IGMremClass(tD,'IGMnoscript');
			if(tD.p7opt[12]===0){
				tD.p7opt[12]=1;
				P7_IGMrandomizer(tD.id);
			}
			k=0;
			tD.igmTrigScroll=false;
			tD.igmImages=[];
			tD.igmCurrentSlideNum=1;
			tD.igmShowMode='pause';
			tD.igmNumPlays=1;
			tD.igmDirection='right';
			tD.igmFixedHeight=tD.p7opt[19]>0;
			tV=document.getElementById(tD.id.replace('_','tvp_'));
			tW=document.getElementById(tD.id.replace('_','tgw_'));
			tW.igmDiv=tD.id;
			fI=document.getElementById(tD.id.replace('_','image_'));
			fI.igmDiv=tD.id;
			tD.igmCanvas=false;
			cvs=document.createElement('canvas');
			if(cvs.getContext && cvs.getContext('2d')){
				cvs.setAttribute('id',tD.id.replace('_','cvs_'));
				tD.igmCanvas=cvs.id;
				cvs.setAttribute('class','p7IGM-canvas');
				el=document.getElementById(tD.id.replace('_','im_'));
				el.parentNode.appendChild(cvs);
			}
			else if(tD.p7opt[5]==7){
				tD.p7opt[5]=8;
			}
			fS=document.getElementById(tD.id.replace('_','imgwrapper_'));
			if(tD.igmFixedHeight){
				if(!tD.igmCanvas){
					fS.style.height=tD.p7opt[19]+'px';
					P7_IGMsetClass(document.getElementById(tD.id.replace('_','imlink_')),'p7IGMfixed-height');
				}
				else{
					fS.style.height=tD.p7opt[19]+'px';
				}
			}
			if(!tD.igmCanvas && tD.p7opt[5]>1 && tD.p7opt[5]<7){
				dv=document.createElement('div');
				dv.setAttribute('id',tD.id.replace('_','overlay_'));
				dv.style.position='absolute';
				dv.style.left='-9000px';
				dv.style.top='0';
				dv.style.zIndex=2;
				dv.className='p7IGMoverlay';
				for(i=0;i<2;i++){
					cl=(i===0)?'v_':'v2_';
					el=fI.cloneNode(true);
					el.setAttribute('id',el.id.replace('_',cl));
					a=el.getElementsByTagName('A')[0];
					a.setAttribute('id',a.id.replace('_',cl));
					a.setAttribute('href','#');
					a.className=document.getElementById(tD.id.replace('_','imlink_')).className;
					im=el.getElementsByTagName('IMG')[0];
					im.setAttribute('id',im.id.replace('_',cl));
					im.setAttribute('name',im.id.replace('_',cl));
					im.setAttribute('alt','');
					im.className=document.getElementById(tD.id.replace('_','im_')).className;
					el.style.position='absolute';
					el.style.top='0';
					el.style.zIndex=2;
					dv.appendChild(el);
					dv.igmDiv=tD.id;
					tD['igmOVdiv'+(i+1)]=el;
					tD['igmOVim'+(i+1)]=im;
				}
			}
			else{
				im=document.createElement('img');
				im.setAttribute('id',tD.id.replace('_','imv_'));
				im.className=document.getElementById(tD.id.replace('_','im_')).className;
				a=document.createElement('a');
				a.setAttribute('id',tD.id.replace('_','imlinkv_'));
				a.className=document.getElementById(tD.id.replace('_','imlink_')).className;
				a.appendChild(im);
				dv=document.createElement('div');
				dv.setAttribute('id',tD.id.replace('_','imagev_'));
				dv.style.position='absolute';
				dv.style.display='none';
				dv.style.top='0';
				dv.style.zIndex=2;
				dv.className=document.getElementById(tD.id.replace('_','image_')).className;
				dv.appendChild(a);
			}
			fS.appendChild(dv);
			el=document.getElementById(tD.id.replace('_','caption_'));
			pN=document.getElementById(tD.id.replace('_','capwrapper_'));
			if(el&&pN){
				el.igmDiv=tD.id;
				tD.igmCaptionDiv=el.id;
				pN.igmDiv=tD.id;
				pN.igmCaptionType='normal';
				el.igmType=pN.igmType='cap';
				cl=pN.className;
				if(cl && (/IGM-cap-/.test(cl))){
					pN.igmPositionType=cl.match(/IGM-cap-[^"\s]*[^\s]/)[0];
					pN.igmPositionType=pN.igmPositionType.replace('IGM-cap-','');
				}
			}
			else{
				tD.igmCaptionDiv=false;
			}
			el=document.getElementById(tD.id.replace('_','desc_'));
			pN=document.getElementById(tD.id.replace('_','descwrapper_'));
			if(el&&pN){
				el.igmDiv=tD.id;
				tD.igmDescDiv=el.id;
				pN.igmDiv=tD.id;
				pN.igmDescType='normal';
				el.igmType=pN.igmType='desc';
				cl=pN.className;
				if(cl && (/IGM-desc-/.test(cl))){
					pN.igmPositionType=cl.match(/IGM-desc-[^"\s]*[^\s]/)[0];
					pN.igmPositionType=pN.igmPositionType.replace('IGM-desc-','');
				}
			}
			else{
				tD.igmDescDiv=false;
			}
			tD.igmCapClosed=true;
			tD.igmDescClosed=true;
			tD.onCapDescClosed=function(sn,bp){
				if(sn==this.igmCurrentSlideNum){
					if( (!this.igmCaptionDiv || this.igmCapClosed) && (!this.igmDescDiv || this.igmDescClosed) ){
						this.igmCapClosed=false;
						this.igmDescClosed=false;
						P7_IGMdispB(this.id,sn,bp);
					}
				}
			};
			tD.igmCapOpened=true;
			tD.igmDescOpened=true;
			el=document.getElementById(tD.id.replace('_','thumbs_'));
			tD.igmHasThumbs=true;
			cl=el.className;
			if(cl && (/p7IGM-no-thumbs/.test(cl))){
				tD.igmHasThumbs=false;
			}
			tA=tW.getElementsByTagName('A');
			tD.igmCategories=[];
			if(tD.igmHasThumbs && tD.p7opt[2]==1){
				tD.igmTrigScroll=true;
				tW.style.left='0px';
				tD.igmThumbScrollType='horiz';
				for(w=tA.length-1;w>-1;w--){
					cl=tA[w].parentNode.parentNode.className;
					if(cl && /IGM-thumbs/.test(cl)){
						break;
					}
				}
				if(w>-1){
					P7_IGMresetWidth(tW,tA[w].parentNode,(w+1));
				}
				el=document.getElementById(tD.id.replace('_','tvp_'));
				tR=document.getElementById(tD.id.replace('_','left_'));
				if(tR){
					tR.igmDiv=tD.id;
					tR.onclick=function(){
						return P7_IGMthumbScroll(this.igmDiv,'left');
					};
					tR.parentNode.style.height=el.offsetHeight+'px';
				}
				tR=document.getElementById(tD.id.replace('_','right_'));
				if(tR){
					tR.igmDiv=tD.id;
					tR.onclick=function(){
						return P7_IGMthumbScroll(this.igmDiv,'right');
					};
					tR.parentNode.style.height=el.offsetHeight+'px';
				}
			}
			if(tD.p7opt[9]==1){
				document.oncontextmenu=function(evt){
					var tg,m=true;
					evt=(evt)?evt:event;
					tg=(evt.target)?evt.target:evt.srcElement;
					if(tg.id&&tg.id.indexOf('p7IGM')===0){
						m=false;
					}
					return m;
				};
			}
			k=0;
			for(i=0;i<tA.length;i++){
				if(tA[i].parentNode.nodeName=="LI"){
					k++;
					tD.igmImages[k]=tA[i];
					tA[i].igmDiv=tD.id;
					tA[i].igmImageNum=k;
					if(tD.igmHasThumbs){
						tA[i].onclick=function(){
							return P7_IGMcontrol(this.igmDiv, this.igmImageNum);
						};
						tA[i].parentNode.onmouseover=function(){
							P7_IGMsetClass(this,'igm-thumb-over');
						};
						tA[i].parentNode.onmouseout=function(){
							P7_IGMremClass(this,'igm-thumb-over');
						};
					}
					document.p7igmpre[x]=new Image();
					document.p7igmpre[x].cmp=false;
					document.p7igmpre[x].onload=function(){
						this.cmp=true;
					};
					document.p7igmpre[x].onerror=function(){
						this.cmp=true;
						this.p7Status='load_error';
						this.width=300;
						this.height=300;
					};
					tA[i].igmPreIndex=x;
					tA[i].igmPreImage=document.p7igmpre[x];
					if(k<3){
						document.p7igmpre[x].src=tA[i].href;
					}
					x++;
				}
			}
			P7_IGMthumbSetArrowStates(tD.id);
			tD.igmImageNums=tD.igmImages.length-1;
			tD.igmPaginator=false;
			tD.igmPaginators=[];
			tC=document.getElementById(tD.id.replace('_','paginator_'));
			if(tC){
				tD.igmPaginator=true;
				tA=tC.getElementsByTagName('A');
				if(tA){
					jj=0;
					for(k=0;k<tA.length;k++){
						if(!tA[k].id && !/pgpp|pgbk/.test(tA[k].id)){
							jj++;
							if(tD.igmImages[jj]){
								tA[k].igmDiv=tD.id;
								tA[k].igmImageNum=jj;
								tD.igmPaginators[jj]=tA[k];
								tA[k].setAttribute('title',tD.igmImages[jj].getAttribute('title'));
								tA[k].onclick=function(){
									return P7_IGMcontrol(this.igmDiv, this.igmImageNum);
								};
							}
						}
					}
				}
			}
			if(tch){
				el=document.getElementById(tD.id.replace('_','fullsize_'));
				el.igmDiv=tD.id;
				P7_IGMbindSwipe(el,function(dir){
					if(dir=='left'){
						P7_IGMcontrol(this.igmDiv,'next');
					}
					else if(dir=='right'){
						P7_IGMcontrol(this.igmDiv,'prev');
					}
				}
				);
				el=document.getElementById(tD.id.replace('_','thumbs_'));
				if(el){
					el.igmDiv=tD.id;
					P7_IGMbindSwipe(el,function(dir){
						if(dir=='left'){
							P7_IGMthumbScroll(this.igmDiv,'right');
						}
						else if(dir=='right'){
							P7_IGMthumbScroll(this.igmDiv,'left');
						}
					}
					);
				}
			}
			tD.igmControls=[];
			tD.igmControls[0]=P7_IGMsetCC(tD.id,'bp_','prev');
			tD.igmControls[1]=P7_IGMsetCC(tD.id,'bn_','next');
			tC=document.getElementById(tD.id.replace('_','toolbar_'));
			if(tC){
				tD.igmControls[2]=P7_IGMsetCC(tD.id,'rf_','first');
				tD.igmControls[3]=P7_IGMsetCC(tD.id,'rp_','prev');
				tD.igmControls[5]=P7_IGMsetCC(tD.id,'rn_','next');
				tD.igmControls[6]=P7_IGMsetCC(tD.id,'rl_','last');
				el=document.getElementById(tD.id.replace('_','rpp_'));
				if(el){
					el.p7state='pause';
					el.igmDiv=tD.id;
					tD.igmControls[4]=el;
					el.onclick=function(){
						var ac=(this.p7state=='play')?'pause':'play';
						P7_IGMcontrol(this.igmDiv,ac);
						return false;
					};
					el.igmSetButtonState=function(st){
						var tx;
						if(st=='play'){
							tx='||';
							P7_IGMremClass(this,'tb-play');
							this.setAttribute('title','Pause');
						}
						else{
							tx='&rArr;';
							P7_IGMsetClass(this,'tb-play');
							this.setAttribute('title','Play');
						}
						this.innerHTML=tx;
					};
				}
			}
			el=document.getElementById(tD.id.replace('_','pgpp_'));
			if(el){
				el.p7state='pause';
				el.igmDiv=tD.id;
				tD.igmControls[7]=el;
				el.onclick=function(){
					var ac=(this.p7state=='play')?'pause':'play';
					P7_IGMcontrol(this.igmDiv,ac);
					return false;
				};
				el.igmSetButtonState=function(st){
					this.p7state=st;
					if(st=='play'){
						P7_IGMremClass(this,'pag-play');
						this.setAttribute('title','Pause');
					}
					else{
						P7_IGMsetClass(this,'pag-play');
						this.setAttribute('title','Play');
					}
				};
			}
			var hs=(P7_IGMgetIEver()>5)?1:2;
			el=document.getElementById(tD.id.replace('_','rbk_'));
			if(el){
				el.onclick=function(){
					return P7_IGMgoBack();
				};
				if(window.history.length<hs){
					el.style.display='none';
				}
			}
			el=document.getElementById(tD.id.replace('_','pgbk_'));
			if(el){
				el.onclick=function(){
					return P7_IGMgoBack();
				};
				if(window.history.length<hs){
					el.style.display='none';
				}
			}
			tD.igmFullScreen=false;
			el=document.getElementById(tD.id.replace('_','rmx_'));
			if(el){
				el.p7state='normal';
				P7_IGMremClass(this,'max');
				P7_IGMsetClass(this,'min');
				el.igmDiv=tD.id;
				tD.igmControls[9]=el;
				el.onclick=function(){
					var ac=(this.p7state=='fullscreen')?'normal':'fullscreen';
					P7_IGMfullScreen(this.igmDiv,ac);
					return false;
				};
				el.igmSetButtonState=function(st){
					this.p7state=st;
					if(this.p7state=='fullscreen'){
						P7_IGMremClass(this,'max');
						P7_IGMsetClass(this,'min');
						this.setAttribute('title','Exit Full Screen Mode');
					}
					else{
						P7_IGMremClass(this,'min');
						P7_IGMsetClass(this,'max');
						this.setAttribute('title','Full Screen Mode');
					}
				};
			}
			el=document.getElementById(tD.id.replace('_','pgx_'));
			if(el){
				el.p7state='normal';
				P7_IGMremClass(this,'max');
				P7_IGMsetClass(this,'min');
				el.igmDiv=tD.id;
				tD.igmControls[10]=el;
				el.onclick=function(){
					var ac=(this.p7state=='fullscreen')?'normal':'fullscreen';
					P7_IGMfullScreen(this.igmDiv,ac);
					return false;
				};
				el.igmSetButtonState=function(st){
					this.p7state=st;
					if(this.p7state=='fullscreen'){
						P7_IGMremClass(this,'max');
						P7_IGMsetClass(this,'min');
						this.setAttribute('title','Exit Full Screen Mode');
					}
					else{
						P7_IGMremClass(this,'min');
						P7_IGMsetClass(this,'max');
						this.setAttribute('title','Full Screen Mode');
					}
				};
			}
			P7_IGMpause(tD.id);
			P7_IGManimPreLoad(tD.id);
		}
	}
	p7IGMa=true;
}
function P7_IGMfullScreen(dv,ac){
	var i,tD,vP,ch,imA,el,cW,cvs,fh,cla,ctx,fsc;
	tD=document.getElementById(dv);
	if(ac=='fullscreen'){
		if(p7IGMfsd || tD.igmfullScreen ){
			return;
		}
	}
	else if(ac!='fullscreen' && !tD.igmFullScreen){
		return;
	}
	if(tD.igmShowTimer){
		clearTimeout(tD.igmShowTimer);
	}
	if(tD.igmControls[9]){
		tD.igmControls[9].igmSetButtonState(ac);
	}
	if(tD.igmControls[10]){
		tD.igmControls[10].igmSetButtonState(ac);
	}
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	cW=document.getElementById(tD.id.replace('_','image_'));
	if(ac=='fullscreen'){
		if(tD.igmCanvas){
			cvs=document.getElementById(tD.igmCanvas);
			tD.igmOrigCanvasHeight=cvs.height;
			tD.igmOrigCanvasWidth=cvs.width;
		}
		p7IGMfsd=tD.id;
		tD.igmStaticHeight=tD.offsetHeight;
		tD.igmStaticVPHeight=vP.offsetHeight;
		tD.igmStaticHeightOpt=tD.p7opt[19];
		tD.igmChromeHeight=tD.offsetHeight - vP.offsetHeight;
		fsc=document.getElementById('p7IGMfsc');
		fsc.appendChild(tD);
		P7_IGMsetClass(document.body,'p7IGM-suppressScroll');
		tD.igmFixedHeight=true;
		P7_IGMsetClass(tD,'IGM-fixed-height');
		if(!tD.igmCanvas){
			cla=['imlink_','imlinkv_','imlinkv2'];
			for(i=0;i<cla.length;i++){
				el=document.getElementById(tD.id.replace('_',cla[i]));
				if(el){
					P7_IGMsetClass(el,'p7IGMfixed-height');
					el.style.left='0px';
					el.style.top='0px';
				}
			}
		}
		tD.igmFullScreen=true;
		P7_IGMsetClass(tD,'p7IGM-fullscreen');
		tD.igmFullScreenChromeHeight=tD.offsetHeight - tD.igmStaticVPHeight;
		P7_IGMsetClass(tD,'p7IGM-FSMode');
		tD.p7opt[19]=tD.offsetHeight - tD.igmFullScreenChromeHeight;
		if(tD.igmCanvas){
			vP.style.height=tD.p7opt[19]+'px';
			cvs=document.getElementById(tD.igmCanvas);
			ctx=cvs.getContext('2d');
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
	}
	else{
		p7IGMfsd=false;
		tD.p7opt[19]=tD.igmStaticHeightOpt;
		if(tD.p7opt[19]===0){
			tD.igmFixedHeight=false;
			P7_IGMremClass(tD,'IGM-fixed-height');
			cla=['imlink_','imlinkv_','imlinkv2'];
			for(i=0;i<cla.length;i++){
				el=document.getElementById(tD.id.replace('_',cla[i]));
				if(el){
					P7_IGMremClass(el,'p7IGMfixed-height');
					el.style.left='0px';
					el.style.top='0px';
				}
			}
		}
		if(tD.igmCanvas){
			cvs=document.getElementById(tD.igmCanvas);
			cvs.height=tD.igmOrigCanvasHeight;
			cvs.width=tD.igmOrigCanvasWidth;
			ctx=cvs.getContext('2d');
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
		if(tD.igmCanvas){
			vP.style.height=tD.igmStaticVPHeight+'px';
		}
		else{
			if(tD.p7opt[19]>0){
				vP.style.height=tD.p7opt[19]+'px';
			}
			else{
				vP.style.height=tD.igmStaticVPHeight+'px';
			}
		}
		tD.igmFullScreen=false;
		fsc=document.getElementById(tD.id.replace('_','wrapper_'));
		fsc.appendChild(tD);
		tD=document.getElementById(dv);
		P7_IGMremClass(tD,'p7IGM-fullscreen');
		P7_IGMremClass(document.body,'p7IGM-suppressScroll');
		P7_IGMremClass(tD,'p7IGM-FSMode');
	}
	if(tD.igmResizer){
		clearTimeout(tD.igmResizer);
	}
	P7_IGMrsz(1);
}
function P7_IGMinitB(dv){
	var sn,tD=document.getElementById(dv);
	sn=tD.p7opt[12];
	P7_IGMcontrol(tD.id,sn,1);
	P7_IGMurl(tD.id);
	if(tD.p7opt[1]==1){
		P7_IGMfullScreen(dv,'fullscreen');
	}
	if(tD.p7opt[13]==1){
		tD.igmShowMode='play';
		if(tD.igmControls[4]){
			tD.igmControls[4].p7state='play';
			tD.igmControls[4].igmSetButtonState('play');
		}
		if(tD.igmControls[7]){
			tD.igmControls[7].p7state='play';
			tD.igmControls[7].igmSetButtonState('play');
		}
		if(tD.igmShowTimer){
			clearTimeout(tD.igmShowTimer);
		}
		tD.igmShowTimer=setTimeout("P7_IGMcontrol('"+tD.id+"','next',2)",tD.p7opt[14]);
	}
}
function P7_IGMshowImage(dv,sn,bp){
	var tA,tD,zn;
	bp=(bp)?bp:null;
	tD=document.getElementById(dv);
	if(tD.igmCurrentSlideNum==sn && bp!=1){
		return false;
	}
	if(tD.p7igmwait){
		clearTimeout(tD.p7igmwait);
	}
	if(tD.igmOVsrcTimer){
		clearTimeout(tD.igmOVsrcTimer);
	}
	tD.igmPreviousSlideNum=tD.igmCurrentSlideNum;
	tD.igmCurrentSlideNum=sn;
	tA=tD.igmImages[sn];
	tA.igmPreImage.src=tA.href;
	P7_IGMsetControlStates(tD.id);
	if(tD.igmPreviousSlideNum!=tD.igmCurrentSlideNum){
		P7_IGMremClass(tD.igmImages[tD.igmPreviousSlideNum],'thumb_down');
		P7_IGMremClass(tD.igmImages[tD.igmPreviousSlideNum].parentNode,'thumb_down');
	}
	P7_IGMsetClass(tA,'thumb_down');
	P7_IGMsetClass(tA.parentNode,'thumb_down');
	P7_IGMthumbSync(dv);
	P7_IGMpreLoadImage(tD.id,sn,tA.igmPreIndex,bp);
	return false;
}
function P7_IGMpreLoadImage(dv,sn,ix,bp){
	var tD,iM,lD,im,tA;
	iM=document.p7igmpre[ix];
	lD=document.getElementById(dv.replace('_','loading_'));
	tD=document.getElementById(dv);
	if(tD.p7igmwait){
		clearTimeout(tD.p7igmwait);
	}
	if(iM.cmp && iM.height>0 && iM.width>0){
		if(iM.p7Status!='load_error'){
			lD.style.display='none';
		}
		if(!tD.igmCanvas){
			P7_IGMswitchOVsrc(dv,sn,ix,bp);
		}
		else{
			P7_IGMdispA(dv,sn,bp);
		}
	}
	else{
		lD.style.display='block';
		tD.p7igmwait=setTimeout("P7_IGMpreLoadImage('"+dv+"',"+sn+","+ix+","+bp+")",60);
	}
}
function P7_IGMdispA(dv,sn,bp){
	var tD;
	tD=document.getElementById(dv);
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	if(tD.igmCaptionDiv){
		tD.igmCapClosed=false;
		P7_IGMcloseCapDesc(tD,'cap',sn,bp);
	}
	if(tD.igmDescDiv){
		tD.igmDescClosed=false;
		P7_IGMcloseCapDesc(tD,'desc',sn,bp);
	}
	if(tD.p7opt[5]==7){
		if(tD.igmCanvas){
			P7_IGMswitchImgSource(dv,sn,bp);
			P7_IGMpzSetCvs(dv,sn,bp);
			P7_IGMdispF(dv,sn,bp);
		}
		else{
			P7_IGMpzSet(dv,sn,bp);
			P7_IGMdispF(dv,sn,bp);
		}
	}
	else if(!tD.igmCaptionDiv && !tD.igmDescDiv){
		P7_IGMdispB(dv,sn,bp);
	}
}
function P7_IGMdispB(dv,sn,bp){
	var tD,an,tA,iM,vP,dm;
	tD=document.getElementById(dv);
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	if(tD.igmFixedHeight || tD.p7opt[5]==8){
		P7_IGMdispC(dv,sn,bp);
		return;
	}
	an=tD.p7opt[5];
	if( bp==1 || !p7IGMa ){
		if(an!=7){
			an=0;
		}
	}
	if(tD.igmCanvas){
		vP=document.getElementById(tD.id.replace('_','image_'));
	}
	else{
		vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	}
	tD.igmPevViewportHeight=vP.offsetHeight;
	tA=tD.igmImages[sn];
	iM=tA.igmPreImage;
	if(vP.p7Move){
		clearInterval(vP.p7Move);
	}
	vP.style.height=vP.offsetHeight+'px';
	dm=P7_IGMfitImg(iM.width,iM.height,vP.offsetWidth,vP.offsetHeight);
	if(an>0){
		if(Math.round(dm[1]) < vP.offsetHeight ){
			vP.igmDiv=tD.id;
			vP.p7vph_c=function(cba){
				P7_IGMdispC(this.igmDiv,cba[0],cba[1]);
			};
			vP.p7Type='quad';
			vP.p7anim=[[vP.id,'height',vP.offsetHeight,dm[1]]];
			vP.p7StartTime=P7_IGMgetTime(0);
			vP.p7Duration=tD.p7opt[6];
vP.p7Move=setInterval(function(){
	P7_IGMmove(vP,vP.p7vph_c,[sn,bp]);
}
,p7IGMdy);
}
else{
P7_IGMdispC(dv,sn,bp);
}
}
else{
if(dm[1]<vP.offsetHeight && tD.p7opt[19]!=1){
vP.style.height=dm[1]+'px';
}
P7_IGMdispC(dv,sn,bp);
}
}
function P7_IGMdispC(dv,sn,bp){
	var tD,an;
	tD=document.getElementById(dv);
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	an=tD.p7opt[5];
	if(an<2 || an==8){
		if(tD.igmCanvas){
			P7_IGMswitchImgSource(dv,sn,bp);
			P7_IGMsetCrossFadeCvs(dv,sn,bp);
		}
		else{
			P7_IGMsetCrossFader(dv,sn,bp);
		}
	}
	else if(an>1 && an<10 && an!=7){
		if(tD.igmCanvas){
			P7_IGMswitchImgSource(dv,sn,bp);
			P7_IGMsetSlideCvs(dv,sn,bp);
		}
		else{
			P7_IGMsetSlider(dv,sn,bp);
		}
	}
	else{
		P7_IGMswitchImgSource(dv,sn,bp);
		P7_IGMdispD(dv,sn,bp);
	}
}
function P7_IGMdispD(dv,sn,bp){
	var tD,an,tA,iM,vP,dm;
	tD=document.getElementById(dv);
	if(tD.igmFixedHeight || tD.p7opt[5]==8){
		P7_IGMdispE(dv,sn,bp);
		return;
	}
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	an=tD.p7opt[5];
	if( bp==1 || !p7IGMa ){
		if(an!=7){
			an=0;
		}
	}
	tA=tD.igmImages[sn];
	iM=tA.igmPreImage;
	if(tD.igmCanvas){
		vP=document.getElementById(tD.id.replace('_','image_'));
	}
	else{
		vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	}
	if(vP.p7Move){
		clearInterval(vP.p7Move);
	}
	vP.style.height=vP.offsetHeight+'px';
	dm=P7_IGMfitImg(iM.width,iM.height,vP.offsetWidth,vP.offsetHeight);
	if(an>0){
		if(Math.round(dm[1]) > vP.offsetHeight){
			vP.igmDiv=tD.id;
			vP.p7vph_f=function(cba){
				P7_IGMdispE(this.igmDiv,cba[0],cba[1]);
			};
			vP.p7anim=[[vP.id,'height',vP.offsetHeight,dm[1]]];
			vP.p7StartTime=P7_IGMgetTime(0);
			vP.p7Duration=tD.p7opt[6];
			vP.p7Type='quad';
vP.p7Move=setInterval(function(){
	P7_IGMmove(vP,vP.p7vph_f,[sn,bp]);
}
,p7IGMdy);
}
else{
P7_IGMdispE(dv,sn,bp);
}
}
else{
if(dm[1]>vP.offsetHeight && tD.p7opt[19]!=1){
vP.style.height=dm[1]+'px';
}
P7_IGMdispE(dv,sn,bp);
}
}
function P7_IGMdispE(dv,sn,bp){
	var tD;
	tD=document.getElementById(dv);
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	if(tD.igmCaptionDiv){
		tD.igmCapOpened=false;
		P7_IGMopenCapDesc(tD,'cap',sn,bp);
	}
	if(tD.igmDescDiv){
		tD.igmDescOpened=false;
		P7_IGMopenCapDesc(tD,'desc',sn,bp);
	}
	P7_IGMdispF(dv,sn,bp);
}
function P7_IGMdispF(dv,sn,bp){
	var tD,tA,iM,ns;
	tD=document.getElementById(dv);
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	ns=tD.igmCurrentSlideNum+1;
	ns=(ns<=tD.igmImages.length-1)?ns:1;
	tA=tD.igmImages[ns];
	iM=tA.igmPreImage;
	if(!iM.cmp){
		iM.src=tA.href;
	}
	if(tD.igmShowMode=='play' && bp!=1){
		tD.igmShowMode='play';
		tD.igmShowResume=false;
		if(tD.igmShowTimer){
			clearTimeout(tD.igmShowTimer);
		}
		tD.igmShowTimer=setTimeout("P7_IGMcontrol('"+tD.id+"','next',2)",tD.p7opt[15]);
	}
}
function P7_IGMswitchOVsrc(dv,sn,ix,bp){
	var tD,oV,oVI,iM,imD,an,dy=5;
	tD=document.getElementById(dv);
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	an=tD.p7opt[5];
	dy=10;
	if(!tD.igmCanvas && bp!=1){
		dy=500;
	}
	iM=document.getElementById(tD.id.replace('_','im_'));
	imD=document.getElementById(tD.id.replace('_','image_'));
	oV=document.getElementById(dv.replace('_','imagev_'));
	oVI=document.getElementById(dv.replace('_','imv_'));
	oV.style.width=imD.offsetWidth+'px';
	oVI.src=iM.src;
	oVI.style.height=iM.style.height;
	oVI.style.width=iM.style.width;
	oVI.parentNode.style.left=iM.parentNode.style.left;
	oVI.parentNode.style.top=iM.parentNode.style.top;
	oV.style.left=imD.style.left;
	oV.style.top=imD.style.top;
	if(tD.igmOVsrcTimer){
		clearTimeout(tD.igmOVsrcTimer);
	}
	tD.igmOVsrcTimer=setTimeout("P7_IGMdispA('"+dv+"',"+sn+","+bp+")",dy);
}
function P7_IGMswitchImgSource(dv,sn,bp,imd){
	var i,tD,iM,imT,imA,cN,tA,imlA,cl,el,tt,rl,imD;
	tD=document.getElementById(dv);
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	if(!imd){
		imd=tD.id.replace('_','image_');
	}
	imD=document.getElementById(imd);
	tA=tD.igmImages[tD.igmCurrentSlideNum];
	imT=tA.getElementsByTagName('IMG')[0];
	iM=imD.getElementsByTagName('IMG')[0];
	imA=imD.getElementsByTagName('A')[0];
	iM.src=tA.igmPreImage.src;
	imA.removeAttribute("href");
	imA.setAttribute("title","");
	imA.onclick=null;
	cN=tA.parentNode.childNodes;
	for(i=0;i<cN.length;i++){
		if(cN[i].nodeType==1){
			cl=cN[i].className;
			if(cl&&cl=='p7igm_image_link'){
				el=cN[i].getElementsByTagName('A');
				if(el&&el[0]){
					imA.setAttribute("href",el[0].getAttribute("href"));
					tt='';
					if(el[0].textContent){
						tt=el[0].textContent;
					}
					else if(el[0].innerText){
						tt=el[0].innerText;
					}
					tt=(tt&&tt!=='')?tt:imT.getAttribute('alt');
					imA.setAttribute("title",tt);
					if(el[0].getAttribute('target')){
						imA.setAttribute('target',el[0].getAttribute('target'));
					}
					else{
						imA.removeAttribute('target');
					}
					rl=el[0].getAttribute('rel');
					if(rl&&rl=='new'){
						imA.onclick=function(){
							return P7_IGMopenWin(this);
						};
					}
					else{
						imA.onclick=function(){
							return P7_IGMImageClick(this);
						};
					}
				}
				break;
			}
		}
	}
}
function P7_IGMcloseCapDesc(tD,tp,sn,bp){
	var cd,cw,an,cD,cW,vP,sD,st,ady;
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	an=(tp=='cap')?tD.p7opt[7]:tD.p7opt[8];
	ady=(tp=='cap')?tD.p7opt[10]:tD.p7opt[11];
	if(bp!=2){
		ady=ady/3;
	}
	cd=(tp=='cap')?'caption_':'desc_';
	cw=(tp=='cap')?'capwrapper_':'descwrapper_';
	cD=document.getElementById(tD.id.replace('_',cd));
	cW=document.getElementById(tD.id.replace('_',cw));
	if( bp==1 || !p7IGMa ){
		if(tD.p7opt[5]!=7){
			an=0;
		}
	}
	if(an>0){
		if(an==1){
			if(cW.p7Fader){
				clearInterval(cW.p7Fader);
			}
			P7_IGMfade(cW,99,1,ady,false,false,P7_IGMCapDescClosed,[sn,bp]);
		}
		else if(an==2){
			if(cD.p7Move){
				clearInterval(cD.p7Move);
			}
			if(cW.p7Move){
				clearInterval(cW.p7Move);
			}
			if(cW.igmPositionType=='overlay-top'){
				cW.p7anim=[[cW.id,'top',cW.offsetTop,cW.offsetHeight*-1]];
				sD=cW;
			}
			else if(cW.igmPositionType=='overlay-bottom'){
				st=parseInt(P7_IGMgetStyle(cW,'bottom','bottom'),10);
				st=(st)?st:0;
				cW.p7anim=[[cW.id,'bottom',st,cW.offsetHeight*-1]];
				sD=cW;
			}
			else if(cW.igmPositionType=='top'){
				cW.style.height=cW.offsetHeight+'px';
				cD.p7anim=[[cD.id,'top',cD.offsetTop,cD.offsetHeight*-1]];
				sD=cD;
			}
			else if(cW.igmPositionType=='bottom'){
				cW.style.height=cW.offsetHeight+'px';
				cD.p7anim=[[cD.id,'top',cD.offsetTop,cD.offsetHeight]];
				sD=cD;
			}
			else{
				cD.style.visibility='hidden';
				cW.style.visibility='hidden';
				if(tp=='cap'){
					tD.igmCapClosed=true;
				}
				else{
					tD.igmDescClosed=true;
				}
				P7_IGMCapDescClosed.call(cW,sn,bp);
				return;
			}
			sD.p7Type='quad';
			sD.p7StartTime=P7_IGMgetTime(0);
			sD.p7Duration=ady;
sD.p7Move=setInterval(function(){
	P7_IGMmove(sD,P7_IGMCapDescClosed,[sn,bp]);
}
,p7IGMdy);
}
}
else{
cD.style.visibility='hidden';
cW.style.visibility='hidden';
if(cW.igmPositionType=='overlay-bottom'){
cW.style.bottom=cW.offsetHeight*-1+'px';
}
if(an==1){
if(cW.filters){
	cW.style.filter='alpha(opacity=1)';
}
else{
	cW.style.opacity=0.01;
}
}
if(tp=='cap'){
tD.igmCapClosed=true;
}
else{
tD.igmDescClosed=true;
}
P7_IGMCapDescClosed.call(cW,[sn,bp]);
}
}
function P7_IGMCapDescClosed(cba){
	var tD=document.getElementById(this.igmDiv);
	if(cba[0]!=tD.igmCurrentSlideNum){
		return;
	}
	this.p7State='closed';
	this.style.visibility='hidden';
	if(this.igmType=='cap'){
		tD.igmCapClosed=true;
	}
	else{
		tD.igmDescClosed=true;
	}
	if(tD.p7opt[5]==7){
		P7_IGMopenCapDesc(tD,this.igmType,cba[0],cba[1]);
	}
	else{
		tD.onCapDescClosed(cba[0],cba[1]);
	}
}
function P7_IGMopenCapDesc(tD,tp,sn,bp){
	var i,cd,cw,cl,an,cD,cW,vP,sD,tA,imT,cN,sR,ob,tt,ch,st,ady,hasCnt=true;
	if(sn!=tD.igmCurrentSlideNum){
		return;
	}
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	an=(tp=='cap')?tD.p7opt[7]:tD.p7opt[8];
	ady=(tp=='cap')?tD.p7opt[10]:tD.p7opt[11];
	cd=(tp=='cap')?'caption_':'desc_';
	cw=(tp=='cap')?'capwrapper_':'descwrapper_';
	cD=document.getElementById(tD.id.replace('_',cd));
	cW=document.getElementById(tD.id.replace('_',cw));
	cD.style.visibility='hidden';
	cW.style.visibility='hidden';
	tA=tD.igmImages[tD.igmCurrentSlideNum];
	ch=cD.offsetHeight;
	if(tp=='cap'){
		tt=tA.getAttribute('title');
		ob=document.createTextNode(tt);
		if(cD.hasChildNodes){
			for(i=0;i<cD.childNodes.length;i++){
				cD.removeChild(cD.childNodes[i]);
			}
		}
		if(tt&&tt!==''){
			cD.appendChild(ob);
		}
		else{
			hasCnt=false;
		}
	}
	else{
		if(cD.p7src){
			P7_IGMcopyCN(cD.p7src,cD);
		}
		cD.p7src=false;
		cN=tA.parentNode.childNodes;
		for(i=0;i<cN.length;i++){
			if(cN[i].nodeType==1){
				cl=cN[i].className;
				if(cl&&cl=='p7igm_description'){
					sR=cN[i];
					break;
				}
			}
		}
		if(sR){
			P7_IGMcopyCN(cD,sR);
			cD.p7src=sR;
		}
		else{
			hasCnt=false;
		}
	}
	if( bp==1 || !p7IGMa ){
		if(tD.p7opt[5]!=7){
			an=0;
		}
	}
	if( an>0){
		if(an==1){
			if(cW.p7Fader){
				clearInterval(cW.p7Fader);
			}
			if(cW.igmPositionType=='overlay-bottom'){
				cW.style.bottom='0px';
			}
			if(hasCnt){
				cD.style.visibility='visible';
				P7_IGMfade(cW,1,99,ady,true,true,P7_IGMCapDescOpened,[sn,bp]);
			}
			else{
				if(tp=='cap'){
					tD.igmCapOpened=true;
				}
				else{
					tD.igmDescOpened=true;
				}
			}
		}
		else if(an==2){
			if(cD.p7Move){
				clearInterval(cD.p7Move);
			}
			if(cW.p7Move){
				clearInterval(cW.p7Move);
			}
			cD.igmAdjustHeight=false;
			if(hasCnt){
				if(cW.igmPositionType=='overlay-top'){
					cW.p7anim=[[cW.id,'top',cW.offsetHeight*-1,0]];
					sD=cW;
				}
				else if(cW.igmPositionType=='overlay-bottom'){
					cW.p7anim=[[cW.id,'bottom',cW.offsetHeight*-1,0]];
					sD=cW;
				}
				else if(cW.igmPositionType=='top'){
					cD.p7anim=[[cD.id,'top',cD.offsetHeight*-1,0]];
					if(ch!=cD.offsetHeight){
						cD.igmAdjustHeight=true;
					}
					sD=cD;
				}
				else if(cW.igmPositionType=='bottom'){
					cD.p7anim=[[cD.id,'top',cW.offsetHeight,0]];
					if(ch!=cD.offsetHeight){
						cD.igmAdjustHeight=true;
					}
					sD=cD;
				}
				else{
					cD.style.visibility='hidden';
					cW.style.visibility='hidden';
					if(tp=='cap'){
						tD.igmCapOpened=true;
					}
					else{
						tD.igmDescOpened=true;
					}
					return;
				}
				if(sD.p7State!='open'){
					sD.style[sD.p7anim[0][1]]=sD.p7anim[0][2]+'px';
				}
				sD.p7State='open';
				cD.style.visibility='visible';
				cW.style.visibility='visible';
				sD.p7Type='quad';
				sD.p7StartTime=P7_IGMgetTime(0);
				sD.p7Duration=ady;
sD.p7Move=setInterval(function(){
	P7_IGMmove(sD,P7_IGMCapDescOpened,[sn,bp]);
}
,p7IGMdy);
}
else{
if(tp=='cap'){
	tD.igmCapOpened=true;
}
else{
	tD.igmDescOpened=true;
}
}
}
}
else{
if(hasCnt){
if(cW.filters){
cW.style.filter='';
}
else{
cW.style.opacity=1.0;
}
cD.style.visibility='visible';
cW.style.visibility='visible';
if(cW.igmPositionType=='overlay-bottom'){
cW.style.bottom='0px';
}
}
if(tp=='cap'){
tD.igmCapOpened=true;
}
else{
tD.igmDescOpened=true;
}
}
}
function P7_IGMCapDescOpened(cba){
	var tD=document.getElementById(this.igmDiv);
	if(cba[0]!=tD.igmCurrentSlideNum){
		return;
	}
	if(this.igmAdjustHeight){
		P7_IGMCapDescAdjustHeight(this,cba);
	}
	else{
		if(this.igmType=='cap'){
			tD.igmCapOpened=true;
		}
		else{
			tD.igmDescOpened=true;
		}
		if(tD.p7opt[5]!=7){
		}
	}
}
function P7_IGMCapDescAdjustHeight(el,cba){
	var tD=document.getElementById(this.igmDiv);
	if(cba[0]!=tD.igmCurrentSlideNum){
		return;
	}
	var cW=el.parentNode;
	if(cW.p7Move){
		clearInterval(cW.p7Move);
	}
	cW.p7callback=function(cba){
		var tD=document.getElementById(this.igmDiv);
		this.style.height='auto';
		if(this.igmType=='cap'){
			tD.igmCapOpened=true;
		}
		else{
			tD.igmDescOpened=true;
		}
		if(tD.p7opt[5]!=7){
		}
	};
	cW.p7Type='quad';
	cW.p7anim=[[cW.id,'height',cW.offsetHeight,el.offsetHeight]];
	cW.p7StartTime=P7_IGMgetTime(0);
	cW.p7Duration=15;
cW.p7Move=setInterval(function(){
	P7_IGMmove(cW,cW.p7callback,cba);
}
,p7IGMdy);
}
function P7_IGMctrl(dv,ac){
	return P7_IGMcontrol(dv,ac);
}
function P7_IGMcontrol(dv,ac,bp){
	var i,tD,cs,ts,op,sn,eI,eC,eD,tm=0,pauseOnAction=false,rs=false,m=false;
	tD=document.getElementById(dv);
	if(tD&&tD.igmImages){
		if(tD.igmShowTimer){
			clearTimeout(tD.igmShowTimer);
		}
		if(tD.p7opt[20]==1){
			pauseOnAction=true;
		}
		cs=tD.igmCurrentSlideNum;
		ts=tD.igmImageNums;
		op=tD.p7opt;
		if(ac=='pause'){
			P7_IGMpause(dv);
			return m;
		}
		if(!bp && pauseOnAction){
			P7_IGMpause(tD.id);
		}
		if(ac=='play'){
			tD.igmShowMode='play';
			if(tD.igmControls[4]){
				tD.igmControls[4].p7state='play';
				tD.igmControls[4].igmSetButtonState('play');
			}
			if(tD.igmControls[7]){
				tD.igmControls[7].p7state='play';
				tD.igmControls[7].igmSetButtonState('play');
			}
			ac='next';
			rs=true;
		}
		if(ac=='first'){
			sn=1;
		}
		else if(ac=='prev'){
			sn=cs-1;
			if(sn<1){
				sn=ts;
			}
		}
		else if(ac=='next'){
			sn=cs+1;
			if(tD.igmShowMode=='play'){
				if(tD.igmDirection=='left'){
					sn=cs-1;
				}
				if(sn>ts){
					tD.igmNumPlays++;
					if(tD.p7opt[17]>0&&tD.igmNumPlays>tD.p7opt[17]){
						tD.igmNumPlays=0;
						sn=(tD.p7opt[18]==1)?1:tD.igmImageNums;
						tD.igmDirection='right';
						P7_IGMpause(tD.id);
					}
					else{
						if(tD.p7opt[16]===0){
							sn=cs-1;
							tD.igmDirection='left';
						}
						else{
							sn=1;
						}
					}
				}
				if(sn<1){
					tD.numPlays++;
					tD.igmDirection='right';
					if(tD.p7opt[7]>0&&tD.numPlays>tD.p7opt[7]){
						tD.igmNumPlays=0;
						sn=(tD.p7opt[18]==1)?1:tD.igmImageNums;
						P7_IGMpause(tD.id);
					}
					else{
						sn=cs+1;
					}
				}
			}
			else{
				if(sn>ts){
					sn=1;
				}
			}
		}
		else if(ac=='last'){
			sn=ts;
		}
		else{
			sn=ac;
		}
		sn=(sn<1)?1:sn;
		sn=(sn>tD.igmImageNums)?tD.igmImageNums:sn;
		if(sn==tD.igmCurrentSlideNum&&bp!=1){
			return m;
		}
		tD.igmCarousel='next';
		if((sn < tD.igmCurrentSlideNum) || ac=='prev'){
			tD.igmCarousel='prev';
		}
		if(rs){
			tm=100;
			setTimeout("P7_IGMshowImage('"+tD.id+"',"+sn+","+bp+")",tm );
		}
		else{
			P7_IGMshowImage(tD.id,sn,bp);
		}
	}
	return false;
}
function P7_IGMsetControlStates(dv){
	var i,tD,sn,cl='off';
	tD=document.getElementById(dv);
	sn=tD.igmCurrentSlideNum;
	if(sn<=1){
		P7_IGMsetClass(tD.igmControls[2],cl);
	}
	else{
		P7_IGMremClass(tD.igmControls[2],cl);
	}
	if(sn>=tD.igmImageNums){
		P7_IGMsetClass(tD.igmControls[6],cl);
	}
	else{
		P7_IGMremClass(tD.igmControls[6],cl);
	}
	if(tD.igmPaginator){
		for(i=1;i<tD.igmPaginators.length;i++){
			if(i==sn){
				P7_IGMsetClass(tD.igmPaginators[i],'pags-down');
			}
			else{
				P7_IGMremClass(tD.igmPaginators[i],'pags-down');
			}
		}
	}
}
function P7_IGMpause(d){
	var cD,tD=document.getElementById(d);
	if(tD){
		tD.igmShowMode='pause';
		if(tD.igmShowTimer){
			clearTimeout(tD.igmShowTimer);
		}
		if(tD.igmControls[4]){
			tD.igmControls[4].p7state='pause';
			tD.igmControls[4].igmSetButtonState('pause');
		}
		if(tD.igmControls[7]){
			tD.igmControls[7].p7state='pause';
			tD.igmControls[7].igmSetButtonState('pause');
		}
	}
}
function P7_IGMthumbSync(dv){
	var tD,tV,tW,sn,sl,fl,li,vw,vh,tw,dh,viewEdge,vprtEdge,lastli,minLeft,m=false;
	tD=document.getElementById(dv);
	tV=document.getElementById(tD.id.replace('_','tvp_'));
	tW=document.getElementById(tD.id.replace('_','tgw_'));
	if(!tD.igmHasThumbs && tD.p7opt[2]!=1){
		return;
	}
	if(tW.p7Move){
		clearInterval(tW.p7Move);
		tW.p7MoveRunning=false;
	}
	P7_IGMresetOffsets(tW.parentNode);
	sn=tD.igmCurrentSlideNum;
	li=tD.igmImages[sn].parentNode;
	vw=tV.offsetWidth;
	tw=li.offsetWidth;
	dh=tW.offsetHeight;
	sl=parseInt(tW.style.left,10);
	fl=sl;
	lastli=tD.igmImages[tD.igmImages.length-1].parentNode;
	minLeft=(lastli.offsetLeft+lastli.offsetWidth-tV.offsetWidth)*-1;
	if(tD.igmThumbScrollType=='horiz'){
		viewEdge=li.offsetLeft+tw;
		vprtEdge=(tW.offsetLeft*-1)+vw;
		if(viewEdge>vprtEdge || (li.offsetLeft*-1)>tW.offsetLeft){
			fl=(li.offsetLeft*-1)+((vw-tw)/2);
			fl=(fl>0)?0:fl;
			fl=(fl<minLeft)?minLeft:fl;
			tW.p7anim=[[tW.id, 'left', sl, fl]];
			m=true;
		}
	}
	else{
		return;
	}
	if(m){
		tW.p7Type='quad';
		tW.p7StartTime=P7_IGMgetTime(0);
		tW.p7Duration=tD.p7opt[3];
tW.p7Move=setInterval(function(){
	P7_IGMmove(tW,P7_IGMthumbSetArrowStates,tD.id);
}
,p7IGMdy);
}
}
function P7_IGMthumbScroll(d,dr){
	var tD,tW,tV,li,minLeft,vw,sl=0,fl=0;
	tD=document.getElementById(d);
	tV=document.getElementById(tD.id.replace('_','tvp_'));
	tW=document.getElementById(tD.id.replace('_','tgw_'));
	if(tW.p7Move){
		clearInterval(tW.p7Move);
		tW.p7MoveRunning=false;
	}
	if(dr=='stop'){
		return false;
	}
	P7_IGMresetOffsets(tW.parentNode);
	sl=tW.offsetLeft;
	vw=tV.offsetWidth;
	li=tD.igmImages[tD.igmImages.length-1].parentNode;
	minLeft=(li.offsetLeft+li.offsetWidth-tV.offsetWidth)*-1;
	if(dr=='left'){
		fl=sl+vw;
		fl=(fl>0)?0:fl;
		tW.p7anim=[[tW.id, 'left', sl, fl]];
	}
	else if(dr=='right'){
		fl=sl-vw;
		fl=(fl<minLeft)?minLeft:fl;
		tW.p7anim=[[tW.id, 'left', sl, fl]];
	}
	tW.p7Type='quad';
	tW.p7StartTime=P7_IGMgetTime(0);
	tW.p7Duration=tD.p7opt[3];
tW.p7Move=setInterval(function(){
	P7_IGMmove(tW,P7_IGMthumbSetArrowStates,tD.id);
}
,p7IGMdy);
return false;
}
function P7_IGMthumbSetArrowStates(d){
	var a,tD,tW,tV,cl,vh,minLeft,li,cls='arrow-off';
	tD=document.getElementById(d);
	tW=document.getElementById(d.replace('_','tgw_'));
	tV=document.getElementById(tD.id.replace('_','tvp_'));
	if(!tD.igmHasThumbs){
		return;
	}
	cl=tW.offsetLeft;
	li=tD.igmImages[tD.igmImages.length-1].parentNode;
	minLeft=(li.offsetLeft+li.offsetWidth-tV.offsetWidth)*-1;
	vh=tV.offsetHeight;
	a=document.getElementById(d.replace('_','left_'));
	if(a){
		if(cl>=0){
			P7_IGMsetClass(a,cls);
			P7_IGMsetClass(a.parentNode,cls);
		}
		else{
			P7_IGMremClass(a,cls);
			P7_IGMremClass(a.parentNode,cls);
		}
	}
	a=document.getElementById(d.replace('_','right_'));
	if(a){
		if(cl<=minLeft){
			P7_IGMsetClass(a,cls);
			P7_IGMsetClass(a.parentNode,cls);
		}
		else{
			P7_IGMremClass(a,cls);
			P7_IGMremClass(a.parentNode,cls);
		}
	}
}
function P7_IGMsetCrossFadeCvs(dv,sn,bp){
	var tD,tA,iM,cD,pD,vP,ci,cvs,ctx,pz,cb,tp,dm,vh;
	tD=document.getElementById(dv);
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	tA=tD.igmImages[sn];
	iM=tA.igmPreImage;
	if(tD.igmCurrentPZ=='A'){
		cD=document.getElementById(tD.id.replace('_','imagev_'));
		pD=document.getElementById(tD.id.replace('_','image_'));
		tD.igmCurrentPZ='B';
	}
	else{
		cD=document.getElementById(tD.id.replace('_','image_'));
		pD=document.getElementById(tD.id.replace('_','imagev_'));
		tD.igmCurrentPZ='A';
	}
	if(pD.p7CvsAnim){
		clearInterval(pD.p7CvsAnim);
	}
	if(cD.p7CvsAnim){
		clearInterval(cD.p7CvsAnim);
	}
	cD.igmPrevDiv=pD.id;
	pD.igmPrevDiv=cD.id;
	cD.igmCurrentImage=iM;
	cD.igmPrevImage=pD.igmCurrentImage;
	cvs=document.getElementById(tD.igmCanvas);
	ctx=cvs.getContext('2d');
	vP.igmViewportWidth=vP.offsetWidth;
	dm=P7_IGMfitImg(tA.igmPreImage.width,tA.igmPreImage.height,vP.offsetWidth,vP.offsetHeight,tD.igmFixedHeight);
	if(tD.p7opt[5]==8){
		tA.igmPZoptions=['igmPZ',2,2,2,2,15,1,1];
		P7_IGMpzPosition(cD,tA.igmPZoptions,cvs.width,cvs.height,tA.igmPreImage.width,tA.igmPreImage.height);
	}
	else{
		cD.p7currentWidth = dm[0];
		cD.p7currentHeight = dm[1];
		if(tD.igmFixedHeight){
			cD.p7currentLeft=(vP.offsetWidth-dm[0])/2;
			cD.p7currentTop = (vP.offsetHeight-dm[1])/2;
		}
		else{
			cD.p7currentLeft = 0;
			cD.p7currentTop = 0;
		}
	}
	cD.igmCanvas=tD.igmCanvas;
	cD.igmDiv=tD.id;
	cD.crossFadeFinished=function(cba){
		var tD=document.getElementById(this.igmDiv);
		if(tD.p7opt[5]==8){
			P7_IGMdispE(this.igmDiv,cba[0],cba[1]);
		}
		else{
			P7_IGMdispD(this.igmDiv,cba[0],cba[1]);
		}
	};
	cb=false;
	tp='linear';
	cD.igmFadeTime=0;
	cD.igmFadeBegin=0;
	cD.igmFadeFinish=100;
	cD.igmFadeDuration=tD.p7opt[6]/p7IGMdy;
	if( tD.p7opt[5]<1 || bp==1 || !p7IGMa ){
		cD.igmFadeDuration=1;
	}
cD.p7CvsAnim=setInterval(function(){
	P7_IGMcrossFadeCvs(cD,cD.crossFadeFinished,tp,[sn,bp]);
}
, p7IGMdy);
}
function P7_IGMcrossFadeCvs(el,cb,tp,cba){
	var cvs,ctx,iM,obOut,imOut,pi,po;
	iM=el.igmCurrentImage;
	cvs=document.getElementById(el.igmCanvas);
	ctx=cvs.getContext('2d');
	obOut=document.getElementById(el.igmPrevDiv);
	if(obOut&&obOut.igmCurrentImage){
		imOut=obOut.igmCurrentImage;
	}
	if(el.igmFadeTime<el.igmFadeDuration){
		el.igmFadeTime++;
		pi=P7_IGMlinear(el.igmFadeTime,el.igmFadeBegin,el.igmFadeFinish-el.igmFadeBegin,el.igmFadeDuration);
		po=el.igmFadeFinish-pi;
		if(imOut){
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.globalAlpha=(po/100);
			ctx.drawImage(imOut, obOut.p7currentLeft, obOut.p7currentTop, obOut.p7currentWidth ,obOut.p7currentHeight);
		}
		ctx.globalAlpha= pi/100;
		ctx.drawImage(iM, el.p7currentLeft, el.p7currentTop, el.p7currentWidth, el.p7currentHeight);
	}
	else{
		clearInterval(el.p7CvsAnim);
		if(cb && typeof(cb) === "function"){
			cb.call(el,cba);
		}
	}
}
function P7_IGMsetSlideCvs(dv,sn,bp){
	var tD,tA,iM,cD,pD,vP,an,ci,cvs,ctx,pz,cb,tp,dm,sl,st,fl,ft,vw,vh,pm;
	tD=document.getElementById(dv);
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	tA=tD.igmImages[sn];
	iM=tA.igmPreImage;
	an=tD.p7opt[5];
	if(tD.igmCurrentPZ=='A'){
		cD=document.getElementById(tD.id.replace('_','imagev_'));
		pD=document.getElementById(tD.id.replace('_','image_'));
		tD.igmCurrentPZ='B';
	}
	else{
		cD=document.getElementById(tD.id.replace('_','image_'));
		pD=document.getElementById(tD.id.replace('_','imagev_'));
		tD.igmCurrentPZ='A';
	}
	if(pD.p7CvsAnim){
		clearInterval(pD.p7CvsAnim);
	}
	if(cD.p7CvsAnim){
		clearInterval(cD.p7CvsAnim);
	}
	cD.igmPrevDiv=pD.id;
	pD.igmPrevDiv=cD.id;
	cD.igmCurrentImage=iM;
	cD.igmPrevImage=pD.igmCurrentImage;
	cvs=document.getElementById(tD.igmCanvas);
	ctx=cvs.getContext('2d');
	vP.igmViewportWidth=vP.offsetWidth;
	dm=P7_IGMfitImg(tA.igmPreImage.width,tA.igmPreImage.height,vP.offsetWidth,vP.offsetHeight,tD.igmFixedHeight);
	cD.p7currentWidth = dm[0];
	cD.p7currentHeight = dm[1];
	cD.igmCanvas=tD.igmCanvas;
	cD.igmDiv=tD.id;
	vw=cvs.width;
	vh=cvs.height;
	pD.p7startLeft=pD.p7startTop=cD.p7startLeft=cD.p7startTop=0;
	pD.p7finishLeft=pD.p7finishTop=cD.p7finishLeft=cD.p7finishTop=0;
	if(an==6){
		an=Math.floor((Math.random()*4)+2);
	}
	if(tD.p7opt[16]===0){
		if(tD.igmCarousel=='prev'){
			if(an==2){
				an=3;
			}
			else if(an==3){
				an=2;
			}
			else if(an==4){
				an=5;
			}
			else if(an==5){
				an=4;
			}
		}
	}
	tD.igmCarousel='next';
	if(an==2){
		cD.p7startLeft=dm[0]*-1;
		pD.p7finishLeft=vw;
	}
	else if(an==3){
		cD.p7startLeft=dm[0];
		pD.p7finishLeft=vw*-1;
	}
	else if(an==4){
		cD.p7startTop=dm[1]*-1;
		pD.p7finishTop=vP.offsetHeight;
	}
	else{
		cD.p7startTop=tD.igmPevViewportHeight;
		pD.p7finishTop=tD.igmPevViewportHeight*-1;
	}
	if(tD.igmFixedHeight){
		cD.p7finishLeft= (vw-dm[0])/2;
		cD.p7finishTop = (vh-dm[1])/2;
		pD.p7startLeft=pD.p7currentLeft;
		pD.p7startTop=pD.p7currentTop;
		if(an==2){
			cD.p7startLeft=(vw*-1)+( (vw-dm[0])/2 );
			cD.p7startTop=(vh-dm[1])/2;
			pD.p7finishLeft=pD.p7startLeft+vw;
			pD.p7finishTop=pD.p7startTop;
		}
		else if(an==3){
			cD.p7startLeft=vw+( (vw-dm[0]) /2);
			cD.p7startTop=(vh-dm[1])/2;
			pD.p7finishLeft=pD.p7startLeft-vw;
			pD.p7finishTop=pD.p7startTop;
		}
		else if(an==4){
			cD.p7startLeft = (vw-dm[0])/2;
			cD.p7startTop=(vh*-1)+( (vh-dm[1])/2);
			pD.p7finishLeft=pD.p7startLeft;
			pD.p7finishTop=pD.p7startTop+vh;
		}
		else{
			cD.p7startLeft=(vw-dm[0])/2;
			cD.p7startTop=vh+( (vh-dm[1])/2);
			pD.p7finishLeft=pD.p7startLeft;
			pD.p7finishTop=pD.p7startTop-vh;
		}
	}
	cD.p7StartTime=P7_IGMgetTime(0);
	cD.p7Duration=tD.p7opt[6];
	if( bp==1 || !p7IGMa ){
		cD.p7Duration=1;
	}
	cD.slideFinished=function(cba){
		P7_IGMdispD(this.igmDiv,cba[0],cba[1]);
	};
	tp='quad';
cD.p7CvsAnim=setInterval(function(){
	P7_IGMslideCvs(cD,cD.slideFinished,tp,[sn,bp]);
}
, p7IGMdy);
}
function P7_IGMslideCvs(cD,cb,tp,cba){
	var pD,cI,pI,cvs,ctx,x=0,xx=0,y=0,yy=0,m=false;
	cI=cD.igmCurrentImage;
	cvs=document.getElementById(cD.igmCanvas);
	ctx=cvs.getContext('2d');
	pD=document.getElementById(cD.igmPrevDiv);
	if(pD&&pD.igmCurrentImage){
		pI=pD.igmCurrentImage;
	}
	var elapsedTime=P7_IGMgetTime(cD.p7StartTime);
	if(elapsedTime>=cD.p7Duration){
		elapsedTime=cD.p7Duration;
		m=true;
	}
	x=P7_IGManim(tp, elapsedTime, cD.p7startLeft, cD.p7finishLeft-cD.p7startLeft, cD.p7Duration);
	y=P7_IGManim(tp,elapsedTime, cD.p7startTop, cD.p7finishTop-cD.p7startTop, cD.p7Duration);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(cI, x, y, cD.p7currentWidth, cD.p7currentHeight);
	cD.p7currentLeft=x;
	cD.p7currentTop=y;
	if(pD && pI){
		xx=P7_IGManim(tp, elapsedTime, pD.p7startLeft, pD.p7finishLeft-pD.p7startLeft, cD.p7Duration);
		yy=P7_IGManim(tp,elapsedTime, pD.p7startTop, pD.p7finishTop-pD.p7startTop, cD.p7Duration);
		ctx.drawImage(pI, xx, yy, pD.p7currentWidth, pD.p7currentHeight);
	}
	if(m){
		clearInterval(cD.p7CvsAnim);
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(cI, cD.p7finishLeft, cD.p7finishTop, cD.p7currentWidth, cD.p7currentHeight);
		if(cb && typeof(cb) === "function"){
			cb.call(cD,cba);
		}
	}
}
function P7_IGMsetSlider(dv,sn,bp){
	var tD,vP,tA,iM,oV,iW,an,dm,st=0,sl=0,fl=0,ft=0,vw,vh,x=0,xx=0,y=0,yy=0;
	tD=document.getElementById(dv);
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	iW=document.getElementById(tD.id.replace('_','image_'));
	iM=document.getElementById(tD.id.replace('_','im_'));
	vh=vP.offsetHeight;
	vw=vP.offsetWidth;
	oV=document.getElementById(tD.id.replace('_','overlay_'));
	tA=tD.igmImages[sn];
	an=tD.p7opt[5];
	if(oV.p7Move){
		clearInterval(oV.p7Move);
	}
	dm=P7_IGMgetImageFit(tA,iM,vP,tD.igmFixedHeight);
	tD.igmOVim2.src=tA.igmPreImage.src;
	tD.igmOVim2.style.width=dm[0]+'px';
	tD.igmOVim2.style.height=dm[1]+'px';
	if(tD.igmFixedHeight){
		var cA=tD.igmOVim2.parentNode;
		P7_IGMcenterElement(cA,cA.offsetWidth,cA.offsetHeight,vw,vh);
	}
	if(an==6){
		an=Math.floor((Math.random()*4)+2);
	}
	if(tD.p7opt[16]===0){
		if(tD.igmCarousel=='prev'){
			if(an==2){
				an=3;
			}
			else if(an==3){
				an=2;
			}
			else if(an==4){
				an=5;
			}
			else if(an==5){
				an=4;
			}
		}
	}
	if(an==2){
		sl=vw*-1;
		x=vw;
		oV.p7anim=[[oV.id,'left',sl,fl]];
	}
	else if(an==3){
		fl=vw*-1;
		xx=vw;
		oV.p7anim=[[oV.id,'left',sl,fl]];
	}
	else if(an==4){
		if(tD.igmFixedHeight){
			st=vh*-1;
			y=vh;
		}
		else{
			st=dm[1]*-1;
			y=dm[1];
		}
		oV.p7anim=[[oV.id,'top',st,ft]];
	}
	else if(an==5){
		if(tD.igmFixedHeight){
			st=0;
			ft=vh*-1;
			yy=vh;
		}
		else{
			st=0;
			ft=tD.igmOVim1.height*-1;
			yy=tD.igmOVim1.height;
		}
		oV.p7anim=[[oV.id,'top',st,ft]];
	}
	tD.igmOVdiv1.style.left=x+'px';
	tD.igmOVdiv1.style.top=y+'px';
	tD.igmOVdiv2.style.left=xx+'px';
	tD.igmOVdiv2.style.top=yy+'px';
	oV.style.left=sl+'px';
	oV.style.top=st+'px';
	iW.style.left='-9000px';
	iW.style.display='block';
	iM.style.width=dm[0]+'px';
	iM.style.height=dm[1]+'px';
	if(tD.igmFixedHeight){
		cA=iM.parentNode;
		P7_IGMcenterElement(cA,cA.offsetWidth,cA.offsetHeight,vw,vh);
	}
	P7_IGMswitchImgSource(dv,sn,bp);
	oV.slideFinished=function(cba){
		var tD=document.getElementById(this.igmDiv);
		var iW=document.getElementById(tD.id.replace('_','image_'));
		iW.style.display='block';
		iW.style.left='0px';
		this.style.left='-9000px';
		P7_IGMdispD(this.igmDiv,cba[0],cba[1]);
	};
	oV.p7StartTime=P7_IGMgetTime(0);
	oV.p7Duration=tD.p7opt[6];
	oV.p7Type='quad';
	if( bp==1 || !p7IGMa ){
		oV.p7Duration=1;
	}
oV.p7Move=setInterval(function(){
	P7_IGMmove(oV,oV.slideFinished,[sn,bp]);
}
,p7IGMdy);
}
function P7_IGMsetCrossFader(dv,sn,bp){
	var tD,vP,oV,tA,iM,iMV,vh,vw,cD,dm;
	tD=document.getElementById(dv);
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	vh=vP.offsetHeight;
	vw=vP.offsetWidth;
	cD=document.getElementById(tD.id.replace('_','image_'));
	iM=document.getElementById(tD.id.replace('_','im_'));
	oV=document.getElementById(tD.id.replace('_','imagev_'));
	iMV=document.getElementById(tD.id.replace('_','imv_'));
	tA=tD.igmImages[sn];
	if(cD.p7fader){
		clearInterval(cD.p7fader);
	}
	oV.style.left=cD.style.left;
	oV.style.display='block';
	cD.style.left='-9000px';
	cD.style.display='block';
	dm=P7_IGMgetImageFit(tA,iM,vP,tD.igmFixedHeight);
	if(tD.p7opt[5]==8){
		tA.igmPZoptions=['igmPZ',2,2,2,2,15,1,1];
		P7_IGMpzPosition(cD,tA.igmPZoptions,vw,vh,tA.igmPreImage.width,tA.igmPreImage.height);
		iM.style.width=cD.p7finishWidth+'px';
		iM.style.height=cD.p7startHeight+'px';
		cD.style.top=cD.p7finishTop+'px';
	}
	else{
		cD.p7finishLeft=0;
		iM.style.width=dm[0]+'px';
		iM.style.height=dm[1]+'px';
		if(tD.igmFixedHeight){
			var cA=iM.parentNode;
			P7_IGMcenterElement(cA,cA.offsetWidth,cA.offsetHeight,vw,vh);
		}
	}
	P7_IGMswitchImgSource(dv,sn,bp,cD.id);
	cD.p7StartOpacity=1;
	cD.p7FinishOpacity=99;
	oV.p7StartOpacity=99;
	oV.p7FinishOpacity=1;
	if(cD.filters){
		cD.style.filter='alpha(opacity='+cD.p7StartOpacity+')';
		oV.style.filter='alpha(opacity='+oV.p7StartOpacity+')';
	}
	else{
		cD.style.opacity=cD.p7StartOpacity/100;
		oV.style.opacity=oV.p7StartOpacity/100;
	}
	cD.style.left=cD.p7finishLeft+'px';
	cD.style.display='block';
	cD.fadeFinished=function(cba){
		var tD=document.getElementById(this.igmDiv);
		var oV=document.getElementById(tD.id.replace('_','imagev_'));
		oV.style.left='-9000px';
		if(this.filters){
			this.style.filter='';
			oV.style.filter='';
		}
		else{
			this.style.opacity=1.0;
			oV.style.opacity=1.0;
		}
		P7_IGMdispD(this.igmDiv,cba[0],cba[1]);
	};
	cD.p7FadeStartTime=P7_IGMgetTime(0);
	cD.p7FadeDuration=tD.p7opt[6];
	cD.p7Type='linear';
	if( tD.p7opt[5]<1 || bp==1 || !p7IGMa ){
		cD.p7FadeDuration=1;
	}
cD.p7Fader=setInterval(function(){
	P7_IGMcrossFader(cD,oV,cD.fadeFinished,[sn,bp]);
}
,p7IGMdy);
}
function P7_IGMcrossFader(el,elo,cb,cba){
	var pi,po,m=false,elapsedTime=P7_IGMgetTime(el.p7FadeStartTime);
	if(elapsedTime>=el.p7FadeDuration){
		elapsedTime=el.p7FadeDuration;
		m=true;
	}
	pi=P7_IGMlinear(elapsedTime,el.p7StartOpacity,el.p7FinishOpacity-el.p7StartOpacity,el.p7FadeDuration);
	po=P7_IGMlinear(elapsedTime,elo.p7StartOpacity,elo.p7FinishOpacity-elo.p7StartOpacity,el.p7FadeDuration);
	if(el.filters){
		el.style.filter='alpha(opacity='+pi+')';
		elo.style.filter='alpha(opacity='+po+')';
	}
	else{
		el.style.opacity=pi/100;
		elo.style.opacity=po/100;
	}
	if(m){
		clearInterval(el.p7Fader);
		if(cb && typeof(cb) === "function"){
			cb.call(el,cba);
		}
	}
}
function P7_IGMgetTime(st){
	var d = new Date();
	return d.getTime() - st;
}
function P7_IGMmove(el,cb,cba){
	var i,ob,x,m=false;
	var elapsedTime=P7_IGMgetTime(el.p7StartTime);
	if(elapsedTime>=el.p7Duration){
		elapsedTime=el.p7Duration;
		m=true;
	}
	for(i=0;i<el.p7anim.length;i++){
		ob=(el.id==el.p7anim[i][0])?el:document.getElementById(el.p7anim[i][0]);
		if(el.p7anim[i][2]!=el.p7anim[i][3]){
			x=P7_IGManim(el.p7Type, elapsedTime, el.p7anim[i][2], el.p7anim[i][3]-el.p7anim[i][2], el.p7Duration);
			ob.style[el.p7anim[i][1]]=x+'px';
		}
	}
	if(m){
		clearInterval(el.p7Move);
		el.p7MoveRunning=false;
		if(cb && typeof(cb) === "function"){
			cb.call(el,cba);
		}
	}
}
function P7_IGMfade(el,st,fn,dur,cf,vs,cb,cba){
	if(el.p7Fader){
		clearInterval(el.p7Fader);
	}
	el.p7StartOpacity=st;
	el.p7FinishOpacity=fn;
	el.p7FadeStartTime=P7_IGMgetTime(0);
	el.p7FadeDuration=dur;
el.p7Fader=setInterval(function(){
	P7_IGMfader(el,cf,vs,cb,cba);
}
, p7IGMdy);
}
function P7_IGMfader(el,cf,vs,cb,cba){
	var tD,op,m=false;
	var elapsedTime=P7_IGMgetTime(el.p7FadeStartTime);
	if(elapsedTime>=el.p7FadeDuration){
		elapsedTime=el.p7FadeDuration;
		m=true;
	}
	op=P7_IGMlinear(elapsedTime,el.p7StartOpacity,el.p7FinishOpacity-el.p7StartOpacity,el.p7FadeDuration);
	if(el.filters){
		el.style.filter='alpha(opacity='+op+')';
	}
	else{
		el.style.opacity=op/100;
	}
	if(vs && el.style.visibility!='visible'){
		el.style.visibility='visible';
	}
	if(m){
		clearInterval(el.p7Fader);
		if(cf){
			if(el.filters){
				el.style.filter='';
			}
			else{
				if(el.p7FinishOpacity>98){
					el.style.opacity=1.0;
				}
			}
		}
		if(cb && typeof(cb) === "function"){
			cb.call(el,cba);
		}
	}
}
function P7_IGManimPreLoad(dv){
	var tD,lD,tA,iM;
	tD=document.getElementById(dv);
	lD=document.getElementById(dv.replace('_','loading_'));
	tA=tD.igmImages[tD.igmCurrentSlideNum];
	iM=document.p7igmpre[tA.igmPreIndex];
	if(iM.cmp){
		P7_IGManimInit(dv,true);
	}
	else{
		lD.style.display='block';
		setTimeout("P7_IGManimPreLoad('"+dv+"')",15);
	}
}
function P7_IGManimInit(dv,init){
	var i,tD,el,tA,iM,vP,cD,cW,lD,cvI,m=true,nh,nw,dm,cvs,ctx,imW,cI;
	tD=document.getElementById(dv);
	if(tD.igmCvsInit){
		return m;
	}
	lD=document.getElementById(dv.replace('_','loading_'));
	tA=tD.igmImages[tD.igmCurrentSlideNum];
	iM=tA.igmPreImage;
	if(!iM.cmp || iM.p7Status=='load_error'){
		return false;
	}
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	cW=document.getElementById(tD.id.replace('_','image_'));
	cI=document.getElementById(tD.id.replace('_','im_'));
	cvI=document.getElementById(tD.id.replace('_','imv_'));
	tD.igmViewportWidth=vP.offsetWidth;
	dm=P7_IGMgetImageFit(tA,cI,vP,tD.igmFixedHeight);
	nw=dm[0];
	nh=(tD.igmFixedHeight)?tD.p7opt[19]:dm[1];
	if(tD.igmCanvas){
		cvs=document.getElementById(tD.igmCanvas);
		ctx=cvs.getContext('2d');
		cvs.width=vP.offsetWidth;
		if(tD.p7opt[5]==7 || tD.p7opt[5]==8){
			cvs.height=nh;
		}
		else{
			if(tD.p7opt[19]>0){
				vP.style.height=nh+'px';
				vP.style.overflow='hidden';
			}
			else{
				cW.style.height=nh+'px';
				vP.style.height='auto';
			}
			nh=(tD.igmFixedHeight)?tD.p7opt[19]:2000;
			cvs.height=nh;
		}
		tD.igmInitImageWidth=iM.width;
		tD.igmInitImageHeight=iM.height;
		ctx.globalAlpha = 1;
		el=document.getElementById(tD.id.replace('_','im_'));
		el.style.display='none';
		tD.igmCurrentPZ='A';
	}
	else{
		dm=P7_IGMgetImageFit(tA,cI,vP,tD.igmFixedHeight);
		vP.style.height=nh+'px';
		cW.style.position='absolute';
		var im=[cI, cvI, tD.igmOVim1, tD.igmOVim2];
		for(i=0;i<im.length;i++){
			if(im[i]){
				im[i].style.maxWidth='none';
				im[i].style.maxHeight='none';
			}
		}
		if(tD.igmFixedHeight && tD.p7opt[5]!=8){
			dm=P7_IGMgetImageFit(tA,cI,vP,tD.igmFixedHeight);
			cW.style.width=vP.offsetWidth+'px';
			cI.style.width=dm[0]+'px';
			cI.style.height=dm[1]+'px';
			var cA=cI.parentNode;
			P7_IGMcenterElement(cA,cA.offsetWidth,cA.offsetHeight,vP.offsetWidth,vP.offsetHeight);
		}
		else{
			cI.style.width=dm[0]+'px';
			cI.style.height=dm[1]+'px';
		}
		tD.igmInitImageWidth=iM.width;
		tD.igmInitImageHeight=iM.height;
	}
	tD.igmCvsInit=true;
	if(init){
		P7_IGMinitB(dv);
	}
	return m;
}
function P7_IGMpzParseOptions(dv,sn){
	var i,tD,tA,rel,pz,r,defOpt='igmPZ-0-0-0-0-15-0-0';
	tD=document.getElementById(dv);
	tA=tD.igmImages[sn];
	rel=tA.getAttribute('rel');
	rel=(rel&&rel!==''&&rel.indexOf('igmPZ'===0))?rel:defOpt;
	pz=rel.split('-');
	if(!pz.length||pz.length!=8){
		rel=defOpt;
		pz=rel.split('-');
	}
	for(i=1;i<pz.length;i++){
		pz[i]=parseFloat([pz[i]]);
		if(i<=4 && (pz[i]<1 || pz[i]>3)){
			pz[i]=Math.floor((Math.random()*3)+1);
		}
		if(i==5){
			if(pz[i]<1 || pz[i]>100){
				pz[i]=15;
			}
		}
	}
	if(pz[6]===0){
		r=Math.floor((Math.random()*2)+1);
		pz[6]=(r==1)?1.1:1.6;
	}
	if(pz[7]===0){
		pz[7]=(r==1)?1.6:1.1;
	}
	tA.igmPZoptions=pz;
}
function P7_IGMpzPosition(el,pz,vw,vh,iw,ih){
	var dm,bw,bh,sw,sh,fw,fh,st,sl,ft,fl;
	dm=P7_IGMfitRect(iw,ih,0,vw,vh);
	bw=dm[0];
	bh=dm[1];
	dm=P7_IGMfitRect(bw,bh,pz[6],vw,vh);
	sw=dm[0];
	sh=dm[1];
	dm=P7_IGMfitRect(bw,bh,pz[7],vw,vh);
	fw=dm[0];
	fh=dm[1];
	st=0;
	if(pz[1]==2){
		st=(vh-sh)/2;
	}
	else if (pz[1]==3){
		st=vh-sh;
	}
	sl=0;
	if(pz[2]==2){
		sl=(vw-sw)/2;
	}
	else if (pz[2]==3){
		sl=vw-sw;
	}
	ft=0;
	if(pz[3]==2){
		ft=(vh-fh)/2;
	}
	else if (pz[3]==3){
		ft=vh-fh;
	}
	fl=0;
	if(pz[4]==2){
		fl=(vw-fw)/2;
	}
	else if (pz[4]==3){
		fl=vw-fw;
	}
	el.p7startWidth = sw;
	el.p7currentWidth = sw;
	el.p7startHeight = el.p7currentHeight = sh;
	el.p7finishWidth=fw;
	el.p7finishHeight=fh;
	el.p7startLeft = el.p7currentLeft = sl;
	el.p7startTop = el.p7currentTop = st;
	el.p7finishLeft=fl;
	el.p7finishTop=ft;
}
function P7_IGMpzSetCvs(dv,sn,bp){
	var tD,tA,iM,cD,pD,vP,ci,cvs,ctx,pz,vw,vh,iw,ih,cb,tp,dy,ps;
	tD=document.getElementById(dv);
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	tA=tD.igmImages[sn];
	iM=tA.igmPreImage;
	if(tD.igmCurrentPZ=='A'){
		cD=document.getElementById(tD.id.replace('_','imagev_'));
		pD=document.getElementById(tD.id.replace('_','image_'));
		tD.igmCurrentPZ='B';
	}
	else{
		cD=document.getElementById(tD.id.replace('_','image_'));
		pD=document.getElementById(tD.id.replace('_','imagev_'));
		tD.igmCurrentPZ='A';
	}
	cD.igmPrevDiv=pD.id;
	pD.igmPrevDiv=cD.id;
	cD.igmCurrentImage=iM;
	cD.igmPrevImage=pD.igmCurrentImage;
	dy=p7IGMdy;
	P7_IGMpzParseOptions(dv,sn);
	pz=tA.igmPZoptions;
	cvs=document.getElementById(tD.igmCanvas);
	ctx=cvs.getContext('2d');
	vw=cvs.width;
	vh=cvs.height;
	iw=tA.igmPreImage.width;
	ih=tA.igmPreImage.height;
	vP.igmViewportWidth=vw;
	ps=P7_IGMpzPosition(cD,pz,vw,vh,iw,ih);
	cD.p7Duration=parseInt((pz[5]*1000)/dy,10);
	cD.p7Time=0;
	cD.igmCanvas=tD.igmCanvas;
	cD.igmDiv=tD.id;
	cD.igmbp=bp;
	cD.p7callback=false;
	if(pD.p7PanZoomRunning){
		clearInterval(pD.p7PanZoom);
		pD.p7PanZoomRunning=false;
	}
	tD.igmPanZoomDiv=cD.id;
	tD.igmPanZoomResume=false;
	if(!cD.p7PanZoomRunning){
		cD.p7PanZoomRunning=true;
		cb=false;
		tp='linear';
		cD.igmFadeTime=0;
		cD.igmFadeBegin=0;
		cD.igmFadeFinish=100;
		cD.igmFadeDuration=500/dy;
		cD.p7PanZoom=setInterval("P7_IGMpzAnimCvs('"+cD.id+"',"+cb+",'"+tp+"')",dy);
	}
}
function P7_IGMpzAnimCvs(dv,cb,tp){
	var el,nl,nt,nw,nh,im,cvs,ctx,iM,obOut,imOut,pi,po;
	el=document.getElementById(dv);
	iM=el.igmCurrentImage;
	cvs=document.getElementById(el.igmCanvas);
	ctx=cvs.getContext('2d');
	if(el.igmFadeTime<el.igmFadeDuration){
		el.igmFadeTime++;
		obOut=document.getElementById(el.igmPrevDiv);
		if(obOut&&obOut.igmCurrentImage){
			imOut=obOut.igmCurrentImage;
		}
		pi=P7_IGMlinear(el.igmFadeTime,el.igmFadeBegin,el.igmFadeFinish-el.igmFadeBegin,el.igmFadeDuration);
		po=el.igmFadeFinish-pi;
		if(imOut){
			ctx.globalAlpha= po/100;
			ctx.drawImage(imOut, obOut.p7currentLeft, obOut.p7currentTop, obOut.p7currentWidth ,obOut.p7currentHeight);
		}
		ctx.globalAlpha= pi/100;
		if(el.igmFadeTime>=el.igmFadeDuration){
			ctx.globalAlpha=1;
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.drawImage(iM, el.p7currentLeft, el.p7currentTop, el.p7currentWidth, el.p7currentHeight);
		}
	}
	if(el.p7Time<el.p7Duration){
		el.p7Time++;
		nt=P7_IGManim(tp,el.p7Time,el.p7startTop,el.p7finishTop-el.p7startTop,el.p7Duration);
		nl=P7_IGManim(tp,el.p7Time,el.p7startLeft,el.p7finishLeft-el.p7startLeft,el.p7Duration);
		nw=P7_IGManim(tp,el.p7Time,el.p7startWidth,el.p7finishWidth-el.p7startWidth,el.p7Duration);
		nh=P7_IGManim(tp,el.p7Time,el.p7startHeight,el.p7finishHeight-el.p7startHeight,el.p7Duration);
		el.p7currentLeft=nl;
		el.p7currentTop=nt;
		el.p7currentWidth=nw;
		el.p7currentHeight=nh;
		ctx.drawImage(iM,nl,nt,nw,nh);
	}
	else{
		clearInterval(el.p7CvsAnim);
		el.p7CvsAnimRunning=false;
		el.igmPanZoomResume=false;
		if(cb && el.p7callback && typeof(el.p7callback) === "function"){
			el.p7callback('panzoom');
		}
	}
}
function P7_IGMpzSet(dv,sn,bp){
	var tD,vP,tA,iM,cD,pD,vw,vh,iw,ih,pz,ps;
	tD=document.getElementById(dv);
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	tA=tD.igmImages[sn];
	iM=tA.igmPreImage;
	if(tD.igmCurrentPZ=='A'){
		cD=document.getElementById(tD.id.replace('_','imagev_'));
		pD=document.getElementById(tD.id.replace('_','image_'));
		tD.igmCurrentPZ='B';
	}
	else{
		cD=document.getElementById(tD.id.replace('_','image_'));
		pD=document.getElementById(tD.id.replace('_','imagev_'));
		tD.igmCurrentPZ='A';
	}
	cD.igmPrevDiv=pD.id;
	pD.igmPrevDiv=cD.id;
	cD.igmCurrentImage=iM;
	cD.igmPrevImage=pD.igmCurrentImage;
	P7_IGMpzParseOptions(dv,sn);
	pz=tA.igmPZoptions;
	cD.style.visibility='hidden';
	cD.style.top='-5000px';
	cD.style.left='-5000px';
	cD.style.display='block';
	cD.style.width='auto';
	cD.style.height='auto';
	iM=cD.getElementsByTagName('IMG')[0];
	cD.style.zIndex=5;
	pD.style.zIndex=4;
	P7_IGMswitchImgSource(dv,sn,bp,cD.id);
	vw=vP.offsetWidth;
	vh=vP.offsetHeight;
	vP.igmViewportWidth=vw;
	iw=tA.igmPreImage.width;
	ih=tA.igmPreImage.height;
	ps=P7_IGMpzPosition(cD,pz,vw,vh,iw,ih);
	iM.style.width='100%';
	iM.style.height='auto';
	cD.fadeFinished=function(cba){
		var pD=document.getElementById(cba);
		pD.style.left='-5000px';
		pD.style.top='-5000px';
		pD.style.visibility='hidden';
	};
	if(pD.p7PanZoomRunning){
		clearInterval(pD.p7PanZoom);
		pD.p7PanZoomRunning=false;
	}
	P7_IGMfade(cD,1,99,300,true,true,cD.fadeFinished,pD.id);
	if(!cD.p7PanZoomRunning){
		cD.p7PanZoomRunning=true;
		cD.p7StartTime=P7_IGMgetTime(0);
		cD.p7Duration=pz[5]*1000;
cD.p7PanZoom=setInterval(function(){
	P7_IGMpzAnim(cD.id,'linear',false,null);
}
,p7IGMdy);
}
}
function P7_IGMpzAnim(dv,tp,cb,cba){
	var el,nl,nt,nw,nh,m=false;
	el=document.getElementById(dv);
	var elapsedTime=P7_IGMgetTime(el.p7StartTime);
	if(elapsedTime>=el.p7Duration){
		elapsedTime=el.p7Duration;
		m=true;
	}
	nt=P7_IGManim(tp,elapsedTime,el.p7startTop,el.p7finishTop-el.p7startTop,el.p7Duration);
	nl=P7_IGManim(tp,elapsedTime,el.p7startLeft,el.p7finishLeft-el.p7startLeft,el.p7Duration);
	nw=P7_IGManim(tp,elapsedTime,el.p7startWidth,el.p7finishWidth-el.p7startWidth,el.p7Duration);
	el.style.left=Math.round(nl)+'px';
	el.style.top=Math.round(nt)+'px';
	el.style.width=Math.round(nw)+'px';
	el.style.left=nl+'px';
	el.style.top=nt+'px';
	el.style.width=nw+'px';
	if(m){
		clearInterval(el.p7PanZoom);
		el.p7PanZoomRunning=false;
		el.igmPanZoomResume=false;
		if(cb && typeof(cb) === "function"){
			cb.call(el,cba);
		}
	}
}
function P7_IGMrsz(bp){
	var i,tD,cW,cvs,cw,ch,nw,nh,pc,dy=(bp==1)?10:300;
	for(i=0;i<p7IGMctl.length;i++){
		tD=document.getElementById(p7IGMctl[i][0]);
		if(tD){
			cW=document.getElementById(tD.id.replace('_','imgwrapper_'));
			nw=cW.offsetWidth;
			tD.igmViewportWidth=nw;
			if(tD.igmShowTimer){
				clearTimeout(tD.igmShowTimer);
			}
			P7_IGMreFresh(tD,nw);
		}
	}
}
function P7_IGMreFresh(tD,nw){
	var nh,ch,cvs,vP,cW;
	if(tD.igmFullScreen){
		tD.p7opt[19]=tD.offsetHeight - tD.igmFullScreenChromeHeight;
	}
	vP=document.getElementById(tD.id.replace('_','imgwrapper_'));
	cW=document.getElementById(tD.id.replace('_','image_'));
	if(tD.igmCanvas){
		cvs=document.getElementById(tD.id.replace('_','cvs_'));
		if(tD.p7opt[19]>0){
			nh=tD.p7opt[19];
			vP.style.height=tD.p7opt[19]+'px';
			cW.style.height='auto';
		}
		else{
			if(tD.p7opt[5]==7 || tD.p7opt[5]==8 ){
				nh=P7_IGMfitImg(tD.igmInitImageWidth,tD.igmInitImageHeight,nw)[1];
				cW.style.height='auto';
			}
			else{
				nh=2000;
				cW.style.height=nh+'px';
			}
			vP.style.height='auto';
		}
		cvs.width=nw;
		cvs.height=nh;
	}
	else if(tD.igmFullScreen || tD.p7opt[19]>0){
		if(tD.p7opt && tD.p7opt[19]){
			vP.style.height=tD.p7opt[19]+'px';
		}
	}
	else if(tD.p7opt){
		if(tD.p7opt[5]==7 || tD.p7opt[5]==8 ){
			nh=P7_IGMfitImg(tD.igmInitImageWidth,tD.igmInitImageHeight,nw)[1];
			vP.style.height=nh+'px';
		}
	}
	P7_IGMcontrol(tD.id, tD.igmCurrentSlideNum, 1);
	if(tD.igmShowMode=='play'){
		if(tD.igmShowTimer){
			clearTimeout(tD.igmShowTimer);
		}
		tD.igmShowTimer=setTimeout(
function(){
	P7_IGMcontrol(tD.id,'next',2);
}
, tD.p7opt[15]);
}
}
function P7_IGMkey(evt){
	var tD,tg,nn,k,ac,m=true;
	evt=(evt)?evt:event;
	tg=(evt.target)?evt.target:evt.srcElement;
	nn=tg.nodeName.toLowerCase();
	if(!evt.altKey&&!evt.ctrlKey){
		if(nn!='input'&&nn!='textarea'){
			k=evt.keyCode;
			if(p7IGMfsd){
				if(k==27 || (k==88&&typeof(opera)!='object')){
					P7_IGMfullScreen(p7IGMfsd,'normal');
					m=false;
				}
				else if(k==33||k==37||k==109 || k==32&&evt.shiftKey){
					P7_IGMcontrol(p7IGMfsd,'prev');
					m=false;
				}
				else if(k==34||k==39||k==107||k==32){
					P7_IGMcontrol(p7IGMfsd,'next');
					m=false;
				}
				else if(k==35){
					P7_IGMcontrol(p7IGMfsd,'last');
					m=false;
				}
				else if(k==36){
					P7_IGMcontrol(p7IGMfsd,'first');
					m=false;
				}
				else if(k==80){
					tD=document.getElementById(p7IGMfsd);
					if(tD&&tD.igmShowMode){
						ac=(tD.igmShowMode=='play')?'pause':'play';
						P7_IGMcontrol(p7IGMfsd,ac);
						m=false;
					}
				}
			}
		}
	}
	if(!m){
		if(evt.preventDefault){
			evt.preventDefault();
		}
	}
	return m;
}
var p7IGMtch={
	el: null,
	fCnt: 0,
	startX: 0,
	startY: 0,
	curX: 0,
	curY: 0
};
function P7_IGMtchStart(evt){
	if(evt.pointerType){
		p7IGMtch.fCnt=1;
		p7IGMtch.startX=evt.clientX;
		p7IGMtch.startY=evt.clientY;
		p7IGMtch.el=this;
	}
	else if(evt.touches.length==1){
		p7IGMtch.fCnt=evt.touches.length;
		p7IGMtch.startX=evt.touches[0].pageX;
		p7IGMtch.startY=evt.touches[0].pageY;
		p7IGMtch.el=this;
	}
	else{
		P7_IGMtchCancel(evt);
	}
}
function P7_IGMtchMove(evt){
	if(evt.pointerType){
		p7IGMtch.curX=evt.clientX;
		p7IGMtch.curY=evt.clientY;
	}
	else if(evt.touches.length==1){
		p7IGMtch.curX=evt.touches[0].pageX;
		p7IGMtch.curY=evt.touches[0].pageY;
	}
	else{
		P7_IGMtchCancel(evt);
	}
}
function P7_IGMtchEnd(evt){
	var swl,swa,swd,x,y,z,r;
	if(p7IGMtch.fCnt==1 && p7IGMtch.curX!==0){
		evt.preventDefault();
		swl=Math.round(Math.sqrt(Math.pow(p7IGMtch.curX - p7IGMtch.startX,2) + Math.pow(p7IGMtch.curY - p7IGMtch.startY,2)));
		if(swl>=72){
			x=p7IGMtch.startX-p7IGMtch.curX;
			y=p7IGMtch.curY-p7IGMtch.startY;
			r=Math.atan2(y,x);
			swa=Math.round(r*180/Math.PI);
			if(swa<0){
				swa=360-Math.abs(swa);
			}
			if((swa<=45)&&(swa>=0)){
				swd='left';
			}
			else if((swa<=360)&&(swa>=315)){
				swd='left';
			}
			else if((swa>=135)&&(swa<=225)){
				swd='right';
			}
			else if((swa>45)&&(swa<135)){
				swd='down';
			}
			else{
				swd='up';
			}
			p7IGMtch.el.onSwiped(swd);
			P7_IGMtchCancel(evt);
		}
		else{
			P7_IGMtchCancel(evt);
		}
	}
	else{
		P7_IGMtchCancel(evt);
	}
}
function P7_IGMtchCancel(evt){
	p7IGMtch.fCnt=0;
	p7IGMtch.startX=0;
	p7IGMtch.startY=0;
	p7IGMtch.curX=0;
	p7IGMtch.curY=0;
}
function P7_IGMbindSwipe(ob,fn){
	ob.onSwiped=fn;
	if(navigator.msMaxTouchPoints){
		ob.addEventListener('pointerdown',P7_IGMtchStart,false);
		ob.addEventListener('pointerup',P7_IGMtchEnd,false);
		ob.addEventListener('pointermove',P7_IGMtchMove,false);
		ob.setAttribute('style','touch-action: none;');
	}
	else{
		ob.addEventListener('touchstart',P7_IGMtchStart,false);
		ob.addEventListener('touchend',P7_IGMtchEnd,false);
		ob.addEventListener('touchmove',P7_IGMtchMove,false);
		ob.addEventListener('touchcancel',P7_IGMtchCancel,false);
	}
}
function P7_IGManim(tp,t,b,c,d){
	if(tp=='linear'){
		return (c*(t/d))+b;
	}
	else if(tp=='quad'){
		if((t/=d/2)<1){
			return c/2*t*t+b;
		}
		else{
			return -c/2*((--t)*(t-2)-1)+b;
		}
	}
	else if(tp=='inquad'){
		var tt=t/d;
		return c * (tt)*(tt) + b;
	}
}
function P7_IGMlinear(t,b,c,d){
	return (c*(t/d))+b;
}
function P7_IGMInOutQuad(t,b,c,d){
	if((t/=d/2)<1){
		return c/2*t*t+b;
	}
	else{
		return -c/2*((--t)*(t-2)-1)+b;
	}
}
function P7_IGMresetWidth(dd,li,n){
	dd.style.width=(n*600)+'px';
	dd.style.width=(li.offsetLeft+li.offsetWidth+1000)+'px';
}
function P7_IGMresetOffsets(ob){
	if(ob.scrollLeft !== 0){
		ob.scrollLeft=0;
	}
	if(ob.scrollTop !== 0){
		ob.scrollTop=0;
	}
}
function P7_IGMgetIEver(){
	var j,v=-1,nv,m=false;
	nv=navigator.userAgent.toLowerCase();
	j=nv.indexOf("msie");
	if(j>-1){
		v=parseFloat(nv.substring(j+4,j+8));
		if(document.documentMode){
			v=document.documentMode;
		}
	}
	return v;
}
function P7_IGMsetClass(ob,cl){
	if(ob){
		var cc,nc,r=/\s+/g;
		cc=ob.className;
		nc=cl;
		if(cc&&cc.length>0){
			if(cc.indexOf(cl)==-1){
				nc=cc+' '+cl;
			}
			else{
				nc=cc;
			}
		}
		nc=nc.replace(r,' ');
		ob.className=nc;
	}
}
function P7_IGMremClass(ob,cl){
	if(ob){
		var cc,nc;
		cc=ob.className;
		if(cc&&cc.indexOf(cl>-1)){
			nc=cc.replace(cl,'');
			nc=nc.replace(/\s+/g,' ');
			nc=nc.replace(/\s$/,'');
			nc=nc.replace(/^\s/,'');
			ob.className=nc;
		}
	}
}
function P7_IGMimageClick(a){
	var wH,m=false;
	wH=window.location.href;
	if(a.href!=wH&&a.href!=wH+'#'){
		if(a.href.search(/javas/i)!==0){
		}
	}
	return m;
}
function P7_IGMpenWin(a){
	if(a&&a.href){
		window.open(a.href,'igmwin');
	}
	return false;
}
function P7_IGMcopyCN(tD,tS){
	while(tD.childNodes.length>0){
		tD.removeChild(tD.childNodes[0]);
	}
	while(tS.childNodes.length>0){
		tD.appendChild(tS.childNodes[0]);
	}
}
function P7_IGMsetCC(dd,rp,ac){
	var d,tC;
	d=dd.replace('_',rp);
	tC=document.getElementById(d);
	if(tC){
		tC.onclick=function(){
			return P7_IGMcontrol(dd,ac);
		};
	}
	return tC;
}
function P7_IGMurl(dv){
	var i,h,s,x,d='igm',pn,n=dv.replace("p7IGM_","");
	h=document.location.search;
	if(h){
		h=h.replace('?','');
		s=h.split(/[=&]/g);
		if(s&&s.length){
			for(i=0;i<s.length;i+=2){
				if(s[i]==d){
					x=s[i+1];
					if(n!=x.charAt(0)){
						x=false;
					}
					if(x&&x.length>2){
						P7_IGMcontrol(dv,P7_IGMparsePN(x),1);
					}
				}
			}
		}
	}
	h=document.location.hash;
	if(h){
		x=h.substring(1,h.length);
		if(n!=x.charAt(3)){
			x=false;
		}
		if(x&&x.indexOf(d)===0&&x.length>5){
			P7_IGMcontrol(dv,P7_IGMparsePN(x),1);
		}
	}
}
function P7_IGMparsePN(d){
	var x=d.lastIndexOf('_');
	return parseInt(d.substr(x+1),10);
}
function P7_IGMrandomize(){
	return 0.5-Math.random();
}
function P7_IGMrandomizer(dv){
	var i=0,k=0,tD,tV,tU,tA,cN,sR,cD,ob,iM,imT,tt,cl,tI=[],cn;
	tD=document.getElementById(dv);
	tV=document.getElementById(tD.id.replace('_','tvp_'));
	tU=tV.getElementsByTagName('UL')[0];
	if(tU){
		cn=tU.childNodes;
		for(i=0;i<cn.length;i++){
			tI[i]=cn[i];
		}
		tI.sort(P7_IGMrandomize);
		while(k<tI.length){
			tU.appendChild(tI[k]);
			k++;
		}
		tA=tU.getElementsByTagName('A')[0];
		iM=document.getElementById(tD.id.replace('_','im_'));
		iM.src=tA.href;
		cD=document.getElementById(tD.id.replace('_','caption_'));
		if(cD){
			tt=tA.getAttribute('title');
			iM.setAttribute('alt',tt);
			ob=document.createTextNode(tt);
			if(cD.hasChildNodes){
				for(i=0;i<cD.childNodes.length;i++){
					cD.removeChild(cD.childNodes[i]);
				}
			}
			if(ob){
				cD.appendChild(ob);
			}
		}
		cD=document.getElementById(tD.id.replace('_','desc_'));
		cN=tA.parentNode.childNodes;
		for(i=0;i<cN.length;i++){
			if(cN[i].nodeType==1){
				cl=cN[i].className;
				if(cl&&cl=='p7igm_description'){
					sR=cN[i];
					break;
				}
			}
		}
		if(sR){
			P7_IGMcopyCN(cD,sR);
			cD.p7src=sR;
		}
	}
}
function P7_IGMfitRect(nw,nh,zm,vw,vh){
	var dW,dH,fw=0,fh=0;
	fw=nw*zm;
	fh=nh*zm;
	dW=vw-fw;
	dH=vh-fh;
	if(dW>0 || dH>0){
		if(dW>=dH){
			fw=vw;
			fh=fw*(nh/nw);
		}
		else{
			fh=vh;
			fw=fh*(nw/nh);
		}
	}
	return [fw,fh];
}
function P7_IGMfitImg(iw,ih,vw,vh,fvp){
	var nw=iw,nh=ih;
	if(vw<0 || vh<0){
		return [iw, ih];
	}
	if(fvp){
		if(ih>=vh){
			nh=vh;
			nw=nh*(iw/ih);
			if(nw>vw){
				nw=vw;
				nh=nw*(ih/iw);
			}
		}
		else if (iw>vw){
			nw=vw;
			nh=nw*(ih/iw);
			if(nh>vh){
				nh=vh;
				nw=nh*(iw/ih);
			}
		}
	}
	else{
		nw=vw;
		nh=nw*(ih/iw);
	}
	return [nw,nh];
}
function P7_IGMgetImageFit(tA,iM,vP,fh){
	var aw,ah,bl,bt,dm;
	aw=(iM.offsetLeft*2)+(iM.offsetWidth-iM.width);
	ah=(iM.offsetTop*2)+(iM.offsetHeight-iM.height);
	bl=parseInt(P7_IGMgetStyle(iM.parentNode,'borderLeftWidth','border-left-width'),10);
	aw=(bl)?aw+(bl*2):aw;
	bt=parseInt(P7_IGMgetStyle(iM.parentNode,'borderTopWidth','border-top-width'),10);
	ah=(bt)?ah+(bt*2):ah;
	dm=P7_IGMfitImg(tA.igmPreImage.width,tA.igmPreImage.height,vP.offsetWidth-aw,vP.offsetHeight-ah,fh);
	return dm;
}
function P7_IGMcenterImage(iM,iw,ih,vw,vh){
	var mL,mT;
	mL=(vw-iw)/2;
	mT=(vh-ih)/2;
	iM.style.marginLeft=mL+'px';
	iM.style.marginTop=mT+'px';
}
function P7_IGMcenterElement(el,w,h,vw,vh){
	var mL,mT;
	mL=(vw-w)/2;
	mT=(vh-h)/2;
	el.style.left=mL+'px';
	el.style.top=mT+'px';
}
function P7_IGMgetStyle(el,s1,s2){
	var s='';
	if(el.currentStyle){
		s=el.currentStyle[s1];
	}
	else{
		s=document.defaultView.getComputedStyle(el,"").getPropertyValue(s2);
	}
	return s;
}
function P7_IGMgetWinDims(){
	var h,w,st;
	if(document.documentElement&&document.documentElement.clientHeight){
		w=document.documentElement.clientWidth;
		h=document.documentElement.clientHeight;
	}
	else if(window.innerHeight){
		if(document.documentElement.clientWidth){
			w=document.documentElement.clientWidth;
		}
		else{
			w=window.innerWidth;
		}
		h=window.innerHeight;
	}
	else if(document.body){
		w=document.body.clientWidth;
		h=document.body.clientHeight;
	}
	return [h,w];
}
function P7_IGMgoBack(){
	window.history.back();
	return false;
}
function P7_IGMtblfix(ob){
	var pp,sc,vp,tB,h,hh,ie,el,m=false;
	ie=P7_IGMgetIEver();
	pp=ob.parentNode;
	while(pp){
		if(pp.nodeName){
			if(pp.nodeName=='TD'||pp.nodeName=='TABLE'){
				m=true;
				break;
			}
			if(pp.nodeName=='BODY'){
				break;
			}
		}
		pp=pp.parentNode;
	}
	if(m || (ie>4&&ie<7)){
		el=document.getElementById(ob.id.replace('_','thumbs_'));
		if(el){
			el.style.display='none';
		}
		h=ob.offsetWidth;
		ob.style.width=h+'px';
		hh=ob.offsetWidth;
		ob.style.width=(h+(h-hh))+'px';
		if(el){
			el.style.display='block';
		}
	}
}
