// import { call, put } from 'redux-saga/effects';
// import Actions from '../actions/creators';


// export function* getProducts(api) {
//   // make the call to the api
//   const response = yield call(api.getAllProducts);
//     // check if response is success
//   if (response.ok) {
//       // dispatch successful receiving children
//     yield put(Actions.receiveProducts(response.data));
//   } else {
//     // dispatch failure
//     console.log('Error');
//   }
// }

// export function* getProduct(api, action) {
//   const { productId } = action;
//   // make the call to the api
//   const response = yield call(api.getProduct, productId);
//     // check if response is success
//   if (response.ok) {
//       // dispatch successful receiving children
//     yield put(Actions.receiveProduct(response.data));
//   } else {
//     // dispatch failure
//     console.log('Error');
//   }
// }


// export function* getLast5Products(api) {
//   // make the call to the api
//   const response = yield call(api.getLast5Products);
//     // check if response is success
//   if (response.ok) {
//       // dispatch successful receiving children
//     yield put(Actions.receiveLast5Products(response.data));
//   } else {
//     // dispatch failure
//     console.log('Error');
//   }
// }

// export function* addProducts(api, action) {
//   const { newProduct } = action;
//   // make the call to the api
//   const response = yield call(api.addProducts, newProduct);
//     // check if response is success
//   if (response.ok) {
//       // dispatch successful receiving children
//     yield put(Actions.receiveAddProducts(response.data));
//     yield put(Actions.requestProducts());
//   } else {
//     // dispatch failure
//     console.log('Error');
//   }
// }

// export function* updateProducts(api, action) {
//   const { updateProduct, productId } = action;
//   // make the call to the api
//   const response = yield call(api.updateProduct, updateProduct, productId);
//     // check if response is success
//   if (response.ok) {
//       // dispatch successful receiving children
//     yield put(Actions.receiveUpdateProducts(response.data));
//     yield put(Actions.requestProducts());
//   } else {
//     // dispatch failure
//     console.log('Error');
//   }
// }

// export function* deleteProduct(api, action) {
//   const { productId } = action;
//   // make the call to the api
//   const response = yield call(api.deleteProduct, productId);
//     // check if response is success
//   if (response.ok) {
//       // dispatch successful receiving children
//     yield put(Actions.receiveDeleteProducts(response.data));
//     yield put(Actions.requestProducts());
//     yield put(Actions.requestLast5Products());
//   } else {
//     // dispatch failure
//     console.log('Error');
//   }
// }



/////////////////**************************************************************************** */
import { put, takeEvery, all, call } from 'redux-saga/effects'
import Swal from 'sweetalert2'
import {
  ADD_PRODUCT,
  BEGIN_PRODUCTS_DOWNLOAD,
  RETRIEVE_PRODUCT_DELETE,
  BEGIN_EDIT_PRODUCT,
} from '../types'

import {
  downloadProductsOkAction,
  downloadProductsErrorAction,
  addProductOkAction,
  addProductErrorAction,
  deleteProductOkAction,
  deleteProductErrorAction,
  editProductOkAction,
  editProductErrorAction
} from '../actions/products-actions'

import {
  retrieveProductsDB,
  addProductDB,
  deleteProductDB,
  editProductDB
} from '../api-calls'

// Retrieve products
// worker saga
function* retrieveProducts() {
  try {
    const {data} = yield call(retrieveProductsDB)
    yield downloadProductsOkAction(data)
  } catch (error) {
    yield put(downloadProductsErrorAction())
  }
}

// watcher saga
function* retrieveProductsSaga() {
  yield takeEvery(BEGIN_PRODUCTS_DOWNLOAD, retrieveProducts)
}


// Create new product
// worker saga
function* addProduct(action) {
  const product = action.product
  try {
    yield call(addProductDB, product)
   /* const response = await axiosClient.post('/products', product)*/
    yield addProductOkAction(product) // download actualized products
      // Alert
    Swal.fire({
      title: 'Added!',
      text: 'The product has been added successfully',
      icon: 'success',
      confirmButtonColor: '#62a086'
    })
  } catch (error) {
    yield addProductErrorAction(true)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error ocurred. Please, try it again.'
    })
  }
}

// watcher saga
function* addProductSaga() {
  yield takeEvery(ADD_PRODUCT, addProduct)
}


// Delete product
// worker saga
function* deleteProduct(action) {
  const id = action.payload
  try {
    yield call(deleteProductDB, id)
    yield deleteProductOkAction()
    Swal.fire({
      title: 'Deleted!',
      text: 'The product has been deleted.',
      icon: 'success',
      confirmButtonColor: '#62a086'
    })
  } catch (error) {
    yield deleteProductErrorAction()
  }
}

// watcher saga
function* deleteProductSaga() {
  yield takeEvery(RETRIEVE_PRODUCT_DELETE, deleteProduct)
}


// Edit product
// worker saga
function* editProduct(action) {
  const product = action.product
  try {
    yield call(editProductDB, product)
    yield editProductOkAction(product)
     // Alert
    Swal.fire({
      title: 'Updated!',
      text: 'The product has been updated.',
      icon: 'success',
      confirmButtonColor: '#62a086'
    })
  } catch (error) {
    yield editProductErrorAction()
  }
}

// watcher saga
function* editProductSaga() {
  yield takeEvery(BEGIN_EDIT_PRODUCT, editProduct)
}

// Export all sagas
export default function* rootSaga() {
  yield all([
    retrieveProductsSaga(),
    addProductSaga(),
    deleteProductSaga(),
    editProductSaga()
  ])
}