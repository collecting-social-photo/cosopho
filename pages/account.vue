<template>
  <div class="container">
    <h1>{{ $t('Account Page-My Account') }}</h1>
    <div>
      <form @submit.prevent="validateUser" novalidate class="md-layout">
        <md-card class="md-layout-item md-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('name')">
                  <label for="name">{{ $t('Account Page-Name') }} <span class="required">*</span></label>
                  <md-input id="name" v-model="form.name" :disabled="sending" name="name" />
                  <span v-if="!$v.form.name.required" class="md-error">Name is required</span>
                  <span v-else-if="!$v.form.name.minlength" class="md-error">Name is too short</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label for="email">{{ $t('Account Page-Email') }} <span class="required">*</span></label>
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
                  <label for="username">{{ $t('Account Page-Username') }} <span class="required">*</span></label>
                  <md-input id="username" v-model="form.username" :disabled="sending" name="username" />
                  <span v-if="!$v.form.username.required" class="md-error">Username is required</span>
                  <span v-else-if="!$v.form.username.minlength" class="md-error">Username is too short</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="gender">{{ $t('Account Page-Gender') }} <span class="required">*</span></label>
                  <md-select id="gender" v-model="form.gender" :disabled="sending" name="gender" md-dense>
                    <md-option value="female">
                      {{ $t('Account Page-Male') }}
                    </md-option>
                    <md-option value="male">
                      {{ $t('Account Page-Female') }}
                    </md-option>
                    <md-option value="other">
                      {{ $t('Account Page-Other') }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-datepicker v-model="form.dateOfBirth">
                  <label>{{ $t('Account Page-Birth Date') }} <span class="required">*</span></label>
                </md-datepicker>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('placeOfBirth')">
                  <label for="placeOfBirth">{{ $t('Account Page-Birth Place') }} <span class="required">*</span></label>
                  <md-input id="placeOfBirth" v-model="form.placeOfBirth" :disabled="sending" name="placeOfBirth" />
                  <span v-if="!$v.form.placeOfBirth.required" class="md-error">Location is required</span>
                  <span v-else-if="!$v.form.placeOfBirth.minlength" class="md-error">Location is too short</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="facebook">{{ $t('Account Page-FB URL') }}</label>
                  <md-input id="facebook" v-model="form.facebook" :disabled="sending" name="facebook" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="instagram">{{ $t('Account Page-Instagram') }}</label>
                  <md-input id="instagram" v-model="form.instagram" :disabled="sending" name="instagram" />
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="twitter">{{ $t('Account Page-Twitter') }}</label>
                  <md-input id="twitter" v-model="form.twitter" :disabled="sending" name="twitter" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="personalSite">{{ $t('Account Page-Personal Site') }}</label>
                  <md-input id="personalSite" v-model="form.personalSite" :disabled="sending" name="personalSite" />
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="bio">{{ $t('Account Page-Bio') }}</label>
                  <md-textarea v-model="form.bio" />
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100 required-legend">
                <span class="required">*</span>=Required field
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-card-actions>
                  <span v-if="sending" class="saving">Saving...</span>
                  <md-button :disabled="sending || $v.$invalid" type="submit" class="md-raised md-primary">
                    {{ $t('Account Page-Save Button') }}
                  </md-button>
                  <md-button :to="localePath('index')" class="md-primary">
                    Cancel
                  </md-button>
                </md-card-actions>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
    <md-dialog-confirm
      :md-active.sync="dialogActive"
      @md-confirm="onDeleteConfirm"
      md-title="Delete Account"
      md-content="Are you sure you want to delete your account?"
      md-confirm-text="Yes"
      md-cancel-text="No"
    />
    <div>
      <md-button @click="dialogActive = true" class="md-accent button-no-margin">
        <md-icon>delete</md-icon> {{ $t('Account Page-Delete') }}
      </md-button>
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
      email: null,
      username: null,
      placeOfBirth: null,
      dateOfBirth: null
    },
    person: null,
    sending: false,
    dialogActive: false
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
      email: {
        required,
        email
      },
      placeOfBirth: {
        required,
        minLength: minLength(3)
      },
      dateOfBirth: {
        required
      }
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPerson({
      instance: context.app.store.state.instance.id,
      id: context.app.store.state.user.id
    })
    const person = response.data.data.person

    return { person }
  },
  mounted () {
    this.form.name = this.person.name
    this.form.username = this.person.username
    this.form.gender = this.person.gender || null
    this.form.email = this.person.email
    this.form.placeOfBirth = this.person.placeOfBirth
    this.form.dateOfBirth = this.person.dateOfBirth && this.person.dateOfBirth.split('T')[0]
    this.form.personalSite = this.person.personalSite
    this.form.facebook = this.person.facebook
    this.form.instagram = this.person.instagram
    this.form.twitter = this.person.twitter
    this.form.bio = this.person.bio
  },
  methods: {
    onDeleteConfirm () {
      this.deletePerson()
    },
    async deletePerson () {
      await this.$api.updatePerson({
        id: this.person.id,
        instance: this.$store.state.instance.id,
        deleted: true
      })
      this.$auth.logout()
      this.$toast.success('Account deleted')
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid
        }
      }
    },
    async saveUser () {
      this.sending = true

      const payload = {
        id: this.person.id,
        instance: this.$store.state.instance.id,
        username: this.form.username,
        name: this.form.name,
        gender: this.form.gender,
        facebook: this.form.facebook,
        instagram: this.form.instagram,
        twitter: this.form.twitter,
        personalSite: this.form.personalSite,
        bio: this.form.bio,
        email: this.form.email,
        dateOfBirth: this.form.dateOfBirth,
        placeOfBirth: this.form.placeOfBirth
      }

      const response = await this.$api.updatePerson(payload)
      this.sending = false

      this.$store.commit('SET_USER', response.data.data.updatePerson)

      this.$toast.success('Changes saved!')
    },
    validateUser () {
      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
  },
  head () {
    return {
      title: `Account - Collecting Social Photo`
    }
  }
}
</script>
