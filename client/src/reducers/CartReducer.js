import { toast } from "react-toastify";

const initialState = {
  cart: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const checkBookExists = state.cart?.find(
        (e) => e.rank === action.payload.rank
      );

      if (checkBookExists) {
        toast.error("Book is already present in cart!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });

        return {
          cart: [...state.cart],
        };
      }

      toast.success("Book added to cart!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      return {
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      toast.success("Book removed from cart!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      return {
        cart: [...state.cart.filter((e) => e.rank !== action.payload)],
      };

    case "EMPTY_CART":
      toast.success("Your Cart is Empty Now!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      return {
        cart: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
