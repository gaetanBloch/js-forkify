// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';

import View from './View';
import { RECIPES_PER_PAGE } from '../config';

class PaginationView extends View {
  constructor() {
    super(document.querySelector('.pagination'));
  }

  getHtml() {
    const curPage = this.data.page;
    const totalPages = Math.ceil(this.data.recipes.length / RECIPES_PER_PAGE);

    // Page 1, and there are other pages
    if (curPage === 1 && totalPages > 1) {
      return `
      <button data-goto="${curPage + 1}"
       class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
    `;
    }

    // Last Page
    if (curPage === totalPages) {
      return `
      <button data-goto="${curPage - 1}"
       class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button> 
      `;
    }

    // Other Pages
    if (curPage < totalPages) {
      return `
      <button data-goto="${curPage - 1}"
       class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button> 
      <button data-goto="${curPage + 1}"
       class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
      `;
    }

    // One page no other pages
    return '';
  }

  addHandler(handler) {
    this.parentEl.addEventListener('click', (event) => {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new PaginationView();
