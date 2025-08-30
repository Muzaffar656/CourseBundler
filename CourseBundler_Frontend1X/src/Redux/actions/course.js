import axios from 'axios'
import {server} from '../store'


export const getAllCourses = (category="",keyword="")=> async dispatch =>{
    try {
        dispatch({type:"allCoursesRequest"})
        const {data} = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`)

        dispatch({type:"allCoursesSuccess",payload:data.course})
    } catch (error) {
        dispatch({type:"allCoursesFail",payload:error.response.data.message})
    }
}
export const getCourseLectures = (id)=>async dispatch=>{
    try {
        dispatch({type:"getCourseLecturesRequest"})
        const {data} = await axios.get(`${server}/course/${id}`,{
            headers:{
                'Content-Type':"application/json"
            },
            withCredentials:true
        }) 
     
        dispatch({type:"getCourseLecturesSuccess",payload:data.lectures})
    } catch (error) {
     
        dispatch({type:"getCourseLecturesFail",payload:error.response.data.message})
    }
}
export const addToPlaylist = (id)=> async dispatch=>{

    try {
        dispatch({type:"addToPlaylistRequest"})
        const config = {
            headers:{
                "Content-type":"application/json"
            },
        
    withCredentials: true,
        }
        const {data} = await axios.post(`${server}/addtoplaylist`,{id},config)
        dispatch({
            type:"addToPlaylistSuccess",
            payload:data.message
        })
   
    } catch (error) {
        dispatch({
            type:"addToPlaylistFail",
            payload:error.response.data.message
        })
    }
    }

export const  removeFromPlaylist =  (id) => async dispatch =>{
    try {
        dispatch({type:"removeFromPlaylistRequest"})
        const config = {
            withCredentials:true
        }
        const {data} = await axios.delete(`${server}/removefromplaylist?id=${id}`,config)
     
        dispatch({type:"removeFromPlaylistSuccess",payload:data.message})
    } catch (error) {
        dispatch({
            type:"removeFromPlaylistFail",
            payload:error.response.data.message
        })
    }
}