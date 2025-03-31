import { getLocales } from 'expo-localization'

const resources = {
  en: {
    translation: {
      Home: 'Home',
      Profile: 'Profile',
      Setting: 'Setting',
      Cancel: 'Cancel',
      'Welcome Message': 'Welcome, {{nickname}}',
    },
  },
  ko: {
    translation: {
      Home: '홈',
      Profile: '내 프로필',
      Setting: '설정',
      Cancel: '취소',
      'Welcome Message': '{{nickname}}님, 환영합니다.',
    },
  },
}

const deviceLanguage = getLocales()[0].languageCode ?? 'ko'

export const i18nOptions = {
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: 'ko-KR',
}
