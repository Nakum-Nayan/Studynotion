import './App.css'
import { Route ,Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/comman/Navbar'
import Error from './pages/Error';
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './components/core/Dashboard/MyProfile'
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Settings from "./components/core/Dashboard/Settings"
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart'
import MyCourses from './components/core/Dashboard/MyCourses'   
import EditCourse from "./components/core/Dashboard/editCourse/index.js"
import Instructor from  "./components/core/Dashboard/Instructor.js"
import ViewCourse from './pages/ViewCourse.js'
import { useSelector } from 'react-redux'
import CourseDetails from './pages/CourseDetails.js'
import Catalog from './pages/Catalog.js'
import AddCourse from './components/core/Dashboard/AddCourse.js'
import { ACCOUNT_TYPE } from './utils/constants.js'
import VideoDetails from './components/core/ViewCourse/VideoDetails.js'
import Category from "./pages/Category.js"

function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
          <Route 
              path='/'
              element={
                    <Home />
            } />
            <Route path="courses/:courseId" element={<CourseDetails />} />
            <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route        
            path='/Login' 
            element={
              <OpenRoute>
                  <Login/>
              </OpenRoute>
            } />
          <Route 
            path='/SignUp' 
            element={
              <OpenRoute>
                <Signup/>
              </OpenRoute>
             }/>
          <Route 
            path="/Error" 
            element={
              <OpenRoute>
                 <Error />
              </OpenRoute>
            }/>
          <Route 
            path="/ForgotPassword" 
            element={<ForgotPassword />} 
          />
          <Route 
            path="update-password/:id" 
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            } 
          />
          <Route 
            path='/verify-email' 
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            } 
          />
          <Route 
            path='/about' 
            element={
                <About />
            }  
          />
          <Route 
            path='/contact' 
            element={
                <Contact />
            }
          />
          <Route 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path='/dashboard/my-profile' element={<Myprofile />}  />
            <Route path='/dashboard/Settings' element={<Settings />}  />
            
            {   
              user?.accountType === "Student" && (
                <>
                  <Route path='/dashboard/cart' element={<Cart />}  />
                  <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />}  />
                </>
              )
            }
            {   
              user?.accountType === "Instructor" && (
                <>
                  <Route path='/dashboard/add-course' element={<AddCourse />}  />
                  <Route path="dashboard/my-courses" element={<MyCourses />} />
                  <Route path="dashboard/instructor" element={<Instructor />} />
                  <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                  /> 
                  <Route path='/category' element={<Category />}></Route>
                </>
              )
            }
            <Route
                path="view-course/:courseId"
                element={
                <PrivateRoute>
                  <ViewCourse />
                </PrivateRoute>
              }
            >
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
              )}
            </Route>
          </Route>
          <Route path='*' element={<Error />}  />
      </Routes>
    </div>
  )    
}
export default App
