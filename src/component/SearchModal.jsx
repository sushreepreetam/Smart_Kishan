import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from './cartSlice';

function SearchModal({ showModal, handleClose, searchResults }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  
  const isInCart = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg"  style={{height:"400px"}}>
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <div>
            {searchResults.length > 0 ? (
              searchResults.map(product => {
                const cartItem = isInCart(product.id); 
                return (
                  <div className="mb-3" key={product.id}>
                    <div className="row">
                      <div className="col-2 border border-dark-subtle">
                        <img src={product.src} alt={product.name} className="card-img-top" />
                      </div>
                      <div className="col-5 text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: &#8377;{product.price}</p>
                        <p className="card-text">Weight: {product.weight}</p>
                      </div>
                      <div className="col-5 text-center">
                        {cartItem ? (
                          
                          <div>
                            <button className="btn btn-danger" onClick={() => handleDecrementQuantity(cartItem.id)}>-</button>
                            <span className="mx-3">{cartItem.quantity}</span>
                            <button className="btn btn-success" onClick={() => handleIncrementQuantity(cartItem.id)}>+</button>
                          </div>
                        ) : (
                         
                          <Button className='btn btn-success' onClick={() => handleAddToCart(product)}>
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <p>No results found</p>
              </div>
            )}
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;
