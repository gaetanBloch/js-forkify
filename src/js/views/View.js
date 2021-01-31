// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';

class View {
  constructor(parentEl) {
    if (this.constructor === View) {
      throw new TypeError(
        'Abstract class "View" cannot be instantiated directly',
      );
    }

    this.parentEl = parentEl;
  }

  render(data) {
    this.data = data;
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', this.getHtml());
  }

  renderMessage() {
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', this.getMessageHtml());
  }

  renderError() {
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', this.getErrorHtml());
  }

  renderSpinner() {
    const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', html);
  }

  clear() {
    this.parentEl.innerHTML = '';
  }

  // Method to override
  // eslint-disable-next-line class-methods-use-this
  getHtml() {
    throw new Error('You must implement this function');
  }

  // Method to override
  // eslint-disable-next-line class-methods-use-this
  getMessageHtml() {
    throw new Error('You must implement this function');
  }

  // Method to override
  // eslint-disable-next-line class-methods-use-this
  getErrorHtml() {
    throw new Error('You must implement this function');
  }

  // Method to override
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  addHandler(handler) {
    throw new Error('You must implement this function');
  }
}

export default View;
