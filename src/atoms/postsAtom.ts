import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
export type Post={
    id:string;
    communityId:string;
    creatorId:string;
    creatorDisplayName:string;
    title:string;
    body:string;
    numberOfComments:number;
    voteStatus:number;
    imageURL?:string;
    communityImageURL?:string;
    createdAt:Timestamp;
}
interface PostState{
    selectedpost:Post|null;
    post:Post[];
    //post votes
}
const defaultPostState:PostState={
    selectedpost:null,
    post:[],
}
export const PostState=atom({key:'postState',default:defaultPostState})