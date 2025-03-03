import SecureStore from 'expo-secure-store'

export async function getSecureStore(key: string) {
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

export async function setSecureStore(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (err) {
    throw err
  }
}

export async function deleteSecureStore(key: string) {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (err) {
    throw err
  }
}
