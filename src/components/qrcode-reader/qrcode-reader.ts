import SlQrcodeReader from './qrcode-reader.component.js';

export * from './qrcode-reader.component.js';
export default SlQrcodeReader;

SlQrcodeReader.define('sl-qrcode-reader');

declare global {
  interface HTMLElementTagNameMap {
    'sl-qrcode-reader': SlQrcodeReader;
  }
}
