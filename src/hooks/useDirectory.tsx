import React from 'react';
import { useRecoilState } from 'recoil';
import { DirectoryMenuState } from '../atoms/directoryMenuAtom';


const useDirectory = () => {
    const {directoryState,setDirectoryState}=useRecoilState(DirectoryMenuState);

    return {directoryState};
}
export default useDirectory;