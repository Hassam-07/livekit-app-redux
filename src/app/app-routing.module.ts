import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LivekitRoomComponent } from './livekit-room/livekit-room.component';

const routes: Routes = [
  { path: 'meeting/:roomName', component: LivekitRoomComponent },
  { path: '**', redirectTo: '/meeting/default-room' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
