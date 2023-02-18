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
export type postVote={
    id:string,
    postId:string,
    communityId:string,
    voteValue:Number
}
interface PostState{
    selectedpost:Post|null;
    posts:Post[];
    postVotes:postVote[]
}
const defaultPostState:PostState={
    selectedpost:null,
    posts:[],
    postVotes:[],
}
export const PostState=atom({key:'postState',default:defaultPostState})