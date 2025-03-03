import Axios from 'axios'
import { Platform } from 'react-native'

export const http = Axios.create({
  // android 에서 localhost 로 동작하지 않음.
  // 시뮬레이터 대신 기기 테스트로 진행하면, Metro bundler 에서 제공하는 URL 사용. (ex. Metro waiting on exp://192.168.45.169:8082)
  baseURL: Platform.OS === 'android' ? process.env.ANDROID_API_URL : process.env.IOS_API_URL,
})
