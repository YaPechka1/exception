import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './info/info.component';
import { EnterComponent } from './enter/enter.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendComponent } from './friend/friend.component';
import { GroupComponent } from './group/group.component';
import { MessageComponent } from './message/message.component';
import { OptionComponent } from './option/option.component';
import { RegComponent } from './reg/reg.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsComponent } from './news/news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetComponent } from './forget/forget.component';
import { FooterComponent } from './footer/footer.component';
import { FormHelpComponent } from './form-help/form-help.component';
import { MessageViewerComponent } from './message-viewer/message-viewer.component';
import { GroupViewerComponent } from './group-viewer/group-viewer.component';
import { ProfileViewerComponent } from './profile-viewer/profile-viewer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdpminPanelComponent } from './admin-panel/admin-panel.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditMyGroupComponent } from './edit-my-group/edit-my-group.component';

import { PopUpPhotoComponent } from './_pop-up/pop-up-photo/pop-up-photo.component';
import { PopUpVideoComponent } from './_pop-up/pop-up-video/pop-up-video.component';
import { PopUpPeopleComponent } from './_pop-up/pop-up-people/pop-up-people.component';
import { PopUpGroupComponent } from './_pop-up/pop-up-group/pop-up-group.component';


import { PopUpPhotoAvatarComponent } from './_pop-up/pop-up-photo-avatar/pop-up-photo-avatar.component';

import { MatInputModule } from '@angular/material/input';
import { PopUpPlusZapComponent } from './_pop-up/pop-up-plus-zap/pop-up-plus-zap.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_tools/token.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PopUpPhotoGroupComponent } from './_pop-up/pop-up-photo-group/pop-up-photo-group.component';
import { PopUpVideoGroupComponent } from './_pop-up/pop-up-video-group/pop-up-video-group.component';
import { PopUpPeopleGroupComponent } from './_pop-up/pop-up-people-group/pop-up-people-group.component';
import { PopUpMessagePeopleComponent } from './_pop-up/pop-up-message-people/pop-up-message-people.component';
import { PopUpMessagePlusPeopleComponent } from './_pop-up/pop-up-message-plus-people/pop-up-message-plus-people.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PopUpPlusMessageComponent } from './_pop-up/pop-up-plus-message/pop-up-plus-message.component';
import { PopUpPhotoAvatarGroupComponent } from './_pop-up/pop-up-photo-avatar-group/pop-up-photo-avatar-group.component';
import { PopUpGroupCreateComponent } from './_pop-up/pop-up-group-create/pop-up-group-create.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';


const config: SocketIoConfig = {
  url: 'https://demo-exception.space:5000', options: {

  }
};

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    EnterComponent,
    ProfileComponent,
    FriendComponent,
    GroupComponent,
    MessageComponent,
    OptionComponent,
    RegComponent,
    NotFoundComponent,
    NewsComponent,
    ForgetComponent,
    FooterComponent,
    FormHelpComponent,
    MessageViewerComponent,
    GroupViewerComponent,
    ProfileViewerComponent,
   
    AdpminPanelComponent,
    EditMyGroupComponent,

    PopUpPhotoComponent,
    PopUpVideoComponent,
    PopUpPeopleComponent,
    PopUpGroupComponent,


    PopUpPhotoAvatarComponent,


    PopUpPlusZapComponent,
    PopUpPhotoGroupComponent,
    PopUpVideoGroupComponent,
    PopUpPeopleGroupComponent,
    PopUpMessagePeopleComponent,
    PopUpMessagePlusPeopleComponent,
    PopUpPlusMessageComponent,
    PopUpPhotoAvatarGroupComponent,
    PopUpGroupCreateComponent,
    RecoveryComponent,


  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    NgxDocViewerModule,
    MatSlideToggleModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    InfiniteScrollModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
