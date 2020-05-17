import {
    FETCH_PRODUCT_SUCCESS,
    INCREMENT_LIKE,
    DISCREMENT_LIKE,
    INCREMENT_LIKE_SERVICE,
    DISCREMENT_LIKE_SERVICE,
    INCREMENT_LIKE_INTERESTING,
    DISCREMENT_LIKE_INTERESTING,
    INCREMENT_LIKE_MATERIAL,
    DISCREMENT_LIKE_MATERIAL
} from '../action/productAction'

const initialState = {
    items: [],
    loading: false,
    error: null,
    popular_products: [],
    popular_service:[],
    maybe_interesting :[],
    building_materials: [],
    favorites: []
};

export default function reduser(state = initialState, action){
    switch (action.type){
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.product,
                popular_products: action.payload.product.popular_products,
                popular_service: action.payload.product.popular_service,
                maybe_interesting: action.payload.product.maybe_interesting,
                building_materials: action.payload.product.building_materials,
                favorites: action.payload.product.building_materials.filter(i => i.is_liked === true),
            };
        case INCREMENT_LIKE:
            return {
                ...state,
                popular_products: state.popular_products.map(item=> item.id === action.id?
                {...item, is_liked: true}:
                item)
            };
        case DISCREMENT_LIKE:
            return {
                ...state,
                popular_products: state.popular_products.map(item=> item.id === action.id?
                {...item, is_liked: false}:
                item)
            };
        case INCREMENT_LIKE_SERVICE:
            return {
                ...state,
                popular_service: state.popular_service.map(item=> item.id === action.id?
                {...item, is_liked: true}:
                item)
            };
        case DISCREMENT_LIKE_SERVICE:
            return {
                ...state,
                popular_service: state.popular_service.map(item=> item.id === action.id?
                {...item, is_liked: false}:
                item)
            };
            case INCREMENT_LIKE_INTERESTING:
                return {
                    ...state,
                    maybe_interesting: state.maybe_interesting.map(item=> item.id === action.id?
                    {...item, is_liked: true}:
                    item)
                };
            case DISCREMENT_LIKE_INTERESTING:
                return {
                    ...state,
                    maybe_interesting: state.maybe_interesting.map(item=> item.id === action.id?
                    {...item, is_liked: false}:
                    item)
                };
                case INCREMENT_LIKE_MATERIAL:
                    return {
                        ...state,
                        building_materials: state.building_materials.map(item=> item.id === action.id?
                        {...item, is_liked: true}:
                        item)
                    };
                case DISCREMENT_LIKE_MATERIAL:
                    return {
                        ...state,
                        building_materials: state.building_materials.map(item=> item.id === action.id?
                        {...item, is_liked: false}:
                        item)
                    };
        default:
            return state;
    }
}
