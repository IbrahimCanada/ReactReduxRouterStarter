import { createSelector } from 'reselect'

const cartItemsSelector = state => state.cart

const totalQuantitySelector = createSelector(
  cartItemsSelector,
  items => items
    .reduce((acc, item) => acc + item.quantity, 0)
)

const totalAmountSelector = createSelector(
  cartItemsSelector,
  items => items
    .reduce((acc, item) => acc + (item.price * item.quantity), 0)
    .toFixed(2)
)

export {
  totalAmountSelector,
  totalQuantitySelector
}
