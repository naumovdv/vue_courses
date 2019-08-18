(function () {
  Vue.directive('tooltip', VTooltip.VTooltip);

  Vue.component('user-list', {
    template: `
      <h1>{{ title }} {{ countUsersText }}</h1>
      <div class="tableControls">
        <button @click="toggleUserList" v-tooltip="toggleButtonTooltip">{{ toggleButtonText }}</button>
      </div>
      <table class="users">
        <thead>
          <tr>
            <th class="text-center">
              ID
              </th">
            <th class="text-center">
              Фото
            </th>
            <th>
              Имя
            </th>
            <th>
              Фамилия
            </th>
            <th>
              Отчество
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="isVisibleUserList">
          <tr v-for="user in users" :key="user.id">
            <td class="text-center">
              {{ user.id }}
            </td>
            <td class="text-center">
              <img :src="getUserPhotoURL(user.id)" class="avatar" :alt="getUserFullName(user.id)" />
            </td>
            <td>
              {{ user.surname | uppercase }}
            </td>
            <td>
              {{ user.name }}
            </td>
            <td>
              {{ user.patronymic }}
            </td>
            <td class="text-center">
              <button v-copy="getUserFullName(user.id)">
                Копировать
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    `
  })

  window.userList = new Vue({
    el: '#users',
    data: function () {
      return {
        title: 'Пользователи',
        defaultPhoto: 'https://freelance.ru/img/avatars/1960013.png?030000',
        toggleButtonTooltip: 'Показать/скрыть список',
        isVisibleUserList: true,
        users: [
          {
            id: 1,
            name: 'Иван',
            surname: 'Иванов',
            patronymic: 'Иванович',
            photo: 'https://teinon.net/ficbook/uploads/avatars/avatar_-N.e.g.aTiV-_1534262251.png'
          },
          {
            id: 2,
            name: 'Петр',
            surname: 'Петров',
            patronymic: 'Петрович',
            photo: 'https://teinon.net/ficbook/uploads/avatars/avatar_nailika_1553198948.png'
          },
          {
            id: 3,
            name: 'Александр',
            surname: 'Александров',
            patronymic: 'Александрович',
            photo: 'https://teinon.net/ficbook/uploads/avatars/avatar_Pa7if_1531912455.png'
          },
          {
            id: 4,
            name: 'Павел',
            surname: 'Павлов',
            patronymic: 'Павлович',
            photo: 'https://id-static.z-dn.net/files/d2f/dc625b5a5d5edf12df7cac76c2b98b1f.png'
          },
          {
            id: 5,
            name: 'Андрей',
            surname: 'Андреев',
            patronymic: 'Андреевич'
          }
        ]
      }
    },
    methods: {
      getUserFullName: function (id) {
        const user = this.users.find(user => user.id === id);
        return user ? `${user.surname} ${user.name} ${user.patronymic}` : '';
      },
      getUserPhotoURL: function (id) {
        const user = this.users.find(user => user.id === id);
        return user && user.photo ? user.photo : this.defaultPhoto;
      },
      toggleUserList: function () {
        this.isVisibleUserList = !this.isVisibleUserList;
      }
    },
    computed: {
      countUsers: function () {
        return this.users.length;
      },
      countUsersText: function () {
        return this.countUsers ? ` — ${this.countUsers}` : '';
      },
      toggleButtonText: function () {
        return this.isVisibleUserList ? 'Скрыть' : 'Показать';
      }
    },
    filters: {
      uppercase: function (value) {
        if (!value) return;
        return value.toString().toUpperCase();
      }
    }
  })
}())