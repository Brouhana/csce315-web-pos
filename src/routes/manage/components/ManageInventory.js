import { HeaderMedium } from "../../../components/typography/Header";
import axios from 'axios'
import { SERVER_URL } from '../../../constants'
import { useQuery } from 'react-query'

function ManageInventory() {
  const fetchIngredients = async () => {
    return await axios.get(`${SERVER_URL}/ingredients`)
  }

  const { data: ingredientsData } = useQuery(
    'ingredients',
    fetchIngredients,
  )
  
  if (ingredientsData) {
    return (
      <>
        <HeaderMedium>Inventory</HeaderMedium>
      
        <div className="manage-inventory-table">
          <table>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Storage Location</th>
            </tr>
            {ingredientsData
              .data
              .map((ingredient) => {
                return (
                  <tr key={ingredient}>
                    <td>{ingredient.item_name}</td>
                    <td>{ingredient.item_amount}</td>
                    <td>{ingredient.storage_location}</td>
                  </tr>
                )
              }
            )}
          </table>
        </div>
      </>
    )
  }
}

export default ManageInventory