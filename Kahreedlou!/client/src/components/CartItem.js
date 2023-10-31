import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCartContext } from '../context/Cartcontext';
import { Table, Image, Button } from 'react-bootstrap';
import '../styles/CartItem.css';

const CartItem = ({ id, name, selectedColor, images, amount, price }) => {
  const { RemoveItem } = useCartContext();

  // Calculate the discounted price (10% discount)
  const discountPercentage = 10;
  const discountedPrice = price - (price * discountPercentage) / 100;

  // Format the prices with currency symbol and decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return (
    <Table responsive className='container'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Item</th>
          <th>Color</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Discounted Price</th>
          <th>Total Price</th>
          <th>Total Discounted Price</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Image src={images} alt={id} style={{ width: '100px', height: '100px' }} fluid />
          </td>
          <td>{name}</td>
          <td>
            <div style={{ backgroundColor: selectedColor, width: '30px', height: '30px' }}></div>
          </td>
          <td>{amount}</td>
          <td>{formattedPrice.format(price)}</td>
          <td>{formattedPrice.format(discountedPrice)}</td>
          <td>{formattedPrice.format(amount * price)}</td>
          <td>{formattedPrice.format(amount * discountedPrice)}</td>
          <td>
            <Button variant="danger" onClick={() => RemoveItem(id)}>
              <RiDeleteBin6Line />
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CartItem;
