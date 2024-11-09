/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 JĆĀ¶rn Zaefferer; Licensed MIT */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}((function(e){e.extend(e.fn,{validate:function(t){if(this.length){var r=e.data(this[0],"validator");return r||(this.attr("novalidate","novalidate"),r=new e.validator(t,this[0]),e.data(this[0],"validator",r),r.settings.onsubmit&&(this.on("click.validate",":submit",(function(t){r.settings.submitHandler&&(r.submitButton=t.target),e(this).hasClass("cancel")&&(r.cancelSubmit=!0),void 0!==e(this).attr("formnovalidate")&&(r.cancelSubmit=!0)})),this.on("submit.validate",(function(t){function i(){var i,a;return!r.settings.submitHandler||(r.submitButton&&(i=e("<input type='hidden'/>").attr("name",r.submitButton.name).val(e(r.submitButton).val()).appendTo(r.currentForm)),a=r.settings.submitHandler.call(r,r.currentForm,t),r.submitButton&&i.remove(),void 0!==a&&a)}return r.settings.debug&&t.preventDefault(),r.cancelSubmit?(r.cancelSubmit=!1,i()):r.form()?r.pendingRequest?(r.formSubmitted=!0,!1):i():(r.focusInvalid(),!1)}))),r)}t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},valid:function(){var t,r,i;return e(this[0]).is("form")?t=this.validate().form():(i=[],t=!0,r=e(this[0].form).validate(),this.each((function(){t=r.element(this)&&t,i=i.concat(r.errorList)})),r.errorList=i),t},rules:function(t,r){var i,a,n,s,o,l,u=this[0];if(t)switch(i=e.data(u.form,"validator").settings,a=i.rules,n=e.validator.staticRules(u),t){case"add":e.extend(n,e.validator.normalizeRule(r)),delete n.messages,a[u.name]=n,r.messages&&(i.messages[u.name]=e.extend(i.messages[u.name],r.messages));break;case"remove":return r?(l={},e.each(r.split(/\s/),(function(t,r){l[r]=n[r],delete n[r],"required"===r&&e(u).removeAttr("aria-required")})),l):(delete a[u.name],n)}return(s=e.validator.normalizeRules(e.extend({},e.validator.classRules(u),e.validator.attributeRules(u),e.validator.dataRules(u),e.validator.staticRules(u)),u)).required&&(o=s.required,delete s.required,s=e.extend({required:o},s),e(u).attr("aria-required","true")),s.remote&&(o=s.remote,delete s.remote,s=e.extend(s,{remote:o})),s}}),e.extend(e.expr[":"],{blank:function(t){return!e.trim(""+e(t).val())},filled:function(t){return!!e.trim(""+e(t).val())},unchecked:function(t){return!e(t).prop("checked")}}),e.validator=function(t,r){this.settings=e.extend(!0,{},e.validator.defaults,t),this.currentForm=r,this.init()},e.validator.format=function(t,r){return 1===arguments.length?function(){var r=e.makeArray(arguments);return r.unshift(t),e.validator.format.apply(this,r)}:(arguments.length>2&&r.constructor!==Array&&(r=e.makeArray(arguments).slice(1)),r.constructor!==Array&&(r=[r]),e.each(r,(function(e,r){t=t.replace(new RegExp("\\{"+e+"\\}","g"),(function(){return r}))})),t)},e.extend(e.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:e([]),errorLabelContainer:e([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(e){this.lastActive=e,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(e)))},onfocusout:function(e){this.checkable(e)||!(e.name in this.submitted)&&this.optional(e)||this.element(e)},onkeyup:function(t,r){9===r.which&&""===this.elementValue(t)||-1!==e.inArray(r.keyCode,[16,17,18,20,35,36,37,38,39,40,45,144,225])||(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(e){e.name in this.submitted?this.element(e):e.parentNode.name in this.submitted&&this.element(e.parentNode)},highlight:function(t,r,i){"radio"===t.type?this.findByName(t.name).addClass(r).removeClass(i):e(t).addClass(r).removeClass(i)},unhighlight:function(t,r,i){"radio"===t.type?this.findByName(t.name).removeClass(r).addClass(i):e(t).removeClass(r).addClass(i)}},setDefaults:function(t){e.extend(e.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:e.validator.format("Please enter no more than {0} characters."),minlength:e.validator.format("Please enter at least {0} characters."),rangelength:e.validator.format("Please enter a value between {0} and {1} characters long."),range:e.validator.format("Please enter a value between {0} and {1}."),max:e.validator.format("Please enter a value less than or equal to {0}."),min:e.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function t(t){var r=e.data(this.form,"validator"),i="on"+t.type.replace(/^validate/,""),a=r.settings;a[i]&&!e(this).is(a.ignore)&&a[i].call(r,this,t)}this.labelContainer=e(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||e(this.currentForm),this.containers=e(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var r,i=this.groups={};e.each(this.settings.groups,(function(t,r){"string"==typeof r&&(r=r.split(/\s/)),e.each(r,(function(e,r){i[r]=t}))})),r=this.settings.rules,e.each(r,(function(t,i){r[t]=e.validator.normalizeRule(i)})),e(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",t).on("click.validate","select, option, [type='radio'], [type='checkbox']",t),this.settings.invalidHandler&&e(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),e.extend(this.submitted,this.errorMap),this.invalid=e.extend({},this.errorMap),this.valid()||e(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var e=0,t=this.currentElements=this.elements();t[e];e++)this.check(t[e]);return this.valid()},element:function(t){var r=this.clean(t),i=this.validationTargetFor(r),a=!0;return this.lastElement=i,void 0===i?delete this.invalid[r.name]:(this.prepareElement(i),this.currentElements=e(i),(a=!1!==this.check(i))?delete this.invalid[i.name]:this.invalid[i.name]=!0),e(t).attr("aria-invalid",!a),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a},showErrors:function(t){if(t){for(var r in e.extend(this.errorMap,t),this.errorList=[],t)this.errorList.push({message:t[r],element:this.findByName(r)[0]});this.successList=e.grep(this.successList,(function(e){return!(e.name in t)}))}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){e.fn.resetForm&&e(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors();var t,r=this.elements().removeData("previousValue").removeAttr("aria-invalid");if(this.settings.unhighlight)for(t=0;r[t];t++)this.settings.unhighlight.call(this,r[t],this.settings.errorClass,"");else r.removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var t,r=0;for(t in e)r++;return r},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(e){e.not(this.containers).text(""),this.addWrapper(e).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{e(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var t=this.lastActive;return t&&1===e.grep(this.errorList,(function(e){return e.element.name===t.name})).length&&t},elements:function(){var t=this,r={};return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter((function(){return!this.name&&t.settings.debug&&window.console&&console.error("%o has no name assigned",this),!(this.name in r||!t.objectLength(e(this).rules()))&&(r[this.name]=!0,!0)}))},clean:function(t){return e(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return e(this.settings.errorElement+"."+t,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=e([]),this.toHide=e([]),this.currentElements=e([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset(),this.toHide=this.errorsFor(e)},elementValue:function(t){var r,i=e(t),a=t.type;return"radio"===a||"checkbox"===a?this.findByName(t.name).filter(":checked").val():"number"===a&&void 0!==t.validity?!t.validity.badInput&&i.val():"string"==typeof(r=i.val())?r.replace(/\r/g,""):r},check:function(t){t=this.validationTargetFor(this.clean(t));var r,i,a,n=e(t).rules(),s=e.map(n,(function(e,t){return t})).length,o=!1,l=this.elementValue(t);for(i in n){a={method:i,parameters:n[i]};try{if("dependency-mismatch"===(r=e.validator.methods[i].call(this,l,t,a.parameters))&&1===s){o=!0;continue}if(o=!1,"pending"===r)return void(this.toHide=this.toHide.not(this.errorsFor(t)));if(!r)return this.formatAndAdd(t,a),!1}catch(e){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+t.id+", check the '"+a.method+"' method.",e),e instanceof TypeError&&(e.message+=".  Exception occurred when checking element "+t.id+", check the '"+a.method+"' method."),e}}if(!o)return this.objectLength(n)&&this.successList.push(t),!0},customDataMessage:function(t,r){return e(t).data("msg"+r.charAt(0).toUpperCase()+r.substring(1).toLowerCase())||e(t).data("msg")},customMessage:function(e,t){var r=this.settings.messages[e];return r&&(r.constructor===String?r:r[t])},findDefined:function(){for(var e=0;e<arguments.length;e++)if(void 0!==arguments[e])return arguments[e]},defaultMessage:function(t,r){return this.findDefined(this.customMessage(t.name,r),this.customDataMessage(t,r),!this.settings.ignoreTitle&&t.title||void 0,e.validator.messages[r],"<strong>Warning: No message defined for "+t.name+"</strong>")},formatAndAdd:function(t,r){var i=this.defaultMessage(t,r.method),a=/\$?\{(\d+)\}/g;"function"==typeof i?i=i.call(this,r.parameters,t):a.test(i)&&(i=e.validator.format(i.replace(a,"{$1}"),r.parameters)),this.errorList.push({message:i,element:t,method:r.method}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(e){return this.settings.wrapper&&(e=e.add(e.parent(this.settings.wrapper))),e},defaultShowErrors:function(){var e,t,r;for(e=0;this.errorList[e];e++)r=this.errorList[e],this.settings.highlight&&this.settings.highlight.call(this,r.element,this.settings.errorClass,this.settings.validClass),this.showLabel(r.element,r.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(e=0;this.successList[e];e++)this.showLabel(this.successList[e]);if(this.settings.unhighlight)for(e=0,t=this.validElements();t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return e(this.errorList).map((function(){return this.element}))},showLabel:function(t,r){var i,a,n,s=this.errorsFor(t),o=this.idOrName(t),l=e(t).attr("aria-describedby");s.length?(s.removeClass(this.settings.validClass).addClass(this.settings.errorClass),s.html(r)):(i=s=e("<"+this.settings.errorElement+">").attr("id",o+"-error").addClass(this.settings.errorClass).html(r||""),this.settings.wrapper&&(i=s.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(i):this.settings.errorPlacement?this.settings.errorPlacement(i,e(t)):i.insertAfter(t),s.is("label")?s.attr("for",o):0===s.parents("label[for='"+o+"']").length&&(n=s.attr("id").replace(/(:|\.|\[|\]|\$)/g,"\\$1"),l?l.match(new RegExp("\\b"+n+"\\b"))||(l+=" "+n):l=n,e(t).attr("aria-describedby",l),(a=this.groups[t.name])&&e.each(this.groups,(function(t,r){r===a&&e("[name='"+t+"']",this.currentForm).attr("aria-describedby",s.attr("id"))})))),!r&&this.settings.success&&(s.text(""),"string"==typeof this.settings.success?s.addClass(this.settings.success):this.settings.success(s,t)),this.toShow=this.toShow.add(s)},errorsFor:function(t){var r=this.idOrName(t),i=e(t).attr("aria-describedby"),a="label[for='"+r+"'], label[for='"+r+"'] *";return i&&(a=a+", #"+i.replace(/\s+/g,", #")),this.errors().filter(a)},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name)),e(t).not(this.settings.ignore)[0]},checkable:function(e){return/radio|checkbox/i.test(e.type)},findByName:function(t){return e(this.currentForm).find("[name='"+t+"']")},getLength:function(t,r){switch(r.nodeName.toLowerCase()){case"select":return e("option:selected",r).length;case"input":if(this.checkable(r))return this.findByName(r.name).filter(":checked").length}return t.length},depend:function(e,t){return!this.dependTypes[typeof e]||this.dependTypes[typeof e](e,t)},dependTypes:{boolean:function(e){return e},string:function(t,r){return!!e(t,r.form).length},function:function(e,t){return e(t)}},optional:function(t){var r=this.elementValue(t);return!e.validator.methods.required.call(this,r,t)&&"dependency-mismatch"},startRequest:function(e){this.pending[e.name]||(this.pendingRequest++,this.pending[e.name]=!0)},stopRequest:function(t,r){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],r&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(e(this.currentForm).submit(),this.formSubmitted=!1):!r&&0===this.pendingRequest&&this.formSubmitted&&(e(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t){return e.data(t,"previousValue")||e.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,"remote")})},destroy:function(){this.resetForm(),e(this.currentForm).off(".validate").removeData("validator")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,r){t.constructor===String?this.classRuleSettings[t]=r:e.extend(this.classRuleSettings,t)},classRules:function(t){var r={},i=e(t).attr("class");return i&&e.each(i.split(" "),(function(){this in e.validator.classRuleSettings&&e.extend(r,e.validator.classRuleSettings[this])})),r},normalizeAttributeRule:function(e,t,r,i){/min|max/.test(r)&&(null===t||/number|range|text/.test(t))&&(i=Number(i),isNaN(i)&&(i=void 0)),i||0===i?e[r]=i:t===r&&"range"!==t&&(e[r]=!0)},attributeRules:function(t){var r,i,a={},n=e(t),s=t.getAttribute("type");for(r in e.validator.methods)"required"===r?(""===(i=t.getAttribute(r))&&(i=!0),i=!!i):i=n.attr(r),this.normalizeAttributeRule(a,s,r,i);return a.maxlength&&/-1|2147483647|524288/.test(a.maxlength)&&delete a.maxlength,a},dataRules:function(t){var r,i,a={},n=e(t),s=t.getAttribute("type");for(r in e.validator.methods)i=n.data("rule"+r.charAt(0).toUpperCase()+r.substring(1).toLowerCase()),this.normalizeAttributeRule(a,s,r,i);return a},staticRules:function(t){var r={},i=e.data(t.form,"validator");return i.settings.rules&&(r=e.validator.normalizeRule(i.settings.rules[t.name])||{}),r},normalizeRules:function(t,r){return e.each(t,(function(i,a){if(!1!==a){if(a.param||a.depends){var n=!0;switch(typeof a.depends){case"string":n=!!e(a.depends,r.form).length;break;case"function":n=a.depends.call(r,r)}n?t[i]=void 0===a.param||a.param:delete t[i]}}else delete t[i]})),e.each(t,(function(i,a){t[i]=e.isFunction(a)?a(r):a})),e.each(["minlength","maxlength"],(function(){t[this]&&(t[this]=Number(t[this]))})),e.each(["rangelength","range"],(function(){var r;t[this]&&(e.isArray(t[this])?t[this]=[Number(t[this][0]),Number(t[this][1])]:"string"==typeof t[this]&&(r=t[this].replace(/[\[\]]/g,"").split(/[\s,]+/),t[this]=[Number(r[0]),Number(r[1])]))})),e.validator.autoCreateRanges&&(null!=t.min&&null!=t.max&&(t.range=[t.min,t.max],delete t.min,delete t.max),null!=t.minlength&&null!=t.maxlength&&(t.rangelength=[t.minlength,t.maxlength],delete t.minlength,delete t.maxlength)),t},normalizeRule:function(t){if("string"==typeof t){var r={};e.each(t.split(/\s/),(function(){r[this]=!0})),t=r}return t},addMethod:function(t,r,i){e.validator.methods[t]=r,e.validator.messages[t]=void 0!==i?i:e.validator.messages[t],r.length<3&&e.validator.addClassRules(t,e.validator.normalizeRule(t))},methods:{required:function(t,r,i){if(!this.depend(i,r))return"dependency-mismatch";if("select"===r.nodeName.toLowerCase()){var a=e(r).val();return a&&a.length>0}return this.checkable(r)?this.getLength(t,r)>0:t.length>0},email:function(e,t){return this.optional(t)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)},url:function(e,t){return this.optional(t)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)},date:function(e,t){return this.optional(t)||!/Invalid|NaN/.test(new Date(e).toString())},dateISO:function(e,t){return this.optional(t)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)},number:function(e,t){return this.optional(t)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e,t){return this.optional(t)||/^\d+$/.test(e)},creditcard:function(e,t){if(this.optional(t))return"dependency-mismatch";if(/[^0-9 \-]+/.test(e))return!1;var r,i,a=0,n=0,s=!1;if((e=e.replace(/\D/g,"")).length<13||e.length>19)return!1;for(r=e.length-1;r>=0;r--)i=e.charAt(r),n=parseInt(i,10),s&&(n*=2)>9&&(n-=9),a+=n,s=!s;return a%10==0},minlength:function(t,r,i){var a=e.isArray(t)?t.length:this.getLength(t,r);return this.optional(r)||a>=i},maxlength:function(t,r,i){var a=e.isArray(t)?t.length:this.getLength(t,r);return this.optional(r)||i>=a},rangelength:function(t,r,i){var a=e.isArray(t)?t.length:this.getLength(t,r);return this.optional(r)||a>=i[0]&&a<=i[1]},min:function(e,t,r){return this.optional(t)||e>=r},max:function(e,t,r){return this.optional(t)||r>=e},range:function(e,t,r){return this.optional(t)||e>=r[0]&&e<=r[1]},equalTo:function(t,r,i){var a=e(i);return this.settings.onfocusout&&a.off(".validate-equalTo").on("blur.validate-equalTo",(function(){e(r).valid()})),t===a.val()},remote:function(t,r,i){if(this.optional(r))return"dependency-mismatch";var a,n,s=this.previousValue(r);return this.settings.messages[r.name]||(this.settings.messages[r.name]={}),s.originalMessage=this.settings.messages[r.name].remote,this.settings.messages[r.name].remote=s.message,i="string"==typeof i&&{url:i}||i,s.old===t?s.valid:(s.old=t,a=this,this.startRequest(r),(n={})[r.name]=t,e.ajax(e.extend(!0,{mode:"abort",port:"validate"+r.name,dataType:"json",data:n,context:a.currentForm,success:function(i){var n,o,l,u=!0===i||"true"===i;a.settings.messages[r.name].remote=s.originalMessage,u?(l=a.formSubmitted,a.prepareElement(r),a.formSubmitted=l,a.successList.push(r),delete a.invalid[r.name],a.showErrors()):(n={},o=i||a.defaultMessage(r,"remote"),n[r.name]=s.message=e.isFunction(o)?o(t):o,a.invalid[r.name]=!0,a.showErrors(n)),s.valid=u,a.stopRequest(r,u)}},i)),"pending")}}});var t,r={};e.ajaxPrefilter?e.ajaxPrefilter((function(e,t,i){var a=e.port;"abort"===e.mode&&(r[a]&&r[a].abort(),r[a]=i)})):(t=e.ajax,e.ajax=function(i){var a=("mode"in i?i:e.ajaxSettings).mode,n=("port"in i?i:e.ajaxSettings).port;return"abort"===a?(r[n]&&r[n].abort(),r[n]=t.apply(this,arguments),r[n]):t.apply(this,arguments)})})),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}((function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,i=e(r);if(!i.is("[type=submit],[type=image]")){var a=i.closest("[type=submit]");if(0===a.length)return;r=a[0]}var n=this;if(n.clk=r,"image"==r.type)if(void 0!==t.offsetX)n.clk_x=t.offsetX,n.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var s=i.offset();n.clk_x=t.pageX-s.left,n.clk_y=t.pageY-s.top}else n.clk_x=t.pageX-r.offsetLeft,n.clk_y=t.pageY-r.offsetTop;setTimeout((function(){n.clk=n.clk_x=n.clk_y=null}),100)}function i(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var a={};a.fileapi=void 0!==e("<input type='file'/>").get(0).files,a.formdata=void 0!==window.FormData;var n=!!e.fn.prop;e.fn.attr2=function(){if(!n)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){function a(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){i("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){i("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){var t=u.attr2("target"),r=u.attr2("action"),n=u.attr("enctype")||u.attr("encoding")||"multipart/form-data";T.setAttribute("target",p),(!s||/post/i.test(s))&&T.setAttribute("method","POST"),r!=h.url&&T.setAttribute("action",h.url),h.skipEncodingOverride||s&&!/post/i.test(s)||u.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),h.timeout&&(S=setTimeout((function(){w=!0,l(C)}),h.timeout));var o=[];try{if(h.extraData)for(var c in h.extraData)h.extraData.hasOwnProperty(c)&&(e.isPlainObject(h.extraData[c])&&h.extraData[c].hasOwnProperty("name")&&h.extraData[c].hasOwnProperty("value")?o.push(e('<input type="hidden" name="'+h.extraData[c].name+'">').val(h.extraData[c].value).appendTo(T)[0]):o.push(e('<input type="hidden" name="'+c+'">').val(h.extraData[c]).appendTo(T)[0]));h.iframeTarget||g.appendTo("body"),v.attachEvent?v.attachEvent("onload",l):v.addEventListener("load",l,!1),setTimeout((function e(){try{var t=a(v).readyState;i("state = "+t),t&&"uninitialized"==t.toLowerCase()&&setTimeout(e,50)}catch(e){i("Server abort: ",e," (",e.name,")"),l(L),S&&clearTimeout(S),S=void 0}}),15);try{T.submit()}catch(e){document.createElement("form").submit.apply(T)}}finally{T.setAttribute("action",r),T.setAttribute("enctype",n),t?T.setAttribute("target",t):u.removeAttr("target"),e(o).remove()}}function l(t){if(!b.aborted&&!D){if((F=a(v))||(i("cannot access response document"),t=L),t===C&&b)return b.abort("timeout"),void k.reject(b,"timeout");if(t==L&&b)return b.abort("server abort"),void k.reject(b,"error","server abort");if(F&&F.location.href!=h.iframeSrc||w){v.detachEvent?v.detachEvent("onload",l):v.removeEventListener("load",l,!1);var r,n="success";try{if(w)throw"timeout";var s="xml"==h.dataType||F.XMLDocument||e.isXMLDoc(F);if(i("isXml="+s),!s&&window.opera&&(null===F.body||!F.body.innerHTML)&&--R)return i("requeing onLoad callback, DOM not available"),void setTimeout(l,250);var o=F.body?F.body:F.documentElement;b.responseText=o?o.innerHTML:null,b.responseXML=F.XMLDocument?F.XMLDocument:F,s&&(h.dataType="xml"),b.getResponseHeader=function(e){return{"content-type":h.dataType}[e.toLowerCase()]},o&&(b.status=Number(o.getAttribute("status"))||b.status,b.statusText=o.getAttribute("statusText")||b.statusText);var u=(h.dataType||"").toLowerCase(),c=/(json|script|text)/.test(u);if(c||h.textarea){var d=F.getElementsByTagName("textarea")[0];if(d)b.responseText=d.value,b.status=Number(d.getAttribute("status"))||b.status,b.statusText=d.getAttribute("statusText")||b.statusText;else if(c){var m=F.getElementsByTagName("pre")[0],p=F.getElementsByTagName("body")[0];m?b.responseText=m.textContent?m.textContent:m.innerText:p&&(b.responseText=p.textContent?p.textContent:p.innerText)}}else"xml"==u&&!b.responseXML&&b.responseText&&(b.responseXML=q(b.responseText));try{E=N(b,u,h)}catch(e){n="parsererror",b.error=r=e||n}}catch(e){i("error caught: ",e),n="error",b.error=r=e||n}b.aborted&&(i("upload aborted"),n=null),b.status&&(n=b.status>=200&&b.status<300||304===b.status?"success":"error"),"success"===n?(h.success&&h.success.call(h.context,E,"success",b),k.resolve(b.responseText,"success",b),f&&e.event.trigger("ajaxSuccess",[b,h])):n&&(void 0===r&&(r=b.statusText),h.error&&h.error.call(h.context,b,n,r),k.reject(b,"error",r),f&&e.event.trigger("ajaxError",[b,h,r])),f&&e.event.trigger("ajaxComplete",[b,h]),f&&! --e.active&&e.event.trigger("ajaxStop"),h.complete&&h.complete.call(h.context,b,n),D=!0,h.timeout&&clearTimeout(S),setTimeout((function(){h.iframeTarget?g.attr("src",h.iframeSrc):g.remove(),b.responseXML=null}),100)}}}var c,d,h,f,p,g,v,b,y,x,w,S,T=u[0],k=e.Deferred();if(k.abort=function(e){b.abort(e)},r)for(d=0;d<m.length;d++)c=e(m[d]),n?c.prop("disabled",!1):c.removeAttr("disabled");if((h=e.extend(!0,{},e.ajaxSettings,t)).context=h.context||h,p="jqFormIO"+(new Date).getTime(),h.iframeTarget?(x=(g=e(h.iframeTarget)).attr2("name"))?p=x:g.attr2("name",p):(g=e('<iframe name="'+p+'" src="'+h.iframeSrc+'" />')).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=g[0],b={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";i("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}g.attr("src",h.iframeSrc),b.error=r,h.error&&h.error.call(h.context,b,r,t),f&&e.event.trigger("ajaxError",[b,h,r]),h.complete&&h.complete.call(h.context,b,r)}},(f=h.global)&&0==e.active++&&e.event.trigger("ajaxStart"),f&&e.event.trigger("ajaxSend",[b,h]),h.beforeSend&&!1===h.beforeSend.call(h.context,b,h))return h.global&&e.active--,k.reject(),k;if(b.aborted)return k.reject(),k;(y=T.clk)&&((x=y.name)&&!y.disabled&&(h.extraData=h.extraData||{},h.extraData[x]=y.value,"image"==y.type&&(h.extraData[x+".x"]=T.clk_x,h.extraData[x+".y"]=T.clk_y)));var C=1,L=2,j=e("meta[name=csrf-token]").attr("content"),A=e("meta[name=csrf-param]").attr("content");A&&j&&(h.extraData=h.extraData||{},h.extraData[A]=j),h.forceSync?o():setTimeout(o,10);var E,F,D,R=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},M=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,i){var a=t.getResponseHeader("content-type")||"",n="xml"===r||!r&&a.indexOf("xml")>=0,s=n?t.responseXML:t.responseText;return n&&"parsererror"===s.documentElement.nodeName&&e.error&&e.error("parsererror"),i&&i.dataFilter&&(s=i.dataFilter(s,r)),"string"==typeof s&&("json"===r||!r&&a.indexOf("json")>=0?s=M(s):("script"===r||!r&&a.indexOf("javascript")>=0)&&e.globalEval(s)),s};return k}if(!this.length)return i("ajaxSubmit: skipping submit process - no element selected"),this;var s,o,l,u=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),s=t.type||this.attr2("method"),(l=(l="string"==typeof(o=t.url||this.attr2("action"))?e.trim(o):"")||window.location.href||"")&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:s||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var c={};if(this.trigger("form-pre-serialize",[this,t,c]),c.veto)return i("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return i("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var h,m=[],f=this.formToArray(t.semantic,m);if(t.data&&(t.extraData=t.data,h=e.param(t.data,d)),t.beforeSubmit&&!1===t.beforeSubmit(f,this,t))return i("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[f,this,t,c]),c.veto)return i("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var p=e.param(f,d);h&&(p=p?p+"&"+h:h),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+p,t.data=null):t.data=p;var g=[];if(t.resetForm&&g.push((function(){u.resetForm()})),t.clearForm&&g.push((function(){u.clearForm(t.includeHidden)})),!t.dataType&&t.target){var v=t.success||function(){};g.push((function(r){var i=t.replaceTarget?"replaceWith":"html";e(t.target)[i](r).each(v,arguments)}))}else t.success&&g.push(t.success);if(t.success=function(e,r,i){for(var a=t.context||this,n=0,s=g.length;s>n;n++)g[n].apply(a,[e,r,i||u,u])},t.error){var b=t.error;t.error=function(e,r,i){var a=t.context||this;b.apply(a,[e,r,i,u])}}if(t.complete){var y=t.complete;t.complete=function(e,r){var i=t.context||this;y.apply(i,[e,r,u])}}var x=e("input[type=file]:enabled",this).filter((function(){return""!==e(this).val()})).length>0,w="multipart/form-data",S=u.attr("enctype")==w||u.attr("encoding")==w,T=a.fileapi&&a.formdata;i("fileAPI :"+T);var k,C=(x||S)&&!T;!1!==t.iframe&&(t.iframe||C)?t.closeKeepAlive?e.get(t.closeKeepAlive,(function(){k=r(f)})):k=r(f):k=(x||S)&&T?function(r){for(var i=new FormData,a=0;a<r.length;a++)i.append(r[a].name,r[a].value);if(t.extraData){var n=function(r){var i,a,n=e.param(r,t.traditional).split("&"),s=n.length,o=[];for(i=0;s>i;i++)n[i]=n[i].replace(/\+/g," "),a=n[i].split("="),o.push([decodeURIComponent(a[0]),decodeURIComponent(a[1])]);return o}(t.extraData);for(a=0;a<n.length;a++)n[a]&&i.append(n[a][0],n[a][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:s||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",(function(e){var r=0,i=e.loaded||e.position,a=e.total;e.lengthComputable&&(r=Math.ceil(i/a*100)),t.uploadProgress(e,i,a,r)}),!1),r}),o.data=null;var l=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=i,l&&l.call(this,e,r)},e.ajax(o)}(f):e.ajax(t),u.removeData("jqxhr").data("jqxhr",k);for(var L=0;L<m.length;L++)m[L]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(a){if((a=a||{}).delegation=a.delegation&&e.isFunction(e.fn.on),!a.delegation&&0===this.length){var n={s:this.selector,c:this.context};return!e.isReady&&n.s?(i("DOM not ready, queuing ajaxForm"),e((function(){e(n.s,n.c).ajaxForm(a)})),this):(i("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return a.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,a,t).on("click.form-plugin",this.selector,a,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",a,t).bind("click.form-plugin",a,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var i=[];if(0===this.length)return i;var n,s,o,l,u,c,d,h,m=this[0],f=this.attr("id"),p=t?m.getElementsByTagName("*"):m.elements;if(p&&!/MSIE [678]/.test(navigator.userAgent)&&(p=e(p).get()),f&&((n=e(':input[form="'+f+'"]').get()).length&&(p=(p||[]).concat(n))),!p||!p.length)return i;for(s=0,d=p.length;d>s;s++)if((l=(c=p[s]).name)&&!c.disabled)if(t&&m.clk&&"image"==c.type)m.clk==c&&(i.push({name:l,value:e(c).val(),type:c.type}),i.push({name:l+".x",value:m.clk_x},{name:l+".y",value:m.clk_y}));else if((u=e.fieldValue(c,!0))&&u.constructor==Array)for(r&&r.push(c),o=0,h=u.length;h>o;o++)i.push({name:l,value:u[o]});else if(a.fileapi&&"file"==c.type){r&&r.push(c);var g=c.files;if(g.length)for(o=0;o<g.length;o++)i.push({name:l,value:g[o],type:c.type});else i.push({name:l,value:"",type:c.type})}else null!=u&&(r&&r.push(c),i.push({name:l,value:u,type:c.type,required:c.required}));if(!t&&m.clk){var v=e(m.clk),b=v[0];(l=b.name)&&!b.disabled&&"image"==b.type&&(i.push({name:l,value:v.val()}),i.push({name:l+".x",value:m.clk_x},{name:l+".y",value:m.clk_y}))}return i},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each((function(){var i=this.name;if(i){var a=e.fieldValue(this,t);if(a&&a.constructor==Array)for(var n=0,s=a.length;s>n;n++)r.push({name:i,value:a[n]});else null!=a&&r.push({name:this.name,value:a})}})),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],i=0,a=this.length;a>i;i++){var n=this[i],s=e.fieldValue(n,t);null==s||s.constructor==Array&&!s.length||(s.constructor==Array?e.merge(r,s):r.push(s))}return r},e.fieldValue=function(t,r){var i=t.name,a=t.type,n=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!i||t.disabled||"reset"==a||"button"==a||("checkbox"==a||"radio"==a)&&!t.checked||("submit"==a||"image"==a)&&t.form&&t.form.clk!=t||"select"==n&&-1==t.selectedIndex))return null;if("select"==n){var s=t.selectedIndex;if(0>s)return null;for(var o=[],l=t.options,u="select-one"==a,c=u?s+1:l.length,d=u?s:0;c>d;d++){var h=l[d];if(h.selected){var m=h.value;if(m||(m=h.attributes&&h.attributes.value&&!h.attributes.value.specified?h.text:h.value),u)return m;o.push(m)}}return o}return e(t).val()},e.fn.clearForm=function(t){return this.each((function(){e("input,select,textarea",this).clearFields(t)}))},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each((function(){var i=this.type,a=this.tagName.toLowerCase();r.test(i)||"textarea"==a?this.value="":"checkbox"==i||"radio"==i?this.checked=!1:"select"==a?this.selectedIndex=-1:"file"==i?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(i)||"string"==typeof t&&e(this).is(t))&&(this.value="")}))},e.fn.resetForm=function(){return this.each((function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()}))},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each((function(){this.disabled=!e}))},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each((function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var i=e(this).parent("select");t&&i[0]&&"select-one"==i[0].type&&i.find("option").selected(!1),this.selected=t}}))},e.fn.ajaxSubmit.debug=!1}));