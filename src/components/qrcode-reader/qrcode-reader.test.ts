import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-qrcode-reader>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-qrcode-reader></sl-qrcode-reader> `);

    expect(el).to.exist;
  });
});
