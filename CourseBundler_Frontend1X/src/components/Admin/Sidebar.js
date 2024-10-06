import React from 'react'
import { Button, VStack } from '@chakra-ui/react';
import {
    RiAddCircleFill,
    RiDashboardFill,
    RiEyeFill,
    RiUser3Fill,
  } from 'react-icons/ri';
  import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
    const location = useLocation()
  return (
    <VStack spacing={'8'} p="5" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
        
        <LinkButton url={'dashboard'} text={'Dashboard'}
                active={location.pathname === '/admin/dashboard'}
         Icon={RiDashboardFill}/>
        <LinkButton url={'createcourse'} 
        active={location.pathname === '/admin/createcourse'}
        
         text={'Create Course'} Icon={RiEyeFill}/>
        <LinkButton url={'courses'}  
        active={location.pathname === '/admin/courses'}

         text={'Course'} Icon={RiAddCircleFill}/>
        <LinkButton url={'users'}   active={location.pathname === '/admin/users'} text={'Users'} Icon={RiUser3Fill}/>
        
    </VStack>
  )
}

export default Sidebar

function LinkButton({Icon,text,url,active}){
    return(
        <Link to={`/admin/${url}`}>
        <Button
          fontSize={'larger'}
          variant="ghost"
          colorScheme={active?  'purple':""}
        >
          <Icon style={{ margin: '4px' }}/>
          {text}
        </Button>
      </Link>
    )
}