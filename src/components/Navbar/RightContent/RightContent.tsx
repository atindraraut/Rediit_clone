import { auth } from '@/src/firebase/clientApp';
import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './Icons';
import UserMenu from './userMenu';

type RightContentProps = {
    user?:User|null,
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
    console.log("user",user?.email)
    return <>
    <AuthModal/>
    <Flex justify='center' align='center'>
        {user?<Icons/>:<AuthButtons/>}
        <UserMenu user={user}/>
    </Flex>
    </>
}
export default RightContent;