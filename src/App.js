import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomersAction } from './store/customerReducer'
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customer.customers)

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash })
  }

  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash })
  }

  const addCustomer = name => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = customer => {
    dispatch(removeCustomersAction(customer.id))
  }

  return (
    <div className="App">
      <div className="btns">
        <button onClick={() => addCash(Number(prompt()))}>Add cash</button>
        <button onClick={() => getCash(Number(prompt()))}>Get cash</button>
        <button onClick={() => addCustomer(prompt())}>Add Client</button>
        <button onClick={() => getCash(Number(prompt()))}>Remove Client</button>
        <button onClick={() => dispatch(fetchCustomers())}>Get Clients from DB</button>
      </div>
      <div className="cash">{cash}</div>
      {customers.length > 0 ?
        <div>
          {customers.map(customer =>
            <div onClick={() => removeCustomer(customer)}>{customer.name}</div>
          )}
        </div>
        :
        <div>
          Клиенты отсутствуют!
        </div>
      }
    </div>
  );
}

export default App;
