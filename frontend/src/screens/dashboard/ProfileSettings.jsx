import { useSelector } from 'react-redux'
import EditPatronProfile from '../../components/profile/EditPatronProfile'
import EditPetOwnerProfile from '../../components/profile/EditPetOwnerProfile'

function ProfileSettings() {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <>
      {userInfo.role === 'patron' ? (
        <EditPatronProfile />
      ) : (
        <EditPetOwnerProfile />
      )}
    </>
  )
}
export default ProfileSettings
