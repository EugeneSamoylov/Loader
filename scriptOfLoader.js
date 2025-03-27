const validWhere = ["beforebegin", "afterbegin", "beforeend", "afterend"];

export function addLoader(elemToAddLoader, where){
    if(!validWhere.includes(where)){
        throw new Error(`Not valid "where": ${where}`);
    }
    if(!elemToAddLoader){
        throw new Error('elemToAddLoader is not exist');
    }

    const uniqueId = Math.random().toString(36);

    let loaderHTML = `
    <article class="container" aria-label="Loader" id="container-${uniqueId}">
        <section class="loader" aria-label="Loader circle">
            <div class="square" id="loader-${uniqueId}"></div>
        </section>

        <section class="states" aria-label="Loading control">
            <div class="lines">
                <input type="text" maxlength="3" autocomplete="off" class="value" id="value-${uniqueId}" aria-label="Input percent of loading">
                <div>Value</div>
            </div>
            <div class="lines">
                <div class="toggle">
                    <input type="checkbox" id="animate-${uniqueId}" class="input-toggle">
                    <label for="animate-${uniqueId}" class="label-toggle">Animate toggle</label>
                </div>
                <div>Animate</div>
            </div>
            <div class="lines">
                <div class="toggle">
                    <input type="checkbox" id="hide-${uniqueId}" class="input-toggle">
                    <label for="hide-${uniqueId}" class="label-toggle">Hide toggle</label>
                </div>
                <div>Hide</div>
            </div>
        </section>
    </article>`

    elemToAddLoader.insertAdjacentHTML(where, loaderHTML);

    const input = document.getElementById(`value-${uniqueId}`);
    const loader = document.getElementById(`loader-${uniqueId}`);
    const animate = document.getElementById(`animate-${uniqueId}`);
    const hide = document.getElementById(`hide-${uniqueId}`);

    input.addEventListener('input', load);
    animate.addEventListener('click', animateLoader);
    hide.addEventListener('click', hideLoader);

    let isHide = false;
    function hideLoader(){
        if(!isHide){
            loader.style.visibility = 'hidden';
            input.readOnly = true;
            animate.disabled = true;
            isHide = true;
        } else {
            loader.style.visibility = '';
            input.readOnly = false;
            animate.disabled = false;
            isHide = false;
        }
    }

    let isAnimated = false;
    function animateLoader(){
        if(!isAnimated){
            loader.classList.add('rotate');
            isAnimated = true;
        } else {
            isAnimated = false;
            loader.classList.remove('rotate');
        }
    }

    function load(){
        const string = input.value;
        const clearStr = string.split('').filter(char => !isNaN(char) && char !== ' ').join('');
        input.value = clearStr;

        let value = +input.value;
        const length = input.value.length;

        if(value > 1 && length > 2 && value !== 100 && input.value.slice(0, 1) !== '0'){
            input.value = input.value.slice(0, 2);
            value = +input.value;
        } else if(input.value.slice(0, 1) === '0'){
            input.value = input.value.slice(0, 1);
            loader.style.setProperty('--clip-path', '');
            return;
        }

        if(input.value === ''){
            loader.style.setProperty('--clip-path', '');
            return;
        }

        const clipPath = clipPathGenerate(value);

        loader.style.setProperty('--clip-path', clipPath);
    }

    return uniqueId;
}

export function setProgress(uniqueId, value = 0){
    if(value < 0 || value > 100 || isNaN(value)){
        throw new Error(`Value is not valid: ${value}`);
    } 
    const input = document.getElementById(`value-${uniqueId}`);
    const loader = document.getElementById(`loader-${uniqueId}`);

    input.value = value;

    const clipPath = clipPathGenerate(+value);

    loader.style.setProperty('--clip-path', clipPath);
}


export function removeLoader(uniqueId){
    document.getElementById(`container-${uniqueId}`).remove();
}

export function animateLoader(uniqueId){
    const animate = document.getElementById(`animate-${uniqueId}`);
    if(animate.checked) return;
    const eventClickOnAnimate = new Event('click');
    animate.dispatchEvent(eventClickOnAnimate);
    animate.checked = true;
}

export function stopAnimateLoader(uniqueId){
    const animate = document.getElementById(`animate-${uniqueId}`);
    if(!animate.checked) return;
    const eventClickOnAnimate = new Event('click');
    animate.dispatchEvent(eventClickOnAnimate);
    animate.checked = false;
}

function clipPathGenerate(value){
    let clipPath, progress;
    if (value <= 25) {
        progress = value / 25;
        clipPath = `polygon(50% 50%, 0 0, ${progress * 100}% 0, ${progress * 100}% 0, ${progress * 100}% 0, ${progress * 100}% 0)`;
    } 
    else if (value <= 50) {
        progress = (value - 25) / 25;
        clipPath = `polygon(50% 50%, 0 0, 100% 0, 100% ${progress * 100}%, 100% ${progress * 100}%, 100% ${progress * 100}%)`;
    } 
    else if (value <= 75) {
        progress = (value - 50) / 25;
        clipPath = `polygon(50% 50%, 0 0, 100% 0, 100% 100%, ${100 - progress * 100}% 100%, ${100 - progress * 100}% 100%)`;
    } 
    else {
        progress = (value - 75) / 25;
        clipPath = `polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - progress * 100}%)`;
    }
    return clipPath;
}