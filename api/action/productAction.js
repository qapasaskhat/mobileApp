
import data from '../../src/screens/screens/data.json'
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const INCREMENT_LIKE = 'INCREMENT_LIKE'
export const DISCREMENT_LIKE = 'DISCREMENT_LIKE'
export const INCREMENT_LIKE_SERVICE = 'INCREMENT_LIKE_SERVICE'
export const DISCREMENT_LIKE_SERVICE = 'DISCREMENT_LIKE_SERVICE'
export const INCREMENT_LIKE_INTERESTING = 'INCREMENT_LIKE_INTERESTING'
export const DISCREMENT_LIKE_INTERESTING = 'DISCREMENT_LIKE_INTERESTING'
export const INCREMENT_LIKE_MATERIAL = 'INCREMENT_LIKE_MATERIAL'
export const DISCREMENT_LIKE_MATERIAL = 'DISCREMENT_LIKE_MATERIAL'

export const fetchProductSuccess = product => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: {product}
});
export const increment = id =>({
    type :INCREMENT_LIKE,
    id
})
export const discrement = id =>({
    type: DISCREMENT_LIKE,
    id
})

export const incrementService = id =>({
    type :INCREMENT_LIKE_SERVICE,
    id
})
export const discrementService = id =>({
    type: DISCREMENT_LIKE_SERVICE,
    id
})

export function fetchProduct(){
    return dispatch=>{
        dispatch(fetchProductSuccess(data))
    }
}
export function incrementLike(id) {
    return dispatch=>{
        dispatch(increment(id))
    }
}
export function discrementLike(id) {
    return dispatch=>{
        dispatch(discrement(id))
    }
}
export function incrementLikeService(id) {
    return dispatch=>{
        dispatch(incrementService(id))
    }
}
export function discrementLikeService(id) {
    return dispatch=>{
        dispatch(discrementService(id))
    }
}
export const incrementInteresting = id =>({
    type :INCREMENT_LIKE_INTERESTING,
    id
})
export const discrementInteresting = id =>({
    type: DISCREMENT_LIKE_INTERESTING,
    id
})
export function incrementLikeInteresting(id) {
    return dispatch=>{
        dispatch(incrementInteresting(id))
    }
}
export function discrementLikeInteresting(id) {
    return dispatch=>{
        dispatch(discrementInteresting(id))
    }
}

export const incrementMaterial = id =>({
    type :INCREMENT_LIKE_MATERIAL,
    id
})
export const discrementMaterial = id =>({
    type: DISCREMENT_LIKE_MATERIAL,
    id
})
export function incrementLikeMaterial(id) {
    return dispatch=>{
        dispatch(incrementMaterial(id))
    }
}
export function discrementLikeMaterial(id) {
    return dispatch=>{
        dispatch(discrementMaterial(id))
    }
}