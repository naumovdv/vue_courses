(function () {
  const userList = {
    template: '#userList',
    data: function () {
      return {
        title: 'Пользователи',
        defaultPhoto: 'https://freelance.ru/img/avatars/1960013.png?030000',
        toggleButtonTooltip: 'Показать/скрыть список',
        isVisibleUserList: true,
        countFieldsOfUserVisible: 9
      }
    },
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    methods: {
      getUserFullName: function (id) {
        const user = this.users.find(user => user.id === id);
        return user ? `${user.firstName} ${user.lastName}` : '';
      },
      getUserPhotoURL: function (id) {
        const user = this.users.find(user => user.id === id);
        return user && user.picture ? user.picture : this.defaultPhoto;
      },
      toggleUserList: function () {
        this.isVisibleUserList = !this.isVisibleUserList;
      },
      isUserFieldByIndex: function (index) {
        return index <= this.userFields.length;
      },
      getContentByFieldIndexAndUser: function(index, user) {
        const contentType = this.userFields[index];
        const contentByType = {
          picture: () => `<img src="${this.getUserPhotoURL(user.id)}" alt="${this.getUserFullName(user.id)}" title="${this.getUserFullName(user.id)}">`
        };

        return contentByType.hasOwnProperty(contentType)
          ? contentByType[contentType]()
          : user[this.userFields[index]];
      }
    },
    computed: {
      userFields: function() {
        const fields = [];
        if (this.users.length) {
          const user = this.users[0];
          for (const key in user) {
            if (user.hasOwnProperty(key)) {
              fields.push(key);
            }
          }
        }
        return fields;
      },
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
  };

  window.application = new Vue({
    el: '#app',
    components: {
      'user-list': userList
    },
    data: function() {
      return {
        users: []
      }
    },
    mounted: function() {
      this.users = [];
      axios
        .get('http://localhost:3000/users')
        .then(response => {
          this.users = response.data;
          console.warn('Users is loading');
        })
        .catch(error => console.error(error))
        .finally(() => console.warn('Loading Done'));
    }
  });
}());