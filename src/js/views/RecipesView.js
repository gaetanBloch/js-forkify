// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';

import View from './View';
import { getHash } from '../helpers';

class RecipesView extends View {
  constructor() {
    super(document.querySelector('.results'));
  }

  static getPreview(preview) {
    return `
    <li class="preview">
      <a 
        class="preview__link
          ${getHash() === preview.id ? 'preview__link--active' : ''}"
        href="#${preview.id}">
        <figure class="preview__fig">
          <img src="${preview.imageUrl}"/>
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${preview.title}</h4>
          <p class="preview__publisher">${preview.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }

  getHtml() {
    return this.data.map(RecipesView.getPreview).join('');
  }

  // eslint-disable-next-line class-methods-use-this
  addHandler(handler) {
    document.querySelector('.search__btn').addEventListener('click', handler);
  }
}

export default new RecipesView();
