import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputField } from '../input-field'

export function EmailInput() {
  const { control, setFocus } = useFormContext()

  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return '이메일을 입력해주세요.'
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) {
            return '올바른 이메일 형식이 아닙니다.'
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          autoFocus
          variant="fill"
          keyboardType="email-address"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus('password')}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  )
}
