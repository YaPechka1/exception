import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdpminPanelComponent } from "./admin-panel/admin-panel.component";

import { EditMyGroupComponent } from "./edit-my-group/edit-my-group.component";
import { EnterComponent } from "./enter/enter.component";
import { ForgetComponent } from "./forget/forget.component";
import { FormHelpComponent } from "./form-help/form-help.component";
import { FriendComponent } from "./friend/friend.component";
import { GroupViewerComponent } from "./group-viewer/group-viewer.component";
import { GroupComponent } from "./group/group.component";
import { InfoComponent } from "./info/info.component";
import { MessageViewerComponent } from "./message-viewer/message-viewer.component";
import { MessageComponent } from "./message/message.component";
import { NewsComponent } from "./news/news.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { OptionComponent } from "./option/option.component";
import { ProfileViewerComponent } from "./profile-viewer/profile-viewer.component";
import { ProfileComponent } from "./profile/profile.component";

import { RegComponent } from "./reg/reg.component";
import { AuthGuard } from "./_tools/auth.guard";
import { EnterGuard } from "./_tools/enter.guard";
import { RecoveryComponent } from "./recovery/recovery.component";

const routes: Routes =[
    {path: '', component: InfoComponent},
    {path: 'enter', canActivate:[EnterGuard], component: EnterComponent},
    {path: 'enter/reg', canActivate:[EnterGuard], component: RegComponent},
    {path: 'friends',canActivate:[AuthGuard], component: FriendComponent},
    {path: 'group',canActivate:[AuthGuard],component: GroupComponent},
    {path: 'group/viewer_group',canActivate:[AuthGuard],component: GroupViewerComponent},
    {path: 'group/edit_my_group',canActivate:[AuthGuard], component: EditMyGroupComponent},
    {path:'message',canActivate:[AuthGuard], component:MessageComponent},
    {path:'message/viewer_mes',canActivate:[AuthGuard], component:MessageViewerComponent},
    {path: 'profile',canActivate:[AuthGuard], component: ProfileComponent},
    {path: 'profile/viewer_prof',canActivate:[AuthGuard], component: ProfileViewerComponent},
    {path:'option',canActivate:[AuthGuard], component:OptionComponent},
    {path:'news',canActivate:[AuthGuard], component:NewsComponent},

    {path:'admin',canActivate:[AuthGuard], component:AdpminPanelComponent},
    {path: 'enter/forget', canActivate:[EnterGuard], component: ForgetComponent},
    {path: 'enter/recovery', canActivate:[EnterGuard], component: RecoveryComponent},
    {path:'help',component:FormHelpComponent},
    {path:'**', component:NotFoundComponent}
];
@NgModule({
imports:[RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', 
    anchorScrolling: 'enabled'
})],
exports:[RouterModule]
})
export class AppRoutingModule{

}