import sonyWirelessHeadphones from './images/sonywirelessheadphones.jpeg';
import samsungsmarttv from './images/samsungsmarttv.jpeg';
import applemacbookpro from './images/applemacbookpro.jpeg';
import canondslrcamera from './images/canondslrcamera.jpeg';
const data = {
  products: [
    {
      _id: '1',
      name: 'Sony Wireless Headphones',
      slug: 'sony-wireless-headphones',
      category: 'Electronics',
      image: sonyWirelessHeadphones,
      price: 199,
      countInStock: 8,
      brand: 'Sony',
      rating: 4.8,
      color: 'black',
      numReviews: 15,
      offer: 70,
      description: 'High-quality wireless headphones with noise cancellation.',
    },
    {
      _id: '2',
      name: 'Samsung 4K Smart TV',
      slug: 'samsung-4k-smart-tv',
      category: 'Electronics',
      image: samsungsmarttv,
      price: 899,
      countInStock: 3,
      brand: 'Samsung',
      rating: 4.6,
      color: 'black',
      numReviews: 20,
      offer: 80,
      description:
        '55-inch 4K UHD Smart TV with HDR and Smart Hub functionality.',
    },
    {
      _id: '3',
      name: 'Apple MacBook Pro',
      slug: 'apple-macbook-pro',
      category: 'Electronics',
      image: applemacbookpro,
      price: 1799,
      countInStock: 10,
      brand: 'Apple',
      rating: 4.9,
      color: 'black',
      numReviews: 25,
      offer: 40,
      description:
        '13-inch MacBook Pro with M1 chip and stunning Retina display.',
    },
    {
      _id: '4',
      name: 'Canon DSLR Camera Kit',
      slug: 'canon-dslr-camera-kit',
      category: 'Electronics',
      image: canondslrcamera,
      price: 1299,
      countInStock: 5,
      brand: 'Canon',
      rating: 4.7,
      color: 'black',
      numReviews: 18,
      offer: 55,
      description:
        'Professional DSLR camera with multiple lenses and accessories.',
    },
  ],
};
export default data;
