const products = document.querySelectorAll('.product');
  const cartItems = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');

  const cart = {};

  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    const items = Object.values(cart).filter(item => item.quantity > 0);

    if (items.length === 0) {
      cartItems.innerHTML = '<p>No Product added to the cart</p>';
    } else {
      items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<span>${item.name}</span> <span>${item.quantity} × ${item.price}</span>`;
        cartItems.appendChild(cartItem);
      });
    }

    totalPriceElement.textContent = total;
  }

  products.forEach(product => {
    const productId = product.getAttribute('data-id'); 
    const productName = product.querySelector('span').textContent; 
    const productPrice = parseInt(product.getAttribute('data-price')); 
    const quantityElement = product.querySelector('.quantity'); 
    const incrementButton = product.querySelector('.increment'); 
    const decrementButton = product.querySelector('.decrement'); 

    cart[productId] = { id: productId, name: productName, price: productPrice, quantity: 0 };

    incrementButton.addEventListener('click', () => {
      cart[productId].quantity++;
      quantityElement.textContent = cart[productId].quantity;
      updateCart(); 
    });

    decrementButton.addEventListener('click', () => {
      if (cart[productId].quantity > 0) {
        cart[productId].quantity--;
        quantityElement.textContent = cart[productId].quantity;
        updateCart(); 
      }
    });
  });