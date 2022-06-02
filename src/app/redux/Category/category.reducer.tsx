import { CATEGORY_LIST_FILTER_REDUCER, CATEGORY_LIST_REDUCER, CATEGORY_SINGLE_REDUCER } from "../../core/consts"

const category = function (state: { category: null, categories: [], categoriesFilter: [] }, action) {
    switch (action.type) {
        case CATEGORY_LIST_FILTER_REDUCER:
            return {
                ...state,
                categoriesFilter: action.categories
            }
        case CATEGORY_LIST_REDUCER:
            return {
                ...state,
                categoriesFilter: action.categoriesFilter,
                categories: action.categories
            }
        case CATEGORY_SINGLE_REDUCER:
            return { ...state, category: action.categorySingle }
        default:
            return { ...state }
    }
}

export default category