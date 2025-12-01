import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import type {
  User,
  UserResponse,
  UsersResponse,
} from '@interfaces/req-response';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  #state = signal<State>({
    //# indica que es privado
    loading: true,
    users: [],
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.http
      .get<UsersResponse>('https://reqres.in/api/users?page=2', {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      })
      .pipe(delay(1500))
      .subscribe((res) => {
        this.#state.set({
          loading: false,
          users: res.data,
        });
      });
  }

  getUserById(id: string) {
    return this.http
      .get<UserResponse>(`https://reqres.in/api/users/${id}`, {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      })
      .pipe(
        delay(1500),
        map((resp) => resp.data)
      );
  }
}
