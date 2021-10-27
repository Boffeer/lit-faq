import {LitElement, html, css} from 'lit';

/**
 * //TODO:
 *
 * - [ ] Возмложность выбирать цвет бордеров. Стандартный серый
 * - [ ] Возможность выбирать состояние — открыт / закрыт
 * - [ ] Возможность выбирать цвет кнопки закрыть
 * - [ ] Наполнение вставкой компонента question и answer
 * - [ ] Размеры по умолчанию отталкиваются от шрифта
 * - [ ] Должна быть возможность передать объект со стилями в каждый из элементов 1 раз на этапе инициализации
 *
 *
 */


export class FaqDropdown extends LitElement {

  constructor() {
    super();
    this.openedClass = 'opened';
    this.openedState = '';
  }
  render() {
    return html`
      <article data-height=${this.maxAnswerHeight} class="bo-faq ${this.openedState}">
        <div @click=${this.toggleFaq} class="bo-faq-question">
          <h3 class="bo-faq-question__name">${this.question}</h3>
          <button class="bo-faq-question__closer">×</button>
        </div>
        <div class="bo-faq-answer">
          ${this.answer}
        </div>
      </article>
    `;
  }

  firstUpdated() {
    this.maxAnswerHeight = this.shadowRoot.querySelector('.bo-faq-answer').getClientRects()[0].height;
    const ANSWER = this.shadowRoot.querySelector('.bo-faq-question');
    if (this.isOpened) {
      ANSWER.click();
      ANSWER.click();
      console.log('opened')
    } else {
      ANSWER.click();
      console.log('closed')
    }

  }

  foldFaq(ANSWER, answerHeight) {
    if (this.isOpened) {
      this.openedState = this.openedClass;
      this.isOpened = !this.isOpened;

      for (let currentHeight = answerHeight; currentHeight != 0; --currentHeight) {
        ANSWER.style.height = `${currentHeight}px`;
      }
    } else {
      this.openedState = '';
      this.isOpened = !this.isOpened;

      for (let currentHeight = 0; currentHeight < this.maxAnswerHeight; ++currentHeight) {
        ANSWER.style.height = `${currentHeight}px`;
      }
    }
  }

  toggleFaq() {
    const ANSWER = this.shadowRoot.querySelector('.bo-faq-answer');
    let answerHeight = this.maxAnswerHeight + 0;

    this.foldFaq(ANSWER, answerHeight);


  }
}

FaqDropdown.properties = {
    isOpened: {attribute: 'is-opened'},
    question: {attribute: 'question'},
    answer: {attribute: 'answer'},
    // maxAnswerHeight: 0
}

FaqDropdown.styles = css`
  .bo-faq {
    width: 100%;
    position: relative;
  }
  .bo-faq.opened {
    background: red;
  }
  .bo-faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    font-family: inherit, "Arial", "Helvetica", sans-serif;
    cursor: pointer;
  }
  .bo-faq-question__name {
    width: calc(100% - 50px);
  }
  .bo-faq-question__closer {
    width: 30px;
    height: 30px;
    font-family: "Arial", "Helvetica", sans-serif;
    font-weight: 700;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    border: none;
    border-radius: 100%;
    color: #fff;
    transform: rotate(45deg);
    transition: 0.3s all;
  }
  .bo-faq.opened .bo-faq-question__closer {
    transform: none;
  }
  .bo-faq-answer {
    padding-top: 10px;
    overflow: hidden;
    height:auto;
    transition: 0.3s all;
  }
`;

customElements.define('faq-dropdown', FaqDropdown);
