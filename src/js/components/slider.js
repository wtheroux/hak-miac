 // Слайдер

function slider({container, slide, nextArrow, prevArrow, totalCounter, curentCounter, wrapper, field}) {

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(curentCounter),
          slidesWrapper = document.querySelector(wrapper),
          width = window.getComputedStyle(slidesWrapper).width,
          slidesField = document.querySelector(field);

    if (slides.length < 10) {
        total.textContent = `${slides.length}`;
        current.textContent =  `${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => slide.style.width = width);
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`;

        if (i == 0)
            dot.style.opacity = 1;
        indicators.append(dot);
        dots.push(dot);
    }

    function dotsStyle () {
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == (+width.replace(/\D/g, '') * (slides.length - 1)))
            offset = 0;
        else
            offset += +width.replace(/\D/g, '');

        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length)
            slideIndex = 1;
        else
            slideIndex++;

        current.textContent = slideIndex;
        dotsStyle();
    });

    prev.addEventListener('click', () => {
        if (offset == 0)
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        else
            offset -= +width.replace(/\D/g, '');
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1)
            slideIndex = slides.length;
        else
            slideIndex--;
        
        current.textContent = slideIndex;
        dotsStyle();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            current.textContent = slideIndex;
            dotsStyle();
        })
    });
}

export default slider;