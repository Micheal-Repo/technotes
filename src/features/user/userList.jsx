import { useGetUsersQuery } from "./userApiSlice"
import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery("userlist",{
      pollingInterval:60000,
      refetchOnFocus:true,
      refetchOnMountOrArgChange:true
    })
  
    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
       // content = <p className="errmsg">error</p>
    }

    if (isSuccess) {
        
        const ids  = users?.ids

      const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
          <div className="my-10 max-sm:w-[18rem] w-[80%] m-auto border-2 border-white overflow-auto rounded-xl p-3">
            <table className="">
                <thead className="">
                    <tr className="border-b-[0.1rem] border-white text-gray-200 ">
                    
                     <th scope="col" className="">Username</th>
                     
                     <th scope="col" className="">Roles</th>
                     
                      <th scope="col" className="">Status
                      </th>
                      
                      <th scope="col" className="">Edit
                      </th>
                      
                      
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            </div>
            
        )
    }

    return content
}
export default UsersList