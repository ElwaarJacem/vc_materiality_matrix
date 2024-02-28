import React from 'react'

function IndexHub () {
  const user = useSelector(selectCurrentUser)
  return (
    <section className="bg-gray-50 min-h-screen w-full mx-auto items-center">
        <NavBar/>
        {['ADMIN', 'SUPERADMIN'].includes(user.type) &&
        <DynamicNavBar option="navbar.generalOptions.user_view" options={generalOptions}/>}
            <Outlet/>
            <Routes>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
    </section>
  )
}

export default IndexHub

// <Route path="" element={<DashboadEntity/>}></Route>
