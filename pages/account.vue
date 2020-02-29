<template>
  <div class="container">
    <h1>Account</h1>
    <div>
      <form @submit.prevent="validateUser" novalidate class="md-layout">
        <md-card class="md-layout-item md-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('name')">
                  <label for="name">Name</label>
                  <md-input id="name" v-model="form.name" :disabled="sending" name="name" />
                  <span v-if="!$v.form.name.required" class="md-error">Name is required</span>
                  <span v-else-if="!$v.form.name.minlength" class="md-error">Invalid name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label for="email">Email</label>
                  <md-input
                    id="email"
                    v-model="form.email"
                    :disabled="sending"
                    type="email"
                    name="email"
                    autocomplete="email"
                  />
                  <span v-if="!$v.form.email.required" class="md-error">Email is required</span>
                  <span v-else-if="!$v.form.email.email" class="md-error">Invalid email</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('username')">
                  <label for="username">Username</label>
                  <md-input id="username" v-model="form.username" :disabled="sending" name="username" />
                  <span v-if="!$v.form.username.required" class="md-error">Username is required</span>
                  <span v-else-if="!$v.form.username.minlength" class="md-error">Invalid username</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('gender')">
                  <label for="gender">Gender</label>
                  <md-select id="gender" v-model="form.gender" :disabled="sending" name="gender" md-dense>
                    <md-option />
                    <md-option value="female">
                      F
                    </md-option>
                    <md-option value="male">
                      M
                    </md-option>
                    <md-option value="other">
                      Other
                    </md-option>
                  </md-select>
                  <span class="md-error">The gender is required</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="dateOfBirth">Date of Birth</label>
                  <md-input v-model="form.dateOfBirth" type="date" name="dateOfBirth" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="placeOfBirth">Place of Birth</label>
                  <md-input id="placeOfBirth" v-model="form.placeOfBirth" :disabled="sending" name="placeOfBirth" />
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="facebook">Facebook URL</label>
                  <md-input id="facebook" v-model="form.facebook" :disabled="sending" name="facebook" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="instagram">Instagram Handle</label>
                  <md-input id="instagram" v-model="form.instagram" :disabled="sending" name="instagram" />
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="twitter">Twitter Handle</label>
                  <md-input id="twitter" v-model="form.twitter" :disabled="sending" name="twitter" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="personalSite">Personal Site</label>
                  <md-input id="personalSite" v-model="form.personalSite" :disabled="sending" name="personalSite" />
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="bio">Bio</label>
                  <md-textarea v-model="form.bio" />
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button :disabled="sending" type="submit" class="md-raised md-primary">
              Save
            </md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'Account',
  middleware: 'auth',
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      gender: null,
      email: null,
      username: null,
      place_of_birth: null,
      dob: null
    },
    person: null,
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      username: {
        required,
        minLength: minLength(3)
      },
      gender: {
        required
      },
      email: {
        required,
        email
      },
      dob: {
        required,
        minLength: minLength(3)
      },
      place_of_birth: {
        required,
        minLength: minLength(3)
      }
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPersonFull({
      instance: context.app.store.state.instance.id,
      id: context.app.store.state.user.id
    })
    const person = response.data.data.person

    return { person }
  },
  mounted () {
    this.form.name = this.person.name
    this.form.username = this.person.username
    this.form.gender = this.person.gender
    this.form.email = this.person.email
    this.form.place_of_birth = this.person.place_of_birth
    this.form.dob = this.person.dob || null
    this.form.personalSite = this.person.personalSite
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.name = null
      this.form.username = null
      this.form.gender = null
      this.form.email = null
      this.form.place_of_birth = null
      this.form.dob = null
    },
    saveUser () {
      this.sending = true
      // TODO API call here
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
  },
  head () {
    const vm = this
    return {
      title: `Account - Collecting Social Photo`
    }
  }
}
</script>
