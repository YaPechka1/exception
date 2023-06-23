

export interface UserLogin{
    login: string
    password:string
}
export interface UserReg{
    login:string
    password:string
    nick_name:string
    mail:string
    
}
export interface UserLoginOnToken{
    token: string,
    id_user: string
}
export interface user_information{
    nick_name: string,
    about_me: string,
    phone: string,
    mail: string,
    user_logo_src: string
}
export interface userRecord{
    id_user_record:string,
    date_record:string,
    text:string,
    img_src:string,
    like_count:string,
    dislike_count:string,
    nick_name: string,
    user_logo_src:string,
    video_src: string
}
export interface userPhotoAndVideo{
    img_src: {
        img_src:string
    }[],
    video_src:{
        video_src:string
    }[]
}
export interface UserFriend{
    id_user:string,
    nick_name:string,
    user_logo_src: string
}
export interface UserGroup{
    id_group: string,
    group_name:string,
    group_logo_url:string
}
export interface EditUserInfo{
    about:string,
    phone:string,
    mail:string,
    nick_name:string
}
export interface MessageLIst{
    id_message_list: string,
    date_and_time:string,
    text_message: string,
    message_name:string,
    user_logo_src:string,
}
export interface UserList{
    id_user:string,
    nick_name:string,
    user_logo_src: string
}
export interface SearchUser{
    last_name:string,
    user_name:string
}
export interface GroupList{
    id_group:string,
    group_name:string,
    theme:string,
    group_logo_url:string
}
export interface GroupListAdmin{
    id_group:string,
    group_name:string,
    role_name:string,
    group_logo_url:string
}
export interface SearchGroup{
    last_group_name:string,
    group_name:string;
}
export interface getUserNewsOnSubmit{
    last_index:string,
    last_type:string
}
export interface RecordList{
    id_record_list:string,
    id_record:string,
    id:string;
    logo_src:string,
    name:string,
    date_record:string,
    text:string,
    img_src:string,
    video_src:string,
    like_count:string,
    dislike_count:string,
    type:string
}
export interface CreateRecord{
    text:string,
    img_src:string,
    video_src:string;
}
export interface GroupInfo{
    id_group:string,
    group_name:string,
    id_admin:string,
    mail:string,
    theme:string,
    group_logo_url:string,
    nick_name:string,
    about:string,
    user_logo_src:string
}
export interface GroupRecord{
    id_group_record:string,
    date_record:string,
    text:string,
    img_src:string,
    like_count:string,
    dislike_count:string,
    group_name:string,
    group_logo_url:string,
    video_src:string;
    id_record_list:string
}
export interface GroupImg{
    id_group_record:string,
    img_src:string
}
export interface GroupVideo{
    id_group_record:string,
    video_src:string
}
export interface GroupPeople{
    id_group_people:string,
    id_people:string,
    role_name:string,
    nick_name:string,
    user_logo_src:string
}
export interface MessageDialog{
    id:string,
    id_message:string,
    id_message_list:string,
    id_user:string,
    text_message:string,
    img:string,
    video:string,
    nick_name:string,
    user_logo_src:string,
    date:string
}
export interface MessageSubmit{
    id_message_list:string,
    last_index:string
}
export interface MessagePeople{
    id_user:string,
    nick_name:string,
    user_logo_src:string
}
export interface PushMessage{
    id_message_list:string;
    id_user:string | null,
    text:string,
    img_src:string | null,
    video_src:string | null
}
export interface getMessage{
    id_message_list:string;
    id_user:string | null,
    text:string,
    img_src:string | null,
    video_src:string | null
}
export interface MessageName{
    id_message_list:string,
    message_name:string
}
export interface CreateRecordGroup{
    id_group:string,
    img_src:string | null,
    video_src:string | null,
    text:string
}
export interface CreateGroup{
    group_name:string,
    theme:string
}
export interface FeedBack{
    theme:string,
    mail:string,
    url:string,
    text:string
}