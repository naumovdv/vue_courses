(function () {
  const userForm = {
    template: '#userForm',
    data: function () {
      return {
        title: 'Редактирование пользователя',
        defaultPhoto: 'https://freelance.ru/img/avatars/1960013.png?030000',
        mutableFields: [
          'firstName',
          'lastName',
          'balance',
          'phone',
          'address',
          'company'
        ]
      }
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    methods: {
    },
    computed: {
      userFields: function() {
        const fields = [];
        for (const key in this.user) {
          if (this.user.hasOwnProperty(key)) {
            if(this.mutableFields.includes(key)) {
              fields.push(key);
            }
          }
        }
        return fields;
      }
    }
  };

  window.application = new Vue({
    el: '#app',
    components: {
      'user-form': userForm
    },
    data: function() {
      return {
        user: null
      } 
    },
    mounted: function() {
      const url = new URL(window.location.href);
      const userId = url.searchParams.get('user_id');

      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then(response => {
          this.user = response.data;
          console.warn('User is loading');
        })
        .catch(error => console.error(error))
        .finally(() => console.warn('Loading Done'));
    },
    computed: {
      userFullName: function() {
        return this.user ? ` — ${this.user.firstName} ${this.user.lastName}` : '';
      }
    }
  });
}());