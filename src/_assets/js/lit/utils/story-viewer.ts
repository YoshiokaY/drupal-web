import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PropertyValues } from "lit-element";
import "hammerjs";
import menu from "../json/menu.json";

@customElement("story-viewer")
export class StoryViewer extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      /* Default size */
      width: 100%;
      height: 320px;
      overflow: hidden;
    }
    ::slotted(*) {
      position: absolute;
      width: 100%;
      height: calc(100% - 20px);
      transition: transform 0.35s ease-out;
    }
    svg {
      position: absolute;
      top: calc(50% - 25px);
      height: 50px;
      cursor: pointer;
    }
    #arrow_next {
      right: 0;
      transform: rotate(180deg);
    }
    #arrow_btn {
      left: 0;
    }
  `;

  @state() _panData: { isFinal?: boolean; deltaX?: number } = {};

  constructor() {
    super();
    this.index = 0;
    new Hammer(this).on("pan", (e: HammerInput) => (this._panData = e));
  }

  @property({ type: Number }) index: number = 0;

  @property()
  altar: number = 0;
  discount: number = 0;
  flag: string = "";

  /** Advance to the next story card if possible **/
  next() {
    this.index = Math.max(
      0,
      Math.min(this.children.length - 1, this.index + 1)
    );
  }

  /** Go back to the previous story card if possible **/
  previous() {
    this.index = Math.max(
      0,
      Math.min(this.children.length - 1, this.index - 1)
    );
  }

  // Update is called whenever an observed property changes.
  update(changedProperties: PropertyValues) {
    // deltaX is the distance of the current pan gesture.
    // isFinal is whether the pan gesture is ending.
    let { deltaX = 0, isFinal = false } = this._panData;
    // When the pan gesture finishes, navigate.
    if (!changedProperties.has("index") && isFinal) {
      deltaX > 0 ? this.previous() : this.next();
    }
    // We don't want any deltaX when releasing a pan.
    deltaX = isFinal ? 0 : deltaX;
    const width = this.clientWidth;
    Array.from(this.children).forEach((el: Element, i) => {
      // Updated this line to utilize deltaX.
      const x = (i - this.index) * width + deltaX;
      (el as HTMLElement).style.transform = `translate3d(${x}px,0,0)`;
    });

    const altar = this.flag === "C" ? menu.data.general : menu.data.smart;

    const altarNames = altar
      .map(function (row) {
        return [row["price"]];
      })
      .reduce(function (a, b) {
        return a.concat(b);
      });

    const discountArray = altar
      .map(function (row) {
        return [row["discount"]];
      })
      .reduce(function (a, b) {
        return a.concat(b);
      });

    this.altar =
      this.index === 0
        ? altarNames[0]
        : this.index === 1
        ? altarNames[1]
        : this.index === 2
        ? altarNames[2]
        : 0;

    this.discount =
      this.index === 0
        ? discountArray[0]
        : this.index === 1
        ? discountArray[1]
        : this.index === 2
        ? discountArray[2]
        : 0;
    const optionPrice = this.altar;
    this.dispatchEvent(
      new CustomEvent("price-changed", {
        detail: { altar: optionPrice, discount: this.discount },
      })
    );
    super.update(changedProperties);
  }

  render() {
    return html`
      <slot></slot>
      ${this.index !== 0
        ? html`
            <svg
              id="arrow_btn"
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              @click=${() => this.previous()}
            >
              <g
                id="arrow_btn-2"
                data-name="arrow_btn"
                transform="translate(80 80) rotate(180)"
              >
                <circle
                  id="楕円形_357"
                  data-name="楕円形 357"
                  cx="40"
                  cy="40"
                  r="40"
                  transform="translate(0 0)"
                  fill="#cb708e"
                />
                <path
                  id="パス_3374"
                  data-name="パス 3374"
                  d="M3.886,0,0,3.886,12.622,16.535,0,29.184,3.886,33.07,20.421,16.535Z"
                  transform="translate(29.579 23.93)"
                  fill="#fff"
                />
              </g>
            </svg>
          `
        : html``}
      ${this.index !== this.children.length - 1
        ? html`
            <svg
              id="arrow_next"
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              @click=${() => this.next()}
            >
              <g
                id="arrow_btn-2"
                data-name="arrow_next"
                transform="translate(80 80) rotate(180)"
              >
                <circle
                  id="楕円形_357"
                  data-name="楕円形 357"
                  cx="40"
                  cy="40"
                  r="40"
                  transform="translate(0 0)"
                  fill="#cb708e"
                />
                <path
                  id="パス_3374"
                  data-name="パス 3374"
                  d="M3.886,0,0,3.886,12.622,16.535,0,29.184,3.886,33.07,20.421,16.535Z"
                  transform="translate(29.579 23.93)"
                  fill="#fff"
                />
              </g>
            </svg>
          `
        : html``}
    `;
  }
}
