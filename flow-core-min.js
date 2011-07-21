/*
Flow v0.X / Bemi Faison (c) 2011 / MIT
http://github.com/bemson/Flow/tree/nextGen

genData v0.8.1 / Bemi Faison (c) 2011 / MIT
http://github.com/bemson/genData/
*/
function genData(a){var b=arguments,c,b,d=b.callee,e,f,g,h=[],i=[],j,k,l,m=d,n;if(!(this.hasOwnProperty&&this instanceof d)){b[1]&&(h=typeof b[1]=="function"?[b[1]]:b[1]),f=h.length;function o(a,b){this.name=a,this.value=b}b[2]&&(m=b[2]),o.prototype=m.prototype,o.prototype.constructor=m,k=[["",a]];while(k.length){l=k.shift(),e=0,n=new o(l[0],l[1]),c={omit:0,scan:1,exit:0},b=[n.name,n.value,l[2],i,c];while(e<f&&!c.exit)h[e++].apply(n,b);c.omit?n._OMIT=!0:i.push(n);if(c.exit)k=[];else{j=[];if(c.scan&&typeof n.value=="object")for(g in n.value)n.value.hasOwnProperty(g)&&j.push([g,n.value[g],n]);k=j.concat(k)}}return i}if(a!==d){b[1]instanceof Array&&(m=a,b=b[1]),h=h.concat([].slice.call(b));function p(a,b,c){if(!(this.hasOwnProperty&&this instanceof p))return d(a,h.concat(b||[]),c&&c.protoype?c:p);if(a!==d)return new d(p,h.concat([].slice.call(arguments)));return this}p.prototype=new m(d),p.prototype.constructor=p;return p}return this}
!function(a,b,c){function l(a,b){function j(){function a(){this.pkgs=c,this.toString=i}a.prototype=new h;return a}function i(a){return a===d?g:Object.prototype.toString.apply(this,arguments)}var c={},f=new(j()),g=new k(a instanceof h?a.toString(d).prgm:a,f,typeof b=="object"?b:{});e.forEach(function(a){var b=j();b.prototype=new a.model,c[a.name]=new b});return f}function k(a,b,c){var d=this;d.prgm=a,d.states=j(a),d.shared={currentIndex:0,targetIndex:0,go:function(a){d.target=d.states[a],d.shared.targetIndex=a,d.stop=0;return d.go()},stop:function(){d.stop=1;return!0},post:function(a){switch(typeof a){case"function":return d.posts.push(a);case"number":d.posts[a]=null}}},d.posts=[],d.current=d.states[0],d.target=d.loop=0,d.pkgs=e.map(function(a){function f(){}var e={name:a.name};f.prototype=new a.pkg,e.pkg=new f,e.pkg.states=d.states.map(function(a){function b(){}b.prototype=a;return new b}),a.pkg.init&&a.pkg.init.call(e.pkg,c),e.pkg.flow=d.shared,e.pkg.proxy=b;return e})}function j(a){var b=g(a);b[0].parentIndex=b[0].childIndex=0,b.unshift(g()[0]),b[0].children.push(1),b[0].name="_flow",b[0].index=0,b[0].depth=0,b[0].location="..//",b[0].firstChildIndex=b[0].lastChildIndex=1;return b}function i(a){function c(){}function b(b){var c=b&&b.toString(d);return typeof c=="object"&&(c.pkgs.filter(function(b){return b.name===a})[0]||{}).pkg}b.init=b.dataKey=b.invalidKey=b.onBegin=b.onEnd=b.onTraverse=0,c.prototype=new h,h=c,b.api=c.prototype,f[a]=e.push({name:a,pkg:b,model:c})-1;return b}function h(){}var d={},e=[],f={},g=new b(function(a,b,d,f,g){var h=this,i=a&&!e.every(function(c){var d=c.pkg.invalidKey;return!d||(typeof d=="function"?!d(a,b):!d.test(a))}),j=a&&!e.every(function(c){var d=c.pkg.dataKey;return!d||(typeof d=="function"?!d(a,b):!d.test(a))});i||j?(g.omit=1,g.scan=0,j&&!i&&(d.data[a]=b)):(h.inContext=h.parentIndex=h.previousIndex=h.nextIndex=h.firstChildIndex=c,h.index=f.length+1,h.depth=d?d.depth+1:1,h.name=d?a:"_root",h.data={},h.location=d?d.location+a+"/":"//",h.children=[],d&&(h.parentIndex=d.index,d.children.length||(d.firstChildIndex=h.index),h.childIndex=d.children.push(h.index)-1,d.lastChildIndex=h.index,h.childIndex&&(h.previousIndex=d.children[h.childIndex-1],f[h.previousIndex-1].nextIndex=h.index)))});k.prototype={go:function(){var a=this,b=a.states,c=a.shared,d,e=0,f=a.current,g=0,h=0,i;if(a.loop)return!!a.target;a.posts=[],a.loop=1,a.fire("Begin");while(a.loop)a.target&&!a.stop?(i=0,d=a.target.index-f.index,d?d>0&&f.index<2||!a.target.location.indexOf(f.location)?f.inContext?(g=0,h=f.firstChildIndex):(g=1,h=1,f.inContext=1):f.inContext?(g=1,h=2,f.inContext=0):(a.target.location.indexOf(b[f.parentIndex].location)&&(d=-1),h=d<0?4:3,f.lastEvent===2||f.lastEvent===h?(g=0,h=d>0?f.nextIndex:f.previousIndex||f.parentIndex):g=1):(g=1,h=f.inContext?0:1,f.inContext&&(a.target=0,c.targetIndex=-1),f.inContext=1),g?(f.lastEvent=h,e++,a.fire("Traverse",[h])):(f.lastEvent=0,f=a.current=b[h],c.currentIndex=h)):!i&&(a.stop||!a.target)?(i=1,a.fire("End")):a.loop=0;a.posts.forEach(function(a){a()});return e},fire:function(a,b){a="on"+a,b=b||[],this.pkgs.forEach(function(c){var d=e[f[c.name]].pkg[a];d&&d.apply(c.pkg,b)})}},l.pkg=function(a){if(arguments.length){if(typeof a=="string"&&/\w/.test(a)){f.hasOwnProperty(a)||i(a);return e[f[a]].pkg}return!1}return e.map(function(a){return a.name})},a.Flow=l}(this,genData)
!function(a,b,c,d,e,f){var g=e.pkg("core"),h=function(a){var c=typeof a;return c==="object"&&~(new b).toString.call(a).indexOf("y")?"array":c},i=new genData(function(a,b,d,e,g){var h=this;h.O=typeof b=="object",h.A=b instanceof c,h.V=1,d?d.A?h.O&&(g.exclude=1):g.scanValue=0:h.O&&(g.exclude=1);if(!g.exclude){if(!d||d.A)h.name=b,h.value=f,h.V=0;if(h.name==null||!/\w/.test(h.name))g.exclude=1;g.exclude||e.filter(function(a,b){return a.name===h.name&&((a.I=b)||1)}).forEach(function(a){e.splice(a.I,1)})}}),j=new genData(function(a,b,c,d,e){var f=this,g="/";f.set=0,f.parent=c,f.done=0,typeof b=="string"&&(~b.indexOf(g)?f.value=b.split(g):b.charAt(0)==="["&&(f.value=b.slice(1,-1).split("|"),f.set=1)),typeof f.value=="string"?(c&&c.set&&(f.set=1,c.last=f),f.first=!d.length):e.omit=1}),k=[];g.events="on|in|out|over".split("|"),g.dataKey=/^_/,g.invalidKey=/^toString$|^[@\[]|[\/\|]/,g.init=function(){var a=this;a.args=[],a.calls=[],a.route=[],a.vars={},a.delay={},a.cache={indexOf:{}},a.locked=0,a.stateIds={},a.childFlows=0,a.parentFlows=[],a.targets=[],a.phase=0,a.states.forEach(function(b,c){var d=c&&a.states[b.parentIndex];a.stateIds[b.location]=c,b.fncs=[],b.pendable=d&&!d.pendable?0:b.data.hasOwnProperty("_pendable")?!!b.data._pendable:1,b.isRoot=c<2?1:!!b.data._root,b.rootIndex=b.isRoot?b.index:d.rootIndex,b.restrictPath=b.data._restrict?b.location:d?d.restrictPath:"",b.map=function(){return a.proxy.pkgs.core.target(c,arguments)},b.vars=i(b.data._vars).map(function(a){return{name:a.name,value:a.value,use:a.V}}),b.index&&(d.map[b.name]=b.map),b.map.toString=function(){return b.location},g.events.forEach(function(a,c){a="_"+a,b.fncs[c]=typeof b.data[a]=="function"?b.data[a]:0}),!b.fncs[0]&&typeof b.value=="function"&&(b.fncs[0]=b.value)})},g.prototype={indexOf:function(a,b){var c=this,d=c.states,e=c.stateIds,f,g,h,i,k,l=-1;b=b||c.states[c.flow.currentIndex];switch(typeof a){case"object":a=parseInt(a.index);case"number":d[a]&&(l=a);break;case"function":a=a+"";case"string":if(a==="..//"||a==="//")l=a==="//"?1:0;else{i=a.match(/^(?:(?:\.{1,2}|[@\[][^\/]+)\/?)+/);if(i){if(!c.cache.indexOf.hasOwnProperty(a+b.index)&&!c.cache.indexOf.hasOwnProperty(a)){f=a.substr(i[0].length),h=0,i=j(i[0]),l=b.index;while((g=d[l])&&i.length){k=i.shift();if(!k.set||!k.parent.done){switch(k.value){case"@child":l=g.firstChildIndex;break;case"@next":l=g.nextIndex;break;case"@parent":case"..":l=g.parentIndex;break;case"@previous":l=g.previousIndex;break;case"@root":l=g.rootIndex;break;case"@program":case"@flow":k.first&&(h=1),l=~k.value.indexOf("f")?0:1;break;case"@oldest":case"@youngest":l=d[g.parentIndex]?d[g.parentIndex][~k.value.indexOf("y")?"firstChildIndex":"lastChildIndex"]:-1;break;case"@self":case".":l=g.index;break;default:k.value&&(l=-1)}k.set&&(l>-1?k.parent.done=1:k.parent.last!==k&&(l=g.index))}}l=g&&(!f||(g=d[e[g.location+f.replace(/([^\/])$/,"$1/")]]))?g.index:-1,c.cache.indexOf[a+(h?"":b.index)]=l}l=c.cache.indexOf.hasOwnProperty(a+b.index)?c.cache.indexOf[a+b.index]:c.cache.indexOf[a]}else a.charAt(0)!=="/"?a=b.location+a:a.charAt(1)!=="/"&&(a=d[b.rootIndex].location+a.substr(1)),a.slice(-1)!=="/"&&(a+="/"),l=e.hasOwnProperty(a)?e[a]:-1}}return l},vetIndexOf:function(a,b){var c=this,d=c.indexOf(a,b);b=b||c.states[c.flow.currentIndex];return~d&&(c.trust||!c.states[d].location.indexOf(b.restrictPath))?d:-1},getVar:function(a,b){var c=this;return c.vars.hasOwnProperty(a)?c.vars[a]:c.vars[a]={name:a,values:arguments.length>1?[b]:[]}},scopeVars:function(a,b){var c=this;a.vars.forEach(function(a){var d=c.getVar(a.name);b?(d.values.shift(),d.values.length||delete c.vars[a.name]):d.values.unshift(a.use?a.value:d.values[0])})},canMove:function(a){var b=this;return(b.trust||!b.locked)&&(a||b.targets.length)&&!b.childFlows},move:function(){var a=this,b=a.paused;a.paused=0;return a.flow.go(a.targets[0])||b}},g.onBegin=function(){var b=this,c=b.delay.callback,d=k[0];d&&d.states[d.flow.currentIndex].pendable&&(d.childFlows++,b.parentFlows.unshift(d)),b.paused||(b.calls=[],b.route=[]),b.paused=0,k.unshift(b),a.clearTimeout(b.delay.timer),b.delay.callback=0,c&&c.call(b.proxy)},g.onTraverse=function(a){var b=this,c=b.states[b.flow.currentIndex];b.trust=1,b.paused=0,b.outState&&(b.scopeVars(b.outState,1),b.outState=0);switch(a){case 1:b.scopeVars(c);break;case 2:b.outState=c}b.phase=a,c.index!==b.route.slice(-1)[0]&&b.route.push(c.index),c.fncs[a]&&(b.calls.push(c.index+"."+a),b.result=c.fncs[a].apply(b.proxy,a||b.targets.length-1?[]:b.args)),b.childFlows&&b.flow.stop(),b.trust=0},g.onEnd=function(){var a=this;a.phase?k.shift():(a.targets.shift(),!a.paused&&!a.childFlows&&a.targets.length?a.flow.go(a.targets[0]):(k.shift(),!a.paused&&!a.childFlows&&(a.args=[],a.parentFlows.length&&(a.parentFlows.forEach(function(a){a.childFlows--}),a.flow.post(function(){a.parentFlows.forEach(function(a){a.childFlows||a.move()})})))))},g.api.map=function(){return g(this).states[1].map},g.api.query=function(a){var b=g(this),c=[];return a&&[].slice.call(arguments).every(function(a){var d=b.vetIndexOf(a),e=0;~d&&(c.push(b.states[d].location),e=1);return e})?c.length>0?c:c[0]:!1},g.api.lock=function(a){var b=g(this),c=!1;arguments.length?b.trust&&(b.locked=!!a,c=!0):c=!!b.locked;return c},g.api.vars=function(a,b){var c=g(this),d=arguments.length,e,f=!1;if(d)typeof a=="string"&&/\w/.test(a)&&(e=c.getVar(a),d>1?(e.values[0]=b,f=!0):f=e.values[0]);else{f=[];for(e in c.vars)c.vars.hasOwnProperty(e)&&f.push(e);f.sort()}return f},g.api.args=function(a,b){var c=g(this),d=c.args,e=d.length,i=arguments.length,j=h(a),k=!0;i&&!c.locked?j==="array"?c.args=[].concat(a):j==="number"?i>1?b===f&&a===e-1?d.pop():d[a]=b:a>-1&&a<e?k=d[a]:k=!1:k=!1:i||(k=d.concat());return k},g.api.target=function(a){var b=g(this),c=b.vetIndexOf(a),d=!1;~c&&b.canMove(1)&&(b.args=[].slice.call(arguments).slice(1),b.targets=[c],b.move(),!b.phase&&!b.paused&&(d=b.result===f?!0:b.result));return d},g.api.go=function(){var a=g(this),b=a.targets,c=[],d,e=!1;if(a.canMove(1)&&[].slice.call(arguments).every(function(b){var d=a.vetIndexOf(b);c.push(d);return~d})){if(d=c.length)b.length?(c[d-1]===b[a.phase?0:1]&&c.pop(),a.phase?b=c.concat(b):b.splice.apply(b,[0,1].concat(c))):b=c,a.targets=b;e=!!a.move()}return e},g.api.wait=function(){var b=g(this),c=arguments,d=c.length,e=d<2,f=e?0:c[0],h=typeof f=="function",i=b.indexOf(f),j=parseInt(c[d-1]),k=!1;b.canMove()&&(!d||j>-1&&(e||~i||h))&&(b.paused=1,b.flow.stop(),a.clearTimeout(b.delay.timer),b.delay.timer=d?a.setTimeout(function(){b.trust=1,!e&&~i?b.proxy.pkgs.core.target(i):(h&&(b.delay.callback=f),b.move())},j):1,k=!0);return k},g.api.status=function(){var a=this,b={};e.pkg().forEach(function(c){var d=e.pkg(c),f,g;if(typeof d.addStatus=="function"){f=d.addStatus.call(d(a),b);for(g in f)f.hasOwnProperty(g)&&(b[g]=f[g])}});return b},g.addStatus=function(a){var b=this,c=b.states[b.flow.currentIndex],e=b.targets.length,f=function(a){return b.states[a].location};return{trust:!!b.trust,loops:d.max((b.calls.join().match(new RegExp("\\b"+c.index+"."+b.phase,"g"))||[]).length-1,0),depth:c.depth,paused:!!b.paused,pending:!!b.childFlows,pendable:!!c.pendable,targets:b.targets.map(f),route:e?b.route.map(f):[],location:c.location,index:c.index,phase:e?g.events[b.phase]:"",state:c.name}}}(this,Object,Array,Math,Flow)