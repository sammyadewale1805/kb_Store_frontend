import React, { useState } from 'react';
import { useCart } from './CartContext';
import '../../styles/CartCheckOut.css'

// Define types for the checkout form
interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit-card' | 'paypal' | 'bank-transfer';
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
}

const Checkout: React.FC = () => {
  const { items, getCartTotal, removeFromCart, updateQuantity } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card',
  });
  const [step, setStep] = useState<'cart-review' | 'shipping' | 'payment' | 'confirmation'>('cart-review');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle quantity updates
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, Math.min(newQuantity, 10)); // Limit to 10 as in your cart logic
    }
  };

  // Process payment and complete order
  const processOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate API call to process payment and create order
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On success, move to confirmation
      setOrderComplete(true);
      setStep('confirmation');
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Render the cart review step
  const renderCartReview = () => (
    <div className="checkout-section cart-review">
      <h2>Review Your Cart</h2>
      
      {items.length === 0 ? (
        <p>Your cart is empty. Please add items before checkout.</p>
      ) : (
        <>
          <div className="cart-items-checkout">
            {items.map(item => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size} | Color: {item.color}</p>
                  <p className="item-price">{item.price}</p>
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-subtotal">
                  {`$${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}`}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary-checkout">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={() => setStep('shipping')}
              className="continue-btn"
            >
              Continue to Shipping
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Render the shipping information step
  const renderShippingInfo = () => (
    <div className="checkout-section shipping-info">
      <h2>Shipping Information</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select 
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            {/* Add more countries as needed */}
          </select>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => setStep('cart-review')}
            className="back-btn"
          >
            Back to Cart
          </button>
          <button 
            type="button" 
            onClick={() => setStep('payment')}
            className="continue-btn"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );

  // Render the payment step
  const renderPayment = () => (
    <div className="checkout-section payment-info">
      <h2>Payment Information</h2>
      <form onSubmit={processOrder}>
        <div className="form-group">
          <label>Payment Method</label>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={formData.paymentMethod === 'credit-card'}
                onChange={handleChange}
              />
              <span>Credit Card</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleChange}
              />
              <span>PayPal</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="bank-transfer"
                checked={formData.paymentMethod === 'bank-transfer'}
                onChange={handleChange}
              />
              <span>Bank Transfer</span>
            </label>
          </div>
        </div>
        
        {formData.paymentMethod === 'credit-card' && (
          <>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber || ''}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardExpiry">Expiration Date</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry || ''}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardCVC">CVC</label>
                <input
                  type="text"
                  id="cardCVC"
                  name="cardCVC"
                  value={formData.cardCVC || ''}
                  onChange={handleChange}
                  placeholder="XXX"
                  required
                />
              </div>
            </div>
          </>
        )}
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>$5.99</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(getCartTotal() + 5.99 + getCartTotal() * 0.08).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => setStep('shipping')}
            className="back-btn"
            disabled={isProcessing}
          >
            Back to Shipping
          </button>
          <button 
            type="submit" 
            className="place-order-btn"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );

  // Render the confirmation step
  const renderConfirmation = () => (
    <div className="checkout-section confirmation">
      <div className="confirmation-content">
        <div className="confirmation-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <p>Order #: {Math.floor(Math.random() * 1000000)}</p>
        <p>A confirmation email has been sent to {formData.email}.</p>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="continue-shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  // Render the appropriate step
  return (
    <div className="checkout-container">
      {!orderComplete && (
        <div className="checkout-steps">
          <div className={`step ${step === 'cart-review' ? 'active' : ''}`}>
            1. Review Cart
          </div>
          <div className={`step ${step === 'shipping' ? 'active' : ''}`}>
            2. Shipping
          </div>
          <div className={`step ${step === 'payment' ? 'active' : ''}`}>
            3. Payment
          </div>
          <div className={`step ${step === 'confirmation' ? 'active' : ''}`}>
            4. Confirmation
          </div>
        </div>
      )}
      
      <div className="checkout-content">
        {step === 'cart-review' && renderCartReview()}
        {step === 'shipping' && renderShippingInfo()}
        {step === 'payment' && renderPayment()}
        {step === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
};

export default Checkout;