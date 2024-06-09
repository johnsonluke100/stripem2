// script.js
document.addEventListener('DOMContentLoaded', function () {
    const appId = 'sq0idp-IabmJBZAhm3VX-PNxvjWzQ';
    const locationId = 'YOUR_LOCATION_ID'; // Replace with your location ID
    const amountInput = document.getElementById('amount');
  
    document.querySelectorAll('.key').forEach(button => {
      button.addEventListener('click', () => {
        if (button.innerText === 'C') {
          amountInput.value = '0.00';
        } else {
          if (amountInput.value === '0.00') {
            amountInput.value = button.innerText;
          } else {
            amountInput.value += button.innerText;
          }
        }
      });
    });
  
    async function initializeCard(payments) {
      const card = await payments.card();
      await card.attach('#card-container');
      return card;
    }
  
    const payments = Square.payments(appId, locationId);
    initializeCard(payments).then(card => {
      const form = document.getElementById('payment-form');
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const result = await card.tokenize();
        if (result.status === 'OK') {
          document.getElementById('card-nonce').value = result.token;
          form.submit();
        } else {
          console.error('Tokenization failed');
        }
      });
    });
  });
  