module.exports = ({ emailFrom, downloadLink, size, expires }) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CareShare Email</title>
    <style>
      body {
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        background-color: #f5f7fa;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      }
      .header {
        background-color: #2d89ef;
        padding: 20px;
        text-align: center;
        color: white;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px;
        color: #333333;
      }
      .content h2 {
        color: #2d89ef;
        font-size: 20px;
      }
      .button {
        display: inline-block;
        background-color: #2d89ef;
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        margin-top: 20px;
      }
      .footer {
        background-color: #f0f0f0;
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #777777;
      }
      .footer a {
        color: #2d89ef;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>CareShare</h1>
      </div>
      <div class="content">
        <h2>Hello,</h2>
        <p>
          <strong>${emailFrom}</strong> has shared a file with you via <strong>CareShare</strong>.
        </p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Expires in:</strong> ${expires}</p>
        <a href="${downloadLink}" class="button">Download File</a>
        <p style="margin-top: 30px;">
          If you have any questions, feel free to contact our support team.
        </p>
        <p>Thank you,<br /><strong>The CareShare Team</strong></p>
      </div>
      <div class="footer">
        © 2025 CareShare Inc. All rights reserved.<br />
        <a href="https://careshare.com/privacy">Privacy Policy</a> |
        <a href="https://careshare.com/support">Support</a>
      </div>
    </div>
  </body>
</html>
  `;
};
