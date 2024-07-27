const sms = '';
const PHONE_NUMBER = "1234567890";

exports.sendSMSNotification = (message) => {
  sms.send(
    {
      to: PHONE_NUMBER,
      message: message,
    },
    (err, response) => {
      if (err) {
        console.error("Failed to send SMS", err);
      } else {
        console.log("SMS sent successfully", response);
      }
    }
  );
};
