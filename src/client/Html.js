/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const Html = ({ body, styles, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <title>${title}</title>
      ${styles}
    </head>
    <body style="margin:0;background:#333;color:#fff;">
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default Html;