import React from 'react';

const ProductsList = ({ category = "" }) => {
  
  const products = [
    { id: 1, name: 'Redmi', category: 'Mobiles',Quantity:1 },
    { id: 2, name: 'Oneplus', category: 'Mobiles', Quantity:1},
    { id: 3, name: 'HP', category: 'Laptops',Quantity:2 },
    { id: 4, name: 'Dell', category: 'Laptops', Quantity:1},
    { id: 5, name: 'Western', category: 'Clothing',Quantity:2 },
    { id: 6, name: 'Sarees', category: 'Clothing',Quantity:3 },
  ];

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <table style={{ width: '50%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product, index) => (
          <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#a0a0a0' : '#f2f2f2' }}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.Quantity}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsList;