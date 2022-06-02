const GetListPaginate = function (list, positionPagination: number, valueLimit: number) {
    if (list) {
        if (positionPagination === 1) {
            return list.filter((value, key) => key < valueLimit)
        }
        if (positionPagination > 1) {
            return list.filter((value, key) => (key >= (valueLimit * (positionPagination - 1))) && (key < (valueLimit * positionPagination)))
        }
    }
    return []
}

export default GetListPaginate