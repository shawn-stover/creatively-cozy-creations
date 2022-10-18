// Imports
import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false, error: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function CreateProductScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingCreate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [productName, setProductName] = useState('');
  const [productSlug, setProductSlug] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCountInStock, setProductCountInStock] = useState('');

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      await axios.post(
        '/api/products/create',
        {
          name: productName,
          slug: productSlug,
          image: productImage,
          category: productCategory,
          description: productDescription,
          price: productPrice,
          countInStock: productCountInStock,
          rating: 0,
          numReviews: 0,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      dispatch({
        type: 'CREATE_FAIL',
        payload: getError(err),
      });
      toast.error(getError(err));
    }
  };

  const createSlug = (e) => {
    e.preventDefault();
    try {
      if (productName) {
        dispatch({ type: 'CREATE_REQUEST' });
        let slugText = document.getElementById('productName').value;
        let lowercase = slugText.toLowerCase();
        slugText = lowercase.split(' ').join('-');
        setProductSlug(slugText);
        dispatch({ type: 'CREATE_SUCCESS' });
        toast.success('URL created successfully!');
      } else {
        toast.error('Please enter a product name!');
      }
    } catch (err) {
      dispatch({
        type: 'CREATE_FAIL',
        payload: getError(err),
      });
      toast.error(getError(err));
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('Image Uploaded Successfully!');
      setProductImage(data.secure_url);
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Create Product</title>
      </Helmet>
      {/* Margin 3 on top and bottom */}
      <h1 className="my-3">Create Product</h1>
      <Form onSubmit={createHandler}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productSlug">
          <Button onClick={createSlug}>Create Product URL</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>URL</Form.Label>
          <Form.Control
            value={productSlug}
            onChange={(e) => setProductSlug(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="productImage">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={uploadFileHandler} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Category</Form.Label>
          <Form.Control
            required
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            required
            onChange={(e) => setProductCountInStock(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={loadingCreate} onClick={createHandler}>
            Create Product
          </Button>
        </div>
        <div className="mb-3">
          {loadingCreate && <LoadingBox></LoadingBox>}
          {loadingUpload && <LoadingBox></LoadingBox>}
        </div>
      </Form>
    </Container>
  );
}
