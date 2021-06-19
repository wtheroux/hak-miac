import {getResources} from '../services/service';

function cards() {

        class MenuCard {
            constructor (image, title, product_type, id, price, parentSelector, ...classes) {
                this.image = image;
                this.id = id;
                this.title = title;
                this.product_type = product_type;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
            }
    
            render() {
                const elem = document.createElement('div');
    
                if (this.classes.length === 0) {
                    this.classes = "menu__item";
                    elem.classList.add(this.classes);
                } 
                else 
                    this.classes.forEach(className => elem.classList.add(className));
    
                elem.innerHTML = `
                    <img src=${this.image} alt="картинка">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.product_type}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день
                        </div>
                    </div>`;
    
                 this.parent.append(elem);
            }
        }
    
        getResources('http://localhost:3000/menu')
          .then(data => {
              data.forEach(({image, id, title, product_type, price}) => {
                  new MenuCard(image, title, product_type, price, id, "products__shell").render();
              });
          });    
}

export default cards;