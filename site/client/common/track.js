function extend(...arg) {
    let length = arg.length;
    let target = arg[0] || {};
    if (typeof target!="object" && typeof target != "function") {
        target = {};
    }
    if (length == 1) {
        target = this;
        i--;
    }
    for (let i = 1; i < length; i++) { 
        let source = arg[i]; 
        for (let key in source) { 
            // 使用for in会遍历数组所有的可枚举属性，包括原型。
            if (Object.prototype.hasOwnProperty.call(source, key)) { 
                target[key] = source[key]; 
            } 
        } 
    }
    return target; 
}
// register_event的实现，优先采用addEventListener的方式，如果浏览器不支持会尝试使用onXXX的方式
function register_event(element, type, handler, oldSchool, useCapture) {
    if (!element) {
        console.error('No valid element provided to register_event');
        return;
    }
    if (element.addEventListener && !oldSchool) {
        element.addEventListener(type, handler, !!useCapture);
    } else {
        let ontype = 'on' + type;
        let old_handler = element[ontype]; // can be undefined
        element[ontype] = makeHandler(element, handler, old_handler);
    }
};

function getClassName(element){
    return element.classList ? [...element.classList].join(' ') : element.getAttribute('className');
}

function getEventTarget(e){
    e = e || window.event;
    return e.target || e.srcElement;
} 

function isTag(element, tagName){
    return element.tagName.toLowerCase() === tagName;
}
// 所有属性
function getPropertiesFromElement(element){
    const properties = [];
    Object.keys(element).forEach((key) => {
        properties.push(key, element[key])
    });

    return properties
}
// 事件的基本属性，包含事件名称、window.location.host、window.location.pathname
function getDefaultProperties(type){
    const params = {}
    //Document对象数据
    if(document) {
        params.domain = document.domain || ''; 
        params.url = document.URL || ''; 
        params.title = document.title || ''; 
        params.referrer = document.referrer || ''; 
    }   
    //Window对象数据
    if(window && window.screen) {
        params.sh = window.screen.height || 0;
        params.sw = window.screen.width || 0;
        params.cd = window.screen.colorDepth || 0;
    }   
    //navigator对象数据
    if(navigator) {
        params.lang = navigator.language || ''; 
    }
    
    return {
        ...params,
        type, 
        host: window.location.host, 
        pathname: window.location.pathname
    }
}
// form属性
function getFormFieldProperties(element){
    const keys = ['name', 'value', 'type', 'checked', 'selected', 'action', 'method', 'selectedIndex'];
    const properties = {}

    keys.forEach((key) => {
        properties[key] = element[key];
    });

    properties.tagName = element.tagName;

    return properties
}

// 自定义属性
function getCustomProperties(elements){
    const properties = {}
    elements.forEach((el) => {
        const key = el.getAttribute('data-props-key');
        const value = el.getAttribute('data-props-value');
        if(!key){
            return;
        }
        properties[key] = value;
    })
    return properties;
}

export default class Track{
    constructor(){
        this.addDomEventHandlers(this.track);
    }
    track(event_name, properties, callback) {
        console.log(event_name, properties)
    }
    addDomEventHandlers(instance) {
        let handler = function(e) {
            e = e || window.event;
            this.trackEvent(e, instance);
        }.bind(this);

        register_event(document, 'submit', handler, false, true);
        register_event(document, 'change', handler, false, true);
        register_event(document, 'click', handler, false, true);
    }
    
    trackEvent(e, instance) {
        let target = getEventTarget(e);
        if (target.nodeType === Node.TEXT_NODE) {
            target = target.parentNode;
        }
        
        if (this.shouldTrackDomEvent(target, e)) {
            let targetElementList = [ target ];
            let curEl = target;

            while (curEl.parentNode && !isTag(curEl, 'body')) {
                targetElementList.push(curEl.parentNode);
                curEl = curEl.parentNode;
            }
            // 按照刚才记录的路径开始遍历（相当于自底向上）
            let elementsJson = [];
            let href;
            let elementText;
            let form;
            let explicitNoTrack = false;
            targetElementList.forEach((el, idx) => {
                // if the element or a parent element is an anchor tag
                // include the href as a property
                if (el.tagName.toLowerCase() === 'a') {
                    href = el.getAttribute('href');
                } else if (el.tagName.toLowerCase() === 'form') {
                    form = el;
                }
                // crawl up to max of 5 nodes to populate text content
                if (!elementText && idx < 5 && el.textContent) {
                    let textContent = el.textContent.trim();
                    if (textContent) {
                        elementText = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
                    }
                }
                // allow users to programatically prevent tracking of elements by adding class 'tv-no-track'
                let classes = getClassName(el).split(' ');
                if (classes.includes('tv-no-track')) {
                    explicitNoTrack = true;
                }
                // 读取每个标签的属性，最后这条路径上所有的标签都会被记录下来保存在elementsJson数组中
                elementsJson.push(getPropertiesFromElement(el));
            }, this);

            // 如果是一个开发者设置了不需要监测的标签，那么直接返回，不上报了
            if (explicitNoTrack) {
                return false;
            }
            let props = extend(
                getDefaultProperties(e.type),
                {
                    '$elements': elementsJson,
                    '$el_attr__href': href,
                    '$el_text': elementText
                },
                getCustomProperties(targetElementList)
            );
            if (form && (e.type === 'submit' || e.type === 'click')) {
                extend(props, getFormFieldProperties(form)); // 读取表单的一些属性
            }
            instance('$web_event', props);
            return true;
        }
    }
    shouldTrackDomEvent(element, event) {
        // html根节点下面的事件不需要监测
        if (!element || isTag(element, 'html') || element.nodeType !== Node.ELEMENT_NODE) {
            return false;
        }
        let tag = element.tagName.toLowerCase();
        switch (tag) {
            case 'html':
                return false;
            case 'form':
                return event.type === 'submit';
            case 'input':
                if (['button', 'submit'].indexOf(element.getAttribute('type')) === -1) {
                    return event.type === 'change';
                } else {
                    return event.type === 'click';
                }
            case 'select':
            case 'textarea':
                return event.type === 'change';
            default:
                return event.type === 'click';
        }
    }
}