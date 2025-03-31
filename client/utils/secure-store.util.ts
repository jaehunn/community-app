import * as SecureStore from 'expo-secure-store'

export const secureStoreKeys = {
  accessToken: 'accessToken',
  language: 'language',
} as const

type SecureStoreKey = keyof typeof secureStoreKeys

export async function getSecureStore(key: SecureStoreKey) {
  try {
    const result = await SecureStore.getItemAsync(key)

    if (result === null) {
      throw new Error('Secure store not found')
    }

    return result
  } catch (err) {
    throw err
  }
}

export async function setSecureStore(key: SecureStoreKey, value: string) {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (err) {
    throw err
  }
}

export async function deleteSecureStore(key: SecureStoreKey) {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (err) {
    throw err
  }
}
