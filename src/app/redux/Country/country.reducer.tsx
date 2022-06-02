import { COUNTRY_LIST_FILTER_REDUCER, COUNTRY_LIST_REDUCER, COUNTRY_SINGLE_REDUCER } from "../../core/consts"

const country = function (state: { country: null, countries: [], countriesFilter: [] }, action) {
    switch (action.type) {
        case COUNTRY_LIST_FILTER_REDUCER:
            return {
                ...state,
                countriesFilter: action.countries
            }
        case COUNTRY_LIST_REDUCER:
            return {
                ...state,
                countriesFilter: action.countriesFilter,
                countries: action.countries
            }
        case COUNTRY_SINGLE_REDUCER:
            return { ...state, country: action.countrySingle }
        default:
            return { ...state }
    }
}

export default country