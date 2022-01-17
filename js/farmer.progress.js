;(function($,window){
    var config = {
        type:'',
        width:0,
        words:['正在写','快了快了','马上好','再等下','下周一','明天吧'],
        name:'Troy',
        desc:'策划案',
        timer:500,
        flagText:'年年有大鱼'
    };
    function farmerProgress(options){
        options.width = options.that.parent().width();
        let outer = createElementWithClass('div','farmer-progress-outer');
        outer.style.width = options.width + 'px';
        let inner = createElementWithClass('div','farmer-progress-inner');
        inner.style.width = '123px';
        let man = createElementWithClass('div','man');
        let header = createElementWithClass('div','header');
        appendElement(header,createElementWithClass('div','eye left-eye'));
        appendElement(header,createElementWithClass('div','eye right-eye'));
        appendElement(header,createElementWithClass('div','mouth'));

        let leftArm = createElementWithClass('div','arm left-arm');
        appendElement(leftArm,createElementWithClass('div','line one'));
        appendElement(leftArm,createElementWithClass('div','line two'));

        let body = createElementWithClass('div','body')
        appendElement(body,createElementWithClass('div','line arm right-arm'));
        appendElement(body,leftArm);

        let foot = createElementWithClass('div','foot')
        appendElement(foot,createElementWithClass('div','line left-one'));
        appendElement(foot,createElementWithClass('div','line left-two'));
        appendElement(foot,createElementWithClass('div','line right-one'));
        appendElement(foot,createElementWithClass('div','line right-two'));

        appendElement(man,header);
        appendElement(man,body);
        appendElement(man,foot);
        let book = createElementWithClass('div','iconfont book');
        book.innerHTML = '&#xe602;';
        appendElement(man,book);
        let desc = createElementWithClass('div','desc');
        desc.innerHTML = options.desc;
        appendElement(man,desc);
        let name = createElementWithClass('div','name');
        name.innerHTML = options.name;
        appendElement(man,name);
        appendElement(man,createElementWithClass('div','name1'));
        appendElement(man,createElementWithClass('div','name2'));
        appendElement(man,createElementWithClass('div','name3'));
        let chuizi = createElementWithClass('div','farmer-progress-chuizi');
        appendElement(man,chuizi);
        let hitout = createElementWithClass('div','farmer-progress-hitout');
        appendElement(man,hitout);

        appendElement(inner,man);
        appendElement(inner,man);
        let bar = createElementWithClass('div','bar red');
        appendElement(inner,bar);
        appendElement(outer,inner);
        options.that.after(outer);

        man.addEventListener('click',function(e){
            chuizi.style.display = 'block';
            hitout.style.display = 'block';
            setTimeout(function(){
                name.innerHTML = options.words[parseInt(Math.random() * options.words.length)];
                chuizi.style.display = 'none';
                hitout.style.display = 'none';
            },300)
        });
        options.outer = outer;
        options.inner = inner;
        options.desc = desc;

        updateProgress(options);
    }

    function fishProgress(options){
        options.width = options.that.parent().width();
        let outer = createElementWithClass('div','farmer-progress-outer');
        outer.style.width = options.width + 'px';
        let inner = createElementWithClass('div','farmer-progress-inner');
        inner.style.width = '50px';


        let fish = createElementWithClass('div','iconfont fish');
        fish.innerHTML = '&#xe607;';
        appendElement(inner,fish);
        let flag = createElementWithClass('div','flag');
        flag.innerHTML = options.flagText;
        appendElement(inner,flag);
        var desc = createElementWithClass('div','desc');
        desc.innerHTML = '0%';
        desc.style.position = 'absolute';
        desc.style.right = '0px';
        desc.style.bottom = '20px';
        desc.style.width = '50px';
        desc.style.textAlign = 'center';
        desc.style.fontSize = '8px';
        desc.style.color = '#666';
        options.desc = desc;
        appendElement(inner,desc);
        appendElement(inner,createElementWithClass('div','bar red'));
        appendElement(outer,inner);
        options.outer = outer;
        options.inner = inner;
        options.flag = flag;
        options.that.after(outer);

        updateFishProgress(options)
    }

    function defaultProgress(options){
        options.width = options.that.parent().width();
        let outer = createElementWithClass('div','farmer-progress-outer');
        outer.style.width = options.width + 'px';
        let inner = createElementWithClass('div','farmer-progress-inner');
        inner.style.width = '50px';
        appendElement(inner,createElementWithClass('div','bar red'));
        var desc = createElementWithClass('div','desc');
        desc.innerHTML = '0%';
        desc.style.position = 'absolute';
        desc.style.right = '0px';
        desc.style.bottom = '2px';
        options.desc = desc;
        appendElement(inner,desc);
        appendElement(outer,inner);
        options.outer = outer;
        options.inner = inner;
        options.that.after(outer);

        updateDefaultProgress(options)
    }

    function updateProgress(options){
        setTimeout(function(){
            try {
                var val = options.callback();
                if(val > 100){
                    val = 100;
                    options.desc.innerHTML = val + '%';
                    setTimeout(function(){
                        $(options.outer).remove();
                    },500);
                    return;
                }
                options.desc.innerHTML = val + '%';
                $(options.inner).animate({width:123 + (options.width - 123) * val/100 + 'px'},options.timer-50);
            }catch (e) {
                console.log(e)
            }
            updateProgress(options);
        },options.timer);
    }

    function updateFishProgress(options){
        setTimeout(function(){
            try {
                var val = options.callback();
                if(val > 100){
                    val = 100;
                    options.desc.innerHTML = val + '%';
                    setTimeout(function(){
                        $(options.outer).remove();
                    },500);
                    return;
                }
                options.desc.innerHTML = val + '%';
                $(options.inner).animate({width:50 + (options.width -50) * val/100 + 'px'},options.timer-50);
            }catch (e) {
                console.log(e)
            }
            updateFishProgress(options);
        },options.timer);
    }

    function updateDefaultProgress(options){
        setTimeout(function(){
            try {
                var val = options.callback();
                if(val > 100){
                    val = 100;
                    options.desc.innerHTML = val + '%';
                    setTimeout(function(){
                        $(options.outer).remove();
                    },500);
                    return;
                }
                options.desc.innerHTML = val + '%';
                $(options.inner).animate({width:options.width * val/100 + 'px'},options.timer-50);
            }catch (e) {
                console.log(e)
            }
            updateDefaultProgress(options);
        },options.timer);
    }

    function createElementWithClass(eName,eClass){
        let element = document.createElement(eName);
        element.setAttribute("class",eClass);
        return element;
    }

    function appendElement(parent,child){
        parent.append(child);
    }
    $.fn.extend({
        progress:function(options,callback){
            var param = $.extend({that:this,callback:callback,type:'fish'},config,options);
            if(!document.getElementById('farmer-progress-css')){
                let link = document.createElement('link');
                link.href = 'https://dcs4569.github.io/css/farmer.progress.css';
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.id = 'farmer-progress-css';
                document.getElementsByTagName('head').item(0).append(link);
            }
            switch (param.type) {
                case "fish":
                    fishProgress(param);
                    break;
                case "farmer":
                    farmerProgress(param);
                    break;
                default:
                    defaultProgress(param);
                    break;
            }
        }
    });
})(jQuery,window);