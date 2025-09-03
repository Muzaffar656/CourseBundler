import { server } from "../store";
import axios from "axios";


export const getAdminStats = ()=>async dispatch =>{
    try {
        dispatch({type:"getAdminStatsRequest"})
        const {data} = await axios.get(`${server}/admin/stats`,{withCredentials:true})
        dispatch({type:"getAdminStatsSuccess",payload:data})

    } catch (error) {
        dispatch({type:"getAdminStatsFail",payload:error.response.data.message})
    }
}


export  const createCourse = (myform)=>async dispatch=>{
    try {
        dispatch({type:"createCourseRequest"})
        const {data}= await axios.post(`${server}/createcourse`,myform,{
            headers:{
                'Content-Type':"multipart/from-data"
            },
            withCredentials:true
        })
        dispatch({type:"createCourseSuccess",payload:data.message}
        
        )
        return { 
            success: true
        }
    } catch (error) {
        dispatch({type:"createCourseFail",payload:error.response.data.message})
    }
}
export const deleteLecture = (courseId,lectureId)=>async dispatch=>{
  
    try {
        dispatch({type:"deleteLectureRequest"})
        
        const {data} = await axios.delete(`${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,{
            withCredentials:true
        })

        dispatch({type:"deleteLectureSuccess",payload:data.message})
    } catch (error) {
        dispatch({type:"deleteLectureFail",payload:error.response.data.message})
        
    }
}

export const addLecture = (courseId,myform)=>async dispatch=>{
    try {
        dispatch({type:"addLectureRequest"})
        
        const {data} = await axios.post(`${server}/course/${courseId}`,myform,{
            headers:{
                'Content-Type':"multipart/form-data"
            },
            withCredentials:true
        })
      
        dispatch({type:"addLectureSuccess",payload:data.message})
    } catch (error) {
        dispatch({type:"addLectureFail",payload:error.response.data.message})
    }
}

export const deleteCourse = (id)=>async dispatch=>{
    try {
        dispatch({type:"deleteCourseRequest"})
        const {data} = await axios.delete(`${server}/course/${id}`,{
            withCredentials:true
        })
        dispatch({type:"deleteCourseSuccess",payload:data.message})
    } catch (error) {
        dispatch({type:"deleteCourseFail",payload:error.response.data.message})
    }
}


export const deleteUser = (id) => async dispatch =>{
    try {
        dispatch({type:"deleteUserRequest"})
        const {data} = await axios.delete(`${server}/admin/user/${id}`,{withCredentials:true})
        dispatch({type:"deleteUserSuccess",payload:data.message})
    } catch (error) {
        dispatch({type:"deleteUserFail",payload:error.response.data.message})
    }
}
export const getAllUsers = ()=>async dispatch =>{
    try {
        dispatch({type:"getAllUserRequest"})
        const {data} = await axios.get(`${server}/admin/users`,{withCredentials:true})
        dispatch({type:"getAllUserSuccess",payload:data.user})
    } catch (error) {
        dispatch({type:"getAllUserFail",payload:error.response.data.message})
    }
}

export const changeRole = (id)=>async dispatch =>{
    try {
        dispatch({type:"changeRoleRequest"})
        const {data} = await axios.put(`${server}/admin/user/${id}`,{},{withCredentials:true})
        dispatch({type:"changeRoleSuccess",payload:data.message})
    } catch (error) {
        dispatch({type:"changeRoleFail",payload:error.response.data.message})
    }
}

