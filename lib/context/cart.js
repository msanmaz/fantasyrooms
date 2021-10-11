import { createContext, useContext, useReducer, useEffect } from 'react'
import commerce from 'lib/commerce'

const CreateStateContext = createContext()
const CreateDispatchContext = createContext()


const SET_CART = 'SET_CART'
const RESET = 'RESET'

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: []
}

const reducer = (state, action) => {
  console.log('reducer called', state,action)
	switch (action.type) {
		case SET_CART:
			const newState = { ...state, ...action.payload }
			console.log('newState', newState)
			return newState
		return { ...state, ...action.payload }
		case RESET:
		return { ...state, ...action.payload }
		default:
		throw new Error(`Unknown Action ${action.type}`)
		break
	}
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getCart()
  }, [])

  const setCart = (payload) => {
    dispatch({ type: SET_CART, payload })
  }
  

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve()
      setCart(cart)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CreateDispatchContext.Provider value={{ setCart }}>
      <CreateStateContext.Provider value={state}>
        {children}
      </CreateStateContext.Provider>
    </CreateDispatchContext.Provider>
  )
}

export const useCartState = () => useContext(CreateStateContext)
export const useCartDispatch = () => useContext(CreateDispatchContext)
