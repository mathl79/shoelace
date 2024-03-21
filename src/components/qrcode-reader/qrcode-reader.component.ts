/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

//import QrScanner from "../qr-scanner.min.js";

import * as QrScanner from 'qr-scanner';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import componentStyles from '../../styles/component.styles.js';

import ShoelaceElement from '../../internal/shoelace-element.js';
import SlButton from '../button/button.js';
import styles from './qrcode-reader.styles.js';

import type { CSSResultGroup } from 'lit';

/**
 * @summary show Camera Captured video and scan for qrcodes.
 * @documentation https://shoelace.style/components/qrcode-reader
 * @status experimental
 * @since 2.0
 *
 * @dependency QrScanner github:exetico/qr-scanner  modified fork for shadowDOM
 *
 * @event sl-finish - Emitted when the QR code is detected successfully
 * @event sl-error - Emitted when the QR code detection failed
 * @event sl-start - Emitted when the capture and scan is started
 * @event sl-cancel - Emitted when the capture and scan is stopped
 *
 * @slot - The default slot shows the camera image.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */

export default class SlQrcodeReader extends ShoelaceElement {
  constructor() {
    super();
  }

  static styles: CSSResultGroup = [componentStyles, styles];

  @query('#video-source')
  videoElement!: HTMLVideoElement;

  static dependencies = {
    'sl-button': SlButton
  };

  @property() QrCode = '';

  @state() running = false;

  private qrResult: QrScanner.ScanResult = { data: '', cornerPoints: [] };

  private qrScanner!: QrScanner.QrScanner;

  firstUpdated(): void {
    const onDecode = (result: QrScanner.ScanResult) => {
      this.qrResult.data = result.data;
      this.QrCode = result.data;
      this.emit('sl-finish');
    };

    const onDecodeError = (error: string | Error) => {
      this.qrResult.data = error.toString();
      this.emit('sl-error');
    };

    const options = {
      onDecodeError: onDecodeError,
      //calculateScanRegion: null,
      preferredCamera: 'environment', // or a deviceId string
      maxScansPerSecond: 30,
      highlightScanRegion: true,
      highlightCodeOutline: true,
      //overlay: null,
      returnDetailedScanResult: true,
      domTarget: this.shadowRoot // a HTMLDivElement
    };
    this.qrScanner = new QrScanner.QrScanner(this.videoElement, onDecode, options);
  }

  toggleScanner(): void {
    this.running = !this.running;
    if (this.qrScanner) {
      if (this.running) {
        this.qrScanner.start();
        this.emit('sl-start');
      } else {
        this.qrScanner.stop();
        this.emit('sl-cancel');
      }
    }
  }

  render() {
    return html`
      <div>
        <video id="video-source" style="visibility: visible; display:flex; object-fit: fill; width: 100%;"></video>
        <sl-button @click="${this.toggleScanner}"> ${this.running ? 'Stop' : 'Start'} </sl-button>
        Code:${this.QrCode}
      </div>
    `;
  }
}
