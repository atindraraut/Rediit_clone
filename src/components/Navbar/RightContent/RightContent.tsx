import { auth } from '@/src/firebase/clientApp';
import { Button, Flex,Menu,Text } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './Icons';
import NewUserMenu from './NewUserMenu';

type RightContentProps = {
    user?:User|null,
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
    return <>
    <AuthModal/>
    <Flex justify='center' align='center'>
        {user?<Icons/>:<AuthButtons/>}
        <NewUserMenu user={user}/>
    </Flex>
    </>
}
export default RightContent;