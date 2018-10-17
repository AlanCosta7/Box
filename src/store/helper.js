'use strict'

import { firebaseAction } from 'vuexfire'

export function getCommonsIds(context) {
  const currentUser = context.rootState.user.currentUser
  const uid = currentUser.uid
  const currentProject = context.rootState.projects.currentProject
  const pid = currentProject['.key']

  return { uid, pid }
}

export function fbActionHelper(context, { ref, stateObjectName }) {
  return new Promise((resolve, reject) => {
    firebaseAction(({ commit, bindFirebaseRef }, { ref }) => {
      commit('startLoading')
      bindFirebaseRef(stateObjectName, ref, {
        errorCallback: error => {
          console.error('(fb) Erro ao fazer binding', error)
          reject(error)
        },
        readyCallback: () => {
          const stateUpperCase = stateObjectName.toUpperCase()
          commit(`SET_${stateUpperCase}_REF`, ref)
          commit('stopLoading')
          resolve()
        }
      })
    })(context, { ref })
  })
}

/**
 *  Unbind firebase ref.
 *
 * @export
 * @param {Object} context Store
 * @param {String} stateObjectName name of the property at store
 * @returns
 */
export function unbindHelper(context, stateObjectName) {
  return firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef(stateObjectName)
  })(context)
}

export function getKeysFromObject(validKeys, obj) {
  const result = {}
  validKeys.forEach(k => {
    if (obj[k]) {
      result[k] = obj[k]
    }
  })
  return result
}
