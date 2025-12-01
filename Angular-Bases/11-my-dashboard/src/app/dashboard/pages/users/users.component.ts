import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-users',
  imports: [ TitleComponent, RouterModule],
  templateUrl: './users.component.html',
})
export default class UsersComponent {
  public usersService = inject(UsersService);

}
