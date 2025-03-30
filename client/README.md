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
