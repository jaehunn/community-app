세션 인증

- Access Token 하나로 인가
- 토큰 만료 시
  - Secure Store 에서 토큰 제거
  - 로그인 화면으로 리다이렉트

expo secure store

- https://docs.expo.dev/versions/latest/sdk/securestore/

push token

- https://docs.expo.dev/push-notifications/overview/

```
npx expo install expo-notifications expo-device expo-constants

```

```
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

expo-notifications 는 expo-go 에서는 사용 불가능.

> 빌드해서 사용
> `npm install -g eas-cli` > `eas build:configure`
> generated app.json(projectId) + eas.json

https://docs.expo.dev/push-notifications/fcm-credentials/

> firebase console
> settings > service accounts > 비공개 키 생성
> add app.json ios/android identifier
> eas credentials prod
> push noti + key upload
> firebase console, android 앱에 firebase 추가 설정.

eas build -p android

> build details link
> configuration > credentials > sha copy
> firebase console, android 앱에 firebase 추가 설정.
> google-services.json 다운로드.

ios

- apple dveloper membership
