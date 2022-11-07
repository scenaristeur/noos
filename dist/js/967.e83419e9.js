"use strict";(self["webpackChunknoos"]=self["webpackChunknoos"]||[]).push([[967],{6967:function(t,e,s){s.r(e),s.d(e,{default:function(){return R}});var i=function(){var t=this,e=t._self._c;return e("CurvedBottomNavigation",{ref:"nav",attrs:{options:t.options,"foreground-color":"#42A5F5","badge-color":"#FBC02D","background-color":"#8FF0A4","icon-color":"#0000008A"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})},l=[],n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"btn-container_foreground",style:t.cssVariables},[e("div",{staticClass:"btn-container"},[t._l(t.localOptions,(function(s,i){return e("div",{key:`label-${i}`,class:{[`btn-item-${i} labels`]:!0,["checked"]:s.isActive,["unchecked"]:!s.isActive},on:{click:function(e){return t.handleLabelClick(s)}}},[e("div",{staticClass:"active-label"},[s.badge?e("div",{staticClass:"btn-badge"},[t._v(" "+t._s(s.badge)+" ")]):t._e(),t._t("icon",(function(){return[e("i",{class:`${s.icon}`})]}),{props:s})],2),e("div",{staticClass:"btn-title"},[t._t("title",(function(){return[t._v(" "+t._s(s.title)+" ")]}),{props:s})],2),t.hasChild(s)?e("div",{class:{["btn-super-parent"]:s.isActive,["btn-class-showable"]:t.showable}},[e("div",{staticClass:"btn-child-parent"},t._l(s.childs||[],(function(s,i){return e("div",{key:i,staticClass:"btn-child",on:{click:function(e){return e.stopPropagation(),t.handleChildClick(s)}}},[t._t("child-icon",(function(){return[e("i",{class:`${s.icon}`})]}),{props:s}),e("span",{staticClass:"btn-child-title"},[t._t("child-title",(function(){return[t._v(" "+t._s(s.title)+" ")]}),{props:s})],2),s.badge?e("div",{staticClass:"btn-child-badge"},[t._v(" "+t._s(s.badge)+" ")]):t._e()],2)})),0)]):t._e()])})),e("div",{directives:[{name:"show",rawName:"v-show",value:t.hasActiveClass,expression:"hasActiveClass"}],attrs:{id:"sweep"}},[e("div",{attrs:{id:"sweep-right"}}),e("div",{attrs:{id:"sweep-center"}}),e("div",{attrs:{id:"sweep-left"}})])],2)])},o=[],a=(s(7658),{name:"VueBottomNavigation",model:{prop:"value",event:"update"},props:{value:{default:null},options:{type:Array,default:()=>[]},foregroundColor:{type:String,default:"#42A5F5"},backgroundColor:{type:String,default:"#FFFFFF"},iconColor:{type:String,default:"#0000008A"},badgeColor:{type:String,default:"#FBC02D"},replaceRoute:{type:Boolean,default:!1}},data:()=>({localOptions:[],showable:!1,enableWatch:!0}),computed:{cssVariables(){const t=((this.localOptions.find((t=>t.isActive))||{}).childs||[]).length,e={"--color-foreground":this.foregroundColor,"--color-background":this.backgroundColor,"--color-icon":this.iconColor,"--color-badge":this.badgeColor,"--width-parent":45*t+"px"};return e},hasActiveClass(){return this.localOptions.some((t=>t.isActive))}},watch:{options:{deep:!0,handler(t){t&&(this.localOptions=t.map((t=>({...t,isActive:this.isActive(t)}))),this.cssLoader())}},value:{handler(t,e){if(t!=e&&this.enableWatch){const e=[];this.localOptions.forEach((t=>{t.childs&&e.push(...t.childs)}));const s=[...this.localOptions,...e].find((e=>e.id==t));s&&this.updateValue(s,this.hasChild(s))}}}},created(){this.localOptions=this.options.map((t=>({...t,isActive:this.isActive(t)})))},mounted(){this.cssLoader(),window.addEventListener("resize",this.onResize)},beforeDestroy(){window.removeEventListener("resize",this.onResize)},methods:{cssLoader(){let t="";const e=document.querySelector(".btn-container").offsetWidth||window.innerWidth;this.options.forEach(((s,i)=>{0===i&&this.hasChild(s)&&(t+=`\n          .btn-item-${i}.checked .btn-class-showable .btn-child-parent {\n            transform: translateX(${45*s.childs.length/2-35}px);\n            transition: transform 500ms ease 300ms;\n          }\n          `),i===this.options.length-1&&this.hasChild(s)&&(t+=`\n          .btn-item-${i}.checked .btn-class-showable .btn-child-parent {\n            transform: translateX(-${45*s.childs.length/2-35}px);\n            transition: transform 500ms ease 300ms;\n          }\n          `),t+=`\n        .btn-item-${i} {\n          padding: 10px;\n          transition: transform 100ms ease;\n          width : ${e/this.options.length}px !important;\n          display: flex;\n          justify-content :center;\n          align-items : center;\n          position: relative;\n          z-index: 10;\n        }\n\n        .btn-item-${i}.checked ~ #sweep {\n          transform: translateX(${i*e/this.options.length+e/this.options.length/4}px);\n          transition: transform 500ms ease;\n        }\n        `,this.hasChild(s)&&s.childs.forEach(((e,l)=>{t+=`\n            .btn-item-${i}.checked .btn-class-showable .btn-child:nth-child(${l+1}) {\n              transform: translateX(${45*(.5+l)-45*s.childs.length/2}px);\n              transition: transform 500ms ease 300ms;\n            }\n          `}))})),document.getElementById("sweep").style.left=`\n      ${e/this.options.length/4-67.5}px`;const s=document.getElementsByTagName("head")[0],i=document.createElement("style");i.id="bottom-navigation-style",i.styleSheet?i.styleSheet.cssText=t:i.appendChild(document.createTextNode(t)),s.appendChild(i)},handleLabelClick(t){this.showable&&!t.isActive||this.toggleClass(),this.updateValue(t,this.hasChild(t))},handleChildClick(t){this.updateValue(t),this.toggleClass()},updateValue(t,e=!1){this.localOptions.forEach((e=>e.isActive=this.isActive(e,t.id))),e||(this.$emit("update",t.id),this.enableWatch=!1,setTimeout((()=>{this.enableWatch=!0}),0),t.path&&Object.keys(t.path).length&&(this.replaceRoute?this.$router.replace(t.path).catch((()=>{})):this.$router.push(t.path)))},toggleClass(){this.showable=!this.showable},isActive(t,e=this.value){return t.id==e||(t.childs||[]).find((t=>t.id==e))},onResize(){this.$nextTick((()=>{const t=document.getElementById("bottom-navigation-style");t&&t.remove()})),this.cssLoader()},hasChild(t){return(t.childs||[]).length}}}),c=a,r=s(1001),d=(0,r.Z)(c,n,o,!1,null,"783bcbd1",null),h=d.exports,p=function(){var t=this,e=t._self._c;return e("div",{staticClass:"gr-btn-container-foreground",style:t.cssVariables},t._l(t.localOptions,(function(s,i){return e("div",{key:`grow-button-${i}`,class:["gr-btn-container",{"gr-btn-container-active":s.selected}],on:{click:function(e){return t.handleButtonClick(s,i)}}},[e("div",{class:["gr-btn-item",{"gr-btn-item-active":s.selected}]},[e("div",{class:["gr-btn-icon",{"gr-btn-icon-active":s.selected}]},[t._t("icon",(function(){return[e("i",{class:`${s.icon}`})]}),{props:s})],2),e("div",{staticClass:"gr-btn-title"},[e("span",{staticClass:"gr-hidden-title"},[t._t("title",(function(){return[t._v(" "+t._s(s.title)+" ")]}),{props:s})],2),e("span",{class:["gr-animated-title",{"gr-animated-title-active":s.selected}]},[t._t("title",(function(){return[t._v(" "+t._s(s.title)+" ")]}),{props:s})],2)])])])})),0)},u=[],b={model:{prop:"value",event:"update"},props:{value:{default:null},options:{type:Array,default:()=>[]},color:{type:String,default:"#74cbbb"},replaceRoute:{type:Boolean,default:!1}},data:()=>({prevSelected:null,currSelected:null,localOptions:[],enableWatch:!0}),computed:{cssVariables(){const t=(this.localOptions[this.currSelected]||{}).title;let e=95;t&&15*t.length>110&&(e=95+(15*t.length-110)/2);const s=(this.localOptions[this.currSelected]||{}).color||this.color,i={"--color":s,"--color-background":s+"30","--active-width":`${e}px`};return i}},watch:{value:{handler(t,e){if(t!=e&&this.enableWatch){const e=this.localOptions.findIndex((e=>e.id==t));e>-1&&this.handleButtonClick(this.localOptions[e],e)}}}},created(){this.localOptions=this.options.slice();const t=this.localOptions.findIndex((t=>t.id==this.value||(t.path||{}).name==(this.$route||{}).name));t>-1&&(this.currSelected=t,this.prevSelected=t,"$set"in this?this.$set(this.localOptions,t,{...this.localOptions[t],selected:!0}):this.localOptions[t].selected=!0)},methods:{handleButtonClick(t,e){this.currSelected=e,null!==this.prevSelected&&(this.localOptions[this.prevSelected].selected=!1),"$set"in this?this.$set(this.localOptions,e,{...this.localOptions[e],selected:!0}):this.localOptions[e].selected=!0,this.prevSelected=this.currSelected,this.updateValue(t)},updateValue(t){this.$emit("update",t.id),this.enableWatch=!1,setTimeout((()=>{this.enableWatch=!0}),0),t.path&&Object.keys(t.path).length&&(this.replaceRoute?this.$router.replace(t.path).catch((()=>{})):this.$router.push(t.path))}}},v=b,f=(0,r.Z)(v,p,u,!1,null,"06666efa",null),g=(f.exports,function(){var t=this,e=t._self._c;return e("div",{staticClass:"sm-btn-container-foreground",style:t.cssVariables},[t._l(t.localOptions,(function(s,i){return e("div",{key:`simple-btn-${i}`,ref:"btnContainer",refInFor:!0,staticClass:"sm-btn-container",on:{click:function(e){return t.handleButtonClick(s,i)}}},[e("div",{staticClass:"sm-btn-item"},[e("div",{class:["sm-btn-icon",{"sm-btn-icon-active":s.selected}]},[t._t("icon",(function(){return[e("i",{class:`${s.icon}`})]}),{props:s})],2),e("div",{class:["sm-btn-title",{"sm-btn-title-active":s.selected}]},[t._t("title",(function(){return[t._v(" "+t._s(s.title)+" ")]}),{props:s})],2)])])})),e("div",{ref:"borderSwiper",staticClass:"border-swiper"})],2)}),m=[],C={model:{prop:"value",event:"update"},props:{value:{default:null},options:{type:Array,required:!0},backgroundColor:{type:String,default:"#FFFFFF"},iconColor:{type:String,default:"#8066C7"},swiperColor:{type:String,default:"#8066C7"},replaceRoute:{type:Boolean,default:!1}},data:()=>({prevSelected:null,currSelected:null,localOptions:[],enableWatch:!0,btnItemWidth:0}),computed:{cssVariables(){const t={"--swiper-color":this.swiperColor,"--icon-color":this.iconColor,"--background-color":this.backgroundColor};return t}},watch:{currSelected(t){this.$refs.borderSwiper.style.transform=`translateX(${this.btnItemWidth*t}px)`},value:{handler(t,e){if(t!=e&&this.enableWatch){const e=this.localOptions.findIndex((e=>e.id==t));e>-1&&this.handleButtonClick(this.localOptions[e],e)}}}},mounted(){this.cssLoader(),window.addEventListener("resize",this.onResize)},beforeDestroy(){window.removeEventListener("resize",this.onResize)},created(){this.localOptions=this.options.slice();const t=this.localOptions.findIndex((t=>t.id==this.value||(t.path||{}).name==(this.$route||{}).name));t>-1&&(this.currSelected=t,this.prevSelected=t,"$set"in this?this.$set(this.localOptions,t,{...this.localOptions[t],selected:!0}):this.localOptions[t].selected=!0)},methods:{cssLoader(){this.btnItemWidth=this.$refs.btnContainer[0].offsetWidth,this.$refs.borderSwiper.style.width=this.btnItemWidth+"px",this.$refs.borderSwiper.style.transform=`translateX(${this.btnItemWidth*this.currSelected}px)`},onResize(){this.cssLoader()},handleButtonClick(t,e){this.currSelected=e,null!==this.prevSelected&&(this.localOptions[this.prevSelected].selected=!1),"$set"in this?this.$set(this.localOptions,e,{...this.localOptions[e],selected:!0}):this.localOptions[e].selected=!0,this.prevSelected=this.currSelected,this.updateValue(t)},updateValue(t){this.$emit("update",t.id),this.enableWatch=!1,setTimeout((()=>{this.enableWatch=!0}),0),t.path&&Object.keys(t.path).length&&(this.replaceRoute?this.$router.replace(t.path).catch((()=>{})):this.$router.push(t.path))}}},O=C,S=(0,r.Z)(O,g,m,!1,null,"58921e1e",null),$=(S.exports,function(){var t=this,e=t._self._c;return e("div",{staticClass:"rg-btn-container-foreground",style:t.cssVariables},t._l(t.localOptions,(function(s,i){return e("div",{key:`ring-btn-${i}`,staticClass:"rg-btn-container",on:{click:function(e){return t.handleButtonClick(s,i)}}},[e("div",{staticClass:"rg-btn-item"},[e("div",{class:[{"rg-btn-border":s.selected},{"rg-btn-border-deselect":s.deselect}]}),e("div",{class:["rg-btn-icon",{"rg-btn-icon-active":s.selected},{"rg-btn-icon-deselect":s.deselect}]},[t._t("icon",(function(){return[e("i",{class:`${s.icon}`})]}),{props:s}),s.badge>0?e("div",{staticClass:"rg-btn-badge"}):t._e()],2),e("div",{class:["rg-btn-title",{"rg-btn-title-active":s.selected}]},[t._t("title",(function(){return[t._v(" "+t._s(s.title)+" ")]}),{props:s})],2)])])})),0)}),w=[],y={model:{prop:"value",event:"update"},props:{value:{default:null},options:{type:Array,required:!0},iconColor:{type:String,default:"#669C35"},titleColor:{type:String,default:"#669C35"},borderColor:{type:String,default:"#4F7A28"},backgroundColor:{type:String,default:"#FFFFFF"},badgeColor:{type:String,default:"#FBC02D"},replaceRoute:{type:Boolean,default:!1}},data:()=>({prevSelected:null,currSelected:null,localOptions:[],enableWatch:!0}),computed:{cssVariables(){const t={"--border-color":this.borderColor,"--icon-color":this.iconColor,"--background-color":this.backgroundColor,"--title-color":this.titleColor,"--badge-color":this.badgeColor};return t}},watch:{value:{handler(t,e){if(t!=e&&this.enableWatch){const e=this.localOptions.findIndex((e=>e.id==t));e>-1&&this.handleButtonClick(this.localOptions[e],e)}}}},created(){this.localOptions=this.options.slice();const t=this.localOptions.findIndex((t=>t.id==this.value||(t.path||{}).name==(this.$route||{}).name));t>-1&&(this.currSelected=t,this.prevSelected=t,"$set"in this?this.$set(this.localOptions,t,{...this.localOptions[t],selected:!0}):this.localOptions[t].selected=!0)},methods:{handleButtonClick(t,e){if(e!==this.currSelected){if(this.currSelected=e,null!==this.prevSelected){const t=this.prevSelected;setTimeout((()=>{this.localOptions[t].deselect=!1}),100),this.localOptions[this.prevSelected].selected=!1,this.localOptions[this.prevSelected].deselect=!0}"$set"in this?this.$set(this.localOptions,e,{...this.localOptions[e],selected:!0}):this.localOptions[e].selected=!0,this.prevSelected=this.currSelected,this.updateValue(t)}},updateValue(t){this.$emit("update",t.id),this.enableWatch=!1,setTimeout((()=>{this.enableWatch=!0}),0),t.path&&Object.keys(t.path).length&&(this.replaceRoute?this.$router.replace(t.path).catch((()=>{})):this.$router.push(t.path))}}},k=y,_=(0,r.Z)(k,$,w,!1,null,"3c5f5539",null),x=(_.exports,function(){var t=this,e=t._self._c;return e("div",{staticClass:"wn-btn-container-foreground",style:t.cssVariables},t._l(t.localOptions,(function(s,i){return e("div",{key:`windows-btn-${i}`,staticClass:"wn-btn-container",on:{click:function(e){return t.handleButtonClick(s,i)}}},[e("div",{staticClass:"wn-btn-item"},[e("div",{class:["wn-btn-icon",{"wn-btn-icon-active":s.selected},{"wn-btn-icon-deselect":s.deselect}],style:`color:${s.color}`},[t._t("icon",(function(){return[e("i",{class:`${s.icon}`})]}),{props:s}),s.badge>0?e("div",{staticClass:"wn-btn-badge"},[t._v(" "+t._s(s.badge)+" ")]):t._e()],2),e("div",{class:["wn-btn-border",{"wn-btn-border-selected":s.selected},{"wn-btn-border-deselect":s.deselect}]})])])})),0)}),F=[],B={model:{prop:"value",event:"update"},props:{value:{default:null},options:{type:Array,required:!0},borderColor:{type:String,default:"#9B9B9B"},backgroundColor:{type:String,default:"#FFFFFF"},badgeColor:{type:String,default:"#828282"},replaceRoute:{type:Boolean,default:!1}},data:()=>({prevSelected:null,currSelected:null,localOptions:[],enableWatch:!0}),computed:{cssVariables(){const t={"--border-color":this.borderColor,"--background-color":this.backgroundColor,"--badge-color":this.badgeColor};return t}},watch:{value:{handler(t,e){if(t!=e&&this.enableWatch){const e=this.localOptions.findIndex((e=>e.id==t));e>-1&&this.handleButtonClick(this.localOptions[e],e)}}}},created(){this.localOptions=this.options.slice();const t=this.localOptions.findIndex((t=>t.id==this.value||(t.path||{}).name==(this.$route||{}).name));t>-1&&(this.currSelected=t,this.prevSelected=t,"$set"in this?this.$set(this.localOptions,t,{...this.localOptions[t],selected:!0}):this.localOptions[t].selected=!0)},methods:{handleButtonClick(t,e){if(e!==this.currSelected){if(this.currSelected=e,null!==this.prevSelected){const t=this.prevSelected;setTimeout((()=>{this.localOptions[t].deselect=!1}),300),this.localOptions[this.prevSelected].selected=!1,this.localOptions[this.prevSelected].deselect=!0}"$set"in this?this.$set(this.localOptions,e,{...this.localOptions[e],selected:!0}):this.localOptions[e].selected=!0,this.prevSelected=this.currSelected,this.updateValue(t)}},updateValue(t){this.$emit("update",t.id),this.enableWatch=!1,setTimeout((()=>{this.enableWatch=!0}),0),t.path&&Object.keys(t.path).length&&(this.replaceRoute?this.$router.replace(t.path).catch((()=>{})):this.$router.push(t.path))}}},W=B,A=(0,r.Z)(W,x,F,!1,null,"2e11abe4",null),V=(A.exports,{name:"BottomView",props:["sel"],components:{CurvedBottomNavigation:h},data:()=>({selected:1,options:[{id:1,icon:"fas fa-home",title:"Home"},{id:2,icon:"fas fa-pen",title:"Editor"},{id:3,icon:"fas fa-calendar-days",title:"Calendar"},{id:4,icon:"fas fa-plus",title:"Setting",childs:[{id:401,icon:"fas fa-ticket-alt",title:"Tickets"}]},{id:5,icon:"fas fa-bell",title:"Notification",badge:15}]}),watch:{sel(){this.selected=1,console.log(this.selected)},selected(t){console.log(this.$refs.nav,t);let e={name:"tableChanged"};switch(t){case 3:this.$modal.show("my-first-modal");break;case 5:e.tablename="book";break;default:console.log(t)}if(void 0!=e.tablename){const t=new CustomEvent("coreEvent",{detail:e});window.dispatchEvent(t)}}}}),E=V,I=(0,r.Z)(E,i,l,!1,null,"78cf8159",null),R=I.exports}}]);
//# sourceMappingURL=967.e83419e9.js.map