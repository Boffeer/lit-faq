import { LitElement, html, css } from "./node_modules/lit/index.js";
/**
 * //TODO:
 *
 * - [ ] Возмложность выбирать цвет бордеров. Стандартный серый
 * - [ ] Возможность выбирать состояние — открыт / закрыт
 * - [ ] Возможность выбирать цвет кнопки закрыть
 * - [ ] Наполнение вставкой компонента question и answer
 * - [ ] Размеры по умолчанию отталкиваются от шрифта
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
      <article
        itemscope
        itemtype="http://schema.org/Question"
        class="bo-faq ${this.openedState}"
      >
        <div
          @click=${this.toggleFaq}
          class="bo-faq-question"
        >
          <h3
            itemprop="name"
            class="bo-faq-question__name"
          >${this.question}</h3>
          <button class="bo-faq-question__closer">×</button>
        </div>
        <div
          itemprop="acceptedAnswer"
          itemscope
          itemtype="http://schema.org/Answer"
          class="bo-faq-answer"
        >
          <p class="bo-faq-answer__text">${this.answer}</p>
        </div>
      </article>
    `;
  }

  static get properties() {
    return {
      isOpened: {
        attribute: 'is-opened'
      },
      question: {
        attribute: 'question'
      },
      answer: {
        attribute: 'answer'
      }
    };
  }

  firstUpdated() {
    const ANSWER = this.shadowRoot.querySelector('.bo-faq-question');

    if (this.isOpened === "true") {
      ANSWER.click();
    } else {}
  }

  toggleFaq() {
    if (this.isOpened) {
      this.openedState = this.openedClass;
      this.isOpened = !this.isOpened;
    } else {
      this.openedState = '';
      this.isOpened = !this.isOpened;
    }
  }

}
FaqDropdown.styles = css`
  .bo-faq {
    width: 100%;
    position: relative;
    border-bottom: 1px solid var(--bo-question-border, #dfdfdf);
  }
  .bo-faq.opened {
  }
  .bo-faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    font-family: inherit, "Arial", "Helvetica", sans-serif;
    cursor: pointer;
    background-color: var(--bo-question-bg, transparent);
    position: relative;
  }
  :host:first-child .bo-faq-question {
    border-top: var(--bo-question-border-width, 1px) solid var(--bo-question-border, #dfdfdf);
  }
  .bo-faq-question__name {
    font-size: var(--bo-question-fz, 24px);
    width: calc(100% - 50px);
    margin-top: var(--bo-question-mt, 1.5rem);
    margin-bottom: var(--bo-question-mb, 1rem);
  }
  .bo-faq-question__closer {
    width: var(--bo-question-closer-size, 30px);
    height: var(--bo-question-closer-size, 30px);
    font-family: "Arial", "Helvetica", sans-serif;
    font-weight: 700;
    font-size: 20px;
    position: absolute;
    top: 50%;
    right: 10px;
    cursor: pointer;
    border: none;
    border-radius: 100%;
    color: var(--bo-question-closer-color,#ffffff);
    background: var(--bo-question-closer-bg, #dfdfdf);
    transform: rotate(45deg) translateY(-50%);
    transition: 0.3s all;
  }
  .bo-faq.opened .bo-faq-question__closer {
    right: 0px;
    transform: translateY(-50%);
  }
  .bo-faq-answer {
    padding: 0;
    margin: auto;
    overflow: hidden;
    height: 0;
    padding: 0;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    transition: 0.2s all linear;
    background-color: var(--bo-answer-bg, transparent);
  }
  .bo-faq.opened .bo-faq-answer {
    padding: var(--bo-answer-padding, 1px 15px 15px 20px);
    opacity: 1;
    visibility: visible;
    height: auto;
    overflow: none;
  }
  .bo-faq-answer__text {
    transition: 0.2s all linear;
    font-size: var(--bo-answer-fz, 16px);
  }
`;
customElements.define('faq-dropdown', FaqDropdown);