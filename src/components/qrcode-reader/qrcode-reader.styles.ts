import { css } from 'lit';

export default css`
  :host {
    display: block;
    visibility: visible;
    width: 50vw;
    height: auto;
    object-fit: cover; // maintain the aspect ratio
  }
`;
