

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './userApiSlice'
 import {useGetUsersQuery} from "./userApiSlice"
import {memo} from "react"

const User = ({userId}) => {
  
  
  // const user = useSelector(state => selectUserById(state, userId))
  
    const {user} = useGetUsersQuery("userlist",{
    selectFromResult :({data})=> ({
    user : data?.entities[userId]
    })
  })
  

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="">
                <td className="w-[10rem] px-8 py-4 border-r-2 border-t-[0.6px] border-white">{user.username}
                </td>
                <td className="border-t-[0.6px] px-8 border-r-2 border-white">{userRolesString}
                </td>
                <td className="border-t-[0.6px] px-6 border-r-2 border-white">{user.active ? "active" : "not active"}
                </td>
                <td className="border-t-[0.6px] border-white px-8">
                    <button
                        className="text-[1rem] bg-slate-800 p-2"
                        onClick={handleEdit}
                    >
                    Edit
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizeUser = memo(User)

export default memoizeUser 