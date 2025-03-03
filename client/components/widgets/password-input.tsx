import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputField } from '../input-field'
import { TextInputProps } from 'react-native'

interface Props {
  // 키패드 닫히는 유무를 주입
  submitBehavior?: TextInputProps['submitBehavior']
}

export function PasswordInput({ submitBehavior = 'blurAndSubmit' }: Props) {
  const { control, setFocus } = useFormContext()

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return '비밀번호는 8자 이상 입력해주세요.'
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          variant="fill"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          submitBehavior={submitBehavior}
          // strong password 비활성화
          textContentType="oneTimeCode"
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
          onSubmitEditing={() => setFocus('passwordConfirm')}
        />
      )}
    />
  )
}
